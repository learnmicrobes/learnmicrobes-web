import type { QuestionBankArea } from './questionBank';

/**
 * One taxonomy for the bench.
 *
 * The question bank already types its areas as the bench phases: preanalytic,
 * then the five analytic subjects, then postanalytic. Case studies used to
 * carry a free-text `area` holding 'Bacteriology' and friends, which meant two
 * vocabularies for one domain and no way to join them - 'Bacteriology' is not
 * 'analytic-bacteriology'. That matters for anything that has to reason across
 * surfaces at once, a paid tier most of all: a rule like "parasitology" or
 * "post-analytics" can be answered from a typed field or not at all.
 *
 * The import is type-only, so nothing here pulls the question bank itself into
 * a chunk that just needs a label.
 */

/** The order a specimen actually moves through the lab. */
export const benchAreaOrder: QuestionBankArea[] = [
  'preanalytic-procedures',
  'analytic-bacteriology',
  'analytic-mycobacteriology',
  'analytic-parasitology',
  'analytic-mycology',
  'analytic-virology',
  'postanalytic-procedures'
];

/**
 * The short key. Two jobs: it is the quiz's own category value, and it is what
 * getSubjectStain() matches on - that lookup keys off 'bacteriology', never
 * 'analytic-bacteriology', so a stain silently disappears without this hop.
 */
export type BenchAreaKey =
  | 'preanalytics'
  | 'bacteriology'
  | 'mycobacteriology'
  | 'virology'
  | 'parasitology'
  | 'mycology'
  | 'postanalytics';

export const benchAreaKey: Record<QuestionBankArea, BenchAreaKey> = {
  'preanalytic-procedures': 'preanalytics',
  'analytic-bacteriology': 'bacteriology',
  'analytic-mycobacteriology': 'mycobacteriology',
  'analytic-virology': 'virology',
  'analytic-parasitology': 'parasitology',
  'analytic-mycology': 'mycology',
  'postanalytic-procedures': 'postanalytics'
};

/** What a learner reads. Never show the union value itself in the UI. */
export const benchAreaLabel: Record<QuestionBankArea, string> = {
  'preanalytic-procedures': 'Preanalytics',
  'analytic-bacteriology': 'Bacteriology',
  'analytic-mycobacteriology': 'Mycobacteriology',
  'analytic-virology': 'Virology',
  'analytic-parasitology': 'Parasitology',
  'analytic-mycology': 'Mycology',
  'postanalytic-procedures': 'Postanalytics'
};
