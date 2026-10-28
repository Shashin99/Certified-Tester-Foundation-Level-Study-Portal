const fs = require('fs');

const spaciousCss = `  /* Base Reset & Print-Optimized Typography */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4 portrait;
    /* Generous margins: 18mm left for binding, 24mm right for handwritten notes */
    margin: 14mm 24mm 14mm 18mm;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #111827; /* Deep charcoal black for sharp print contrast */
    background-color: #ffffff;
    line-height: 1.62;
    font-size: 12.2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Headings: Crisp Black with Solid Rules & Generous Vertical Spacing */
  h1, h2, h3, h4 {
    color: #111827;
    font-weight: 700;
    line-height: 1.3;
    page-break-after: avoid;
    break-after: avoid;
  }

  h1 { 
    font-size: 19px; 
    margin-bottom: 6px; 
    letter-spacing: -0.2px; 
  }
  
  h2 {
    font-size: 15px;
    margin-top: 16px;
    margin-bottom: 8px;
    border-bottom: 2px solid #111827;
    padding-bottom: 3.5px;
    color: #111827;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  h3 { 
    font-size: 13.5px; 
    margin-top: 13px; 
    margin-bottom: 6px; 
    color: #111827; 
  }
  
  h4 { 
    font-size: 12.5px; 
    margin-top: 10px; 
    margin-bottom: 5px; 
    color: #374151; 
  }

  p { 
    margin-bottom: 8px; 
    text-align: justify; 
    font-size: 12.2px; 
    line-height: 1.62;
    color: #111827; 
  }
  
  ul, ol { 
    margin-left: 19px; 
    margin-bottom: 8px; 
    font-size: 12.2px; 
    line-height: 1.58;
    color: #111827; 
  }
  
  li { 
    margin-bottom: 4px; 
  }
  
  strong { 
    color: #000000; 
    font-weight: 700; 
  }
  
  code {
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    padding: 1.5px 5px;
    border-radius: 3px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 11.2px;
    color: #111827;
  }

  /* Badges - Crisp High-Contrast Outlines */
  .badge {
    display: inline-block;
    padding: 2px 5.5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-right: 3px;
    vertical-align: middle;
    background-color: #ffffff;
    color: #111827;
    border: 1.2px solid #374151;
  }
  .badge-k1 { background-color: #f3f4f6; color: #111827; border: 1.2px solid #4b5563; }
  .badge-k2 { background-color: #ffffff; color: #111827; border: 1.2px solid #111827; }
  .badge-k3 { background-color: #f3f4f6; color: #000000; border: 1.5px solid #000000; font-weight: 800; }
  .badge-keyword { background-color: #ffffff; color: #111827; border: 1px dashed #374151; }

  /* Page Break Utilities */
  .page-start {
    page-break-before: auto;
    break-before: auto;
    margin-top: 14px;
  }
  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Cards & Callouts - Spacious with Ample Breathing Room */
  .card {
    background: #ffffff !important;
    border: 1px solid #9ca3af;
    border-radius: 4px;
    padding: 9px 12px;
    margin-bottom: 9px;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 12px;
    line-height: 1.58;
    color: #111827 !important;
  }
  
  .callout {
    border-left: 4px solid #111827 !important;
    border-top: 1px solid #e5e7eb;
    border-right: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    background: #fafafa !important;
    padding: 8px 12px;
    border-radius: 0 4px 4px 0;
    margin-bottom: 9px;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 12px;
    line-height: 1.58;
    color: #111827 !important;
  }
  .callout-info { border-left-color: #111827 !important; }
  .callout-warning { border-left-color: #374151 !important; }
  .callout-danger { border-left-color: #000000 !important; }
  .callout-success { border-left-color: #111827 !important; }
  .callout-exam { border-left-color: #111827 !important; }

  /* Tables - Crisp Black Borders, Generous Cell Padding */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 11px 0;
    font-size: 11.5px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  th, td {
    padding: 6.5px 8.5px;
    border: 1px solid #6b7280;
    text-align: left;
    vertical-align: top;
    color: #111827 !important;
    line-height: 1.5;
  }
  th {
    background: #f3f4f6 !important;
    color: #000000 !important;
    font-weight: 700;
    font-size: 11.8px;
    letter-spacing: 0.1px;
    border-bottom: 2px solid #111827;
  }
  tr:nth-child(even) { background-color: #fafafa !important; }

  /* Grids with Comfortable Gaps */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    margin-bottom: 8px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: 8px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
    margin-bottom: 8px;
  }

  /* Tool Categories Showcase */
  .tool-box {
    background: #ffffff !important;
    border: 1px solid #6b7280;
    border-top: 3.5px solid #111827;
    border-radius: 4px;
    padding: 8px 11px;
    margin-bottom: 9px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .tool-box-title {
    font-size: 12.2px;
    font-weight: 700;
    color: #111827 !important;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tool-box-desc {
    font-size: 11.6px;
    color: #1f2937 !important;
    line-height: 1.5;
  }
  .tool-examples {
    margin-top: 4px;
    padding-top: 3.5px;
    border-top: 1px dashed #d1d5db;
    font-size: 10.8px;
    color: #4b5563 !important;
  }

  /* Practice Exam Questions - Spacious with Clear Note Space */
  .quiz-card {
    background: #ffffff !important;
    border: 1px solid #6b7280;
    border-left: 4px solid #111827;
    border-radius: 4px;
    padding: 9px 12px;
    margin-bottom: 11px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .quiz-q {
    font-weight: 700;
    color: #000000 !important;
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 1.48;
  }
  .quiz-options {
    margin-left: 4px;
    margin-bottom: 6px;
    font-size: 11.8px;
  }
  .quiz-opt {
    margin-bottom: 3.5px;
    color: #1f2937 !important;
    line-height: 1.45;
  }
  .quiz-answer {
    background: #f9fafb !important;
    border-top: 1px dashed #9ca3af;
    padding: 7px 9px;
    border-radius: 0 0 4px 4px;
    font-size: 11.6px;
    color: #111827 !important;
    line-height: 1.5;
    margin-top: 4px;
  }

  /* Glossary Grid */
  .glossary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
    margin-top: 6px;
    margin-bottom: 8px;
  }
  .glossary-item {
    background: #ffffff !important;
    border: 1px solid #9ca3af;
    border-radius: 4px;
    padding: 6px 9px;
    font-size: 11.6px;
    line-height: 1.48;
    page-break-inside: avoid;
    break-inside: avoid;
    color: #111827 !important;
  }
  .glossary-term {
    font-weight: 700;
    color: #000000 !important;
    font-size: 12px;
    margin-bottom: 2px;
    border-bottom: 1px dotted #9ca3af;
    display: inline-block;
  }

  /* Ruled Handwriting / Student Notes Box */
  .notes-box {
    border: 1.2px dashed #9ca3af;
    border-radius: 4px;
    background: #fafafa;
    padding: 8px 12px;
    margin: 12px 0 14px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .notes-box-header {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #4b5563;
    margin-bottom: 6px;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 3px;
    display: flex;
    justify-content: space-between;
  }
  .notes-box-lines {
    height: 48px;
    background-image: repeating-linear-gradient(transparent, transparent 15px, #d1d5db 15px, #d1d5db 16px);
  }

  .footer-note {
    font-size: 10px;
    color: #4b5563 !important;
    text-align: center;
    border-top: 1px solid #d1d5db;
    padding-top: 4px;
    margin-top: 10px;
  }`;

const files = [
  'istqb_ch1_study_guide.html',
  'istqb_ch2_study_guide.html',
  'istqb_ch3_study_guide.html',
  'istqb_ch4_study_guide.html',
  'istqb_ch5_study_guide.html',
  'istqb_ch6_study_guide.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace <style>...</style>
  content = content.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${spaciousCss}\n  </style>`);
  
  // Also, let's add a clean notes box before practice questions and at the end of the document if not already present
  // Check if .notes-box is already in content
  if (!content.includes('class="notes-box"')) {
    // Add notes box right before Section 4 (Practice Questions)
    const quizSectionMarker = '<h2>4. Realistic ISTQB Practice Exam Questions';
    if (content.includes(quizSectionMarker)) {
      const notesBlock = `
    <!-- Lined Student Note Space -->
    <div class="notes-box">
      <div class="notes-box-header">
        <span>STUDENT NOTES & EXAM FLASHCARD REMINDERS</span>
        <span>(Handwritten Study Space)</span>
      </div>
      <div class="notes-box-lines"></div>
    </div>\n\n`;
      content = content.replace(quizSectionMarker, notesBlock + '    ' + quizSectionMarker);
    }
  }

  fs.writeFileSync(f, content, 'utf8');
  console.log(`✓ Applied spacious, notebook-style print layout to ${f}`);
});

console.log('\nAll 6 files updated with spacious layout!');
