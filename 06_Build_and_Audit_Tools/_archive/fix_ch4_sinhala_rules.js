const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

const ch4File = path.join(siDir, 'istqb_ch4_study_guide_sinhala.html');
let ch4Content = fs.readFileSync(ch4File, 'utf8');

// Replace business rules / rules with correct technical term "රීති"
ch4Content = ch4Content.replace(/ව්‍යාපාරික නීති \(business rules\)/g, 'ව්‍යාපාරික රීති (Business Rules)');
ch4Content = ch4Content.replace(/මුළු නීති \(Rules\) ගණන/g, 'මුළු රීති (Rules) ගණන');
ch4Content = ch4Content.replace(/<strong>2\. Rule-Oriented \(නීති පාදක\):<\/strong>/g, '<strong>2. Rule-Oriented (රීති පාදක):</strong>');
ch4Content = ch4Content.replace(/ව්‍යාපාරික නීති ලැයිස්තුගත කිරීම/g, 'ව්‍යාපාරික රීති ලැයිස්තුගත කිරීම');
ch4Content = ch4Content.replace(/ව්‍යාපාරික නීති වගුවක් ලෙස/g, 'ව්‍යාපාරික රීති වගුවක් ලෙස');
ch4Content = ch4Content.replace(/නීති: R1/g, 'රීති: R1');
ch4Content = ch4Content.replace(/එම නීතියට එම condition එක/g, 'එම රීතියට එම condition එක');
ch4Content = ch4Content.replace(/සත්‍යාපන නීති ලැයිස්තුවක්/g, 'සත්‍යාපන රීති ලැයිස්තුවක්');

fs.writeFileSync(ch4File, ch4Content, 'utf8');
console.log('✓ Updated Ch 4 Sinhala technical terms (Rules -> රීති)');
