import React from 'react';

/**
 * Learn Microbes — Tag (bench-finding chip)
 * The white chip with a leading dot used for findings:
 * "Sheep blood agar", "β-hemolytic", "GPC in chains", "Catalase-negative".
 * Optional `accent` colors the dot to carry bench meaning.
 */
export function Tag({ children, accent = 'sage', onDark = false, dot = true, style = {}, ...rest }) {
  const accents = {
    sage: 'var(--lm-sage-500)',
    teal: 'var(--color-brand)',
    gramPos: 'var(--lm-gram-pos)',
    gramNeg: 'var(--lm-gram-neg)',
    anaerobe: 'var(--lm-anaerobe)',
    biochem: 'var(--lm-biochem)',
    caution: 'var(--lm-caution)',
  };
  const surface = onDark
    ? { background: 'rgba(255,255,255,0.1)', color: '#f6fbf8', border: '1px solid var(--border-ondark)' }
    : { background: 'var(--surface-card)', color: 'var(--text-heading)', border: '1px solid var(--border-card)' };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-ui)',
      fontSize: '0.86rem',
      fontWeight: 700,
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: onDark ? 'none' : 'var(--shadow-xs)',
      ...surface, ...style,
    }} {...rest}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: accents[accent] || accents.sage, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
