export const getSafeAuthRedirectPath = (value: string | null) => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return null;
  }

  const normalizedValue = value.toLowerCase();

  if (
    normalizedValue.startsWith('/login') ||
    normalizedValue.startsWith('/auth') ||
    normalizedValue.startsWith('/register')
  ) {
    return null;
  }

  return value;
};

export const buildAuthRedirectPath = (authPath: '/login' | '/register', redirectTo?: string | null) => {
  const safeRedirect = getSafeAuthRedirectPath(redirectTo ?? null);

  if (!safeRedirect) {
    return authPath;
  }

  return `${authPath}?redirectTo=${encodeURIComponent(safeRedirect)}`;
};
