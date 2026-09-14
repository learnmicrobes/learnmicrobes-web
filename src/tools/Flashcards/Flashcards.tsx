import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faLightbulb,
  faRotate,
  faRotateRight,
  faSliders,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
  flashcardDecks,
  getFlashcardStats,
  getFlashcards,
  type Flashcard,
  type FlashcardDeckId,
  type FlashcardDifficulty
} from '../../data/flashcardDecks';
import { trackEvent } from '../../utils/analytics';
import SupportNote from '../../components/Support/SupportNote';
import './Flashcards.css';

const PROGRESS_STORAGE_KEY = 'learnmicrobes_flashcard_progress';

type Recall = 'got' | 'almost' | 'missed';

type SessionStats = {
  got: number;
  almost: number;
  missed: number;
};

const emptyStats: SessionStats = { got: 0, almost: 0, missed: 0 };

const difficultyOrder: FlashcardDifficulty[] = ['beginner', 'intermediate', 'advanced'];

const difficultyLabels: Record<FlashcardDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

const difficultyDescriptions: Record<FlashcardDifficulty, string> = {
  beginner: 'Definitions and what each test is for.',
  intermediate: 'Reading results and using them at the bench.',
  advanced: 'QC organisms and the details that separate lookalikes.'
};

const readMissedIds = (): string[] => {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch (error) {
    return [];
  }
};

const saveMissedIds = (ids: string[]) => {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(ids.slice(0, 300)));
  } catch (error) {
    // Review queue is a convenience; the deck still works without storage.
  }
};

const shuffle = <T,>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

// Scrolls an element to just below the sticky site nav. The nav height is measured
// rather than hardcoded because it differs between phone and desktop layouts.
const scrollBelowNav = (element: HTMLElement | null, onlyIfOffscreen: boolean) => {
  if (!element) {
    return;
  }

  const navBottom = document.querySelector('.app-nav')?.getBoundingClientRect().bottom ?? 0;
  const offset = Math.max(navBottom, 0) + 12;
  const top = element.getBoundingClientRect().top;

  // Leave the page alone when the element already starts in the upper half of the screen.
  if (onlyIfOffscreen && top >= offset && top < window.innerHeight / 2) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: window.scrollY + top - offset, behavior: reduceMotion ? 'auto' : 'smooth' });
};

export default function Flashcards() {
  const allCards = useMemo(() => getFlashcards(), []);
  const stats = useMemo(() => getFlashcardStats(), []);

  const [deck, setDeck] = useState<FlashcardDeckId | 'all'>('all');
  const [difficulty, setDifficulty] = useState<FlashcardDifficulty | 'all'>('all');
  const [reviewMissedOnly, setReviewMissedOnly] = useState(false);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [cardOrder, setCardOrder] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>(emptyStats);
  const [ratedIds, setRatedIds] = useState<string[]>([]);

  const cardAreaRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLElement | null>(null);
  // Set when the learner changes the filters or moves to another card, so the card
  // comes back into view once it renders. The filters sit below the card, and on a
  // phone a rated card's buttons can end up below the fold. Never set on first load.
  const cardScrollPending = useRef(false);

  useEffect(() => {
    setMissedIds(readMissedIds());
  }, []);

  // The review list is snapshotted when review mode is entered rather than read
  // live. Depending on the live missed set would rebuild the deck on every rating
  // and bounce the session back to card one.
  const [reviewSnapshot, setReviewSnapshot] = useState<string[]>([]);

  const filteredCards = useMemo(() => {
    const reviewSet = new Set(reviewSnapshot);

    return allCards.filter((card) => {
      const matchesDeck = deck === 'all' || card.deck === deck;
      const matchesDifficulty = difficulty === 'all' || card.difficulty === difficulty;
      const matchesReview = !reviewMissedOnly || reviewSet.has(card.id);
      return matchesDeck && matchesDifficulty && matchesReview;
    });
  }, [allCards, deck, difficulty, reviewMissedOnly, reviewSnapshot]);

  const chooseDeck = (next: FlashcardDeckId | 'all') => {
    if (next === deck) {
      return;
    }
    cardScrollPending.current = true;
    setDeck(next);
  };

  const chooseDifficulty = (next: FlashcardDifficulty | 'all') => {
    if (next === difficulty) {
      return;
    }
    cardScrollPending.current = true;
    setDifficulty(next);
  };

  const toggleReviewMode = () => {
    cardScrollPending.current = true;
    setReviewMissedOnly((current) => {
      const next = !current;
      if (next) {
        setReviewSnapshot(missedIds);
      }
      return next;
    });
  };

  // Reshuffle whenever the filters change so a new selection starts a fresh pass.
  useEffect(() => {
    setCardOrder(shuffle(filteredCards));
    setIndex(0);
    setIsFlipped(false);
    setSessionStats(emptyStats);
    setRatedIds([]);
  }, [filteredCards]);

  const currentCard = cardOrder[index] ?? null;
  const isSessionComplete = cardOrder.length > 0 && index >= cardOrder.length;

  useEffect(() => {
    if (!cardScrollPending.current) {
      return undefined;
    }

    cardScrollPending.current = false;
    const frame = window.requestAnimationFrame(() => scrollBelowNav(cardAreaRef.current, true));
    return () => window.cancelAnimationFrame(frame);
  }, [cardOrder, index]);

  const rateCard = useCallback((recall: Recall) => {
    if (!currentCard) {
      return;
    }

    setSessionStats((current) => ({ ...current, [recall]: current[recall] + 1 }));
    setRatedIds((current) => [...current, currentCard.id]);

    setMissedIds((current) => {
      const next = recall === 'got'
        ? current.filter((id) => id !== currentCard.id)
        : current.includes(currentCard.id) ? current : [...current, currentCard.id];

      saveMissedIds(next);
      return next;
    });

    trackEvent('flashcard_rated', { recall, deck: currentCard.deck, difficulty: currentCard.difficulty });

    cardScrollPending.current = true;
    setIsFlipped(false);
    setIndex((current) => current + 1);
  }, [currentCard]);

  const goBack = () => {
    if (index === 0) {
      return;
    }
    cardScrollPending.current = true;
    setIsFlipped(false);
    setIndex((current) => current - 1);
  };

  const restart = () => {
    cardScrollPending.current = true;
    setCardOrder(shuffle(filteredCards));
    setIndex(0);
    setIsFlipped(false);
    setSessionStats(emptyStats);
    setRatedIds([]);
  };

  // Keyboard shortcuts: space flips, 1/2/3 rate, arrows navigate.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) {
        return;
      }

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        setIsFlipped((current) => !current);
        return;
      }

      if (!isFlipped) {
        return;
      }

      if (event.key === '1') rateCard('missed');
      if (event.key === '2') rateCard('almost');
      if (event.key === '3') rateCard('got');
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFlipped, rateCard]);

  const deckLabel = currentCard
    ? flashcardDecks.find((d) => d.id === currentCard.deck)?.label
    : undefined;
  const answeredCount = ratedIds.length;
  const progressPercent = cardOrder.length > 0
    ? Math.round((Math.min(index, cardOrder.length) / cardOrder.length) * 100)
    : 0;

  const selectionSummary = [
    deck === 'all' ? 'All decks' : flashcardDecks.find((d) => d.id === deck)?.label,
    difficulty === 'all' ? 'Any level' : difficultyLabels[difficulty],
    reviewMissedOnly ? 'Missed cards' : null
  ].filter(Boolean).join(' · ');

  return (
    <main className="flashcards-page">
      {/* The card comes first so a student can start straight away, especially on a
          phone. Filters and the page intro sit below it. */}
      <header className="flashcards-header">
        <div>
          <h1>Flashcards</h1>
          <p>{selectionSummary}</p>
        </div>
        <button
          type="button"
          className="flashcards-change-deck"
          onClick={() => scrollBelowNav(controlsRef.current, false)}
          aria-controls="flashcards-controls"
        >
          <FontAwesomeIcon icon={faSliders} aria-hidden="true" />
          Change deck
        </button>
      </header>

      <div ref={cardAreaRef} className="flashcards-card-area">
        {cardOrder.length === 0 ? (
          <section className="flashcards-empty">
            <h2>No cards match that combination.</h2>
            <p>Try another deck, or widen the level to Any level.</p>
            <button
              type="button"
              onClick={() => {
                cardScrollPending.current = true;
                setDeck('all');
                setDifficulty('all');
                setReviewMissedOnly(false);
              }}
            >
              Reset filters
            </button>
          </section>
        ) : isSessionComplete ? (
          <section className="flashcards-summary" aria-labelledby="flashcards-summary-title">
            <span className="flashcards-label">Session complete</span>
            <h2 id="flashcards-summary-title">
              {sessionStats.got} of {answeredCount} recalled cleanly
            </h2>
            <div className="flashcards-summary-grid">
              <div className="got"><strong>{sessionStats.got}</strong><small>Got it</small></div>
              <div className="almost"><strong>{sessionStats.almost}</strong><small>Almost</small></div>
              <div className="missed"><strong>{sessionStats.missed}</strong><small>Missed</small></div>
            </div>
            <p>
              {missedIds.length > 0
                ? `${missedIds.length} card${missedIds.length === 1 ? '' : 's'} waiting in your review queue.`
                : 'Nothing left in your review queue. Well done.'}
            </p>
            <div className="flashcards-summary-actions">
              <button type="button" className="primary" onClick={restart}>
                <FontAwesomeIcon icon={faRotate} aria-hidden="true" />
                Shuffle and go again
              </button>
              {missedIds.length > 0 && !reviewMissedOnly && (
                <button
                  type="button"
                  onClick={() => {
                    cardScrollPending.current = true;
                    setReviewSnapshot(missedIds);
                    setReviewMissedOnly(true);
                  }}
                >
                  Drill missed cards
                </button>
              )}
              <Link to="/practice">Back to Practice</Link>
            </div>
            <SupportNote location="flashcards_complete" />
          </section>
        ) : currentCard && (
          <section className="flashcards-stage" aria-labelledby="flashcards-card-title">
            <div className="flashcards-progress" aria-label={`Card ${index + 1} of ${cardOrder.length}`}>
              <span>Card {index + 1} of {cardOrder.length}</span>
              <i><b style={{ width: `${progressPercent}%` }} /></i>
            </div>

            {/* Keyed by card so moving to another card remounts it face-up. Without the
                key the flip-back transition would briefly show the next card's answer. */}
            <button
              key={currentCard.id}
              type="button"
              className={`flashcards-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped((current) => !current)}
              aria-pressed={isFlipped}
            >
              <span className="flashcards-card-inner">
                <span className="flashcards-card-face flashcards-card-face-front" aria-hidden={isFlipped}>
                  <span className="flashcards-card-meta">
                    <small>{deckLabel}</small>
                    <small>{difficultyLabels[currentCard.difficulty]}</small>
                  </span>

                  <p className="flashcards-card-front" id={isFlipped ? undefined : 'flashcards-card-title'}>
                    {currentCard.front}
                  </p>

                  {currentCard.hint && (
                    <span className="flashcards-hint">
                      <FontAwesomeIcon icon={faLightbulb} aria-hidden="true" />
                      {currentCard.hint}
                    </span>
                  )}

                  <span className="flashcards-flip-cue">Tap to reveal the answer</span>
                </span>

                <span className="flashcards-card-face flashcards-card-face-back" aria-hidden={!isFlipped}>
                  <span className="flashcards-card-meta">
                    <small>{deckLabel}</small>
                    <small>{difficultyLabels[currentCard.difficulty]}</small>
                  </span>

                  <p className="flashcards-card-back" id={isFlipped ? 'flashcards-card-title' : undefined}>
                    {currentCard.back}
                  </p>

                  <span className="flashcards-flip-cue">Tap to see the question again</span>
                </span>
              </span>
            </button>

            {isFlipped ? (
              <div className="flashcards-rating" role="group" aria-label="How well did you recall this?">
                <button type="button" className="missed" onClick={() => rateCard('missed')}>
                  <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                  Missed
                </button>
                <button type="button" className="almost" onClick={() => rateCard('almost')}>
                  <FontAwesomeIcon icon={faRotateRight} aria-hidden="true" />
                  Almost
                </button>
                <button type="button" className="got" onClick={() => rateCard('got')}>
                  <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
                  Got it
                </button>
              </div>
            ) : (
              <div className="flashcards-nav">
                <button type="button" onClick={goBack} disabled={index === 0}>
                  <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                  Previous
                </button>
                <button type="button" className="primary" onClick={() => setIsFlipped(true)}>
                  Reveal answer
                  <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </button>
              </div>
            )}

            {currentCard.relatedPath && (
              <Link className="flashcards-related" to={currentCard.relatedPath}>
                Read the full reference
              </Link>
            )}

            <p className="flashcards-shortcut-note">
              Keyboard: space flips, then 1 missed, 2 almost, 3 got it.
            </p>
          </section>
        )}
      </div>

      <section
        id="flashcards-controls"
        ref={controlsRef}
        className="flashcards-controls"
        aria-label="Choose a deck"
      >
        <div className="flashcards-control-row">
          <span className="flashcards-label">Deck</span>
          <div className="flashcards-chips">
            <button
              type="button"
              className={deck === 'all' ? 'active' : ''}
              onClick={() => chooseDeck('all')}
              aria-pressed={deck === 'all'}
            >
              All decks
            </button>
            {flashcardDecks.map((item) => (
              <button
                type="button"
                key={item.id}
                className={deck === item.id ? 'active' : ''}
                onClick={() => chooseDeck(item.id)}
                aria-pressed={deck === item.id}
                title={item.description}
              >
                {item.label}
                <small>{stats.deckCounts[item.id]}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="flashcards-control-row">
          <span className="flashcards-label">Level</span>
          <div className="flashcards-chips">
            <button
              type="button"
              className={difficulty === 'all' ? 'active' : ''}
              onClick={() => chooseDifficulty('all')}
              aria-pressed={difficulty === 'all'}
            >
              Any level
            </button>
            {difficultyOrder.map((level) => (
              <button
                type="button"
                key={level}
                className={difficulty === level ? 'active' : ''}
                onClick={() => chooseDifficulty(level)}
                aria-pressed={difficulty === level}
                title={difficultyDescriptions[level]}
              >
                {difficultyLabels[level]}
                <small>{stats.difficultyCounts[level]}</small>
              </button>
            ))}
          </div>
        </div>

        {missedIds.length > 0 && (
          <button
            type="button"
            className={`flashcards-review-toggle ${reviewMissedOnly ? 'active' : ''}`}
            onClick={toggleReviewMode}
            aria-pressed={reviewMissedOnly}
          >
            <FontAwesomeIcon icon={faRotateRight} aria-hidden="true" />
            {reviewMissedOnly ? 'Reviewing missed cards' : `Review ${missedIds.length} missed card${missedIds.length === 1 ? '' : 's'}`}
          </button>
        )}
      </section>

      <section className="flashcards-about" aria-labelledby="flashcards-about-title">
        <h2 id="flashcards-about-title">Rapid recall, one card at a time.</h2>
        <p>
          Flip a card, answer honestly, and anything you miss comes back in your review queue.
          Built from the same bench references and glossary the rest of the site uses.
        </p>
        <div className="flashcards-stats" aria-label="Flashcard library summary">
          <span><strong>{stats.total}</strong>Cards</span>
          <span><strong>{flashcardDecks.length}</strong>Decks</span>
          <span><strong>{missedIds.length}</strong>In review</span>
        </div>
      </section>
    </main>
  );
}
