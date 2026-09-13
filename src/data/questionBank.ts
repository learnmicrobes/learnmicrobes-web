export type QuestionBankArea =
  | 'preanalytic-procedures'
  | 'analytic-bacteriology'
  | 'analytic-mycobacteriology'
  | 'analytic-virology'
  | 'analytic-parasitology'
  | 'analytic-mycology'
  | 'postanalytic-procedures';
export type QuestionBankDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionBankItem = {
  id: string;
  area: QuestionBankArea;
  topic: string;
  difficulty: QuestionBankDifficulty;
  tags: string[];
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  source: string;
  status: 'draft' | 'reviewed' | 'published';
};

export const questionBank: QuestionBankItem[] = [
  {
    id: 'preanalytic-001-blood-culture-ratio',
    area: 'preanalytic-procedures',
    topic: 'Blood culture collection',
    difficulty: 'beginner',
    tags: ['blood culture', 'blood volume', 'collection'],
    prompt: 'A student is setting up adult blood cultures and asks why bottle fill volume matters so much. Which principle is the best answer?',
    choices: [
      'Adequate blood volume improves organism recovery while broth dilution helps reduce inhibitory effects in the specimen.',
      'Blood culture bottles are filled lightly so organisms remain concentrated at the top of the bottle.',
      'The exact volume is mainly cosmetic as long as the bottle enters the instrument.',
      'Adult blood cultures should be diluted with sterile saline before inoculation.'
    ],
    answer: 'Adequate blood volume improves organism recovery while broth dilution helps reduce inhibitory effects in the specimen.',
    explanation: 'Blood volume is one of the strongest preanalytic drivers of blood culture yield. The goal is enough patient blood for detection while using broth conditions that support recovery and dilute inhibitors.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-002-catheter-urine',
    area: 'preanalytic-procedures',
    topic: 'Urine collection',
    difficulty: 'beginner',
    tags: ['urine culture', 'catheter', 'specimen quality'],
    prompt: 'A urine culture is requested from a patient with an indwelling urinary catheter. Which collection approach best protects specimen quality?',
    choices: [
      'Collect aseptically from the catheter sampling port after disinfecting it.',
      'Pour urine from the bedside drainage bag into a sterile cup.',
      'Cut the catheter tip and submit it for routine urine culture.',
      'Collect from the floor of the collection chamber after the bag has filled.'
    ],
    answer: 'Collect aseptically from the catheter sampling port after disinfecting it.',
    explanation: 'For catheterized patients, the sampling port is used because drainage bag urine may be old, colonized, or contaminated and can misrepresent the bladder specimen.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-003-anaerobe-specimen',
    area: 'preanalytic-procedures',
    topic: 'Anaerobic culture specimen acceptability',
    difficulty: 'intermediate',
    tags: ['anaerobe', 'specimen quality', 'aspirate', 'tissue'],
    prompt: 'Which specimen type is most appropriate when anaerobic infection is suspected?',
    choices: [
      'Aspirated abscess material or deep tissue transported to protect anaerobes.',
      'A superficial swab from intact skin near the wound.',
      'A formed stool specimen submitted for routine anaerobic culture.',
      'A dried swab kept at room air for several hours.'
    ],
    answer: 'Aspirated abscess material or deep tissue transported to protect anaerobes.',
    explanation: 'Anaerobic cultures are most useful from properly collected deep specimens such as aspirates, tissue, or sterile fluids. Superficial swabs and oxygen-exposed specimens are common preanalytic traps.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-004-sps-purpose',
    area: 'preanalytic-procedures',
    topic: 'Blood culture anticoagulants',
    difficulty: 'intermediate',
    tags: ['blood culture', 'SPS', 'anticoagulant'],
    prompt: 'Sodium polyanethol sulfonate is included in many blood culture systems. Which function best explains its usefulness?',
    choices: [
      'It acts as an anticoagulant and helps reduce some inhibitory effects that can interfere with organism recovery.',
      'It selectively kills Gram-positive organisms so Gram-negative rods can be isolated faster.',
      'It replaces the need for aseptic venipuncture technique.',
      'It confirms that a positive bottle contains anaerobes.'
    ],
    answer: 'It acts as an anticoagulant and helps reduce some inhibitory effects that can interfere with organism recovery.',
    explanation: 'SPS is used in blood culture collection because it prevents clotting and can counter some antimicrobial or host inhibitory effects. It does not replace proper collection technique or identify the organism.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'preanalytic-005-antibiotic-timing',
    area: 'preanalytic-procedures',
    topic: 'Timing before antibiotics',
    difficulty: 'beginner',
    tags: ['antibiotics', 'collection timing', 'culture yield'],
    prompt: 'A clinician asks why cultures are often requested before antimicrobial therapy begins. What is the best laboratory reason?',
    choices: [
      'Antimicrobials may reduce viable organisms and lower culture recovery.',
      'Antimicrobials make all organisms appear Gram variable.',
      'Specimens collected after therapy cannot be Gram stained.',
      'Culture media cannot neutralize any drug exposure under any conditions.'
    ],
    answer: 'Antimicrobials may reduce viable organisms and lower culture recovery.',
    explanation: 'When clinically feasible, collecting before antibiotics improves the chance of recovering viable organisms. Some systems contain neutralizing agents, but therapy can still reduce yield.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-006-respiratory-quality',
    area: 'preanalytic-procedures',
    topic: 'Respiratory specimen adequacy',
    difficulty: 'intermediate',
    tags: ['sputum', 'Gram stain', 'specimen quality'],
    prompt: 'A sputum Gram stain shows many squamous epithelial cells and very few inflammatory cells. What is the most appropriate interpretation?',
    choices: [
      'The specimen likely represents oropharyngeal contamination and may not be acceptable for routine lower respiratory culture.',
      'The specimen is ideal because epithelial cells prove lower airway origin.',
      'The finding confirms bacterial pneumonia even before culture is set up.',
      'The specimen should automatically be processed for anaerobic culture.'
    ],
    answer: 'The specimen likely represents oropharyngeal contamination and may not be acceptable for routine lower respiratory culture.',
    explanation: 'Many squamous epithelial cells suggest upper airway contamination. Respiratory specimen screening helps avoid reporting colonizing flora as if it came from the lower airway.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-007-legionella-media',
    area: 'preanalytic-procedures',
    topic: 'Special media selection',
    difficulty: 'advanced',
    tags: ['Legionella', 'BCYE', 'respiratory culture', 'special media'],
    prompt: 'A lower respiratory specimen is submitted with a specific request to recover Legionella. Which processing decision best matches that request?',
    choices: [
      'Include a validated Legionella medium such as BCYE-based media in the culture setup.',
      'Use only MacConkey agar because Legionella is a lactose-fermenting enteric rod.',
      'Use only CNA agar because Legionella is best recovered as a Gram-positive rod.',
      'Reject the specimen because Legionella cannot be cultured under any circumstances.'
    ],
    answer: 'Include a validated Legionella medium such as BCYE-based media in the culture setup.',
    explanation: 'Legionella recovery requires specialized media and workflow. Routine respiratory plates alone may not answer the clinical question.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'preanalytic-008-stool-selective-media',
    area: 'preanalytic-procedures',
    topic: 'Stool culture processing',
    difficulty: 'advanced',
    tags: ['stool culture', 'selective media', 'Vibrio', 'Campylobacter'],
    prompt: 'A stool culture request includes concern for a water-associated curved Gram-negative rod after seafood exposure. What is the best preanalytic lesson?',
    choices: [
      'The suspected organism and exposure should guide whether special selective media or incubation conditions are needed.',
      'All stool pathogens grow equally well on sheep blood agar incubated in ambient air.',
      'Stool specimens are the preferred source for routine anaerobic culture.',
      'Selective media are avoided because they always suppress pathogens.'
    ],
    answer: 'The suspected organism and exposure should guide whether special selective media or incubation conditions are needed.',
    explanation: 'Stool culture is not one universal setup. Organisms such as Vibrio, Campylobacter, Yersinia, and routine enteric pathogens may require different media or atmospheres depending on the request and local protocol.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'preanalytic-009-mixed-culture-subculture',
    area: 'preanalytic-procedures',
    topic: 'Primary plate workup',
    difficulty: 'intermediate',
    tags: ['mixed culture', 'subculture', 'isolate purity'],
    prompt: 'A wound culture plate has several colony types, but one colony morphology is predominant and clinically plausible. What is the safest next bench move before biochemical identification?',
    choices: [
      'Subculture a representative colony to obtain a pure isolate before interpreting identification reactions.',
      'Pool all colony types together so the biochemical panel represents the whole wound.',
      'Report the organism as mixed flora without looking at source or Gram stain information.',
      'Skip purity checks because automated systems correct for mixed inocula.'
    ],
    answer: 'Subculture a representative colony to obtain a pure isolate before interpreting identification reactions.',
    explanation: 'Identification reactions require a pure isolate. Mixed inocula can create impossible patterns and misleading IDs, so colony selection and purity are core preanalytic safeguards.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'preanalytic-010-afb-smear-principle',
    area: 'preanalytic-procedures',
    topic: 'Stain principle',
    difficulty: 'intermediate',
    tags: ['AFB stain', 'mycobacteria', 'stain principle'],
    prompt: 'Why are acid-fast staining methods used when mycobacterial infection is a concern?',
    choices: [
      'The cell envelope resists ordinary decolorization, allowing acid-fast organisms to retain the primary stain under the correct method.',
      'Acid-fast stains convert all bacteria into Gram-negative rods for easier screening.',
      'The stain proves antimicrobial susceptibility directly from the smear.',
      'Acid-fast staining is used only to evaluate epithelial cell contamination.'
    ],
    answer: 'The cell envelope resists ordinary decolorization, allowing acid-fast organisms to retain the primary stain under the correct method.',
    explanation: 'Acid-fast stains exploit the waxy, lipid-rich cell envelope of mycobacteria and related organisms. A smear result supports workflow decisions but does not replace culture, NAAT, or full identification when indicated.',
    source: 'Learn Microbes original question bank: Preanalytic Procedures',
    status: 'published'
  },
  {
    id: 'preanalytic-011-skin-antisepsis-contact-time',
    area: 'preanalytic-procedures',
    topic: 'Blood culture collection',
    difficulty: 'beginner',
    tags: ['blood culture', 'skin antisepsis', 'contamination', 'preanalytics'],
    prompt: 'During blood culture collection, why should the skin antiseptic remain on the site for the required contact time and dry before the draw?',
    choices: [
      'The contact time helps reduce skin flora that could contaminate the culture.',
      'The wet antiseptic keeps organisms concentrated near the puncture site.',
      'The contact time prevents blood from clotting inside the bottle.',
      'The wet antiseptic improves recovery of anaerobic organisms.'
    ],
    answer: 'The contact time helps reduce skin flora that could contaminate the culture.',
    explanation: 'Blood culture contamination often comes from skin flora. Proper antiseptic contact time and drying reduce organisms at the puncture site before collection.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'preanalytic-012-blood-culture-additive-purpose',
    area: 'preanalytic-procedures',
    topic: 'Blood culture collection',
    difficulty: 'intermediate',
    tags: ['blood culture', 'SPS', 'broth dilution', 'preanalytics'],
    prompt: 'A student asks why blood culture bottles contain more than plain nutrient broth. Which principle best explains the use of additives such as anticoagulants in blood culture systems?',
    choices: [
      'They help prevent clotting and reduce some specimen-related inhibitory effects that can interfere with recovery.',
      'They convert all organisms into spores so they survive transport.',
      'They eliminate the need for adequate blood volume.',
      'They make the bottle selective only for anaerobic organisms.'
    ],
    answer: 'They help prevent clotting and reduce some specimen-related inhibitory effects that can interfere with recovery.',
    explanation: 'Blood culture additives support recovery by limiting clot formation and reducing inhibitory effects from blood components. Adequate blood volume is still one of the most important recovery factors.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'preanalytic-013-anaerobic-aspirate-transport',
    area: 'preanalytic-procedures',
    topic: 'Anaerobic specimen collection',
    difficulty: 'beginner',
    tags: ['anaerobes', 'abscess', 'aspirate', 'transport'],
    prompt: 'Which specimen approach best supports recovery of anaerobic bacteria from a deep abscess?',
    choices: [
      'Aspirated material or tissue from the deep site placed into anaerobic transport.',
      'A dry surface swab from the skin over the abscess.',
      'A throat swab placed into routine aerobic transport.',
      'A refrigerated urine cup filled with drainage from the dressing.'
    ],
    answer: 'Aspirated material or tissue from the deep site placed into anaerobic transport.',
    explanation: 'Anaerobes are easily missed when specimens are exposed to oxygen or collected from superficial mixed-flora sites. Deep aspirates or tissue in anaerobic transport give the lab a better chance of recovery.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'preanalytic-014-csf-bacterial-culture-delay',
    area: 'preanalytic-procedures',
    topic: 'CSF specimen handling',
    difficulty: 'intermediate',
    tags: ['CSF', 'specimen handling', 'fastidious organisms', 'preanalytics'],
    prompt: 'A cerebrospinal fluid specimen is collected for bacterial culture, but plating will be delayed. What is the safest general handling principle?',
    choices: [
      'Treat the specimen as urgent, avoid unnecessary cold exposure for bacterial culture, and follow the laboratory delay protocol.',
      'Freeze the specimen so bacterial cells remain unchanged until the next shift.',
      'Refrigerate the specimen routinely because all meningitis pathogens tolerate cold storage well.',
      'Hold the specimen at room temperature for several days before setup.'
    ],
    answer: 'Treat the specimen as urgent, avoid unnecessary cold exposure for bacterial culture, and follow the laboratory delay protocol.',
    explanation: 'CSF for bacterial culture should be processed urgently because some pathogens are fragile. Handling delays should follow the lab SOP, and unnecessary refrigeration can reduce recovery of fastidious bacteria.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'preanalytic-015-pertussis-nasopharyngeal-collection',
    area: 'preanalytic-procedures',
    topic: 'Respiratory specimen collection',
    difficulty: 'intermediate',
    tags: ['Bordetella', 'pertussis', 'nasopharyngeal specimen', 'preanalytics'],
    prompt: 'A provider wants testing for suspected Bordetella pertussis. Which collection principle is most important for culture or molecular testing?',
    choices: [
      'Collect a properly obtained nasopharyngeal swab or aspirate using the required swab and transport system.',
      'Submit expectorated sputum because it contains the highest organism burden.',
      'Use a routine throat swab because it is easier and equivalent for recovery.',
      'Place any respiratory swab into stool transport medium to preserve fastidious organisms.'
    ],
    answer: 'Collect a properly obtained nasopharyngeal swab or aspirate using the required swab and transport system.',
    explanation: 'Bordetella testing depends heavily on proper nasopharyngeal collection and the correct transport system. Poor collection can cause a false-negative result even when the test method is appropriate.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'bacteriology-001-blood-culture-gpc-chains',
    area: 'analytic-bacteriology',
    topic: 'Blood and bone marrow culture interpretation',
    difficulty: 'beginner',
    tags: ['blood culture', 'Gram-positive cocci', 'chains', 'catalase'],
    prompt: 'A positive blood culture Gram stain shows Gram-positive cocci mostly in chains. Which early bench step best separates the major routine branches?',
    choices: [
      'Perform catalase from suitable growth and correlate with hemolysis and colony morphology.',
      'Report Staphylococcus aureus before subculture because all cocci in blood are staphylococci.',
      'Set up MacConkey agar as the only follow-up plate.',
      'Skip bench testing because Gram-positive cocci in chains are always contaminants.'
    ],
    answer: 'Perform catalase from suitable growth and correlate with hemolysis and colony morphology.',
    explanation: 'Gram-positive cocci in chains usually push the student toward Streptococcus/Enterococcus-like reasoning. Catalase plus hemolysis and source context is a safe early branch point.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-002-blood-culture-gpc-clusters',
    area: 'analytic-bacteriology',
    topic: 'Blood and bone marrow culture interpretation',
    difficulty: 'beginner',
    tags: ['blood culture', 'Gram-positive cocci', 'clusters', 'coagulase'],
    prompt: 'A blood culture grows Gram-positive cocci in clusters. The isolate is catalase positive. Which result would most strongly support Staphylococcus aureus in a routine workup?',
    choices: [
      'Positive coagulase or approved S. aureus latex/agglutination testing.',
      'Failure to grow on blood agar.',
      'Oxidase positivity with curved rod morphology.',
      'Strict anaerobic growth only.'
    ],
    answer: 'Positive coagulase or approved S. aureus latex/agglutination testing.',
    explanation: 'Catalase-positive cocci in clusters suggest a Staphylococcus-like branch. Coagulase or validated rapid identification methods help separate S. aureus from many coagulase-negative staphylococci.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-003-endocarditis-nutritionally-variant-strep',
    area: 'analytic-bacteriology',
    topic: 'Blood culture fastidious Gram-positive cocci',
    difficulty: 'advanced',
    tags: ['endocarditis', 'nutritionally variant streptococci', 'Abiotrophia', 'Granulicatella'],
    prompt: 'A patient with suspected endocarditis has slow-growing Gram-positive cocci that require special growth support and do not behave like routine beta-hemolytic streptococci. Which group should be considered?',
    choices: [
      'Nutritionally variant streptococci such as Abiotrophia or Granulicatella.',
      'Strictly lactose-fermenting Enterobacterales.',
      'Dermatophyte molds.',
      'Acid-fast mycobacteria only.'
    ],
    answer: 'Nutritionally variant streptococci such as Abiotrophia or Granulicatella.',
    explanation: 'Fastidious Gram-positive cocci associated with endocarditis can require special media or pyridoxal support. They should not be forced into routine streptococcal assumptions.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-004-csf-neonatal-meningitis',
    area: 'analytic-bacteriology',
    topic: 'Cerebrospinal fluid culture',
    difficulty: 'intermediate',
    tags: ['CSF', 'neonate', 'meningitis', 'group B streptococcus'],
    prompt: 'A neonate has purulent meningitis and the CSF culture grows beta-hemolytic Gram-positive cocci in chains. Which organism group is a classic concern?',
    choices: [
      'Group B Streptococcus.',
      'Pseudomonas aeruginosa.',
      'Moraxella catarrhalis.',
      'Campylobacter jejuni.'
    ],
    answer: 'Group B Streptococcus.',
    explanation: 'Group B Streptococcus is a classic neonatal meningitis and sepsis pathogen. The age, sterile-site source, beta hemolysis, and Gram-positive cocci in chains support that branch.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-005-csf-pneumococcus-branch',
    area: 'analytic-bacteriology',
    topic: 'Cerebrospinal fluid culture',
    difficulty: 'intermediate',
    tags: ['CSF', 'meningitis', 'Streptococcus pneumoniae', 'optochin'],
    prompt: 'An adult CSF isolate is alpha-hemolytic and appears as Gram-positive lancet-shaped diplococci. Which test direction best supports the classic pneumococcal branch?',
    choices: [
      'Optochin susceptibility or bile solubility using validated methods.',
      'Growth on TCBS agar with yellow colonies.',
      'Urease rapid positivity with swarming.',
      'Modified acid-fast staining as the only confirmatory test.'
    ],
    answer: 'Optochin susceptibility or bile solubility using validated methods.',
    explanation: 'Alpha-hemolytic diplococci from CSF should raise Streptococcus pneumoniae concern. Optochin and bile solubility are classic branch tests when interpreted with source and morphology.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-006-lower-respiratory-haemophilus',
    area: 'analytic-bacteriology',
    topic: 'Lower respiratory culture',
    difficulty: 'intermediate',
    tags: ['lower respiratory', 'Haemophilus', 'X factor', 'V factor'],
    prompt: 'A respiratory isolate is a tiny pleomorphic Gram-negative coccobacillus that grows best on chocolate agar and requires growth factors. Which organism group fits this pattern best?',
    choices: [
      'Haemophilus species.',
      'Proteus species.',
      'Enterococcus species.',
      'Bacteroides fragilis group.'
    ],
    answer: 'Haemophilus species.',
    explanation: 'Haemophilus-like organisms are small pleomorphic Gram-negative coccobacilli that often require X and/or V factors and grow better on chocolate agar than routine blood agar.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-007-legionella-diagnostic-logic',
    area: 'analytic-bacteriology',
    topic: 'Lower respiratory culture',
    difficulty: 'advanced',
    tags: ['Legionella', 'BCYE', 'respiratory culture', 'urinary antigen'],
    prompt: 'A patient with severe pneumonia has compatible exposure history and no growth on routine respiratory plates. Which next step best matches Legionella-focused laboratory logic?',
    choices: [
      'Use Legionella-specific testing such as BCYE culture setup and/or validated antigen or molecular methods as appropriate.',
      'Assume routine MacConkey agar excludes Legionella.',
      'Report normal flora because all pneumonia agents grow on sheep blood agar.',
      'Use a coagulase test as the primary screen.'
    ],
    answer: 'Use Legionella-specific testing such as BCYE culture setup and/or validated antigen or molecular methods as appropriate.',
    explanation: 'Legionella requires targeted diagnostic thinking. Routine culture can miss it, so BCYE-based culture and nonculture tests may be needed depending on the clinical question.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-008-campylobacter-growth',
    area: 'analytic-bacteriology',
    topic: 'Gastrointestinal culture',
    difficulty: 'intermediate',
    tags: ['Campylobacter', 'microaerophilic', 'stool culture', 'curved rods'],
    prompt: 'A stool workup is focused on curved Gram-negative rods associated with inflammatory diarrhea. Which growth condition is most relevant for the classic Campylobacter branch?',
    choices: [
      'Microaerophilic incubation with appropriate selective media and temperature conditions.',
      'Strict ambient-air incubation on MacConkey agar only.',
      'Routine Sabouraud agar at room temperature.',
      'Anaerobic blood agar only for 7 days.'
    ],
    answer: 'Microaerophilic incubation with appropriate selective media and temperature conditions.',
    explanation: 'Campylobacter-style recovery depends on microaerophilic conditions and appropriate media/temperature. It is a good example of matching setup to the suspected organism.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-009-shigella-screening',
    area: 'analytic-bacteriology',
    topic: 'Gastrointestinal culture',
    difficulty: 'advanced',
    tags: ['Shigella', 'stool culture', 'biochemical screening', 'serology'],
    prompt: 'A non-lactose-fermenting stool isolate has reactions suspicious for Shigella. What is the best next principle before final reporting?',
    choices: [
      'Correlate biochemical screening with approved serologic or identification methods and local reporting policy.',
      'Report any non-lactose fermenter as Shigella immediately.',
      'Ignore biochemical results and report normal flora.',
      'Use oxidase positivity as the defining feature of Shigella.'
    ],
    answer: 'Correlate biochemical screening with approved serologic or identification methods and local reporting policy.',
    explanation: 'Shigella workups require careful biochemical screening and confirmatory identification/serologic logic. Non-lactose fermentation alone is not enough.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-010-yersinia-cold-enrichment',
    area: 'analytic-bacteriology',
    topic: 'Gastrointestinal culture',
    difficulty: 'advanced',
    tags: ['Yersinia', 'cold enrichment', 'CIN agar', 'stool culture'],
    prompt: 'A child has appendicitis-like abdominal pain, and Yersinia is in the differential. Which culture concept is most relevant?',
    choices: [
      'Selective media and temperature-aware methods may be needed because routine enteric setup may not optimize recovery.',
      'Yersinia is excluded if the stool is not cultured anaerobically.',
      'Yersinia is identified by coagulase positivity.',
      'All Yersinia isolates are lactose-fermenting colonies on MacConkey agar.'
    ],
    answer: 'Selective media and temperature-aware methods may be needed because routine enteric setup may not optimize recovery.',
    explanation: 'Yersinia-focused stool workups may use selective/differential media and temperature-aware protocols depending on the lab. The clinical syndrome should guide the request.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-011-wound-pseudomonas',
    area: 'analytic-bacteriology',
    topic: 'Skin, soft tissue, and wound culture',
    difficulty: 'beginner',
    tags: ['wound culture', 'Pseudomonas', 'oxidase', 'pigment'],
    prompt: 'A wound isolate is an oxidase-positive Gram-negative rod with a diffusible green-blue pigment and fruity odor. Which organism is most consistent?',
    choices: [
      'Pseudomonas aeruginosa.',
      'Streptococcus pyogenes.',
      'Clostridioides difficile.',
      'Neisseria gonorrhoeae.'
    ],
    answer: 'Pseudomonas aeruginosa.',
    explanation: 'Pseudomonas aeruginosa classically connects oxidase positivity, nonfermenting Gram-negative rod morphology, pigment, and characteristic odor in the right culture context.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-012-bite-wound-pasteurella',
    area: 'analytic-bacteriology',
    topic: 'Skin, soft tissue, and wound culture',
    difficulty: 'intermediate',
    tags: ['bite wound', 'Pasteurella', 'animal exposure'],
    prompt: 'A rapidly developing wound infection follows a cat bite. Culture grows small Gram-negative coccobacilli. Which organism group should be high on the bench differential?',
    choices: [
      'Pasteurella species.',
      'Mycobacterium tuberculosis complex.',
      'Candida albicans.',
      'Shigella species.'
    ],
    answer: 'Pasteurella species.',
    explanation: 'Animal bite wounds are a classic context for Pasteurella-like organisms. Source history can be as important as the early biochemical profile.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-013-anaerobe-bbe-logic',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic bacteriology',
    difficulty: 'advanced',
    tags: ['anaerobe', 'Bacteroides fragilis group', 'BBE', 'bile'],
    prompt: 'An anaerobic Gram-negative rod grows on bile-containing selective media and is clinically significant from an abscess. Which branch is most likely being evaluated?',
    choices: [
      'Bacteroides fragilis group.',
      'Neisseria meningitidis.',
      'Staphylococcus saprophyticus.',
      'Campylobacter jejuni.'
    ],
    answer: 'Bacteroides fragilis group.',
    explanation: 'Bile-resistant anaerobic Gram-negative rods from abscess material often move toward Bacteroides fragilis group logic. Anaerobic source and selective media results matter.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-014-gbs-screening',
    area: 'analytic-bacteriology',
    topic: 'Genital tract culture',
    difficulty: 'intermediate',
    tags: ['GBS', 'pregnancy', 'screening', 'enrichment broth'],
    prompt: 'A prenatal screen is ordered to detect group B Streptococcus colonization. Which principle best supports the usual laboratory approach?',
    choices: [
      'Use validated enrichment and subculture methods because screening aims to recover colonization that may be present at low levels.',
      'Use MacConkey agar alone because GBS is a lactose-fermenting Gram-negative rod.',
      'Reject all vaginal-rectal specimens because GBS cannot colonize mucosal sites.',
      'Report only if acid-fast bacilli are seen.'
    ],
    answer: 'Use validated enrichment and subculture methods because screening aims to recover colonization that may be present at low levels.',
    explanation: 'GBS screening is a colonization-detection workflow. Enrichment improves recovery and supports prevention decisions in pregnancy.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-015-gonorrhea-naat',
    area: 'analytic-bacteriology',
    topic: 'Genital tract diagnosis',
    difficulty: 'beginner',
    tags: ['Neisseria gonorrhoeae', 'NAAT', 'genital tract'],
    prompt: 'For routine adult genital tract testing when Neisseria gonorrhoeae infection is suspected, which method is commonly used because of sensitivity and workflow practicality?',
    choices: [
      'Validated nucleic acid amplification testing from an approved specimen type.',
      'Routine anaerobic culture of stool.',
      'Coagulase testing from blood agar.',
      'India ink examination of urine sediment.'
    ],
    answer: 'Validated nucleic acid amplification testing from an approved specimen type.',
    explanation: 'NAAT is commonly used for routine gonorrhea diagnosis from validated specimen types. Culture remains important in selected circumstances such as susceptibility or medicolegal/public health needs.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-016-urine-colony-count',
    area: 'analytic-bacteriology',
    topic: 'Urine culture interpretation',
    difficulty: 'beginner',
    tags: ['urine culture', 'colony count', 'calibrated loop'],
    prompt: 'A clean-catch urine culture is plated with a calibrated loop and grows a single uropathogen in a count considered significant by the laboratory policy. What should the student recognize first?',
    choices: [
      'Colony count interpretation depends on loop volume, collection method, organism burden, and local reporting rules.',
      'Any colony on any urine plate is automatically reported as a urinary tract infection.',
      'A colony count can identify the organism without biochemical or MALDI-style workup.',
      'Urine cultures should be interpreted without considering collection method.'
    ],
    answer: 'Colony count interpretation depends on loop volume, collection method, organism burden, and local reporting rules.',
    explanation: 'Urine culture interpretation combines quantitative growth, collection quality, organism identity, and symptoms or policy context. Count alone is not the same as infection.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-017-proteeae-branch',
    area: 'analytic-bacteriology',
    topic: 'Urine culture interpretation',
    difficulty: 'intermediate',
    tags: ['Proteeae', 'urease', 'PAD', 'urine culture'],
    prompt: 'A urine isolate is a Gram-negative rod that is urease positive and phenylalanine deaminase positive. Which group should be considered early in the workup?',
    choices: [
      'Proteus, Morganella, or Providencia-like organisms.',
      'Group B Streptococcus.',
      'Neisseria lactamica.',
      'Bacteroides fragilis group.'
    ],
    answer: 'Proteus, Morganella, or Providencia-like organisms.',
    explanation: 'PAD positivity is a high-yield branch point for the Proteeae group. Urease, motility, indole, ornithine, and H2S patterns then help separate members.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-018-staph-saprophyticus-novobiocin',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus differentiation',
    difficulty: 'intermediate',
    tags: ['Staphylococcus saprophyticus', 'novobiocin', 'UTI'],
    prompt: 'A young adult with cystitis has a coagulase-negative staphylococcal urine isolate. Which classic bench clue supports Staphylococcus saprophyticus?',
    choices: [
      'Novobiocin resistance in the correct organism and source context.',
      'Strong oxidase positivity.',
      'Bile solubility positivity.',
      'Requirement for X and V factors.'
    ],
    answer: 'Novobiocin resistance in the correct organism and source context.',
    explanation: 'S. saprophyticus is a classic coagulase-negative staphylococcus associated with uncomplicated UTI and novobiocin resistance. The result should be interpreted with source and policy context.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-019-micrococcus-vs-staph',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus differentiation',
    difficulty: 'advanced',
    tags: ['Micrococcus', 'Staphylococcus', 'modified oxidase', 'bacitracin'],
    prompt: 'A catalase-positive Gram-positive coccus from skin flora workup appears in tetrads and has a colony pattern suggestive of Micrococcus-like organisms. Which principle is most useful?',
    choices: [
      'Use a validated Micrococcus-versus-Staphylococcus differentiation scheme such as modified oxidase and susceptibility patterns.',
      'Report it as Streptococcus pneumoniae because it is a coccus.',
      'Use MacConkey lactose reaction as the primary discriminator.',
      'Assume all catalase-positive cocci are coagulase-positive staphylococci.'
    ],
    answer: 'Use a validated Micrococcus-versus-Staphylococcus differentiation scheme such as modified oxidase and susceptibility patterns.',
    explanation: 'Micrococcus-like organisms can overlap morphologically with staphylococci. Differentiation depends on validated tests and clinical significance, not morphology alone.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-020-strep-pyogenes-screen',
    area: 'analytic-bacteriology',
    topic: 'Streptococcus differentiation',
    difficulty: 'beginner',
    tags: ['Streptococcus pyogenes', 'bacitracin', 'PYR', 'beta hemolysis'],
    prompt: 'A beta-hemolytic Streptococcus from throat culture is being screened for group A Streptococcus. Which result pattern supports that branch?',
    choices: [
      'PYR positivity with a compatible group A identification workflow.',
      'Growth only on MacConkey agar.',
      'Strict anaerobic growth with bile resistance.',
      'Requirement for X and V factors.'
    ],
    answer: 'PYR positivity with a compatible group A identification workflow.',
    explanation: 'Group A Streptococcus screening may use PYR and other validated methods. Beta hemolysis and source guide the branch, but confirmation follows lab policy.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-021-enterococcus-vs-group-d',
    area: 'analytic-bacteriology',
    topic: 'Enterococcus and group D streptococci',
    difficulty: 'intermediate',
    tags: ['Enterococcus', 'bile esculin', 'salt tolerance', 'group D'],
    prompt: 'A Gram-positive coccus is bile esculin positive. Which additional result helps support Enterococcus rather than a non-enterococcal group D streptococcus?',
    choices: [
      'Growth in 6.5% NaCl broth when validated by the laboratory method.',
      'Optochin susceptibility.',
      'Yellow colonies on TCBS agar.',
      'Acid-fast positivity.'
    ],
    answer: 'Growth in 6.5% NaCl broth when validated by the laboratory method.',
    explanation: 'Bile esculin positivity is not by itself enough to call Enterococcus. Salt tolerance is a classic differentiating clue in the correct Gram-positive cocci workflow.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-022-viridans-vs-pneumococcus',
    area: 'analytic-bacteriology',
    topic: 'Streptococcus differentiation',
    difficulty: 'intermediate',
    tags: ['viridans streptococci', 'Streptococcus pneumoniae', 'optochin', 'bile solubility'],
    prompt: 'An alpha-hemolytic streptococcal isolate must be separated from pneumococcus-like organisms. Which test pair is classically useful?',
    choices: [
      'Optochin susceptibility and bile solubility.',
      'Urease and phenylalanine deaminase.',
      'Coagulase and novobiocin.',
      'TCBS sucrose and salt requirement.'
    ],
    answer: 'Optochin susceptibility and bile solubility.',
    explanation: 'Optochin and bile solubility are classic tools for the pneumococcal branch. Results must still be interpreted with colony morphology, source, and local policy.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-023-hacek-concept',
    area: 'analytic-bacteriology',
    topic: 'Fastidious Gram-negative organisms',
    difficulty: 'advanced',
    tags: ['HACEK', 'endocarditis', 'fastidious Gram-negative rods'],
    prompt: 'A slow-growing Gram-negative organism is recovered from blood culture in a patient with suspected endocarditis. Which concept best fits HACEK-style reasoning?',
    choices: [
      'Fastidious oral flora can cause endocarditis and may require careful incubation and identification workflow.',
      'All HACEK organisms are strict anaerobic spore-formers.',
      'HACEK organisms are best identified by coagulase positivity.',
      'A negative oxidase test excludes all fastidious Gram-negative organisms.'
    ],
    answer: 'Fastidious oral flora can cause endocarditis and may require careful incubation and identification workflow.',
    explanation: 'HACEK organisms connect oral flora, slow or fastidious growth, and endocarditis. The bench lesson is to match growth characteristics and clinical source before forcing routine enteric logic.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-024-neisseria-carbohydrates',
    area: 'analytic-bacteriology',
    topic: 'Neisseria differentiation',
    difficulty: 'advanced',
    tags: ['Neisseria', 'carbohydrate utilization', 'oxidase', 'Thayer-Martin'],
    prompt: 'A pathogenic Neisseria isolate is oxidase positive and requires species-level differentiation. Which principle is most appropriate?',
    choices: [
      'Use validated identification methods that may include carbohydrate utilization patterns and source context.',
      'Use bile esculin and salt tolerance as the primary tests.',
      'Report all oxidase-positive diplococci as Moraxella catarrhalis.',
      'Use H2S on TSI as the defining test.'
    ],
    answer: 'Use validated identification methods that may include carbohydrate utilization patterns and source context.',
    explanation: 'Neisseria identification depends on approved methods and source context. Oxidase positivity is an early clue, not a complete species identification.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-025-moraxella-hockey-puck',
    area: 'analytic-bacteriology',
    topic: 'Moraxella differentiation',
    difficulty: 'intermediate',
    tags: ['Moraxella catarrhalis', 'butyrate', 'DNase', 'respiratory culture'],
    prompt: 'A respiratory isolate is an oxidase-positive Gram-negative diplococcus with colony behavior suggesting Moraxella catarrhalis. Which supporting reaction is commonly useful?',
    choices: [
      'Butyrate esterase or DNase positivity in a compatible respiratory-source isolate.',
      'CAMP positivity with beta hemolysis.',
      'Indole positivity with swarming.',
      'Growth only under strict anaerobic conditions.'
    ],
    answer: 'Butyrate esterase or DNase positivity in a compatible respiratory-source isolate.',
    explanation: 'Moraxella catarrhalis can resemble Neisseria microscopically. Respiratory source, colony behavior, and tests such as butyrate esterase or DNase help support the branch.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-026-listeria-vs-coryneform',
    area: 'analytic-bacteriology',
    topic: 'Gram-positive rods',
    difficulty: 'advanced',
    tags: ['Listeria', 'Corynebacterium', 'motility', 'beta hemolysis'],
    prompt: 'A small Gram-positive rod from a sterile-site specimen shows narrow beta hemolysis and tumbling-style motility. Which organism should be considered?',
    choices: [
      'Listeria monocytogenes.',
      'Corynebacterium jeikeium.',
      'Escherichia coli.',
      'Bacteroides fragilis.'
    ],
    answer: 'Listeria monocytogenes.',
    explanation: 'Listeria can resemble coryneform rods microscopically, but sterile-site source, narrow beta hemolysis, and characteristic motility support the Listeria branch.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-027-erysipelothrix-clue',
    area: 'analytic-bacteriology',
    topic: 'Gram-positive rods',
    difficulty: 'advanced',
    tags: ['Erysipelothrix', 'H2S', 'catalase negative', 'animal exposure'],
    prompt: 'A slender Gram-positive rod from a patient with animal or fish exposure is catalase negative and produces H2S in an appropriate medium. Which organism is a classic consideration?',
    choices: [
      'Erysipelothrix rhusiopathiae.',
      'Pseudomonas aeruginosa.',
      'Neisseria gonorrhoeae.',
      'Shigella sonnei.'
    ],
    answer: 'Erysipelothrix rhusiopathiae.',
    explanation: 'Erysipelothrix connects slender Gram-positive rods, catalase negativity, H2S production in the right method, and animal or fish exposure.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-028-anaerobe-reverse-camp',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic bacteriology',
    difficulty: 'advanced',
    tags: ['anaerobe', 'reverse CAMP', 'lecithinase', 'Clostridium'],
    prompt: 'An anaerobic Gram-positive rod workup includes lecithinase and reverse CAMP-style reactions. Which concept is being tested?',
    choices: [
      'Differentiation among selected Clostridium-like anaerobic Gram-positive rods.',
      'Routine confirmation of Neisseria gonorrhoeae.',
      'Primary screening for lactose fermentation.',
      'Detection of beta-lactamase in Haemophilus only.'
    ],
    answer: 'Differentiation among selected Clostridium-like anaerobic Gram-positive rods.',
    explanation: 'Anaerobic Gram-positive rod identification can use spore status, aerotolerance, lecithinase, lipase, reverse CAMP, and colony features in an organism-appropriate workflow.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-029-nonfermenter-screen',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenting Gram-negative rods',
    difficulty: 'intermediate',
    tags: ['nonfermenters', 'oxidase', 'OF glucose', 'Pseudomonas'],
    prompt: 'A Gram-negative rod grows on MacConkey but does not ferment lactose. Which early test combination helps separate nonfermenters from enteric-style organisms?',
    choices: [
      'Oxidase reaction plus oxidative-fermentative glucose or equivalent metabolism testing.',
      'Bile esculin plus salt tolerance.',
      'CAMP plus bacitracin.',
      'Germ tube plus chromogenic yeast agar.'
    ],
    answer: 'Oxidase reaction plus oxidative-fermentative glucose or equivalent metabolism testing.',
    explanation: 'Nonfermenter logic often begins with oxidase, glucose utilization, pigment, odor, motility, growth temperature, and source. MacConkey growth alone is not enough.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-030-burkholderia-stenotrophomonas',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenting Gram-negative rods',
    difficulty: 'advanced',
    tags: ['Burkholderia', 'Stenotrophomonas', 'nonfermenters', 'oxidase'],
    prompt: 'A nonfermenting Gram-negative rod from a respiratory specimen needs separation of Burkholderia-like and Stenotrophomonas-like branches. Which principle is safest?',
    choices: [
      'Use a validated nonfermenter identification panel or MALDI/biochemical workflow and interpret with source and safety context.',
      'Call all nonfermenters Pseudomonas aeruginosa.',
      'Use coagulase and novobiocin as the main tests.',
      'Report normal flora if the isolate grows on MacConkey.'
    ],
    answer: 'Use a validated nonfermenter identification panel or MALDI/biochemical workflow and interpret with source and safety context.',
    explanation: 'Nonfermenters can be clinically important and sometimes safety-relevant. They require validated ID methods, not one isolated reaction.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-031-qc-oxidase',
    area: 'analytic-bacteriology',
    topic: 'Quality control and identification methods',
    difficulty: 'beginner',
    tags: ['quality control', 'oxidase', 'bench tests'],
    prompt: 'A new oxidase reagent lot is opened. Which QC principle is most appropriate?',
    choices: [
      'Verify the reagent with expected positive and negative control organisms before relying on patient isolate results.',
      'Use patient isolates as the only controls because QC organisms are unnecessary.',
      'Accept any purple color after several hours as positive.',
      'Skip QC if the reagent bottle is unopened.'
    ],
    answer: 'Verify the reagent with expected positive and negative control organisms before relying on patient isolate results.',
    explanation: 'Bench reagents require QC with appropriate controls. Oxidase is especially timing-sensitive, so method and interpretation time matter.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'published'
  },
  {
    id: 'bacteriology-032-satellite-test',
    area: 'analytic-bacteriology',
    topic: 'Quality control and identification methods',
    difficulty: 'intermediate',
    tags: ['satellitism', 'Haemophilus', 'X factor', 'V factor'],
    prompt: 'A tiny Gram-negative coccobacillus grows better around a helper organism that supplies growth factors. Which identification concept does this demonstrate?',
    choices: [
      'Satellitism supporting a Haemophilus-like growth-factor requirement.',
      'Swarming motility of Proteus.',
      'Bile solubility of pneumococcus.',
      'Reverse CAMP of anaerobic rods.'
    ],
    answer: 'Satellitism supporting a Haemophilus-like growth-factor requirement.',
    explanation: 'Satellitism reflects growth enhancement near organisms that provide required factors, classically supporting Haemophilus-like reasoning in the right context.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-033-enterococcus-synergy',
    area: 'analytic-bacteriology',
    topic: 'Antimicrobial susceptibility testing',
    difficulty: 'advanced',
    tags: ['Enterococcus', 'synergy', 'aminoglycoside', 'AST'],
    prompt: 'An Enterococcus faecalis isolate from endocarditis is being evaluated for therapy support. Which AST concept is most relevant to aminoglycoside combination therapy?',
    choices: [
      'High-level aminoglycoside resistance testing because resistance can eliminate expected synergy.',
      'Optochin testing because it predicts gentamicin synergy.',
      'Coagulase testing because it predicts vancomycin resistance.',
      'Lactose fermentation because it predicts beta-lactamase production.'
    ],
    answer: 'High-level aminoglycoside resistance testing because resistance can eliminate expected synergy.',
    explanation: 'Enterococcal endocarditis therapy may rely on synergistic combinations. High-level aminoglycoside resistance can defeat that synergy and must be detected by appropriate methods.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-034-meca-detection',
    area: 'analytic-bacteriology',
    topic: 'Antimicrobial susceptibility testing',
    difficulty: 'advanced',
    tags: ['S. aureus', 'mecA', 'cefoxitin', 'oxacillin', 'MRSA'],
    prompt: 'A Staphylococcus aureus isolate needs evaluation for methicillin resistance. Which principle is most accurate?',
    choices: [
      'Use an approved method that detects mecA-mediated resistance, such as cefoxitin/oxacillin-based or molecular approaches depending on the lab.',
      'Assume penicillin susceptibility predicts methicillin susceptibility.',
      'Use optochin susceptibility as the primary MRSA screen.',
      'Ignore resistance testing if the isolate came from blood culture.'
    ],
    answer: 'Use an approved method that detects mecA-mediated resistance, such as cefoxitin/oxacillin-based or molecular approaches depending on the lab.',
    explanation: 'Methicillin resistance in S. aureus is tied to mecA/mecC-mediated altered penicillin-binding protein activity. Detection must follow current approved methods and breakpoints.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-035-d-zone-test',
    area: 'analytic-bacteriology',
    topic: 'Antimicrobial susceptibility testing',
    difficulty: 'advanced',
    tags: ['D-test', 'inducible clindamycin resistance', 'Staphylococcus aureus', 'erythromycin'],
    prompt: 'A Staphylococcus aureus isolate is erythromycin resistant and clindamycin susceptible by routine disk results. Which additional test detects inducible clindamycin resistance?',
    choices: [
      'D-zone test using erythromycin and clindamycin disks placed at the correct distance.',
      'Optochin disk test.',
      'Bile solubility test.',
      'Urease test.'
    ],
    answer: 'D-zone test using erythromycin and clindamycin disks placed at the correct distance.',
    explanation: 'The D-zone test detects inducible clindamycin resistance. A positive result changes how clindamycin is reported because apparent susceptibility may be misleading.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-036-esbl-confirmation',
    area: 'analytic-bacteriology',
    topic: 'Antimicrobial susceptibility testing',
    difficulty: 'advanced',
    tags: ['ESBL', 'Enterobacterales', 'cephalosporin', 'clavulanate'],
    prompt: 'An Enterobacterales isolate shows a pattern suspicious for extended-spectrum beta-lactamase production. Which confirmation principle is classic?',
    choices: [
      'Compare cephalosporin activity with and without a beta-lactamase inhibitor such as clavulanate using an approved method.',
      'Use catalase alone to confirm ESBL production.',
      'Perform a germ tube test.',
      'Use optochin susceptibility as the confirmatory method.'
    ],
    answer: 'Compare cephalosporin activity with and without a beta-lactamase inhibitor such as clavulanate using an approved method.',
    explanation: 'ESBL confirmation historically relies on demonstrating inhibitor effect with clavulanate or equivalent approved algorithms. Current reporting may depend on instrument, organism, and standards.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Bacteriology',
    status: 'draft'
  },
  {
    id: 'bacteriology-037-chlamydia-obligate-intracellular',
    area: 'analytic-bacteriology',
    topic: 'Intracellular organism recovery',
    difficulty: 'beginner',
    tags: ['Chlamydia', 'obligate intracellular', 'cell culture', 'NAAT'],
    prompt: 'Why is Chlamydia not recovered on routine blood or chocolate agar like many other bacteria?',
    choices: [
      'It is an obligate intracellular organism and requires host-cell based methods or molecular detection.',
      'It grows only when the plate is incubated without carbon dioxide.',
      'It is too large to pass through routine agar pores.',
      'It is inhibited by all protein-containing transport media.'
    ],
    answer: 'It is an obligate intracellular organism and requires host-cell based methods or molecular detection.',
    explanation: 'Chlamydia depends on host cells for replication, so routine agar culture is not the recovery method. The key bench idea is to match the organism biology to the correct test system.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'bacteriology-038-campylobacter-stool-setup',
    area: 'analytic-bacteriology',
    topic: 'Stool pathogen recovery',
    difficulty: 'intermediate',
    tags: ['Campylobacter', 'stool culture', 'microaerophilic', 'selective media'],
    prompt: 'A stool culture workup needs to include Campylobacter recovery. Which setup best matches this organism\'s culture requirements?',
    choices: [
      'Selective Campylobacter medium incubated under microaerophilic conditions.',
      'Routine blood agar incubated in ambient air only.',
      'Sabouraud agar incubated at room temperature.',
      'Lowenstein-Jensen medium incubated for several weeks.'
    ],
    answer: 'Selective Campylobacter medium incubated under microaerophilic conditions.',
    explanation: 'Campylobacter recovery requires the right atmosphere and selective setup. Routine enteric plating alone may miss it because the organism does not behave like typical Enterobacterales.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-039-tcbs-vibrio-selection',
    area: 'analytic-bacteriology',
    topic: 'Vibrio selective media',
    difficulty: 'beginner',
    tags: ['Vibrio', 'TCBS', 'selective media', 'stool culture'],
    prompt: 'A stool specimen is being evaluated for possible Vibrio species. Which medium is commonly used as a selective and differential option for this group?',
    choices: [
      'Thiosulfate-citrate-bile salts-sucrose agar.',
      'Chocolate agar with hemin and NAD only.',
      'Lowenstein-Jensen medium.',
      'Bile esculin agar.'
    ],
    answer: 'Thiosulfate-citrate-bile salts-sucrose agar.',
    explanation: 'TCBS agar is designed to help recover and differentiate Vibrio species from stool or other appropriate specimens. It supports the bench branch toward oxidase-positive curved gram-negative rods.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'bacteriology-040-cna-gram-positive-selection',
    area: 'analytic-bacteriology',
    topic: 'Selective gram-positive media',
    difficulty: 'beginner',
    tags: ['CNA', 'selective media', 'gram-positive cocci', 'mixed flora'],
    prompt: 'Why would a lab include colistin-nalidixic acid agar when working up a specimen with heavy mixed flora?',
    choices: [
      'It suppresses many gram-negative rods and helps recover gram-positive organisms.',
      'It selects only for acid-fast bacilli.',
      'It converts lactose fermenters into nonfermenters.',
      'It prevents all hemolysis on blood-containing media.'
    ],
    answer: 'It suppresses many gram-negative rods and helps recover gram-positive organisms.',
    explanation: 'CNA is useful when gram-positive organisms may be obscured by gram-negative flora. The medium supports recovery by reducing competing gram-negative growth.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'bacteriology-041-chocolate-mtm-selection',
    area: 'analytic-bacteriology',
    topic: 'Fastidious organism media',
    difficulty: 'intermediate',
    tags: ['chocolate agar', 'modified Thayer-Martin', 'Haemophilus', 'Neisseria'],
    prompt: 'A student sees both chocolate agar and modified Thayer-Martin agar on a bench setup. Which distinction is most accurate?',
    choices: [
      'Chocolate agar supports fastidious organisms broadly, while modified Thayer-Martin is selective for pathogenic Neisseria from mixed sites.',
      'Chocolate agar is selective only for anaerobes, while modified Thayer-Martin is used only for stool pathogens.',
      'Chocolate agar is used only for fungi, while modified Thayer-Martin is used only for mycobacteria.',
      'Both media are identical except for plate color.'
    ],
    answer: 'Chocolate agar supports fastidious organisms broadly, while modified Thayer-Martin is selective for pathogenic Neisseria from mixed sites.',
    explanation: 'Chocolate agar provides growth factors for fastidious organisms such as Haemophilus and Neisseria. Modified Thayer-Martin adds selective agents to help recover pathogenic Neisseria from specimens with competing flora.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-042-ccfa-cdiff-recovery',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic stool media',
    difficulty: 'advanced',
    tags: ['Clostridioides difficile', 'CCFA', 'anaerobes', 'stool culture'],
    prompt: 'A lab uses a selective medium designed to recover Clostridioides difficile from stool. Which principle explains why selective agents are included?',
    choices: [
      'They reduce competing stool flora so C. difficile has a better chance of being recovered.',
      'They make the specimen safe by sterilizing all non-spore-forming organisms.',
      'They replace the need for anaerobic incubation.',
      'They identify toxin production without any additional testing or workflow.'
    ],
    answer: 'They reduce competing stool flora so C. difficile has a better chance of being recovered.',
    explanation: 'Selective C. difficile media are designed to suppress competing stool organisms. Recovery still depends on the correct specimen, atmosphere, incubation conditions, and the lab\'s identification or toxin workflow.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-043-xld-h2s-enteric-interpretation',
    area: 'analytic-bacteriology',
    topic: 'Enteric differential media',
    difficulty: 'intermediate',
    tags: ['XLD', 'Salmonella', 'H2S', 'enteric pathogens'],
    prompt: 'On an enteric differential plate, a non-lactose fermenting colony has a black center from hydrogen sulfide production. Which bench interpretation is most appropriate?',
    choices: [
      'It is a screening clue that should prompt further workup for organisms such as Salmonella.',
      'It confirms Shigella without any additional testing.',
      'It proves the organism is a gram-positive anaerobe.',
      'It rules out all stool pathogens because black centers are normal flora only.'
    ],
    answer: 'It is a screening clue that should prompt further workup for organisms such as Salmonella.',
    explanation: 'H2S production on enteric media is a useful screening clue, especially for Salmonella-like colonies. It is not a final identification by itself and must be interpreted with the full bench workflow.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-044-cin-yersinia-screen',
    area: 'analytic-bacteriology',
    topic: 'Yersinia selective media',
    difficulty: 'intermediate',
    tags: ['Yersinia', 'CIN agar', 'stool culture', 'selective media'],
    prompt: 'A clinician specifically requests evaluation for Yersinia enterocolitica from stool. Which medium choice best supports that targeted recovery?',
    choices: [
      'Cefsulodin-irgasan-novobiocin agar.',
      'Buffered charcoal yeast extract agar.',
      'Bordet-Gengou agar.',
      'Potato dextrose agar.'
    ],
    answer: 'Cefsulodin-irgasan-novobiocin agar.',
    explanation: 'CIN agar is a selective medium used when Yersinia recovery is specifically needed. Targeted media matter because routine stool culture conditions may not recover every requested pathogen equally well.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-045-sorbitol-macconkey-o157-screen',
    area: 'analytic-bacteriology',
    topic: 'Enteric screening media',
    difficulty: 'intermediate',
    tags: ['sorbitol MacConkey', 'E coli O157', 'stool culture', 'screening'],
    prompt: 'A stool isolate is colorless on sorbitol MacConkey agar. What is the best way to interpret this finding in a screening workflow?',
    choices: [
      'It is a clue for possible non-sorbitol fermenting E. coli O157:H7 and needs confirmatory workup.',
      'It confirms every Shiga toxin-producing E. coli strain without further testing.',
      'It proves the isolate is normal lactose-fermenting fecal flora.',
      'It rules out E. coli because all E. coli ferment sorbitol rapidly.'
    ],
    answer: 'It is a clue for possible non-sorbitol fermenting E. coli O157:H7 and needs confirmatory workup.',
    explanation: 'Sorbitol MacConkey is a screening tool, not a complete identification. Non-sorbitol fermentation raises suspicion for E. coli O157:H7, but confirmation follows the laboratory workflow.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-046-oxidase-positive-gnr-branch',
    area: 'analytic-bacteriology',
    topic: 'Oxidase-positive gram-negative rods',
    difficulty: 'advanced',
    tags: ['oxidase', 'Aeromonas', 'Vibrio', 'Plesiomonas', 'gram-negative rods'],
    prompt: 'A stool isolate is a gram-negative rod that is oxidase positive. Why does that result matter early in the bench workflow?',
    choices: [
      'It pushes the workup away from typical Enterobacterales and toward organisms such as Vibrio, Aeromonas, or Plesiomonas.',
      'It confirms the isolate is Escherichia coli.',
      'It proves the isolate is a gram-positive coccus.',
      'It means biochemical testing is unnecessary.'
    ],
    answer: 'It pushes the workup away from typical Enterobacterales and toward organisms such as Vibrio, Aeromonas, or Plesiomonas.',
    explanation: 'Most Enterobacterales are oxidase negative. An oxidase-positive gram-negative rod changes the branch and should trigger a different identification pathway.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-047-nitrocefin-beta-lactamase',
    area: 'analytic-bacteriology',
    topic: 'Beta-lactamase detection',
    difficulty: 'intermediate',
    tags: ['beta-lactamase', 'nitrocefin', 'antimicrobial susceptibility', 'bench tests'],
    prompt: 'A rapid beta-lactamase test uses a chromogenic cephalosporin substrate. What does a positive color change indicate?',
    choices: [
      'The organism produced an enzyme that hydrolyzed the beta-lactam ring of the substrate.',
      'The organism is unable to grow in the presence of oxygen.',
      'The organism fermented lactose within the test reagent.',
      'The organism produced urease from urea in the reagent.'
    ],
    answer: 'The organism produced an enzyme that hydrolyzed the beta-lactam ring of the substrate.',
    explanation: 'Chromogenic beta-lactamase tests detect enzymatic hydrolysis of a beta-lactam substrate. The result supports antimicrobial interpretation but must be used according to organism-specific guidance.',
    source: 'Learn Microbes original question bank: Antimicrobial Susceptibility Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-048-mic-breakpoint-meaning',
    area: 'analytic-bacteriology',
    topic: 'Antimicrobial susceptibility testing',
    difficulty: 'advanced',
    tags: ['MIC', 'breakpoint', 'susceptibility testing', 'AST'],
    prompt: 'In antimicrobial susceptibility testing, what is the role of a breakpoint?',
    choices: [
      'It is an interpretive threshold used to relate an MIC or zone result to categories such as susceptible, intermediate, or resistant.',
      'It is the exact time when a broth culture becomes visibly turbid.',
      'It is the number of colonies required before a plate can be called pure.',
      'It is the temperature at which an antibiotic stops diffusing through agar.'
    ],
    answer: 'It is an interpretive threshold used to relate an MIC or zone result to categories such as susceptible, intermediate, or resistant.',
    explanation: 'Breakpoints connect standardized test results to interpretive categories. They are not just raw numbers; they depend on organism, drug, method, and current interpretive standards.',
    source: 'Learn Microbes original question bank: Antimicrobial Susceptibility Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-049-kirby-bauer-zone-reading',
    area: 'analytic-bacteriology',
    topic: 'Disk diffusion testing',
    difficulty: 'advanced',
    tags: ['Kirby-Bauer', 'disk diffusion', 'zone measurement', 'AST'],
    prompt: 'A Kirby-Bauer disk diffusion plate shows a clear inhibition zone around an antibiotic disk. What should the bench reader generally measure?',
    choices: [
      'The diameter of the inhibition zone using the method-specific reading rules.',
      'Only the distance from the disk edge to the first colony.',
      'The thickness of the agar after incubation.',
      'The color intensity of the antibiotic disk.'
    ],
    answer: 'The diameter of the inhibition zone using the method-specific reading rules.',
    explanation: 'Disk diffusion interpretation depends on standardized zone diameter measurement and method-specific rules. Reading the plate consistently is essential before comparing the result with breakpoints.',
    source: 'Learn Microbes original question bank: Antimicrobial Susceptibility Methods',
    status: 'draft'
  },
  {
    id: 'bacteriology-050-enterobacterales-core-screen',
    area: 'analytic-bacteriology',
    topic: 'Enterobacterales identification',
    difficulty: 'beginner',
    tags: ['Enterobacterales', 'enterics', 'gram-negative rods', 'oxidase'],
    prompt: 'A bench learner asks what first separates most Enterobacterales from many other gram-negative rods. Which pattern is the best starting screen?',
    choices: [
      'Gram-negative rods that usually ferment glucose, reduce nitrate, and are oxidase negative.',
      'Gram-positive cocci that grow only in anaerobic jars.',
      'Curved gram-negative rods that are always oxidase positive and microaerophilic.',
      'Acid-fast rods that require mycobacterial media for primary recovery.'
    ],
    answer: 'Gram-negative rods that usually ferment glucose, reduce nitrate, and are oxidase negative.',
    explanation: 'Most Enterobacterales are screened as glucose-fermenting, oxidase-negative gram-negative rods. That early branch helps separate them from oxidase-positive nonfermenters and curved gram-negative rods.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-051-onpg-beta-galactosidase',
    area: 'analytic-bacteriology',
    topic: 'Enteric biochemical tests',
    difficulty: 'intermediate',
    tags: ['ONPG', 'beta-galactosidase', 'lactose fermentation', 'enterics'],
    prompt: 'An enteric isolate looks like a non-lactose fermenter on primary media, but the lab wants to check for delayed lactose metabolism. Which test principle is most useful?',
    choices: [
      'ONPG detects beta-galactosidase activity even when visible lactose fermentation is delayed.',
      'Oxidase testing detects lactose permease inside the cell membrane.',
      'Catalase testing confirms delayed lactose fermentation by releasing acid.',
      'Urease testing directly measures beta-galactosidase activity.'
    ],
    answer: 'ONPG detects beta-galactosidase activity even when visible lactose fermentation is delayed.',
    explanation: 'ONPG helps identify organisms that have beta-galactosidase but may not show prompt lactose fermentation on routine media. It is a useful support test, not a complete identification by itself.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-052-mr-vp-fermentation-split',
    area: 'analytic-bacteriology',
    topic: 'Enteric biochemical tests',
    difficulty: 'beginner',
    tags: ['MR', 'VP', 'glucose fermentation', 'enterics'],
    prompt: 'Why are methyl red and Voges-Proskauer often taught as a paired concept in enteric identification?',
    choices: [
      'They help separate mixed-acid fermentation from acetoin production after glucose metabolism.',
      'They determine whether an organism is acid-fast.',
      'They measure oxygen tolerance in anaerobic jars.',
      'They identify beta-lactamase production directly.'
    ],
    answer: 'They help separate mixed-acid fermentation from acetoin production after glucose metabolism.',
    explanation: 'MR detects stable acid production, while VP detects acetoin from the butanediol pathway. The paired pattern helps separate common enteric groups during biochemical identification.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-053-indole-tryptophanase',
    area: 'analytic-bacteriology',
    topic: 'Enteric biochemical tests',
    difficulty: 'beginner',
    tags: ['indole', 'tryptophanase', 'E coli', 'enterics'],
    prompt: 'A positive indole test most directly shows that an organism can do which reaction?',
    choices: [
      'Break down tryptophan to produce indole.',
      'Split urea into ammonia and carbon dioxide.',
      'Reduce sulfur to visible black precipitate.',
      'Ferment citrate as its only carbon source.'
    ],
    answer: 'Break down tryptophan to produce indole.',
    explanation: 'Indole testing detects tryptophanase activity. It is one useful piece of the enteric ID puzzle, especially when separating organisms with otherwise similar colony patterns.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-054-tsi-kia-reaction-map',
    area: 'analytic-bacteriology',
    topic: 'Enteric tube reactions',
    difficulty: 'intermediate',
    tags: ['TSI', 'KIA', 'H2S', 'gas', 'enterics'],
    prompt: 'What is the main bench value of reading both the slant and butt of a TSI or KIA tube?',
    choices: [
      'The pattern screens carbohydrate use, gas production, and possible hydrogen sulfide production.',
      'The pattern confirms species-level identification without any additional testing.',
      'The pattern replaces Gram stain review for enteric isolates.',
      'The pattern determines whether the isolate is acid-fast.'
    ],
    answer: 'The pattern screens carbohydrate use, gas production, and possible hydrogen sulfide production.',
    explanation: 'TSI and KIA reactions are pattern-recognition tools. They help guide the next branch by showing acid production in different oxygen zones, gas, and H2S clues.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-055-kia-k-a-glucose-only',
    area: 'analytic-bacteriology',
    topic: 'Enteric tube reactions',
    difficulty: 'intermediate',
    tags: ['KIA', 'TSI', 'glucose fermentation', 'enterics'],
    prompt: 'A TSI-style tube shows an alkaline slant and acid butt. What is the best general interpretation?',
    choices: [
      'The organism fermented glucose only, with no sustained lactose or sucrose fermentation on the slant.',
      'The organism fermented lactose strongly but did not use glucose.',
      'The organism is confirmed as Escherichia coli.',
      'The organism cannot metabolize any carbohydrate in the tube.'
    ],
    answer: 'The organism fermented glucose only, with no sustained lactose or sucrose fermentation on the slant.',
    explanation: 'An alkaline slant with an acid butt is a classic glucose-only fermentation pattern. It narrows the branch but does not identify the organism alone.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-056-h2s-enteric-clue',
    area: 'analytic-bacteriology',
    topic: 'Enteric tube reactions',
    difficulty: 'beginner',
    tags: ['H2S', 'Salmonella', 'Proteus', 'enterics'],
    prompt: 'An enteric screening tube develops blackening in the butt. How should a learner use that result?',
    choices: [
      'As a hydrogen sulfide clue that should be combined with motility, lactose reaction, and other biochemical tests.',
      'As final proof that the isolate is Shigella.',
      'As evidence that the organism is gram positive.',
      'As a reason to skip all remaining identification steps.'
    ],
    answer: 'As a hydrogen sulfide clue that should be combined with motility, lactose reaction, and other biochemical tests.',
    explanation: 'Blackening suggests H2S production, which can point toward organisms such as Salmonella or Proteus. It is a branch clue, not a final identification.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-057-lia-salmonella-pattern',
    area: 'analytic-bacteriology',
    topic: 'Enteric tube reactions',
    difficulty: 'advanced',
    tags: ['LIA', 'lysine decarboxylase', 'Salmonella', 'Proteus'],
    prompt: 'A non-lactose fermenting enteric isolate is H2S positive. Why might lysine iron agar help the bench separate Salmonella-like organisms from Proteus-like organisms?',
    choices: [
      'Salmonella commonly keeps an alkaline lysine pattern, while Proteus-like organisms may show lysine deamination.',
      'Salmonella is always urease positive, while Proteus is always urease negative.',
      'LIA replaces serologic or molecular confirmation for all enteric pathogens.',
      'LIA only detects beta-lactamase production.'
    ],
    answer: 'Salmonella commonly keeps an alkaline lysine pattern, while Proteus-like organisms may show lysine deamination.',
    explanation: 'LIA helps sort non-lactose fermenting, H2S-producing enterics by showing lysine decarboxylation or deamination patterns. It supports the branch before final identification.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-058-phenylalanine-deaminase-pmp',
    area: 'analytic-bacteriology',
    topic: 'Enteric biochemical tests',
    difficulty: 'intermediate',
    tags: ['phenylalanine deaminase', 'Proteus', 'Morganella', 'Providencia', 'enterics'],
    prompt: 'A non-lactose fermenting enteric isolate is phenylalanine deaminase positive. Which group should move higher in the learner\'s differential?',
    choices: [
      'Proteus, Morganella, and Providencia.',
      'Escherichia, Klebsiella, and Enterobacter.',
      'Shigella, Salmonella, and Yersinia only.',
      'Neisseria, Moraxella, and Haemophilus.'
    ],
    answer: 'Proteus, Morganella, and Providencia.',
    explanation: 'Phenylalanine deaminase positivity is a strong branch clue for the Proteus-Morganella-Providencia group. The next step is to use motility, indole, urease, and other tests to narrow further.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-059-proteus-swarming-urease',
    area: 'analytic-bacteriology',
    topic: 'Proteus identification',
    difficulty: 'beginner',
    tags: ['Proteus', 'urease', 'swarming', 'enterics'],
    prompt: 'A gram-negative rod from a wound culture shows swarming growth on blood agar and a rapid urease-positive reaction. Which organism group best fits the early bench pattern?',
    choices: [
      'Proteus species.',
      'Shigella species.',
      'Klebsiella pneumoniae.',
      'Escherichia coli O157:H7.'
    ],
    answer: 'Proteus species.',
    explanation: 'Swarming growth and strong urease activity are classic Proteus clues. The result still needs the full bench workflow, but the early branch is Proteus-like.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-060-ecoli-classic-profile',
    area: 'analytic-bacteriology',
    topic: 'Escherichia coli identification',
    difficulty: 'beginner',
    tags: ['E coli', 'lactose fermentation', 'indole', 'enterics'],
    prompt: 'A typical urine isolate is an oxidase-negative gram-negative rod, lactose fermenting, indole positive, and VP negative. Which organism is the best fit for this common bench pattern?',
    choices: [
      'Escherichia coli.',
      'Pseudomonas aeruginosa.',
      'Staphylococcus aureus.',
      'Mycobacterium tuberculosis complex.'
    ],
    answer: 'Escherichia coli.',
    explanation: 'Typical E. coli is a lactose-fermenting, indole-positive Enterobacterales organism. Source, colony appearance, and the complete biochemical pattern should still match before final reporting.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'published'
  },
  {
    id: 'bacteriology-061-klebsiella-pneumoniae-profile',
    area: 'analytic-bacteriology',
    topic: 'Klebsiella identification',
    difficulty: 'intermediate',
    tags: ['Klebsiella pneumoniae', 'lactose fermentation', 'nonmotile', 'enterics'],
    prompt: 'A mucoid lactose-fermenting gram-negative rod is nonmotile, citrate positive, and indole negative. Which organism is the best match among common enterics?',
    choices: [
      'Klebsiella pneumoniae.',
      'Proteus mirabilis.',
      'Shigella sonnei.',
      'Salmonella enterica.'
    ],
    answer: 'Klebsiella pneumoniae.',
    explanation: 'Klebsiella pneumoniae commonly appears as a mucoid lactose fermenter and is nonmotile. Indole negativity helps separate it from Klebsiella oxytoca in many teaching workflows.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-062-klebsiella-oxytoca-indole',
    area: 'analytic-bacteriology',
    topic: 'Klebsiella identification',
    difficulty: 'intermediate',
    tags: ['Klebsiella oxytoca', 'Klebsiella pneumoniae', 'indole', 'enterics'],
    prompt: 'Two nonmotile, mucoid lactose-fermenting Klebsiella-like isolates look similar. Which result most commonly helps separate Klebsiella oxytoca from Klebsiella pneumoniae?',
    choices: [
      'Klebsiella oxytoca is typically indole positive, while Klebsiella pneumoniae is typically indole negative.',
      'Klebsiella oxytoca is oxidase positive, while Klebsiella pneumoniae is oxidase negative.',
      'Klebsiella oxytoca is acid-fast, while Klebsiella pneumoniae is not.',
      'Klebsiella oxytoca swarms across blood agar, while Klebsiella pneumoniae does not.'
    ],
    answer: 'Klebsiella oxytoca is typically indole positive, while Klebsiella pneumoniae is typically indole negative.',
    explanation: 'Indole is a useful bench separator for common Klebsiella species. The final call still depends on the full biochemical or instrument-supported identification workflow.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-063-enterobacter-cloacae-motility',
    area: 'analytic-bacteriology',
    topic: 'Enterobacter identification',
    difficulty: 'intermediate',
    tags: ['Enterobacter cloacae complex', 'Klebsiella', 'motility', 'enterics'],
    prompt: 'A lactose-fermenting enteric isolate is VP positive and citrate positive. Which additional feature would support Enterobacter cloacae complex over Klebsiella pneumoniae?',
    choices: [
      'Motility.',
      'Acid-fast staining.',
      'Coagulase production.',
      'Strict anaerobic growth only.'
    ],
    answer: 'Motility.',
    explanation: 'Enterobacter cloacae complex is generally motile, while Klebsiella pneumoniae is nonmotile. Motility can be a helpful branch clue when other reactions overlap.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-064-citrobacter-salmonella-mimic',
    area: 'analytic-bacteriology',
    topic: 'Citrobacter identification',
    difficulty: 'advanced',
    tags: ['Citrobacter freundii', 'Salmonella', 'H2S', 'enterics'],
    prompt: 'Why can Citrobacter freundii create confusion during an enteric stool workup?',
    choices: [
      'It may produce H2S and resemble Salmonella-like colonies before the full workup is complete.',
      'It is always oxidase positive and grows only under microaerophilic conditions.',
      'It is a gram-positive coccus that mimics staphylococci.',
      'It cannot grow on routine enteric media.'
    ],
    answer: 'It may produce H2S and resemble Salmonella-like colonies before the full workup is complete.',
    explanation: 'Citrobacter freundii can share some screening features with Salmonella-like organisms. That is why biochemical pattern, serologic workflow, and lab SOP matter before final interpretation.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-065-shigella-classic-profile',
    area: 'analytic-bacteriology',
    topic: 'Shigella identification',
    difficulty: 'beginner',
    tags: ['Shigella', 'nonmotile', 'non-lactose fermenter', 'enterics'],
    prompt: 'A stool isolate is an oxidase-negative gram-negative rod that is nonmotile, does not produce H2S, and is non-lactose fermenting on initial screening. Which pathogen group should remain on the bench differential?',
    choices: [
      'Shigella species.',
      'Proteus species.',
      'Pseudomonas species.',
      'Enterococcus species.'
    ],
    answer: 'Shigella species.',
    explanation: 'Classic Shigella screening patterns include nonmotility, lack of H2S, and absent or delayed lactose fermentation. Final identification requires the full biochemical and serologic workflow.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-066-shigella-sonnei-late-lactose',
    area: 'analytic-bacteriology',
    topic: 'Shigella identification',
    difficulty: 'advanced',
    tags: ['Shigella sonnei', 'ONPG', 'late lactose', 'enterics'],
    prompt: 'A suspected Shigella isolate gives a delayed lactose-related reaction. What is the best bench interpretation?',
    choices: [
      'Delayed lactose activity does not automatically rule out Shigella, especially Shigella sonnei.',
      'Any lactose-related activity proves the isolate is normal fecal flora.',
      'Delayed lactose activity confirms Proteus mirabilis.',
      'Shigella species are always rapid lactose fermenters within the first reading period.'
    ],
    answer: 'Delayed lactose activity does not automatically rule out Shigella, especially Shigella sonnei.',
    explanation: 'Some Shigella patterns are not perfectly textbook negative on every lactose-related test. A learner should use the full organism pattern instead of excluding Shigella from one delayed reaction.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-067-salmonella-serotyping-workflow',
    area: 'analytic-bacteriology',
    topic: 'Salmonella identification',
    difficulty: 'intermediate',
    tags: ['Salmonella', 'serotyping', 'H2S', 'enterics'],
    prompt: 'A stool isolate has a Salmonella-like biochemical pattern. What is the safest next concept in the bench workflow?',
    choices: [
      'Use the laboratory confirmation pathway, which may include serologic grouping or referral according to SOP.',
      'Report Salmonella based only on blackening in a screening tube.',
      'Discard the isolate because all H2S producers are normal fecal flora.',
      'Convert the isolate to a viral transport workflow.'
    ],
    answer: 'Use the laboratory confirmation pathway, which may include serologic grouping or referral according to SOP.',
    explanation: 'A Salmonella-like pattern should trigger confirmation steps. H2S and non-lactose fermentation are useful clues, but they are not enough for a final public-health-relevant organism call.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-068-salmonella-antigen-logic',
    area: 'analytic-bacteriology',
    topic: 'Salmonella serology',
    difficulty: 'advanced',
    tags: ['Salmonella', 'O antigen', 'H antigen', 'Vi antigen', 'serotyping'],
    prompt: 'In a Salmonella serotyping workflow, what do O and H antigen reactions generally represent?',
    choices: [
      'Somatic cell-wall antigen and flagellar antigen patterns used for grouping or serotype workup.',
      'Beta-lactamase and carbapenemase enzyme patterns.',
      'Capsule stain color and acid-fast stain color.',
      'Urease and indole reaction intensity.'
    ],
    answer: 'Somatic cell-wall antigen and flagellar antigen patterns used for grouping or serotype workup.',
    explanation: 'Salmonella serology uses antigen patterns to support grouping and serotype-level workup. It sits after the organism has already fit the appropriate biochemical branch.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-069-yersinia-temperature-motility',
    area: 'analytic-bacteriology',
    topic: 'Yersinia identification',
    difficulty: 'advanced',
    tags: ['Yersinia enterocolitica', 'motility', 'temperature', 'enterics'],
    prompt: 'A suspected Yersinia enterocolitica isolate is being checked for motility. Which teaching point is most useful?',
    choices: [
      'Motility may be seen at room temperature but not at typical body-temperature incubation.',
      'Yersinia is always strongly motile at 37C and never motile at room temperature.',
      'Yersinia motility is read by coagulase testing.',
      'Motility is irrelevant because all enteric gram-negative rods are nonmotile.'
    ],
    answer: 'Motility may be seen at room temperature but not at typical body-temperature incubation.',
    explanation: 'Yersinia enterocolitica has temperature-dependent motility that can help the workup when the organism is suspected. The result should be interpreted with colony pattern and biochemical reactions.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-070-serratia-pigment-dnase',
    area: 'analytic-bacteriology',
    topic: 'Serratia identification',
    difficulty: 'intermediate',
    tags: ['Serratia marcescens', 'pigment', 'DNase', 'enterics'],
    prompt: 'A lactose-negative to late-lactose enteric isolate develops red pigment on room-temperature subculture and is DNase positive. Which organism is most consistent with that pattern?',
    choices: [
      'Serratia marcescens.',
      'Shigella dysenteriae.',
      'Klebsiella pneumoniae.',
      'Escherichia coli.'
    ],
    answer: 'Serratia marcescens.',
    explanation: 'Serratia marcescens can produce a red pigment under some conditions and is often DNase positive. Pigment is a clue, but final identification still depends on the complete workup.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-071-proteus-species-indole',
    area: 'analytic-bacteriology',
    topic: 'Proteus identification',
    difficulty: 'advanced',
    tags: ['Proteus mirabilis', 'Proteus vulgaris', 'indole', 'enterics'],
    prompt: 'Two Proteus-like isolates swarm on blood agar. Which result is commonly used to help separate Proteus vulgaris from Proteus mirabilis?',
    choices: [
      'Proteus vulgaris is commonly indole positive, while Proteus mirabilis is commonly indole negative.',
      'Proteus vulgaris is oxidase positive, while Proteus mirabilis is acid-fast.',
      'Proteus vulgaris is coagulase positive, while Proteus mirabilis is catalase negative.',
      'Proteus vulgaris never produces urease, while Proteus mirabilis never swarms.'
    ],
    answer: 'Proteus vulgaris is commonly indole positive, while Proteus mirabilis is commonly indole negative.',
    explanation: 'Indole is a useful separator within Proteus-like isolates. The bench still checks the whole pattern because single-test shortcuts can mislead.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-072-morganella-providencia-branch',
    area: 'analytic-bacteriology',
    topic: 'Morganella and Providencia identification',
    difficulty: 'advanced',
    tags: ['Morganella', 'Providencia', 'phenylalanine deaminase', 'enterics'],
    prompt: 'A non-lactose fermenting enteric isolate is phenylalanine deaminase positive but does not show classic Proteus swarming. Which branch should stay in consideration?',
    choices: [
      'Morganella or Providencia.',
      'Klebsiella or Enterobacter only.',
      'Neisseria or Moraxella only.',
      'Streptococcus or Enterococcus.'
    ],
    answer: 'Morganella or Providencia.',
    explanation: 'Phenylalanine deaminase positivity is not limited to Proteus. Morganella and Providencia belong in the same broad branch and need additional tests for separation.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-073-esbl-enterobacterales-concept',
    area: 'analytic-bacteriology',
    topic: 'Enterobacterales resistance mechanisms',
    difficulty: 'advanced',
    tags: ['ESBL', 'Enterobacterales', 'antimicrobial susceptibility', 'beta-lactamase'],
    prompt: 'A learner sees possible ESBL in an Enterobacterales susceptibility workflow. What is the best educational meaning of that flag?',
    choices: [
      'The organism may produce a beta-lactamase that affects expanded-spectrum beta-lactam interpretation and requires lab-specific confirmation or reporting rules.',
      'The organism is confirmed as Salmonella based on serology alone.',
      'The organism is unable to ferment glucose.',
      'The organism must be an anaerobe and should be moved to anaerobic culture only.'
    ],
    answer: 'The organism may produce a beta-lactamase that affects expanded-spectrum beta-lactam interpretation and requires lab-specific confirmation or reporting rules.',
    explanation: 'ESBL is a resistance-mechanism concept, not an organism name. Learners should connect the flag to the lab\'s AST algorithm and reporting standards rather than guessing from colony appearance.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-074-ampc-enterobacterales-caution',
    area: 'analytic-bacteriology',
    topic: 'Enterobacterales resistance mechanisms',
    difficulty: 'advanced',
    tags: ['AmpC', 'Enterobacter cloacae complex', 'Citrobacter freundii', 'Serratia marcescens', 'AST'],
    prompt: 'Why do organisms such as Enterobacter cloacae complex, Citrobacter freundii, and Serratia marcescens require careful beta-lactam result interpretation in many AST workflows?',
    choices: [
      'Some members can have inducible AmpC-type beta-lactamase behavior, so species context and lab reporting rules matter.',
      'They are always gram-positive cocci and should be interpreted with staphylococcal rules.',
      'They cannot grow in routine aerobic culture.',
      'They are identified only by acid-fast staining.'
    ],
    answer: 'Some members can have inducible AmpC-type beta-lactamase behavior, so species context and lab reporting rules matter.',
    explanation: 'Certain Enterobacterales have resistance mechanisms that make AST interpretation more than a simple species-name lookup. The safe bench habit is to follow current lab rules and organism-specific AST guidance.',
    source: 'Learn Microbes original question bank: Enterics and Enterobacterales',
    status: 'draft'
  },
  {
    id: 'bacteriology-075-nonfermenter-core-branch',
    area: 'analytic-bacteriology',
    topic: 'Nonfermentative gram-negative bacilli',
    difficulty: 'beginner',
    tags: ['nonfermenters', 'gram-negative rods', 'oxidase', 'bench workflow'],
    prompt: 'A gram-negative rod grows on blood agar and MacConkey agar but does not ferment lactose. Which early clue would push the bench workflow toward a nonfermenter instead of a typical Enterobacterales workup?',
    choices: [
      'An oxidase-positive result or an oxidative-only glucose pattern.',
      'A coagulase-positive result from the colony.',
      'A beta-hemolytic gram-positive coccus on Gram stain.',
      'A positive acid-fast stain from the colony.'
    ],
    answer: 'An oxidase-positive result or an oxidative-only glucose pattern.',
    explanation: 'Nonfermenters are often separated from Enterobacterales by oxidase testing and oxidative-fermentative carbohydrate patterns. The early goal is to choose the right identification branch.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'published'
  },
  {
    id: 'bacteriology-076-of-glucose-oxidative-pattern',
    area: 'analytic-bacteriology',
    topic: 'Oxidative-fermentative testing',
    difficulty: 'intermediate',
    tags: ['OF glucose', 'nonfermenters', 'oxidative metabolism', 'bench tests'],
    prompt: 'In an OF glucose setup, acid develops only in the open tube and not in the sealed tube. What does this pattern suggest?',
    choices: [
      'The organism uses glucose oxidatively rather than fermentatively.',
      'The organism ferments glucose under anaerobic conditions only.',
      'The organism is unable to use oxygen.',
      'The organism is confirmed as a gram-positive anaerobe.'
    ],
    answer: 'The organism uses glucose oxidatively rather than fermentatively.',
    explanation: 'Oxidative organisms need oxygen to produce acid from carbohydrate use, so the open tube changes first. This helps separate nonfermenters from true fermenters.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-077-tsi-kia-nonfermenter-pattern',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter screening reactions',
    difficulty: 'beginner',
    tags: ['TSI', 'KIA', 'nonfermenters', 'gram-negative rods'],
    prompt: 'A gram-negative rod gives little or no acid reaction on a TSI or KIA tube. Why does that matter in the bench workflow?',
    choices: [
      'It supports considering a nonfermenter branch when combined with colony appearance and other screening tests.',
      'It confirms Salmonella without further workup.',
      'It proves the organism is a yeast.',
      'It means the Gram stain result can be ignored.'
    ],
    answer: 'It supports considering a nonfermenter branch when combined with colony appearance and other screening tests.',
    explanation: 'Nonfermenters may show minimal carbohydrate fermentation on TSI or KIA. This is a branch clue, not a final identification.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-078-oxidase-nonfermenter-caution',
    area: 'analytic-bacteriology',
    topic: 'Oxidase testing',
    difficulty: 'intermediate',
    tags: ['oxidase', 'nonfermenters', 'Acinetobacter', 'Stenotrophomonas'],
    prompt: 'A learner says, "All nonfermenters are oxidase positive." What is the best correction?',
    choices: [
      'Many are oxidase positive, but important nonfermenters such as Acinetobacter and Stenotrophomonas are oxidase negative.',
      'All nonfermenters are oxidase negative by definition.',
      'Oxidase is used only for gram-positive cocci.',
      'Oxidase positivity confirms Pseudomonas aeruginosa every time.'
    ],
    answer: 'Many are oxidase positive, but important nonfermenters such as Acinetobacter and Stenotrophomonas are oxidase negative.',
    explanation: 'Oxidase is helpful, but it is not a one-test answer. Nonfermenter identification depends on a pattern that includes oxidase, motility, pigment, growth conditions, and biochemical reactions.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-079-acinetobacter-coccobacillus-branch',
    area: 'analytic-bacteriology',
    topic: 'Acinetobacter identification',
    difficulty: 'beginner',
    tags: ['Acinetobacter', 'coccobacilli', 'oxidase negative', 'nonfermenters'],
    prompt: 'A blood culture subculture shows small gram-negative coccobacilli that are oxidase negative and nonmotile. Which nonfermenter group should move higher in the bench differential?',
    choices: [
      'Acinetobacter species.',
      'Pseudomonas aeruginosa.',
      'Vibrio cholerae.',
      'Neisseria gonorrhoeae.'
    ],
    answer: 'Acinetobacter species.',
    explanation: 'Acinetobacter often appears as gram-negative coccobacilli, is oxidase negative, and is nonmotile. Those early clues help keep it separate from oxidase-positive nonfermenters.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-080-pseudomonas-aeruginosa-pigment',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas aeruginosa identification',
    difficulty: 'beginner',
    tags: ['Pseudomonas aeruginosa', 'pyocyanin', 'pigment', 'nonfermenters'],
    prompt: 'A nonfermenting gram-negative rod is oxidase positive and produces a blue-green pigment on routine media. Which organism is the best fit?',
    choices: [
      'Pseudomonas aeruginosa.',
      'Acinetobacter baumannii complex.',
      'Stenotrophomonas maltophilia.',
      'Escherichia coli.'
    ],
    answer: 'Pseudomonas aeruginosa.',
    explanation: 'Pseudomonas aeruginosa is a classic oxidase-positive nonfermenter associated with blue-green pigment production. The pigment is a strong clue, but the full workup still matters.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-081-pseudomonas-aeruginosa-forty-two',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas aeruginosa identification',
    difficulty: 'intermediate',
    tags: ['Pseudomonas aeruginosa', '42C growth', 'nonfermenters', 'identification'],
    prompt: 'A Pseudomonas-like isolate grows at 42C, is oxidase positive, and reduces nitrate. Which teaching point best fits this pattern?',
    choices: [
      'Growth at 42C supports Pseudomonas aeruginosa when the rest of the pattern fits.',
      'Growth at 42C confirms Acinetobacter baumannii complex.',
      'Growth at 42C rules out all nonfermenters.',
      'Growth at 42C proves the isolate is an Enterobacterales organism.'
    ],
    answer: 'Growth at 42C supports Pseudomonas aeruginosa when the rest of the pattern fits.',
    explanation: 'Growth at 42C is a useful support clue for P. aeruginosa. It should be read with oxidase, pigment, nitrate, colony morphology, and the lab\'s identification system.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-082-cetrimide-pseudomonas-aeruginosa',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas selective media',
    difficulty: 'intermediate',
    tags: ['cetrimide agar', 'Pseudomonas aeruginosa', 'selective media', 'pigment'],
    prompt: 'Why might a lab use cetrimide agar when Pseudomonas aeruginosa is suspected?',
    choices: [
      'It inhibits many competing organisms and can enhance pigment expression by P. aeruginosa.',
      'It is the primary medium for acid-fast bacilli.',
      'It is used to confirm coagulase production.',
      'It makes all nonfermenters lactose positive.'
    ],
    answer: 'It inhibits many competing organisms and can enhance pigment expression by P. aeruginosa.',
    explanation: 'Cetrimide agar is useful as a selective medium for P. aeruginosa. It supports recovery and pigment-based recognition when interpreted in the full bench workflow.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-083-pseudomonas-cf-mucoid-alginate',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas aeruginosa colony morphology',
    difficulty: 'intermediate',
    tags: ['Pseudomonas aeruginosa', 'cystic fibrosis', 'mucoid colony', 'alginate'],
    prompt: 'A respiratory culture from a patient with chronic lung disease grows a mucoid Pseudomonas aeruginosa. What does the mucoid appearance usually reflect?',
    choices: [
      'Alginate production that supports a biofilm-like growth pattern.',
      'Endospore formation by the organism.',
      'Conversion into a yeast form.',
      'Loss of all gram-negative cell wall structure.'
    ],
    answer: 'Alginate production that supports a biofilm-like growth pattern.',
    explanation: 'Mucoid P. aeruginosa is associated with alginate production, especially in chronic airway settings. For learners, the bench clue is colony texture plus organism pattern, not diagnosis from morphology alone.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-084-pseudomonas-fluorescens-clue',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas species differentiation',
    difficulty: 'advanced',
    tags: ['Pseudomonas fluorescens', 'fluorescent pigment', 'Pseudomonas', 'nonfermenters'],
    prompt: 'A Pseudomonas-like isolate produces fluorescent pigment but does not show the classic blue-green pyocyanin pattern of P. aeruginosa. Which interpretation is most appropriate?',
    choices: [
      'Consider a fluorescent Pseudomonas species and continue the species-level workup.',
      'Report P. aeruginosa based on fluorescence alone.',
      'Rule out Pseudomonas because fluorescence is never seen in the genus.',
      'Move the isolate to an acid-fast bacilli workflow.'
    ],
    answer: 'Consider a fluorescent Pseudomonas species and continue the species-level workup.',
    explanation: 'Fluorescent pigment can occur in more than one Pseudomonas species. It is useful for branching, but species identification needs the complete reaction pattern.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-085-pseudomonas-stutzeri-wrinkled',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas species differentiation',
    difficulty: 'advanced',
    tags: ['Pseudomonas stutzeri', 'wrinkled colonies', 'nitrate', 'nonfermenters'],
    prompt: 'A nonfermenting gram-negative rod has rough, wrinkled colonies and a Pseudomonas-like biochemical pattern. Which organism should be considered in the differential?',
    choices: [
      'Pseudomonas stutzeri.',
      'Streptococcus pyogenes.',
      'Candida albicans.',
      'Clostridioides difficile.'
    ],
    answer: 'Pseudomonas stutzeri.',
    explanation: 'Pseudomonas stutzeri may show dry or wrinkled colony morphology. Colony texture can help guide the workup when paired with oxidase, nitrate, motility, and other reactions.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-086-stenotrophomonas-maltophilia-pattern',
    area: 'analytic-bacteriology',
    topic: 'Stenotrophomonas identification',
    difficulty: 'intermediate',
    tags: ['Stenotrophomonas maltophilia', 'oxidase negative', 'maltose', 'nonfermenters'],
    prompt: 'A nonfermenting gram-negative rod is oxidase negative and shows a maltose-positive pattern. Which organism should stay in the learner\'s differential?',
    choices: [
      'Stenotrophomonas maltophilia.',
      'Pseudomonas aeruginosa.',
      'Vibrio parahaemolyticus.',
      'Salmonella enterica.'
    ],
    answer: 'Stenotrophomonas maltophilia.',
    explanation: 'Stenotrophomonas maltophilia is an important oxidase-negative nonfermenter. Maltose use and other biochemical features help separate it from Pseudomonas-like organisms.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-087-stenotrophomonas-not-pseudomonas',
    area: 'analytic-bacteriology',
    topic: 'Stenotrophomonas identification',
    difficulty: 'advanced',
    tags: ['Stenotrophomonas maltophilia', 'Pseudomonas', 'oxidase', 'AST'],
    prompt: 'Why should Stenotrophomonas maltophilia not be treated as just another Pseudomonas-like isolate in the bench workflow?',
    choices: [
      'It has a different biochemical pattern and important antimicrobial susceptibility interpretation considerations.',
      'It is a gram-positive coccus that forms chains.',
      'It is always acid-fast and must be incubated for weeks.',
      'It is identified only by coagulase testing.'
    ],
    answer: 'It has a different biochemical pattern and important antimicrobial susceptibility interpretation considerations.',
    explanation: 'Stenotrophomonas is a distinct nonfermenter with its own identification and AST considerations. The bench should follow organism-specific rules instead of assuming it behaves like P. aeruginosa.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-088-burkholderia-cepacia-cf',
    area: 'analytic-bacteriology',
    topic: 'Burkholderia cepacia complex identification',
    difficulty: 'intermediate',
    tags: ['Burkholderia cepacia complex', 'cystic fibrosis', 'nonfermenters', 'selective media'],
    prompt: 'A respiratory culture from a cystic fibrosis workup requires targeted recovery of Burkholderia cepacia complex. Which bench principle is most important?',
    choices: [
      'Use the laboratory\'s selective media or targeted workflow because routine plates may not be enough.',
      'Use only chocolate agar because Burkholderia cannot grow on any other medium.',
      'Use acid-fast culture only because Burkholderia is acid-fast.',
      'Skip identification because all nonfermenters from respiratory specimens are contaminants.'
    ],
    answer: 'Use the laboratory\'s selective media or targeted workflow because routine plates may not be enough.',
    explanation: 'Burkholderia cepacia complex can require targeted recovery and careful identification, especially in cystic fibrosis respiratory workflows. The safest habit is to follow the lab\'s specific culture protocol.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-089-burkholderia-pseudomallei-safety',
    area: 'analytic-bacteriology',
    topic: 'Burkholderia pseudomallei recognition',
    difficulty: 'advanced',
    tags: ['Burkholderia pseudomallei', 'melioidosis', 'lab safety', 'nonfermenters'],
    prompt: 'A nonfermenting gram-negative rod from a patient with relevant travel history has wrinkled colonies and a Burkholderia-like pattern. Why should the bench pause before doing extra open-bench manipulation?',
    choices: [
      'Some Burkholderia species are significant laboratory safety concerns and should be handled according to the lab\'s escalation protocol.',
      'All Burkholderia species are harmless water contaminants.',
      'Wrinkled colonies prove the organism is a yeast.',
      'Travel history means the culture no longer needs identification.'
    ],
    answer: 'Some Burkholderia species are significant laboratory safety concerns and should be handled according to the lab\'s escalation protocol.',
    explanation: 'Certain Burkholderia species, including B. pseudomallei, require careful laboratory handling. Bench learners should know when an unusual nonfermenter pattern needs escalation instead of extra manipulation.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-090-burkholderia-mallei-nonmotile',
    area: 'analytic-bacteriology',
    topic: 'Burkholderia species differentiation',
    difficulty: 'advanced',
    tags: ['Burkholderia mallei', 'Burkholderia pseudomallei', 'motility', 'nonfermenters'],
    prompt: 'Two Burkholderia-like organisms are being compared in a teaching workflow. Which result supports Burkholderia mallei over Burkholderia pseudomallei?',
    choices: [
      'Nonmotility.',
      'Strong lactose fermentation.',
      'Coagulase production.',
      'Acid-fast staining.'
    ],
    answer: 'Nonmotility.',
    explanation: 'Burkholderia mallei is classically nonmotile, while B. pseudomallei is motile. This is an advanced differentiation clue and should be interpreted within safety-aware laboratory protocols.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-091-chryseobacterium-yellow-indole',
    area: 'analytic-bacteriology',
    topic: 'Chryseobacterium identification',
    difficulty: 'advanced',
    tags: ['Chryseobacterium', 'yellow pigment', 'indole', 'oxidase'],
    prompt: 'A nonfermenting gram-negative rod produces yellow pigment, is oxidase positive, and is indole positive. Which organism group should be considered?',
    choices: [
      'Chryseobacterium species.',
      'Acinetobacter baumannii complex.',
      'Proteus mirabilis.',
      'Shigella species.'
    ],
    answer: 'Chryseobacterium species.',
    explanation: 'Yellow pigment with oxidase and indole positivity can point toward Chryseobacterium-like organisms. This is a pattern-recognition clue, not a one-test final identification.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-092-motility-acinetobacter-separator',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter motility testing',
    difficulty: 'intermediate',
    tags: ['motility', 'Acinetobacter', 'Alcaligenes', 'Bordetella'],
    prompt: 'A learner is comparing Acinetobacter with other oxidase-variable or oxidase-positive nonfermenters. Why is motility useful?',
    choices: [
      'Acinetobacter is nonmotile, while several similar nonfermenters are motile.',
      'Motility confirms lactose fermentation.',
      'Motility replaces oxidase testing for all gram-negative rods.',
      'Motility proves the isolate is a spore-forming anaerobe.'
    ],
    answer: 'Acinetobacter is nonmotile, while several similar nonfermenters are motile.',
    explanation: 'Motility is a simple but useful separator in nonfermenter workups. Acinetobacter nonmotility helps distinguish it from organisms such as Alcaligenes-like or Bordetella-like nonfermenters.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-093-nitrate-reduction-zinc-control',
    area: 'analytic-bacteriology',
    topic: 'Nitrate reduction testing',
    difficulty: 'advanced',
    tags: ['nitrate reduction', 'zinc', 'nonfermenters', 'bench tests'],
    prompt: 'In a nitrate reduction test, no red color appears after nitrate reagents are added. Zinc is then added and the tube turns red. What does that final red color mean?',
    choices: [
      'Nitrate was still present, so the organism did not reduce nitrate.',
      'The organism reduced nitrate completely to nitrogen gas.',
      'The organism is automatically Pseudomonas aeruginosa.',
      'The test is positive for indole production.'
    ],
    answer: 'Nitrate was still present, so the organism did not reduce nitrate.',
    explanation: 'Zinc reduces remaining nitrate to nitrite, causing red color in a true negative nitrate test. If no color appears even after zinc, nitrate may have been reduced beyond nitrite.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-094-macconkey-nonfermenter-context',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter colony interpretation',
    difficulty: 'beginner',
    tags: ['MacConkey agar', 'nonfermenters', 'lactose negative', 'colony morphology'],
    prompt: 'A colony on MacConkey agar is pale and lactose negative. Why should the bench avoid jumping straight to Shigella or Salmonella?',
    choices: [
      'Nonfermenters can also appear lactose negative, so oxidase, OF glucose, and full bench context are needed.',
      'Pale colonies on MacConkey always indicate yeast.',
      'MacConkey agar prevents all nonfermenters from growing.',
      'Lactose-negative colonies are never clinically relevant.'
    ],
    answer: 'Nonfermenters can also appear lactose negative, so oxidase, OF glucose, and full bench context are needed.',
    explanation: 'Lactose-negative growth is a broad clue. Enteric pathogens and nonfermenters can both be pale on MacConkey, so the next branch depends on screening tests and specimen context.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-095-achromobacter-cf-branch',
    area: 'analytic-bacteriology',
    topic: 'Achromobacter identification',
    difficulty: 'advanced',
    tags: ['Achromobacter xylosoxidans', 'cystic fibrosis', 'oxidase', 'nonfermenters'],
    prompt: 'A respiratory isolate from a chronic airway culture is an oxidase-positive, motile nonfermenting gram-negative rod that does not fit classic Pseudomonas aeruginosa. Which organism group may belong in the expanded differential?',
    choices: [
      'Achromobacter species.',
      'Listeria monocytogenes.',
      'Streptococcus pneumoniae.',
      'Candida glabrata.'
    ],
    answer: 'Achromobacter species.',
    explanation: 'Achromobacter species can appear in chronic respiratory culture workflows and may overlap with other nonfermenter screening patterns. The bench should follow the complete ID workflow rather than forcing every oxidase-positive nonfermenter into P. aeruginosa.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-096-nonfermenter-water-environment',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter ecology and significance',
    difficulty: 'beginner',
    tags: ['nonfermenters', 'water sources', 'opportunistic organisms', 'bench interpretation'],
    prompt: 'Why are nonfermenting gram-negative rods often discussed in connection with water, devices, wounds, and hospital environments?',
    choices: [
      'Many are environmental opportunists that can persist in moist settings and become important in the right specimen context.',
      'They are all strict anaerobes that die in water.',
      'They are all normal throat flora with no laboratory significance.',
      'They cannot survive outside the human intestine.'
    ],
    answer: 'Many are environmental opportunists that can persist in moist settings and become important in the right specimen context.',
    explanation: 'Nonfermenters often live in environmental or moist reservoirs. Their significance depends on source, quantity, patient context, culture purity, and lab workup rules.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-097-nonfermenter-ast-caution',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter antimicrobial susceptibility',
    difficulty: 'advanced',
    tags: ['nonfermenters', 'AST', 'resistance', 'Pseudomonas', 'Acinetobacter'],
    prompt: 'Why should antimicrobial susceptibility interpretation for nonfermenters be handled carefully instead of assumed from the organism name alone?',
    choices: [
      'Nonfermenters often have important intrinsic or acquired resistance patterns and require organism-specific AST rules.',
      'Nonfermenters never require susceptibility testing.',
      'All nonfermenters have the same predictable susceptibility pattern.',
      'AST results are based only on colony color.'
    ],
    answer: 'Nonfermenters often have important intrinsic or acquired resistance patterns and require organism-specific AST rules.',
    explanation: 'Nonfermenters such as Pseudomonas, Acinetobacter, Stenotrophomonas, and Burkholderia can have complex AST considerations. The safe bench habit is to follow current laboratory and organism-specific guidance.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-098-nonfermenter-full-pattern',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter identification workflow',
    difficulty: 'intermediate',
    tags: ['nonfermenters', 'pattern recognition', 'bench workflow', 'identification'],
    prompt: 'Which approach best matches Learn Microbes bench-first identification of a nonfermenting gram-negative rod?',
    choices: [
      'Combine source, Gram stain, colony appearance, MacConkey reaction, oxidase, OF glucose, motility, pigment, and key biochemical tests.',
      'Identify the organism from colony color alone.',
      'Skip Gram stain because nonfermenters all look identical.',
      'Report every nonfermenter as Pseudomonas aeruginosa.'
    ],
    answer: 'Combine source, Gram stain, colony appearance, MacConkey reaction, oxidase, OF glucose, motility, pigment, and key biochemical tests.',
    explanation: 'Nonfermenter identification is pattern-based. Each clue narrows the branch, but the safest answer comes from matching the full workflow rather than relying on a single feature.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-099-pseudomonas-virulence-exotoxin-alginate',
    area: 'analytic-bacteriology',
    topic: 'Pseudomonas aeruginosa virulence concepts',
    difficulty: 'advanced',
    tags: ['Pseudomonas aeruginosa', 'virulence', 'alginate', 'exotoxin A'],
    prompt: 'Which pair of features is commonly associated with Pseudomonas aeruginosa pathogenic potential in teaching workflows?',
    choices: [
      'Alginate-associated biofilm behavior and toxin/enzyme production.',
      'Coagulase production and spore formation.',
      'Acid-fast cell wall and obligate intracellular growth.',
      'Urease-only identification and capsule swelling reaction.'
    ],
    answer: 'Alginate-associated biofilm behavior and toxin/enzyme production.',
    explanation: 'P. aeruginosa has several virulence-associated features, including biofilm-related alginate production in some settings and toxin or enzyme production. These are educational concepts, not standalone diagnostic claims.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-100-nonfermenter-safety-pause',
    area: 'analytic-bacteriology',
    topic: 'Nonfermenter safety workflow',
    difficulty: 'advanced',
    tags: ['nonfermenters', 'lab safety', 'Burkholderia', 'unusual isolate'],
    prompt: 'An unusual nonfermenting gram-negative rod has an uncommon colony pattern and epidemiologic details that do not fit routine bench isolates. What is the best learner-safe next step?',
    choices: [
      'Stop extra open-bench work and follow the laboratory escalation or identification safety protocol.',
      'Sniff the plate to check for odor before deciding.',
      'Perform every manual test available before notifying anyone.',
      'Discard the isolate because unusual nonfermenters are never important.'
    ],
    answer: 'Stop extra open-bench work and follow the laboratory escalation or identification safety protocol.',
    explanation: 'Some unusual nonfermenters require safety-aware handling. The bench-first habit is not just "do more tests." It is knowing when to pause, protect staff, and follow escalation procedures.',
    source: 'Learn Microbes original question bank: Nonfermentative Bacilli',
    status: 'draft'
  },
  {
    id: 'bacteriology-101-vibrio-tcbs-sucrose',
    area: 'analytic-bacteriology',
    topic: 'Vibrio identification',
    difficulty: 'beginner',
    tags: ['Vibrio', 'TCBS', 'sucrose', 'oxidase-positive gram-negative rods'],
    prompt: 'A curved gram-negative rod from stool is oxidase positive and grows on TCBS agar. Why is colony color on TCBS useful in the Vibrio workflow?',
    choices: [
      'It helps screen sucrose fermentation patterns among Vibrio species.',
      'It confirms acid-fast staining behavior.',
      'It separates coagulase-positive from coagulase-negative organisms.',
      'It proves the isolate is a lactose-fermenting Enterobacterales organism.'
    ],
    answer: 'It helps screen sucrose fermentation patterns among Vibrio species.',
    explanation: 'TCBS agar is selective and differential for Vibrio recovery. Sucrose fermentation can guide the early branch, but final identification still requires the full bench workflow.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-102-vibrio-marine-salt-context',
    area: 'analytic-bacteriology',
    topic: 'Vibrio identification',
    difficulty: 'intermediate',
    tags: ['Vibrio', 'marine exposure', 'halophilic', 'specimen context'],
    prompt: 'A wound culture follows seawater exposure and grows a curved oxidase-positive gram-negative rod. Which bench concept should move Vibrio higher in the differential?',
    choices: [
      'Some Vibrio species are associated with marine or brackish water exposure and may need salt-aware recovery conditions.',
      'Vibrio species are strict anaerobes recovered only from deep tissue in anaerobic transport.',
      'Vibrio species are gram-positive cocci that require bile esculin agar.',
      'Vibrio species are acid-fast rods that require mycobacterial media.'
    ],
    answer: 'Some Vibrio species are associated with marine or brackish water exposure and may need salt-aware recovery conditions.',
    explanation: 'Specimen source matters. Marine exposure plus a curved oxidase-positive gram-negative rod should trigger a Vibrio-aware branch instead of a routine Enterobacterales-only mindset.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-103-campylobacter-microaerophilic-setup',
    area: 'analytic-bacteriology',
    topic: 'Campylobacter recovery',
    difficulty: 'beginner',
    tags: ['Campylobacter', 'microaerophilic', 'stool culture', 'curved gram-negative rods'],
    prompt: 'A stool workup includes recovery for Campylobacter. Which culture condition best matches the organism\'s usual recovery needs?',
    choices: [
      'Selective medium incubated in a microaerophilic atmosphere.',
      'Routine blood agar incubated in ambient air only.',
      'Lowenstein-Jensen medium incubated for several weeks.',
      'Sabouraud agar incubated at room temperature.'
    ],
    answer: 'Selective medium incubated in a microaerophilic atmosphere.',
    explanation: 'Campylobacter recovery depends on the right atmosphere and media. Routine aerobic enteric plates alone may miss the organism.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-104-campylobacter-jejuni-hippurate',
    area: 'analytic-bacteriology',
    topic: 'Campylobacter identification',
    difficulty: 'intermediate',
    tags: ['Campylobacter jejuni', 'hippurate', 'Campylobacter coli', 'bench tests'],
    prompt: 'Two Campylobacter-like isolates have similar curved morphology and microaerophilic growth. Which result commonly supports Campylobacter jejuni over Campylobacter coli in a teaching workflow?',
    choices: [
      'Positive hippurate hydrolysis.',
      'Positive coagulase production.',
      'Acid-fast staining.',
      'Growth only on MacConkey agar in ambient air.'
    ],
    answer: 'Positive hippurate hydrolysis.',
    explanation: 'Hippurate hydrolysis is a classic teaching clue for C. jejuni. It should be interpreted with the full identification workflow and current lab method.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-105-helicobacter-pylori-urease',
    area: 'analytic-bacteriology',
    topic: 'Helicobacter pylori identification',
    difficulty: 'beginner',
    tags: ['Helicobacter pylori', 'urease', 'gastric biopsy', 'microaerophilic'],
    prompt: 'A gastric biopsy workup is looking for Helicobacter pylori. Which organism feature is especially useful in rapid screening workflows?',
    choices: [
      'Strong urease activity.',
      'Coagulase production.',
      'Acid-fast staining.',
      'Growth as a lactose fermenter on MacConkey agar.'
    ],
    answer: 'Strong urease activity.',
    explanation: 'H. pylori is strongly urease positive. The bench concept is to match the organism\'s gastric niche and enzyme pattern to the correct testing workflow.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-106-aeromonas-oxidase-enteric-separator',
    area: 'analytic-bacteriology',
    topic: 'Aeromonas identification',
    difficulty: 'intermediate',
    tags: ['Aeromonas', 'oxidase', 'Enterobacterales', 'water exposure'],
    prompt: 'A lactose-negative gram-negative rod from a wound culture grows on MacConkey agar and is oxidase positive. Why should Aeromonas stay in the differential?',
    choices: [
      'Aeromonas can resemble enteric gram-negative rods on media but is oxidase positive.',
      'Aeromonas is a gram-positive coccus that forms chains.',
      'Aeromonas is always acid-fast and slow-growing.',
      'Aeromonas cannot grow on routine aerobic media.'
    ],
    answer: 'Aeromonas can resemble enteric gram-negative rods on media but is oxidase positive.',
    explanation: 'Oxidase positivity is a key branch point. Aeromonas may overlap with enteric-looking gram-negative rods but should not be forced into an Enterobacterales pathway.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-107-plesiomonas-shigella-separator',
    area: 'analytic-bacteriology',
    topic: 'Plesiomonas identification',
    difficulty: 'advanced',
    tags: ['Plesiomonas shigelloides', 'Shigella', 'oxidase', 'motility'],
    prompt: 'A stool isolate has some Shigella-like screening features, but it is oxidase positive and motile. Which organism should be considered?',
    choices: [
      'Plesiomonas shigelloides.',
      'Shigella dysenteriae.',
      'Klebsiella pneumoniae.',
      'Enterococcus faecalis.'
    ],
    answer: 'Plesiomonas shigelloides.',
    explanation: 'Plesiomonas can create confusion in stool workflows because some features overlap with enteric pathogens. Oxidase positivity and motility help move the branch away from classic Shigella.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-108-pasteurella-bite-wound-pattern',
    area: 'analytic-bacteriology',
    topic: 'Pasteurella identification',
    difficulty: 'beginner',
    tags: ['Pasteurella multocida', 'animal bite', 'oxidase', 'MacConkey'],
    prompt: 'A wound culture after animal exposure grows small gram-negative coccobacilli on blood and chocolate agar, but not on MacConkey agar. The isolate is oxidase positive and indole positive. Which organism best fits this teaching pattern?',
    choices: [
      'Pasteurella multocida.',
      'Proteus mirabilis.',
      'Pseudomonas aeruginosa.',
      'Escherichia coli.'
    ],
    answer: 'Pasteurella multocida.',
    explanation: 'Pasteurella multocida is a classic animal-exposure-associated gram-negative coccobacillus. Growth pattern, source, oxidase, indole, and MacConkey reaction help guide the branch.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-109-capnocytophaga-canimorsus-context',
    area: 'analytic-bacteriology',
    topic: 'Capnocytophaga identification',
    difficulty: 'advanced',
    tags: ['Capnocytophaga canimorsus', 'dog exposure', 'capnophilic', 'fastidious gram-negative rods'],
    prompt: 'A slow-growing fusiform gram-negative rod is recovered after dog exposure and grows better with added CO2. Which organism group should stay in the expanded differential?',
    choices: [
      'Capnocytophaga species.',
      'Salmonella species.',
      'Staphylococcus aureus.',
      'Mycobacterium tuberculosis complex.'
    ],
    answer: 'Capnocytophaga species.',
    explanation: 'Capnocytophaga species are fastidious, capnophilic gram-negative rods associated with oral flora and animal exposure contexts. Slow growth means the bench should avoid ruling them out too early.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-110-eikenella-pitting-agar',
    area: 'analytic-bacteriology',
    topic: 'Eikenella identification',
    difficulty: 'intermediate',
    tags: ['Eikenella corrodens', 'HACEK', 'pitting', 'oral flora'],
    prompt: 'A fastidious gram-negative rod from an oral-flora-associated specimen causes pitting in the agar and does not grow well on MacConkey agar. Which organism is the best fit?',
    choices: [
      'Eikenella corrodens.',
      'Vibrio cholerae.',
      'Acinetobacter baumannii complex.',
      'Clostridioides difficile.'
    ],
    answer: 'Eikenella corrodens.',
    explanation: 'Eikenella corrodens is associated with oral flora and can pit the agar. This colony behavior is a helpful clue when paired with Gram stain and biochemical pattern.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-111-kingella-kingae-small-gnr',
    area: 'analytic-bacteriology',
    topic: 'Kingella identification',
    difficulty: 'advanced',
    tags: ['Kingella kingae', 'HACEK', 'small gram-negative rods', 'beta hemolysis'],
    prompt: 'A small gram-negative coccobacillus from a normally sterile-site culture shows beta-hemolytic colonies and oxidase positivity. Which HACEK-associated organism may fit this pattern?',
    choices: [
      'Kingella kingae.',
      'Bacteroides fragilis.',
      'Listeria monocytogenes.',
      'Cryptococcus neoformans.'
    ],
    answer: 'Kingella kingae.',
    explanation: 'Kingella kingae is a fastidious gram-negative coccobacillus that can show beta hemolysis and oxidase positivity. It belongs in the HACEK-associated learning bucket.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-112-hacek-blood-culture-branch',
    area: 'analytic-bacteriology',
    topic: 'HACEK organisms',
    difficulty: 'beginner',
    tags: ['HACEK', 'blood culture', 'fastidious gram-negative rods', 'bench workflow'],
    prompt: 'A blood culture grows small fastidious gram-negative rods after incubation. Why is the HACEK group useful as a learning category?',
    choices: [
      'It reminds learners to consider slow or fastidious gram-negative rods that may need careful identification from sterile-site cultures.',
      'It identifies all lactose-fermenting Enterobacterales.',
      'It refers only to acid-fast bacilli.',
      'It is a group of gram-positive cocci that are coagulase positive.'
    ],
    answer: 'It reminds learners to consider slow or fastidious gram-negative rods that may need careful identification from sterile-site cultures.',
    explanation: 'HACEK is a practical memory bucket for fastidious gram-negative organisms. The bench still uses Gram stain, culture behavior, source, and identification workflow rather than the acronym alone.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-113-hacek-name-update',
    area: 'analytic-bacteriology',
    topic: 'HACEK organisms',
    difficulty: 'advanced',
    tags: ['HACEK', 'Aggregatibacter', 'taxonomy', 'fastidious gram-negative rods'],
    prompt: 'A learner sees older HACEK teaching material that lists Actinobacillus, while newer material uses Aggregatibacter for some organisms. What is the safest study approach?',
    choices: [
      'Recognize that taxonomy changed, but keep the bench concept: fastidious gram-negative rods needing careful identification.',
      'Ignore the organisms because renamed bacteria are no longer clinically relevant.',
      'Report all HACEK organisms as Haemophilus influenzae.',
      'Move all HACEK organisms into the acid-fast bacilli workflow.'
    ],
    answer: 'Recognize that taxonomy changed, but keep the bench concept: fastidious gram-negative rods needing careful identification.',
    explanation: 'Names can change, but the bench pattern still matters. HACEK learning should connect taxonomy awareness with source, growth behavior, and organism-specific ID.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-114-cardiobacterium-pleomorphic',
    area: 'analytic-bacteriology',
    topic: 'Cardiobacterium identification',
    difficulty: 'advanced',
    tags: ['Cardiobacterium hominis', 'HACEK', 'pleomorphic gram-negative rods', 'indole'],
    prompt: 'A slow-growing HACEK-like isolate appears as pleomorphic gram-negative rods with rosette-like arrangements and is indole positive. Which organism should be considered?',
    choices: [
      'Cardiobacterium hominis.',
      'Campylobacter jejuni.',
      'Shigella sonnei.',
      'Bordetella pertussis.'
    ],
    answer: 'Cardiobacterium hominis.',
    explanation: 'Cardiobacterium hominis is a fastidious HACEK organism with pleomorphic morphology. Indole positivity and growth behavior can support the branch during identification.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-115-bordetella-pertussis-collection',
    area: 'analytic-bacteriology',
    topic: 'Bordetella pertussis recovery',
    difficulty: 'beginner',
    tags: ['Bordetella pertussis', 'nasopharyngeal specimen', 'special media', 'fastidious'],
    prompt: 'A provider requests testing for Bordetella pertussis. Which specimen and setup principle is most important for the bench learner?',
    choices: [
      'Use a properly collected nasopharyngeal specimen and the laboratory\'s Bordetella-specific transport or culture workflow.',
      'Use a clean-catch urine specimen on MacConkey agar.',
      'Use a stool specimen on TCBS agar.',
      'Use a throat swab left dry at room temperature overnight.'
    ],
    answer: 'Use a properly collected nasopharyngeal specimen and the laboratory\'s Bordetella-specific transport or culture workflow.',
    explanation: 'Bordetella testing is highly dependent on correct nasopharyngeal collection and the right transport or culture system. Poor collection can undermine even a good test method.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-116-bordetella-pertussis-fastidious-growth',
    area: 'analytic-bacteriology',
    topic: 'Bordetella pertussis recovery',
    difficulty: 'intermediate',
    tags: ['Bordetella pertussis', 'Regan-Lowe', 'Bordet-Gengou', 'fastidious'],
    prompt: 'Why is Bordetella pertussis not worked up like a routine overnight respiratory culture organism?',
    choices: [
      'It is fastidious and may require specialized media and longer incubation.',
      'It is a lactose-fermenting Enterobacterales organism recovered on MacConkey agar.',
      'It is an acid-fast rod that only grows on mycobacterial media.',
      'It is a yeast that requires fungal media only.'
    ],
    answer: 'It is fastidious and may require specialized media and longer incubation.',
    explanation: 'B. pertussis culture requires a targeted workflow. The learner should connect organism biology, specimen type, transport, media, and incubation timing.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-117-brucella-safety-pause',
    area: 'analytic-bacteriology',
    topic: 'Brucella recognition and safety',
    difficulty: 'advanced',
    tags: ['Brucella', 'lab safety', 'slow-growing gram-negative coccobacilli', 'blood culture'],
    prompt: 'A blood culture grows tiny gram-negative coccobacilli slowly, and Brucella is in the differential based on history and colony behavior. What is the learner-safe bench response?',
    choices: [
      'Pause extra open-bench manipulation and follow the laboratory safety escalation protocol.',
      'Sniff the plate to check for a characteristic odor.',
      'Perform every manual biochemical test before notifying anyone.',
      'Assume it is normal skin flora and discard it.'
    ],
    answer: 'Pause extra open-bench manipulation and follow the laboratory safety escalation protocol.',
    explanation: 'Brucella species are important laboratory-acquired infection risks. The safest bench habit is to recognize concerning patterns and escalate according to SOP.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-118-francisella-cysteine-requirement',
    area: 'analytic-bacteriology',
    topic: 'Francisella recovery',
    difficulty: 'advanced',
    tags: ['Francisella tularensis', 'cysteine', 'fastidious gram-negative coccobacilli', 'lab safety'],
    prompt: 'A tiny gram-negative coccobacillus is suspected to be Francisella tularensis. Which culture concept best fits this organism?',
    choices: [
      'It is fastidious and requires cysteine-enriched media or a laboratory-specific recovery workflow.',
      'It grows as a rapid lactose fermenter on MacConkey agar.',
      'It is recovered only on Sabouraud agar as a mold.',
      'It is identified by coagulase production.'
    ],
    answer: 'It is fastidious and requires cysteine-enriched media or a laboratory-specific recovery workflow.',
    explanation: 'Francisella tularensis is fastidious and safety-sensitive. Learners should connect cysteine requirement, tiny coccobacillary morphology, and escalation protocols.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-119-francisella-safety-aware-workflow',
    area: 'analytic-bacteriology',
    topic: 'Francisella recognition and safety',
    difficulty: 'advanced',
    tags: ['Francisella tularensis', 'lab safety', 'fastidious organisms', 'biothreat awareness'],
    prompt: 'Why should an unusual tiny gram-negative coccobacillus with Francisella-like features trigger a safety-aware workflow?',
    choices: [
      'Francisella can pose a laboratory safety risk and should not be over-manipulated on the open bench.',
      'Francisella is always a harmless contaminant.',
      'Francisella is a gram-positive coccus that requires coagulase testing.',
      'Francisella is ruled out if the colony is small.'
    ],
    answer: 'Francisella can pose a laboratory safety risk and should not be over-manipulated on the open bench.',
    explanation: 'Some fastidious gram-negative coccobacilli are not just ID puzzles. They require safe handling, limited manipulation, and escalation under the lab protocol.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-120-legionella-bcye-medium',
    area: 'analytic-bacteriology',
    topic: 'Legionella recovery',
    difficulty: 'beginner',
    tags: ['Legionella pneumophila', 'BCYE', 'cysteine', 'fastidious'],
    prompt: 'A respiratory specimen is being cultured for possible Legionella. Which medium concept is most appropriate?',
    choices: [
      'Buffered charcoal yeast extract agar with required growth supplements.',
      'MacConkey agar only.',
      'Bile esculin agar only.',
      'Lowenstein-Jensen medium only.'
    ],
    answer: 'Buffered charcoal yeast extract agar with required growth supplements.',
    explanation: 'Legionella requires specialized media such as BCYE. Routine blood or MacConkey agar is not the correct primary recovery strategy.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-121-legionella-poor-gram-stain',
    area: 'analytic-bacteriology',
    topic: 'Legionella recognition',
    difficulty: 'intermediate',
    tags: ['Legionella pneumophila', 'Gram stain', 'BCYE', 'fastidious gram-negative rods'],
    prompt: 'Why can Legionella be missed if a learner relies only on routine Gram stain and routine plate growth?',
    choices: [
      'It may stain poorly and requires specialized culture conditions rather than routine media alone.',
      'It always appears as large gram-positive cocci in clusters.',
      'It grows rapidly as a lactose fermenter on MacConkey agar.',
      'It is always visible as budding yeast on direct smear.'
    ],
    answer: 'It may stain poorly and requires specialized culture conditions rather than routine media alone.',
    explanation: 'Legionella is a fastidious organism. The bench workflow has to match the suspected organism with the correct stain expectations, media, and incubation approach.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-122-haemophilus-x-v-factors',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus identification',
    difficulty: 'beginner',
    tags: ['Haemophilus', 'X factor', 'V factor', 'chocolate agar'],
    prompt: 'Why does chocolate agar support many Haemophilus species better than routine sheep blood agar?',
    choices: [
      'Heating releases growth factors such as X factor and V factor from red blood cells.',
      'Chocolate agar is anaerobic and removes all oxygen.',
      'Chocolate agar contains acid-fast stain reagents.',
      'Chocolate agar makes all organisms lactose fermenters.'
    ],
    answer: 'Heating releases growth factors such as X factor and V factor from red blood cells.',
    explanation: 'Haemophilus identification often begins with X and V factor requirements. Chocolate agar makes these factors more available than intact sheep blood agar.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-123-haemophilus-satellitism',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus identification',
    difficulty: 'intermediate',
    tags: ['Haemophilus', 'satellitism', 'V factor', 'Staphylococcus aureus'],
    prompt: 'Tiny colonies grow near a Staphylococcus aureus streak on sheep blood agar but not farther away. What Haemophilus-related concept does this demonstrate?',
    choices: [
      'Satellitism from V factor availability near the helper organism.',
      'Acid-fast growth around the helper organism.',
      'Coagulase production by Haemophilus.',
      'Strict anaerobic growth only near oxygen.'
    ],
    answer: 'Satellitism from V factor availability near the helper organism.',
    explanation: 'Some Haemophilus species need V factor, which can be supplied near organisms such as S. aureus. Satellitism is a classic bench demonstration of that requirement.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-124-haemophilus-influenzae-factor-pattern',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus identification',
    difficulty: 'intermediate',
    tags: ['Haemophilus influenzae', 'X factor', 'V factor', 'factor requirements'],
    prompt: 'A Haemophilus-like isolate requires both X factor and V factor for growth. Which species-level teaching pattern does this support?',
    choices: [
      'Haemophilus influenzae.',
      'Haemophilus parainfluenzae.',
      'Pseudomonas aeruginosa.',
      'Campylobacter jejuni.'
    ],
    answer: 'Haemophilus influenzae.',
    explanation: 'H. influenzae classically requires both X and V factors. Factor testing is one part of the identification workflow and should match colony morphology and source.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-125-haemophilus-parainfluenzae-v-factor',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus identification',
    difficulty: 'advanced',
    tags: ['Haemophilus parainfluenzae', 'V factor', 'X factor', 'factor requirements'],
    prompt: 'A Haemophilus-like isolate grows with V factor but does not require X factor. Which organism is the best teaching match?',
    choices: [
      'Haemophilus parainfluenzae.',
      'Haemophilus influenzae.',
      'Francisella tularensis.',
      'Vibrio cholerae.'
    ],
    answer: 'Haemophilus parainfluenzae.',
    explanation: 'H. parainfluenzae is commonly taught as V factor dependent but not X factor dependent. This separates it from H. influenzae in classic factor-requirement workflows.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-126-haemophilus-beta-lactamase',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus antimicrobial susceptibility concepts',
    difficulty: 'advanced',
    tags: ['Haemophilus influenzae', 'beta-lactamase', 'ampicillin resistance', 'AST'],
    prompt: 'A Haemophilus influenzae isolate is flagged for beta-lactamase production. What is the best educational interpretation?',
    choices: [
      'The organism may hydrolyze certain beta-lactam drugs, so the result affects susceptibility interpretation under lab rules.',
      'The organism is confirmed as Legionella.',
      'The organism no longer requires X or V factors.',
      'The result proves the organism is a yeast.'
    ],
    answer: 'The organism may hydrolyze certain beta-lactam drugs, so the result affects susceptibility interpretation under lab rules.',
    explanation: 'Beta-lactamase is a resistance mechanism, not an organism name. Learners should connect it to AST interpretation and current laboratory reporting guidance.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-127-haemophilus-biotype-concept',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus identification',
    difficulty: 'advanced',
    tags: ['Haemophilus influenzae', 'biotype', 'indole', 'urease', 'ornithine'],
    prompt: 'A Haemophilus influenzae isolate is being biotyped. Which test group is commonly used in classic teaching workflows?',
    choices: [
      'Indole, urease, and ornithine reactions.',
      'Coagulase, catalase, and novobiocin.',
      'Acid-fast stain, niacin, and nitrate only.',
      'Germ tube, cornmeal morphology, and urease.'
    ],
    answer: 'Indole, urease, and ornithine reactions.',
    explanation: 'Classic H. influenzae biotyping uses indole, urease, and ornithine patterns. It is an advanced identification layer after the organism fits the Haemophilus branch.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-128-haemophilus-capsule-serotype',
    area: 'analytic-bacteriology',
    topic: 'Haemophilus influenzae serotyping',
    difficulty: 'advanced',
    tags: ['Haemophilus influenzae', 'capsule', 'serotype b', 'serotyping'],
    prompt: 'What does capsular serotyping add to a Haemophilus influenzae workup?',
    choices: [
      'It characterizes capsule antigen type, such as type b, after the organism is identified.',
      'It replaces Gram stain and culture setup.',
      'It determines whether the organism is acid-fast.',
      'It proves the isolate is a nonfermenter.'
    ],
    answer: 'It characterizes capsule antigen type, such as type b, after the organism is identified.',
    explanation: 'Serotyping addresses capsule antigen identity. It is not the same as primary organism recovery or basic species identification.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-129-fastidious-gnr-no-macconkey',
    area: 'analytic-bacteriology',
    topic: 'Fastidious gram-negative rod workflow',
    difficulty: 'beginner',
    tags: ['fastidious gram-negative rods', 'MacConkey agar', 'chocolate agar', 'bench workflow'],
    prompt: 'A tiny gram-negative rod grows on chocolate agar but not on MacConkey agar. What is the best learner interpretation?',
    choices: [
      'Fastidious gram-negative rods may require enriched media, so lack of MacConkey growth does not rule out importance.',
      'The isolate must be a lactose-fermenting Enterobacterales organism.',
      'The isolate is automatically a fungus.',
      'The Gram stain can be ignored because MacConkey was negative.'
    ],
    answer: 'Fastidious gram-negative rods may require enriched media, so lack of MacConkey growth does not rule out importance.',
    explanation: 'Some fastidious gram-negative rods do not grow well on MacConkey agar. The bench should use source, Gram stain, media requirements, atmosphere, and key tests together.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-130-fastidious-gnr-bench-first-workflow',
    area: 'analytic-bacteriology',
    topic: 'Fastidious gram-negative rod workflow',
    difficulty: 'intermediate',
    tags: ['fastidious gram-negative rods', 'bench workflow', 'source', 'media', 'atmosphere'],
    prompt: 'Which approach best matches a bench-first workup for miscellaneous fastidious gram-negative rods?',
    choices: [
      'Start with specimen source and Gram stain, then connect colony growth, media needs, atmosphere, and key biochemical clues.',
      'Identify the organism from one colony color alone.',
      'Treat all tiny gram-negative rods as normal flora without review.',
      'Use only MacConkey agar for every fastidious organism.'
    ],
    answer: 'Start with specimen source and Gram stain, then connect colony growth, media needs, atmosphere, and key biochemical clues.',
    explanation: 'Fastidious gram-negative rods require workflow thinking. The safest learning path is source to Gram stain to media and atmosphere to key tests, not memorizing isolated names.',
    source: 'Learn Microbes original question bank: Miscellaneous and Fastidious Gram-Negative Rods',
    status: 'draft'
  },
  {
    id: 'bacteriology-131-catalase-gpc-branch',
    area: 'analytic-bacteriology',
    topic: 'Gram-positive cocci screening',
    difficulty: 'beginner',
    tags: ['gram-positive cocci', 'catalase', 'Staphylococcus', 'Streptococcus'],
    prompt: 'A Gram stain shows gram-positive cocci. Which screening test most commonly separates a Staphylococcus-like branch from a Streptococcus-like branch?',
    choices: [
      'Catalase test.',
      'Indole test.',
      'Oxidase test.',
      'Acid-fast stain.'
    ],
    answer: 'Catalase test.',
    explanation: 'Catalase is the classic first branch for gram-positive cocci. Staphylococcus-like organisms are usually catalase positive, while Streptococcus and Enterococcus are catalase negative or weak.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'published'
  },
  {
    id: 'bacteriology-132-staphylococcus-clusters-coagulase',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus identification',
    difficulty: 'beginner',
    tags: ['Staphylococcus', 'coagulase', 'gram-positive cocci', 'clusters'],
    prompt: 'A catalase-positive gram-positive coccus grows in clusters. Which test helps separate Staphylococcus aureus from many coagulase-negative staphylococci?',
    choices: [
      'Coagulase testing.',
      'Bile esculin testing only.',
      'Hippurate hydrolysis only.',
      'Lactose fermentation on MacConkey agar.'
    ],
    answer: 'Coagulase testing.',
    explanation: 'Coagulase is a key Staphylococcus branch test. S. aureus is classically coagulase positive, while many other staphylococci are coagulase negative.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'published'
  },
  {
    id: 'bacteriology-133-micrococcus-of-glucose',
    area: 'analytic-bacteriology',
    topic: 'Micrococcus differentiation',
    difficulty: 'intermediate',
    tags: ['Micrococcus', 'Staphylococcus', 'OF glucose', 'gram-positive cocci'],
    prompt: 'A catalase-positive gram-positive coccus could be Micrococcus or Staphylococcus. Which concept helps separate them in a classic teaching workflow?',
    choices: [
      'Staphylococcus can ferment glucose, while Micrococcus is typically oxidative or nonfermentative.',
      'Micrococcus is always coagulase positive, while Staphylococcus is always coagulase negative.',
      'Micrococcus is acid-fast, while Staphylococcus is not.',
      'Staphylococcus grows only on mycobacterial media.'
    ],
    answer: 'Staphylococcus can ferment glucose, while Micrococcus is typically oxidative or nonfermentative.',
    explanation: 'Micrococcus and Staphylococcus can both be catalase positive. Glucose metabolism pattern helps move the learner into the correct branch.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-134-lysostaphin-staph-micrococcus',
    area: 'analytic-bacteriology',
    topic: 'Micrococcus differentiation',
    difficulty: 'advanced',
    tags: ['lysostaphin', 'Micrococcus', 'Staphylococcus', 'bench tests'],
    prompt: 'A lab uses lysostaphin to help separate Staphylococcus from Micrococcus. Which result pattern is the classic teaching point?',
    choices: [
      'Staphylococcus is usually susceptible to lysostaphin, while Micrococcus is resistant.',
      'Micrococcus is usually susceptible to lysostaphin, while Staphylococcus is resistant.',
      'Both organisms are identified by lysostaphin as acid-fast rods.',
      'Lysostaphin detects lactose fermentation on MacConkey agar.'
    ],
    answer: 'Staphylococcus is usually susceptible to lysostaphin, while Micrococcus is resistant.',
    explanation: 'Lysostaphin targets features of the staphylococcal cell wall. It is a useful advanced separator when catalase-positive gram-positive cocci overlap.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-135-slide-vs-tube-coagulase',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus coagulase testing',
    difficulty: 'intermediate',
    tags: ['coagulase', 'Staphylococcus aureus', 'clumping factor', 'tube coagulase'],
    prompt: 'A slide coagulase test is negative on a Staphylococcus-like isolate, but S. aureus is still suspected. What is the best bench principle?',
    choices: [
      'Perform or follow the tube coagulase workflow because slide testing detects bound coagulase and can miss some isolates.',
      'Report the isolate as Micrococcus immediately.',
      'Move the isolate to an acid-fast bacilli culture workflow.',
      'Use only MacConkey agar to confirm coagulase.'
    ],
    answer: 'Perform or follow the tube coagulase workflow because slide testing detects bound coagulase and can miss some isolates.',
    explanation: 'Slide coagulase screens for bound coagulase or clumping factor. Tube coagulase detects free coagulase and is useful when the slide result does not fit the suspected pattern.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-136-staph-latex-agglutination',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus aureus identification',
    difficulty: 'intermediate',
    tags: ['Staphylococcus aureus', 'latex agglutination', 'protein A', 'clumping factor'],
    prompt: 'A rapid latex agglutination test is used on a Staphylococcus-like colony. What does this type of test commonly detect for S. aureus screening?',
    choices: [
      'Surface markers such as clumping factor, protein A, or capsular antigen depending on the kit.',
      'Acid-fast cell wall mycolic acids.',
      'Indole production from tryptophan.',
      'Lactose fermentation on MacConkey agar.'
    ],
    answer: 'Surface markers such as clumping factor, protein A, or capsular antigen depending on the kit.',
    explanation: 'Latex agglutination tests support rapid S. aureus screening by detecting surface-associated targets. Results should still fit the organism source, morphology, and laboratory workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-137-mannitol-salt-staph-aureus',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus aureus identification',
    difficulty: 'beginner',
    tags: ['Staphylococcus aureus', 'mannitol salt agar', 'salt tolerance', 'fermentation'],
    prompt: 'A salt-tolerant gram-positive coccus grows on mannitol salt agar and turns the medium yellow. Which interpretation best fits the teaching workflow?',
    choices: [
      'The organism tolerated high salt and fermented mannitol, supporting a Staphylococcus aureus-like pattern.',
      'The organism is confirmed as Streptococcus pneumoniae.',
      'The organism is acid-fast.',
      'The organism is a lactose-fermenting gram-negative rod.'
    ],
    answer: 'The organism tolerated high salt and fermented mannitol, supporting a Staphylococcus aureus-like pattern.',
    explanation: 'Mannitol salt agar combines salt selection with mannitol differentiation. A yellow reaction supports mannitol fermentation but still belongs in the full Staphylococcus workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-138-mrsa-meca-pbp2a',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus antimicrobial susceptibility concepts',
    difficulty: 'advanced',
    tags: ['MRSA', 'mecA', 'PBP2a', 'cefoxitin', 'AST'],
    prompt: 'A Staphylococcus aureus isolate is flagged as methicillin resistant. What is the best educational meaning of this result?',
    choices: [
      'The isolate may carry mecA or a related mechanism that produces altered penicillin-binding protein activity.',
      'The isolate is confirmed as Streptococcus pyogenes.',
      'The isolate can no longer be tested by any susceptibility method.',
      'The isolate became acid-fast after exposure to antibiotics.'
    ],
    answer: 'The isolate may carry mecA or a related mechanism that produces altered penicillin-binding protein activity.',
    explanation: 'MRSA is an antimicrobial resistance concept tied to altered beta-lactam targets such as PBP2a. Bench interpretation follows the lab’s current AST method and reporting rules.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-139-d-test-inducible-clindamycin',
    area: 'analytic-bacteriology',
    topic: 'Inducible clindamycin resistance',
    difficulty: 'advanced',
    tags: ['D-test', 'clindamycin', 'erythromycin', 'inducible resistance', 'AST'],
    prompt: 'A disk diffusion setup shows flattening of the clindamycin zone next to an erythromycin disk. What does this D-shaped zone suggest?',
    choices: [
      'Inducible clindamycin resistance.',
      'Beta-lactamase production by nitrocefin.',
      'A positive bile solubility test.',
      'X and V factor dependence.'
    ],
    answer: 'Inducible clindamycin resistance.',
    explanation: 'The D-test screens for inducible clindamycin resistance in appropriate organisms. The bench interpretation should follow organism-specific and laboratory-specific AST rules.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-140-staph-epidermidis-biofilm',
    area: 'analytic-bacteriology',
    topic: 'Coagulase-negative staphylococci',
    difficulty: 'beginner',
    tags: ['Staphylococcus epidermidis', 'coagulase-negative staphylococci', 'biofilm', 'catheter'],
    prompt: 'A coagulase-negative Staphylococcus isolate is repeatedly recovered from a catheter-associated specimen. Which concept explains why the lab does not dismiss the pattern automatically?',
    choices: [
      'Some coagulase-negative staphylococci can form biofilm on devices and may be significant in the right context.',
      'All coagulase-negative staphylococci are always contaminants.',
      'Coagulase-negative staphylococci are acid-fast rods.',
      'Coagulase-negative staphylococci cannot grow on blood agar.'
    ],
    answer: 'Some coagulase-negative staphylococci can form biofilm on devices and may be significant in the right context.',
    explanation: 'Coagulase-negative staphylococci often represent skin flora, but source and repeat recovery matter. Device-associated contexts require careful interpretation under the lab’s rules.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-141-staph-saprophyticus-novobiocin',
    area: 'analytic-bacteriology',
    topic: 'Coagulase-negative staphylococci',
    difficulty: 'beginner',
    tags: ['Staphylococcus saprophyticus', 'novobiocin', 'urine culture', 'coagulase-negative staphylococci'],
    prompt: 'A coagulase-negative Staphylococcus from a urine culture is novobiocin resistant. Which organism is the classic teaching match?',
    choices: [
      'Staphylococcus saprophyticus.',
      'Staphylococcus epidermidis.',
      'Streptococcus pneumoniae.',
      'Neisseria meningitidis.'
    ],
    answer: 'Staphylococcus saprophyticus.',
    explanation: 'S. saprophyticus is classically novobiocin resistant, while S. epidermidis is usually novobiocin susceptible. This is a useful separator in the correct specimen context.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-142-staph-lugdunensis-caution',
    area: 'analytic-bacteriology',
    topic: 'Coagulase-negative staphylococci',
    difficulty: 'advanced',
    tags: ['Staphylococcus lugdunensis', 'coagulase-negative staphylococci', 'bench interpretation', 'sterile site'],
    prompt: 'Why should Staphylococcus lugdunensis not be treated casually as just another low-significance coagulase-negative Staphylococcus in every situation?',
    choices: [
      'It can behave more aggressively than many coagulase-negative staphylococci, so source and significance need careful review.',
      'It is always an acid-fast rod.',
      'It is always a harmless environmental mold.',
      'It cannot grow in routine aerobic culture.'
    ],
    answer: 'It can behave more aggressively than many coagulase-negative staphylococci, so source and significance need careful review.',
    explanation: 'S. lugdunensis is coagulase-negative in many workflows but can be more clinically significant than typical skin-flora CoNS. Learners should interpret it with source, purity, and lab guidance.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-143-cons-significance-context',
    area: 'analytic-bacteriology',
    topic: 'Coagulase-negative staphylococci',
    difficulty: 'intermediate',
    tags: ['coagulase-negative staphylococci', 'contamination', 'sterile site', 'bench interpretation'],
    prompt: 'A coagulase-negative Staphylococcus grows from one of several blood culture bottles. What is the best bench-first interpretation habit?',
    choices: [
      'Evaluate source, number of positive cultures, timing, organism identity, and lab criteria before deciding significance.',
      'Report every coagulase-negative Staphylococcus as S. aureus.',
      'Ignore all coagulase-negative staphylococci from sterile-site cultures.',
      'Identify it only by colony color.'
    ],
    answer: 'Evaluate source, number of positive cultures, timing, organism identity, and lab criteria before deciding significance.',
    explanation: 'Coagulase-negative staphylococci are common skin organisms but can be significant in the right context. Interpretation depends on the full culture pattern, not one label.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-144-streptococcus-catalase-negative',
    area: 'analytic-bacteriology',
    topic: 'Streptococcus screening',
    difficulty: 'beginner',
    tags: ['Streptococcus', 'Enterococcus', 'catalase negative', 'hemolysis'],
    prompt: 'A blood agar plate has small colonies of gram-positive cocci in chains that are catalase negative. What is the next useful observation in the classic workflow?',
    choices: [
      'Hemolysis pattern on blood agar.',
      'Lactose fermentation on MacConkey agar.',
      'Acid-fast staining only.',
      'Coagulase tube clot formation.'
    ],
    answer: 'Hemolysis pattern on blood agar.',
    explanation: 'For Streptococcus-like organisms, hemolysis pattern helps branch the workup into alpha, beta, or nonhemolytic groups before key tests are selected.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'published'
  },
  {
    id: 'bacteriology-145-group-a-strep-pyr-bacitracin',
    area: 'analytic-bacteriology',
    topic: 'Beta-hemolytic streptococci',
    difficulty: 'intermediate',
    tags: ['Streptococcus pyogenes', 'group A strep', 'PYR', 'bacitracin', 'beta hemolysis'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate is PYR positive and shows a group A-compatible screening pattern. Which organism is the classic teaching match?',
    choices: [
      'Streptococcus pyogenes.',
      'Streptococcus agalactiae.',
      'Enterococcus faecalis.',
      'Streptococcus pneumoniae.'
    ],
    answer: 'Streptococcus pyogenes.',
    explanation: 'Group A Streptococcus is classically beta-hemolytic and PYR positive. Screening results should be interpreted within the laboratory’s confirmation workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-146-group-b-strep-camp',
    area: 'analytic-bacteriology',
    topic: 'Beta-hemolytic streptococci',
    difficulty: 'intermediate',
    tags: ['Streptococcus agalactiae', 'group B strep', 'CAMP test', 'hippurate'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate is CAMP positive and hippurate positive. Which organism group does this support?',
    choices: [
      'Group B Streptococcus.',
      'Group A Streptococcus.',
      'Viridans streptococci.',
      'Moraxella catarrhalis.'
    ],
    answer: 'Group B Streptococcus.',
    explanation: 'Group B Streptococcus is classically CAMP positive and hippurate positive. The bench uses these reactions with hemolysis and grouping methods.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-147-beta-strep-cg-branch',
    area: 'analytic-bacteriology',
    topic: 'Beta-hemolytic streptococci',
    difficulty: 'advanced',
    tags: ['group C strep', 'group G strep', 'beta hemolysis', 'streptococci'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate is not group A or group B by the lab’s screening workflow. What is the best next concept?',
    choices: [
      'Consider other beta-hemolytic groups such as C or G and follow the laboratory grouping method.',
      'Report it as Streptococcus pneumoniae based on beta hemolysis.',
      'Move it to a Neisseria carbohydrate workflow.',
      'Assume it is a mold because group A and B are negative.'
    ],
    answer: 'Consider other beta-hemolytic groups such as C or G and follow the laboratory grouping method.',
    explanation: 'Not all beta-hemolytic streptococci are group A or B. Grouping and organism context keep the workup accurate and prevent oversimplified identification.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-148-strep-pneumoniae-optochin-bile',
    area: 'analytic-bacteriology',
    topic: 'Alpha-hemolytic streptococci',
    difficulty: 'beginner',
    tags: ['Streptococcus pneumoniae', 'optochin', 'bile solubility', 'alpha hemolysis'],
    prompt: 'An alpha-hemolytic Streptococcus-like isolate is optochin susceptible and bile soluble. Which organism is the classic teaching match?',
    choices: [
      'Streptococcus pneumoniae.',
      'Viridans group streptococci.',
      'Enterococcus faecalis.',
      'Neisseria gonorrhoeae.'
    ],
    answer: 'Streptococcus pneumoniae.',
    explanation: 'S. pneumoniae is classically alpha-hemolytic, optochin susceptible, and bile soluble. These results help separate it from viridans group streptococci.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-149-viridans-optochin-resistant',
    area: 'analytic-bacteriology',
    topic: 'Alpha-hemolytic streptococci',
    difficulty: 'beginner',
    tags: ['viridans streptococci', 'optochin resistant', 'bile insoluble', 'alpha hemolysis'],
    prompt: 'An alpha-hemolytic Streptococcus-like isolate is optochin resistant and bile insoluble. Which group best fits this teaching pattern?',
    choices: [
      'Viridans group streptococci.',
      'Streptococcus pneumoniae.',
      'Staphylococcus aureus.',
      'Moraxella catarrhalis.'
    ],
    answer: 'Viridans group streptococci.',
    explanation: 'Viridans group streptococci are classically optochin resistant and bile insoluble. This pattern helps keep them separate from S. pneumoniae.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-150-bile-esculin-group-d',
    area: 'analytic-bacteriology',
    topic: 'Group D streptococci and enterococci',
    difficulty: 'intermediate',
    tags: ['bile esculin', 'group D streptococci', 'Enterococcus', 'bench tests'],
    prompt: 'A catalase-negative gram-positive coccus hydrolyzes esculin in the presence of bile. What does this result support?',
    choices: [
      'A group D or Enterococcus branch that needs additional separation.',
      'A final identification of Streptococcus pyogenes.',
      'A Neisseria carbohydrate utilization pattern.',
      'A Staphylococcus aureus coagulase reaction.'
    ],
    answer: 'A group D or Enterococcus branch that needs additional separation.',
    explanation: 'Bile esculin positivity supports the group D or Enterococcus branch. Additional tests such as salt tolerance and PYR help separate organisms within that branch.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-151-enterococcus-salt-pyr',
    area: 'analytic-bacteriology',
    topic: 'Enterococcus identification',
    difficulty: 'intermediate',
    tags: ['Enterococcus', '6.5% NaCl', 'PYR', 'bile esculin'],
    prompt: 'A bile esculin-positive gram-positive coccus grows in 6.5 percent NaCl broth and is PYR positive. Which branch does this support?',
    choices: [
      'Enterococcus species.',
      'Viridans group streptococci.',
      'Streptococcus pneumoniae.',
      'Neisseria meningitidis.'
    ],
    answer: 'Enterococcus species.',
    explanation: 'Enterococcus species are classically bile esculin positive, salt tolerant, and PYR positive. This pattern helps separate them from nonenterococcal group D streptococci.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-152-strep-gallolyticus-no-salt',
    area: 'analytic-bacteriology',
    topic: 'Group D streptococci and enterococci',
    difficulty: 'advanced',
    tags: ['Streptococcus gallolyticus', 'Streptococcus bovis group', 'bile esculin', '6.5% NaCl'],
    prompt: 'A group D-like Streptococcus isolate is bile esculin positive but does not grow in 6.5 percent NaCl. Which teaching interpretation is most appropriate?',
    choices: [
      'A nonenterococcal group D organism such as the Streptococcus bovis or gallolyticus group should be considered.',
      'The result confirms Enterococcus faecalis.',
      'The result confirms Staphylococcus aureus.',
      'The result rules out all streptococci.'
    ],
    answer: 'A nonenterococcal group D organism such as the Streptococcus bovis or gallolyticus group should be considered.',
    explanation: 'Salt tolerance helps separate Enterococcus from nonenterococcal group D streptococci. Bile esculin alone is not enough to finalize the branch.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-153-nutritionally-variant-strep-satellite',
    area: 'analytic-bacteriology',
    topic: 'Nutritionally variant streptococci',
    difficulty: 'advanced',
    tags: ['nutritionally variant streptococci', 'Abiotrophia', 'Granulicatella', 'satellitism'],
    prompt: 'Tiny colonies appear only near a Staphylococcus aureus streak on blood agar, suggesting a nutritionally variant Streptococcus-like organism. What does this pattern reflect?',
    choices: [
      'The organism needs a growth factor supplied near the helper organism.',
      'The organism is acid-fast and requires mycobacterial media.',
      'The organism is a lactose-fermenting gram-negative rod.',
      'The organism is coagulase positive.'
    ],
    answer: 'The organism needs a growth factor supplied near the helper organism.',
    explanation: 'Nutritionally variant streptococci, such as Abiotrophia or Granulicatella, may require additional nutrients and show satellite growth. This is a bench clue for a more specialized identification workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-154-pyr-strep-enterococcus-logic',
    area: 'analytic-bacteriology',
    topic: 'PYR testing',
    difficulty: 'beginner',
    tags: ['PYR', 'Streptococcus pyogenes', 'Enterococcus', 'bench tests'],
    prompt: 'Why is PYR useful in the gram-positive cocci workflow?',
    choices: [
      'It helps support organisms such as Streptococcus pyogenes and Enterococcus in the right branch.',
      'It confirms all alpha-hemolytic streptococci as S. pneumoniae.',
      'It detects lactose fermentation.',
      'It replaces Gram stain review.'
    ],
    answer: 'It helps support organisms such as Streptococcus pyogenes and Enterococcus in the right branch.',
    explanation: 'PYR is a practical support test. It is useful for specific branches, especially group A Streptococcus and Enterococcus, but it is not a universal final identification test.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-155-strep-grouping-not-final-id',
    area: 'analytic-bacteriology',
    topic: 'Streptococcal grouping',
    difficulty: 'intermediate',
    tags: ['streptococcal grouping', 'Lancefield group', 'bench workflow', 'beta hemolysis'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate gives a Lancefield group reaction. What is the safest learning interpretation?',
    choices: [
      'Grouping supports the identification branch but should be interpreted with colony morphology, hemolysis, and lab workflow.',
      'Grouping replaces culture and Gram stain.',
      'Grouping identifies Neisseria species.',
      'Grouping proves the isolate is a Staphylococcus.'
    ],
    answer: 'Grouping supports the identification branch but should be interpreted with colony morphology, hemolysis, and lab workflow.',
    explanation: 'Lancefield grouping is powerful but still part of a workflow. Bench identification stays strongest when grouping matches the rest of the organism pattern.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-156-staph-aureus-toxin-concept',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus aureus virulence concepts',
    difficulty: 'advanced',
    tags: ['Staphylococcus aureus', 'toxins', 'superantigen', 'virulence'],
    prompt: 'In a teaching workflow, why is Staphylococcus aureus associated with several toxin-mediated syndromes?',
    choices: [
      'Some strains produce toxins such as superantigens, exfoliative toxins, or enterotoxins.',
      'All S. aureus isolates produce acid-fast spores.',
      'S. aureus is an obligate intracellular organism.',
      'S. aureus is identified only by carbohydrate use on CTA media.'
    ],
    answer: 'Some strains produce toxins such as superantigens, exfoliative toxins, or enterotoxins.',
    explanation: 'S. aureus has multiple virulence-associated factors. The educational point is organism capability, not diagnosing a syndrome from a culture result alone.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-157-staph-beta-lactamase-concept',
    area: 'analytic-bacteriology',
    topic: 'Staphylococcus antimicrobial susceptibility concepts',
    difficulty: 'intermediate',
    tags: ['Staphylococcus', 'beta-lactamase', 'penicillinase', 'AST'],
    prompt: 'A Staphylococcus isolate produces beta-lactamase. What is the best educational interpretation?',
    choices: [
      'The organism can hydrolyze certain beta-lactam drugs, affecting susceptibility interpretation under lab rules.',
      'The organism is confirmed as a Streptococcus.',
      'The organism no longer has a gram-positive cell wall.',
      'The result proves the isolate requires viral transport medium.'
    ],
    answer: 'The organism can hydrolyze certain beta-lactam drugs, affecting susceptibility interpretation under lab rules.',
    explanation: 'Beta-lactamase is a resistance mechanism. Learners should connect it to AST interpretation rather than treating it as an organism identification test.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-158-neisseria-oxidase-diplococci',
    area: 'analytic-bacteriology',
    topic: 'Neisseria identification',
    difficulty: 'beginner',
    tags: ['Neisseria', 'gram-negative diplococci', 'oxidase', 'chocolate agar'],
    prompt: 'A chocolate agar plate grows small colonies that are oxidase positive gram-negative diplococci. Which organism group should move higher in the workflow?',
    choices: [
      'Neisseria species.',
      'Staphylococcus species.',
      'Enterococcus species.',
      'Clostridioides species.'
    ],
    answer: 'Neisseria species.',
    explanation: 'Neisseria species are oxidase-positive gram-negative diplococci. The next steps depend on source, selective media growth, and carbohydrate or identification system results.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'published'
  },
  {
    id: 'bacteriology-159-mtm-selective-neisseria',
    area: 'analytic-bacteriology',
    topic: 'Neisseria selective media',
    difficulty: 'beginner',
    tags: ['modified Thayer-Martin', 'Neisseria gonorrhoeae', 'Neisseria meningitidis', 'selective media'],
    prompt: 'Why is modified Thayer-Martin medium useful when pathogenic Neisseria is suspected from a mixed-flora site?',
    choices: [
      'It contains selective agents that suppress competing flora while supporting pathogenic Neisseria recovery.',
      'It is the primary medium for acid-fast bacilli.',
      'It selects only for anaerobic gram-positive rods.',
      'It turns all Neisseria species into lactose fermenters.'
    ],
    answer: 'It contains selective agents that suppress competing flora while supporting pathogenic Neisseria recovery.',
    explanation: 'Modified Thayer-Martin is used to recover pathogenic Neisseria from specimens with competing organisms. It supports the source-to-media logic of the bench workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-160-neisseria-gonorrhoeae-glucose-only',
    area: 'analytic-bacteriology',
    topic: 'Neisseria carbohydrate utilization',
    difficulty: 'intermediate',
    tags: ['Neisseria gonorrhoeae', 'CTA', 'glucose', 'carbohydrate utilization'],
    prompt: 'A pathogenic Neisseria isolate uses glucose but not maltose in a classic carbohydrate utilization workflow. Which species does this support?',
    choices: [
      'Neisseria gonorrhoeae.',
      'Neisseria meningitidis.',
      'Neisseria lactamica.',
      'Moraxella catarrhalis.'
    ],
    answer: 'Neisseria gonorrhoeae.',
    explanation: 'N. gonorrhoeae is classically glucose positive and maltose negative. Carbohydrate patterns should be interpreted with source, growth on selective media, and current lab identification methods.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-161-neisseria-meningitidis-glucose-maltose',
    area: 'analytic-bacteriology',
    topic: 'Neisseria carbohydrate utilization',
    difficulty: 'intermediate',
    tags: ['Neisseria meningitidis', 'CTA', 'glucose', 'maltose'],
    prompt: 'A Neisseria isolate uses both glucose and maltose in a classic carbohydrate utilization workflow. Which species does this support?',
    choices: [
      'Neisseria meningitidis.',
      'Neisseria gonorrhoeae.',
      'Neisseria flavescens.',
      'Staphylococcus saprophyticus.'
    ],
    answer: 'Neisseria meningitidis.',
    explanation: 'N. meningitidis is classically glucose positive and maltose positive. This pattern helps separate it from N. gonorrhoeae in traditional teaching workflows.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-162-neisseria-lactamica-beta-galactosidase',
    area: 'analytic-bacteriology',
    topic: 'Neisseria identification',
    difficulty: 'advanced',
    tags: ['Neisseria lactamica', 'beta-galactosidase', 'lactose', 'Neisseria'],
    prompt: 'A commensal Neisseria-like isolate is beta-galactosidase positive and has a lactose-related reaction. Which organism is the classic teaching match?',
    choices: [
      'Neisseria lactamica.',
      'Neisseria gonorrhoeae.',
      'Moraxella catarrhalis.',
      'Streptococcus pneumoniae.'
    ],
    answer: 'Neisseria lactamica.',
    explanation: 'N. lactamica is classically beta-galactosidase positive and can show lactose-related activity. This helps separate it from pathogenic Neisseria in teaching workflows.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-163-moraxella-catarrhalis-tributyrin',
    area: 'analytic-bacteriology',
    topic: 'Moraxella identification',
    difficulty: 'intermediate',
    tags: ['Moraxella catarrhalis', 'tributyrin', 'DNase', 'gram-negative diplococci'],
    prompt: 'A gram-negative diplococcus from a respiratory specimen is oxidase positive, asaccharolytic, DNase positive, and tributyrin positive. Which organism is the best fit?',
    choices: [
      'Moraxella catarrhalis.',
      'Neisseria gonorrhoeae.',
      'Streptococcus agalactiae.',
      'Staphylococcus aureus.'
    ],
    answer: 'Moraxella catarrhalis.',
    explanation: 'Moraxella catarrhalis can resemble Neisseria by Gram stain and oxidase positivity, but tributyrin and DNase positivity support the Moraxella branch.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-164-neisseria-cta-principle',
    area: 'analytic-bacteriology',
    topic: 'Neisseria carbohydrate utilization',
    difficulty: 'advanced',
    tags: ['Neisseria', 'CTA', 'carbohydrate utilization', 'bench tests'],
    prompt: 'Why are carbohydrate utilization patterns useful in classic Neisseria identification?',
    choices: [
      'Different Neisseria species use different carbohydrates, which supports species-level separation.',
      'They detect coagulase production.',
      'They determine whether the organism is acid-fast.',
      'They replace oxidase testing and source review.'
    ],
    answer: 'Different Neisseria species use different carbohydrates, which supports species-level separation.',
    explanation: 'Classic Neisseria workups use carbohydrate patterns as one layer of identification. The results should match Gram stain, oxidase reaction, source, and growth behavior.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-165-gn-diplococci-source-context',
    area: 'analytic-bacteriology',
    topic: 'Gram-negative cocci workflow',
    difficulty: 'beginner',
    tags: ['gram-negative diplococci', 'Neisseria', 'Moraxella', 'specimen source'],
    prompt: 'A Gram stain shows gram-negative diplococci. What is the best bench-first habit before choosing the identification path?',
    choices: [
      'Use specimen source, growth pattern, oxidase reaction, and selective media context together.',
      'Assume every gram-negative diplococcus is Neisseria gonorrhoeae.',
      'Ignore source because all gram-negative diplococci are worked up identically.',
      'Switch immediately to a fungal culture workflow.'
    ],
    answer: 'Use specimen source, growth pattern, oxidase reaction, and selective media context together.',
    explanation: 'Gram-negative diplococci include multiple clinically relevant and commensal possibilities. Source and growth behavior keep the learner from overcalling the organism from morphology alone.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-166-penicillin-resistant-pneumococcus-pbp',
    area: 'analytic-bacteriology',
    topic: 'Streptococcus pneumoniae antimicrobial susceptibility concepts',
    difficulty: 'advanced',
    tags: ['Streptococcus pneumoniae', 'penicillin resistance', 'PBP', 'AST'],
    prompt: 'A Streptococcus pneumoniae isolate shows reduced susceptibility to penicillin. Which resistance concept is most important for learners?',
    choices: [
      'Altered penicillin-binding proteins are a key mechanism, not routine beta-lactamase production.',
      'The organism becomes coagulase positive.',
      'The organism stops being alpha-hemolytic and becomes acid-fast.',
      'The organism is identified by lactose fermentation on MacConkey agar.'
    ],
    answer: 'Altered penicillin-binding proteins are a key mechanism, not routine beta-lactamase production.',
    explanation: 'Penicillin resistance in S. pneumoniae is classically linked to altered PBPs. This is an AST interpretation concept and should be handled according to current lab standards.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-167-beta-hemolytic-strep-sxt-bacitracin',
    area: 'analytic-bacteriology',
    topic: 'Beta-hemolytic streptococci',
    difficulty: 'advanced',
    tags: ['beta-hemolytic streptococci', 'bacitracin', 'SXT', 'group A strep'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate is being screened with bacitracin and trimethoprim-sulfamethoxazole disks. What is the safest interpretation principle?',
    choices: [
      'Disk screening can support presumptive grouping but should be confirmed by the lab’s identification workflow.',
      'Disk screening replaces Gram stain, hemolysis review, and grouping.',
      'Any beta-hemolytic colony resistant to bacitracin is automatically S. pneumoniae.',
      'These disks are used to identify Neisseria carbohydrate patterns.'
    ],
    answer: 'Disk screening can support presumptive grouping but should be confirmed by the lab’s identification workflow.',
    explanation: 'Bacitracin and SXT patterns are classic teaching tools for beta-hemolytic streptococci. They are screening clues, not standalone final identification.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-168-camp-test-arrowhead',
    area: 'analytic-bacteriology',
    topic: 'CAMP testing',
    difficulty: 'intermediate',
    tags: ['CAMP test', 'Group B Streptococcus', 'Staphylococcus aureus', 'beta hemolysis'],
    prompt: 'A beta-hemolytic Streptococcus-like isolate produces enhanced arrowhead hemolysis near a Staphylococcus aureus streak. Which result does this describe?',
    choices: [
      'Positive CAMP test.',
      'Positive oxidase test.',
      'Positive bile solubility test.',
      'Positive nitrocefin test.'
    ],
    answer: 'Positive CAMP test.',
    explanation: 'The CAMP test demonstrates enhanced hemolysis near a helper S. aureus streak. It is a classic support test for Group B Streptococcus in the right workflow.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-169-optochin-screening-caution',
    area: 'analytic-bacteriology',
    topic: 'Optochin testing',
    difficulty: 'intermediate',
    tags: ['optochin', 'Streptococcus pneumoniae', 'viridans streptococci', 'alpha hemolysis'],
    prompt: 'Why should an optochin disk be read only under the method-specific conditions used by the lab?',
    choices: [
      'Zone interpretation depends on standardized disk strength, atmosphere, incubation, and reading rules.',
      'Optochin measures beta-lactamase production directly.',
      'Optochin detects X and V factor requirements.',
      'Optochin is used only for gram-negative diplococci.'
    ],
    answer: 'Zone interpretation depends on standardized disk strength, atmosphere, incubation, and reading rules.',
    explanation: 'Optochin is useful for separating S. pneumoniae from viridans streptococci, but only when read under the correct method rules. Technique matters.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'draft'
  },
  {
    id: 'bacteriology-170-cocci-bench-first-workflow',
    area: 'analytic-bacteriology',
    topic: 'Cocci identification workflow',
    difficulty: 'beginner',
    tags: ['gram-positive cocci', 'gram-negative cocci', 'bench workflow', 'pattern recognition'],
    prompt: 'Which approach best matches a bench-first workflow for cocci identification?',
    choices: [
      'Start with Gram stain and arrangement, then use catalase, hemolysis, coagulase, grouping, oxidase, media, and source context.',
      'Identify every coccus from colony color alone.',
      'Skip source context because cocci are always worked up the same way.',
      'Use only antimicrobial susceptibility results for primary identification.'
    ],
    answer: 'Start with Gram stain and arrangement, then use catalase, hemolysis, coagulase, grouping, oxidase, media, and source context.',
    explanation: 'Cocci identification is pattern-based. Gram reaction, arrangement, media, source, and key tests work together to guide the safest branch.',
    source: 'Learn Microbes original question bank: Gram-Positive and Gram-Negative Cocci',
    status: 'published'
  },
  {
    id: 'bacteriology-171-bacillus-spore-forming-branch',
    area: 'analytic-bacteriology',
    topic: 'Aerobic gram-positive rods',
    difficulty: 'beginner',
    tags: ['Bacillus', 'spore-forming rods', 'gram-positive rods', 'bench workflow'],
    prompt: 'A Gram stain from an aerobic culture shows large gram-positive rods with spores. Which organism group should move higher in the initial bench branch?',
    choices: [
      'Bacillus species.',
      'Listeria species.',
      'Neisseria species.',
      'Campylobacter species.'
    ],
    answer: 'Bacillus species.',
    explanation: 'Large aerobic gram-positive rods with spores support a Bacillus-like branch. The bench still uses source, colony morphology, hemolysis, motility, and safety context before final interpretation.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-172-bacillus-cereus-anthracis-separator',
    area: 'analytic-bacteriology',
    topic: 'Bacillus identification',
    difficulty: 'intermediate',
    tags: ['Bacillus cereus', 'Bacillus anthracis', 'motility', 'hemolysis'],
    prompt: 'A teaching lab compares two Bacillus-like isolates. Which pattern supports Bacillus cereus over a Bacillus anthracis-like safety concern?',
    choices: [
      'Beta-hemolysis and motility.',
      'Nonhemolytic growth and nonmotility.',
      'Growth only as an obligate intracellular organism.',
      'Oxidase-positive gram-negative diplococci.'
    ],
    answer: 'Beta-hemolysis and motility.',
    explanation: 'B. cereus is classically beta-hemolytic and motile, while B. anthracis-like isolates raise concern when nonhemolytic and nonmotile. Safety protocols matter when a concerning pattern appears.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-173-bacillus-anthracis-safety-pause',
    area: 'analytic-bacteriology',
    topic: 'Bacillus recognition and safety',
    difficulty: 'advanced',
    tags: ['Bacillus anthracis', 'lab safety', 'spore-forming rods', 'biothreat awareness'],
    prompt: 'A large gram-positive spore-forming rod from a concerning specimen is nonhemolytic and nonmotile. What is the best learner-safe next step?',
    choices: [
      'Stop extra open-bench manipulation and follow the laboratory safety escalation protocol.',
      'Sniff the plate to check for a characteristic odor.',
      'Perform every manual biochemical test before telling anyone.',
      'Report the isolate as normal skin flora without review.'
    ],
    answer: 'Stop extra open-bench manipulation and follow the laboratory safety escalation protocol.',
    explanation: 'Some Bacillus-like patterns require safety-aware handling. The bench-first habit is knowing when to pause and escalate rather than over-manipulate an unusual isolate.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-174-bacillus-cereus-food-workflow',
    area: 'analytic-bacteriology',
    topic: 'Bacillus cereus concepts',
    difficulty: 'beginner',
    tags: ['Bacillus cereus', 'foodborne illness', 'spore-forming rods', 'culture interpretation'],
    prompt: 'A food-related investigation includes a beta-hemolytic, motile, spore-forming gram-positive rod. Which organism is a classic teaching match?',
    choices: [
      'Bacillus cereus.',
      'Listeria monocytogenes.',
      'Neisseria meningitidis.',
      'Chlamydia trachomatis.'
    ],
    answer: 'Bacillus cereus.',
    explanation: 'B. cereus is a classic aerobic spore-forming gram-positive rod associated with food-related outbreaks in teaching workflows. Culture results should be interpreted through the lab’s source-specific protocol.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-175-listeria-gbs-mimic',
    area: 'analytic-bacteriology',
    topic: 'Listeria identification',
    difficulty: 'beginner',
    tags: ['Listeria monocytogenes', 'group B strep mimic', 'beta hemolysis', 'gram-positive rods'],
    prompt: 'A small beta-hemolytic colony initially resembles group B Streptococcus, but Gram stain shows small gram-positive rods. Which organism should stay in the differential?',
    choices: [
      'Listeria monocytogenes.',
      'Streptococcus agalactiae.',
      'Moraxella catarrhalis.',
      'Vibrio cholerae.'
    ],
    answer: 'Listeria monocytogenes.',
    explanation: 'Listeria can produce narrow beta hemolysis and may be confused with streptococci if the Gram stain is not reviewed carefully. The rod morphology changes the branch.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-176-listeria-tumbling-motility',
    area: 'analytic-bacteriology',
    topic: 'Listeria identification',
    difficulty: 'intermediate',
    tags: ['Listeria monocytogenes', 'tumbling motility', 'umbrella motility', 'gram-positive rods'],
    prompt: 'A small gram-positive rod is catalase positive and shows tumbling motility at room temperature. Which organism is the classic teaching match?',
    choices: [
      'Listeria monocytogenes.',
      'Corynebacterium diphtheriae.',
      'Bacillus anthracis.',
      'Gardnerella vaginalis.'
    ],
    answer: 'Listeria monocytogenes.',
    explanation: 'Listeria is classically associated with tumbling motility at room temperature. Motility helps separate it from other small gram-positive rods and from beta-hemolytic streptococci.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-177-listeria-cold-growth-concept',
    area: 'analytic-bacteriology',
    topic: 'Listeria identification',
    difficulty: 'advanced',
    tags: ['Listeria monocytogenes', 'cold enrichment', 'food microbiology', 'gram-positive rods'],
    prompt: 'Why is Listeria sometimes discussed in connection with cold enrichment or refrigerated food workflows?',
    choices: [
      'It can grow at low temperatures better than many competing organisms.',
      'It is an obligate anaerobe that only grows without oxygen.',
      'It is a gram-negative diplococcus that requires modified Thayer-Martin medium.',
      'It is acid-fast and grows only on mycobacterial media.'
    ],
    answer: 'It can grow at low temperatures better than many competing organisms.',
    explanation: 'Listeria can tolerate cold conditions better than many bacteria. That concept matters in food and enrichment workflows, but routine clinical interpretation still follows the lab’s organism-specific methods.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-178-erysipelothrix-h2s-meat-fish',
    area: 'analytic-bacteriology',
    topic: 'Erysipelothrix identification',
    difficulty: 'intermediate',
    tags: ['Erysipelothrix rhusiopathiae', 'H2S', 'meat exposure', 'fish exposure'],
    prompt: 'A slender gram-positive rod from a hand wound after fish or meat handling is catalase negative, nonmotile, and produces H2S in a tube reaction. Which organism is the best teaching match?',
    choices: [
      'Erysipelothrix rhusiopathiae.',
      'Listeria monocytogenes.',
      'Bacillus cereus.',
      'Neisseria gonorrhoeae.'
    ],
    answer: 'Erysipelothrix rhusiopathiae.',
    explanation: 'Erysipelothrix is a slender gram-positive rod associated with animal or fish exposure contexts. Catalase negativity, nonmotility, and H2S production are useful bench clues.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-179-lactobacillus-normal-flora-caution',
    area: 'analytic-bacteriology',
    topic: 'Lactobacillus interpretation',
    difficulty: 'beginner',
    tags: ['Lactobacillus', 'normal flora', 'gram-positive rods', 'bench interpretation'],
    prompt: 'A culture from a mucosal site grows long gram-positive rods consistent with Lactobacillus. What is the best bench-first interpretation habit?',
    choices: [
      'Interpret with source, quantity, purity, and lab criteria because Lactobacillus may represent normal flora in some sites.',
      'Report every Lactobacillus-like isolate as Bacillus anthracis.',
      'Move every Lactobacillus-like isolate to modified acid-fast staining first.',
      'Assume all gram-positive rods from mucosal sites are pathogens.'
    ],
    answer: 'Interpret with source, quantity, purity, and lab criteria because Lactobacillus may represent normal flora in some sites.',
    explanation: 'Lactobacillus can be part of normal mucosal flora. The learner should avoid overcalling significance without considering source and culture context.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-180-corynebacterium-palisades',
    area: 'analytic-bacteriology',
    topic: 'Corynebacterium identification',
    difficulty: 'beginner',
    tags: ['Corynebacterium', 'palisades', 'Chinese letters', 'gram-positive rods'],
    prompt: 'A Gram stain shows pleomorphic gram-positive rods arranged in palisades and angular “letter-like” forms. Which organism group does this suggest?',
    choices: [
      'Corynebacterium species.',
      'Neisseria species.',
      'Vibrio species.',
      'Campylobacter species.'
    ],
    answer: 'Corynebacterium species.',
    explanation: 'Corynebacterium species often show pleomorphic rods with palisading or angular arrangements. Source and species-level workup determine whether the isolate is significant.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-181-corynebacterium-diphtheriae-toxigenicity',
    area: 'analytic-bacteriology',
    topic: 'Corynebacterium diphtheriae concepts',
    difficulty: 'advanced',
    tags: ['Corynebacterium diphtheriae', 'toxigenicity', 'Elek test', 'public health'],
    prompt: 'A Corynebacterium diphtheriae-like isolate is recovered. What is the best educational point about toxigenicity?',
    choices: [
      'Species identification alone does not prove toxin production; toxin testing or reference confirmation may be needed.',
      'All Corynebacterium species produce diphtheria toxin.',
      'Toxin production is detected by lactose fermentation on MacConkey agar.',
      'Toxigenicity is confirmed by a catalase test alone.'
    ],
    answer: 'Species identification alone does not prove toxin production; toxin testing or reference confirmation may be needed.',
    explanation: 'For C. diphtheriae-like organisms, toxigenicity matters and may require specialized confirmation. The safe bench habit is to follow the lab and public health workflow.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-182-gardnerella-clue-cells',
    area: 'analytic-bacteriology',
    topic: 'Gardnerella vaginalis concepts',
    difficulty: 'beginner',
    tags: ['Gardnerella vaginalis', 'clue cells', 'gram-variable rods', 'vaginal specimen'],
    prompt: 'A vaginal wet prep shows epithelial cells heavily coated with small gram-variable coccobacilli. What is the classic teaching term for these cells?',
    choices: [
      'Clue cells.',
      'Spherules.',
      'Sulfur granules.',
      'Elementary bodies.'
    ],
    answer: 'Clue cells.',
    explanation: 'Clue cells are epithelial cells coated with bacteria and are commonly associated with Gardnerella-centered teaching workflows. They are a lab observation, not a standalone diagnostic statement.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-183-nocardia-weak-acid-fast',
    area: 'analytic-bacteriology',
    topic: 'Nocardia identification',
    difficulty: 'intermediate',
    tags: ['Nocardia', 'modified acid-fast stain', 'branching rods', 'aerobic actinomycetes'],
    prompt: 'A culture grows branching, beaded gram-positive rods with aerial hyphae. Which stain result would support a Nocardia-like branch?',
    choices: [
      'Weak acid-fast positivity with a modified acid-fast stain.',
      'Strong coagulase positivity.',
      'Positive Neisseria carbohydrate utilization.',
      'Positive germ tube production.'
    ],
    answer: 'Weak acid-fast positivity with a modified acid-fast stain.',
    explanation: 'Nocardia are aerobic branching gram-positive rods that can be weakly acid-fast. This helps separate them from other branching gram-positive rods in the bench workflow.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-184-nocardia-actinomyces-separator',
    area: 'analytic-bacteriology',
    topic: 'Branching gram-positive rods',
    difficulty: 'advanced',
    tags: ['Nocardia', 'Actinomyces', 'aerobic', 'anaerobic', 'acid-fast'],
    prompt: 'A learner is comparing Nocardia and Actinomyces. Which bench distinction is most useful?',
    choices: [
      'Nocardia is aerobic and weakly acid-fast, while Actinomyces is generally anaerobic and non-acid-fast.',
      'Nocardia is a gram-negative diplococcus, while Actinomyces is a yeast.',
      'Nocardia requires viral transport medium, while Actinomyces grows only in cell culture.',
      'Nocardia is coagulase positive, while Actinomyces is oxidase positive.'
    ],
    answer: 'Nocardia is aerobic and weakly acid-fast, while Actinomyces is generally anaerobic and non-acid-fast.',
    explanation: 'Both organisms can appear branching and gram positive, but oxygen requirement and modified acid-fast behavior help separate the branches.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-185-rhodococcus-salmon-pink-colonies',
    area: 'analytic-bacteriology',
    topic: 'Rhodococcus identification',
    difficulty: 'advanced',
    tags: ['Rhodococcus equi', 'salmon-pink colonies', 'partial acid-fast', 'gram-positive coccobacilli'],
    prompt: 'A gram-positive coccobacillus develops salmon-pink colonies over several days and shows partial acid-fast staining. Which organism is the best teaching match?',
    choices: [
      'Rhodococcus equi.',
      'Listeria monocytogenes.',
      'Streptococcus pneumoniae.',
      'Neisseria lactamica.'
    ],
    answer: 'Rhodococcus equi.',
    explanation: 'Rhodococcus equi can appear as gram-positive coccobacilli, may be partially acid-fast, and can develop salmon-pink colonies. It belongs in the expanded aerobic gram-positive rod learning bucket.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-186-treponema-no-routine-culture',
    area: 'analytic-bacteriology',
    topic: 'Treponema testing concepts',
    difficulty: 'beginner',
    tags: ['Treponema pallidum', 'spirochetes', 'serology', 'culture limitation'],
    prompt: 'Why is Treponema pallidum not identified by routine culture on blood or chocolate agar?',
    choices: [
      'It is not recovered by routine artificial media, so testing relies on serology or specialized direct methods.',
      'It grows overnight as a lactose fermenter on MacConkey agar.',
      'It is a coagulase-positive gram-positive coccus.',
      'It forms spores that require anaerobic transport.'
    ],
    answer: 'It is not recovered by routine artificial media, so testing relies on serology or specialized direct methods.',
    explanation: 'T. pallidum is not worked up like routine bacteria. Learners should connect spirochete biology with the appropriate serologic or direct detection workflow.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-187-syphilis-serology-two-step',
    area: 'analytic-bacteriology',
    topic: 'Treponema serology',
    difficulty: 'intermediate',
    tags: ['Treponema pallidum', 'nontreponemal tests', 'treponemal tests', 'serology'],
    prompt: 'In syphilis serology teaching, why are nontreponemal and treponemal tests often discussed together?',
    choices: [
      'They answer different parts of the interpretation and are commonly used in paired algorithms.',
      'They both culture the organism directly on routine blood agar.',
      'They both detect lactose fermentation.',
      'They replace specimen collection and patient history in every setting.'
    ],
    answer: 'They answer different parts of the interpretation and are commonly used in paired algorithms.',
    explanation: 'Nontreponemal and treponemal tests have different roles in screening, confirmation, or interpretation depending on the algorithm. The lab follows its validated testing pathway.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-188-spirochete-gram-stain-limitation',
    area: 'analytic-bacteriology',
    topic: 'Spirochete detection',
    difficulty: 'beginner',
    tags: ['spirochetes', 'darkfield microscopy', 'serology', 'Gram stain limitation'],
    prompt: 'Why can spirochetes be missed by routine Gram stain-based thinking?',
    choices: [
      'They are thin organisms that often require specialized detection methods or serology.',
      'They are always large spore-forming rods.',
      'They are always visible as gram-positive cocci in clusters.',
      'They grow only as mold colonies on fungal media.'
    ],
    answer: 'They are thin organisms that often require specialized detection methods or serology.',
    explanation: 'Spirochetes do not fit routine colony-and-Gram-stain workflows well. The testing branch often relies on serology, direct visualization methods, or molecular testing depending on the organism and source.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-189-borrelia-two-tier-serology',
    area: 'analytic-bacteriology',
    topic: 'Borrelia testing concepts',
    difficulty: 'intermediate',
    tags: ['Borrelia burgdorferi', 'Lyme disease', 'two-tier testing', 'serology'],
    prompt: 'A learner asks why Lyme disease testing often uses a staged serologic algorithm rather than routine blood culture. What is the best educational answer?',
    choices: [
      'Borrelia testing commonly relies on antibody-based algorithms because routine culture is not the standard rapid bench approach.',
      'Borrelia is always recovered overnight on MacConkey agar.',
      'Borrelia is identified by coagulase testing.',
      'Borrelia is a lactose-fermenting Enterobacterales organism.'
    ],
    answer: 'Borrelia testing commonly relies on antibody-based algorithms because routine culture is not the standard rapid bench approach.',
    explanation: 'Borrelia burgdorferi does not fit a routine culture workflow for most clinical testing. Serologic algorithms and source-specific molecular testing concepts are more relevant for learners.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-190-borrelia-specimen-context',
    area: 'analytic-bacteriology',
    topic: 'Borrelia specimen selection',
    difficulty: 'advanced',
    tags: ['Borrelia burgdorferi', 'specimen selection', 'serology', 'PCR'],
    prompt: 'Which specimen-selection principle best fits Borrelia burgdorferi testing workflows?',
    choices: [
      'Use the test method and disease stage to guide specimen choice rather than assuming routine blood culture is best.',
      'Always submit stool on TCBS agar.',
      'Always submit a throat swab on modified Thayer-Martin medium.',
      'Always submit sputum for acid-fast culture only.'
    ],
    answer: 'Use the test method and disease stage to guide specimen choice rather than assuming routine blood culture is best.',
    explanation: 'Borrelia testing is method-dependent. Serology, molecular testing, or other approaches have different specimen needs, so learners should connect the organism to the validated lab algorithm.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-191-mycoplasma-no-cell-wall',
    area: 'analytic-bacteriology',
    topic: 'Mycoplasma biology',
    difficulty: 'beginner',
    tags: ['Mycoplasma', 'no cell wall', 'Gram stain limitation', 'atypical bacteria'],
    prompt: 'Why does Mycoplasma not behave like typical gram-positive or gram-negative bacteria in a Gram stain workflow?',
    choices: [
      'It lacks a rigid peptidoglycan cell wall.',
      'It forms large endospores in aerobic culture.',
      'It is a gram-negative diplococcus that requires chocolate agar.',
      'It is an obligate intracellular organism with elementary bodies.'
    ],
    answer: 'It lacks a rigid peptidoglycan cell wall.',
    explanation: 'Mycoplasma lacks a conventional cell wall, so routine Gram stain logic does not apply well. Testing uses organism-specific culture, serologic, or molecular approaches depending on the lab.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-192-mycoplasma-pneumoniae-testing',
    area: 'analytic-bacteriology',
    topic: 'Mycoplasma pneumoniae testing',
    difficulty: 'intermediate',
    tags: ['Mycoplasma pneumoniae', 'serology', 'NAAT', 'cold agglutinins'],
    prompt: 'A learner asks why cold agglutinins are not the best standalone proof of Mycoplasma pneumoniae infection. What is the best answer?',
    choices: [
      'Cold agglutinins are nonspecific, so validated serologic or molecular methods are preferred when available.',
      'Cold agglutinins confirm every respiratory infection as Mycoplasma pneumoniae.',
      'Cold agglutinins are the same as a Gram stain.',
      'Cold agglutinins detect X and V factor requirements.'
    ],
    answer: 'Cold agglutinins are nonspecific, so validated serologic or molecular methods are preferred when available.',
    explanation: 'Cold agglutinins are an older clue, not a definitive standalone identification method. Learners should connect Mycoplasma testing with current validated lab methods.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-193-mycoplasma-hominis-fried-egg',
    area: 'analytic-bacteriology',
    topic: 'Mycoplasma hominis identification',
    difficulty: 'advanced',
    tags: ['Mycoplasma hominis', 'fried egg colonies', 'arginine hydrolysis', 'genital culture'],
    prompt: 'Tiny “fried-egg” colonies appear on specialized mycoplasma medium from a genital specimen. The organism hydrolyzes arginine but not urea. Which organism is the classic teaching match?',
    choices: [
      'Mycoplasma hominis.',
      'Ureaplasma urealyticum.',
      'Listeria monocytogenes.',
      'Bacillus cereus.'
    ],
    answer: 'Mycoplasma hominis.',
    explanation: 'M. hominis is classically associated with fried-egg colonies and arginine hydrolysis. Mycoplasma workups require specialized media or molecular methods rather than routine Gram stain logic.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-194-ureaplasma-urease',
    area: 'analytic-bacteriology',
    topic: 'Ureaplasma identification',
    difficulty: 'advanced',
    tags: ['Ureaplasma urealyticum', 'urease', 'urea hydrolysis', 'mycoplasma media'],
    prompt: 'A tiny organism from a genital specimen grows on specialized medium and rapidly hydrolyzes urea. Which organism is the classic teaching match?',
    choices: [
      'Ureaplasma urealyticum.',
      'Mycoplasma hominis.',
      'Treponema pallidum.',
      'Corynebacterium diphtheriae.'
    ],
    answer: 'Ureaplasma urealyticum.',
    explanation: 'Ureaplasma is named for its urea-splitting behavior. Urea hydrolysis helps separate it from Mycoplasma hominis in classic teaching workflows.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-195-chlamydia-obligate-intracellular',
    area: 'analytic-bacteriology',
    topic: 'Chlamydia biology',
    difficulty: 'beginner',
    tags: ['Chlamydia', 'obligate intracellular', 'NAAT', 'cell culture'],
    prompt: 'Why is Chlamydia not recovered on routine blood agar or chocolate agar like many other bacteria?',
    choices: [
      'It is an obligate intracellular organism and requires host-cell based or molecular detection methods.',
      'It is a spore-forming rod that requires anaerobic culture.',
      'It is a lactose-fermenting Enterobacterales organism.',
      'It is a yeast that requires fungal media.'
    ],
    answer: 'It is an obligate intracellular organism and requires host-cell based or molecular detection methods.',
    explanation: 'Chlamydia depends on host cells for replication. The bench concept is to match the organism biology with the correct testing system rather than routine agar culture.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-196-chlamydia-naat-specimen',
    area: 'analytic-bacteriology',
    topic: 'Chlamydia trachomatis testing',
    difficulty: 'intermediate',
    tags: ['Chlamydia trachomatis', 'NAAT', 'first-catch urine', 'swab collection'],
    prompt: 'A Chlamydia trachomatis NAAT is ordered. Which collection principle is most important for learners?',
    choices: [
      'Use the specimen type validated by the assay, such as first-catch urine or the appropriate swab source.',
      'Use a dry stool swab because Chlamydia grows best from stool culture.',
      'Use routine blood agar because Chlamydia grows overnight.',
      'Use an anaerobic abscess aspirate for every patient.'
    ],
    answer: 'Use the specimen type validated by the assay, such as first-catch urine or the appropriate swab source.',
    explanation: 'NAAT performance depends on the correct specimen type and collection method. Chlamydia testing is source-specific and assay-specific.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-197-chlamydia-specimen-mismatch',
    area: 'analytic-bacteriology',
    topic: 'Chlamydia specimen handling',
    difficulty: 'advanced',
    tags: ['Chlamydia', 'specimen mismatch', 'NAAT', 'preanalytics'],
    prompt: 'A specimen for Chlamydia testing is submitted from a source not validated for the ordered assay. What is the safest bench response?',
    choices: [
      'Follow the laboratory rejection, recollection, or clarification protocol before testing.',
      'Run the test anyway and ignore specimen requirements.',
      'Plate the specimen on MacConkey agar to recover Chlamydia.',
      'Report the result based only on Gram stain morphology.'
    ],
    answer: 'Follow the laboratory rejection, recollection, or clarification protocol before testing.',
    explanation: 'For Chlamydia testing, specimen source and assay validation matter. The lab should not treat all swabs or fluids as interchangeable.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-198-chlamydia-elementary-reticulate-bodies',
    area: 'analytic-bacteriology',
    topic: 'Chlamydia biology',
    difficulty: 'intermediate',
    tags: ['Chlamydia', 'elementary body', 'reticulate body', 'intracellular cycle'],
    prompt: 'In the Chlamydia life cycle, which teaching concept is most useful?',
    choices: [
      'Elementary bodies are infectious forms, while reticulate bodies are replicative intracellular forms.',
      'Elementary bodies are fungal spores, while reticulate bodies are yeast cells.',
      'Elementary bodies are coagulase enzymes, while reticulate bodies are beta-lactamases.',
      'Elementary bodies are lactose fermenters, while reticulate bodies are oxidase tests.'
    ],
    answer: 'Elementary bodies are infectious forms, while reticulate bodies are replicative intracellular forms.',
    explanation: 'Chlamydia has a distinct intracellular cycle. Elementary and reticulate bodies explain why routine agar culture and Gram stain workflows do not fit well.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-199-chlamydophila-psittaci-bird-exposure',
    area: 'analytic-bacteriology',
    topic: 'Chlamydophila psittaci concepts',
    difficulty: 'advanced',
    tags: ['Chlamydophila psittaci', 'bird exposure', 'atypical bacteria', 'lab safety'],
    prompt: 'A respiratory illness workup includes bird exposure history and concern for Chlamydophila psittaci. Which learning point best fits this organism?',
    choices: [
      'It is an obligate intracellular organism, so testing relies on specialized molecular or serologic workflows rather than routine agar culture.',
      'It is a lactose-fermenting gram-negative rod recovered on MacConkey agar.',
      'It is a coagulase-positive gram-positive coccus.',
      'It is a spore-forming anaerobe recovered only in cooked meat medium.'
    ],
    answer: 'It is an obligate intracellular organism, so testing relies on specialized molecular or serologic workflows rather than routine agar culture.',
    explanation: 'Chlamydophila psittaci belongs in the atypical intracellular organism bucket. Exposure context can guide testing, but the lab still follows validated methods and safety procedures.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-200-atypical-bacteria-bench-first-workflow',
    area: 'analytic-bacteriology',
    topic: 'Atypical bacteria workflow',
    difficulty: 'beginner',
    tags: ['atypical bacteria', 'bench workflow', 'Gram stain limitation', 'testing methods'],
    prompt: 'Which approach best matches a bench-first workflow for organisms such as Mycoplasma, Chlamydia, and spirochetes?',
    choices: [
      'Recognize when routine Gram stain and agar culture are limited, then choose the organism-specific testing pathway.',
      'Assume all bacteria grow overnight on blood agar.',
      'Identify every atypical organism by coagulase testing.',
      'Use only colony color on MacConkey agar for final identification.'
    ],
    answer: 'Recognize when routine Gram stain and agar culture are limited, then choose the organism-specific testing pathway.',
    explanation: 'Atypical bacteria are important because they do not always follow routine culture logic. The learner should connect organism biology, specimen source, and the correct testing method.',
    source: 'Learn Microbes original question bank: Aerobic Gram-Positive Rods, Spirochetes, Mycoplasmas, Ureaplasmas, and Chlamydia',
    status: 'draft'
  },
  {
    id: 'bacteriology-201-anaerobe-oxygen-sensitivity',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic bacteria basics',
    difficulty: 'beginner',
    tags: ['anaerobes', 'oxygen sensitivity', 'bench workflow', 'atmosphere'],
    prompt: 'Why can obligate anaerobes be missed if a specimen is collected or transported with too much oxygen exposure?',
    choices: [
      'Oxygen can injure or kill obligate anaerobes before they are recovered in culture.',
      'Oxygen converts anaerobes into lactose-fermenting Enterobacterales.',
      'Oxygen makes all anaerobes acid-fast.',
      'Oxygen causes anaerobes to become gram-negative diplococci.'
    ],
    answer: 'Oxygen can injure or kill obligate anaerobes before they are recovered in culture.',
    explanation: 'Obligate anaerobes require reduced conditions. Poor collection or transport can expose them to oxygen and lower recovery, even when the organism was present in the specimen.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-202-anaerobe-redox-potential',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic bacteria basics',
    difficulty: 'intermediate',
    tags: ['anaerobes', 'redox potential', 'reduced media', 'oxygen'],
    prompt: 'A student asks why anaerobic media are kept reduced before inoculation. Which principle is the best answer?',
    choices: [
      'Reduced media help maintain a low oxidation-reduction potential that supports anaerobic growth.',
      'Reduced media make all organisms ferment lactose.',
      'Reduced media replace the need for an anaerobic atmosphere.',
      'Reduced media convert spores into gram-negative rods.'
    ],
    answer: 'Reduced media help maintain a low oxidation-reduction potential that supports anaerobic growth.',
    explanation: 'Anaerobic culture depends on both reduced media and an oxygen-limited atmosphere. Low redox conditions help protect oxygen-sensitive organisms during recovery.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-203-deep-aspirate-anaerobe-specimen',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic specimen collection',
    difficulty: 'beginner',
    tags: ['anaerobes', 'abscess', 'aspirate', 'specimen collection'],
    prompt: 'Which specimen is most appropriate when anaerobic culture is needed from a deep abscess?',
    choices: [
      'Aspirated pus or tissue placed into anaerobic transport.',
      'A dry surface swab from the skin over the abscess.',
      'A throat swab in routine aerobic transport.',
      'A urine cup left open at room temperature.'
    ],
    answer: 'Aspirated pus or tissue placed into anaerobic transport.',
    explanation: 'Deep aspirates or tissue are better for anaerobic recovery than superficial swabs. The specimen should be protected from oxygen and transported according to the lab SOP.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-204-anaerobe-swab-caution',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic specimen collection',
    difficulty: 'intermediate',
    tags: ['anaerobes', 'swabs', 'transport', 'preanalytics'],
    prompt: 'Why are routine dry swabs poor choices for many anaerobic cultures?',
    choices: [
      'They can expose organisms to oxygen, dry out the specimen, and collect superficial mixed flora.',
      'They make anaerobes grow too quickly for identification.',
      'They turn anaerobic bacteria into viruses.',
      'They prevent all aerobic organisms from growing.'
    ],
    answer: 'They can expose organisms to oxygen, dry out the specimen, and collect superficial mixed flora.',
    explanation: 'Anaerobic recovery is very preanalytic-dependent. A poor swab can lose fragile anaerobes and add misleading surface flora.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-205-thioglycollate-anaerobe-support',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic media',
    difficulty: 'beginner',
    tags: ['thioglycollate', 'anaerobes', 'reduced media', 'broth'],
    prompt: 'What is the main bench purpose of thioglycollate broth in anaerobe-supporting workflows?',
    choices: [
      'It helps create a reduced environment that can support organisms with different oxygen tolerances.',
      'It confirms all Clostridium species by toxin testing.',
      'It selects only for Neisseria species.',
      'It replaces Gram stain review for all cultures.'
    ],
    answer: 'It helps create a reduced environment that can support organisms with different oxygen tolerances.',
    explanation: 'Thioglycollate broth contains reducing agents that lower oxygen tension. Growth pattern in the tube can support oxygen-tolerance interpretation but is not a final ID alone.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-206-kv-laked-blood-selective-anaerobes',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic selective media',
    difficulty: 'intermediate',
    tags: ['KV agar', 'laked blood agar', 'Bacteroides', 'Prevotella', 'anaerobic media'],
    prompt: 'A lab includes kanamycin-vancomycin laked blood agar in an anaerobic setup. What is the main purpose of this type of medium?',
    choices: [
      'It helps select for certain gram-negative anaerobic rods by suppressing competing organisms.',
      'It selects only for acid-fast bacilli.',
      'It confirms coagulase production.',
      'It differentiates Neisseria species by carbohydrate use.'
    ],
    answer: 'It helps select for certain gram-negative anaerobic rods by suppressing competing organisms.',
    explanation: 'Selective anaerobic media help recover organisms such as Bacteroides, Prevotella, or Porphyromonas from mixed specimens. Media choice guides the branch but does not replace full identification.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-207-pea-anaerobe-selection',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic selective media',
    difficulty: 'intermediate',
    tags: ['PEA agar', 'anaerobes', 'selective media', 'gram-positive anaerobes'],
    prompt: 'Why might phenylethyl alcohol agar be included in an anaerobic culture setup?',
    choices: [
      'It suppresses many gram-negative rods and supports recovery of gram-positive organisms and some anaerobes.',
      'It is the only medium that grows Legionella.',
      'It confirms indole production directly.',
      'It turns all anaerobes oxidase positive.'
    ],
    answer: 'It suppresses many gram-negative rods and supports recovery of gram-positive organisms and some anaerobes.',
    explanation: 'PEA agar is useful when gram-positive organisms may be overgrown by gram-negative rods. In anaerobic setups, it helps organize recovery from mixed flora.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-208-ccfa-cdiff-selective',
    area: 'analytic-bacteriology',
    topic: 'Clostridioides difficile workflow',
    difficulty: 'intermediate',
    tags: ['Clostridioides difficile', 'CCFA', 'stool culture', 'anaerobes'],
    prompt: 'A selective medium is used to recover Clostridioides difficile from stool. Why are selective agents useful in this workflow?',
    choices: [
      'They reduce competing stool flora so C. difficile has a better chance of recovery.',
      'They prove toxin production without further testing.',
      'They replace anaerobic incubation.',
      'They convert spores into yeast cells.'
    ],
    answer: 'They reduce competing stool flora so C. difficile has a better chance of recovery.',
    explanation: 'Stool contains heavy mixed flora. Selective media can support C. difficile recovery, but toxin or algorithm-based testing is a separate part of the workflow.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-209-anaerobe-id-glc-concept',
    area: 'analytic-bacteriology',
    topic: 'Anaerobe identification methods',
    difficulty: 'advanced',
    tags: ['anaerobes', 'GLC', 'volatile fatty acids', 'identification'],
    prompt: 'In classic anaerobe identification, what was the purpose of analyzing volatile fatty acid patterns?',
    choices: [
      'The metabolic acid profile could support identification of anaerobic bacteria.',
      'It detected coagulase production.',
      'It measured X and V factor requirements.',
      'It confirmed acid-fast staining.'
    ],
    answer: 'The metabolic acid profile could support identification of anaerobic bacteria.',
    explanation: 'Some anaerobe workflows used metabolic products such as volatile fatty acids as identification clues. Modern labs may use different systems, but the concept is organism metabolism supporting ID.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-210-clostridium-perfringens-double-zone',
    area: 'analytic-bacteriology',
    topic: 'Clostridium identification',
    difficulty: 'beginner',
    tags: ['Clostridium perfringens', 'double-zone hemolysis', 'lecithinase', 'anaerobes'],
    prompt: 'An anaerobic gram-positive rod produces a double zone of hemolysis on blood agar. Which organism is the classic teaching match?',
    choices: [
      'Clostridium perfringens.',
      'Listeria monocytogenes.',
      'Bacteroides fragilis.',
      'Neisseria meningitidis.'
    ],
    answer: 'Clostridium perfringens.',
    explanation: 'C. perfringens is classically associated with double-zone hemolysis and lecithinase activity. The full workup still includes Gram stain, spore pattern, oxygen tolerance, and lab ID methods.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-211-nagler-lecithinase-clostridium',
    area: 'analytic-bacteriology',
    topic: 'Clostridium identification',
    difficulty: 'advanced',
    tags: ['Nagler reaction', 'lecithinase', 'Clostridium perfringens', 'egg yolk agar'],
    prompt: 'A lecithinase-positive Clostridium-like isolate shows an opaque zone on egg yolk agar that is inhibited by specific antitoxin. What reaction does this describe in classic teaching?',
    choices: [
      'Nagler reaction.',
      'CAMP reaction.',
      'Bile solubility reaction.',
      'Oxidase reaction.'
    ],
    answer: 'Nagler reaction.',
    explanation: 'The Nagler reaction demonstrates lecithinase activity inhibited by antitoxin. It is a classic teaching method for C. perfringens-like identification.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-212-clostridium-spore-location',
    area: 'analytic-bacteriology',
    topic: 'Clostridium morphology',
    difficulty: 'intermediate',
    tags: ['Clostridium', 'spores', 'terminal spores', 'subterminal spores'],
    prompt: 'Why is spore location useful when reviewing a Clostridium-like gram-positive rod?',
    choices: [
      'Terminal or subterminal spores can help narrow the Clostridium branch with other test results.',
      'Spore location confirms Neisseria species.',
      'Spore location replaces anaerobic culture.',
      'Spore location proves the isolate is a virus.'
    ],
    answer: 'Terminal or subterminal spores can help narrow the Clostridium branch with other test results.',
    explanation: 'Spore shape and location are classic morphology clues for clostridia. They support, but do not replace, culture behavior and biochemical or toxin-related workflow.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-213-clostridium-tetani-terminal-spore',
    area: 'analytic-bacteriology',
    topic: 'Clostridium tetani concepts',
    difficulty: 'intermediate',
    tags: ['Clostridium tetani', 'terminal spores', 'drumstick', 'anaerobes'],
    prompt: 'A Clostridium-like organism shows terminal round spores that give a drumstick appearance. Which organism is the classic teaching association?',
    choices: [
      'Clostridium tetani.',
      'Clostridioides difficile.',
      'Cutibacterium acnes.',
      'Bacteroides fragilis.'
    ],
    answer: 'Clostridium tetani.',
    explanation: 'C. tetani is classically associated with terminal spores. This is a morphology clue, not a substitute for safety-aware laboratory handling and appropriate confirmation.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-214-clostridium-botulinum-toxin-workflow',
    area: 'analytic-bacteriology',
    topic: 'Clostridium botulinum concepts',
    difficulty: 'advanced',
    tags: ['Clostridium botulinum', 'toxin', 'reference testing', 'anaerobes'],
    prompt: 'A specimen is submitted because botulinum toxin is a concern. What is the best bench-learning principle?',
    choices: [
      'The workflow centers on toxin detection or reference-lab confirmation, not routine colony appearance alone.',
      'Routine MacConkey growth confirms botulism.',
      'A catalase test alone confirms toxin production.',
      'All botulinum toxin testing is replaced by Gram stain.'
    ],
    answer: 'The workflow centers on toxin detection or reference-lab confirmation, not routine colony appearance alone.',
    explanation: 'C. botulinum is important because of toxin production. Learners should connect suspected toxin-mediated disease with proper specimen handling, safety, and reference testing pathways.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-215-cdiff-toxin-algorithm',
    area: 'analytic-bacteriology',
    topic: 'Clostridioides difficile workflow',
    difficulty: 'intermediate',
    tags: ['Clostridioides difficile', 'toxin testing', 'GDH', 'NAAT', 'stool'],
    prompt: 'Why is Clostridioides difficile testing usually interpreted through a laboratory algorithm rather than culture appearance alone?',
    choices: [
      'The key question involves toxigenic C. difficile, so toxin, antigen, or molecular results must fit the lab algorithm.',
      'C. difficile is identified only by lactose fermentation.',
      'C. difficile is always recovered on modified Thayer-Martin medium.',
      'C. difficile is a gram-negative diplococcus.'
    ],
    answer: 'The key question involves toxigenic C. difficile, so toxin, antigen, or molecular results must fit the lab algorithm.',
    explanation: 'C. difficile workflows often combine GDH, toxin testing, NAAT, or culture depending on the lab. The learner should not equate growth alone with toxin-mediated disease.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-216-cdiff-formed-stool-caution',
    area: 'analytic-bacteriology',
    topic: 'Clostridioides difficile specimen handling',
    difficulty: 'advanced',
    tags: ['Clostridioides difficile', 'stool specimen', 'rejection criteria', 'preanalytics'],
    prompt: 'A formed stool specimen is submitted for C. difficile testing in a lab that rejects formed stool for this assay. What is the safest bench response?',
    choices: [
      'Follow the laboratory rejection or clarification protocol.',
      'Run the assay anyway and ignore specimen criteria.',
      'Plate it on MacConkey agar to confirm toxigenic C. difficile.',
      'Report a result based only on odor.'
    ],
    answer: 'Follow the laboratory rejection or clarification protocol.',
    explanation: 'C. difficile testing depends on appropriate specimen criteria. Labs use rejection and clarification rules to avoid misleading testing on inappropriate specimens.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-217-bacteroides-fragilis-bile-esculin',
    area: 'analytic-bacteriology',
    topic: 'Bacteroides fragilis group identification',
    difficulty: 'beginner',
    tags: ['Bacteroides fragilis group', 'bile', 'esculin', 'anaerobic gram-negative rods'],
    prompt: 'An obligate anaerobic gram-negative rod grows in bile and hydrolyzes esculin. Which group is classically supported by this pattern?',
    choices: [
      'Bacteroides fragilis group.',
      'Fusobacterium necrophorum.',
      'Clostridium perfringens.',
      'Listeria monocytogenes.'
    ],
    answer: 'Bacteroides fragilis group.',
    explanation: 'The Bacteroides fragilis group is classically bile tolerant and esculin positive. This supports the anaerobic gram-negative rod branch but still needs full identification workflow.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-218-bacteroides-aminoglycoside-context',
    area: 'analytic-bacteriology',
    topic: 'Anaerobe susceptibility concepts',
    difficulty: 'advanced',
    tags: ['Bacteroides fragilis group', 'anaerobes', 'aminoglycosides', 'AST'],
    prompt: 'Why do anaerobes require organism-specific antimicrobial susceptibility interpretation instead of assuming rules from aerobic gram-negative rods?',
    choices: [
      'Anaerobes have different growth requirements and resistance patterns, so AST methods and interpretation are specialized.',
      'Anaerobes are never tested for susceptibility.',
      'Anaerobes are interpreted only by colony color.',
      'Anaerobes always use the same Kirby-Bauer disk rules as Enterobacterales.'
    ],
    answer: 'Anaerobes have different growth requirements and resistance patterns, so AST methods and interpretation are specialized.',
    explanation: 'Anaerobe AST is not a simple copy of aerobic workflows. Method, organism group, and current lab standards determine how results are generated and interpreted.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-219-prevotella-porphyromonas-pigment',
    area: 'analytic-bacteriology',
    topic: 'Pigmented anaerobic gram-negative rods',
    difficulty: 'intermediate',
    tags: ['Prevotella', 'Porphyromonas', 'black pigment', 'laked blood agar'],
    prompt: 'An anaerobic gram-negative rod develops dark pigment on laked blood agar after incubation. Which organism groups should move higher in the differential?',
    choices: [
      'Prevotella or Porphyromonas species.',
      'Neisseria or Moraxella species.',
      'Staphylococcus or Micrococcus species.',
      'Mycoplasma or Ureaplasma species.'
    ],
    answer: 'Prevotella or Porphyromonas species.',
    explanation: 'Some Prevotella and Porphyromonas species produce dark pigment on anaerobic media. Pigment is a useful clue when combined with Gram stain, oxygen tolerance, source, and biochemical testing.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-220-fusobacterium-spindle-rods',
    area: 'analytic-bacteriology',
    topic: 'Fusobacterium identification',
    difficulty: 'beginner',
    tags: ['Fusobacterium', 'spindle-shaped rods', 'anaerobic gram-negative rods', 'bench morphology'],
    prompt: 'A Gram stain from an anaerobic culture shows long spindle-shaped gram-negative rods with tapered ends. Which group is the classic teaching match?',
    choices: [
      'Fusobacterium species.',
      'Bacteroides fragilis group.',
      'Enterococcus species.',
      'Bacillus species.'
    ],
    answer: 'Fusobacterium species.',
    explanation: 'Fusobacterium species are classically described as fusiform or spindle-shaped anaerobic gram-negative rods. Morphology helps guide the anaerobic branch.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-221-fusobacterium-necrophorum-lipase',
    area: 'analytic-bacteriology',
    topic: 'Fusobacterium identification',
    difficulty: 'advanced',
    tags: ['Fusobacterium necrophorum', 'lipase', 'anaerobes', 'egg yolk agar'],
    prompt: 'A Fusobacterium-like isolate is lipase positive on egg yolk agar. Which organism is the classic teaching association?',
    choices: [
      'Fusobacterium necrophorum.',
      'Bacteroides vulgatus.',
      'Clostridioides difficile.',
      'Cutibacterium acnes.'
    ],
    answer: 'Fusobacterium necrophorum.',
    explanation: 'Fusobacterium necrophorum is classically associated with lipase positivity. This is an advanced clue that should be read with the full anaerobe identification pattern.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-222-anaerobic-cocci-branch',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic cocci',
    difficulty: 'beginner',
    tags: ['anaerobic cocci', 'Peptostreptococcus', 'Finegoldia', 'mixed anaerobic infections'],
    prompt: 'A deep abscess culture grows gram-positive cocci only under anaerobic conditions. Which learning bucket should the bench consider?',
    choices: [
      'Anaerobic gram-positive cocci.',
      'Neisseria species.',
      'Aerobic spore-forming rods.',
      'Vibrio species.'
    ],
    answer: 'Anaerobic gram-positive cocci.',
    explanation: 'Anaerobic gram-positive cocci can be part of polymicrobial abscess or wound cultures. Source, Gram stain, oxygen tolerance, and culture purity guide interpretation.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-223-veillonella-gram-negative-cocci',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic cocci',
    difficulty: 'intermediate',
    tags: ['Veillonella', 'anaerobic gram-negative cocci', 'anaerobes'],
    prompt: 'An anaerobic isolate appears as gram-negative cocci. Which organism group is a classic teaching possibility?',
    choices: [
      'Veillonella species.',
      'Staphylococcus aureus.',
      'Streptococcus pyogenes.',
      'Bacillus cereus.'
    ],
    answer: 'Veillonella species.',
    explanation: 'Veillonella species are anaerobic gram-negative cocci. This reminds learners that not all anaerobes are rods and not all gram-negative cocci are Neisseria-like organisms.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-224-cutibacterium-acnes-contaminant-caution',
    area: 'analytic-bacteriology',
    topic: 'Cutibacterium acnes interpretation',
    difficulty: 'intermediate',
    tags: ['Cutibacterium acnes', 'Propionibacterium acnes', 'skin flora', 'anaerobes'],
    prompt: 'Cutibacterium acnes grows slowly from one blood culture bottle. What is the best bench-first interpretation habit?',
    choices: [
      'Consider skin flora contamination versus true significance using source, number of positive cultures, timing, and lab criteria.',
      'Report it automatically as Clostridium botulinum.',
      'Assume it is always a gram-negative diplococcus.',
      'Ignore the Gram stain and identify from odor only.'
    ],
    answer: 'Consider skin flora contamination versus true significance using source, number of positive cultures, timing, and lab criteria.',
    explanation: 'C. acnes is common skin flora and may be a contaminant, but it can matter in the right context. Interpretation depends on the full culture pattern and lab rules.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-225-cutibacterium-device-context',
    area: 'analytic-bacteriology',
    topic: 'Cutibacterium acnes interpretation',
    difficulty: 'advanced',
    tags: ['Cutibacterium acnes', 'prosthetic devices', 'slow-growing anaerobes', 'bench interpretation'],
    prompt: 'Why might repeated recovery of Cutibacterium acnes from a prosthetic-device-associated specimen deserve careful review?',
    choices: [
      'It can be associated with device-related infection patterns in the right clinical and culture context.',
      'It is always harmless and never significant.',
      'It is a fast-growing lactose fermenter on MacConkey agar.',
      'It is identified by Neisseria carbohydrate testing.'
    ],
    answer: 'It can be associated with device-related infection patterns in the right clinical and culture context.',
    explanation: 'C. acnes can be normal skin flora, but repeated or sterile-site recovery in a device context may be meaningful. Learners should use source and culture pattern instead of automatic dismissal.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-226-actinomyces-sulfur-granules',
    area: 'analytic-bacteriology',
    topic: 'Actinomyces identification',
    difficulty: 'intermediate',
    tags: ['Actinomyces', 'sulfur granules', 'branching gram-positive rods', 'anaerobes'],
    prompt: 'A specimen contains yellow granular material, and Gram stain shows branching gram-positive rods under anaerobic conditions. Which organism group is the classic teaching match?',
    choices: [
      'Actinomyces species.',
      'Nocardia species.',
      'Neisseria species.',
      'Campylobacter species.'
    ],
    answer: 'Actinomyces species.',
    explanation: 'Actinomyces species are anaerobic branching gram-positive rods classically associated with sulfur granules. They should be separated from Nocardia by oxygen tolerance and acid-fast behavior.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-227-actinomyces-vs-nocardia',
    area: 'analytic-bacteriology',
    topic: 'Branching gram-positive rods',
    difficulty: 'advanced',
    tags: ['Actinomyces', 'Nocardia', 'anaerobic', 'modified acid-fast'],
    prompt: 'A learner compares Actinomyces and Nocardia. Which distinction best supports Actinomyces?',
    choices: [
      'Anaerobic growth and non-acid-fast branching gram-positive rods.',
      'Aerobic growth with weak modified acid-fast positivity.',
      'Oxidase-positive gram-negative diplococci.',
      'Lactose-fermenting gram-negative rods.'
    ],
    answer: 'Anaerobic growth and non-acid-fast branching gram-positive rods.',
    explanation: 'Actinomyces and Nocardia can both be branching gram-positive rods. Actinomyces is generally anaerobic and non-acid-fast, while Nocardia is aerobic and weakly acid-fast.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-228-anaerobe-polymicrobial-context',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic culture interpretation',
    difficulty: 'beginner',
    tags: ['anaerobes', 'polymicrobial culture', 'abscess', 'bench interpretation'],
    prompt: 'Why are anaerobic infections often taught as polymicrobial bench problems?',
    choices: [
      'Deep abscesses and mucosal-source infections often contain mixtures of anaerobes and facultative organisms.',
      'Anaerobes can only grow as pure cultures.',
      'Anaerobes are always viruses.',
      'Anaerobes are never recovered with aerobic organisms.'
    ],
    answer: 'Deep abscesses and mucosal-source infections often contain mixtures of anaerobes and facultative organisms.',
    explanation: 'Anaerobic specimens often come from sites with mixed flora. Culture interpretation requires source awareness, Gram stain review, aerobic and anaerobic growth comparison, and lab reporting rules.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-229-anaerobe-ast-methods',
    area: 'analytic-bacteriology',
    topic: 'Anaerobe susceptibility testing',
    difficulty: 'advanced',
    tags: ['anaerobe AST', 'agar dilution', 'broth microdilution', 'Etest'],
    prompt: 'Why should a learner be cautious about using routine disk diffusion logic for anaerobic susceptibility testing?',
    choices: [
      'Anaerobe AST uses specialized validated methods and interpretive criteria rather than routine aerobic disk rules.',
      'Anaerobes never develop resistance.',
      'Anaerobe susceptibility is determined by Gram stain color only.',
      'Anaerobe AST is replaced by oxidase testing.'
    ],
    answer: 'Anaerobe AST uses specialized validated methods and interpretive criteria rather than routine aerobic disk rules.',
    explanation: 'Anaerobic susceptibility testing requires validated anaerobe methods and standards. The method must match the organism group and lab policy.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
    id: 'bacteriology-230-anaerobe-bench-first-workflow',
    area: 'analytic-bacteriology',
    topic: 'Anaerobic bacteria workflow',
    difficulty: 'beginner',
    tags: ['anaerobes', 'bench workflow', 'specimen source', 'Gram stain', 'media'],
    prompt: 'Which approach best matches a bench-first workflow for anaerobic bacteria?',
    choices: [
      'Start with source and collection quality, then connect Gram stain, oxygen tolerance, media, colony clues, and key tests.',
      'Identify every anaerobe from odor alone.',
      'Use only MacConkey agar for all anaerobes.',
      'Skip specimen quality because anaerobes survive any transport condition.'
    ],
    answer: 'Start with source and collection quality, then connect Gram stain, oxygen tolerance, media, colony clues, and key tests.',
    explanation: 'Anaerobe workups are heavily dependent on preanalytics and pattern recognition. Source, oxygen exposure, Gram stain, media, and key tests work together.',
    source: 'Learn Microbes original question bank: Anaerobic Bacteria',
    status: 'draft'
  },
  {
  id: 'bacteriology-231-cna-urine-staph-saprophyticus',
  area: 'analytic-bacteriology',
  topic: 'Urine culture problem solving',
  difficulty: 'intermediate',
  tags: ['urine culture', 'Staphylococcus saprophyticus', 'novobiocin', 'CNA'],
  prompt: 'A urine culture from a young adult grows catalase-positive gram-positive cocci on blood and CNA agar. The isolate is coagulase negative and novobiocin resistant. Which organism is the best teaching match?',
  choices: [
  'Staphylococcus saprophyticus.',
  'Staphylococcus epidermidis.',
  'Streptococcus agalactiae.',
  'Enterococcus faecalis.'
  ],
  answer: 'Staphylococcus saprophyticus.',
  explanation: 'A coagulase-negative Staphylococcus from urine that is novobiocin resistant supports S. saprophyticus. Source and novobiocin pattern are the key bench clues.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-232-mannitol-salt-staph-aureus-screen',
  area: 'analytic-bacteriology',
  topic: 'Staphylococcus problem solving',
  difficulty: 'beginner',
  tags: ['Staphylococcus aureus', 'mannitol salt agar', 'coagulase', 'screening media'],
  prompt: 'A heavily mixed wound specimen is plated to a selective high-salt medium. Colonies grow with a yellow halo in the medium, and the isolate is catalase positive and coagulase positive. Which organism does this pattern support?',
  choices: [
  'Staphylococcus aureus.',
  'Streptococcus pyogenes.',
  'Micrococcus luteus.',
  'Enterococcus faecalis.'
  ],
  answer: 'Staphylococcus aureus.',
  explanation: 'S. aureus is salt tolerant, often ferments mannitol, and is classically coagulase positive. The workflow combines selective media, colony reaction, and key tests.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-233-enteroinvasive-ecoli-shigella-like',
  area: 'analytic-bacteriology',
  topic: 'Enteric problem solving',
  difficulty: 'advanced',
  tags: ['EIEC', 'Shigella', 'nonmotile', 'enterics'],
  prompt: 'A stool isolate is an oxidase-negative gram-negative rod that is non-lactose fermenting and nonmotile. It gives a Shigella-like screening pattern, but the lab requires confirmation before reporting. What is the best learning point?',
  choices: [
  'Shigella-like patterns require confirmation because other enteric organisms can overlap.',
  'The isolate is confirmed as Salmonella from nonmotility alone.',
  'All non-lactose fermenters from stool are normal flora.',
  'Oxidase-negative results rule out all enteric pathogens.'
  ],
  answer: 'Shigella-like patterns require confirmation because other enteric organisms can overlap.',
  explanation: 'Nonmotile, non-lactose fermenting enterics can create look-alike patterns. Bench-safe interpretation uses the full biochemical, serologic, or molecular workflow.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-234-yersinia-cin-cold-growth',
  area: 'analytic-bacteriology',
  topic: 'Yersinia problem solving',
  difficulty: 'advanced',
  tags: ['Yersinia enterocolitica', 'CIN agar', 'temperature-dependent motility', 'stool culture'],
  prompt: 'A stool workup for a child with abdominal symptoms includes a request for Yersinia. The isolate grows on CIN agar and shows motility at room temperature but not at 37C. Which organism is the best teaching match?',
  choices: [
  'Yersinia enterocolitica.',
  'Vibrio cholerae.',
  'Proteus mirabilis.',
  'Pseudomonas aeruginosa.'
  ],
  answer: 'Yersinia enterocolitica.',
  explanation: 'Yersinia enterocolitica is associated with CIN recovery and temperature-dependent motility. Targeted recovery matters because routine stool culture may not detect every requested pathogen.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-235-o157-sorbitol-macconkey',
  area: 'analytic-bacteriology',
  topic: 'Enteric screening media',
  difficulty: 'intermediate',
  tags: ['E coli O157:H7', 'sorbitol MacConkey', 'stool culture', 'screening'],
  prompt: 'A stool culture has colorless colonies on sorbitol MacConkey agar while many background E. coli-like colonies ferment sorbitol. What is the best interpretation?',
  choices: [
  'The finding is a screening clue for possible E. coli O157:H7 and needs confirmatory workup.',
  'The finding confirms Shigella species without further testing.',
  'The finding rules out all E. coli.',
  'The finding proves the isolate is a nonfermenter.'
  ],
  answer: 'The finding is a screening clue for possible E. coli O157:H7 and needs confirmatory workup.',
  explanation: 'Non-sorbitol fermentation is a useful screen for E. coli O157:H7. It is not a final identification and should be followed by the laboratory confirmation workflow.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-236-cf-nonfermenter-stenotrophomonas',
  area: 'analytic-bacteriology',
  topic: 'Nonfermenter problem solving',
  difficulty: 'advanced',
  tags: ['Stenotrophomonas maltophilia', 'cystic fibrosis', 'oxidase negative', 'maltose'],
  prompt: 'A respiratory culture from a chronic airway workup grows a nonfermenting gram-negative rod. It is oxidase negative, maltose positive, and does not fit Pseudomonas aeruginosa. Which organism should stay high in the differential?',
  choices: [
  'Stenotrophomonas maltophilia.',
  'Vibrio parahaemolyticus.',
  'Salmonella enterica.',
  'Moraxella catarrhalis.'
  ],
  answer: 'Stenotrophomonas maltophilia.',
  explanation: 'Stenotrophomonas is an important oxidase-negative nonfermenter. Maltose use and respiratory source can help move the branch away from Pseudomonas.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-237-dog-bite-capnocytophaga',
  area: 'analytic-bacteriology',
  topic: 'Fastidious gram-negative rod problem solving',
  difficulty: 'advanced',
  tags: ['Capnocytophaga canimorsus', 'dog bite', 'capnophilic', 'fastidious gram-negative rods'],
  prompt: 'A wound culture after dog exposure grows slender gram-negative rods that glide on agar and grow better with added CO2. Which organism group best fits this pattern?',
  choices: [
  'Capnocytophaga species.',
  'Escherichia coli.',
  'Staphylococcus aureus.',
  'Clostridioides difficile.'
  ],
  answer: 'Capnocytophaga species.',
  explanation: 'Capnocytophaga species are fastidious, capnophilic gram-negative rods associated with oral flora and animal exposure contexts. Source and growth conditions are key clues.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-238-hacek-eikenella-pitting',
  area: 'analytic-bacteriology',
  topic: 'HACEK problem solving',
  difficulty: 'intermediate',
  tags: ['Eikenella corrodens', 'HACEK', 'pitting agar', 'oral flora'],
  prompt: 'A fastidious gram-negative rod from an oral-flora-associated specimen pits the agar and does not grow well on MacConkey agar. Which organism is the best teaching match?',
  choices: [
  'Eikenella corrodens.',
  'Pseudomonas aeruginosa.',
  'Proteus mirabilis.',
  'Bacteroides fragilis.'
  ],
  answer: 'Eikenella corrodens.',
  explanation: 'Eikenella corrodens is associated with oral flora and can pit agar. The organism belongs in the fastidious gram-negative rod or HACEK learning bucket.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-239-h-influenzae-x-v-factor-case',
  area: 'analytic-bacteriology',
  topic: 'Haemophilus problem solving',
  difficulty: 'intermediate',
  tags: ['Haemophilus influenzae', 'X factor', 'V factor', 'chocolate agar'],
  prompt: 'A small pleomorphic gram-negative coccobacillus grows on chocolate agar but not sheep blood agar. Factor testing shows a requirement for both X and V factors. Which organism is the best teaching match?',
  choices: [
  'Haemophilus influenzae.',
  'Haemophilus parainfluenzae.',
  'Moraxella catarrhalis.',
  'Neisseria meningitidis.'
  ],
  answer: 'Haemophilus influenzae.',
  explanation: 'H. influenzae classically requires both X and V factors. Chocolate agar supports growth by making these factors available.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-240-group-b-strep-pregnancy-screen',
  area: 'analytic-bacteriology',
  topic: 'Beta-hemolytic streptococci problem solving',
  difficulty: 'beginner',
  tags: ['Group B Streptococcus', 'CAMP test', 'hippurate', 'pregnancy screen'],
  prompt: 'A vaginal-rectal screen grows beta-hemolytic catalase-negative gram-positive cocci. The isolate is CAMP positive and hippurate positive. Which organism group does this support?',
  choices: [
  'Group B Streptococcus.',
  'Group A Streptococcus.',
  'Viridans group streptococci.',
  'Staphylococcus saprophyticus.'
  ],
  answer: 'Group B Streptococcus.',
  explanation: 'Group B Streptococcus is classically beta-hemolytic, CAMP positive, and hippurate positive. The source and test pattern support the branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-241-enterococcus-bile-salt-pyr',
  area: 'analytic-bacteriology',
  topic: 'Enterococcus problem solving',
  difficulty: 'intermediate',
  tags: ['Enterococcus', 'bile esculin', '6.5% NaCl', 'PYR'],
  prompt: 'A gram-positive coccus from urine is catalase negative, bile esculin positive, PYR positive, and grows in 6.5 percent NaCl. Which branch does this pattern support?',
  choices: [
  'Enterococcus species.',
  'Streptococcus pneumoniae.',
  'Staphylococcus aureus.',
  'Neisseria gonorrhoeae.'
  ],
  answer: 'Enterococcus species.',
  explanation: 'Enterococcus is classically bile esculin positive, salt tolerant, and PYR positive. These tests separate it from many other catalase-negative gram-positive cocci.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-242-strep-pneumoniae-optochin-bile-case',
  area: 'analytic-bacteriology',
  topic: 'Alpha-hemolytic streptococci problem solving',
  difficulty: 'beginner',
  tags: ['Streptococcus pneumoniae', 'optochin', 'bile solubility', 'alpha hemolysis'],
  prompt: 'A respiratory culture grows alpha-hemolytic gram-positive cocci with a depressed colony center. The isolate is optochin susceptible and bile soluble. Which organism is the classic teaching match?',
  choices: [
  'Streptococcus pneumoniae.',
  'Viridans group streptococci.',
  'Enterococcus faecalis.',
  'Micrococcus luteus.'
  ],
  answer: 'Streptococcus pneumoniae.',
  explanation: 'S. pneumoniae is classically alpha-hemolytic, optochin susceptible, and bile soluble. Colony appearance supports the same branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-243-neisseria-gonorrhoeae-source-oxidase',
  area: 'analytic-bacteriology',
  topic: 'Neisseria problem solving',
  difficulty: 'intermediate',
  tags: ['Neisseria gonorrhoeae', 'modified Thayer-Martin', 'oxidase', 'gram-negative diplococci'],
  prompt: 'A genital specimen grows oxidase-positive gram-negative diplococci on selective medium. Classic carbohydrate testing shows glucose use but not maltose use. Which organism does this support?',
  choices: [
  'Neisseria gonorrhoeae.',
  'Neisseria meningitidis.',
  'Moraxella catarrhalis.',
  'Kingella kingae.'
  ],
  answer: 'Neisseria gonorrhoeae.',
  explanation: 'N. gonorrhoeae is classically glucose positive and maltose negative. Source, oxidase positivity, diplococcal morphology, and selective medium growth all support the branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-244-gardnerella-clue-cells-case',
  area: 'analytic-bacteriology',
  topic: 'Gram-variable rod problem solving',
  difficulty: 'beginner',
  tags: ['Gardnerella vaginalis', 'clue cells', 'gram-variable rods', 'wet prep'],
  prompt: 'A vaginal wet prep shows epithelial cells heavily coated with small gram-variable coccobacilli. Which organism-centered teaching pattern does this support?',
  choices: [
  'Gardnerella vaginalis.',
  'Staphylococcus aureus.',
  'Bacteroides fragilis.',
  'Streptococcus pneumoniae.'
  ],
  answer: 'Gardnerella vaginalis.',
  explanation: 'Clue cells are epithelial cells coated with bacteria and are classically associated with Gardnerella-centered teaching workflows. This is a lab observation, not a standalone diagnostic claim.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-245-listeria-csf-gbs-mimic',
  area: 'analytic-bacteriology',
  topic: 'Listeria problem solving',
  difficulty: 'intermediate',
  tags: ['Listeria monocytogenes', 'CSF', 'tumbling motility', 'beta hemolysis'],
  prompt: 'A CSF culture grows small beta-hemolytic colonies that could be mistaken for group B Streptococcus, but Gram stain shows short gram-positive rods. The isolate is catalase positive with tumbling motility. Which organism is the best match?',
  choices: [
  'Listeria monocytogenes.',
  'Streptococcus agalactiae.',
  'Corynebacterium diphtheriae.',
  'Bacillus anthracis.'
  ],
  answer: 'Listeria monocytogenes.',
  explanation: 'Listeria can mimic beta-hemolytic streptococci by colony appearance, but Gram-positive rod morphology, catalase positivity, and tumbling motility redirect the workup.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-246-corynebacterium-diphtheria-safety-workflow',
  area: 'analytic-bacteriology',
  topic: 'Corynebacterium problem solving',
  difficulty: 'advanced',
  tags: ['Corynebacterium diphtheriae', 'toxigenicity', 'special media', 'public health'],
  prompt: 'A throat specimen grows pleomorphic gram-positive rods with palisading forms, and Corynebacterium diphtheriae is a concern. What is the safest lab-learning principle?',
  choices: [
  'Follow the lab’s Corynebacterium identification and toxigenicity confirmation workflow.',
  'Report toxin production from Gram stain alone.',
  'Ignore the isolate because all Corynebacterium species are normal flora.',
  'Use MacConkey lactose fermentation to confirm the organism.'
  ],
  answer: 'Follow the lab’s Corynebacterium identification and toxigenicity confirmation workflow.',
  explanation: 'C. diphtheriae-like organisms require careful identification and toxin-related confirmation. Species-like morphology alone does not prove toxigenicity.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-247-cdiff-formed-stool-rejection',
  area: 'analytic-bacteriology',
  topic: 'Clostridioides difficile problem solving',
  difficulty: 'advanced',
  tags: ['Clostridioides difficile', 'formed stool', 'specimen rejection', 'toxin algorithm'],
  prompt: 'A formed stool specimen is submitted for C. difficile testing in a lab that rejects formed stool for the assay. What is the safest bench response?',
  choices: [
  'Follow the laboratory rejection or clarification protocol.',
  'Run the test anyway because all stool specimens are acceptable.',
  'Plate the specimen to MacConkey agar to confirm toxin production.',
  'Report C. difficile based only on odor.'
  ],
  answer: 'Follow the laboratory rejection or clarification protocol.',
  explanation: 'C. difficile testing depends on appropriate specimen criteria and the lab algorithm. Formed stool may be rejected under many protocols to avoid misleading results.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-248-bacteroides-fragilis-bile-esculin-case',
  area: 'analytic-bacteriology',
  topic: 'Anaerobic gram-negative rod problem solving',
  difficulty: 'intermediate',
  tags: ['Bacteroides fragilis group', 'bile esculin', 'anaerobes', 'abscess'],
  prompt: 'An intra-abdominal abscess culture grows anaerobic gram-negative rods. The isolate grows in bile and hydrolyzes esculin. Which organism group is classically supported?',
  choices: [
  'Bacteroides fragilis group.',
  'Fusobacterium necrophorum.',
  'Prevotella species.',
  'Clostridium perfringens.'
  ],
  answer: 'Bacteroides fragilis group.',
  explanation: 'The Bacteroides fragilis group is classically bile tolerant and esculin positive. Source plus anaerobic gram-negative rod pattern supports the branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'bacteriology-249-clostridium-perfringens-double-zone-case',
  area: 'analytic-bacteriology',
  topic: 'Clostridium problem solving',
  difficulty: 'beginner',
  tags: ['Clostridium perfringens', 'double-zone hemolysis', 'lecithinase', 'anaerobes'],
  prompt: 'An anaerobic wound culture grows boxcar-shaped gram-positive rods with double-zone hemolysis and lecithinase activity. Which organism is the classic teaching match?',
  choices: [
  'Clostridium perfringens.',
  'Clostridioides difficile.',
  'Cutibacterium acnes.',
  'Listeria monocytogenes.'
  ],
  answer: 'Clostridium perfringens.',
  explanation: 'C. perfringens is classically associated with boxcar-shaped rods, double-zone hemolysis, and lecithinase activity. These are bench pattern clues.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
    id: 'mycobacteriology-001-nocardia-branch',
    area: 'analytic-mycobacteriology',
    topic: 'Nocardia and aerobic actinomycetes',
    difficulty: 'intermediate',
    tags: ['Nocardia', 'modified acid-fast', 'branching rods', 'aerobic actinomycetes'],
    prompt: 'A respiratory specimen from an immunocompromised patient shows delicate branching Gram-positive rods that are weakly acid-fast by a modified stain. Which organism group should be considered?',
    choices: [
      'Nocardia and related aerobic actinomycetes.',
      'Enterococcus species.',
      'Vibrio species.',
      'Dermatophyte molds only.'
    ],
    answer: 'Nocardia and related aerobic actinomycetes.',
    explanation: 'Branching, beaded Gram-positive rods with modified acid-fast staining support a Nocardia-like branch, especially from pulmonary or disseminated disease contexts.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-002-digestion-decontamination',
    area: 'analytic-mycobacteriology',
    topic: 'AFB specimen processing',
    difficulty: 'intermediate',
    tags: ['AFB culture', 'NALC-NaOH', 'decontamination', 'sputum'],
    prompt: 'A sputum specimen is processed for mycobacterial culture. Which reagent concept best describes the purpose of NALC with NaOH?',
    choices: [
      'Mucolysis plus decontamination to liquefy sputum and reduce competing flora.',
      'Selective enhancement of routine Enterobacterales on MacConkey agar.',
      'Direct confirmation of rifampin resistance by color change.',
      'Permanent staining of acid-fast bacilli on the smear.'
    ],
    answer: 'Mucolysis plus decontamination to liquefy sputum and reduce competing flora.',
    explanation: 'NALC helps digest mucus, while NaOH helps reduce contaminating flora. Processing must balance decontamination with preserving mycobacterial viability.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-003-light-sensitive-media',
    area: 'analytic-mycobacteriology',
    topic: 'AFB culture media handling',
    difficulty: 'advanced',
    tags: ['mycobacteria', 'media handling', 'culture conditions'],
    prompt: 'A technologist prepares mycobacterial culture media that must be protected from excessive light and improper storage. What is the main bench principle?',
    choices: [
      'Culture conditions and media handling can affect recovery and must follow validated mycobacteriology protocols.',
      'Mycobacteria grow best when routine plates are held open at room temperature.',
      'Light exposure is used to sterilize all inoculated mycobacterial cultures.',
      'Mycobacterial recovery is independent of incubation temperature and atmosphere.'
    ],
    answer: 'Culture conditions and media handling can affect recovery and must follow validated mycobacteriology protocols.',
    explanation: 'Mycobacteriology media and incubation conditions are method-dependent. Improper storage, light exposure, or incubation conditions can compromise recovery or interpretation.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-004-rapid-liquid-culture',
    area: 'analytic-mycobacteriology',
    topic: 'AFB culture interpretation',
    difficulty: 'advanced',
    tags: ['AFB culture', 'liquid media', 'solid media', 'rapid growers'],
    prompt: 'An AFB liquid culture flags positive early, while solid media show no visible colonies yet. Which interpretation is most appropriate?',
    choices: [
      'Liquid systems may detect mycobacterial growth before colonies are visible on solid media.',
      'The result proves the organism cannot be acid-fast.',
      'Solid media should always grow before liquid systems.',
      'The culture can be discarded without smear or identification workup.'
    ],
    answer: 'Liquid systems may detect mycobacterial growth before colonies are visible on solid media.',
    explanation: 'Liquid mycobacterial systems can detect growth earlier than solid media. Positive signals still require smear, identification, contamination checks, and appropriate follow-up.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-005-mtb-naat',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium tuberculosis complex detection',
    difficulty: 'intermediate',
    tags: ['MTB complex', 'NAAT', 'AFB smear', 'respiratory specimen'],
    prompt: 'An AFB smear-positive respiratory specimen is being evaluated for possible tuberculosis. Which same-day method can support rapid detection of Mycobacterium tuberculosis complex?',
    choices: [
      'A validated nucleic acid amplification test for MTB complex.',
      'Coagulase testing from sheep blood agar.',
      'Germ tube testing.',
      'Optochin susceptibility alone.'
    ],
    answer: 'A validated nucleic acid amplification test for MTB complex.',
    explanation: 'NAAT can rapidly support detection of MTB complex from appropriate specimens. Smear, culture, molecular testing, and biosafety workflow each answer different parts of the question.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-006-photochromogen',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial pigment classification',
    difficulty: 'beginner',
    tags: ['photochromogen', 'scotochromogen', 'mycobacteria', 'pigment'],
    prompt: 'A mycobacterial isolate produces yellow-orange pigment only after light exposure. Which pigment category does this describe?',
    choices: [
      'Photochromogen.',
      'Scotochromogen.',
      'Nonchromogen.',
      'Dermatophyte.'
    ],
    answer: 'Photochromogen.',
    explanation: 'Photochromogens develop pigment after light exposure. Scotochromogens produce pigment in the dark, and nonchromogens do not produce strong pigment under those conditions.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'draft'
  },
  {
    id: 'mycobacteriology-007-marinum-clue',
    area: 'analytic-mycobacteriology',
    topic: 'Nontuberculous mycobacteria',
    difficulty: 'intermediate',
    tags: ['Mycobacterium marinum', 'photochromogen', 'skin infection', 'aquatic exposure'],
    prompt: 'A patient has a chronic skin lesion after aquarium exposure. A photochromogenic mycobacterium grows best at cooler temperatures. Which organism is a classic consideration?',
    choices: [
      'Mycobacterium marinum.',
      'Mycobacterium tuberculosis complex.',
      'Neisseria gonorrhoeae.',
      'Enterococcus faecalis.'
    ],
    answer: 'Mycobacterium marinum.',
    explanation: 'M. marinum is associated with aquatic exposure, skin and soft tissue infection, photochromogenic pigment, and cooler incubation preference.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-008-bcg-species',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium bovis BCG',
    difficulty: 'beginner',
    tags: ['BCG', 'Mycobacterium bovis', 'vaccine'],
    prompt: 'The BCG vaccine strain used for tuberculosis prevention is derived from which mycobacterial species?',
    choices: [
      'Mycobacterium bovis.',
      'Mycobacterium kansasii.',
      'Mycobacterium marinum.',
      'Nocardia asteroides complex.'
    ],
    answer: 'Mycobacterium bovis.',
    explanation: 'BCG is an attenuated strain derived from M. bovis. This is a high-yield connection between vaccination and the MTB complex group.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycobacteriology',
    status: 'published'
  },
  {
    id: 'mycobacteriology-009-mycobacteria-culture-incubation',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial culture methods',
    difficulty: 'beginner',
    tags: ['mycobacteria', 'AFB culture', 'special media', 'incubation'],
    prompt: 'Why should suspected mycobacteria not be evaluated only by routine 24 to 48 hour blood agar culture?',
    choices: [
      'Many mycobacteria require special media and longer incubation than routine bacterial cultures.',
      'Mycobacteria grow only on chocolate agar overnight.',
      'Routine blood agar changes acid-fast organisms into gram-positive cocci.',
      'Mycobacteria are always recovered faster than Enterobacterales.'
    ],
    answer: 'Many mycobacteria require special media and longer incubation than routine bacterial cultures.',
    explanation: 'Mycobacteria have different growth requirements and often grow slowly. AFB culture workflows use special media, processing steps, and longer incubation expectations.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'published'
  },
  {
    id: 'mycobacteriology-010-afb-specimen-quality',
    area: 'analytic-mycobacteriology',
    topic: 'AFB specimen collection',
    difficulty: 'beginner',
    tags: ['AFB culture', 'sputum', 'specimen quality', 'preanalytics'],
    prompt: 'A sputum specimen is submitted for AFB culture. Which collection principle best supports recovery of mycobacteria?',
    choices: [
      'Collect a true lower respiratory specimen according to the lab protocol, often using early-morning specimens when requested.',
      'Submit saliva because it is easier for the patient to produce.',
      'Submit a dry throat swab because mycobacteria grow best from swabs.',
      'Hold the specimen uncovered at room temperature until batching is convenient.'
    ],
    answer: 'Collect a true lower respiratory specimen according to the lab protocol, often using early-morning specimens when requested.',
    explanation: 'AFB recovery depends heavily on specimen quality. Saliva or poorly collected material can lower yield and add contaminating flora.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-011-digestion-decontamination-purpose',
    area: 'analytic-mycobacteriology',
    topic: 'AFB specimen processing',
    difficulty: 'beginner',
    tags: ['NALC-NaOH', 'digestion decontamination', 'AFB culture', 'specimen processing'],
    prompt: 'Why are many nonsterile respiratory specimens digested and decontaminated before mycobacterial culture?',
    choices: [
      'To liquefy mucus and reduce competing normal flora while preserving mycobacteria as much as possible.',
      'To make all bacteria acid-fast before staining.',
      'To replace the need for mycobacterial media.',
      'To convert mycobacteria into lactose fermenters.'
    ],
    answer: 'To liquefy mucus and reduce competing normal flora while preserving mycobacteria as much as possible.',
    explanation: 'Digestion-decontamination helps process thick respiratory material and suppress faster-growing contaminants. The step must be controlled because harsh exposure can also reduce mycobacterial recovery.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-012-naoh-overexposure-risk',
    area: 'analytic-mycobacteriology',
    topic: 'AFB specimen processing',
    difficulty: 'intermediate',
    tags: ['NaOH', 'decontamination', 'AFB culture', 'preanalytics'],
    prompt: 'A learner asks why the decontamination step cannot simply use stronger alkali for a longer time. What is the best answer?',
    choices: [
      'Overexposure can kill or injure mycobacteria and cause false-negative cultures.',
      'Longer alkali exposure makes mycobacteria grow overnight.',
      'Stronger alkali converts all contaminants into mycobacteria.',
      'The alkali step confirms species identification.'
    ],
    answer: 'Overexposure can kill or injure mycobacteria and cause false-negative cultures.',
    explanation: 'Decontamination is a balance. It must reduce normal flora without destroying the target organism, so timing and concentration are controlled by SOP.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-013-acid-fast-cell-wall',
    area: 'analytic-mycobacteriology',
    topic: 'Acid-fast staining',
    difficulty: 'beginner',
    tags: ['acid-fast stain', 'mycolic acids', 'AFB', 'cell wall'],
    prompt: 'Why do mycobacteria retain acid-fast stains after acid-alcohol decolorization?',
    choices: [
      'Their lipid-rich, mycolic acid-containing cell wall retains the primary stain.',
      'They have no cell wall at all.',
      'They produce coagulase on blood agar.',
      'They ferment lactose rapidly on MacConkey agar.'
    ],
    answer: 'Their lipid-rich, mycolic acid-containing cell wall retains the primary stain.',
    explanation: 'The mycobacterial cell wall is waxy and lipid rich. That structure explains acid-fast staining and why mycobacteria do not behave like routine gram-positive or gram-negative bacteria.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-014-ziehl-kinyoun-color-pattern',
    area: 'analytic-mycobacteriology',
    topic: 'Acid-fast staining',
    difficulty: 'beginner',
    tags: ['Ziehl-Neelsen', 'Kinyoun', 'acid-fast stain', 'AFB microscopy'],
    prompt: 'In a classic carbol fuchsin acid-fast stain, what does a positive AFB smear generally show?',
    choices: [
      'Red or fuchsia slender rods against a contrasting background.',
      'Purple cocci in clusters only.',
      'Green yeast cells with budding.',
      'Colorless rods that disappear after counterstain.'
    ],
    answer: 'Red or fuchsia slender rods against a contrasting background.',
    explanation: 'Carbol fuchsin stains acid-fast bacilli red or fuchsia after decolorization. The smear result supports AFB detection, but it does not provide species-level identification by itself.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-015-fluorochrome-afb-screen',
    area: 'analytic-mycobacteriology',
    topic: 'Fluorochrome AFB staining',
    difficulty: 'intermediate',
    tags: ['auramine-rhodamine', 'fluorochrome stain', 'AFB microscopy', 'screening'],
    prompt: 'Why do many labs use fluorochrome staining as an AFB smear screening method?',
    choices: [
      'Fluorescent AFB can be scanned efficiently at lower magnification than traditional brightfield acid-fast stains.',
      'Fluorochrome staining confirms drug susceptibility.',
      'Fluorochrome staining replaces all culture and molecular testing.',
      'Fluorochrome staining detects coagulase production.'
    ],
    answer: 'Fluorescent AFB can be scanned efficiently at lower magnification than traditional brightfield acid-fast stains.',
    explanation: 'Fluorochrome stains help screen smears efficiently. Positive smears still require correlation with culture, NAAT, and the laboratory identification workflow.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-016-afb-smear-not-species-id',
    area: 'analytic-mycobacteriology',
    topic: 'AFB smear interpretation',
    difficulty: 'beginner',
    tags: ['AFB smear', 'microscopy', 'species identification', 'bench interpretation'],
    prompt: 'An AFB smear is positive from a respiratory specimen. What is the safest learning interpretation?',
    choices: [
      'Acid-fast bacilli are present, but smear microscopy alone does not identify the species.',
      'The organism is definitively Mycobacterium tuberculosis based on smear alone.',
      'The organism is confirmed as a rapid-growing nontuberculous mycobacterium.',
      'The specimen no longer needs culture or molecular follow-up.'
    ],
    answer: 'Acid-fast bacilli are present, but smear microscopy alone does not identify the species.',
    explanation: 'AFB smear positivity is an important finding, but it is not species identification. Culture, NAAT, or other ID methods are needed to determine what organism is present.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-017-afb-smear-grading-concept',
    area: 'analytic-mycobacteriology',
    topic: 'AFB smear interpretation',
    difficulty: 'intermediate',
    tags: ['AFB smear grading', 'microscopy', 'semiquantitative reporting', 'bench interpretation'],
    prompt: 'What is the main purpose of grading an AFB smear as rare, few, moderate, or numerous according to the lab method?',
    choices: [
      'To communicate the approximate organism burden seen microscopically.',
      'To identify the exact mycobacterial species.',
      'To determine the final antimicrobial susceptibility pattern.',
      'To replace culture incubation.'
    ],
    answer: 'To communicate the approximate organism burden seen microscopically.',
    explanation: 'AFB smear grading is semiquantitative. It tells the team how many organisms were seen by microscopy, but it does not replace identification or susceptibility testing.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-018-afb-culture-needed-after-naat',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial culture workflow',
    difficulty: 'intermediate',
    tags: ['AFB culture', 'NAAT', 'Mycobacterium tuberculosis complex', 'susceptibility testing'],
    prompt: 'A NAAT detects Mycobacterium tuberculosis complex from a respiratory specimen. Why is culture still important?',
    choices: [
      'Culture supports organism recovery, full identification workflow, and susceptibility testing.',
      'Culture is unnecessary because NAAT always gives complete susceptibility results.',
      'Culture converts mycobacteria into visible gram-positive cocci.',
      'Culture is used only for viruses.'
    ],
    answer: 'Culture supports organism recovery, full identification workflow, and susceptibility testing.',
    explanation: 'Molecular tests can provide rapid information, but culture remains important for recovery, confirmation, epidemiology, and susceptibility workflows.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-019-lowenstein-jensen-medium',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial media',
    difficulty: 'beginner',
    tags: ['Lowenstein-Jensen', 'mycobacterial culture', 'egg-based medium', 'AFB culture'],
    prompt: 'Which medium is classically used as an egg-based medium for mycobacterial culture?',
    choices: [
      'Lowenstein-Jensen medium.',
      'MacConkey agar.',
      'Chocolate agar only.',
      'Sabouraud agar.'
    ],
    answer: 'Lowenstein-Jensen medium.',
    explanation: 'Lowenstein-Jensen is a classic solid medium for mycobacteria. Mycobacterial culture usually requires special media and longer incubation than routine bacterial culture.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-020-middlebrook-transparent-agar',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial media',
    difficulty: 'intermediate',
    tags: ['Middlebrook agar', '7H10', '7H11', 'colony morphology', 'AFB culture'],
    prompt: 'Why are Middlebrook 7H10 or 7H11 agar plates useful in mycobacterial culture workflows?',
    choices: [
      'They are transparent agar-based media that allow earlier observation of mycobacterial colony morphology.',
      'They are selective only for Neisseria species.',
      'They are used to ferment lactose for enteric identification.',
      'They are viral transport media.'
    ],
    answer: 'They are transparent agar-based media that allow earlier observation of mycobacterial colony morphology.',
    explanation: 'Middlebrook media support mycobacterial growth and allow colony review on solid media. They are part of a specialized AFB culture workflow, not routine aerobic plating.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-021-culture-incubation-time',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterial culture incubation',
    difficulty: 'beginner',
    tags: ['AFB culture', 'incubation', 'slow growers', 'culture holding time'],
    prompt: 'Why are mycobacterial cultures held longer than routine bacterial cultures before being called negative?',
    choices: [
      'Many mycobacteria grow slowly and may take weeks to become detectable.',
      'Mycobacteria grow only after routine plates dry out completely.',
      'Mycobacteria must first become fungal colonies.',
      'Routine bacteria and mycobacteria always grow at the same speed.'
    ],
    answer: 'Many mycobacteria grow slowly and may take weeks to become detectable.',
    explanation: 'Mycobacterial culture timelines are much longer than routine aerobic culture timelines. Slow growth is a core concept in AFB bench workflow.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-022-rapid-grower-definition',
    area: 'analytic-mycobacteriology',
    topic: 'Rapidly growing mycobacteria',
    difficulty: 'beginner',
    tags: ['rapid growers', 'nontuberculous mycobacteria', 'Runyon group IV', 'culture growth rate'],
    prompt: 'In mycobacteriology, what does “rapid grower” generally mean?',
    choices: [
      'A mycobacterium that can produce visible growth within about 7 days under appropriate conditions.',
      'A mycobacterium that grows faster than Escherichia coli on routine MacConkey agar.',
      'A mycobacterium that cannot stain acid-fast.',
      'A mycobacterium that grows only inside host cells.'
    ],
    answer: 'A mycobacterium that can produce visible growth within about 7 days under appropriate conditions.',
    explanation: 'Rapid-growing mycobacteria grow faster than classic slow growers, but they are still acid-fast organisms with specialized identification and susceptibility workflows.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-023-runyon-pigment-groups',
    area: 'analytic-mycobacteriology',
    topic: 'Runyon classification',
    difficulty: 'intermediate',
    tags: ['Runyon classification', 'photochromogen', 'scotochromogen', 'nonchromogen'],
    prompt: 'What does the Runyon pigment-based classification help learners organize?',
    choices: [
      'Nontuberculous mycobacteria by pigment production and growth rate patterns.',
      'Enterobacterales by lactose fermentation only.',
      'Staphylococci by coagulase reaction only.',
      'Fungi by germ tube production only.'
    ],
    answer: 'Nontuberculous mycobacteria by pigment production and growth rate patterns.',
    explanation: 'Runyon groups are a classic way to organize nontuberculous mycobacteria. The system uses pigment behavior and growth rate as learning anchors.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-024-photochromogen-concept',
    area: 'analytic-mycobacteriology',
    topic: 'Runyon classification',
    difficulty: 'intermediate',
    tags: ['photochromogen', 'Runyon group I', 'Mycobacterium kansasii', 'pigment'],
    prompt: 'A mycobacterial isolate is nonpigmented in the dark but becomes pigmented after light exposure. What is the classic term for this pattern?',
    choices: [
      'Photochromogen.',
      'Scotochromogen.',
      'Nonchromogen.',
      'Obligate intracellular organism.'
    ],
    answer: 'Photochromogen.',
    explanation: 'Photochromogens produce pigment after light exposure. Mycobacterium kansasii is a classic teaching example in this group.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-025-scotochromogen-concept',
    area: 'analytic-mycobacteriology',
    topic: 'Runyon classification',
    difficulty: 'intermediate',
    tags: ['scotochromogen', 'Runyon group II', 'Mycobacterium gordonae', 'pigment'],
    prompt: 'A mycobacterial isolate produces pigment even when incubated in the dark. What is the classic term for this pattern?',
    choices: [
      'Scotochromogen.',
      'Photochromogen.',
      'Nonchromogen.',
      'Beta-hemolytic streptococcus.'
    ],
    answer: 'Scotochromogen.',
    explanation: 'Scotochromogens produce pigment without needing light exposure. Pigment behavior is one part of the traditional nontuberculous mycobacteria learning workflow.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-026-mtb-niacin-nitrate-pattern',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium tuberculosis complex identification',
    difficulty: 'intermediate',
    tags: ['Mycobacterium tuberculosis complex', 'niacin', 'nitrate reduction', 'biochemical tests'],
    prompt: 'A slow-growing nonpigmented mycobacterium is niacin positive and nitrate reduction positive. Which organism is the classic teaching match?',
    choices: [
      'Mycobacterium tuberculosis.',
      'Mycobacterium gordonae.',
      'Mycobacterium marinum.',
      'Mycobacterium abscessus complex.'
    ],
    answer: 'Mycobacterium tuberculosis.',
    explanation: 'M. tuberculosis is classically taught as niacin positive and nitrate reduction positive. Modern labs may use molecular or MALDI-supported workflows, but the biochemical pattern remains a useful study anchor.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-027-mtb-complex-not-single-species',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium tuberculosis complex',
    difficulty: 'beginner',
    tags: ['Mycobacterium tuberculosis complex', 'MTBC', 'identification', 'bench workflow'],
    prompt: 'A report says Mycobacterium tuberculosis complex. What is the best learning interpretation?',
    choices: [
      'The result refers to a related group that includes M. tuberculosis and other complex members.',
      'The result always means the isolate is Mycobacterium gordonae.',
      'The result means the smear was negative for acid-fast bacilli.',
      'The result identifies a gram-positive coccus.'
    ],
    answer: 'The result refers to a related group that includes M. tuberculosis and other complex members.',
    explanation: 'MTB complex is a group-level term. Depending on the lab workflow, further differentiation or public health handling may follow.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-028-m-bovis-pattern-caution',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium tuberculosis complex differentiation',
    difficulty: 'advanced',
    tags: ['Mycobacterium bovis', 'MTBC', 'niacin', 'nitrate', 'PZA resistance'],
    prompt: 'Why does Mycobacterium bovis matter as a separate teaching point inside the M. tuberculosis complex?',
    choices: [
      'It can differ from M. tuberculosis in biochemical and susceptibility patterns, so complex members are not always interchangeable.',
      'It is a rapid-growing scotochromogen recovered only from tap water.',
      'It is a yeast that requires fungal media.',
      'It is identified by coagulase testing.'
    ],
    answer: 'It can differ from M. tuberculosis in biochemical and susceptibility patterns, so complex members are not always interchangeable.',
    explanation: 'M. bovis belongs to the MTB complex but has distinguishing laboratory features. The learner should avoid treating every complex member as identical in advanced workflows.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-029-mac-nonchromogen',
    area: 'analytic-mycobacteriology',
    topic: 'Nontuberculous mycobacteria',
    difficulty: 'beginner',
    tags: ['Mycobacterium avium complex', 'MAC', 'nonchromogen', 'NTM'],
    prompt: 'A slow-growing nontuberculous mycobacterium is nonchromogenic and belongs to a common opportunistic complex. Which group is the classic teaching match?',
    choices: [
      'Mycobacterium avium complex.',
      'Mycobacterium kansasii.',
      'Mycobacterium marinum.',
      'Mycobacterium gordonae.'
    ],
    answer: 'Mycobacterium avium complex.',
    explanation: 'MAC is classically taught as a slow-growing nonchromogenic nontuberculous mycobacterial group. Clinical significance depends on source, quantity, repeat recovery, and lab criteria.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-030-ntm-significance-context',
    area: 'analytic-mycobacteriology',
    topic: 'Nontuberculous mycobacteria interpretation',
    difficulty: 'intermediate',
    tags: ['NTM', 'culture interpretation', 'contamination', 'clinical significance'],
    prompt: 'A single nontuberculous mycobacterium is recovered from a nonsterile respiratory specimen. What is the best bench-first interpretation habit?',
    choices: [
      'Interpret significance using source, smear status, quantity, repeat recovery, organism identity, and lab criteria.',
      'Assume every NTM isolate is always Mycobacterium tuberculosis.',
      'Ignore all NTM isolates because they are never important.',
      'Report species based only on colony color.'
    ],
    answer: 'Interpret significance using source, smear status, quantity, repeat recovery, organism identity, and lab criteria.',
    explanation: 'NTM may represent contamination, colonization, or clinically relevant infection depending on the situation. The lab workflow should not overcall or dismiss them from one clue alone.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-031-m-kansasii-photochromogen',
    area: 'analytic-mycobacteriology',
    topic: 'Photochromogenic mycobacteria',
    difficulty: 'intermediate',
    tags: ['Mycobacterium kansasii', 'photochromogen', 'nontuberculous mycobacteria', 'pigment'],
    prompt: 'A slow-growing mycobacterium becomes pigmented after light exposure and has a photochromogenic pattern. Which organism is the classic teaching example?',
    choices: [
      'Mycobacterium kansasii.',
      'Mycobacterium avium complex.',
      'Mycobacterium abscessus complex.',
      'Mycobacterium gordonae.'
    ],
    answer: 'Mycobacterium kansasii.',
    explanation: 'M. kansasii is a classic photochromogen. Pigment production helps organize the NTM branch, but full identification uses the lab’s validated method.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-032-marinum-cool-temperature',
    area: 'analytic-mycobacteriology',
    topic: 'Photochromogenic mycobacteria',
    difficulty: 'advanced',
    tags: ['Mycobacterium marinum', 'cool temperature', 'fish tank', 'photochromogen'],
    prompt: 'A skin specimen after aquarium exposure is submitted for AFB culture. Why should the lab know if Mycobacterium marinum is suspected?',
    choices: [
      'It grows better at lower incubation temperatures than many routine mycobacterial cultures.',
      'It requires only MacConkey agar in ambient air.',
      'It is a gram-negative diplococcus recovered on modified Thayer-Martin medium.',
      'It grows only as an obligate intracellular organism.'
    ],
    answer: 'It grows better at lower incubation temperatures than many routine mycobacterial cultures.',
    explanation: 'M. marinum is associated with aquatic exposure and lower-temperature growth. Correct suspicion helps the lab select the right incubation conditions.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-033-gordonae-tap-water-context',
    area: 'analytic-mycobacteriology',
    topic: 'Scotochromogenic mycobacteria',
    difficulty: 'intermediate',
    tags: ['Mycobacterium gordonae', 'tap water bacillus', 'scotochromogen', 'contamination'],
    prompt: 'Mycobacterium gordonae is often nicknamed the “tap water bacillus.” What does this teach learners?',
    choices: [
      'Some mycobacteria are environmental and must be interpreted carefully with specimen source and repeat recovery.',
      'It is always the cause of tuberculosis.',
      'It is a rapid lactose fermenter on MacConkey agar.',
      'It is identified by coagulase positivity.'
    ],
    answer: 'Some mycobacteria are environmental and must be interpreted carefully with specimen source and repeat recovery.',
    explanation: 'M. gordonae is commonly environmental and may represent contamination. Interpretation depends on the full culture context, not the organism name alone.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-034-haemophilum-hemin-low-temp',
    area: 'analytic-mycobacteriology',
    topic: 'Fastidious nontuberculous mycobacteria',
    difficulty: 'advanced',
    tags: ['Mycobacterium haemophilum', 'hemin', 'lower temperature', 'NTM'],
    prompt: 'A suspected cutaneous nontuberculous mycobacterium may require hemin or iron supplementation and lower-temperature incubation. Which organism is the classic teaching match?',
    choices: [
      'Mycobacterium haemophilum.',
      'Mycobacterium tuberculosis.',
      'Mycobacterium gordonae.',
      'Mycobacterium avium complex.'
    ],
    answer: 'Mycobacterium haemophilum.',
    explanation: 'M. haemophilum is fastidious and may need hemin or iron and lower incubation temperature. Suspicion matters because routine conditions may miss it.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-035-m-ulcerans-lower-temperature',
    area: 'analytic-mycobacteriology',
    topic: 'Slow-growing nontuberculous mycobacteria',
    difficulty: 'advanced',
    tags: ['Mycobacterium ulcerans', 'lower temperature', 'skin specimen', 'NTM'],
    prompt: 'Why might Mycobacterium ulcerans require special attention to incubation temperature?',
    choices: [
      'It grows best at lower temperatures than standard 37C incubation.',
      'It grows only on TCBS agar.',
      'It is a coagulase-positive gram-positive coccus.',
      'It is always recovered overnight on blood agar.'
    ],
    answer: 'It grows best at lower temperatures than standard 37C incubation.',
    explanation: 'Some mycobacteria need nonroutine incubation temperatures. If the organism is suspected, the lab must set up conditions that support recovery.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-036-rapid-growers-wound-context',
    area: 'analytic-mycobacteriology',
    topic: 'Rapidly growing mycobacteria',
    difficulty: 'intermediate',
    tags: ['rapid-growing mycobacteria', 'wound culture', 'Mycobacterium fortuitum complex', 'Mycobacterium abscessus complex'],
    prompt: 'A wound culture grows acid-fast colonies within a week. Which group should the learner consider?',
    choices: [
      'Rapidly growing nontuberculous mycobacteria.',
      'Mycobacterium tuberculosis complex only.',
      'Treponema pallidum.',
      'Neisseria gonorrhoeae.'
    ],
    answer: 'Rapidly growing nontuberculous mycobacteria.',
    explanation: 'Visible AFB growth within about a week supports the rapid-growing mycobacteria branch. These organisms have their own identification and AST considerations.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-037-m-leprae-no-routine-culture',
    area: 'analytic-mycobacteriology',
    topic: 'Mycobacterium leprae testing concepts',
    difficulty: 'beginner',
    tags: ['Mycobacterium leprae', 'culture limitation', 'AFB', 'molecular testing'],
    prompt: 'Why is Mycobacterium leprae not worked up by routine artificial mycobacterial culture like many other AFB?',
    choices: [
      'It cannot be grown on routine artificial culture media used in clinical laboratories.',
      'It is a rapid lactose fermenter on MacConkey agar.',
      'It is identified by coagulase testing.',
      'It grows only as a yeast on Sabouraud agar.'
    ],
    answer: 'It cannot be grown on routine artificial culture media used in clinical laboratories.',
    explanation: 'M. leprae does not fit the standard AFB culture workflow. Identification relies on specialized clinical, histologic, molecular, or reference methods depending on the setting.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-038-ppd-igra-immune-response',
    area: 'analytic-mycobacteriology',
    topic: 'Tuberculosis immunologic testing',
    difficulty: 'intermediate',
    tags: ['PPD', 'IGRA', 'tuberculosis testing', 'immune response'],
    prompt: 'What is the best educational interpretation of a positive PPD or IGRA result?',
    choices: [
      'It shows an immune response to TB-related antigens but does not by itself prove active disease.',
      'It identifies the exact mycobacterial species growing in culture.',
      'It replaces AFB smear, culture, and NAAT in every situation.',
      'It confirms antimicrobial susceptibility.'
    ],
    answer: 'It shows an immune response to TB-related antigens but does not by itself prove active disease.',
    explanation: 'PPD and IGRA are immune-response tests. They are interpreted in clinical context and are not the same as direct organism detection from a specimen.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
    id: 'mycobacteriology-039-afb-biosafety-escalation',
    area: 'analytic-mycobacteriology',
    topic: 'AFB laboratory safety',
    difficulty: 'advanced',
    tags: ['AFB safety', 'aerosols', 'Mycobacterium tuberculosis complex', 'lab protocol'],
    prompt: 'An AFB-positive respiratory specimen raises concern for Mycobacterium tuberculosis complex. What is the best learner-safe bench principle?',
    choices: [
      'Follow the laboratory biosafety and escalation protocol before additional manipulation.',
      'Open the culture repeatedly on the open bench to inspect colony odor.',
      'Handle it like routine E. coli because all AFB are low-risk contaminants.',
      'Skip notification because smear positivity is never important.'
    ],
    answer: 'Follow the laboratory biosafety and escalation protocol before additional manipulation.',
    explanation: 'AFB workflows include aerosol and biosafety considerations. Learners should know when to pause, protect staff, and follow the laboratory’s TB safety pathway.',
    source: 'Learn Microbes original question bank: Mycobacteria',
    status: 'published'
  },
  {
  id: 'mycobacteriology-040-afb-smear-naat-culture-case',
  area: 'analytic-mycobacteriology',
  topic: 'AFB problem solving',
  difficulty: 'intermediate',
  tags: ['AFB smear', 'NAAT', 'culture', 'Mycobacterium tuberculosis complex'],
  prompt: 'A respiratory specimen is AFB smear positive and NAAT positive for Mycobacterium tuberculosis complex. Why should culture still continue?',
  choices: [
  'Culture supports organism recovery, confirmation, and susceptibility workflow.',
  'Culture is unnecessary because smear gives species and susceptibility.',
  'Culture converts AFB into gram-positive cocci.',
  'Culture is used only for viruses.'
  ],
  answer: 'Culture supports organism recovery, confirmation, and susceptibility workflow.',
  explanation: 'AFB smear and NAAT can provide rapid information, but culture remains important for recovery, additional identification, and susceptibility testing.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'mycobacteriology-041-marinum-aquarium-low-temp-case',
  area: 'analytic-mycobacteriology',
  topic: 'Nontuberculous mycobacteria problem solving',
  difficulty: 'advanced',
  tags: ['Mycobacterium marinum', 'aquarium exposure', 'low temperature', 'photochromogen'],
  prompt: 'A skin specimen after aquarium exposure is submitted for AFB culture. The organism grows better at lower temperature and becomes pigmented after light exposure. Which organism is the classic teaching match?',
  choices: [
  'Mycobacterium marinum.',
  'Mycobacterium tuberculosis.',
  'Mycobacterium gordonae.',
  'Mycobacterium abscessus complex.'
  ],
  answer: 'Mycobacterium marinum.',
  explanation: 'M. marinum is associated with aquatic exposure, lower-temperature growth, and photochromogenic behavior. Correct suspicion helps the lab choose proper incubation conditions.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
    id: 'virology-001-cell-culture-cpe',
    area: 'analytic-virology',
    topic: 'Viral culture interpretation',
    difficulty: 'beginner',
    tags: ['viral culture', 'CPE', 'cell culture'],
    prompt: 'A cell culture monolayer develops rounding, detachment, and other visible cellular changes after inoculation with a patient specimen. What does this most directly suggest?',
    choices: [
      'Cytopathic effect that may support viral growth in culture.',
      'A confirmed bacterial susceptibility result.',
      'A positive germ tube test.',
      'A direct ova and parasite concentration result.'
    ],
    answer: 'Cytopathic effect that may support viral growth in culture.',
    explanation: 'Cytopathic effect describes virus-associated changes in cultured cells. It is a presumptive culture clue and must be interpreted with the method and confirmatory testing.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-002-rsv-specimen',
    area: 'analytic-virology',
    topic: 'Respiratory virus detection',
    difficulty: 'beginner',
    tags: ['RSV', 'respiratory virus', 'specimen selection'],
    prompt: 'A test for RSV is ordered on an infant with bronchiolitis. Which specimen direction best matches routine respiratory virus testing principles?',
    choices: [
      'Collect an appropriate upper respiratory specimen validated for the assay, such as a nasopharyngeal specimen when required.',
      'Submit a stool specimen because RSV primarily infects the intestinal tract.',
      'Submit a urine culture plate after overnight incubation.',
      'Use a blood culture bottle as the preferred RSV specimen.'
    ],
    answer: 'Collect an appropriate upper respiratory specimen validated for the assay, such as a nasopharyngeal specimen when required.',
    explanation: 'Respiratory virus testing depends heavily on specimen type, collection quality, timing, and the assay validation. RSV is usually approached with respiratory specimens.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-003-hpv-disease-association',
    area: 'analytic-virology',
    topic: 'Viral disease associations',
    difficulty: 'beginner',
    tags: ['HPV', 'cervical dysplasia', 'anogenital warts'],
    prompt: 'Which virus group is classically associated with anogenital warts and cervical dysplasia screening workflows?',
    choices: [
      'Human papillomavirus.',
      'Epstein-Barr virus.',
      'Rotavirus.',
      'Hantavirus.'
    ],
    answer: 'Human papillomavirus.',
    explanation: 'HPV is linked to anogenital warts and cervical dysplasia/cancer screening. Different HPV types and assays answer different clinical questions.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-004-ebv-associations',
    area: 'analytic-virology',
    topic: 'Viral disease associations',
    difficulty: 'intermediate',
    tags: ['EBV', 'mononucleosis', 'Burkitt lymphoma', 'nasopharyngeal carcinoma'],
    prompt: 'Which virus is classically associated with infectious mononucleosis and selected malignancy associations such as Burkitt lymphoma?',
    choices: [
      'Epstein-Barr virus.',
      'Norovirus.',
      'Adenovirus 40/41.',
      'Parainfluenza virus.'
    ],
    answer: 'Epstein-Barr virus.',
    explanation: 'EBV is associated with infectious mononucleosis and selected malignancies. Serology and molecular testing must be matched to the clinical question.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-005-hbv-chronic-marker',
    area: 'analytic-virology',
    topic: 'Viral serology interpretation',
    difficulty: 'advanced',
    tags: ['HBV', 'HBsAg', 'serology', 'chronic infection'],
    prompt: 'A hepatitis B serology panel is being reviewed. Which marker persistence is most associated with ongoing HBV infection when interpreted in the full panel context?',
    choices: [
      'HBsAg.',
      'Anti-HBs alone.',
      'Anti-HAV IgG.',
      'Heterophile antibody.'
    ],
    answer: 'HBsAg.',
    explanation: 'Persistent HBsAg supports ongoing HBV infection when interpreted with other markers, timing, and clinical context. Serology is pattern-based, not single-marker memorization alone.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-006-hiv-monitoring',
    area: 'analytic-virology',
    topic: 'HIV testing and monitoring',
    difficulty: 'intermediate',
    tags: ['HIV', 'viral load', 'therapy monitoring'],
    prompt: 'Which laboratory test is commonly used to monitor response to antiretroviral therapy in a patient with HIV?',
    choices: [
      'Quantitative HIV RNA viral load.',
      'Routine throat culture.',
      'Oxidase reagent QC.',
      'Ova and parasite wet mount.'
    ],
    answer: 'Quantitative HIV RNA viral load.',
    explanation: 'HIV viral load measures circulating viral RNA and is used to monitor therapy response. CD4 count answers immune status rather than viral replication directly.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-007-influenza-drift-shift',
    area: 'analytic-virology',
    topic: 'Influenza antigenic change',
    difficulty: 'advanced',
    tags: ['influenza', 'antigenic drift', 'antigenic shift'],
    prompt: 'Which statement best summarizes influenza antigenic drift versus shift?',
    choices: [
      'Drift is gradual mutation; shift is major reassortment that can create new pandemic-risk strains.',
      'Drift only occurs in DNA viruses; shift only occurs in bacteria.',
      'Both terms mean the same thing as antiviral susceptibility.',
      'Shift describes the normal daily change in viral load during therapy.'
    ],
    answer: 'Drift is gradual mutation; shift is major reassortment that can create new pandemic-risk strains.',
    explanation: 'Influenza drift reflects accumulating mutations, while shift reflects reassortment with a major antigenic change. This distinction matters for epidemiology and vaccine strategy.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-008-hantavirus-vector',
    area: 'analytic-virology',
    topic: 'Viral epidemiology',
    difficulty: 'beginner',
    tags: ['hantavirus', 'rodent exposure', 'epidemiology'],
    prompt: 'A patient has compatible pulmonary syndrome after cleaning a rodent-infested cabin. Which exposure is most relevant to hantavirus risk?',
    choices: [
      'Aerosolized excreta from infected rodents.',
      'Mosquito bite during coastal travel.',
      'Eating undercooked pork containing larvae.',
      'Freshwater snail exposure.'
    ],
    answer: 'Aerosolized excreta from infected rodents.',
    explanation: 'Hantavirus risk is classically linked to rodent exposure, especially aerosolized urine, droppings, or nesting material in enclosed spaces.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Virology',
    status: 'published'
  },
  {
    id: 'virology-009-viral-transport-medium',
    area: 'analytic-virology',
    topic: 'Viral specimen transport',
    difficulty: 'beginner',
    tags: ['virology', 'viral transport medium', 'specimen handling', 'cold chain'],
    prompt: 'A swab is collected for viral testing and cannot be processed immediately. Which handling choice best preserves the specimen for many routine viral studies?',
    choices: [
      'Place the swab in viral transport medium and keep it cold according to the laboratory protocol.',
      'Place the swab dry on the counter until batching is convenient.',
      'Put the swab into thioglycollate broth to increase viral replication.',
      'Add routine bacterial colony material to maintain cell culture viability.'
    ],
    answer: 'Place the swab in viral transport medium and keep it cold according to the laboratory protocol.',
    explanation: 'Viral specimens are vulnerable to drying and poor transport conditions. Viral transport medium and cold handling help preserve specimen integrity until testing.',
    source: 'Learn Microbes original question bank: Specimen Collection, Media, and Methods',
    status: 'draft'
  },
  {
    id: 'virology-010-virus-classification-first-branch',
    area: 'analytic-virology',
    topic: 'Virus classification',
    difficulty: 'beginner',
    tags: ['virus classification', 'DNA virus', 'RNA virus', 'bench concepts'],
    prompt: 'A learner is building a first-pass virus classification map. Which feature is one of the most important starting branches?',
    choices: [
      'Whether the viral genome is DNA or RNA.',
      'Whether the virus grows on MacConkey agar.',
      'Whether the virus produces coagulase.',
      'Whether the virus forms bacterial endospores.'
    ],
    answer: 'Whether the viral genome is DNA or RNA.',
    explanation: 'Viral classification starts with core features such as genome type, envelope status, capsid structure, and replication strategy. Viruses do not fit routine bacterial culture logic.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-011-viral-transport-medium',
    area: 'analytic-virology',
    topic: 'Viral specimen transport',
    difficulty: 'beginner',
    tags: ['viral transport medium', 'specimen handling', 'cold chain', 'virology'],
    prompt: 'A respiratory swab is collected for viral testing and cannot be processed immediately. Which handling choice best protects specimen integrity?',
    choices: [
      'Place the swab in viral transport medium and keep it cold according to the laboratory protocol.',
      'Place the swab dry on the counter until the next batch.',
      'Place the swab into thioglycollate broth to grow the virus.',
      'Plate the swab directly to MacConkey agar.'
    ],
    answer: 'Place the swab in viral transport medium and keep it cold according to the laboratory protocol.',
    explanation: 'Many viral specimens are sensitive to drying and poor transport. Viral transport medium and cold handling help preserve the sample for the validated test method.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-012-rsv-bronchiolitis-testing',
    area: 'analytic-virology',
    topic: 'Respiratory syncytial virus',
    difficulty: 'beginner',
    tags: ['RSV', 'bronchiolitis', 'respiratory virus', 'NAAT'],
    prompt: 'A young child has a respiratory illness pattern consistent with bronchiolitis. Which virus is a classic teaching cause, and what specimen logic matters?',
    choices: [
      'RSV; use an appropriate respiratory specimen for the lab assay.',
      'Rotavirus; use a clean-catch urine specimen.',
      'Hepatitis B virus; use a stool culture plate.',
      'BK virus; use a dermatophyte culture.'
    ],
    answer: 'RSV; use an appropriate respiratory specimen for the lab assay.',
    explanation: 'Respiratory syncytial virus is a classic cause of bronchiolitis in young children. Testing depends on validated respiratory specimen collection and the lab method, such as antigen detection or NAAT.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-013-influenza-naat-antigen',
    area: 'analytic-virology',
    topic: 'Influenza testing',
    difficulty: 'intermediate',
    tags: ['influenza', 'NAAT', 'rapid antigen', 'respiratory virus'],
    prompt: 'A nasal swab is submitted for influenza testing. Why should a learner know the difference between rapid antigen testing and NAAT?',
    choices: [
      'They detect different targets and may differ in sensitivity, so results must be interpreted by the lab method used.',
      'Both tests culture influenza on blood agar.',
      'Rapid antigen testing identifies bacterial beta-lactamase.',
      'NAAT is used only for fungal culture.'
    ],
    answer: 'They detect different targets and may differ in sensitivity, so results must be interpreted by the lab method used.',
    explanation: 'Influenza testing may use antigen detection or nucleic acid amplification. The specimen, timing, and method affect how the result is interpreted.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-014-adenovirus-nonenveloped-dna',
    area: 'analytic-virology',
    topic: 'Adenovirus concepts',
    difficulty: 'beginner',
    tags: ['adenovirus', 'DNA virus', 'respiratory infection', 'conjunctivitis'],
    prompt: 'Which teaching point best fits adenovirus in a virology study workflow?',
    choices: [
      'It is a nonenveloped DNA virus associated with respiratory, ocular, and gastrointestinal syndromes.',
      'It is a spore-forming gram-positive rod.',
      'It is a lactose-fermenting Enterobacterales organism.',
      'It is a dermatophyte that invades hair shafts.'
    ],
    answer: 'It is a nonenveloped DNA virus associated with respiratory, ocular, and gastrointestinal syndromes.',
    explanation: 'Adenovirus is a DNA virus with several clinical patterns. The lab approach depends on specimen source and validated viral detection method.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-015-coxsackie-b-myocarditis-pleurodynia',
    area: 'analytic-virology',
    topic: 'Enterovirus concepts',
    difficulty: 'intermediate',
    tags: ['Coxsackie B virus', 'enterovirus', 'myocarditis', 'pleurodynia'],
    prompt: 'A review question describes viral myocarditis with pleurodynia-style muscle pain. Which virus group is a classic teaching association?',
    choices: [
      'Coxsackie B virus.',
      'Epstein-Barr virus.',
      'Rotavirus.',
      'BK virus.'
    ],
    answer: 'Coxsackie B virus.',
    explanation: 'Coxsackie B virus is a classic enterovirus association for myocarditis and pleurodynia concepts. Testing and interpretation depend on the clinical question and specimen source.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-016-enterovirus-csf-pcr',
    area: 'analytic-virology',
    topic: 'Enterovirus testing',
    difficulty: 'intermediate',
    tags: ['enterovirus', 'CSF', 'PCR', 'aseptic meningitis'],
    prompt: 'A CSF specimen is submitted for suspected viral meningitis. Which test concept commonly supports rapid enterovirus detection?',
    choices: [
      'Nucleic acid amplification testing on an appropriate CSF specimen.',
      'Coagulase testing from a blood agar colony.',
      'Bile esculin hydrolysis.',
      'Germ tube testing in serum.'
    ],
    answer: 'Nucleic acid amplification testing on an appropriate CSF specimen.',
    explanation: 'Enteroviruses are common causes of viral meningitis, and molecular testing can provide rapid detection from validated specimens. This is different from routine bacterial colony identification.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-017-rotavirus-stool-antigen',
    area: 'analytic-virology',
    topic: 'Viral gastroenteritis',
    difficulty: 'beginner',
    tags: ['rotavirus', 'stool antigen', 'viral gastroenteritis', 'children'],
    prompt: 'A stool specimen from a child with suspected viral gastroenteritis is tested for rotavirus. Which lab concept best fits this workflow?',
    choices: [
      'Detection of viral antigen or nucleic acid from stool, depending on the lab method.',
      'Blood agar culture for beta-hemolytic colonies.',
      'Acid-fast culture on Lowenstein-Jensen medium.',
      'Coagulase testing from a gram-positive coccus.'
    ],
    answer: 'Detection of viral antigen or nucleic acid from stool, depending on the lab method.',
    explanation: 'Rotavirus testing uses stool-based viral methods rather than routine bacterial culture. The learner should match the syndrome, specimen, and assay target.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-018-norovirus-outbreak-stool',
    area: 'analytic-virology',
    topic: 'Viral gastroenteritis',
    difficulty: 'intermediate',
    tags: ['norovirus', 'outbreaks', 'stool PCR', 'viral gastroenteritis'],
    prompt: 'Several people develop acute vomiting and diarrhea after a shared event. Which virus is a classic outbreak-associated cause, and what specimen is commonly useful for lab testing?',
    choices: [
      'Norovirus; stool submitted for a validated viral assay.',
      'HSV-1; throat swab on chocolate agar.',
      'HIV; dermatophyte culture from skin.',
      'CMV; coagulase test from blood agar.'
    ],
    answer: 'Norovirus; stool submitted for a validated viral assay.',
    explanation: 'Norovirus is a classic cause of acute gastroenteritis outbreaks. Stool-based molecular or antigen methods may be used depending on the laboratory workflow.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-019-parvovirus-b19-fifth-disease',
    area: 'analytic-virology',
    topic: 'Parvovirus B19 concepts',
    difficulty: 'beginner',
    tags: ['parvovirus B19', 'fifth disease', 'aplastic crisis', 'serology'],
    prompt: 'A child has a classic “slapped cheek” rash pattern in a virology review case. Which virus is the classic teaching association?',
    choices: [
      'Parvovirus B19.',
      'Rotavirus.',
      'Adenovirus.',
      'BK virus.'
    ],
    answer: 'Parvovirus B19.',
    explanation: 'Parvovirus B19 is classically associated with fifth disease and can also be important in aplastic crisis or congenital infection discussions. Lab testing may involve serology or molecular methods depending on the question.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-020-vzv-vesicle-pcr',
    area: 'analytic-virology',
    topic: 'Varicella-zoster virus testing',
    difficulty: 'intermediate',
    tags: ['varicella-zoster virus', 'vesicle lesion', 'PCR', 'herpesviruses'],
    prompt: 'A vesicular rash specimen is collected for suspected varicella-zoster virus. Which testing principle is most appropriate?',
    choices: [
      'Use a properly collected lesion specimen for a validated molecular assay when available.',
      'Use stool culture on TCBS agar.',
      'Use a coagulase test from a blood agar colony.',
      'Use a KOH prep to look for dermatophytes.'
    ],
    answer: 'Use a properly collected lesion specimen for a validated molecular assay when available.',
    explanation: 'VZV testing often depends on lesion specimen quality and molecular detection. Direct cytology findings can be nonspecific and do not reliably separate herpesviruses.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-021-hsv-lesion-pcr',
    area: 'analytic-virology',
    topic: 'Herpes simplex virus testing',
    difficulty: 'beginner',
    tags: ['HSV', 'lesion swab', 'PCR', 'herpesviruses'],
    prompt: 'A fresh vesicular lesion is submitted for herpes simplex virus testing. Which specimen principle best supports detection?',
    choices: [
      'Collect material from the lesion base using the collection system validated for the assay.',
      'Submit a dry stool swab because HSV grows best from stool.',
      'Submit a routine urine culture plate.',
      'Submit sputum for acid-fast bacilli culture.'
    ],
    answer: 'Collect material from the lesion base using the collection system validated for the assay.',
    explanation: 'HSV detection depends on good lesion sampling and the correct transport or assay system. Molecular testing is commonly used in many workflows.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-022-ebv-heterophile-vca',
    area: 'analytic-virology',
    topic: 'Epstein-Barr virus testing',
    difficulty: 'intermediate',
    tags: ['Epstein-Barr virus', 'heterophile antibody', 'VCA IgM', 'mononucleosis'],
    prompt: 'A mono-like illness is being evaluated, but the heterophile antibody screen is negative. What is the best lab-learning concept?',
    choices: [
      'EBV-specific serology such as viral capsid antigen antibodies can help when the screening result does not fit the case.',
      'A negative heterophile screen always rules out EBV in every patient.',
      'EBV is confirmed by lactose fermentation.',
      'EBV is identified by germ tube formation.'
    ],
    answer: 'EBV-specific serology such as viral capsid antigen antibodies can help when the screening result does not fit the case.',
    explanation: 'Heterophile antibody tests are screening tools and can be negative early or in some populations. EBV-specific serology provides a more detailed interpretation path.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-023-cmv-pcr-monitoring',
    area: 'analytic-virology',
    topic: 'Cytomegalovirus testing',
    difficulty: 'intermediate',
    tags: ['CMV', 'PCR', 'viral load', 'immunocompromised host'],
    prompt: 'A transplant-associated virology workflow monitors cytomegalovirus over time. Which lab concept best fits that use case?',
    choices: [
      'Quantitative molecular testing can track CMV viral load trends in appropriate specimens.',
      'Coagulase testing identifies CMV from blood agar colonies.',
      'MacConkey lactose fermentation confirms CMV.',
      'KOH preparation is the standard CMV viral load method.'
    ],
    answer: 'Quantitative molecular testing can track CMV viral load trends in appropriate specimens.',
    explanation: 'CMV monitoring commonly uses quantitative molecular methods in selected patient groups. The result is a lab trend that must be interpreted through the clinical and laboratory protocol.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-024-congenital-cmv-specimen',
    area: 'analytic-virology',
    topic: 'Congenital cytomegalovirus testing',
    difficulty: 'advanced',
    tags: ['CMV', 'congenital infection', 'urine', 'saliva', 'PCR'],
    prompt: 'A congenital CMV evaluation is ordered. Which preanalytic point is most important for the bench learner?',
    choices: [
      'Use the specimen type and collection timing required by the validated congenital CMV protocol.',
      'Use routine throat culture on blood agar only.',
      'Use a stool parasite concentration method.',
      'Use a dermatophyte culture plate.'
    ],
    answer: 'Use the specimen type and collection timing required by the validated congenital CMV protocol.',
    explanation: 'Congenital CMV testing is sensitive to specimen type and timing. The lab should follow its validated protocol rather than treating all specimens as interchangeable.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-025-hepatitis-b-serology-logic',
    area: 'analytic-virology',
    topic: 'Hepatitis B serology',
    difficulty: 'intermediate',
    tags: ['hepatitis B', 'HBsAg', 'anti-HBs', 'anti-HBc', 'serology'],
    prompt: 'Why is hepatitis B interpretation usually taught as a pattern of markers rather than one isolated result?',
    choices: [
      'Different markers reflect infection, immunity, exposure history, or phase of infection depending on the pattern.',
      'All hepatitis B markers mean the same thing.',
      'Hepatitis B is identified by growth on MacConkey agar.',
      'Hepatitis B serology detects fungal hyphae.'
    ],
    answer: 'Different markers reflect infection, immunity, exposure history, or phase of infection depending on the pattern.',
    explanation: 'Hepatitis B serology uses combinations such as surface antigen, surface antibody, and core antibody. The pattern matters more than memorizing one marker alone.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-026-hepatitis-c-antibody-rna',
    area: 'analytic-virology',
    topic: 'Hepatitis C testing',
    difficulty: 'intermediate',
    tags: ['hepatitis C', 'antibody screen', 'RNA testing', 'molecular testing'],
    prompt: 'A hepatitis C antibody screen is reactive. What is the best lab-learning next concept?',
    choices: [
      'RNA testing helps determine whether viral nucleic acid is detected after a reactive antibody screen.',
      'A reactive antibody screen identifies bacterial colony morphology.',
      'Hepatitis C is confirmed by coagulase testing.',
      'Hepatitis C grows as a mold on Sabouraud agar.'
    ],
    answer: 'RNA testing helps determine whether viral nucleic acid is detected after a reactive antibody screen.',
    explanation: 'HCV antibody testing shows exposure or immune response, while RNA testing detects viral nucleic acid. The two result types answer different lab questions.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-027-hiv-screening-algorithm',
    area: 'analytic-virology',
    topic: 'HIV testing algorithms',
    difficulty: 'advanced',
    tags: ['HIV', 'fourth-generation screen', 'supplemental testing', 'NAAT'],
    prompt: 'A fourth-generation HIV screening test is repeatedly reactive. What is the safest lab-learning principle?',
    choices: [
      'Follow the laboratory HIV algorithm with supplemental differentiation testing or nucleic acid testing as required.',
      'Report HIV infection from the screening result alone without the algorithm.',
      'Use MacConkey agar to confirm the virus.',
      'Use a germ tube test to separate HIV-1 from HIV-2.'
    ],
    answer: 'Follow the laboratory HIV algorithm with supplemental differentiation testing or nucleic acid testing as required.',
    explanation: 'HIV testing is algorithm-based. Screening, supplemental differentiation, and nucleic acid testing answer different questions and must follow the validated workflow.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-028-hiv-viral-load-meaning',
    area: 'analytic-virology',
    topic: 'HIV viral load testing',
    difficulty: 'beginner',
    tags: ['HIV', 'viral load', 'RNA', 'quantitative PCR'],
    prompt: 'In HIV laboratory monitoring, what does a viral load test measure?',
    choices: [
      'The amount of HIV RNA detected in the specimen by a quantitative molecular method.',
      'The number of colonies growing on blood agar.',
      'The coagulase activity of the virus.',
      'The presence of fungal arthroconidia.'
    ],
    answer: 'The amount of HIV RNA detected in the specimen by a quantitative molecular method.',
    explanation: 'HIV viral load is a molecular measurement of viral RNA. It is different from antibody screening or CD4 cell enumeration.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-029-hiv-genotypic-resistance',
    area: 'analytic-virology',
    topic: 'HIV resistance testing',
    difficulty: 'advanced',
    tags: ['HIV', 'genotypic resistance', 'sequencing', 'antiviral resistance'],
    prompt: 'What is the main purpose of HIV genotypic resistance testing?',
    choices: [
      'To look for viral genetic mutations associated with resistance to antiretroviral drug classes.',
      'To identify HIV by Gram stain morphology.',
      'To determine fungal colony texture.',
      'To confirm beta-lactamase production by bacteria.'
    ],
    answer: 'To look for viral genetic mutations associated with resistance to antiretroviral drug classes.',
    explanation: 'Genotypic resistance testing examines viral sequence changes linked to resistance. It is a lab interpretation tool, not a treatment recommendation by itself.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-030-hpv-high-risk-dna',
    area: 'analytic-virology',
    topic: 'Human papillomavirus testing',
    difficulty: 'intermediate',
    tags: ['HPV', 'high-risk HPV', 'DNA testing', 'cervical screening'],
    prompt: 'What does high-risk HPV molecular testing detect in a cervical screening workflow?',
    choices: [
      'Nucleic acid from HPV types associated with higher oncogenic risk.',
      'Coagulase activity from gram-positive cocci.',
      'Acid-fast bacilli in sputum.',
      'Dermatophyte invasion of hair shafts.'
    ],
    answer: 'Nucleic acid from HPV types associated with higher oncogenic risk.',
    explanation: 'High-risk HPV testing detects viral nucleic acid from selected HPV types. It is part of a screening algorithm and should be interpreted by the validated lab workflow.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-031-rabies-dfa-animal-brain',
    area: 'analytic-virology',
    topic: 'Rabies testing',
    difficulty: 'advanced',
    tags: ['rabies virus', 'direct fluorescent antibody', 'brain tissue', 'public health'],
    prompt: 'An animal specimen is submitted for rabies testing. Which lab method is a classic confirmatory approach on appropriate brain tissue?',
    choices: [
      'Direct fluorescent antibody testing.',
      'Coagulase testing.',
      'Germ tube testing.',
      'Bile esculin hydrolysis.'
    ],
    answer: 'Direct fluorescent antibody testing.',
    explanation: 'Rabies testing is a public health and safety-sensitive workflow. Direct fluorescent antibody testing on appropriate tissue is a classic method, and handling follows strict protocols.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-032-west-nile-igm',
    area: 'analytic-virology',
    topic: 'Arbovirus testing',
    difficulty: 'intermediate',
    tags: ['West Nile virus', 'arbovirus', 'IgM', 'CSF'],
    prompt: 'A patient with suspected neuroinvasive arboviral infection has serum and CSF submitted. Which result type is commonly used in West Nile virus testing workflows?',
    choices: [
      'Virus-specific IgM antibody detection in appropriate specimens.',
      'Routine blood agar colony morphology.',
      'Urease testing from a yeast colony.',
      'CAMP testing for beta-hemolytic streptococci.'
    ],
    answer: 'Virus-specific IgM antibody detection in appropriate specimens.',
    explanation: 'West Nile virus testing often relies on serologic detection of IgM in serum or CSF, depending on the clinical question and lab protocol. Routine viral culture is not the usual first teaching workflow.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-033-hantavirus-rodent-exposure',
    area: 'analytic-virology',
    topic: 'Hantavirus concepts',
    difficulty: 'advanced',
    tags: ['hantavirus', 'rodent exposure', 'serology', 'respiratory syndrome'],
    prompt: 'A severe respiratory illness follows heavy exposure to rodent droppings in an enclosed space. Which virus group is a classic teaching concern?',
    choices: [
      'Hantavirus.',
      'Rotavirus.',
      'Papillomavirus.',
      'BK virus.'
    ],
    answer: 'Hantavirus.',
    explanation: 'Hantavirus is classically associated with rodent exposure and severe pulmonary syndromes in teaching workflows. Lab confirmation typically uses specialized serologic or molecular methods.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'draft'
  },
  {
    id: 'virology-034-coronavirus-naat-workflow',
    area: 'analytic-virology',
    topic: 'Coronavirus testing concepts',
    difficulty: 'beginner',
    tags: ['coronavirus', 'NAAT', 'respiratory specimen', 'molecular testing'],
    prompt: 'A respiratory specimen is submitted for coronavirus detection. Which lab concept best fits many routine diagnostic workflows?',
    choices: [
      'Molecular detection from a validated respiratory specimen.',
      'Growth on MacConkey agar with lactose fermentation.',
      'Coagulase testing from blood agar.',
      'KOH preparation for fungal hyphae.'
    ],
    answer: 'Molecular detection from a validated respiratory specimen.',
    explanation: 'Coronavirus testing commonly uses molecular detection from respiratory specimens. Routine culture is not the usual front-line diagnostic workflow in clinical labs.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-035-rubella-immune-status',
    area: 'analytic-virology',
    topic: 'Rubella serology',
    difficulty: 'intermediate',
    tags: ['rubella', 'IgG', 'IgM', 'pregnancy screening', 'serology'],
    prompt: 'A rubella serology panel is ordered to evaluate immune status or possible recent infection. Which concept is most important?',
    choices: [
      'IgG and IgM answer different serologic questions and must be interpreted in context.',
      'Rubella is identified by coagulase testing.',
      'Rubella grows as a dermatophyte on skin scrapings.',
      'Rubella is confirmed by lactose fermentation.'
    ],
    answer: 'IgG and IgM answer different serologic questions and must be interpreted in context.',
    explanation: 'Rubella serology is pattern-based. IgG may support immunity or past exposure, while IgM is used in recent-infection evaluation with appropriate caution and confirmation rules.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-036-torch-panel-concept',
    area: 'analytic-virology',
    topic: 'Congenital infection testing',
    difficulty: 'beginner',
    tags: ['TORCH', 'congenital infection', 'serology', 'molecular testing'],
    prompt: 'Why are TORCH organisms grouped together in many study workflows?',
    choices: [
      'They are organisms associated with congenital or perinatal infection evaluation.',
      'They are all acid-fast bacilli.',
      'They are all dermatophytes.',
      'They are all coagulase-positive bacteria.'
    ],
    answer: 'They are organisms associated with congenital or perinatal infection evaluation.',
    explanation: 'TORCH is a learning bucket for congenital infection evaluation. Testing depends on the organism, specimen, timing, and whether serology or molecular detection is appropriate.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-037-bk-virus-transplant',
    area: 'analytic-virology',
    topic: 'BK virus testing',
    difficulty: 'advanced',
    tags: ['BK virus', 'transplant', 'polyomavirus', 'urine', 'plasma PCR'],
    prompt: 'A kidney transplant monitoring workflow includes BK virus testing. Which lab concept best fits this use case?',
    choices: [
      'Molecular testing of urine or plasma can be used to monitor BK virus in the appropriate protocol.',
      'BK virus is identified by germ tube testing.',
      'BK virus grows as a beta-hemolytic colony on blood agar.',
      'BK virus is confirmed by dermatophyte hair perforation testing.'
    ],
    answer: 'Molecular testing of urine or plasma can be used to monitor BK virus in the appropriate protocol.',
    explanation: 'BK virus is a polyomavirus important in transplant-associated monitoring. Testing is protocol-driven and often uses molecular methods rather than routine culture.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-038-hemagglutination-inhibition',
    area: 'analytic-virology',
    topic: 'Viral serology methods',
    difficulty: 'advanced',
    tags: ['hemagglutination', 'hemagglutination inhibition', 'influenza', 'serology'],
    prompt: 'What is the basic principle behind a hemagglutination inhibition assay in virology?',
    choices: [
      'Antibody can block a virus from agglutinating red blood cells.',
      'Antibody makes bacteria produce coagulase.',
      'Antibody forces fungi to form germ tubes.',
      'Antibody converts RNA viruses into DNA viruses.'
    ],
    answer: 'Antibody can block a virus from agglutinating red blood cells.',
    explanation: 'Some viruses can agglutinate red blood cells. If specific antibody prevents that reaction, the inhibition pattern can support serologic interpretation in selected workflows.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
    id: 'virology-039-virology-bench-first-workflow',
    area: 'analytic-virology',
    topic: 'Virology workflow',
    difficulty: 'beginner',
    tags: ['virology', 'bench workflow', 'specimen source', 'NAAT', 'serology'],
    prompt: 'Which approach best matches a bench-first virology workflow?',
    choices: [
      'Start with syndrome and specimen source, then match the virus, timing, specimen type, and validated test method.',
      'Use bacterial colony color as the main viral identification method.',
      'Use coagulase testing for all respiratory viruses.',
      'Assume all viruses grow on routine blood agar overnight.'
    ],
    answer: 'Start with syndrome and specimen source, then match the virus, timing, specimen type, and validated test method.',
    explanation: 'Virology is heavily specimen- and method-dependent. Learners should connect the clinical question to the correct specimen and test type, such as antigen detection, NAAT, serology, or culture when appropriate.',
    source: 'Learn Microbes original question bank: Virology',
    status: 'published'
  },
  {
  id: 'virology-040-hsv-vesicle-pcr-case',
  area: 'analytic-virology',
  topic: 'Herpesvirus problem solving',
  difficulty: 'beginner',
  tags: ['HSV', 'vesicle lesion', 'PCR', 'specimen collection'],
  prompt: 'A fresh vesicular lesion is submitted for herpes simplex virus testing. Which specimen principle best supports detection?',
  choices: [
  'Collect material from the lesion base using the collection system validated for the assay.',
  'Submit a dry stool swab for viral culture.',
  'Use a routine urine culture plate.',
  'Use sputum for acid-fast bacilli culture.'
  ],
  answer: 'Collect material from the lesion base using the collection system validated for the assay.',
  explanation: 'HSV detection depends on good lesion sampling and correct transport or assay conditions. Lesion base sampling is a key preanalytic point.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'virology-041-ebv-mono-serology-case',
  area: 'analytic-virology',
  topic: 'Epstein-Barr virus problem solving',
  difficulty: 'intermediate',
  tags: ['Epstein-Barr virus', 'heterophile antibody', 'VCA IgM', 'mononucleosis'],
  prompt: 'A mono-like illness is suspected, but the heterophile antibody screen is negative. What is the best lab-learning next concept?',
  choices: [
  'EBV-specific serology can help when the screening result does not fit the suspected pattern.',
  'A negative heterophile screen always excludes EBV.',
  'EBV is confirmed by lactose fermentation.',
  'EBV is identified by germ tube production.'
  ],
  answer: 'EBV-specific serology can help when the screening result does not fit the suspected pattern.',
  explanation: 'Heterophile tests are screening tools and may be negative in some cases. EBV-specific serology provides a more detailed interpretation path.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'virology-042-cmv-transplant-viral-load-case',
  area: 'analytic-virology',
  topic: 'Cytomegalovirus problem solving',
  difficulty: 'intermediate',
  tags: ['CMV', 'transplant', 'viral load', 'quantitative PCR'],
  prompt: 'A transplant monitoring workflow follows cytomegalovirus results over time. Which lab test concept best fits this use case?',
  choices: [
  'Quantitative molecular testing to track CMV viral load trends.',
  'Coagulase testing from a blood agar colony.',
  'KOH preparation for fungal hyphae.',
  'Bile esculin testing for enterococci.'
  ],
  answer: 'Quantitative molecular testing to track CMV viral load trends.',
  explanation: 'CMV monitoring often uses quantitative molecular methods. Trends should be interpreted through the laboratory and clinical protocol.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'virology-043-hiv-algorithm-case',
  area: 'analytic-virology',
  topic: 'HIV testing problem solving',
  difficulty: 'advanced',
  tags: ['HIV', 'fourth-generation screen', 'supplemental testing', 'NAAT'],
  prompt: 'A fourth-generation HIV screening test is repeatedly reactive. What is the safest lab-learning principle?',
  choices: [
  'Follow the laboratory HIV algorithm with supplemental differentiation testing or nucleic acid testing as required.',
  'Report infection from the screen alone without the algorithm.',
  'Use MacConkey agar to confirm the virus.',
  'Use a germ tube test to separate HIV-1 from HIV-2.'
  ],
  answer: 'Follow the laboratory HIV algorithm with supplemental differentiation testing or nucleic acid testing as required.',
  explanation: 'HIV testing is algorithm-based. Screening, supplemental differentiation, and nucleic acid testing answer different questions and must follow the validated workflow.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'virology-044-rabies-public-health-testing-case',
  area: 'analytic-virology',
  topic: 'Rabies testing problem solving',
  difficulty: 'advanced',
  tags: ['rabies virus', 'direct fluorescent antibody', 'brain tissue', 'public health'],
  prompt: 'An animal specimen is submitted for rabies testing after an exposure investigation. Which classic confirmatory method is used on appropriate tissue?',
  choices: [
  'Direct fluorescent antibody testing.',
  'Coagulase testing.',
  'Germ tube testing.',
  'Bile esculin hydrolysis.'
  ],
  answer: 'Direct fluorescent antibody testing.',
  explanation: 'Rabies testing is safety-sensitive and public-health-linked. Direct fluorescent antibody testing on appropriate tissue is a classic method handled under strict protocols.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
    id: 'parasitology-001-artifact-recognition',
    area: 'analytic-parasitology',
    topic: 'Ova and parasite microscopy',
    difficulty: 'beginner',
    tags: ['O&P', 'artifact', 'microscopy'],
    prompt: 'A stool wet mount contains plant material and pollen-like structures that could be mistaken for ova or cysts. What is the best student lesson?',
    choices: [
      'Artifacts can mimic parasites, so morphology, size, internal structures, and stain quality must be evaluated carefully.',
      'All round objects in stool are clinically significant parasite ova.',
      'Artifacts prove the specimen is unacceptable for all testing.',
      'Parasite identification is based only on the color of the background.'
    ],
    answer: 'Artifacts can mimic parasites, so morphology, size, internal structures, and stain quality must be evaluated carefully.',
    explanation: 'O&P microscopy requires separating true diagnostic structures from artifacts. Size, shape, internal detail, and preparation method all matter.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-002-permanent-stain-purpose',
    area: 'analytic-parasitology',
    topic: 'Stool parasite stains',
    difficulty: 'beginner',
    tags: ['trichrome stain', 'permanent smear', 'protozoa'],
    prompt: 'Why are permanently stained fecal smears useful in ova and parasite examination?',
    choices: [
      'They enhance internal protozoan morphology and allow more detailed review than a wet mount alone.',
      'They replace the need for any concentration method in every specimen.',
      'They are used only to identify bacterial lactose fermentation.',
      'They destroy all protozoan structures so helminth eggs are easier to see.'
    ],
    answer: 'They enhance internal protozoan morphology and allow more detailed review than a wet mount alone.',
    explanation: 'Permanent stains such as trichrome help visualize protozoan nuclear and cytoplasmic detail. They complement, rather than universally replace, concentration and wet mount methods.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-003-naegleria-urgent',
    area: 'analytic-parasitology',
    topic: 'Free-living amoebae',
    difficulty: 'advanced',
    tags: ['Naegleria fowleri', 'CSF', 'free-living amoeba', 'urgent reporting'],
    prompt: 'Motile amoebae are suspected in a fresh CSF specimen from a patient with rapidly progressive meningoencephalitis after warm freshwater exposure. What should the laboratory prioritize?',
    choices: [
      'Urgent escalation and appropriate confirmatory workflow because free-living amoebae can be rapidly fatal.',
      'Holding the specimen at room temperature overnight before notifying anyone.',
      'Reporting normal flora because amoebae are expected in CSF.',
      'Using urine culture colony counts as the confirmatory test.'
    ],
    answer: 'Urgent escalation and appropriate confirmatory workflow because free-living amoebae can be rapidly fatal.',
    explanation: 'Suspected Naegleria or other free-living amoebae in CSF is a high-consequence finding. Rapid communication and reference/confirmatory workflow are critical.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-004-malaria-speciation',
    area: 'analytic-parasitology',
    topic: 'Blood parasite microscopy',
    difficulty: 'intermediate',
    tags: ['malaria', 'Plasmodium', 'blood smear'],
    prompt: 'A blood smear shows intraerythrocytic parasites. Which features help separate Plasmodium species during microscopy?',
    choices: [
      'Infected cell size, parasite forms, pigment, parasitemia pattern, and special forms such as gametocytes.',
      'MacConkey lactose reaction and oxidase result.',
      'Bile solubility and optochin susceptibility.',
      'CAMP reaction and bacitracin susceptibility.'
    ],
    answer: 'Infected cell size, parasite forms, pigment, parasitemia pattern, and special forms such as gametocytes.',
    explanation: 'Malaria microscopy uses multiple smear features, not one visual clue alone. Species-level interpretation affects urgency and therapy.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-005-pinworm-specimen',
    area: 'analytic-parasitology',
    topic: 'Helminth specimen selection',
    difficulty: 'beginner',
    tags: ['Enterobius vermicularis', 'pinworm', 'tape test'],
    prompt: 'A child has nocturnal perianal itching and pinworm infection is suspected. Which specimen collection method is most appropriate?',
    choices: [
      'Morning perianal tape preparation before bathing or toileting.',
      'Routine sputum culture.',
      'Blood culture bottle inoculation.',
      'Clean-catch urine colony count.'
    ],
    answer: 'Morning perianal tape preparation before bathing or toileting.',
    explanation: 'Enterobius eggs are best recovered from the perianal area using a tape preparation, typically collected in the morning before washing or bowel movement.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'draft'
  },
  {
    id: 'parasitology-006-taenia-saginata-feature',
    area: 'analytic-parasitology',
    topic: 'Cestode identification',
    difficulty: 'advanced',
    tags: ['Taenia saginata', 'Taenia solium', 'proglottid', 'uterine branches'],
    prompt: 'A Taenia proglottid is being evaluated to separate T. saginata from T. solium. Which feature is classically used?',
    choices: [
      'Number and pattern of uterine branches in the gravid proglottid.',
      'Oxidase positivity.',
      'Coagulase tube clot formation.',
      'Growth on chocolate agar.'
    ],
    answer: 'Number and pattern of uterine branches in the gravid proglottid.',
    explanation: 'Taenia species differentiation often uses proglottid morphology, especially uterine branch pattern. Egg morphology alone is not enough for reliable species separation.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-007-schistosoma-haematobium',
    area: 'analytic-parasitology',
    topic: 'Trematode specimen selection',
    difficulty: 'intermediate',
    tags: ['Schistosoma haematobium', 'urine', 'trematode'],
    prompt: 'A patient has hematuria after freshwater exposure in an endemic area. Which specimen is most relevant for suspected Schistosoma haematobium?',
    choices: [
      'Urine collected and processed according to the parasite testing protocol.',
      'Throat swab for beta-hemolytic streptococci.',
      'Blood culture for anaerobes only.',
      'MacConkey plate from stool only.'
    ],
    answer: 'Urine collected and processed according to the parasite testing protocol.',
    explanation: 'S. haematobium is associated with urinary schistosomiasis. Specimen choice depends on the species and disease site.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'draft'
  },
  {
    id: 'parasitology-008-cryptosporidium-acid-fast',
    area: 'analytic-parasitology',
    topic: 'Coccidian parasites',
    difficulty: 'intermediate',
    tags: ['Cryptosporidium', 'modified acid-fast', 'coccidia', 'diarrhea'],
    prompt: 'A patient with watery diarrhea has tiny oocyst-like structures suspected on stool exam. Which stain direction is classically useful for Cryptosporidium-like organisms?',
    choices: [
      'Modified acid-fast or equivalent validated coccidian parasite staining method.',
      'Gram stain for beta-hemolytic colonies.',
      'India ink for encapsulated yeast only.',
      'Coagulase tube testing.'
    ],
    answer: 'Modified acid-fast or equivalent validated coccidian parasite staining method.',
    explanation: 'Cryptosporidium and related coccidia may require special stains or antigen/molecular methods. Routine O&P alone may not answer every coccidian parasite question.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-009-stool-op-and-p-basic-workflow',
    area: 'analytic-parasitology',
    topic: 'Stool ova and parasite workflow',
    difficulty: 'beginner',
    tags: ['stool O&P', 'parasite diagnosis', 'concentration', 'permanent stain'],
    prompt: 'A stool specimen is submitted for ova and parasite examination. Which approach best matches a bench-first parasitology workflow?',
    choices: [
      'Use specimen quality, concentration, wet mount, and permanent stain findings together.',
      'Identify all parasites from stool odor alone.',
      'Use Gram stain as the only required parasite method.',
      'Plate the specimen on MacConkey agar to recover helminth eggs.'
    ],
    answer: 'Use specimen quality, concentration, wet mount, and permanent stain findings together.',
    explanation: 'Stool parasitology depends on source, preservation, concentration, and microscopic morphology. A single observation rarely carries the whole identification.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-010-permanent-stain-protozoa',
    area: 'analytic-parasitology',
    topic: 'Intestinal protozoa identification',
    difficulty: 'beginner',
    tags: ['permanent stain', 'trichrome stain', 'intestinal protozoa', 'trophozoites'],
    prompt: 'Why is a permanent stained smear useful when identifying many intestinal protozoa?',
    choices: [
      'It preserves nuclear and cytoplasmic details needed for protozoan identification.',
      'It hatches helminth eggs to prove viability.',
      'It detects malaria parasites in red blood cells.',
      'It replaces all concentration methods for helminth eggs.'
    ],
    answer: 'It preserves nuclear and cytoplasmic details needed for protozoan identification.',
    explanation: 'Permanent stains such as trichrome help show protozoan internal morphology. This is especially important when trophozoites or small cysts could be confused with debris or cells.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-011-concentration-method-purpose',
    area: 'analytic-parasitology',
    topic: 'Stool concentration methods',
    difficulty: 'beginner',
    tags: ['formalin ethyl acetate', 'concentration', 'helminth eggs', 'protozoan cysts'],
    prompt: 'What is the main purpose of a stool concentration method in parasitology?',
    choices: [
      'To increase recovery of ova, cysts, and larvae that may be present in low numbers.',
      'To make trophozoites more motile after preservation.',
      'To identify malaria species in blood.',
      'To convert protozoan cysts into bacterial colonies.'
    ],
    answer: 'To increase recovery of ova, cysts, and larvae that may be present in low numbers.',
    explanation: 'Concentration methods help recover parasite stages that may be missed on direct exam. They are paired with permanent stains and wet mounts depending on the requested workup.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-012-charcot-leyden-crystals',
    area: 'analytic-parasitology',
    topic: 'Parasitology stool findings',
    difficulty: 'beginner',
    tags: ['Charcot-Leyden crystals', 'eosinophils', 'stool microscopy', 'parasites'],
    prompt: 'Charcot-Leyden crystals are seen in a stool specimen. What is the best educational interpretation?',
    choices: [
      'They are breakdown products associated with eosinophils and may support a parasitic or allergic inflammatory context.',
      'They are diagnostic eggs of Enterobius vermicularis.',
      'They are acid-fast oocysts of Cryptosporidium.',
      'They are malaria pigment inside red blood cells.'
    ],
    answer: 'They are breakdown products associated with eosinophils and may support a parasitic or allergic inflammatory context.',
    explanation: 'Charcot-Leyden crystals are not a parasite identification by themselves. They are supportive microscopic clues that must be interpreted with the full specimen findings.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-013-entamoeba-histolytica-rbc-ingestion',
    area: 'analytic-parasitology',
    topic: 'Entamoeba identification',
    difficulty: 'beginner',
    tags: ['Entamoeba histolytica', 'ingested RBCs', 'trophozoites', 'stool microscopy'],
    prompt: 'A trophozoite in a permanent stained stool smear contains ingested red blood cells. Which organism is classically supported by this finding?',
    choices: [
      'Entamoeba histolytica.',
      'Entamoeba dispar.',
      'Giardia duodenalis.',
      'Iodamoeba butschlii.'
    ],
    answer: 'Entamoeba histolytica.',
    explanation: 'Ingested red blood cells are a key teaching clue for E. histolytica trophozoites. E. dispar is morphologically similar but is not associated with ingested RBCs.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-014-entamoeba-dispar-caution',
    area: 'analytic-parasitology',
    topic: 'Entamoeba identification',
    difficulty: 'intermediate',
    tags: ['Entamoeba histolytica', 'Entamoeba dispar', 'morphology limits', 'stool microscopy'],
    prompt: 'Why should a learner be cautious when reporting Entamoeba histolytica-like cysts from stool microscopy alone?',
    choices: [
      'E. histolytica and E. dispar can look identical by cyst morphology, so lab-specific confirmation may be needed.',
      'E. dispar always contains ingested red blood cells.',
      'E. histolytica cysts are visible only in blood smears.',
      'Entamoeba species are identified by coagulase testing.'
    ],
    answer: 'E. histolytica and E. dispar can look identical by cyst morphology, so lab-specific confirmation may be needed.',
    explanation: 'Some Entamoeba species overlap morphologically. The bench should avoid overcalling pathogenicity from cyst appearance alone when confirmatory methods are required.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-015-giardia-trophozoite-pattern',
    area: 'analytic-parasitology',
    topic: 'Giardia identification',
    difficulty: 'beginner',
    tags: ['Giardia duodenalis', 'trophozoite', 'stool microscopy', 'intestinal protozoa'],
    prompt: 'A stool wet mount shows a motile, pear-shaped protozoan trophozoite with bilateral symmetry. Which organism is the classic teaching match?',
    choices: [
      'Giardia duodenalis.',
      'Entamoeba coli.',
      'Balantidium coli.',
      'Cyclospora cayetanensis.'
    ],
    answer: 'Giardia duodenalis.',
    explanation: 'Giardia trophozoites are classically pear-shaped with bilateral symmetry. The lab may use microscopy, antigen testing, or molecular methods depending on workflow.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-016-giardia-cryptosporidium-immunoassay',
    area: 'analytic-parasitology',
    topic: 'Fecal immunoassay parasitology',
    difficulty: 'intermediate',
    tags: ['Giardia', 'Cryptosporidium', 'fecal immunoassay', 'stool testing'],
    prompt: 'Why are fecal immunoassays commonly discussed for Giardia and Cryptosporidium?',
    choices: [
      'They can detect parasite antigens in stool and may be more practical than relying only on routine O&P microscopy.',
      'They hatch helminth eggs to prove viability.',
      'They identify malaria species on thick blood films.',
      'They detect adult tapeworms in blood culture bottles.'
    ],
    answer: 'They can detect parasite antigens in stool and may be more practical than relying only on routine O&P microscopy.',
    explanation: 'Giardia and Cryptosporidium are common targets for stool antigen or molecular workflows. The test choice depends on the lab’s algorithm and requested evaluation.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-017-cryptosporidium-modified-acid-fast',
    area: 'analytic-parasitology',
    topic: 'Coccidian parasite staining',
    difficulty: 'beginner',
    tags: ['Cryptosporidium', 'modified acid-fast stain', 'coccidia', 'stool oocysts'],
    prompt: 'Small round oocysts in stool are suspected to be Cryptosporidium. Which stain is a classic teaching method for demonstrating them?',
    choices: [
      'Modified acid-fast stain.',
      'Gram stain only.',
      'India ink only.',
      'Lactophenol cotton blue only.'
    ],
    answer: 'Modified acid-fast stain.',
    explanation: 'Cryptosporidium oocysts are classically detected with modified acid-fast staining or newer antigen and molecular methods. Routine wet mount alone may miss them.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-018-cyclospora-variable-acid-fast',
    area: 'analytic-parasitology',
    topic: 'Coccidian parasite staining',
    difficulty: 'intermediate',
    tags: ['Cyclospora cayetanensis', 'modified acid-fast stain', 'autofluorescence', 'stool oocysts'],
    prompt: 'A stool specimen contains larger coccidian oocysts that show variable modified acid-fast staining and may autofluoresce. Which organism is the classic teaching match?',
    choices: [
      'Cyclospora cayetanensis.',
      'Giardia duodenalis.',
      'Enterobius vermicularis.',
      'Plasmodium falciparum.'
    ],
    answer: 'Cyclospora cayetanensis.',
    explanation: 'Cyclospora oocysts are larger than Cryptosporidium and can show variable acid-fast staining. Autofluorescence can help support the identification in some workflows.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-019-cystoisospora-large-oocyst',
    area: 'analytic-parasitology',
    topic: 'Coccidian parasite staining',
    difficulty: 'advanced',
    tags: ['Cystoisospora belli', 'modified acid-fast stain', 'large oocysts', 'stool microscopy'],
    prompt: 'A modified acid-fast stain shows large, elongated oocysts in stool. Which coccidian parasite is the classic teaching match?',
    choices: [
      'Cystoisospora belli.',
      'Cryptosporidium parvum.',
      'Entamoeba histolytica.',
      'Trichomonas vaginalis.'
    ],
    answer: 'Cystoisospora belli.',
    explanation: 'Cystoisospora belli produces large elongated oocysts compared with Cryptosporidium. Size and shape help separate coccidian parasites on stool stains.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-020-microsporidia-modified-trichrome',
    area: 'analytic-parasitology',
    topic: 'Microsporidia detection',
    difficulty: 'advanced',
    tags: ['microsporidia', 'modified trichrome stain', 'spores', 'immunocompromised host'],
    prompt: 'A stool specimen from an immunocompromised patient is being evaluated for microsporidia. Which stain concept is most appropriate?',
    choices: [
      'Modified trichrome or another specialized stain to demonstrate tiny spores.',
      'Routine Gram stain only for helminth eggs.',
      'India ink to show a yeast capsule.',
      'Thick blood film to detect oocysts.'
    ],
    answer: 'Modified trichrome or another specialized stain to demonstrate tiny spores.',
    explanation: 'Microsporidia are tiny and can be missed with routine stool methods. Specialized stains or molecular methods are used depending on the lab workflow.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-021-trichomonas-vaginal-specimen',
    area: 'analytic-parasitology',
    topic: 'Urogenital protozoa',
    difficulty: 'beginner',
    tags: ['Trichomonas vaginalis', 'vaginal discharge', 'wet mount', 'NAAT'],
    prompt: 'Which specimen source is classically most useful for direct detection of motile Trichomonas vaginalis trophozoites?',
    choices: [
      'Fresh vaginal discharge or an appropriate urogenital specimen handled promptly.',
      'Formalin-fixed stool sediment only.',
      'Thick blood film only.',
      'Skin scraping from the forearm.'
    ],
    answer: 'Fresh vaginal discharge or an appropriate urogenital specimen handled promptly.',
    explanation: 'Trichomonas trophozoites are fragile, and motility is easiest to observe in fresh specimens. Many labs now use molecular methods, but specimen source still matters.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-022-dientamoeba-permanent-stain',
    area: 'analytic-parasitology',
    topic: 'Intestinal protozoa identification',
    difficulty: 'intermediate',
    tags: ['Dientamoeba fragilis', 'permanent stain', 'intestinal protozoa', 'stool microscopy'],
    prompt: 'A lab suspects Dientamoeba fragilis in stool. Which method is most useful in a classic microscopy workflow?',
    choices: [
      'Permanent stained smear.',
      'Scotch tape preparation.',
      'Thick blood film.',
      'Modified acid-fast stain for oocysts only.'
    ],
    answer: 'Permanent stained smear.',
    explanation: 'Dientamoeba fragilis is best recognized on permanent stained smears because trophozoite nuclear detail is important. Wet mounts and concentration alone may be insufficient.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-023-balantidium-ciliated-troph',
    area: 'analytic-parasitology',
    topic: 'Ciliated intestinal protozoa',
    difficulty: 'beginner',
    tags: ['Balantidium coli', 'ciliated protozoa', 'stool microscopy', 'intestinal protozoa'],
    prompt: 'A large intestinal protozoan trophozoite is covered with cilia. Which organism is the classic teaching match?',
    choices: [
      'Balantidium coli.',
      'Giardia duodenalis.',
      'Entamoeba histolytica.',
      'Cryptosporidium parvum.'
    ],
    answer: 'Balantidium coli.',
    explanation: 'Balantidium coli is the classic ciliated intestinal protozoan. Cilia and large size are key morphology clues.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-024-naegleria-csf-motile-amebae',
    area: 'analytic-parasitology',
    topic: 'Free-living amebae',
    difficulty: 'advanced',
    tags: ['Naegleria fowleri', 'CSF', 'free-living amebae', 'wet mount'],
    prompt: 'Motile ameboid trophozoites are seen in a fresh CSF wet mount from a rapidly progressive meningoencephalitis workup. Which organism is a classic teaching concern?',
    choices: [
      'Naegleria fowleri.',
      'Enterobius vermicularis.',
      'Taenia saginata.',
      'Giardia duodenalis.'
    ],
    answer: 'Naegleria fowleri.',
    explanation: 'Naegleria fowleri is a free-living ameba associated with primary amebic meningoencephalitis. This is a high-urgency lab recognition pattern that requires immediate escalation under protocol.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-025-acanthamoeba-contact-lens',
    area: 'analytic-parasitology',
    topic: 'Free-living amebae',
    difficulty: 'intermediate',
    tags: ['Acanthamoeba', 'contact lens', 'keratitis', 'free-living amebae'],
    prompt: 'A corneal specimen is submitted from a contact lens wearer with concern for free-living amebae. Which organism group belongs high in the differential?',
    choices: [
      'Acanthamoeba species.',
      'Enterobius vermicularis.',
      'Plasmodium vivax.',
      'Diphyllobothrium latum.'
    ],
    answer: 'Acanthamoeba species.',
    explanation: 'Acanthamoeba is classically associated with keratitis, especially in contact lens-related workflows. Testing may include microscopy, culture, histology, or molecular methods depending on the lab.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-026-enterobius-scotch-tape',
    area: 'analytic-parasitology',
    topic: 'Nematode diagnosis',
    difficulty: 'beginner',
    tags: ['Enterobius vermicularis', 'Scotch tape preparation', 'pinworm', 'eggs'],
    prompt: 'A child has suspected pinworm infection. Which specimen collection method is the classic teaching choice?',
    choices: [
      'Early-morning perianal adhesive tape preparation.',
      'Routine sputum concentration.',
      'Thick blood film.',
      'Modified acid-fast stool stain only.'
    ],
    answer: 'Early-morning perianal adhesive tape preparation.',
    explanation: 'Enterobius eggs are deposited in the perianal area, so adhesive tape collection is more useful than routine stool O&P for many cases.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-027-strongyloides-rhabditiform-larva',
    area: 'analytic-parasitology',
    topic: 'Nematode morphology',
    difficulty: 'intermediate',
    tags: ['Strongyloides stercoralis', 'rhabditiform larvae', 'stool microscopy', 'autoinfection'],
    prompt: 'A stool specimen shows rhabditiform larvae with a short buccal cavity and prominent genital primordium. Which organism is the classic teaching match?',
    choices: [
      'Strongyloides stercoralis.',
      'Enterobius vermicularis.',
      'Taenia solium.',
      'Diphyllobothrium latum.'
    ],
    answer: 'Strongyloides stercoralis.',
    explanation: 'Strongyloides rhabditiform larvae have characteristic morphology. Recognizing larvae rather than eggs is important in stool parasite workflow.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-028-strongyloides-autoinfection',
    area: 'analytic-parasitology',
    topic: 'Nematode life cycle',
    difficulty: 'advanced',
    tags: ['Strongyloides stercoralis', 'autoinfection', 'larvae', 'life cycle'],
    prompt: 'Why is Strongyloides stercoralis important in life-cycle teaching?',
    choices: [
      'It can maintain infection through autoinfection within the human host.',
      'It requires a freshwater snail as the only human infective stage.',
      'It is transmitted by eating undercooked freshwater fish only.',
      'It is diagnosed by finding malaria pigment in red blood cells.'
    ],
    answer: 'It can maintain infection through autoinfection within the human host.',
    explanation: 'Strongyloides has an autoinfection cycle, which separates it from many intestinal helminths. This life-cycle feature affects specimen expectations and clinical significance.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'draft'
  },
  {
    id: 'parasitology-029-hookworm-skin-penetration',
    area: 'analytic-parasitology',
    topic: 'Nematode transmission',
    difficulty: 'beginner',
    tags: ['hookworm', 'Necator', 'Ancylostoma', 'skin penetration'],
    prompt: 'Which transmission route is classically associated with hookworm infection?',
    choices: [
      'Filariform larvae penetrating skin from contaminated soil.',
      'Eating raw freshwater fish with plerocercoid larvae.',
      'Inhaling arthroconidia from mold culture.',
      'Mosquito injection of malaria sporozoites into red blood cells.'
    ],
    answer: 'Filariform larvae penetrating skin from contaminated soil.',
    explanation: 'Hookworm larvae can penetrate skin, often through contact with contaminated soil. Life-cycle stage and route are key study anchors.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-030-ascaris-fertilized-eggs',
    area: 'analytic-parasitology',
    topic: 'Nematode morphology',
    difficulty: 'beginner',
    tags: ['Ascaris lumbricoides', 'fertilized eggs', 'stool microscopy', 'helminths'],
    prompt: 'A stool concentration shows thick-shelled mammillated eggs. Which helminth is the classic teaching match?',
    choices: [
      'Ascaris lumbricoides.',
      'Enterobius vermicularis.',
      'Schistosoma haematobium.',
      'Diphyllobothrium latum.'
    ],
    answer: 'Ascaris lumbricoides.',
    explanation: 'Ascaris eggs are classic stool O&P morphology findings. Mammillated, thick-shelled fertilized eggs are a common teaching pattern.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-031-trichuris-barrel-eggs',
    area: 'analytic-parasitology',
    topic: 'Nematode morphology',
    difficulty: 'beginner',
    tags: ['Trichuris trichiura', 'barrel-shaped eggs', 'bipolar plugs', 'stool microscopy'],
    prompt: 'A stool specimen shows barrel-shaped eggs with bipolar plugs. Which helminth is the classic teaching match?',
    choices: [
      'Trichuris trichiura.',
      'Taenia saginata.',
      'Schistosoma mansoni.',
      'Fasciola hepatica.'
    ],
    answer: 'Trichuris trichiura.',
    explanation: 'Trichuris eggs are classically barrel-shaped with bipolar plugs. Egg morphology is a core bench skill in helminth identification.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-032-schistosoma-haematobium-urine',
    area: 'analytic-parasitology',
    topic: 'Schistosoma diagnosis',
    difficulty: 'intermediate',
    tags: ['Schistosoma haematobium', 'urine sediment', 'terminal spine', 'eggs'],
    prompt: 'A parasite egg with a terminal spine is suspected in a patient with urinary tract involvement. Which specimen source is classically important?',
    choices: [
      'Urine sediment.',
      'Scotch tape preparation.',
      'Thick blood film.',
      'CSF wet mount.'
    ],
    answer: 'Urine sediment.',
    explanation: 'Schistosoma haematobium eggs are classically recovered from urine and have a terminal spine. Specimen source is part of the organism identification pattern.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-033-schistosoma-mansoni-lateral-spine',
    area: 'analytic-parasitology',
    topic: 'Schistosoma morphology',
    difficulty: 'intermediate',
    tags: ['Schistosoma mansoni', 'lateral spine', 'stool microscopy', 'eggs'],
    prompt: 'A stool specimen contains Schistosoma-like eggs with a prominent lateral spine. Which species is the classic teaching match?',
    choices: [
      'Schistosoma mansoni.',
      'Schistosoma haematobium.',
      'Enterobius vermicularis.',
      'Diphyllobothrium latum.'
    ],
    answer: 'Schistosoma mansoni.',
    explanation: 'S. mansoni eggs are classically associated with a large lateral spine. S. haematobium eggs have a terminal spine and are usually linked to urine sediment.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-034-schistosoma-egg-viability',
    area: 'analytic-parasitology',
    topic: 'Schistosoma diagnostic methods',
    difficulty: 'advanced',
    tags: ['Schistosoma', 'miracidial hatching', 'egg viability', 'fresh specimen'],
    prompt: 'A lab needs to demonstrate Schistosoma egg viability. Which principle best fits the classic workflow?',
    choices: [
      'Use a fresh, appropriate specimen for a hatching or viability method according to protocol.',
      'Use formalin-fixed stool because it preserves larval movement.',
      'Use a coagulase test from a blood agar colony.',
      'Use a germ tube test after serum incubation.'
    ],
    answer: 'Use a fresh, appropriate specimen for a hatching or viability method according to protocol.',
    explanation: 'Viability testing depends on live egg or larval behavior, so preservation can interfere. The lab must follow the specific specimen and timing protocol.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-035-taenia-eggs-not-species',
    area: 'analytic-parasitology',
    topic: 'Cestode morphology',
    difficulty: 'intermediate',
    tags: ['Taenia', 'eggs', 'proglottids', 'cestodes'],
    prompt: 'Taenia eggs are seen in stool. Why is species-level identification not usually made from the egg alone?',
    choices: [
      'Taenia solium and Taenia saginata eggs are morphologically indistinguishable.',
      'Taenia eggs are only found in blood smears.',
      'Taenia eggs are acid-fast oocysts.',
      'Taenia eggs prove the parasite is a trematode.'
    ],
    answer: 'Taenia solium and Taenia saginata eggs are morphologically indistinguishable.',
    explanation: 'Taenia eggs do not reliably separate species. Proglottid or scolex morphology, epidemiology, or other methods may be needed depending on the lab workflow.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-036-taenia-solium-cysticercosis',
    area: 'analytic-parasitology',
    topic: 'Cestode life cycle',
    difficulty: 'advanced',
    tags: ['Taenia solium', 'cysticercosis', 'eggs', 'accidental intermediate host'],
    prompt: 'Why is Taenia solium emphasized separately from Taenia saginata in life-cycle teaching?',
    choices: [
      'Humans can develop cysticercosis after ingesting T. solium eggs.',
      'T. solium eggs are always larger and easy to distinguish in stool.',
      'T. solium is transmitted only by mosquito bite.',
      'T. solium is a blood parasite detected on thick films.'
    ],
    answer: 'Humans can develop cysticercosis after ingesting T. solium eggs.',
    explanation: 'T. solium can cause intestinal taeniasis from cysticerci in pork and cysticercosis from ingestion of eggs. That life-cycle distinction matters more than egg morphology.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-037-diphyllobothrium-freshwater-fish',
    area: 'analytic-parasitology',
    topic: 'Cestode transmission',
    difficulty: 'beginner',
    tags: ['Diphyllobothrium latum', 'freshwater fish', 'operculated eggs', 'cestodes'],
    prompt: 'Which exposure is classically associated with Diphyllobothrium latum infection?',
    choices: [
      'Eating raw or undercooked freshwater fish.',
      'Skin penetration by larvae in soil.',
      'Mosquito transmission of sporozoites.',
      'Perianal egg deposition at night.'
    ],
    answer: 'Eating raw or undercooked freshwater fish.',
    explanation: 'Diphyllobothrium latum is the broad fish tapeworm. Freshwater fish exposure is a key life-cycle clue.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-038-echinococcus-hydatid-safety',
    area: 'analytic-parasitology',
    topic: 'Cestode tissue infection',
    difficulty: 'advanced',
    tags: ['Echinococcus granulosus', 'hydatid cyst', 'scolices', 'lab safety'],
    prompt: 'Hydatid cyst material is submitted with concern for Echinococcus. What is the safest bench-learning principle?',
    choices: [
      'Handle according to laboratory safety and specimen-processing protocol because cyst fluid can contain infectious protoscolices.',
      'Perform routine stool concentration first because adult worms are usually recovered in human stool.',
      'Use a thick blood film to find adult tapeworms.',
      'Report the organism from colony color on blood agar.'
    ],
    answer: 'Handle according to laboratory safety and specimen-processing protocol because cyst fluid can contain infectious protoscolices.',
    explanation: 'Humans are accidental intermediate hosts in echinococcosis. Hydatid material is not a routine stool O&P problem and should be handled by protocol.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-039-paragonimus-sputum-eggs',
    area: 'analytic-parasitology',
    topic: 'Trematode diagnosis',
    difficulty: 'intermediate',
    tags: ['Paragonimus westermani', 'sputum', 'operculated eggs', 'lung fluke'],
    prompt: 'A lung fluke infection is suspected. Which specimen may be useful because parasite eggs can be coughed up and swallowed or expectorated?',
    choices: [
      'Sputum.',
      'Perianal tape only.',
      'Thick blood film only.',
      'Skin snip only.'
    ],
    answer: 'Sputum.',
    explanation: 'Paragonimus species are lung flukes, and eggs may be found in sputum or stool depending on the workflow. Specimen selection follows the parasite location.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-040-fasciola-large-operculated-eggs',
    area: 'analytic-parasitology',
    topic: 'Trematode morphology',
    difficulty: 'intermediate',
    tags: ['Fasciola hepatica', 'operculated eggs', 'trematodes', 'stool microscopy'],
    prompt: 'A stool specimen contains large operculated trematode eggs. Which organism is a classic teaching possibility when liver fluke exposure is considered?',
    choices: [
      'Fasciola hepatica.',
      'Enterobius vermicularis.',
      'Plasmodium malariae.',
      'Trichomonas vaginalis.'
    ],
    answer: 'Fasciola hepatica.',
    explanation: 'Fasciola hepatica eggs are large and operculated. Trematode egg morphology must be interpreted with exposure, source, and lab reference criteria.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-041-angio-eosinophilic-meningitis',
    area: 'analytic-parasitology',
    topic: 'Tissue nematode concepts',
    difficulty: 'advanced',
    tags: ['Angiostrongylus cantonensis', 'eosinophilic meningitis', 'larva migrans', 'helminths'],
    prompt: 'A parasite review case highlights eosinophilic meningitis after ingestion of contaminated raw produce or intermediate hosts. Which parasite is a classic teaching association?',
    choices: [
      'Angiostrongylus cantonensis.',
      'Enterobius vermicularis.',
      'Giardia duodenalis.',
      'Cryptosporidium parvum.'
    ],
    answer: 'Angiostrongylus cantonensis.',
    explanation: 'Angiostrongylus cantonensis is classically associated with eosinophilic meningitis. The educational focus is life cycle, exposure, and specimen-test logic rather than routine stool identification.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-042-trichinella-bear-pork-exposure',
    area: 'analytic-parasitology',
    topic: 'Tissue nematode concepts',
    difficulty: 'intermediate',
    tags: ['Trichinella spiralis', 'undercooked meat', 'bear meat', 'larvae in muscle'],
    prompt: 'A parasite case involves fever, muscle pain, eosinophilia, and a history of eating undercooked wild game. Which organism is the classic teaching match?',
    choices: [
      'Trichinella spiralis.',
      'Diphyllobothrium latum.',
      'Enterobius vermicularis.',
      'Giardia duodenalis.'
    ],
    answer: 'Trichinella spiralis.',
    explanation: 'Trichinella infection is linked to encysted larvae in undercooked meat, including pork or wild game. Muscle involvement and eosinophilia are key learning clues.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-043-onchocerca-skin-snip',
    area: 'analytic-parasitology',
    topic: 'Filarial nematode diagnosis',
    difficulty: 'intermediate',
    tags: ['Onchocerca volvulus', 'skin snip', 'microfilariae', 'filarial worms'],
    prompt: 'Which specimen method is classically associated with detecting microfilariae of Onchocerca volvulus?',
    choices: [
      'Skin snip examination.',
      'Perianal Scotch tape preparation.',
      'Thick blood film collected at midnight only.',
      'Routine sputum Gram stain.'
    ],
    answer: 'Skin snip examination.',
    explanation: 'Onchocerca microfilariae are classically detected from skin snips. Filarial testing depends strongly on organism location and periodicity.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-044-filarial-blood-periodicity',
    area: 'analytic-parasitology',
    topic: 'Filarial nematode diagnosis',
    difficulty: 'advanced',
    tags: ['filariae', 'microfilariae', 'blood collection timing', 'periodicity'],
    prompt: 'Why does collection timing matter for some blood microfilariae exams?',
    choices: [
      'Some species show periodic circulation in peripheral blood, so timing affects detection.',
      'Microfilariae are visible only after stool concentration.',
      'Timing determines whether the organism becomes a dermatophyte.',
      'Blood timing is irrelevant for every parasite.'
    ],
    answer: 'Some species show periodic circulation in peripheral blood, so timing affects detection.',
    explanation: 'Some filarial microfilariae circulate more predictably at certain times. The lab should collect specimens according to organism suspicion and protocol.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-045-thick-thin-malaria-smears',
    area: 'analytic-parasitology',
    topic: 'Malaria smear workflow',
    difficulty: 'beginner',
    tags: ['malaria', 'thick blood film', 'thin blood film', 'Plasmodium'],
    prompt: 'Why are both thick and thin blood films used in malaria microscopy?',
    choices: [
      'Thick films improve detection sensitivity, while thin films help with species identification and parasite morphology.',
      'Thick films identify helminth eggs, while thin films identify adult worms.',
      'Thick films are for fungi, while thin films are for bacteria.',
      'Thick films replace the need for blood collection timing and travel history.'
    ],
    answer: 'Thick films improve detection sensitivity, while thin films help with species identification and parasite morphology.',
    explanation: 'Malaria microscopy uses thick and thin films for different purposes. Good smear quality and patient history are essential for interpretation.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-046-malaria-stat-procedure',
    area: 'analytic-parasitology',
    topic: 'Malaria smear workflow',
    difficulty: 'beginner',
    tags: ['malaria', 'STAT procedure', 'blood parasites', 'travel history'],
    prompt: 'Why are malaria smears usually treated as urgent laboratory work?',
    choices: [
      'Delay can affect patient management and parasite morphology, so prompt smear preparation and review are important.',
      'Malaria parasites become helminth eggs after 24 hours.',
      'Malaria can only be detected after routine stool O&P.',
      'Malaria smears are used only for dermatophyte identification.'
    ],
    answer: 'Delay can affect patient management and parasite morphology, so prompt smear preparation and review are important.',
    explanation: 'Malaria evaluation is time-sensitive. The lab needs proper blood films, repeat testing when indicated, and key history such as travel and prophylaxis information.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-047-plasmodium-falciparum-severity',
    area: 'analytic-parasitology',
    topic: 'Malaria species recognition',
    difficulty: 'intermediate',
    tags: ['Plasmodium falciparum', 'malaria', 'multiple ring forms', 'banana gametocytes'],
    prompt: 'A thin blood film shows multiple delicate ring forms in red blood cells and crescent-shaped gametocytes. Which malaria species is the classic teaching match?',
    choices: [
      'Plasmodium falciparum.',
      'Plasmodium malariae.',
      'Plasmodium vivax.',
      'Babesia microti.'
    ],
    answer: 'Plasmodium falciparum.',
    explanation: 'P. falciparum is classically associated with multiple delicate rings and crescent-shaped gametocytes. Species identification requires careful thin-film morphology and lab criteria.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-048-plasmodium-malariae-band-forms',
    area: 'analytic-parasitology',
    topic: 'Malaria species recognition',
    difficulty: 'intermediate',
    tags: ['Plasmodium malariae', 'band forms', 'malaria', 'thin blood film'],
    prompt: 'A thin blood film shows band-form trophozoites crossing infected red blood cells. Which malaria species is the classic teaching match?',
    choices: [
      'Plasmodium malariae.',
      'Plasmodium falciparum.',
      'Plasmodium ovale.',
      'Trypanosoma cruzi.'
    ],
    answer: 'Plasmodium malariae.',
    explanation: 'Band forms are a classic morphology clue for P. malariae. Malaria species calls should be made from well-prepared thin films and appropriate expertise.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-049-plasmodium-vivax-ovale-stippling',
    area: 'analytic-parasitology',
    topic: 'Malaria species recognition',
    difficulty: 'advanced',
    tags: ['Plasmodium vivax', 'Plasmodium ovale', 'Schuffner dots', 'hypnozoites'],
    prompt: 'A malaria smear shows enlarged infected red cells with fine stippling. Which teaching concept fits Plasmodium vivax and Plasmodium ovale?',
    choices: [
      'They can show Schuffner-type stippling and have dormant liver stages that may relapse.',
      'They always infect only banana-shaped red cells.',
      'They are diagnosed by perianal tape preparation.',
      'They are adult cestodes recovered from stool.'
    ],
    answer: 'They can show Schuffner-type stippling and have dormant liver stages that may relapse.',
    explanation: 'P. vivax and P. ovale are classically associated with enlarged infected RBCs and stippling. Their hypnozoite stage is an important life-cycle concept.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-050-plasmodium-knowlesi-mimic',
    area: 'analytic-parasitology',
    topic: 'Malaria species recognition',
    difficulty: 'advanced',
    tags: ['Plasmodium knowlesi', 'malaria', 'species mimic', 'thin blood film'],
    prompt: 'Why is Plasmodium knowlesi important in malaria morphology teaching?',
    choices: [
      'Its blood stages can resemble other Plasmodium species, so exposure history and reference confirmation may matter.',
      'It is detected by modified acid-fast stain of stool.',
      'It is a tapeworm transmitted by freshwater fish.',
      'It is identified by finding eggs on perianal tape.'
    ],
    answer: 'Its blood stages can resemble other Plasmodium species, so exposure history and reference confirmation may matter.',
    explanation: 'P. knowlesi can resemble P. falciparum or P. malariae depending on stage. Travel or exposure context and confirmatory testing may be needed.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-051-babesia-maltese-cross',
    area: 'analytic-parasitology',
    topic: 'Blood parasite recognition',
    difficulty: 'intermediate',
    tags: ['Babesia', 'Maltese cross', 'blood smear', 'tickborne'],
    prompt: 'A blood smear shows intraerythrocytic ring forms and occasional tetrads arranged like a Maltese cross. Which organism is the classic teaching match?',
    choices: [
      'Babesia species.',
      'Plasmodium vivax.',
      'Trypanosoma brucei.',
      'Leishmania donovani.'
    ],
    answer: 'Babesia species.',
    explanation: 'Babesia can resemble malaria on blood smear, but tetrads are a classic clue. Travel, tick exposure, and RBC morphology help the lab branch correctly.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-052-trypanosoma-cruzi-trypomastigote',
    area: 'analytic-parasitology',
    topic: 'Blood and tissue protozoa',
    difficulty: 'advanced',
    tags: ['Trypanosoma cruzi', 'trypomastigote', 'Chagas disease', 'blood smear'],
    prompt: 'A blood smear shows curved trypomastigotes with a prominent kinetoplast. Which organism is the classic teaching match?',
    choices: [
      'Trypanosoma cruzi.',
      'Plasmodium falciparum.',
      'Giardia duodenalis.',
      'Entamoeba coli.'
    ],
    answer: 'Trypanosoma cruzi.',
    explanation: 'Trypanosoma cruzi trypomastigotes have a prominent kinetoplast and curved shape. Microscopy, serology, or molecular methods may be used depending on disease stage and lab protocol.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-053-leishmania-amastigotes',
    area: 'analytic-parasitology',
    topic: 'Blood and tissue protozoa',
    difficulty: 'advanced',
    tags: ['Leishmania', 'amastigotes', 'macrophages', 'kala-azar'],
    prompt: 'A tissue smear shows intracellular amastigotes within macrophages, each with a nucleus and kinetoplast. Which organism group is the classic teaching match?',
    choices: [
      'Leishmania species.',
      'Giardia species.',
      'Cryptosporidium species.',
      'Enterobius species.'
    ],
    answer: 'Leishmania species.',
    explanation: 'Leishmania amastigotes are found in macrophages and have nucleus plus kinetoplast morphology. The specimen source and syndrome guide the testing workflow.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-054-toxoplasma-serology-context',
    area: 'analytic-parasitology',
    topic: 'Toxoplasma testing',
    difficulty: 'intermediate',
    tags: ['Toxoplasma gondii', 'serology', 'IgG', 'IgM', 'congenital infection'],
    prompt: 'Why is Toxoplasma gondii testing often interpreted with serologic patterns rather than one isolated result?',
    choices: [
      'IgG, IgM, timing, and clinical context affect whether results suggest past exposure or possible recent infection.',
      'Toxoplasma is identified by finding adult worms in stool.',
      'Toxoplasma grows as lactose-fermenting colonies on MacConkey agar.',
      'Toxoplasma is confirmed by coagulase testing.'
    ],
    answer: 'IgG, IgM, timing, and clinical context affect whether results suggest past exposure or possible recent infection.',
    explanation: 'Toxoplasma serology is pattern-based and can be complex. The lab follows its validated algorithm, especially in pregnancy or immunocompromised contexts.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-055-toxoplasma-life-cycle',
    area: 'analytic-parasitology',
    topic: 'Toxoplasma life cycle',
    difficulty: 'beginner',
    tags: ['Toxoplasma gondii', 'cats', 'oocysts', 'undercooked meat'],
    prompt: 'Which life-cycle concept is central to Toxoplasma gondii teaching?',
    choices: [
      'Cats are the definitive host, and humans may acquire infection from oocysts or tissue cysts.',
      'Mosquitoes inject adult worms into the blood.',
      'Humans acquire infection only from freshwater fish tapeworm larvae.',
      'The organism is transmitted only by perianal eggs.'
    ],
    answer: 'Cats are the definitive host, and humans may acquire infection from oocysts or tissue cysts.',
    explanation: 'Toxoplasma life-cycle learning centers on feline definitive hosts, environmental oocysts, tissue cysts, and congenital or immunocompromised testing concerns.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
    id: 'parasitology-056-parasite-specimen-source-matching',
    area: 'analytic-parasitology',
    topic: 'Parasitology specimen selection',
    difficulty: 'beginner',
    tags: ['specimen selection', 'parasite diagnosis', 'bench workflow', 'source'],
    prompt: 'Which approach best matches Learn Microbes bench-first parasitology?',
    choices: [
      'Match the suspected parasite stage to the right specimen source and detection method.',
      'Use the same stool O&P method for every parasite in the body.',
      'Identify every parasite by colony color on blood agar.',
      'Ignore life cycle because morphology is always enough.'
    ],
    answer: 'Match the suspected parasite stage to the right specimen source and detection method.',
    explanation: 'Parasitology is stage-and-source dependent. Eggs, larvae, trophozoites, cysts, oocysts, and blood stages require different specimens and methods.',
    source: 'Learn Microbes original question bank: Parasitology',
    status: 'published'
  },
  {
  id: 'parasitology-057-amoeba-rbc-ingestion-case',
  area: 'analytic-parasitology',
  topic: 'Entamoeba problem solving',
  difficulty: 'intermediate',
  tags: ['Entamoeba histolytica', 'ingested RBCs', 'permanent stain', 'stool microscopy'],
  prompt: 'A permanent stained stool smear shows amebic trophozoites containing ingested red blood cells. Which organism is the classic teaching match?',
  choices: [
  'Entamoeba histolytica.',
  'Entamoeba dispar.',
  'Entamoeba coli.',
  'Iodamoeba butschlii.'
  ],
  answer: 'Entamoeba histolytica.',
  explanation: 'Ingested RBCs are a key teaching clue for E. histolytica trophozoites. Cyst morphology alone may not separate E. histolytica from E. dispar.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'parasitology-058-cryptosporidium-modified-acid-fast-case',
  area: 'analytic-parasitology',
  topic: 'Coccidian parasite problem solving',
  difficulty: 'beginner',
  tags: ['Cryptosporidium', 'modified acid-fast stain', 'stool oocysts', 'coccidia'],
  prompt: 'A stool specimen from a patient with diarrhea shows small round oocysts on modified acid-fast stain. Which organism is the classic teaching match?',
  choices: [
  'Cryptosporidium species.',
  'Giardia duodenalis.',
  'Enterobius vermicularis.',
  'Balantidium coli.'
  ],
  answer: 'Cryptosporidium species.',
  explanation: 'Cryptosporidium oocysts are small and acid-fast variable to positive with modified acid-fast methods. Many labs also use antigen or molecular assays.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'parasitology-059-enterobius-tape-case',
  area: 'analytic-parasitology',
  topic: 'Nematode problem solving',
  difficulty: 'beginner',
  tags: ['Enterobius vermicularis', 'Scotch tape preparation', 'pinworm', 'eggs'],
  prompt: 'A pediatric case raises concern for pinworm infection. Which specimen collection method is the classic teaching choice?',
  choices: [
  'Early-morning perianal adhesive tape preparation.',
  'Thick blood film.',
  'CSF wet mount.',
  'Modified acid-fast stool stain only.'
  ],
  answer: 'Early-morning perianal adhesive tape preparation.',
  explanation: 'Enterobius eggs are deposited in the perianal area. Adhesive tape collection is usually more useful than routine stool O&P for this organism.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'parasitology-060-malaria-thick-thin-smear-case',
  area: 'analytic-parasitology',
  topic: 'Malaria problem solving',
  difficulty: 'beginner',
  tags: ['malaria', 'thick blood film', 'thin blood film', 'Plasmodium'],
  prompt: 'A malaria evaluation is ordered. Why should both thick and thin blood films be prepared?',
  choices: [
  'Thick films improve detection sensitivity, while thin films help with species morphology.',
  'Thick films identify helminth eggs, while thin films identify adult worms.',
  'Thick films are for fungi, while thin films are for bacteria.',
  'Thin films replace the need for travel history.'
  ],
  answer: 'Thick films improve detection sensitivity, while thin films help with species morphology.',
  explanation: 'Thick and thin films answer different malaria microscopy questions. Proper smear preparation, timing, and travel history all matter.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'parasitology-061-babesia-maltese-cross-case',
  area: 'analytic-parasitology',
  topic: 'Blood parasite problem solving',
  difficulty: 'intermediate',
  tags: ['Babesia', 'Maltese cross', 'blood smear', 'tickborne'],
  prompt: 'A tick-exposure blood parasite workup shows intraerythrocytic ring forms and occasional tetrads arranged like a Maltese cross. Which organism is the classic teaching match?',
  choices: [
  'Babesia species.',
  'Plasmodium vivax.',
  'Trypanosoma cruzi.',
  'Leishmania donovani.'
  ],
  answer: 'Babesia species.',
  explanation: 'Babesia can resemble malaria on blood smear, but tetrads are a classic clue. Exposure history and RBC morphology help guide the branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'parasitology-062-strongyloides-autoinfection-case',
  area: 'analytic-parasitology',
  topic: 'Strongyloides problem solving',
  difficulty: 'advanced',
  tags: ['Strongyloides stercoralis', 'autoinfection', 'larvae', 'immunocompromised host'],
  prompt: 'A patient with remote exposure risk has recurrent larvae detected in stool years later. Which life-cycle concept explains why Strongyloides can persist?',
  choices: [
  'Autoinfection within the human host.',
  'Dormant hypnozoites in red blood cells.',
  'Adult worms living only in freshwater fish.',
  'Transmission only by perianal egg deposition.'
  ],
  answer: 'Autoinfection within the human host.',
  explanation: 'Strongyloides can maintain infection through autoinfection. This life-cycle feature is a key reason the organism is emphasized in parasitology problem solving.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'parasitology-063-leishmania-amastigote-case',
  area: 'analytic-parasitology',
  topic: 'Tissue protozoa problem solving',
  difficulty: 'advanced',
  tags: ['Leishmania', 'amastigotes', 'macrophages', 'kinetoplast'],
  prompt: 'A tissue smear shows intracellular amastigotes within macrophages. Each form has a nucleus and kinetoplast. Which organism group is the classic teaching match?',
  choices: [
  'Leishmania species.',
  'Giardia species.',
  'Cryptosporidium species.',
  'Enterobius species.'
  ],
  answer: 'Leishmania species.',
  explanation: 'Leishmania amastigotes are intracellular in macrophages and show nucleus plus kinetoplast morphology. Source and syndrome guide the testing workflow.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
    id: 'mycology-001-koh-purpose',
    area: 'analytic-mycology',
    topic: 'Direct fungal examination',
    difficulty: 'beginner',
    tags: ['KOH', 'fungal elements', 'direct exam'],
    prompt: 'A skin scraping is examined for fungal elements. What is the main purpose of potassium hydroxide in a direct preparation?',
    choices: [
      'Clear keratin and cellular debris so fungal elements are easier to see.',
      'Confirm bacterial beta-lactamase production.',
      'Selectively grow mycobacteria.',
      'Measure viral load.'
    ],
    answer: 'Clear keratin and cellular debris so fungal elements are easier to see.',
    explanation: 'KOH helps dissolve host keratin and background material, improving visualization of hyphae or yeast-like structures in direct fungal exams.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-002-cryptococcus-capsule',
    area: 'analytic-mycology',
    topic: 'Yeast identification',
    difficulty: 'beginner',
    tags: ['Cryptococcus', 'capsule', 'CSF', 'antigen'],
    prompt: 'An encapsulated yeast is suspected in CSF from an immunocompromised patient. Which testing direction best supports cryptococcal disease workup?',
    choices: [
      'Cryptococcal antigen testing and appropriate microscopy/culture correlation.',
      'Oxidase testing alone.',
      'Routine urine colony count only.',
      'CAMP testing for group B streptococci.'
    ],
    answer: 'Cryptococcal antigen testing and appropriate microscopy/culture correlation.',
    explanation: 'Cryptococcus workup often includes antigen detection plus microscopy and culture correlation. Encapsulated yeast in CSF is a high-yield clinical association.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-003-germ-tube',
    area: 'analytic-mycology',
    topic: 'Yeast identification',
    difficulty: 'intermediate',
    tags: ['Candida albicans', 'germ tube', 'yeast'],
    prompt: 'A yeast isolate produces germ tubes under appropriate test conditions. Which organism group is classically supported by this finding?',
    choices: [
      'Candida albicans/Candida dubliniensis group.',
      'Cryptococcus neoformans.',
      'Aspergillus fumigatus.',
      'Trichophyton rubrum.'
    ],
    answer: 'Candida albicans/Candida dubliniensis group.',
    explanation: 'Germ tube positivity supports the C. albicans/C. dubliniensis group in the right workflow. It is not a universal yeast identification method.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-004-dimorphic-fungi',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'intermediate',
    tags: ['dimorphic fungi', 'Histoplasma', 'Blastomyces', 'Coccidioides'],
    prompt: 'A mold from a respiratory specimen raises concern for a thermally dimorphic pathogen. What is the safest general principle?',
    choices: [
      'Handle according to fungal safety policy and use validated identification or reference methods rather than casual open-bench manipulation.',
      'Open the culture freely because dimorphic fungi are never infectious in the lab.',
      'Identify it by lactose fermentation on MacConkey agar.',
      'Discard the culture because molds cannot cause pulmonary disease.'
    ],
    answer: 'Handle according to fungal safety policy and use validated identification or reference methods rather than casual open-bench manipulation.',
    explanation: 'Dimorphic fungi can pose laboratory exposure risks. Suspicious molds should be handled with appropriate biosafety precautions and confirmatory workflows.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-005-dermatophyte-structures',
    area: 'analytic-mycology',
    topic: 'Dermatophyte identification',
    difficulty: 'advanced',
    tags: ['dermatophytes', 'macroconidia', 'microconidia', 'hyphae'],
    prompt: 'A mold from a skin specimen is being evaluated as a possible dermatophyte. Which features are most useful microscopically?',
    choices: [
      'Hyphal morphology plus macroconidia and microconidia arrangement.',
      'Coagulase and catalase only.',
      'Urease and indole only.',
      'Acid-fast bacilli count only.'
    ],
    answer: 'Hyphal morphology plus macroconidia and microconidia arrangement.',
    explanation: 'Dermatophyte identification uses colony features and microscopic morphology, including macroconidia, microconidia, and hyphal structures.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-006-coccidioides-safety',
    area: 'analytic-mycology',
    topic: 'Mold safety',
    difficulty: 'advanced',
    tags: ['Coccidioides', 'arthroconidia', 'biosafety', 'dimorphic fungi'],
    prompt: 'A mold culture from a patient with desert Southwest exposure develops suspicious barrel-shaped arthroconidia. What is the best laboratory response?',
    choices: [
      'Stop routine manipulation and follow laboratory safety and confirmatory identification policy.',
      'Perform vigorous tape prep on the open bench to make more spores.',
      'Report it as normal skin flora.',
      'Use a urine colony count to confirm the mold.'
    ],
    answer: 'Stop routine manipulation and follow laboratory safety and confirmatory identification policy.',
    explanation: 'Coccidioides is a major laboratory-acquired infection concern. Suspicious morphology and exposure history should trigger safety-aware handling.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-007-aseptate-hyphae',
    area: 'analytic-mycology',
    topic: 'Mold morphology',
    difficulty: 'intermediate',
    tags: ['Mucorales', 'aseptate hyphae', 'broad hyphae'],
    prompt: 'A tissue preparation shows broad, ribbon-like hyphae with few septations and irregular branching. Which mold group is classically suggested?',
    choices: [
      'Mucorales-type molds.',
      'Dermatophytes only.',
      'Candida albicans yeast only.',
      'Cryptococcus neoformans only.'
    ],
    answer: 'Mucorales-type molds.',
    explanation: 'Broad pauci-septate hyphae with irregular branching support Mucorales-type morphology. Tissue findings should be correlated with culture and clinical context.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'draft'
  },
  {
    id: 'mycology-008-cryptococcus-gattii-environment',
    area: 'analytic-mycology',
    topic: 'Yeast identification',
    difficulty: 'advanced',
    tags: ['Cryptococcus gattii', 'CBG agar', 'environmental exposure'],
    prompt: 'A Cryptococcus isolate is being evaluated for species complex differentiation, and the lab uses a medium that detects glycine and canavanine-related reactions. Which purpose best fits this workflow?',
    choices: [
      'Differentiating Cryptococcus gattii complex from Cryptococcus neoformans complex in a validated workflow.',
      'Confirming Streptococcus pyogenes from throat culture.',
      'Detecting inducible clindamycin resistance.',
      'Counting urine colony-forming units.'
    ],
    answer: 'Differentiating Cryptococcus gattii complex from Cryptococcus neoformans complex in a validated workflow.',
    explanation: 'Selected media such as CGB-type agar can help separate Cryptococcus gattii complex from C. neoformans complex when used in an appropriate identification algorithm.',
    source: 'Learn Microbes original question bank: Analytic Procedures for Mycology',
    status: 'published'
  },
  {
    id: 'mycology-009-fungal-specimen-moist-sterile',
    area: 'analytic-mycology',
    topic: 'Fungal specimen handling',
    difficulty: 'beginner',
    tags: ['mycology', 'specimen handling', 'fungal culture', 'preanalytics'],
    prompt: 'A skin scraping is submitted for fungal culture. Which handling principle best protects recovery and interpretation?',
    choices: [
      'Keep the specimen in the collection container recommended by the lab and avoid contamination or drying when inappropriate.',
      'Place the specimen in routine viral transport medium for all fungal cultures.',
      'Flood the specimen with formalin before culture setup.',
      'Leave the specimen open on the bench until the next batch is ready.'
    ],
    answer: 'Keep the specimen in the collection container recommended by the lab and avoid contamination or drying when inappropriate.',
    explanation: 'Fungal recovery depends on source and collection quality. The lab’s collection instructions help preserve viable fungus and reduce environmental contamination.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-010-koh-skin-hair-nails',
    area: 'analytic-mycology',
    topic: 'Direct fungal examination',
    difficulty: 'beginner',
    tags: ['KOH prep', 'dermatophytes', 'skin scraping', 'hair', 'nails'],
    prompt: 'Why is a potassium hydroxide preparation useful for skin, hair, or nail specimens submitted for possible fungal elements?',
    choices: [
      'KOH clears keratin and debris so fungal hyphae or yeast forms can be seen more easily.',
      'KOH makes all fungi grow faster in culture.',
      'KOH stains bacteria acid-fast.',
      'KOH confirms species-level identification by itself.'
    ],
    answer: 'KOH clears keratin and debris so fungal hyphae or yeast forms can be seen more easily.',
    explanation: 'KOH direct exam is a screening tool. It helps reveal fungal elements in keratinized tissue, but culture or other identification methods may still be needed.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-011-india-ink-capsule-concept',
    area: 'analytic-mycology',
    topic: 'Cryptococcus direct examination',
    difficulty: 'beginner',
    tags: ['India ink', 'Cryptococcus', 'capsule', 'CSF'],
    prompt: 'An India ink preparation is performed on a CSF specimen. What does the classic positive finding demonstrate?',
    choices: [
      'Encapsulated yeast with a clear halo against the dark background.',
      'Septate hyphae with acute-angle branching.',
      'Broad aseptate hyphae with right-angle branching.',
      'Acid-fast bacilli with beaded staining.'
    ],
    answer: 'Encapsulated yeast with a clear halo against the dark background.',
    explanation: 'India ink is a negative stain that can show the capsule of Cryptococcus-like yeast. It is a direct exam clue, not a full identification workflow by itself.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-012-dermatophytes-superficial-tissue',
    area: 'analytic-mycology',
    topic: 'Dermatophyte concepts',
    difficulty: 'beginner',
    tags: ['dermatophytes', 'skin', 'hair', 'nails', 'keratin'],
    prompt: 'Why are dermatophytes usually associated with skin, hair, and nail specimens?',
    choices: [
      'They use keratinized tissue as their main growth niche.',
      'They are obligate intracellular fungi recovered only in cell culture.',
      'They grow only in blood cultures.',
      'They are gram-negative diplococci.'
    ],
    answer: 'They use keratinized tissue as their main growth niche.',
    explanation: 'Dermatophytes infect keratinized tissue, so proper sampling from the active edge of skin lesions, infected hair, or affected nail material matters for recovery.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-013-sabouraud-fungal-medium',
    area: 'analytic-mycology',
    topic: 'Fungal culture media',
    difficulty: 'beginner',
    tags: ['Sabouraud agar', 'fungal culture', 'molds', 'yeasts'],
    prompt: 'Why is Sabouraud dextrose agar commonly used in fungal culture workflows?',
    choices: [
      'Its formulation supports many yeasts and molds while helping reduce some bacterial competition.',
      'It is selective only for acid-fast bacilli.',
      'It is used to identify Neisseria by carbohydrate utilization.',
      'It confirms toxin production by Clostridium species.'
    ],
    answer: 'Its formulation supports many yeasts and molds while helping reduce some bacterial competition.',
    explanation: 'Sabouraud agar is a basic fungal recovery medium. The final workflow still depends on specimen source, colony morphology, microscopic morphology, and additional tests.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-014-candida-germ-tube',
    area: 'analytic-mycology',
    topic: 'Yeast identification',
    difficulty: 'beginner',
    tags: ['Candida albicans', 'germ tube', 'yeast identification', 'Candida dubliniensis'],
    prompt: 'A yeast isolate forms true germ tubes after incubation in serum. Which interpretation best fits a classic teaching workflow?',
    choices: [
      'The result supports Candida albicans or Candida dubliniensis and should be interpreted with the full ID workflow.',
      'The result confirms Cryptococcus neoformans.',
      'The result proves the isolate is a dermatophyte.',
      'The result identifies a Mucorales mold.'
    ],
    answer: 'The result supports Candida albicans or Candida dubliniensis and should be interpreted with the full ID workflow.',
    explanation: 'A positive germ tube test is a classic rapid clue for C. albicans and C. dubliniensis. It should not be treated as a complete modern yeast identification by itself.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-015-pseudohyphae-vs-germ-tube',
    area: 'analytic-mycology',
    topic: 'Yeast morphology',
    difficulty: 'intermediate',
    tags: ['germ tube', 'pseudohyphae', 'Candida', 'yeast morphology'],
    prompt: 'What is the key morphology distinction between a true germ tube and a pseudohyphal constriction?',
    choices: [
      'A true germ tube lacks constriction at its point of origin from the yeast cell.',
      'A true germ tube is always pigmented black on niger seed agar.',
      'A true germ tube is a bacterial spore.',
      'A true germ tube appears only in molds and never in yeasts.'
    ],
    answer: 'A true germ tube lacks constriction at its point of origin from the yeast cell.',
    explanation: 'True germ tubes arise without a constriction at the base. Pseudohyphae can mimic germ tubes, so careful microscopic reading matters.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-016-cornmeal-yeast-morphology',
    area: 'analytic-mycology',
    topic: 'Yeast morphology media',
    difficulty: 'intermediate',
    tags: ['cornmeal agar', 'Tween 80', 'yeast morphology', 'chlamydospores'],
    prompt: 'Why might cornmeal agar with Tween 80 be used in a yeast identification workflow?',
    choices: [
      'It encourages structures such as pseudohyphae, blastoconidia, arthroconidia, or chlamydospores that help with identification.',
      'It is the main medium for acid-fast bacilli.',
      'It confirms bacterial beta-lactamase production.',
      'It replaces all carbohydrate assimilation testing.'
    ],
    answer: 'It encourages structures such as pseudohyphae, blastoconidia, arthroconidia, or chlamydospores that help with identification.',
    explanation: 'Cornmeal morphology is a classic yeast ID tool. It helps learners connect microscopic structures with yeast groups, but it may be supplemented by modern ID systems.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-017-cryptococcus-urease-niger-seed',
    area: 'analytic-mycology',
    topic: 'Cryptococcus identification',
    difficulty: 'intermediate',
    tags: ['Cryptococcus neoformans', 'urease', 'niger seed agar', 'phenol oxidase'],
    prompt: 'A yeast from CSF is urease positive and produces brown pigment on niger seed agar. Which organism is the classic teaching match?',
    choices: [
      'Cryptococcus neoformans.',
      'Candida albicans.',
      'Geotrichum candidum.',
      'Aspergillus fumigatus.'
    ],
    answer: 'Cryptococcus neoformans.',
    explanation: 'Cryptococcus neoformans is classically urease positive and can produce brown pigment on niger seed agar through phenol oxidase activity. The bench pattern should fit the full workflow.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-018-cryptococcus-capsule-workflow',
    area: 'analytic-mycology',
    topic: 'Cryptococcus testing',
    difficulty: 'beginner',
    tags: ['Cryptococcus', 'capsule', 'antigen testing', 'CSF'],
    prompt: 'Which feature explains why Cryptococcus is often associated with capsule-focused direct exam or antigen testing concepts?',
    choices: [
      'It has a prominent polysaccharide capsule.',
      'It produces broad aseptate hyphae.',
      'It forms arthroconidia in tissue.',
      'It is a dermatophyte that invades hair shafts.'
    ],
    answer: 'It has a prominent polysaccharide capsule.',
    explanation: 'The capsule is central to Cryptococcus recognition and testing. Learners should connect India ink, antigen testing, and yeast morphology as parts of the same organism pattern.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-019-candida-chlamydospores',
    area: 'analytic-mycology',
    topic: 'Candida identification',
    difficulty: 'intermediate',
    tags: ['Candida albicans', 'Candida dubliniensis', 'chlamydospores', 'cornmeal agar'],
    prompt: 'A yeast forms chlamydospores on cornmeal agar and has a Candida albicans-like pattern. Which interpretation is most appropriate?',
    choices: [
      'Chlamydospores support the C. albicans or C. dubliniensis branch and should be interpreted with other ID results.',
      'Chlamydospores confirm Rhizopus species.',
      'Chlamydospores prove the isolate is a dermatophyte.',
      'Chlamydospores rule out Candida species.'
    ],
    answer: 'Chlamydospores support the C. albicans or C. dubliniensis branch and should be interpreted with other ID results.',
    explanation: 'Chlamydospore production is a classic Candida morphology clue. It supports a branch but does not replace the full yeast identification workflow.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-020-candida-glabrata-small-yeast',
    area: 'analytic-mycology',
    topic: 'Candida identification',
    difficulty: 'intermediate',
    tags: ['Candida glabrata', 'blastoconidia', 'germ tube negative', 'yeast identification'],
    prompt: 'A small yeast isolate is germ tube negative and shows mostly budding yeast cells without prominent pseudohyphae. Which Candida species is a classic teaching possibility?',
    choices: [
      'Candida glabrata.',
      'Candida albicans.',
      'Cryptococcus neoformans.',
      'Trichophyton rubrum.'
    ],
    answer: 'Candida glabrata.',
    explanation: 'Candida glabrata often appears as small budding yeast cells and is germ tube negative. Modern ID methods are commonly used, but the morphology remains a useful study anchor.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-021-rhodotorula-pink-yeast',
    area: 'analytic-mycology',
    topic: 'Pigmented yeasts',
    difficulty: 'beginner',
    tags: ['Rhodotorula', 'pink colonies', 'yeast identification', 'urease'],
    prompt: 'A yeast isolate produces smooth pink to coral colonies on fungal media. Which organism group is the classic teaching match?',
    choices: [
      'Rhodotorula species.',
      'Candida albicans.',
      'Aspergillus niger.',
      'Histoplasma capsulatum.'
    ],
    answer: 'Rhodotorula species.',
    explanation: 'Rhodotorula species are known for pink to coral yeast colonies. Pigment is a clue, but species-level workup still depends on the lab’s identification method.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-022-trichosporon-arthroconidia',
    area: 'analytic-mycology',
    topic: 'Yeast-like fungi',
    difficulty: 'advanced',
    tags: ['Trichosporon', 'arthroconidia', 'blastoconidia', 'pseudohyphae'],
    prompt: 'A yeast-like isolate shows blastoconidia, pseudohyphae, and arthroconidia on morphology media. Which organism group should be considered?',
    choices: [
      'Trichosporon species.',
      'Cryptococcus species.',
      'Mucorales.',
      'Dermatophytes only.'
    ],
    answer: 'Trichosporon species.',
    explanation: 'Trichosporon can produce a mixture of yeast-like and hyphal elements, including arthroconidia. Morphology helps guide the yeast-like fungus branch.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-023-geotrichum-arthroconidia',
    area: 'analytic-mycology',
    topic: 'Yeast-like fungi',
    difficulty: 'advanced',
    tags: ['Geotrichum', 'arthroconidia', 'yeast-like fungi', 'morphology'],
    prompt: 'A yeast-like fungus produces true hyphae that fragment into rectangular arthroconidia and lacks prominent blastoconidia. Which group is the classic teaching match?',
    choices: [
      'Geotrichum species.',
      'Candida albicans.',
      'Cryptococcus neoformans.',
      'Rhizopus species.'
    ],
    answer: 'Geotrichum species.',
    explanation: 'Geotrichum is classically associated with hyphae breaking into arthroconidia. This helps separate it from Candida-like yeasts that produce blastoconidia and pseudohyphae.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-024-carbohydrate-assimilation-principle',
    area: 'analytic-mycology',
    topic: 'Yeast biochemical identification',
    difficulty: 'intermediate',
    tags: ['carbohydrate assimilation', 'yeast identification', 'biochemical tests'],
    prompt: 'What is the purpose of carbohydrate assimilation testing in yeast identification?',
    choices: [
      'It checks which carbon sources a yeast can use to support identification.',
      'It detects acid-fast staining.',
      'It confirms bacterial coagulase production.',
      'It identifies dermatophytes by hair invasion only.'
    ],
    answer: 'It checks which carbon sources a yeast can use to support identification.',
    explanation: 'Yeast assimilation patterns are biochemical fingerprints. They support identification when morphology alone is not enough.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-025-dimorphic-temperature-shift',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'beginner',
    tags: ['dimorphic fungi', 'mold phase', 'yeast phase', 'temperature'],
    prompt: 'What does thermal dimorphism mean in medical mycology?',
    choices: [
      'A fungus can grow as a mold at lower temperature and as a yeast or yeast-like form at body temperature.',
      'A fungus changes from gram positive to gram negative during Gram stain.',
      'A fungus becomes acid-fast only after culture.',
      'A fungus grows only as a virus inside host cells.'
    ],
    answer: 'A fungus can grow as a mold at lower temperature and as a yeast or yeast-like form at body temperature.',
    explanation: 'Thermal dimorphism is a key mycology concept. It connects culture temperature, mold morphology, tissue morphology, and organism identification.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-026-histoplasma-intracellular-yeast',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'intermediate',
    tags: ['Histoplasma capsulatum', 'intracellular yeast', 'dimorphic fungi', 'GMS'],
    prompt: 'A tissue stain shows small oval yeast forms inside macrophages. Which dimorphic fungus is the classic teaching match?',
    choices: [
      'Histoplasma capsulatum.',
      'Blastomyces dermatitidis.',
      'Rhizopus species.',
      'Candida albicans.'
    ],
    answer: 'Histoplasma capsulatum.',
    explanation: 'Histoplasma is classically seen as small intracellular yeast in tissue. The bench pattern includes tissue morphology, fungal stains, culture or antigen testing, and safety-aware handling.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-027-blastomyces-broad-based-budding',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'beginner',
    tags: ['Blastomyces dermatitidis', 'broad-based budding', 'dimorphic fungi', 'tissue morphology'],
    prompt: 'A tissue specimen shows large thick-walled yeast with broad-based budding. Which organism is the classic teaching match?',
    choices: [
      'Blastomyces dermatitidis.',
      'Histoplasma capsulatum.',
      'Cryptococcus neoformans.',
      'Geotrichum candidum.'
    ],
    answer: 'Blastomyces dermatitidis.',
    explanation: 'Broad-based budding yeast is a classic morphology clue for Blastomyces. Learners should connect the tissue form with dimorphic fungal workflow.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-028-paracoccidioides-multiple-budding',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'advanced',
    tags: ['Paracoccidioides brasiliensis', 'multiple budding', 'pilot wheel', 'dimorphic fungi'],
    prompt: 'A yeast form shows multiple narrow-neck buds arranged around a larger parent cell. Which dimorphic fungus is the classic teaching match?',
    choices: [
      'Paracoccidioides brasiliensis.',
      'Sporothrix schenckii.',
      'Aspergillus fumigatus.',
      'Candida glabrata.'
    ],
    answer: 'Paracoccidioides brasiliensis.',
    explanation: 'Paracoccidioides is classically associated with multiple budding yeast forms, sometimes described as a pilot-wheel appearance. This is an advanced morphology clue.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-029-sporothrix-cigar-shaped-yeast',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'intermediate',
    tags: ['Sporothrix schenckii', 'cigar-shaped yeast', 'dimorphic fungi', 'mold phase'],
    prompt: 'A dimorphic fungus is associated with cigar-shaped yeast forms in tissue and delicate mold-phase conidia in culture. Which organism is the classic teaching match?',
    choices: [
      'Sporothrix schenckii.',
      'Coccidioides immitis.',
      'Rhizopus species.',
      'Cryptococcus neoformans.'
    ],
    answer: 'Sporothrix schenckii.',
    explanation: 'Sporothrix is classically associated with cigar-shaped yeast in tissue. Mold-phase morphology and source context help support the branch.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-030-coccidioides-spherules',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'beginner',
    tags: ['Coccidioides', 'spherules', 'endospores', 'dimorphic fungi'],
    prompt: 'A tissue specimen shows large spherules filled with endospores. Which dimorphic fungus is the classic teaching match?',
    choices: [
      'Coccidioides species.',
      'Candida albicans.',
      'Aspergillus niger.',
      'Rhodotorula species.'
    ],
    answer: 'Coccidioides species.',
    explanation: 'Coccidioides forms spherules with endospores in tissue. This tissue form is a key clue and should trigger the correct fungal workflow.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-031-coccidioides-lab-safety',
    area: 'analytic-mycology',
    topic: 'Fungal laboratory safety',
    difficulty: 'advanced',
    tags: ['Coccidioides', 'arthroconidia', 'lab safety', 'dimorphic fungi'],
    prompt: 'A mold culture is suspected to be Coccidioides. What is the safest bench-learning principle?',
    choices: [
      'Avoid extra open-bench manipulation and follow the laboratory safety escalation protocol.',
      'Make a heavy tease mount on the open bench to confirm arthroconidia.',
      'Sniff the culture to check for a characteristic odor.',
      'Handle it like a routine dermatophyte because all molds have the same safety risk.'
    ],
    answer: 'Avoid extra open-bench manipulation and follow the laboratory safety escalation protocol.',
    explanation: 'Coccidioides mold cultures can pose a laboratory exposure risk because of infectious arthroconidia. The safe next step is escalation and controlled handling, not extra manipulation.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'draft'
  },
  {
    id: 'mycology-032-pneumocystis-gms-cysts',
    area: 'analytic-mycology',
    topic: 'Pneumocystis testing concepts',
    difficulty: 'intermediate',
    tags: ['Pneumocystis jirovecii', 'GMS stain', 'cysts', 'respiratory specimen'],
    prompt: 'A respiratory specimen is stained with GMS and shows cup-shaped cyst forms. Which organism is the classic teaching match?',
    choices: [
      'Pneumocystis jirovecii.',
      'Histoplasma capsulatum.',
      'Mucor species.',
      'Trichophyton rubrum.'
    ],
    answer: 'Pneumocystis jirovecii.',
    explanation: 'Pneumocystis is not approached like routine mold culture. Special stains, immunofluorescence, or molecular methods are commonly used depending on the lab workflow.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-033-malassezia-spaghetti-meatballs',
    area: 'analytic-mycology',
    topic: 'Superficial yeasts',
    difficulty: 'beginner',
    tags: ['Malassezia furfur', 'tinea versicolor', 'KOH prep', 'spaghetti and meatballs'],
    prompt: 'A KOH preparation from a superficial skin scraping shows short curved hyphae mixed with round yeast cells. Which organism is the classic teaching match?',
    choices: [
      'Malassezia furfur.',
      'Cryptococcus neoformans.',
      'Sporothrix schenckii.',
      'Aspergillus fumigatus.'
    ],
    answer: 'Malassezia furfur.',
    explanation: 'Malassezia can show a “spaghetti and meatballs” pattern on direct exam. This is a morphology clue from a superficial skin specimen.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-034-dermatophyte-genera-bucket',
    area: 'analytic-mycology',
    topic: 'Dermatophyte identification',
    difficulty: 'beginner',
    tags: ['dermatophytes', 'Trichophyton', 'Microsporum', 'Epidermophyton'],
    prompt: 'Which group contains the classic dermatophyte genera taught for skin, hair, and nail infections?',
    choices: [
      'Trichophyton, Microsporum, and Epidermophyton.',
      'Cryptococcus, Rhodotorula, and Candida.',
      'Aspergillus, Rhizopus, and Fusarium only.',
      'Histoplasma, Blastomyces, and Coccidioides only.'
    ],
    answer: 'Trichophyton, Microsporum, and Epidermophyton.',
    explanation: 'Dermatophyte learning usually starts with Trichophyton, Microsporum, and Epidermophyton. The bench then uses colony appearance, microscopic morphology, and source.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-035-epidermophyton-no-microconidia',
    area: 'analytic-mycology',
    topic: 'Dermatophyte identification',
    difficulty: 'advanced',
    tags: ['Epidermophyton', 'macroconidia', 'microconidia', 'dermatophytes'],
    prompt: 'A dermatophyte produces smooth, club-shaped macroconidia and lacks microconidia. Which genus is the classic teaching match?',
    choices: [
      'Epidermophyton.',
      'Microsporum.',
      'Trichophyton.',
      'Candida.'
    ],
    answer: 'Epidermophyton.',
    explanation: 'Epidermophyton is classically taught as producing macroconidia but no microconidia. This is a useful genus-level morphology clue.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-036-microsporum-macroconidia',
    area: 'analytic-mycology',
    topic: 'Dermatophyte identification',
    difficulty: 'intermediate',
    tags: ['Microsporum', 'macroconidia', 'dermatophytes', 'hair invasion'],
    prompt: 'A dermatophyte isolate produces numerous rough-walled, spindle-shaped macroconidia. Which genus is the classic teaching match?',
    choices: [
      'Microsporum.',
      'Epidermophyton.',
      'Candida.',
      'Cryptococcus.'
    ],
    answer: 'Microsporum.',
    explanation: 'Microsporum species are often recognized by prominent rough-walled macroconidia. This morphology helps separate dermatophyte genera.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-037-trichophyton-hair-nail-skin',
    area: 'analytic-mycology',
    topic: 'Dermatophyte identification',
    difficulty: 'intermediate',
    tags: ['Trichophyton', 'skin', 'hair', 'nails', 'dermatophytes'],
    prompt: 'Which dermatophyte genus is classically associated with infection of skin, hair, and nails and often relies heavily on microconidial morphology for identification?',
    choices: [
      'Trichophyton.',
      'Epidermophyton.',
      'Cryptococcus.',
      'Rhizopus.'
    ],
    answer: 'Trichophyton.',
    explanation: 'Trichophyton species commonly involve skin, hair, and nails. Microscopic morphology, especially microconidia, is an important teaching clue.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-038-dematiaceous-mold-pigment',
    area: 'analytic-mycology',
    topic: 'Dematiaceous molds',
    difficulty: 'beginner',
    tags: ['dematiaceous molds', 'melanin', 'dark pigment', 'mold identification'],
    prompt: 'A mold colony is dark brown to black, and the reverse of the colony is also pigmented. What does this suggest?',
    choices: [
      'A dematiaceous mold with melanin-like pigment in the cell wall.',
      'A nonpigmented hyaline mold.',
      'A germ tube-positive yeast.',
      'A gram-positive anaerobe.'
    ],
    answer: 'A dematiaceous mold with melanin-like pigment in the cell wall.',
    explanation: 'Dematiaceous molds are darkly pigmented molds. Colony pigment and microscopic morphology guide the next identification step.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-039-phialophora-vase-phialides',
    area: 'analytic-mycology',
    topic: 'Dematiaceous molds',
    difficulty: 'advanced',
    tags: ['Phialophora', 'vase-shaped phialides', 'dematiaceous molds', 'chromoblastomycosis'],
    prompt: 'A dematiaceous mold shows flask-shaped phialides with a collarette and conidia collecting at the tips. Which genus is the classic teaching match?',
    choices: [
      'Phialophora.',
      'Rhizopus.',
      'Candida.',
      'Geotrichum.'
    ],
    answer: 'Phialophora.',
    explanation: 'Phialophora is classically recognized by vase-shaped phialides with collarettes. This is a microscopic morphology clue in the dematiaceous mold branch.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-040-alternaria-muriform-conidia',
    area: 'analytic-mycology',
    topic: 'Dematiaceous molds',
    difficulty: 'advanced',
    tags: ['Alternaria', 'muriform conidia', 'dematiaceous molds', 'mold morphology'],
    prompt: 'A dematiaceous mold produces large multicelled conidia with both transverse and longitudinal septations. Which genus is the classic teaching match?',
    choices: [
      'Alternaria.',
      'Aspergillus.',
      'Mucor.',
      'Candida.'
    ],
    answer: 'Alternaria.',
    explanation: 'Alternaria is associated with muriform conidia that have both transverse and longitudinal septations. This is a high-yield morphology pattern.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-041-aspergillus-conidial-head',
    area: 'analytic-mycology',
    topic: 'Aspergillus identification',
    difficulty: 'beginner',
    tags: ['Aspergillus', 'septate hyphae', 'conidial head', 'hyaline mold'],
    prompt: 'A mold shows septate hyphae and conidial heads with chains of conidia from a vesicle. Which genus is the classic teaching match?',
    choices: [
      'Aspergillus.',
      'Rhizopus.',
      'Candida.',
      'Cryptococcus.'
    ],
    answer: 'Aspergillus.',
    explanation: 'Aspergillus species are hyaline molds with septate hyphae and characteristic conidial heads. Species-level workup depends on conidial head structure and other laboratory methods.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-042-aspergillus-fumigatus-morphology',
    area: 'analytic-mycology',
    topic: 'Aspergillus identification',
    difficulty: 'intermediate',
    tags: ['Aspergillus fumigatus', 'uniseriate phialides', 'conidial head', 'hyaline mold'],
    prompt: 'A hyaline mold has columnar conidial heads with phialides mostly on the upper portion of the vesicle. Which Aspergillus species is the classic teaching match?',
    choices: [
      'Aspergillus fumigatus.',
      'Aspergillus niger.',
      'Aspergillus terreus.',
      'Rhizopus arrhizus.'
    ],
    answer: 'Aspergillus fumigatus.',
    explanation: 'A. fumigatus is classically associated with compact columnar conidial heads and phialides on the upper portion of the vesicle. Microscopic morphology supports species-level branching.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-043-fusarium-sickle-macroconidia',
    area: 'analytic-mycology',
    topic: 'Hyaline mold identification',
    difficulty: 'intermediate',
    tags: ['Fusarium', 'sickle-shaped macroconidia', 'hyaline mold', 'mold morphology'],
    prompt: 'A hyaline mold produces canoe-shaped or sickle-shaped multicelled macroconidia. Which genus is the classic teaching match?',
    choices: [
      'Fusarium.',
      'Aspergillus.',
      'Rhizopus.',
      'Cryptococcus.'
    ],
    answer: 'Fusarium.',
    explanation: 'Fusarium is classically associated with sickle-shaped macroconidia. This morphology helps separate it from Aspergillus-like and Mucorales-like molds.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-044-scedosporium-annelloconidia',
    area: 'analytic-mycology',
    topic: 'Hyaline mold identification',
    difficulty: 'advanced',
    tags: ['Scedosporium', 'annelloconidia', 'hyaline mold', 'mold identification'],
    prompt: 'A hyaline mold produces annelloconidia from annellides and does not fit the typical Aspergillus conidial-head pattern. Which genus should be considered?',
    choices: [
      'Scedosporium.',
      'Candida.',
      'Microsporum.',
      'Rhizopus.'
    ],
    answer: 'Scedosporium.',
    explanation: 'Scedosporium-like molds can produce annelloconidia rather than Aspergillus-type conidial heads. Microscopic structures guide the branch.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-045-mucorales-broad-aseptate',
    area: 'analytic-mycology',
    topic: 'Mucorales identification',
    difficulty: 'beginner',
    tags: ['Mucorales', 'broad aseptate hyphae', 'right-angle branching', 'mold morphology'],
    prompt: 'A tissue specimen shows broad ribbon-like hyphae with little septation and wide-angle branching. Which mold group is the classic teaching match?',
    choices: [
      'Mucorales.',
      'Aspergillus species.',
      'Candida species.',
      'Dermatophytes.'
    ],
    answer: 'Mucorales.',
    explanation: 'Mucorales are classically associated with broad, pauci-septate hyphae and wide-angle branching in tissue. This morphology differs from septate Aspergillus-like hyphae.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-046-rhizopus-rhizoids',
    area: 'analytic-mycology',
    topic: 'Mucorales identification',
    difficulty: 'intermediate',
    tags: ['Rhizopus', 'rhizoids', 'sporangiophores', 'Mucorales'],
    prompt: 'A Mucorales mold shows rhizoids located directly beneath the sporangiophores. Which genus is the classic teaching match?',
    choices: [
      'Rhizopus.',
      'Mucor.',
      'Aspergillus.',
      'Penicillium.'
    ],
    answer: 'Rhizopus.',
    explanation: 'Rhizopus is classically taught as having nodal rhizoids directly beneath the sporangiophores. These structures help separate genera within the Mucorales group.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-047-talaromyces-marneffei-dimorphic',
    area: 'analytic-mycology',
    topic: 'Dimorphic fungi',
    difficulty: 'advanced',
    tags: ['Talaromyces marneffei', 'Penicillium marneffei', 'dimorphic fungi', 'transverse septum'],
    prompt: 'A thermally dimorphic fungus grows as a mold at lower temperature and as yeast-like cells with a transverse septum at body temperature. Which organism is the classic teaching match?',
    choices: [
      'Talaromyces marneffei.',
      'Blastomyces dermatitidis.',
      'Rhizopus species.',
      'Candida albicans.'
    ],
    answer: 'Talaromyces marneffei.',
    explanation: 'Talaromyces marneffei, formerly Penicillium marneffei, is a dimorphic fungus associated with yeast-like cells that can show a transverse septum. Taxonomy may vary across older references.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
    id: 'mycology-048-galactomannan-aspergillus-concept',
    area: 'analytic-mycology',
    topic: 'Aspergillus testing concepts',
    difficulty: 'advanced',
    tags: ['Aspergillus', 'galactomannan', 'antigen testing', 'fungal diagnostics'],
    prompt: 'A learner asks why Aspergillus antigen testing may be discussed separately from mold colony identification. What is the best educational answer?',
    choices: [
      'Antigen testing detects fungal components in selected specimen types, while colony identification uses culture and morphology.',
      'Antigen testing replaces all fungal culture and microscopy in every situation.',
      'Antigen testing identifies dermatophytes by hair invasion.',
      'Antigen testing confirms bacterial coagulase production.'
    ],
    answer: 'Antigen testing detects fungal components in selected specimen types, while colony identification uses culture and morphology.',
    explanation: 'Aspergillus workflows may include culture, microscopy, histopathology, antigen testing, or molecular methods depending on the question. Learners should connect the test method to what it actually detects.',
    source: 'Learn Microbes original question bank: Mycology',
    status: 'published'
  },
  {
  id: 'mycology-049-aspergillus-fumigatus-conidial-head-case',
  area: 'analytic-mycology',
  topic: 'Mold problem solving',
  difficulty: 'intermediate',
  tags: ['Aspergillus fumigatus', 'septate hyphae', 'conidial head', 'hyaline mold'],
  prompt: 'A respiratory mold culture shows septate hyphae and compact columnar conidial heads with phialides mostly on the upper portion of the vesicle. Which organism is the best teaching match?',
  choices: [
  'Aspergillus fumigatus.',
  'Rhizopus species.',
  'Candida albicans.',
  'Cryptococcus neoformans.'
  ],
  answer: 'Aspergillus fumigatus.',
  explanation: 'A. fumigatus is classically associated with compact columnar conidial heads and phialides on the upper vesicle. Septate hyphae support the Aspergillus branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'mycology-050-mucorales-tissue-hyphae-case',
  area: 'analytic-mycology',
  topic: 'Mucorales problem solving',
  difficulty: 'beginner',
  tags: ['Mucorales', 'broad aseptate hyphae', 'wide-angle branching', 'tissue morphology'],
  prompt: 'A tissue specimen shows broad ribbon-like hyphae with little septation and wide-angle branching. Which mold group is the classic teaching match?',
  choices: [
  'Mucorales.',
  'Aspergillus species.',
  'Fusarium species.',
  'Dermatophytes.'
  ],
  answer: 'Mucorales.',
  explanation: 'Mucorales are classically broad, pauci-septate, and wide-angle branching in tissue. This differs from septate Aspergillus-like hyphae.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'mycology-051-cryptococcus-niger-seed-csf-case',
  area: 'analytic-mycology',
  topic: 'Cryptococcus problem solving',
  difficulty: 'intermediate',
  tags: ['Cryptococcus neoformans', 'CSF', 'urease', 'niger seed agar'],
  prompt: 'A CSF yeast isolate is urease positive and produces brown pigment on niger seed agar. Which organism is the best teaching match?',
  choices: [
  'Cryptococcus neoformans.',
  'Candida glabrata.',
  'Geotrichum candidum.',
  'Trichophyton rubrum.'
  ],
  answer: 'Cryptococcus neoformans.',
  explanation: 'Cryptococcus neoformans is classically urease positive and produces brown pigment on niger seed agar. CSF source supports the same teaching branch.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
  id: 'mycology-052-candida-albicans-germ-tube-case',
  area: 'analytic-mycology',
  topic: 'Candida problem solving',
  difficulty: 'beginner',
  tags: ['Candida albicans', 'germ tube', 'yeast identification', 'pseudohyphae'],
  prompt: 'A yeast from a mucosal specimen forms true germ tubes in serum and produces chlamydospores on morphology media. Which organism is the classic teaching match?',
  choices: [
  'Candida albicans.',
  'Cryptococcus neoformans.',
  'Rhodotorula species.',
  'Aspergillus niger.'
  ],
  answer: 'Candida albicans.',
  explanation: 'C. albicans is classically germ tube positive and can form chlamydospores. These findings support the Candida albicans branch in a teaching workflow.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'mycology-053-dermatophyte-trichophyton-case',
  area: 'analytic-mycology',
  topic: 'Dermatophyte problem solving',
  difficulty: 'intermediate',
  tags: ['Trichophyton rubrum', 'dermatophytes', 'skin scraping', 'microconidia'],
  prompt: 'A skin scraping culture grows a dermatophyte with tear-shaped microconidia along the hyphae and red pigment on the reverse. Which organism is the classic teaching match?',
  choices: [
  'Trichophyton rubrum.',
  'Microsporum canis.',
  'Epidermophyton floccosum.',
  'Candida tropicalis.'
  ],
  answer: 'Trichophyton rubrum.',
  explanation: 'Trichophyton rubrum is a common dermatophyte associated with tear-shaped microconidia and red reverse pigment. Dermatophyte ID uses source, colony, and microscopic morphology.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'published'
  },
  {
  id: 'mycology-054-coccidioides-safety-case',
  area: 'analytic-mycology',
  topic: 'Fungal laboratory safety',
  difficulty: 'advanced',
  tags: ['Coccidioides', 'arthroconidia', 'lab safety', 'dimorphic fungi'],
  prompt: 'A mold culture from a respiratory specimen is suspected to be Coccidioides based on colony and preliminary morphology. What is the safest bench-learning response?',
  choices: [
  'Avoid extra open-bench manipulation and follow the laboratory safety escalation protocol.',
  'Prepare multiple open-bench tease mounts to look for arthroconidia.',
  'Sniff the culture to check for a characteristic odor.',
  'Handle it like a routine skin dermatophyte because all molds have the same risk.'
  ],
  answer: 'Avoid extra open-bench manipulation and follow the laboratory safety escalation protocol.',
  explanation: 'Coccidioides mold cultures can pose a laboratory exposure risk. The safest next step is controlled handling and escalation, not extra manipulation.',
  source: 'Learn Microbes original question bank: Microbiology and Parasitology Problem Solving',
  status: 'draft'
  },
  {
    id: 'postanalytic-001-interim-report-purpose',
    area: 'postanalytic-procedures',
    topic: 'Documentation practices',
    difficulty: 'beginner',
    tags: ['interim report', 'documentation', 'culture reporting'],
    prompt: 'A blood culture Gram stain result is available before final identification and susceptibility testing. What is the best postanalytic principle?',
    choices: [
      'Release an appropriate interim report according to policy so clinicians can act on timely preliminary information.',
      'Suppress all preliminary information until every susceptibility result is final.',
      'Report a final organism name from Gram stain alone.',
      'Delete the preliminary result once the final report is issued.'
    ],
    answer: 'Release an appropriate interim report according to policy so clinicians can act on timely preliminary information.',
    explanation: 'Interim reports communicate clinically useful preliminary information while final identification and susceptibility work continues. They should be clearly labeled and policy-driven.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'published'
  },
  {
    id: 'postanalytic-002-no-growth-updates',
    area: 'postanalytic-procedures',
    topic: 'Documentation practices',
    difficulty: 'intermediate',
    tags: ['no growth', 'interim report', 'culture reporting'],
    prompt: 'A clinician is following a blood culture that remains negative at an interim time point. Which reporting concept is most appropriate?',
    choices: [
      'Report timed interim no-growth updates only as allowed by laboratory policy and the culture workflow.',
      'Change every interim no-growth update to a final negative report.',
      'Never communicate no-growth information under any circumstance.',
      'Report a contaminant organism even when no growth has occurred.'
    ],
    answer: 'Report timed interim no-growth updates only as allowed by laboratory policy and the culture workflow.',
    explanation: 'No-growth updates can be clinically useful, but timing and wording must follow validated culture workflow and reporting policy. Interim and final reports are not the same.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'published'
  },
  {
    id: 'postanalytic-003-critical-blood-culture',
    area: 'postanalytic-procedures',
    topic: 'Urgent and critical value reporting',
    difficulty: 'beginner',
    tags: ['critical value', 'blood culture', 'Gram stain', 'notification'],
    prompt: 'A positive blood culture Gram stain is reported from a patient with suspected sepsis. Which postanalytic action is most important?',
    choices: [
      'Notify the appropriate clinical contact using the laboratory critical-result policy and document the communication.',
      'Wait for complete susceptibility testing before contacting anyone.',
      'Post the result only on a paper worksheet.',
      'Release no result because Gram stain is not a final identification.'
    ],
    answer: 'Notify the appropriate clinical contact using the laboratory critical-result policy and document the communication.',
    explanation: 'Positive blood culture Gram stain results can be urgent. Critical-result policies define who is notified, how quickly, and how read-back or documentation occurs.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'published'
  },
  {
    id: 'postanalytic-004-afb-critical-communication',
    area: 'postanalytic-procedures',
    topic: 'Urgent and critical value reporting',
    difficulty: 'intermediate',
    tags: ['AFB smear', 'critical result', 'biosafety', 'notification'],
    prompt: 'An AFB smear from a respiratory specimen is positive. Which response best reflects postanalytic responsibility?',
    choices: [
      'Follow urgent notification and infection-control reporting policy because the result can affect isolation and public health actions.',
      'Ignore the result until the organism is fully speciated months later.',
      'Report only to the instrument vendor.',
      'Convert the smear result into an antimicrobial susceptibility report.'
    ],
    answer: 'Follow urgent notification and infection-control reporting policy because the result can affect isolation and public health actions.',
    explanation: 'AFB smear results may affect airborne isolation, additional testing, and public health workflows. Communication requirements are laboratory and jurisdiction policy driven.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'published'
  },
  {
    id: 'postanalytic-005-autoverification-limits',
    area: 'postanalytic-procedures',
    topic: 'Result review and autoverification',
    difficulty: 'advanced',
    tags: ['autoverification', 'result review', 'quality assurance'],
    prompt: 'A laboratory wants to autoverify selected microbiology results. Which design principle is safest?',
    choices: [
      'Use defined rules with exception handling for results that need human review, such as critical, discordant, or unusual findings.',
      'Autoverify every microbiology result regardless of source, organism, or patient context.',
      'Disable audit trails because automated reports do not need review history.',
      'Use autoverification to bypass quality control failures.'
    ],
    answer: 'Use defined rules with exception handling for results that need human review, such as critical, discordant, or unusual findings.',
    explanation: 'Autoverification can support efficiency only when rules, exceptions, QC status, and audit trails are controlled. Microbiology results often require source and clinical-context awareness.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'postanalytic-006-contamination-rate-review',
    area: 'postanalytic-procedures',
    topic: 'Result review and quality indicators',
    difficulty: 'intermediate',
    tags: ['blood culture contamination', 'quality indicator', 'outreach'],
    prompt: 'A laboratory tracks blood culture contamination rates by collection location and shares summaries with outreach sites. What is the main purpose?',
    choices: [
      'To identify collection-quality problems and support targeted education or process improvement.',
      'To prove all coagulase-negative staphylococci are pathogens.',
      'To eliminate the need for aseptic collection technique.',
      'To replace all organism identification testing.'
    ],
    answer: 'To identify collection-quality problems and support targeted education or process improvement.',
    explanation: 'Contamination-rate monitoring is a quality indicator. Trending by location, collector group, or process can guide education and reduce avoidable false-positive cultures.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'postanalytic-007-discordant-report',
    area: 'postanalytic-procedures',
    topic: 'Discordant reports',
    difficulty: 'advanced',
    tags: ['discordant result', 'corrected report', 'problem action form'],
    prompt: 'A preliminary urine report was released, but later review shows the result was entered under the wrong patient. What is the best postanalytic response?',
    choices: [
      'Follow the laboratory corrected-report and problem-resolution policy, notify affected parties, and document the investigation.',
      'Silently edit the result without traceability.',
      'Ignore it because the culture is already final.',
      'Ask the clinician to delete the result from the medical record.'
    ],
    answer: 'Follow the laboratory corrected-report and problem-resolution policy, notify affected parties, and document the investigation.',
    explanation: 'Patient-result errors require controlled correction, communication, and documentation. The goal is patient safety, traceability, and process improvement.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'postanalytic-008-paf-contents',
    area: 'postanalytic-procedures',
    topic: 'Discordant reports',
    difficulty: 'intermediate',
    tags: ['problem action form', 'corrective action', 'quality documentation'],
    prompt: 'A problem action form is opened for a microbiology reporting error. Which content is most useful for quality improvement?',
    choices: [
      'Description of the event, investigation, corrective action, outcome, and follow-up when needed.',
      'Only the employee birth date and favorite instrument.',
      'A blank note saying the issue was handled.',
      'A list of unrelated patient results.'
    ],
    answer: 'Description of the event, investigation, corrective action, outcome, and follow-up when needed.',
    explanation: 'Useful quality documentation captures what happened, why it happened, how it was corrected, and whether the fix worked. Requirements vary by policy and accrediting framework.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'postanalytic-009-infection-prevention-cluster',
    area: 'postanalytic-procedures',
    topic: 'Infection control and public health reporting',
    difficulty: 'intermediate',
    tags: ['infection prevention', 'cluster detection', 'public health'],
    prompt: 'Several ICU patients grow the same unusual multidrug-resistant Gram-negative organism over a short period. Which group is the microbiology laboratory most likely to alert first inside the hospital?',
    choices: [
      'Infection prevention or infection control according to facility policy.',
      'The cafeteria manager.',
      'The textbook publisher.',
      'No one until the annual report.'
    ],
    answer: 'Infection prevention or infection control according to facility policy.',
    explanation: 'Clusters of resistant or unusual organisms may signal transmission. Timely communication with infection prevention supports investigation and containment.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'draft'
  },
  {
    id: 'postanalytic-010-public-health-reportable',
    area: 'postanalytic-procedures',
    topic: 'Infection control and public health reporting',
    difficulty: 'advanced',
    tags: ['public health', 'reportable disease', 'laboratory notification'],
    prompt: 'A laboratory identifies an organism or result that is reportable by jurisdictional public health rules. What is the best postanalytic principle?',
    choices: [
      'Report through the required channel and timeframe according to law, regulation, and laboratory policy.',
      'Report only if the patient personally requests it.',
      'Avoid reporting because public health results are never laboratory responsibilities.',
      'Wait until the organism appears in three unrelated patients.'
    ],
    answer: 'Report through the required channel and timeframe according to law, regulation, and laboratory policy.',
    explanation: 'Public health reporting is jurisdiction-specific and policy-driven. The laboratory must know which results are reportable and how notification is documented.',
    source: 'Learn Microbes original question bank: Postanalytic Procedures',
    status: 'published'
  }
];
