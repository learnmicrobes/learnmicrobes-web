import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  faArrowRight,
  faCheckCircle,
  faFlaskVial,
  faRotateRight,
  faShieldHalved,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { biochemicalTestsData } from '../BiochemicalTests/biochemicalData';
import { gramPositiveRoadmap } from '../GramPositiveRoadmap/data';
import { gramNegativeRoadmap } from '../GramNegativeRoadmap/gnrdata';
import { obligateAnaerobeRoadmap } from '../ObligateAnaerobeRoadmap/anaerobedata';
import { escalationCards } from '../DoNotRoutineCulture/DoNotRoutineCulture';
import type { RoadmapStep } from '../RoadmapExperience/RoadmapExperience';
import './StudyQuiz.css';

type QuizCategory = 'all' | 'bench-tests' | 'organism-id' | 'safety';
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

  return [...principleQuestions, ...qcQuestions, ...expectedResultQuestions, ...organismQuestions, ...safetyQuestions];
};

const categoryLabels: Record<QuizCategory, string> = {
  all: 'All questions',
  'bench-tests': 'Bench tests',
  'organism-id': 'Organism ID',
  safety: 'Safety'
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

const StudyQuiz: React.FC = () => {
  const navigate = useNavigate();
  const allQuestions = useMemo(() => buildQuizQuestions(), []);
  const savedState = useMemo(() => getSavedQuizState(), []);
  const validQuestionIds = useMemo(() => new Set(allQuestions.map((question) => question.id)), [allQuestions]);
  const savedCategory = savedState?.category && categoryLabels[savedState.category] ? savedState.category : 'all';
  const savedDifficulty = savedState?.difficulty && difficultyLabels[savedState.difficulty] ? savedState.difficulty : 'intermediate';
  const [category, setCategory] = useState<QuizCategory>(savedCategory);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(savedDifficulty);
  const [questionIndex, setQuestionIndex] = useState(savedState?.questionIndex ?? 0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answeredIds, setAnsweredIds] = useState<string[]>((savedState?.answeredIds ?? []).filter((id) => validQuestionIds.has(id)));
  const [correctIds, setCorrectIds] = useState<string[]>((savedState?.correctIds ?? []).filter((id) => validQuestionIds.has(id)));
  const [missedAttempts, setMissedAttempts] = useState<QuizAttempt[]>((savedState?.missedAttempts ?? []).filter((attempt) => validQuestionIds.has(attempt.questionId)));
  const [reviewMissedOnly, setReviewMissedOnly] = useState(Boolean(savedState?.reviewMissedOnly));

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
      safety: 0
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
  const missedAttemptMap = useMemo(
    () => new Map(missedAttempts.map((attempt) => [attempt.questionId, attempt])),
    [missedAttempts]
  );

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
      return;
    }

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

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedAnswer('');
    setAnsweredIds([]);
    setCorrectIds([]);
    setMissedAttempts([]);
    setReviewMissedOnly(false);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  const handleReviewMissed = () => {
    if (reviewMissedOnly) {
      setReviewMissedOnly(false);
      setQuestionIndex(0);
      setSelectedAnswer('');
      return;
    }

    if (missedQuestions.length === 0) {
      return;
    }

    setReviewMissedOnly(true);
    setQuestionIndex(0);
    setSelectedAnswer('');
  };

  const handleClearMissed = () => {
    setMissedAttempts([]);
    setReviewMissedOnly(false);
    setQuestionIndex(0);
    setSelectedAnswer('');
  };

  return (
    <div className="study-quiz-page">
      <header className="study-quiz-hero">
        <div>
          <span className="study-quiz-kicker">Practice mode</span>
          <h1>Quiz yourself from the Learn Microbes data.</h1>
          <p>
            Practice best next tests, organism profiles, QC reactions, expected results, and safety escalation logic.
            These questions are generated from the static bench references we have been building.
          </p>
        </div>
        <div className="study-quiz-score-card">
          <span>Session score</span>
          <strong>{scoreText}</strong>
          <p>
            {answeredIds.length === 0
              ? 'Answer a question to start tracking.'
              : `${answeredIds.length} answered. ${missedQuestions.length} in missed review.`}
          </p>
          <small>Saved on this device for alpha.</small>
        </div>
      </header>

      <section className="study-quiz-controls" aria-label="Quiz controls">
        <div className="study-quiz-categories">
          {(Object.keys(categoryLabels) as QuizCategory[]).map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => handleCategoryChange(item)}
            >
              <span>{categoryLabels[item]}</span>
              <small>{categoryCounts[item]}</small>
            </button>
          ))}
        </div>
        <div className="study-quiz-difficulty" aria-label="Quiz difficulty">
          {(Object.keys(difficultyLabels) as QuizDifficulty[]).map((item) => (
            <button
              key={item}
              type="button"
              className={difficulty === item ? 'active' : ''}
              onClick={() => handleDifficultyChange(item)}
            >
              <span>{difficultyLabels[item]}</span>
              <small>{difficultyCounts[item]} questions · {difficultyDescriptions[item]}</small>
            </button>
          ))}
        </div>
        <button type="button" className="study-quiz-reset" onClick={handleRestart}>
          <FontAwesomeIcon icon={faRotateRight} />
          Reset
        </button>
        <button
          type="button"
          className={`study-quiz-review ${reviewMissedOnly ? 'active' : ''}`}
          onClick={handleReviewMissed}
          disabled={missedQuestions.length === 0}
        >
          {reviewMissedOnly ? 'Exit missed review' : `Review missed (${missedQuestions.length})`}
        </button>
      </section>

      <main className="study-quiz-card">
        <div className="study-quiz-card-header">
          <span>
            <FontAwesomeIcon icon={currentQuestion.category === 'safety' ? faShieldHalved : faFlaskVial} />
            {reviewMissedOnly ? 'Missed review' : categoryLabels[currentQuestion.category]}
          </span>
          <span>{difficultyLabels[currentQuestion.difficulty]}</span>
          <span>{questionIndex + 1} of {visibleQuestions.length}</span>
        </div>

        <h2>{currentQuestion.prompt}</h2>

        <div className="study-quiz-choices">
          {currentQuestion.choices.map((choice) => {
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
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`study-quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div>
              <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faXmarkCircle} />
              <strong>{isCorrect ? 'Correct' : 'Not quite'}</strong>
            </div>
            <p>{currentQuestion.explanation}</p>
            <span>Source: {currentQuestion.source}</span>
          </div>
        )}

        <div className="study-quiz-actions">
          <button type="button" onClick={handleNext}>
            Next question
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button type="button" onClick={() => navigate('/search')}>
            Search source material
          </button>
        </div>
      </main>

      {missedQuestions.length > 0 && (
        <section className="study-quiz-missed-panel" aria-label="Missed question review list">
          <div className="study-quiz-missed-header">
            <div>
              <span>Review queue</span>
              <h2>Missed questions to revisit</h2>
            </div>
            <button type="button" onClick={handleReviewMissed}>
              Practice missed
            </button>
            <button type="button" className="study-quiz-clear-missed" onClick={handleClearMissed}>
              Clear queue
            </button>
          </div>
          <div className="study-quiz-missed-list">
            {missedQuestions.slice(0, 6).map((question) => {
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
        </section>
      )}
    </div>
  );
};

export default StudyQuiz;
