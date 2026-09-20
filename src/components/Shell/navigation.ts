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

const matchesPath = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`);

export const isReviewPath = (pathname: string) => reviewPaths.some((path) => matchesPath(pathname, path));

export const isLearnPath = (pathname: string) => matchesPath(pathname, '/learn') || matchesPath(pathname, '/guides');

export const isAtlasPath = (pathname: string) => matchesPath(pathname, '/visuals');

export const isAccountPath = (pathname: string) => ['/account', '/login', '/register', '/auth'].includes(pathname);

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
