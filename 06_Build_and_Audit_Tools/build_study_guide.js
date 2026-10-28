/**
 * ISTQB® CTFL v4.0.1 Master Study Guide Compiler
 * Generates publication-grade, print-optimized, ink-friendly PDFs with running headers & page numbers.
 *
 * Usage:
 *   node build_study_guide.js          (Compiles all 6 English chapters)
 *   node build_study_guide.js 1        (Compiles Chapter 1 English)
 *   node build_study_guide.js --sinhala (Compiles all 6 Sinhala chapters)
 *   node build_study_guide.js 1 --sinhala (Compiles Chapter 1 Sinhala)
 *   node build_study_guide.js --all    (Compiles all 12 chapters: English and Sinhala)
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// Automatically locate the project root directory
let rootDir = __dirname;
if (path.basename(rootDir) === '06_Build_and_Audit_Tools') {
  rootDir = path.resolve(__dirname, '..');
}

const htmlEnDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const htmlSiDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');
const pdfDir = path.join(rootDir, '04_Printable_PDF_Study_Guides');
const tempDir = path.join(rootDir, '06_Build_and_Audit_Tools', '.edge-pdf-temp');

const isAll = process.argv.includes('--all');
const isSinhala = process.argv.includes('--sinhala') || process.argv.includes('-si');
const targetArg = process.argv.find(arg => !arg.startsWith('-') && arg !== process.argv[0] && arg !== process.argv[1]);

const guides = [
  { 
    id: 1, 
    htmlEn: 'istqb_ch1_study_guide.html', 
    htmlSi: 'istqb_ch1_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_01_Fundamentals_of_Testing_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_01_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 01: Fundamentals of Testing',
    titleSi: 'පරිච්ඡේදය 01: පරීක්ෂාවේ මූලධර්ම'
  },
  { 
    id: 2, 
    htmlEn: 'istqb_ch2_study_guide.html', 
    htmlSi: 'istqb_ch2_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_02_Testing_Throughout_SDLC_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_02_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 02: Testing Throughout the SDLC',
    titleSi: 'පරිච්ඡේදය 02: SDLC තුළ පරීක්ෂාව'
  },
  { 
    id: 3, 
    htmlEn: 'istqb_ch3_study_guide.html', 
    htmlSi: 'istqb_ch3_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_03_Static_Testing_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_03_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 03: Static Testing',
    titleSi: 'පරිච්ඡේදය 03: ස්ථිතික පරීක්ෂාව'
  },
  { 
    id: 4, 
    htmlEn: 'istqb_ch4_study_guide.html', 
    htmlSi: 'istqb_ch4_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_04_Test_Analysis_and_Design_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_04_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 04: Test Analysis and Design',
    titleSi: 'පරිච්ඡේදය 04: විශ්ලේෂණය සහ සැලසුම්කරණය'
  },
  { 
    id: 5, 
    htmlEn: 'istqb_ch5_study_guide.html', 
    htmlSi: 'istqb_ch5_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_05_Managing_Test_Activities_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_05_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 05: Managing the Test Activities',
    titleSi: 'පරිච්ඡේදය 05: පරීක්ෂණ කළමනාකරණය'
  },
  { 
    id: 6, 
    htmlEn: 'istqb_ch6_study_guide.html', 
    htmlSi: 'istqb_ch6_study_guide_sinhala.html', 
    pdf: 'ISTQB_CTFL_v4.0.1_Chapter_06_Test_Tools_Study_Guide.pdf', 
    pdfSi: 'ISTQB_CTFL_v4.0.1_Chapter_06_Sinhala_Study_Guide.pdf', 
    titleEn: 'Chapter 06: Test Tools',
    titleSi: 'පරිච්ඡේදය 06: පරීක්ෂණ මෙවලම්'
  }
];

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

async function renderPdfViaCDP(htmlPath, outPdfPath, titleText, isSinhalaMode) {
  // Launch isolated headless Edge instance with remote debugging
  const port = 9470 + Math.floor(Math.random() * 50);
  const userDir = path.join(tempDir, `edge_${port}`);

  const proc = spawn(edge, [
    '--headless',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDir}`,
    '--disable-gpu',
    '--disable-extensions',
    '--disable-default-apps',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  try {
    // Poll for Edge to be ready
    let target = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const tabs = await res.json();
        target = tabs.find(t => t.type === 'page') || tabs[0];
        if (target && target.webSocketDebuggerUrl) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 250));
      }
    }

    if (!target) {
      throw new Error(`Failed to connect to Edge CDP on port ${port}`);
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgIdCounter = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgIdCounter++;
        const handler = (evt) => {
          try {
            const msg = JSON.parse(evt.data);
            if (msg.id === id) {
              ws.removeEventListener('message', handler);
              if (msg.error) reject(new Error(msg.error.message));
              else resolve(msg.result);
            }
          } catch (e) {
            reject(e);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');

    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    await send('Page.navigate', { url: fileUrl });

    // Wait for DOM and fonts to settle cleanly
    await new Promise(r => setTimeout(r, 3500));

    // Ensure print mode state
    await send('Runtime.evaluate', {
      expression: `
        document.body.classList.remove('dark-reading-mode');
        document.querySelectorAll('.quiz-answer').forEach(el => el.style.display = 'block');
      `
    });

    // Clean, minimalist header (none) and pure page number footer (no extra text, no divider lines)
    const headerHtml = '<div></div>';

    const footerHtml = `
      <div style="font-size: 10pt; font-family: 'Noto Sans Sinhala', 'Inter', Arial, sans-serif; width: 100%; text-align: center; color: #000000; box-sizing: border-box; margin: 0 auto; -webkit-print-color-adjust: exact; font-weight: 600;">
        <span>${isSinhalaMode ? 'පිටුව ' : 'Page '}<span class="pageNumber"></span> ${isSinhalaMode ? '/ ' : 'of '}<span class="totalPages"></span></span>
      </div>
    `.trim().replace(/\n\s*/g, '');

    const result = await send('Page.printToPDF', {
      displayHeaderFooter: true,
      headerTemplate: headerHtml,
      footerTemplate: footerHtml,
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0.45,
      marginBottom: 0.55,
      marginLeft: 0.4,
      marginRight: 0.4
    });

    fs.writeFileSync(outPdfPath, Buffer.from(result.data, 'base64'));
    const stat = fs.statSync(outPdfPath);
    console.log(`✓ Compiled: ${path.basename(outPdfPath)} (${(stat.size / 1024).toFixed(1)} KB)`);

    ws.close();
  } finally {
    proc.kill();
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch (e) {}
  }
}

async function main() {
  const tasks = [];

  if (isAll) {
    // Compile all 12 guides
    for (const g of guides) {
      tasks.push({ html: path.join(htmlEnDir, g.htmlEn), pdf: path.join(pdfDir, g.pdf), title: g.titleEn, isSi: false, id: g.id });
      tasks.push({ html: path.join(htmlSiDir, g.htmlSi), pdf: path.join(pdfDir, g.pdfSi), title: g.titleSi, isSi: true, id: g.id });
    }
  } else if (targetArg) {
    const g = guides.find(item => item.id.toString() === targetArg);
    if (!g) {
      console.error(`Invalid chapter: "${targetArg}". Valid options are 1 to 6.`);
      process.exit(1);
    }
    if (isSinhala) {
      tasks.push({ html: path.join(htmlSiDir, g.htmlSi), pdf: path.join(pdfDir, g.pdfSi), title: g.titleSi, isSi: true, id: g.id });
    } else {
      tasks.push({ html: path.join(htmlEnDir, g.htmlEn), pdf: path.join(pdfDir, g.pdf), title: g.titleEn, isSi: false, id: g.id });
    }
  } else {
    // Default to either all Sinhala or all English
    for (const g of guides) {
      if (isSinhala) {
        tasks.push({ html: path.join(htmlSiDir, g.htmlSi), pdf: path.join(pdfDir, g.pdfSi), title: g.titleSi, isSi: true, id: g.id });
      } else {
        tasks.push({ html: path.join(htmlEnDir, g.htmlEn), pdf: path.join(pdfDir, g.pdf), title: g.titleEn, isSi: false, id: g.id });
      }
    }
  }

  console.log('='.repeat(76));
  console.log(`  ISTQB® CTFL v4.0.1 MASTER STUDY GUIDE PDF COMPILER`);
  console.log(`  Mode: ${isAll ? 'ALL 12 GUIDES (EN + SI)' : isSinhala ? 'SINHALA' : 'ENGLISH'}`);
  console.log(`  Target Count: ${tasks.length} file(s)`);
  console.log('='.repeat(76));

  for (const t of tasks) {
    console.log(`\nCompiling [Chapter ${t.id} ${t.isSi ? 'Sinhala' : 'English'}] ${t.title}...`);
    try {
      await renderPdfViaCDP(t.html, t.pdf, t.title, t.isSi);
    } catch (err) {
      console.error(`✗ Failed compiling ${path.basename(t.pdf)}:`, err.message);
    }
  }

  // Cleanup top-level temp dir
  try {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (e) {}

  console.log('\n' + '='.repeat(76));
  console.log('  PDF Compilation Completed Successfully!');
  console.log('='.repeat(76));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
