// Layer 2: official syllabus keywords per chapter  vs  EN html, SI html, EN pdf-text.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const lines = fs.readFileSync(path.join(__dirname, 'syllabus.txt'), 'utf8').replace(/\r/g, '').split('\n');

const blocks = [];
for (let i = 0; i < lines.length; i++) {
  if (/^Keywords?\s*$/i.test(lines[i].trim())) {
    let j = i + 1, buf = [];
    while (j < lines.length && lines[j].trim() === '') j++;
    while (j < lines.length && lines[j].trim() !== '') { buf.push(lines[j].trim()); j++; }
    blocks.push({ line: i + 1, text: buf.join(' ') });
  }
}
console.log('Keyword blocks found:', blocks.length, '(lines:', blocks.map(b => b.line).join(','), ')');
// first six blocks = chapters 1..6
const chap = blocks.slice(0, 6).map(b => b.text.split(',').map(k => k.replace(/\s+/g, ' ').trim()).filter(Boolean));
chap.forEach((k, i) => console.log(`Ch${i + 1}: ${k.length} keywords`));
fs.writeFileSync(path.join(__dirname, 'keywords.json'), JSON.stringify(chap, null, 2));

const norm = t => t.toLowerCase().replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;/g, ' ').replace(/[-‑–—_/]/g, ' ').replace(/\s+/g, ' ');
const pdfNames = ['Chapter_01_Fundamentals_of_Testing_Study_Guide', 'Chapter_02_Testing_Throughout_SDLC_Study_Guide', 'Chapter_03_Static_Testing_Study_Guide',
  'Chapter_04_Test_Analysis_and_Design_Study_Guide', 'Chapter_05_Managing_Test_Activities_Study_Guide', 'Chapter_06_Test_Tools_Study_Guide'];

// plural/variant tolerant matching
const variants = k => {
  const base = norm(k);
  const set = new Set([base, base + 's', base + 'es']);
  if (base.endsWith('y')) set.add(base.slice(0, -1) + 'ies');
  if (base.endsWith('s')) set.add(base.slice(0, -1));
  return [...set];
};
const has = (hay, k) => variants(k).some(v => hay.includes(v));

let totalMiss = 0;
for (let ch = 1; ch <= 6; ch++) {
  const en = norm(fs.readFileSync(path.join(root, `istqb_ch${ch}_study_guide.html`), 'utf8'));
  const si = norm(fs.readFileSync(path.join(root, `istqb_ch${ch}_study_guide_sinhala.html`), 'utf8'));
  const pd = norm(fs.readFileSync(path.join(__dirname, pdfNames[ch - 1] + '.txt'), 'utf8'));
  const kws = chap[ch - 1];
  const mEN = kws.filter(k => !has(en, k)), mSI = kws.filter(k => !has(si, k)), mPD = kws.filter(k => !has(pd, k));
  console.log(`\nCh${ch}  keywords=${kws.length} | missing EN-html=${mEN.length} SI-html=${mSI.length} EN-pdf=${mPD.length}`);
  if (mEN.length) console.log('   EN-html missing :', mEN.join('; '));
  if (mSI.length) console.log('   SI-html missing :', mSI.join('; '));
  if (mPD.length) console.log('   EN-pdf  missing :', mPD.join('; '));
  totalMiss += mEN.length + mSI.length + mPD.length;
}
console.log('\nTotal missing keyword hits:', totalMiss);
