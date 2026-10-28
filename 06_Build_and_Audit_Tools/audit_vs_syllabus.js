/**
 * Full cross-audit: Official Syllabus v4.0.1  vs  English/Sinhala HTML + PDFs.
 * Checks (per chapter): Learning Objective IDs, K-level badges, official keywords.
 * Requires _audit/syllabus.txt (run syllabus_extract.js first).
 */
const fs = require('fs');
const path = require('path');
const pdf = require(path.join(__dirname, '_audit', 'node_modules', 'pdf-parse'));

const root = path.resolve(__dirname, '..');
const syl = fs.readFileSync(path.join(__dirname, '_audit', 'syllabus.txt'), 'utf8');

// ---- parse official syllabus ----
const official = {};
for (let ch = 1; ch <= 6; ch++) {
  const loIdx = syl.indexOf(`Learning Objectives for Chapter ${ch}:`);
  if (loIdx < 0) { console.log('!! no LO block for chapter', ch); continue; }
  const kwIdx = syl.lastIndexOf('Keywords', loIdx);
  const kwBlock = syl.slice(kwIdx + 'Keywords'.length, loIdx);
  const endIdx = syl.indexOf('Certified Tester', loIdx);
  const loBlock = syl.slice(loIdx, endIdx);
  const keywords = kwBlock.replace(/\s+/g, ' ').split(',').map(s => s.trim()).filter(Boolean);
  const los = [...loBlock.matchAll(/(FL-\d\.\d\.\d)\s*\(K(\d)\)\s*([^\n]+)/g)].map(x => ({ id: x[1], k: x[2], text: x[3].trim() }));
  official[ch] = { keywords, los };
}

const norm = s => s.toLowerCase().replace(/[‐-―–-]/g, '-').replace(/\s+/g, ' ');
const stripHtml = h => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&bull;/g, '•');

function auditDoc(label, ch, text, rawHtml) {
  const o = official[ch];
  const n = norm(text);
  const missingLO = o.los.filter(l => !text.includes(l.id)).map(l => l.id);
  const missingKw = o.keywords.filter(k => !n.includes(norm(k)) && !n.includes(norm(k).replace(/-/g, ' ')));
  let kMismatch = [];
  if (rawHtml) {
    o.los.forEach(l => {
      const re = new RegExp(`badge-k(\\d)[^>]*>\\s*${l.id}`);
      const m = rawHtml.match(re);
      if (m && m[1] !== l.k) kMismatch.push(`${l.id}: guide=K${m[1]} official=K${l.k}`);
    });
  }
  const ok = !missingLO.length && !missingKw.length && !kMismatch.length;
  console.log(`${ok ? '[OK]  ' : '[GAP] '} ${label}  LOs ${o.los.length - missingLO.length}/${o.los.length}  KW ${o.keywords.length - missingKw.length}/${o.keywords.length}`);
  if (missingLO.length) console.log('      missing LO IDs :', missingLO.join(', '));
  if (missingKw.length) console.log('      missing keywords:', missingKw.join(', '));
  if (kMismatch.length) console.log('      K-level mismatch:', kMismatch.join('; '));
  return { label, missingLO, missingKw, kMismatch };
}

(async () => {
  console.log('Official syllabus parsed:');
  for (let ch = 1; ch <= 6; ch++) console.log(`  Ch${ch}: ${official[ch].los.length} LOs, ${official[ch].keywords.length} keywords`);
  const total = Object.values(official).reduce((a, o) => a + o.los.length, 0);
  console.log('  Total LOs:', total, '\n');

  const dirs = [
    ['EN-HTML', '02_English_Study_Guides_HTML', ch => `istqb_ch${ch}_study_guide.html`],
    ['SI-HTML', '03_Sinhala_Bilingual_Study_Guides_HTML', ch => `istqb_ch${ch}_study_guide_sinhala.html`]
  ];
  const results = [];
  for (const [tag, dir, fn] of dirs) {
    console.log(`=== ${tag} ===`);
    for (let ch = 1; ch <= 6; ch++) {
      const raw = fs.readFileSync(path.join(root, dir, fn(ch)), 'utf8');
      results.push(auditDoc(`${tag} Ch${ch}`, ch, stripHtml(raw), raw));
    }
  }

  console.log('\n=== PDFs ===');
  const pdfDir = path.join(root, '04_Printable_PDF_Study_Guides');
  const pdfs = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));
  for (const f of pdfs) {
    const m = f.match(/Chapter_0(\d)/);
    if (!m) { console.log('(skip)', f); continue; }
    const d = await pdf(fs.readFileSync(path.join(pdfDir, f)));
    results.push(auditDoc(f.replace('ISTQB_CTFL_v4.0.1_', '').replace('.pdf', ''), +m[1], d.text, null));
  }

  fs.writeFileSync(path.join(__dirname, '_audit', 'audit_results.json'), JSON.stringify(results, null, 2));
  const gaps = results.filter(r => r.missingLO.length || r.missingKw.length || r.kMismatch.length).length;
  console.log(`\nDocuments audited: ${results.length} | with gaps: ${gaps}`);
})();
