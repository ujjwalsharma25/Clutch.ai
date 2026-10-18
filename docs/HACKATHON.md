# Hackathon playbook (IIMT Hacktoberfest Hackday, 27 Oct 2026)

Source: the IIMT brochure and the problem-statement booklet.

## Dates that matter
| Date | What |
|---|---|
| 20 Oct 2026 | Registration deadline and idea submission deadline (team lead, Google Form) |
| 23 Oct 2026 | Shortlisted ideas announced |
| 27 Oct 2026, 9:30 AM | Event day at IIMT University, Meerut |

## Rules you must follow (from the brochure)
- [ ] Team of 2 to 4. Every member registers individually on OrganizerHQ with the same email. Teams cannot change later.
- [ ] Only the **team lead** submits the Google Form (duplicate submissions can be rejected): team details with GitHub profiles, eligibility and consent, the idea PPT (use the official template) and a short explainer video.
- [ ] One idea per team, aligned to a listed problem statement: **PS 01 Study Companion from Real Notes (Track 1, Gemma 4)**.
- [ ] **The project must be almost ready before event day.** HackDay gives about 2.5 hours for debugging and improvement only. You will not build from scratch.
- [ ] Keep the **GitHub repository link and the hosted project link ready** before reporting to the venue.
- [ ] Bring laptop, charger, college ID and government ID. Complete OrganizerHQ check-in.
- [ ] Follow the MLH Code of Conduct. Respect intellectual property and licences: use only code you wrote or that is licensed for reuse, with credit.
- [ ] Open-weight model stays central (Gemma 4). APIs are allowed. Pull requests are not the basis for participation.

## Shortlisting criteria and how this project answers them
| Criterion | Answer |
|---|---|
| Problem relevance | Built exactly for PS 01: notes, evidence, quiz, feedback, honest refusal |
| Innovation | Evidence verification of every quote, signed quiz key, SM-2 adaptive boss battles, 3D plan, voice, game layer |
| AI implementation | Gemma 4 does answering, quiz writing, feedback, planning and photo notes; code verifies its output |
| Open-source alignment | MIT licence, open-weight Gemma 4 on Ollama or via API, reproducible eval script |
| Technical feasibility | Next.js app, builds and runs, logic and route tests, runs with or without a GPU |
| Social and real-world impact | Hinglish, English and Hindi for Indian students; works from photos of notes; privacy-first |
| MVP clarity | One clear flow: notes, ask, evidence, quiz, feedback, plan |

## Event-day plan
| Time | Do |
|---|---|
| Before 9:30 | Check-in. Open the hosted link and `/api/health` on the venue wifi. |
| 10:00-11:00 Judges session | Listen for the parameters judges want. Write them down. |
| 11:00-1:00 Refine, host, submit | Implement the judges' suggestions. Redeploy. Submit the GitHub repo through OrganizerHQ and to the organizers. |
| 2:00-3:00 Evaluation | Judges visit. Run the 6-step demo from the README. |
| 3:00-4:00 Final presentations (top teams) | 5-minute pitch below. |

## 5-minute pitch
1. **Problem (30 s):** chatbots answer from memory even when your notes do not say it.
2. **Demo (3 min):** README checklist. Say aloud: proof, honest refusal, boss battle with feedback, plan that adapts.
3. **Proof (1 min):** `npm run eval`, baseline vs evidence check. Show one failure.
4. **Why Gemma 4 (30 s):** open-weight, reads photos, multilingual, can run privately; the app verifies it.

## Before you submit (checklist)
- [ ] Hosted link works on a phone and a laptop (see Vercel notes in the README; set `MONGODB_URI` or use guest mode only)
- [ ] `/api/health` shows `"ok": true`; `npm run test:logic` and `npm run eval` run; results pasted in the README
- [ ] 2-3 screenshots in the README; public repo; MIT licence present
- [ ] PPT filled in the official template; 2-minute video recorded (see `docs/VIDEO_SCRIPT.md`)
- [ ] Do not demo Career Lab in the main flow; mention it as an extension in one sentence

## Judge questions
- *How do you stop hallucination?* A quote must be found in the notes (exact or 85% word match) or the answer is not shown. Plan concepts and quiz questions need evidence too.
- *Does the AI grade itself?* No. Matching, quiz keys, spaced repetition, XP and scores are plain code.
- *Where does my data go?* Notes stay on the device and go only to the configured model. Accounts store progress only. Only reply text goes to ElevenLabs, if enabled.
- *Why a game layer?* Retention: streaks, quests and boss battles make revision a habit. It is optional polish, the core is the evidence loop.
- *Limits?* State them first (README).
