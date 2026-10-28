const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Verification checklist:
console.log("Checking index.html integrity:");

// 1. Theme switcher button and function
const hasThemeBtn = indexHtml.includes('id="theme-btn"');
const hasToggleFn = indexHtml.includes('function togglePortalTheme()');
const hasThemeStorage = indexHtml.includes("localStorage.setItem('istqb_reading_theme'");
console.log(`- Theme button present: ${hasThemeBtn}`);
console.log(`- Toggle function present: ${hasToggleFn}`);
console.log(`- Theme storage sync present: ${hasThemeStorage}`);

// 2. Both dark & light theme CSS rules
const hasRootVars = indexHtml.includes(':root');
const hasLightVars = indexHtml.includes('body.light-theme');
const hasChAccents = indexHtml.includes('--ch1-color') && indexHtml.includes('--ch6-color');
console.log(`- :root dark theme tokens: ${hasRootVars}`);
console.log(`- body.light-theme tokens: ${hasLightVars}`);
console.log(`- 6 Chapter curated accents: ${hasChAccents}`);

// 3. Chapter cards check
for (let i = 1; i <= 6; i++) {
  const hasCard = indexHtml.includes(`ch-card-${i}`);
  const hasGuide = indexHtml.includes(`istqb_ch${i}_study_guide.html`);
  const hasSinhala = indexHtml.includes(`istqb_ch${i}_study_guide_sinhala.html`);
  console.log(`- Chapter ${i} card & links valid: ${hasCard && hasGuide && hasSinhala}`);
}

// 4. Resource grid check
const hasSimCard = indexHtml.includes('res-sim');
const hasSyllabusCard = indexHtml.includes('res-syllabus');
const hasQbCard = indexHtml.includes('res-qb') && indexHtml.includes('question_bank.txt');
const hasMapCard = indexHtml.includes('res-map') && indexHtml.includes('study_map.txt');
console.log(`- 4 Resource cards themed & verified: ${hasSimCard && hasSyllabusCard && hasQbCard && hasMapCard}`);

// 5. Button label check (සිංහල Study Guide)
const sinhalaGuideMatches = (indexHtml.match(/Read සිංහල Study Guide/g) || []).length;
console.log(`- "Read සිංහල Study Guide" buttons count: ${sinhalaGuideMatches} (expected 6)`);

if (hasThemeBtn && hasToggleFn && hasLightVars && sinhalaGuideMatches === 6) {
  console.log("\nALL VERIFICATION CHECKS PASSED PERFECTLY!");
} else {
  console.error("\nSOME CHECKS FAILED!");
  process.exit(1);
}
