import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faArrowRight,
  faCheckCircle,
  faClock,
  faFire,
  faFlaskVial,
  faMoon,
  faRotateRight,
  faShieldHalved,
  faSun,
  faTrophy,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { biochemicalTestsData } from '../BiochemicalTests/biochemicalData';
import { gramPositiveRoadmap } from '../GramPositiveRoadmap/data';
import { gramNegativeRoadmap } from '../GramNegativeRoadmap/gnrdata';
import { obligateAnaerobeRoadmap } from '../ObligateAnaerobeRoadmap/anaerobedata';
import { escalationCards } from '../DoNotRoutineCulture/DoNotRoutineCulture';
import type { RoadmapStep } from '../RoadmapExperience/RoadmapExperience';
import { questionBank } from '../../data/questionBank';
import type { QuestionBankArea } from '../../data/questionBank';
import { useAuth } from '../../context/AuthContext';
import { useQuizHistory } from '../../hooks/useQuizHistory';
import './StudyQuiz.css';

type QuizCategory =
  | 'all'
  | 'bench-tests'
  | 'organism-id'
  | 'safety'
  | 'preanalytics'
  | 'bacteriology'
  | 'mycobacteriology'
  | 'virology'
  | 'parasitology'
  | 'mycology'
  | 'postanalytics';
type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';

type QuizQuestion = {
  id: string;
  category: Exclude<QuizCategory, 'all'>;
  difficulty: QuizDifficulty;
  prompt: string;
  choices: string[];
  answer: string;
  explanation: string;
  source: string;
};

type QuizAttempt = {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
};

type SavedQuizState = {
  category?: QuizCategory;
  difficulty?: QuizDifficulty;
  questionIndex?: number;
  answeredIds?: string[];
  correctIds?: string[];
  missedAttempts?: QuizAttempt[];
  reviewMissedOnly?: boolean;
};

const QUIZ_STORAGE_KEY = 'learnmicrobes_study_quiz_state';
const STREAK_STORAGE_KEY = 'learnmicrobes_study_quiz_streak';
const BEST_STREAK_STORAGE_KEY = 'learnmicrobes_study_quiz_best_streak';
const TIMED_MODE_STORAGE_KEY = 'learnmicrobes_study_quiz_timed_mode';
const QUIZ_TIMER_SECONDS = 60;
const CONFETTI_PIECES = 20;

/**
 * Future freemium leaderboard integration:
 * replace this static preview with GET /api/study-quiz/leaderboard?scope=global.
 * Expected shape: { rank: number; displayName: string; score: number; streak: number; tier: 'free' | 'premium' }[].
 * The current modal intentionally avoids fetching until accounts, auth, and payments are ready.
 */
const leaderboardPreview = [
  { rank: 1, displayName: 'Bench Ace', score: 9820 },
  { rank: 2, displayName: 'Gram Stain Pro', score: 9460 },
  { rank: 3, displayName: 'Plate Reader', score: 9180 },
  { rank: 4, displayName: 'Catalase Champ', score: 8840 },
  { rank: 5, displayName: 'QC Master', score: 8610 }
];

const cleanText = (text: string) => text
  .replace(/\s+/g, ' ')
  .trim();

const stripTerminalPunctuation = (text: string) => cleanText(text).replace(/[.?!]+$/g, '');

const firstSentence = (text: string) => {
  const cleaned = cleanText(text);
  const match = cleaned.match(/^[^.!?]+[.!?]?/);

  return match ? match[0] : cleaned;
};

const getSavedQuizState = (): SavedQuizState | null => {
  const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

const getSavedNumber = (key: string) => {
  const saved = Number(localStorage.getItem(key));
  return Number.isFinite(saved) && saved > 0 ? saved : 0;
};

const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const makeChoices = (answer: string, preferredDistractors: string[], fallbackDistractors: string[] = [], offset = 0) => {
  const pool = unique([...preferredDistractors, ...fallbackDistractors].filter((item) => item !== answer));
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];

  return unique([answer, ...rotated]).slice(0, 4);
};

const rotateChoices = (choices: string[], questionIndex: number) => {
  if (choices.length <= 1) {
    return choices;
  }

  const shift = questionIndex % choices.length;
  return [...choices.slice(shift), ...choices.slice(0, shift)];
};

const roadmapEndpointQuestions = (
  label: string,
  roadmap: RoadmapStep[],
  category: Exclude<QuizCategory, 'all'>
): QuizQuestion[] => {
  const endpoints = roadmap.flatMap((step) => step.options
    .filter((option) => option.conclusion && option.tests && option.tests.length >= 2)
    .map((option) => ({
      step,
      conclusion: cleanText(option.conclusion as string),
      tests: option.tests as string[]
    })));
  const allAnswers = unique(endpoints.map((endpoint) => endpoint.conclusion));

  return endpoints.slice(0, 28).flatMap((endpoint, index) => {
    const siblingAnswers = unique(endpoint.step.options
      .filter((option) => option.conclusion && cleanText(option.conclusion) !== endpoint.conclusion)
      .map((option) => cleanText(option.conclusion as string)));
    const beginnerClues = stripTerminalPunctuation(endpoint.tests.slice(0, 2).map(cleanText).join('; '));
    const intermediateClues = stripTerminalPunctuation(endpoint.tests.slice(0, 3).map(cleanText).join('; '));
    const advancedClues = stripTerminalPunctuation(endpoint.tests.slice(0, 4).map(cleanText).join('; '));

    return [{
      id: `${label.toLowerCase().replace(/\s+/g, '-')}-beginner-${index}`,
      category,
      difficulty: 'beginner' as const,
      prompt: `Which organism or group matches these high-yield clues: ${beginnerClues}?`,
      choices: rotateChoices(makeChoices(endpoint.conclusion, allAnswers, [], index + 1), index),
      answer: endpoint.conclusion,
      explanation: `${endpoint.conclusion} fits the ${cleanText(endpoint.step.question)} branch because of: ${beginnerClues}.`,
      source: label
    }, {
      id: `${label.toLowerCase().replace(/\s+/g, '-')}-intermediate-${index}`,
      category,
      difficulty: 'intermediate' as const,
      prompt: `Which organism or group best fits this profile: ${intermediateClues}?`,
      choices: rotateChoices(makeChoices(endpoint.conclusion, siblingAnswers, allAnswers, index + 1), index),
      answer: endpoint.conclusion,
      explanation: `${endpoint.conclusion} fits the ${cleanText(endpoint.step.question)} branch because of: ${intermediateClues}.`,
      source: label
    }, {
      id: `${label.toLowerCase().replace(/\s+/g, '-')}-advanced-${index}`,
      category,
      difficulty: 'advanced' as const,
      prompt: `A close-lookalike isolate has this pattern: ${advancedClues}. Which endpoint is most consistent?`,
      choices: rotateChoices(makeChoices(endpoint.conclusion, siblingAnswers, allAnswers, index + 2), index),
      answer: endpoint.conclusion,
      explanation: `${endpoint.conclusion} is the best fit among close branch lookalikes from ${cleanText(endpoint.step.question)}.`,
      source: label
    }];
  });
};

const buildQuizQuestions = (): QuizQuestion[] => {
  const testNames = biochemicalTestsData.map((test) => test.name);
  const testsByCategory = new Map<string, string[]>();
  biochemicalTestsData.forEach((test) => {
    testsByCategory.set(test.category, [...(testsByCategory.get(test.category) ?? []), test.name]);
  });
  const qcOrganisms = unique(biochemicalTestsData.flatMap((test) => [test.qcPositive, test.qcNegative].map(cleanText)));

  const principleQuestions = biochemicalTestsData.slice(0, 32).map((test, index) => ({
    id: `test-principle-${test.id}`,
    category: 'bench-tests' as const,
    difficulty: 'beginner' as const,
    prompt: `Which bench test matches this principle: ${stripTerminalPunctuation(firstSentence(test.principle))}?`,
    choices: rotateChoices(makeChoices(test.name, testsByCategory.get(test.category) ?? [], testNames, index + 2), index),
    answer: test.name,
    explanation: `${test.name}: ${firstSentence(test.expectedResults)}`,
    source: 'Biochemical Tests'
  }));

  const qcQuestions = biochemicalTestsData
    .filter((test) => test.qcPositive && test.qcNegative)
    .slice(0, 18)
    .map((test, index) => ({
      id: `test-qc-${test.id}`,
      category: 'bench-tests' as const,
      difficulty: 'intermediate' as const,
      prompt: `Which organism is listed as the positive QC for ${test.name}?`,
      choices: rotateChoices(makeChoices(cleanText(test.qcPositive), qcOrganisms, [], index + 5), index),
      answer: cleanText(test.qcPositive),
      explanation: `${test.name} positive QC: ${cleanText(test.qcPositive)}. Negative QC: ${cleanText(test.qcNegative)}.`,
      source: 'Biochemical Tests'
    }));

  const expectedResultQuestions = biochemicalTestsData
    .filter((test) => test.expectedResults)
    .slice(0, 24)
    .map((test, index) => ({
      id: `test-result-${test.id}`,
      category: 'bench-tests' as const,
      difficulty: 'advanced' as const,
      prompt: `Which test is most associated with this result pattern: ${stripTerminalPunctuation(firstSentence(test.expectedResults))}?`,
      choices: rotateChoices(makeChoices(test.name, testsByCategory.get(test.category) ?? [], testNames, index + 3), index),
      answer: test.name,
      explanation: `${test.name} uses this result pattern because: ${firstSentence(test.principle)}`,
      source: 'Biochemical Tests'
    }));

  const organismQuestions = [
    ...roadmapEndpointQuestions('Gram Positive Roadmap', gramPositiveRoadmap, 'organism-id'),
    ...roadmapEndpointQuestions('Gram Negative Roadmap', gramNegativeRoadmap, 'organism-id'),
    ...roadmapEndpointQuestions('Anaerobe Roadmap', obligateAnaerobeRoadmap, 'organism-id')
  ];

  const beginnerSafetyChoices = [
    'Stop routine workup and escalate according to local biosafety or reference-lab policy.',
    'Proceed with routine biochemical identification at the open bench.',
    'Ignore exposure history if the Gram stain is unclear.',
    'Report as normal flora without additional correlation.'
  ];

  const advancedSafetyChoices = [
    'Pause routine manipulation and use the indicated safety, special-method, or reference workflow.',
    'Perform extra open-bench subculture until the organism is easier to identify.',
    'Use a routine biochemical panel first, then decide whether the exposure matters.',
    'Assume a negative routine culture excludes the organism.'
  ];

  const safetyQuestions = escalationCards.flatMap((card, index) => [{
    id: `safety-beginner-${card.id}`,
    category: 'safety' as const,
    difficulty: 'beginner' as const,
    prompt: `${card.organism}: ${stripTerminalPunctuation(card.trigger)}. What is the best next move?`,
    choices: rotateChoices(beginnerSafetyChoices, index),
    answer: beginnerSafetyChoices[0],
    explanation: `${card.organism}: ${card.doInstead[0]} Avoid: ${card.avoid.slice(0, 2).join(', ')}.`,
    source: 'Do Not Routine Culture'
  }, {
    id: `safety-intermediate-${card.id}`,
    category: 'safety' as const,
    difficulty: 'intermediate' as const,
    prompt: `${card.organism}: which workflow is most appropriate?`,
    choices: rotateChoices(makeChoices(card.doInstead[0], card.doInstead.slice(1), card.avoid, index), index),
    answer: card.doInstead[0],
    explanation: `${card.organism}: ${card.studentPearl} Avoid: ${card.avoid.slice(0, 2).join(', ')}.`,
    source: 'Do Not Routine Culture'
  }, {
    id: `safety-advanced-${card.id}`,
    category: 'safety' as const,
    difficulty: 'advanced' as const,
    prompt: `Which action best avoids the common safety trap for ${card.organism}?`,
    choices: rotateChoices(advancedSafetyChoices, index),
    answer: advancedSafetyChoices[0],
    explanation: `${card.organism}: ${card.studentPearl} Do instead: ${card.doInstead.slice(0, 2).join(' ')}`,
    source: 'Do Not Routine Culture'
  }]);

  const questionBankCategoryMap: Record<QuestionBankArea, Exclude<QuizCategory, 'all'>> = {
    'preanalytic-procedures': 'preanalytics',
    'analytic-bacteriology': 'bacteriology',
    'analytic-mycobacteriology': 'mycobacteriology',
    'analytic-virology': 'virology',
    'analytic-parasitology': 'parasitology',
    'analytic-mycology': 'mycology',
    'postanalytic-procedures': 'postanalytics'
  };

  const authoredQuestions = questionBank.map((question) => ({
    id: question.id,
    category: questionBankCategoryMap[question.area],
    difficulty: question.difficulty,
    prompt: question.prompt,
    choices: question.choices,
    answer: question.answer,
    explanation: question.explanation,
    source: question.source
  }));

  return [...authoredQuestions, ...principleQuestions, ...qcQuestions, ...expectedResultQuestions, ...organismQuestions, ...safetyQuestions];
};

const categoryLabels: Record<QuizCategory, string> = {
  all: 'All questions',
  'bench-tests': 'Bench tests',
  'organism-id': 'Organism ID',
  safety: 'Safety',
  preanalytics: 'Preanalytics',
  bacteriology: 'Bacteriology',
  mycobacteriology: 'Mycobacteriology',
  virology: 'Virology',
  parasitology: 'Parasitology',
  mycology: 'Mycology',
  postanalytics: 'Postanalytics'
};

const difficultyLabels: Record<QuizDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const difficultyDescriptions: Record<QuizDifficulty, string> = {
  beginner: 'Broad recognition with friendlier answer choices.',
  intermediate: 'Routine bench profiles with closer choices.',
  advanced: 'Lookalikes, result-pattern traps, and safety reasoning.'
};

export type StudyQuizCategory = QuizCategory;
export type StudyQuizDifficulty = QuizDifficulty;

type StudyQuizProps = {
  initialCategory?: QuizCategory;
  initialDifficulty?: QuizDifficulty;
  embedded?: boolean;
};

const StudyQuiz: React.FC<StudyQuizProps> = ({ initialCategory, initialDifficulty, embedded = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quizHistoryError, saveQuizAttempt } = useQuizHistory();
  const allQuestions = useMemo(() => buildQuizQuestions(), []);
  const savedState = useMemo(() => getSavedQuizState(), []);
  const validQuestionIds = useMemo(() => new Set(allQuestions.map((question) => question.id)), [allQuestions]);
  const hasInitialFilter = Boolean(initialCategory || initialDifficulty);
  const savedCategory = initialCategory ?? (savedState?.category && categoryLabels[savedState.category] ? savedState.category : 'all');
  const savedDifficulty = initialDifficulty ?? (savedState?.difficulty && difficultyLabels[savedState.difficulty] ? savedState.difficulty : 'intermediate');
  const [category, setCategory] = useState<QuizCategory>(savedCategory);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(savedDifficulty);
  const [questionIndex, setQuestionIndex] = useState(hasInitialFilter ? 0 : savedState?.questionIndex ?? 0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answeredIds, setAnsweredIds] = useState<string[]>((savedState?.answeredIds ?? []).filter((id) => validQuestionIds.has(id)));
  const [correctIds, setCorrectIds] = useState<string[]>((savedState?.correctIds ?? []).filter((id) => validQuestionIds.has(id)));
  const [missedAttempts, setMissedAttempts] = useState<QuizAttempt[]>((savedState?.missedAttempts ?? []).filter((attempt) => validQuestionIds.has(attempt.questionId)));
  const [reviewMissedOnly, setReviewMissedOnly] = useState(hasInitialFilter ? false : Boolean(savedState?.reviewMissedOnly));
  const [streak, setStreak] = useState(() => getSavedNumber(STREAK_STORAGE_KEY));
  const [bestStreak, setBestStreak] = useState(() => getSavedNumber(BEST_STREAK_STORAGE_KEY));
  const [isTimedMode, setIsTimedMode] = useState(() => localStorage.getItem(TIMED_MODE_STORAGE_KEY) === 'true');
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIMER_SECONDS);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizSaveMessage, setQuizSaveMessage] = useState('');
  const [isSavingQuizAttempt, setIsSavingQuizAttempt] = useState(false);
  const [isMissedDrawerOpen, setIsMissedDrawerOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const lastSavedAttemptSignature = useRef('');
  const [isDarkMode, setIsDarkMode] = useState(() => (
    localStorage.getItem('learnmicrobes_study_quiz_dark_mode') === 'true'
    || document.body.classList.contains('dark')
    || document.body.classList.contains('dark-mode')
  ));

  const missedQuestionIds = useMemo(
    () => missedAttempts.map((attempt) => attempt.questionId),
    [missedAttempts]
  );
  const missedQuestions = useMemo(
    () => allQuestions.filter((question) => missedQuestionIds.includes(question.id)),
    [allQuestions, missedQuestionIds]
  );
  const categoryCounts = useMemo(() => {
    const counts: Record<QuizCategory, number> = {
      all: allQuestions.length,
      'bench-tests': 0,
      'organism-id': 0,
      safety: 0,
      preanalytics: 0,
      bacteriology: 0,
      mycobacteriology: 0,
      virology: 0,
      parasitology: 0,
      mycology: 0,
      postanalytics: 0
    };

    allQuestions.forEach((question) => {
      counts[question.category] += 1;
    });

    return counts;
  }, [allQuestions]);
  const difficultyCounts = useMemo(() => {
    const counts: Record<QuizDifficulty, number> = {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    };

    allQuestions
      .filter((question) => category === 'all' || question.category === category)
      .forEach((question) => {
        counts[question.difficulty] += 1;
      });

    return counts;
  }, [allQuestions, category]);

  const visibleQuestions = useMemo(() => (
    reviewMissedOnly && missedQuestions.length > 0
      ? missedQuestions
      : allQuestions.filter((question) => (
        (category === 'all' || question.category === category) && question.difficulty === difficulty
      ))
  ), [allQuestions, category, difficulty, missedQuestions, reviewMissedOnly]);

  const currentQuestion = visibleQuestions[questionIndex % visibleQuestions.length];
  const isAnswered = Boolean(selectedAnswer);
  const isCorrect = selectedAnswer === currentQuestion.answer;
  const scoreText = `${correctIds.length}/${answeredIds.length || 0}`;
  const visibleAnsweredCount = visibleQuestions.filter((question) => answeredIds.includes(question.id)).length;
  const visibleQuestionIds = useMemo(() => new Set(visibleQuestions.map((question) => question.id)), [visibleQuestions]);
  const visibleCorrectCount = correctIds.filter((id) => visibleQuestionIds.has(id)).length;
  const visibleMissedQuestions = useMemo(() => (
    visibleQuestions.filter((question) => (
      answeredIds.includes(question.id) && !correctIds.includes(question.id)
    ))
  ), [answeredIds, correctIds, visibleQuestions]);
  const progressPercent = visibleQuestions.length > 0
    ? Math.round((visibleAnsweredCount / visibleQuestions.length) * 100)
    : 0;
  const accuracyPercent = answeredIds.length > 0
    ? Math.round((correctIds.length / answeredIds.length) * 100)
    : 0;
  const timerPercent = Math.max(0, Math.round((timeRemaining / QUIZ_TIMER_SECONDS) * 100));
  const timerState = timeRemaining <= 10 ? 'urgent' : timeRemaining <= 25 ? 'warning' : '';
  const missedAttemptMap = useMemo(
    () => new Map(missedAttempts.map((attempt) => [attempt.questionId, attempt])),
    [missedAttempts]
  );

  const buildQuizAttemptPayload = useCallback(() => {
    const questionCount = Math.max(visibleAnsweredCount, 1);
    const missedCategoryLabels = unique(visibleMissedQuestions.map((question) => categoryLabels[question.category]));
    const missedSourceLabels = unique(visibleMissedQuestions.map((question) => question.source));
    const weakAreas = missedCategoryLabels.length > 0
      ? missedCategoryLabels.slice(0, 4)
      : missedSourceLabels.slice(0, 4);

    return {
      quizName: reviewMissedOnly ? 'Study Quiz - Missed Review' : 'Study Quiz',
      category: reviewMissedOnly ? 'Missed review' : categoryLabels[category],
      difficulty: reviewMissedOnly ? 'Mixed' : difficultyLabels[difficulty],
      questionCount,
      correctCount: visibleCorrectCount,
      missedCount: visibleMissedQuestions.length,
      scorePercent: Math.round((visibleCorrectCount / questionCount) * 100),
      weakAreas
    };
  }, [
    category,
    difficulty,
    reviewMissedOnly,
    visibleAnsweredCount,
    visibleCorrectCount,
    visibleMissedQuestions
  ]);

  const currentAttemptSignature = useMemo(() => {
    if (visibleAnsweredCount === 0) {
      return '';
    }

    const payload = buildQuizAttemptPayload();

    return [
      payload.quizName,
      payload.category,
      payload.difficulty,
      payload.questionCount,
      payload.correctCount,
      payload.missedCount,
      answeredIds.filter((id) => visibleQuestionIds.has(id)).sort().join(',')
    ].join('|');
  }, [
    answeredIds,
    buildQuizAttemptPayload,
    visibleAnsweredCount,
    visibleQuestionIds
  ]);

  const hasSavedCurrentAttempt = currentAttemptSignature !== '' && lastSavedAttemptSignature.current === currentAttemptSignature;

  const saveCurrentQuizAttempt = useCallback(async (isAutomatic = false) => {
    if (visibleAnsweredCount === 0) {
      setQuizSaveMessage('Answer at least one question before saving a quiz session.');
      return;
    }

    if (!user) {
      if (!isAutomatic) {
        navigate('/auth');
      }
      return;
    }

    const payload = buildQuizAttemptPayload();
    const signature = currentAttemptSignature;

    if (lastSavedAttemptSignature.current === signature) {
      if (!isAutomatic) {
        setQuizSaveMessage('This quiz session is already saved.');
      }
      return;
    }

    setIsSavingQuizAttempt(true);
    setQuizSaveMessage('');

    const result = await saveQuizAttempt(payload);

    setIsSavingQuizAttempt(false);

    if (result.ok) {
      lastSavedAttemptSignature.current = signature;
    }

    setQuizSaveMessage(result.message);
  }, [
    buildQuizAttemptPayload,
    currentAttemptSignature,
    navigate,
    saveQuizAttempt,
    user,
    visibleAnsweredCount
  ]);

  useEffect(() => {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({
      category,
      difficulty,
      questionIndex,
      answeredIds,
      correctIds,
      missedAttempts,
      reviewMissedOnly
    }));
  }, [category, difficulty, questionIndex, answeredIds, correctIds, missedAttempts, reviewMissedOnly]);

  useEffect(() => {
    if (questionIndex >= visibleQuestions.length) {
      setQuestionIndex(0);
      setSelectedAnswer('');
    }
  }, [questionIndex, visibleQuestions.length]);

  useEffect(() => {
    if (visibleQuestions.length === 0 || visibleAnsweredCount !== visibleQuestions.length) {
      return;
    }

    saveCurrentQuizAttempt(true);
  }, [saveCurrentQuizAttempt, visibleAnsweredCount, visibleQuestions.length]);

  useEffect(() => {
    setTimeRemaining(QUIZ_TIMER_SECONDS);
    setShowConfetti(false);
  }, [currentQuestion.id]);

  useEffect(() => {
    if (!isTimedMode || isAnswered || timeRemaining <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isAnswered, isTimedMode, timeRemaining]);

  useEffect(() => {
    if (!showConfetti) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setShowConfetti(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [showConfetti]);

  useEffect(() => {
    if (embedded) {
      return undefined;
    }

    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('learnmicrobes_study_quiz_dark_mode', String(isDarkMode));
    return undefined;
  }, [embedded, isDarkMode]);

  const handleCategoryChange = (nextCategory: QuizCategory) => {
    setCategory(nextCategory);
    setQuestionIndex(0);
    setSelectedAnswer('');
    setReviewMissedOnly(false);
  };

  const handleDifficultyChange = (nextDifficulty: QuizDifficulty) => {
    setDifficulty(nextDifficulty);
    setQuestionIndex(0);
    setSelectedAnswer('');
    setReviewMissedOnly(false);
  };

  const handleAnswer = (choice: string) => {
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(choice);
    setAnsweredIds((ids) => ids.includes(currentQuestion.id) ? ids : [...ids, currentQuestion.id]);
    if (choice === currentQuestion.answer) {
      setCorrectIds((ids) => ids.includes(currentQuestion.id) ? ids : [...ids, currentQuestion.id]);
      setMissedAttempts((attempts) => attempts.filter((attempt) => attempt.questionId !== currentQuestion.id));
      setShowConfetti(true);
      setStreak((currentStreak) => {
        const nextStreak = currentStreak + 1;
        localStorage.setItem(STREAK_STORAGE_KEY, String(nextStreak));
        setBestStreak((currentBest) => {
          const nextBest = Math.max(currentBest, nextStreak);
          localStorage.setItem(BEST_STREAK_STORAGE_KEY, String(nextBest));
          return nextBest;
        });

        return nextStreak;
      });
      return;
    }

    setStreak(0);
    localStorage.setItem(STREAK_STORAGE_KEY, '0');
    setMissedAttempts((attempts) => [
      {
        questionId: currentQuestion.id,
        selectedAnswer: choice,
        correctAnswer: currentQuestion.answer
      },
      ...attempts.filter((attempt) => attempt.questionId !== currentQuestion.id)
    ]);
  };

  const handleNext = () => {
    setQuestionIndex((index) => (index + 1) % visibleQuestions.length);
    setSelectedAnswer('');
  };

  const handlePrevious = () => {
    setQuestionIndex((index) => (index - 1 + visibleQuestions.length) % visibleQuestions.length);
    setSelectedAnswer('');
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedAnswer('');
    setAnsweredIds([]);
    setCorrectIds([]);
    setMissedAttempts([]);
    setReviewMissedOnly(false);
    setStreak(0);
    setTimeRemaining(QUIZ_TIMER_SECONDS);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
    localStorage.setItem(STREAK_STORAGE_KEY, '0');
  };

  const handleTimedModeToggle = () => {
    setIsTimedMode((timedMode) => {
      const nextTimedMode = !timedMode;
      localStorage.setItem(TIMED_MODE_STORAGE_KEY, String(nextTimedMode));
      setTimeRemaining(QUIZ_TIMER_SECONDS);
      return nextTimedMode;
    });
  };

  const handleReviewMissed = () => {
    if (reviewMissedOnly) {
      setReviewMissedOnly(false);
      setQuestionIndex(0);
      setSelectedAnswer('');
      setIsMissedDrawerOpen(false);
      return;
    }

    if (missedQuestions.length === 0) {
      return;
    }

    setIsMissedDrawerOpen(true);
    setReviewMissedOnly(true);
    setQuestionIndex(0);
    setSelectedAnswer('');
  };

  const handleClearMissed = () => {
    setMissedAttempts([]);
    setReviewMissedOnly(false);
    setQuestionIndex(0);
    setSelectedAnswer('');
    setIsMissedDrawerOpen(false);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      const isEditing = tagName === 'input' || tagName === 'textarea' || target?.isContentEditable;

      if (isEditing || isLeaderboardOpen || isMissedDrawerOpen) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  });

  return (
    <div className={`study-quiz-page ${embedded ? 'embedded' : ''}`}>
      <div className="study-quiz-layout">
        <aside className="study-quiz-left-rail" aria-label="Quiz setup">
          <header className="study-quiz-hero">
            <div className="study-quiz-header-actions">
              <button
                type="button"
                className="study-quiz-icon-button leaderboard"
                onClick={() => setIsLeaderboardOpen(true)}
                aria-label="Open leaderboard preview"
              >
                <FontAwesomeIcon icon={faTrophy} />
              </button>
              <button
                type="button"
                className="study-quiz-icon-button"
                onClick={() => setIsDarkMode((darkMode) => !darkMode)}
                aria-label={isDarkMode ? 'Switch StudyQuiz to light mode' : 'Switch StudyQuiz to dark mode'}
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>
            </div>
            <div>
              <span className="study-quiz-kicker">Practice lab</span>
              <h1>High-yield quiz reps without the noise.</h1>
              <p>
                Drill bench tests, organism profiles, QC reactions, safety escalation, and exam-style microbiology
                reasoning from the references we have been building.
              </p>
            </div>
            <div className="study-quiz-score-card" aria-label="Quiz session summary">
              <span>Score</span>
              <strong>{scoreText}</strong>
            </div>
          </header>

          <div
            className="study-quiz-progress-track"
            role="progressbar"
            aria-label="Answered questions in this set"
            aria-valuemin={0}
            aria-valuemax={visibleQuestions.length}
            aria-valuenow={visibleAnsweredCount}
          >
            <span style={{ width: `${progressPercent}%` }} />
          </div>

          <section className="study-quiz-command-center" aria-label="Quiz controls">
            <div className={`study-quiz-streak-badge ${streak > 0 ? 'active' : ''}`} aria-label={`Current streak ${streak}. Best streak ${bestStreak}.`}>
              <FontAwesomeIcon icon={faFire} />
              <span>Streak</span>
              <strong>{streak}</strong>
              <small>Best {bestStreak}</small>
            </div>

            {isTimedMode && (
              <div
                className={`study-quiz-timer-meter ${timerState}`}
                role="progressbar"
                aria-label="Time remaining for this question"
                aria-valuemin={0}
                aria-valuemax={QUIZ_TIMER_SECONDS}
                aria-valuenow={timeRemaining}
              >
                <span style={{ width: `${timerPercent}%` }} />
              </div>
            )}

            <button
              type="button"
              className={`study-quiz-timed-toggle ${isTimedMode ? 'active' : ''}`}
              onClick={handleTimedModeToggle}
              aria-pressed={isTimedMode}
            >
              <FontAwesomeIcon icon={faClock} />
              <span>Timed mode</span>
              <strong>{isTimedMode ? `${timeRemaining}s` : 'Off'}</strong>
            </button>

            <div className="study-quiz-controls">
              <span className="study-quiz-control-label">Category</span>
              <div className="study-quiz-categories" role="group" aria-label="Question category">
                {(Object.keys(categoryLabels) as QuizCategory[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    title={`${categoryCounts[item]} questions`}
                    className={category === item ? 'active' : ''}
                    onClick={() => handleCategoryChange(item)}
                    aria-label={`${categoryLabels[item]}, ${categoryCounts[item]} questions`}
                    aria-pressed={category === item}
                  >
                    <span>{categoryLabels[item]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="study-quiz-controls">
              <span className="study-quiz-control-label">Difficulty</span>
              <div className="study-quiz-difficulty" role="group" aria-label="Quiz difficulty">
                {(Object.keys(difficultyLabels) as QuizDifficulty[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    title={`${difficultyCounts[item]} questions. ${difficultyDescriptions[item]}`}
                    className={difficulty === item ? 'active' : ''}
                    onClick={() => handleDifficultyChange(item)}
                    aria-label={`${difficultyLabels[item]}, ${difficultyCounts[item]} questions. ${difficultyDescriptions[item]}`}
                    aria-pressed={difficulty === item}
                  >
                    <span>{difficultyLabels[item]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="study-quiz-utility-actions">
              <button type="button" className="study-quiz-reset" onClick={handleRestart}>
                <FontAwesomeIcon icon={faRotateRight} />
                Reset
              </button>
              <button
                type="button"
                className="study-quiz-save"
                onClick={() => saveCurrentQuizAttempt(false)}
                disabled={visibleAnsweredCount === 0 || isSavingQuizAttempt || hasSavedCurrentAttempt}
              >
                {isSavingQuizAttempt ? 'Saving...' : hasSavedCurrentAttempt ? 'Session saved' : user ? 'Save session' : 'Sign in to save'}
              </button>
              <button
                type="button"
                className={`study-quiz-review ${reviewMissedOnly ? 'active' : ''}`}
                onClick={handleReviewMissed}
                disabled={missedQuestions.length === 0}
              >
                {reviewMissedOnly ? 'Exit missed review' : `Review missed (${missedQuestions.length})`}
              </button>
            </div>

            {(quizSaveMessage || quizHistoryError) && (
              <p className={`study-quiz-save-status ${quizHistoryError ? 'error' : ''}`} role={quizHistoryError ? 'alert' : 'status'}>
                {quizHistoryError || quizSaveMessage}
              </p>
            )}
          </section>
        </aside>

        <section className="study-quiz-main-rail" aria-label="Active quiz question">
          <div className="study-quiz-set-meta">
            <span>{visibleAnsweredCount} / {visibleQuestions.length} answered</span>
            <span>{accuracyPercent}% accuracy</span>
          </div>

          <main className={`study-quiz-card ${isAnswered && !isCorrect ? 'shake' : ''}`}>
            {showConfetti && (
              <div className="study-quiz-confetti" aria-hidden="true">
                {Array.from({ length: CONFETTI_PIECES }).map((_, index) => (
                  <span key={`confetti-${index}`} />
                ))}
              </div>
            )}
            <div className="study-quiz-card-header">
              <span>
                <FontAwesomeIcon icon={currentQuestion.category === 'safety' ? faShieldHalved : faFlaskVial} />
                {reviewMissedOnly ? 'Missed review' : categoryLabels[currentQuestion.category]}
              </span>
              <span>{difficultyLabels[currentQuestion.difficulty]}</span>
              <span>{questionIndex + 1} of {visibleQuestions.length}</span>
            </div>

            <h2>{currentQuestion.prompt}</h2>
            {isTimedMode && timeRemaining === 0 && !isAnswered && (
              <p className="study-quiz-timer-alert" role="status" aria-live="polite">
                Time is up. Choose an answer, then review the explanation.
              </p>
            )}

            <div className="study-quiz-choices">
              {currentQuestion.choices.map((choice, index) => {
                const className = isAnswered
                  ? choice === currentQuestion.answer
                    ? 'correct'
                    : choice === selectedAnswer
                      ? 'incorrect'
                      : ''
                  : '';

                return (
                  <button
                    key={choice}
                    type="button"
                    className={className}
                    onClick={() => handleAnswer(choice)}
                    aria-pressed={selectedAnswer === choice}
                  >
                    <span className="study-quiz-choice-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="study-quiz-choice-text">{choice}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`study-quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <div>
                  <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faXmarkCircle} />
                  <strong>{isCorrect ? 'Correct' : 'Incorrect'}</strong>
                </div>
                <p>{currentQuestion.explanation}</p>
                <span>Source: {currentQuestion.source}</span>
              </div>
            )}

            <div className="study-quiz-actions">
              <button type="button" onClick={handlePrevious} aria-label="Previous question">
                Previous
              </button>
              <button type="button" onClick={handleNext}>
                Next question
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {!embedded && (
                <button type="button" onClick={() => navigate('/search')}>
                  Search source material
                </button>
              )}
            </div>
          </main>
        </section>
      </div>

      <aside className={`study-quiz-missed-panel ${isMissedDrawerOpen ? 'open' : ''}`} aria-label="Missed question review list" aria-hidden={!isMissedDrawerOpen}>
          <div className="study-quiz-missed-header">
            <div>
              <span>Review queue</span>
              <h2>Missed questions to revisit</h2>
            </div>
            <button type="button" onClick={handleReviewMissed}>
              {reviewMissedOnly ? 'Exit practice' : 'Practice missed'}
            </button>
            <button type="button" className="study-quiz-clear-missed" onClick={handleClearMissed}>
              Clear queue
            </button>
            <button type="button" className="study-quiz-drawer-close" onClick={() => setIsMissedDrawerOpen(false)} aria-label="Close missed review drawer">
              Close
            </button>
          </div>
          <div className="study-quiz-missed-list">
            {missedQuestions.length === 0 && (
              <p className="study-quiz-empty-drawer">No missed questions yet. Nice work.</p>
            )}
            {missedQuestions.slice(0, 8).map((question) => {
              const attempt = missedAttemptMap.get(question.id);

              return (
                <article key={question.id}>
                  <span>{categoryLabels[question.category]} / {difficultyLabels[question.difficulty]}</span>
                  <h3>{question.prompt}</h3>
                  {attempt && (
                    <p>
                      Your answer: <strong>{attempt.selectedAnswer}</strong>
                      <br />
                      Correct answer: <strong>{attempt.correctAnswer}</strong>
                    </p>
                  )}
                </article>
              );
            })}
          </div>
      </aside>
      <button
        type="button"
        className={`study-quiz-drawer-scrim ${isMissedDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsMissedDrawerOpen(false)}
        aria-label="Close missed review drawer"
        tabIndex={isMissedDrawerOpen ? 0 : -1}
      />

      {isLeaderboardOpen && (
        <div className="study-quiz-modal-backdrop" role="presentation">
          <section className="study-quiz-leaderboard-modal" role="dialog" aria-modal="true" aria-labelledby="study-quiz-leaderboard-title">
            <div className="study-quiz-modal-header">
              <div>
                <span className="study-quiz-kicker">Future premium</span>
                <h2 id="study-quiz-leaderboard-title">Leaderboard preview</h2>
              </div>
              <button type="button" className="study-quiz-icon-button" onClick={() => setIsLeaderboardOpen(false)} aria-label="Close leaderboard preview">
                <FontAwesomeIcon icon={faXmarkCircle} />
              </button>
            </div>
            <ol className="study-quiz-leaderboard-list">
              {leaderboardPreview.map((entry) => (
                <li key={entry.rank}>
                  <span>#{entry.rank}</span>
                  <strong>{entry.displayName}</strong>
                  <em>{entry.score.toLocaleString()}</em>
                </li>
              ))}
            </ol>
            <div className="study-quiz-user-rank">
              <span>Your alpha rank</span>
              <strong>#12</strong>
            </div>
            <button type="button" className="study-quiz-upgrade-cta">
              Upgrade to see full leaderboard & streak chart
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default StudyQuiz;
