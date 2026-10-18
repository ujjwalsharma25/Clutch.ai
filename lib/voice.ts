// Browser-side voice: the mic uses the Web Speech API (Chrome or Edge); speaking uses ElevenLabs via /api/study/tts when configured, otherwise the browser voice.
export const canListen = () => typeof window !== "undefined" && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
export function listen(lang: string, onText: (t: string, final: boolean) => void, onEnd: () => void) {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; const r = new SR();
  r.lang = lang; r.interimResults = true; r.continuous = false;
  r.onresult = (e: any) => { let t = ""; for (const x of e.results) t += x[0].transcript; onText(t, e.results[e.results.length - 1].isFinal); };
  r.onend = onEnd; r.onerror = onEnd; r.start();
  return () => r.stop();
}
let audio: HTMLAudioElement | null = null; let ttsOff = false; let token = 0;
export function stopSpeak() { token++; audio?.pause(); audio = null; if (typeof window !== "undefined") window.speechSynthesis?.cancel(); }
const getVoices = () => new Promise<SpeechSynthesisVoice[]>((res) => { const s = window.speechSynthesis; const v = s.getVoices(); if (v.length) return res(v); const done = () => res(s.getVoices()); s.addEventListener("voiceschanged", done, { once: true }); setTimeout(done, 700); });
// Picks the best installed voice for the language. Without a match, the browser may stay silent, so fall back to any English voice.
function pick(voices: SpeechSynthesisVoice[], lang: string) { const base = lang.split("-")[0]; return voices.find((v) => v.lang === lang) || voices.find((v) => v.lang.replace("_", "-").startsWith(base)) || voices.find((v) => v.lang.startsWith("en-IN")) || voices.find((v) => v.lang.startsWith("en")) || null; }
// Chrome stops long utterances after ~15 seconds, so the text is spoken sentence by sentence.
const chunks = (t: string) => (t.match(/[^.!?।\n]+[.!?।]*\s*/g) || [t]).reduce<string[]>((a, s) => { if (a.length && (a[a.length - 1] + s).length < 160) a[a.length - 1] += s; else a.push(s); return a; }, []);
export async function speak(text: string, lang = "en-IN"): Promise<"elevenlabs" | "browser" | "none"> {
  stopSpeak(); const my = token; const clean = text.replace(/[*_`#>]/g, "").slice(0, 800);
  if (!ttsOff) {
    try {
      const r = await fetch("/api/study/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: clean }) });
      if (r.status === 503) ttsOff = true; // ElevenLabs not configured: do not waste a request every time
      else if (r.ok && my === token) { const url = URL.createObjectURL(await r.blob()); audio = new Audio(url); audio.onended = () => URL.revokeObjectURL(url); await audio.play(); return "elevenlabs"; }
    } catch {}
  }
  if (my !== token) return "none";
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return "none";
  const voices = await getVoices(); const voice = pick(voices, lang); if (my !== token) return "none";
  const s = window.speechSynthesis; s.cancel();
  setTimeout(() => { if (my !== token) return; for (const part of chunks(clean)) { const u = new SpeechSynthesisUtterance(part); u.lang = voice?.lang || lang; if (voice) u.voice = voice; u.rate = 1; s.speak(u); } }, 80);
  return "browser";
}
