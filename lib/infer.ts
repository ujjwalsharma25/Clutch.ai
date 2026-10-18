// One place that talks to Gemma 4: self-hosted Ollama, Gemma 4 through the Gemini API, or Gemma 4 through OpenRouter (fast, OpenAI-compatible).
// Speed helpers: thinking is switched off where the API allows it, transient errors are retried, identical requests are cached, and identical in-flight requests are shared.
import crypto from "crypto";
type Opts = { system: string; user: string; temperature?: number; json?: boolean; image?: { mime: string; data: string } };
const provider = () => process.env.INFERENCE_PROVIDER || "ollama";
const parse = (raw: string) => { try { return JSON.parse(raw); } catch { const m = raw.match(/\{[\s\S]*\}/); if (m) { try { return JSON.parse(m[0]); } catch {} } throw new Error("BAD_JSON"); } };
export const modelName = () => {
  const p = provider();
  if (p === "gemini") return process.env.GEMMA_API_MODEL || "gemma-4-26b-a4b-it";
  if (p === "openrouter") return process.env.OPENROUTER_MODEL || "google/gemma-4-26b-a4b-it:nitro";
  return process.env.GEMMA_MODEL || "gemma4:e4b";
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ollama(o: Opts): Promise<string> {
  const r = await fetch((process.env.INFERENCE_URL || "http://localhost:11434").replace(/\/$/, "") + "/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    // Ollama defaults Gemma 4 to a small context window, so num_ctx is set explicitly.
    body: JSON.stringify({ model: modelName(), stream: false, ...(o.json ? { format: "json" } : {}), options: { temperature: o.temperature ?? 0.2, num_ctx: +(process.env.NUM_CTX || 8192) }, messages: [{ role: "system", content: o.system }, { role: "user", content: o.user, ...(o.image ? { images: [o.image.data] } : {}) }] }),
    signal: AbortSignal.timeout(120000),
  });
  if (!r.ok) throw new Error("API_" + r.status);
  return (await r.json()).message?.content || "";
}

async function gemini(o: Opts): Promise<string> {
  const key = process.env.GEMINI_API_KEY; if (!key) throw new Error("NO_KEY");
  // System text is merged into the user turn because Gemma models on this API may not accept a separate system instruction.
  const parts: any[] = [{ text: o.system + "\n\n" + o.user + (o.json ? "\n\nReply with the JSON object only, no markdown." : "") }]; if (o.image) parts.unshift({ inlineData: { mimeType: o.image.mime, data: o.image.data } });
  const base = (process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com").replace(/\/$/, "");
  const call = (fast: boolean) => fetch(`${base}/v1beta/models/${modelName()}:generateContent`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    // Gemma 4 thinks before answering by default. "minimal" turns that off (per Google's Gemma-on-Gemini docs), which cuts latency a lot.
    body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { temperature: o.temperature ?? 0.2, maxOutputTokens: 4096, ...(fast ? { thinkingConfig: { thinkingLevel: "minimal" } } : {}) } }),
    signal: AbortSignal.timeout(90000),
  });
  let r = await call(true);
  if (r.status === 400) r = await call(false); // setting not accepted: retry plainly
  if (!r.ok) throw new Error("API_" + r.status);
  return ((await r.json()).candidates?.[0]?.content?.parts || []).filter((p: any) => !p.thought).map((p: any) => p.text || "").join("");
}

async function openrouter(o: Opts): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY; if (!key) throw new Error("NO_KEY");
  const base = (process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/$/, "");
  const user: any = o.image ? [{ type: "image_url", image_url: { url: `data:${o.image.mime};base64,${o.image.data}` } }, { type: "text", text: o.user }] : o.user + (o.json ? "\n\nReply with the JSON object only, no markdown." : "");
  const call = (extras: boolean) => fetch(base + "/chat/completions", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + key, "X-Title": "CLUTCH.ai Study Companion" },
    // extras = no thinking + JSON mode. Some providers reject them, so a 400 triggers a plain retry.
    body: JSON.stringify({ model: modelName(), temperature: o.temperature ?? 0.2, max_tokens: 4096, messages: [{ role: "system", content: o.system }, { role: "user", content: user }], ...(extras ? { reasoning: { enabled: false }, ...(o.json && !o.image ? { response_format: { type: "json_object" } } : {}) } : {}) }),
    signal: AbortSignal.timeout(90000),
  });
  let r = await call(true);
  if (r.status === 400) r = await call(false);
  if (!r.ok) throw new Error("API_" + r.status);
  return (await r.json()).choices?.[0]?.message?.content || "";
}

const raw = (o: Opts) => { const p = provider(); return p === "gemini" ? gemini(o) : p === "openrouter" ? openrouter(o) : ollama(o); };
const RETRY = new Set(["API_429", "API_500", "API_502", "API_503", "API_504"]);
async function withRetry(o: Opts): Promise<string> {
  let last: any;
  for (let i = 0; i < 3; i++) {
    try { const t = await raw(o); if (!t.trim()) last = new Error("EMPTY"); else { if (o.json) parse(t); return t; } } // bad JSON is never returned or cached: it is retried
    catch (e: any) { last = e; const m = String(e?.message || e); if (m === "NO_KEY") throw e; if (!RETRY.has(m) && m !== "BAD_JSON" && e?.name !== "TimeoutError" && e?.name !== "TypeError") throw e; }
    if (i < 2) await sleep(900 * (i + 1));
  }
  throw last;
}

// Cache + in-flight sharing. Same notes and same question give the same answer instantly (useful for demos).
const cache: Map<string, { t: number; v: string }> = ((globalThis as any).__ic ||= new Map());
const flying: Map<string, Promise<string>> = ((globalThis as any).__if ||= new Map());
const TTL = 30 * 60 * 1000;
async function chat(o: Opts): Promise<string> {
  const k = crypto.createHash("sha1").update([provider(), modelName(), o.system, o.user, o.temperature ?? "", o.json ? "j" : "t", o.image ? o.image.data.slice(0, 64) + o.image.data.length : ""].join("\u0001")).digest("hex");
  const hit = cache.get(k); if (hit && Date.now() - hit.t < TTL) return hit.v;
  let p = flying.get(k);
  if (!p) { p = withRetry(o).then((v) => { cache.set(k, { t: Date.now(), v }); if (cache.size > 200) cache.delete(cache.keys().next().value as string); return v; }).finally(() => flying.delete(k)); flying.set(k, p); }
  return p;
}

export const askJson = async (system: string, user: string, temperature = 0.2) => parse(await chat({ system, user, temperature, json: true }));
export const askText = async (system: string, user: string, image?: Opts["image"]) => (await chat({ system, user, temperature: 0.1, image })).trim();
export function modelError(e: any) {
  const m = String(e?.message || e);
  if (m === "NO_KEY") return { message: "API key set nahi hai. .env file dekh.", status: 503 };
  if (m === "API_429") return { message: "API rate limit lag gayi (free tier). 1 minute ruk ke try kar.", status: 429 };
  if (m === "API_401" || m === "API_403") return { message: "API key galat ya band hai. .env me key check kar.", status: 502 };
  if (m === "API_404") return { message: "Model name galat hai. .env me model id check kar.", status: 502 };
  if (/^API_5/.test(m) || m === "EMPTY") return { message: "Model abhi busy hai. 5 second baad dobara try kar.", status: 502 };
  if (m.startsWith("API_")) return { message: `Model ne error diya (${m.slice(4)}). Model name aur key check kar.`, status: 502 };
  if (m === "BAD_JSON") return { message: "Model ne sahi JSON nahi diya. Dobara try kar.", status: 502 };
  if ((e as any)?.name === "TimeoutError") return { message: "Model ko jawab dene me bahut der lagi. Dobara try kar.", status: 504 };
  return { message: "Model se connect nahi ho paya. Internet, .env aur model name check kar.", status: 503 };
}
