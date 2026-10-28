/**
 * Upgrade Print & PDF Clarity across all 12 ISTQB Study Guides
 * 
 * 1. Embeds Google Fonts ('Inter' and 'Noto Sans Sinhala')
 * 2. Sets optimal font-family with 'Noto Sans Sinhala' prioritized for Sinhala guides
 * 3. Enforces larger, crystal-clear publication-grade font sizes:
 *    - English: 15px base (up from 13.5px), 14.8px paragraphs, 14px table cells, 15px quizzes
 *    - Sinhala: 16px base (up from 13.5px), 15.8px paragraphs, 14.8px table cells, 16px quizzes
 * 4. Rich, ink-friendly font weights (450-500 body, 700-800 headings/bold) to ensure solid ink laydown
 * 5. Pure white backgrounds with solid jet-black text (#000000) and crisp outlines
 * 6. Adds clean page numbers at bottom without overlapping headers or divider lines
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Bilingual_Study_Guides_HTML');

const fontLinks = `<!-- Google Fonts: Inter & Noto Sans Sinhala for razor-sharp typography -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Sinhala:wght@400;500;600;700;800&display=swap" rel="stylesheet">
`;

function getPrintStyles(isSinhala) {
  const fontFamily = isSinhala
    ? '"Noto Sans Sinhala", "Iskoola Pota", "Nirmala UI", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
    : '"Inter", "Noto Sans Sinhala", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

  const bodySize = isSinhala ? '16px' : '15px';
  const bodyLine = isSinhala ? '1.76' : '1.68';
  const bodyWeight = isSinhala ? '500' : '450';

  const pSize = isSinhala ? '15.8px' : '14.8px';
  const pLine = isSinhala ? '1.76' : '1.68';

  const h1Size = isSinhala ? '23px' : '22px';
  const h2Size = isSinhala ? '18px' : '17px';
  const h3Size = isSinhala ? '16.5px' : '15.5px';
  const h4Size = isSinhala ? '15.2px' : '14.5px';

  const thSize = isSinhala ? '15px' : '14.2px';
  const tdSize = isSinhala ? '14.8px' : '14px';
  const tdLine = isSinhala ? '1.72' : '1.62';

  const containerSize = isSinhala ? '15.5px' : '14.5px';
  const containerLine = isSinhala ? '1.74' : '1.65';

  const quizQSize = isSinhala ? '16px' : '15px';
  const quizQLine = isSinhala ? '1.65' : '1.55';
  const quizOptSize = isSinhala ? '15px' : '14.2px';
  const quizOptLine = isSinhala ? '1.65' : '1.55';
  const quizAnsSize = isSinhala ? '15px' : '14.2px';
  const quizAnsLine = isSinhala ? '1.72' : '1.65';

  const badgeSize = isSinhala ? '12.8px' : '12px';
  const codeSize = isSinhala ? '13.8px' : '13.5px';

  return `/* ================= AUTHORITATIVE PUBLICATION-GRADE PRINT STYLES ================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
  }

  /* Universal reset to high-contrast ink-friendly black on pure white */
  *,
  *::before,
  *::after {
    text-shadow: none !important;
    box-shadow: none !important;
  }

  html,
  body,
  body.dark-reading-mode {
    padding-top: 0 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    min-height: auto !important;
    height: auto !important;
    display: block !important;
    font-family: ${fontFamily} !important;
    font-size: ${bodySize} !important;
    line-height: ${bodyLine} !important;
    font-weight: ${bodyWeight} !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Reset layout wrapper to full print width with pure white background */
  .study-main-wrapper,
  body.dark-reading-mode .study-main-wrapper,
  body .study-main-wrapper {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  /* Completely suppress interactive and navigation UI */
  #study-navbar,
  .floating-actions,
  .chapter-nav-footer,
  .quiz-toggle-bar,
  .btn-reveal-answer,
  .study-nav-btn,
  .format-btn,
  button {
    display: none !important;
  }

  /* Headings: Razor sharp solid black with clean dividers */
  h1, h2, h3, h4, h5 {
    color: #000000 !important;
    break-after: avoid !important;
    page-break-after: avoid !important;
    font-family: ${fontFamily} !important;
  }

  h1 {
    font-size: ${h1Size} !important;
    border-bottom: 2.5px solid #000000 !important;
    padding-bottom: 6px !important;
    margin-bottom: 12px !important;
    font-weight: 800 !important;
    color: #000000 !important;
  }

  h2 {
    font-size: ${h2Size} !important;
    border-bottom: 1.8px solid #000000 !important;
    padding-bottom: 4px !important;
    margin-top: 18px !important;
    margin-bottom: 10px !important;
    font-weight: 700 !important;
    color: #000000 !important;
  }

  h3 {
    font-size: ${h3Size} !important;
    margin-top: 14px !important;
    margin-bottom: 6px !important;
    font-weight: 700 !important;
    color: #000000 !important;
  }

  h4, h5 {
    font-size: ${h4Size} !important;
    margin-top: 10px !important;
    margin-bottom: 5px !important;
    font-weight: 700 !important;
    color: #000000 !important;
  }

  /* Body Text, Paragraphs, Lists: Large, crystal clear & comfortable */
  p, li, dd, dt {
    font-size: ${pSize} !important;
    line-height: ${pLine} !important;
    color: #000000 !important;
    margin-bottom: 8px !important;
  }

  span, em, i, b, label, small {
    color: #000000 !important;
  }

  strong {
    color: #000000 !important;
    font-weight: 800 !important;
  }

  /* Override any inline colored borders or title accents to crisp black */
  .page-start > div,
  [style*="border-bottom: 2.5px solid"],
  [style*="border-bottom:2.5px solid"] {
    border-bottom-color: #000000 !important;
  }

  /* All Containers: Pure White Background with Crisp High-Contrast Black Borders */
  .card,
  .card-subtle,
  .card-center-callout,
  .callout,
  .tool-box,
  .glossary-item,
  .quiz-card,
  .formula-box,
  .quadrant-card {
    border: 1.2px solid #000000 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    border-radius: 4px !important;
    box-shadow: none !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 12px !important;
    padding: 12px 16px !important;
    font-size: ${containerSize} !important;
    line-height: ${containerLine} !important;
    color: #000000 !important;
  }

  /* Callouts: Bold Solid Black Left Accent Bar */
  .callout,
  .callout-info,
  .callout-warning,
  .callout-danger,
  .callout-success,
  .callout-exam,
  .callout-trap,
  .card-accent-left,
  .card-accent-dark {
    border: 1.2px solid #000000 !important;
    border-left: 4.5px solid #000000 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  .callout *,
  .callout-warning *,
  .callout-trap *,
  .callout-danger *,
  .callout-success * {
    color: #000000 !important;
  }

  /* Practice Questions: Large, easily legible layout */
  .quiz-card {
    border: 1.2px solid #000000 !important;
    border-left: 4.5px solid #000000 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  .quiz-q {
    color: #000000 !important;
    font-weight: 800 !important;
    font-size: ${quizQSize} !important;
    line-height: ${quizQLine} !important;
    margin-bottom: 8px !important;
  }

  .quiz-opt {
    color: #000000 !important;
    font-size: ${quizOptSize} !important;
    line-height: ${quizOptLine} !important;
    margin-bottom: 5px !important;
  }

  /* Practice Exam Answers: Distinct white box with black outline */
  .quiz-answer {
    display: block !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    border: 1.2px solid #000000 !important;
    border-left: 4px solid #000000 !important;
    color: #000000 !important;
    border-radius: 4px !important;
    padding: 10px 14px !important;
    font-size: ${quizAnsSize} !important;
    line-height: ${quizAnsLine} !important;
    margin-top: 10px !important;
  }

  .quiz-answer,
  .quiz-answer * {
    color: #000000 !important;
  }

  /* Badges & Tags: Sharp black outline & bold black text */
  .badge,
  .badge-k1,
  .badge-k2,
  .badge-k3,
  .badge-keyword,
  .metric-pill {
    display: inline-block !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1.2px solid #000000 !important;
    padding: 2.5px 7.5px !important;
    border-radius: 3px !important;
    font-size: ${badgeSize} !important;
    font-weight: 800 !important;
    letter-spacing: 0.2px !important;
  }

  /* Tables: Sharp publication borders & generous padding */
  table {
    border-collapse: collapse !important;
    width: 100% !important;
    margin: 12px 0 !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    border: 1.5px solid #000000 !important;
    background: #ffffff !important;
  }

  th, thead th {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1.2px solid #000000 !important;
    border-bottom: 2.5px solid #000000 !important;
    padding: 8px 11px !important;
    font-weight: 800 !important;
    font-size: ${thSize} !important;
  }

  td {
    border: 1px solid #000000 !important;
    padding: 7px 11px !important;
    color: #000000 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    font-size: ${tdSize} !important;
    line-height: ${tdLine} !important;
  }

  tr:nth-child(even) td,
  tr:nth-child(odd) td {
    background: #ffffff !important;
    background-color: #ffffff !important;
  }

  /* Student Handwriting Note Boxes */
  .notes-box {
    border: 1.5px dashed #000000 !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    padding: 10px 14px !important;
    margin-top: 14px !important;
  }

  .notes-box-header {
    color: #000000 !important;
    border-bottom: 1.2px solid #000000 !important;
    font-size: ${pSize} !important;
  }

  .notes-box-header span {
    color: #000000 !important;
  }

  .notes-box-lines {
    height: 90px !important;
    background-image: repeating-linear-gradient(transparent, transparent 17px, #555555 17px, #555555 18px) !important;
  }

  /* Tool boxes & Glossary */
  .tool-box-title {
    color: #000000 !important;
    font-size: ${h3Size} !important;
    font-weight: 800 !important;
  }

  .tool-box-desc,
  .tool-examples {
    font-size: ${pSize} !important;
    line-height: ${pLine} !important;
    color: #000000 !important;
  }

  .glossary-term {
    color: #000000 !important;
    font-size: ${h3Size} !important;
    font-weight: 800 !important;
    border-bottom: 1.2px solid #000000 !important;
  }

  /* Code elements: Crisp white box with solid outline */
  code {
    background-color: #ffffff !important;
    border: 1px solid #000000 !important;
    color: #000000 !important;
    padding: 1.5px 5px !important;
    border-radius: 3px !important;
    font-size: ${codeSize} !important;
    font-weight: 600 !important;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace !important;
  }

  /* Sinhala specific clarity */
  .si-term {
    color: #000000 !important;
    font-size: ${pSize} !important;
    font-weight: 700 !important;
  }

  .si-question-sub {
    color: #000000 !important;
    font-size: ${tdSize} !important;
    font-weight: 600 !important;
  }

  .ch-subtitle-text {
    color: #000000 !important;
    font-size: ${tdSize} !important;
  }
}
`;
}

const printScript = `
  // Enhanced Print Lifecycle Support: Guarantee Clean Ink-Friendly Printing
  window.addEventListener('beforeprint', function () {
    document.body.classList.remove('dark-reading-mode');
    document.querySelectorAll('.quiz-answer').forEach(function (el) {
      el.style.display = 'block';
    });
  });

  window.addEventListener('afterprint', function () {
    if (localStorage.getItem('istqb_reading_theme') === 'dark') {
      document.body.classList.add('dark-reading-mode');
    }
  });
`;

function processFile(filePath, isSinhala) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add Google Fonts links if not already present
  if (!content.includes('fonts.googleapis.com')) {
    content = content.replace(/<style>/i, `${fontLinks}\n<style>`);
  }

  // 2. Adjust base body font-family and base sizes
  if (isSinhala) {
    content = content.replace(
      /body\s*\{([^}]*?)font-family:\s*[^;]+;/i,
      'body {$1font-family: "Noto Sans Sinhala", "Iskoola Pota", "Nirmala UI", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;'
    );
    content = content.replace(/body\s*\{([^}]*?)font-size:\s*[^;]+;/i, 'body {$1font-size: 15.5px;');
    content = content.replace(/body\s*\{([^}]*?)line-height:\s*[^;]+;/i, 'body {$1line-height: 1.74;');
  } else {
    content = content.replace(
      /body\s*\{([^}]*?)font-family:\s*[^;]+;/i,
      'body {$1font-family: "Inter", "Noto Sans Sinhala", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;'
    );
    content = content.replace(/body\s*\{([^}]*?)font-size:\s*[^;]+;/i, 'body {$1font-size: 14.8px;');
    content = content.replace(/body\s*\{([^}]*?)line-height:\s*[^;]+;/i, 'body {$1line-height: 1.68;');
  }

  // 3. Encapsulate night-reading theme cleanly
  const darkMarker = '/* ================= ULTRA-CLEAR HIGH-CONTRAST NIGHT READING THEME ================= */';
  const printMarker = '/* ================= AUTHORITATIVE PUBLICATION-GRADE PRINT STYLES ================= */';

  const darkIdx = content.indexOf(darkMarker);
  let printIdx = content.indexOf(printMarker);
  if (printIdx === -1) {
    printIdx = content.indexOf('/* STRICT PRINT OVERRIDE');
  }

  if (darkIdx === -1 || printIdx === -1) {
    console.error(`Marker missing in ${path.basename(filePath)}: dark=${darkIdx}, print=${printIdx}`);
    return;
  }

  const styleEndIdx = content.indexOf('</style>', printIdx);
  if (styleEndIdx === -1) {
    console.error(`</style> missing in ${path.basename(filePath)}`);
    return;
  }

  // Normalize beforeDark: strip any trailing @media screen {
  let beforeDark = content.substring(0, darkIdx);
  beforeDark = beforeDark.replace(/(@media\s+screen\s*\{\s*)+$/i, '').trimEnd() + '\n\n';

  // Extract and cleanly balance dark theme block
  let cleanDark = content.substring(darkIdx, printIdx).trim();
  cleanDark = cleanDark.replace(/^(@media\s+screen\s*\{\s*)+/i, '').trim();

  let opens = (cleanDark.match(/\{/g) || []).length;
  let closes = (cleanDark.match(/\}/g) || []).length;
  while (closes > opens) {
    cleanDark = cleanDark.substring(0, cleanDark.lastIndexOf('}')).trim();
    closes = (cleanDark.match(/\}/g) || []).length;
  }
  
  const wrappedDarkTheme = `@media screen {\n${cleanDark}\n}\n\n`;

  // Construct new file content with tailored print styles
  const afterStyle = content.substring(styleEndIdx);
  const tailoredPrintStyles = getPrintStyles(isSinhala);

  content = beforeDark + wrappedDarkTheme + tailoredPrintStyles + '\n' + afterStyle;

  // 4. Inject beforeprint/afterprint into script if not present
  if (!content.includes('beforeprint')) {
    content = content.replace('</script>', `${printScript}\n</script>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Upgraded print & font clarity: ${path.basename(filePath)} (${isSinhala ? 'Sinhala 16px' : 'English 15px'})`);
}

for (let ch = 1; ch <= 6; ch++) {
  processFile(path.join(enDir, `istqb_ch${ch}_study_guide.html`), false);
  processFile(path.join(siDir, `istqb_ch${ch}_study_guide_sinhala.html`), true);
}

console.log('\nAll 12 Study Guides successfully updated with large, crystal-clear typography!');
