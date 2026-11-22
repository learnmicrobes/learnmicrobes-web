/*
 * Fails the build when a content link points at something that does not exist.
 *
 * A wrong id does not crash anything. The page just falls back quietly: an
 * Atlas card whose biochemicalTestId matches no test opens the A–Z list
 * instead of its procedure, and a Learn link to a missing slug shows the hub.
 * Twelve Atlas cards shipped that way before this check existed.
 *
 * Checked:
 * - every Atlas card's biochemicalTestId (a Biochemical Tests id)
 * - every Atlas card's relatedLearnSlug (a Learn topic slug)
 * - every entry in src/data/learnAtlasLinks.ts: a real Learn topic, real Atlas
 *   cards, no card listed twice or under the topic it already calls home
 * - every Learn topic's and case study's relatedLinks path: the route must be
 *   registered in src/Routes.tsx, /learn/<slug> and /visuals/<slug> must name a
 *   real topic or card, and /biochemical-tests?test=<id> a real test.
 *
 * Runs before `npm run build`, after build-content-index. Run it alone with
 * `npm run check:links`.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');

// Same loader as build-content-index.cjs: the data modules are plain data with
// type-only imports, so transpiling each file on require is enough.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true }
  });
  module._compile(outputText, filename);
};

const { learnTopics } = require(path.join(ROOT, 'src', 'data', 'learnTopics.ts'));
const { atlasPages } = require(path.join(ROOT, 'src', 'data', 'atlasPages.ts'));
const { caseStudies } = require(path.join(ROOT, 'src', 'data', 'caseStudies.ts'));
const { biochemicalTestsData } = require(path.join(ROOT, 'src', 'tools', 'BiochemicalTests', 'biochemicalData.ts'));
const { extraAtlasCardsByLearnTopic } = require(path.join(ROOT, 'src', 'data', 'learnAtlasLinks.ts'));

// Read a list out of a .tsx file that cannot be required here. If the source
// changes shape and nothing matches, stop rather than check against nothing.
const readFromSource = (relativePath, pattern, describe) => {
  const source = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
  const values = [...source.matchAll(pattern)].map((match) => match[1]);
  if (values.length === 0) {
    console.error(`check-content-links: could not read ${describe} from ${relativePath}; update this script.`);
    process.exit(1);
  }
  return values;
};

const routePaths = readFromSource('src/Routes.tsx', /<Route\s+path="([^"]+)"/g, 'the route list');
const staticRoutes = new Set(
  routePaths.filter((route) => !route.includes(':') && route !== '*').map((route) => route.replace(/^\/+/, ''))
);
const [disciplineUnion] = readFromSource(
  'src/components/VisualAtlas/VisualAtlas.tsx',
  /type VisualDiscipline\s*=\s*([^;]+);/g,
  'the VisualDiscipline type'
);
const atlasDisciplines = [...disciplineUnion.matchAll(/'([^']+)'/g)].map((match) => match[1]);

const testIds = new Set(biochemicalTestsData.map((test) => test.id));
const learnSlugs = new Set(learnTopics.map((topic) => topic.slug));
const atlasSlugs = new Set([...atlasPages.map((page) => page.slug), ...atlasDisciplines]);

const problems = [];
let checked = 0;

// Returns why a site path is broken, or null when it resolves.
const findPathProblem = (linkPath) => {
  if (/^[a-z]+:/i.test(linkPath)) {
    return null; // external (https:, mailto:) — not ours to resolve
  }
  if (!linkPath.startsWith('/')) {
    return 'is not an absolute site path';
  }

  const url = new URL(linkPath, 'https://learnmicrobes.local');
  const route = url.pathname.replace(/^\/+|\/+$/g, '');
  const [section, slug, ...rest] = route.split('/');

  if (route === '') {
    return null;
  }
  if (section === 'learn' && slug !== undefined && rest.length === 0) {
    return learnSlugs.has(slug) ? null : `names Learn topic "${slug}", which does not exist`;
  }
  if (section === 'visuals' && slug !== undefined && rest.length === 0) {
    return atlasSlugs.has(slug) ? null : `names Atlas card "${slug}", which does not exist`;
  }
  if (!staticRoutes.has(route)) {
    return `uses route "/${route}", which is not registered in src/Routes.tsx`;
  }
  if (route === 'biochemical-tests' && url.searchParams.has('test')) {
    const testId = url.searchParams.get('test');
    return testIds.has(testId) ? null : `names test "${testId}", which is not a Biochemical Tests id`;
  }
  return null;
};

for (const page of atlasPages) {
  if (page.biochemicalTestId !== undefined) {
    checked += 1;
    if (!testIds.has(page.biochemicalTestId)) {
      problems.push(`Atlas card "${page.slug}": biochemicalTestId "${page.biochemicalTestId}" is not a Biochemical Tests id`);
    }
  }
  if (page.relatedLearnSlug !== undefined) {
    checked += 1;
    if (!learnSlugs.has(page.relatedLearnSlug)) {
      problems.push(`Atlas card "${page.slug}": relatedLearnSlug "${page.relatedLearnSlug}" is not a Learn topic`);
    }
  }
}

// The extra Atlas cards each Learn topic shows (src/data/learnAtlasLinks.ts).
// A card listed under its own home topic would show anyway, so a repeat there
// means the entry is dead weight or the card's home changed.
const homeTopicByCard = new Map(atlasPages.map((page) => [page.slug, page.relatedLearnSlug]));
for (const [topicSlug, cardSlugs] of Object.entries(extraAtlasCardsByLearnTopic)) {
  checked += 1;
  if (!learnSlugs.has(topicSlug)) {
    problems.push(`Learn-Atlas link: "${topicSlug}" is not a Learn topic`);
  }
  const seen = new Set();
  for (const cardSlug of cardSlugs) {
    checked += 1;
    if (!homeTopicByCard.has(cardSlug)) {
      problems.push(`Learn-Atlas link "${topicSlug}": "${cardSlug}" is not an Atlas card`);
    } else if (homeTopicByCard.get(cardSlug) === topicSlug) {
      problems.push(`Learn-Atlas link "${topicSlug}": "${cardSlug}" already names this topic as its relatedLearnSlug`);
    }
    if (seen.has(cardSlug)) {
      problems.push(`Learn-Atlas link "${topicSlug}": "${cardSlug}" is listed twice`);
    }
    seen.add(cardSlug);
  }
}

const checkRelatedLinks = (kind, owner, links) => {
  for (const link of links ?? []) {
    checked += 1;
    const problem = findPathProblem(link.path);
    if (problem) {
      problems.push(`${kind} "${owner}": link "${link.label}" (${link.path}) ${problem}`);
    }
  }
};

for (const topic of learnTopics) {
  checkRelatedLinks('Learn topic', topic.slug, topic.relatedLinks);
}
for (const study of caseStudies) {
  checkRelatedLinks('Case study', study.id, study.relatedLinks);
}

if (problems.length > 0) {
  console.error(`content links: ${problems.length} broken of ${checked} checked`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  console.error('Test ids live in src/tools/BiochemicalTests/biochemicalData.ts; Learn slugs in src/data/learnTopics.ts.');
  process.exit(1);
}

console.log(`content links: ${checked} checked, 0 missing`);
