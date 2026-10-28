/** Deeper accuracy checks: stray/invalid LO IDs, question K-level tags, exam facts, chapter timings. */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const syl = fs.readFileSync(path.join(__dirname, '_audit', 'syllabus.txt'), 'utf8');

const kOf = {};
[...syl.matchAll(/(FL-\d\.\d\.\d)\s*\(K(\d)\)/g)].forEach(m => kOf[m[1]] = m[2]);
console.log('Official LOs:', Object.keys(kOf).length);

const dirs = ['02_English_Study_Guides_HTML', '03_Sinhala_Bilingual_Study_Guides_HTML'];
let problems = 0;
const report = m => { problems++; console.log('  [!]', m); };

for (const d of dirs) {
  for (const f of fs.readdirSync(path.join(root, d)).filter(f => /study_guide/.test(f))) {
    const t = fs.readFileSync(path.join(root, d, f), 'utf8');
    const ch = f.match(/ch(\d)/)[1];
    console.log('\n' + f);
    // 1. invalid / foreign-chapter IDs
    new Set(t.match(/FL-\d\.\d\.\d/g)).forEach(id => {
      if (!kOf[id]) report(`ID not in syllabus: ${id}`);
      else if (id[3] !== ch) report(`ID from other chapter: ${id}`);
    });
    // 2. question tags "[K2 - FL-1.1.2]" and "FL-x (Kn)" patterns
    [...t.matchAll(/\[K(\d)\s*-\s*(FL-\d\.\d\.\d)\]/g)].forEach(m => {
      if (kOf[m[2]] && kOf[m[2]] !== m[1]) report(`Question tag K${m[1]} for ${m[2]} (official K${kOf[m[2]]})`);
    });
    [...t.matchAll(/(FL-\d\.\d\.\d)\s*\(K(\d)\)/g)].forEach(m => {
      if (kOf[m[1]] && kOf[m[1]] !== m[2]) report(`Badge text ${m[1]} K${m[2]} (official K${kOf[m[1]]})`);
    });
    // 3. LO coverage by practice questions
    const qIds = new Set([...t.matchAll(/\[K\d\s*-\s*(FL-\d\.\d\.\d)\]/g)].map(m => m[1]));
    const chLOs = Object.keys(kOf).filter(id => id[3] === ch);
    const uncovered = chLOs.filter(id => !qIds.has(id));
    console.log(`  practice questions tag ${qIds.size}/${chLOs.length} LOs` + (uncovered.length ? `  (no question for: ${uncovered.join(', ')})` : ''));
    console.log('  questions:', (t.match(/class="quiz-card"/g) || []).length);
  }
}

// exam facts in syllabus
console.log('\n--- Official exam facts ---');
['40 ', '60 minutes', '65%', '26', 'multiple-choice', 'K1', 'one point'].forEach(k => {
  const i = syl.indexOf(k);
  if (i >= 0 && ['60 minutes', '65%', 'multiple-choice'].includes(k)) console.log(k, '=>', syl.slice(Math.max(0, i - 100), i + 120).replace(/\s+/g, ' '));
});

const files = ['README.md', 'index.html'];
console.log('\n--- Exam/timing facts claimed in README + index ---');
files.forEach(f => {
  const t = fs.readFileSync(path.join(root, f), 'utf8').replace(/<[^>]+>/g, ' ');
  (t.match(/.{0,70}(\b65\s?%|\b40 (?:multiple|questions)|\b60 min|\b75 min|\b1135|\bpass mark|\b26 )[^\n]{0,70}/gi) || []).slice(0, 8).forEach(l => console.log(`  ${f}: ${l.replace(/\s+/g, ' ')}`));
});
console.log('\nProblems found:', problems);
