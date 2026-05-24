import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faSearch, faInfoCircle, faUser, faMoon, faSun, faGear, faBars, faXmark, faChevronDown, faToolbox } from '@fortawesome/free-solid-svg-icons';
import NewsletterSignup from './components/Newsletter/NewsletterSignup';
import StudentTestimonials from './components/Testimonials/StudentTestimonials';
import './App.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isSigninNoticeOpen, setIsSigninNoticeOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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
                      : location.pathname.includes('guides')
                        ? 'Guides'
                        : location.pathname.includes('search')
                          ? 'Search'
                          : location.pathname.includes('about')
                            ? 'About'
                            : null;

  const isHomeRoute = location.pathname === '/';

  const homeQuickLinks = useMemo(() => ([
    { label: 'New learner? Start here', path: '/guides?guide=intro-to-microbiology' },
    { label: 'Search all content', path: '/search' },
    { label: 'Syndrome to test path', path: '/syndrome-diagnostic-path' },
    { label: 'Do not routine culture', path: '/do-not-routine-culture' },
    { label: 'Practice quiz', path: '/study-quiz' },
    { label: 'Special pathogens hub', path: '/special-pathogens' },
    { label: 'Open Gram positive roadmap', path: '/gram-positive-roadmap' },
    { label: 'Review bench tests', path: '/biochemical-tests' }
  ]), []);

  const quickStartPath = useMemo(() => ([
    { step: '01', label: 'Start here', path: '/guides?guide=intro-to-microbiology' },
    { step: '02', label: 'Practice a roadmap', path: '/gram-positive-roadmap' },
    { step: '03', label: 'Review bench tests', path: '/biochemical-tests' }
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
        { label: 'Syndrome Diagnostic Path', path: '/syndrome-diagnostic-path' },
        { label: 'Study Quiz', path: '/study-quiz' }
      ]
    }
  ]), []);

  const isToolPathActive = useMemo(() => (
    toolGroups.some((group) => group.items.some((item) => item.path === location.pathname))
  ), [location.pathname, toolGroups]);

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
    setIsSigninNoticeOpen(false);
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
          <button
            className="nav-menu-toggle"
            onClick={() => setIsNavMenuOpen((open) => !open)}
            aria-label={isNavMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isNavMenuOpen}
          >
            <FontAwesomeIcon icon={isNavMenuOpen ? faXmark : faBars} />
          </button>
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
              className={activeTool === 'Guides' ? 'active' : ''}
              onClick={() => navigate('/guides')}
            >
              <FontAwesomeIcon icon={faBook} />
              <span className="nav-text">Guides</span>
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
              className={activeTool === 'About' ? 'active' : ''}
              onClick={() => navigate('/about')}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="nav-text">About</span>
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
              className="nav-signin-btn"
              onClick={() => {
                setIsSettingsOpen(false);
                setIsToolsOpen(false);
                setIsNavMenuOpen(false);
                setIsSigninNoticeOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="nav-text">Sign In</span>
            </button>
          </div>
        </div>
      </nav>

      {isSigninNoticeOpen && (
        <div
          className="signin-notice-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsSigninNoticeOpen(false);
            }
          }}
        >
          <section className="signin-notice-card" role="dialog" aria-modal="true" aria-labelledby="signin-notice-title">
            <button
              type="button"
              className="signin-notice-close"
              onClick={() => setIsSigninNoticeOpen(false)}
              aria-label="Close sign in notice"
            >
              ×
            </button>
            <span className="signin-notice-badge">QC in progress</span>
            <h2 id="signin-notice-title">Accounts are incubating.</h2>
            <p>
              Sign in is not live yet. For alpha, Learn Microbes saves study progress on this device while we validate the account workflow.
            </p>
            <div className="signin-notice-actions">
              <button type="button" onClick={() => setIsSigninNoticeOpen(false)}>
                Back to bench
              </button>
              <button
                type="button"
                className="signin-notice-secondary"
                onClick={() => {
                  setIsSigninNoticeOpen(false);
                  navigate('/about');
                }}
              >
                Read project notes
              </button>
            </div>
          </section>
        </div>
      )}

      <main className="app-main">
        {isHomeRoute ? (
          <div className="home-page">
            <div className="hero-section">
              <div className="hero-content">
                <span className="hero-badge">Student-First Microbiology Learning</span>
                <h2>Your digital microbiology bench companion.</h2>
                <p>
                  Learn microbiology with a clear starting point, practical bench logic, and interactive tools that help you understand what to look at, what it means, and what to do next.
                </p>

                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-icon" aria-hidden="true">TEST</span>
                    <div className="stat-text">
                      <span className="stat-number">41+</span>
                      <span className="stat-label">Bench Tests</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon" aria-hidden="true">MAP</span>
                    <div className="stat-text">
                      <span className="stat-number">3</span>
                      <span className="stat-label">Diagnostic Roadmaps</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon" aria-hidden="true">CALC</span>
                    <div className="stat-text">
                      <span className="stat-number">24</span>
                      <span className="stat-label">Reaction Calculators</span>
                    </div>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="hero-primary-btn" onClick={() => navigate('/search')}>
                    Search the database
                  </button>
                  <div className="hero-quick-links" aria-label="Quick links">
                    {homeQuickLinks.map((link) => (
                      <button
                        key={link.path}
                        className="hero-link-chip"
                        onClick={() => navigate(link.path)}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hero-start-strip" aria-label="How to start">
                  <span className="hero-start-label">How to start</span>
                  <div className="hero-start-steps">
                    {quickStartPath.map((item) => (
                      <button
                        key={item.step}
                        className="hero-start-step"
                        onClick={() => navigate(item.path)}
                      >
                        <span className="hero-start-number">{item.step}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tool-cards">
              <button
                className="tool-card start-here"
                onClick={() => navigate('/guides?guide=intro-to-microbiology')}
              >
                <span className="tool-icon" aria-hidden="true">START</span>
                <h3>Start Here: Intro to Microbiology</h3>
                <p>Built for new learners and new medical technologists who need a clear bench-first introduction</p>
              </button>

              <button
                className="tool-card calculator"
                onClick={() => handleToolChange('Biochemical Calculator')}
              >
                <span className="tool-icon" aria-hidden="true">CALC</span>
                <h3>Enterics Biochemical Calculator</h3>
                <p>Identify Enteric organisms based on 24 biochemical tests</p>
              </button>

              <button
                className="tool-card gram-positive"
                onClick={() => handleToolChange('Gram Positive Roadmap')}
              >
                <span className="tool-icon" aria-hidden="true">G+</span>
                <h3>Gram Positive Roadmap</h3>
                <p>Interactive flowchart for Staph, Strep, and Bacillus identification with clinical pearls</p>
              </button>

              <button
                className="tool-card gram-negative"
                onClick={() => handleToolChange('Gram Negative Roadmap')}
              >
                <span className="tool-icon" aria-hidden="true">G-</span>
                <h3>Gram Negative Roadmap</h3>
                <p>Decision tree for enteric bacteria, Pseudomonas, and fastidious organisms</p>
              </button>

              <button
                className="tool-card anaerobe"
                onClick={() => handleToolChange('Obligate Anaerobe Roadmap')}
              >
                <span className="tool-icon" aria-hidden="true">AN</span>
                <h3>Obligate Anaerobe Roadmap</h3>
                <p>Identification guide for strict anaerobic bacteria using morphology, oxygen tolerance, and key biochemical tests</p>
              </button>

              <button
                className="tool-card biochemical-tests"
                onClick={() => handleToolChange('Biochemical Tests')}
              >
                <span className="tool-icon" aria-hidden="true">TEST</span>
                <h3>Biochemical Tests</h3>
                <p>Detailed principles, methods, and quality control for clinical bench tests</p>
              </button>

              <button
                className="tool-card unknown-isolate"
                onClick={() => handleToolChange('Unknown Isolate Workup')}
              >
                <span className="tool-icon" aria-hidden="true">ID</span>
                <h3>Unknown Isolate Workup</h3>
                <p>Practice the bench sequence from Gram stain and colony clues to the next logical test</p>
              </button>

              <button
                className="tool-card special-pathogens"
                onClick={() => navigate('/special-pathogens')}
              >
                <span className="tool-icon" aria-hidden="true">SP</span>
                <h3>Special Pathogens Hub</h3>
                <p>Navigate anaerobes, mycobacteria, intracellular agents, Mycoplasma/Ureaplasma, and spirochetes by diagnostic strategy</p>
              </button>

              <button
                className="tool-card syndrome-path"
                onClick={() => navigate('/syndrome-diagnostic-path')}
              >
                <span className="tool-icon" aria-hidden="true">DX</span>
                <h3>Syndrome to Diagnostic Path</h3>
                <p>Choose the presentation and learn which specimen, test method, timing, and safety note fit best</p>
              </button>

              <button
                className="tool-card do-not-culture"
                onClick={() => navigate('/do-not-routine-culture')}
              >
                <span className="tool-icon" aria-hidden="true">STOP</span>
                <h3>Do Not Routine Culture</h3>
                <p>Recognize organisms and syndromes where the best bench move is escalation, NAAT, serology, special culture, or reference testing</p>
              </button>

              <button
                className="tool-card study-quiz"
                onClick={() => navigate('/study-quiz')}
              >
                <span className="tool-icon" aria-hidden="true">QUIZ</span>
                <h3>Study Quiz</h3>
                <p>Practice bench tests, organism profiles, QC reactions, expected results, and safety escalation logic</p>
              </button>
            </div>

            <StudentTestimonials />
            <NewsletterSignup />
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
        </div>
      </footer>
    </div>
  );
}
