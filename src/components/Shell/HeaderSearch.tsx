import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import type { DashboardSearchItem } from '../../data/dashboardSearchContent';
import { trackEvent } from '../../utils/analytics';
import { searchSiteItems } from './siteSearch';

type HeaderSearchProps = {
  searchIndex: DashboardSearchItem[];
  /** Called when the panel opens, so the full content index can load then. */
  onSearchIntent: () => void;
};

/**
 * The header magnifier opens a floating search panel over the current page
 * instead of navigating away to /search. Picking a result goes straight to it;
 * "See all results" hands the query to the full search page.
 */
export default function HeaderSearch({ searchIndex, onSearchIntent }: HeaderSearchProps) {
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

  const results = useMemo(() => searchSiteItems(searchIndex, query), [searchIndex, query]);
  const trimmedQuery = query.trim();

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

    onSearchIntent();
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
  }, [isOpen, onSearchIntent]);

  const selectResult = (item: DashboardSearchItem) => {
    trackEvent('search_used', {
      location: 'header_search',
      search_term: trimmedQuery,
      result_title: item.title,
      result_path: item.path
    });
    setQuery('');
    setIsOpen(false);
    navigate(item.path);
  };

  const openFullSearch = () => {
    setIsOpen(false);
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();

      if (results[activeIndex]) {
        selectResult(results[activeIndex]);
      } else {
        openFullSearch();
      }
    }
  };

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
              placeholder="Search tests, guides, roadmaps..."
              aria-label="Search Learn Microbes"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-activedescendant={results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            />
          </div>

          <span className="lm-search-caption">{trimmedQuery ? 'Best matches' : 'Popular starting points'}</span>

          {results.length > 0 ? (
            <div className="lm-search-results" id={listId} role="listbox">
              {results.map((result, index) => (
                <button
                  type="button"
                  key={result.id}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'active' : ''}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectResult(result)}
                >
                  <span>{result.category}</span>
                  <strong>{result.title}</strong>
                  <small>{result.snippet}</small>
                </button>
              ))}
            </div>
          ) : (
            <p className="lm-search-empty">No close matches yet.</p>
          )}

          <button type="button" className="lm-search-all" onClick={openFullSearch}>
            {trimmedQuery ? `See all results for "${trimmedQuery}"` : 'Open full search'}
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
