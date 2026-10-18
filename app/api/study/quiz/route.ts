import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { quoteOk } from "@/lib/study";
import { signKey } from "@/lib/studyKey";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` You write practice quizzes strictly from the given notes. Reply as strict JSON: {"questions":[{"question":string,"options":[string,string,string,string],"correct":number,"concept":string,"quote":string,"hint":string,"explanation":string}]}. "correct" is the index 0-3 of the right option. "quote" is copied word for word from the notes (max 25 words) and proves the right option. "concept" must be one of the listed concepts when a list is given. "hint" nudges without revealing the answer. "hint" and "explanation" are in the tutor's language; question and options stay in the notes' language. Never use outside knowledge.`;
const LEVEL: Record<string, string> = { easy: "easy recall questions", medium: "medium questions that need understanding", hard: "hard questions that need applying or comparing ideas" };
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const notes = String(b.notes || "").slice(0, 12000); const n = Math.min(6, Math.max(3, +b.n || 4));
  const list = (x: any) => (Array.isArray(x) ? x : []).map((s: any) => String(s).slice(0, 60)).slice(0, 12);
  const focus = list(b.focus), concepts = list(b.concepts), diff = LEVEL[b.difficulty] ? b.difficulty : "medium";
  if (notes.length < 40) return err("Pehle apne notes paste ya upload kar.");
  let o: any;
  try { o = await askJson(SYSTEM(b.lang), `Notes:\n${notes}\n\nWrite ${n} ${LEVEL[diff]}.${concepts.length ? " Concepts: " + concepts.join(", ") + "." : ""}${focus.length ? " Focus on these weak or due concepts: " + focus.join(", ") + "." : ""}`, 0.3); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  const raw = Array.isArray(o.questions) ? o.questions : [];
  const qs = raw.filter((x: any) => x && Array.isArray(x.options) && x.options.length === 4 && x.options.every((s: any) => typeof s === "string") && Number.isInteger(x.correct) && x.correct >= 0 && x.correct <= 3 && quoteOk(notes, String(x.quote || "")))
    .map((x: any) => ({ question: String(x.question), options: x.options.map(String), c: x.correct, concept: String(x.concept || "").slice(0, 60), quote: String(x.quote), hint: String(x.hint || "").slice(0, 300), e: String(x.explanation || "").slice(0, 600) }));
  if (!qs.length) return err("Quiz verify nahi ho paya. Dobara try kar, ya notes thode detailed daal.", 502);
  return ok({ key: await signKey(qs), difficulty: diff, dropped: raw.length - qs.length, questions: qs.map((x: any) => ({ question: x.question, options: x.options, hint: x.hint, concept: x.concept })) });
}
