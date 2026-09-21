import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { getParentPath, isTabRoot } from './navigation';
import './Shell.css';

/**
 * Floating back button for pages below a section root on phones. Returns through the
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
