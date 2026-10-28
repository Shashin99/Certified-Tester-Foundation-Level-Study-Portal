/**
 * Systematic Fix for Sinhala Vocabulary across ISTQB Study Guides
 * Replaces inaccurate, awkward, and misspelled Sinhala terms with official,
 * natural, academically sound Sri Lankan software engineering and testing terminology.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

const replacements = [
  // 1. Principles vs Laws
  { from: /පරීක්ෂාවේ මූලික නීති 7/g, to: 'පරීක්ෂණ මූලධර්ම 7' },
  { from: /මූලික නීති 7/g, to: 'මූලධර්ම 7' },
  { from: /Seven Testing Principles \(නීති 7\)/g, to: 'Seven Testing Principles (මූලධර්ම 7)' },
  { from: /මෙම නීති 7 විභාගයේදී නිතර අසනු ලැබේ/g, to: 'මෙම මූලධර්ම 7 විභාගයේදී නිතර අසනු ලැබේ' },
  { from: /විභාග නීතිය:/g, to: 'විභාග රීතිය:' },
  { from: /සුවිශේෂී නීතිය:/g, to: 'සුවිශේෂී රීතිය:' },

  // 2. Testing Quadrants (චතුර්ථක vs චතුරස්‍ර)
  { from: /පරීක්ෂණ චතුරස්‍ර/g, to: 'පරීක්ෂණ චතුර්ථක' },
  { from: /කුමන චතුරස්‍රයටද/g, to: 'කුමන චතුර්ථකයටද' },
  { from: /චතුරස්‍ර Q3/g, to: 'චතුර්ථක Q3' },
  { from: /චතුරස්‍ර Q1/g, to: 'චතුර්ථක Q1' },
  { from: /චතුරස්‍ර Q2/g, to: 'චතුර්ථක Q2' },
  { from: /චතුරස්‍ර Q4/g, to: 'චතුර්ථක Q4' },
  { from: /The Testing Quadrants \(චතුරස්‍ර\)/g, to: 'The Testing Quadrants (චතුර්ථක)' },

  // 3. Absence-of-defects Fallacy (මුලාව vs මායාව)
  { from: /දෝෂ නොමැති වීමේ මායාව/g, to: 'දෝෂ නොමැති බවේ මුලාව' },
  { from: /දෝෂ නොමැති වීමේ මායාව:/g, to: 'දෝෂ නොමැති බවේ මුලාව (Absence-of-defects fallacy):' },

  // 4. State Transition (තත්ත්ව vs තත්ව)
  { from: /තත්ව සංක්‍රාන්ති පරීක්ෂාව/g, to: 'තත්ත්ව සංක්‍රාන්ති පරීක්ෂාව' },
  { from: /තත්වයෙන් තත්වයට/g, to: 'තත්ත්වයෙන් තත්ත්වයට' },
  { from: /තත්ව සටහනක්/g, to: 'තත්ත්ව සටහනක්' },

  // 5. Boundary Value Analysis (සීමා අගය vs සීමාකාරී අගය)
  { from: /BVA - සීමාකාරී අගය විශ්ලේෂණය/g, to: 'BVA - සීමා අගය විශ්ලේෂණය' },
  { from: /සීමාකාරී අගය විශ්ලේෂණය/g, to: 'සීමා අගය විශ්ලේෂණය' },

  // 6. Equivalence Partitioning (සමතුල්‍යතා කලාපකරණය vs සමතුල්‍යතා බෙදීම)
  { from: /EP - සමතුල්‍යතා බෙදීම/g, to: 'EP - සමතුල්‍යතා කලාපකරණය' },
  { from: /සමතුල්‍යතා බෙදීම/g, to: 'සමතුල්‍යතා කලාපකරණය' },

  // 7. Test Techniques (ශිල්පක්‍රම vs ක්‍රම)
  { from: /කළු-පෙට්ටි පරීක්ෂණ ක්‍රම/g, to: 'කළු-පෙට්ටි පරීක්ෂණ ශිල්පක්‍රම' },
  { from: /සුදු-පෙට්ටි පරීක්ෂණ ක්‍රම/g, to: 'සුදු-පෙට්ටි පරීක්ෂණ ශිල්පක්‍රම' },
  { from: /අත්දැකීම් මත පදනම් වූ පරීක්ෂණ ක්‍රම/g, to: 'අත්දැකීම් පාදක පරීක්ෂණ ශිල්පක්‍රම' },

  // 8. Static testing on third-party binaries
  { from: /<em>අපොහොසත් වන්නේ කුමක්ද\?<\/em>/g, to: '<strong>ස්ථිතික පරීක්ෂාවට ලක් කළ නොහැකි දෑ:</strong>' },

  // 9. Managing the Test Activities
  { from: /Chapter 05: පරීක්ෂණ කළමනාකරණය/g, to: 'Chapter 05: පරීක්ෂණ ක්‍රියාකාරකම් කළමනාකරණය' },
  { from: /පරීක්ෂණ කළමනාකරණය සහ අවදානම් විශ්ලේෂණය/g, to: 'පරීක්ෂණ ක්‍රියාකාරකම් කළමනාකරණය සහ අවදානම් විශ්ලේෂණය' }
];

console.log('--- Applying Vocabulary Fixes to Sinhala HTML Guides ---');
for (let ch = 1; ch <= 6; ch++) {
  const file = path.join(siDir, `istqb_ch${ch}_study_guide_sinhala.html`);
  let content = fs.readFileSync(file, 'utf8');
  let count = 0;

  replacements.forEach(r => {
    const matches = content.match(r.from);
    if (matches) {
      count += matches.length;
      content = content.replace(r.from, r.to);
    }
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Ch ${ch}: replaced ${count} occurrences in ${path.basename(file)}`);
}

// Also update index.html
console.log('\n--- Applying Vocabulary Fixes to index.html ---');
const indexPath = path.join(rootDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
let indexCount = 0;
replacements.forEach(r => {
  const matches = indexContent.match(r.from);
  if (matches) {
    indexCount += matches.length;
    indexContent = indexContent.replace(r.from, r.to);
  }
});
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log(`✓ Replaced ${indexCount} occurrences in index.html`);

// Also update upgrade_navigation_and_anchors.js
console.log('\n--- Applying Vocabulary Fixes to upgrade_navigation_and_anchors.js ---');
const navScriptPath = path.join(rootDir, '06_Build_and_Audit_Tools', 'upgrade_navigation_and_anchors.js');
let navContent = fs.readFileSync(navScriptPath, 'utf8');
let navCount = 0;
replacements.forEach(r => {
  const matches = navContent.match(r.from);
  if (matches) {
    navCount += matches.length;
    navContent = navContent.replace(r.from, r.to);
  }
});
fs.writeFileSync(navScriptPath, navContent, 'utf8');
console.log(`✓ Replaced ${navCount} occurrences in upgrade_navigation_and_anchors.js`);
