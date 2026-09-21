import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faGraduationCap,
  faHouse,
  faImages,
  faMoon,
  faRightFromBracket,
  faSun,
  faUser,
  faXmark
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
 * Phone navigation drawer. It carries the same destinations as the desktop
 * header — the sections, the Learn categories and the bench tools — so nothing
 * is reachable on a laptop but not on a phone.
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

  // Hold the page still behind the drawer, so a flick inside it does not scroll
  // the article underneath.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
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

  const sections = [
    { label: 'Home', icon: faHouse, path: '/', active: pathname === '/' },
    { label: 'Learn', icon: faBook, path: '/learn', active: isLearnPath(pathname) },
    { label: 'Atlas', icon: faImages, path: '/visuals', active: isAtlasPath(pathname) },
    { label: 'Review', icon: faGraduationCap, path: '/practice', active: isReviewPath(pathname) }
  ];

  return (
    <>
      <div className="lm-drawer-scrim" onClick={onClose} aria-hidden="true" />
      <div className="lm-drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="lm-drawer-head">
          <span className="lm-drawer-title">Menu</span>
          <button type="button" className="lm-drawer-close" onClick={onClose} aria-label="Close menu">
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>
        </div>

        <nav className="lm-drawer-body" aria-label="Site">
          {/* The account sits first: on phones this is the only way in, so it
              should not be buried under every category and tool. */}
          <div className="lm-drawer-group">
            {user ? (
              <>
                <span className="lm-drawer-signed">Signed in as {user.email ?? displayName}</span>
                <Link to="/account" className="lm-drawer-link" onClick={onClose}>
                  <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                  Your bench
                </Link>
              </>
            ) : (
              <Link to="/login" className="lm-drawer-link lm-drawer-link--cta" onClick={onClose}>
                <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                Sign in
              </Link>
            )}
          </div>

          <div className="lm-drawer-group">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className={`lm-drawer-link ${section.active ? 'active' : ''}`}
                aria-current={section.active ? 'page' : undefined}
                onClick={onClose}
              >
                <FontAwesomeIcon icon={section.icon} aria-hidden="true" />
                {section.label}
              </Link>
            ))}
          </div>

          {learnGroups.map((group) => (
            <div className="lm-drawer-group" key={group.label}>
              <span className="lm-drawer-label">{group.label}</span>
              {group.categories.map((category) => {
                const stain = subjectStainClass(category);

                return (
                  <Link
                    key={category}
                    to={`/learn#${slugify(category)}`}
                    className={`lm-drawer-link lm-drawer-link--sub ${stain}`.trim()}
                    onClick={onClose}
                  >
                    {stain && <i className="subject-stain-drop" aria-hidden="true" />}
                    {getCategoryDisplayName(category)}
                  </Link>
                );
              })}
            </div>
          ))}

          {toolGroups.map((group) => (
            <div className="lm-drawer-group" key={group.label}>
              <span className="lm-drawer-label">{group.label}</span>
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`lm-drawer-link lm-drawer-link--sub ${pathname === item.path ? 'active' : ''}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="lm-drawer-group lm-drawer-group--last">
            <button type="button" className="lm-drawer-link" onClick={onToggleTheme}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} aria-hidden="true" />
              {isDarkMode ? 'Light mode' : 'Dark mode'}
            </button>
            {user && (
              <button
                type="button"
                className="lm-drawer-link"
                onClick={() => {
                  onClose();
                  onSignOut();
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
                Sign out
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
