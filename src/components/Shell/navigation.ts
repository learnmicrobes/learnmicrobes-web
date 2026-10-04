export type ToolGroup = {
  label: string;
  items: Array<{ label: string; path: string }>;
};

// Routes that live under the Review tab. Kept in one place so the desktop nav,
// the phone tab bar, and the back button agree on what "Review" means.
const reviewPaths = [
  '/practice',
  '/study-quiz',
  '/ascp-microbiology-review',
  '/case-study-simulator',
  '/flashcards',
  '/certification-study-paths'
];

// The Tools menu. Its paths also decide when the Tools tab is current, so a page
// is listed here once and the menu and the highlight cannot disagree.
export const toolGroups: ToolGroup[] = [
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
];

const matchesPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`);

const isReviewPath = (pathname: string) => reviewPaths.some((path) => matchesPath(pathname, path));

export type NavSection = 'home' | 'learn' | 'atlas' | 'tools' | 'review';

/**
 * The one section a page belongs to, or null (search, account, about...).
 * Every nav surface reads this instead of keeping its own rule: the old
 * per-tab checks overlapped, and /guides lit up Learn and Tools together.
 * A page belongs to the section whose menu lists it.
 */
export const getNavSection = (pathname: string): NavSection | null => {
  if (pathname === '/') return 'home';
  if (matchesPath(pathname, '/learn')) return 'learn';
  if (matchesPath(pathname, '/visuals')) return 'atlas';
  if (isReviewPath(pathname)) return 'review';
  if (toolGroups.some((group) => group.items.some((item) => matchesPath(pathname, item.path)))) return 'tools';
  return null;
};

const isAccountPath = (pathname: string) => ['/account', '/login', '/register', '/auth'].includes(pathname);

// Top-level destinations of the phone tab bar. Everything else is a page inside
// one of them and gets the floating back button.
export const isTabRoot = (pathname: string) => (
  ['/', '/learn', '/visuals', '/practice', '/search'].includes(pathname) || isAccountPath(pathname)
);

/** Where "Back" goes when there is no in-app history to return to. */
export const getParentPath = (pathname: string) => {
  if (matchesPath(pathname, '/learn')) return '/learn';
  if (matchesPath(pathname, '/visuals')) return '/visuals';
  if (isReviewPath(pathname)) return '/practice';
  return '/';
};

type AuthUser = {
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
} | null;

export const getDisplayName = (user: AuthUser) => {
  const metadata = user?.user_metadata ?? {};
  const candidates = [metadata.full_name, metadata.name, metadata.username];
  const name = candidates.find((value): value is string => typeof value === 'string' && value.trim().length > 0);

  if (name) {
    return name.trim();
  }

  return user?.email ? user.email.split('@')[0] : 'Account';
};

export const getInitials = (name: string) => {
  const initials = name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return initials || 'LM';
};

// The Learn menu, grouped the same way the live site groups it: methods first,
// then the organism groups, then the diagnostics and review topics. Each entry
// jumps to its section of /learn.
export const learnGroups: Array<{ label: string; categories: string[] }> = [
  {
    label: 'Foundations & Methods',
    categories: ['Foundations', 'Clinical Lab Principles', 'Core Methods']
  },
  {
    label: 'Organism Groups',
    categories: ['Bacteriology', 'Parasitology', 'Mycology', 'Virology']
  },
  {
    label: 'Diagnostics & Review',
    categories: ['Molecular and Immunodiagnostics', 'Bench and Exam Integration']
  }
];
