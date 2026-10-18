"use client";
import Link from "next/link";
import { useGame } from "./GameProvider";
const L = [["/study", "nav.study"], ["/career", "nav.career"], ["/leaderboard", "nav.board"]];
export default function NavLinks() {
  const { t } = useGame();
  return (<nav className="flex gap-1 text-sm" aria-label="Main">{L.map(([h, k]) => <Link key={h} href={h} className="px-3 py-1.5 font-display uppercase tracking-wider text-slate-300 hover:text-a2">{t(k)}</Link>)}</nav>);
}
