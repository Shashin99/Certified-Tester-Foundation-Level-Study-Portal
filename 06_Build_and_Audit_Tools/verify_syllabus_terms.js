const fs = require('fs');
const path = require('path');

let rootDir = __dirname;
if (path.basename(rootDir) === '06_Build_and_Audit_Tools') {
  rootDir = path.resolve(__dirname, '..');
}
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');

const checks = [
  { 
    file: 'istqb_ch1_study_guide.html', 
    chapter: 'Chapter 1: Fundamentals of Testing',
    terms: [
      'Whole Team Approach', 
      'Tests wear out', 
      'Absence-of-defects fallacy', 
      'Independence of testing', 
      'Testware', 
      'Debugging', 
      'Root cause', 
      'Defect', 
      'Failure', 
      'Test Analysis', 
      'Test Design', 
      'Test Implementation', 
      'Test Execution', 
      'Test Completion',
      'Traceability'
    ] 
  },
  { 
    file: 'istqb_ch2_study_guide.html', 
    chapter: 'Chapter 2: Testing Throughout the SDLC',
    terms: [
      'Component Integration', 
      'System Integration', 
      'Shift Left', 
      'Test-Driven Development', 
      'Behavior-Driven Development', 
      'Acceptance Test-Driven Development', 
      'Confirmation testing', 
      'Regression testing',
      'Maintenance testing',
      'Impact analysis',
      'DevOps',
      'CI/CD'
    ] 
  },
  { 
    file: 'istqb_ch3_study_guide.html', 
    chapter: 'Chapter 3: Static Testing',
    terms: [
      'ISO/IEC 20246', 
      'Walkthrough', 
      'Inspection', 
      'Technical Review', 
      'Informal Review', 
      'Perspective-based reading', 
      'Review Leader', 
      'Scribe',
      'Facilitator',
      'Individual review',
      'Communication and analysis',
      'Static analysis'
    ] 
  },
  { 
    file: 'istqb_ch4_study_guide.html', 
    chapter: 'Chapter 4: Test Analysis and Design',
    terms: [
      'Equivalence Partitioning', 
      'Boundary Value Analysis', 
      '2-value', 
      '3-value', 
      'Decision Table', 
      'State Transition', 
      'Statement Coverage', 
      'Branch Coverage', 
      'Subsumption', 
      'Error Guessing',
      'Exploratory Testing',
      'Test Charter',
      'Checklist-based'
    ] 
  },
  { 
    file: 'istqb_ch5_study_guide.html', 
    chapter: 'Chapter 5: Managing the Test Activities',
    terms: [
      'Three-Point Estimation', 
      '4m', 
      'Test Pyramid', 
      'Testing Quadrants', 
      'Product Risk', 
      'Project Risk', 
      'Configuration Management', 
      'Defect Management',
      'Exit criteria',
      'Entry criteria',
      'Test Progress Report',
      'Test Completion Report'
    ] 
  },
  { 
    file: 'istqb_ch6_study_guide.html', 
    chapter: 'Chapter 6: Test Tools',
    terms: [
      'Spreadsheet', 
      'Pilot Project', 
      'Benefits of Test Automation', 
      'Risks of Test Automation', 
      'DevOps', 
      'Static Analysis',
      'Test Execution Tool',
      'Test Management Tool'
    ] 
  }
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

checks.forEach(({ file, chapter, terms }) => {
  console.log(`\n======================================================================`);
  console.log(`VERIFYING SYLLABUS CONTENT: ${chapter}`);
  console.log(`======================================================================`);
  const content = fs.readFileSync(path.join(enDir, file), 'utf8');
  terms.forEach(term => {
    totalChecks++;
    const found = content.toLowerCase().includes(term.toLowerCase());
    if (found) {
      passedChecks++;
      console.log(`  [PASS] "${term}"`);
    } else {
      failedChecks++;
      console.error(`  [FAIL] "${term}" NOT found in ${file}!`);
    }
  });
});

console.log(`\n======================================================================`);
console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
console.log(`======================================================================\n`);
