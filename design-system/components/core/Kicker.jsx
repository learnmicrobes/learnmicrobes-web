import React from 'react';

/**
 * Learn Microbes — Kicker
 * The uppercase, letter-spaced eyebrow label. The brand's type signature.
 */
export function Kicker({ children, tone = 'sage', as = 'div', style = {}, ...rest }) {
  const colors = {
    sage: 'var(--lm-sage-600)',
    teal: 'var(--text-brand)',
    muted: 'var(--text-muted)',
    onDark: 'var(--lm-sage-400)',
    onDarkMuted: 'var(--text-onbrand-muted)',
  };
  const Tag = as;
  return (
    <Tag style={{
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-label)',
      color: colors[tone] || colors.sage,
      ...style,
    }} {...rest}>{children}</Tag>
  );
}
