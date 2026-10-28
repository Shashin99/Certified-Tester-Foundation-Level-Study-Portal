const fs = require('fs');
const path = require('path');

let rootDir = __dirname;
if (path.basename(rootDir) === '06_Build_and_Audit_Tools') {
  rootDir = path.resolve(__dirname, '..');
}
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');

const files = [
  'istqb_ch1_study_guide.html',
  'istqb_ch2_study_guide.html',
  'istqb_ch3_study_guide.html',
  'istqb_ch4_study_guide.html',
  'istqb_ch5_study_guide.html',
  'istqb_ch6_study_guide.html'
];

let totalIssues = 0;

files.forEach(f => {
  console.log(`\n======================================================`);
  console.log(`SCANNING: ${f}`);
  console.log(`======================================================`);
  const filePath = path.join(enDir, f);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Title tag check
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  console.log('Title: ' + (titleMatch ? titleMatch[1].trim() : 'NONE'));

  // 2. Check placeholders
  const placeholders = ['TODO', 'TBD', 'undefined', 'NaN', 'FIXME', 'XXX'];
  placeholders.forEach(ph => {
    const regex = new RegExp(`\\b${ph}\\b`, 'g');
    const matches = content.match(regex);
    if (matches) {
      console.warn(`  [WARN] Placeholder found: "${ph}" (${matches.length} times)`);
      totalIssues++;
    }
  });

  // 3. Repeated words in text
  // Remove tags first
  const cleanText = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/&[a-z0-9#]+;/gi, ' ');
  
  const doubleWords = cleanText.match(/\b(the|is|in|of|and|to|that|with|for|as|on|at|by)\s+\1\b/gi) || [];
  if (doubleWords.length > 0) {
    console.warn(`  [WARN] Duplicate adjacent words found: ${doubleWords.join(', ')}`);
    totalIssues += doubleWords.length;
  } else {
    console.log('  [OK] No duplicate adjacent words found');
  }

  // 4. Broken HTML entities check (e.g. &nbsp or &amp without semicolon)
  const brokenEntities = content.match(/&[a-z0-9]{2,8}(?![a-z0-9;])/gi) || [];
  if (brokenEntities.length > 0) {
    console.warn(`  [WARN] Possible unclosed HTML entities: ${brokenEntities.slice(0, 5).join(', ')}`);
    totalIssues += brokenEntities.length;
  } else {
    console.log('  [OK] HTML entities well-formed');
  }

  // 5. Check if any question doesn't have an explanation for all options
  const parts = content.split('<div class="quiz-card">');
  for (let i = 1; i < parts.length; i++) {
    const card = parts[i];
    const ratMatch = card.match(/<strong>Rationale:<\/strong>([\s\S]*?)(?:<\/div>|$)/i);
    const rat = ratMatch ? ratMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (rat.length < 50) {
      console.warn(`  [WARN] Q${i} has very short rationale (${rat.length} chars): "${rat}"`);
      totalIssues++;
    }
  }
});

console.log(`\n======================================================`);
console.log(`DEEP SCAN FINISHED: ${totalIssues} potential issue(s) detected.`);
console.log(`======================================================\n`);
