import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faCheckCircle,
  faClipboardList,
  faFlaskVial,
  faImages,
  faMagnifyingGlass,
  faRoute,
  faShieldHalved,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import './ASCPReviewPage.css';

const studyModules = [
  {
    icon: faRoute,
    title: 'M(ASCP) microbiology study path',
    body: 'Map ASCP microbiology content areas into manageable study passes for bacteriology, mycology, parasitology, virology, mycobacteriology, safety, and lab operations.',
    path: '/certification-study-paths',
    action: 'Open study path'
  },
  {
    icon: faFlaskVial,
    title: 'High-yield biochemical tests',
    body: 'Review reactions, expected results, QC organisms, and interpretation traps for common clinical microbiology bench tests. Covers oxidase, catalase, coagulase, urease, indole, and key selective media used at the bench.',
    path: '/biochemical-tests',
    action: 'Review tests'
  },
  {
    icon: faClipboardList,
    title: 'Clinical microbiology study quiz',
    body: 'Practice exam-style recall with saved quiz history, weak-area review, and category filters for focused ASCP microbiology review.',
    path: '/study-quiz',
    action: 'Start quiz'
  },
  {
    icon: faImages,
    title: 'Visual Atlas bench cards',
    body: 'Use visual cards for reactions, bench readouts, and common traps that are easier to remember when you can picture the result.',
    path: '/visuals',
    action: 'Browse visuals'
  }
];

const reviewSteps = [
  'Start with broad clinical microbiology foundations before drilling rare organisms.',
  'Build organism ID workflows around Gram stain, colony clues, and branch-point tests.',
  'Turn missed quiz categories into the next review block instead of rereading everything.',
  'Use official ASCP materials for eligibility, content guidelines, and exam policy details.'
];

const ASCPReviewPage: React.FC = () => (
  <div className="ascp-review-page">
    <section className="ascp-review-hero" aria-labelledby="ascp-review-title">
      <div className="ascp-review-copy">
        <span className="ascp-review-kicker">ASCP microbiology review</span>
        <h1 id="ascp-review-title">Clinical microbiology review for MLS students and M(ASCP) prep.</h1>
        <p>
          Learn Microbes organizes microbiology study around bench logic: organism identification, biochemical tests,
          safety escalation, visual readouts, and quiz reps. Use this page as a practical ASCP microbiology review
          hub while you prepare for M(ASCP), MLS coursework, or clinical bench onboarding.
        </p>
        <p className="ascp-review-audience">
          Built for MLS students, MT/MLS candidates, and bench techs preparing for the M(ASCP) exam.
        </p>
        <div className="ascp-review-actions">
          <Link to="/certification-study-paths">
            <FontAwesomeIcon icon={faTrophy} />
            Start ASCP study path
          </Link>
          <Link to="/study-quiz">
            <FontAwesomeIcon icon={faClipboardList} />
            Practice questions
          </Link>
        </div>
      </div>

      <div className="ascp-review-flow" aria-label="ASCP microbiology review flow">
        <svg viewBox="0 0 420 320" role="img" aria-labelledby="ascp-flow-title ascp-flow-desc">
          <title id="ascp-flow-title">Learn Microbes ASCP microbiology review flow</title>
          <desc id="ascp-flow-desc">A numbered study loop from foundations through reactions, organism ID, quiz practice, and weak-area review.</desc>
          <rect x="18" y="20" width="384" height="260" rx="12" className="ascp-flow-paper" />
          <circle cx="210" cy="150" r="72" className="ascp-flow-loop" />
          <path d="M269 105 C296 131 296 169 269 195" className="ascp-flow-arrow" />
          <path d="M151 195 C124 169 124 131 151 105" className="ascp-flow-arrow" />
          <g className="ascp-flow-node">
            <rect x="42" y="52" width="130" height="58" rx="8" />
            <circle cx="66" cy="81" r="14" />
            <text x="66" y="86" textAnchor="middle" className="ascp-flow-number">1</text>
            <text x="92" y="76">Foundations</text>
            <text x="92" y="94">Gram stain logic</text>
          </g>
          <g className="ascp-flow-node">
            <rect x="248" y="52" width="130" height="58" rx="8" />
            <circle cx="272" cy="81" r="14" />
            <text x="272" y="86" textAnchor="middle" className="ascp-flow-number">2</text>
            <text x="298" y="76">Bench tests</text>
            <text x="298" y="94">QC + reactions</text>
          </g>
          <g className="ascp-flow-node">
            <rect x="42" y="190" width="130" height="58" rx="8" />
            <circle cx="66" cy="219" r="14" />
            <text x="66" y="224" textAnchor="middle" className="ascp-flow-number">3</text>
            <text x="92" y="214">Organism ID</text>
            <text x="92" y="232">Roadmaps</text>
          </g>
          <g className="ascp-flow-node">
            <rect x="248" y="190" width="130" height="58" rx="8" />
            <circle cx="272" cy="219" r="14" />
            <text x="272" y="224" textAnchor="middle" className="ascp-flow-number">4</text>
            <text x="298" y="214">Quiz reps</text>
            <text x="298" y="232">Saved misses</text>
          </g>
          <g className="ascp-flow-center">
            <rect x="133" y="122" width="154" height="56" rx="8" />
            <text x="210" y="145" textAnchor="middle">Weak-area loop</text>
            <text x="210" y="164" textAnchor="middle">review next</text>
          </g>
          <text x="210" y="302" textAnchor="middle" className="ascp-flow-watermark">Learn Microbes | learnmicrobes.com</text>
        </svg>
        <p className="ascp-flow-caption">
          The weak-area loop routes your missed questions back into focused review — so every quiz session makes your next one more targeted.
        </p>
      </div>
    </section>

    <section className="ascp-review-panel" aria-labelledby="ascp-review-how-title">
      <div>
        <span className="ascp-review-kicker">Review strategy</span>
        <h2 id="ascp-review-how-title">Use Learn Microbes as a study loop, not just a reference list.</h2>
        <p>
          Passing ASCP-style microbiology review is not only memorizing organisms. The higher-yield move is learning
          how specimens, stains, reactions, safety cues, and reporting decisions connect. That is the study pattern
          this platform is being built around.
        </p>
      </div>
      <ol className="ascp-review-steps">
        {reviewSteps.map((step) => (
          <li key={step}>
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>

    <section className="ascp-review-modules" aria-labelledby="ascp-review-modules-title">
      <div className="ascp-review-section-heading">
        <span className="ascp-review-kicker">Study modules</span>
        <h2 id="ascp-review-modules-title">Start with the highest-yield review routes.</h2>
      </div>
      <div className="ascp-review-module-grid">
        {studyModules.map((module) => (
          <article key={module.title}>
            <span className="ascp-review-icon" aria-hidden="true">
              <FontAwesomeIcon icon={module.icon} />
            </span>
            <h3>{module.title}</h3>
            <p>{module.body}</p>
            <Link to={module.path}>{module.action}</Link>
          </article>
        ))}
      </div>
    </section>

    <section className="ascp-review-search-intent" aria-labelledby="ascp-search-intent-title">
      <div>
        <span className="ascp-review-kicker">Common search goals</span>
        <h2 id="ascp-search-intent-title">If you are searching for ASCP microbiology review, start here.</h2>
      </div>
      <div className="ascp-review-intent-list">
        <Link to="/learn/ascp-m-microbiology-study-path">
          <FontAwesomeIcon icon={faBookOpen} />
          M(ASCP) microbiology study path
        </Link>
        <Link to="/gram-positive-roadmap">
          <FontAwesomeIcon icon={faRoute} />
          Gram-positive organism ID review
        </Link>
        <Link to="/gram-negative-roadmap">
          <FontAwesomeIcon icon={faRoute} />
          Gram-negative organism ID review
        </Link>
        <Link to="/do-not-routine-culture">
          <FontAwesomeIcon icon={faShieldHalved} />
          Safety and special-pathogen traps
        </Link>
        <Link to="/learn#mycology">
          <FontAwesomeIcon icon={faBookOpen} />
          Mycology and fungal ID review
        </Link>
        <Link to="/learn#parasitology">
          <FontAwesomeIcon icon={faBookOpen} />
          Parasitology review
        </Link>
        <Link to="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Search all Learn Microbes review content
        </Link>
      </div>
    </section>

    <section className="ascp-review-disclaimer" aria-label="ASCP relationship note">
      <strong>Independent educational review.</strong>
      <p>
        Learn Microbes is not an official ASCP product and does not replace ASCP content guidelines, eligibility rules,
        or exam policies. Use official ASCP resources for final exam requirements.
      </p>
    </section>
  </div>
);

export default ASCPReviewPage;
