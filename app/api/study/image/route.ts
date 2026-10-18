import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askText, modelError } from "@/lib/infer";
export const maxDuration = 60;
// Photo of notes -> text, using Gemma 4's image understanding. Handwriting quality varies, so the user can edit the result.
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const file = (await req.formData()).get("file") as File | null;
  if (!file || !/^image\/(png|jpe?g|webp)$/.test(file.type) || file.size > 4e6) return err("Upload a PNG, JPG or WebP photo under 4 MB.");
  try {
    const text = await askText("You transcribe study notes from photos.", "Transcribe the study notes in this image exactly as written. Keep formulas and bullet structure. Output plain text only. If the image has no readable notes, output exactly: UNREADABLE", { mime: file.type, data: Buffer.from(await file.arrayBuffer()).toString("base64") });
    return text.startsWith("UNREADABLE") || text.length < 30 ? err("Photo se notes padh nahi paya. Roshni aur focus ke saath dobara try kar.") : ok({ text: text.slice(0, 12000) });
  } catch (e) { const m = modelError(e); return err(m.message, m.status); }
}
