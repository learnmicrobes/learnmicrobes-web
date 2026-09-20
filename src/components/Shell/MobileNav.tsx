import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChevronLeft,
  faGraduationCap,
  faHouse,
  faImages,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import {
  getParentPath,
  isAccountPath,
  isAtlasPath,
  isLearnPath,
  isReviewPath,
  isTabRoot
} from './navigation';
import './Shell.css';

/** Phone-only bottom tab bar. Hidden above 900px, where the header nav takes over. */
export function MobileTabBar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const tabs = [
    { label: 'Home', icon: faHouse, path: '/', active: pathname === '/' },
    { label: 'Learn', icon: faBook, path: '/learn', active: isLearnPath(pathname) },
    { label: 'Atlas', icon: faImages, path: '/visuals', active: isAtlasPath(pathname) },
    { label: 'Review', icon: faGraduationCap, path: '/practice', active: isReviewPath(pathname) },
    {
      label: user ? 'Me' : 'Sign in',
      icon: faUser,
      path: user ? '/account' : '/login',
      active: isAccountPath(pathname)
    }
  ];

  return (
    <nav className="lm-tabbar" aria-label="Main">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          to={tab.path}
          className={`lm-tab ${tab.active ? 'active' : ''}`}
          aria-current={tab.active ? 'page' : undefined}
        >
          <FontAwesomeIcon icon={tab.icon} aria-hidden="true" />
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}

/**
 * Floating back button for pages below a tab root on phones. Returns through the
 * in-app history when there is some, otherwise to the page's parent section, so
 * someone who arrived from a search result is never sent off the site.
 */
export function MobileBackButton() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (isTabRoot(pathname)) {
    return null;
  }

  const handleBack = () => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0;

    if (historyIndex > 0) {
      navigate(-1);
    } else {
      navigate(getParentPath(pathname));
    }
  };

  return (
    <button type="button" className="lm-back-fab" onClick={handleBack}>
      <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
      Back
    </button>
  );
}
