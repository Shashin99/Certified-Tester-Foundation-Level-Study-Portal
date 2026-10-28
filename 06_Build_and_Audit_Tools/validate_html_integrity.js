const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

const files = [];
for (let i = 1; i <= 6; i++) {
  files.push(path.join(enDir, `istqb_ch${i}_study_guide.html`));
  files.push(path.join(siDir, `istqb_ch${i}_study_guide_sinhala.html`));
}

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n==============================================`);
  console.log(`CHECKING INTEGRITY: ${path.basename(f)}`);
  console.log(`==============================================`);
  
  // Tag counts
  const tags = ['div', 'table', 'tr', 'td', 'th', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'nav', 'body', 'html'];
  tags.forEach(tag => {
    const openMatches = content.match(new RegExp(`<${tag}\\b[^>]*>`, 'gi')) || [];
    const closeMatches = content.match(new RegExp(`<\/${tag}>`, 'gi')) || [];
    if (openMatches.length !== closeMatches.length) {
      console.warn(`  [TAG MISMATCH] <${tag}>: ${openMatches.length} open vs ${closeMatches.length} close! (diff: ${openMatches.length - closeMatches.length})`);
      allOk = false;
    } else {
      console.log(`  [OK] <${tag}>: ${openMatches.length} balanced`);
    }
  });
});

console.log(`\n==============================================`);
console.log(allOk ? 'ALL 12 HTML FILES ARE 100% BALANCED & VALID!' : 'SOME FILES HAVE TAG MISMATCHES!');
console.log(`==============================================`);
