import type { LearnTopic } from './learnTopics';

type StarterTopicInput = {
  slug: string;
  title: string;
  category: LearnTopic['category'];
  summary: string;
  anchors: string[];
  keywords: string[];
  relatedLinks?: LearnTopic['relatedLinks'];
};

const makeStarterTopic = ({
  slug,
  title,
  category,
  summary,
  anchors,
  keywords,
  relatedLinks = []
}: StarterTopicInput): LearnTopic => ({
  slug,
  title,
  category,
  summary,
  whyItMatters: `${title} gives students a place to organize the topic before memorizing organism lists, test names, or isolated exam facts.`,
  principle: `Learn this topic by asking what the specimen, method, organism group, and clinical setting are trying to prove. Build the topic around practical study anchors and bench reasoning.`,
  basicSteps: [
    `Define the main question for ${title.toLowerCase()}.`,
    'Separate screening clues from confirmatory information.',
    'Connect the topic to specimen quality, method limits, and clinical context.',
    'Use tables to compare similar organisms, methods, or syndromes.',
    'Circle back to tools or deep guides only after the core concept is clear.'
  ],
  interpretation: anchors,
  commonMistakes: [
    'Memorizing names without knowing the organizing branch.',
    'Forgetting specimen source and patient context.',
    'Treating a screening clue as a final answer.'
  ],
  studentShortcut: `For ${title.toLowerCase()}, learn the organizer first, then add exceptions.`,
  relatedLinks,
  tables: [
    {
      title: 'Study Organizer',
      columns: ['Anchor', 'What to learn first', 'Why it matters'],
      rows: anchors.map((anchor) => [
        anchor.split(':')[0],
        anchor.includes(':') ? anchor.split(':').slice(1).join(':').trim() : anchor,
        'Use this as a branch point for review, tables, and practice questions.'
      ])
    }
  ],
  keywords
});

const baseExpandedLearnTopics: LearnTopic[] = [
  makeStarterTopic({
    slug: 'normal-flora-colonization-infection',
    title: 'Normal Flora, Colonization, and Infection',
    category: 'Foundations',
    summary: 'A study page for separating expected flora, colonization, contamination, and true infection by body site and host context.',
    anchors: [
      'Normal flora: expected organisms at a nonsterile site',
      'Colonization: organism present without tissue invasion',
      'Contamination: organism introduced during collection or processing',
      'Infection: organism plus host damage, inflammation, or compatible syndrome'
    ],
    keywords: ['normal flora', 'colonization', 'infection', 'contamination', 'host context']
  }),
  makeStarterTopic({
    slug: 'quality-control-reporting-basics',
    title: 'Quality Control and Reporting Basics',
    category: 'Clinical Lab Principles',
    summary: 'A practical overview of QC, verification, critical values, corrected reports, and why microbiology reports require controlled language.',
    anchors: [
      'QC: proves reagents, media, instruments, or methods are behaving as expected',
      'Verification: confirms a method performs acceptably in the local lab',
      'Critical result: requires timely communication by policy',
      'Corrected report: changes a released result and needs documentation'
    ],
    keywords: ['quality control', 'qc', 'reporting', 'critical result', 'corrected report', 'verification']
  }),
  {
    slug: 'urine-culture-basics',
    title: 'Urine Culture Basics',
    category: 'Clinical Lab Principles',
    summary: 'A bench-focused guide to urine specimen types, colony count thinking, common uropathogens, mixed growth, and when culture results need clinical context.',
    whyItMatters: 'Urine cultures are common, but they are easy to overread. Students need to separate specimen quality, colony count, organism type, symptoms, and host risk before calling a result meaningful.',
    principle: 'Urine culture interpretation depends on collection method, organism burden, organism mix, patient symptoms, and whether the patient has special risks such as pregnancy, catheterization, or invasive urologic disease.',
    basicSteps: [
      'Identify the specimen type: clean-catch, catheterized, straight catheter, suprapubic aspirate, nephrostomy, or other urologic source.',
      'Check whether growth is predominant, mixed, low-count, or consistent with contamination.',
      'Separate usual uropathogens from organisms that often need stronger context.',
      'Use colony count as a clue, not a standalone diagnosis.',
      'Link final reporting and susceptibility testing to lab policy, patient group, source, and clinical significance.'
    ],
    interpretation: [
      'A predominant Enterobacterales isolate from a well-collected symptomatic urine specimen is easier to interpret than mixed low-count growth from a clean-catch specimen.',
      'Catheter and urologic sources can change colony count expectations and organism significance.',
      'Skin, genital, and mixed flora patterns often point back to collection quality unless the source or host context argues otherwise.',
      'Asymptomatic bacteriuria is not the same question as symptomatic UTI.'
    ],
    commonMistakes: [
      'Treating every positive urine culture as infection.',
      'Ignoring collection method when reading colony counts.',
      'Overworking mixed flora without a clear predominant pathogen or special clinical reason.',
      'Forgetting that pregnancy and invasive urologic procedures can change the clinical question.'
    ],
    studentShortcut: 'For urine, ask: how was it collected, how much grew, what grew together, and does the patient fit UTI?',
    relatedLinks: [
      { label: 'Specimen Quality', path: '/learn/specimen-quality' },
      { label: 'Specimen Collection and Transport', path: '/learn/specimen-collection-transport' },
      { label: 'Enterobacterales', path: '/learn/enterobacterales' }
    ],
    tables: [
      {
        title: 'Urine Culture Reading Anchors',
        columns: ['Question', 'What students should notice', 'Why it matters'],
        rows: [
          ['Collection method', 'Clean-catch, catheterized, straight catheter, suprapubic, nephrostomy, or other source', 'Contamination risk and colony count meaning change by source'],
          ['Growth amount', 'High count, low count, mixed count, or no significant growth by lab rules', 'Count supports interpretation but does not replace symptoms and source'],
          ['Organism mix', 'Single predominant organism versus multiple colony types', 'Mixed growth often reflects collection contamination, especially in voided specimens'],
          ['Organism identity', 'E. coli and other Enterobacterales, Enterococcus, Staphylococcus saprophyticus, yeast, or unusual organisms', 'Some organisms are classic uropathogens; others need context'],
          ['Patient group', 'Pregnancy, catheter, child, older adult, immunocompromised host, or urologic procedure', 'Clinical significance and reporting rules may differ']
        ]
      },
      {
        title: 'Common Urine Organism Patterns',
        columns: ['Pattern', 'Organisms to think about', 'Student interpretation'],
        rows: [
          ['Uncomplicated cystitis pattern', 'E. coli most often; also Staphylococcus saprophyticus in the right demographic', 'Predominant growth plus symptoms makes the result easier to use'],
          ['Healthcare or catheter-associated pattern', 'Enterobacterales, Pseudomonas, Enterococcus, yeast, and mixed flora', 'Device history and repeated cultures matter; colonization is common'],
          ['Stone or alkaline urine clue', 'Proteus, Morganella, Providencia, and other urease-positive organisms', 'Urease concept helps connect organism, pH, and stone risk'],
          ['Yeast in urine', 'Candida spp. and other yeasts', 'May be colonization, contamination, catheter-associated, or disease depending on host and source'],
          ['Low-count or unusual isolate', 'Any organism in a low amount or unexpected context', 'Do not overcall without symptoms, source quality, or special host factors']
        ]
      }
    ],
    keywords: ['urine culture', 'urinary tract infection', 'uti', 'colony count', 'uropathogens', 'mixed flora', 'catheter urine', 'ASCP microbiology']
  },
  {
    slug: 'blood-cultures-and-sterile-fluids',
    title: 'Blood Cultures and Sterile Body Fluids',
    category: 'Clinical Lab Principles',
    summary: 'A practical study page for interpreting positive blood cultures and sterile body fluid cultures by source, collection pattern, Gram stain, contamination risk, and urgency.',
    whyItMatters: 'Sterile-site cultures can change patient care quickly. Students need a disciplined way to separate urgent true pathogens from possible contaminants without dismissing important isolates.',
    principle: 'Blood and sterile fluid culture interpretation combines Gram stain urgency, number of positive sets, time-to-positivity pattern, organism identity, source, host risk, and whether the result matches the syndrome.',
    basicSteps: [
      'Confirm the source: blood culture set, CSF, pleural fluid, peritoneal fluid, synovial fluid, pericardial fluid, tissue, or aspirate.',
      'Read the direct stain or bottle Gram stain as an urgent branch clue.',
      'Compare how many sets, bottles, or specimens are positive when that information is available.',
      'Judge organism identity against contamination risk and patient context.',
      'Escalate critical organisms, sterile-site positives, and safety-sensitive findings by local policy.'
    ],
    interpretation: [
      'Gram-negative rods, yeasts, anaerobes, S. aureus, S. pneumoniae, beta-hemolytic streptococci, and many sterile-fluid isolates usually deserve rapid attention.',
      'Coagulase-negative staphylococci, Corynebacterium-like rods, Bacillus-like rods, Cutibacterium, and related skin organisms may be contaminants, but devices, repeat recovery, and sterile source can make them real.',
      'CSF, synovial fluid, and other normally sterile sites have a lower tolerance for casual dismissal than superficial specimens.',
      'A critical Gram stain result is a communication event, not just an identification clue.'
    ],
    commonMistakes: [
      'Calling a likely skin organism a contaminant before checking number of positive cultures and device history.',
      'Ignoring the difference between one bottle positive and multiple sets positive.',
      'Waiting for final ID before recognizing a dangerous preliminary Gram stain.',
      'Using superficial wound culture logic for sterile fluids.'
    ],
    studentShortcut: 'For sterile sites, ask: how urgent is the Gram stain, how many cultures are positive, and is this organism ever safe to ignore here?',
    relatedLinks: [
      { label: 'Laboratory Safety', path: '/learn/laboratory-safety' },
      { label: 'Gram Stain', path: '/learn/gram-stain' },
      { label: 'Host-Microorganism Interactions', path: '/learn/host-microorganism-interactions' }
    ],
    tables: [
      {
        title: 'Sterile-Site Significance Ladder',
        columns: ['Signal', 'Raises concern', 'Needs caution'],
        rows: [
          ['Specimen source', 'CSF, blood, synovial, pleural, peritoneal, pericardial fluid, deep tissue, aspirate', 'Collection through skin can introduce flora, especially if only one culture is positive'],
          ['Organism identity', 'S. aureus, beta-hemolytic streptococci, pneumococcus, Gram-negative rods, anaerobes, yeasts, meningitis agents', 'Skin flora-like organisms require pattern and host review'],
          ['Culture pattern', 'Multiple sets or bottles positive, repeat recovery, pure growth from sterile fluid', 'Single-bottle or delayed low-level growth may suggest contamination for some organisms'],
          ['Host context', 'Central line, prosthetic valve, hardware, immunocompromised host, neonate, severe sepsis', 'Low-virulence organisms can matter when devices or host risk are present'],
          ['Direct exam', 'Organisms seen with inflammatory cells or compatible syndrome', 'Negative direct exam does not rule out culture-positive disease']
        ]
      },
      {
        title: 'Blood Culture Contaminant Versus Pathogen Thinking',
        columns: ['Organism pattern', 'Often urgent or significant', 'Pattern check'],
        rows: [
          ['Gram-positive cocci in clusters', 'S. aureus is significant until proven otherwise', 'CoNS significance rises with multiple positives, hardware, lines, or matching syndrome'],
          ['Gram-positive rods', 'Listeria, Clostridium, Bacillus anthracis concern, and sterile-site C. jeikeium-like contexts can matter', 'Many diphtheroid-like or Bacillus-like isolates need repeat/source review before dismissal'],
          ['Gram-negative rods', 'Enterobacterales, Pseudomonas, anaerobic rods, and fastidious rods are usually clinically important in blood', 'Species, source, resistance, and safety workflow guide the next step'],
          ['Yeast', 'Candida and other yeasts in blood are generally significant', 'Do not treat yeast in blood like colonization'],
          ['Anaerobes', 'Bacteroides group, Clostridium, Fusobacterium, anaerobic cocci', 'Think intra-abdominal, oral, pelvic, soft tissue, or necrotic-source clues']
        ]
      },
      {
        title: 'Sterile Fluid Bench Priorities',
        columns: ['Fluid/source', 'Direct exam priority', 'Culture/reporting focus'],
        rows: [
          ['CSF', 'Cell count context and Gram stain urgency', 'Rapid communication, meningitis pathogens, prior antibiotics, antigen/NAAT when indicated'],
          ['Synovial fluid', 'Inflammation, crystals by separate workflow, Gram stain if requested/available', 'S. aureus, streptococci, gonococcus context, Gram-negative rods in selected hosts'],
          ['Pleural or peritoneal fluid', 'Inflammatory cells and organisms if present', 'Aerobic and anaerobic source thinking; mixed infection can matter'],
          ['Peritoneal dialysis fluid', 'Cell count and Gram stain with catheter context', 'CoNS, S. aureus, Gram-negative rods, yeasts, and repeat episodes'],
          ['Deep tissue or aspirate', 'Quality of source beats superficial swab logic', 'Predominant organisms and anaerobes can be meaningful when collection is appropriate']
        ]
      }
    ],
    keywords: ['blood culture', 'sterile body fluid culture', 'CSF culture', 'positive blood culture', 'contaminant', 'Gram stain critical result', 'clinical microbiology']
  },
  {
    slug: 'microbial-classification-criteria',
    title: 'Microbial Classification Criteria',
    category: 'Foundations',
    summary: 'A practical map of the evidence used to group, name, and identify microorganisms: visible traits, staining behavior, growth needs, antigenic patterns, resistance behavior, and genetic data.',
    whyItMatters: 'Classification is not just naming. It explains why older bench methods and newer molecular methods can describe the same organism from different angles.',
    principle: 'Microbial classification combines phenotype and genotype. Phenotype is what the organism does or looks like; genotype is what the organism carries in its nucleic acid sequence.',
    basicSteps: [
      'Start with broad observable traits such as colony appearance, cell shape, staining pattern, and growth requirements.',
      'Add physiologic clues such as oxygen tolerance, temperature range, nutrient needs, and biochemical activity.',
      'Use antigenic or resistance patterns when they answer a clinically useful question.',
      'Use DNA or RNA-based methods when relationship, identification confidence, outbreak relatedness, or unusual organisms are the main question.',
      'Remember that taxonomy can change as sequence databases and naming standards improve.'
    ],
    interpretation: [
      'A phenotypic result is often fast and useful at the bench, but it can be influenced by growth conditions and expression.',
      'A genotypic result can show relatedness or detect a target, but it still needs specimen and clinical context.',
      'Modern identification usually works best when phenotype, genotype, and clinical setting agree.'
    ],
    commonMistakes: [
      'Treating a single trait as the whole identity.',
      'Forgetting that organisms can look different under different growth conditions.',
      'Assuming a detected gene or target always proves active disease.'
    ],
    studentShortcut: 'Phenotype is the organism showing its behavior. Genotype is the organism showing its blueprint.',
    relatedLinks: [
      { label: 'Microbial Taxonomy', path: '/learn/microbial-taxonomy' },
      { label: 'Bacterial Identification Principles', path: '/learn/bacterial-identification-principles' },
      { label: 'Molecular Diagnostics Basics', path: '/learn/molecular-diagnostics-basics' }
    ],
    tables: [
      {
        title: 'Classification Evidence Map',
        columns: ['Evidence type', 'What students look at', 'How it helps'],
        rows: [
          ['Macroscopic morphology', 'Colony size, texture, pigment, hemolysis, odor, and growth pattern', 'Gives early sorting clues before full identification'],
          ['Microscopic morphology', 'Cell shape, arrangement, inclusion-like material, spores, yeast forms, or hyphae', 'Connects the organism to the correct workup branch'],
          ['Staining behavior', 'Gram reaction, acid-fastness, capsule stains, fluorescent stains, or special stains', 'Highlights structural features that routine culture may not explain'],
          ['Growth requirements', 'Atmosphere, temperature, time, media, salt tolerance, or nutrient dependence', 'Explains why some organisms need special incubation or media'],
          ['Biochemical activity', 'Enzyme reactions, carbohydrate use, substrate hydrolysis, and metabolic patterns', 'Separates similar organisms after the broad branch is known'],
          ['Antigenic or immunologic pattern', 'Serogroup, serotype, toxin antigen, or antibody response', 'Useful when immune markers or public health grouping matter'],
          ['Genetic relationship', 'Target detection, sequencing, or broader genomic comparison', 'Supports identification, epidemiology, resistance detection, or taxonomy updates']
        ]
      },
      {
        title: 'Phenotype Versus Genotype',
        columns: ['Question', 'Phenotype helps when...', 'Genotype helps when...'],
        rows: [
          ['What is growing?', 'Colonies and reactions are visible and interpretable', 'The organism is slow, fastidious, nonviable, or hard to identify phenotypically'],
          ['Are two isolates related?', 'Patterns are clearly different', 'A higher-resolution comparison is needed'],
          ['Is resistance possible?', 'The susceptibility pattern expresses the mechanism', 'A specific resistance gene or target must be detected'],
          ['Is disease present?', 'The organism fits the specimen and syndrome', 'A target is detected in the correct clinical context']
        ]
      }
    ],
    keywords: ['microbial classification', 'phenotype', 'genotype', 'taxonomy', 'classification criteria', 'sequence analysis', 'antigenic properties']
  },
  {
    slug: 'antibacterial-drug-class-map',
    title: 'Antibacterial Drug Class Map',
    category: 'Clinical Lab Principles',
    summary: 'A study map of common antibacterial classes by main target: cell wall, protein synthesis, nucleic acid synthesis, membrane disruption, and folate pathway inhibition.',
    whyItMatters: 'Drug names are easier to remember when students know what part of the bacterial cell the class is trying to hit.',
    principle: 'Antibacterial agents work because bacterial targets differ from human cells or can be selectively reached. Resistance often makes sense once the target is known.',
    basicSteps: [
      'Group the drug by its major target or pathway.',
      'Connect the target to the organism group where the drug is commonly useful.',
      'Look for resistance mechanisms that protect that target, destroy the drug, or prevent entry.',
      'Remember that spectrum is not fixed forever; local breakpoints, resistance patterns, and stewardship rules matter.',
      'Use current lab standards and local reporting rules for final interpretation.'
    ],
    interpretation: [
      'Cell-wall agents often depend on bacterial cell wall synthesis or binding targets.',
      'Protein synthesis agents bind ribosomal subunits or interfere with translation.',
      'Nucleic acid agents interfere with DNA or RNA processes.',
      'Membrane and folate-pathway agents have distinct toxicity, spectrum, and resistance considerations.'
    ],
    commonMistakes: [
      'Memorizing one drug at a time without grouping by target.',
      'Assuming broad spectrum means appropriate for every isolate.',
      'Forgetting intrinsic resistance before interpreting a drug-organism mismatch.'
    ],
    studentShortcut: 'First ask: wall, ribosome, DNA/RNA, membrane, or folate?',
    relatedLinks: [
      { label: 'Antimicrobial Resistance Mechanisms', path: '/learn/antimicrobial-resistance-mechanisms' },
      { label: 'Antimicrobial Susceptibility Testing', path: '/learn/antimicrobial-susceptibility-testing' },
      { label: 'Evaluation of Antimicrobial Activity', path: '/learn/evaluation-antimicrobial-activity' }
    ],
    tables: [
      {
        title: 'Drug Class Organizer',
        columns: ['Main target', 'Common classes', 'Study anchor'],
        rows: [
          ['Cell wall synthesis', 'Penicillins, cephalosporins, carbapenems, monobactams, glycopeptides', 'Think PBPs, peptidoglycan, beta-lactamases, altered targets'],
          ['Protein synthesis - 30S', 'Aminoglycosides, tetracyclines, glycylcyclines', 'Think ribosome binding, oxygen-dependent uptake for aminoglycosides, and target protection'],
          ['Protein synthesis - 50S', 'Macrolides, clindamycin, chloramphenicol, oxazolidinones, streptogramins', 'Think ribosomal target changes, inducible resistance, and organism-specific rules'],
          ['DNA or RNA processes', 'Fluoroquinolones, rifamycins', 'Think gyrase/topoisomerase changes or RNA polymerase inhibition'],
          ['Cell membrane', 'Polymyxins, daptomycin', 'Think membrane disruption and organism-group limits'],
          ['Folate pathway', 'Sulfonamides, trimethoprim', 'Think sequential blockade and bypass mechanisms'],
          ['Multiple or less tidy targets', 'Nitrofurantoin', 'Think urinary-use context and multiple bacterial injury points']
        ]
      },
      {
        title: 'Target-to-Resistance Link',
        columns: ['If the drug depends on...', 'Resistance may involve...', 'Example study language'],
        rows: [
          ['Binding a cell-wall target', 'Altered PBPs or altered cell-wall precursor', 'MRSA and vancomycin resistance concepts'],
          ['Entering a Gram-negative cell', 'Porin loss, permeability change, or efflux', 'Nonfermenter and Enterobacterales resistance patterns'],
          ['Remaining chemically intact', 'Drug-modifying or drug-destroying enzymes', 'Beta-lactamases or aminoglycoside-modifying enzymes'],
          ['Binding ribosomes', 'Target methylation, mutation, or protection', 'Macrolide/clindamycin and tetracycline patterns'],
          ['Following a metabolic pathway', 'Bypass, altered enzyme, or alternate substrate use', 'Folate-pathway resistance logic']
        ]
      }
    ],
    keywords: ['antibacterial drug classes', 'mechanism of action', 'cell wall synthesis', 'protein synthesis inhibitors', 'dna gyrase', 'folate pathway']
  },
  {
    slug: 'intrinsic-resistance-patterns',
    title: 'Intrinsic Resistance Patterns',
    category: 'Clinical Lab Principles',
    summary: 'A student guide to natural resistance patterns that are expected for an organism group and should not be treated as surprising acquired resistance.',
    whyItMatters: 'Intrinsic resistance prevents students from memorizing impossible drug-organism pairings and helps explain why some agents are not reported for certain organisms.',
    principle: 'Intrinsic resistance comes from normal organism biology: missing targets, impermeable envelopes, inactive uptake pathways, natural enzymes, or metabolism that does not support the drug effect.',
    basicSteps: [
      'Identify the organism group before judging the drug result.',
      'Ask whether the drug can enter, bind, or become active in that organism.',
      'Separate expected natural resistance from acquired resistance that has clinical or infection control meaning.',
      'Use AST rules and laboratory reporting logic to decide what should be tested or suppressed.',
      'Avoid interpreting a drug result when the organism-drug pair is not meaningful.'
    ],
    interpretation: [
      'Anaerobes are naturally poor targets for aminoglycosides because uptake depends on oxidative metabolism.',
      'Large glycopeptides such as vancomycin do not effectively reach targets in many Gram-negative organisms.',
      'Some organisms naturally produce enzymes or have targets that make selected drugs unreliable.',
      'Intrinsic resistance is a reason to know the organism before trusting a panel.'
    ],
    commonMistakes: [
      'Calling expected resistance a new mechanism.',
      'Forgetting that a reported category can be suppressed by lab rules.',
      'Memorizing a resistance fact without knowing the biological reason.'
    ],
    studentShortcut: 'If a drug seems pointless for a group, ask whether it can get in, find a target, or become active.',
    relatedLinks: [
      { label: 'Antibacterial Drug Class Map', path: '/learn/antibacterial-drug-class-map' },
      { label: 'Antimicrobial Susceptibility Testing', path: '/learn/antimicrobial-susceptibility-testing' },
      { label: 'Antimicrobial Resistance Mechanisms', path: '/learn/antimicrobial-resistance-mechanisms' }
    ],
    tables: [
      {
        title: 'Natural Resistance Logic',
        columns: ['Pattern to remember', 'Underlying idea', 'Student warning'],
        rows: [
          ['Anaerobes and aminoglycosides', 'Drug uptake is poor without oxidative metabolism', 'Do not expect aminoglycosides to work as standalone anaerobe therapy'],
          ['Gram-negative organisms and vancomycin', 'Outer membrane blocks effective access to the target', 'Vancomycin is not a Gram-negative rod solution'],
          ['Gram-positive organisms and aztreonam', 'The target profile does not match useful activity', 'Aztreonam is mainly a Gram-negative aerobic rod concept'],
          ['Enterococci and many cephalosporins', 'Binding targets are not effectively inhibited', 'Cephalosporin activity against enterococci is unreliable'],
          ['Klebsiella group and ampicillin', 'Natural beta-lactamase activity can inactivate ampicillin', 'Ampicillin resistance is expected for many Klebsiella isolates'],
          ['Aerobes and metronidazole', 'The drug requires anaerobic reduction for activity', 'Metronidazole is not an aerobic bacteriology catch-all'],
          ['Lactobacillus or Leuconostoc and vancomycin', 'Cell-wall target biology can make vancomycin ineffective', 'These genera can surprise students if treated like routine Gram positives'],
          ['Stenotrophomonas maltophilia and carbapenems', 'Intrinsic beta-lactamase activity and permeability patterns limit carbapenems', 'Carbapenem resistance is part of the organism story']
        ],
        note: 'Exact testing and reporting depend on current standards and local laboratory policy.'
      }
    ],
    keywords: ['intrinsic resistance', 'natural resistance', 'vancomycin resistant', 'enterococcus cephalosporin', 'anaerobe aminoglycoside', 'stenotrophomonas carbapenem']
  },
  makeStarterTopic({
    slug: 'microscopy-basics',
    title: 'Microscopy Basics',
    category: 'Core Methods',
    summary: 'A foundational page for bright-field, oil immersion, wet mount, fluorescence, and how microscopy supports early organism workup.',
    anchors: [
      'Bright-field: routine stained smear review',
      'Oil immersion: high-power bacterial morphology detail',
      'Wet mount: motility, cells, yeast, parasites, or direct specimen clues',
      'Fluorescence: sensitive screening for selected organisms or stains'
    ],
    keywords: ['microscopy', 'oil immersion', 'bright field', 'wet mount', 'fluorescence microscopy']
  }),
  {
    slug: 'microscope-setup-and-smear-reading',
    title: 'Microscope Setup and Smear Reading',
    category: 'Core Methods',
    summary: 'A bench-focused page for microscope setup, bright-field review, oil immersion habits, and reading stained smears without overcalling poor fields.',
    whyItMatters: 'Good microscopy is a skill. The same stain can look clean or confusing depending on illumination, focus, smear thickness, and where the field is read.',
    principle: 'Microscopy quality depends on controlled light, proper focus, an appropriate objective, and a thin representative area of the smear.',
    basicSteps: [
      'Start low power to find the smear and choose a representative area.',
      'Adjust illumination and condenser settings so contrast is useful without washing out detail.',
      'Move to oil immersion only after choosing a thin, readable area.',
      'Scan more than one field before reporting morphology, cells, or organism burden.',
      'Correlate smear findings with specimen source and culture expectations.'
    ],
    interpretation: [
      'A thin area helps avoid false Gram-positive impressions from under-decolorized clumps.',
      'Too much light can make faint organisms harder to see.',
      'Too little light or poor focus can exaggerate debris and background stain.',
      'A smear with abundant epithelial cells or mixed background may say more about collection quality than infection.'
    ],
    commonMistakes: [
      'Reading the thickest area because it has the most material.',
      'Using one field as the entire answer.',
      'Forgetting to adjust light and condenser before blaming the stain.'
    ],
    studentShortcut: 'Find the clean field first. The stain cannot rescue a bad field.',
    relatedLinks: [
      { label: 'Gram Stain', path: '/learn/gram-stain' },
      { label: 'Specimen Quality', path: '/learn/specimen-quality' },
      { label: 'Stain Selection and Screening', path: '/learn/stain-selection-and-screening' }
    ],
    tables: [
      {
        title: 'Microscopy Habit Checklist',
        columns: ['Step', 'What to check', 'Why it matters'],
        rows: [
          ['Before oil', 'Slide position, low-power focus, and readable smear area', 'Prevents wasting time on thick or empty fields'],
          ['Light path', 'Condenser, diaphragm, and brightness adjusted to the method', 'Improves contrast and reduces washed-out morphology'],
          ['Oil immersion', 'Oil only on the intended field with fine focus', 'Protects detail and avoids lens contamination'],
          ['Field selection', 'Multiple fields from representative areas', 'Reduces overcalling debris or one abnormal patch'],
          ['Correlation', 'Cells, organisms, background, and specimen source', 'Turns microscopy into a useful clinical clue']
        ]
      }
    ],
    keywords: ['microscope setup', 'kohler illumination', 'oil immersion', 'smear reading', 'bright field microscopy', 'direct smear']
  },
  {
    slug: 'stain-selection-and-screening',
    title: 'Stain Selection and Screening',
    category: 'Core Methods',
    summary: 'A practical organizer for choosing Gram stain, acid-fast stains, fluorochrome screening, acridine orange, and other direct microscopy approaches.',
    whyItMatters: 'Students often learn stains one by one. At the bench, the real question is which stain answers the specimen question with the least confusion.',
    principle: 'A stain is chosen because a target structure, organism group, or specimen problem needs to be made visible.',
    basicSteps: [
      'Define the question: bacteria, AFB, fungi, parasites, cells, or low-burden organisms.',
      'Choose a stain that matches the organism structure or screening need.',
      'Use controls and method-specific quality checks.',
      'Report what the method can support, not more than it can prove.',
      'Escalate to culture, antigen, serology, NAAT, or referral when stain results are limited.'
    ],
    interpretation: [
      'Gram stain is a broad bacterial morphology and specimen-quality tool.',
      'Acid-fast stains screen for acid-fast organisms but do not identify species alone.',
      'Fluorochrome methods can improve screening sensitivity but need confirmation and trained reading.',
      'Acridine orange can highlight nucleic acid-containing organisms or cells in selected settings, but background and nonviable material can confuse interpretation.'
    ],
    commonMistakes: [
      'Treating a stain result as species identification.',
      'Ignoring safety implications of AFB concern.',
      'Using a highly sensitive screen without understanding false-positive background.'
    ],
    studentShortcut: 'Pick the stain by the question, then report only what that stain can honestly show.',
    relatedLinks: [
      { label: 'Gram Stain', path: '/learn/gram-stain' },
      { label: 'Acid-Fast Stain', path: '/learn/acid-fast-stain' },
      { label: 'Mycobacteria and Aerobic Actinomycetes', path: '/learn/mycobacteria-actinomycetes' }
    ],
    tables: [
      {
        title: 'Direct Stain Decision Map',
        columns: ['Stain or approach', 'Best student use', 'Limit to remember'],
        rows: [
          ['Gram stain', 'Broad bacterial morphology, cells, and specimen quality', 'Technique and specimen quality can change the apparent result'],
          ['Ziehl-Neelsen or Kinyoun acid-fast stain', 'Acid-fast organisms such as mycobacteria and selected parasites', 'A positive smear is not species identification'],
          ['Auramine-rhodamine fluorochrome', 'Sensitive AFB screening in many workflows', 'Fluorescent artifacts and confirmation rules matter'],
          ['Acridine orange', 'Sensitive screening for nucleic acid-containing cells or organisms in selected specimens', 'Dead cells, debris, and background can fluoresce'],
          ['Wet mount', 'Motility, yeast, cells, or parasite forms in fresh material', 'Time, preparation, and organism viability matter']
        ]
      }
    ],
    keywords: ['stain selection', 'direct smear', 'acridine orange', 'fluorochrome stain', 'gram stain', 'acid fast stain', 'wet mount']
  },
  makeStarterTopic({
    slug: 'colony-morphology',
    title: 'Colony Morphology',
    category: 'Core Methods',
    summary: 'A guide to reading colony size, color, texture, hemolysis, odor, pigment, swarming, and purity without overcalling identity.',
    anchors: [
      'Size and growth rate: fast, slow, tiny, spreading, or pinpoint',
      'Texture: mucoid, dry, creamy, rough, smooth, or spreading',
      'Hemolysis: alpha, beta, gamma, or unclear on blood agar',
      'Purity: single isolate versus mixed culture'
    ],
    keywords: ['colony morphology', 'hemolysis', 'pigment', 'swarming', 'mucoid colonies']
  }),
  makeStarterTopic({
    slug: 'atmosphere-incubation',
    title: 'Atmosphere and Incubation',
    category: 'Core Methods',
    summary: 'A review page for oxygen tolerance, CO2 needs, temperature, incubation time, and why growth conditions change organism recovery.',
    anchors: [
      'Aerobic: grows with oxygen',
      'Anaerobic: oxygen-sensitive recovery requires special setup',
      'CO2 or capnophilic growth: enhanced recovery for selected fastidious organisms',
      'Temperature and time: changes recovery and expression of some traits'
    ],
    keywords: ['incubation', 'atmosphere', 'co2', 'anaerobic', 'microaerophilic', 'temperature']
  }),
  {
    slug: 'media-selection-patterns',
    title: 'Media Selection Patterns',
    category: 'Core Methods',
    summary: 'A student-first guide to why common plates, broths, and special media are used in routine bacteriology and when routine media are not enough.',
    whyItMatters: 'Media names are easier to learn when each plate is tied to a job: recover, select, differentiate, enrich, or support a special organism.',
    principle: 'A medium is chosen because it answers a recovery question. Some media feed fastidious organisms, some suppress background flora, and some reveal a reaction.',
    basicSteps: [
      'Start with specimen source and expected flora burden.',
      'Choose general recovery media for broad bacterial growth.',
      'Add selective or differential media when background organisms need to be suppressed or separated.',
      'Use enriched or special media when the suspected organism has extra growth needs.',
      'Interpret growth with atmosphere, incubation time, and clinical setting.'
    ],
    interpretation: [
      'Blood agar gives broad recovery and hemolysis clues.',
      'Chocolate agar supports fastidious respiratory organisms better than plain blood agar.',
      'MacConkey helps sort many Gram-negative rods by lactose behavior.',
      'Special media such as BCYE, Thayer-Martin, Campylobacter media, or mycobacterial media should be tied to a specific clinical question.'
    ],
    commonMistakes: [
      'Memorizing media names without knowing the job of the medium.',
      'Forgetting that no growth may mean wrong condition, not no organism.',
      'Using routine plate logic for Legionella, mycobacteria, anaerobes, or fastidious agents.'
    ],
    studentShortcut: 'Every plate is asking a question: who can grow here, and what reaction will separate them?',
    relatedLinks: [
      { label: 'Culture Media', path: '/learn/culture-media' },
      { label: 'Atmosphere and Incubation', path: '/learn/atmosphere-incubation' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Media Jobs',
        columns: ['Media group', 'Main job', 'Typical learning use'],
        rows: [
          ['Blood agar', 'Broad recovery with hemolysis reading', 'First-pass colony growth and hemolysis patterns'],
          ['Chocolate agar', 'Enriched recovery for fastidious organisms', 'Respiratory and sterile-site workups where fastidious bacteria are possible'],
          ['MacConkey-type media', 'Select many Gram-negative rods and show lactose behavior', 'Enteric Gram-negative rod sorting'],
          ['CNA or PEA-type media', 'Suppress many Gram-negative organisms', 'Help recover Gram-positive organisms from mixed specimens'],
          ['Bile esculin or salt-tolerance media', 'Test group-level traits', 'Enterococcus and related Gram-positive cocci logic'],
          ['BCYE', 'Support Legionella when suspected', 'Water exposure or atypical pneumonia workup'],
          ['Campylobacter media', 'Recover Campylobacter-like organisms under the right atmosphere', 'Stool or enteritis workup with microaerophilic logic'],
          ['CIN or TCBS-type media', 'Select for specific enteric or water-associated groups', 'Yersinia or Vibrio-focused questions'],
          ['Thayer-Martin or modified Thayer-Martin', 'Recover pathogenic Neisseria while suppressing background flora', 'Genital or sterile-site Neisseria workups'],
          ['Mycobacterial media', 'Support slow or special acid-fast organisms', 'AFB culture and prolonged incubation logic']
        ]
      },
      {
        title: 'How Students Should Read Media',
        columns: ['Question', 'Example answer', 'What to do next'],
        rows: [
          ['Did it grow broadly?', 'Good growth on blood agar', 'Move to morphology and first branch tests'],
          ['Did it need enrichment?', 'Better growth on chocolate than routine plates', 'Think fastidious respiratory or Neisseria-like organisms in context'],
          ['Was background suppressed?', 'Selective plate gives a cleaner target colony', 'Pick isolated colonies and avoid overreading mixed flora'],
          ['Was a reaction visible?', 'Hemolysis, lactose reaction, pigment, or esculin reaction', 'Use the reaction as a branch clue, not the final ID'],
          ['Was there no growth?', 'Possible inhibition, wrong atmosphere, slow organism, prior therapy, or nonbacterial cause', 'Check specimen, incubation, and alternate methods']
        ]
      }
    ],
    keywords: ['media selection', 'blood agar', 'chocolate agar', 'macconkey', 'cna', 'pea agar', 'bcye', 'campylobacter media', 'thayer martin']
  },
  {
    slug: 'ast-test-selection-logic',
    title: 'AST Test Selection Logic',
    category: 'Clinical Lab Principles',
    summary: 'A practical page for deciding why some organism-drug combinations are tested, suppressed, confirmed, or avoided in antimicrobial susceptibility testing.',
    whyItMatters: 'Students see large AST tables and think every drug belongs on every organism. In real lab thinking, the organism group decides which drugs and methods make sense.',
    principle: 'AST selection depends on organism identity, clinical source, expected therapy options, method validity, breakpoint availability, intrinsic resistance, and local reporting policy.',
    basicSteps: [
      'Confirm the isolate is clinically meaningful and pure enough for testing.',
      'Identify the organism group before choosing the method or drug set.',
      'Use the medium, atmosphere, inoculum, and incubation conditions required for that organism group.',
      'Report only drugs with valid interpretive criteria and appropriate clinical value.',
      'Use confirmatory or special tests when phenotype patterns suggest clinically important resistance.'
    ],
    interpretation: [
      'A drug may be active in theory but not appropriate to test or report for a specific organism-source question.',
      'Fastidious organisms may require supplemented media or different incubation conditions.',
      'Some resistance patterns trigger special attention even when the initial result looks routine.',
      'Current CLSI/FDA/lab policy should control exact breakpoints, panels, and reporting.'
    ],
    commonMistakes: [
      'Expecting one AST panel to fit every bacterial group.',
      'Ignoring organism identity before reading the drug list.',
      'Using old breakpoint memory instead of current standards.'
    ],
    studentShortcut: 'AST starts with the organism group, not the antibiotic list.',
    relatedLinks: [
      { label: 'Antimicrobial Susceptibility Testing', path: '/learn/antimicrobial-susceptibility-testing' },
      { label: 'Intrinsic Resistance Patterns', path: '/learn/intrinsic-resistance-patterns' },
      { label: 'Antibacterial Drug Class Map', path: '/learn/antibacterial-drug-class-map' }
    ],
    tables: [
      {
        title: 'AST Selection Questions',
        columns: ['Question', 'Why it matters', 'Student example'],
        rows: [
          ['What organism group is this?', 'Methods and breakpoints are group-specific', 'Enterobacterales, Staphylococcus, Enterococcus, Streptococcus, Neisseria, anaerobe'],
          ['Is the isolate clinically meaningful?', 'Testing colonizers or contaminants can mislead care', 'A predominant sterile-site isolate differs from mixed superficial flora'],
          ['Is the method valid for the organism?', 'Medium, supplements, atmosphere, and time affect results', 'Fastidious bacteria may need modified conditions'],
          ['Does a breakpoint exist?', 'A measurement without interpretation may not support reporting', 'Zone or MIC must map to a recognized category'],
          ['Should a drug be suppressed?', 'Intrinsic resistance or clinical irrelevance can make reporting unsafe', 'Some organism-drug pairs should not be displayed just because an instrument produced a value'],
          ['Is a special resistance phenotype suspected?', 'Additional testing or reporting comments may be needed', 'MRSA, inducible clindamycin resistance, ESBL, carbapenemase, VRE-type logic']
        ],
        note: 'This page teaches selection logic. Exact drug panels, incubation conditions, and breakpoints should follow current standards and local laboratory policy.'
      },
      {
        title: 'Common AST Variables',
        columns: ['Variable', 'Why students should care', 'Possible problem'],
        rows: [
          ['Inoculum density', 'Controls how much organism is challenged', 'Too heavy or too light can shift apparent susceptibility'],
          ['Medium and supplements', 'Affects growth and drug activity', 'Wrong medium can invalidate selected organism-drug results'],
          ['Atmosphere', 'Some organisms need air, CO2, or special conditions', 'Wrong atmosphere can alter growth or interpretation'],
          ['Incubation time', 'Resistance expression may need the right reading window', 'Reading too early or late can mislead'],
          ['Quality control', 'Shows the system is behaving as expected', 'Out-of-range QC means patient results need review']
        ]
      }
    ],
    keywords: ['ast selection', 'antimicrobial panel', 'susceptibility testing conditions', 'breakpoints', 'clsi', 'fda stic', 'organism drug combinations']
  },
  {
    slug: 'staphylococcus-species-patterns',
    title: 'Staphylococcus Species Patterns',
    category: 'Bacteriology',
    summary: 'A deeper Staphylococcus page for source significance, coagulase-positive versus coagulase-negative patterns, device-associated disease, toxin syndromes, and common bench separation clues.',
    whyItMatters: 'Staphylococcus is one of the first places students learn that an organism name is not enough. The same broad group can mean severe disease, device infection, UTI, skin flora, or contamination depending on source and pattern.',
    principle: 'Interpret Staphylococcus by combining coagulase behavior, species-level clues, specimen source, number of positive cultures, device context, and susceptibility pattern.',
    basicSteps: [
      'Confirm catalase-positive Gram-positive cocci and review arrangement.',
      'Decide whether the isolate is S. aureus-like, coagulase-negative Staphylococcus, or Micrococcus-like.',
      'Use source and repeated recovery to judge significance.',
      'Look for high-yield species anchors such as S. aureus, S. epidermidis, S. lugdunensis, and S. saprophyticus.',
      'Connect resistance patterns such as methicillin resistance, inducible clindamycin resistance, and reduced vancomycin concern to the correct organism context.'
    ],
    interpretation: [
      'S. aureus is a major pathogen and should not be dismissed when recovered from meaningful sites.',
      'Coagulase-negative staphylococci often live on skin but become important with prosthetic material, intravascular devices, sterile sites, or repeated blood culture recovery.',
      'S. lugdunensis can behave more aggressively than many other coagulase-negative staphylococci.',
      'Micrococcus-like organisms are often contaminants, but immunocompromised and device contexts still matter.'
    ],
    commonMistakes: [
      'Calling every coagulase-negative Staphylococcus a contaminant.',
      'Missing S. saprophyticus because the isolate is coagulase negative.',
      'Forgetting that S. aureus disease can be toxin-mediated even when the organism is not recovered from every site.',
      'Treating colony appearance as final identification.'
    ],
    studentShortcut: 'For Staph, ask: aureus or not, device or not, sterile site or not, repeated or not.',
    relatedLinks: [
      { label: 'Staphylococcus and Micrococcus', path: '/learn/staphylococcus-micrococcus' },
      { label: 'Coagulase Test', path: '/learn/coagulase-test' },
      { label: 'Intrinsic Resistance Patterns', path: '/learn/intrinsic-resistance-patterns' }
    ],
    tables: [
      {
        title: 'Staphylococcus Clinical Meaning Map',
        columns: ['Organism or group', 'Common source idea', 'Disease anchors', 'Student caution'],
        rows: [
          ['S. aureus', 'Nares and skin colonization can seed wounds, blood, lungs, bone, heart valves, or toxin-mediated syndromes', 'Skin abscess, bacteremia, pneumonia, endocarditis, osteomyelitis, food poisoning, toxic shock, scalded skin syndrome', 'A meaningful S. aureus isolate deserves attention even before susceptibility details arrive'],
          ['S. epidermidis', 'Skin flora with strong device and biofilm association', 'Catheter, prosthetic valve, prosthetic joint, shunt, and other hardware-associated infections', 'Repeated recovery and device context make the difference'],
          ['S. lugdunensis', 'Skin-associated coagulase-negative Staphylococcus with higher virulence potential', 'Skin/soft tissue infection, bacteremia, endocarditis, wound infection', 'Do not mentally group it with low-significance skin flora too quickly'],
          ['S. saprophyticus', 'Genitourinary-associated pattern', 'Uncomplicated UTI, especially in young sexually active patients', 'Novobiocin resistance is a classic study clue'],
          ['Other coagulase-negative staphylococci', 'Skin or mucosal flora, sometimes opportunistic', 'Line infection, device infection, bloodstream infection, eye infection, neonatal or immunocompromised host disease', 'Clinical significance rises with sterile source, repeat isolation, and hardware'],
          ['Micrococcus, Kocuria, and related genera', 'Skin and environmental organisms', 'Usually contaminants; rare opportunistic infections', 'Interpret cautiously in immunocompromised or device-associated cases']
        ]
      },
      {
        title: 'Bench Separation Cues',
        columns: ['Cue', 'How to use it', 'Why students care'],
        rows: [
          ['Coagulase or validated rapid S. aureus test', 'Separates S. aureus-like isolates from most coagulase-negative staphylococci', 'This changes urgency, reporting, and susceptibility expectations'],
          ['Novobiocin pattern', 'Helps remember S. saprophyticus among selected coagulase-negative staphylococci', 'Useful exam anchor for UTI questions'],
          ['Microdase or modified oxidase', 'Supports Micrococcus-like separation in the right workflow', 'Prevents forcing every catalase-positive coccus into Staphylococcus'],
          ['Biofilm/device context', 'Raises significance of coagulase-negative staphylococci', 'Culture interpretation is clinical, not just biochemical'],
          ['D-test logic', 'Detects inducible clindamycin resistance in selected Staphylococcus isolates', 'A susceptibility pattern may hide treatment-relevant resistance']
        ]
      }
    ],
    keywords: ['staphylococcus species', 's aureus', 'staphylococcus epidermidis', 'staphylococcus lugdunensis', 'staphylococcus saprophyticus', 'coagulase negative staph', 'micrococcus', 'novobiocin', 'd test']
  },
  {
    slug: 'streptococcus-enterococcus-species-patterns',
    title: 'Streptococcus and Enterococcus Species Patterns',
    category: 'Bacteriology',
    summary: 'A deeper page for beta-hemolytic streptococci, S. pneumoniae, viridans group streptococci, nutritionally variant streptococci, Enterococcus, and similar catalase-negative cocci.',
    whyItMatters: 'This group rewards lane-based thinking. Hemolysis, Lancefield grouping, PYR, CAMP, optochin, bile solubility, bile esculin, salt tolerance, and source all point students toward different clinical meanings.',
    principle: 'Catalase-negative Gram-positive cocci should be organized first by hemolysis and source, then by targeted reactions and clinical significance.',
    basicSteps: [
      'Confirm catalase-negative Gram-positive cocci and review chains, pairs, or short chains.',
      'Sort the isolate by hemolysis pattern: beta, alpha, or nonhemolytic/gamma.',
      'Use group-specific reactions instead of running every memory test at once.',
      'Interpret oral flora, urine, blood, CSF, wound, and genital sources differently.',
      'Bring resistance thinking in early for Enterococcus, viridans group streptococci, and pneumococcus where applicable.'
    ],
    interpretation: [
      'Group A Streptococcus is strongly tied to pharyngitis, skin infection, invasive disease, toxin syndromes, and post-streptococcal complications.',
      'Group B Streptococcus has neonatal, pregnancy, genitourinary, wound, and adult invasive disease relevance.',
      'S. pneumoniae is an alpha-hemolytic, capsule-associated organism with pneumonia, meningitis, otitis, sinusitis, and bacteremia associations.',
      'Viridans group streptococci are oral flora but matter in endocarditis, sterile sites, neutropenia, and repeated blood culture patterns.',
      'Enterococcus often brings urinary, wound, intra-abdominal, bloodstream, device, and resistance questions.'
    ],
    commonMistakes: [
      'Learning hemolysis as a final ID instead of a lane.',
      'Forgetting that viridans streptococci can be pathogens in the right blood culture and host setting.',
      'Treating Enterococcus like an ordinary Streptococcus for therapy or resistance questions.',
      'Missing nutritionally variant streptococci when endocarditis context and unusual growth behavior appear together.'
    ],
    studentShortcut: 'For catalase-negative cocci: hemolysis first, then source, then the one reaction that separates the lane.',
    relatedLinks: [
      { label: 'Streptococcus and Enterococcus', path: '/learn/streptococcus-enterococcus' },
      { label: 'Catalase Test', path: '/learn/catalase-test' },
      { label: 'AST Test Selection Logic', path: '/learn/ast-test-selection-logic' }
    ],
    tables: [
      {
        title: 'Catalase-Negative Cocci Lanes',
        columns: ['Lane', 'Organisms to keep in mind', 'Clinical anchors', 'Useful separation clues'],
        rows: [
          ['Beta-hemolytic group A', 'S. pyogenes', 'Pharyngitis, impetigo, cellulitis, necrotizing fasciitis, toxic shock-like syndrome, rheumatic fever, glomerulonephritis', 'PYR positive and group A antigen logic'],
          ['Beta-hemolytic group B', 'S. agalactiae', 'Neonatal sepsis/meningitis, pregnancy screening context, adult invasive disease', 'CAMP and hippurate are classic study anchors'],
          ['Other beta-hemolytic groups', 'Groups C, F, and G streptococci', 'Pharyngitis, wound infection, bacteremia, invasive disease in selected settings', 'Grouping and organism-level ID clarify the lane'],
          ['Alpha-hemolytic pneumococcus lane', 'S. pneumoniae', 'Pneumonia, otitis media, sinusitis, meningitis, bacteremia', 'Optochin and bile solubility concepts'],
          ['Alpha-hemolytic oral flora lane', 'Viridans group streptococci', 'Dental caries, endocarditis, neutropenic bacteremia, sterile-site infection', 'Species groups and source matter more than one single screen'],
          ['Enterococcus lane', 'E. faecalis and E. faecium most often', 'UTI, wound, intra-abdominal infection, bacteremia, endocarditis, device-associated infection', 'Bile esculin, salt tolerance, PYR, and resistance profile'],
          ['Nutritionally variant lane', 'Abiotrophia and Granulicatella', 'Endocarditis and unusual growth requirements', 'Satellite-like or special nutrient-dependent growth behavior']
        ]
      },
      {
        title: 'Resistance and Reporting Anchors',
        columns: ['Group', 'Resistance idea', 'Why it matters'],
        rows: [
          ['S. pyogenes', 'Penicillin susceptibility remains a key teaching anchor, while macrolide/clindamycin resistance can occur', 'Do not confuse first-line concepts with every possible alternative drug result'],
          ['S. pneumoniae', 'Penicillin and cephalosporin interpretation depends on site and breakpoint context', 'Meningitis versus non-meningitis context changes thinking'],
          ['Viridans group streptococci', 'Penicillin or ceftriaxone susceptibility can guide endocarditis therapy', 'Blood culture context and MIC matter'],
          ['Enterococcus', 'Intrinsic cephalosporin resistance and acquired vancomycin resistance are major study points', 'VRE changes infection control and therapy thinking'],
          ['Leuconostoc/Pediococcus-like organisms', 'Vancomycin resistance can be intrinsic', 'They can mimic other Gram-positive cocci if the learner only memorizes morphology']
        ],
        note: 'Exact therapy and reporting should follow current standards, patient site, and local laboratory policy.'
      }
    ],
    keywords: ['streptococcus species', 'enterococcus', 'beta hemolytic streptococci', 's pyogenes', 's agalactiae', 'streptococcus pneumoniae', 'viridans', 'abiotrophia', 'granulicatella', 'vre']
  },
  {
    slug: 'bacillus-aerobic-spore-formers',
    title: 'Bacillus and Aerobic Spore-Forming Rods',
    category: 'Bacteriology',
    summary: 'A focused page for aerobic spore-forming Gram-positive rods, including Bacillus anthracis safety logic, Bacillus cereus group disease, colony clues, and contaminant-versus-pathogen thinking.',
    whyItMatters: 'Bacillus-like organisms can be dismissed too quickly, but some patterns have major safety, public health, toxin, foodborne, ocular, or invasive disease implications.',
    principle: 'Interpret aerobic spore-forming rods by colony morphology, hemolysis, motility, safety context, specimen source, and whether the disease pattern suggests toxin or invasive infection.',
    basicSteps: [
      'Confirm large Gram-positive rods and look for spore-forming context.',
      'Review colony morphology, hemolysis, and motility patterns.',
      'Escalate suspicious B. anthracis-like findings according to sentinel laboratory policy.',
      'Connect B. cereus group isolates to food poisoning, eye infection, wound infection, and opportunistic disease when the source fits.',
      'Avoid overcalling single low-significance Bacillus-like isolates from nonsterile or environmental contexts.'
    ],
    interpretation: [
      'B. anthracis concern is a safety and public health question, not just an ID exercise.',
      'B. cereus group organisms can cause foodborne disease and clinically important opportunistic infections.',
      'Many Bacillus-like isolates are environmental contaminants, but sterile-site source and repeat recovery raise significance.',
      'AST and therapy discussion for unusual Bacillus-like isolates often requires current standards or reference guidance.'
    ],
    commonMistakes: [
      'Treating every Bacillus-like colony as harmless contamination.',
      'Manipulating a suspicious isolate too far before safety escalation.',
      'Forgetting toxin-mediated food poisoning patterns.',
      'Using colony shape alone as final ID.'
    ],
    studentShortcut: 'For Bacillus-like rods, first ask: anthracis concern, cereus syndrome, or environmental contaminant?',
    relatedLinks: [
      { label: 'Gram-Positive Bacilli Overview', path: '/learn/gram-positive-bacilli-overview' },
      { label: 'Laboratory Safety', path: '/learn/laboratory-safety' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Aerobic Spore-Former Study Map',
        columns: ['Group', 'Bench clues', 'Clinical anchors', 'Student caution'],
        rows: [
          ['B. anthracis concern', 'Large Gram-positive rods, nonhemolytic or suspicious colony pattern, safety context', 'Cutaneous, inhalational, gastrointestinal, injection-related, or anthrax-like disease depending on exposure', 'Follow sentinel lab and public health escalation; do not overwork casually'],
          ['B. cereus group', 'Large colonies, often spreading or beta-hemolytic patterns depending on species and conditions', 'Food poisoning, keratitis/endophthalmitis, wound infection, bacteremia in selected hosts', 'Foodborne and invasive meanings are different contexts'],
          ['Other Bacillus-like organisms', 'Variable colony texture, pigment, hemolysis, and biochemical reactions', 'Often environmental; sometimes opportunistic or clinically relevant from sterile sites', 'Repeat recovery and specimen source decide significance'],
          ['Brevibacillus and Paenibacillus-like organisms', 'May resemble Bacillus-like environmental rods', 'Usually uncommon, but possible opportunistic recovery', 'Do not force a species-level conclusion without validated ID support']
        ]
      },
      {
        title: 'Bacillus Decision Questions',
        columns: ['Question', 'Why it matters', 'Next thought'],
        rows: [
          ['Is this a sterile-site isolate?', 'Sterile sites increase clinical significance', 'Correlate with repeat culture, symptoms, and ID confidence'],
          ['Could this be B. anthracis?', 'Safety and public health response matter', 'Limit manipulation and escalate by policy'],
          ['Does the syndrome suggest toxin?', 'Food poisoning can be toxin-mediated', 'Culture result may not be the whole diagnostic question'],
          ['Is the patient immunocompromised or device-associated?', 'Opportunistic Bacillus-like infection becomes more plausible', 'Do not dismiss automatically'],
          ['Is AST needed?', 'Testing methods and interpretation can be organism-specific', 'Use current standards, reference methods, or lab policy']
        ]
      }
    ],
    keywords: ['bacillus', 'bacillus anthracis', 'bacillus cereus', 'aerobic spore forming rods', 'gram positive rods', 'anthrax', 'food poisoning']
  },
  {
    slug: 'listeria-corynebacterium-coryneform-rods',
    title: 'Listeria, Corynebacterium, and Coryneform Rods',
    category: 'Bacteriology',
    summary: 'A study page for non-spore-forming Gram-positive rods that can be dismissed too quickly: Listeria, C. diphtheriae complex, C. jeikeium, C. urealyticum, and other coryneform organisms.',
    whyItMatters: 'Diphtheroids are not always meaningless. Source, host, morphology, toxin concern, device context, and repeated recovery decide whether a coryneform-like isolate deserves attention.',
    principle: 'Use morphology, catalase, motility, hemolysis, tellurite/Tinsdale-type behavior, urease or other reactions, and clinical setting to separate Listeria from Corynebacterium-like organisms and related genera.',
    basicSteps: [
      'Confirm short Gram-positive rods, coccobacilli, palisades, club forms, or diphtheroid-like morphology.',
      'Ask whether the organism could be Listeria, C. diphtheriae complex, a device-associated coryneform, or likely skin flora.',
      'Use motility, catalase, hemolysis, colony appearance, and validated identification systems carefully.',
      'Escalate toxin-producing Corynebacterium diphtheriae concern according to policy.',
      'Interpret repeated sterile-site or device-associated recovery more seriously than superficial mixed flora.'
    ],
    interpretation: [
      'Listeria is clinically important in neonates, pregnancy, older adults, and immunocompromised patients.',
      'C. diphtheriae is a toxin-aware organism; identification alone does not answer the toxin question.',
      'C. jeikeium and some other coryneforms are more important in hospitalized, immunocompromised, or device-associated contexts.',
      'Many coryneform rods are skin or mucosal flora, but sterile-site source and repeat isolation change the meaning.'
    ],
    commonMistakes: [
      'Writing off all diphtheroids as contaminants.',
      'Missing Listeria when short rods appear in blood or CSF context.',
      'Forgetting toxin testing or public health logic for C. diphtheriae concern.',
      'Assuming every Corynebacterium species has the same resistance profile.'
    ],
    studentShortcut: 'For diphtheroid-like rods, ask: Listeria risk, diphtheria toxin, device infection, or ordinary flora?',
    relatedLinks: [
      { label: 'Gram-Positive Bacilli Overview', path: '/learn/gram-positive-bacilli-overview' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Specimen Quality', path: '/learn/specimen-quality' }
    ],
    tables: [
      {
        title: 'Non-Spore-Forming Rod Organizer',
        columns: ['Organism or group', 'Bench direction', 'Clinical anchor', 'Interpretation warning'],
        rows: [
          ['Listeria monocytogenes', 'Small Gram-positive rods/coccobacilli, catalase positive, tumbling/umbrella motility concept', 'Bacteremia, meningitis, pregnancy-associated infection, neonatal disease, foodborne exposure', 'Do not dismiss short rods in blood or CSF risk settings'],
          ['C. diphtheriae complex', 'Pleomorphic rods, palisades, club forms, special media/toxin-aware workflow', 'Respiratory diphtheria or cutaneous disease depending on context', 'Toxin status and public health workflow matter'],
          ['C. jeikeium', 'Coryneform rod with hospital and device context', 'Bacteremia, device infection, immunocompromised host disease', 'Often clinically important when repeatedly recovered from sterile sources'],
          ['C. urealyticum', 'Urease-associated urinary tract context', 'UTI, alkaline urine, encrusted urinary disease in selected hosts', 'Do not treat as generic diphtheroid in the right urine/host pattern'],
          ['Other Corynebacterium-like organisms', 'Variable colony size, pigment, dryness, lipophilism, and biochemical behavior', 'Skin flora, device infection, wound infection, bacteremia, rare invasive disease', 'Source and repeated recovery guide significance'],
          ['Dermabacter, Turicella, Arthrobacter-like organisms', 'Coryneform-like appearance with variable significance', 'Often skin or uncertain significance; occasional opportunistic recovery', 'Avoid overclaiming pathogenicity from a single weak context']
        ]
      },
      {
        title: 'Coryneform Significance Ladder',
        columns: ['Finding', 'Lower concern', 'Higher concern'],
        rows: [
          ['Source', 'Superficial mixed skin flora', 'Blood, CSF, sterile tissue, hardware, deep wound'],
          ['Recovery pattern', 'Single isolate in mixed culture', 'Repeated isolate or predominant growth'],
          ['Host', 'Healthy host with no matching syndrome', 'Immunocompromised, hospitalized, device-associated, neonate, pregnancy-related, or elderly host'],
          ['Organism clue', 'Unidentified diphtheroid-like flora', 'Listeria, toxin-producing Corynebacterium concern, C. jeikeium, C. urealyticum, or other recognized opportunist'],
          ['Action', 'Report per routine policy', 'Confirm ID, review susceptibility needs, escalate toxin/safety questions if relevant']
        ]
      }
    ],
    keywords: ['listeria', 'corynebacterium', 'coryneform rods', 'diphtheroids', 'corynebacterium diphtheriae', 'corynebacterium jeikeium', 'corynebacterium urealyticum', 'gram positive rods']
  },
  {
    slug: 'catalase-negative-nonsporeforming-rods',
    title: 'Catalase-Negative Non-Spore-Forming Rods',
    category: 'Bacteriology',
    summary: 'A focused page for Erysipelothrix, Arcanobacterium, Gardnerella, Lactobacillus, Leuconostoc-like organisms, and related Gram-positive rods that do not fit the Listeria/Corynebacterium lane.',
    whyItMatters: 'These organisms are easy to flatten into "odd Gram-positive rods," but exposure history, site, vancomycin pattern, H2S, hemolysis, and host context can make them testable and clinically meaningful.',
    principle: 'Catalase-negative non-spore-forming rods are interpreted by morphology, hemolysis, H2S or other key reactions, oxygen pattern, vancomycin behavior, genital/oral/GI flora context, and exposure history.',
    basicSteps: [
      'Confirm Gram-positive rods or coccobacilli and catalase-negative or weakly reactive pattern.',
      'Review the source: wound, genital, urine, blood, oral, GI, animal exposure, or immunocompromised host.',
      'Look for branch clues such as H2S, hemolysis, vancomycin resistance, or Gardnerella-like vaginal association.',
      'Avoid treating Lactobacillus-like recovery as disease unless the source and host make it meaningful.',
      'Use validated ID and AST guidance for unusual sterile-site isolates.'
    ],
    interpretation: [
      'Erysipelothrix is classically linked to animal or meat/fish exposure and can cause localized skin infection or systemic disease.',
      'Arcanobacterium can be linked to pharyngitis, wound infection, or skin/soft tissue contexts depending on species.',
      'Gardnerella is strongly tied to bacterial vaginosis context but can rarely appear in invasive disease.',
      'Lactobacillus is often normal flora, but immunocompromised sterile-site recovery can matter.',
      'Leuconostoc/Pediococcus-like organisms can resemble other Gram-positive organisms and may have intrinsic vancomycin resistance.'
    ],
    commonMistakes: [
      'Assuming all Lactobacillus-like isolates are pathogens.',
      'Missing exposure history for Erysipelothrix.',
      'Forgetting Gardnerella is usually interpreted in vaginal ecology rather than routine invasive bacteriology logic.',
      'Calling vancomycin resistance acquired when it may be intrinsic for the genus.'
    ],
    studentShortcut: 'For these rods, source and exposure do half the work.',
    relatedLinks: [
      { label: 'Gram-Positive Bacilli Overview', path: '/learn/gram-positive-bacilli-overview' },
      { label: 'Intrinsic Resistance Patterns', path: '/learn/intrinsic-resistance-patterns' },
      { label: 'Specimen Collection and Transport', path: '/learn/specimen-collection-transport' }
    ],
    tables: [
      {
        title: 'Catalase-Negative Rod Memory Map',
        columns: ['Organism/group', 'Where students should place it', 'Useful clinical anchor', 'Common pitfall'],
        rows: [
          ['Erysipelothrix rhusiopathiae', 'Catalase-negative Gram-positive rod with animal/meat/fish exposure logic', 'Erysipeloid-type skin infection, rarely bacteremia or endocarditis', 'Missing the exposure clue'],
          ['Arcanobacterium haemolyticum', 'Pharyngitis or skin/soft tissue lane', 'Pharyngitis-like illness and wound/skin infection context', 'Confusing with beta-hemolytic streptococci or diphtheroids'],
          ['Gardnerella vaginalis', 'Vaginal microbiome and bacterial vaginosis context', 'Clue-cell/vaginal ecology thinking, rare invasive disease', 'Overinterpreting outside the right specimen context'],
          ['Lactobacillus spp.', 'Normal oral, GI, and vaginal flora; occasional opportunist', 'Usually colonizer/contaminant, but bloodstream disease can occur in selected hosts', 'Calling every isolate infection'],
          ['Leuconostoc/Pediococcus-like organisms', 'Gram-positive cocci/rods that can confuse routine lanes', 'Rare opportunistic disease and intrinsic vancomycin resistance concepts', 'Treating vancomycin resistance as unexpected without genus context']
        ]
      },
      {
        title: 'Specimen Context Questions',
        columns: ['Question', 'Why it matters', 'Example'],
        rows: [
          ['Is there animal or occupational exposure?', 'Some organisms have exposure-driven significance', 'Erysipelothrix after fish, meat, animal, or puncture exposure'],
          ['Is this genital/vaginal material?', 'Normal ecology affects interpretation', 'Gardnerella or Lactobacillus may be part of a community pattern'],
          ['Is the patient immunocompromised?', 'Low-virulence organisms can become meaningful', 'Lactobacillus-like bacteremia in selected hosts'],
          ['Is the source sterile?', 'Sterile-site growth raises significance', 'Blood, CSF, deep tissue, or hardware-associated recovery'],
          ['Does the resistance pattern fit the genus?', 'Intrinsic resistance prevents false surprise', 'Vancomycin resistance in Leuconostoc/Pediococcus-like organisms']
        ]
      }
    ],
    keywords: ['erysipelothrix', 'arcanobacterium', 'gardnerella', 'lactobacillus', 'leuconostoc', 'pediococcus', 'catalase negative rods', 'non spore forming rods']
  },
  {
    slug: 'aerobic-actinomycetes',
    title: 'Aerobic Actinomycetes',
    category: 'Bacteriology',
    summary: 'A deeper organizer for branching aerobic Gram-positive rods: Nocardia, Rhodococcus, Gordonia, Tsukamurella, Streptomyces, Actinomadura, Dermatophilus, Nocardiopsis, and related organisms.',
    whyItMatters: 'Aerobic actinomycetes sit between routine bacteriology, AFB logic, environmental exposure, and opportunistic disease. Students need a branch map before species lists make sense.',
    principle: 'Separate aerobic actinomycetes by acid-fast behavior, branching morphology, colony texture, growth rate, exposure, host status, and whether the isolate came from a meaningful source.',
    basicSteps: [
      'Recognize branching, filamentous, beaded, or fragmented Gram-positive rod morphology.',
      'Ask whether modified acid-fast staining suggests Nocardia-like or other mycolic-acid-containing organisms.',
      'Review source and host: pulmonary disease, brain abscess, skin/soft tissue infection, catheter, wound, immunocompromised host, or environmental exposure.',
      'Avoid assuming every branching rod is Mycobacterium or every weakly acid-fast organism is Nocardia.',
      'Use reference identification and susceptibility guidance when clinically significant disease is suspected.'
    ],
    interpretation: [
      'Nocardia often links pulmonary disease, dissemination risk, CNS disease, cutaneous infection, and immunocompromised hosts.',
      'Rhodococcus can appear in pulmonary disease and bloodstream or catheter-associated settings, especially in immunocompromised patients.',
      'Gordonia and Tsukamurella can cause catheter-associated bloodstream infection, wound infection, or other opportunistic disease.',
      'Streptomyces, Actinomadura, and related non-acid-fast actinomycetes are often environmental but can cause skin, wound, mycetoma-like, or invasive disease in selected settings.',
      'Morphology is a warning light, not a final ID.'
    ],
    commonMistakes: [
      'Equating every branching rod with Nocardia.',
      'Forgetting that weak acid-fastness varies by organism and method.',
      'Ignoring pulmonary or CNS symptoms in an immunocompromised host.',
      'Reporting a low-confidence environmental isolate too aggressively without source context.'
    ],
    studentShortcut: 'For aerobic actinomycetes: branching rods plus source plus acid-fast behavior.',
    relatedLinks: [
      { label: 'Mycobacteria and Aerobic Actinomycetes', path: '/learn/mycobacteria-actinomycetes' },
      { label: 'Acid-Fast Stain', path: '/learn/acid-fast-stain' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Aerobic Actinomycete Branch Map',
        columns: ['Branch', 'Organisms to think about', 'Clinical anchors', 'Student warning'],
        rows: [
          ['Partially acid-fast branching rods', 'Nocardia and selected related genera', 'Pulmonary infection, brain abscess, skin/soft tissue disease, disseminated infection', 'Species-level ID and susceptibility can matter'],
          ['Mycolic-acid-containing related genera', 'Rhodococcus, Gordonia, Tsukamurella', 'Pulmonary disease, catheter-associated bacteremia, wound infection, immunocompromised host disease', 'May be mistaken for contaminants or other branching rods'],
          ['Non-acid-fast aerobic actinomycetes', 'Streptomyces, Actinomadura, Dermatophilus, Nocardiopsis, Oerskovia-like organisms', 'Environmental exposure, skin/soft tissue infection, mycetoma-like disease, rare invasive disease', 'Clinical significance depends heavily on source and host'],
          ['Corynebacterium overlap zone', 'Some coryneform or mycolic-acid-containing rods', 'Device infection, wound, bloodstream, respiratory, or opportunistic patterns', 'Use validated methods rather than morphology alone']
        ]
      },
      {
        title: 'When to Take the Isolate Seriously',
        columns: ['Signal', 'Why it matters', 'Next thought'],
        rows: [
          ['Pulmonary specimen plus compatible imaging or chronic symptoms', 'Nocardia and related organisms can cause lung disease', 'Review host risk and request proper workup'],
          ['Brain abscess or CNS disease context', 'Disseminated nocardiosis can involve CNS', 'Escalate identification and susceptibility questions'],
          ['Repeated catheter or blood culture recovery', 'Rhodococcus, Gordonia, and Tsukamurella can be device-associated', 'Do not dismiss automatically'],
          ['Skin trauma, soil, thorn, animal, or environmental exposure', 'Some actinomycetes enter through skin disruption', 'Think cutaneous or mycetoma-like disease'],
          ['Immunocompromised host', 'Low-virulence environmental organisms become more meaningful', 'Interpret source and repeat recovery carefully']
        ]
      }
    ],
    keywords: ['aerobic actinomycetes', 'nocardia', 'rhodococcus', 'gordonia', 'tsukamurella', 'streptomyces', 'actinomadura', 'dermatophilus', 'branching gram positive rods', 'modified acid fast']
  },
  makeStarterTopic({
    slug: 'gram-negative-rods-overview',
    title: 'Gram-Negative Rods Overview',
    category: 'Bacteriology',
    summary: 'A high-level organizer for Enterobacterales, nonfermenters, curved rods, fastidious rods, and environmental Gram-negative rods.',
    anchors: [
      'Enterobacterales: often oxidase negative and MacConkey-growing',
      'Nonfermenters: often oxidative or nonfermentative metabolism',
      'Curved rods: water, foodborne, or microaerophilic patterns',
      'Fastidious rods: special media, CO2, or syndrome-based testing'
    ],
    keywords: ['gram negative rods', 'enterobacterales', 'nonfermenters', 'fastidious gram negative rods']
  }),
  makeStarterTopic({
    slug: 'enterobacterales',
    title: 'Enterobacterales',
    category: 'Bacteriology',
    summary: 'A study page for common enteric Gram-negative rods, lactose reaction, oxidase, IMViC, H2S, urease, decarboxylases, and stool-pathogen thinking.',
    anchors: [
      'MacConkey reaction: lactose fermenter versus non-lactose fermenter',
      'Oxidase: usually negative for classic Enterobacterales',
      'H2S and urease: useful branch clues',
      'Stool context: Salmonella, Shigella, STEC, Yersinia, and related workups'
    ],
    keywords: ['enterobacterales', 'enterobacteriaceae', 'e coli', 'klebsiella', 'salmonella', 'shigella', 'proteus'],
    relatedLinks: [
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'MacConkey Agar', path: '/learn/macconkey-agar' },
      { label: 'Media Selection Patterns', path: '/learn/media-selection-patterns' }
    ]
  }),
  makeStarterTopic({
    slug: 'nonfermenting-gram-negative-rods',
    title: 'Nonfermenting Gram-Negative Rods',
    category: 'Bacteriology',
    summary: 'A review page for Pseudomonas-like organisms, Acinetobacter, Stenotrophomonas, Burkholderia, and other nonfermenter patterns.',
    anchors: [
      'Oxidase pattern: separates major nonfermenter branches',
      'Pigment and odor: useful but not final identification',
      'Resistance profile: often clinically important',
      'Patient context: devices, ICU, cystic fibrosis, water exposure, or immunocompromise'
    ],
    keywords: ['nonfermenters', 'pseudomonas', 'acinetobacter', 'stenotrophomonas', 'burkholderia']
  }),
  makeStarterTopic({
    slug: 'curved-water-associated-gram-negative-rods',
    title: 'Curved and Water-Associated Gram-Negative Rods',
    category: 'Bacteriology',
    summary: 'A study page for Vibrio, Aeromonas, Chromobacterium, and related water, seafood, wound, and gastrointestinal Gram-negative rod patterns.',
    anchors: [
      'Exposure: seafood, brackish water, freshwater, wounds, travel, or contaminated water',
      'Oxidase: often positive, so do not force Enterobacterales logic',
      'Syndrome: watery diarrhea, wound infection, sepsis, or rare invasive disease',
      'Media and salt: TCBS, salt tolerance, and growth conditions can guide the branch'
    ],
    keywords: ['vibrio', 'aeromonas', 'chromobacterium', 'curved gram negative rods', 'waterborne bacteria', 'seafood infection'],
    relatedLinks: [
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Oxidase Test', path: '/learn/oxidase-test' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' }
    ]
  }),
  makeStarterTopic({
    slug: 'fastidious-gram-negative-rods-and-coccobacilli',
    title: 'Fastidious Gram-Negative Rods and Coccobacilli',
    category: 'Bacteriology',
    summary: 'A study page for Haemophilus, Pasteurella, HACEK-like organisms, Eikenella, Moraxella-like organisms, and other source-driven Gram-negative coccobacilli.',
    anchors: [
      'Growth: chocolate agar, CO2, X/V factor, slow growth, or reference identification may be needed',
      'Source: respiratory tract, oral flora, animal bite, wound, blood culture, eye, or genital source',
      'Shape: small Gram-negative rods, coccobacilli, cocci, or pleomorphic forms can overlap',
      'Significance: sterile-site recovery, endocarditis context, and bite wounds change interpretation'
    ],
    keywords: ['haemophilus', 'pasteurella', 'eikenella', 'hacek', 'capnocytophaga', 'kingella', 'aggregatibacter', 'fastidious gram negative rods'],
    relatedLinks: [
      { label: 'Culture Media', path: '/learn/culture-media' },
      { label: 'Neisseria and Moraxella', path: '/learn/neisseria-moraxella' },
      { label: 'Oxidase Test', path: '/learn/oxidase-test' }
    ]
  }),
  makeStarterTopic({
    slug: 'campylobacter-helicobacter-arcobacter',
    title: 'Campylobacter, Helicobacter, and Arcobacter',
    category: 'Bacteriology',
    summary: 'A study page for curved microaerophilic Gram-negative rods: stool pathogens, gastric Helicobacter logic, selective media, oxidase/catalase patterns, and incubation clues.',
    anchors: [
      'Shape and atmosphere: curved Gram-negative rods often need microaerophilic conditions',
      'Source: stool, gastric biopsy, blood, abscess, animal exposure, or foodborne exposure',
      'Temperature: common Campylobacter stool workflows often use higher incubation temperatures',
      'Branch tests: oxidase, catalase, hippurate, urease, nitrate, H2S, and growth conditions'
    ],
    keywords: ['campylobacter', 'helicobacter', 'arcobacter', 'curved gram negative rods', 'microaerophilic bacteria', 'hippurate', 'urease'],
    relatedLinks: [
      { label: 'Curved Water-Associated Gram-Negative Rods', path: '/learn/curved-water-associated-gram-negative-rods' },
      { label: 'Oxidase Test', path: '/learn/oxidase-test' },
      { label: 'Culture Media', path: '/learn/culture-media' }
    ]
  }),
  makeStarterTopic({
    slug: 'zoonotic-and-safety-sensitive-gram-negative-agents',
    title: 'Zoonotic and Safety-Sensitive Gram-Negative Agents',
    category: 'Bacteriology',
    summary: 'A study page for Bartonella, Brucella, Bordetella, Francisella, and related organisms where animal/vector exposure, biosafety, and public health context shape the workup.',
    anchors: [
      'Exposure: cats, rabbits, rodents, livestock, dogs, ticks, fleas, lice, aerosols, or animal products',
      'Safety: some organisms require reduced manipulation, referral, or public health awareness',
      'Syndrome: lymphadenopathy, prolonged fever, cough, tularemia forms, cat-scratch disease, or brucellosis',
      'Testing: culture may be slow, risky, insensitive, or secondary to serology/NAAT/reference methods'
    ],
    keywords: ['bartonella', 'brucella', 'bordetella', 'francisella', 'tularemia', 'brucellosis', 'pertussis', 'cat scratch disease', 'zoonotic bacteria'],
    relatedLinks: [
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' }
    ]
  }),
  makeStarterTopic({
    slug: 'anaerobic-bacteria',
    title: 'Anaerobic Bacteria',
    category: 'Bacteriology',
    summary: 'A page for anaerobic specimen quality, oxygen sensitivity, Bacteroides-like groups, Clostridium-like rods, anaerobic cocci, and special media clues.',
    anchors: [
      'Specimen quality: aspirate or tissue beats superficial swab',
      'Oxygen sensitivity: transport and processing affect recovery',
      'Gram pattern: rods, cocci, spores, pigment, and pleomorphism',
      'Selective media: BBE, LKV, and special-potency disk logic'
    ],
    keywords: ['anaerobes', 'bacteroides', 'clostridium', 'anaerobic cocci', 'bbe', 'lkv'],
    relatedLinks: [{ label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' }]
  }),
  makeStarterTopic({
    slug: 'mycobacteria-actinomycetes',
    title: 'Mycobacteria and Aerobic Actinomycetes',
    category: 'Bacteriology',
    summary: 'A student organizer for AFB stains, tuberculosis complex safety logic, nontuberculous mycobacteria, rapid growers, Nocardia, and branching aerobic actinomycetes.',
    anchors: [
      'AFB smear: screening clue, not species identification',
      'Tuberculosis concern: safety, NAAT, culture, and public health workflow',
      'NTM: slow growers, rapid growers, pigment groups, and clinical context',
      'Specimen workflow: sterile versus nonsterile processing changes the path',
      'Nocardia: branching, weakly acid-fast, and aerobic actinomycete logic'
    ],
    keywords: ['mycobacteria', 'tuberculosis', 'ntm', 'runyon', 'rapid growing mycobacteria', 'nocardia', 'actinomycetes', 'afb'],
    relatedLinks: [{ label: 'Special Pathogens Hub', path: '/special-pathogens' }]
  }),
  makeStarterTopic({
    slug: 'spirochetes-cell-wall-deficient-intracellular-agents',
    title: 'Spirochetes, Cell-Wall-Deficient, and Intracellular Agents',
    category: 'Bacteriology',
    summary: 'A page for organisms that do not fit routine Gram stain and plate logic, including Treponema, Borrelia, Leptospira, Mycoplasma, Chlamydia, Rickettsia, and Coxiella.',
    anchors: [
      'Treponemes: venereal and nonvenereal disease patterns, serology algorithms, and titer follow-up',
      'Borrelia and Leptospira: exposure history, staged illness, and specimen timing organize testing',
      'Chlamydia/Rickettsial agents: intracellular biology changes culture and testing expectations',
      'Mycoplasma/Ureaplasma: no cell wall, special collection, and NAAT/culture logic',
      'Safety and referral: some agents require special handling'
    ],
    keywords: ['spirochetes', 'treponema', 'syphilis testing', 'rpr', 'vdrl', 'lyme serology', 'borrelia', 'leptospira', 'mycoplasma', 'ureaplasma', 'chlamydia', 'rickettsia', 'coxiella'],
    relatedLinks: [
      { label: 'Serology Interpretation', path: '/learn/serology-interpretation' },
      { label: 'Molecular Diagnostics Basics', path: '/learn/molecular-diagnostics-basics' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ]
  }),
  makeStarterTopic({
    slug: 'mycology-overview',
    title: 'Mycology Overview',
    category: 'Mycology',
    summary: 'A first-pass map for fungal diagnostics: specimen type, direct exam, culture, yeast versus mold, dimorphic fungi, antigen, serology, and molecular methods.',
    anchors: [
      'Direct exam: KOH, calcofluor, Gram stain, GMS, or histopathology clues',
      'Culture: yeast, mold, dermatophyte, and dimorphic growth patterns',
      'Antigen/serology: useful for selected systemic fungi',
      'Safety: dimorphic fungi and mold manipulation can matter'
    ],
    keywords: ['mycology', 'fungi', 'yeast', 'mold', 'dermatophytes', 'dimorphic fungi', 'fungal classification', 'opportunistic fungi'],
    relatedLinks: [
      { label: 'Fungal Diagnostic Methods', path: '/learn/fungal-diagnostics' },
      { label: 'Molds, Dermatophytes, and Dimorphic Fungi', path: '/learn/molds-dermatophytes-dimorphic-fungi' },
      { label: 'Yeasts', path: '/learn/yeasts' }
    ]
  }),
  makeStarterTopic({
    slug: 'yeasts',
    title: 'Yeasts',
    category: 'Mycology',
    summary: 'A starter page for Candida, Cryptococcus, Malassezia, Trichosporon, Rhodotorula, and yeast identification clues.',
    anchors: [
      'Candida: germ tube, chromogenic media, species-level significance',
      'Cryptococcus: capsule, cryptococcal antigen, CNS context',
      'Malassezia: lipid dependence and skin/blood culture context',
      'Unusual yeasts: interpret by site, host, and repeated recovery'
    ],
    keywords: ['yeasts', 'candida', 'cryptococcus', 'malassezia', 'trichosporon', 'rhodotorula', 'candidemia', 'cryptococcal antigen'],
    relatedLinks: [
      { label: 'Fungal Diagnostic Methods', path: '/learn/fungal-diagnostics' },
      { label: 'Mycology Overview', path: '/learn/mycology-overview' }
    ]
  }),
  makeStarterTopic({
    slug: 'molds-dermatophytes-dimorphic-fungi',
    title: 'Molds, Dermatophytes, and Dimorphic Fungi',
    category: 'Mycology',
    summary: 'A study organizer for hyaline molds, dematiaceous molds, Mucorales, dermatophytes, and thermally dimorphic fungi.',
    anchors: [
      'Hyaline molds: septate hyphae and conidial structures',
      'Mucorales: broad pauciseptate hyphae and tissue invasion risk',
      'Dermatophytes: skin, hair, nail infection patterns',
      'Dimorphic fungi: mold in environment and yeast/tissue forms in host'
    ],
    keywords: ['molds', 'dermatophytes', 'aspergillus', 'mucorales', 'dimorphic fungi', 'histoplasma', 'blastomyces', 'coccidioides', 'sporothrix'],
    relatedLinks: [
      { label: 'Fungal Diagnostic Methods', path: '/learn/fungal-diagnostics' },
      { label: 'Mycology Overview', path: '/learn/mycology-overview' }
    ]
  }),
  makeStarterTopic({
    slug: 'fungal-diagnostics',
    title: 'Fungal Diagnostic Methods',
    category: 'Mycology',
    summary: 'A page for fungal stains, culture setup, antigen tests, serology, molecular methods, and when histopathology matters.',
    anchors: [
      'Direct stains: rapid morphology clues',
      'Culture: recovery and identification but may be slow',
      'Antigen tests: useful in selected invasive or endemic infections',
      'Histopathology: tissue invasion and morphology context'
    ],
    keywords: ['fungal diagnostics', 'koh', 'calcofluor', 'gms', 'fungal culture', 'galactomannan', 'beta d glucan', 'india ink', 'fungal stains', 'fungal media'],
    relatedLinks: [
      { label: 'Culture Media', path: '/learn/culture-media' },
      { label: 'Stain Selection and Screening', path: '/learn/stain-selection-and-screening' },
      { label: 'Molecular Diagnostics Basics', path: '/learn/molecular-diagnostics-basics' }
    ]
  }),
  makeStarterTopic({
    slug: 'parasitology-overview',
    title: 'Parasitology Overview',
    category: 'Parasitology',
    summary: 'A first-pass map for parasite diagnosis by specimen type, life stage, geography, exposure, concentration method, stain, antigen, serology, and molecular testing.',
    anchors: [
      'Specimen type: stool, blood, tissue, urine, sputum, or other site',
      'Life stage: trophozoite, cyst, oocyst, egg, larva, adult, or microfilaria',
      'Exposure: travel, food, water, vector, animal, or immunocompromise',
      'Method: microscopy, concentration, stain, antigen, serology, or NAAT'
    ],
    keywords: ['parasitology', 'parasites', 'ova and parasite', 'protozoa', 'helminths', 'malaria']
  }),
  makeStarterTopic({
    slug: 'stool-ova-and-parasite',
    title: 'Stool Ova and Parasite Exam',
    category: 'Parasitology',
    summary: 'A practical page for stool O&P collection, preservatives, concentration, permanent stain, and reporting discipline.',
    anchors: [
      'Collection: multiple specimens may be needed depending on policy',
      'Preservatives: preserve morphology for different methods',
      'Concentration: improves recovery of eggs, larvae, cysts, and oocysts',
      'Permanent stain: supports protozoan identification'
    ],
    keywords: ['stool ova and parasite', 'o&p', 'stool parasite', 'concentration', 'trichrome']
  }),
  makeStarterTopic({
    slug: 'intestinal-protozoa',
    title: 'Intestinal Protozoa',
    category: 'Parasitology',
    summary: 'A study page for Giardia, Entamoeba, Dientamoeba, Cryptosporidium, Cyclospora, Cystoisospora, microsporidia, and related intestinal protozoa.',
    anchors: [
      'Amoebae: morphology and pathogenic versus nonpathogenic distinction',
      'Flagellates: motility, trophozoites, cysts, and antigen/NAAT options',
      'Coccidia: modified acid-fast and immunocompromised host context',
      'Microsporidia: special stains and molecular methods'
    ],
    keywords: ['intestinal protozoa', 'giardia', 'entamoeba', 'cryptosporidium', 'cyclospora', 'microsporidia']
  }),
  makeStarterTopic({
    slug: 'helminths',
    title: 'Helminths',
    category: 'Parasitology',
    summary: 'A student organizer for nematodes, cestodes, trematodes, eggs, larvae, adult worms, tissue disease, and exposure patterns.',
    anchors: [
      'Nematodes: roundworms, larvae, eggs, and tissue migration',
      'Cestodes: tapeworm segments, eggs, and larval tissue disease',
      'Trematodes: flukes, operculated eggs, and exposure clues',
      'Morphology: size, shell, spine, plug, or segment features'
    ],
    keywords: ['helminths', 'nematodes', 'cestodes', 'trematodes', 'worms', 'parasite eggs']
  }),
  makeStarterTopic({
    slug: 'blood-and-tissue-parasites',
    title: 'Blood and Tissue Parasites',
    category: 'Parasitology',
    summary: 'A page for blood films, tissue specimens, serology, molecular tests, and parasite patterns outside routine stool O&P.',
    anchors: [
      'Blood film: malaria, Babesia, trypanosomes, and microfilariae',
      'Tissue diagnosis: Leishmania, Toxoplasma, free-living amoebae, and helminth larvae',
      'Serology: useful when organisms are hard to see directly',
      'Exposure: vector, travel, transfusion, animal, or congenital risk'
    ],
    keywords: ['blood parasites', 'tissue parasites', 'babesia', 'trypanosoma', 'leishmania', 'toxoplasma', 'microfilariae']
  }),
  makeStarterTopic({
    slug: 'malaria-blood-films',
    title: 'Malaria and Blood Films',
    category: 'Parasitology',
    summary: 'A focused page for thick and thin blood films, Plasmodium species clues, parasitemia, and urgent reporting logic.',
    anchors: [
      'Thick film: sensitivity for parasite detection',
      'Thin film: species features and parasitemia estimation',
      'Species clues: infected RBC size, forms, stippling, gametocytes, and parasite stages',
      'Urgency: malaria suspicion requires timely smear review and communication'
    ],
    keywords: ['malaria', 'plasmodium', 'blood film', 'thick smear', 'thin smear', 'parasitemia']
  }),
  makeStarterTopic({
    slug: 'virology-overview',
    title: 'Virology Overview',
    category: 'Virology',
    summary: 'A first-pass map for viral structure, specimen timing, NAAT, antigen detection, serology, viral load, genotyping, and public health context.',
    anchors: [
      'Specimen timing: viral shedding and immune response change over time',
      'NAAT: detects viral nucleic acid rapidly',
      'Serology: detects host response and immunity patterns',
      'Viral load/genotyping: monitors disease or resistance in selected infections'
    ],
    keywords: ['virology', 'viruses', 'viral diagnosis', 'viral naat', 'serology', 'viral load']
  }),
  makeStarterTopic({
    slug: 'respiratory-viruses',
    title: 'Respiratory Viruses',
    category: 'Virology',
    summary: 'A review page for influenza, RSV, parainfluenza, adenovirus, rhinovirus/enterovirus, seasonal coronaviruses, SARS-CoV-2, and respiratory panels.',
    anchors: [
      'Specimen: nasopharyngeal or respiratory specimen quality matters',
      'Timing: early collection improves detection',
      'Panels: detect many targets but require clinical interpretation',
      'Outbreak context: infection control and public health may matter'
    ],
    keywords: ['respiratory viruses', 'influenza', 'rsv', 'adenovirus', 'sars cov 2', 'respiratory panel']
  }),
  makeStarterTopic({
    slug: 'herpesviruses',
    title: 'Herpesviruses',
    category: 'Virology',
    summary: 'A study page for HSV, VZV, CMV, EBV, HHV-6, latency, reactivation, specimen selection, NAAT, serology, and viral load concepts.',
    anchors: [
      'HSV/VZV: lesion, CSF, ocular, or mucosal specimen logic',
      'CMV: viral load monitoring and immunocompromised host context',
      'EBV: serology patterns and lymphoproliferative context',
      'Latency/reactivation: detection may not always mean primary infection'
    ],
    keywords: ['herpesviruses', 'hsv', 'vzv', 'cmv', 'ebv', 'hhv6', 'viral load']
  }),
  makeStarterTopic({
    slug: 'hepatitis-viruses',
    title: 'Hepatitis Viruses',
    category: 'Virology',
    summary: 'A page for HAV, HBV, HCV, HDV, HEV, serologic markers, viral load, acute versus chronic infection, and immunity patterns.',
    anchors: [
      'HAV/HEV: often acute enteric transmission patterns',
      'HBV: antigen and antibody combinations define stage and immunity',
      'HCV: antibody screening plus RNA confirmation logic',
      'Chronic infection: viral load and treatment monitoring may matter'
    ],
    keywords: ['hepatitis viruses', 'hav', 'hbv', 'hcv', 'hdv', 'hev', 'hepatitis serology']
  }),
  makeStarterTopic({
    slug: 'hiv-basics',
    title: 'HIV Basics',
    category: 'Virology',
    summary: 'A student page for HIV screening, differentiation assays, viral load, CD4 monitoring, resistance testing, and window-period thinking.',
    anchors: [
      'Screening: antigen/antibody algorithms improve early detection',
      'Confirmation: differentiation and nucleic acid testing resolve patterns',
      'Viral load: monitors therapy and disease activity',
      'Resistance: genotype guides selected therapy decisions'
    ],
    keywords: ['hiv', 'hiv testing', 'viral load', 'cd4', 'hiv resistance', 'antigen antibody']
  }),
  makeStarterTopic({
    slug: 'congenital-and-cns-viral-infections',
    title: 'Congenital and CNS Viral Infections',
    category: 'Virology',
    summary: 'A review page for viral infections where timing, specimen choice, immune status, pregnancy, neonates, and CSF testing are especially important.',
    anchors: [
      'Congenital infection: maternal timing and fetal/neonatal specimen logic',
      'CNS infection: CSF NAAT and syndrome timing matter',
      'Immunocompromised host: reactivation and viral load patterns matter',
      'Serology limits: IgM, IgG, avidity, and paired samples require caution'
    ],
    keywords: ['congenital viral infection', 'viral meningitis', 'viral encephalitis', 'csf pcr', 'cmv', 'rubella', 'zika']
  }),
  makeStarterTopic({
    slug: 'molecular-diagnostics-basics',
    title: 'Molecular Diagnostics Basics',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A foundation page for extraction, amplification, target selection, controls, contamination prevention, inhibition, and result interpretation.',
    anchors: [
      'Extraction: releases and purifies nucleic acid',
      'Amplification: increases target signal',
      'Controls: prove the run and specimen are interpretable',
      'Contamination/inhibition: major molecular testing pitfalls'
    ],
    keywords: ['molecular diagnostics', 'extraction', 'amplification', 'controls', 'inhibition', 'contamination']
  }),
  makeStarterTopic({
    slug: 'pcr-naat',
    title: 'PCR and NAAT',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A study page for PCR, RT-PCR, real-time amplification, cycle threshold concepts, multiplex panels, and result limitations.',
    anchors: [
      'PCR: amplifies DNA target',
      'RT-PCR: converts RNA to DNA before amplification',
      'Real-time PCR: detects signal during amplification',
      'Multiplex NAAT: detects many targets but still needs context'
    ],
    keywords: ['pcr', 'naat', 'rt pcr', 'real time pcr', 'cycle threshold', 'multiplex panel']
  }),
  makeStarterTopic({
    slug: 'sequencing-basics',
    title: 'Sequencing Basics',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A starter page for sequence-based identification, resistance detection, outbreak relatedness, and why database quality matters.',
    anchors: [
      'Targeted sequencing: identifies selected genes or regions',
      '16S/ITS concepts: useful for difficult bacterial or fungal identification',
      'Whole genome sequencing: supports outbreak and resistance analysis',
      'Database quality: determines confidence and interpretation'
    ],
    keywords: ['sequencing', '16s', 'its sequencing', 'whole genome sequencing', 'wgs', 'molecular identification']
  }),
  makeStarterTopic({
    slug: 'maldi-tof-basics',
    title: 'MALDI-TOF Basics',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A practical page for MALDI-TOF organism identification, colony quality, database matching, score interpretation, and method limitations.',
    anchors: [
      'Protein spectrum: organism fingerprint compared with database',
      'Pure colony: mixed growth can confuse the result',
      'Score/confidence: tells how strong the match is',
      'Database limits: rare or close organisms may require confirmation'
    ],
    keywords: ['maldi tof', 'mass spectrometry', 'organism identification', 'protein spectrum']
  }),
  makeStarterTopic({
    slug: 'immunoassays',
    title: 'Immunoassays',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A study page for antigen-antibody methods including lateral flow, EIA, agglutination, immunofluorescence, sensitivity, specificity, and cross-reactivity.',
    anchors: [
      'Antigen detection: finds organism target or toxin',
      'Antibody detection: finds host response',
      'Rapid tests: useful but performance varies',
      'Cross-reactivity: false positives can occur'
    ],
    keywords: ['immunoassay', 'antigen test', 'antibody test', 'eia', 'elisa', 'lateral flow', 'agglutination']
  }),
  makeStarterTopic({
    slug: 'serology-interpretation',
    title: 'Serology Interpretation',
    category: 'Molecular and Immunodiagnostics',
    summary: 'A page for IgM, IgG, seroconversion, paired sera, avidity, titers, cross-reactivity, and timing traps.',
    anchors: [
      'IgM: can suggest recent response but is not perfect',
      'IgG: past exposure, immunity, or later response depending on disease',
      'Paired sera: rising titer can support recent infection',
      'Avidity: helps date selected infections'
    ],
    keywords: ['serology', 'igm', 'igg', 'titer', 'seroconversion', 'paired sera', 'avidity']
  }),
  makeStarterTopic({
    slug: 'unknown-isolate-thinking',
    title: 'Unknown Isolate Thinking',
    category: 'Bench and Exam Integration',
    summary: 'A page for moving from Gram stain and colony clues to the next best branch without randomly collecting tests.',
    anchors: [
      'Start broad: Gram reaction, shape, arrangement, and specimen',
      'Use growth clues: media, atmosphere, colony morphology',
      'Pick branch tests: catalase, oxidase, coagulase, or other high-yield split',
      'Stop when safety or special testing changes the path'
    ],
    keywords: ['unknown isolate', 'organism workup', 'bench reasoning', 'gram stain workup'],
    relatedLinks: [{ label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }]
  }),
  makeStarterTopic({
    slug: 'syndrome-to-test-thinking',
    title: 'Syndrome-to-Test Thinking',
    category: 'Bench and Exam Integration',
    summary: 'A guide to choosing tests from the clinical problem instead of starting with a memorized organism list.',
    anchors: [
      'Syndrome: respiratory, CNS, GI, genital, blood, wound, or systemic',
      'Specimen: choose the site and container that answer the question',
      'Method: stain, culture, antigen, serology, NAAT, or referral',
      'Timing: early, late, acute, convalescent, or treatment-monitoring phase'
    ],
    keywords: ['syndrome to test', 'diagnostic strategy', 'specimen selection', 'test selection'],
    relatedLinks: [{ label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' }]
  }),
  makeStarterTopic({
    slug: 'ascp-m-microbiology-study-path',
    title: 'M(ASCP) Microbiology Study Path',
    category: 'Bench and Exam Integration',
    summary: 'A learner-first study path for M(ASCP) microbiology review before moving into more advanced specialist-level material.',
    anchors: [
      'Foundations: taxonomy, structure, host interaction, safety',
      'Methods: stains, culture, diagnostic strategy, AST',
      'Organisms: bacteriology first, then mycology, parasitology, virology',
      'Integration: unknowns, syndromes, tables, and exam traps'
    ],
    keywords: ['ascp m', 'm ascp', 'microbiology exam', 'certification study path', 'medical laboratory scientist'],
    relatedLinks: [{ label: 'Certification Study Paths', path: '/certification-study-paths' }]
  }),
  makeStarterTopic({
    slug: 'high-yield-comparison-tables',
    title: 'High-Yield Comparison Tables',
    category: 'Bench and Exam Integration',
    summary: 'A planned collection of Learn Microbes comparison tables for organisms, tests, media, stains, resistance mechanisms, and diagnostic methods.',
    anchors: [
      'Organism comparisons: similar names or similar reactions',
      'Method comparisons: culture versus NAAT versus serology',
      'Media comparisons: what each plate selects or differentiates',
      'Resistance comparisons: mechanism, gene, phenotype, and affected drug class'
    ],
    keywords: ['high yield tables', 'comparison tables', 'microbiology review tables', 'exam tables']
  }),
  makeStarterTopic({
    slug: 'common-microbiology-exam-traps',
    title: 'Common Microbiology Exam Traps',
    category: 'Bench and Exam Integration',
    summary: 'A study guide for common traps: confusing colonization with infection, overtrusting one reaction, missing specimen quality, and mixing up similar organisms.',
    anchors: [
      'Specimen trap: poor specimen creates poor interpretation',
      'Reaction trap: one test rarely equals final identification',
      'Name trap: similar organisms can differ clinically',
      'Method trap: culture, NAAT, antigen, and serology answer different questions'
    ],
    keywords: ['microbiology exam traps', 'ascp microbiology', 'study mistakes', 'exam review']
  })
];

const previousBatchDetailTables: Record<string, LearnTopic['tables']> = {
  'blood-cultures-and-sterile-fluids': [
    {
      title: 'Common Blood Culture Organism Buckets',
      columns: ['Bucket', 'Organisms students should expect', 'Interpretation habit'],
      rows: [
        ['Always take seriously until proven otherwise', 'S. aureus, S. pneumoniae, beta-hemolytic streptococci, Enterobacterales, Pseudomonas, anaerobic pathogens, Candida and other yeasts', 'Rapid communication and source evaluation are usually needed'],
        ['Skin flora that can be real disease', 'Coagulase-negative staphylococci, Corynebacterium-like rods, Cutibacterium, Bacillus-like rods', 'Number of positive sets, devices, prosthetic material, and immune status decide meaning'],
        ['Endocarditis-associated organisms', 'Viridans streptococci, nutritionally variant streptococci, enterococci, S. aureus, HACEK organisms, Coxiella/Bartonella by history', 'Blood culture pattern plus valve/device history matters'],
        ['Healthcare/device-associated organisms', 'CoNS, S. aureus, Enterococcus, Candida, Pseudomonas, nonfermenters, coryneforms, Cutibacterium', 'Line draws, differential time-to-positivity, and repeat cultures may be part of the workup'],
        ['Anaerobic bloodstream infection clues', 'Bacteroides, Clostridium, Fusobacterium, anaerobic cocci', 'Think intra-abdominal, pelvic, oral, necrotic tissue, or deep abscess source']
      ]
    },
    {
      title: 'Endocarditis Organism Memory Table',
      columns: ['Clinical context', 'Organisms to keep in mind', 'Student warning'],
      rows: [
        ['Native valve, community pattern', 'Viridans streptococci, S. aureus, enterococci, HACEK organisms', 'Oral/dental, skin, urinary, and GI sources all matter'],
        ['Prosthetic valve or device', 'Coagulase-negative staphylococci, S. aureus, Cutibacterium, Corynebacterium-like organisms, Candida rarely', 'Low-virulence organisms become important with hardware'],
        ['Injection drug use', 'S. aureus most common; also streptococci, Gram-negative rods, fungi, polymicrobial patterns', 'Right-sided disease and septic pulmonary emboli can be clues'],
        ['Culture-negative endocarditis', 'Coxiella, Bartonella, Brucella, HACEK after antibiotics, nutritionally variant streptococci, fungi', 'Exposure history drives serology, molecular, and reference testing'],
        ['GI or GU association', 'Enterococcus, Streptococcus gallolyticus group, Gram-negative rods in selected cases', 'Source evaluation can be clinically important']
      ]
    },
    {
      title: 'Blood Culture Collection and System Logic',
      columns: ['Concept', 'What students should remember', 'Why it matters'],
      rows: [
        ['Blood volume', 'Volume is one of the most important yield variables; pediatric volume is scaled to patient size', 'Underfilled bottles can miss bacteremia'],
        ['Number of sets', 'Multiple sets help distinguish true bacteremia from contamination', 'One positive bottle means less than repeated positives in many contexts'],
        ['Aerobic and anaerobic bottles', 'Bottle pairing broadens recovery and helps source interpretation', 'Anaerobic bottle positivity can point toward anaerobes or facultative organisms'],
        ['Continuous-monitoring systems', 'Modern instruments detect microbial metabolism or gas changes rather than waiting for visible growth', 'Time to positivity is a clue, not a final ID'],
        ['Prior antibiotics', 'Antibiotics can reduce yield', 'Collect before therapy when clinically feasible'],
        ['Fungal or mycobacterial blood culture', 'Special bottles/media may be needed for selected organisms', 'Routine bacterial blood culture is not every bloodstream organism workflow']
      ]
    },
    {
      title: 'Body Fluid Collection and Culture Sites',
      columns: ['Body area', 'Specimen students may see', 'Core microbiology question'],
      rows: [
        ['Thorax', 'Pleural fluid or empyema fluid', 'Is this a sterile-space infection, pneumonia complication, malignancy-related process, or noninfectious effusion?'],
        ['Abdominal cavity', 'Ascitic or peritoneal fluid', 'Does the fluid suggest spontaneous bacterial peritonitis, secondary peritonitis, catheter-related infection, or contamination?'],
        ['Joint', 'Synovial fluid', 'Is the process bacterial arthritis, crystal disease with inflammation, Lyme/gonococcal disease, fungal/mycobacterial infection, or viral arthritis?'],
        ['Pericardium', 'Pericardial fluid', 'Is the cause viral, bacterial, TB/fungal, malignancy-associated, autoimmune, or postoperative?'],
        ['Deep tissue or aspirate', 'Needle aspirate, operative tissue, abscess material', 'Does collection preserve anaerobes, fastidious organisms, fungi, mycobacteria, and molecular options?']
      ]
    },
    {
      title: 'Pleural Fluid Infection Pattern Anchors',
      columns: ['Finding pattern', 'Student interpretation', 'Microbiology habit'],
      rows: [
        ['Clear, low-cell fluid with chemistry suggesting transudate', 'Often systemic fluid-balance disease rather than primary infection', 'Culture is usually low-yield unless clinical evidence points to infection'],
        ['Cloudy or purulent fluid with many WBCs', 'Exudative inflammation or empyema is possible', 'Request Gram stain and aerobic/anaerobic culture promptly'],
        ['Low glucose or high LDH/protein pattern', 'Supports inflammatory or infectious exudate but is not organism-specific', 'Pair chemistry with cell count, Gram stain, culture, and clinical source'],
        ['Clotted or very bloody specimen', 'May complicate cell count or culture interpretation', 'Collection container and transport timing matter'],
        ['Pneumonia plus pleural collection', 'Parapneumonic effusion or empyema enters the differential', 'Think S. pneumoniae, S. aureus, streptococci, anaerobes, and Gram-negative rods by host setting']
      ]
    },
    {
      title: 'Pericarditis and Myocarditis Etiology Anchors',
      columns: ['Category', 'Agents to remember', 'Testing direction'],
      rows: [
        ['Viral common causes', 'Enteroviruses including coxsackieviruses, adenovirus, influenza, and other respiratory viruses', 'Serology is often less useful than syndrome-based PCR or clinical diagnosis; specimen choice varies'],
        ['Bacterial uncommon but serious', 'S. aureus, S. pneumoniae, streptococci, Gram-negative rods, Mycobacterium tuberculosis, and selected fastidious organisms', 'Culture sterile fluid/tissue when available and alert the bench for special handling'],
        ['Fungal uncommon causes', 'Coccidioides, Histoplasma, Aspergillus, Candida, Cryptococcus, and other fungi by host/geography', 'Use culture, histopathology, antigen/serology, and exposure history together'],
        ['Parasitic rare causes', 'Toxoplasma and Entamoeba in selected clinical contexts', 'Usually requires targeted serology, molecular, tissue, or reference-lab support'],
        ['Postoperative or device context', 'Skin flora, S. aureus, Gram-negative rods, Candida, and polymicrobial patterns', 'Interpret with surgical history, hardware, and specimen quality']
      ]
    },
    {
      title: 'Infectious Arthritis Etiology Anchors',
      columns: ['Clinical lane', 'Organisms to compare', 'Student warning'],
      rows: [
        ['Acute bacterial septic arthritis', 'S. aureus, streptococci, N. gonorrhoeae, Gram-negative rods depending on age/risk', 'Synovial fluid Gram stain and culture are time-sensitive'],
        ['Prosthetic joint or postoperative infection', 'Coagulase-negative staphylococci, S. aureus, Cutibacterium, streptococci, Gram-negative rods, anaerobes', 'Low-virulence organisms can be meaningful with hardware'],
        ['Tick or exposure-associated arthritis', 'Borrelia burgdorferi, selected rickettsial/arboviral differentials by region', 'Serology or molecular testing depends on syndrome and stage'],
        ['Fungal or mycobacterial arthritis', 'Candida, Sporothrix, Coccidioides, Blastomyces, Histoplasma, Mycobacterium spp.', 'Routine bacterial culture may miss slow or special-growth organisms'],
        ['Viral arthritis', 'Parvovirus B19, hepatitis B/C, rubella, alphaviruses, and others by exposure', 'Often serology/NAAT plus clinical pattern rather than routine synovial culture']
      ]
    },
    {
      title: 'Tissue Specimens That Need Special Handling',
      columns: ['Suspected organism/group', 'Specimen handling idea', 'Why students should pause'],
      rows: [
        ['Actinomyces', 'Submit tissue or aspirate anaerobically when possible', 'Swabs and oxygen exposure can reduce recovery'],
        ['Brucella or Francisella', 'Alert the laboratory before culture manipulation', 'Small Gram-negative coccobacilli can be a biosafety signal'],
        ['Legionella', 'Respiratory tissue/fluid may need BCYE or molecular testing', 'Routine media may not recover it'],
        ['Bartonella', 'Tissue, blood, or lymph node workup may need serology, PCR, or special culture', 'Slow growth and exposure history drive the diagnosis'],
        ['Systemic fungi', 'Send tissue for fungal culture and histopathology; notify if dimorphic fungi are suspected', 'Culture morphology can create safety and incubation issues'],
        ['Mycobacteria', 'Send tissue for AFB smear, mycobacterial culture, and NAAT when indicated', 'Routine bacterial processing will not answer the full question'],
        ['Mycoplasma/Ureaplasma', 'Use organism-specific transport or molecular testing if clinically relevant', 'No cell wall and fastidious growth change the method'],
        ['Viruses', 'Fresh tissue or swabs in viral transport medium may be needed', 'Formalin-fixed tissue is useful for histology but not routine viral culture']
      ]
    }
  ],
  'laboratory-safety': [
    {
      title: 'Reportable Disease Study Anchors',
      columns: ['Reporting concept', 'Examples students should recognize', 'Bench warning'],
      rows: [
        ['Immediate notification patterns', 'Anthrax, botulism, measles, meningococcal disease, plague, rabies, smallpox, viral hemorrhagic fevers, severe novel respiratory syndromes', 'Do not wait for a complete bench workup when local policy requires urgent notification'],
        ['Rapid public health follow-up', 'Acute hepatitis A, invasive H. influenzae, pertussis, tuberculosis, tularemia, Q fever, brucellosis, rubella, cholera-like illness', 'Exposure history and specimen routing can matter as much as the organism name'],
        ['Routine reportable infection patterns', 'Amebiasis, campylobacteriosis, cryptosporidiosis, cyclosporiasis, dengue, ehrlichiosis, gonorrhea, syphilis, Lyme disease, malaria, salmonellosis, shigellosis, STEC', 'Reporting timelines and lists vary by jurisdiction'],
        ['Resistance or healthcare-associated triggers', 'VRE, MRSA patterns, carbapenemase-producing organisms, unusual clusters, and outbreaks by local rules', 'Local infection prevention and public health policies control action'],
        ['Notifiable does not mean diagnostic shortcut', 'Some conditions are reportable on suspicion, others after confirmation', 'Know when to notify, when to preserve isolates, and when to stop routine manipulation']
      ],
      note: 'Reporting rules are jurisdiction-specific. This table is a study organizer, not a legal reporting schedule.'
    },
    {
      title: 'Standard Precautions Bench Habits',
      columns: ['Habit', 'What it protects against', 'Common learner trap'],
      rows: [
        ['Hand hygiene before and after patient/specimen contact', 'Transfer of organisms between people, surfaces, and specimens', 'Only washing after obvious contamination'],
        ['Gloves, gown, mask, and eye protection by splash/aerosol risk', 'Blood, body fluids, mucous membranes, nonintact skin, and contaminated materials', 'Using the same PPE for every risk level without thinking'],
        ['Sharps discipline', 'Needlestick and cut exposures', 'Recapping, bending, or carrying sharps casually'],
        ['Biological safety cabinet use when indicated', 'Aerosol-generating manipulation and high-risk organisms', 'Opening plates or tubes before considering the organism and procedure'],
        ['Surface and equipment disinfection', 'Environmental spread and carryover contamination', 'Cleaning only visible spills'],
        ['Linen, waste, and reusable equipment handling', 'Spread from contaminated materials', 'Transporting contaminated items without containment'],
        ['Private room or added containment when drainage/secretions cannot be controlled', 'Uncontrolled environmental contamination', 'Treating source control as someone else\'s problem']
      ]
    },
    {
      title: 'Transmission-Based Precautions Organizer',
      columns: ['Precaution lane', 'Examples to place here', 'Core action idea'],
      rows: [
        ['Airborne', 'Tuberculosis, measles, varicella, smallpox', 'Airborne infection isolation room or equivalent policy-driven controls; respiratory protection as required'],
        ['Droplet', 'Invasive meningococcal disease, invasive H. influenzae type b, pertussis, influenza, mumps, rubella, Mycoplasma pneumoniae, pneumonic plague, selected group A strep syndromes', 'Masking and distance-based respiratory precautions, especially during transport'],
        ['Contact', 'C. difficile, multidrug-resistant organisms, scabies/lice, draining wounds, impetigo, RSV/parainfluenza/enteric viruses in young children, viral hemorrhagic fever workflows', 'Gloves/gown, equipment control, environmental cleaning, and organism-specific disinfection'],
        ['Multiple precaution needs', 'Varicella, disseminated zoster, severe emerging respiratory viruses, viral hemorrhagic fevers, some outbreak settings', 'More than one route may apply; follow local infection prevention direction'],
        ['Lab handling overlay', 'Suspected TB, select agents, dimorphic fungi, high-risk viral specimens', 'Clinical isolation and laboratory containment are related but not identical decisions']
      ]
    },
    {
      title: 'Select Agent and Sentinel Lab Recognition Anchors',
      columns: ['Agent or signal', 'Sentinel clues', 'Action habit'],
      rows: [
        ['Bacillus anthracis concern', 'Large Gram-positive rods, nonhemolytic or suspicious colony pattern, compatible exposure or syndrome', 'Limit manipulation, notify, and follow sentinel/reference workflow'],
        ['Brucella concern', 'Tiny Gram-negative coccobacilli, slow blood-culture growth, weak staining, livestock/unpasteurized dairy/lab exposure history', 'Avoid aerosol-generating work and notify according to policy'],
        ['Francisella tularensis concern', 'Tiny poorly staining Gram-negative coccobacilli, slow growth, cysteine requirement, rabbit/tick/aerosol exposure', 'Do not overwork casually; route to reference/public health process'],
        ['Yersinia pestis concern', 'Gram-negative rod/coccobacillus with bipolar staining concept, plague-compatible syndrome or rodent/flea exposure', 'Escalate before extended manipulation'],
        ['Botulinum toxin concern', 'Descending paralysis or food/wound exposure pattern rather than routine culture ID', 'Clinical/public health emergency workflow; specimen handling follows toxin testing rules'],
        ['Smallpox or viral hemorrhagic fever concern', 'Compatible rash or hemorrhagic/travel/exposure syndrome', 'Do not process as routine viral specimen; activate infection control and public health chain']
      ],
      note: 'The student goal is recognition and escalation, not memorizing a full regulated agent list.'
    }
  ],
  'urine-culture-basics': [
    {
      title: 'UTI Syndrome Classification Anchors',
      columns: ['Clinical category', 'Typical clinical clues', 'Laboratory interpretation habit'],
      rows: [
        ['Acute uncomplicated cystitis', 'Dysuria, urgency, frequency, suprapubic discomfort without flank pain or fever', 'A predominant uropathogen from a good clean-catch specimen is meaningful even when thresholds vary by policy'],
        ['Acute pyelonephritis', 'Fever, chills, flank pain, nausea/vomiting, systemic symptoms', 'Higher urgency; urine and sometimes blood cultures may matter'],
        ['Complicated UTI', 'Male patient, catheter, obstruction, stones, abnormal urinary tract, renal disease, immunocompromise, pregnancy, or healthcare association', 'Broader organism range and resistance risk'],
        ['Asymptomatic bacteriuria', 'No urinary symptoms', 'Do not equate bacteriuria with UTI; pregnancy and urologic procedures are classic exceptions'],
        ['Contaminated voided specimen', 'Mixed organisms without a predominant uropathogen', 'Collection quality can invalidate a tempting culture result']
      ]
    },
    {
      title: 'Urine Culture Workup Decision Cues',
      columns: ['Culture pattern', 'What it usually means', 'Workup direction'],
      rows: [
        ['Single predominant uropathogen at significant quantity', 'Likely interpretable when symptoms/source fit', 'Identify and perform AST by policy'],
        ['Two potential uropathogens without heavy mixed flora', 'May be meaningful in selected catheterized or complicated cases', 'Work up based on source, quantity, and lab rules'],
        ['Three or more organisms with no predominance', 'Often contamination, especially clean-catch urine', 'Usually request recollection rather than full workup'],
        ['Low-count growth from catheter or suprapubic specimen', 'Can be meaningful because collection is more controlled', 'Interpret by source and clinical context'],
        ['Yeast predominant', 'Colonization, catheter-associated candiduria, contamination, or infection are all possible', 'Check source, catheter, symptoms, immune status, and repeat pattern']
      ]
    }
  ],
  'syndrome-to-test-thinking': [
    {
      title: 'Respiratory Syndrome Organism Anchors',
      columns: ['Syndrome', 'Common organisms', 'Testing direction'],
      rows: [
        ['Acute bronchitis', 'Respiratory viruses most often; Bordetella pertussis, Mycoplasma pneumoniae, Chlamydia pneumoniae in selected settings', 'Respiratory NAAT/pertussis testing by timing and syndrome; routine sputum culture is often not useful'],
        ['Bronchiolitis', 'RSV, rhinovirus, metapneumovirus, parainfluenza, influenza, adenovirus, enterovirus', 'Nasopharyngeal respiratory NAAT/antigen depending on age and setting'],
        ['Community pneumonia', 'S. pneumoniae, H. influenzae, atypicals, respiratory viruses; others by risk', 'Specimen quality, severity, imaging, and risk factors drive culture/NAAT/antigen choices'],
        ['Sinusitis or otitis media', 'S. pneumoniae, H. influenzae, Moraxella catarrhalis; Pseudomonas/anaerobes in chronic or special settings', 'Routine culture is uncommon unless severe, chronic, refractory, or procedural specimen'],
        ['Rare/high-risk respiratory pathogen', 'TB, Legionella, dimorphic fungi, Nocardia, Francisella, Brucella, Coxiella, Burkholderia pseudomallei, Yersinia pestis', 'Exposure, travel, host risk, and biosafety notification change the workup']
      ]
    },
    {
      title: 'CSF Pattern Interpretation Anchors',
      columns: ['Pattern', 'Typical CSF tendency', 'Organism/test direction'],
      rows: [
        ['Normal or near normal', 'Low cells, normal glucose, normal protein', 'Does not fully exclude early infection; interpret with syndrome'],
        ['Viral meningitis pattern', 'Mononuclear predominance, normal glucose, mild/moderate protein elevation', 'Enterovirus/HSV/VZV/arbovirus testing by age, season, and presentation'],
        ['Purulent bacterial pattern', 'High WBC with PMN predominance, high protein, low glucose often', 'Gram stain/culture, bacterial antigen or NAAT when appropriate'],
        ['TB or fungal pattern', 'Mononuclear predominance, high protein, glucose often low or borderline', 'AFB/fungal culture, antigen, NAAT, serology by suspected organism'],
        ['Early or partially treated infection', 'Patterns can overlap', 'Do not let one cell count pattern override clinical concern']
      ]
    },
    {
      title: 'Genital Lesion and STI Syndrome Map',
      columns: ['Syndrome/presentation', 'Agents to compare', 'Diagnostic habit'],
      rows: [
        ['Painful vesicles or ulcers', 'HSV-1/2 most often; VZV or other differential by context', 'Lesion NAAT is preferred for active lesions'],
        ['Painless chancre', 'Treponema pallidum', 'Serology plus lesion/direct testing when available and clinically indicated'],
        ['Painful deep ulcer with lymphadenitis', 'Haemophilus ducreyi where epidemiologically relevant', 'Specialized NAAT/culture/public health testing by setting'],
        ['Lymphogranuloma venereum', 'Chlamydia trachomatis L1-L3', 'NAAT from exposed site plus syndrome/public health context'],
        ['Granuloma inguinale', 'Klebsiella granulomatis', 'Tissue smear/histology or specialized testing; uncommon in many regions'],
        ['Genital warts or cervical dysplasia', 'HPV types by syndrome', 'Cytology/HPV testing for cervical disease; clinical diagnosis for many warts']
      ]
    },
    {
      title: 'Prenatal and Neonatal Infection Routes',
      columns: ['Timing route', 'Agents to remember', 'Testing logic'],
      rows: [
        ['Transplacental prenatal infection', 'CMV, rubella, parvovirus B19, Toxoplasma, Treponema pallidum, HIV, HBV and others by context', 'Maternal timing plus fetal/neonatal specimen strategy matters'],
        ['Ascending infection before birth', 'GBS, E. coli, Listeria, genital mycoplasmas, Chlamydia, Candida, HSV in selected settings', 'Maternal genital tract, membranes, and neonatal cultures/NAAT by syndrome'],
        ['Birth canal exposure', 'GBS, E. coli, Listeria, N. gonorrhoeae, C. trachomatis, HSV, HIV, HBV', 'Eye, respiratory, blood, CSF, surface, or molecular testing depends on presentation'],
        ['Postnatal exposure', 'Respiratory viruses, enteric organisms, skin flora, breast milk-associated viruses, environmental organisms', 'Age, host risk, nursery exposure, and specimen site guide testing']
      ]
    },
    {
      title: 'GI Syndrome Mechanism Map',
      columns: ['Mechanism', 'Symptoms pattern', 'Organisms to place here'],
      rows: [
        ['Preformed toxin or intoxication', 'Abrupt vomiting or watery diarrhea, often short incubation', 'S. aureus, Bacillus cereus emetic type, C. botulinum, some C. perfringens patterns'],
        ['Secretory watery diarrhea', 'Watery stool, dehydration, few fecal leukocytes', 'Vibrio cholerae, ETEC, rotavirus, norovirus, Giardia, Cryptosporidium'],
        ['Inflammatory/invasive diarrhea', 'Fever, blood/mucus, fecal leukocytes more likely', 'Shigella, Salmonella, Campylobacter, EIEC, Yersinia, Entamoeba histolytica'],
        ['Shiga toxin/HUS risk', 'Bloody diarrhea with kidney/hematologic complication risk', 'STEC/EHEC including O157 and non-O157 strains'],
        ['Enteric fever/systemic penetration', 'Prolonged fever, bacteremia, abdominal symptoms', 'Salmonella Typhi/Paratyphi and selected invasive Salmonella patterns'],
        ['Antibiotic-associated colitis', 'Diarrhea after antibiotic/healthcare exposure', 'Clostridioides difficile toxin disease']
      ]
    },
    {
      title: 'Skin Lesion Pattern Anchors',
      columns: ['Lesion pattern', 'Infections to consider', 'Specimen or test direction'],
      rows: [
        ['Macule or flat rash', 'Dermatophyte scale patterns, secondary syphilis, viral exanthems, rickettsial disease by exposure', 'History and distribution guide serology, scraping, or viral/public health testing'],
        ['Papule', 'Warts from HPV, molluscum contagiosum, scabies, folliculitis, early bacterial or poxvirus lesions by context', 'Often clinical, but scraping, swab, biopsy, or NAAT may be needed'],
        ['Nodule', 'Sporothrix, Nocardia, atypical mycobacteria, deep fungi, cutaneous anthrax/tularemia-like patterns, foreign body or abscess mimics', 'Aspirate or tissue is better than superficial swab'],
        ['Pustule', 'S. aureus, group A strep impetigo, Candida, HSV, gonorrhea, dermatophyte inflammatory lesions, varicella-zoster', 'Collect unroofed lesion material or pus when microbiology is needed'],
        ['Vesicle or bulla', 'HSV, VZV, bullous impetigo, necrotizing clostridial infection, Vibrio vulnificus with exposure', 'Lesion NAAT for herpesviruses; urgent culture/safety thinking for severe soft-tissue disease'],
        ['Scale', 'Dermatophytes and other superficial fungi', 'KOH/direct exam and fungal culture when diagnosis is uncertain'],
        ['Ulcer', 'Primary syphilis, chancroid where relevant, anthrax, tularemia, ecthyma, deep fungi, leishmaniasis or mycobacteria by exposure', 'Swab may miss the answer; tissue, serology, NAAT, or reference testing may be needed']
      ]
    },
    {
      title: 'Skin and Soft Tissue Syndrome Map',
      columns: ['Syndrome', 'Organism groups', 'Diagnostic habit'],
      rows: [
        ['Folliculitis, furuncle, carbuncle', 'S. aureus most often; Pseudomonas with water exposure; mixed flora in deeper recurrent disease', 'Drainage or pus is more useful than surface swab'],
        ['Erysipelas', 'Group A streptococci and other beta-hemolytic streptococci', 'Clinical diagnosis is common; blood culture only in selected severe settings'],
        ['Impetigo', 'S. aureus and group A streptococci', 'Culture lesions when outbreaks, treatment failure, or resistance questions matter'],
        ['Cellulitis', 'Beta-hemolytic streptococci, S. aureus; water/animal/human bite exposures broaden the list', 'Culture yield is limited unless abscess, wound, bite, necrosis, or systemic disease is present'],
        ['Dermatophytosis', 'Trichophyton, Microsporum, Epidermophyton', 'KOH, fungal culture, or molecular testing depending on site and lab workflow'],
        ['Hidradenitis or infected pilonidal disease', 'Mixed aerobic and anaerobic skin/GI flora, S. aureus, streptococci', 'Deep material or operative specimen is preferred for culture'],
        ['Necrotizing infection or myositis concern', 'Group A strep, S. aureus, clostridia, anaerobes, Enterobacterales, Vibrio/Aeromonas by exposure', 'This is an urgent clinical and surgical syndrome; communicate quickly'],
        ['Postoperative wound infection', 'S. aureus, CoNS, streptococci, Enterococcus, Enterobacterales, Pseudomonas, Candida, anaerobes depending on site', 'Interpret with surgery type, depth, hardware, and whether specimen is superficial or deep']
      ]
    },
    {
      title: 'Systemic Infection With Skin Findings',
      columns: ['Pattern', 'Organisms to keep in mind', 'Warning'],
      rows: [
        ['Petechiae, purpura, or rapidly progressive rash', 'N. meningitidis, rickettsiae, viral hemorrhagic fevers, severe sepsis organisms', 'Safety, isolation, and urgent reporting may matter before final ID'],
        ['Ecthyma gangrenosum or necrotic vascular lesions', 'Pseudomonas aeruginosa, molds in immunocompromised hosts, severe bacterial sepsis', 'Think bloodstream infection and host risk'],
        ['Disseminated vesicles', 'VZV, HSV, enteroviruses, poxvirus differentials by exposure', 'Airborne/contact or public health workflow may be needed'],
        ['Fever plus eschar', 'Rickettsial disease, tularemia, anthrax, scrub typhus-like travel syndromes', 'Exposure history decides the testing lane'],
        ['Nodular lymphangitis', 'Sporothrix, Nocardia, atypical mycobacteria, Leishmania, tularemia by setting', 'Tissue/aspirate and special cultures outperform superficial swabs'],
        ['Disseminated fungal skin lesions', 'Histoplasma, Blastomyces, Cryptococcus, Coccidioides, Candida, Fusarium, dematiaceous molds', 'Skin biopsy can be a diagnostic shortcut in immunocompromised patients'],
        ['Generalized viral exanthem', 'Measles, rubella, parvovirus B19, enteroviruses, EBV/CMV, acute HIV, arboviruses by geography', 'Public health and pregnancy/immune status can change urgency']
      ]
    },
    {
      title: 'Immunocompromised and Malignancy Infection Anchors',
      columns: ['Host pattern', 'Infections to compare', 'Study habit'],
      rows: [
        ['Neutropenia or acute leukemia', 'Gram-negative rods including Pseudomonas, S. aureus, viridans streptococci, Candida, Aspergillus, mucormycetes, HSV/VZV', 'Fever can be the only clue; blood cultures and rapid escalation matter'],
        ['Lymphoma or T-cell immune defects', 'Pneumocystis, Cryptococcus, Toxoplasma, CMV, HSV/VZV, Listeria, Salmonella, Nocardia, mycobacteria, Strongyloides', 'Think intracellular and opportunistic organisms, not just routine bacteria'],
        ['Multiple myeloma or antibody defects', 'S. pneumoniae, H. influenzae, Neisseria meningitidis, Enterobacterales, respiratory viruses', 'Encapsulated organisms and respiratory sources are high-yield anchors'],
        ['Transplant or intense immunosuppression', 'CMV, EBV, BK virus, invasive molds, Candida, Nocardia, mycobacteria, Pneumocystis, Toxoplasma', 'Timing after transplant and prophylaxis history shape the differential'],
        ['Skin lesions in immunocompromised host', 'Candida, Fusarium, Aspergillus, Cryptococcus, dimorphic fungi, Pseudomonas, VZV/HSV, mycobacteria', 'Biopsy early when lesions are unexplained or progressive']
      ]
    }
  ],
  'microbial-classification-criteria': [
    {
      title: 'Classification Criteria With Student Examples',
      columns: ['Criteria type', 'What students compare', 'Examples to attach mentally', 'How it helps ID'],
      rows: [
        ['Macroscopic morphology', 'Colony size, texture, pigment, hemolysis, odor, swarming, spreading, adherence', 'Mucoid Klebsiella-like colonies, beta-hemolytic streptococci, swarming Proteeae, dry coryneform colonies', 'Gives an early sorting clue before biochemical or molecular methods'],
        ['Microscopic morphology', 'Cell shape, arrangement, spores, branching, budding, hyphae, inclusions', 'Gram-positive cocci in clusters, Gram-negative diplococci, branching actinomycetes, yeast with budding', 'Places the organism into the right workup lane'],
        ['Staining characteristics', 'Gram reaction, acid-fastness, capsule stains, fluorochrome stains, special stains', 'AFB for mycobacteria, weakly acid-fast Nocardia-like organisms, capsule-associated patterns', 'Highlights structures that routine colony reading cannot show'],
        ['Environmental requirements', 'Oxygen, CO2, temperature, time, salt, pH, nutrients', 'Anaerobes, capnophilic Neisseria, microaerophilic Campylobacter, salt-tolerant staphylococci', 'Explains why some organisms do not appear on routine plates'],
        ['Nutritional requirements', 'Growth factor dependence and special supplements', 'Haemophilus X/V factor logic, Legionella cysteine requirement, nutritionally variant streptococci', 'Prevents false "no growth" interpretations'],
        ['Resistance profile', 'Expected resistance, acquired resistance, unusual susceptibility pattern', 'MRSA, VRE, ESBL-like Enterobacterales, intrinsic vancomycin resistance in Leuconostoc-like organisms', 'Supports ID, reporting, and therapy relevance'],
        ['Antigenic profile', 'Serogroup, serotype, toxin antigen, capsule antigen', 'Group A/B Streptococcus grouping, pneumococcal antigen, cryptococcal antigen', 'Useful when immune or public health grouping matters'],
        ['Genetic evidence', 'Target detection, sequencing, gene detection, relatedness', '16S sequencing, NAAT targets, resistance genes, outbreak comparison', 'Improves confidence for difficult, slow, rare, or epidemiologically important organisms']
      ]
    }
  ],
  'microscope-setup-and-smear-reading': [
    {
      title: 'Smear Reading Quality Table',
      columns: ['Reading problem', 'What it can cause', 'Student correction'],
      rows: [
        ['Thick smear', 'Under-decolorized areas, crowded morphology, false Gram-positive impression', 'Move to a thinner feathered area or repeat smear'],
        ['Over-decolorization', 'Gram-positive organisms may look Gram-negative or Gram-variable', 'Check timing, smear thickness, and fresh culture quality'],
        ['Under-decolorization', 'Gram-negative organisms may look falsely Gram-positive', 'Read thin fields and repeat if the result conflicts with culture'],
        ['Old culture or damaged cells', 'Gram variability and weak staining', 'Use fresh growth when possible'],
        ['Too much light', 'Low contrast and missed faint organisms', 'Adjust diaphragm/condenser and brightness for the method'],
        ['Too little light or poor focus', 'Debris looks more important than it is', 'Reset illumination and focus before interpreting'],
        ['One-field reading', 'Overcalls one artifact or misses mixed morphology', 'Scan multiple representative fields']
      ]
    }
  ],
  'stain-selection-and-screening': [
    {
      title: 'Expanded Stain Method Table',
      columns: ['Method', 'Targets or best use', 'Expected positive idea', 'Main limitation'],
      rows: [
        ['Gram stain', 'Broad bacterial morphology, arrangement, inflammatory cells, and specimen quality', 'Gram-positive organisms retain purple; Gram-negative organisms counterstain pink/red after decolorization', 'Technique and smear quality strongly affect interpretation'],
        ['Ziehl-Neelsen acid-fast stain', 'Classic hot carbol-fuchsin method for acid-fast organisms', 'Acid-fast organisms retain red/pink stain after acid-alcohol decolorization', 'Requires careful heating/safety and is not species identification'],
        ['Kinyoun acid-fast stain', 'Cold acid-fast method for mycobacteria and selected acid-fast organisms', 'Acid-fast organisms retain carbol fuchsin without heating', 'May be less sensitive than fluorochrome methods in some workflows'],
        ['Auramine-rhodamine fluorochrome', 'Sensitive screening for AFB in many labs', 'Acid-fast organisms fluoresce against darker background', 'Artifacts and confirmation rules matter'],
        ['Modified acid-fast stain', 'Partially acid-fast organisms such as Nocardia-like organisms and selected parasites', 'Weak or partial acid-fast staining depending on organism and method', 'Decolorizer strength and method details change results'],
        ['Acridine orange', 'Nucleic acid-containing cells or organisms in selected low-burden specimens', 'Bacteria/yeasts/cells may fluoresce brightly', 'Dead cells, debris, and background can fluoresce'],
        ['Wet mount', 'Motility, cells, yeast, Trichomonas, parasite forms, or immediate direct clues', 'Live motility or recognizable forms are seen in fresh prep', 'Delay, drying, or poor prep can destroy the clue'],
        ['KOH or fungal direct exam', 'Fungal elements from skin, hair, nails, or tissue material', 'Yeast, pseudohyphae, hyphae, or other fungal structures may be visible', 'Direct exam can miss low burden and does not always identify species']
      ]
    }
  ],
  enterobacterales: [
    {
      title: 'Clinically Important Enterobacterales Detail Table',
      columns: ['Organism/group', 'Reservoir or source pattern', 'Transmission or acquisition', 'Clinical anchors'],
      rows: [
        ['Escherichia coli', 'Normal bowel flora of humans and animals; may colonize the female genital tract', 'Endogenous spread to urinary tract or sterile sites; fecal-oral exposure for intestinal pathotypes; food, water, person-to-person, or animal-associated exposure depending on pathotype', 'UTI, bacteremia, neonatal meningitis, intra-abdominal infection, wound infection, traveler diarrhea, dysentery-like illness, hemorrhagic colitis, HUS risk with STEC'],
        ['Shigella spp.', 'Human intestinal reservoir with low infectious dose', 'Person-to-person fecal-oral spread, childcare/crowded settings, contaminated food or water, sexual transmission networks', 'Inflammatory diarrhea/dysentery, fever, abdominal cramps; S. sonnei may produce milder watery diarrhea'],
        ['Salmonella Typhi and Paratyphi', 'Human reservoir', 'Fecal-oral ingestion from contaminated food or water, often travel-associated', 'Enteric fever with prolonged fever, bacteremia, systemic illness, abdominal symptoms, and possible chronic carriage'],
        ['Nontyphoidal Salmonella', 'Animals, poultry, reptiles, livestock, eggs, meat, produce, and contaminated environments', 'Foodborne exposure, animal or reptile contact, person-to-person spread when hygiene fails', 'Gastroenteritis, bacteremia, focal infection, osteomyelitis in selected hosts; higher risk in infants, older adults, immunocompromised patients, and hemoglobinopathy contexts'],
        ['Edwardsiella tarda', 'Aquatic animals, reptiles, fish, and water-associated exposure', 'Water, seafood, animal contact, wounds, or GI exposure', 'Gastroenteritis, wound infection, bacteremia, or extraintestinal disease in vulnerable hosts'],
        ['Yersinia pestis', 'Rodent reservoir with flea vector; wild and domestic animal cycles', 'Flea bite, animal contact, infectious droplets in pneumonic disease, laboratory exposure risk', 'Bubonic plague, septicemic plague, pneumonic plague; safety and public health organism'],
        ['Yersinia enterocolitica', 'Pigs and pork products, animals, contaminated food or milk, cold-tolerant environmental survival', 'Foodborne exposure, especially pork; contaminated milk/water; transfusion-associated risk is a classic concept', 'Enterocolitis, fever, abdominal pain, terminal ileitis, mesenteric lymphadenitis, pseudoappendicitis'],
        ['Yersinia pseudotuberculosis', 'Animals and contaminated food or water', 'Foodborne or animal/environment-associated ingestion', 'Mesenteric lymphadenitis, fever, abdominal pain, pseudoappendicitis-like illness'],
        ['Klebsiella spp.', 'Human GI and respiratory colonization; healthcare environment', 'Endogenous infection, aspiration, healthcare-associated spread, devices', 'Pneumonia, UTI, bacteremia, wound/intra-abdominal infection; capsule and resistance patterns matter'],
        ['Enterobacter/Klebsiella aerogenes group', 'Human GI tract and hospital environment', 'Endogenous or healthcare-associated infection, devices, antibiotics selecting resistant strains', 'UTI, pneumonia, bacteremia, intra-abdominal and device-associated infection; AmpC-type resistance logic is high yield'],
        ['Citrobacter spp.', 'GI tract, environment, water, healthcare settings', 'Endogenous or healthcare-associated spread', 'UTI, bacteremia, neonatal meningitis/brain abscess with selected species, opportunistic infection'],
        ['Proteus spp.', 'Human GI tract, environment, healthcare settings', 'Endogenous UTI or wound infection, catheter-associated spread', 'UTI, stones/alkaline urine concept, wound infection, bacteremia; swarming and urease are anchors'],
        ['Morganella morganii', 'GI tract colonizer and opportunist', 'Endogenous or healthcare-associated infection', 'UTI, wound infection, bacteremia; Proteeae-like biochemical and resistance logic'],
        ['Providencia spp.', 'GI tract and healthcare reservoirs, especially urinary catheter context', 'Healthcare-associated urinary tract spread, long-term care/catheter settings', 'Catheter-associated UTI, bacteremia; resistance can be prominent'],
        ['Serratia marcescens', 'Moist environments, hospital reservoirs, GI/respiratory colonization', 'Healthcare-associated spread, devices, contaminated fluids/equipment', 'UTI, pneumonia, bacteremia, wound and device infection; red pigment may occur at cooler temperatures but is not required']
      ]
    },
    {
      title: 'Diarrheagenic E. coli Study Table',
      columns: ['Pathotype', 'Core mechanism idea', 'Typical syndrome', 'Student caution'],
      rows: [
        ['ETEC', 'Heat-labile and/or heat-stable enterotoxins drive watery secretory diarrhea', 'Traveler diarrhea and childhood watery diarrhea', 'Think contaminated food/water; inflammatory blood is not the main pattern'],
        ['EIEC', 'Invasion of colonic epithelial cells creates Shigella-like disease', 'Dysentery-like illness with fever, cramps, blood or mucus possible', 'Can resemble Shigella clinically and biochemically'],
        ['EPEC', 'Attaching/effacing injury with loss of microvilli', 'Infant diarrhea and prolonged watery diarrhea in some settings', 'Mechanism is adherence/injury, not classic toxin-only disease'],
        ['EHEC/STEC', 'Shiga toxin-producing strains damage colon and may injure kidneys', 'Hemorrhagic colitis, bloody diarrhea, HUS risk', 'Avoid casual antibiotic assumptions; clinical guidance matters because HUS risk is central'],
        ['EAEC', 'Aggregative adherence and biofilm-like intestinal colonization', 'Persistent or prolonged watery diarrhea, especially in children, travelers, and vulnerable hosts', 'Often needs molecular or panel-based detection rather than routine bench guessing'],
        ['UPEC', 'Adhesins and urinary-tract virulence traits help ascend the urinary tract', 'Cystitis, pyelonephritis, bacteremia from urinary source', 'This is extraintestinal E. coli logic, not diarrheagenic E. coli']
      ],
      note: 'Clinical management of diarrheal disease depends on syndrome, patient risk, outbreak setting, and current guidance.'
    },
    {
      title: 'Enteric Media and Screening Tests',
      columns: ['Medium/test', 'What it selects or differentiates', 'Organisms/study use', 'Trap to avoid'],
      rows: [
        ['MacConkey agar', 'Selects many Gram-negative rods; differentiates lactose fermentation', 'E. coli and Klebsiella often lactose-positive; Salmonella/Shigella/Proteus often non-lactose or late/variable depending on organism', 'Lactose result is an early branch, not a final ID'],
        ['Sorbitol MacConkey', 'Differentiates sorbitol fermentation', 'Classic screen for E. coli O157:H7 as non-sorbitol fermenting in older workflows', 'Non-O157 STEC will not be solved by this plate alone'],
        ['EMB agar', 'Selective/differential lactose-sucrose medium', 'E. coli may show metallic sheen; other lactose fermenters vary', 'Sheen is a clue, not a substitute for ID'],
        ['Hektoen enteric agar', 'Enteric selective/differential plate with H2S detection', 'Salmonella often H2S-positive colonies; Shigella often green/colorless depending on system', 'Colony color varies by organism and medium conditions'],
        ['XLD agar', 'Selective/differential stool-pathogen medium with xylose, lysine, and H2S logic', 'Salmonella often red with black centers; Shigella often red/colorless; Yersinia can vary', 'H2S and decarboxylation can shift apparent color'],
        ['Salmonella-Shigella agar', 'Selective stool pathogen screen with lactose and H2S clues', 'Salmonella may show black centers; Shigella usually colorless', 'More inhibitory media may miss stressed organisms'],
        ['CIN agar', 'Selective/differential medium useful for Yersinia enterocolitica workflows', 'Yersinia may form bullseye-type colonies in classic teaching', 'Use only when Yersinia is part of the clinical question'],
        ['TSI agar', 'Screens glucose/lactose/sucrose fermentation, gas, and H2S', 'Helps sort enteric Gram-negative rods after isolation', 'TSI is a screen; confirm with additional biochemical/serologic/molecular ID'],
        ['LIA', 'Screens lysine decarboxylation/deamination and H2S', 'Helpful with Salmonella, Proteus/Providencia/Morganella, and other enteric branches', 'Read with TSI and oxidase; not alone'],
        ['Urea agar', 'Detects urease activity', 'Proteus, Morganella, Providencia, Klebsiella, Yersinia can be relevant depending on speed/pattern', 'Rapid strong urease points differently than delayed/weak reactions'],
        ['Motility medium', 'Evaluates motility pattern', 'Separates nonmotile Shigella/Klebsiella from many motile Enterobacterales; Yersinia temperature-dependent motility is a classic concept', 'Incubation temperature and method matter'],
        ['Decarboxylase media', 'Assesses lysine, ornithine, arginine reactions', 'Enterobacterales branching, Proteeae, Salmonella, Shigella, Klebsiella, Enterobacter', 'Needs correct control and interpretation conditions']
      ]
    },
    {
      title: 'Colony Appearance Study Anchors',
      columns: ['Organism/group', 'MacConkey-style clue', 'HE/XLD/enteric plate clue', 'Memory hook'],
      rows: [
        ['E. coli', 'Usually lactose fermenter; some strains late or variable', 'Often yellow/orange on some enteric media depending on fermentation system', 'Common UTI isolate and common stool-pathotype backbone'],
        ['Klebsiella spp.', 'Lactose fermenter, often mucoid', 'Fermenter-type reactions vary by medium', 'Capsule/mucoid colony and pneumonia/UTI/resistance context'],
        ['Enterobacter/K. aerogenes group', 'Lactose fermenter, may be mucoid', 'Variable yellow/orange fermenter-type reactions', 'AmpC-type resistance logic and healthcare context'],
        ['Citrobacter spp.', 'Variable lactose; C. freundii may be late/variable', 'Can be H2S-positive and mimic Salmonella-like colonies', 'Do not call Salmonella from H2S alone'],
        ['Salmonella spp.', 'Usually non-lactose fermenter', 'Often H2S-positive black-centered colonies on appropriate media', 'Stool pathogen and bacteremia/enteric fever logic'],
        ['Shigella spp.', 'Usually non-lactose fermenter; S. sonnei may be late/slow', 'Usually no H2S; colorless/green/red depending on medium', 'Low infectious dose and dysentery context'],
        ['Proteus spp.', 'Non-lactose or variable; swarming on noninhibitory media', 'Often H2S-positive depending on species and medium', 'Swarming, urease, PPA, and foul odor anchors'],
        ['Morganella/Providencia', 'Often non-lactose fermenters', 'Generally no H2S; reactions vary', 'PPA-positive Proteeae lane without classic Proteus swarming'],
        ['Serratia spp.', 'Late lactose or non-lactose; pigment may occur at cooler temperature', 'Variable yellow/colorless depending on medium', 'Red pigment is memorable but not required'],
        ['Yersinia spp.', 'Non-lactose or delayed; small colonies may be subtle', 'Can vary; CIN is more classic when suspected', 'Pseudoappendicitis and cold-enrichment/temperature concepts']
      ]
    },
    {
      title: 'Biochemical Branch Logic',
      columns: ['Branch clue', 'Points toward', 'Useful examples', 'Pitfall'],
      rows: [
        ['Lactose fermenter', 'E. coli, Klebsiella, Enterobacter/K. aerogenes, some Citrobacter/Serratia late fermenters', 'Pink MAC colonies, acid slant/butt on TSI when sucrose/lactose fermented', 'Late fermenters blur the clean LF/NLF split'],
        ['Non-lactose fermenter', 'Salmonella, Shigella, Proteus, Morganella, Providencia, Yersinia, Edwardsiella', 'Colorless MAC colonies', 'Non-lactose does not automatically mean stool pathogen'],
        ['Indole positive', 'E. coli, Proteus vulgaris, Morganella morganii, Edwardsiella tarda, some Providencia', 'Useful early split after lactose/PPA branch', 'Indole varies by species, not genus alone'],
        ['PPA positive', 'Proteus, Providencia, Morganella', 'Proteeae branch', 'Do not confuse PPA-positive Proteeae with Salmonella just because both can be NLF'],
        ['Strong urease', 'Proteus, Morganella, Providencia; Yersinia and Klebsiella can be urease-positive in different patterns', 'UTI/stone logic for Proteus', 'Speed and organism context matter'],
        ['H2S positive', 'Salmonella, Proteus mirabilis/vulgaris, Edwardsiella tarda, Citrobacter freundii', 'Black precipitate on TSI/XLD/HE depending on medium', 'H2S is not Salmonella-specific'],
        ['Lysine decarboxylase positive', 'Many Salmonella and E. coli patterns', 'Pairs with TSI/LIA to sort enterics', 'Proteus/Providencia/Morganella can deaminate instead'],
        ['Nonmotile', 'Shigella and Klebsiella classic anchors', 'Helps separate from many motile enterics', 'Yersinia motility can be temperature dependent'],
        ['Oxidase negative', 'Classic Enterobacterales pattern', 'Helps separate from Aeromonas/Vibrio/Plesiomonas-like organisms in stool algorithms', 'Always check oxidase before forcing Enterobacterales logic']
      ]
    },
    {
      title: 'TSI and LIA Pattern Guide',
      columns: ['TSI pattern', 'LIA pattern', 'Organisms to consider', 'Student interpretation'],
      rows: [
        ['A/A with gas', 'K/K or variable', 'E. coli, Klebsiella, Enterobacter/K. aerogenes group', 'Glucose plus lactose/sucrose fermentation fits many coliforms'],
        ['K/A with H2S', 'K/K with H2S', 'Salmonella spp. and some Citrobacter/Edwardsiella possibilities', 'H2S plus lysine-positive pattern supports Salmonella-like lane, but confirmation is required'],
        ['K/A without H2S', 'K/A or K/NC', 'Shigella, Yersinia, some Salmonella, Plesiomonas/Aeromonas/Vibrio if oxidase positive', 'Use oxidase and motility before naming Enterobacterales'],
        ['K/A with H2S', 'R/A or deamination pattern', 'Proteus, Morganella, Providencia lane when PPA/deamination fits', 'Proteeae can mimic stool pathogens on H2S media'],
        ['A/A or K/A with urease-positive context', 'Variable', 'Yersinia enterocolitica, Proteus group, Klebsiella group depending on other tests', 'Urease is useful only inside the full branch'],
        ['No clear reaction or weak growth', 'Uninterpretable or variable', 'Stressed stool pathogen, wrong incubation, mixed culture, or non-Enterobacterales', 'Repeat from a pure colony and confirm oxidase/ID method']
      ],
      note: 'TSI/LIA patterns screen possibilities. Final ID requires pure culture, oxidase context, additional biochemical/serologic/molecular testing, or validated identification systems.'
    },
    {
      title: 'Enterobacterales Resistance and AST Anchors',
      columns: ['Organism/group', 'Resistance idea students should attach', 'AST/reporting caution', 'Common study trap'],
      rows: [
        ['E. coli', 'Can acquire ESBLs, AmpC-like mechanisms, carbapenemases, fluoroquinolone resistance, and TMP-SMX resistance', 'UTI versus systemic infection changes drug relevance; local antibiogram matters', 'Assuming all E. coli are simple community UTI isolates'],
        ['Klebsiella spp.', 'Intrinsic ampicillin resistance is classic; ESBL and carbapenemase mechanisms are major concerns', 'Carbapenemase alerts and infection prevention rules may apply', 'Forgetting natural ampicillin resistance'],
        ['Enterobacter/K. aerogenes/Citrobacter freundii/Serratia group', 'Inducible or derepressed AmpC-type beta-lactamase logic is high yield', 'Some cephalosporin results may require careful reporting rules', 'Treating them like uncomplicated E. coli'],
        ['Proteus mirabilis', 'Often susceptible to several agents but resistance varies; urease/stone context matters', 'Nitrofurantoin is not a Proteus solution in routine teaching', 'Letting UTI source override organism-drug mismatch'],
        ['Morganella, Providencia, Proteus vulgaris group', 'Proteeae resistance can be more complex; intrinsic resistance patterns matter', 'Panel interpretation should follow current standards', 'Assuming all Proteeae behave like P. mirabilis'],
        ['Serratia marcescens', 'AmpC-type logic and intrinsic resistance to several narrow agents', 'Healthcare-associated isolates may be multidrug-resistant', 'Overtrusting pigment or underestimating resistance'],
        ['Salmonella spp.', 'Susceptibility matters for invasive disease and enteric fever; resistance is geographically variable', 'GI disease often needs clinical guidance; invasive disease is different', 'Treating all Salmonella gastroenteritis as automatically needing antibiotics'],
        ['Shigella spp.', 'Resistance to traditional agents is common in many regions', 'Therapy decisions should follow current public health and susceptibility guidance', 'Assuming old first-line drugs still work'],
        ['Yersinia pestis', 'Dangerous pathogen; susceptibility testing belongs in specialized/reference settings', 'Culture manipulation and AST require strict safety/reference workflow', 'Handling it like routine Enterobacterales'],
        ['Yersinia enterocolitica/pseudotuberculosis', 'Susceptibility varies by species and beta-lactamase patterns', 'Antibiotics are syndrome/severity dependent', 'Overtreating uncomplicated enterocolitis without context']
      ],
      note: 'Exact breakpoints, suppression rules, and therapy decisions should follow current CLSI/FDA/lab policy and clinical guidance.'
    },
    {
      title: 'GI Treatment Thinking for Enterobacterales',
      columns: ['Organism/syndrome', 'First clinical idea', 'When antibiotics enter the conversation', 'Student warning'],
      rows: [
        ['ETEC/EPEC/EAEC watery diarrhea', 'Hydration and supportive care are central', 'Severe, persistent, high-risk, traveler, or outbreak contexts may change management', 'Do not memorize one antibiotic answer for all watery diarrhea'],
        ['STEC/EHEC hemorrhagic colitis', 'Supportive care and HUS monitoring are central', 'Antibiotic decisions require caution and clinical guidance', 'HUS risk is the key teaching point'],
        ['Shigella dysentery', 'Hydration plus public health/transmission control', 'Antibiotics may shorten illness and shedding when indicated, but resistance is common', 'Susceptibility guidance matters'],
        ['Nontyphoidal Salmonella gastroenteritis', 'Supportive care for many uncomplicated cases', 'Infants, older adults, immunocompromised patients, bacteremia, severe disease, or focal infection may need therapy', 'Do not treat every stool Salmonella the same way'],
        ['Typhoid/paratyphoid fever', 'Systemic enteric fever', 'Antimicrobial therapy is important and should follow susceptibility/travel resistance patterns', 'This is not ordinary gastroenteritis logic'],
        ['Yersinia enterocolitica/pseudotuberculosis', 'Often enterocolitis or pseudoappendicitis-like illness', 'Severe, systemic, or high-risk disease may require therapy', 'Do not miss abdominal pain/mesenteric lymphadenitis context'],
        ['Yersinia pestis', 'Medical and public health emergency', 'Prompt specific therapy and public health management are required', 'Do not manage as routine stool Enterobacterales']
      ],
      note: 'This table is educational and not patient-specific treatment guidance.'
    }
  ],
  'nonfermenting-gram-negative-rods': [
    {
      title: 'Major Nonfermenters and Environmental Gram-Negative Rods',
      columns: ['Organism/group', 'Usual source pattern', 'Disease anchors', 'Student warning'],
      rows: [
        ['Acinetobacter spp.', 'Hospital environment, skin colonization, respiratory equipment, wounds, devices, and prolonged healthcare exposure', 'Ventilator-associated pneumonia, bacteremia, wound infection, UTI, device-associated infection, colonization', 'Often colonizes; repeated recovery, source, and patient risk decide significance'],
        ['Stenotrophomonas maltophilia', 'Water, soil, hospital fluids, respiratory equipment, catheters, and biofilm-prone surfaces', 'Nosocomial pneumonia, bacteremia, catheter infection, UTI, wound infection, immunocompromised-host infection', 'Do not treat it like Pseudomonas; intrinsic resistance changes therapy thinking'],
        ['Pseudomonas aeruginosa', 'Water, moist environments, respiratory equipment, sinks, drains, wounds, and healthcare reservoirs', 'Pneumonia, burn/wound infection, UTI, bacteremia, otitis externa, keratitis, bone/joint infection, cystic fibrosis airway infection', 'Pigment and odor help memory, but oxidase, growth, source, and resistance profile matter more'],
        ['Pseudomonas fluorescens/putida/stutzeri group', 'Environmental water/soil organisms and contaminated fluids or devices', 'Usually opportunistic: bacteremia, catheter infection, wound infection, respiratory or urinary infection in vulnerable hosts', 'Clinical significance is often source-dependent and should be questioned'],
        ['Burkholderia cepacia complex', 'Soil, water, plants, hospital solutions, respiratory equipment, and cystic fibrosis airway colonization', 'Serious respiratory infection in cystic fibrosis, bacteremia, device or contaminated-product outbreaks', 'Can be highly resistant and important in cystic fibrosis or outbreak settings'],
        ['Burkholderia pseudomallei', 'Soil and surface water in endemic regions', 'Melioidosis: pneumonia, abscesses, sepsis, chronic or relapsing disease', 'Travel/exposure history and safety awareness matter; do not handle as a routine odd rod when suspected'],
        ['Burkholderia mallei', 'Animal-associated glanders organism, classically equids', 'Rare human disease with cutaneous, pulmonary, or systemic infection', 'Exposure history drives suspicion'],
        ['Ralstonia pickettii', 'Water systems, disinfectants, solutions, and healthcare fluids', 'Catheter-associated bacteremia and pseudo-outbreak or contaminated-product scenarios', 'Think contamination source when clusters appear'],
        ['Achromobacter xylosoxidans', 'Moist environments, hospital water, respiratory tract colonization, cystic fibrosis context', 'Respiratory infection, bacteremia, wound infection, device-associated infection', 'Often resistant to multiple agents; avoid assuming Pseudomonas rules'],
        ['Alcaligenes faecalis', 'Environment, water, soil, and occasional human colonization', 'Opportunistic UTI, wound infection, bacteremia, or respiratory infection', 'Often low significance unless source and host fit'],
        ['Chryseobacterium/Elizabethkingia group', 'Water, soil, hospital water systems, sinks, equipment, and fluids', 'Bacteremia, meningitis in neonates, pneumonia, wound infection, immunocompromised-host infection', 'Yellow-pigmented nonfermenters can have unusual resistance patterns'],
        ['Roseomonas spp.', 'Environmental and skin-associated pink-pigmented organisms', 'Catheter-associated bacteremia, wound infection, rare invasive disease', 'Pink pigment is a clue, not a final ID'],
        ['Ochrobactrum anthropi', 'Environmental and healthcare sources; possible device association', 'Catheter-associated bacteremia and opportunistic infection', 'Can resemble other oxidase-positive nonfermenters'],
        ['Brevundimonas and Sphingomonas-like organisms', 'Water and environmental sources, sometimes hospital fluids', 'Rare bacteremia, device-associated infection, wound or respiratory isolates', 'Usually uncommon; interpret with source and repeat recovery'],
        ['Comamonas, Delftia, Acidovorax, and related organisms', 'Water, soil, and environmental sources', 'Rare respiratory, wound, urinary, bloodstream, or catheter-associated infections', 'Often recovered as unusual isolates; source and host risk decide meaning']
      ]
    },
    {
      title: 'Nonfermenter Bench Clues',
      columns: ['Clue', 'Points toward', 'How to use it'],
      rows: [
        ['MacConkey growth with non-lactose reaction', 'Many nonfermenters and some Enterobacterales', 'Pair with oxidase and morphology; NLF alone is not enough'],
        ['Oxidase positive', 'Pseudomonas, Burkholderia, Ralstonia, Alcaligenes, many water-associated rods', 'Separates many from Enterobacterales, but Acinetobacter and Stenotrophomonas are often oxidase negative'],
        ['Oxidase negative coccobacilli', 'Acinetobacter-like branch', 'Think healthcare source, smooth colonies, and resistance context'],
        ['Lavender/green/yellow/brown pigment', 'Pseudomonas, Stenotrophomonas, Chryseobacterium-like, Roseomonas-like, or other environmental rods', 'Use pigment as a memory anchor, not as final identification'],
        ['Grape-like odor or metallic sheen', 'Classic P. aeruginosa teaching clue', 'Helpful only when the whole pattern fits'],
        ['Poor or delayed growth', 'Fastidious nonfermenter or unusual environmental organism', 'Do not overread early plates; incubation and method matter'],
        ['Cystic fibrosis respiratory source', 'P. aeruginosa, Burkholderia cepacia complex, Stenotrophomonas, Achromobacter', 'Species-level ID and infection-control implications may matter'],
        ['Cluster of unusual water organisms', 'Contaminated water, sink, solution, equipment, or product', 'Think outbreak/pseudo-outbreak investigation, not just individual ID']
      ]
    },
    {
      title: 'Nonfermenter Resistance and AST Anchors',
      columns: ['Organism/group', 'Resistance idea', 'Testing/reporting caution', 'Common trap'],
      rows: [
        ['Pseudomonas aeruginosa', 'Resistance can involve beta-lactams, carbapenems, aminoglycosides, and fluoroquinolones; combination of mechanisms is common', 'Use anti-pseudomonal drug panels and current breakpoints', 'Assuming ordinary Gram-negative UTI drugs apply'],
        ['Acinetobacter baumannii complex', 'Multidrug resistance and carbapenem resistance can be major problems', 'Method validity and local reporting policy matter', 'Mistaking colonization for infection or underestimating resistance'],
        ['Stenotrophomonas maltophilia', 'Intrinsic resistance to many beta-lactams and aminoglycosides; therapy options are limited', 'Susceptibility results can be misleading if interpreted like Pseudomonas', 'Calling it a contaminant without checking host and source'],
        ['Burkholderia cepacia complex', 'Multidrug resistance is common', 'Important in cystic fibrosis and outbreak contexts', 'Treating it as a routine water organism'],
        ['Burkholderia pseudomallei', 'Requires organism-specific therapy and safety-aware handling', 'Reference or specialized guidance may be needed', 'Missing travel, soil, or water exposure'],
        ['Ralstonia/Achromobacter/Ochrobactrum', 'Variable resistance and limited standardized guidance for some species', 'Use validated systems and source-aware interpretation', 'Overtrusting a broad automated panel without context'],
        ['Chryseobacterium/Elizabethkingia group', 'Often resistant to many beta-lactams and aminoglycosides', 'Therapy interpretation can be nonintuitive', 'Assuming yellow-pigmented rods are harmless'],
        ['Rare environmental rods', 'Data may be limited and breakpoints may not exist', 'Reference lab or infectious disease input may be needed', 'Reporting unsupported interpretations too confidently']
      ],
      note: 'This is study guidance only. Final AST reporting depends on current standards, validated methods, and local policy.'
    }
  ],
  'curved-water-associated-gram-negative-rods': [
    {
      title: 'Water, Seafood, and Curved Gram-Negative Rod Detail Table',
      columns: ['Organism/group', 'Exposure/source pattern', 'Clinical anchors', 'Student warning'],
      rows: [
        ['Vibrio cholerae', 'Contaminated water or food; fecal-oral spread in outbreak or poor-sanitation settings', 'Profuse watery diarrhea, dehydration, epidemic/pandemic cholera context', 'Rehydration is central; public health context matters'],
        ['Vibrio parahaemolyticus', 'Raw or undercooked seafood, especially shellfish; marine/brackish water', 'Gastroenteritis, sometimes wound infection', 'Seafood exposure is the clue; not every Vibrio is cholera'],
        ['Vibrio vulnificus', 'Raw oysters, seawater wound exposure, brackish/saltwater exposure', 'Severe wound infection, necrotizing infection, sepsis, especially in liver disease or immunocompromise', 'This is a high-risk exposure organism; do not minimize wound/sepsis context'],
        ['Other Vibrio spp.', 'Marine or brackish water, seafood, wounds, or ear exposure', 'Gastroenteritis, wound infection, ear infection, rare bacteremia depending on species and host', 'Species and host risk drive meaning'],
        ['Aeromonas spp.', 'Freshwater, brackish water, fish, soil, wounds, and food/water exposure', 'Gastroenteritis, wound infection, bacteremia, cellulitis, pneumonia, hepatobiliary or other invasive infection in vulnerable hosts', 'Oxidase-positive and water-associated; do not force Enterobacterales logic'],
        ['Plesiomonas shigelloides', 'Freshwater or food/water exposure; gastrointestinal source', 'Gastroenteritis and rare extraintestinal disease', 'Can enter stool algorithms but has oxidase-positive logic'],
        ['Chromobacterium violaceum', 'Tropical/subtropical soil and water, skin trauma, freshwater exposure', 'Cellulitis, abscesses, sepsis, liver or deep abscesses; violet pigment may be present', 'Rare but potentially severe; pigment helps memory but absence does not exclude'],
        ['Shewanella putrefaciens/algae', 'Marine or water exposure, wounds, devices, or chronic skin disease contexts', 'Wound infection, bacteremia, otitis, soft tissue infection, rare invasive disease', 'Water exposure and oxidase-positive nonfermenter logic overlap'],
        ['Photobacterium damselae', 'Marine fish or saltwater wound exposure', 'Wound infection, severe soft tissue disease, rare septicemia', 'Exposure history can be more important than initial colony appearance']
      ]
    },
    {
      title: 'Curved/Water Rod Branch Clues',
      columns: ['Clue', 'Best study use', 'Pitfall'],
      rows: [
        ['Oxidase positive Gram-negative rod', 'Think beyond Enterobacterales: Vibrio, Aeromonas, Plesiomonas, nonfermenters', 'Oxidase does not give species'],
        ['Curved or comma-shaped rods', 'Supports Vibrio/Aeromonas-type branch when exposure fits', 'Morphology can be subtle or inconsistent'],
        ['Seafood or oyster exposure', 'Raises Vibrio concern, especially V. parahaemolyticus or V. vulnificus depending on syndrome', 'Seafood exposure does not equal cholera'],
        ['Freshwater wound', 'Raises Aeromonas and other water-associated rods', 'A routine wound culture may grow mixed organisms'],
        ['TCBS growth/color pattern', 'Useful for Vibrio screening in the right context', 'Not every water-associated organism belongs on TCBS logic'],
        ['Salt tolerance', 'Helps separate some marine Vibrio patterns', 'Growth conditions must match local method'],
        ['Violet pigment', 'Classic Chromobacterium memory clue', 'Pigment may depend on conditions and should not be the only clue']
      ]
    },
    {
      title: 'Water-Associated AST and Management Thinking',
      columns: ['Situation', 'Clinical idea', 'Student caution'],
      rows: [
        ['Cholera-like watery diarrhea', 'Rapid volume replacement is the first mental anchor; antimicrobial decisions depend on guidance and severity', 'Do not make therapy the first thought before dehydration risk'],
        ['V. vulnificus wound/sepsis concern', 'Severe wound infection or sepsis after saltwater/oyster exposure is urgent', 'Host risk such as liver disease changes seriousness'],
        ['Aeromonas wound infection', 'Consider water exposure and tissue involvement', 'Resistance patterns can differ from Enterobacterales'],
        ['Chromobacterium invasive disease', 'Rare but can progress with abscesses or sepsis', 'Do not dismiss as a colorful environmental isolate from a serious source'],
        ['Unusual oxidase-positive water isolate', 'Species-level ID and susceptibility may require validated methods', 'Avoid unsupported drug assumptions']
      ],
      note: 'This page is for study and bench reasoning, not patient-specific treatment advice.'
    }
  ],
  'fastidious-gram-negative-rods-and-coccobacilli': [
    {
      title: 'Fastidious Gram-Negative Rods and Coccobacilli Detail Table',
      columns: ['Organism/group', 'Growth/source pattern', 'Clinical anchors', 'Student warning'],
      rows: [
        ['Haemophilus influenzae', 'Respiratory tract colonizer; grows on chocolate agar with X and V factor support', 'Meningitis, epiglottitis, pneumonia, bacteremia, otitis, sinusitis, conjunctivitis, COPD exacerbation depending on strain and host', 'Encapsulated and nonencapsulated disease patterns differ'],
        ['Haemophilus ducreyi', 'Fastidious organism tied to genital ulcer disease', 'Chancroid with painful genital ulcers and lymphadenitis', 'Not part of routine respiratory Haemophilus thinking'],
        ['Other Haemophilus spp.', 'Upper respiratory/oral flora; variable X/V factor needs', 'Endocarditis, respiratory infection, bite or oral-flora-associated infection depending on species', 'Species and source matter more than the genus label alone'],
        ['Aggregatibacter actinomycetemcomitans', 'Oral flora; slow-growing capnophilic Gram-negative coccobacillus', 'Periodontal disease, endocarditis, abscesses, bite/oral-source infection', 'Think HACEK/oral flora when blood cultures or endocarditis context fit'],
        ['Actinobacillus spp.', 'Animal and oral flora association', 'Rare bite, wound, or invasive infection', 'Animal exposure can explain an unusual isolate'],
        ['Kingella kingae', 'Oropharyngeal colonizer, especially children', 'Osteoarticular infection, bacteremia, endocarditis', 'Pediatric joint/bone context is a key anchor'],
        ['Cardiobacterium hominis', 'Oral/upper respiratory flora', 'Endocarditis and rare invasive infection', 'Slow growth and blood culture context matter'],
        ['Capnocytophaga spp.', 'Oral flora of humans, dogs, and cats; capnophilic growth', 'Periodontal infection, bite wound infection, sepsis in asplenia or immunocompromise, endocarditis', 'Dog/cat bite plus severe sepsis is a major clue'],
        ['Dysgonomonas capnocytophagoides and related organisms', 'GI or oral-flora-associated unusual Gram-negative rods', 'Rare bacteremia, wounds, abscesses, or opportunistic infection', 'Clinical significance is highly source-dependent'],
        ['Pasteurella multocida group', 'Cat/dog oral flora; animal bite or scratch exposure', 'Rapid-onset cellulitis, bite wound infection, abscess, respiratory or invasive disease in selected hosts', 'Animal exposure is usually the organizing clue'],
        ['Mannheimia and related Pasteurellaceae', 'Animal-associated organisms, livestock or domestic animal exposure', 'Rare wound, respiratory, ocular, or invasive infection', 'Do not force routine Haemophilus logic'],
        ['Eikenella corrodens', 'Human oral flora; may pit agar and can have bleach-like odor', 'Human bite, clenched-fist injury, oral-source abscess, endocarditis, head/neck infection', 'Often part of mixed oral flora; resistance assumptions can be tricky'],
        ['Bergeyella zoohelcum', 'Dog and cat oral flora', 'Bite wound infection and rare invasive disease', 'Pet exposure matters'],
        ['Moraxella catarrhalis', 'Upper respiratory colonizer; oxidase-positive coccobacillus', 'Otitis media, sinusitis, COPD exacerbation, lower respiratory infection', 'Beta-lactamase is common; source decides significance'],
        ['Moraxella nonliquefaciens/lacunata-like organisms', 'Respiratory, eye, or mucosal flora depending on species', 'Eye infection, respiratory isolate, rare invasive disease', 'Do not overcall every Moraxella-like isolate'],
        ['Neisseria elongata and N. weaveri', 'Elongate/coccobacillary Neisseria-like organisms; oral or animal exposure contexts', 'Bacteremia, endocarditis, dog-bite wound infection depending on species', 'They can break the "Neisseria are diplococci" memory shortcut']
      ]
    },
    {
      title: 'Growth and Source Clues',
      columns: ['Clue', 'Points toward', 'How students should use it'],
      rows: [
        ['Chocolate agar and X/V factor logic', 'Haemophilus spp.', 'Connect growth requirement to respiratory, CSF, blood, eye, or genital source'],
        ['CO2 or capnophilic growth', 'Capnocytophaga, Aggregatibacter, Kingella, Cardiobacterium, some oral flora organisms', 'Think oral flora, endocarditis, bite, or deep abscess context'],
        ['Cat or dog bite/scratch', 'Pasteurella, Capnocytophaga, Bergeyella, Neisseria weaveri-like organisms', 'Animal exposure can organize the whole differential'],
        ['Human bite or clenched-fist injury', 'Eikenella and mixed oral flora', 'Do not miss oral-flora anaerobes and mixed infection context'],
        ['Pitting or bleach-like odor', 'Eikenella teaching clue', 'Helpful only when source and Gram stain fit'],
        ['Endocarditis or persistently positive blood cultures', 'HACEK-like organisms and oral flora Gram-negative rods', 'Slow growth and species-level ID can matter'],
        ['Small pleomorphic Gram-negative coccobacilli in respiratory source', 'Haemophilus, Moraxella, or other respiratory flora', 'Clinical syndrome separates colonization from infection'],
        ['Eye isolate with small Gram-negative coccobacilli', 'Haemophilus, Moraxella lacunata-like organisms, Pasteurellaceae in selected contexts', 'Specimen source changes the likely organism list']
      ]
    },
    {
      title: 'Fastidious GNR AST Anchors',
      columns: ['Organism/group', 'Resistance or therapy idea', 'Reporting caution'],
      rows: [
        ['Haemophilus influenzae', 'Beta-lactamase-mediated ampicillin resistance is common; beta-lactamase-negative ampicillin resistance is a special concept', 'Use organism-specific methods and current standards'],
        ['Moraxella catarrhalis', 'Beta-lactamase production is common', 'Respiratory significance depends on syndrome and specimen quality'],
        ['Pasteurella multocida group', 'Usually susceptible to several beta-lactams, but bite-wound therapy must cover mixed flora', 'Do not treat animal bites as single-organism problems'],
        ['Capnocytophaga spp.', 'Resistance can vary; severe disease risk is high in asplenia or immunocompromise', 'Animal bite/sepsis context may require urgent clinical attention'],
        ['Eikenella corrodens', 'Classic resistance traps include clindamycin and metronidazole inactivity', 'Mixed oral infections need source-aware coverage'],
        ['HACEK-like organisms', 'Endocarditis context makes precise ID and susceptibility interpretation important', 'Slow growth and specialized methods may be required'],
        ['Rare Pasteurellaceae or oral-flora rods', 'Breakpoints or validated methods may be limited', 'Avoid unsupported interpretations; reference methods may be needed']
      ],
      note: 'Final susceptibility reporting depends on current CLSI/FDA guidance, validated test methods, and local lab policy.'
    }
  ],
  'campylobacter-helicobacter-arcobacter': [
    {
      title: 'Curved Microaerophilic Rod Detail Table',
      columns: ['Organism/group', 'Source pattern', 'Clinical anchors', 'Student warning'],
      rows: [
        ['Campylobacter jejuni group', 'Poultry, cattle, pets, contaminated food or water, stool specimens', 'Gastroenteritis, inflammatory diarrhea, bacteremia in selected hosts, postinfectious complications such as reactive arthritis or Guillain-Barre syndrome', 'Do not treat every curved stool isolate as Vibrio or Aeromonas; atmosphere and temperature matter'],
        ['Campylobacter coli', 'Pigs, poultry, sheep, cattle, birds, foodborne exposure', 'Gastroenteritis and occasional bacteremia or invasive disease', 'Often learned with C. jejuni but species-level ID may matter in surveillance'],
        ['Campylobacter fetus', 'Cattle, sheep, animal exposure, bloodstream or sterile-site source', 'Bacteremia, septicemia, meningitis, abortion-related animal disease context, opportunistic infection', 'This is more invasive-disease logic than routine stool C. jejuni logic'],
        ['Campylobacter lari and related species', 'Birds, poultry, other animals, water exposure', 'Gastroenteritis, bacteremia, prosthetic joint or other invasive disease rarely', 'Uncommon Campylobacter species need source-aware interpretation'],
        ['Campylobacter concisus/curvus/gracilis group', 'Human oral and GI-associated sources', 'Periodontal disease, GI disease association, abscess or deep infection in selected cases', 'Clinical significance can be uncertain without source and syndrome'],
        ['Arcobacter butzleri/cryaerophilus', 'Animals, meat, water, and food-associated sources', 'Gastroenteritis, bacteremia, wound or opportunistic infection rarely', 'Can tolerate conditions that differ from classic Campylobacter'],
        ['Helicobacter pylori', 'Human gastric colonization', 'Chronic gastritis, peptic ulcer disease, gastric malignancy risk context', 'Bench logic is not the same as stool Campylobacter; urease and gastric testing dominate'],
        ['Other Helicobacter spp.', 'Animal, enterohepatic, or host-associated sources depending on species', 'Bacteremia or hepatobiliary/GI disease in selected hosts', 'Often requires specialized identification or reference methods']
      ]
    },
    {
      title: 'Culture and Branch Clues',
      columns: ['Clue', 'Points toward', 'How to use it'],
      rows: [
        ['Curved Gram-negative rods', 'Campylobacter, Helicobacter, Arcobacter, Vibrio, Aeromonas, or related organisms', 'Do not decide from shape alone; use oxidase, atmosphere, source, and media'],
        ['Microaerophilic incubation', 'Campylobacter/Helicobacter lane', 'Atmosphere is part of the ID clue, not just a culture detail'],
        ['Higher incubation temperature for stool Campylobacter workflows', 'C. jejuni/C. coli-style recovery', 'Temperature helps select the target organism and suppress competing flora'],
        ['Selective Campylobacter media', 'Stool Campylobacter recovery', 'Use when stool syndrome and lab protocol support it'],
        ['Hippurate positive pattern', 'Classic C. jejuni teaching anchor', 'A helpful clue, but modern ID methods may report species directly'],
        ['Rapid strong urease', 'H. pylori or selected urease-positive curved rods', 'Interpret with source: gastric biopsy is different from stool culture'],
        ['Nalidixic acid/cephalothin screen history', 'Older Campylobacter differentiation schemes', 'Useful as exam history, but many labs rely on modern methods']
      ]
    },
    {
      title: 'Helicobacter pylori Study Anchors',
      columns: ['Anchor', 'What it means', 'Why students care'],
      rows: [
        ['Urease activity', 'Helps organism survive acid and supports rapid urease testing from gastric material', 'Explains why urease is a major diagnostic clue'],
        ['Gastric mucus adherence', 'Organism persists near gastric epithelium', 'Connects colonization to chronic inflammation'],
        ['CagA/VacA concepts', 'Virulence-associated factors linked to inflammation and epithelial injury', 'Useful for understanding disease risk without memorizing every gene detail'],
        ['Peptic ulcer association', 'Chronic infection can contribute to ulcer disease', 'Turns an organism fact into a clinical syndrome'],
        ['Noninvasive tests', 'Urea breath test, stool antigen, and serology each answer different questions', 'Students should not treat all H. pylori tests as interchangeable']
      ]
    }
  ],
  'zoonotic-and-safety-sensitive-gram-negative-agents': [
    {
      title: 'Exposure-Driven Organism Table',
      columns: ['Organism/group', 'Reservoir or vector', 'Clinical anchors', 'Safety or workup warning'],
      rows: [
        ['Bartonella henselae', 'Domestic cats; scratches, bites, fleas', 'Cat-scratch disease, lymphadenopathy, bacillary angiomatosis, peliosis hepatis, bacteremia, endocarditis, neuroretinitis', 'Culture is not the first mental move for many cases; exposure and serology/NAAT context matter'],
        ['Bartonella quintana', 'Humans, body lice, homelessness or crowding risk contexts', 'Trench fever, chronic bacteremia, endocarditis, bacillary angiomatosis', 'Think vector and social-risk context, not routine wound culture'],
        ['Bartonella bacilliformis', 'Sandflies in endemic areas', 'Carrion disease with acute hemolytic fever and chronic verruga peruana phase', 'Travel/geography changes the differential'],
        ['Other Bartonella spp.', 'Rabbits, rats, cats, fleas, ticks, or uncertain reservoirs depending on species', 'Endocarditis, lymphadenopathy, fever, or rare invasive disease', 'Species lists are less important than exposure plus syndrome'],
        ['Brucella abortus', 'Cattle and unpasteurized dairy or animal exposure', 'Undulant fever, sweats, malaise, osteoarticular disease, hepatosplenic disease, endocarditis rarely', 'A major laboratory-acquired infection risk; do not manipulate suspicious cultures casually'],
        ['Brucella melitensis', 'Sheep, goats, unpasteurized dairy', 'Often more severe brucellosis; fever, sweats, bone/joint disease, systemic illness', 'Travel, occupation, and dairy history matter'],
        ['Brucella suis', 'Swine and wildlife exposure', 'Brucellosis with systemic and focal disease', 'Exposure history and biosafety are central'],
        ['Brucella canis', 'Dogs', 'Fever or systemic illness; often occupational or animal-contact context', 'May require specialized testing and public health awareness'],
        ['Bordetella pertussis', 'Humans', 'Pertussis with paroxysmal cough, whoop, post-tussive vomiting, infant apnea risk', 'Nasopharyngeal specimen timing and NAAT/culture rules matter'],
        ['Bordetella parapertussis', 'Humans', 'Pertussis-like illness, often milder', 'Do not assume all pertussis-like disease is B. pertussis'],
        ['Bordetella bronchiseptica', 'Animals, especially dogs and other mammals', 'Respiratory infection, opportunistic infection, animal-contact context', 'Animal exposure helps explain unusual recovery'],
        ['Francisella tularensis', 'Rabbits, rodents, ticks, deer flies, animal tissue, aerosols, contaminated water', 'Tularemia: ulceroglandular, glandular, oculoglandular, oropharyngeal, typhoidal, or pneumonic forms', 'High-concern lab safety organism; alert the lab if suspected']
      ]
    },
    {
      title: 'Syndrome-to-Specimen Thinking',
      columns: ['Clinical pattern', 'Organisms to think about', 'Specimen/testing idea'],
      rows: [
        ['Cat scratch plus lymphadenopathy', 'Bartonella henselae', 'Serology or molecular testing is often more useful than routine culture'],
        ['Prolonged fever plus livestock or unpasteurized dairy exposure', 'Brucella spp.', 'Blood culture may become positive slowly; alert lab because biosafety risk is real'],
        ['Paroxysmal cough or pertussis exposure', 'Bordetella pertussis/parapertussis', 'Nasopharyngeal swab/aspirate for NAAT or culture depending on timing and policy'],
        ['Rabbit/tick exposure with ulcer and nodes', 'Francisella tularensis', 'Serology/NAAT/reference workflow; routine culture manipulation is a safety risk'],
        ['Pneumonic tularemia concern', 'Francisella tularensis', 'Respiratory material may be relevant, but lab notification is critical'],
        ['Endocarditis with negative routine cultures', 'Bartonella, Brucella, HACEK-like organisms, Coxiella depending on history', 'Use exposure history to guide serology, molecular, or reference testing']
      ]
    },
    {
      title: 'Special-Agent Bench Cautions',
      columns: ['Agent/group', 'Bench clue', 'Do not miss'],
      rows: [
        ['Brucella spp.', 'Small Gram-negative coccobacilli, slow growth, possible positive blood cultures after days', 'Laboratory-acquired infection risk and need for notification'],
        ['Francisella tularensis', 'Tiny Gram-negative coccobacilli, cysteine requirement concept, slow growth', 'Potential aerosol risk; suspect tularemia before heavy manipulation'],
        ['Bordetella pertussis', 'Fastidious respiratory organism, specialized media or NAAT workflow', 'Timing of collection affects yield'],
        ['Bartonella spp.', 'Fastidious and often not recovered by routine culture', 'Exposure history plus serology/molecular testing often drives diagnosis'],
        ['Animal/vector-associated GNR', 'The organism name may be less obvious than the exposure story', 'Ask about pets, livestock, rabbits, ticks, fleas, lice, travel, and unpasteurized dairy']
      ],
      note: 'This table is educational. Suspected Brucella or Francisella should follow local biosafety, notification, and public health procedures.'
    }
  ],
  'neisseria-moraxella': [
    {
      title: 'Expanded Neisseria and Moraxella Detail Table',
      columns: ['Organism/group', 'Reservoir or source', 'Clinical anchors', 'Student warning'],
      rows: [
        ['Moraxella catarrhalis', 'Upper respiratory tract colonizer; sometimes genital tract colonization', 'Otitis media, sinusitis, COPD exacerbation, lower respiratory infection, occasional bacteremia', 'Respiratory specimen quality decides whether the result is useful'],
        ['Neisseria gonorrhoeae', 'Human mucosal surfaces; genital, anorectal, pharyngeal, conjunctival sites during infection', 'Urethritis, cervicitis, PID, epididymitis, disseminated infection, neonatal ophthalmia, pharyngitis, proctitis', 'Public health and current treatment guidance matter; do not rely on old therapy assumptions'],
        ['Neisseria meningitidis', 'Nasopharyngeal carriage in humans', 'Meningitis, meningococcemia, petechial rash, sepsis, pneumonia or conjunctivitis rarely', 'Sterile-site recovery is urgent and public-health relevant'],
        ['Commensal Neisseria spp.', 'Upper respiratory/oral flora', 'Usually colonization; rare bacteremia, endocarditis, or meningitis in selected cases', 'Do not overcall from nonsterile respiratory sources'],
        ['Neisseria animaloris/weaveri-like organisms', 'Dog and cat oral flora', 'Bite wound infection and rare systemic infection', 'Animal bite context changes the interpretation']
      ]
    },
    {
      title: 'Cocci and Coccobacilli Branch Clues',
      columns: ['Clue', 'Points toward', 'How to use it'],
      rows: [
        ['Gram-negative diplococci from genital source', 'N. gonorrhoeae concern', 'Follow validated STI testing and reporting workflow'],
        ['Gram-negative diplococci from CSF or blood', 'N. meningitidis concern', 'Urgent reporting and public health awareness'],
        ['Oxidase-positive coccobacillus from respiratory specimen', 'Moraxella catarrhalis or related organisms', 'Interpret with specimen quality and syndrome'],
        ['Butyrate-positive coccobacillus', 'Classic Moraxella catarrhalis clue', 'Useful clue, but modern ID may report directly'],
        ['Carbohydrate use patterns', 'Differentiate Neisseria species in classic workflows', 'Species ID should rely on validated methods, not one sugar alone'],
        ['Dry gray/translucent colonies on chocolate', 'Neisseria/Moraxella spectrum', 'Colony appearance supports but does not finish the ID']
      ]
    },
    {
      title: 'Neisseria/Moraxella AST Anchors',
      columns: ['Organism/group', 'Resistance idea', 'Reporting caution'],
      rows: [
        ['Moraxella catarrhalis', 'Beta-lactamase is common', 'Testing is not always needed for routine respiratory decisions'],
        ['N. gonorrhoeae', 'Resistance surveillance is a major public health issue', 'Use current guidance and validated methods; some methods may miss decreased susceptibility'],
        ['N. meningitidis', 'Penicillin and cephalosporin interpretation depends on guidance and isolate context', 'Sterile-site isolates may need public health handling'],
        ['Commensal Neisseria spp.', 'Resistance patterns vary and clinical significance is usually source-dependent', 'Do not report unsupported interpretations from colonizing flora']
      ],
      note: 'Current public health and local laboratory policy control final reporting for N. gonorrhoeae and N. meningitidis.'
    }
  ],
  'mycology-overview': [
    {
      title: 'Clinical Mycology Sorting Lanes',
      columns: ['Lane', 'What belongs here', 'Common clinical pattern', 'Student warning'],
      rows: [
        ['Superficial and cutaneous fungi', 'Dermatophytes, Malassezia, Candida in selected skin/mucosal settings', 'Tinea, pityriasis versicolor, onychomycosis, thrush, intertrigo, vulvovaginitis', 'Skin, hair, and nail disease often needs direct exam plus culture or molecular support rather than colony color alone'],
        ['Subcutaneous implantation fungi', 'Sporothrix, dematiaceous molds, agents of chromoblastomycosis, mycetoma organisms', 'Nodules, lymphocutaneous spread, verrucous lesions, draining sinuses, grains', 'Trauma history and tissue morphology are often more useful than a superficial swab'],
        ['Opportunistic yeasts', 'Candida, Cryptococcus, Trichosporon, Rhodotorula, Malassezia, other uncommon yeasts', 'Candidemia, catheter infection, meningitis, urinary or respiratory colonization, disseminated disease in high-risk hosts', 'A yeast name has different meaning in blood, CSF, sputum, urine, and skin'],
        ['Opportunistic molds', 'Aspergillus, Mucorales, Fusarium, Scedosporium/Lomentospora, dematiaceous molds, Paecilomyces-like groups', 'Pneumonia, sinusitis, keratitis, wound infection, disseminated disease', 'Direct tissue invasion matters; culture from nonsterile respiratory sites can represent colonization'],
        ['Thermally dimorphic fungi', 'Histoplasma, Blastomyces, Coccidioides, Sporothrix, Paracoccidioides, Talaromyces-like regional fungi', 'Pulmonary, skin, bone, CNS, or disseminated disease depending on organism and host', 'Mold manipulation can be a safety issue; antigen/serology and tissue forms can be central'],
        ['Fungal-like or unusual categories', 'Pneumocystis, Rhinosporidium, Lacazia-like organisms and other special agents', 'Disease patterns that do not fit routine yeast/mold culture logic', 'Some agents are not recovered by routine fungal culture']
      ]
    },
    {
      title: 'Fungal Taxonomy-to-Bench Translation',
      columns: ['Taxonomy language students see', 'Practical bench translation', 'Examples to place'],
      rows: [
        ['Mucoromycota / Mucorales', 'Broad, ribbon-like, pauciseptate hyphae; rapid mold growth; angioinvasion risk', 'Rhizopus, Mucor, Lichtheimia/Absidia-like groups, Cunninghamella'],
        ['Ascomycete molds', 'Many hyaline and dematiaceous septate molds plus dermatophytes and dimorphic fungi', 'Aspergillus, Fusarium, Scedosporium, Microsporum, Trichophyton, Histoplasma, Blastomyces, Coccidioides'],
        ['Yeast-forming ascomycetes', 'Budding yeasts, pseudohyphae, germ tube/chlamydospore or assimilation patterns', 'Candida, Geotrichum, Saccharomyces'],
        ['Basidiomycetous yeasts', 'Encapsulated or urease-positive yeast concepts; some unusual yeast-like pathogens', 'Cryptococcus/Filobasidiella, Trichosporon, Rhodotorula-like organisms'],
        ['Dematiaceous fungi', 'Melanin-pigmented molds with brown/black hyphae or colonies', 'Alternaria, Bipolaris, Cladophialophora, Exophiala, Fonsecaea, Phialophora'],
        ['Dermatophytes', 'Keratin-loving molds that infect skin, hair, and nails', 'Trichophyton, Microsporum, Epidermophyton']
      ]
    },
    {
      title: 'Common Fungal Recovery by Specimen Source',
      columns: ['Specimen/source', 'Common organisms to expect', 'Interpretation habit'],
      rows: [
        ['Blood', 'Candida spp. most often; also Cryptococcus, Histoplasma, Trichosporon, Saccharomyces, Malassezia in selected contexts', 'Yeast in blood is usually significant and should not be treated like colonization'],
        ['CSF', 'Cryptococcus, Candida rarely, Coccidioides or Histoplasma depending on geography and host', 'CSF source raises urgency; antigen, culture, and clinical syndrome all matter'],
        ['Genitourinary tract', 'Candida albicans, C. glabrata, C. tropicalis, C. parapsilosis, C. krusei', 'Urine yeast may be colonization, catheter-associated, contamination, or infection depending on context'],
        ['Respiratory tract', 'Yeasts, Aspergillus, Penicillium-like molds, Cladosporium, Alternaria, Fusarium, Mucorales, dimorphic fungi in the right setting', 'Sputum and BAL results require host risk, imaging, and direct exam correlation'],
        ['Skin, hair, nails', 'Dermatophytes, Candida, Malassezia, Scopulariopsis, Fusarium, Aspergillus, dematiaceous molds', 'Direct exam and anatomic site help separate pathogen from environmental recovery'],
        ['Tissue, biopsy, or sterile fluid', 'Candida, Aspergillus, Mucorales, dematiaceous molds, dimorphic fungi, Cryptococcus depending on site', 'Histopathologic invasion can outweigh a vague culture label']
      ]
    }
  ],
  'yeasts': [
    {
      title: 'Medically Important Yeast Anchors',
      columns: ['Yeast/group', 'Where students encounter it', 'Clinical anchors', 'Testing clue'],
      rows: [
        ['Candida albicans', 'Mucosa, urine, blood, wounds, skin, respiratory colonization', 'Thrush, vaginitis, catheter-associated infection, candidemia, invasive candidiasis', 'Germ tube/chlamydospore concepts and chromogenic media patterns can help'],
        ['Candida glabrata', 'GU tract, blood, mucosal sites, healthcare-associated contexts', 'Candidemia, urinary or mucosal infection, reduced azole susceptibility concern', 'Species-level ID matters because therapy assumptions differ from C. albicans'],
        ['Candida tropicalis', 'Blood, urine, mucosa, neutropenic or high-risk host settings', 'Candidemia, disseminated candidiasis, urinary and wound infection', 'Can be clinically important in immunocompromised patients'],
        ['Candida parapsilosis complex', 'Skin and catheter-associated contexts', 'Candidemia, line-associated infection, neonatal and device-associated disease', 'Biofilm/device context matters'],
        ['Candida krusei / Pichia kudriavzevii', 'Mucosa, blood, urine, high-risk hosts', 'Candidemia and mucosal disease', 'Intrinsic fluconazole resistance is the classic study warning'],
        ['Cryptococcus neoformans/gattii complex', 'Bird guano/soil or environmental exposure depending on species complex', 'Meningitis, pulmonary disease, fungemia or disseminated disease', 'Capsule, urease, cryptococcal antigen, and CSF context are core anchors'],
        ['Trichosporon spp.', 'Skin, GI, respiratory or blood in vulnerable hosts', 'Disseminated infection, fungemia, white piedra', 'Arthroconidia and yeast-like forms can confuse identification'],
        ['Malassezia furfur', 'Skin flora; lipid-associated growth', 'Pityriasis versicolor, folliculitis, catheter-associated fungemia in lipid exposure contexts', 'Lipid requirement can affect recovery'],
        ['Rhodotorula spp.', 'Environmental/skin-associated pigmented yeast', 'Catheter-associated fungemia or rare keratitis', 'Pink/coral colony is a clue but not final ID'],
        ['Saccharomyces spp.', 'GI flora/probiotic exposure, respiratory or blood cultures in selected hosts', 'Rare fungemia or endocarditis', 'Interpret with exposure, host, and sterile-site recovery']
      ]
    },
    {
      title: 'Yeast Significance by Source',
      columns: ['Source', 'Often meaningful', 'Often needs caution'],
      rows: [
        ['Blood', 'Candida, Cryptococcus, Trichosporon, Saccharomyces, Rhodotorula, Malassezia in compatible contexts', 'Do not dismiss as colonization; evaluate line/device, host, and repeat cultures'],
        ['CSF', 'Cryptococcus and selected endemic fungi or Candida in special settings', 'Antigen and culture should be interpreted with immune status and syndrome'],
        ['Urine', 'Candida spp.', 'May represent colonization or catheter-associated candiduria rather than invasive disease'],
        ['Respiratory specimen', 'Candida and other yeasts are often colonizers', 'Cryptococcus, endemic fungi, or invasive yeast disease require direct exam/antigen/tissue context'],
        ['Skin and mucosa', 'Candida, Malassezia, dermatophyte-like differential depending on site', 'Colonization is common; symptoms and direct exam matter'],
        ['Catheter/device context', 'Candida parapsilosis complex, Rhodotorula, Malassezia, Trichosporon and others', 'Biofilm and repeated recovery raise significance']
      ]
    },
    {
      title: 'Yeast Microscopy and Bench Clues',
      columns: ['Organism/group', 'Microscopy clue', 'Bench clue', 'Interpretation anchor'],
      rows: [
        ['Candida albicans', 'Budding yeast with pseudohyphae; germ tube and chlamydospore concepts', 'Often grows readily; chromogenic media may help presumptive sorting', 'Common mucosal and invasive yeast; source decides significance'],
        ['Candida glabrata', 'Small budding yeast, usually without pseudohyphae', 'May look deceptively bland on direct exam', 'Species matters because susceptibility expectations differ'],
        ['Candida krusei / Pichia kudriavzevii', 'Elongated yeast and pseudohyphae may be seen', 'Dry/rough colony patterns may occur depending on medium', 'Intrinsic fluconazole resistance is the high-yield caution'],
        ['Candida parapsilosis complex', 'Yeast with pseudohyphae; large curved or giant hyphae may be described in classic morphology', 'Catheter and neonatal/device contexts are common study anchors', 'Skin/device association raises biofilm concern'],
        ['Candida tropicalis', 'Yeast and pseudohyphae, often abundant in culture', 'Can appear on chromogenic media with species-specific color by platform', 'Important in candidemia and neutropenic hosts'],
        ['Cryptococcus spp.', 'Round to oval budding yeast; capsule may be visible by capsule stains or India ink', 'Urease and cryptococcal antigen are classic lab anchors', 'CSF or blood recovery is clinically important'],
        ['Trichosporon spp.', 'Yeast-like cells with arthroconidia and hyphae/pseudohyphae may occur', 'Can resemble Geotrichum-like arthroconidial yeasts', 'Disseminated disease can occur in immunocompromised hosts'],
        ['Saccharomyces spp.', 'Large budding yeast; rudimentary hyphae may be seen', 'May follow probiotic or GI exposure context', 'Usually uncommon as invasive disease but meaningful from sterile sites']
      ]
    }
  ],
  'molds-dermatophytes-dimorphic-fungi': [
    {
      title: 'Mold and Dimorphic Fungus Recognition Lanes',
      columns: ['Lane', 'Organisms to place here', 'Direct exam or culture clue', 'Clinical anchor'],
      rows: [
        ['Hyaline septate molds', 'Aspergillus, Fusarium, Scedosporium, Lomentospora, Paecilomyces-like molds, Scopulariopsis', 'Septate hyphae; conidial structures vary by genus', 'Sinusitis, pneumonia, keratitis, wound infection, disseminated disease in high-risk hosts'],
        ['Pauciseptate broad molds', 'Rhizopus, Mucor, Lichtheimia/Absidia-like groups, Cunninghamella', 'Broad ribbon-like hyphae with sparse septation and irregular branching', 'Rhinocerebral, pulmonary, cutaneous, GI, or disseminated mucormycosis'],
        ['Dematiaceous molds', 'Alternaria, Bipolaris, Exophiala, Fonsecaea, Phialophora, Cladophialophora', 'Brown/black colonies or pigmented hyphae from melanin', 'Phaeohyphomycosis, chromoblastomycosis, sinusitis, keratitis, brain abscess'],
        ['Dermatophytes', 'Trichophyton, Microsporum, Epidermophyton', 'Septate hyphae/arthroconidia in keratinized tissue; macroconidia/microconidia in culture', 'Tinea corporis, pedis, capitis, barbae, cruris, unguium'],
        ['Thermally dimorphic fungi', 'Histoplasma, Blastomyces, Coccidioides, Sporothrix, Paracoccidioides, Talaromyces-like fungi', 'Mold at environmental temperature and yeast/spherule/tissue form in host depending on organism', 'Pulmonary, skin, bone, CNS, or disseminated disease with geography and exposure clues'],
        ['Mycetoma/granule-forming fungi', 'Madurella, Scedosporium/Pseudallescheria, Acremonium-like groups, Exophiala and others', 'Grains in draining sinus material; color and histology can help', 'Chronic subcutaneous swelling, sinus tracts, grains after traumatic implantation']
      ]
    },
    {
      title: 'Common Mold and Dimorphic Organism Anchors',
      columns: ['Organism/group', 'Recovery/source pattern', 'Disease anchors', 'Student warning'],
      rows: [
        ['Aspergillus fumigatus/flavus/niger/terreus group', 'Respiratory secretions, sinus, skin, tissue, environmental contamination', 'Allergic disease, aspergilloma, invasive pulmonary/sinus disease, keratitis, disseminated disease', 'Respiratory recovery needs host/imaging/direct exam context'],
        ['Mucorales', 'Sinus, respiratory tissue, wound, skin, GI tissue', 'Angioinvasive mucormycosis in diabetes, neutropenia, trauma, transplant, or iron overload contexts', 'Broad hyphae in tissue can be more urgent than culture ID'],
        ['Fusarium spp.', 'Skin, eye, respiratory specimens, blood in disseminated disease', 'Keratitis, onychomycosis, skin lesions, fungemia in neutropenia', 'Can grow from blood more readily than many molds'],
        ['Scedosporium/Lomentospora', 'Respiratory, sinus, wound, near-drowning, transplant contexts', 'Pneumonia, brain abscess, disseminated disease, mycetoma', 'Species-level ID matters because resistance patterns can be difficult'],
        ['Sporothrix schenckii complex', 'Soil/plant/animal exposure; skin and lymphatic specimens', 'Lymphocutaneous nodules, pulmonary or disseminated disease rarely', 'Trauma/rose-thorn/cat exposure helps organize the diagnosis'],
        ['Histoplasma capsulatum', 'Respiratory, marrow, blood, tissue, urine antigen context', 'Pulmonary disease and disseminated disease, especially with immunosuppression', 'Small intracellular yeasts can resemble other organisms'],
        ['Blastomyces dermatitidis/gilchristii', 'Respiratory, skin, bone, GU, CNS or tissue specimens', 'Pulmonary disease, verrucous skin lesions, bone disease, disseminated infection', 'Broad-based budding yeast is a major tissue clue'],
        ['Coccidioides spp.', 'Respiratory/tissue; endemic arid regions', 'Pulmonary disease, meningitis, skin/bone dissemination', 'Spherules in tissue are high-yield; culture mold is a safety concern'],
        ['Paracoccidioides spp.', 'Respiratory/mucocutaneous tissue in endemic regions', 'Pulmonary and mucocutaneous disease', 'Multiple budding yeast forms are a classic recognition clue'],
        ['Dermatophytes', 'Skin, hair, nails', 'Tinea syndromes and onychomycosis', 'Species ID may need culture morphology or molecular methods']
      ]
    },
    {
      title: 'Dermatophyte and Keratin Specimen Logic',
      columns: ['Specimen', 'Best collection idea', 'What students should look for'],
      rows: [
        ['Skin scraping', 'Collect active scaly edge of lesion', 'Septate hyphae or arthroconidia on KOH/calcofluor; culture or molecular ID when needed'],
        ['Hair', 'Collect affected hairs and scale near active area', 'Ectothrix or endothrix arthroconidia patterns can support tinea capitis thinking'],
        ['Nail', 'Collect subungual debris and diseased nail material near active infection', 'Hyphae or arthroconidia; culture may be slow and contaminants are common'],
        ['Suspected inflammatory kerion', 'Hair/scale plus clinical context', 'Inflammation does not remove the need for fungal testing'],
        ['Environmental mold from nail', 'Correlate repeat recovery, direct exam, and clinical pattern', 'Non-dermatophyte molds can be contaminants or true nail pathogens']
      ]
    },
    {
      title: 'Dermatophyte Species Study Anchors',
      columns: ['Dermatophyte', 'Colony or growth memory', 'Microscopic anchor', 'Clinical association'],
      rows: [
        ['Microsporum audouinii', 'Slow-growing downy colony, often salmon-pink tones in classic descriptions', 'Pectinate or raquet-like hyphae and chlamydoconidia may be described', 'Tinea capitis, often human-associated'],
        ['Microsporum canis', 'Faster growth; fluffy colony with yellow-orange reverse in classic culture descriptions', 'Large spindle-shaped rough macroconidia with many compartments', 'Tinea capitis/corporis with cat or dog exposure clue'],
        ['Microsporum gypseum', 'Powdery cinnamon-tan colony memory', 'Elliptical rough macroconidia', 'Geophilic dermatophyte; soil exposure can matter'],
        ['Epidermophyton floccosum', 'Khaki/yellow-brown folded colony memory', 'Club-shaped macroconidia in clusters; microconidia absent', 'Tinea pedis, cruris, corporis, onychomycosis; does not invade hair'],
        ['Trichophyton mentagrophytes/interdigitale complex', 'Powdery to granular colony patterns vary', 'Many microconidia, spiral hyphae may be seen', 'Skin, nail, hair infection; animal versus human ecology may matter'],
        ['Trichophyton rubrum', 'White downy colony with red or wine reverse in classic memory', 'Tear-drop microconidia along hyphae; macroconidia uncommon', 'Common tinea pedis, corporis, cruris, and nail pathogen'],
        ['Trichophyton tonsurans', 'Variable colony; often suede-like or powdery', 'Microconidia of variable shapes; macroconidia rare', 'Common tinea capitis cause in many settings'],
        ['Trichophyton verrucosum', 'Slow-growing glabrous or heaped colony', 'Chains of chlamydoconidia may be prominent', 'Cattle-associated tinea; growth may improve at warmer incubation']
      ],
      note: 'Dermatophyte identification is increasingly supported by molecular methods. These are study anchors for classic morphology, not a requirement to memorize every colony shade.'
    },
    {
      title: 'Dematiaceous Fungus Disease Anchors',
      columns: ['Pattern', 'Organisms to place here', 'Tissue form', 'Clinical anchor'],
      rows: [
        ['Chromoblastomycosis', 'Fonsecaea, Phialophora, Cladophialophora-like agents', 'Sclerotic or muriform bodies', 'Chronic verrucous subcutaneous lesions after traumatic implantation'],
        ['Phaeohyphomycosis', 'Alternaria, Bipolaris, Exophiala, Curvularia, Cladophialophora and many others', 'Pigmented septate hyphae or yeast-like cells in tissue', 'Subcutaneous, sinus, eye, brain, or disseminated disease depending on host and species'],
        ['Eumycotic mycetoma', 'Madurella, Pseudallescheria/Scedosporium-like fungi and others', 'Grains with hyphae in draining sinuses', 'Chronic swelling, sinus tracts, and grains after traumatic implantation'],
        ['Black piedra', 'Piedraia hortae', 'Pigmented nodules on hair shaft', 'Hair shaft infection, usually cosmetic but diagnostic by hair findings'],
        ['Brain abscess from melanized mold', 'Cladophialophora bantiana and related neurotropic dematiaceous molds', 'Pigmented septate hyphae', 'CNS disease can occur even without classic severe immunosuppression']
      ]
    }
  ],
  'fungal-diagnostics': [
    {
      title: 'Direct Fungal Exam and Stain Jobs',
      columns: ['Method', 'Best use', 'What it shows', 'Pitfall'],
      rows: [
        ['KOH wet mount', 'Skin, hair, nail, and other keratinized material', 'Hyphae, yeast, pseudohyphae, arthroconidia', 'Clearing helps but low burden or thick material can still be missed'],
        ['Calcofluor white', 'Rapid screening for fungal cell walls in many specimen types', 'Bright fluorescent fungal elements', 'Requires fluorescence microscopy and background can confuse interpretation'],
        ['Gram stain', 'Yeasts and some fungal elements in routine clinical specimens', 'Candida-like yeast/pseudohyphae; some molds stain poorly', 'A negative Gram stain does not exclude fungi'],
        ['India ink', 'Rapid capsule screen in CSF for Cryptococcus in selected settings', 'Encapsulated yeast with halo when positive', 'Less sensitive than cryptococcal antigen and not reliable for every case'],
        ['Lactophenol cotton blue', 'Culture mount for mold morphology', 'Conidia, hyphae, fruiting structures', 'Manipulating mold cultures can be hazardous; use lab safety workflow'],
        ['GMS or PAS tissue stains', 'Histopathology for tissue invasion', 'Fungal walls and tissue distribution', 'Often does not identify species alone'],
        ['Mucicarmine or Fontana-Masson-style stains', 'Selected capsule or melanin questions', 'Cryptococcus capsule or dematiaceous pigment support depending on stain', 'Special stains answer narrow questions'],
        ['Wright/Giemsa-type stains', 'Blood, marrow, touch preps, or intracellular yeast clues', 'Histoplasma-like small yeasts or other forms in cells', 'Morphology overlaps with other intracellular organisms']
      ]
    },
    {
      title: 'Fungal Culture Media Jobs',
      columns: ['Medium or method', 'Primary purpose', 'Student caution'],
      rows: [
        ['Sabouraud dextrose agar', 'General fungal recovery', 'Cycloheximide or antibiotics may change what grows'],
        ['Brain-heart infusion agar/broth', 'Recovery of pathogenic fungi, yeasts, and some dimorphic fungi', 'Incubation temperature and safety rules matter'],
        ['Chromogenic yeast agar', 'Presumptive yeast separation by colony color/enzyme reactions', 'Color is a clue, not final ID for every isolate'],
        ['Dermatophyte test medium', 'Dermatophyte screening from skin, hair, nails', 'Color change can be false positive with contaminants or late readings'],
        ['Inhibitory mold agar / Mycosel-type media', 'Suppress bacteria and some saprophytes to recover dermatophytes/pathogenic fungi', 'Inhibition can also suppress some clinically relevant fungi'],
        ['Potato dextrose or potato flake media', 'Enhance mold sporulation and pigment expression', 'Useful for morphology, not primary clinical interpretation by itself'],
        ['Cornmeal/Tween or rice media', 'Yeast morphology such as chlamydospores or pseudohyphae', 'Classic method; many labs now use automated or molecular ID'],
        ['Urea or nitrate/assimilation tests', 'Biochemical yeast differentiation', 'Use validated algorithms and current nomenclature'],
        ['Conversion or enriched media for dimorphic fungi', 'Demonstrate mold-to-yeast conversion in selected organisms', 'Manipulation may require special safety precautions']
      ]
    },
    {
      title: 'Antigen, Serology, and Molecular Fungal Tests',
      columns: ['Test type', 'High-yield examples', 'Best use', 'Interpretation trap'],
      rows: [
        ['Cryptococcal antigen', 'Serum or CSF CrAg', 'Cryptococcal meningitis or disseminated disease evaluation', 'Very useful, but clinical syndrome and immune status still matter'],
        ['Galactomannan', 'Serum or BAL Aspergillus antigen in selected hosts', 'Supports invasive aspergillosis workup', 'False positives and host/test context affect interpretation'],
        ['Beta-D-glucan', 'Broad fungal cell wall marker', 'Adjunct for selected invasive fungal infections', 'Not specific; Mucorales and Cryptococcus may be poorly detected'],
        ['Histoplasma antigen', 'Urine/serum antigen', 'Disseminated or acute pulmonary histoplasmosis, especially high burden disease', 'Cross-reactivity with other endemic fungi can occur'],
        ['Coccidioides serology', 'IgM/IgG, complement fixation/immunodiffusion-style concepts', 'Pulmonary, disseminated, or CNS disease support in endemic exposure', 'Early serology may be negative and interpretation varies by disease stage'],
        ['Molecular or sequencing methods', 'ITS sequencing, targeted PCR, broad fungal PCR depending on lab', 'Difficult IDs, sterile tissue, culture-negative disease, taxonomy updates', 'Database quality and specimen contamination affect meaning']
      ]
    },
    {
      title: 'Fungal Specimen Handling Priorities',
      columns: ['Specimen', 'Processing idea', 'Why students care'],
      rows: [
        ['Respiratory specimens', 'Collect good-quality sputum/BAL/tissue; avoid overgrowth and correlate with direct exam', 'Airway colonization and environmental contamination are common'],
        ['CSF', 'Concentrate when volume allows and pair culture with antigen or molecular/serologic tests as indicated', 'Fungal meningitis often has low organism burden'],
        ['Tissue biopsy', 'Split for histopathology and culture when possible', 'Tissue invasion and viable culture answer different questions'],
        ['Skin/hair/nail', 'Collect active lesion edge, affected hair, or subungual debris', 'Poor collection causes false negatives and contaminant-heavy cultures'],
        ['Blood or marrow', 'Use fungal blood culture or lysis-centrifugation-type methods when indicated by lab', 'Some fungi need specialized blood recovery systems'],
        ['Mold culture isolate', 'Limit manipulation when dimorphic fungi or dangerous molds are possible', 'Safety and reference-lab workflow can matter more than quick bench curiosity']
      ]
    }
  ],
  'parasitology-overview': [
    {
      title: 'Human Parasite Recognition Lanes',
      columns: ['Major lane', 'What students should recognize first', 'Common disease/source anchors', 'Diagnostic starting point'],
      rows: [
        ['Intestinal protozoa - amoebae', 'Trophozoites and cysts; motility and nuclear/cytoplasmic details on permanent stain', 'Entamoeba histolytica invasive disease versus nonpathogenic amoebae; diarrheal or asymptomatic carriage patterns', 'Stool O&P with concentration and permanent stain; antigen/NAAT when available for selected pathogens'],
        ['Intestinal protozoa - flagellates', 'Trophozoites with flagella and cyst forms for several genera', 'Giardia malabsorption/watery diarrhea; Dientamoeba and other flagellates as differential organisms', 'Stool microscopy plus antigen or molecular methods for high-yield targets'],
        ['Intestinal protozoa - ciliates', 'Large ciliated trophozoites and cysts', 'Balantidium coli diarrhea, often tied to animal exposure in the right setting', 'Wet mount and concentration/permanent stain correlation'],
        ['Coccidia and coccidian-like intestinal parasites', 'Oocysts, often requiring modified acid-fast or fluorescent methods', 'Cryptosporidium, Cyclospora, Cystoisospora; more severe or prolonged illness in immunocompromised hosts', 'Request or perform specific stains, antigen, or molecular tests instead of relying only on routine O&P'],
        ['Microsporidia', 'Very small spores that require special stains or molecular methods', 'Chronic diarrhea or disseminated disease, especially in immunocompromised hosts', 'Modified trichrome/chromotrope-type stains, fluorescent stains, histology, or molecular testing'],
        ['Blood and tissue protozoa', 'Intraerythrocytic forms, trypomastigotes, amastigotes, tachyzoites, cysts, or tissue forms depending on organism', 'Malaria, Babesia, Trypanosoma, Leishmania, Toxoplasma, free-living amoebae', 'Specimen site and timing drive method: blood films, tissue exam, serology, NAAT, or reference testing'],
        ['Helminths', 'Eggs, larvae, adult worms, proglottids, scolices, microfilariae, or tissue cysts', 'Nematodes, cestodes, trematodes; intestinal, tissue, blood, liver, lung, and CNS patterns', 'O&P, concentration, tape prep, blood concentration, tissue biopsy, serology, or imaging support depending on life stage']
      ]
    },
    {
      title: 'Parasite Body Site and Recovery Map',
      columns: ['Specimen/site', 'Parasites students should place here', 'Best first method idea'],
      rows: [
        ['Stool or intestinal tract', 'Giardia, Entamoeba, Dientamoeba, Cryptosporidium, Cyclospora, Cystoisospora, microsporidia, Ascaris, hookworm, Trichuris, Strongyloides, Taenia, Hymenolepis, Diphyllobothrium, intestinal flukes', 'O&P with concentration and permanent stain; add antigen, acid-fast, modified trichrome, or molecular tests when indicated'],
        ['Perianal region', 'Enterobius vermicularis eggs', 'Cellulose tape preparation collected before bathing or toileting'],
        ['Blood smear', 'Plasmodium, Babesia, Trypanosoma, some microfilariae', 'Thick and thin films with urgent review when malaria is possible'],
        ['Whole blood or buffy coat/concentrates', 'Microfilariae and selected trypanosomes depending on timing and geography', 'Concentration methods or specialized blood parasite workup'],
        ['Bone marrow, lymph node, spleen, or tissue aspirate', 'Leishmania amastigotes, Trypanosoma cruzi in selected settings', 'Giemsa-stained aspirate/tissue, culture, molecular or reference testing'],
        ['CSF or CNS tissue', 'Naegleria, Acanthamoeba, Balamuthia, Toxoplasma, neurocysticercosis context', 'Wet mount for motile amoebae when suspected, histology, serology, NAAT, or imaging-supported workup'],
        ['Urine or urogenital specimen', 'Schistosoma haematobium eggs, Trichomonas vaginalis, microfilariae rarely depending on geography', 'Urine sediment/concentration, wet mount/NAAT for Trichomonas, timing-aware collection for schistosome eggs'],
        ['Sputum or lung tissue', 'Paragonimus eggs, Strongyloides larvae in hyperinfection, microsporidia in selected hosts', 'O&P-style exam of appropriate respiratory material, histology, special stains, or molecular/reference methods'],
        ['Skin snip, biopsy, or lesion material', 'Onchocerca microfilariae, Leishmania, Acanthamoeba, myiasis larvae, scabies mites', 'Skin snip/biopsy, Giemsa/histology, direct exam, or organism-specific collection'],
        ['Eye/cornea/conjunctiva', 'Acanthamoeba, microsporidia, Loa loa microfilariae in selected cases', 'Corneal scraping, special stains, wet mount, or reference testing by suspected organism']
      ]
    },
    {
      title: 'Exposure-to-Parasite Shortcuts',
      columns: ['Exposure clue', 'Parasite groups to consider', 'Study action'],
      rows: [
        ['Untreated water, daycare, camping, or outbreak diarrhea', 'Giardia, Cryptosporidium, Cyclospora, Cystoisospora, Entamoeba depending on setting', 'Ask whether antigen/NAAT or special stains are needed in addition to O&P'],
        ['Undercooked pork, beef, fish, crab, crayfish, or aquatic plants', 'Taenia, Trichinella, Diphyllobothrium, Clonorchis/Opisthorchis, Paragonimus, Fasciola', 'Connect food source to adult intestinal disease versus larval or tissue disease'],
        ['Barefoot soil exposure', 'Hookworm, Strongyloides, cutaneous larva migrans patterns', 'Think larvae and migration, not just stool eggs'],
        ['Freshwater skin exposure in endemic region', 'Schistosoma spp.', 'Urine, stool, serology, or tissue findings depend on species and timing'],
        ['Arthropod vector exposure', 'Malaria, Babesia, leishmaniasis, Chagas disease, African trypanosomiasis, filarial infections', 'Match vector/geography to blood film, serology, molecular, or tissue methods'],
        ['Immunocompromised host with persistent diarrhea', 'Cryptosporidium, Cystoisospora, microsporidia, Strongyloides hyperinfection, Toxoplasma when systemic/CNS disease appears', 'Escalate beyond routine O&P when symptoms persist or host risk is high']
      ]
    }
  ],
  'stool-ova-and-parasite': [
    {
      title: 'Stool O&P Collection Strategy',
      columns: ['Collection choice', 'When it helps', 'Student warning'],
      rows: [
        ['Single stool O&P', 'May be acceptable when organism burden is high or local algorithm starts with one specimen', 'A single negative exam can miss intermittent shedding'],
        ['Multiple stool specimens on separate days', 'Improves recovery when symptoms persist or suspicion remains', 'Follow local timing rules; collecting many samples on the same day is less useful'],
        ['Preserved stool set', 'Maintains morphology for concentration and permanent stain workflows', 'Wrong preservative can make a requested method impossible'],
        ['Fresh stool', 'Needed for motility, trophozoites, some antigen/molecular workflows, and selected parasite recovery', 'Delay can destroy motility and distort morphology'],
        ['Targeted stool antigen or NAAT', 'High-yield for Giardia, Cryptosporidium, Entamoeba histolytica, and multiplex panels depending on lab', 'A negative limited panel does not exclude every parasite'],
        ['Special request for coccidia or microsporidia', 'Persistent diarrhea, immunocompromise, outbreak/travel clues, or suspicious oocysts/spores', 'Routine O&P may not include modified acid-fast or modified trichrome unless ordered or reflexed']
      ]
    },
    {
      title: 'Stool Testing Decision Table',
      columns: ['Clinical situation', 'High-yield test direction', 'Follow-up if negative but suspicion remains'],
      rows: [
        ['Acute watery diarrhea with daycare, camping, municipal water, or outbreak clue', 'Giardia/Cryptosporidium antigen, NAAT, or O&P depending on lab algorithm', 'Consider O&P and coccidia testing if symptoms persist'],
        ['Prolonged diarrhea in immunocompromised host', 'Cryptosporidium/Cyclospora/Cystoisospora testing plus microsporidia stain or molecular testing when indicated', 'Repeat or broaden testing; routine O&P alone may be insufficient'],
        ['Bloody diarrhea or dysentery after travel', 'O&P with permanent stain and Entamoeba histolytica-specific antigen/NAAT if available', 'Do not rely on morphology alone to separate E. histolytica from look-alikes'],
        ['Eosinophilia with GI or pulmonary symptoms', 'O&P plus Strongyloides-specific testing strategy and serology when appropriate', 'Larvae can be missed; repeated or specialized methods may be needed'],
        ['Suspected pinworm', 'Tape preparation rather than stool O&P', 'Stool is often low yield for Enterobius'],
        ['Suspected foodborne coccidian outbreak', 'Cyclospora/Cystoisospora/Cryptosporidium acid-fast or molecular testing depending on lab', 'Make the request explicit if not included in routine stool exam']
      ]
    },
    {
      title: 'Fecal Fixative and Stain Jobs',
      columns: ['Container or method', 'Best use', 'What it may not support'],
      rows: [
        ['10% formalin or formalin-based preservative', 'Concentration for eggs, larvae, cysts, and oocysts; some antigen workflows depending on kit', 'Not ideal for permanent protozoan morphology'],
        ['PVA or equivalent permanent-stain preservative', 'Permanent stained smear for protozoan trophozoites and cysts', 'Often not used for concentration and may be incompatible with some molecular tests'],
        ['SAF or single-vial systems', 'Combined concentration and permanent stain support depending on method', 'Performance and compatibility vary by lab'],
        ['Fresh or unpreserved stool', 'Wet mount, motility, some antigen/NAAT tests, and special parasite recovery', 'Morphology degrades quickly; transport timing matters'],
        ['Modified acid-fast stain', 'Cryptosporidium, Cyclospora, and Cystoisospora oocyst detection', 'Not a general stain for every intestinal parasite'],
        ['Modified trichrome or chromotrope-type stain', 'Microsporidia spores', 'Routine trichrome may miss or underemphasize microsporidia'],
        ['Trichrome or iron hematoxylin permanent stain', 'Protozoan nuclear and cytoplasmic details', 'Does not replace concentration for helminth eggs and larvae'],
        ['Fluorescent stains or immunoassays', 'Selected protozoa, coccidia, or microsporidia depending on method', 'A method can be highly targeted; know what is included']
      ]
    }
  ],
  'intestinal-protozoa': [
    {
      title: 'Intestinal Protozoa Recognition Table',
      columns: ['Organism/group', 'Main form or clue', 'Clinical anchor', 'Testing emphasis'],
      rows: [
        ['Giardia duodenalis complex', 'Trophozoites and cysts; flagellate morphology; antigen/NAAT targets common', 'Watery diarrhea, malabsorption, bloating, camping/daycare/water exposure', 'Antigen or NAAT is common; O&P can identify forms when present'],
        ['Entamoeba histolytica', 'Amoebic trophozoites/cysts; invasive disease concern', 'Dysentery, liver abscess, extraintestinal spread', 'Use specific antigen/NAAT/serology when needed; morphology overlaps with nonpathogenic amoebae'],
        ['Entamoeba dispar/moshkovskii-like nonpathogenic look-alikes', 'Morphology may resemble E. histolytica', 'Usually not invasive disease in routine teaching', 'Do not diagnose invasive amebiasis by look-alike morphology alone'],
        ['Dientamoeba fragilis', 'Trophozoite detected on permanent stain; cyst recognition is not the usual student anchor', 'Diarrhea or abdominal symptoms in selected cases', 'Permanent stain quality matters'],
        ['Balantidium coli', 'Large ciliated trophozoite or cyst', 'Diarrhea or dysentery-like illness; animal exposure may help', 'Wet mount can show motility when fresh'],
        ['Cryptosporidium spp.', 'Small oocysts; modified acid-fast/fluorescent/antigen/NAAT target', 'Watery diarrhea; severe prolonged disease in immunocompromised hosts', 'Routine O&P may miss unless specific method is used'],
        ['Cyclospora cayetanensis', 'Larger coccidian oocysts; variable acid-fastness and autofluorescence can help', 'Prolonged relapsing diarrhea linked to produce or travel/outbreaks', 'Request coccidia testing or molecular method when suspected'],
        ['Cystoisospora belli', 'Large oval oocysts', 'Watery diarrhea, especially in immunocompromised hosts', 'Modified acid-fast and concentration can help'],
        ['Microsporidia', 'Tiny spores, often difficult to see without special stains', 'Chronic diarrhea or disseminated disease in immunocompromised hosts', 'Modified trichrome, fluorescent stains, histology, EM, or molecular testing'],
        ['Blastocystis and other debated/low-specificity findings', 'Variable forms in stool', 'May be reported but clinical significance can be uncertain', 'Interpret with symptoms, burden, and exclusion of clearer causes']
      ]
    },
    {
      title: 'Intestinal Protozoa Host-Risk Table',
      columns: ['Host/situation', 'Organisms to emphasize', 'Why it matters'],
      rows: [
        ['Healthy host with short self-limited diarrhea', 'Giardia, Cryptosporidium, Entamoeba, food/water-associated protozoa depending on exposure', 'Testing is guided by duration, outbreak risk, and exposure history'],
        ['Immunocompromised host with persistent watery diarrhea', 'Cryptosporidium, Cystoisospora, microsporidia, Cyclospora, Strongyloides differential', 'Disease can be severe, prolonged, or disseminated'],
        ['Traveler or immigrant with dysentery or liver abscess', 'Entamoeba histolytica', 'Extraintestinal disease changes specimen and serology strategy'],
        ['Daycare or institutional outbreak', 'Giardia and Cryptosporidium', 'Transmission control and targeted testing matter'],
        ['Produce-associated outbreak', 'Cyclospora and other coccidia depending on epidemiology', 'Routine bacterial stool culture will not answer the question'],
        ['Vaginal discharge or urogenital symptoms', 'Trichomonas vaginalis', 'NAAT/wet mount/rapid tests use urogenital specimens, not stool O&P']
      ]
    },
    {
      title: 'Protozoa Special Method Map',
      columns: ['Method', 'Best targets', 'Student caution'],
      rows: [
        ['Wet mount', 'Motile trophozoites, larvae, and rapid gross morphology when fresh', 'Sensitivity drops quickly after delay'],
        ['Concentration', 'Cysts, oocysts, eggs, and larvae present in low numbers', 'Trophozoite morphology may be poor'],
        ['Permanent stain', 'Protozoan trophozoite and cyst detail', 'Requires good fixation and skilled reading'],
        ['Modified acid-fast', 'Cryptosporidium, Cyclospora, Cystoisospora', 'Not all oocysts stain equally; size and shape still matter'],
        ['Modified trichrome/chromotrope-type stains', 'Microsporidia', 'Spores are tiny and easily overlooked'],
        ['Antigen tests', 'Commonly Giardia, Cryptosporidium, Entamoeba histolytica depending on assay', 'Know exactly which organisms the kit detects'],
        ['NAAT/multiplex panels', 'Selected protozoa included on validated panels', 'A panel result is limited to its menu and specimen validation']
      ]
    },
    {
      title: 'Amoebae Morphology Sorting Clues',
      columns: ['Feature to compare', 'Pathogenic E. histolytica clue', 'Look-alike or nonpathogenic patterns', 'Student warning'],
      rows: [
        ['Trophozoite motility', 'Progressive directional movement may be seen in fresh specimens', 'Many nonpathogenic amoebae are sluggish or nondirectional', 'Motility disappears quickly when stool is delayed or preserved'],
        ['Red blood cells inside trophozoites', 'Ingested RBCs strongly support E. histolytica in the right specimen', 'E. dispar and many nonpathogenic amoebae should not show ingested RBCs', 'This is one of the few morphology clues that can separate invasive E. histolytica-type disease from look-alikes'],
        ['Nucleus and karyosome', 'Small compact karyosome, often central or slightly eccentric', 'E. coli often has a larger irregular karyosome; Iodamoeba can have a large basket-like karyosome', 'Unstained wet mounts may hide nuclear detail'],
        ['Peripheral chromatin', 'Fine, even peripheral chromatin supports Entamoeba histolytica/dispar-type morphology', 'Coarse or irregular chromatin points away from the classic pathogenic pattern', 'Permanent stain quality controls how useful this clue is'],
        ['Cyst nuclei count', 'Mature E. histolytica/dispar-type cysts have up to 4 nuclei', 'E. coli mature cysts can have more nuclei; Endolimax and Iodamoeba patterns differ', 'Count nuclei only when the cyst is mature enough and well stained'],
        ['Chromatoid bodies and glycogen', 'Rounded chromatoid bodies may be seen in immature E. histolytica/dispar-type cysts', 'Splinter-like chromatoid bodies and large iodine-staining glycogen patterns point to other amoebae', 'Cyst stage affects what structures are visible']
      ]
    },
    {
      title: 'Flagellate and Ciliate Morphology Anchors',
      columns: ['Organism/group', 'Recognition clue', 'Clinical or specimen anchor', 'Common trap'],
      rows: [
        ['Giardia duodenalis complex', 'Pear-shaped trophozoite with falling-leaf motility; oval cyst with multiple nuclei when mature', 'Watery diarrhea, malabsorption, daycare, camping, or water exposure', 'A single stool exam can miss intermittent shedding'],
        ['Dientamoeba fragilis', 'Amoeba-like trophozoite; no routine cyst stage for most student algorithms', 'Diarrhea or abdominal symptoms in selected patients', 'Can be overlooked if permanent stain is poor'],
        ['Chilomastix mesnili', 'Lemon-shaped cyst with a cytostome; trophozoite flagellate morphology', 'Usually nonpathogenic intestinal flagellate', 'Do not overcall as Giardia'],
        ['Pentatrichomonas hominis and related intestinal trichomonads', 'Trophozoite only; jerky motility and undulating membrane concepts', 'Usually intestinal finding rather than classic STI agent', 'No cyst stage means preservation and timing affect recovery'],
        ['Trichomonas vaginalis', 'Trophozoite only; jerky motility; urogenital specimen', 'Vaginitis, urethritis, discharge, irritation, or asymptomatic infection', 'Stool O&P is not the diagnostic lane; NAAT or wet mount/rapid methods use urogenital specimens'],
        ['Balantidium coli', 'Large ciliated trophozoite; cyst can be large and round/oval', 'Diarrhea/dysentery pattern, often with animal exposure context', 'Large size helps, but delayed specimens can reduce motility clues']
      ]
    },
    {
      title: 'Coccidia, Microsporidia, and Blastocystis Anchors',
      columns: ['Organism/group', 'Size or stain concept to remember', 'Host/disease anchor', 'Testing caution'],
      rows: [
        ['Cryptosporidium spp.', 'Small round oocysts, often found with modified acid-fast, fluorescent, antigen, or NAAT methods', 'Watery diarrhea; severe or chronic disease in immunocompromised hosts', 'Routine O&P may miss it unless a targeted method is included'],
        ['Cyclospora cayetanensis', 'Larger round oocysts with variable acid-fast staining and autofluorescence', 'Prolonged relapsing diarrhea, produce-associated outbreaks, travel', 'Can be confused with Cryptosporidium if size and stain behavior are ignored'],
        ['Cystoisospora belli', 'Large oval oocysts', 'Diarrhea in immunocompromised hosts or travelers', 'Concentration and modified acid-fast methods improve detection'],
        ['Sarcocystis hominis/suihominis', 'Thin-walled oocysts or sporocysts may be seen in stool', 'Intestinal infection after undercooked meat exposure', 'Often less emphasized than coccidia but belongs in the oocyst lane'],
        ['Microsporidia', 'Tiny spores requiring modified trichrome, fluorescent stains, histology, EM, or molecular methods', 'Chronic diarrhea, keratitis, sinus/pulmonary/urinary or disseminated disease in selected hosts', 'Small size makes them easy to miss on routine stains'],
        ['Blastocystis', 'Variable forms, often central-body appearance in stool', 'Clinical significance can be uncertain and depends on symptoms and burden', 'Some labs report it; students should avoid treating the name alone as proof of disease']
      ]
    }
  ],
  'helminths': [
    {
      title: 'Helminth Exposure and Life-Stage Organizer',
      columns: ['Group', 'Transmission anchor', 'Diagnostic life stage to look for', 'Common trap'],
      rows: [
        ['Intestinal nematodes', 'Egg ingestion or larvae from soil depending on organism', 'Eggs, larvae, or adult worms in stool or perianal tape prep', 'Not every nematode egg looks alike; size, shell, plugs, and larvae matter'],
        ['Tissue nematodes', 'Larval migration from food, soil, or animal-associated exposure', 'Larvae or tissue reaction; serology/imaging may support', 'Stool may be negative when disease is tissue-based'],
        ['Filarial nematodes', 'Arthropod transmission', 'Microfilariae in blood, skin snips, or tissue depending on species', 'Collection time can matter because some circulate periodically'],
        ['Intestinal cestodes', 'Ingestion of larval cysts in meat/fish or eggs depending on species', 'Eggs, proglottids, scolex, or adult worm segments', 'Taenia eggs do not separate species well without proglottid/scolex context'],
        ['Tissue cestodes', 'Ingestion of eggs or larval-stage exposure', 'Cysts or larvae in tissue; serology/imaging often important', 'Adult tapeworm stool logic does not explain cysticercosis or hydatid disease'],
        ['Intestinal trematodes', 'Ingestion of metacercariae on plants or aquatic animals', 'Operculated eggs in stool', 'Food source and geography are often more helpful than symptoms'],
        ['Liver and lung trematodes', 'Ingestion of raw/undercooked fish, crabs, crayfish, or aquatic plants', 'Eggs in stool, sputum, or tissue depending on organism', 'Paragonimus can mimic pulmonary disease; eggs may be in sputum'],
        ['Blood trematodes', 'Skin penetration by cercariae in freshwater', 'Eggs in urine, stool, or tissue depending on species', 'Schistosome eggs are not operculated; spine position is high yield']
      ]
    },
    {
      title: 'Helminth High-Yield Morphology Cues',
      columns: ['Morphology cue', 'Organisms/groups to consider', 'How students should use it'],
      rows: [
        ['Planoconvex egg on tape prep', 'Enterobius vermicularis', 'Think perianal collection rather than routine stool O&P'],
        ['Barrel-shaped egg with bipolar plugs', 'Trichuris trichiura', 'Attach morphology to fecal-oral soil exposure'],
        ['Mammillated thick-shelled egg', 'Ascaris lumbricoides', 'Large intestinal nematode with pulmonary migration possibility'],
        ['Thin-shelled oval egg with developing larva', 'Hookworm-type eggs', 'Species separation often needs larvae or epidemiology'],
        ['Rhabditiform larvae in stool', 'Strongyloides or hookworm depending on morphology', 'Strongyloides can autoinfect and cause hyperinfection'],
        ['Radially striated Taenia-type egg', 'Taenia spp.', 'Species cannot be reliably separated by egg alone'],
        ['Operculated egg', 'Many trematodes and some fish tapeworms', 'Use size, shoulders/knobs, source, and site to narrow'],
        ['Terminal-spined egg in urine', 'Schistosoma haematobium', 'Urine timing and concentration may matter'],
        ['Lateral-spined egg in stool', 'Schistosoma mansoni', 'Stool or tissue context and geography guide interpretation'],
        ['Microfilariae in blood or skin', 'Wuchereria/Brugia/Loa/Mansonella/Onchocerca depending on site and morphology', 'Collection site and timing are part of identification']
      ]
    },
    {
      title: 'Intestinal Nematode Disease Anchors',
      columns: ['Organism/group', 'Transmission clue', 'Disease pattern to remember', 'Diagnostic anchor'],
      rows: [
        ['Ascaris lumbricoides', 'Ingestion of embryonated eggs from fecally contaminated soil or food', 'Worm burden can cause intestinal obstruction, biliary/pancreatic migration, cough/eosinophilia during larval lung migration, and malnutrition in heavy infection', 'Mammillated eggs in stool; adult worms may be passed or seen in procedures'],
        ['Enterobius vermicularis', 'Fecal-oral spread and autoinfection; household spread is common', 'Perianal itching, sleep disturbance, vulvovaginal migration rarely, often mild infection', 'Morning tape prep rather than routine stool O&P'],
        ['Strongyloides stercoralis', 'Skin penetration by larvae from contaminated soil; autoinfection can occur', 'Chronic intermittent GI/skin/pulmonary symptoms, eosinophilia, and dangerous hyperinfection in immunosuppression', 'Larvae in stool or respiratory specimens; serology often supports diagnosis'],
        ['Trichuris trichiura', 'Ingestion of eggs from contaminated soil', 'Heavy infection can cause abdominal pain, anemia, growth issues, and rectal prolapse', 'Barrel-shaped eggs with bipolar plugs in stool'],
        ['Hookworms: Ancylostoma duodenale and Necator americanus', 'Skin penetration by filariform larvae; A. duodenale can also involve oral exposure in some settings', 'Iron-deficiency anemia, abdominal symptoms, eosinophilia, and ground itch at entry site', 'Thin-shelled eggs in stool; larvae may be needed for species-level separation'],
        ['Capillaria philippinensis', 'Ingestion of infected raw or undercooked fish', 'Malabsorption, protein loss, electrolyte disturbance, severe wasting in heavy infection', 'Eggs, larvae, or adult forms in stool depending on burden and timing'],
        ['Trichostrongylus spp.', 'Ingestion of larvae on contaminated vegetation', 'Often mild GI disease; heavier infection can cause diarrhea, malaise, or anemia', 'Eggs resemble hookworm-type eggs and need careful differentiation']
      ]
    },
    {
      title: 'Tissue Nematode and Larva Migration Anchors',
      columns: ['Organism/group', 'Acquisition clue', 'Main syndrome anchor', 'Testing strategy'],
      rows: [
        ['Trichinella spp.', 'Undercooked meat containing larvae, classically pork or wild game', 'GI symptoms followed by fever, myalgia, periorbital edema, eosinophilia, myocarditis or CNS involvement in severe disease', 'Serology, muscle biopsy in selected cases, and exposure history; stool O&P is not the answer'],
        ['Toxocara canis/cati', 'Ingestion of eggs from contaminated soil or animal-associated environments', 'Visceral or ocular larva migrans with eosinophilia, liver/lung/eye involvement', 'Serology and clinical/exposure pattern; larvae are not usually found in stool'],
        ['Ancylostoma braziliense/caninum', 'Skin penetration by animal hookworm larvae', 'Cutaneous larva migrans with serpiginous itchy tracks', 'Clinical recognition is central; routine stool O&P is not useful'],
        ['Dracunculus medinensis', 'Ingestion of copepods in contaminated water', 'Emergence of adult worm from skin with painful blistering', 'Clinical and public health recognition; prevention is water-focused'],
        ['Angiostrongylus cantonensis', 'Ingestion of larvae from snails/slugs or contaminated produce', 'Eosinophilic meningitis', 'CSF eosinophilia, exposure history, serology/reference testing where available'],
        ['Baylisascaris procyonis', 'Ingestion of eggs from raccoon-associated environments', 'Severe neural or ocular larva migrans', 'Serology/reference testing and exposure history; prevention is critical'],
        ['Gnathostoma spinigerum', 'Ingestion of raw or undercooked fish, frogs, eels, poultry, or other intermediate/paratenic hosts', 'Migratory subcutaneous swelling, visceral or neurologic disease', 'Serology and exposure history; tissue recovery is uncommon']
      ]
    },
    {
      title: 'Cestode Study Table',
      columns: ['Organism/group', 'How infection is acquired', 'Disease pattern', 'Diagnostic clue'],
      rows: [
        ['Taenia saginata', 'Eating undercooked beef containing larval cysts', 'Adult intestinal tapeworm infection, often mild or asymptomatic with proglottids', 'Eggs/proglottids in stool; eggs resemble T. solium'],
        ['Taenia solium adult infection', 'Eating undercooked pork containing larval cysts', 'Adult intestinal tapeworm infection', 'Eggs/proglottids in stool; species matters because eggs can lead to cysticercosis if ingested'],
        ['Taenia solium cysticercosis', 'Ingestion of T. solium eggs from human fecal contamination or autoinfection', 'Larval cysts in CNS, eye, muscle, or subcutaneous tissue; seizures can occur with neurocysticercosis', 'Imaging, serology, biopsy, or tissue findings; stool may be negative'],
        ['Diphyllobothrium/Dibothriocephalus latus group', 'Eating raw or undercooked freshwater fish', 'Adult intestinal tapeworm; vitamin B12 deficiency can occur', 'Operculated eggs or broad proglottids in stool'],
        ['Hymenolepis nana', 'Ingestion of eggs; human-to-human and autoinfection can occur', 'Dwarf tapeworm infection, often in children or crowded settings', 'Characteristic eggs in stool'],
        ['Hymenolepis diminuta', 'Accidental ingestion of infected grain insects', 'Rat tapeworm infection in humans, usually uncommon', 'Eggs in stool, larger than H. nana and without polar filaments'],
        ['Dipylidium caninum', 'Ingestion of infected fleas from dogs/cats', 'Usually mild intestinal tapeworm infection, often noticed by motile proglottids', 'Egg packets or proglottids in stool/perianal material'],
        ['Echinococcus granulosus', 'Ingestion of eggs from dog-associated tapeworm cycle', 'Hydatid cysts, often liver or lung; rupture risk matters', 'Imaging plus serology or cyst material/histology in controlled settings'],
        ['Echinococcus multilocularis', 'Ingestion of eggs from fox/dog/canid cycle', 'Alveolar echinococcosis with invasive liver-like mass and possible spread', 'Imaging, serology, histology, and reference support']
      ]
    },
    {
      title: 'Trematode Egg and Source Anchors',
      columns: ['Trematode lane', 'Food or exposure clue', 'Egg/source clue', 'Disease anchor'],
      rows: [
        ['Fasciolopsis buski', 'Aquatic vegetation', 'Large operculated intestinal fluke eggs in stool', 'Intestinal fluke disease, abdominal symptoms in heavy infection'],
        ['Heterophyes/Metagonimus-like intestinal flukes', 'Raw or undercooked fish', 'Small operculated eggs in stool that can be difficult to separate morphologically', 'Intestinal symptoms; heavy infection may have broader complications'],
        ['Fasciola hepatica', 'Freshwater plants such as watercress', 'Large operculated eggs in stool or biliary specimens after adult worms mature', 'Liver migration, biliary disease, eosinophilia'],
        ['Clonorchis sinensis and Opisthorchis spp.', 'Raw or undercooked freshwater fish', 'Small operculated eggs with shoulders/knob features in stool', 'Bile duct infection, cholangitis, stone disease, and cholangiocarcinoma risk in chronic infection'],
        ['Paragonimus spp.', 'Raw or undercooked freshwater crabs or crayfish', 'Operculated eggs in sputum or stool', 'Pulmonary fluke disease that can mimic tuberculosis-like symptoms'],
        ['Schistosoma haematobium', 'Freshwater cercarial skin penetration', 'Terminal-spined eggs in urine', 'Urinary schistosomiasis, hematuria, bladder pathology'],
        ['Schistosoma mansoni', 'Freshwater cercarial skin penetration', 'Large lateral-spined eggs in stool/tissue', 'Intestinal and hepatosplenic disease'],
        ['Schistosoma japonicum/mekongi/intercalatum group', 'Freshwater cercarial skin penetration in endemic regions', 'Smaller or differently spined eggs by species', 'Intestinal/hepatosplenic disease; species depends on geography']
      ]
    },
    {
      title: 'Helminth Specimen Selection Shortcuts',
      columns: ['If the question is...', 'Best specimen/test direction', 'Why'],
      rows: [
        ['Pinworm', 'Perianal tape prep', 'Eggs are deposited around the anus and are often missed in stool'],
        ['Intestinal roundworms, tapeworms, or flukes', 'Stool O&P with concentration and careful egg/proglottid review', 'The diagnostic stage is often shed in stool'],
        ['Strongyloides', 'Larvae-focused stool methods, repeat exams, agar plate/Baermann-type methods where available, serology', 'Larval shedding can be intermittent and low burden'],
        ['Filarial infection', 'Timed blood collection, concentration, skin snip, or tissue method depending on species', 'Microfilariae location and periodicity drive recovery'],
        ['Tissue larva disease', 'Serology, imaging, biopsy, or reference methods', 'Stool O&P may be negative because adult worms are absent'],
        ['Schistosoma haematobium', 'Timed urine concentration and microscopy', 'Eggs are recovered from urine rather than routine stool'],
        ['Pulmonary fluke', 'Sputum and stool examination for operculated eggs', 'Eggs can be swallowed and appear in stool or coughed up in sputum'],
        ['Echinococcus', 'Imaging and serology; cyst material only with controlled clinical handling', 'Cyst puncture/rupture risk makes casual specimen handling unsafe']
      ]
    }
  ],
  'blood-and-tissue-parasites': [
    {
      title: 'Blood and Tissue Parasite Specimen Map',
      columns: ['Clinical/specimen setting', 'Parasites to keep in mind', 'Method direction'],
      rows: [
        ['Fever after travel or endemic exposure', 'Plasmodium spp., Babesia, Trypanosoma depending on geography', 'Thick and thin blood films; rapid antigen or molecular support when available'],
        ['Tick exposure with malaria-like smear findings', 'Babesia spp.', 'Thin blood film, parasitemia estimate, serology/NAAT support depending on setting'],
        ['Lymph node, spleen, liver, marrow, or skin lesion aspirate', 'Leishmania spp.', 'Giemsa-stained smears for amastigotes, culture, molecular or reference methods'],
        ['CNS disease with ring-enhancing lesions or congenital concern', 'Toxoplasma gondii', 'Serology, NAAT from appropriate specimens, histology, and clinical context'],
        ['Rapid fatal meningoencephalitis after warm freshwater exposure', 'Naegleria fowleri', 'CSF wet mount/direct exam, molecular/reference testing, urgent communication'],
        ['Granulomatous amoebic encephalitis or keratitis', 'Acanthamoeba or Balamuthia', 'Tissue/corneal scraping, histology, culture or molecular/reference testing'],
        ['Eosinophilia with muscle pain or migrating lesions', 'Trichinella, Toxocara, larval cestodes, other tissue helminths', 'Serology, biopsy, imaging, and exposure history rather than routine stool alone'],
        ['Blood or skin microfilariae concern', 'Wuchereria, Brugia, Loa, Mansonella, Onchocerca', 'Timed blood collection, concentration methods, skin snip, and morphology']
      ]
    },
    {
      title: 'Impression Smear and Tissue Stain Anchors',
      columns: ['Tissue/site', 'Parasites to consider', 'Useful stains or methods', 'Student caution'],
      rows: [
        ['Lung', 'Microsporidia, Toxoplasma, Cryptosporidium, Entamoeba in rare contexts', 'Giemsa, modified acid-fast, modified trichrome, fluorescent stains, histology, immunostains, molecular methods', 'Respiratory specimens need clinical context; contamination and colonization questions exist'],
        ['Liver', 'Entamoeba histolytica, Echinococcus, Fasciola, Clonorchis/Opisthorchis context', 'Histology, serology, imaging-guided aspirate when appropriate, ova detection in stool for selected flukes', 'Abscess fluid may not show organisms easily'],
        ['Brain', 'Toxoplasma, free-living amoebae, Taenia solium cysticerci, microsporidia', 'Histology, Giemsa/trichrome-type stains, immunostains, NAAT/reference methods, serology/imaging support', 'Specimen availability is limited; diagnosis often combines lab and imaging'],
        ['Skin', 'Leishmania, Onchocerca, Acanthamoeba, myiasis, scabies', 'Giemsa, skin snip, biopsy, direct exam, histology, molecular/reference methods', 'Site and lesion type determine collection'],
        ['Muscle', 'Trichinella, cysticerci, Sarcocystis, other larvae', 'Wet compression/squash prep, histology, serology', 'Stool O&P may not answer tissue-larva disease'],
        ['Eye/cornea', 'Acanthamoeba, microsporidia, Loa loa in selected cases', 'Corneal scraping, wet mount, Giemsa, fluorescent stains, modified trichrome, molecular methods', 'Rapid recognition protects vision']
      ]
    },
    {
      title: 'Trypanosome Comparison Anchors',
      columns: ['Pattern', 'American trypanosomiasis', 'East African trypanosomiasis', 'West African trypanosomiasis'],
      rows: [
        ['Main organism anchor', 'Trypanosoma cruzi', 'T. brucei rhodesiense', 'T. brucei gambiense'],
        ['Vector clue', 'Triatomine reduviid bug exposure', 'Tsetse fly exposure with animal reservoir emphasis', 'Tsetse fly exposure with human reservoir emphasis'],
        ['Illness tempo', 'Acute infection may be followed by chronic cardiac or GI disease', 'More acute course with earlier CNS invasion', 'More chronic course with later CNS disease'],
        ['Diagnostic forms', 'Trypomastigotes in blood during acute disease; amastigotes in tissue', 'Trypomastigotes in blood, lymph node aspirate, chancre aspirate, or CSF depending on stage', 'Trypomastigotes in blood, lymph node aspirate, chancre aspirate, or CSF depending on stage'],
        ['Specimen strategy', 'Blood, buffy coat/concentration, lymph node or chagoma material, serology/molecular support depending on phase', 'Blood and lesion/lymph node material early; CSF when CNS disease is evaluated', 'Blood and lymph node material; CSF when neurologic stage is evaluated']
      ]
    },
    {
      title: 'Leishmania Disease Pattern Table',
      columns: ['Disease pattern', 'Where organisms are usually sought', 'Clinical anchor', 'Testing warning'],
      rows: [
        ['Visceral leishmaniasis', 'Bone marrow, spleen, lymph node, liver, or blood-based methods depending on setting', 'Fever, weight loss, hepatosplenomegaly, cytopenias', 'Parasite burden and antibody response vary with immune status'],
        ['Cutaneous leishmaniasis', 'Skin lesion scraping, aspirate, biopsy, or touch prep', 'Localized ulcer or nodular lesion after sand fly exposure', 'Species matters because mucosal risk differs'],
        ['Diffuse cutaneous leishmaniasis', 'Skin macrophage-rich lesion material', 'Widespread nodular skin disease with poor cell-mediated response', 'Organisms may be abundant but immune response patterns differ'],
        ['Mucocutaneous leishmaniasis', 'Mucosal or skin lesion tissue plus reference methods', 'Nasal/oral mucosal destruction after New World exposure in selected species', 'A healed skin lesion history may matter even when mucosal disease appears later'],
        ['Laboratory method lane', 'Giemsa smear for amastigotes, culture, histology, NAAT, serology for selected visceral disease', 'Amastigotes live in macrophages; exposure geography narrows species', 'A negative smear does not exclude disease when burden is low']
      ]
    },
    {
      title: 'Toxoplasma Stage and Risk Anchors',
      columns: ['Concept', 'What students should remember', 'Why it matters'],
      rows: [
        ['Tachyzoites', 'Rapidly multiplying crescent-shaped forms seen in acute or reactivated tissue infection', 'Important in disseminated disease, congenital infection, and severe immunocompromised-host disease'],
        ['Bradyzoites', 'Slow-growing tissue cyst forms in brain, eye, skeletal muscle, and cardiac muscle', 'Latent infection can reactivate when cellular immunity is impaired'],
        ['Oocyst exposure', 'Cat-associated environmental contamination and food/water exposure concepts', 'Explains infection risk without direct person-to-person transmission'],
        ['Congenital risk', 'Highest fetal risk when maternal primary infection occurs during pregnancy; timing affects severity', 'Maternal prior immunity usually lowers fetal risk, but interpretation is specialized'],
        ['Immunocompromised risk', 'Reactivation can involve CNS, eye, lung, or disseminated disease', 'Serology, imaging, NAAT, and tissue findings must be interpreted together'],
        ['Stain/test lane', 'Giemsa or histology may show forms; serology and molecular tests are often central', 'Do not expect routine culture or stool O&P to answer toxoplasmosis']
      ]
    }
  ],
  'malaria-blood-films': [
    {
      title: 'Blood Film Parasite Priorities',
      columns: ['Question', 'What to examine', 'Why it matters'],
      rows: [
        ['Is malaria possible?', 'Thick film for sensitivity and thin film for species, parasitemia, and morphology', 'Malaria can be urgent; negative films may need repeat collection by policy'],
        ['What is the parasitemia?', 'Percentage of infected red cells or parasites per white blood cells depending on lab method', 'Burden affects urgency and follow-up'],
        ['Does morphology fit P. falciparum?', 'Multiple delicate rings, applique forms, high parasitemia, and crescent gametocytes when present', 'P. falciparum can progress rapidly and needs urgent communication'],
        ['Could this be Babesia?', 'Intraerythrocytic rings, possible tetrads, no pigment, exposure/transfusion/tick history', 'Can resemble malaria; travel and exposure history separate the workup'],
        ['Are trypanosomes present?', 'Extracellular trypomastigotes in blood films or concentration prep', 'African or American trypanosome logic depends on geography and morphology'],
        ['Are microfilariae present?', 'Sheathed/unsheathed forms, nuclei pattern, blood collection timing', 'Morphology plus geography and periodicity drive ID']
      ]
    },
    {
      title: 'Malaria and Babesia Comparison',
      columns: ['Feature', 'Malaria', 'Babesia'],
      rows: [
        ['Exposure', 'Anopheles mosquito in endemic areas; transfusion or congenital transmission possible but less common', 'Ixodes tick exposure, transfusion, or rarely congenital transmission'],
        ['Red cell findings', 'Species-specific infected red cell size, stippling, pigment, and gametocyte patterns may help', 'Pleomorphic rings, possible tetrads, usually no malaria pigment'],
        ['Fever pattern', 'Can be cyclic but often irregular early', 'Malaria-like febrile illness, especially in asplenia or older/immunocompromised hosts'],
        ['Species/reporting need', 'Species ID and parasitemia are important', 'Parasitemia and severity risk are important; species may need reference support'],
        ['Diagnostic backup', 'Rapid antigen and molecular tests can support but do not fully replace smear review in many workflows', 'Serology or NAAT may support selected cases; smear confirms active parasitemia when positive']
      ]
    },
    {
      title: 'Plasmodium Species Blood Film Anchors',
      columns: ['Species', 'Red cell pattern', 'Forms students should notice', 'Clinical memory anchor'],
      rows: [
        ['P. falciparum', 'Infected red cells are often normal size; heavy parasitemia can occur because cells of many ages are infected', 'Delicate rings, multiple rings per cell, applique forms, and crescent/banana-shaped gametocytes; mature trophozoites and schizonts are usually not seen in peripheral blood', 'Most urgent malaria species in routine study because severe disease and CNS involvement are major concerns'],
        ['P. vivax', 'Enlarged young red cells with Schuffner-type stippling; amoeboid trophozoites', 'All stages may be present; mature schizonts have many merozoites', 'Relapse can occur from dormant liver forms'],
        ['P. ovale', 'Enlarged oval or fimbriated red cells with stippling; resembles P. vivax but usually fewer infected cells', 'All stages may be present; schizonts have fewer merozoites than P. vivax', 'Relapse can occur, but infection is usually less intense than P. falciparum'],
        ['P. malariae', 'Red cells usually normal or smaller; compact forms', 'Band-form trophozoites and rosette-like schizonts are classic anchors', 'Longer 72-hour cycle and long persistence are exam-friendly concepts'],
        ['P. knowlesi', 'Red cells usually normal size; early rings can resemble P. falciparum and later forms can resemble P. malariae', 'Multiple rings may occur; mature schizonts can be seen; no true rosettes', 'Can increase rapidly because of a 24-hour cycle and may be severe']
      ]
    },
    {
      title: 'Malaria Clinical Pattern Anchors',
      columns: ['Feature', 'Study meaning', 'Species notes'],
      rows: [
        ['Incubation and fever timing', 'Fever periodicity is a clue but early illness may be irregular', 'P. malariae classically has a longer cycle; P. knowlesi can have daily fever'],
        ['Relapse versus recrudescence', 'Dormant liver forms cause relapse; persistent blood-stage infection can recrudesce', 'Relapse is a P. vivax/P. ovale concept; P. malariae can persist for years'],
        ['Red cell age preference', 'Reticulocyte preference limits burden; all-age invasion can raise burden', 'P. vivax/P. ovale prefer young cells; P. falciparum and P. knowlesi can infect many ages'],
        ['Severe disease risk', 'High parasitemia, anemia, CNS disease, renal injury, or respiratory compromise increase urgency', 'P. falciparum is the major classic severe malaria species; P. knowlesi can also be dangerous'],
        ['Reporting habit', 'Species and parasitemia should be communicated according to policy', 'Repeat smears may be needed when suspicion remains after a negative film']
      ]
    }
  ],
  'virology-overview': [
    {
      title: 'Viral Syndrome-to-Agent Map',
      columns: ['Syndrome lane', 'Viruses students should place here', 'Testing habit'],
      rows: [
        ['Upper respiratory infection', 'Rhinovirus/enterovirus, seasonal coronaviruses, adenovirus, influenza, parainfluenza, RSV, metapneumovirus', 'Respiratory NAAT panels or targeted antigen/NAAT depending on season and setting'],
        ['Croup, bronchiolitis, pneumonia', 'Parainfluenza, RSV, metapneumovirus, influenza, adenovirus, SARS-CoV-2 and other respiratory viruses', 'Nasopharyngeal or lower respiratory specimen quality matters'],
        ['Vesicular rash or mucocutaneous lesions', 'HSV, VZV, enteroviruses in selected syndromes, poxvirus-like differential depending on context', 'Lesion swab/scraping for NAAT is usually more direct than serology'],
        ['Exanthem or febrile rash', 'Measles, rubella, parvovirus B19, enteroviruses, HHV-6/7, arboviruses depending on setting', 'Serology, NAAT, and public health notification depend on syndrome'],
        ['Meningitis/encephalitis', 'Enteroviruses, HSV, VZV, arboviruses, mumps, measles, JC virus, rabies in selected settings', 'CSF NAAT is central for many agents; serology helps for some arboviruses'],
        ['Gastroenteritis', 'Norovirus, rotavirus, enteric adenovirus, astrovirus, sapovirus', 'Stool antigen/NAAT; routine viral culture is not the modern anchor'],
        ['Hepatitis', 'HAV, HBV, HCV, HDV, HEV, plus CMV/EBV in selected contexts', 'Serology and viral load patterns organize acute, chronic, and immune status questions'],
        ['Congenital/perinatal disease', 'CMV, rubella, HSV, VZV, parvovirus B19, HBV, HIV and others by context', 'Maternal timing, neonatal specimen, IgM/IgG/NAAT logic, and public health rules matter']
      ]
    },
    {
      title: 'Viral Specimen Selection Map',
      columns: ['Disease question', 'Best specimen direction', 'Student warning'],
      rows: [
        ['Respiratory virus', 'Nasopharyngeal swab/aspirate, throat/nasal specimens, or lower respiratory specimen when disease is lower tract', 'Collection timing and swab type affect NAAT and antigen yield'],
        ['HSV/VZV lesion', 'Vesicle fluid, lesion base swab, scraping, or tissue depending on site', 'Older crusted lesions may have lower yield'],
        ['CNS infection', 'CSF for NAAT and selected serology; serum paired with CSF for some arboviruses', 'Not every CNS virus is best detected by CSF PCR at every stage'],
        ['Gastroenteritis virus', 'Stool or rectal swab depending on test validation', 'Culture is not the routine answer for norovirus/rotavirus-type questions'],
        ['Congenital infection', 'Neonatal urine, saliva, blood, CSF, tissue, or serology depending on virus', 'Maternal antibody can complicate interpretation'],
        ['Hepatitis', 'Serum or plasma for antigen, antibody, and nucleic acid testing', 'Marker combinations matter more than one isolated result'],
        ['Transplant/reactivation monitoring', 'Blood/plasma viral load for CMV, EBV, BK, adenovirus or others by protocol', 'Detection may represent reactivation or asymptomatic replication depending on host and threshold']
      ]
    },
    {
      title: 'Viral Test Type Jobs',
      columns: ['Test type', 'What it detects', 'Best use', 'Common trap'],
      rows: [
        ['NAAT/PCR', 'Viral nucleic acid', 'Rapid diagnosis, low-burden detection, viral load monitoring for selected viruses', 'Can detect residual or latent/reactivated virus without proving disease alone'],
        ['Antigen detection', 'Viral protein', 'Rapid respiratory, stool, or lesion testing depending on assay', 'Sensitivity varies by timing and specimen quality'],
        ['Serology', 'Host antibody response', 'Immunity, recent infection, congenital infection, arboviruses, hepatitis markers', 'IgM false positives and delayed antibody response can mislead'],
        ['Viral culture', 'Viable virus able to grow in cells', 'Selected viruses and legacy/special workflows', 'Slow and less sensitive than NAAT for many modern questions'],
        ['Cytopathic effect/FA confirmation', 'Cell culture changes and viral antigen in infected cells', 'Classic virology identification logic', 'Many labs no longer rely on culture as first-line testing'],
        ['Viral load', 'Quantitative nucleic acid level', 'Monitoring HIV, HBV, HCV, CMV, EBV, BK and selected infections', 'Numbers must be interpreted by specimen type, assay, and trend']
      ]
    },
    {
      title: 'DNA and RNA Virus Family Organizer',
      columns: ['Family lane', 'Major human viruses', 'Core memory anchor'],
      rows: [
        ['Adenoviridae', 'Human adenoviruses', 'Nonenveloped DNA virus tied to respiratory, eye, GI, urinary, and disseminated disease'],
        ['Herpesviridae', 'HSV-1/2, VZV, CMV, EBV, HHV-6/7/8', 'Enveloped DNA viruses with latency and reactivation'],
        ['Papillomaviridae', 'Human papillomaviruses', 'Nonenveloped DNA viruses infecting epithelium; wart and cancer associations'],
        ['Polyomaviridae', 'BK and JC viruses', 'Small DNA viruses with kidney/CNS reactivation patterns in immunocompromised hosts'],
        ['Poxviridae', 'Molluscum contagiosum, orthopoxviruses', 'Large complex DNA viruses; skin lesions are a major clue'],
        ['Hepadnaviridae', 'Hepatitis B virus', 'Partially double-stranded DNA virus with reverse transcription step and chronic infection risk'],
        ['Orthomyxoviridae', 'Influenza A, B, C', 'Segmented enveloped RNA viruses; antigenic drift and shift concepts'],
        ['Paramyxoviridae', 'Measles, mumps, parainfluenza, RSV, metapneumovirus', 'Enveloped RNA viruses spread mainly by respiratory routes'],
        ['Picornaviridae', 'Enteroviruses, rhinoviruses, HAV', 'Small nonenveloped RNA viruses; respiratory, GI, CNS, and hepatitis lanes'],
        ['Caliciviridae', 'Norovirus and related caliciviruses', 'Nonenveloped RNA gastroenteritis viruses'],
        ['Coronaviridae', 'Seasonal coronaviruses and SARS-CoV-2', 'Enveloped RNA respiratory/GI virus lane with outbreak potential'],
        ['Flaviviridae', 'HCV, dengue, yellow fever, West Nile, Zika, Japanese encephalitis and related arboviruses', 'RNA viruses including hepatitis C and many mosquito/tick-borne agents'],
        ['Togaviridae', 'Rubella and alphaviruses', 'Rubella congenital disease plus mosquito-borne encephalitis/arthritis viruses'],
        ['Rhabdoviridae', 'Rabies virus', 'Bullet-shaped enveloped RNA virus causing fatal encephalitis without prophylaxis'],
        ['Retroviridae', 'HIV-1/2, HTLV-1/2', 'RNA viruses that reverse transcribe and integrate into host DNA'],
        ['Reoviridae', 'Rotavirus and Colorado tick fever virus', 'Segmented double-stranded RNA viruses; rotavirus gastroenteritis is the main student anchor'],
        ['Filoviridae', 'Ebola and Marburg viruses', 'Severe viral hemorrhagic fever and high-containment workflow'],
        ['Arenaviridae/Bunyavirales', 'LCM, Lassa, hantaviruses, many arboviruses', 'Rodent or arthropod-associated RNA viruses with CNS, hemorrhagic, or pulmonary syndromes']
      ]
    },
    {
      title: 'High-Consequence and Public Health Virus Cues',
      columns: ['Cue', 'Viruses to consider', 'Lab action mindset'],
      rows: [
        ['Hemorrhagic fever with travel/exposure risk', 'Ebola, Marburg, Lassa, dengue severe disease, yellow fever, hantaviruses and others by geography', 'Notify and follow biosafety/public health workflow before routine processing'],
        ['Rabid animal bite or bat exposure', 'Rabies virus', 'Postexposure prophylaxis and public health consultation matter urgently'],
        ['Measles-like febrile rash with cough/coryza/conjunctivitis', 'Measles virus', 'Airborne precautions and public health testing rules matter'],
        ['Congenital rash/cataract/deafness concern', 'Rubella virus', 'Serology/NAAT and public health workflow depend on pregnancy/neonate timing'],
        ['Severe pneumonia outbreak', 'Influenza, SARS-CoV-2, adenovirus, emerging respiratory viruses', 'Respiratory NAAT plus infection prevention and outbreak context'],
        ['Meningoencephalitis after mosquito/tick exposure', 'West Nile, La Crosse, eastern/western equine encephalitis, St. Louis, Powassan and related arboviruses', 'Serology is often central because CSF PCR can be insensitive after early illness']
      ]
    },
    {
      title: 'Antiviral Agent Study Map',
      columns: ['Virus or syndrome', 'Drug target idea', 'Examples students may see', 'Memory caution'],
      rows: [
        ['HSV/VZV', 'Viral DNA polymerase or pyrophosphate-related targets', 'Acyclovir, valacyclovir, foscarnet', 'Activation and resistance logic differ by drug'],
        ['CMV', 'Viral DNA polymerase pathway', 'Ganciclovir, valganciclovir, foscarnet, cidofovir, letermovir in selected contexts', 'CMV therapy and monitoring are host- and transplant-context dependent'],
        ['HIV', 'Reverse transcriptase, integrase, protease, entry/fusion, and maturation targets', 'NRTIs, NNRTIs, integrase inhibitors, protease inhibitors, entry/fusion inhibitors', 'Combination therapy and resistance testing matter'],
        ['HBV', 'Reverse transcription step in HBV replication', 'Tenofovir, entecavir, lamivudine/adefovir concepts in older tables', 'HBV DNA trend and chronic infection stage guide interpretation'],
        ['HCV', 'NS3/4A protease, NS5A, NS5B polymerase targets', 'Direct-acting antiviral combinations', 'Older interferon/ribavirin concepts appear in exam history, but current therapy uses DAAs'],
        ['Influenza A/B', 'Neuraminidase, cap-dependent endonuclease, or M2 uncoating for influenza A only', 'Oseltamivir, zanamivir, peramivir, baloxavir; amantadine/rimantadine as legacy M2 concepts', 'Resistance and current guidance matter; M2 drugs are not routine modern anchors'],
        ['RSV', 'Viral RNA/protein synthesis or passive antibody prevention depending on context', 'Ribavirin as legacy/special therapy; monoclonal antibody prevention concepts', 'Most RSV care is supportive; prophylaxis is risk-group specific']
      ]
    },
    {
      title: 'Vaccine and Immune Prophylaxis Anchors',
      columns: ['Prevention type', 'Examples', 'Student interpretation'],
      rows: [
        ['Live attenuated viral vaccines', 'MMR, varicella, yellow fever, rotavirus, intranasal influenza in selected settings, older smallpox/vaccinia concepts', 'Usually strong immune response but avoid in certain immunocompromised or pregnancy contexts'],
        ['Inactivated or non-live vaccines', 'Inactivated influenza, hepatitis A, rabies, polio IPV and others by schedule', 'Often safer for immunocompromised hosts but may need boosters'],
        ['Recombinant/subunit/VLP vaccines', 'HBV, HPV, recombinant zoster and others', 'Targets specific antigens rather than whole replicating virus'],
        ['Postexposure immune globulin', 'Rabies, HBV, varicella, measles, hepatitis A in selected settings', 'Used when exposure risk and immune status make passive protection useful'],
        ['Monoclonal antibody prevention', 'RSV prevention in high-risk infants/young children depending on current product guidance', 'This is prevention, not ordinary treatment of established bronchiolitis'],
        ['Travel or outbreak prevention', 'Yellow fever, hepatitis A, polio, measles, rabies pre-exposure in selected risk groups', 'Epidemiology and public health guidance decide the product']
      ]
    }
  ],
  'respiratory-viruses': [
    {
      title: 'Respiratory Virus Study Table',
      columns: ['Virus/group', 'Syndrome anchors', 'Season or setting clue', 'Testing emphasis'],
      rows: [
        ['Influenza A/B', 'Fever, myalgias, cough, pneumonia, outbreaks', 'Winter season, institutional outbreaks, severe disease risk groups', 'NAAT or rapid antigen by setting; subtype/public health testing when needed'],
        ['RSV', 'Bronchiolitis, pneumonia, severe disease in infants and older/immunocompromised adults', 'Winter season and pediatric outbreaks', 'NAAT/antigen; specimen quality matters'],
        ['Parainfluenza viruses', 'Croup, bronchiolitis, pneumonia', 'Season varies by type; pediatric croup anchor', 'Respiratory panel NAAT or culture in legacy workflows'],
        ['Human metapneumovirus', 'Bronchiolitis and pneumonia, especially children and older adults', 'Winter/spring respiratory season', 'Respiratory NAAT panel'],
        ['Adenovirus', 'Pharyngitis, pneumonia, conjunctivitis, gastroenteritis, hemorrhagic cystitis', 'Outbreaks, military/crowded settings, immunocompromised host', 'NAAT by site; culture/CPE historically useful'],
        ['Rhinovirus/enterovirus', 'Common cold, wheezing, asthma/COPD exacerbation; enterovirus overlap on some panels', 'Year-round with seasonal peaks', 'NAAT; many panels may not separate rhinovirus from enterovirus'],
        ['Seasonal coronaviruses and SARS-CoV-2', 'URI to pneumonia depending on virus and host', 'Seasonal/community outbreaks or pandemic context', 'Targeted NAAT/antigen and public health guidance']
      ]
    },
    {
      title: 'Respiratory Virus Family Comparison',
      columns: ['Family/group', 'Genome/envelope memory', 'Typical syndrome lane', 'Exam-style trap'],
      rows: [
        ['Orthomyxoviruses', 'Segmented enveloped RNA; influenza A/B/C', 'Influenza-like illness, primary viral pneumonia, outbreaks', 'Influenza A drift/shift and animal reservoirs matter more than for B/C'],
        ['Paramyxoviruses', 'Enveloped nonsegmented RNA', 'Parainfluenza croup, RSV bronchiolitis, metapneumovirus bronchiolitis/pneumonia, measles/mumps outside routine respiratory panels', 'RSV and parainfluenza are not influenza viruses'],
        ['Adenoviruses', 'Nonenveloped DNA virus', 'Pharyngitis, conjunctivitis, pneumonia, gastroenteritis, hemorrhagic cystitis', 'Can persist and cause severe disease in transplant or immunocompromised hosts'],
        ['Coronaviruses', 'Enveloped RNA virus', 'Common cold to severe pneumonia depending on virus', 'Specimen type and public health guidance change by virus'],
        ['Rhinovirus/enterovirus group', 'Small nonenveloped RNA viruses', 'Common cold, wheezing, pharyngitis; enteroviruses can also cause CNS/rash disease', 'Many NAAT panels report combined rhinovirus/enterovirus'],
        ['Bunyavirales/arenaviruses with respiratory or systemic disease', 'Enveloped RNA viruses, often vector or rodent associated', 'Hantavirus pulmonary syndrome, Lassa/LCM or arboviral disease by exposure', 'Exposure history is the organizing clue, not respiratory symptoms alone']
      ]
    }
  ],
  'herpesviruses': [
    {
      title: 'Herpesvirus Specimen and Syndrome Anchors',
      columns: ['Virus', 'Syndrome anchors', 'Preferred specimen logic', 'Testing caution'],
      rows: [
        ['HSV-1/HSV-2', 'Oral/genital lesions, neonatal disease, keratitis, encephalitis, meningitis', 'Lesion NAAT; CSF NAAT for encephalitis/meningitis; ocular specimens by site', 'Serology is not the best answer for acute lesion diagnosis'],
        ['VZV', 'Varicella, shingles, CNS disease, congenital/perinatal concern', 'Lesion swab/scraping NAAT; CSF NAAT/antibody in selected CNS cases', 'Vaccine strain and wild-type questions may need specialized testing'],
        ['CMV', 'Congenital infection, transplant disease, retinitis, colitis, pneumonitis, mononucleosis-like illness', 'Blood viral load for monitoring; urine/saliva for congenital screening logic; tissue for invasive disease', 'Shedding or viremia does not always prove tissue-invasive disease'],
        ['EBV', 'Infectious mononucleosis, lymphoproliferative disease, transplant monitoring', 'Serology for primary infection patterns; viral load in selected immunocompromised settings', 'EBV DNA can reflect immune control problems rather than a single syndrome'],
        ['HHV-6/HHV-7', 'Roseola, encephalitis/reactivation questions in selected hosts', 'NAAT in specialized contexts', 'Chromosomally integrated HHV-6 can confuse viral load interpretation'],
        ['HHV-8', 'Kaposi sarcoma and selected lymphoproliferative syndromes', 'Tissue diagnosis and specialized testing', 'Not a routine screening virus in most workflows']
      ]
    },
    {
      title: 'Cell Culture and CPE Memory Anchors',
      columns: ['Virus/group', 'Classic culture/CPE idea', 'Modern student takeaway'],
      rows: [
        ['HSV', 'Rapid rounded cells and ballooning-type CPE in susceptible cells', 'NAAT is faster for most clinical diagnosis, but CPE explains older lab language'],
        ['CMV', 'Slow focal CPE with enlarged cells in shell vial/culture workflows', 'Viral load and tissue diagnosis often drive modern management'],
        ['VZV', 'Slow focal CPE and cell-associated growth', 'Lesion NAAT usually beats waiting for culture'],
        ['Adenovirus', 'Cell rounding and grape-like clusters in classic culture descriptions', 'NAAT by syndrome/source is common'],
        ['Enteroviruses', 'Rapid CPE in selected cell lines', 'CSF/stool/respiratory NAAT is common, with serotyping/public health testing when needed'],
        ['Influenza/parainfluenza/mumps', 'Hemadsorption or immunostain confirmation in culture workflows', 'Respiratory NAAT has largely replaced routine culture for acute care']
      ]
    },
    {
      title: 'Herpesvirus Latency and Disease Map',
      columns: ['Virus', 'Latency site or reservoir concept', 'Disease anchors', 'Best diagnostic habit'],
      rows: [
        ['HSV-1', 'Sensory nerve ganglia', 'Oral lesions, keratitis, encephalitis, genital infection possible', 'Lesion or CSF NAAT by syndrome'],
        ['HSV-2', 'Sensory nerve ganglia', 'Genital lesions, neonatal disease, meningitis, disseminated disease in neonates/immunocompromised hosts', 'Lesion, surface, blood, or CSF NAAT by syndrome'],
        ['VZV', 'Dorsal root ganglia', 'Varicella and shingles; CNS disease can occur', 'Lesion NAAT; CSF testing for neurologic disease when indicated'],
        ['EBV', 'B lymphocytes', 'Infectious mononucleosis, lymphoproliferative disease, oral hairy leukoplakia, malignancy associations', 'Serology for mono pattern; viral load/tissue testing in selected hosts'],
        ['CMV', 'WBCs/endothelial cells and broad tissue latency/reactivation concept', 'Congenital disease, transplant disease, retinitis, colitis, pneumonitis', 'Viral load for monitoring; tissue evidence for end-organ disease'],
        ['HHV-6/7', 'T lymphocyte-associated latency/reactivation', 'Roseola, febrile illness, encephalitis/reactivation questions', 'NAAT with chromosomal integration caution for HHV-6'],
        ['HHV-8', 'Lymphoid/endothelial-associated infection', 'Kaposi sarcoma and selected lymphoproliferative disorders', 'Tissue diagnosis and specialized testing']
      ]
    },
    {
      title: 'EBV Serology Pattern Anchors',
      columns: ['Pattern', 'Likely interpretation', 'Student caution'],
      rows: [
        ['VCA IgM positive with VCA IgG positive and EBNA negative', 'Acute primary EBV pattern', 'Heterophile antibody may be negative early or in young children'],
        ['VCA IgG positive and EBNA positive, VCA IgM negative', 'Past EBV infection pattern', 'Most adults have past infection markers'],
        ['All major EBV antibodies negative', 'No serologic evidence of past infection', 'Very early infection can still require repeat testing if symptoms fit'],
        ['Early antigen positive with prior-infection markers', 'Can be seen with reactivation but is not always clinically decisive', 'Reactivation serology must fit host and syndrome'],
        ['EBV DNA monitoring', 'Used in selected transplant/lymphoproliferative contexts', 'DNA level is not the same as routine mononucleosis diagnosis']
      ]
    }
  ],
  'hepatitis-viruses': [
    {
      title: 'Hepatitis Virus Marker Jobs',
      columns: ['Virus', 'Core diagnostic tests', 'What students should infer'],
      rows: [
        ['HAV', 'Anti-HAV IgM for acute infection; total/IgG for past infection or immunity', 'Usually acute enteric-transmission hepatitis'],
        ['HBV', 'HBsAg, anti-HBs, anti-HBc total/IgM, HBeAg/anti-HBe, HBV DNA', 'Marker combinations separate acute, chronic, resolved, vaccinated, and infectiousness patterns'],
        ['HCV', 'Anti-HCV screen plus HCV RNA confirmation', 'Antibody shows exposure; RNA proves current infection'],
        ['HDV', 'HDV antibody/antigen/RNA in the setting of HBV infection', 'Requires HBV; coinfection and superinfection have different implications'],
        ['HEV', 'Anti-HEV IgM/IgG or HEV RNA depending on setting', 'Often acute enteric hepatitis; pregnancy and immunocompromised hosts change risk']
      ]
    },
    {
      title: 'Hepatitis Serology Interpretation Shortcuts',
      columns: ['Pattern', 'Likely meaning', 'Common trap'],
      rows: [
        ['HBsAg positive + anti-HBc IgM positive', 'Acute HBV infection pattern', 'Check full marker set and clinical timing'],
        ['HBsAg positive + anti-HBc total positive + IgM negative', 'Chronic HBV pattern if persistent', 'One time point may not prove duration'],
        ['Anti-HBs positive only', 'Vaccination-type immunity pattern', 'Do not call past infection without anti-HBc'],
        ['Anti-HBs positive + anti-HBc total positive', 'Resolved natural infection pattern', 'HBV DNA may still matter in immunosuppression contexts'],
        ['Anti-HCV positive + HCV RNA negative', 'Past cleared infection, treated infection, or false-positive antibody', 'Antibody alone does not prove current HCV'],
        ['Anti-HCV positive + HCV RNA positive', 'Current HCV infection', 'Viral load is not the same as fibrosis stage or disease severity']
      ]
    },
    {
      title: 'Typical HBV Serologic Profiles',
      columns: ['HBsAg', 'Anti-HBs', 'Anti-HBc total', 'Anti-HBc IgM', 'Most likely study interpretation'],
      rows: [
        ['Negative', 'Negative', 'Negative', 'Negative', 'No evidence of infection or immunity; very early exposure is still possible if timing fits'],
        ['Positive', 'Negative', 'Positive', 'Positive', 'Acute HBV infection pattern'],
        ['Positive', 'Negative', 'Positive', 'Negative', 'Chronic HBV pattern when persistent over time'],
        ['Negative', 'Positive', 'Positive', 'Negative', 'Recovered natural infection pattern'],
        ['Negative', 'Positive', 'Negative', 'Negative', 'Vaccination-type immunity pattern'],
        ['Negative', 'Negative', 'Positive', 'Negative', 'Isolated core antibody pattern; possibilities include remote infection, false positive, occult infection, or window/resolution context']
      ]
    },
    {
      title: 'Hepatitis Family Memory Map',
      columns: ['Virus', 'Family/genome idea', 'Transmission anchor', 'Chronicity/onco warning'],
      rows: [
        ['HAV', 'Picornavirus RNA virus', 'Fecal-oral', 'Acute infection; no chronic carrier state'],
        ['HBV', 'Hepadnavirus with DNA genome and reverse transcription step', 'Blood/body fluids, sexual, perinatal', 'Chronic infection and hepatocellular carcinoma risk'],
        ['HCV', 'Flavivirus RNA virus', 'Blood exposure most important; sexual/perinatal less efficient', 'Often chronic; hepatocellular carcinoma risk through chronic liver disease'],
        ['HDV', 'Defective RNA virus requiring HBV envelope', 'Same routes as HBV', 'Coinfection or superinfection can worsen disease'],
        ['HEV', 'Hepevirus RNA virus', 'Fecal-oral; zoonotic/foodborne patterns in some regions', 'Usually acute, but severe pregnancy risk and chronic infection in some immunocompromised hosts']
      ]
    }
  ],
  'hiv-basics': [
    {
      title: 'HIV Testing Workflow Anchors',
      columns: ['Step', 'What it answers', 'Student warning'],
      rows: [
        ['Initial antigen/antibody screen', 'Detects established antibody response and p24 antigen to improve early detection', 'Reactive screening is not the final diagnosis by itself'],
        ['HIV-1/HIV-2 differentiation assay', 'Confirms and differentiates antibody response', 'Indeterminate patterns need nucleic acid testing and timing context'],
        ['HIV RNA NAAT', 'Detects acute infection or confirms unresolved screening patterns; monitors viral load', 'A low-level result must be interpreted with assay and clinical context'],
        ['CD4 count', 'Immune status and opportunistic infection risk', 'Not a diagnostic test for HIV infection'],
        ['Resistance genotype', 'Resistance mutations for treatment selection in selected contexts', 'Requires enough viral RNA and correct clinical timing']
      ]
    },
    {
      title: 'Retrovirus Comparison Anchors',
      columns: ['Virus/group', 'Transmission', 'Main disease association', 'Testing anchor'],
      rows: [
        ['HIV-1', 'Sexual contact, blood exposure, perinatal transmission, shared needles', 'AIDS and opportunistic infections/malignancy risk through CD4 T-cell depletion', 'Ag/Ab screening, differentiation assay, HIV RNA, viral load, CD4, resistance testing'],
        ['HIV-2', 'Similar routes, more common in certain geographic regions', 'HIV disease with generally different epidemiology and some treatment/test implications', 'Differentiation assay matters; viral load assays must be appropriate'],
        ['HTLV-1', 'Blood, sexual, breastfeeding, endemic regional patterns', 'Adult T-cell leukemia/lymphoma and tropical spastic paraparesis/HTLV-associated myelopathy', 'Serology with confirmatory testing by policy'],
        ['HTLV-2', 'Blood/needle exposure and some endemic patterns', 'Less clearly linked to major disease than HTLV-1', 'Serology and epidemiologic context']
      ]
    }
  ],
  'congenital-and-cns-viral-infections': [
    {
      title: 'CNS and Congenital Viral Testing Map',
      columns: ['Clinical question', 'Viruses to consider', 'Specimen/test direction'],
      rows: [
        ['Viral meningitis', 'Enteroviruses, HSV-2, VZV, mumps, arboviruses depending on context', 'CSF NAAT for many agents; serology for selected arboviruses'],
        ['Viral encephalitis', 'HSV-1, VZV, arboviruses, enteroviruses, rabies, measles, JC virus in selected hosts', 'CSF NAAT, serum/CSF antibody, imaging and public health/referral testing by syndrome'],
        ['Congenital CMV', 'CMV', 'Urine or saliva NAAT/culture early in life; timing is critical'],
        ['Congenital rubella', 'Rubella virus', 'Infant IgM/NAAT and maternal serology/public health workflow'],
        ['Parvovirus B19 in pregnancy', 'Parvovirus B19', 'Maternal serology/NAAT and fetal monitoring context'],
        ['Neonatal HSV', 'HSV-1/2', 'Lesion, surface, blood, CSF NAAT depending on syndrome'],
        ['Progressive neurologic disease in immunocompromised host', 'JC virus, CMV, EBV-associated disease, VZV, HHV-6 in selected cases', 'CSF NAAT or tissue testing with clinical correlation']
      ]
    },
    {
      title: 'Viral Serology Panel Use Cases',
      columns: ['Use case', 'Viruses often included', 'Interpretation caution'],
      rows: [
        ['Exanthem evaluation', 'Measles, rubella, parvovirus B19, arboviruses depending on region', 'IgM can be false positive; public health testing rules may apply'],
        ['Vesicular condition', 'HSV and VZV', 'Lesion NAAT is usually preferred for acute diagnosis'],
        ['Mononucleosis-like syndrome', 'EBV, CMV, acute HIV, toxoplasmosis differential outside virology', 'Heterophile-negative illness needs targeted follow-up'],
        ['Respiratory immune status', 'Influenza, RSV, adenovirus and others are usually direct-detection questions, not broad serology', 'Serology rarely helps acute respiratory management'],
        ['Immunity documentation', 'Rubella, measles, VZV, HBV', 'IgG documents immunity for many purposes; IgM suggests recent infection only with context']
      ]
    },
    {
      title: 'Arbovirus and Zoonotic Virus Study Anchors',
      columns: ['Virus group', 'Transmission or reservoir', 'Disease anchor', 'Diagnostic habit'],
      rows: [
        ['Flavivirus arboviruses', 'Mosquito or tick vectors depending on virus', 'West Nile encephalitis, dengue, yellow fever, Japanese encephalitis, Zika and related syndromes', 'Serology is common; cross-reactivity and timing matter'],
        ['Togavirus alphaviruses', 'Mosquito vectors', 'Eastern/western/Venezuelan equine encephalitis and related febrile/arthralgia syndromes', 'Serology/public health testing by geography and syndrome'],
        ['Bunyavirales arboviruses', 'Mosquito, tick, sandfly, or rodent-associated groups', 'La Crosse and California encephalitis group, hantavirus pulmonary disease, hemorrhagic fever syndromes', 'Exposure history drives test selection and biosafety awareness'],
        ['Arenaviruses', 'Rodent-associated exposure', 'LCM meningitis-like disease and Lassa hemorrhagic fever depending on virus/geography', 'Serology/NAAT/reference testing; notify for high-risk travel syndromes'],
        ['Rhabdovirus rabies', 'Bite or saliva exposure from infected mammals, especially bats and carnivores', 'Fatal encephalitis if prophylaxis is not given before symptoms', 'Public health-guided testing and postexposure prophylaxis'],
        ['Filoviruses', 'Exposure in endemic/outbreak settings, body fluids, wildlife reservoirs', 'Severe viral hemorrhagic fever', 'High-containment notification and reference testing before routine handling']
      ]
    },
    {
      title: 'Nonrespiratory DNA Virus Anchors',
      columns: ['Virus/group', 'Disease lane', 'Diagnostic note'],
      rows: [
        ['HPV', 'Anogenital warts, skin warts, cervical and other HPV-associated cancers', 'Cytology and HPV molecular testing are screening/triage tools, not routine culture'],
        ['BK virus', 'Kidney transplant nephropathy and hemorrhagic cystitis contexts', 'Urine/blood viral load patterns are monitored in selected immunocompromised hosts'],
        ['JC virus', 'Progressive multifocal leukoencephalopathy', 'CSF PCR and clinical/imaging context are central'],
        ['Molluscum contagiosum', 'Umbilicated skin papules', 'Usually clinical diagnosis; EM/histology/PCR are special contexts'],
        ['Orthopoxviruses', 'Vesicular/pustular rash syndromes depending on virus', 'Public health testing and lesion specimens matter'],
        ['Adenovirus outside respiratory disease', 'Conjunctivitis, hemorrhagic cystitis, gastroenteritis, disseminated transplant disease', 'Specimen site should match syndrome']
      ]
    }
  ],
  'spirochetes-cell-wall-deficient-intracellular-agents': [
    {
      title: 'Spirochete Study Map',
      columns: ['Organism/group', 'Main transmission or exposure', 'Disease anchors', 'Best study testing logic'],
      rows: [
        ['Treponema pallidum subsp. pallidum', 'Sexual contact and congenital transmission', 'Syphilis: primary chancre, secondary rash/systemic disease, latent infection, tertiary disease, neurosyphilis, congenital disease', 'Use nontreponemal and treponemal serology together; direct detection is specialized and culture is not routine'],
        ['T. pallidum subsp. pertenue', 'Skin-to-skin spread through infectious lesions in warm humid regions', 'Yaws with skin lesions and possible late destructive bone/soft tissue disease', 'Serology resembles syphilis; geography and syndrome separate the diagnosis'],
        ['T. pallidum subsp. endemicum', 'Close personal contact and shared utensils in endemic settings', 'Endemic nonvenereal syphilis with mucocutaneous disease and possible late destructive lesions', 'Testing does not reliably distinguish subspecies without clinical and epidemiologic context'],
        ['Treponema carateum', 'Skin contact with infectious lesions in focal endemic areas', 'Pinta with skin lesions and pigmentary changes rather than classic venereal syphilis', 'Serology can overlap with other treponemal infections; exposure history matters'],
        ['Borrelia burgdorferi complex', 'Ixodes tick exposure in endemic regions', 'Lyme disease with erythema migrans, neurologic, cardiac, or joint manifestations depending on stage', 'Two-step serology is common after early localized disease; early testing can be negative'],
        ['Relapsing fever Borrelia', 'Soft ticks or body lice depending on species and region', 'Recurrent fever episodes with spirochetes sometimes visible during febrile periods', 'Direct blood smear or molecular/reference testing may matter during fever; exposure pattern is central'],
        ['Leptospira interrogans group', 'Urine-contaminated water, soil, animals, flooding, or occupational exposure', 'Leptospirosis ranging from febrile illness to jaundice, renal disease, pulmonary hemorrhage, or meningitis', 'Specimen timing changes yield: blood/CSF early, urine later; serology/reference methods are common anchors']
      ]
    },
    {
      title: 'Treponemal Disease Pattern Table',
      columns: ['Disease pattern', 'Usual patient/exposure clue', 'Clinical memory anchors', 'Testing warning'],
      rows: [
        ['Venereal syphilis', 'Sexual exposure or congenital risk', 'Primary painless lesion, secondary rash including palms/soles, latent stage, late neurologic/cardiovascular/gummatous possibilities', 'No single serologic result tells the whole story; stage, history, treatment, and titer trend matter'],
        ['Congenital syphilis', 'Maternal infection during pregnancy', 'May involve stillbirth, neonatal disease, rash, hepatosplenomegaly, bone findings, or later dental/neurologic findings', 'Maternal antibody complicates interpretation; infant evaluation follows specific algorithms'],
        ['Yaws', 'Child in endemic warm/humid setting with skin-to-skin exposure', 'Papules, ulcers, disseminated skin lesions, and possible late destructive tissue/bone disease', 'Routine serology cannot neatly separate yaws from syphilis without epidemiology'],
        ['Endemic nonvenereal syphilis', 'Close-contact spread in arid or warm endemic regions', 'Oral or skin lesions with possible late destructive disease', 'Transmission is nonsexual; avoid assuming venereal exposure from serology alone'],
        ['Pinta', 'Endemic region with skin lesion exposure', 'Skin papules or plaques followed by pigment changes', 'Mostly a skin disease pattern; serology overlaps with other treponemal infections']
      ]
    },
    {
      title: 'Syphilis Serology Test Jobs',
      columns: ['Test type', 'Examples', 'What it is good for', 'Student caution'],
      rows: [
        ['Nontreponemal tests', 'RPR and VDRL', 'Screening in some algorithms, estimating activity with a titer, and monitoring response after treatment', 'False positives and false negatives occur; results must be confirmed or interpreted with a treponemal test and clinical context'],
        ['Treponemal tests', 'EIA/CIA, TP-PA, FTA-ABS, other treponemal immunoassays', 'Confirming exposure to T. pallidum-type antigens and supporting reverse-sequence algorithms', 'Often remains reactive after treated infection, so it is not a clean marker of current activity'],
        ['CSF VDRL', 'VDRL performed on CSF when neurosyphilis is being evaluated', 'Specific supportive evidence when reactive in the right setting', 'A nonreactive result does not fully exclude neurosyphilis when suspicion is high'],
        ['Quantitative titer', 'Reported as a dilution such as 1:2, 1:8, 1:32', 'Follow disease activity and response to therapy using the same test method when possible', 'Compare titers carefully; small changes may not be meaningful'],
        ['Direct detection or specialized testing', 'Darkfield, DFA, PCR/reference workflows depending on lesion and setting', 'Can support diagnosis from appropriate lesions or specimens', 'Not routine for every lab and can be limited by specimen quality and availability']
      ]
    },
    {
      title: 'RPR and VDRL Reading Pitfalls',
      columns: ['Concept', 'RPR/VDRL study meaning', 'Why students care'],
      rows: [
        ['Reagin-based reaction', 'These tests detect antibodies reacting with cardiolipin-type antigen material, not a unique whole-organism marker', 'Explains biologic false positives and why confirmation is needed'],
        ['Flocculation endpoint', 'Reactive samples show visible clumping or particle aggregation by the method used', 'Reading time, rotation/mixing, and drying can change appearance'],
        ['Specimen limits', 'Hemolysis, lipemia, contamination, heat handling, or wrong specimen type can interfere depending on method', 'Preanalytic problems can create confusing results'],
        ['Prozone effect', 'Very high antibody levels can rarely make an undiluted test look falsely nonreactive', 'Dilution may be needed when clinical suspicion and result disagree'],
        ['False-positive settings', 'Pregnancy, autoimmune disease, some viral infections, injection drug use, older age, and other infections can be associated', 'A reactive screen is not automatically syphilis'],
        ['False-negative timing', 'Very early infection and some late or treated patterns can be nonreactive', 'A negative result does not always end the workup if the syndrome fits']
      ]
    },
    {
      title: 'Traditional and Reverse Syphilis Algorithms',
      columns: ['Algorithm', 'First test', 'If first test is reactive', 'Main interpretation habit'],
      rows: [
        ['Traditional sequence', 'Start with RPR or VDRL', 'Confirm with a treponemal test such as TP-PA or another specific assay', 'Good for finding active reagin response, but early or treated patterns can be missed'],
        ['Reverse sequence', 'Start with treponemal EIA/CIA or similar assay', 'Perform quantitative RPR/VDRL; if discordant, use a second treponemal test', 'Can detect past treated infection or early infection, but discordant results need careful sorting'],
        ['Both tests reactive', 'Treponemal and nontreponemal tests agree', 'Stage, symptoms, treatment history, and titer guide next interpretation', 'Do not stop at "positive"; ask active, past, treated, reinfection, or congenital risk'],
        ['Treponemal reactive but RPR/VDRL nonreactive', 'Common reverse-algorithm discordance', 'Second treponemal test and history help separate past infection, early infection, false positive, or treated disease', 'This pattern is not automatically active syphilis'],
        ['RPR/VDRL reactive but treponemal test nonreactive', 'Possible biologic false positive or technical/context issue', 'Review risk, symptoms, specimen, and repeat/confirm strategy by policy', 'Avoid diagnosing syphilis from a lone reagin result']
      ]
    },
    {
      title: 'Syphilis Stage and Test Sensitivity Anchors',
      columns: ['Stage', 'Nontreponemal test tendency', 'Treponemal test tendency', 'Practical warning'],
      rows: [
        ['Very early primary', 'May still be nonreactive', 'May also be negative early', 'Lesion timing can precede serologic positivity'],
        ['Primary', 'Often reactive but less sensitive than in secondary disease', 'Usually becomes reactive as immune response develops', 'A compatible lesion may need repeat testing or direct/specialized evaluation'],
        ['Secondary', 'Usually strongly reactive', 'Usually reactive', 'High antibody levels can rarely cause prozone with nontreponemal testing'],
        ['Latent', 'May remain reactive, sometimes at lower titers', 'Usually reactive', 'History and prior treatment decide meaning'],
        ['Late disease or treated infection', 'Can decline or become nonreactive after treatment or over time', 'Often remains reactive for life', 'Treponemal positivity alone does not prove active disease']
      ],
      note: 'Exact sensitivity varies by assay and patient setting. Use this table as a study anchor, not as a substitute for current laboratory policy.'
    },
    {
      title: 'Lyme Serology Two-Step Logic',
      columns: ['Step', 'Result pattern', 'Interpretation habit', 'Student trap'],
      rows: [
        ['Initial immunoassay', 'Negative', 'Usually no further serology if pretest probability is low or compatible illness is not present', 'Early localized disease can test negative, especially with short symptom duration'],
        ['Initial immunoassay', 'Positive or equivocal', 'Reflex to a second-tier test by the lab algorithm', 'Do not report the screen alone as final proof'],
        ['Second-tier immunoblot or second immunoassay', 'Positive by criteria', 'Supports exposure/infection in the right clinical setting', 'Serology does not distinguish every active versus past infection question'],
        ['Second-tier test', 'Negative after reactive screen', 'Usually interpreted as not supported serologically, with repeat testing only if timing and clinical suspicion justify it', 'A single early negative algorithm can miss evolving antibody response'],
        ['Neuroborreliosis concern', 'Serum plus CSF evaluation may be considered by specialized criteria', 'Paired context helps avoid overcalling nonspecific CSF findings', 'Routine serum logic alone may not answer neurologic questions']
      ]
    },
    {
      title: 'Chlamydia and Related Agents Study Anchors',
      columns: ['Organism/group', 'Main host or source pattern', 'Clinical anchors', 'Testing idea'],
      rows: [
        ['Chlamydia trachomatis', 'Humans; urogenital, ocular, neonatal, and lymphogranuloma venereum settings', 'Trachoma, urethritis, cervicitis, PID, epididymitis, neonatal conjunctivitis or pneumonia, and LGV depending on serovar', 'NAAT is the practical anchor for many genital, urine, rectal, and pharyngeal workflows; specimen site and assay validation matter'],
        ['Chlamydia psittaci', 'Bird exposure; human disease is uncommon', 'Psittacosis with atypical pneumonia or systemic illness after bird exposure', 'Exposure history is the clue; routine culture is not the student anchor'],
        ['Chlamydia pneumoniae', 'Human respiratory transmission', 'Community respiratory infection and atypical pneumonia patterns', 'Molecular or serologic methods may be used by setting; routine plate culture is not useful']
      ]
    },
    {
      title: 'C. trachomatis Syndrome Map',
      columns: ['Serovar lane', 'Syndrome anchors', 'Transmission or source clue'],
      rows: [
        ['A-C', 'Trachoma with chronic ocular infection and scarring risk', 'Eye-to-eye spread, contaminated hands, fomites, and flies in endemic settings'],
        ['D-K', 'Urethritis, cervicitis, PID, epididymitis, proctitis, neonatal conjunctivitis, or neonatal pneumonia', 'Sexual transmission, autoinoculation, infected secretions, or perinatal exposure'],
        ['L1-L3', 'Lymphogranuloma venereum with invasive lymphatic disease', 'Sexual transmission; presentation may include proctocolitis or lymphadenopathy depending on exposure site']
      ]
    },
    {
      title: 'Chlamydia Testing and Specimen Logic',
      columns: ['Patient or specimen context', 'Most useful testing anchor', 'Student warning'],
      rows: [
        ['Urogenital screening in women', 'Vaginal swab or first-catch urine NAAT depending on collection strategy and test validation', 'Do not assume every specimen type is validated for every platform'],
        ['Urogenital screening in men', 'First-catch urine or urethral specimen NAAT depending on setting', 'Collection timing and specimen type matter'],
        ['Rectal or pharyngeal exposure', 'Site-specific NAAT when validated and clinically indicated', 'A genital-only test can miss exposed sites'],
        ['Neonatal conjunctivitis or pneumonia concern', 'Conjunctival or respiratory-site testing by validated methods', 'Neonatal disease is not the same workflow as adult screening'],
        ['Trachoma or LGV suspicion', 'Clinical syndrome plus specialized testing or public health workflow when needed', 'Serovar and syndrome context change interpretation']
      ]
    },
    {
      title: 'Rickettsial and Related Vector-Borne Pattern Table',
      columns: ['Agent/group', 'Vector or exposure', 'Disease anchor', 'Testing idea'],
      rows: [
        ['Spotted fever group Rickettsia', 'Ticks', 'Rocky Mountain spotted fever and related spotted-fever syndromes depending on geography', 'Serology is common; PCR may help from appropriate specimens; early serology can be negative'],
        ['Typhus group Rickettsia', 'Lice or fleas depending on agent', 'Epidemic typhus, recrudescent Brill-Zinsser disease, or murine typhus', 'Exposure and geography organize the differential'],
        ['Orientia tsutsugamushi', 'Chiggers or mites in endemic regions', 'Scrub typhus', 'Travel/geography and eschar-plus-fever patterns matter'],
        ['Ehrlichia chaffeensis / E. ewingii', 'Amblyomma ticks in relevant regions', 'Human monocytic ehrlichiosis or related ehrlichial disease', 'PCR early in illness and paired serology concepts are useful anchors'],
        ['Anaplasma phagocytophilum', 'Ixodes ticks', 'Human granulocytic anaplasmosis', 'Peripheral blood smear morulae can be a clue but are not fully sensitive'],
        ['Neorickettsia sennetsu', 'Regional exposure pattern, classically described in parts of Asia', 'Sennetsu fever', 'Uncommon; learn as exposure-serology logic rather than routine culture logic']
      ]
    },
    {
      title: 'Rickettsial Testing Pitfalls',
      columns: ['Concept', 'Why it matters', 'Student takeaway'],
      rows: [
        ['Serology timing', 'Antibodies may not be detectable early in illness', 'A negative early result does not always exclude disease'],
        ['PCR specimen choice', 'PCR yield depends on organism, timing, and specimen type', 'Use appropriate material and clinical context'],
        ['Weil-Felix reaction', 'Historical cross-reaction test with poor sensitivity and specificity', 'Know it as legacy exam history, not a preferred modern diagnostic path'],
        ['Blood smear morulae', 'Can support Ehrlichia or Anaplasma suspicion when seen', 'Absence does not rule out infection'],
        ['Geography and vector history', 'Agent probability changes by ticks, lice, fleas, mites, travel, and region', 'Exposure history is part of the lab workup']
      ]
    },
    {
      title: 'Mycoplasma and Ureaplasma Study Anchors',
      columns: ['Organism/group', 'Where students should place it', 'Clinical anchors', 'Testing or culture warning'],
      rows: [
        ['Mycoplasma pneumoniae', 'Respiratory tract pathogen without a cell wall', 'Atypical pneumonia, tracheobronchitis, school-age or young adult respiratory illness, and occasional extrapulmonary associations', 'NAAT or serology may be used; culture is slow and specialized'],
        ['Mycoplasma genitalium', 'Urogenital pathogen', 'Nongonococcal urethritis and cervicitis or PID-associated concern', 'NAAT is the practical anchor; resistance-guided therapy may matter clinically'],
        ['Mycoplasma hominis', 'Genital tract colonizer or opportunist', 'Postpartum or postprocedural infection, PID-associated context, neonatal or immunocompromised-host infection in selected cases', 'Often colonization; source and syndrome decide significance'],
        ['Ureaplasma urealyticum/parvum', 'Genital tract colonizers or opportunists; urease-positive lane', 'Urogenital disease associations, pregnancy or neonatal contexts, and invasive disease in selected hosts', 'Interpret cautiously because colonization is common'],
        ['Other oral/genital Mycoplasma-like flora', 'Oropharynx or genital tract depending on species', 'Usually colonization or unclear significance', 'Do not make disease from a name alone']
      ]
    },
    {
      title: 'Mycoplasma Collection and Culture Concepts',
      columns: ['Concept', 'Study meaning', 'Pitfall'],
      rows: [
        ['No classic cell wall', 'Beta-lactam logic does not fit Mycoplasma or Ureaplasma', 'Do not apply routine cell-wall drug assumptions'],
        ['Fastidious growth', 'Special media, serum or sterol support, and prolonged incubation may be needed', 'Routine bacterial plates are not the workflow'],
        ['Transport quickly when culture is attempted', 'Fragile organisms and low burden can reduce recovery', 'Delayed or dried specimens weaken results'],
        ['Body fluid or liquid specimens', 'May require concentration and special handling before inoculation', 'Routine processing can miss the target'],
        ['Swabs', 'Need suitable transport medium and validated testing', 'A standard dry swab may be unacceptable depending on method'],
        ['Urease, arginine, and glucose reactions', 'Classic differentiation anchors for Ureaplasma and selected Mycoplasma groups', 'Modern labs often use molecular methods rather than classic culture differentiation']
      ]
    }
  ],
  'anaerobic-bacteria': [
    {
      title: 'Anaerobe Source and Acquisition Table',
      columns: ['Pattern', 'Organisms to think about', 'Clinical meaning'],
      rows: [
        ['Endogenous flora enters sterile tissue', 'Bacteroides fragilis group, Prevotella/Porphyromonas, Fusobacterium, anaerobic cocci, Clostridium, Actinomyces', 'Abscess, intra-abdominal infection, pelvic infection, aspiration pneumonia, deep wound infection'],
        ['Contaminated wound or devitalized tissue', 'Clostridium perfringens and other clostridia, mixed anaerobes', 'Gas gangrene, necrotizing infection, traumatic wound infection'],
        ['Toxin from food or colonization', 'C. botulinum, C. perfringens, C. difficile', 'Foodborne intoxication, antibiotic-associated colitis, toxin-mediated syndromes'],
        ['Dental/oral source', 'Prevotella, Porphyromonas, Fusobacterium, Actinomyces, anaerobic cocci', 'Dental abscess, head/neck infection, aspiration-related disease'],
        ['Female genital tract source', 'Bacteroides, Prevotella, anaerobic cocci, Mobiluncus, Actinomyces in selected settings', 'Pelvic infection, bacterial vaginosis-associated patterns, device-associated actinomycosis context'],
        ['Hospital antibiotic pressure', 'C. difficile', 'Antibiotic-associated diarrhea and colitis']
      ]
    },
    {
      title: 'Major Anaerobe Organism Anchors',
      columns: ['Organism/group', 'Key clinical anchors', 'Student warning'],
      rows: [
        ['Bacteroides fragilis group', 'Intra-abdominal abscess, bacteremia, pelvic infection, mixed anaerobic infection', 'Often resistant to several drugs; do not treat like a simple Gram-negative rod'],
        ['Prevotella/Porphyromonas', 'Oral, respiratory, pelvic, and bite-related mixed infections; pigment may help in some workflows', 'Specimen quality matters because these can be normal flora at nonsterile sites'],
        ['Fusobacterium nucleatum/necrophorum group', 'Head/neck infection, Lemierre syndrome concept, abscesses, invasive disease', 'Clinical syndrome can make the organism very significant'],
        ['Clostridium perfringens', 'Gas gangrene, food poisoning, wound infection, bacteremia', 'Toxin and tissue destruction are the key concepts'],
        ['Clostridium tetani', 'Tetanus from wound contamination', 'Diagnosis is clinical; culture is not the core student anchor'],
        ['Clostridium botulinum', 'Botulism from toxin exposure or intestinal colonization in infants', 'Toxin disease, not routine culture ID, drives urgency'],
        ['Clostridioides difficile', 'Antibiotic-associated diarrhea and pseudomembranous colitis', 'Testing should match symptomatic patients and local algorithm'],
        ['Actinomyces spp.', 'Chronic draining sinus tracts, oral/cervicofacial disease, pelvic device-associated context', 'Slow-growing, branching Gram-positive rods can be missed if culture conditions are poor'],
        ['Cutibacterium acnes', 'Skin flora, prosthetic joint/device infection, blood culture contaminant versus true infection question', 'Slow growth and repeated recovery matter'],
        ['Anaerobic Gram-positive cocci', 'Abscesses, diabetic foot, bite, pelvic, respiratory, and polymicrobial infections', 'Usually part of a mixed anaerobic pattern'],
        ['Mobiluncus spp.', 'Bacterial vaginosis-associated curved anaerobic rods', 'Usually interpreted as part of vaginal flora syndrome, not isolated pathogen logic']
      ]
    },
    {
      title: 'Anaerobe Bench and Media Clues',
      columns: ['Clue', 'What it means', 'Pitfall'],
      rows: [
        ['Aspirate or tissue specimen', 'Best specimen style for anaerobic recovery', 'Superficial swabs often mislead'],
        ['Oxygen exposure during collection', 'Can kill strict anaerobes and produce false-negative culture', 'A negative culture does not rule out anaerobic infection if collection was poor'],
        ['Anaerobic blood agar growth only', 'Supports anaerobic organism when purity and conditions fit', 'Confirm with aerotolerance testing when needed'],
        ['BBE/LKV/special anaerobic media', 'Helps recover or sort selected anaerobe groups', 'Media clue is not final ID'],
        ['Special-potency disk patterns', 'Older teaching method for anaerobe grouping', 'Modern labs may use MALDI-TOF or molecular methods instead'],
        ['Mixed flora with foul odor or gas', 'Anaerobic infection may be present', 'Odor is a clue, not proof'],
        ['Gram stain shows organisms but culture is negative', 'Anaerobe, prior antibiotics, poor transport, or fastidious organism is possible', 'Correlate with specimen quality and method limits']
      ]
    },
    {
      title: 'Anaerobic Culture Specimen Sorting',
      columns: ['Usually useful for anaerobic culture', 'Usually poor choice', 'Reasoning anchor'],
      rows: [
        ['Deep abscess aspirate, tissue biopsy, or operative specimen', 'Superficial wound swab', 'Anaerobes are best recovered from protected deep material rather than surface flora'],
        ['Blood, bone marrow, normally sterile body fluids, or CSF when clinically indicated', 'Voided urine or catheter urine', 'Sterile-site specimens can make anaerobe recovery meaningful; urine collection often introduces oxygen and mixed flora issues'],
        ['Transtracheal aspirate, protected bronchial specimen, or direct lung aspirate', 'Coughed sputum or routine throat swab', 'Upper-airway contamination makes routine respiratory swabs unreliable for anaerobes'],
        ['Culdocentesis or protected endometrial tissue when pelvic anaerobe infection is suspected', 'Vaginal or cervical swab', 'Nonsterile genital tract swabs often reflect mixed flora rather than a deep anaerobic process'],
        ['Suprapubic bladder aspirate when anaerobic urinary infection is specifically suspected', 'Random urine specimen', 'A protected aspirate answers a different question than routine urine culture'],
        ['Material from a draining sinus only when collected from deep tract or sulfur granules are present', 'Drainage from ileostomy, colostomy, rectal swab, or nasopharyngeal swab', 'Specimen route can make the result uninterpretable even if anaerobes grow']
      ],
      note: 'Local collection manuals decide final acceptability. The study rule is simple: protected deep specimen beats exposed surface swab.'
    },
    {
      title: 'Anaerobe Morphology and Colony Patterns',
      columns: ['Bench pattern', 'Organisms/groups to consider', 'How students should use it'],
      rows: [
        ['Gram-negative pleomorphic rods or coccobacilli, often from abscess or intra-abdominal source', 'Bacteroides fragilis group and related anaerobic Gram-negative rods', 'Connect morphology to source, bile resistance/media clues, and resistance-aware therapy logic'],
        ['Pigmented colonies or darkening on anaerobic plates', 'Prevotella and Porphyromonas spectrum', 'Pigment can support oral/pelvic anaerobe thinking but is not final identification'],
        ['Slender spindle-shaped Gram-negative rods with pointed ends', 'Fusobacterium nucleatum-like organisms', 'Think oral, head/neck, abscess, Lemierre-type clinical stories, and mixed infection'],
        ['Gram-positive rods with spores, anaerobic growth, and toxin-linked syndrome', 'Clostridium and Clostridioides groups', 'Separate wound/gas gangrene, tetanus, botulism, and C. difficile logic by syndrome'],
        ['Branching Gram-positive rods from chronic draining lesion or pelvic device context', 'Actinomyces spp.', 'Slow growth and specimen quality matter; sulfur granules are a clue when present'],
        ['Tiny or variably sized Gram-positive cocci in chains, pairs, tetrads, or clusters', 'Anaerobic Gram-positive cocci such as Finegoldia, Parvimonas, Peptostreptococcus-like groups', 'Usually part of polymicrobial abscess or deep infection logic'],
        ['Curved or comma-like anaerobic rods in vaginal or mixed genital context', 'Mobiluncus spp. and bacterial vaginosis-associated patterns', 'Interpret with syndrome/ecology rather than isolated invasive pathogen logic'],
        ['Gram-negative cocci in anaerobic conditions', 'Veillonella spp.', 'Often oral/GI flora; sterile-site recovery and host context decide meaning']
      ]
    },
    {
      title: 'Anaerobe Media and Grouping Clues',
      columns: ['Medium/test clue', 'Main study use', 'What it should not become'],
      rows: [
        ['Anaerobic blood agar', 'Broad nonselective recovery and colony morphology under anaerobic conditions', 'Not enough by itself to identify an anaerobe'],
        ['Bacteroides bile esculin-style medium', 'Helps support B. fragilis group thinking and bile/esculin patterns', 'Not a substitute for full identification or susceptibility logic'],
        ['Laked kanamycin-vancomycin-style selective media', 'Helps recover Prevotella and Bacteroides-type anaerobic Gram-negative rods', 'Not all anaerobes will grow or separate neatly'],
        ['Phenylethyl alcohol-style media', 'Suppresses many facultative Gram-negative rods and helps recover Gram-positive or some anaerobic organisms', 'Selection is imperfect and formula-dependent'],
        ['Egg yolk agar reactions', 'Lecithinase/lipase/proteolysis clues for selected anaerobes, especially clostridial teaching', 'A reaction pattern is a clue, not species-level proof'],
        ['Aerotolerance test', 'Separates strict anaerobe behavior from aerotolerant or facultative growth', 'A setup error can falsely suggest poor growth or wrong oxygen category'],
        ['Special-potency disk grouping', 'Older educational way to group anaerobes by susceptibility patterns', 'Many modern labs use MALDI-TOF, molecular, or validated commercial systems instead']
      ]
    },
    {
      title: 'Anaerobe AST Study Anchors',
      columns: ['Organism/group', 'Therapy/resistance idea to remember', 'Reporting caution'],
      rows: [
        ['Bacteroides fragilis group and related anaerobic Gram-negative rods', 'Beta-lactamase production and resistance variability are common study themes', 'Use anaerobe-specific methods and current guidance when testing is needed'],
        ['Prevotella, Porphyromonas, and Fusobacterium groups', 'Resistance varies by group and drug; mixed infections are common', 'Do not infer susceptibility from a routine Gram-negative panel'],
        ['Clostridium spp.', 'Penicillin susceptibility varies; C. difficile therapy is syndrome-specific and not the same as wound clostridia', 'Interpret by syndrome, species/group, and validated methods'],
        ['Actinomyces/Propionibacterium-Cutibacterium/Eubacterium-like groups', 'Many are treated by syndrome and source control; resistance questions are organism-dependent', 'Repeated sterile-site recovery changes significance'],
        ['Anaerobic Gram-positive cocci', 'Usually part of polymicrobial infection; therapy choices depend on site and companion organisms', 'Avoid overinterpreting isolated recovery from poor specimens']
      ],
      note: 'Final antimicrobial interpretation should follow current laboratory standards and local reporting policy.'
    }
  ],
  'mycobacteria-actinomycetes': [
    {
      title: 'Mycobacteria Learning Map',
      columns: ['Branch', 'What belongs here', 'First question to ask'],
      rows: [
        ['Tuberculosis complex', 'M. tuberculosis, M. bovis, M. africanum, M. microti, M. canettii, and related complex members', 'Is this a tuberculosis public health and biosafety workflow?'],
        ['Slow-growing nontuberculous mycobacteria', 'M. avium complex, M. kansasii, M. marinum, M. xenopi, M. ulcerans, M. haemophilum, M. simiae, and related species', 'Does the source and host make an NTM isolate clinically meaningful?'],
        ['Rapid-growing mycobacteria', 'M. fortuitum group, M. abscessus complex, M. chelonae, M. mucogenicum, and related rapid growers', 'Is this skin/soft tissue, device, postoperative, pulmonary, or catheter-associated disease?'],
        ['Rare or uncertain clinical relevance species', 'Environmental or infrequently recovered mycobacteria', 'Is this true disease, colonization, contamination, or a name produced by modern ID?'],
        ['Aerobic actinomycetes', 'Nocardia, Gordonia, Tsukamurella, Rhodococcus, Streptomyces, Actinomadura, and related genera', 'Is it branching, partially acid-fast, and clinically significant from this source?']
      ]
    },
    {
      title: 'AFB Specimen Workflow Anchors',
      columns: ['Specimen situation', 'Processing idea', 'Why students care'],
      rows: [
        ['Sterile specimen such as CSF, tissue, or normally sterile fluid', 'Concentrate when appropriate and inoculate mycobacterial media; interpret with sterile-source urgency', 'Sterile-source AFB concern is never just a routine culture add-on'],
        ['Respiratory or other nonsterile specimen', 'Decontamination/concentration workflow helps suppress background flora before AFB culture', 'Processing changes recovery and explains why mycobacterial culture is not routine plate culture'],
        ['AFB smear requested', 'Report whether acid-fast bacilli are seen; burden grading may be used by lab policy', 'Smear positivity supports infectious burden but does not identify MTB versus NTM by itself'],
        ['MTB clinical concern', 'Use NAAT/reflex testing and biosafety workflow according to policy', 'A smear result alone should not delay safety and notification thinking'],
        ['Culture growth in liquid or solid media', 'Confirm acid-fastness, identify organism, and decide susceptibility or reference workflow', 'Mycobacteria often require prolonged incubation and method-specific interpretation'],
        ['Possible rapid grower from wound, catheter, or postoperative source', 'Use rapid-grower identification and susceptibility logic when clinically significant', 'Rapid growth does not make it a routine Gram-positive rod problem']
      ]
    },
    {
      title: 'Tuberculosis Complex Study Anchors',
      columns: ['Organism/group', 'Reservoir or source pattern', 'Transmission/syndrome anchor', 'What not to miss'],
      rows: [
        ['M. tuberculosis', 'Humans are the main reservoir', 'Airborne droplet nuclei; pulmonary disease, cavitary disease, extrapulmonary disease, latent/reactivation concepts', 'Biosafety, public health, NAAT, and susceptibility workflow matter'],
        ['M. bovis', 'Cattle and unpasteurized dairy exposure; animal reservoirs depending on region', 'Ingestion of unpasteurized products or animal exposure; can cause TB-like disease', 'Pyrazinamide resistance is a classic teaching point'],
        ['M. africanum', 'Human-associated in parts of West Africa', 'TB-like disease and respiratory transmission', 'Travel/geography can explain the name'],
        ['M. microti/caprae/canettii-like complex members', 'Animal, regional, or less common reservoirs depending on species', 'Rare TB-complex disease patterns', 'Do not memorize rare names before learning TB-complex workflow']
      ]
    },
    {
      title: 'Nontuberculous Mycobacteria: Slow Grower Anchors',
      columns: ['Organism/group', 'Environmental or source clue', 'Clinical anchors', 'Student warning'],
      rows: [
        ['M. avium complex', 'Water, soil, and environmental sources', 'Pulmonary disease, disseminated disease in advanced immunocompromise, lymphadenitis', 'A respiratory isolate must fit clinical/radiographic criteria before calling disease'],
        ['M. kansasii', 'Water-associated reservoir', 'Pulmonary disease resembling TB and occasional extrapulmonary disease', 'Can be clinically important in respiratory disease'],
        ['M. marinum', 'Aquariums, fish, marine/freshwater exposure, skin trauma', 'Localized cutaneous infection, nodular lymphangitic pattern', 'Temperature/source history is a major clue'],
        ['M. ulcerans', 'Stagnant water and tropical/subtropical exposure', 'Buruli ulcer and chronic skin/subcutaneous disease', 'Disease pattern is more helpful than routine culture expectations'],
        ['M. haemophilum', 'Special growth needs and immunocompromised-host context', 'Skin, joint, lymph node, or disseminated infection', 'Special culture conditions may be required'],
        ['M. xenopi/simiae/other slow growers', 'Water systems or environmental reservoirs depending on species', 'Pulmonary disease, lymphadenitis, or uncertain significance', 'Clinical significance is source- and host-dependent']
      ]
    },
    {
      title: 'Rapid-Growing Mycobacteria Anchors',
      columns: ['Organism/group', 'Clinical pattern', 'Bench idea'],
      rows: [
        ['M. fortuitum group', 'Skin/soft tissue, postoperative, catheter, pulmonary, or wound infection', 'Rapid growth on mycobacterial media; species-level ID and AST often matter'],
        ['M. abscessus complex', 'Pulmonary disease, skin/soft tissue infection, health-care-associated infection, disseminated disease in selected hosts', 'Often difficult therapy; subspecies/resistance logic can matter'],
        ['M. chelonae', 'Skin and soft tissue infection, postoperative wound infection, keratitis, catheter-associated infection', 'Rapid grower; do not force into routine bacterial AST assumptions'],
        ['M. mucogenicum', 'Catheter-related bloodstream infection and health-care water association', 'Name hints at mucoid growth; significance rises with line/sterile-source recovery'],
        ['Less common rapid growers', 'Bone/joint, surgical site, catheter, pulmonary, or opportunistic infection depending on species', 'Modern ID may name rare species; clinical context decides weight']
      ]
    },
    {
      title: 'Mycobacteria Testing and Media Clues',
      columns: ['Method or medium idea', 'What it does', 'How to avoid overreading it'],
      rows: [
        ['Fluorochrome AFB smear', 'Sensitive screening for acid-fast organisms in many workflows', 'Positive does not equal tuberculosis complex by itself'],
        ['Solid media such as Lowenstein-Jensen or Middlebrook agar', 'Supports colony recovery, morphology, pigment, and slower growth observation', 'Slow incubation is expected; early negatives are not final'],
        ['Liquid mycobacterial systems', 'Improve recovery/detection speed and monitor growth in broth', 'Growth still needs confirmation and identification'],
        ['Decontamination/concentration', 'Reduces background flora in nonsterile specimens and concentrates organisms', 'Over-decontamination can reduce mycobacterial recovery'],
        ['Niacin/nitrate/catalase/Tween/arylsulfatase-style classic tests', 'Older biochemical anchors for selected mycobacteria', 'Many labs now rely on molecular or MALDI/reference workflows'],
        ['AFB smear grading', 'Communicates organism burden seen on smear', 'Grade is not species ID and should be interpreted with specimen type and NAAT/culture'],
        ['Mycobacterial susceptibility testing', 'Guides therapy for TB complex, selected NTM, and rapid growers', 'Drug sets and methods differ sharply by organism group']
      ]
    },
    {
      title: 'Mycobacteria Susceptibility Anchors',
      columns: ['Group', 'Testing focus', 'Student anchor'],
      rows: [
        ['Tuberculosis complex', 'First-line and second-line anti-tubercular agents depending on resistance risk and public health workflow', 'Never treat TB susceptibility like routine bacteriology AST'],
        ['M. avium complex', 'Macrolide and other selected agents depending on disease context', 'Clinical disease criteria matter before treatment decisions'],
        ['M. kansasii', 'Rifampin-centered susceptibility thinking is a classic anchor', 'If rifampin resistance appears, broader testing may be needed'],
        ['M. marinum', 'Selected oral agents based on clinical disease and method guidance', 'Often skin/soft tissue; specimen and exposure history organize it'],
        ['Rapid-growing mycobacteria', 'Amikacin, macrolide, fluoroquinolone, doxycycline/minocycline, imipenem/cefoxitin, TMP-SMX, and others depending on species/method', 'Species and inducible macrolide-resistance concepts can matter'],
        ['Rare NTM', 'Reference lab or specialized guidance may be needed', 'Avoid unsupported therapy conclusions from organism name alone']
      ],
      note: 'Use current CDC/CLSI/public health and local laboratory guidance for final tuberculosis and NTM testing decisions.'
    }
  ],
  'staphylococcus-species-patterns': [
    {
      title: 'Expanded Staphylococcus Detail Table',
      columns: ['Organism/group', 'High-yield bench clues', 'Where it usually comes from', 'Clinical meaning to remember'],
      rows: [
        ['S. aureus', 'Coagulase-positive lane; often beta-hemolytic; DNase and latex methods may support ID; evaluate MRSA and inducible clindamycin logic when relevant', 'Skin, anterior nares, mucosa; can move from colonization to sterile sites by wounds, lines, surgery, or person-to-person spread', 'Skin abscess, bacteremia, pneumonia, endocarditis, osteomyelitis, toxic shock, scalded skin syndrome, food poisoning'],
        ['S. epidermidis', 'Coagulase-negative; often device/biofilm context; usually nonhemolytic to weakly hemolytic', 'Skin and mucous membranes', 'Catheter, prosthetic valve, shunt, prosthetic joint, and other hardware-associated infection when repeatedly recovered'],
        ['S. haemolyticus', 'Coagulase-negative; may be beta-hemolytic; resistance can be prominent in hospital isolates', 'Skin and mucous membranes, often low numbers', 'Bacteremia, endocarditis, peritonitis, wound or device-associated infection in selected patients'],
        ['S. lugdunensis', 'Coagulase-negative by many workflows but can behave more like an aggressive pathogen; colony may appear larger or glossier than expected', 'Skin-associated organism', 'Skin/soft tissue infection, bacteremia, endocarditis; do not dismiss as ordinary CoNS without context'],
        ['S. saprophyticus', 'Coagulase-negative; classic novobiocin-resistant study anchor; urease may be positive', 'Skin, mucosa, and genitourinary tract', 'Uncomplicated UTI, especially in young sexually active patients'],
        ['S. schleiferi group', 'Coagulase variable depending on subspecies; may overlap with animal-associated context', 'Skin, animals, wounds', 'Wound, ear, bone/joint, or device-associated infection; species/subspecies matters'],
        ['S. intermedius group and S. pseudintermedius', 'Coagulase-positive or variable animal-associated staphylococci', 'Dogs and other animals; bite or wound context', 'Human wound or soft tissue infection can follow animal exposure; avoid assuming all coagulase-positive isolates are S. aureus'],
        ['S. capitis', 'Coagulase-negative; often skin flora; may be urease-positive in some workflows', 'Scalp/skin and mucosal surfaces', 'Usually low significance, but neonatal, device, and bloodstream contexts can matter'],
        ['S. hominis', 'Coagulase-negative; skin-associated; biochemical patterns vary by method', 'Human skin', 'Often contaminant, but catheter or bloodstream recovery may be significant with repetition'],
        ['S. warneri', 'Coagulase-negative; usually nonpigmented to lightly pigmented', 'Skin and mucosa', 'Occasional bacteremia, endocarditis, or device-associated infection'],
        ['S. cohnii', 'Coagulase-negative; novobiocin response and carbohydrate patterns vary by subspecies', 'Skin-associated organism', 'Usually opportunistic; interpret by source and repeat recovery'],
        ['S. simulans', 'Coagulase-negative; animal and human skin association; can resemble other CoNS', 'Skin and animal exposure settings', 'Wound, bone/joint, or bloodstream infection is possible in the right context'],
        ['S. sciuri group', 'Coagulase-negative; animal/environment association; resistance genes may complicate interpretation', 'Animals, environment, skin', 'Uncommon human pathogen; wound/device context matters'],
        ['Micrococcus spp.', 'Catalase-positive, microdase/modified oxidase often positive; more strictly aerobic pattern', 'Skin, mucosa, oropharynx, environment', 'Usually contaminant, but immunocompromised and device-associated infections occur rarely'],
        ['Kocuria and Kytococcus-like organisms', 'Micrococcus-like Gram-positive cocci; ID may require validated systems', 'Skin and mucosal surfaces', 'Usually low significance; rare bloodstream, CNS, respiratory, or endocarditis cases in vulnerable hosts']
      ]
    },
    {
      title: 'Staph-Like Test Anchors',
      columns: ['Problem', 'Tests/clues that help', 'How to use the result'],
      rows: [
        ['Separate Staphylococcus from Micrococcus-like organisms', 'Microdase/modified oxidase, bacitracin, furazolidone, lysostaphin, oxygen pattern', 'Use as a branch clue, not as a standalone species call'],
        ['Find S. aureus-like isolates', 'Coagulase, latex/rapid agglutination, DNase, colony morphology, hemolysis', 'Meaningful sites usually need prompt reporting and susceptibility follow-up'],
        ['Sort coagulase-negative UTI patterns', 'Novobiocin, urease, organism ID, urine source', 'S. saprophyticus stays high-yield for uncomplicated UTI questions'],
        ['Recognize device-associated CoNS', 'Repeat positive cultures, same organism pattern, sterile source, catheter/hardware history', 'Clinical significance increases with repeat recovery and compatible syndrome'],
        ['Catch inducible resistance', 'D-test logic when erythromycin/clindamycin pattern calls for it', 'A clindamycin-susceptible-looking result can be unsafe if inducible resistance is present']
      ]
    }
  ],
  'streptococcus-enterococcus-species-patterns': [
    {
      title: 'Expanded Streptococcus and Enterococcus Detail Table',
      columns: ['Organism/group', 'Bench lane', 'Clinical details students should keep', 'Resistance/reporting reminder'],
      rows: [
        ['S. pyogenes', 'Beta-hemolytic group A; PYR-positive study anchor', 'Pharyngitis, impetigo, cellulitis, erysipelas, necrotizing fasciitis, puerperal sepsis, scarlet fever, toxic shock-like syndrome, rheumatic fever, post-streptococcal glomerulonephritis', 'Penicillin remains a core anchor; macrolide/clindamycin resistance may affect alternatives'],
        ['S. agalactiae', 'Beta-hemolytic group B; CAMP and hippurate concepts', 'Neonatal sepsis/meningitis, pregnancy and genital tract screening context, UTI, wound, bacteremia, adult invasive disease', 'Penicillin/ampicillin concepts are common; testing may matter in allergy or invasive disease contexts'],
        ['Group C, F, and G beta-hemolytic streptococci', 'Beta hemolysis with grouping needed for clarity', 'Pharyngitis, wound infection, cellulitis, bacteremia, endocarditis, septic arthritis, and invasive disease in selected hosts', 'Do not assume all beta-hemolytic streptococci are group A or B'],
        ['S. pneumoniae', 'Alpha-hemolytic lane; optochin/bile solubility concept; capsule-associated pathogen', 'Pneumonia, otitis media, sinusitis, meningitis, bacteremia', 'Penicillin/cephalosporin interpretation depends on site and current breakpoints'],
        ['Viridans group streptococci', 'Alpha or nonhemolytic oral-flora lane; species groups vary', 'Dental caries, subacute endocarditis, neutropenic bacteremia, sterile-site infection, abscesses', 'Blood culture pattern and MIC can matter, especially in endocarditis'],
        ['Abiotrophia and Granulicatella', 'Nutritionally variant streptococci; special growth requirements', 'Endocarditis and bloodstream infection; may be missed by routine expectations', 'Often needs careful ID and susceptibility interpretation'],
        ['Enterococcus faecalis', 'Bile esculin positive, salt tolerant, PYR-positive Enterococcus lane', 'UTI, wound, intra-abdominal infection, bacteremia, endocarditis, device-associated infection', 'Intrinsic cephalosporin resistance; high-level aminoglycoside and vancomycin resistance questions matter'],
        ['Enterococcus faecium', 'Enterococcus lane; often more resistant than E. faecalis', 'Healthcare-associated UTI, bloodstream, wound, intra-abdominal, and device-associated infection', 'VRE and multidrug resistance are major study anchors'],
        ['Leuconostoc spp.', 'Can resemble other catalase-negative Gram-positive cocci/rods', 'Usually low significance but opportunistic infections can occur', 'Intrinsic vancomycin resistance is the classic trap'],
        ['Pediococcus spp.', 'Catalase-negative Gram-positive cocci that can confuse routine lanes', 'Rare opportunistic infection', 'Intrinsic vancomycin resistance concept'],
        ['Aerococcus spp.', 'Alpha-hemolytic or small-colony cocci; may be urine/blood context', 'UTI, bacteremia, endocarditis in selected patients', 'Species-level ID prevents confusion with streptococci'],
        ['Gemella spp.', 'Oral/upper respiratory flora-like catalase-negative cocci', 'Endocarditis or invasive infection rarely', 'Interpret by sterile source and repeated recovery']
      ]
    },
    {
      title: 'Hemolysis-to-Meaning Table',
      columns: ['Hemolysis lane', 'First organisms to think about', 'Best next question'],
      rows: [
        ['Large beta hemolysis', 'S. pyogenes, group C/G streptococci', 'What is the Lancefield group and does the syndrome fit pharyngitis, skin, wound, or invasive disease?'],
        ['Medium beta hemolysis', 'S. agalactiae', 'Is the patient pregnant, neonatal, genital/urine-associated, or an adult with invasive disease?'],
        ['Small beta hemolysis', 'Some anginosus-group or other beta-hemolytic streptococci', 'Could this be abscess, oral flora, or mixed infection context?'],
        ['Alpha hemolysis', 'S. pneumoniae or viridans group streptococci', 'Does optochin/bile logic and source point to pneumococcus or oral-flora/endocarditis logic?'],
        ['Nonhemolytic/gamma', 'Enterococcus, some viridans-like organisms, Leuconostoc/Pediococcus-like organisms', 'Do bile esculin, salt tolerance, PYR, source, and resistance profile fit Enterococcus?']
      ]
    }
  ],
  'bacillus-aerobic-spore-formers': [
    {
      title: 'Expanded Bacillus-Like Detail Table',
      columns: ['Organism/group', 'Bench clues', 'Disease/source anchors', 'What not to miss'],
      rows: [
        ['Bacillus anthracis', 'Large Gram-positive rods; nonhemolytic or suspicious colony pattern; safety-sensitive rule-out workflow', 'Anthrax forms include cutaneous, inhalational, gastrointestinal, injection-related, or systemic disease depending on exposure', 'Limit manipulation and escalate according to sentinel lab/public health policy'],
        ['Bacillus cereus group', 'Large spreading colonies, often beta-hemolytic; environmental spore-former', 'Food poisoning with emetic or diarrheal pattern; eye infections, wounds, bacteremia, and opportunistic infection', 'Foodborne toxin disease and invasive disease are different clinical questions'],
        ['B. thuringiensis-like organisms', 'B. cereus group overlap; colony and biochemical traits can be similar', 'Usually environmental, occasional opportunistic disease', 'Routine bench traits may not cleanly separate the group'],
        ['B. subtilis group', 'Large, rough or dry colonies; environmental spore-forming rod', 'Often contaminant; rare opportunistic sterile-site infection', 'Repeat recovery and source decide significance'],
        ['B. licheniformis, B. pumilus, B. circulans-like organisms', 'Variable colony texture, pigment, hemolysis, and growth patterns', 'Usually environmental, sometimes wound, catheter, or immunocompromised-host isolates', 'Do not over-identify without method support'],
        ['B. megaterium or B. mycoides-like organisms', 'Large colonies; B. mycoides may have rhizoid/fungal-like spreading', 'Environmental recovery, rare clinical relevance', 'Distinct colony morphology is not the same as clinical importance'],
        ['Brevibacillus spp.', 'Bacillus-like aerobic spore-forming rods', 'Usually environmental; rare opportunistic infection', 'May be reported by modern ID systems but still needs source interpretation'],
        ['Paenibacillus spp.', 'Bacillus-like environmental rods, sometimes spreading or granular colonies', 'Rare bacteremia, wound, or device-associated infection', 'Avoid dismissing repeated sterile-site recovery automatically']
      ]
    },
    {
      title: 'Bacillus Significance Ladder',
      columns: ['Signal', 'Leans contaminant', 'Leans meaningful'],
      rows: [
        ['Source', 'Single colony from superficial or mixed specimen', 'Blood culture pattern, sterile tissue, eye, deep wound, CNS, or device source'],
        ['Syndrome', 'No compatible symptoms', 'Food poisoning, anthrax-like exposure, keratitis, sepsis, wound infection, or immunocompromised host'],
        ['Repeat recovery', 'One low-level isolate', 'Same organism from multiple cultures or repeated specimens'],
        ['Safety pattern', 'No suspicious exposure or morphology', 'B. anthracis-compatible history, colony pattern, or public health concern'],
        ['Testing need', 'Likely environmental isolate only', 'Reference ID, susceptibility, toxin, or public health workflow is clinically needed']
      ]
    }
  ],
  'listeria-corynebacterium-coryneform-rods': [
    {
      title: 'Expanded Listeria and Coryneform Detail Table',
      columns: ['Organism/group', 'Bench clues', 'Clinical anchors', 'Student warning'],
      rows: [
        ['Listeria monocytogenes', 'Short Gram-positive rods/coccobacilli; catalase positive; tumbling or umbrella motility concept; narrow beta hemolysis can occur', 'Bacteremia, meningitis, neonatal infection, pregnancy-associated infection, foodborne exposure, disease in older or immunocompromised patients', 'Do not dismiss short rods in blood or CSF as harmless diphtheroids'],
        ['Corynebacterium diphtheriae complex', 'Pleomorphic rods, palisades or Chinese-letter arrangements; special media/toxin-aware workflow', 'Respiratory diphtheria, pseudomembrane disease, cutaneous diphtheria', 'Toxin testing/public health handling matters; ID alone is not the full answer'],
        ['Corynebacterium ulcerans and C. pseudotuberculosis', 'Diphtheria-like coryneform organisms; zoonotic exposure may be relevant', 'Diphtheria-like illness, lymphadenitis, animal-associated infection', 'Ask about animal exposure and toxin-related workflow when appropriate'],
        ['Corynebacterium jeikeium', 'Coryneform rod; often hospital/device-associated context; may be multidrug resistant', 'Bacteremia, catheter infection, endocarditis, immunocompromised host disease', 'Repeated sterile-site recovery is not automatically contamination'],
        ['Corynebacterium urealyticum', 'Coryneform rod with strong urease/urinary context', 'UTI, alkaline urine, encrusted cystitis/pyelitis in selected patients', 'Urine source plus urease concept makes this more than generic diphtheroid'],
        ['Corynebacterium striatum', 'Coryneform skin/mucosal organism; increasingly recognized in hospital settings', 'Respiratory, wound, bloodstream, device, and immunocompromised-host infection', 'May be clinically meaningful when predominant or repeatedly isolated'],
        ['Corynebacterium amycolatum', 'Coryneform organism, sometimes device/skin flora context', 'Bacteremia, wound, endocarditis, pneumonia, opportunistic disease', 'Species-level ID and susceptibility may matter in hospital isolates'],
        ['Corynebacterium minutissimum', 'Coryneform rod associated with superficial skin disease', 'Erythrasma and superficial skin infection', 'Clinical syndrome is dermatologic more than routine invasive disease'],
        ['Leifsonia aquatica', 'Environmental/freshwater-associated coryneform-like rod', 'Rare opportunistic bacteremia or septicemia', 'Usually uncommon; interpret source carefully'],
        ['Dermabacter hominis', 'Coccobacillary coryneform-like organism from skin', 'Rare opportunistic skin, wound, or bloodstream infection', 'Can be mistaken for ordinary diphtheroids'],
        ['Turicella otitidis', 'Coryneform-like organism linked to ear specimens', 'Otitis media association reported', 'Ear source gives the name clinical context'],
        ['Brevibacterium, Kurthia, Arthrobacter, Microbacterium-like organisms', 'Environmental or skin-associated coryneform-like organisms', 'Usually low significance; occasional opportunistic infections', 'Modern ID may name them, but source still decides meaning']
      ]
    },
    {
      title: 'Coryneform Morphology and Colony Cues',
      columns: ['Cue', 'How students should read it', 'Pitfall'],
      rows: [
        ['Palisades or Chinese-letter forms', 'Supports coryneform/diphtheroid-like branch', 'Does not prove C. diphtheriae by itself'],
        ['Short rods or coccobacilli', 'Can fit Listeria or coryneforms depending on context', 'Blood/CSF Listeria risk can be missed if everything is called diphtheroid'],
        ['Dry, waxy, sticky, or adherent colonies', 'Can occur with several coryneform organisms', 'Colony texture is a clue, not a final ID'],
        ['Urease-positive urinary isolate', 'Raises C. urealyticum-type thinking in the right patient', 'Do not apply this clue to every coryneform isolate'],
        ['Repeated sterile-site recovery', 'Raises clinical significance', 'A skin-flora label should not override compatible disease']
      ]
    }
  ],
  'catalase-negative-nonsporeforming-rods': [
    {
      title: 'Expanded Catalase-Negative Rod Detail Table',
      columns: ['Organism/group', 'High-yield clues', 'Source/disease anchors', 'Common interpretation trap'],
      rows: [
        ['Erysipelothrix rhusiopathiae', 'Catalase-negative Gram-positive rod; H2S concept; animal/fish/meat exposure; may be nonmotile', 'Erysipeloid skin lesion, cellulitis, bacteremia, endocarditis, occupational exposure', 'Missing exposure history and confusing it with other Gram-positive rods'],
        ['Arcanobacterium haemolyticum', 'Can be beta-hemolytic; pharyngitis and skin/soft tissue lane', 'Pharyngitis-like illness, wound infection, cellulitis, skin lesions', 'Confusing with beta-hemolytic streptococci or diphtheroids'],
        ['Arcanobacterium pyogenes-like organisms', 'Animal-associated pyogenic infection context', 'Wound or soft tissue infection after animal contact; uncommon human disease', 'Overcalling without exposure or clinical fit'],
        ['Gardnerella vaginalis', 'Gram-variable/coccobacillary vaginal ecology organism; clue-cell context belongs elsewhere in the site workflow', 'Bacterial vaginosis; rare bacteremia or invasive disease', 'Treating every recovery as invasive infection'],
        ['Lactobacillus spp.', 'Gram-positive rods, often normal oral/GI/vaginal flora; catalase negative; vancomycin resistance may be intrinsic in some contexts', 'Usually colonization or contamination; rare bacteremia/endocarditis in selected hosts', 'Calling normal flora disease without sterile-site or host support'],
        ['Leuconostoc spp.', 'Catalase-negative Gram-positive cocci/rods; intrinsic vancomycin resistance concept', 'Rare opportunistic bloodstream or device-associated infection', 'Misreading intrinsic vancomycin resistance as unexpected acquired resistance'],
        ['Pediococcus spp.', 'Catalase-negative Gram-positive cocci often confused with Enterococcus-like lanes', 'Rare opportunistic infection', 'Vancomycin resistance can be intrinsic'],
        ['Aerococcus and Gemella overlap', 'Catalase-negative cocci that may enter the Strep-like differential', 'UTI, bacteremia, endocarditis in selected patients', 'Needing ID support instead of relying on morphology alone']
      ]
    },
    {
      title: 'Exposure and Site Anchors',
      columns: ['Anchor', 'Organisms it points toward', 'How to use it'],
      rows: [
        ['Fish, meat, animal handling, puncture wound', 'Erysipelothrix', 'Ask about occupational or food-animal exposure when the organism and skin lesion fit'],
        ['Pharyngitis plus unusual Gram-positive rod/coccus clues', 'Arcanobacterium haemolyticum', 'Consider it when beta-hemolytic strep logic does not fully explain the isolate'],
        ['Vaginal specimen with bacterial vaginosis context', 'Gardnerella and Lactobacillus community patterns', 'Interpret as ecology/syndrome, not a routine sterile-site pathogen list'],
        ['Blood culture in immunocompromised host', 'Lactobacillus, Leuconostoc, Pediococcus, other low-virulence organisms', 'Repeat recovery and host risk raise significance'],
        ['Vancomycin-resistant Gram-positive organism that is not Enterococcus', 'Leuconostoc/Pediococcus/Lactobacillus-like possibilities', 'Think intrinsic resistance before assuming VRE']
      ]
    }
  ],
  'aerobic-actinomycetes': [
    {
      title: 'Expanded Aerobic Actinomycete Detail Table',
      columns: ['Organism/group', 'Morphology or stain clue', 'Clinical/source anchors', 'Study warning'],
      rows: [
        ['Nocardia spp.', 'Branching, delicate Gram-positive filaments; often partially/weakly acid-fast by modified methods', 'Pulmonary disease, CNS dissemination, brain abscess, skin/soft tissue infection, mycetoma-like disease, immunocompromised host', 'Species and susceptibility matter; do not stop at "Nocardia-like" when disease is serious'],
        ['Nocardia asteroides complex-type organisms', 'Nocardia-like modified acid-fast branching rods', 'Pulmonary and disseminated disease are classic study anchors', 'Taxonomy changes; learn the clinical pattern rather than only old names'],
        ['Rhodococcus spp.', 'Coccobacillary to diphtheroid-like rods; may be weakly acid-fast; salmon-pink colonies may occur', 'Pulmonary infection, bacteremia, catheter-associated sepsis, wound infection, immunocompromised host disease', 'Can be mistaken for diphtheroids or contaminants'],
        ['Gordonia spp.', 'Mycolic-acid-containing Gram-positive rods; variable weak acid-fastness', 'Catheter-associated bacteremia, wound infection, skin/soft tissue infection', 'Often needs modern ID methods for confidence'],
        ['Tsukamurella spp.', 'Long rods, mycolic-acid-containing, sometimes weakly acid-fast', 'Catheter-associated sepsis, peritonitis, wound infection', 'Do not force into Nocardia or Mycobacterium automatically'],
        ['Streptomyces spp.', 'Extensive branching filaments; aerial hyphae-like colony texture; usually non-acid-fast', 'Environmental exposure, mycetoma-like disease, rare invasive infection', 'Environmental recovery does not always mean disease'],
        ['Actinomadura spp.', 'Branching actinomycete; non-acid-fast or variable depending on method', 'Mycetoma-like skin/subcutaneous disease in tropical/subtropical exposure contexts', 'Exposure and chronic lesion history matter'],
        ['Dermatophilus spp.', 'Branching filaments with transverse/longitudinal division; animal-associated context', 'Zoonotic skin infection after animal exposure', 'Morphology can look unusual; exposure is a clue'],
        ['Nocardiopsis spp.', 'Branching aerobic actinomycete; environmental', 'Rare opportunistic infection', 'Clinical significance is uncommon and source-dependent'],
        ['Oerskovia-like organisms', 'Branching rods that may fragment; environmental', 'Rare catheter or opportunistic infection', 'May need reference-level identification']
      ]
    },
    {
      title: 'Actinomycete Branch Questions',
      columns: ['Question', 'Points toward', 'Why it matters'],
      rows: [
        ['Is it partially acid-fast?', 'Nocardia, Rhodococcus, Gordonia, Tsukamurella, and related mycolic-acid-containing organisms', 'Modified acid-fast behavior changes the differential'],
        ['Is the source lung, brain, skin, or catheter?', 'Nocardia for lung/CNS/skin; Gordonia/Tsukamurella/Rhodococcus for catheter or opportunistic patterns', 'Source prevents overcalling contaminants or missing pathogens'],
        ['Is the host immunocompromised?', 'Nocardia, Rhodococcus, Gordonia, Tsukamurella, and other opportunists become more important', 'Low-virulence organisms can become real disease'],
        ['Is there soil, thorn, trauma, or animal exposure?', 'Streptomyces, Actinomadura, Dermatophilus, Nocardia', 'Exposure links environmental organisms to disease'],
        ['Is there chronic draining lesion or mycetoma-like disease?', 'Nocardia, Actinomadura, Streptomyces and related actinomycetes', 'Chronic pattern is more informative than a single reaction']
      ]
    }
  ],
  'media-selection-patterns': [
    {
      title: 'Expanded Media Detail Table',
      columns: ['Medium or medium group', 'What it is trying to do', 'Organisms/study uses', 'Interpretation trap'],
      rows: [
        ['Blood agar', 'Broad recovery plus hemolysis reading', 'Staphylococcus, Streptococcus, many Gram-positive rods, many Gram-negative organisms', 'Hemolysis is a branch clue, not species ID'],
        ['Chocolate agar', 'Enriched recovery after lysed blood releases growth factors', 'Haemophilus, pathogenic Neisseria, fastidious respiratory organisms', 'Better growth on chocolate can signal fastidious needs'],
        ['MacConkey agar', 'Selects many Gram-negative rods and differentiates lactose reaction', 'Enterobacterales, some nonfermenters', 'No growth can mean inhibited, fastidious, Gram-positive, anaerobe, or wrong conditions'],
        ['Mannitol salt agar', 'High salt selects staphylococci and mannitol reaction can help sorting', 'Staphylococcus aureus study workflow and Staph-like separation', 'Mannitol reaction alone does not replace ID'],
        ['Bile esculin agar', 'Detects esculin hydrolysis in bile-containing setting', 'Enterococcus, group D streptococci-like logic', 'Positive reactions need salt tolerance/source context'],
        ['CNA or PEA agar', 'Suppresses many Gram-negative rods to help Gram-positive recovery', 'Staph, Strep, Enterococcus, coryneforms, anaerobe support depending on formula', 'Suppression is not perfect and plate purpose varies by lab'],
        ['BCYE agar', 'Supports Legionella with cysteine/iron requirements', 'Legionella workup from respiratory/environmental questions', 'Routine blood/chocolate expectations can miss Legionella'],
        ['Regan-Lowe or Bordet-Gengou-type media', 'Special recovery for Bordetella', 'Pertussis culture workflows', 'NAAT and culture answer different questions'],
        ['Campylobacter selective media', 'Selective recovery under microaerophilic conditions', 'Campylobacter-like enteritis workflows', 'Atmosphere and temperature are part of the method'],
        ['CIN agar', 'Selective/differential support for Yersinia-type stool workup', 'Yersinia enterocolitica when clinically suspected', 'Do not use as a generic enteric plate'],
        ['TCBS agar', 'Selective/differential support for Vibrio-type organisms', 'Vibrio cholerae and related Vibrio workup', 'Exposure and stool/wound/source history matter'],
        ['Thayer-Martin or modified Thayer-Martin', 'Suppresses background flora while supporting pathogenic Neisseria', 'N. gonorrhoeae/N. meningitidis depending on source', 'Transport and incubation conditions affect recovery'],
        ['Thioglycollate broth', 'Enrichment and oxygen-gradient support', 'Low-number organisms, mixed oxygen tolerance, sterile body fluid backup', 'Growth in broth needs subculture and source interpretation'],
        ['Selenite or other enteric enrichment broths', 'Enhances selected enteric pathogens before plating', 'Salmonella-like stool workflows', 'Enrichment is not final ID']
      ]
    }
  ],
  'antibacterial-drug-class-map': [
    {
      title: 'Drug Class Detail Rows',
      columns: ['Drug class', 'Main action idea', 'Common study spectrum', 'Resistance concept to attach'],
      rows: [
        ['Penicillins and cephalosporins', 'Bind PBPs and disrupt peptidoglycan cross-linking', 'Spectrum varies widely by agent and generation', 'Beta-lactamases, altered PBPs, permeability, and efflux'],
        ['Carbapenems', 'Broad beta-lactam class with strong Gram-negative and anaerobe activity depending on organism', 'Important for serious resistant Gram-negative infections but not universal', 'Carbapenemases, porin loss, and efflux patterns'],
        ['Monobactam aztreonam', 'Beta-lactam with narrow Gram-negative aerobic rod emphasis', 'Useful conceptually for aerobic Gram-negative rods', 'ESBL/AmpC/carbapenemase-like mechanisms can affect it'],
        ['Glycopeptides', 'Bind cell-wall precursor and block wall synthesis', 'Gram-positive organisms; not useful for routine Gram-negative rods', 'Altered target precursors and intrinsic resistance in some genera'],
        ['Aminoglycosides', 'Bind 30S and require oxygen-dependent uptake', 'Aerobic Gram-negative rods and selected synergy contexts', 'Modifying enzymes, target changes, poor anaerobe activity'],
        ['Tetracyclines/glycylcyclines', 'Bind 30S and block protein synthesis', 'Broad but agent-specific activity', 'Efflux and ribosomal protection'],
        ['Macrolides and clindamycin', 'Bind 50S and interfere with protein synthesis', 'Selected Gram-positive and atypical/anaerobic contexts depending on drug', 'Target methylation and inducible clindamycin resistance'],
        ['Oxazolidinones', 'Block initiation at 50S ribosomal target', 'Resistant Gram-positive organisms in selected contexts', 'Target modification or ribosomal mutations'],
        ['Fluoroquinolones', 'Inhibit DNA gyrase/topoisomerase activity', 'Agent-specific Gram-negative, Gram-positive, respiratory, or urinary use', 'Target mutations, efflux, and plasmid-mediated mechanisms'],
        ['Rifamycins', 'Inhibit DNA-dependent RNA polymerase', 'Mycobacteria and selected combination-therapy uses', 'Resistance develops quickly if used improperly alone'],
        ['Polymyxins', 'Disrupt Gram-negative outer membrane', 'Selected multidrug-resistant Gram-negative rods', 'Lipid A modification and intrinsic resistance in some groups'],
        ['Daptomycin', 'Disrupts Gram-positive cell membrane function', 'Selected Gram-positive bacteremia/skin contexts', 'Not used for pneumonia because surfactant inactivates it'],
        ['Sulfonamides and trimethoprim', 'Block sequential folate-pathway steps', 'Urinary, respiratory, skin, and selected opportunistic infection contexts depending on organism', 'Altered enzymes, bypass, and acquisition of resistant targets'],
        ['Nitrofurantoin', 'Multiple bacterial injury mechanisms after activation', 'Urinary tract-focused use', 'Limited tissue use; organism and site matter']
      ]
    }
  ],
  'intrinsic-resistance-patterns': [
    {
      title: 'Expanded Intrinsic Resistance Examples',
      columns: ['Organism/group', 'Natural resistance pattern', 'Mechanism idea', 'Study warning'],
      rows: [
        ['Anaerobes', 'Aminoglycosides', 'Poor uptake without oxidative metabolism', 'Aminoglycosides are not standalone anaerobe drugs'],
        ['Gram-negative rods', 'Vancomycin', 'Outer membrane prevents useful access', 'Vancomycin is a Gram-positive concept in routine bacteriology'],
        ['Gram-positive organisms', 'Aztreonam', 'Drug target/spectrum does not fit', 'Do not apply aztreonam broadly just because it is a beta-lactam'],
        ['Enterococcus spp.', 'Cephalosporins', 'PBPs are not effectively inhibited', 'Cephalosporin activity is unreliable even if the panel seems tempting'],
        ['Klebsiella spp.', 'Ampicillin', 'Natural beta-lactamase activity', 'Ampicillin resistance is expected'],
        ['Aerobic bacteria', 'Metronidazole', 'Drug activation favors anaerobic conditions', 'Metronidazole is not a general aerobic bacterial drug'],
        ['Lactobacillus/Leuconostoc/Pediococcus-like organisms', 'Vancomycin', 'Cell-wall target biology creates poor activity', 'Intrinsic resistance can mimic an alarming acquired phenotype'],
        ['Stenotrophomonas maltophilia', 'Carbapenems and many beta-lactams', 'Intrinsic beta-lactamases and permeability patterns', 'Carbapenem resistance is part of the organism identity'],
        ['Pseudomonas aeruginosa', 'Many narrow agents', 'Low permeability and efflux-prone envelope', 'Choose organism-appropriate anti-pseudomonal agents'],
        ['Mycoplasma/Ureaplasma', 'Cell-wall active drugs', 'No classic peptidoglycan cell wall', 'Beta-lactams do not fit organisms without the target']
      ]
    }
  ],
  'ast-test-selection-logic': [
    {
      title: 'Organism-Group AST Selection Anchors',
      columns: ['Organism group', 'Testing setup idea', 'Drug-panel logic', 'Special attention'],
      rows: [
        ['Enterobacterales', 'Standardized AST methods commonly apply', 'Broad Gram-negative panel selected by source and policy', 'ESBL, AmpC, carbapenemase, and suppression rules'],
        ['Pseudomonas aeruginosa', 'Method and drug selection must be anti-pseudomonal', 'Avoid drugs that do not have useful anti-pseudomonal activity', 'Resistance can emerge and profiles may be multidrug-resistant'],
        ['Staphylococcus spp.', 'Standardized methods with methicillin-resistance logic', 'Oxacillin/cefoxitin surrogate concepts, vancomycin, clindamycin/D-test logic when appropriate', 'MRSA, reduced vancomycin susceptibility, inducible clindamycin resistance'],
        ['Enterococcus spp.', 'Testing and reporting differ from streptococci', 'Ampicillin, vancomycin, high-level aminoglycoside synergy screens depending on context', 'VRE and intrinsic cephalosporin resistance'],
        ['S. pneumoniae', 'Fastidious conditions and site-specific interpretation', 'Penicillin/ceftriaxone and respiratory agents depend on syndrome', 'Meningitis versus non-meningitis breakpoint thinking'],
        ['Viridans group streptococci', 'MIC methods often matter for invasive/endocarditis questions', 'Penicillin/ceftriaxone and selected alternatives', 'Endocarditis therapy decisions may need precise MICs'],
        ['Neisseria gonorrhoeae', 'Specialized methods and public health relevance', 'Ceftriaxone and selected agents by current guidance', 'Resistance surveillance and exact method requirements matter'],
        ['Anaerobes', 'Specialized anaerobic methods when needed', 'Beta-lactam/beta-lactamase inhibitor, carbapenem, metronidazole, clindamycin, and others by group/site', 'Routine panels do not replace anaerobe-specific guidance'],
        ['Fastidious Gram-negative rods', 'Supplemented media/CO2 or reference methods may be required', 'Panel depends on organism and syndrome', 'Do not force routine Enterobacterales logic'],
        ['Infrequently isolated or unusual organisms', 'Reference or validated specialized methods may be needed', 'Report only when interpretation is valid', 'Consult current standards or reference lab guidance']
      ],
      note: 'This table is for study logic only. Current CLSI/FDA breakpoints, validated methods, and local reporting rules control final AST reporting.'
    },
    {
      title: 'Resistance Profiles That Should Trigger a Pause',
      columns: ['Pattern', 'Why it matters', 'Learner action'],
      rows: [
        ['Staphylococcus with methicillin resistance', 'Changes beta-lactam expectations and infection control language', 'Check MRSA/MR-CoNS logic and reporting rules'],
        ['Staphylococcus erythromycin-resistant but clindamycin-susceptible pattern', 'May hide inducible clindamycin resistance', 'Think D-test when criteria fit'],
        ['Enterococcus with vancomycin resistance', 'Major therapy and infection prevention issue', 'Think VRE and species-level context'],
        ['Enterobacterales with carbapenem resistance', 'May represent carbapenemase or combined mechanisms', 'Escalate by lab algorithm and public health rules'],
        ['Pseudomonas with aminoglycoside or fluoroquinolone resistance', 'Can leave limited options in serious infection', 'Review full profile and method validity'],
        ['Stenotrophomonas resistant to expected options', 'Therapy choices are already limited', 'Do not apply Pseudomonas or Enterobacterales assumptions'],
        ['Neisseria gonorrhoeae decreased cephalosporin susceptibility', 'Public health concern', 'Follow specialized confirmatory and reporting workflow']
      ]
    }
  ]
};

export const getExpandedDetailTablesForSlug = (slug: string) => previousBatchDetailTables[slug];

export const expandedLearnTopics: LearnTopic[] = baseExpandedLearnTopics.map((topic) => {
  const detailTables = previousBatchDetailTables[topic.slug];

  if (!detailTables) {
    return topic;
  }

  return {
    ...topic,
    tables: [...(topic.tables ?? []), ...detailTables]
  };
});
