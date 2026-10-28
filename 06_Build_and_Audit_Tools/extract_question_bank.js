const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

const questionBank = [];

for (let ch = 1; ch <= 6; ch++) {
  const fileEn = path.join(enDir, `istqb_ch${ch}_study_guide.html`);
  const fileSi = path.join(siDir, `istqb_ch${ch}_study_guide_sinhala.html`);

  const contentEn = fs.readFileSync(fileEn, 'utf8');
  const contentSi = fs.readFileSync(fileSi, 'utf8');

  const cardsEn = contentEn.split('<div class="quiz-card">').slice(1);
  const cardsSi = contentSi.split('<div class="quiz-card">').slice(1);

  console.log(`Processing Ch ${ch}: ${cardsEn.length} EN cards, ${cardsSi.length} SI cards`);

  cardsEn.forEach((cardEn, idx) => {
    const cardSi = cardsSi[idx] || cardEn;

    // Extract Question Header, LO, K-level
    const qMatchEn = cardEn.match(/<div class="quiz-q">([\s\S]*?)<\/div>/i);
    const rawQEn = qMatchEn ? qMatchEn[1] : '';

    const qMatchSi = cardSi.match(/<div class="quiz-q">([\s\S]*?)<\/div>/i);
    const rawQSi = qMatchSi ? qMatchSi[1] : '';

    // Extract LO and K-level
    const loMatch = rawQEn.match(/FL-\d\.\d\.\d/);
    const lo = loMatch ? loMatch[0] : `FL-${ch}.1.1`;

    const kMatch = rawQEn.match(/\[(K[123])/i);
    const kLevel = kMatch ? kMatch[1].toUpperCase() : 'K2';

    // Clean question text
    let cleanQEn = rawQEn.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    // Remove "Question X [Kx - FL-x.x.x]:" prefix if present
    const cleanStemEn = cleanQEn.replace(/^Question\s+\d+\s*\[[^\]]+\]:\s*/i, '').trim();

    let cleanQSi = rawQSi.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const cleanStemSi = cleanQSi.replace(/^Question\s+\d+\s*\[[^\]]+\]:\s*/i, '').trim();

    // Extract Options
    const optMatchesEn = [...cardEn.matchAll(/<div class="quiz-opt">([\s\S]*?)<\/div>/gi)];
    const optionsEn = optMatchesEn.map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

    const optMatchesSi = [...cardSi.matchAll(/<div class="quiz-opt">([\s\S]*?)<\/div>/gi)];
    const optionsSi = optMatchesSi.map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

    // Extract Answer
    const ansMatch = cardEn.match(/Correct Answer:\s*([A-D])/i);
    const correctAns = ansMatch ? ansMatch[1].toUpperCase() : 'A';

    // Extract Rationale
    const ratMatchEn = cardEn.match(/<strong>Rationale:<\/strong>([\s\S]*?)(?:<\/div>|$)/i);
    const rationaleEn = ratMatchEn ? ratMatchEn[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

    const ratMatchSi = cardSi.match(/<strong>Rationale:<\/strong>([\s\S]*?)(?:<\/div>|$)/i);
    const rationaleSi = ratMatchSi ? ratMatchSi[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : rationaleEn;

    questionBank.push({
      id: `Q-CH${ch}-${idx + 1}`,
      chapter: ch,
      chapterTitle: `Chapter 0${ch}`,
      lo: lo,
      kLevel: kLevel,
      questionEn: cleanStemEn || cleanQEn,
      questionSi: cleanStemSi || cleanQSi,
      optionsEn: optionsEn,
      optionsSi: optionsSi.length === optionsEn.length ? optionsSi : optionsEn,
      answer: correctAns,
      rationaleEn: rationaleEn,
      rationaleSi: rationaleSi
    });
  });
}

console.log(`\nExtracted ${questionBank.length} questions into Question Bank!`);

const outPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
fs.writeFileSync(outPath, JSON.stringify(questionBank, null, 2), 'utf8');
console.log(`Saved question bank to ${outPath}`);
