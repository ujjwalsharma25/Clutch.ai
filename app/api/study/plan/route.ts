import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { quoteOk, slug } from "@/lib/study";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` Extract the key concepts a student must learn from these notes, in the best learning order (4 to 10 concepts). Reply as strict JSON: {"concepts":[{"name":string,"summary":string,"prerequisites":[string],"quote":string}]}. "summary" is one short friendly sentence. "prerequisites" lists names of EARLIER concepts only. "quote" is copied word for word from the notes (max 20 words) and defines the concept. Never use outside knowledge. Keep every \"name\" and \"quote\" in the language of the notes and never translate them; write only \"summary\" in the speaking language above.`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const notes = String(b.notes || "").slice(0, 12000); const days = Math.min(14, Math.max(1, +b.days || 5));
  const names: string[] = (Array.isArray(b.names) ? b.names : []).map((x: any) => String(x).slice(0, 60)).slice(0, 10);
  if (notes.length < 40) return err("Pehle apne notes paste ya upload kar.");
  let o: any; try { o = await askJson(SYSTEM(b.lang), `Notes:\n${notes}` + (names.length >= 2 ? `\n\nUse exactly these concept names, in this order, without renaming or translating them: ${names.join(" | ")}` : ""), 0.2); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  const raw = (Array.isArray(o.concepts) ? o.concepts : []).filter((c: any) => c?.name && quoteOk(notes, String(c.quote || ""))).slice(0, 10); // concepts without evidence in the notes are dropped
  if (raw.length < 2) return err("Notes se concepts verify nahi ho paye. Thode detailed notes daal ya dobara try kar.", 502);
  const ids = raw.map((c: any) => slug(String(c.name)));
  const concepts = raw.map((c: any, i: number) => ({ id: ids[i], name: String(c.name).slice(0, 60), summary: String(c.summary || "").slice(0, 200), quote: String(c.quote), prereq: (Array.isArray(c.prerequisites) ? c.prerequisites : []).map((p: any) => slug(String(p))).filter((p: string) => ids.indexOf(p) >= 0 && ids.indexOf(p) < i), day: Math.floor((i * days) / raw.length) + 1 }));
  return ok({ concepts, days, dropped: (Array.isArray(o.concepts) ? o.concepts.length : 0) - raw.length });
}
