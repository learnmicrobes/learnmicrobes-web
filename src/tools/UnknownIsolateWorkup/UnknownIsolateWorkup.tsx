import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolBox from '../../components/ToolBox/ToolBox';
import './UnknownIsolateWorkup.css';

type WorkupState = {
  specimen: string;
  purity: string;
  gramReaction: string;
  morphology: string;
  arrangement: string;
  hemolysis: string;
  macConkey: string;
  oxygen: string;
  catalase: string;
  oxidase: string;
  rapidClue: string;
};

type Recommendation = {
  heading: string;
  items: string[];
};

type LinkCard = {
  title: string;
  body: string;
  path: string;
};

const initialState: WorkupState = {
  specimen: '',
  purity: '',
  gramReaction: '',
  morphology: '',
  arrangement: '',
  hemolysis: '',
  macConkey: '',
  oxygen: '',
  catalase: '',
  oxidase: '',
  rapidClue: ''
};

const fieldOptions: Array<{
  key: keyof WorkupState;
  label: string;
  options: string[];
}> = [
  {
    key: 'specimen',
    label: 'Specimen context',
    options: ['Sterile site', 'Blood culture', 'Urine', 'Respiratory', 'Wound or tissue', 'Stool', 'Genital', 'Unknown']
  },
  {
    key: 'purity',
    label: 'Culture purity',
    options: ['Pure isolated colony', 'Mixed culture', 'Primary plate only', 'Not sure']
  },
  {
    key: 'gramReaction',
    label: 'Gram reaction',
    options: ['Gram positive', 'Gram negative', 'Gram variable', 'No organisms seen', 'Yeast or fungal elements']
  },
  {
    key: 'morphology',
    label: 'Cell morphology',
    options: ['Cocci', 'Rods', 'Coccobacilli', 'Curved rods', 'Branching rods', 'Pleomorphic rods', 'Not sure']
  },
  {
    key: 'arrangement',
    label: 'Arrangement',
    options: ['Clusters', 'Chains or pairs', 'Diplococci', 'Singles', 'Palisades', 'Branching', 'Not distinctive']
  },
  {
    key: 'hemolysis',
    label: 'Blood agar pattern',
    options: ['Beta hemolysis', 'Alpha hemolysis', 'Non-hemolytic', 'Swarming', 'Pigmented', 'Tiny or slow growth', 'No growth', 'Not assessed']
  },
  {
    key: 'macConkey',
    label: 'MacConkey result',
    options: ['Lactose fermenter', 'Non-lactose fermenter', 'Growth, unclear lactose', 'No growth', 'Not set up']
  },
  {
    key: 'oxygen',
    label: 'Atmosphere clue',
    options: ['Aerobic growth', 'CO2 enhanced', 'Anaerobic only', 'Microaerophilic', 'Facultative or unknown', 'No growth']
  },
  {
    key: 'catalase',
    label: 'Catalase',
    options: ['Positive', 'Negative', 'Variable or weak', 'Not tested']
  },
  {
    key: 'oxidase',
    label: 'Oxidase',
    options: ['Positive', 'Negative', 'Variable or weak', 'Not tested']
  },
  {
    key: 'rapidClue',
    label: 'High-yield clue',
    options: ['Indole positive', 'Urease rapid positive', 'PYR positive', 'Coagulase positive', 'Optochin susceptible', 'Bile esculin positive', 'Spore-forming rods', 'No clue yet']
  }
];

const hasAnySelection = (state: WorkupState) => Object.values(state).some(Boolean);

const buildRecommendations = (state: WorkupState): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  if (!hasAnySelection(state)) {
    return [
      {
        heading: 'Start with the first three observations',
        items: [
          'Choose specimen context, culture purity, and Gram stain pattern.',
          'Then add colony behavior and one branch-point test such as catalase or oxidase.',
          'The tool will turn those observations into a suggested next workup path.'
        ]
      }
    ];
  }

  if (state.purity === 'Mixed culture' || state.purity === 'Primary plate only' || state.purity === 'Not sure') {
    recommendations.push({
      heading: 'Purity checkpoint',
      items: [
        'Before trusting biochemical panels, choose an isolated representative colony or subculture for purity.',
        'Mixed growth can create impossible reaction profiles and misleading automated identifications.',
        'If this is a sterile-site specimen, document each clinically significant colony type before narrowing the workup.'
      ]
    });
  }

  if (state.specimen === 'Sterile site' || state.specimen === 'Blood culture') {
    recommendations.push({
      heading: 'Clinical significance checkpoint',
      items: [
        'Treat sterile-site and blood culture isolates as higher priority until contamination is reasonably assessed.',
        'Correlate colony type with direct Gram stain, number of positive cultures, time to positivity, and patient context.',
        'Escalate unusual Gram stains, mixed morphologies, yeast, or possible high-risk organisms according to lab policy.'
      ]
    });
  }

  if (state.gramReaction === 'Gram positive' && state.morphology === 'Cocci') {
    if (state.catalase === 'Positive') {
      recommendations.push({
        heading: 'Likely Gram-positive cocci: catalase positive path',
        items: [
          'Think Staphylococcus, Micrococcus, or related catalase-positive cocci.',
          'Next useful branch: coagulase or latex testing for suspected S. aureus, plus colony morphology and hemolysis.',
          'If the organism is from blood or sterile fluid, be cautious with coagulase-negative staphylococci: contaminant versus pathogen depends on context.'
        ]
      });
    } else if (state.catalase === 'Negative') {
      recommendations.push({
        heading: 'Likely Gram-positive cocci: catalase negative path',
        items: [
          'Think Streptococcus, Enterococcus, Aerococcus, or related organisms.',
          'Next useful branch: hemolysis pattern, PYR, bile esculin, salt tolerance, optochin, or CAMP depending on colony pattern.',
          'Alpha-hemolytic isolates often need optochin or bile solubility logic; beta-hemolytic isolates often need grouping or PYR/CAMP logic.'
        ]
      });
    } else {
      recommendations.push({
        heading: 'First branch for Gram-positive cocci',
        items: [
          'Run catalase from a clean colony and avoid carrying over blood agar, which can cause false bubbling.',
          'Use arrangement as a clue: clusters push toward staphylococci, while chains or pairs push toward streptococci or enterococci.',
          'Then choose coagulase, PYR, bile esculin, CAMP, optochin, or bile solubility based on the branch.'
        ]
      });
    }
  }

  if (state.gramReaction === 'Gram positive' && state.morphology.includes('Rods')) {
    recommendations.push({
      heading: 'Likely Gram-positive rods path',
      items: [
        'Decide whether rods are spore-forming, branching, club-shaped, palisading, or anaerobic.',
        'Aerobic spore-forming rods suggest Bacillus-like workup; anaerobic spore-forming rods suggest Clostridium-like workup.',
        'Branching or beaded rods should prompt modified acid-fast thinking for Nocardia-like aerobic actinomycetes.',
        'Beaded, weakly staining rods with clinical concern for tuberculosis or NTM should move into AFB smear, mycobacterial culture, NAAT, and biosafety workflow instead of routine Gram-positive rod panels.',
        'Pleomorphic palisading rods suggest coryneform organisms, where clinical significance depends heavily on specimen source and purity.'
      ]
    });
  }

  if (state.gramReaction === 'Gram negative' && (state.morphology === 'Rods' || state.morphology === 'Coccobacilli')) {
    if (state.oxidase === 'Negative' && (state.macConkey === 'Lactose fermenter' || state.macConkey === 'Non-lactose fermenter' || state.macConkey === 'Growth, unclear lactose')) {
      recommendations.push({
        heading: 'Likely Gram-negative rod: oxidase negative with MacConkey growth',
        items: [
          'Think Enterobacterales first, then use lactose reaction, indole, citrate, urease, motility, H2S, and decarboxylases.',
          'Lactose fermenters commonly move toward E. coli, Klebsiella, Enterobacter, Citrobacter, or related groups.',
          'Non-lactose fermenters require careful attention to H2S, PAD, urease, motility, indole, and specimen context.',
          'If OF or panel results look nonfermentative, consider Acinetobacter or Stenotrophomonas before forcing an enteric ID.',
          'For stool workups, use selective media and reporting rules before chasing every colony to species.'
        ]
      });
    } else if (state.oxidase === 'Positive') {
      recommendations.push({
        heading: 'Likely Gram-negative rod: oxidase positive path',
        items: [
          'Think Pseudomonas/Burkholderia-like nonfermenters, Rhizobium/Ochrobactrum-like environmental opportunists, Vibrio/Aeromonas/Plesiomonas, Campylobacter-like curved rods, or fastidious organisms depending on growth pattern.',
          'Use MacConkey growth, OF glucose, pigment, odor, motility, growth temperature, and atmosphere needs to choose the next branch.',
          'Yellow pigment, flexirubin reaction, TCBS growth, O/129 reaction, salt requirement, and seafood or freshwater exposure can quickly separate Chryseobacterium-like, Vibrio-like, and Aeromonas-like paths.',
          'Oral flora, human bite, dog or cat bite, endocarditis, pediatric joint infection, and asplenia push the workup toward Eikenella, Pasteurella, Capnocytophaga, Kingella, and other fastidious HACEK-like branches.',
          'Curved or seagull-shaped rods need microaerophilic and temperature logic before routine biochemical panels; think Campylobacter, Arcobacter, or Helicobacter when the specimen fits.',
          'For water, device, catheter, CF, bite wound, or travel/soil exposure, let the clinical context guide which uncommon nonfermenter branch matters.',
          'Tiny slow-growing coccobacilli with animal, unpasteurized dairy, rabbit, tick, or aerosol exposure should trigger Brucella or Francisella safety escalation rather than extra open-bench work.',
          'If growth is poor or absent on routine media, consider fastidious organisms and review specimen source before forcing an enteric pathway.'
        ]
      });
    } else if (state.macConkey === 'No growth') {
      recommendations.push({
        heading: 'Gram-negative rod with poor MacConkey growth',
        items: [
          'No MacConkey growth can point toward fastidious organisms, anaerobes, Campylobacter-like organisms, or non-enteric pathogens.',
          'Check chocolate agar, CO2 or microaerophilic growth, oxidase, Gram stain quality, and specimen type.',
          'Tiny pleomorphic Gram-negative coccobacilli that grow on chocolate but not sheep blood should trigger Haemophilus thinking: X/V factors, porphyrin, and satellitism.',
          'Pneumonia with water-system exposure and no routine growth should prompt Legionella thinking: BCYE with cysteine, urinary antigen limits, and outbreak context.',
          'Chronic pulmonary disease, sterile-site disease, skin or soft tissue lesions, and beaded acid-fast rods should prompt Mycobacteria thinking: AFB smear, NALC-NaOH processing when appropriate, mycobacterial culture, and NAAT when MTB complex is possible.',
          'Fever with rash, eschar, cytopenias, tick/louse/flea/mite exposure, bird exposure, livestock aerosols, or compatible genital ulcer disease should prompt intracellular or nonculturable-agent testing such as NAAT, serology, tissue stains, or reference workflow.',
          'A respiratory or genital syndrome with no useful Gram stain and poor routine growth should raise Mycoplasma or Ureaplasma possibilities: use validated NAAT or specialized sterol-containing culture rather than routine isolate logic.',
          'Genital ulcer, diffuse rash, erythema migrans, relapsing fever, animal urine or freshwater exposure, jaundice with renal findings, or aseptic meningitis should raise spirochete logic: syphilis serology, Lyme two-tier testing, Borrelia smear/PCR, or Leptospira MAT/PCR/culture.',
          'If colonies pit agar, smell bleach-like, glide, or grow better in CO2, consider Eikenella, Kingella, Capnocytophaga, Moraxella-like, or Pasteurella-like workups.',
          'Rat bite or rat exposure with compatible illness should raise Streptobacillus or Spirillum possibilities, especially when SPS inhibition or nonculturability explains negative routine culture.',
          'Avoid using enteric biochemical logic until the growth requirements make sense.'
        ]
      });
    } else {
      recommendations.push({
        heading: 'First branch for Gram-negative rods',
        items: [
          'Run oxidase and evaluate MacConkey growth before choosing a biochemical panel.',
          'Pair lactose reaction with colony morphology and odor or pigment clues.',
          'If the organism is curved, tiny, slow-growing, or fastidious, step away from routine enteric logic and review atmosphere/media needs.'
        ]
      });
    }
  }

  if (state.gramReaction === 'Gram negative' && (state.morphology === 'Cocci' || state.arrangement === 'Diplococci')) {
    recommendations.push({
      heading: 'Likely Gram-negative cocci or diplococci path',
      items: [
        'Think Neisseria or Moraxella-like organisms, then correlate with body site and growth on chocolate or selective media.',
        'Oxidase is usually an early branch point; butyrate, DNase, carbohydrate use, and growth requirements help separate key groups.',
        'Glucose-only carbohydrate use supports N. gonorrhoeae; glucose plus maltose supports N. meningitidis; lactose plus ONPG points toward N. lactamica.',
        'Butyrate esterase and DNase positivity with respiratory-source diplococci supports Moraxella catarrhalis.',
        'Direct smear findings from genital or sterile-site specimens may be clinically urgent and should follow local reporting policy.'
      ]
    });
  }

  if (state.oxygen === 'Anaerobic only') {
    recommendations.push({
      heading: 'Anaerobe checkpoint',
      items: [
        'Use anaerobic workflow logic: oxygen tolerance, Gram morphology, spore status, special-potency disks, bile, indole, and colony fluorescence or pigment.',
        'Make sure the specimen source is appropriate for anaerobic culture: aspirate, tissue, abscess material, sterile fluid, or deep wound is more useful than a superficial swab.',
        'Check whether anaerobic transport protected the specimen from oxygen and drying before trusting a negative anaerobic culture.',
        'Use BBE, LKV, anaerobic blood agar, PRAS/reduced media, and aerotolerance testing when the source and morphology support anaerobe workup.',
        'Do not interpret aerobic failure alone as anaerobic identification; pair it with growth under anaerobic conditions.'
      ]
    });
  }

  if (state.rapidClue && state.rapidClue !== 'No clue yet') {
    recommendations.push({
      heading: 'Use the high-yield clue carefully',
      items: [
        `${state.rapidClue} can be a strong discriminator only when the organism group and test conditions are appropriate.`,
        'Confirm that the isolate is pure, the reagent is in date, and the result timing matches the method.',
        'Use the clue to choose the next branch, not to override a conflicting Gram stain or colony pattern.'
      ]
    });
  }

  if (state.gramReaction === 'Yeast or fungal elements') {
    recommendations.push({
      heading: 'Outside bacterial roadmap scope',
      items: [
        'Yeast or fungal elements should move into fungal identification or yeast workup logic rather than bacterial biochemical pathways.',
        'Correlate with specimen source, direct smear, colony morphology, germ tube or chromogenic media when appropriate.',
        'Escalate sterile-site yeast according to laboratory reporting policy.'
      ]
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      heading: 'Build the next decision point',
      items: [
        'Add Gram reaction, morphology, culture purity, and either catalase or oxidase.',
        'The safest next step is usually the test that splits the largest likely organism group.',
        'If the pattern is discordant, verify purity and repeat the Gram stain from an isolated colony.'
      ]
    });
  }

  return recommendations;
};

const buildLinks = (state: WorkupState): LinkCard[] => {
  const links: LinkCard[] = [
    {
      title: 'Biochemical Tests',
      body: 'Review principles, reagents, QC, and expected positive or negative reactions.',
      path: '/biochemical-tests'
    },
    {
      title: 'Bacterial ID Strategy',
      body: 'Review the core guide for approaching unknown bacterial isolates.',
      path: '/guides?guide=bacterial-identification-strategy'
    }
  ];

  if (state.gramReaction === 'Gram positive') {
    links.unshift({
      title: 'Gram Positive Roadmap',
      body: 'Use morphology, catalase, hemolysis, and key tests to narrow Gram-positive organisms.',
      path: '/gram-positive-roadmap'
    });
  }

  if (state.gramReaction === 'Gram negative') {
    links.unshift({
      title: 'Gram Negative Roadmap',
      body: 'Use oxidase, MacConkey behavior, growth requirements, and biochemical patterns.',
      path: '/gram-negative-roadmap'
    });
  }

  if (state.oxygen === 'Anaerobic only') {
    links.unshift({
      title: 'Anaerobe Roadmap',
      body: 'Use oxygen tolerance, morphology, special disks, bile, pigment, and indole patterns.',
      path: '/obligate-anaerobe-roadmap'
    });
  }

  if (state.oxidase === 'Negative' && state.gramReaction === 'Gram negative' && state.macConkey !== 'No growth') {
    links.unshift({
      title: 'Enterics Calculator',
      body: 'Enter reactions when the isolate fits an Enterobacterales-style biochemical profile.',
      path: '/biochemical-calculator'
    });
  }

  return links;
};

const UnknownIsolateWorkup: React.FC = () => {
  const navigate = useNavigate();
  const [workup, setWorkup] = useState<WorkupState>(initialState);

  const recommendations = useMemo(() => buildRecommendations(workup), [workup]);
  const links = useMemo(() => buildLinks(workup), [workup]);
  const completedCount = Object.values(workup).filter(Boolean).length;

  const updateField = (key: keyof WorkupState, value: string) => {
    setWorkup((current) => ({ ...current, [key]: current[key] === value ? '' : value }));
  };

  const resetWorkup = () => {
    setWorkup(initialState);
  };

  return (
    <ToolBox
      title="Unknown Isolate Workup"
      icon="ID"
      onClose={() => navigate('/')}
    >
      <div className="unknown-workup">
        <section className="unknown-hero">
          <div>
            <span className="unknown-kicker">Guided bench reasoning</span>
            <h2>Build the next logical step from what you already know.</h2>
            <p>
              Select the observations available from Gram stain, primary plates, and early bench tests. The tool suggests the safest workup path and related Learn Microbes tools.
            </p>
          </div>
          <div className="unknown-progress" aria-label={`${completedCount} observations selected`}>
            <strong>{completedCount}</strong>
            <span>observations</span>
          </div>
        </section>

        <div className="unknown-layout">
          <section className="unknown-inputs" aria-label="Unknown isolate observations">
            {fieldOptions.map((field) => (
              <div className="unknown-field" key={field.key}>
                <h3>{field.label}</h3>
                <div className="unknown-chip-grid">
                  {field.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`unknown-chip ${workup[field.key] === option ? 'selected' : ''}`}
                      onClick={() => updateField(field.key, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button className="unknown-reset" type="button" onClick={resetWorkup}>
              Reset workup
            </button>
          </section>

          <aside className="unknown-results" aria-label="Suggested workup path">
            <div className="unknown-result-header">
              <span>Suggested path</span>
              <strong>{completedCount > 0 ? 'Updated live' : 'Waiting for observations'}</strong>
            </div>

            {recommendations.map((section) => (
              <div className="unknown-result-card" key={section.heading}>
                <h3>{section.heading}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="unknown-link-panel">
              <h3>Open the supporting tool</h3>
              <div className="unknown-link-list">
                {links.map((link) => (
                  <button
                    key={`${link.title}-${link.path}`}
                    type="button"
                    className="unknown-link-card"
                    onClick={() => navigate(link.path)}
                  >
                    <strong>{link.title}</strong>
                    <span>{link.body}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ToolBox>
  );
};

export default UnknownIsolateWorkup;
