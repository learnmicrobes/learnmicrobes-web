import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faSearch, faUser, faMoon, faSun, faGear, faBars, faXmark, faChevronDown, faToolbox, faGraduationCap, faImages } from '@fortawesome/free-solid-svg-icons';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from './config/forms';
import { trackEvent } from './utils/analytics';
import { atlasPages } from './components/VisualAtlas/VisualAtlas';
import AlphaValidationCTA from './components/AlphaValidationCTA/AlphaValidationCTA';
import './App.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleToolChange = (tool: string | null) => {
    if (!tool) {
      navigate('/');
    } else {
      navigate(tool.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setIsNavMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const activeTool = location.pathname.includes('biochemical-calculator')
    ? 'Biochemical Calculator'
    : location.pathname.includes('gram-positive-roadmap')
      ? 'Gram Positive Roadmap'
      : location.pathname.includes('gram-negative-roadmap')
        ? 'Gram Negative Roadmap'
        : location.pathname.includes('obligate-anaerobe-roadmap')
          ? 'Obligate Anaerobe Roadmap'
          : location.pathname.includes('biochemical-tests')
            ? 'Biochemical Tests'
            : location.pathname.includes('unknown-isolate-workup')
              ? 'Unknown Isolate Workup'
              : location.pathname.includes('special-pathogens')
                ? 'Special Pathogens'
                : location.pathname.includes('syndrome-diagnostic-path')
                  ? 'Syndrome Diagnostic Path'
                  : location.pathname.includes('do-not-routine-culture')
                    ? 'Do Not Routine Culture'
                    : location.pathname.includes('study-quiz')
                      ? 'Study Quiz'
                      : location.pathname.includes('certification-study-paths')
                        ? 'Certification Study Paths'
                        : location.pathname.includes('visuals')
                          ? 'Visual Atlas'
                          : location.pathname.includes('learn')
                            ? 'Learn'
                            : location.pathname.includes('guides')
                              ? 'Guides'
                              : location.pathname.includes('search')
                                ? 'Search'
                                : location.pathname.includes('join-alpha')
                                  ? 'Join Alpha'
                                  : location.pathname.includes('about')
                                    ? 'About'
                                    : null;

  const isHomeRoute = location.pathname === '/';

  const dashboardActions = useMemo(() => ([
    {
      label: 'Learn from scratch',
      detail: 'Start with the beginner microbiology path.',
      path: '/learn/clinical-microbiology',
      code: '01'
    },
    {
      label: 'Identify an unknown',
      detail: 'Use Gram stain, colony clues, and branch tests.',
      path: '/unknown-isolate-workup',
      code: 'ID'
    },
    {
      label: 'Review biochemical tests',
      detail: 'Look up reactions, QC, and interpretation traps.',
      path: '/biochemical-tests',
      code: 'TEST'
    },
    {
      label: 'Study for M(ASCP) / SM(ASCP)',
      detail: 'Follow M(ASCP) and SM(ASCP) certification study paths.',
      path: '/certification-study-paths',
      code: 'M/SM'
    },
    {
      label: 'Look up a visual',
      detail: 'Browse original bench cards and reaction visuals.',
      path: '/visuals',
      code: 'VIS'
    },
    {
      label: 'Practice questions',
      detail: 'Check recall with bench and exam-style prompts.',
      path: '/study-quiz',
      code: 'Q'
    }
  ]), []);

  const startPath = useMemo(() => ([
    { step: '01', label: 'Read the beginner path', path: '/learn/clinical-microbiology' },
    { step: '02', label: 'Practice an unknown', path: '/unknown-isolate-workup' },
    { step: '03', label: 'Use a bench card', path: '/visuals/indole-production' }
  ]), []);

  const featuredBenchCard = useMemo(() => (
    atlasPages.find((page) => page.slug === 'indole-production') ?? atlasPages[0]
  ), []);

  const homeSecondaryLinks = useMemo(() => ([
    { label: 'Search all content', path: '/search' },
    { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
    { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' },
    { label: 'Syndrome path', path: '/syndrome-diagnostic-path' }
  ]), []);

  const toolGroups = useMemo(() => ([
    {
      label: 'Identification',
      items: [
        { label: 'Gram Positive Roadmap', path: '/gram-positive-roadmap' },
        { label: 'Gram Negative Roadmap', path: '/gram-negative-roadmap' },
        { label: 'Anaerobe Roadmap', path: '/obligate-anaerobe-roadmap' },
        { label: 'Unknown Isolate Workup', path: '/unknown-isolate-workup' }
      ]
    },
    {
      label: 'Reference',
      items: [
        { label: 'Biochemical Tests', path: '/biochemical-tests' },
        { label: 'Enterics Calculator', path: '/biochemical-calculator' },
        { label: 'Special Pathogens Hub', path: '/special-pathogens' },
        { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' }
      ]
    },
    {
      label: 'Practice',
      items: [
        { label: 'Certification Study Paths', path: '/certification-study-paths' },
        { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' },
        { label: 'Study Quiz', path: '/study-quiz' }
      ]
    }
  ]), []);

  const isToolPathActive = useMemo(() => (
    toolGroups.some((group) => group.items.some((item) => item.path === location.pathname))
  ), [location.pathname, toolGroups]);

  const openExternalForm = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAlphaSignupClick = (locationName: string) => {
    trackEvent('join_alpha_click', {
      location: locationName,
      destination: ALPHA_SIGNUP_FORM_URL
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedbackClick = (locationName: string) => {
    trackEvent('feedback_click', {
      location: locationName,
      destination: FEEDBACK_FORM_URL
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  const handleHomeToolCardClick = (toolName: string, path: string) => {
    trackEvent('tool_opened', {
      location: 'home_tool_card',
      tool_name: toolName,
      path
    });
    navigate(path);
  };

  useEffect(() => {
    if (activeTool) {
      document.title = `${activeTool} | Learn Microbes`;
    } else if (isHomeRoute) {
      document.title = 'Home | Learn Microbes';
    } else {
      document.title = 'Page Not Found | Learn Microbes';
    }
  }, [activeTool, isHomeRoute]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavMenuOpen(false);
    setIsSettingsOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isSettingsOpen && !isToolsOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!target.closest('.nav-settings')) {
        setIsSettingsOpen(false);
      }

      if (!target.closest('.nav-tools')) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isSettingsOpen, isToolsOpen]);

  return (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-brand" onClick={() => handleToolChange(null)}>
          <img
            className="nav-brand-mark"
            src={`${process.env.PUBLIC_URL}/brand-mark.svg`}
            alt="Learn Microbes"
          />
          {!isMobile && (
            <span className="nav-brand-text">
              <span className="nav-brand-name">Learn Microbes</span>
              <span className="nav-brand-tagline">Clinical Bench Reference</span>
            </span>
          )}
        </div>

        {isMobile && (
          <div className="mobile-nav-controls">
            <button
              className="mobile-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <button
              className="nav-menu-toggle"
              onClick={() => setIsNavMenuOpen((open) => !open)}
              aria-label={isNavMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isNavMenuOpen}
            >
              <FontAwesomeIcon icon={isNavMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        )}

        <div className={`nav-links ${isMobile ? 'mobile-nav' : ''} ${isNavMenuOpen ? 'open' : ''}`}>
          <div className="nav-links-main">
            <button
              className={isHomeRoute ? 'active' : ''}
              onClick={() => handleToolChange(null)}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-text">Home</span>
            </button>
            <button
              className={activeTool === 'Learn' ? 'active' : ''}
              onClick={() => navigate('/learn')}
            >
              <FontAwesomeIcon icon={faGraduationCap} />
              <span className="nav-text">Learn</span>
            </button>
            <button
              className={activeTool === 'Visual Atlas' ? 'active' : ''}
              onClick={() => navigate('/visuals')}
            >
              <FontAwesomeIcon icon={faImages} />
              <span className="nav-text">Visuals</span>
            </button>
            <div className="nav-tools">
              <button
                className={`nav-tools-trigger ${isToolPathActive ? 'active' : ''}`}
                onClick={() => {
                  setIsSettingsOpen(false);
                  setIsToolsOpen((open) => !open);
                }}
                aria-expanded={isToolsOpen}
                aria-haspopup="menu"
              >
                <FontAwesomeIcon icon={faToolbox} />
                <span className="nav-text">Tools</span>
                <FontAwesomeIcon icon={faChevronDown} className={`nav-chevron ${isToolsOpen ? 'open' : ''}`} />
              </button>
              {isToolsOpen && (
                <div className="nav-tools-menu" role="menu" aria-label="Tools menu">
                  {toolGroups.map((group) => (
                    <div className="nav-tools-group" key={group.label}>
                      <div className="nav-tools-group-label">{group.label}</div>
                      {group.items.map((item) => (
                        <button
                          key={item.path}
                          className={location.pathname === item.path ? 'active' : ''}
                          onClick={() => navigate(item.path)}
                          role="menuitem"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className={activeTool === 'Guides' ? 'active' : ''}
              onClick={() => navigate('/guides')}
            >
              <FontAwesomeIcon icon={faBook} />
              <span className="nav-text">Guides</span>
            </button>
            <button
              className={activeTool === 'Search' ? 'active' : ''}
              onClick={() => navigate('/search')}
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="nav-text">Search</span>
            </button>
          </div>
          <div className="nav-links-auth nav-settings">
            <button
              className="nav-settings-trigger"
              onClick={() => {
                setIsToolsOpen(false);
                setIsSettingsOpen((open) => !open);
              }}
              aria-label="Open settings"
              aria-expanded={isSettingsOpen}
              aria-haspopup="menu"
              title="Settings"
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="nav-text">Settings</span>
            </button>
            {isSettingsOpen && (
              <div className="nav-settings-menu" role="menu" aria-label="Settings menu">
                <button
                  className="theme-toggle-btn"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  role="menuitem"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <span>Theme</span>
                  <span className="theme-toggle-value">
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    {isDarkMode ? 'Light mode' : 'Dark mode'}
                  </span>
                </button>
              </div>
            )}
            <button
              className="nav-alpha-btn"
              onClick={() => {
                setIsSettingsOpen(false);
                setIsToolsOpen(false);
                setIsNavMenuOpen(false);
                navigate('/join-alpha');
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="nav-text">Join Alpha</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        {isHomeRoute ? (
          <div className="home-page home-dashboard">
            <section className="dashboard-cover-hero" aria-labelledby="dashboard-title">
              <picture className="dashboard-cover-media" aria-hidden="true">
                <img
                  className="dashboard-cover-image"
                  src={`${process.env.PUBLIC_URL}/learn-microbes-bench-cover.png`}
                  alt="Learn Microbes clinical microbiology study desk with reaction tubes, agar plate, Gram stain card, and bench card"
                />
              </picture>
              <div className="dashboard-cover-content">
                <span className="dashboard-kicker">Clinical bench reference</span>
                <h1 id="dashboard-title">Learn Microbes</h1>
                <p>
                  Visual bench cards, study paths, and practical microbiology tools for MLS students, ASCP review, and new clinical bench learners.
                </p>
                <div className="dashboard-search-card">
                  <span>Need one thing fast?</span>
                  <div className="dashboard-cover-actions">
                    <button type="button" onClick={() => navigate('/search')}>
                      Search
                    </button>
                    <button type="button" onClick={() => navigate('/learn/clinical-microbiology')}>
                      Start learning
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-intro" aria-label="Study task chooser">
              <span className="dashboard-kicker">What are you trying to do?</span>
              <p>Choose the closest study task and jump straight to the Learn page, bench card, roadmap, or practice tool that fits.</p>
            </section>

            <section className="dashboard-action-grid" aria-label="Primary study tasks">
              {dashboardActions.map((action) => (
                <button
                  type="button"
                  key={action.label}
                  className="dashboard-action-card"
                  onClick={() => handleHomeToolCardClick(action.label, action.path)}
                >
                  <span className="dashboard-action-code">{action.code}</span>
                  <strong>{action.label}</strong>
                  <small>{action.detail}</small>
                </button>
              ))}
            </section>

            <section className="dashboard-lower-grid" aria-label="Start path and featured bench card">
              <div className="dashboard-panel dashboard-start-path">
                <span className="dashboard-kicker">Start path</span>
                <h2>Three good first clicks</h2>
                <div className="dashboard-step-list">
                  {startPath.map((step) => (
                    <button type="button" key={step.step} onClick={() => navigate(step.path)}>
                      <span>{step.step}</span>
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dashboard-panel dashboard-featured-card">
                <span className="dashboard-kicker">Featured bench card</span>
                <h2>{featuredBenchCard.title}</h2>
                <p>{featuredBenchCard.summary}</p>
                <button type="button" onClick={() => navigate(`/visuals/${featuredBenchCard.slug}`)}>
                  Open bench card
                </button>
              </div>
            </section>

            <section className="dashboard-panel dashboard-secondary" aria-label="Common secondary routes">
              <span className="dashboard-kicker">Common routes</span>
              <div className="dashboard-secondary-links">
                {homeSecondaryLinks.map((link) => (
                  <button type="button" key={link.path} onClick={() => navigate(link.path)}>
                    {link.label}
                  </button>
                ))}
              </div>
            </section>

            <AlphaValidationCTA
              location="homepage_dashboard"
              title="Help shape the bench cards and study paths"
              body="Tell us what feels useful, what is missing, and whether saved progress or bookmarks would help your study workflow."
            />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <footer className="sleek-footer">
        <div className="sleek-footer-content">
          <div className="sleek-footer-top">
            <span className="connect-text">Connect With Us</span>
            <span className="sleek-footer-mini-divider" aria-hidden="true"></span>
            <div className="sleek-social-icons">
              <a href="https://www.instagram.com/learn.microbes/" target="_blank" rel="noopener noreferrer" aria-label="Learn Microbes on Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575016503288" target="_blank" rel="noopener noreferrer" aria-label="Learn Microbes on Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes" aria-label="Email Learn Microbes">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="sleek-footer-divider"></div>
          <div className="sleek-footer-bottom">
            &copy; 2026 LearnMicrobes.com | Made for educational purposes
          </div>
          <div className="sleek-footer-links">
            <button type="button" onClick={() => navigate('/about')}>About Learn Microbes</button>
          </div>
        </div>
      </footer>
      <button
        type="button"
        className="persistent-feedback-btn"
        onClick={() => handleFeedbackClick('persistent_feedback_button')}
      >
        Send feedback
      </button>
    </div>
  );
}
