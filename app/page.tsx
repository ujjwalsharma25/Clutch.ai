"use client";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import { useGame } from "@/components/GameProvider";
const F = [1, 2, 3, 4, 5, 6];
export default function Home() {
  const { t } = useGame();
  return (<div className="space-y-20 py-6">
    <section className="grid items-center gap-10 md:grid-cols-2">
      <div><p className="font-display text-xs uppercase tracking-[0.3em] text-a2">{t("home.tag")}</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] md:text-6xl">{t("home.h1a")}<span className="grad">{t("home.h1b")}</span></h1>
        <p className="mt-4 max-w-md text-slate-300">{t("home.sub")}</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/study" className="btn">{t("home.guest")}</Link><Link href="/register" className="btn2">{t("home.register")}</Link><Link href="/login" className="btn2">{t("home.login")}</Link></div>
        <p className="mt-3 text-xs text-slate-500">{t("home.noacc")}</p></div>
      <div className="relative h-[360px]" style={{ perspective: 1200 }}><div className="absolute inset-0" style={{ transform: "rotateY(-18deg) rotateX(10deg)", transformStyle: "preserve-3d" }}>
        <div className="panel absolute left-2 top-6 w-64 animate-float p-4" style={{ transform: "translateZ(20px)" }}><p className="font-display text-xs uppercase text-good">{t("home.c1")}</p><p className="mt-1 text-sm">{t("home.c1d")}</p></div>
        <div className="panel panel-hi absolute right-0 top-28 w-60 animate-float p-4" style={{ transform: "translateZ(80px)", animationDelay: "1s" }}><p className="font-display text-xs uppercase text-a2">{t("home.c2")}</p><p className="mt-1 text-sm"><mark className="bg-a2/30 text-inherit">a long process at the front makes short processes wait</mark></p></div>
        <div className="panel absolute bottom-4 left-10 w-56 animate-float p-4" style={{ transform: "translateZ(140px)", animationDelay: "2s" }}><p className="font-display text-xs uppercase text-xp">{t("home.c3")}</p><p className="mt-1 text-sm">{t("home.c3d")}</p></div></div></div></section>
    <section><h2 className="mb-5 font-display text-2xl font-bold uppercase tracking-wider">{t("home.abil")}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{F.map((n) => <TiltCard key={n} className="panel p-5"><h3 className="font-display text-lg font-bold">{t("home.f" + n)}</h3><p className="mt-2 text-sm text-slate-300">{t("home.f" + n + "d")}</p></TiltCard>)}</div></section></div>);
}
