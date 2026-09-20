import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBacteria,
  faBacterium,
  faBolt,
  faClipboardList,
  faClockRotateLeft,
  faFileLines,
  faFire,
  faFlaskVial,
  faLayerGroup,
  faMicroscope,
  faRoute,
  faSeedling,
  faShieldHalved,
  faStethoscope,
  faTrophy,
  faVial,
  faVirus,
  faWorm
} from '@fortawesome/free-solid-svg-icons';
import {
  getStudyQuizStats,
  studyQuizCategoryLabels,
  studyQuizDifficultyDescriptions,
  studyQuizDifficultyLabels,
  type StudyQuizCategory,
  type StudyQuizDifficulty
} from '../../tools/StudyQuiz/StudyQuiz';
import { useAuth } from '../../context/AuthContext';
import { useQuizHistory } from '../../hooks/useQuizHistory';
import { trackEvent } from '../../utils/analytics';
import { subjectStainClass } from '../../data/subjectStains';
import './PracticePage.css';

const QUIZ_STORAGE_KEY = 'learnmicrobes_study_quiz_state';
const STREAK_STORAGE_KEY = 'learnmicrobes_study_quiz_streak';
const BEST_STREAK_STORAGE_KEY = 'learnmicrobes_study_quiz_best_streak';

type SavedQuizSnapshot = {
  category: StudyQuizCategory;
  difficulty: StudyQuizDifficulty;
  answeredCount: number;
};

const readNumber = (key: string) => {
  try {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch (error) {
    return 0;
  }
};

const readSavedQuiz = (): SavedQuizSnapshot | null => {
  try {
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as {
      category?: StudyQuizCategory;
      difficulty?: StudyQuizDifficulty;
      answeredIds?: string[];
    };

    const answeredCount = Array.isArray(parsed.answeredIds) ? parsed.answeredIds.length : 0;

    if (answeredCount === 0) {
      return null;
    }

    return {
      category: parsed.category && studyQuizCategoryLabels[parsed.category] ? parsed.category : 'all',
      difficulty: parsed.difficulty && studyQuizDifficultyLabels[parsed.difficulty] ? parsed.difficulty : 'intermediate',
      answeredCount
    };
  } catch (error) {
    return null;
  }
};

const quickStartCategories: StudyQuizCategory[] = [
  'organism-id',
  'bench-tests',
  'bacteriology',
  'safety',
  'mycology',
  'parasitology',
  'preanalytics',
  'virology',
  'mycobacteriology',
  'postanalytics'
];

const categoryIcons: Partial<Record<StudyQuizCategory, IconDefinition>> = {
  'organism-id': faMicroscope,
  'bench-tests': faFlaskVial,
  bacteriology: faBacterium,
  safety: faShieldHalved,
  mycology: faSeedling,
  parasitology: faWorm,
  preanalytics: faVial,
  virology: faVirus,
  mycobacteriology: faBacteria,
  postanalytics: faFileLines
};

type QuickStartTile = {
  category: StudyQuizCategory;
  count: number;
};

const difficultyOrder: StudyQuizDifficulty[] = ['beginner', 'intermediate', 'advanced'];

// Accents are study-mode categories from the design system, not organism subjects.
const studyModes = [
  {
    icon: faClipboardList,
    label: 'Study Quiz',
    detail: 'Exam-style recall with instant explanations, category and difficulty filters, answer streaks, and saved history.',
    path: '/study-quiz',
    action: 'Start a quiz',
    accent: 'var(--sage-600)'
  },
  {
    icon: faLayerGroup,
    label: 'Flashcards',
    detail: 'Flip a card, rate your recall honestly, and anything you miss comes back in a review queue.',
    path: '/flashcards',
    action: 'Start flipping',
    accent: 'var(--lm-biochem)'
  },
  {
    icon: faStethoscope,
    label: 'Case Studies',
    detail: 'Work a specimen from presentation to report, choosing the next move at each bench decision point.',
    path: '/case-study-simulator',
    action: 'Open a case',
    accent: 'var(--lm-gram-pos)'
  },
  {
    icon: faRoute,
    label: 'ASCP Review Hub',
    detail: 'A guided review loop that ties study paths, quizzes, bench references, and visuals into one exam plan.',
    path: '/ascp-microbiology-review',
    action: 'Open review hub',
    accent: 'var(--teal-600)'
  }
];

export default function PracticePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quizAttempts, weakestAreas } = useQuizHistory();
  const [difficulty, setDifficulty] = useState<StudyQuizDifficulty>('intermediate');
  const [savedQuiz, setSavedQuiz] = useState<SavedQuizSnapshot | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const quizStats = useMemo(() => getStudyQuizStats(), []);

  useEffect(() => {
    setSavedQuiz(readSavedQuiz());
    setStreak(readNumber(STREAK_STORAGE_KEY));
    setBestStreak(readNumber(BEST_STREAK_STORAGE_KEY));
  }, []);

  const lastAttempt = quizAttempts[0] ?? null;

  // Biggest areas lead so the grid never opens on a thin category; this re-sorts
  // itself as more of the question bank is published.
  const quickStartTiles = useMemo<QuickStartTile[]>(() => (
    quickStartCategories
      .map((category) => ({
        category,
        count: quizStats.categoryCounts[category as Exclude<StudyQuizCategory, 'all'>] ?? 0
      }))
      .filter((tile) => tile.count > 0)
      .sort((first, second) => second.count - first.count)
  ), [quizStats.categoryCounts]);

  const startQuiz = (category: StudyQuizCategory, source: string) => {
    trackEvent('practice_quick_start', {
      category,
      difficulty,
      source
    });

    navigate(`/study-quiz?category=${category}&difficulty=${difficulty}`);
  };

  return (
    <main className="practice-page">
      <section className="practice-hero" aria-labelledby="practice-title">
        <div className="practice-hero-copy">
          <span className="lm-kicker">Review and practice</span>
          <h1 id="practice-title">Test what you actually remember.</h1>
          <p>
            Active recall for MedTech students, board reviewees, and ASCP prep. Pick an area, answer a
            few questions, and read the explanation for every miss.
          </p>
        </div>
        <div className="practice-hero-stats" aria-label="Practice library summary">
          <div className="lm-stat">
            <span className="lm-stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faClipboardList} /></span>
            <div>
              <strong>{quizStats.totalQuestions.toLocaleString()}</strong>
              <small>Practice questions</small>
            </div>
          </div>
          <div className="lm-stat">
            <span className="lm-stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faLayerGroup} /></span>
            <div>
              <strong>{quickStartTiles.length}</strong>
              <small>Content areas</small>
            </div>
          </div>
        </div>
      </section>

      <section className="practice-resume" aria-labelledby="practice-start-title">
        <div className="practice-resume-panel lm-panel">
          <div className="practice-resume-copy">
            <span className="lm-kicker">
              {savedQuiz ? 'Pick up where you left off' : 'Start here'}
            </span>
            <h2 id="practice-start-title">
              {savedQuiz
                ? `${studyQuizCategoryLabels[savedQuiz.category]} / ${studyQuizDifficultyLabels[savedQuiz.difficulty]}`
                : 'A few questions is enough to start.'}
            </h2>
            <p>
              {savedQuiz
                ? `You have answered ${savedQuiz.answeredCount} question${savedQuiz.answeredCount === 1 ? '' : 's'} in this session. Continue, or choose a different area below.`
                : 'No sign-up needed. Answer one question and you will see how the explanations work.'}
            </p>
            {(streak > 0 || bestStreak > 0 || lastAttempt) && (
              <div className="practice-streak-row" aria-label="Your practice stats">
                {streak > 0 && (
                  <span>
                    <FontAwesomeIcon icon={faFire} aria-hidden="true" />
                    {streak} answer streak
                  </span>
                )}
                {bestStreak > 0 && (
                  <span>
                    <FontAwesomeIcon icon={faTrophy} aria-hidden="true" />
                    Best {bestStreak}
                  </span>
                )}
                {lastAttempt && (
                  <span>
                    <FontAwesomeIcon icon={faClockRotateLeft} aria-hidden="true" />
                    Last score {Math.round(lastAttempt.score_percent)}%
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="practice-resume-actions">
            <Link
              className="lm-btn lm-btn--primary lm-btn--block"
              to={savedQuiz ? '/study-quiz' : `/study-quiz?difficulty=${difficulty}`}
              onClick={() => trackEvent('practice_start_click', { resumed: Boolean(savedQuiz) })}
            >
              {savedQuiz ? 'Resume quiz' : 'Start practicing'}
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </Link>
            {!user && (
              <small>Sign in later to save history and track weak areas.</small>
            )}
          </div>
        </div>
      </section>

      {user && weakestAreas.length > 0 && (
        <section className="practice-weak" aria-labelledby="practice-weak-title">
          <div className="lm-callout lm-callout--gold">
            <span className="lm-callout-eyebrow" id="practice-weak-title">Drill what you keep missing</span>
            <p>Your weakest areas across recent quiz sessions:</p>
            <div className="practice-weak-chips">
              {weakestAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="practice-quick" aria-labelledby="practice-quick-title">
        <div className="practice-quick-heading">
          <h2 id="practice-quick-title">Choose an area to drill</h2>
          <div className="practice-levels" role="group" aria-label="Difficulty level">
            {difficultyOrder.map((level) => (
              <button
                type="button"
                key={level}
                className={difficulty === level ? 'active' : ''}
                onClick={() => setDifficulty(level)}
                aria-pressed={difficulty === level}
                title={studyQuizDifficultyDescriptions[level]}
              >
                {studyQuizDifficultyLabels[level]}
              </button>
            ))}
          </div>
        </div>
        <p className="practice-level-note">{studyQuizDifficultyDescriptions[difficulty]}</p>
        <div className="practice-category-grid">
          {quickStartTiles.map((tile) => {
            const stainClass = subjectStainClass(tile.category);

            return (
              <button
                type="button"
                key={tile.category}
                className={`practice-category lm-tinted ${stainClass}`.trim()}
                style={stainClass ? ({ '--lm-accent': 'var(--stain)' } as React.CSSProperties) : undefined}
                onClick={() => startQuiz(tile.category, 'category_grid')}
              >
                <span className="practice-category-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={categoryIcons[tile.category] ?? faClipboardList} />
                </span>
                <span className="practice-category-copy">
                  <strong>{studyQuizCategoryLabels[tile.category]}</strong>
                  <small>{tile.count} question{tile.count === 1 ? '' : 's'}</small>
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="lm-btn lm-btn--secondary practice-mix"
          onClick={() => startQuiz('all', 'mixed_button')}
        >
          <FontAwesomeIcon icon={faBolt} aria-hidden="true" />
          Mix every area ({quizStats.totalQuestions.toLocaleString()} questions)
        </button>
      </section>

      <section className="practice-modes" aria-labelledby="practice-tools-title">
        <h2 id="practice-tools-title">Full study modes</h2>
        <div className="practice-mode-grid">
          {studyModes.map((mode) => (
            <Link
              className="practice-mode lm-tinted"
              to={mode.path}
              key={mode.path}
              style={{ '--lm-accent': mode.accent } as React.CSSProperties}
            >
              <span className="lm-icon-sq" aria-hidden="true">
                <FontAwesomeIcon icon={mode.icon} />
              </span>
              <span className="practice-mode-copy">
                <strong>{mode.label}</strong>
                <small>{mode.detail}</small>
                <span className="practice-mode-action">
                  {mode.action}
                  <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="practice-more" aria-labelledby="practice-more-title">
        <h2 id="practice-more-title">Study alongside your practice</h2>
        <div className="practice-more-grid">
          <Link to="/certification-study-paths">
            <FontAwesomeIcon icon={faRoute} aria-hidden="true" />
            <span>
              <strong>Certification study paths</strong>
              <small>Map ASCP content areas into study passes.</small>
            </span>
          </Link>
          <Link to="/biochemical-tests">
            <FontAwesomeIcon icon={faFlaskVial} aria-hidden="true" />
            <span>
              <strong>Biochemical tests</strong>
              <small>Reactions, QC organisms, and reading traps.</small>
            </span>
          </Link>
          <Link to="/learn">
            <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />
            <span>
              <strong>Learn library</strong>
              <small>Read the topic behind a question you missed.</small>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
