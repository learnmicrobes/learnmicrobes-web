import type { AtlasPage } from './atlasPages';

/**
 * Which Atlas cards a Learn topic shows, besides the cards that already name
 * the topic as their home through their own `relatedLearnSlug`.
 *
 * Exact slugs only: a Learn topic slug on the left, Atlas card slugs on the
 * right. Never match on text. The page used to guess by looking for a card's
 * test id inside the topic's keywords, and that put MRS Broth on the
 * resistance page ("mrs" inside "MRSA"), the CAMP test on Campylobacter, and
 * TSI on the Rickettsia page ("tsi" inside "rickettsia"). Renaming a test id
 * also silently took Oxidase off Neisseria and Urease off Campylobacter.
 *
 * Add a card here only when it teaches something the topic covers. A card
 * whose `relatedLearnSlug` already names the topic must not be repeated here;
 * `npm run check:links` fails the build on a repeat or on a slug that does
 * not exist.
 */
export const extraAtlasCardsByLearnTopic: Readonly<Record<string, readonly string[]>> = {
  'catalase-test': ['catalase-test'],
  'coagulase-test': ['coagulase-test'],
  'oxidase-test': ['oxidase-test'],
  'acid-fast-stain': ['cryptosporidium-oocyst', 'cyclospora-cystoisospora-maf'],
  'hanging-drop-preparation': ['motility-testing'],
  'staphylococcus-species-patterns': ['coagulase-test'],
  'streptococcus-enterococcus': ['esculin-hydrolysis'],
  'catalase-negative-nonsporeforming-rods': ['catalase-test'],
  'neisseria-moraxella': ['oxidase-test'],
  'campylobacter-helicobacter-arcobacter': ['hippurate-hydrolysis', 'urease-test'],
  // One card per yeast the page organizes, plus the Candida species read on
  // cornmeal agar. The dimorphic fungi stay with the molds topic, and the
  // tissue-yeast and arthroconidia comparisons are left out because they lead
  // with Histoplasma and Coccidioides.
  yeasts: [
    'candida-albicans-germ-tube',
    'candida-cornmeal-agar-morphology',
    'cryptococcus-neoformans-capsule',
    'malassezia-furfur-koh',
    'trichosporon-arthroconidia'
  ]
};

/**
 * The Atlas cards for one Learn topic, in Atlas order: every card whose home
 * is the topic, plus the topic's extra cards above. The first two fill the
 * page's "Visual reactions" panel; all of them are listed as bench cards.
 */
export const getLearnTopicAtlasCards = (topicSlug: string, pages: readonly AtlasPage[]): AtlasPage[] => {
  const extraSlugs = new Set(extraAtlasCardsByLearnTopic[topicSlug] ?? []);
  return pages.filter((page) => page.relatedLearnSlug === topicSlug || extraSlugs.has(page.slug));
};
