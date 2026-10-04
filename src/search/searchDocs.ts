import { glossaryEntries } from '../data/glossaryData';
import { learnTopics } from '../data/learnTopics';
import { atlasPages } from '../data/atlasPages';
import { getSearchAliases } from '../data/searchAliases';
import { biochemicalTestsData } from '../tools/BiochemicalTests/biochemicalData';
import { gramPositiveRoadmap } from '../tools/GramPositiveRoadmap/data';
import { guideDirectory, toolDirectory } from './searchDirectory';
import type { SearchDoc } from './searchTypes';

/**
 * Builds every search document from the site's data files. This module pulls in
 * the full text of Learn, the atlas, the glossary and the tests, so it is only
 * ever loaded with a dynamic import (see useSiteSearch) — never from the shell.
 */

const join = (...parts: Array<string | string[] | undefined>) => parts
  .flat()
  .filter((part): part is string => Boolean(part))
  // Newlines keep table cells and list items apart for snippet sentences; the
  // indexer treats them as spaces.
  .join('\n');

// "Visual Atlas / Parasitology" -> "Parasitology"; plain "Visual Atlas" cards are
// the bench reactions.
const atlasSection = (eyebrow: string) => eyebrow.split('/')[1]?.trim() || 'Bench reactions';

const buildTermDocs = (): SearchDoc[] => glossaryEntries.map((entry) => ({
  id: `term-${entry.id}`,
  kind: 'term',
  title: entry.term,
  aliases: entry.aliases,
  snippet: entry.definition,
  // A term has no page of its own; opening it searches for it, which puts its
  // answer card at the top of the results.
  path: `/search?q=${encodeURIComponent(entry.term)}`,
  trail: `Bench terms › ${entry.category}`,
  keywords: entry.category,
  body: join(entry.details, entry.benchContext, entry.studentTip, entry.relatedLinks.map((link) => link.label)),
  answer: {
    category: entry.category,
    definition: entry.definition,
    benchContext: entry.benchContext,
    details: entry.details,
    studentTip: entry.studentTip,
    relatedLinks: entry.relatedLinks
  }
}));

const buildLearnDocs = (): SearchDoc[] => learnTopics
  .filter((topic, index, topics) => topics.findIndex((candidate) => candidate.slug === topic.slug) === index)
  .map((topic) => ({
    id: `learn-${topic.slug}`,
    kind: 'learn',
    title: topic.title,
    aliases: getSearchAliases(topic.slug, topic.title),
    snippet: topic.summary,
    path: `/learn/${topic.slug}`,
    trail: `Learn › ${topic.category}`,
    subject: topic.category,
    keywords: join(topic.category, topic.keywords),
    body: join(
      topic.summary,
      topic.whyItMatters,
      topic.principle,
      topic.studentShortcut,
      topic.basicSteps,
      topic.interpretation,
      topic.commonMistakes,
      (topic.tables ?? []).flatMap((table) => [table.title, ...table.columns, ...table.rows.flat()])
    )
  }));

const buildVisualDocs = (): SearchDoc[] => atlasPages.map((page) => {
  const section = atlasSection(page.eyebrow);

  return {
    id: `visual-${page.slug}`,
    kind: 'visual',
    title: page.title,
    aliases: getSearchAliases(page.slug, page.title),
    snippet: page.summary,
    path: `/visuals/${page.slug}`,
    trail: `Atlas › ${section}`,
    subject: section,
    keywords: join(section, page.boardTitle),
    body: join(
      page.summary,
      page.boardNote,
      page.readoutTitle,
      page.trapTitle,
      page.trapBody,
      page.trapBullets,
      page.interpretationTitle,
      page.remember,
      page.tubes.flatMap((tube) => [tube.label, tube.name, tube.note]),
      page.readoutRows.flat(),
      page.interpretationRows.flat(),
      page.takeaways
    )
  };
});

const buildTestDocs = (): SearchDoc[] => biochemicalTestsData.map((test) => ({
  id: `test-${test.id}`,
  kind: 'test',
  title: test.name,
  aliases: getSearchAliases(test.id, test.name),
  snippet: test.principle,
  path: `/biochemical-tests?test=${encodeURIComponent(test.id)}`,
  trail: `Bench tests › ${test.category}`,
  keywords: test.category,
  body: join(test.principle, test.reagents, test.procedure, test.qcPositive, test.qcNegative, test.expectedResults)
}));

const buildDirectoryDocs = (): SearchDoc[] => [...guideDirectory, ...toolDirectory].map((entry) => ({
  id: `${entry.kind}-${entry.id}`,
  kind: entry.kind,
  title: entry.title,
  aliases: [],
  snippet: entry.snippet,
  path: entry.path,
  trail: entry.kind === 'guide' ? 'Deep guides' : 'Tools',
  keywords: entry.keywords,
  body: ''
}));

// Each organism the Gram positive roadmap can end on, so a search for one that
// has no Learn page of its own still finds where it is worked up.
const buildRoadmapDocs = (): SearchDoc[] => {
  const byConclusion = new Map<string, string[]>();

  gramPositiveRoadmap.forEach((step) => {
    step.options.forEach((option) => {
      if (!option.conclusion) return;
      const clues = byConclusion.get(option.conclusion) ?? [];
      clues.push(step.question.replace(/:$/, ''), option.text, ...(option.tests ?? []));
      byConclusion.set(option.conclusion, clues);
    });
  });

  return Array.from(byConclusion.entries()).map(([conclusion, clues], index) => ({
    id: `roadmap-gp-${index}`,
    kind: 'tool',
    title: conclusion,
    aliases: [],
    snippet: `An endpoint of the Gram Positive Roadmap. Reached through: ${Array.from(new Set(clues)).slice(0, 4).join(', ')}.`,
    path: '/gram-positive-roadmap',
    trail: 'Tools › Gram Positive Roadmap',
    keywords: 'gram positive roadmap',
    body: clues.join(' '),
    boost: 0.55
  }));
};

export const buildSearchDocs = (): SearchDoc[] => [
  ...buildTermDocs(),
  ...buildLearnDocs(),
  ...buildVisualDocs(),
  ...buildTestDocs(),
  ...buildDirectoryDocs(),
  ...buildRoadmapDocs()
];
