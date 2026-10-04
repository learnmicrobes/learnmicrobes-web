import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { bestSnippet, runSearch, type SearchIndex } from '../../search/searchEngine';
import { useSearchIndex } from '../../search/useSiteSearch';
import Highlight from '../../search/Highlight';
import {
  searchKindFilterLabels,
  searchKindLabels,
  searchKinds,
  type SearchDoc,
  type SearchKind
} from '../../search/searchTypes';
import { subjectStainClass } from '../../data/subjectStains';
import AlphaValidationCTA from '../AlphaValidationCTA/AlphaValidationCTA';
import { trackEvent } from '../../utils/analytics';
import './GlobalSearch.css';

const PAGE_SIZE = 20;

const suggestedSearches = ['Gram stain', 'MacConkey', 'Oxidase', 'Pink ring', 'Germ tube', 'Giardia', 'AFB', 'Durham tube'];

type KindFilter = SearchKind | 'all';

const isKindFilter = (value: string | null): value is SearchKind => (
  value !== null && (searchKinds as string[]).includes(value)
);

/* ------------------------------------------------------------------------- */
/* A–Z index: what the page shows before anything is typed                    */
/* ------------------------------------------------------------------------- */

// When one name has several destinations, the title links to the fullest one.
const kindOrder: SearchKind[] = ['learn', 'visual', 'test', 'term', 'guide', 'tool'];

type IndexEntry = {
  title: string;
  docs: SearchDoc[];
};

const buildAlphabeticalIndex = (index: SearchIndex, kind: KindFilter) => {
  const byName = new Map<string, IndexEntry>();

  index.docs
    // Roadmap endpoints are organism names the roadmaps reach; they read as
    // duplicates of the roadmap itself in a browsable list.
    .filter((doc) => (kind === 'all' || doc.kind === kind) && (doc.boost ?? 1) === 1)
    .forEach((doc) => {
      const key = doc.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      const entry = byName.get(key) ?? { title: doc.title, docs: [] };
      entry.docs.push(doc);
      byName.set(key, entry);
    });

  const groups = new Map<string, IndexEntry[]>();
  Array.from(byName.values())
    .sort((first, second) => first.title.localeCompare(second.title, undefined, { sensitivity: 'base' }))
    .forEach((entry) => {
      entry.docs.sort((first, second) => kindOrder.indexOf(first.kind) - kindOrder.indexOf(second.kind));
      const letter = /^[a-z]/i.test(entry.title) ? entry.title[0].toUpperCase() : '0–9';
      groups.set(letter, [...(groups.get(letter) ?? []), entry]);
    });

  return Array.from(groups.entries());
};

const letterId = (letter: string) => (/^[A-Z]$/.test(letter) ? letter : 'digits');

/* ------------------------------------------------------------------------- */
/* Page                                                                       */
/* ------------------------------------------------------------------------- */

const GlobalSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const urlKind = searchParams.get('type');
  const [query, setQuery] = useState(urlQuery);
  const [kind, setKind] = useState<KindFilter>(isKindFilter(urlKind) ? urlKind : 'all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLOListElement>(null);
  const index = useSearchIndex();
  const trimmedQuery = query.trim();

  // The header panel's "See all results" can land here while the page is
  // already open, so a new ?q= in the URL replaces what is in the box.
  const lastWrittenQuery = useRef(urlQuery);
  useEffect(() => {
    if (urlQuery !== lastWrittenQuery.current) {
      lastWrittenQuery.current = urlQuery;
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  // Keep the URL in step with the box so a search can be shared, refreshed, or
  // returned to with the back button. replace: one history entry, not one per key.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next: Record<string, string> = {};
      if (trimmedQuery) next.q = trimmedQuery;
      if (kind !== 'all') next.type = kind;
      lastWrittenQuery.current = next.q ?? '';
      setSearchParams(next, { replace: true });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [trimmedQuery, kind, setSearchParams]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // "/" jumps to the search box from anywhere on the page, as on most search sites.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [trimmedQuery, kind]);

  const response = useMemo(
    () => (index && trimmedQuery ? runSearch(index, query, { kind, limit: 200 }) : null),
    [index, query, trimmedQuery, kind]
  );

  // Count a search once the person stops typing, not on every keystroke.
  useEffect(() => {
    if (!response || !trimmedQuery) return undefined;

    const timer = window.setTimeout(() => {
      trackEvent('search_used', {
        location: 'search_page',
        search_term: trimmedQuery.toLowerCase(),
        results_count: response.hits.length + (response.answer ? 1 : 0),
        corrected_to: response.correctedQuery ?? ''
      });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [response, trimmedQuery]);

  const alphabeticalIndex = useMemo(
    () => (index && !trimmedQuery ? buildAlphabeticalIndex(index, kind) : []),
    [index, trimmedQuery, kind]
  );

  const trackResultClick = (doc: SearchDoc, position: number) => {
    trackEvent('search_used', {
      location: 'search_page',
      search_term: trimmedQuery.toLowerCase(),
      result_title: doc.title,
      result_path: doc.path,
      result_position: position + 1
    });
  };

  const searchFor = (value: string) => {
    setQuery(value);
    setKind('all');
    inputRef.current?.focus();
    window.scrollTo({ top: 0 });
  };

  // Arrow keys walk from the box into the results and back.
  const focusResult = (position: number) => {
    const links = resultsRef.current?.querySelectorAll<HTMLAnchorElement>('.search-hit-link');
    if (!links || links.length === 0) return;
    if (position < 0) {
      inputRef.current?.focus();
      return;
    }
    links[Math.min(position, links.length - 1)].focus();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusResult(0);
    } else if (event.key === 'Escape' && query) {
      event.preventDefault();
      setQuery('');
    }
  };

  const handleResultKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, position: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusResult(position + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusResult(position - 1);
    }
  };

  const hits = response?.hits ?? [];
  const totalResults = response
    ? (kind === 'all'
      ? searchKinds.reduce((sum, value) => sum + response.counts[value], 0)
      : response.counts[kind])
    : 0;
  const answer = response?.answer;
  const highlightWords = response?.highlightWords ?? [];
  const hasResults = hits.length > 0 || Boolean(answer);

  return (
    <main className="search-page">
      <section className="search-hero" aria-labelledby="search-title">
        <span className="lm-kicker">Search</span>
        <h1 id="search-title">Search the bench reference</h1>

        <form
          className="search-box"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const first = answer ?? hits[0]?.doc;
            if (first) {
              trackResultClick(first, 0);
              navigate(first.path);
            }
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-box-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Organism, test, medium, or term"
            aria-label="Search Learn Microbes"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
          />
          {query && (
            <button
              type="button"
              className="search-box-clear"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
          )}
        </form>

        <div className="search-filters" role="group" aria-label="Filter results by type">
          {(['all', ...searchKinds] as KindFilter[]).map((value) => {
            const count = response ? (value === 'all' ? null : response.counts[value]) : null;
            const disabled = Boolean(response) && value !== 'all' && count === 0 && kind !== value;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={kind === value}
                disabled={disabled}
                onClick={() => setKind(value)}
              >
                {value === 'all' ? 'All' : searchKindFilterLabels[value]}
                {count !== null && count > 0 && <span className="search-filter-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </section>

      {!index ? (
        <p className="search-loading" role="status">Loading the index…</p>
      ) : trimmedQuery ? (
        <div className={`search-layout ${answer ? 'has-answer' : ''}`.trim()}>
          {answer?.answer && (
            <aside className="search-answer" aria-label={`Definition of ${answer.title}`}>
              <span className="lm-kicker">Bench term · {answer.answer.category}</span>
              <h2>{answer.title}</h2>
              <p className="search-answer-definition">{answer.answer.definition}</p>

              <div className="search-answer-block">
                <h3>At the bench</h3>
                <p>{answer.answer.benchContext}</p>
              </div>

              <details className="search-answer-more">
                <summary>Key points and student shortcut</summary>
                {answer.answer.details.length > 0 && (
                  <ul>
                    {answer.answer.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
                <div className="search-answer-tip">
                  <h3>Student shortcut</h3>
                  <p>{answer.answer.studentTip}</p>
                </div>
              </details>

              {answer.answer.relatedLinks.length > 0 && (
                <nav className="search-answer-links" aria-label={`Go deeper on ${answer.title}`}>
                  {answer.answer.relatedLinks.map((link) => (
                    <Link key={link.path} to={link.path} onClick={() => trackResultClick(answer, 0)}>
                      {link.label}
                      <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              )}
            </aside>
          )}

          <div className="search-results">
            {response?.correctedQuery && hasResults && (
              <p className="search-correction">
                Showing results for <strong>{response.correctedQuery}</strong>. Nothing on the site is spelled
                “{trimmedQuery}”.
              </p>
            )}

            <p className="search-status" role="status">
              {hasResults ? (
                <>
                  {totalResults} result{totalResults === 1 ? '' : 's'}
                  {kind !== 'all' && <> in {searchKindFilterLabels[kind]}</>}
                </>
              ) : (
                <>No results for <strong>{trimmedQuery}</strong></>
              )}
            </p>


            {response && response.droppedWords.length > 0 && hasResults && (
              <p className="search-correction">
                No page matches every word. Missing:{' '}
                {response.droppedWords.map((word, position) => (
                  <React.Fragment key={word}>
                    {position > 0 && ', '}
                    <s>{word}</s>
                  </React.Fragment>
                ))}
              </p>
            )}

            {hits.length > 0 && (
              <ol className="search-hit-list" ref={resultsRef}>
                {hits.slice(0, visibleCount).map(({ doc }, position) => (
                  <li key={doc.id} className="search-hit">
                    <Link
                      to={doc.path}
                      className="search-hit-link"
                      onClick={() => trackResultClick(doc, position)}
                      onKeyDown={(event) => handleResultKeyDown(event, position)}
                    >
                      <span className="search-hit-trail">
                        {subjectStainClass(doc.subject) && (
                          <span className={`search-hit-dot ${subjectStainClass(doc.subject)}`} aria-hidden="true" />
                        )}
                        {doc.trail}
                      </span>
                      <span className="search-hit-title">
                        <Highlight text={doc.title} words={highlightWords} />
                      </span>
                      <span className="search-hit-snippet">
                        <Highlight text={bestSnippet(doc, highlightWords)} words={highlightWords} />
                      </span>
                    </Link>
                    <span className="search-hit-kind">{searchKindLabels[doc.kind]}</span>
                  </li>
                ))}
              </ol>
            )}

            {hits.length > visibleCount && (
              <button
                type="button"
                className="lm-btn lm-btn--secondary search-more"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Show more results
              </button>
            )}

            {!hasResults && (
              <div className="search-empty">
                <h2>Try another way in</h2>
                <ul>
                  <li>Search one key word: an organism, a test, or a medium.</li>
                  <li>Use the full name instead of a nickname, or the nickname instead of the full name.</li>
                  {kind !== 'all' && (
                    <li>
                      <button type="button" className="search-inline-button" onClick={() => setKind('all')}>
                        Search everything
                      </button>{' '}
                      instead of only {searchKindFilterLabels[kind]}.
                    </li>
                  )}
                </ul>
                <div className="search-suggestions" aria-label="Suggested searches">
                  {suggestedSearches.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => searchFor(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
                <AlphaValidationCTA
                  location="search_page"
                  title="Couldn’t find it?"
                  body="Tell us what you searched for. Missing topics go on the list for new Learn pages and bench cards."
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <section className="search-browse" aria-labelledby="search-browse-title">
          <div className="search-suggestions" aria-label="Suggested searches">
            <span className="search-suggestions-label">Try</span>
            {suggestedSearches.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => searchFor(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <div className="search-browse-heading">
            <h2 id="search-browse-title">
              {kind === 'all' ? 'Index' : `${searchKindFilterLabels[kind]} index`}
            </h2>
            <p>Every page, bench card, test and term on the site, A to Z.</p>
          </div>

          <nav className="search-alpha-bar" aria-label="Jump to letter">
            {alphabeticalIndex.map(([letter]) => (
              <a key={letter} href={`#search-letter-${letterId(letter)}`}>{letter}</a>
            ))}
          </nav>

          <div className="search-alpha-groups">
            {alphabeticalIndex.map(([letter, entries]) => (
              <section key={letter} id={`search-letter-${letterId(letter)}`} className="search-alpha-group" aria-label={letter}>
                <h3>{letter}</h3>
                <ul>
                  {entries.map((entry) => (
                    <li key={entry.docs[0].id}>
                      <Link to={entry.docs[0].path} className="search-alpha-title">{entry.title}</Link>
                      <span className="search-alpha-locators">
                        {entry.docs.map((doc, position) => (
                          position === 0
                            ? <span key={doc.id}>{searchKindLabels[doc.kind]}</span>
                            : <Link key={doc.id} to={doc.path}>{searchKindLabels[doc.kind]}</Link>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default GlobalSearch;
