"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "./GameProvider";
import { levelOf } from "@/lib/game";
import { SPEECH, trErr } from "@/lib/i18n";
import { canListen, listen, speak, stopSpeak } from "@/lib/voice";
// Floating study coach: gives strategy and motivation from your progress. It never explains subject facts (Ask tab does that, from your notes).
// Layout note: the fixed positioning lives on a plain wrapper, because the .panel class sets position:relative and would otherwise pull the box into the page flow.
export default function Coach() {
  const { game, cards, concepts, lang, t } = useGame(); const [open, setOpen] = useState(false); const [q, setQ] = useState(""); const [busy, setBusy] = useState(false); const [listening, setListening] = useState(false);
  const [log, setLog] = useState<{ me: boolean; t: string }[]>([]); const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [log, busy, open]);
  async function send(text?: string) {
    const question = (text ?? q).trim(); if (!question || busy) return; setQ(""); setLog((l) => [...l, { me: true, t: question }]); setBusy(true); stopSpeak();
    const lv = (c: any) => cards[c.id]?.level || 0, mastery = concepts.length ? Math.round(concepts.reduce((a, c) => a + lv(c), 0) / concepts.length) : 0;
    const context = { level: levelOf(game.xp).level, streak: game.streak, mastery, due: concepts.filter((c) => cards[c.id]?.reps > 0 && cards[c.id].due <= Date.now()).length, weak: concepts.filter((c) => lv(c) < 50).map((c) => c.name) };
    try { const r = await fetch("/api/study/coach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, context, lang }), signal: AbortSignal.timeout(30000) }); const d = await r.json().catch(() => ({ error: "Server error" })); const reply = r.ok ? d.reply : trErr(lang, d.error); setLog((l) => [...l, { me: false, t: reply }]); if (r.ok && localStorage.getItem("clutch.voice") !== "false") speak(reply, SPEECH[lang]); } catch { setLog((l) => [...l, { me: false, t: t("coach.slow") }]); }
    setBusy(false);
  }
  return (<>
    <button onClick={() => setOpen(!open)} aria-label={t("coach.btn")} aria-expanded={open} className="hex fixed bottom-5 right-5 z-30 grid h-16 w-16 place-items-center bg-gradient-to-br from-a2 to-a1 font-display text-xs font-bold text-black shadow-xl transition hover:scale-110">{t("coach.btn")}</button>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ position: "fixed", right: 16, bottom: 96, zIndex: 30, width: "min(22rem, calc(100vw - 2rem))" }}>
      <div className="panel panel-hi flex h-[26rem] max-h-[70vh] flex-col p-3">
        <div className="flex items-center justify-between"><p className="font-display text-sm font-bold uppercase tracking-widest text-a2">{t("coach.title")}</p><button className="text-xs text-slate-400 hover:text-white" onClick={() => { setOpen(false); stopSpeak(); }} aria-label={t("coach.close")}>✕</button></div>
        <div className="mt-2 flex-1 space-y-2 overflow-y-auto pr-1 text-sm" aria-live="polite"><p className="max-w-[90%] bg-black/30 px-3 py-2">{t("coach.intro")}</p>{log.map((m, i) => <p key={i} className={`max-w-[90%] px-3 py-2 ${m.me ? "ml-auto bg-a1/30" : "bg-black/30"}`}>{m.t}</p>)}{busy && <p className="text-xs text-slate-400">{t("coach.thinking")}</p>}<div ref={end} /></div>
        <div className="mt-2 flex gap-2">{canListen() && <button className="btn2 !px-3" aria-label={t("coach.mic")} onClick={() => { if (listening) return; setListening(true); listen(SPEECH[lang], (tx, f) => { setQ(tx); if (f) send(tx); }, () => setListening(false)); }}>{listening ? "..." : t("coach.mic")}</button>}
          <input className="inp min-w-0 flex-1" placeholder={t("coach.ph")} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} /><button className="btn !px-3" disabled={busy} onClick={() => send()}>{t("coach.go")}</button></div>
      </div></motion.div>}</AnimatePresence></>);
}
