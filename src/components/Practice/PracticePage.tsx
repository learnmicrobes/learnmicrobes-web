import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBolt,
  faClipboardList,
  faClockRotateLeft,
  faFire,
  faFlaskVial,
  faLayerGroup,
  faRoute,
  faStethoscope,
  faTrophy
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

type QuickStartTile = {
  category: StudyQuizCategory;
  count: number;
};

const difficultyOrder: StudyQuizDifficulty[] = ['beginner', 'intermediate', 'advanced'];

const primaryTools = [
  {
    icon: faClipboardList,
    label: 'Study Quiz',
    detail: 'Exam-style recall with instant explanations, category and difficulty filters, answer streaks, and saved history.',
    path: '/study-quiz',
    action: 'Start a quiz',
    meta: ['Explanations', 'Weak areas', 'Saved history']
  },
  {
    icon: faLayerGroup,
    label: 'Flashcards',
    detail: 'Flip a card, rate your recall honestly, and anything you miss comes back in a review queue.',
    path: '/flashcards',
    action: 'Start flipping',
    meta: ['5 decks', 'Review queue', 'Self-rated']
  },
  {
    icon: faStethoscope,
    label: 'Case Studies',
    detail: 'Work a specimen from presentation to report, choosing the next move at each bench decision point.',
    path: '/case-study-simulator',
    action: 'Open a case',
    meta: ['Staged decisions', 'Why answers work', 'Reporting']
  },
  {
    icon: faRoute,
    label: 'ASCP Review Hub',
    detail: 'A guided review loop that ties study paths, quizzes, bench references, and visuals into one exam plan.',
    path: '/ascp-microbiology-review',
    action: 'Open review hub',
    meta: ['Study paths', 'References', 'Visual recall']
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
    document.title = 'Practice Microbiology Questions | Learn Microbes';
  }, []);

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

  const heroStats = useMemo(() => ([
    { label: 'Practice questions', value: quizStats.totalQuestions },
    { label: 'Content areas', value: quickStartTiles.length },
    { label: 'Difficulty levels', value: difficultyOrder.length }
  ]), [quizStats.totalQuestions, quickStartTiles.length]);

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
        <span className="practice-kicker">Practice</span>
        <h1 id="practice-title">Test what you actually remember.</h1>
        <p>
          Active recall for MedTech students, board reviewees, and ASCP prep. Pick an area, answer a
          few questions, and read the explanation for every miss.
        </p>
        <div className="practice-hero-stats" aria-label="Practice library summary">
          {heroStats.map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
        </div>
      </section>

      <section className="practice-start" aria-labelledby="practice-start-title">
        <div className="practice-start-copy">
          <span className="practice-section-label">
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
              : 'No sign-up needed to try it. Answer one question and you will see how the explanations work.'}
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
        <div className="practice-start-actions">
          <Link
            className="practice-primary-link"
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
      </section>

      {user && weakestAreas.length > 0 && (
        <section className="practice-weak-areas" aria-labelledby="practice-weak-title">
          <div>
            <span className="practice-section-label">Based on your history</span>
            <h2 id="practice-weak-title">Drill what you keep missing</h2>
          </div>
          <div className="practice-weak-chips">
            {weakestAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </section>
      )}

      <section className="practice-quick-start" aria-labelledby="practice-quick-title">
        <div className="practice-quick-heading">
          <div>
            <h2 id="practice-quick-title">Choose an area to drill</h2>
          </div>
          <div className="practice-difficulty" role="group" aria-label="Difficulty level">
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
        <p className="practice-difficulty-note">{studyQuizDifficultyDescriptions[difficulty]}</p>
        <div className="practice-category-grid">
          {quickStartTiles.map((tile) => (
            <button
              type="button"
              key={tile.category}
              className="practice-category-card"
              onClick={() => startQuiz(tile.category, 'category_grid')}
            >
              <span>{tile.count} question{tile.count === 1 ? '' : 's'}</span>
              <strong>{studyQuizCategoryLabels[tile.category]}</strong>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="practice-mixed-link"
          onClick={() => startQuiz('all', 'mixed_button')}
        >
          <FontAwesomeIcon icon={faBolt} aria-hidden="true" />
          Mix every area ({quizStats.totalQuestions} questions)
        </button>
      </section>

      <section className="practice-tools" aria-labelledby="practice-tools-title">
        <div className="practice-tools-heading">
          <h2 id="practice-tools-title">Full study modes</h2>
        </div>
        <div className="practice-tools-grid">
          {primaryTools.map((tool) => (
            <Link className="practice-card" to={tool.path} key={tool.path}>
              <span className="practice-card-icon" aria-hidden="true">
                <FontAwesomeIcon icon={tool.icon} />
              </span>
              <h3>{tool.label}</h3>
              <p>{tool.detail}</p>
              <div className="practice-card-meta">
                {tool.meta.map((item) => (
                  <small key={item}>{item}</small>
                ))}
              </div>
              <span className="practice-card-action">
                {tool.action}
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="practice-more" aria-labelledby="practice-more-title">
        <div className="practice-more-heading">
          <h2 id="practice-more-title">Study alongside your practice</h2>
        </div>
        <div className="practice-more-grid">
          <Link to="/certification-study-paths">
            <FontAwesomeIcon icon={faRoute} aria-hidden="true" />
            <strong>Certification study paths</strong>
            <small>Map ASCP content areas into study passes.</small>
          </Link>
          <Link to="/biochemical-tests">
            <FontAwesomeIcon icon={faFlaskVial} aria-hidden="true" />
            <strong>Biochemical tests</strong>
            <small>Reactions, QC organisms, and reading traps.</small>
          </Link>
          <Link to="/learn">
            <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />
            <strong>Learn library</strong>
            <small>Read the topic behind a question you missed.</small>
          </Link>
        </div>
      </section>

    </main>
  );
}
