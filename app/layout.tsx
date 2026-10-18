import "./globals.css";
import Link from "next/link";
import GameProvider from "@/components/GameProvider";
import Hud from "@/components/Hud";
import Coach from "@/components/Coach";
import NavLinks from "@/components/NavLinks";
export const metadata = { title: "CLUTCH.ai Study Companion", description: "Evidence-grounded study companion powered by Gemma 4. Ask by voice, get answers from your own notes, level up." };
export const viewport = { themeColor: "#070612" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" data-theme="neon"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" /></head><body>
    <GameProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-a2 focus:px-3 focus:py-1 focus:text-black">Skip to content</a>
      <header className="sticky top-0 z-20 border-b border-edge/60 bg-ink/80 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide"><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgb(34 211 238)" /><stop offset="1" stopColor="rgb(139 92 246)" /></linearGradient></defs><path d="M16 2l12 7v14l-12 7L4 23V9z" fill="#0b1020" stroke="url(#lg)" strokeWidth="2" /><path d="M20.5 12.5a6 6 0 100 7" fill="none" stroke="url(#lg)" strokeWidth="2.4" strokeLinecap="round" /></svg>CLUTCH<span className="grad">.ai</span></Link>
        <NavLinks />
        <div className="ml-auto"><Hud /></div></div></header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-edge/60 py-6 text-center text-xs text-slate-500">CLUTCH.ai Study Companion | Hacktoberfest Hackday 2026, PS 01 | Founder and Chief Architect: Ujjwal Sharma</footer>
      <Coach />
    </GameProvider></body></html>);
}
