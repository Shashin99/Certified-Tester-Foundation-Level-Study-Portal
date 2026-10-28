const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const qBankJsonPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
const qBank = JSON.parse(fs.readFileSync(qBankJsonPath, 'utf8'));

// Official Chapter titles in EN and Sinhala
const CHAPTER_INFO = {
  1: { en: 'Fundamentals of Testing', si: 'පරීක්ෂාවේ මූලධර්ම', questionsCount: 8, weight: '20%' },
  2: { en: 'Testing Throughout the SDLC', si: 'මෘදුකාංග සංවර්ධන ජීවන චක්‍රය පුරා පරීක්ෂාව', questionsCount: 6, weight: '15%' },
  3: { en: 'Static Testing', si: 'ස්ථිතික පරීක්ෂාව', questionsCount: 4, weight: '10%' },
  4: { en: 'Test Analysis and Design', si: 'පරීක්ෂණ විශ්ලේෂණය සහ සැලසුම්කරණය', questionsCount: 11, weight: '27.5%' },
  5: { en: 'Managing the Test Activities', si: 'පරීක්ෂණ ක්‍රියාකාරකම් කළමනාකරණය', questionsCount: 9, weight: '22.5%' },
  6: { en: 'Test Tools', si: 'පරීක්ෂණ මෙවලම්', questionsCount: 2, weight: '5%' }
};

// Helper: decode HTML entities for clean plain text presentation
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&rarr;/g, '->')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '--')
    .replace(/&bull;/g, '*')
    .replace(/&minus;/g, '-')
    .replace(/&plusmn;/g, '+/-')
    .replace(/&le;/g, '<=')
    .replace(/&ge;/g, '>=')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================================================
// 1. GENERATE question_bank.txt
// ============================================================================
let qTxt = '';
qTxt += '================================================================================\n';
qTxt += 'ISTQB(R) CERTIFIED TESTER FOUNDATION LEVEL (CTFL) v4.0.1\n';
qTxt += 'MASTER PRACTICE QUESTION BANK (71 VERIFIED QUESTIONS & OFFICIAL RATIONALES)\n';
qTxt += '================================================================================\n';
qTxt += 'Exam Format: 40 Multiple-Choice Questions (1 Point Each)\n';
qTxt += 'Time Limit: 60 Minutes (75 Minutes for non-native language extensions)\n';
qTxt += 'Passing Standard: 65% (Minimum 26 / 40 correct answers required to pass)\n';
qTxt += 'Negative Marking: NONE (Always select an answer for every question)\n';
qTxt += 'Syllabus Standard: ISTQB CTFL v4.0.1 (All 64 Learning Objectives Covered)\n';
qTxt += '================================================================================\n\n';

let currCh = 0;
qBank.forEach((q, idx) => {
  if (q.chapter !== currCh) {
    currCh = q.chapter;
    const info = CHAPTER_INFO[currCh] || { en: 'Chapter ' + currCh, si: '' };
    qTxt += '\n' + '#'.repeat(80) + '\n';
    qTxt += `CHAPTER 0${currCh}: ${info.en.toUpperCase()}${info.si ? ' (' + info.si + ')' : ''}\n`;
    qTxt += `Exam Allocation: ~${info.questionsCount} Questions (${info.weight} of exam)\n`;
    qTxt += '#'.repeat(80) + '\n\n';
  }

  qTxt += `--------------------------------------------------------------------------------\n`;
  qTxt += `QUESTION ${idx + 1} of ${qBank.length} [LO: ${q.lo} | Cognitive Level: ${q.kLevel}]\n`;
  qTxt += `--------------------------------------------------------------------------------\n`;
  qTxt += `STEM (EN): ${cleanText(q.questionEn)}\n`;
  if (q.questionSi && cleanText(q.questionSi) !== cleanText(q.questionEn)) {
    qTxt += `STEM (SI): ${cleanText(q.questionSi)}\n`;
  }
  qTxt += `\nOPTIONS:\n`;
  q.optionsEn.forEach(opt => {
    qTxt += `  ${cleanText(opt)}\n`;
  });
  qTxt += `\n>> CORRECT ANSWER: [${q.answer}]\n\n`;
  qTxt += `>> OFFICIAL RATIONALE:\n`;
  qTxt += `${cleanText(q.rationaleEn)}\n\n`;
});

qTxt += '================================================================================\n';
qTxt += 'END OF QUESTION BANK • 71 QUESTIONS COMPLETED\n';
qTxt += '================================================================================\n';

const qBankDest1 = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.txt');
const qBankDest2 = path.join(rootDir, 'question_bank.txt');
fs.writeFileSync(qBankDest1, qTxt, 'utf8');
fs.writeFileSync(qBankDest2, qTxt, 'utf8');
console.log('✓ Written:', qBankDest1);
console.log('✓ Written:', qBankDest2);

// ============================================================================
// 2. EXTRACT ALL 64 OFFICIAL LEARNING OBJECTIVES FOR study_map.txt
// ============================================================================
const auditSylPath = path.join(__dirname, '_audit', 'syllabus.txt');
let loList = [];
if (fs.existsSync(auditSylPath)) {
  const sylContent = fs.readFileSync(auditSylPath, 'utf8');
  const matches = [...sylContent.matchAll(/(FL-\d\.\d\.\d)\s*\((K\d)\)\s*([^\n\r]+)/g)];
  loList = matches.map(m => ({
    id: m[1],
    k: m[2],
    title: m[3].trim()
  }));
}

// Group LOs by Chapter
const loByChapter = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
loList.forEach(lo => {
  const ch = parseInt(lo.id[3], 10);
  if (loByChapter[ch]) loByChapter[ch].push(lo);
});

// ============================================================================
// 3. GENERATE study_map.txt
// ============================================================================
let sTxt = '';
sTxt += '================================================================================\n';
sTxt += 'ISTQB(R) CERTIFIED TESTER FOUNDATION LEVEL (CTFL) v4.0.1\n';
sTxt += 'MASTER LIBRARY INDEX, STUDY ROADMAP & EXAM BLUEPRINT\n';
sTxt += '================================================================================\n';
sTxt += 'Official Syllabus Version: v4.0.1 (Current International Standard)\n';
sTxt += 'Accreditation Board: International Software Testing Qualifications Board\n';
sTxt += 'Exam Format: 40 Multiple-Choice Questions | 60 Minutes | Passing Score: 65% (26/40)\n';
sTxt += '================================================================================\n\n';

sTxt += '1. OFFICIAL EXAM BLUEPRINT & COGNITIVE K-LEVEL MATRIX\n';
sTxt += '--------------------------------------------------------------------------------\n';
sTxt += 'Total Questions : 40 Multiple-Choice Questions\n';
sTxt += 'Total Duration  : 60 Minutes (Avg 90 seconds per question)\n';
sTxt += 'Pass Standard   : 65% (Minimum 26 correct answers out of 40)\n';
sTxt += 'Scoring System  : 1 Point per question. NO negative marking.\n\n';
sTxt += 'Cognitive Difficulty Distribution (K-Levels):\n';
sTxt += '  * K1 (Remember   - ~8 questions / 20%): Direct recall of definitions, rules, and facts.\n';
sTxt += '  * K2 (Understand - ~24 questions / 60%): Explaining, comparing, contrasting concepts.\n';
sTxt += '  * K3 (Apply      - ~8 questions / 20%): Applying concrete techniques (EP, BVA, DT, ST, CC).\n\n';

sTxt += 'Official Chapter Weighting & Question Allocation:\n';
sTxt += '  +-----------+-----------------------------------+-----------+--------+----------------+\n';
sTxt += '  | Chapter   | Title                             | Questions | Weight | K-Levels       |\n';
sTxt += '  +-----------+-----------------------------------+-----------+--------+----------------+\n';
sTxt += '  | Chapter 1 | Fundamentals of Testing           | ~8 Qs     | 20.0%  | K1, K2         |\n';
sTxt += '  | Chapter 2 | Testing Throughout the SDLC       | ~6 Qs     | 15.0%  | K1, K2         |\n';
sTxt += '  | Chapter 3 | Static Testing                    | ~4 Qs     | 10.0%  | K1, K2         |\n';
sTxt += '  | Chapter 4 | Test Analysis and Design          | ~11 Qs    | 27.5%  | K1, K2, K3 (!) |\n';
sTxt += '  | Chapter 5 | Managing the Test Activities      | ~9 Qs     | 22.5%  | K1, K2, K3 (!) |\n';
sTxt += '  | Chapter 6 | Test Tools                        | ~2 Qs     |  5.0%  | K1, K2         |\n';
sTxt += '  +-----------+-----------------------------------+-----------+--------+----------------+\n';
sTxt += '  | TOTAL     | 6 Chapters                        | 40 Qs     | 100.0% | 64 LOs         |\n';
sTxt += '  +-----------+-----------------------------------+-----------+--------+----------------+\n';
sTxt += '  CRITICAL NOTE: Chapters 4 and 5 constitute exactly 50% (20 / 40) of the entire exam!\n\n';

sTxt += '2. COMPLETE 64 LEARNING OBJECTIVES MASTER CHECKLIST\n';
sTxt += '--------------------------------------------------------------------------------\n';
for (let c = 1; c <= 6; c++) {
  const cInfo = CHAPTER_INFO[c];
  sTxt += `\n[CHAPTER 0${c}: ${cInfo.en.toUpperCase()}] (~${cInfo.questionsCount} Exam Questions)\n`;
  (loByChapter[c] || []).forEach(lo => {
    sTxt += `  [ ] ${lo.id} (${lo.k}): ${lo.title}\n`;
  });
}

sTxt += '\n\n3. RECOMMENDED 4-STAGE STUDY ROADMAP\n';
sTxt += '--------------------------------------------------------------------------------\n';
sTxt += 'STAGE 1: FOUNDATIONS & LIFECYCLES (Days 1 - 3)\n';
sTxt += '  * Focus: Chapters 1 and 2 (~14 Questions)\n';
sTxt += '  * Key Topics to Master:\n';
sTxt += '    - The 7 Testing Principles (Principles 1 through 7, especially Fallacy & Wear Out).\n';
sTxt += '    - Error (human mistake) -> Defect (bug in code/doc) -> Failure (incorrect behavior).\n';
sTxt += '    - Testing vs. Debugging difference.\n';
sTxt += '    - V-Model vs Agile iterative lifecycles, Shift-Left mindset, and Test-First (TDD/ATDD/BDD).\n';
sTxt += '    - 4 Test Levels (Component, Integration, System, Acceptance) & 4 Test Types.\n';
sTxt += '  * Milestone: Score >= 80% on Chapter 1 and Chapter 2 end-of-chapter quizzes.\n\n';

sTxt += 'STAGE 2: STATIC TESTING & APPLIED TEST TECHNIQUES (Days 4 - 7) [HIGHEST PRIORITY]\n';
sTxt += '  * Focus: Chapters 3 and 4 (~15 Questions)\n';
sTxt += '  * Key Topics to Master:\n';
sTxt += '    - Static vs Dynamic testing value & defects found earlier by static testing.\n';
sTxt += '    - Review process (Planning, Initiate, Individual review, Issue communication, Fixing).\n';
sTxt += '    - Review roles: Author, Management, Facilitator (Moderator), Review Leader, Reviewer, Scribe.\n';
sTxt += '    - Review types: Informal review, Walkthrough, Technical review, Inspection.\n';
sTxt += '    - Black-Box K3 Techniques:\n';
sTxt += '      * Equivalence Partitioning (Valid vs Invalid partitions, min test cases for 100% coverage).\n';
sTxt += '      * Boundary Value Analysis (2-point: boundary & invalid neighbor; 3-point: boundary & both neighbors).\n';
sTxt += '      * Decision Table Testing (Conditions, Actions, Rules calculation).\n';
sTxt += '      * State Transition Testing (States, transitions, invalid transitions, state tables).\n';
sTxt += '    - White-Box K3 Techniques: Statement coverage vs Branch coverage (Branch coverage subsumes Statement).\n';
sTxt += '    - Experience-based: Error Guessing, Exploratory Testing, Checklist-based testing.\n';
sTxt += '  * Milestone: Work through all practical calculation exercises in Chapter 4 study guide.\n\n';

sTxt += 'STAGE 3: TEST MANAGEMENT, RISK & TOOLS (Days 8 - 10)\n';
sTxt += '  * Focus: Chapters 5 and 6 (~11 Questions)\n';
sTxt += '  * Key Topics to Master:\n';
sTxt += '    - Test Planning, Test Strategy, and Test Approach.\n';
sTxt += '    - Estimation techniques: Metrics-based vs Expert-based (Wideband Delphi, Planning Poker).\n';
sTxt += '    - Test Case Prioritization (Risk-based, dependency-based, value-based).\n';
sTxt += '    - Test Pyramid (Unit -> Service -> UI) & Agile Testing Quadrants (Q1-Q4).\n';
sTxt += '    - Product Risk vs Project Risk analysis (Likelihood x Impact).\n';
sTxt += '    - Entry Criteria vs Exit Criteria (Definition of Ready vs Definition of Done).\n';
sTxt += '    - Defect reports: mandatory fields, objective language, reproduce steps.\n';
sTxt += '    - Test Tools classification, Spreadsheet principle, 6 automation benefits & 6 automation risks.\n';
sTxt += '  * Milestone: Score >= 85% on Chapter 5 and Chapter 6 quizzes.\n\n';

sTxt += 'STAGE 4: QUESTION BANK MASTERY & TIMED SIMULATOR PRACTICE (Days 11 - 14)\n';
sTxt += '  * Master all 71 questions in question_bank.txt.\n';
sTxt += '  * Complete at least three 60-minute timed runs on istqb_mock_exam_simulator.html.\n';
sTxt += '  * Target score: >= 32 / 40 (80%+) consistently before booking official exam.\n\n';

sTxt += '4. MASTER STUDY LIBRARY & RESOURCE CATALOG\n';
sTxt += '--------------------------------------------------------------------------------\n';
sTxt += 'Root Directory & Interactive Hub:\n';
sTxt += '  - index.html                                 : Interactive master portal with progress tracking\n';
sTxt += '  - study_map.html                             : Interactive web dashboard of study map & roadmap\n';
sTxt += '  - study_map.txt                              : Master blueprint, LO checklist & catalog (.txt)\n';
sTxt += '  - question_bank.txt                          : Master 71+ question bank (.txt)\n\n';

sTxt += '01_Official_Syllabus/\n';
sTxt += '  - ISTQB_CTFL_Syllabus_v4.0.1.pdf             : Authoritative 78-page official standard\n\n';

sTxt += '02_English_Study_Guides_HTML/                  (6 Interactive Web Guides)\n';
sTxt += '  - istqb_ch1_study_guide.html                 : Chapter 01 Fundamentals of Testing\n';
sTxt += '  - istqb_ch2_study_guide.html                 : Chapter 02 Testing Throughout the SDLC\n';
sTxt += '  - istqb_ch3_study_guide.html                 : Chapter 03 Static Testing\n';
sTxt += '  - istqb_ch4_study_guide.html                 : Chapter 04 Test Analysis and Design\n';
sTxt += '  - istqb_ch5_study_guide.html                 : Chapter 05 Managing the Test Activities\n';
sTxt += '  - istqb_ch6_study_guide.html                 : Chapter 06 Test Tools\n\n';

sTxt += '03_Sinhala_Study_Guides_HTML/        (6 Sinhala Web Guides)\n';
sTxt += '  - istqb_ch1_study_guide_sinhala.html         : Chapter 01 පරීක්ෂාවේ මූලධර්ම\n';
sTxt += '  - istqb_ch2_study_guide_sinhala.html         : Chapter 02 SDLC තුළ පරීක්ෂාව\n';
sTxt += '  - istqb_ch3_study_guide_sinhala.html         : Chapter 03 ස්ථිතික පරීක්ෂාව\n';
sTxt += '  - istqb_ch4_study_guide_sinhala.html         : Chapter 04 විශ්ලේෂණය සහ සැලසුම්කරණය\n';
sTxt += '  - istqb_ch5_study_guide_sinhala.html         : Chapter 05 පරීක්ෂණ කළමනාකරණය\n';
sTxt += '  - istqb_ch6_study_guide_sinhala.html         : Chapter 06 පරීක්ෂණ මෙවලම්\n\n';

sTxt += '04_Printable_PDF_Study_Guides/                 (12 Ink-Friendly A4 Print Guides)\n';
sTxt += '  - 6 English Printable PDFs (Chapters 01 - 06)\n';
sTxt += '  - 6 Sinhala Printable PDFs (Chapters 01 - 06)\n\n';

sTxt += '05_Practice_Questions_and_Summaries/\n';
sTxt += '  - istqb_mock_exam_simulator.html             : Full 40Q timed 60-min interactive exam simulator\n';
sTxt += '  - question_bank.html                         : Searchable interactive 71Q repository with Sinhala stems\n';
sTxt += '  - question_bank.txt                          : 71+ questions in clean plain text (.txt)\n';
sTxt += '  - question_bank.json                         : Structured JSON repository with LO & K tags\n\n';

sTxt += '5. EXAM-DAY STRATEGY & TEST-TAKING TIPS\n';
sTxt += '--------------------------------------------------------------------------------\n';
sTxt += '1. Pace Yourself: 60 minutes for 40 questions = 90 seconds per question.\n';
sTxt += '2. First Pass Strategy: Answer all straightforward K1 and K2 recall questions first.\n';
sTxt += '   Flag complex K3 calculation questions (BVA, Decision Tables) for the second pass.\n';
sTxt += '3. Watch the Exact Wording:\n';
sTxt += '   - Pay extreme attention to negative keywords: NOT, EXCEPT, DISADVANTAGE, LEAST likely.\n';
sTxt += '   - "Which TWO..." means select exactly two options.\n';
sTxt += '4. Eliminate Distractors:\n';
sTxt += '   - Eliminate absolute words ("always", "never", "guarantees zero defects").\n';
sTxt += '   - Eliminate choices confusing testing with debugging (debugging removes defects; testing finds failures).\n';
sTxt += '5. Never Leave Any Question Blank: No negative marking exists. Even a guess gives a 25% chance.\n';
sTxt += '================================================================================\n';
sTxt += 'Generated for ISTQB CTFL v4.0.1 Master Study Library\n';
sTxt += '================================================================================\n';

const sMapDest1 = path.join(rootDir, 'study_map.txt');
const sMapDest2 = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'study_map.txt');
fs.writeFileSync(sMapDest1, sTxt, 'utf8');
fs.writeFileSync(sMapDest2, sTxt, 'utf8');
console.log('✓ Written:', sMapDest1);
console.log('✓ Written:', sMapDest2);

console.log('\nAll text files built successfully!');
