// Everything the student does stays in this browser (localStorage). No accounts, no database.
export const load = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem("clutch." + k); return v ? (JSON.parse(v) as T) : d; } catch { return d; } };
export const save = (k: string, v: any) => { try { localStorage.setItem("clutch." + k, JSON.stringify(v)); } catch {} };
