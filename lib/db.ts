import crypto from "crypto";
export type U = { id: string; email: string; name: string; passwordHash: string; createdAt: number; xp: number; level: number; state: string; stateTs: number };
type R = { hash: string; userId: string; exp: number; used: boolean };
export interface Store {
  kind: "mongo" | "memory";
  byEmail(e: string): Promise<U | null>; byId(id: string): Promise<U | null>; create(u: U): Promise<void>; patch(id: string, p: Partial<U>): Promise<void>; remove(id: string): Promise<void>; top(n: number): Promise<U[]>;
  saveReset(r: R): Promise<void>; takeReset(hash: string): Promise<string | null>;
}
const g = globalThis as any;
function memory(): Store {
  const users: Map<string, U> = (g.__mu ||= new Map()); const resets: R[] = (g.__mr ||= []);
  return {
    kind: "memory",
    byEmail: async (e) => Array.from(users.values()).find((u) => u.email === e) || null, byId: async (id) => users.get(id) || null,
    create: async (u) => { users.set(u.id, u); }, patch: async (id, p) => { const u = users.get(id); if (u) users.set(id, { ...u, ...p }); }, remove: async (id) => { users.delete(id); },
    top: async (n) => Array.from(users.values()).sort((a, b) => b.xp - a.xp).slice(0, n),
    saveReset: async (r) => { resets.push(r); },
    takeReset: async (hash) => { const r = resets.find((x) => x.hash === hash && !x.used && x.exp > Date.now()); if (!r) return null; r.used = true; return r.userId; },
  };
}
function mongo(uri: string): Store {
  const conn = async () => {
    if (!g.__mc) g.__mc = (async () => { const { MongoClient } = await import("mongodb"); const c = await new MongoClient(uri).connect(); const db = c.db(); await db.collection("users").createIndex({ email: 1 }, { unique: true }); await db.collection("users").createIndex({ id: 1 }, { unique: true }); return db; })();
    return g.__mc;
  };
  const strip = (d: any) => (d ? ({ ...d, _id: undefined } as U) : null);
  return {
    kind: "mongo",
    byEmail: async (e) => strip(await (await conn()).collection("users").findOne({ email: e })), byId: async (id) => strip(await (await conn()).collection("users").findOne({ id })),
    create: async (u) => { await (await conn()).collection("users").insertOne({ ...u }); }, patch: async (id, p) => { await (await conn()).collection("users").updateOne({ id }, { $set: p }); }, remove: async (id) => { await (await conn()).collection("users").deleteOne({ id }); },
    top: async (n) => (await (await conn()).collection("users").find({}).sort({ xp: -1 }).limit(n).toArray()).map((d: any) => strip(d)!),
    saveReset: async (r) => { await (await conn()).collection("resets").insertOne({ ...r }); },
    takeReset: async (hash) => { const d = await (await conn()).collection("resets").findOneAndUpdate({ hash, used: false, exp: { $gt: Date.now() } }, { $set: { used: true } }); return (d as any)?.userId || null; },
  };
}
// Accounts are optional. No MONGODB_URI -> in-memory store (demo only); with it -> MongoDB Atlas.
export const getStore = (): Store => (process.env.MONGODB_URI ? (g.__ms ||= mongo(process.env.MONGODB_URI)) : (g.__mm ||= memory()));
export const newId = () => crypto.randomUUID();
