/**
 * Adds "Part 2" practice questions that cover every learning objective
 * which previously had no question (23 LOs), to both English and Sinhala guides.
 * Idempotent: removes a previously inserted Part 2 block before re-inserting.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const enDir = path.join(root, '02_English_Study_Guides_HTML');
const siDir = path.join(root, '03_Sinhala_Study_Guides_HTML');

const MARK_START = '<!-- PART2-QUESTIONS-START -->';
const MARK_END = '<!-- PART2-QUESTIONS-END -->';

const Q = {
  1: [
    {
      lo: 'FL-1.2.1', k: 2, ans: 'B',
      q: 'Which example BEST illustrates why testing is necessary?',
      opts: [
        'Testing guarantees that the released system contains no remaining defects.',
        'Testing a payment module before release detects a rounding defect that would have overcharged customers, reducing the risk of financial loss and reputation damage.',
        'Testing replaces the need for requirements reviews and code reviews.',
        'Testing is needed only because the contract says so, not because it reduces risk.'
      ],
      ra: 'Testing, performed at appropriate points in the SDLC, detects defects before they become failures in operation, reducing risk and contributing to software quality (Section 1.2.1). Option A violates Principle 1 (testing cannot show the absence of defects). Option C is wrong because static testing (reviews) complements dynamic testing. Option D ignores the main purpose: risk reduction.',
      qsi: 'පහත උදාහරණවලින් පරීක්ෂාව අවශ්‍ය වන්නේ ඇයිද යන්න වඩාත් හොඳින් පැහැදිලි කරන්නේ කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර B. නිකුත් කිරීමට පෙර ගෙවීම් මොඩියුලය පරීක්ෂා කිරීමෙන් ගනුදෙනුකරුවන්ට වැඩියෙන් අය කිරීමට හේතුවන වටයා ගැනීමේ (rounding) දෝෂයක් හඳුනාගත හැකිය; මෙය මූල්‍ය අලාභ සහ ප්‍රතිරූපයට හානිවීමේ අවදානම අඩු කරයි. A වැරදියි (Principle 1: පරීක්ෂාවෙන් දෝෂ නොමැති බව සනාථ කළ නොහැක). C වැරදියි (reviews වැනි static testing ද අවශ්‍යයි). D වැරදියි (පරීක්ෂාවේ ප්‍රධාන අරමුණ අවදානම අඩු කිරීමයි).'
    },
    {
      lo: 'FL-1.2.2', k: 1, ans: 'C',
      q: 'What is the relation between testing and quality assurance (QA)?',
      opts: [
        'Testing and QA are the same activity; both are product-oriented and corrective.',
        'QA is a product-oriented activity that is performed only after testing has finished.',
        'Testing is a form of quality control (product-oriented, corrective) that supports quality assurance, which is process-oriented and preventive.',
        'QA applies only to testers, while developers are responsible for quality control only.'
      ],
      ra: 'Quality management includes QA and QC. QA is a process-oriented, preventive approach focused on implementing and improving processes. QC is a product-oriented, corrective approach, and testing is a major form of QC. Test results are used in QC to fix defects and in QA as feedback on how well the development and test processes perform (Section 1.2.2).',
      qsi: 'පරීක්ෂාව (testing) සහ තත්ත්ව සහතිකකරණය (Quality Assurance - QA) අතර සම්බන්ධය නිවැරදිව දක්වන්නේ කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර C. QA යනු ක්‍රියාවලි කේන්ද්‍රීය (process-oriented) වැළැක්වීමේ (preventive) ප්‍රවේශයකි. පරීක්ෂාව යනු නිෂ්පාදිතය කේන්ද්‍ර කරගත් (product-oriented) නිවැරදි කිරීමේ (corrective) quality control (QC) ක්‍රියාකාරකමකි. පරීක්ෂණ ප්‍රතිඵල QC හි දෝෂ නිවැරදි කිරීමට ද, QA හි සංවර්ධන සහ පරීක්ෂණ ක්‍රියාවලිවල ක්‍රියාකාරීත්වය පිළිබඳ ප්‍රතිපෝෂණයක් ලෙස ද භාවිත වේ.'
    },
    {
      lo: 'FL-1.4.2', k: 2, ans: 'C',
      q: 'A company that normally builds web shops starts a safety-critical medical device project that is subject to strict regulation. According to the syllabus, how will this context most likely affect the test process?',
      opts: [
        'The test process stays identical, because test activities are generic.',
        'Testing is reduced, because the regulator performs the verification.',
        'The test process is adapted: for example more formal planning, stricter documentation and traceability, independent testing and stricter exit criteria.',
        'Only the tools change; plans, techniques and criteria remain unchanged.'
      ],
      ra: 'There is no universal test process. It is tailored to the context: SDLC model, test levels and types, product and project risks, business domain, operational constraints (budget, resources, timescales, complexity, contractual and regulatory requirements), organizational policies and required standards (Section 1.4.2). A regulated safety-critical project therefore needs more rigor.',
      qsi: 'සාමාන්‍යයෙන් වෙබ් වෙළඳසැල් සංවර්ධනය කරන ආයතනයක් දැඩි නියාමන රීතිවලට යටත් ආරක්ෂාව-තීරණාත්මක (safety-critical) වෛද්‍ය උපකරණ ව්‍යාපෘතියක් ආරම්භ කරයි. විෂය නිර්දේශයට අනුව සන්දර්භය (context) පරීක්ෂණ ක්‍රියාවලියට බලපාන්නේ කෙසේද?',
      rsi: 'නිවැරදි පිළිතුර C. සෑම ව්‍යාපෘතියකටම ගැළපෙන විශ්වීය පරීක්ෂණ ක්‍රියාවලියක් නොමැත; එය SDLC ආකෘතිය, පරීක්ෂණ මට්ටම් සහ වර්ග, product සහ project අවදානම්, ව්‍යාපාරික ක්ෂේත්‍රය, මෙහෙයුම් සීමාවන් (අයවැය, කාලය, නියාමන/ගිවිසුම් අවශ්‍යතා), සංවිධානයේ ප්‍රතිපත්ති සහ අනුගමනය කළ යුතු ප්‍රමිතීන් අනුව සකසාගනු ලැබේ. නියාමනයට යටත් safety-critical ව්‍යාපෘතියක දී වඩා විධිමත් සැලසුම්කරණය, දැඩි ලේඛනගත කිරීම සහ traceability, ස්වාධීන පරීක්ෂාව සහ දැඩි exit criteria අවශ්‍ය වේ.'
    },
    {
      lo: 'FL-1.4.5', k: 2, ans: 'A',
      q: 'Which activity is MOST typical of the test management role, as opposed to the testing role?',
      opts: [
        'Planning, monitoring and controlling the test process, for example writing the test plan, tracking progress and initiating corrective actions.',
        'Analyzing the test basis and designing test cases.',
        'Implementing and running automated test scripts.',
        'Setting up test environments and preparing test data.'
      ],
      ra: 'The test management role takes overall responsibility for the test process, the test team and the leadership of test activities, mainly test planning, monitoring, control and completion. The testing role takes responsibility for the engineering (technical) aspects: analysis, design, implementation and execution. One person may hold both roles (Section 1.4.5).',
      qsi: 'පරීක්ෂණ කළමනාකරණ භූමිකාවට (test management role), පරීක්ෂණ භූමිකාවට (testing role) වඩා වඩාත් සාමාන්‍ය ක්‍රියාකාරකම කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර A. Test management role එක පරීක්ෂණ ක්‍රියාවලිය, පරීක්ෂණ කණ්ඩායම සහ පරීක්ෂණ ක්‍රියාකාරකම්වල නායකත්වය සඳහා සමස්ත වගකීම දරයි (සැලසුම්කරණය, අධීක්ෂණය, පාලනය, සම්පූර්ණ කිරීම). Testing role එක පරීක්ෂාවේ තාක්ෂණික (engineering) පැති වන විශ්ලේෂණය, සැලසුම්කරණය, ක්‍රියාත්මක කිරීම සහ execution සඳහා වගකීම දරයි. භූමිකා දෙකම එකම පුද්ගලයෙකු විසින් ද ඉටුකළ හැකිය.'
    },
    {
      lo: 'FL-1.5.1', k: 2, ans: 'D',
      q: 'A tester wonders what happens if a user enters a negative quantity (not mentioned in the requirements), tries it, and then explains the resulting failure to the developer in a clear, non-confrontational way. Which generic testing skills is the tester mainly demonstrating?',
      opts: [
        'Project budgeting and contract negotiation',
        'Database administration and programming skills only',
        'Legal expertise in the business domain',
        'Curiosity, critical thinking and good communication skills'
      ],
      ra: 'Generic skills required for testing include testing knowledge, thoroughness and attention to detail, curiosity, analytical and critical thinking, creativity, good communication (including active listening), being a team player, and technical and domain knowledge (Section 1.5.1). Trying an unspecified input shows curiosity and critical thinking; explaining the failure constructively shows communication skills.',
      qsi: 'ටෙස්ටර් කෙනෙක්, අවශ්‍යතාවල සඳහන් නොවූවත් භාවිතාකරුවෙකු ඍණ ප්‍රමාණයක් ඇතුළත් කළහොත් කුමක් සිදුවේදැයි කුතුහලයෙන් එය අත්හදා බලා, එහි අසාර්ථකත්වය සංවර්ධකයාට පැහැදිලිව සහ ගැටුමකින් තොරව පහදා දෙයි. මෙහිදී ඔහු ප්‍රධාන වශයෙන් පෙන්වන සාමාන්‍ය (generic) කුසලතා මොනවාද?',
      rsi: 'නිවැරදි පිළිතුර D. පරීක්ෂණ සඳහා අවශ්‍ය සාමාන්‍ය කුසලතාවලට පරීක්ෂණ දැනුම, සවිස්තරාත්මක බව සහ අවධානය, කුතුහලය, විශ්ලේෂණාත්මක සහ විචාරශීලී (critical) චින්තනය, නිර්මාණශීලීත්වය, හොඳ සන්නිවේදනය (ක්‍රියාකාරීව සවන් දීම ඇතුළුව), කණ්ඩායම් සාමාජිකයෙකු ලෙස ක්‍රියා කිරීම සහ තාක්ෂණික/ක්ෂේත්‍ර දැනුම ඇතුළත් වේ. නිශ්චිතව සඳහන් නොකළ ආදානයක් අත්හදා බැලීම කුතුහලය සහ critical thinking පෙන්වන අතර, අසාර්ථකත්වය ගොඩනගන ආකාරයෙන් පැහැදිලි කිරීම සන්නිවේදන කුසලතා පෙන්වයි.'
    },
    {
      lo: 'FL-1.5.2', k: 1, ans: 'B',
      q: 'Which of the following is an advantage of the whole team approach?',
      opts: [
        'Testers work in isolation from developers so that their independence is preserved at all times.',
        'Team members with different skill sets collaborate, which improves communication and synergy, and quality becomes the responsibility of the whole team.',
        'Developers no longer need to review or test their own work, because testers own all quality activities.',
        'The testing role disappears, so test planning is no longer needed.'
      ],
      ra: 'In the whole team approach, any team member with the necessary knowledge and skills can perform any task, and everyone is responsible for quality. Advantages: improved communication and collaboration, synergy from leveraging different skill sets, and quality becoming everyone\'s responsibility (Section 1.5.2).',
      qsi: 'සමස්ත කණ්ඩායම් ප්‍රවේශයේ (whole team approach) වාසියක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර B. Whole team approach එකේදී අවශ්‍ය දැනුම සහ කුසලතා ඇති ඕනෑම කණ්ඩායම් සාමාජිකයෙකුට ඕනෑම කාර්යයක් කළ හැකිය; සෑම දෙනාම quality සඳහා වගකිව යුතුය. වාසි: සන්නිවේදනය සහ සහයෝගීතාව වැඩිවීම, විවිධ කුසලතා එකතු වීමෙන් synergy ඇතිවීම, සහ quality සමස්ත කණ්ඩායමේ වගකීමක් බවට පත්වීම.'
    }
  ],
  2: [
    {
      lo: 'FL-2.1.4', k: 2, ans: 'A',
      q: 'Which of the following is a typical impact of DevOps on testing?',
      opts: [
        'Automated regression tests in the CI/CD pipeline give fast feedback on quality and reduce the risk of regression defects.',
        'Because deployment is continuous, non-functional characteristics no longer need to be tested.',
        'Test automation is no longer necessary because the pipeline tests itself.',
        'Testing is moved to the very end of the pipeline so that development is never slowed down.'
      ],
      ra: 'DevOps benefits for testing: fast feedback on quality, CI promoting shift-left, stable test environments through CI/CD automation, more focus on non-functional characteristics (e.g. performance, reliability), less repetitive manual testing and a lower regression risk. Risks: the delivery pipeline must be defined and established, CI/CD tools must be introduced and maintained, and test automation needs extra resources and can be hard to build and maintain (Section 2.1.4).',
      qsi: 'DevOps මගින් පරීක්ෂාවට ඇතිවන සාමාන්‍ය බලපෑමක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර A. DevOps හි වාසි: quality පිළිබඳ ඉක්මන් ප්‍රතිපෝෂණ, CI මගින් shift-left ප්‍රවර්ධනය, CI/CD මගින් ස්ථායී පරීක්ෂණ පරිසර, non-functional ලක්ෂණ (performance, reliability) කෙරෙහි වැඩි අවධානය, ස්වයංක්‍රීයකරණයෙන් නැවත නැවත කරන manual පරීක්ෂණ අඩුවීම සහ regression අවදානම අඩුවීම. අවදානම්: delivery pipeline එක නිර්වචනය/ස්ථාපනය කළ යුතුය; CI/CD මෙවලම් හඳුන්වාදී පවත්වාගත යුතුය; test automation සඳහා අමතර සම්පත් අවශ්‍ය වන අතර එය ස්ථාපනය/පවත්වාගැනීම අපහසු විය හැකිය.'
    },
    {
      lo: 'FL-2.1.6', k: 2, ans: 'C',
      q: 'How can retrospectives be used as a mechanism for process improvement?',
      opts: [
        'Management alone holds them before the project starts in order to assign blame for earlier failures.',
        'They automatically re-run all regression tests to compare the results of two iterations.',
        'The team discusses what was successful and what could be improved, agrees how to incorporate improvements, and records the results (for example in the test completion report).',
        'They replace test completion reports and are never documented.'
      ],
      ra: 'Retrospectives are held at the end of a project or iteration, at a release milestone, or when needed. Participants discuss what to retain, what to improve and how to incorporate improvements; the results should be recorded, typically in the test completion report. Benefits for testing: higher test effectiveness and efficiency, better testware quality, team bonding and learning, better test basis quality and better cooperation between development and testing (Section 2.1.6).',
      qsi: 'ක්‍රියාවලි වැඩිදියුණු කිරීමේ යාන්ත්‍රණයක් ලෙස retrospectives භාවිත වන්නේ කෙසේද?',
      rsi: 'නිවැරදි පිළිතුර C. Retrospective එක ව්‍යාපෘතියක/iteration එකක අවසානයේ හෝ release milestone එකකදී පැවැත්වේ. කණ්ඩායම ඵලදායී වූ දේ (පවත්වාගත යුතු) සහ වැඩිදියුණු කළ යුතු දේ සාකච්ඡා කර, වැඩිදියුණු කිරීම් ක්‍රියාත්මක කරන ආකාරය තීරණය කරයි; ප්‍රතිඵල වාර්තා කර (උදා: test completion report එකේ) තබාගනී. ප්‍රතිලාභ: පරීක්ෂණ effectiveness/efficiency වැඩිවීම, testware ගුණාත්මකභාවය, කණ්ඩායම් බැඳීම සහ ඉගෙනීම, test basis ගුණාත්මකභාවය සහ සංවර්ධනය-පරීක්ෂණ සහයෝගීතාව.'
    }
  ],
  4: [
    {
      lo: 'FL-4.1.1', k: 2, ans: 'C',
      q: 'A tester designs tests from personal experience of defects found in similar applications and knowledge of typical developer mistakes, without deriving the tests from a formal model or from the code structure. Which category of test techniques is this?',
      opts: [
        'Black-box test techniques, because the tester does not look at the code.',
        'White-box test techniques, because the tester uses knowledge of defects.',
        'Experience-based test techniques.',
        'Static test techniques.'
      ],
      ra: 'Black-box techniques derive tests from specifications and models without referring to the internal structure. White-box techniques derive tests from the structure (code, architecture, detailed design). Experience-based techniques use the knowledge and experience of testers, developers, users and other stakeholders. Static techniques evaluate work products without executing code (Section 4.1).',
      qsi: 'සමාන යෙදුම්වල සොයාගත් දෝෂ පිළිබඳ පෞද්ගලික අත්දැකීම් සහ සංවර්ධකයින්ගේ සාමාන්‍ය වැරදි පිළිබඳ දැනුම මත පදනම්ව, විධිමත් ආකෘතියකින් හෝ code ව්‍යුහයෙන් පරීක්ෂණ ව්‍යුත්පන්න නොකර, ටෙස්ටර් කෙනෙක් පරීක්ෂණ සැලසුම් කරයි. මෙය කුමන වර්ගයේ පරීක්ෂණ තාක්ෂණයක්ද?',
      rsi: 'නිවැරදි පිළිතුර C. Black-box techniques පරීක්ෂණ ව්‍යුත්පන්න කරන්නේ අභ්‍යන්තර ව්‍යුහයට යොමු නොවී specifications/ආකෘති මගිනි. White-box techniques පරීක්ෂණ ව්‍යුත්පන්න කරන්නේ code, architecture හෝ detailed design වැනි ව්‍යුහයෙනි. Experience-based techniques පරීක්ෂකවරුන්ගේ, සංවර්ධකයින්ගේ සහ පරිශීලකයින්ගේ දැනුම සහ අත්දැකීම් මත පදනම් වේ. Static techniques යනු code ක්‍රියාත්මක නොකර කරන ඇගයීමකි.'
    },
    {
      lo: 'FL-4.2.3', k: 3, ans: 'B',
      q: 'A decision table for ATM cash withdrawal uses the conditions C1 "Card valid?", C2 "PIN correct?" and C3 "Sufficient balance?". Rules: R1 (C1=Y, C2=Y, C3=Y) dispense cash; R2 (Y, Y, N) show "insufficient funds"; R3 (Y, N, &ndash;) reject the PIN; R4 (N, &ndash;, &ndash;) retain the card. The "&ndash;" means the condition is irrelevant for that rule. What is the minimum number of test cases needed to achieve 100% decision table coverage?',
      opts: ['3', '4', '5', '8'],
      ra: 'Decision table coverage = number of rules (columns) exercised by at least one test case / total number of feasible rules. The table has 4 rules (the "&ndash;" values collapse the 2<sup>3</sup> = 8 possible combinations into 4 rules), so one test per rule gives 100% coverage: <b>4 test cases</b> (Section 4.2.3).',
      qsi: 'ATM මුදල් ආපසු ගැනීම සඳහා decision table එකක conditions: C1 "කාඩ්පත වලංගුද?", C2 "PIN නිවැරදිද?", C3 "ප්‍රමාණවත් ශේෂයක් තිබේද?". නීති: R1 (Y,Y,Y) මුදල් නිකුත් කරයි; R2 (Y,Y,N) "ශේෂය ප්‍රමාණවත් නොවේ" පණිවිඩය; R3 (Y,N,&ndash;) PIN ප්‍රතික්ෂේප කරයි; R4 (N,&ndash;,&ndash;) කාඩ්පත රඳවා ගනී ("&ndash;" යනු එම නීතියට එම condition එක අදාළ නොවන බවයි). 100% decision table coverage ලබා ගැනීමට අවශ්‍ය අවම පරීක්ෂණ ගණන කොපමණද?',
      rsi: 'නිවැරදි පිළිතුර B (4). Decision table coverage = අවම වශයෙන් එක් පරීක්ෂණයකින් ආවරණය කළ rules (තීරු) ගණන ÷ ශක්‍ය rules මුළු ගණන. "&ndash;" (irrelevant) භාවිතයෙන් rules 4 ක් දක්වා සංක්ෂිප්ත කර ඇති නිසා, සෑම rule එකක් සඳහාම එක් පරීක්ෂණයක් බැගින් <b>පරීක්ෂණ 4ක්</b> අවශ්‍යයි. සංක්ෂිප්ත නොකළ සම්පූර්ණ වගුවක තීරු 2<sup>3</sup> = 8ක් තිබෙනු ඇත.'
    },
    {
      lo: 'FL-4.3.1', k: 2, ans: 'A',
      q: 'Which statement about statement testing is correct?',
      opts: [
        '100% statement coverage means every executable statement was executed at least once, but a decision\'s False outcome may never have been exercised.',
        '100% statement coverage guarantees that every outcome of every decision was exercised.',
        'Statement coverage is the percentage of test cases that executed without failure.',
        'Statement testing can only be applied to specifications, not to source code.'
      ],
      ra: 'Statement coverage = number of statements executed by the tests / total number of executable statements (as a percentage). With 100% statement coverage every executable statement has been executed at least once, but this does not guarantee that all decision outcomes were tested (that requires branch coverage) and it may not detect defects that depend on particular data (Section 4.3.1).',
      qsi: 'Statement testing පිළිබඳ නිවැරදි ප්‍රකාශය කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර A. Statement coverage = පරීක්ෂණ මගින් ක්‍රියාත්මක කළ ප්‍රකාශ (statements) ගණන ÷ ක්‍රියාත්මක කළ හැකි මුළු ප්‍රකාශ ගණන (ප්‍රතිශතයක් ලෙස). 100% statement coverage යනු සෑම ක්‍රියාත්මක කළ හැකි ප්‍රකාශයක්ම අවම වශයෙන් එක් වරක් ක්‍රියාත්මක වූ බවයි; නමුත් decision එකක "False" ප්‍රතිඵලය කිසිවිටෙක පරීක්ෂා නොවිය හැකි බැවින් එය 100% branch coverage සහතික නොකරයි.'
    },
    {
      lo: 'FL-4.4.1', k: 2, ans: 'D',
      q: 'A tester prepares a list of likely faults from experience (division by zero, empty input, leap-year dates, null values) and designs tests to trigger them. Which technique is this?',
      opts: [
        'Boundary value analysis, because the tests target typical limits.',
        'State transition testing, because the tester models states.',
        'Statement testing, because the tester examines the code.',
        'Error guessing (using a fault attack), because the tester anticipates defects from experience and designs tests to expose them.'
      ],
      ra: 'Error guessing is a technique in which testers anticipate errors, defects and failures based on their knowledge: how the application has worked in the past, the types of errors developers make, and failures seen in other applications. A systematic approach is the fault attack: list possible errors, defects and failures, then design tests that expose them (Section 4.4.1).',
      qsi: 'ටෙස්ටර් කෙනෙක් අත්දැකීම් මත පදනම්ව ඇතිවිය හැකි දෝෂ ලැයිස්තුවක් (බිංදුවෙන් බෙදීම, හිස් ආදාන, සමවත්සර දින, null අගයන්) සකසා ඒවා අවුලුවන පරීක්ෂණ සැලසුම් කරයි. මෙය කුමන තාක්ෂණයද?',
      rsi: 'නිවැරදි පිළිතුර D. Error guessing යනු ටෙස්ටර්වරයා දෝෂ, වැරදි සහ අසාර්ථකත්වයන් පෙරකිය හැකි ලෙස — යෙදුම අතීතයේ ක්‍රියාකළ ආකාරය, සංවර්ධකයින් කරන වැරදි වර්ග සහ වෙනත් යෙදුම්වල අසාර්ථකත්වයන් පිළිබඳ දැනුම මත පදනම්ව — පරීක්ෂණ සැලසුම් කිරීමයි. ක්‍රමානුකූල ක්‍රමයක් වන fault attack එකේදී ඇතිවිය හැකි දෝෂ ලැයිස්තුවක් සාදා ඒවා හෙළිදරව් කරන පරීක්ෂණ සැලසුම් කරයි.'
    },
    {
      lo: 'FL-4.4.3', k: 2, ans: 'B',
      q: 'Which statement about checklist-based testing is TRUE?',
      opts: [
        'Checklist items should be very general so that the checklist never needs updating.',
        'A checklist can be derived from experience, from knowledge of what matters to users and from knowledge of how software fails; its items should be phrased so that they can be checked independently, often as questions.',
        'The checklist must be completed once before testing starts and must never be changed.',
        'Checklist-based testing provides precise, repeatable coverage metrics.'
      ],
      ra: 'Checklists are built from experience, user priorities and understanding of why and how software fails. Good items are phrased as questions, are independently verifiable, do not overlap and are not too general; items that automated tools can check or that are better as entry/exit criteria should be excluded. Checklists should be updated regularly. Because checklists are high-level, repeatability and measurable coverage are limited (Section 4.4.3).',
      qsi: 'Checklist-based testing පිළිබඳ සත්‍ය ප්‍රකාශය කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර B. Checklist එක අත්දැකීම්, පරිශීලකයාට වැදගත් දේ පිළිබඳ දැනුම සහ මෘදුකාංග අසාර්ථක වන ආකාරය පිළිබඳ අවබෝධය මත ගොඩනැගිය හැකිය; එහි අයිතම ප්‍රශ්න ආකාරයෙන්, එකිනෙකින් ස්වාධීනව සත්‍යාපනය කළ හැකි ලෙස ලිවිය යුතුය. Checklist නිතිපතා යාවත්කාලීන කළ යුතුය; එයට ස්වයංක්‍රීය මෙවලමකින් පරීක්ෂා කළ හැකි හෝ අධික ලෙස පොදු අයිතම ඇතුළත් නොකළ යුතුය. Checklist ඉහළ මට්ටමේ (high-level) බැවින් පුනරාවර්තන හැකියාව (repeatability) සහ මනින ලද ආවරණය සීමිතය.'
    },
    {
      lo: 'FL-4.5.1', k: 2, ans: 'C',
      q: 'Which of the following is a well-formed user story?',
      opts: [
        '"The system shall store passwords in a relational database."',
        '"Implement the password reset service using SHA-256 during sprint 3."',
        '"As a registered customer, I want to reset my password by e-mail so that I can regain access without calling support."',
        '"Testers must manually verify the reset feature before every release."'
      ],
      ra: 'A user story has three key elements: the role, the goal (functionality) and the business value. Good user stories follow INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) and the 3 Cs: Card, Conversation, Confirmation. Writing stories collaboratively with developers, business representatives and testers makes them testable (Section 4.5.1).',
      qsi: 'පහත සඳහන් ඒවායින් නිවැරදිව ගොඩනගන ලද user story එක කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර C. User story එකක මූලික අංග 3ක් ඇත: භූමිකාව (role), අරමුණ/ක්‍රියාකාරිත්වය (goal), සහ ව්‍යාපාරික වටිනාකම (business value). හොඳ user story එක INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) ගුණාංගවලට අනුකූල විය යුතු අතර 3 C\'s (Card, Conversation, Confirmation) අනුගමනය කරයි. සංවර්ධකයින්, ව්‍යාපාරික නියෝජිතයින් සහ ටෙස්ටර්වරුන් එක්ව ලිවීමෙන් story එක පරීක්ෂා කළ හැකි (testable) වේ.'
    },
    {
      lo: 'FL-4.5.2', k: 2, ans: 'A',
      q: 'The acceptance criterion "Given a registered user with a valid password, When the user logs in, Then the dashboard is displayed" is written in which format?',
      opts: [
        'Scenario-oriented acceptance criteria (Given/When/Then).',
        'Rule-oriented acceptance criteria written as a bullet list of rules.',
        'Rule-oriented acceptance criteria written as an input/output table.',
        'It is not an acceptance criterion; it is a unit test case.'
      ],
      ra: 'Acceptance criteria can be scenario-oriented (Given/When/Then, as used in BDD), rule-oriented (a bullet list of verification rules or an input/output table) or written in another format, as long as it is well defined and unambiguous. The example uses Given/When/Then, so it is scenario-oriented (Section 4.5.2).',
      qsi: '"ලියාපදිංචි පරිශීලකයෙකු වලංගු මුරපදයක් සහිතව සිටී (Given), ඔහු ලොග් වේ (When), එවිට dashboard එක ප්‍රදර්ශනය වේ (Then)" යන පිළිගැනීමේ නිර්ණායකය (acceptance criterion) ලියා ඇත්තේ කුමන ආකෘතියෙන්ද?',
      rsi: 'නිවැරදි පිළිතුර A. Acceptance criteria විකල්ප: scenario-oriented (Given/When/Then — BDD හි භාවිත වන), rule-oriented (සත්‍යාපන නීති ලැයිස්තුවක් හෝ ආදාන-ප්‍රතිදාන වගුවක්), සහ පැහැදිලිව නිර්වචනය කළ, අපැහැදිලි නොවන වෙනත් ආකෘති. ලබාදී ඇති උදාහරණය Given/When/Then ආකාරයෙන් ඇති නිසා එය scenario-oriented වේ.'
    }
  ],
  5: [
    {
      lo: 'FL-5.1.1', k: 2, ans: 'B',
      q: 'Which of the following is typical content of a test plan?',
      opts: [
        'The source code of the unit tests and the detailed list of defects found.',
        'A risk register, the test approach (levels, types, techniques, entry and exit criteria), stakeholders, budget and schedule.',
        'Salary reviews and annual appraisals of the testers.',
        'Only the final test results and the release decision.'
      ],
      ra: 'A test plan describes the test objectives, resources and processes. Typical content (ISO/IEC/IEEE 29119-3): context (scope, objectives, test basis), assumptions and constraints, stakeholders, communication, risk register (product and project risks), test approach (levels, types, techniques, deliverables, entry/exit criteria, metrics, test data and environment needs), and budget and schedule (Section 5.1.1).',
      qsi: 'Test plan එකක සාමාන්‍ය අන්තර්ගතයක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර B. Test plan එක පරීක්ෂණ අරමුණු, සම්පත් සහ ක්‍රියාවලි විස්තර කරයි. සාමාන්‍ය අන්තර්ගතය: සන්දර්භය (scope, අරමුණු, test basis), උපකල්පන සහ සීමාවන්, පාර්ශ්වකරුවන් (stakeholders), සන්නිවේදනය, risk register (product සහ project අවදානම්), test approach (පරීක්ෂණ මට්ටම්, වර්ග, තාක්ෂණ, entry/exit criteria, metrics, test data සහ පරිසර අවශ්‍යතා) සහ අයවැය සහ කාලසටහන.'
    },
    {
      lo: 'FL-5.1.2', k: 1, ans: 'D',
      q: 'Which of the following is a way in which a tester adds value to iteration and release planning?',
      opts: [
        'Writing the production code for the user stories.',
        'Approving the release on behalf of the product owner.',
        'Deciding the project budget and the sprint length alone.',
        'Taking part in user story refinement (testable stories with acceptance criteria), performing product risk analysis, estimating test effort and planning the test approach.'
      ],
      ra: 'In release and iteration planning a tester helps to write testable user stories and acceptance criteria, performs product quality risk analysis, estimates the test effort, identifies functional and non-functional aspects to be tested and plans the testing within the iteration (Section 5.1.2).',
      qsi: 'Iteration සහ release සැලසුම්කරණයේදී ටෙස්ටර්වරයෙකු වටිනාකමක් එකතු කරන ආකාරයක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර D. ටෙස්ටර්වරයා user story පිරිපහදු කිරීමට (acceptance criteria සහිත පරීක්ෂා කළ හැකි stories) සහභාගී වේ, product risk analysis කරයි, පරීක්ෂණ උත්සාහය (effort) ඇස්තමේන්තු කරයි, පරීක්ෂා කළ යුතු ක්‍රියාකාරී සහ non-functional අංග හඳුනාගනී සහ iteration එක තුළ පරීක්ෂණ ප්‍රවේශය සැලසුම් කරයි.'
    },
    {
      lo: 'FL-5.1.3', k: 2, ans: 'A',
      q: 'Statement 1: "The test environment and test data are available." Statement 2: "The planned coverage level has been reached and the number of open critical defects is within the agreed limit." How are they correctly classified?',
      opts: [
        'Statement 1 is an entry criterion; statement 2 is an exit criterion (in agile: Definition of Ready and Definition of Done).',
        'Statement 1 is an exit criterion; statement 2 is an entry criterion.',
        'Both statements are entry criteria.',
        'Both statements are exit criteria.'
      ],
      ra: 'Entry criteria are the preconditions for starting an activity (testable requirements, resources such as environments and data, initial quality of the test object). Exit criteria define what must be achieved to declare an activity complete (planned tests executed, coverage level reached, unresolved defects within an agreed limit). In agile projects they correspond to the Definition of Ready and the Definition of Done (Section 5.1.3).',
      qsi: 'ප්‍රකාශ 1: "පරීක්ෂණ පරිසරය සහ පරීක්ෂණ දත්ත ලබාගත හැකිය." ප්‍රකාශ 2: "සැලසුම් කළ ආවරණ මට්ටම සපුරා ඇති අතර විවෘත විවේචනාත්මක (critical) දෝෂ ගණන එකඟ වූ සීමාව තුළ පවතී." මේවා නිවැරදිව වර්ගීකරණය කර ඇත්තේ කෙසේද?',
      rsi: 'නිවැරදි පිළිතුර A. Entry criteria යනු ක්‍රියාකාරකමක් ආරම්භ කිරීමට පෙර සපුරා තිබිය යුතු පූර්ව කොන්දේසි (පරීක්ෂා කළ හැකි අවශ්‍යතා, පරිසරය, දත්ත වැනි සම්පත්, test object එකේ ආරම්භක quality මට්ටම). Exit criteria යනු ක්‍රියාකාරකමක් සම්පූර්ණ බව ප්‍රකාශ කිරීමට සපුරාලිය යුතු දේ (සැලසුම් කළ පරීක්ෂණ ක්‍රියාත්මක කිරීම, ආවරණ මට්ටම, විසඳා නොමැති දෝෂ සීමාව). Agile හි මේවා Definition of Ready (entry) සහ Definition of Done (exit) ලෙස හැඳින්වේ.'
    },
    {
      lo: 'FL-5.2.1', k: 1, ans: 'C',
      q: 'How is the risk level of a risk determined?',
      opts: [
        'Only by the cost of the mitigation actions.',
        'Only by the number of testers available.',
        'By combining the likelihood of the risk occurring and its impact (for example with a risk matrix or numeric ratings).',
        'Only by the duration of the project.'
      ],
      ra: 'The risk level is determined by risk likelihood (the probability that the risk occurs, greater than zero and less than one) and risk impact (the consequences of its occurrence). It can be expressed qualitatively (high/medium/low) or quantitatively (Section 5.2.1).',
      qsi: 'අවදානමක මට්ටම (risk level) තීරණය වන්නේ කෙසේද?',
      rsi: 'නිවැරදි පිළිතුර C. Risk level එක තීරණය වන්නේ අවදානම සිදුවීමේ ඉඩකඩ (likelihood — සම්භාවිතාව, 0 ට වැඩි 1 ට අඩු) සහ එහි බලපෑම (impact — සිදුවීමේ ප්‍රතිවිපාක) ඒකාබද්ධ කිරීමෙනි; මෙය ගුණාත්මකව (high/medium/low) හෝ සංඛ්‍යාත්මකව ප්‍රකාශ කළ හැකිය.'
    },
    {
      lo: 'FL-5.2.3', k: 2, ans: 'B',
      q: 'A product risk analysis rates the payment module as high risk and the "About us" page as low risk. How should these results influence testing?',
      opts: [
        'Both should receive identical effort to stay fair.',
        'The payment module gets more thorough techniques, higher coverage and earlier testing; the "About us" page gets minimal effort.',
        'The payment module should be skipped because high-risk items are too expensive to test.',
        'The "About us" page should be tested first because it is the easiest.'
      ],
      ra: 'Product risk analysis results are used to decide the test scope, the test levels and types, the test techniques and coverage, the test effort per task, and the priorities so that critical defects are found as early as possible; they may also point to non-testing activities that reduce risk. Higher risk means more thorough and earlier testing (Section 5.2.3).',
      qsi: 'Product risk analysis මගින් ගෙවීම් මොඩියුලය ඉහළ අවදානම් ලෙසත් "About us" පිටුව අඩු අවදානම් ලෙසත් ඇගයී ඇත. මෙම ප්‍රතිඵල පරීක්ෂාවට බලපාන්නේ කෙසේද?',
      rsi: 'නිවැරදි පිළිතුර B. Risk analysis ප්‍රතිඵල මගින් පරීක්ෂණ විෂය පථය, මට්ටම් සහ වර්ග, භාවිත කළ යුතු තාක්ෂණ සහ ආවරණ මට්ටම, කාර්යයකට අවශ්‍ය උත්සාහය සහ ප්‍රමුඛතා (විවේචනාත්මක දෝෂ හැකිතාක් කලින් සොයාගැනීමට) තීරණය කෙරේ. ඉහළ අවදානම් ගෙවීම් මොඩියුලයට වඩා ගැඹුරු පරීක්ෂාවක් සහ කලින් පරීක්ෂාවක් ද, අඩු අවදානම් පිටුවට අවම උත්සාහයක් ද ලැබේ.'
    },
    {
      lo: 'FL-5.2.4', k: 2, ans: 'C',
      q: 'A product risk analysis identifies a high security risk. Which of the following is an appropriate response measure?',
      opts: [
        'Reduce the test effort to meet the schedule, because security defects are rare.',
        'Remove the security requirement from the test basis.',
        'Assign testers with suitable security skills, apply security testing and static analysis, and increase the independence of testing.',
        'Wait for a production incident and fix the problem afterwards.'
      ],
      ra: 'Measures in response to analyzed product risks include: choosing testers with the right experience and skills for the risk type, applying an appropriate level of independence, performing reviews and static analysis, applying suitable test techniques and coverage levels, applying test types addressing the affected quality characteristics (such as security testing), and performing dynamic testing including regression testing (Section 5.2.4).',
      qsi: 'Product risk analysis මගින් ඉහළ security අවදානමක් හඳුනාගෙන ඇත. සුදුසු ප්‍රතිචාරාත්මක ක්‍රියාමාර්ගයක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර C. අවදානම්වලට ප්‍රතිචාර ලෙස: අදාළ අවදානම් වර්ගයට සුදුසු අත්දැකීම් සහ කුසලතා ඇති ටෙස්ටර්වරුන් තෝරා ගැනීම, සුදුසු ස්වාධීනත්ව මට්ටමක් යෙදීම, reviews සහ static analysis කිරීම, සුදුසු තාක්ෂණ සහ ආවරණ මට්ටම් භාවිතය, බලපෑමට ලක්වන quality ලක්ෂණ ආවරණය කරන පරීක්ෂණ වර්ග (security testing වැනි) යෙදීම, සහ regression testing ඇතුළු dynamic testing සිදු කිරීම.'
    },
    {
      lo: 'FL-5.3.1', k: 1, ans: 'B',
      q: 'Which of the following is a TEST PROGRESS metric?',
      opts: [
        'Mean time to failure of the released product.',
        'The number of test cases run and not run, passed and failed.',
        'Defect density.',
        'Cost of quality.'
      ],
      ra: 'Test progress metrics include the number of test cases run / not run, passed / failed, test case implementation progress, test environment preparation progress and test execution time. Mean time to failure is a product quality metric, defect density is a defect metric and cost of quality is a cost metric (Section 5.3.1).',
      qsi: 'පහත සඳහන් ඒවායින් පරීක්ෂණ ප්‍රගති මෙට්‍රික (test progress metric) එකක් කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර B. Test progress metrics: ක්‍රියාත්මක කළ/නොකළ test cases ගණන, pass/fail ගණන, test case implementation ප්‍රගතිය, test environment සූදානම සහ test execution කාලය. Mean time to failure යනු product quality metric එකකි; defect density යනු defect metric එකකි; cost of quality යනු cost metric එකකි.'
    },
    {
      lo: 'FL-5.3.3', k: 2, ans: 'D',
      q: 'A distributed agile team (three countries) uses a CI/CD pipeline. Which is the most suitable way to communicate the status of testing continuously?',
      opts: [
        'Printing a monthly test report and sending it by post.',
        'Hallway conversations only.',
        'Waiting until the end of the project to present the test completion report.',
        'Dashboards (for example CI/CD dashboards, task boards and burn-down charts), supported by chat, online documentation and short verbal updates.'
      ],
      ra: 'Ways to communicate test status include verbal communication, dashboards (CI/CD dashboards, task boards, burn-down charts), electronic channels (e-mail, chat), online documentation and formal test reports. The choice depends on the audience, project risk, organizational standards and whether the team is distributed. A distributed agile team benefits from continuous, shared channels such as dashboards and chat (Section 5.3.3).',
      qsi: 'රටවල් තුනක විසිරී සිටින agile කණ්ඩායමක් CI/CD pipeline එකක් භාවිත කරයි. පරීක්ෂණ තත්ත්වය අඛණ්ඩව සන්නිවේදනය කිරීමට වඩාත් සුදුසු ක්‍රමය කුමක්ද?',
      rsi: 'නිවැරදි පිළිතුර D. පරීක්ෂණ තත්ත්වය සන්නිවේදනය කළ හැකි ක්‍රම: වාචික සන්නිවේදනය, dashboards (CI/CD dashboards, task boards, burn-down charts), ඉලෙක්ට්‍රොනික නාලිකා (email, chat), online ලේඛන සහ විධිමත් test reports. ක්‍රමය තෝරාගැනීම ප්‍රේක්ෂකයින්, ව්‍යාපෘති අවදානම, සංවිධාන ප්‍රමිතීන් සහ කණ්ඩායම විසිරී පවතීද යන්න මත රඳා පවතී. විසිරුණු agile කණ්ඩායමකට dashboards සහ chat වැනි අඛණ්ඩ ක්‍රම වඩාත් සුදුසුය.'
    }
  ]
};

function card(n, item, sinhala) {
  const L = ['A', 'B', 'C', 'D'];
  const opts = item.opts.map((o, i) => `        <div class="quiz-opt">${L[i]}) ${o}</div>`).join('\n');
  const qsi = sinhala ? `<br><span style="font-weight: normal; font-size: 12.8px; color: #374151;">(${item.qsi})</span>` : '';
  const rat = sinhala
    ? `<strong>Rationale (සිංහල + English):</strong><br>\n        ${item.rsi}\n        <br><em>English:</em> ${item.ra}`
    : `<strong>Rationale:</strong> ${item.ra}`;
  return `
    <!-- Question ${n} -->
    <div class="quiz-card">
      <div class="quiz-q">Question ${n} [K${item.k} - ${item.lo}]: ${item.q}${qsi}</div>
      <div class="quiz-options">
${opts}
      </div>
      <div class="quiz-answer">
        <strong>Correct Answer: ${item.ans}</strong><br>
        ${rat}
      </div>
    </div>
`;
}

function apply(file, ch, sinhala) {
  let html = fs.readFileSync(file, 'utf8');
  // remove an earlier insertion (idempotent)
  html = html.replace(new RegExp(`\\s*${MARK_START}[\\s\\S]*?${MARK_END}`), '');
  const existing = (html.match(/class="quiz-card"/g) || []).length;
  let n = existing + 1;
  const heading = sinhala
    ? 'Part 2: Additional Questions for Remaining Learning Objectives (ඉතිරි ඉගෙනුම් අරමුණු සඳහා අමතර ප්‍රශ්න)'
    : 'Part 2: Additional Questions for Remaining Learning Objectives';
  let block = `\n    ${MARK_START}\n    <h3>${heading}</h3>\n`;
  Q[ch].forEach(item => { block += card(n++, item, sinhala); });
  block += `    ${MARK_END}\n`;
  const idx = html.lastIndexOf('<div class="footer-note">');
  if (idx < 0) throw new Error('footer-note not found in ' + file);
  html = html.slice(0, idx) + block.trimStart() + '\n    ' + html.slice(idx);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓ ${path.basename(file)}: +${Q[ch].length} questions (now ${existing + Q[ch].length})`);
}

Object.keys(Q).forEach(ch => {
  apply(path.join(enDir, `istqb_ch${ch}_study_guide.html`), +ch, false);
  apply(path.join(siDir, `istqb_ch${ch}_study_guide_sinhala.html`), +ch, true);
});
console.log('\nDone. Chapters 3 and 6 already had full LO coverage.');
