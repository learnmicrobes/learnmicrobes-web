/**
 * What site search indexes. Every searchable thing — a Learn topic, an atlas
 * card, a bench test, a glossary term, a guide, a tool — becomes one SearchDoc,
 * so the header panel, the home search box and the search page all rank the
 * same documents the same way.
 */
export type SearchKind = 'term' | 'learn' | 'visual' | 'test' | 'guide' | 'tool';

export type GlossaryAnswer = {
  category: string;
  definition: string;
  benchContext: string;
  details: string[];
  studentTip: string;
  relatedLinks: Array<{ label: string; path: string }>;
};

export type SearchDoc = {
  id: string;
  kind: SearchKind;
  title: string;
  /** Other names the thing goes by. A hit here ranks nearly as high as the title. */
  aliases: string[];
  /** Short text shown under the title in results. */
  snippet: string;
  path: string;
  /** Where the result lives, shown above the title: "Learn › Bacteriology". */
  trail: string;
  /** Organism group, when there is one, for the subject stain dot. */
  subject?: string;
  /** Curated words: categories, keywords, aliases from data files. */
  keywords: string;
  /** Everything else on the page. Matches here count, but least. */
  body: string;
  /** Score multiplier for secondary entries such as roadmap endpoints. Default 1. */
  boost?: number;
  /** Present on glossary terms, which answer the question in place. */
  answer?: GlossaryAnswer;
};

/** Hand-written entries for pages whose text cannot be indexed from data. */
export type DirectoryEntry = {
  id: string;
  title: string;
  kind: 'guide' | 'tool';
  snippet: string;
  path: string;
  keywords: string;
};

export type SearchHit = {
  doc: SearchDoc;
  score: number;
};

export type SearchResponse = {
  hits: SearchHit[];
  /** Hit counts per kind for the filter row, before the kind filter applies. */
  counts: Record<SearchKind, number>;
  /** The query actually searched, when spelling correction changed it. */
  correctedQuery?: string;
  /** Normalised words to highlight in titles and snippets. */
  highlightWords: string[];
  /** Query words that matched nothing and were dropped to get any results. */
  droppedWords: string[];
  /** A glossary term that answers the query outright, Google-style. */
  answer?: SearchDoc;
};

export const searchKindLabels: Record<SearchKind, string> = {
  term: 'Bench term',
  learn: 'Learn',
  visual: 'Atlas',
  test: 'Bench test',
  guide: 'Guide',
  tool: 'Tool'
};

/** Plural labels for the filter row. */
export const searchKindFilterLabels: Record<SearchKind, string> = {
  term: 'Terms',
  learn: 'Learn',
  visual: 'Atlas',
  test: 'Tests',
  guide: 'Guides',
  tool: 'Tools'
};

export const searchKinds: SearchKind[] = ['term', 'learn', 'visual', 'test', 'guide', 'tool'];
