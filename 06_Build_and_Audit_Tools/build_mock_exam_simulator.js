/**
 * ISTQB® CTFL v4.0.1 Interactive Mock Exam Simulator Generator
 * Builds a standalone, publication-grade, bilingual 40-question exam simulator.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const qBankPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'question_bank.json');
const outHtmlPath = path.join(rootDir, '05_Practice_Questions_and_Summaries', 'istqb_mock_exam_simulator.html');

const questions = JSON.parse(fs.readFileSync(qBankPath, 'utf8'));

const simulatorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISTQB® CTFL v4.0.1 Official Mock Exam Simulator | Interactive 40-Question Practice</title>
  <style>
    :root {
      --bg: #090d16;
      --surface: #131d31;
      --surface-elevated: #1a273e;
      --border: #22324e;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #38bdf8;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --text-body: #e2e8f0;
      --radius: 8px;
    }

    body.light-theme {
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-elevated: #f1f5f9;
      --border: #cbd5e1;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --accent: #0284c7;
      --success: #059669;
      --warning: #d97706;
      --danger: #dc2626;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-body: #1e293b;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Top Sticky Header */
    header {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: var(--surface);
      border-bottom: 2px solid var(--primary);
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      padding: 10px 20px;
    }

    .header-container {
      max-width: 1400px;
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
      gap: 14px;
    }

    .btn-home {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: rgba(37, 99, 235, 0.15);
      border: 1px solid var(--primary);
      color: var(--accent);
      text-decoration: none;
      border-radius: var(--radius);
      font-size: 13px;
      font-weight: 700;
      transition: all 0.2s;
    }
    .btn-home:hover {
      background: rgba(37, 99, 235, 0.3);
      color: #ffffff;
    }

    .exam-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--text);
    }
    .exam-badge {
      font-size: 11px;
      background: var(--primary);
      color: #fff;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
      margin-left: 6px;
      text-transform: uppercase;
    }

    .header-center {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    /* Timer Widget */
    .timer-widget {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      padding: 6px 14px;
      border-radius: var(--radius);
      font-weight: 800;
      font-size: 16px;
      letter-spacing: 0.5px;
      color: var(--text);
    }
    .timer-widget.warning {
      border-color: var(--warning);
      color: var(--warning);
      animation: pulse 1.5s infinite;
    }
    .timer-widget.danger {
      border-color: var(--danger);
      color: var(--danger);
      animation: pulse 0.8s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ctrl-btn {
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 6px 12px;
      border-radius: var(--radius);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }
    .ctrl-btn:hover {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }
    .ctrl-btn.active {
      background: var(--primary);
      color: #fff;
    }
    .btn-submit {
      background: var(--success);
      color: #ffffff;
      border-color: var(--success);
      font-weight: 700;
    }
    .btn-submit:hover {
      background: #059669;
      border-color: #059669;
    }

    /* Main Layout */
    .main-container {
      max-width: 1400px;
      margin: 20px auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 24px;
      flex: 1;
      width: 100%;
    }

    /* Sidebar / Question Palette */
    .palette-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: fit-content;
      position: sticky;
      top: 80px;
    }

    .palette-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
    }
    .palette-title {
      font-size: 14px;
      font-weight: 700;
    }
    .palette-stats {
      font-size: 12px;
      color: var(--text-muted);
    }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }

    .q-pill {
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text);
      cursor: pointer;
      position: relative;
      transition: all 0.15s ease;
    }
    .q-pill:hover {
      border-color: var(--primary);
      transform: translateY(-1px);
    }
    .q-pill.current {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent);
    }
    .q-pill.answered {
      background: rgba(16, 185, 129, 0.2);
      border-color: var(--success);
      color: var(--success);
    }
    body.light-theme .q-pill.answered {
      background: #d1fae5;
      color: #065f46;
    }
    .q-pill.flagged::after {
      content: "🚩";
      position: absolute;
      top: -6px;
      right: -4px;
      font-size: 10px;
    }

    .palette-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 11.5px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
    .dot-ans { background: var(--success); }
    .dot-unans { background: var(--surface-elevated); border: 1px solid var(--border); }
    .dot-flag { background: var(--warning); }
    .dot-curr { background: var(--accent); }

    /* Question Workspace */
    .workspace-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }

    .q-meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
    }

    .q-badges {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .badge {
      font-size: 12px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 4px;
    }
    .badge-ch {
      background: #1e3a8a;
      color: #93c5fd;
      border: 1px solid #3b82f6;
    }
    .badge-lo {
      background: #0f2b5c;
      color: #60a5fa;
      border: 1px solid #2563eb;
    }
    .badge-k1 { background: #0f2b5c; color: #93c5fd; border: 1px solid #3b82f6; }
    .badge-k2 { background: #2e1065; color: #d8b4fe; border: 1px solid #8b5cf6; }
    .badge-k3 { background: #431407; color: #fdba74; border: 1px solid #f97316; }

    .q-tools {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-flag {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: var(--radius);
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
    }
    .btn-flag:hover {
      color: var(--warning);
      border-color: var(--warning);
    }
    .btn-flag.active {
      background: rgba(245, 158, 11, 0.15);
      border-color: var(--warning);
      color: var(--warning);
    }

    /* Question Stem */
    .q-stem {
      font-size: 16px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.6;
    }
    .q-stem-si {
      font-size: 14.5px;
      color: var(--accent);
      margin-top: 8px;
      font-weight: 500;
      line-height: 1.65;
    }

    /* Options List */
    .options-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 8px;
    }

    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }
    .option-item:hover {
      border-color: var(--primary);
      background: rgba(37, 99, 235, 0.12);
    }
    .option-item.selected {
      border-color: var(--primary);
      background: rgba(37, 99, 235, 0.22);
      box-shadow: 0 0 0 1px var(--primary);
    }
    body.light-theme .option-item.selected {
      background: #eff6ff;
    }

    .option-radio {
      margin-top: 4px;
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
      cursor: pointer;
    }

    .option-text-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .option-text-en {
      font-size: 14px;
      color: var(--text-body);
      line-height: 1.5;
    }
    .option-text-si {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* Navigation Action Buttons */
    .nav-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      padding-top: 18px;
      margin-top: 10px;
    }

    .btn-nav {
      padding: 8px 18px;
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: var(--radius);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .btn-nav:hover:not(:disabled) {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }
    .btn-nav:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* Immediate Feedback Box */
    .instant-feedback-box {
      background: #0b1222;
      border: 1.5px dashed var(--accent);
      border-radius: var(--radius);
      padding: 14px 18px;
      margin-top: 14px;
      display: none;
    }
    body.light-theme .instant-feedback-box {
      background: #f0fdf4;
      border-color: var(--success);
    }
    .feedback-ans {
      font-size: 14px;
      font-weight: 800;
      color: var(--success);
      margin-bottom: 6px;
    }
    .feedback-rat {
      font-size: 13.5px;
      color: var(--text-body);
      line-height: 1.6;
    }

    /* Results Dashboard View */
    .results-view {
      display: none;
      grid-column: 1 / -1;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.35);
    }

    .score-banner {
      text-align: center;
      padding: 30px 20px;
      border-radius: var(--radius);
      margin-bottom: 28px;
    }
    .score-banner.pass {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%);
      border: 2px solid var(--success);
    }
    .score-banner.fail {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.25) 100%);
      border: 2px solid var(--danger);
    }
    .verdict-title {
      font-size: 32px;
      font-weight: 900;
      margin-bottom: 6px;
    }
    .score-banner.pass .verdict-title { color: var(--success); }
    .score-banner.fail .verdict-title { color: var(--danger); }
    .score-number {
      font-size: 44px;
      font-weight: 900;
      color: var(--text);
    }
    .score-sub {
      font-size: 15px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Breakdown Grids */
    .breakdown-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }

    .stat-card {
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px;
    }
    .stat-card-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
      color: var(--accent);
      border-bottom: 1px solid var(--border);
      padding-bottom: 6px;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 13.5px;
    }
    .stat-bar-outer {
      flex: 1;
      height: 8px;
      background: var(--bg);
      border-radius: 999px;
      margin: 0 12px;
      overflow: hidden;
    }
    .stat-bar-inner {
      height: 100%;
      background: var(--primary);
      border-radius: 999px;
      transition: width 0.4s ease;
    }

    /* Review Section */
    .review-filter-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 10px;
    }
    .review-filter-btns {
      display: flex;
      gap: 8px;
    }
    .review-item {
      background: var(--surface-elevated);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      margin-bottom: 14px;
    }
    .review-item.correct { border-left: 5px solid var(--success); }
    .review-item.wrong { border-left: 5px solid var(--danger); }
    .review-item.unanswered { border-left: 5px solid var(--warning); }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 99999;
    }
    .modal-box {
      background: var(--surface);
      border: 2px solid var(--border);
      border-radius: var(--radius);
      padding: 26px;
      max-width: 440px;
      width: 90%;
      text-align: center;
    }

    @media (max-width: 900px) {
      .main-container {
        grid-template-columns: 1fr;
      }
      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Sticky Top Header -->
  <header>
    <div class="header-container">
      <div class="header-left">
        <a href="../index.html" class="btn-home">🏠 Study Hub</a>
        <div class="exam-title">
          ISTQB® CTFL v4.0.1 Exam Simulator
          <span class="exam-badge" id="exam-mode-badge">Official 40Q</span>
        </div>
      </div>

      <div class="header-center">
        <div class="timer-widget" id="timer-display">
          ⏱️ <span id="time-left">60:00</span>
        </div>
      </div>

      <div class="header-right">
        <button class="ctrl-btn" id="btn-toggle-lang" onclick="toggleLanguage()">🇱🇰 සිංහල / EN</button>
        <button class="ctrl-btn" id="btn-toggle-theme" onclick="toggleTheme()">🌙 Theme</button>
        <button class="ctrl-btn btn-submit" onclick="confirmSubmit()">🏁 Submit Exam</button>
      </div>
    </div>
  </header>

  <!-- Main Exam Content -->
  <main class="main-container" id="exam-view">
    <!-- Left Question Palette -->
    <aside class="palette-card">
      <div class="palette-header">
        <span class="palette-title">Question Palette</span>
        <span class="palette-stats" id="palette-progress">0 of 40 Answered</span>
      </div>

      <div class="palette-grid" id="palette-grid">
        <!-- 40 Question buttons generated by JS -->
      </div>

      <div class="palette-legend">
        <div class="legend-item"><span class="legend-dot dot-ans"></span> Answered</div>
        <div class="legend-item"><span class="legend-dot dot-unans"></span> Unanswered</div>
        <div class="legend-item"><span class="legend-dot dot-flag"></span> Flagged</div>
        <div class="legend-item"><span class="legend-dot dot-curr"></span> Current</div>
      </div>

      <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">
        <button class="ctrl-btn" style="width: 100%; justify-content: center;" onclick="resetExamWithRandom40()">🔄 New Randomized 40Q Set</button>
      </div>
    </aside>

    <!-- Right Question Workspace -->
    <section class="workspace-card" id="workspace-card">
      <div class="q-meta-bar">
        <div class="q-badges">
          <span class="badge badge-ch" id="q-ch-badge">Chapter 01</span>
          <span class="badge badge-lo" id="q-lo-badge">FL-1.1.1</span>
          <span class="badge badge-k2" id="q-k-badge">K2 (Understand)</span>
        </div>
        <div class="q-tools">
          <button class="btn-flag" id="btn-flag-q" onclick="toggleFlagCurrentQuestion()">🚩 Mark for Review</button>
        </div>
      </div>

      <div class="q-stem" id="q-stem-en">Question text will appear here...</div>
      <div class="q-stem-si" id="q-stem-si" style="display: none;"></div>

      <div class="options-list" id="options-container">
        <!-- Options generated by JS -->
      </div>

      <!-- Instant Feedback for Practice Mode -->
      <div class="instant-feedback-box" id="feedback-box">
        <div class="feedback-ans" id="feedback-ans"></div>
        <div class="feedback-rat" id="feedback-rat"></div>
      </div>

      <div class="nav-actions">
        <button class="btn-nav" id="btn-prev" onclick="prevQuestion()">◀ Previous</button>
        <button class="ctrl-btn" id="btn-check-instant" style="display: none;" onclick="checkInstantAnswer()">👁️ Check Answer</button>
        <button class="btn-nav" id="btn-next" onclick="nextQuestion()">Next ▶</button>
      </div>
    </section>
  </main>

  <!-- Results Dashboard View -->
  <section class="main-container" id="results-container" style="display: none;">
    <div class="results-view" id="results-view" style="display: block;">
      <div class="score-banner" id="score-banner">
        <div class="verdict-title" id="verdict-title">EXAMINATION PASSED</div>
        <div class="score-number" id="score-number">34 / 40 (85%)</div>
        <div class="score-sub" id="score-sub">Passing threshold is 65% (26 / 40). Official ISTQB® CTFL Standard.</div>
      </div>

      <div class="breakdown-grid">
        <!-- Chapter Breakdown -->
        <div class="stat-card">
          <div class="stat-card-title">Performance by Chapter</div>
          <div id="chapter-breakdown-list"></div>
        </div>

        <!-- K-Level Breakdown -->
        <div class="stat-card">
          <div class="stat-card-title">Performance by Cognitive K-Level</div>
          <div id="klevel-breakdown-list"></div>
        </div>
      </div>

      <div class="review-filter-bar">
        <h3 style="font-size: 16px; font-weight: 800;">Detailed Question Analysis & Rationales</h3>
        <div class="review-filter-btns">
          <button class="ctrl-btn active" onclick="filterReview('all', this)">All (40)</button>
          <button class="ctrl-btn" onclick="filterReview('wrong', this)">Missed</button>
          <button class="ctrl-btn" onclick="filterReview('flagged', this)">Flagged</button>
        </div>
      </div>

      <div id="review-questions-list"></div>

      <div style="margin-top: 30px; display: flex; justify-content: center; gap: 14px;">
        <button class="ctrl-btn btn-submit" style="padding: 10px 24px; font-size: 14px;" onclick="resetExamWithRandom40()">🔄 Take Another 40Q Mock Exam</button>
        <button class="ctrl-btn" style="padding: 10px 24px; font-size: 14px;" onclick="window.print()">🖨️ Print Score Report</button>
      </div>
    </div>
  </section>

  <!-- Submit Confirmation Modal -->
  <div class="modal-overlay" id="submit-modal">
    <div class="modal-box">
      <h3 style="font-size: 18px; margin-bottom: 12px;">Submit Examination?</h3>
      <p id="modal-summary-text" style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">
        You have answered 35 out of 40 questions.
      </p>
      <div style="display: flex; justify-content: center; gap: 10px;">
        <button class="ctrl-btn" onclick="closeSubmitModal()">Cancel</button>
        <button class="ctrl-btn btn-submit" onclick="finishExam()">Confirm & Score</button>
      </div>
    </div>
  </div>

  <!-- EMBEDDED QUESTION BANK -->
  <script>
    const ALL_QUESTIONS = ${JSON.stringify(questions)};
    
    // Official ISTQB Chapter Distribution for 40 questions
    const CHAPTER_DIST = { 1: 8, 2: 6, 3: 4, 4: 11, 5: 9, 6: 2 };

    let currentExam = [];
    let currentIndex = 0;
    let userAnswers = {};
    let flaggedQuestions = new Set();
    let timeLeft = 60 * 60; // 60 minutes
    let timerInterval = null;
    let isSinhalaMode = false;
    let isSubmitted = false;

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function generate40ExamSet() {
      const examSet = [];
      for (let ch = 1; ch <= 6; ch++) {
        const needed = CHAPTER_DIST[ch];
        const chQuestions = ALL_QUESTIONS.filter(q => q.chapter === ch);
        const shuffled = shuffle(chQuestions);
        const selected = shuffled.slice(0, needed);
        examSet.push(...selected);
      }
      return shuffle(examSet);
    }

    function initExam() {
      currentExam = generate40ExamSet();
      currentIndex = 0;
      userAnswers = {};
      flaggedQuestions.clear();
      timeLeft = 60 * 60;
      isSubmitted = false;

      document.getElementById('exam-view').style.display = 'grid';
      document.getElementById('results-container').style.display = 'none';

      renderPalette();
      loadQuestion(0);
      startTimer();
    }

    function renderPalette() {
      const grid = document.getElementById('palette-grid');
      grid.innerHTML = '';
      currentExam.forEach((q, i) => {
        const pill = document.createElement('button');
        pill.className = 'q-pill' + (i === currentIndex ? ' current' : '');
        pill.textContent = i + 1;
        pill.id = 'pill-' + i;
        if (userAnswers[i]) pill.classList.add('answered');
        if (flaggedQuestions.has(i)) pill.classList.add('flagged');
        pill.onclick = () => loadQuestion(i);
        grid.appendChild(pill);
      });
      updatePaletteProgress();
    }

    function updatePaletteProgress() {
      const answeredCount = Object.keys(userAnswers).length;
      document.getElementById('palette-progress').textContent = \`\${answeredCount} of 40 Answered\`;
    }

    function loadQuestion(idx) {
      currentIndex = idx;
      const q = currentExam[idx];

      // Update current pill in palette
      document.querySelectorAll('.q-pill').forEach((p, i) => {
        p.classList.toggle('current', i === idx);
      });

      // Badges
      document.getElementById('q-ch-badge').textContent = \`Chapter 0\${q.chapter}\`;
      document.getElementById('q-lo-badge').textContent = q.lo;
      
      const kBadge = document.getElementById('q-k-badge');
      kBadge.textContent = q.kLevel;
      kBadge.className = 'badge ' + (q.kLevel === 'K1' ? 'badge-k1' : q.kLevel === 'K3' ? 'badge-k3' : 'badge-k2');

      // Flag
      const flagBtn = document.getElementById('btn-flag-q');
      flagBtn.classList.toggle('active', flaggedQuestions.has(idx));
      flagBtn.innerHTML = flaggedQuestions.has(idx) ? '🚩 Flagged' : '🚩 Mark for Review';

      // Stem
      document.getElementById('q-stem-en').textContent = \`Question \${idx + 1} of 40: \${q.questionEn}\`;
      const siStem = document.getElementById('q-stem-si');
      if (isSinhalaMode && q.questionSi) {
        siStem.style.display = 'block';
        siStem.textContent = q.questionSi;
      } else {
        siStem.style.display = 'none';
      }

      // Options
      const optContainer = document.getElementById('options-container');
      optContainer.innerHTML = '';

      q.optionsEn.forEach((optTextEn, optIdx) => {
        const optLetter = ['A', 'B', 'C', 'D'][optIdx];
        const optTextSi = q.optionsSi ? q.optionsSi[optIdx] : '';

        const item = document.createElement('div');
        item.className = 'option-item' + (userAnswers[idx] === optLetter ? ' selected' : '');
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'opt-' + idx;
        radio.className = 'option-radio';
        radio.checked = userAnswers[idx] === optLetter;

        const wrapper = document.createElement('div');
        wrapper.className = 'option-text-wrapper';

        const enDiv = document.createElement('div');
        enDiv.className = 'option-text-en';
        enDiv.textContent = optTextEn;
        wrapper.appendChild(enDiv);

        if (isSinhalaMode && optTextSi) {
          const siDiv = document.createElement('div');
          siDiv.className = 'option-text-si';
          siDiv.textContent = optTextSi;
          wrapper.appendChild(siDiv);
        }

        item.appendChild(radio);
        item.appendChild(wrapper);

        item.onclick = () => {
          userAnswers[idx] = optLetter;
          document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
          item.classList.add('selected');
          radio.checked = true;
          
          const pill = document.getElementById('pill-' + idx);
          if (pill) pill.classList.add('answered');
          updatePaletteProgress();
        };

        optContainer.appendChild(item);
      });

      // Prev / Next button state
      document.getElementById('btn-prev').disabled = idx === 0;
      document.getElementById('btn-next').disabled = idx === currentExam.length - 1;
      
      // Hide feedback box in exam mode
      document.getElementById('feedback-box').style.display = 'none';
    }

    function prevQuestion() {
      if (currentIndex > 0) loadQuestion(currentIndex - 1);
    }

    function nextQuestion() {
      if (currentIndex < currentExam.length - 1) loadQuestion(currentIndex + 1);
    }

    function toggleFlagCurrentQuestion() {
      if (flaggedQuestions.has(currentIndex)) {
        flaggedQuestions.delete(currentIndex);
      } else {
        flaggedQuestions.add(currentIndex);
      }
      const pill = document.getElementById('pill-' + currentIndex);
      if (pill) pill.classList.toggle('flagged', flaggedQuestions.has(currentIndex));
      loadQuestion(currentIndex);
    }

    function toggleLanguage() {
      isSinhalaMode = !isSinhalaMode;
      const btn = document.getElementById('btn-toggle-lang');
      btn.innerHTML = isSinhalaMode ? '🇬🇧 English Only' : '🇱🇰 සිංහල / EN';
      loadQuestion(currentIndex);
    }

    function toggleTheme() {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('istqb_reading_theme', isLight ? 'light' : 'dark');
      document.getElementById('btn-toggle-theme').innerHTML = isLight ? '☀️ Light' : '🌙 Theme';
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          finishExam();
          return;
        }
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const display = document.getElementById('time-left');
        display.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;

        const widget = document.getElementById('timer-display');
        if (timeLeft <= 300) {
          widget.className = 'timer-widget danger';
        } else if (timeLeft <= 600) {
          widget.className = 'timer-widget warning';
        } else {
          widget.className = 'timer-widget';
        }
      }, 1000);
    }

    function confirmSubmit() {
      const answered = Object.keys(userAnswers).length;
      const unans = 40 - answered;
      const flagged = flaggedQuestions.size;
      document.getElementById('modal-summary-text').textContent = 
        \`You have answered \${answered} of 40 questions (\${unans} unanswered). \${flagged} flagged for review. Are you ready to submit and calculate your official score?\`;
      document.getElementById('submit-modal').style.display = 'flex';
    }

    function closeSubmitModal() {
      document.getElementById('submit-modal').style.display = 'none';
    }

    function finishExam() {
      closeSubmitModal();
      clearInterval(timerInterval);
      isSubmitted = true;

      // Calculate score
      let score = 0;
      const chStats = { 1: { c: 0, t: 0 }, 2: { c: 0, t: 0 }, 3: { c: 0, t: 0 }, 4: { c: 0, t: 0 }, 5: { c: 0, t: 0 }, 6: { c: 0, t: 0 } };
      const kStats = { 'K1': { c: 0, t: 0 }, 'K2': { c: 0, t: 0 }, 'K3': { c: 0, t: 0 } };

      currentExam.forEach((q, idx) => {
        const userAns = userAnswers[idx];
        const isCorrect = userAns === q.answer;
        if (isCorrect) score++;

        chStats[q.chapter].t++;
        if (isCorrect) chStats[q.chapter].c++;

        const k = q.kLevel in kStats ? q.kLevel : 'K2';
        kStats[k].t++;
        if (isCorrect) kStats[k].c++;
      });

      const pct = Math.round((score / 40) * 100);
      const isPass = score >= 26;

      // Update Banner
      const banner = document.getElementById('score-banner');
      banner.className = 'score-banner ' + (isPass ? 'pass' : 'fail');
      document.getElementById('verdict-title').textContent = isPass ? '🎉 EXAMINATION PASSED' : '⚠️ EXAMINATION NOT PASSED';
      document.getElementById('score-number').textContent = \`\${score} / 40 (\${pct}%)\`;
      document.getElementById('score-sub').textContent = isPass
        ? 'Congratulations! You achieved the required 65% threshold (26 / 40) for ISTQB® CTFL v4.0.1.'
        : 'The passing mark is 65% (26 / 40). Review your weak areas below and attempt another mock exam!';

      // Render Chapter Breakdown
      const chList = document.getElementById('chapter-breakdown-list');
      chList.innerHTML = '';
      const chNames = [
        'Ch 1: Fundamentals of Testing',
        'Ch 2: Testing Throughout the SDLC',
        'Ch 3: Static Testing',
        'Ch 4: Test Analysis & Design',
        'Ch 5: Managing Test Activities',
        'Ch 6: Test Tools'
      ];
      for (let ch = 1; ch <= 6; ch++) {
        const st = chStats[ch];
        const chPct = st.t > 0 ? Math.round((st.c / st.t) * 100) : 0;
        chList.innerHTML += \`
          <div class="stat-row">
            <span style="font-weight: 600; width: 190px;">\${chNames[ch - 1]}</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-inner" style="width: \${chPct}%; background: \${chPct >= 65 ? 'var(--success)' : 'var(--danger)'};"></div>
            </div>
            <span style="font-weight: 700; width: 60px; text-align: right;">\${st.c}/\${st.t} (\${chPct}%)</span>
          </div>
        \`;
      }

      // Render K-Level Breakdown
      const kList = document.getElementById('klevel-breakdown-list');
      kList.innerHTML = '';
      const kDesc = {
        'K1': 'K1: Remember / Knowledge',
        'K2': 'K2: Understand / Comprehension',
        'K3': 'K3: Apply / Practical Analysis'
      };
      ['K1', 'K2', 'K3'].forEach(k => {
        const st = kStats[k];
        const kPct = st.t > 0 ? Math.round((st.c / st.t) * 100) : 0;
        kList.innerHTML += \`
          <div class="stat-row">
            <span style="font-weight: 600; width: 190px;">\${kDesc[k]}</span>
            <div class="stat-bar-outer">
              <div class="stat-bar-inner" style="width: \${kPct}%; background: \${kPct >= 65 ? 'var(--success)' : 'var(--danger)'};"></div>
            </div>
            <span style="font-weight: 700; width: 60px; text-align: right;">\${st.c}/\${st.t} (\${kPct}%)</span>
          </div>
        \`;
      });

      // Render Review List
      renderReviewList('all');

      document.getElementById('exam-view').style.display = 'none';
      document.getElementById('results-container').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderReviewList(filterType) {
      const list = document.getElementById('review-questions-list');
      list.innerHTML = '';

      currentExam.forEach((q, idx) => {
        const userAns = userAnswers[idx];
        const isCorrect = userAns === q.answer;
        const isFlagged = flaggedQuestions.has(idx);

        if (filterType === 'wrong' && isCorrect) return;
        if (filterType === 'flagged' && !isFlagged) return;

        const item = document.createElement('div');
        item.className = 'review-item ' + (!userAns ? 'unanswered' : isCorrect ? 'correct' : 'wrong');

        item.innerHTML = \`
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-weight: 800;">Q\${idx + 1}</span>
              <span class="badge badge-ch">Ch 0\${q.chapter}</span>
              <span class="badge badge-lo">\${q.lo}</span>
              <span class="badge \${q.kLevel === 'K1' ? 'badge-k1' : q.kLevel === 'K3' ? 'badge-k3' : 'badge-k2'}">\${q.kLevel}</span>
            </div>
            <span style="font-weight: 700; color: \${!userAns ? 'var(--warning)' : isCorrect ? 'var(--success)' : 'var(--danger)'};">
              \${!userAns ? '⚠️ Unanswered' : isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </span>
          </div>
          <div style="font-weight: 700; margin-bottom: 8px;">\${q.questionEn}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; font-size: 13px;">
            <div>Your Answer: <strong>\${userAns ? userAns : 'None'}</strong></div>
            <div>Correct Answer: <strong style="color: var(--success);">\${q.answer}</strong></div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 6px; font-size: 13.5px; border-top: 1px solid var(--border);">
            <strong style="color: var(--accent);">Official Rationale:</strong> \${q.rationaleEn}
          </div>
        \`;
        list.appendChild(item);
      });
    }

    function filterReview(type, btn) {
      document.querySelectorAll('.review-filter-btns button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReviewList(type);
    }

    function resetExamWithRandom40() {
      initExam();
    }

    // Initialize on load
    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('istqb_reading_theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('btn-toggle-theme').innerHTML = '☀️ Light';
      }
      initExam();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(outHtmlPath, simulatorHtml, 'utf8');
console.log(`✓ Successfully created ISTQB Mock Exam Simulator at ${outHtmlPath}`);
