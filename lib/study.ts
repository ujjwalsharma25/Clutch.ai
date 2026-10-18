export type Passage = { id: number; text: string };
const STOP = new Set("the a an is are of in on and or to for what how why kya hai hota hoti hote mein me ka ki ke ko se ye wo kaise kyun does do did with by as at it its this that".split(" "));
// Split notes into numbered passages so every answer can point to identifiable evidence.
export function chunk(notes: string): Passage[] {
  const clean = notes.replace(/\r/g, "").trim();
  let parts = clean.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2) { const s = clean.split(/(?<=[.!?])\s+/); parts = []; for (let i = 0; i < s.length; i += 3) parts.push(s.slice(i, i + 3).join(" ")); }
  const out: string[] = [];
  for (const p of parts) { if (p.length <= 900) { out.push(p); continue; } let cur = ""; for (const x of p.split(/(?<=[.!?])\s+/)) { if ((cur + " " + x).length > 600 && cur) { out.push(cur.trim()); cur = x; } else cur += " " + x; } if (cur.trim()) out.push(cur.trim()); }
  return out.map((text, i) => ({ id: i + 1, text }));
}
const toks = (s: string) => Array.from(new Set(s.toLowerCase().match(/[a-z0-9']{3,}/g) || [])).filter((w) => !STOP.has(w));
// Used only for long notes: keyword overlap picks the 8 most relevant passages. Short notes are sent whole.
export function rank(ps: Passage[], q: string, n = 8): Passage[] {
  const qt = toks(q);
  return ps.map((p) => { const pt = Array.from(new Set(toks(p.text))); let sc = 0; for (const t of qt) if (pt.includes(t) || (t.length >= 5 && pt.some((w) => w.startsWith(t.slice(0, 5))))) sc++; return { p, sc }; }).sort((a, b) => b.sc - a.sc || a.p.id - b.p.id).slice(0, n).map((x) => x.p).sort((a, b) => a.id - b.id);
}
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\u0900-\u097f ]+/g, " ").replace(/\s+/g, " ").trim();
const words = (s: string) => norm(s).split(" ").filter(Boolean);
// Evidence check. Exact: the quote appears word for word. Fuzzy: at least 85% of its words appear together in one window
// of the passage (tolerates a dropped or changed word). Invented quotes fail both.
export function matchQuote(hay: string, quote: string): { ok: boolean; exact: boolean } {
  const nq = norm(quote); if (nq.length >= 8 && norm(hay).includes(nq)) return { ok: true, exact: true };
  const q = words(quote), h = words(hay); if (q.length < 5) return { ok: false, exact: false };
  const qs = new Set(q), L = q.length;
  for (let i = 0; i + Math.max(1, L - 3) <= h.length; i++) { const w = new Set(h.slice(i, i + L + 2)); let m = 0; qs.forEach((t) => { if (w.has(t)) m++; }); if (m / qs.size >= 0.85) return { ok: true, exact: false }; }
  return { ok: false, exact: false };
}
export const quoteOk = (hay: string, quote: string) => matchQuote(hay, quote).ok;
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
// Evidence strength (0-100): exact quotes count more than close matches, and support from two or more passages adds a bonus. A heuristic, not a probability.
export function evidenceStrength(ev: { exact: boolean; passage: number }[]) {
  if (!ev.length) return { score: 0, label: "None" };
  const base = ev.reduce((a, e) => a + (e.exact ? 100 : 75), 0) / ev.length, bonus = new Set(ev.map((e) => e.passage)).size > 1 ? 10 : 0, score = Math.min(100, Math.round(base + bonus));
  return { score, label: score >= 90 ? "Strong" : score >= 70 ? "Good" : "Weak" };
}
