/**
 * ISTQB® CTFL v4.0.1 Master System Health & Quality Assurance Suite
 * Performs a unified, comprehensive audit across all 19 HTML documents,
 * 71 verified exam questions, 64 Learning Objectives, 105 syllabus terms,
 * print CSS styling, internal linking, and theme state management.
 *
 * Usage:
 *   node 06_Build_and_Audit_Tools/audit_system_health.js
 */

const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

let rootDir = __dirname;
if (path.basename(rootDir) === '06_Build_and_Audit_Tools') {
  rootDir = path.resolve(__dirname, '..');
}

console.log('='.repeat(78));
console.log('   ISTQB® CTFL v4.0.1 MASTER SYSTEM COMPREHENSIVE HEALTH AUDIT');
console.log('='.repeat(78));

const testSuites = [
  { name: 'HTML Structure & Tag Balance', script: 'validate_html_integrity.js' },
  { name: 'Internal Link Integrity (19 Pages)', script: 'verify_all_internal_links.js' },
  { name: 'Portal Dashboard & Responsive UI', script: 'test_index_functionality.js' },
  { name: 'Syllabus LO & K-Level Coverage', script: 'audit_accuracy.js' },
  { name: '24-Document Syllabus Compliance', script: 'audit_vs_syllabus.js' },
  { name: '71-Question Bank & Rationale Integrity', script: 'audit_all.js' },
  { name: 'Question Bank Question Key Verification', script: 'verify_all_questions.js' },
  { name: 'Bilingual Sinhala Stem Completeness', script: 'test_sinhala_stems.js' },
  { name: '72 Core Syllabus Term Coverage', script: 'verify_syllabus_terms.js' },
  { name: 'Code Hygiene & Entity Integrity', script: 'deep_scan.js' },
  { name: 'Deep UX & Component Hygiene Scan', script: 'deep_ux_scan.js' },
  { name: 'UX Standards, Viewports & Theme Sync', script: 'audit_ux.js' }
];

let totalPassed = 0;
let totalFailed = 0;

for (const suite of testSuites) {
  const scriptPath = path.join(rootDir, '06_Build_and_Audit_Tools', suite.script);
  process.stdout.write(`[*] Checking: ${suite.name.padEnd(45)} ... `);
  try {
    const out = execFileSync(process.execPath, [scriptPath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    totalPassed++;
    console.log('\x1b[32m[PASSED]\x1b[0m');
  } catch (err) {
    totalFailed++;
    console.log('\x1b[31m[FAILED]\x1b[0m');
    console.error(err.stdout || err.stderr || err.message);
  }
}

console.log('='.repeat(78));
console.log(` AUDIT SUMMARY: ${totalPassed} suites passed, ${totalFailed} suites failed.`);
console.log('='.repeat(78));

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('\x1b[32m>>> ALL SYSTEM SUITES ARE 100% OPERATIONAL, INTEGRAL & VERIFIED! <<<\x1b[0m\n');
}
