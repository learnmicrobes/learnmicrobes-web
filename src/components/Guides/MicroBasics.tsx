import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToolBox from '../ToolBox/ToolBox';
import AlphaValidationCTA from '../AlphaValidationCTA/AlphaValidationCTA';
import { trackEvent } from '../../utils/analytics';
import './MicroBasics.css';

type GuideSection = {
  heading: string;
  intro?: string;
  items: string[];
};

type GuideCard = {
  title: string;
  body: string;
};

type GuideCategory = 'Core Basics' | 'Bacteriology' | 'Parasitology' | 'Mycology' | 'Virology' | 'Organ System Diagnosis' | 'Laboratory Management' | 'Bench Workflows' | 'Interpretation';

type Guide = {
  id: string;
  label: string;
  category: GuideCategory;
  title: string;
  summary: string;
  highlights: string[];
  cards?: GuideCard[];
  sections: GuideSection[];
};

type GuideNextStep = {
  title: string;
  body: string;
  path: string;
};

const guides: Guide[] = [
  {
    id: 'intro-to-microbiology',
    label: 'New Student Start: Intro to Microbiology',
    category: 'Core Basics',
    title: 'Intro to Clinical Microbiology for New Learners',
    summary: 'A starting module for students and new medical technologists who need the basic bench mindset before diving into roadmaps and organism details.',
    highlights: [
      'Microbiology is pattern recognition: specimen, Gram stain, media, atmosphere, and a few key tests narrow the organism step by step.',
      'Good specimen quality and clean bench logic matter as much as memorizing organisms.',
      'You do not need to know everything at once; you need a reliable first-pass workflow.'
    ],
    cards: [
      {
        title: 'What to learn first',
        body: 'Start with Gram reaction, shape, arrangement, oxygen tolerance, basic media, and why certain tests are chosen.'
      },
      {
        title: 'How to think at the bench',
        body: 'Ask what the specimen is, whether it is a good sample, what the Gram stain shows, and what the colony is doing on primary media.'
      },
      {
        title: 'What beginners often miss',
        body: 'Specimen quality, mixed flora, contaminants, and false confidence from one biochemical reaction cause many early mistakes.'
      }
    ],
    sections: [
      {
        heading: 'The basic mental model',
        items: [
          'Start with the source: blood, urine, wound, sputum, stool, and sterile fluids all behave differently.',
          'Use the Gram stain to split the world into manageable groups before thinking about species names.',
          'Let primary media and atmosphere tell you what grows, what does not grow, and what that means.',
          'Choose the next test because it answers a specific branch question, not because it is famous.'
        ]
      },
      {
        heading: 'Core concepts to master early',
        items: [
          'Gram-positive versus Gram-negative, cocci versus rods, clusters versus chains, and hemolysis patterns.',
          'Colonization versus infection, contaminant versus pathogen, and why body site matters.',
          'Why MacConkey, blood agar, chocolate agar, and anaerobic media are used.',
          'How catalase, coagulase, oxidase, indole, urease, and H2S fit into a workup.'
        ]
      },
      {
        heading: 'A safe beginner workflow',
        items: [
          'Check specimen quality before trusting any result.',
          'Read the Gram stain and colony morphology together, never in isolation.',
          'Use one or two high-yield differentiating tests first instead of ordering a random battery.',
          'If the pattern conflicts, question purity, specimen quality, and technique before forcing an ID.'
        ]
      },
      {
        heading: 'Where to go next in this site',
        items: [
          'Open the taxonomy guide next if you want to understand how organisms are grouped, named, and identified.',
          'Use Biochemical Tests when you want bench principles, QC, and interpretation details.',
          'Come back to the workflow guides for blood and urine once the basics feel familiar.'
        ]
      }
    ]
  },
  {
    id: 'microbial-taxonomy',
    label: 'Microbial Taxonomy',
    category: 'Core Basics',
    title: 'Microbial Taxonomy and Identification',
    summary: 'Learn how microorganisms are classified, why names matter, and how taxonomy supports real identification at the bench.',
    highlights: [
      'Taxonomy gives microbiologists a shared structure for classification, naming, and identification.',
      'Students usually need species, genus, phenotype, and identification logic more than deep memorization of every taxonomic rank.',
      'Identification is practical taxonomy: observe the organism, compare traits, and narrow it step by step.'
    ],
    cards: [
      {
        title: 'Classification',
        body: 'Classification places organisms into structured groups such as species, genus, family, order, class, phylum, and kingdom.'
      },
      {
        title: 'Species and Genus',
        body: 'In day-to-day microbiology, genus and species names matter most because they are the levels you will read, report, and compare constantly.'
      },
      {
        title: 'Phenotype',
        body: 'Phenotype means the observable traits of an organism, including Gram stain, morphology, growth pattern, colony appearance, and biochemical reactions.'
      },
      {
        title: 'Identification Methods',
        body: 'Organisms can be identified by phenotype, biochemical testing, immunologic methods, or molecular approaches depending on the question being asked.'
      }
    ],
    sections: [
      {
        heading: 'Why taxonomy matters',
        items: [
          'Taxonomy is the system used to classify, name, and organize microorganisms in a consistent way.',
          'Without taxonomy, microbiologists would have no common language for discussing organisms across labs, textbooks, and clinical reports.',
          'In practice, taxonomy helps students connect what they observe to the most likely organism group.'
        ]
      },
      {
        heading: 'Classification basics',
        items: [
          'The major ranks are species, genus, family, order, class, phylum, and kingdom.',
          'Students do not need to memorize every hierarchy detail first; they need to understand that organisms are grouped by shared characteristics.',
          'The closer the taxonomic relationship, the more traits organisms are likely to share.'
        ]
      },
      {
        heading: 'Species, genus, and naming',
        items: [
          'Species is the most basic taxonomic group and is often defined as organisms sharing many common physical and genetic features.',
          'A genus contains related species that share broader common characteristics.',
          'Binomial naming uses genus plus species, such as Escherichia coli or Staphylococcus aureus.',
          'This naming structure matters because genus and species are the levels most often used in clinical microbiology.'
        ]
      },
      {
        heading: 'Phenotype versus genotype',
        items: [
          'Phenotype refers to observable traits such as staining, morphology, colony appearance, growth requirements, and biochemical behavior.',
          'Genotype refers to the organism genetic makeup and becomes more important in molecular identification methods.',
          'Most beginner workups start with phenotype, because that is what students can directly see and interpret first.'
        ]
      },
      {
        heading: 'Nomenclature and name changes',
        items: [
          'Nomenclature is the formal naming system used in microbiology.',
          'Scientific names follow rules for capitalization and italicization so reports stay standardized and readable.',
          'Names can change over time as classification improves, which is why students may see older and newer organism names in different resources.'
        ]
      },
      {
        heading: 'How identification uses taxonomy',
        items: [
          'Identification is not random memorization; it is the process of comparing organism traits to known taxonomic groups.',
          'Gram stain, colony morphology, atmosphere, media choice, and a few high-yield tests are practical tools for narrowing the organism.',
          'Taxonomy supports identification by telling you which traits matter most for separating one group from another.'
        ]
      },
      {
        heading: 'Major identification approaches',
        items: [
          'Phenotypic methods rely on observable traits and remain the most intuitive starting point for students.',
          'Biochemical methods help separate look-alike organisms by metabolic behavior.',
          'Immunologic and molecular methods can provide faster or more specific identification when phenotype alone is not enough.',
          'The best student mindset is to understand what question each identification method is trying to answer.'
        ]
      }
    ]
  },
  {
    id: 'bacterial-cell-structure',
    label: 'Bacterial Cell Structure',
    category: 'Core Basics',
    title: 'Bacterial Cell Structure and Why It Matters',
    summary: 'Learn how cell wall differences, external structures, and spores shape staining, virulence, and identification.',
    highlights: [
      'Structure is not just anatomy. It explains Gram stain behavior, virulence traits, environmental survival, and test selection.',
      'The biggest beginner split is Gram-positive versus Gram-negative cell envelope structure.',
      'Capsules, flagella, pili, spores, and cell wall components all matter because they change how organisms behave clinically and in the lab.'
    ],
    cards: [
      {
        title: 'Cell Wall and Peptidoglycan',
        body: 'Peptidoglycan gives strength to the bacterial wall and helps explain why different organisms respond differently to stains and antibiotics.'
      },
      {
        title: 'Gram-Positive Envelope',
        body: 'Gram-positive organisms have a thick peptidoglycan layer that retains crystal violet and drives the classic purple Gram stain appearance.'
      },
      {
        title: 'Gram-Negative Envelope',
        body: 'Gram-negative organisms have a thinner peptidoglycan layer plus an outer membrane that affects staining, permeability, and endotoxin biology.'
      },
      {
        title: 'External Structures',
        body: 'Capsules, pili, fimbriae, and flagella influence attachment, motility, immune evasion, and sometimes colony behavior.'
      }
    ],
    sections: [
      {
        heading: 'Why cell structure matters',
        items: [
          'Cell structure explains why bacteria stain differently, grow differently, and respond differently to the environment and to antimicrobials.',
          'Students should treat structure as a practical concept, because it affects what you see on the slide, on the plate, and in the workup.',
          'Many key identification clues come directly from structural differences.'
        ]
      },
      {
        heading: 'The bacterial cell envelope',
        items: [
          'The cell envelope includes the cell membrane and, in most bacteria, the cell wall.',
          'Peptidoglycan is a major structural component of the bacterial wall and is central to Gram stain interpretation.',
          'The envelope also helps explain permeability, environmental resilience, and antimicrobial target sites.'
        ]
      },
      {
        heading: 'Gram-positive versus Gram-negative structure',
        items: [
          'Gram-positive organisms have thick peptidoglycan and no outer membrane, which is why they usually retain crystal violet strongly.',
          'Gram-negative organisms have thinner peptidoglycan plus an outer membrane, making their envelope structurally different and more complex.',
          'The Gram-negative outer membrane contains lipopolysaccharide, a major structural feature tied to endotoxin biology.',
          'This difference is one reason Gram-positive and Gram-negative organisms often behave differently in identification and treatment contexts.'
        ]
      },
      {
        heading: 'Surface structures students should recognize',
        items: [
          'Capsules and slime layers can protect bacteria from host defenses and may influence colony appearance.',
          'Flagella support motility and help separate organisms during identification.',
          'Pili and fimbriae help with attachment and can matter in pathogenesis and gene transfer.',
          'These structures are not always visible in routine workups, but they explain important organism behavior.'
        ]
      },
      {
        heading: 'Spores and survival',
        items: [
          'Endospores are specialized survival structures produced by certain bacteria such as Bacillus and Clostridium species.',
          'Spore formation matters because it supports persistence in harsh environments and helps students recognize important organism groups.',
          'Spore-forming organisms should be linked mentally to distinctive morphology, environmental hardiness, and major clinical relevance.'
        ]
      },
      {
        heading: 'How structure affects identification',
        items: [
          'The Gram reaction is one of the earliest and most useful structural clues in microbiology.',
          'Cell shape, arrangement, and envelope type guide which media, atmosphere, and early bench tests are most useful.',
          'A student who understands structure will interpret stains and colony behavior more confidently than a student who memorizes names alone.'
        ]
      },
      {
        heading: 'Clinical relevance without overload',
        items: [
          'Gram-negative outer membrane structure contributes to barrier effects and endotoxin-related clinical concerns.',
          'Capsules can increase virulence by helping organisms resist host clearance.',
          'Structural traits also influence why certain antimicrobial classes target some organisms better than others.',
          'At the beginner level, the goal is to connect structure to behavior, not to memorize every molecular detail.'
        ]
      }
    ]
  },
  {
    id: 'host-microorganism-interactions',
    label: 'Host and Microorganism Interactions',
    category: 'Core Basics',
    title: 'How Microorganisms Interact With the Host',
    summary: 'Learn how normal microbiota, body defenses, inflammation, and immune responses shape whether a microbe causes colonization, infection, or no disease at all.',
    highlights: [
      'Disease does not depend only on the microbe. It also depends on the body site, the host defenses, and the immune response.',
      'Many microorganisms live in or on the body without causing disease, but those same organisms can become opportunists under the right conditions.',
      'Students should learn to think in terms of colonization, invasion, inflammation, immunity, and outcome.'
    ],
    cards: [
      {
        title: 'Normal Microbiota',
        body: 'Normal microbiota occupy body sites, compete with incoming organisms, and may protect the host until normal barriers are disrupted.'
      },
      {
        title: 'Innate Defenses',
        body: 'Skin, mucous membranes, secretions, normal flora, inflammation, and phagocytic cells provide the earliest defenses against infection.'
      },
      {
        title: 'Adaptive Immunity',
        body: 'Humoral and cellular immune responses become more specific and targeted after antigen exposure.'
      },
      {
        title: 'Outcome of Exposure',
        body: 'Exposure may lead to no disease, transient colonization, symptomatic infection, chronic persistence, or recovery with immunity.'
      }
    ],
    sections: [
      {
        heading: 'Why this topic matters',
        items: [
          'Microbiology is not only about identifying organisms. It is also about understanding why some exposures cause disease and others do not.',
          'The same microbe may be harmless in one body site and pathogenic in another.',
          'Host factors, microbial factors, and route of entry all influence the final outcome.'
        ]
      },
      {
        heading: 'Colonization, microbiota, and opportunism',
        items: [
          'Normal microbiota are organisms that commonly live on or in the body without causing disease under usual conditions.',
          'These organisms may help protect the host by competing for nutrients and attachment sites.',
          'When normal barriers are broken or the host is weakened, members of the normal microbiota can become opportunistic pathogens.'
        ]
      },
      {
        heading: 'First-line host defenses',
        items: [
          'Skin provides a physical barrier that limits entry of microorganisms.',
          'Mucous membranes, cilia, tears, saliva, gastric acidity, and other secretions help remove or kill microbes before they invade.',
          'Body site matters because the defenses of skin, respiratory tract, gastrointestinal tract, and genitourinary tract are not identical.'
        ]
      },
      {
        heading: 'Inflammation and phagocytosis',
        items: [
          'Inflammation is part of the early host response and helps recruit cells and mediators to the site of injury or infection.',
          'Phagocytic cells such as neutrophils and macrophages engulf and destroy microbes as part of innate defense.',
          'Students should connect inflammation to the clinical signs of redness, heat, swelling, pain, and local tissue reaction.'
        ]
      },
      {
        heading: 'Adaptive immune response',
        items: [
          'Adaptive immunity becomes more specific after antigen exposure and is a major reason the body responds differently after prior encounters.',
          'Humoral immunity is linked to antibodies and is especially important against extracellular targets and toxins.',
          'Cell-mediated immunity is especially important when infection involves intracellular survival or requires direct cellular control.'
        ]
      },
      {
        heading: 'How microorganisms cause disease',
        items: [
          'Microbes must reach a host site, survive local defenses, attach or invade, and persist long enough to cause damage or trigger disease.',
          'Virulence traits such as adherence factors, capsules, toxins, immune evasion, and tissue invasion influence pathogenic potential.',
          'The host response can also contribute to symptoms and tissue injury, even when it helps control infection.'
        ]
      },
      {
        heading: 'Possible outcomes of exposure',
        items: [
          'Exposure may result in no infection, subclinical infection, symptomatic disease, chronic carriage, or recovery with protective immunity.',
          'Outcome depends on microbial dose, route of exposure, host health, immune status, and existing microbiota.',
          'This is why the same organism can behave differently in different patients.'
        ]
      }
    ]
  },
  {
    id: 'laboratory-safety-basics',
    label: 'Laboratory Safety Basics',
    category: 'Core Basics',
    title: 'Laboratory Safety Basics',
    summary: 'Learn the safety habits, hazard controls, waste handling, and protective measures that support safe microbiology work from specimen receipt to disposal.',
    highlights: [
      'Safety in microbiology depends on routine habits, not just emergency responses.',
      'Students should learn to recognize physical, chemical, and biologic hazards before they focus on complex procedures.',
      'Good safety practice protects the worker, the specimen, the environment, and the quality of the result.'
    ],
    cards: [
      {
        title: 'Standard Precautions',
        body: 'Treat clinical material as potentially infectious and use consistent barrier precautions rather than guessing which sample is safe.'
      },
      {
        title: 'Engineering Controls',
        body: 'Biologic safety cabinets, sharps containers, eyewash stations, and other control systems reduce exposure before personal behavior even begins.'
      },
      {
        title: 'Personal Protective Equipment',
        body: 'Gloves, coats, face protection, and other PPE are useful only when chosen correctly and used consistently.'
      },
      {
        title: 'Waste and Exposure Response',
        body: 'Students should know how contaminated waste is handled and what to do first after a spill, sharps injury, or other exposure.'
      }
    ],
    sections: [
      {
        heading: 'Why laboratory safety matters',
        items: [
          'Clinical microbiology includes contact with patient material, cultures, chemicals, sharps, and equipment that can all create risk.',
          'A safe laboratory supports accurate work because contamination, careless handling, and poor response plans affect both people and results.',
          'Students should think of safety as part of normal workflow, not as a separate topic added at the end.'
        ]
      },
      {
        heading: 'Major hazard groups',
        items: [
          'Biologic hazards include patient specimens, cultures, aerosols, contaminated surfaces, and accidental inoculation or splash exposure.',
          'Chemical hazards include disinfectants, stains, solvents, fixatives, and compressed gases that require proper storage and handling.',
          'Physical hazards include fire, electricity, sharps, broken glass, and equipment that can injure workers when used carelessly.'
        ]
      },
      {
        heading: 'Standard precautions and routine behavior',
        items: [
          'Use standard precautions consistently because the true risk of a specimen cannot always be predicted in advance.',
          'Hand hygiene, careful specimen handling, and correct surface disinfection are basic habits that prevent many avoidable exposures.',
          'No food, drink, cosmetics, or casual phone use should compete with safe bench behavior in the work area.'
        ]
      },
      {
        heading: 'Containment and engineering controls',
        items: [
          'Biologic safety cabinets are used when procedures may create aerosols or when higher-risk materials need controlled handling.',
          'Sharps containers, splash barriers, safety centrifuge practices, and good airflow design are all examples of engineering control.',
          'The safest workflow reduces exposure risk before relying on memory or individual caution alone.'
        ]
      },
      {
        heading: 'Personal protective equipment',
        items: [
          'Gloves protect against direct contact but must be changed appropriately and never replace hand hygiene.',
          'Lab coats, gowns, face shields, masks, and eye protection should match the actual exposure risk of the task being performed.',
          'PPE works best when it is part of a system that also includes training, proper removal, and correct disposal.'
        ]
      },
      {
        heading: 'Disinfection, sterilization, and waste handling',
        items: [
          'Cleaning removes visible material, while disinfection and sterilization address microorganisms at different levels of control.',
          'Contaminated waste, sharps, and biologic material must be separated and disposed of according to their risk level.',
          'Students should learn the difference between routine surface cleanup, high-level disinfection, and complete sterilization.'
        ]
      },
      {
        heading: 'Exposure response and reporting',
        items: [
          'Spills, sharps injuries, splashes, and broken containers require immediate response based on established lab procedure.',
          'Prompt reporting matters because documentation, medical evaluation, and postexposure steps may be time-sensitive.',
          'A safe culture in the lab depends on responding quickly and reporting honestly, not hiding mistakes.'
        ]
      }
    ]
  },
  {
    id: 'gram-stain',
    label: 'Microscopy and Staining Basics',
    category: 'Core Basics',
    title: 'Microscopy and Staining Basics',
    summary: 'Learn how microscopy, direct smears, and common staining methods help students recognize organisms, host cells, and high-yield bench clues early in a workup.',
    highlights: [
      'Microscopy gives an early view of what is present before culture and identification are complete.',
      'Direct smears and stains are only useful when the student connects what is seen to specimen quality, body site, and likely organism group.',
      'Good interpretation depends on technique: smear thickness, stain timing, decolorization, and specimen selection all matter.'
    ],
    cards: [
      {
        title: 'Bright-Field Microscopy',
        body: 'This is the most familiar routine method and is central to direct smears, morphology review, and common stain interpretation.'
      },
      {
        title: 'Gram Stain',
        body: 'The most important routine differential stain for bacteria, helping separate Gram-positive from Gram-negative organisms early in the workup.'
      },
      {
        title: 'Acid-Fast and Fluorescent Methods',
        body: 'These methods become useful when lipid-rich walls, low organism burden, or special diagnostic targets make routine stains less informative.'
      },
      {
        title: 'Wet Mount and Special Uses',
        body: 'Wet mounts and targeted microscopic methods help evaluate motility, fungi, parasites, and specimen quality depending on the case.'
      }
    ],
    sections: [
      {
        heading: 'Why microscopy matters',
        items: [
          'Microscopy can provide rapid information about bacteria, fungi, host cells, and inflammatory response before culture is complete.',
          'Students should use microscopy to narrow possibilities, not to force a final identification too early.',
          'The value of a microscopic finding depends on specimen quality, body site, and how well the smear represents the material collected.'
        ]
      },
      {
        heading: 'Direct smear basics',
        items: [
          'Direct smears are most helpful when students look for morphology, arrangement, organism quantity, and host response together.',
          'White blood cells, epithelial cells, debris, and mixed flora all provide context for whether the specimen is likely to be informative.',
          'A direct smear is an early clue, not a substitute for good culture technique and clinical correlation.'
        ]
      },
      {
        heading: 'Gram stain interpretation',
        items: [
          'Crystal violet, iodine, decolorizer, and safranin work together to separate bacteria by cell wall behavior.',
          'Gram-positive organisms usually retain the crystal violet-iodine complex, while Gram-negative organisms are decolorized and then counterstained.',
          'Shape and arrangement matter: cocci in clusters, cocci in chains, rods, curved rods, and branching forms all shift the differential quickly.'
        ]
      },
      {
        heading: 'Other important staining methods',
        items: [
          'Acid-fast methods are useful when mycobacteria or partially acid-fast organisms are a concern.',
          'Fluorochrome methods can improve visibility when organism numbers are low or background material is heavy.',
          'Special stains and microscopy methods should be chosen to answer a specific diagnostic question, not used randomly.'
        ]
      },
      {
        heading: 'Microscopy methods students should recognize',
        items: [
          'Bright-field microscopy is the core routine method in most basic microbiology learning.',
          'Fluorescence microscopy highlights specific targets or stained material in a way routine bright-field cannot.',
          'Electron microscopy exists for specialized applications but is not a routine first-line tool in standard clinical bacteriology.'
        ]
      },
      {
        heading: 'Common beginner mistakes',
        items: [
          'Thick smears resist proper decolorization and can produce false or mixed Gram stain appearances.',
          'Old cultures, damaged cells, and prior antibiotic exposure may create gram-variable results that confuse beginners.',
          'Students often over-read a direct smear by ignoring specimen quality or assuming the first microscopic clue is the final answer.'
        ]
      }
    ]
  },
  {
    id: 'traditional-cultivation-identification',
    label: 'Cultivation and ID',
    category: 'Core Basics',
    title: 'Traditional Cultivation and Identification Basics',
    summary: 'Connect culture setup, isolation technique, colony morphology, growth conditions, and phenotypic testing into a disciplined bench identification workflow.',
    highlights: [
      'Traditional identification begins with recovery of a viable organism in pure culture.',
      'Primary plates are read as a pattern: amount of growth, colony morphology, hemolysis, pigment, odor, media selectivity, and Gram stain correlation.',
      'A reliable identification is built stepwise, from specimen and culture conditions to presumptive tests, confirmatory tests, and limits of the method.'
    ],
    cards: [
      {
        title: 'Pure Culture',
        body: 'A single organism population is needed before most biochemical or automated identification results can be trusted.'
      },
      {
        title: 'Isolation Streak',
        body: 'Streaking for isolation dilutes mixed material across the plate so separate colonies can be selected for workup.'
      },
      {
        title: 'Colony Morphology',
        body: 'Size, color, opacity, texture, edge, elevation, hemolysis, pigment, and odor help guide the next test.'
      },
      {
        title: 'Phenotypic Testing',
        body: 'Biochemical reactions, substrate use, enzyme activity, and susceptibility patterns turn growth observations into an identification.'
      }
    ],
    sections: [
      {
        heading: 'What cultivation is trying to accomplish',
        items: [
          'Recover organisms from clinical material while preserving the relationship between specimen source and likely pathogens.',
          'Separate mixed flora into isolated colonies so each organism can be examined without interference from neighbors.',
          'Produce enough viable growth for Gram stain confirmation, biochemical testing, susceptibility testing, and additional subculture when needed.'
        ]
      },
      {
        heading: 'Culture formats students should recognize',
        items: [
          'Broth media support growth in liquid and can amplify low numbers of organisms, but mixed growth may be harder to separate visually.',
          'Solid agar allows colony isolation and direct review of colony morphology, hemolysis, pigment, and media-based reactions.',
          'Semisolid media are useful for selected functions such as motility or oxygen-gradient growth patterns.'
        ]
      },
      {
        heading: 'Isolation and purity checks',
        items: [
          'Streak plates to create decreasing inoculum density across zones so discrete colonies appear in later streak areas.',
          'Choose isolated colonies that match the clinically relevant colony type, then verify purity before trusting downstream test results.',
          'If a biochemical profile conflicts with colony appearance or Gram stain morphology, repeat from a pure colony before forcing an identification.'
        ]
      },
      {
        heading: 'Reading primary culture',
        items: [
          'Amount and distribution of growth should be interpreted with specimen type, collection method, and expected normal flora.',
          'Hemolysis on blood agar, lactose reaction on MacConkey, growth on selective media, and failure to grow on a plate can all be meaningful clues.',
          'Colony texture, adherence, spreading, swarming, pitting, odor, and pigment are bench observations that often narrow the organism group before formal testing.'
        ]
      },
      {
        heading: 'Traditional identification workflow',
        items: [
          'Begin with specimen source, direct Gram stain, primary media growth, colony morphology, and oxygen or CO2 requirements.',
          'Use rapid spot tests such as catalase, oxidase, coagulase, indole, PYR, or bile solubility when they answer the next practical question.',
          'Use tube, disk, substrate, or panel-based biochemical tests to confirm the pattern, recognizing that unusual organisms may require reference methods.'
        ]
      },
      {
        heading: 'Quality and safety guardrails',
        items: [
          'Use appropriate controls, fresh reagents, correct incubation time, and a pure inoculum for biochemical tests.',
          'Do not sniff plates directly; odor can be noted only by safe wafting practices when allowed by local procedure.',
          'Escalate suspicious isolates, unusual Gram stains, poor growth with high-risk clinical context, or possible select agents according to laboratory policy.'
        ]
      }
    ]
  },
  {
    id: 'nucleic-acid-analysis',
    label: 'Nucleic Acid Testing',
    category: 'Core Basics',
    title: 'Nucleic Acid-Based Analysis for Microbial Identification and Characterization',
    summary: 'Learn how molecular methods detect, identify, subtype, and characterize microorganisms by targeting DNA or RNA rather than relying only on growth and phenotype.',
    highlights: [
      'Molecular testing can identify organisms directly from specimens, cultures, or extracted nucleic acid when the right target is present.',
      'The major workflow is specimen handling, nucleic acid extraction, amplification or probe detection, signal detection, interpretation, and contamination control.',
      'Molecular results are powerful but must still be interpreted with specimen quality, organism burden, viability, inhibition, and clinical context in mind.'
    ],
    cards: [
      {
        title: 'Target',
        body: 'A selected DNA or RNA sequence used to detect an organism, resistance marker, toxin gene, or strain-related feature.'
      },
      {
        title: 'Extraction',
        body: 'The step that releases and purifies nucleic acid while reducing inhibitors that can block amplification or detection.'
      },
      {
        title: 'Amplification',
        body: 'PCR and related methods copy target sequences so very small amounts can become detectable.'
      },
      {
        title: 'Controls',
        body: 'Positive, negative, extraction, and inhibition controls are essential because molecular assays are sensitive to both contamination and false negatives.'
      }
    ],
    sections: [
      {
        heading: 'Why molecular methods matter',
        items: [
          'They can shorten time to detection for organisms that are slow-growing, fastidious, hazardous, or difficult to identify phenotypically.',
          'They can detect resistance genes, toxin genes, virulence markers, or epidemiologic relatedness that routine culture cannot fully answer.',
          'They complement culture rather than replacing it in every setting because susceptibility testing, viability, and full organism recovery may still be needed.'
        ]
      },
      {
        heading: 'Specimen collection and transport',
        items: [
          'Use the specimen type and transport system validated for the assay because collection devices, preservatives, and swab materials can affect recovery of nucleic acid.',
          'Avoid contamination during collection and aliquoting; molecular assays can detect tiny amounts of carryover material.',
          'Storage temperature, transport time, and freeze-thaw cycles can degrade nucleic acid or change test performance.'
        ]
      },
      {
        heading: 'Core molecular workflow',
        items: [
          'Extract nucleic acid from the specimen or isolate, then remove inhibitors that could interfere with amplification or probe binding.',
          'Use primers or probes that recognize a specific target sequence, then detect the signal by fluorescence, hybridization, melt curve, gel pattern, or platform-specific readout.',
          'Interpret results only after controls pass and the signal pattern matches the assay rules.'
        ]
      },
      {
        heading: 'Common molecular methods',
        items: [
          'Hybridization methods use labeled probes to bind complementary nucleic acid targets and are useful for targeted detection or confirmation.',
          'PCR amplifies a defined target; real-time PCR adds signal monitoring during amplification and can support faster detection or quantitation.',
          'Sequencing, restriction pattern analysis, and nucleic acid fingerprinting can support organism identification, subtyping, outbreak investigation, or resistance characterization.'
        ]
      },
      {
        heading: 'PCR interpretation basics',
        items: [
          'A true positive requires the expected target signal with acceptable control performance.',
          'A negative result may reflect absence of target, low organism burden, poor specimen quality, degradation, extraction failure, or amplification inhibition.',
          'Cycle threshold or signal strength should be interpreted according to the assay instructions, not as a stand-alone measure of disease severity.'
        ]
      },
      {
        heading: 'Post-amplification and contamination risk',
        items: [
          'Amplified products are a major contamination risk because they contain many copies of the target sequence.',
          'Separate pre-amplification and post-amplification activities whenever the workflow requires it.',
          'Use unidirectional workflow, clean technique, dedicated supplies, and appropriate controls to detect or prevent carryover contamination.'
        ]
      },
      {
        heading: 'Clinical interpretation limits',
        items: [
          'Detection of nucleic acid does not always prove viable organism or active infection.',
          'A resistance gene may not fully predict the whole susceptibility profile, and absence of a gene does not exclude all resistance mechanisms.',
          'Molecular findings should be reconciled with Gram stain, culture, organism burden, symptoms, and the clinical question being asked.'
        ]
      }
    ]
  },
  {
    id: 'immunochemical-detection',
    label: 'Immunochemical Detection',
    category: 'Core Basics',
    title: 'Immunochemical Methods Used for Organism Detection',
    summary: 'Learn how antigen-antibody binding is used to detect organisms, microbial products, and host response markers in clinical microbiology.',
    highlights: [
      'Immunochemical assays depend on specific binding between an antibody and its antigen target.',
      'Assay format matters: agglutination, precipitation, immunofluorescence, enzyme immunoassay, and lateral-flow methods answer different bench questions.',
      'Results must be interpreted with specimen quality, timing, cross-reactivity, organism burden, and control performance.'
    ],
    cards: [
      {
        title: 'Antigen',
        body: 'The target being detected, such as a microbial surface structure, toxin, capsule, enzyme, or other organism-associated molecule.'
      },
      {
        title: 'Antibody',
        body: 'A binding reagent that recognizes the antigen. Monoclonal antibodies target one epitope; polyclonal antibodies recognize multiple epitopes.'
      },
      {
        title: 'Signal',
        body: 'The visible or measured output, such as agglutination, fluorescence, color change, light emission, or a lateral-flow line.'
      },
      {
        title: 'Controls',
        body: 'Positive, negative, and procedural controls help verify reagent activity, nonspecific reactions, and valid assay performance.'
      }
    ],
    sections: [
      {
        heading: 'Core immunology language',
        items: [
          'Antigen-antibody reactions depend on structural fit, concentration, temperature, pH, incubation time, and the quality of the specimen.',
          'Specificity describes how well the assay avoids false positives; sensitivity describes how well it detects true positives.',
          'Cross-reactivity occurs when an antibody binds a related or nonspecific target and can mislead organism detection.'
        ]
      },
      {
        heading: 'Agglutination and precipitation methods',
        items: [
          'Agglutination assays use visible clumping of particles, cells, or coated latex beads to indicate antigen-antibody binding.',
          'Latex agglutination is often used for rapid antigen detection or colony confirmation when the target is abundant enough.',
          'Precipitation methods detect lattice formation between soluble antigen and antibody, but they are generally less common in rapid routine organism detection.'
        ]
      },
      {
        heading: 'Immunofluorescence',
        items: [
          'Direct fluorescent antibody tests use labeled antibody to bind antigen in the specimen or culture.',
          'Indirect fluorescent methods add a labeled anti-immunoglobulin reagent after the primary antibody binds.',
          'Fluorescent methods can be rapid and specific, but interpretation depends on specimen quality, microscopy skill, and background staining.'
        ]
      },
      {
        heading: 'Enzyme immunoassay logic',
        items: [
          'Enzyme immunoassays use enzyme-labeled reagents that create a measurable color, fluorescence, or chemiluminescent signal.',
          'Sandwich formats capture antigen between two binding reagents and are common for microbial antigen detection.',
          'Competitive formats measure signal loss or competition and are useful when the target is small or has limited binding sites.'
        ]
      },
      {
        heading: 'Lateral-flow and rapid devices',
        items: [
          'Immunochromatographic assays move specimen across a membrane where labeled reagents and capture lines create a visible result.',
          'Rapid devices are useful for urgent decisions but can have lower sensitivity than culture, molecular testing, or instrumented immunoassays.',
          'A visible control line confirms flow and reagent function, but it does not prove that specimen collection was adequate.'
        ]
      },
      {
        heading: 'Bench interpretation limits',
        items: [
          'A positive antigen test may reflect colonization, residual antigen, or contamination depending on the organism and specimen source.',
          'A negative result can occur with low organism burden, poor specimen collection, inhibitors, antigen variation, or testing outside the optimal disease window.',
          'Discordant immunochemical results should be reconciled with Gram stain, culture, molecular testing, and clinical context.'
        ]
      }
    ]
  },
  {
    id: 'serologic-diagnosis',
    label: 'Serologic Diagnosis',
    category: 'Core Basics',
    title: 'Serologic Diagnosis of Infectious Diseases',
    summary: 'Learn how detection of patient antibodies or antigens helps diagnose infections, especially when direct organism recovery is difficult or timing matters.',
    highlights: [
      'Serology usually measures the host immune response, not the organism itself.',
      'IgM, IgG, seroconversion, and a significant titer rise must be interpreted against timing of illness and immune status.',
      'Cross-reactivity, prior infection, vaccination, and immunosuppression are major reasons serology can be confusing.'
    ],
    cards: [
      {
        title: 'IgM',
        body: 'Often appears earlier in primary infection, but can be absent, persistent, nonspecific, or falsely reactive depending on the assay.'
      },
      {
        title: 'IgG',
        body: 'Usually appears later and may indicate prior exposure, vaccination, current infection, or rising response when paired sera are tested.'
      },
      {
        title: 'Titer',
        body: 'The highest dilution that remains reactive. A fourfold rise between acute and convalescent serum is stronger evidence than one isolated value.'
      },
      {
        title: 'Seroconversion',
        body: 'A change from nonreactive to reactive antibody status, supporting recent infection when timing and assay performance fit.'
      }
    ],
    sections: [
      {
        heading: 'When serology is useful',
        items: [
          'Use serology when organisms are difficult to culture, hazardous, slow-growing, no longer present, or when immune response is the best practical marker.',
          'Serology can support diagnosis of viral, rickettsial, spirochetal, fungal, parasitic, and selected bacterial infections.',
          'Serologic testing is strongest when the clinical syndrome, exposure history, and timing of specimen collection match the test design.'
        ]
      },
      {
        heading: 'Antibody timing patterns',
        items: [
          'Antibody may be negative early in disease before the immune response has reached detectable levels.',
          'Acute and convalescent serum collected weeks apart can show rising antibody and help confirm recent infection.',
          'Persistent antibody can remain after recovery, so one positive result may not prove active infection.'
        ]
      },
      {
        heading: 'Common serologic methods',
        items: [
          'Agglutination, precipitation, complement fixation, immunofluorescence, enzyme immunoassay, and immunoblot formats each detect immune binding in different ways.',
          'Screening tests are usually designed for sensitivity, while confirmatory tests are usually designed for specificity.',
          'Immunoblots or supplemental assays may help clarify false-positive screening results or identify specific antibody patterns.'
        ]
      },
      {
        heading: 'Antigen detection versus antibody detection',
        items: [
          'Antigen detection points more directly to microbial material in the specimen.',
          'Antibody detection points to host response and may lag behind symptoms or persist after infection has resolved.',
          'Some diseases require both direct detection and serology because each method answers a different diagnostic question.'
        ]
      },
      {
        heading: 'Major interpretation pitfalls',
        items: [
          'Cross-reactive antibodies can produce false positives among related organisms or after nonspecific immune activation.',
          'Vaccination, prior infection, passive antibody, or maternal antibody can complicate interpretation.',
          'Immunocompromised patients may not produce expected antibody responses, making negative serology less reassuring.'
        ]
      },
      {
        heading: 'Reporting and follow-up',
        items: [
          'Report results using the method-specific categories and interpretive comments supplied by the assay or laboratory policy.',
          'Recommend paired serology, alternate methods, or repeat testing when the timing of illness makes a single result insufficient.',
          'Avoid overcalling disease from weak or isolated reactivity without compatible clinical and epidemiologic context.'
        ]
      }
    ]
  },
  {
    id: 'antimicrobial-action-resistance',
    label: 'Antimicrobial Action',
    category: 'Core Basics',
    title: 'Principles of Antimicrobial Action and Resistance',
    summary: 'Learn how antimicrobials inhibit microbes, how organisms resist them, and why resistance mechanisms shape bench interpretation and therapy decisions.',
    highlights: [
      'Antimicrobial action depends on selective toxicity: harming the microbe more than the host.',
      'Major drug targets include cell wall synthesis, membranes, protein synthesis, nucleic acid synthesis, and folate metabolism.',
      'Resistance can arise by drug destruction, target alteration, decreased permeability, efflux, bypass pathways, biofilm behavior, or acquisition of resistance genes.'
    ],
    cards: [
      {
        title: 'Selective Toxicity',
        body: 'The drug should affect a microbial structure or pathway while causing acceptable host toxicity.'
      },
      {
        title: 'Bactericidal',
        body: 'Kills the organism under defined conditions, though clinical effect still depends on site, dose, host factors, and organism burden.'
      },
      {
        title: 'Bacteriostatic',
        body: 'Inhibits growth so host defenses and source control can help clear infection.'
      },
      {
        title: 'Resistance',
        body: 'A microbial trait or acquired mechanism that reduces the expected activity of an antimicrobial agent.'
      }
    ],
    sections: [
      {
        heading: 'Major antimicrobial targets',
        items: [
          'Cell wall-active agents interfere with peptidoglycan synthesis or related steps and are most relevant to bacteria with active wall production.',
          'Protein synthesis inhibitors bind ribosomal targets and can affect initiation, elongation, translocation, or peptide formation.',
          'Nucleic acid and folate pathway inhibitors interfere with DNA replication, RNA synthesis, or nucleotide precursor production.'
        ]
      },
      {
        heading: 'Cell wall and membrane agents',
        items: [
          'Beta-lactams bind penicillin-binding proteins and interrupt peptidoglycan cross-linking.',
          'Glycopeptides block cell wall synthesis by binding cell wall precursors rather than PBPs.',
          'Membrane-active agents disrupt membrane integrity but may have toxicity limits because membranes are not unique to bacteria.'
        ]
      },
      {
        heading: 'Common resistance mechanisms',
        items: [
          'Enzymatic inactivation includes beta-lactamases, aminoglycoside-modifying enzymes, and other drug-destroying or drug-modifying enzymes.',
          'Target alteration includes changed PBPs, ribosomal methylation, altered DNA gyrase or topoisomerase, and modified drug-binding sites.',
          'Reduced permeability, porin loss, active efflux, and biofilm growth can lower effective drug concentration at the target.'
        ]
      },
      {
        heading: 'Genetic movement of resistance',
        items: [
          'Resistance genes may be chromosomal or carried on plasmids, transposons, integrons, or other mobile genetic elements.',
          'Horizontal gene transfer can spread resistance through conjugation, transformation, or transduction.',
          'Selection pressure from antimicrobial exposure can enrich resistant subpopulations even when resistance was initially rare.'
        ]
      },
      {
        heading: 'High-yield examples',
        items: [
          'Methicillin resistance in staphylococci is commonly tied to mecA or related genes that produce altered PBP2a.',
          'Vancomycin resistance in enterococci is linked to altered cell wall precursor targets such as vanA or vanB patterns.',
          'Extended-spectrum beta-lactamases and carbapenemases can hydrolyze important beta-lactams and require careful laboratory detection and reporting.'
        ]
      },
      {
        heading: 'Bench interpretation principles',
        items: [
          'Phenotypic susceptibility results reflect the combined effect of organism, drug, method, incubation conditions, and interpretive breakpoint.',
          'Genotypic resistance detection is useful, but gene presence or absence does not always perfectly predict the full phenotype.',
          'Unexpected susceptibility patterns should prompt purity checks, repeat testing, rule review, or escalation according to laboratory policy.'
        ]
      }
    ]
  },
  {
    id: 'antimicrobial-susceptibility-testing',
    label: 'Susceptibility Testing',
    category: 'Core Basics',
    title: 'Laboratory Methods and Strategies for Antimicrobial Susceptibility Testing',
    summary: 'Learn how the lab measures antimicrobial activity, applies breakpoints, detects resistance patterns, and reports results that support therapy decisions.',
    highlights: [
      'Susceptibility testing is a standardized measurement of organism growth in the presence of antimicrobial agents.',
      'Method, inoculum density, medium, incubation, atmosphere, endpoint reading, and quality control all affect the result.',
      'AST results must be interpreted with organism identification, drug exposure at the infection site, resistance mechanisms, and current breakpoint rules.'
    ],
    cards: [
      {
        title: 'MIC',
        body: 'The minimum inhibitory concentration is the lowest antimicrobial concentration that visibly inhibits growth under defined test conditions.'
      },
      {
        title: 'Breakpoint',
        body: 'A rule that translates measured activity into categories such as susceptible, susceptible-dose dependent, intermediate, or resistant.'
      },
      {
        title: 'Disk Diffusion',
        body: 'A standardized lawn of growth is exposed to antibiotic disks, then inhibition zones are measured and interpreted.'
      },
      {
        title: 'QC Strain',
        body: 'A reference organism with expected results used to verify that media, disks, panels, incubation, and reading conditions are working.'
      }
    ],
    sections: [
      {
        heading: 'When susceptibility testing is needed',
        items: [
          'Perform AST when the organism is clinically significant and treatment decisions depend on predictable drug activity.',
          'Testing is most useful when organism identity, specimen source, purity, and clinical relevance are established.',
          'Do not report broad panels without considering whether the organism is a pathogen, colonizer, contaminant, or part of mixed flora.'
        ]
      },
      {
        heading: 'Dilution methods',
        items: [
          'Broth dilution tests organism growth in liquid media containing defined antimicrobial concentrations.',
          'Agar dilution places a standardized inoculum onto agar containing antimicrobial concentrations and is useful for selected reference or specialized testing.',
          'Microdilution panels are common in clinical laboratories and can generate MIC values for multiple organism-drug combinations.'
        ]
      },
      {
        heading: 'Diffusion and gradient methods',
        items: [
          'Disk diffusion uses zone diameter as the measured endpoint and depends heavily on standardized inoculum, agar depth, disk potency, and incubation conditions.',
          'Gradient diffusion strips contain a drug concentration gradient and allow an MIC estimate where the ellipse of inhibition intersects the scale.',
          'Some organisms, drugs, or resistance mechanisms require specific methods because routine diffusion endpoints may be unreliable.'
        ]
      },
      {
        heading: 'Automated and rapid systems',
        items: [
          'Automated AST systems monitor growth or signal changes in antimicrobial wells and interpret results using stored rules.',
          'Rapid susceptibility methods can shorten turnaround time but still require validation, purity checks, and careful handling of unusual results.',
          'Instrument results should be reviewed for organism-drug combinations that require suppression, confirmation, or expert rule interpretation.'
        ]
      },
      {
        heading: 'Reading and reporting categories',
        items: [
          'Susceptible means standard dosing is expected to achieve activity when the drug reaches the infection site appropriately.',
          'Susceptible-dose dependent or intermediate categories require careful attention to dosing, exposure, body site, or method-specific meaning.',
          'Resistant means the isolate is not expected to respond reliably using usual exposures for that organism-drug combination.'
        ]
      },
      {
        heading: 'Resistance detection strategies',
        items: [
          'Screening tests and confirmatory methods may be needed for MRSA, VRE, ESBLs, carbapenemases, inducible clindamycin resistance, and other clinically important mechanisms.',
          'Phenotypic resistance detection shows expressed behavior, while molecular testing detects selected genes or mutations.',
          'Discordance between phenotype and genotype should trigger review of organism purity, identification, method limits, and reporting rules.'
        ]
      },
      {
        heading: 'Quality control and common errors',
        items: [
          'Use correct inoculum density, fresh pure culture, recommended media, proper incubation, and valid QC ranges before accepting results.',
          'Mixed cultures, heavy inoculum, expired disks, wrong agar depth, off-scale endpoints, skipped CO2 requirements, or poor organism ID can distort AST results.',
          'Unexpected profiles should be repeated, confirmed, or escalated according to laboratory policy and current interpretive standards.'
        ]
      }
    ]
  },
  {
    id: 'bacterial-identification-strategy',
    label: 'Bacterial ID Strategy',
    category: 'Bacteriology',
    title: 'Overview of Bacterial Identification Methods and Strategies',
    summary: 'Learn how bacteriology workups move from specimen context and colony morphology into selective testing, commercial systems, and clinically useful identification.',
    highlights: [
      'Bacterial identification is a staged process, not a single test result.',
      'The most reliable workups combine specimen source, Gram stain, colony morphology, growth requirements, rapid bench tests, and confirmatory methods.',
      'Commercial and automated systems are useful only when the isolate is pure, viable, correctly selected, and appropriate for the system database.'
    ],
    cards: [
      {
        title: 'Start With Context',
        body: 'Specimen source, patient setting, and expected flora help decide which colony types deserve workup.'
      },
      {
        title: 'Confirm Purity',
        body: 'Most identification systems and biochemical reactions assume a pure isolate from a representative colony.'
      },
      {
        title: 'Use Branch Points',
        body: 'Gram reaction, morphology, oxygen tolerance, catalase, oxidase, and growth on key media quickly narrow the field.'
      },
      {
        title: 'Escalate Wisely',
        body: 'Unusual profiles, dangerous organisms, or discordant results may require repeat testing, molecular methods, MALDI-TOF, or reference laboratory support.'
      }
    ],
    sections: [
      {
        heading: 'Framework for approaching an unknown isolate',
        items: [
          'Begin with specimen type and clinical significance before investing workup effort into every colony on a plate.',
          'Pair colony morphology with Gram stain from an isolated colony so microscopic and macroscopic clues agree.',
          'Use early discriminator tests to choose the correct identification pathway rather than running unrelated tests.'
        ]
      },
      {
        heading: 'Core observations before biochemical testing',
        items: [
          'Record colony size, color, hemolysis, pigment, odor, texture, adherence, swarming, pitting, and growth on selective or differential media.',
          'Check oxygen and CO2 requirements, temperature behavior, and growth rate when the organism does not fit a routine pattern.',
          'Confirm that the colony selected for testing is pure and represents the clinically important growth type.'
        ]
      },
      {
        heading: 'Manual and rapid biochemical strategy',
        items: [
          'Choose tests that answer the next branch-point question, such as catalase for Gram-positive cocci or oxidase for Gram-negative rods.',
          'Use spot tests, disks, slants, broths, and plate-based reactions according to validated timing and QC rules.',
          'Interpret each reaction as part of a profile; one unexpected reaction should trigger purity review or repeat testing before forcing an ID.'
        ]
      },
      {
        heading: 'Commercial and automated identification systems',
        items: [
          'Commercial panels compare biochemical, enzymatic, growth, or substrate-use patterns against a database.',
          'Accurate results depend on correct organism group selection, inoculum density, incubation, purity, and database coverage.',
          'Low-probability or conflicting results should be resolved with additional bench tests, MALDI-TOF, molecular methods, or reference identification.'
        ]
      },
      {
        heading: 'When identification should be limited',
        items: [
          'Do not over-identify likely contaminants or mixed normal flora when the result will not help patient care.',
          'Some organisms can be reported presumptively or to group level when species-level identification is unreliable or unnecessary.',
          'High-risk organisms, select-agent concerns, and unusual colony profiles should be handled according to safety and escalation policy.'
        ]
      },
      {
        heading: 'Student mindset for bacteriology',
        items: [
          'Think in decision points: what did the specimen show, what grew, what does the Gram stain show, and what single test most narrows the next step.',
          'Learn the expected profile of organism groups rather than memorizing tests as isolated facts.',
          'Use discordance as a warning signal: the best bench technologists stop and verify when the pattern does not make biologic sense.'
        ]
      }
    ]
  },
  {
    id: 'staphylococcus-micrococcus',
    label: 'Staph and Micrococcus',
    category: 'Bacteriology',
    title: 'Staphylococcus, Micrococcus, and Similar Organisms',
    summary: 'Learn how catalase-positive Gram-positive cocci are separated at the bench, why coagulase matters, and how to avoid overcalling common skin flora.',
    highlights: [
      'Catalase-positive Gram-positive cocci in clusters move the workup toward staphylococci and related organisms.',
      'Coagulase, latex agglutination, DNase, mannitol salt behavior, novobiocin, PYR, and microdase help separate clinically important groups.',
      'Clinical context is essential because coagulase-negative staphylococci can be contaminants, colonizers, or true device-associated pathogens.'
    ],
    cards: [
      {
        title: 'Staphylococcus aureus',
        body: 'Usually coagulase positive, often beta-hemolytic, DNase positive, and clinically important in skin, soft tissue, blood, bone, device, and toxin-mediated disease.'
      },
      {
        title: 'Coagulase-Negative Staphylococci',
        body: 'Often skin flora, but clinically important in prosthetic devices, catheters, blood cultures, and selected sterile-site infections.'
      },
      {
        title: 'Staphylococcus saprophyticus',
        body: 'A novobiocin-resistant coagulase-negative staphylococcus classically associated with uncomplicated urinary tract infection in young women.'
      },
      {
        title: 'Micrococcus-Like Organisms',
        body: 'Usually microdase positive and often less clinically significant, but identification must be interpreted with specimen source and patient risk.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-positive cocci in clusters or tetrads, then confirm catalase positivity from a clean colony.',
          'Separate staphylococci from Micrococcus-like organisms with microdase, bacitracin, furazolidone, lysostaphin, and growth pattern when needed.',
          'Do not assume every catalase-positive coccus from skin or blood is clinically meaningful; specimen source and repeat recovery matter.'
        ]
      },
      {
        heading: 'Coagulase-positive staphylococci',
        items: [
          'Coagulase positivity strongly raises concern for S. aureus, but some animal-associated staphylococci and S. lugdunensis-related reactions can complicate simple interpretation.',
          'Latex tests may detect clumping factor, protein A, or capsule-associated targets; tube coagulase detects free coagulase.',
          'DNase, heat-stable nuclease, alkaline phosphatase, hemolysis, mannitol salt behavior, and susceptibility profile help confirm the pattern.'
        ]
      },
      {
        heading: 'Coagulase-negative staphylococci',
        items: [
          'Coagulase-negative staphylococci are common skin flora, so interpretation depends on number of positive cultures, sterile-site recovery, device presence, and patient context.',
          'Novobiocin resistance is a classic branch point for S. saprophyticus and related species.',
          'PYR, urease, alkaline phosphatase, ornithine decarboxylase, beta-galactosidase, and carbohydrate reactions may support species-level separation.'
        ]
      },
      {
        heading: 'Micrococcus and similar genera',
        items: [
          'Micrococcus-like organisms are typically catalase positive, often arranged in tetrads, and commonly recovered from skin or environmental contamination.',
          'Microdase positivity, bacitracin susceptibility, furazolidone resistance, and lysostaphin resistance help separate them from staphylococci.',
          'Species-level workup is usually reserved for clinically significant isolates or unusual sterile-site contexts.'
        ]
      },
      {
        heading: 'Resistance and safety patterns',
        items: [
          'Methicillin resistance in staphylococci is commonly tied to mecA or mecC-mediated altered PBP2a and affects beta-lactam reporting.',
          'Vancomycin-intermediate or resistant S. aureus patterns are uncommon but clinically serious and require confirmatory workup.',
          'Unexpected resistance profiles should prompt purity review, repeat testing, and rule-based reporting according to current laboratory standards.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For a catalase-positive Gram-positive coccus, ask: cluster or tetrad, coagulase or latex result, clinically significant source, and whether the isolate is pure.',
          'Use the Gram-positive roadmap for branching, but let clinical context decide how aggressively to identify coagulase-negative isolates.',
          'When the coagulase result, colony morphology, and clinical picture disagree, repeat from a pure colony before committing to the final ID.'
        ]
      }
    ]
  },
  {
    id: 'streptococcus-enterococcus',
    label: 'Strep and Enterococcus',
    category: 'Bacteriology',
    title: 'Streptococcus, Enterococcus, and Similar Organisms',
    summary: 'Learn how catalase-negative Gram-positive cocci are separated by hemolysis, grouping, PYR, bile esculin, salt tolerance, optochin, and clinical context.',
    highlights: [
      'Catalase-negative Gram-positive cocci in chains or pairs move the workup toward streptococci, enterococci, and similar organisms.',
      'Hemolysis pattern is the first major bench split, but it must be paired with PYR, CAMP, hippurate, optochin, bile solubility, bile esculin, and salt tolerance.',
      'Enterococci, viridans streptococci, pneumococci, beta-hemolytic streptococci, and nutritionally variant streptococci carry very different clinical implications.'
    ],
    cards: [
      {
        title: 'Streptococcus pyogenes',
        body: 'Group A beta-hemolytic streptococcus that is usually PYR positive and linked to pharyngitis, skin infection, invasive soft tissue disease, and postinfectious sequelae.'
      },
      {
        title: 'Streptococcus agalactiae',
        body: 'Group B beta-hemolytic streptococcus that is classically CAMP and hippurate positive and important in neonatal, pregnancy-associated, urinary, and invasive disease.'
      },
      {
        title: 'Streptococcus pneumoniae',
        body: 'Alpha-hemolytic, lancet-shaped diplococci with optochin susceptibility and bile solubility; important in pneumonia, meningitis, otitis, and sepsis.'
      },
      {
        title: 'Viridans Streptococci',
        body: 'Alpha or non-hemolytic oral flora groups that are often optochin resistant and bile insoluble; clinically important in endocarditis and abscess patterns.'
      },
      {
        title: 'Enterococcus',
        body: 'Bile esculin positive, often PYR positive, and salt tolerant; major urinary, wound, bloodstream, and endocarditis pathogens with resistance concerns.'
      },
      {
        title: 'Nutritionally Variant Streptococci',
        body: 'Abiotrophia and Granulicatella may need pyridoxal or show satellitism near helper organisms and should stay on the radar in endocarditis workups.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-positive cocci in chains or pairs, then confirm catalase negativity from a clean colony.',
          'Read hemolysis on sheep blood agar: beta is clear hemolysis, alpha is green partial hemolysis, and gamma is non-hemolytic.',
          'Use colony size, atmosphere, and specimen source before choosing deeper species-level testing.'
        ]
      },
      {
        heading: 'Beta-hemolytic pathway',
        items: [
          'Group A streptococci are classically PYR positive and bacitracin susceptible, but grouping or validated rapid methods are preferred for confirmation.',
          'Group B streptococci are classically CAMP positive and hippurate positive and are important in neonatal and maternal infection.',
          'Small-colony beta-hemolytic streptococci, including the anginosus group, can be associated with deep abscess formation.'
        ]
      },
      {
        heading: 'Alpha-hemolytic pathway',
        items: [
          'Optochin susceptibility and bile solubility support S. pneumoniae when colony morphology and Gram stain fit.',
          'Optochin-resistant, bile-insoluble alpha-hemolytic isolates often move toward viridans group logic.',
          'Viridans group identification can involve VP, urease, mannitol, bile esculin, and clinical source rather than one single defining test.'
        ]
      },
      {
        heading: 'Enterococcus and group D logic',
        items: [
          'Bile esculin positivity plus growth in 6.5 percent NaCl and PYR positivity supports Enterococcus.',
          'Bile esculin positivity without salt growth suggests the S. bovis/S. gallolyticus group when the rest of the profile fits.',
          'Enterococcal species separation often uses mannitol, arabinose, arginine, motility, pigment, and resistance profile.'
        ]
      },
      {
        heading: 'Similar organisms and traps',
        items: [
          'Aerococcus, Gemella, Leuconostoc, Pediococcus, Abiotrophia, and Granulicatella can mimic streptococci or enterococci in early workup.',
          'Leuconostoc and Pediococcus are intrinsically vancomycin resistant, which is an important clue when morphology and catalase fit.',
          'Nutritionally variant streptococci may require pyridoxal or satellitism around S. aureus and are associated with endocarditis.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Ask: beta, alpha, or gamma; then choose the smallest set of tests that separates the likely group.',
          'Do not call alpha-hemolytic streptococci pneumococcus unless optochin and bile solubility support it.',
          'Treat sterile-site isolates, endocarditis workups, and vancomycin-resistant catalase-negative cocci with extra attention to purity and confirmation.'
        ]
      }
    ]
  },
  {
    id: 'bacillus-similar-organisms',
    label: 'Bacillus and Similar Rods',
    category: 'Bacteriology',
    title: 'Bacillus and Similar Organisms',
    summary: 'Learn the bench approach to aerobic spore-forming Gram-positive rods, including Bacillus anthracis safety signals, B. cereus group clues, and related environmental organisms.',
    highlights: [
      'Aerobic or facultative spore-forming Gram-positive rods move the workup toward Bacillus-like organisms rather than the anaerobic Clostridium pathway.',
      'Cell width, spore swelling, hemolysis, motility, lecithinase, colony texture, and safety context are the practical early branch points.',
      'A nonhemolytic, nonmotile Bacillus-like isolate with suspicious colony morphology or clinical context should trigger anthrax rule-out and escalation procedures, not casual bench workup.'
    ],
    cards: [
      {
        title: 'Bacillus anthracis',
        body: 'Large Gram-positive rod, nonmotile, usually nonhemolytic, with ground-glass or medusa-head colonies; suspected isolates require biosafety-aware rule-out and public health escalation.'
      },
      {
        title: 'Bacillus cereus Group',
        body: 'Usually beta-hemolytic, motile, lecithinase positive, and associated with food poisoning, traumatic eye infection, wound infection, and occasional invasive disease.'
      },
      {
        title: 'Bacillus mycoides',
        body: 'A Bacillus cereus group relative with characteristic rhizoid, root-like colony spreading that can help separate it from other large spore-forming rods.'
      },
      {
        title: 'Bacillus subtilis Group',
        body: 'Environmental spore-formers such as B. subtilis and B. licheniformis are common contaminants but can matter in selected sterile-site or immunocompromised contexts.'
      },
      {
        title: 'Paenibacillus and Brevibacillus',
        body: 'Related aerobic spore-formers may show smaller cells, swollen sporangia, variable VP/citrate/gas patterns, and environmental or opportunistic clinical associations.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-positive rods and ask whether spores are produced in the presence of oxygen.',
          'Aerobic spore formation supports Bacillus-like organisms; anaerobic spore-forming rods belong in the Clostridium-style workup.',
          'Review specimen source before deep identification because many Bacillus-like isolates from nonsterile sites are environmental contaminants.'
        ]
      },
      {
        heading: 'Morphology and colony clues',
        items: [
          'Large boxcar-like rods, central or subterminal spores, colony texture, and hemolysis help organize the first branch.',
          'B. anthracis should be considered when a large Bacillus-like isolate is nonhemolytic and nonmotile with suspicious ground-glass or medusa-head colony features.',
          'B. mycoides produces spreading rhizoid colonies, while B. cereus group isolates are commonly beta-hemolytic and spreading.'
        ]
      },
      {
        heading: 'B. cereus group logic',
        items: [
          'B. cereus is commonly motile, beta-hemolytic, lecithinase positive, and resistant to penicillin.',
          'Food poisoning syndromes include short-incubation emetic illness and longer-incubation diarrheal illness.',
          'Eye isolates after trauma or surgery deserve urgent attention because B. cereus endophthalmitis can progress rapidly.'
        ]
      },
      {
        heading: 'Anthrax safety mindset',
        items: [
          'Do not perform unnecessary manipulations on a suspicious Bacillus-like isolate; follow laboratory rule-out, biosafety, and notification policy.',
          'Useful warning features include nonhemolysis, nonmotility, characteristic colony morphology, capsule evidence in appropriate specimens, and compatible clinical or exposure history.',
          'Confirmatory testing belongs with validated methods and reference or public health laboratories when anthrax is suspected.'
        ]
      },
      {
        heading: 'Related aerobic spore-formers',
        items: [
          'B. subtilis, B. licheniformis, B. pumilus, B. megaterium, Paenibacillus, and Brevibacillus are often separated by cell size, spore swelling, VP, citrate, starch, gas, and colony morphology.',
          'These organisms are common in soil, dust, and the environment, so clinical interpretation depends strongly on source and repeat recovery.',
          'Sterile-site recovery, immunocompromise, device association, or consistent culture recovery should raise the level of attention.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For Gram-positive rods, do not jump straight to species. First decide oxygen relationship, spore formation, catalase, and whether the isolate is clinically significant.',
          'Use lecithinase, motility, hemolysis, spore position, and colony morphology as a pattern rather than as isolated memorized facts.',
          'When the pattern suggests a select-agent concern, the correct answer is escalation and safe rule-out, not more routine testing.'
        ]
      }
    ]
  },
  {
    id: 'listeria-corynebacterium',
    label: 'Listeria and Corynebacterium',
    category: 'Bacteriology',
    title: 'Listeria, Corynebacterium, and Similar Organisms',
    summary: 'Learn the workup for non-spore-forming catalase-positive Gram-positive rods, including Listeria, diphtheria-associated corynebacteria, and clinically important diphtheroids.',
    highlights: [
      'Non-spore-forming catalase-positive Gram-positive rods are separated by motility, hemolysis, palisading morphology, lipophilism, Tinsdale/tellurite reactions, urease, nitrate, and toxin testing.',
      'Listeria monocytogenes is a small beta-hemolytic rod with tumbling motility at room temperature and important neonatal, pregnancy-associated, CNS, and bloodstream disease associations.',
      'Corynebacterium diphtheriae and toxigenic C. ulcerans or C. pseudotuberculosis require toxin-aware reporting and public health attention, while many other coryneforms depend heavily on clinical context.'
    ],
    cards: [
      {
        title: 'Listeria monocytogenes',
        body: 'Catalase-positive, narrow beta-hemolytic Gram-positive rod with tumbling motility at room temperature, umbrella motility in semisolid medium, bile esculin positivity, and CAMP positivity.'
      },
      {
        title: 'Corynebacterium diphtheriae',
        body: 'Pleomorphic palisading rod that may form black tellurite colonies with a brown-black Tinsdale halo; disease depends on toxigenic strains, so toxin testing matters.'
      },
      {
        title: 'Corynebacterium jeikeium',
        body: 'Lipophilic, multidrug-resistant coryneform associated with catheter sepsis, prosthetic material, immunocompromised hosts, and serious bloodstream infection.'
      },
      {
        title: 'Corynebacterium urealyticum',
        body: 'Lipophilic, rapidly urease-positive organism associated with alkaline urine, encrusted cystitis, urinary stones, and multidrug resistance.'
      },
      {
        title: 'Rhodococcus and Similar Rods',
        body: 'Rhodococcus equi and related coryneform-like organisms may show partial acid-fastness, pigment, mucoid colonies, and opportunistic respiratory disease patterns.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start after spores have been excluded: catalase-positive non-spore-forming Gram-positive rods move toward Listeria, Corynebacterium, and similar coryneform organisms.',
          'Motility is a major branch point: Listeria shows tumbling motility at room temperature, while most clinically important corynebacteria are nonmotile.',
          'Read hemolysis, colony size, palisading or Chinese-letter morphology, and specimen source before over-identifying likely skin flora.'
        ]
      },
      {
        heading: 'Listeria pattern',
        items: [
          'Listeria monocytogenes is a small Gram-positive rod or coccobacillus that can resemble diphtheroids on smear and group B strep on blood agar.',
          'Key clues include narrow beta hemolysis, catalase positivity, bile esculin positivity, tumbling motility at 20-25 C, umbrella motility, and CAMP positivity.',
          'Clinical concern is highest in pregnancy, neonates, older adults, immunocompromised patients, meningitis, bacteremia, and foodborne exposure contexts.'
        ]
      },
      {
        heading: 'Diphtheria-associated corynebacteria',
        items: [
          'C. diphtheriae, C. ulcerans, and C. pseudotuberculosis can carry toxigenic significance and should be handled according to laboratory and public health policy.',
          'Modified Tinsdale or tellurite media help screen suspicious isolates by black colony development and brown-black halo patterns.',
          'Urease, nitrate, glycogen, lipophilism, reverse CAMP, and toxin testing help separate diphtheria-associated species and biotypes.'
        ]
      },
      {
        heading: 'Nondiphtheriae corynebacteria',
        items: [
          'Many coryneforms are skin or mucosal flora, but they can be true pathogens in blood, devices, wounds, urinary tract disease, and immunocompromised hosts.',
          'Lipophilic species such as C. jeikeium and C. urealyticum may grow slowly or poorly unless lipid supplementation is present.',
          'C. striatum, C. amycolatum, C. pseudodiphtheriticum, and related species require clinical correlation because significance changes sharply by source.'
        ]
      },
      {
        heading: 'Similar organisms and traps',
        items: [
          'Rhodococcus equi may be partially acid-fast and can cause severe pneumonia in immunocompromised patients.',
          'Dermabacter, Brevibacterium, Rothia, Turicella, Cellulosimicrobium, Oerskovia, Exiguobacterium, Leifsonia, and Kurthia can appear in the coryneform workup.',
          'Odor, pigment, acid-fastness, agar pitting, gelatin, casein, nitrate, urease, and motility can help organize these less common organisms.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For catalase-positive Gram-positive rods, decide first whether the organism forms spores, then whether it is motile, hemolytic, lipophilic, or toxin-associated.',
          'Do not dismiss every diphtheroid automatically; sterile-site recovery, repeated blood cultures, devices, urine findings, or immunocompromise can make coryneforms clinically important.',
          'When diphtheria toxin is possible, the right workflow includes safe handling, confirmation, and notification rather than routine species curiosity.'
        ]
      }
    ]
  },
  {
    id: 'erysipelothrix-lactobacillus',
    label: 'Erysipelothrix and Lactobacillus',
    category: 'Bacteriology',
    title: 'Erysipelothrix, Lactobacillus, and Similar Organisms',
    summary: 'Learn the workup for nonbranching catalase-negative Gram-positive rods, including Erysipelothrix H2S clues, Lactobacillus-like vancomycin resistance, and beta-hemolytic look-alikes.',
    highlights: [
      'Catalase-negative, non-spore-forming Gram-positive rods are sorted by H2S production, hemolysis, vancomycin susceptibility, gas from glucose, and clinical source.',
      'Erysipelothrix rhusiopathiae is an H2S-positive, nonmotile, catalase-negative rod associated with animal or fish exposure, erysipeloid, bacteremia, and endocarditis.',
      'Lactobacillus, Weissella, Leuconostoc, Pediococcus, Arcanobacterium, and Gardnerella can be clinically meaningful when the specimen source and patient context fit.'
    ],
    cards: [
      {
        title: 'Erysipelothrix rhusiopathiae',
        body: 'Catalase-negative, nonmotile, slender Gram-positive rod that produces H2S in TSI and may show test-tube-brush growth in gelatin; classically linked to fish, meat, and animal exposure.'
      },
      {
        title: 'Lactobacillus',
        body: 'Vancomycin-resistant or poorly susceptible catalase-negative rods that are normal vaginal and GI flora but can cause opportunistic bacteremia, endocarditis, and device-associated infection.'
      },
      {
        title: 'Weissella confusa',
        body: 'Vancomycin-resistant Lactobacillus-like organism that may produce gas from glucose in MRS broth and cause rare opportunistic bloodstream or endocarditis infections.'
      },
      {
        title: 'Arcanobacterium',
        body: 'Beta-hemolytic catalase-negative rods; A. haemolyticum is associated with pharyngitis and rash, while animal-associated species may appear in wounds or invasive disease.'
      },
      {
        title: 'Gardnerella vaginalis',
        body: 'Pleomorphic Gram-variable to Gram-positive rod associated with bacterial vaginosis, clue cells, elevated vaginal pH, and amine odor after KOH.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a Gram-positive rod that is non-spore-forming and catalase negative, then check hemolysis and whether H2S is produced in TSI.',
          'H2S positivity in this group is a strong clue for Erysipelothrix when the Gram stain, nonmotility, and exposure history fit.',
          'If H2S is negative, hemolysis and vancomycin susceptibility help split beta-hemolytic rods from Lactobacillus-like alpha or nonhemolytic rods.'
        ]
      },
      {
        heading: 'Erysipelothrix pattern',
        items: [
          'Erysipelothrix rhusiopathiae is usually catalase negative, nonmotile, H2S positive in TSI, and vancomycin resistant.',
          'Gelatin stab cultures may show a test-tube-brush pattern rather than simple diffuse liquefaction.',
          'Clinical clues include erysipeloid skin lesions, occupational animal or fish exposure, bacteremia, and endocarditis.'
        ]
      },
      {
        heading: 'Beta-hemolytic catalase-negative rods',
        items: [
          'Arcanobacterium haemolyticum may cause pharyngitis with rash and can show reverse CAMP activity with delayed beta hemolysis.',
          'Arcanobacterium pyogenes-like organisms are more animal-associated and may be gelatin and casein positive.',
          'Gardnerella vaginalis fits best when vaginal findings support bacterial vaginosis, including clue cells, elevated pH, and positive whiff test.'
        ]
      },
      {
        heading: 'Lactobacillus-like rods',
        items: [
          'Lactobacillus species are common protective vaginal and GI flora that produce lactic acid and help maintain low vaginal pH.',
          'They are often vancomycin resistant and may appear as long rods, chains, or pleomorphic forms.',
          'Weissella and related organisms can mimic lactobacilli but may show gas production from glucose in MRS broth and opportunistic invasive disease.'
        ]
      },
      {
        heading: 'Clinical interpretation',
        items: [
          'Many catalase-negative rods are colonizers or normal flora in mucosal specimens, so source matters.',
          'Sterile-site isolates, repeated blood cultures, prosthetic material, immunocompromise, endocarditis concern, or compatible exposure history justify deeper workup.',
          'Vancomycin resistance in this group can be intrinsic and should be interpreted with organism identity rather than treated as a random susceptibility surprise.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For catalase-negative Gram-positive rods, ask: H2S positive, beta hemolytic, vancomycin resistant, or clinically explainable as normal flora.',
          'Do not force a Lactobacillus-like isolate into the Streptococcus or Corynebacterium pathway just because it is Gram-positive and catalase negative.',
          'Let exposure history, specimen site, and repeat recovery decide how far a rare rod should be identified.'
        ]
      }
    ]
  },
  {
    id: 'nocardia-streptomyces-rhodococcus',
    label: 'Nocardia and Aerobic Actinomycetes',
    category: 'Bacteriology',
    title: 'Nocardia, Streptomyces, Rhodococcus, and Similar Organisms',
    summary: 'Learn the workup for branching or partially acid-fast Gram-positive bacilli, including Nocardia, Rhodococcus, Gordonia, Tsukamurella, Streptomyces, and Actinomadura.',
    highlights: [
      'Branching Gram-positive rods should trigger a deliberate aerobic actinomycete workup rather than a routine diphtheroid shortcut.',
      'Modified acid-fast staining, mycolic acid association, aerial hyphae, lysozyme resistance, colony pigment, and substrate hydrolysis organize the major branches.',
      'Nocardia identification and susceptibility testing matter clinically because pulmonary, CNS, disseminated, and cutaneous infections often occur in high-risk patients.'
    ],
    cards: [
      {
        title: 'Nocardia',
        body: 'Aerobic, branching, variably beaded Gram-positive rods that are partially acid-fast and often lysozyme resistant; important in pulmonary disease, brain abscess, disseminated infection, and actinomycetoma.'
      },
      {
        title: 'Nocardia brasiliensis',
        body: 'Classically associated with cutaneous and lymphocutaneous infection or actinomycetoma; often casein and tyrosine positive with xanthine negative patterns.'
      },
      {
        title: 'Rhodococcus equi',
        body: 'Partially acid-fast coryneform-like organism with salmon-pink mucoid colonies; associated with cavitary pneumonia in immunocompromised hosts and exposure to horses or soil.'
      },
      {
        title: 'Gordonia and Tsukamurella',
        body: 'Partially acid-fast environmental actinomycetes that may cause catheter-associated, wound, respiratory, or opportunistic infections and can resemble Nocardia or coryneforms.'
      },
      {
        title: 'Streptomyces and Actinomadura',
        body: 'Non-acid-fast aerobic actinomycetes with aerial hyphae or characteristic colonies; important in actinomycetoma and selected opportunistic infections.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-positive rods or filaments that branch, fragment, or form aerial hyphae.',
          'Use modified acid-fast staining to separate partially acid-fast organisms with mycolic acids from non-acid-fast aerobic actinomycetes.',
          'Correlate colony texture, pigment, growth rate, odor, aerial hyphae, and clinical site before deciding how far to identify the isolate.'
        ]
      },
      {
        heading: 'Nocardia pattern',
        items: [
          'Nocardia species are aerobic, branching, partially acid-fast organisms that often resist lysozyme and may grow as dry, chalky, folded, or aerial colonies.',
          'Casein, xanthine, and tyrosine hydrolysis patterns help organize Nocardia groups before more definitive identification.',
          'Growth at 42 C, arylsulfatase, carbohydrate assimilation, and susceptibility patterns can further separate clinically important species.'
        ]
      },
      {
        heading: 'Clinical Nocardia clues',
        items: [
          'Pulmonary nocardiosis can mimic tuberculosis, fungal disease, or malignancy, especially in immunocompromised patients.',
          'Dissemination to the central nervous system is a key concern, particularly with severe pulmonary disease or high-risk species patterns.',
          'Cutaneous disease may follow trauma or soil exposure, and actinomycetoma can produce chronic swelling, draining sinuses, and granules.'
        ]
      },
      {
        heading: 'Rhodococcus and related genera',
        items: [
          'Rhodococcus equi may appear as diphtheroid-like rods or coccobacilli and develops salmon-pink to orange mucoid colonies after several days.',
          'Gordonia and Tsukamurella are partially acid-fast environmental organisms that may cause catheter, wound, respiratory, or opportunistic disease.',
          'Colony adherence, rhizoid edges, pigment, nitrate, urea, and lysozyme behavior help guide separation from Nocardia.'
        ]
      },
      {
        heading: 'Non-acid-fast aerobic actinomycetes',
        items: [
          'Streptomyces is non-acid-fast, often has an earthy odor, and may form extensive aerial hyphae with chains of spores.',
          'Actinomadura can produce waxy molar-tooth colonies and is associated with actinomycetoma, including white, yellow, or red granules depending on species.',
          'Dermatophilus and Nocardiopsis are additional branching organisms with distinctive microscopic or colony clues.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For branching rods, think morphology first: branching, beading, fragmentation, aerial hyphae, and acid-fast behavior set the correct lane.',
          'Do not treat Nocardia as just another contaminant when recovered from a compatible respiratory, CNS, sterile-site, or cutaneous specimen.',
          'When Nocardia is suspected, species-level identification and susceptibility testing are clinically useful because resistance patterns vary.'
        ]
      }
    ]
  },
  {
    id: 'enterobacteriaceae',
    label: 'Enterobacteriaceae',
    category: 'Bacteriology',
    title: 'Enterobacteriaceae',
    summary: 'Learn the practical bench approach to Enterobacteriaceae and related Enterobacterales: MacConkey growth, lactose reaction, oxidase, IMViC, H2S, urease, PAD, decarboxylases, selective stool media, and clinically important genera.',
    highlights: [
      'Enterobacteriaceae are usually oxidase-negative, glucose-fermenting Gram-negative rods that grow on MacConkey agar.',
      'The first useful split is often lactose fermentation, but final identification depends on a profile of indole, citrate, MR/VP, urease, motility, H2S, PAD, and decarboxylases.',
      'Stool, urine, blood, wound, and sterile-site isolates are interpreted differently; not every enteric-looking colony needs the same depth of workup.'
    ],
    cards: [
      {
        title: 'Escherichia coli',
        body: 'Common lactose fermenter that is typically indole positive, citrate negative, MR positive, and often MUG positive; a major cause of UTI, bacteremia, diarrheal disease, and neonatal meningitis.'
      },
      {
        title: 'Klebsiella, Enterobacter, and Citrobacter',
        body: 'Lactose-fermenting or late-lactose-fermenting groups split with indole, citrate, motility, urease, H2S, LDC, ODC, and colony mucoidy.'
      },
      {
        title: 'Salmonella',
        body: 'Usually non-lactose fermenting, oxidase negative, H2S positive, urease negative, and motile; stool and sterile-site recovery may require public health workflows.'
      },
      {
        title: 'Shigella',
        body: 'Non-lactose fermenting, nonmotile, usually H2S negative and urease negative; species patterns use ODC, ONPG, mannitol, and serogrouping.'
      },
      {
        title: 'Proteeae',
        body: 'Proteus, Morganella, and Providencia are PAD positive; Proteus often swarms and is commonly urease positive, which matters in catheter-associated UTI and stones.'
      },
      {
        title: 'Yersinia',
        body: 'Y. enterocolitica is urease positive, motile at room temperature but not at 35-37 C, and can produce bullseye colonies on CIN agar.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-negative rods that grow on MacConkey and ferment glucose, then confirm oxidase negativity before entering routine enteric logic.',
          'MacConkey lactose reaction separates strong lactose fermenters, late lactose fermenters, and non-lactose fermenters, but timing and colony purity matter.',
          'Use colony clues such as mucoidy, swarming, red pigment, black centers on selective stool media, odor, and stool versus urine source.'
        ]
      },
      {
        heading: 'Lactose fermenter logic',
        items: [
          'E. coli is often indole positive, citrate negative, MR positive, VP negative, and motile, though pathotype workup depends on clinical syndrome.',
          'Klebsiella pneumoniae and K. oxytoca are nonmotile, often mucoid, and commonly citrate positive; K. oxytoca is classically indole positive.',
          'Enterobacter, Citrobacter, Cronobacter, Serratia, Hafnia, Pantoea, and related genera require profile interpretation rather than one defining reaction.'
        ]
      },
      {
        heading: 'Non-lactose fermenter logic',
        items: [
          'PAD positivity moves the workup toward Proteus, Morganella, and Providencia.',
          'H2S-positive PAD-negative isolates raise Salmonella, Edwardsiella, and some Citrobacter or Proteus patterns depending on the rest of the profile.',
          'H2S-negative non-lactose fermenters include Shigella, Yersinia, Serratia, Hafnia, Pantoea, and other less common enterics.'
        ]
      },
      {
        heading: 'Selective stool media',
        items: [
          'HE, XLD, SS, and related media help separate lactose or sucrose fermenters from suspected Salmonella and Shigella.',
          'Black centers on HE or XLD usually indicate H2S production and should trigger Salmonella-style screening when the rest of the profile fits.',
          'Sorbitol MacConkey helps screen for E. coli O157:H7 because classic O157 isolates are sorbitol negative while most E. coli ferment sorbitol.'
        ]
      },
      {
        heading: 'Resistance and reporting mindset',
        items: [
          'Enterobacterales reporting often depends on resistance mechanisms such as ESBL, AmpC, carbapenemases, and intrinsic resistance rules.',
          'Salmonella, Shigella, Shiga toxin-producing E. coli, and suspected Yersinia pestis require organism-specific safety, confirmation, and reporting workflows.',
          'Commercial panels and automated systems are useful, but unusual profiles, mixed cultures, or high-consequence pathogens require purity checks and confirmatory testing.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For an enteric Gram-negative rod, ask: oxidase, MacConkey growth, lactose, H2S, PAD, urease, indole, citrate, motility, and decarboxylases.',
          'Do not memorize one organism per test; learn the profile clusters that move you through the bench decision tree.',
          'When the colony behavior and biochemical pattern disagree, verify purity and repeat the branch-point reaction before forcing the ID.'
        ]
      }
    ]
  },
  {
    id: 'acinetobacter-stenotrophomonas',
    label: 'Acinetobacter and Stenotrophomonas',
    category: 'Bacteriology',
    title: 'Acinetobacter, Stenotrophomonas, and Similar Organisms',
    summary: 'Learn the bench approach to oxidase-negative, nonfermentative Gram-negative coccobacilli and rods, especially Acinetobacter baumannii complex and Stenotrophomonas maltophilia.',
    highlights: [
      'These organisms grow on routine media and MacConkey agar but do not follow routine Enterobacteriaceae fermentation logic.',
      'Oxidase negativity plus nonfermentative behavior, coccobacillary morphology, motility, glucose oxidation, maltose oxidation, DNase, and LDC help separate the major groups.',
      'Both Acinetobacter baumannii complex and Stenotrophomonas maltophilia are important opportunists with major resistance implications in hospitalized and immunocompromised patients.'
    ],
    cards: [
      {
        title: 'Acinetobacter baumannii Complex',
        body: 'Oxidase-negative, nonmotile, strictly aerobic coccobacilli that grow on MacConkey and may appear faintly pink-purple without true lactose fermentation; often multidrug resistant in ICU settings.'
      },
      {
        title: 'Stenotrophomonas maltophilia',
        body: 'Oxidase-negative nonfermenter that is commonly DNase positive, LDC positive, and rapidly oxidizes maltose; intrinsically resistant to carbapenems and often treated with SXT when susceptible.'
      },
      {
        title: 'Acinetobacter lwoffii Group',
        body: 'Often less saccharolytic and less clinically aggressive than A. baumannii complex, but still relevant in device-associated or bloodstream isolates.'
      },
      {
        title: 'Hospital Nonfermenter Mindset',
        body: 'These isolates are often recovered from respiratory specimens, wounds, urine, blood, catheters, and environmental reservoirs, so source and colonization versus infection matter.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a Gram-negative coccobacillus or rod that grows on MacConkey but is oxidase negative.',
          'Separate routine Enterobacteriaceae from nonfermenters by OF glucose, TSI pattern, colony behavior, and whether carbohydrate reactions fit fermentation.',
          'Acinetobacter is nonmotile and usually oxidase negative; Stenotrophomonas is oxidase negative but more rod-like and has a characteristic maltose/DNase/LDC profile.'
        ]
      },
      {
        heading: 'Acinetobacter pattern',
        items: [
          'Acinetobacter species are strictly aerobic, nonmotile, oxidase negative, catalase positive Gram-negative coccobacilli.',
          'A. baumannii complex is a major healthcare-associated pathogen in ventilator-associated pneumonia, wound infection, bacteremia, and device-associated infection.',
          'Growth at elevated temperature, glucose oxidation, hemolysis, gelatin, and commercial or molecular identification can help support species-level separation when needed.'
        ]
      },
      {
        heading: 'Stenotrophomonas pattern',
        items: [
          'Stenotrophomonas maltophilia is an oxidase-negative nonfermenter that grows on routine media and MacConkey agar.',
          'Helpful clues include DNase positivity, lysine decarboxylase positivity, and rapid oxidation of maltose.',
          'It is associated with immunocompromised hosts, cystic fibrosis or chronic lung disease, indwelling devices, broad-spectrum antibiotic exposure, and water-associated hospital reservoirs.'
        ]
      },
      {
        heading: 'Resistance mindset',
        items: [
          'A. baumannii complex commonly shows multidrug resistance, including carbapenem resistance in many healthcare settings.',
          'S. maltophilia is intrinsically resistant to carbapenems, so an imipenem-resistant oxidase-negative nonfermenter should not automatically be treated like Pseudomonas.',
          'Susceptibility testing and local reporting rules are essential because nonfermenter resistance patterns change patient management.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For oxidase-negative Gram-negative rods with MacConkey growth, first ask whether the organism is fermenting like Enterobacteriaceae or behaving like a nonfermenter.',
          'Do not let faint color on MacConkey trick you into calling Acinetobacter a lactose fermenter without OF or biochemical support.',
          'When Acinetobacter or Stenotrophomonas is suspected, connect identification to clinical source and resistance profile, not just colony name.'
        ]
      }
    ]
  },
  {
    id: 'pseudomonas-burkholderia',
    label: 'Pseudomonas and Burkholderia',
    category: 'Bacteriology',
    title: 'Pseudomonas, Burkholderia, and Similar Organisms',
    summary: 'Learn the workup for oxidase-positive nonfermenting Gram-negative rods, including fluorescent pseudomonads, Burkholderia species, Ralstonia, Brevundimonas, Acidovorax, and Pandoraea.',
    highlights: [
      'Oxidase-positive nonfermenters require OF carbohydrate logic rather than Enterobacteriaceae fermentation shortcuts.',
      'Pseudomonas aeruginosa is supported by oxidase positivity, nonfermentative glucose use, pyocyanin/pyoverdin pigment, growth at 42 C, and classic odor or clinical setting.',
      'Burkholderia pseudomallei and B. mallei are high-consequence organisms; suspicious isolates require safe handling and escalation.'
    ],
    cards: [
      {
        title: 'Pseudomonas aeruginosa',
        body: 'Oxidase-positive nonfermenter with pyocyanin and pyoverdin pigments, growth at 42 C, grape-like odor, and major roles in burns, ventilator pneumonia, CF lung disease, wounds, UTIs, and bacteremia.'
      },
      {
        title: 'Pseudomonas fluorescens and putida',
        body: 'Fluorescent environmental pseudomonads that usually do not grow at 42 C; gelatin and temperature behavior help separate them from P. aeruginosa.'
      },
      {
        title: 'Burkholderia cepacia Complex',
        body: 'Oxidase-variable to positive nonfermenters associated with cystic fibrosis, chronic granulomatous disease, contaminated solutions, and onion/soil environmental reservoirs.'
      },
      {
        title: 'Burkholderia pseudomallei and mallei',
        body: 'Select-agent Burkholderia species linked to melioidosis and glanders; colony morphology, motility, geography, animal exposure, and safety rules matter.'
      },
      {
        title: 'Ralstonia and Brevundimonas',
        body: 'Environmental water-associated opportunists that can cause outbreaks from contaminated sterile solutions, water systems, devices, or dialysis-related exposures.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with an oxidase-positive Gram-negative rod that grows aerobically and does not ferment glucose like Enterobacteriaceae.',
          'Use OF glucose, pigment, odor, motility, growth at 42 C, arginine dihydrolase, gelatin, nitrate, and colony morphology to choose the branch.',
          'Do not call every oxidase-positive nonfermenter Pseudomonas aeruginosa; several environmental organisms share parts of the profile.'
        ]
      },
      {
        heading: 'Fluorescent pseudomonads',
        items: [
          'P. aeruginosa commonly produces pyoverdin and may produce pyocyanin, giving fluorescent yellow-green and blue-green pigment clues.',
          'Growth at 42 C supports P. aeruginosa over P. fluorescens and P. putida when the rest of the profile fits.',
          'P. fluorescens and P. putida are environmental organisms that may be opportunistic, including rare refrigerated blood product or device-related events.'
        ]
      },
      {
        heading: 'Burkholderia mindset',
        items: [
          'B. cepacia complex is important in cystic fibrosis and chronic granulomatous disease and may grow on selective media such as PC or OFPBL agar.',
          'B. pseudomallei may produce dry wrinkled colonies, earthy odor, and characteristic growth on Ashdown agar; geographic exposure is a major clue.',
          'B. mallei is nonmotile and linked to glanders; suspected select-agent organisms should not be handled as routine bench curiosities.'
        ]
      },
      {
        heading: 'Other oxidase-positive nonfermenters',
        items: [
          'Ralstonia can be slow-growing and water-associated, with healthcare outbreaks tied to contaminated solutions or devices.',
          'Brevundimonas may show white or orange colonies and weak carbohydrate oxidation.',
          'Acidovorax and Pandoraea are uncommon opportunists; Pandoraea can be confused with B. cepacia complex, especially in respiratory isolates.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For oxidase-positive nonfermenters, ask: pigment, 42 C growth, ADH, gelatin, nitrate, selective media, and safety context.',
          'Treat soil-associated, wrinkled, colistin-resistant, or select-agent-suggestive profiles with extra caution.',
          'Link the ID to the patient: CF, burn wounds, ventilators, catheters, water exposure, travel, and contaminated products change the likelihood.'
        ]
      }
    ]
  },
  {
    id: 'rhizobium-ochrobactrum',
    label: 'Rhizobium and Ochrobactrum',
    category: 'Bacteriology',
    title: 'Rhizobium, Ochrobactrum, and Similar Organisms',
    summary: 'Learn the workup for environmental oxidase-positive Gram-negative rods and coccobacilli such as Rhizobium radiobacter, Ochrobactrum anthropi, Shewanella, Paracoccus, Psychrobacter, and CDC group EF-4b.',
    highlights: [
      'These organisms are often environmental, water-associated, animal-associated, or device-associated opportunists.',
      'ONPG, esculin, urease, H2S, MacConkey behavior, pigment, odor, Gram-stain shape, and device history help separate these uncommon nonfermenters.',
      'Several are low-virulence colonizers in some settings but meaningful pathogens in catheter, peritoneal dialysis, oncology, bite wound, or immunocompromised contexts.'
    ],
    cards: [
      {
        title: 'Rhizobium radiobacter',
        body: 'Oxidase-positive, often mucoid nonfermenter associated with catheters and contaminated devices; ONPG and esculin positivity help separate it from Ochrobactrum.'
      },
      {
        title: 'Ochrobactrum anthropi',
        body: 'Oxidase-positive, urease-positive, ONPG-negative organism associated with silicone catheter adherence, oncology patients, and broad beta-lactam resistance.'
      },
      {
        title: 'Shewanella putrefaciens',
        body: 'Unusual oxidase-positive nonfermenter that can produce H2S in TSI, often with environmental or marine-associated exposure clues.'
      },
      {
        title: 'CDC Group EF-4b',
        body: 'Animal bite-associated coccobacillus with poor or absent MacConkey growth and a popcorn-like odor; linked to dog and cat bite wound infections.'
      },
      {
        title: 'Paracoccus and Psychrobacter',
        body: 'Rare environmental coccobacilli with distinctive clues such as doughnut-shaped cells or better growth at cooler temperatures.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with oxidase-positive Gram-negative rods or coccobacilli that do not fit classic Pseudomonas or Burkholderia profiles.',
          'Check MacConkey growth, ONPG, esculin, urease, H2S in TSI, pigment, odor, and specimen source.',
          'Device association, animal bites, water exposure, and immunocompromise are often more useful than one isolated biochemical reaction.'
        ]
      },
      {
        heading: 'Rhizobium and Ochrobactrum',
        items: [
          'Rhizobium radiobacter often appears as a catheter or device-associated opportunist and may be ONPG positive and esculin positive.',
          'Ochrobactrum anthropi is typically ONPG negative, urease positive, and intrinsically resistant to many penicillins and cephalosporins.',
          'Both can grow on routine media and may be dismissed unless recovered from a meaningful source or repeated culture.'
        ]
      },
      {
        heading: 'Other environmental organisms',
        items: [
          'Shewanella is notable because H2S production is unusual among nonfermenters and may pair with marine or environmental exposure.',
          'Psychrobacter may grow better at cooler temperatures and can be associated with cold-environment or device-related contexts.',
          'Paracoccus may show a doughnut-like coccobacillary appearance and rare peritoneal or opportunistic infections.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'When an oxidase-positive nonfermenter does not match Pseudomonas, slow down and use source clues rather than forcing the nearest familiar name.',
          'Catheter, dialysis, oncology, bite wound, and environmental exposure histories are central to interpreting these organisms.',
          'Report depth should match clinical value: many rare environmental isolates need confirmation only when the source supports significance.'
        ]
      }
    ]
  },
  {
    id: 'chryseobacterium-sphingobacterium',
    label: 'Chryseobacterium and Sphingobacterium',
    category: 'Bacteriology',
    title: 'Chryseobacterium, Sphingobacterium, and Similar Organisms',
    summary: 'Learn the workup for yellow-pigmented oxidase-positive nonfermenting Gram-negative rods, including Elizabethkingia, Chryseobacterium, Myroides, Sphingobacterium, and Weeksella.',
    highlights: [
      'Yellow-pigmented oxidase-positive nonfermenters are separated by indole, urease, gelatinase, DNase, esculin, flexirubin pigment, colony texture, and clinical source.',
      'Elizabethkingia meningoseptica is important in neonatal meningitis and nursery outbreaks, while Chryseobacterium and Myroides are opportunists in vulnerable hosts.',
      'Many organisms in this group have unusual resistance patterns, so identification and AST should be interpreted with organism-specific rules.'
    ],
    cards: [
      {
        title: 'Elizabethkingia meningoseptica',
        body: 'Oxidase-positive, indole-positive nonfermenter associated with neonatal meningitis, pediatric outbreaks, and severe opportunistic infection.'
      },
      {
        title: 'Chryseobacterium indologenes',
        body: 'Yellow-pigmented, indole-positive organism with flexirubin-type pigment that can shift color after KOH; often linked to catheters and immunocompromised hosts.'
      },
      {
        title: 'Myroides odoratus',
        body: 'Yellow-pigmented, fruity-smelling nonfermenter that is often urease positive and may cause urinary, wound, or opportunistic infection.'
      },
      {
        title: 'Sphingobacterium',
        body: 'Pale yellow oxidase-positive nonfermenters with sphingophospholipids in the cell envelope and usually low clinical virulence.'
      },
      {
        title: 'Weeksella virosa',
        body: 'Mucoid yellow-green organism often recovered from genitourinary sources, especially in women; significance depends heavily on specimen and host context.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with an oxidase-positive nonfermenter that is yellow, yellow-green, pale yellow, or only slightly pigmented.',
          'Use indole, urease, gelatin, DNase, esculin, flexirubin reaction, MacConkey growth, and colony texture to choose the branch.',
          'Avoid treating pigment as a final ID; several unrelated nonfermenters produce yellow colonies.'
        ]
      },
      {
        heading: 'Clinical interpretation',
        items: [
          'Elizabethkingia deserves attention in neonatal meningitis, nursery outbreaks, bloodstream infection, and immunocompromised patients.',
          'Chryseobacterium and Myroides often matter most in catheter, wound, urinary, or heavily healthcare-exposed contexts.',
          'Sphingobacterium and Weeksella are uncommon opportunists; source and repeat recovery determine how aggressively to identify.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For yellow oxidase-positive nonfermenters, ask: indole, urease, flexirubin, DNase, gelatin, esculin, and clinical source.',
          'Remember that resistance may be surprising; do not apply Pseudomonas assumptions automatically.',
          'When the isolate is from a sterile site or vulnerable host, confirm the ID rather than reporting a vague yellow nonfermenter.'
        ]
      }
    ]
  },
  {
    id: 'alcaligenes-bordetella-comamonas',
    label: 'Alcaligenes and Bordetella-Like Rods',
    category: 'Bacteriology',
    title: 'Alcaligenes, Bordetella (Non-pertussis), Comamonas, and Similar Organisms',
    summary: 'Learn the workup for oxidase-positive nonfermenters such as Alcaligenes, Achromobacter, Bordetella bronchiseptica, Delftia, Comamonas, and Oligella.',
    highlights: [
      'This guide separates peritrichous and polar flagellated oxidase-positive nonfermenters using motility, rapid urease, nitrate/nitrite reduction, indole color, mannitol, and urinary or respiratory source.',
      'Achromobacter xylosoxidans and Bordetella bronchiseptica are clinically important in respiratory disease, cystic fibrosis, animal exposure, or immunocompromised hosts.',
      'Alcaligenes, Delftia, Comamonas, and Oligella are often opportunists whose significance depends on source and host risk.'
    ],
    cards: [
      {
        title: 'Bordetella bronchiseptica',
        body: 'Oxidase-positive, rapidly urease-positive, motile organism linked to animal exposure and opportunistic respiratory infection.'
      },
      {
        title: 'Alcaligenes faecalis',
        body: 'Peritrichous, oxidase-positive nonfermenter with a fruity odor and environmental opportunist behavior in urine, blood, and wounds.'
      },
      {
        title: 'Achromobacter xylosoxidans',
        body: 'Oxidase-positive nonfermenter associated with cystic fibrosis, chronic respiratory disease, contaminated fluids, and opportunistic infection.'
      },
      {
        title: 'Delftia and Comamonas',
        body: 'Polar-flagellated environmental organisms that may appear in blood, urine, or device-associated infections and need profile-based interpretation.'
      },
      {
        title: 'Oligella',
        body: 'Oxidase-positive coccobacilli recovered mainly from urinary sources; O. urethralis is nonmotile and urease negative, while O. ureolytica is motile and urease positive.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with an oxidase-positive nonfermenter that does not fit Pseudomonas, Burkholderia, or the yellow-pigmented group.',
          'Use flagellar pattern or motility clues, rapid urease, nitrate and nitrite reduction, indole, mannitol, and colony odor.',
          'Respiratory, urinary, animal-exposure, cystic fibrosis, and catheter contexts are especially useful.'
        ]
      },
      {
        heading: 'High-yield branches',
        items: [
          'Rapid urease positivity with animal exposure supports Bordetella bronchiseptica in the right setting.',
          'Nitrate and nitrite reduction to gas plus glucose oxidation points toward Achromobacter xylosoxidans.',
          'Oligella species are separated largely by motility, urease, and nitrate patterns.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Do not overcall these rare nonfermenters from low-value sources, but do not dismiss them from sterile sites or high-risk hosts.',
          'A respiratory isolate in cystic fibrosis is a different problem from a single colony in mixed surface flora.',
          'Use the roadmap for branching, then let source and susceptibility profile decide reporting depth.'
        ]
      }
    ]
  },
  {
    id: 'vibrio-aeromonas-chromobacterium',
    label: 'Vibrio and Aeromonas',
    category: 'Bacteriology',
    title: 'Vibrio, Aeromonas, Chromobacterium, and Related Organisms',
    summary: 'Learn the workup for oxidase-positive Gram-negative fermenters and water-associated organisms, including Vibrio, Aeromonas, Plesiomonas, Chromobacterium, and related genera.',
    highlights: [
      'These organisms are often oxidase positive and glucose fermenting, so they sit apart from oxidase-positive nonfermenters.',
      'TCBS colony color, sodium chloride requirement, O/129 susceptibility, DNase, decarboxylases, and water or seafood exposure are major branch points.',
      'Vibrio vulnificus and Chromobacterium violaceum can cause rapidly progressive severe disease, especially with liver disease, iron overload, or wound exposure.'
    ],
    cards: [
      {
        title: 'Vibrio cholerae',
        body: 'Nonhalophilic Vibrio that forms yellow sucrose-positive colonies on TCBS and causes profuse watery diarrhea when toxigenic O1 or O139 strains are involved.'
      },
      {
        title: 'Vibrio vulnificus',
        body: 'Halophilic marine Vibrio associated with oysters, seawater wound exposure, necrotizing soft tissue infection, and fulminant sepsis in liver disease or iron overload.'
      },
      {
        title: 'Aeromonas hydrophila Complex',
        body: 'Freshwater-associated oxidase-positive fermenter that is O/129 resistant, often DNase positive, and linked to diarrhea, cellulitis, and leech-associated infection.'
      },
      {
        title: 'Plesiomonas shigelloides',
        body: 'Freshwater-associated oxidase-positive fermenter that is O/129 susceptible and decarboxylates lysine, arginine, and ornithine.'
      },
      {
        title: 'Chromobacterium violaceum',
        body: 'Tropical soil and water organism that may produce violet violacein pigment and can cause severe septicemia and abscesses after traumatic exposure.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with an oxidase-positive Gram-negative rod that ferments glucose, then ask whether it is halophilic, water-associated, or seafood-associated.',
          'Use TCBS growth and colony color, sodium chloride requirement, O/129 susceptibility, DNase, decarboxylases, and pigment.',
          'Exposure history matters: oysters, seawater wounds, freshwater trauma, medicinal leeches, tropical soil, and travel can point to the right branch.'
        ]
      },
      {
        heading: 'Vibrio logic',
        items: [
          'TCBS yellow usually reflects sucrose fermentation, while green colonies are sucrose negative.',
          'Halophilic vibrios require sodium chloride; V. cholerae and V. mimicus do not require added NaCl.',
          'Suspected toxigenic V. cholerae requires public health-aware confirmation, including serogroup and toxin testing.'
        ]
      },
      {
        heading: 'Aeromonas and related logic',
        items: [
          'Aeromonas is freshwater-associated, often DNase positive, and typically resistant to O/129, helping separate it from Vibrio and Plesiomonas.',
          'Plesiomonas is O/129 susceptible and has a strong decarboxylase profile despite clustering near enteric organisms by some methods.',
          'Chromobacterium violaceum pigment is helpful when present, but nonpigmented strains still require exposure and biochemical correlation.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For oxidase-positive fermenters, think exposure first and then confirm with TCBS, salt, O/129, DNase, and decarboxylases.',
          'Do not put Aeromonas into routine Enterobacteriaceae logic just because it ferments glucose.',
          'Treat severe wound infection after seawater or freshwater exposure as a high-urgency clue, not trivia.'
        ]
      }
    ]
  },
  {
    id: 'sphingomonas-paucimobilis',
    label: 'Sphingomonas and Similar Organisms',
    category: 'Bacteriology',
    title: 'Sphingomonas paucimobilis and Similar Organisms',
    summary: 'Learn the workup for Sphingomonas paucimobilis and related oxidase-positive nonfermenting Gram-negative rods, including Sphingobacterium and Acidovorax-like profiles.',
    highlights: [
      'These organisms are usually oxidase-positive, nonfermenting Gram-negative rods with weak or absent MacConkey growth and environmental opportunist behavior.',
      'Yellow pigment, room-temperature motility, polymyxin B reaction, DNase, citrate, urease, esculin, and lead acetate H2S help separate the phenotypic branches.',
      'Clinical significance is source-dependent: bloodstream, catheter, respiratory, cystic fibrosis, or immunocompromised-host recovery deserves more attention than low-value surface isolation.'
    ],
    cards: [
      {
        title: 'Sphingomonas paucimobilis',
        body: 'Bright yellow, oxidase-positive nonfermenter; motility may be seen best by wet mount or cooler incubation, and susceptibility to polymyxin B helps separate it from Sphingobacterium.'
      },
      {
        title: 'Sphingomonas parapaucimobilis',
        body: 'Similar yellow oxidase-positive organism, but citrate and lead acetate H2S positivity with DNase negativity support this branch.'
      },
      {
        title: 'Sphingobacterium multivorum',
        body: 'Yellow, nonmotile, urease-positive, polymyxin-resistant nonfermenter; uncommon opportunist in respiratory, blood, or urine cultures.'
      },
      {
        title: 'Sphingobacterium spiritivorum',
        body: 'Nonmotile yellow nonfermenter that is often urease and DNase positive; interpret with source and host risk.'
      },
      {
        title: 'Acidovorax facilis',
        body: 'Unpigmented, oxidase-positive, polar-flagellated nonfermenter with optimal growth near 30 C and poor routine MacConkey recovery.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with an oxidase-positive nonfermenter that is yellow or unpigmented and does not fit Pseudomonas, Burkholderia, or the earlier environmental branches.',
          'Use pigment intensity, wet-mount motility, MacConkey growth, DNase, urease, citrate, esculin, polymyxin B, and lead acetate H2S as practical branch points.',
          'Do not force these into enteric logic; many are oxidative or asaccharolytic and may need longer incubation or organism-specific interpretation.'
        ]
      },
      {
        heading: 'Sphingomonas versus Sphingobacterium',
        items: [
          'Sphingomonas is typically motile and polymyxin B susceptible; Sphingobacterium is typically nonmotile and polymyxin resistant.',
          'Sphingobacterium species often rely on urease, DNase, and selected carbohydrate oxidation patterns for separation.',
          'A bright yellow pigment is a clue, not a final ID; Chryseobacterium-like organisms remain in the differential.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Ask whether the isolate is a true pathogen, a catheter or device isolate, or a low-significance environmental contaminant.',
          'Keep polymyxin B, DNase, urease, citrate, and H2S on the short list for this organism group.',
          'When the organism is from blood, CSF, respiratory disease in cystic fibrosis, or an immunocompromised patient, confirm the ID and review susceptibility carefully.'
        ]
      }
    ]
  },
  {
    id: 'moraxella-related-organisms',
    label: 'Moraxella and Related Organisms',
    category: 'Bacteriology',
    title: 'Moraxella and Related Organisms',
    summary: 'Learn the workup for Moraxella species and elongated Neisseria-like organisms using oxidase, catalase, MacConkey behavior, penicillin-induced elongation, butyrate, nitrate, acetate, DNase, and Loeffler digestion.',
    highlights: [
      'Moraxella and elongated Neisseria-like organisms can look like diplococci, coccobacilli, or short rods, so Gram stain morphology must be paired with growth behavior and bench reactions.',
      'Penicillin disk elongation, MacConkey growth, nitrate/nitrite reduction, acetate, DNase, butyrate, and Loeffler serum digestion are useful separation tools.',
      'Clinical context points the way: respiratory flora, conjunctivitis, dog or cat bite wounds, endocarditis, and opportunistic bacteremia are different workups.'
    ],
    cards: [
      {
        title: 'Moraxella catarrhalis',
        body: 'Oxidase-positive, catalase-positive respiratory diplococcus that is butyrate positive and often beta-lactamase positive; important in otitis media, sinusitis, and COPD exacerbation.'
      },
      {
        title: 'Moraxella canis',
        body: 'Dog and cat oral flora that can grow on MacConkey as a non-lactose fermenter and may be DNase and acetate positive.'
      },
      {
        title: 'Moraxella lacunata',
        body: 'Associated with conjunctivitis; classically pits blood agar and digests Loeffler serum slant.'
      },
      {
        title: 'Moraxella nonliquefaciens / osloensis',
        body: 'Human mucosal opportunists separated by acetate and nitrate patterns, usually interpreted with respiratory or urogenital source.'
      },
      {
        title: 'Elongated Neisseria',
        body: 'Neisseria elongata subspecies and N. weaverii can elongate near penicillin and are separated by catalase, nitrate, nitrite, glucose use, acetate, and bite or endocarditis context.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with oxidase-positive Gram-negative diplococci, coccobacilli, or short rods that do not behave like routine enterics.',
          'Check catalase, butyrate, nitrate and nitrite reduction, DNase, acetate, MacConkey growth, and whether cells elongate near penicillin.',
          'If the isolate comes from a respiratory source, decide whether it is normal flora, a true respiratory pathogen, or an invasive isolate needing full workup.'
        ]
      },
      {
        heading: 'Moraxella clues',
        items: [
          'Butyrate positivity is a strong practical clue for M. catarrhalis.',
          'Blood agar pitting and Loeffler serum digestion support M. lacunata in the right ocular context.',
          'Dog or cat bite isolates with Moraxella-like profiles should keep M. canis and N. weaverii in the differential.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Do not rely on shape alone; Moraxella-like organisms can shift between diplococcal and rod-like forms.',
          'Use source and clinical syndrome before spending time speciating every respiratory commensal.',
          'Endocarditis, sterile-site recovery, ocular disease, or bite wounds justify a deeper workup.'
        ]
      }
    ]
  },
  {
    id: 'eikenella-similar-organisms',
    label: 'Eikenella and Similar Organisms',
    category: 'Bacteriology',
    title: 'Eikenella and Similar Organisms',
    summary: 'Learn the workup for Eikenella corrodens, Methylobacterium, Weeksella, Bergeyella, and similar fastidious Gram-negative rods using pitting, odor, pigment, hemin or CO2 dependence, indole, urease, and bite-wound context.',
    highlights: [
      'Eikenella corrodens is a HACEK organism associated with human bite wounds, clenched-fist injuries, oral flora, and subacute endocarditis.',
      'Agar pitting or corrosion, bleach odor, hemin or CO2-enhanced growth, oxidase positivity, catalase negativity, and nitrate positivity support Eikenella.',
      'Methylobacterium, Weeksella, and Bergeyella add pink pigment, yellow-green mucoid colonies, indole, urease, colistin resistance, water systems, GU source, and animal exposure to the branch logic.'
    ],
    cards: [
      {
        title: 'Eikenella corrodens',
        body: 'Oxidase-positive, catalase-negative, asaccharolytic slender rod that pits agar and may smell like bleach; linked to oral flora, human bites, and endocarditis.'
      },
      {
        title: 'Methylobacterium',
        body: 'Slow-growing coral-pink environmental rod associated with water systems and catheter infections; growth favors lower temperatures and may be seen on BCYE.'
      },
      {
        title: 'Weeksella virosa',
        body: 'Mucoid yellow-green to tan organism with indole positivity and urease negativity, often recovered from genitourinary sources.'
      },
      {
        title: 'Bergeyella zoohelcum',
        body: 'Indole-positive, urease-positive, colistin-resistant organism associated with dog or cat bites and scratch wounds.'
      },
      {
        title: 'Human bite context',
        body: 'Clenched-fist wounds and oral flora infections can include mixed anaerobes, streptococci, Eikenella, and other fastidious Gram-negative rods.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a fastidious oxidase-positive Gram-negative rod that grows poorly on MacConkey or routine media.',
          'Look for agar pitting, flat spreading colony edges, bleach odor, pigment, hemin or CO2 effect, catalase, nitrate, indole, urease, and source.',
          'Human bite, animal bite, oral, catheter, water-system, and genitourinary contexts send the workup in different directions.'
        ]
      },
      {
        heading: 'Eikenella logic',
        items: [
          'Eikenella is asaccharolytic, oxidase positive, catalase negative, nitrate positive, and often pits or corrodes agar.',
          'Growth may improve with hemin or CO2, so poor routine recovery should not automatically end the workup.',
          'Its clinical weight rises in clenched-fist wounds, oral abscesses, blood cultures, and endocarditis.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Agar pitting plus bleach odor is a memorable clue, but still confirm with oxidase, catalase, nitrate, and growth requirements.',
          'Pink pigment points away from Eikenella and toward Methylobacterium-like water-system organisms.',
          'Dog or cat bite plus indole and urease positivity should keep Bergeyella in view.'
        ]
      }
    ]
  },
  {
    id: 'pasteurella-similar-organisms',
    label: 'Pasteurella and Similar Organisms',
    category: 'Bacteriology',
    title: 'Pasteurella and Similar Organisms',
    summary: 'Learn the workup for Pasteurella species and Suttonella using animal exposure, oxidase, catalase, indole, urease, ODC, MacConkey behavior, carbohydrate patterns, and penicillin susceptibility.',
    highlights: [
      'Pasteurella species are classically linked to dog and cat bites or scratches, rapid cellulitis, respiratory exposure, and invasive disease in vulnerable hosts.',
      'Most Pasteurella are oxidase-positive, glucose-fermenting, indole-positive coccobacilli with poor MacConkey growth and unusual penicillin susceptibility for a Gram-negative rod.',
      'Species-level separation uses indole, urease, ODC, sorbitol, dulcitol, mannitol, sucrose, maltose, gas, catalase, and animal source.'
    ],
    cards: [
      {
        title: 'Pasteurella multocida',
        body: 'Major dog and cat bite pathogen; oxidase positive, catalase positive, indole positive, urease negative, ODC positive, and usually penicillin susceptible.'
      },
      {
        title: 'Pasteurella canis',
        body: 'Dog-associated species that is indole positive, urease negative, ODC positive, and mannitol negative.'
      },
      {
        title: 'Pasteurella dagmatis',
        body: 'Dog and cat bite organism with delayed urease positivity and possible gas from glucose.'
      },
      {
        title: 'Pasteurella bettyae',
        body: 'Catalase-negative Pasteurella-like organism associated with obstetric and neonatal infections.'
      },
      {
        title: 'Suttonella indologenes',
        body: 'Rare ocular pathogen that can pit blood agar, is indole positive, and is nitrate negative, helping separate it from Pasteurella.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a small Gram-negative coccobacillus or rod from an animal bite, wound, respiratory source, blood, or neonatal/obstetric context.',
          'Use oxidase, catalase, indole, urease, ODC, nitrate, MacConkey growth, colony odor, and penicillin susceptibility as the first pass.',
          'Ask which animal or exposure is involved: dog, cat, bird, pig, rodent, or no clear animal source.'
        ]
      },
      {
        heading: 'Pasteurella clues',
        items: [
          'P. multocida often has a musty or mushroom-like odor and fits the classic dog or cat bite cellulitis story.',
          'Delayed urease or gas from glucose can move the workup toward other Pasteurella species.',
          'Penicillin susceptibility is an important identification clue, but final therapy still follows current AST and reporting rules.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'A bite wound culture is usually polymicrobial, so do not stop thinking after the first organism grows.',
          'Rapid swelling after a cat bite is a high-yield clinical clue for Pasteurella.',
          'Sterile-site isolates or severe infection in liver disease, asplenia, or immunocompromise should be handled with extra care.'
        ]
      }
    ]
  },
  {
    id: 'actinobacillus-aggregatibacter-kingella',
    label: 'HACEK and Similar Organisms',
    category: 'Bacteriology',
    title: 'Actinobacillus, Aggregatibacter, Kingella, Cardiobacterium, Capnocytophaga, and Similar Organisms',
    summary: 'Learn the workup for HACEK and related capnophilic oral Gram-negative rods using CO2 dependence, chocolate agar growth, star-like colonies, rosettes, gliding motility, X/V factor needs, indole, hemolysis, and endocarditis context.',
    highlights: [
      'This guide is heavily clinical-context driven: oral flora, dental disease, endocarditis, pediatric bone or joint infection, dog bite sepsis, and neutropenia matter as much as a single reaction.',
      'Aggregatibacter, Cardiobacterium, Kingella, and Eikenella are classic HACEK organisms; Capnocytophaga and related rods overlap by capnophilic growth and oral or animal exposure.',
      'Key clues include CO2 dependence, slow growth, chocolate agar recovery, X/V factor requirements, star-like colony centers, rosette Gram stains, beta-hemolysis, pitting, gliding motility, indole, and delayed oxidase or catalase reactions.'
    ],
    cards: [
      {
        title: 'Aggregatibacter actinomycetemcomitans',
        body: 'HACEK organism linked to periodontitis and endocarditis; mature colonies can show a central star-like pattern and sticky adherence.'
      },
      {
        title: 'Aggregatibacter aphrophilus / segnis',
        body: 'Oral HACEK organisms separated partly by X/V factor independence or V-factor dependence, catalase, and carbohydrate profile.'
      },
      {
        title: 'Cardiobacterium hominis',
        body: 'Pleomorphic teardrop rods in rosettes; oxidase positive, catalase negative, indole positive, and associated with subacute endocarditis.'
      },
      {
        title: 'Kingella kingae',
        body: 'Oxidase-positive, catalase-negative coccobacillus that can pit agar and show beta-hemolysis; important in pediatric bone and joint infection.'
      },
      {
        title: 'Capnocytophaga canimorsus',
        body: 'Dog-associated capnophilic rod with gliding motility; severe sepsis, DIC, and shock are major concerns in asplenia, alcohol use disorder, and immunocompromise.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a slow-growing or fastidious Gram-negative rod/coccobacillus from blood, oral source, bite wound, respiratory source, bone or joint fluid, or an immunocompromised host.',
          'Check CO2 dependence, chocolate agar recovery, oxidase, catalase, indole, urease, nitrate, hemolysis, pitting, gliding motility, X/V factor needs, and colony architecture.',
          'Do not dismiss slow blood culture growth from endocarditis patients as noise; HACEK organisms may need extended attention.'
        ]
      },
      {
        heading: 'HACEK pattern recognition',
        items: [
          'Aggregatibacter may show sticky colonies, star-like centers, and periodontitis or endocarditis associations.',
          'Cardiobacterium often appears as pleomorphic teardrop rods in rosettes and is indole positive.',
          'Kingella kingae is a pediatric bone and joint pathogen; beta-hemolysis and agar pitting are helpful clues.'
        ]
      },
      {
        heading: 'Capnocytophaga and bite logic',
        items: [
          'Capnocytophaga species are thin fusiform rods with gliding motility and CO2 preference.',
          'C. canimorsus after dog exposure can be life-threatening in asplenic or immunocompromised patients.',
          'SPS inhibition can interfere with blood culture recovery, so culture context matters when suspicion is high.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For this group, always connect the organism to source: blood/endocarditis, oral disease, dog bite, pediatric joint, or neutropenic infection.',
          'Use slow growth and fastidious media needs as clues, not as reasons to abandon the ID.',
          'If an isolate is from a sterile site, take the extra steps needed to confirm and communicate significance.'
        ]
      }
    ]
  },
  {
    id: 'haemophilus',
    label: 'Haemophilus',
    category: 'Bacteriology',
    title: 'Haemophilus',
    summary: 'Learn the workup for Haemophilus species using chocolate agar growth, X and V factor requirements, porphyrin/ALA testing, satellitism, hemolysis, biotypes, and syndrome context.',
    highlights: [
      'Haemophilus are small pleomorphic Gram-negative coccobacilli that often need enriched media, CO2, and careful interpretation of X factor, V factor, and porphyrin results.',
      'H. influenzae requires both X and V factors and is porphyrin negative; H. parainfluenzae and related V-factor-only species are porphyrin positive.',
      'Clinical context matters: meningitis, epiglottitis, otitis, sinusitis, COPD exacerbation, conjunctivitis, endocarditis, and chancroid do not all trigger the same workup.'
    ],
    cards: [
      {
        title: 'Haemophilus influenzae',
        body: 'Requires both X and V factors, is porphyrin negative, and grows on chocolate agar or as satellite colonies near V-factor-producing organisms on blood agar.'
      },
      {
        title: 'Haemophilus aegyptius',
        body: 'X and V factor dependent, porphyrin negative, and associated with acute purulent conjunctivitis and Brazilian purpuric fever.'
      },
      {
        title: 'Haemophilus haemolyticus',
        body: 'Requires X and V factors but is beta-hemolytic on horse or rabbit blood agar, helping separate it from H. influenzae.'
      },
      {
        title: 'Haemophilus parainfluenzae',
        body: 'Requires V factor only, is porphyrin positive, and is normal upper respiratory flora that may cause opportunistic respiratory infection or endocarditis.'
      },
      {
        title: 'Haemophilus ducreyi',
        body: 'Requires X factor only, grows best under specialized conditions, and causes chancroid; suspected cases require appropriate collection and safety-aware handling.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with tiny pleomorphic Gram-negative rods or coccobacilli that grow on chocolate agar but poorly or not at all on routine sheep blood agar.',
          'Use X/V factor testing, porphyrin/ALA, satellitism, hemolysis on horse or rabbit blood agar, oxidase, catalase, indole, urease, ODC, ONPG, and carbohydrate reactions.',
          'Do not use sheep blood agar hemolysis alone for Haemophilus separation; horse or rabbit blood is the classic hemolysis medium for these species.'
        ]
      },
      {
        heading: 'Factor logic',
        items: [
          'X factor is hemin; V factor is NAD. Chocolate agar releases these factors and supports growth of many Haemophilus species.',
          'Porphyrin/ALA positivity means the organism can synthesize hemin and therefore does not require X factor.',
          'Growth only around XV disks supports X plus V dependence, while growth around V and XV supports V-only dependence.'
        ]
      },
      {
        heading: 'Species logic',
        items: [
          'H. influenzae is X/V dependent, porphyrin negative, nonhemolytic, and classically associated with respiratory disease and invasive infection.',
          'H. aegyptius resembles H. influenzae but is tied to conjunctivitis and Brazilian purpuric fever.',
          'H. haemolyticus is X/V dependent and beta-hemolytic on horse or rabbit blood.',
          'H. parainfluenzae is V-factor dependent, porphyrin positive, often sucrose positive, and may appear in endocarditis or respiratory workups.',
          'H. ducreyi is an STI pathogen; painful genital ulcer disease should trigger collection and reporting steps specific to local policy.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'If a pleomorphic Gram-negative coccobacillus grows on chocolate but not sheep blood, think Haemophilus before forcing enteric logic.',
          'Pair factor requirements with porphyrin; the two results explain each other and prevent many memorization errors.',
          'For sterile-site isolates, suspected Hib, chancroid, or outbreak-associated conjunctivitis, confirm and communicate according to laboratory and public health procedures.'
        ]
      }
    ]
  },
  {
    id: 'bartonella-afipia',
    label: 'Bartonella and Afipia',
    category: 'Bacteriology',
    title: 'Bartonella and Afipia',
    summary: 'Learn the workup logic for Bartonella and Afipia: slow growth, specialized media, inert biochemical profiles, vector or cat exposure, and when serology or molecular testing is more useful than routine culture.',
    highlights: [
      'Bartonella are very slow-growing, fastidious Gram-negative rods that are often oxidase, catalase, and urease negative and may require prolonged incubation.',
      'B. henselae is tied to cat scratch disease, bacillary angiomatosis, peliosis hepatis, and culture-negative endocarditis; B. quintana is louse-associated; B. bacilliformis is sandfly-associated.',
      'Afipia species are oxidase positive, weakly catalase positive, urease positive, motile rods that can grow on CYE or chocolate agar but usually fail on MacConkey.'
    ],
    cards: [
      {
        title: 'Bartonella henselae',
        body: 'Cat-associated Bartonella species linked to cat scratch disease, bacillary angiomatosis, peliosis hepatis, and culture-negative endocarditis.'
      },
      {
        title: 'Bartonella quintana',
        body: 'Human body louse-associated species that causes trench fever, chronic bacteremia, endocarditis, and bacillary angiomatosis in vulnerable hosts.'
      },
      {
        title: 'Bartonella bacilliformis',
        body: 'Sandfly-transmitted organism associated with Carrion disease, including acute Oroya fever and chronic verruga peruana.'
      },
      {
        title: 'Afipia felis',
        body: 'Slow-growing oxidase-positive, urease-positive, motile Gram-negative rod; nitrate positivity helps separate it from A. broomeae.'
      },
      {
        title: 'Culture mindset',
        body: 'Bartonella workups often rely on exposure history, serology, histopathology, molecular methods, and prolonged specialized culture rather than routine bench reactions.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with a slow-growing fastidious Gram-negative rod or a compatible syndrome such as cat scratch disease, culture-negative endocarditis, trench fever, or bacillary angiomatosis.',
          'Bartonella species are usually very inert in routine reactions: oxidase negative, catalase negative, urease negative, and slow to appear on chocolate or enriched blood media.',
          'Afipia is more reactive: oxidase positive, weakly catalase positive, urease positive, motile, and able to grow slowly on CYE or chocolate agar.'
        ]
      },
      {
        heading: 'Clinical anchors',
        items: [
          'Cat exposure and regional lymphadenitis support B. henselae, especially when routine cultures are unrevealing.',
          'Body lice and relapsing fever-like illness support B. quintana.',
          'Travel or residence in Andean regions with sandfly exposure supports B. bacilliformis.',
          'Immunocompromised host plus vascular skin lesions should raise concern for bacillary angiomatosis.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Do not expect Bartonella to behave like a routine Gram-negative rod on MacConkey or a standard biochemical strip.',
          'When the syndrome fits, think about serology, molecular testing, tissue stain, and prolonged incubation early.',
          'For suspected endocarditis with negative routine cultures, fastidious organisms belong in the differential.'
        ]
      }
    ]
  },
  {
    id: 'campylobacter-arcobacter-helicobacter',
    label: 'Campylobacter, Arcobacter, and Helicobacter',
    category: 'Bacteriology',
    title: 'Campylobacter, Arcobacter, and Helicobacter',
    summary: 'Learn the workup for curved and spiral Gram-negative rods using microaerophilic growth, temperature tolerance, hippurate, indoxyl acetate, urease, and susceptibility patterns.',
    highlights: [
      'Campylobacter are curved or seagull-shaped Gram-negative rods that grow best under microaerophilic conditions; many enteric species grow at 42 C.',
      'C. jejuni is classically hippurate positive, while C. coli is hippurate negative and indoxyl acetate positive.',
      'Helicobacter pylori is a curved gastric organism with strong rapid urease activity, tied to chronic gastritis, peptic ulcer disease, gastric adenocarcinoma, and MALT lymphoma.'
    ],
    cards: [
      {
        title: 'Campylobacter jejuni',
        body: 'Oxidase positive, catalase positive, hippurate positive, grows at 42 C, and is strongly associated with poultry-linked acute gastroenteritis.'
      },
      {
        title: 'Campylobacter coli',
        body: 'Similar enteric Campylobacter but hippurate negative and often indoxyl acetate positive.'
      },
      {
        title: 'Campylobacter fetus',
        body: 'More associated with bacteremia, endocarditis, septic arthritis, pregnancy, and immunocompromised hosts; does not follow the same 42 C enteric pattern.'
      },
      {
        title: 'Arcobacter',
        body: 'Curved rods that are more aerotolerant than Campylobacter and can grow at lower temperatures, associated with diarrheal illness and water or poultry exposure.'
      },
      {
        title: 'Helicobacter pylori',
        body: 'Curved gastric organism with rapid strong urease activity, oxidase positivity, catalase positivity, and microaerophilic growth.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with curved, gull-wing, spiral, or corkscrew-like Gram-negative rods from stool, blood, gastric biopsy, or compatible clinical context.',
          'Use atmosphere, temperature, hippurate, indoxyl acetate, catalase, oxidase, urease, and selective media to decide the branch.',
          'Microaerophilic requirements matter: routine aerobic incubation can miss or weaken recovery.'
        ]
      },
      {
        heading: 'Campylobacter logic',
        items: [
          'C. jejuni is hippurate positive and grows at 42 C; this is one of the highest-yield species-level clues.',
          'C. coli is hippurate negative and commonly indoxyl acetate positive.',
          'C. fetus is more invasive and systemic, especially in vulnerable hosts, and does not behave like a routine thermotolerant stool isolate.'
        ]
      },
      {
        heading: 'Helicobacter logic',
        items: [
          'H. pylori testing often uses urease-based methods, histology, stool antigen, breath testing, culture, or molecular methods depending on the clinical workflow.',
          'Rapid urease positivity makes biological sense because ammonia production helps the organism survive gastric acidity.',
          'Do not treat a gastric organism workup like a stool Campylobacter workup; specimen and clinical question are different.'
        ]
      }
    ]
  },
  {
    id: 'legionella',
    label: 'Legionella',
    category: 'Bacteriology',
    title: 'Legionella',
    summary: 'Learn the workup for Legionella using BCYE agar, L-cysteine and iron dependence, urinary antigen and DFA concepts, faint Gram stain behavior, water exposure, and pneumonia syndromes.',
    highlights: [
      'Legionella are faintly staining Gram-negative rods that usually fail on routine blood or chocolate agar and require buffered charcoal yeast extract agar with L-cysteine and iron.',
      'L. pneumophila is the major cause of Legionnaires disease and Pontiac fever and is associated with aerosolized water systems.',
      'Failure to grow on BCYE without cysteine is a key culture clue; some species fluoresce under long-wave UV or show weak acid-fastness in tissue.'
    ],
    cards: [
      {
        title: 'Legionella pneumophila',
        body: 'Requires L-cysteine and iron on BCYE, commonly hippurate and gelatinase positive, and causes Legionnaires disease and Pontiac fever.'
      },
      {
        title: 'Legionella micdadei',
        body: 'Cysteine-dependent species that may be weakly acid-fast in tissue and is associated with pneumonia in immunocompromised patients.'
      },
      {
        title: 'Fluorescent Legionella',
        body: 'Some species such as L. bozemanii, L. dumoffii, and L. anisa can show blue-white fluorescence on BCYE under long-wave UV.'
      },
      {
        title: 'Exposure clue',
        body: 'Cooling towers, potable water, hot tubs, plumbing systems, and healthcare water systems are classic exposure contexts.'
      },
      {
        title: 'Testing clue',
        body: 'Culture, urinary antigen, direct fluorescent antibody, serology, and molecular tests answer different questions; culture remains important for outbreak work.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with severe atypical pneumonia, compatible exposure, or faintly staining rods that do not recover on routine media.',
          'Use BCYE with and without L-cysteine to confirm the growth requirement pattern.',
          'Remember that sputum Gram stain may be unrevealing even when Legionella is clinically important.'
        ]
      },
      {
        heading: 'Culture logic',
        items: [
          'Growth on BCYE with cysteine and failure on BCYE without cysteine supports Legionella.',
          'L. pneumophila is commonly hippurate positive and gelatinase positive.',
          'Blue-white fluorescence or weak acid-fastness can help organize non-pneumophila species in the right context.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Do not rule out Legionella because blood agar and chocolate agar are negative.',
          'For pneumonia outbreaks, water exposure and culture recovery matter because public health investigation may require isolates.',
          'Use urinary antigen strengths and limits correctly; it is not a universal test for every Legionella species.'
        ]
      }
    ]
  },
  {
    id: 'brucella',
    label: 'Brucella',
    category: 'Bacteriology',
    title: 'Brucella',
    summary: 'Learn the safety-aware workup for Brucella species using exposure history, slow small coccobacillary growth, oxidase, catalase, rapid urease, CO2 requirement, H2S, dye inhibition, and strict escalation rules.',
    highlights: [
      'Brucella are small aerobic Gram-negative coccobacilli and important laboratory-acquired infection risks; suspected isolates require immediate safety escalation.',
      'Animal reservoirs are high-yield: cattle for B. abortus, sheep and goats for B. melitensis, swine for B. suis, and dogs for B. canis.',
      'Rapid urease, CO2 requirement, H2S production, and thionine/basic fuchsin inhibition help separate species, but routine bench overwork is not the right response to a suspicious isolate.'
    ],
    cards: [
      {
        title: 'Brucella abortus',
        body: 'Cattle-associated species; many strains require CO2, produce H2S, and are urease positive within hours.'
      },
      {
        title: 'Brucella melitensis',
        body: 'Sheep and goat-associated species, highly virulent for humans, classically linked to unpasteurized dairy and undulant fever.'
      },
      {
        title: 'Brucella suis',
        body: 'Swine-associated species; rapid urease and dye inhibition patterns support species workup in reference settings.'
      },
      {
        title: 'Brucella canis',
        body: 'Dog-associated species, often H2S negative and rapidly urease positive; still requires safety-aware handling.'
      },
      {
        title: 'Safety clue',
        body: 'A tiny, slow-growing oxidase-positive, catalase-positive, urease-positive coccobacillus from blood with animal exposure is not a casual bench isolate.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with fever, sweats, animal exposure, unpasteurized dairy, occupational exposure, or a slow-growing tiny Gram-negative coccobacillus from blood or sterile site.',
          'If Brucella is possible, stop routine manipulation and follow laboratory safety, notification, and reference-lab procedures.',
          'Do not sniff plates, do not create aerosols, and do not perform unnecessary open-bench biochemical testing.'
        ]
      },
      {
        heading: 'Species logic',
        items: [
          'B. abortus is classically cattle-associated and often CO2 dependent.',
          'B. melitensis is classically sheep/goat-associated and highly virulent for humans.',
          'B. suis is classically swine-associated; B. canis is dog-associated.',
          'Urease speed, H2S, and dye inhibition belong to controlled, policy-driven workflows.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For Brucella, the correct student answer is often recognition and escalation, not more testing.',
          'Exposure history is part of the identification pattern, not optional trivia.',
          'Treat possible Brucella as a biosafety event until ruled out by appropriate procedures.'
        ]
      }
    ]
  },
  {
    id: 'bordetella-pertussis-parapertussis',
    label: 'Bordetella pertussis and Related Species',
    category: 'Bacteriology',
    title: 'Bordetella pertussis, Bordetella parapertussis, and Related Species',
    summary: 'Learn the workup for pertussis-associated Bordetella using nasopharyngeal collection, Regan-Lowe or Bordet-Gengou media, oxidase, urease, motility, nitrate, colony timing, and respiratory syndrome context.',
    highlights: [
      'B. pertussis is a strict human pathogen that grows slowly on specialized media and forms tiny pearl-like or mercury-drop colonies.',
      'B. parapertussis grows faster, is oxidase negative, and becomes urease positive within about 24 hours.',
      'B. bronchiseptica is rapidly urease positive, motile, nitrate positive, grows on routine media including MacConkey, and is associated with animal respiratory disease and opportunistic human infection.'
    ],
    cards: [
      {
        title: 'Bordetella pertussis',
        body: 'Oxidase positive, catalase positive, urease negative, nonmotile, nitrate negative, and slow-growing on Regan-Lowe or Bordet-Gengou agar.'
      },
      {
        title: 'Bordetella parapertussis',
        body: 'Oxidase negative, urease positive in about 24 hours, nonmotile, and faster-growing than B. pertussis.'
      },
      {
        title: 'Bordetella bronchiseptica',
        body: 'Oxidase positive, rapidly urease positive, motile, nitrate positive, and able to grow on sheep blood and MacConkey agar.'
      },
      {
        title: 'Specimen clue',
        body: 'Nasopharyngeal swab or aspirate collected early in illness is more useful than late specimens after prolonged cough.'
      },
      {
        title: 'Syndrome clue',
        body: 'Catarrhal, paroxysmal, and convalescent stages shape test yield; PCR, culture, and serology have different windows of usefulness.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with pertussis-like illness, appropriate nasopharyngeal specimen, and a request for culture or molecular detection.',
          'Use Regan-Lowe or Bordet-Gengou media when culture is needed; routine media are not sufficient for B. pertussis.',
          'Use oxidase, urease speed, motility, nitrate, growth time, and routine-media growth to separate the major species.'
        ]
      },
      {
        heading: 'Species logic',
        items: [
          'B. pertussis grows slowly, is urease negative, nonmotile, and forms shiny small colonies on specialized media.',
          'B. parapertussis is oxidase negative and urease positive within about a day.',
          'B. bronchiseptica is motile, rapidly urease positive, nitrate positive, and more robust on routine media.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Specimen quality and illness timing matter as much as the organism profile.',
          'Do not expect B. pertussis to behave like the non-pertussis Bordetella branch from earlier chapters.',
          'Use public health-aware reporting and infection-control thinking for suspected pertussis.'
        ]
      }
    ]
  },
  {
    id: 'francisella',
    label: 'Francisella',
    category: 'Bacteriology',
    title: 'Francisella',
    summary: 'Learn the safety-aware workup for Francisella using cysteine requirement, faint Gram stain morphology, oxidase, weak catalase, slow growth, exposure history, and tularemia escalation rules.',
    highlights: [
      'Francisella tularensis is a high-risk, very low infectious dose organism; suspicious isolates require immediate biosafety and public health escalation.',
      'F. tularensis is a tiny faintly staining Gram-negative coccobacillus that requires cysteine or sulfhydryl compounds and grows slowly.',
      'F. philomiragia differs by growing without cysteine requirement, oxidase positivity, gelatinase positivity, 6% NaCl growth, H2S production, and near-drowning or immunocompromised-host context.'
    ],
    cards: [
      {
        title: 'Francisella tularensis type A',
        body: 'North American tularemia agent; cysteine dependent, oxidase negative, weakly catalase positive, urease negative, and highly infectious.'
      },
      {
        title: 'Francisella tularensis type B',
        body: 'Cysteine-dependent tularemia agent often associated with milder disease in Europe, Asia, and North America.'
      },
      {
        title: 'Francisella philomiragia',
        body: 'Opportunistic species linked to near-drowning and immunocompromise; oxidase positive and not cysteine dependent.'
      },
      {
        title: 'Exposure clue',
        body: 'Rabbit, tick, deer fly, aerosol, animal handling, landscaping, and laboratory exposure history can be decisive.'
      },
      {
        title: 'Safety clue',
        body: 'A suspicious tiny slow-growing coccobacillus should not be repeatedly manipulated on the open bench.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with ulceroglandular disease, pneumonic tularemia, compatible animal or arthropod exposure, or a tiny slow-growing coccobacillus from a sterile site.',
          'If F. tularensis is possible, stop routine manipulation and follow laboratory safety, notification, and reference procedures.',
          'Culture may need cysteine-enriched media such as cystine heart agar, chocolate with enrichment, or BCYE depending on protocol.'
        ]
      },
      {
        heading: 'Species logic',
        items: [
          'F. tularensis is cysteine dependent, oxidase negative, weakly catalase positive, and urease negative.',
          'F. philomiragia is not cysteine dependent, is oxidase positive, gelatinase positive, and can grow in higher salt.',
          'Clinical form and exposure history help decide whether tularemia is plausible before the bench profile is complete.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For Francisella, recognition and escalation are part of identification.',
          'Do not let weak staining or tiny colonies lead to casual repeat manipulation.',
          'Always connect the bench finding to exposure history and syndrome.'
        ]
      }
    ]
  },
  {
    id: 'streptobacillus-spirillum',
    label: 'Streptobacillus and Spirillum',
    category: 'Bacteriology',
    title: 'Streptobacillus moniliformis and Spirillum minus',
    summary: 'Learn the rat-bite fever workup for Streptobacillus moniliformis and Spirillum minus using morphology, culture behavior, SPS inhibition, supplemented media, and clinical syndrome.',
    highlights: [
      'Streptobacillus moniliformis is a pleomorphic Gram-negative rod that may form chains with bulbous swellings and requires enriched media for culture.',
      'S. moniliformis can be inhibited by sodium polyanethole sulfonate in standard blood culture bottles, so culture system choice matters.',
      'Spirillum minus causes sodoku, is not routinely cultured on artificial media, and is diagnosed by direct visualization or specialized methods.'
    ],
    cards: [
      {
        title: 'Streptobacillus moniliformis',
        body: 'Culturable rat-bite fever agent with pleomorphic chains, bulbar swellings, fried-egg colony forms, and SPS inhibition risk.'
      },
      {
        title: 'Spirillum minus',
        body: 'Spirillary rat-bite fever agent associated with sodoku; helical organism that is not grown on routine artificial media.'
      },
      {
        title: 'Rat-bite fever',
        body: 'Fever, rash, migratory arthralgia or arthritis, and rat exposure or contaminated food can point to Streptobacillus moniliformis.'
      },
      {
        title: 'Sodoku',
        body: 'Relapsing fever, re-ulcerating bite wound, lymphadenopathy, and rash without prominent arthritis support Spirillum minus.'
      },
      {
        title: 'Culture clue',
        body: 'Supplemented media, CO2, moist incubation, and avoidance of SPS inhibition may be needed for Streptobacillus recovery.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with rat exposure, rat bite, contaminated food or milk exposure, fever, rash, arthralgia, arthritis, lymphadenopathy, or a compatible Gram stain.',
          'S. moniliformis is pleomorphic and may show tangled chains, clubbed or bulbar swellings, and string-of-pearls morphology.',
          'S. minus is helical and not routinely culturable, so direct visualization and specialized methods matter more than routine culture.'
        ]
      },
      {
        heading: 'Culture logic',
        items: [
          'S. moniliformis requires enriched media containing blood, serum, or ascitic fluid and may grow best with CO2 and moisture.',
          'SPS in standard blood culture bottles may inhibit growth; this is a major practical pitfall.',
          'Broth may show fluffy growth near the bottom, and colonies may have a fried-egg appearance due to L-form behavior.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Exposure history is the shortcut: rat bite, pet rat, laboratory rat, or contaminated food can unlock the diagnosis.',
          'A negative routine culture does not rule out rat-bite fever organisms.',
          'Separate streptobacillary rat-bite fever from sodoku by culture behavior, morphology, arthritis pattern, and wound relapse.'
        ]
      }
    ]
  },
  {
    id: 'neisseria-moraxella-catarrhalis',
    label: 'Neisseria and Moraxella catarrhalis',
    category: 'Bacteriology',
    title: 'Neisseria and Moraxella catarrhalis',
    summary: 'Learn the workup for Gram-negative cocci and diplococci using oxidase, colony morphology, selective media, CTA or rapid carbohydrate utilization, ONPG, butyrate, DNase, and specimen source.',
    highlights: [
      'Neisseria and Moraxella catarrhalis are oxidase-positive Gram-negative cocci or diplococci, but their clinical meaning depends heavily on body site.',
      'N. gonorrhoeae uses glucose but not maltose; N. meningitidis uses glucose and maltose; N. lactamica uses glucose, maltose, and lactose and is ONPG positive.',
      'M. catarrhalis is a respiratory diplococcus that is butyrate esterase positive, DNase positive, often beta-lactamase positive, and classically has a hockey-puck colony behavior.'
    ],
    cards: [
      {
        title: 'Neisseria gonorrhoeae',
        body: 'Oxidase-positive kidney-bean diplococcus that uses glucose only among the classic CTA sugars and is clinically urgent in genital, neonatal eye, and disseminated infection contexts.'
      },
      {
        title: 'Neisseria meningitidis',
        body: 'Oxidase-positive diplococcus that uses glucose and maltose, grows on blood and chocolate agar, and has urgent meningitis or meningococcemia significance from sterile sites.'
      },
      {
        title: 'Neisseria lactamica',
        body: 'Commensal upper respiratory Neisseria, especially in children; glucose, maltose, lactose, and ONPG positivity help separate it from N. meningitidis.'
      },
      {
        title: 'Commensal Neisseria',
        body: 'N. sicca, N. mucosa, N. subflava/flavescens group, N. cinerea, and N. polysaccharea can resemble pathogens, so source and full profile matter.'
      },
      {
        title: 'Moraxella catarrhalis',
        body: 'Oxidase-positive, butyrate-positive, DNase-positive respiratory diplococcus associated with otitis media, sinusitis, and COPD exacerbations.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Start with Gram-negative cocci, diplococci, or coccobacilli, then confirm oxidase from an appropriate medium.',
          'Use specimen source immediately: genital, CSF, blood, respiratory, eye, throat, or mixed flora changes the urgency and the reporting rules.',
          'Chocolate agar, blood agar, selective gonococcal media, capnophilic incubation, and transport conditions all affect recovery.'
        ]
      },
      {
        heading: 'Neisseria logic',
        items: [
          'N. gonorrhoeae is glucose positive, maltose negative, lactose negative, and sucrose negative; symptomatic male urethral smears with intracellular diplococci are high-yield.',
          'N. meningitidis is glucose positive and maltose positive; blood or CSF isolates require urgent communication and infection-control awareness.',
          'N. lactamica is glucose, maltose, lactose, and ONPG positive, which helps prevent confusion with N. meningitidis.',
          'Commensal Neisseria may be pigmented, mucoid, wrinkled, sucrose positive, or weakly reactive, so do not overcall pathogens from low-risk respiratory sources.'
        ]
      },
      {
        heading: 'Moraxella catarrhalis logic',
        items: [
          'M. catarrhalis is oxidase positive, catalase positive, butyrate esterase positive, DNase positive, and typically does not acidify the classic Neisseria carbohydrate panel.',
          'The hockey-puck sign describes colonies that can be pushed intact across agar.',
          'Beta-lactamase is common, so nitrocefin or AST context matters for reporting.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For Gram-negative diplococci, the source is part of the ID, not an afterthought.',
          'Use carbohydrate utilization and ONPG to separate pathogenic Neisseria from commensals.',
          'Direct smear findings, sterile-site isolates, suspected meningococcemia, and suspected gonorrhea should follow local reporting and public health procedures.'
        ]
      }
    ]
  },
  {
    id: 'anaerobic-bacteriology-lab-considerations',
    label: 'Anaerobic Bacteriology Lab Considerations',
    category: 'Bench Workflows',
    title: 'Anaerobic Bacteriology: Laboratory Considerations',
    summary: 'Learn the front-end workflow for anaerobic culture: appropriate specimens, transport, direct Gram stain value, oxygen-sensitive handling, anaerobic incubation systems, and first-pass identification logic.',
    highlights: [
      'Anaerobic culture succeeds or fails before the plate is read: specimen selection, rapid transport, and protection from oxygen are critical.',
      'Aspirates, tissue, biopsy material, and normally sterile fluids are generally better anaerobic specimens than superficial swabs.',
      'Anaerobic processing relies on reduced media, anaerobic atmosphere systems, oxygen indicators, aerotolerance checks, and morphology-driven presumptive identification.'
    ],
    cards: [
      {
        title: 'Good specimens',
        body: 'Tissue, aspirates, abscess material, deep wounds, sterile fluids, and blood cultures can support anaerobic recovery when collected and transported correctly.'
      },
      {
        title: 'Poor specimens',
        body: 'Superficial swabs, expectorated sputum, voided urine, stool for routine anaerobic culture, and sites with heavy normal flora usually create misleading results.'
      },
      {
        title: 'Transport matters',
        body: 'Use anaerobic transport devices or sealed containers promptly; oxygen exposure can kill strict anaerobes and distort the culture.'
      },
      {
        title: 'Direct Gram stain',
        body: 'Gram stain helps judge specimen quality, mixed flora, morphology, spores, WBCs, and whether culture recovery matches what was seen directly.'
      },
      {
        title: 'Anaerobic systems',
        body: 'Jars, pouches, chambers, gas generators, catalysts, and oxygen indicators create and verify low-oxygen incubation conditions.'
      }
    ],
    sections: [
      {
        heading: 'Specimen and transport',
        items: [
          'Collect from the actual infected site, not from surface drainage when a deeper specimen is possible.',
          'Prefer aspirates, tissue, biopsy material, abscess contents, and sterile body fluids over swabs.',
          'Avoid drying and oxygen exposure; move specimens into anaerobic transport quickly.',
          'Reject or qualify specimens that cannot reasonably answer an anaerobic culture question.'
        ]
      },
      {
        heading: 'Processing logic',
        items: [
          'Set up nonselective enriched anaerobic blood agar plus selective/differential media based on source and local protocol.',
          'Use reduced media and incubate long enough for slow anaerobes before declaring no growth.',
          'Compare anaerobic growth with aerobic or CO2 growth when the oxygen relationship is uncertain.',
          'Use colony odor, pigment, fluorescence, hemolysis, swarming, pitting, and Gram stain morphology as early clues.'
        ]
      },
      {
        heading: 'Identification logic',
        items: [
          'First decide oxygen tolerance, Gram reaction, morphology, and whether spores are present.',
          'For anaerobic Gram-negative rods, special-potency disks, 20% bile, BBE, LKV, pigment, fluorescence, indole, and catalase are common branch points.',
          'For anaerobic Gram-positive rods, spore formation separates Clostridium-like organisms from non-spore-forming rods.',
          'For anaerobic cocci, Gram reaction, arrangement, SPS or special disk patterns, and clinical source help organize the workup.'
        ]
      },
      {
        heading: 'Safety and reporting',
        items: [
          'Anaerobic infections are often polymicrobial, so report structure and clinical source matter.',
          'Do not identify every low-value mixed anaerobic isolate to species when the result will not be clinically meaningful.',
          'Escalate unusual morphology, toxin-associated syndromes, sterile-site isolates, or profiles requiring reference confirmation.'
        ]
      }
    ]
  },
  {
    id: 'overview-anaerobic-organisms',
    label: 'Overview of Anaerobic Organisms',
    category: 'Bacteriology',
    title: 'Overview of Anaerobic Organisms',
    summary: 'Learn the organism-level map for anaerobes: Gram-negative rods, Gram-negative cocci, Gram-positive anaerobic cocci, spore-forming Gram-positive rods, and non-spore-forming Gram-positive rods.',
    highlights: [
      'The anaerobe roadmap begins with Gram stain morphology and oxygen tolerance, then uses selective media and key biochemical patterns.',
      'Anaerobic Gram-negative rods include Bacteroides, Prevotella, Porphyromonas, Fusobacterium, Bilophila, and related groups.',
      'Anaerobic Gram-positive rods split first by spore formation: Clostridium-like organisms versus non-spore-forming rods such as Actinomyces, Cutibacterium, Eggerthella, and Lactobacillus-like organisms.'
    ],
    cards: [
      {
        title: 'Anaerobic Gram-negative rods',
        body: 'Use bile resistance, BBE, LKV, pigment, fluorescence, indole, catalase, and special-potency disk patterns to separate major groups.'
      },
      {
        title: 'Bacteroides fragilis group',
        body: 'Bile-resistant anaerobic Gram-negative rods that often grow on BBE; clinically important in intra-abdominal and abscess infections.'
      },
      {
        title: 'Pigmented anaerobes',
        body: 'Prevotella and Porphyromonas may produce dark pigment; UV fluorescence and vancomycin susceptibility help separate related groups.'
      },
      {
        title: 'Clostridium-like rods',
        body: 'Anaerobic spore-forming Gram-positive rods; toxin syndromes, hemolysis, lecithinase, lipase, and colony morphology guide presumptive ID.'
      },
      {
        title: 'Anaerobic cocci',
        body: 'Gram-positive anaerobic cocci and Gram-negative anaerobic cocci are often part of mixed mucosal infections and require source-aware interpretation.'
      }
    ],
    sections: [
      {
        heading: 'First organism split',
        items: [
          'Confirm anaerobic growth and compare with aerobic growth when oxygen tolerance is unclear.',
          'Use Gram stain morphology: Gram-negative rods, Gram-negative cocci, Gram-positive cocci, spore-forming Gram-positive rods, or non-spore-forming Gram-positive rods.',
          'Keep specimen source attached to the result because many anaerobes are normal flora at mucosal sites.'
        ]
      },
      {
        heading: 'Anaerobic Gram-negative rods',
        items: [
          'Bacteroides fragilis group is typically bile resistant and grows on BBE; esculin hydrolysis creates darkening around colonies.',
          'Prevotella often resists vancomycin and kanamycin, may be colistin susceptible, and pigmented strains may fluoresce brick red.',
          'Porphyromonas is often vancomycin susceptible and may be indole positive with dark pigment but no UV fluorescence for key species.',
          'Fusobacterium often shows slender or fusiform morphology and uses indole, bile, and disk patterns for separation.',
          'Bilophila wadsworthia grows slowly on BBE and can show black-centered colonies from H2S.'
        ]
      },
      {
        heading: 'Anaerobic Gram-positive rods',
        items: [
          'Spore-forming rods move toward Clostridium-like workups; look for hemolysis, lecithinase, lipase, reverse CAMP, swarming, and toxin context.',
          'Non-spore-forming rods include Actinomyces, Cutibacterium, Eggerthella, Lactobacillus-like organisms, and other diphtheroid-like anaerobes.',
          'Branching rods, sulfur granules, acne-associated isolates, blood culture contaminants, and sterile-site recovery carry different meaning.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Anaerobic identification is not one test; it is oxygen relationship plus morphology plus selective media plus source.',
          'Polymicrobial infection is expected, especially in abscess, bite, pelvic, diabetic foot, aspiration, and intra-abdominal specimens.',
          'Use the anaerobe roadmap for species logic after the specimen and oxygen questions make sense.'
        ]
      }
    ]
  },
  {
    id: 'mycobacteria',
    label: 'Mycobacteria',
    category: 'Bacteriology',
    title: 'Mycobacteria',
    summary: 'Learn the bench framework for Mycobacterium tuberculosis complex and nontuberculous mycobacteria: acid-fast microscopy, safe specimen processing, mycobacterial culture, NAAT, Runyon groups, and key phenotypic clues.',
    highlights: [
      'Mycobacteria have lipid-rich mycolic acid cell walls, so acid-fast stains and special culture systems are central to the workup.',
      'Suspected M. tuberculosis complex is a biosafety and public health event; routine open-bench manipulation should stop once the risk pattern is recognized.',
      'Nontuberculous mycobacteria are organized by growth rate, pigment production, temperature preference, source, and targeted biochemical or molecular identification.'
    ],
    cards: [
      {
        title: 'M. tuberculosis Complex',
        body: 'Includes M. tuberculosis and related complex members; NAAT, culture, MPT64/MPB64 antigen methods, and susceptibility testing drive clinically actionable reporting.'
      },
      {
        title: 'M. avium Complex',
        body: 'Slow-growing nonchromogenic NTM associated with pulmonary disease, disseminated disease in advanced immunocompromise, and cervical lymphadenitis.'
      },
      {
        title: 'Photochromogens',
        body: 'Organisms such as M. kansasii and M. marinum develop yellow pigment after light exposure; M. marinum favors lower incubation temperature.'
      },
      {
        title: 'Scotochromogens',
        body: 'Pigmented in the dark; M. gordonae is a common water-associated contaminant, while M. szulgai and related species can be clinically significant.'
      },
      {
        title: 'Rapid Growers',
        body: 'M. fortuitum, M. chelonae, and M. abscessus groups grow within about 7 days and are important in wounds, catheters, devices, and pulmonary disease.'
      }
    ],
    sections: [
      {
        heading: 'First bench split',
        items: [
          'Step out of routine Gram-positive or Gram-negative logic when rods are beaded, poorly Gram staining, acid-fast, or linked to chronic pulmonary, disseminated, skin, soft tissue, or device infection.',
          'Use acid-fast smear as a rapid burden clue, but remember that smear negativity does not exclude mycobacterial disease.',
          'For suspected tuberculosis, use approved airborne and laboratory biosafety workflow before opening, concentrating, or manipulating specimens and cultures.'
        ]
      },
      {
        heading: 'Specimen processing',
        items: [
          'Respiratory workups commonly use multiple properly collected sputum specimens; bronchoscopy material, gastric aspirates, tissue, sterile fluids, urine, blood, and marrow may be appropriate by syndrome.',
          'NALC-NaOH digestion and decontamination liquefies respiratory material and suppresses contaminating flora before concentration and inoculation.',
          'Avoid pooling specimens and avoid rejecting the mycobacterial question just because routine bacterial culture is negative.'
        ]
      },
      {
        heading: 'Culture and direct detection',
        items: [
          'Culture is required for recovery, confirmation, and susceptibility testing; common systems include Lowenstein-Jensen, Middlebrook agar, and liquid broth systems such as MGIT.',
          'Liquid culture is usually faster than solid culture, while solid media help recognize colony morphology, pigment, and mixed growth.',
          'NAAT can rapidly detect M. tuberculosis complex and selected resistance markers directly from appropriate specimens, but culture remains important.'
        ]
      },
      {
        heading: 'NTM identification logic',
        items: [
          'Separate rapid growers from slow growers, then use pigment in light or dark, growth temperature, and source to choose the next branch.',
          'Photochromogens include M. kansasii and M. marinum; scotochromogens include M. gordonae-like organisms; nonchromogens include M. avium complex and M. xenopi-like organisms.',
          'Useful phenotypic tests include niacin accumulation, nitrate reduction, catalase behavior, Tween 80 hydrolysis, tellurite reduction, urease, iron uptake, arylsulfatase, and PNB or TCH inhibition when used by protocol.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Mycobacteria are not a routine biochemical-panel problem; specimen type, biosafety, stain result, culture system, molecular method, and growth rate all matter.',
          'MTB complex, rapidly growing NTM, and water-associated contaminants can all appear in different clinical contexts, so interpretation depends on source and repeat recovery.',
          'When tuberculosis, high organism burden, sterile-site disease, or unexpected acid-fast growth is suspected, escalate according to laboratory and public health policy.'
        ]
      }
    ]
  },
  {
    id: 'obligate-intracellular-nonculturable-agents',
    label: 'Obligate Intracellular and Nonculturable Agents',
    category: 'Bacteriology',
    title: 'Obligate Intracellular and Nonculturable Bacterial Agents',
    summary: 'Learn the diagnostic strategy for bacterial agents that are not recovered by routine culture: Chlamydia, Rickettsia, Orientia, Ehrlichia, Anaplasma, Coxiella, Tropheryma whipplei, and Klebsiella granulomatis.',
    highlights: [
      'These organisms are diagnosed by syndrome, exposure history, specimen timing, NAAT, serology, histopathology, or specialized reference methods rather than routine colony biochemistry.',
      'Early serology can be negative for rickettsial, ehrlichial, anaplasmal, and Q fever infections, so paired acute and convalescent sera often matter.',
      'Culture, when possible, may require cell culture, embryonated eggs, shell vial methods, or high-containment reference laboratories.'
    ],
    cards: [
      {
        title: 'Chlamydia trachomatis',
        body: 'Serovars A-C cause trachoma, D-K cause urogenital and neonatal disease, and L1-L3 cause lymphogranuloma venereum; NAAT is the main direct test for many specimen types.'
      },
      {
        title: 'C. pneumoniae / C. psittaci',
        body: 'C. pneumoniae causes respiratory infection, while C. psittaci is linked to bird exposure and psittacosis; PCR and serology are more practical than routine culture.'
      },
      {
        title: 'Rickettsia and Orientia',
        body: 'Spotted fever, typhus, and scrub typhus agents are vector-associated intracellular bacteria; IFA serology, tissue PCR, and exposure clues drive diagnosis.'
      },
      {
        title: 'Ehrlichia and Anaplasma',
        body: 'Tick-borne infections often show fever, cytopenias, transaminitis, and sometimes morulae in leukocytes; whole-blood PCR is most useful early.'
      },
      {
        title: 'Coxiella burnetii',
        body: 'Q fever is associated with aerosols from livestock or birth products; phase II antibody supports acute infection, while high phase I IgG suggests chronic infection risk.'
      },
      {
        title: 'Tissue-Based Agents',
        body: 'Tropheryma whipplei and Klebsiella granulomatis are approached with tissue histology, special stains, and molecular testing rather than routine culture.'
      }
    ],
    sections: [
      {
        heading: 'Why routine culture fails',
        items: [
          'Obligate intracellular agents require living host cells, specialized culture systems, or reference methods; many nonculturable agents are diagnosed directly from patient material.',
          'A negative routine bacterial culture does not rule out these organisms when the syndrome and exposure history fit.',
          'Specimen timing matters: blood or tissue may be best early for molecular testing, while convalescent serum may be needed to document antibody rise.'
        ]
      },
      {
        heading: 'Chlamydial logic',
        items: [
          'C. trachomatis NAAT is the main diagnostic method for urogenital disease and validated extragenital testing; LGV may require additional genotyping or reference confirmation.',
          'Trachoma and neonatal conjunctivitis require source-aware specimen collection because ocular epithelial cells and organism burden determine yield.',
          'C. psittaci should be considered with compatible pneumonia and bird exposure; communicate exposure risk because culture is not routine.'
        ]
      },
      {
        heading: 'Rickettsial and related vectors',
        items: [
          'Spotted fever group rickettsiae, typhus group rickettsiae, and Orientia are organized by vector, geography, rash or eschar pattern, and serologic cross-reactivity.',
          'IFA IgG on paired sera is a common confirmation strategy, but acute specimens can be negative in the first week of illness.',
          'PCR is most useful from appropriate tissue, eschar, or blood depending on the agent and timing; do not rely on routine culture.'
        ]
      },
      {
        heading: 'Ehrlichia, Anaplasma, and Coxiella',
        items: [
          'Ehrlichia chaffeensis tends to infect monocytes, while Anaplasma phagocytophilum and Ehrlichia ewingii are associated with granulocytes; morulae can be a clue but are not sensitive.',
          'Whole-blood PCR is most useful early for ehrlichiosis and anaplasmosis, especially before or soon after therapy.',
          'Coxiella burnetii diagnosis relies heavily on serology: phase II antibodies support acute Q fever, while high phase I IgG raises concern for chronic Q fever such as endocarditis.'
        ]
      },
      {
        heading: 'Nontypical tissue diagnoses',
        items: [
          'Tropheryma whipplei is supported by PAS-positive macrophages and PCR from tissue or other involved sites, interpreted with syndrome and histology.',
          'Klebsiella granulomatis causes donovanosis; Donovan bodies are intracellular organisms seen in macrophages on tissue smear or biopsy material.',
          'These diagnoses require the right specimen, not a bigger routine biochemical panel.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'Ask what the organism is expected to do in the lab: grow on plates, require living cells, appear in blood cells, trigger antibodies, or sit in tissue macrophages.',
          'For fever with rash, eschar, tick, louse, flea, mite, bird, livestock, or travel exposure, choose tests around timing and syndrome before thinking about colony ID.',
          'Culture or propagation of suspicious intracellular agents should follow biosafety and reference-laboratory procedures.'
        ]
      }
    ]
  },
  {
    id: 'mycoplasma-ureaplasma',
    label: 'Mycoplasma and Ureaplasma',
    category: 'Bacteriology',
    title: 'Cell Wall-Deficient Bacteria: Mycoplasma and Ureaplasma',
    summary: 'Learn the diagnostic approach to cell wall-deficient bacteria: why they do not Gram stain normally, why routine culture misses them, how specialized media and NAAT are used, and why beta-lactams do not work.',
    highlights: [
      'Mycoplasma and Ureaplasma lack peptidoglycan cell walls, so they are pleomorphic, poorly visualized by Gram stain, and intrinsically resistant to cell wall-active agents.',
      'Important clinical groups include M. pneumoniae respiratory disease, M. genitalium urethritis/cervicitis/PID, M. hominis postpartum or invasive disease, and Ureaplasma urealyticum/parvum genital or neonatal disease.',
      'Culture requires sterol-containing specialized media and careful interpretation; NAAT is the practical front-line method for many respiratory and genital syndromes.'
    ],
    cards: [
      {
        title: 'M. pneumoniae',
        body: 'Respiratory pathogen linked to tracheobronchitis and atypical pneumonia; NAAT is useful early, while serology may support diagnosis when paired or timed appropriately.'
      },
      {
        title: 'M. genitalium',
        body: 'Sexually transmitted pathogen associated with urethritis, cervicitis, PID, and persistent symptoms; NAAT and resistance-aware interpretation matter.'
      },
      {
        title: 'M. hominis',
        body: 'Genital tract-associated species that uses arginine, can cause postpartum fever, wound, CNS, neonatal, and immunocompromised infections, and has distinctive antimicrobial patterns.'
      },
      {
        title: 'Ureaplasma species',
        body: 'Urea-hydrolyzing genital mycoplasmas associated with urethritis, pregnancy complications, chorioamnionitis, and neonatal respiratory or invasive disease in the right context.'
      },
      {
        title: 'No Cell Wall',
        body: 'No peptidoglycan means no reliable Gram stain morphology and no beta-lactam or vancomycin activity; therapy targets protein synthesis or nucleic acid pathways.'
      }
    ],
    sections: [
      {
        heading: 'First diagnostic split',
        items: [
          'Think Mycoplasma or Ureaplasma when the syndrome fits but routine Gram stain and routine culture do not explain the illness.',
          'Respiratory disease points toward M. pneumoniae; persistent nongonococcal urethritis or cervicitis points toward M. genitalium; pregnancy, postpartum, neonatal, or invasive sterile-site contexts can involve M. hominis or Ureaplasma.',
          'Do not force these organisms into Gram-positive or Gram-negative roadmaps because the missing cell wall changes staining, culture, and susceptibility logic.'
        ]
      },
      {
        heading: 'Specimens and transport',
        items: [
          'Respiratory testing may use throat, nasopharyngeal, or other validated respiratory specimens for M. pneumoniae NAAT.',
          'Genital testing may use first-catch urine, urethral, vaginal, endocervical, or other assay-validated specimens depending on organism and syndrome.',
          'For culture, use transport and media validated for mycoplasmas because drying, overgrowth, and inappropriate media can erase recovery.'
        ]
      },
      {
        heading: 'Culture logic',
        items: [
          'Mycoplasmas require sterols and enriched media such as PPLO, SP4, A7, or A8 formulations rather than routine blood or chocolate agar.',
          'M. pneumoniae is slow and glucose-utilizing; M. hominis is usually arginine-utilizing; Ureaplasma hydrolyzes urea and often forms very tiny brown colonies on manganese-containing media.',
          'Classic tiny fried-egg colonies are easier to appreciate with magnification or stain-enhanced methods, but culture is slow and technically demanding.'
        ]
      },
      {
        heading: 'Direct detection and serology',
        items: [
          'NAAT is central for M. genitalium and commonly used for M. pneumoniae; some panels detect Ureaplasma or M. hominis depending on validation.',
          'M. pneumoniae serology can support diagnosis when acute and convalescent timing is appropriate, but early single serology can mislead.',
          'Cold agglutinins are a historical clue for M. pneumoniae but are nonspecific and should not replace validated testing.'
        ]
      },
      {
        heading: 'Susceptibility mindset',
        items: [
          'Beta-lactams, carbapenems, and glycopeptides are ineffective because there is no cell wall target.',
          'Macrolides, tetracyclines, and fluoroquinolones are major drug classes, but organism-specific intrinsic resistance and acquired resistance matter.',
          'M. hominis is intrinsically resistant to erythromycin-like macrolides, Ureaplasma is intrinsically resistant to clindamycin, and M. genitalium often requires resistance-aware management.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'The key lesson is not colony color first; it is recognizing when the organism is invisible to the usual Gram stain and routine plate workflow.',
          'Ask whether the clinical syndrome needs NAAT, specialized culture, paired serology, or antimicrobial resistance information.',
          'Interpret genital Mycoplasma and Ureaplasma detection with syndrome and specimen source because colonization can overlap with disease.'
        ]
      }
    ]
  },
  {
    id: 'spirochetes',
    label: 'Spirochetes',
    category: 'Bacteriology',
    title: 'The Spirochetes',
    summary: 'Learn the diagnostic strategy for thin helical bacteria: Treponema, Borrelia, and Leptospira. Focus on morphology, darkfield or special stains, serologic algorithms, NAAT, specimen timing, and exposure clues.',
    highlights: [
      'Spirochetes are thin, flexible, helically shaped bacteria with internal axial filaments; they often stain poorly by routine Gram stain.',
      'Treponema pallidum is diagnosed mainly by serologic algorithms and lesion-based direct tests; it is not recovered by routine culture.',
      'Borrelia and Leptospira diagnosis depends strongly on syndrome and timing: early direct detection may be useful, while serology often becomes more informative later.'
    ],
    cards: [
      {
        title: 'Treponema pallidum',
        body: 'Syphilis agent; direct darkfield or DFA may detect organisms from lesions, while nontreponemal and treponemal serology drive most diagnosis and follow-up.'
      },
      {
        title: 'Borrelia burgdorferi',
        body: 'Lyme disease agent transmitted by Ixodes ticks; erythema migrans can be clinical, while two-tier or modified two-tier serology supports later disease.'
      },
      {
        title: 'Relapsing Fever Borrelia',
        body: 'Bloodstream Borrelia can be visible on stained blood smears during febrile episodes; vector and travel history help separate louse-borne and tick-borne forms.'
      },
      {
        title: 'Leptospira interrogans',
        body: 'Thin hooked spirochete linked to animal urine, freshwater, flooding, occupational exposure, Weil disease, meningitis, renal/hepatic involvement, and conjunctival suffusion.'
      },
      {
        title: 'Not Routine Culture',
        body: 'Spirochetes require special direct detection, serology, molecular methods, animal/reference methods, or specialized media rather than standard colony workup.'
      }
    ],
    sections: [
      {
        heading: 'First diagnostic split',
        items: [
          'Think spirochetes when the clinical picture involves genital ulcer or rash, neurologic or congenital syphilis concern, tick exposure, relapsing fever, erythema migrans, animal urine, freshwater, jaundice, renal injury, or aseptic meningitis.',
          'Routine Gram stain and routine plate culture usually do not answer the question; choose the diagnostic method based on organism, syndrome, and illness timing.',
          'Morphology is helpful conceptually, but most clinical decisions rely on serology, NAAT, darkfield or special microscopy, or reference laboratory testing.'
        ]
      },
      {
        heading: 'Treponema pallidum logic',
        items: [
          'Nontreponemal tests such as RPR and VDRL detect reagin antibodies, can be reported quantitatively, and are useful for monitoring treatment response.',
          'Treponemal tests such as TP-PA, FTA-ABS, EIA, or CIA detect antibodies directed at treponemal antigens and often remain reactive after prior infection.',
          'Traditional and reverse syphilis algorithms combine both test types because each answers a different question; discordant results require staged interpretation.',
          'CSF VDRL is specific but insensitive for neurosyphilis; interpretation requires clinical and CSF context.'
        ]
      },
      {
        heading: 'Borrelia logic',
        items: [
          'Early localized Lyme disease with classic erythema migrans can be a clinical diagnosis because serology may still be negative early.',
          'Standard two-tier testing uses an EIA or IFA followed by immunoblot; modified two-tier testing uses sequential EIAs when validated.',
          'PCR is not a general screening test for Lyme disease, but may support selected synovial fluid or tissue questions depending on setting.',
          'Relapsing fever Borrelia can reach high blood burdens during fever, so thick or thin blood smear, darkfield microscopy, or PCR may detect organisms acutely.'
        ]
      },
      {
        heading: 'Leptospira logic',
        items: [
          'Blood and CSF are most useful for direct detection early; urine becomes more useful later as organisms localize to the kidney.',
          'Microscopic agglutination testing is a classic serologic reference method; paired serology or rising titers strengthen interpretation.',
          'Culture requires specialized media such as EMJH or Fletcher and may take weeks, so it is not a rapid routine bench answer.',
          'Darkfield visualization can be suggestive but is not definitive because artifacts can resemble thin spirochetes.'
        ]
      },
      {
        heading: 'Student workup mindset',
        items: [
          'For spirochetes, start with the syndrome and exposure, then choose the test; do not start by asking which routine biochemical panel to run.',
          'Know which tests are direct detection, which are antibody response, and which can remain positive after past infection.',
          'Timing matters: early disease can precede antibody detection, while later disease may no longer have abundant organisms in the original specimen site.'
        ]
      }
    ]
  },
  {
    id: 'media',
    label: 'Culture Media',
    category: 'Core Basics',
    title: 'Culture Media and Plate Selection',
    summary: 'Know what each plate is trying to recover, what it suppresses, and what visual clues matter before you touch a bench test.',
    highlights: [
      'Enriched media recover fastidious organisms and often reveal hemolysis patterns.',
      'Selective media suppress unwanted flora so the target group becomes easier to see.',
      'Differential reactions often narrow the next test more than the final ID.'
    ],
    cards: [
      {
        title: 'Blood Agar',
        body: 'General recovery plate for many pathogens. Watch beta, alpha, or non-hemolytic reactions and colony size.'
      },
      {
        title: 'Chocolate Agar',
        body: 'Provides hemin and NAD for fastidious organisms such as Haemophilus and Neisseria.'
      },
      {
        title: 'MacConkey Agar',
        body: 'Suppresses Gram-positive organisms and separates lactose fermenters from non-fermenters.'
      },
      {
        title: 'CNA or PEA',
        body: 'Useful when you want Gram-positive recovery while reducing Gram-negative overgrowth.'
      }
    ],
    sections: [
      {
        heading: 'High-yield interpretation cues',
        items: [
          'Pink on MacConkey suggests lactose fermentation; colorless growth suggests non-lactose fermentation.',
          'Black centers on enteric selective media suggest hydrogen sulfide production.',
          'No growth can be as informative as growth when paired with Gram stain morphology.'
        ]
      },
      {
        heading: 'When to add extra media',
        items: [
          'Respiratory and wound specimens may need fungal, anaerobic, or selective respiratory plates depending on clinical context.',
          'Sterile fluids with scant organisms justify broader recovery media than routine surface swabs.',
          'Travel history, immunocompromise, and bite wounds often change initial plate setup.'
        ]
      }
    ]
  },
  {
    id: 'specimens',
    label: 'Specimen Management',
    category: 'Core Basics',
    title: 'Specimen Management Basics',
    summary: 'Learn how collection, transport, storage, acceptance criteria, and processing choices affect microbiology results before culture interpretation even begins.',
    highlights: [
      'The quality of the result depends heavily on the quality of the specimen.',
      'Collection method, transport conditions, and time to processing all influence whether the lab sees the real pathogen profile.',
      'Good specimen management includes more than rejection rules. It also includes body site selection, transport, storage, preparation, and reporting limits.'
    ],
    cards: [
      {
        title: 'Collection',
        body: 'The best specimen comes from the correct body site, collected in a way that minimizes contamination and preserves diagnostic value.'
      },
      {
        title: 'Transport',
        body: 'Transport systems should maintain viability without promoting overgrowth and should match the organism risks of the specimen type.'
      },
      {
        title: 'Acceptance and Rejection',
        body: 'The laboratory must recognize when a sample is too compromised, mislabeled, delayed, or poorly collected to support a reliable result.'
      },
      {
        title: 'Processing Priority',
        body: 'Sterile-site material, blood cultures, and time-sensitive specimens should move quickly because delay can change recovery and interpretation.'
      }
    ],
    sections: [
      {
        heading: 'Why specimen management matters',
        items: [
          'Even excellent laboratory technique cannot fully rescue a poor specimen.',
          'Wrong site, poor collection technique, transport delay, or contamination can create misleading culture results.',
          'Students should learn to see specimen quality as part of diagnosis, not as a minor pre-analytic detail.'
        ]
      },
      {
        heading: 'Collection and body site choice',
        items: [
          'The best specimen is collected from the site most closely associated with the disease process.',
          'Deep aspirates, tissue, or sterile fluid are often more informative than superficial swabs when both are possible.',
          'Collection technique should reduce contamination from surrounding flora whenever possible.'
        ]
      },
      {
        heading: 'Transport and storage',
        items: [
          'Transport media and containers should be appropriate for the specimen type and the organisms of concern.',
          'Processing delay can reduce recovery of fragile organisms or allow overgrowth of less important flora.',
          'Temperature, atmosphere, and moisture conditions during transport may change what survives to reach the bench.'
        ]
      },
      {
        heading: 'Acceptance, rejection, and limitations',
        items: [
          'Unlabeled specimens, leaking containers, dried swabs, and severely delayed or improperly stored samples may not support safe or reliable workup.',
          'Some specimens are technically acceptable but still limited in value because they contain mixed contamination or poor source material.',
          'The lab should communicate clearly when specimen quality limits interpretation.'
        ]
      },
      {
        heading: 'Preparation and processing decisions',
        items: [
          'Direct smear review, concentration, homogenization, and culture setup depend on specimen type and clinical suspicion.',
          'Sterile fluids, blood cultures, and urgent tissues should be prioritized because rapid handling affects both safety and recovery.',
          'Students should connect specimen management to what happens later on media, Gram stain, and final reporting.'
        ]
      },
      {
        heading: 'Specimens that commonly mislead',
        items: [
          '24-hour urine or sputum collections often invite overgrowth and contamination problems.',
          'Superficial wound swabs may reflect surface flora more than the true infecting process.',
          'Single swabs sent for multiple incompatible requests may not support the full workup being requested.'
        ]
      }
    ]
  },
  {
    id: 'atmosphere',
    label: 'Growth Conditions',
    category: 'Core Basics',
    title: 'Atmosphere, Temperature, and Incubation Basics',
    summary: 'Atmosphere requirements are part of identification. Growth failure under the wrong conditions can hide the organism entirely.',
    highlights: [
      'Oxygen tolerance is a major discriminator at the bench.',
      'Incubation temperature changes recovery for selected pathogens.',
      'A growth pattern across aerobic, anaerobic, and CO2 conditions often narrows the organism group fast.'
    ],
    cards: [
      {
        title: 'Obligate Aerobes',
        body: 'Require oxygen and often grow best on the most exposed plate surfaces.'
      },
      {
        title: 'Obligate Anaerobes',
        body: 'Oxygen damages them; recovery depends on rapid transport and anaerobic culture conditions.'
      },
      {
        title: 'Facultative Organisms',
        body: 'Grow with or without oxygen and dominate much routine clinical bacteriology.'
      },
      {
        title: 'Microaerophiles and Capnophiles',
        body: 'Need reduced oxygen or increased CO2, which is why atmosphere selection matters early.'
      }
    ],
    sections: [
      {
        heading: 'Temperature rules worth memorizing',
        items: [
          'Most routine pathogens prefer 35 C to 37 C.',
          'Campylobacter grows best around 42 C in reduced oxygen.',
          'Yersinia enterocolitica tolerates colder conditions better than many routine enterics.'
        ]
      },
      {
        heading: 'When growth pattern matters',
        items: [
          'No anaerobic growth argues against strict anaerobes but does not exclude fastidious aerobes.',
          'Heavy CO2 dependence should push you toward fastidious respiratory or genital pathogens.',
          'A non-fermenter that thrives aerobically with oxidase positivity moves your differential quickly.'
        ]
      }
    ]
  },
  {
    id: 'blood-culture',
    label: 'Blood Culture Workup',
    category: 'Bench Workflows',
    title: 'Blood Culture First-Pass Workflow',
    summary: 'A positive blood culture demands fast, disciplined triage: Gram stain, communication, subculture, and initial workup all need a clear sequence.',
    highlights: [
      'Call critical Gram stain results promptly and document the communication.',
      'Use bottle appearance, Gram morphology, and patient context to shape subculture setup.',
      'Do not overcall contaminants without considering number of sets, time to positivity, and clinical setting.'
    ],
    cards: [
      {
        title: 'Immediate steps',
        body: 'Gram stain the positive bottle, notify the care team, and set up appropriate aerobic and anaerobic recovery media.'
      },
      {
        title: 'Likely contaminant versus pathogen',
        body: 'Single-set coagulase-negative staphylococci behave differently from repeated positives or growth from line draws.'
      },
      {
        title: 'Bench reflexes',
        body: 'Catalase, coagulase, oxidase, and colony morphology often provide the fastest first split after subculture.'
      }
    ],
    sections: [
      {
        heading: 'Questions to answer early',
        items: [
          'Is this Gram-positive cocci in clusters, chains, rods, or Gram-negative rods?',
          'How many bottles and how many sets are positive?',
          'Does the patient have a line, prosthetic device, neutropenia, or a specific infection source?'
        ]
      },
      {
        heading: 'Escalation clues',
        items: [
          'Yeast, Gram-negative rods, or mixed morphologies in blood warrant urgent attention.',
          'Rapid time to positivity can support true bacteremia depending on the organism and draw conditions.',
          'Unusual organisms in multiple sets should trigger contamination skepticism only after clinical review, not before.'
        ]
      }
    ]
  },
  {
    id: 'urine-culture',
    label: 'Urine Culture Workup',
    category: 'Bench Workflows',
    title: 'Urine Culture Bench Workflow',
    summary: 'Urine workup is about specimen quality, colony count logic, and deciding when mixed growth is meaningful versus contaminated.',
    highlights: [
      'Interpret colony count in the context of collection method and patient population.',
      'One or two dominant organisms matter more than broad mixed growth in most routine urines.',
      'MacConkey reactions and colony morphology drive the first ID split quickly.'
    ],
    cards: [
      {
        title: 'Collection method matters',
        body: 'Clean-catch urine carries more contamination risk than catheter or suprapubic material.'
      },
      {
        title: 'Quantitation matters',
        body: 'The same organism count may mean different things in asymptomatic, symptomatic, catheterized, or pediatric patients.'
      },
      {
        title: 'Mixed flora',
        body: 'Heavy mixed growth without a dominant pathogen often means recollection is more useful than forcing identification.'
      }
    ],
    sections: [
      {
        heading: 'First-pass interpretation',
        items: [
          'Lactose-fermenting Gram-negative rods put Enterobacterales high on the list.',
          'Catalase-positive Gram-positive cocci may represent staphylococci or enterococci depending on morphology and media behavior.',
          'Mucoid colonies, swarming, or distinct odors can change the expected workup path quickly.'
        ]
      },
      {
        heading: 'When to be cautious',
        items: [
          'Do not over-interpret low-count mixed flora from a poor clean-catch specimen.',
          'Correlate pyuria, symptoms, and collection method before treating every isolate as a pathogen.',
          'If three or more organism types grow without a lead organism, recollection is often the right answer.'
        ]
      }
    ]
  },
  {
    id: 'gram-positive-id',
    label: 'Staph and Strep Split',
    category: 'Interpretation',
    title: 'First-Pass Gram-Positive Cocci Interpretation',
    summary: 'A small set of early observations can split Staphylococcus, Streptococcus, and Enterococcus before deeper species workup starts.',
    highlights: [
      'Clusters suggest staphylococci; chains or pairs suggest streptococci or enterococci.',
      'Catalase is the first major branch point for Gram-positive cocci.',
      'Hemolysis, PYR, bile esculin, and growth in salt help narrow the streptococcal side.'
    ],
    cards: [
      {
        title: 'Staphylococci',
        body: 'Catalase positive Gram-positive cocci in clusters. Coagulase and latex testing help separate S. aureus from coagulase-negative species.'
      },
      {
        title: 'Streptococci',
        body: 'Catalase negative cocci in chains or pairs. Hemolysis pattern is often the next useful split.'
      },
      {
        title: 'Enterococci',
        body: 'Catalase negative cocci that often tolerate bile and salt better than many streptococci.'
      }
    ],
    sections: [
      {
        heading: 'High-yield branch points',
        items: [
          'Beta-hemolytic plus PYR positive raises concern for group A streptococci or enterococci depending on the rest of the profile.',
          'Gamma or alpha hemolysis with bile esculin positivity and growth in 6.5 percent salt supports enterococci.',
          'A catalase-positive blood isolate that is coagulase negative is not automatically insignificant.'
        ]
      },
      {
        heading: 'Common mistakes',
        items: [
          'Reading catalase from blood-containing media can produce false bubbling if technique is sloppy.',
          'Assuming every cluster-forming coccus is S. aureus leads to avoidable errors.',
          'Ignoring hemolysis on a second-day plate can miss useful clues for streptococcal grouping.'
        ]
      }
    ]
  },
  {
    id: 'enterics',
    label: 'Enteric Bench Logic',
    category: 'Interpretation',
    title: 'Enteric Bench Interpretation Shortcuts',
    summary: 'Use MacConkey behavior, oxidase, H2S, and a few core biochemicals to move through Enterobacterales logic with less guessing.',
    highlights: [
      'Oxidase negativity supports Enterobacterales but does not complete the ID.',
      'Lactose fermentation status is a workflow tool, not the final answer.',
      'H2S, indole, citrate, urease, motility, and decarboxylase reactions create the practical bench pattern.'
    ],
    cards: [
      {
        title: 'Lactose fermenters',
        body: 'Think Escherichia, Klebsiella, Enterobacter, Citrobacter, and related groups, then split them with indole, motility, and citrate logic.'
      },
      {
        title: 'Non-lactose fermenters',
        body: 'Consider Salmonella, Shigella, Proteus, Morganella, Providencia, and non-fermenters before assuming a single family branch.'
      },
      {
        title: 'H2S and urease',
        body: 'These two observations often narrow the field quickly when paired with motility and indole.'
      }
    ],
    sections: [
      {
        heading: 'Useful mental shortcuts',
        items: [
          'Strong swarming on blood agar raises Proteus group suspicion immediately.',
          'Mucoid lactose fermenters suggest capsule-forming organisms such as Klebsiella species.',
          'H2S-positive non-lactose fermenters should push Salmonella and Proteus higher early on.'
        ]
      },
      {
        heading: 'Interpret with discipline',
        items: [
          'Delayed lactose fermentation can change the apparent branch if you read too early.',
          'One biochemical should rarely override the whole colony and media pattern.',
          'If the profile conflicts sharply, verify purity and repeat key reactions before forcing an identification.'
        ]
      }
    ]
  },
  {
    id: 'parasitology-lab-methods-overview',
    label: 'Parasitology Lab Methods Overview',
    category: 'Parasitology',
    title: 'Laboratory Methods for Diagnosis of Parasitic Infections: Overview',
    summary: 'A first-pass guide to parasitology diagnostics: specimen selection, stool O&P workflow, blood parasite detection, concentration methods, permanent stains, antigen or molecular testing, and safety-aware interpretation.',
    highlights: [
      'Parasitology starts with exposure, syndrome, geography, immune status, and specimen timing before morphology is interpreted.',
      'Stool, blood, urine, sputum, tissue, aspirates, swabs, and arthropod specimens each require different collection and processing logic.',
      'Microscopy remains important, but antigen tests, serology, and molecular methods can be essential when organism burden is low or morphology is not enough.'
    ],
    cards: [
      {
        title: 'Stool parasite workup',
        body: 'Ova and parasite examination often uses preserved stool, concentration methods, wet mounts, and permanent stains to improve recovery and recognition.'
      },
      {
        title: 'Blood parasite workup',
        body: 'Thick and thin blood films, timing of collection, concentration methods, antigen tests, and molecular methods support malaria, Babesia, trypanosomes, and filarial workups.'
      },
      {
        title: 'Non-stool specimens',
        body: 'Urine, urogenital swabs, respiratory samples, tissue, aspirates, and biopsies may be needed depending on the suspected parasite and disease site.'
      }
    ],
    sections: [
      {
        heading: 'First-pass diagnostic mindset',
        items: [
          'Do not start by asking for one universal parasite test; start with syndrome, travel or exposure, immune status, and the specimen that matches the suspected life stage.',
          'Parasites may be recovered as trophozoites, cysts, oocysts, eggs, larvae, adult worms, microfilariae, amastigotes, or intracellular blood forms depending on the organism.',
          'A negative single specimen does not always exclude parasitic infection because shedding, parasitemia, and parasite burden can be intermittent.',
          'Direct visualization, antigen detection, serology, and NAAT answer different questions and should be chosen based on the suspected organism.'
        ]
      },
      {
        heading: 'Major specimen lanes',
        intro: 'Parasitology diagnosis starts with specimen type and organism group. These are the practical lanes students should recognize first.',
        items: [
          'Stool: intestinal protozoa, helminth eggs or larvae, coccidia, microsporidia, and other enteric parasites; collection, preservation, concentration, and staining determine yield.',
          'Blood: Plasmodium, Babesia, Trypanosoma, Leishmania in some settings, and microfilariae; thick films improve screening sensitivity while thin films support morphology and species-level interpretation.',
          'Urine and urogenital specimens: Schistosoma haematobium eggs, Trichomonas vaginalis, and selected ova or larvae depending on disease site.',
          'Respiratory specimens: Paragonimus eggs, Strongyloides larvae in severe disease, and organisms detected in immunocompromised hosts when clinically suspected.',
          'Tissue, aspirate, biopsy, and lesion material: Leishmania, amebic lesions, tissue helminths, larvae, cysticerci, and other parasites that require direct exam, histopathology, culture, serology, or molecular support.',
          'Arthropods and macroscopic worms: submit intact organisms when possible for morphologic identification; avoid crushing, drying, or placing specimens in fixatives that prevent recognition.'
        ]
      },
      {
        heading: 'Stool O&P workflow',
        items: [
          'Collect stool in appropriate preservatives or clean containers based on the tests ordered; delays and wrong preservatives can destroy motile forms or compromise staining.',
          'Macroscopic review may note consistency, blood, mucus, adult worms, proglottids, or visible parasites before microscopic processing.',
          'Direct wet mount can show motility in fresh stool, but concentrated specimens improve detection of many cysts, eggs, and larvae.',
          'Permanent stained smears, such as trichrome or iron hematoxylin-type stains, help evaluate protozoan nuclear and cytoplasmic detail.',
          'Modified acid-fast or special stains may be needed for coccidia, microsporidia, or other organisms that are not well characterized by routine O&P alone.'
        ]
      },
      {
        heading: 'Blood parasite workflow',
        items: [
          'Thick films are used for sensitive screening because more blood is examined; thin films preserve morphology for species clues and parasitemia estimation.',
          'For malaria, urgent evaluation is important because delayed recognition can be clinically dangerous.',
          'Collection timing can matter for organisms with periodicity, such as some microfilariae.',
          'Rapid antigen tests and molecular assays can support detection but should be interpreted with smear findings, clinical suspicion, and local workflow.',
          'Report morphology carefully: ring forms, gametocytes, intraerythrocytic forms, extracellular trypomastigotes, and microfilariae imply different diagnostic pathways.'
        ]
      },
      {
        heading: 'Concentration, stains, and special methods',
        items: [
          'Concentration methods increase recovery by separating parasites from fecal debris; sedimentation and flotation approaches have different strengths and limitations.',
          'Permanent stains are most useful for intestinal protozoa because internal morphology often matters more than gross size alone.',
          'Special culture, agar plate methods, Baermann-type concentration, or larval recovery methods may be used for selected helminths such as Strongyloides.',
          'Antigen tests are useful for selected intestinal protozoa, but a negative result only applies to the target tested.',
          'Serology can support diagnosis of tissue-invasive parasites when organisms are difficult to recover directly, but antibodies may persist and cross-react.',
          'Molecular tests can add sensitivity or specificity for selected parasites, especially when morphology is difficult or organism burden is low.'
        ]
      },
      {
        heading: 'Safety and reporting discipline',
        items: [
          'Handle stool, blood, tissue, and arthropod submissions with standard precautions and laboratory-specific biosafety procedures.',
          'Use correct fixatives and transport conditions; the wrong container can make a specimen unsuitable for the intended test.',
          'Report the stage and organism group as precisely as the method supports; do not overstate species identification when morphology is insufficient.',
          'Urgent findings such as malaria parasites, heavy parasitemia, or clinically significant blood parasites require prompt communication according to local policy.',
          'When results conflict with clinical suspicion, recommend appropriate repeat specimens or alternate methods rather than forcing a conclusion from one test.'
        ]
      }
    ]
  },
  {
    id: 'intestinal-protozoa',
    label: 'Intestinal Protozoa',
    category: 'Parasitology',
    title: 'Intestinal Protozoa',
    summary: 'A bench-focused guide to intestinal protozoa: amoebae, flagellates, ciliates, coccidia, and microsporidia, with emphasis on morphology, stool testing strategy, pathogenicity, and when special stains or antigen/molecular methods matter.',
    highlights: [
      'Intestinal protozoa are not all interpreted the same way: some are major pathogens, some are opportunistic, and some are usually reported as nonpathogenic colonizers.',
      'Stool morphology depends on the stage present, especially trophozoites, cysts, oocysts, and spores.',
      'Routine O&P can miss organisms that require modified acid-fast staining, fluorescence, antigen testing, or molecular assays.'
    ],
    cards: [
      {
        title: 'Amoebae',
        body: 'Entamoeba histolytica is clinically important because it can invade tissue; Entamoeba dispar and several other amoebae may look similar but have different significance.'
      },
      {
        title: 'Flagellates and ciliates',
        body: 'Giardia, Dientamoeba, Chilomastix, Pentatrichomonas, and Balantidium are approached through stool morphology, motility when fresh, and clinical context.'
      },
      {
        title: 'Coccidia and microsporidia',
        body: 'Cryptosporidium, Cyclospora, Cystoisospora, and microsporidia often require special stains, antigen detection, fluorescence, or molecular testing beyond routine wet mount review.'
      }
    ],
    sections: [
      {
        heading: 'How to split intestinal protozoa',
        items: [
          'Amoebae are interpreted by cyst and trophozoite morphology, nuclear features, cytoplasm, and whether invasive disease is clinically suspected.',
          'Flagellates are often recognized by trophozoite shape, nuclei, flagella, axostyle or median-body features, and cyst morphology when present.',
          'Ciliates are uncommon but important to recognize because Balantidium coli is large and ciliated in the trophozoite stage.',
          'Coccidia are typically oocyst-forming organisms; modified acid-fast staining, autofluorescence, antigen, or molecular methods may be more useful than routine O&P alone.',
          'Microsporidia produce very small spores and usually require special stains or molecular methods for reliable detection.'
        ]
      },
      {
        heading: 'Pathogenicity mindset',
        items: [
          'Entamoeba histolytica is pathogenic and can cause intestinal disease or extraintestinal abscess; E. dispar is morphologically similar but not interpreted as the invasive pathogen.',
          'Giardia duodenalis is a common diarrheal pathogen associated with contaminated water, daycare, travel, outbreaks, and malabsorption-type symptoms.',
          'Cryptosporidium, Cyclospora, Cystoisospora, and microsporidia are especially important in persistent watery diarrhea and immunocompromised hosts.',
          'Blastocystis and Dientamoeba can be clinically debated; interpretation should be tied to symptoms, burden, and whether other causes have been excluded.',
          'Nonpathogenic amoebae still matter because they can mimic pathogens or indicate fecal-oral exposure, but they should not be overcalled as invasive disease.'
        ]
      },
      {
        heading: 'Stool testing strategy',
        items: [
          'Fresh stool can be useful for motility, but preserved stool and permanent stains are often needed for reliable morphology.',
          'Concentrated stool improves recovery of cysts and some oocysts, but trophozoites may be distorted or absent depending on preservation and timing.',
          'Permanent stained smears help evaluate nuclei, chromatoid bodies, karyosome position, cytoplasm, and other protozoan details.',
          'Modified acid-fast staining supports detection of coccidian oocysts such as Cryptosporidium, Cyclospora, and Cystoisospora.',
          'Antigen and NAAT methods can improve sensitivity or speed for selected organisms but only answer the target included in the assay.'
        ]
      },
      {
        heading: 'High-yield organism clues',
        items: [
          'Entamoeba histolytica/dispar group: cysts and trophozoites can look alike; ingested red blood cells in trophozoites support invasive E. histolytica when seen.',
          'Giardia: pear-shaped trophozoites and oval cysts are classic teaching images; antigen or molecular tests are commonly used in many labs.',
          'Dientamoeba fragilis: trophozoites are the diagnostic stage in stool; cyst recognition is less central in routine teaching than for Giardia or Entamoeba.',
          'Cryptosporidium: small oocysts and watery diarrhea; modified acid-fast, immunoassay, fluorescence, or molecular testing may be used.',
          'Cyclospora: larger acid-fast-variable oocysts that can autofluoresce; associated with prolonged diarrhea and produce-related outbreaks.',
          'Cystoisospora belli: larger oval oocysts; important in immunocompromised hosts and may require concentration and special staining.',
          'Microsporidia: tiny spores that can be missed without special stains or molecular methods.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report pathogenic protozoa with the organism and stage when the method supports it.',
          'Use careful wording for morphologically indistinguishable organisms, such as the E. histolytica/E. dispar group when species-level distinction has not been made.',
          'Do not let a nonpathogenic protozoan distract from other causes of symptoms when the clinical picture does not fit.',
          'If coccidia or microsporidia are suspected but routine O&P is negative, recommend the appropriate special stain, antigen test, or molecular method according to lab policy.',
          'Preservation, collection timing, and repeat specimens can matter more than a single negative result.'
        ]
      }
    ]
  },
  {
    id: 'blood-and-tissue-protozoa',
    label: 'Blood and Tissue Protozoa',
    category: 'Parasitology',
    title: 'Blood and Tissue Protozoa',
    summary: 'A practical guide to protozoa recovered from blood, tissue, bone marrow, lesions, or other non-stool specimens, including malaria parasites, Babesia, trypanosomes, Leishmania, Toxoplasma, and free-living amoebae.',
    highlights: [
      'Blood and tissue protozoa are often driven by travel, vector exposure, transfusion/transplant risk, immune status, and urgency of disease.',
      'Thick and thin blood films remain core tools for malaria, Babesia, trypanosomes, and microfilariae-like searches, but antigen and molecular tests can support selected workflows.',
      'Tissue protozoa often require specimen-specific methods such as biopsy, aspirate smear, histopathology, serology, culture, or NAAT.'
    ],
    cards: [
      {
        title: 'Malaria and Babesia',
        body: 'Both may show intraerythrocytic forms, but travel, exposure, parasite morphology, parasitemia, antigen testing, and molecular support help separate the workups.'
      },
      {
        title: 'Trypanosomes',
        body: 'African and American trypanosomes differ by geography, vector, clinical syndrome, and whether blood forms or tissue amastigotes are most relevant.'
      },
      {
        title: 'Leishmania and tissue protozoa',
        body: 'Leishmania, Toxoplasma, and free-living amoebae often require tissue-aware diagnosis rather than routine stool or standard bacterial culture logic.'
      }
    ],
    sections: [
      {
        heading: 'First-pass diagnostic split',
        items: [
          'Blood protozoa are considered when fever, travel, tick exposure, transfusion risk, hemolysis, cyclic symptoms, or compatible geography are present.',
          'Tissue protozoa are considered when lesions, organ involvement, CNS disease, ocular disease, congenital infection, or immunocompromised-host disease is part of the picture.',
          'Specimen choice matters: peripheral blood, thick and thin films, buffy coat, bone marrow, tissue biopsy, lesion aspirate, CSF, or serology/NAAT may be needed depending on the organism.',
          'Urgent possibilities, especially malaria, should not wait for a slow confirmatory pathway if microscopy or rapid testing is available according to local policy.'
        ]
      },
      {
        heading: 'Malaria workflow',
        items: [
          'Use thick films to improve sensitivity and thin films to preserve morphology for species clues and parasitemia estimation.',
          'Report suspected Plasmodium promptly because delayed recognition can be clinically dangerous.',
          'Morphologic clues include ring forms, trophozoites, schizonts, gametocytes, infected red cell changes, and parasitemia pattern.',
          'Rapid antigen tests and NAAT can support detection, but smear review remains important for quantitation and morphology in many workflows.',
          'Repeat smears may be needed when suspicion is high and the initial smear is negative.'
        ]
      },
      {
        heading: 'Babesia workflow',
        items: [
          'Babesia is an intraerythrocytic parasite associated with tick exposure and can resemble malaria on blood film.',
          'Maltese-cross tetrads are a classic clue when present, but they are not always seen.',
          'Travel and exposure history help separate Babesia from Plasmodium because Babesia can be locally acquired in endemic tick regions.',
          'Parasitemia can be clinically significant in asplenic, elderly, or immunocompromised patients.',
          'Serology and molecular testing may support diagnosis depending on clinical setting and laboratory workflow.'
        ]
      },
      {
        heading: 'Trypanosomes and Leishmania',
        items: [
          'African trypanosomiasis is associated with tsetse fly exposure and trypomastigotes may be found in blood or other specimens depending on disease stage.',
          'American trypanosomiasis is caused by Trypanosoma cruzi; acute disease may show blood trypomastigotes, while chronic disease often relies on serologic or molecular strategies.',
          'Leishmania is associated with sand fly exposure and may present as cutaneous, mucocutaneous, or visceral disease.',
          'Leishmania amastigotes may be seen inside macrophages in tissue, aspirate, or bone marrow-type specimens.',
          'Organism detection, serology, culture, and molecular methods are chosen based on species suspicion, disease site, and available lab capability.'
        ]
      },
      {
        heading: 'Other tissue protozoa',
        items: [
          'Toxoplasma gondii diagnosis often depends on immune status, pregnancy/congenital context, serology, molecular testing, histopathology, or organism demonstration in selected specimens.',
          'Free-living amoebae such as Acanthamoeba, Balamuthia, and Naegleria are high-consequence considerations in keratitis, encephalitis, or compatible water/soil exposure syndromes.',
          'CNS or ocular protozoal disease usually requires urgent clinician-laboratory communication because specimen access and test choice are specialized.',
          'Do not rely on routine stool O&P or bacterial-style workflows for tissue protozoa.'
        ]
      },
      {
        heading: 'Reporting and safety discipline',
        items: [
          'Report blood parasite findings promptly and include percent parasitemia or organism burden when the method and policy support it.',
          'When morphology is uncertain, report the safest supported category and recommend confirmatory testing rather than forcing species-level identification.',
          'Vector, travel, transfusion, transplant, pregnancy, and immune-status information can change both test selection and interpretation.',
          'Handle blood and tissue specimens using standard precautions and lab-specific procedures for smear preparation, sharps, aerosol risk, and referral testing.',
          'Communicate urgent or unexpected findings according to local critical-result and public health policies.'
        ]
      }
    ]
  },
  {
    id: 'other-protozoa',
    label: 'Other Protozoa',
    category: 'Parasitology',
    title: 'Other Protozoa',
    summary: 'A practical guide to protozoa that do not fit neatly into routine stool or blood-film workflows, including Trichomonas vaginalis, Toxoplasma gondii, Sarcocystis, and free-living amoebae.',
    highlights: [
      'The specimen source usually decides the workflow: genital specimen, tissue, CSF, ocular material, or reference testing may be more important than routine O&P.',
      'Trichomonas is a urogenital flagellate; motility, antigen, NAAT, and wet-prep timing affect detection.',
      'Free-living amoebae are rare but high-consequence diagnoses where exposure history and urgent referral matter.'
    ],
    cards: [
      {
        title: 'Urogenital protozoa',
        body: 'Trichomonas vaginalis is approached through genital/urine specimens, wet mount when fresh, antigen or molecular testing, and careful correlation with symptoms.'
      },
      {
        title: 'Tissue and congenital protozoa',
        body: 'Toxoplasma and related tissue protozoa are usually investigated with serology, molecular testing, histopathology, or organism demonstration rather than routine stool microscopy.'
      },
      {
        title: 'Free-living amoebae',
        body: 'Naegleria, Acanthamoeba, Balamuthia, and related organisms require syndrome-based suspicion, specialized specimens, and rapid communication.'
      }
    ],
    sections: [
      {
        heading: 'First-pass split',
        items: [
          'Ask whether the organism is being sought from stool, blood, genital material, eye, CSF, respiratory tract, tissue, or an environmental exposure-linked syndrome.',
          'Routine O&P is not the right answer for many of these organisms; the order must match the organism and specimen.',
          'Wet preparations are time-sensitive because motility can fade quickly after collection.',
          'Serology and NAAT can be more useful than morphology when parasite burden is low or tissue sampling is difficult.'
        ]
      },
      {
        heading: 'Trichomonas vaginalis',
        items: [
          'Trophozoites are the diagnostic stage; cysts are not part of the routine diagnostic expectation.',
          'Wet mount depends on fresh specimen quality and prompt examination for motility.',
          'NAAT is commonly more sensitive than microscopy and is often preferred when available.',
          'A negative wet mount does not exclude infection when clinical suspicion remains high.'
        ]
      },
      {
        heading: 'Toxoplasma and Sarcocystis logic',
        items: [
          'Toxoplasma diagnosis depends strongly on pregnancy status, immune status, ocular/CNS disease, and timing of infection.',
          'Serologic patterns, avidity testing, PCR from selected specimens, and tissue findings may all be part of the workup.',
          'Sarcocystis can involve intestinal or muscular disease patterns, so exposure and specimen type shape the diagnostic approach.',
          'Do not interpret tissue protozoa as if they were routine enteric protozoa.'
        ]
      },
      {
        heading: 'Free-living amoebae',
        items: [
          'Naegleria fowleri is linked to warm freshwater nasal exposure and rapidly progressive meningoencephalitis.',
          'Acanthamoeba is important in keratitis, especially contact-lens-associated disease, and can also cause CNS disease.',
          'Balamuthia can cause granulomatous encephalitis and often requires specialized testing through reference laboratories.',
          'Clinical urgency, specimen selection, and communication are the main learning points; these are not routine bench identifications.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report only the organism and stage supported by the method used.',
          'When the suspected organism requires reference testing, clearly communicate specimen requirements and timing.',
          'For high-consequence CNS or ocular infections, notify the appropriate clinical and laboratory leadership immediately according to local policy.',
          'Connect the result to the source: a genital NAAT, a corneal scraping, and a CSF wet mount answer very different questions.'
        ]
      }
    ]
  },
  {
    id: 'intestinal-nematodes',
    label: 'Intestinal Nematodes',
    category: 'Parasitology',
    title: 'Intestinal Nematodes (Roundworms)',
    summary: 'A bench-focused guide to intestinal roundworms, including Ascaris, Enterobius, hookworms, Trichuris, Strongyloides, Capillaria, and related larvae or eggs recovered from stool or perianal specimens.',
    highlights: [
      'Most intestinal nematode workups are morphology-first: egg, larva, or adult worm appearance matters.',
      'Enterobius requires perianal collection rather than relying on routine stool O&P.',
      'Strongyloides is a special case because larvae, autoinfection, and hyperinfection risk change the urgency and method selection.'
    ],
    cards: [
      {
        title: 'Egg-based diagnosis',
        body: 'Ascaris, Trichuris, hookworms, and several less common intestinal nematodes are often recognized by characteristic eggs in stool.'
      },
      {
        title: 'Larvae-based diagnosis',
        body: 'Strongyloides is usually diagnosed by larvae rather than eggs, so concentration, agar plate, Baermann-type methods, or serology may be needed.'
      },
      {
        title: 'Collection matters',
        body: 'Pinworm is best evaluated with a perianal tape preparation collected at the right time, not a casual stool submission.'
      }
    ],
    sections: [
      {
        heading: 'Core stool workflow',
        items: [
          'Use concentration methods to improve recovery of eggs and larvae when stool parasite burden is low.',
          'Identify the parasite stage first: egg, larva, adult worm, or fragment.',
          'Egg morphology includes size, shell thickness, plugs, mammillated coats, segmentation, and whether contents are embryonated.',
          'Larval morphology may require attention to buccal cavity, genital primordium, tail shape, and movement.'
        ]
      },
      {
        heading: 'High-yield organisms',
        items: [
          'Ascaris lumbricoides: large eggs; fertilized and unfertilized forms can look different.',
          'Enterobius vermicularis: flattened-sided eggs recovered by perianal tape preparation.',
          'Trichuris trichiura: barrel-shaped eggs with bipolar plugs.',
          'Hookworms: thin-shelled eggs in stool; larvae may develop if stool is not handled promptly.',
          'Strongyloides stercoralis: rhabditiform larvae in stool and serious autoinfection risk.'
        ]
      },
      {
        heading: 'Strongyloides caution',
        items: [
          'A single negative stool exam may miss Strongyloides because larval output can be intermittent.',
          'Hyperinfection or disseminated disease is a concern in immunosuppressed patients and can involve respiratory or other specimens.',
          'Serology may support diagnosis, but interpretation depends on exposure, immune status, and prior infection.',
          'If Strongyloides is suspected before immunosuppression, the workup deserves special attention.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report the organism and stage, such as egg, larva, or adult worm, whenever possible.',
          'Do not overcall hookworm species from routine eggs alone unless morphology or additional methods support it.',
          'Perianal tape preparations should be reported in the context of Enterobius detection, not as a broad O&P screen.',
          'When larvae are recovered, distinguish Strongyloides-like larvae from hookworm larvae with appropriate caution.'
        ]
      }
    ]
  },
  {
    id: 'tissue-nematodes',
    label: 'Tissue Nematodes',
    category: 'Parasitology',
    title: 'Tissue Nematodes (Roundworms)',
    summary: 'A guide to roundworms that present through tissue, muscle, eye, CNS, skin, or visceral disease rather than simple adult-worm recovery from stool.',
    highlights: [
      'Tissue nematode diagnosis is usually syndrome-driven: eosinophilia, exposure history, imaging, biopsy, serology, or molecular support may be needed.',
      'Trichinella, Toxocara, anisakids, Gnathostoma, Angiostrongylus, and Baylisascaris each point to different specimens and risks.',
      'Routine stool O&P may be negative because humans can be accidental or tissue-stage hosts.'
    ],
    cards: [
      {
        title: 'Larva migrans patterns',
        body: 'Visceral, ocular, neural, and cutaneous migration patterns often require clinical correlation more than routine stool microscopy.'
      },
      {
        title: 'Food exposures',
        body: 'Undercooked meat, fish, shellfish, or other regional exposures can point toward Trichinella, Anisakis, Gnathostoma, or Angiostrongylus.'
      },
      {
        title: 'Tissue-aware testing',
        body: 'Serology, biopsy, histopathology, imaging, and reference testing are common because eggs or adult worms may not be shed in stool.'
      }
    ],
    sections: [
      {
        heading: 'First-pass split',
        items: [
          'Ask whether the syndrome is muscle pain, eosinophilia, ocular disease, CNS disease, migratory swelling, abdominal pain after seafood, or cutaneous larva migrans.',
          'Routine stool microscopy is often unhelpful when humans are not the definitive intestinal host.',
          'Specimen choice may include serum, tissue biopsy, ocular material, CSF, imaging-supported aspirates, or recovered larvae.',
          'Travel, diet, animal exposure, and geography are central to deciding which organism is plausible.'
        ]
      },
      {
        heading: 'High-yield organisms',
        items: [
          'Trichinella spiralis and related species are associated with undercooked meat and muscle invasion.',
          'Toxocara canis/cati can cause visceral or ocular larva migrans after exposure to embryonated eggs from dog or cat environments.',
          'Anisakis is linked to raw or undercooked marine fish and may present with acute gastrointestinal symptoms.',
          'Angiostrongylus cantonensis is associated with eosinophilic meningitis in compatible exposure settings.',
          'Baylisascaris can cause severe neural or ocular larva migrans after raccoon-associated environmental exposure.'
        ]
      },
      {
        heading: 'Bench interpretation',
        items: [
          'Larvae in tissue should be interpreted with the anatomic site, exposure history, and pathologist or reference-lab input.',
          'Serology can help, but cross-reactivity and timing can complicate interpretation.',
          'Eosinophilia supports a helminth differential but is not organism-specific.',
          'When worms or larvae are submitted grossly, preserve morphology and follow local parasite identification handling procedures.'
        ]
      }
    ]
  },
  {
    id: 'filarial-nematodes',
    label: 'Filarial Nematodes',
    category: 'Parasitology',
    title: 'Blood and Tissue Filarial Nematodes',
    summary: 'A guide to filarial nematodes and microfilariae, including lymphatic filariasis, Loa loa, Onchocerca, Mansonella, and related blood or skin-based diagnostic workflows.',
    highlights: [
      'Microfilariae detection depends on specimen type, collection timing, concentration method, and species morphology.',
      'Some filarial infections are best sought in blood; others require skin snips, tissue, or serologic support.',
      'Periodicity matters: the best collection time may differ by organism and geography.'
    ],
    cards: [
      {
        title: 'Blood microfilariae',
        body: 'Wuchereria, Brugia, Loa loa, and some Mansonella species may be evaluated by thick blood films, concentration, buffy coat methods, or molecular tests.'
      },
      {
        title: 'Skin microfilariae',
        body: 'Onchocerca volvulus is classically linked to skin snip examination and ocular disease risk rather than routine stool testing.'
      },
      {
        title: 'Timing and morphology',
        body: 'Sheath, nuclei pattern, tail nuclei, body size, and periodicity help separate filarial organisms.'
      }
    ],
    sections: [
      {
        heading: 'Diagnostic workflow',
        items: [
          'Start with the suspected organism group and specimen: blood, skin snip, tissue, eye, or serum.',
          'Collect blood at the timing recommended for the suspected species when periodicity is relevant.',
          'Concentration or filtration methods can improve detection when microfilariae are scant.',
          'Antigen, antibody, and molecular tests may support diagnosis depending on organism and local availability.'
        ]
      },
      {
        heading: 'High-yield organism clues',
        items: [
          'Wuchereria bancrofti and Brugia spp. are associated with lymphatic filariasis.',
          'Loa loa can show microfilariae in blood and is associated with Calabar swelling and eye-worm history.',
          'Onchocerca volvulus is associated with skin and eye disease and is often approached through skin snips or serology-supported workflows.',
          'Mansonella species vary by geography and specimen pattern.',
          'Dracunculus is usually recognized clinically or by worm emergence rather than routine blood-film screening.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report microfilariae with morphology and specimen source; do not force species if the features are incomplete.',
          'Document collection timing when it affects interpretation.',
          'High parasite burden can matter clinically for some therapies, so quantitation may be requested in selected workflows.',
          'Coordinate with reference laboratories when species-level confirmation is needed.'
        ]
      }
    ]
  },
  {
    id: 'intestinal-cestodes',
    label: 'Intestinal Cestodes',
    category: 'Parasitology',
    title: 'Intestinal Cestodes',
    summary: 'A guide to adult tapeworm infections detected through stool eggs, proglottids, scolex morphology, or patient-submitted worm segments.',
    highlights: [
      'Tapeworm workups often begin with eggs or proglottids, but species-level interpretation may require segment or scolex features.',
      'Taenia eggs alone do not reliably separate T. saginata from T. solium.',
      'Hymenolepis, Diphyllobothriid tapeworms, Dipylidium, and other cestodes have distinct egg or segment clues.'
    ],
    cards: [
      {
        title: 'Eggs versus segments',
        body: 'Egg morphology may identify a group, while gravid proglottids or a scolex may be needed for species-level tapeworm workups.'
      },
      {
        title: 'Taenia caution',
        body: 'Taenia solium matters because intestinal infection can be linked to cysticercosis risk in the broader public health context.'
      },
      {
        title: 'Stool and gross specimens',
        body: 'Patient-submitted segments should be handled to preserve morphology and interpreted with travel, diet, and exposure history.'
      }
    ],
    sections: [
      {
        heading: 'First-pass morphology',
        items: [
          'Look for eggs, proglottids, scolices, or adult worm fragments and report the stage recovered.',
          'Taenia-type eggs are thick-walled and radially striated but do not identify the species by themselves.',
          'Hymenolepis nana eggs have polar thickenings and filaments; H. diminuta lacks polar filaments.',
          'Diphyllobothriid eggs are operculated and associated with fish exposure.',
          'Dipylidium caninum is associated with egg packets and pet/flea exposure.'
        ]
      },
      {
        heading: 'Bench workflow',
        items: [
          'Concentration can improve egg recovery, but gross segments may be the key specimen for some tapeworms.',
          'If segments are submitted, avoid crushing them before features are assessed.',
          'Species-level identification should be qualified when only group-level morphology is present.',
          'Correlate with dietary exposures such as beef, pork, fish, or accidental flea ingestion.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Use Taenia species or Taenia-type wording when species cannot be resolved.',
          'Report Hymenolepis, Diphyllobothriid, or Dipylidium when morphology supports it.',
          'Flag findings that may require public health or infection-prevention follow-up according to local policy.',
          'When worm material is inadequate, recommend submission of additional preserved material if needed.'
        ]
      }
    ]
  },
  {
    id: 'tissue-cestodes',
    label: 'Tissue Cestodes',
    category: 'Parasitology',
    title: 'Tissue Cestodes',
    summary: 'A guide to larval tapeworm infections such as cysticercosis, echinococcosis, sparganosis, and related tissue-stage cestode disease.',
    highlights: [
      'Tissue cestode disease is often diagnosed through imaging, serology, histopathology, or carefully handled surgical material.',
      'Echinococcus cysts require special handling because aspiration or disruption can be hazardous.',
      'Taenia solium cysticercosis is a tissue disease and should not be confused with simple intestinal Taenia egg recovery.'
    ],
    cards: [
      {
        title: 'Cysticercosis',
        body: 'Larval Taenia solium infection can involve CNS, eye, muscle, or subcutaneous tissue and usually requires imaging plus serologic or pathologic support.'
      },
      {
        title: 'Echinococcus',
        body: 'Hydatid or alveolar cyst disease is approached carefully with imaging, serology, and specialized specimen handling.'
      },
      {
        title: 'Sparganosis and others',
        body: 'Migrating larval cestodes may be recognized in tissue specimens and require exposure-aware interpretation.'
      }
    ],
    sections: [
      {
        heading: 'Diagnostic mindset',
        items: [
          'Do not expect stool eggs when humans are serving as the intermediate or accidental host.',
          'Imaging findings, lesion site, travel, animal exposure, and diet guide the differential.',
          'Serology can support diagnosis but may vary by cyst location, burden, and organism.',
          'Histopathology or gross parasite recovery may provide definitive clues when tissue is removed.'
        ]
      },
      {
        heading: 'High-yield organism clues',
        items: [
          'Taenia solium cysticercosis is clinically important in neurocysticercosis and ocular disease.',
          'Echinococcus granulosus is associated with cystic hydatid disease, often involving liver or lung.',
          'Echinococcus multilocularis can cause infiltrative alveolar disease.',
          'Sparganosis is linked to Spirometra larvae and exposure patterns such as undercooked intermediate hosts or poultices in some regions.'
        ]
      },
      {
        heading: 'Safety and reporting',
        items: [
          'Potential hydatid cyst material should be handled with laboratory and surgical precautions according to local policy.',
          'Report tissue-stage cestodes with cautious wording if only fragments are seen.',
          'Coordinate with pathology, radiology, infectious disease, and reference laboratories when confirmation is needed.',
          'Connect the tissue diagnosis back to prevention and exposure counseling through the clinical team.'
        ]
      }
    ]
  },
  {
    id: 'intestinal-trematodes',
    label: 'Intestinal Trematodes',
    category: 'Parasitology',
    title: 'Intestinal Trematodes',
    summary: 'A guide to intestinal flukes, including foodborne trematodes detected mainly by eggs in stool and interpreted with exposure history.',
    highlights: [
      'Intestinal flukes are commonly foodborne and tied to aquatic plants, freshwater fish, or other regional dietary exposures.',
      'Eggs may overlap morphologically with other fluke groups, so exposure and size help interpretation.',
      'Routine stool O&P can detect eggs, but species-level identification may be limited.'
    ],
    cards: [
      {
        title: 'Foodborne flukes',
        body: 'Fasciolopsis, Heterophyes, Metagonimus, Echinostoma, and related organisms are approached by stool ova and exposure history.'
      },
      {
        title: 'Egg overlap',
        body: 'Operculated eggs can resemble liver or lung fluke eggs, so measurements and clinical context are important.'
      },
      {
        title: 'Bench wording',
        body: 'When morphology is not definitive, report the safest supported fluke group rather than overcalling species.'
      }
    ],
    sections: [
      {
        heading: 'Diagnostic workflow',
        items: [
          'Use stool concentration and careful egg morphology when intestinal flukes are suspected.',
          'Ask about aquatic plants, raw or undercooked freshwater fish, and region-specific food habits.',
          'Measure eggs when possible because size helps separate fluke groups.',
          'Adults or worm fragments are uncommon but can support identification if recovered.'
        ]
      },
      {
        heading: 'Interpretation cautions',
        items: [
          'Small intestinal fluke eggs can be difficult to separate from some liver fluke eggs by routine microscopy alone.',
          'Fasciolopsis-type eggs can be large and operculated and may overlap with Fasciola-like interpretations.',
          'Clinical syndrome and exposure history should be included in the interpretive mindset.',
          'Negative stool testing does not exclude very early infection before egg production.'
        ]
      }
    ]
  },
  {
    id: 'liver-lung-trematodes',
    label: 'Liver and Lung Trematodes',
    category: 'Parasitology',
    title: 'Liver and Lung Trematodes',
    summary: 'A guide to flukes involving biliary or pulmonary disease, including Clonorchis, Opisthorchis, Fasciola, and Paragonimus.',
    highlights: [
      'Liver and lung flukes are strongly exposure-driven: freshwater fish, aquatic plants, crab, crayfish, and endemic geography matter.',
      'Eggs may be found in stool, sputum, biliary specimens, or tissue depending on organism and disease site.',
      'Serology and imaging can support diagnosis when eggs are not yet detectable or disease is extraintestinal.'
    ],
    cards: [
      {
        title: 'Liver flukes',
        body: 'Clonorchis and Opisthorchis are associated with biliary infection after raw or undercooked freshwater fish exposure.'
      },
      {
        title: 'Fasciola',
        body: 'Fasciola is linked to aquatic plants and may require serology early because eggs appear later after biliary maturation.'
      },
      {
        title: 'Paragonimus',
        body: 'Paragonimus is a lung fluke associated with crab or crayfish exposure; eggs may be found in sputum or stool.'
      }
    ],
    sections: [
      {
        heading: 'Specimen logic',
        items: [
          'Stool examination can recover eggs swallowed from biliary or pulmonary sources.',
          'Sputum examination is important when Paragonimus is suspected and pulmonary symptoms are present.',
          'Serology may help in early or ectopic disease when eggs are not yet present.',
          'Imaging and clinical history often drive the request before the parasite is seen.'
        ]
      },
      {
        heading: 'High-yield clues',
        items: [
          'Clonorchis and Opisthorchis: small operculated eggs and biliary disease after freshwater fish exposure.',
          'Fasciola: large operculated eggs later in infection; aquatic plant exposure is a key clue.',
          'Paragonimus: operculated eggs in sputum or stool and chronic cough or hemoptysis in compatible exposure settings.',
          'Egg size, source, and exposure help prevent overcalling one fluke group as another.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report fluke eggs with organism group and specimen source when species-level confidence is limited.',
          'Recommend correlation with exposure history and additional testing when morphology overlaps.',
          'Communicate unexpected pulmonary or biliary parasite findings promptly according to local policy.',
          'Document whether eggs were seen in stool, sputum, bile, or tissue because that changes interpretation.'
        ]
      }
    ]
  },
  {
    id: 'blood-trematodes',
    label: 'Blood Trematodes',
    category: 'Parasitology',
    title: 'Blood Trematodes',
    summary: 'A guide to Schistosoma species and blood fluke diagnosis using urine, stool, tissue, serology, and exposure-driven interpretation.',
    highlights: [
      'Schistosoma workups are driven by freshwater exposure in endemic regions and by whether urinary or intestinal disease is suspected.',
      'Egg morphology, especially spine position, helps separate major Schistosoma groups.',
      'Serology can support diagnosis in travelers or light infections, but eggs remain important when detectable.'
    ],
    cards: [
      {
        title: 'Urinary schistosomiasis',
        body: 'Schistosoma haematobium is classically associated with terminal-spined eggs in urine and urinary tract disease.'
      },
      {
        title: 'Intestinal schistosomiasis',
        body: 'Schistosoma mansoni, japonicum, and related species are typically evaluated through stool, tissue, or serology-supported workflows.'
      },
      {
        title: 'Exposure clue',
        body: 'Freshwater contact in endemic areas is the key history that makes Schistosoma testing make sense.'
      }
    ],
    sections: [
      {
        heading: 'Diagnostic workflow',
        items: [
          'Choose urine, stool, tissue, or serology based on suspected species group and clinical syndrome.',
          'Concentration and timed urine collection can improve recovery for urinary disease when requested by local protocol.',
          'Egg spine position and morphology are central microscopy clues.',
          'Serology may be useful when egg burden is low, especially in travelers, but it does not always distinguish active from past exposure.'
        ]
      },
      {
        heading: 'Species clues',
        items: [
          'S. haematobium: terminal-spined eggs, often urine-associated.',
          'S. mansoni: large lateral-spined eggs, usually stool or tissue-associated.',
          'S. japonicum group: smaller eggs with a less prominent lateral knob or spine-like feature.',
          'Hybrid or less common Schistosoma patterns may require reference-lab support.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report the egg morphology and specimen source, not just the genus.',
          'If eggs are not detected but exposure is strong, recommend appropriate serology or repeat/alternate specimen testing according to policy.',
          'Consider tissue involvement when stool or urine is negative but compatible disease persists.',
          'Schistosoma findings can have public health and travel-medicine implications, so clarity matters.'
        ]
      }
    ]
  },
  {
    id: 'fungal-identification-overview',
    label: 'Fungal Identification Overview',
    category: 'Mycology',
    title: 'Overview of Fungal Identification Methods and Strategies',
    summary: 'A bench-focused introduction to mycology workups: specimen source, direct exam, culture, morphology, temperature, histopathology, antigen, serology, molecular testing, and safety.',
    highlights: [
      'Fungal identification starts with the specimen and clinical syndrome, then uses direct microscopy, culture morphology, and targeted nonculture methods.',
      'Yeasts, molds, dermatophytes, dimorphic fungi, and opportunistic molds require different interpretive habits.',
      'Some fungi are safety-sensitive; suspicious dimorphic molds or high-risk isolates should be handled according to local biosafety procedures.'
    ],
    cards: [
      {
        title: 'Direct exam first',
        body: 'KOH, calcofluor white, Gram stain, GMS, PAS, India ink, or wet preparations can provide early clues before culture matures.'
      },
      {
        title: 'Culture adds morphology',
        body: 'Colony texture, pigment, growth rate, temperature behavior, and microscopic structures help separate molds, yeasts, and dermatophytes.'
      },
      {
        title: 'Nonculture methods matter',
        body: 'Antigen, antibody, beta-D-glucan, galactomannan, MALDI-TOF, sequencing, and NAAT can support diagnosis when morphology is slow or incomplete.'
      }
    ],
    sections: [
      {
        heading: 'First-pass specimen logic',
        items: [
          'Skin, hair, and nail specimens point toward dermatophyte and superficial fungal workflows.',
          'Respiratory, tissue, sterile fluid, blood, and CSF specimens require clinical correlation because fungi may represent colonization, contamination, or invasive disease.',
          'Tissue histopathology can show invasion even when culture is negative, especially for fragile or fastidious molds.',
          'Blood culture, fungal isolator methods, or specialized bottles may be needed for selected yeasts and dimorphic fungi.'
        ]
      },
      {
        heading: 'Microscopy vocabulary',
        items: [
          'Yeast forms include budding yeast, pseudohyphae, true hyphae, capsules, germ tubes, and arthroconidia depending on organism.',
          'Mold interpretation uses hyphae, septation, branching angle, conidiophores, phialides, macroconidia, microconidia, sporangia, and fruiting structures.',
          'Hyaline molds have lightly pigmented or nonpigmented hyphae; dematiaceous molds have darkly pigmented cell walls.',
          'Mucorales-type hyphae are broad, ribbon-like, and pauciseptate in tissue, while many hyaline molds are narrower and septate.'
        ]
      },
      {
        heading: 'Culture and incubation strategy',
        items: [
          'Sabouraud-style media, inhibitory mold media, brain heart infusion media, and dermatophyte-focused media are chosen based on source and suspicion.',
          'Cycloheximide-containing media can suppress some contaminants but may also inhibit clinically important fungi, so media choice matters.',
          'Temperature can help separate dimorphic patterns and support organism recovery.',
          'Molds may require days to weeks for useful morphology; preliminary reports should match the confidence level.'
        ]
      },
      {
        heading: 'Nonculture support',
        items: [
          'Histopathology shows tissue invasion and fungal morphology but may not provide species-level identification.',
          'Antigen tests can support selected infections such as cryptococcosis, histoplasmosis, aspergillosis, or certain endemic mycoses depending on the assay.',
          'Serology can help with some endemic or allergic fungal diseases but is syndrome-dependent.',
          'Molecular identification or sequencing is useful when morphology is incomplete, isolate identity is unusual, or susceptibility expectations depend on species.'
        ]
      },
      {
        heading: 'Safety and reporting discipline',
        items: [
          'Avoid opening suspicious mold cultures outside the appropriate containment workflow.',
          'Report direct-exam findings promptly when they suggest invasive disease, such as broad pauciseptate hyphae or hyaline septate hyphae in tissue.',
          'Do not overcall a contaminant or colonizer as invasive disease without source and clinical context.',
          'When morphology supports only a group-level result, report the group and recommend confirmatory identification if clinically needed.'
        ]
      }
    ]
  },
  {
    id: 'hyaline-molds-dermatophytes',
    label: 'Hyaline Molds, Mucorales, and Dermatophytes',
    category: 'Mycology',
    title: 'Hyaline Molds, Mucorales, Dermatophytes, and Opportunistic Mycoses',
    summary: 'A practical guide to common mold categories: hyaline septate molds, Mucorales, dermatophytes, and key opportunistic or systemic mold patterns.',
    highlights: [
      'The first mold split is often tissue morphology: septate hyaline hyphae, broad pauciseptate hyphae, pigmented hyphae, yeast-like forms, or dermatophyte structures.',
      'Aspergillus, Fusarium, Scedosporium/Lomentospora, Mucorales, and dermatophytes have different clinical urgency and susceptibility expectations.',
      'Dermatophyte workups are specimen-quality dependent, while invasive mold workups depend heavily on tissue, culture, and rapid communication.'
    ],
    cards: [
      {
        title: 'Hyaline septate molds',
        body: 'Aspergillus-like molds show hyaline septate hyphae in tissue; culture morphology and molecular identification help separate clinically important genera.'
      },
      {
        title: 'Mucorales',
        body: 'Broad ribbon-like pauciseptate hyphae in tissue suggest a high-urgency invasive mold pattern that should be communicated promptly.'
      },
      {
        title: 'Dermatophytes',
        body: 'Trichophyton, Microsporum, and Epidermophyton are usually evaluated from skin, hair, or nail using direct exam and culture morphology.'
      }
    ],
    sections: [
      {
        heading: 'Hyaline mold workflow',
        items: [
          'Hyaline septate hyphae in tissue are an urgent morphologic clue but do not identify the organism by themselves.',
          'Aspergillus is suggested by compatible culture morphology such as conidial heads, vesicles, phialides, and colony features.',
          'Fusarium can produce canoe- or banana-shaped macroconidia and may be recovered from blood in disseminated disease.',
          'Scedosporium and Lomentospora can resemble Aspergillus clinically but may have very different antifungal implications.',
          'Acremonium, Scopulariopsis, Purpureocillium, Paecilomyces-like molds, and other hyaline molds often require careful identification beyond first-pass microscopy.'
        ]
      },
      {
        heading: 'Mucorales workflow',
        items: [
          'Tissue showing broad, irregular, ribbon-like, pauciseptate hyphae with wide-angle branching should raise concern for mucormycosis-type disease.',
          'Culture may be negative even when tissue shows compatible hyphae, so histopathology and direct exam are important.',
          'Common genera include Rhizopus, Mucor, Lichtheimia, Rhizomucor, Cunninghamella, and related molds.',
          'Rapid communication is important because treatment and surgical decisions can be time-sensitive.'
        ]
      },
      {
        heading: 'Dermatophyte workflow',
        items: [
          'Good specimen collection from the active edge of a lesion, infected nail material, or involved hair improves recovery.',
          'KOH or calcofluor direct exam can show septate hyphae or arthroconidia before culture is available.',
          'Trichophyton, Microsporum, and Epidermophyton are separated by macroconidia, microconidia, colony pigment, growth features, and selected adjunct tests.',
          'Dermatophyte culture can be slow, and nondermatophyte molds from nails require cautious interpretation.'
        ]
      },
      {
        heading: 'Opportunistic and systemic patterns',
        items: [
          'Invasive mold disease is shaped by host status, especially neutropenia, transplant, corticosteroid exposure, diabetes, trauma, burns, and indwelling devices.',
          'Endemic dimorphic fungi require biosafety-aware handling and may be supported by antigen, serology, histopathology, culture, or molecular methods.',
          'Yeast-like or mold-like growth from nonsterile respiratory specimens may represent colonization, so tissue invasion and host context matter.',
          'Antifungal susceptibility expectations differ by genus, so accurate identification can affect therapy.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report tissue morphology promptly using descriptive language when species is not yet known.',
          'Avoid saying Aspergillus solely from tissue hyphae unless culture, histopathology, molecular data, or local criteria support it.',
          'For dermatophytes, report the organism level supported by culture morphology and adjunct testing.',
          'Escalate unusual molds, sterile-site isolates, or high-consequence morphology to confirmatory identification when clinically important.'
        ]
      }
    ]
  },
  {
    id: 'dematiaceous-molds',
    label: 'Dematiaceous Molds',
    category: 'Mycology',
    title: 'Dematiaceous (Melanized) Molds',
    summary: 'A guide to pigmented molds and their major clinical patterns, including phaeohyphomycosis, chromoblastomycosis, eumycetoma, allergic disease, keratitis, and CNS infection.',
    highlights: [
      'Dematiaceous molds have melanin in the cell wall, producing dark colonies and pigmented hyphae or fungal elements.',
      'Clinical labels matter: chromoblastomycosis, phaeohyphomycosis, eumycetoma, allergic fungal sinusitis, and keratitis are different diagnostic patterns.',
      'Culture morphology can be difficult, so sterile-site isolates, tissue disease, or unusual molds often need confirmatory identification.'
    ],
    cards: [
      {
        title: 'Pigment is the branch point',
        body: 'Dark hyphae or dark colonies should move students into dematiaceous mold thinking rather than generic hyaline mold logic.'
      },
      {
        title: 'Tissue pattern matters',
        body: 'Sclerotic bodies, pigmented hyphae, grains, or invasive tissue elements point to different clinical syndromes.'
      },
      {
        title: 'Do not overcall species',
        body: 'Many melanized molds require detailed conidial morphology or sequencing for confident identification.'
      }
    ],
    sections: [
      {
        heading: 'First-pass split',
        items: [
          'A dark mold colony, pigmented hyphae, or brown-black fungal elements in tissue should prompt dematiaceous mold consideration.',
          'These molds can cause superficial, cutaneous, subcutaneous, allergic, sinus, ocular, pulmonary, CNS, or disseminated disease depending on host and species.',
          'The source matters: skin lesion, sinus contents, cornea, tissue biopsy, sterile fluid, and respiratory culture have different interpretive weight.',
          'Environmental contamination is possible, but pigmented molds from sterile tissue or compatible lesions deserve careful workup.'
        ]
      },
      {
        heading: 'Clinical syndrome patterns',
        items: [
          'Chromoblastomycosis is associated with muriform or sclerotic bodies in tissue and chronic verrucous skin lesions.',
          'Phaeohyphomycosis is a broad pattern with pigmented hyphae or yeast-like fungal elements in tissue.',
          'Eumycetoma involves draining sinuses and grains, often after traumatic inoculation.',
          'Allergic fungal sinusitis and fungal balls can involve dematiaceous molds without the same meaning as invasive disease.',
          'Some dematiaceous molds are notable for neurotropism or CNS disease, especially in high-risk clinical settings.'
        ]
      },
      {
        heading: 'Bench morphology',
        items: [
          'Colony colors may be olive, gray, brown, black, or suede-like to woolly depending on the mold and age.',
          'Microscopy focuses on septate pigmented hyphae, conidiophores, phialides, annellides, conidia arrangement, and conidial shape.',
          'Commonly encountered groups include Alternaria, Curvularia, Bipolaris, Exserohilum, Cladosporium-like molds, Exophiala, Phialophora, Fonsecaea, and Cladophialophora.',
          'Morphology may be insufficient or slow, so sequencing or reference identification is often appropriate for clinically significant isolates.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report pigmented fungal elements descriptively from tissue when genus-level identification is not yet supported.',
          'Separate colonization or contamination from invasive disease by considering specimen source and histopathologic invasion.',
          'Escalate sterile-site, CNS, ocular, deep tissue, or persistent isolates for confirmatory identification.',
          'Communicate with clinicians when tissue findings suggest invasive melanized mold infection.'
        ]
      }
    ]
  },
  {
    id: 'dimorphic-systemic-fungi',
    label: 'Dimorphic and Systemic Fungi',
    category: 'Mycology',
    title: 'Dimorphic and Systemic Fungi',
    summary: 'A guide to thermally dimorphic and systemic fungi, emphasizing biosafety, geography, tissue morphology, culture conversion, antigen, serology, and molecular support.',
    highlights: [
      'Dimorphic fungi often grow as molds in the environment or culture and appear as yeast-like or spherule forms in tissue.',
      'Geography and exposure history are core diagnostic data, not trivia.',
      'Suspicious mold-phase cultures can be hazardous and should be handled according to local biosafety procedures.'
    ],
    cards: [
      {
        title: 'Temperature and form',
        body: 'Dimorphic fungi change form with temperature and host environment; culture form and tissue form may look very different.'
      },
      {
        title: 'Geography is a test clue',
        body: 'Histoplasma, Blastomyces, Coccidioides, Paracoccidioides, Sporothrix, and Talaromyces each have exposure patterns that guide testing.'
      },
      {
        title: 'Safety first',
        body: 'Do not casually manipulate suspicious mold cultures; escalate to the lab workflow built for dimorphic fungi.'
      }
    ],
    sections: [
      {
        heading: 'Diagnostic strategy',
        items: [
          'Start with syndrome, geography, travel, occupation, animal or soil exposure, immune status, and specimen source.',
          'Tissue morphology can be very helpful but may need culture, antigen, serology, or molecular confirmation.',
          'Antigen testing can support selected endemic mycoses, especially when organism burden is high or invasive disease is suspected.',
          'Serology is useful for some systemic mycoses but depends on timing, immune status, and organism.',
          'Culture remains important but may be slow and safety-sensitive.'
        ]
      },
      {
        heading: 'High-yield tissue clues',
        items: [
          'Histoplasma: small yeasts, often intracellular within macrophages.',
          'Blastomyces: broad-based budding yeast forms in tissue.',
          'Coccidioides: spherules containing endospores rather than typical budding yeast.',
          'Paracoccidioides: multiple budding yeast forms that can resemble a mariner-wheel pattern.',
          'Sporothrix: cigar-shaped yeast forms may be sparse; lymphocutaneous disease is a classic clinical pattern.',
          'Talaromyces marneffei: yeast-like forms that divide by fission and may show a transverse septum.'
        ]
      },
      {
        heading: 'Culture and safety',
        items: [
          'Mold-phase growth may produce infectious conidia, so suspicious cultures should remain within approved containment workflows.',
          'Do not set up tease mounts or slide cultures on suspicious dimorphic molds unless local policy permits and containment is appropriate.',
          'Conversion, MALDI-TOF with validated libraries, sequencing, probes, or reference-lab testing may support identification.',
          'Preliminary reporting should avoid overconfidence when only broad morphology is known.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Communicate suspected systemic fungal disease promptly when tissue morphology, antigen, or culture suggests an urgent diagnosis.',
          'Tie the interpretation to source: respiratory culture, tissue biopsy, blood, bone marrow, CSF, and skin lesion specimens do not carry the same weight.',
          'Use antigen and serology results as supportive evidence rather than standalone organism proof in every setting.',
          'Escalate suspected high-consequence dimorphic fungi according to local biosafety and public health workflows.'
        ]
      }
    ]
  },
  {
    id: 'yeasts',
    label: 'Yeasts',
    category: 'Mycology',
    title: 'The Yeasts',
    summary: 'A bench guide to medically important yeasts and yeast-like fungi, including Candida, Cryptococcus, Malassezia, Trichosporon, Saccharomyces, Rhodotorula, and related organisms.',
    highlights: [
      'Yeast identification combines source, Gram stain or direct exam, colony morphology, germ tube or rapid ID tests, biochemical methods, MALDI-TOF, and susceptibility context.',
      'Candida from a sterile site is interpreted very differently from Candida in a mixed mucosal specimen.',
      'Cryptococcus, Malassezia, Trichosporon, Rhodotorula, and other yeasts have distinct bench and clinical clues.'
    ],
    cards: [
      {
        title: 'Candida logic',
        body: 'Candida workups use budding yeast, pseudohyphae, germ tube or rapid tests, chromogenic media, biochemical ID, MALDI-TOF, and source-based interpretation.'
      },
      {
        title: 'Cryptococcus logic',
        body: 'Encapsulated yeast, cryptococcal antigen, India ink in selected settings, and CNS or immunocompromised-host context shape interpretation.'
      },
      {
        title: 'Unusual yeasts',
        body: 'Malassezia, Trichosporon, Rhodotorula, Saccharomyces, and related yeasts may require organism-aware media, ID, and susceptibility thinking.'
      }
    ],
    sections: [
      {
        heading: 'First-pass yeast workflow',
        items: [
          'Start with source: blood, sterile fluid, catheter, respiratory specimen, urine, wound, vaginal specimen, skin, or CSF.',
          'Direct exam may show budding yeast, pseudohyphae, true hyphae, capsule, arthroconidia, or yeast-like cells.',
          'Colony color, texture, growth rate, chromogenic reactions, and microscopic morphology guide first-pass grouping.',
          'MALDI-TOF, biochemical panels, sequencing, or targeted tests may be used for final identification.',
          'Susceptibility testing is organism- and source-dependent and is especially important for invasive Candida infections.'
        ]
      },
      {
        heading: 'Candida and related yeasts',
        items: [
          'Candida albicans and Candida dubliniensis may produce germ tubes, but final identification should follow the lab workflow.',
          'Candida glabrata can be small and may lack pseudohyphae; resistance considerations make accurate ID important.',
          'Candida krusei, Candida auris, and other species have important infection-control or antifungal implications.',
          'Pseudohyphae and budding yeast in tissue or sterile material should be interpreted differently from colonized mucosal sites.',
          'Chromogenic agar can provide rapid clues but should not replace confirmatory ID when clinically important.'
        ]
      },
      {
        heading: 'Cryptococcus workflow',
        items: [
          'Cryptococcus may show encapsulated budding yeasts; capsule detection can be aided by India ink in selected specimens.',
          'Cryptococcal antigen testing is central for meningitis and disseminated disease workups.',
          'Cryptococcus neoformans and Cryptococcus gattii differ epidemiologically and may require appropriate identification when relevant.',
          'CSF, serum, blood culture, respiratory, and tissue results must be interpreted with immune status and clinical syndrome.'
        ]
      },
      {
        heading: 'Other yeast-like fungi',
        items: [
          'Malassezia is lipid-associated and can require lipid supplementation for recovery in some contexts.',
          'Trichosporon can produce arthroconidia and may cause invasive disease in immunocompromised hosts.',
          'Rhodotorula often produces salmon to pink colonies and can be associated with catheter-related infection.',
          'Saccharomyces and other uncommon yeasts may be clinically relevant in the right source and host setting.',
          'Geotrichum-like and other yeast-like fungi may require careful morphology and modern identification support.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Do not treat every yeast isolate as infection; source and host context decide significance.',
          'Report yeasts from sterile sites promptly according to local critical-result policies.',
          'Flag species with infection-control or predictable resistance concerns according to lab protocol.',
          'When the ID is uncertain or uncommon, confirm before attaching clinical assumptions.'
        ]
      }
    ]
  },
  {
    id: 'antifungal-susceptibility',
    label: 'Antifungal Susceptibility and Therapy',
    category: 'Mycology',
    title: 'Antifungal Susceptibility Testing, Therapy, and Prevention',
    summary: 'A guide to antifungal drug classes, susceptibility testing, resistance patterns, reporting discipline, and prevention concepts for clinically significant fungal infections.',
    highlights: [
      'Antifungal susceptibility testing is most useful when the organism, source, and therapy question make the result actionable.',
      'Candida, Cryptococcus, Aspergillus, Mucorales, dermatophytes, and dimorphic fungi do not share one universal AST strategy.',
      'Intrinsic resistance, acquired resistance, breakpoints, epidemiologic cutoff values, and lab method limitations all affect interpretation.'
    ],
    cards: [
      {
        title: 'Drug classes',
        body: 'Major antifungal groups include azoles, echinocandins, amphotericin B, flucytosine, allylamines, and newer or specialized agents.'
      },
      {
        title: 'AST is contextual',
        body: 'Testing is interpreted with species, specimen source, infection severity, host status, expected drug exposure, and validated breakpoints.'
      },
      {
        title: 'Prevention matters',
        body: 'Source control, catheter management, infection prevention, prophylaxis strategy, and stewardship can be as important as the MIC.'
      }
    ],
    sections: [
      {
        heading: 'When AST helps',
        items: [
          'Candida from blood or sterile sites is a common setting where susceptibility testing can guide therapy.',
          'Uncommon yeasts, recurrent infection, breakthrough infection, prior antifungal exposure, or unexpected species should raise the need for careful AST interpretation.',
          'Mold susceptibility testing is more selective and often depends on organism, invasive disease, and reference-lab capability.',
          'Dermatophyte susceptibility testing is not routine in many labs but may matter for suspected resistance or treatment failure.',
          'A susceptibility result should never be interpreted without knowing the organism and specimen source.'
        ]
      },
      {
        heading: 'Major drug classes',
        items: [
          'Azoles inhibit ergosterol synthesis and include fluconazole, voriconazole, posaconazole, itraconazole, and isavuconazole.',
          'Echinocandins inhibit beta-1,3-D-glucan synthesis and are important for many invasive Candida infections.',
          'Amphotericin B binds ergosterol and remains important for selected severe fungal infections despite toxicity considerations.',
          'Flucytosine is used in selected combinations, especially in some Cryptococcus workflows, and resistance can emerge quickly if used alone.',
          'Terbinafine and related agents are important in dermatophyte therapy, where resistance concerns are increasingly relevant.'
        ]
      },
      {
        heading: 'Resistance patterns to remember',
        items: [
          'Candida krusei is intrinsically resistant to fluconazole.',
          'Candida glabrata can show reduced azole susceptibility and may acquire echinocandin resistance.',
          'Candida auris can be multidrug resistant and also creates infection-control concerns.',
          'Aspergillus terreus is often amphotericin B resistant, and azole resistance can occur in Aspergillus fumigatus.',
          'Mucorales are not reliably covered by every mold-active azole, and echinocandins are not primary active agents for mucormycosis.',
          'Cryptococcus, dermatophytes, and dimorphic fungi require organism-specific therapy logic rather than generic yeast or mold assumptions.'
        ]
      },
      {
        heading: 'Testing and reporting discipline',
        items: [
          'Use validated methods and interpretive criteria appropriate for the organism group, such as broth microdilution, gradient diffusion, disk diffusion, or reference-lab methods.',
          'Breakpoints indicate likelihood of response under defined conditions; they are not universal across every species-drug pair.',
          'Epidemiologic cutoff values help identify non-wild-type isolates but do not automatically predict clinical success or failure.',
          'Report comments should flag intrinsic resistance, unusual profiles, and when clinical correlation or infectious disease consultation is recommended.',
          'Do not report antifungal results that the lab cannot support analytically or interpretively.'
        ]
      },
      {
        heading: 'Prevention and stewardship',
        items: [
          'Remove or manage infected catheters and infected tissue when source control is part of care.',
          'Use prophylaxis and empiric therapy thoughtfully because antifungal pressure can select resistant organisms.',
          'Prevent healthcare spread of organisms with infection-control implications, especially Candida auris.',
          'Communicate breakthrough fungal infections promptly because they may suggest resistant organisms, inadequate drug exposure, or host-risk progression.',
          'Stewardship links the lab result to dose, site of infection, species, host status, and source control.'
        ]
      }
    ]
  },
  {
    id: 'virology-methods-overview',
    label: 'Virology Methods and Strategies',
    category: 'Virology',
    title: 'Overview of Virology Methods and Diagnostic Strategies',
    summary: 'A bench-focused introduction to viral diagnosis: specimen timing, transport, molecular testing, antigen detection, serology, culture, cytopathic effect, shell vial methods, and biosafety.',
    highlights: [
      'Viral testing is highly timing-dependent: the right specimen at the right disease stage matters as much as the assay.',
      'NAAT is central for many viruses, but antigen testing, serology, culture, histopathology, and resistance testing still have specific roles.',
      'Interpretation depends on syndrome, immune status, vaccination history, viral shedding, latency, and whether the specimen represents disease site.'
    ],
    cards: [
      {
        title: 'Specimen timing',
        body: 'Early respiratory, lesion, blood, CSF, stool, tissue, or genital specimens may answer very different viral questions.'
      },
      {
        title: 'Molecular methods',
        body: 'PCR and other NAATs detect viral nucleic acid quickly, but positivity may reflect active disease, shedding, latency, or contamination depending on virus and source.'
      },
      {
        title: 'Serology has a lane',
        body: 'IgM, IgG, paired sera, avidity, and immune-status testing are useful when the question is exposure, timing, congenital infection, or immunity.'
      }
    ],
    sections: [
      {
        heading: 'First-pass specimen strategy',
        items: [
          'Match the specimen to the syndrome: nasopharyngeal, lesion swab, CSF, blood/plasma, stool, urine, tissue, genital swab, or ocular specimen.',
          'Viral transport conditions and collection timing can determine whether culture, antigen, or molecular testing succeeds.',
          'For respiratory viruses, early collection from the right anatomic site improves yield.',
          'For vesicular lesions, sample the base of a fresh lesion rather than dry crust when direct viral detection is requested.',
          'For CNS, congenital, transplant, or disseminated disease, the specimen often needs a targeted viral question rather than a broad guess.'
        ]
      },
      {
        heading: 'Core diagnostic methods',
        items: [
          'NAAT detects viral nucleic acid and is often the most sensitive rapid method for many clinical workflows.',
          'Antigen detection can be fast and useful for selected viruses but is usually less sensitive than NAAT.',
          'Serology is useful for immunity or timing questions but may be hard to interpret in immunocompromised hosts, recent vaccination, or early infection.',
          'Viral culture can demonstrate viable virus and support additional characterization, but it is slower and not available for every virus.',
          'Histopathology and cytology can show viral cytopathic effect or inclusions, but morphology alone often needs confirmatory testing.'
        ]
      },
      {
        heading: 'Culture and cytopathic effect',
        items: [
          'Viral culture depends on susceptible cell lines, viable virus, specimen quality, and incubation conditions.',
          'Cytopathic effect patterns can suggest viral groups but are not always definitive.',
          'Shell vial culture uses centrifugation and early staining to accelerate detection for selected viruses.',
          'Some viruses are difficult, slow, hazardous, or impractical to culture in routine clinical laboratories.',
          'A negative culture does not exclude infection when the specimen was late, poorly transported, or not suited to culture.'
        ]
      },
      {
        heading: 'Molecular interpretation',
        items: [
          'Qualitative NAAT answers whether target nucleic acid was detected in that specimen.',
          'Quantitative viral load monitoring is useful for selected chronic or transplant-associated viruses, but trends must be interpreted consistently by specimen type and assay.',
          'Multiplex panels are efficient but can detect colonization, prolonged shedding, or coinfections that require clinical interpretation.',
          'Cycle threshold values are not universally interchangeable between assays and should not be overinterpreted without lab policy.',
          'Resistance genotyping is used for selected viruses when therapy failure, breakthrough, or baseline resistance is clinically relevant.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report viral results with specimen source and method because those details change interpretation.',
          'Avoid implying active disease from a positive result when latency or asymptomatic shedding is plausible.',
          'For public health-significant viruses, follow required reporting and confirmatory workflows.',
          'Communicate urgent positives from CSF, transplant specimens, blood, or high-consequence pathogens according to local policy.',
          'When serology is used, explain whether the result suggests immunity, recent infection, prior exposure, or indeterminate timing.'
        ]
      }
    ]
  },
  {
    id: 'viruses-in-human-disease',
    label: 'Viruses in Human Disease',
    category: 'Virology',
    title: 'Viruses in Human Disease',
    summary: 'A student-friendly overview of clinically important human virus groups, organized by syndrome, transmission, specimen type, and diagnostic approach.',
    highlights: [
      'Virus identification starts with syndrome and source: respiratory, GI, CNS, rash, congenital, hepatitis, transplant, sexually transmitted, or systemic febrile illness.',
      'Some viruses cause acute lytic disease, some establish latency, and some are monitored as chronic infections.',
      'The best test depends on disease stage: NAAT, antigen, serology, viral load, genotyping, culture, or histopathology may each be correct in different settings.'
    ],
    cards: [
      {
        title: 'Syndrome first',
        body: 'Respiratory symptoms, diarrhea, meningitis, hepatitis, rash, congenital disease, transplant illness, or genital lesions each point to different viral panels.'
      },
      {
        title: 'Genome and envelope matter',
        body: 'DNA/RNA genome, envelope, replication strategy, latency, and transmission help explain specimen choice and infection-control behavior.'
      },
      {
        title: 'Do not memorize alone',
        body: 'Use families as anchors, but connect each virus to syndrome, specimen, timing, and the test that answers the clinical question.'
      }
    ],
    sections: [
      {
        heading: 'Respiratory viruses',
        items: [
          'Influenza, RSV, parainfluenza, human metapneumovirus, adenovirus, rhinovirus/enterovirus, seasonal coronaviruses, and SARS-CoV-2 are common respiratory diagnostic targets.',
          'Upper respiratory specimens are often used early in illness, while lower respiratory specimens may be needed for severe pneumonia or selected patients.',
          'NAAT is central for many respiratory workflows; antigen tests can be useful when speed matters and performance is understood.',
          'A positive respiratory panel must be interpreted with symptoms, season, host status, and possible prolonged shedding.'
        ]
      },
      {
        heading: 'Gastrointestinal viruses',
        items: [
          'Norovirus, rotavirus, adenovirus, astrovirus, and sapovirus are major viral gastroenteritis considerations.',
          'Stool NAAT or antigen testing is selected based on patient group, outbreak setting, and lab menu.',
          'Norovirus is a key outbreak virus because a small inoculum, environmental persistence, and person-to-person spread can amplify cases quickly.',
          'Viral GI testing should be interpreted with duration, immune status, and whether bacterial or parasitic causes are also being considered.'
        ]
      },
      {
        heading: 'Herpesviruses and latency',
        items: [
          'HSV and VZV are important in lesion, CNS, ocular, neonatal, and disseminated disease workflows.',
          'CMV, EBV, HHV-6, and related herpesviruses can establish latency and reactivate, especially in transplant or immunocompromised patients.',
          'PCR from the disease site is often more meaningful than broad testing from a nonrepresentative source.',
          'Viral load trends are important for selected transplant-associated viruses, but assay and specimen consistency matter.'
        ]
      },
      {
        heading: 'Hepatitis and bloodborne viruses',
        items: [
          'Hepatitis A and E are usually acute enterically transmitted infections evaluated with serology or molecular methods in selected cases.',
          'Hepatitis B and C require marker interpretation across serology, antigen, antibody, and viral load patterns.',
          'HIV diagnosis and monitoring use antigen/antibody testing, differentiation assays, viral load, and resistance testing depending on the question.',
          'Window periods, vaccination, chronic infection, and treatment status change how results are interpreted.'
        ]
      },
      {
        heading: 'Rash, congenital, and high-consequence viruses',
        items: [
          'Measles, rubella, parvovirus B19, enteroviruses, and arboviruses can present with rash or systemic febrile syndromes.',
          'Congenital infection workups may include CMV, rubella, Zika, HSV, parvovirus, and others depending on exposure and findings.',
          'Arboviruses and zoonotic viruses are geography- and vector-driven; serology and public health testing are often important.',
          'High-consequence viral diseases require immediate communication, biosafety, and public health coordination rather than routine bench handling.'
        ]
      }
    ]
  },
  {
    id: 'antiviral-therapy-susceptibility',
    label: 'Antiviral Therapy and Susceptibility',
    category: 'Virology',
    title: 'Antiviral Therapy, Susceptibility Testing, and Prevention',
    summary: 'A guide to antiviral drug classes, resistance testing, viral load monitoring, reporting discipline, and prevention strategies for clinically important viral infections.',
    highlights: [
      'Antiviral testing is usually organism-specific: HIV, hepatitis viruses, herpesviruses, influenza, CMV, and high-consequence viruses each have different therapy logic.',
      'Resistance testing is most useful when results can change therapy, explain breakthrough infection, or guide management in chronic viral disease.',
      'Prevention includes vaccination, postexposure prophylaxis, infection control, bloodborne precautions, transplant monitoring, and public health reporting.'
    ],
    cards: [
      {
        title: 'Therapy is virus-specific',
        body: 'Antivirals target steps such as entry, uncoating, polymerase activity, reverse transcription, integration, protease processing, or viral release.'
      },
      {
        title: 'Resistance needs context',
        body: 'Genotypic and phenotypic resistance testing must be interpreted with viral load, treatment history, adherence, timing, and assay limitations.'
      },
      {
        title: 'Prevention is part of virology',
        body: 'Vaccination, prophylaxis, isolation, source control, and exposure management often prevent more disease than treatment alone.'
      }
    ],
    sections: [
      {
        heading: 'Major antiviral targets',
        items: [
          'Nucleoside and nucleotide analogs interfere with viral polymerases or reverse transcriptase depending on the virus.',
          'Protease inhibitors block viral protein processing in selected viruses such as HIV and hepatitis C.',
          'Integrase inhibitors prevent HIV integration and are central to many HIV regimens.',
          'Neuraminidase inhibitors and other influenza agents target viral release or replication steps.',
          'Antiherpesvirus drugs such as acyclovir-family agents depend on viral and cellular activation steps that can shape resistance.'
        ]
      },
      {
        heading: 'When resistance testing helps',
        items: [
          'HIV genotypic resistance testing is used at baseline in many workflows and when virologic failure is suspected.',
          'Hepatitis C resistance testing may be used for selected regimens, prior treatment failure, or difficult genotypes depending on guideline context.',
          'CMV resistance testing is considered when viral load rises or fails to respond despite therapy in a compatible clinical setting.',
          'HSV or VZV resistance testing may be needed in persistent disease, especially in immunocompromised patients.',
          'Influenza antiviral resistance testing is usually selective and may involve public health or reference-lab workflows.'
        ]
      },
      {
        heading: 'Genotype, phenotype, and viral load',
        items: [
          'Genotypic testing detects resistance-associated mutations and is faster for many viruses.',
          'Phenotypic testing measures growth or replication in the presence of drug but is slower and less broadly available.',
          'Viral load is often required before resistance testing because insufficient viral nucleic acid can make sequencing fail.',
          'A resistance result should be interpreted with the current regimen, prior drug exposure, and whether the sample represents active replication.',
          'Low-level mutations, mixed populations, and archived resistance can complicate interpretation.'
        ]
      },
      {
        heading: 'Prevention and exposure management',
        items: [
          'Vaccination is central for preventable viral diseases such as influenza, hepatitis A and B, measles, mumps, rubella, varicella, HPV, and others.',
          'Postexposure prophylaxis can be important for HIV, rabies, hepatitis B, varicella, influenza, and other selected exposures.',
          'Infection-control precautions depend on transmission route: respiratory droplets, airborne spread, contact, bloodborne exposure, stool shedding, or vector transmission.',
          'Transplant and immunocompromised-host prevention includes monitoring, prophylaxis, preemptive therapy, and viral load thresholds according to protocol.',
          'Public health coordination is required for selected reportable, outbreak-associated, vaccine-preventable, or high-consequence viruses.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report antiviral resistance results with virus, method, specimen, and interpretive limitations.',
          'Avoid using resistance language when the assay only detects viral nucleic acid or viral load.',
          'Communicate unexpected breakthrough infection or high-consequence viral findings promptly.',
          'Tie antiviral interpretation to therapy question: treatment selection, treatment failure, prophylaxis breakthrough, or infection-control response.',
          'When guidelines change, lab comments and educational tools should be reviewed so students do not learn outdated therapy assumptions.'
        ]
      }
    ]
  },
  {
    id: 'bloodstream-infections',
    label: 'Bloodstream Infections',
    category: 'Organ System Diagnosis',
    title: 'Bloodstream Infection Workup',
    summary: 'A syndrome-first guide to blood culture collection, instrument detection, Gram stain response, organism significance, contamination logic, and follow-up testing.',
    highlights: [
      'Blood culture is a sterile-site workflow: collection quality, bottle volume, number of sets, and timing heavily affect recovery and interpretation.',
      'A positive bottle is not just an ID question; it triggers Gram stain communication, rapid testing decisions, source thinking, and susceptibility planning.',
      'Contaminant versus pathogen depends on organism, number of positive sets, time to positivity, host risk, devices, and clinical syndrome.'
    ],
    cards: [
      {
        title: 'Collection drives yield',
        body: 'Adequate volume from separate venipuncture sites is usually more useful than drawing at a perfect fever spike.'
      },
      {
        title: 'Report the first signal clearly',
        body: 'Gram stain category, bottle source, and critical communication are the first interpretive results before species ID is final.'
      },
      {
        title: 'Do not flatten significance',
        body: 'Staphylococcus aureus, Candida, enteric Gram-negative rods, and anaerobes from blood are handled very differently from a single likely skin contaminant.'
      }
    ],
    sections: [
      {
        heading: 'Specimen strategy',
        items: [
          'Collect the right number of sets from separate sites when possible; this helps distinguish true bacteremia from contamination.',
          'Blood volume is one of the strongest drivers of recovery, especially in adults with low-level bacteremia.',
          'Avoid drawing through existing lines unless the clinical question is catheter-associated infection or peripheral access is not possible.',
          'Document source, time, and collection site because these details matter when interpreting paired line and peripheral cultures.',
          'Do not delay collection when sepsis is suspected, but collect before antibiotics when clinically feasible.'
        ]
      },
      {
        heading: 'Positive bottle workflow',
        items: [
          'Confirm instrument positivity, perform Gram stain promptly, and communicate critical findings using local policy.',
          'Choose rapid molecular, antigen, MALDI-TOF, or subculture-based identification based on Gram stain pattern and lab validation.',
          'Subculture to appropriate media so the isolate can be recovered for identification, susceptibility, purity, and additional workup.',
          'If Gram stain and subculture disagree, consider low organism burden, nonviable organisms, mixed culture, media effects, or technical error.',
          'Mixed Gram stain findings from blood require careful follow-up because polymicrobial bacteremia and contamination are both possible.'
        ]
      },
      {
        heading: 'Pathogen versus contaminant logic',
        items: [
          'Organisms such as S. aureus, beta-hemolytic streptococci, Enterobacterales, Pseudomonas, anaerobes, and yeasts usually deserve serious attention from blood.',
          'Coagulase-negative staphylococci, Corynebacterium-like organisms, Cutibacterium, Bacillus-like organisms, and Micrococcus require source, set count, and host context.',
          'Multiple positive sets, shorter time to positivity, compatible syndrome, prosthetic material, and intravascular devices increase the likelihood of true infection.',
          'One positive bottle with a common skin organism may still matter in an immunocompromised patient or device-associated infection.',
          'Do not dismiss an unusual organism before checking whether it is a recognized endocarditis, catheter, zoonotic, or fastidious pathogen.'
        ]
      },
      {
        heading: 'Special blood culture questions',
        items: [
          'Endocarditis workups need multiple sets and communication about prior antibiotics, prosthetic valves, and fastidious organisms.',
          'Catheter-related infection may use paired peripheral and line cultures, differential time to positivity, or catheter tip culture depending on policy.',
          'Mycobacterial, fungal, or viral bloodstream questions require different bottles, media, or molecular workflows than routine bacterial blood culture.',
          'Suspected Brucella, Francisella, or other high-risk organisms should trigger safety escalation rather than repeated open-bench manipulation.',
          'Candida in blood is not normal flora; recovery should support species-level ID, susceptibility when indicated, and urgent clinical communication.'
        ]
      },
      {
        heading: 'Reporting and follow-up',
        items: [
          'Report preliminary Gram stain in a way that is clear enough to guide urgent care without overcalling final ID.',
          'Update results as rapid ID, subculture, and susceptibility data mature.',
          'Link susceptibility testing to organism significance, source, and validated method; do not report unsupported drug-organism combinations.',
          'Add interpretive comments when contamination, mixed growth, fastidious growth, or special safety concerns are likely.',
          'Keep repeat culture logic clinical: repeat cultures are useful for selected pathogens, endovascular infection, persistent bacteremia, or source-control questions.'
        ]
      }
    ]
  },
  {
    id: 'lower-respiratory-infections',
    label: 'Lower Respiratory Infections',
    category: 'Organ System Diagnosis',
    title: 'Lower Respiratory Tract Infection Workup',
    summary: 'A guide to sputum quality, lower respiratory specimen types, pneumonia testing, colonization pitfalls, and when culture, antigen, NAAT, or special requests are appropriate.',
    highlights: [
      'Lower respiratory diagnosis begins with specimen quality; poor sputum can answer an oral-flora question instead of a pneumonia question.',
      'Routine bacterial culture, viral NAAT, Legionella testing, mycobacterial studies, and fungal workups answer different clinical questions.',
      'Colonization, aspiration, prior antibiotics, and chronic lung disease can make respiratory culture interpretation harder than the colony count suggests.'
    ],
    cards: [
      {
        title: 'Quality before workup',
        body: 'A Gram stain screen helps decide whether sputum represents lower airway inflammation or mostly saliva.'
      },
      {
        title: 'Source changes meaning',
        body: 'Expectorated sputum, tracheal aspirate, BAL, protected brush, tissue, and pleural fluid do not carry the same interpretive weight.'
      },
      {
        title: 'Respiratory panels need context',
        body: 'NAAT can detect viral or bacterial targets quickly, but results must be tied to symptoms, timing, host status, and possible colonization.'
      }
    ],
    sections: [
      {
        heading: 'Specimen choices',
        items: [
          'Expectorated sputum is useful only when the patient produces lower respiratory material with inflammatory cells and limited oral contamination.',
          'Tracheal aspirates and BAL specimens can support ventilator-associated or severe pneumonia workups, but colonization remains possible.',
          'Pleural fluid, lung tissue, and normally sterile lower respiratory specimens carry higher significance and may need broader culture setup.',
          'Nasopharyngeal or anterior nasal swabs may be correct for respiratory viral NAAT but are not substitutes for bacterial pneumonia culture.',
          'AFB, fungal, Legionella, Nocardia, or anaerobic concerns require explicit collection and processing decisions.'
        ]
      },
      {
        heading: 'Gram stain and culture interpretation',
        items: [
          'Screen sputum for squamous epithelial cells, neutrophils, predominant morphology, and mixed oral flora before treating culture growth as meaningful.',
          'Predominant organisms matching inflammation are more convincing than a long list of mixed upper respiratory flora.',
          'A single potential pathogen from a high-quality specimen is more useful than many organisms from a poor specimen.',
          'Quantitative or semiquantitative reporting may help with BAL or protected specimens when validated by local procedure.',
          'Prior antibiotics can reduce recovery and shift culture toward resistant colonizers or residual flora.'
        ]
      },
      {
        heading: 'Common diagnostic lanes',
        items: [
          'Typical bacterial pneumonia workups focus on culture and susceptibility when a representative specimen is available.',
          'Atypical pneumonia may require Legionella antigen and culture, Mycoplasma or Chlamydia-related NAAT/serology, or exposure-driven testing.',
          'Viral pneumonia is often evaluated by NAAT panels, with interpretation shaped by timing and immune status.',
          'Mycobacterial disease requires AFB smear, NAAT when indicated, and mycobacterial culture rather than routine bacterial culture alone.',
          'Fungal pneumonia suspicion depends on host risk, imaging, tissue invasion, culture, antigen, serology, and molecular support.'
        ]
      },
      {
        heading: 'Pitfalls students should expect',
        items: [
          'Candida from routine respiratory specimens usually reflects colonization, not Candida pneumonia.',
          'Pseudomonas, Stenotrophomonas, Burkholderia, and other nonfermenters may be colonizers or pathogens depending on chronic lung disease and specimen quality.',
          'Normal respiratory flora wording should not be interpreted as proof that the patient has no pneumonia.',
          'A negative culture does not exclude infection after antibiotics or with organisms not recovered by routine setup.',
          'Do not order anaerobic culture on expectorated sputum; anaerobic pulmonary questions usually require better lower respiratory or abscess material.'
        ]
      }
    ]
  },
  {
    id: 'upper-respiratory-oral-neck-infections',
    label: 'Upper Respiratory, Oral, and Neck Infections',
    category: 'Organ System Diagnosis',
    title: 'Upper Respiratory, Oral, and Neck Infection Workup',
    summary: 'A practical guide to throat, nasopharyngeal, oral, sinus, and deep neck infection workflows, including when routine culture helps and when targeted testing is better.',
    highlights: [
      'Upper airway sites contain dense normal flora, so testing must be targeted to the syndrome.',
      'Group A strep, pertussis, diphtheria, viral respiratory infection, sinusitis, and deep neck infection require different specimen and safety logic.',
      'Oral and neck infections are often polymicrobial; aspirate or tissue is usually more useful than a surface swab when anaerobes matter.'
    ],
    cards: [
      {
        title: 'Do not culture everything',
        body: 'Routine upper respiratory culture often reports normal flora; targeted tests are usually more useful.'
      },
      {
        title: 'Use the right swab site',
        body: 'Throat, nasopharynx, nasal, oral lesion, and sinus aspirate specimens are not interchangeable.'
      },
      {
        title: 'Deep infections need real specimens',
        body: 'Abscess aspirate, tissue, or operative material is preferred when anaerobic or polymicrobial infection is suspected.'
      }
    ],
    sections: [
      {
        heading: 'Targeted upper airway testing',
        items: [
          'Pharyngitis testing is usually directed at group A Streptococcus by rapid antigen, NAAT, or culture depending on setting.',
          'Pertussis testing requires correct nasopharyngeal collection and timing; throat or anterior nasal swabs may be inadequate for many assays.',
          'Diphtheria concern should trigger immediate public health and safety communication before routine workup assumptions.',
          'Respiratory virus testing uses validated upper respiratory collection devices and must match the assay instructions.',
          'Routine cultures for sore throat, sinus symptoms, or nonspecific upper respiratory illness often produce low-value normal flora.'
        ]
      },
      {
        heading: 'Oral and deep neck workflows',
        items: [
          'Dental, mandibular, peritonsillar, retropharyngeal, and deep neck infections may involve mixed aerobes and anaerobes.',
          'Aspirate or tissue transported properly is preferred over superficial oral swabs.',
          'Gram stain can reveal polymicrobial patterns, fusiform rods, spirochetes, yeast, or predominant organisms that shape culture setup.',
          'Actinomyces, anaerobes, streptococci, oral Gram-negative rods, and Candida-like organisms require source-based interpretation.',
          'Airway compromise, necrotizing infection, or toxin-mediated syndromes should be communicated urgently.'
        ]
      },
      {
        heading: 'Sinus and otolaryngology specimens',
        items: [
          'Sinus aspirates or operative specimens are more meaningful than nasal swabs for bacterial sinusitis.',
          'Chronic sinus disease may require fungal, mycobacterial, or histopathology correlation when tissue invasion is suspected.',
          'Middle ear, mastoid, or invasive skull-base infections require source documentation and may need both aerobic and anaerobic workup.',
          'Nasopharyngeal colonization does not prove invasive disease by the same organism.',
          'Culture results should be interpreted with anatomy, prior antibiotics, device or surgery history, and host status.'
        ]
      }
    ]
  },
  {
    id: 'cns-infections',
    label: 'CNS Infections',
    category: 'Organ System Diagnosis',
    title: 'Meningitis, Encephalitis, and CNS Infection Workup',
    summary: 'A guide to CSF and CNS specimen handling, Gram stain urgency, culture and molecular testing, antigen testing, and interpretation by age, host status, and syndrome.',
    highlights: [
      'CSF is urgent and low-volume; specimen handling, prioritization, and communication matter immediately.',
      'Meningitis, encephalitis, abscess, shunt infection, and chronic meningitis are different diagnostic problems.',
      'Bacterial culture, Gram stain, multiplex NAAT, cryptococcal antigen, AFB/fungal studies, and serology each have specific roles.'
    ],
    cards: [
      {
        title: 'CSF is a critical specimen',
        body: 'Prioritize tests by volume, clinical urgency, age group, immune status, and whether bacterial meningitis is suspected.'
      },
      {
        title: 'Fast does not mean complete',
        body: 'A multiplex CNS panel can help quickly, but culture, susceptibility, and additional testing may still be needed.'
      },
      {
        title: 'Chronic CNS infection is different',
        body: 'TB, fungi, parasites, and selected viruses may require targeted tests beyond routine bacterial culture.'
      }
    ],
    sections: [
      {
        heading: 'First-pass CSF workflow',
        items: [
          'Record tube number, volume, appearance, and timing because bloody taps and low volume affect interpretation.',
          'Gram stain and culture remain central for suspected bacterial meningitis, but sensitivity is affected by organism burden and prior antibiotics.',
          'Critical Gram stain findings from CSF should be communicated promptly according to policy.',
          'Cell count, glucose, protein, and clinical data help interpret microbiology results but do not replace organism detection.',
          'If volume is limited, prioritize the tests most likely to change urgent management.'
        ]
      },
      {
        heading: 'Syndrome-based testing',
        items: [
          'Acute bacterial meningitis may involve pneumococcus, meningococcus, group B Streptococcus, Listeria, Gram-negative rods, or age-specific agents.',
          'Encephalitis workups often include HSV, VZV, enteroviruses, arboviruses, or immune-status-specific viruses.',
          'Cryptococcal meningitis requires cryptococcal antigen, culture, and immune-status context.',
          'TB or fungal meningitis requires larger-volume collection when possible and targeted AFB/fungal culture or molecular testing.',
          'Brain abscess or shunt infection may require tissue, device, or aspirate cultures beyond CSF alone.'
        ]
      },
      {
        heading: 'Interpretation pitfalls',
        items: [
          'A negative Gram stain does not exclude bacterial meningitis, especially after antibiotics or with low organism burden.',
          'A positive molecular result should be interpreted with syndrome and potential contamination or latent viral DNA issues.',
          'Skin flora from shunt or device-associated specimens may be significant when repeatedly recovered or clinically compatible.',
          'CSF culture may be negative in partially treated infection; document antimicrobial exposure when available.',
          'Some CNS infections require public health, infection control, or reference-lab coordination.'
        ]
      }
    ]
  },
  {
    id: 'eye-ear-sinus-infections',
    label: 'Eye, Ear, and Sinus Infections',
    category: 'Organ System Diagnosis',
    title: 'Eye, Ear, and Sinus Infection Workup',
    summary: 'A specimen-focused guide to ocular, ear, mastoid, and sinus infections, emphasizing low-volume samples, site-specific flora, and targeted bacterial, fungal, viral, or parasitic testing.',
    highlights: [
      'Eye and ear specimens are often tiny; collection site and clinical syndrome determine whether culture, stain, NAAT, or special media is useful.',
      'Keratitis, endophthalmitis, conjunctivitis, otitis, mastoiditis, and sinusitis have different organisms and specimen priorities.',
      'Contact lens exposure, trauma, surgery, water exposure, and immunocompromise change the differential quickly.'
    ],
    cards: [
      {
        title: 'Small specimen, high stakes',
        body: 'Ocular specimens may need direct plating, special media, and rapid communication because volume is limited.'
      },
      {
        title: 'Surface flora matters',
        body: 'Conjunctival, external ear, sinus, and deep ocular specimens are interpreted very differently.'
      },
      {
        title: 'Exposure clues are powerful',
        body: 'Contact lenses, trauma, surgery, water exposure, and chronic sinus disease can point to bacterial, fungal, Acanthamoeba, or viral testing.'
      }
    ],
    sections: [
      {
        heading: 'Ocular workups',
        items: [
          'Keratitis may require corneal scraping for Gram stain, culture, fungal testing, Acanthamoeba evaluation, or viral testing depending on risk factors.',
          'Endophthalmitis specimens such as vitreous or aqueous fluid are urgent and should be handled as sterile-site material.',
          'Conjunctivitis testing is often targeted: routine culture, chlamydial/gonococcal testing, viral testing, or no microbiology depending on presentation.',
          'Contact lens-associated keratitis raises concern for Pseudomonas, Acanthamoeba, fungi, and other water-associated organisms.',
          'Direct inoculation at collection may improve recovery when specimen volume is very small.'
        ]
      },
      {
        heading: 'Ear and sinus workups',
        items: [
          'External ear cultures can reflect colonizing flora; invasive otitis or mastoiditis requires better anatomic source documentation.',
          'Middle ear aspirates, mastoid tissue, or operative specimens are more meaningful than external canal swabs for deeper disease.',
          'Sinus aspirates or surgical tissue are preferred for bacterial or fungal sinusitis questions.',
          'Chronic or invasive fungal sinusitis requires tissue invasion assessment, fungal culture, and histopathology correlation.',
          'Skull-base, orbital, or intracranial extension should trigger urgent communication and broad culture considerations.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report organism significance with the exact source whenever possible because surface and sterile ocular sources are not equivalent.',
          'Avoid overinterpreting mixed skin flora from superficial eye or ear swabs.',
          'Escalate Neisseria gonorrhoeae, Corynebacterium diphtheriae concern, invasive mold, Acanthamoeba, or sterile-site positives promptly.',
          'Coordinate with clinicians when low-volume specimens require choosing between bacterial culture, fungal culture, viral NAAT, and microscopy.',
          'Use susceptibility testing when the organism and source justify it and the lab method is validated.'
        ]
      }
    ]
  },
  {
    id: 'urinary-tract-infections',
    label: 'Urinary Tract Infections',
    category: 'Organ System Diagnosis',
    title: 'Urinary Tract Infection Workup',
    summary: 'A guide to urine specimen types, colony count interpretation, pyuria context, mixed growth, catheter-associated infection, and when routine culture is or is not the best answer.',
    highlights: [
      'Urine culture interpretation depends on collection method, colony count, number of organisms, symptoms, and host context.',
      'Clean-catch, catheterized, suprapubic aspirate, nephrostomy, and ileal conduit specimens should not be interpreted identically.',
      'Asymptomatic bacteriuria, contamination, mixed flora, and catheter colonization are common traps for learners.'
    ],
    cards: [
      {
        title: 'Specimen type changes thresholds',
        body: 'A voided urine, catheter urine, and suprapubic aspirate carry different contamination risk and interpretive weight.'
      },
      {
        title: 'Mixed growth is a clue',
        body: 'Multiple organisms in clean-catch urine often suggest contamination, but catheter and complex urinary sources need context.'
      },
      {
        title: 'Culture is not symptoms',
        body: 'Bacteriuria without compatible symptoms may not represent infection, especially in common asymptomatic bacteriuria settings.'
      }
    ],
    sections: [
      {
        heading: 'Specimen and screening logic',
        items: [
          'Clean-catch urine requires patient instruction and prompt transport or preservation to reduce overgrowth.',
          'Catheter urine should be collected from the sampling port, not the drainage bag.',
          'Suprapubic aspirate and sterile urinary tract specimens carry high significance even at lower organism burdens.',
          'Urinalysis findings such as pyuria, leukocyte esterase, nitrite, and microscopy help interpret culture but do not replace clinical context.',
          'Reject or recollect leaking containers, old specimens, unlabeled specimens, or samples that violate local stability rules.'
        ]
      },
      {
        heading: 'Culture interpretation',
        items: [
          'Colony count, organism identity, number of organisms, and specimen type should be interpreted together.',
          'Enterobacterales, Enterococcus, Staphylococcus saprophyticus, Pseudomonas, yeast, and group B Streptococcus can each matter in different settings.',
          'Mixed urogenital flora from a voided specimen often suggests contamination and may require recollection.',
          'Catheter-associated specimens commonly grow colonizers; report comments should avoid implying infection without clinical correlation.',
          'Fastidious, mycobacterial, fungal, or STI-related urinary questions require targeted requests rather than routine urine culture alone.'
        ]
      },
      {
        heading: 'Special urinary scenarios',
        items: [
          'Pregnancy screening, urologic procedures, pyelonephritis, neonatal infection, renal transplant, and obstructive uropathy may change interpretation and follow-up.',
          'Yeast in urine may represent colonization, contamination, catheter-associated growth, or invasive disease depending on host and source.',
          'Schistosoma haematobium, genitourinary tuberculosis, and sexually transmitted pathogens are outside routine bacterial urine culture logic.',
          'Stone-associated or urease-producing organisms may raise concern for Proteus, Morganella, Providencia, Corynebacterium urealyticum, or other alkaline urine patterns.',
          'Susceptibility reporting should match organism significance and local urine antibiogram policy.'
        ]
      }
    ]
  },
  {
    id: 'genital-tract-infections',
    label: 'Genital Tract Infections',
    category: 'Organ System Diagnosis',
    title: 'Genital Tract Infection Workup',
    summary: 'A guide to genital tract syndromes, specimen choice, STI NAAT, wet prep and Gram stain interpretation, genital culture limits, and pregnancy or neonatal considerations.',
    highlights: [
      'Genital tract workups are syndrome-driven: discharge, cervicitis, urethritis, ulcer, vaginitis, pelvic infection, pregnancy, and neonatal disease need different tests.',
      'NAAT is central for many STI targets, while wet prep, Gram stain, culture, serology, and specialized testing still have specific roles.',
      'Routine genital culture can be low-value unless the organism, source, and clinical question are clearly defined.'
    ],
    cards: [
      {
        title: 'Start with syndrome',
        body: 'Urethritis, cervicitis, vaginitis, ulcer disease, PID, epididymitis, and neonatal infection do not use one universal culture.'
      },
      {
        title: 'NAAT is specimen-specific',
        body: 'Urine, vaginal, cervical, urethral, rectal, pharyngeal, and lesion specimens must be validated for the assay being ordered.'
      },
      {
        title: 'Normal flora is not an answer',
        body: 'Genital sites have complex microbiota; the lab result must answer a focused clinical question.'
      }
    ],
    sections: [
      {
        heading: 'Core syndrome lanes',
        items: [
          'Urethritis and cervicitis commonly use NAAT for Chlamydia trachomatis and Neisseria gonorrhoeae, with Mycoplasma genitalium testing in selected persistent cases.',
          'Vaginitis workups may include wet mount, pH, amine test, Gram stain scoring, antigen, NAAT, or culture depending on local workflow.',
          'Genital ulcer disease often requires syphilis serology plus direct HSV or other lesion testing by setting.',
          'Pelvic inflammatory disease is often clinical but may be supported by STI testing and selected culture or molecular tests.',
          'Pregnancy and neonatal contexts may require group B Streptococcus screening, HSV evaluation, or targeted testing for congenital or perinatal pathogens.'
        ]
      },
      {
        heading: 'Specimen discipline',
        items: [
          'Follow the assay instructions for swab type, anatomic site, transport, and stability.',
          'First-catch urine is not the same as midstream urine and is used for different questions.',
          'Extragenital STI testing requires validated rectal or pharyngeal specimens and careful reporting.',
          'Lesion swabs should sample the appropriate lesion stage and base when direct detection is requested.',
          'Avoid routine culture when the expected pathogen requires NAAT, serology, special media, or public health workflow.'
        ]
      },
      {
        heading: 'Interpretation pitfalls',
        items: [
          'A positive NAAT can persist after therapy for a period depending on organism and assay; timing matters.',
          'Gonorrhea culture remains important when susceptibility, treatment failure, or public health investigation is needed.',
          'Bacterial vaginosis is a community pattern, not a single-organism infection.',
          'Candida detection must be interpreted with symptoms because colonization is common.',
          'Mycoplasma and Ureaplasma results require caution because colonization and disease overlap by source and patient group.'
        ]
      }
    ]
  },
  {
    id: 'gastrointestinal-tract-infections',
    label: 'Gastrointestinal Tract Infections',
    category: 'Organ System Diagnosis',
    title: 'Gastrointestinal Tract Infection Workup',
    summary: 'A syndrome-first guide to stool culture, enteric panels, C. difficile testing, ova and parasite workups, toxin testing, outbreak investigation, and collection pitfalls.',
    highlights: [
      'GI testing starts with syndrome: watery diarrhea, bloody diarrhea, foodborne illness, persistent diarrhea, travel, immunocompromise, or outbreak setting.',
      'Routine stool culture, multiplex NAAT, toxin testing, ova and parasite examination, antigen testing, and public health workflows answer different questions.',
      'Stool results can detect pathogens, colonization, toxin genes, or prolonged shedding; interpretation needs symptoms and timing.'
    ],
    cards: [
      {
        title: 'Syndrome drives the menu',
        body: 'Do not use one stool order for every patient; acute inflammatory diarrhea, persistent diarrhea, and suspected C. difficile are different workflows.'
      },
      {
        title: 'Collection timing matters',
        body: 'Fresh stool, transport medium, preservative, and rejection rules can decide whether bacteria, parasites, or toxins are detected.'
      },
      {
        title: 'Panels need interpretation',
        body: 'Multiplex GI panels are fast, but positives can reflect coinfection, shedding, colonization, or targets that need public health follow-up.'
      }
    ],
    sections: [
      {
        heading: 'First-pass GI triage',
        items: [
          'Start with duration, stool character, fever, blood, travel, food exposure, antibiotics, immunocompromise, outbreak risk, and age group.',
          'Acute inflammatory diarrhea may point toward bacterial culture or molecular detection for Salmonella, Shigella, Campylobacter, Shiga toxin-producing E. coli, and related agents.',
          'Watery diarrhea after antibiotics or healthcare exposure raises a C. difficile testing question rather than routine stool culture alone.',
          'Persistent diarrhea, travel, daycare, water exposure, eosinophilia, or immunocompromise may require parasite, viral, or special requests.',
          'Do not test formed stool for workflows that require diarrheal stool unless local policy specifically allows it.'
        ]
      },
      {
        heading: 'Specimen and transport',
        items: [
          'Fresh stool is preferred for many bacterial and molecular workflows; transport medium or preservative depends on the assay.',
          'Ova and parasite workups may require preserved specimens and multiple collections depending on clinical suspicion and lab policy.',
          'Rectal swabs can be acceptable for selected molecular or surveillance workflows when validated, but they are not universal replacements for stool.',
          'Leaking containers, delayed specimens, wrong preservative, and mixed urine or water contamination can make results unreliable.',
          'Outbreak or public health specimens should be collected and routed according to the organism and reporting requirements.'
        ]
      },
      {
        heading: 'Routine and targeted testing',
        items: [
          'Traditional culture remains important for isolate recovery, susceptibility, serotyping, and public health investigation for selected bacterial pathogens.',
          'Shiga toxin testing or molecular detection is critical when enterohemorrhagic E. coli is suspected; reporting should avoid unsupported antibiotic assumptions.',
          'C. difficile testing should be limited to compatible diarrheal illness because colonization is common.',
          'Multiplex GI NAAT can detect many agents quickly but does not always provide viability, quantity, or susceptibility information.',
          'Parasite testing may use concentration, permanent stain, antigen, acid-fast stain, serology, or NAAT depending on suspected organism.'
        ]
      },
      {
        heading: 'Interpretation pitfalls',
        items: [
          'A positive GI panel may detect more than one target; decide which result fits the syndrome and whether confirmatory culture is needed.',
          'Negative routine culture does not exclude viruses, parasites, toxins, fastidious bacteria, or organisms not included in the setup.',
          'C. difficile NAAT positivity without toxin or compatible diarrhea may represent colonization depending on algorithm and patient context.',
          'Normal fecal flora is not a species list and should not be interpreted as proof that no GI pathogen is present.',
          'Some results require infection prevention or public health notification, especially outbreak-associated organisms.'
        ]
      }
    ]
  },
  {
    id: 'skin-soft-tissue-wound-infections',
    label: 'Skin, Soft Tissue, and Wound Infections',
    category: 'Organ System Diagnosis',
    title: 'Skin, Soft Tissue, and Wound Infection Workup',
    summary: 'A practical guide to wound specimen quality, superficial versus deep samples, polymicrobial infection, abscesses, bites, burns, necrotizing infection, and tissue-based diagnosis.',
    highlights: [
      'Wound culture value depends on specimen depth and source; superficial swabs often report colonizing flora rather than the cause of infection.',
      'Abscess, cellulitis, bite wounds, diabetic foot infection, burns, surgical sites, necrotizing infection, and chronic ulcers need different collection logic.',
      'Gram stain, culture atmosphere, anaerobic handling, tissue histology, and clinical urgency shape interpretation.'
    ],
    cards: [
      {
        title: 'Depth matters',
        body: 'Aspirate, tissue, or deep operative material is usually more meaningful than a surface swab from an open wound.'
      },
      {
        title: 'Polymicrobial is expected',
        body: 'Chronic wounds, bites, diabetic foot infections, and abscesses may involve mixed aerobes and anaerobes.'
      },
      {
        title: 'Some wounds are emergencies',
        body: 'Necrotizing soft tissue infection, gas gangrene, toxin syndromes, and invasive mold require rapid communication and escalation.'
      }
    ],
    sections: [
      {
        heading: 'Specimen quality rules',
        items: [
          'Cleanse or debride surface material when appropriate before collecting deeper tissue or aspirate.',
          'Label source precisely: superficial wound, deep tissue, abscess aspirate, bone, surgical site, burn, bite, or device-associated specimen.',
          'Swabs from draining sinuses or chronic ulcers often recover colonizers and may miss deeper pathogens.',
          'Anaerobic culture requires appropriate collection and transport; dry swabs and oxygen exposure reduce recovery.',
          'Tissue and aspirate allow Gram stain correlation and better distinction between colonization and invasive infection.'
        ]
      },
      {
        heading: 'Common wound patterns',
        items: [
          'Purulent abscesses often involve Staphylococcus aureus but may also be polymicrobial depending on site and host.',
          'Nonpurulent cellulitis may not yield a useful culture unless there is drainage, abscess, tissue, blood culture positivity, or unusual exposure.',
          'Bite wounds bring oral flora, anaerobes, Pasteurella-like organisms, Capnocytophaga, Eikenella, and source-specific patterns.',
          'Diabetic foot and pressure ulcers often require deep tissue or bone assessment rather than superficial colonizer recovery.',
          'Burn and surgical site infections require source documentation, resistant organism awareness, and device or graft context.'
        ]
      },
      {
        heading: 'Special concerns',
        items: [
          'Necrotizing infection suspicion should trigger urgent Gram stain review, communication, and broad aerobic/anaerobic culture setup from deep material.',
          'Clostridial myonecrosis, toxin-mediated streptococcal or staphylococcal disease, and rapidly progressive infection need clinical escalation.',
          'Mold from tissue or deep wound material can be significant, especially in trauma, burns, immunocompromise, or post-disaster wounds.',
          'Nocardia, rapidly growing mycobacteria, Sporothrix, Leishmania, and parasites may require special stains, media, incubation, or reference testing.',
          'Hardware, prosthetic material, and biofilm-associated infection can require sonication, prolonged incubation, or specialized workflows by policy.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Report mixed growth in a way that reflects specimen quality and source rather than overwhelming students with a low-value organism list.',
          'Work up organisms more aggressively from deep tissue, sterile sites, bone, or invasive infection than from superficial swabs.',
          'Use Gram stain correlation to decide whether predominant organisms deserve emphasis.',
          'Susceptibility testing should match likely significance, organism burden, and specimen source.',
          'Comments should guide recollection when the submitted specimen is unlikely to answer the clinical question.'
        ]
      }
    ]
  },
  {
    id: 'sterile-fluids-bone-tissue-infections',
    label: 'Sterile Fluids, Bone, Bone Marrow, and Tissue',
    category: 'Organ System Diagnosis',
    title: 'Normally Sterile Body Fluids, Bone, Bone Marrow, and Tissue Workup',
    summary: 'A guide to sterile fluid and tissue microbiology, including source documentation, direct exam, culture setup, concentration, implant-associated infection, bone culture, bone marrow culture, and solid tissue interpretation.',
    highlights: [
      'Normally sterile specimens are high-value; source, volume, transport, and rapid processing strongly affect interpretation.',
      'Fluid, tissue, bone, bone marrow, and device-associated specimens may need aerobic, anaerobic, fungal, mycobacterial, molecular, or histopathology support.',
      'Contamination still happens, but a low-burden organism from a sterile site may be clinically meaningful.'
    ],
    cards: [
      {
        title: 'Exact source matters',
        body: 'Peritoneal fluid, pleural fluid, synovial fluid, pericardial fluid, bone, marrow, and solid tissue are not interchangeable.'
      },
      {
        title: 'Volume helps recovery',
        body: 'Larger sterile fluid volume can improve recovery, especially when direct Gram stain is negative or organism burden is low.'
      },
      {
        title: 'Culture plus context',
        body: 'Histopathology, imaging, cell count, crystals, device history, and prior antibiotics often decide how the culture result is interpreted.'
      }
    ],
    sections: [
      {
        heading: 'Sterile fluid workflow',
        items: [
          'Document the exact body site and whether fluid is peritoneal, pleural, synovial, pericardial, CSF-adjacent, drain fluid, or another source.',
          'Direct Gram stain can be urgent but may be insensitive when organism burden is low.',
          'Centrifugation, blood culture bottle inoculation, or concentration methods may improve recovery for selected fluids when validated.',
          'Set up aerobic, anaerobic, fungal, AFB, or molecular testing based on source and clinical question.',
          'Drain, bag, and longstanding device fluids may reflect colonization unless collected and interpreted carefully.'
        ]
      },
      {
        heading: 'Bone and joint questions',
        items: [
          'Synovial fluid should be interpreted with cell count, crystals, Gram stain, culture, and clinical picture.',
          'Bone culture is more meaningful than superficial ulcer swabs when osteomyelitis is suspected.',
          'Prosthetic joint infection may require multiple tissue specimens, prolonged incubation, sonication, or molecular support by protocol.',
          'Prior antibiotics can reduce recovery and should be documented when available.',
          'Skin flora such as coagulase-negative staphylococci or Cutibacterium can be true pathogens in hardware-associated infection.'
        ]
      },
      {
        heading: 'Bone marrow and solid tissue',
        items: [
          'Bone marrow can be useful for selected systemic infections such as mycobacteria, fungi, Brucella, Leishmania, or disseminated opportunistic disease.',
          'Solid tissue should be divided appropriately for culture, histopathology, molecular testing, or special stains when possible.',
          'Grinding or homogenization may improve tissue culture yield depending on local procedure.',
          'Fungal or AFB culture from tissue often requires longer incubation and specific safety awareness.',
          'A histologic organism in tissue may be more meaningful than growth from a nonsterile surface sample.'
        ]
      },
      {
        heading: 'Interpretation and communication',
        items: [
          'A single organism from a sterile site deserves careful review even when it resembles skin flora.',
          'Mixed growth from sterile fluid may represent bowel leak, traumatic collection, drain colonization, or contamination depending on source.',
          'Communicate positive Gram stain or culture from sterile fluids promptly when urgent management may change.',
          'Susceptibility testing should be performed when the isolate is clinically significant and method support exists.',
          'Use comments to explain when specimen source, low volume, prior antibiotics, or contamination risk limits interpretation.'
        ]
      }
    ]
  },
  {
    id: 'quality-clinical-microbiology-lab',
    label: 'Quality in the Clinical Microbiology Lab',
    category: 'Laboratory Management',
    title: 'Quality in the Clinical Microbiology Laboratory',
    summary: 'A practical guide to quality systems in microbiology: preanalytic controls, QC, verification, documentation, competency, proficiency testing, corrective action, and result-reporting safeguards.',
    highlights: [
      'Quality is not one checklist; it is the full path from specimen collection through final report and follow-up correction.',
      'QC, calibration, validation, verification, competency, proficiency testing, and audits each protect a different part of the testing system.',
      'A failed control, unexplained trend, mislabeled specimen, or unclear report is a patient-care problem, not just paperwork.'
    ],
    cards: [
      {
        title: 'Quality starts before testing',
        body: 'Specimen labeling, transport, acceptability, order accuracy, and source documentation decide whether the lab can produce a meaningful result.'
      },
      {
        title: 'Controls need consequences',
        body: 'QC only protects patients when out-of-range or unexpected results trigger troubleshooting and corrective action.'
      },
      {
        title: 'Reports are part of quality',
        body: 'A technically correct result can still fail if the source, method, critical value, limitation, or interpretation is unclear.'
      }
    ],
    sections: [
      {
        heading: 'Quality system mindset',
        items: [
          'Think of quality as a loop: define the process, perform the work, monitor performance, correct problems, and document improvement.',
          'Preanalytic, analytic, and postanalytic errors require different controls.',
          'Written procedures should match what staff actually do at the bench and should be reviewed when methods change.',
          'Quality indicators such as rejection rates, corrected reports, turnaround time, contamination rates, and proficiency performance show where the system is drifting.',
          'A quality program should make good work easier, not turn quality into a separate ritual from patient testing.'
        ]
      },
      {
        heading: 'Preanalytic quality',
        items: [
          'Specimen identity, source, collection time, transport device, temperature, and stability must be checked before testing.',
          'Rejection criteria protect result quality when a specimen is unlabeled, leaking, delayed, improperly transported, or inappropriate for the requested test.',
          'Collection instructions should be clear enough that nurses, providers, phlebotomists, and patients can submit usable specimens.',
          'Specimen source wording should be precise because blood, sputum, urine, tissue, swab, and sterile fluid results are interpreted differently.',
          'When a specimen is compromised but clinically important, report limitations clearly and follow local exception policy.'
        ]
      },
      {
        heading: 'Analytic quality',
        items: [
          'Media, reagents, stains, instruments, identification systems, and susceptibility methods need QC at defined intervals.',
          'QC strains and expected reactions confirm that the method can produce a trustworthy answer.',
          'Method verification confirms that a new or changed test performs acceptably in the local laboratory before patient use.',
          'Lot-to-lot checks, temperature monitoring, instrument maintenance, and calibration prevent slow drift from becoming patient-impacting error.',
          'Unexpected patient results should be investigated when they conflict with Gram stain, source, colony morphology, QC, or clinical pattern.'
        ]
      },
      {
        heading: 'Postanalytic quality',
        items: [
          'Reports should include organism identity, source, method or limitations when relevant, susceptibility interpretation, and clinically useful comments.',
          'Critical results need defined read-back, notification, and documentation workflows.',
          'Corrected reports should state what changed and why according to policy.',
          'Antimicrobial reporting should suppress unsupported, redundant, or misleading drug results.',
          'Turnaround time matters, but speed should not outrun verification, safety, or interpretive clarity.'
        ]
      },
      {
        heading: 'People, training, and improvement',
        items: [
          'Competency assessment should evaluate real bench decision-making, not only annual signatures.',
          'Proficiency testing, blind samples, direct observation, and result review help detect hidden training gaps.',
          'Corrective action should identify root cause and prevent recurrence rather than only fixing one specimen.',
          'Audits should look for process weaknesses such as mislabeled specimens, repeated QC failures, delayed critical calls, or unclear comments.',
          'Quality culture means staff can raise concerns early without being punished for noticing a system problem.'
        ]
      }
    ]
  },
  {
    id: 'infection-control-laboratory-role',
    label: 'Infection Control',
    category: 'Laboratory Management',
    title: 'Infection Control and the Microbiology Laboratory',
    summary: 'A guide to the microbiology lab role in infection prevention: transmission routes, isolation support, MDRO detection, surveillance, outbreak investigation, reporting, and exposure prevention.',
    highlights: [
      'Infection control turns microbiology results into prevention action: isolation, cleaning, treatment support, surveillance, and outbreak response.',
      'The lab helps detect MDROs, clusters, healthcare-associated infections, and unusual pathogens that require rapid communication.',
      'Standard precautions, PPE, engineering controls, hand hygiene, sharps safety, and exposure workflows protect patients and staff.'
    ],
    cards: [
      {
        title: 'The lab sees patterns early',
        body: 'Repeated organisms, unusual resistance, or a cluster from one unit can be the first clue to transmission.'
      },
      {
        title: 'Transmission changes action',
        body: 'Contact, droplet, airborne, bloodborne, fecal-oral, and vector-associated risks lead to different prevention steps.'
      },
      {
        title: 'Communication is prevention',
        body: 'Rapid reporting of MDROs, high-consequence pathogens, and outbreak signals can stop spread before more testing is complete.'
      }
    ],
    sections: [
      {
        heading: 'Core infection-control concepts',
        items: [
          'Standard precautions assume that blood, body fluids, mucous membranes, nonintact skin, and contaminated materials can transmit infection.',
          'Transmission-based precautions add targeted measures for contact, droplet, or airborne spread.',
          'Hand hygiene, PPE, respiratory hygiene, sharps safety, and environmental cleaning are basic prevention tools.',
          'The microbiology lab supports isolation decisions but should avoid overcalling colonization as active infection.',
          'Infection control decisions should combine organism, source, syndrome, patient location, and transmission risk.'
        ]
      },
      {
        heading: 'Laboratory signals that matter',
        items: [
          'MRSA, VRE, carbapenemase-producing organisms, Candida auris, multidrug-resistant nonfermenters, and other MDROs may require immediate notification.',
          'Positive blood cultures, sterile-site pathogens, meningitis agents, and reportable organisms may trigger urgent prevention workflows.',
          'Repeated recovery of the same unusual organism from multiple patients, rooms, devices, or procedures can suggest a cluster.',
          'Unexpected resistance patterns should be confirmed and communicated according to laboratory policy.',
          'Antibiograms, cumulative susceptibility summaries, and trend reviews support stewardship and prevention planning.'
        ]
      },
      {
        heading: 'Surveillance and outbreak support',
        items: [
          'Surveillance testing may screen high-risk patients or units for colonization with targeted organisms.',
          'Outbreak investigation may involve case definitions, line lists, specimen routing, isolate retention, molecular typing, and public health coordination.',
          'Environmental cultures should be targeted and policy-driven; random environmental culturing can generate confusing data.',
          'The lab should preserve important isolates when epidemiology, public health, or confirmatory testing may be needed.',
          'Result interpretation should separate colonization, contamination, infection, and transmission signals.'
        ]
      },
      {
        heading: 'Exposure prevention in the lab',
        items: [
          'Use biosafety cabinets, splash protection, sealed rotors, and containment when aerosol or splash risk exists.',
          'Handle sharps, glass, centrifuges, and culture plates using procedures that minimize exposure.',
          'Report spills, splashes, needlesticks, aerosol events, or suspected high-risk exposures promptly.',
          'Postexposure follow-up depends on agent, route, immune status, and local occupational health policy.',
          'Training should cover routine hazards and rare high-consequence scenarios before they happen.'
        ]
      },
      {
        heading: 'Reporting discipline',
        items: [
          'Use comments that guide isolation or prevention only when supported by policy and evidence.',
          'Do not label patients as infected when a screen or colonization result does not support that conclusion.',
          'Communicate urgent findings to infection prevention, public health, providers, or leadership through defined channels.',
          'Review report wording when new methods detect colonization or resistance markers that clinicians may misunderstand.',
          'Good infection-control reporting is fast, clear, and honest about what the result can and cannot prove.'
        ]
      }
    ]
  },
  {
    id: 'sentinel-laboratory-response',
    label: 'Sentinel Laboratory Response',
    category: 'Laboratory Management',
    title: 'Sentinel Laboratory Response to High-Consequence Pathogens',
    summary: 'A safety-focused guide to recognizing suspicious isolates or syndromes, stopping unsafe manipulation, securing material, notifying the right people, and using reference-lab pathways.',
    highlights: [
      'Sentinel response is not about finishing a dangerous ID; it is about recognizing risk, protecting staff, and escalating correctly.',
      'Small Gram-negative coccobacilli, unusual colony behavior, suspicious exposure history, or high-consequence syndrome can change the workflow immediately.',
      'Reference laboratories, public health, biosafety leadership, and defined packaging or transport policies are part of the diagnostic system.'
    ],
    cards: [
      {
        title: 'Recognize, do not overwork',
        body: 'When an isolate fits a high-risk pattern, the right bench move may be to stop routine manipulation and notify.'
      },
      {
        title: 'Exposure history matters',
        body: 'Animal, tick, rabbit, livestock, aerosol, travel, occupational, mail-handling, or unusual outbreak clues can be as important as colony morphology.'
      },
      {
        title: 'Rule-out is a safety workflow',
        body: 'A sentinel lab may perform limited rule-out steps only within policy; unresolved concern goes to the appropriate reference pathway.'
      }
    ],
    sections: [
      {
        heading: 'When to pause routine workup',
        items: [
          'Pause when a culture or syndrome suggests a high-consequence agent, select-agent concern, or organism requiring enhanced containment.',
          'Examples of warning patterns include tiny Gram-negative coccobacilli, slow growth, unusual safety history, aerosolizable specimens, or exposure-compatible severe disease.',
          'Do not perform extra open-bench manipulation just to satisfy curiosity.',
          'Secure plates, tubes, and paperwork according to local policy while preserving the diagnostic trail.',
          'Notify the supervisor, biosafety officer, medical director, or public health contact through the defined chain.'
        ]
      },
      {
        heading: 'Common high-consequence patterns',
        items: [
          'Brucella suspicion can involve blood culture recovery, small Gram-negative coccobacilli, slow growth, and animal or unpasteurized dairy exposure.',
          'Francisella suspicion can involve tiny Gram-negative coccobacilli, poor routine growth, cysteine requirement, ulceroglandular disease, tick or rabbit exposure, or pneumonia.',
          'Bacillus anthracis concern can involve large Gram-positive rods from compatible lesion, blood, or exposure context and should be handled by policy.',
          'Yersinia pestis, Burkholderia mallei or pseudomallei, Coxiella, and other agents require exposure-aware escalation rather than casual bench completion.',
          'Mycobacterium tuberculosis complex suspicion should trigger mycobacteriology containment and airborne-risk workflows.'
        ]
      },
      {
        heading: 'Rule-out and referral principles',
        items: [
          'Use only the limited rule-out or referral steps that your laboratory is validated and authorized to perform.',
          'If the organism cannot be safely ruled out, stop and refer through the correct public health or reference-lab pathway.',
          'Keep documentation clear: who was notified, what manipulation occurred, what exposure risk exists, and where the material was sent.',
          'Packaging and shipping must follow trained-personnel, regulatory, and institutional requirements.',
          'Maintain chain of custody or special documentation when required by the situation.'
        ]
      },
      {
        heading: 'Exposure and incident response',
        items: [
          'If a suspected high-risk organism was manipulated outside containment, assess possible aerosol, splash, sharps, or direct-contact exposure.',
          'Notify occupational health, biosafety, and leadership promptly according to policy.',
          'Identify staff, instruments, work areas, waste, and cultures involved in the event.',
          'Decontamination, medical evaluation, prophylaxis, and reporting depend on the suspected agent and exposure route.',
          'Incident review should improve recognition and workflow so the same risk is less likely to recur.'
        ]
      },
      {
        heading: 'Student shortcut',
        items: [
          'A suspicious isolate is not a puzzle to finish; it is a decision to protect people.',
          'The safest answer may be: stop, secure, notify, and refer.',
          'Routine biochemical panels and MALDI-TOF are not automatically appropriate for every suspicious organism.',
          'Exposure history can upgrade an ordinary-looking culture into a sentinel-lab concern.',
          'Know your local escalation pathway before you need it.'
        ]
      }
    ]
  }
];

const guidePathways: Array<{ label: string; guideId: string; description: string }> = [
  { label: 'New Student Start', guideId: 'intro-to-microbiology', description: 'Core concepts and bench mindset' },
  { label: 'Bacteriology Study Strategy', guideId: 'bacterial-identification-strategy', description: 'Organism ID and separation logic' },
  { label: 'Parasite Study Strategy', guideId: 'parasitology-lab-methods-overview', description: 'Specimen, stage, and method logic' },
  { label: 'Fungal Study Strategy', guideId: 'fungal-identification-overview', description: 'Direct exam, culture, and safety' },
  { label: 'Viral Testing Strategy', guideId: 'virology-methods-overview', description: 'Specimens, NAAT, serology, and culture' },
  { label: 'Syndrome Review', guideId: 'bloodstream-infections', description: 'Body-system and specimen workflows' },
  { label: 'Quality and Safety Review', guideId: 'quality-clinical-microbiology-lab', description: 'Quality, infection control, and response' }
];

const parasitologyTopicLinks = [
  {
    id: 'other-protozoa',
    title: 'Other Protozoa',
    body: 'Review urogenital protozoa, tissue protozoa, and free-living amoebae.'
  },
  {
    id: 'intestinal-nematodes',
    title: 'Intestinal Nematodes',
    body: 'Move into stool and perianal workflows for intestinal roundworms.'
  },
  {
    id: 'tissue-nematodes',
    title: 'Tissue Nematodes',
    body: 'Review tissue, ocular, CNS, and larva migrans roundworm patterns.'
  },
  {
    id: 'filarial-nematodes',
    title: 'Filarial Nematodes',
    body: 'Study microfilariae, blood collection timing, and skin-based workflows.'
  },
  {
    id: 'intestinal-cestodes',
    title: 'Intestinal Cestodes',
    body: 'Move into stool tapeworm eggs, segments, and proglottid interpretation.'
  },
  {
    id: 'tissue-cestodes',
    title: 'Tissue Cestodes',
    body: 'Review cysticercosis, echinococcosis, and tissue-stage tapeworm disease.'
  },
  {
    id: 'intestinal-trematodes',
    title: 'Intestinal Trematodes',
    body: 'Study foodborne intestinal flukes and egg-based stool interpretation.'
  },
  {
    id: 'liver-lung-trematodes',
    title: 'Liver and Lung Trematodes',
    body: 'Review biliary and pulmonary flukes, exposures, stool, sputum, and serology.'
  },
  {
    id: 'blood-trematodes',
    title: 'Blood Trematodes',
    body: 'Finish with Schistosoma urine, stool, tissue, and serology workflows.'
  }
];

const mycologyTopicLinks = [
  {
    id: 'fungal-identification-overview',
    title: 'Fungal Identification Overview',
    body: 'Start with fungal specimen strategy, direct exam, culture, nonculture methods, and safety.'
  },
  {
    id: 'hyaline-molds-dermatophytes',
    title: 'Hyaline Molds, Mucorales, and Dermatophytes',
    body: 'Move into hyaline molds, Mucorales, dermatophytes, and opportunistic mold patterns.'
  },
  {
    id: 'dematiaceous-molds',
    title: 'Dematiaceous Molds',
    body: 'Study melanized molds, pigmented tissue elements, chromoblastomycosis, phaeohyphomycosis, and eumycetoma.'
  },
  {
    id: 'dimorphic-systemic-fungi',
    title: 'Dimorphic and Systemic Fungi',
    body: 'Review endemic dimorphic fungi, tissue clues, antigen and serology support, and biosafety.'
  },
  {
    id: 'yeasts',
    title: 'Yeasts',
    body: 'Move into Candida, Cryptococcus, Malassezia, Trichosporon, and other yeast workflows.'
  },
  {
    id: 'antifungal-susceptibility',
    title: 'Antifungal Susceptibility and Therapy',
    body: 'Finish Mycology with AST, antifungal classes, resistance patterns, reporting, prevention, and stewardship.'
  }
];

const virologyTopicLinks = [
  {
    id: 'virology-methods-overview',
    title: 'Virology Methods and Strategies',
    body: 'Start with viral specimen timing, NAAT, antigen, serology, culture, viral load, and reporting logic.'
  },
  {
    id: 'viruses-in-human-disease',
    title: 'Viruses in Human Disease',
    body: 'Move into clinically important virus groups by syndrome, source, transmission, and testing strategy.'
  },
  {
    id: 'antiviral-therapy-susceptibility',
    title: 'Antiviral Therapy and Susceptibility',
    body: 'Finish Virology with antiviral classes, resistance testing, viral load monitoring, prevention, and reporting discipline.'
  }
];

const organSystemTopicLinks = [
  {
    id: 'bloodstream-infections',
    title: 'Bloodstream Infections',
    body: 'Start organ-system diagnosis with blood culture collection, positive bottle response, contamination logic, and follow-up.'
  },
  {
    id: 'lower-respiratory-infections',
    title: 'Lower Respiratory Infections',
    body: 'Move into sputum quality, lower respiratory specimen types, pneumonia testing, and colonization pitfalls.'
  },
  {
    id: 'upper-respiratory-oral-neck-infections',
    title: 'Upper Respiratory, Oral, and Neck Infections',
    body: 'Review targeted throat, nasopharyngeal, oral, sinus, and deep neck workups.'
  },
  {
    id: 'cns-infections',
    title: 'CNS Infections',
    body: 'Study CSF urgency, meningitis and encephalitis testing, and chronic CNS infection logic.'
  },
  {
    id: 'eye-ear-sinus-infections',
    title: 'Eye, Ear, and Sinus Infections',
    body: 'Review small-volume ocular specimens, ear and sinus source quality, and exposure-driven testing.'
  },
  {
    id: 'urinary-tract-infections',
    title: 'Urinary Tract Infections',
    body: 'Move into urine specimen types, colony counts, pyuria context, mixed growth, and catheter-associated pitfalls.'
  },
  {
    id: 'genital-tract-infections',
    title: 'Genital Tract Infections',
    body: 'Review STI NAAT, vaginitis, genital ulcers, pregnancy, neonatal, and culture-limit logic.'
  },
  {
    id: 'gastrointestinal-tract-infections',
    title: 'Gastrointestinal Tract Infections',
    body: 'Move into stool culture, GI panels, C. difficile testing, parasite workups, and outbreak logic.'
  },
  {
    id: 'skin-soft-tissue-wound-infections',
    title: 'Skin, Soft Tissue, and Wound Infections',
    body: 'Review superficial versus deep wound specimens, abscesses, bites, burns, necrotizing infection, and tissue diagnosis.'
  },
  {
    id: 'sterile-fluids-bone-tissue-infections',
    title: 'Sterile Fluids, Bone, Bone Marrow, and Tissue',
    body: 'Finish organ-system diagnosis with sterile fluids, bone, marrow, solid tissue, hardware, and interpretation discipline.'
  }
];

const labManagementTopicLinks = [
  {
    id: 'quality-clinical-microbiology-lab',
    title: 'Quality in the Clinical Microbiology Lab',
    body: 'Start lab management with QC, QA, verification, competency, corrective action, and reporting quality.'
  },
  {
    id: 'infection-control-laboratory-role',
    title: 'Infection Control',
    body: 'Move into transmission, MDRO detection, surveillance, outbreak support, exposure prevention, and reporting.'
  },
  {
    id: 'sentinel-laboratory-response',
    title: 'Sentinel Laboratory Response',
    body: 'Finish with high-consequence pathogen recognition, stop-work decisions, referral pathways, and exposure response.'
  }
];

const getGuideIdFromSearch = (search: string) => {
  const params = new URLSearchParams(search);
  const requested = params.get('guide');
  if (!requested) {
    return guides[0].id;
  }

  return guides.some((guide) => guide.id === requested) ? requested : guides[0].id;
};

const getNextSteps = (guideId: string): GuideNextStep[] => {
  if (guideId === 'intro-to-microbiology') {
    return [
      {
        title: 'Learn Microbial Taxonomy',
        body: 'Learn how organisms are grouped and named.',
        path: '/guides?guide=microbial-taxonomy'
      },
      {
        title: 'Open the Gram-Positive Roadmap',
        body: 'See how early observations change the next step.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Bench Tests',
        body: 'Review principles, interpretation, and QC.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'microbial-taxonomy') {
    return [
      {
        title: 'Study Bacterial Cell Structure',
        body: 'See how walls and envelopes shape what you observe.',
        path: '/guides?guide=bacterial-cell-structure'
      },
      {
        title: 'Move Into Microscopy and Stains',
        body: 'Apply taxonomy to what you see on the slide.',
        path: '/guides?guide=gram-stain'
      },
      {
        title: 'Practice a Roadmap',
        body: 'Turn classification into identification logic.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Bench Tests',
        body: 'Connect organism groups to key bench tests.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'bacterial-cell-structure') {
    return [
      {
        title: 'Study Host Interactions',
        body: 'See how host defenses and microbial traits shape infection.',
        path: '/guides?guide=host-microorganism-interactions'
      },
      {
        title: 'Move Into Microscopy and Stains',
        body: 'Use structure to understand staining differences.',
        path: '/guides?guide=gram-stain'
      },
      {
        title: 'Review Culture Media',
        body: 'Connect envelope differences to media behavior.',
        path: '/guides?guide=media'
      },
      {
        title: 'Practice a Roadmap',
        body: 'Apply structural clues in an interactive workflow.',
        path: '/gram-positive-roadmap'
      }
    ];
  }

  if (guideId === 'host-microorganism-interactions') {
    return [
      {
        title: 'Study Lab Safety',
        body: 'Learn the habits and controls that keep microbiology work safe.',
        path: '/guides?guide=laboratory-safety-basics'
      },
      {
        title: 'Review Specimen Basics',
        body: 'Connect host site and specimen quality to infection workup.',
        path: '/guides?guide=specimens'
      },
      {
        title: 'Study Culture Media',
        body: 'See how body site and organism recovery connect at the bench.',
        path: '/guides?guide=media'
      },
      {
        title: 'Practice a Workflow',
        body: 'Apply host and specimen thinking to a clinical guide.',
        path: '/guides?guide=blood-culture'
      }
    ];
  }

  if (guideId === 'laboratory-safety-basics') {
    return [
      {
        title: 'Review Specimen Basics',
        body: 'Safety and specimen handling belong together at the bench.',
        path: '/guides?guide=specimens'
      },
      {
        title: 'Study Host Interactions',
        body: 'Connect safe handling to how microbes behave in patients.',
        path: '/guides?guide=host-microorganism-interactions'
      },
      {
        title: 'Practice a Workflow',
        body: 'See how safe specimen handling supports a real workup.',
        path: '/guides?guide=blood-culture'
      }
    ];
  }

  if (guideId === 'gram-stain') {
    return [
      {
        title: 'Review Cell Structure',
        body: 'Connect envelope structure to staining behavior.',
        path: '/guides?guide=bacterial-cell-structure'
      },
      {
        title: 'Study Cultivation and ID',
        body: 'Turn microscopic clues into culture and colony workup logic.',
        path: '/guides?guide=traditional-cultivation-identification'
      },
      {
        title: 'Practice a Roadmap',
        body: 'Use stain and morphology clues in an interactive workflow.',
        path: '/gram-positive-roadmap'
      }
    ];
  }

  if (guideId === 'traditional-cultivation-identification') {
    return [
      {
        title: 'Study Nucleic Acid Testing',
        body: 'See how molecular methods extend identification beyond phenotype.',
        path: '/guides?guide=nucleic-acid-analysis'
      },
      {
        title: 'Review Culture Media',
        body: 'Connect cultivation goals to plate selection and interpretation.',
        path: '/guides?guide=media'
      },
      {
        title: 'Review Biochemical Tests',
        body: 'Match phenotypic reactions to their principles and QC rules.',
        path: '/biochemical-tests'
      },
      {
        title: 'Practice a Roadmap',
        body: 'Apply culture and test patterns to organism identification.',
        path: '/gram-negative-roadmap'
      }
    ];
  }

  if (guideId === 'nucleic-acid-analysis') {
    return [
      {
        title: 'Study Immunochemical Detection',
        body: 'Compare molecular targets with antigen-antibody detection methods.',
        path: '/guides?guide=immunochemical-detection'
      },
      {
        title: 'Review Culture Media',
        body: 'Connect molecular findings back to organism recovery and culture limits.',
        path: '/guides?guide=media'
      },
      {
        title: 'Search Related Organisms',
        body: 'Look up organisms, resistance markers, and workflow clues.',
        path: '/search'
      }
    ];
  }

  if (guideId === 'immunochemical-detection') {
    return [
      {
        title: 'Study Serologic Diagnosis',
        body: 'Move from antigen detection to host antibody response patterns.',
        path: '/guides?guide=serologic-diagnosis'
      },
      {
        title: 'Review Nucleic Acid Testing',
        body: 'Compare immunochemical and molecular detection workflows.',
        path: '/guides?guide=nucleic-acid-analysis'
      },
      {
        title: 'Review Bench Tests',
        body: 'Connect assay logic to routine test interpretation and controls.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'serologic-diagnosis') {
    return [
      {
        title: 'Study Antimicrobial Action',
        body: 'Move into how treatment pressure and resistance mechanisms shape workup.',
        path: '/guides?guide=antimicrobial-action-resistance'
      },
      {
        title: 'Review Immunochemical Detection',
        body: 'Compare antibody detection with antigen-based assay formats.',
        path: '/guides?guide=immunochemical-detection'
      },
      {
        title: 'Search Related Organisms',
        body: 'Look up organisms where serology supports diagnosis.',
        path: '/search'
      }
    ];
  }

  if (guideId === 'antimicrobial-action-resistance') {
    return [
      {
        title: 'Study Susceptibility Testing',
        body: 'See how resistance concepts become measured and reported AST results.',
        path: '/guides?guide=antimicrobial-susceptibility-testing'
      },
      {
        title: 'Review Biochemical Tests',
        body: 'Connect resistance and identification logic back to bench reactions.',
        path: '/biochemical-tests'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Apply resistance-aware organism clues in a roadmap.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Search Related Organisms',
        body: 'Find organisms, resistance markers, and workflow clues.',
        path: '/search'
      }
    ];
  }

  if (guideId === 'antimicrobial-susceptibility-testing') {
    return [
      {
        title: 'Begin Bacteriology',
        body: 'Move from general AST principles into bacterial identification strategy.',
        path: '/guides?guide=bacterial-identification-strategy'
      },
      {
        title: 'Review Antimicrobial Action',
        body: 'Tie AST methods back to drug targets and resistance mechanisms.',
        path: '/guides?guide=antimicrobial-action-resistance'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Apply susceptibility-aware reasoning to organism workup patterns.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Bench Tests',
        body: 'Compare AST controls and endpoints with routine biochemical testing.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'bacterial-identification-strategy') {
    return [
      {
        title: 'Study Staph and Micrococcus',
        body: 'Apply bacterial ID strategy to catalase-positive Gram-positive cocci.',
        path: '/guides?guide=staphylococcus-micrococcus'
      },
      {
        title: 'Review Biochemical Tests',
        body: 'Open the bench-test cards that support manual identification.',
        path: '/biochemical-tests'
      },
      {
        title: 'Practice Gram-Positive ID',
        body: 'Apply early branch-point logic to Gram-positive organisms.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Apply oxidase, media, and biochemical patterns to Gram-negative organisms.',
        path: '/gram-negative-roadmap'
      }
    ];
  }

  if (guideId === 'staphylococcus-micrococcus') {
    return [
      {
        title: 'Study Strep and Enterococcus',
        body: 'Move from catalase-positive cocci to catalase-negative cocci in chains and pairs.',
        path: '/guides?guide=streptococcus-enterococcus'
      },
      {
        title: 'Practice Gram-Positive ID',
        body: 'Walk the catalase-positive cocci branch in the roadmap.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Staph Tests',
        body: 'Look up coagulase, DNase, novobiocin, microdase, and related bench tests.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when a catalase-positive coccus needs deeper workup.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'streptococcus-enterococcus') {
    return [
      {
        title: 'Study Bacillus-Like Rods',
        body: 'Move from Gram-positive cocci into aerobic spore-forming Gram-positive rods.',
        path: '/guides?guide=bacillus-similar-organisms'
      },
      {
        title: 'Practice Gram-Positive ID',
        body: 'Walk the hemolysis, PYR, bile esculin, optochin, and Enterococcus branches.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Strep Tests',
        body: 'Look up CAMP, hippurate, optochin, bile solubility, PYR, bile esculin, and salt tolerance.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding the next step for catalase-negative cocci.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'bacillus-similar-organisms') {
    return [
      {
        title: 'Study Listeria and Corynebacterium',
        body: 'Move from aerobic spore-formers to catalase-positive non-spore-forming Gram-positive rods.',
        path: '/guides?guide=listeria-corynebacterium'
      },
      {
        title: 'Practice Gram-Positive Rods',
        body: 'Walk the aerobic spore-former branch for Bacillus-like organisms.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Bacillus Tests',
        body: 'Look up motility, lecithinase, MYP agar, starch, VP, citrate, and related reactions.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when a Gram-positive rod needs deeper workup or safety escalation.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'listeria-corynebacterium') {
    return [
      {
        title: 'Study Catalase-Negative Rods',
        body: 'Move from catalase-positive coryneforms to Erysipelothrix, Lactobacillus, and similar rods.',
        path: '/guides?guide=erysipelothrix-lactobacillus'
      },
      {
        title: 'Practice Gram-Positive Rods',
        body: 'Walk the Listeria, Corynebacterium, and similar coryneform branches.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Coryneform Tests',
        body: 'Look up motility, CAMP, reverse CAMP, Tinsdale, urease, nitrate, and Elek toxigenicity testing.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when a diphtheroid-like isolate needs deeper workup.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'erysipelothrix-lactobacillus') {
    return [
      {
        title: 'Study Aerobic Actinomycetes',
        body: 'Move from nonbranching catalase-negative rods to branching or partially acid-fast Gram-positive bacilli.',
        path: '/guides?guide=nocardia-streptomyces-rhodococcus'
      },
      {
        title: 'Practice Gram-Positive Rods',
        body: 'Walk the catalase-negative non-spore-forming rod branch in the roadmap.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Rod Tests',
        body: 'Look up TSI H2S, gelatin brush growth, reverse CAMP, MRS gas, and vancomycin screen logic.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when a Lactobacillus-like or Erysipelothrix-like rod matters clinically.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'nocardia-streptomyces-rhodococcus') {
    return [
      {
        title: 'Study Enterobacteriaceae',
        body: 'Move into oxidase-negative Gram-negative rods and routine enteric identification logic.',
        path: '/guides?guide=enterobacteriaceae'
      },
      {
        title: 'Practice Actinomycete Branches',
        body: 'Walk the partially acid-fast and non-acid-fast aerobic actinomycete pathways.',
        path: '/gram-positive-roadmap'
      },
      {
        title: 'Review Actinomycete Tests',
        body: 'Look up modified acid-fast stain, lysozyme broth, substrate hydrolysis, and arylsulfatase.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when branching Gram-positive rods need full workup and susceptibility testing.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'enterobacteriaceae') {
    return [
      {
        title: 'Study Oxidase-Negative Nonfermenters',
        body: 'Move from routine enterics to Acinetobacter, Stenotrophomonas, and similar hospital nonfermenters.',
        path: '/guides?guide=acinetobacter-stenotrophomonas'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the MacConkey, lactose, H2S, PAD, Salmonella/Shigella, and Proteeae branches.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Use Enteric Calculator',
        body: 'Compare biochemical profiles for common Enterobacteriaceae and related enteric organisms.',
        path: '/biochemical-calculator'
      },
      {
        title: 'Review Enteric Tests',
        body: 'Look up MacConkey, HE/XLD, SMAC, CIN, TSI, LIA, PAD, ONPG, MUG, and decarboxylase reactions.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when an oxidase-negative Gram-negative rod belongs in routine enteric logic.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'acinetobacter-stenotrophomonas') {
    return [
      {
        title: 'Study Pseudomonas and Burkholderia',
        body: 'Move from oxidase-negative nonfermenters to oxidase-positive nonfermenting Gram-negative rods.',
        path: '/guides?guide=pseudomonas-burkholderia'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the oxidase-negative nonfermenter branch for Acinetobacter and Stenotrophomonas.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Nonfermenter Tests',
        body: 'Look up OF glucose, oxidase, DNase, LDC, maltose oxidation, temperature growth, and SXT screen logic.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice separating enteric fermenters from oxidase-negative nonfermenters.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'pseudomonas-burkholderia') {
    return [
      {
        title: 'Study Rhizobium and Ochrobactrum',
        body: 'Continue into environmental oxidase-positive nonfermenters and device-associated opportunists.',
        path: '/guides?guide=rhizobium-ochrobactrum'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Pseudomonas, Burkholderia, Ralstonia, Acidovorax, and Pandoraea branches.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Nonfermenter Tests',
        body: 'Look up cetrimide, pigment, acetamide, growth at 42 C, Ashdown agar, OFPBL, and polymyxin-colistin screens.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'rhizobium-ochrobactrum') {
    return [
      {
        title: 'Study Yellow Nonfermenters',
        body: 'Continue into Chryseobacterium, Elizabethkingia, Sphingobacterium, Weeksella, and Myroides.',
        path: '/guides?guide=chryseobacterium-sphingobacterium'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Rhizobium, Ochrobactrum, Shewanella, Psychrobacter, and Paracoccus branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Environmental GNR Tests',
        body: 'Look up ONPG, esculin, urease, TSI H2S, oxidase, and MacConkey behavior.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice using device, bite wound, water, and immunocompromised-host context.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'chryseobacterium-sphingobacterium') {
    return [
      {
        title: 'Study Alcaligenes-Like Rods',
        body: 'Move into Alcaligenes, Achromobacter, non-pertussis Bordetella, Comamonas, Delftia, and Oligella.',
        path: '/guides?guide=alcaligenes-bordetella-comamonas'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the yellow-pigmented oxidase-positive nonfermenter branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Yellow Pigment Tests',
        body: 'Look up flexirubin KOH, indole, DNase, gelatin, urease, esculin, and MacConkey behavior.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'alcaligenes-bordetella-comamonas') {
    return [
      {
        title: 'Study Vibrio and Aeromonas',
        body: 'Move from oxidase-positive nonfermenters to oxidase-positive fermenting water-associated rods.',
        path: '/guides?guide=vibrio-aeromonas-chromobacterium'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Alcaligenes, Achromobacter, Bordetella, Delftia, Comamonas, and Oligella branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Branch Tests',
        body: 'Look up rapid urease, nitrate, nitrite, motility, Oligella patterns, and OF glucose.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'vibrio-aeromonas-chromobacterium') {
    return [
      {
        title: 'Study Sphingomonas-Like Rods',
        body: 'Move into Sphingomonas, Sphingobacterium, Acidovorax, and similar environmental nonfermenters.',
        path: '/guides?guide=sphingomonas-paucimobilis'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Vibrio, Aeromonas, Plesiomonas, and Chromobacterium branches.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Water-Associated Tests',
        body: 'Look up TCBS, O/129, salt requirement, string test, DNase, and decarboxylases.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice using seafood, freshwater, wound, and tropical exposure clues.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'sphingomonas-paucimobilis') {
    return [
      {
        title: 'Study Moraxella-Like Organisms',
        body: 'Continue into Moraxella species and elongated Neisseria-like organisms.',
        path: '/guides?guide=moraxella-related-organisms'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Sphingomonas, Sphingobacterium, and Acidovorax branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Related Nonfermenter Tests',
        body: 'Look up polymyxin-colistin screens, DNase, urease, citrate, motility, lead acetate H2S, and MacConkey behavior.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'moraxella-related-organisms') {
    return [
      {
        title: 'Study Eikenella-Like Organisms',
        body: 'Move into Eikenella, Methylobacterium, Weeksella, and Bergeyella.',
        path: '/guides?guide=eikenella-similar-organisms'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Moraxella and elongated Neisseria branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Moraxella Tests',
        body: 'Look up butyrate, penicillin disk elongation, nitrate, nitrite, acetate, DNase, and Loeffler serum digestion.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'eikenella-similar-organisms') {
    return [
      {
        title: 'Study Pasteurella',
        body: 'Continue into animal-bite-associated Pasteurella species and Suttonella.',
        path: '/guides?guide=pasteurella-similar-organisms'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Eikenella, Methylobacterium, Weeksella, and Bergeyella branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Pitting and Bite Logic',
        body: 'Look up agar pitting, oxidase, catalase, nitrate, indole, urease, hemin or CO2 growth, and MacConkey behavior.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'pasteurella-similar-organisms') {
    return [
      {
        title: 'Study HACEK-Like Organisms',
        body: 'Move into Aggregatibacter, Cardiobacterium, Kingella, Capnocytophaga, and related capnophilic rods.',
        path: '/guides?guide=actinobacillus-aggregatibacter-kingella'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Pasteurella and Suttonella branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Animal Bite Tests',
        body: 'Look up indole, urease, ODC, nitrate, catalase, penicillin susceptibility, and carbohydrate patterns.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'actinobacillus-aggregatibacter-kingella') {
    return [
      {
        title: 'Study Haemophilus',
        body: 'Continue into X/V factor-dependent fastidious Gram-negative coccobacilli and Haemophilus species.',
        path: '/guides?guide=haemophilus'
      },
      {
        title: 'Practice HACEK ID',
        body: 'Walk the Aggregatibacter, Cardiobacterium, Capnocytophaga, Kingella, and Dysgonomonas branches.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Fastidious GNR Tests',
        body: 'Look up X/V factor needs, agar pitting, SPS inhibition, oxidase, catalase, indole, urease, and nitrate.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice using endocarditis, oral flora, bite wound, pediatric joint, and immunocompromised-host context.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'haemophilus') {
    return [
      {
        title: 'Study Bartonella and Afipia',
        body: 'Continue into very slow-growing fastidious rods, cat exposure, vector syndromes, and CYE/chocolate growth clues.',
        path: '/guides?guide=bartonella-afipia'
      },
      {
        title: 'Practice Haemophilus ID',
        body: 'Walk the X/V factor, porphyrin, hemolysis, and biotype branches for Haemophilus species.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Haemophilus Tests',
        body: 'Look up X/V factor testing, porphyrin/ALA, satellitism, beta-lactamase screening, oxidase, catalase, indole, urease, and ODC.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing chocolate-only growth and pleomorphic Gram-negative coccobacilli.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'bartonella-afipia') {
    return [
      {
        title: 'Study Curved GNRs',
        body: 'Move into Campylobacter, Arcobacter, and Helicobacter with microaerophilic growth and curved morphology.',
        path: '/guides?guide=campylobacter-arcobacter-helicobacter'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Walk the Bartonella and Afipia branches.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Slow-Growth Tests',
        body: 'Look up Warthin-Starry stain, CYE or chocolate growth, nitrate, urease, and oxidase patterns.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'campylobacter-arcobacter-helicobacter') {
    return [
      {
        title: 'Study Legionella',
        body: 'Continue into BCYE, cysteine-dependent growth, and water-associated atypical pneumonia.',
        path: '/guides?guide=legionella'
      },
      {
        title: 'Practice Curved Rod ID',
        body: 'Walk the Campylobacter, Arcobacter, and Helicobacter branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Curved Rod Tests',
        body: 'Look up microaerophilic growth, hippurate, indoxyl acetate, rapid urease, and 42 C growth.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'legionella') {
    return [
      {
        title: 'Study Brucella',
        body: 'Move into slow-growing coccobacilli where recognition and biosafety escalation matter.',
        path: '/guides?guide=brucella'
      },
      {
        title: 'Practice Legionella ID',
        body: 'Walk the BCYE, cysteine requirement, fluorescence, and Legionella species branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review BCYE Logic',
        body: 'Look up BCYE cysteine requirement, hippurate, gelatinase, weak acid-fast tissue clues, and urinary antigen context.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'brucella') {
    return [
      {
        title: 'Study Pertussis Bordetella',
        body: 'Continue into B. pertussis, B. parapertussis, and specialized respiratory media.',
        path: '/guides?guide=bordetella-pertussis-parapertussis'
      },
      {
        title: 'Practice Brucella ID',
        body: 'Walk the CO2 requirement, rapid urease, H2S, dye inhibition, and animal reservoir branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Safety Rule-Out',
        body: 'Look up Brucella rule-out, rapid urease, lead acetate H2S, and safety escalation principles.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'bordetella-pertussis-parapertussis') {
    return [
      {
        title: 'Study Francisella',
        body: 'Move into cysteine-dependent tularemia organisms and high-risk bench recognition.',
        path: '/guides?guide=francisella'
      },
      {
        title: 'Practice Bordetella ID',
        body: 'Walk the pertussis, parapertussis, and bronchiseptica branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Pertussis Media',
        body: 'Look up Regan-Lowe, Bordet-Gengou, oxidase, urease speed, nitrate, motility, and collection timing.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'francisella') {
    return [
      {
        title: 'Study Rat-Bite Fever',
        body: 'Continue into Streptobacillus moniliformis and Spirillum minus.',
        path: '/guides?guide=streptobacillus-spirillum'
      },
      {
        title: 'Practice Francisella ID',
        body: 'Walk the cysteine requirement, oxidase, gelatinase, and safety branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Cysteine Rule-Out',
        body: 'Look up Francisella cysteine requirement, BCYE, oxidase, gelatinase, and select-agent escalation.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'streptobacillus-spirillum') {
    return [
      {
        title: 'Study Gram-Negative Cocci',
        body: 'Continue into Neisseria and Moraxella catarrhalis with oxidase, carbohydrate, butyrate, and source-based logic.',
        path: '/guides?guide=neisseria-moraxella-catarrhalis'
      },
      {
        title: 'Practice Rat-Bite Fever ID',
        body: 'Walk the Streptobacillus and Spirillum branch.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review SPS and Culture Pitfalls',
        body: 'Look up SPS inhibition, enriched media, direct visualization, and rat-bite fever culture behavior.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing when exposure history changes the branch before routine biochemicals do.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'neisseria-moraxella-catarrhalis') {
    return [
      {
        title: 'Start Anaerobic Section',
        body: 'Move into anaerobic specimen handling, transport, incubation systems, and first-pass anaerobe workflow.',
        path: '/guides?guide=anaerobic-bacteriology-lab-considerations'
      },
      {
        title: 'Practice Gram-Negative Cocci',
        body: 'Walk the Neisseria and Moraxella catarrhalis branch in the Gram-negative roadmap.',
        path: '/gram-negative-roadmap'
      },
      {
        title: 'Review Diplococci Tests',
        body: 'Look up oxidase, superoxol, CTA carbohydrate utilization, selective Neisseria media, butyrate, DNase, and beta-lactamase screening.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice using body site, smear urgency, and growth requirements for Gram-negative diplococci.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'anaerobic-bacteriology-lab-considerations') {
    return [
      {
        title: 'Study Anaerobic Organisms',
        body: 'Move from specimen and incubation workflow into the organism-group map for anaerobes.',
        path: '/guides?guide=overview-anaerobic-organisms'
      },
      {
        title: 'Practice Anaerobe Roadmap',
        body: 'Use Gram stain morphology, oxygen tolerance, special disks, bile, pigment, and spores to branch anaerobes.',
        path: '/obligate-anaerobe-roadmap'
      },
      {
        title: 'Review Anaerobe Setup Cards',
        body: 'Look up anaerobic transport, PRAS media, anaerobic atmosphere systems, aerotolerance, BBE, LKV, and special-potency disks.',
        path: '/biochemical-tests'
      }
    ];
  }

  if (guideId === 'overview-anaerobic-organisms') {
    return [
      {
        title: 'Start Mycobacteria',
        body: 'Move into acid-fast organisms, tuberculosis safety logic, mycobacterial culture, NAAT, and NTM grouping.',
        path: '/guides?guide=mycobacteria'
      },
      {
        title: 'Practice Anaerobe ID',
        body: 'Walk the Bacteroides, Prevotella, Porphyromonas, Fusobacterium, Clostridium, and anaerobic cocci branches.',
        path: '/obligate-anaerobe-roadmap'
      },
      {
        title: 'Review Anaerobe Tests',
        body: 'Look up BBE, LKV, special-potency disks, aerotolerance, indole, bile, pigment, fluorescence, and lecithinase logic.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice deciding when a specimen and growth pattern support an anaerobic workup.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'mycobacteria') {
    return [
      {
        title: 'Start Intracellular Agents',
        body: 'Move into organisms where NAAT, serology, tissue detection, exposure history, and reference workflows matter more than routine culture.',
        path: '/guides?guide=obligate-intracellular-nonculturable-agents'
      },
      {
        title: 'Review Mycobacteria Cards',
        body: 'Look up AFB stains, NALC-NaOH processing, LJ/Middlebrook/MGIT culture, Runyon grouping, MPT64, niacin, nitrate, Tween 80, tellurite, and PNB/TCH logic.',
        path: '/biochemical-tests'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing when beaded rods, poor routine growth, acid-fast staining, or chronic clinical context should leave routine bacterial ID logic.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'obligate-intracellular-nonculturable-agents') {
    return [
      {
        title: 'Study Cell Wall-Deficient Bacteria',
        body: 'Move into Mycoplasma and Ureaplasma, where missing peptidoglycan changes staining, culture, and susceptibility logic.',
        path: '/guides?guide=mycoplasma-ureaplasma'
      },
      {
        title: 'Review Diagnostic Cards',
        body: 'Look up Chlamydia NAAT, rickettsial IFA, vector-borne PCR, morulae smear clues, Coxiella phase serology, Whipple PCR/PAS, and Donovan bodies.',
        path: '/biochemical-tests'
      },
      {
        title: 'Review Molecular Basics',
        body: 'Revisit extraction, amplification, controls, inhibition, and contamination rules for direct detection.',
        path: '/guides?guide=nucleic-acid-analysis'
      },
      {
        title: 'Review Serology Basics',
        body: 'Revisit paired sera, fourfold rises, IgG/IgM timing, and cross-reactivity before interpreting vector-borne serology.',
        path: '/guides?guide=serologic-diagnosis'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing when a culture-negative syndrome should leave routine isolate logic.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'mycoplasma-ureaplasma') {
    return [
      {
        title: 'Study Spirochetes',
        body: 'Move into Treponema, Borrelia, and Leptospira, where syndrome timing, serology, darkfield microscopy, NAAT, and exposure history drive the workup.',
        path: '/guides?guide=spirochetes'
      },
      {
        title: 'Review Mycoplasma Cards',
        body: 'Look up specialized media, A7/A8 colony morphology, glucose/arginine/urea reactions, NAAT, serology, and susceptibility principles.',
        path: '/biochemical-tests'
      },
      {
        title: 'Review Molecular Basics',
        body: 'Revisit NAAT controls, inhibition, extraction, and specimen validation for organisms that routine culture misses.',
        path: '/guides?guide=nucleic-acid-analysis'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing when no Gram stain explanation and no routine growth should trigger special-pathogen logic.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'spirochetes') {
    return [
      {
        title: 'Review Spirochete Cards',
        body: 'Look up darkfield microscopy, syphilis serology, Lyme two-tier testing, relapsing fever smears, Leptospira MAT/PCR/culture, and silver stains.',
        path: '/biochemical-tests'
      },
      {
        title: 'Review Serology Basics',
        body: 'Revisit antibody timing, paired sera, fourfold rises, and screening versus confirmatory logic.',
        path: '/guides?guide=serologic-diagnosis'
      },
      {
        title: 'Review Molecular Basics',
        body: 'Revisit when PCR is direct detection and when it cannot replace serology or clinical diagnosis.',
        path: '/guides?guide=nucleic-acid-analysis'
      },
      {
        title: 'Open Unknown Isolate Workup',
        body: 'Practice recognizing when exposure and syndrome should bypass routine colony workup.',
        path: '/unknown-isolate-workup'
      }
    ];
  }

  if (guideId === 'enterics') {
    return [
      {
        title: 'Study Enterobacteriaceae',
        body: 'Open the fuller Enterobacterales guide for oxidase-negative Gram-negative rods.',
        path: '/guides?guide=enterobacteriaceae'
      },
      {
        title: 'Use Enteric Calculator',
        body: 'Compare biochemical profiles for common enteric organisms.',
        path: '/biochemical-calculator'
      },
      {
        title: 'Practice Gram-Negative ID',
        body: 'Apply MacConkey, lactose, H2S, PAD, and Yersinia logic in the roadmap.',
        path: '/gram-negative-roadmap'
      }
    ];
  }

  if (guideId === 'parasitology-lab-methods-overview') {
    return [
      {
        title: 'Study Intestinal Protozoa',
        body: 'Move from general parasite methods into amoebae, flagellates, coccidia, and microsporidia.',
        path: '/guides?guide=intestinal-protozoa'
      },
      {
        title: 'Study Blood and Tissue Protozoa',
        body: 'Move into malaria, Babesia, trypanosomes, Leishmania, and tissue protozoa.',
        path: '/guides?guide=blood-and-tissue-protozoa'
      },
      {
        title: 'Review Specimen Basics',
        body: 'Connect parasite recovery to collection, preservation, and transport choices.',
        path: '/guides?guide=specimens'
      },
      {
        title: 'Study Molecular Methods',
        body: 'Compare microscopy with NAAT and other nonculture diagnostic tools.',
        path: '/guides?guide=nucleic-acid-analysis'
      }
    ];
  }

  if (guideId === 'intestinal-protozoa') {
    return [
      {
        title: 'Review Parasitology Methods',
        body: 'Connect organism clues back to stool O&P, permanent stains, and special stains.',
        path: '/guides?guide=parasitology-lab-methods-overview'
      },
      {
        title: 'Search Bench Terms',
        body: 'Look up Giardia, Entamoeba, Cryptosporidium, Cyclospora, and related diagnostic terms.',
        path: '/search'
      },
      {
        title: 'Review Molecular Methods',
        body: 'Compare microscopy with antigen and NAAT-based parasite detection.',
        path: '/guides?guide=nucleic-acid-analysis'
      }
    ];
  }

  if (guideId === 'blood-and-tissue-protozoa') {
    return [
      {
        title: 'Review Parasitology Methods',
        body: 'Revisit thick and thin films, specimen timing, concentration, antigen, serology, and NAAT logic.',
        path: '/guides?guide=parasitology-lab-methods-overview'
      },
      {
        title: 'Study Intestinal Protozoa',
        body: 'Compare blood and tissue protozoa with stool protozoa and coccidia workflows.',
        path: '/guides?guide=intestinal-protozoa'
      },
      {
        title: 'Search Bench Terms',
        body: 'Look up malaria, Babesia, Trypanosoma, Leishmania, microfilariae, and amastigotes.',
        path: '/search'
      },
      {
        title: 'Continue to Other Protozoa',
        body: 'Move into Trichomonas, Toxoplasma, and free-living amoebae workflows.',
        path: '/guides?guide=other-protozoa'
      }
    ];
  }

  const parasitologyTopicIndex = parasitologyTopicLinks.findIndex((topic) => topic.id === guideId);
  if (parasitologyTopicIndex >= 0) {
    const previous = parasitologyTopicLinks[parasitologyTopicIndex - 1];
    const next = parasitologyTopicLinks[parasitologyTopicIndex + 1];
    const topicSteps: GuideNextStep[] = [];

    if (previous) {
      topicSteps.push({
        title: `Back to ${previous.title}`,
        body: previous.body,
        path: `/guides?guide=${previous.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Blood and Tissue Protozoa',
        body: 'Reconnect this topic to blood films, tissue protozoa, and urgent parasite workflows.',
        path: '/guides?guide=blood-and-tissue-protozoa'
      });
    }

    if (next) {
      topicSteps.push({
        title: `Continue to ${next.title}`,
        body: next.body,
        path: `/guides?guide=${next.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Parasitology Methods',
        body: 'Return to the Part IV methods overview and connect the full section back to specimen strategy.',
        path: '/guides?guide=parasitology-lab-methods-overview'
      });
    }

    topicSteps.push({
      title: 'Search Bench Terms',
      body: 'Look up organisms, stages, specimen terms, and high-yield parasite clues.',
      path: '/search'
    });

    return topicSteps;
  }

  const mycologyTopicIndex = mycologyTopicLinks.findIndex((topic) => topic.id === guideId);
  if (mycologyTopicIndex >= 0) {
    const previous = mycologyTopicLinks[mycologyTopicIndex - 1];
    const next = mycologyTopicLinks[mycologyTopicIndex + 1];
    const topicSteps: GuideNextStep[] = [];

    if (previous) {
      topicSteps.push({
        title: `Back to ${previous.title}`,
        body: previous.body,
        path: `/guides?guide=${previous.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Parasitology Methods',
        body: 'Compare fungal workflows with the specimen-first approach used in parasitology.',
        path: '/guides?guide=parasitology-lab-methods-overview'
      });
    }

    if (next) {
      topicSteps.push({
        title: `Continue to ${next.title}`,
        body: next.body,
        path: `/guides?guide=${next.id}`
      });
    } else {
      topicSteps.push({
        title: 'Search Bench Terms',
        body: 'Look up hyphae, dermatophytes, Mucorales, Aspergillus, and related fungal terms.',
        path: '/search'
      });
    }

    topicSteps.push({
      title: 'Search Mycology Terms',
      body: 'Use quick search for direct exam, culture morphology, and high-yield fungal clues.',
      path: '/search'
    });

    return topicSteps;
  }

  const virologyTopicIndex = virologyTopicLinks.findIndex((topic) => topic.id === guideId);
  if (virologyTopicIndex >= 0) {
    const previous = virologyTopicLinks[virologyTopicIndex - 1];
    const next = virologyTopicLinks[virologyTopicIndex + 1];
    const topicSteps: GuideNextStep[] = [];

    if (previous) {
      topicSteps.push({
        title: `Back to ${previous.title}`,
        body: previous.body,
        path: `/guides?guide=${previous.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Molecular Methods',
        body: 'Reconnect viral diagnosis to NAAT controls, inhibition, extraction, and target interpretation.',
        path: '/guides?guide=nucleic-acid-analysis'
      });
    }

    if (next) {
      topicSteps.push({
        title: `Continue to ${next.title}`,
        body: next.body,
        path: `/guides?guide=${next.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Serology Basics',
        body: 'Connect viral immunity, IgM, IgG, paired sera, and acute-versus-past infection patterns.',
        path: '/guides?guide=serologic-diagnosis'
      });
    }

    topicSteps.push({
      title: 'Search Virology Terms',
      body: 'Look up viral load, NAAT, serology, culture, cytopathic effect, latency, and viral families.',
      path: '/search'
    });

    return topicSteps;
  }

  const organSystemTopicIndex = organSystemTopicLinks.findIndex((topic) => topic.id === guideId);
  if (organSystemTopicIndex >= 0) {
    const previous = organSystemTopicLinks[organSystemTopicIndex - 1];
    const next = organSystemTopicLinks[organSystemTopicIndex + 1];
    const topicSteps: GuideNextStep[] = [];

    if (previous) {
      topicSteps.push({
        title: `Back to ${previous.title}`,
        body: previous.body,
        path: `/guides?guide=${previous.id}`
      });
    } else {
      topicSteps.push({
        title: 'Open Syndrome Diagnostic Path',
        body: 'Connect bloodstream workup to specimen-first diagnostic decisions.',
        path: '/syndrome-diagnostic-path'
      });
    }

    if (next) {
      topicSteps.push({
        title: `Continue to ${next.title}`,
        body: next.body,
        path: `/guides?guide=${next.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Syndrome Diagnostic Path',
        body: 'Use the syndrome tool to practice specimen, test, timing, and safety decisions across body systems.',
        path: '/syndrome-diagnostic-path'
      });
    }

    topicSteps.push({
      title: 'Search Organ-System Terms',
      body: 'Look up blood culture, sputum quality, CSF, urine culture, STI NAAT, and related bench terms.',
      path: '/search'
    });

    return topicSteps;
  }

  const labManagementTopicIndex = labManagementTopicLinks.findIndex((topic) => topic.id === guideId);
  if (labManagementTopicIndex >= 0) {
    const previous = labManagementTopicLinks[labManagementTopicIndex - 1];
    const next = labManagementTopicLinks[labManagementTopicIndex + 1];
    const topicSteps: GuideNextStep[] = [];

    if (previous) {
      topicSteps.push({
        title: `Back to ${previous.title}`,
        body: previous.body,
        path: `/guides?guide=${previous.id}`
      });
    } else {
      topicSteps.push({
        title: 'Review Specimen Management',
        body: 'Reconnect quality systems to collection, transport, rejection, and source documentation.',
        path: '/guides?guide=specimens'
      });
    }

    if (next) {
      topicSteps.push({
        title: `Continue to ${next.title}`,
        body: next.body,
        path: `/guides?guide=${next.id}`
      });
    } else {
      topicSteps.push({
        title: 'Open Do Not Routine Culture',
        body: 'Practice recognizing when safety and reference-lab routing should replace routine bench work.',
        path: '/do-not-routine-culture'
      });
    }

    topicSteps.push({
      title: 'Search Lab Management Terms',
      body: 'Look up QC, verification, proficiency testing, MDRO surveillance, sentinel response, and BSL-3 concepts.',
      path: '/search'
    });

    return topicSteps;
  }

  if (guideId === 'blood-culture' || guideId === 'urine-culture') {
    return [
      {
        title: 'Search Related Organisms',
        body: 'Connect the workflow to pathogens and tests.',
        path: '/search'
      },
      {
        title: 'Review Biochemical Tests',
        body: 'Confirm what the next reactions mean.',
        path: '/biochemical-tests'
      }
    ];
  }

  return [
    {
      title: 'Go to New Student Start',
      body: 'Return to the broader beginner overview.',
      path: '/guides?guide=intro-to-microbiology'
    },
    {
      title: 'Practice a Roadmap',
      body: 'Apply this concept inside an interactive workflow.',
      path: '/gram-positive-roadmap'
    }
  ];
};

const MicroBasics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const guideOrigin = (location.state as { from?: string } | null)?.from;
  const backTarget = guideOrigin === 'special-pathogens'
    ? { label: 'Special Pathogens', path: '/special-pathogens' }
    : guideOrigin === 'do-not-routine-culture'
      ? { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' }
      : null;
  const [activeGuideId, setActiveGuideId] = useState(() => getGuideIdFromSearch(location.search));
  const [guideSearch, setGuideSearch] = useState('');

  useEffect(() => {
    setActiveGuideId(getGuideIdFromSearch(location.search));
  }, [location.search]);

  const activeGuide = useMemo(
    () => guides.find((guide) => guide.id === activeGuideId) ?? guides[0],
    [activeGuideId]
  );
  const nextSteps = useMemo(() => getNextSteps(activeGuide.id), [activeGuide.id]);
  const normalizedGuideSearch = guideSearch.trim().toLowerCase();

  const guideMatchesSearch = useCallback((guide: Guide) => {
    if (!normalizedGuideSearch) {
      return true;
    }

    const searchableText = [
      guide.label,
      guide.title,
      guide.category,
      guide.summary,
      ...guide.highlights,
      ...(guide.cards ?? []).flatMap((card) => [card.title, card.body]),
      ...guide.sections.flatMap((section) => [section.heading, section.intro ?? '', ...section.items])
    ].join(' ').toLowerCase();

    return searchableText.includes(normalizedGuideSearch);
  }, [normalizedGuideSearch]);

  const filteredGuides = useMemo(() => guides.filter((guide) => guideMatchesSearch(guide)), [guideMatchesSearch]);
  const totalFilteredGuides = filteredGuides.length;

  useEffect(() => {
    trackEvent('guide_opened', {
      guide_id: activeGuide.id,
      guide_title: activeGuide.title,
      guide_category: activeGuide.category
    });
  }, [activeGuide]);

  const handleGuideChange = (guideId: string) => {
    setActiveGuideId(guideId);
    navigate(`/guides?guide=${guideId}`, { replace: true });
  };

  return (
    <ToolBox
      title="Deep Study Guides"
      icon="GUIDE"
      onClose={() => navigate('/')}
    >
      <div className="basics-container">
        {backTarget && (
          <div className="micro-basics-back-row">
            <button
              className="micro-basics-back"
              onClick={() => navigate(backTarget.path)}
              type="button"
            >
              ← {backTarget.label}
            </button>
          </div>
        )}
        <aside className="basics-sidebar">
          <div className="guide-sidebar-intro">
            <h3>Deep Guides</h3>
            <p>Exam strategy, study pathways, and longer clinical microbiology walkthroughs.</p>
          </div>

          <div className="guide-sidebar-search">
            <label htmlFor="guide-library-filter">Find a guide</label>
            <div className="guide-search-row">
              <input
                id="guide-library-filter"
                type="search"
                value={guideSearch}
                onChange={(event) => setGuideSearch(event.target.value)}
                placeholder="Search topic, test, organism..."
              />
              {guideSearch && (
                <button type="button" onClick={() => setGuideSearch('')}>
                  Clear
                </button>
              )}
            </div>
            <div className="guide-search-count">
              {normalizedGuideSearch ? `${totalFilteredGuides} matching guides` : `${guides.length} guides available`}
            </div>
          </div>

          <div className="guide-pathways">
            <div className="guide-pathway-title">Choose a Study Strategy</div>
            {guidePathways.map((pathway) => (
              <button
                key={pathway.guideId}
                type="button"
                className={`guide-pathway-btn ${activeGuide.id === pathway.guideId ? 'active' : ''}`}
                onClick={() => handleGuideChange(pathway.guideId)}
              >
                <span>{pathway.label}</span>
                <small>{pathway.description}</small>
              </button>
            ))}
          </div>

          {normalizedGuideSearch && (
            <div className="guide-search-results">
              <div className="guide-pathway-title">Search Results</div>
              {filteredGuides.map((guide) => (
                <button
                  key={guide.id}
                  className={`topic-btn ${activeGuide.id === guide.id ? 'active' : ''}`}
                  onClick={() => handleGuideChange(guide.id)}
                >
                  <span>{guide.label}</span>
                  <small>{guide.category}</small>
                </button>
              ))}
            </div>
          )}

          {normalizedGuideSearch && totalFilteredGuides === 0 && (
            <div className="guide-empty-state">
              No guide matched that search.
            </div>
          )}
        </aside>

        <div className="basics-content animate-step">
          <div className="topic-section">
            <div className="guide-header">
              <span className="guide-kicker">{activeGuide.category}</span>
              <h2>{activeGuide.title}</h2>
              <p>{activeGuide.summary}</p>
            </div>

            <div className="guide-highlights">
              {activeGuide.highlights.map((highlight) => (
                <div key={highlight} className="guide-highlight-card">
                  {highlight}
                </div>
              ))}
            </div>

            {activeGuide.cards && (
              <>
                <h3>Key Bench References</h3>
                <div className="info-grid">
                  {activeGuide.cards.map((card) => (
                    <div key={card.title} className="info-card">
                      <strong>{card.title}</strong>
                      <p>{card.body}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeGuide.id === 'microbial-taxonomy' && (
              <div className="guide-section-block">
                <h3>Visual Summary</h3>
                <div className="guide-diagram-card">
                  <div className="taxonomy-diagram">
                    <div className="taxonomy-rank kingdom">Kingdom</div>
                    <div className="taxonomy-rank phylum">Phylum</div>
                    <div className="taxonomy-rank class">Class</div>
                    <div className="taxonomy-rank order">Order</div>
                    <div className="taxonomy-rank family">Family</div>
                    <div className="taxonomy-rank genus">Genus</div>
                    <div className="taxonomy-rank species">Species</div>
                  </div>
                  <p className="diagram-caption">
                    Broad groups narrow step by step until you reach the most specific level. In day-to-day microbiology, students usually work most closely with genus and species names.
                  </p>
                </div>
              </div>
            )}

            {activeGuide.id === 'bacterial-cell-structure' && (
              <div className="guide-section-block">
                <h3>Visual Summary</h3>
                <div className="guide-diagram-grid">
                  <div className="guide-diagram-card">
                    <svg className="envelope-svg" viewBox="0 0 320 250" aria-label="Gram-positive envelope diagram">
                      <rect x="0" y="0" width="320" height="250" rx="16" fill="#f8f2ff" />
                      <rect x="44" y="68" width="196" height="22" rx="11" className="svg-layer membrane" />
                      <rect x="44" y="94" width="196" height="74" rx="16" className="svg-layer thick-wall" />
                      <rect x="66" y="74" width="18" height="84" rx="9" className="svg-protein" />
                      <rect x="198" y="74" width="18" height="84" rx="9" className="svg-protein" />
                      <path d="M92 64 C86 36, 98 20, 108 12" className="svg-flagellum" />
                      <path d="M188 64 C182 36, 194 22, 202 16" className="svg-pilus" />
                      <text x="160" y="214" textAnchor="middle" className="svg-title">Gram-Positive</text>
                    </svg>
                    <div className="diagram-legend">
                      <span><i className="legend-swatch membrane"></i>Membrane</span>
                      <span><i className="legend-swatch thick-wall"></i>Thick wall</span>
                      <span><i className="legend-line flagellum"></i>Flagellum</span>
                      <span><i className="legend-line pilus"></i>Pilus</span>
                    </div>
                    <p className="diagram-caption">
                      Thick peptidoglycan helps retain crystal violet, which supports the classic purple Gram stain result.
                    </p>
                  </div>

                  <div className="guide-diagram-card">
                    <svg className="envelope-svg" viewBox="0 0 320 250" aria-label="Gram-negative envelope diagram">
                      <rect x="0" y="0" width="320" height="250" rx="16" fill="#eef8ff" />
                      <rect x="44" y="58" width="196" height="20" rx="10" className="svg-layer outer-membrane" />
                      <rect x="44" y="86" width="196" height="28" rx="12" className="svg-layer periplasm" />
                      <rect x="44" y="94" width="196" height="10" rx="5" className="svg-layer thin-wall" />
                      <rect x="44" y="124" width="196" height="22" rx="11" className="svg-layer membrane" />
                      <rect x="88" y="48" width="20" height="42" rx="10" className="svg-porin" />
                      <rect x="160" y="48" width="20" height="42" rx="10" className="svg-porin" />
                      <path d="M192 54 C186 28, 198 16, 206 10" className="svg-pilus" />
                      <path d="M70 118 C64 164, 78 196, 92 216" className="svg-flagellum" />
                      <text x="160" y="214" textAnchor="middle" className="svg-title">Gram-Negative</text>
                    </svg>
                    <div className="diagram-legend">
                      <span><i className="legend-swatch outer-membrane"></i>Outer membrane</span>
                      <span><i className="legend-swatch periplasm"></i>Periplasm</span>
                      <span><i className="legend-swatch thin-wall"></i>Thin wall</span>
                      <span><i className="legend-swatch membrane"></i>Membrane</span>
                      <span><i className="legend-swatch porin"></i>Porin</span>
                      <span><i className="legend-line flagellum"></i>Flagellum</span>
                      <span><i className="legend-line pilus"></i>Pilus</span>
                    </div>
                    <p className="diagram-caption">
                      The extra outer membrane changes permeability, contributes endotoxin biology, and helps explain different staining behavior.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeGuide.id === 'gram-stain' && (
              <div className="guide-section-block">
                <h3>Visual Summary</h3>
                <div className="guide-diagram-grid">
                  <div className="guide-diagram-card">
                    <div className="microscopy-flow">
                      <div className="microscopy-node">Specimen</div>
                      <div className="microscopy-arrow">v</div>
                      <div className="microscopy-node">Smear</div>
                      <div className="microscopy-arrow">v</div>
                      <div className="microscopy-node">Stain</div>
                      <div className="microscopy-arrow">v</div>
                      <div className="microscopy-node emphasis">Interpret morphology + host cells</div>
                    </div>
                    <p className="diagram-caption">
                      Microscopy is most useful when students follow a simple sequence: prepare the specimen well, stain it correctly, then interpret the cells and organisms together.
                    </p>
                  </div>

                  <div className="guide-diagram-card">
                    <div className="gram-stain-steps">
                      <div className="gram-step violet">1. Crystal violet</div>
                      <div className="gram-step iodine">2. Iodine</div>
                      <div className="gram-step decolorizer">3. Decolorizer</div>
                      <div className="gram-step safranin">4. Safranin</div>
                    </div>
                    <p className="diagram-caption">
                      The decolorizer is the critical decision point. Too much or too little changes the result and can mislead the whole workup.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeGuide.sections.map((section) => (
              <div key={section.heading} className="guide-section-block">
                <h3>{section.heading}</h3>
                {section.intro && <p className="section-intro">{section.intro}</p>}
                <div className="guide-list-card">
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="guide-section-block">
              <h3>What To Do Next</h3>
              <div className="guide-next-steps">
                {nextSteps.map((step) => (
                  <button
                    key={step.title}
                    className="guide-next-step-card"
                    onClick={() => navigate(step.path)}
                  >
                    <strong>{step.title}</strong>
                    <p>{step.body}</p>
                  </button>
                ))}
              </div>
            </div>

            <AlphaValidationCTA
              location={`guides_${activeGuide.id}`}
              title="Help tune the guide library"
              body="Tell us which guide helped, what still feels unclear, and whether saved progress or bookmarks would help you return to long study paths."
            />
          </div>
        </div>
      </div>
    </ToolBox>
  );
};

export default MicroBasics;
