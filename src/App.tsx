import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faSearch, faUser, faMoon, faSun, faGear, faBars, faXmark, faChevronDown, faToolbox, faGraduationCap, faImages, faRightFromBracket, faRightToBracket, faMicroscope, faFlask, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from './config/forms';
import { trackEvent } from './utils/analytics';
import { useAuth } from './context/AuthContext';
import { atlasPages } from './components/VisualAtlas/VisualAtlas';
import { learnTopics } from './data/learnTopics';
import { biochemicalTestsData } from './tools/BiochemicalTests/biochemicalData';
import AlphaValidationCTA from './components/AlphaValidationCTA/AlphaValidationCTA';
import SEO from './components/SEO/SEO';
import StudentTestimonials from './components/Testimonials/StudentTestimonials';
import './App.css';

type DashboardSearchItem = {
  id: string;
  title: string;
  category: 'Guide' | 'Learn' | 'Roadmap' | 'Test' | 'Tool' | 'Visual';
  snippet: string;
  path: string;
  keywords: string;
  priority: number;
};

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

const normalizeDashboardSearchText = (value: string) => (
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
);

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
  const featuredIndex = Math.abs(dayNumber + 3) % atlasPages.length;
  return atlasPages[featuredIndex] ?? atlasPages[0];
};

const getRiddleChoiceName = (choice?: DailyRiddleChoice) => choice?.label.replace(/^[A-Z]\)\s*/, '') ?? 'the correct guide';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
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

  const handleToolChange = (tool: string | null) => {
    if (!tool) {
      navigate('/');
    } else {
      navigate(tool.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsAccountMenuOpen(false);
    setIsToolsOpen(false);
    setIsNavMenuOpen(false);
    navigate('/');
  };

  const closeMobileNavigation = useCallback(() => {
    if (!isMobile) {
      return;
    }

    setIsNavMenuOpen(false);
    setIsAccountMenuOpen(false);
    setIsToolsOpen(false);
  }, [isMobile]);

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

  const startPath = useMemo(() => ([
    { step: '01', label: 'Read the beginner path', path: '/learn/clinical-microbiology' },
    { step: '02', label: 'Practice an unknown', path: '/unknown-isolate-workup' },
    { step: '03', label: 'Use a bench card', path: '/visuals/indole-production' }
  ]), []);

  const socialStartPaths = useMemo(() => ([
    {
      label: 'I am new to micro',
      detail: 'Start with taxonomy, Gram stain logic, and the first bench clues.',
      path: '/learn/clinical-microbiology'
    },
    {
      label: 'I am reviewing for ASCP',
      detail: 'Use the M(ASCP) review hub for quizzes, visuals, and weak-area loops.',
      path: '/ascp-microbiology-review'
    },
    {
      label: 'I am learning bench workflow',
      detail: 'Follow an unknown from first observations to the safest next step.',
      path: '/unknown-isolate-workup'
    },
    {
      label: 'I need biochemical help',
      detail: 'Look up reactions, QC organisms, expected results, and traps.',
      path: '/biochemical-tests'
    }
  ]), []);

  const featuredBenchCard = useMemo(() => getDailyFeaturedBenchCard(), []);

  const homeSecondaryLinks = useMemo(() => ([
    { label: 'ASCP microbiology review', path: '/ascp-microbiology-review' },
    { label: 'Search all content', path: '/search' },
    { label: 'Gram positive roadmap', path: '/gram-positive-roadmap' },
    { label: 'Gram negative roadmap', path: '/gram-negative-roadmap' }
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
        { label: 'Do Not Routine Culture', path: '/do-not-routine-culture' },
        { label: 'Guides', path: '/guides' }
      ]
    }
  ]), []);

  const isToolPathActive = useMemo(() => (
    toolGroups.some((group) => group.items.some((item) => item.path === location.pathname))
  ), [location.pathname, toolGroups]);

  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
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

    const learnItems: DashboardSearchItem[] = learnTopics.map((topic) => ({
      id: `learn-${topic.slug}`,
      title: topic.title,
      category: 'Learn',
      snippet: topic.summary,
      path: `/learn/${topic.slug}`,
      keywords: [
        topic.title,
        topic.category,
        topic.summary,
        topic.whyItMatters,
        topic.principle,
        topic.studentShortcut,
        ...topic.keywords
      ].join(' '),
      priority: 6
    }));

    const testItems: DashboardSearchItem[] = biochemicalTestsData.map((test) => ({
      id: `test-${test.id}`,
      title: test.name,
      category: 'Test',
      snippet: test.principle,
      path: '/biochemical-tests',
      keywords: [
        test.name,
        test.category,
        test.principle,
        test.reagents,
        test.procedure,
        test.expectedResults
      ].join(' '),
      priority: 5
    }));

    const visualItems: DashboardSearchItem[] = atlasPages.map((page) => ({
      id: `visual-${page.slug}`,
      title: page.title,
      category: 'Visual',
      snippet: page.summary,
      path: `/visuals/${page.slug}`,
      keywords: [
        page.title,
        page.eyebrow,
        page.summary,
        page.boardTitle,
        page.boardNote,
        page.readoutTitle,
        page.trapTitle,
        ...page.trapBullets,
        ...page.interpretationRows.flat(),
        ...page.takeaways
      ].join(' '),
      priority: 5
    }));

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

    [...routeItems, ...guideItems, ...learnItems, ...testItems, ...visualItems].forEach((item) => {
      const key = `${item.path}::${item.title}`;
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      }
    });

    return Array.from(uniqueItems.values());
  }, [dashboardActions, homeSecondaryLinks, toolGroups]);

  const dashboardSearchResults = useMemo<DashboardSearchItem[]>(() => {
    const query = normalizeDashboardSearchText(dashboardSearchQuery);
    const terms = query.split(' ').filter(Boolean);
    const scoredResults = dashboardSearchIndex
      .map((item) => {
        const title = normalizeDashboardSearchText(item.title);
        const haystack = normalizeDashboardSearchText(`${item.title} ${item.category} ${item.snippet} ${item.keywords}`);

        if (!query) {
          return { item, score: item.priority };
        }

        if (!terms.every((term) => haystack.includes(term))) {
          return null;
        }

        let score = item.priority;

        if (title.startsWith(query)) score += 7;
        if (title.includes(query)) score += 4;
        if (normalizeDashboardSearchText(item.path).includes(query)) score += 2;

        return { item, score };
      })
      .filter((result): result is { item: DashboardSearchItem; score: number } => result !== null);

    return scoredResults
      .sort((first, second) => second.score - first.score || first.item.title.localeCompare(second.item.title))
      .slice(0, 6)
      .map((result) => result.item);
  }, [dashboardSearchIndex, dashboardSearchQuery]);

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

  const handleHomeToolCardClick = (toolName: string, path: string) => {
    trackEvent('tool_opened', {
      location: 'home_tool_card',
      tool_name: toolName,
      path
    });
    navigate(path);
  };

  const handleStartHereClick = (label: string, path: string) => {
    trackEvent('start_here_path_clicked', {
      location: 'home_start_here',
      path_label: label,
      path
    });
    navigate(path);
  };

  const handleCreateAccountClick = (locationName: string) => {
    trackEvent('signup_cta_clicked', {
      location: locationName,
      destination: '/register'
    });
    navigate('/register');
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
    setIsNavMenuOpen(false);
    setIsAccountMenuOpen(false);
    setIsToolsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile || !isNavMenuOpen) {
      return undefined;
    }

    const handleScroll = () => closeMobileNavigation();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [closeMobileNavigation, isMobile, isNavMenuOpen]);

  useEffect(() => {
    if (!isAccountMenuOpen && !isToolsOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!target.closest('.nav-account-menu-shell')) {
        setIsAccountMenuOpen(false);
      }

      if (!target.closest('.nav-tools')) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isAccountMenuOpen, isToolsOpen]);

  const seoMetadata = useMemo(() => {
    const path = location.pathname;
    const baseTitle = 'Learn Microbes - Clinical Microbiology & ASCP Review';
    const baseDescription = 'Clinical microbiology study tools for MLS students, ASCP microbiology review, bench workflows, organism ID, biochemical tests, visual cards, and quiz practice.';
    const learnSlug = path.match(/^\/learn\/([^/]+)$/)?.[1];
    const visualSlug = path.match(/^\/visuals\/([^/]+)$/)?.[1];
    const learnTopic = learnSlug ? learnTopics.find((topic) => topic.slug === learnSlug) : undefined;
    const visualPage = visualSlug ? atlasPages.find((page) => page.slug === visualSlug) : undefined;

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
        title: `${visualPage.title} Visual Guide | Learn Microbes`,
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
        description: 'Learn how Learn Microbes uses account data, Supabase authentication, saved bookmarks, Learn progress, quiz history, and feedback during beta.'
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
        description: 'Practice clinical microbiology with Study Quiz, ASCP review workflows, and future case-based simulator practice for MLS students and certification review.'
      },
      '/case-study-simulator': {
        title: 'Case Study Simulator | ASCP Microbiology Practice | Learn Microbes',
        description: 'Planned Learn Microbes case study simulator for ASCP-style clinical microbiology practice and scenario-based review.'
      },
      '/flashcards': {
        title: 'Clinical Microbiology Flashcards | ASCP Review | Learn Microbes',
        description: 'Planned Learn Microbes flashcards for clinical microbiology rapid recall, ASCP review, organism identification, biochemical tests, and bench interpretation patterns.'
      },
      '/learn': {
        title: 'Clinical Microbiology Learn Hub | MLS and ASCP Review | Learn Microbes',
        description: 'Browse clinical microbiology Learn pages for MLS students, ASCP review, organism identification, bench workflows, Gram stain logic, and diagnostic microbiology foundations.'
      },
      '/visuals': {
        title: 'Clinical Microbiology Visual Atlas | Learn Microbes',
        description: 'Visual bench cards for clinical microbiology reactions, organism clues, interpretation traps, and ASCP review-friendly study visuals.'
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
              <span className="nav-brand-tagline">Clinical Microbiology &amp; ASCP Review</span>
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
            {user ? (
              <button
                className="mobile-auth-shortcut"
                onClick={() => {
                  setIsNavMenuOpen(false);
                  setIsAccountMenuOpen(false);
                  setIsToolsOpen(false);
                  navigate('/account');
                }}
                aria-label="Open your study account"
                title="Account"
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Account</span>
              </button>
            ) : (
              <button
                className="mobile-auth-shortcut"
                onClick={() => {
                  setIsNavMenuOpen(false);
                  setIsAccountMenuOpen(false);
                  setIsToolsOpen(false);
                  navigate('/login');
                }}
                aria-label="Sign in"
                title="Sign in"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>Sign in</span>
              </button>
            )}
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
              onClick={() => {
                closeMobileNavigation();
                handleToolChange(null);
              }}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="nav-text">Home</span>
            </button>
            <button
              className={activeTool === 'Learn' ? 'active' : ''}
              onClick={() => {
                closeMobileNavigation();
                navigate('/learn');
              }}
            >
              <FontAwesomeIcon icon={faGraduationCap} />
              <span className="nav-text">Learn</span>
            </button>
            <button
              className={activeTool === 'Visual Atlas' ? 'active' : ''}
              onClick={() => {
                closeMobileNavigation();
                navigate('/visuals');
              }}
            >
              <FontAwesomeIcon icon={faImages} />
              <span className="nav-text">Visuals</span>
            </button>
            <div className="nav-tools">
              <button
                className={`nav-tools-trigger ${isToolPathActive ? 'active' : ''}`}
                onClick={() => {
                  setIsAccountMenuOpen(false);
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
                          onClick={() => {
                            closeMobileNavigation();
                            navigate(item.path);
                          }}
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
              className={activeTool === 'Practice' || activeTool === 'Study Quiz' || activeTool === 'ASCP Microbiology Review' || activeTool === 'Case Study Simulator' || activeTool === 'Flashcards' || activeTool === 'Certification Study Paths' ? 'active' : ''}
              onClick={() => {
                closeMobileNavigation();
                navigate('/practice');
              }}
            >
              <FontAwesomeIcon icon={faBook} />
              <span className="nav-text">Practice</span>
            </button>
            <button
              className={activeTool === 'Search' ? 'active' : ''}
              onClick={() => {
                closeMobileNavigation();
                navigate('/search');
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="nav-text">Search</span>
            </button>
          </div>
          {isMobile && user && (
            <div className="mobile-nav-signout-section">
              <div className="mobile-nav-signout-divider" aria-hidden="true" />
              <button
                className="mobile-nav-signout-btn"
                onClick={handleSignOut}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="nav-text">Sign out</span>
              </button>
            </div>
          )}

          <div className="nav-links-auth">
            {user ? (
              <div className="nav-account-menu-shell">
                <button
                  className={`nav-account-trigger ${activeTool === 'Account' ? 'active' : ''}`}
                  onClick={() => {
                    setIsToolsOpen(false);
                    setIsAccountMenuOpen((open) => !open);
                  }}
                  aria-label="Open account menu"
                  aria-expanded={isAccountMenuOpen}
                  aria-haspopup="menu"
                  title={user.email ?? 'Signed in'}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="nav-text">Account</span>
                  <FontAwesomeIcon icon={faChevronDown} className={`nav-chevron ${isAccountMenuOpen ? 'open' : ''}`} />
                </button>
                {isAccountMenuOpen && (
                  <div className="nav-account-menu" role="menu" aria-label="Account menu">
                    <div className="nav-account-menu-header">
                      <span>Signed in</span>
                      <strong>{user.email ?? 'Learn Microbes account'}</strong>
                    </div>
                    <button
                      onClick={() => {
                        closeMobileNavigation();
                        navigate('/account');
                      }}
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Your study account</span>
                    </button>
                    <button
                      className="theme-toggle-btn"
                      onClick={() => {
                        setIsDarkMode(!isDarkMode);
                        closeMobileNavigation();
                      }}
                      role="menuitem"
                      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      <FontAwesomeIcon icon={faGear} />
                      <span>Settings</span>
                      <span className="theme-toggle-value">
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                        {isDarkMode ? 'Light mode' : 'Dark mode'}
                      </span>
                    </button>
                    <button
                      className="nav-account-signout"
                      onClick={handleSignOut}
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-links-auth-guest">
                <button
                  className="nav-signin-btn"
                  onClick={() => {
                    setIsAccountMenuOpen(false);
                    setIsToolsOpen(false);
                    setIsNavMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span className="nav-text">Sign in</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="app-main" onPointerDown={isNavMenuOpen ? closeMobileNavigation : undefined}>
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
                <span className="dashboard-kicker">Clinical microbiology &amp; ASCP review</span>
                <h1 id="dashboard-title">Learn Microbes</h1>
                <p>
                  Learn clinical microbiology the way the bench actually thinks: follow Gram stain, colony clues, media, key tests, and the next safest step.
                </p>
                {!user && (
                  <div className="dashboard-cover-actions" aria-label="Primary Learn Microbes actions">
                    <button type="button" onClick={() => handleCreateAccountClick('home_hero')}>
                      Create free account
                    </button>
                  </div>
                )}
                <div className="dashboard-hero-search" ref={dashboardSearchRef}>
                  <label htmlFor="dashboard-hero-search-input">Search Learn Microbes</label>
                  <div className="dashboard-hero-search-box">
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
                        setDashboardSearchQuery(event.target.value);
                        setIsDashboardSearchOpen(true);
                      }}
                      onFocus={() => setIsDashboardSearchOpen(true)}
                      onKeyDown={handleDashboardSearchKeyDown}
                    />
                  </div>
                  {isDashboardSearchOpen && (
                    <div className="dashboard-hero-search-menu" id="dashboard-hero-search-results" role="listbox">
                      {dashboardSearchResults.length > 0 ? (
                        dashboardSearchResults.map((result, index) => (
                          <button
                            type="button"
                            id={`dashboard-hero-search-option-${result.id}`}
                            key={result.id}
                            className={`dashboard-hero-search-option ${index === selectedDashboardSearchIndex ? 'active' : ''}`}
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
                        <div className="dashboard-hero-search-empty">No close matches yet.</div>
                      )}
                    </div>
                  )}
                </div>
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

            <section className="dashboard-intro" aria-label="Study task chooser">
              <span className="dashboard-kicker">What are you trying to do?</span>
              <p>Stop memorizing isolated facts. Pick the closest route and study the workflow: clue by clue, test by test, bench decision by bench decision.</p>
            </section>

            <section className="dashboard-start-here-panel" aria-labelledby="dashboard-start-here-title">
              <div className="dashboard-start-here-copy">
                <span className="dashboard-kicker">New here?</span>
                <h2 id="dashboard-start-here-title">Start with the path that matches your goal.</h2>
                <p>
                  Built for MedTech students, ASCP reviewees, and new micro bench learners by a working clinical lab scientist.
                </p>
              </div>
              <div className="dashboard-start-here-grid">
                {socialStartPaths.map((path) => (
                  <button
                    type="button"
                    key={path.label}
                    onClick={() => handleStartHereClick(path.label, path.path)}
                  >
                    <strong>{path.label}</strong>
                    <span>{path.detail}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-trust-note" aria-label="Educational use note">
              <strong>Bench-first educational review.</strong>
              <span>
                Learn Microbes uses teaching content and de-identified educational visuals. Follow your facility SOPs, institutional policies, and official certification guidance for real clinical work.
              </span>
            </section>

            <section className="dashboard-action-grid" aria-label="Primary study tasks">
              {dashboardActions.map((action) => (
                <button
                  type="button"
                  key={action.label}
                  className="dashboard-action-card"
                  onClick={() => handleHomeToolCardClick(action.label, action.path)}
                >
                  <span className="dashboard-action-code"><FontAwesomeIcon icon={action.icon} /></span>
                  <strong>{action.label}</strong>
                  <small>{action.detail}</small>
                </button>
              ))}
            </section>

            <section className="dashboard-lower-grid" aria-label="Start path, daily riddle, and featured bench card">
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

              <div className={`dashboard-panel dashboard-riddle-card ${dailyRiddleResult ? (isDailyRiddleCorrect ? 'correct' : 'incorrect') : ''}`}>
                <span className="dashboard-kicker">Riddle of the day</span>
                <h2>Diagnostic quick hit</h2>
                <p className="dashboard-riddle-prompt">{dailyMicrobeRiddle.prompt}</p>
                <div className="dashboard-riddle-options" role="radiogroup" aria-label="Daily microbe riddle choices">
                  {dailyMicrobeRiddle.choices.map((choice) => {
                    const isSelected = choice.id === dailyRiddleResult?.selectedId;
                    const choiceStatusClass = dailyRiddleResult && choice.correct
                      ? 'correct'
                      : dailyRiddleResult && isSelected
                        ? 'incorrect'
                        : '';

                    return (
                      <button
                        type="button"
                        key={choice.id}
                        className={`dashboard-riddle-choice ${isSelected ? 'selected' : ''} ${choiceStatusClass}`}
                        role="radio"
                        aria-checked={isSelected}
                        disabled={Boolean(dailyRiddleResult)}
                        onClick={() => handleDailyRiddleChoice(choice.id)}
                      >
                        {choice.label}
                      </button>
                    );
                  })}
                </div>
                {dailyRiddleResult && selectedRiddleChoice && (
                  <div className="dashboard-riddle-feedback" aria-live="polite">
                    <strong>{isDailyRiddleCorrect ? 'Correct.' : 'Not this one.'}</strong>
                    <p>
                      {isDailyRiddleCorrect
                        ? dailyMicrobeRiddle.explanation
                        : `Correct choice: ${getRiddleChoiceName(correctRiddleChoice)}. ${dailyMicrobeRiddle.explanation}`}
                    </p>
                    <button type="button" onClick={() => navigate(dailyMicrobeRiddle.answerPath)}>
                      {isDailyRiddleCorrect ? 'Read full guide' : 'Review guide'}
                    </button>
                  </div>
                )}
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

            <StudentTestimonials />

            <AlphaValidationCTA
              location="homepage_dashboard"
              title="Free beta access for early Learn Microbes users"
              body="Create an account to save progress, bookmarks, quiz history, and help shape what gets built next. The beta form asks your role, study goal, and hardest micro topic."
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
              <a href="https://x.com/learn_microbes" target="_blank" rel="noopener noreferrer" aria-label="Learn Microbes on X">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes" aria-label="Email Learn Microbes">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="sleek-footer-bottom">
            <span className="sleek-footer-legal">
              <span className="sleek-footer-legal-full">&copy; 2026 LearnMicrobes.com</span>
              <span className="sleek-footer-legal-short">&copy; 2026 LearnMicrobes.com</span>
            </span>
            <nav className="sleek-footer-links" aria-label="Footer links">
              <Link to="/about">About</Link>
              <Link to="/mission">Mission</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/disclaimer">Disclaimer</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
              <a
                href={ALPHA_SIGNUP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('alpha_join_clicked', {
                    location: 'footer',
                    destination: ALPHA_SIGNUP_FORM_URL
                  });
                  trackEvent('lead_form_viewed', {
                    location: 'footer',
                    form_name: 'beta_tester_form'
                  });
                }}
              >
                Join Beta
              </a>
            </nav>
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
      {showDepthNudge && !isNudgeDismissed && !user && (
        <div className="depth-nudge" role="status" aria-live="polite">
          <div className="depth-nudge-inner">
            <span>Sign in to save your progress and study history.</span>
            <button
              type="button"
              className="depth-nudge-cta"
              onClick={() => {
                setShowDepthNudge(false);
                navigate('/login');
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
