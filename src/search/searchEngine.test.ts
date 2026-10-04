import { describe, expect, it } from '@jest/globals';
import { buildSearchDocs } from './searchDocs';
import { createSearchIndex, runSearch } from './searchEngine';
import { editDistanceWithin, normalizeText, stemWord } from './textProcessing';

describe('text processing', () => {
  it('drops apostrophes and punctuation, and spells out Greek letters', () => {
    expect(normalizeText("Kovac's reagent")).toBe('kovacs reagent');
    expect(normalizeText('β-hemolysis')).toBe('beta hemolysis');
  });

  it('brings Latin singulars and plurals to one stem', () => {
    expect(stemWord('cocci')).toBe(stemWord('coccus'));
    expect(stemWord('bacteria')).toBe(stemWord('bacterium'));
    expect(stemWord('hyphae')).toBe(stemWord('hypha'));
    expect(stemWord('viruses')).toBe(stemWord('virus'));
  });

  it('counts a transposition as one edit', () => {
    expect(editDistanceWithin('psuedomonas', 'pseudomonas', 2)).toBe(1);
  });

  it('gives up once the budget is spent', () => {
    expect(editDistanceWithin('mycology', 'virology', 2)).toBeNull();
  });
});

describe('site search ranking', () => {
  const index = createSearchIndex(buildSearchDocs());
  const titles = (query: string, limit = 5) => runSearch(index, query, { limit, typing: false }).hits.map((hit) => hit.doc.title);

  it('corrects a misspelled organism and says so', () => {
    const response = runSearch(index, 'psuedomonas', { typing: false });
    expect(response.correctedQuery).toBe('pseudomonas');
    expect(response.hits[0].doc.title).toMatch(/Pseudomonas/);
  });

  it('completes an unfinished misspelling while typing', () => {
    const response = runSearch(index, 'psuedom', { typing: true });
    expect(response.correctedQuery).toBe('pseudomonas');
    expect(response.hits.length).toBeGreaterThan(1);
  });

  it('answers a glossary term outright', () => {
    expect(runSearch(index, 'oxidase').answer?.title).toBe('Oxidase test');
    expect(runSearch(index, 'afb stain').answer?.title).toBe('Acid-fast stain');
  });

  it('does not answer with a term that only involves the query', () => {
    expect(runSearch(index, 'hemolysis').answer).toBeUndefined();
  });

  it('puts the page named by the query first', () => {
    expect(titles('gram stain')[0]).toBe('Gram Stain');
    expect(titles('macconkey')[0]).toBe('MacConkey Agar');
  });

  it('understands bench shorthand', () => {
    expect(titles('gnr').some((title) => /Gram-Negative Rods/.test(title))).toBe(true);
    expect(titles('o&p')[0]).toMatch(/Ova and parasite/i);
  });

  it('finds a test by what its result looks like', () => {
    expect(titles('pink ring')).toContain('Indole Production');
  });

  it('requires every meaningful word, ignoring question words', () => {
    expect(titles('what is catalase').every((title) => /catalase/i.test(title))).toBe(true);
  });

  it('names the words it had to drop rather than returning nothing', () => {
    const response = runSearch(index, 'catalase xyzzyq', { typing: false });
    expect(response.hits.length).toBeGreaterThan(0);
    expect(response.droppedWords).toEqual(['xyzzyq']);
  });

  it('counts results per kind for the filter row', () => {
    const response = runSearch(index, 'oxidase', { kind: 'test' });
    expect(response.counts.test).toBeGreaterThan(0);
    expect(response.hits.every((hit) => hit.doc.kind === 'test')).toBe(true);
  });
});
