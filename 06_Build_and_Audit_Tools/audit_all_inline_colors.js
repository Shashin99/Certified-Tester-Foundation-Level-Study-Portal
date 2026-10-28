const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dirs = ['02_English_Study_Guides_HTML', '03_Sinhala_Study_Guides_HTML'];

const colorCounts = {};

dirs.forEach(dir => {
  const fullDir = path.join(rootDir, dir);
  fs.readdirSync(fullDir).filter(f => f.endsWith('.html') && f !== 'index.html').forEach(f => {
    const content = fs.readFileSync(path.join(fullDir, f), 'utf8');
    const matches = [...content.matchAll(/style="[^"]*"/gi)];
    matches.forEach(m => {
      const st = m[0];
      const colorMatch = st.match(/color:\s*([^;"]+)/i);
      if (colorMatch) {
        const val = colorMatch[1].trim().toLowerCase();
        colorCounts[val] = (colorCounts[val] || 0) + 1;
      }
      const bgMatch = st.match(/background(-color)?:\s*([^;"]+)/i);
      if (bgMatch) {
        const val = bgMatch[2].trim().toLowerCase();
        colorCounts['bg:' + val] = (colorCounts['bg:' + val] || 0) + 1;
      }
    });
  });
});

console.log('All inline colors and backgrounds across all 12 files:');
console.log(JSON.stringify(colorCounts, null, 2));
