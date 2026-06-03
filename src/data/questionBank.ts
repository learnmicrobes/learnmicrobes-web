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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
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
    status: 'draft'
  }
];
