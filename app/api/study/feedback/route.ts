import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson } from "@/lib/infer";
import { readKey } from "@/lib/studyKey";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` A student answered a quiz question wrongly. In 2 to 4 short sentences, explain why their chosen option is wrong and guide them toward the right idea using ONLY the evidence quote. Do not invent facts. Reply as strict JSON: {"feedback": string, "tip": string}.`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); let it: any;
  try { it = (await readKey(String(b.key || "")))[+b.index]; } catch { return err("Quiz expired. Naya quiz bana."); }
  const picked = +b.picked; if (!it || !(picked >= 0 && picked <= 3)) return err("Invalid answer.");
  if (picked === it.c) return ok({ correct: true, explanation: it.e, quote: it.quote, concept: it.concept });
  let feedback = it.e, tip = ""; // falls back to the stored explanation if the model is slow or down
  try { const o = await askJson(SYSTEM(b.lang), `Question: ${it.question}\nOptions: ${it.options.map((x: string, i: number) => `${i + 1}. ${x}`).join(" | ")}\nStudent chose: ${it.options[picked]}\nCorrect: ${it.options[it.c]}\nEvidence: ${it.quote}`, 0.3); if (o.feedback) feedback = String(o.feedback).slice(0, 800); tip = String(o.tip || "").slice(0, 300); } catch {}
  return ok({ correct: false, correctIndex: it.c, feedback, tip, quote: it.quote, concept: it.concept });
}
