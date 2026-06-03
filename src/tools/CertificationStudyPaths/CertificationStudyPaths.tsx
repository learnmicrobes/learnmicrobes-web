import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faArrowLeft,
  faCheck,
  faFlaskVial,
  faPlay,
  faRoute,
  faTrophy,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlphaValidationCTA from '../../components/AlphaValidationCTA/AlphaValidationCTA';
import { trackEvent } from '../../utils/analytics';
import StudyQuiz from '../StudyQuiz/StudyQuiz';
import type { StudyQuizCategory, StudyQuizDifficulty } from '../StudyQuiz/StudyQuiz';
import './CertificationStudyPaths.css';

type ExamPath = {
  badge: string;
  title: string;
  audience: string;
  focus: string[];
};

type StudyArea = {
  id: string;
  title: string;
  status: 'Covered' | 'Partial' | 'Coming soon';
  highYield: string;
  quizCategory: StudyQuizCategory;
  quizDifficulty: StudyQuizDifficulty;
  mFocus: string;
  smFocus: string;
  tools: { label: string; path: string }[];
};

type QuizTarget = {
  title: string;
  category: StudyQuizCategory;
  difficulty: StudyQuizDifficulty;
};

const COMPLETION_STORAGE_KEY = 'learnmicrobes_cert_path_completed_steps';

const examPaths: ExamPath[] = [
  {
    badge: 'M',
    title: 'M(ASCP) Scientist in Microbiology',
    audience: 'Best first path for students, new microbiology learners, exam takers, and new bench professionals.',
    focus: [
      'Core organism identification',
      'Specimen and culture workflow',
      'Test principles and expected reactions',
      'Foundational mycology, parasitology, virology, and molecular methods'
    ]
  },
  {
    badge: 'SM',
    title: 'SM(ASCP) Specialist in Microbiology',
    audience: 'Advanced path for experienced microbiology professionals building specialist-level depth.',
    focus: [
      'Advanced interpretation and troubleshooting',
      'Method limits, validation, QC, and safety',
      'Consultation-level organism and syndrome patterns',
      'Laboratory operations and administration depth'
    ]
  }
];

const studyAreas: StudyArea[] = [
  {
    id: 'preanalytic-safety',
    title: 'Preanalytic + Safety',
    status: 'Covered',
    highYield: 'Start here',
    quizCategory: 'preanalytics',
    quizDifficulty: 'beginner',
    mFocus: 'Specimen quality, rejection logic, transport, setup, and basic safety choices.',
    smFocus: 'Escalation decisions, exposure risk, workflow policy, and consult-level specimen guidance.',
    tools: [
      { label: 'Syndrome Path', path: '/syndrome-diagnostic-path' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
    ]
  },
  {
    id: 'bacteriology',
    title: 'Bacteriology',
    status: 'Covered',
    highYield: 'Largest exam lane',
    quizCategory: 'bacteriology',
    quizDifficulty: 'intermediate',
    mFocus: 'Gram stain, colony morphology, common biochemical tests, and routine organism branches.',
    smFocus: 'Fastidious organisms, unusual patterns, mixed cultures, resistance clues, and advanced workup strategy.',
    tools: [
      { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
      { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
      { label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' },
      { label: 'Biochemical Tests', path: '/biochemical-tests' }
    ]
  },
  {
    id: 'mycobacteriology',
    title: 'Mycobacteriology + Nocardia',
    status: 'Partial',
    highYield: 'Safety heavy',
    quizCategory: 'mycobacteriology',
    quizDifficulty: 'intermediate',
    mFocus: 'AFB logic, safety, stains, culture basics, and when molecular methods matter.',
    smFocus: 'MTB/NTM interpretation, slow growth pitfalls, rule-out safety, and reference testing decisions.',
    tools: [
      { label: 'Special Pathogens Hub', path: '/special-pathogens' },
      { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
      { label: 'Guides', path: '/guides?guide=mycobacteria' }
    ]
  },
  {
    id: 'mycology',
    title: 'Mycology',
    status: 'Partial',
    highYield: 'Morphology traps',
    quizCategory: 'mycology',
    quizDifficulty: 'intermediate',
    mFocus: 'Yeast and mold basics, morphology language, dimorphic clues, and clinically important patterns.',
    smFocus: 'Advanced mold ID, antifungal interpretation, reference decisions, and uncommon organism patterns.',
    tools: [
      { label: 'Guides', path: '/guides?guide=fungal-identification-overview' },
      { label: 'Search', path: '/search' }
    ]
  },
  {
    id: 'parasitology',
    title: 'Parasitology',
    status: 'Partial',
    highYield: 'Image recognition',
    quizCategory: 'parasitology',
    quizDifficulty: 'intermediate',
    mFocus: 'Specimen choice, ova and parasite methods, blood parasite basics, and high-yield organism recognition.',
    smFocus: 'Advanced life-cycle interpretation, uncommon parasites, method limitations, and consult support.',
    tools: [
      { label: 'Guides', path: '/guides?guide=parasitology-lab-methods-overview' },
      { label: 'Search', path: '/search' }
    ]
  },
  {
    id: 'virology',
    title: 'Virology',
    status: 'Partial',
    highYield: 'Method selection',
    quizCategory: 'virology',
    quizDifficulty: 'intermediate',
    mFocus: 'Syndrome-based method selection, antigen/NAAT/serology basics, and result timing.',
    smFocus: 'Complex interpretation, viral load/resistance context, transplant patterns, and molecular limits.',
    tools: [
      { label: 'Guides', path: '/guides?guide=virology-methods-and-strategies' },
      { label: 'Syndrome Path', path: '/syndrome-diagnostic-path' }
    ]
  },
  {
    id: 'molecular',
    title: 'Molecular Microbiology',
    status: 'Partial',
    highYield: 'Know when to use it',
    quizCategory: 'virology',
    quizDifficulty: 'advanced',
    mFocus: 'NAAT principles, direct detection, resistance targets, and when molecular testing beats culture.',
    smFocus: 'Validation, contamination control, result limitations, and advanced interpretation.',
    tools: [
      { label: 'Guides', path: '/guides?guide=nucleic-acid-based-analysis' },
      { label: 'Special Pathogens Hub', path: '/special-pathogens' }
    ]
  },
  {
    id: 'lab-operations-qc',
    title: 'Lab Operations + QC',
    status: 'Partial',
    highYield: 'Easy points if organized',
    quizCategory: 'postanalytics',
    quizDifficulty: 'advanced',
    mFocus: 'Quality control basics, test performance, safety, instrumentation, and workflow awareness.',
    smFocus: 'Quality management, validation, risk management, personnel, budget, and administration topics.',
    tools: [
      { label: 'Biochemical Tests', path: '/biochemical-tests' },
      { label: 'Study Quiz', path: '/study-quiz' }
    ]
  }
];

const statusClass = (status: StudyArea['status']) => status.toLowerCase().replace(/\s+/g, '-');

const readCompletedSteps = () => {
  try {
    const saved = localStorage.getItem(COMPLETION_STORAGE_KEY);
    return saved ? JSON.parse(saved) as string[] : [];
  } catch {
    return [];
  }
};

type PathHeaderProps = {
  completedCount: number;
  totalCount: number;
  onOpenDiagnostic: () => void;
};

const PathHeader: React.FC<PathHeaderProps> = ({
  completedCount,
  totalCount,
  onOpenDiagnostic
}) => {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      <header className="cert-path-header">
        <div className="cert-path-header-actions">
          <button type="button" onClick={onOpenDiagnostic} className="cert-path-diagnostic-btn">
            <FontAwesomeIcon icon={faRoute} />
            Find my start
          </button>
        </div>
        <span className="cert-path-kicker">Certification study paths</span>
        <h1>M first, SM later: build your microbiology study map by exam goal.</h1>
        <p>
          Use this alpha pathway to connect ASCP microbiology content areas to Learn Microbes tools. Start with
          M(ASCP) if you are a student or new learner, then quiz each weak area before moving on.
        </p>
      </header>
      <div className="cert-path-sticky-progress" aria-label="Certification study path progress">
        <div className="cert-path-progress-copy">
          <span>Certification Study Paths</span>
          <strong>{completedCount}/{totalCount} reviewed | {progressPercent}%</strong>
        </div>
        <div
          className="cert-path-progress"
          role="progressbar"
          aria-label={`${completedCount} of ${totalCount} study areas reviewed`}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-valuenow={completedCount}
        >
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </>
  );
};

type PathCardProps = {
  area: StudyArea;
  completed: boolean;
  highlighted: boolean;
  onNavigate: (path: string) => void;
  onQuiz: () => void;
  onComplete: (area: StudyArea) => void;
};

const PathCard: React.FC<PathCardProps> = ({ area, completed, highlighted, onNavigate, onQuiz, onComplete }) => (
  <article
    id={`cert-card-${area.id}`}
    className={`cert-area-card ${completed ? 'completed' : ''} ${highlighted ? 'return-highlight' : ''}`}
    tabIndex={-1}
  >
    <div className="cert-area-card-top">
      <div>
        <span className="cert-high-yield-badge">{area.highYield}</span>
        <h3>{area.title}</h3>
      </div>
      <div className="cert-area-status-stack">
        {completed && (
          <span className="cert-complete-tick" aria-label={`${area.title} area reviewed`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        )}
        <span className={`cert-status ${statusClass(area.status)}`}>{area.status}</span>
      </div>
    </div>
    <div className="cert-level-columns">
      <div>
        <span>M(ASCP) must know</span>
        <p>{area.mFocus}</p>
      </div>
      <div>
        <span>SM(ASCP) depth</span>
        <p>{area.smFocus}</p>
      </div>
    </div>
    <div className="cert-tool-links" aria-label={`${area.title} Learn Microbes tools`}>
      {area.tools.map((tool) => (
        <button key={`${area.title}-${tool.label}`} type="button" onClick={() => onNavigate(tool.path)}>
          {tool.label}
        </button>
      ))}
    </div>
    <div className="cert-card-actions">
      <button
        type="button"
        className="cert-quiz-btn"
        onClick={onQuiz}
        aria-label={`Quiz this area: ${area.title}`}
      >
        <FontAwesomeIcon icon={faPlay} />
        Quiz this area
      </button>
      <button
        type="button"
        className="cert-complete-btn"
        onClick={() => onComplete(area)}
        aria-pressed={completed}
      >
        <FontAwesomeIcon icon={completed ? faCheck : faFlaskVial} />
        {completed ? 'Reviewed' : 'Mark reviewed'}
      </button>
    </div>
  </article>
);

type MiniDiagnosticModalProps = {
  onClose: () => void;
  onChoose: (area: StudyArea) => void;
};

const MiniDiagnosticModal: React.FC<MiniDiagnosticModalProps> = ({ onClose, onChoose }) => (
  <div className="cert-modal-backdrop" role="presentation">
    <section className="cert-mini-modal" role="dialog" aria-modal="true" aria-labelledby="cert-mini-diagnostic-title">
      <div className="cert-modal-header">
        <div>
          <span className="cert-path-kicker">Mini diagnostic</span>
          <h2 id="cert-mini-diagnostic-title">Pick your starting weakness</h2>
        </div>
        <button type="button" className="cert-path-icon-btn" onClick={onClose} aria-label="Close mini diagnostic">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="cert-diagnostic-options">
        {[
          { label: 'Specimen setup, rejection, safety', areaId: 'preanalytic-safety' },
          { label: 'Gram stain to organism ID', areaId: 'bacteriology' },
          { label: 'Fungi, parasites, viruses, AFB', areaId: 'mycology' }
        ].map((option) => {
          const area = studyAreas.find((item) => item.id === option.areaId) ?? studyAreas[0];
          return (
            <button key={option.areaId} type="button" onClick={() => onChoose(area)}>
              <span>{option.label}</span>
              <strong>Start with {area.title}</strong>
            </button>
          );
        })}
      </div>
    </section>
  </div>
);

const CertificationStudyPaths: React.FC = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => readCompletedSteps());
  const [quizTarget, setQuizTarget] = useState<QuizTarget | null>(null);
  const [activeAreaId, setActiveAreaId] = useState('');
  const [highlightedAreaId, setHighlightedAreaId] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const completedSet = useMemo(() => new Set(completedSteps), [completedSteps]);
  const allAreasReviewed = completedSteps.length >= studyAreas.length;

  useEffect(() => {
    trackEvent('certification_path_opened', {
      page: 'certification_study_paths'
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(COMPLETION_STORAGE_KEY, JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    document.body.classList.toggle('cert-quiz-modal-open', Boolean(quizTarget));

    return () => {
      document.body.classList.remove('cert-quiz-modal-open');
    };
  }, [quizTarget]);

  useEffect(() => {
    if (!quizTarget && !isDiagnosticOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (quizTarget) {
        closeQuizModal();
        return;
      }

      setIsDiagnosticOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDiagnosticOpen, quizTarget]);

  const handleComplete = (area: StudyArea) => {
    setCompletedSteps((steps) => {
      const nextSteps = steps.includes(area.id)
        ? steps.filter((step) => step !== area.id)
        : [...steps, area.id];
      const didComplete = !steps.includes(area.id);
      setAnnouncement(`${area.title} ${didComplete ? 'marked reviewed' : 'marked not reviewed'}.`);
      return nextSteps;
    });
  };

  const returnToArea = (areaId: string) => {
    if (!areaId) {
      return;
    }

    window.setTimeout(() => {
      const card = document.getElementById(`cert-card-${areaId}`);
      setHighlightedAreaId(areaId);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card?.focus({ preventScroll: true });
    }, 80);
    window.setTimeout(() => setHighlightedAreaId(''), 2200);
  };

  function closeQuizModal() {
    const returnAreaId = activeAreaId;
    setQuizTarget(null);
    setAnnouncement('Returned to your certification study path.');
    returnToArea(returnAreaId);
  }

  const handleQuiz = (area: StudyArea) => {
    const target = {
      title: area.title,
      category: area.quizCategory,
      difficulty: area.quizDifficulty
    };

    setActiveAreaId(area.id);
    setQuizTarget(target);
    setAnnouncement(`Quiz opened for ${target.title}.`);
  };

  const handleDiagnosticChoose = (area: StudyArea) => {
    setIsDiagnosticOpen(false);
    setAnnouncement(`Suggested starting step: ${area.title}.`);
    returnToArea(area.id);
  };

  return (
    <div className="cert-path-page">
      <div className="cert-path-live-region" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <PathHeader
        completedCount={completedSteps.length}
        totalCount={studyAreas.length}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
      />

      {allAreasReviewed && (
        <section className="cert-streak-badge" aria-label="Certification path streak complete">
          <FontAwesomeIcon icon={faTrophy} />
          <div>
            <span>Path cleared</span>
            <strong>Leaderboard-ready streak</strong>
          </div>
          <button type="button" onClick={() => navigate('/study-quiz')}>
            Future premium leaderboard
          </button>
        </section>
      )}

      <section className="cert-path-choice" aria-label="Choose your certification path">
        {examPaths.map((path) => (
          <article className="cert-exam-card" key={path.badge}>
            <span className="cert-exam-badge">{path.badge}</span>
            <h2>{path.title}</h2>
            <p>{path.audience}</p>
            <ul>
              {path.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="cert-path-how" aria-labelledby="cert-path-how-title">
        <div>
          <span className="cert-path-kicker">How to use it</span>
          <h2 id="cert-path-how-title">Study in passes, not piles.</h2>
          <p>
            First pass: cover the M-level core. Second pass: use weak areas and SM notes to deepen interpretation,
            troubleshooting, and lab operations. Every content card now pushes you toward a quiz rep.
          </p>
        </div>
        <div className="cert-path-steps">
          <span>1. Open a weak content area</span>
          <span>2. Use linked tools and reading pages</span>
          <span>3. Quiz, then mark the area reviewed</span>
        </div>
      </section>

      <section className="cert-area-section" aria-labelledby="cert-area-title">
        <div className="cert-area-heading">
          <span className="cert-path-kicker">Interactive content map</span>
          <h2 id="cert-area-title">Shared study areas, different depth.</h2>
          <p>
            Coverage labels are intentionally honest for alpha. Some areas already have strong tools; others need
            dedicated practice sets and deeper visual ID work.
          </p>
        </div>

        <div className="cert-area-grid">
          {studyAreas.map((area) => (
            <PathCard
              key={area.id}
              area={area}
              completed={completedSet.has(area.id)}
              highlighted={highlightedAreaId === area.id}
              onNavigate={navigate}
              onQuiz={() => handleQuiz(area)}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </section>

      <section className="cert-source-note" aria-label="Certification source note">
        <h2>Official-outline note</h2>
        <p>
          This page is a Learn Microbes study organizer, not an official ASCP product. Always verify eligibility,
          content guidelines, and reading lists with ASCP before scheduling an exam.
        </p>
        <div>
          <a
            href="https://ascpcontentwebsite.blob.core.windows.net/boccontent/docs/default-source/explore-credentials/content-guidelines/ascp_ascpi_m_sm_content_guideline2eefb50b-d1b5-4206-9347-7f21af63bf1d.pdf?sfvrsn=b3fa9d78_1"
            target="_blank"
            rel="noopener noreferrer"
          >
            ASCP M/SM content guideline
          </a>
          <a href="https://www.ascp.org/boc/explore-credentials/view-all-credentials/M" target="_blank" rel="noopener noreferrer">
            M(ASCP) credential
          </a>
          <a href="https://www.ascp.org/boc/explore-credentials/view-all-credentials/SM" target="_blank" rel="noopener noreferrer">
            SM(ASCP) credential
          </a>
        </div>
      </section>

      <AlphaValidationCTA
        location="certification_study_paths"
        title="Help validate certification study paths"
        body="Tell us which exam path you are studying for, which areas feel missing, and whether saved progress or bookmarks would help your review."
      />

      {quizTarget && (
        <div className="cert-modal-backdrop quiz" role="presentation" onClick={closeQuizModal}>
          <section
            className="cert-quiz-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-quiz-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div>
                <span className="cert-path-kicker">Quiz this area</span>
                <h2 id="cert-quiz-modal-title">{quizTarget.title}</h2>
                <p>{quizTarget.category} / {quizTarget.difficulty}</p>
              </div>
            </div>
            <div className="cert-quiz-modal-actions">
              <button type="button" className="cert-back-to-path-btn" onClick={closeQuizModal}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to study path
              </button>
              <button type="button" className="cert-open-full-quiz-btn" onClick={() => navigate('/study-quiz')}>
                Open full quiz page
              </button>
            </div>
            <p className="cert-return-note">
              Returning will bring you back to the {quizTarget.title} card.
            </p>
            <div className="cert-quiz-shell">
              <StudyQuiz
                embedded
                initialCategory={quizTarget.category}
                initialDifficulty={quizTarget.difficulty}
              />
            </div>
          </section>
        </div>
      )}

      {isDiagnosticOpen && (
        <MiniDiagnosticModal
          onClose={() => setIsDiagnosticOpen(false)}
          onChoose={handleDiagnosticChoose}
        />
      )}
    </div>
  );
};

export default CertificationStudyPaths;
