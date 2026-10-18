// Job-post reality check: transparent rules, no AI, so it cannot hallucinate. A heuristic that flags common scam patterns, not a verdict.
const R: { id: string; label: string; weight: number; why: string; test: (t: string) => boolean }[] = [
  { id: "fee", label: "Asks candidates to pay money", weight: 35, why: "Genuine employers do not charge registration, training or security fees.", test: (t) => /(registration|security|training|processing|joining|kit|laptop)\s*(fee|deposit|charges?|amount)|\b(pay|deposit)\s+(rs\.?|inr|₹)/i.test(t) },
  { id: "guarantee", label: "Guaranteed job or placement", weight: 20, why: "Nobody can honestly guarantee selection.", test: (t) => /guaranteed\s+(job|placement|selection)|100\s*%\s*(job|placement|selection)/i.test(t) },
  { id: "earnings", label: "Unrealistic daily or weekly earnings", weight: 25, why: "Promises of large money per day or week for simple work are a classic scam sign.", test: (t) => /(earn|income|salary)[^.\n]{0,30}\d{2,3}[,\d]*\s*(k|000)?\s*(per|\/|a)\s*(day|week)|easy\s+(money|income)/i.test(t) },
  { id: "noskill", label: "No skills needed but high pay", weight: 15, why: "High pay with no requirements rarely matches a real role.", test: (t) => /no\s+(experience|skills?|qualification)/i.test(t) && /(₹|rs\.?|inr)\s?\d{2,3}[,\d]*/i.test(t) },
  { id: "chatonly", label: "WhatsApp or Telegram only contact", weight: 15, why: "Real recruiters use official company channels.", test: (t) => /(whatsapp|telegram)/i.test(t) && !/(careers?|jobs?)\.[a-z-]+\.(com|in|org)/i.test(t) },
  { id: "freemail", label: "Free email address for HR", weight: 10, why: "Companies normally use their own email domain.", test: (t) => /@(gmail|yahoo|outlook|hotmail|rediffmail)\.com/i.test(t) },
  { id: "urgency", label: "Pressure and urgency", weight: 10, why: "Artificial urgency is used to stop you from checking.", test: (t) => /limited\s+seats|apply\s+(now|immediately)|hurry|last\s+chance|only\s+today/i.test(t) },
  { id: "vague", label: "No clear company name", weight: 10, why: "A real post names the company so you can verify it.", test: (t) => !/\b(pvt|ltd|llp|inc|technologies|solutions|private limited|corporation|systems|labs)\b/i.test(t) },
  { id: "shouting", label: "Shouting and excessive punctuation", weight: 5, why: "Polished employers rarely write like this.", test: (t) => /!{3,}/.test(t) || (t.match(/\b[A-Z]{6,}\b/g) || []).length > 4 },
];
export function realityScore(text: string) {
  if (text.trim().length < 40) return { score: null as number | null, label: "Paste the full job post", flags: [] as { id: string; label: string; why: string; weight: number }[] };
  const flags = R.filter((r) => r.test(text)).map(({ id, label, why, weight }) => ({ id, label, why, weight })), score = Math.max(0, 100 - flags.reduce((a, f) => a + f.weight, 0));
  return { score, label: score >= 80 ? "Looks reasonable" : score >= 50 ? "Be careful" : "High risk", flags };
}
