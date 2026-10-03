import { describe, expect, it } from '@jest/globals';
import { closestWord, editBudget, editDistanceWithin, matchAllTerms } from './fuzzyMatch';

describe('editDistanceWithin', () => {
  it('returns 0 for identical words', () => {
    expect(editDistanceWithin('catalase', 'catalase', 2)).toBe(0);
  });

  it('counts a single transposition as two edits', () => {
    expect(editDistanceWithin('psuedomonas', 'pseudomonas', 2)).toBe(2);
  });

  it('gives up once the budget is spent', () => {
    expect(editDistanceWithin('mycology', 'virology', 2)).toBeNull();
  });

  it('rejects words too different in length to be close', () => {
    expect(editDistanceWithin('gram', 'gramnegativerods', 2)).toBeNull();
  });
});

describe('editBudget', () => {
  it('allows no edits on very short terms, so cocci cannot become cocoa', () => {
    expect(editBudget(3)).toBe(0);
  });

  it('scales with word length', () => {
    expect(editBudget(5)).toBe(1);
    expect(editBudget(11)).toBe(2);
  });
});

describe('closestWord', () => {
  const words = ['pseudomonas', 'aeruginosa', 'oxidase', 'catalase', 'staphylococcus'];

  it('treats a prefix as an exact hit', () => {
    expect(closestWord('pseud', words)).toEqual({ word: 'pseudomonas', distance: 0 });
  });

  it('finds a misspelled organism', () => {
    expect(closestWord('psuedomonas', words)?.word).toBe('pseudomonas');
    expect(closestWord('staphyloccocus', words)?.word).toBe('staphylococcus');
  });

  it('does not match an unrelated word', () => {
    expect(closestWord('mycology', words)).toBeNull();
  });

  it('prefers the nearer of two candidates', () => {
    expect(closestWord('oxidaze', ['oxidase', 'oxacillin'])?.word).toBe('oxidase');
  });
});

describe('matchAllTerms', () => {
  const haystack = 'Oxidase test Pseudomonas aeruginosa nonfermenter identification';

  it('requires every term to land', () => {
    expect(matchAllTerms(['oxidase', 'pseudomonas'], haystack)).not.toBeNull();
    expect(matchAllTerms(['oxidase', 'mycology'], haystack)).toBeNull();
  });

  it('matches across a typo in one term', () => {
    const matches = matchAllTerms(['oxidaze', 'psuedomonas'], haystack);
    expect(matches?.map((match) => match.word)).toEqual(['oxidase', 'pseudomonas']);
  });

  it('reports a clean match as distance 0', () => {
    const matches = matchAllTerms(['oxidase'], haystack);
    expect(matches?.[0].distance).toBe(0);
  });
});
