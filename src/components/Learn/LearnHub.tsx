import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { learnTopics, getLearnTopicBySlug } from '../../data/learnTopics';
import { atlasPages, MiniAtlasVisual, type AtlasPage } from '../VisualAtlas/VisualAtlas';
import AlphaValidationCTA from '../AlphaValidationCTA/AlphaValidationCTA';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useLearnProgress } from '../../hooks/useLearnProgress';
import './Learn.css';

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const categoryOrder = [
  'Foundations',
  'Clinical Lab Principles',
  'Core Methods',
  'Bacteriology',
  'Mycology',
  'Parasitology',
  'Virology',
  'Molecular and Immunodiagnostics',
  'Bench and Exam Integration'
];

const learningLaneMeta: Record<string, { number: string; description: string }> = {
  Foundations: {
    number: '01',
    description: 'Organism naming, bacterial structure, genetics, metabolism, host response, and normal flora logic.'
  },
  'Clinical Lab Principles': {
    number: '02',
    description: 'Safety, specimens, diagnostic methods, antimicrobial activity, QC, and clinical lab reasoning.'
  },
  'Core Methods': {
    number: '03',
    description: 'Microscopy, stains, media, atmosphere, colony reading, and branch-point tests.'
  },
  Bacteriology: {
    number: '04',
    description: 'Bacterial identification principles and major bacterial organism groups.'
  },
  Mycology: {
    number: '05',
    description: 'Fungal specimens, yeasts, molds, dermatophytes, dimorphic fungi, and fungal diagnostics.'
  },
  Parasitology: {
    number: '06',
    description: 'Stool O&P, protozoa, helminths, blood parasites, malaria, and parasite methods.'
  },
  Virology: {
    number: '07',
    description: 'Viral structure, specimen selection, respiratory viruses, herpesviruses, hepatitis, and HIV basics.'
  },
  'Molecular and Immunodiagnostics': {
    number: '08',
    description: 'NAAT, PCR, sequencing, MALDI-TOF, immunoassays, and serology interpretation.'
  },
  'Bench and Exam Integration': {
    number: '09',
    description: 'Unknown isolate thinking, syndrome-to-test logic, exam pathways, tables, and common traps.'
  }
};

const studyPaths = [
  {
    label: 'New learner',
    title: 'Start with the foundation set',
    description: 'Naming, structure, specimen logic, stains, and culture basics before organism-heavy review.',
    path: '/learn/microbial-taxonomy'
  },
  {
    label: 'Bench learner',
    title: 'Follow the specimen-to-answer path',
    description: 'Collection, safety, direct exam, culture conditions, branch tests, and reporting judgment.',
    path: '/learn/specimen-collection-transport'
  },
  {
    label: 'ASCP review',
    title: 'Use tables and syndrome anchors',
    description: 'Organism comparisons, diagnostic traps, high-yield benches, and exam-style separation points.',
    path: '/learn/syndrome-to-test-thinking'
  }
];

const beginnerLessonPath = [
  { step: '01', title: 'What the lab is trying to answer', path: '/learn/clinical-microbiology' },
  { step: '02', title: 'Specimens and contamination', path: '/learn/specimen-collection-transport' },
  { step: '03', title: 'Gram stain basics', path: '/learn/gram-stain' },
  { step: '04', title: 'Culture media basics', path: '/learn/culture-media' },
  { step: '05', title: 'Colony morphology', path: '/learn/colony-morphology' },
  { step: '06', title: 'Gram-positive cocci first split', path: '/learn/staphylococcus-micrococcus' },
  { step: '07', title: 'Gram-negative rods first split', path: '/learn/enterobacterales' },
  { step: '08', title: 'Anaerobes and special handling', path: '/learn/anaerobic-bacteria' },
  { step: '09', title: 'Fungi, parasites, and viruses overview', path: '/learn/syndrome-to-test-thinking' },
  { step: '10', title: 'Serology, antigen, and NAAT logic', path: '/learn/molecular-diagnostics-basics' },
  { step: '11', title: 'AST basics', path: '/learn/antimicrobial-susceptibility-testing' },
  { step: '12', title: 'Syndrome-to-test thinking', path: '/learn/syndrome-to-test-thinking' }
];

const beginnerSelfChecks = [
  {
    prompt: 'Before naming an organism, what should a new learner check first?',
    answer: 'Start with specimen source and quality. A great ID from a poor specimen can still mislead the clinical interpretation.'
  },
  {
    prompt: 'What does Gram stain give you before species-level ID?',
    answer: 'It gives a first branch: Gram reaction, shape, arrangement, inflammatory cells, organism burden, and whether the result fits the specimen.'
  },
  {
    prompt: 'Why is culture-negative not always infection-negative?',
    answer: 'Some organisms need special media, atmosphere, incubation time, molecular testing, serology, or safer reference-lab handling.'
  }
];

const filterOptions = ['Beginner', 'Bench', 'Exam', 'Tables'] as const;

type LearnFilter = typeof filterOptions[number];

const beginnerTopicPaths = new Set(beginnerLessonPath.map((lesson) => lesson.path));
const masteredStorageKey = 'learnmicrobes_mastered_topics';

const readMasteredTopicSlugs = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(masteredStorageKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((value): value is string => typeof value === 'string');
  } catch (error) {
    return [];
  }
};

const saveMasteredTopicSlugs = (slugs: string[]) => {
  try {
    window.localStorage.setItem(masteredStorageKey, JSON.stringify(slugs));
  } catch (error) {
    // Progress is a convenience feature; the page should still work if storage is unavailable.
  }
};

const useMasteredTopics = () => {
  const [masteredTopicSlugs, setMasteredTopicSlugs] = useState<string[]>(readMasteredTopicSlugs);

  const masteredTopicSet = useMemo(() => new Set(masteredTopicSlugs), [masteredTopicSlugs]);

  const toggleMasteredTopic = useCallback((slugToToggle: string) => {
    setMasteredTopicSlugs((currentSlugs) => {
      const nextSlugs = currentSlugs.includes(slugToToggle)
        ? currentSlugs.filter((slug) => slug !== slugToToggle)
        : [...currentSlugs, slugToToggle];

      saveMasteredTopicSlugs(nextSlugs);
      return nextSlugs;
    });
  }, []);

  return { masteredTopicSet, toggleMasteredTopic };
};

const normalizeLookupText = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const getLearnArticleVisuals = (topic: (typeof learnTopics)[number]): AtlasPage[] => {
  const normalizedTopicTitle = normalizeLookupText(topic.title);
  const normalizedTopicText = normalizeLookupText([
    topic.slug,
    topic.title,
    ...topic.keywords
  ].join(' '));

  return atlasPages.filter((page) => {
    const normalizedPageTitle = normalizeLookupText(page.title);
    const normalizedPageText = normalizeLookupText([
      page.slug,
      page.title,
      page.summary,
      page.biochemicalTestId ?? ''
    ].join(' '));

    return (
      page.relatedLearnSlug === topic.slug
      || page.slug === topic.slug
      || page.biochemicalTestId === topic.slug
      || (normalizedTopicTitle.length > 8 && normalizedPageTitle.includes(normalizedTopicTitle))
      || (topic.category === 'Core Methods' && normalizedTopicText.includes(normalizeLookupText(page.slug)))
      || (page.biochemicalTestId ? normalizedTopicText.includes(normalizeLookupText(page.biochemicalTestId)) : false)
      || normalizedPageText.includes(normalizedTopicTitle)
    );
  });
};

const getTopicBadges = (topic: (typeof learnTopics)[number]) => {
  const badges: LearnFilter[] = [];

  if (beginnerTopicPaths.has(`/learn/${topic.slug}`) || topic.category === 'Foundations') {
    badges.push('Beginner');
  }

  if (topic.keywords.some((keyword) => /specimen|culture|bench|stain|media|ast|safety|workflow|quality/i.test(keyword))) {
    badges.push('Bench');
  }

  if (topic.keywords.some((keyword) => /ascp|exam|review|trap|comparison|high-yield/i.test(keyword))) {
    badges.push('Exam');
  }

  if (topic.tables && topic.tables.length > 0) {
    badges.push('Tables');
  }

  return Array.from(new Set(badges));
};

const TaxonomyMapVisual: React.FC = () => {
  const ranks = [
    { label: 'Domain', example: 'Bacteria', width: 360 },
    { label: 'Phylum', example: 'Firmicutes / Bacillota', width: 328 },
    { label: 'Class', example: 'Bacilli', width: 296 },
    { label: 'Order', example: 'Bacillales', width: 264 },
    { label: 'Family', example: 'Staphylococcaceae', width: 232 },
    { label: 'Genus', example: 'Staphylococcus', width: 200 },
    { label: 'Species', example: 'aureus', width: 168 }
  ];

  const benchSteps = [
    { label: 'Specimen fit', detail: 'source + syndrome' },
    { label: 'Observed clues', detail: 'stain + colony + tests' },
    { label: 'Reportable name', detail: 'genus + species + meaning' }
  ];

  return (
    <figure className="learn-taxonomy-map" aria-labelledby="taxonomy-map-title">
      <div className="learn-taxonomy-map-stage" role="img" aria-labelledby="taxonomy-map-title taxonomy-map-desc">
        <svg viewBox="0 0 920 430" preserveAspectRatio="xMidYMid meet">
          <title id="taxonomy-map-title">Taxonomy map from broad grouping to bench identification</title>
          <desc id="taxonomy-map-desc">
            A ladder narrows microbial classification from domain to species while a bench pathway connects
            specimen context, observed clues, and the final reportable organism name.
          </desc>
          <defs>
            <marker id="taxonomy-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <text className="taxonomy-title" x="44" y="44">Classification narrows</text>
          <text className="taxonomy-title" x="560" y="44">Bench ID becomes useful</text>

          {ranks.map((rank, index) => {
            const x = 82 + ((360 - rank.width) / 2);
            const y = 72 + index * 42;

            return (
              <g className={`taxonomy-rank-row rank-${index}`} key={rank.label}>
                <rect x={x} y={y} width={rank.width} height="32" rx="6" />
                <text className="taxonomy-rank-label" x={x + 18} y={y + 21}>{rank.label}</text>
                <text className="taxonomy-rank-example" x={x + rank.width - 18} y={y + 21}>{rank.example}</text>
              </g>
            );
          })}

          <line className="taxonomy-bridge" x1="442" y1="330" x2="540" y2="330" markerEnd="url(#taxonomy-arrow)" />

          {benchSteps.map((step, index) => {
            const y = 95 + index * 92;

            return (
              <g className="taxonomy-bench-step" key={step.label}>
                <circle cx="576" cy={y + 20} r="18" />
                <text className="taxonomy-step-number" x="576" y={y + 26}>{index + 1}</text>
                <rect x="618" y={y} width="244" height="58" rx="7" />
                <text className="taxonomy-bench-label" x="638" y={y + 24}>{step.label}</text>
                <text className="taxonomy-bench-detail" x="638" y={y + 43}>{step.detail}</text>
                {index < benchSteps.length - 1 && (
                  <line className="taxonomy-down-arrow" x1="576" y1={y + 42} x2="576" y2={y + 82} markerEnd="url(#taxonomy-arrow)" />
                )}
              </g>
            );
          })}

          <g className="taxonomy-name-card">
            <rect x="542" y="332" width="320" height="58" rx="7" />
            <text className="taxonomy-name" x="570" y="360">
              <tspan className="taxonomy-genus">Staphylococcus</tspan>
              <tspan> </tspan>
              <tspan className="taxonomy-species">aureus</tspan>
            </text>
            <text className="taxonomy-name-note" x="570" y="379">Genus is capitalized; species is lowercase.</text>
          </g>
        </svg>
        <div className="learn-visual-signature" aria-hidden="true">
          Learn Microbes | learnmicrobes.com
        </div>
      </div>
      <figcaption>
        Taxonomy gives the organism a place on the map. Identification is the bench route that turns observations
        into a useful genus/species answer.
      </figcaption>
    </figure>
  );
};

const BacterialBiologyMapVisual: React.FC = () => {
  const inputGroups = [
    {
      title: 'Structure',
      x: 48,
      y: 84,
      items: ['Cell wall', 'Outer membrane', 'Capsule', 'Spores']
    },
    {
      title: 'Metabolism',
      x: 48,
      y: 206,
      items: ['Oxygen use', 'Fermentation', 'Enzymes', 'Growth needs']
    },
    {
      title: 'Genes',
      x: 48,
      y: 328,
      items: ['Plasmids', 'Mutations', 'Transposons', 'Toxin genes']
    }
  ];

  const benchClues = [
    'Gram stain pattern',
    'Media and atmosphere',
    'Biochemical reactions',
    'Resistance phenotype',
    'Virulence clues'
  ];

  return (
    <figure className="learn-bacterial-map" aria-labelledby="bacterial-map-title">
      <div className="learn-bacterial-map-stage" role="img" aria-labelledby="bacterial-map-title bacterial-map-desc">
        <svg viewBox="0 0 920 500" preserveAspectRatio="xMidYMid meet">
          <title id="bacterial-map-title">Bacterial biology map from structure, metabolism, and genes to bench clues</title>
          <desc id="bacterial-map-desc">
            A concept map showing how bacterial structure, metabolism, and genes feed into observable laboratory
            clues such as Gram stain pattern, growth conditions, biochemical reactions, resistance, and virulence.
          </desc>
          <defs>
            <marker id="bacterial-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <text className="bacterial-title" x="44" y="46">Why bench clues happen</text>
          <text className="bacterial-subtitle" x="44" y="68">Structure, metabolism, and genes create the patterns students read at the bench.</text>

          {inputGroups.map((group) => (
            <g className="bacterial-input-group" key={group.title}>
              <rect x={group.x} y={group.y} width="230" height="92" rx="7" />
              <text className="bacterial-group-title" x={group.x + 18} y={group.y + 25}>{group.title}</text>
              {group.items.map((item, index) => (
                <text className="bacterial-group-item" x={group.x + 18} y={group.y + 48 + index * 16} key={item}>
                  {item}
                </text>
              ))}
              <line className="bacterial-connector" x1={group.x + 232} y1={group.y + 46} x2="396" y2="250" markerEnd="url(#bacterial-arrow)" />
            </g>
          ))}

          <g className="bacterial-cell-card">
            <rect x="386" y="138" width="178" height="224" rx="10" />
            <ellipse cx="475" cy="250" rx="64" ry="88" />
            <ellipse className="bacterial-cell-inner" cx="475" cy="250" rx="48" ry="68" />
            <path className="bacterial-dna" d="M 438 244 C 455 225, 494 225, 512 244 C 493 263, 457 263, 438 244 Z" />
            <path className="bacterial-plasmid" d="M 446 290 C 461 274, 485 274, 500 290 C 485 306, 461 306, 446 290 Z" />
            <circle className="bacterial-ribosome" cx="450" cy="216" r="5" />
            <circle className="bacterial-ribosome" cx="502" cy="218" r="5" />
            <circle className="bacterial-ribosome" cx="452" cy="324" r="5" />
            <circle className="bacterial-ribosome" cx="506" cy="316" r="5" />
            <path className="bacterial-pilus" d="M 410 208 C 380 198, 365 178, 348 160" />
            <path className="bacterial-pilus" d="M 537 220 C 574 206, 594 186, 612 166" />
            <path className="bacterial-flagellum" d="M 475 340 C 475 388, 540 392, 540 438 C 540 464, 504 466, 500 486" />
            <text className="bacterial-cell-label" x="475" y="124">Biology inside the isolate</text>
          </g>

          <line className="bacterial-main-arrow" x1="566" y1="250" x2="642" y2="250" markerEnd="url(#bacterial-arrow)" />

          <g className="bacterial-output-panel">
            <rect x="656" y="112" width="220" height="276" rx="8" />
            <text className="bacterial-output-title" x="680" y="144">What the lab sees</text>
            {benchClues.map((clue, index) => {
              const y = 174 + index * 38;
              return (
                <g className="bacterial-clue-row" key={clue}>
                  <circle cx="682" cy={y - 5} r="5" />
                  <text x="700" y={y}>{clue}</text>
                </g>
              );
            })}
          </g>

          <g className="bacterial-shortcut-card">
            <rect x="330" y="404" width="484" height="52" rx="7" />
            <text className="bacterial-shortcut-text" x="354" y="427">Shortcut: if a result feels random, ask which structure, enzyme, or gene explains it.</text>
            <text className="bacterial-shortcut-note" x="354" y="445">Memorize less by connecting the bench clue back to the biology.</text>
          </g>
        </svg>
        <div className="learn-visual-signature" aria-hidden="true">
          Learn Microbes | learnmicrobes.com
        </div>
      </div>
      <figcaption>
        Structure explains stains and drug entry, metabolism explains growth and biochemical reactions, and genes
        explain resistance, virulence, and outbreak patterns.
      </figcaption>
    </figure>
  );
};

const HostInteractionMapVisual: React.FC = () => {
  const decisionPoints = [
    { title: 'Where was it found?', detail: 'sterile site, deep source, superficial site', x: 76, y: 92 },
    { title: 'Who is the host?', detail: 'immunity, device, age, pregnancy, wound', x: 336, y: 92 },
    { title: 'Does it fit?', detail: 'syndrome, inflammation, repeat recovery', x: 596, y: 92 }
  ];

  const contextFactors = [
    { label: 'Organism factors', detail: 'virulence, toxin, capsule, inoculum', x: 96, y: 332 },
    { label: 'Host factors', detail: 'barriers, immunity, hardware, risk', x: 356, y: 332 },
    { label: 'Specimen factors', detail: 'source quality, mixed or pure growth', x: 616, y: 332 }
  ];

  return (
    <figure className="learn-host-map" aria-labelledby="host-map-title">
      <div className="learn-host-map-stage" role="img" aria-labelledby="host-map-title host-map-desc">
        <svg viewBox="0 0 920 470" preserveAspectRatio="xMidYMid meet">
          <title id="host-map-title">Host microorganism interaction decision map</title>
          <desc id="host-map-desc">
            A clinical decision triangle showing how organism source, host risk, and syndrome fit help students
            judge colonization versus infection.
          </desc>
          <defs>
            <marker id="host-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <text className="host-title" x="48" y="46">Does this organism matter here?</text>
          <text className="host-subtitle" x="48" y="68">Culture interpretation depends on source, host, and syndrome fit.</text>

          {decisionPoints.map((point) => (
            <g className="host-decision-point" key={point.title}>
              <rect x={point.x} y={point.y} width="226" height="76" rx="8" />
              <text className="host-card-title" x={point.x + 18} y={point.y + 30}>{point.title}</text>
              <text className="host-card-detail" x={point.x + 18} y={point.y + 52}>{point.detail}</text>
              <line className="host-connector" x1={point.x + 113} y1={point.y + 78} x2="460" y2="246" markerEnd="url(#host-arrow)" />
            </g>
          ))}

          <g className="host-center">
            <circle cx="460" cy="264" r="74" />
            <text className="host-center-title" x="460" y="246">Clinical</text>
            <text className="host-center-title" x="460" y="268">significance</text>
            <text className="host-center-detail" x="460" y="294">colonization ↔ infection</text>
          </g>

          {contextFactors.map((factor) => (
            <g className="host-context-factor" key={factor.label}>
              <rect x={factor.x} y={factor.y} width="208" height="58" rx="7" />
              <text className="host-factor-label" x={factor.x + 16} y={factor.y + 24}>{factor.label}</text>
              <text className="host-factor-detail" x={factor.x + 16} y={factor.y + 43}>{factor.detail}</text>
            </g>
          ))}

          <g className="host-shortcut-card">
            <rect x="146" y="410" width="628" height="36" rx="7" />
            <text x="460" y="433">Shortcut: where was it found, who is the patient, and does it fit the syndrome?</text>
          </g>
        </svg>
        <div className="learn-visual-signature" aria-hidden="true">
          Learn Microbes | learnmicrobes.com
        </div>
      </div>
      <figcaption>
        The same organism can be ignored, watched, or escalated depending on source, host risk, and clinical fit.
      </figcaption>
    </figure>
  );
};

const ClassificationEvidenceMapVisual: React.FC = () => {
  const phenotypeItems = ['Colony morphology', 'Microscopic shape', 'Staining behavior', 'Growth needs', 'Biochemical activity'];
  const genotypeItems = ['PCR target', 'Sequencing', 'Resistance gene', 'Relatedness signal', 'Taxonomy update'];
  const agreementItems = ['Organism identity', 'Outbreak signal', 'Resistance clue', 'Clinical context'];

  return (
    <figure className="learn-classification-map" aria-labelledby="classification-map-title">
      <div className="learn-classification-map-stage" role="img" aria-labelledby="classification-map-title classification-map-desc">
        <svg viewBox="0 0 920 470" preserveAspectRatio="xMidYMid meet">
          <title id="classification-map-title">Microbial classification evidence map</title>
          <desc id="classification-map-desc">
            A two-column evidence board comparing phenotype and genotype, converging on stronger organism
            identification when evidence and clinical context agree.
          </desc>
          <defs>
            <marker id="classification-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <text className="classification-title" x="48" y="46">Classification uses evidence, not one clue</text>
          <text className="classification-subtitle" x="48" y="68">Phenotype shows behavior. Genotype shows blueprint. Context keeps both honest.</text>

          <g className="classification-column phenotype">
            <rect x="62" y="104" width="270" height="230" rx="9" />
            <text className="classification-column-title" x="92" y="140">Phenotype</text>
            <text className="classification-column-subtitle" x="92" y="162">what the organism shows</text>
            {phenotypeItems.map((item, index) => (
              <g className="classification-list-item" key={item}>
                <circle cx="96" cy={198 + index * 27} r="5" />
                <text x="114" y={202 + index * 27}>{item}</text>
              </g>
            ))}
          </g>

          <g className="classification-column genotype">
            <rect x="588" y="104" width="270" height="230" rx="9" />
            <text className="classification-column-title" x="618" y="140">Genotype</text>
            <text className="classification-column-subtitle" x="618" y="162">what the organism carries</text>
            {genotypeItems.map((item, index) => (
              <g className="classification-list-item" key={item}>
                <circle cx="622" cy={198 + index * 27} r="5" />
                <text x="640" y={202 + index * 27}>{item}</text>
              </g>
            ))}
          </g>

          <line className="classification-arrow" x1="334" y1="218" x2="402" y2="238" markerEnd="url(#classification-arrow)" />
          <line className="classification-arrow" x1="586" y1="218" x2="518" y2="238" markerEnd="url(#classification-arrow)" />

          <g className="classification-center-card">
            <rect x="386" y="196" width="148" height="120" rx="9" />
            <text x="460" y="232">Best ID</text>
            <text x="460" y="254">confidence</text>
            <text className="classification-center-detail" x="460" y="284">when evidence agrees</text>
          </g>

          <g className="classification-context-card">
            <rect x="192" y="374" width="536" height="54" rx="8" />
            <text className="classification-context-title" x="220" y="398">Clinical context check</text>
            {agreementItems.map((item, index) => (
              <text className="classification-context-item" x={390 + index * 112} y="398" key={item}>{item}</text>
            ))}
            <text className="classification-context-note" x="220" y="418">A detected trait or gene still has to fit the specimen, syndrome, and lab question.</text>
          </g>
        </svg>
        <div className="learn-visual-signature" aria-hidden="true">
          Learn Microbes | learnmicrobes.com
        </div>
      </div>
      <figcaption>
        Classification is strongest when visible behavior, genetic evidence, and the patient/specimen story point in the same direction.
      </figcaption>
    </figure>
  );
};

export const LearnHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<LearnFilter[]>([]);
  const [openCategories, setOpenCategories] = useState(() => new Set(['Foundations', 'Clinical Lab Principles']));
  const { completedTopicSlugs, progressRows } = useLearnProgress();
  const { masteredTopicSet } = useMasteredTopics();
  const completedTopicSet = progressRows.length > 0 ? completedTopicSlugs : masteredTopicSet;

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredTopics = useMemo(() => learnTopics.filter((topic) => {
    const badges = getTopicBadges(topic);
    const matchesFilters = activeFilters.length === 0 || activeFilters.every((filter) => badges.includes(filter));
    const searchableText = [
      topic.title,
      topic.summary,
      topic.category,
      topic.whyItMatters,
      topic.principle,
      ...topic.keywords,
      ...badges
    ].join(' ').toLowerCase();
    const matchesSearch = normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);

    return matchesFilters && matchesSearch;
  }), [activeFilters, normalizedSearch]);

  const topicsByCategory = useMemo(() => (
    categoryOrder.map((category) => ({
      category,
      topics: filteredTopics.filter((topic) => topic.category === category)
    })).filter((group) => group.topics.length > 0)
  ), [filteredTopics]);

  const libraryStats = useMemo(() => {
    const tableCount = learnTopics.reduce((total, topic) => total + (topic.tables?.length ?? 0), 0);

    return [
      { label: 'Study areas', value: topicsByCategory.length },
      { label: 'Topics', value: learnTopics.length },
      { label: 'Reference tables', value: tableCount }
    ];
  }, [topicsByCategory.length]);

  const toggleFilter = (filter: LearnFilter) => {
    setActiveFilters((current) => (
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter]
    ));
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  };

  const getCategoryProgress = useCallback((category: string) => {
    const categoryTopics = learnTopics.filter((topic) => topic.category === category);
    const masteredCount = categoryTopics.filter((topic) => completedTopicSet.has(topic.slug)).length;
    const totalCount = categoryTopics.length;

    return {
      masteredCount,
      totalCount,
      percent: totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0
    };
  }, [completedTopicSet]);

  const openStudyArea = (category: string) => {
    setOpenCategories((current) => {
      if (current.has(category)) {
        return current;
      }

      const next = new Set(current);
      next.add(category);
      return next;
    });

    window.requestAnimationFrame(() => {
      document.getElementById(slugify(category))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  const hasActiveRefinement = normalizedSearch.length > 0 || activeFilters.length > 0;

  useEffect(() => {
    if (!hasActiveRefinement) {
      return;
    }

    setOpenCategories((current) => {
      const next = new Set(current);
      let changed = false;

      topicsByCategory.forEach((group) => {
        if (!next.has(group.category)) {
          next.add(group.category);
          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [hasActiveRefinement, topicsByCategory]);

  useEffect(() => {
    document.title = 'Learn Microbiology Basics | Learn Microbes';
  }, []);

  return (
    <div className="learn-shell">
      <header className="learn-hero">
        <span className="learn-kicker">Learning Library</span>
        <h1>Clinical microbiology, organized for learning.</h1>
        <p>
          Browse the study library by foundations, methods, organism groups, diagnostic reasoning, and exam-heavy comparison tables.
        </p>
        <div className="learn-library-stats" aria-label="Learn library summary">
          {libraryStats.map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
        </div>
      </header>

      <section className="learn-start-panel" aria-labelledby="learn-start-title">
        <div>
          <span className="learn-section-label">Begin Learning</span>
          <h2 id="learn-start-title">Begin learning with the foundations.</h2>
          <p>
            Start with taxonomy and bacterial structure before jumping into stains, media, and organism comparisons.
          </p>
        </div>
        <Link className="learn-primary-link" to="/learn/microbial-taxonomy">
          Start foundations
        </Link>
      </section>

      <section className="learn-path-panel" aria-labelledby="learn-path-title">
        <div className="learn-path-heading">
          <span className="learn-section-label">Study paths</span>
          <h2 id="learn-path-title">Pick the doorway that matches today.</h2>
        </div>
        <div className="learn-path-grid">
          {studyPaths.map((path) => (
            <Link className="learn-path-card" to={path.path} key={path.label}>
              <span>{path.label}</span>
              <strong>{path.title}</strong>
              <small>{path.description}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="learn-discovery-panel" aria-labelledby="learn-discovery-title">
        <div className="learn-discovery-heading">
          <div>
            <span className="learn-section-label">Find a topic</span>
            <h2 id="learn-discovery-title">Search or filter the library</h2>
          </div>
          {hasActiveRefinement && (
            <button
              type="button"
              className="learn-clear-filters"
              onClick={() => {
                setSearchTerm('');
                setActiveFilters([]);
              }}
            >
              Clear
            </button>
          )}
        </div>
        <label className="learn-search-box">
          <span className="learn-sr-only">Search Learn topics</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search topics, methods, organisms, or study traps"
          />
        </label>
        <div className="learn-filter-chips" aria-label="Filter Learn topics">
          {filterOptions.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilters.includes(filter) ? 'active' : ''}
              onClick={() => toggleFilter(filter)}
              aria-pressed={activeFilters.includes(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="learn-result-count">
          Showing {filteredTopics.length} of {learnTopics.length} topics
        </p>
      </section>

      <section className="learn-book-map" aria-labelledby="learn-book-map-title">
        <span className="learn-section-label">Study order</span>
        <h2 id="learn-book-map-title">Browse by study area</h2>
        <div className="learn-book-map-grid">
          {topicsByCategory.map((group) => {
            const meta = learningLaneMeta[group.category];
            const categoryProgress = getCategoryProgress(group.category);

            return (
              <button
                key={group.category}
                type="button"
                onClick={() => openStudyArea(group.category)}
                aria-expanded={openCategories.has(group.category)}
                aria-controls={`${slugify(group.category)}-topic-list`}
              >
                <span>Area {meta.number}</span>
                <strong>{group.category}</strong>
                <small>{group.topics.length} topic{group.topics.length === 1 ? '' : 's'}</small>
                <span className="learn-area-progress" aria-label={`${categoryProgress.masteredCount} of ${categoryProgress.totalCount} topics mastered`}>
                  <i style={{ width: `${categoryProgress.percent}%` }} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="learn-category-list">
        {topicsByCategory.map((group) => {
          const isCategoryOpen = openCategories.has(group.category);
          const categoryProgress = getCategoryProgress(group.category);

          return (
            <section
              className="learn-category"
              key={group.category}
              id={slugify(group.category)}
              aria-labelledby={`${group.category}-learn-title`}
            >
            <div
              className="learn-category-heading"
              role="button"
              tabIndex={0}
              onClick={() => toggleCategory(group.category)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleCategory(group.category);
                }
              }}
              aria-expanded={isCategoryOpen}
              aria-controls={`${slugify(group.category)}-topic-list`}
            >
              <span className="learn-lane-number" aria-label={`Study area ${learningLaneMeta[group.category].number}`}>
                <small>Study</small>
                <strong>{learningLaneMeta[group.category].number}</strong>
              </span>
              <div>
                <span className="learn-section-label">{group.category}</span>
                <h2 id={`${group.category}-learn-title`}>{group.category}</h2>
                <p>{learningLaneMeta[group.category].description}</p>
                <div className="learn-category-progress" aria-label={`${categoryProgress.masteredCount} of ${categoryProgress.totalCount} topics mastered in ${group.category}`}>
                  <span>
                    {categoryProgress.masteredCount}/{categoryProgress.totalCount} mastered
                  </span>
                  <i>
                    <b style={{ width: `${categoryProgress.percent}%` }} />
                  </i>
                </div>
              </div>
              <span className="learn-category-toggle" aria-hidden="true">
                {isCategoryOpen ? 'Collapse' : 'Expand'}
              </span>
            </div>

            {isCategoryOpen && (
              <div className="learn-lane-list" id={`${slugify(group.category)}-topic-list`}>
                {group.topics.map((topic, topicIndex) => (
                  <Link className={`learn-topic-card ${completedTopicSet.has(topic.slug) ? 'mastered' : ''}`} to={`/learn/${topic.slug}`} key={topic.slug}>
                    <span>{learningLaneMeta[group.category].number}-{String(topicIndex + 1).padStart(2, '0')}</span>
                    <div className="learn-topic-card-body">
                      <h3>
                        {topic.title}
                        {completedTopicSet.has(topic.slug) && <small className="learn-mastered-check" aria-label="Completed">✓</small>}
                      </h3>
                      <p>{topic.summary}</p>
                      <div className="learn-topic-badges" aria-label={`${topic.title} study tags`}>
                        {getTopicBadges(topic).map((badge) => (
                          <small key={badge}>{badge}</small>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          );
        })}
      </div>
    </div>
  );
};

export const LearnArticle: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const topic = getLearnTopicBySlug(slug);
  const { masteredTopicSet, toggleMasteredTopic } = useMasteredTopics();
  const { bookmarkError, isBookmarked, toggleBookmark } = useBookmarks();
  const {
    isTopicCompleted,
    markTopicStarted,
    progressError,
    setTopicCompleted
  } = useLearnProgress();
  const [bookmarkStatusMessage, setBookmarkStatusMessage] = useState('');
  const [progressStatusMessage, setProgressStatusMessage] = useState('');
  const isTopicMastered = topic ? isTopicCompleted(topic.slug) || masteredTopicSet.has(topic.slug) : false;
  const isTopicBookmarked = topic ? isBookmarked('learn', topic.slug) : false;

  useEffect(() => {
    document.title = topic ? `${topic.title} | Learn Microbes` : 'Learn Topic Not Found | Learn Microbes';
  }, [topic]);

  useEffect(() => {
    if (!topic || !user) {
      return;
    }

    markTopicStarted({
      topicSlug: topic.slug,
      topicTitle: topic.title,
      topicCategory: topic.category,
      topicPath: `/learn/${topic.slug}`
    });
  }, [markTopicStarted, topic, user]);

  const articleVisuals = useMemo(() => (
    topic ? getLearnArticleVisuals(topic) : []
  ), [topic]);
  const hasTaxonomyMap = topic?.slug === 'microbial-taxonomy';
  const hasBacterialBiologyMap = topic?.slug === 'bacterial-structure-genetics-metabolism';
  const hasHostInteractionMap = topic?.slug === 'host-microorganism-interactions';
  const hasClassificationEvidenceMap = topic?.slug === 'microbial-classification-criteria';

  const articleSections = useMemo(() => {
    if (!topic) {
      return [];
    }

    return [
      { id: 'core-idea', label: 'Core idea' },
      { id: 'principle', label: 'Principle' },
      ...(hasTaxonomyMap ? [{ id: 'taxonomy-map', label: 'Taxonomy map' }] : []),
      ...(hasBacterialBiologyMap ? [{ id: 'bacterial-biology-map', label: 'Biology map' }] : []),
      ...(hasHostInteractionMap ? [{ id: 'host-interaction-map', label: 'Interaction map' }] : []),
      ...(hasClassificationEvidenceMap ? [{ id: 'classification-evidence-map', label: 'Evidence map' }] : []),
      ...(articleVisuals.length > 0 ? [{ id: 'visual-reactions', label: 'Visual reactions' }] : []),
      ...(topic.tables?.map((table) => ({ id: `table-${slugify(table.title)}`, label: table.title })) ?? []),
      { id: 'basic-workflow', label: 'Basic workflow' },
      { id: 'how-to-read-it', label: 'How to read it' },
      { id: 'common-mistakes', label: 'Common mistakes' },
      { id: 'student-shortcut', label: 'Student shortcut' },
      ...(articleVisuals.length > 0 ? [{ id: 'related-bench-cards', label: 'Bench cards' }] : []),
      { id: 'related-reading', label: 'Related reading' }
    ];
  }, [
    topic,
    articleVisuals.length,
    hasTaxonomyMap,
    hasBacterialBiologyMap,
    hasHostInteractionMap,
    hasClassificationEvidenceMap
  ]);

  const isBeginnerStart = topic?.slug === 'clinical-microbiology';
  const relatedVisuals = articleVisuals;
  const studyPosition = useMemo(() => {
    if (!topic) {
      return null;
    }

    const categoryTopics = learnTopics.filter((item) => item.category === topic.category);
    const topicIndex = categoryTopics.findIndex((item) => item.slug === topic.slug);
    const categoryIndex = categoryOrder.indexOf(topic.category);
    const meta = learningLaneMeta[topic.category];

    return {
      categoryTopics,
      topicIndex,
      topicNumber: topicIndex + 1,
      topicTotal: categoryTopics.length,
      areaNumber: meta?.number ?? String(categoryIndex + 1).padStart(2, '0'),
      previousTopic: topicIndex > 0 ? categoryTopics[topicIndex - 1] : null,
      nextTopic: topicIndex < categoryTopics.length - 1 ? categoryTopics[topicIndex + 1] : null,
      categorySlug: slugify(topic.category)
    };
  }, [topic]);

  if (!topic) {
    return (
      <div className="learn-shell">
        <section className="learn-not-found">
          <span className="learn-kicker">Learn</span>
          <h1>Topic not found</h1>
          <p>This basics page is not available yet.</p>
          <button type="button" onClick={() => navigate('/learn')}>Back to Learn</button>
        </section>
      </div>
    );
  }

  const handleBookmarkClick = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setBookmarkStatusMessage('');

    const result = await toggleBookmark({
      itemType: 'learn',
      itemSlug: topic.slug,
      itemTitle: topic.title,
      itemPath: `/learn/${topic.slug}`,
      itemSummary: topic.summary
    });

    setBookmarkStatusMessage(result.message);
  };

  const handleProgressClick = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setProgressStatusMessage('');

    const shouldMarkComplete = !isTopicMastered;
    const result = await setTopicCompleted({
      topicSlug: topic.slug,
      topicTitle: topic.title,
      topicCategory: topic.category,
      topicPath: `/learn/${topic.slug}`
    }, shouldMarkComplete);

    if (result.ok && shouldMarkComplete && !masteredTopicSet.has(topic.slug)) {
      toggleMasteredTopic(topic.slug);
    }

    if (result.ok && !shouldMarkComplete && masteredTopicSet.has(topic.slug)) {
      toggleMasteredTopic(topic.slug);
    }

    setProgressStatusMessage(result.message);
  };

  return (
    <article className="learn-shell learn-article">
      <nav className="learn-breadcrumb" aria-label="Breadcrumb">
        <Link to="/learn">Learn</Link>
        <span>/</span>
        <span>{topic.title}</span>
      </nav>

      <header className="learn-article-hero">
        <span className="learn-kicker">Microbiology Notes / {topic.category}</span>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
        <div className="learn-article-actions">
          <button
            type="button"
            className={`learn-master-toggle ${isTopicMastered ? 'mastered' : ''}`}
            onClick={handleProgressClick}
            aria-pressed={isTopicMastered}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            {user ? (isTopicMastered ? 'Completed' : 'Mark Complete') : 'Sign in to Track Progress'}
          </button>
          <button
            type="button"
            className={`learn-bookmark-toggle ${isTopicBookmarked ? 'saved' : ''}`}
            onClick={handleBookmarkClick}
            aria-pressed={isTopicBookmarked}
          >
            <FontAwesomeIcon icon={faBookmark} />
            {user ? (isTopicBookmarked ? 'Saved Bookmark' : 'Save Bookmark') : 'Sign in to Bookmark'}
          </button>
        </div>
        {(progressStatusMessage || progressError || bookmarkStatusMessage || bookmarkError) && (
          <p className={`learn-bookmark-status ${(progressError || bookmarkError) ? 'error' : ''}`} role={(progressError || bookmarkError) ? 'alert' : 'status'}>
            {progressError || bookmarkError || progressStatusMessage || bookmarkStatusMessage}
          </p>
        )}
      </header>

      {studyPosition && (
        <nav className="learn-sequence-panel" aria-label={`${topic.category} topic navigation`}>
          <div className="learn-sequence-status">
            <span className="learn-section-label">Study Area {studyPosition.areaNumber}</span>
            <strong>{topic.category}</strong>
            <small>
              Topic {studyPosition.topicNumber} of {studyPosition.topicTotal}
            </small>
          </div>
          <div className="learn-sequence-pager">
            {studyPosition.previousTopic ? (
              <Link className="learn-arrow-link previous" to={`/learn/${studyPosition.previousTopic.slug}`}>
                <small>← Previous</small>
                <strong>{studyPosition.previousTopic.title}</strong>
              </Link>
            ) : (
              <Link className="learn-arrow-link previous" to={`/learn#${studyPosition.categorySlug}`}>
                <small>← Back to area</small>
                <strong>{topic.category}</strong>
              </Link>
            )}
            <Link className="learn-area-chip" to={`/learn#${studyPosition.categorySlug}`}>
              All {topic.category} topics
            </Link>
            {studyPosition.nextTopic ? (
              <Link className="learn-arrow-link next" to={`/learn/${studyPosition.nextTopic.slug}`}>
                <small>Next →</small>
                <strong>{studyPosition.nextTopic.title}</strong>
              </Link>
            ) : (
              <Link className="learn-arrow-link next" to="/learn">
                <small>Finished area →</small>
                <strong>Back to Learn</strong>
              </Link>
            )}
          </div>
        </nav>
      )}

      {isBeginnerStart && (
        <section className="learn-beginner-guide" aria-labelledby="learn-beginner-guide-title">
          <div className="learn-beginner-intro">
            <span className="learn-section-label">Begin Learning</span>
            <h2 id="learn-beginner-guide-title">Your first-pass microbiology path</h2>
            <p>
              Use this page as the starting bench sequence. Read the first lesson, follow the flow, then move through the twelve core steps without trying to memorize every organism at once.
            </p>
          </div>

          <div className="learn-bench-flow" aria-label="Specimen to answer bench flow">
            <svg viewBox="0 0 760 170" role="img" aria-labelledby="bench-flow-title bench-flow-desc">
              <title id="bench-flow-title">Beginner bench flow</title>
              <desc id="bench-flow-desc">A simple flow from specimen to safety, direct clue, culture condition, branch test, and interpretation.</desc>
              <defs>
                <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              {['Specimen', 'Safety', 'Direct clue', 'Culture', 'First split', 'Meaning'].map((label, index) => {
                const x = 18 + index * 123;
                return (
                  <g key={label}>
                    <rect x={x} y="42" width="104" height="64" rx="6" />
                    <text x={x + 52} y="68">{label}</text>
                    <text x={x + 52} y="88">{index + 1}</text>
                    {index < 5 && <line x1={x + 106} y1="74" x2={x + 119} y2="74" markerEnd="url(#flow-arrow)" />}
                  </g>
                );
              })}
              <text className="flow-caption" x="380" y="140">Do not jump to the name until the specimen, method, and clinical fit make sense.</text>
            </svg>
            <div className="learn-visual-signature" aria-hidden="true">
              Learn Microbes | learnmicrobes.com
            </div>
          </div>

          <div className="learn-beginner-grid">
            <div className="learn-beginner-panel">
              <h3>Core lesson sequence</h3>
              <div className="learn-beginner-steps">
                {beginnerLessonPath.map((lesson) => (
                  <Link key={lesson.step} to={lesson.path}>
                    <span>{lesson.step}</span>
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="learn-beginner-panel">
              <h3>Self-checks</h3>
              <div className="learn-self-checks">
                {beginnerSelfChecks.map((check) => (
                  <details key={check.prompt}>
                    <summary>{check.prompt}</summary>
                    <p>{check.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {isBeginnerStart && (
        <AlphaValidationCTA
          location="clinical_bench_reference"
          title="Help validate the clinical bench reference path"
          body="Tell us whether this starting path matches your class, rotation, or exam prep, and whether saved progress or bookmarks would help."
        />
      )}

      <div className="learn-article-layout">
        <aside className="learn-topic-nav" aria-labelledby="learn-topic-nav-title">
          <span className="learn-section-label" id="learn-topic-nav-title">On this page</span>
          <div>
            {articleSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </div>
        </aside>

        <div className="learn-reference-sheet">
        <section className="learn-note-section" id="core-idea">
          <h2>Core idea</h2>
          <p>{topic.whyItMatters}</p>
        </section>

        <section className="learn-note-section" id="principle">
          <h2>Principle</h2>
          <p>{topic.principle}</p>
        </section>

        {hasTaxonomyMap && (
          <section className="learn-note-section learn-taxonomy-section" id="taxonomy-map">
            <h2>Taxonomy map</h2>
            <TaxonomyMapVisual />
          </section>
        )}

        {hasBacterialBiologyMap && (
          <section className="learn-note-section learn-bacterial-section" id="bacterial-biology-map">
            <h2>Biology map</h2>
            <BacterialBiologyMapVisual />
          </section>
        )}

        {hasHostInteractionMap && (
          <section className="learn-note-section learn-host-section" id="host-interaction-map">
            <h2>Interaction map</h2>
            <HostInteractionMapVisual />
          </section>
        )}

        {hasClassificationEvidenceMap && (
          <section className="learn-note-section learn-classification-section" id="classification-evidence-map">
            <h2>Evidence map</h2>
            <ClassificationEvidenceMapVisual />
          </section>
        )}

        {articleVisuals.length > 0 && (
          <section className="learn-note-section learn-visual-section" id="visual-reactions">
            <h2>Visual reactions</h2>
            <div className="learn-mini-visual-grid">
              {articleVisuals.slice(0, 2).map((page) => (
                <MiniAtlasVisual key={page.slug} page={page} />
              ))}
            </div>
          </section>
        )}

        {topic.tables?.map((table) => (
          <section className="learn-note-section learn-table-section" id={`table-${slugify(table.title)}`} key={table.title}>
            <h2>{table.title}</h2>
            <div className="learn-table-scroll">
              <table className="learn-reference-table">
                <thead>
                  <tr>
                    {table.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={`${table.title}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${table.title}-${rowIndex}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.note && <p className="learn-table-note">{table.note}</p>}
          </section>
        ))}

        <section className="learn-note-section" id="basic-workflow">
          <h2>Basic workflow</h2>
          <ol>
            {topic.basicSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="learn-note-section" id="how-to-read-it">
          <h2>How to read it</h2>
          <ul>
            {topic.interpretation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="learn-note-section learn-mistakes" id="common-mistakes">
          <h2>
            <span className="learn-warning-badge">High-yield trap</span>
            Common mistakes
          </h2>
          <ul>
            {topic.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="learn-note-section learn-shortcut" id="student-shortcut">
          <h2>
            <span className="learn-shortcut-pin">Shortcut</span>
            Student shortcut
          </h2>
          <p>{topic.studentShortcut}</p>
        </section>

        {relatedVisuals.length > 0 && (
          <section className="learn-note-section learn-bench-card-links" id="related-bench-cards">
            <h2>Related bench cards</h2>
            <div className="learn-related-stack">
              {relatedVisuals.map((page) => (
                <Link key={page.slug} to={`/visuals/${page.slug}`}>{page.title}</Link>
              ))}
            </div>
          </section>
        )}

        <section className="learn-note-section learn-related-reading" id="related-reading">
          <h2>Related reading</h2>
          <div className="learn-related-stack">
            {topic.relatedLinks.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>
        </section>

        {studyPosition && (
          <nav className="learn-bottom-sequence" aria-label="Next and previous Learn topics">
            {studyPosition.previousTopic ? (
              <Link className="previous" to={`/learn/${studyPosition.previousTopic.slug}`}>
                <small>← Previous topic</small>
                <strong>{studyPosition.previousTopic.title}</strong>
              </Link>
            ) : (
              <Link className="previous" to={`/learn#${studyPosition.categorySlug}`}>
                <small>← Back to study area</small>
                <strong>{topic.category}</strong>
              </Link>
            )}
            {studyPosition.nextTopic ? (
              <Link className="next" to={`/learn/${studyPosition.nextTopic.slug}`}>
                <small>Next topic →</small>
                <strong>{studyPosition.nextTopic.title}</strong>
              </Link>
            ) : (
              <Link className="next" to="/learn">
                <small>Finished this area →</small>
                <strong>Back to Learn</strong>
              </Link>
            )}
          </nav>
        )}
        </div>
      </div>
    </article>
  );
};
