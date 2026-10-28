const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// Detailed LO definitions from the syllabus
const syl = fs.readFileSync(path.join(__dirname, 'syllabus.txt'), 'utf8');

// Check missing LO sections in Sinhala files
const missingLOs = {
  ch1: ['1.4.2', '1.4.5', '1.5.1', '1.5.2'],
  ch2: ['2.1.6'],
  ch4: ['4.4.1', '4.4.3', '4.5.1', '4.5.2'],
  ch5: ['5.3.3']
};

console.log('--- Checking missing LO text in syllabus ---');
for (const [ch, ids] of Object.entries(missingLOs)) {
  ids.forEach(id => {
    const reg = new RegExp(`FL-${id}\\s*\\(K[123]\\)\\s*([^\\n]+(?:\\n[^\\n]+){1,3})`, 'i');
    const m = syl.match(reg);
    console.log(`[${id}]`, m ? m[0].replace(/\s+/g, ' ') : 'NOT FOUND');
  });
}
