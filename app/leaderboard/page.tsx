"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/components/GameProvider";
export default function Board() {
  const [d, setD] = useState<any>(null); const { user } = useGame(); useEffect(() => { fetch("/api/leaderboard").then((r) => r.json()).then(setD).catch(() => setD({ rows: [] })); }, []);
  return (<div className="mx-auto max-w-2xl space-y-4"><div><h1 className="text-3xl font-bold">Leaderboard</h1><p className="text-sm text-slate-400">Top players by XP. Only logged-in players appear. XP is reported by the browser, so this board is for fun and is not tamper-proof.{d?.store === "memory" && " Accounts are in memory (demo) on this server."}</p></div>
    <ol className="space-y-2">{d?.rows?.map((r: any) => <li key={r.rank} className={`panel flex items-center gap-4 p-3 ${user && user.name.startsWith(r.name.split(" ")[0]) ? "panel-hi" : ""}`}><b className="w-8 font-display text-xl text-xp">{r.rank}</b><span className="flex-1 font-semibold">{r.name}</span><span className="text-xs text-slate-400">Lv {r.level}</span><b className="font-display">{r.xp} XP</b></li>)}</ol>
    {d && d.rows.length === 0 && <p className="panel p-5 text-sm text-slate-300">Abhi koi player nahi. Account banao aur sabse pehle rank le.</p>}</div>);
}
