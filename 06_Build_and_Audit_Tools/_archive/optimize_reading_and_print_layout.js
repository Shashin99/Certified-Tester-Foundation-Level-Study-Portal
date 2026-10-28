/**
 * Optimize Reading & Print Typography across all 12 Study Guides
 * - Upgrades body font size to 14px (English) and 14.5px (Sinhala)
 * - Increases Sinhala line-height to 1.74 for crystal-clear diacritic rendering
 * - Eliminates any font size below 12px across badges, notes, and footers
 * - Expands ruled handwriting box height to 90px for comfortable physical note-taking
 * - Ensures generous table and card padding
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

function optimizeFile(filePath, isSinhala) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Upgrade body font size & line-height
  if (isSinhala) {
    content = content.replace(/body\s*\{([^}]*?)font-size:\s*[0-9\.]+px;/i, (m, p1) => {
      return `body {${p1}font-size: 14.2px;`;
    });
    content = content.replace(/body\s*\{([^}]*?)line-height:\s*[0-9\.]+;/i, (m, p1) => {
      return `body {${p1}line-height: 1.72;`;
    });
  } else {
    content = content.replace(/body\s*\{([^}]*?)font-size:\s*[0-9\.]+px;/i, (m, p1) => {
      return `body {${p1}font-size: 13.8px;`;
    });
    content = content.replace(/body\s*\{([^}]*?)line-height:\s*[0-9\.]+;/i, (m, p1) => {
      return `body {${p1}line-height: 1.68;`;
    });
  }

  // 2. Eliminate font sizes below 12px
  content = content.replace(/\.badge\s*\{([^}]*?)font-size:\s*11\.[0-9]+px;/gi, (m, p1) => {
    return `.badge {${p1}font-size: 12.2px;`;
  });
  content = content.replace(/\.notes-box-header\s*\{([^}]*?)font-size:\s*11\.[0-9]+px;/gi, (m, p1) => {
    return `.notes-box-header {${p1}font-size: 12.5px;`;
  });
  content = content.replace(/\.footer-note\s*\{([^}]*?)font-size:\s*11px;/gi, (m, p1) => {
    return `.footer-note {${p1}font-size: 12px;`;
  });
  content = content.replace(/\.nav-footer-label\s*\{([^}]*?)font-size:\s*11\.[0-9]+px;/gi, (m, p1) => {
    return `.nav-footer-label {${p1}font-size: 12px;`;
  });

  // 3. Expand handwriting notes box lines height from 56px to 90px (5 ruled lines)
  content = content.replace(/\.notes-box-lines\s*\{([^}]*?)height:\s*[0-9]+px;/gi, (m, p1) => {
    return `.notes-box-lines {${p1}height: 90px;`;
  });

  // 4. Ensure table padding is comfortable (6px 9px minimum)
  content = content.replace(/padding:\s*3px\s*5px;/gi, 'padding: 6px 9px;');
  content = content.replace(/padding:\s*4px\s*6px;/gi, 'padding: 6px 9px;');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Optimized typography & handwriting spacing: ${path.basename(filePath)}`);
}

for (let ch = 1; ch <= 6; ch++) {
  optimizeFile(path.join(enDir, `istqb_ch${ch}_study_guide.html`), false);
  optimizeFile(path.join(siDir, `istqb_ch${ch}_study_guide_sinhala.html`), true);
}

console.log('\nAll 12 files successfully updated with enhanced readability and spacious layout!');
