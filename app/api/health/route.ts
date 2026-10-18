import { ok } from "@/lib/http";
import { askJson, modelError, modelName } from "@/lib/infer";
export const maxDuration = 60;
export const dynamic = "force-dynamic";
// Open /api/health before a demo: it proves the model is reachable and shows which provider is active.
export async function GET() {
  const t = Date.now(); const base = { provider: process.env.INFERENCE_PROVIDER || "ollama", model: modelName(), voice: !!(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_VOICE_ID) };
  try { await askJson('Reply as JSON: {"ok": true}', "ping", 0); return ok({ ...base, ok: true, ms: Date.now() - t }); } catch (e) { return ok({ ...base, ok: false, error: modelError(e).message }); }
}
