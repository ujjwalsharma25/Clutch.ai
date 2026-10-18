import bcrypt from "bcryptjs";
import { err, ok } from "@/lib/http";
import { limited } from "@/lib/ratelimit";
import { getStore, newId } from "@/lib/db";
import { setSession } from "@/lib/session";
export async function POST(req: Request) {
  if (limited("reg:" + (req.headers.get("x-forwarded-for") || "local"), 10, 600000)) return err("Too many attempts. Try later.", 429);
  const b = await req.json(); const email = String(b.email || "").trim().toLowerCase(), name = String(b.name || "").trim().slice(0, 60), pw = String(b.password || "");
  if (!/^\S+@\S+\.\S+$/.test(email)) return err("Enter a valid email."); if (name.length < 2) return err("Enter your name."); if (pw.length < 8) return err("Password needs at least 8 characters.");
  const st = getStore(); if (await st.byEmail(email)) return err("This email already has an account. Try logging in.", 409);
  const u = { id: newId(), email, name, passwordHash: await bcrypt.hash(pw, 11), createdAt: Date.now(), xp: 0, level: 1, state: "", stateTs: 0 };
  await st.create(u); await setSession(u.id); return ok({ user: { id: u.id, name, email } });
}
