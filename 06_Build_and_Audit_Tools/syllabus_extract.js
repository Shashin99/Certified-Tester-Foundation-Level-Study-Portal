const fs = require('fs');
const path = require('path');
const pdf = require(path.join(__dirname, '_audit', 'node_modules', 'pdf-parse'));

const root = path.resolve(__dirname, '..');
const pdfPath = path.join(root, '01_Official_Syllabus', 'ISTQB_CTFL_Syllabus_v4.0.1.pdf');

pdf(fs.readFileSync(pdfPath)).then(d => {
  fs.writeFileSync(path.join(__dirname, '_audit', 'syllabus.txt'), d.text, 'utf8');
  console.log('Pages:', d.numpages, 'chars:', d.text.length);
  const los = [...new Set(d.text.match(/FL-\d\.\d\.\d/g) || [])];
  console.log('Unique FL-x.y.z IDs in syllabus:', los.length);
  console.log(los.join(' '));
});
