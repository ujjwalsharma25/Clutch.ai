// @ts-ignore import the inner file to avoid pdf-parse's debug-mode bug in bundlers
import pdf from "pdf-parse/lib/pdf-parse.js";
export async function pdfText(file: File, max = 12000) {
  const d = await pdf(Buffer.from(await file.arrayBuffer()));
  return String(d.text || "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
}
