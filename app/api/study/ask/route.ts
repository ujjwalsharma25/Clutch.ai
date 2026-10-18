import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError, modelName } from "@/lib/infer";
import { chunk, rank, matchQuote, evidenceStrength } from "@/lib/study";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` Answer ONLY from the numbered passages given. Never use outside knowledge. If the passages do not contain the answer, set "answerable" to false. Keep the answer under 5 short sentences. Reply as strict JSON: {"answerable": boolean, "answer": string, "evidence": [{"passage": number, "quote": string}]}. Each "quote" must be copied word for word from that passage (max 25 words, keep the original language).`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const notes = String(b.notes || "").slice(0, 12000), q = String(b.question || "").trim().slice(0, 300), verify = b.verify !== false;
  if (notes.length < 40) return err("Pehle apne notes paste ya upload kar."); if (q.length < 4) return err("Sawal thoda detail mein pooch.");
  const all = chunk(notes), used = notes.length <= 9000 ? all : rank(all, q, 8); // short notes are sent whole: no retrieval misses
  let o: any;
  try { o = await askJson(SYSTEM(b.lang), `Passages:\n${used.map((p) => `[${p.id}] ${p.text}`).join("\n\n")}\n\nQuestion: ${q}`, 0.1); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  const ev = (Array.isArray(o.evidence) ? o.evidence : []).map((e: any) => ({ passage: +e.passage, quote: String(e.quote || "") })).filter((e: any) => used.some((p) => p.id === e.passage));
  const good = ev.map((e: any) => { const p = all.find((x) => x.id === e.passage)!; return { ...e, text: p.text, ...matchQuote(p.text, e.quote) }; }).filter((e: any) => e.ok).slice(0, 3);
  const claimed = !!o.answerable && String(o.answer || "").trim().length > 0, meta = { verified: verify, model: modelName(), passagesSent: used.length, passagesTotal: all.length };
  if (claimed && (!verify || good.length > 0)) return ok({ status: "SUPPORTED", answer: String(o.answer).slice(0, 1500), evidence: good, strength: evidenceStrength(good), ...meta });
  if (claimed) return ok({ status: "UNVERIFIED", message: "Bhai, Gemma ne jawab to diya, par uska evidence tere notes se match nahi hua. Isliye main ise sach maan kar nahi dikha raha.", ...meta });
  return ok({ status: "UNSUPPORTED", message: "Bhai, tere notes mein iska jawab nahi mila. Notes mein ye topic add kar ya teacher se pooch le.", closest: rank(all, q, 1)[0]?.text.slice(0, 160) || "", ...meta });
}
