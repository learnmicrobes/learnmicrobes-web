import type { AtlasPhoto } from './atlasPages';
import type { QuestionBankArea } from './questionBank';

export type CaseDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * A stage photograph.
 *
 * Same fields as an Atlas photo, and deliberately so: a case points at a file
 * the Atlas already ships, so the image is already listed on /image-credits and
 * adding a case can never put an uncredited image on the site. The import is
 * type-only, so no atlas data is pulled into this chunk.
 */
export type CaseImage = Pick<AtlasPhoto, 'src' | 'alt' | 'credit' | 'license' | 'sourceUrl'> & {
  /**
   * Shown under the photo BEFORE the learner answers, so it says what the prep
   * is, never what it shows. The moment a caption names the morphology the
   * photo stops being a question and goes back to being an illustration.
   */
  caption: string;
  /**
   * The file's own pixel size. Rendered as width/height attributes so the
   * browser reserves the right box before a lazily loaded photo arrives;
   * without them the figure is 2px tall and the question jumps down the
   * screen as the image lands. CSS keeps height:auto, so these only supply
   * the intrinsic ratio and never fix the displayed size.
   */
  width: number;
  height: number;
};

export type CaseChoice = {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
};

export type CaseStage = {
  id: string;
  stageLabel: string;
  findings: string[];
  /** Optional. Only the stages where a learner should READ a field, not be told. */
  image?: CaseImage;
  question: string;
  choices: CaseChoice[];
  teachingPoint: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  /**
   * The same union the question bank uses, so a case and a quiz question can
   * be filtered, counted or gated by one rule. See data/benchAreas.ts for the
   * display label and the short key the subject stains match on.
   */
  area: QuestionBankArea;
  difficulty: CaseDifficulty;
  specimen: string;
  presentation: string;
  stages: CaseStage[];
  finalAnswer: string;
  reportingNote: string;
  takeaways: string[];
  relatedLinks: Array<{ label: string; path: string }>;
};

/**
 * Cases walk the same order the bench does: specimen and safety first, then the
 * direct exam, then culture, then a branch-point test, then what actually gets
 * reported. Every distractor is a mistake students really make, and each carries
 * feedback explaining why it is wrong rather than just marking it wrong.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'staph-wound',
    title: 'Purulent wound after a minor injury',
    area: 'analytic-bacteriology',
    difficulty: 'beginner',
    specimen: 'Wound swab, deep tissue',
    presentation:
      'A 34-year-old presents with a painful, draining lesion on the forearm four days after a scrape. The area is warm and swollen with thick purulent drainage. A deep wound specimen is collected after cleaning the surface.',
    stages: [
      {
        id: 'gram',
        stageLabel: 'Direct exam',
        findings: [
          'Gram stain: many neutrophils',
          'Gram-positive cocci in clusters',
          'No other organisms seen'
        ],
        question: 'What does this Gram stain tell you so far?',
        choices: [
          {
            id: 'a',
            label: 'A staphylococcal lane is reasonable, and the neutrophils support a real infection.',
            correct: true,
            feedback:
              'Correct. Gram-positive cocci in clusters point toward Staphylococcus, and abundant neutrophils with a deep specimen support infection rather than surface contamination.'
          },
          {
            id: 'b',
            label: 'This is Streptococcus pyogenes, a common cause of wound infection, so no further workup is needed.',
            correct: false,
            feedback:
              'Streptococci appear as cocci in chains or pairs, not clusters. Shape and arrangement are part of the read, not just the Gram reaction.'
          },
          {
            id: 'c',
            label: 'Report the Gram stain as normal skin flora and stop, since skin organisms are expected here.',
            correct: false,
            feedback:
              'Many neutrophils with a single predominant organism from a deep specimen is not a normal-flora picture. Specimen source and inflammation change the interpretation.'
          }
        ],
        teachingPoint:
          'Gram stain is a branch point, not an identification. Color plus shape plus arrangement plus specimen quality is the full read.'
      },
      {
        id: 'catalase',
        stageLabel: 'First branch test',
        findings: [
          'Sheep blood agar: cream to golden colonies with beta hemolysis',
          'Growth on mannitol salt agar with yellow zones'
        ],
        question: 'Which test best separates the two main Gram-positive cocci groups here?',
        choices: [
          {
            id: 'a',
            label: 'Catalase, to split Staphylococcus from Streptococcus and Enterococcus.',
            correct: true,
            feedback:
              'Correct. Catalase is the classic first split for Gram-positive cocci. Staphylococcus is catalase positive; Streptococcus and Enterococcus are negative.'
          },
          {
            id: 'b',
            label: 'Oxidase, since it is the standard first split for Gram-positive cocci seen in clusters.',
            correct: false,
            feedback:
              'Oxidase is a Gram-negative workhorse, especially for separating the non-fermenters. It is not the first split for Gram-positive cocci.'
          },
          {
            id: 'c',
            label: 'Optochin, since the colonies are clearly hemolytic on the blood agar plate.',
            correct: false,
            feedback:
              'Optochin is used for alpha-hemolytic streptococci to identify S. pneumoniae. It does not apply to clustered Gram-positive cocci.'
          }
        ],
        teachingPoint:
          'Pick the test that splits the biggest group first. Working the branch order saves reagents and avoids dead ends.'
      },
      {
        id: 'coagulase',
        stageLabel: 'Confirming the species',
        findings: [
          'Catalase: positive',
          'Coagulase (tube): clot formed at 4 hours'
        ],
        question: 'What is the most likely identification, and what should follow?',
        choices: [
          {
            id: 'a',
            label: 'Staphylococcus aureus. Set up susceptibility testing including a methicillin surrogate.',
            correct: true,
            feedback:
              'Correct. Catalase-positive, coagulase-positive Gram-positive cocci in clusters is S. aureus. AST including cefoxitin as the methicillin surrogate guides therapy.'
          },
          {
            id: 'b',
            label: 'Coagulase-negative Staphylococcus, so report it as a probable skin contaminant and stop there.',
            correct: false,
            feedback:
              'The coagulase test was positive. A positive coagulase moves you to S. aureus, which from a purulent deep wound is clinically significant.'
          },
          {
            id: 'c',
            label: 'Micrococcus species. No susceptibility testing needed.',
            correct: false,
            feedback:
              'Micrococcus is typically modified-oxidase positive and coagulase negative, and is rarely the cause of a purulent wound in an immunocompetent patient.'
          }
        ],
        teachingPoint:
          'A positive coagulase on clustered, catalase-positive cocci is the standard route to S. aureus. Susceptibility results drive treatment.'
      }
    ],
    finalAnswer: 'Staphylococcus aureus from a deep wound specimen',
    reportingNote:
      'Report the organism with susceptibility results. Include the methicillin surrogate result, since it changes the treatment lane entirely.',
    takeaways: [
      'Deep specimen plus neutrophils plus one predominant organism supports true infection.',
      'Catalase splits staphylococci from streptococci and enterococci.',
      'Coagulase separates S. aureus from the coagulase-negative staphylococci.'
    ],
    relatedLinks: [
      { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
      { label: 'Coagulase test', path: '/biochemical-tests' },
      { label: 'Staphylococcus and Micrococcus', path: '/learn/staphylococcus-micrococcus' }
    ]
  },
  {
    id: 'ecoli-uti',
    title: 'Burning urination in an outpatient',
    area: 'analytic-bacteriology',
    difficulty: 'beginner',
    specimen: 'Clean-catch midstream urine',
    presentation:
      'A 27-year-old reports two days of burning urination and increased frequency. A clean-catch midstream urine is submitted for culture.',
    stages: [
      {
        id: 'quality',
        stageLabel: 'Specimen and setup',
        findings: [
          'Urine received within one hour of collection',
          'Culture set with a calibrated loop for colony counting'
        ],
        question: 'Why does the calibrated loop matter here?',
        choices: [
          {
            id: 'a',
            label: 'It lets you estimate colony-forming units per mL, which supports interpretation.',
            correct: true,
            feedback:
              'Correct. Urine culture interpretation depends on quantity as well as identity. The calibrated loop turns growth into a countable result.'
          },
          {
            id: 'b',
            label: 'It delivers a measured volume and sterilizes the specimen as it is plated.',
            correct: false,
            feedback:
              'A calibrated loop delivers a known volume. It does not sterilize anything, and sterilizing the specimen would defeat the culture.'
          },
          {
            id: 'c',
            label: 'It is only there to give a tidy streak pattern on the plate.',
            correct: false,
            feedback:
              'Streaking pattern matters for isolation, but the purpose of the calibrated loop is quantitation.'
          }
        ],
        teachingPoint:
          'For urine, how much grew is part of the answer. Delays at room temperature let counts rise and mislead interpretation.'
      },
      {
        id: 'culture',
        stageLabel: 'Culture reading',
        findings: [
          'Greater than 100,000 CFU/mL of a single colony type',
          'MacConkey: flat, dry pink colonies (lactose fermenter)',
          'Blood agar: grey colonies, some beta hemolysis'
        ],
        question: 'What is the most reasonable next step?',
        choices: [
          {
            id: 'a',
            label: 'Work the isolate as a lactose-fermenting Gram-negative rod, starting with indole and oxidase.',
            correct: true,
            feedback:
              'Correct. A significant count of a single lactose fermenter points to Enterobacterales. Oxidase and indole are efficient early splits.'
          },
          {
            id: 'b',
            label: 'Report as mixed urogenital flora and stop.',
            correct: false,
            feedback:
              'A single colony type at greater than 100,000 CFU/mL is not mixed flora. That report would leave a treatable infection unidentified.'
          },
          {
            id: 'c',
            label: 'Set up an anaerobic culture in addition to the routine plates, since urine comes from a normally sterile site.',
            correct: false,
            feedback:
              'Routine urine cultures are not set anaerobically. The organism is already growing well aerobically on routine media.'
          }
        ],
        teachingPoint:
          'Lactose fermentation on MacConkey plus a significant count narrows the lane quickly.'
      },
      {
        id: 'id',
        stageLabel: 'Identification',
        findings: [
          'Oxidase: negative',
          'Indole: positive',
          'Lactose: positive'
        ],
        question: 'Which identification fits best?',
        choices: [
          {
            id: 'a',
            label: 'Escherichia coli.',
            correct: true,
            feedback:
              'Correct. An oxidase-negative, indole-positive, lactose-positive Gram-negative rod from urine is the classic E. coli pattern, and E. coli is the leading cause of uncomplicated UTI.'
          },
          {
            id: 'b',
            label: 'Pseudomonas aeruginosa.',
            correct: false,
            feedback:
              'P. aeruginosa is oxidase positive and a non-lactose fermenter. Both results here point away from it.'
          },
          {
            id: 'c',
            label: 'Klebsiella pneumoniae.',
            correct: false,
            feedback:
              'Klebsiella is typically indole negative with mucoid colonies. The positive indole and dry colonies fit E. coli better.'
          }
        ],
        teachingPoint:
          'Oxidase negative, indole positive, lactose positive is a pattern worth knowing cold for urine cultures.'
      }
    ],
    finalAnswer: 'Escherichia coli, greater than 100,000 CFU/mL',
    reportingNote:
      'Report the organism with the colony count and susceptibility results so the clinician can judge significance and choose therapy.',
    takeaways: [
      'Urine interpretation combines identity with quantity.',
      'Oxidase separates Enterobacterales from the non-fermenters early.',
      'Indole is the quick split between E. coli and Klebsiella.'
    ],
    relatedLinks: [
      { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' },
      { label: 'Urine culture basics', path: '/learn/urine-culture-basics' },
      { label: 'Enterics calculator', path: '/biochemical-calculator' }
    ]
  },
  {
    id: 'crypto-meningitis',
    title: 'Headache and fever in an immunocompromised patient',
    area: 'analytic-mycology',
    difficulty: 'intermediate',
    specimen: 'Cerebrospinal fluid',
    presentation:
      'A 41-year-old with advanced HIV presents with two weeks of worsening headache, low-grade fever, and confusion. CSF is collected and sent for cell count, chemistry, and microbiology.',
    stages: [
      {
        id: 'direct',
        stageLabel: 'Direct exam',
        findings: [
          'CSF slightly cloudy, lymphocyte predominance',
          'India ink preparation made from CSF sediment, shown below',
          'Gram stain: rare yeast forms'
        ],
        image: {
          src: '/visual-atlas/photos/mycology/cryptococcus-india-ink-capsule-cdc-phil.jpg',
          // Describes the field without naming the organism. Alt text should say
          // what is visible, not hand over the identification the stage is asking
          // for - a screen-reader user gets the same question everyone else does.
          alt:
            'India ink preparation: round budding yeast cells, each sitting inside a wide clear halo against a dark background.',
          caption: 'India ink preparation, CSF sediment. Read the field before you answer.',
          credit: 'Source: CDC / PHIL - Sherry A. Brinkman',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://phil.cdc.gov/Details.aspx?pid=24018',
          width: 700,
          height: 460
        },
        question: 'What should you do with this India ink finding?',
        choices: [
          {
            id: 'a',
            label: 'Treat it as a presumptive Cryptococcus and confirm with cryptococcal antigen testing.',
            correct: true,
            feedback:
              'Correct. Encapsulated budding yeast in CSF strongly suggests Cryptococcus, but antigen testing is more sensitive and is the confirmation of choice.'
          },
          {
            id: 'b',
            label: 'Report India ink as definitive and cancel further testing.',
            correct: false,
            feedback:
              'India ink is specific when clearly positive but relatively insensitive. Cancelling confirmation risks missing cases and gives the clinician less to act on.'
          },
          {
            id: 'c',
            label: 'Call it artifact, since yeast seen in CSF is nearly always contamination.',
            correct: false,
            feedback:
              'CSF is a sterile site. Encapsulated yeast there is a significant finding, particularly in an immunocompromised patient.'
          }
        ],
        teachingPoint:
          'A negative India ink does not rule out cryptococcal meningitis. Antigen testing carries the sensitivity.'
      },
      {
        id: 'culture',
        stageLabel: 'Culture and confirmation',
        findings: [
          'Cryptococcal antigen: positive',
          'Sabouraud dextrose agar: cream, mucoid colonies at 3 days',
          'Urease: positive'
        ],
        question: 'Which result best supports Cryptococcus neoformans over a Candida species?',
        choices: [
          {
            id: 'a',
            label: 'The positive urease together with the capsule and mucoid colonies.',
            correct: true,
            feedback:
              'Correct. Cryptococcus is urease positive and encapsulated, producing mucoid colonies. Candida species are urease negative and not encapsulated.'
          },
          {
            id: 'b',
            label: 'Growth on Sabouraud agar at 30 degrees, which only Cryptococcus among the yeasts can manage.',
            correct: false,
            feedback:
              'Sabouraud agar supports many yeasts and molds including Candida. Growth there does not discriminate.'
          },
          {
            id: 'c',
            label: 'The presence of budding yeast forms, which among the pathogenic fungi is unique to Cryptococcus.',
            correct: false,
            feedback:
              'Budding is common to many yeasts. The capsule and urease result are the discriminating findings here.'
          }
        ],
        teachingPoint:
          'Capsule plus urease positivity is the practical pairing that separates Cryptococcus from Candida at the bench.'
      }
    ],
    finalAnswer: 'Cryptococcus neoformans in cerebrospinal fluid',
    reportingNote:
      'Communicate this as a critical result. A sterile-site fungal isolate in an immunocompromised patient needs prompt clinical action.',
    takeaways: [
      'CSF is sterile, so yeast there is significant until proven otherwise.',
      'India ink is specific but insensitive; antigen testing confirms.',
      'Urease positivity and a capsule separate Cryptococcus from Candida.'
    ],
    relatedLinks: [
      { label: 'Mycology overview', path: '/learn/mycology-overview' },
      { label: 'Urease test', path: '/biochemical-tests' },
      { label: 'Visual Atlas: Cryptococcus', path: '/visuals' }
    ]
  },
  {
    id: 'tb-escalation',
    title: 'Chronic cough with weight loss',
    area: 'analytic-mycobacteriology',
    difficulty: 'advanced',
    specimen: 'Expectorated sputum',
    presentation:
      'A 52-year-old reports six weeks of cough, night sweats, and unintentional weight loss, with recent travel to a high-incidence region. Sputum is submitted for acid-fast testing.',
    stages: [
      {
        id: 'safety',
        stageLabel: 'Safety and handling',
        findings: [
          'Requisition requests AFB smear and culture',
          'Patient history suggests possible tuberculosis'
        ],
        question: 'How should this specimen be handled?',
        choices: [
          {
            id: 'a',
            label: 'Process in a certified biosafety cabinet using BSL-3 practices for aerosol-generating steps.',
            correct: true,
            feedback:
              'Correct. Suspected M. tuberculosis requires containment because infection is via aerosol. Manipulation happens in a biosafety cabinet with appropriate practices.'
          },
          {
            id: 'b',
            label: 'Process on the open bench with standard precautions, since sputum is a routine respiratory specimen handled daily.',
            correct: false,
            feedback:
              'This is the highest-risk error in the scenario. Aerosolizing M. tuberculosis on an open bench endangers the whole laboratory.'
          },
          {
            id: 'c',
            label: 'Refrigerate and hold until the clinician confirms the diagnosis.',
            correct: false,
            feedback:
              'Delaying processing hurts recovery and patient care. The suspicion of TB is the reason to add containment, not to postpone work.'
          }
        ],
        teachingPoint:
          'Safety judgement precedes technique. When TB is suspected, containment comes before any manipulation.'
      },
      {
        id: 'smear',
        stageLabel: 'Direct exam',
        findings: [
          'Auramine-rhodamine fluorescent stain: acid-fast bacilli seen',
          'Confirmed with Ziehl-Neelsen: slender, beaded, red bacilli'
        ],
        question: 'What does a positive AFB smear establish?',
        choices: [
          {
            id: 'a',
            label: 'Mycobacteria are present, but the smear cannot distinguish M. tuberculosis from non-tuberculous species.',
            correct: true,
            feedback:
              'Correct. Acid-fast morphology confirms mycobacteria. Species identification requires culture, molecular testing, or both.'
          },
          {
            id: 'b',
            label: 'The patient definitively has tuberculosis, since acid-fast bacilli in sputum are specific for M. tuberculosis.',
            correct: false,
            feedback:
              'Non-tuberculous mycobacteria are also acid fast. Calling TB from a smear alone overstates what the method can support.'
          },
          {
            id: 'c',
            label: 'The specimen is contaminated with oral flora and should be rejected and recollected before any further testing.',
            correct: false,
            feedback:
              'Acid-fast bacilli in sputum from this patient is a meaningful positive finding, not evidence of contamination.'
          }
        ],
        teachingPoint:
          'A smear tells you a class of organism is present. It does not name a species.'
      },
      {
        id: 'naat',
        stageLabel: 'Escalation',
        findings: [
          'Nucleic acid amplification test: M. tuberculosis complex detected',
          'Rifampin resistance marker: not detected',
          'Culture pending'
        ],
        question: 'What is the appropriate action on this result?',
        choices: [
          {
            id: 'a',
            label: 'Notify promptly per protocol, since tuberculosis is reportable and drives isolation decisions.',
            correct: true,
            feedback:
              'Correct. M. tuberculosis complex detection is both a clinical and a public health event. Rapid communication supports isolation, treatment, and contact tracing.'
          },
          {
            id: 'b',
            label: 'Hold the result until culture growth confirms it, since culture is the reference method and takes up to six weeks.',
            correct: false,
            feedback:
              'Waiting weeks on a result that changes isolation and public health action is unsafe. NAAT exists to shorten exactly this gap.'
          },
          {
            id: 'c',
            label: 'Report only the smear result for now, since NAAT is a screening test that still needs culture confirmation.',
            correct: false,
            feedback:
              'NAAT for M. tuberculosis complex is a confirmatory diagnostic in this context, not a screen to be withheld.'
          }
        ],
        teachingPoint:
          'Some results are laboratory answers and public health events at the same time. Communication is part of the test.'
      }
    ],
    finalAnswer: 'Mycobacterium tuberculosis complex detected, rifampin resistance not detected',
    reportingNote:
      'Follow institutional critical-result and notifiable-disease procedures. Culture and full susceptibility testing continue regardless of the NAAT result.',
    takeaways: [
      'Suspected TB changes containment requirements before any processing.',
      'An AFB smear identifies a class, not a species.',
      'Rapid molecular results carry reporting and isolation consequences.'
    ],
    relatedLinks: [
      { label: 'Acid-fast stain', path: '/learn/acid-fast-stain' },
      { label: 'Laboratory safety', path: '/learn/laboratory-safety' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'falciparum-traveler',
    title: 'Fever after returning from West Africa',
    area: 'analytic-parasitology',
    difficulty: 'intermediate',
    specimen: 'Whole blood, EDTA',
    presentation:
      'A 34-year-old returned nine days ago from a work contract in West Africa and did not take antimalarial prophylaxis. Three days of high fever with shaking chills, headache, and vomiting; today the family reports that the patient is increasingly drowsy. Blood is drawn for malaria films.',
    stages: [
      {
        id: 'setup',
        stageLabel: 'Specimen and setup',
        findings: [
          'EDTA tube received 20 minutes after collection',
          'Order: thick and thin blood films for malaria parasites, marked STAT'
        ],
        question: 'How should this request be handled?',
        choices: [
          {
            id: 'a',
            label: 'Make thick and thin films now and read them as a STAT, without waiting for a batch.',
            correct: true,
            feedback:
              'Correct. Suspected malaria in a returned traveler is a laboratory emergency, because untreated falciparum can worsen within hours. Films are made promptly because parasites change shape the longer they sit in EDTA, which makes the species harder to call.'
          },
          {
            id: 'b',
            label: 'Refrigerate the tube and add it to the morning parasitology run.',
            correct: false,
            feedback:
              'Blood films for malaria are not a routine stool O&P. Holding the tube delays a diagnosis this patient may not have hours to spare for, and storage in EDTA distorts the parasites.'
          },
          {
            id: 'c',
            label: 'Make a thin film only, since that is the film used for the species.',
            correct: false,
            feedback:
              'The thin film names the species, but the thick film stacks many layers of blood under one field and is far more sensitive when parasites are scarce. A thin film alone can miss a real infection. Both are made.'
          }
        ],
        teachingPoint:
          'The thick film finds parasites; the thin film names and counts them. Make both, and treat the request as a STAT.'
      },
      {
        id: 'thick',
        stageLabel: 'Thick film',
        findings: [
          'Thick film, Giemsa: numerous ring-shaped parasites',
          'No mature trophozoites, schizonts, or gametocytes seen so far'
        ],
        question: 'Parasites are on the thick film. What happens now?',
        choices: [
          {
            id: 'a',
            label: 'Tell the clinician now that malaria parasites are seen, then go straight to the thin film for species and parasitemia.',
            correct: true,
            feedback:
              'Correct. A positive thick film is already actionable. The species and the parasitemia come from the thin film, but the clinician does not wait for them to learn that parasites are present.'
          },
          {
            id: 'b',
            label: 'Wait until the species and parasitemia are confirmed on the thin film, so the clinician receives one complete answer.',
            correct: false,
            feedback:
              'Holding a positive result while you work out the species costs the patient time. Say that parasites are present now, then follow up with the species and the count.'
          },
          {
            id: 'c',
            label: 'Report "malaria positive" and stop, since the diagnosis is made.',
            correct: false,
            feedback:
              'Positive is not the whole answer. The species drives the choice of drug and the level of concern, and the parasitemia measures severity and is followed to judge response. The thin film is still needed.'
          }
        ],
        teachingPoint:
          'Report in steps. "Parasites seen" goes out immediately; the species and the parasitemia follow from the thin film.'
      },
      {
        id: 'thin',
        stageLabel: 'Thin film',
        findings: [
          'Thin film, Giemsa, shown below',
          'After scanning the whole film, rings are the only stage found'
        ],
        image: {
          src: '/visual-atlas/photos/parasitology/plasmodium-falciparum-rings-cdc-dpdx.jpg',
          // Describes the field without naming the species the stage is asking
          // for - a screen-reader user gets the same question everyone else does.
          alt:
            'Giemsa-stained thin blood film: small, delicate ring-shaped parasites inside red cells, some cells holding more than one ring and some rings carrying two dots of chromatin.',
          caption: 'Thin blood film, Giemsa. Look at the host cells as well as the parasites.',
          credit: 'Source: CDC / DPDx',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://www.cdc.gov/dpdx/malaria/index.html',
          width: 300,
          height: 300
        },
        question: 'Which species does this film support?',
        choices: [
          {
            id: 'a',
            label: 'Plasmodium falciparum: small delicate rings, often several in one cell, in red cells of normal size.',
            correct: true,
            feedback:
              'Correct. Small delicate rings, more than one in a single cell, double chromatin dots, host cells that are not enlarged, and nothing on the film but rings: every feature points at falciparum. A banana-shaped gametocyte, if you find one, settles it outright.'
          },
          {
            id: 'b',
            label: 'Plasmodium vivax: larger amoeboid rings in enlarged red cells that carry fine Schuffner\'s stippling.',
            correct: false,
            feedback:
              'Vivax enlarges the cells it infects and fills them with fine, even Schuffner\'s stippling. The cells here are normal size and unstippled, and several rings share one cell, which points away from vivax.'
          },
          {
            id: 'c',
            label: 'Plasmodium malariae: compact rings and band-shaped forms in red cells of normal or small size.',
            correct: false,
            feedback:
              'Malariae makes compact rings and band forms stretched across the cell. These rings are delicate, several sit in one cell, and there are no band forms anywhere on the film.'
          }
        ],
        teachingPoint:
          'Read the host cell before the parasite. Whether it is enlarged and stippled separates falciparum from vivax faster than the ring itself does.'
      },
      {
        id: 'report',
        stageLabel: 'Parasitemia and reporting',
        findings: [
          'Species: Plasmodium falciparum',
          '62 infected red cells counted among 1,000 red cells on the thin film'
        ],
        question: 'What goes in the report, and how does it leave the lab?',
        choices: [
          {
            id: 'a',
            label: 'P. falciparum, parasitemia 6.2%, phoned to the clinician now as a critical result.',
            correct: true,
            feedback:
              'Correct. 62 infected cells out of 1,000 is 6.2%. A positive malaria film is a critical result in most laboratories, and a parasitemia of 5% or more is one of the CDC criteria for severe malaria, so this call is made immediately and documented.'
          },
          {
            id: 'b',
            label: 'P. falciparum, parasitemia 0.62%, phoned to the clinician now as a critical result.',
            correct: false,
            feedback:
              'Check the arithmetic: 62 out of 1,000 is 6.2%, not 0.62%. A tenfold slip makes a severe infection look mild, and the number feeds straight into treatment decisions.'
          },
          {
            id: 'c',
            label: 'Plasmodium seen, species to follow; hold the parasitemia until a second set of films is read.',
            correct: false,
            feedback:
              'Both answers are already in hand. The parasitemia guides treatment and is the baseline later films are compared against, so holding it back delays care for nothing.'
          }
        ],
        teachingPoint:
          'Count infected cells, not parasites: a cell holding three rings is one infected cell. With falciparum that matters, because multiply infected cells are common.'
      }
    ],
    finalAnswer: 'Plasmodium falciparum, parasitemia 6.2%',
    reportingNote:
      'Follow your facility\'s critical-result procedure. Parasitemia is repeated once treatment starts, to confirm it is falling. In the opposite situation, one negative set never excludes malaria: films are repeated every 12 to 24 hours until three sets in total have been read.',
    takeaways: [
      'Suspected malaria is a STAT request: make thick and thin films promptly and read them without batching.',
      'Report in steps: parasites seen now, then species and parasitemia from the thin film.',
      'Host cell size and stippling separate the species; a banana-shaped gametocyte settles falciparum outright.'
    ],
    relatedLinks: [
      { label: 'P. falciparum on a thin film', path: '/visuals/plasmodium-falciparum-smear' },
      { label: 'Plasmodium species compared', path: '/visuals/plasmodium-species-comparison' },
      { label: 'Malaria and blood films', path: '/learn/malaria-blood-films' }
    ]
  },
  {
    id: 'sputum-rejection',
    title: 'Productive cough on the medical ward',
    area: 'preanalytic-procedures',
    difficulty: 'beginner',
    specimen: 'Expectorated sputum',
    presentation:
      'A 71-year-old admitted with fever and a productive cough has sputum sent for routine bacterial culture. The ward note says the patient was handed a cup and asked to provide a sample.',
    stages: [
      {
        id: 'receipt',
        stageLabel: 'Receipt',
        findings: [
          'Labeled with two patient identifiers that match the requisition',
          'Collected 50 minutes ago and kept at room temperature',
          'Thin and watery, with no visible purulence'
        ],
        question: 'Is there a reason to stop before this goes any further?',
        choices: [
          {
            id: 'a',
            label: 'Accept it at the counter, but screen it with a Gram stain before plating, since a watery specimen may be mostly saliva.',
            correct: true,
            feedback:
              'Correct. The labeling and the 50-minute transport are both fine, so there is no reason to refuse it at the counter. Its appearance is a warning, though, and the Gram stain is how you find out whether it came from the lungs or the mouth.'
          },
          {
            id: 'b',
            label: 'Reject it on sight, since watery sputum is never acceptable.',
            correct: false,
            feedback:
              'Appearance raises the question but does not answer it. Rejecting on sight throws away specimens that a Gram stain would have shown to be perfectly adequate.'
          },
          {
            id: 'c',
            label: 'Plate it straight away; the label and the transport time are both acceptable, so specimen quality is not in question here.',
            correct: false,
            feedback:
              'Labels and transport are only half of acceptability. A correctly labeled, promptly delivered cup of saliva still produces a misleading culture.'
          }
        ],
        teachingPoint:
          'Acceptability has two halves: was it labeled and transported correctly, and did it come from the site requested. The second half needs a microscope.'
      },
      {
        id: 'screen',
        stageLabel: 'Quality screen',
        findings: [
          'Gram stain, low-power fields: more than 25 squamous epithelial cells per field',
          'Fewer than 10 neutrophils per field',
          'Bacteria of many shapes, none predominant'
        ],
        question: 'What does this screen tell you?',
        choices: [
          {
            id: 'a',
            label: 'The specimen is mostly saliva, so it should not be set up as a lower respiratory culture.',
            correct: true,
            feedback:
              'Correct. Many squamous cells with few neutrophils is the pattern of oral contamination under every common screening scheme. A culture would report mouth flora as if it had come from the lungs.'
          },
          {
            id: 'b',
            label: 'Many kinds of bacteria means a mixed infection, so plate it and identify each one.',
            correct: false,
            feedback:
              'Mixed shapes with no inflammation is the signature of the mouth, not of a polymicrobial pneumonia. Identifying each organism would produce a long and misleading report.'
          },
          {
            id: 'c',
            label: 'Some neutrophils are present, so the specimen is adequate and the culture should be set up as requested.',
            correct: false,
            feedback:
              'A few neutrophils do not outweigh this many squamous cells. The screen weighs both: plenty of inflammatory cells and few squamous cells is what makes a specimen worth culturing.'
          }
        ],
        teachingPoint:
          'Squamous cells measure contamination from the mouth; neutrophils measure inflammation. The exact cut-offs belong to your laboratory, but this pattern fails under all of them.'
      },
      {
        id: 'recollect',
        stageLabel: 'Rejection and recollection',
        findings: [
          'Decision: not acceptable for routine culture',
          'The patient is still on the ward'
        ],
        question: 'What happens next?',
        choices: [
          {
            id: 'a',
            label: 'Call the ward, explain the rejection, and ask for a fresh deep-cough specimen taken after a mouth rinse. Document the call.',
            correct: true,
            feedback:
              'Correct. A rejection only helps the patient if a better specimen follows. Telling the ward how to collect it - rinse with water, cough deeply, bring up material from the chest - is what makes the second sample better than the first.'
          },
          {
            id: 'b',
            label: 'Discard the specimen without contacting the ward, since nothing was cultured and there is no result worth reporting.',
            correct: false,
            feedback:
              'A silent rejection leaves the team waiting for a result that will never arrive, and the patient goes without a culture at all. Rejections have to be communicated.'
          },
          {
            id: 'c',
            label: 'Culture it anyway and add a comment that it may be contaminated.',
            correct: false,
            feedback:
              'A disclaimer does not stop a culture of mouth flora from being read as a result. Reporting it with a caveat still risks treatment the patient does not need.'
          }
        ],
        teachingPoint:
          'Rejecting a specimen starts a conversation rather than ending the work. The goal is a better specimen, quickly.'
      }
    ],
    finalAnswer: 'Rejected as oral contamination; recollection requested with instructions',
    reportingNote:
      'Follow your laboratory\'s acceptance criteria and rejection policy. Most laboratories document the reason for rejection, who was told, and when, and many post the rejection to the patient record so the team can see why no culture result will follow.',
    takeaways: [
      'Labeling and transport are only half of acceptability; the other half is whether the specimen came from the site requested.',
      'Many squamous cells with few neutrophils means saliva, and saliva cultures mislead.',
      'A rejection is only useful if a better specimen follows, so call and explain how to collect it.'
    ],
    relatedLinks: [
      { label: 'Respiratory specimen quality', path: '/learn/respiratory-specimen-quality' },
      { label: 'Specimen collection and transport', path: '/learn/specimen-collection-transport' },
      { label: 'Gram stain', path: '/learn/gram-stain' }
    ]
  },
  {
    id: 'blood-culture-callback',
    title: 'Overnight fever in a patient with a central line',
    area: 'postanalytic-procedures',
    difficulty: 'intermediate',
    specimen: 'Blood culture, two sets',
    presentation:
      'A 58-year-old with a central venous catheter for chemotherapy spikes a high fever overnight. Two sets of blood cultures are drawn: one through the catheter and one from a peripheral vein.',
    stages: [
      {
        id: 'call',
        stageLabel: 'The critical call',
        findings: [
          'Catheter set, aerobic bottle: flagged positive at 14 hours',
          'Gram stain: gram-positive cocci in clusters',
          'Peripheral set: no growth so far'
        ],
        question: 'How does this result leave the lab?',
        choices: [
          {
            id: 'a',
            label: 'Phone it to the responsible clinician now, have them read it back, and document who took the call and when.',
            correct: true,
            feedback:
              'Correct. A positive blood culture Gram stain is a critical result in almost every laboratory. Read-back closes the loop: the person receiving it repeats it, so a misheard "rods" for "cocci" is caught on the call instead of in the treatment.'
          },
          {
            id: 'b',
            label: 'Release it to the electronic record and let the clinical team see it on morning rounds with the other results.',
            correct: false,
            feedback:
              'Results that drive urgent treatment are not left for someone to find. Critical-result policies exist so that the right person hears it within a defined time.'
          },
          {
            id: 'c',
            label: 'Phone it to the ward, but skip the read-back, since the result is only a short phrase that is hard to mishear.',
            correct: false,
            feedback:
              'Short phrases are exactly the ones that get misheard. Read-back is required for critical results because "cocci" and "rods", or "positive" and "negative", are easy to confuse over the phone.'
          }
        ],
        teachingPoint:
          'A critical result has not been delivered until it has been heard, repeated back, and written down.'
      },
      {
        id: 'contaminant',
        stageLabel: 'Contaminant or infection',
        findings: [
          'Preliminary identification: coagulase-negative staphylococcus',
          'Peripheral set: still no growth at 48 hours',
          'The patient is still febrile, with the catheter in place'
        ],
        question: 'A clinician asks whether this is just a skin contaminant. What is the laboratory\'s honest answer?',
        choices: [
          {
            id: 'a',
            label: 'The identification alone cannot decide: one positive catheter set fits contamination or catheter infection, and the clinical picture decides.',
            correct: true,
            feedback:
              'Correct. Coagulase-negative staphylococci are both the commonest blood culture contaminant and a leading cause of catheter infection. A positive catheter set with a negative peripheral set leans away from true bloodstream infection, but the decision rests on the whole picture, and the laboratory\'s job is to supply all of the data for it.'
          },
          {
            id: 'b',
            label: 'Yes. Coagulase-negative staphylococci are ordinary skin flora, so one positive catheter bottle is always reported as a probable contaminant.',
            correct: false,
            feedback:
              'They are common contaminants, and they are also a leading cause of infections of catheters and implanted devices. "Always" is how real infections get dismissed.'
          },
          {
            id: 'c',
            label: 'No. Any organism recovered from a blood culture is a true infection.',
            correct: false,
            feedback:
              'Contaminants are real and common. Treating every positive bottle as infection leads to antibiotics and hospital days the patient did not need.'
          }
        ],
        teachingPoint:
          'The laboratory reports what grew and in which sets. Whether it matters depends on how many sets, which ones, and the patient, so the clinician needs all of it.'
      },
      {
        id: 'correction',
        stageLabel: 'Corrected report',
        findings: [
          'Final identification by MALDI-TOF: Staphylococcus aureus',
          'The preliminary report of coagulase-negative staphylococcus has already been released'
        ],
        question: 'A released identification was wrong. What is the right way to fix it?',
        choices: [
          {
            id: 'a',
            label: 'Issue a corrected report that keeps the original visible and marked as corrected, and phone the change through.',
            correct: true,
            feedback:
              'Correct. A corrected report shows what was released, what replaced it, and when, so anyone who acted on the first version can see that it changed. This correction also changes care: Staphylococcus aureus in a blood culture is treated as a true infection, so the change is phoned rather than just posted.'
          },
          {
            id: 'b',
            label: 'Edit the original result to read S. aureus so the record stays clean.',
            correct: false,
            feedback:
              'Overwriting a released result hides the fact that a clinician may already have acted on it. A correction has to leave the original visible and flagged.'
          },
          {
            id: 'c',
            label: 'Release the new identification as a separate report and leave the original standing, since both results were accurate when issued.',
            correct: false,
            feedback:
              'Two unlinked reports leave the reader to guess which one is true. A corrected report replaces the old result explicitly and says that it did.'
          }
        ],
        teachingPoint:
          'Never erase a released result. Correct it in the open, and phone when the correction changes what the clinician should do.'
      }
    ],
    finalAnswer: 'Staphylococcus aureus from the catheter set; corrected report issued and phoned',
    reportingNote:
      'Follow your facility\'s critical-result and corrected-report procedures, including read-back for every verbal result. A corrected report should show the original result, the new result, the reason for the change, and who was told.',
    takeaways: [
      'A critical result is delivered only once it has been read back and documented.',
      'Coagulase-negative staphylococci can be contamination or catheter infection; the laboratory supplies the data and the context decides.',
      'Released results are corrected in the open, never overwritten, and a correction that changes care is phoned.'
    ],
    relatedLinks: [
      { label: 'Blood cultures and sterile fluids', path: '/learn/blood-cultures-and-sterile-fluids' },
      { label: 'QC and reporting basics', path: '/learn/quality-control-reporting-basics' },
      { label: 'Gram stain', path: '/learn/gram-stain' }
    ]
  },
  {
    id: 'hiv-acute-window',
    title: 'Fever and rash two weeks after a new exposure',
    area: 'analytic-virology',
    difficulty: 'advanced',
    specimen: 'Serum',
    presentation:
      'A 26-year-old presents with fever, sore throat, swollen lymph nodes, and a faint rash, about two weeks after condomless sex with a new partner. HIV testing is ordered.',
    stages: [
      {
        id: 'screen',
        stageLabel: 'Screening assay',
        findings: [
          'HIV-1/2 antigen/antibody combination immunoassay (fourth generation): reactive',
          'The assay detects HIV-1 p24 antigen as well as antibodies to HIV-1 and HIV-2'
        ],
        question: 'What does this reactive screen establish?',
        choices: [
          {
            id: 'a',
            label: 'Only that the algorithm continues: this is a screening result, and the differentiation assay comes next.',
            correct: true,
            feedback:
              'Correct. A reactive screen is the start of the algorithm, not the answer. It is tuned to be highly sensitive, so it is followed by supplemental testing before anything is reported as a diagnosis.'
          },
          {
            id: 'b',
            label: 'The patient has HIV, and the result can be reported as positive.',
            correct: false,
            feedback:
              'A screen on its own is never reported as an HIV diagnosis. False reactive results happen, and the supplemental steps exist to sort them from true infection.'
          },
          {
            id: 'c',
            label: 'Very little, since fourth-generation screening assays give too many false positives to act on without confirmation.',
            correct: false,
            feedback:
              'Reactive screens are followed up, not dismissed. The algorithm exists precisely to separate true reactives from false ones, and skipping it would miss real infections.'
          }
        ],
        teachingPoint:
          'A screen is tuned to miss nothing, so it is allowed to be wrong in the other direction. That is why the algorithm has more than one step.'
      },
      {
        id: 'differentiation',
        stageLabel: 'Differentiation assay',
        findings: [
          'HIV-1/HIV-2 antibody differentiation immunoassay: HIV-1 negative, HIV-2 negative',
          'Fourth-generation screen: still reactive'
        ],
        question: 'The screen is reactive, but no antibodies are detected. How should this be read?',
        choices: [
          {
            id: 'a',
            label: 'As discordant: a false-reactive screen, or acute infection caught before antibodies form. HIV-1 nucleic acid testing is next.',
            correct: true,
            feedback:
              'Correct. The fourth-generation screen detects p24 antigen, which appears before antibodies do. A reactive screen with a negative differentiation assay is the pattern of very early infection - or of a false reactive - and an HIV-1 nucleic acid test tells the two apart.'
          },
          {
            id: 'b',
            label: 'As negative overall, since the differentiation assay is the more specific test and it found antibodies to neither virus.',
            correct: false,
            feedback:
              'The differentiation assay looks only for antibodies. In the first weeks of infection there may not be any yet, so a negative antibody result cannot overrule a reactive antigen/antibody screen.'
          },
          {
            id: 'c',
            label: 'As a false positive, and repeat the screen in three months.',
            correct: false,
            feedback:
              'Waiting three months would leave a possible acute infection undiagnosed through the period when it is most transmissible. Discordant results are resolved now, with nucleic acid testing.'
          }
        ],
        teachingPoint:
          'Each assay answers a narrower question. Antibodies take weeks to appear; antigen and RNA come first. A discordant pattern soon after exposure is a reason to look harder, not to stop.'
      },
      {
        id: 'nat',
        stageLabel: 'Nucleic acid test',
        findings: [
          'HIV-1 RNA, nucleic acid test: detected',
          'Differentiation assay: HIV-1 negative, HIV-2 negative'
        ],
        question: 'What does this combination of results mean?',
        choices: [
          {
            id: 'a',
            label: 'Acute HIV-1 infection: viral RNA is present before antibodies have formed.',
            correct: true,
            feedback:
              'Correct. A reactive antigen/antibody screen, a negative antibody differentiation assay, and detectable HIV-1 RNA is the classic pattern of acute HIV-1 infection, caught in the window before antibodies appear. Antibodies are expected on later testing.'
          },
          {
            id: 'b',
            label: 'A false-reactive screen, since no antibodies to either virus were found on the differentiation assay.',
            correct: false,
            feedback:
              'A false-reactive screen would leave the nucleic acid test negative. Detectable HIV-1 RNA confirms that the reactivity was real.'
          },
          {
            id: 'c',
            label: 'HIV-2 infection, since the HIV-1 antibody result on the differentiation assay was negative.',
            correct: false,
            feedback:
              'The differentiation assay was negative for HIV-2 as well, and the nucleic acid test detected HIV-1. Nothing here points at HIV-2.'
          }
        ],
        teachingPoint:
          'In the window period RNA turns positive first, antigen soon after, and antibodies last. Reading the results in that order is what makes acute infection visible.'
      }
    ],
    finalAnswer: 'Acute HIV-1 infection',
    reportingNote:
      'Report each result as your validated algorithm defines it, and follow local procedures for communicating a new HIV diagnosis and for any public health reporting. Acute infection carries very high viral loads, which makes prompt communication especially important.',
    takeaways: [
      'A reactive screen starts the algorithm; it is never reported as a diagnosis on its own.',
      'Soon after exposure, a negative antibody differentiation assay cannot overrule a reactive antigen/antibody screen.',
      'RNA appears first, then antigen, then antibodies, so a discordant early pattern calls for nucleic acid testing.'
    ],
    relatedLinks: [
      { label: 'HIV screening algorithm', path: '/visuals/hiv-screening-algorithm' },
      { label: 'HIV basics', path: '/learn/hiv-basics' },
      { label: 'Serology interpretation', path: '/learn/serology-interpretation' }
    ]
  },
  {
    id: 'schistosoma-japonicum-leyte',
    title: 'Abdominal swelling in a rice farmer from Leyte',
    area: 'analytic-parasitology',
    difficulty: 'intermediate',
    specimen: 'Stool for ova and parasites',
    presentation:
      'A 45-year-old rice farmer from Leyte has had months of intermittent bloody diarrhea and abdominal pain, and examination now finds an enlarged liver and spleen. The work involves wading through irrigation canals and flooded paddies every day without boots. The clinician suspects schistosomiasis.',
    stages: [
      {
        id: 'specimen',
        stageLabel: 'The right specimen',
        findings: [
          'Stool received for ova and parasites, query schistosomiasis',
          'The clinician phones to ask whether blood would be a better specimen for a "blood fluke"'
        ],
        question: 'What is the right answer to give?',
        choices: [
          {
            id: 'a',
            label: 'Stool is right: the adults live in blood vessels, but their eggs pass through the bowel wall and leave in the stool.',
            correct: true,
            feedback:
              'Correct. "Blood fluke" describes where the adults live, not where the lab finds them. The eggs work their way through the bowel wall and pass in the stool, and a concentration method improves the chance of finding them.'
          },
          {
            id: 'b',
            label: 'Agree, and ask for a thin blood film instead.',
            correct: false,
            feedback:
              'The name is the trap. The adult worms sit in veins, but their eggs are not found on a blood film. Changing to blood would swap a useful specimen for one that cannot answer the question.'
          },
          {
            id: 'c',
            label: 'Ask for a midday urine collection instead, since schistosome eggs are recovered from urine rather than from stool.',
            correct: false,
            feedback:
              'Urine is the specimen for S. haematobium, whose adults live around the bladder. A patient from Leyte with bloody diarrhea and an enlarged liver points to an intestinal species, whose eggs pass in the stool.'
          }
        ],
        teachingPoint:
          'Look for the eggs where the adults send them: through the bowel for the intestinal species, through the bladder for S. haematobium. A blood film is the wrong specimen for a blood fluke.'
      },
      {
        id: 'negative',
        stageLabel: 'A negative first specimen',
        findings: [
          'First stool, formalin-ethyl acetate concentrate: no eggs seen',
          'Symptoms and exposure history unchanged'
        ],
        question: 'The first specimen is negative. What does that tell you?',
        choices: [
          {
            id: 'a',
            label: 'Very little on its own: eggs pass in small numbers and unevenly, so more specimens are examined per policy.',
            correct: true,
            feedback:
              'Correct. Schistosome eggs pass irregularly and often in small numbers, especially in light or long-standing infection. One negative concentrate lowers the likelihood but does not rule the infection out, so more specimens are examined before anyone calls it negative.'
          },
          {
            id: 'b',
            label: 'Schistosomiasis is excluded by a negative concentrate, so the laboratory should suggest looking for another diagnosis.',
            correct: false,
            feedback:
              'One negative stool cannot exclude a parasite whose eggs pass irregularly. Calling it negative here would miss real infections, and the light ones most of all.'
          },
          {
            id: 'c',
            label: 'The specimen must have been collected incorrectly, so it should be rejected.',
            correct: false,
            feedback:
              'Nothing about the specimen was wrong. A negative result from a correctly collected stool is a valid result; it is simply not enough on its own.'
          }
        ],
        teachingPoint:
          'For a parasite that sheds eggs unevenly, a single negative is a reason to look again, not a conclusion.'
      },
      {
        id: 'egg',
        stageLabel: 'Identifying the egg',
        findings: [
          'Second stool, concentrate wet mount: eggs seen, shown below',
          'Measured with a calibrated ocular micrometer: about 80 micrometers long'
        ],
        image: {
          src: '/visual-atlas/photos/parasitology/schistosoma-japonicum-egg-cdc-dpdx.jpg',
          // Describes the egg without naming the species the stage is asking for.
          alt:
            'Unstained wet mount of a stool concentrate: a small, broadly oval egg with a smooth shell and no spine that can be seen.',
          caption: 'Stool concentrate, unstained wet mount. Note the shape and the size, not just the shell.',
          credit: 'Source: CDC / DPDx',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://www.cdc.gov/dpdx/schistosomiasis/index.html',
          width: 300,
          height: 300
        },
        question: 'Which identification does this egg support?',
        choices: [
          {
            id: 'a',
            label: 'Schistosoma japonicum: small and broadly oval, with a spine so small it is often not visible.',
            correct: true,
            feedback:
              'Correct. A small, broadly oval egg from stool, with no spine you can find and measuring well under 100 micrometers, is the pattern of S. japonicum. Its spine is a tiny knob that is usually hidden, so the size and shape carry the identification.'
          },
          {
            id: 'b',
            label: 'Schistosoma mansoni: large and elongated, with a prominent lateral spine that is hard to miss.',
            correct: false,
            feedback:
              'S. mansoni eggs are much larger and elongated, with a lateral spine that is hard to miss. This egg is small and broad, and nothing projects from its side.'
          },
          {
            id: 'c',
            label: 'Not a schistosome: an egg with no visible spine cannot be one.',
            correct: false,
            feedback:
              'This is the trap the egg sets. S. japonicum has a spine so small it is usually invisible, so a missing spine does not rule out a schistosome. The size and the short, broad shape point straight at one.'
          }
        ],
        teachingPoint:
          'When there is no spine to see, measure. Size and shape identify S. japonicum when its spine cannot.'
      }
    ],
    finalAnswer: 'Schistosoma japonicum eggs seen in stool',
    reportingNote:
      'Report the species and the specimen it was found in. Because eggs pass irregularly, follow your laboratory\'s policy on how many specimens are examined before reporting no eggs seen. A hatching test for egg viability needs fresh, unpreserved stool, so it has to be planned before the specimen goes into fixative.',
    takeaways: [
      'Look for schistosome eggs where the adults send them: the intestinal species in stool, S. haematobium in urine, and never on a blood film.',
      'Eggs pass irregularly, so a single negative stool does not exclude schistosomiasis.',
      'S. japonicum is small, broadly oval, and usually shows no spine, so measure it rather than waiting to see one.'
    ],
    relatedLinks: [
      { label: 'Schistosoma eggs by spine', path: '/visuals/schistosoma-egg' },
      { label: 'Stool ova and parasite', path: '/learn/stool-ova-and-parasite' },
      { label: 'Helminths', path: '/learn/helminths' }
    ]
  },
  {
    id: 'entamoeba-dysentery',
    title: 'Two weeks of bloody diarrhea',
    area: 'analytic-parasitology',
    difficulty: 'intermediate',
    specimen: 'Stool for ova and parasites',
    presentation:
      'A 29-year-old has had two weeks of cramping abdominal pain and frequent loose stools with blood and mucus, with little fever. Two people in the same household have had milder diarrhea. The first stool is collected at home and brought in later that morning.',
    stages: [
      {
        id: 'setup',
        stageLabel: 'Specimen and setup',
        findings: [
          'Liquid stool with blood and mucus, in a clean container with no preservative',
          'Passed about two hours before it reached the laboratory'
        ],
        question: 'What is the problem with this specimen, if any?',
        choices: [
          {
            id: 'a',
            label: 'Trophozoites in unpreserved liquid stool break down fast, so ask for a fresh specimen put into preservative at collection.',
            correct: true,
            feedback:
              'Correct. Liquid stool from dysentery carries trophozoites rather than cysts, and trophozoites disintegrate soon after passage. That is why many laboratories ask for liquid stool to be examined within about 30 minutes or preserved straight away. A specimen placed into fixative at collection keeps them intact for the permanent stain.'
          },
          {
            id: 'b',
            label: 'None: amoebae are hardy, so a two-hour delay will not affect the result.',
            correct: false,
            feedback:
              'Cysts are hardy; trophozoites are not. A liquid, bloody stool is exactly where trophozoites are expected, and two hours unpreserved is long enough for them to break down and be missed.'
          },
          {
            id: 'c',
            label: 'Refrigerate it and examine it with tomorrow\'s batch, since refrigeration will keep the trophozoites intact until the morning run.',
            correct: false,
            feedback:
              'Refrigeration slows decay but does not keep trophozoites recognizable overnight. Preservation at the time of collection is what keeps them intact.'
          }
        ],
        teachingPoint:
          'Cysts survive the trip; trophozoites do not. Match the handling to the stage you expect: liquid stool means trophozoites, and trophozoites need fixative fast.'
      },
      {
        id: 'cyst',
        stageLabel: 'Cysts on the trichrome',
        findings: [
          'New specimen, preserved at collection; trichrome-stained smear shown below',
          'Four nuclei counted across focal planes, each with a small central karyosome',
          'Cysts about 12 to 15 micrometers across'
        ],
        image: {
          src: '/visual-atlas/photos/parasitology/entamoeba-cyst-trichrome-cdc-dpdx.jpg',
          // Describes the cyst without naming the organism the stage asks about.
          alt:
            'Trichrome-stained stool smear: a round cyst with one nucleus in sharp focus, a dot-like karyosome at its center. Other nuclei sit in different focal planes.',
          caption: 'Trichrome smear. Count the nuclei across focal planes, not in one.',
          credit: 'Source: CDC / DPDx',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://www.cdc.gov/dpdx/amebiasis/index.html',
          width: 300,
          height: 300
        },
        question: 'What can be reported from these cysts?',
        choices: [
          {
            id: 'a',
            label: 'Entamoeba histolytica/E. dispar: the two have identical cysts, so the report names both.',
            correct: true,
            feedback:
              'Correct. Four nuclei with small central karyosomes, at this size, fit the E. histolytica/E. dispar group. Cyst morphology cannot separate the pathogen from its harmless twin, so the report names both and leaves the distinction to antigen or molecular testing.'
          },
          {
            id: 'b',
            label: 'Entamoeba histolytica, since the patient has bloody diarrhea and the cysts are the right size for it.',
            correct: false,
            feedback:
              'The symptoms make E. histolytica likely, but the cyst cannot prove it. E. dispar is common and looks exactly the same, so naming E. histolytica from a cyst overcalls the finding.'
          },
          {
            id: 'c',
            label: 'Entamoeba hartmanni, a harmless small amoeba that is easily mistaken for E. histolytica on a smear.',
            correct: false,
            feedback:
              'E. hartmanni is built the same way but measures under 10 micrometers. These cysts are well above that, so size rules it out.'
          }
        ],
        teachingPoint:
          'Report what the morphology can prove. For a four-nucleate Entamoeba cyst, that is E. histolytica/E. dispar, not one or the other.'
      },
      {
        id: 'trophozoite',
        stageLabel: 'A trophozoite',
        findings: [
          'Same smear: an amoebic trophozoite, shown below',
          'Single nucleus with a small central karyosome and fine, even peripheral chromatin'
        ],
        image: {
          src: '/visual-atlas/photos/parasitology/entamoeba-trophozoite-rbc-trichrome-cdc-dpdx.jpg',
          // Describes what is visible without naming what it proves.
          alt:
            'Trichrome-stained stool smear: an amoeba trophozoite with dark, round inclusions inside it.',
          caption: 'Trichrome smear. Look at what is inside the amoeba, not just its outline.',
          credit: 'Source: CDC / DPDx',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://www.cdc.gov/dpdx/amebiasis/index.html',
          width: 300,
          height: 300
        },
        question: 'What does this trophozoite change?',
        choices: [
          {
            id: 'a',
            label: 'It supports Entamoeba histolytica: ingested red cells are the one morphologic feature that separates it from E. dispar.',
            correct: true,
            feedback:
              'Correct. The dark inclusions are swallowed red cells. E. dispar is not associated with ingested red cells, so on morphology this is the finding that names E. histolytica, and it fits the bloody diarrhea.'
          },
          {
            id: 'b',
            label: 'Nothing: trophozoites cannot be told apart on morphology either, so the report stays at E. histolytica/E. dispar.',
            correct: false,
            feedback:
              'Usually that is true, but this trophozoite carries the exception. Ingested red cells are the one feature morphology can use to separate E. histolytica from E. dispar.'
          },
          {
            id: 'c',
            label: 'It points to Entamoeba coli, whose trophozoites are larger.',
            correct: false,
            feedback:
              'E. coli trophozoites have an off-center karyosome and coarse, uneven chromatin, and they do not swallow red cells. This one has a central karyosome, fine chromatin, and red cells inside it.'
          }
        ],
        teachingPoint:
          'A trophozoite with ingested red cells is where morphology finally gets to name E. histolytica. Without that finding, the report stays at E. histolytica/E. dispar.'
      },
      {
        id: 'commensal',
        stageLabel: 'Another organism',
        findings: [
          'Same smear: a second kind of cyst, shown below',
          'Five nuclei visible in a single focal plane'
        ],
        image: {
          src: '/visual-atlas/photos/parasitology/entamoeba-coli-cyst-trichrome-cdc-dpdx.jpg',
          // Describes the cyst without naming the species the stage asks about.
          alt:
            'Trichrome-stained stool smear: a large, round cyst with several faint, ring-shaped nuclei.',
          caption: 'Trichrome smear. Several nuclei show in this plane; focus up and down to count them all.',
          credit: 'Source: CDC / DPDx',
          license: 'Public domain (U.S. federal government work)',
          sourceUrl: 'https://www.cdc.gov/dpdx/intestinalamebae/index.html',
          width: 300,
          height: 300
        },
        question: 'What is this, and what happens to it in the report?',
        choices: [
          {
            id: 'a',
            label: 'Entamoeba coli: more than four nuclei rules out E. histolytica. It is reported too, as a marker of fecal-oral exposure.',
            correct: true,
            feedback:
              'Correct. A mature E. histolytica or E. dispar cyst stops at four nuclei, while E. coli carries up to eight, so five already rules out the pathogen. Many laboratories still report nonpathogens, because they show the patient swallowed fecally contaminated food or water - the same route that brought the pathogen.'
          },
          {
            id: 'b',
            label: 'A second Entamoeba histolytica cyst, since Entamoeba cysts all look alike.',
            correct: false,
            feedback:
              'Count the nuclei. Four is the most an E. histolytica or E. dispar cyst carries, so a cyst with five cannot be either.'
          },
          {
            id: 'c',
            label: 'Entamoeba coli, but it is left off the final report because it is harmless and does not explain the patient symptoms.',
            correct: false,
            feedback:
              'Policies differ, but many laboratories report nonpathogens because they are evidence of fecal-oral exposure, the same route the pathogen took. They do not explain the symptoms, but they are not noise either.'
          }
        ],
        teachingPoint:
          'Count the nuclei before you name an Entamoeba cyst. More than four is E. coli: harmless itself, but a sign of how the patient was exposed.'
      }
    ],
    finalAnswer: 'Entamoeba histolytica trophozoites with ingested red cells; Entamoeba coli cysts also seen',
    reportingNote:
      'Report each organism separately, with the stage seen. Where only cysts are found, report E. histolytica/E. dispar and follow your laboratory\'s policy on recommending antigen or molecular testing to separate them. Policies on reporting nonpathogenic amoebae vary, so follow yours.',
    takeaways: [
      'Liquid stool carries trophozoites, and trophozoites break down fast, so preserve at collection.',
      'A four-nucleate Entamoeba cyst is reported as E. histolytica/E. dispar; only ingested red cells in a trophozoite let morphology name E. histolytica.',
      'Count the nuclei: more than four is E. coli, harmless itself but a sign of how the patient was exposed.'
    ],
    relatedLinks: [
      { label: 'Entamoeba histolytica', path: '/visuals/entamoeba-histolytica' },
      { label: 'Entamoeba compared', path: '/visuals/entamoeba-comparison-panel' },
      { label: 'Intestinal protozoa', path: '/learn/intestinal-protozoa' }
    ]
  },
  {
    id: 'pneumococcus-blood-culture',
    title: 'Pneumonia with a positive blood culture',
    area: 'analytic-bacteriology',
    difficulty: 'intermediate',
    specimen: 'Blood culture, two sets',
    presentation:
      'A 68-year-old is admitted with three days of fever, productive cough, and shortness of breath. The chest film shows right lower lobe consolidation. Two sets of blood cultures are drawn before antibiotics, and one aerobic bottle signals positive at 18 hours.',
    stages: [
      {
        id: 'gram',
        stageLabel: 'Gram stain from the bottle',
        findings: [
          'Gram-positive cocci in pairs and short chains',
          'Many of the pairs are elongated, with pointed outer ends'
        ],
        question: 'What can you say from this Gram stain?',
        choices: [
          {
            id: 'a',
            label: 'A streptococcal pattern. The pointed pairs suggest S. pneumoniae, but the stain cannot confirm it.',
            correct: true,
            feedback:
              'Correct. Pairs and chains put this in the streptococcal lane, and lancet-shaped pairs fit S. pneumoniae. But pneumococci often form short chains in broth, and other streptococci can pair up, so the stain narrows the lane without naming the organism.'
          },
          {
            id: 'b',
            label: 'Report Streptococcus pneumoniae now, since lancet-shaped pairs on a Gram stain are diagnostic of it.',
            correct: false,
            feedback:
              'Lancet-shaped pairs are a strong hint, not proof. Report what the stain shows, Gram-positive cocci in pairs and chains, and let culture and testing name the organism.'
          },
          {
            id: 'c',
            label: 'Gram-positive cocci, so it is probably Staphylococcus. Set up a coagulase test.',
            correct: false,
            feedback:
              'Staphylococci grow in clusters. Pairs and chains point to streptococci, and coagulase is a staphylococcal test that does not belong in this lane.'
          }
        ],
        teachingPoint:
          'Read the arrangement, not just the color. Clusters mean the staphylococcal lane; pairs and chains mean the streptococcal one.'
      },
      {
        id: 'culture',
        stageLabel: 'Subculture',
        findings: [
          'Blood agar and chocolate agar, overnight in 5% CO2',
          'Small grey colonies with a green zone of partial hemolysis around them',
          'Some colonies have a flattened, sunken center',
          'Catalase: negative'
        ],
        question: 'Which test is the right next step?',
        choices: [
          {
            id: 'a',
            label: 'An optochin (P) disk, to separate S. pneumoniae from viridans streptococci.',
            correct: true,
            feedback:
              'Correct. A catalase-negative, alpha-hemolytic coccus is either S. pneumoniae or a viridans group streptococcus, and optochin is the standard first split. The sunken centers are a hint too: pneumococcal colonies often collapse in the middle as they begin to lyse themselves.'
          },
          {
            id: 'b',
            label: 'Bacitracin and PYR, to look for Streptococcus pyogenes and the other beta-hemolytic streptococci.',
            correct: false,
            feedback:
              'Bacitracin and PYR belong to the beta-hemolytic lane. These colonies show partial, green hemolysis, which is alpha, so the question is pneumococcus or viridans, not group A.'
          },
          {
            id: 'c',
            label: 'A coagulase test, to rule out Staphylococcus aureus before going further down this lane.',
            correct: false,
            feedback:
              'The negative catalase has already moved this out of the staphylococcal lane. Coagulase answers a question nobody is asking here.'
          }
        ],
        teachingPoint:
          'Catalase negative plus alpha hemolysis leaves two main answers, S. pneumoniae or viridans streptococci, and optochin is the test that splits them.'
      },
      {
        id: 'optochin',
        stageLabel: 'A borderline zone',
        findings: [
          'Optochin disk, 6 mm, on blood agar in 5% CO2 overnight',
          'Zone of inhibition: 11 mm'
        ],
        question: 'How do you read an 11 mm zone?',
        choices: [
          {
            id: 'a',
            label: 'Equivocal: confirm with bile solubility before calling it either way.',
            correct: true,
            feedback:
              'Correct. With a 6 mm disk in CO2, a zone of 14 mm or more is presumptive S. pneumoniae. A smaller zone is not a clean answer either way, because some pneumococci give small zones, so bile solubility settles it.'
          },
          {
            id: 'b',
            label: 'Resistant: any zone under 14 mm means a viridans streptococcus.',
            correct: false,
            feedback:
              'A zone below 14 mm is not the same as no zone. Optochin-resistant and borderline pneumococci exist, and calling this viridans would miss one in a patient with pneumonia.'
          },
          {
            id: 'c',
            label: 'Susceptible: any zone at all around the disk means S. pneumoniae.',
            correct: false,
            feedback:
              'Some viridans streptococci show a small zone, especially when the plate is not incubated in CO2. The 14 mm cutoff exists because a small zone cannot be trusted.'
          }
        ],
        teachingPoint:
          'A test with a cutoff has a gray zone. When a result lands in it, confirm with a second method instead of rounding it to the answer you expected.'
      },
      {
        id: 'significance',
        stageLabel: 'Is it significant?',
        findings: [
          'Bile solubility: colonies dissolve under 10% sodium desoxycholate',
          'Only one of the four bottles has grown so far'
        ],
        question: 'What is the identification, and how much weight does one bottle carry?',
        choices: [
          {
            id: 'a',
            label: 'S. pneumoniae, and significant even in one bottle, since it is not skin flora.',
            correct: true,
            feedback:
              'Correct. Bile solubility confirms S. pneumoniae. Contamination arguments rest on organisms that live on skin, such as coagulase-negative staphylococci. Pneumococcus does not, so one positive bottle in a patient with pneumonia is a real bacteremia.'
          },
          {
            id: 'b',
            label: 'S. pneumoniae, but probably a contaminant, since only one of the four bottles has grown.',
            correct: false,
            feedback:
              'The one-bottle rule of thumb is for skin organisms. S. pneumoniae is not a skin contaminant, and treating it as one would leave a bacteremia unreported.'
          },
          {
            id: 'c',
            label: 'S. pneumoniae, but hold the identification until the susceptibility results are ready to release with it.',
            correct: false,
            feedback:
              'The identification changes treatment now. Release it as soon as it is confirmed and add the susceptibility results when they finish.'
          }
        ],
        teachingPoint:
          'How many bottles grew matters only for organisms that could be contamination. Know which ones those are before you count.'
      }
    ],
    finalAnswer: 'Streptococcus pneumoniae isolated from blood',
    reportingNote:
      'Release the identification as soon as it is confirmed and follow with susceptibility results. Penicillin results for S. pneumoniae are interpreted with different breakpoints for meningitis and non-meningitis infections, so follow your laboratory\'s current standard and report the interpretation that fits the source.',
    takeaways: [
      'Pairs and chains put a Gram-positive coccus in the streptococcal lane; lancet-shaped pairs raise pneumococcus but do not prove it.',
      'For a catalase-negative, alpha-hemolytic coccus, optochin is the first split, and a zone under 14 mm needs bile solubility to settle it.',
      'S. pneumoniae in blood is significant even in one bottle, because it is not a skin contaminant.'
    ],
    relatedLinks: [
      { label: 'Optochin test', path: '/visuals/optochin-test' },
      { label: 'Bile solubility', path: '/visuals/bile-solubility' },
      { label: 'Streptococcus and Enterococcus', path: '/learn/streptococcus-enterococcus' }
    ]
  },
  {
    id: 'brucella-blood-culture',
    title: 'Weeks of fever after work abroad',
    area: 'analytic-bacteriology',
    difficulty: 'advanced',
    specimen: 'Blood culture, two sets',
    presentation:
      'A 41-year-old returned three months ago from working on a livestock farm in the Middle East, where raw camel and goat milk was part of the daily diet. For four weeks there has been fever that comes and goes, drenching night sweats, and low back pain. The clinician lists brucellosis among the possibilities and orders blood cultures.',
    stages: [
      {
        id: 'warning',
        stageLabel: 'Before the bottles signal',
        findings: [
          'Two sets of blood cultures received',
          'The clinician phones to say brucellosis is suspected'
        ],
        question: 'What should the laboratory do with that phone call?',
        choices: [
          {
            id: 'a',
            label: 'Flag the specimens so any growth is worked in a biosafety cabinet, and follow the policy for suspected Brucella.',
            correct: true,
            feedback:
              'Correct. The warning is most useful before anyone opens a plate. A flag on the specimen means the first Gram stain and subculture are already done in the cabinet, and some laboratories hold suspected Brucella bottles longer than the routine protocol.'
          },
          {
            id: 'b',
            label: 'Nothing changes: every blood culture is processed the same way, whatever the clinician suspects.',
            correct: false,
            feedback:
              'Routine processing is exactly the risk. Brucella is a leading cause of laboratory-acquired infection, and most of those infections began with routine open-bench work on an isolate nobody had flagged.'
          },
          {
            id: 'c',
            label: 'Suggest cancelling the blood cultures and sending serology instead, so the laboratory never handles live organisms.',
            correct: false,
            feedback:
              'Serology helps, but blood culture is still one of the main ways brucellosis is proven. The answer to a dangerous organism is safer handling, not refusing the specimen.'
          }
        ],
        teachingPoint:
          'Clinical history is part of the specimen. A warning that reaches the bench before the bottle signals protects everyone who handles it.'
      },
      {
        id: 'gram',
        stageLabel: 'A bottle signals',
        findings: [
          'Aerobic bottle signals positive on day 4',
          'Gram stain: very small, faintly staining Gram-negative coccobacilli, scattered like fine sand'
        ],
        question: 'What is the safest next step?',
        choices: [
          {
            id: 'a',
            label: 'Treat it as possible Brucella: tell the supervisor and do all further work in a biosafety cabinet.',
            correct: true,
            feedback:
              'Correct. Tiny, faint Gram-negative coccobacilli from a slow-signaling bottle, with this history, is the pattern that should stop routine work. From here every step happens in the cabinet, with no open-bench handling.'
          },
          {
            id: 'b',
            label: 'Set the subculture up on the open bench, since Gram-negative rods are routine.',
            correct: false,
            feedback:
              'These are not the plump rods of an enteric. Tiny, faint coccobacilli are the warning sign, and open-bench work is how laboratory Brucella infections happen.'
          },
          {
            id: 'c',
            label: 'Put the growth straight onto the automated identification system to get a name quickly.',
            correct: false,
            feedback:
              'Automated panels, and some mass spectrometry databases, do not reliably identify Brucella and have named it as something harmless such as Ochrobactrum. The setup also means extra handling. A few simple tests in the cabinet are safer and more useful.'
          }
        ],
        teachingPoint:
          'Some Gram stains are a safety finding before they are an identification finding. Tiny, faint Gram-negative coccobacilli from blood mean stop and contain.'
      },
      {
        id: 'ruleout',
        stageLabel: 'Rule-out tests',
        findings: [
          'Blood agar and chocolate agar at 48 hours: tiny, non-hemolytic, grey-white colonies',
          'MacConkey agar: no growth',
          'Tests done in the cabinet: oxidase positive, catalase positive, urease positive'
        ],
        question: 'What do these results support?',
        choices: [
          {
            id: 'a',
            label: 'Brucella cannot be ruled out: stop and refer the isolate to the reference laboratory.',
            correct: true,
            feedback:
              'Correct. Slow, tiny colonies with no growth on MacConkey, plus positive oxidase, catalase, and urease, fit Brucella. A routine laboratory\'s job at this point is to recognize it and refer it; confirmation and speciation belong to the reference laboratory.'
          },
          {
            id: 'b',
            label: 'Francisella tularensis, another slow-growing Gram-negative coccobacillus.',
            correct: false,
            feedback:
              'Francisella is also dangerous, but it is oxidase negative and grows poorly on blood agar compared with chocolate. A positive oxidase and good growth on blood agar point away from it.'
          },
          {
            id: 'c',
            label: 'Report Brucella melitensis, since the patient drank raw goat milk.',
            correct: false,
            feedback:
              'Exposure history raises the suspicion, but it cannot name a species. Speciation needs reference testing, and a routine laboratory reports only that Brucella could not be ruled out.'
          }
        ],
        teachingPoint:
          'A routine laboratory rules Brucella out or refers it. It does not confirm it, and it does not keep working it to get a species.'
      },
      {
        id: 'exposure',
        stageLabel: 'A possible exposure',
        findings: [
          'A coworker says they opened the first subculture plate on the open bench and smelled it before the Gram stain was read',
          'The coworker feels well'
        ],
        question: 'What should happen now?',
        choices: [
          {
            id: 'a',
            label: 'Report it to the supervisor today, so occupational health can assess the exposure.',
            correct: true,
            feedback:
              'Correct. Sniffing a plate or working it on the open bench is a high-risk Brucella exposure. Prompt reporting lets occupational health decide on preventive treatment and monitoring, and the laboratory checks who else handled the culture.'
          },
          {
            id: 'b',
            label: 'Nothing for now, since the coworker has no symptoms; report it only if a fever starts.',
            correct: false,
            feedback:
              'Brucellosis can take weeks to months to show symptoms, so feeling well today says nothing about the exposure. Waiting for symptoms gives up the chance to prevent the infection.'
          },
          {
            id: 'c',
            label: 'Disinfect the bench and the incubator. Once the surfaces are clean the exposure is over.',
            correct: false,
            feedback:
              'Cleaning matters, but the exposure already happened when the plate was opened and smelled. The person needs assessment, not just the bench.'
          }
        ],
        teachingPoint:
          'Never smell a culture plate. When an exposure happens anyway, report it the same day, because the window for preventive treatment is early.'
      }
    ],
    finalAnswer: 'Brucella species could not be ruled out; isolate referred to the public health reference laboratory',
    reportingNote:
      'Report a preliminary result that Brucella could not be ruled out, notify the clinician and follow your laboratory\'s policy for notifiable organisms. Confirmation and speciation come from the reference laboratory. Any laboratory exposure is reported the same day under your occupational health policy.',
    takeaways: [
      'A clinical warning is most useful before the bottle signals, so growth is contained from the first step.',
      'Tiny, faint Gram-negative coccobacilli from blood are a stop sign: biosafety cabinet, no open bench, no automated identification.',
      'A routine laboratory rules Brucella out or refers it, and never smells a plate.'
    ],
    relatedLinks: [
      { label: 'Do not routine culture', path: '/do-not-routine-culture' },
      { label: 'Zoonotic Gram-negative agents', path: '/learn/zoonotic-and-safety-sensitive-gram-negative-agents' },
      { label: 'Special pathogens hub', path: '/special-pathogens' }
    ]
  }
];

export const getCaseStudyById = (id?: string) => caseStudies.find((item) => item.id === id);

export const getCaseStudyStats = () => {
  const difficultyCounts: Record<CaseDifficulty, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0
  };

  caseStudies.forEach((item) => {
    difficultyCounts[item.difficulty] += 1;
  });

  const decisionPoints = caseStudies.reduce((total, item) => total + item.stages.length, 0);

  return { total: caseStudies.length, difficultyCounts, decisionPoints };
};
