import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faBookOpen,
  faFlaskVial,
  faMicroscope,
  faShieldHalved,
  faVialCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SpecialPathogensHub.css';

type HubCard = {
  id: string;
  title: string;
  subtitle: string;
  guidePath: string;
  testFocus: string[];
  whenToUse: string[];
  organismGroups: string[];
};

const specialPathogenCards: HubCard[] = [
  {
    id: 'anaerobes',
    title: 'Anaerobes',
    subtitle: 'Specimen quality, transport, oxygen tolerance, reduced media, selective plates, and morphology-first workups.',
    guidePath: '/guides?guide=anaerobic-bacteriology-lab-considerations',
    testFocus: ['Anaerobic transport', 'PRAS media', 'Aerotolerance', 'BBE / LKV', 'Special-potency disks'],
    whenToUse: ['Abscess or deep wound', 'Tissue or aspirate', 'Foul drainage', 'Mixed mucosal infection'],
    organismGroups: ['Bacteroides', 'Prevotella / Porphyromonas', 'Fusobacterium', 'Clostridium-like rods', 'Anaerobic cocci']
  },
  {
    id: 'mycobacteria',
    title: 'Mycobacteria',
    subtitle: 'Acid-fast organisms, tuberculosis safety logic, mycobacterial culture, NAAT, Runyon grouping, and NTM clues.',
    guidePath: '/guides?guide=mycobacteria',
    testFocus: ['AFB smear', 'NALC-NaOH', 'LJ / Middlebrook / MGIT', 'MTB NAAT', 'MPT64', 'Runyon'],
    whenToUse: ['Chronic cough', 'AFB concern', 'Sterile-site acid-fast rods', 'Skin or device NTM', 'Poor routine growth'],
    organismGroups: ['MTB complex', 'M. avium complex', 'M. kansasii', 'M. marinum', 'Rapid growers']
  },
  {
    id: 'intracellular',
    title: 'Intracellular and Nonculturable Agents',
    subtitle: 'Culture-negative syndromes where NAAT, serology, tissue stains, paired sera, and exposure history drive testing.',
    guidePath: '/guides?guide=obligate-intracellular-nonculturable-agents',
    testFocus: ['Chlamydia NAAT', 'Rickettsial IFA', 'Vector-borne PCR', 'Morulae smear', 'Coxiella phase serology'],
    whenToUse: ['Tick fever or eschar', 'Bird exposure pneumonia', 'Livestock aerosol exposure', 'Culture-negative genital syndrome'],
    organismGroups: ['Chlamydia', 'Rickettsia / Orientia', 'Ehrlichia / Anaplasma', 'Coxiella', 'Tropheryma']
  },
  {
    id: 'mycoplasma',
    title: 'Mycoplasma and Ureaplasma',
    subtitle: 'Cell wall-deficient bacteria with weak Gram stain value, special media, NAAT-first workflows, and beta-lactam resistance.',
    guidePath: '/guides?guide=mycoplasma-ureaplasma',
    testFocus: ['Specialized culture', 'A7 / A8 agar', 'Glucose / arginine / urea', 'M. genitalium NAAT', 'Resistance markers'],
    whenToUse: ['Atypical pneumonia', 'Persistent urethritis', 'Cervicitis or PID', 'Pregnancy or neonatal context'],
    organismGroups: ['M. pneumoniae', 'M. genitalium', 'M. hominis', 'Ureaplasma urealyticum / parvum']
  },
  {
    id: 'spirochetes',
    title: 'Spirochetes',
    subtitle: 'Thin helical bacteria where syndrome timing, darkfield, serology, NAAT, and exposure history matter most.',
    guidePath: '/guides?guide=spirochetes',
    testFocus: ['Darkfield', 'RPR / VDRL', 'TP-PA / FTA-ABS', 'Lyme two-tier serology', 'Leptospira MAT / PCR'],
    whenToUse: ['Genital ulcer or rash', 'Erythema migrans', 'Relapsing fever', 'Freshwater or animal urine exposure'],
    organismGroups: ['Treponema', 'Borrelia burgdorferi', 'Relapsing fever Borrelia', 'Leptospira']
  }
];

const SpecialPathogensHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="special-pathogens-page">
      <header className="special-pathogens-hero">
        <div>
          <span className="special-pathogens-kicker">Special pathogen navigation</span>
          <h1>When routine roadmap logic is the wrong starting point.</h1>
          <p>
            Use this hub when the organism is anaerobic, acid-fast, intracellular, nonculturable, cell wall-deficient,
            or too thin/fastidious for routine Gram stain and plate logic.
          </p>
        </div>
        <div className="special-pathogens-actions" aria-label="Special pathogen actions">
          <button onClick={() => navigate('/syndrome-diagnostic-path')}>
            <FontAwesomeIcon icon={faVialCircleCheck} />
            Syndrome path
          </button>
          <button onClick={() => navigate('/do-not-routine-culture', { state: { from: 'special-pathogens' } })}>
            <FontAwesomeIcon icon={faShieldHalved} />
            Escalation guide
          </button>
          <button onClick={() => navigate('/study-quiz')}>
            <FontAwesomeIcon icon={faBookOpen} />
            Quiz mode
          </button>
          <button onClick={() => navigate('/unknown-isolate-workup')}>
            <FontAwesomeIcon icon={faMicroscope} />
            Unknown workup
          </button>
          <button onClick={() => navigate('/biochemical-tests')}>
            <FontAwesomeIcon icon={faFlaskVial} />
            Test cards
          </button>
        </div>
      </header>

      <section className="special-pathogens-checkpoints" aria-label="Special pathogen checkpoints">
        <div>
          <FontAwesomeIcon icon={faShieldHalved} />
          <span>Safety first</span>
          <p>Escalate MTB, Brucella, Francisella, Coxiella, and suspicious high-risk patterns before extra manipulation.</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faVialCircleCheck} />
          <span>Specimen decides yield</span>
          <p>Aspirate, tissue, respiratory sediment, lesion swab, blood, serum, urine, and CSF answer different questions.</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faBookOpen} />
          <span>Method over panel</span>
          <p>Choose NAAT, serology, special culture, direct microscopy, or reference testing before routine biochemical panels.</p>
        </div>
      </section>

      <section className="special-pathogens-grid" aria-label="Special pathogen groups">
        {specialPathogenCards.map((card) => (
          <article
            className="special-pathogen-card"
            key={card.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(card.guidePath, { state: { from: 'special-pathogens' } })}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(card.guidePath, { state: { from: 'special-pathogens' } });
              }
            }}
            aria-label={`Open guide for ${card.title}`}
          >
            <div className="special-pathogen-card-header">
              <h2>{card.title}</h2>
            </div>
            <p className="special-pathogen-subtitle">{card.subtitle}</p>

            <div className="special-pathogen-columns">
              <div>
                <h3>When this applies</h3>
                <ul>
                  {card.whenToUse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Methods to think about</h3>
                <ul>
                  {card.testFocus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="special-pathogen-groups">
              <span>Organism groups covered</span>
              {card.organismGroups.join(', ')}
            </p>
            <div className="special-pathogen-card-footer">
              <span>Open guide</span>
              <span className="special-pathogen-arrow">→</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default SpecialPathogensHub;
