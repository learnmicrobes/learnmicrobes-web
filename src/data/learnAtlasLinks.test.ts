import { describe, expect, it } from '@jest/globals';
import { atlasPages } from './atlasPages';
import { learnTopics } from './learnTopics';
import { getLearnTopicAtlasCards } from './learnAtlasLinks';

const cardsFor = (topicSlug: string) => getLearnTopicAtlasCards(topicSlug, atlasPages).map((page) => page.slug);

describe('Learn topic Atlas cards', () => {
  it('keeps MRS Broth off the resistance page (no "mrs" inside "MRSA")', () => {
    expect(cardsFor('antimicrobial-resistance-mechanisms')).toEqual([]);
  });

  it('shows Oxidase on Neisseria/Moraxella next to the butyrate disk', () => {
    expect(cardsFor('neisseria-moraxella')).toEqual(['butyrate-disk', 'oxidase-test']);
  });

  it('shows Hippurate and Urease on Campylobacter, and not the CAMP test', () => {
    expect(cardsFor('campylobacter-helicobacter-arcobacter')).toEqual(['hippurate-hydrolysis', 'urease-test']);
  });

  it('keeps CAMP on Strep/Enterococcus and TSI on Enterobacterales only', () => {
    const topicsShowing = (cardSlug: string) =>
      learnTopics.filter((topic) => cardsFor(topic.slug).includes(cardSlug)).map((topic) => topic.slug);

    expect(topicsShowing('camp-test')).toEqual(['streptococcus-enterococcus']);
    expect(topicsShowing('tsi-test')).toEqual(['enterobacterales']);
  });

  it('drops the other text-match accidents', () => {
    expect(cardsFor('media-selection-patterns')).toEqual([]);
    expect(cardsFor('spirochetes-cell-wall-deficient-intracellular-agents')).toEqual([]);
  });

  it('gives Yeasts its own curated cards, and not Histoplasma', () => {
    const yeastCards = cardsFor('yeasts');

    expect(yeastCards).toEqual([
      'candida-albicans-germ-tube',
      'cryptococcus-neoformans-capsule',
      'trichosporon-arthroconidia',
      'candida-cornmeal-agar-morphology',
      'malassezia-furfur-koh'
    ]);
    expect(yeastCards).not.toContain('histoplasma-capsulatum');
    expect(yeastCards).not.toContain('tissue-yeast-size-comparison');
    // The Atlas card itself is untouched.
    expect(atlasPages.some((page) => page.slug === 'histoplasma-capsulatum')).toBe(true);
  });

  it('leaves unaffected topics exactly as they were', () => {
    expect(cardsFor('enterobacterales')).toEqual([
      'lysine-iron-agar',
      'indole-production',
      'citrate-utilization',
      'decarboxylase-tests',
      'methyl-red-voges-proskauer',
      'motility-testing',
      'mug-test',
      'nitrate-reduction',
      'onpg-test',
      'phenylalanine-deaminase',
      'spot-indole',
      'tsi-test',
      'urease-test'
    ]);
    expect(cardsFor('streptococcus-enterococcus')).toEqual([
      'bacitracin-susceptibility',
      'bile-esculin',
      'esculin-hydrolysis',
      'bile-solubility',
      'hippurate-hydrolysis',
      'leucine-aminopeptidase-lap-test',
      'camp-test',
      'optochin-test',
      'pyr-test',
      'pyruvate-broth',
      'salt-tolerance'
    ]);
    expect(cardsFor('staphylococcus-micrococcus')).toEqual(['catalase-test', 'coagulase-test', 'dnase-test', 'microdase-test']);
    expect(cardsFor('nonfermenting-gram-negative-rods')).toEqual([
      'acetamide-utilization',
      'growth-at-42-c',
      'cetrimide-agar',
      'nitrite-reduction',
      'oxidase-test',
      'of-medium',
      'xv-factor-test'
    ]);
    expect(cardsFor('gram-positive-bacilli-overview')).toEqual(['mrs-broth']);
    expect(cardsFor('oxidase-test')).toEqual(['oxidase-test']);
    expect(cardsFor('acid-fast-stain')).toEqual(['cryptosporidium-oocyst', 'cyclospora-cystoisospora-maf']);
    expect(cardsFor('hanging-drop-preparation')).toEqual(['flagella-stain-wet-mount', 'motility-testing']);
    expect(cardsFor('intestinal-protozoa')).toHaveLength(7);
    expect(cardsFor('gram-stain')).toEqual([]);
  });

  it('returns nothing for a slug that is not a topic', () => {
    expect(cardsFor('not-a-topic')).toEqual([]);
  });
});
