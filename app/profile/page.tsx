"use client";
import { useGame } from "@/components/GameProvider";
import { BADGES, levelOf, rankOf } from "@/lib/game";
const THEMES = [["neon", "Neon Night"], ["ember", "Ember"], ["aqua", "Aqua"]];
export default function Profile() {
  const { game, user, theme, setTheme, sound, setSound, wipe, cards, concepts, backend } = useGame(); const L = levelOf(game.xp);
  const exp = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify({ game, cards, concepts }, null, 2)], { type: "application/json" })); a.download = "clutch-progress.json"; a.click(); };
  return (<div className="mx-auto max-w-3xl space-y-5">
    <div className="panel panel-hi flex flex-wrap items-center gap-5 p-6"><span className="hex grid h-20 w-20 place-items-center bg-gradient-to-br from-a2 to-a1 font-display text-3xl font-bold text-black">{L.level}</span>
      <div className="min-w-[200px] flex-1"><h1 className="text-2xl font-bold">{user ? user.name : "Guest player"}</h1><p className="font-display text-sm uppercase tracking-widest text-a2">{rankOf(L.level)}</p><div className="xpbar mt-2 h-2"><div className="xpfill h-full" style={{ width: (L.into / L.need) * 100 + "%" }} /></div><p className="mt-1 text-xs text-slate-400">{L.into}/{L.need} XP to level {L.level + 1} | total {game.xp} XP</p></div>
      <div className="text-center"><p className="font-display text-3xl font-bold text-xp">{game.streak}</p><p className="text-xs text-slate-400">day streak (best {game.best})</p></div></div>
    <div className="panel p-5"><h2 className="font-bold">Achievements ({game.badges.length}/{BADGES.length})</h2><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{BADGES.map((b) => { const on = game.badges.includes(b.id); return <div key={b.id} className={`p-3 ${on ? "bg-a2/10" : "bg-black/30 opacity-50"}`}><p className="font-display text-xl text-xp">{on ? b.icon : "?"}</p><p className="text-sm font-semibold">{b.name}</p><p className="text-xs text-slate-400">{b.desc}</p></div>; })}</div></div>
    <div className="panel space-y-3 p-5"><h2 className="font-bold">Settings</h2><div className="flex flex-wrap gap-2">{THEMES.map(([k, n]) => <button key={k} className={theme === k ? "btn" : "btn2"} onClick={() => setTheme(k)} aria-pressed={theme === k}>{n}</button>)}</div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} /> Game sounds</label>
      <div className="flex flex-wrap gap-2"><button className="btn2" onClick={exp}>Download my progress</button><button className="btn2 !text-bad" onClick={() => { if (confirm(user ? "Delete your account and all local progress?" : "Delete all local progress and notes on this device?")) wipe(); }}>Delete my data</button></div>
      <p className="text-xs text-slate-500">{user ? "Signed in: XP, streak and mastery sync to your account. " : "Guest mode: everything stays in this browser. "}Notes never leave your device except to the model you configured.{backend === "memory" && " (Server accounts are in demo memory mode.)"}</p></div></div>);
}
