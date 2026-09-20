import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBook,
  faCheck,
  faChevronRight,
  faClipboardList,
  faFire,
  faFlask,
  faGraduationCap,
  faImages,
  faMicroscope,
  faSearch,
  faTrophy,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from './config/forms';
import { trackEvent } from './utils/analytics';
import { buildAuthRedirectPath } from './utils/authRedirect';
import { useAuth } from './context/AuthContext';
import { learnIndex, visualIndex } from './data/contentIndex.generated';
import type { DashboardSearchItem } from './data/dashboardSearchContent';
import SEO from './components/SEO/SEO';
import StudentTestimonials from './components/Testimonials/StudentTestimonials';
import SiteHeader from './components/Shell/SiteHeader';
import SiteFooter from './components/Shell/SiteFooter';
import { MobileBackButton, MobileTabBar } from './components/Shell/MobileNav';
import type { ToolGroup } from './components/Shell/navigation';
import { searchSiteItems } from './components/Shell/siteSearch';
import './App.css';
import './Home.css';

type DailyRiddleChoice = {
  id: string;
  label: string;
  correct: boolean;
};

type DailyMicrobeRiddle = {
  id: string;
  prompt: string;
  answerPath: string;
  explanation: string;
  choices: DailyRiddleChoice[];
};

type DailyRiddleResult = {
  selectedId: string;
  completedDate: string;
  riddleId: string;
};

const getLocalDateStamp = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDateDayNumber = (dateStamp: string) => {
  const [year, month, day] = dateStamp.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
};

const getDailyRiddleStorageKey = (riddleId: string) => `learnmicrobes_daily_riddle_${getLocalDateStamp()}_${riddleId}`;

const readDailyRiddleResult = (riddleId: string): DailyRiddleResult | null => {
  try {
    const savedResult = localStorage.getItem(getDailyRiddleStorageKey(riddleId));

    if (!savedResult) {
      return null;
    }

    const parsedResult = JSON.parse(savedResult) as Partial<DailyRiddleResult>;

    if (!parsedResult.selectedId || !parsedResult.completedDate) {
      return null;
    }

    return {
      selectedId: parsedResult.selectedId,
      completedDate: parsedResult.completedDate,
      riddleId
    };
  } catch (error) {
    return null;
  }
};

const dailyMicrobeRiddles: DailyMicrobeRiddle[] = [
  {
    id: 'pneumococcus-optochin-bile',
    prompt: 'I am a Gram-positive coccus, catalase-negative, alpha-hemolytic, optochin susceptible, and bile soluble. Who am I?',
    answerPath: '/learn/streptococcus-enterococcus',
    explanation: 'Optochin susceptibility plus bile solubility points to Streptococcus pneumoniae among alpha-hemolytic streptococci.',
    choices: [
      { id: 'a', label: 'A) Streptococcus pneumoniae', correct: true },
      { id: 'b', label: 'B) Streptococcus agalactiae', correct: false },
      { id: 'c', label: 'C) Enterococcus faecalis', correct: false }
    ]
  },
  {
    id: 'staph-aureus-coagulase',
    prompt: 'I am a Gram-positive coccus in clusters, catalase-positive, coagulase-positive, and often golden on culture. Who am I?',
    answerPath: '/learn/staphylococcus-micrococcus',
    explanation: 'Coagulase positivity is the classic bench split that separates Staphylococcus aureus from most other staphylococci.',
    choices: [
      { id: 'a', label: 'A) Staphylococcus epidermidis', correct: false },
      { id: 'b', label: 'B) Staphylococcus aureus', correct: true },
      { id: 'c', label: 'C) Micrococcus luteus', correct: false }
    ]
  },
  {
    id: 'enterobacterales-lactose-oxidase',
    prompt: 'I am a Gram-negative rod, oxidase-negative, ferment glucose, and usually grow well on MacConkey agar. Which group do I fit best?',
    answerPath: '/learn/enterobacterales',
    explanation: 'Oxidase-negative glucose-fermenting Gram-negative rods that grow on MacConkey point toward Enterobacterales.',
    choices: [
      { id: 'a', label: 'A) Enterobacterales', correct: true },
      { id: 'b', label: 'B) Neisseria species', correct: false },
      { id: 'c', label: 'C) Pseudomonas aeruginosa', correct: false }
    ]
  },
  {
    id: 'neisseria-oxidase-diplococci',
    prompt: 'I am an oxidase-positive Gram-negative diplococcus; chocolate agar and CO2 make me happier than MacConkey. Which guide should you review?',
    answerPath: '/learn/neisseria-moraxella',
    explanation: 'Oxidase-positive Gram-negative diplococci with enriched media needs fit the Neisseria and Moraxella bench pattern.',
    choices: [
      { id: 'a', label: 'A) Enterobacterales', correct: false },
      { id: 'b', label: 'B) Neisseria and Moraxella', correct: true },
      { id: 'c', label: 'C) Anaerobic bacteria', correct: false }
    ]
  },
  {
    id: 'yeast-germ-tube',
    prompt: 'I am a yeast that can make germ tubes quickly in serum and is a common cause of mucosal candidiasis. Who am I?',
    answerPath: '/learn/yeasts',
    explanation: 'A rapid germ tube-positive yeast pattern supports Candida albicans or Candida dubliniensis, with Candida albicans as the classic teaching answer.',
    choices: [
      { id: 'a', label: 'A) Cryptococcus neoformans', correct: false },
      { id: 'b', label: 'B) Candida albicans', correct: true },
      { id: 'c', label: 'C) Trichosporon asahii', correct: false }
    ]
  },
  {
    id: 'mycobacteria-acid-fast',
    prompt: 'My waxy cell wall helps me resist routine Gram stain interpretation, but acid-fast staining brings me into focus. Which group am I?',
    answerPath: '/learn/mycobacteria-actinomycetes',
    explanation: 'Mycolic acid-rich cell walls and acid-fast staining are core clues for mycobacteria and related aerobic actinomycetes.',
    choices: [
      { id: 'a', label: 'A) Mycobacteria and aerobic actinomycetes', correct: true },
      { id: 'b', label: 'B) Streptococcus and Enterococcus', correct: false },
      { id: 'c', label: 'C) Enterobacterales', correct: false }
    ]
  },
  {
    id: 'bacillus-spore-forming',
    prompt: 'I am a large Gram-positive rod that can form spores, grow aerobically, and may require safety-aware workup depending on the isolate. Which overview fits?',
    answerPath: '/learn/gram-positive-bacilli-overview',
    explanation: 'Large aerobic spore-forming Gram-positive rods fit the Bacillus-style branch within the Gram-positive bacilli overview.',
    choices: [
      { id: 'a', label: 'A) Curved water-associated Gram-negative rods', correct: false },
      { id: 'b', label: 'B) Gram-positive bacilli overview', correct: true },
      { id: 'c', label: 'C) Yeasts', correct: false }
    ]
  }
];

const getDailyMicrobeRiddle = () => {
  const dayNumber = getDateDayNumber(getLocalDateStamp());
  const riddleIndex = Math.abs(dayNumber) % dailyMicrobeRiddles.length;
  return dailyMicrobeRiddles[riddleIndex];
};

const getDailyFeaturedBenchCard = () => {
  const dayNumber = getDateDayNumber(getLocalDateStamp());
  const featuredIndex = Math.abs(dayNumber + 3) % visualIndex.length;
  return visualIndex[featuredIndex] ?? visualIndex[0];
};

const getRiddleChoiceName = (choice?: DailyRiddleChoice) => choice?.label.replace(/^[A-Z]\)\s*/, '') ?? 'the correct guide';

// Home task chooser (1.0 design). Accents are tool categories from the design
// system, not organism subjects, so they do not use the stain palette.
const homeTasks = [
  {
    icon: faMicroscope,
    title: 'Identify an unknown isolate',
    sub: 'Gram stain, then morphology, then the branch-point tests that narrow it.',
    cta: 'Open the workup',
    path: '/unknown-isolate-workup',
    accent: 'var(--lm-gram-pos)'
  },
  {
    icon: faFlask,
    title: 'Read a bench test result',
    sub: 'Reactions, QC organisms, and the reading traps that cost points.',
    cta: 'Open bench tests',
    path: '/biochemical-tests',
    accent: 'var(--lm-biochem)'
  },
  {
    icon: faGraduationCap,
    title: 'Study for the M(ASCP) exam',
    sub: 'Content areas mapped into study passes you can finish in a sitting.',
    cta: 'Open ASCP prep',
    path: '/ascp-microbiology-review',
    accent: 'var(--teal-600)'
  },
  {
    icon: faImages,
    title: 'See what it looks like',
    sub: 'Bench cards for plates, tubes, and Gram films, with the trap called out.',
    cta: 'Open the atlas',
    path: '/visuals',
    accent: 'var(--lm-gram-neg)'
  },
  {
    icon: faClipboardList,
    title: 'Test what I remember',
    sub: 'Quizzes, flashcards, and staged cases with explanations on every miss.',
    cta: 'Open practice',
    path: '/practice',
    accent: 'var(--sage-600)'
  },
  {
    icon: faBook,
    title: 'Learn a topic from scratch',
    sub: 'Plain-language topics that end in what you would do at the bench.',
    cta: 'Open the learn hub',
    path: '/learn',
    accent: 'var(--lm-anaerobe)'
  }
];

// Pulls in the Visual Atlas renderer, so it loads only when the featured card
// nears the viewport (see isFeaturedNear), never with the home shell itself.
const FeaturedBenchVisual = lazy(() => import('./components/Home/FeaturedBenchVisual'));

type HomeQuizProgress = { answered: number; streak: number; bestStreak: number };

// Reads the same keys StudyQuiz writes, without importing StudyQuiz (and with it
// the question bank) into the app shell.
const readHomeQuizProgress = (): HomeQuizProgress => {
  try {
    const raw = window.localStorage.getItem('learnmicrobes_study_quiz_state');
    const parsed = raw ? (JSON.parse(raw) as { answeredIds?: unknown }) : null;
    const answeredIds = parsed?.answeredIds;
    const answered = Array.isArray(answeredIds) ? answeredIds.length : 0;
    const readCount = (key: string) => {
      const value = Number(window.localStorage.getItem(key));
      return Number.isFinite(value) && value > 0 ? value : 0;
    };

    return {
      answered,
      streak: readCount('learnmicrobes_study_quiz_streak'),
      bestStreak: readCount('learnmicrobes_study_quiz_best_streak')
    };
  } catch (error) {
    return { answered: 0, streak: 0, bestStreak: 0 };
  }
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isHomeScreenHintDismissed, setIsHomeScreenHintDismissed] = useState(
    () => localStorage.getItem('learnmicrobes_home_screen_hint_dismissed') === 'true'
  );
  const [showDepthNudge, setShowDepthNudge] = useState(false);
  const [isNudgeDismissed, setIsNudgeDismissed] = useState(
    () => sessionStorage.getItem('lm_nudge_dismissed') === 'true'
  );

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

  useEffect(() => {
    if (user || isNudgeDismissed) {
      return;
    }

    const highIntentPaths = [
      '/visuals',
      '/study-quiz',
      '/practice',
      '/tools',
      '/gram-positive-roadmap',
      '/gram-negative-roadmap',
      '/obligate-anaerobe-roadmap',
      '/unknown-isolate-workup',
      '/biochemical-calculator',
      '/case-study-simulator',
      '/do-not-routine-culture',
      '/special-pathogens'
    ];
    const isHighIntentPath = highIntentPaths.some((path) => (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    ));

    if (!isHighIntentPath) {
      setShowDepthNudge(false);
      return;
    }

    const raw = sessionStorage.getItem('lm_page_count') ?? '0';
    const count = parseInt(raw, 10) + 1;
    sessionStorage.setItem('lm_page_count', String(count));

    if (count >= 6) {
      setShowDepthNudge(true);
    }
  }, [location.pathname, isNudgeDismissed, user]);

  const dismissHomeScreenHint = () => {
    localStorage.setItem('learnmicrobes_home_screen_hint_dismissed', 'true');
    setIsHomeScreenHintDismissed(true);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
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
                    : location.pathname.includes('ascp-microbiology-review')
                      ? 'ASCP Microbiology Review'
                      : location.pathname.includes('case-study-simulator')
                        ? 'Case Study Simulator'
                      : location.pathname.includes('flashcards')
                        ? 'Flashcards'
                      : location.pathname.includes('practice')
                        ? 'Practice'
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
                                : location.pathname.includes('account')
                                  ? 'Account'
                                  : location.pathname.includes('auth') || location.pathname.includes('login')
                                    ? 'Sign In'
                                    : location.pathname.includes('register')
                                      ? 'Create Account'
                                      : location.pathname.includes('join-alpha')
                                        ? 'Join Beta'
                                        : location.pathname.includes('about')
                                        ? 'About'
                                        : location.pathname.includes('mission')
                                          ? 'Mission'
                                          : location.pathname.includes('faq')
                                            ? 'FAQ'
                                            : location.pathname.includes('disclaimer')
                                              ? 'Disclaimer'
                                              : location.pathname.includes('terms')
                                                ? 'Terms of Use'
                                                : location.pathname.includes('privacy')
                                                  ? 'Privacy Policy'
                                                  : null;

  const isHomeRoute = location.pathname === '/';

  const dashboardActions = useMemo(() => ([
    {
      label: 'Learn from scratch',
      detail: 'Start with the beginner microbiology path.',
      path: '/learn/clinical-microbiology',
      icon: faGraduationCap
    },
    {
      label: 'Identify an unknown',
      detail: 'Use Gram stain, colony clues, and branch tests.',
      path: '/unknown-isolate-workup',
      icon: faMicroscope
    },
    {
      label: 'Review biochemical tests',
      detail: 'Look up reactions, QC, and interpretation traps.',
      path: '/biochemical-tests',
      icon: faFlask
    },
    {
      label: 'Study for M(ASCP) / SM(ASCP)',
      detail: 'Start an ASCP microbiology review loop with paths, quizzes, visuals, and bench tests.',
      path: '/ascp-microbiology-review',
      icon: faBook
    },
    {
      label: 'Look up a visual',
      detail: 'Browse original bench cards and reaction visuals.',
      path: '/visuals',
      icon: faImages
    },
    {
      label: 'Practice questions',
      detail: 'Check recall with bench and exam-style prompts.',
      path: '/practice',
      icon: faClipboardList
    }
  ]), []);

  const featuredBenchCard = useMemo(() => getDailyFeaturedBenchCard(), []);

  const homeSecondaryLinks = useMemo(() => ([
    { label: 'ASCP microbiology review', path: '/ascp-microbiology-review' },
    { label: 'Search all content', path: '/search' },
    { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
    { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' }
  ]), []);

  const toolGroups = useMemo<ToolGroup[]>(() => ([
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
        { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
        { label: 'Guides', path: '/guides' }
      ]
    }
  ]), []);

  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
  // Learn topics, bench tests, and atlas cards are only searched once someone uses the
  // search box, so their full text downloads then instead of with every page.
  const [contentSearchItems, setContentSearchItems] = useState<DashboardSearchItem[]>([]);
  const contentSearchRequested = useRef(false);
  const loadContentSearchItems = useCallback(() => {
    if (contentSearchRequested.current) {
      return;
    }

    contentSearchRequested.current = true;
    import('./data/dashboardSearchContent')
      .then((module) => setContentSearchItems(module.buildContentSearchItems()))
      .catch(() => {
        contentSearchRequested.current = false;
      });
  }, []);
  const [isDashboardSearchOpen, setIsDashboardSearchOpen] = useState(false);
  const [selectedDashboardSearchIndex, setSelectedDashboardSearchIndex] = useState(0);
  const dailyMicrobeRiddle = useMemo(() => getDailyMicrobeRiddle(), []);
  const [dailyRiddleResult, setDailyRiddleResult] = useState<DailyRiddleResult | null>(() => readDailyRiddleResult(dailyMicrobeRiddle.id));
  const dashboardSearchRef = useRef<HTMLDivElement | null>(null);

  const dashboardSearchIndex = useMemo<DashboardSearchItem[]>(() => {
    const getRouteCategory = (path: string): DashboardSearchItem['category'] => {
      if (path.startsWith('/learn')) return 'Learn';
      if (path.startsWith('/visuals')) return 'Visual';
      if (path.includes('roadmap')) return 'Roadmap';
      if (path === '/biochemical-tests') return 'Test';
      if (path.startsWith('/guides')) return 'Guide';
      return 'Tool';
    };

    const guideItems: DashboardSearchItem[] = [
      {
        id: 'guide-intro',
        title: 'Intro to Clinical Microbiology',
        category: 'Guide',
        snippet: 'Start-here bench mindset, specimens, Gram stain, media, and first-pass workup logic.',
        path: '/guides?guide=intro-to-microbiology',
        keywords: 'guide intro clinical microbiology beginner bench mindset gram stain media workup',
        priority: 7
      },
      {
        id: 'guide-bacterial-id',
        title: 'Bacterial ID Strategy',
        category: 'Guide',
        snippet: 'Specimen context, colony morphology, branch-point tests, and escalation strategy.',
        path: '/guides?guide=bacterial-identification-strategy',
        keywords: 'guide bacterial identification strategy unknown isolate colony morphology catalase oxidase bench',
        priority: 7
      },
      {
        id: 'guide-strep-enterococcus',
        title: 'Streptococcus and Enterococcus',
        category: 'Guide',
        snippet: 'Catalase-negative cocci, hemolysis, PYR, CAMP, optochin, bile solubility, and bile esculin.',
        path: '/guides?guide=streptococcus-enterococcus',
        keywords: 'guide streptococcus enterococcus pneumoniae agalactiae pyogenes faecalis optochin bile solubility pyr camp',
        priority: 8
      },
      {
        id: 'guide-enterics',
        title: 'Enterobacteriaceae',
        category: 'Guide',
        snippet: 'Oxidase-negative Gram-negative rods, MacConkey patterns, IMViC, H2S, urease, and enteric workflow.',
        path: '/guides?guide=enterobacteriaceae',
        keywords: 'guide enterobacteriaceae enterobacterales enterics macconkey lactose indole citrate h2s urease oxidase',
        priority: 6
      },
      {
        id: 'guide-gram-stain',
        title: 'Gram Stain',
        category: 'Guide',
        snippet: 'Microscopy, stain sequence, morphology, arrangement, and common false Gram patterns.',
        path: '/guides?guide=gram-stain',
        keywords: 'guide gram stain crystal violet iodine safranin decolorizer cocci rods morphology',
        priority: 7
      }
    ];

    const routeItems: DashboardSearchItem[] = [
      ...dashboardActions.map((action, index) => ({
        id: `action-${index}`,
        title: action.label,
        category: getRouteCategory(action.path),
        snippet: action.detail,
        path: action.path,
        keywords: `${action.label} ${action.detail}`,
        priority: action.path === '/ascp-microbiology-review' ? 9 : 6
      })),
      ...homeSecondaryLinks.map((link, index) => ({
        id: `secondary-${index}`,
        title: link.label,
        category: getRouteCategory(link.path),
        snippet: 'Common Learn Microbes route.',
        path: link.path,
        keywords: link.label,
        priority: 4
      })),
      {
        id: 'practice-hub',
        title: 'Practice',
        category: 'Tool',
        snippet: 'Quiz, ASCP review, and future case study simulator practice.',
        path: '/practice',
        keywords: 'practice quiz ascp review case study simulator questions',
        priority: 8
      },
      {
        id: 'case-study-simulator',
        title: 'Case Study Simulator',
        category: 'Tool',
        snippet: 'Future ASCP-style clinical microbiology case practice placeholder.',
        path: '/case-study-simulator',
        keywords: 'case study simulator ascp microbiology practice clinical scenario',
        priority: 7
      },
      {
        id: 'flashcards',
        title: 'Flashcards',
        category: 'Tool',
        snippet: 'Future rapid-recall microbiology flashcard practice placeholder.',
        path: '/flashcards',
        keywords: 'flashcards microbiology ascp review organism identification biochemical tests',
        priority: 7
      },
      {
        id: 'study-quiz-route',
        title: 'Study Quiz',
        category: 'Tool',
        snippet: 'Practice clinical microbiology questions and save quiz history.',
        path: '/study-quiz',
        keywords: 'study quiz practice questions microbiology ascp review',
        priority: 8
      },
      ...toolGroups.flatMap((group) => group.items.map((item) => ({
        id: `tool-${group.label}-${item.path}`,
        title: item.label,
        category: getRouteCategory(item.path),
        snippet: `${group.label} tool.`,
        path: item.path,
        keywords: `${group.label} ${item.label}`,
        priority: 5
      })))
    ];

    const uniqueItems = new Map<string, DashboardSearchItem>();

    [...routeItems, ...guideItems, ...contentSearchItems].forEach((item) => {
      const key = `${item.path}::${item.title}`;
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      }
    });

    return Array.from(uniqueItems.values());
  }, [contentSearchItems, dashboardActions, homeSecondaryLinks, toolGroups]);

  const dashboardSearchResults = useMemo<DashboardSearchItem[]>(
    () => searchSiteItems(dashboardSearchIndex, dashboardSearchQuery),
    [dashboardSearchIndex, dashboardSearchQuery]
  );

  const selectedRiddleChoice = dailyMicrobeRiddle.choices.find((choice) => choice.id === dailyRiddleResult?.selectedId);
  const correctRiddleChoice = dailyMicrobeRiddle.choices.find((choice) => choice.correct);
  const isDailyRiddleCorrect = selectedRiddleChoice?.correct ?? false;

  const handleDashboardSearchSelect = (item: DashboardSearchItem) => {
    trackEvent('search_used', {
      location: 'home_hero_search',
      search_term: dashboardSearchQuery.trim(),
      result_title: item.title,
      result_path: item.path
    });
    setDashboardSearchQuery('');
    setIsDashboardSearchOpen(false);
    setSelectedDashboardSearchIndex(0);
    navigate(item.path);
  };

  const handleDashboardSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dashboardSearchResults.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsDashboardSearchOpen(true);
      setSelectedDashboardSearchIndex((index) => Math.min(index + 1, dashboardSearchResults.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsDashboardSearchOpen(true);
      setSelectedDashboardSearchIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleDashboardSearchSelect(dashboardSearchResults[selectedDashboardSearchIndex] ?? dashboardSearchResults[0]);
      return;
    }

    if (event.key === 'Escape') {
      setIsDashboardSearchOpen(false);
    }
  };

  const handleDailyRiddleChoice = (choiceId: string) => {
    if (dailyRiddleResult) {
      return;
    }

    const result: DailyRiddleResult = {
      selectedId: choiceId,
      completedDate: getLocalDateStamp(),
      riddleId: dailyMicrobeRiddle.id
    };

    setDailyRiddleResult(result);

    try {
      localStorage.setItem(getDailyRiddleStorageKey(dailyMicrobeRiddle.id), JSON.stringify(result));
    } catch (error) {
      // The riddle still works for the current session if storage is unavailable.
    }
  };

  const openExternalForm = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAlphaSignupClick = (locationName: string) => {
    trackEvent('alpha_join_clicked', {
      location: locationName,
      destination: ALPHA_SIGNUP_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location: locationName,
      form_name: 'beta_tester_form'
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedbackClick = (locationName: string) => {
    trackEvent('feedback_clicked', {
      location: locationName,
      destination: FEEDBACK_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location: locationName,
      form_name: 'feedback_form'
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  const handleCreateAccountClick = (locationName: string) => {
    trackEvent('signup_cta_clicked', {
      location: locationName,
      destination: '/register'
    });
    navigate('/register');
  };

  useEffect(() => {
    setSelectedDashboardSearchIndex(0);
  }, [dashboardSearchQuery]);

  useEffect(() => {
    if (selectedDashboardSearchIndex >= dashboardSearchResults.length) {
      setSelectedDashboardSearchIndex(0);
    }
  }, [dashboardSearchResults.length, selectedDashboardSearchIndex]);

  useEffect(() => {
    if (!isDashboardSearchOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !dashboardSearchRef.current?.contains(target)) {
        setIsDashboardSearchOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isDashboardSearchOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [homeQuizProgress, setHomeQuizProgress] = useState<HomeQuizProgress>(readHomeQuizProgress);

  // Refresh when returning home, so a quiz answered a minute ago shows up.
  useEffect(() => {
    if (isHomeRoute) {
      setHomeQuizProgress(readHomeQuizProgress());
    }
  }, [isHomeRoute]);

  const featuredCardRef = useRef<HTMLDivElement | null>(null);
  const [isFeaturedNear, setIsFeaturedNear] = useState(false);

  useEffect(() => {
    if (!isHomeRoute || isFeaturedNear) {
      return undefined;
    }

    const node = featuredCardRef.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsFeaturedNear(true);
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsFeaturedNear(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px 0px' });

    observer.observe(node);

    return () => observer.disconnect();
  }, [isHomeRoute, isFeaturedNear]);

  const seoMetadata = useMemo(() => {
    // GitHub Pages can answer a directory route such as /learn at /learn/, so both spellings share one entry.
    const path = location.pathname.replace(/(.)\/+$/, '$1');
    const baseTitle = 'Learn Microbes - Clinical Microbiology & ASCP Review';
    const baseDescription = 'Clinical microbiology study tools for MLS students, ASCP microbiology review, bench workflows, organism ID, biochemical tests, visual cards, and quiz practice.';
    const learnSlug = path.match(/^\/learn\/([^/]+)$/)?.[1];
    const visualSlug = path.match(/^\/visuals\/([^/]+)$/)?.[1];
    const learnTopic = learnSlug ? learnIndex.find((topic) => topic.slug === learnSlug) : undefined;
    const visualPage = visualSlug ? visualIndex.find((page) => page.slug === visualSlug) : undefined;

    const breadcrumb = (items: Array<{ name: string; path: string }>) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://learnmicrobes.com${item.path}`
      }))
    });

    if (learnTopic) {
      return {
        title: `${learnTopic.title} | Clinical Microbiology Review | Learn Microbes`,
        description: `${learnTopic.summary} Learn this clinical microbiology topic for MLS coursework, ASCP review, and bench reference.`,
        canonicalPath: `/learn/${learnTopic.slug}`,
        ogType: 'article',
        structuredData: [
          breadcrumb([
            { name: 'Learn Microbes', path: '/' },
            { name: 'Learn', path: '/learn' },
            { name: learnTopic.title, path: `/learn/${learnTopic.slug}` }
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: learnTopic.title,
            description: learnTopic.summary,
            author: {
              '@type': 'Organization',
              name: 'Learn Microbes'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Learn Microbes'
            },
            mainEntityOfPage: `https://learnmicrobes.com/learn/${learnTopic.slug}`
          }
        ]
      };
    }

    if (visualPage) {
      return {
        title: `${/guide$/i.test(visualPage.title) ? visualPage.title : `${visualPage.title} Visual Guide`} | Learn Microbes`,
        description: `${visualPage.summary} Visual clinical microbiology bench card for students, ASCP review, and laboratory learning.`,
        canonicalPath: `/visuals/${visualPage.slug}`,
        structuredData: breadcrumb([
          { name: 'Learn Microbes', path: '/' },
          { name: 'Visual Atlas', path: '/visuals' },
          { name: visualPage.title, path: `/visuals/${visualPage.slug}` }
        ])
      };
    }

    const routeMetadata: Record<string, { title: string; description: string; noIndex?: boolean }> = {
      '/': {
        title: baseTitle,
        description: baseDescription
      },
      '/about': {
        title: 'About Learn Microbes | Clinical Microbiology Study Platform',
        description: 'Learn about the Learn Microbes clinical microbiology study platform, mission, study tools, organism ID roadmaps, visual reactions, and beta product direction.'
      },
      '/mission': {
        title: 'Mission and Vision | Learn Microbes',
        description: 'Learn Microbes mission and vision for practical clinical microbiology learning, bench logic, visual reactions, saved progress, and study workflows.'
      },
      '/faq': {
        title: 'FAQ | Learn Microbes',
        description: 'Frequently asked questions about Learn Microbes accounts, ASCP review, beta tools, usernames, saved progress, and clinical microbiology study content.'
      },
      '/disclaimer': {
        title: 'Disclaimer | Learn Microbes',
        description: 'Learn Microbes educational disclaimer for clinical microbiology review, ASCP study support, certification requirements, and clinical decision limits.'
      },
      '/terms': {
        title: 'Terms of Use | Learn Microbes',
        description: 'Plain-language Learn Microbes terms of use for beta clinical microbiology study tools, educational content, and acceptable platform use.'
      },
      '/privacy': {
        title: 'Privacy Policy | Learn Microbes',
        description: 'What Learn Microbes collects and why: account data, Supabase sign-in, Google Analytics, browser storage, and how to request a copy or deletion of your data.'
      },
      '/ascp-microbiology-review': {
        title: 'ASCP Microbiology Review | M(ASCP) Study Hub | Learn Microbes',
        description: 'ASCP microbiology review hub for MLS students and M(ASCP) prep: study paths, clinical microbiology quizzes, biochemical tests, organism ID workflows, safety traps, and visual bench cards.'
      },
      '/certification-study-paths': {
        title: 'M(ASCP) and SM(ASCP) Microbiology Study Paths | Learn Microbes',
        description: 'Map ASCP microbiology content areas into practical study passes for M(ASCP), SM(ASCP), MLS coursework, weak-area review, and clinical microbiology certification prep.'
      },
      '/study-quiz': {
        title: 'Clinical Microbiology Study Quiz | ASCP Review Practice | Learn Microbes',
        description: 'Practice clinical microbiology questions for ASCP review, MLS coursework, organism identification, bench tests, safety, mycology, parasitology, virology, and weak-area tracking.'
      },
      '/practice': {
        title: 'Clinical Microbiology Practice | Quiz and ASCP Review | Learn Microbes',
        description: 'Practice clinical microbiology with the Study Quiz, flashcards, and case studies for MLS students, ASCP review, and certification prep.'
      },
      '/case-study-simulator': {
        title: 'Case Study Simulator | ASCP Microbiology Practice | Learn Microbes',
        description: 'Work through scenario-based clinical microbiology case studies for ASCP-style practice, one stage at a time.'
      },
      '/flashcards': {
        title: 'Clinical Microbiology Flashcards | ASCP Review | Learn Microbes',
        description: 'Clinical microbiology flashcards for rapid recall, ASCP review, organism identification, biochemical tests, and bench interpretation patterns.'
      },
      '/learn': {
        title: 'Clinical Microbiology Learn Hub | MLS and ASCP Review | Learn Microbes',
        description: 'Browse clinical microbiology Learn pages for MLS students, ASCP review, organism identification, bench workflows, Gram stain logic, and diagnostic microbiology foundations.'
      },
      '/visuals': {
        title: 'Clinical Microbiology Visual Atlas | Learn Microbes',
        description: 'Visual bench cards for clinical microbiology reactions, organism clues, interpretation traps, and ASCP review-friendly study visuals.'
      },
      '/visuals/bacteriology': {
        title: 'Bacteriology Visual Atlas | Learn Microbes',
        description: 'Bacteriology visual bench cards for biochemical reactions, media patterns, growth clues, and clinical microbiology review.'
      },
      '/visuals/parasitology': {
        title: 'Parasitology Visual Atlas | Learn Microbes',
        description: 'Parasitology visual bench cards for ova, cysts, trophozoites, blood parasites, stains, and morphology-based clinical microbiology review.'
      },
      '/visuals/mycology': {
        title: 'Mycology Visual Atlas | Learn Microbes',
        description: 'Mycology visual bench cards for yeasts, molds, dimorphic fungi, dermatophytes, direct exams, and morphology-based clinical microbiology review.'
      },
      '/visuals/virology': {
        title: 'Virology Visual Atlas | Learn Microbes',
        description: 'Virology visual bench cards for cytopathic effects, inclusion patterns, molecular panels, serology patterns, and clinical microbiology review.'
      },
      '/biochemical-tests': {
        title: 'Biochemical Tests Review | Clinical Microbiology | Learn Microbes',
        description: 'Review clinical microbiology biochemical tests, principles, expected results, QC organisms, and exam-relevant interpretation traps.'
      },
      '/gram-positive-roadmap': {
        title: 'Gram-Positive Organism ID Roadmap | Learn Microbes',
        description: 'Practice Gram-positive organism identification using catalase, hemolysis, coagulase, PYR, optochin, bile solubility, and bench decision logic.'
      },
      '/gram-negative-roadmap': {
        title: 'Gram-Negative Organism ID Roadmap | Learn Microbes',
        description: 'Review Gram-negative organism identification with oxidase, lactose fermentation, biochemical patterns, and clinical microbiology workflow logic.'
      },
      '/do-not-routine-culture': {
        title: 'Special Pathogen Safety Review | Do Not Routine Culture | Learn Microbes',
        description: 'Review clinical microbiology safety escalation traps, special pathogens, and do-not-routine-culture workflows for bench learners and ASCP microbiology review.'
      },
      '/search': {
        title: 'Search Clinical Microbiology Review Content | Learn Microbes',
        description: 'Search Learn Microbes for clinical microbiology Learn pages, biochemical tests, organism ID roadmaps, ASCP review topics, visual cards, and study tools.'
      },
      '/auth': {
        title: 'Sign In | Learn Microbes',
        description: 'Sign in to save clinical microbiology progress, bookmarks, quiz history, and your Learn Microbes study profile.',
        noIndex: true
      },
      '/login': {
        title: 'Sign In | Learn Microbes',
        description: 'Sign in to save clinical microbiology progress, bookmarks, quiz history, and your Learn Microbes study profile.',
        noIndex: true
      },
      '/register': {
        title: 'Create Account | Learn Microbes',
        description: 'Create a Learn Microbes account to save clinical microbiology progress, bookmarks, quiz history, and your study profile.',
        noIndex: true
      },
      '/account': {
        title: 'Study Account | Learn Microbes',
        description: 'View saved Learn Microbes progress, bookmarks, quiz history, weak areas, and clinical microbiology study account details.',
        noIndex: true
      }
    };

    const metadata = routeMetadata[path] ?? {
      title: activeTool ? `${activeTool} | Learn Microbes` : baseTitle,
      description: baseDescription
    };

    return {
      ...metadata,
      canonicalPath: path,
      structuredData: breadcrumb([
        { name: 'Learn Microbes', path: '/' },
        { name: metadata.title.replace(/\s+\|\s+Learn Microbes.*$/, ''), path }
      ])
    };
  }, [activeTool, location.pathname]);

  return (
    <div className={`app-container ${activeTool === 'Study Quiz' ? 'study-quiz-route' : ''}`}>
      <SEO {...seoMetadata} />
      <SiteHeader
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        toolGroups={toolGroups}
        searchIndex={dashboardSearchIndex}
        onSearchIntent={loadContentSearchItems}
      />

      <main className={`app-main ${isHomeRoute ? 'app-main--home' : ''}`.trim()}>
        {isHomeRoute ? (
          <div className="home-v1">
            <section className="home-hero" aria-labelledby="home-title">
              <div className="home-hero-copy">
                <span className="lm-kicker">Clinical microbiology &amp; ASCP review</span>
                <h1 id="home-title">Learn the bench, not the list.</h1>
                <p>
                  Learn clinical microbiology the way the bench actually thinks: follow Gram stain, colony clues, media, key tests, and the next safest step.
                </p>
                <div className="home-hero-actions">
                  {user ? (
                    <Link
                      className="lm-btn lm-btn--primary"
                      to={homeQuizProgress.answered > 0 ? '/study-quiz' : '/practice'}
                    >
                      {homeQuizProgress.answered > 0 ? 'Resume quiz' : 'Start practicing'}
                    </Link>
                  ) : (
                    <button type="button" className="lm-btn lm-btn--primary" onClick={() => handleCreateAccountClick('home_hero')}>
                      Create free account
                    </button>
                  )}
                </div>

                <div className="home-search" ref={dashboardSearchRef}>
                  <label className="home-search-label" htmlFor="dashboard-hero-search-input">Search Learn Microbes</label>
                  <div className="home-search-box">
                    <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
                    <input
                      id="dashboard-hero-search-input"
                      type="search"
                      value={dashboardSearchQuery}
                      placeholder="Search tests, guides, roadmaps..."
                      role="combobox"
                      aria-expanded={isDashboardSearchOpen}
                      aria-controls="dashboard-hero-search-results"
                      aria-activedescendant={
                        isDashboardSearchOpen && dashboardSearchResults[selectedDashboardSearchIndex]
                          ? `dashboard-hero-search-option-${dashboardSearchResults[selectedDashboardSearchIndex].id}`
                          : undefined
                      }
                      onChange={(event) => {
                        loadContentSearchItems();
                        setDashboardSearchQuery(event.target.value);
                        setIsDashboardSearchOpen(true);
                      }}
                      onFocus={() => {
                        loadContentSearchItems();
                        setIsDashboardSearchOpen(true);
                      }}
                      onKeyDown={handleDashboardSearchKeyDown}
                    />
                  </div>
                  {isDashboardSearchOpen && (
                    <div className="home-search-menu" id="dashboard-hero-search-results" role="listbox">
                      {dashboardSearchResults.length > 0 ? (
                        dashboardSearchResults.map((result, index) => (
                          <button
                            type="button"
                            id={`dashboard-hero-search-option-${result.id}`}
                            key={result.id}
                            className={`home-search-option ${index === selectedDashboardSearchIndex ? 'active' : ''}`}
                            role="option"
                            aria-selected={index === selectedDashboardSearchIndex}
                            onMouseEnter={() => setSelectedDashboardSearchIndex(index)}
                            onClick={() => handleDashboardSearchSelect(result)}
                          >
                            <span>{result.category}</span>
                            <strong>{result.title}</strong>
                            <small>{result.snippet}</small>
                          </button>
                        ))
                      ) : (
                        <div className="home-search-empty">No close matches yet.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="home-hero-media" aria-hidden="true">
                <img src={`${process.env.PUBLIC_URL}/learn-microbes-bench-cover.png`} alt="" />
              </div>
            </section>

            <section className="home-tasks" aria-labelledby="home-tasks-title">
              <h2 id="home-tasks-title" className="lm-kicker home-tasks-title">What are you trying to do?</h2>
              <div className="home-task-grid">
                {homeTasks.map((task) => (
                  <Link
                    key={task.path}
                    to={task.path}
                    className="home-task lm-tinted"
                    style={{ '--lm-accent': task.accent } as React.CSSProperties}
                    onClick={() => trackEvent('tool_opened', { location: 'home_tool_card', tool_name: task.title, path: task.path })}
                  >
                    <span className="lm-icon-sq" aria-hidden="true">
                      <FontAwesomeIcon icon={task.icon} />
                    </span>
                    <span className="home-task-copy">
                      <strong>{task.title}</strong>
                      <small>{task.sub}</small>
                    </span>
                    <span className="home-task-cta">
                      {task.cta}
                      <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} className="home-task-chevron" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            <section className="home-bench-tools" aria-labelledby="home-bench-tools-title">
              <h2 id="home-bench-tools-title" className="lm-kicker">Bench tools</h2>
              <div className="home-bench-tools-list">
                {toolGroups.flatMap((group) => group.items).map((item) => (
                  <Link key={item.path} to={item.path}>{item.label}</Link>
                ))}
              </div>
            </section>

            {isMobile && !isHomeScreenHintDismissed && (
              <section className="dashboard-home-screen-hint" aria-label="Add Learn Microbes to your phone">
                <div>
                  <span className="dashboard-kicker">Mobile study shortcut</span>
                  <h2>Save Learn Microbes to your phone.</h2>
                  <p>
                    Open it like an app from your Home Screen. On iPhone Safari, tap Share then Add to Home Screen. On Android Chrome, tap the menu then Add to Home screen or Install app.
                  </p>
                </div>
                <button type="button" onClick={dismissHomeScreenHint} aria-label="Dismiss Add to Home Screen hint">
                  Dismiss
                </button>
              </section>
            )}

            <section className="home-account" aria-labelledby="home-account-title">
              {user ? (
                <div className="home-account-panel lm-panel">
                  <div className="home-account-copy">
                    <span className="lm-kicker home-kicker-row">
                      {homeQuizProgress.answered > 0 ? 'Pick up where you left off' : 'Start here'}
                      {homeQuizProgress.streak > 0 && <FontAwesomeIcon icon={faFire} className="home-streak-icon" aria-hidden="true" />}
                    </span>
                    <h2 id="home-account-title">
                      {homeQuizProgress.answered > 0 ? 'Resume your quiz' : 'A few questions is enough to start.'}
                    </h2>
                    <p>
                      {homeQuizProgress.answered > 0
                        ? `${homeQuizProgress.answered} question${homeQuizProgress.answered === 1 ? '' : 's'} answered in your last session. Continue where you stopped, or pick a new area.`
                        : 'Pick an area and answer a few questions. Every answer comes with an explanation.'}
                    </p>
                  </div>
                  {(homeQuizProgress.streak > 0 || homeQuizProgress.bestStreak > 0) && (
                    <div className="home-account-stats">
                      <div className="lm-stat">
                        <span className="lm-stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faFire} /></span>
                        <div>
                          <strong>{homeQuizProgress.streak}</strong>
                          <small>Answer streak</small>
                        </div>
                      </div>
                      <div className="lm-stat">
                        <span className="lm-stat-icon" aria-hidden="true"><FontAwesomeIcon icon={faTrophy} /></span>
                        <div>
                          <strong>{homeQuizProgress.bestStreak}</strong>
                          <small>Best streak</small>
                        </div>
                      </div>
                    </div>
                  )}
                  <Link
                    className="lm-btn lm-btn--primary lm-btn--block"
                    to={homeQuizProgress.answered > 0 ? '/study-quiz' : '/practice'}
                  >
                    {homeQuizProgress.answered > 0 ? 'Resume quiz' : 'Start practicing'}
                    <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div className="home-account-panel lm-panel">
                  <div className="home-account-copy">
                    <span className="lm-kicker">Free to use</span>
                    <h2 id="home-account-title">Start free. Learn the patterns.</h2>
                    <p>
                      Everything here is open without an account. Sign in only when you want saved quiz history and weak-area tracking.
                    </p>
                  </div>
                  <div className="home-free-actions">
                    <button type="button" className="lm-btn lm-btn--primary" onClick={() => handleCreateAccountClick('home_free_panel')}>
                      Create a free account
                    </button>
                    <Link className="lm-btn lm-btn--secondary" to="/practice">
                      Browse practice first
                    </Link>
                  </div>
                </div>
              )}
            </section>

            <section className="home-daily-grid" aria-label="Riddle of the day and featured bench card">
              <div className="home-riddle lm-panel">
                <span className="lm-kicker">Riddle of the day</span>
                <h2>Diagnostic quick hit</h2>
                <p className="home-riddle-prompt">{dailyMicrobeRiddle.prompt}</p>
                <div className="home-riddle-options" role="radiogroup" aria-label="Daily microbe riddle choices">
                  {dailyMicrobeRiddle.choices.map((choice) => {
                    const isSelected = choice.id === dailyRiddleResult?.selectedId;
                    const choiceState = dailyRiddleResult && choice.correct
                      ? 'correct'
                      : dailyRiddleResult && isSelected
                        ? 'incorrect'
                        : '';

                    return (
                      <button
                        type="button"
                        key={choice.id}
                        className={`home-riddle-choice ${choiceState}`.trim()}
                        role="radio"
                        aria-checked={isSelected}
                        disabled={Boolean(dailyRiddleResult)}
                        onClick={() => handleDailyRiddleChoice(choice.id)}
                      >
                        <span>{choice.label}</span>
                        <FontAwesomeIcon
                          icon={choiceState === 'correct' ? faCheck : choiceState === 'incorrect' ? faXmark : faChevronRight}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
                {dailyRiddleResult && selectedRiddleChoice && (
                  <div className={`home-riddle-feedback ${isDailyRiddleCorrect ? 'correct' : 'incorrect'}`} aria-live="polite">
                    <strong>{isDailyRiddleCorrect ? 'Correct.' : 'Not this one.'}</strong>
                    <p>
                      {isDailyRiddleCorrect
                        ? dailyMicrobeRiddle.explanation
                        : `Correct choice: ${getRiddleChoiceName(correctRiddleChoice)}. ${dailyMicrobeRiddle.explanation}`}
                    </p>
                    <Link className="lm-btn lm-btn--secondary lm-btn--sm" to={dailyMicrobeRiddle.answerPath}>
                      {isDailyRiddleCorrect ? 'Read full guide' : 'Review guide'}
                    </Link>
                  </div>
                )}
              </div>

              <div className="home-featured lm-panel" ref={featuredCardRef}>
                <span className="lm-kicker">Featured bench card</span>
                <h2>{featuredBenchCard.title}</h2>
                <p>{featuredBenchCard.summary}</p>
                {/* The drawing is a second way into the card for touch and mouse;
                    the button below is the keyboard and screen-reader path. */}
                <Link
                  className="home-featured-media"
                  to={`/visuals/${featuredBenchCard.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {isFeaturedNear ? (
                    <Suspense fallback={<span className="home-featured-placeholder" />}>
                      <FeaturedBenchVisual slug={featuredBenchCard.slug} />
                    </Suspense>
                  ) : (
                    <span className="home-featured-placeholder" />
                  )}
                </Link>
                <Link className="lm-btn lm-btn--primary" to={`/visuals/${featuredBenchCard.slug}`}>
                  Open bench card
                </Link>
              </div>
            </section>

            <StudentTestimonials />
          </div>
        ) : (
          <Suspense fallback={<div className="route-loading" aria-busy="true" style={{ minHeight: '60vh' }} />}>
            <Outlet />
          </Suspense>
        )}
      </main>

      <SiteFooter />
      <MobileTabBar />
      <MobileBackButton />
      <button
        type="button"
        className="persistent-feedback-btn"
        onClick={() => handleFeedbackClick('persistent_feedback_button')}
      >
        Send feedback
      </button>
      {showDepthNudge && !isNudgeDismissed && !user && (
        <div className="depth-nudge" role="status" aria-live="polite">
          <div className="depth-nudge-inner">
            <span>Sign in to save your progress and study history.</span>
            <button
              type="button"
              className="depth-nudge-cta"
              onClick={() => {
                setShowDepthNudge(false);
                navigate(buildAuthRedirectPath('/login', `${location.pathname}${location.search}`));
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className="depth-nudge-dismiss"
              aria-label="Dismiss"
              onClick={() => {
                setShowDepthNudge(false);
                setIsNudgeDismissed(true);
                sessionStorage.setItem('lm_nudge_dismissed', 'true');
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
