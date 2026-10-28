const fs = require('fs');
const path = require('path');

const files = [
  'istqb_ch1_study_guide.html',
  'istqb_ch2_study_guide.html',
  'istqb_ch3_study_guide.html',
  'istqb_ch4_study_guide.html',
  'istqb_ch5_study_guide.html',
  'istqb_ch6_study_guide.html'
];

let totalQuestions = 0;
let errors = 0;

files.forEach(f => {
  const filePath = path.join(__dirname, '..', '02_English_Study_Guides_HTML', f);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('\n======================================================');
  console.log('AUDITING QUESTIONS FOR: ' + f);
  console.log('======================================================');

  // Split content by quiz-card class
  const segments = content.split('<div class="quiz-card">');
  segments.shift(); // Remove content before first card

  segments.forEach((seg, idx) => {
    // Only process up to the next quiz-card or section boundary
    const cardContent = seg.split('</div>\n    </div>')[0] || seg.split('</div>\r\n    </div>')[0];
    
    const qMatch = cardContent.match(/<div class="quiz-q">([\s\S]*?)<\/div>/);
    const qText = qMatch ? qMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    const ansMatch = cardContent.match(/Correct Answer:\s*([A-D])/i);
    const ans = ansMatch ? ansMatch[1].toUpperCase() : '';

    const optMatches = cardContent.match(/<div class="quiz-opt">([\s\S]*?)<\/div>/g) || [];
    const options = optMatches.map(o => o.replace(/<[^>]+>/g, '').trim());

    const targetOpt = options.find(o => o.startsWith(ans + ')') || o.startsWith(ans + '.'));

    totalQuestions++;
    console.log(`Q${idx+1}: [Ans: ${ans}] ${qText.slice(0, 65)}...`);
    if (!ans) {
      console.error(`   ❌ ERROR: No correct answer identified!`);
      errors++;
    } else if (!targetOpt) {
      console.error(`   ❌ ERROR: Correct answer option ${ans} not found in options!`);
      errors++;
    } else {
      console.log(`   ✅ Correct Choice: ${targetOpt.slice(0, 70)}...`);
    }
  });
});

console.log('\n======================================================');
console.log(`AUDIT FINISHED: Audited ${totalQuestions} questions across 6 study guides.`);
console.log(`Total Errors: ${errors}`);
console.log('======================================================');

if (errors > 0) process.exit(1);
