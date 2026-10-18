const hits = new Map<string, number[]>();
export function limited(k: string, max: number, ms: number) { const now = Date.now(); const a = (hits.get(k) || []).filter((t) => now - t < ms); a.push(now); hits.set(k, a); return a.length > max; }
// Returns an error message when this IP is over the limit, otherwise null.
export function gate(req: Request): string | null {
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  return limited("s:" + ip, +(process.env.RATE_LIMIT_PER_10MIN || 80), 600000) ? "Thoda ruk bhai, bahut requests ho gayi. Kuch minute baad try kar." : null;
}
