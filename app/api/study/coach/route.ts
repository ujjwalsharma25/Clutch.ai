import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
// The coach gives study STRATEGY and motivation from the learner's progress. It never explains subject facts; those must come from the notes via Ask.
const SYSTEM = (l?: string) => personaFor(l) + ` You are the student's study coach. Use the progress data given. Give a short, concrete plan or motivation (max 4 short sentences). Do NOT explain subject facts or definitions; if asked, tell them to use the Ask tab so the answer is grounded in their notes. Reply as strict JSON: {"reply": string}.`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const q = String(b.question || "").trim().slice(0, 300); if (q.length < 2) return err("Kuch pooch to sahi.");
  const c = b.context || {}; const ctx = `Level ${+c.level || 1}, streak ${+c.streak || 0} days, mastery ${+c.mastery || 0}%, due reviews ${+c.due || 0}, weak concepts: ${(Array.isArray(c.weak) ? c.weak : []).slice(0, 5).map((x: any) => String(x).slice(0, 40)).join(", ") || "none yet"}.`;
  try { const o = await askJson(SYSTEM(b.lang), `Progress: ${ctx}\nStudent says: ${q}`, 0.5); return ok({ reply: String(o.reply || "").slice(0, 600) || "Chill kar bhai, pehle Notes tab mein notes daal." }); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
}
