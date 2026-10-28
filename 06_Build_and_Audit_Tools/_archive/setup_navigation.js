/**
 * Setup Navigation System for ISTQB Study Guides
 * Injects a top sticky navigation bar, in-page section jumper, prev/next links,
 * language switcher, theme toggle, and bottom chapter footer into all 12 HTML guides.
 * Also generates the master root index.html dashboard and local index redirects.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML');

const chapters = [
  {
    num: 1,
    titleEn: 'Chapter 01: Fundamentals of Testing',
    titleSi: 'Chapter 01: පරීක්ෂාවේ මූලධර්ම (Fundamentals of Testing)',
    shortEn: 'Ch 1: Fundamentals',
    shortSi: 'Ch 1: මූලධර්ම',
    fileEn: 'istqb_ch1_study_guide.html',
    fileSi: 'istqb_ch1_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_01_Fundamentals_of_Testing_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 6,
    kCount: 19,
    summaryEn: 'Covers core testing definitions, why testing is necessary, the 7 testing principles, test activities/testware/roles, and essential tester skills & good practices.',
    summarySi: 'මෘදුකාංග පරීක්ෂාවේ මූලික අර්ථදැක්වීම්, පරීක්ෂාවේ අවශ්‍යතාව, පරීක්ෂණ නීති 7, පරීක්ෂණ ක්‍රියාවලිය, testware, භූමිකාවන් සහ මූලික කුසලතා.',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-1-1', title: '  1.1 What is Testing?' },
      { id: 'sec-1-2', title: '  1.2 Why is Testing Necessary?' },
      { id: 'sec-1-3', title: '  1.3 The 7 Testing Principles' },
      { id: 'sec-1-4', title: '  1.4 Test Activities, Testware & Roles' },
      { id: 'sec-1-5', title: '  1.5 Essential Skills & Good Practices' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  },
  {
    num: 2,
    titleEn: 'Chapter 02: Testing Throughout the SDLC',
    titleSi: 'Chapter 02: SDLC තුළ පරීක්ෂාව (Testing Throughout SDLC)',
    shortEn: 'Ch 2: SDLC Testing',
    shortSi: 'Ch 2: SDLC පරීක්ෂාව',
    fileEn: 'istqb_ch2_study_guide.html',
    fileSi: 'istqb_ch2_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_02_Testing_Throughout_SDLC_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 11,
    kCount: 18,
    summaryEn: 'Covers testing in SDLC models, Test-First (TDD/ATDD/BDD), DevOps, Shift Left, the 5 test levels, 4 test types, and maintenance testing.',
    summarySi: 'SDLC ආකෘති වල පරීක්ෂාව, Test-First ප්‍රවේශ (TDD/ATDD/BDD), DevOps, Shift Left, පරීක්ෂණ මට්ටම් 5, පරීක්ෂණ වර්ග 4, සහ නඩත්තු පරීක්ෂාව.',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-2-1', title: '  2.1 Testing in Context of SDLC' },
      { id: 'sec-2-2', title: '  2.2 The 5 Test Levels & 4 Test Types' },
      { id: 'sec-2-3', title: '  2.3 Maintenance Testing' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  },
  {
    num: 3,
    titleEn: 'Chapter 03: Static Testing',
    titleSi: 'Chapter 03: ස්ථිතික පරීක්ෂාව (Static Testing)',
    shortEn: 'Ch 3: Static Testing',
    shortSi: 'Ch 3: ස්ථිතික පරීක්ෂාව',
    fileEn: 'istqb_ch3_study_guide.html',
    fileSi: 'istqb_ch3_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_03_Static_Testing_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 7,
    kCount: 11,
    summaryEn: 'Covers static vs dynamic testing, early feedback value, formal review processes (ISO 20246), 5 review roles, 4 review types, and review success factors.',
    summarySi: 'ස්ථිතික සහ ගතික පරීක්ෂාව අතර වෙනස, සමාලෝචන ක්‍රියාවලිය (ISO 20246), සමාලෝචන භූමිකාවන් 5, සමාලෝචන වර්ග 4, සහ සාර්ථක සාධක.',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-3-1', title: '  3.1 Static Testing Basics' },
      { id: 'sec-3-2', title: '  3.2 Feedback & Review Process' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  },
  {
    num: 4,
    titleEn: 'Chapter 04: Test Analysis and Design',
    titleSi: 'Chapter 04: පරීක්ෂණ විශ්ලේෂණය සහ සැලසුම්කරණය (Analysis & Design)',
    shortEn: 'Ch 4: Analysis & Design',
    shortSi: 'Ch 4: සැලසුම්කරණය',
    fileEn: 'istqb_ch4_study_guide.html',
    fileSi: 'istqb_ch4_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_04_Test_Analysis_and_Design_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 21,
    kCount: 22,
    summaryEn: 'Covers Black-box techniques (EP, BVA, Decision Table, State Transition), White-box (Statement & Branch), Experience-based, and Collaboration-based (User Stories, ATDD).',
    summarySi: 'කළු-පෙට්ටි ක්‍රම (EP, BVA, Decision Table, State Transition), සුදු-පෙට්ටි ක්‍රම (Statement & Branch), පළපුරුදු පාදක ක්‍රම, සහ සහයෝගීතා ප්‍රවේශ (ATDD).',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-4-1', title: '  4.1 Test Techniques Overview' },
      { id: 'sec-4-2', title: '  4.2 Black-Box Test Techniques' },
      { id: 'sec-4-3', title: '  4.3 White-Box Test Techniques' },
      { id: 'sec-4-4', title: '  4.4 Experience-Based Techniques' },
      { id: 'sec-4-5', title: '  4.5 Collaboration-Based Approaches' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  },
  {
    num: 5,
    titleEn: 'Chapter 05: Managing the Test Activities',
    titleSi: 'Chapter 05: පරීක්ෂණ කළමනාකරණය (Managing Test Activities)',
    shortEn: 'Ch 5: Test Management',
    shortSi: 'Ch 5: පරීක්ෂණ කළමනාකරණය',
    fileEn: 'istqb_ch5_study_guide.html',
    fileSi: 'istqb_ch5_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_05_Managing_Test_Activities_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 15,
    kCount: 18,
    summaryEn: 'Covers Test Planning, Estimation, Prioritization, Test Pyramid, Testing Quadrants, Risk Management, Monitoring/Control/Completion, Configuration & Defect Management.',
    summarySi: 'පරීක්ෂණ සැලසුම්කරණය, ඇස්තමේන්තු ක්‍රම, ප්‍රමුඛතාකරණය, පිරමිඩය, චතුර්ථක, අවදානම් කළමනාකරණය, අධීක්ෂණය, සහ දෝෂ කළමනාකරණය.',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-5-1', title: '  5.1 Test Planning & Estimation' },
      { id: 'sec-5-2', title: '  5.2 Risk Management' },
      { id: 'sec-5-3', title: '  5.3 Monitoring, Control & Completion' },
      { id: 'sec-5-4', title: '  5.4 Configuration & Defect Management' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  },
  {
    num: 6,
    titleEn: 'Chapter 06: Test Tools',
    titleSi: 'Chapter 06: පරීක්ෂණ මෙවලම් (Test Tools)',
    shortEn: 'Ch 6: Test Tools',
    shortSi: 'Ch 6: පරීක්ෂණ මෙවලම්',
    fileEn: 'istqb_ch6_study_guide.html',
    fileSi: 'istqb_ch6_study_guide_sinhala.html',
    pdfFile: 'ISTQB_CTFL_v4.0.1_Chapter_06_Test_Tools_Study_Guide.pdf',
    questionsCount: 8,
    loCount: 4,
    kCount: 4,
    summaryEn: 'Covers Tool support for testing, tool classifications, spreadsheet principle, benefits and risks of test automation, and success factors.',
    summarySi: 'පරීක්ෂණ මෙවලම් සහාය, වර්ගීකරණය, spreadsheet මූලධර්මය, ස්වයංක්‍රීයකරණයේ වාසි සහ අවදානම්, සහ සාර්ථක සාධක.',
    sections: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-6-1', title: '  6.1 Tool Support for Testing' },
      { id: 'sec-6-2', title: '  6.2 Benefits & Risks of Automation' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keywords Lexicon (Official Glossary)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ]
  }
];

// Navigation Stylesheet to inject into guides
const navStyles = `
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.12);
  transition: all 0.2s ease;
}
.study-nav-brand:hover {
  background: rgba(59, 130, 246, 0.25);
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
  color: #94a3b8 !important;
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
  background: #2563eb;
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
  max-width: 210px;
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
  background: #1e293b;
  color: #ffffff;
  border: 1px solid #475569;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}
.floating-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  color: #ffffff;
}

/* Chapter Bottom Footer */
.chapter-nav-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
}
.nav-footer-card {
  padding: 12px 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  text-decoration: none;
  color: #0f172a !important;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
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

/* Dark mode theme for web reading */
body.dark-reading-mode {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode h1,
body.dark-reading-mode h2,
body.dark-reading-mode h3,
body.dark-reading-mode h4 {
  color: #f8fafc !important;
  border-color: #334155 !important;
}
body.dark-reading-mode .card,
body.dark-reading-mode .tool-box,
body.dark-reading-mode .glossary-item,
body.dark-reading-mode .notes-box,
body.dark-reading-mode .quiz-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .quiz-answer {
  background-color: #0f172a !important;
  color: #f1f5f9 !important;
}
body.dark-reading-mode .table-standard th {
  background-color: #1e293b !important;
  color: #f8fafc !important;
}
body.dark-reading-mode .table-standard td {
  border-color: #334155 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .nav-footer-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}
body.dark-reading-mode .nav-footer-title {
  color: #60a5fa !important;
}
body.dark-reading-mode .notes-box-lines {
  background-image: repeating-linear-gradient(transparent, transparent 17px, #334155 17px, #334155 18px) !important;
}

/* STRICT PRINT OVERRIDE: NEVER PRINT NAVIGATOR OR ACTION BUTTONS */
@media print {
  #study-navbar,
  .floating-actions,
  .chapter-nav-footer {
    display: none !important;
  }
  body {
    padding-top: 0 !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
}
`;

const navScript = `
<script>
  function toggleReadingTheme() {
    document.body.classList.toggle('dark-reading-mode');
    const isDark = document.body.classList.contains('dark-reading-mode');
    localStorage.setItem('istqb_reading_theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  }

  function jumpToSection(sel) {
    const val = sel.value;
    if (!val) return;
    const target = document.getElementById(val) || document.querySelector('[data-section=\"' + val + '\"]');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Restore user theme preference
  document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('istqb_reading_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-reading-mode');
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) btn.textContent = '☀️ Light';
    }

    // Connect section anchors automatically
    const headings = document.querySelectorAll('h2, h3, .notes-box, .quiz-card');
    headings.forEach(function(h) {
      const text = h.textContent.toLowerCase();
      if (!h.id) {
        if (text.includes('practice exam questions') || text.includes('අභ්‍යාස ප්‍රශ්න')) h.id = 'sec-questions';
        else if (text.includes('keyword lexicon') || text.includes('glossary') || text.includes('පාරිභාෂික')) h.id = 'sec-glossary';
        else if (text.includes('exam flashpoints') || text.includes('high-yield')) h.id = 'sec-flashpoints';
        else if (text.includes('core syllabus') || text.includes('මූලික විෂය කරුණු')) h.id = 'sec-core';
        else if (text.includes('notes') || text.includes('handwriting')) h.id = 'sec-notes';
      }
    });
  });
</script>
`;

function buildNavbar(ch, isSinhala) {
  const prevCh = ch.num > 1 ? chapters[ch.num - 2] : null;
  const nextCh = ch.num < 6 ? chapters[ch.num] : null;

  const currentFolder = isSinhala ? '03_Sinhala_Bilingual_Study_Guides_HTML' : '02_English_Study_Guides_HTML';
  const otherFolder = isSinhala ? '../02_English_Study_Guides_HTML' : '../03_Sinhala_Bilingual_Study_Guides_HTML';
  const otherFile = isSinhala ? ch.fileEn : ch.fileSi;

  const langLabel = isSinhala ? '🇬🇧 English Version' : '🇱🇰 සිංහල අනුවාදය';
  const homeLink = '../index.html';

  let pillsHtml = chapters.map(c => {
    const href = isSinhala ? c.fileSi : c.fileEn;
    const activeClass = c.num === ch.num ? ' active' : '';
    return `<a href="${href}" class="study-nav-pill${activeClass}" title="${isSinhala ? c.titleSi : c.titleEn}">Ch ${c.num}</a>`;
  }).join('');

  let optionsHtml = `<option value="">📑 Jump to Section...</option>`;
  ch.sections.forEach(s => {
    optionsHtml += `<option value="${s.id}">${s.title}</option>`;
  });

  const prevBtnHtml = prevCh
    ? `<a href="${isSinhala ? prevCh.fileSi : prevCh.fileEn}" class="study-nav-btn" title="Go to ${prevCh.shortEn}">◀ Prev</a>`
    : `<span class="study-nav-btn" style="opacity:0.4; cursor:not-allowed;">◀ Prev</span>`;

  const nextBtnHtml = nextCh
    ? `<a href="${isSinhala ? nextCh.fileSi : nextCh.fileEn}" class="study-nav-btn" title="Go to ${nextCh.shortEn}">Next ▶</a>`
    : `<span class="study-nav-btn" style="opacity:0.4; cursor:not-allowed;">Next ▶</span>`;

  return `
<!-- ================= STUDY NAVBAR ================= -->
<nav id="study-navbar">
  <div class="study-nav-container">
    <div class="study-nav-left">
      <a href="${homeLink}" class="study-nav-brand" title="Master Study Dashboard">
        <span>🏠</span> <strong>ISTQB® CTFL Hub</strong>
      </a>
      <div class="study-nav-pill-group">
        ${pillsHtml}
      </div>
    </div>

    <div class="study-nav-center">
      <select class="study-nav-select" onchange="jumpToSection(this)">
        ${optionsHtml}
      </select>
      ${prevBtnHtml}
      ${nextBtnHtml}
    </div>

    <div class="study-nav-right">
      <a href="${otherFolder}/${otherFile}" class="study-nav-btn study-nav-lang-btn" title="Switch language for Chapter ${ch.num}">
        ⇄ ${langLabel}
      </a>
      <button id="theme-toggle-btn" class="study-nav-btn" onclick="toggleReadingTheme()" title="Toggle Reading Theme">
        🌙 Dark
      </button>
      <button class="study-nav-btn" onclick="window.print()" title="Print this guide or save as PDF">
        🖨️ Print
      </button>
    </div>
  </div>
</nav>
`;
}

function buildFooter(ch, isSinhala) {
  const prevCh = ch.num > 1 ? chapters[ch.num - 2] : null;
  const nextCh = ch.num < 6 ? chapters[ch.num] : null;
  const homeLink = '../index.html';

  const prevCard = prevCh
    ? `<a href="${isSinhala ? prevCh.fileSi : prevCh.fileEn}" class="nav-footer-card">
        <span class="nav-footer-label">◀ Previous Chapter</span>
        <span class="nav-footer-title">${isSinhala ? prevCh.titleSi : prevCh.titleEn}</span>
       </a>`
    : `<div class="nav-footer-card" style="opacity:0.35; cursor:not-allowed;">
        <span class="nav-footer-label">Beginning</span>
        <span class="nav-footer-title">First Chapter</span>
       </div>`;

  const centerCard = `
    <a href="${homeLink}" class="nav-footer-card" style="text-align: center; align-items: center;">
      <span class="nav-footer-label">Master Overview</span>
      <span class="nav-footer-title">🏠 Study Hub</span>
    </a>
  `;

  const nextCard = nextCh
    ? `<a href="${isSinhala ? nextCh.fileSi : nextCh.fileEn}" class="nav-footer-card" style="text-align: right;">
        <span class="nav-footer-label">Next Chapter ▶</span>
        <span class="nav-footer-title">${isSinhala ? nextCh.titleSi : nextCh.titleEn}</span>
       </a>`
    : `<div class="nav-footer-card" style="opacity:0.35; cursor:not-allowed; text-align: right;">
        <span class="nav-footer-label">Completion</span>
        <span class="nav-footer-title">All Chapters Completed 🎉</span>
       </div>`;

  return `
<!-- ================= CHAPTER NAVIGATION FOOTER ================= -->
<div class="chapter-nav-footer">
  ${prevCard}
  ${centerCard}
  ${nextCard}
</div>

<!-- Floating Back to Top Button -->
<div class="floating-actions">
  <button class="floating-btn" onclick="scrollToTop()" title="Scroll to Top">⬆</button>
</div>
`;
}

function processFile(filePath, ch, isSinhala) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove old navbar/styles/scripts if already present
  content = content.replace(/<!-- ================= STUDY NAVBAR ================= -->[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<!-- ================= CHAPTER NAVIGATION FOOTER ================= -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
  content = content.replace(/\/\* ================= ISTQB STUDY NAVIGATOR ================= \*\/[\s\S]*?\/\* STRICT PRINT OVERRIDE[\s\S]*?\}/gi, '');
  content = content.replace(/<script>[\s\S]*?toggleReadingTheme[\s\S]*?<\/script>/gi, '');

  // 2. Insert CSS before </style>
  if (!content.includes('ISTQB STUDY NAVIGATOR')) {
    content = content.replace('</style>', navStyles + '\n</style>');
  }

  // 3. Insert Navbar immediately after <body>
  const navbarHtml = buildNavbar(ch, isSinhala);
  content = content.replace(/<body[^>]*>/i, match => match + '\n' + navbarHtml);

  // 4. Insert Footer & Script before </body>
  const footerHtml = buildFooter(ch, isSinhala) + '\n' + navScript;
  content = content.replace(/<\/body>/i, footerHtml + '\n</body>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Injected navigation into: ${path.basename(filePath)}`);
}

// Process all 6 English guides
chapters.forEach(ch => {
  const fileEn = path.join(enDir, ch.fileEn);
  processFile(fileEn, ch, false);
});

// Process all 6 Sinhala guides
chapters.forEach(ch => {
  const fileSi = path.join(siDir, ch.fileSi);
  processFile(fileSi, ch, true);
});

console.log('\nAll 12 HTML study guides updated with modern navigation!');
