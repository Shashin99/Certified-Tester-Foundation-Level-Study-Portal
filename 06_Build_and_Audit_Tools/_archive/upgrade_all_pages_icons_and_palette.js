const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const chevronSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';

// ==========================================
// 1. UPGRADE study_map.html
// ==========================================
console.log('Upgrading study_map.html...');
const studyMapPath = path.join(rootDir, 'study_map.html');
let sm = fs.readFileSync(studyMapPath, 'utf8');

// Favicon
sm = sm.replace(
  /<link rel="icon" href="[^"]*">/,
  '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%232563eb%22/><path d=%22M20 30 L45 20 L55 35 L80 25 L80 75 L55 85 L45 70 L20 80 Z%22 stroke=%22white%22 stroke-width=%228%22 stroke-linejoin=%22round%22 fill=%22none%22/></svg>">'
);

// Header emojis
sm = sm.replace('🏠 Study Hub', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Study Hub');
sm = sm.replace('🎯 Official 40Q Simulator', '40Q Exam Simulator');
sm = sm.replace('📝 71+ Question Bank', '71+ Question Bank');
sm = sm.replace('📄 Plain Text (.txt)', 'Plain Text (.txt)');
sm = sm.replace('☀️ Light', 'Theme');
sm = sm.replace('🌙 Dark', 'Theme');
sm = sm.replace('🖨️ Print', 'Print');

// Body emojis
sm = sm.replace('💡 Primary Exam Standard: ISTQB® CTFL v4.0.1', 'Primary Exam Standard: ISTQB® CTFL v4.0.1');
sm = sm.replace('🇬🇧 English Study Guides (Chapters 01 – 06)', 'English Study Guides (Chapters 01 – 06)');
sm = sm.replace('🇱🇰 Sinhala Study Guides (පරිච්ඡේද 01 – 06)', 'Sinhala Study Guides (පරිච්ඡේද 01 – 06)');
sm = sm.replace('🎯 Exam Simulator & Practice Question Bank', 'Exam Simulator & Practice Question Bank');
sm = sm.replace('🎯 Official 40Q Exam Simulator', 'Official 40Q Exam Simulator');
sm = sm.replace('📝 71+ Question Bank (Interactive Web App)', '71+ Question Bank (Interactive Web App)');
sm = sm.replace('📄 Offline Master Question Bank (.txt)', 'Offline Master Question Bank (.txt)');
sm = sm.replace('📄 Ink-Friendly Printable PDFs (Chapters 01 – 06)', 'Printable PDFs (Chapters 01 – 06)');
sm = sm.replace('🇬🇧 English Printable Guides:', 'English Printable Guides:');
sm = sm.replace('🇱🇰 සිංහල අධ්‍යයන මාර්ගෝපදේශ (PDF):', 'සිංහල අධ්‍යයන මාර්ගෝපදේශ (PDF):');

// Floating button
sm = sm.replace(
  '<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:\'smooth\'})" title="Scroll to Top">⬆</button>',
  `<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="Scroll to Top">${chevronSvg}</button>`
);

fs.writeFileSync(studyMapPath, sm, 'utf8');

// ==========================================
// 2. UPGRADE question_bank.html
// ==========================================
console.log('Upgrading question_bank.html...');
const qbPath = path.join(rootDir, '05_Practice_Questions_and_Summaries/question_bank.html');
let qb = fs.readFileSync(qbPath, 'utf8');

// Favicon
qb = qb.replace(
  /<link rel="icon" href="[^"]*">/,
  '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%232563eb%22/><path d=%22M30 35 h40 M30 50 h40 M30 65 h25%22 stroke=%22white%22 stroke-width=%2210%22 stroke-linecap=%22round%22/></svg>">'
);

// Header
qb = qb.replace('🏠 Study Hub', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Study Hub');
qb = qb.replace('🗺️ Roadmap', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>Roadmap');
qb = qb.replace('🎯 Official 40Q Simulator', '40Q Exam Simulator');
qb = qb.replace('📄 Plain Text (.txt)', 'Plain Text (.txt)');
qb = qb.replace('🌙 Theme', 'Theme');
qb = qb.replace('🖨️ Print', 'Print');

// Action buttons
qb = qb.replace('👁️ Toggle All Answers', 'Toggle All Answers');
qb = qb.replace('🇱🇰 Sinhala Stems: ON', 'Sinhala Stems: ON');

// Reveal Answer button text in JS template
qb = qb.replace(
  '<span id="btn-icon-${idx}">👁️</span> <span id="btn-txt-${idx}">Reveal Answer</span>',
  '<span id="btn-txt-${idx}">Show Answer</span>'
);

// In toggleAnswer JS
qb = qb.replace("icon.textContent = '🙈';\n        txt.textContent = 'Hide Answer';", "txt.textContent = 'Hide Answer';");
qb = qb.replace("icon.textContent = '👁️';\n        txt.textContent = 'Reveal Answer';", "txt.textContent = 'Show Answer';");
qb = qb.replace("b.querySelector('span:first-child').textContent = allAnswersVisible ? '🙈' : '👁️';", "");
qb = qb.replace("b.querySelector('span:last-child').textContent = allAnswersVisible ? 'Hide Answer' : 'Reveal Answer';", "b.textContent = allAnswersVisible ? 'Hide Answer' : 'Show Answer';");

// Empty state
qb = qb.replace('<div style="font-size: 36px; margin-bottom: 12px;">🔍</div>', '<div style="margin-bottom: 12px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>');
qb = qb.replace('🔄 Reset All Filters', 'Reset All Filters');

// Floating button
qb = qb.replace(
  '<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:\'smooth\'})" title="Scroll to Top">⬆</button>',
  `<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="Scroll to Top">${chevronSvg}</button>`
);

fs.writeFileSync(qbPath, qb, 'utf8');

// ==========================================
// 3. UPGRADE istqb_mock_exam_simulator.html
// ==========================================
console.log('Upgrading istqb_mock_exam_simulator.html...');
const simPath = path.join(rootDir, '05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html');
let sim = fs.readFileSync(simPath, 'utf8');

// Favicon
sim = sim.replace(
  /<link rel="icon" href="[^"]*">/,
  '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%232563eb%22/><circle cx=%2250%22 cy=%2250%22 r=%2228%22 stroke=%22white%22 stroke-width=%229%22 fill=%22none%22/><circle cx=%2250%22 cy=%2250%22 r=%2210%22 fill=%22white%22/></svg>">'
);

// Header
sim = sim.replace('🏠 Study Hub', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Study Hub');
sim = sim.replace('🗺️ Roadmap', '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>Roadmap');
sim = sim.replace('⏱️ <span id="time-left">60:00</span>', '<svg style="width:15px;height:15px;vertical-align:-2px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span id="time-left">60:00</span>');
sim = sim.replace('🇱🇰 සිංහල / EN', 'EN / සිංහල');
sim = sim.replace('🌙 Theme', 'Theme');
sim = sim.replace('🏁 Submit Exam', 'Submit Exam');

// Question Controls
sim = sim.replace('🚩 Mark for Review', 'Mark for Review');
sim = sim.replace('🔄 New Randomized 40Q Set', 'Randomize 40Q Set');
sim = sim.replace('👁️ Check Answer', 'Check Answer');

// Results action buttons
sim = sim.replace('🔄 Take Another 40Q Mock Exam', 'Take Another 40Q Exam');
sim = sim.replace('🖨️ Print Score Report', 'Print Score Report');
sim = sim.replace('📝 71+ Master Question Bank', 'Master Question Bank');
sim = sim.replace('🗺️ Study Roadmap', 'Study Roadmap');
sim = sim.replace('🏠 Return to Study Portal', 'Return to Study Portal');

// Floating button
sim = sim.replace(
  '<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:\'smooth\'})" title="Scroll to Top">⬆</button>',
  `<button class="floating-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="Scroll to Top">${chevronSvg}</button>`
);

fs.writeFileSync(simPath, sim, 'utf8');

// ==========================================
// 4. UPGRADE ALL 12 STUDY GUIDES
// ==========================================
console.log('Upgrading 12 Study Guides...');
for (let i = 1; i <= 6; i++) {
  const guidePaths = [
    path.join(rootDir, `02_English_Study_Guides_HTML/istqb_ch${i}_study_guide.html`),
    path.join(rootDir, `03_Sinhala_Study_Guides_HTML/istqb_ch${i}_study_guide_sinhala.html`)
  ];

  guidePaths.forEach(gp => {
    let g = fs.readFileSync(gp, 'utf8');

    // Brand
    g = g.replace('<span>🏠</span> <strong>ISTQB® CTFL Hub</strong>', '<strong>ISTQB® CTFL Hub</strong>');

    // Pills
    g = g.replace('🎯 40Q Simulator', '40Q Simulator');
    g = g.replace('🗺️ Roadmap', 'Roadmap');

    // Lang & Theme buttons
    g = g.replace('⇄ 🇱🇰 සිංහල අනුවාදය', 'සිංහල අනුවාදය');
    g = g.replace('⇄ 🇬🇧 English Edition', 'English Edition');
    g = g.replace('🌙 Dark', 'Theme');
    g = g.replace('☀️ Light', 'Theme');
    g = g.replace('🖨️ Print', 'Print');

    // Back to top floating button
    g = g.replace('<span>↑</span>', chevronSvg);
    g = g.replace('>↑</button>', `>${chevronSvg}</button>`);
    g = g.replace('>⬆</button>', `>${chevronSvg}</button>`);

    fs.writeFileSync(gp, g, 'utf8');
  });
}

console.log('All pages upgraded successfully with professional, executive design elements!');
