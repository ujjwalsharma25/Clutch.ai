"use client";
import Link from "next/link";
import { useGame } from "./GameProvider";
import { levelOf, rankOf } from "@/lib/game";
import { LANGS_LIST, Lang } from "@/lib/i18n";
export default function Hud() {
  const { game, user, logout, sound, setSound, lang, setLang, t } = useGame(); const L = levelOf(game.xp);
  return (<div className="flex items-center gap-3">
    <Link href="/profile" className="flex items-center gap-2" aria-label={t("hud.profile")}>
      <span className="relative grid h-10 w-10 place-items-center"><svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden><polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="rgb(var(--panel))" stroke="rgb(var(--a2))" strokeWidth="2" /></svg><b className="relative font-display text-sm">{L.level}</b></span>
      <span className="hidden leading-tight sm:block"><span className="block font-display text-[11px] uppercase tracking-widest text-a2">{t("rank." + rankOf(L.level))}</span><span className="xpbar block h-1.5 w-28"><span className="xpfill block h-full" style={{ width: (L.into / L.need) * 100 + "%" }} /></span><span className="block text-[10px] text-slate-400">{L.into}/{L.need} XP</span></span></Link>
    <span title={t("hud.streak")} className="hidden items-center gap-1 font-display text-sm font-bold text-xp sm:flex">▲ {game.streak}</span>
    <button onClick={() => setSound(!sound)} className="btn2 !px-2.5 !py-1.5" aria-label={sound ? t("hud.mute_a") : t("hud.unmute_a")} aria-pressed={!sound}>{sound ? t("hud.sfx") : t("hud.mute")}</button>
    <select className="inp !w-auto !py-1.5 text-sm" value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={t("hud.lang")} title={t("hud.lang")}>{LANGS_LIST.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}</select>
    {user ? <><span className="hidden text-sm text-slate-300 md:inline">{user.name.split(" ")[0]}</span><button className="btn2 !py-1.5" onClick={logout}>{t("hud.logout")}</button></> : <Link href="/login" className="btn2 !py-1.5">{t("hud.login")}</Link>}
  </div>);
}
