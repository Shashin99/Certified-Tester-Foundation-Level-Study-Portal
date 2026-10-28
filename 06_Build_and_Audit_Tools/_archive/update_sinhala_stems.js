const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const qBankJsonPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
const qb = JSON.parse(fs.readFileSync(qBankJsonPath, 'utf8'));

// The 32 accurate Sinhala translations mapped by ID
const SINHALA_STEMS = {
  // Chapter 1
  'Q-CH1-1': 'Which of the following is an official, recognized test objective according to the ISTQB syllabus? (ISTQB විෂය නිර්දේශයට අනුව පහත සඳහන් දෑ අතුරින් නිල වශයෙන් පිළිගත් පරීක්ෂණ අරමුණක් (test objective) වන්නේ කුමක්ද?)',
  'Q-CH1-2': 'How does dynamic testing fundamentally differ from debugging? (ගතික පරීක්ෂාව (Dynamic testing) සහ දෝෂ නිරාකරණය (Debugging) අතර ඇති මූලික වෙනස කුමක්ද?)',
  'Q-CH1-3': 'A programmer tired from excessive overtime mistypes a logical operator in an algorithm. As a result, when an eligible customer purchases goods, the system unexpectedly crashes at checkout. What are the ERROR, DEFECT, and FAILURE in this scenario? (අධික වෙහෙස නිසා ක්‍රමලේඛකයෙකු ඇල්ගොරිතමයක තාර්කික මෙහෙයුම්කාරකයක් (logical operator) වැරදියට ටයිප් කරයි. මෙහි ප්‍රතිඵලයක් ලෙස පාරිභෝගිකයෙකු භාණ්ඩ මිලදී ගැනීමේදී පද්ධතිය අනපේක්ෂිත ලෙස බිඳවැටේ. මෙම අවස්ථාවේ ERROR (මිනිස් අතපසුවීම), DEFECT (කේතයේ දෝෂය), සහ FAILURE (පද්ධතියේ බිඳවැටීම) නිවැරදිව හඳුනාගන්න.)',
  'Q-CH1-4': 'A project manager claims: "Since our automated regression test suite executed all 500 test cases with a 100% pass rate, our application is guaranteed to satisfy all customer expectations and need not be tested further." Which TWO testing principles refute this claim? (ව්‍යාපාරික කළමනාකරු පවසන්නේ 500ක් වූ automated regression tests 100% සමත් වූ නිසා පාරිභෝගික අපේක්ෂා සියල්ල ඉටුවන බවත් තවදුරටත් පරීක්ෂා කිරීම අවශ්‍ය නොවන බවත්ය. මෙම ප්‍රකාශය ප්‍රතික්ෂේප කරන පරීක්ෂණ මූලධර්ම (Testing Principles) දෙක කුමක්ද?)',
  'Q-CH1-5': 'In which test activity is the question "WHAT to test" answered in terms of measurable coverage criteria? (මැනිය හැකි ආවරණ නිර්ණායක (measurable coverage criteria) අනුව "කුමක් පරීක්ෂා කළ යුතුද?" (WHAT to test) යන ප්‍රශ්නයට පිළිතුරු සපයන පරීක්ෂණ ක්‍රියාකාරකම කුමක්ද?)',
  'Q-CH1-6': 'Which work product is correctly paired with the test activity that produces it? (පහත සඳහන් කාර්ය ඵලයන් (work products) අතුරින් එය නිපදවන පරීක්ෂණ ක්‍රියාකාරකම සමඟ නිවැරදිව යුගලනය කර ඇත්තේ කුමක්ද?)',
  'Q-CH1-7': 'What is a primary benefit of maintaining bidirectional traceability between test cases and requirements? (Test cases සහ අවශ්‍යතා (Requirements) අතර ද්වි-දිශානුගත අනුහුරුතාව (Bidirectional Traceability) පවත්වා ගැනීමේ ප්‍රධාන වාසිය කුමක්ද?)',
  'Q-CH1-8': 'What is a recognized DISADVANTAGE or risk of having an independent test team? (ස්වාධීන පරීක්ෂණ කණ්ඩායමක් (Independent Test Team) සිටීමේ පිළිගත් අවාසියක් හෝ අවදානමක් වන්නේ කුමක්ද?)',

  // Chapter 2
  'Q-CH2-1': 'How does testing in an Agile development model typically differ from testing in a sequential V-model? (Agile සංවර්ධන ආකෘතියක පරීක්ෂාව සහ අනුක්‍රමික V-ආකෘතියක (Sequential V-Model) පරීක්ෂාව අතර ඇති ප්‍රධාන වෙනස කුමක්ද?)',
  'Q-CH2-2': 'Which of the following is a recognized GOOD TESTING PRACTICE that applies to ALL software development lifecycles? (සියලුම මෘදුකාංග සංවර්ධන ජීවන චක්‍රයන්ට (SDLCs) අදාළ වන පිළිගත් යහපත් පරීක්ෂණ පිළිවෙතක් (Good Testing Practice) වන්නේ කුමක්ද?)',
  'Q-CH2-3': 'In which test-first approach are test cases written in a simple natural language using the Given/When/Then format? (Given/When/Then ආකෘතිය භාවිතයෙන් සරල ස්වභාවික භාෂාවෙන් Test cases ලියනු ලබන test-first ප්‍රවේශය කුමක්ද?)',
  'Q-CH2-4': 'Which of the following actions is an example of applying the "SHIFT LEFT" approach in testing? (පරීක්ෂාවේදී "SHIFT LEFT" ප්‍රවේශය භාවිත කිරීමට උදාහරණයක් වන්නේ පහත කුමන ක්‍රියාවද?)',
  'Q-CH2-5': 'Which test level focuses specifically on testing the interactions between the system under test and other external systems and cloud services? (පරීක්ෂාවට ලක්වන පද්ධතිය සහ බාහිර පද්ධති හෝ cloud සේවාවන් අතර අන්තර්ක්‍රියා පරීක්ෂා කිරීම කෙරෙහි විශේෂයෙන් අවධානය යොමු කරන පරීක්ෂණ මට්ටම (Test Level) කුමක්ද?)',
  'Q-CH2-6': 'Which of the following statements about test types is TRUE? (පරීක්ෂණ වර්ග (Test Types) පිළිබඳ පහත සඳහන් ප්‍රකාශ අතුරින් සත්‍ය වන්නේ කුමක්ද?)',
  'Q-CH2-7': 'A tester executes a test case that previously failed to confirm that a bug fix resolved the issue. Simultaneously, an automated test suite executes across the entire application to ensure unchanged modules were not corrupted. What types of testing are being performed? (දෝෂ නිවැරදි කිරීමක් තහවුරු කිරීමට ටෙස්ටර් කෙනෙක් කලින් අසමත් වූ test case එකක් නැවත ක්‍රියාත්මක කරයි. ඒ සමඟම වෙනස් නොකළ කොටස්වලට හානියක් වී නැති බව තහවුරු කිරීමට automated test suite එකක් ක්‍රියාත්මක කරයි. මෙහිදී සිදුකරන පරීක්ෂණ වර්ග මොනවාද?)',
  'Q-CH2-8': 'An enterprise migrates its customer database from an on-premise Oracle server to an AWS cloud-hosted PostgreSQL database. Which type of testing is triggered, and what is its primary focus? (ආයතනයක් තම පාරිභෝගික දත්ත ගබඩාව On-premise Oracle සේවාදායකයක සිට AWS Cloud PostgreSQL දත්ත ගබඩාවකට සංක්‍රමණය (migrate) කරයි. මෙහිදී ආරම්භ වන පරීක්ෂණ වර්ගය සහ එහි ප්‍රධාන අවධානය කුමක්ද?)',

  // Chapter 3
  'Q-CH3-1': 'Which of the following work products is LEAST APPROPRIATE for examination using static testing? (ස්ථිතික පරීක්ෂාව (Static Testing) මගින් පරීක්ෂා කිරීමට අවම වශයෙන් සුදුසු කාර්ය ඵලය (Work Product) කුමක්ද?)',
  'Q-CH3-2': 'Which of the following defects is TYPICALLY detected by static testing but CANNOT be detected by dynamic testing? (සාමාන්‍යයෙන් ස්ථිතික පරීක්ෂාවෙන් හඳුනාගත හැකි නමුත් ගතික පරීක්ෂාවෙන් (Dynamic Testing) හඳුනාගත නොහැකි දෝෂය කුමක්ද?)',
  'Q-CH3-3': 'How does static testing fundamentally differ from dynamic testing regarding defect detection? (දෝෂ හඳුනාගැනීම සම්බන්ධයෙන් ස්ථිතික පරීක්ෂාව සහ ගතික පරීක්ෂාව අතර ඇති මූලික වෙනස කුමක්ද?)',
  'Q-CH3-4': 'What is a primary benefit of gathering early and frequent stakeholder feedback during the SDLC? (SDLC තුළ මුල් අවධියේදීම සහ නිරන්තරයෙන් Stakeholder ප්‍රතිපෝෂණ (Feedback) ලබාගැනීමේ ප්‍රධාන වාසිය කුමක්ද?)',
  'Q-CH3-5': 'During which activity of the review process (ISO/IEC 20246) are anomalies discussed, their status decided, and ownership assigned? (ISO/IEC 20246 සමාලෝචන ක්‍රියාවලියේදී විෂමතා (Anomalies) සාකච්ඡා කර, ඒවායේ තත්ත්වය තීරණය කර, විසඳීමේ වගකීම පවරනු ලබන්නේ කුමන ක්‍රියාකාරකමේදීද?)',
  'Q-CH3-6': 'In an inspection, which two roles MUST NOT be performed by the author of the work product? (විධිමත් පරීක්ෂාවකදී (Inspection) කාර්ය ඵලයේ කතුවරයා (Author) විසින් සිදු නොකළ යුතු භූමිකා (Roles) දෙක කුමක්ද?)',
  'Q-CH3-7': 'Which review type is led by the AUTHOR of the work product and has multiple objectives including educating reviewers, building consensus, and gathering new ideas? (කතුවරයා විසින් මෙහෙයවනු ලබන, සමාලෝචකයින් දැනුවත් කිරීම, එකඟතාව ගොඩනැගීම සහ නව අදහස් ලබාගැනීම අරමුණු කරගත් සමාලෝචන වර්ගය (Review Type) කුමක්ද?)',
  'Q-CH3-8': 'Which of the following is an ANTI-PATTERN that directly undermines the success of a review program? (සමාලෝචන වැඩසටහනක සාර්ථකත්වයට සෘජුවම බාධා පමුණුවන ප්‍රති-රටාවක් (Anti-pattern) වන්නේ කුමක්ද?)',

  // Chapter 4
  'Q-CH4-1': 'An insurance application accepts an applicant\'s age as an integer input. Valid ages for coverage are from 18 to 65 inclusive. Ages under 18 are rejected with "Too young", and ages over 65 are rejected with "Too old". Inputs must be positive integers up to 120. Using Equivalence Partitioning, what is the MINIMUM number of test cases required to achieve 100% equivalence partition coverage? (රක්ෂණ යෙදුමක වයස 18 සිට 65 දක්වා වලංගු වේ. 18ට අඩු අගයන් "Too young" ලෙසද, 65ට වැඩි අගයන් "Too old" ලෙසද ප්‍රතික්ෂේප වේ (උපරිම 120 දක්වා). Equivalence Partitioning ක්‍රමයට අනුව 100% coverage ලබාගැනීමට අවශ්‍ය අවම Test cases ගණන කීයද?)',
  'Q-CH4-2': 'For the age requirement above (valid range 18 to 65 inclusive), which set of test values achieves 100% coverage using 2-VALUE Boundary Value Analysis (BVA)? (ඉහත වයස් සීමාව සඳහා (18 සිට 65 දක්වා වලංගු වේ), 2-Value Boundary Value Analysis (BVA) ක්‍රමවේදය භාවිතයෙන් 100% ආවරණයක් ලබාදෙන පරීක්ෂණ අගයන් කට්ටලය කුමක්ද?)',
  'Q-CH4-3': 'Which set of test values represents 3-VALUE Boundary Value Analysis for the lower boundary (18) of the valid range [18 to 65]? ([18 සිට 65] වලංගු පරාසයේ පහළ මායිම (18) සඳහා 3-Value Boundary Value Analysis (BVA) අගයන් නියෝජනය කරන්නේ කුමන අගයන් කට්ටලයද?)',
  'Q-CH4-4': 'A program contains a single if...then decision statement with no else block. A single test case executes the condition such that it evaluates to TRUE, running the inner code. What are the resulting Statement Coverage and Branch Coverage percentages? (ක්‍රමලේඛයක else කොටසක් නොමැති තනි if...then තීරණයක් ඇත. තනි test case එකකින් කොන්දේසිය TRUE වී අභ්‍යන්තර කේතය ක්‍රියාත්මක වේ නම්, Statement Coverage සහ Branch Coverage ප්‍රතිශත පිළිවෙළින් කොපමණද?)',
  'Q-CH4-5': 'A digital banking account has three states: [Open], [Overdrawn], and [Suspended]. The system allows valid transitions: Open -> Overdrawn, Overdrawn -> Open, Overdrawn -> Suspended, and Suspended -> Open. What is the MINIMUM number of valid transitions that must be exercised to achieve 100% Valid Transitions Coverage (0-Switch)? (ඩිජිටල් බැංකු ගිණුමක [Open], [Overdrawn], සහ [Suspended] යන තත්ත්ව 3ක් ඇත. වලංගු සංක්‍රාන්ති (Transitions) 4ක් පවතී: Open -> Overdrawn, Overdrawn -> Open, Overdrawn -> Suspended, සහ Suspended -> Open. 100% Valid Transitions Coverage (0-Switch) ලබාගැනීමට පරීක්ෂා කළ යුතු අවම සංක්‍රාන්ති සංඛ්‍යාව කීයද?)',
  'Q-CH4-6': 'What is a primary limitation of white-box test techniques? (ශ්වේත-පෙට්ටි පරීක්ෂණ තාක්ෂණයේ (White-box test techniques) ප්‍රධාන සීමාවක් හෝ අවාසියක් වන්නේ කුමක්ද?)',
  'Q-CH4-7': 'In session-based exploratory testing, what document provides the tester with high-level test objectives to guide their time-boxed exploration? (Session-based exploratory testing හිදී, කාල සීමා සහිත ගවේෂණය මෙහෙයවීම සඳහා ටෙස්ටර්ට ඉහළ මට්ටමේ පරීක්ෂණ අරමුණු සපයන ලේඛනය කුමක්ද?)',
  'Q-CH4-8': 'When using Acceptance Test-Driven Development (ATDD), in what order should the team derive and design test cases? (Acceptance Test-Driven Development (ATDD) භාවිතයේදී, කණ්ඩායම විසින් test cases සැලසුම් කළ යුතු නිවැරදි අනුපිළිවෙළ කුමක්ද?)'
};

// 1. Update question_bank.json
let updatedCount = 0;
qb.forEach(q => {
  if (SINHALA_STEMS[q.id]) {
    q.questionSi = SINHALA_STEMS[q.id];
    updatedCount++;
  }
});

fs.writeFileSync(qBankJsonPath, JSON.stringify(qb, null, 2), 'utf8');
console.log(`✓ Updated ${updatedCount} questions in question_bank.json!`);

// 2. Update question_bank.html embedded JSON
const qBankHtmlPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.html');
let qbHtml = fs.readFileSync(qBankHtmlPath, 'utf8');
const scriptTagRegex = /(<script id="bank-data" type="application\/json">)[\s\S]*?(<\/script>)/;
if (scriptTagRegex.test(qbHtml)) {
  qbHtml = qbHtml.replace(scriptTagRegex, `$1\n    ${JSON.stringify(qb)}\n  $2`);
  fs.writeFileSync(qBankHtmlPath, qbHtml, 'utf8');
  console.log('✓ Updated embedded JSON in question_bank.html');
} else {
  console.error('Failed to find <script id="bank-data"> in question_bank.html');
}

// 3. Update istqb_mock_exam_simulator.html embedded JSON
const simHtmlPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'istqb_mock_exam_simulator.html');
let simHtml = fs.readFileSync(simHtmlPath, 'utf8');
const simRegex = /(const ALL_QUESTIONS = )\[[\s\S]*?\];/;
if (simRegex.test(simHtml)) {
  simHtml = simHtml.replace(simRegex, `$1${JSON.stringify(qb, null, 2)};`);
  fs.writeFileSync(simHtmlPath, simHtml, 'utf8');
  console.log('✓ Updated ALL_QUESTIONS in istqb_mock_exam_simulator.html');
} else {
  console.error('Failed to find const ALL_QUESTIONS in istqb_mock_exam_simulator.html');
}

// 4. Update 03_Sinhala_Bilingual_Study_Guides_HTML for Ch 1 - 4 questions
function updateSinhalaStudyGuide(filePath, chNum) {
  let html = fs.readFileSync(filePath, 'utf8');
  let guideModified = 0;

  for (let qNum = 1; qNum <= 8; qNum++) {
    const qId = `Q-CH${chNum}-${qNum}`;
    const stem = SINHALA_STEMS[qId];
    if (!stem) continue;

    // Extract the Sinhala portion inside the outermost parentheses
    const firstParen = stem.indexOf('(');
    const lastParen = stem.lastIndexOf(')');
    if (firstParen === -1 || lastParen === -1 || lastParen <= firstParen) continue;
    const siSubText = stem.slice(firstParen + 1, lastParen).trim();

    // Check if the question already has the si-question-sub
    const qSearchRegex = new RegExp(`(<div class="quiz-q">Question ${qNum} \\[K\\d - FL-[\\d.]+\\]:[^<]+?)(<div|<br><span class="si-question-sub")`, 'i');
    
    const qCardRegex = new RegExp(`(<div class="quiz-q">Question ${qNum}\\b\\s*\\[K\\d - FL-[\\d.]+\\]:[\\s\\S]*?</div>)`, 'i');
    const m = html.match(qCardRegex);
    if (m && !m[0].includes('si-question-sub')) {
      const updatedHeader = m[0].replace('</div>', `<br><span class="si-question-sub">(${siSubText})</span></div>`);
      html = html.replace(m[0], updatedHeader);
      guideModified++;
    }
  }

  if (guideModified > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Added ${guideModified} Sinhala question stems to: ${path.basename(filePath)}`);
  } else {
    console.log(`- No question stems needed update in: ${path.basename(filePath)}`);
  }
}

updateSinhalaStudyGuide(path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML', 'istqb_ch1_study_guide_sinhala.html'), 1);
updateSinhalaStudyGuide(path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML', 'istqb_ch2_study_guide_sinhala.html'), 2);
updateSinhalaStudyGuide(path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML', 'istqb_ch3_study_guide_sinhala.html'), 3);
updateSinhalaStudyGuide(path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML', 'istqb_ch4_study_guide_sinhala.html'), 4);

// 5. Re-run build_txt_files.js to update question_bank.txt and study_map.txt
require('./build_txt_files.js');
