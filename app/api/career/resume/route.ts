import { err, ok } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
import { askJson, modelError } from "@/lib/infer";
import { personaFor } from "@/lib/persona";
import { quoteOk } from "@/lib/study";
import { atsChecks, hasTerm } from "@/lib/resume";
export const maxDuration = 60;
const SYSTEM = (l?: string) => personaFor(l) + ` You analyse a resume. Reply as strict JSON: {"skills":[string],"roles":[{"title":string,"org":string,"quote":string}],"strengths":[string],"improvements":[string]}. Only list skills that literally appear in the resume. Each role "quote" is copied word for word from the resume (max 15 words). "strengths" and "improvements" are short, concrete and in your language (max 4 each). Never invent anything.`;
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const b = await req.json(); const text = String(b.text || "").slice(0, 12000); if (text.length < 80) return err("Resume text bahut chhota hai. Poora resume paste ya upload kar.");
  let o: any; try { o = await askJson(SYSTEM(b.lang), `Resume:\n${text}`, 0.2); } catch (e) { const m = modelError(e); return err(m.message, m.status); }
  const skills = (Array.isArray(o.skills) ? o.skills : []).map((s: any) => String(s).trim()).filter((s: string) => s && s.length < 40 && hasTerm(text, s)).slice(0, 30); // AI-claimed skills must really appear in the resume
  const roles = (Array.isArray(o.roles) ? o.roles : []).filter((r: any) => r?.title && quoteOk(text, String(r.quote || ""))).slice(0, 6).map((r: any) => ({ title: String(r.title).slice(0, 80), org: String(r.org || "").slice(0, 80), quote: String(r.quote) }));
  const list = (x: any) => (Array.isArray(x) ? x : []).map((s: any) => String(s).slice(0, 200)).slice(0, 4);
  return ok({ skills, roles, strengths: list(o.strengths), improvements: list(o.improvements), ats: atsChecks(text), droppedSkills: (Array.isArray(o.skills) ? o.skills.length : 0) - skills.length });
}
