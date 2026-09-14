import { biochemicalTestsData } from '../tools/BiochemicalTests/biochemicalData';
import { glossaryEntries } from './glossaryData';

export type FlashcardDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type FlashcardDeckId = 'bench-tests' | 'expected-results' | 'qc-organisms' | 'key-terms' | 'bench-reasoning';

export type Flashcard = {
  id: string;
  deck: FlashcardDeckId;
  difficulty: FlashcardDifficulty;
  front: string;
  back: string;
  hint?: string;
  relatedPath?: string;
};

export type FlashcardDeck = {
  id: FlashcardDeckId;
  label: string;
  description: string;
};

export const flashcardDecks: FlashcardDeck[] = [
  {
    id: 'bench-tests',
    label: 'What the test detects',
    description: 'The principle behind each bench test, so results stop feeling arbitrary.'
  },
  {
    id: 'expected-results',
    label: 'Reading the result',
    description: 'What a positive and a negative actually look like in the tube or on the plate.'
  },
  {
    id: 'qc-organisms',
    label: 'QC organisms',
    description: 'The positive and negative control organisms expected for each test.'
  },
  {
    id: 'key-terms',
    label: 'Key terms',
    description: 'Core clinical microbiology vocabulary in plain language.'
  },
  {
    id: 'bench-reasoning',
    label: 'Bench reasoning',
    description: 'How each concept is actually used to make a call at the bench.'
  }
];

const cleanText = (value: string) => value.replace(/\s+/g, ' ').trim();

// Card fronts say "the X test", so drop a trailing "Test" already in the name
// ("Aerotolerance Test" would otherwise read "the Aerotolerance Test test").
const testName = (name: string) => name.replace(/\s+test$/i, '');

/**
 * Cards are generated from the same reference data the tools already use, so a
 * card can never drift from the Biochemical Tests page or the glossary. Difficulty
 * is assigned by what the card asks for rather than picked per item: recalling a
 * definition is beginner work, reading a result is intermediate, and naming QC
 * organisms is advanced.
 */
const buildBiochemicalCards = (): Flashcard[] => {
  const cards: Flashcard[] = [];

  biochemicalTestsData.forEach((test) => {
    if (test.principle) {
      cards.push({
        id: `bench-${test.id}`,
        deck: 'bench-tests',
        difficulty: 'beginner',
        front: `What does the ${testName(test.name)} test detect?`,
        back: cleanText(test.principle),
        hint: test.category,
        relatedPath: '/biochemical-tests'
      });
    }

    if (test.expectedResults) {
      cards.push({
        id: `result-${test.id}`,
        deck: 'expected-results',
        difficulty: 'intermediate',
        front: `${test.name}: how do you read a positive versus a negative?`,
        back: test.expectedResults.trim(),
        hint: test.reagents ? cleanText(test.reagents) : undefined,
        relatedPath: '/biochemical-tests'
      });
    }

    if (test.qcPositive && test.qcNegative) {
      cards.push({
        id: `qc-${test.id}`,
        deck: 'qc-organisms',
        difficulty: 'advanced',
        front: `Name the expected QC organisms for the ${testName(test.name)} test.`,
        back: `Positive control: ${cleanText(test.qcPositive)}\nNegative control: ${cleanText(test.qcNegative)}`,
        relatedPath: '/biochemical-tests'
      });
    }
  });

  return cards;
};

const buildGlossaryCards = (): Flashcard[] => {
  const cards: Flashcard[] = [];

  glossaryEntries.forEach((entry) => {
    if (entry.definition) {
      cards.push({
        id: `term-${entry.id}`,
        deck: 'key-terms',
        difficulty: 'beginner',
        front: `Define: ${entry.term}`,
        back: cleanText(entry.definition),
        hint: entry.category,
        relatedPath: entry.relatedLinks[0]?.path
      });
    }

    if (entry.benchContext) {
      cards.push({
        id: `bench-use-${entry.id}`,
        deck: 'bench-reasoning',
        difficulty: 'intermediate',
        front: `At the bench, how is ${entry.term} actually used?`,
        back: cleanText(entry.benchContext),
        hint: entry.studentTip ? cleanText(entry.studentTip) : undefined,
        relatedPath: entry.relatedLinks[0]?.path
      });
    }

    // The first detail is usually the discriminating fact worth recalling cold.
    if (entry.details && entry.details.length > 1) {
      cards.push({
        id: `detail-${entry.id}`,
        deck: 'bench-reasoning',
        difficulty: 'advanced',
        front: `${entry.term}: what distinguishing details should you be able to state?`,
        back: entry.details.slice(0, 3).map((item) => `• ${cleanText(item)}`).join('\n'),
        relatedPath: entry.relatedLinks[0]?.path
      });
    }
  });

  return cards;
};

let cachedCards: Flashcard[] | null = null;

export const getFlashcards = (): Flashcard[] => {
  if (!cachedCards) {
    cachedCards = [...buildBiochemicalCards(), ...buildGlossaryCards()];
  }

  return cachedCards;
};

export const getFlashcardStats = () => {
  const cards = getFlashcards();
  const deckCounts = {} as Record<FlashcardDeckId, number>;
  const difficultyCounts: Record<FlashcardDifficulty, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0
  };

  flashcardDecks.forEach((deck) => {
    deckCounts[deck.id] = 0;
  });

  cards.forEach((card) => {
    deckCounts[card.deck] += 1;
    difficultyCounts[card.difficulty] += 1;
  });

  return { total: cards.length, deckCounts, difficultyCounts };
};
