import nodemailer from "nodemailer";
// Returns true if a real email was sent. Without SMTP the message is printed to the server console.
export async function sendMail(to: string, subject: string, text: string): Promise<boolean> {
  if (!process.env.SMTP_HOST) { console.log(`\n[MAIL to ${to}] ${subject}\n${text}\n`); return false; }
  await nodemailer.createTransport({ host: process.env.SMTP_HOST, port: +(process.env.SMTP_PORT || 587), auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } }).sendMail({ from: process.env.MAIL_FROM, to, subject, text }); return true;
}
