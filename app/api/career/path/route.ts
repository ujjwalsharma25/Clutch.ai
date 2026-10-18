import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { personaFor } from "@/lib/persona";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` You plan a career transition. Reply as strict JSON: {"steps":[{"title":string,"weeks":number,"focus":string}],"transferable":[string],"note":string}. 3 to 6 realistic steps in order, each 1 to 12 weeks. "transferable" lists skills the person already has that help. "note" is one honest sentence that this is an estimate. Never promise a job.`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const from = String(b.from || "").trim().slice(0, 80), to = String(b.to || "").trim().slice(0, 80), skills = (Array.isArray(b.skills) ? b.skills : []).map((s: any) => String(s).slice(0, 40)).slice(0, 40);
  if (from.length < 2 || to.length < 2) return err("Current aur target role dono batao.");
  let o: any; try { o = await askJson(SYSTEM(b.lang), `From: ${from}\nTo: ${to}\nCurrent skills: ${skills.join(", ") || "not given"}`, 0.4); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  const steps = (Array.isArray(o.steps) ? o.steps : []).slice(0, 6).map((s: any) => ({ title: String(s.title || "").slice(0, 80), weeks: Math.min(12, Math.max(1, Math.round(+s.weeks || 2))), focus: String(s.focus || "").slice(0, 200) })).filter((s: any) => s.title);
  if (!steps.length) return err("Path ban nahi paya. Dobara try kar.", 502);
  return ok({ estimate: true, steps, totalWeeks: steps.reduce((a: number, s: any) => a + s.weeks, 0), transferable: (Array.isArray(o.transferable) ? o.transferable : []).map((s: any) => String(s).slice(0, 60)).slice(0, 8), note: String(o.note || "This is an AI estimate, not a guarantee.").slice(0, 200) });
}
