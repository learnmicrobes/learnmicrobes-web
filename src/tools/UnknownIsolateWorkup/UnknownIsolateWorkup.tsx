import React, { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolBox from '../../components/ToolBox/ToolBox';
import { useAuth } from '../../context/AuthContext';
import { buildAuthRedirectPath } from '../../utils/authRedirect';
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

type WorkupSynthesis = {
  branch: string;
  nextStep: string;
  why: string;
  watchOut: string;
  organisms: string[];
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

const primaryFieldOptions: Array<{
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
    key: 'macConkey',
    label: 'MacConkey result',
    options: ['Lactose fermenter', 'Non-lactose fermenter', 'Growth, unclear lactose', 'No growth', 'Not set up']
  }
];

const secondaryFieldOptions: Array<{
  key: keyof WorkupState;
  label: string;
  options: string[];
}> = [
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
    key: 'rapidClue',
    label: 'High-yield clue',
    options: ['Indole positive', 'Urease rapid positive', 'PYR positive', 'Coagulase positive', 'Optochin susceptible', 'Bile esculin positive', 'Spore-forming rods', 'No clue yet']
  }
];

const fieldOptions = [...primaryFieldOptions, ...secondaryFieldOptions];

const hasAnySelection = (state: WorkupState) => Object.values(state).some(Boolean);

const getSelectedObservations = (state: WorkupState) => (
  fieldOptions
    .map((field) => ({
      label: field.label,
      value: state[field.key]
    }))
    .filter((item) => Boolean(item.value))
);

const getMissingHighYieldFields = (state: WorkupState) => (
  primaryFieldOptions
    .filter((field) => !state[field.key])
    .slice(0, 3)
    .map((field) => field.label)
);

const buildSynthesis = (state: WorkupState, recommendations: Recommendation[]): WorkupSynthesis => {
  if (state.purity === 'Mixed culture' || state.purity === 'Primary plate only' || state.purity === 'Not sure') {
    return {
      branch: 'Purity checkpoint before organism narrowing',
      nextStep: 'Pick or subculture a representative isolated colony before trusting biochemical reactions.',
      why: 'Mixed growth and primary-plate-only workups can create conflicting reactions that look like a rare organism but are really more than one isolate.',
      watchOut: 'Do not force an ID from a mixed culture, especially from sterile-site or blood culture material.',
      organisms: ['Multiple colony types possible', 'Contaminant versus pathogen depends on source']
    };
  }

  if (state.gramReaction === 'Gram positive' && state.morphology === 'Cocci') {
    if (state.catalase === 'Positive') {
      if (state.rapidClue === 'Coagulase positive' || state.hemolysis === 'Beta hemolysis') {
        return {
          branch: 'Gram-positive cocci, catalase-positive — S. aureus pattern',
          nextStep: 'Confirm with slide then tube coagulase; pair with beta-hemolysis, mannitol salt yellowing, and DNase.',
          why: 'A coagulase-positive or beta-hemolytic catalase-positive coccus is the classic S. aureus profile at this branch.',
          watchOut: 'S. lugdunensis is slide-coagulase variable; always confirm a positive slide with tube coagulase before reporting.',
          organisms: ['Staphylococcus aureus', 'Staphylococcus lugdunensis', 'Staphylococcus pseudintermedius']
        };
      }
      return {
        branch: 'Gram-positive cocci, catalase-positive branch',
        nextStep: 'Move to coagulase or latex testing to separate S. aureus from coagulase-negative staphylococci.',
        why: 'Catalase separates staphylococcal-like from streptococcal-like cocci; coagulase is the most urgent next split.',
        watchOut: 'Blood culture and sterile-site CoNS need clinical context before calling contamination.',
        organisms: ['Staphylococcus aureus', 'S. epidermidis', 'S. saprophyticus', 'S. haemolyticus']
      };
    }

    if (state.catalase === 'Negative') {
      if (state.hemolysis === 'Beta hemolysis') {
        if (state.rapidClue === 'PYR positive') {
          return {
            branch: 'Gram-positive cocci, catalase-negative — Group A streptococcal pattern',
            nextStep: 'Confirm PYR and bacitracin susceptibility; add Lancefield grouping if from sterile site or blood.',
            why: 'PYR-positive beta-hemolytic catalase-negative cocci fit S. pyogenes as the primary candidate at this branch.',
            watchOut: 'Enterococcus and S. anginosus group can mimic beta-hemolytic patterns; colony size and zone width help separate.',
            organisms: ['Streptococcus pyogenes', 'S. anginosus group', 'Enterococcus faecalis']
          };
        }
        return {
          branch: 'Gram-positive cocci, catalase-negative, beta-hemolytic branch',
          nextStep: 'Use PYR, CAMP, colony size, and Lancefield grouping to separate key beta-hemolytic streptococci.',
          why: 'Beta-hemolytic catalase-negative cocci span Group A, B, C, F, and G streptococci plus viridans group outliers.',
          watchOut: 'Small-colony beta-hemolytic streptococci (anginosus group) are VP-positive and prone to abscess formation.',
          organisms: ['Streptococcus pyogenes', 'Streptococcus agalactiae', 'S. dysgalactiae subsp. equisimilis', 'S. anginosus group']
        };
      }
      if (state.hemolysis === 'Alpha hemolysis') {
        if (state.rapidClue === 'Optochin susceptible') {
          return {
            branch: 'Gram-positive cocci, alpha-hemolytic — S. pneumoniae pattern',
            nextStep: 'Confirm bile solubility and optochin zone under ambient air; check for lancet-shaped diplococci.',
            why: 'Optochin susceptibility plus bile solubility is the classic confirmation pair for S. pneumoniae.',
            watchOut: 'Optochin zones under CO2 are smaller; use ambient air to avoid false resistance reads.',
            organisms: ['Streptococcus pneumoniae', 'Viridans streptococci (mitis group)', 'Aerococcus species']
          };
        }
        if (state.rapidClue === 'Bile esculin positive') {
          return {
            branch: 'Gram-positive cocci, catalase-negative, bile esculin positive branch',
            nextStep: 'Add NaCl 6.5% tolerance and PYR to separate Enterococcus from S. bovis group.',
            why: 'Bile esculin positivity narrows the field to Enterococcus-like and S. bovis/gallolyticus group organisms.',
            watchOut: 'S. bovis/gallolyticus is strongly associated with colorectal malignancy — flag for clinical correlation.',
            organisms: ['Enterococcus faecalis', 'Enterococcus faecium', 'Streptococcus gallolyticus (S. bovis group)']
          };
        }
        return {
          branch: 'Gram-positive cocci, catalase-negative, alpha-hemolytic branch',
          nextStep: 'Run optochin or bile solubility to screen for S. pneumoniae, then bile esculin and NaCl for enterococcal logic.',
          why: 'Alpha-hemolytic catalase-negative cocci cover pneumococcal, viridans, and enterococcal branches.',
          watchOut: 'Alpha-hemolytic isolates from blood or sterile sites deserve full species-level workup — do not shortcut.',
          organisms: ['Streptococcus pneumoniae', 'Viridans streptococci', 'Enterococcus species']
        };
      }
      return {
        branch: 'Gram-positive cocci, catalase-negative branch',
        nextStep: 'Use hemolysis pattern, PYR, bile esculin, salt tolerance, optochin, or CAMP based on colony pattern.',
        why: 'Catalase-negative cocci move toward Streptococcus, Enterococcus, Aerococcus, and related groups.',
        watchOut: 'Alpha-hemolytic isolates are a common trap: optochin and bile solubility logic matters more than names alone.',
        organisms: ['Streptococcus pyogenes', 'Streptococcus pneumoniae', 'Enterococcus faecalis', 'Streptococcus agalactiae']
      };
    }

    return {
      branch: 'First split for Gram-positive cocci',
      nextStep: 'Run catalase from a clean colony, then branch by catalase result and arrangement.',
      why: 'Catalase is the safest early split between staphylococcal-like and streptococcal/enterococcal-like workups.',
      watchOut: 'Avoid dragging blood agar into the catalase reagent — it can cause false bubbling.',
      organisms: ['Staphylococcus aureus', 'S. epidermidis', 'Streptococcus pyogenes', 'Enterococcus faecalis']
    };
  }

  if (state.gramReaction === 'Gram positive' && (state.morphology === 'Rods' || state.morphology === 'Branching rods' || state.morphology === 'Pleomorphic rods')) {
    return {
      branch: 'Gram-positive rod branch',
      nextStep: 'Decide whether rods are spore-forming, branching, palisading, beaded, or anaerobic.',
      why: 'Gram-positive rods are not one workflow; morphology, oxygen tolerance, source, and biosafety clues decide which branch is appropriate.',
      watchOut: 'Beaded rods or possible AFB organisms should move into mycobacterial or modified acid-fast workflow, not routine open-bench panels.',
      organisms: ['Bacillus cereus', 'Clostridium perfringens', 'Corynebacterium species', 'Listeria monocytogenes', 'Nocardia-like organisms']
    };
  }

  if (state.gramReaction === 'Gram negative' && (state.morphology === 'Rods' || state.morphology === 'Coccobacilli')) {
    if (state.oxidase === 'Negative' && state.macConkey !== 'No growth' && state.macConkey !== 'Not set up') {
      if (state.macConkey === 'Lactose fermenter') {
        return {
          branch: 'Gram-negative rod, oxidase-negative, lactose fermenter',
          nextStep: 'Use indole, citrate, urease, motility, VP, and decarboxylases to separate the lactose-fermenting enterics.',
          why: 'Oxidase-negative lactose-fermenting GNRs on MacConkey fit Enterobacterales logic; indole and urease are fast early splits.',
          watchOut: 'Not all lactose fermenters are E. coli — Klebsiella and Enterobacter are indole-negative and urease-variable.',
          organisms: ['Escherichia coli', 'Klebsiella pneumoniae', 'Enterobacter cloacae', 'Citrobacter freundii']
        };
      }
      if (state.macConkey === 'Non-lactose fermenter') {
        return {
          branch: 'Gram-negative rod, oxidase-negative, non-lactose fermenter',
          nextStep: 'Add H2S, urease, indole, PAD, motility, and specimen context before committing to an enteric branch.',
          why: 'Non-lactose fermenters include Salmonella, Shigella, Proteus, and nonfermenter outliers — source and H2S narrow this fast.',
          watchOut: 'Stool isolates need selective media reporting rules; do not chase every colony to species without clinical indication.',
          organisms: ['Salmonella species', 'Shigella species', 'Proteus mirabilis', 'Morganella morganii', 'Acinetobacter baumannii']
        };
      }
      return {
        branch: 'Gram-negative rod, oxidase-negative with MacConkey growth',
        nextStep: 'Use lactose reaction, indole, citrate, urease, motility, H2S, and decarboxylases to narrow the enteric branch.',
        why: 'Oxidase-negative MacConkey growers usually fit Enterobacterales-style logic where a small set of reactions separates common groups.',
        watchOut: 'Non-lactose fermenters need careful H2S, PAD, urease, motility, and specimen-context thinking before jumping to Salmonella/Shigella.',
        organisms: ['Escherichia coli', 'Klebsiella pneumoniae', 'Proteus mirabilis', 'Enterobacter cloacae', 'Salmonella species']
      };
    }

    if (state.oxidase === 'Positive') {
      return {
        branch: 'Gram-negative rod, oxidase-positive branch',
        nextStep: 'Use MacConkey growth, OF glucose, pigment, odor, motility, atmosphere, and source to choose the next branch.',
        why: 'Oxidase-positive rods span nonfermenters, water-associated organisms, fastidious organisms, and curved rods.',
        watchOut: 'Tiny slow growers, animal exposure, water exposure, or curved rods can signal safety or special-media workflows.',
        organisms: ['Pseudomonas aeruginosa', 'Aeromonas hydrophila', 'Campylobacter jejuni', 'Stenotrophomonas maltophilia']
      };
    }

    if (state.macConkey === 'No growth') {
      return {
        branch: 'Gram-negative rod with poor MacConkey growth',
        nextStep: 'Check chocolate agar, CO2 or microaerophilic growth, oxidase, Gram stain quality, and specimen source.',
        why: 'Poor MacConkey growth pushes the workup away from routine enteric assumptions toward fastidious, anaerobic, or special-media organisms.',
        watchOut: 'Do not use an enterics calculator until the growth requirements actually fit an enteric isolate.',
        organisms: ['Haemophilus influenzae', 'Campylobacter jejuni', 'Legionella pneumophila', 'Pasteurella multocida', 'Anaerobic GNRs']
      };
    }

    return {
      branch: 'First split for Gram-negative rods',
      nextStep: 'Run oxidase and evaluate MacConkey growth before choosing a biochemical panel.',
      why: 'Oxidase plus MacConkey behavior separates many routine enteric, nonfermenter, and fastidious pathways.',
      watchOut: 'Curved, tiny, slow-growing, or fastidious isolates need atmosphere/media logic before routine biochemical logic.',
      organisms: ['Escherichia coli', 'Pseudomonas aeruginosa', 'Klebsiella pneumoniae', 'Haemophilus species']
    };
  }

  if (state.gramReaction === 'Gram negative' && (state.morphology === 'Cocci' || state.arrangement === 'Diplococci')) {
    return {
      branch: 'Gram-negative cocci or diplococci branch',
      nextStep: 'Correlate body site with chocolate/selective-media growth, oxidase, butyrate, DNase, and carbohydrate use.',
      why: 'Neisseria- and Moraxella-like organisms require source-aware interpretation because direct smear findings may be clinically urgent.',
      watchOut: 'Genital or sterile-site diplococci should follow local reporting and escalation policy.',
      organisms: ['Neisseria gonorrhoeae', 'Neisseria meningitidis', 'Moraxella catarrhalis', 'Neisseria lactamica']
    };
  }

  if (state.oxygen === 'Anaerobic only') {
    return {
      branch: 'Anaerobic isolate branch',
      nextStep: 'Use oxygen tolerance, Gram morphology, spore status, bile, indole, special-potency disks, pigment, and fluorescence.',
      why: 'Anaerobe workups depend on specimen quality, transport, oxygen exposure, and reduced media before organism-level narrowing.',
      watchOut: 'A superficial swab or oxygen-exposed specimen may be a poor anaerobic culture source.',
      organisms: ['Bacteroides fragilis', 'Clostridium perfringens', 'Peptostreptococcus anaerobius', 'Fusobacterium nucleatum', 'Prevotella species']
    };
  }

  if (state.gramReaction === 'Yeast or fungal elements') {
    return {
      branch: 'Fungal or yeast workflow',
      nextStep: 'Move away from bacterial biochemical logic and use fungal/yeast identification methods appropriate to the source.',
      why: 'Yeast and fungal elements require different morphology, media, and reporting logic than bacterial unknowns.',
      watchOut: 'Sterile-site yeast should be escalated according to laboratory policy.',
      organisms: ['Candida albicans', 'Candida glabrata', 'Candida auris', 'Mold or fungal elements']
    };
  }

  return {
    branch: recommendations[0]?.heading ?? 'Build the next decision point',
    nextStep: 'Add Gram reaction, morphology, culture purity, and either catalase or oxidase.',
    why: 'The safest next step is usually the test that splits the largest likely organism group.',
    watchOut: 'If the pattern feels contradictory, verify purity and repeat the Gram stain from an isolated colony.',
    organisms: ['Not enough information yet']
  };
};

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
        'Mixed growth can create impossible reaction profiles and misleading automated identifications.'
      ]
    });
  }

  if (state.specimen === 'Sterile site' || state.specimen === 'Blood culture') {
    recommendations.push({
      heading: 'Clinical significance checkpoint',
      items: [
        'Treat sterile-site and blood culture isolates as higher priority until contamination is reasonably assessed.',
        'Correlate colony type with direct Gram stain, number of positive cultures, time to positivity, and patient context.'
      ]
    });
  }

  if (state.gramReaction === 'Gram positive' && state.morphology === 'Cocci') {
    if (state.catalase === 'Positive') {
      recommendations.push({
        heading: 'Likely Gram-positive cocci: catalase positive path',
        items: [
          'Think Staphylococcus, Micrococcus, or related catalase-positive cocci.',
          'Next useful branch: coagulase or latex testing for suspected S. aureus, plus colony morphology and hemolysis.'
        ]
      });
    } else if (state.catalase === 'Negative') {
      recommendations.push({
        heading: 'Likely Gram-positive cocci: catalase negative path',
        items: [
          'Think Streptococcus, Enterococcus, Aerococcus, or related organisms.',
          'Next useful branch: hemolysis pattern, PYR, bile esculin, salt tolerance, optochin, or CAMP depending on colony pattern.'
        ]
      });
    } else {
      recommendations.push({
        heading: 'First branch for Gram-positive cocci',
        items: [
          'Run catalase from a clean colony and avoid carrying over blood agar, which can cause false bubbling.',
          'Use arrangement as a clue: clusters push toward staphylococci, while chains or pairs push toward streptococci or enterococci.'
        ]
      });
    }
  }

  if (state.gramReaction === 'Gram positive' && state.morphology.includes('Rods')) {
    recommendations.push({
      heading: 'Likely Gram-positive rods path',
      items: [
        'Decide whether rods are spore-forming, branching, club-shaped, palisading, or anaerobic.',
        'Branching or beaded rods should prompt modified acid-fast thinking for Nocardia-like aerobic actinomycetes.'
      ]
    });
  }

  if (state.gramReaction === 'Gram negative' && (state.morphology === 'Rods' || state.morphology === 'Coccobacilli')) {
    if (state.oxidase === 'Negative' && (state.macConkey === 'Lactose fermenter' || state.macConkey === 'Non-lactose fermenter' || state.macConkey === 'Growth, unclear lactose')) {
      recommendations.push({
        heading: 'Likely Gram-negative rod: oxidase negative with MacConkey growth',
        items: [
          'Think Enterobacterales first, then use lactose reaction, indole, citrate, urease, motility, H2S, and decarboxylases.',
          'Non-lactose fermenters require careful attention to H2S, PAD, urease, motility, indole, and specimen context.'
        ]
      });
    } else if (state.oxidase === 'Positive') {
      recommendations.push({
        heading: 'Likely Gram-negative rod: oxidase positive path',
        items: [
          'Think Pseudomonas/Burkholderia-like nonfermenters, Vibrio/Aeromonas, Campylobacter-like curved rods, or fastidious organisms.',
          'Use MacConkey growth, OF glucose, pigment, odor, motility, growth temperature, and atmosphere needs to choose the next branch.'
        ]
      });
    } else if (state.macConkey === 'No growth') {
      recommendations.push({
        heading: 'Gram-negative rod with poor MacConkey growth',
        items: [
          'No MacConkey growth can point toward fastidious organisms, anaerobes, Campylobacter-like organisms, or non-enteric pathogens.',
          'Check chocolate agar, CO2 or microaerophilic growth, oxidase, Gram stain quality, and specimen type.'
        ]
      });
    } else {
      recommendations.push({
        heading: 'First branch for Gram-negative rods',
        items: [
          'Run oxidase and evaluate MacConkey growth before choosing a biochemical panel.',
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
        'Direct smear findings from genital or sterile-site specimens may be clinically urgent and should follow local reporting policy.'
      ]
    });
  }

  if (state.oxygen === 'Anaerobic only') {
    recommendations.push({
      heading: 'Anaerobe checkpoint',
      items: [
        'Use anaerobic workflow logic: oxygen tolerance, Gram morphology, spore status, special-potency disks, bile, indole, and colony fluorescence or pigment.',
        'Make sure the specimen source is appropriate for anaerobic culture: aspirate, tissue, abscess material, or deep wound.'
      ]
    });
  }

  if (state.rapidClue && state.rapidClue !== 'No clue yet') {
    recommendations.push({
      heading: 'Use the high-yield clue carefully',
      items: [
        `${state.rapidClue} can be a strong discriminator only when the organism group and test conditions are appropriate.`,
        'Use the clue to choose the next branch, not to override a conflicting Gram stain or colony pattern.'
      ]
    });
  }

  if (state.gramReaction === 'Yeast or fungal elements') {
    recommendations.push({
      heading: 'Outside bacterial roadmap scope',
      items: [
        'Yeast or fungal elements should move into fungal identification or yeast workup logic rather than bacterial biochemical pathways.',
        'Escalate sterile-site yeast according to laboratory reporting policy.'
      ]
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      heading: 'Build the next decision point',
      items: [
        'Add Gram reaction, morphology, culture purity, and either catalase or oxidase.',
        'If the pattern is discordant, verify purity and repeat the Gram stain from an isolated colony.'
      ]
    });
  }

  return recommendations;
};

const UnknownIsolateWorkup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentAuthRedirect = `${location.pathname}${location.search}`;
  const { user } = useAuth();
  const [workup, setWorkup] = useState<WorkupState>(initialState);
  const [hasReviewedPath, setHasReviewedPath] = useState(false);
  const [showSecondaryFields, setShowSecondaryFields] = useState(false);
  const [isGuestIsolateModalOpen, setIsGuestIsolateModalOpen] = useState(false);
  const resultRef = useRef<HTMLElement | null>(null);

  const recommendations = useMemo(() => buildRecommendations(workup), [workup]);
  const selectedObservations = useMemo(() => getSelectedObservations(workup), [workup]);
  const missingHighYieldFields = useMemo(() => getMissingHighYieldFields(workup), [workup]);
  const synthesis = useMemo(() => buildSynthesis(workup, recommendations), [workup, recommendations]);
  const completedCount = Object.values(workup).filter(Boolean).length;
  const neededObservationCount = Math.max(0, 3 - completedCount);
  const canBuildPath = completedCount >= 3;
  const buildPathButtonLabel = !canBuildPath
    ? `Choose ${neededObservationCount} more clue${neededObservationCount === 1 ? '' : 's'}`
    : hasReviewedPath
      ? 'Update workup path'
      : 'Build workup path';

  const updateField = (key: keyof WorkupState, value: string) => {
    setWorkup((current) => ({ ...current, [key]: current[key] === value ? '' : value }));
    setHasReviewedPath(false);
  };

  const resetWorkup = () => {
    setWorkup(initialState);
    setHasReviewedPath(false);
    setShowSecondaryFields(false);
  };

  const reviewSuggestedPath = () => {
    if (!canBuildPath) {
      return;
    }

    setHasReviewedPath(true);

    if (!user) {
      const countKey = 'learnmicrobes_unknown_isolate_guest_count';
      const newCount = parseInt(localStorage.getItem(countKey) ?? '0', 10) + 1;
      localStorage.setItem(countKey, String(newCount));
      if (newCount >= 3) {
        setIsGuestIsolateModalOpen(true);
      }
    }

    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const renderFieldGroup = (fields: typeof primaryFieldOptions) => (
    fields.map((field) => (
      <div className="unknown-field" key={field.key}>
        <h3>{field.label}</h3>
        <div className="unknown-chip-grid">
          {field.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`unknown-chip ${workup[field.key] === option ? 'selected' : ''}`}
              onClick={() => updateField(field.key, option)}
              aria-pressed={workup[field.key] === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    ))
  );

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
            <h2>Choose what you know. Review the next bench move.</h2>
            <p>
              Start with what is already available from the specimen, Gram stain, primary plates, and early bench tests. Then build a suggested workup path without treating it as a final organism ID.
            </p>
          </div>
        </section>

        <div className="unknown-layout">
          <main className="unknown-main">
            <section className="unknown-inputs" aria-label="Unknown isolate observations">
              <div className="unknown-input-note">
                <strong>Pick one clue per row.</strong>
                <span>Three observations are enough for an initial path; more clues make the guidance sharper.</span>
              </div>

              {renderFieldGroup(primaryFieldOptions)}

              <button
                type="button"
                className="unknown-secondary-toggle"
                onClick={() => setShowSecondaryFields((v) => !v)}
                aria-expanded={showSecondaryFields}
              >
                {showSecondaryFields ? 'Fewer clues −' : 'Add more clues +'}
              </button>

              {showSecondaryFields && (
                <div className="unknown-secondary-group">
                  {renderFieldGroup(secondaryFieldOptions)}
                </div>
              )}

              <div className="unknown-actions" aria-label="Unknown isolate workup actions">
                <button
                  className="unknown-review"
                  type="button"
                  onClick={reviewSuggestedPath}
                  disabled={!canBuildPath}
                >
                  {buildPathButtonLabel}
                </button>
                <button className="unknown-reset" type="button" onClick={resetWorkup}>
                  Reset workup
                </button>
              </div>
            </section>

            <section className="unknown-results" aria-label="Suggested workup path" ref={resultRef}>
              <div className="unknown-result-header">
                <div>
                  <span>Suggested workup path</span>
                  <h3>
                    {canBuildPath && hasReviewedPath ? 'Path ready' : 'Build the next decision point'}
                  </h3>
                </div>
                <strong>
                  {completedCount === 0 && 'Waiting for clues'}
                  {completedCount > 0 && !canBuildPath && `${neededObservationCount} more needed`}
                  {canBuildPath && !hasReviewedPath && 'Ready'}
                  {canBuildPath && hasReviewedPath && 'Built'}
                </strong>
              </div>

              {!canBuildPath ? (
                <div className="unknown-result-card unknown-missing-card">
                  <h3>Add a few high-yield clues to unlock a useful path</h3>
                  <p>
                    Start with context, purity, Gram reaction, and morphology. The tool works best when the first branch point is clear.
                  </p>
                  <div className="unknown-missing-list" aria-label="Suggested observations to add">
                    {missingHighYieldFields.map((field) => (
                      <span key={field}>{field}</span>
                    ))}
                  </div>
                </div>
              ) : !hasReviewedPath ? (
                <div className="unknown-result-card unknown-result-ready">
                  <h3>Initial path is ready</h3>
                  <p>
                    Your observation set is enough to build a bench plan. Use the primary action above to reveal the suggested branch, next move, and common traps.
                  </p>
                  <div className="unknown-observation-list" aria-label="Selected observations preview">
                    {selectedObservations.slice(0, 6).map((item) => (
                      <span key={`${item.label}-${item.value}`}>
                        <strong>{item.label}</strong>
                        {item.value}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="unknown-result-summary">
                    <div className="unknown-summary-primary">
                      <span className="unknown-path-kicker">Suggested branch</span>
                      <h3>{synthesis.branch}</h3>
                      <p>Based on {completedCount} observations, this is the safest workup direction to review first.</p>
                    </div>

                    <div className="unknown-summary-section unknown-next-move">
                      <span>Next bench move</span>
                      <p>{synthesis.nextStep}</p>
                    </div>

                    <div className="unknown-summary-grid">
                      <div className="unknown-summary-section">
                        <span>Why this fits</span>
                        <p>{synthesis.why}</p>
                      </div>
                      <div className="unknown-summary-section unknown-watchout">
                        <span>Watch-out</span>
                        <p>{synthesis.watchOut}</p>
                      </div>
                    </div>

                    <div className="unknown-summary-section unknown-organism-section">
                      <span>Organisms in play</span>
                      <div className="unknown-organism-list">
                        {synthesis.organisms.map((organism) => (
                          <b key={organism}>{organism}</b>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          </main>
        </div>
      </div>

      {isGuestIsolateModalOpen && !user && (
        <div className="unknown-guest-modal-backdrop" role="presentation" onClick={() => setIsGuestIsolateModalOpen(false)}>
          <section className="unknown-guest-modal" role="dialog" aria-modal="true" aria-labelledby="unknown-guest-modal-title" onClick={(e) => e.stopPropagation()}>
            <span className="unknown-guest-modal-kicker">
              <FontAwesomeIcon icon={faLock} />
              Guest tool checkpoint
            </span>
            <h2 id="unknown-guest-modal-title">Continue exploring with a free account.</h2>
            <p>
              You have built 3 workup paths as a guest. Sign in to keep going and save your workup history and progress.
            </p>
            <div className="unknown-guest-modal-actions">
              <button type="button" onClick={() => navigate(buildAuthRedirectPath('/login', currentAuthRedirect))}>
                Sign in
              </button>
              <button type="button" onClick={() => navigate(buildAuthRedirectPath('/register', currentAuthRedirect))}>
                Create account
              </button>
            </div>
            <button
              type="button"
              className="unknown-guest-modal-secondary"
              onClick={() => setIsGuestIsolateModalOpen(false)}
            >
              Keep using this tool
            </button>
          </section>
        </div>
      )}
    </ToolBox>
  );
};

export default UnknownIsolateWorkup;
