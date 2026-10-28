/**
 * Clean Base CSS and Inline Styles across all 12 Study Guide HTML files
 * 1. Strips all disruptive !important declarations from screen base CSS (before .footer-note).
 * 2. Replaces hardcoded dark inline colors (#111827, #374151, #4b5563) with semantic CSS classes.
 * 3. Prepares the files for the unified high-contrast theme system.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dirs = ['02_English_Study_Guides_HTML', '03_Sinhala_Study_Guides_HTML'];

dirs.forEach(dir => {
  const fullDir = path.join(rootDir, dir);
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html') && f !== 'index.html');

  files.forEach(fileName => {
    const filePath = path.join(fullDir, fileName);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove !important from base CSS (everything before .footer-note or ISTQB STUDY NAVIGATOR)
    const splitPoint = content.includes('/* ================= ISTQB STUDY NAVIGATOR')
      ? '/* ================= ISTQB STUDY NAVIGATOR'
      : '.footer-note';

    const parts = content.split(splitPoint);
    if (parts.length >= 2) {
      let baseCSS = parts[0];
      
      // Strip !important from base declarations
      baseCSS = baseCSS.replace(/background:\s*#ffffff\s*!important;/g, 'background: #ffffff;');
      baseCSS = baseCSS.replace(/color:\s*#000000\s*!important;/g, 'color: #1e293b;');
      baseCSS = baseCSS.replace(/border-left:\s*4px solid #000000\s*!important;/g, 'border-left: 4px solid #3b82f6;');
      baseCSS = baseCSS.replace(/background:\s*#fafafa\s*!important;/g, 'background: #f8fafc;');
      baseCSS = baseCSS.replace(/border-left-color:\s*#000000\s*!important;/g, 'border-left-color: #3b82f6;');
      baseCSS = baseCSS.replace(/border-left-color:\s*#374151\s*!important;/g, 'border-left-color: #f59e0b;');
      baseCSS = baseCSS.replace(/background:\s*#f3f4f6\s*!important;/g, 'background: #f1f5f9;');
      baseCSS = baseCSS.replace(/tr:nth-child\(even\)\s*\{\s*background-color:\s*#fafafa\s*!important;\s*\}/g, 'tr:nth-child(even) { background-color: #f8fafc; }');
      baseCSS = baseCSS.replace(/background-color:\s*#fafafa\s*!important;/g, 'background-color: #f8fafc;');
      baseCSS = baseCSS.replace(/color:\s*#111827\s*!important;/g, 'color: #0f172a;');
      baseCSS = baseCSS.replace(/color:\s*#374151\s*!important;/g, 'color: #475569;');
      baseCSS = baseCSS.replace(/background:\s*#f9fafb\s*!important;/g, 'background: #f8fafc;');
      
      // Any remaining !important in baseCSS
      baseCSS = baseCSS.replace(/;\s*!important/g, ';');
      baseCSS = baseCSS.replace(/\s*!important;/g, ';');

      content = baseCSS + splitPoint + parts.slice(1).join(splitPoint);
    }

    // 2. Clean inline hardcoded colors on elements
    // Headings
    content = content.replace(/color:\s*#111827;\s*margin:\s*0;\s*text-transform:\s*uppercase;/g, 'margin: 0; text-transform: uppercase;');
    content = content.replace(/border-bottom:\s*2\.5px solid #111827;/g, 'border-bottom: 2.5px solid #2563eb;');
    
    // Sinhala question subtext
    content = content.replace(/style="font-weight:\s*normal;\s*font-size:\s*12\.8px;\s*color:\s*#374151;"/g, 'class="si-question-sub"');
    content = content.replace(/style="font-size:\s*12px;\s*color:\s*#4b5563;\s*margin-top:\s*3px;\s*margin-bottom:\s*0;"/g, 'class="ch-subtitle-text"');
    
    // Strong tags with inline color #111827
    content = content.replace(/<strong style="color:\s*#111827;">/g, '<strong>');
    content = content.replace(/<span style="color:\s*#374151;">/g, '<span>');
    content = content.replace(/<span style="color:\s*#111827;">/g, '<span>');

    // Card border-left #4b5563
    content = content.replace(/style="border-left:\s*4px solid #4b5563;\s*margin-bottom:\s*6px;"/g, 'class="card card-accent-left"');
    content = content.replace(/style="border-left:\s*3\.5px solid #4b5563;"/g, 'class="card card-accent-left"');
    content = content.replace(/style="border-left:\s*4px solid #4b5563;"/g, 'class="card card-accent-left"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Cleaned base CSS & inline styles: ${fileName}`);
  });
});

console.log('\nAll 12 HTML files successfully cleaned of restrictive inline & base styles!');
