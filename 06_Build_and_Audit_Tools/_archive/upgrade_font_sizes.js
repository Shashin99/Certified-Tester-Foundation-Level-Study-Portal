const fs = require('fs');

const largeReadableCss = `  /* Base Reset & Print-Optimized Large Typography */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4 portrait;
    /* Generous margins: 16mm left for binding, 22mm right for handwritten notes */
    margin: 14mm 22mm 14mm 16mm;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000; /* Pure black for maximum print clarity and contrast */
    background-color: #ffffff;
    line-height: 1.65;
    font-size: 13.5px; /* Upgraded from 12.2px for easy readability */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Headings: Crisp Black with Solid Rules & Generous Vertical Spacing */
  h1, h2, h3, h4 {
    color: #000000;
    font-weight: 700;
    line-height: 1.32;
    page-break-after: avoid;
    break-after: avoid;
  }

  h1 { 
    font-size: 21px; 
    margin-bottom: 7px; 
    letter-spacing: -0.2px; 
  }
  
  h2 {
    font-size: 16.5px; /* Upgraded from 15px */
    margin-top: 18px;
    margin-bottom: 9px;
    border-bottom: 2.5px solid #000000;
    padding-bottom: 4px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  h3 { 
    font-size: 14.8px; /* Upgraded from 13.5px */
    margin-top: 14px; 
    margin-bottom: 7px; 
    color: #000000; 
  }
  
  h4 { 
    font-size: 13.8px; /* Upgraded from 12.5px */
    margin-top: 11px; 
    margin-bottom: 5px; 
    color: #1f2937; 
  }

  p { 
    margin-bottom: 9px; 
    text-align: justify; 
    font-size: 13.5px; /* Upgraded from 12.2px */
    line-height: 1.65;
    color: #000000; 
  }
  
  ul, ol { 
    margin-left: 20px; 
    margin-bottom: 9px; 
    font-size: 13.5px; /* Upgraded from 12.2px */
    line-height: 1.62;
    color: #000000; 
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
    padding: 2px 5.5px;
    border-radius: 3px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12.5px; /* Upgraded from 11.2px */
    color: #000000;
  }

  /* Badges - Crisp High-Contrast Outlines */
  .badge {
    display: inline-block;
    padding: 2.5px 6.5px;
    border-radius: 3px;
    font-size: 11.5px; /* Upgraded from 10px */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-right: 3px;
    vertical-align: middle;
    background-color: #ffffff;
    color: #000000;
    border: 1.2px solid #374151;
  }
  .badge-k1 { background-color: #f3f4f6; color: #000000; border: 1.2px solid #4b5563; }
  .badge-k2 { background-color: #ffffff; color: #000000; border: 1.2px solid #000000; }
  .badge-k3 { background-color: #f3f4f6; color: #000000; border: 1.5px solid #000000; font-weight: 800; }
  .badge-keyword { background-color: #ffffff; color: #000000; border: 1px dashed #374151; }

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

  /* Cards & Callouts - Large Readable Text with Solid Contrast */
  .card {
    background: #ffffff !important;
    border: 1.2px solid #6b7280;
    border-radius: 4px;
    padding: 10px 13px;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 13.2px; /* Upgraded from 11.8px/12px */
    line-height: 1.62;
    color: #000000 !important;
  }
  
  .callout {
    border-left: 4px solid #000000 !important;
    border-top: 1.2px solid #d1d5db;
    border-right: 1.2px solid #d1d5db;
    border-bottom: 1.2px solid #d1d5db;
    background: #fafafa !important;
    padding: 9px 13px;
    border-radius: 0 4px 4px 0;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 13.2px; /* Upgraded from 11.8px/12px */
    line-height: 1.62;
    color: #000000 !important;
  }
  .callout-info { border-left-color: #000000 !important; }
  .callout-warning { border-left-color: #374151 !important; }
  .callout-danger { border-left-color: #000000 !important; }
  .callout-success { border-left-color: #000000 !important; }
  .callout-exam { border-left-color: #000000 !important; }

  /* Tables - Large, Crisp Typography & Generous Cell Padding */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 13px 0;
    font-size: 12.8px; /* Upgraded from 11.5px */
    page-break-inside: avoid;
    break-inside: avoid;
  }
  th, td {
    padding: 7px 10px; /* Upgraded from 4.5px 6.5px */
    border: 1.2px solid #4b5563;
    text-align: left;
    vertical-align: top;
    color: #000000 !important;
    line-height: 1.58;
    font-size: 12.8px; /* Upgraded from 11.5px */
  }
  th {
    background: #f3f4f6 !important;
    color: #000000 !important;
    font-weight: 700;
    font-size: 13.2px; /* Upgraded from 11.8px */
    letter-spacing: 0.1px;
    border-bottom: 2.2px solid #000000;
  }
  tr:nth-child(even) { background-color: #fafafa !important; }

  /* Grids with Comfortable Spacing */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 9px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 9px;
    margin-bottom: 9px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 9px;
  }

  /* Tool Categories Showcase */
  .tool-box {
    background: #ffffff !important;
    border: 1.2px solid #6b7280;
    border-top: 3.5px solid #000000;
    border-radius: 4px;
    padding: 9px 12px;
    margin-bottom: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .tool-box-title {
    font-size: 13.8px; /* Upgraded from 12.2px */
    font-weight: 700;
    color: #000000 !important;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tool-box-desc {
    font-size: 13.2px; /* Upgraded from 11.6px */
    color: #111827 !important;
    line-height: 1.58;
  }
  .tool-examples {
    margin-top: 5px;
    padding-top: 4px;
    border-top: 1px dashed #9ca3af;
    font-size: 12.2px; /* Upgraded from 10.8px */
    color: #374151 !important;
  }

  /* Practice Exam Questions - Large, Clear Typography */
  .quiz-card {
    background: #ffffff !important;
    border: 1.2px solid #6b7280;
    border-left: 4px solid #000000;
    border-radius: 4px;
    padding: 10px 13px;
    margin-bottom: 12px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .quiz-q {
    font-weight: 700;
    color: #000000 !important;
    margin-bottom: 7px;
    font-size: 13.5px; /* Upgraded from 11.8px/12px */
    line-height: 1.52;
  }
  .quiz-options {
    margin-left: 5px;
    margin-bottom: 7px;
    font-size: 13px; /* Upgraded from 11.5px */
  }
  .quiz-opt {
    margin-bottom: 4px;
    color: #111827 !important;
    line-height: 1.50;
    font-size: 13px; /* Upgraded from 11.5px */
  }
  .quiz-answer {
    background: #f9fafb !important;
    border-top: 1.2px dashed #9ca3af;
    padding: 8px 11px;
    border-radius: 0 0 4px 4px;
    font-size: 13px; /* Upgraded from 11.6px */
    color: #000000 !important;
    line-height: 1.60;
    margin-top: 5px;
  }

  /* Glossary Grid */
  .glossary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 7px;
    margin-bottom: 9px;
  }
  .glossary-item {
    background: #ffffff !important;
    border: 1.2px solid #9ca3af;
    border-radius: 4px;
    padding: 7px 10px;
    font-size: 13px; /* Upgraded from 11.6px */
    line-height: 1.55;
    page-break-inside: avoid;
    break-inside: avoid;
    color: #000000 !important;
  }
  .glossary-term {
    font-weight: 700;
    color: #000000 !important;
    font-size: 13.5px; /* Upgraded from 11.8px/12px */
    margin-bottom: 2.5px;
    border-bottom: 1.2px dotted #6b7280;
    display: inline-block;
  }

  /* Ruled Handwriting / Student Notes Box */
  .notes-box {
    border: 1.5px dashed #6b7280;
    border-radius: 4px;
    background: #fafafa;
    padding: 9px 13px;
    margin: 14px 0 16px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .notes-box-header {
    font-size: 11.5px; /* Upgraded from 10.5px */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #374151;
    margin-bottom: 7px;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 3.5px;
    display: flex;
    justify-content: space-between;
  }
  .notes-box-lines {
    height: 56px;
    background-image: repeating-linear-gradient(transparent, transparent 17px, #d1d5db 17px, #d1d5db 18px);
  }

  .footer-note {
    font-size: 11px; /* Upgraded from 10px */
    color: #374151 !important;
    text-align: center;
    border-top: 1px solid #d1d5db;
    padding-top: 5px;
    margin-top: 12px;
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
  content = content.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${largeReadableCss}\n  </style>`);
  fs.writeFileSync(f, content, 'utf8');
  console.log(`✓ Upgraded font sizes and typography in ${f}`);
});

console.log('\nAll 6 files upgraded with large, highly legible fonts!');
