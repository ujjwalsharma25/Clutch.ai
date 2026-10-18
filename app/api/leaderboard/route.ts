import { ok } from "@/lib/http";
import { getStore } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const short = (n: string) => { const p = n.trim().split(/\s+/); return p[0] + (p[1] ? " " + p[1][0] + "." : ""); };
  const st = getStore(); return ok({ store: st.kind, rows: (await st.top(20)).filter((u) => u.xp > 0).map((u, i) => ({ rank: i + 1, name: short(u.name), xp: u.xp, level: u.level })) });
}
