import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheckCircle,
  faFlaskVial,
  faRotate,
  faVial,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  caseStudies,
  getCaseStudyStats,
  type CaseDifficulty,
  type CaseStudy
} from '../../data/caseStudies';
import { trackEvent } from '../../utils/analytics';
import { subjectStainClass } from '../../data/subjectStains';
import SupportNote from '../../components/Support/SupportNote';
import './CaseStudySimulator.css';

const difficultyOrder: CaseDifficulty[] = ['beginner', 'intermediate', 'advanced'];

const difficultyLabels: Record<CaseDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const difficultyDescriptions: Record<CaseDifficulty, string> = {
  beginner: 'Common organisms with a clear branch at each step.',
  intermediate: 'Sterile sites and results that need confirmation.',
  advanced: 'Safety judgement, escalation, and reporting consequences.'
};

type StageAnswer = {
  choiceId: string;
  correct: boolean;
};

export default function CaseStudySimulator() {
  const stats = useMemo(() => getCaseStudyStats(), []);
  const [difficulty, setDifficulty] = useState<CaseDifficulty | 'all'>('all');
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [answers, setAnswers] = useState<StageAnswer[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const visibleCases = useMemo(() => (
    difficulty === 'all' ? caseStudies : caseStudies.filter((item) => item.difficulty === difficulty)
  ), [difficulty]);

  const startCase = (caseStudy: CaseStudy) => {
    trackEvent('case_study_started', { caseId: caseStudy.id, difficulty: caseStudy.difficulty });
    setActiveCase(caseStudy);
    setStageIndex(0);
    setAnswers([]);
    setSelectedChoice(null);
    window.scrollTo(0, 0);
  };

  const exitCase = () => {
    setActiveCase(null);
    setStageIndex(0);
    setAnswers([]);
    setSelectedChoice(null);
  };

  const currentStage = activeCase?.stages[stageIndex] ?? null;
  const currentAnswer = answers[stageIndex] ?? null;
  const isCaseComplete = Boolean(activeCase) && stageIndex >= (activeCase?.stages.length ?? 0);

  const submitChoice = (choiceId: string) => {
    if (!currentStage || currentAnswer) {
      return;
    }

    const choice = currentStage.choices.find((item) => item.id === choiceId);
    if (!choice) {
      return;
    }

    setSelectedChoice(choiceId);
    setAnswers((current) => {
      const next = [...current];
      next[stageIndex] = { choiceId, correct: choice.correct };
      return next;
    });

    trackEvent('case_study_answered', {
      caseId: activeCase?.id ?? '',
      stage: currentStage.id,
      correct: choice.correct
    });
  };

  const advance = () => {
    setSelectedChoice(null);
    setStageIndex((current) => current + 1);
    window.scrollTo(0, 0);
  };

  const correctCount = answers.filter((item) => item?.correct).length;

  // ---- Case picker ----
  if (!activeCase) {
    return (
      <main className="case-page">
        <section className="case-hero" aria-labelledby="case-title">
          <span className="case-kicker">Case Studies</span>
          <h1 id="case-title">Work a case the way the bench does.</h1>
          <p>
            Start from the specimen, read what comes back at each step, and choose the next move.
            Every answer explains itself, including the wrong ones.
          </p>
          <div className="case-stats" aria-label="Case library summary">
            <span><strong>{stats.total}</strong>Cases</span>
            <span><strong>{stats.decisionPoints}</strong>Decision points</span>
            <span><strong>{difficultyOrder.length}</strong>Levels</span>
          </div>
        </section>

        <section className="case-picker" aria-labelledby="case-picker-title">
          <div className="case-picker-heading">
            <div>
              <span className="case-label">Choose a case</span>
              <h2 id="case-picker-title">Pick your level</h2>
            </div>
            <div className="case-difficulty" role="group" aria-label="Case difficulty">
              <button
                type="button"
                className={difficulty === 'all' ? 'active' : ''}
                onClick={() => setDifficulty('all')}
                aria-pressed={difficulty === 'all'}
              >
                All
              </button>
              {difficultyOrder.map((level) => (
                <button
                  type="button"
                  key={level}
                  className={difficulty === level ? 'active' : ''}
                  onClick={() => setDifficulty(level)}
                  aria-pressed={difficulty === level}
                  title={difficultyDescriptions[level]}
                >
                  {difficultyLabels[level]}
                </button>
              ))}
            </div>
          </div>

          {difficulty !== 'all' && (
            <p className="case-difficulty-note">{difficultyDescriptions[difficulty]}</p>
          )}

          <div className="case-grid">
            {visibleCases.map((item) => (
              <button type="button" className="case-card" key={item.id} onClick={() => startCase(item)}>
                <span className="case-card-tags">
                  <small className={subjectStainClass(item.area) || undefined}>{item.area}</small>
                  <span className="case-level">
                    <span className="case-level-dots" aria-hidden="true">
                      {difficultyOrder.map((level) => (
                        <i
                          key={level}
                          className={difficultyOrder.indexOf(level) <= difficultyOrder.indexOf(item.difficulty) ? 'on' : ''}
                        />
                      ))}
                    </span>
                    {difficultyLabels[item.difficulty]}
                  </span>
                </span>
                <strong>{item.title}</strong>
                <span className="case-card-specimen">
                  <FontAwesomeIcon icon={faVial} aria-hidden="true" />
                  {item.specimen}
                </span>
                <small className="case-card-steps">{item.stages.length} decision points</small>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // ---- Case complete ----
  if (isCaseComplete) {
    return (
      <main className="case-page">
        <section className="case-result" aria-labelledby="case-result-title">
          <span className="case-label">Case complete</span>
          <h1 id="case-result-title">{activeCase.title}</h1>
          <p className="case-score">
            {correctCount} of {activeCase.stages.length} decisions correct on the first try.
          </p>

          <div className="case-answer-block">
            <span className="case-label">Final answer</span>
            <strong>{activeCase.finalAnswer}</strong>
          </div>

          <div className="case-answer-block">
            <span className="case-label">Reporting</span>
            <p>{activeCase.reportingNote}</p>
          </div>

          <div className="case-takeaways">
            <span className="case-label">Takeaways</span>
            <ul>
              {activeCase.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-related">
            <span className="case-label">Go deeper</span>
            <div>
              {activeCase.relatedLinks.map((link) => (
                <Link key={link.path} to={link.path}>{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="case-result-actions">
            <button type="button" className="primary" onClick={() => startCase(activeCase)}>
              <FontAwesomeIcon icon={faRotate} aria-hidden="true" />
              Run this case again
            </button>
            <button type="button" onClick={exitCase}>Choose another case</button>
            <Link to="/practice">Back to Practice</Link>
          </div>
          <SupportNote location="case_complete" />
        </section>
      </main>
    );
  }

  // ---- Active stage ----
  return (
    <main className="case-page">
      <section className="case-runner" aria-labelledby="case-runner-title">
        <button type="button" className="case-exit" onClick={exitCase}>
          Leave case
        </button>

        <div className="case-runner-head">
          <span className="case-label">
            {subjectStainClass(activeCase.area) && (
              <i className={`subject-stain-drop ${subjectStainClass(activeCase.area)}`} aria-hidden="true" />
            )}
            {activeCase.area} / {difficultyLabels[activeCase.difficulty]}
          </span>
          <h1 id="case-runner-title">{activeCase.title}</h1>
          <p className="case-presentation">{activeCase.presentation}</p>
          <span className="case-specimen-chip">
            <FontAwesomeIcon icon={faVial} aria-hidden="true" />
            {activeCase.specimen}
          </span>
        </div>

        <div className="case-stepper" aria-label={`Step ${stageIndex + 1} of ${activeCase.stages.length}`}>
          {activeCase.stages.map((stage, i) => (
            <span
              key={stage.id}
              className={i < stageIndex ? 'done' : i === stageIndex ? 'current' : ''}
            >
              {stage.stageLabel}
            </span>
          ))}
        </div>

        {currentStage && (
          <>
            <div className="case-findings">
              <span className="case-label">
                <FontAwesomeIcon icon={faFlaskVial} aria-hidden="true" />
                What came back
              </span>
              <ul>
                {currentStage.findings.map((finding) => (
                  <li key={finding}>{finding}</li>
                ))}
              </ul>
            </div>

            <div className="case-question">
              <h2>{currentStage.question}</h2>
              <div className="case-choices" role="group" aria-label="Answer choices">
                {currentStage.choices.map((choice) => {
                  const isPicked = currentAnswer?.choiceId === choice.id || selectedChoice === choice.id;
                  const revealed = Boolean(currentAnswer);
                  const state = !revealed
                    ? ''
                    : choice.correct
                      ? 'correct'
                      : isPicked ? 'incorrect' : 'muted';

                  return (
                    <button
                      type="button"
                      key={choice.id}
                      className={`case-choice ${state}`}
                      onClick={() => submitChoice(choice.id)}
                      disabled={revealed}
                    >
                      <span className="case-choice-body">{choice.label}</span>
                      {revealed && choice.correct && (
                        <FontAwesomeIcon icon={faCheckCircle} aria-hidden="true" />
                      )}
                      {revealed && isPicked && !choice.correct && (
                        <FontAwesomeIcon icon={faXmarkCircle} aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {currentAnswer && (
              <div className={`case-feedback ${currentAnswer.correct ? 'correct' : 'incorrect'}`} role="status">
                <strong>{currentAnswer.correct ? 'Correct' : 'Not quite'}</strong>
                <p>
                  {currentStage.choices.find((c) => c.id === currentAnswer.choiceId)?.feedback}
                </p>
                <p className="case-teaching">
                  <em>{currentStage.teachingPoint}</em>
                </p>
                <button type="button" className="primary" onClick={advance}>
                  {stageIndex + 1 < activeCase.stages.length ? 'Next step' : 'See the wrap-up'}
                  <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
