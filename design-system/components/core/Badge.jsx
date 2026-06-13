import React from 'react';

/**
 * Learn Microbes — Badge
 * Small letter/count/status token. The square sage "A/B/C/D" answer
 * marker, the green check, numeric step markers.
 */
export function Badge({
  children,
  variant = 'sage',
  shape = 'rounded',
  size = 'md',
  style = {},
  ...rest
}) {
  const sizes = { sm: 22, md: 30, lg: 40 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    sage: { background: 'var(--sage-400)', color: '#14342a' },
    teal: { background: 'var(--teal-600)', color: '#fff' },
    soft: { background: 'var(--brand-soft)', color: 'var(--teal-700)' },
    gold: { background: 'var(--gold-500)', color: '#fff' },
    error: { background: 'var(--error-600)', color: '#fff' },
    onDark: { background: 'rgba(255,255,255,0.14)', color: '#f6fbf8' },
  };
  const v = variants[variant] || variants.sage;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: dim,
        height: dim,
        padding: '0 0.4em',
        fontFamily: 'var(--font-sans)',
        fontSize: dim * 0.42,
        fontWeight: 900,
        lineHeight: 1,
        borderRadius: shape === 'circle' ? '50%' : 'var(--radius-sm)',
        boxSizing: 'border-box',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
