const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const files = [];
for (let i = 1; i <= 6; i++) {
  files.push(`02_English_Study_Guides_HTML/istqb_ch${i}_study_guide.html`);
  files.push(`03_Sinhala_Bilingual_Study_Guides_HTML/istqb_ch${i}_study_guide_sinhala.html`);
}

let updatedCount = 0;

files.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  const target = '<a href="../05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html" class="study-nav-pill" style="background: #064e3b; color: #a7f3d0 !important; border: 1px solid #059669;" title="Launch Official 40-Question Mock Exam Simulator">🎯 40Q Simulator</a>';
  const replacement = `${target}<a href="../study_map.html" class="study-nav-pill" title="Library Index & Master Study Roadmap">🗺️ Roadmap</a>`;

  if (content.includes(target) && !content.includes('study_map.html')) {
    content = content.replace(target, replacement);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Added Roadmap link to ${relPath}`);
    updatedCount++;
  }
});

console.log(`\nUpdated ${updatedCount} guides with Roadmap navigation.`);
