/**
 * Upgrade Dark / Night Reading Theme for all 12 ISTQB CTFL v4.0.1 Study Guides
 * Executes upgrade_navigation_and_anchors.js to apply the unified ultra-clear night reading theme.
 */

const { execFileSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const script = path.join(rootDir, '06_Build_and_Audit_Tools', 'upgrade_navigation_and_anchors.js');

execFileSync(process.execPath, [script], { cwd: rootDir, stdio: 'inherit' });
