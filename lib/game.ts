// Game layer: XP, levels, ranks, streaks, daily quests and badges. Pure functions so they can be tested offline.
export type Game = { xp: number; streak: number; best: number; lastDay: string; badges: string[]; quests: { day: string; done: Record<string, number> }; counters: Record<string, number> };
export type Ev = "ask_ok" | "ask_gap" | "quiz_ok" | "quiz_bad" | "boss_win" | "plan" | "photo" | "voice" | "review" | "mastered" | "tour" | "coach" | "career";
export const fresh = (): Game => ({ xp: 0, streak: 0, best: 0, lastDay: "", badges: [], quests: { day: "", done: {} }, counters: {} });
export const today = (t = Date.now()) => new Date(t).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
export function levelOf(xp: number) { let level = 1, need = 100, rem = xp; while (rem >= need) { rem -= need; level++; need = Math.round(need * 1.25); } return { level, into: rem, need }; }
export const RANKS = ["Rookie", "Scout", "Scholar", "Strategist", "Master", "Legend"];
export const rankOf = (level: number) => RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 3))];
export const QUESTS = [{ id: "ask2", label: "Ask 2 questions", goal: 2, xp: 30 }, { id: "boss1", label: "Win 1 boss battle", goal: 1, xp: 50 }, { id: "review1", label: "Review 1 due concept", goal: 1, xp: 40 }];
export const BADGES: { id: string; name: string; desc: string; icon: string; test: (c: Record<string, number>, g: Game) => boolean }[] = [
  { id: "first_blood", name: "First Blood", desc: "Get your first answer backed by evidence", icon: "★", test: (c) => (c.supported || 0) >= 1 },
  { id: "truth_seeker", name: "Truth Seeker", desc: "Find something your notes do not cover", icon: "?", test: (c) => (c.gaps || 0) >= 1 },
  { id: "voice_master", name: "Voice Master", desc: "Ask a question with your voice", icon: "♪", test: (c) => (c.voice || 0) >= 1 },
  { id: "photo_scholar", name: "Photo Scholar", desc: "Load notes from a photo", icon: "◉", test: (c) => (c.photos || 0) >= 1 },
  { id: "cartographer", name: "Cartographer", desc: "Build your 3D study plan", icon: "◆", test: (c) => (c.plans || 0) >= 1 },
  { id: "combo_3", name: "Combo x3", desc: "Three correct answers in a row", icon: "✦", test: (c) => (c.maxCombo || 0) >= 3 },
  { id: "boss_slayer", name: "Boss Slayer", desc: "Win a boss battle", icon: "⚔", test: (c) => (c.boss || 0) >= 1 },
  { id: "sharpshooter", name: "Sharpshooter", desc: "10 correct quiz answers", icon: "◎", test: (c) => (c.quizOk || 0) >= 10 },
  { id: "master", name: "Concept Master", desc: "Reach 100% mastery on a concept", icon: "♛", test: (c) => (c.mastered || 0) >= 1 },
  { id: "streak_3", name: "On Fire", desc: "Study 3 days in a row", icon: "▲", test: (_c, g) => g.streak >= 3 },
];
const XP: Record<Ev, number> = { ask_ok: 10, ask_gap: 6, quiz_ok: 15, quiz_bad: 3, boss_win: 50, plan: 20, photo: 10, voice: 5, review: 20, mastered: 40, tour: 20, coach: 2, career: 10 };
const COUNT: Partial<Record<Ev, string[]>> = { ask_ok: ["asks", "supported"], ask_gap: ["asks", "gaps"], quiz_ok: ["quizOk"], quiz_bad: ["quizBad"], boss_win: ["boss"], plan: ["plans"], photo: ["photos"], voice: ["voice"], review: ["reviews"], mastered: ["mastered"] };
export function applyEvent(g: Game, ev: Ev, o: { combo?: number } = {}, now = Date.now()) {
  const next: Game = JSON.parse(JSON.stringify(g)); const day = today(now); let gained = XP[ev] + (ev === "quiz_ok" ? Math.max(0, (o.combo || 1) - 1) * 5 : 0);
  if (next.lastDay !== day) { next.streak = next.lastDay === today(now - 864e5) ? next.streak + 1 : 1; next.lastDay = day; next.best = Math.max(next.best, next.streak); }
  if (next.quests.day !== day) next.quests = { day, done: {} };
  const c = next.counters; for (const k of COUNT[ev] || []) c[k] = (c[k] || 0) + 1; if (ev === "quiz_ok") c.maxCombo = Math.max(c.maxCombo || 0, o.combo || 1);
  const questDone: string[] = []; const bump = (id: string) => { const q = QUESTS.find((x) => x.id === id)!; const b = next.quests.done[id] || 0; if (b >= q.goal) return; next.quests.done[id] = b + 1; if (b + 1 >= q.goal) { gained += q.xp; questDone.push(id); } };
  if (ev === "ask_ok" || ev === "ask_gap") bump("ask2"); if (ev === "boss_win") bump("boss1"); if (ev === "review") bump("review1");
  next.xp += gained; const newBadges: string[] = []; for (const b of BADGES) if (!next.badges.includes(b.id) && b.test(c, next)) { next.badges.push(b.id); newBadges.push(b.id); }
  return { game: next, gained, newBadges, questDone, levelBefore: levelOf(g.xp).level, levelAfter: levelOf(next.xp).level };
}
