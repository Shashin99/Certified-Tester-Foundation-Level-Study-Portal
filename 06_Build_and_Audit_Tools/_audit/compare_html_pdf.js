const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const pdfNames = [
  'Chapter_01_Fundamentals_of_Testing_Study_Guide',
  'Chapter_02_Testing_Throughout_SDLC_Study_Guide',
  'Chapter_03_Static_Testing_Study_Guide',
  'Chapter_04_Test_Analysis_and_Design_Study_Guide',
  'Chapter_05_Managing_Test_Activities_Study_Guide',
  'Chapter_06_Test_Tools_Study_Guide'
];

console.log('=== Comparing English HTML with PDF text ===');
for (let ch = 1; ch <= 6; ch++) {
  const html = fs.readFileSync(path.join(root, `istqb_ch${ch}_study_guide.html`), 'utf8');
  const pdfTxt = fs.readFileSync(path.join(__dirname, pdfNames[ch - 1] + '.txt'), 'utf8');
  
  // Strip tags and normalize spaces
  const htmlClean = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ');
  const pdfClean = pdfTxt.replace(/\s+/g, ' ');
  
  console.log(`\nCh${ch}: HTML chars=${htmlClean.length} | PDF chars=${pdfClean.length}`);
  
  // Check if questions are in both
  const qHtmlMatches = (html.match(/Question \d/g) || []).length;
  const qPdfMatches = (pdfTxt.match(/Question \d/g) || []).length;
  console.log(`   Questions count: HTML=${qHtmlMatches}, PDF=${qPdfMatches}`);
  
  // Check for any major section in HTML that is missing in PDF
  const h3Matches = [...html.matchAll(/<h3>([^<]+)<\/h3>/g)].map(m => m[1].trim());
  const missingInPdf = h3Matches.filter(h => {
    // extract section number like 1.1 or title
    const cleanH = h.split('<')[0].replace(/[^\w\s.]/g, '').trim();
    return cleanH.length > 5 && !pdfTxt.includes(cleanH.slice(0, 15));
  });
  if (missingInPdf.length > 0) {
    console.log(`   H3 sections possibly missing in PDF:`, missingInPdf);
  } else {
    console.log(`   All H3 sections present in PDF text!`);
  }
}
