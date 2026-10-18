"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
export default function Confetti({ n = 36 }: { n?: number }) {
  const ps = useMemo(() => Array.from({ length: n }, (_, i) => ({ x: Math.random() * 100, d: Math.random() * 0.6, r: Math.random() * 720 - 360, c: ["#22d3ee", "#8b5cf6", "#fbbf24", "#fb7185", "#34d399"][i % 5], s: 6 + Math.random() * 6 })), [n]);
  return <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>{ps.map((p, i) => <motion.span key={i} className="absolute block" style={{ left: p.x + "%", top: -20, width: p.s, height: p.s * 1.6, background: p.c }} initial={{ y: -20, rotate: 0, opacity: 1 }} animate={{ y: "110vh", rotate: p.r, opacity: [1, 1, 0] }} transition={{ duration: 2.4 + p.d * 2, delay: p.d, ease: "easeIn" }} />)}</div>;
}
