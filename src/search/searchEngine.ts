import { searchSynonyms, stopWords } from './searchSynonyms';
import type { SearchDoc, SearchHit, SearchKind, SearchResponse } from './searchTypes';
import { searchKinds } from './searchTypes';
import { editDistanceWithin, normalizeText, splitWords, stemWord, typoBudget } from './textProcessing';

/**
 * Site search, built the way a web search engine is, at the scale of one site:
 *
 * 1. Indexing. Every document's fields are split into words, stemmed, and
 *    written to an inverted index (stem -> documents), weighted by field — a
 *    word in the title is worth ten in the body.
 * 2. Query understanding. Each query word is resolved to index terms: exactly,
 *    as a prefix (so results appear while typing), through bench shorthand
 *    ("gnr" -> gram negative rods), or, when it matches nothing, by spelling
 *    correction against the index vocabulary.
 * 3. Retrieval. Every meaningful word must match (AND). If that finds nothing,
 *    the best partial matches are shown and the missing words named.
 * 4. Ranking. BM25-style term scores, plus boosts when the query is the title,
 *    an alias, or the start of the title, then a light per-kind prior.
 */

const FIELD_WEIGHTS = {
  title: 10,
  aliases: 6,
  keywords: 3,
  snippet: 1.5,
  body: 1
};

/** Saturation constant: repeated mentions help, with sharply diminishing returns. */
const SATURATION = 4;

const KIND_PRIOR: Record<SearchKind, number> = {
  term: 1,
  learn: 1.05,
  visual: 1,
  test: 1,
  guide: 0.9,
  tool: 0.95
};

/** Words dropped when deciding whether a glossary term answers a query outright. */
const GENERIC_TITLE_STEMS = new Set(['test', 'agar', 'medi']);

const MAX_PREFIX_EXPANSIONS = 30;

type DocMeta = {
  titleNorm: string;
  aliasNorms: string[];
  titleStems: Set<string>;
};

export type SearchIndex = {
  docs: SearchDoc[];
  meta: DocMeta[];
  /** stem -> (document index -> weighted term frequency) */
  postings: Map<string, Map<number, number>>;
  /** Every stem, sorted, for prefix lookups. */
  vocab: string[];
  /** stem -> the spelling most often written for it, for "Showing results for". */
  surface: Map<string, string>;
};

export const createSearchIndex = (docs: SearchDoc[]): SearchIndex => {
  const postings = new Map<string, Map<number, number>>();
  const spellings = new Map<string, Map<string, number>>();

  const meta = docs.map((doc, docIndex) => {
    const weights = new Map<string, number>();

    const addField = (text: string, weight: number) => {
      const counts = new Map<string, number>();

      splitWords(text).forEach((word) => {
        const stem = stemWord(word);
        counts.set(stem, (counts.get(stem) ?? 0) + 1);

        const forms = spellings.get(stem) ?? new Map<string, number>();
        forms.set(word, (forms.get(word) ?? 0) + 1);
        spellings.set(stem, forms);
      });

      counts.forEach((count, stem) => {
        weights.set(stem, (weights.get(stem) ?? 0) + weight * (1 + Math.log(count)));
      });
    };

    addField(doc.title, FIELD_WEIGHTS.title);
    addField(doc.aliases.join(' '), FIELD_WEIGHTS.aliases);
    addField(doc.keywords, FIELD_WEIGHTS.keywords);
    addField(doc.snippet, FIELD_WEIGHTS.snippet);
    addField(doc.body, FIELD_WEIGHTS.body);

    weights.forEach((weight, stem) => {
      const list = postings.get(stem) ?? new Map<number, number>();
      list.set(docIndex, weight);
      postings.set(stem, list);
    });

    return {
      titleNorm: normalizeText(doc.title),
      aliasNorms: doc.aliases.map(normalizeText),
      titleStems: new Set(splitWords(doc.title).map(stemWord))
    };
  });

  const surface = new Map<string, string>();
  spellings.forEach((forms, stem) => {
    let best = stem;
    let bestCount = 0;
    forms.forEach((count, form) => {
      if (count > bestCount) {
        best = form;
        bestCount = count;
      }
    });
    surface.set(stem, best);
  });

  return {
    docs,
    meta,
    postings,
    vocab: Array.from(postings.keys()).sort(),
    surface
  };
};

/* ------------------------------------------------------------------------- */
/* Query understanding                                                        */
/* ------------------------------------------------------------------------- */

type Alternative = {
  /** Index stems that must all be present. One stem for most alternatives. */
  stems: string[];
  quality: number;
};

type Slot = {
  word: string;
  required: boolean;
  alternatives: Alternative[];
  /** The spelling searched instead, when this word was corrected. */
  correction?: string;
};

const documentFrequency = (index: SearchIndex, stem: string) => index.postings.get(stem)?.size ?? 0;

const idf = (index: SearchIndex, stem: string) => {
  const df = documentFrequency(index, stem);
  return Math.log(1 + (index.docs.length - df + 0.5) / (df + 0.5));
};

/** Stems that begin with `prefix`, most widely used first. */
const prefixMatches = (index: SearchIndex, prefix: string) => {
  const { vocab } = index;
  let low = 0;
  let high = vocab.length;

  while (low < high) {
    const middle = (low + high) >> 1;
    if (vocab[middle] < prefix) low = middle + 1;
    else high = middle;
  }

  const found: string[] = [];
  for (let i = low; i < vocab.length && vocab[i].startsWith(prefix); i += 1) {
    found.push(vocab[i]);
  }

  return found
    .sort((first, second) => documentFrequency(index, second) - documentFrequency(index, first))
    .slice(0, MAX_PREFIX_EXPANSIONS);
};

/**
 * The index stem closest in spelling, or null. Ties go to a stem that keeps the
 * first letter (people rarely mistype that one), then to the more common stem.
 */
const closestStem = (index: SearchIndex, stem: string) => {
  const budget = typoBudget(stem.length);
  if (budget === 0) return null;

  let best: { stem: string; distance: number; rank: number } | null = null;

  for (const candidate of index.vocab) {
    if (Math.abs(candidate.length - stem.length) > budget) continue;

    const distance = editDistanceWithin(stem, candidate, best ? Math.min(budget, best.distance) : budget);
    if (distance === null) continue;

    // Lower is better: distance first, then a first-letter change, then rarity.
    const rank = distance * 1000 + (candidate[0] === stem[0] ? 0 : 500) - Math.min(documentFrequency(index, candidate), 499);
    if (!best || rank < best.rank) {
      best = { stem: candidate, distance, rank };
    }
  }

  return best;
};

/** While typing, a misspelled word is often also unfinished: "psuedom". */
const closestPrefixStems = (index: SearchIndex, word: string) => {
  const budget = Math.min(typoBudget(word.length), 2);
  if (budget === 0) return { stems: [] as string[], distance: Infinity };

  let bestDistance = Infinity;
  let matches: string[] = [];

  for (const candidate of index.vocab) {
    if (candidate.length < word.length) continue;

    const distance = editDistanceWithin(word, candidate.slice(0, word.length), Math.min(budget, bestDistance));
    if (distance === null) continue;

    if (distance < bestDistance) {
      bestDistance = distance;
      matches = [candidate];
    } else if (distance === bestDistance) {
      matches.push(candidate);
    }
  }

  const stems = matches
    .sort((first, second) => documentFrequency(index, second) - documentFrequency(index, first))
    .slice(0, MAX_PREFIX_EXPANSIONS);

  return { stems, distance: bestDistance };
};

const resolveWord = (index: SearchIndex, word: string, isTypingWord: boolean): Pick<Slot, 'alternatives' | 'correction'> => {
  const stem = stemWord(word);
  const alternatives: Alternative[] = [];
  const hasExact = index.postings.has(stem);

  if (hasExact) {
    alternatives.push({ stems: [stem], quality: 1 });
  }

  // Prefixes: always for the word being typed, otherwise only to rescue a long
  // word with no exact match ("staphylo" -> staphylococcus).
  const minimumPrefix = isTypingWord ? 2 : 4;
  if (word.length >= minimumPrefix && (isTypingWord || !hasExact)) {
    prefixMatches(index, word)
      .filter((candidate) => candidate !== stem)
      .forEach((candidate) => alternatives.push({ stems: [candidate], quality: hasExact ? 0.45 : 0.85 }));
  }

  (searchSynonyms[word] ?? []).forEach((phrase) => {
    const stems = splitWords(phrase).filter((part) => !stopWords.has(part)).map(stemWord);
    if (stems.length > 0 && stems.every((part) => index.postings.has(part))) {
      alternatives.push({ stems, quality: 0.95 });
    }
  });

  if (alternatives.length > 0) {
    return { alternatives };
  }

  const closest = closestStem(index, stem);

  // An unfinished word is more likely a misspelled start than a whole other
  // word: "psuedom" means pseudomonas, not "pseudo".
  if (isTypingWord && word.length >= 4) {
    const prefixes = closestPrefixStems(index, word);
    if (prefixes.stems.length > 0 && (!closest || prefixes.distance <= closest.distance)) {
      return {
        alternatives: prefixes.stems.map((candidate) => ({ stems: [candidate], quality: 0.7 })),
        correction: index.surface.get(prefixes.stems[0]) ?? prefixes.stems[0]
      };
    }
  }

  if (closest) {
    return {
      alternatives: [{ stems: [closest.stem], quality: Math.max(0.5, 0.9 - closest.distance * 0.1) }],
      correction: index.surface.get(closest.stem) ?? closest.stem
    };
  }

  return { alternatives: [] };
};

const parseQuery = (index: SearchIndex, rawQuery: string, typing: boolean): Slot[] => {
  const words = splitWords(rawQuery);

  // "O&P" arrives as "o p": rejoin runs of single letters into one word.
  const joined: string[] = [];
  let letters = '';
  words.forEach((word) => {
    if (/^[a-z]$/.test(word)) {
      letters += word;
      return;
    }
    if (letters) joined.push(letters);
    letters = '';
    joined.push(word);
  });
  if (letters) joined.push(letters);

  const meaningful = joined.filter((word) => !stopWords.has(word) && word.length > 1);
  // A query that is only stop words or letters still searches for them.
  const requiredWords = new Set(meaningful.length > 0 ? meaningful : joined);
  const endsMidWord = typing && !/\s$/.test(rawQuery);

  return joined.map((word, position) => ({
    word,
    required: requiredWords.has(word),
    ...resolveWord(index, word, endsMidWord && position === joined.length - 1)
  }));
};

/* ------------------------------------------------------------------------- */
/* Retrieval and ranking                                                      */
/* ------------------------------------------------------------------------- */

const saturate = (weight: number) => (weight * (SATURATION + 1)) / (weight + SATURATION);

/** document index -> this slot's best score in it */
const scoreSlot = (index: SearchIndex, slot: Slot) => {
  const scores = new Map<number, number>();

  slot.alternatives.forEach(({ stems, quality }) => {
    const lists = stems.map((stem) => index.postings.get(stem));
    if (lists.some((list) => !list)) return;

    const [first, ...rest] = lists as Array<Map<number, number>>;

    first.forEach((_, docIndex) => {
      if (!rest.every((list) => list.has(docIndex))) return;

      const total = stems.reduce((sum, stem, position) => (
        sum + idf(index, stem) * saturate((lists[position] as Map<number, number>).get(docIndex) as number)
      ), 0);
      const value = quality * (total / stems.length);

      if (value > (scores.get(docIndex) ?? 0)) {
        scores.set(docIndex, value);
      }
    });
  });

  return scores;
};

const answerKey = (text: string) => splitWords(text)
  .map(stemWord)
  .filter((stem) => !GENERIC_TITLE_STEMS.has(stem) && !stopWords.has(stem))
  .join(' ');

export type SearchOptions = {
  kind?: SearchKind | 'all';
  limit?: number;
  /**
   * True for search-as-you-type boxes: an unfinished last word matches as a
   * prefix. The search page sets it too, since it updates on every keystroke.
   */
  typing?: boolean;
};

const emptyCounts = (): Record<SearchKind, number> => (
  searchKinds.reduce((counts, kind) => ({ ...counts, [kind]: 0 }), {} as Record<SearchKind, number>)
);

export const runSearch = (index: SearchIndex, rawQuery: string, options: SearchOptions = {}): SearchResponse => {
  const { kind = 'all', limit = 20, typing = true } = options;
  const slots = parseQuery(index, rawQuery, typing);

  if (slots.length === 0) {
    return { hits: [], counts: emptyCounts(), highlightWords: [], droppedWords: [] };
  }

  const slotScores = slots.map((slot) => scoreSlot(index, slot));
  const required = slots.map((slot, position) => ({ slot, scores: slotScores[position] })).filter(({ slot }) => slot.required);

  // Candidates: documents matching every required word, or failing that, the
  // documents matching the most of them.
  const coverage = new Map<number, number>();
  required.forEach(({ scores }) => {
    scores.forEach((_, docIndex) => coverage.set(docIndex, (coverage.get(docIndex) ?? 0) + 1));
  });

  let bestCoverage = 0;
  coverage.forEach((count) => {
    if (count > bestCoverage) bestCoverage = count;
  });

  const candidates = Array.from(coverage.entries())
    .filter(([, count]) => count === bestCoverage && count > 0)
    .map(([docIndex]) => docIndex);

  const searchedWords = slots.map((slot) => slot.correction ?? slot.word);
  const effectiveQuery = normalizeText(searchedWords.join(' '));
  const queryKey = answerKey(effectiveQuery);

  const scored = candidates.map((docIndex) => {
    const doc = index.docs[docIndex];
    const meta = index.meta[docIndex];
    let score = slotScores.reduce((sum, scores) => sum + (scores.get(docIndex) ?? 0), 0);

    if (meta.titleNorm === effectiveQuery) score += 25;
    else if (meta.aliasNorms.includes(effectiveQuery)) score += 18;
    else if (meta.titleNorm.startsWith(effectiveQuery)) score += 10;
    else if (` ${meta.titleNorm} `.includes(` ${effectiveQuery} `)) score += 6;
    else if (meta.aliasNorms.some((alias) => alias.startsWith(effectiveQuery))) score += 5;

    // Every word of the query is in the title: a page about it, not one that mentions it.
    const titleCovers = required.every(({ slot }) => (
      slot.alternatives.some(({ stems }) => stems.every((stem) => meta.titleStems.has(stem)))
    ));
    if (titleCovers) score += 5;

    return { doc, score: score * KIND_PRIOR[doc.kind] * (doc.boost ?? 1) };
  }).sort((first, second) => second.score - first.score || first.doc.title.localeCompare(second.doc.title));

  const counts = emptyCounts();
  scored.forEach(({ doc }) => {
    counts[doc.kind] += 1;
  });

  // A glossary term whose name is the query answers it outright. An alias counts
  // only when it is another name for the thing ("afb stain", "bap"), not a
  // concept the term merely involves: "hemolysis" is an alias of blood agar, but
  // blood agar is not what hemolysis means.
  const isNameAlias = (alias: string) => {
    const key = answerKey(alias);
    return key === queryKey && (key.includes(' ') || key.length <= 5);
  };
  const answer = kind === 'all' && queryKey
    ? scored.find(({ doc }) => doc.kind === 'term' && (
      answerKey(doc.title) === queryKey || doc.aliases.some(isNameAlias)
    ))?.doc
    : undefined;

  const hits: SearchHit[] = scored
    .filter(({ doc }) => doc !== answer && (kind === 'all' || doc.kind === kind))
    .slice(0, limit);

  const corrected = slots.some((slot) => slot.correction);
  const topDoc = scored[0] ? index.docs.indexOf(scored[0].doc) : -1;
  const droppedWords = bestCoverage < required.length
    ? required.filter(({ scores }) => topDoc === -1 || !scores.has(topDoc)).map(({ slot }) => slot.word)
    : [];

  const highlightWords = Array.from(new Set(
    slots.flatMap((slot) => slot.alternatives.flatMap(({ stems }) => stems))
  ));

  return {
    hits,
    counts,
    correctedQuery: corrected ? searchedWords.join(' ') : undefined,
    highlightWords,
    droppedWords,
    answer
  };
};

/**
 * Splits page text into sentences. Body fields are joined with newlines, so a
 * table cell never runs into the next one, and "E. coli" or "spp." does not end
 * a sentence. (No lookbehind in the patterns: older iOS Safari cannot parse one.)
 */
const splitSentences = (text: string) => {
  const sentences: string[] = [];

  text.split('\n').forEach((line) => {
    const pieces = line.split(/([.!?])\s+/);
    let current = '';

    for (let i = 0; i < pieces.length; i += 2) {
      current = `${current} ${pieces[i]}${pieces[i + 1] ?? ''}`.trim();
      if (!/(\b[A-Z]|\bspp|\bvs|\bie|\beg)\.$/.test(current)) {
        sentences.push(current);
        current = '';
      }
    }

    if (current) sentences.push(current);
  });

  return sentences.filter(Boolean);
};

/**
 * The text to show under a result. The summary when it mentions what was
 * searched; otherwise the sentence of the page that mentions it most, so a
 * search for "pink ring" shows the line about the pink ring rather than a
 * generic summary. A long sentence is windowed around its first match.
 */
export const bestSnippet = (doc: SearchDoc, highlightWords: string[], maxLength = 220) => {
  const wanted = new Set(highlightWords);
  const isMatch = (word: string) => splitWords(word).some((part) => wanted.has(stemWord(part)));
  const matchCount = (text: string) => splitWords(text).filter((word) => wanted.has(stemWord(word))).length;

  const clip = (text: string) => {
    if (text.length <= maxLength) return text;

    const words = text.split(/\s+/);
    const firstMatch = words.findIndex(isMatch);
    // Keep a few words of lead-in before the match so it reads as a sentence.
    let start = Math.max(0, firstMatch - 6);
    while (start > 0 && words.slice(start).join(' ').length < maxLength) start -= 1;

    let clipped = words.slice(start).join(' ');
    if (clipped.length > maxLength) clipped = `${clipped.slice(0, maxLength).replace(/\s+\S*$/, '')}…`;
    return start > 0 ? `…${clipped}` : clipped;
  };

  if (wanted.size === 0 || matchCount(doc.snippet) > 0 || !doc.body) {
    return clip(doc.snippet);
  }

  let best = '';
  let bestCount = 0;
  splitSentences(doc.body).forEach((sentence) => {
    const count = matchCount(sentence);
    // On a tie, a full sentence reads better than a two-word table cell.
    if (count > bestCount || (count > 0 && count === bestCount && best.length < 60 && sentence.length > best.length)) {
      best = sentence;
      bestCount = count;
    }
  });

  return clip(best || doc.snippet);
};
