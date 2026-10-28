const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sylPath = path.join(__dirname, '_audit', 'syllabus.txt');
const syl = fs.readFileSync(sylPath, 'utf8');

console.log('=== OFFICIAL SYLLABUS v4.0.1 COUNTS ===');
for (let c = 1; c <= 6; c++) {
  const loRegex = new RegExp(`FL-${c}\\.\\d\\.\\d`, 'g');
  const loMatches = new Set(syl.match(loRegex) || []);
  console.log(`Chapter 0${c}: Official LOs = ${loMatches.size}`);
}

console.log('\n=== STUDY GUIDE COUNTS ===');
for (let c = 1; c <= 6; c++) {
  const fEn = path.join(rootDir, '02_English_Study_Guides_HTML', `istqb_ch${c}_study_guide.html`);
  const html = fs.readFileSync(fEn, 'utf8');
  const qCount = (html.match(/class="quiz-card"/g) || []).length;
  const loSet = new Set(html.match(new RegExp(`FL-${c}\\.\\d\\.\\d`, 'g')) || []);
  console.log(`Chapter 0${c}: Guide LOs = ${loSet.size}, Guide Questions = ${qCount}`);
}

// Question Bank distribution
const qBankPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
const qb = JSON.parse(fs.readFileSync(qBankPath, 'utf8'));
const qbByCh = {};
qb.forEach(q => {
  qbByCh[q.chapter] = (qbByCh[q.chapter] || 0) + 1;
});
console.log('\n=== QUESTION BANK DISTRIBUTION ===');
console.log(qbByCh);
