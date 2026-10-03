/**
 * Typo-tolerant matching for site search.
 *
 * Microbiology names are long and easy to mistype — "psuedomonas",
 * "staphyloccocus", "kleibsiella" — and a plain substring match returns nothing
 * for all three. These helpers let a query still find its target, and report the
 * spelling that actually matched so the UI can say what it searched for.
 *
 * Matching runs in two passes at the call site: exact first, which is cheap and
 * keeps correctly spelled queries precise, and fuzzy only when exact finds
 * nothing. An edit budget scaled to word length keeps "cocci" from matching
 * "cocoa".
 */

export const normalizeSearchText = (value: string) => (
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
);

export const tokenize = (value: string) => normalizeSearchText(value).split(' ').filter(Boolean);

/** How many single-character edits a term of this length may be out by. */
export const editBudget = (termLength: number) => {
  if (termLength < 4) return 0;
  if (termLength < 7) return 1;
  return 2;
};

/**
 * Levenshtein distance, abandoned as soon as it exceeds `max`. Returning early
 * matters here: this runs over every word of every indexed item.
 */
export const editDistanceWithin = (a: string, b: string, max: number): number | null => {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return null;
  if (max <= 0) return null;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowBest = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
      current.push(value);
      if (value < rowBest) rowBest = value;
    }

    // Every remaining path costs at least rowBest, so bail once that is too much.
    if (rowBest > max) return null;
    previous = current;
  }

  const distance = previous[b.length];
  return distance <= max ? distance : null;
};

/**
 * The closest word in `words` to `term`, or null when nothing is near enough.
 * A word the term is a prefix of counts as an exact hit, so "pseud" finds
 * "pseudomonas" without spending an edit.
 */
export const closestWord = (term: string, words: string[]) => {
  const budget = editBudget(term.length);
  let best: { word: string; distance: number } | null = null;

  for (const word of words) {
    if (word === term || (term.length >= 3 && word.startsWith(term))) {
      return { word, distance: 0 };
    }

    if (budget === 0) continue;

    const distance = editDistanceWithin(term, word, budget);
    if (distance !== null && (best === null || distance < best.distance)) {
      best = { word, distance };
    }
  }

  return best;
};

export type FuzzyTermMatch = {
  /** The word in the haystack that the term matched. */
  word: string;
  distance: number;
};

/**
 * Matches every term against the haystack's words. Returns null unless all of
 * them land, so extra words still narrow a search rather than widen it.
 */
export const matchAllTerms = (terms: string[], haystack: string): FuzzyTermMatch[] | null => {
  const words = tokenize(haystack);
  if (words.length === 0) return null;

  const matches: FuzzyTermMatch[] = [];

  for (const term of terms) {
    const hit = closestWord(term, words);
    if (!hit) return null;
    matches.push({ word: hit.word, distance: hit.distance });
  }

  return matches;
};
