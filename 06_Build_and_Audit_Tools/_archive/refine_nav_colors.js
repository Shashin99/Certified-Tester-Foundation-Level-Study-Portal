const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'upgrade_navigation_and_anchors.js');
let content = fs.readFileSync(filePath, 'utf8');

// Update .nav-footer-card in base
content = content.replace(
  /\.nav-footer-card\s*\{[\s\S]*?transition:\s*all 0\.2s ease;\s*\}/,
  `.nav-footer-card {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  text-decoration: none !important;
  color: #1e293b !important;
  transition: all 0.2s ease;
}`
);

// Update .study-nav-brand in base
content = content.replace(
  /\.study-nav-brand\s*\{[\s\S]*?transition:\s*all 0\.2s ease;\s*\}/,
  `.study-nav-brand {
  font-weight: 800;
  color: #60a5fa !important;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  padding: 4px 10px;
  border-radius: 6px;
  background: #1e293b;
  border: 1px solid #3b82f6;
  transition: all 0.2s ease;
}
.study-nav-brand span {
  color: #93c5fd !important;
}
.study-nav-brand strong {
  color: #ffffff !important;
}`
);

// Update dark mode .study-nav-brand and .nav-footer-card
content = content.replace(
  /body\.dark-reading-mode \.study-nav-brand\s*\{[\s\S]*?border-color:\s*rgba\(59, 130, 246, 0\.4\)\s*!important;\s*\}/,
  `body.dark-reading-mode .study-nav-brand {
  background: #1e293b !important;
  color: #60a5fa !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-brand span {
  color: #93c5fd !important;
}
body.dark-reading-mode .study-nav-brand strong {
  color: #ffffff !important;
}`
);

content = content.replace(
  /body\.dark-reading-mode \.nav-footer-card\s*\{[\s\S]*?border-color:\s*#22324e\s*!important;\s*\}/,
  `body.dark-reading-mode .nav-footer-card {
  background: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
  text-decoration: none !important;
}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ Successfully refined nav and footer brand links in upgrade_navigation_and_anchors.js');
