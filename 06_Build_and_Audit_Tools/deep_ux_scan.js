const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [
  'index.html',
  'study_map.html',
  '05_Practice_Questions_and_Summaries/question_bank.html',
  '05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html'
];
for (let i = 1; i <= 6; i++) {
  files.push(`02_English_Study_Guides_HTML/istqb_ch${i}_study_guide.html`);
  files.push(`03_Sinhala_Bilingual_Study_Guides_HTML/istqb_ch${i}_study_guide_sinhala.html`);
}

console.log('====================================================');
console.log('   DEEP UX & CODE HYGIENE AUDIT ACROSS ALL 16 PAGES');
console.log('====================================================\n');

let totalIssues = 0;

files.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  console.log(`Checking [${relPath}]...`);

  // Check 1: Duplicate class attribute
  const dupClass = content.match(/class="[^"]*"\s+class="[^"]*"/g);
  if (dupClass) {
    console.log(`  ⚠️ Duplicate class attribute found: ${dupClass.length} occurrences`);
    dupClass.slice(0, 3).forEach(d => console.log(`     - ${d}`));
    totalIssues += dupClass.length;
  }

  // Check 2: Back to Top button
  const hasBackToTop = content.includes('floating-btn') || content.includes('btn-back-to-top') || content.includes('scrollTo({top:0') || content.includes('scrollToTop');
  if (!hasBackToTop) {
    console.log(`  💡 Missing Back-to-Top floating button`);
  }

  // Check 3: Check if viewport is configured
  if (!content.includes('viewport')) {
    console.log(`  ❌ Missing viewport meta tag!`);
    totalIssues++;
  }

  // Check 4: Title tag presence and quality
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    console.log(`  ❌ Missing <title> tag!`);
    totalIssues++;
  }

  // Check 5: Check for unescaped ampersands or malformed tags
  const malformedTags = (content.match(/<[a-z0-9]+\s+[^>]*<[a-z0-9]+/gi) || [])
    .filter(t => !t.includes('data:image/svg+xml,<svg'));
  if (malformedTags.length > 0) {
    console.log(`  ⚠️ Potential malformed nested tag opener:`, malformedTags.slice(0, 2));
    totalIssues += malformedTags.length;
  }
});

console.log(`\nAudit completed with ${totalIssues} structural issues flagged.`);
