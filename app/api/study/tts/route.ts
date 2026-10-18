import { err } from "@/lib/http";
import { gate } from "@/lib/ratelimit";
// ElevenLabs voice. Sends only the tutor's reply text, never the student's notes. The client falls back to the browser voice on any error.
export async function POST(req: Request) {
  const lim = gate(req); if (lim) return err(lim, 429);
  const key = process.env.ELEVENLABS_API_KEY, voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) return err("Voice not configured.", 503);
  const text = String((await req.json()).text || "").trim().slice(0, 800); if (!text) return err("No text.");
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, { method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" }, body: JSON.stringify({ text, model_id: "eleven_multilingual_v2" }) });
  if (!r.ok) return err("ElevenLabs failed (" + r.status + ").", 502);
  return new Response(await r.arrayBuffer(), { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
