const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const inspectorScript = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  // force dark mode
  document.body.classList.add('dark-reading-mode');

  function rgbValues(str) {
    const m = str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
    if (!m) return [0, 0, 0];
    return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
  }

  function luminance([r, g, b]) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function getEffectiveBg(el) {
    let cur = el;
    while (cur && cur !== document.documentElement) {
      const bg = window.getComputedStyle(cur).backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        return bg;
      }
      cur = cur.parentElement;
    }
    return 'rgb(11, 17, 32)';
  }

  const issues = [];
  const allElements = document.querySelectorAll('body *');

  allElements.forEach(el => {
    // Only elements with direct text or headings/p/li/td/th/span/strong
    if (el.children.length === 0 || ['P','H1','H2','H3','H4','LI','TD','TH','SPAN','STRONG','B','EM','A','CODE'].includes(el.tagName)) {
      const text = (el.innerText || '').trim();
      if (!text || text.length === 0) return;

      const style = window.getComputedStyle(el);
      const color = style.color;
      const bg = getEffectiveBg(el);

      const [cr, cg, cb] = rgbValues(color);
      const [br, bgVal, bb] = rgbValues(bg);

      const l1 = luminance([cr, cg, cb]);
      const l2 = luminance([br, bgVal, bb]);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      // If contrast is poor (< 3.0) or color is very dark text on dark bg
      if (ratio < 3.0 || (cr < 70 && cg < 70 && cb < 70 && br < 50 && bgVal < 50 && bb < 60)) {
        issues.push({
          tag: el.tagName,
          className: el.className,
          inlineStyle: el.getAttribute('style') || '',
          textSnippet: text.slice(0, 50),
          color: color,
          bg: bg,
          contrast: ratio.toFixed(2)
        });
      }
    }
  });

  const resDiv = document.createElement('pre');
  resDiv.id = '__AUDIT_RESULTS__';
  resDiv.textContent = JSON.stringify(issues.slice(0, 60), null, 2);
  document.body.appendChild(resDiv);
});
</script>
`;

function testFile(relPath) {
  const fullPath = path.join(rootDir, relPath);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = html.replace('</head>', `${inspectorScript}</head>`);

  const tempHtml = path.join(rootDir, '06_Build_and_Audit_Tools', 'temp_audit.html');
  fs.writeFileSync(tempHtml, html, 'utf8');

  // Run edge and dump dom
  const outDump = path.join(rootDir, '06_Build_and_Audit_Tools', 'temp_dump.html');
  try {
    execFileSync(edge, [
      '--headless',
      '--disable-gpu',
      `--dump-dom`,
      `file:///${tempHtml.replace(/\\/g, '/')}`
    ], { stdio: ['ignore', fs.openSync(outDump, 'w'), 'ignore'], timeout: 15000 });

    const dumped = fs.readFileSync(outDump, 'utf8');
    const match = dumped.match(/<pre id="__AUDIT_RESULTS__">([\s\S]*?)<\/pre>/);
    if (match) {
      const data = JSON.parse(match[1]);
      console.log(`\n=== Audit for ${relPath} ===`);
      console.log(`Found ${data.length} low-contrast or illegible elements!`);
      data.slice(0, 10).forEach((iss, idx) => {
        console.log(`  [${idx+1}] <${iss.tag} class="${iss.className}"> text: "${iss.textSnippet}"`);
        console.log(`      Color: ${iss.color} | Bg: ${iss.bg} | Contrast: ${iss.contrast}`);
        if (iss.inlineStyle) console.log(`      Inline style: ${iss.inlineStyle}`);
      });
    } else {
      console.log(`No audit results extracted for ${relPath}`);
    }
  } catch (err) {
    console.error(`Error auditing ${relPath}:`, err.message);
  }
}

testFile('02_English_Study_Guides_HTML/istqb_ch1_study_guide.html');
testFile('03_Sinhala_Bilingual_Study_Guides_HTML/istqb_ch1_study_guide_sinhala.html');
testFile('02_English_Study_Guides_HTML/istqb_ch5_study_guide.html');
testFile('03_Sinhala_Bilingual_Study_Guides_HTML/istqb_ch5_study_guide_sinhala.html');
