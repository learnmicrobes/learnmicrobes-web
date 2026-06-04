import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faFlask, faBookOpen, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { biochemicalTestsData } from '../../tools/BiochemicalTests/biochemicalData';
import { gramPositiveRoadmap } from '../../tools/GramPositiveRoadmap/data';
import { glossaryEntries, type GlossaryEntry } from '../../data/glossaryData';
import { learnTopics } from '../../data/learnTopics';
import { expandedLearnTopics } from '../../data/learnExpansionTopics';
import { getSearchAliases } from '../../data/searchAliases';
import { atlasPages } from '../VisualAtlas/VisualAtlas';
import ToolBox from '../ToolBox/ToolBox';
import AlphaValidationCTA from '../AlphaValidationCTA/AlphaValidationCTA';
import { trackEvent } from '../../utils/analytics';
import './GlobalSearch.css';

type SearchResult = {
  id: string;
  title: string;
  type: 'Test' | 'Guide' | 'Roadmap' | 'Tool' | 'Bench Term' | 'Learn' | 'Visual';
  snippet: string;
  path: string;
  keywords: string;
  priority: number;
  glossary?: GlossaryEntry;
};

const cleanSearchText = (value: string, maxLength = 210) => {
  const normalized = value.replace(/\u00e2\u20ac\u00a2/g, ';').replace(/\s+/g, ' ').trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength).trim()}...` : normalized;
};

const suggestedSearches = ['Gram stain', 'MacConkey', 'LAP', 'Pink ring', '42 degrees', 'Kovac', 'Durham', 'Black tube'];

const getDestinationLabel = (path: string) => {
  if (path.startsWith('/visuals')) return 'Visual Atlas';
  if (path.startsWith('/learn')) return 'Learn Basics';
  if (path.startsWith('/guides')) return 'Deep Guides';
  if (path === '/biochemical-tests') return 'Biochemical Tests';
  if (path === '/biochemical-calculator') return 'Enterics Calculator';
  if (path.includes('roadmap')) return 'Interactive Roadmap';
  if (path === '/study-quiz') return 'Study Quiz';
  if (path === '/special-pathogens') return 'Special Pathogens Hub';
  if (path === '/syndrome-diagnostic-path') return 'Syndrome Diagnostic Path';
  if (path === '/do-not-routine-culture') return 'Escalation Guide';
  return 'Learn Microbes';
};

const getResultActionLabel = (type: SearchResult['type']) => {
  switch (type) {
    case 'Bench Term':
      return 'Read quick answer';
    case 'Test':
      return 'Open test reference';
    case 'Guide':
      return 'Open guide';
    case 'Learn':
      return 'Read basics page';
    case 'Visual':
      return 'Open visual guide';
    case 'Roadmap':
      return 'Open roadmap';
    case 'Tool':
      return 'Open tool';
    default:
      return 'Open result';
  }
};

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTrackedQueryRef = useRef('');

  const searchIndex = useMemo<SearchResult[]>(() => {
    const glossary: SearchResult[] = glossaryEntries.map((entry) => ({
      id: `glossary-${entry.id}`,
      title: entry.term,
      type: 'Bench Term',
      snippet: entry.definition,
      path: entry.relatedLinks[0]?.path ?? '/search',
      keywords: [
        entry.term,
        ...entry.aliases,
        entry.category,
        entry.definition,
        ...entry.details,
        entry.benchContext,
        entry.studentTip,
        ...entry.relatedLinks.map((link) => link.label)
      ].join(' ').toLowerCase(),
      priority: 9,
      glossary: entry
    }));

    const tests: SearchResult[] = biochemicalTestsData.map((test) => ({
      id: `test-${test.id}`,
      title: test.name,
      type: 'Test',
      snippet: test.principle,
      path: '/biochemical-tests',
      keywords: [
        test.name,
        test.category,
        test.principle,
        test.reagents,
        test.procedure,
        test.qcPositive,
        test.qcNegative,
        test.expectedResults,
        ...getSearchAliases(test.id, test.name)
      ].join(' ').toLowerCase(),
      priority: 4
    }));

    const allLearnTopics = [...learnTopics, ...expandedLearnTopics].filter(
      (topic, index, topics) => topics.findIndex((candidate) => candidate.slug === topic.slug) === index
    );

    const learnBasics: SearchResult[] = allLearnTopics.map((topic) => ({
      id: `learn-${topic.slug}`,
      title: topic.title,
      type: 'Learn',
      snippet: topic.summary,
      path: `/learn/${topic.slug}`,
      keywords: [
        topic.title,
        topic.category,
        topic.summary,
        topic.whyItMatters,
        topic.principle,
        topic.studentShortcut,
        ...topic.basicSteps,
        ...topic.interpretation,
        ...topic.commonMistakes,
        ...(topic.tables ?? []).flatMap((table) => [
          table.title,
          ...table.columns,
          ...table.rows.flat()
        ]),
        ...topic.keywords,
        ...getSearchAliases(topic.slug, topic.title)
      ].join(' ').toLowerCase(),
      priority: 5
    }));

    const visuals: SearchResult[] = atlasPages.map((page) => ({
      id: `visual-${page.slug}`,
      title: page.title,
      type: 'Visual',
      snippet: page.summary,
      path: `/visuals/${page.slug}`,
      keywords: [
        page.title,
        page.eyebrow,
        page.summary,
        page.boardTitle,
        page.boardNote,
        page.readoutTitle,
        page.trapTitle,
        page.trapBody,
        page.interpretationTitle,
        page.remember,
        page.visualType,
        ...(page.tubes ?? []).flatMap((tube) => [tube.label, tube.name, tube.note]),
        ...page.readoutRows.flat(),
        ...page.trapBullets,
        ...page.interpretationRows.flat(),
        ...page.takeaways,
        ...getSearchAliases(page.slug, page.title)
      ].join(' ').toLowerCase(),
      priority: 6
    }));

    const guides: SearchResult[] = [
      {
        id: 'g1',
        title: 'Intro to Clinical Microbiology for New Learners',
        type: 'Guide',
        snippet: 'A start-here module covering bench mindset, core concepts, and how to approach organism workups.',
        path: '/guides?guide=intro-to-microbiology',
        keywords: 'intro to microbiology start here new learner student medical technologist beginner basics bench mindset gram stain media workup',
        priority: 4
      },
      {
        id: 'g2',
        title: 'Microbial Taxonomy and Identification',
        type: 'Guide',
        snippet: 'Classification, species and genus, phenotype, nomenclature, and how taxonomy supports identification.',
        path: '/guides?guide=microbial-taxonomy',
        keywords: 'microbial taxonomy taxonomy identification species genus nomenclature phenotype genotype classification naming binomial',
        priority: 4
      },
      {
        id: 'g3',
        title: 'Bacterial Cell Structure and Why It Matters',
        type: 'Guide',
        snippet: 'Cell wall, peptidoglycan, Gram-positive and Gram-negative envelopes, capsules, pili, flagella, and spores.',
        path: '/guides?guide=bacterial-cell-structure',
        keywords: 'bacterial cell structure peptidoglycan cell wall gram positive gram negative outer membrane capsule pili fimbriae flagella spores endotoxin',
        priority: 4
      },
      {
        id: 'g4',
        title: 'How Microorganisms Interact With the Host',
        type: 'Guide',
        snippet: 'Normal microbiota, host defenses, inflammation, adaptive immunity, and outcomes of microbial exposure.',
        path: '/guides?guide=host-microorganism-interactions',
        keywords: 'host microorganism interactions normal microbiota colonization opportunistic infection innate immunity adaptive immunity inflammation phagocytosis virulence',
        priority: 4
      },
      {
        id: 'g5',
        title: 'Laboratory Safety Basics',
        type: 'Guide',
        snippet: 'Standard precautions, engineering controls, PPE, disinfection, waste handling, and exposure response.',
        path: '/guides?guide=laboratory-safety-basics',
        keywords: 'laboratory safety standard precautions ppe engineering controls biologic safety cabinet sharps disinfectant waste exposure spill fire safety electrical safety',
        priority: 4
      },
      {
        id: 'g6',
        title: 'Microscopy and Staining Basics',
        type: 'Guide',
        snippet: 'Direct smears, microscopy methods, Gram stain basics, acid-fast methods, and common staining pitfalls.',
        path: '/guides?guide=gram-stain',
        keywords: 'microscopy staining basics direct smear bright field gram stain crystal violet iodine decolorizer safranin acid-fast fluorescence smear thickness gram variable',
        priority: 3
      },
      {
        id: 'g7',
        title: 'Traditional Cultivation and Identification Basics',
        type: 'Guide',
        snippet: 'Pure culture, isolation streaking, colony morphology, phenotypic testing, and traditional bench ID logic.',
        path: '/guides?guide=traditional-cultivation-identification',
        keywords: 'traditional cultivation identification pure culture isolation streak colony morphology biochemical phenotypic testing broth solid semisolid agar incubation primary culture',
        priority: 3
      },
      {
        id: 'g8',
        title: 'Nucleic Acid-Based Analysis for Microbial Identification and Characterization',
        type: 'Guide',
        snippet: 'Molecular testing workflow, extraction, amplification, probes, PCR interpretation, controls, and contamination prevention.',
        path: '/guides?guide=nucleic-acid-analysis',
        keywords: 'nucleic acid molecular testing pcr real-time pcr probes hybridization sequencing dna rna extraction amplification controls inhibition contamination resistance genes',
        priority: 3
      },
      {
        id: 'g9',
        title: 'Immunochemical Methods Used for Organism Detection',
        type: 'Guide',
        snippet: 'Antigen-antibody detection, agglutination, immunofluorescence, enzyme immunoassays, rapid devices, and assay limits.',
        path: '/guides?guide=immunochemical-detection',
        keywords: 'immunochemical organism detection antigen antibody agglutination latex immunofluorescence eia elisa lateral flow immunochromatographic monoclonal polyclonal',
        priority: 3
      },
      {
        id: 'g10',
        title: 'Serologic Diagnosis of Infectious Diseases',
        type: 'Guide',
        snippet: 'IgM, IgG, titers, seroconversion, paired sera, antibody timing, cross-reactivity, and serology interpretation.',
        path: '/guides?guide=serologic-diagnosis',
        keywords: 'serology serologic diagnosis infectious diseases igm igg antibody titer seroconversion fourfold rise paired sera acute convalescent cross reactivity',
        priority: 3
      },
      {
        id: 'g11',
        title: 'Principles of Antimicrobial Action and Resistance',
        type: 'Guide',
        snippet: 'Drug targets, selective toxicity, resistance mechanisms, beta-lactamases, altered targets, efflux, and permeability changes.',
        path: '/guides?guide=antimicrobial-action-resistance',
        keywords: 'antimicrobial action resistance selective toxicity bactericidal bacteriostatic beta lactam beta lactamase mecA vanA vanB efflux porin resistance mechanisms',
        priority: 3
      },
      {
        id: 'g12',
        title: 'Laboratory Methods and Strategies for Antimicrobial Susceptibility Testing',
        type: 'Guide',
        snippet: 'MICs, breakpoints, dilution testing, disk diffusion, gradient methods, automated AST, QC, and resistance detection.',
        path: '/guides?guide=antimicrobial-susceptibility-testing',
        keywords: 'antimicrobial susceptibility testing ast mic breakpoint disk diffusion kirby bauer broth dilution agar dilution gradient diffusion epsilometer automated ast qc esbl carbapenemase mrsa vre',
        priority: 3
      },
      {
        id: 'g13',
        title: 'Overview of Bacterial Identification Methods and Strategies',
        type: 'Guide',
        snippet: 'Specimen context, purity, colony morphology, branch-point tests, commercial systems, and escalation strategy for bacterial ID.',
        path: '/guides?guide=bacterial-identification-strategy',
        keywords: 'bacteriology bacterial identification strategy principles of identification colony morphology pure culture gram stain catalase oxidase biochemical tests commercial automated systems',
        priority: 3
      },
      {
        id: 'g14',
        title: 'Staphylococcus, Micrococcus, and Similar Organisms',
        type: 'Guide',
        snippet: 'Catalase-positive Gram-positive cocci, coagulase, DNase, novobiocin, Micrococcus separation, CoNS significance, and MRSA concepts.',
        path: '/guides?guide=staphylococcus-micrococcus',
        keywords: 'staphylococcus micrococcus catalase positive gram positive cocci coagulase staphylococcus aureus coagulase negative staph cons novobiocin saprophyticus epidermidis microdase furazolidone lysostaphin dnase mrsa',
        priority: 3
      },
      {
        id: 'g15',
        title: 'Streptococcus, Enterococcus, and Similar Organisms',
        type: 'Guide',
        snippet: 'Catalase-negative Gram-positive cocci, hemolysis, Lancefield grouping, PYR, CAMP, optochin, bile esculin, salt tolerance, and similar genera.',
        path: '/guides?guide=streptococcus-enterococcus',
        keywords: 'streptococcus enterococcus catalase negative gram positive cocci hemolysis lancefield pyr camp hippurate optochin bile solubility bile esculin salt tolerance viridans pneumoniae pyogenes agalactiae faecalis faecium abiotrophia granulicatella satellitism',
        priority: 3
      },
      {
        id: 'g16',
        title: 'Bacillus and Similar Organisms',
        type: 'Guide',
        snippet: 'Aerobic spore-forming Gram-positive rods, Bacillus anthracis safety clues, B. cereus group reactions, lecithinase, motility, and colony morphology.',
        path: '/guides?guide=bacillus-similar-organisms',
        keywords: 'bacillus similar organisms gram positive rods aerobic spore forming bacilli anthracis cereus mycoides subtilis licheniformis pumilus paenibacillus brevibacillus lecithinase egg yolk myp motility hemolysis medusa head anthrax',
        priority: 3
      },
      {
        id: 'g17',
        title: 'Listeria, Corynebacterium, and Similar Organisms',
        type: 'Guide',
        snippet: 'Non-spore-forming catalase-positive Gram-positive rods, Listeria motility, Corynebacterium toxin-aware workup, Tinsdale, urease, nitrate, and lipophilism.',
        path: '/guides?guide=listeria-corynebacterium',
        keywords: 'listeria corynebacterium similar organisms gram positive rods catalase positive non spore forming diphtheria diphtheriae ulcerans pseudotuberculosis jeikeium urealyticum rhodococcus tumbling motility umbrella motility camp reverse camp tinsdale tellurite elek toxin urease nitrate lipophilic',
        priority: 3
      },
      {
        id: 'g18',
        title: 'Erysipelothrix, Lactobacillus, and Similar Organisms',
        type: 'Guide',
        snippet: 'Catalase-negative non-spore-forming Gram-positive rods, Erysipelothrix H2S, gelatin brush growth, Lactobacillus-like vancomycin resistance, Arcanobacterium, and Gardnerella.',
        path: '/guides?guide=erysipelothrix-lactobacillus',
        keywords: 'erysipelothrix lactobacillus similar organisms gram positive rods catalase negative non spore forming rhusiopathiae h2s tsi gelatin test tube brush vancomycin resistant weissella leuconostoc pediococcus arcanobacterium gardnerella clue cells whiff bacterial vaginosis',
        priority: 3
      },
      {
        id: 'g19',
        title: 'Nocardia, Streptomyces, Rhodococcus, and Similar Organisms',
        type: 'Guide',
        snippet: 'Branching or partially acid-fast Gram-positive bacilli, Nocardia workup, Rhodococcus, Gordonia, Tsukamurella, Streptomyces, Actinomadura, lysozyme, and substrate hydrolysis.',
        path: '/guides?guide=nocardia-streptomyces-rhodococcus',
        keywords: 'nocardia streptomyces rhodococcus gordonia tsukamurella actinomadura aerobic actinomycetes branching gram positive bacilli partially acid fast modified acid fast lysozyme casein xanthine tyrosine arylsulfatase mycetoma pulmonary brain abscess',
        priority: 3
      },
      {
        id: 'g20',
        title: 'Enterobacteriaceae',
        type: 'Guide',
        snippet: 'Oxidase-negative Gram-negative rods, MacConkey lactose reaction, IMViC, H2S, urease, PAD, decarboxylases, Salmonella, Shigella, Proteeae, Yersinia, and selective stool media.',
        path: '/guides?guide=enterobacteriaceae',
        keywords: 'enterobacteriaceae enterobacterales enterics gram negative rods oxidase negative macconkey lactose fermenter non lactose fermenter imvic h2s urease pad phenylalanine deaminase lysine ornithine decarboxylase salmonella shigella escherichia coli klebsiella enterobacter citrobacter proteus morganella providencia yersinia serratia cronobacter pantoea hafnia smac xld hektoen cin',
        priority: 3
      },
      {
        id: 'g21',
        title: 'Acinetobacter, Stenotrophomonas, and Similar Organisms',
        type: 'Guide',
        snippet: 'Oxidase-negative nonfermentative Gram-negative coccobacilli and rods, Acinetobacter baumannii complex, Stenotrophomonas maltophilia, OF glucose, maltose oxidation, DNase, LDC, and resistance patterns.',
        path: '/guides?guide=acinetobacter-stenotrophomonas',
        keywords: 'acinetobacter stenotrophomonas baumannii maltophilia oxidase negative nonfermenter gram negative coccobacilli rods macconkey of glucose maltose oxidation dnase lysine decarboxylase ldc sxt trimethoprim sulfamethoxazole carbapenem resistance multidrug resistant icu ventilator pneumonia catheter',
        priority: 3
      },
      {
        id: 'g22',
        title: 'Pseudomonas, Burkholderia, and Similar Organisms',
        type: 'Guide',
        snippet: 'Oxidase-positive nonfermenters, Pseudomonas aeruginosa, fluorescent pseudomonads, Burkholderia cepacia complex, B. pseudomallei, Ralstonia, Brevundimonas, Acidovorax, and Pandoraea.',
        path: '/guides?guide=pseudomonas-burkholderia',
        keywords: 'pseudomonas burkholderia ralstonia brevundimonas acidovorax pandoraea oxidase positive nonfermenter gram negative rods aeruginosa fluorescens putida stutzeri mendocina cepacia pseudomallei mallei pyocyanin pyoverdin cetrimide acetamide growth 42 ashdown agar ofpbl colistin polymyxin cystic fibrosis melioidosis glanders',
        priority: 3
      },
      {
        id: 'g23',
        title: 'Rhizobium, Ochrobactrum, and Similar Organisms',
        type: 'Guide',
        snippet: 'Environmental oxidase-positive nonfermenters, Rhizobium radiobacter, Ochrobactrum anthropi, Shewanella, Paracoccus, Psychrobacter, EF-4b, device and bite-wound context.',
        path: '/guides?guide=rhizobium-ochrobactrum',
        keywords: 'rhizobium ochrobactrum shewanella paracoccus psychrobacter ef-4b environmental oxidase positive nonfermenter gram negative rods coccobacilli radiobacter anthropi onpg esculin urease h2s tsi catheter silicone device bite wound popcorn odor',
        priority: 3
      },
      {
        id: 'g24',
        title: 'Chryseobacterium, Sphingobacterium, and Similar Organisms',
        type: 'Guide',
        snippet: 'Yellow-pigmented oxidase-positive nonfermenters, Elizabethkingia, Chryseobacterium, Myroides, Sphingobacterium, Weeksella, indole, urease, flexirubin, and resistance patterns.',
        path: '/guides?guide=chryseobacterium-sphingobacterium',
        keywords: 'chryseobacterium sphingobacterium elizabethkingia myroides weeksella yellow pigmented oxidase positive nonfermenter gram negative rods indole urease gelatin dnase esculin flexirubin koh neonatal meningitis',
        priority: 3
      },
      {
        id: 'g25',
        title: 'Alcaligenes, Bordetella (Non-pertussis), Comamonas, and Similar Organisms',
        type: 'Guide',
        snippet: 'Oxidase-positive nonfermenters, Alcaligenes, Achromobacter, Bordetella bronchiseptica, Delftia, Comamonas, Oligella, motility, urease, nitrate, and nitrite.',
        path: '/guides?guide=alcaligenes-bordetella-comamonas',
        keywords: 'alcaligenes achromobacter bordetella non pertussis bronchiseptica comamonas delftia oligella oxidase positive nonfermenter gram negative rods peritrichous polar flagella rapid urease nitrate nitrite cystic fibrosis animal exposure',
        priority: 3
      },
      {
        id: 'g26',
        title: 'Vibrio, Aeromonas, Chromobacterium, and Related Organisms',
        type: 'Guide',
        snippet: 'Oxidase-positive fermenters, Vibrio, Aeromonas, Plesiomonas, Chromobacterium, TCBS, O/129, salt requirement, DNase, decarboxylases, and water or seafood exposure.',
        path: '/guides?guide=vibrio-aeromonas-chromobacterium',
        keywords: 'vibrio aeromonas chromobacterium plesiomonas related organisms oxidase positive fermenter gram negative rods tcbs o129 salt requirement halophilic cholerae vulnificus parahaemolyticus hydrophila violaceum violacein seafood freshwater wound oysters',
        priority: 3
      },
      {
        id: 'g27',
        title: 'Sphingomonas paucimobilis and Similar Organisms',
        type: 'Guide',
        snippet: 'Sphingomonas, Sphingobacterium, Acidovorax-like oxidase-positive nonfermenters, yellow pigment, polymyxin B, DNase, urease, citrate, motility, and lead acetate H2S.',
        path: '/guides?guide=sphingomonas-paucimobilis',
        keywords: 'sphingomonas paucimobilis parapaucimobilis sphingobacterium multivorum spiritivorum mizutaii acidovorax facilis oxidase positive nonfermenter yellow pigment polymyxin b dnase urease citrate esculin h2s lead acetate macconkey',
        priority: 3
      },
      {
        id: 'g28',
        title: 'Moraxella and Related Organisms',
        type: 'Guide',
        snippet: 'Moraxella, elongated Neisseria, butyrate, penicillin disk elongation, MacConkey growth, nitrate, nitrite, acetate, DNase, Loeffler digestion, respiratory and bite-wound context.',
        path: '/guides?guide=moraxella-related-organisms',
        keywords: 'moraxella catarrhalis canis lacunata nonliquefaciens osloensis atlantae lincolnii neisseria elongata weaverii oxidase catalase butyrate penicillin disk elongation acetate nitrate nitrite dnase loeffler serum digestion pitting dog bite conjunctivitis',
        priority: 3
      },
      {
        id: 'g29',
        title: 'Eikenella and Similar Organisms',
        type: 'Guide',
        snippet: 'Eikenella corrodens, Methylobacterium, Weeksella, Bergeyella, agar pitting, bleach odor, pink pigment, indole, urease, hemin or CO2 growth, oral and bite-wound context.',
        path: '/guides?guide=eikenella-similar-organisms',
        keywords: 'eikenella corrodens methylobacterium weeksella virosa bergeyella zoohelcum hacek human bite clenched fist agar pitting corrosion bleach odor hemin co2 indole urease nitrate pink pigment oral flora endocarditis',
        priority: 3
      },
      {
        id: 'g30',
        title: 'Pasteurella and Similar Organisms',
        type: 'Guide',
        snippet: 'Pasteurella species, Suttonella, dog and cat bites, oxidase, catalase, indole, urease, ODC, MacConkey behavior, penicillin susceptibility, and animal exposure.',
        path: '/guides?guide=pasteurella-similar-organisms',
        keywords: 'pasteurella multocida canis dagmatis stomatis bettyae pneumotropica aerogenes suttonella indologenes dog bite cat bite animal bite oxidase catalase indole urease ornithine decarboxylase odc penicillin susceptible macconkey coccobacilli',
        priority: 3
      },
      {
        id: 'g31',
        title: 'Actinobacillus, Aggregatibacter, Kingella, Cardiobacterium, Capnocytophaga, and Similar Organisms',
        type: 'Guide',
        snippet: 'HACEK and related capnophilic oral Gram-negative rods, Aggregatibacter, Cardiobacterium, Kingella, Capnocytophaga, star colonies, rosettes, gliding motility, X/V factors, and endocarditis.',
        path: '/guides?guide=actinobacillus-aggregatibacter-kingella',
        keywords: 'actinobacillus aggregatibacter actinomycetemcomitans aphrophilus segnis kingella kingae cardiobacterium hominis capnocytophaga canimorsus cynodegmi hacek oral flora endocarditis periodontitis pediatric osteomyelitis septic arthritis gliding motility x v factor sps inhibition rosette star colony dog bite',
        priority: 3
      },
      {
        id: 'g32',
        title: 'Haemophilus',
        type: 'Guide',
        snippet: 'Haemophilus species, X and V factor requirements, porphyrin/ALA, satellitism, chocolate agar, hemolysis, biotypes, H. influenzae, H. parainfluenzae, H. aegyptius, H. haemolyticus, and H. ducreyi.',
        path: '/guides?guide=haemophilus',
        keywords: 'haemophilus haemophilus influenzae aegyptius haemolyticus parainfluenzae parahaemolyticus pittmaniae ducreyi x factor v factor xv porphyrin ala satellitism chocolate agar sheep blood horse rabbit hemolysis hib nontypeable biotype indole urease ornithine decarboxylase odc onpg chancroid conjunctivitis brazilian purpuric fever',
        priority: 3
      },
      {
        id: 'g33',
        title: 'Bartonella and Afipia',
        type: 'Guide',
        snippet: 'Bartonella, Afipia, cat scratch disease, bacillary angiomatosis, trench fever, slow growth, chocolate or CYE media, Warthin-Starry, vector and cat exposure.',
        path: '/guides?guide=bartonella-afipia',
        keywords: 'bartonella afipia henselae quintana bacilliformis felis broomeae cat scratch disease bacillary angiomatosis peliosis hepatis trench fever oroya fever verruga peruana louse sandfly slow growth chocolate cye warthin starry culture negative endocarditis',
        priority: 3
      },
      {
        id: 'g34',
        title: 'Campylobacter, Arcobacter, and Helicobacter',
        type: 'Guide',
        snippet: 'Curved and spiral Gram-negative rods, Campylobacter jejuni, C. coli, C. fetus, Arcobacter, Helicobacter pylori, microaerophilic growth, 42 C, hippurate, indoxyl acetate, and rapid urease.',
        path: '/guides?guide=campylobacter-arcobacter-helicobacter',
        keywords: 'campylobacter arcobacter helicobacter jejuni coli fetus lari upsaliensis butzleri cryaerophilus pylori curved rods seagull gull wing microaerophilic 42 c hippurate indoxyl acetate nalidixic acid cephalothin rapid urease gastritis peptic ulcer gastroenteritis',
        priority: 3
      },
      {
        id: 'g35',
        title: 'Legionella',
        type: 'Guide',
        snippet: 'Legionella pneumophila, BCYE agar, L-cysteine and iron requirement, water exposure, Legionnaires disease, Pontiac fever, urinary antigen, fluorescence, and weak acid-fast tissue clues.',
        path: '/guides?guide=legionella',
        keywords: 'legionella pneumophila micdadei bozemanii dumoffii anisa bcye buffered charcoal yeast extract cysteine iron water cooling tower legionnaires disease pontiac fever urinary antigen dfa hippurate gelatinase fluorescence weak acid fast',
        priority: 3
      },
      {
        id: 'g36',
        title: 'Brucella',
        type: 'Guide',
        snippet: 'Brucella abortus, melitensis, suis, canis, undulant fever, animal reservoirs, unpasteurized dairy, rapid urease, H2S, CO2 requirement, dye inhibition, and biosafety escalation.',
        path: '/guides?guide=brucella',
        keywords: 'brucella abortus melitensis suis canis undulant fever cattle sheep goats swine dogs unpasteurized dairy zoonotic rapid urease h2s co2 thionine basic fuchsin select agent bsl3 laboratory acquired infection',
        priority: 3
      },
      {
        id: 'g37',
        title: 'Bordetella pertussis, Bordetella parapertussis, and Related Species',
        type: 'Guide',
        snippet: 'B. pertussis, B. parapertussis, B. bronchiseptica, whooping cough, Regan-Lowe, Bordet-Gengou, mercury-drop colonies, oxidase, urease speed, motility, and nitrate.',
        path: '/guides?guide=bordetella-pertussis-parapertussis',
        keywords: 'bordetella pertussis parapertussis bronchiseptica whooping cough pertussis regan lowe bordet gengou charcoal horse blood mercury drop pearl colonies nasopharyngeal swab oxidase urease motility nitrate kennel cough',
        priority: 3
      },
      {
        id: 'g38',
        title: 'Francisella',
        type: 'Guide',
        snippet: 'Francisella tularensis, F. philomiragia, tularemia, cysteine requirement, tiny coccobacilli, oxidase, weak catalase, gelatinase, near-drowning, rabbit/tick exposure, and safety escalation.',
        path: '/guides?guide=francisella',
        keywords: 'francisella tularensis holarctica philomiragia tularemia rabbit fever tick deer fly cysteine requirement cystine heart agar bcye oxidase weak catalase gelatinase near drowning select agent bsl3 tiny coccobacilli',
        priority: 3
      },
      {
        id: 'g39',
        title: 'Streptobacillus moniliformis and Spirillum minus',
        type: 'Guide',
        snippet: 'Rat-bite fever, Streptobacillus moniliformis, Spirillum minus, SPS inhibition, pleomorphic chains, fried-egg colonies, sodoku, direct visualization, and rat exposure.',
        path: '/guides?guide=streptobacillus-spirillum',
        keywords: 'streptobacillus moniliformis spirillum minus rat bite fever sodoku haverhill fever sps inhibition sodium polyanethole sulfonate pleomorphic chains bulbar swellings fried egg colonies fluff balls direct visualization giemsa wright rat exposure',
        priority: 3
      },
      {
        id: 'g40',
        title: 'Neisseria and Moraxella catarrhalis',
        type: 'Guide',
        snippet: 'Gram-negative cocci and diplococci, Neisseria gonorrhoeae, N. meningitidis, commensal Neisseria, Moraxella catarrhalis, oxidase, CTA sugars, ONPG, butyrate, DNase, selective media, and smear urgency.',
        path: '/guides?guide=neisseria-moraxella-catarrhalis',
        keywords: 'neisseria moraxella catarrhalis gonorrhoeae meningitidis lactamica sicca mucosa subflava flavescens cinerea polysaccharea gram negative cocci diplococci oxidase superoxol cta carbohydrate glucose maltose lactose sucrose onpg butyrate dnase thayer martin martin lewis nyc jembec gonorrhea meningitis meningococcemia otitis copd',
        priority: 3
      },
      {
        id: 'g41',
        title: 'Anaerobic Bacteriology: Laboratory Considerations',
        type: 'Guide',
        snippet: 'Anaerobic specimen collection, transport, direct Gram stain, reduced media, anaerobic jars/chambers, aerotolerance, selective media, and first-pass anaerobe workflow.',
        path: '/guides?guide=anaerobic-bacteriology-lab-considerations',
        keywords: 'anaerobic bacteriology laboratory considerations anaerobe specimen collection transport anaerobic transport pras reduced media anaerobic jar chamber gaspak oxygen indicator resazurin methylene blue aerotolerance direct gram stain anaerobic blood agar bbe lkv special potency disks',
        priority: 3
      },
      {
        id: 'g42',
        title: 'Overview of Anaerobic Organisms',
        type: 'Guide',
        snippet: 'Anaerobic organism groups, Bacteroides, Prevotella, Porphyromonas, Fusobacterium, Bilophila, Clostridium, anaerobic cocci, spores, bile, BBE, LKV, pigment, and fluorescence.',
        path: '/guides?guide=overview-anaerobic-organisms',
        keywords: 'overview anaerobic organisms anaerobes bacteroides fragilis prevotella porphyromonas fusobacterium bilophila clostridium cutibacterium actinomyces peptostreptococcus anaerobic cocci gram negative rods gram positive rods spores bile bbe lkv pigment fluorescence',
        priority: 3
      },
      {
        id: 'g43',
        title: 'Mycobacteria',
        type: 'Guide',
        snippet: 'Mycobacterium tuberculosis complex, nontuberculous mycobacteria, AFB stains, NALC-NaOH processing, LJ, Middlebrook, MGIT, NAAT, Runyon groups, pigment, and rapid growers.',
        path: '/guides?guide=mycobacteria',
        keywords: 'mycobacteria mycobacterium tuberculosis complex mtb mtbc nontuberculous mycobacteria ntm acid fast afb auramine rhodamine kinyoun ziehl neelsen nalc naoh lowenstein jensen middlebrook 7h10 7h11 mgit bactec mpt64 runyon photochromogen scotochromogen nonchromogen rapid grower mac avium intracellulare kansasii marinum abscessus chelonae fortuitum gordonae scrofulaceum xenopi ulcerans haemophilum niacin nitrate catalase tween tellurite arylsulfatase pnb tch',
        priority: 3
      },
      {
        id: 'g44',
        title: 'Obligate Intracellular and Nonculturable Bacterial Agents',
        type: 'Guide',
        snippet: 'Chlamydia, Rickettsia, Orientia, Ehrlichia, Anaplasma, Coxiella, Tropheryma whipplei, Klebsiella granulomatis, NAAT, serology, morulae, phase antibodies, and tissue diagnosis.',
        path: '/guides?guide=obligate-intracellular-nonculturable-agents',
        keywords: 'obligate intracellular nonculturable bacterial agents chlamydia trachomatis pneumoniae psittaci rickettsia rickettsii typhi prowazekii orientia tsutsugamushi ehrlichia chaffeensis ewingii anaplasma phagocytophilum coxiella burnetii q fever tropheryma whipplei whipple klebsiella granulomatis donovanosis donovan bodies naat pcr ifa serology paired sera fourfold rise morulae phase i phase ii',
        priority: 3
      },
      {
        id: 'g45',
        title: 'Cell Wall-Deficient Bacteria: Mycoplasma and Ureaplasma',
        type: 'Guide',
        snippet: 'Mycoplasma pneumoniae, M. genitalium, M. hominis, Ureaplasma, no peptidoglycan cell wall, specialized media, fried-egg colonies, A7/A8 agar, NAAT, serology, and intrinsic beta-lactam resistance.',
        path: '/guides?guide=mycoplasma-ureaplasma',
        keywords: 'mycoplasma ureaplasma cell wall deficient bacteria no peptidoglycan sterols pleomorphic gram stain negative routine culture mycoplasma pneumoniae atypical pneumonia cold agglutinins mycoplasma genitalium urethritis cervicitis pid mycoplasma hominis postpartum fever ureaplasma urealyticum parvum urea urease arginine glucose ppplo pplo sp4 a7 a8 fried egg colonies mulberry colonies naat serology macrolide tetracycline fluoroquinolone beta lactam resistant',
        priority: 3
      },
      {
        id: 'g46',
        title: 'The Spirochetes',
        type: 'Guide',
        snippet: 'Treponema, Borrelia, Leptospira, syphilis serology, darkfield microscopy, Lyme two-tier testing, relapsing fever smears, Leptospira MAT, PCR, and specialized culture.',
        path: '/guides?guide=spirochetes',
        keywords: 'spirochetes treponema pallidum syphilis chancre rash neurosyphilis congenital syphilis rpr vdrl tppa tp pa fta abs eia cia darkfield microscopy dfa borrelia burgdorferi lyme disease erythema migrans ixodes tick two tier serology immunoblot modified two tier relapsing fever borrelia recurrentis hermsii blood smear leptospira leptospirosis weil disease animal urine freshwater mat microscopic agglutination test emjh fletcher culture',
        priority: 3
      },
      {
        id: 'g47',
        title: 'Laboratory Methods for Diagnosis of Parasitic Infections: Overview',
        type: 'Guide',
        snippet: 'Parasitology diagnostic strategy for stool O&P, blood parasites, concentration methods, permanent stains, antigen tests, serology, molecular testing, specimen handling, and reporting discipline.',
        path: '/guides?guide=parasitology-lab-methods-overview',
        keywords: 'parasitology parasite parasitic infections laboratory methods diagnosis stool ova and parasite o&p op exam stool concentration formalin ethyl acetate flotation sedimentation permanent stain trichrome iron hematoxylin modified acid fast coccidia microsporidia wet mount trophozoite cyst oocyst egg ovum larva larvae adult worm proglottid helminth protozoa blood parasites thick film thin film malaria plasmodium babesia trypanosoma leishmania microfilariae antigen test serology molecular naat tissue biopsy urine sputum arthropod',
        priority: 3
      },
      {
        id: 'g48',
        title: 'Intestinal Protozoa',
        type: 'Guide',
        snippet: 'Amoebae, Giardia, Dientamoeba, Blastocystis, Balantidium, Cryptosporidium, Cyclospora, Cystoisospora, microsporidia, stool O&P morphology, special stains, antigen tests, and molecular detection.',
        path: '/guides?guide=intestinal-protozoa',
        keywords: 'intestinal protozoa parasite parasitology amoebae ameba entamoeba histolytica dispar moshkovskii hartmanni coli polecki gingivalis endolimax nana iodamoeba butschlii giardia duodenalis lamblia intestinalis dientamoeba fragilis chilomastix mesnili pentatrichomonas hominis trichomonas hominis balantidium coli blastocystis cryptosporidium parvum hominis cyclospora cayetanensis cystoisospora belli isospora microsporidia enterocytozoon bieneusi encephalitozoon stool ova and parasite o&p wet mount trophozoite cyst oocyst spore modified acid fast trichrome permanent stain antigen naat molecular diarrhea dysentery malabsorption',
        priority: 3
      },
      {
        id: 'g49',
        title: 'Blood and Tissue Protozoa',
        type: 'Guide',
        snippet: 'Blood-film and tissue-protozoa workups for Plasmodium, Babesia, Trypanosoma, Leishmania, Toxoplasma, free-living amoebae, thick and thin films, serology, and molecular testing.',
        path: '/guides?guide=blood-and-tissue-protozoa',
        keywords: 'blood and tissue protozoa parasite parasitology blood parasites plasmodium malaria falciparum vivax ovale malariae knowlesi thick film thin film parasitemia ring forms gametocytes schizonts babesia microti maltese cross tick exposure transfusion trypanosoma brucei gambiense rhodesiense african trypanosomiasis sleeping sickness tsetse fly trypanosoma cruzi chagas reduviid triatomine bug leishmania donovani infantum chagasi tropica major mexicana braziliensis amastigotes promastigotes sand fly cutaneous visceral mucocutaneous toxoplasma gondii toxoplasmosis tachyzoite bradyzoite congenital immunocompromised acanthamoeba balamuthia naegleria free living amoeba keratitis encephalitis microfilariae',
        priority: 3
      },
      {
        id: 'g50',
        title: 'Other Protozoa',
        type: 'Guide',
        snippet: 'Trichomonas, Toxoplasma, Sarcocystis, Naegleria, Acanthamoeba, Balamuthia, genital specimens, tissue diagnosis, CSF, ocular specimens, serology, and NAAT logic.',
        path: '/guides?guide=other-protozoa',
        keywords: 'other protozoa parasite parasitology trichomonas vaginalis trichomoniasis wet mount motility vaginal genital urine naat antigen toxoplasma gondii toxoplasmosis congenital pregnancy avidity igg igm pcr sarcocystis free living amoebae naegleria fowleri acanthamoeba balamuthia sappinia keratitis contact lens csf meningoencephalitis freshwater',
        priority: 3
      },
      {
        id: 'g51',
        title: 'Intestinal Nematodes',
        type: 'Guide',
        snippet: 'Roundworm stool and perianal workflows for Ascaris, Enterobius, hookworms, Trichuris, Strongyloides, Capillaria, eggs, larvae, concentration, and tape prep.',
        path: '/guides?guide=intestinal-nematodes',
        keywords: 'intestinal nematodes roundworms ascaris lumbricoides enterobius vermicularis pinworm perianal tape prep hookworm ancylostoma duodenale necator americanus trichuris trichiura whipworm strongyloides stercoralis rhabditiform larva filariform larva capillaria philippinensis trichostrongylus stool eggs larvae ova parasite',
        priority: 3
      },
      {
        id: 'g52',
        title: 'Tissue Nematodes',
        type: 'Guide',
        snippet: 'Tissue roundworm patterns including Trichinella, Toxocara larva migrans, Anisakis, Gnathostoma, Angiostrongylus, Baylisascaris, biopsy, serology, and eosinophilia.',
        path: '/guides?guide=tissue-nematodes',
        keywords: 'tissue nematodes roundworms trichinella spiralis trichinellosis toxocara canis cati visceral larva migrans ocular larva migrans anisakis anisakiasis gnathostoma angiostrongylus cantonensis eosinophilic meningitis baylisascaris procyonis neural larva migrans eosinophilia biopsy serology',
        priority: 3
      },
      {
        id: 'g53',
        title: 'Blood and Tissue Filarial Nematodes',
        type: 'Guide',
        snippet: 'Microfilariae, lymphatic filariasis, Loa loa, Onchocerca, Mansonella, blood timing, skin snips, concentration, antigen, serology, and morphology.',
        path: '/guides?guide=filarial-nematodes',
        keywords: 'filarial nematodes blood tissue microfilariae wuchereria bancrofti brugia malayi timori lymphatic filariasis loa loa loiasis calabar swelling eye worm onchocerca volvulus river blindness skin snip mansonella dracunculus guinea worm periodicity sheath nuclei tail thick blood film buffy coat filtration antigen serology',
        priority: 3
      },
      {
        id: 'g54',
        title: 'Intestinal Cestodes',
        type: 'Guide',
        snippet: 'Tapeworm stool workflows for Taenia, Hymenolepis, Diphyllobothriid tapeworms, Dipylidium, eggs, proglottids, scolex, and gross segments.',
        path: '/guides?guide=intestinal-cestodes',
        keywords: 'intestinal cestodes tapeworm taenia saginata solium eggs proglottids scolex gravid segment hymenolepis nana diminuta dwarf tapeworm diphyllobothrium dibothriocephalus latum fish tapeworm dipylidium caninum egg packets stool ova parasite',
        priority: 3
      },
      {
        id: 'g55',
        title: 'Tissue Cestodes',
        type: 'Guide',
        snippet: 'Larval tapeworm disease including cysticercosis, echinococcosis, sparganosis, imaging, serology, histopathology, and hydatid cyst precautions.',
        path: '/guides?guide=tissue-cestodes',
        keywords: 'tissue cestodes cysticercosis neurocysticercosis taenia solium larva echinococcus granulosus hydatid cyst echinococcus multilocularis alveolar echinococcosis sparganosis spirometra coenurosis imaging serology histopathology biopsy',
        priority: 3
      },
      {
        id: 'g56',
        title: 'Intestinal Trematodes',
        type: 'Guide',
        snippet: 'Foodborne intestinal flukes, operculated eggs, aquatic plant and freshwater fish exposures, stool O&P, and cautious group-level reporting.',
        path: '/guides?guide=intestinal-trematodes',
        keywords: 'intestinal trematodes flukes fasciolopsis buski heterophyes heterophyes metagonimus yokogawai echinostoma nanophyetus salmincola foodborne trematode aquatic plants freshwater fish operculated eggs stool ova parasite',
        priority: 3
      },
      {
        id: 'g57',
        title: 'Liver and Lung Trematodes',
        type: 'Guide',
        snippet: 'Clonorchis, Opisthorchis, Fasciola, Paragonimus, biliary and pulmonary flukes, stool, sputum, serology, and exposure-based interpretation.',
        path: '/guides?guide=liver-lung-trematodes',
        keywords: 'liver lung trematodes flukes clonorchis sinensis opisthorchis viverrini felineus fasciola hepatica gigantica paragonimus westermani kellicotti biliary fluke lung fluke freshwater fish aquatic plants crab crayfish sputum stool operculated eggs serology',
        priority: 3
      },
      {
        id: 'g58',
        title: 'Blood Trematodes',
        type: 'Guide',
        snippet: 'Schistosoma urine, stool, tissue, serology, freshwater exposure, egg spine morphology, urinary and intestinal schistosomiasis.',
        path: '/guides?guide=blood-trematodes',
        keywords: 'blood trematodes schistosoma schistosomiasis haematobium mansoni japonicum mekongi intercalatum terminal spine lateral spine urine stool tissue serology freshwater cercariae swimmer itch katayama eggs',
        priority: 3
      },
      {
        id: 'g-mycology-overview',
        title: 'Fungal Identification Overview',
        type: 'Guide',
        snippet: 'Mycology identification strategy for direct exam, culture, mold morphology, yeast morphology, dermatophytes, dimorphic fungi, histopathology, antigen, serology, molecular testing, and safety.',
        path: '/guides?guide=fungal-identification-overview',
        keywords: 'mycology fungal identification fungi mold yeast direct exam koh calcofluor gram stain gms pas india ink culture sabouraud inhibitory mold agar dermatophyte media brain heart infusion lactophenol cotton blue slide culture tease mount hyphae septate aseptate pauciseptate conidia macroconidia microconidia arthroconidia blastoconidia pseudohyphae germ tube capsule dimorphic fungi histopathology antigen serology beta d glucan galactomannan maldi sequencing naat biosafety',
        priority: 3
      },
      {
        id: 'g-hyaline-molds-dermatophytes',
        title: 'Hyaline Molds, Mucorales, and Dermatophytes',
        type: 'Guide',
        snippet: 'Hyaline septate molds, Mucorales, dermatophytes, opportunistic molds, Aspergillus, Fusarium, Scedosporium, Rhizopus, Mucor, Trichophyton, Microsporum, and Epidermophyton.',
        path: '/guides?guide=hyaline-molds-dermatophytes',
        keywords: 'hyaline molds mucorales dermatophytes opportunistic mycoses systemic mycoses aspergillus fumigatus flavus niger terreus conidial head vesicle phialide fusarium banana macroconidia blood culture scedosporium lomentospora acremonium scopulariopsis purpureocillium paecilomyces mucor rhizopus lichtheimia rhizomucor cunninghamella broad ribbon like hyphae pauciseptate right angle branching mucormycosis zygomycetes dermatophyte trichophyton microsporum epidermophyton skin hair nail koh arthroconidia macroconidia microconidia tinea',
        priority: 3
      },
      {
        id: 'g-dematiaceous-molds',
        title: 'Dematiaceous Molds',
        type: 'Guide',
        snippet: 'Melanized molds, pigmented hyphae, phaeohyphomycosis, chromoblastomycosis, eumycetoma, allergic fungal sinusitis, keratitis, CNS disease, and confirmatory ID strategy.',
        path: '/guides?guide=dematiaceous-molds',
        keywords: 'dematiaceous molds melanized molds pigmented hyphae brown black mold melanin phaeohyphomycosis chromoblastomycosis chromomycosis sclerotic bodies medlar bodies muriform cells eumycetoma grains allergic fungal sinusitis fungal keratitis brain abscess cns cladosporium cladophialophora bantiana exophiala wangiella phialophora fonsecaea alternaria bipolaris curvularia exserohilum chaetomium scopulariopsis',
        priority: 3
      },
      {
        id: 'g-dimorphic-systemic-fungi',
        title: 'Dimorphic and Systemic Fungi',
        type: 'Guide',
        snippet: 'Thermally dimorphic fungi, endemic mycoses, Histoplasma, Blastomyces, Coccidioides, Paracoccidioides, Sporothrix, Talaromyces, tissue morphology, antigen, serology, and biosafety.',
        path: '/guides?guide=dimorphic-systemic-fungi',
        keywords: 'dimorphic fungi systemic fungi endemic mycoses thermally dimorphic histoplasma capsulatum blastomyces dermatitidis coccidioides immitis posadasii paracoccidioides brasiliensis lutzii sporothrix schenckii talaromyces marneffei penicillium marneffei mold phase yeast phase spherules endospores broad based budding intracellular yeast macrophages mariner wheel cigar shaped yeast antigen serology complement fixation immunodiffusion biosafety',
        priority: 3
      },
      {
        id: 'g-yeasts',
        title: 'The Yeasts',
        type: 'Guide',
        snippet: 'Candida, Cryptococcus, Malassezia, Trichosporon, Rhodotorula, Saccharomyces, germ tube, pseudohyphae, capsule, cryptococcal antigen, MALDI-TOF, and susceptibility context.',
        path: '/guides?guide=yeasts',
        keywords: 'yeasts yeast candida albicans dubliniensis glabrata tropicalis parapsilosis krusei auris lusitaniae guilliermondii germ tube pseudohyphae true hyphae chlamydospores chromogenic agar cornmeal tween cryptococcus neoformans gattii capsule india ink cryptococcal antigen urease birdseed canavanine glycine bromothymol blue malassezia lipid trichosporon arthroconidia rhodotorula pink salmon colony saccharomyces geotrichum blood culture candidemia antifungal susceptibility',
        priority: 3
      },
      {
        id: 'g-antifungal-susceptibility',
        title: 'Antifungal Susceptibility and Therapy',
        type: 'Guide',
        snippet: 'Antifungal AST, MICs, breakpoints, ECVs, azoles, echinocandins, amphotericin B, flucytosine, terbinafine, Candida resistance, mold susceptibility, prevention, and stewardship.',
        path: '/guides?guide=antifungal-susceptibility',
        keywords: 'antifungal susceptibility testing antifungal therapy antifungal resistance ast mic minimum inhibitory concentration breakpoint epidemiologic cutoff value ecv wild type non wild type broth microdilution disk diffusion gradient diffusion azoles fluconazole voriconazole posaconazole itraconazole isavuconazole echinocandins caspofungin micafungin anidulafungin amphotericin b flucytosine terbinafine allylamines candida krusei glabrata auris aspergillus terreus fumigatus azole resistance mucorales dermatophyte resistance stewardship prophylaxis prevention catheter source control',
        priority: 3
      },
      {
        id: 'g-virology-methods-overview',
        title: 'Virology Methods and Strategies',
        type: 'Guide',
        snippet: 'Viral diagnostic strategy for specimen timing, viral transport, NAAT, antigen tests, serology, viral culture, cytopathic effect, shell vial culture, viral load, genotyping, and biosafety.',
        path: '/guides?guide=virology-methods-overview',
        keywords: 'virology viral methods virus diagnosis viral transport medium vtm specimen timing nasopharyngeal swab lesion swab csf blood plasma serum stool urine tissue ocular genital naat pcr rt pcr antigen detection serology igm igg avidity paired sera viral culture cell culture cytopathic effect cpe shell vial immunofluorescence electron microscopy viral load quantitative pcr cycle threshold ct value genotyping resistance sequencing biosafety',
        priority: 3
      },
      {
        id: 'g-viruses-in-human-disease',
        title: 'Viruses in Human Disease',
        type: 'Guide',
        snippet: 'Clinically important virus groups by syndrome: respiratory, gastrointestinal, herpesviruses, hepatitis, HIV, rash, congenital, arboviruses, zoonotic viruses, and public health workflows.',
        path: '/guides?guide=viruses-in-human-disease',
        keywords: 'viruses in human disease respiratory viruses influenza rsv parainfluenza metapneumovirus adenovirus rhinovirus enterovirus coronavirus sars cov 2 gastrointestinal viruses norovirus rotavirus astrovirus sapovirus herpesviruses hsv vzv cmv ebv hhv6 hepatitis a b c d e hiv viral load resistance measles rubella parvovirus b19 arbovirus west nile dengue zika chikungunya rabies congenital infection transplant viral disease viral syndrome',
        priority: 3
      },
      {
        id: 'g-antiviral-therapy-susceptibility',
        title: 'Antiviral Therapy and Susceptibility',
        type: 'Guide',
        snippet: 'Antiviral drug classes, resistance testing, viral load monitoring, genotype, phenotype, HIV, hepatitis, CMV, HSV, influenza resistance, vaccination, prophylaxis, and prevention.',
        path: '/guides?guide=antiviral-therapy-susceptibility',
        keywords: 'antiviral therapy antiviral susceptibility antiviral resistance viral resistance testing genotypic resistance phenotypic resistance viral load monitoring hiv resistance reverse transcriptase protease integrase inhibitor hepatitis c resistance hcv direct acting antivirals cmv ganciclovir valganciclovir foscarnet cidofovir letermovir hsv acyclovir resistance vzv influenza oseltamivir baloxavir neuraminidase inhibitor polymerase inhibitor vaccination prophylaxis postexposure prophylaxis infection control breakthrough infection',
        priority: 3
      },
      {
        id: 'g-bloodstream-infections',
        title: 'Bloodstream Infection Workup',
        type: 'Guide',
        snippet: 'Blood culture collection, positive bottle workflow, Gram stain communication, contaminant versus pathogen logic, endocarditis, catheter infection, and follow-up testing.',
        path: '/guides?guide=bloodstream-infections',
        keywords: 'bloodstream infection blood culture bacteremia fungemia sepsis septicemia positive blood culture bottle gram stain critical call contaminant pathogen coagulase negative staphylococcus corynebacterium cutibacterium bacillus micrococcus staphylococcus aureus candida enterobacterales anaerobe endocarditis catheter related infection differential time to positivity line culture peripheral culture subculture rapid id maldi molecular susceptibility',
        priority: 3
      },
      {
        id: 'g-lower-respiratory-infections',
        title: 'Lower Respiratory Tract Infection Workup',
        type: 'Guide',
        snippet: 'Sputum quality, lower respiratory specimens, pneumonia culture, respiratory panels, Legionella, AFB, fungal questions, colonization, and aspiration pitfalls.',
        path: '/guides?guide=lower-respiratory-infections',
        keywords: 'lower respiratory infection pneumonia sputum quality gram stain squamous epithelial cells neutrophils oral flora tracheal aspirate bronchoalveolar lavage bal protected brush pleural fluid lung tissue ventilator associated pneumonia aspiration pneumonia respiratory viral panel legionella urinary antigen bcye mycoplasma atypical pneumonia afb culture mycobacteria nocardia fungal pneumonia candida colonization pseudomonas stenotrophomonas burkholderia',
        priority: 3
      },
      {
        id: 'g-upper-respiratory-oral-neck-infections',
        title: 'Upper Respiratory, Oral, and Neck Infection Workup',
        type: 'Guide',
        snippet: 'Throat, nasopharyngeal, oral, sinus, and deep neck infection workflows with targeted testing, anaerobic specimens, pharyngitis, pertussis, and diphtheria concerns.',
        path: '/guides?guide=upper-respiratory-oral-neck-infections',
        keywords: 'upper respiratory oral neck infection throat culture pharyngitis group a streptococcus rapid antigen strep naat nasopharyngeal swab pertussis bordetella diphtheria corynebacterium diphtheriae oral abscess dental infection peritonsillar retropharyngeal deep neck abscess sinus aspirate sinusitis anaerobic culture fusobacterium actinomyces mixed oral flora respiratory virus swab',
        priority: 3
      },
      {
        id: 'g-cns-infections',
        title: 'CNS Infection Workup',
        type: 'Guide',
        snippet: 'CSF handling, meningitis, encephalitis, Gram stain urgency, culture, multiplex NAAT, cryptococcal antigen, chronic meningitis, shunt, and brain abscess logic.',
        path: '/guides?guide=cns-infections',
        keywords: 'cns infection meningitis encephalitis csf cerebrospinal fluid gram stain culture multiplex meningitis encephalitis panel naat pcr cryptococcal antigen india ink bacterial meningitis pneumococcus meningococcus group b streptococcus listeria haemophilus neonatal meningitis brain abscess shunt infection ventriculitis afb fungal culture tuberculosis meningitis viral encephalitis hsv vzv enterovirus arbovirus',
        priority: 3
      },
      {
        id: 'g-eye-ear-sinus-infections',
        title: 'Eye, Ear, and Sinus Infection Workup',
        type: 'Guide',
        snippet: 'Ocular, ear, mastoid, and sinus specimens, keratitis, endophthalmitis, conjunctivitis, contact lens exposure, fungal sinusitis, and low-volume specimen priorities.',
        path: '/guides?guide=eye-ear-sinus-infections',
        keywords: 'eye ear sinus infection ocular infection keratitis corneal scraping endophthalmitis vitreous aqueous conjunctivitis contact lens acanthamoeba pseudomonas fungal keratitis hsv adenovirus otitis externa otitis media mastoiditis ear culture sinusitis sinus aspirate fungal sinusitis mucormycosis aspergillus orbital cellulitis low volume specimen direct plating',
        priority: 3
      },
      {
        id: 'g-urinary-tract-infections',
        title: 'Urinary Tract Infection Workup',
        type: 'Guide',
        snippet: 'Urine specimen types, colony counts, pyuria, mixed growth, clean-catch, catheter urine, asymptomatic bacteriuria, yeast, and susceptibility reporting.',
        path: '/guides?guide=urinary-tract-infections',
        keywords: 'urinary tract infection uti urine culture clean catch midstream catheter urine suprapubic aspirate nephrostomy ileal conduit colony count cfu pyuria leukocyte esterase nitrite mixed flora contamination asymptomatic bacteriuria catheter associated cauti enterobacterales escherichia coli enterococcus staphylococcus saprophyticus proteus urease alkaline urine yeast candiduria schistosoma haematobium genitourinary tuberculosis susceptibility urine antibiogram',
        priority: 3
      },
      {
        id: 'g-genital-tract-infections',
        title: 'Genital Tract Infection Workup',
        type: 'Guide',
        snippet: 'Genital syndrome testing for urethritis, cervicitis, vaginitis, genital ulcer disease, STI NAAT, wet prep, Gram stain, pregnancy, neonatal, and culture limits.',
        path: '/guides?guide=genital-tract-infections',
        keywords: 'genital tract infection sti sexually transmitted infection urethritis cervicitis vaginitis pelvic inflammatory disease epididymitis genital ulcer chlamydia trachomatis neisseria gonorrhoeae gonorrhea culture naat mycoplasma genitalium trichomonas vaginalis bacterial vaginosis candida wet mount clue cells whiff test vaginal ph gram stain nugent hsv syphilis rpr vdrl treponemal test group b streptococcus pregnancy neonatal rectal pharyngeal extragenital specimen',
        priority: 3
      },
      {
        id: 'g-gastrointestinal-tract-infections',
        title: 'Gastrointestinal Tract Infection Workup',
        type: 'Guide',
        snippet: 'Stool culture, GI panels, C. difficile testing, Shiga toxin, ova and parasite workups, transport, preservatives, outbreak routing, and interpretation pitfalls.',
        path: '/guides?guide=gastrointestinal-tract-infections',
        keywords: 'gastrointestinal tract infection gi infection diarrhea stool culture enteric culture bacterial gastroenteritis bloody diarrhea watery diarrhea foodborne illness outbreak travel diarrhea persistent diarrhea multiplex gi panel gastrointestinal panel naat c difficile clostridioides difficile toxin pcr glutamate dehydrogenase gdh shiga toxin stec ehec salmonella shigella campylobacter yersinia vibrio aeromonas plesiomonas ova and parasite o and p stool preservative rectal swab fecal leukocytes fecal lactoferrin calprotectin norovirus rotavirus cryptosporidium giardia cyclospora',
        priority: 3
      },
      {
        id: 'g-skin-soft-tissue-wound-infections',
        title: 'Skin, Soft Tissue, and Wound Infection Workup',
        type: 'Guide',
        snippet: 'Wound specimen quality, superficial versus deep samples, abscesses, cellulitis, bites, burns, diabetic foot, necrotizing infection, anaerobes, and tissue culture.',
        path: '/guides?guide=skin-soft-tissue-wound-infections',
        keywords: 'skin soft tissue wound infection ssti abscess cellulitis wound culture superficial swab deep tissue aspirate biopsy anaerobic transport diabetic foot infection pressure ulcer decubitus ulcer burn infection surgical site infection bite wound animal bite human bite pasteurella capnocytophaga eikenella anaerobes necrotizing fasciitis gas gangrene clostridium myonecrosis toxin staphylococcus aureus streptococcus pyogenes pseudomonas mold trauma hardware biofilm tissue culture gram stain',
        priority: 3
      },
      {
        id: 'g-sterile-fluids-bone-tissue-infections',
        title: 'Sterile Fluids, Bone, Bone Marrow, and Tissue Workup',
        type: 'Guide',
        snippet: 'Normally sterile fluids, synovial fluid, pleural fluid, peritoneal fluid, bone culture, osteomyelitis, marrow culture, tissue culture, prosthetic joint infection, and hardware-associated infection.',
        path: '/guides?guide=sterile-fluids-bone-tissue-infections',
        keywords: 'sterile body fluid culture sterile fluid normally sterile body fluids pleural fluid peritoneal fluid ascites synovial fluid pericardial fluid joint fluid septic arthritis bone culture osteomyelitis bone marrow culture marrow aspirate tissue culture biopsy solid tissue abscess aspirate prosthetic joint infection pji hardware infection implant infection sonication anaerobic culture fungal culture afb culture mycobacteria histopathology gram stain blood culture bottle inoculation concentration centrifugation cutibacterium coagulase negative staphylococcus brucella leishmania disseminated fungal infection',
        priority: 3
      },
      {
        id: 'g-quality-clinical-microbiology-lab',
        title: 'Quality in the Clinical Microbiology Laboratory',
        type: 'Guide',
        snippet: 'Quality systems for preanalytic, analytic, and postanalytic microbiology: QC, QA, verification, validation, proficiency testing, competency, audits, corrective action, and reports.',
        path: '/guides?guide=quality-clinical-microbiology-lab',
        keywords: 'quality clinical microbiology laboratory qc quality control qa quality assurance quality assessment quality management system qms preanalytic analytic postanalytic specimen rejection corrective action root cause analysis proficiency testing competency validation verification lot to lot media qc reagent qc temperature monitoring calibration maintenance critical result corrected report audit quality indicators turnaround time contamination rate documentation',
        priority: 3
      },
      {
        id: 'g-infection-control-laboratory-role',
        title: 'Infection Control and the Microbiology Laboratory',
        type: 'Guide',
        snippet: 'Laboratory role in infection prevention: standard precautions, transmission routes, MDRO detection, surveillance, outbreak support, isolation, exposure prevention, and reporting.',
        path: '/guides?guide=infection-control-laboratory-role',
        keywords: 'infection control infection prevention microbiology laboratory healthcare associated infection hai standard precautions contact precautions droplet airborne ppe hand hygiene sharps exposure mdro multidrug resistant organism mrsa vre cre carbapenemase candida auris surveillance culture outbreak investigation cluster line list environmental culture antibiogram stewardship isolation public health notification occupational health',
        priority: 3
      },
      {
        id: 'g-sentinel-laboratory-response',
        title: 'Sentinel Laboratory Response',
        type: 'Guide',
        snippet: 'Safety workflow for suspected high-consequence pathogens: recognize risk, stop routine manipulation, secure material, notify leadership, refer, and manage exposure.',
        path: '/guides?guide=sentinel-laboratory-response',
        keywords: 'sentinel laboratory response biothreat high consequence pathogen bioterrorism select agent rule out refer stop work secure notify reference lab public health laboratory response network lrn bsl3 biosafety brucella francisella bacillus anthracis anthrax yersinia pestis plague burkholderia mallei pseudomallei coxiella burnetii tularemia small gram negative coccobacilli lab exposure aerosol exposure packaging shipping chain of custody occupational health',
        priority: 3
      },
      {
        id: 'g59',
        title: 'Culture Media and Plate Selection',
        type: 'Guide',
        snippet: 'Enriched, selective, and differential media with practical plate interpretation cues.',
        path: '/guides?guide=media',
        keywords: 'culture media selective differential enriched blood agar chocolate agar macconkey cna pea he xld plate selection hemolysis h2s',
        priority: 3
      },
      {
        id: 'g60',
        title: 'Specimen Management Basics',
        type: 'Guide',
        snippet: 'Collection, transport, storage, acceptance criteria, and processing choices for common microbiology specimens.',
        path: '/guides?guide=specimens',
        keywords: 'specimen management specimen processing rejection criteria transport media swab amies stuart storage collection body site sterile site recollection',
        priority: 3
      },
      {
        id: 'g61',
        title: 'Atmosphere, Temperature, and Incubation Basics',
        type: 'Guide',
        snippet: 'Oxygen tolerance, CO2 requirements, and temperature rules that affect organism recovery.',
        path: '/guides?guide=atmosphere',
        keywords: 'obligate aerobes anaerobes facultative microaerophiles oxygen growth environment temperature capnophilic campylobacter yersinia',
        priority: 3
      },
      {
        id: 'g62',
        title: 'Blood Culture First-Pass Workflow',
        type: 'Guide',
        snippet: 'Positive blood culture triage, Gram stain communication, and first-pass subculture logic.',
        path: '/guides?guide=blood-culture',
        keywords: 'blood culture positive bottle gram stain critical call subculture bacteremia contaminant time to positivity',
        priority: 3
      },
      {
        id: 'g63',
        title: 'Urine Culture Bench Workflow',
        type: 'Guide',
        snippet: 'Specimen quality, colony count logic, mixed flora, and routine urine interpretation.',
        path: '/guides?guide=urine-culture',
        keywords: 'urine culture colony count mixed flora clean catch catheter pyuria recollection macconkey',
        priority: 3
      },
      {
        id: 'g64',
        title: 'First-Pass Gram-Positive Cocci Interpretation',
        type: 'Guide',
        snippet: 'Cluster versus chain morphology, catalase, coagulase, hemolysis, and enterococcal clues.',
        path: '/guides?guide=gram-positive-id',
        keywords: 'gram positive cocci catalase coagulase hemolysis pyr bile esculin enterococcus staphylococcus streptococcus',
        priority: 3
      },
      {
        id: 'g65',
        title: 'Enteric Bench Interpretation Shortcuts',
        type: 'Guide',
        snippet: 'MacConkey behavior, oxidase, H2S, urease, indole, and enteric workflow logic.',
        path: '/guides?guide=enterics',
        keywords: 'enterics macconkey oxidase h2s urease indole citrate motility lactose fermenter non lactose fermenter proteus salmonella',
        priority: 3
      }
    ];

    const roadmapSummaries: SearchResult[] = [
      {
        id: 'r1',
        title: 'Gram Positive Identification',
        type: 'Roadmap',
        snippet: 'Decision tree for Staph, Strep, Enterococcus, Bacillus, Corynebacterium, Nocardia, and related organisms.',
        path: '/gram-positive-roadmap',
        keywords: 'gram positive identification staphylococcus streptococcus enterococcus bacillus corynebacterium nocardia actinomycetes roadmap',
        priority: 2
      },
      {
        id: 'r2',
        title: 'Gram Negative Identification',
        type: 'Roadmap',
        snippet: 'Enterobacteriaceae, Gram-negative cocci, nonfermenters, curved rods, water-associated organisms, bite-wound organisms, HACEK, Haemophilus, and high-consequence fastidious workflow.',
        path: '/gram-negative-roadmap',
        keywords: 'gram negative identification gram negative cocci diplococci neisseria gonorrhoeae meningitidis moraxella catarrhalis enterobacteriaceae enterobacterales enterics acinetobacter stenotrophomonas nonfermenter pseudomonas burkholderia rhizobium ochrobactrum chryseobacterium sphingobacterium elizabethkingia alcaligenes achromobacter bordetella comamonas delftia oligella vibrio aeromonas plesiomonas chromobacterium sphingomonas moraxella eikenella pasteurella aggregatibacter cardiobacterium kingella capnocytophaga haemophilus bartonella afipia campylobacter arcobacter helicobacter legionella brucella bordetella pertussis francisella streptobacillus spirillum influenzae ducreyi x v factor porphyrin bcye cysteine microaerophilic hacek oxidase macconkey tcbs o129 fastidious bite wound endocarditis select agent roadmap',
        priority: 2
      },
      {
        id: 'r3',
        title: 'Obligate Anaerobes',
        type: 'Roadmap',
        snippet: 'Anaerobic identification using specimen quality, oxygen tolerance, Gram morphology, special-potency disks, BBE/LKV, bile, pigment, spores, and key organism groups.',
        path: '/obligate-anaerobe-roadmap',
        keywords: 'obligate anaerobe identification anaerobic bacteriology specimen transport pras reduced media oxygen tolerance aerotolerance special potency disks vancomycin kanamycin colistin bbe lkv bile pigment fluorescence clostridium bacteroides prevotella porphyromonas fusobacterium bilophila anaerobic cocci peptostreptococcus actinomyces cutibacterium roadmap',
        priority: 2
      },
      {
        id: 'r4',
        title: 'Enterics Biochemical Calculator',
        type: 'Tool',
        snippet: 'Input unknown reactions to calculate the most likely pathogen.',
        path: '/biochemical-calculator',
        keywords: 'enterics enterobacteriaceae enterobacterales biochemical calculator reactions pathogen identification',
        priority: 2
      },
      {
        id: 'r5',
        title: 'Unknown Isolate Workup',
        type: 'Tool',
        snippet: 'Guided bench reasoning from Gram stain, colony clues, media behavior, and early tests to the next workup step.',
        path: '/unknown-isolate-workup',
        keywords: 'unknown isolate workup gram stain morphology colony catalase oxidase macconkey hemolysis specimen purity bench reasoning next test identification',
        priority: 2
      },
      {
        id: 'r6',
        title: 'Special Pathogens Hub',
        type: 'Tool',
        snippet: 'Navigation hub for organisms that do not fit routine Gram stain and plate logic: anaerobes, mycobacteria, intracellular agents, Mycoplasma/Ureaplasma, and spirochetes.',
        path: '/special-pathogens',
        keywords: 'special pathogens hub anaerobes mycobacteria tuberculosis afb intracellular nonculturable chlamydia rickettsia ehrlichia anaplasma coxiella mycoplasma ureaplasma spirochetes treponema borrelia leptospira diagnostic strategy naat serology special culture darkfield safety',
        priority: 2
      },
      {
        id: 'r7',
        title: 'Syndrome to Diagnostic Path',
        type: 'Tool',
        snippet: 'Choose a clinical syndrome or exposure and see the best specimen, diagnostic method, timing pitfalls, safety notes, and related Learn Microbes links.',
        path: '/syndrome-diagnostic-path',
        keywords: 'syndrome diagnostic path test strategy specimen timing safety chronic cough afb deep abscess anaerobe tick fever rash eschar atypical pneumonia persistent urethritis cervicitis genital ulcer lyme erythema migrans leptospirosis freshwater animal urine jaundice renal animal dairy aerosol fever pregnancy neonatal mycoplasma naat serology culture pcr',
        priority: 2
      },
      {
        id: 'r8',
        title: 'Do Not Routine Culture',
        type: 'Tool',
        snippet: 'Safety and diagnostic escalation guide for organisms where routine bench culture or biochemical workup is the wrong move.',
        path: '/do-not-routine-culture',
        keywords: 'do not routine culture stop bench work escalation safety biosafety reference lab brucella francisella coxiella chlamydia rickettsia ehrlichia anaplasma treponema pallidum syphilis mycoplasma ureaplasma mycobacterium tuberculosis mtb afb naat serology special culture select agent lab exposure',
        priority: 2
      },
      {
        id: 'r9',
        title: 'Study Quiz',
        type: 'Tool',
        snippet: 'Practice questions generated from Learn Microbes bench tests, organism profiles, QC reactions, expected results, and safety escalation logic.',
        path: '/study-quiz',
        keywords: 'study quiz flashcards practice questions best next test organism profile qc expected result biochemical test roadmap safety escalation exam mode bench mode',
        priority: 2
      },
      {
        id: 'r10',
        title: 'ASCP Microbiology Review',
        type: 'Tool',
        snippet: 'ASCP microbiology review hub for MLS students and M(ASCP) prep with study paths, quizzes, biochemical tests, organism ID workflows, safety traps, and visual bench cards.',
        path: '/ascp-microbiology-review',
        keywords: 'ascp microbiology review m ascp m(ascp) mls exam prep pass ascp clinical microbiology study guide certification review bacteriology mycology parasitology virology mycobacteriology biochemical tests organism id quiz visual atlas',
        priority: 4
      },
      {
        id: 'r11',
        title: 'Certification Study Paths',
        type: 'Tool',
        snippet: 'M(ASCP) and SM(ASCP) microbiology study map connecting certification content areas to Learn Microbes tools and weak-topic review.',
        path: '/certification-study-paths',
        keywords: 'certification study paths ascp m sm scientist specialist microbiology exam prep content guideline bacteriology mycology parasitology virology mycobacteriology molecular laboratory operations quality control weak area tracker',
        priority: 3
      }
    ];

    const gramPositiveNodes: SearchResult[] = gramPositiveRoadmap.flatMap((step) => {
      const questionEntry: SearchResult = {
        id: `gp-question-${step.id}`,
        title: `Gram Positive: ${step.question.replace(/:$/, '')}`,
        type: 'Roadmap',
        snippet: step.options.map((option) => option.text).slice(0, 3).join(' • '),
        path: '/gram-positive-roadmap',
        keywords: [
          step.question,
          ...step.options.flatMap((option) => [
            option.text,
            option.conclusion ?? '',
            ...(option.tests ?? [])
          ])
        ].join(' ').toLowerCase(),
        priority: 1
      };

      const conclusionEntries = step.options
        .filter((option) => option.conclusion)
        .map((option, index) => ({
          id: `gp-conclusion-${step.id}-${index}`,
          title: option.conclusion as string,
          type: 'Roadmap' as const,
          snippet: `From: ${step.question.replace(/:$/, '')}. Choice: ${option.text}`,
          path: '/gram-positive-roadmap',
          keywords: [
            option.conclusion,
            step.question,
            option.text,
            ...(option.tests ?? [])
          ].join(' ').toLowerCase(),
          priority: 5
        }));

      return [questionEntry, ...conclusionEntries];
    });

    return [...glossary, ...visuals, ...learnBasics, ...tests, ...guides, ...roadmapSummaries, ...gramPositiveNodes];
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const rankedResults = searchIndex
      .filter((entry) => entry.keywords.includes(lowerQuery) || entry.title.toLowerCase().includes(lowerQuery))
      .map((entry) => {
        const titleMatch = entry.title.toLowerCase().includes(lowerQuery) ? 8 : 0;
        const exactMatch = entry.title.toLowerCase() === lowerQuery ? 12 : 0;
        const keywordMatch = entry.keywords.includes(lowerQuery) ? 3 : 0;

        return {
          ...entry,
          score: entry.priority + titleMatch + exactMatch + keywordMatch
        };
      })
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 24)
      .map(({ score, ...entry }) => entry);

    setResults(rankedResults);
    setSelectedIndex(0);

    const trackedQuery = lowerQuery.trim();
    if (trackedQuery !== lastTrackedQueryRef.current) {
      trackEvent('search_used', {
        search_term: trackedQuery,
        results_count: rankedResults.length
      });
      lastTrackedQueryRef.current = trackedQuery;
    }
  }, [query, searchIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!results.length) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % results.length);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + results.length) % results.length);
      }

      if (event.key === 'Enter' && document.activeElement === inputRef.current) {
        event.preventDefault();
        navigate(results[selectedIndex].path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, results, selectedIndex]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Test':
        return faFlask;
      case 'Bench Term':
        return faBookOpen;
      case 'Learn':
        return faBookOpen;
      case 'Visual':
        return faFlask;
      case 'Guide':
        return faBookOpen;
      case 'Roadmap':
        return faSitemap;
      case 'Tool':
        return faSearch;
      default:
        return faSearch;
    }
  };

  return (
    <ToolBox
      title="Search Learn Microbes"
      icon="SEARCH"
      onClose={() => navigate('/')}
    >
      <div className="global-search-container">
        <div className="search-panel">
          <div className="search-panel-heading">
            <span>Bench Reference Search</span>
            <p>Find Learn pages, Visual Atlas cards, bench tests, guides, tools, and quick definitions.</p>
          </div>
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon-inside" />
            <input
              ref={inputRef}
              type="text"
              className="massive-search-input"
              placeholder="Try oxidase, MacConkey, indole, NAAT, anaerobe..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Global site search"
            />
            {query && (
              <button className="clear-search-btn" onClick={() => setQuery('')} aria-label="Clear search">
                ×
              </button>
            )}
          </div>

          <div className="search-suggestion-row" aria-label="Suggested searches">
            {suggestedSearches.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => setQuery(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <div className="search-helper-row">
            <span>Use Up/Down to move through results, then Enter to open the selected source.</span>
          </div>
        </div>

        <div className="search-results-container">
          {query.trim().length < 2 ? (
            <div className="search-empty-state">
              <span className="empty-icon" aria-hidden="true">SEARCH</span>
              <h3>Start Typing to Explore</h3>
              <p>Try searching for "Gram stain", "Oxidase", "MacConkey", "NAAT", or "Anaerobe".</p>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list animate-step">
              <div className="results-count">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </div>

              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`search-result-card ${result.type === 'Bench Term' ? 'bench-term-answer-card' : ''} ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => navigate(result.path)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(result.path);
                    }
                  }}
                >
                  <div className="result-icon-box">
                    <FontAwesomeIcon icon={getIconForType(result.type)} />
                  </div>
                  <div className="result-content">
                    <div className="result-header">
                      <h3>{result.title}</h3>
                      <span className={`result-badge type-${result.type.toLowerCase().replace(/\s+/g, '-')}`}>
                        {result.type}
                      </span>
                    </div>
                    {result.glossary ? (
                      <div className="glossary-answer">
                        <div className="glossary-definition-block">
                          <span className="glossary-category">{result.glossary.category}</span>
                          <p>{cleanSearchText(result.glossary.definition, 280)}</p>
                        </div>
                        <div className="glossary-context">
                          <span className="glossary-context-label">Bench meaning</span>
                          <p>{result.glossary.benchContext}</p>
                        </div>
                        <div className="glossary-key-points">
                          <span className="glossary-section-label">Key points</span>
                          <ul className="glossary-detail-list">
                            {result.glossary.details.slice(0, 3).map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="glossary-student-tip">
                          <span>Student shortcut</span>
                          <p>{result.glossary.studentTip}</p>
                        </div>
                        <div className="glossary-related-links" aria-label={`Suggested links for ${result.title}`}>
                          {result.glossary.relatedLinks.map((link) => (
                            <button
                              key={link.path}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(link.path);
                              }}
                              onKeyDown={(event) => event.stopPropagation()}
                            >
                              {link.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="result-snippet">{cleanSearchText(result.snippet)}</p>
                    )}
                    <div className="result-meta-row">
                      <span>{getResultActionLabel(result.type)}</span>
                      <span>{getDestinationLabel(result.path)}</span>
                    </div>
                  </div>
                  <div className="result-arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-empty-state error animate-step">
              <span className="empty-icon" aria-hidden="true">NO MATCH</span>
              <h3>No Matches Found</h3>
              <p>We couldn't find any tests, guides, or roadmaps matching "{query}".</p>
            </div>
          )}
        </div>

        <AlphaValidationCTA
          location="search_page"
          title="Help improve search rescue"
          body="Tell us what you searched for, what was missing, and whether saved searches, bookmarks, or progress tracking would help."
        />
      </div>
    </ToolBox>
  );
};

export default GlobalSearch;
