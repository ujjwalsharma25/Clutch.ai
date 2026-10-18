// Tiny synthesized game sounds (Web Audio, no files). Can be muted from the HUD.
let on = true; let ctx: AudioContext | null = null;
export const setSound = (v: boolean) => { on = v; };
function tone(f: number, d: number, type: OscillatorType = "square", when = 0, vol = 0.05) {
  if (!on || typeof window === "undefined") return;
  try { ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(), g = ctx.createGain(), s = ctx.currentTime + when; o.type = type; o.frequency.value = f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(vol, s); g.gain.exponentialRampToValueAtTime(0.0001, s + d); o.start(s); o.stop(s + d); } catch {}
}
export function sfx(k: "click" | "correct" | "wrong" | "level" | "badge") {
  if (k === "click") tone(520, 0.06); else if (k === "correct") { tone(660, 0.1); tone(880, 0.14, "square", 0.09); } else if (k === "wrong") { tone(180, 0.22, "sawtooth"); }
  else if (k === "badge") { tone(784, 0.1, "triangle"); tone(1047, 0.18, "triangle", 0.1); } else { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, "triangle", i * 0.09)); }
}
