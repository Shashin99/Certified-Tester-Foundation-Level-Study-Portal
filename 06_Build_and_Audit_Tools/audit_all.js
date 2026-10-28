const fs = require('fs');
const path = require('path');
let rootDir = __dirname;
if (path.basename(rootDir) === '06_Build_and_Audit_Tools') {
  rootDir = path.resolve(__dirname, '..');
}
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');

const files = [
  { ch: 1, name: 'Chapter 1: Fundamentals of Testing', file: path.join(enDir, 'istqb_ch1_study_guide.html'), expectedQ: 14 },
  { ch: 2, name: 'Chapter 2: Testing Throughout SDLC', file: path.join(enDir, 'istqb_ch2_study_guide.html'), expectedQ: 10 },
  { ch: 3, name: 'Chapter 3: Static Testing', file: path.join(enDir, 'istqb_ch3_study_guide.html'), expectedQ: 8 },
  { ch: 4, name: 'Chapter 4: Test Analysis and Design', file: path.join(enDir, 'istqb_ch4_study_guide.html'), expectedQ: 15 },
  { ch: 5, name: 'Chapter 5: Managing Test Activities', file: path.join(enDir, 'istqb_ch5_study_guide.html'), expectedQ: 16 },
  { ch: 6, name: 'Chapter 6: Test Tools', file: path.join(enDir, 'istqb_ch6_study_guide.html'), expectedQ: 8 }
];

let totalIssues = 0;
let totalQuestions = 0;

files.forEach(({ ch, name, file, expectedQ }) => {
  console.log('\n======================================================================');
  console.log(` AUDITING: ${name} (${path.basename(file)})`);
  console.log('======================================================================');
  
  if (!fs.existsSync(file)) {
    console.error(`File NOT found: ${file}`);
    totalIssues++;
    return;
  }
  
  const html = fs.readFileSync(file, 'utf8');
  const parts = html.split('<div class="quiz-card">');
  const qCount = parts.length - 1;
  console.log(`Found ${qCount} questions in ${path.basename(file)} (Expected: ${expectedQ})`);
  
  if (qCount !== expectedQ) {
    console.warn(`WARNING: Expected ${expectedQ} questions, found ${qCount}!`);
    totalIssues++;
  }
  
  for (let i = 1; i < parts.length; i++) {
    totalQuestions++;
    const cardContent = parts[i];
    
    // Question text
    const qMatch = cardContent.match(/<div class="quiz-q">([\s\S]*?)<\/div>/);
    const qText = qMatch ? qMatch[1].replace(/<[^>]+>/g, '').trim() : 'NO QUESTION TEXT FOUND';
    
    // Options
    const optMatches = [...cardContent.matchAll(/<div class="quiz-opt">([\s\S]*?)<\/div>/g)];
    const options = optMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
    
    // Answer
    const ansMatch = cardContent.match(/<strong>Correct Answer:\s*([A-D])<\/strong>/i);
    const ans = ansMatch ? ansMatch[1].toUpperCase() : null;
    
    // Rationale
    const ratMatch = cardContent.match(/<strong>Rationale:<\/strong>([\s\S]*?)(?:<\/div>|$)/i);
    const rationale = ratMatch ? ratMatch[1].replace(/<[^>]+>/g, '').trim() : null;
    
    console.log(`\n[Q${i}] ${qText}`);
    console.log(`     Options: ${options.length} found`);
    options.forEach(opt => console.log(`       ${opt}`));
    console.log(`     Reported Answer: ${ans}`);
    console.log(`     Rationale: ${rationale ? rationale.slice(0, 150) + '...' : 'NONE'}`);
    
    // Validations
    if (!qText || qText === 'NO QUESTION TEXT FOUND') {
      console.error(`     >>> ISSUE: Question text missing in Q${i}`);
      totalIssues++;
    }
    if (options.length !== 4) {
      console.error(`     >>> ISSUE: Question Q${i} has ${options.length} options (expected 4)`);
      totalIssues++;
    }
    if (!ans) {
      console.error(`     >>> ISSUE: Correct Answer missing or malformed in Q${i}`);
      totalIssues++;
    } else {
      const matchedOpt = options.find(o => o.startsWith(ans + ')') || o.startsWith(ans + '.'));
      if (!matchedOpt) {
        console.error(`     >>> ISSUE: Correct Answer ${ans} does NOT match any option starting with ${ans}) in Q${i}!`);
        totalIssues++;
      }
    }
    if (!rationale) {
      console.error(`     >>> ISSUE: Rationale missing in Q${i}`);
      totalIssues++;
    }
  }
});

console.log('\n======================================================================');
console.log(`AUDIT COMPLETE: Audited ${totalQuestions} questions. Found ${totalIssues} issue(s).`);
console.log('======================================================================\n');
