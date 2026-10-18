import { ok } from "@/lib/http";
import { clearSession } from "@/lib/session";
export async function POST() { clearSession(); return ok({ ok: true }); }
