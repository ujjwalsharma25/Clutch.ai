import bcrypt from "bcryptjs";
import { err, ok } from "@/lib/http";
import { limited } from "@/lib/ratelimit";
import { getStore } from "@/lib/db";
import { setSession } from "@/lib/session";
export async function POST(req: Request) {
  const b = await req.json(); const email = String(b.email || "").trim().toLowerCase();
  if (limited("login:" + email, 8, 600000)) return err("Too many attempts. Wait 10 minutes.", 429);
  const u = await getStore().byEmail(email);
  if (!u || !(await bcrypt.compare(String(b.password || ""), u.passwordHash))) return err("Email or password is wrong.", 401);
  await setSession(u.id); return ok({ user: { id: u.id, name: u.name, email: u.email } });
}
