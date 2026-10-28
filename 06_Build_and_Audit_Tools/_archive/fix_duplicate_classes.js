const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [];
for (let i = 1; i <= 6; i++) {
  files.push(`02_English_Study_Guides_HTML/istqb_ch${i}_study_guide.html`);
  files.push(`03_Sinhala_Bilingual_Study_Guides_HTML/istqb_ch${i}_study_guide_sinhala.html`);
}

let totalFixed = 0;

files.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Regex to match consecutive class attributes
  const regex = /class="([^"]*)"\s+class="([^"]*)"/g;
  let fileFixes = 0;

  while (regex.test(content)) {
    content = content.replace(regex, (match, c1, c2) => {
      fileFixes++;
      const set = new Set((c1 + ' ' + c2).split(/\s+/).filter(Boolean));
      const merged = Array.from(set).join(' ');
      return `class="${merged}"`;
    });
  }

  if (fileFixes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${fileFixes} duplicate class attributes in ${relPath}`);
    totalFixed += fileFixes;
  }
});

console.log(`\nCompleted: Total ${totalFixed} duplicate class attributes fixed.`);
