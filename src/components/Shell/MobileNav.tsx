import React, { useEffect, useState } from 'react';
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
  const [isTucked, setIsTucked] = useState(false);

  // The button floats over the page, so it slides away while the reader scrolls
  // down through content and returns as soon as they scroll back up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY;

        if (Math.abs(delta) >= 8) {
          setIsTucked(delta > 0 && y > 120);
          lastY = y;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setIsTucked(false);
  }, [pathname]);

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
    <button
      type="button"
      className={`lm-back-fab${isTucked ? ' is-tucked' : ''}`}
      onClick={handleBack}
      tabIndex={isTucked ? -1 : undefined}
      aria-hidden={isTucked || undefined}
    >
      <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
      Back
    </button>
  );
}
