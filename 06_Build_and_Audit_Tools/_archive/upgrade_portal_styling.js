const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Upgrade Favicon to professional vector SVG shield/check
const oldFavicon = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📘</text></svg>">';
const newFavicon = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%232563eb%22/><path d=%22M26 50 L42 66 L74 34%22 stroke=%22white%22 stroke-width=%2212%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 fill=%22none%22/></svg>">';
if (content.includes(oldFavicon)) {
  content = content.replace(oldFavicon, newFavicon);
}

// 2. Refine Theme Tokens (Harmonious Executive Sapphire & Slate)
const oldThemeTokens = `      /* Chapter Accent Colors (Dark Theme) */
      --ch1-color: #3b82f6;
      --ch1-bg: rgba(59, 130, 246, 0.12);
      --ch1-border: rgba(59, 130, 246, 0.35);
      --ch1-glow: rgba(59, 130, 246, 0.25);

      --ch2-color: #06b6d4;
      --ch2-bg: rgba(6, 182, 212, 0.12);
      --ch2-border: rgba(6, 182, 212, 0.35);
      --ch2-glow: rgba(6, 182, 212, 0.25);

      --ch3-color: #a855f7;
      --ch3-bg: rgba(168, 85, 247, 0.12);
      --ch3-border: rgba(168, 85, 247, 0.35);
      --ch3-glow: rgba(168, 85, 247, 0.25);

      --ch4-color: #f59e0b;
      --ch4-bg: rgba(245, 158, 11, 0.12);
      --ch4-border: rgba(245, 158, 11, 0.38);
      --ch4-glow: rgba(245, 158, 11, 0.3);

      --ch5-color: #10b981;
      --ch5-bg: rgba(16, 185, 129, 0.12);
      --ch5-border: rgba(16, 185, 129, 0.35);
      --ch5-glow: rgba(16, 185, 129, 0.25);

      --ch6-color: #f43f5e;
      --ch6-bg: rgba(244, 63, 94, 0.12);
      --ch6-border: rgba(244, 63, 94, 0.35);
      --ch6-glow: rgba(244, 63, 94, 0.25);`;

const newThemeTokens = `      /* Chapter Accent Colors (Cohesive Executive Palette) */
      --ch1-color: #3b82f6;
      --ch1-bg: rgba(59, 130, 246, 0.08);
      --ch1-border: rgba(59, 130, 246, 0.3);

      --ch2-color: #60a5fa;
      --ch2-bg: rgba(96, 165, 250, 0.08);
      --ch2-border: rgba(96, 165, 250, 0.3);

      --ch3-color: #818cf8;
      --ch3-bg: rgba(129, 140, 248, 0.08);
      --ch3-border: rgba(129, 140, 248, 0.3);

      --ch4-color: #38bdf8;
      --ch4-bg: rgba(56, 189, 248, 0.08);
      --ch4-border: rgba(56, 189, 248, 0.3);

      --ch5-color: #34d399;
      --ch5-bg: rgba(52, 211, 153, 0.08);
      --ch5-border: rgba(52, 211, 153, 0.3);

      --ch6-color: #94a3b8;
      --ch6-bg: rgba(148, 163, 184, 0.08);
      --ch6-border: rgba(148, 163, 184, 0.3);`;

if (content.includes(oldThemeTokens)) {
  content = content.replace(oldThemeTokens, newThemeTokens);
}

const oldLightTokens = `      /* Chapter Accent Colors (Light Theme - High Contrast) */
      --ch1-color: #1d4ed8;
      --ch1-bg: #eff6ff;
      --ch1-border: #bfdbfe;
      --ch1-glow: rgba(37, 99, 235, 0.18);

      --ch2-color: #0e7490;
      --ch2-bg: #ecfeff;
      --ch2-border: #a5f3fc;
      --ch2-glow: rgba(6, 182, 212, 0.18);

      --ch3-color: #7e22ce;
      --ch3-bg: #faf5ff;
      --ch3-border: #e9d5ff;
      --ch3-glow: rgba(168, 85, 247, 0.18);

      --ch4-color: #b45309;
      --ch4-bg: #fffbeb;
      --ch4-border: #fde68a;
      --ch4-glow: rgba(245, 158, 11, 0.2);

      --ch5-color: #047857;
      --ch5-bg: #ecfdf5;
      --ch5-border: #a7f3d0;
      --ch5-glow: rgba(16, 185, 129, 0.18);

      --ch6-color: #be123c;
      --ch6-bg: #fff1f2;
      --ch6-border: #fecdd3;
      --ch6-glow: rgba(244, 63, 94, 0.18);`;

const newLightTokens = `      /* Chapter Accent Colors (Light Theme - Architectural Hierarchy) */
      --ch1-color: #1d4ed8;
      --ch1-bg: #eff6ff;
      --ch1-border: #bfdbfe;

      --ch2-color: #2563eb;
      --ch2-bg: #f0f7ff;
      --ch2-border: #bfdbfe;

      --ch3-color: #4338ca;
      --ch3-bg: #eef2ff;
      --ch3-border: #c7d2fe;

      --ch4-color: #0284c7;
      --ch4-bg: #f0f9ff;
      --ch4-border: #bae6fd;

      --ch5-color: #047857;
      --ch5-bg: #ecfdf5;
      --ch5-border: #a7f3d0;

      --ch6-color: #475569;
      --ch6-bg: #f8fafc;
      --ch6-border: #cbd5e1;`;

if (content.includes(oldLightTokens)) {
  content = content.replace(oldLightTokens, newLightTokens);
}

// 3. Remove --ch-glow from CSS rules
content = content.replace(/--ch-glow:[^;]+;\s*/g, '');
content = content.replace(/box-shadow: var\(--card-hover-shadow\), 0 0 20px var\(--ch-glow\);/g, 'box-shadow: var(--card-hover-shadow);');

// 4. Clean up header-bg in dark mode
content = content.replace(
  '--header-bg: linear-gradient(135deg, #070b14 0%, #0f172a 50%, #1e293b 100%);',
  '--header-bg: #0f172a;'
);
content = content.replace(
  '--header-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #eff6ff 100%);',
  '--header-bg: #ffffff;'
);

// 5. Add .ui-icon utility class in CSS
const iconCss = `
    .ui-icon {
      width: 14px;
      height: 14px;
      display: inline-block;
      vertical-align: -2px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      flex-shrink: 0;
    }
`;
if (!content.includes('.ui-icon {')) {
  content = content.replace('header {', `${iconCss}\n    header {`);
}

// 6. Replace emojis in hero simulator banner
content = content.replace('<div class="sim-badge">🎯 NEW • OFFICIAL EXAM SIMULATOR</div>', '<div class="sim-badge">OFFICIAL EXAM SIMULATOR</div>');
content = content.replace('<span class="sim-tag">⏱️ 60-Minute Real Exam Timer</span>', '<span class="sim-tag"><svg class="ui-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 60-Minute Real Exam Timer</span>');
content = content.replace('<span class="sim-tag">📊 65% Passing Standard (26/40)</span>', '<span class="sim-tag"><svg class="ui-icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> 65% Passing Standard (26/40)</span>');
content = content.replace('<span class="sim-tag">🇱🇰 EN & Sinhala Bilingual Toggle</span>', '<span class="sim-tag"><svg class="ui-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> EN & Sinhala Bilingual Toggle</span>');
content = content.replace('<span class="sim-tag">📈 K1 / K2 / K3 Cognitive Diagnostics</span>', '<span class="sim-tag"><svg class="ui-icon" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> K1 / K2 / K3 Cognitive Diagnostics</span>');
content = content.replace('<span class="sim-tag">🖨️ Printable Score Card</span>', '<span class="sim-tag"><svg class="ui-icon" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg> Printable Score Card</span>');
content = content.replace('<span>🚀 Launch Mock Exam</span>', '<span>Launch Mock Exam</span>');

// 7. Replace search icon & filter tab emojis
content = content.replace('<span class="search-icon">🔍</span>', '<span class="search-icon"><svg class="ui-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>');
content = content.replace('<button class="filter-tab" onclick="setFilter(\'en\', this)">🇬🇧 English</button>', '<button class="filter-tab" onclick="setFilter(\'en\', this)">English</button>');
content = content.replace('<button class="filter-tab" onclick="setFilter(\'si\', this)">🇱🇰 Sinhala</button>', '<button class="filter-tab" onclick="setFilter(\'si\', this)">Sinhala</button>');
content = content.replace('<button class="filter-tab" onclick="setFilter(\'pdf\', this)">📄 PDFs</button>', '<button class="filter-tab" onclick="setFilter(\'pdf\', this)">Printable PDFs</button>');

// 8. Replace chapter metric emojis
content = content.replace(/🎯 <strong>(\d+)<\/strong> LOs/g, '<strong>$1</strong> LOs');
content = content.replace(/📖 <strong>(\d+)<\/strong> Terms/g, '<strong>$1</strong> Terms');
content = content.replace(/📝 <strong>(\d+)<\/strong> Questions/g, '<strong>$1</strong> Questions');

// 9. Clean buttons in chapter cards (remove 🇬🇧, 🇱🇰 flag emojis, 📄 page emojis)
content = content.replace(/<span>🇬🇧 Read English Study Guide<\/span>/g, '<span>Read English Study Guide</span>');
content = content.replace(/<span>🇱🇰 Read සිංහල Study Guide<\/span>/g, '<span>Read සිංහල Study Guide</span>');
content = content.replace(/<span>📄 English Printable PDF<\/span>/g, '<span>English Printable PDF</span>');
content = content.replace(/<span>📄 සිංහල Printable PDF<\/span>/g, '<span>සිංහල Printable PDF</span>');

// 10. Replace Resource card header & icons
content = content.replace('<span>📚</span> Master Reference Documents & Practice Question Bank', '<svg class="ui-icon" style="width:16px;height:16px;margin-right:6px;" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> Master Reference Documents & Practice Question Bank');
content = content.replace('<div class="resource-icon">🎯</div>', '<div class="resource-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></div>');
content = content.replace('<div class="resource-icon">📕</div>', '<div class="resource-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div>');
content = content.replace('<div class="resource-icon">📝</div>', '<div class="resource-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div>');
content = content.replace('<div class="resource-icon">🗺️</div>', '<div class="resource-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg></div>');

content = content.replace('>🎯 Timed Mock<', '>Timed Mock<');
content = content.replace('>📕 Official Standard<', '>Official Standard<');
content = content.replace('>📝 Interactive Bank<', '>Interactive Bank<');
content = content.replace('>🗺️ Interactive Dashboard<', '>Study Map<');

// 11. Replace empty search icon & reset search button
content = content.replace('<div class="no-results-icon">🔎</div>', '<div class="no-results-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>');
content = content.replace('<button class="btn-clear-search" onclick="resetSearch()">↺ Reset Search Filter</button>', '<button class="btn-clear-search" onclick="resetSearch()">Reset Search Filter</button>');

// 12. Floating button SVG chevron
content = content.replace('<button id="back-to-top" class="back-to-top-btn" onclick="scrollToTop()" title="Back to top">↑</button>', '<button id="back-to-top" class="back-to-top-btn" onclick="scrollToTop()" title="Back to top"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></button>');

// 13. Theme button JS SVG rendering
const oldUpdateTheme = `    function updateThemeButton(isLight) {
      const icon = document.getElementById('theme-btn-icon');
      const text = document.getElementById('theme-btn-text');
      if (isLight) {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = 'Dark Mode';
      } else {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = 'Light Mode';
      }
    }`;

const newUpdateTheme = `    function updateThemeButton(isLight) {
      const icon = document.getElementById('theme-btn-icon');
      const text = document.getElementById('theme-btn-text');
      if (isLight) {
        if (icon) icon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        if (text) text.textContent = 'Dark Mode';
      } else {
        if (icon) icon.innerHTML = '<svg class="ui-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        if (text) text.textContent = 'Light Mode';
      }
    }`;

if (content.includes(oldUpdateTheme)) {
  content = content.replace(oldUpdateTheme, newUpdateTheme);
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully upgraded index.html with professional executive styling & SVG iconography.');
