const fs = require('fs');

const chapterConfigs = [
  {
    file: 'istqb_ch1_study_guide.html',
    chapterNum: '01',
    chapterTitle: 'Chapter 01: Fundamentals of Testing',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 1 Keyword Lexicon (All 30 Official Terms)</h2>', to: '<h2>3. Complete Chapter 1 Keyword Lexicon (All 30 Official Terms)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  },
  {
    file: 'istqb_ch2_study_guide.html',
    chapterNum: '02',
    chapterTitle: 'Chapter 02: Testing Throughout the SDLC',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>2.2 Test Levels and Test Types</h2>', to: '<h2>1.2 Test Levels and Test Types</h2>' },
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 2 Keyword Lexicon (All 17 Official Terms)</h2>', to: '<h2>3. Complete Chapter 2 Keyword Lexicon (All 17 Official Terms)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  },
  {
    file: 'istqb_ch3_study_guide.html',
    chapterNum: '03',
    chapterTitle: 'Chapter 03: Static Testing',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>3.2 Feedback and Review Process</h2>', to: '<h2>1.2 Feedback and Review Process</h2>' },
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 3 Keyword Lexicon (All 10 Official Terms)</h2>', to: '<h2>3. Complete Chapter 3 Keyword Lexicon (All 10 Official Terms)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  },
  {
    file: 'istqb_ch4_study_guide.html',
    chapterNum: '04',
    chapterTitle: 'Chapter 04: Test Analysis and Design',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 4 Keyword Lexicon (Official Terms)</h2>', to: '<h2>3. Complete Chapter 4 Keyword Lexicon (Official Terms)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  },
  {
    file: 'istqb_ch5_study_guide.html',
    chapterNum: '05',
    chapterTitle: 'Chapter 05: Managing the Test Activities',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>5.2 Risk Management</h2>', to: '<h2>1.2 Risk Management</h2>' },
      { from: '<h2>5.3 Test Monitoring, Test Control and Test Completion</h2>', to: '<h2>1.3 Test Monitoring, Test Control and Test Completion</h2>' },
      { from: '<h2>5.4 Configuration Management & 5.5 Defect Management</h2>', to: '<h2>1.4 Configuration Management & Defect Management</h2>' },
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 5 Keyword Lexicon (All 26 Official Terms)</h2>', to: '<h2>3. Complete Chapter 5 Keyword Lexicon (All 26 Official Terms)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  },
  {
    file: 'istqb_ch6_study_guide.html',
    chapterNum: '06',
    chapterTitle: 'Chapter 06: Test Tools',
    searchBreakdown: '<h2>2. In-Depth Syllabus Breakdown & Explanations</h2>',
    substitutions: [
      { from: '<h2>2. In-Depth Syllabus Breakdown (Continued)</h2>', to: '<h2>1.1 Tool Support for Testing (Part 2)</h2>' },
      { from: '<h2>6.2 Benefits and Risks of Test Automation FL-6.2.1 (K1)</h2>', to: '<h2>1.2 Benefits of Test Automation</h2>' },
      { from: '<h2>6.2 Risks of Test Automation & Strategic Mitigations</h2>', to: '<h2>1.3 Risks of Test Automation & Strategic Mitigations</h2>' },
      { from: '<h2>3. High-Yield Exam Flashpoints, Key Distinctions & Pitfalls</h2>', to: '<h2>2. High-Yield Exam Flashpoints & Key Distinctions</h2>' },
      { from: '<h2>4. Complete Chapter 6 Keyword Lexicon & Tooling Taxonomy</h2>', to: '<h2>3. Complete Chapter 6 Keyword Lexicon & Tooling Taxonomy</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 1)</h2>' },
      { from: '<h2>5. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>', to: '<h2>4. Realistic ISTQB Practice Exam Questions & Detailed Rationales (Part 2)</h2>' }
    ]
  }
];

chapterConfigs.forEach(cfg => {
  console.log(`Processing: ${cfg.file}...`);
  let content = fs.readFileSync(cfg.file, 'utf8');

  // Find <body>
  const bodyIdx = content.indexOf('<body>');
  if (bodyIdx === -1) {
    console.error(`Cannot find <body> in ${cfg.file}`);
    return;
  }

  // Find breakdown index
  const breakdownIdx = content.indexOf(cfg.searchBreakdown);
  if (breakdownIdx === -1) {
    console.error(`Cannot find ${cfg.searchBreakdown} in ${cfg.file}`);
    return;
  }

  // Look backwards from breakdownIdx to find <div class="page-start">
  const pageStartTarget = '<div class="page-start">';
  const lastPageStartBeforeBreakdown = content.lastIndexOf(pageStartTarget, breakdownIdx);

  // New clean header
  const newHeader = `<body>

  <!-- ==================== PAGE 1: LESSON CONTENT ==================== -->
  <div class="page-start" style="margin-top: 0;">
    <div style="margin-bottom: 8px; border-bottom: 2.5px solid #111827; padding-bottom: 4px;">
      <h1 style="font-size: 20px; font-weight: 800; color: #111827; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">${cfg.chapterTitle}</h1>
    </div>

    <h2>1. Core Syllabus Concepts & In-Depth Notes</h2>\n`;

  // We cut from bodyIdx up to breakdownIdx + cfg.searchBreakdown.length
  // Notice that in original file, before breakdownIdx there was <div class="page-start">\n <h2>2. In-Depth Syllabus Breakdown...</h2>
  let cutStart = bodyIdx;
  let cutEnd = breakdownIdx + cfg.searchBreakdown.length;

  // Let's replace the whole section from <body> down to <h2>2. In-Depth Syllabus Breakdown...</h2>
  content = content.slice(0, cutStart) + newHeader + content.slice(cutEnd);

  // Apply sequential section heading substitutions
  cfg.substitutions.forEach(sub => {
    if (content.includes(sub.from)) {
      content = content.replace(sub.from, sub.to);
    } else {
      console.warn(`  Sub pattern not found in ${cfg.file}: ${sub.from}`);
    }
  });

  fs.writeFileSync(cfg.file, content, 'utf8');
  console.log(`✓ Updated ${cfg.file} successfully!`);
});

console.log('\nAll files updated! Checking HTML tag balance...');
