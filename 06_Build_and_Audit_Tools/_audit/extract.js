// Extracts per-page text from the official syllabus PDF and from every study-guide PDF.
// Output: _audit/syllabus.txt (with page markers) and _audit/<name>.txt for each guide.
const fs = require('fs');
const path = require('path');

(async () => {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs').catch(() => null)
    || require('pdfjs-dist/legacy/build/pdf.js');
  const lib = pdfjs.getDocument ? pdfjs : pdfjs.default;

  async function extract(file) {
    const data = new Uint8Array(fs.readFileSync(file));
    const doc = await lib.getDocument({ data, useSystemFonts: true, verbosity: 0 }).promise;
    let out = '';
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      let line = '', lastY = null;
      for (const it of tc.items) {
        const y = Math.round(it.transform[5]);
        if (lastY !== null && Math.abs(y - lastY) > 2) { out += line.trimEnd() + '\n'; line = ''; }
        line += it.str + (it.hasEOL ? '\n' : '');
        lastY = y;
      }
      out += line.trimEnd() + '\n';
      out += `\n=====PAGE ${p}=====\n`;
    }
    return { text: out, pages: doc.numPages };
  }

  const root = path.resolve(__dirname, '..');
  const files = fs.readdirSync(root).filter(f => f.toLowerCase().endsWith('.pdf'));
  for (const f of files) {
    const { text, pages } = await extract(path.join(root, f));
    const outName = f === 'ISTQB_CTFL_Syllabus_v4.0.1.pdf' ? 'syllabus.txt'
      : f.replace(/ISTQB_CTFL_v4\.0\.1_/, '').replace(/\.pdf$/, '') + '.txt';
    fs.writeFileSync(path.join(__dirname, outName), text, 'utf8');
    console.log(`${f} -> ${outName} | pages=${pages} chars=${text.length}`);
  }
})().catch(e => { console.error('ERR', e); process.exit(1); });
