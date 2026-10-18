import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const key = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret");
export async function setSession(id: string) { const t = await new SignJWT({ uid: id }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("14d").sign(key()); cookies().set("clutch_session", t, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 14 * 864e3 }); }
export const clearSession = () => cookies().delete("clutch_session");
export async function sessionUserId(): Promise<string | null> { const c = cookies().get("clutch_session")?.value; if (!c) return null; try { return (await jwtVerify(c, key())).payload.uid as string; } catch { return null; } }
