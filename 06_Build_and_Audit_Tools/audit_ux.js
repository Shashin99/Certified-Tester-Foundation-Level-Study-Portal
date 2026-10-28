const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

const pages = [
  'index.html',
  'study_map.html',
  '05_Practice_Questions_and_Summaries/question_bank.html',
  '05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html'
];
for (let i = 1; i <= 6; i++) {
  pages.push(`02_English_Study_Guides_HTML/istqb_ch${i}_study_guide.html`);
  pages.push(`03_Sinhala_Study_Guides_HTML/istqb_ch${i}_study_guide_sinhala.html`);
}

console.log(`Auditing UX aspects across ${pages.length} pages:\n`);

const issues = [];

pages.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`MISSING FILE: ${relPath}`);
    issues.push(`File missing: ${relPath}`);
    return;
  }
  const html = fs.readFileSync(fullPath, 'utf8');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || 'NO TITLE';
  const hasThemeSync = html.includes('istqb_reading_theme');
  const hasThemeToggle = html.includes('toggleTheme') || html.includes('togglePortalTheme') || html.includes('toggleReadingTheme');
  const hasBackToTop = html.includes('btn-back-to-top') || html.includes('floating-btn') || html.includes('scrollTo({top:0') || html.includes('scrollToTop');
  const hasFavicon = html.includes('rel="icon"');
  const hasHomeLink = relPath === 'index.html' || html.includes('index.html');
  const hasMetaViewport = html.includes('name="viewport"');

  console.log(`[${relPath}]`);
  console.log(`  Title: ${title.trim()}`);
  console.log(`  Theme Sync: ${hasThemeSync} | Toggle: ${hasThemeToggle} | Back-to-Top: ${hasBackToTop} | Favicon: ${hasFavicon} | Home Link: ${hasHomeLink} | Mobile Viewport: ${hasMetaViewport}`);

  if (!hasThemeSync) issues.push(`${relPath}: Missing theme localStorage sync`);
  if (!hasThemeToggle) issues.push(`${relPath}: Missing theme toggle`);
  if (!hasFavicon) issues.push(`${relPath}: Missing favicon`);
  if (!hasHomeLink) issues.push(`${relPath}: Missing Home navigation link`);
  if (!hasMetaViewport) issues.push(`${relPath}: Missing viewport meta tag`);
});

console.log('\n--- AUDIT SUMMARY ---');
console.log(`Total issues identified: ${issues.length}`);
issues.forEach(iss => console.log(' - ' + iss));
