"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "./GameProvider";
const STEPS = [1, 2, 3, 4];
export default function Tour({ onDone }: { onDone: () => void }) {
  const { t } = useGame(); const [i, setI] = useState(0); const last = i === STEPS.length - 1;
  return (<div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4" role="dialog" aria-label={t("tour.label")}><motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="panel panel-hi max-w-md p-6">
    <p className="font-display text-xs uppercase tracking-[0.3em] text-a2">{t("tour.label")} {i + 1}/{STEPS.length}</p><h2 className="mt-1 text-2xl font-bold">{t("tour." + STEPS[i] + "t")}</h2><p className="mt-2 text-sm text-slate-300">{t("tour." + STEPS[i] + "d")}</p>
    <div className="mt-5 flex items-center justify-between"><button className="text-xs text-slate-400 underline" onClick={onDone}>{t("tour.skip")}</button><div className="flex gap-1">{STEPS.map((_, k) => <span key={k} className={`h-1.5 w-6 ${k <= i ? "bg-a2" : "bg-edge"}`} />)}</div><button className="btn" onClick={() => (last ? onDone() : setI(i + 1))}>{last ? t("tour.start") : t("tour.next")}</button></div></motion.div></div>);
}
