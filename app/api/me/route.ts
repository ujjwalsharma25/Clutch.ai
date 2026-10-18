import { ok } from "@/lib/http";
import { getStore } from "@/lib/db";
import { clearSession, sessionUserId } from "@/lib/session";
export async function GET() {
  const st = getStore(), id = await sessionUserId(), u = id ? await st.byId(id) : null;
  return ok({ user: u ? { id: u.id, name: u.name, email: u.email, xp: u.xp, level: u.level } : null, store: st.kind });
}
export async function DELETE() { const id = await sessionUserId(); if (id) await getStore().remove(id); clearSession(); return ok({ ok: true }); }
