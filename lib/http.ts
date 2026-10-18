export const err = (m: string, s = 400) => Response.json({ error: m }, { status: s });
export const ok = (d: any) => Response.json(d);
