// UI translations. Order of each tuple: [Hinglish, English, Hindi]. Notes content itself is never translated.
export type Lang = "hinglish" | "english" | "hindi";
export const LANGS_LIST: { id: Lang; label: string }[] = [{ id: "hinglish", label: "Hinglish" }, { id: "english", label: "English" }, { id: "hindi", label: "हिन्दी" }];
export const SPEECH: Record<Lang, string> = { hinglish: "en-IN", english: "en-IN", hindi: "hi-IN" };
type T3 = [string, string, string];
const D: Record<string, T3> = {
  // navigation, header
  "nav.study": ["Study", "Study", "पढ़ाई"], "nav.career": ["Career Lab", "Career Lab", "करियर लैब"], "nav.board": ["Board", "Leaderboard", "लीडरबोर्ड"],
  "hud.login": ["Log in", "Log in", "लॉग इन"], "hud.logout": ["Log out", "Log out", "लॉग आउट"], "hud.streak": ["Day streak", "Day streak", "लगातार दिन"], "hud.sfx": ["SFX", "SFX", "आवाज़"], "hud.mute": ["MUTE", "MUTE", "म्यूट"], "hud.lang": ["Language", "Language", "भाषा"],
  "rank.Rookie": ["Rookie", "Rookie", "नौसिखिया"], "rank.Scout": ["Scout", "Scout", "खोजी"], "rank.Scholar": ["Scholar", "Scholar", "विद्वान"], "rank.Strategist": ["Strategist", "Strategist", "रणनीतिकार"], "rank.Master": ["Master", "Master", "मास्टर"], "rank.Legend": ["Legend", "Legend", "लीजेंड"],
  // tabs
  "tab.hq": ["HQ", "HQ", "होम"], "tab.notes": ["Notes", "Notes", "नोट्स"], "tab.ask": ["Ask", "Ask", "पूछो"], "tab.boss": ["Boss Battle", "Boss Battle", "बॉस बैटल"], "tab.plan": ["3D Plan", "3D Plan", "3D प्लान"],
  // status
  "busy": ["Gemma 4 kaam kar raha hai... {s}s", "Gemma 4 is working... {s}s", "Gemma 4 काम कर रहा है... {s}s"],
  "msg.reading_photo": ["Gemma tere notes ki photo padh raha hai...", "Gemma is reading your notes photo...", "Gemma आपके नोट्स की फोटो पढ़ रहा है..."],
  "msg.reading_pdf": ["PDF padh raha hoon...", "Reading the PDF...", "PDF पढ़ रहा हूँ..."],
  "msg.photo_ok": ["Photo se notes mil gaye. Ek baar check kar lena, handwriting mein galti ho sakti hai.", "Notes extracted from the photo. Please check them once, handwriting can cause mistakes.", "फोटो से नोट्स मिल गए। एक बार जाँच लेना, हैंडराइटिंग में गलती हो सकती है।"],
  "msg.notes_ok": ["Notes load ho gaye.", "Notes loaded.", "नोट्स लोड हो गए।"],
  "msg.generic_fail": ["Kuch gadbad ho gayi.", "Something went wrong.", "कुछ गड़बड़ हो गई।"],
  // HQ
  "hq.press": ["Press start", "Press start", "शुरू करो"], "hq.demo": ["60-second demo", "60-second demo", "60 सेकंड का डेमो"],
  "hq.demo_d": ["Sample notes load karo, ek sawal pucho, evidence dekho. Phir boss battle.", "Load the sample notes, ask a question, see the evidence. Then a boss battle.", "सैंपल नोट्स लोड करो, एक सवाल पूछो, सबूत देखो। फिर बॉस बैटल।"],
  "hq.start_sample": ["Start with sample notes", "Start with sample notes", "सैंपल नोट्स से शुरू करो"],
  "hq.quests": ["Daily quests", "Daily quests", "रोज़ के क्वेस्ट"], "hq.quests_s": ["Resets every day", "Resets every day", "हर दिन रीसेट होता है"],
  "quest.ask2": ["Ask 2 questions", "Ask 2 questions", "2 सवाल पूछो"], "quest.boss1": ["Win 1 boss battle", "Win 1 boss battle", "1 बॉस बैटल जीतो"], "quest.review1": ["Review 1 due concept", "Review 1 due concept", "1 बाकी कॉन्सेप्ट दोहराओ"],
  "hq.review": ["Daily review", "Daily review", "रोज़ की रिवीज़न"], "hq.review_s": ["Spaced repetition (SM-2)", "Spaced repetition (SM-2)", "स्पेस्ड रिपीटिशन (SM-2)"],
  "hq.due": ["{n} concept(s) ready: {list}", "{n} concept(s) ready: {list}", "{n} कॉन्सेप्ट तैयार: {list}"], "hq.start_review": ["Start review", "Start review", "रिवीज़न शुरू करो"],
  "hq.nodue": ["Kuch due nahi. Boss battle khel ke mastery badha.", "Nothing due. Play a boss battle to grow your mastery.", "कुछ बाकी नहीं है। बॉस बैटल खेलकर मास्टरी बढ़ाओ।"],
  "hq.noplan": ["3D plan banao, phir review yahan dikhega.", "Build the 3D plan, then your reviews show up here.", "3D प्लान बनाओ, फिर रिवीज़न यहाँ दिखेगी।"],
  "hq.gap": ["Gap report", "Gap report", "कमज़ोरी रिपोर्ट"], "hq.gap_s": ["Mastery and next move", "Mastery and next move", "मास्टरी और अगला कदम"],
  "hq.levels": ["Strong {a} | Learning {b} | Untouched {c}", "Strong {a} | Learning {b} | Untouched {c}", "मज़बूत {a} | सीख रहे {b} | बाकी {c}"],
  "hq.next": ["Next: {name}", "Next: {name}", "अगला: {name}"], "hq.build": ["Build my 3D plan", "Build my 3D plan", "मेरा 3D प्लान बनाओ"],
  "hq.ach": ["Achievements", "Achievements", "उपलब्धियाँ"], "hq.ach_s": ["{a}/{b} unlocked", "{a}/{b} unlocked", "{a}/{b} अनलॉक"],
  "badge.first_blood": ["First Blood", "First Blood", "पहली जीत"], "badge.truth_seeker": ["Truth Seeker", "Truth Seeker", "सच का खोजी"], "badge.voice_master": ["Voice Master", "Voice Master", "आवाज़ का उस्ताद"], "badge.photo_scholar": ["Photo Scholar", "Photo Scholar", "फोटो स्कॉलर"], "badge.cartographer": ["Cartographer", "Cartographer", "नक्शानवीस"],
  "badge.combo_3": ["Combo x3", "Combo x3", "कॉम्बो x3"], "badge.boss_slayer": ["Boss Slayer", "Boss Slayer", "बॉस किलर"], "badge.sharpshooter": ["Sharpshooter", "Sharpshooter", "निशानेबाज़"], "badge.master": ["Concept Master", "Concept Master", "कॉन्सेप्ट मास्टर"], "badge.streak_3": ["On Fire", "On Fire", "आग लगा दी"],
  "badged.first_blood": ["Get your first answer backed by evidence", "Get your first answer backed by evidence", "सबूत के साथ अपना पहला जवाब पाओ"], "badged.truth_seeker": ["Find something your notes do not cover", "Find something your notes do not cover", "कुछ ऐसा खोजो जो तुम्हारे नोट्स में नहीं है"], "badged.voice_master": ["Ask a question with your voice", "Ask a question with your voice", "आवाज़ से सवाल पूछो"], "badged.photo_scholar": ["Load notes from a photo", "Load notes from a photo", "फोटो से नोट्स लोड करो"], "badged.cartographer": ["Build your 3D study plan", "Build your 3D study plan", "अपना 3D स्टडी प्लान बनाओ"],
  "badged.combo_3": ["Three correct answers in a row", "Three correct answers in a row", "लगातार तीन सही जवाब"], "badged.boss_slayer": ["Win a boss battle", "Win a boss battle", "एक बॉस बैटल जीतो"], "badged.sharpshooter": ["10 correct quiz answers", "10 correct quiz answers", "क्विज़ के 10 सही जवाब"], "badged.master": ["Reach 100% mastery on a concept", "Reach 100% mastery on a concept", "किसी कॉन्सेप्ट पर 100% मास्टरी पाओ"], "badged.streak_3": ["Study 3 days in a row", "Study 3 days in a row", "लगातार 3 दिन पढ़ाई करो"],
  "toast.badge": ["Badge unlocked: {name}", "Badge unlocked: {name}", "बैज अनलॉक: {name}"], "toast.quest": ["Quest complete: {name}", "Quest complete: {name}", "क्वेस्ट पूरा: {name}"],
  // Notes tab
  "notes.title": ["Your notes", "Your notes", "आपके नोट्स"], "notes.sub": ["One topic, a few pages", "One topic, a few pages", "एक टॉपिक, कुछ पन्ने"],
  "notes.sample": ["Load sample notes", "Load sample notes", "सैंपल नोट्स लोड करो"], "notes.pdf": ["Upload PDF", "Upload PDF", "PDF अपलोड करो"], "notes.photo": ["Photo of notes", "Photo of notes", "नोट्स की फोटो"],
  "notes.ph": ["Paste notes on one topic (a few pages)...", "Paste notes on one topic (a few pages)...", "एक टॉपिक के नोट्स यहाँ पेस्ट करो (कुछ पन्ने)..."],
  "notes.count": ["{n}/12000 characters. Sample notes are synthetic. Notes stay on this device.", "{n}/12000 characters. Sample notes are synthetic. Notes stay on this device.", "{n}/12000 अक्षर। सैंपल नोट्स नकली (सिंथेटिक) हैं। नोट्स इसी डिवाइस पर रहते हैं।"],
  "notes.next": ["Next: Ask", "Next: Ask", "आगे: पूछो"],
  // Ask tab
  "ask.nomic": ["Mic ke liye Chrome ya Edge use kar.", "Use Chrome or Edge for the mic.", "माइक के लिए Chrome या Edge इस्तेमाल करो।"], "ask.speak": ["Bol kar bhi jawab de", "Read the answer aloud", "जवाब बोलकर भी सुनाओ"], "ask.listening": ["Sun raha hoon...", "Listening...", "सुन रहा हूँ..."],
  "ask.ph": ["e.g. Convoy effect kya hota hai?", "e.g. What is the convoy effect?", "जैसे: Convoy effect क्या होता है?"], "ask.btn": ["Ask", "Ask", "पूछो"], "ask.thinking": ["Thinking...", "Thinking...", "सोच रहा हूँ..."],
  "ask.q1": ["Convoy effect kya hota hai?", "What is the convoy effect?", "Convoy effect क्या होता है?"], "ask.q2": ["Round Robin mein time quantum kya hai?", "What is the time quantum in Round Robin?", "Round Robin में time quantum क्या है?"], "ask.q3": ["Banker's algorithm kya hai?", "What is the Banker's algorithm?", "Banker's algorithm क्या है?"],
  "ask.nonotes": ["Pehle Notes tab mein notes daal, ya HQ se sample notes le.", "First add notes in the Notes tab, or load the sample notes from HQ.", "पहले नोट्स टैब में नोट्स डालो, या होम से सैंपल नोट्स लो।"],
  "ask.supported": ["Supported by your notes", "Supported by your notes", "आपके नोट्स से पुष्टि हुई"], "ask.strength": ["Evidence strength", "Evidence strength", "सबूत की मज़बूती"],
  "strength.Strong": ["Strong", "Strong", "मज़बूत"], "strength.Good": ["Good", "Good", "अच्छा"], "strength.Weak": ["Weak", "Weak", "कमज़ोर"], "strength.None": ["None", "None", "कोई नहीं"],
  "ask.evidence": ["Evidence, checked against your notes", "Evidence, checked against your notes", "सबूत, आपके नोट्स से मिलाकर जाँचा गया"], "ask.passage": ["Passage {n}", "Passage {n}", "अंश {n}"], "ask.close": ["(close match)", "(close match)", "(मिलता-जुलता)"],
  "ask.unverified": ["Evidence not verified", "Evidence not verified", "सबूत की पुष्टि नहीं हुई"], "ask.unsupported": ["Not in your notes", "Not in your notes", "आपके नोट्स में नहीं है"],
  "ask.unverified_m": ["Bhai, Gemma ne jawab to diya, par uska evidence tere notes se match nahi hua. Isliye main ise sach maan kar nahi dikha raha.", "The model gave an answer, but its evidence does not match your notes, so I am not showing it as true.", "मॉडल ने जवाब तो दिया, पर उसका सबूत आपके नोट्स से मेल नहीं खाया, इसलिए मैं इसे सच मानकर नहीं दिखा रहा।"],
  "ask.unsupported_m": ["Bhai, tere notes mein iska jawab nahi mila. Notes mein ye topic add kar ya teacher se pooch le.", "Your notes do not contain the answer to this. Add this topic to your notes or ask your teacher.", "आपके नोट्स में इसका जवाब नहीं मिला। इस टॉपिक को नोट्स में जोड़ो या टीचर से पूछो।"],
  "ask.closest": ["Closest passage I found: \"{t}...\"", "Closest passage I found: \"{t}...\"", "सबसे करीबी अंश: \"{t}...\""], "ask.replay": ["Play again", "Play again", "फिर से सुनो"],
  // Boss tab
  "boss.title": ["Boss battle", "Boss battle", "बॉस बैटल"], "boss.sub_q": ["Quiz generated only from your notes", "Quiz generated only from your notes", "क्विज़ सिर्फ आपके नोट्स से बना है"], "boss.diff": ["Difficulty: {d}", "Difficulty: {d}", "कठिनाई: {d}"],
  "diff.easy": ["easy", "easy", "आसान"], "diff.medium": ["medium", "medium", "मध्यम"], "diff.hard": ["hard", "hard", "कठिन"],
  "boss.summon": ["Summoning boss...", "Summoning boss...", "बॉस बुला रहा हूँ..."], "boss.new": ["New battle", "New battle", "नई बैटल"], "boss.adaptive": ["Adaptive battle", "Adaptive battle", "अडैप्टिव बैटल"], "boss.start": ["Start battle", "Start battle", "बैटल शुरू करो"],
  "boss.golem": ["The {c} Golem", "The {c} Golem", "{c} गोलेम"], "boss.golem0": ["The Notes Golem", "The Notes Golem", "नोट्स गोलेम"], "boss.hp": ["Boss HP {a}/{b}", "Boss HP {a}/{b}", "बॉस HP {a}/{b}"], "boss.hearts": ["Your hearts", "Your hearts", "आपके दिल"], "boss.combo": ["Combo", "Combo", "कॉम्बो"],
  "boss.dropped": ["{n} generated question(s) were dropped because their evidence was not found in your notes.", "{n} generated question(s) were dropped because their evidence was not found in your notes.", "{n} सवाल हटा दिए गए क्योंकि उनका सबूत आपके नोट्स में नहीं मिला।"],
  "boss.hint": ["Hint", "Hint", "हिंट"], "boss.attack": ["Attack", "Attack", "हमला"], "boss.hintline": ["Hint: {t}", "Hint: {t}", "हिंट: {t}"],
  "boss.hit": ["Direct hit!", "Direct hit!", "सीधा निशाना!"], "boss.ouch": ["Ouch. Chill kar, seekh le.", "Ouch. Stay calm and learn from it.", "आह! चिंता मत करो, इससे सीखो।"], "boss.tip": ["Tip: {t}", "Tip: {t}", "टिप: {t}"], "boss.evid": ["Evidence from your notes: \"{t}\"", "Evidence from your notes: \"{t}\"", "आपके नोट्स से सबूत: \"{t}\""],
  "boss.win": ["BOSS DEFEATED", "BOSS DEFEATED", "बॉस हार गया"], "boss.score": ["Score {a}/{b} | hearts left {h}", "Score {a}/{b} | hearts left {h}", "स्कोर {a}/{b} | बचे दिल {h}"], "boss.next": ["Next battle", "Next battle", "अगली बैटल"],
  "boss.lose": ["DEFEATED", "DEFEATED", "हार गए"], "boss.lose_d": ["Hearts khatam. Notes dobara padh ke rematch le.", "Out of hearts. Read your notes again and take a rematch.", "दिल खत्म। नोट्स दोबारा पढ़कर रीमैच लो।"], "boss.rematch": ["Rematch", "Rematch", "रीमैच"],
  // Plan tab
  "plan.title": ["3D study plan", "3D study plan", "3D स्टडी प्लान"], "plan.sub": ["Concepts must have evidence in your notes", "Concepts must have evidence in your notes", "हर कॉन्सेप्ट का सबूत आपके नोट्स में होना ज़रूरी है"],
  "plan.days": ["{n} days", "{n} days", "{n} दिन"], "plan.mapping": ["Mapping...", "Mapping...", "बना रहा हूँ..."], "plan.rebuild": ["Rebuild plan", "Rebuild plan", "प्लान दोबारा बनाओ"],
  "plan.day": ["Day {n}", "Day {n}", "दिन {n}"], "plan.mastery": ["mastery {n}%", "mastery {n}%", "मास्टरी {n}%"], "plan.from": ["From your notes: \"{t}\"", "From your notes: \"{t}\"", "आपके नोट्स से: \"{t}\""],
  "plan.askabout": ["Ask about this", "Ask about this", "इसके बारे में पूछो"], "plan.battle": ["Battle this concept", "Battle this concept", "इस कॉन्सेप्ट पर बैटल"], "plan.q": ["{name} kya hai?", "What is {name}?", "{name} क्या है?"],
  "plan.empty": ["Notes se concepts nikalke ek 3D skill tree banega. Har concept ke liye notes mein evidence hona zaroori hai, warna wo drop ho jata hai.", "Concepts from your notes become a 3D skill tree. Every concept needs evidence in your notes, otherwise it is dropped.", "नोट्स से कॉन्सेप्ट निकालकर एक 3D स्किल ट्री बनेगा। हर कॉन्सेप्ट का सबूत नोट्स में होना ज़रूरी है, वरना वह हटा दिया जाता है।"],
  "plan.stale": ["Language badli. Plan ki summaries naye language mein ban rahi hain...", "Language changed. Refreshing the plan summaries...", "भाषा बदली। प्लान की समरी नई भाषा में बन रही है..."],
  // Coach
  "coach.title": ["Clutch Coach", "Clutch Coach", "क्लच कोच"], "coach.btn": ["COACH", "COACH", "कोच"], "coach.intro": ["Oye! Main tera study coach hoon. Plan, revision ya motivation, kuch bhi pooch. Subject ke facts ke liye Ask tab use kar.", "Hey! I am your study coach. Ask me about plans, revision or motivation. For subject facts, use the Ask tab.", "अरे! मैं तुम्हारा स्टडी कोच हूँ। प्लान, रिवीज़न या मोटिवेशन, कुछ भी पूछो। विषय के तथ्यों के लिए 'पूछो' टैब इस्तेमाल करो।"],
  "coach.ph": ["Kal exam hai, kya karun?", "Exam tomorrow, what should I do?", "कल परीक्षा है, क्या करूँ?"], "coach.go": ["Go", "Go", "भेजो"], "coach.mic": ["MIC", "MIC", "माइक"], "coach.thinking": ["Coach soch raha hai...", "Coach is thinking...", "कोच सोच रहा है..."], "coach.slow": ["Coach ko jawab dene me der lagi. Dobara try kar.", "The coach took too long to answer. Please try again.", "कोच को जवाब देने में देर लगी। दोबारा कोशिश करो।"], "coach.close": ["Close", "Close", "बंद करो"],
  // Tour
  "tour.label": ["Quick tour", "Quick tour", "छोटा टूर"], "tour.skip": ["Skip", "Skip", "छोड़ो"], "tour.next": ["Next", "Next", "आगे"], "tour.start": ["Start", "Start", "शुरू"],
  "tour.1t": ["Welcome, player", "Welcome, player", "स्वागत है, प्लेयर"], "tour.1d": ["Ye ek study game hai. Tere notes tera map hain, aur har sahi jawab tujhe XP deta hai.", "This is a study game. Your notes are your map, and every correct answer earns XP.", "यह एक स्टडी गेम है। आपके नोट्स आपका नक्शा हैं, और हर सही जवाब पर XP मिलता है।"],
  "tour.2t": ["1. Load notes", "1. Load notes", "1. नोट्स लोड करो"], "tour.2d": ["Notes paste kar, PDF daal, ya photo kheench. Pehli baar ke liye 'Load sample notes' dabana.", "Paste notes, add a PDF, or take a photo. First time? Press 'Load sample notes'.", "नोट्स पेस्ट करो, PDF डालो, या फोटो खींचो। पहली बार के लिए 'सैंपल नोट्स लोड करो' दबाओ।"],
  "tour.3t": ["2. Ask by voice", "2. Ask by voice", "2. आवाज़ से पूछो"], "tour.3d": ["Mic dabake bol. Jawab evidence ke saath aayega, aur jo notes mein nahi hai wo bhi bata dega.", "Press the mic and speak. You get an answer with evidence, and it tells you what is not in your notes.", "माइक दबाकर बोलो। जवाब सबूत के साथ आएगा, और जो नोट्स में नहीं है वह भी बताएगा।"],
  "tour.4t": ["3. Beat the boss", "3. Beat the boss", "3. बॉस को हराओ"], "tour.4d": ["Quiz ek boss battle hai: 3 hearts, combo bonus, aur galat jawab par dost samjhayega. 3D Plan mein mastery badhao.", "The quiz is a boss battle: 3 hearts, combo bonus, and a friend explains wrong answers. Grow mastery in the 3D Plan.", "क्विज़ एक बॉस बैटल है: 3 दिल, कॉम्बो बोनस, और गलत जवाब पर दोस्त समझाएगा। 3D प्लान में मास्टरी बढ़ाओ।"],
  // Home
  "home.tag": ["Hacktoberfest Hackday 2026 | PS 01 | Gemma 4", "Hacktoberfest Hackday 2026 | PS 01 | Gemma 4", "हैक्टोबरफेस्ट हैकडे 2026 | PS 01 | Gemma 4"],
  "home.h1a": ["Level up with ", "Level up with ", "अपने ही नोट्स से "], "home.h1b": ["your own notes.", "your own notes.", "लेवल अप करो।"],
  "home.sub": ["Ask by voice. Get answers with proof. Beat boss battles built from your notes. A study companion that admits what it does not know.", "Ask by voice. Get answers with proof. Beat boss battles built from your notes. A study companion that admits what it does not know.", "आवाज़ से पूछो। सबूत के साथ जवाब पाओ। अपने नोट्स से बने बॉस बैटल जीतो। एक स्टडी साथी जो मानता है कि उसे क्या नहीं पता।"],
  "home.guest": ["Play as guest", "Play as guest", "गेस्ट बनकर खेलो"], "home.register": ["Create account", "Create account", "अकाउंट बनाओ"], "home.login": ["Log in", "Log in", "लॉग इन"], "home.noacc": ["No account needed. Notes stay on your device.", "No account needed. Notes stay on your device.", "अकाउंट ज़रूरी नहीं। नोट्स आपके डिवाइस पर ही रहते हैं।"],
  "home.c1": ["Supported by your notes", "Supported by your notes", "आपके नोट्स से पुष्टि हुई"], "home.c1d": ["Convoy effect tab hota hai jab ek lamba process aage ho aur chhote wait karein.", "The convoy effect happens when a long process is in front and short ones have to wait.", "Convoy effect तब होता है जब एक लंबा प्रोसेस आगे हो और छोटे प्रोसेस इंतज़ार करें।"],
  "home.c2": ["Passage 2", "Passage 2", "अंश 2"], "home.c3": ["Not in your notes", "Not in your notes", "आपके नोट्स में नहीं है"], "home.c3d": ["Banker's algorithm? Bhai, ye tere notes mein nahi hai.", "Banker's algorithm? That is not in your notes.", "Banker's algorithm? यह आपके नोट्स में नहीं है।"],
  "home.abil": ["Your abilities", "Your abilities", "आपकी ताकतें"],
  "home.f1": ["Proof, not guesses", "Proof, not guesses", "अंदाज़े नहीं, सबूत"], "home.f1d": ["Every answer quotes your notes. A quote that is not really in your notes is rejected.", "Every answer quotes your notes. A quote that is not really in your notes is rejected.", "हर जवाब आपके नोट्स से कोट करता है। जो कोट नोट्स में असल में नहीं है, उसे रिजेक्ट कर दिया जाता है।"],
  "home.f2": ["Honest about gaps", "Honest about gaps", "कमी के बारे में ईमानदार"], "home.f2d": ["If your notes do not cover it, you hear it: Not in your notes.", "If your notes do not cover it, you hear it: Not in your notes.", "अगर आपके नोट्स में नहीं है, तो आपको साफ़ सुनाई देगा: आपके नोट्स में नहीं है।"],
  "home.f3": ["Talk to it", "Talk to it", "इससे बात करो"], "home.f3d": ["Speak your question. It answers in text and in a friendly voice, in Hinglish, English or Hindi.", "Speak your question. It answers in text and in a friendly voice, in Hinglish, English or Hindi.", "अपना सवाल बोलो। यह टेक्स्ट और दोस्ताना आवाज़ में जवाब देता है, हिंग्लिश, इंग्लिश या हिन्दी में।"],
  "home.f4": ["Boss battles", "Boss battles", "बॉस बैटल"], "home.f4d": ["Quizzes come only from your notes. 3 hearts, combos, and a friend who explains your mistakes.", "Quizzes come only from your notes. 3 hearts, combos, and a friend who explains your mistakes.", "क्विज़ सिर्फ आपके नोट्स से बनते हैं। 3 दिल, कॉम्बो, और एक दोस्त जो आपकी गलतियाँ समझाता है।"],
  "home.f5": ["3D skill tree", "3D skill tree", "3D स्किल ट्री"], "home.f5d": ["Notes become a map. Every win raises mastery and spaced repetition brings weak topics back.", "Notes become a map. Every win raises mastery and spaced repetition brings weak topics back.", "नोट्स एक नक्शा बन जाते हैं। हर जीत मास्टरी बढ़ाती है और स्पेस्ड रिपीटिशन कमज़ोर टॉपिक वापस लाता है।"],
  "home.f6": ["Photo or PDF", "Photo or PDF", "फोटो या PDF"], "home.f6d": ["Snap handwritten notes or upload a PDF. Gemma 4 reads them.", "Snap handwritten notes or upload a PDF. Gemma 4 reads them.", "हाथ से लिखे नोट्स की फोटो खींचो या PDF अपलोड करो। Gemma 4 उन्हें पढ़ता है।"],
};
// Server error messages (exact text) -> translations, so errors also follow the selected language.
const E: Record<string, T3> = {
  "Pehle apne notes paste ya upload kar.": ["Pehle apne notes paste ya upload kar.", "First paste or upload your notes.", "पहले अपने नोट्स पेस्ट या अपलोड करो।"],
  "Sawal thoda detail mein pooch.": ["Sawal thoda detail mein pooch.", "Please ask the question in a bit more detail.", "सवाल थोड़ा विस्तार से पूछो।"],
  "Kuch pooch to sahi.": ["Kuch pooch to sahi.", "Ask me something first.", "पहले कुछ पूछो तो सही।"],
  "Quiz expired. Naya quiz bana.": ["Quiz expired. Naya quiz bana.", "This quiz expired. Create a new one.", "यह क्विज़ पुराना हो गया। नया बनाओ।"],
  "Quiz verify nahi ho paya. Dobara try kar, ya notes thode detailed daal.": ["Quiz verify nahi ho paya. Dobara try kar, ya notes thode detailed daal.", "The quiz could not be verified. Try again or add more detailed notes.", "क्विज़ की पुष्टि नहीं हो पाई। दोबारा कोशिश करो या नोट्स थोड़े विस्तार से डालो।"],
  "Notes se concepts verify nahi ho paye. Thode detailed notes daal ya dobara try kar.": ["Notes se concepts verify nahi ho paye. Thode detailed notes daal ya dobara try kar.", "Concepts could not be verified from your notes. Add more detailed notes or try again.", "नोट्स से कॉन्सेप्ट की पुष्टि नहीं हो पाई। नोट्स थोड़े विस्तार से डालो या दोबारा कोशिश करो।"],
  "Photo se notes padh nahi paya. Roshni aur focus ke saath dobara try kar.": ["Photo se notes padh nahi paya. Roshni aur focus ke saath dobara try kar.", "Could not read notes from the photo. Try again with good light and focus.", "फोटो से नोट्स नहीं पढ़ पाया। अच्छी रोशनी और फोकस के साथ दोबारा कोशिश करो।"],
  "Upload a PNG, JPG or WebP photo under 4 MB.": ["Upload a PNG, JPG or WebP photo under 4 MB.", "Upload a PNG, JPG or WebP photo under 4 MB.", "4 MB से छोटी PNG, JPG या WebP फोटो अपलोड करो।"],
  "Upload a text PDF under 5 MB.": ["Upload a text PDF under 5 MB.", "Upload a text PDF under 5 MB.", "5 MB से छोटी टेक्स्ट वाली PDF अपलोड करो।"],
  "No readable text found. Scanned PDFs: use the photo upload instead.": ["No readable text found. Scanned PDFs: use the photo upload instead.", "No readable text found. For scanned PDFs, use the photo upload instead.", "पढ़ने लायक टेक्स्ट नहीं मिला। स्कैन की हुई PDF के लिए फोटो अपलोड इस्तेमाल करो।"],
  "Could not read this PDF.": ["Could not read this PDF.", "Could not read this PDF.", "यह PDF पढ़ी नहीं जा सकी।"],
  "API key set nahi hai. .env file dekh.": ["API key set nahi hai. .env file dekh.", "The API key is not set. Check the .env file.", "API key सेट नहीं है। .env फाइल देखो।"],
  "API rate limit lag gayi (free tier). 1 minute ruk ke try kar.": ["API rate limit lag gayi (free tier). 1 minute ruk ke try kar.", "API rate limit reached (free tier). Wait a minute and try again.", "API की लिमिट पूरी हो गई (फ्री टियर)। 1 मिनट रुककर कोशिश करो।"],
  "API key galat ya band hai. .env me key check kar.": ["API key galat ya band hai. .env me key check kar.", "The API key is wrong or disabled. Check the key in .env.", "API key गलत या बंद है। .env में key जाँचो।"],
  "Model name galat hai. .env me model id check kar.": ["Model name galat hai. .env me model id check kar.", "The model name is wrong. Check the model id in .env.", "मॉडल का नाम गलत है। .env में model id जाँचो।"],
  "Model abhi busy hai. 5 second baad dobara try kar.": ["Model abhi busy hai. 5 second baad dobara try kar.", "The model is busy right now. Try again in 5 seconds.", "मॉडल अभी व्यस्त है। 5 सेकंड बाद दोबारा कोशिश करो।"],
  "Model ne sahi JSON nahi diya. Dobara try kar.": ["Model ne sahi JSON nahi diya. Dobara try kar.", "The model returned an invalid answer. Try again.", "मॉडल ने सही जवाब नहीं दिया। दोबारा कोशिश करो।"],
  "Model ko jawab dene me bahut der lagi. Dobara try kar.": ["Model ko jawab dene me bahut der lagi. Dobara try kar.", "The model took too long to answer. Try again.", "मॉडल को जवाब देने में बहुत देर लगी। दोबारा कोशिश करो।"],
  "Model se connect nahi ho paya. Internet, .env aur model name check kar.": ["Model se connect nahi ho paya. Internet, .env aur model name check kar.", "Could not connect to the model. Check your internet, .env and model name.", "मॉडल से कनेक्ट नहीं हो पाया। इंटरनेट, .env और मॉडल का नाम जाँचो।"],
  "Thoda ruk bhai, bahut requests ho gayi. Kuch minute baad try kar.": ["Thoda ruk bhai, bahut requests ho gayi. Kuch minute baad try kar.", "Too many requests. Please try again in a few minutes.", "बहुत ज़्यादा रिक्वेस्ट हो गईं। कुछ मिनट बाद कोशिश करो।"],
  "Network error. Dobara try kar.": ["Network error. Dobara try kar.", "Network error. Please try again.", "नेटवर्क एरर। दोबारा कोशिश करो।"],
  "Server error": ["Server error", "Server error", "सर्वर एरर"],
};
const idx = (l: Lang) => (l === "english" ? 1 : l === "hindi" ? 2 : 0);
export function tr(lang: Lang, key: string, vars: Record<string, string | number> = {}): string {
  const row = D[key]; let s = row ? row[idx(lang)] : key;
  for (const k in vars) s = s.split("{" + k + "}").join(String(vars[k]));
  return s;
}
export function trErr(lang: Lang, msg: string): string { const row = E[msg]; return row ? row[idx(lang)] : msg; }
Object.assign(D, {
  "lvl.up": ["Level up", "Level up", "लेवल अप"], "lvl.click": ["Click anywhere to continue", "Click anywhere to continue", "आगे बढ़ने के लिए कहीं भी क्लिक करो"],
  "hud.profile": ["Your profile", "Your profile", "आपकी प्रोफ़ाइल"], "hud.mute_a": ["Mute sounds", "Mute sounds", "आवाज़ बंद करो"], "hud.unmute_a": ["Unmute sounds", "Unmute sounds", "आवाज़ चालू करो"], "skip": ["Skip to content", "Skip to content", "सीधे कंटेंट पर जाओ"],
});
