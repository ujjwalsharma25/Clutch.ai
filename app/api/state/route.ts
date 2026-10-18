import { err, ok } from "@/lib/http";
import { getStore } from "@/lib/db";
import { sessionUserId } from "@/lib/session";
import { levelOf } from "@/lib/game";
// Syncs game progress (XP, streak, badges, mastery cards, concepts). Notes stay on the device.
export async function GET() {
  const id = await sessionUserId(); if (!id) return err("Login required", 401); const u = await getStore().byId(id);
  let state = null; try { state = u?.state ? JSON.parse(u.state) : null; } catch {} return ok({ state, ts: u?.stateTs || 0 });
}
export async function PUT(req: Request) {
  const id = await sessionUserId(); if (!id) return err("Login required", 401);
  const b = await req.json(); const s = JSON.stringify(b.state || {}); if (s.length > 200000) return err("State too large.");
  const xp = Math.max(0, Math.min(1e6, Math.round(+b.state?.game?.xp || 0)));
  await getStore().patch(id, { state: s, stateTs: Math.round(+b.ts || Date.now()), xp, level: levelOf(xp).level }); return ok({ ok: true });
}
