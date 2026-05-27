import { expandedLearnTopics, getExpandedDetailTablesForSlug } from './learnExpansionTopics';

export type LearnTopic = {
  slug: string;
  title: string;
  category:
    | 'Foundations'
    | 'Clinical Lab Principles'
    | 'Core Methods'
    | 'Bacteriology'
    | 'Mycology'
    | 'Parasitology'
    | 'Virology'
    | 'Molecular and Immunodiagnostics'
    | 'Bench and Exam Integration';
  summary: string;
  whyItMatters: string;
  principle: string;
  basicSteps: string[];
  interpretation: string[];
  commonMistakes: string[];
  studentShortcut: string;
  relatedLinks: Array<{
    label: string;
    path: string;
  }>;
  tables?: LearnTopicTable[];
  keywords: string[];
};

export type LearnTopicTable = {
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

const coreLearnTopics: LearnTopic[] = [
  {
    slug: 'microbial-taxonomy',
    title: 'Microbial Taxonomy',
    category: 'Foundations',
    summary: 'Microbial taxonomy explains how organisms are named, grouped, and related so students can understand why identification systems use genus, species, phenotype, and genetic relationships.',
    whyItMatters: 'Taxonomy gives structure to the organism list. Without it, names feel random and identification tables become harder to remember.',
    principle: 'Clinical microbiology uses classification to organize organisms, but patient care depends on linking the name to source, syndrome, and clinical significance.',
    basicSteps: [
      'Recognize the broad group: bacteria, fungi, viruses, parasites, or other agents.',
      'Use genus and species names as the standard organism label.',
      'Understand that taxonomy can change as genetic methods improve.',
      'Separate taxonomic identity from clinical significance.',
      'Use current lab naming conventions in reports and study notes.'
    ],
    interpretation: [
      'Genus groups related organisms, while species narrows the identity.',
      'A new name may describe the same organism students learned under an older name.',
      'Identification systems may report different confidence levels depending on method and database.'
    ],
    commonMistakes: [
      'Memorizing names without knowing the larger group.',
      'Assuming a name alone tells whether the organism is a pathogen.',
      'Missing older synonyms that still appear in books, exams, and lab conversations.'
    ],
    studentShortcut: 'Taxonomy is the map. Clinical context tells you whether the map location matters.',
    relatedLinks: [
      { label: 'Clinical Microbiology Overview', path: '/learn/clinical-microbiology' },
      { label: 'Principles of Bacterial Identification', path: '/learn/bacterial-identification-principles' },
      { label: 'Global Search', path: '/search' }
    ],
    tables: [
      {
        title: 'Taxonomy Terms',
        columns: ['Term', 'Meaning', 'Study use'],
        rows: [
          ['Genus', 'A group of closely related organisms', 'Helps organize branches such as Staphylococcus or Streptococcus'],
          ['Species', 'A more specific organism identity', 'Connects to clinical patterns and reporting'],
          ['Strain', 'A subtype or isolate within a species', 'May matter for outbreaks, virulence, or resistance'],
          ['Phenotype', 'Observable traits such as morphology or reactions', 'Useful for bench identification'],
          ['Genotype', 'Genetic features or sequence relationships', 'Useful for modern identification and epidemiology']
        ]
      }
    ],
    keywords: ['microbial taxonomy', 'genus', 'species', 'classification', 'nomenclature', 'phenotype', 'genotype']
  },
  {
    slug: 'bacterial-structure-genetics-metabolism',
    title: 'Bacterial Structure, Genetics, and Metabolism',
    category: 'Foundations',
    summary: 'Bacterial structure, genetics, and metabolism explain why organisms stain differently, grow on different media, cause disease, and respond differently to antimicrobials.',
    whyItMatters: 'Many bench clues come from basic biology: cell wall structure, oxygen use, metabolic enzymes, plasmids, spores, capsules, pili, and toxins.',
    principle: "The organism's structure and genes create observable lab patterns. Those patterns become Gram stain results, colony features, biochemical reactions, and resistance phenotypes.",
    basicSteps: [
      'Start with cell wall type and Gram stain behavior.',
      'Connect oxygen tolerance to growth conditions.',
      'Use metabolic reactions to understand biochemical tests.',
      'Recognize structures linked to virulence, such as capsules, pili, toxins, and spores.',
      'Connect genetic exchange to resistance and outbreak patterns.'
    ],
    interpretation: [
      'Peptidoglycan and outer membrane differences help explain Gram stain and drug behavior.',
      'Fermentation and respiration patterns drive many bench reactions.',
      'Plasmids, transposons, and mutations can change resistance or virulence.'
    ],
    commonMistakes: [
      'Learning biochemical tests as isolated facts.',
      'Forgetting that oxygen tolerance affects recovery.',
      'Separating resistance genes from the structures or targets they affect.'
    ],
    studentShortcut: 'If a reaction seems random, ask what structure, enzyme, or gene could explain it.',
    relatedLinks: [
      { label: 'Gram Stain', path: '/learn/gram-stain' },
      { label: 'Culture Media', path: '/learn/culture-media' },
      { label: 'Antimicrobial Resistance Mechanisms', path: '/learn/antimicrobial-resistance-mechanisms' }
    ],
    tables: [
      {
        title: 'Structure-to-Bench Clues',
        columns: ['Feature', 'What it affects', 'Bench clue'],
        rows: [
          ['Peptidoglycan thickness', 'Gram stain retention', 'Gram-positive versus Gram-negative pattern'],
          ['Outer membrane', 'Drug permeability and endotoxin concept', 'Gram-negative behavior and resistance patterns'],
          ['Capsule', 'Immune evasion and virulence', 'Mucoid colonies or capsule-associated disease'],
          ['Spores', 'Environmental survival', 'Spore-forming rod branches'],
          ['Plasmids', 'Gene transfer', 'Resistance or virulence traits that can spread']
        ]
      }
    ],
    keywords: ['bacterial structure', 'bacterial genetics', 'metabolism', 'cell wall', 'peptidoglycan', 'plasmid', 'spores', 'capsule']
  },
  {
    slug: 'host-microorganism-interactions',
    title: 'Host-Microorganism Interactions',
    category: 'Foundations',
    summary: 'Host-microorganism interactions explain colonization, infection, normal flora, opportunistic disease, immune response, and why the same organism can mean different things in different patients.',
    whyItMatters: 'Students need this foundation before interpreting cultures. A culture result is not automatically infection, and normal flora is not automatically meaningless.',
    principle: 'Disease depends on organism factors, host defenses, inoculum, site, and timing. The lab result must be read with the patient context.',
    basicSteps: [
      'Identify whether the organism is expected flora at that body site.',
      'Consider host risk factors such as age, immune status, devices, pregnancy, or wounds.',
      'Decide whether the specimen source is sterile or nonsterile.',
      'Connect virulence factors to likely disease patterns.',
      'Interpret growth amount, purity, and repeat isolation carefully.'
    ],
    interpretation: [
      'Colonization means organism presence without tissue invasion or disease.',
      'Opportunistic pathogens matter more when host defenses or barriers are altered.',
      'Sterile-site isolates usually carry more significance than superficial-site isolates.'
    ],
    commonMistakes: [
      'Calling all normal flora contamination.',
      'Ignoring devices, neutropenia, pregnancy, age, and immune status.',
      'Forgetting that site changes significance.'
    ],
    studentShortcut: 'Ask three things: where was it found, who is the patient, and does it fit the syndrome?',
    relatedLinks: [
      { label: 'Specimen Quality', path: '/learn/specimen-quality' },
      { label: 'Specimen Collection and Transport', path: '/learn/specimen-collection-transport' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' }
    ],
    tables: [
      {
        title: 'Colonization Versus Infection',
        columns: ['Pattern', 'Leans colonization', 'Leans infection'],
        rows: [
          ['Specimen source', 'Nonsterile site with mixed flora', 'Sterile site or deep specimen'],
          ['Host context', 'Healthy host without symptoms', 'Immunocompromised host or compatible syndrome'],
          ['Culture pattern', 'Mixed low-significance growth', 'Predominant or repeated isolate'],
          ['Inflammation', 'Little evidence of inflammatory response', 'Cells, symptoms, imaging, or direct exam support infection']
        ]
      }
    ],
    keywords: ['host microorganism interactions', 'colonization', 'infection', 'normal flora', 'opportunistic infection', 'virulence', 'immune response']
  },
  {
    slug: 'clinical-microbiology',
    title: 'Clinical Microbiology Basics',
    category: 'Clinical Lab Principles',
    summary: 'Clinical microbiology uses specimens, microscopy, culture, antigen tests, serology, and molecular methods to connect a patient problem with a likely infectious cause.',
    whyItMatters: 'New learners often memorize organisms first. The bench usually starts with the specimen, the direct exam, and the safest next method.',
    principle: 'Every result is interpreted with specimen source, collection quality, timing, and clinical syndrome. The same organism can be a pathogen, colonizer, or contaminant depending on context.',
    basicSteps: [
      'Start with the specimen source and collection quality.',
      'Look for direct clues: Gram stain, wet mount, AFB stain, antigen, or molecular result.',
      'Choose culture conditions or nonculture testing based on the syndrome.',
      'Use colony morphology and first-pass tests to build the identification path.',
      'Escalate when safety, slow growth, or special methods matter.'
    ],
    interpretation: [
      'Sterile-site growth usually carries more weight than superficial-site growth.',
      'A poor specimen can make a good test misleading.',
      'Culture-negative does not always mean infection-negative.'
    ],
    commonMistakes: [
      'Jumping to organism names before checking specimen quality.',
      'Using routine culture logic for AFB, intracellular agents, or high-risk organisms.',
      'Ignoring whether the result fits the clinical syndrome.'
    ],
    studentShortcut: 'Think in this order: specimen, safety, direct clue, culture condition, first branch test.',
    relatedLinks: [
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' },
      { label: 'Syndrome to Diagnostic Path', path: '/syndrome-diagnostic-path' },
      { label: 'Certification Study Paths', path: '/certification-study-paths' }
    ],
    tables: [
      {
        title: 'Bench Reading Order',
        columns: ['Step', 'Question to answer', 'What it changes'],
        rows: [
          ['1', 'Is the specimen acceptable?', 'Whether the result can be trusted'],
          ['2', 'Is there an immediate safety issue?', 'Whether to stop, escalate, or use special handling'],
          ['3', 'What does the direct exam show?', 'First branch: stain reaction, morphology, cells, burden'],
          ['4', 'What grew, and where did it grow?', 'Culture condition, colony type, and likely organism group'],
          ['5', 'Which first test separates the branch?', 'Catalase, oxidase, coagulase, indole, urease, or other key split']
        ]
      }
    ],
    keywords: ['clinical microbiology', 'microbiology basics', 'medical microbiology', 'bench workflow', 'specimen', 'culture', 'identification']
  },
  {
    slug: 'laboratory-safety',
    title: 'Laboratory Safety',
    category: 'Clinical Lab Principles',
    summary: 'Laboratory safety protects the learner, the bench, the patient, and the community through standard precautions, containment, exposure response, and recognition of high-risk situations.',
    whyItMatters: 'Safety is not separate from identification. Some organisms should change how much manipulation happens and who needs to be notified.',
    principle: 'Use the lowest-risk workflow that still answers the clinical question. When a high-consequence organism is possible, stop routine manipulation and follow escalation policy.',
    basicSteps: [
      'Use standard precautions and appropriate PPE.',
      'Match work practices to aerosol, splash, sharps, and culture risks.',
      'Use biosafety cabinets and engineering controls when indicated.',
      'Recognize organisms and syndromes that require escalation.',
      'Report exposures, spills, or unsafe specimens promptly.'
    ],
    interpretation: [
      'Small Gram-negative coccobacilli from blood culture can be a safety signal.',
      'AFB concern changes specimen processing and aerosol precautions.',
      'Routine culture may be inappropriate for select agents or hard-to-culture intracellular agents.'
    ],
    commonMistakes: [
      'Treating safety as a checklist instead of a decision point.',
      'Continuing bench manipulation after a suspicious pattern appears.',
      'Forgetting that exposure response is time-sensitive.'
    ],
    studentShortcut: 'When the pattern feels unusual or high-risk, pause before doing more.',
    relatedLinks: [
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Specimen Collection and Transport', path: '/learn/specimen-collection-transport' }
    ],
    tables: [
      {
        title: 'Safety Decision Points',
        columns: ['Situation', 'Safety thought', 'Typical next move'],
        rows: [
          ['Possible MTB or AFB-positive respiratory specimen', 'Aerosol and containment risk', 'Use AFB workflow and local biosafety policy'],
          ['Tiny Gram-negative coccobacilli from sterile site', 'High-consequence organisms can look subtle', 'Limit manipulation and escalate'],
          ['Large spore-forming Gram-positive rod with suspicious history', 'Consider Bacillus anthracis rule-out logic', 'Notify and follow sentinel lab policy'],
          ['Spill, splash, or sharps injury', 'Exposure response matters immediately', 'Report, clean, document, and seek occupational health guidance']
        ]
      }
    ],
    keywords: ['laboratory safety', 'biosafety', 'ppe', 'standard precautions', 'exposure', 'sentinel laboratory', 'bsl']
  },
  {
    slug: 'approaches-diagnosis-infectious-diseases',
    title: 'Approaches to Diagnosis of Infectious Diseases',
    category: 'Clinical Lab Principles',
    summary: 'Diagnosis of infectious diseases uses a method strategy: direct exam, culture, antigen detection, serology, molecular testing, susceptibility testing, or referral.',
    whyItMatters: 'Students often ask which test is best. The better first question is what clinical problem the test is supposed to answer.',
    principle: 'The best diagnostic approach depends on syndrome, specimen, organism biology, timing, safety, and whether the goal is detection, identification, immune response, or therapy guidance.',
    basicSteps: [
      'Start with the syndrome and likely specimen source.',
      'Decide whether the question is organism detection, host response, identification, or susceptibility.',
      'Choose direct exam, culture, antigen, serology, NAAT, or referral testing.',
      'Check timing because early, late, acute, and convalescent samples answer different questions.',
      'Interpret negative results with method limits in mind.'
    ],
    interpretation: [
      'Culture is useful when viable organisms need recovery and susceptibility testing.',
      'NAAT is useful when rapid detection or hard-to-culture organisms are suspected.',
      'Serology is often about immune response and timing, not immediate organism recovery.'
    ],
    commonMistakes: [
      'Using routine culture for organisms better detected by NAAT or serology.',
      'Ignoring specimen timing.',
      'Treating every positive molecular result as active disease without context.'
    ],
    studentShortcut: 'Pick the method by the question: see it, grow it, detect it, prove exposure, or guide therapy.',
    relatedLinks: [
      { label: 'Clinical Microbiology Overview', path: '/learn/clinical-microbiology' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Diagnostic Method Map',
        columns: ['Method', 'Best answers', 'Common limit'],
        rows: [
          ['Direct microscopy or stain', 'What is present right now in the specimen?', 'Sensitivity and interpretation depend on specimen quality'],
          ['Culture', 'Can the organism be recovered and tested?', 'Slow, unsafe, or low-yield for some agents'],
          ['Antigen test', 'Is a target antigen detected?', 'Performance varies by specimen and disease stage'],
          ['Serology', 'Has the host made an immune response?', 'Timing and cross-reactivity can confuse interpretation'],
          ['NAAT', 'Is target nucleic acid detected?', 'May detect nonviable organism or colonization depending on context']
        ]
      }
    ],
    keywords: ['diagnosis infectious diseases', 'culture', 'naat', 'serology', 'antigen test', 'direct exam', 'diagnostic approach']
  },
  {
    slug: 'evaluation-antimicrobial-activity',
    title: 'Evaluation of Antimicrobial Activity',
    category: 'Clinical Lab Principles',
    summary: 'Evaluation of antimicrobial activity explains how the laboratory measures inhibition, interprets susceptibility, and connects in vitro results to possible therapy.',
    whyItMatters: 'This is the bridge between basic antimicrobial concepts and AST reports. It helps students understand zones, MICs, breakpoints, and quality control.',
    principle: 'Antimicrobial activity is measured under standardized conditions, then interpreted with organism-specific rules and clinical breakpoints.',
    basicSteps: [
      'Use a pure isolate that is clinically meaningful.',
      'Prepare the correct inoculum.',
      'Expose the organism to antimicrobial concentrations or disks.',
      'Measure inhibition using the approved method.',
      'Interpret using current organism-drug breakpoints and QC rules.'
    ],
    interpretation: [
      'A larger zone usually means more inhibition in disk diffusion.',
      'A lower MIC usually means less drug is needed to inhibit growth in vitro.',
      'Susceptible, intermediate, resistant, and related categories are interpretive, not just measurements.'
    ],
    commonMistakes: [
      'Equating MIC numbers across unrelated drugs without context.',
      'Forgetting that breakpoint rules differ by organism and drug.',
      'Ignoring QC and method requirements.'
    ],
    studentShortcut: 'Zone or MIC is the measurement; the category is the interpretation.',
    relatedLinks: [
      { label: 'Antimicrobial Susceptibility Testing', path: '/learn/antimicrobial-susceptibility-testing' },
      { label: 'Antimicrobial Resistance Mechanisms', path: '/learn/antimicrobial-resistance-mechanisms' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ],
    tables: [
      {
        title: 'AST Language',
        columns: ['Term', 'Meaning', 'Student note'],
        rows: [
          ['Zone diameter', 'Measured inhibition around a disk', 'Used in disk diffusion interpretation'],
          ['MIC', 'Lowest tested concentration that inhibits visible growth', 'Reported by dilution, gradient, or automated methods'],
          ['Breakpoint', 'Rule that converts a measurement into an interpretation', 'Depends on organism, drug, site, and standards'],
          ['QC', 'Control testing that checks method performance', 'Bad QC means patient results may be unreliable']
        ]
      }
    ],
    keywords: ['evaluation antimicrobial activity', 'ast', 'mic', 'zone diameter', 'breakpoints', 'quality control', 'antimicrobial testing']
  },
  {
    slug: 'bacterial-identification-principles',
    title: 'Principles of Bacterial Identification',
    category: 'Bacteriology',
    summary: 'Bacterial identification uses specimen context, Gram stain, colony morphology, growth conditions, and branch-point tests to move from unknown isolate to useful name.',
    whyItMatters: 'This is the main logic behind the roadmaps. Students need the principle before memorizing organism tables.',
    principle: 'Identification is a narrowing process. Each observation should eliminate some possibilities and make the next test more focused.',
    basicSteps: [
      'Start with specimen source and clinical context.',
      'Confirm purity and decide whether the isolate is worth working up.',
      'Read Gram stain reaction, shape, and arrangement.',
      'Use colony morphology, media behavior, and atmosphere.',
      'Choose branch-point tests that separate likely groups.'
    ],
    interpretation: [
      'Gram-positive cocci, Gram-negative rods, anaerobes, and fastidious organisms follow different first branches.',
      'Colony morphology is a clue, not a final identification.',
      'Modern methods such as MALDI-TOF and molecular tests still require context and quality checks.'
    ],
    commonMistakes: [
      'Running a panel before knowing the branch.',
      'Ignoring mixed culture or contamination.',
      'Thinking an instrument name replaces clinical interpretation.'
    ],
    studentShortcut: 'Good ID is not test collecting. It is narrowing the branch one useful clue at a time.',
    relatedLinks: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
    ],
    tables: [
      {
        title: 'Identification Logic',
        columns: ['Layer', 'Question', 'Examples'],
        rows: [
          ['Specimen context', 'Does this isolate matter here?', 'Sterile site, urine count, wound quality, blood culture pattern'],
          ['Direct morphology', 'What broad group is it?', 'Gram-positive cocci, Gram-negative rods, yeast, branching rods'],
          ['Growth behavior', 'Where and how did it grow?', 'MacConkey, chocolate, anaerobic media, CO2, temperature'],
          ['Branch test', 'Which split is most useful next?', 'Catalase, oxidase, coagulase, indole, urease'],
          ['Confirmation', 'How confident is the final name?', 'MALDI-TOF, biochemical panel, molecular method, reference lab']
        ]
      }
    ],
    keywords: ['bacterial identification', 'principles of identification', 'colony morphology', 'gram stain', 'branch tests', 'maldi tof']
  },
  {
    slug: 'gram-stain',
    title: 'Gram Stain',
    category: 'Core Methods',
    summary: 'The Gram stain separates many bacteria by cell wall staining behavior and gives the bench an early read on morphology, arrangement, and specimen quality.',
    whyItMatters: 'It is often the first clue in bacterial workup and can guide urgent reporting, culture expectations, and first-pass identification.',
    principle: 'Crystal violet and iodine form a complex that is retained better by thick peptidoglycan. Decolorization and safranin counterstain reveal Gram-positive and Gram-negative patterns.',
    basicSteps: [
      'Prepare a thin, fixed smear.',
      'Apply crystal violet, then iodine.',
      'Decolorize carefully.',
      'Counterstain with safranin.',
      'Read staining reaction, morphology, arrangement, and background cells.'
    ],
    interpretation: [
      'Purple cocci in clusters suggest a Staphylococcus-like first branch.',
      'Purple cocci in chains suggest Streptococcus or Enterococcus-like logic.',
      'Pink rods lead toward Gram-negative rod workflows, but morphology and site still matter.'
    ],
    commonMistakes: [
      'Over-decolorizing or under-decolorizing.',
      'Reading thick areas of the smear.',
      'Treating Gram-variable organisms as a final answer.'
    ],
    studentShortcut: 'Do not stop at positive or negative. Say reaction, shape, arrangement, and specimen quality.',
    relatedLinks: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
    ],
    tables: [
      {
        title: 'Reagent Sequence',
        columns: ['Reagent', 'Function', 'Gram-positive result', 'Gram-negative result'],
        rows: [
          ['Crystal violet', 'Primary stain', 'Purple', 'Purple before decolorization'],
          ['Iodine', 'Mordant', 'Purple complex retained', 'Purple complex forms'],
          ['Alcohol or acetone-alcohol', 'Decolorizer', 'Usually remains purple', 'Becomes colorless'],
          ['Safranin', 'Counterstain', 'Still purple', 'Pink to red']
        ]
      },
      {
        title: 'Common False Patterns',
        columns: ['Pattern', 'Common causes', 'How to think about it'],
        rows: [
          ['Falsely Gram-negative', 'Over-decolorization, old culture, damaged cells', 'Repeat from fresh growth or a better smear area'],
          ['Falsely Gram-positive', 'Under-decolorization, thick smear', 'Check a thin area before changing the branch'],
          ['Gram-variable', 'Mixed culture, aging colonies, cell-wall variation', 'Do not force a clean branch too early']
        ]
      }
    ],
    keywords: ['gram stain', 'crystal violet', 'iodine', 'safranin', 'gram positive', 'gram negative', 'cocci', 'rods']
  },
  {
    slug: 'acid-fast-stain',
    title: 'Acid-Fast Stain',
    category: 'Core Methods',
    summary: 'Acid-fast stains help detect organisms with waxy cell walls, especially Mycobacterium and partially acid-fast organisms such as Nocardia.',
    whyItMatters: 'AFB concern changes safety, processing, media, incubation time, and reporting urgency.',
    principle: 'Mycolic acid-rich cell walls resist routine staining but retain carbol fuchsin or fluorochrome stains after acid-alcohol decolorization.',
    basicSteps: [
      'Use the appropriate specimen processing method.',
      'Stain with Ziehl-Neelsen, Kinyoun, or fluorochrome method.',
      'Decolorize with acid-alcohol.',
      'Counterstain if required.',
      'Report smear findings using the laboratory grading system.'
    ],
    interpretation: [
      'AFB seen in respiratory specimens raises tuberculosis safety and NAAT questions.',
      'Branching weakly acid-fast rods can suggest Nocardia-like organisms.',
      'A negative smear does not rule out mycobacterial disease.'
    ],
    commonMistakes: [
      'Using routine bacterial incubation expectations.',
      'Forgetting biosafety escalation when MTB is possible.',
      'Confusing smear detection with species identification.'
    ],
    studentShortcut: 'AFB is a method flag, not a species name. Ask: MTB concern, NTM concern, or partially acid-fast actinomycete?',
    relatedLinks: [
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Mycobacteria Guide', path: '/guides?guide=mycobacteria' }
    ],
    tables: [
      {
        title: 'Acid-Fast Stain Methods',
        columns: ['Method', 'Primary stain', 'Decolorizer', 'Counterstain', 'Best use'],
        rows: [
          ['Ziehl-Neelsen', 'Carbol fuchsin with heat', 'Acid-alcohol', 'Methylene blue', 'Classic hot method for AFB'],
          ['Kinyoun', 'Carbol fuchsin without heat', 'Acid-alcohol', 'Methylene blue or green', 'Cold method used by many labs'],
          ['Auramine-rhodamine', 'Fluorochrome stain', 'Milder acid decolorizer', 'Quenching counterstain', 'Sensitive screening method']
        ]
      },
      {
        title: 'Reading the Result',
        columns: ['Finding', 'Likely meaning', 'Next thought'],
        rows: [
          ['AFB in respiratory specimen', 'Mycobacterial disease is possible', 'Think NAAT, culture, and biosafety'],
          ['Weakly acid-fast branching rods', 'Nocardia-like organism is possible', 'Correlate with Gram stain and aerobic actinomycete workup'],
          ['Negative smear', 'No AFB seen in that smear', 'Disease is not ruled out if suspicion remains']
        ]
      }
    ],
    keywords: ['acid fast stain', 'afb', 'ziehl neelsen', 'kinyoun', 'mycobacteria', 'tuberculosis', 'nocardia']
  },
  {
    slug: 'culture-media',
    title: 'Culture Media',
    category: 'Core Methods',
    summary: 'Culture media support, select, or differentiate organisms so the lab can recover pathogens and recognize useful colony patterns.',
    whyItMatters: 'Choosing the right plate affects recovery. Reading the plate correctly affects the whole identification path.',
    principle: 'Media can be enriched, selective, differential, or specialized. Each plate answers a different bench question.',
    basicSteps: [
      'Match media to specimen source and suspected organisms.',
      'Use enrichment when fastidious organisms may be present.',
      'Use selective media to suppress background flora.',
      'Use differential reactions to separate colony groups.',
      'Interpret growth with the specimen source and incubation conditions.'
    ],
    interpretation: [
      'Blood agar shows growth quality and hemolysis.',
      'Chocolate agar supports more fastidious respiratory organisms.',
      'MacConkey selects for many Gram-negative rods and differentiates lactose reaction.'
    ],
    commonMistakes: [
      'Thinking one plate can answer every question.',
      'Ignoring atmosphere and incubation time.',
      'Overcalling normal flora from nonsterile specimens.'
    ],
    studentShortcut: 'Ask what the plate is doing: feeding, selecting, differentiating, or protecting a special organism.',
    relatedLinks: [
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' }
    ],
    tables: [
      {
        title: 'Common Media Roles',
        columns: ['Medium', 'Type', 'What it helps show'],
        rows: [
          ['Blood agar', 'Enriched and differential', 'General growth and hemolysis'],
          ['Chocolate agar', 'Enriched', 'Fastidious respiratory organisms such as Haemophilus and pathogenic Neisseria'],
          ['MacConkey agar', 'Selective and differential', 'Gram-negative rod growth and lactose reaction'],
          ['CNA or PEA agar', 'Selective', 'Helps recover Gram-positive organisms by suppressing many Gram-negative rods'],
          ['Thioglycollate broth', 'Enrichment broth', 'Supports low numbers or mixed oxygen-tolerance organisms'],
          ['BCYE agar', 'Specialized', 'Supports Legionella when clinically suspected']
        ]
      }
    ],
    keywords: ['culture media', 'blood agar', 'chocolate agar', 'macconkey', 'selective media', 'differential media', 'enriched media']
  },
  {
    slug: 'macconkey-agar',
    title: 'MacConkey Agar',
    category: 'Core Methods',
    summary: 'MacConkey agar is selective for many Gram-negative rods and differentiates lactose fermenters from non-lactose fermenters.',
    whyItMatters: 'MacConkey growth and lactose reaction are major early clues in enteric and nonfermenter workflows.',
    principle: 'Bile salts and crystal violet inhibit many Gram-positive organisms. Lactose and neutral red show acid production from lactose fermentation.',
    basicSteps: [
      'Inoculate the plate from an appropriate specimen or isolate.',
      'Incubate according to lab procedure.',
      'Check whether the organism grows.',
      'Read lactose reaction and colony character.',
      'Use oxidase and other branch tests to continue the workup.'
    ],
    interpretation: [
      'Pink colonies suggest lactose fermentation.',
      'Colorless colonies suggest non-lactose fermentation.',
      'No growth can suggest a Gram-positive, fastidious, or inhibited organism depending on context.'
    ],
    commonMistakes: [
      'Calling lactose reaction before enough incubation.',
      'Ignoring oxidase after MacConkey growth.',
      'Assuming every MacConkey grower is Enterobacterales.'
    ],
    studentShortcut: 'MacConkey answers two early questions: did it grow, and did it ferment lactose?',
    relatedLinks: [
      { label: 'Enterics Calculator', path: '/biochemical-calculator' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' }
    ],
    tables: [
      {
        title: 'MacConkey Reading Table',
        columns: ['Observation', 'Meaning', 'Examples to consider'],
        rows: [
          ['Good growth, pink colonies', 'Lactose fermentation', 'E. coli, Klebsiella, Enterobacter group'],
          ['Good growth, colorless colonies', 'Non-lactose fermentation', 'Salmonella, Shigella, Proteus, many nonfermenters'],
          ['Poor or no growth', 'Organism may be inhibited or fastidious', 'Gram-positive organisms, Haemophilus, anaerobes, special pathogens'],
          ['Growth plus oxidase positive', 'Not classic Enterobacterales', 'Pseudomonas, Aeromonas, Vibrio, other oxidase-positive branches']
        ]
      }
    ],
    keywords: ['macconkey agar', 'macconkey', 'lactose fermenter', 'non lactose fermenter', 'enterics', 'gram negative rods']
  },
  {
    slug: 'catalase-test',
    title: 'Catalase Test',
    category: 'Core Methods',
    summary: 'The catalase test detects catalase enzyme activity by bubbling when hydrogen peroxide is broken down into water and oxygen.',
    whyItMatters: 'It is a fast first branch for Gram-positive cocci, especially separating Staphylococcus-like organisms from Streptococcus/Enterococcus-like organisms.',
    principle: 'Catalase-positive organisms produce visible bubbles after exposure to hydrogen peroxide.',
    basicSteps: [
      'Use growth from a suitable non-blood medium when possible.',
      'Place a small amount of organism on a clean slide.',
      'Add hydrogen peroxide.',
      'Watch for immediate bubbling.',
      'Compare with expected controls when required.'
    ],
    interpretation: [
      'Positive bubbling supports Staphylococcus, Micrococcus, Bacillus, or many coryneform possibilities.',
      'Negative reaction supports Streptococcus, Enterococcus, and related catalase-negative organisms.',
      'Weak or delayed bubbling should be interpreted cautiously.'
    ],
    commonMistakes: [
      'Picking from blood agar and carrying over red cells.',
      'Using too much organism.',
      'Treating catalase as an identification by itself.'
    ],
    studentShortcut: 'For Gram-positive cocci, catalase is the fork in the road: clusters usually positive, chains usually negative.',
    relatedLinks: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ],
    tables: [
      {
        title: 'Catalase Branch Points',
        columns: ['Result', 'Common branch', 'Remember'],
        rows: [
          ['Positive', 'Staphylococcus, Micrococcus, Bacillus, many coryneforms', 'Bubbling is oxygen release from peroxide breakdown'],
          ['Negative', 'Streptococcus, Enterococcus, many related cocci', 'Use hemolysis, PYR, bile esculin, and salt tolerance next'],
          ['Weak or questionable', 'May be technical or organism-dependent', 'Repeat with fresh growth and avoid blood agar carryover']
        ]
      }
    ],
    keywords: ['catalase test', 'hydrogen peroxide', 'staphylococcus', 'streptococcus', 'gram positive cocci', 'bubbling']
  },
  {
    slug: 'coagulase-test',
    title: 'Coagulase Test',
    category: 'Core Methods',
    summary: 'The coagulase test helps separate Staphylococcus aureus from many coagulase-negative staphylococci.',
    whyItMatters: 'Coagulase status changes clinical significance, reporting, and susceptibility expectations in many specimens.',
    principle: 'Coagulase converts fibrinogen to fibrin. Slide methods detect bound coagulase/clumping factor; tube methods detect free coagulase.',
    basicSteps: [
      'Confirm the isolate fits a Staphylococcus-like branch.',
      'Choose slide or tube method according to lab procedure.',
      'Use proper plasma reagent and controls.',
      'Read clumping or clot formation at the correct time.',
      'Resolve discordant or weak results with the required method.'
    ],
    interpretation: [
      'Positive coagulase supports Staphylococcus aureus in the right context.',
      'Negative coagulase supports coagulase-negative staphylococci or related organisms.',
      'Some organisms can cause false positives or confusing clumping.'
    ],
    commonMistakes: [
      'Testing organisms before confirming the right branch.',
      'Overreading autoagglutination.',
      'Forgetting that specimen source affects significance.'
    ],
    studentShortcut: 'Coagulase is not just a reaction. It asks whether this Staph-like isolate may be S. aureus.',
    relatedLinks: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' }
    ],
    tables: [
      {
        title: 'Coagulase Reading Table',
        columns: ['Method', 'Detects', 'Positive clue', 'Main caution'],
        rows: [
          ['Slide coagulase', 'Bound coagulase or clumping factor', 'Rapid visible clumping', 'Autoagglutination can confuse the result'],
          ['Tube coagulase', 'Free coagulase', 'Clot formation in plasma', 'Read at the correct time and follow lab policy'],
          ['Latex agglutination', 'Clumping factor and/or protein A depending on kit', 'Agglutination reaction', 'Kit targets vary by manufacturer']
        ]
      }
    ],
    keywords: ['coagulase test', 'staphylococcus aureus', 'coagulase negative staphylococci', 'slide coagulase', 'tube coagulase']
  },
  {
    slug: 'oxidase-test',
    title: 'Oxidase Test',
    category: 'Core Methods',
    summary: 'The oxidase test detects cytochrome c oxidase and is a key early branch for many Gram-negative organisms.',
    whyItMatters: 'Oxidase helps separate Enterobacterales from oxidase-positive nonfermenters, curved rods, Neisseria, and other important groups.',
    principle: 'A positive reaction turns the oxidase reagent purple within the expected reading time.',
    basicSteps: [
      'Use fresh growth and the correct reagent.',
      'Avoid media or tools that can interfere with the reaction.',
      'Apply organism to reagent paper or approved test system.',
      'Read within the required time window.',
      'Use the result with Gram stain, colony, and media behavior.'
    ],
    interpretation: [
      'Oxidase negative supports Enterobacterales or Acinetobacter-like branches in the right setting.',
      'Oxidase positive supports Pseudomonas-like, Vibrio/Aeromonas-like, Neisseria-like, or other branches.',
      'Delayed color change may be invalid depending on lab rules.'
    ],
    commonMistakes: [
      'Reading the test too late.',
      'Using metal loops or interfering media.',
      'Assuming oxidase positive means Pseudomonas.'
    ],
    studentShortcut: 'For Gram-negative rods, oxidase tells you which road you are on before the details start.',
    relatedLinks: [
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Enterics Calculator', path: '/biochemical-calculator' }
    ],
    tables: [
      {
        title: 'Oxidase Branch Points',
        columns: ['Result', 'Common branch', 'What to do next'],
        rows: [
          ['Negative', 'Enterobacterales or Acinetobacter-like organisms', 'Use MacConkey pattern and biochemical reactions'],
          ['Positive', 'Pseudomonas-like, Vibrio/Aeromonas-like, Neisseria-like, or other groups', 'Use morphology, media, and specimen source'],
          ['Delayed color', 'May be invalid depending on timing', 'Repeat and read within the approved window']
        ]
      }
    ],
    keywords: ['oxidase test', 'cytochrome oxidase', 'pseudomonas', 'enterobacterales', 'gram negative rods', 'purple reaction']
  },
  {
    slug: 'hanging-drop-preparation',
    title: 'Hanging Drop Preparation',
    category: 'Core Methods',
    summary: 'A hanging drop preparation is a wet mount method used to observe true motility in living organisms.',
    whyItMatters: 'Motility can support identification branches, but it must be separated from Brownian motion and preparation artifacts.',
    principle: 'A drop of suspension hangs from a coverslip over a depression slide, allowing organisms to move in a thicker fluid space.',
    basicSteps: [
      'Prepare a light organism suspension.',
      'Place a small drop on a coverslip.',
      'Invert a depression slide over the coverslip.',
      'Turn the preparation over carefully.',
      'Focus on the edge of the drop and observe movement.'
    ],
    interpretation: [
      'True motility shows directional movement through the field.',
      'Brownian motion appears as vibration without real travel.',
      'Some organisms require specific conditions to express motility.'
    ],
    commonMistakes: [
      'Calling Brownian motion motility.',
      'Using a suspension that is too heavy.',
      'Letting the mount dry out.'
    ],
    studentShortcut: 'True motility goes somewhere. Brownian motion just wiggles in place.',
    relatedLinks: [
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
    ],
    tables: [
      {
        title: 'Motility Reading',
        columns: ['Observation', 'Meaning', 'Caution'],
        rows: [
          ['Directional movement across the field', 'True motility likely present', 'Confirm with the organism group and culture condition'],
          ['Vibration in place', 'Brownian motion', 'Do not call this motile'],
          ['No movement', 'Nonmotile or not expressing motility', 'Temperature, age, and medium can affect expression']
        ]
      }
    ],
    keywords: ['hanging drop preparation', 'motility', 'wet mount', 'brownian motion', 'microbiology practical']
  },
  {
    slug: 'specimen-quality',
    title: 'Specimen Quality',
    category: 'Clinical Lab Principles',
    summary: 'Specimen quality determines whether a microbiology result can answer the clinical question.',
    whyItMatters: 'A technically correct test can still mislead if the specimen is contaminated, delayed, dried out, or collected from the wrong site.',
    principle: 'The best specimen comes from the site of infection, is collected before therapy when possible, and reaches the lab in the right container and transport condition.',
    basicSteps: [
      'Confirm the specimen source and collection method.',
      'Check timing, transport, volume, and container.',
      'Assess direct smear quality when applicable.',
      'Reject or recollect when the result would be unreliable.',
      'Choose routine, anaerobic, fungal, AFB, molecular, or serologic testing based on the question.'
    ],
    interpretation: [
      'Deep aspirates and tissue usually answer more than superficial swabs.',
      'Sterile-site specimens usually carry higher significance.',
      'Mixed flora from poor-quality specimens may reflect contamination.'
    ],
    commonMistakes: [
      'Treating every swab as equal.',
      'Ignoring transport needs for anaerobes.',
      'Reporting organism lists without specimen context.'
    ],
    studentShortcut: 'Before asking what grew, ask whether the specimen deserved to grow it.',
    relatedLinks: [
      { label: 'Syndrome to Diagnostic Path', path: '/syndrome-diagnostic-path' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' }
    ],
    tables: [
      {
        title: 'Specimen Quality Notes',
        columns: ['Specimen type', 'Better collection', 'Common problem'],
        rows: [
          ['Blood culture', 'Multiple sets from separate venipuncture sites', 'Single-bottle growth may be contamination depending on organism'],
          ['CSF', 'Prompt delivery, adequate volume, sterile container', 'Delay can reduce recovery and cell reliability'],
          ['Sputum', 'Deep cough specimen with inflammation', 'Saliva-heavy specimens may need recollection'],
          ['Wound', 'Deep aspirate or tissue when possible', 'Superficial swabs often collect colonizing flora'],
          ['Urine', 'Clean-catch, catheterized, or suprapubic specimen as appropriate', 'Mixed growth can reflect contamination']
        ]
      }
    ],
    keywords: ['specimen quality', 'specimen collection', 'transport', 'rejection criteria', 'swab', 'aspirate', 'tissue']
  },
  {
    slug: 'specimen-collection-transport',
    title: 'Specimen Collection and Transport',
    category: 'Clinical Lab Principles',
    summary: 'Specimen collection and transport decide whether the laboratory receives the right material in a condition that can answer the clinical question.',
    whyItMatters: 'Many microbiology errors start before the specimen reaches the bench. Good collection protects the patient from false reassurance, misleading mixed growth, and unnecessary repeat testing.',
    principle: 'The specimen should come from the infected site, avoid avoidable contamination, arrive quickly, and use transport conditions that preserve the organism being sought.',
    basicSteps: [
      'Match the specimen to the syndrome and suspected organism group.',
      'Use a sterile container or appropriate transport system.',
      'Collect enough material before antimicrobial therapy when possible.',
      'Label source precisely, not just the body region.',
      'Deliver promptly or use the required transport medium.'
    ],
    interpretation: [
      'A deep aspirate usually has more value than a superficial swab.',
      'Blood cultures are interpreted by organism identity, number of positive bottles, and collection pattern.',
      'Anaerobic workups need specimen types and transport that protect organisms from oxygen.'
    ],
    commonMistakes: [
      'Submitting superficial swabs for deep infections.',
      'Using vague source labels such as wound or drainage.',
      'Letting low-volume or fragile specimens sit too long.'
    ],
    studentShortcut: 'Specimen first, organism second. A poor specimen makes every downstream answer weaker.',
    relatedLinks: [
      { label: 'Specimen Quality', path: '/learn/specimen-quality' },
      { label: 'Syndrome to Diagnostic Path', path: '/syndrome-diagnostic-path' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' }
    ],
    tables: [
      {
        title: 'Common Specimen Priorities',
        columns: ['Specimen', 'Collection priority', 'Why it matters'],
        rows: [
          ['Blood culture', 'Separate venipuncture sites and adequate volume', 'Helps separate true bacteremia from contamination'],
          ['CSF', 'Prompt delivery in sterile tubes', 'Organisms and cells can decline quickly'],
          ['Respiratory specimen', 'Deep lower respiratory sample when pneumonia is suspected', 'Saliva-heavy specimens mostly reflect oral flora'],
          ['GI specimen', 'Fresh stool or approved transport/preservative when indicated', 'Timing and preservative affect bacterial and parasite recovery'],
          ['Urine', 'Clean-catch, catheterized, or suprapubic specimen as clinically appropriate', 'Collection method changes colony count interpretation'],
          ['Wound or abscess', 'Aspirate or tissue from the active process', 'Surface swabs can overrepresent colonizers']
        ]
      }
    ],
    keywords: ['specimen collection', 'transport', 'blood culture', 'csf', 'respiratory specimen', 'urine culture', 'wound culture', 'stool specimen']
  },
  {
    slug: 'respiratory-specimen-quality',
    title: 'Respiratory Specimen Quality',
    category: 'Clinical Lab Principles',
    summary: 'Respiratory specimen quality helps decide whether a sputum culture represents lower respiratory infection or mostly oral contamination.',
    whyItMatters: 'A culture from saliva can create confusing reports and unnecessary treatment. Microscopy helps judge whether the specimen contains inflammation from the lower tract.',
    principle: 'A useful sputum specimen generally has inflammatory cells and limited squamous epithelial contamination. The exact acceptance rule depends on local policy.',
    basicSteps: [
      'Confirm the specimen type: sputum, tracheal aspirate, BAL, bronchial wash, or tissue.',
      'Review Gram stain quality when the specimen is sputum-like.',
      'Look for neutrophils, squamous epithelial cells, and predominant organisms.',
      'Decide whether culture, recollection, or a different test is most useful.',
      'Interpret culture results with specimen quality and clinical syndrome.'
    ],
    interpretation: [
      'Many neutrophils support inflammation.',
      'Many squamous epithelial cells suggest oral contamination.',
      'A predominant organism on smear is more useful than scattered mixed flora.'
    ],
    commonMistakes: [
      'Treating all sputum cultures as equal.',
      'Ignoring the Gram stain quality note.',
      'Expecting routine culture to answer atypical, viral, fungal, or AFB questions.'
    ],
    studentShortcut: 'For sputum, ask: lower airway sample or mouth sample?',
    relatedLinks: [
      { label: 'Specimen Quality', path: '/learn/specimen-quality' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Sputum Quality Clues',
        columns: ['Microscopy clue', 'Suggests', 'Bench implication'],
        rows: [
          ['Many neutrophils', 'Inflammation is present', 'Culture is more likely to be meaningful'],
          ['Many squamous epithelial cells', 'Oral contamination', 'Recollection may be more useful than reporting mixed flora'],
          ['Predominant single morphotype', 'Possible pathogen signal', 'Correlate with culture growth'],
          ['Mixed organisms without inflammation', 'Upper airway contamination likely', 'Avoid overinterpreting culture']
        ]
      }
    ],
    keywords: ['sputum quality', 'respiratory specimen', 'bartlett', 'neutrophils', 'squamous epithelial cells', 'pneumonia culture']
  },
  {
    slug: 'antimicrobial-susceptibility-testing',
    title: 'Antimicrobial Susceptibility Testing',
    category: 'Clinical Lab Principles',
    summary: 'Antimicrobial susceptibility testing estimates whether an organism is likely to respond to an antimicrobial under defined testing conditions.',
    whyItMatters: 'AST results guide therapy, but they are only valid when the organism, method, inoculum, medium, incubation, and breakpoint rules are appropriate.',
    principle: 'Standardized methods compare organism growth against antimicrobial exposure and interpret the result using accepted breakpoints.',
    basicSteps: [
      'Start with a pure, clinically meaningful isolate.',
      'Prepare the inoculum to the required density.',
      'Use the correct medium, incubation atmosphere, and incubation time.',
      'Read zones, MICs, or instrument output according to method rules.',
      'Apply organism-specific breakpoints and reporting rules.'
    ],
    interpretation: [
      'Disk diffusion reports zone sizes that map to interpretive categories.',
      'MIC methods report the lowest concentration that inhibits visible growth under test conditions.',
      'Some organism-drug combinations require special tests, suppression rules, or confirmatory methods.'
    ],
    commonMistakes: [
      'Testing contaminants or colonizers without clinical value.',
      'Using the wrong medium or incubation condition.',
      'Reading a result without checking whether a breakpoint exists.'
    ],
    studentShortcut: 'AST is standardized on purpose. Small setup errors can become wrong therapy signals.',
    relatedLinks: [
      { label: 'Antimicrobial Resistance Mechanisms', path: '/learn/antimicrobial-resistance-mechanisms' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ],
    tables: [
      {
        title: 'Common AST Methods',
        columns: ['Method', 'What is measured', 'Student note'],
        rows: [
          ['Disk diffusion', 'Zone diameter around antibiotic disks', 'Medium depth, inoculum, and incubation are critical'],
          ['Gradient diffusion', 'MIC where the ellipse intersects the strip scale', 'Useful for selected organism-drug questions'],
          ['Broth microdilution', 'MIC across antimicrobial concentrations', 'Reference-style method for many drugs'],
          ['Automated AST', 'Instrument-derived growth patterns and MIC/category output', 'Review unusual phenotypes and suppression rules']
        ]
      },
      {
        title: 'Setup Variables That Change Results',
        columns: ['Variable', 'If too high or too low', 'Possible effect'],
        rows: [
          ['Inoculum density', 'Too heavy or too light', 'Can shift zones or MICs'],
          ['Agar depth', 'Too thick or too thin', 'Can change diffusion and zone size'],
          ['Incubation time', 'Too short or too long', 'Can hide or exaggerate resistance'],
          ['Medium chemistry', 'Wrong cation or supplement conditions', 'Can affect specific drug classes']
        ]
      }
    ],
    keywords: ['antimicrobial susceptibility testing', 'ast', 'kirby bauer', 'disk diffusion', 'mic', 'gradient diffusion', 'mueller hinton']
  },
  {
    slug: 'antimicrobial-resistance-mechanisms',
    title: 'Antimicrobial Resistance Mechanisms',
    category: 'Clinical Lab Principles',
    summary: 'Resistance mechanisms explain how bacteria survive antimicrobial exposure and why certain phenotypes matter clinically.',
    whyItMatters: 'Recognizing mechanisms helps students connect gene names, drug classes, and susceptibility patterns instead of memorizing isolated facts.',
    principle: 'Resistance usually works by destroying the drug, changing the target, reducing entry, increasing efflux, bypassing the pathway, or protecting the target.',
    basicSteps: [
      'Identify the organism group and likely intrinsic resistance.',
      'Look for phenotype patterns that suggest acquired mechanisms.',
      'Connect the mechanism to the affected drug class.',
      'Apply confirmatory or reporting rules when required.',
      'Communicate clinically important resistance clearly.'
    ],
    interpretation: [
      'Beta-lactamases can hydrolyze selected beta-lactam drugs.',
      'Target changes can make a drug unable to bind effectively.',
      'Porin loss and efflux can combine with enzymes to create broader resistance.'
    ],
    commonMistakes: [
      'Memorizing gene names without knowing which drugs are affected.',
      'Assuming one mechanism explains every resistant phenotype.',
      'Forgetting intrinsic resistance before calling something unusual.'
    ],
    studentShortcut: 'Ask what changed: the drug, the target, the doorway, the pump, or the pathway.',
    relatedLinks: [
      { label: 'Antimicrobial Susceptibility Testing', path: '/learn/antimicrobial-susceptibility-testing' },
      { label: 'Certification Study Paths', path: '/certification-study-paths' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ],
    tables: [
      {
        title: 'Resistance Mechanism Map',
        columns: ['Mechanism', 'What happens', 'Classic examples'],
        rows: [
          ['Drug inactivation', 'Enzyme destroys or modifies the drug', 'Beta-lactamases, aminoglycoside-modifying enzymes'],
          ['Target modification', 'Drug can no longer bind well', 'mecA-mediated PBP change, vancomycin target changes'],
          ['Reduced permeability', 'Drug entry decreases', 'Porin changes in Gram-negative rods'],
          ['Efflux', 'Drug is pumped out', 'Tetracycline and multidrug efflux systems'],
          ['Pathway bypass', 'Organism uses another route around the blocked step', 'Folate pathway resistance patterns']
        ]
      },
      {
        title: 'High-Yield Resistance Terms',
        columns: ['Term', 'Core idea', 'Why students see it'],
        rows: [
          ['ESBL', 'Extended-spectrum beta-lactamase phenotype', 'Important Enterobacterales reporting and infection control concern'],
          ['mecA', 'Altered penicillin-binding protein mechanism', 'Major MRSA concept'],
          ['Carbapenemase', 'Enzyme that can compromise carbapenems', 'Triggers confirmatory, reporting, and public health logic'],
          ['Inducible clindamycin resistance', 'Resistance can appear during therapy despite certain routine results', 'Detected by D-test logic in selected isolates']
        ]
      }
    ],
    keywords: ['resistance mechanisms', 'esbl', 'meca', 'mrsa', 'carbapenemase', 'd test', 'beta lactamase', 'efflux', 'porin']
  },
  {
    slug: 'staphylococcus-micrococcus',
    title: 'Staphylococcus and Micrococcus',
    category: 'Bacteriology',
    summary: 'Staphylococcus and Micrococcus are catalase-positive Gram-positive cocci, but their clinical meaning and bench separation differ.',
    whyItMatters: 'Students often learn Staph first because catalase, coagulase, novobiocin, and colony patterns appear early in many Gram-positive cocci workups.',
    principle: 'Use Gram stain arrangement, catalase, coagulase or latex methods, colony context, and selected separation tests to decide whether the isolate is clinically significant.',
    basicSteps: [
      'Confirm Gram-positive cocci and note arrangement.',
      'Use catalase to separate Staph-like from Strep/Enterococcus-like branches.',
      'Use coagulase or validated rapid tests when Staphylococcus aureus is possible.',
      'Use specimen source to decide whether coagulase-negative staphylococci matter.',
      'Use additional tests when Micrococcus-like organisms are in the differential.'
    ],
    interpretation: [
      'S. aureus is often coagulase positive and clinically important from many sites.',
      'Coagulase-negative staphylococci can be contaminants or pathogens depending on site and device context.',
      'Micrococcus is often less clinically significant but should still be interpreted by source.'
    ],
    commonMistakes: [
      'Calling every coagulase-negative staph a contaminant.',
      'Ignoring device, blood culture pattern, and sterile-site context.',
      'Confusing a screen test with final identification.'
    ],
    studentShortcut: 'For Staph-like organisms, the question is not just name. It is source plus significance.',
    relatedLinks: [
      { label: 'Catalase Test', path: '/learn/catalase-test' },
      { label: 'Coagulase Test', path: '/learn/coagulase-test' },
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' }
    ],
    tables: [
      {
        title: 'Staph-Like Branch Points',
        columns: ['Feature', 'Staphylococcus', 'Micrococcus'],
        rows: [
          ['Oxygen relationship', 'Facultative anaerobe pattern', 'More strictly aerobic pattern'],
          ['Glucose use', 'Often fermentative', 'Often oxidative'],
          ['Modified oxidase or microdase', 'Usually negative', 'Often positive'],
          ['Clinical pattern', 'Ranges from contaminant to major pathogen', 'Often skin flora or contaminant, context matters']
        ]
      },
      {
        title: 'Common Staphylococcus Study Clues',
        columns: ['Organism', 'Classic clues', 'Common clinical association'],
        rows: [
          ['S. aureus', 'Coagulase positive, often DNase positive', 'Skin infection, bacteremia, pneumonia, toxin-mediated disease'],
          ['S. epidermidis', 'Coagulase negative, device-associated context', 'Catheter, prosthetic valve, hardware infections'],
          ['S. saprophyticus', 'Coagulase negative, novobiocin resistant pattern', 'Uncomplicated UTI in young sexually active patients']
        ]
      }
    ],
    keywords: ['staphylococcus', 'micrococcus', 'staph aureus', 'coagulase negative staphylococci', 'novobiocin', 'catalase positive cocci']
  },
  {
    slug: 'streptococcus-enterococcus',
    title: 'Streptococcus and Enterococcus',
    category: 'Bacteriology',
    summary: 'Streptococcus and Enterococcus are catalase-negative Gram-positive cocci organized by hemolysis, Lancefield grouping, and key bench reactions.',
    whyItMatters: 'This group appears constantly in exams and bench practice because small reaction patterns connect strongly to clinical syndromes.',
    principle: 'Start with catalase-negative Gram-positive cocci, then use hemolysis, PYR, bacitracin, CAMP, bile esculin, salt tolerance, optochin, and bile solubility as appropriate.',
    basicSteps: [
      'Confirm catalase-negative Gram-positive cocci.',
      'Sort by hemolysis pattern on blood agar.',
      'Apply group-specific tests rather than every test at once.',
      'Use source and syndrome to judge significance.',
      'Remember that Enterococcus has different therapy and resistance implications.'
    ],
    interpretation: [
      'Beta-hemolytic patterns often lead to group A or group B logic first.',
      'Alpha-hemolytic patterns often require S. pneumoniae versus viridans group thinking.',
      'Bile esculin and salt tolerance help separate Enterococcus-like branches.'
    ],
    commonMistakes: [
      'Overtrusting hemolysis without checking the full pattern.',
      'Forgetting Enterococcus in urine, wound, bloodstream, and device contexts.',
      'Treating viridans streptococci as always harmless.'
    ],
    studentShortcut: 'Catalase-negative cocci are best learned by lanes: beta, alpha, then bile esculin/salt logic.',
    relatedLinks: [
      { label: 'Catalase Test', path: '/learn/catalase-test' },
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' }
    ],
    tables: [
      {
        title: 'Strep and Enterococcus Study Lanes',
        columns: ['Lane', 'Organisms to think about', 'Useful reactions'],
        rows: [
          ['Beta-hemolytic', 'S. pyogenes, S. agalactiae', 'PYR, bacitracin screen, CAMP, hippurate, grouping'],
          ['Alpha-hemolytic', 'S. pneumoniae, viridans group streptococci', 'Optochin, bile solubility, clinical source'],
          ['Bile esculin positive cocci', 'Enterococcus and selected non-enterococci', 'Salt tolerance, PYR, identification method'],
          ['Nutritionally variant streptococci', 'Abiotrophia and Granulicatella', 'Satellite growth or special nutrient requirements']
        ]
      },
      {
        title: 'Clinical Memory Anchors',
        columns: ['Organism/group', 'Common association', 'Why it matters'],
        rows: [
          ['S. pyogenes', 'Pharyngitis, skin infection, toxin-mediated disease', 'Complications and rapid recognition matter'],
          ['S. agalactiae', 'Neonatal disease and pregnancy screening context', 'Specimen and patient age matter'],
          ['S. pneumoniae', 'Pneumonia, otitis media, meningitis, bacteremia', 'Capsule and invasive disease are key concepts'],
          ['Viridans group', 'Oral flora and endocarditis context', 'Blood culture significance depends on pattern and patient'],
          ['Enterococcus', 'UTI, wound, bloodstream, device-associated infection', 'Intrinsic and acquired resistance affect therapy']
        ]
      }
    ],
    keywords: ['streptococcus', 'enterococcus', 'strep pyogenes', 'strep agalactiae', 'strep pneumoniae', 'viridans', 'bile esculin', 'pyr', 'camp']
  },
  {
    slug: 'neisseria-moraxella',
    title: 'Neisseria and Moraxella',
    category: 'Bacteriology',
    summary: 'Neisseria and Moraxella are oxidase-positive Gram-negative cocci or coccobacilli with important respiratory, genital, and invasive disease associations.',
    whyItMatters: 'These organisms teach students to combine Gram stain shape, oxidase, carbohydrate use, specimen source, and urgency.',
    principle: 'Pathogenic Neisseria require careful identification and source-aware reporting, while Moraxella catarrhalis is commonly tied to respiratory disease.',
    basicSteps: [
      'Confirm Gram-negative diplococci, cocci, or coccobacilli morphology.',
      'Check oxidase and growth requirements.',
      'Use carbohydrate or validated identification methods as needed.',
      'Interpret by source: genital, CSF, blood, respiratory, or ocular.',
      'Escalate urgent findings from sterile sites or suspected invasive disease.'
    ],
    interpretation: [
      'N. gonorrhoeae is strongly tied to genital and extragenital STI testing workflows.',
      'N. meningitidis is a critical sterile-site and public health organism.',
      'M. catarrhalis is often respiratory and can be clinically important in otitis, sinusitis, and lower respiratory disease.'
    ],
    commonMistakes: [
      'Assuming every Gram-negative diplococcus has the same urgency.',
      'Ignoring specimen source when interpreting commensal Neisseria.',
      'Using routine plate expectations for fastidious organisms.'
    ],
    studentShortcut: 'For Gram-negative cocci, source tells you how loud the result is.',
    relatedLinks: [
      { label: 'Oxidase Test', path: '/learn/oxidase-test' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' }
    ],
    tables: [
      {
        title: 'Neisseria and Moraxella Comparison',
        columns: ['Feature', 'Neisseria pattern', 'Moraxella catarrhalis pattern'],
        rows: [
          ['Gram stain', 'Diplococci, often kidney-bean shaped', 'Cocci or coccobacilli, may appear in pairs'],
          ['Oxidase', 'Positive', 'Positive'],
          ['Carbohydrate use', 'Species-dependent saccharolytic patterns', 'Asaccharolytic pattern'],
          ['Butyrate reaction', 'Generally negative for common pathogenic Neisseria', 'Positive in classic M. catarrhalis workflows'],
          ['Common context', 'STI, meningitis, commensal respiratory flora depending on species', 'Otitis, sinusitis, COPD or respiratory infection context']
        ]
      }
    ],
    keywords: ['neisseria', 'moraxella', 'gram negative cocci', 'gonorrhoeae', 'meningitidis', 'catarrhalis', 'oxidase', 'butyrate']
  },
  {
    slug: 'gram-positive-bacilli-overview',
    title: 'Gram-Positive Bacilli Overview',
    category: 'Bacteriology',
    summary: 'Gram-positive bacilli include spore-formers, non-spore-formers, branching organisms, and pleomorphic rods with very different clinical meanings.',
    whyItMatters: 'Students often get lost because Gram-positive rods are not one neat group. Spore status, oxygen relationship, catalase, motility, and morphology help organize the branch.',
    principle: 'First split by spore-forming versus non-spore-forming, then use oxygen tolerance, catalase, motility, morphology, and clinical setting.',
    basicSteps: [
      'Confirm Gram-positive rods or coccobacilli.',
      'Look for spores or spore-forming context.',
      'Consider aerobic versus anaerobic growth pattern.',
      'Use catalase, motility, and special morphology clues.',
      'Escalate when high-consequence organisms or toxin-producing organisms are possible.'
    ],
    interpretation: [
      'Bacillus-like aerobic spore-formers range from contaminants to major pathogens.',
      'Clostridium-like anaerobic spore-formers require anaerobic and toxin-aware thinking.',
      'Listeria, Corynebacterium, Erysipelothrix, and Lactobacillus-like organisms are non-spore-forming but separate by key reactions.'
    ],
    commonMistakes: [
      'Dismissing every Gram-positive rod as a contaminant.',
      'Forgetting Listeria in neonatal, pregnancy, elderly, and immunocompromised contexts.',
      'Missing Corynebacterium toxin or device-associated significance.'
    ],
    studentShortcut: 'For Gram-positive rods, ask: spores, oxygen, catalase, motility, and clinical setting.',
    relatedLinks: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ],
    tables: [
      {
        title: 'Gram-Positive Rod Organizer',
        columns: ['Branch', 'Organisms to think about', 'Useful clues'],
        rows: [
          ['Aerobic spore-forming rods', 'Bacillus group', 'Spores, aerobic growth, colony morphology, safety context'],
          ['Anaerobic spore-forming rods', 'Clostridium group', 'Anaerobic growth, spores, toxin syndromes'],
          ['Motile non-spore-forming rods', 'Listeria', 'Tumbling or umbrella motility, catalase positive, clinical context'],
          ['Pleomorphic rods', 'Corynebacterium group', 'Palisades, club shapes, tellurite or toxin-aware questions'],
          ['Catalase-negative rods', 'Erysipelothrix, Lactobacillus-like organisms', 'H2S, vancomycin pattern, site significance']
        ]
      },
      {
        title: 'Selected Clinical Anchors',
        columns: ['Organism/group', 'Memory anchor', 'Common pitfall'],
        rows: [
          ['Listeria monocytogenes', 'Meningitis and sepsis risk in neonates, pregnancy, elderly, and immunocompromised patients', 'Mistaking short rods for diphtheroids without context'],
          ['Erysipelothrix rhusiopathiae', 'Occupational animal or meat exposure', 'Confusing with other catalase-negative rods'],
          ['Corynebacterium diphtheriae complex', 'Toxin-mediated respiratory disease concern', 'Routine ID is not the whole question when toxin matters'],
          ['Corynebacterium jeikeium', 'Device-associated infection and resistance context', 'Calling all coryneforms insignificant']
        ]
      }
    ],
    keywords: ['gram positive bacilli', 'bacillus', 'clostridium', 'listeria', 'corynebacterium', 'erysipelothrix', 'lactobacillus', 'spore forming rods']
  }
];

const coreLearnTopicsWithExpansionDetails = coreLearnTopics.map((topic) => {
  const detailTables = getExpandedDetailTablesForSlug(topic.slug);

  if (!detailTables) {
    return topic;
  }

  return {
    ...topic,
    tables: [...(topic.tables ?? []), ...detailTables]
  };
});

export const learnTopics: LearnTopic[] = [...coreLearnTopicsWithExpansionDetails, ...expandedLearnTopics];

export const getLearnTopicBySlug = (slug?: string) => {
  if (!slug) {
    return undefined;
  }

  return learnTopics.find((topic) => topic.slug === slug);
};
