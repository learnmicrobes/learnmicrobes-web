/**
 * Text processing shared by indexing and querying. Both sides must run the
 * exact same steps, or a word indexed one way is searched for another.
 */

const greekLetters: Array<[RegExp, string]> = [
  [/α/g, ' alpha '],
  [/β/g, ' beta '],
  [/γ/g, ' gamma ']
];

/** Lowercase, strip accents and punctuation. "Kovac's" -> "kovacs", "β-hemolysis" -> "beta hemolysis". */
export const normalizeText = (value: string) => {
  let text = value;
  greekLetters.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });

  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
};

export const splitWords = (value: string) => {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(' ') : [];
};

/**
 * A light stemmer tuned for microbiology. English plurals plus the Latin endings
 * organism names use, so "cocci" and "coccus" meet at "cocc", "bacteria" and
 * "bacterium" at "bacteri", and "media" and "medium" at "medi".
 *
 * It only has to be consistent, not linguistic: the stem is never shown, the
 * most common spelling behind it is (see SearchIndex.surface).
 */
export const stemWord = (word: string) => {
  if (word.length < 4 || /\d/.test(word)) return word;

  let stem = word;

  if (stem.endsWith('ies') && stem.length > 4) stem = `${stem.slice(0, -3)}y`;
  else if (/uses$/.test(stem)) stem = stem.slice(0, -2);
  else if (/(xes|ches|shes|sses|zes)$/.test(stem)) stem = stem.slice(0, -2);
  else if (/(ss|us|is)$/.test(stem)) {
    // "glass", "virus", "analysis" are already singular.
  } else if (stem.endsWith('s')) stem = stem.slice(0, -1);

  if (stem.length >= 7 && stem.endsWith('ing')) stem = stem.slice(0, -3);

  if (stem.length >= 5) {
    if (/(us|um|ae)$/.test(stem)) stem = stem.slice(0, -2);
    else if (/[ai]$/.test(stem)) stem = stem.slice(0, -1);
  }

  return stem;
};

/**
 * Optimal string alignment distance (Levenshtein plus adjacent transpositions),
 * abandoned once it exceeds `max`. Transpositions count as one edit, so
 * "psuedomonas" is one typo from "pseudomonas", not two.
 */
export const editDistanceWithin = (a: string, b: string, max: number): number | null => {
  if (a === b) return 0;
  if (max <= 0 || Math.abs(a.length - b.length) > max) return null;

  let beforePrevious: number[] = [];
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowBest = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, beforePrevious[j - 2] + 1);
      }

      current.push(value);
      if (value < rowBest) rowBest = value;
    }

    // Every remaining path costs at least rowBest, so stop once that is too much.
    if (rowBest > max) return null;
    beforePrevious = previous;
    previous = current;
  }

  const distance = previous[b.length];
  return distance <= max ? distance : null;
};

/** How many typos a word of this length may carry and still be corrected. */
export const typoBudget = (length: number) => {
  if (length < 4) return 0;
  if (length < 6) return 1;
  if (length < 12) return 2;
  return 3;
};
