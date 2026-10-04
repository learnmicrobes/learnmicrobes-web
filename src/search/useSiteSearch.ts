import { useEffect, useState } from 'react';
import { createSearchIndex, runSearch, type SearchIndex } from './searchEngine';
import type { SearchDoc } from './searchTypes';

/**
 * One search index for the whole app. The documents carry the full text of
 * Learn, the atlas, the glossary and the tests, so they load with a dynamic
 * import the first time any search box is used, then stay in memory: the header
 * panel, the home box and the search page all share the same copy.
 */
let cachedIndex: SearchIndex | null = null;
let pendingIndex: Promise<SearchIndex> | null = null;

export const loadSearchIndex = (): Promise<SearchIndex> => {
  if (cachedIndex) return Promise.resolve(cachedIndex);

  if (!pendingIndex) {
    pendingIndex = import('./searchDocs')
      .then(({ buildSearchDocs }) => {
        cachedIndex = createSearchIndex(buildSearchDocs());
        return cachedIndex;
      })
      .catch((error) => {
        // Let the next attempt retry, e.g. after a dropped connection.
        pendingIndex = null;
        throw error;
      });
  }

  return pendingIndex;
};

/**
 * The shared index, or null until it has loaded. Pass `enabled: false` to hold
 * off loading until the person shows intent, such as focusing a search box.
 */
export const useSearchIndex = (enabled = true) => {
  const [index, setIndex] = useState<SearchIndex | null>(cachedIndex);

  useEffect(() => {
    if (!enabled || index) return undefined;

    let active = true;
    loadSearchIndex()
      .then((loaded) => {
        if (active) setIndex(loaded);
      })
      .catch(() => {
        // Search boxes show their loading state until a later attempt succeeds.
      });

    return () => {
      active = false;
    };
  }, [enabled, index]);

  return index;
};

// Kept here rather than in searchDirectory so the shell can read it without
// pulling the directory into the first download.
const popularDocIds = [
  'learn-gram-stain',
  'tool-biochemical-tests',
  'tool-r5',
  'tool-r1',
  'tool-atlas-hub'
];

/** Starting points to offer in an empty search box. */
export const getPopularDocs = (index: SearchIndex) => popularDocIds
  .map((id) => index.docs.find((doc) => doc.id === id))
  .filter((doc): doc is SearchDoc => Boolean(doc));

export type QuickSearchResult = {
  docs: SearchDoc[];
  highlightWords: string[];
  correctedQuery?: string;
};

/**
 * The short list a search-as-you-type dropdown shows: the answering term first
 * when there is one, then the best hits; popular pages for an empty box.
 */
export const quickSearch = (index: SearchIndex, query: string, limit = 6): QuickSearchResult => {
  if (!query.trim()) {
    return { docs: getPopularDocs(index), highlightWords: [] };
  }

  const response = runSearch(index, query, { limit });
  const hits = response.hits.map((hit) => hit.doc);

  return {
    docs: (response.answer ? [response.answer, ...hits] : hits).slice(0, limit),
    highlightWords: response.highlightWords,
    correctedQuery: response.correctedQuery
  };
};
