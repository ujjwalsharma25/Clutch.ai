// SM-2 spaced repetition (the Anki-style scheduler) plus a 0-100 mastery level used by the skill tree.
export type Card = { ease: number; interval: number; reps: number; due: number; level: number };
export const fresh = (): Card => ({ ease: 2.5, interval: 0, reps: 0, due: 0, level: 0 });
// q: 0-5 answer quality. 5 = correct without help, 3 = correct with a hint, 1 = wrong.
export function review(c: Card, q: number, now = Date.now()): Card {
  let { ease, interval, reps } = c;
  if (q < 3) { reps = 0; interval = 1; } else { reps += 1; interval = reps === 1 ? 1 : reps === 2 ? 6 : Math.round(interval * ease); }
  ease = Math.max(1.3, ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return { ease, interval, reps, due: now + interval * 864e5, level: Math.max(0, Math.min(100, c.level + (q >= 3 ? 25 : -15))) };
}
// Adaptive difficulty from the learner's average mastery on the concepts being practised.
export const difficultyFor = (avg: number) => (avg < 35 ? "easy" : avg < 70 ? "medium" : "hard");
