const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function walk(d) {
  let res = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (f === 'node_modules' || f === '.git' || f === '.tempmediaStorage' || f === 'scratch') continue;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (/\.html$/.test(f)) res.push(p);
  }
  return res;
}

const htmlFiles = walk(rootDir);
console.log(`Checking links across ${htmlFiles.length} HTML files...`);

let brokenLinks = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  // Match href="..." and src="..."
  const linkMatches = [...content.matchAll(/(?:href|src)=["']([^"'#]+)(?:#[^"']*)?["']/g)];
  
  for (const m of linkMatches) {
    const rawTarget = m[1].trim();
    if (!rawTarget || rawTarget.startsWith('http://') || rawTarget.startsWith('https://') || rawTarget.startsWith('javascript:') || rawTarget.startsWith('mailto:') || rawTarget.startsWith('data:')) {
      continue;
    }

    const resolved = path.resolve(dir, rawTarget);
    if (!fs.existsSync(resolved)) {
      console.log(`[BROKEN LINK] in ${path.relative(rootDir, file)}: -> ${rawTarget} (Resolved: ${resolved})`);
      brokenLinks++;
    }
  }
}

console.log(`\nScan finished. Total broken links found: ${brokenLinks}`);
