import crypto from "crypto";
import bcrypt from "bcryptjs";
import { err, ok } from "@/lib/http";
import { getStore } from "@/lib/db";
export async function POST(req: Request) {
  const { token, password } = await req.json(); if (String(password || "").length < 8) return err("Password needs at least 8 characters.");
  const st = getStore(), uid = await st.takeReset(crypto.createHash("sha256").update(String(token || "")).digest("hex"));
  if (!uid) return err("This reset link is invalid or expired. Request a new one.");
  await st.patch(uid, { passwordHash: await bcrypt.hash(password, 11) }); return ok({ ok: true });
}
