// Layer 1 (fixed): ground-truth LO map from syllabus  vs  LO references (+K-level) in every HTML guide.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const s = fs.readFileSync(path.join(__dirname, 'syllabus.txt'), 'utf8').replace(/\s+/g, ' ');

const truth = new Map();
let m;
const r = /FL-(\d\.\d+\.\d+)\s*\(K(\d)\)/g;
while ((m = r.exec(s))) truth.set(m[1], +m[2]);
console.log('Syllabus LOs:', truth.size);

let problems = 0;
for (let ch = 1; ch <= 6; ch++) {
  const expected = [...truth.keys()].filter(id => id.startsWith(ch + '.'));
  for (const [tag, fn] of [['EN', `istqb_ch${ch}_study_guide.html`], ['SI', `istqb_ch${ch}_study_guide_sinhala.html`]]) {
    const html = fs.readFileSync(path.join(root, fn), 'utf8');
    const text = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
    const refs = new Map(); // id -> Set(K)
    const rr = /FL-(\d\.\d+\.\d+)(?:\s*\(K(\d)\))?/g;
    let x;
    while ((x = rr.exec(text))) {
      if (!refs.has(x[1])) refs.set(x[1], new Set());
      if (x[2]) refs.get(x[1]).add(+x[2]);
    }
    const missing = expected.filter(id => !refs.has(id));
    const wrongK = expected.filter(id => refs.has(id) && refs.get(id).size && !refs.get(id).has(truth.get(id)))
      .map(id => `${id} syllabus=K${truth.get(id)} guide=K${[...refs.get(id)].join('/')}`);
    const bogus = [...refs.keys()].filter(id => !truth.has(id));
    const status = (!missing.length && !wrongK.length && !bogus.length) ? 'OK ' : 'ISSUE';
    console.log(`[Ch${ch} ${tag}] ${status} expected=${expected.length} referenced=${expected.length - missing.length}`);
    if (missing.length) { problems++; console.log('    MISSING   :', missing.join(', ')); }
    if (wrongK.length) { problems++; console.log('    K MISMATCH:', wrongK.join(' | ')); }
    if (bogus.length) { problems++; console.log('    BOGUS IDs :', bogus.join(', ')); }
  }
}
console.log('\nProblem groups:', problems);
