import type { DashboardSearchItem } from '../../data/dashboardSearchContent';
import { matchAllTerms, normalizeSearchText, tokenize } from '../../utils/fuzzyMatch';

export type SiteSearchResult = {
  items: DashboardSearchItem[];
  /**
   * Set when nothing matched as typed and the results come from a spelling the
   * query was close to, so the UI can say what it actually searched for.
   */
  correctedQuery?: string;
};

type Scored = { item: DashboardSearchItem; score: number; corrections: string[] };

const scoreItem = (item: DashboardSearchItem, query: string, terms: string[], allowTypos: boolean): Scored | null => {
  const title = normalizeSearchText(item.title);
  const haystack = normalizeSearchText(`${item.title} ${item.category} ${item.snippet} ${item.keywords}`);

  let corrections: string[] = [];

  if (allowTypos) {
    const matches = matchAllTerms(terms, haystack);
    if (!matches) return null;
    corrections = matches.map((match) => match.word);

    // Rank on the spelling we matched, not the one that was typed, so a
    // misspelled "pseudomonas" still leads with the Pseudomonas card rather
    // than whatever merely mentions it.
    const corrected = corrections.join(' ');
    let score = item.priority;
    if (title.startsWith(corrected)) score += 7;
    if (title.includes(corrected)) score += 4;
    if (tokenize(title).some((word) => corrections.some((correction) => word.startsWith(correction)))) score += 3;

    // A typo is still a worse match than a clean one, so it pays for the edits.
    score -= matches.reduce((total, match) => total + match.distance, 0) * 3;

    return { item, score, corrections };
  }

  if (!terms.every((term) => haystack.includes(term))) return null;

  let score = item.priority;
  if (title.startsWith(query)) score += 7;
  if (title.includes(query)) score += 4;
  if (normalizeSearchText(item.path).includes(query)) score += 2;

  // A word that begins with the term beats one that merely contains it, so
  // "gram" leads with "Gram stain" rather than "programmed".
  if (tokenize(title).some((word) => terms.some((term) => word.startsWith(term)))) score += 3;

  return { item, score, corrections: [] };
};

const rank = (scored: Scored[], limit: number) => scored
  .sort((first, second) => second.score - first.score || first.item.title.localeCompare(second.item.title))
  .slice(0, limit);

/**
 * Ranks site search items for a query. Shared by the home hero search box, the
 * header search panel and the search page so all three agree.
 *
 * Exact matching runs first and is what a correctly spelled query gets. Only
 * when that finds nothing does it try again allowing typos, which keeps the
 * common path cheap and stops a near-miss outranking a real hit.
 */
export const searchSiteItems = (index: DashboardSearchItem[], rawQuery: string, limit = 6): SiteSearchResult => {
  const query = normalizeSearchText(rawQuery);
  const terms = tokenize(query);

  if (!query) {
    return { items: rank(index.map((item) => ({ item, score: item.priority, corrections: [] })), limit).map((entry) => entry.item) };
  }

  const exact = index
    .map((item) => scoreItem(item, query, terms, false))
    .filter((entry): entry is Scored => entry !== null);

  if (exact.length > 0) {
    return { items: rank(exact, limit).map((entry) => entry.item) };
  }

  const fuzzy = index
    .map((item) => scoreItem(item, query, terms, true))
    .filter((entry): entry is Scored => entry !== null);

  if (fuzzy.length === 0) {
    return { items: [] };
  }

  const ranked = rank(fuzzy, limit);
  const corrected = ranked[0].corrections.join(' ');

  return {
    items: ranked.map((entry) => entry.item),
    correctedQuery: corrected && corrected !== query ? corrected : undefined
  };
};
