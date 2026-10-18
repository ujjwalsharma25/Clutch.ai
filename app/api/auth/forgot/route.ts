import crypto from "crypto";
import { err, ok } from "@/lib/http";
import { limited } from "@/lib/ratelimit";
import { getStore } from "@/lib/db";
import { sendMail } from "@/lib/mail";
export async function POST(req: Request) {
  const email = String((await req.json()).email || "").trim().toLowerCase();
  if (limited("forgot:" + email, 3, 3600000)) return err("Too many requests. Try again in an hour.", 429);
  const st = getStore(), u = await st.byEmail(email); let devLink = "";
  if (u) {
    const token = crypto.randomBytes(32).toString("hex"); await st.saveReset({ hash: crypto.createHash("sha256").update(token).digest("hex"), userId: u.id, exp: Date.now() + 30 * 60000, used: false });
    const link = `${process.env.APP_URL || "http://localhost:3000"}/reset?token=${token}`; const sent = await sendMail(email, "Reset your CLUTCH.ai password", `Open this link within 30 minutes:\n${link}`);
    if (!sent && process.env.NODE_ENV !== "production") devLink = link; // local demo only: no SMTP configured
  }
  return ok({ message: "If that email has an account, a reset link is on its way.", devLink });
}
