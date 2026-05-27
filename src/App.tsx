import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faSearch, faInfoCircle, faUser, faMoon, faSun, faGear, faBars, faXmark, faChevronDown, faToolbox, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import NewsletterSignup from './components/Newsletter/NewsletterSignup';
import StudentTestimonials from './components/Testimonials/StudentTestimonials';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from './config/forms';
import { trackEvent } from './utils/analytics';
import { learnTopics } from './data/learnTopics';
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

  const homeQuickLinks = useMemo(() => ([
    { label: 'New learner? Start here', path: '/learn/clinical-microbiology' },
    { label: 'Learn the basics', path: '/learn' },
    { label: 'Search all content', path: '/search' },
    { label: 'Syndrome to test path', path: '/syndrome-diagnostic-path' },
    { label: 'Do not routine culture', path: '/do-not-routine-culture' },
    { label: 'Practice quiz', path: '/study-quiz' },
    { label: 'M/SM study path', path: '/certification-study-paths' },
    { label: 'Special pathogens hub', path: '/special-pathogens' },
    { label: 'Open Gram positive roadmap', path: '/gram-positive-roadmap' },
    { label: 'Review bench tests', path: '/biochemical-tests' }
  ]), []);

  const quickStartPath = useMemo(() => ([
    { step: '01', label: 'Start here', path: '/learn/clinical-microbiology' },
    { step: '02', label: 'Practice a roadmap', path: '/gram-positive-roadmap' },
    { step: '03', label: 'Review bench tests', path: '/biochemical-tests' }
  ]), []);

  const studentSituationLinks = useMemo(() => ([
    { label: "I'm new", path: '/learn/clinical-microbiology' },
    { label: 'I have an unknown organism', path: '/unknown-isolate-workup' },
    { label: 'I need Gram positive ID', path: '/gram-positive-roadmap' },
    { label: 'I need Gram negative ID', path: '/gram-negative-roadmap' },
    { label: "I'm studying for M/SM", path: '/certification-study-paths' },
    { label: 'I have a syndrome question', path: '/syndrome-diagnostic-path' },
    { label: 'I want practice', path: '/study-quiz' }
  ]), []);

  const featuredLearnTopics = useMemo(() => (
    ['gram-stain', 'culture-media', 'macconkey-agar', 'catalase-test']
      .map((slug) => learnTopics.find((topic) => topic.slug === slug))
      .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic))
  ), []);

  const homeToolGroups = useMemo(() => ([
    {
      title: 'Start Learning',
      note: 'Build the bench vocabulary before the organism workup gets busy.',
      tools: [
        {
          className: 'start-here',
          icon: 'START',
          title: 'Begin Learning',
          path: '/learn/clinical-microbiology',
          description: 'Start here if you are new to clinical micro and want a guided first-pass bench sequence.'
        },
        {
          className: 'certification-path',
          icon: 'M/SM',
          title: 'Certification Study Paths',
          path: '/certification-study-paths',
          description: 'Study microbiology by exam goal: M(ASCP) for core certification prep or SM(ASCP) for advanced specialist review.'
        },
        {
          className: 'biochemical-tests',
          icon: 'TEST',
          title: 'Biochemical Tests',
          path: '/biochemical-tests',
          description: 'Look up what a test means, how it works, and which organisms it helps separate.'
        }
      ]
    },
    {
      title: 'Identify an Unknown',
      note: 'Use these when you have Gram stain, colony clues, or early bench reactions.',
      tools: [
        {
          className: 'unknown-isolate',
          icon: 'ID',
          title: 'Unknown Isolate Workup',
          path: '/unknown-isolate-workup',
          description: 'Start here when you have Gram stain, colony morphology, and need the next test.'
        },
        {
          className: 'gram-positive',
          icon: 'G+',
          title: 'Gram Positive Roadmap',
          path: '/gram-positive-roadmap',
          description: 'Work through Staph, Strep, Bacillus-like rods, coryneforms, and other Gram-positive branches.'
        },
        {
          className: 'gram-negative',
          icon: 'G-',
          title: 'Gram Negative Roadmap',
          path: '/gram-negative-roadmap',
          description: 'Work up enterics, oxidase-positive rods, fastidious organisms, and nonfermenters by branch logic.'
        },
        {
          className: 'anaerobe',
          icon: 'AN',
          title: 'Obligate Anaerobe Roadmap',
          path: '/obligate-anaerobe-roadmap',
          description: 'Use when oxygen tolerance, specimen quality, colony clues, and anaerobic setup drive the answer.'
        },
        {
          className: 'calculator',
          icon: 'CALC',
          title: 'Enterics Biochemical Calculator',
          path: '/biochemical-calculator',
          description: 'Enter reaction patterns and narrow likely Enterobacteriaceae matches from 24 biochemical tests.'
        }
      ]
    },
    {
      title: 'Choose the Diagnostic Path',
      note: 'Use these when the question is specimen, method, safety, or when routine culture is the wrong move.',
      tools: [
        {
          className: 'syndrome-path',
          icon: 'DX',
          title: 'Syndrome to Diagnostic Path',
          path: '/syndrome-diagnostic-path',
          description: 'Start with the patient presentation and choose the best specimen, method, and safety note.'
        },
        {
          className: 'do-not-culture',
          icon: 'STOP',
          title: 'Do Not Routine Culture',
          path: '/do-not-routine-culture',
          description: 'Recognize cases where escalation, NAAT, serology, special culture, or reference testing fits best.'
        },
        {
          className: 'special-pathogens',
          icon: 'SP',
          title: 'Special Pathogens Hub',
          path: '/special-pathogens',
          description: 'Use when routine Gram stain and plate logic may fail: AFB, anaerobes, intracellular agents, spirochetes, and Mycoplasma.'
        }
      ]
    },
    {
      title: 'Practice + Review',
      note: 'Check whether the bench logic is sticking and circle back to weak spots.',
      tools: [
        {
          className: 'study-quiz',
          icon: 'QUIZ',
          title: 'Study Quiz',
          path: '/study-quiz',
          description: 'Practice bench tests, organism profiles, QC reactions, expected results, and safety escalation logic.'
        }
      ]
    }
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
    trackEvent('alpha_signup_click', {
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

            <section className="alpha-invite-card" aria-labelledby="alpha-invite-title">
              <div>
                <span className="alpha-invite-kicker">Alpha testers</span>
                <h2 id="alpha-invite-title">Help shape Learn Microbes</h2>
                <p>
                  We're looking for med tech students, exam takers, and new lab professionals to test the site and tell us what to build next.
                </p>
              </div>
              <button type="button" onClick={() => handleAlphaSignupClick('homepage_alpha_card')}>
                Join Alpha
              </button>
            </section>

            <section className="learn-basics-card" aria-labelledby="learn-basics-title">
              <div className="learn-basics-header">
                <span className="learn-basics-kicker">Microbiology basics</span>
                <h2 id="learn-basics-title">Browse the notes. Read at your own pace.</h2>
                <p>
                  Concise review pages for the fundamentals students search for: stains, media, bench tests, organism groups, and specimen quality.
                </p>
              </div>
              <div className="learn-basics-links">
                {featuredLearnTopics.map((topic) => (
                  <button
                    key={topic.slug}
                    type="button"
                    onClick={() => navigate(`/learn/${topic.slug}`)}
                  >
                    {topic.title}
                  </button>
                ))}
                <button type="button" className="learn-basics-all" onClick={() => navigate('/learn')}>
                  View all basics
                </button>
              </div>
            </section>

            <section className="student-tool-map" aria-labelledby="student-tool-map-title">
              <div className="student-tool-map-header">
                <span className="student-tool-map-kicker">Choose your situation</span>
                <h2 id="student-tool-map-title">What are you trying to solve?</h2>
                <p>
                  Pick the closest bench problem first. Each lane below points you toward the tool that matches your next move.
                </p>
              </div>

              <div className="student-situation-grid" aria-label="Student situations">
                {studentSituationLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleHomeToolCardClick(link.label, link.path)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </section>

            <div className="tool-lanes">
              {homeToolGroups.map((group) => {
                const laneTitleId = `${group.title.toLowerCase().replace(/\s|\+/g, '-')}-title`;

                return (
                  <section className="tool-lane" key={group.title} aria-labelledby={laneTitleId}>
                    <div className="tool-lane-header">
                      <h2 id={laneTitleId}>{group.title}</h2>
                      <p>{group.note}</p>
                    </div>

                    <div className="tool-cards">
                      {group.tools.map((tool) => (
                        <button
                          key={tool.title}
                          className={`tool-card ${tool.className}`}
                          onClick={() => handleHomeToolCardClick(tool.title, tool.path)}
                        >
                          <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
                          <h3>{tool.title}</h3>
                          <p>{tool.description}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
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
