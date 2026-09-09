export type CaseDifficulty = 'beginner' | 'intermediate' | 'advanced';

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
  question: string;
  choices: CaseChoice[];
  teachingPoint: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  area: string;
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
    area: 'Bacteriology',
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
            label: 'This is Streptococcus pyogenes and no further workup is needed.',
            correct: false,
            feedback:
              'Streptococci appear as cocci in chains or pairs, not clusters. Shape and arrangement are part of the read, not just the Gram reaction.'
          },
          {
            id: 'c',
            label: 'Report the Gram stain as normal skin flora and stop.',
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
            label: 'Oxidase, to confirm the organism is a Staphylococcus.',
            correct: false,
            feedback:
              'Oxidase is a Gram-negative workhorse, especially for separating the non-fermenters. It is not the first split for Gram-positive cocci.'
          },
          {
            id: 'c',
            label: 'Optochin, since the colonies show hemolysis.',
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
            label: 'Coagulase-negative Staphylococcus. Report as probable contaminant.',
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
    area: 'Bacteriology',
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
            label: 'It sterilizes the specimen before plating.',
            correct: false,
            feedback:
              'A calibrated loop delivers a known volume. It does not sterilize anything, and sterilizing the specimen would defeat the culture.'
          },
          {
            id: 'c',
            label: 'It is only used to make the plate look tidy.',
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
            label: 'Set up an anaerobic culture, since urine is a sterile site.',
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
    area: 'Mycology',
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
          'India ink preparation: encapsulated budding yeast with wide capsules',
          'Gram stain: rare yeast forms'
        ],
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
            label: 'Call it artifact, since yeast in CSF is always contamination.',
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
            label: 'Growth on Sabouraud agar, which only Cryptococcus can do.',
            correct: false,
            feedback:
              'Sabouraud agar supports many yeasts and molds including Candida. Growth there does not discriminate.'
          },
          {
            id: 'c',
            label: 'The presence of budding, which is unique to Cryptococcus.',
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
    area: 'Mycobacteriology',
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
            label: 'Process on the open bench, since sputum is a routine respiratory specimen.',
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
            label: 'The patient definitively has tuberculosis.',
            correct: false,
            feedback:
              'Non-tuberculous mycobacteria are also acid fast. Calling TB from a smear alone overstates what the method can support.'
          },
          {
            id: 'c',
            label: 'The specimen is contaminated and should be rejected.',
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
            label: 'Hold the result until culture growth confirms it in six weeks.',
            correct: false,
            feedback:
              'Waiting weeks on a result that changes isolation and public health action is unsafe. NAAT exists to shorten exactly this gap.'
          },
          {
            id: 'c',
            label: 'Report only the smear result, since NAAT is a screening test.',
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
