export type GlossaryLink = {
  label: string;
  path: string;
};

export type GlossaryEntry = {
  id: string;
  term: string;
  aliases: string[];
  category: string;
  definition: string;
  details: string[];
  benchContext: string;
  studentTip: string;
  relatedLinks: GlossaryLink[];
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: 'gram-stain',
    term: 'Gram stain',
    aliases: ['gram staining', 'gram reaction', 'gram smear'],
    category: 'Microscopy and staining',
    definition: 'A differential stain that separates most bacteria into Gram-positive or Gram-negative groups based on cell envelope structure and stain retention.',
    details: [
      'Gram-positive organisms retain crystal violet-iodine complex and appear purple.',
      'Gram-negative organisms decolorize more readily and take up the counterstain, appearing pink to red.',
      'The result is interpreted with morphology, arrangement, specimen source, and culture context.'
    ],
    benchContext: 'Gram stain is usually an early branch point, not a final identification. It tells you which workup lane is reasonable.',
    studentTip: 'Think: color plus shape plus arrangement. Purple cocci in clusters and pink rods are very different starting points.',
    relatedLinks: [
      { label: 'Microscopy and staining guide', path: '/guides?guide=gram-stain' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
      { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' }
    ]
  },
  {
    id: 'acid-fast-stain',
    term: 'Acid-fast stain',
    aliases: ['afb stain', 'ziehl-neelsen', 'kinyoun stain', 'auramine stain'],
    category: 'Microscopy and staining',
    definition: 'A stain used to detect organisms with waxy, mycolic acid-rich cell walls, especially Mycobacterium species.',
    details: [
      'Carbol fuchsin or fluorescent dyes bind organisms that resist acid-alcohol decolorization.',
      'Positive smears support suspicion for acid-fast organisms but do not identify species by themselves.',
      'AFB suspicion changes safety, processing, culture, and molecular testing decisions.'
    ],
    benchContext: 'AFB workups often require special specimen processing, special media, prolonged incubation, NAAT, and biosafety-aware handling.',
    studentTip: 'Do not treat AFB like a routine Gram stain follow-up. It is a different diagnostic lane.',
    relatedLinks: [
      { label: 'Mycobacteria guide', path: '/guides?guide=mycobacteria' },
      { label: 'Do not routine culture', path: '/do-not-routine-culture' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'macconkey-agar',
    term: 'MacConkey agar',
    aliases: ['mac agar', 'mac plate', 'lactose fermenter', 'non-lactose fermenter'],
    category: 'Culture media',
    definition: 'A selective and differential medium used mainly for Gram-negative rods; it inhibits many Gram-positive organisms and differentiates lactose fermentation.',
    details: [
      'Lactose fermenters usually produce pink colonies because acid changes the neutral red indicator.',
      'Non-lactose fermenters are usually colorless or pale.',
      'Growth or no growth on MacConkey is part of first-pass bench logic for Gram-negative organisms.'
    ],
    benchContext: 'MacConkey helps separate enteric-style workups from organisms that are fastidious, nonfermentative, or poor growers on routine media.',
    studentTip: 'MacConkey is not just a plate. It is a question: does it grow, and does it ferment lactose?',
    relatedLinks: [
      { label: 'Enterobacteriaceae guide', path: '/guides?guide=enterobacteriaceae' },
      { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' },
      { label: 'Enterics calculator', path: '/biochemical-calculator' }
    ]
  },
  {
    id: 'blood-agar',
    term: 'Blood agar',
    aliases: ['bap', 'sheep blood agar', 'hemolysis'],
    category: 'Culture media',
    definition: 'An enriched, nonselective medium that supports many bacteria and allows observation of hemolysis around colonies.',
    details: [
      'Beta hemolysis is complete clearing around colonies.',
      'Alpha hemolysis is partial greening or discoloration.',
      'Gamma hemolysis means no visible hemolysis.'
    ],
    benchContext: 'Hemolysis is a major branch point for Streptococcus, Enterococcus, Staphylococcus, and many other bench decisions.',
    studentTip: 'Read hemolysis with the organism group in mind. The same pattern can mean different things in different workups.',
    relatedLinks: [
      { label: 'Streptococcus guide', path: '/guides?guide=streptococcus-enterococcus' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
      { label: 'Culture media guide', path: '/guides?guide=media' }
    ]
  },
  {
    id: 'chocolate-agar',
    term: 'Chocolate agar',
    aliases: ['choc agar', 'heated blood agar', 'x factor', 'v factor'],
    category: 'Culture media',
    definition: 'An enriched medium made from heated blood that releases growth factors needed by fastidious organisms such as Haemophilus and Neisseria.',
    details: [
      'Heating blood releases X factor and V factor from red cells.',
      'Chocolate agar is commonly used for respiratory, genital, CSF, and other fastidious organism workups.',
      'It is enriched, not inherently selective unless antibiotics are added.'
    ],
    benchContext: 'Chocolate agar supports organisms that may not grow well on routine sheep blood agar.',
    studentTip: 'Chocolate agar is about nutrients, not chocolate color trivia. Ask which fastidious organism needs extra support.',
    relatedLinks: [
      { label: 'Haemophilus guide', path: '/guides?guide=haemophilus' },
      { label: 'Neisseria guide', path: '/guides?guide=neisseria-moraxella-catarrhalis' },
      { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' }
    ]
  },
  {
    id: 'selective-media',
    term: 'Selective media',
    aliases: ['selective agar', 'inhibitory media'],
    category: 'Culture media',
    definition: 'Media designed to suppress some organisms while allowing target organisms to grow.',
    details: [
      'Selective agents may include antibiotics, dyes, bile salts, salt, or other inhibitors.',
      'Selectivity improves recovery when mixed flora would otherwise overgrow the target organism.',
      'Selective media still need correct specimen choice and incubation conditions.'
    ],
    benchContext: 'Selective media answer the question: how do we recover the organism we care about from a busy specimen?',
    studentTip: 'Selective means inhibition. Differential means visible reaction. Some media are both.',
    relatedLinks: [
      { label: 'Culture media guide', path: '/guides?guide=media' },
      { label: 'Traditional cultivation guide', path: '/guides?guide=traditional-cultivation-identification' }
    ]
  },
  {
    id: 'differential-media',
    term: 'Differential media',
    aliases: ['differential agar', 'indicator media'],
    category: 'Culture media',
    definition: 'Media that make biochemical or growth differences visible, usually through color change, hemolysis, precipitation, or colony appearance.',
    details: [
      'MacConkey differentiates lactose fermentation.',
      'Blood agar differentiates hemolysis patterns.',
      'Differential reactions guide next testing but usually do not identify an organism alone.'
    ],
    benchContext: 'Differential media help convert colony appearance into a testable branch question.',
    studentTip: 'Differential means you can see a clue. It does not always mean the plate selects for that organism.',
    relatedLinks: [
      { label: 'Culture media guide', path: '/guides?guide=media' },
      { label: 'Biochemical tests', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'pure-culture',
    term: 'Pure culture',
    aliases: ['isolated colony', 'pure isolate', 'subculture'],
    category: 'Cultivation',
    definition: 'A culture containing one organism type, ideally derived from an isolated colony, so reactions can be interpreted reliably.',
    details: [
      'Mixed growth can produce misleading biochemical reactions.',
      'Isolation streaking is used to separate organisms before identification testing.',
      'Purity should be checked when results do not fit the expected profile.'
    ],
    benchContext: 'Most identification tests assume you are testing one organism, not a mixed colony or mixed broth.',
    studentTip: 'If the pattern makes no sense, ask: was the isolate pure?',
    relatedLinks: [
      { label: 'Traditional cultivation guide', path: '/guides?guide=traditional-cultivation-identification' },
      { label: 'Unknown isolate workup', path: '/unknown-isolate-workup' }
    ]
  },
  {
    id: 'catalase-test',
    term: 'Catalase test',
    aliases: ['catalase reaction', 'hydrogen peroxide bubbles'],
    category: 'Bench tests',
    definition: 'A rapid test for catalase enzyme, which breaks hydrogen peroxide into water and oxygen bubbles.',
    details: [
      'Staphylococcus is typically catalase positive.',
      'Streptococcus and Enterococcus are typically catalase negative.',
      'Avoid picking from blood agar if red cells may cause a false-positive reaction.'
    ],
    benchContext: 'Catalase is a major early branch point for Gram-positive cocci.',
    studentTip: 'For Gram-positive cocci: clusters plus catalase positive points toward Staphylococcus-style workup.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
      { label: 'Staphylococcus guide', path: '/guides?guide=staphylococcus-micrococcus' }
    ]
  },
  {
    id: 'coagulase-test',
    term: 'Coagulase test',
    aliases: ['slide coagulase', 'tube coagulase', 'clumping factor'],
    category: 'Bench tests',
    definition: 'A test used to detect bound or free coagulase, classically to separate Staphylococcus aureus from many coagulase-negative staphylococci.',
    details: [
      'Slide coagulase detects bound coagulase or clumping factor.',
      'Tube coagulase detects free coagulase.',
      'Coagulase interpretation should match colony morphology and clinical context.'
    ],
    benchContext: 'Coagulase is a high-yield test after catalase-positive Gram-positive cocci suggest Staphylococcus.',
    studentTip: 'Coagulase positive is not just a memorized fact; it changes the clinical weight of the isolate.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'Staphylococcus guide', path: '/guides?guide=staphylococcus-micrococcus' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' }
    ]
  },
  {
    id: 'oxidase-test',
    term: 'Oxidase test',
    aliases: ['cytochrome oxidase', 'oxidase reagent'],
    category: 'Bench tests',
    definition: 'A test for cytochrome c oxidase activity, often used to separate Enterobacteriaceae from oxidase-positive nonfermenters and fastidious Gram-negative organisms.',
    details: [
      'Enterobacteriaceae are typically oxidase negative.',
      'Pseudomonas, Neisseria, Vibrio, Aeromonas, and many nonfermenters are oxidase positive.',
      'Timing matters because delayed color change can be misleading.'
    ],
    benchContext: 'Oxidase is one of the biggest branch-point tests for Gram-negative organisms.',
    studentTip: 'Oxidase negative plus MacConkey growth often pushes you toward enteric logic.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' },
      { label: 'Enterobacteriaceae guide', path: '/guides?guide=enterobacteriaceae' }
    ]
  },
  {
    id: 'indole-test',
    term: 'Indole test',
    aliases: ['tryptophanase', 'kovac reagent', 'spot indole'],
    category: 'Bench tests',
    definition: 'A biochemical test that detects tryptophanase activity by measuring indole production from tryptophan.',
    details: [
      'Kovac or similar reagent detects indole by producing a red color when positive.',
      'Indole is useful in enteric identification and several other organism groups.',
      'Medium and reagent choice matter for reliable interpretation.'
    ],
    benchContext: 'Indole is a differentiating reaction, not a stand-alone identification.',
    studentTip: 'Use indole as one tile in the organism profile, especially with lactose, citrate, urease, and motility.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'Enterics calculator', path: '/biochemical-calculator' }
    ]
  },
  {
    id: 'urease-test',
    term: 'Urease test',
    aliases: ['urea hydrolysis', 'urea agar', 'urease positive'],
    category: 'Bench tests',
    definition: 'A test that detects urease enzyme, which hydrolyzes urea to ammonia and raises pH, usually producing a pink color in urea media.',
    details: [
      'Proteus, Morganella, and Providencia are classically urease positive.',
      'Some organisms are rapid urease producers; others are slower.',
      'Urease can be important in enterics, Helicobacter, Corynebacterium-like organisms, and other groups.'
    ],
    benchContext: 'A strong urease reaction can rapidly redirect an enteric or fastidious organism workup.',
    studentTip: 'Ask whether urease is rapid and strong or delayed and weak. Timing changes the clue.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'Enterics calculator', path: '/biochemical-calculator' },
      { label: 'Campylobacter and Helicobacter guide', path: '/guides?guide=campylobacter-arcobacter-helicobacter' }
    ]
  },
  {
    id: 'pyr-test',
    term: 'PYR test',
    aliases: ['pyrrolidonyl arylamidase', 'pyr positive'],
    category: 'Bench tests',
    definition: 'A rapid enzyme test that detects pyrrolidonyl arylamidase activity.',
    details: [
      'Streptococcus pyogenes is classically PYR positive.',
      'Enterococcus is also typically PYR positive.',
      'PYR is interpreted with hemolysis, bile esculin, salt tolerance, and other context.'
    ],
    benchContext: 'PYR helps separate key catalase-negative Gram-positive cocci after hemolysis and grouping clues.',
    studentTip: 'PYR positive does not automatically mean one organism. Pair it with the branch you are already in.',
    relatedLinks: [
      { label: 'Streptococcus guide', path: '/guides?guide=streptococcus-enterococcus' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
      { label: 'Biochemical tests', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'camp-test',
    term: 'CAMP test',
    aliases: ['camp reaction', 'arrowhead hemolysis'],
    category: 'Bench tests',
    definition: 'A test for enhanced hemolysis near a beta-lysin-producing Staphylococcus streak, classically used in Streptococcus agalactiae identification.',
    details: [
      'A positive classical CAMP reaction forms an arrowhead zone of enhanced hemolysis.',
      'Reverse CAMP and CAMP-like reactions are useful for some Gram-positive rods.',
      'Interpretation depends on organism group and test setup.'
    ],
    benchContext: 'CAMP is a pattern-recognition test that supports specific Gram-positive workups.',
    studentTip: 'Do not memorize only one organism. Know whether you are using classical CAMP or reverse CAMP logic.',
    relatedLinks: [
      { label: 'Streptococcus guide', path: '/guides?guide=streptococcus-enterococcus' },
      { label: 'Listeria and Corynebacterium guide', path: '/guides?guide=listeria-corynebacterium' },
      { label: 'Biochemical tests', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'bile-esculin',
    term: 'Bile esculin',
    aliases: ['bile esculin test', 'bea', 'esculin hydrolysis'],
    category: 'Bench tests',
    definition: 'A test that detects esculin hydrolysis in the presence of bile; a positive reaction darkens or blackens the medium.',
    details: [
      'Enterococcus and some group D streptococci are classically bile esculin positive.',
      'The test is often paired with salt tolerance or PYR.',
      'Positive blackening should be read according to the method used.'
    ],
    benchContext: 'Bile esculin is a branch point in catalase-negative Gram-positive cocci workups.',
    studentTip: 'Bile esculin tells you about tolerance and hydrolysis, not the whole ID.',
    relatedLinks: [
      { label: 'Streptococcus guide', path: '/guides?guide=streptococcus-enterococcus' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' }
    ]
  },
  {
    id: 'optochin',
    term: 'Optochin',
    aliases: ['optochin disk', 'p disk', 'ethylhydrocupreine'],
    category: 'Bench tests',
    definition: 'A disk test used mainly to help identify Streptococcus pneumoniae by susceptibility to optochin.',
    details: [
      'S. pneumoniae is classically optochin susceptible.',
      'Viridans streptococci are usually resistant.',
      'Zone size and atmosphere must be interpreted by the method criteria.'
    ],
    benchContext: 'Optochin is used with alpha hemolysis, bile solubility, and clinical source.',
    studentTip: 'Optochin lives in the alpha-hemolytic streptococci branch.',
    relatedLinks: [
      { label: 'Streptococcus guide', path: '/guides?guide=streptococcus-enterococcus' },
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' }
    ]
  },
  {
    id: 'naat',
    term: 'NAAT',
    aliases: ['nucleic acid amplification test', 'molecular amplification', 'molecular test'],
    category: 'Molecular diagnostics',
    definition: 'A molecular method that amplifies and detects organism-specific nucleic acid targets from a specimen or isolate.',
    details: [
      'NAAT can be faster and more sensitive than culture for selected organisms and syndromes.',
      'A positive result detects nucleic acid, not necessarily viable organism.',
      'Specimen type, inhibition, contamination, and target selection matter.'
    ],
    benchContext: 'NAAT is preferred for several organisms that are hard, slow, unsafe, or inappropriate to culture routinely.',
    studentTip: 'NAAT answers whether a target is detected. Always ask whether the target fits the syndrome and specimen.',
    relatedLinks: [
      { label: 'Nucleic acid analysis guide', path: '/guides?guide=nucleic-acid-analysis' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' },
      { label: 'Do not routine culture', path: '/do-not-routine-culture' }
    ]
  },
  {
    id: 'pcr',
    term: 'PCR',
    aliases: ['polymerase chain reaction', 'real-time pcr', 'rt-pcr'],
    category: 'Molecular diagnostics',
    definition: 'A nucleic acid amplification method that uses primers, polymerase, and cycling conditions to amplify a specific DNA or RNA-derived target.',
    details: [
      'Real-time PCR monitors amplification as it occurs.',
      'Reverse transcription PCR starts from RNA and converts it to DNA before amplification.',
      'Controls are needed to detect inhibition, contamination, and extraction failure.'
    ],
    benchContext: 'PCR is a method category within the broader NAAT family.',
    studentTip: 'PCR is powerful, but the answer is only as good as the target, specimen, and controls.',
    relatedLinks: [
      { label: 'Nucleic acid analysis guide', path: '/guides?guide=nucleic-acid-analysis' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'serology',
    term: 'Serology',
    aliases: ['serologic testing', 'antibody testing', 'igm', 'igg', 'titer'],
    category: 'Immunology and diagnosis',
    definition: 'Testing that detects host antibody or antigen patterns to support diagnosis when direct organism detection may be difficult or timing-dependent.',
    details: [
      'IgM may suggest recent infection but can be nonspecific.',
      'IgG seroconversion or a significant titer rise can support recent infection.',
      'Cross-reactivity and timing are common interpretation pitfalls.'
    ],
    benchContext: 'Serology is important for several intracellular, fastidious, and nonroutinely cultured organisms.',
    studentTip: 'A single antibody result is rarely the whole story. Timing and paired specimens often matter.',
    relatedLinks: [
      { label: 'Serology guide', path: '/guides?guide=serologic-diagnosis' },
      { label: 'Immunochemical methods guide', path: '/guides?guide=immunochemical-detection' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'mic',
    term: 'MIC',
    aliases: ['minimum inhibitory concentration', 'antimicrobial susceptibility', 'ast'],
    category: 'Antimicrobial susceptibility',
    definition: 'The lowest concentration of an antimicrobial that inhibits visible growth of an organism under standardized test conditions.',
    details: [
      'MIC values are interpreted using breakpoints when available.',
      'An MIC is not automatically susceptible or resistant without organism-drug-method context.',
      'Method, incubation, medium, inoculum, and QC affect reliability.'
    ],
    benchContext: 'MICs support antimicrobial susceptibility reporting and resistance detection.',
    studentTip: 'MIC is a measured value. Susceptible, intermediate, and resistant are interpreted categories.',
    relatedLinks: [
      { label: 'AST methods guide', path: '/guides?guide=antimicrobial-susceptibility-testing' },
      { label: 'Antimicrobial resistance guide', path: '/guides?guide=antimicrobial-action-resistance' }
    ]
  },
  {
    id: 'breakpoint',
    term: 'Breakpoint',
    aliases: ['susceptibility breakpoint', 'clinical breakpoint', 's i r'],
    category: 'Antimicrobial susceptibility',
    definition: 'An interpretive cutoff used to categorize an MIC or zone diameter as susceptible, intermediate, susceptible-dose dependent, or resistant.',
    details: [
      'Breakpoints depend on organism, drug, method, site considerations, dosing assumptions, and standard-setting guidance.',
      'They can change over time as evidence and resistance patterns evolve.',
      'Do not interpret raw MICs without the correct breakpoint context.'
    ],
    benchContext: 'Breakpoints translate test measurements into reportable susceptibility categories.',
    studentTip: 'A number becomes clinically meaningful only after the right breakpoint is applied.',
    relatedLinks: [
      { label: 'AST methods guide', path: '/guides?guide=antimicrobial-susceptibility-testing' },
      { label: 'Antimicrobial resistance guide', path: '/guides?guide=antimicrobial-action-resistance' }
    ]
  },
  {
    id: 'qc-strain',
    term: 'QC strain',
    aliases: ['quality control strain', 'control organism', 'atcc control'],
    category: 'Quality control',
    definition: 'A well-characterized organism used to verify that a test system, reagent, medium, or method is performing as expected.',
    details: [
      'QC results should fall within expected ranges or show expected reactions.',
      'Unexpected QC requires troubleshooting before patient or unknown isolate results are trusted.',
      'QC choices depend on the method and the reaction being checked.'
    ],
    benchContext: 'QC protects interpretation. A failed control means the test result may not be reliable.',
    studentTip: 'Do not skip the control mentally. QC tells you whether the test deserves your trust.',
    relatedLinks: [
      { label: 'Biochemical tests', path: '/biochemical-tests' },
      { label: 'AST methods guide', path: '/guides?guide=antimicrobial-susceptibility-testing' }
    ]
  },
  {
    id: 'anaerobe',
    term: 'Anaerobe',
    aliases: ['obligate anaerobe', 'anaerobic bacteria', 'strict anaerobe'],
    category: 'Organism physiology',
    definition: 'An organism that grows best, or only, in reduced oxygen conditions; obligate anaerobes may be inhibited or killed by oxygen exposure.',
    details: [
      'Anaerobic recovery depends heavily on specimen choice and transport.',
      'Oxygen exposure can reduce viability and compromise culture.',
      'Anaerobic ID uses morphology, aerotolerance, selective media, special potency disks, and group-level patterns.'
    ],
    benchContext: 'Anaerobe workups start before the plate: the specimen must be appropriate and protected from oxygen.',
    studentTip: 'For anaerobes, collection and transport are part of the test.',
    relatedLinks: [
      { label: 'Anaerobic lab considerations', path: '/guides?guide=anaerobic-bacteriology-lab-considerations' },
      { label: 'Overview of anaerobic organisms', path: '/guides?guide=overview-anaerobic-organisms' },
      { label: 'Anaerobe roadmap', path: '/obligate-anaerobe-roadmap' }
    ]
  },
  {
    id: 'aerotolerance',
    term: 'Aerotolerance',
    aliases: ['aerotolerance test', 'oxygen tolerance', 'anaerobe oxygen test'],
    category: 'Organism physiology',
    definition: 'A test or observation used to determine whether an organism can grow in oxygen compared with anaerobic conditions.',
    details: [
      'Obligate anaerobes should not grow aerobically under routine conditions.',
      'Facultative organisms can grow with or without oxygen.',
      'Aerotolerance helps confirm whether an anaerobic workup is appropriate.'
    ],
    benchContext: 'Aerotolerance prevents misclassifying facultative organisms as obligate anaerobes.',
    studentTip: 'If it grows in air, rethink whether you are truly dealing with an obligate anaerobe.',
    relatedLinks: [
      { label: 'Anaerobe roadmap', path: '/obligate-anaerobe-roadmap' },
      { label: 'Anaerobic lab considerations', path: '/guides?guide=anaerobic-bacteriology-lab-considerations' }
    ]
  },
  {
    id: 'bsl3',
    term: 'BSL-3',
    aliases: ['biosafety level 3', 'bsl 3', 'high consequence pathogen'],
    category: 'Laboratory safety',
    definition: 'A biosafety containment level used for work with organisms that can cause serious disease and may spread by aerosols or require enhanced containment.',
    details: [
      'Potential BSL-3 or select-agent concerns should trigger laboratory-specific escalation.',
      'Routine bench manipulation may be inappropriate for organisms such as suspected Brucella, Francisella, or Mycobacterium tuberculosis complex.',
      'Safety actions depend on local policy, organism suspicion, and exposure risk.'
    ],
    benchContext: 'Some IDs are not routine bench puzzles. They are safety decisions first.',
    studentTip: 'If the organism is dangerous to culture, the right answer may be stop, secure, notify, and refer.',
    relatedLinks: [
      { label: 'Laboratory safety guide', path: '/guides?guide=laboratory-safety-basics' },
      { label: 'Do not routine culture', path: '/do-not-routine-culture' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'ova-and-parasite-exam',
    term: 'Ova and parasite exam',
    aliases: ['o&p', 'op exam', 'stool parasite exam', 'ova parasite examination'],
    category: 'Parasitology diagnostics',
    definition: 'A stool microscopy workflow used to detect intestinal parasites such as protozoan cysts or trophozoites, helminth eggs or larvae, and selected oocysts.',
    details: [
      'Preserved stool, concentration methods, wet mounts, and permanent stains may all be part of the workflow.',
      'Multiple specimens may be needed because parasites can be shed intermittently.',
      'Routine O&P does not automatically detect every parasite; special stains, antigen tests, or molecular tests may be needed.'
    ],
    benchContext: 'O&P is a workflow, not one magic test. The result depends on specimen quality, preservation, concentration, staining, and organism burden.',
    studentTip: 'When you hear O&P, think: stool collection plus concentration plus morphology plus special methods when indicated.',
    relatedLinks: [
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Specimen management basics', path: '/guides?guide=specimens' }
    ]
  },
  {
    id: 'stool-concentration',
    term: 'Stool concentration',
    aliases: ['parasite concentration', 'formalin ethyl acetate', 'sedimentation', 'flotation'],
    category: 'Parasitology diagnostics',
    definition: 'A specimen processing approach that increases the chance of finding parasites by separating cysts, oocysts, eggs, or larvae from fecal debris.',
    details: [
      'Sedimentation methods are broadly useful for many helminth eggs and protozoan cysts.',
      'Flotation methods can recover selected parasite stages but may distort or miss heavier forms.',
      'Concentration improves detection but does not replace permanent staining for detailed protozoan morphology.'
    ],
    benchContext: 'Concentration helps the microscopist search a cleaner, enriched specimen instead of scanning raw stool debris.',
    studentTip: 'Concentration is about recovery. Permanent stain is about detail.',
    relatedLinks: [
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'permanent-stained-smear',
    term: 'Permanent stained smear',
    aliases: ['trichrome stain', 'iron hematoxylin stain', 'permanent stain', 'stool permanent stain'],
    category: 'Parasitology microscopy',
    definition: 'A stained stool smear used to evaluate intestinal protozoa with preserved nuclear and cytoplasmic detail.',
    details: [
      'Permanent stains are especially important for differentiating intestinal protozoa.',
      'Wet mounts can show motility in fresh stool, but permanent stains show internal morphology better.',
      'Poor fixation or staining can make protozoan identification unreliable.'
    ],
    benchContext: 'Permanent stain is the detailed morphology lane for intestinal protozoa in stool workups.',
    studentTip: 'Wet mount asks "is something moving?" Permanent stain asks "what does the organism look like inside?"',
    relatedLinks: [
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'thick-and-thin-blood-films',
    term: 'Thick and thin blood films',
    aliases: ['thick smear', 'thin smear', 'malaria smear', 'blood parasite smear'],
    category: 'Parasitology microscopy',
    definition: 'Microscopic blood film methods used to detect and characterize blood parasites, especially malaria and other intraerythrocytic or circulating parasites.',
    details: [
      'Thick films examine more blood and are more sensitive for screening.',
      'Thin films preserve red cell and parasite morphology for species clues and parasitemia estimation.',
      'Urgent blood parasite findings require prompt review and communication according to local policy.'
    ],
    benchContext: 'Thick and thin films work as a pair: one improves detection, the other improves interpretation.',
    studentTip: 'Thick finds; thin helps identify and quantify.',
    relatedLinks: [
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'modified-acid-fast-parasites',
    term: 'Modified acid-fast stain for parasites',
    aliases: ['modified acid fast', 'coccidia stain', 'cryptosporidium stain', 'cyclospora stain', 'cystoisospora stain'],
    category: 'Parasitology microscopy',
    definition: 'A special stain used to help detect selected intestinal coccidian oocysts that may be missed or underrecognized on routine stool examination.',
    details: [
      'Cryptosporidium, Cyclospora, and Cystoisospora are classic targets for modified acid-fast-type staining.',
      'Oocyst size, staining intensity, and clinical context help guide interpretation.',
      'Antigen or molecular methods may be used depending on the organism and laboratory workflow.'
    ],
    benchContext: 'Special stains are ordered because routine O&P does not answer every parasite question.',
    studentTip: 'If watery diarrhea and coccidia are on the differential, think beyond routine O&P.',
    relatedLinks: [
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Nucleic acid testing guide', path: '/guides?guide=nucleic-acid-analysis' }
    ]
  },
  {
    id: 'intestinal-protozoa',
    term: 'Intestinal protozoa',
    aliases: ['intestinal parasites', 'stool protozoa', 'enteric protozoa'],
    category: 'Parasitology organisms',
    definition: 'Single-celled eukaryotic parasites found in the intestinal tract, including amoebae, flagellates, ciliates, coccidia, and microsporidia.',
    details: [
      'Diagnostic forms may include trophozoites, cysts, oocysts, or spores depending on the organism.',
      'Some intestinal protozoa are major pathogens, while others are usually nonpathogenic or of uncertain significance.',
      'Routine stool O&P may need special stains, antigen tests, or molecular assays for selected organisms.'
    ],
    benchContext: 'Intestinal protozoa are interpreted by morphology plus clinical context; the same stool exam can include pathogens, colonizers, and organisms needing special methods.',
    studentTip: 'First ask the organism group: amoeba, flagellate, ciliate, coccidian, or microsporidian.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'entamoeba-histolytica-dispar',
    term: 'Entamoeba histolytica / Entamoeba dispar group',
    aliases: ['entamoeba histolytica', 'entamoeba dispar', 'amebiasis', 'amoebic dysentery', 'amebic liver abscess'],
    category: 'Parasitology organisms',
    definition: 'A morphologically overlapping amoeba group in stool microscopy where E. histolytica is the invasive pathogen and E. dispar is generally noninvasive.',
    details: [
      'Cysts and trophozoites of E. histolytica and E. dispar can be difficult or impossible to separate by routine morphology alone.',
      'Trophozoites containing ingested red blood cells support invasive E. histolytica when observed.',
      'Antigen or molecular testing can help distinguish pathogenic E. histolytica from nonpathogenic look-alikes.'
    ],
    benchContext: 'This is a reporting-discipline organism: do not overstate E. histolytica when the method only supports the histolytica/dispar group.',
    studentTip: 'Morphology may get you to the group; special testing may be needed for the clinically important species call.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'O&P exam', path: '/search' }
    ]
  },
  {
    id: 'giardia-duodenalis',
    term: 'Giardia duodenalis',
    aliases: ['giardia lamblia', 'giardia intestinalis', 'giardiasis'],
    category: 'Parasitology organisms',
    definition: 'An intestinal flagellate associated with diarrheal illness, malabsorption-type symptoms, outbreaks, travel, daycare exposure, and contaminated water.',
    details: [
      'Trophozoites are classically pear-shaped with paired nuclei and ventral adhesive disc features.',
      'Cysts are the environmentally resistant stage usually detected in formed stool.',
      'Antigen and molecular tests are common diagnostic options in addition to microscopy.'
    ],
    benchContext: 'Giardia is a high-yield intestinal protozoan where morphology, antigen detection, or NAAT may all be part of the diagnostic lane.',
    studentTip: 'Giardia is the classic water/daycare/travel flagellate with cysts and trophozoites.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'O&P exam', path: '/search' }
    ]
  },
  {
    id: 'cryptosporidium',
    term: 'Cryptosporidium',
    aliases: ['cryptosporidium parvum', 'cryptosporidium hominis', 'cryptosporidiosis', 'crypto parasite'],
    category: 'Parasitology organisms',
    definition: 'A coccidian intestinal protozoan that causes watery diarrhea and is especially important in young children, outbreaks, water exposure, and immunocompromised hosts.',
    details: [
      'Oocysts are small and may be detected by modified acid-fast stains, fluorescent methods, antigen tests, or NAAT.',
      'Routine O&P alone may not be sufficient unless the appropriate stain or method is included.',
      'Persistent or severe disease is more concerning in immunocompromised patients.'
    ],
    benchContext: 'Cryptosporidium is a good example of why special parasite testing must match the clinical question.',
    studentTip: 'Watery diarrhea plus coccidia concern means think special stain, antigen, or molecular test.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'Modified acid-fast stain', path: '/search' }
    ]
  },
  {
    id: 'cyclospora-cystoisospora',
    term: 'Cyclospora and Cystoisospora',
    aliases: ['cyclospora cayetanensis', 'cystoisospora belli', 'isospora belli', 'coccidia'],
    category: 'Parasitology organisms',
    definition: 'Intestinal coccidian parasites associated with diarrheal illness that may require concentration, modified acid-fast staining, fluorescence, or molecular testing for detection.',
    details: [
      'Cyclospora oocysts are acid-fast variable and can autofluoresce; outbreaks can be linked to fresh produce.',
      'Cystoisospora oocysts are larger and clinically important in immunocompromised hosts.',
      'Both can be missed if the lab is not asked to look for coccidia or if only routine methods are used.'
    ],
    benchContext: 'These organisms reinforce the rule that parasite workups are test-menu dependent.',
    studentTip: 'If the order just says routine O&P, ask whether the suspected coccidia are actually included.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'Modified acid-fast stain', path: '/search' }
    ]
  },
  {
    id: 'microsporidia',
    term: 'Microsporidia',
    aliases: ['enterocytozoon bieneusi', 'encephalitozoon', 'microsporidiosis'],
    category: 'Parasitology organisms',
    definition: 'Very small spore-forming intestinal parasites that can cause diarrhea, especially in immunocompromised patients, and often require special stains or molecular testing.',
    details: [
      'Spores are tiny and can be difficult to detect on routine stool microscopy.',
      'Modified trichrome-type stains, fluorescence, electron microscopy in selected contexts, or NAAT may be used depending on the lab.',
      'Clinical suspicion is important because routine O&P may not include a microsporidia workup.'
    ],
    benchContext: 'Microsporidia are a visibility problem: the organism is small, and the method has to be chosen intentionally.',
    studentTip: 'Tiny spores plus immunocompromised host equals do not rely on routine O&P alone.',
    relatedLinks: [
      { label: 'Intestinal protozoa guide', path: '/guides?guide=intestinal-protozoa' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'malaria-parasites',
    term: 'Malaria parasites',
    aliases: ['plasmodium', 'plasmodium falciparum', 'plasmodium vivax', 'plasmodium ovale', 'plasmodium malariae', 'plasmodium knowlesi', 'malaria smear'],
    category: 'Parasitology organisms',
    definition: 'Intraerythrocytic Plasmodium parasites detected primarily by blood films, rapid antigen tests, or molecular methods in patients with compatible fever and exposure risk.',
    details: [
      'Thick films improve detection, while thin films preserve morphology for species clues and parasitemia estimation.',
      'Morphologic clues include ring forms, trophozoites, schizonts, gametocytes, infected red cell changes, and parasite density.',
      'Suspected malaria is urgent and may require repeat smears if the first exam is negative but suspicion remains high.'
    ],
    benchContext: 'Malaria is a time-sensitive blood parasite workflow: find it, estimate burden when appropriate, communicate promptly, and support species-level interpretation.',
    studentTip: 'For malaria, thick finds and thin identifies, but urgency drives the workflow.',
    relatedLinks: [
      { label: 'Blood and tissue protozoa guide', path: '/guides?guide=blood-and-tissue-protozoa' },
      { label: 'Thick and thin blood films', path: '/search' }
    ]
  },
  {
    id: 'babesia',
    term: 'Babesia',
    aliases: ['babesia microti', 'babesiosis', 'maltese cross', 'tick blood parasite'],
    category: 'Parasitology organisms',
    definition: 'An intraerythrocytic protozoan parasite often associated with tick exposure and sometimes transfusion, producing blood-film findings that can resemble malaria.',
    details: [
      'Ring forms may be seen in red blood cells, and Maltese-cross tetrads are classic when present.',
      'Unlike malaria, Babesia is often considered with local tick exposure in endemic regions.',
      'Disease can be severe in asplenic, elderly, or immunocompromised patients.'
    ],
    benchContext: 'Babesia belongs in the blood-film differential when intraerythrocytic parasites are seen and exposure history does not fit malaria cleanly.',
    studentTip: 'Intra-RBC parasite plus tick exposure: think Babesia, especially if Maltese-cross forms appear.',
    relatedLinks: [
      { label: 'Blood and tissue protozoa guide', path: '/guides?guide=blood-and-tissue-protozoa' },
      { label: 'Thick and thin blood films', path: '/search' }
    ]
  },
  {
    id: 'trypanosoma',
    term: 'Trypanosoma',
    aliases: ['trypanosomes', 'trypanosoma brucei', 'trypanosoma cruzi', 'african trypanosomiasis', 'chagas disease'],
    category: 'Parasitology organisms',
    definition: 'Blood and tissue protozoa that cause African trypanosomiasis or American trypanosomiasis, with diagnosis guided by geography, vector exposure, disease stage, microscopy, serology, or molecular testing.',
    details: [
      'African trypanosomes are associated with tsetse fly exposure and may be detected as trypomastigotes in blood or other specimens.',
      'Trypanosoma cruzi causes Chagas disease; acute infection may show blood forms, while chronic infection often depends on serology or molecular strategies.',
      'Exposure history and geography are essential because the diagnostic workflow differs by species complex.'
    ],
    benchContext: 'Trypanosome diagnosis is not a generic blood parasite call; geography, vector, stage of illness, and specimen type decide the method.',
    studentTip: 'Tsetse fly points one direction; triatomine/reduviid bug points another.',
    relatedLinks: [
      { label: 'Blood and tissue protozoa guide', path: '/guides?guide=blood-and-tissue-protozoa' },
      { label: 'Serology guide', path: '/guides?guide=serologic-diagnosis' }
    ]
  },
  {
    id: 'leishmania',
    term: 'Leishmania',
    aliases: ['leishmaniasis', 'amastigotes', 'promastigotes', 'visceral leishmaniasis', 'cutaneous leishmaniasis', 'sand fly'],
    category: 'Parasitology organisms',
    definition: 'A tissue protozoan transmitted by sand flies that can cause cutaneous, mucocutaneous, or visceral disease and may be detected by microscopy, culture, serology, or molecular methods.',
    details: [
      'Amastigotes may be seen inside macrophages in tissue, lesion aspirates, bone marrow, or other involved specimens.',
      'Clinical form and geography guide which species groups and diagnostic methods are most likely.',
      'Serology can support visceral disease but may be less useful for localized cutaneous disease depending on setting.'
    ],
    benchContext: 'Leishmania is a tissue-focused diagnosis: the specimen must match the disease site.',
    studentTip: 'Think sand fly plus macrophage amastigotes plus lesion or visceral syndrome.',
    relatedLinks: [
      { label: 'Blood and tissue protozoa guide', path: '/guides?guide=blood-and-tissue-protozoa' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'toxoplasma-gondii',
    term: 'Toxoplasma gondii',
    aliases: ['toxoplasmosis', 'toxoplasma', 'tachyzoite', 'bradyzoite', 'congenital toxoplasmosis'],
    category: 'Parasitology organisms',
    definition: 'A tissue protozoan associated with congenital infection, ocular disease, and severe disease in immunocompromised patients, diagnosed using serology, molecular testing, histopathology, or selected direct methods.',
    details: [
      'Serology interpretation depends heavily on timing, immune status, and pregnancy context.',
      'PCR may support diagnosis from selected specimens such as amniotic fluid, CSF, or tissue depending on the clinical question.',
      'Histopathology or organism demonstration may be needed in some tissue disease settings.'
    ],
    benchContext: 'Toxoplasma is usually not a routine stool or blood-smear diagnosis; the clinical context determines whether serology, PCR, or tissue methods matter.',
    studentTip: 'Pregnancy, eye disease, CNS lesions, and immunocompromise are the big context flags.',
    relatedLinks: [
      { label: 'Blood and tissue protozoa guide', path: '/guides?guide=blood-and-tissue-protozoa' },
      { label: 'Serology guide', path: '/guides?guide=serologic-diagnosis' }
    ]
  },
  {
    id: 'free-living-amoebae',
    term: 'Free-living amoebae',
    aliases: ['naegleria', 'acanthamoeba', 'balamuthia', 'amoebic keratitis', 'primary amebic meningoencephalitis', 'granulomatous amebic encephalitis'],
    category: 'Parasitology organisms',
    definition: 'Environmental amoebae that can cause severe CNS disease, keratitis, or disseminated infection depending on species, exposure, and host status.',
    details: [
      'Naegleria fowleri is associated with warm freshwater exposure and rapidly progressive meningoencephalitis.',
      'Acanthamoeba can cause keratitis, especially with contact lens risk, and can also cause CNS disease.',
      'Balamuthia can cause granulomatous amebic encephalitis and often requires specialized reference testing.'
    ],
    benchContext: 'Free-living amoebae are high-consequence diagnoses where clinical suspicion and correct specimen referral are critical.',
    studentTip: 'Do not put these in routine stool parasite logic; they are exposure- and syndrome-driven emergencies.',
    relatedLinks: [
      { label: 'Other protozoa guide', path: '/guides?guide=other-protozoa' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'trichomonas-vaginalis',
    term: 'Trichomonas vaginalis',
    aliases: ['trichomoniasis', 'trichomonas wet mount', 'urogenital flagellate'],
    category: 'Parasitology organisms',
    definition: 'A urogenital flagellated protozoan detected from genital or urine-associated specimens by wet mount, antigen testing, or molecular methods.',
    details: [
      'Motile trophozoites may be seen on a fresh wet preparation, but motility fades with time.',
      'NAAT is commonly more sensitive than wet mount when available.',
      'A negative wet mount does not rule out infection when clinical suspicion remains high.'
    ],
    benchContext: 'Trichomonas is a source-and-timing problem: the specimen must be fresh enough for motility or tested by a more sensitive targeted method.',
    studentTip: 'Think trophozoite, not cyst; genital source, not routine stool O&P.',
    relatedLinks: [
      { label: 'Other protozoa guide', path: '/guides?guide=other-protozoa' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'enterobius-vermicularis',
    term: 'Enterobius vermicularis',
    aliases: ['pinworm', 'perianal tape prep', 'scotch tape test'],
    category: 'Parasitology organisms',
    definition: 'An intestinal nematode best detected by perianal tape preparation because eggs are deposited around the anus rather than reliably shed throughout stool.',
    details: [
      'Eggs are characteristically flattened on one side.',
      'Morning perianal collection before bathing or toileting improves recovery.',
      'Routine stool O&P is not the preferred screening method for pinworm.'
    ],
    benchContext: 'Pinworm is a collection-method lesson: the correct specimen is more important than ordering a broad parasite screen.',
    studentTip: 'Itching at night plus tape prep equals Enterobius mindset.',
    relatedLinks: [
      { label: 'Intestinal nematodes guide', path: '/guides?guide=intestinal-nematodes' },
      { label: 'Ova and parasite exam', path: '/search' }
    ]
  },
  {
    id: 'ascaris-lumbricoides',
    term: 'Ascaris lumbricoides',
    aliases: ['ascaris', 'roundworm', 'mammillated egg'],
    category: 'Parasitology organisms',
    definition: 'A large intestinal roundworm commonly recognized by characteristic eggs in stool or by recovery of adult worms.',
    details: [
      'Fertilized and unfertilized eggs can look different.',
      'Eggs may have a thick shell and mammillated outer coat, although decorticated forms can occur.',
      'Adult worms may occasionally be submitted for identification.'
    ],
    benchContext: 'Ascaris is usually a morphology-forward stool diagnosis: recognize the egg form and report the stage seen.',
    studentTip: 'Large roundworm plus distinctive thick-shelled eggs: think Ascaris.',
    relatedLinks: [
      { label: 'Intestinal nematodes guide', path: '/guides?guide=intestinal-nematodes' }
    ]
  },
  {
    id: 'strongyloides-stercoralis',
    term: 'Strongyloides stercoralis',
    aliases: ['strongyloides', 'rhabditiform larva', 'filariform larva', 'hyperinfection'],
    category: 'Parasitology organisms',
    definition: 'An intestinal nematode diagnosed primarily by larvae, with autoinfection potential and severe hyperinfection risk in immunosuppressed patients.',
    details: [
      'Larvae may be intermittent in stool, so a single negative exam can miss infection.',
      'Agar plate culture, Baermann-type methods, concentration, or serology may be used depending on workflow.',
      'Hyperinfection can involve respiratory and other non-stool specimens.'
    ],
    benchContext: 'Strongyloides is the nematode where missing the diagnosis before immunosuppression can matter a lot.',
    studentTip: 'Larvae in stool, autoinfection, steroids/immunosuppression: put Strongyloides high on the list.',
    relatedLinks: [
      { label: 'Intestinal nematodes guide', path: '/guides?guide=intestinal-nematodes' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'hookworm',
    term: 'Hookworm',
    aliases: ['ancylostoma duodenale', 'necator americanus', 'hookworm egg'],
    category: 'Parasitology organisms',
    definition: 'Intestinal nematodes associated with thin-shelled eggs in stool and clinical patterns such as iron-deficiency anemia in heavier infections.',
    details: [
      'Routine eggs usually identify the hookworm group rather than separating Ancylostoma from Necator.',
      'Delayed stool handling can allow larvae to develop and complicate interpretation.',
      'Larval morphology may be needed in selected cultures or follow-up workups.'
    ],
    benchContext: 'Hookworm reinforces group-level reporting: eggs may be recognizable, but species often is not from routine stool alone.',
    studentTip: 'Thin-shelled oval egg in stool: report the supported hookworm group unless more evidence exists.',
    relatedLinks: [
      { label: 'Intestinal nematodes guide', path: '/guides?guide=intestinal-nematodes' }
    ]
  },
  {
    id: 'trichuris-trichiura',
    term: 'Trichuris trichiura',
    aliases: ['whipworm', 'barrel egg', 'bipolar plugs'],
    category: 'Parasitology organisms',
    definition: 'An intestinal nematode classically recognized by barrel-shaped eggs with bipolar plugs in stool.',
    details: [
      'Egg morphology is usually the key bench clue.',
      'Heavy infections can be clinically significant, especially in children in endemic settings.',
      'Adult worms are less commonly submitted than eggs are seen.'
    ],
    benchContext: 'Trichuris is a high-yield morphology card: bipolar plugs are the shortcut.',
    studentTip: 'Barrel with two plugs means whipworm until proven otherwise.',
    relatedLinks: [
      { label: 'Intestinal nematodes guide', path: '/guides?guide=intestinal-nematodes' }
    ]
  },
  {
    id: 'trichinella-spiralis',
    term: 'Trichinella spiralis',
    aliases: ['trichinellosis', 'trichinosis', 'muscle larvae'],
    category: 'Parasitology organisms',
    definition: 'A tissue nematode associated with undercooked meat exposure and muscle invasion, usually evaluated through clinical context, serology, and sometimes tissue findings.',
    details: [
      'Symptoms can include fever, myalgia, periorbital edema, and eosinophilia in compatible exposures.',
      'Stool O&P is not the diagnostic focus because larvae encyst in muscle.',
      'Serology timing and clinical exposure history are important for interpretation.'
    ],
    benchContext: 'Trichinella is a tissue syndrome, not a routine stool parasite hunt.',
    studentTip: 'Undercooked meat plus myalgia and eosinophilia: think tissue nematode.',
    relatedLinks: [
      { label: 'Tissue nematodes guide', path: '/guides?guide=tissue-nematodes' }
    ]
  },
  {
    id: 'toxocara-larva-migrans',
    term: 'Toxocara larva migrans',
    aliases: ['toxocara canis', 'toxocara cati', 'visceral larva migrans', 'ocular larva migrans'],
    category: 'Parasitology organisms',
    definition: 'A larval nematode infection linked to dog or cat roundworm exposure that can cause visceral or ocular disease in humans.',
    details: [
      'Humans are accidental hosts, so stool eggs are not expected from the patient.',
      'Serology, eye findings, imaging, eosinophilia, and exposure history may support diagnosis.',
      'Ocular disease may occur with limited systemic findings.'
    ],
    benchContext: 'Toxocara is a classic reminder that not every parasite diagnosis comes from stool.',
    studentTip: 'Dog/cat soil exposure plus visceral or eye disease: stool O&P is not the main answer.',
    relatedLinks: [
      { label: 'Tissue nematodes guide', path: '/guides?guide=tissue-nematodes' }
    ]
  },
  {
    id: 'filarial-nematodes',
    term: 'Filarial nematodes',
    aliases: ['microfilariae', 'wuchereria', 'brugia', 'loa loa', 'onchocerca', 'mansonella'],
    category: 'Parasitology organisms',
    definition: 'Blood or tissue nematodes whose larvae, called microfilariae, may be detected in blood, skin, or other specimens depending on species.',
    details: [
      'Blood collection timing can matter because some species show periodicity.',
      'Skin snips are important for selected organisms such as Onchocerca.',
      'Sheath, nuclei pattern, size, and tail morphology support identification.'
    ],
    benchContext: 'Filarial workups are all about matching organism suspicion to specimen, collection time, and morphology.',
    studentTip: 'Before looking for microfilariae, ask: blood or skin, and what time was it collected?',
    relatedLinks: [
      { label: 'Filarial nematodes guide', path: '/guides?guide=filarial-nematodes' },
      { label: 'Thick and thin blood films', path: '/search' }
    ]
  },
  {
    id: 'taenia',
    term: 'Taenia species',
    aliases: ['taenia solium', 'taenia saginata', 'tapeworm', 'proglottid', 'taenia egg'],
    category: 'Parasitology organisms',
    definition: 'Intestinal tapeworms detected by eggs, proglottids, or scolex features, with routine eggs usually supporting Taenia group rather than species.',
    details: [
      'Taenia eggs are not enough to reliably separate T. solium from T. saginata.',
      'Gravid proglottid branching or scolex features can support species-level workup.',
      'T. solium matters because of cysticercosis risk.'
    ],
    benchContext: 'Taenia is a wording discipline issue: report only the level the specimen supports.',
    studentTip: 'Taenia egg equals group-level call unless you have the segment or scolex evidence.',
    relatedLinks: [
      { label: 'Intestinal cestodes guide', path: '/guides?guide=intestinal-cestodes' },
      { label: 'Tissue cestodes guide', path: '/guides?guide=tissue-cestodes' }
    ]
  },
  {
    id: 'hymenolepis',
    term: 'Hymenolepis',
    aliases: ['hymenolepis nana', 'hymenolepis diminuta', 'dwarf tapeworm'],
    category: 'Parasitology organisms',
    definition: 'Small intestinal tapeworms recognized by stool eggs, with H. nana classically showing polar thickenings and filaments.',
    details: [
      'H. nana can complete its life cycle in humans and is an important dwarf tapeworm.',
      'H. diminuta eggs are larger and lack the classic polar filaments of H. nana.',
      'Egg morphology is usually the primary bench clue.'
    ],
    benchContext: 'Hymenolepis is a tapeworm egg morphology problem more than a gross segment problem.',
    studentTip: 'Small tapeworm egg with polar filaments: think H. nana.',
    relatedLinks: [
      { label: 'Intestinal cestodes guide', path: '/guides?guide=intestinal-cestodes' }
    ]
  },
  {
    id: 'echinococcus',
    term: 'Echinococcus',
    aliases: ['hydatid cyst', 'echinococcus granulosus', 'echinococcus multilocularis', 'echinococcosis'],
    category: 'Parasitology organisms',
    definition: 'Larval tapeworm infection causing cystic or alveolar tissue disease, usually evaluated through imaging, serology, histopathology, and specialized handling.',
    details: [
      'Cystic disease often involves liver or lung, while alveolar disease can be infiltrative.',
      'Potential hydatid cyst material requires careful handling because disruption can be hazardous.',
      'Stool O&P is not the diagnostic pathway for human tissue-stage disease.'
    ],
    benchContext: 'Echinococcus is a tissue-cyst diagnosis where safety and specimen handling are part of the interpretation.',
    studentTip: 'Hydatid cyst is not a casual aspirate-and-look situation.',
    relatedLinks: [
      { label: 'Tissue cestodes guide', path: '/guides?guide=tissue-cestodes' }
    ]
  },
  {
    id: 'cysticercosis',
    term: 'Cysticercosis',
    aliases: ['neurocysticercosis', 'taenia solium larva', 'cysticercus'],
    category: 'Parasitology organisms',
    definition: 'Tissue infection with larval Taenia solium that can involve CNS, eye, muscle, or subcutaneous tissue and is evaluated with imaging, serology, or pathology.',
    details: [
      'Cysticercosis is different from intestinal adult Taenia infection.',
      'Neurocysticercosis is a major clinical form and often requires imaging-based interpretation.',
      'Ocular involvement changes management and requires careful clinical coordination.'
    ],
    benchContext: 'Cysticercosis connects tapeworm biology to tissue disease, so stool findings and tissue findings answer different questions.',
    studentTip: 'Adult worm in gut and larva in tissue are not the same diagnostic problem.',
    relatedLinks: [
      { label: 'Tissue cestodes guide', path: '/guides?guide=tissue-cestodes' },
      { label: 'Intestinal cestodes guide', path: '/guides?guide=intestinal-cestodes' }
    ]
  },
  {
    id: 'intestinal-trematodes',
    term: 'Intestinal trematodes',
    aliases: ['intestinal flukes', 'fasciolopsis', 'heterophyes', 'metagonimus', 'echinostoma'],
    category: 'Parasitology organisms',
    definition: 'Foodborne intestinal flukes usually detected by operculated eggs in stool and interpreted with dietary and geographic exposure history.',
    details: [
      'Aquatic plants, freshwater fish, or other regional foods may be important exposures.',
      'Egg morphology can overlap across fluke groups, so measurement and context matter.',
      'Species-level reporting may not be possible from routine eggs alone.'
    ],
    benchContext: 'Intestinal flukes are a context-and-egg-morphology workflow, not a single memorized plate.',
    studentTip: 'Operculated egg plus food exposure: think fluke, then ask which source and size fit.',
    relatedLinks: [
      { label: 'Intestinal trematodes guide', path: '/guides?guide=intestinal-trematodes' }
    ]
  },
  {
    id: 'liver-flukes',
    term: 'Liver flukes',
    aliases: ['clonorchis', 'opisthorchis', 'fasciola', 'biliary fluke'],
    category: 'Parasitology organisms',
    definition: 'Trematodes involving the biliary tract or liver, often linked to freshwater fish or aquatic plant exposure and diagnosed by eggs, serology, imaging, or tissue findings.',
    details: [
      'Clonorchis and Opisthorchis are associated with raw or undercooked freshwater fish exposure.',
      'Fasciola is associated with aquatic plant exposure and may need serology before eggs are detectable.',
      'Egg size and exposure history help separate liver fluke groups.'
    ],
    benchContext: 'Liver fluke diagnosis is exposure-led: biliary symptoms plus the right food history changes the workup.',
    studentTip: 'Fish points toward Clonorchis/Opisthorchis; aquatic plants point toward Fasciola.',
    relatedLinks: [
      { label: 'Liver and lung trematodes guide', path: '/guides?guide=liver-lung-trematodes' }
    ]
  },
  {
    id: 'paragonimus',
    term: 'Paragonimus',
    aliases: ['lung fluke', 'paragonimus westermani', 'paragonimiasis'],
    category: 'Parasitology organisms',
    definition: 'A lung fluke associated with raw or undercooked crab or crayfish exposure, with eggs detected in sputum, stool, or tissue depending on disease pattern.',
    details: [
      'Pulmonary disease can mimic other chronic lung processes.',
      'Eggs may be swallowed and found in stool even when the primary site is pulmonary.',
      'Sputum examination and exposure history are important clues.'
    ],
    benchContext: 'Paragonimus reminds students that a parasite egg in stool may have come from the lungs.',
    studentTip: 'Crab or crayfish exposure plus cough or hemoptysis: think lung fluke.',
    relatedLinks: [
      { label: 'Liver and lung trematodes guide', path: '/guides?guide=liver-lung-trematodes' }
    ]
  },
  {
    id: 'schistosoma',
    term: 'Schistosoma',
    aliases: ['schistosomiasis', 'blood fluke', 'schistosoma haematobium', 'schistosoma mansoni', 'schistosoma japonicum'],
    category: 'Parasitology organisms',
    definition: 'Blood flukes associated with freshwater exposure in endemic areas, diagnosed by eggs in urine, stool, or tissue and supported by serology in selected settings.',
    details: [
      'S. haematobium is classically associated with terminal-spined eggs in urine.',
      'S. mansoni is associated with large lateral-spined eggs, often in stool or tissue.',
      'Serology can be useful when egg burden is low, especially in travelers.'
    ],
    benchContext: 'Schistosoma workups begin with exposure and specimen choice: urine and stool answer different species questions.',
    studentTip: 'Freshwater exposure plus eggs with spines equals Schistosoma thinking.',
    relatedLinks: [
      { label: 'Blood trematodes guide', path: '/guides?guide=blood-trematodes' },
      { label: 'Parasitology methods overview', path: '/guides?guide=parasitology-lab-methods-overview' }
    ]
  },
  {
    id: 'fungal-direct-exam',
    term: 'Fungal direct exam',
    aliases: ['koh prep', 'calcofluor white', 'gms stain', 'pas stain', 'lactophenol cotton blue'],
    category: 'Mycology methods',
    definition: 'A first-look microscopy approach used to detect fungal elements directly from clinical material or culture preparations before full identification is available.',
    details: [
      'KOH and calcofluor can reveal fungal elements from skin, hair, nail, respiratory, or tissue-associated specimens.',
      'GMS and PAS are common histopathology stains for fungi in tissue.',
      'Direct exam can show morphology quickly, but culture or molecular methods may be needed for organism-level identification.'
    ],
    benchContext: 'Direct exam answers the urgent question: are fungal elements present, and what broad pattern do they show?',
    studentTip: 'Direct exam is pattern recognition first; name the morphology before trying to name the species.',
    relatedLinks: [
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'hyaline-septate-hyphae',
    term: 'Hyaline septate hyphae',
    aliases: ['septate mold hyphae', 'aspergillus-like hyphae', 'hyaline mold'],
    category: 'Mycology morphology',
    definition: 'Lightly pigmented or nonpigmented fungal hyphae with septations, seen in molds such as Aspergillus, Fusarium, Scedosporium, and related opportunistic fungi.',
    details: [
      'Tissue morphology can suggest a mold group but usually cannot provide species-level identification by itself.',
      'Branching pattern, width, septation, and invasion are interpreted with culture and clinical context.',
      'Several clinically important molds can look similar in tissue but differ in antifungal expectations.'
    ],
    benchContext: 'Hyaline septate hyphae should be reported descriptively and escalated when seen from tissue or sterile sites.',
    studentTip: 'Do not call every septate hyaline mold Aspergillus from tissue alone.',
    relatedLinks: [
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' },
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'mucorales',
    term: 'Mucorales',
    aliases: ['mucormycosis', 'zygomycosis', 'rhizopus', 'mucor', 'lichtheimia', 'broad pauciseptate hyphae'],
    category: 'Mycology organisms',
    definition: 'A group of molds associated with mucormycosis, classically showing broad, ribbon-like, pauciseptate hyphae in tissue.',
    details: [
      'Compatible tissue morphology can be urgent even when culture is negative.',
      'Risk factors include uncontrolled diabetes, neutropenia, transplant, corticosteroid exposure, trauma, burns, and severe immunosuppression.',
      'Genus-level identification may require culture morphology or molecular confirmation.'
    ],
    benchContext: 'Mucorales morphology in tissue is a rapid-communication finding because treatment and surgical decisions may be time-sensitive.',
    studentTip: 'Broad, ribbon-like, few septa, wide-angle branching: think Mucorales pattern.',
    relatedLinks: [
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' },
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'dermatophytes',
    term: 'Dermatophytes',
    aliases: ['trichophyton', 'microsporum', 'epidermophyton', 'tinea', 'ringworm'],
    category: 'Mycology organisms',
    definition: 'Keratin-associated molds that infect skin, hair, and nails and are commonly evaluated by direct exam and culture morphology.',
    details: [
      'Specimen quality matters: collect from the active edge of skin lesions, affected hair, or diseased nail material.',
      'KOH or calcofluor can show septate hyphae or arthroconidia before culture results are available.',
      'Macroconidia, microconidia, colony pigment, growth rate, and selected adjunct tests help separate genera.'
    ],
    benchContext: 'Dermatophyte workups are slow enough that good collection and careful preliminary reporting make a real difference.',
    studentTip: 'Skin, hair, nail plus keratin-loving mold: think dermatophyte workflow.',
    relatedLinks: [
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' }
    ]
  },
  {
    id: 'aspergillus',
    term: 'Aspergillus',
    aliases: ['aspergillosis', 'aspergillus fumigatus', 'aspergillus flavus', 'aspergillus niger', 'aspergillus terreus'],
    category: 'Mycology organisms',
    definition: 'A genus of hyaline molds that can cause allergic, colonizing, or invasive disease depending on host status and specimen source.',
    details: [
      'Culture morphology may show characteristic conidial heads with vesicles and phialides.',
      'Tissue often shows hyaline septate hyphae, but that appearance is not exclusive to Aspergillus.',
      'Galactomannan, beta-D-glucan, imaging, culture, histopathology, and molecular methods may support invasive disease workups.'
    ],
    benchContext: 'Aspergillus interpretation is source-dependent: respiratory growth can be colonization, while tissue invasion changes the meaning.',
    studentTip: 'Aspergillus is common enough to know well, but tissue hyphae alone are not a species ID.',
    relatedLinks: [
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' }
    ]
  },
  {
    id: 'fusarium',
    term: 'Fusarium',
    aliases: ['fusariosis', 'banana-shaped macroconidia', 'hyaline mold'],
    category: 'Mycology organisms',
    definition: 'A hyaline mold that can cause keratitis, skin, nail, or disseminated infection and may produce distinctive canoe- or banana-shaped macroconidia in culture.',
    details: [
      'Fusarium can resemble other hyaline molds in tissue.',
      'Disseminated disease may yield positive blood cultures more often than many other molds.',
      'Species-level identification and susceptibility context can matter because resistance patterns vary.'
    ],
    benchContext: 'Fusarium is a good example of why culture morphology and organism-level ID matter after a hyaline septate tissue clue.',
    studentTip: 'Banana macroconidia on culture plus hyaline mold thinking: remember Fusarium.',
    relatedLinks: [
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' }
    ]
  },
  {
    id: 'fungal-biomarkers',
    term: 'Fungal biomarkers',
    aliases: ['galactomannan', 'beta-d-glucan', 'cryptococcal antigen', 'histoplasma antigen'],
    category: 'Mycology methods',
    definition: 'Nonculture tests that detect fungal antigens or cell-wall components to support selected mycology diagnoses.',
    details: [
      'Galactomannan is commonly associated with aspergillosis workups, depending on specimen and patient population.',
      'Beta-D-glucan is a broad fungal marker but does not detect every fungal group equally and is not organism-specific.',
      'Cryptococcal and Histoplasma antigen tests answer more targeted diagnostic questions.'
    ],
    benchContext: 'Fungal biomarkers are adjuncts, not replacements for specimen source, imaging, culture, histopathology, and clinical context.',
    studentTip: 'A biomarker tells you a pattern of evidence; it does not automatically name the fungus.',
    relatedLinks: [
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' },
      { label: 'Hyaline molds guide', path: '/guides?guide=hyaline-molds-dermatophytes' }
    ]
  },
  {
    id: 'dematiaceous-molds',
    term: 'Dematiaceous molds',
    aliases: ['melanized molds', 'pigmented molds', 'brown black molds', 'phaeoid fungi'],
    category: 'Mycology organisms',
    definition: 'Melanin-containing molds that produce dark colonies or pigmented fungal elements and can cause cutaneous, subcutaneous, ocular, allergic, CNS, or invasive disease.',
    details: [
      'Pigment in the cell wall can make hyphae or tissue elements appear brown to black.',
      'Clinical patterns include chromoblastomycosis, phaeohyphomycosis, eumycetoma, allergic fungal sinusitis, keratitis, and invasive disease.',
      'Culture morphology can be complex, so clinically significant isolates often need confirmatory identification.'
    ],
    benchContext: 'Dematiaceous mold workups begin with pigment plus source: a dark mold from air is not the same as pigmented hyphae in tissue.',
    studentTip: 'Dark mold plus tissue disease means stop and think melanized mold, not generic contaminant.',
    relatedLinks: [
      { label: 'Dematiaceous molds guide', path: '/guides?guide=dematiaceous-molds' },
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'chromoblastomycosis',
    term: 'Chromoblastomycosis',
    aliases: ['chromomycosis', 'sclerotic bodies', 'medlar bodies', 'muriform cells'],
    category: 'Mycology syndromes',
    definition: 'A chronic cutaneous or subcutaneous infection caused by melanized fungi, classically associated with muriform or sclerotic bodies in tissue.',
    details: [
      'Lesions are often chronic and verrucous after traumatic inoculation.',
      'Sclerotic bodies are a high-yield tissue clue.',
      'Culture or molecular identification may be needed for genus or species-level confirmation.'
    ],
    benchContext: 'Chromoblastomycosis is a tissue-pattern diagnosis first; the culture result refines the organism.',
    studentTip: 'Brown round sclerotic bodies in chronic skin disease: think chromoblastomycosis.',
    relatedLinks: [
      { label: 'Dematiaceous molds guide', path: '/guides?guide=dematiaceous-molds' }
    ]
  },
  {
    id: 'phaeohyphomycosis',
    term: 'Phaeohyphomycosis',
    aliases: ['pigmented hyphae in tissue', 'melanized mold tissue infection'],
    category: 'Mycology syndromes',
    definition: 'A broad tissue infection pattern caused by melanized fungi, showing pigmented hyphae, yeast-like cells, or irregular fungal elements rather than sclerotic bodies.',
    details: [
      'Disease can be localized, subcutaneous, sinus, ocular, CNS, or disseminated depending on organism and host.',
      'The diagnosis is descriptive and should be linked to tissue findings and culture or molecular workup.',
      'Sterile-site or CNS isolates warrant careful identification.'
    ],
    benchContext: 'Phaeohyphomycosis tells the clinician the tissue pattern; it does not automatically name the mold.',
    studentTip: 'Pigmented hyphae in tissue equals phaeohyphomycosis-style language.',
    relatedLinks: [
      { label: 'Dematiaceous molds guide', path: '/guides?guide=dematiaceous-molds' }
    ]
  },
  {
    id: 'dimorphic-fungi',
    term: 'Dimorphic fungi',
    aliases: ['thermal dimorphism', 'endemic mycoses', 'systemic mycoses'],
    category: 'Mycology organisms',
    definition: 'Fungi that can grow in different forms depending on temperature or host environment, often as mold in the environment or culture and yeast-like or spherule forms in tissue.',
    details: [
      'Geography and exposure history are major diagnostic clues.',
      'Culture manipulation can pose biosafety risk for some dimorphic fungi.',
      'Tissue morphology, antigen, serology, culture, and molecular testing may all contribute.'
    ],
    benchContext: 'Dimorphic fungi are where mycology becomes geography plus morphology plus safety.',
    studentTip: 'Do not open a suspicious mold culture casually; dimorphic fungi deserve biosafety respect.',
    relatedLinks: [
      { label: 'Dimorphic fungi guide', path: '/guides?guide=dimorphic-systemic-fungi' },
      { label: 'Fungal identification overview', path: '/guides?guide=fungal-identification-overview' }
    ]
  },
  {
    id: 'histoplasma',
    term: 'Histoplasma',
    aliases: ['histoplasma capsulatum', 'histoplasmosis', 'intracellular yeasts'],
    category: 'Mycology organisms',
    definition: 'A dimorphic fungus associated with pulmonary or disseminated disease, often showing small intracellular yeasts in tissue and supported by antigen, serology, culture, or molecular testing.',
    details: [
      'Yeast forms may be seen within macrophages.',
      'Antigen testing can be useful in disseminated disease and selected pulmonary presentations.',
      'Mold-phase culture growth should be handled with appropriate biosafety precautions.'
    ],
    benchContext: 'Histoplasma interpretation combines geography, host status, tissue morphology, and antigen or culture evidence.',
    studentTip: 'Small intracellular yeasts in macrophages: put Histoplasma on the short list.',
    relatedLinks: [
      { label: 'Dimorphic fungi guide', path: '/guides?guide=dimorphic-systemic-fungi' },
      { label: 'Fungal biomarkers', path: '/search' }
    ]
  },
  {
    id: 'coccidioides',
    term: 'Coccidioides',
    aliases: ['coccidioidomycosis', 'valley fever', 'spherules', 'endospores'],
    category: 'Mycology organisms',
    definition: 'A dimorphic fungal group associated with endemic arid regions, classically showing spherules with endospores in tissue.',
    details: [
      'Tissue spherules are a key morphology clue and are not the same as budding yeast.',
      'Serology is commonly used to support diagnosis and follow disease in compatible settings.',
      'Culture is hazardous and should be handled according to biosafety policy.'
    ],
    benchContext: 'Coccidioides is a high-safety mycology organism: geography and morphology should change how the culture is handled.',
    studentTip: 'Spherules with endospores point toward Coccidioides, not Candida.',
    relatedLinks: [
      { label: 'Dimorphic fungi guide', path: '/guides?guide=dimorphic-systemic-fungi' }
    ]
  },
  {
    id: 'candida',
    term: 'Candida',
    aliases: ['candidiasis', 'candidemia', 'budding yeast', 'pseudohyphae', 'germ tube'],
    category: 'Mycology organisms',
    definition: 'A group of yeasts that may colonize mucosal sites or cause invasive disease, with significance determined by species, source, host status, and susceptibility context.',
    details: [
      'Candida in blood or sterile fluid is clinically significant and should be reported promptly according to policy.',
      'Candida from nonsterile mucosal sites may represent colonization rather than infection.',
      'Germ tube, chromogenic media, MALDI-TOF, biochemical panels, and sequencing can support identification.'
    ],
    benchContext: 'Candida is not one clinical meaning; blood culture Candida and mixed respiratory Candida are very different findings.',
    studentTip: 'Always ask source first before deciding what Candida means.',
    relatedLinks: [
      { label: 'Yeasts guide', path: '/guides?guide=yeasts' }
    ]
  },
  {
    id: 'candida-auris',
    term: 'Candida auris',
    aliases: ['c auris', 'multidrug resistant yeast', 'infection control yeast'],
    category: 'Mycology organisms',
    definition: 'An emerging yeast of infection-control concern that can cause invasive disease and may show multidrug resistance or misidentification in some systems.',
    details: [
      'Accurate identification is important because some routine systems may misidentify it without updated databases.',
      'It can persist in healthcare environments and trigger infection-prevention workflows.',
      'Susceptibility testing and public health notification may be required according to local policy.'
    ],
    benchContext: 'Candida auris is both a microbiology ID issue and an infection-control issue.',
    studentTip: 'If C. auris is possible, think confirm ID, notify, and contain.',
    relatedLinks: [
      { label: 'Yeasts guide', path: '/guides?guide=yeasts' }
    ]
  },
  {
    id: 'cryptococcus',
    term: 'Cryptococcus',
    aliases: ['cryptococcosis', 'cryptococcus neoformans', 'cryptococcus gattii', 'cryptococcal antigen', 'india ink'],
    category: 'Mycology organisms',
    definition: 'An encapsulated yeast associated with meningitis, pulmonary disease, and disseminated infection, especially in immunocompromised hosts.',
    details: [
      'Cryptococcal antigen testing is central for CSF or serum evaluation in compatible disease.',
      'India ink may show encapsulated yeasts in selected CSF specimens but is less sensitive than antigen testing.',
      'Culture, antigen, source, and host status determine clinical interpretation.'
    ],
    benchContext: 'Cryptococcus is the yeast where capsule and antigen testing carry huge diagnostic weight.',
    studentTip: 'CSF plus encapsulated yeast or positive cryptococcal antigen: take it seriously.',
    relatedLinks: [
      { label: 'Yeasts guide', path: '/guides?guide=yeasts' },
      { label: 'Fungal biomarkers', path: '/search' }
    ]
  },
  {
    id: 'antifungal-susceptibility-testing',
    term: 'Antifungal susceptibility testing',
    aliases: ['antifungal ast', 'fungal susceptibility', 'yeast susceptibility', 'mold susceptibility'],
    category: 'Mycology methods',
    definition: 'Laboratory testing that estimates how a fungal isolate responds to selected antifungal agents under standardized conditions.',
    details: [
      'Testing is interpreted with organism identification, source, validated method, drug exposure, and available breakpoints.',
      'Candida bloodstream or sterile-site isolates are common AST candidates.',
      'Mold susceptibility testing is more selective and may require reference-lab methods.'
    ],
    benchContext: 'Antifungal AST is useful only when the organism-drug-method combination can answer a real therapy question.',
    studentTip: 'Never read a fungal MIC without asking: which species, which drug, which source, and is there a breakpoint?',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'antifungal-mic',
    term: 'Antifungal MIC',
    aliases: ['minimum inhibitory concentration', 'fungal mic', 'mic interpretation'],
    category: 'Mycology methods',
    definition: 'The lowest tested antifungal concentration that inhibits visible fungal growth under the conditions of the assay.',
    details: [
      'MIC values are method-dependent and should be interpreted with validated criteria.',
      'A lower MIC is not automatically clinically successful if drug exposure, site, or organism biology is unfavorable.',
      'For some mold-drug pairs, MICs may guide discussion without a full clinical breakpoint.'
    ],
    benchContext: 'The MIC is a measurement; the interpretation is a clinical-laboratory judgment built around breakpoints and context.',
    studentTip: 'MIC is a number, not the whole answer.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'antifungal-breakpoint',
    term: 'Antifungal breakpoint',
    aliases: ['clinical breakpoint', 'susceptible dose dependent', 'sdd', 'resistant breakpoint'],
    category: 'Mycology methods',
    definition: 'An interpretive threshold used to categorize an antifungal MIC or zone result for a defined organism, drug, method, and clinical context.',
    details: [
      'Breakpoints are not universal across all fungi and drugs.',
      'Some organism-drug combinations have no established clinical breakpoint.',
      'Epidemiologic cutoff values are different from clinical breakpoints.'
    ],
    benchContext: 'Breakpoints prevent overinterpreting raw MICs, but only when the breakpoint actually applies.',
    studentTip: 'No applicable breakpoint means be careful with the word susceptible.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'epidemiologic-cutoff-value',
    term: 'Epidemiologic cutoff value',
    aliases: ['ecv', 'ecoFF', 'wild type cutoff', 'non-wild-type'],
    category: 'Mycology methods',
    definition: 'A threshold used to separate wild-type isolates from isolates with acquired or mutational resistance mechanisms, without directly predicting clinical outcome.',
    details: [
      'ECVs can flag non-wild-type organisms when clinical breakpoints are unavailable.',
      'Non-wild-type does not automatically mean clinical resistance in every patient.',
      'ECVs are useful for surveillance and recognizing unusual resistance patterns.'
    ],
    benchContext: 'An ECV answers a population question: does this isolate look wild-type for this drug?',
    studentTip: 'ECV is not the same thing as a treatment breakpoint.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'azole-antifungals',
    term: 'Azole antifungals',
    aliases: ['fluconazole', 'voriconazole', 'posaconazole', 'itraconazole', 'isavuconazole'],
    category: 'Mycology therapy',
    definition: 'Antifungal agents that inhibit ergosterol synthesis and are used across selected yeast, mold, and endemic fungal infections depending on organism and drug.',
    details: [
      'Fluconazole is important for many Candida workflows but has predictable gaps.',
      'Voriconazole, posaconazole, and isavuconazole are used for selected mold-active indications.',
      'Resistance can occur through target changes, efflux, or other mechanisms depending on organism.'
    ],
    benchContext: 'Azole reporting must account for species because fluconazole logic is not the same for every Candida or mold.',
    studentTip: 'Azoles are a family, not one interchangeable drug.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'echinocandins',
    term: 'Echinocandins',
    aliases: ['caspofungin', 'micafungin', 'anidulafungin', 'fks mutation'],
    category: 'Mycology therapy',
    definition: 'Antifungal agents that inhibit beta-1,3-D-glucan synthesis and are important for many invasive Candida infections.',
    details: [
      'They are often used for candidemia and invasive candidiasis depending on species and patient factors.',
      'Candida glabrata can acquire echinocandin resistance, often involving FKS pathway changes.',
      'Echinocandins are not primary active agents for every mold or yeast syndrome.'
    ],
    benchContext: 'Echinocandin interpretation is especially important when Candida species and prior drug exposure raise resistance concern.',
    studentTip: 'For invasive Candida, echinocandins matter; for Mucorales, do not assume coverage.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' },
      { label: 'Candida', path: '/search' }
    ]
  },
  {
    id: 'amphotericin-b',
    term: 'Amphotericin B',
    aliases: ['ampho b', 'polyene antifungal', 'liposomal amphotericin'],
    category: 'Mycology therapy',
    definition: 'A polyene antifungal that binds ergosterol and remains important for selected severe fungal infections, balanced against toxicity and formulation considerations.',
    details: [
      'It is used in selected systemic mycoses, cryptococcal disease combinations, mucormycosis, and other severe infections depending on case.',
      'Some fungi have reduced activity expectations, such as Aspergillus terreus in many contexts.',
      'Susceptibility interpretation depends on organism and method limitations.'
    ],
    benchContext: 'Amphotericin B is broad but not universal; organism ID still matters.',
    studentTip: 'Big-gun antifungal does not mean every fungus is covered.',
    relatedLinks: [
      { label: 'Antifungal susceptibility guide', path: '/guides?guide=antifungal-susceptibility' }
    ]
  },
  {
    id: 'viral-transport-medium',
    term: 'Viral transport medium',
    aliases: ['vtm', 'viral transport', 'universal transport medium', 'utm'],
    category: 'Virology methods',
    definition: 'A collection and transport system designed to preserve viral nucleic acid or viable virus from clinical specimens until testing.',
    details: [
      'The correct swab, container, temperature, and transport time depend on the virus and test method.',
      'Specimens for viral culture require viable virus, while NAAT may tolerate different transport conditions depending on validation.',
      'Poor collection or delayed transport can produce false-negative results even with a good assay.'
    ],
    benchContext: 'In virology, collection quality and timing often decide whether the test can answer the clinical question.',
    studentTip: 'Great PCR cannot rescue the wrong specimen collected too late.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' }
    ]
  },
  {
    id: 'viral-naat',
    term: 'Viral NAAT',
    aliases: ['viral pcr', 'rt-pcr', 'real-time pcr', 'molecular viral testing'],
    category: 'Virology methods',
    definition: 'A molecular test that detects viral nucleic acid from a clinical specimen using amplification-based methods such as PCR or RT-PCR.',
    details: [
      'NAAT can be highly sensitive and rapid for many viruses.',
      'A positive result may represent active disease, shedding, latent virus, or contamination depending on virus and specimen source.',
      'Assay target, specimen type, inhibitors, controls, and timing affect interpretation.'
    ],
    benchContext: 'Viral NAAT is direct detection, but direct detection is not always the same as disease.',
    studentTip: 'Always pair viral PCR with source, symptoms, and timing.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Molecular methods guide', path: '/guides?guide=nucleic-acid-analysis' }
    ]
  },
  {
    id: 'viral-load',
    term: 'Viral load',
    aliases: ['quantitative pcr', 'quantitative viral naat', 'viral copies'],
    category: 'Virology methods',
    definition: 'A quantitative measurement of viral nucleic acid in a defined specimen type, used for monitoring selected chronic, transplant-associated, or treatment-related viral infections.',
    details: [
      'Trends are often more useful than one isolated value.',
      'Specimen type and assay platform should remain consistent when monitoring over time.',
      'Viral load results are central for selected viruses such as HIV, hepatitis viruses, CMV, EBV, and BK virus depending on clinical setting.'
    ],
    benchContext: 'Viral load is a monitoring tool; it should be interpreted as a trend within the same clinical and assay context.',
    studentTip: 'Do not compare viral loads casually across specimen types or assay platforms.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Viruses in human disease guide', path: '/guides?guide=viruses-in-human-disease' }
    ]
  },
  {
    id: 'viral-culture',
    term: 'Viral culture',
    aliases: ['cell culture', 'cytopathic effect', 'cpe', 'shell vial culture'],
    category: 'Virology methods',
    definition: 'A method that attempts to grow viable virus in susceptible cell systems and detect replication through cytopathic effect or specific staining.',
    details: [
      'Culture requires viable virus and appropriate cell lines.',
      'Cytopathic effect can suggest viral groups but often requires confirmation.',
      'Shell vial culture accelerates detection for selected viruses by combining centrifugation and early staining.'
    ],
    benchContext: 'Viral culture is slower than NAAT but can show viable virus and support further characterization in selected workflows.',
    studentTip: 'Culture answers viability better than PCR, but only if the virus survives collection and transport.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' }
    ]
  },
  {
    id: 'viral-serology',
    term: 'Viral serology',
    aliases: ['igm', 'igg', 'paired sera', 'seroconversion', 'avidity'],
    category: 'Virology methods',
    definition: 'Antibody-based testing used to evaluate immunity, timing of infection, prior exposure, congenital risk, or selected acute viral syndromes.',
    details: [
      'IgM may suggest recent infection but can be nonspecific or persist depending on virus.',
      'IgG often indicates past exposure or immunity, but interpretation depends on vaccine status and clinical question.',
      'Paired acute and convalescent sera or avidity testing can help clarify timing in selected workflows.'
    ],
    benchContext: 'Viral serology answers host-response questions, not direct viral detection questions.',
    studentTip: 'Serology is about the immune response; PCR is about the target in the specimen.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Serology guide', path: '/guides?guide=serologic-diagnosis' }
    ]
  },
  {
    id: 'viral-antigen-detection',
    term: 'Viral antigen detection',
    aliases: ['rapid antigen test', 'direct fluorescent antibody', 'dfa', 'immunofluorescence'],
    category: 'Virology methods',
    definition: 'Testing that detects viral proteins in clinical specimens or infected cells, often used when rapid results are useful and assay performance is understood.',
    details: [
      'Antigen tests can be fast but may be less sensitive than NAAT.',
      'Direct fluorescent antibody testing depends on specimen cellularity and staining quality.',
      'A negative antigen result may need NAAT follow-up when suspicion remains high.'
    ],
    benchContext: 'Antigen testing is a speed-versus-sensitivity tradeoff that must be matched to syndrome and specimen quality.',
    studentTip: 'Fast negative does not always mean true negative.',
    relatedLinks: [
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' },
      { label: 'Immunochemical methods guide', path: '/guides?guide=immunochemical-methods' }
    ]
  },
  {
    id: 'viral-latency',
    term: 'Viral latency',
    aliases: ['latent virus', 'reactivation', 'herpesvirus latency'],
    category: 'Virology concepts',
    definition: 'A viral state in which the virus persists in the host with limited or intermittent replication and can reactivate later.',
    details: [
      'Herpesviruses are classic latent viruses.',
      'Detection from a nonrepresentative specimen may not prove active disease at the suspected site.',
      'Immunosuppression can make reactivation clinically significant.'
    ],
    benchContext: 'Latency is why a positive viral test sometimes needs more interpretation than a bacterial culture result.',
    studentTip: 'For herpesviruses, ask: disease site or background reactivation?',
    relatedLinks: [
      { label: 'Viruses in human disease guide', path: '/guides?guide=viruses-in-human-disease' }
    ]
  },
  {
    id: 'respiratory-viral-panel',
    term: 'Respiratory viral panel',
    aliases: ['rvp', 'multiplex respiratory panel', 'respiratory pcr panel'],
    category: 'Virology methods',
    definition: 'A multiplex molecular test that detects multiple respiratory viral targets, and sometimes selected bacterial targets, from respiratory specimens.',
    details: [
      'Panels are efficient for syndromic testing but can detect prolonged shedding or coinfections.',
      'A detected target should be interpreted with symptoms, timing, host status, and specimen type.',
      'Panel content differs by manufacturer and laboratory menu.'
    ],
    benchContext: 'A respiratory panel gives many answers at once; the lab still has to help students interpret which answer matters.',
    studentTip: 'Multiplex does not mean magic. It means many targets with one specimen.',
    relatedLinks: [
      { label: 'Viruses in human disease guide', path: '/guides?guide=viruses-in-human-disease' },
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' }
    ]
  },
  {
    id: 'hepatitis-viral-markers',
    term: 'Hepatitis viral markers',
    aliases: ['hepatitis serology', 'hbv markers', 'hcv viral load', 'hepatitis panel'],
    category: 'Virology methods',
    definition: 'Serologic and molecular markers used to distinguish acute infection, chronic infection, immunity, vaccination, prior exposure, and treatment monitoring for hepatitis viruses.',
    details: [
      'Hepatitis B interpretation often combines surface antigen, surface antibody, core antibody, e antigen, and viral load.',
      'Hepatitis C screening and confirmation commonly involve antibody and RNA testing.',
      'Hepatitis A and E are usually interpreted as acute enterically transmitted infections when compatible markers are present.'
    ],
    benchContext: 'Hepatitis testing is pattern interpretation, not a single yes-or-no result.',
    studentTip: 'For hepatitis, learn the marker pattern before memorizing isolated abbreviations.',
    relatedLinks: [
      { label: 'Viruses in human disease guide', path: '/guides?guide=viruses-in-human-disease' },
      { label: 'Serology guide', path: '/guides?guide=serologic-diagnosis' }
    ]
  },
  {
    id: 'antiviral-resistance-testing',
    term: 'Antiviral resistance testing',
    aliases: ['viral resistance testing', 'antiviral susceptibility', 'viral susceptibility testing'],
    category: 'Virology methods',
    definition: 'Testing used to detect or measure reduced viral susceptibility to antiviral drugs, usually when results can guide treatment or explain therapy failure.',
    details: [
      'Resistance testing is virus- and drug-specific rather than a single universal method.',
      'HIV, hepatitis C, CMV, HSV/VZV, and influenza have different resistance workflows.',
      'The result must be interpreted with viral load, specimen timing, treatment history, and assay limitations.'
    ],
    benchContext: 'Antiviral resistance testing is not routine culture AST; it is usually molecular, reference-based, or tightly tied to a treatment question.',
    studentTip: 'Ask what drug pressure the virus has seen before reading the resistance report.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' },
      { label: 'Virology methods guide', path: '/guides?guide=virology-methods-overview' }
    ]
  },
  {
    id: 'genotypic-viral-resistance',
    term: 'Genotypic viral resistance',
    aliases: ['resistance mutations', 'viral genotyping', 'mutation analysis'],
    category: 'Virology methods',
    definition: 'Resistance interpretation based on viral sequence changes known or suspected to affect antiviral activity.',
    details: [
      'Genotyping is often faster than phenotypic testing and is common in HIV and selected hepatitis or transplant-virus workflows.',
      'Mixed viral populations, low viral load, and archived resistance can complicate interpretation.',
      'Detected mutations must be interpreted against the specific drug and virus.'
    ],
    benchContext: 'Genotyping reads the viral code; the hard part is translating mutations into likely drug activity.',
    studentTip: 'Mutation found does not mean every antiviral fails; map the mutation to the drug class.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' }
    ]
  },
  {
    id: 'phenotypic-viral-resistance',
    term: 'Phenotypic viral resistance',
    aliases: ['phenotypic susceptibility', 'drug inhibition testing', 'viral phenotype'],
    category: 'Virology methods',
    definition: 'Resistance testing that measures viral replication or growth in the presence of antiviral drug concentrations.',
    details: [
      'Phenotypic methods can be slower and less widely available than genotyping.',
      'They may help when genotype interpretation is complex or when novel mutation patterns are present.',
      'Results still require clinical interpretation with drug exposure and disease status.'
    ],
    benchContext: 'Phenotype asks what the virus does around drug, not just what mutations it carries.',
    studentTip: 'Genotype predicts; phenotype measures, but neither replaces clinical context.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' }
    ]
  },
  {
    id: 'hiv-resistance-testing',
    term: 'HIV resistance testing',
    aliases: ['hiv genotype', 'hiv drug resistance', 'integrase resistance', 'reverse transcriptase resistance'],
    category: 'Virology methods',
    definition: 'Genotypic or selected phenotypic testing used to identify HIV mutations that may affect antiretroviral therapy selection.',
    details: [
      'Testing is commonly used at baseline in many workflows and when virologic failure is suspected.',
      'Viral load must usually be high enough for sequencing to succeed.',
      'Resistance interpretation depends on drug class, treatment history, adherence, and prior results.'
    ],
    benchContext: 'HIV resistance reports are treatment maps, not just mutation lists.',
    studentTip: 'For HIV, viral load plus genotype plus treatment history tells the story.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' },
      { label: 'Viral load', path: '/search' }
    ]
  },
  {
    id: 'cmv-resistance-testing',
    term: 'CMV resistance testing',
    aliases: ['cytomegalovirus resistance', 'ganciclovir resistance', 'letermovir resistance'],
    category: 'Virology methods',
    definition: 'Resistance testing used when cytomegalovirus viral load or disease fails to respond as expected during antiviral therapy.',
    details: [
      'Testing often targets mutations associated with resistance to drugs such as ganciclovir, foscarnet, cidofovir, or letermovir depending on context.',
      'It is especially relevant in transplant and other immunocompromised-host settings.',
      'Adequate viral load is usually needed for reliable sequencing.'
    ],
    benchContext: 'CMV resistance is usually suspected because the viral load trend refuses to behave.',
    studentTip: 'In transplant virology, trend the viral load before jumping to resistance.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' },
      { label: 'Viral load', path: '/search' }
    ]
  },
  {
    id: 'antiviral-prophylaxis',
    term: 'Antiviral prophylaxis',
    aliases: ['postexposure prophylaxis', 'pep', 'preemptive therapy', 'viral prevention'],
    category: 'Virology prevention',
    definition: 'Use of antiviral drugs or immune-based strategies to prevent infection or disease after exposure, during high-risk periods, or before symptomatic disease develops.',
    details: [
      'Postexposure prophylaxis may apply to selected exposures such as HIV, rabies, hepatitis B, varicella, influenza, or others depending on risk.',
      'Transplant programs may use prophylaxis or preemptive therapy based on viral load monitoring and risk status.',
      'Vaccination, infection control, and exposure management often work alongside antiviral prophylaxis.'
    ],
    benchContext: 'Prevention decisions often need fast lab results plus exposure history.',
    studentTip: 'Prophylaxis is time-sensitive; the lab result may change urgency.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' },
      { label: 'Viruses in human disease guide', path: '/guides?guide=viruses-in-human-disease' }
    ]
  },
  {
    id: 'antiviral-breakthrough',
    term: 'Breakthrough viral infection',
    aliases: ['breakthrough viremia', 'breakthrough infection', 'therapy failure'],
    category: 'Virology concepts',
    definition: 'Detection of viral replication or disease despite prophylaxis, suppressive therapy, vaccination, or expected immune protection.',
    details: [
      'Breakthrough can reflect resistance, inadequate drug exposure, adherence issues, intense immunosuppression, or a different pathogen than expected.',
      'Viral load trends and resistance testing may be needed depending on the virus.',
      'Infection-control and public health implications depend on the organism and setting.'
    ],
    benchContext: 'Breakthrough infection is a signal to ask why prevention failed, not just to repeat the same result.',
    studentTip: 'Breakthrough equals investigate: drug, host, virus, timing, and specimen.',
    relatedLinks: [
      { label: 'Antiviral therapy guide', path: '/guides?guide=antiviral-therapy-susceptibility' },
      { label: 'Viral load', path: '/search' }
    ]
  },
  {
    id: 'blood-culture-contamination',
    term: 'Blood culture contamination',
    aliases: ['contaminated blood culture', 'single positive bottle', 'skin flora blood culture'],
    category: 'Organ system diagnosis',
    definition: 'Recovery of organisms introduced during collection or processing rather than organisms causing true bloodstream infection.',
    details: [
      'Interpretation depends on organism identity, number of positive sets, time to positivity, collection site, host risk, and devices.',
      'Coagulase-negative staphylococci and other skin-associated organisms can still be true pathogens in device or prosthetic-material infections.',
      'Contamination comments should avoid dismissing clinically meaningful patterns.'
    ],
    benchContext: 'Blood culture significance is a pattern judgment, not a single-organism shortcut.',
    studentTip: 'Ask: how many sets, what organism, what host, and what device?',
    relatedLinks: [
      { label: 'Bloodstream infection guide', path: '/guides?guide=bloodstream-infections' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'time-to-positivity',
    term: 'Time to positivity',
    aliases: ['ttp', 'differential time to positivity', 'blood culture signal time'],
    category: 'Organ system diagnosis',
    definition: 'The interval between blood culture incubation and instrument detection of growth, sometimes used as supporting evidence in bloodstream infection interpretation.',
    details: [
      'Shorter time to positivity can support higher organism burden but is not a standalone diagnosis.',
      'Paired line and peripheral cultures may be compared in selected catheter-related infection workflows.',
      'Bottle type, organism, volume, antibiotics, and instrument factors can affect timing.'
    ],
    benchContext: 'Time to positivity is supporting context, not a substitute for organism ID and clinical correlation.',
    studentTip: 'Useful clue, not a magic rule.',
    relatedLinks: [
      { label: 'Bloodstream infection guide', path: '/guides?guide=bloodstream-infections' }
    ]
  },
  {
    id: 'sputum-quality-screen',
    term: 'Sputum quality screen',
    aliases: ['sputum acceptability', 'sputum gram stain screen', 'poor quality sputum'],
    category: 'Organ system diagnosis',
    definition: 'Microscopic assessment used to decide whether a sputum specimen likely represents lower respiratory material or mostly oral contamination.',
    details: [
      'Squamous epithelial cells suggest oral contamination, while neutrophils support inflammation.',
      'A predominant organism seen on Gram stain is more meaningful than a mixed-flora culture from a poor specimen.',
      'Local policies define acceptance, rejection, and reporting comments.'
    ],
    benchContext: 'Before asking what grew, ask whether the specimen was worth culturing.',
    studentTip: 'Bad sputum can turn pneumonia workup into mouth-flora workup.',
    relatedLinks: [
      { label: 'Lower respiratory guide', path: '/guides?guide=lower-respiratory-infections' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'bronchoalveolar-lavage',
    term: 'Bronchoalveolar lavage',
    aliases: ['bal', 'bronchoscopy specimen', 'lower respiratory lavage'],
    category: 'Organ system diagnosis',
    definition: 'Lower respiratory specimen collected during bronchoscopy to evaluate pneumonia, opportunistic infection, hemorrhage, or other pulmonary disease.',
    details: [
      'BAL can be used for bacterial culture, fungal culture, AFB studies, viral testing, cytology, or molecular panels depending on the question.',
      'Colonization can still occur, especially in ventilated or chronically colonized patients.',
      'Quantitative or semiquantitative culture interpretation depends on local validation.'
    ],
    benchContext: 'BAL is better than expectorated sputum for many lower airway questions, but it still needs clinical context.',
    studentTip: 'Better source, not automatic proof of infection.',
    relatedLinks: [
      { label: 'Lower respiratory guide', path: '/guides?guide=lower-respiratory-infections' }
    ]
  },
  {
    id: 'csf-gram-stain',
    term: 'CSF Gram stain',
    aliases: ['cerebrospinal fluid gram stain', 'meningitis gram stain'],
    category: 'Organ system diagnosis',
    definition: 'Urgent microscopic examination of cerebrospinal fluid used to look for bacteria or yeast in suspected CNS infection.',
    details: [
      'A positive CSF Gram stain is a critical result in many laboratories.',
      'Sensitivity depends on organism burden, specimen volume, prior antibiotics, and technical factors.',
      'A negative result does not exclude meningitis.'
    ],
    benchContext: 'CSF Gram stain is an urgent first look, not the entire CNS workup.',
    studentTip: 'Negative does not rule out; positive gets called fast.',
    relatedLinks: [
      { label: 'CNS infection guide', path: '/guides?guide=cns-infections' }
    ]
  },
  {
    id: 'urine-colony-count',
    term: 'Urine colony count',
    aliases: ['urine cfu', 'quantitative urine culture', 'urine culture threshold'],
    category: 'Organ system diagnosis',
    definition: 'Estimate of organism quantity in urine culture used with specimen type, symptoms, and organism count to interpret possible urinary tract infection.',
    details: [
      'Thresholds differ by collection method and clinical setting.',
      'Multiple organisms from a voided specimen often suggest contamination, but complex urinary sources require more context.',
      'Colony count should not be interpreted without symptoms, pyuria, host factors, and source quality.'
    ],
    benchContext: 'A number without source and symptoms is not a diagnosis.',
    studentTip: 'Colony count answers burden, not infection by itself.',
    relatedLinks: [
      { label: 'Urinary tract guide', path: '/guides?guide=urinary-tract-infections' }
    ]
  },
  {
    id: 'first-catch-urine',
    term: 'First-catch urine',
    aliases: ['first void urine', 'urine for sti naat', 'initial stream urine'],
    category: 'Organ system diagnosis',
    definition: 'Initial urine stream specimen used for selected sexually transmitted infection NAAT workflows, different from midstream urine used for routine urine culture.',
    details: [
      'First-catch urine collects urethral material and is commonly used for Chlamydia and gonorrhea NAAT in validated workflows.',
      'It should not be confused with clean-catch midstream urine.',
      'Assay instructions define volume, transport, stability, and acceptable patient groups.'
    ],
    benchContext: 'First-catch urine is an STI specimen, not a routine UTI specimen.',
    studentTip: 'First stream for STI NAAT; midstream for routine urine culture.',
    relatedLinks: [
      { label: 'Genital tract guide', path: '/guides?guide=genital-tract-infections' },
      { label: 'Urinary tract guide', path: '/guides?guide=urinary-tract-infections' }
    ]
  },
  {
    id: 'genital-naat',
    term: 'Genital NAAT',
    aliases: ['sti naat', 'chlamydia gonorrhea naat', 'molecular sti testing'],
    category: 'Organ system diagnosis',
    definition: 'Molecular testing for sexually transmitted infection targets from validated genital, urine, rectal, pharyngeal, or lesion specimens.',
    details: [
      'NAAT is central for organisms such as Chlamydia trachomatis and Neisseria gonorrhoeae in many workflows.',
      'Specimen type and anatomic site must be validated for the assay.',
      'Culture remains important for gonorrhea susceptibility, treatment failure, and some public health investigations.'
    ],
    benchContext: 'The assay may be excellent, but only for the sites and specimen types it was validated to test.',
    studentTip: 'Right target, right site, right swab.',
    relatedLinks: [
      { label: 'Genital tract guide', path: '/guides?guide=genital-tract-infections' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'stool-culture',
    term: 'Stool culture',
    aliases: ['enteric culture', 'routine stool culture', 'bacterial stool culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture-based workup for selected bacterial causes of gastroenteritis, used to recover organisms for identification, susceptibility, serotyping, or public health follow-up.',
    details: [
      'Traditional stool culture usually targets a defined bacterial set rather than every possible GI pathogen.',
      'Culture recovery can matter after a molecular positive when public health or susceptibility testing needs an isolate.',
      'Specimen timing, transport medium, and stool quality affect recovery.'
    ],
    benchContext: 'Stool culture is not the same thing as a full GI panel.',
    studentTip: 'Ask what organism group the culture is actually designed to recover.',
    relatedLinks: [
      { label: 'GI tract guide', path: '/guides?guide=gastrointestinal-tract-infections' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'multiplex-gi-panel',
    term: 'Multiplex GI panel',
    aliases: ['gastrointestinal panel', 'gi naat panel', 'stool pcr panel'],
    category: 'Organ system diagnosis',
    definition: 'Molecular panel that detects multiple bacterial, viral, and/or parasitic gastrointestinal targets from stool or validated rectal specimens.',
    details: [
      'Panels can detect organisms faster than traditional culture but may not provide an isolate.',
      'Positive results can represent active infection, prolonged shedding, coinfection, or colonization depending on the target.',
      'Some positive targets still require culture, public health routing, or infection prevention action.'
    ],
    benchContext: 'A GI panel gives many answers quickly; the hard part is deciding which answer fits.',
    studentTip: 'Fast result, still needs syndrome context.',
    relatedLinks: [
      { label: 'GI tract guide', path: '/guides?guide=gastrointestinal-tract-infections' }
    ]
  },
  {
    id: 'c-difficile-testing',
    term: 'C. difficile testing',
    aliases: ['clostridioides difficile test', 'c diff toxin', 'c difficile pcr', 'gdh toxin algorithm'],
    category: 'Organ system diagnosis',
    definition: 'Testing strategy for suspected Clostridioides difficile infection, often using toxin detection, antigen screening, NAAT, or an algorithm.',
    details: [
      'Testing is intended for compatible diarrheal illness, not formed stool or routine cure checks.',
      'NAAT detects toxin gene presence and may be positive in colonization.',
      'Toxin testing is more directly linked to toxin detection but can be less sensitive depending on method.'
    ],
    benchContext: 'C. difficile interpretation is a clinical-plus-lab algorithm, not a single button.',
    studentTip: 'Diarrhea first, then choose the test algorithm.',
    relatedLinks: [
      { label: 'GI tract guide', path: '/guides?guide=gastrointestinal-tract-infections' }
    ]
  },
  {
    id: 'shiga-toxin-testing',
    term: 'Shiga toxin testing',
    aliases: ['stec testing', 'ehec testing', 'shiga toxin e coli', 'stx testing'],
    category: 'Organ system diagnosis',
    definition: 'Testing used to detect Shiga toxin or Shiga toxin genes in suspected enterohemorrhagic E. coli or related diarrheal illness.',
    details: [
      'Bloody diarrhea, outbreak exposure, and hemolytic uremic syndrome concern are common triggers.',
      'Positive findings may require public health notification and isolate recovery.',
      'Antibiotic and antimotility assumptions should be handled carefully in suspected Shiga toxin-producing infection.'
    ],
    benchContext: 'Shiga toxin is a result with clinical and public health weight.',
    studentTip: 'Bloody diarrhea plus Shiga toxin concern deserves careful routing.',
    relatedLinks: [
      { label: 'GI tract guide', path: '/guides?guide=gastrointestinal-tract-infections' }
    ]
  },
  {
    id: 'wound-culture',
    term: 'Wound culture',
    aliases: ['skin culture', 'soft tissue culture', 'abscess culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture of material from a skin, soft tissue, abscess, or wound source, interpreted according to specimen depth, source quality, Gram stain, and clinical syndrome.',
    details: [
      'Aspirate, tissue, or deep operative material is usually more meaningful than a superficial swab.',
      'Chronic wounds and ulcers commonly grow mixed colonizing flora.',
      'Anaerobic culture requires appropriate collection and transport.'
    ],
    benchContext: 'Wound culture is only as good as the depth of the specimen.',
    studentTip: 'Deep tissue tells a better story than surface drainage.',
    relatedLinks: [
      { label: 'Skin and wound guide', path: '/guides?guide=skin-soft-tissue-wound-infections' },
      { label: 'Syndrome diagnostic path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'necrotizing-soft-tissue-infection',
    term: 'Necrotizing soft tissue infection',
    aliases: ['necrotizing fasciitis', 'gas gangrene', 'clostridial myonecrosis'],
    category: 'Organ system diagnosis',
    definition: 'Rapidly progressive deep soft tissue infection where urgent clinical communication, deep specimens, Gram stain, and aerobic/anaerobic culture are important.',
    details: [
      'Deep tissue or operative specimens are preferred over superficial swabs.',
      'Findings may include mixed organisms, group A Streptococcus, clostridia, anaerobes, Gram-negative rods, or other patterns depending on syndrome.',
      'Toxin-mediated or gas-forming infection concern should be escalated promptly.'
    ],
    benchContext: 'This is a call-now pattern, not a routine wound culture footnote.',
    studentTip: 'Rapid progression plus deep infection equals urgent communication.',
    relatedLinks: [
      { label: 'Skin and wound guide', path: '/guides?guide=skin-soft-tissue-wound-infections' }
    ]
  },
  {
    id: 'sterile-body-fluid-culture',
    term: 'Sterile body fluid culture',
    aliases: ['sterile fluid culture', 'pleural fluid culture', 'peritoneal fluid culture', 'pericardial fluid culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture of fluid from a normally sterile body site, interpreted with exact source, volume, direct exam, collection method, and clinical context.',
    details: [
      'Larger volume and rapid processing can improve organism recovery.',
      'Some fluids may be concentrated or inoculated into blood culture bottles when validated.',
      'Drain or device-associated fluids may not carry the same meaning as freshly collected sterile-site fluid.'
    ],
    benchContext: 'Source wording matters: pleural fluid and drain fluid are not the same interpretive problem.',
    studentTip: 'Exact source first, organism second.',
    relatedLinks: [
      { label: 'Sterile fluids and tissue guide', path: '/guides?guide=sterile-fluids-bone-tissue-infections' }
    ]
  },
  {
    id: 'synovial-fluid-culture',
    term: 'Synovial fluid culture',
    aliases: ['joint fluid culture', 'septic arthritis culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture of joint fluid used to evaluate septic arthritis or prosthetic joint infection along with Gram stain, cell count, crystals, and clinical findings.',
    details: [
      'Gram stain can be urgent but may be negative in true infection.',
      'Culture interpretation changes with native joint versus prosthetic joint context.',
      'Crystals do not fully exclude infection when the clinical picture remains concerning.'
    ],
    benchContext: 'Joint fluid culture lives beside cell count and crystals, not apart from them.',
    studentTip: 'Crystals can distract; keep infection in the differential when it fits.',
    relatedLinks: [
      { label: 'Sterile fluids and tissue guide', path: '/guides?guide=sterile-fluids-bone-tissue-infections' }
    ]
  },
  {
    id: 'bone-culture',
    term: 'Bone culture',
    aliases: ['osteomyelitis culture', 'bone biopsy culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture of bone or bone biopsy material used to evaluate osteomyelitis, especially when superficial wound cultures may not represent the infected bone.',
    details: [
      'Bone specimens are more meaningful than surface swabs for suspected osteomyelitis.',
      'Prior antibiotics can reduce recovery and should be noted when available.',
      'Aerobic, anaerobic, fungal, AFB, or molecular testing may be considered based on exposure and host risk.'
    ],
    benchContext: 'Do not let a superficial ulcer swab pretend to be bone culture.',
    studentTip: 'If the question is bone, the best specimen is bone.',
    relatedLinks: [
      { label: 'Sterile fluids and tissue guide', path: '/guides?guide=sterile-fluids-bone-tissue-infections' },
      { label: 'Skin and wound guide', path: '/guides?guide=skin-soft-tissue-wound-infections' }
    ]
  },
  {
    id: 'bone-marrow-culture',
    term: 'Bone marrow culture',
    aliases: ['marrow culture', 'bone marrow aspirate culture'],
    category: 'Organ system diagnosis',
    definition: 'Culture of bone marrow aspirate used for selected systemic or disseminated infections, especially when blood or routine specimens are not sufficient.',
    details: [
      'Potential uses include selected mycobacterial, fungal, Brucella, Leishmania, or disseminated opportunistic infection questions.',
      'Culture setup should match the suspected organism group and safety requirements.',
      'Histopathology, stains, serology, or molecular tests may be needed alongside culture.'
    ],
    benchContext: 'Marrow culture is a targeted systemic-infection tool, not a routine add-on.',
    studentTip: 'Think disseminated disease and special culture needs.',
    relatedLinks: [
      { label: 'Sterile fluids and tissue guide', path: '/guides?guide=sterile-fluids-bone-tissue-infections' }
    ]
  },
  {
    id: 'quality-management-system',
    term: 'Quality management system',
    aliases: ['qms', 'quality system', 'laboratory quality system'],
    category: 'Laboratory management',
    definition: 'Organized set of policies, procedures, monitoring tools, corrective actions, and improvement processes used to keep laboratory testing reliable.',
    details: [
      'A microbiology quality system spans specimen collection, testing, reporting, staff training, equipment, safety, and documentation.',
      'Quality indicators can include specimen rejection, contamination rates, turnaround time, corrected reports, QC failures, and proficiency performance.',
      'The goal is reliable patient care, not paperwork for its own sake.'
    ],
    benchContext: 'Quality is the system around the result, not a binder sitting beside the bench.',
    studentTip: 'Think preanalytic, analytic, and postanalytic every time.',
    relatedLinks: [
      { label: 'Quality guide', path: '/guides?guide=quality-clinical-microbiology-lab' }
    ]
  },
  {
    id: 'method-verification',
    term: 'Method verification',
    aliases: ['test verification', 'method validation', 'assay verification'],
    category: 'Laboratory management',
    definition: 'Local evidence that a test, instrument, medium, or workflow performs acceptably in the laboratory before or after implementation.',
    details: [
      'Verification may evaluate accuracy, precision, reportable range, expected reactions, reproducibility, or comparison with an established method depending on test type.',
      'New lots, new instruments, changed procedures, or new assays may require defined checks before patient reporting.',
      'Verification records support confidence that the local workflow matches intended performance.'
    ],
    benchContext: 'A method is not ready just because it exists; the local lab has to show it works there.',
    studentTip: 'Before patient results, prove the method behaves.',
    relatedLinks: [
      { label: 'Quality guide', path: '/guides?guide=quality-clinical-microbiology-lab' }
    ]
  },
  {
    id: 'proficiency-testing',
    term: 'Proficiency testing',
    aliases: ['pt samples', 'external proficiency testing', 'unknown challenge'],
    category: 'Laboratory management',
    definition: 'External or blinded challenge testing used to evaluate whether the laboratory can produce acceptable results for defined organisms, methods, or interpretations.',
    details: [
      'PT should be handled like patient testing according to policy.',
      'Failures or unexpected performance require investigation and corrective action.',
      'PT evaluates the total process, including setup, interpretation, reporting, and documentation.'
    ],
    benchContext: 'Proficiency testing asks whether the whole lab process works under challenge conditions.',
    studentTip: 'PT is not just an exam; it is a process check.',
    relatedLinks: [
      { label: 'Quality guide', path: '/guides?guide=quality-clinical-microbiology-lab' }
    ]
  },
  {
    id: 'corrective-action',
    term: 'Corrective action',
    aliases: ['root cause analysis', 'quality improvement action', 'corrective preventive action'],
    category: 'Laboratory management',
    definition: 'Documented response to a problem that identifies cause, fixes the immediate issue, and reduces the chance that the same error recurs.',
    details: [
      'Corrective action may follow QC failure, proficiency failure, specimen error, instrument problem, report correction, or safety event.',
      'Root cause analysis looks beyond the individual event to the process that allowed it.',
      'Effective corrective action includes follow-up to confirm the fix worked.'
    ],
    benchContext: 'Corrective action should improve the system, not just explain one mistake.',
    studentTip: 'Fix the cause, not only the symptom.',
    relatedLinks: [
      { label: 'Quality guide', path: '/guides?guide=quality-clinical-microbiology-lab' }
    ]
  },
  {
    id: 'competency-assessment',
    term: 'Competency assessment',
    aliases: ['staff competency', 'annual competency', 'bench competency'],
    category: 'Laboratory management',
    definition: 'Evaluation that staff can perform and interpret assigned laboratory tasks safely, accurately, and according to procedure.',
    details: [
      'Competency may include direct observation, result review, blind samples, QC review, problem-solving, and procedure knowledge.',
      'It should test real bench judgment, not only whether a form was signed.',
      'New methods, corrected errors, or changed responsibilities may require focused retraining.'
    ],
    benchContext: 'Competency is about trustworthy practice at the bench.',
    studentTip: 'Can the person do the task correctly when it matters?',
    relatedLinks: [
      { label: 'Quality guide', path: '/guides?guide=quality-clinical-microbiology-lab' }
    ]
  },
  {
    id: 'standard-precautions',
    term: 'Standard precautions',
    aliases: ['universal precautions', 'basic infection control precautions'],
    category: 'Infection control',
    definition: 'Baseline infection-prevention practices applied to patient care and laboratory work to reduce exposure to blood, body fluids, mucous membranes, nonintact skin, and contaminated materials.',
    details: [
      'Core practices include hand hygiene, PPE, sharps safety, respiratory hygiene, environmental cleaning, and safe handling of contaminated materials.',
      'Transmission-based precautions add contact, droplet, or airborne measures when indicated.',
      'Standard precautions protect both patients and healthcare workers.'
    ],
    benchContext: 'Standard precautions are the floor, not the ceiling, of infection prevention.',
    studentTip: 'Assume exposure risk before the organism is known.',
    relatedLinks: [
      { label: 'Infection control guide', path: '/guides?guide=infection-control-laboratory-role' }
    ]
  },
  {
    id: 'mdro-surveillance',
    term: 'MDRO surveillance',
    aliases: ['multidrug resistant organism surveillance', 'mdro screen', 'infection control screen'],
    category: 'Infection control',
    definition: 'Testing or monitoring used to detect colonization, infection, or transmission patterns involving multidrug-resistant organisms.',
    details: [
      'Surveillance may target organisms such as MRSA, VRE, carbapenemase-producing organisms, Candida auris, or other locally important threats.',
      'Results often support isolation, cohorting, cleaning, outbreak investigation, and public health reporting.',
      'Screening positivity usually means colonization unless clinical infection is also present.'
    ],
    benchContext: 'MDRO surveillance is a prevention tool, not automatically an infection diagnosis.',
    studentTip: 'Screening result equals transmission risk context.',
    relatedLinks: [
      { label: 'Infection control guide', path: '/guides?guide=infection-control-laboratory-role' }
    ]
  },
  {
    id: 'antibiogram',
    term: 'Antibiogram',
    aliases: ['cumulative susceptibility report', 'annual antibiogram', 'susceptibility summary'],
    category: 'Infection control',
    definition: 'Summary of antimicrobial susceptibility patterns for selected organisms in a facility, service, unit, or population over a defined period.',
    details: [
      'Antibiograms support empiric therapy decisions, stewardship, resistance tracking, and infection prevention planning.',
      'They should use defined inclusion rules so duplicate isolates and skewed populations do not mislead interpretation.',
      'Unit-specific or syndrome-specific summaries may be more useful than a single hospital-wide number in some settings.'
    ],
    benchContext: 'An antibiogram turns many susceptibility reports into population-level guidance.',
    studentTip: 'It is a map for empiric choices, not a guarantee for one isolate.',
    relatedLinks: [
      { label: 'Infection control guide', path: '/guides?guide=infection-control-laboratory-role' },
      { label: 'AST methods guide', path: '/guides?guide=antimicrobial-susceptibility-testing' }
    ]
  },
  {
    id: 'sentinel-laboratory',
    term: 'Sentinel laboratory',
    aliases: ['sentinel lab', 'sentinel response', 'rule out refer laboratory'],
    category: 'Laboratory safety',
    definition: 'Frontline clinical laboratory role focused on recognizing possible high-consequence pathogens, performing only authorized rule-out steps, and referring unresolved concerns through defined public health pathways.',
    details: [
      'The goal is to protect staff, preserve evidence, and route suspicious material correctly.',
      'Routine open-bench identification may be inappropriate when a high-risk organism pattern is recognized.',
      'Notification, secure storage, exposure review, and reference-lab coordination are core parts of the workflow.'
    ],
    benchContext: 'Sentinel work is safety triage, not heroic bench identification.',
    studentTip: 'Recognize, stop, secure, notify, refer.',
    relatedLinks: [
      { label: 'Sentinel response guide', path: '/guides?guide=sentinel-laboratory-response' },
      { label: 'Do not routine culture', path: '/do-not-routine-culture' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'select-agent-concern',
    term: 'Select agent concern',
    aliases: ['biothreat organism', 'high consequence pathogen', 'bioterrorism agent concern'],
    category: 'Laboratory safety',
    definition: 'Situation where organism features, exposure history, syndrome, or public health context raise concern for an agent requiring special biosafety, notification, or reference-lab handling.',
    details: [
      'Examples of concern may include suspicious Bacillus anthracis, Brucella, Francisella, Yersinia pestis, Burkholderia mallei or pseudomallei, Coxiella, or similar high-risk patterns.',
      'The correct response is policy-driven escalation, not extra routine manipulation.',
      'Exposure assessment and documentation matter if staff handled material before concern was recognized.'
    ],
    benchContext: 'A select-agent concern changes the question from “what is it?” to “how do we handle this safely?”',
    studentTip: 'Dangerous possibility first, final ID later.',
    relatedLinks: [
      { label: 'Sentinel response guide', path: '/guides?guide=sentinel-laboratory-response' },
      { label: 'Laboratory safety guide', path: '/guides?guide=laboratory-safety-basics' }
    ]
  }
];
