import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { personaFor } from "@/lib/persona";
import { quoteOk } from "@/lib/study";
import { hasTerm } from "@/lib/resume";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` List the skills needed for the target role. Reply as strict JSON: {"required":[{"skill":string,"priority":1|2|3,"why":string,"quote":string}]}. priority 3 = essential. If a job description is given, use ONLY skills stated in it and copy a short "quote" from it word for word. Without a job description, "quote" is "" and the list is a general estimate. Max 12 skills.`;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]+/g, " ").trim();
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const role = String(b.role || "").trim().slice(0, 80), jd = String(b.jd || "").slice(0, 6000), have: string[] = (Array.isArray(b.skills) ? b.skills : []).map((s: any) => String(s).slice(0, 40)).slice(0, 60);
  if (role.length < 2) return err("Target role batao (jaise Backend Developer)."); if (!have.length) return err("Pehle Resume Lab se skills nikalo ya apni skills likho.");
  let o: any; try { o = await askJson(SYSTEM(b.lang), `Target role: ${role}\n${jd ? "Job description:\n" + jd : "No job description given."}`, 0.2); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  let req_ = (Array.isArray(o.required) ? o.required : []).filter((r: any) => r?.skill).slice(0, 12).map((r: any) => ({ skill: String(r.skill).slice(0, 50), priority: [1, 2, 3].includes(+r.priority) ? +r.priority : 2, why: String(r.why || "").slice(0, 200), quote: String(r.quote || "") }));
  if (jd) req_ = req_.filter((r: any) => quoteOk(jd, r.quote) || hasTerm(jd, r.skill)); // with a job description, every required skill must be stated in it
  if (!req_.length) return err("Required skills verify nahi ho paye. Job description thodi detailed paste kar.", 502);
  const rows = req_.map((r: any) => ({ ...r, have: have.some((h) => norm(h) === norm(r.skill) || norm(r.skill).includes(norm(h)) || norm(h).includes(norm(r.skill))) })).sort((a: any, b: any) => Number(a.have) - Number(b.have) || b.priority - a.priority);
  return ok({ estimate: !jd, role, rows, matchPct: Math.round((rows.filter((r: any) => r.have).length / rows.length) * 100) });
}
