"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Game, Ev, fresh as freshGame, applyEvent, rankOf, BADGES, QUESTS } from "@/lib/game";
import { Card } from "@/lib/sm2";
import { sfx, setSound as setSfx } from "@/lib/sfx";
import Confetti from "./Confetti";
import { Lang, tr } from "@/lib/i18n";
import { load, save } from "@/lib/store";
type User = { id: string; name: string; email: string } | null;
type Ctx = { game: Game; cards: Record<string, Card>; setCards: (f: (p: Record<string, Card>) => Record<string, Card>) => void; concepts: any[]; setConcepts: (c: any[]) => void; emit: (e: Ev, o?: { combo?: number }) => void; user: User; setUser: (u: User) => void; backend: string; theme: string; setTheme: (t: string) => void; sound: boolean; setSound: (v: boolean) => void; logout: () => Promise<void>; wipe: () => Promise<void>; ready: boolean; lang: Lang; setLang: (l: Lang) => void; t: (k: string, v?: Record<string, string | number>) => string };
const C = createContext<Ctx>(null as any); export const useGame = () => useContext(C);
const KEY = "clutch.state.v2";
export default function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = useState<Game>(freshGame()); const gRef = useRef(game); const [cards, setCardsS] = useState<Record<string, Card>>({}); const [concepts, setConcepts] = useState<any[]>([]);
  const [user, setUser] = useState<User>(null); const [backend, setBackend] = useState(""); const [theme, setThemeS] = useState("neon"); const [sound, setSoundS] = useState(true);
  const [lang, setLangS] = useState<Lang>("hinglish"); const langRef = useRef<Lang>("hinglish");
  const [toasts, setToasts] = useState<{ id: number; text: string; kind: string }[]>([]); const [levelUp, setLevelUp] = useState(0); const [ready, setReady] = useState(false); const timer = useRef<any>(null);
  const toast = (text: string, kind = "xp") => { const id = Date.now() + Math.random(); setToasts((t) => [...t.slice(-3), { id, text, kind }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200); };
  const adopt = (st: any) => { const g = { ...freshGame(), ...(st?.game || {}) }; gRef.current = g; setGame(g); setCardsS(st?.cards || {}); setConcepts(st?.concepts || []); };
  useEffect(() => { (async () => {
    let local: any = null; try { local = JSON.parse(localStorage.getItem(KEY) || "null"); } catch {} if (local) adopt(local);
    const sl = load<Lang>("lang", "hinglish"); if (sl === "english" || sl === "hindi" || sl === "hinglish") { langRef.current = sl; setLangS(sl); document.documentElement.lang = sl === "hindi" ? "hi" : "en"; }
    const t = localStorage.getItem("clutch.theme") || "neon"; setThemeS(t); document.documentElement.dataset.theme = t; const s = localStorage.getItem("clutch.sound") !== "0"; setSoundS(s); setSfx(s);
    try { const me = await (await fetch("/api/me")).json(); setBackend(me.store || ""); if (me.user) { setUser(me.user); const sv = await (await fetch("/api/state")).json(); if (sv.state && sv.ts > (local?.ts || 0)) adopt(sv.state); } } catch {}
    setReady(true);
  })(); }, []);
  useEffect(() => {
    if (!ready) return; const ts = Date.now(), st = { game, cards, concepts, ts }; try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {}
    if (user) { clearTimeout(timer.current); timer.current = setTimeout(() => { fetch("/api/state", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state: st, ts }) }).catch(() => {}); }, 1200); }
  }, [game, cards, concepts, user, ready]);
  const emit = useCallback((ev: Ev, o: { combo?: number } = {}) => {
    const r = applyEvent(gRef.current, ev, o); gRef.current = r.game; setGame(r.game); toast(`+${r.gained} XP`, "xp");
    r.newBadges.forEach((id) => { toast(tr(langRef.current, "toast.badge", { name: tr(langRef.current, "badge." + id) }), "badge"); sfx("badge"); }); r.questDone.forEach((id) => toast(tr(langRef.current, "toast.quest", { name: tr(langRef.current, "quest." + id) }), "quest"));
    if (r.levelAfter > r.levelBefore) { setLevelUp(r.levelAfter); sfx("level"); }
  }, []);
  const setLang = (l: Lang) => { langRef.current = l; setLangS(l); save("lang", l); document.documentElement.lang = l === "hindi" ? "hi" : "en"; };
  const t = useCallback((k: string, v?: Record<string, string | number>) => tr(lang, k, v), [lang]);
  const setTheme = (t: string) => { setThemeS(t); document.documentElement.dataset.theme = t; localStorage.setItem("clutch.theme", t); };
  const setSound = (v: boolean) => { setSoundS(v); setSfx(v); localStorage.setItem("clutch.sound", v ? "1" : "0"); };
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); };
  const wipe = async () => { if (user) await fetch("/api/me", { method: "DELETE" }); Object.keys(localStorage).filter((k) => k.startsWith("clutch.") && k !== "clutch.theme" && k !== "clutch.sound").forEach((k) => localStorage.removeItem(k)); setUser(null); adopt(null); };
  return (
    <C.Provider value={{ game, cards, setCards: (f) => setCardsS(f), concepts, setConcepts, emit, user, setUser, backend, theme, setTheme, sound, setSound, logout, wipe, ready, lang, setLang, t }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2" aria-live="polite">
        <AnimatePresence>{toasts.map((t) => <motion.div key={t.id} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className={`panel px-4 py-2 font-display text-sm font-bold ${t.kind === "xp" ? "text-xp" : t.kind === "badge" ? "text-a1" : "text-good"}`}>{t.text}</motion.div>)}</AnimatePresence>
      </div>
      <AnimatePresence>{levelUp > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setLevelUp(0)} role="dialog" aria-label="Level up"><Confetti />
        <motion.div initial={{ scale: 0.6, rotate: -4 }} animate={{ scale: 1, rotate: 0 }} className="panel panel-hi p-8 text-center"><p className="font-display text-xs uppercase tracking-[0.3em] text-a2">{t("lvl.up")}</p><p className="grad font-display text-7xl font-bold">{levelUp}</p><p className="mt-1 font-display text-lg">{t("rank." + rankOf(levelUp))}</p><p className="mt-3 text-xs text-slate-400">{t("lvl.click")}</p></motion.div></motion.div>}</AnimatePresence>
    </C.Provider>
  );
}
