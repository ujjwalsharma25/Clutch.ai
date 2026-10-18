"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "./GameProvider";
export default function AuthForm({ mode, token }: { mode: "login" | "register" | "forgot" | "reset"; token?: string }) {
  const [f, setF] = useState<any>({}); const [msg, setMsg] = useState(""); const [dev, setDev] = useState(""); const [busy, setBusy] = useState(false); const { setUser, backend } = useGame(); const router = useRouter();
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  async function submit(e: any) {
    e.preventDefault(); setBusy(true); setMsg(""); setDev(""); const r = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, token }) }); const d = await r.json().catch(() => ({})); setBusy(false);
    if (!r.ok) return setMsg(d.error || "Something went wrong.");
    if (mode === "forgot") { setMsg(d.message); if (d.devLink) setDev(d.devLink); return; }
    if (mode === "reset") { setMsg("Password changed. Login page par ja rahe hain..."); return void setTimeout(() => router.push("/login"), 1000); }
    setUser(d.user); router.push("/study");
  }
  const title = { login: "Continue your quest", register: "Create your player", forgot: "Recover your account", reset: "Set a new password" }[mode];
  return (<form onSubmit={submit} className="panel panel-hi mx-auto max-w-md space-y-4 p-6">
    <div><p className="font-display text-xs uppercase tracking-[0.3em] text-a2">{mode === "register" ? "New game" : "Player login"}</p><h1 className="text-2xl font-bold">{title}</h1></div>
    {mode === "register" && <div><label className="lbl" htmlFor="n">Player name</label><input id="n" className="inp" required onChange={set("name")} /></div>}
    {mode !== "reset" && <div><label className="lbl" htmlFor="e">Email</label><input id="e" type="email" className="inp" required onChange={set("email")} /></div>}
    {mode !== "forgot" && <div><label className="lbl" htmlFor="p">{mode === "reset" ? "New password" : "Password"}</label><input id="p" type="password" minLength={8} className="inp" required onChange={set("password")} /></div>}
    <button className="btn w-full" disabled={busy}>{busy ? "Please wait..." : mode === "register" ? "Create account" : mode === "login" ? "Log in" : mode === "forgot" ? "Send reset link" : "Save password"}</button>
    {msg && <p className="text-sm text-xp" role="status">{msg}</p>}{dev && <p className="break-all text-xs text-slate-400">Local demo (no SMTP): <Link className="underline" href={dev.replace(/^https?:\/\/[^/]+/, "")}>open reset link</Link></p>}
    <p className="text-sm text-slate-400">{mode === "login" && <><Link className="underline" href="/forgot">Forgot password?</Link> | <Link className="underline" href="/register">New player? Sign up</Link></>}{mode === "register" && <>Already playing? <Link className="underline" href="/login">Log in</Link></>}{(mode === "forgot" || mode === "reset") && <Link className="underline" href="/login">Back to login</Link>}</p>
    <p className="border-t border-edge/60 pt-3 text-xs text-slate-500">No account needed: <Link className="underline" href="/study">play as guest</Link>. Accounts sync your XP, streak and mastery across devices; notes stay on your device.{backend === "memory" && " This server stores accounts in memory only (demo mode)."}</p></form>);
}
