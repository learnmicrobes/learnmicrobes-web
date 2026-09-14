import { learnTopics } from './learnTopics';
import { atlasPages } from './atlasPages';
import { biochemicalTestsData } from '../tools/BiochemicalTests/biochemicalData';

export type DashboardSearchItem = {
  id: string;
  title: string;
  category: 'Guide' | 'Learn' | 'Roadmap' | 'Test' | 'Tool' | 'Visual';
  snippet: string;
  path: string;
  keywords: string;
  priority: number;
};

/**
 * Full-text search entries for Learn topics, bench tests, and atlas cards. The home
 * search box loads this module the first time someone uses it, so the full text of
 * all three stays out of the first download.
 */
export const buildContentSearchItems = (): DashboardSearchItem[] => {
  const learnItems: DashboardSearchItem[] = learnTopics.map((topic) => ({
    id: `learn-${topic.slug}`,
    title: topic.title,
    category: 'Learn',
    snippet: topic.summary,
    path: `/learn/${topic.slug}`,
    keywords: [
      topic.title,
      topic.category,
      topic.summary,
      topic.whyItMatters,
      topic.principle,
      topic.studentShortcut,
      ...topic.keywords
    ].join(' '),
    priority: 6
  }));

  const testItems: DashboardSearchItem[] = biochemicalTestsData.map((test) => ({
    id: `test-${test.id}`,
    title: test.name,
    category: 'Test',
    snippet: test.principle,
    path: '/biochemical-tests',
    keywords: [
      test.name,
      test.category,
      test.principle,
      test.reagents,
      test.procedure,
      test.expectedResults
    ].join(' '),
    priority: 5
  }));

  const visualItems: DashboardSearchItem[] = atlasPages.map((page) => ({
    id: `visual-${page.slug}`,
    title: page.title,
    category: 'Visual',
    snippet: page.summary,
    path: `/visuals/${page.slug}`,
    keywords: [
      page.title,
      page.eyebrow,
      page.summary,
      page.boardTitle,
      page.boardNote,
      page.readoutTitle,
      page.trapTitle,
      ...page.trapBullets,
      ...page.interpretationRows.flat(),
      ...page.takeaways
    ].join(' '),
    priority: 5
  }));

  return [...learnItems, ...testItems, ...visualItems];
};
