import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faMoon,
  faRightFromBracket,
  faSun,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import brandMark from '../../assets/brand-mark-knockout.svg';
import type { DashboardSearchItem } from '../../data/dashboardSearchContent';
import { getCategoryDisplayName, slugify } from '../../data/learnCategories';
import { subjectStainClass } from '../../data/subjectStains';
import HeaderSearch from './HeaderSearch';
import MobileMenu from './MobileMenu';
import {
  getDisplayName,
  getInitials,
  isAtlasPath,
  isLearnPath,
  isReviewPath,
  learnGroups,
  type ToolGroup
} from './navigation';
import './Shell.css';

type SiteHeaderProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  toolGroups: ToolGroup[];
  searchIndex: DashboardSearchItem[];
  onSearchIntent: () => void;
};

export default function SiteHeader({ isDarkMode, onToggleTheme, toolGroups, searchIndex, onSearchIntent }: SiteHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const learnRef = useRef<HTMLDivElement | null>(null);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const { pathname, hash } = location;

  useEffect(() => {
    setIsToolsOpen(false);
    setIsLearnOpen(false);
    setIsAccountOpen(false);
    setIsMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!isToolsOpen && !isLearnOpen && !isAccountOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!toolsRef.current?.contains(target)) {
        setIsToolsOpen(false);
      }

      if (!learnRef.current?.contains(target)) {
        setIsLearnOpen(false);
      }

      if (!accountRef.current?.contains(target)) {
        setIsAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsOpen(false);
        setIsLearnOpen(false);
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isToolsOpen, isLearnOpen, isAccountOpen]);

  const isToolsActive = toolGroups.some((group) => group.items.some((item) => item.path === pathname));
  const isLearnCategoryActive = (category: string) => pathname === '/learn' && hash === `#${slugify(category)}`;

  const displayName = getDisplayName(user);

  const handleSignOut = async () => {
    setIsAccountOpen(false);
    await signOut();
    navigate('/');
  };

  const closeMenus = () => {
    setIsToolsOpen(false);
    setIsLearnOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <header className="lm-header">
      <div className="lm-header-inner">
        <Link to="/" className="lm-brand" aria-label="Learn Microbes home">
          <img className="lm-brand-mark" src={brandMark} alt="" />
          <span className="lm-brand-text">
            <span className="lm-brand-name">Learn Microbes</span>
            <span className="lm-brand-tagline">Clinical microbiology &amp; ASCP review</span>
          </span>
        </Link>

        <nav className="lm-nav" aria-label="Main">
          <Link to="/" className={`lm-nav-link ${pathname === '/' ? 'active' : ''}`} aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>

          {/* Learn keeps its own link so the tab still opens the hub, with the
              categories behind a chevron the way the live site does it. */}
          <div className="lm-nav-split" ref={learnRef}>
            <Link
              to="/learn"
              className={`lm-nav-link lm-nav-link--split ${isLearnPath(pathname) ? 'active' : ''}`}
              aria-current={isLearnPath(pathname) ? 'page' : undefined}
              onClick={closeMenus}
            >
              Learn
            </Link>
            <button
              type="button"
              className={`lm-nav-link lm-nav-link--chevron ${isLearnPath(pathname) ? 'active' : ''}`}
              onClick={() => {
                setIsToolsOpen(false);
                setIsAccountOpen(false);
                setIsLearnOpen((open) => !open);
              }}
              aria-expanded={isLearnOpen}
              aria-haspopup="menu"
              aria-label="Show Learn categories"
            >
              <FontAwesomeIcon icon={faChevronDown} className={`lm-chevron ${isLearnOpen ? 'open' : ''}`} aria-hidden="true" />
            </button>
            {isLearnOpen && (
              <div className="lm-menu lm-menu--mega" role="menu" aria-label="Learn menu">
                {learnGroups.map((group) => (
                  <div className="lm-menu-group" key={group.label}>
                    <span className="lm-menu-label">{group.label}</span>
                    {group.categories.map((category) => {
                      const stain = subjectStainClass(category);

                      return (
                        <Link
                          key={category}
                          to={`/learn#${slugify(category)}`}
                          role="menuitem"
                          className={`${isLearnCategoryActive(category) ? 'active' : ''} ${stain}`.trim()}
                          onClick={() => setIsLearnOpen(false)}
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
          </div>

          <Link
            to="/visuals"
            className={`lm-nav-link ${isAtlasPath(pathname) ? 'active' : ''}`}
            aria-current={isAtlasPath(pathname) ? 'page' : undefined}
          >
            Atlas
          </Link>
          <div className="lm-nav-tools" ref={toolsRef}>
            <button
              type="button"
              className={`lm-nav-link ${isToolsActive ? 'active' : ''}`}
              onClick={() => {
                setIsAccountOpen(false);
                setIsLearnOpen(false);
                setIsToolsOpen((open) => !open);
              }}
              aria-expanded={isToolsOpen}
              aria-haspopup="menu"
            >
              Tools
              <FontAwesomeIcon icon={faChevronDown} className={`lm-chevron ${isToolsOpen ? 'open' : ''}`} aria-hidden="true" />
            </button>
            {isToolsOpen && (
              <div className="lm-menu" role="menu" aria-label="Bench tools">
                {toolGroups.map((group) => (
                  <div className="lm-menu-group" key={group.label}>
                    <span className="lm-menu-label">{group.label}</span>
                    {group.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        role="menuitem"
                        className={pathname === item.path ? 'active' : ''}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/practice"
            className={`lm-nav-link ${isReviewPath(pathname) ? 'active' : ''}`}
            aria-current={isReviewPath(pathname) ? 'page' : undefined}
          >
            Review
          </Link>
        </nav>

        <div className="lm-header-actions">
          <HeaderSearch searchIndex={searchIndex} onSearchIntent={onSearchIntent} />
          <button
            type="button"
            className="lm-icon-btn"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} aria-hidden="true" />
          </button>
          {user ? (
            <div className="lm-account" ref={accountRef}>
              <button
                type="button"
                className="lm-account-trigger"
                onClick={() => {
                  setIsToolsOpen(false);
                  setIsLearnOpen(false);
                  setIsAccountOpen((open) => !open);
                }}
                aria-expanded={isAccountOpen}
                aria-haspopup="menu"
                aria-label="Open account menu"
              >
                <span className="lm-avatar" aria-hidden="true">{getInitials(displayName)}</span>
                <span className="lm-account-name">{displayName}</span>
              </button>
              {isAccountOpen && (
                <div className="lm-menu lm-menu--right" role="menu" aria-label="Account menu">
                  <div className="lm-menu-account">
                    <span>Signed in</span>
                    <strong>{user.email ?? displayName}</strong>
                  </div>
                  <Link to="/account" role="menuitem">
                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    Your bench
                  </Link>
                  <button type="button" role="menuitem" onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="lm-btn lm-btn--on-dark lm-btn--sm lm-header-signin">
              Sign in
            </Link>
          )}
          {/* Phones only: the sections, Learn categories, bench tools and the
              theme toggle all live behind this. */}
          <button
            type="button"
            className="lm-icon-btn lm-burger"
            onClick={() => {
              closeMenus();
              setIsMenuOpen((open) => !open);
            }}
            aria-expanded={isMenuOpen}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        toolGroups={toolGroups}
        user={user}
        displayName={displayName}
        onSignOut={handleSignOut}
      />
    </header>
  );
}
