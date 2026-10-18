import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { pdfText } from "@/lib/pdf";
export const maxDuration = 30;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const file = (await req.formData()).get("file") as File | null;
  if (!file || file.type !== "application/pdf" || file.size > 5e6) return err("Upload a text PDF under 5 MB.");
  try { const text = await pdfText(file, 12000); return text.length < 40 ? err("No readable text found. Scanned PDFs: use the photo upload instead.") : ok({ text }); } catch { return err("Could not read this PDF."); }
}
