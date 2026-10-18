"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
export type CNode = { id: string; name: string; level: number; day: number; prereq: string[]; due?: boolean };
const col = (l: number) => (l >= 100 ? "#34d399" : l >= 50 ? "#22d3ee" : l > 0 ? "#a78bfa" : "#64748b");
// Isometric 3D skill tree: a tilted grid floor, nodes raised above it, labels counter-rotated to face the viewer, pointer parallax.
export default function SkillTree3D({ nodes, activeId, onPick }: { nodes: CNode[]; activeId?: string; onPick: (id: string) => void }) {
  const mx = useMotionValue(0);
  const rz = useSpring(useTransform(mx, [-1, 1], [-36, -20]), { stiffness: 60, damping: 14 });
  const inv = useTransform(rz, (v) => -v);
  const W = 620, H = 140 + nodes.length * 64;
  const pos = nodes.map((_, i) => ({ x: W / 2 + Math.sin(i * 1.05) * W * 0.3, y: 70 + (i * (H - 140)) / Math.max(1, nodes.length - 1) }));
  const next = nodes.findIndex((n) => n.level < 100);
  return (
    <div className="glass relative h-[480px] overflow-hidden" style={{ perspective: 1100 }} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); }}>
      <motion.div className="absolute left-1/2 top-4" style={{ width: W, height: H, marginLeft: -W / 2, transformStyle: "preserve-3d", rotateX: 58, rotateZ: rz }}>
        <div className="absolute inset-0 rounded-3xl border border-cyan-400/25" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.09) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <svg className="absolute inset-0" width={W} height={H} aria-hidden>
          {nodes.map((n, i) => i > 0 && <line key={"s" + i} x1={pos[i - 1].x} y1={pos[i - 1].y} x2={pos[i].x} y2={pos[i].y} stroke="#22d3ee" strokeWidth="3" strokeDasharray="8 8" opacity=".7" />)}
          {nodes.flatMap((n, i) => n.prereq.map((p) => { const j = nodes.findIndex((x) => x.id === p); return j >= 0 && j !== i - 1 ? <line key={n.id + p} x1={pos[j].x} y1={pos[j].y} x2={pos[i].x} y2={pos[i].y} stroke="#a78bfa" strokeWidth="2" opacity=".5" /> : null; }))}
        </svg>
        {nodes.map((n, i) => (
          <div key={n.id}>
            <div className="absolute rounded-full" style={{ left: pos[i].x - 36, top: pos[i].y - 36, width: 72, height: 72, background: "radial-gradient(circle, rgba(0,0,0,.6), transparent 70%)" }} />
            <button onClick={() => onPick(n.id)} aria-label={`${n.name}, mastery ${n.level} percent`} className="absolute" style={{ left: pos[i].x - 28, top: pos[i].y - 28, width: 56, height: 56, transform: "translateZ(34px)", transformStyle: "preserve-3d" }}>
              <motion.span className="block h-full w-full" style={{ rotateZ: inv, transformStyle: "preserve-3d" }}>
                <span className="relative block h-full w-full" style={{ transform: "rotateX(-58deg)", transformOrigin: "50% 100%" }}>
                  {i === next && <span className="absolute inset-0 animate-ring rounded-full border-2 border-cyan-300" />}
                  <span className="grid h-full w-full place-items-center rounded-full text-sm font-bold" style={{ background: "#0b1020", border: `4px solid ${col(n.level)}`, boxShadow: `0 0 ${n.id === activeId ? 28 : 14}px ${col(n.level)}88` }}>{n.level >= 100 ? "✓" : i + 1}</span>
                  {n.due && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-amber-400" title="Due for review" />}
                  <span className="absolute left-1/2 top-[60px] w-32 -translate-x-1/2 text-center text-[11px] leading-tight text-slate-200" style={{ textShadow: "0 1px 6px #000" }}>{n.name}</span>
                </span>
              </motion.span>
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
