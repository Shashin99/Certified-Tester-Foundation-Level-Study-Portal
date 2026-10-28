const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const qBankJsonPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
const qBank = JSON.parse(fs.readFileSync(qBankJsonPath, 'utf8'));

// ============================================================================
// 1 & 2. GENERATE question_bank.txt and study_map.txt
// ============================================================================
require('./build_txt_files.js');

// ============================================================================
// 3. GENERATE question_bank.html
// ============================================================================
const qBankHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISTQB® CTFL v4.0.1 Master Question Bank (71+ Verified Questions)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #f1f5f9;
      --surface: #ffffff;
      --surface-elevated: #f8fafc;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-body: #1e293b;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #0284c7;
      --success: #059669;
      --danger: #dc2626;
      --warning: #d97706;
      --radius: 8px;
    }

    body.dark-theme {
      --bg: #060a12;
      --surface: #0b1120;
      --surface-elevated: #131d31;
      --border: #1e293b;
      --text: #ffffff;
      --text-muted: #94a3b8;
      --text-body: #e2e8f0;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #38bdf8;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", sans-serif;
      background-color: var(--bg);
      color: var(--text-body);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Sticky Navbar */
    header {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: #0f172a;
      color: #f8fafc;
      border-bottom: 2px solid #3b82f6;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      padding: 8px 24px;
    }

    .header-container {
      max-width: 1540px;
      width: 95%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-home {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: #1e293b;
      border: 1px solid #3b82f6;
      color: #60a5fa;
      text-decoration: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      transition: all 0.2s;
    }
    .btn-home:hover {
      background: rgba(59, 130, 246, 0.3);
      color: #93c5fd;
    }

    .bank-title {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .bank-badge {
      font-size: 11px;
      background: #059669;
      color: #fff;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ctrl-btn {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #475569;
      background: #1e293b;
      color: #cbd5e1;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .ctrl-btn:hover {
      background: #334155;
      color: #ffffff;
      border-color: #64748b;
    }
    .ctrl-btn-sim {
      background: #064e3b;
      border-color: #059669;
      color: #a7f3d0;
      font-weight: 700;
    }
    .ctrl-btn-sim:hover {
      background: #047857;
      color: #ecfdf5;
    }

    /* Main Container */
    .study-main-wrapper {
      width: 95%;
      max-width: 1540px;
      margin: 14px auto 50px auto;
      padding: 28px 36px 44px 36px;
      background: var(--surface);
      border-radius: 10px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      flex: 1;
    }

    .page-header {
      margin-bottom: 20px;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 12px;
    }

    .page-header h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text);
    }
    .page-header p {
      font-size: 13.5px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Controls Bar */
    .filter-panel {
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .search-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }

    .search-input {
      flex: 1;
      min-width: 280px;
      padding: 9px 14px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font-size: 13.5px;
      outline: none;
    }
    .search-input:focus {
      border-color: var(--primary);
    }

    .btn-action-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn-group {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filter-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-right: 4px;
    }

    .filter-pill {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .filter-pill:hover {
      border-color: var(--primary);
      color: var(--text);
    }
    .filter-pill.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
    }

    .stats-info {
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 600;
    }

    /* Questions Grid / List */
    .questions-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .q-card {
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .q-card:hover {
      border-color: var(--primary);
    }

    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .q-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 4px;
    }
    .badge-ch { background: #1e3a8a; color: #93c5fd; border: 1px solid #3b82f6; }
    .badge-lo { background: #0f2b5c; color: #60a5fa; border: 1px solid #2563eb; }
    .badge-k1 { background: #0f2b5c; color: #93c5fd; border: 1px solid #3b82f6; }
    .badge-k2 { background: #2e1065; color: #d8b4fe; border: 1px solid #8b5cf6; }
    .badge-k3 { background: #431407; color: #fdba74; border: 1px solid #f97316; }

    .q-num {
      font-weight: 800;
      font-size: 14px;
      color: var(--text);
    }

    .q-stem-en {
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.55;
      margin-bottom: 8px;
    }

    .q-stem-si {
      font-size: 14px;
      color: var(--accent);
      line-height: 1.6;
      margin-bottom: 12px;
      font-weight: 500;
    }

    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
    }

    .option-row {
      padding: 8px 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 13.5px;
      color: var(--text-body);
      line-height: 1.5;
    }

    .btn-toggle-ans {
      background: #1e293b;
      border: 1px solid #475569;
      color: #93c5fd;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .btn-toggle-ans:hover {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
    }

    .answer-box {
      margin-top: 12px;
      padding: 14px 18px;
      background: rgba(16, 185, 129, 0.08);
      border-left: 4px solid var(--success);
      border-radius: 0 6px 6px 0;
      display: none;
    }

    .ans-title {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--success);
      margin-bottom: 4px;
    }

    .ans-rationale {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.6;
    }

    /* Floating Action */
    .floating-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #2563eb;
      color: #ffffff;
      border: 2px solid #60a5fa;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      transition: transform 0.2s;
      z-index: 999;
    }
    .floating-btn:hover {
      transform: translateY(-3px);
    }

    @media print {
      header, .filter-panel, .btn-toggle-ans, .floating-btn { display: none !important; }
      .study-main-wrapper { max-width: none !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
      .answer-box { display: block !important; }
      body { background: #fff !important; color: #000 !important; }
    }
  </style>
</head>
<body>

  <header>
    <div class="header-container">
      <div class="header-left">
        <a href="../index.html" class="btn-home">🏠 Study Hub</a>
        <div class="bank-title">
          ISTQB® CTFL v4.0.1 Master Question Bank
          <span class="bank-badge">71 Questions</span>
        </div>
      </div>
      <div class="header-right">
        <a href="istqb_mock_exam_simulator.html" class="ctrl-btn ctrl-btn-sim">🎯 Official 40Q Simulator</a>
        <a href="question_bank.txt" target="_blank" class="ctrl-btn">📄 Plain Text (.txt)</a>
        <button class="ctrl-btn" id="theme-btn" onclick="toggleTheme()">🌙 Theme</button>
        <button class="ctrl-btn" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
  </header>

  <main class="study-main-wrapper">
    <div class="page-header">
      <div>
        <h1>Comprehensive Practice Question Repository</h1>
        <p>71 verified practice questions with Learning Objectives, Cognitive K-Levels, Sinhala stems, and official rationales.</p>
      </div>
      <div class="stats-info" id="stats-counter">Showing 71 of 71 questions</div>
    </div>

    <!-- Filters Panel -->
    <div class="filter-panel">
      <div class="search-row">
        <input type="text" id="filter-search" class="search-input" placeholder="Search questions, keywords, syllabus concepts..." oninput="applyFilters()">
        <div class="btn-action-group">
          <button class="ctrl-btn" onclick="toggleAllAnswers()">👁️ Toggle All Answers</button>
          <button class="ctrl-btn" id="lang-btn" onclick="toggleSinhala()">🇱🇰 Sinhala Stems: ON</button>
        </div>
      </div>

      <div class="filter-btn-group">
        <span class="filter-label">Chapter:</span>
        <button class="filter-pill active" onclick="setChapterFilter(0, this)">All Chapters (71)</button>
        <button class="filter-pill" onclick="setChapterFilter(1, this)">Ch 1 (14)</button>
        <button class="filter-pill" onclick="setChapterFilter(2, this)">Ch 2 (14)</button>
        <button class="filter-pill" onclick="setChapterFilter(3, this)">Ch 3 (8)</button>
        <button class="filter-pill" onclick="setChapterFilter(4, this)">Ch 4 (15)</button>
        <button class="filter-pill" onclick="setChapterFilter(5, this)">Ch 5 (16)</button>
        <button class="filter-pill" onclick="setChapterFilter(6, this)">Ch 6 (4)</button>
      </div>

      <div class="filter-btn-group">
        <span class="filter-label">K-Level:</span>
        <button class="filter-pill active" onclick="setKFilter('all', this)">All Levels</button>
        <button class="filter-pill" onclick="setKFilter('K1', this)">K1 (Remember)</button>
        <button class="filter-pill" onclick="setKFilter('K2', this)">K2 (Understand)</button>
        <button class="filter-pill" onclick="setKFilter('K3', this)">K3 (Apply)</button>
      </div>
    </div>

    <!-- Questions Container -->
    <div class="questions-container" id="questions-list">
      <!-- Generated via JS -->
    </div>
  </main>

  <button class="floating-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" title="Scroll to Top">⬆</button>

  <script id="bank-data" type="application/json">
    ${JSON.stringify(qBank)}
  </script>

  <script>
    const questions = JSON.parse(document.getElementById('bank-data').textContent);
    let currentChapter = 0;
    let currentKLevel = 'all';
    let showSinhala = true;
    let allAnswersVisible = false;

    function renderQuestions() {
      const container = document.getElementById('questions-list');
      container.innerHTML = '';

      const query = document.getElementById('filter-search').value.toLowerCase().trim();
      let visibleCount = 0;

      questions.forEach((q, idx) => {
        if (currentChapter !== 0 && q.chapter !== currentChapter) return;
        if (currentKLevel !== 'all' && q.kLevel !== currentKLevel) return;

        if (query) {
          const matchEn = q.questionEn.toLowerCase().includes(query);
          const matchSi = q.questionSi && q.questionSi.toLowerCase().includes(query);
          const matchLo = q.lo.toLowerCase().includes(query);
          const matchRat = q.rationaleEn.toLowerCase().includes(query);
          const matchOpts = q.optionsEn.some(o => o.toLowerCase().includes(query));
          if (!matchEn && !matchSi && !matchLo && !matchRat && !matchOpts) return;
        }

        visibleCount++;

        const card = document.createElement('div');
        card.className = 'q-card';
        card.id = 'q-' + idx;

        let optionsHtml = '';
        q.optionsEn.forEach((opt, optIdx) => {
          optionsHtml += '<div class="option-row">' + opt + '</div>';
        });

        const siStemHtml = (showSinhala && q.questionSi && q.questionSi !== q.questionEn)
          ? '<div class="q-stem-si">' + q.questionSi + '</div>'
          : '';

        card.innerHTML = \`
          <div class="q-header">
            <div class="q-meta">
              <span class="q-num">Q\${idx + 1}</span>
              <span class="badge badge-ch">Ch 0\${q.chapter}</span>
              <span class="badge badge-lo">\${q.lo}</span>
              <span class="badge badge-\${q.kLevel.toLowerCase()}">\${q.kLevel}</span>
            </div>
            <button type="button" class="btn-toggle-ans" onclick="toggleAnswer(\${idx})">
              <span id="btn-icon-\${idx}">👁️</span> <span id="btn-txt-\${idx}">Reveal Answer</span>
            </button>
          </div>
          <div class="q-stem-en">\${q.questionEn}</div>
          \${siStemHtml}
          <div class="options-grid">\${optionsHtml}</div>
          <div class="answer-box" id="ans-\${idx}" style="display: \${allAnswersVisible ? 'block' : 'none'};">
            <div class="ans-title">✓ Correct Answer: \${q.answer}</div>
            <div class="ans-rationale"><strong>Official Rationale:</strong> \${q.rationaleEn}</div>
          </div>
        \`;

        container.appendChild(card);
      });

      document.getElementById('stats-counter').textContent = 'Showing ' + visibleCount + ' of ' + questions.length + ' questions';
    }

    function toggleAnswer(idx) {
      const box = document.getElementById('ans-' + idx);
      const icon = document.getElementById('btn-icon-' + idx);
      const txt = document.getElementById('btn-txt-' + idx);
      if (box.style.display === 'none' || !box.style.display) {
        box.style.display = 'block';
        icon.textContent = '🙈';
        txt.textContent = 'Hide Answer';
      } else {
        box.style.display = 'none';
        icon.textContent = '👁️';
        txt.textContent = 'Reveal Answer';
      }
    }

    function toggleAllAnswers() {
      allAnswersVisible = !allAnswersVisible;
      document.querySelectorAll('.answer-box').forEach(b => {
        b.style.display = allAnswersVisible ? 'block' : 'none';
      });
      document.querySelectorAll('.btn-toggle-ans').forEach(b => {
        b.querySelector('span:first-child').textContent = allAnswersVisible ? '🙈' : '👁️';
        b.querySelector('span:last-child').textContent = allAnswersVisible ? 'Hide Answer' : 'Reveal Answer';
      });
    }

    function toggleSinhala() {
      showSinhala = !showSinhala;
      document.getElementById('lang-btn').textContent = showSinhala ? '🇱🇰 Sinhala Stems: ON' : '🇬🇧 English Only';
      renderQuestions();
    }

    function setChapterFilter(ch, btn) {
      currentChapter = ch;
      btn.parentElement.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderQuestions();
    }

    function setKFilter(k, btn) {
      currentKLevel = k;
      btn.parentElement.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderQuestions();
    }

    function applyFilters() {
      renderQuestions();
    }

    function toggleTheme() {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('istqb_reading_theme', isDark ? 'dark' : 'light');
      document.getElementById('theme-btn').textContent = isDark ? '☀️ Light' : '🌙 Theme';
    }

    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('istqb_reading_theme');
      if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.getElementById('theme-btn').textContent = '🌙 Dark';
      } else {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-btn').textContent = '☀️ Light';
      }
      renderQuestions();
    });
  </script>
</body>
</html>
`;

const qBankHtmlPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.html');
fs.writeFileSync(qBankHtmlPath, qBankHtml, 'utf8');
console.log('✓ Created question_bank.html');

// ============================================================================
// 4. GENERATE study_map.html
// ============================================================================
const studyMapHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISTQB® CTFL v4.0.1 Library Index, Blueprint & Study Roadmap</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Sinhala:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #f1f5f9;
      --surface: #ffffff;
      --surface-elevated: #f8fafc;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-body: #1e293b;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #0284c7;
      --success: #059669;
      --radius: 8px;
    }

    body.dark-theme {
      --bg: #060a12;
      --surface: #0b1120;
      --surface-elevated: #131d31;
      --border: #1e293b;
      --text: #ffffff;
      --text-muted: #94a3b8;
      --text-body: #e2e8f0;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #38bdf8;
      --success: #10b981;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", sans-serif;
      background-color: var(--bg);
      color: var(--text-body);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Sticky Navbar */
    header {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: #0f172a;
      color: #f8fafc;
      border-bottom: 2px solid #3b82f6;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      padding: 8px 24px;
    }

    .header-container {
      max-width: 1540px;
      width: 95%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-home {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: #1e293b;
      border: 1px solid #3b82f6;
      color: #60a5fa;
      text-decoration: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      transition: all 0.2s;
    }
    .btn-home:hover {
      background: rgba(59, 130, 246, 0.3);
      color: #93c5fd;
    }

    .map-title {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .map-badge {
      font-size: 11px;
      background: #2563eb;
      color: #fff;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ctrl-btn {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #475569;
      background: #1e293b;
      color: #cbd5e1;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .ctrl-btn:hover {
      background: #334155;
      color: #ffffff;
      border-color: #64748b;
    }
    .ctrl-btn-sim {
      background: #064e3b;
      border-color: #059669;
      color: #a7f3d0;
      font-weight: 700;
    }
    .ctrl-btn-sim:hover {
      background: #047857;
      color: #ecfdf5;
    }

    /* Main Container */
    .study-main-wrapper {
      width: 95%;
      max-width: 1540px;
      margin: 14px auto 50px auto;
      padding: 28px 36px 44px 36px;
      background: var(--surface);
      border-radius: 10px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      flex: 1;
    }

    .page-header {
      margin-bottom: 24px;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 12px;
    }
    .page-header h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text);
    }
    .page-header p {
      font-size: 13.5px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .section-block {
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1.5px solid var(--border);
      padding-bottom: 6px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 13.5px;
    }
    th, td {
      padding: 10px 14px;
      border: 1px solid var(--border);
      text-align: left;
    }
    th {
      background: var(--surface-elevated);
      color: var(--text);
      font-weight: 700;
    }
    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.02);
    }
    body.dark-theme tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    }

    /* Roadmap Grid */
    .roadmap-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .stage-card {
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      position: relative;
    }
    .stage-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 4px; height: 100%;
      background: var(--primary);
      border-radius: var(--radius) 0 0 var(--radius);
    }
    .stage-num {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .stage-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 8px;
    }
    .stage-desc {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.55;
      margin-bottom: 12px;
    }
    .stage-list {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 12.5px;
    }
    .stage-list li {
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }

    /* Folder Catalog Grid */
    .folder-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 16px;
    }
    .folder-card {
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 18px;
    }
    .folder-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 6px;
    }
    .folder-desc {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 10px;
    }
    .folder-links {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .folder-link-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 12.5px;
      text-decoration: none;
      color: var(--text-body);
      font-weight: 600;
      transition: all 0.15s;
    }
    .folder-link-item:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: rgba(37, 99, 235, 0.05);
    }

    /* Callout Box */
    .tip-box {
      background: rgba(14, 165, 233, 0.08);
      border: 1.5px solid var(--accent);
      border-radius: var(--radius);
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .tip-box h4 {
      color: var(--accent);
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .tip-box p {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.55;
    }

    @media print {
      header, .ctrl-btn { display: none !important; }
      .study-main-wrapper { max-width: none !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
      body { background: #fff !important; color: #000 !important; }
    }
  </style>
</head>
<body class="dark-theme">

  <header>
    <div class="header-container">
      <div class="header-left">
        <a href="index.html" class="btn-home">🏠 Study Hub</a>
        <div class="map-title">
          Library Index & Master Study Roadmap
          <span class="map-badge">Official Standard</span>
        </div>
      </div>
      <div class="header-right">
        <a href="05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html" class="ctrl-btn ctrl-btn-sim">🎯 Official 40Q Simulator</a>
        <a href="study_map.txt" target="_blank" class="ctrl-btn">📄 Plain Text (.txt)</a>
        <button class="ctrl-btn" id="theme-btn" onclick="toggleTheme()">☀️ Light</button>
        <button class="ctrl-btn" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
  </header>

  <main class="study-main-wrapper">
    <div class="page-header">
      <h1>Master Library Architecture, Exam Blueprint & Study Strategy</h1>
      <p>Authoritative syllabus breakdown, chapter weights, study roadmap, and catalog for the ISTQB® CTFL v4.0.1 examination.</p>
    </div>

    <div class="tip-box">
      <h4>💡 Primary Exam Standard: ISTQB® CTFL v4.0.1</h4>
      <p>
        The official examination contains exactly <strong>40 multiple-choice questions</strong> to be answered in <strong>60 minutes</strong> (90 seconds per question).
        The passing threshold is <strong>65% (26 out of 40 correct)</strong>. There is no penalty for incorrect answers.
      </p>
    </div>

    <!-- Section 1: Exam Weighting -->
    <div class="section-block">
      <h2 class="section-title">📊 1. Official Chapter Question Allocation & Cognitive K-Levels</h2>
      <table>
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Title</th>
            <th>Question Allocation</th>
            <th>Cognitive Levels</th>
            <th>Recommended Study Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Chapter 01</strong></td>
            <td>Fundamentals of Testing</td>
            <td><strong>8 Questions (20%)</strong></td>
            <td>K1 (Remember), K2 (Understand)</td>
            <td>7 Testing Principles, Error vs Defect vs Failure, Whole Team Approach, Testware Traceability</td>
          </tr>
          <tr>
            <td><strong>Chapter 02</strong></td>
            <td>Testing Throughout the SDLC</td>
            <td><strong>6 Questions (15%)</strong></td>
            <td>K1 (Remember), K2 (Understand)</td>
            <td>V-Model vs Agile, Shift-Left, TDD/ATDD/BDD, 5 Test Levels, 4 Test Types, Maintenance Testing</td>
          </tr>
          <tr>
            <td><strong>Chapter 03</strong></td>
            <td>Static Testing</td>
            <td><strong>4 Questions (10%)</strong></td>
            <td>K1 (Remember), K2 (Understand)</td>
            <td>Static vs Dynamic, Formal Review Process (ISO/IEC 20246), 6 Review Roles, 4 Review Types</td>
          </tr>
          <tr style="background: rgba(37, 99, 235, 0.08);">
            <td><strong>Chapter 04</strong></td>
            <td>Test Analysis & Design</td>
            <td><strong>11 Questions (27.5%)</strong> ⭐</td>
            <td>K1, K2, <strong>K3 (Apply)</strong></td>
            <td>Equivalence Partitioning, BVA (2-point vs 3-point), Decision Tables, State Transitions, Statement & Branch Coverage</td>
          </tr>
          <tr style="background: rgba(37, 99, 235, 0.08);">
            <td><strong>Chapter 05</strong></td>
            <td>Managing the Test Activities</td>
            <td><strong>9 Questions (22.5%)</strong> ⭐</td>
            <td>K1, K2, <strong>K3 (Apply)</strong></td>
            <td>Risk Management (Likelihood x Impact), Test Pyramid, Testing Quadrants, Metrics, Defect Reports</td>
          </tr>
          <tr>
            <td><strong>Chapter 06</strong></td>
            <td>Test Tools</td>
            <td><strong>2 Questions (5%)</strong></td>
            <td>K1 (Remember), K2 (Understand)</td>
            <td>Tool Classification, Spreadsheet Principle, Automation Benefits & Risks, Pilot Projects</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 13px; color: var(--text-muted);">
        ⭐ <em>High-Yield Notice: Chapters 4 and 5 together represent <strong>50% of the entire exam</strong> (20 out of 40 questions). Master these two chapters thoroughly to ensure passing.</em>
      </p>
    </div>

    <!-- Section 2: 4-Stage Study Roadmap -->
    <div class="section-block">
      <h2 class="section-title">🗺️ 2. Recommended 4-Stage Study Roadmap</h2>
      <div class="roadmap-grid">
        <div class="stage-card">
          <div class="stage-num">Stage 01</div>
          <div class="stage-title">Foundations & Lifecycle</div>
          <div class="stage-desc">Build absolute clarity on foundational definitions, terminology, and development integration.</div>
          <ul class="stage-list">
            <li>✓ Read Chapter 01 & Chapter 02 Study Guides</li>
            <li>✓ Memorize the 7 Principles & Error/Defect/Failure</li>
            <li>✓ Review Test Levels, Types & Shift-Left approach</li>
          </ul>
        </div>

        <div class="stage-card">
          <div class="stage-num">Stage 02</div>
          <div class="stage-title">Static & Dynamic Design (K3)</div>
          <div class="stage-desc">Master review procedures and all high-yield calculation techniques.</div>
          <ul class="stage-list">
            <li>✓ Read Chapter 03 & Chapter 04 Study Guides</li>
            <li>✓ Practice 2-point vs 3-point Boundary Value Analysis</li>
            <li>✓ Build Decision Tables & State Transition tables</li>
            <li>✓ Calculate Statement Coverage & Branch Coverage</li>
          </ul>
        </div>

        <div class="stage-card">
          <div class="stage-num">Stage 03</div>
          <div class="stage-title">Management, Risk & Tools</div>
          <div class="stage-desc">Learn test leadership, metrics, risk analysis, and automation factors.</div>
          <ul class="stage-list">
            <li>✓ Read Chapter 05 & Chapter 06 Study Guides</li>
            <li>✓ Understand Risk Matrix (Likelihood x Impact)</li>
            <li>✓ Study Test Pyramid & Agile Testing Quadrants</li>
            <li>✓ Memorize Automation Benefits & Risks</li>
          </ul>
        </div>

        <div class="stage-card">
          <div class="stage-num">Stage 04</div>
          <div class="stage-title">Mock Exams & Calibration</div>
          <div class="stage-desc">Simulate realistic testing conditions with timed mock tests.</div>
          <ul class="stage-list">
            <li>✓ Practice all 71 questions in the Question Bank</li>
            <li>✓ Complete multiple runs of the 40Q Exam Simulator</li>
            <li>✓ Target >= 85% score (34/40) before taking the real exam</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Section 3: Master Library & Resource Catalog -->
    <div class="section-block">
      <h2 class="section-title">📚 3. Complete Library & Resource Catalog</h2>
      <div class="folder-grid">
        <div class="folder-card">
          <div class="folder-header">📕 Official Syllabus Standard</div>
          <div class="folder-desc">Primary authoritative syllabus standard directly from ISTQB.</div>
          <div class="folder-links">
            <a href="01_Official_Syllabus/ISTQB_CTFL_Syllabus_v4.0.1.pdf" target="_blank" class="folder-link-item">
              <span>ISTQB_CTFL_Syllabus_v4.0.1.pdf (78 pages)</span> <span>↗</span>
            </a>
          </div>
        </div>

        <div class="folder-card">
          <div class="folder-header">🇬🇧 English Study Guides (Chapters 01 – 06)</div>
          <div class="folder-desc">Full interactive web guides for all 6 chapters with deep dive content and quiz answers.</div>
          <div class="folder-links">
            <a href="02_English_Study_Guides_HTML/istqb_ch1_study_guide.html" class="folder-link-item"><span>Ch 1: Fundamentals of Testing</span> <span>→</span></a>
            <a href="02_English_Study_Guides_HTML/istqb_ch2_study_guide.html" class="folder-link-item"><span>Ch 2: Testing Throughout SDLC</span> <span>→</span></a>
            <a href="02_English_Study_Guides_HTML/istqb_ch3_study_guide.html" class="folder-link-item"><span>Ch 3: Static Testing</span> <span>→</span></a>
            <a href="02_English_Study_Guides_HTML/istqb_ch4_study_guide.html" class="folder-link-item"><span>Ch 4: Test Analysis & Design</span> <span>→</span></a>
            <a href="02_English_Study_Guides_HTML/istqb_ch5_study_guide.html" class="folder-link-item"><span>Ch 5: Managing Test Activities</span> <span>→</span></a>
            <a href="02_English_Study_Guides_HTML/istqb_ch6_study_guide.html" class="folder-link-item"><span>Ch 6: Test Tools</span> <span>→</span></a>
          </div>
        </div>

        <div class="folder-card">
          <div class="folder-header">🇱🇰 Sinhala Study Guides (පරිච්ඡේද 01 – 06)</div>
          <div class="folder-desc">සිංහල අධ්‍යයන මාර්ගෝපදේශ සහ විභාග ප්‍රශ්නාවලි (Audited technical Sinhala terminology).</div>
          <div class="folder-links">
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch1_study_guide_sinhala.html" class="folder-link-item"><span>Ch 1: පරීක්ෂාවේ මූලධර්ම</span> <span>→</span></a>
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch2_study_guide_sinhala.html" class="folder-link-item"><span>Ch 2: SDLC තුළ පරීක්ෂාව</span> <span>→</span></a>
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch3_study_guide_sinhala.html" class="folder-link-item"><span>Ch 3: ස්ථිතික පරීක්ෂාව</span> <span>→</span></a>
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch4_study_guide_sinhala.html" class="folder-link-item"><span>Ch 4: විශ්ලේෂණය සහ සැලසුම්කරණය</span> <span>→</span></a>
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch5_study_guide_sinhala.html" class="folder-link-item"><span>Ch 5: පරීක්ෂණ කළමනාකරණය</span> <span>→</span></a>
            <a href="03_Sinhala_Study_Guides_HTML/istqb_ch6_study_guide_sinhala.html" class="folder-link-item"><span>Ch 6: පරීක්ෂණ මෙවලම්</span> <span>→</span></a>
          </div>
        </div>

        <div class="folder-card">
          <div class="folder-header">🎯 Exam Simulator & Practice Question Bank</div>
          <div class="folder-desc">Full 71+ master question repository, live scoring exam simulator, and offline reference.</div>
          <div class="folder-links">
            <a href="05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html" class="folder-link-item" style="color:#10b981; font-weight:700;"><span>🎯 Official 40Q Exam Simulator</span> <span>→</span></a>
            <a href="05_Practice_Questions_and_Summaries/question_bank.html" class="folder-link-item"><span>📝 71+ Question Bank (Interactive Web App)</span> <span>→</span></a>
            <a href="question_bank.txt" target="_blank" class="folder-link-item"><span>📄 Offline Master Question Bank (.txt)</span> <span>↗</span></a>
          </div>
        </div>

        <div class="folder-card" style="grid-column: 1 / -1;">
          <div class="folder-header">📄 Ink-Friendly Printable PDFs (Chapters 01 – 06)</div>
          <div class="folder-desc">Standard A4 printable PDFs with ink-friendly layouts and calibrated margins (6 English & 6 Sinhala guides).</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;">
            <div class="folder-links">
              <strong style="font-size: 12px; color: var(--accent); margin-bottom: 2px;">🇬🇧 English Printable Guides:</strong>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_01_Fundamentals_of_Testing_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 1: Fundamentals of Testing</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_02_Testing_Throughout_SDLC_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 2: Testing Throughout SDLC</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_03_Static_Testing_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 3: Static Testing</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_04_Test_Analysis_and_Design_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 4: Test Analysis & Design</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_05_Managing_Test_Activities_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 5: Managing Test Activities</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_06_Test_Tools_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 6: Test Tools</span> <span>↗</span></a>
            </div>
            <div class="folder-links">
              <strong style="font-size: 12px; color: var(--accent); margin-bottom: 2px;">🇱🇰 සිංහල අධ්‍යයන මාර්ගෝපදේශ (PDF):</strong>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_01_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 1: පරීක්ෂාවේ මූලධර්ම</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_02_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 2: SDLC තුළ පරීක්ෂාව</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_03_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 3: ස්ථිතික පරීක්ෂාව</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_04_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 4: විශ්ලේෂණය සහ සැලසුම්කරණය</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_05_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 5: පරීක්ෂණ කළමනාකරණය</span> <span>↗</span></a>
              <a href="04_Printable_PDF_Study_Guides/ISTQB_CTFL_v4.0.1_Chapter_06_Sinhala_Study_Guide.pdf" target="_blank" class="folder-link-item"><span>Ch 6: පරීක්ෂණ මෙවලම්</span> <span>↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    function toggleTheme() {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('istqb_reading_theme', isDark ? 'dark' : 'light');
      document.getElementById('theme-btn').textContent = isDark ? '☀️ Light' : '🌙 Dark';
    }

    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('istqb_reading_theme');
      if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.getElementById('theme-btn').textContent = '🌙 Dark';
      } else {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-btn').textContent = '☀️ Light';
      }
    });
  </script>
</body>
</html>
`;

const studyMapHtmlPath = path.join(rootDir, 'study_map.html');
fs.writeFileSync(studyMapHtmlPath, studyMapHtml, 'utf8');
console.log('✓ Created study_map.html');
