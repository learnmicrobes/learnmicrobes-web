import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { learnTopics, getLearnTopicBySlug } from '../../data/learnTopics';
import { atlasPages } from '../VisualAtlas/VisualAtlas';
import './Learn.css';

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const categoryOrder = [
  'Foundations',
  'Clinical Lab Principles',
  'Core Methods',
  'Bacteriology',
  'Mycology',
  'Parasitology',
  'Virology',
  'Molecular and Immunodiagnostics',
  'Bench and Exam Integration'
];

const learningLaneMeta: Record<string, { number: string; description: string }> = {
  Foundations: {
    number: '01',
    description: 'Organism naming, bacterial structure, genetics, metabolism, host response, and normal flora logic.'
  },
  'Clinical Lab Principles': {
    number: '02',
    description: 'Safety, specimens, diagnostic methods, antimicrobial activity, QC, and clinical lab reasoning.'
  },
  'Core Methods': {
    number: '03',
    description: 'Microscopy, stains, media, atmosphere, colony reading, and branch-point tests.'
  },
  Bacteriology: {
    number: '04',
    description: 'Bacterial identification principles and major bacterial organism groups.'
  },
  Mycology: {
    number: '05',
    description: 'Fungal specimens, yeasts, molds, dermatophytes, dimorphic fungi, and fungal diagnostics.'
  },
  Parasitology: {
    number: '06',
    description: 'Stool O&P, protozoa, helminths, blood parasites, malaria, and parasite methods.'
  },
  Virology: {
    number: '07',
    description: 'Viral structure, specimen selection, respiratory viruses, herpesviruses, hepatitis, and HIV basics.'
  },
  'Molecular and Immunodiagnostics': {
    number: '08',
    description: 'NAAT, PCR, sequencing, MALDI-TOF, immunoassays, and serology interpretation.'
  },
  'Bench and Exam Integration': {
    number: '09',
    description: 'Unknown isolate thinking, syndrome-to-test logic, exam pathways, tables, and common traps.'
  }
};

const studyPaths = [
  {
    label: 'New learner',
    title: 'Start with the foundation set',
    description: 'Naming, structure, specimen logic, stains, and culture basics before organism-heavy review.',
    path: '/learn/microbial-taxonomy'
  },
  {
    label: 'Bench learner',
    title: 'Follow the specimen-to-answer path',
    description: 'Collection, safety, direct exam, culture conditions, branch tests, and reporting judgment.',
    path: '/learn/specimen-collection-transport'
  },
  {
    label: 'ASCP review',
    title: 'Use tables and syndrome anchors',
    description: 'Organism comparisons, diagnostic traps, high-yield benches, and exam-style separation points.',
    path: '/learn/syndrome-to-test-thinking'
  }
];

const beginnerLessonPath = [
  { step: '01', title: 'What the lab is trying to answer', path: '/learn/clinical-microbiology' },
  { step: '02', title: 'Specimens and contamination', path: '/learn/specimen-collection-transport' },
  { step: '03', title: 'Gram stain basics', path: '/learn/gram-stain' },
  { step: '04', title: 'Culture media basics', path: '/learn/culture-media' },
  { step: '05', title: 'Colony morphology', path: '/learn/colony-morphology' },
  { step: '06', title: 'Gram-positive cocci first split', path: '/learn/staphylococcus-micrococcus' },
  { step: '07', title: 'Gram-negative rods first split', path: '/learn/enterobacterales' },
  { step: '08', title: 'Anaerobes and special handling', path: '/learn/anaerobic-bacteria' },
  { step: '09', title: 'Fungi, parasites, and viruses overview', path: '/learn/syndrome-to-test-thinking' },
  { step: '10', title: 'Serology, antigen, and NAAT logic', path: '/learn/molecular-diagnostics-basics' },
  { step: '11', title: 'AST basics', path: '/learn/antimicrobial-susceptibility-testing' },
  { step: '12', title: 'Syndrome-to-test thinking', path: '/learn/syndrome-to-test-thinking' }
];

const beginnerSelfChecks = [
  {
    prompt: 'Before naming an organism, what should a new learner check first?',
    answer: 'Start with specimen source and quality. A great ID from a poor specimen can still mislead the clinical interpretation.'
  },
  {
    prompt: 'What does Gram stain give you before species-level ID?',
    answer: 'It gives a first branch: Gram reaction, shape, arrangement, inflammatory cells, organism burden, and whether the result fits the specimen.'
  },
  {
    prompt: 'Why is culture-negative not always infection-negative?',
    answer: 'Some organisms need special media, atmosphere, incubation time, molecular testing, serology, or safer reference-lab handling.'
  }
];

const getTopicBadges = (topic: (typeof learnTopics)[number]) => {
  const badges: string[] = [topic.category];

  if (topic.tables && topic.tables.length >= 4) {
    badges.push('Tables');
  }

  if (topic.keywords.some((keyword) => /ascp|exam|review|trap/i.test(keyword))) {
    badges.push('Exam');
  }

  if (topic.keywords.some((keyword) => /specimen|culture|bench|stain|media|ast|safety/i.test(keyword))) {
    badges.push('Bench');
  }

  if (topic.keywords.some((keyword) => /syndrome|clinical|infection/i.test(keyword))) {
    badges.push('Clinical');
  }

  return Array.from(new Set(badges)).slice(0, 3);
};

export const LearnHub: React.FC = () => {
  const topicsByCategory = useMemo(() => (
    categoryOrder.map((category) => ({
      category,
      topics: learnTopics.filter((topic) => topic.category === category)
    })).filter((group) => group.topics.length > 0)
  ), []);

  const libraryStats = useMemo(() => {
    const tableCount = learnTopics.reduce((total, topic) => total + (topic.tables?.length ?? 0), 0);

    return [
      { label: 'Study areas', value: topicsByCategory.length },
      { label: 'Topics', value: learnTopics.length },
      { label: 'Reference tables', value: tableCount }
    ];
  }, [topicsByCategory.length]);

  useEffect(() => {
    document.title = 'Learn Microbiology Basics | Learn Microbes';
  }, []);

  return (
    <div className="learn-shell">
      <header className="learn-hero">
        <span className="learn-kicker">Learning Library</span>
        <h1>Clinical microbiology, organized for learning.</h1>
        <p>
          Browse the study library by foundations, methods, organism groups, diagnostic reasoning, and exam-heavy comparison tables.
        </p>
        <div className="learn-library-stats" aria-label="Learn library summary">
          {libraryStats.map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
        </div>
      </header>

      <section className="learn-start-panel" aria-labelledby="learn-start-title">
        <div>
          <span className="learn-section-label">Begin Learning</span>
          <h2 id="learn-start-title">Begin learning with the foundations.</h2>
          <p>
            Start with taxonomy and bacterial structure before jumping into stains, media, and organism comparisons.
          </p>
        </div>
        <Link className="learn-primary-link" to="/learn/microbial-taxonomy">
          Start foundations
        </Link>
      </section>

      <section className="learn-path-panel" aria-labelledby="learn-path-title">
        <div className="learn-path-heading">
          <span className="learn-section-label">Study paths</span>
          <h2 id="learn-path-title">Pick the doorway that matches today.</h2>
        </div>
        <div className="learn-path-grid">
          {studyPaths.map((path) => (
            <Link className="learn-path-card" to={path.path} key={path.label}>
              <span>{path.label}</span>
              <strong>{path.title}</strong>
              <small>{path.description}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="learn-book-map" aria-labelledby="learn-book-map-title">
        <span className="learn-section-label">Study order</span>
        <h2 id="learn-book-map-title">Browse by study area</h2>
        <div className="learn-book-map-grid">
          {topicsByCategory.map((group) => {
            const meta = learningLaneMeta[group.category];

            return (
              <a key={group.category} href={`#${slugify(group.category)}`}>
                <span>Area {meta.number}</span>
                <strong>{group.category}</strong>
                <small>{group.topics.length} topic{group.topics.length === 1 ? '' : 's'}</small>
              </a>
            );
          })}
        </div>
      </section>

      <div className="learn-category-list">
        {topicsByCategory.map((group) => (
          <section
            className="learn-category"
            key={group.category}
            id={slugify(group.category)}
            aria-labelledby={`${group.category}-learn-title`}
          >
            <div className="learn-category-heading">
              <span className="learn-lane-number" aria-label={`Study area ${learningLaneMeta[group.category].number}`}>
                <small>Area</small>
                <strong>{learningLaneMeta[group.category].number}</strong>
              </span>
              <div>
                <span className="learn-section-label">{group.category}</span>
                <h2 id={`${group.category}-learn-title`}>{group.category}</h2>
                <p>{learningLaneMeta[group.category].description}</p>
              </div>
            </div>

            <div className="learn-lane-list">
              {group.topics.map((topic) => (
                <Link className="learn-topic-card" to={`/learn/${topic.slug}`} key={topic.slug}>
                  <span>{learningLaneMeta[group.category].number}-{String(group.topics.indexOf(topic) + 1).padStart(2, '0')}</span>
                  <div className="learn-topic-card-body">
                    <h3>{topic.title}</h3>
                    <p>{topic.summary}</p>
                    <div className="learn-topic-badges" aria-label={`${topic.title} study tags`}>
                      {getTopicBadges(topic).map((badge) => (
                        <small key={badge}>{badge}</small>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export const LearnArticle: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const topic = getLearnTopicBySlug(slug);

  useEffect(() => {
    document.title = topic ? `${topic.title} | Learn Microbes` : 'Learn Topic Not Found | Learn Microbes';
  }, [topic]);

  const articleSections = useMemo(() => {
    if (!topic) {
      return [];
    }

    const relatedVisuals = atlasPages.filter((page) => page.relatedLearnSlug === topic.slug);

    return [
      { id: 'core-idea', label: 'Core idea' },
      { id: 'principle', label: 'Principle' },
      ...(topic.tables?.map((table) => ({ id: `table-${slugify(table.title)}`, label: table.title })) ?? []),
      { id: 'basic-workflow', label: 'Basic workflow' },
      { id: 'how-to-read-it', label: 'How to read it' },
      { id: 'common-mistakes', label: 'Common mistakes' },
      { id: 'student-shortcut', label: 'Student shortcut' },
      ...(relatedVisuals.length > 0 ? [{ id: 'related-bench-cards', label: 'Bench cards' }] : []),
      { id: 'related-reading', label: 'Related reading' }
    ];
  }, [topic]);

  const isBeginnerStart = topic?.slug === 'clinical-microbiology';
  const relatedVisuals = useMemo(() => (
    topic ? atlasPages.filter((page) => page.relatedLearnSlug === topic.slug) : []
  ), [topic]);

  if (!topic) {
    return (
      <div className="learn-shell">
        <section className="learn-not-found">
          <span className="learn-kicker">Learn</span>
          <h1>Topic not found</h1>
          <p>This basics page is not available yet.</p>
          <button type="button" onClick={() => navigate('/learn')}>Back to Learn</button>
        </section>
      </div>
    );
  }

  return (
    <article className="learn-shell learn-article">
      <nav className="learn-breadcrumb" aria-label="Breadcrumb">
        <Link to="/learn">Learn</Link>
        <span>/</span>
        <span>{topic.title}</span>
      </nav>

      <header className="learn-article-hero">
        <span className="learn-kicker">Microbiology Notes / {topic.category}</span>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
      </header>

      {isBeginnerStart && (
        <section className="learn-beginner-guide" aria-labelledby="learn-beginner-guide-title">
          <div className="learn-beginner-intro">
            <span className="learn-section-label">Begin Learning</span>
            <h2 id="learn-beginner-guide-title">Your first-pass microbiology path</h2>
            <p>
              Use this page as the starting bench sequence. Read the first lesson, follow the flow, then move through the twelve core steps without trying to memorize every organism at once.
            </p>
          </div>

          <div className="learn-bench-flow" aria-label="Specimen to answer bench flow">
            <svg viewBox="0 0 760 170" role="img" aria-labelledby="bench-flow-title bench-flow-desc">
              <title id="bench-flow-title">Beginner bench flow</title>
              <desc id="bench-flow-desc">A simple flow from specimen to safety, direct clue, culture condition, branch test, and interpretation.</desc>
              <defs>
                <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              {['Specimen', 'Safety', 'Direct clue', 'Culture', 'First split', 'Meaning'].map((label, index) => {
                const x = 18 + index * 123;
                return (
                  <g key={label}>
                    <rect x={x} y="42" width="104" height="64" rx="6" />
                    <text x={x + 52} y="68">{label}</text>
                    <text x={x + 52} y="88">{index + 1}</text>
                    {index < 5 && <line x1={x + 106} y1="74" x2={x + 119} y2="74" markerEnd="url(#flow-arrow)" />}
                  </g>
                );
              })}
              <text className="flow-caption" x="380" y="140">Do not jump to the name until the specimen, method, and clinical fit make sense.</text>
            </svg>
          </div>

          <div className="learn-beginner-grid">
            <div className="learn-beginner-panel">
              <h3>Core lesson sequence</h3>
              <div className="learn-beginner-steps">
                {beginnerLessonPath.map((lesson) => (
                  <Link key={lesson.step} to={lesson.path}>
                    <span>{lesson.step}</span>
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="learn-beginner-panel">
              <h3>Self-checks</h3>
              <div className="learn-self-checks">
                {beginnerSelfChecks.map((check) => (
                  <details key={check.prompt}>
                    <summary>{check.prompt}</summary>
                    <p>{check.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="learn-article-layout">
        <aside className="learn-topic-nav" aria-labelledby="learn-topic-nav-title">
          <span className="learn-section-label" id="learn-topic-nav-title">On this page</span>
          <div>
            {articleSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.label}</a>
            ))}
          </div>
        </aside>

        <div className="learn-reference-sheet">
        <section className="learn-note-section" id="core-idea">
          <h2>Core idea</h2>
          <p>{topic.whyItMatters}</p>
        </section>

        <section className="learn-note-section" id="principle">
          <h2>Principle</h2>
          <p>{topic.principle}</p>
        </section>

        {topic.tables?.map((table) => (
          <section className="learn-note-section learn-table-section" id={`table-${slugify(table.title)}`} key={table.title}>
            <h2>{table.title}</h2>
            <div className="learn-table-scroll">
              <table className="learn-reference-table">
                <thead>
                  <tr>
                    {table.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={`${table.title}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${table.title}-${rowIndex}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {table.note && <p className="learn-table-note">{table.note}</p>}
          </section>
        ))}

        <section className="learn-note-section" id="basic-workflow">
          <h2>Basic workflow</h2>
          <ol>
            {topic.basicSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="learn-note-section" id="how-to-read-it">
          <h2>How to read it</h2>
          <ul>
            {topic.interpretation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="learn-note-section" id="common-mistakes">
          <h2>Common mistakes</h2>
          <ul>
            {topic.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="learn-note-section learn-shortcut" id="student-shortcut">
          <h2>Student shortcut</h2>
          <p>{topic.studentShortcut}</p>
        </section>

        {relatedVisuals.length > 0 && (
          <section className="learn-note-section learn-bench-card-links" id="related-bench-cards">
            <h2>Related bench cards</h2>
            <div className="learn-related-stack">
              {relatedVisuals.map((page) => (
                <Link key={page.slug} to={`/visuals/${page.slug}`}>{page.title}</Link>
              ))}
            </div>
          </section>
        )}

        <section className="learn-note-section learn-related-reading" id="related-reading">
          <h2>Related reading</h2>
          <div className="learn-related-stack">
            {topic.relatedLinks.map((link) => (
              <Link key={link.path} to={link.path}>{link.label}</Link>
            ))}
          </div>
        </section>
        </div>
      </div>
    </article>
  );
};
