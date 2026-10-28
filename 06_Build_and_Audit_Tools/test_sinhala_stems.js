const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('=== AUDITING SINHALA STEMS ACROSS THE ENTIRE REPOSITORY ===');

// 1. question_bank.json
const qb = JSON.parse(fs.readFileSync(path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json'), 'utf8'));
const qbMissing = qb.filter(q => !q.questionSi || q.questionSi.trim() === q.questionEn.trim());
console.log(`1. question_bank.json: ${qb.length - qbMissing.length}/${qb.length} have unique Sinhala stems (${qbMissing.length} missing)`);

// 2. question_bank.html
const qbHtml = fs.readFileSync(path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.html'), 'utf8');
const tagOpen = '<script id="bank-data" type="application/json">';
const tagClose = '</script>';
const p1 = qbHtml.indexOf(tagOpen);
const p2 = qbHtml.indexOf(tagClose, p1);
const qbHtmlData = JSON.parse(qbHtml.slice(p1 + tagOpen.length, p2).trim());
const qbHtmlMissing = qbHtmlData.filter(q => !q.questionSi || q.questionSi.trim() === q.questionEn.trim());
console.log(`2. question_bank.html: ${qbHtmlData.length - qbHtmlMissing.length}/${qbHtmlData.length} have unique Sinhala stems (${qbHtmlMissing.length} missing)`);

// 3. istqb_mock_exam_simulator.html
const simHtml = fs.readFileSync(path.join(rootDir, '05_Practice_Questions_and_Summaries', 'istqb_mock_exam_simulator.html'), 'utf8');
const simMarker = 'const ALL_QUESTIONS = ';
const s1 = simHtml.indexOf(simMarker);
const s2 = simHtml.indexOf(';\n', s1);
const simData = JSON.parse(simHtml.slice(s1 + simMarker.length, s2).trim());
const simMissing = simData.filter(q => !q.questionSi || q.questionSi.trim() === q.questionEn.trim());
console.log(`3. istqb_mock_exam_simulator.html: ${simData.length - simMissing.length}/${simData.length} have unique Sinhala stems (${simMissing.length} missing)`);

// 4. question_bank.txt (root and subfolder)
const txt1 = fs.readFileSync(path.join(rootDir, 'question_bank.txt'), 'utf8');
const txt2 = fs.readFileSync(path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.txt'), 'utf8');
const siMatches1 = (txt1.match(/^STEM \(SI\): /gm) || []).length;
const siMatches2 = (txt2.match(/^STEM \(SI\): /gm) || []).length;
console.log(`4. question_bank.txt (root): ${siMatches1}/${qb.length} questions include Sinhala stems`);
console.log(`   question_bank.txt (subfolder): ${siMatches2}/${qb.length} questions include Sinhala stems`);

// 5. Check 03_Sinhala_Study_Guides_HTML for all 6 chapters
console.log(`5. Sinhala Study Guides (Chapters 1 - 6):`);
let totalGuidesMissing = 0;
for (let c = 1; c <= 6; c++) {
  const guidePath = path.join(rootDir, '03_Sinhala_Study_Guides_HTML', `istqb_ch${c}_study_guide_sinhala.html`);
  const guideHtml = fs.readFileSync(guidePath, 'utf8');
  const subs = (guideHtml.match(/class="si-question-sub"/g) || []).length;
  const totalQ = (guideHtml.match(/class="quiz-card"/g) || []).length;
  console.log(`   Chapter 0${c}: ${subs}/${totalQ} questions have Sinhala stem subtext (<span class="si-question-sub">)`);
  
  if (subs < totalQ) {
    totalGuidesMissing += (totalQ - subs);
    const cards = guideHtml.split('<div class="quiz-card">').slice(1);
    cards.forEach((card, idx) => {
      if (!card.includes('si-question-sub')) {
        const header = (card.match(/<div class="quiz-q">([\s\S]*?)<\/div>/) || [])[1] || '';
        console.log(`     -> Ch ${c} Q${idx + 1} missing: ${header.replace(/\s+/g, ' ').slice(0, 90)}...`);
      }
    });
  }
}

// 6. Test question_bank.html interactive UI stem rendering condition
const uiRenderPass = qbHtmlData.filter(q => q.questionSi && q.questionSi !== q.questionEn).length;
console.log(`6. question_bank.html UI Render Condition: ${uiRenderPass}/${qbHtmlData.length} questions render Sinhala stem when toggled ON`);

if (qbMissing.length === 0 && qbHtmlMissing.length === 0 && simMissing.length === 0 && siMatches1 === 71 && siMatches2 === 71 && totalGuidesMissing === 0 && uiRenderPass === 71) {
  console.log('\n>>> SUCCESS: 100% OF ALL 71 QUESTIONS NOW HAVE ACCURATE SINHALA STEMS IN ALL RESOURCES! <<<');
} else {
  console.error('\n>>> ERROR: Some Sinhala stems are still missing! <<<');
  process.exit(1);
}
