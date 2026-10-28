const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enFiles = fs.readdirSync(path.join(rootDir, '02_English_Study_Guides_HTML'))
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(rootDir, '02_English_Study_Guides_HTML', f));

const siFiles = fs.readdirSync(path.join(rootDir, '03_Sinhala_Study_Guides_HTML'))
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(rootDir, '03_Sinhala_Study_Guides_HTML', f));

const allFiles = [...enFiles, ...siFiles];

console.log(`Auditing ${allFiles.length} files...`);

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const filename = path.basename(file);
  
  // Find inline styles with color or background
  const inlineStyles = content.match(/style="[^"]*"/gi) || [];
  let darkTextCount = 0;
  let darkBgCount = 0;
  let darkTextExamples = [];
  
  for (const st of inlineStyles) {
    if (/color:\s*(#000|#111|#222|#333|#1e293b|#0f172a|#374151|#4b5563|black)/i.test(st)) {
      darkTextCount++;
      if (darkTextExamples.length < 3) darkTextExamples.push(st);
    }
    if (/background(-color)?:\s*(#fff|#f8fafc|#f1f5f9|#ffffff|white)/i.test(st)) {
      darkBgCount++;
    }
  }

  // Check table styles
  const tableTags = content.match(/<table[^>]*>/gi) || [];
  
  // Check if dark CSS is present
  const hasDarkCSS = content.includes('/* ================= ULTRA-CLEAR NIGHT READING THEME ================= */');
  
  console.log(`\nFile: ${filename}`);
  console.log(`  Dark CSS included: ${hasDarkCSS}`);
  console.log(`  Inline dark color count: ${darkTextCount}`);
  if (darkTextExamples.length > 0) {
    console.log(`  Sample inline dark styles: ${JSON.stringify(darkTextExamples)}`);
  }
  console.log(`  Inline light background count: ${darkBgCount}`);
  console.log(`  Table count: ${tableTags.length}`);
}
