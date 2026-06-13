import React from 'react';

/**
 * Learn Microbes — Pill / Tag
 * The brand's signature rounded tag. Post types, difficulty, status, URLs.
 */
export function Pill({
  children,
  tone = 'dark',
  size = 'md',
  dot = false,
  uppercase = true,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '5px 12px', font: '0.68rem' },
    md: { padding: '7px 16px', font: '0.74rem' },
    lg: { padding: '9px 18px', font: '0.82rem' },
  };
  const s = sizes[size] || sizes.md;

  const tones = {
    dark:    { background: 'var(--lm-teal-800)', color: '#fff', border: '1px solid transparent', dotColor: 'var(--lm-sage-400)' },
    teal:    { background: 'var(--color-brand)', color: '#fff', border: '1px solid transparent', dotColor: 'var(--lm-sage-400)' },
    sage:    { background: 'var(--lm-sage-400)', color: '#14342a', border: '1px solid transparent', dotColor: '#14342a' },
    soft:    { background: 'var(--lm-sage-100)', color: 'var(--lm-sage-700)', border: '1px solid transparent', dotColor: 'var(--lm-sage-600)' },
    outline: { background: 'var(--surface-card)', color: 'var(--lm-teal-700)', border: '1px solid var(--lm-sage-200)', dotColor: 'var(--lm-sage-600)' },
    gold:    { background: 'rgba(200,162,77,0.16)', color: '#8a6a1f', border: '1px solid rgba(200,162,77,0.4)', dotColor: 'var(--gold-500)' },
    onDark:  { background: 'rgba(255,255,255,0.1)', color: '#dff0ea', border: '1px solid var(--border-ondark)', dotColor: 'var(--lm-sage-400)' },
  };
  const v = tones[tone] || tones.dark;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: s.padding,
        fontFamily: 'var(--font-ui)',
        fontSize: s.font,
        fontWeight: 800,
        letterSpacing: uppercase ? '0.08em' : '0',
        textTransform: uppercase ? 'uppercase' : 'none',
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        background: v.background,
        color: v.color,
        border: v.border,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: v.dotColor, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
