// Reproducible check of the Study Companion: 20 fixed questions on the sample notes, baseline vs evidence verification.
// Start the app (npm run dev), then: npm run eval        Results are saved to eval-results.json
import fs from "fs";
import { SAMPLE_NOTES } from "../lib/sampleNotes";
const URL_ = (process.env.APP_URL || "http://localhost:3000") + "/api/study/ask";
type T = { q: string; expect: "supported" | "unsupported"; kind: string };
const S = (q: string, kind = "ordinary"): T => ({ q, expect: "supported", kind }), U = (q: string, kind = "out-of-notes"): T => ({ q, expect: "unsupported", kind });
const TESTS: T[] = [
  S("Convoy effect kya hota hai?"), S("Round Robin mein time quantum bahut chhota ho to kya problem hoti hai?"), S("SJF mein starvation kyun ho sakta hai?"), S("Waiting time ka formula kya hai?"), S("Turnaround time kaise nikalte hain?"),
  S("Aging kya karta hai?"), S("SRTF kya hai?"), S("Agar quantum bahut bada ho to RR kiske jaisa ho jata hai?"), S("FCFS ki sabse badi problem kya hai?", "paraphrased"), S("Kaunsa algorithm priority ke basis pe process chunta hai?", "paraphrased"),
  U("Banker's algorithm kya hai?"), U("Paging aur segmentation mein kya fark hai?"), U("Deadlock ki chaar conditions kaunsi hain?"), U("Multilevel feedback queue kaise kaam karta hai?"), U("Linux ka CFS scheduler kaise kaam karta hai?"),
  U("Sabse best scheduling algorithm kaunsa hai?", "failure-inducing"), U("Round Robin ke liye ideal quantum kitne milliseconds ka hona chahiye?", "failure-inducing"), U("Semaphore kya hota hai?"), U("Virtual memory kya hai?"), U("SJF ka Gantt chart example ke saath banao.", "failure-inducing"),
];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function run(verify: boolean) {
  const rows: any[] = [];
  for (const t of TESTS) {
    if (+(process.env.EVAL_DELAY_MS || 0)) await sleep(+process.env.EVAL_DELAY_MS!);
    const r = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: SAMPLE_NOTES, question: t.q, verify }) }); const d = await r.json();
    const status = r.ok ? d.status : "ERROR"; const pass = t.expect === "supported" ? status === "SUPPORTED" : status !== "SUPPORTED" && status !== "ERROR";
    rows.push({ id: rows.length + 1, question: t.q, kind: t.kind, expect: t.expect, status, pass, output: d.answer || d.message || d.error || "" });
  }
  return rows;
}
(async () => {
  const out: any = { at: new Date().toISOString(), provider: process.env.INFERENCE_PROVIDER || "ollama", model: process.env.GEMMA_MODEL || process.env.GEMMA_API_MODEL, variants: {} };
  for (const [name, verify] of [["baseline (no evidence check)", false], ["with evidence verification", true]] as const) {
    const rows = await run(verify); const passed = rows.filter((r) => r.pass).length; out.variants[name] = { passed, total: rows.length, rows };
    console.log(`\n${name}: ${passed}/${rows.length} passed`); console.table(rows.map((r) => ({ id: r.id, question: r.question.slice(0, 50), expect: r.expect, status: r.status, pass: r.pass })));
  }
  fs.writeFileSync("eval-results.json", JSON.stringify(out, null, 2)); console.log("\nSaved eval-results.json. Failed rows keep the raw output for failure analysis.");
})().catch((e) => { console.error("Eval could not run. Is the app running and the model reachable?", e.message); process.exit(1); });
