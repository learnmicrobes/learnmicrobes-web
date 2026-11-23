import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBacteria,
  faBacterium,
  faChevronRight,
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
import { questionBank } from '../../data/questionBank';
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

// The quiz serves every published question-bank entry; the rest of its pool is
// drills generated from the bench-test reference. Counted the same way here so
// the intro never disagrees with what the quiz actually serves.
const reviewedQuestionCount = questionBank.filter((question) => question.status === 'published').length;

/**
 * Two lists, because these are two different kinds of thing.
 *
 * The five subjects plus the two analytic phases are WHERE a specimen is in
 * the bench workflow. Organism ID, bench tests and safety are skills that cut
 * across all of them. They used to share one grid sorted by question count,
 * which interleaved the two - bench tests landed between parasitology and
 * mycology - so a student hunting for one subject had to read all ten tiles.
 *
 * Bench order is fixed on purpose. The old sort moved as the bank grew, so the
 * grid never sat still long enough for anyone to learn where anything was.
 */
const benchOrderCategories: StudyQuizCategory[] = [
  'preanalytics',
  'bacteriology',
  'mycobacteriology',
  'parasitology',
  'mycology',
  'virology',
  'postanalytics'
];

const crossCuttingCategories: StudyQuizCategory[] = [
  'organism-id',
  'bench-tests',
  'safety'
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

type QuickStartGroup = {
  id: string;
  title: string;
  hint: string;
  tiles: QuickStartTile[];
};

const difficultyOrder: StudyQuizDifficulty[] = ['beginner', 'intermediate', 'advanced'];

type StudyLink = {
  icon: IconDefinition;
  label: string;
  detail: string;
  path: string;
  accent?: string;
};

// Accents are study-mode categories from the design system, not organism
// subjects. They colour the icon only: the cards stay neutral so the subject
// grid above stays the page's main feature.
const studyModes: StudyLink[] = [
  {
    icon: faClipboardList,
    label: 'Study Quiz',
    detail: 'The full quiz screen, with timed mode and a round that replays only the questions you missed.',
    path: '/study-quiz',
    accent: 'var(--sage-600)'
  },
  {
    icon: faLayerGroup,
    label: 'Flashcards',
    detail: 'Rate your recall; missed cards come back for review.',
    path: '/flashcards',
    accent: 'var(--lm-biochem)'
  },
  {
    icon: faStethoscope,
    label: 'Case Studies',
    detail: 'Work a specimen from arrival to final report.',
    path: '/case-study-simulator',
    accent: 'var(--lm-gram-pos)'
  },
  {
    icon: faRoute,
    label: 'ASCP Review Hub',
    detail: 'One exam plan tying paths, quizzes, and references together.',
    path: '/ascp-microbiology-review',
    accent: 'var(--teal-600)'
  }
];

const studyReferences: StudyLink[] = [
  {
    icon: faRoute,
    label: 'Certification study paths',
    detail: 'Map ASCP content areas into study passes.',
    path: '/certification-study-paths'
  },
  {
    icon: faFlaskVial,
    label: 'Biochemical tests',
    detail: 'Reactions, QC organisms, and reading traps.',
    path: '/biochemical-tests'
  },
  {
    icon: faLayerGroup,
    label: 'Learn library',
    detail: 'Read the topic behind a question you missed.',
    path: '/learn'
  }
];

const pluralize = (count: number, word: string) => `${count.toLocaleString()} ${word}${count === 1 ? '' : 's'}`;

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
  const difficultyLabel = studyQuizDifficultyLabels[difficulty];

  const quickStartGroups = useMemo<QuickStartGroup[]>(() => {
    const build = (categories: StudyQuizCategory[]) => categories
      .map((category) => ({
        category,
        count: quizStats.categoryCounts[category as Exclude<StudyQuizCategory, 'all'>] ?? 0
      }))
      .filter((tile) => tile.count > 0);

    return [
      {
        id: 'bench',
        title: 'Work the bench',
        hint: 'In the order a specimen moves',
        tiles: build(benchOrderCategories)
      },
      {
        id: 'across',
        title: 'Across every subject',
        hint: 'Skills that turn up everywhere',
        tiles: build(crossCuttingCategories)
      }
    ].filter((group) => group.tiles.length > 0);
  }, [quizStats.categoryCounts]);

  const areaCount = quickStartGroups.reduce((total, group) => total + group.tiles.length, 0);
  const generatedQuestionCount = Math.max(quizStats.totalQuestions - reviewedQuestionCount, 0);

  const startQuiz = (category: StudyQuizCategory, source: string) => {
    trackEvent('practice_quick_start', {
      category,
      difficulty,
      source
    });

    navigate(`/study-quiz?category=${category}&difficulty=${difficulty}`);
  };

  // One button replaces "Start practicing" and "Mix every area", which opened
  // the same mixed quiz. It sends both of their events so existing reports
  // keep counting.
  const startMixedQuiz = () => {
    trackEvent('practice_start_click', { resumed: false });
    startQuiz('all', 'mixed_button');
  };

  const hasStats = streak > 0 || bestStreak > 0 || Boolean(lastAttempt);

  return (
    <main className="practice-page">
      <section className="practice-hero" aria-labelledby="practice-title">
        <span className="lm-kicker">Review and practice</span>
        <h1 id="practice-title">Test what you actually remember.</h1>
        <p>
          {pluralize(reviewedQuestionCount, 'reviewed question')} and{' '}
          {pluralize(generatedQuestionCount, 'generated drill')} across {areaCount} areas. Pick one, answer a
          few, and read the explanation for every miss.
        </p>
      </section>

      <section className="practice-start-section" aria-labelledby="practice-start-title">
        <div className={`practice-start lm-panel ${savedQuiz ? 'practice-start--resuming' : ''}`.trim()}>
          {savedQuiz && (
            <div className="practice-resume">
              <div className="practice-resume-copy">
                <span className="lm-kicker">Pick up where you left off</span>
                <strong>
                  {studyQuizCategoryLabels[savedQuiz.category]} · {studyQuizDifficultyLabels[savedQuiz.difficulty]}
                </strong>
                <small>
                  {pluralize(savedQuiz.answeredCount, 'question')} answered. Resume keeps this area and difficulty,
                  whatever is picked below.
                </small>
              </div>
              <Link
                className="lm-btn lm-btn--primary practice-resume-btn"
                to="/study-quiz"
                onClick={() => trackEvent('practice_start_click', { resumed: true })}
                aria-label={`Resume quiz: ${studyQuizCategoryLabels[savedQuiz.category]}, ${studyQuizDifficultyLabels[savedQuiz.difficulty]}`}
              >
                Resume quiz
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </Link>
            </div>
          )}

          <div className="practice-start-row">
            <div className="practice-start-copy">
              <h2 id="practice-start-title">{savedQuiz ? 'Or start a new quiz' : 'Quick start'}</h2>
              <p>
                {savedQuiz
                  ? 'A mixed set from every area, or pick one subject below.'
                  : 'A mixed set from every area. No sign-up needed.'}
              </p>
            </div>

            <div className="practice-start-controls">
              <div className="practice-levels-field">
                <span id="practice-levels-label" className="practice-levels-label">
                  {savedQuiz ? 'New quiz difficulty' : 'Difficulty'}
                </span>
                <div className="practice-levels" role="group" aria-labelledby="practice-levels-label">
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

              <button
                type="button"
                className={`lm-btn ${savedQuiz ? 'lm-btn--secondary' : 'lm-btn--primary'} practice-mixed-btn`}
                onClick={startMixedQuiz}
              >
                Start a mixed quiz
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </button>
            </div>
          </div>

          {(hasStats || !user) && (
            <div className="practice-start-foot">
              {hasStats && (
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
              {!user && (
                <small className="practice-signin-note">Sign in later to save history and track weak areas.</small>
              )}
            </div>
          )}
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

      <section className="practice-subjects" aria-labelledby="practice-subjects-title">
        <div className="practice-subjects-heading">
          <h2 id="practice-subjects-title">Choose a subject</h2>
          <p aria-live="polite">
            Each starts {/^[aeiou]/i.test(difficultyLabel) ? 'an' : 'a'} {difficultyLabel.toLowerCase()} quiz.
          </p>
        </div>

        {quickStartGroups.map((group) => (
          <div className="practice-category-group" key={group.id}>
            <h3 className="practice-group-title">
              {group.title}
              <span>{group.hint}</span>
            </h3>
            <div className="practice-category-grid">
              {group.tiles.map((tile) => {
                const stainClass = subjectStainClass(tile.category);
                const label = studyQuizCategoryLabels[tile.category];

                return (
                  <button
                    type="button"
                    key={tile.category}
                    className={`practice-category ${stainClass}`.trim()}
                    style={stainClass ? ({ '--lm-accent': 'var(--stain)' } as React.CSSProperties) : undefined}
                    onClick={() => startQuiz(tile.category, 'category_grid')}
                    aria-label={`Start ${label} quiz, ${difficultyLabel}, ${pluralize(tile.count, 'question')}`}
                  >
                    <span className="practice-category-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={categoryIcons[tile.category] ?? faClipboardList} />
                    </span>
                    <span className="practice-category-copy">
                      <strong>{label}</strong>
                      <small>{pluralize(tile.count, 'question')}</small>
                    </span>
                    <FontAwesomeIcon className="practice-category-arrow" icon={faChevronRight} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="practice-more" aria-labelledby="practice-more-title">
        <h2 id="practice-more-title">More ways to study</h2>

        <div className="practice-more-group">
          <h3 className="practice-group-title">Study modes</h3>
          <div className="practice-more-grid practice-more-grid--modes">
            {studyModes.map((mode) => (
              <Link
                to={mode.path}
                key={mode.path}
                style={mode.accent ? ({ '--lm-accent': mode.accent } as React.CSSProperties) : undefined}
              >
                <FontAwesomeIcon icon={mode.icon} aria-hidden="true" />
                <span>
                  <strong>{mode.label}</strong>
                  <small>{mode.detail}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="practice-more-group">
          <h3 className="practice-group-title">References</h3>
          <div className="practice-more-grid">
            {studyReferences.map((reference) => (
              <Link to={reference.path} key={reference.path}>
                <FontAwesomeIcon icon={reference.icon} aria-hidden="true" />
                <span>
                  <strong>{reference.label}</strong>
                  <small>{reference.detail}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
