import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChevronDown,
  faGraduationCap,
  faHouse,
  faImages,
  faMagnifyingGlass,
  faMoon,
  faRightFromBracket,
  faSun,
  faToolbox,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { getCategoryDisplayName, slugify } from '../../data/learnCategories';
import { subjectStainClass } from '../../data/subjectStains';
import {
  isAtlasPath,
  isLearnPath,
  isReviewPath,
  learnGroups,
  type ToolGroup
} from './navigation';
import './Shell.css';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  toolGroups: ToolGroup[];
  user: { email?: string | null } | null;
  displayName: string;
  onSignOut: () => void;
};

/**
 * Phone menu. It keeps the shape the live site's menu has — Home, Learn,
 * Visuals, Tools, Review, Search, with Learn and Tools opening in place —
 * so someone who has been using the site does not have to relearn it. Labels
 * follow the desktop header, so a section is called the same thing on both. The
 * theme toggle and the account sit below the divider, because in the 1.0
 * header they are no longer icons of their own.
 */
export default function MobileMenu({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
  toolGroups,
  user,
  displayName,
  onSignOut
}: MobileMenuProps) {
  const { pathname } = useLocation();
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLearnOpen(false);
      setIsToolsOpen(false);
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const isToolsActive = toolGroups.some((group) => group.items.some((item) => item.path === pathname));

  return (
    <>
      <div className="lm-sheet-scrim" onClick={onClose} aria-hidden="true" />
      <div className="lm-sheet" role="dialog" aria-label="Menu">
        <Link to="/" className={`lm-sheet-row ${pathname === '/' ? 'active' : ''}`} onClick={onClose}>
          <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
          Home
        </Link>

        {/* Learn and Tools open in place, as they do on the live site. */}
        <div className="lm-sheet-split">
          <Link to="/learn" className={`lm-sheet-row ${isLearnPath(pathname) ? 'active' : ''}`} onClick={onClose}>
            <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
            Learn
          </Link>
          <button
            type="button"
            className={`lm-sheet-row lm-sheet-row--chevron ${isLearnPath(pathname) ? 'active' : ''}`}
            onClick={() => {
              setIsToolsOpen(false);
              setIsLearnOpen((open) => !open);
            }}
            aria-expanded={isLearnOpen}
            aria-label="Show Learn categories"
          >
            <FontAwesomeIcon icon={faChevronDown} className={`lm-chevron ${isLearnOpen ? 'open' : ''}`} aria-hidden="true" />
          </button>
        </div>

        {isLearnOpen && (
          <div className="lm-sheet-sub">
            {learnGroups.map((group) => (
              <div className="lm-sheet-sub-group" key={group.label}>
                <span className="lm-sheet-sub-label">{group.label}</span>
                {group.categories.map((category) => {
                  const stain = subjectStainClass(category);

                  return (
                    <Link
                      key={category}
                      to={`/learn#${slugify(category)}`}
                      className={`lm-sheet-sub-link ${stain}`.trim()}
                      onClick={onClose}
                    >
                      {stain && <i className="subject-stain-drop" aria-hidden="true" />}
                      {getCategoryDisplayName(category)}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        <Link to="/visuals" className={`lm-sheet-row ${isAtlasPath(pathname) ? 'active' : ''}`} onClick={onClose}>
          <FontAwesomeIcon icon={faImages} aria-hidden="true" />
          Visuals
        </Link>

        <button
          type="button"
          className={`lm-sheet-row ${isToolsActive ? 'active' : ''}`}
          onClick={() => {
            setIsLearnOpen(false);
            setIsToolsOpen((open) => !open);
          }}
          aria-expanded={isToolsOpen}
        >
          <FontAwesomeIcon icon={faToolbox} aria-hidden="true" />
          Tools
          <FontAwesomeIcon icon={faChevronDown} className={`lm-chevron ${isToolsOpen ? 'open' : ''}`} aria-hidden="true" />
        </button>

        {isToolsOpen && (
          <div className="lm-sheet-sub">
            {toolGroups.map((group) => (
              <div className="lm-sheet-sub-group" key={group.label}>
                <span className="lm-sheet-sub-label">{group.label}</span>
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`lm-sheet-sub-link ${pathname === item.path ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        <Link to="/practice" className={`lm-sheet-row ${isReviewPath(pathname) ? 'active' : ''}`} onClick={onClose}>
          <FontAwesomeIcon icon={faBook} aria-hidden="true" />
          Review
        </Link>

        <Link to="/search" className={`lm-sheet-row ${pathname === '/search' ? 'active' : ''}`} onClick={onClose}>
          <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
          Search
        </Link>

        <div className="lm-sheet-divider" aria-hidden="true" />

        <button type="button" className="lm-sheet-row" onClick={onToggleTheme}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} aria-hidden="true" />
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </button>

        {user ? (
          <>
            <Link to="/account" className="lm-sheet-row" onClick={onClose}>
              <FontAwesomeIcon icon={faUser} aria-hidden="true" />
              Your bench
            </Link>
            <button
              type="button"
              className="lm-sheet-row"
              onClick={() => {
                onClose();
                onSignOut();
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
              Sign out
            </button>
            <span className="lm-sheet-signed">Signed in as {user.email ?? displayName}</span>
          </>
        ) : (
          <Link to="/login" className="lm-sheet-row" onClick={onClose}>
            <FontAwesomeIcon icon={faUser} aria-hidden="true" />
            Sign in
          </Link>
        )}
      </div>
    </>
  );
}
