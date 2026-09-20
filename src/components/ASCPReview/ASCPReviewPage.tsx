import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
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

// Accents are study-module categories from the design system.
const studyModules = [
  {
    icon: faRoute,
    title: 'M(ASCP) microbiology study path',
    body: 'Map ASCP microbiology content areas into manageable study passes for bacteriology, mycology, parasitology, virology, mycobacteriology, safety, and lab operations.',
    path: '/certification-study-paths',
    action: 'Open study path',
    accent: 'var(--teal-600)'
  },
  {
    icon: faFlaskVial,
    title: 'High-yield biochemical tests',
    body: 'Review reactions, expected results, QC organisms, and interpretation traps for common clinical microbiology bench tests. Covers oxidase, catalase, coagulase, urease, indole, and key selective media used at the bench.',
    path: '/biochemical-tests',
    action: 'Review tests',
    accent: 'var(--lm-biochem)'
  },
  {
    icon: faClipboardList,
    title: 'Clinical microbiology study quiz',
    body: 'Practice exam-style recall with saved quiz history, weak-area review, and category filters for focused ASCP microbiology review.',
    path: '/study-quiz',
    action: 'Start quiz',
    accent: 'var(--sage-600)'
  },
  {
    icon: faImages,
    title: 'Visual Atlas bench cards',
    body: 'Use visual cards for reactions, bench readouts, and common traps that are easier to remember when you can picture the result.',
    path: '/visuals',
    action: 'Browse visuals',
    accent: 'var(--lm-gram-neg)'
  }
];

const reviewSteps = [
  'Start with broad clinical microbiology foundations before drilling rare organisms.',
  'Build organism ID workflows around Gram stain, colony clues, and branch-point tests.',
  'Turn missed quiz categories into the next review block instead of rereading everything.',
  'Use official ASCP materials for eligibility, content guidelines, and exam policy details.'
];

const reviewLoopSteps = [
  { icon: faBookOpen, number: '1', title: 'Foundations', detail: 'Gram stain logic' },
  { icon: faFlaskVial, number: '2', title: 'Bench tests', detail: 'QC and reactions' },
  { icon: faRoute, number: '3', title: 'Organism ID', detail: 'Roadmaps' },
  { icon: faClipboardList, number: '4', title: 'Quiz reps', detail: 'Saved misses' }
];

const searchIntents = [
  { icon: faBookOpen, label: 'M(ASCP) microbiology study path', path: '/learn/ascp-m-microbiology-study-path' },
  { icon: faRoute, label: 'Gram-positive organism ID review', path: '/gram-positive-roadmap' },
  { icon: faRoute, label: 'Gram-negative organism ID review', path: '/gram-negative-roadmap' },
  { icon: faShieldHalved, label: 'Safety and special-pathogen traps', path: '/do-not-routine-culture' },
  { icon: faBookOpen, label: 'Mycology and fungal ID review', path: '/learn#mycology' },
  { icon: faBookOpen, label: 'Parasitology review', path: '/learn#parasitology' },
  { icon: faMagnifyingGlass, label: 'Search all Learn Microbes review content', path: '/search' }
];

const ASCPReviewPage: React.FC = () => (
  <div className="ascp-review-page">
    <section className="ascp-hero" aria-labelledby="ascp-review-title">
      <div className="ascp-hero-copy">
        <span className="lm-kicker lm-kicker--on-dark">Built for the boards</span>
        <h1 id="ascp-review-title">Clinical microbiology review for MLS students and M(ASCP) prep.</h1>
        <p>
          Learn Microbes organizes microbiology study around bench logic: organism identification, biochemical tests,
          safety escalation, visual readouts, and quiz reps. Use this page as a practical ASCP microbiology review
          hub while you prepare for M(ASCP), MLS coursework, or clinical bench onboarding.
        </p>
      </div>
      <div className="ascp-hero-actions">
        <Link className="lm-btn lm-btn--on-dark lm-btn--block" to="/certification-study-paths">
          <FontAwesomeIcon icon={faTrophy} aria-hidden="true" />
          Start ASCP study path
        </Link>
        <Link className="lm-btn lm-btn--ghost-dark lm-btn--block" to="/study-quiz">
          <FontAwesomeIcon icon={faClipboardList} aria-hidden="true" />
          Practice questions
        </Link>
      </div>
    </section>

    <section className="ascp-loop" aria-labelledby="ascp-flow-title">
      <span className="lm-kicker">Study loop map</span>
      <h2 id="ascp-flow-title">Study, quiz, then target the miss.</h2>
      <ol className="ascp-loop-grid">
        {reviewLoopSteps.map((step) => (
          <li className="ascp-loop-step" key={step.title}>
            <span className="ascp-loop-marker" aria-hidden="true">
              <span>{step.number}</span>
              <FontAwesomeIcon icon={step.icon} />
            </span>
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>
      <div className="lm-callout lm-callout--info ascp-loop-callout">
        <span className="lm-callout-eyebrow">Weak-area loop</span>
        <p>Missed questions become the next review block, so every session is more targeted than the last.</p>
      </div>
    </section>

    <section className="ascp-modules" aria-labelledby="ascp-review-modules-title">
      <span className="lm-kicker">Study modules</span>
      <h2 id="ascp-review-modules-title">Start with the highest-yield routes.</h2>
      <div className="ascp-module-grid">
        {studyModules.map((module) => (
          <Link
            key={module.title}
            to={module.path}
            className="ascp-module lm-tinted"
            style={{ '--lm-accent': module.accent } as React.CSSProperties}
          >
            <span className="lm-icon-sq" aria-hidden="true">
              <FontAwesomeIcon icon={module.icon} />
            </span>
            <span className="ascp-module-copy">
              <strong>{module.title}</strong>
              <small>{module.body}</small>
              <span className="ascp-module-action">
                {module.action}
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>

    <section className="ascp-strategy" aria-labelledby="ascp-review-how-title">
      <div className="ascp-strategy-panel lm-panel">
        <div>
          <span className="lm-kicker">Review strategy</span>
          <h2 id="ascp-review-how-title">Use Learn Microbes as a study loop, not just a reference list.</h2>
          <p>
            Passing ASCP-style microbiology review is not only memorizing organisms. The higher-yield move is learning
            how specimens, stains, reactions, safety cues, and reporting decisions connect. That is the study pattern
            this platform is being built around.
          </p>
        </div>
        <ol className="ascp-strategy-steps">
          {reviewSteps.map((step) => (
            <li key={step}>
              <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="ascp-intents" aria-labelledby="ascp-search-intent-title">
      <span className="lm-kicker">Common search goals</span>
      <h2 id="ascp-search-intent-title">If you are searching for ASCP microbiology review, start here.</h2>
      <div className="ascp-intent-list">
        {searchIntents.map((intent) => (
          <Link key={intent.path} to={intent.path}>
            <FontAwesomeIcon icon={intent.icon} aria-hidden="true" />
            {intent.label}
          </Link>
        ))}
      </div>
    </section>

    <section className="ascp-disclaimer" aria-label="ASCP relationship note">
      <div className="lm-callout">
        <span className="lm-callout-eyebrow">Independent educational review</span>
        <p>
          Learn Microbes is not an official ASCP product and does not replace ASCP content guidelines, eligibility rules,
          or exam policies. Use official ASCP resources for final exam requirements.
        </p>
      </div>
    </section>
  </div>
);

export default ASCPReviewPage;
