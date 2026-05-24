import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faArrowRight,
  faBan,
  faClipboardCheck,
  faFlaskVial,
  faShieldHalved,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DoNotRoutineCulture.css';

export type EscalationLevel = 'stop' | 'special' | 'refer';

export type EscalationCard = {
  id: string;
  organism: string;
  level: EscalationLevel;
  trigger: string;
  doInstead: string[];
  avoid: string[];
  studentPearl: string;
  relatedPath?: string;
};

export const escalationCards: EscalationCard[] = [
  {
    id: 'brucella',
    organism: 'Brucella spp.',
    level: 'stop',
    trigger: 'Small Gram-negative coccobacilli, slow growth, blood culture signal, animal/dairy exposure, or unexplained fever.',
    doInstead: [
      'Notify supervisor and follow local biosafety/reference-lab workflow.',
      'Use serology, blood culture handling rules, MALDI restrictions, or molecular confirmation per policy.',
      'Minimize aerosol-generating manipulation.'
    ],
    avoid: ['Open bench workup', 'Sniffing plates', 'Routine biochemical panels', 'Heavy colony manipulation'],
    studentPearl: 'Brucella is a classic “stop and escalate” organism because lab exposure risk is high.',
    relatedPath: '/guides?guide=brucella'
  },
  {
    id: 'francisella',
    organism: 'Francisella tularensis',
    level: 'stop',
    trigger: 'Tiny Gram-negative coccobacilli with cysteine requirement, poor routine growth, ulceroglandular disease, tick/rabbit exposure, or pneumonia.',
    doInstead: [
      'Escalate before additional manipulation.',
      'Use reference-lab confirmation, serology, PCR, or specialized culture handling.',
      'Treat suspicious isolates as high-risk until ruled out.'
    ],
    avoid: ['Routine bench ID', 'Extra subculture', 'Aerosol-producing procedures', 'Uncontained plate handling'],
    studentPearl: 'If the story is tiny GNR plus cysteine and exposure, do not try to “finish the ID” at the routine bench.',
    relatedPath: '/guides?guide=francisella'
  },
  {
    id: 'coxiella',
    organism: 'Coxiella burnetii',
    level: 'refer',
    trigger: 'Culture-negative pneumonia, hepatitis, endocarditis, or Q fever exposure such as livestock birthing products or aerosols.',
    doInstead: [
      'Use phase I/phase II serology and molecular testing when appropriate.',
      'Interpret acute versus chronic disease by serologic phase pattern.',
      'Use exposure history and timing rather than routine culture.'
    ],
    avoid: ['Routine bacterial culture expectation', 'Biochemical identification', 'Ignoring exposure history'],
    studentPearl: 'Coxiella is usually a serology/PCR diagnosis, not a plate-workup organism.',
    relatedPath: '/guides?guide=obligate-intracellular-nonculturable-agents'
  },
  {
    id: 'chlamydia',
    organism: 'Chlamydia / Chlamydophila',
    level: 'refer',
    trigger: 'Urogenital syndrome, neonatal conjunctivitis/pneumonia, trachoma, or atypical pneumonia pattern with negative routine culture.',
    doInstead: [
      'Use NAAT for common genital disease.',
      'Use serology or specialized reference methods for selected systemic/respiratory questions.',
      'Match specimen site to syndrome.'
    ],
    avoid: ['Routine bacterial culture', 'Gram stain-based exclusion', 'Beta-lactam logic as the main diagnostic clue'],
    studentPearl: 'Intracellular organisms do not behave like colony-forming routine bacteria.',
    relatedPath: '/guides?guide=obligate-intracellular-nonculturable-agents'
  },
  {
    id: 'rickettsia',
    organism: 'Rickettsia / Ehrlichia / Anaplasma',
    level: 'refer',
    trigger: 'Tick exposure with fever, rash, eschar, cytopenias, transaminitis, or morulae concern.',
    doInstead: [
      'Use serology with timing awareness and paired sera when needed.',
      'Use PCR early in selected cases and specimen types.',
      'Treat urgent clinical suspicion seriously even before confirmatory serology matures.'
    ],
    avoid: ['Routine culture', 'Waiting for a single early negative serology to exclude disease', 'Forcing into Gram stain roadmaps'],
    studentPearl: 'For tick-borne intracellular agents, timing is part of the test result.',
    relatedPath: '/syndrome-diagnostic-path'
  },
  {
    id: 'treponema',
    organism: 'Treponema pallidum',
    level: 'special',
    trigger: 'Genital ulcer, rash, congenital concern, or neurologic/ocular syndrome compatible with syphilis.',
    doInstead: [
      'Use nontreponemal and treponemal serology algorithms.',
      'Use darkfield or lesion NAAT only when available and appropriate.',
      'Use CSF testing only for specific neurologic/ocular indications.'
    ],
    avoid: ['Routine culture', 'Gram stain exclusion', 'Using one serologic test without understanding the algorithm'],
    studentPearl: 'T. pallidum is diagnosed by direct detection in selected lesions or by serologic algorithms, not routine culture.',
    relatedPath: '/guides?guide=spirochetes'
  },
  {
    id: 'mycoplasma-ureaplasma',
    organism: 'Mycoplasma / Ureaplasma',
    level: 'special',
    trigger: 'Atypical pneumonia, persistent urethritis/cervicitis, pregnancy/neonatal concern, or tiny colonies on special media.',
    doInstead: [
      'Use NAAT for M. genitalium and many respiratory/genital workflows.',
      'Use specialized media only when culture is actually indicated.',
      'Remember intrinsic beta-lactam resistance because there is no cell wall.'
    ],
    avoid: ['Gram stain exclusion', 'Routine blood/chocolate agar expectation', 'Cell wall-active susceptibility assumptions'],
    studentPearl: 'No cell wall means poor Gram stain value and no beta-lactam target.',
    relatedPath: '/guides?guide=mycoplasma-ureaplasma'
  },
  {
    id: 'mtb',
    organism: 'Mycobacterium tuberculosis suspicion',
    level: 'stop',
    trigger: 'AFB-positive smear, chronic cough, cavitary disease, compatible sterile-site findings, or MTB complex NAAT concern.',
    doInstead: [
      'Use airborne and mycobacteriology biosafety workflow.',
      'Use AFB smear, mycobacterial culture, NAAT, and susceptibility pathway.',
      'Avoid unnecessary manipulation outside approved containment.'
    ],
    avoid: ['Routine bacterial culture workup', 'Open bench manipulation', 'Treating AFB as ordinary Gram-positive rods'],
    studentPearl: 'AFB concern changes the workflow: safety, mycobacterial culture, molecular testing, and susceptibility planning.',
    relatedPath: '/guides?guide=mycobacteria'
  }
];

const levelCopy: Record<EscalationLevel, { label: string; className: string }> = {
  stop: { label: 'Stop routine bench work', className: 'level-stop' },
  special: { label: 'Use special method', className: 'level-special' },
  refer: { label: 'Reference / nonroutine workflow', className: 'level-refer' }
};

const filters: Array<{ label: string; value: 'all' | EscalationLevel }> = [
  { label: 'All', value: 'all' },
  { label: 'Stop routine bench work', value: 'stop' },
  { label: 'Special method', value: 'special' },
  { label: 'Reference workflow', value: 'refer' }
];

const DoNotRoutineCulture: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | EscalationLevel>('all');

  const visibleCards = useMemo(() => (
    activeFilter === 'all'
      ? escalationCards
      : escalationCards.filter((card) => card.level === activeFilter)
  ), [activeFilter]);

  return (
    <div className="do-not-culture-page">
      <header className="do-not-culture-hero">
        <div>
          <span className="do-not-culture-kicker">Safety and diagnostic logic</span>
          <h1>Do not routine culture these the usual way.</h1>
          <p>
            Some organisms should not be forced through normal plate, Gram stain, and biochemical workflows.
            Use this page to recognize when to stop, escalate, or switch to NAAT, serology, special culture, or reference testing.
          </p>
        </div>
        <div className="do-not-culture-hero-card">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <strong>Bench instinct</strong>
          <span>When the organism or syndrome is high-risk, the best next test may be no more routine manipulation.</span>
        </div>
      </header>

      <section className="do-not-culture-rule">
        <div>
          <FontAwesomeIcon icon={faShieldHalved} />
          <span>Escalate high-risk isolates</span>
          <p>Brucella, Francisella, MTB suspicion, and similar patterns need local biosafety rules before extra work.</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faFlaskVial} />
          <span>Choose the right method</span>
          <p>NAAT, serology, special media, AFB workflow, or reference testing may answer the question better than culture.</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faClipboardCheck} />
          <span>Use syndrome and exposure</span>
          <p>Tick, animal, freshwater, sexual, respiratory, and pregnancy clues often decide the diagnostic path.</p>
        </div>
      </section>

      <div className="do-not-culture-filters" aria-label="Escalation filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={activeFilter === filter.value ? 'active' : ''}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="do-not-culture-grid" aria-label="Do not routine culture organisms">
        {visibleCards.map((card) => {
          const level = levelCopy[card.level];

          return (
            <article className="do-not-culture-card" key={card.id}>
              <div className="do-not-culture-card-header">
                <div>
                  <span className={`culture-level ${level.className}`}>
                    <FontAwesomeIcon icon={card.level === 'stop' ? faBan : faShieldHalved} />
                    {level.label}
                  </span>
                  <h2>{card.organism}</h2>
                </div>
                {card.relatedPath && (
                  <button
                    type="button"
                    className="culture-open-link"
                    onClick={() => navigate(card.relatedPath as string)}
                    aria-label={`Open related ${card.organism} learning path`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div>

              <div className="culture-trigger">
                <span>Recognize it when</span>
                <p>{card.trigger}</p>
              </div>

              <div className="culture-card-columns">
                <div>
                  <h3>Do instead</h3>
                  <ul>
                    {card.doInstead.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Avoid</h3>
                  <ul>
                    {card.avoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="culture-pearl">{card.studentPearl}</p>
            </article>
          );
        })}
      </section>

      <footer className="do-not-culture-footer">
        <button type="button" onClick={() => navigate('/special-pathogens')}>
          Special Pathogens Hub
        </button>
        <button type="button" onClick={() => navigate('/syndrome-diagnostic-path')}>
          Syndrome to Diagnostic Path
        </button>
      </footer>
    </div>
  );
};

export default DoNotRoutineCulture;
