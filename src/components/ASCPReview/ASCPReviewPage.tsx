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
    body: 'Review reactions, expected results, QC organisms, and interpretation traps for common clinical microbiology bench tests.',
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
          <desc id="ascp-flow-desc">A flow from foundations to bench tests, organism ID, quiz review, and weak-area loop.</desc>
          <rect x="18" y="20" width="384" height="260" rx="10" className="ascp-flow-paper" />
          <path d="M80 92 H330 M330 92 V160 M330 160 H80 M80 160 V226 H330" className="ascp-flow-line" />
          <g>
            <rect x="42" y="60" width="116" height="64" rx="8" className="ascp-flow-card" />
            <text x="100" y="86" textAnchor="middle">Foundations</text>
            <text x="100" y="106" textAnchor="middle">Gram stain logic</text>
          </g>
          <g>
            <rect x="222" y="60" width="116" height="64" rx="8" className="ascp-flow-card" />
            <text x="280" y="86" textAnchor="middle">Bench tests</text>
            <text x="280" y="106" textAnchor="middle">QC + reactions</text>
          </g>
          <g>
            <rect x="42" y="128" width="116" height="64" rx="8" className="ascp-flow-card" />
            <text x="100" y="154" textAnchor="middle">Organism ID</text>
            <text x="100" y="174" textAnchor="middle">Roadmaps</text>
          </g>
          <g>
            <rect x="222" y="128" width="116" height="64" rx="8" className="ascp-flow-card" />
            <text x="280" y="154" textAnchor="middle">Quiz reps</text>
            <text x="280" y="174" textAnchor="middle">Saved history</text>
          </g>
          <g>
            <rect x="132" y="200" width="136" height="64" rx="8" className="ascp-flow-card accent" />
            <text x="200" y="226" textAnchor="middle">Weak-area loop</text>
            <text x="200" y="246" textAnchor="middle">Review next</text>
          </g>
          <text x="210" y="302" textAnchor="middle" className="ascp-flow-watermark">Learn Microbes | learnmicrobes.com</text>
        </svg>
      </div>
    </section>

    <section className="ascp-review-panel" aria-labelledby="ascp-review-how-title">
      <div>
        <span className="ascp-review-kicker">Review strategy</span>
        <h2 id="ascp-review-how-title">Use Learn Microbes as a study loop, not just a reference list.</h2>
        <p>
          Passing ASCP-style microbiology review is not only memorizing organisms. The higher-yield move is learning
          how specimens, stains, reactions, safety cues, and reporting decisions connect. That is the study pattern
          this beta is being built around.
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
