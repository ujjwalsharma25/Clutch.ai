import { SignJWT, jwtVerify } from "jose";
const k = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret");
// The quiz answer key is signed and sent to the browser, so the browser cannot read or change it.
export const signKey = (q: any[]) => new SignJWT({ q }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("2h").sign(k());
export async function readKey(t: string): Promise<any[]> { const { payload } = await jwtVerify(t, k()); return payload.q as any[]; }
