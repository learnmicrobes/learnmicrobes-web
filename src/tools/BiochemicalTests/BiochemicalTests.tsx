import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronRight,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { atlasPages, MiniAtlasVisual } from '../../components/VisualAtlas/VisualAtlas';
import AlphaValidationCTA from '../../components/AlphaValidationCTA/AlphaValidationCTA';
import { biochemicalTestsData, BiochemicalTest } from './biochemicalData';
import './BiochemicalTests.css';

const legendItems = [
  { key: 'acid', label: 'A (acid)' },
  { key: 'alkaline', label: 'K (alkaline)' },
  { key: 'aa', label: 'A/A' },
  { key: 'ka', label: 'K/A' },
  { key: 'kk', label: 'K/K' },
  { key: 'h2s', label: 'H2S' },
  { key: 'growth', label: 'Growth' },
  { key: 'nogrowth', label: 'No growth' }
];

const firstResultLine = (test: BiochemicalTest) =>
  test.expectedResults.split('\n')[0].replace('Positive: ', '');

const BiochemicalTests: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisualCompanionOpen, setIsVisualCompanionOpen] = useState(false);

  // The URL is the source of truth for the open test, so the browser back button
  // returns to the list instead of leaving the previous card on screen.
  const requestedTestId = searchParams.get('test');
  const selectedTest = useMemo(
    () => biochemicalTestsData.find((test) => test.id === requestedTestId) ?? null,
    [requestedTestId]
  );

  const selectTest = (test: BiochemicalTest | null) => {
    setSearchParams(test ? { test: test.id } : {});
  };

  useEffect(() => {
    setIsVisualCompanionOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [requestedTestId]);

  const sortedTests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return [...biochemicalTestsData]
      .filter((test) =>
        test.name.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  const trimmedSearch = searchTerm.trim();

  if (!selectedTest) {
    return (
      <main className="biochem-page">
        <section className="biochem-hero" aria-labelledby="biochem-title">
          <span className="biochem-kicker">Bench reference</span>
          <h1 id="biochem-title">Biochemical tests, A to Z</h1>
          <p>
            Principle, method, expected results, and QC for each test, written for quick lookups
            during organism workups.
          </p>
        </section>

        <section className="biochem-controls" aria-label="Find a test">
          <div className="biochem-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tests or categories, e.g. catalase"
              aria-label="Search tests or categories"
            />
            {searchTerm && (
              <button
                type="button"
                className="biochem-search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="biochem-legend">
            <span className="biochem-label">Result codes</span>
            <div className="biochem-legend-chips">
              {legendItems.map((item) => (
                <span key={item.key} className={`biochem-legend-chip ${item.key}`}>{item.label}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="biochem-list" aria-labelledby="biochem-results-count">
          <p className="biochem-results-count" id="biochem-results-count" aria-live="polite">
            {trimmedSearch
              ? `${sortedTests.length} of ${biochemicalTestsData.length} tests match "${trimmedSearch}"`
              : `${biochemicalTestsData.length} tests`}
          </p>

          {sortedTests.length > 0 ? (
            <ul className="biochem-grid">
              {sortedTests.map((test) => (
                <li key={test.id}>
                  <button type="button" className="biochem-card" onClick={() => selectTest(test)}>
                    <span className="biochem-card-category">{test.category}</span>
                    <strong>{test.name}</strong>
                    <span className="biochem-card-result">{firstResultLine(test)}</span>
                    <FontAwesomeIcon icon={faChevronRight} className="biochem-card-chevron" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="biochem-empty">
              <h2>No tests match "{trimmedSearch}"</h2>
              <p>Try a test name like catalase, or a category like serology.</p>
              <button type="button" onClick={() => setSearchTerm('')}>Clear search</button>
            </div>
          )}
        </section>

        <AlphaValidationCTA
          location="clinical_bench_reference_biochemical_tests"
          title="Help validate the bench reference"
          body="Tell us which test cards you use most, what is missing, and whether saved bookmarks would help you return to key reactions."
        />
      </main>
    );
  }

  const matchingVisual = atlasPages.find((page) => page.biochemicalTestId === selectedTest.id);
  const currentIndex = sortedTests.findIndex((test) => test.id === selectedTest.id);
  const prevTest = currentIndex > 0 ? sortedTests[currentIndex - 1] : null;
  const nextTest = currentIndex >= 0 && currentIndex < sortedTests.length - 1 ? sortedTests[currentIndex + 1] : null;

  return (
    <main className="biochem-page">
      <section className="biochem-detail-hero" aria-labelledby="biochem-test-title">
        <button type="button" className="biochem-back" onClick={() => selectTest(null)}>
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
          All tests
        </button>
        <span className="biochem-kicker">{selectedTest.category}</span>
        <h1 id="biochem-test-title">{selectedTest.name}</h1>

        {matchingVisual && (
          <div className="test-visual-companion">
            <div>
              <span>Visual companion</span>
              <p>{matchingVisual.title}</p>
            </div>
            <button
              type="button"
              className="test-visual-link"
              onClick={() => setIsVisualCompanionOpen((open) => !open)}
              aria-expanded={isVisualCompanionOpen}
              aria-controls="test-inline-visual"
            >
              {isVisualCompanionOpen ? 'Hide visual bench card' : 'Open visual bench card'}
            </button>
          </div>
        )}
      </section>

      {matchingVisual && isVisualCompanionOpen && (
        <section
          className="test-inline-visual"
          id="test-inline-visual"
          aria-label={`${matchingVisual.title} visual companion`}
        >
          <MiniAtlasVisual page={matchingVisual} showFullLink={false} />
        </section>
      )}

      <section className="biochem-detail-body" aria-label={`${selectedTest.name} details`}>
        <div className="content-section">
          <h2>Principle</h2>
          <p>{selectedTest.principle}</p>
        </div>

        <div className="content-section">
          <h2>Reagents and media</h2>
          <p>{selectedTest.reagents}</p>
        </div>

        <div className="content-section">
          <h2>Procedure</h2>
          <p className="pre-line">{selectedTest.procedure}</p>
        </div>

        <div className="content-section">
          <h2>Quality control</h2>
          <div className="qc-grid">
            <div className="qc-box positive">
              <span>Positive control</span>
              <em>{selectedTest.qcPositive}</em>
            </div>
            <div className="qc-box negative">
              <span>Negative control</span>
              <em>{selectedTest.qcNegative}</em>
            </div>
          </div>
        </div>

        <div className="content-section expected-results">
          <h2>Expected results</h2>
          <p className="pre-line">{selectedTest.expectedResults}</p>
        </div>

        <nav className="biochem-pager" aria-label="Browse tests">
          <button
            type="button"
            className="biochem-pager-btn prev"
            disabled={!prevTest}
            onClick={() => prevTest && selectTest(prevTest)}
          >
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            <span>
              <small>Previous</small>
              <strong>{prevTest ? prevTest.name : 'Start of list'}</strong>
            </span>
          </button>
          <button
            type="button"
            className="biochem-pager-btn next"
            disabled={!nextTest}
            onClick={() => nextTest && selectTest(nextTest)}
          >
            <span>
              <small>Next</small>
              <strong>{nextTest ? nextTest.name : 'End of list'}</strong>
            </span>
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </button>
        </nav>
      </section>

      <AlphaValidationCTA
        location={`clinical_bench_reference_${selectedTest.id}`}
        title="Help improve this reference card"
        body="Tell us whether this procedure/QC page answered your question and whether saved bookmarks would help your bench review."
      />
    </main>
  );
};

export default BiochemicalTests;
