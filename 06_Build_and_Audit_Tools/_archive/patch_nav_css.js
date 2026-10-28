const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'upgrade_navigation_and_anchors.js');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'const comprehensiveInjectedCSS = `';
const endMarker = 'const enhancedNavScript = `';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate markers in upgrade_navigation_and_anchors.js');
  process.exit(1);
}

const newCSS = `const comprehensiveInjectedCSS = \`
/* ================= ISTQB MASTER STUDY DESIGN SYSTEM ================= */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px;
}

h1, h2, h3, h4, .notes-box, .quiz-card, [id^="sec-"] {
  scroll-margin-top: 65px;
}

/* Base Utility Classes for Enhanced Semantics */
.si-question-sub {
  display: inline-block;
  font-weight: normal;
  font-size: 13px;
  color: #475569;
  margin-top: 4px;
  line-height: 1.55;
}

.ch-subtitle-text {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 3px;
  margin-bottom: 0;
  line-height: 1.5;
}

.card-subtle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 6px 0;
}

.card-center-callout {
  background: #f8fafc;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  padding: 10px 14px;
  text-align: center;
  margin: 8px 0;
}

.card-accent-left {
  border-left: 4px solid #3b82f6 !important;
}

.card-accent-dark {
  border-left: 4px solid #1e293b !important;
}

.metric-pill {
  background: #f1f5f9;
  color: #0f172a;
  padding: 2.5px 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  font-weight: 700;
  display: inline-block;
}

.progress-bar-fill {
  background: #2563eb;
  color: #ffffff;
  border-radius: 4px;
  padding: 3px 6px;
  font-weight: 700;
  text-align: center;
  display: inline-block;
}

/* ================= ISTQB STUDY NAVIGATOR ================= */
#study-navbar {
  position: sticky;
  top: 0;
  z-index: 99999;
  background: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-bottom: 2px solid #3b82f6;
  font-size: 13px;
  line-height: 1.4;
  user-select: none;
}

.study-nav-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.study-nav-left, .study-nav-center, .study-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.study-nav-brand {
  font-weight: 800;
  color: #60a5fa !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}
.study-nav-brand:hover {
  background: rgba(59, 130, 246, 0.3);
  color: #93c5fd !important;
}

.study-nav-pill-group {
  display: flex;
  align-items: center;
  background: #1e293b;
  padding: 3px 4px;
  border-radius: 6px;
  border: 1px solid #334155;
  gap: 2px;
}

.study-nav-pill {
  color: #cbd5e1 !important;
  text-decoration: none;
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.study-nav-pill:hover {
  color: #ffffff !important;
  background: #334155;
}
.study-nav-pill.active {
  background: #2563eb !important;
  color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.study-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #f1f5f9 !important;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.study-nav-btn:hover {
  background: #334155;
  border-color: #64748b;
  color: #ffffff !important;
}

.study-nav-lang-btn {
  background: #065f46;
  border-color: #059669;
  color: #ecfdf5 !important;
  font-weight: 700;
}
.study-nav-lang-btn:hover {
  background: #047857;
  border-color: #10b981;
}

.study-nav-select {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #475569;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  max-width: 220px;
}
.study-nav-select:focus {
  border-color: #3b82f6;
}

/* Floating Actions */
.floating-actions {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}
.floating-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  border: 2px solid #60a5fa;
  box-shadow: 0 4px 14px rgba(0,0,0,0.3);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.floating-btn:hover {
  transform: translateY(-3px);
  background: #1d4ed8;
}

/* Chapter Navigation Footer */
.chapter-nav-footer {
  margin-top: 36px;
  border-top: 2px solid #e2e8f0;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  page-break-inside: avoid;
  break-inside: avoid;
}
.nav-footer-card {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.nav-footer-card:hover {
  border-color: #2563eb;
  background: #eff6ff;
  transform: translateY(-2px);
}
.nav-footer-label {
  font-size: 11.5px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 3px;
}
.nav-footer-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #1e293b;
}

/* Interactive Quiz Tools */
.quiz-toggle-bar {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  gap: 8px;
}
.quiz-toggle-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.quiz-toggle-btn:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

/* ================= ULTRA-CLEAR HIGH-CONTRAST NIGHT READING THEME ================= */
body.dark-reading-mode {
  background-color: #0b1120 !important;
  color: #f1f5f9 !important;
}

/* Headings */
body.dark-reading-mode h1 {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
}
body.dark-reading-mode h2 {
  color: #93c5fd !important;
  border-bottom: 2px solid #3b82f6 !important;
  padding-bottom: 4px;
}
body.dark-reading-mode h3 {
  color: #f8fafc !important;
}
body.dark-reading-mode h4,
body.dark-reading-mode h5 {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .page-start > div,
body.dark-reading-mode [style*="border-bottom: 2.5px solid"] {
  border-bottom-color: #3b82f6 !important;
}

/* Paragraphs, Lists & Body Text */
body.dark-reading-mode p,
body.dark-reading-mode li,
body.dark-reading-mode dd,
body.dark-reading-mode dt {
  color: #e2e8f0 !important;
}
body.dark-reading-mode strong,
body.dark-reading-mode b,
body.dark-reading-mode th strong,
body.dark-reading-mode td strong {
  color: #ffffff !important;
  font-weight: 700;
}
body.dark-reading-mode em,
body.dark-reading-mode i {
  color: #f1f5f9 !important;
}
body.dark-reading-mode .si-term {
  color: #38bdf8 !important;
  font-weight: 600;
}
body.dark-reading-mode .si-question-sub {
  color: #cbd5e1 !important;
}
body.dark-reading-mode .ch-subtitle-text {
  color: #94a3b8 !important;
}
body.dark-reading-mode code {
  background-color: #030712 !important;
  color: #38bdf8 !important;
  border-color: #1e293b !important;
}
body.dark-reading-mode a:not(.study-nav-btn):not(.study-nav-pill):not(.nav-footer-card) {
  color: #60a5fa !important;
}
body.dark-reading-mode a:not(.study-nav-btn):not(.study-nav-pill):not(.nav-footer-card):hover {
  color: #93c5fd !important;
}

/* Cards & Containers */
body.dark-reading-mode .card,
body.dark-reading-mode .card-subtle,
body.dark-reading-mode .card-center-callout {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45) !important;
}
body.dark-reading-mode .card-accent-left {
  border-left-color: #3b82f6 !important;
}
body.dark-reading-mode .card-accent-dark {
  border-left-color: #60a5fa !important;
}

/* Callouts */
body.dark-reading-mode .callout {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  border-left: 4px solid #3b82f6 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-info {
  background-color: #0c1e38 !important;
  border-left-color: #38bdf8 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-exam {
  background-color: #122147 !important;
  border-left-color: #3b82f6 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-warning,
body.dark-reading-mode .callout-trap {
  background-color: #2b1704 !important;
  border-left-color: #f59e0b !important;
  color: #fef3c7 !important;
}
body.dark-reading-mode .callout-warning *,
body.dark-reading-mode .callout-trap * {
  color: #fef3c7 !important;
}
body.dark-reading-mode .callout-warning strong,
body.dark-reading-mode .callout-trap strong {
  color: #fde68a !important;
}
body.dark-reading-mode .callout-danger {
  background-color: #2b0b0b !important;
  border-left-color: #ef4444 !important;
  color: #fee2e2 !important;
}
body.dark-reading-mode .callout-danger * {
  color: #fee2e2 !important;
}
body.dark-reading-mode .callout-danger strong {
  color: #fca5a5 !important;
}
body.dark-reading-mode .callout-success {
  background-color: #05281a !important;
  border-left-color: #10b981 !important;
  color: #d1fae5 !important;
}
body.dark-reading-mode .callout-success * {
  color: #d1fae5 !important;
}
body.dark-reading-mode .callout-success strong {
  color: #6ee7b7 !important;
}

/* Tables */
body.dark-reading-mode table {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  box-shadow: 0 4px 14px rgba(0,0,0,0.3) !important;
}
body.dark-reading-mode th {
  background-color: #1a273e !important;
  color: #93c5fd !important;
  border-color: #22324e !important;
  border-bottom: 2px solid #3b82f6 !important;
}
body.dark-reading-mode td {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
  border-color: #1e293b !important;
}
body.dark-reading-mode tr:nth-child(even) td {
  background-color: #131d31 !important;
}
body.dark-reading-mode tr:hover td {
  background-color: #1e2d4a !important;
}

/* Badges & Metrics */
body.dark-reading-mode .badge {
  background-color: #1e293b !important;
  color: #93c5fd !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .badge-k1 {
  background-color: #0f2b5c !important;
  color: #93c5fd !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .badge-k2 {
  background-color: #2e1065 !important;
  color: #d8b4fe !important;
  border-color: #8b5cf6 !important;
}
body.dark-reading-mode .badge-k3 {
  background-color: #431407 !important;
  color: #fdba74 !important;
  border-color: #f97316 !important;
}
body.dark-reading-mode .badge-keyword {
  background-color: #064e3b !important;
  color: #6ee7b7 !important;
  border-color: #10b981 !important;
}
body.dark-reading-mode .metric-pill {
  background-color: #1e293b !important;
  color: #38bdf8 !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .progress-bar-fill {
  background: linear-gradient(90deg, #2563eb, #38bdf8) !important;
  border-color: #60a5fa !important;
  color: #ffffff !important;
}

/* Tool Boxes */
body.dark-reading-mode .tool-box {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  border-left: 4px solid #3b82f6 !important;
}
body.dark-reading-mode .tool-box-title {
  color: #93c5fd !important;
}
body.dark-reading-mode .tool-box-desc {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .tool-examples {
  border-top-color: #22324e !important;
  color: #94a3b8 !important;
}

/* Glossary */
body.dark-reading-mode .glossary-item {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .glossary-term {
  color: #60a5fa !important;
  border-bottom-color: #3b82f6 !important;
}

/* Practice Questions */
body.dark-reading-mode .quiz-card {
  background-color: #131d31 !important;
  border: 1.5px solid #22324e !important;
  border-left: 5px solid #3b82f6 !important;
  color: #e2e8f0 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important;
}
body.dark-reading-mode .quiz-q {
  color: #ffffff !important;
}
body.dark-reading-mode .quiz-opt {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .quiz-opt:hover {
  background-color: #1e2d4a !important;
  color: #ffffff !important;
}
body.dark-reading-mode .quiz-answer {
  background-color: #0b1222 !important;
  border-top: 1.5px dashed #38bdf8 !important;
  color: #f1f5f9 !important;
}
body.dark-reading-mode .quiz-toggle-btn {
  background-color: #1e2d4a !important;
  border-color: #3b82f6 !important;
  color: #93c5fd !important;
}
body.dark-reading-mode .quiz-toggle-btn:hover {
  background-color: #2563eb !important;
  color: #ffffff !important;
  border-color: #60a5fa !important;
}

/* Ruled Handwriting Notes Box */
body.dark-reading-mode .notes-box {
  background-color: #0b1222 !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .notes-box-header {
  color: #93c5fd !important;
  border-bottom-color: #22324e !important;
}
body.dark-reading-mode .notes-box-header span {
  color: #cbd5e1 !important;
}
body.dark-reading-mode .notes-box-lines {
  background-image: repeating-linear-gradient(transparent, transparent 17px, #263859 17px, #263859 18px) !important;
}

/* Quadrants, Formulas & Footer */
body.dark-reading-mode .quadrant-card {
  background-color: #131d31 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .formula-box {
  background-color: #0b1222 !important;
  border-color: #3b82f6 !important;
  color: #38bdf8 !important;
}
body.dark-reading-mode .footer-note {
  color: #94a3b8 !important;
  border-top-color: #22324e !important;
}

/* Study Navbar in Dark Mode */
body.dark-reading-mode #study-navbar {
  background: #060a12 !important;
  border-bottom-color: #3b82f6 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7) !important;
}
body.dark-reading-mode .study-nav-brand {
  background: rgba(59, 130, 246, 0.2) !important;
  color: #60a5fa !important;
  border-color: rgba(59, 130, 246, 0.4) !important;
}
body.dark-reading-mode .study-nav-pill-group {
  background: #0d1527 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-pill {
  color: #94a3b8 !important;
}
body.dark-reading-mode .study-nav-pill:hover {
  background: #1e2d4a !important;
  color: #ffffff !important;
}
body.dark-reading-mode .study-nav-pill.active {
  background: #2563eb !important;
  color: #ffffff !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-select {
  background-color: #131d31 !important;
  color: #ffffff !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-select option {
  background: #0b1120 !important;
  color: #ffffff !important;
}
body.dark-reading-mode .study-nav-btn {
  background: #131d31 !important;
  color: #cbd5e1 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-btn:hover {
  background: #1e2d4a !important;
  color: #ffffff !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-lang-btn {
  background: #064e3b !important;
  color: #6ee7b7 !important;
  border-color: #059669 !important;
}
body.dark-reading-mode .study-nav-lang-btn:hover {
  background: #047857 !important;
  color: #ffffff !important;
}
body.dark-reading-mode #theme-toggle-btn {
  background: #facc15 !important;
  color: #000000 !important;
  border-color: #eab308 !important;
  font-weight: 700 !important;
}
body.dark-reading-mode #theme-toggle-btn:hover {
  background: #fef08a !important;
}

/* Floating Actions & Footer */
body.dark-reading-mode .floating-btn {
  background: #2563eb !important;
  color: #ffffff !important;
  border-color: #60a5fa !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important;
}
body.dark-reading-mode .chapter-nav-footer {
  border-top-color: #22324e !important;
}
body.dark-reading-mode .nav-footer-card {
  background: #131d31 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .nav-footer-card:hover {
  background: #1e2d4a !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
}
body.dark-reading-mode .nav-footer-label {
  color: #94a3b8 !important;
}
body.dark-reading-mode .nav-footer-title {
  color: #60a5fa !important;
}

/* Fallback Universal Overrides */
body.dark-reading-mode [style*="color: #111827"],
body.dark-reading-mode [style*="color: #374151"],
body.dark-reading-mode [style*="color: #4b5563"],
body.dark-reading-mode [style*="color: #000000"],
body.dark-reading-mode [style*="color: black"],
body.dark-reading-mode [style*="color:#111827"],
body.dark-reading-mode [style*="color:#374151"] {
  color: #e2e8f0 !important;
}
body.dark-reading-mode strong[style*="color:"],
body.dark-reading-mode b[style*="color:"] {
  color: #ffffff !important;
}

/* STRICT PRINT OVERRIDE: ALWAYS CLEAN PAPER PRINT */
@media print {
  #study-navbar,
  .floating-actions,
  .chapter-nav-footer,
  .quiz-toggle-bar {
    display: none !important;
  }
  .quiz-answer {
    display: block !important;
  }
  body,
  body.dark-reading-mode {
    padding-top: 0 !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  body *,
  body.dark-reading-mode * {
    color: #000000 !important;
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  .card,
  .callout,
  .tool-box,
  .glossary-item,
  .quiz-card,
  table,
  th,
  td {
    border-color: #4b5563 !important;
  }
  th {
    border-bottom: 2px solid #000000 !important;
  }
  .notes-box {
    border-color: #6b7280 !important;
  }
  .notes-box-lines {
    background-image: repeating-linear-gradient(transparent, transparent 17px, #9ca3af 17px, #9ca3af 18px) !important;
  }
}
\`;\n\n`;

content = content.slice(0, startIdx) + newCSS + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Successfully updated upgrade_navigation_and_anchors.js with new comprehensiveInjectedCSS');
