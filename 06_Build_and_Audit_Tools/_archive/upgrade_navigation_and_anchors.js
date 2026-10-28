/**
 * Upgrade Navigation, Static Section Anchors, and Interactive Quiz Features
 * for all 12 ISTQB CTFL v4.0.1 Study Guides.
 * Features an Ultra-Clear, High-Contrast Night Reading Theme.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const enDir = path.join(rootDir, '02_English_Study_Guides_HTML');
const siDir = path.join(rootDir, '03_Sinhala_Study_Guides_HTML');

const chaptersConfig = [
  {
    num: 1,
    titleEn: 'Chapter 01: Fundamentals of Testing',
    titleSi: 'Chapter 01: පරීක්ෂාවේ මූලධර්ම (Fundamentals of Testing)',
    shortEn: 'Ch 1: Fundamentals',
    fileEn: 'istqb_ch1_study_guide.html',
    fileSi: 'istqb_ch1_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-1-1', title: '  1.1 What is Testing?' },
      { id: 'sec-1-2', title: '  1.2 Why is Testing Necessary?' },
      { id: 'sec-1-3', title: '  1.3 The 7 Testing Principles' },
      { id: 'sec-1-4', title: '  1.4 Test Activities, Testware & Roles' },
      { id: 'sec-1-5', title: '  1.5 Essential Skills & Good Practices' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-1-1', title: '  1.1 What is Testing? (පරීක්ෂාව යනු කුමක්ද?)' },
      { id: 'sec-1-2', title: '  1.2 Why Testing is Necessary (අවශ්‍යතාව)' },
      { id: 'sec-1-3', title: '  1.3 Seven Testing Principles (මූලධර්ම 7)' },
      { id: 'sec-1-4', title: '  1.4 Activities & Testware (ක්‍රියාවලිය)' },
      { id: 'sec-1-5', title: '  1.5 Essential Skills (මූලික කුසලතා)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-1-1', match: /(<h3[^>]*>)([^<]*1\.1\s+What is Testing[^<]*)(<\/h3>)/i },
      { id: 'sec-1-2', match: /(<h3[^>]*>)([^<]*1\.2\s+Why is Testing Necessary[^<]*)(<\/h3>)/i },
      { id: 'sec-1-3', match: /(<h[23][^>]*>)([^<]*(?:1\.3|Seven Testing Principles)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-1-4', match: /(<h[23][^>]*>)([^<]*(?:1\.4|Test Activities, Testware)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-1-5', match: /(<h3[^>]*>)([^<]*1\.5\s+Essential Skills[^<]*)(<\/h3>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-1-1', match: /(<h3[^>]*>)([^<]*1\.1\s+What is Testing[^<]*)(<\/h3>)/i },
      { id: 'sec-1-2', match: /(<h3[^>]*>)([^<]*1\.2\s+Why is Testing Necessary[^<]*)(<\/h3>)/i },
      { id: 'sec-1-3', match: /(<h[23][^>]*>)([^<]*(?:Seven Testing Principles|මූලධර්ම 7)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-1-4', match: /(<h[23][^>]*>)([^<]*(?:Test Activities, Testware|පරීක්ෂණ ක්‍රියාවලිය)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-1-5', match: /(<h3[^>]*>)([^<]*1\.5\s+Essential Skills[^<]*)(<\/h3>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  },
  {
    num: 2,
    titleEn: 'Chapter 02: Testing Throughout the SDLC',
    titleSi: 'Chapter 02: SDLC තුළ පරීක්ෂාව (Testing Throughout SDLC)',
    shortEn: 'Ch 2: SDLC Testing',
    fileEn: 'istqb_ch2_study_guide.html',
    fileSi: 'istqb_ch2_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-2-1', title: '  2.1 Testing in Context of SDLC' },
      { id: 'sec-2-2', title: '  2.2 The 5 Test Levels & 4 Test Types' },
      { id: 'sec-2-3', title: '  2.3 Maintenance Testing' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-2-1', title: '  2.1 Testing in Context of SDLC' },
      { id: 'sec-2-2', title: '  2.2 Test Levels & Types (මට්ටම් 5 සහ වර්ග 4)' },
      { id: 'sec-2-3', title: '  2.3 Maintenance Testing (නඩත්තු පරීක්ෂාව)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-2-1', match: /(<h[23][^>]*>)([^<]*2\.1\s+Testing in the Context[^<]*)(<\/h[23]>)/i },
      { id: 'sec-2-2', match: /(<h[23][^>]*>)([^<]*(?:Test Levels and Test Types|2\.2)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-2-3', match: /(<h[23][^>]*>)([^<]*2\.3\s+Maintenance Testing[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-2-1', match: /(<h[23][^>]*>)([^<]*2\.1\s+Testing in the Context[^<]*)(<\/h[23]>)/i },
      { id: 'sec-2-2', match: /(<h2[^>]*>)(1\.2 The Five Test Levels[\s\S]*?)(<\/h2>)/i },
      { id: 'sec-2-3', match: /(<h[23][^>]*>)([^<]*2\.3\s+Maintenance Testing[^<]*)(<\/h[23]>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  },
  {
    num: 3,
    titleEn: 'Chapter 03: Static Testing',
    titleSi: 'Chapter 03: ස්ථිතික පරීක්ෂාව (Static Testing)',
    shortEn: 'Ch 3: Static Testing',
    fileEn: 'istqb_ch3_study_guide.html',
    fileSi: 'istqb_ch3_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-3-1', title: '  3.1 Static Testing Basics' },
      { id: 'sec-3-2', title: '  3.2 Feedback & Review Process' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-3-1', title: '  3.1 Static Testing Basics' },
      { id: 'sec-3-2', title: '  3.2 Feedback & Review Process (සමාලෝචන)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-3-1', match: /(<h[23][^>]*>)([^<]*3\.1\s+Static Testing Basics[^<]*)(<\/h[23]>)/i },
      { id: 'sec-3-2', match: /(<h[23][^>]*>)([^<]*(?:Feedback and Review Process|3\.2)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-3-1', match: /(<h[23][^>]*>)([^<]*3\.1\s+Static Testing Basics[^<]*)(<\/h[23]>)/i },
      { id: 'sec-3-2', match: /(<h[23][^>]*>)([^<]*(?:Feedback and Review Process|සමාලෝචන ක්‍රියාවලිය)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  },
  {
    num: 4,
    titleEn: 'Chapter 04: Test Analysis and Design',
    titleSi: 'Chapter 04: පරීක්ෂණ විශ්ලේෂණය සහ සැලසුම්කරණය (Analysis & Design)',
    shortEn: 'Ch 4: Analysis & Design',
    fileEn: 'istqb_ch4_study_guide.html',
    fileSi: 'istqb_ch4_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-4-1', title: '  4.1 Test Techniques Overview' },
      { id: 'sec-4-2', title: '  4.2 Black-Box Test Techniques' },
      { id: 'sec-4-3', title: '  4.3 White-Box Test Techniques' },
      { id: 'sec-4-4', title: '  4.4 Experience-Based Techniques' },
      { id: 'sec-4-5', title: '  4.5 Collaboration-Based Approaches' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-4-1', title: '  4.1 Test Techniques Overview (හැඳින්වීම)' },
      { id: 'sec-4-2', title: '  4.2 Black-Box Techniques (කළු-පෙට්ටි)' },
      { id: 'sec-4-3', title: '  4.3 White-Box Techniques (සුදු-පෙට්ටි)' },
      { id: 'sec-4-4', title: '  4.4 Experience-Based (අත්දැකීම් පාදක)' },
      { id: 'sec-4-5', title: '  4.5 Collaboration-Based (සහයෝගී)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-4-1', match: /(<h[23][^>]*>)([^<]*4\.1\s+Overview of Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-2', match: /(<h[23][^>]*>)([^<]*4\.2\s+Black-Box Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-3', match: /(<h[23][^>]*>)([^<]*4\.3\s+White-Box Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-4', match: /(<h[23][^>]*>)([^<]*4\.4\s+Experience-Based Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-5', match: /(<h[23][^>]*>)([^<]*4\.5\s+Collaboration-Based Test Approaches[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-4-1', match: /(<h[23][^>]*>)([^<]*4\.1\s+Overview of Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-2', match: /(<h[23][^>]*>)([^<]*4\.2\s+Black-Box Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-3', match: /(<h[23][^>]*>)([^<]*4\.3\s+White-Box Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-4', match: /(<h[23][^>]*>)([^<]*4\.4\s+Experience-Based Test Techniques[^<]*)(<\/h[23]>)/i },
      { id: 'sec-4-5', match: /(<h[23][^>]*>)([^<]*4\.5\s+Collaboration-Based Test Approaches[^<]*)(<\/h[23]>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  },
  {
    num: 5,
    titleEn: 'Chapter 05: Managing the Test Activities',
    titleSi: 'Chapter 05: පරීක්ෂණ ක්‍රියාකාරකම් කළමනාකරණය (Managing Test Activities)',
    shortEn: 'Ch 5: Test Management',
    fileEn: 'istqb_ch5_study_guide.html',
    fileSi: 'istqb_ch5_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-5-1', title: '  5.1 Test Planning' },
      { id: 'sec-5-2', title: '  5.2 Risk Management' },
      { id: 'sec-5-3', title: '  5.3 Test Monitoring & Control' },
      { id: 'sec-5-4', title: '  5.4 Configuration & Defect Management' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-5-1', title: '  5.1 Test Planning (පරීක්ෂණ සැලසුම්කරණය)' },
      { id: 'sec-5-2', title: '  5.2 Risk Management (අවදානම් කළමනාකරණය)' },
      { id: 'sec-5-3', title: '  5.3 Monitoring & Control (අධීක්ෂණය)' },
      { id: 'sec-5-4', title: '  5.4 CM & Defect Management (දෝෂ)' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints (විශේෂ කරුණු)' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (නිල ශබ්දකෝෂය)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-5-1', match: /(<h[23][^>]*>)([^<]*5\.1\s+Test Planning[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-2', match: /(<h[23][^>]*>)([^<]*5\.2\s+Risk Management[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-3', match: /(<h[23][^>]*>)([^<]*(?:5\.3|Test Monitoring, Test Control)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-4', match: /(<h[23][^>]*>)([^<]*(?:5\.4|5\.5|Configuration Management|Defect Management)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-5-1', match: /(<h[23][^>]*>)([^<]*5\.1\s+Test Planning[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-2', match: /(<h[23][^>]*>)([^<]*5\.2\s+Risk Management[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-3', match: /(<h[23][^>]*>)([^<]*(?:5\.3|Test Monitoring|අධීක්ෂණය)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-5-4', match: /(<h[23][^>]*>)([^<]*(?:5\.4|5\.5|Configuration Management|දෝෂ කළමනාකරණය)[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*(?:High-Yield Exam Flashpoints|විශේෂ විභාග කරුණු)[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary|ශබ්දකෝෂය)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  },
  {
    num: 6,
    titleEn: 'Chapter 06: Test Tools',
    titleSi: 'Chapter 06: පරීක්ෂණ මෙවලම් (Test Tools)',
    shortEn: 'Ch 6: Test Tools',
    fileEn: 'istqb_ch6_study_guide.html',
    fileSi: 'istqb_ch6_study_guide_sinhala.html',
    sectionsEn: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts' },
      { id: 'sec-6-1', title: '  6.1 Tool Support for Testing' },
      { id: 'sec-6-2', title: '  6.2 Benefits & Risks of Test Automation' },
      { id: 'sec-flashpoints', title: '2. High-Yield Exam Flashpoints' },
      { id: 'sec-glossary', title: '3. Keyword Lexicon (Official Terms)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions & Answers' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    sectionsSi: [
      { id: 'sec-core', title: '1. Core Syllabus Concepts (මූලික විෂය කරුණු)' },
      { id: 'sec-6-1', title: '  6.1 Tool Support (මෙවලම් වර්ගීකරණය)' },
      { id: 'sec-6-2', title: '  6.2 Automation Benefits & Risks (වාසි/අවදානම්)' },
      { id: 'sec-questions', title: '4. Practice Exam Questions (අභ්‍යාස ප්‍රශ්න)' },
      { id: 'sec-notes', title: '5. Student Handwriting Notes' }
    ],
    anchorRulesEn: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-6-1', match: /(<h[23][^>]*>)([^<]*6\.1\s+Tool Support for Testing[^<]*)(<\/h[23]>)/i },
      { id: 'sec-6-2', match: /(<h[23][^>]*>)([^<]*6\.2\s+Benefits and Risks of Test Automation[^<]*)(<\/h[23]>)/i },
      { id: 'sec-flashpoints', match: /(<h2[^>]*>)([^<]*High-Yield Exam Flashpoints[^<]*)(<\/h2>)/i },
      { id: 'sec-glossary', match: /(<h2[^>]*>)([^<]*(?:Keyword Lexicon|Glossary)[^<]*)(<\/h2>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*Practice Exam Questions[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ],
    anchorRulesSi: [
      { id: 'sec-core', match: /(<h2[^>]*>)([^<]*Core Syllabus Concepts[^<]*)(<\/h2>)/i },
      { id: 'sec-6-1', match: /(<h[23][^>]*>)([^<]*6\.1\s+Tool Support for Testing[^<]*)(<\/h[23]>)/i },
      { id: 'sec-6-2', match: /(<h[23][^>]*>)([^<]*6\.2\s+Benefits and Risks of Test Automation[^<]*)(<\/h[23]>)/i },
      { id: 'sec-questions', match: /(<h2[^>]*>)([^<]*(?:Practice Exam Questions|අභ්‍යාස ප්‍රශ්න)[^<]*)(<\/h2>)/i },
      { id: 'sec-notes', match: /(<div class="notes-box")/i }
    ]
  }
];

// Complete Navigator, Ultra-Clear Night Theme, and Safe Print Styles
const comprehensiveInjectedCSS = `
/* ================= ISTQB MASTER STUDY DESIGN SYSTEM ================= */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 60px;
}

h1, h2, h3, h4, .notes-box, .quiz-card, [id^="sec-"] {
  scroll-margin-top: 65px;
}

/* ================= SCREEN READING CONTAINER & GUTTERS ================= */
@media screen {
  body {
    background-color: #f1f5f9;
    color: #0f172a;
    min-height: 100vh;
  }

  body.dark-reading-mode {
    background-color: #060a12 !important;
    color: #f1f5f9 !important;
  }

  .study-main-wrapper {
    width: 95%;
    max-width: 1540px;
    margin: 14px auto 50px auto;
    padding: 26px 36px 44px 36px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  body.dark-reading-mode .study-main-wrapper {
    background-color: #0b1120 !important;
    border: 1px solid #1e293b !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04);
  }
}

@media screen and (max-width: 1300px) {
  .study-main-wrapper {
    width: 96%;
    margin: 12px auto 40px auto;
    padding: 20px 24px 34px 24px;
  }
}

@media screen and (max-width: 768px) {
  .study-main-wrapper {
    width: 98%;
    margin: 8px auto 28px auto;
    padding: 16px 14px 24px 14px;
    border-radius: 8px;
  }
}

@media print {
  body {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .study-main-wrapper {
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
}

/* Base Utility Classes for Enhanced Semantics */
.si-question-sub {
  display: inline-block;
  font-weight: normal;
  font-size: 13px;
  color: #475569;
  margin-top: 4px;
  line-height: 1.55;
}

.ch-subtitle-text {
  font-size: 12.5px;
  color: #64748b;
  margin-top: 3px;
  margin-bottom: 0;
  line-height: 1.5;
}

.card-subtle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 6px 0;
}

.card-center-callout {
  background: #f8fafc;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  padding: 10px 14px;
  text-align: center;
  margin: 8px 0;
}

.card-accent-left {
  border-left: 4px solid #3b82f6 !important;
}

.card-accent-dark {
  border-left: 4px solid #1e293b !important;
}

.metric-pill {
  background: #f1f5f9;
  color: #0f172a;
  padding: 2.5px 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  font-weight: 700;
  display: inline-block;
}

.progress-bar-fill {
  background: #2563eb;
  color: #ffffff;
  border-radius: 4px;
  padding: 3px 6px;
  font-weight: 700;
  text-align: center;
  display: inline-block;
}

/* ================= ISTQB STUDY NAVIGATOR ================= */
#study-navbar {
  position: sticky;
  top: 0;
  z-index: 99999;
  background: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  border-bottom: 2px solid #3b82f6;
  font-size: 13px;
  line-height: 1.4;
  user-select: none;
}

.study-nav-container {
  max-width: 1540px;
  width: 95%;
  margin: 0 auto;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.study-nav-left, .study-nav-center, .study-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.study-nav-brand {
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
}
.study-nav-brand:hover {
  background: rgba(59, 130, 246, 0.3);
  color: #93c5fd !important;
}

.study-nav-pill-group {
  display: flex;
  align-items: center;
  background: #1e293b;
  padding: 3px 4px;
  border-radius: 6px;
  border: 1px solid #334155;
  gap: 2px;
}

.study-nav-pill {
  color: #cbd5e1 !important;
  text-decoration: none;
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.study-nav-pill:hover {
  color: #ffffff !important;
  background: #334155;
}
.study-nav-pill.active {
  background: #2563eb !important;
  color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.study-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #f1f5f9 !important;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.study-nav-btn:hover {
  background: #334155;
  border-color: #64748b;
  color: #ffffff !important;
}

.study-nav-lang-btn {
  background: #065f46;
  border-color: #059669;
  color: #ecfdf5 !important;
  font-weight: 700;
}
.study-nav-lang-btn:hover {
  background: #047857;
  border-color: #10b981;
}

.study-nav-select {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #475569;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  max-width: 220px;
}
.study-nav-select:focus {
  border-color: #3b82f6;
}

/* Floating Actions */
.floating-actions {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}
.floating-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  border: 2px solid #60a5fa;
  box-shadow: 0 4px 14px rgba(0,0,0,0.3);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.floating-btn:hover {
  transform: translateY(-3px);
  background: #1d4ed8;
}

/* Chapter Navigation Footer */
.chapter-nav-footer {
  margin-top: 36px;
  border-top: 2px solid #e2e8f0;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  page-break-inside: avoid;
  break-inside: avoid;
}
.nav-footer-card {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  text-decoration: none !important;
  color: #1e293b !important;
  transition: all 0.2s ease;
}
.nav-footer-card:hover {
  border-color: #2563eb;
  background: #eff6ff;
  transform: translateY(-2px);
}
.nav-footer-label {
  font-size: 11.5px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 3px;
}
.nav-footer-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #1e293b;
}

/* Interactive Quiz Tools */
.quiz-toggle-bar {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  gap: 8px;
}
.quiz-toggle-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.quiz-toggle-btn:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}

/* ================= ULTRA-CLEAR HIGH-CONTRAST NIGHT READING THEME ================= */
body.dark-reading-mode {
  background-color: #0b1120 !important;
  color: #f1f5f9 !important;
}

/* Headings */
body.dark-reading-mode h1 {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0,0,0,0.6);
}
body.dark-reading-mode h2 {
  color: #93c5fd !important;
  border-bottom: 2px solid #3b82f6 !important;
  padding-bottom: 4px;
}
body.dark-reading-mode h3 {
  color: #f8fafc !important;
}
body.dark-reading-mode h4,
body.dark-reading-mode h5 {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .page-start > div,
body.dark-reading-mode [style*="border-bottom: 2.5px solid"] {
  border-bottom-color: #3b82f6 !important;
}

/* Paragraphs, Lists & Body Text */
body.dark-reading-mode p,
body.dark-reading-mode li,
body.dark-reading-mode dd,
body.dark-reading-mode dt {
  color: #e2e8f0 !important;
}
body.dark-reading-mode strong,
body.dark-reading-mode b,
body.dark-reading-mode th strong,
body.dark-reading-mode td strong {
  color: #ffffff !important;
  font-weight: 700;
}
body.dark-reading-mode em,
body.dark-reading-mode i {
  color: #f1f5f9 !important;
}
body.dark-reading-mode .si-term {
  color: #38bdf8 !important;
  font-weight: 600;
}
body.dark-reading-mode .si-question-sub {
  color: #cbd5e1 !important;
}
body.dark-reading-mode .ch-subtitle-text {
  color: #94a3b8 !important;
}
body.dark-reading-mode code {
  background-color: #030712 !important;
  color: #38bdf8 !important;
  border-color: #1e293b !important;
}
body.dark-reading-mode a:not(.study-nav-btn):not(.study-nav-pill):not(.nav-footer-card) {
  color: #60a5fa !important;
}
body.dark-reading-mode a:not(.study-nav-btn):not(.study-nav-pill):not(.nav-footer-card):hover {
  color: #93c5fd !important;
}

/* Cards & Containers */
body.dark-reading-mode .card,
body.dark-reading-mode .card-subtle,
body.dark-reading-mode .card-center-callout {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45) !important;
}
body.dark-reading-mode .card-accent-left {
  border-left-color: #3b82f6 !important;
}
body.dark-reading-mode .card-accent-dark {
  border-left-color: #60a5fa !important;
}

/* Callouts */
body.dark-reading-mode .callout {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  border-left: 4px solid #3b82f6 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-info {
  background-color: #0c1e38 !important;
  border-left-color: #38bdf8 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-exam {
  background-color: #122147 !important;
  border-left-color: #3b82f6 !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .callout-warning,
body.dark-reading-mode .callout-trap {
  background-color: #2b1704 !important;
  border-left-color: #f59e0b !important;
  color: #fef3c7 !important;
}
body.dark-reading-mode .callout-warning *,
body.dark-reading-mode .callout-trap * {
  color: #fef3c7 !important;
}
body.dark-reading-mode .callout-warning strong,
body.dark-reading-mode .callout-trap strong {
  color: #fde68a !important;
}
body.dark-reading-mode .callout-danger {
  background-color: #2b0b0b !important;
  border-left-color: #ef4444 !important;
  color: #fee2e2 !important;
}
body.dark-reading-mode .callout-danger * {
  color: #fee2e2 !important;
}
body.dark-reading-mode .callout-danger strong {
  color: #fca5a5 !important;
}
body.dark-reading-mode .callout-success {
  background-color: #05281a !important;
  border-left-color: #10b981 !important;
  color: #d1fae5 !important;
}
body.dark-reading-mode .callout-success * {
  color: #d1fae5 !important;
}
body.dark-reading-mode .callout-success strong {
  color: #6ee7b7 !important;
}

/* Tables */
body.dark-reading-mode table {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  box-shadow: 0 4px 14px rgba(0,0,0,0.3) !important;
}
body.dark-reading-mode th {
  background-color: #1a273e !important;
  color: #93c5fd !important;
  border-color: #22324e !important;
  border-bottom: 2px solid #3b82f6 !important;
}
body.dark-reading-mode td {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
  border-color: #1e293b !important;
}
body.dark-reading-mode tr:nth-child(even) td {
  background-color: #131d31 !important;
}
body.dark-reading-mode tr:hover td {
  background-color: #1e2d4a !important;
}

/* Badges & Metrics */
body.dark-reading-mode .badge {
  background-color: #1e293b !important;
  color: #93c5fd !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .badge-k1 {
  background-color: #0f2b5c !important;
  color: #93c5fd !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .badge-k2 {
  background-color: #2e1065 !important;
  color: #d8b4fe !important;
  border-color: #8b5cf6 !important;
}
body.dark-reading-mode .badge-k3 {
  background-color: #431407 !important;
  color: #fdba74 !important;
  border-color: #f97316 !important;
}
body.dark-reading-mode .badge-keyword {
  background-color: #064e3b !important;
  color: #6ee7b7 !important;
  border-color: #10b981 !important;
}
body.dark-reading-mode .metric-pill {
  background-color: #1e293b !important;
  color: #38bdf8 !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .progress-bar-fill {
  background: linear-gradient(90deg, #2563eb, #38bdf8) !important;
  border-color: #60a5fa !important;
  color: #ffffff !important;
}

/* Tool Boxes */
body.dark-reading-mode .tool-box {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  border-left: 4px solid #3b82f6 !important;
}
body.dark-reading-mode .tool-box-title {
  color: #93c5fd !important;
}
body.dark-reading-mode .tool-box-desc {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .tool-examples {
  border-top-color: #22324e !important;
  color: #94a3b8 !important;
}

/* Glossary */
body.dark-reading-mode .glossary-item {
  background-color: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
}
body.dark-reading-mode .glossary-term {
  color: #60a5fa !important;
  border-bottom-color: #3b82f6 !important;
}

/* Practice Questions */
body.dark-reading-mode .quiz-card {
  background-color: #131d31 !important;
  border: 1.5px solid #22324e !important;
  border-left: 5px solid #3b82f6 !important;
  color: #e2e8f0 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45) !important;
}
body.dark-reading-mode .quiz-q {
  color: #ffffff !important;
}
body.dark-reading-mode .quiz-opt {
  color: #e2e8f0 !important;
}
body.dark-reading-mode .quiz-opt:hover {
  background-color: #1e2d4a !important;
  color: #ffffff !important;
}
body.dark-reading-mode .quiz-answer {
  background-color: #0b1222 !important;
  border-top: 1.5px dashed #38bdf8 !important;
  color: #f1f5f9 !important;
}
body.dark-reading-mode .quiz-toggle-btn {
  background-color: #1e2d4a !important;
  border-color: #3b82f6 !important;
  color: #93c5fd !important;
}
body.dark-reading-mode .quiz-toggle-btn:hover {
  background-color: #2563eb !important;
  color: #ffffff !important;
  border-color: #60a5fa !important;
}

/* Ruled Handwriting Notes Box */
body.dark-reading-mode .notes-box {
  background-color: #0b1222 !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .notes-box-header {
  color: #93c5fd !important;
  border-bottom-color: #22324e !important;
}
body.dark-reading-mode .notes-box-header span {
  color: #cbd5e1 !important;
}
body.dark-reading-mode .notes-box-lines {
  background-image: repeating-linear-gradient(transparent, transparent 17px, #263859 17px, #263859 18px) !important;
}

/* Quadrants, Formulas & Footer */
body.dark-reading-mode .quadrant-card {
  background-color: #131d31 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .formula-box {
  background-color: #0b1222 !important;
  border-color: #3b82f6 !important;
  color: #38bdf8 !important;
}
body.dark-reading-mode .footer-note {
  color: #94a3b8 !important;
  border-top-color: #22324e !important;
}

/* Study Navbar in Dark Mode */
body.dark-reading-mode #study-navbar {
  background: #060a12 !important;
  border-bottom-color: #3b82f6 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7) !important;
}
body.dark-reading-mode .study-nav-brand {
  background: #1e293b !important;
  color: #60a5fa !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-brand span {
  color: #93c5fd !important;
}
body.dark-reading-mode .study-nav-brand strong {
  color: #ffffff !important;
}
body.dark-reading-mode .study-nav-pill-group {
  background: #0d1527 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-pill {
  color: #94a3b8 !important;
}
body.dark-reading-mode .study-nav-pill:hover {
  background: #1e2d4a !important;
  color: #ffffff !important;
}
body.dark-reading-mode .study-nav-pill.active {
  background: #2563eb !important;
  color: #ffffff !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-select {
  background-color: #131d31 !important;
  color: #ffffff !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-select option {
  background: #0b1120 !important;
  color: #ffffff !important;
}
body.dark-reading-mode .study-nav-btn {
  background: #131d31 !important;
  color: #cbd5e1 !important;
  border-color: #22324e !important;
}
body.dark-reading-mode .study-nav-btn:hover {
  background: #1e2d4a !important;
  color: #ffffff !important;
  border-color: #3b82f6 !important;
}
body.dark-reading-mode .study-nav-lang-btn {
  background: #064e3b !important;
  color: #6ee7b7 !important;
  border-color: #059669 !important;
}
body.dark-reading-mode .study-nav-lang-btn:hover {
  background: #047857 !important;
  color: #ffffff !important;
}
body.dark-reading-mode #theme-toggle-btn {
  background: #facc15 !important;
  color: #000000 !important;
  border-color: #eab308 !important;
  font-weight: 700 !important;
}
body.dark-reading-mode #theme-toggle-btn:hover {
  background: #fef08a !important;
}

/* Floating Actions & Footer */
body.dark-reading-mode .floating-btn {
  background: #2563eb !important;
  color: #ffffff !important;
  border-color: #60a5fa !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important;
}
body.dark-reading-mode .chapter-nav-footer {
  border-top-color: #22324e !important;
}
body.dark-reading-mode .nav-footer-card {
  background: #131d31 !important;
  border-color: #22324e !important;
  color: #e2e8f0 !important;
  text-decoration: none !important;
}
body.dark-reading-mode .nav-footer-card:hover {
  background: #1e2d4a !important;
  border-color: #3b82f6 !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
}
body.dark-reading-mode .nav-footer-label {
  color: #94a3b8 !important;
}
body.dark-reading-mode .nav-footer-title {
  color: #60a5fa !important;
}

/* Fallback Universal Overrides */
body.dark-reading-mode [style*="color: #111827"],
body.dark-reading-mode [style*="color: #374151"],
body.dark-reading-mode [style*="color: #4b5563"],
body.dark-reading-mode [style*="color: #000000"],
body.dark-reading-mode [style*="color: black"],
body.dark-reading-mode [style*="color:#111827"],
body.dark-reading-mode [style*="color:#374151"] {
  color: #e2e8f0 !important;
}
body.dark-reading-mode strong[style*="color:"],
body.dark-reading-mode b[style*="color:"] {
  color: #ffffff !important;
}

/* STRICT PRINT OVERRIDE: ALWAYS CLEAN PAPER PRINT */
@media print {
  #study-navbar,
  .floating-actions,
  .chapter-nav-footer,
  .quiz-toggle-bar {
    display: none !important;
  }
  .quiz-answer {
    display: block !important;
  }
  body,
  body.dark-reading-mode {
    padding-top: 0 !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  body *,
  body.dark-reading-mode * {
    color: #000000 !important;
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  .card,
  .callout,
  .tool-box,
  .glossary-item,
  .quiz-card,
  table,
  th,
  td {
    border-color: #4b5563 !important;
  }
  th {
    border-bottom: 2px solid #000000 !important;
  }
  .notes-box {
    border-color: #6b7280 !important;
  }
  .notes-box-lines {
    background-image: repeating-linear-gradient(transparent, transparent 17px, #9ca3af 17px, #9ca3af 18px) !important;
  }
}
`;

const enhancedNavScript = `
<script>
  function toggleReadingTheme() {
    document.body.classList.toggle('dark-reading-mode');
    const isDark = document.body.classList.contains('dark-reading-mode');
    localStorage.setItem('istqb_reading_theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
  }

  function jumpToSection(sel) {
    const val = sel.value;
    if (!val) return;
    const target = document.getElementById(val);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.location.hash = val;
    }
  }

  function switchLanguage(targetUrl) {
    const hash = window.location.hash;
    window.location.href = targetUrl + (hash ? hash : '');
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Restore user theme preference
  document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('istqb_reading_theme');
    const btn = document.getElementById('theme-toggle-btn');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-reading-mode');
      if (btn) btn.innerHTML = '☀️ Light';
    } else {
      document.body.classList.remove('dark-reading-mode');
      if (btn) btn.innerHTML = '🌙 Dark';
    }

    // Add interactive Toggle Answer feature for each quiz card
    const quizCards = document.querySelectorAll('.quiz-card');
    quizCards.forEach(function(card) {
      const answer = card.querySelector('.quiz-answer');
      if (answer && !card.querySelector('.btn-reveal-answer')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'quiz-toggle-btn btn-reveal-answer';
        toggleBtn.textContent = '👁️ Reveal Answer & Rationale';
        toggleBtn.style.marginTop = '6px';
        toggleBtn.style.display = 'inline-block';
        
        // Hide answer by default for active practice
        answer.style.display = 'none';

        toggleBtn.addEventListener('click', function() {
          if (answer.style.display === 'none') {
            answer.style.display = 'block';
            toggleBtn.textContent = '🙈 Hide Answer';
          } else {
            answer.style.display = 'none';
            toggleBtn.textContent = '👁️ Reveal Answer & Rationale';
          }
        });

        card.insertBefore(toggleBtn, answer);
      }
    });

    // Add "Reveal All Answers" button above quiz section
    const qSection = document.getElementById('sec-questions');
    if (qSection && !document.querySelector('.quiz-toggle-bar')) {
      const bar = document.createElement('div');
      bar.className = 'quiz-toggle-bar';
      bar.innerHTML = '<button type="button" class="quiz-toggle-btn" id="btn-toggle-all-answers">👁️ Reveal All Answers</button>';
      qSection.insertAdjacentElement('afterend', bar);

      const btnAll = document.getElementById('btn-toggle-all-answers');
      let allShown = false;
      btnAll.addEventListener('click', function() {
        allShown = !allShown;
        document.querySelectorAll('.quiz-card').forEach(function(card) {
          const ans = card.querySelector('.quiz-answer');
          const tBtn = card.querySelector('.btn-reveal-answer');
          if (ans) ans.style.display = allShown ? 'block' : 'none';
          if (tBtn) tBtn.textContent = allShown ? '🙈 Hide Answer' : '👁️ Reveal Answer & Rationale';
        });
        btnAll.textContent = allShown ? '🙈 Hide All Answers' : '👁️ Reveal All Answers';
      });
    }
  });
</script>
`;

function buildNavbar(ch, isSinhala) {
  const prevCh = ch.num > 1 ? chaptersConfig[ch.num - 2] : null;
  const nextCh = ch.num < 6 ? chaptersConfig[ch.num] : null;

  const otherFolder = isSinhala ? '../02_English_Study_Guides_HTML' : '../03_Sinhala_Study_Guides_HTML';
  const otherFile = isSinhala ? ch.fileEn : ch.fileSi;

  const langLabel = isSinhala ? '🇬🇧 English Version' : '🇱🇰 සිංහල අනුවාදය';
  const homeLink = '../index.html';

  let pillsHtml = chaptersConfig.map(c => {
    const href = isSinhala ? c.fileSi : c.fileEn;
    const activeClass = c.num === ch.num ? ' active' : '';
    return `<a href="${href}" class="study-nav-pill${activeClass}" title="${isSinhala ? c.titleSi : c.titleEn}">Ch ${c.num}</a>`;
  }).join('');
  pillsHtml += `<a href="../05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html" class="study-nav-pill" style="background: #064e3b; color: #a7f3d0 !important; border: 1px solid #059669;" title="Launch Official 40-Question Mock Exam Simulator">🎯 40Q Simulator</a>`;

  const sectionsList = isSinhala ? ch.sectionsSi : ch.sectionsEn;
  let optionsHtml = `<option value="">📑 Jump to Section...</option>`;
  sectionsList.forEach(s => {
    optionsHtml += `<option value="${s.id}">${s.title}</option>`;
  });

  const prevBtnHtml = prevCh
    ? `<a href="${isSinhala ? prevCh.fileSi : prevCh.fileEn}" class="study-nav-btn" title="Go to ${prevCh.shortEn}">◀ Prev</a>`
    : `<span class="study-nav-btn" style="opacity:0.4; cursor:not-allowed;">◀ Prev</span>`;

  const nextBtnHtml = nextCh
    ? `<a href="${isSinhala ? nextCh.fileSi : nextCh.fileEn}" class="study-nav-btn" title="Go to ${nextCh.shortEn}">Next ▶</a>`
    : `<span class="study-nav-btn" style="opacity:0.4; cursor:not-allowed;">Next ▶</span>`;

  return `
<!-- ================= STUDY NAVBAR ================= -->
<nav id="study-navbar">
  <div class="study-nav-container">
    <div class="study-nav-left">
      <a href="${homeLink}" class="study-nav-brand" title="Master Study Dashboard">
        <span>🏠</span> <strong>ISTQB® CTFL Hub</strong>
      </a>
      <div class="study-nav-pill-group">
        ${pillsHtml}
      </div>
    </div>

    <div class="study-nav-center">
      <select class="study-nav-select" onchange="jumpToSection(this)">
        ${optionsHtml}
      </select>
      ${prevBtnHtml}
      ${nextBtnHtml}
    </div>

    <div class="study-nav-right">
      <a href="javascript:void(0)" onclick="switchLanguage('${otherFolder}/${otherFile}')" class="study-nav-btn study-nav-lang-btn" title="Switch language for Chapter ${ch.num}">
        ⇄ ${langLabel}
      </a>
      <button id="theme-toggle-btn" class="study-nav-btn" onclick="toggleReadingTheme()" title="Toggle Reading Theme">
        🌙 Dark
      </button>
      <button class="study-nav-btn" onclick="window.print()" title="Print this guide or save as PDF">
        🖨️ Print
      </button>
    </div>
  </div>
</nav>
`;
}

function buildFooter(ch, isSinhala) {
  const prevCh = ch.num > 1 ? chaptersConfig[ch.num - 2] : null;
  const nextCh = ch.num < 6 ? chaptersConfig[ch.num] : null;
  const homeLink = '../index.html';

  const prevCard = prevCh
    ? `<a href="${isSinhala ? prevCh.fileSi : prevCh.fileEn}" class="nav-footer-card">
        <span class="nav-footer-label">◀ Previous Chapter</span>
        <span class="nav-footer-title">${isSinhala ? prevCh.titleSi : prevCh.titleEn}</span>
       </a>`
    : `<div class="nav-footer-card" style="opacity:0.35; cursor:not-allowed;">
        <span class="nav-footer-label">Beginning</span>
        <span class="nav-footer-title">First Chapter</span>
       </div>`;

  const centerCard = `
    <a href="${homeLink}" class="nav-footer-card" style="text-align: center; align-items: center;">
      <span class="nav-footer-label">Master Overview</span>
      <span class="nav-footer-title">🏠 Study Hub</span>
    </a>
  `;

  const nextCard = nextCh
    ? `<a href="${isSinhala ? nextCh.fileSi : nextCh.fileEn}" class="nav-footer-card" style="text-align: right;">
        <span class="nav-footer-label">Next Chapter ▶</span>
        <span class="nav-footer-title">${isSinhala ? nextCh.titleSi : nextCh.titleEn}</span>
       </a>`
    : `<div class="nav-footer-card" style="opacity:0.35; cursor:not-allowed; text-align: right;">
        <span class="nav-footer-label">Completion</span>
        <span class="nav-footer-title">All Chapters Completed 🎉</span>
       </div>`;

  const simCard = `
    <a href="../05_Practice_Questions_and_Summaries/istqb_mock_exam_simulator.html" class="nav-footer-card" style="text-align: center; align-items: center; border-color: #059669; background: #064e3b;">
      <span class="nav-footer-label" style="color: #6ee7b7;">Test Exam Readiness</span>
      <span class="nav-footer-title" style="color: #ffffff;">🎯 40Q Mock Simulator</span>
    </a>
  `;

  return `
<!-- ================= CHAPTER NAVIGATION FOOTER ================= -->
<div class="chapter-nav-footer">
  ${prevCard}
  ${centerCard}
  ${simCard}
  ${nextCard}
</div>
</div><!-- /.study-main-wrapper -->

<!-- Floating Back to Top Button -->
<div class="floating-actions">
  <button class="floating-btn" onclick="scrollToTop()" title="Scroll to Top">⬆</button>
</div>
`;
}

function applyAnchorsAndNav(filePath, ch, isSinhala) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Cleanly strip all previously injected CSS between .footer-note and </style>
  const footerNoteIdx = content.indexOf('.footer-note');
  if (footerNoteIdx !== -1) {
    const endBaseStyle = content.indexOf('}', footerNoteIdx) + 1;
    const styleEndIdx = content.indexOf('</style>', endBaseStyle);
    if (styleEndIdx !== -1) {
      content = content.slice(0, endBaseStyle) + '\n\n' + comprehensiveInjectedCSS.trim() + '\n' + content.slice(styleEndIdx);
    }
  }

  // 2. Clean out previous navbar, wrapper, footer, script, and toggle bar
  content = content.replace(/<!-- ================= STUDY NAVBAR ================= -->[\s\S]*?<\/nav>\s*/gi, '');
  content = content.replace(/<!-- Reading Document Container -->\s*<div class="study-main-wrapper">\s*/gi, '');
  content = content.replace(/<\/div><!-- \/\.study-main-wrapper -->\s*/gi, '');
  content = content.replace(/<!-- ================= CHAPTER NAVIGATION FOOTER ================= -->[\s\S]*?(?:<\/body>|$)/i, '</body>');
  content = content.replace(/<!-- Floating Back to Top Button -->[\s\S]*?(?:<\/body>|$)/i, '</body>');
  content = content.replace(/<script>[\s\S]*?toggleReadingTheme[\s\S]*?<\/script>\s*/gi, '');
  content = content.replace(/<div class="quiz-toggle-bar">[\s\S]*?<\/div>\s*/gi, '');
  content = content.replace(/<button[^>]*class="quiz-toggle-btn btn-reveal-answer"[^>]*>[\s\S]*?<\/button>\s*/gi, '');

  // 3. Inject Static Element IDs based on rules
  const rules = isSinhala ? ch.anchorRulesSi : ch.anchorRulesEn;
  rules.forEach(rule => {
    if (!content.includes(`id="${rule.id}"`)) {
      if (rule.id === 'sec-notes') {
        content = content.replace(rule.match, `<div id="${rule.id}" class="notes-box"`);
      } else {
        content = content.replace(rule.match, (full, p1, p2, p3) => {
          if (p1.includes('id=')) return full;
          return p1.replace(/>$/, ` id="${rule.id}">`) + p2 + p3;
        });
      }
    }
  });

  // 4. Inject Navbar after <body> and open reading wrapper
  const navbarHtml = buildNavbar(ch, isSinhala);
  content = content.replace(/<body[^>]*>/i, match => match + '\n' + navbarHtml + '\n<!-- Reading Document Container -->\n<div class="study-main-wrapper">\n');

  // 5. Inject Footer & Script before </body>
  const footerHtml = buildFooter(ch, isSinhala) + '\n' + enhancedNavScript;
  content = content.replace(/<\/body>/i, footerHtml + '\n</body>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Cleanly upgraded: ${path.basename(filePath)}`);
}

// Execute on all 12 files
chaptersConfig.forEach(ch => {
  const f = path.join(enDir, ch.fileEn);
  applyAnchorsAndNav(f, ch, false);
});

chaptersConfig.forEach(ch => {
  const f = path.join(siDir, ch.fileSi);
  applyAnchorsAndNav(f, ch, true);
});

console.log('\nAll 12 files successfully upgraded with clean CSS, balanced braces, and high-contrast night theme!');
