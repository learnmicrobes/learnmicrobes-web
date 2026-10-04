import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from '../../utils/analytics';
import { bestSnippet } from '../../search/searchEngine';
import { quickSearch, useSearchIndex } from '../../search/useSiteSearch';
import Highlight from '../../search/Highlight';
import { searchKindLabels, type SearchDoc } from '../../search/searchTypes';

/**
 * The header magnifier opens a floating search panel over the current page
 * instead of navigating away to /search. Picking a result goes straight to it;
 * "See all results" hands the query to the full search page. It ranks with the
 * same engine and index as the search page, so the two always agree.
 */
export default function HeaderSearch() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const listId = `${baseId}-results`;
  // The index loads the first time the panel opens, not with every page.
  const index = useSearchIndex(isOpen);
  const trimmedQuery = query.trim();

  const search = useMemo(() => (index ? quickSearch(index, query) : null), [index, query]);

  const results = search?.docs ?? [];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    inputRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (event.target instanceof Node && !wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectResult = (doc: SearchDoc) => {
    trackEvent('search_used', {
      location: 'header_search',
      search_term: trimmedQuery,
      result_title: doc.title,
      result_path: doc.path
    });
    setQuery('');
    setIsOpen(false);
    navigate(doc.path);
  };

  const openFullSearch = () => {
    setIsOpen(false);
    setQuery('');
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((position) => Math.min(position + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((position) => Math.max(position - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();

      if (results[activeIndex]) {
        selectResult(results[activeIndex]);
      } else {
        openFullSearch();
      }
    }
  };

  const caption = !search
    ? 'Loading…'
    : results.length === 0
      ? 'Nothing matched'
      : search.correctedQuery
        ? <>Showing results for <strong>{search.correctedQuery}</strong></>
        : (trimmedQuery ? 'Best matches' : 'Popular starting points');

  return (
    <div className="lm-header-search" ref={wrapperRef}>
      <button
        type="button"
        className={`lm-icon-btn ${isOpen ? 'active' : ''}`.trim()}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Search the bench reference"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="lm-search-panel" id={panelId} role="dialog" aria-label="Search Learn Microbes">
          <div className="lm-search-field">
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Organism, test, medium, or term"
              aria-label="Search Learn Microbes"
              role="combobox"
              autoComplete="off"
              spellCheck={false}
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            />
          </div>

          <span className="lm-search-caption">{caption}</span>

          {results.length > 0 ? (
            <div className="lm-search-results" id={listId} role="listbox">
              {results.map((doc, position) => (
                <button
                  type="button"
                  key={doc.id}
                  id={`${listId}-${position}`}
                  role="option"
                  aria-selected={position === activeIndex}
                  className={position === activeIndex ? 'active' : ''}
                  onMouseEnter={() => setActiveIndex(position)}
                  onClick={() => selectResult(doc)}
                >
                  <span>{searchKindLabels[doc.kind]}</span>
                  <strong><Highlight text={doc.title} words={search?.highlightWords ?? []} /></strong>
                  <small><Highlight text={bestSnippet(doc, search?.highlightWords ?? [], 120)} words={search?.highlightWords ?? []} /></small>
                </button>
              ))}
            </div>
          ) : search && trimmedQuery ? (
            <p className="lm-search-empty">No close matches. The full search page has suggestions.</p>
          ) : null}

          <button type="button" className="lm-search-all" onClick={openFullSearch}>
            {trimmedQuery ? `See all results for "${trimmedQuery}"` : 'Browse the A–Z index'}
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
