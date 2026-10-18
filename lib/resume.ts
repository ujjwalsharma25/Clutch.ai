// Deterministic resume checks (no AI), plus a word-boundary term finder used to verify that AI-claimed skills really appear in the text.
export const hasTerm = (text: string, term: string) => !!term.trim() && new RegExp("(^|[^a-z0-9+#.])" + term.trim().replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&") + "($|[^a-z0-9+#])", "i").test(text);
const VERBS = /^(built|developed|designed|implemented|led|created|reduced|improved|optimi[sz]ed|deployed|managed|analy[sz]ed|launched|automated|migrated|wrote|trained|organi[sz]ed|increased|achieved)\b/i;
export function atsChecks(text: string) {
  const lines = text.split("\n").map((l) => l.replace(/^[\s\-•*·\d.)]+/, "").trim()).filter(Boolean), words = text.split(/\s+/).filter(Boolean).length;
  const checks = [
    { label: "Email address present", pass: /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text), tip: "Add a professional email at the top." },
    { label: "Phone number present", pass: /(\+?\d[\d\s-]{8,}\d)/.test(text), tip: "Add a phone number recruiters can call." },
    { label: "Experience or internships section", pass: /experience|internship|work history/i.test(text), tip: "Add an Experience or Internships heading." },
    { label: "Education section", pass: /education|b\.?tech|b\.?e\b|bachelor|degree|university|college/i.test(text), tip: "Add your education details." },
    { label: "Skills section", pass: /skills|technologies|tech stack/i.test(text), tip: "List your technical skills under a Skills heading." },
    { label: "Projects section", pass: /projects?\b/i.test(text), tip: "Add 2-3 projects with what you built." },
    { label: "At least 3 bullets with numbers or results", pass: lines.filter((l) => /\d|%/.test(l)).length >= 3, tip: "Quantify impact, e.g. 'cut load time by 40%'." },
    { label: "At least 3 bullets starting with action verbs", pass: lines.filter((l) => VERBS.test(l)).length >= 3, tip: "Start bullets with verbs like Built, Led, Improved." },
    { label: "Sensible length (200-900 words)", pass: words >= 200 && words <= 900, tip: "Aim for one focused page." },
    { label: "No weak phrases", pass: !/responsible for|worked on|hard[- ]?working|team player/i.test(text), tip: "Replace 'responsible for' or 'worked on' with specific actions." },
  ];
  return { score: Math.round((checks.filter((c) => c.pass).length / checks.length) * 100), checks };
}
