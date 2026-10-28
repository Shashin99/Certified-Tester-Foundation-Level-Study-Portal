const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const siPdfs = [
  'ISTQB_CTFL_v4.0.1_Chapter_01_Sinhala_Study_Guide.pdf',
  'ISTQB_CTFL_v4.0.1_Chapter_02_Sinhala_Study_Guide.pdf',
  'ISTQB_CTFL_v4.0.1_Chapter_03_Sinhala_Study_Guide.pdf',
  'ISTQB_CTFL_v4.0.1_Chapter_04_Sinhala_Study_Guide.pdf',
  'ISTQB_CTFL_v4.0.1_Chapter_05_Sinhala_Study_Guide.pdf',
  'ISTQB_CTFL_v4.0.1_Chapter_06_Sinhala_Study_Guide.pdf'
];

for (let ch = 1; ch <= 6; ch++) {
  const siPdf = siPdfs[ch - 1];
  const oldBtn = new RegExp(`(<a href="04_Printable_PDF_Study_Guides/[^"]+" class="btn-action btn-pdf format-btn" data-fmt="pdf" target="_blank">\\s*<span>)📄 Open Printable PDF(</span>\\s*<span>↗</span>\\s*</a>)`);
  
  if (content.match(oldBtn)) {
    const replacement = `$1📄 English Printable PDF$2\n          <a href="04_Printable_PDF_Study_Guides/${siPdf}" class="btn-action btn-pdf format-btn" data-fmt="pdf" target="_blank" style="background:#064e3b; border-color:#059669; color:#ecfdf5 !important;">\n            <span>📄 සිංහල Printable PDF</span> <span>↗</span>\n          </a>`;
    content = content.replace(oldBtn, replacement);
  }
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✓ Added Sinhala PDF buttons to all cards in index.html');
