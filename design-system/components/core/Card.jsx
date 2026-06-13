import React from 'react';

/**
 * Learn Microbes — Card
 * White rounded surface with a soft, low-spread shadow + teal hairline.
 * `interactive` adds the calm hover rise. `pad` controls inner padding.
 */
export function Card({ children, interactive = false, pad = 'md', radius = 'md', style = {}, ...rest }) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const radii = { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)' };

  const base = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-card)',
    borderRadius: radii[radius] || radii.md,
    boxShadow: 'var(--shadow-card)',
    padding: pads[pad] != null ? pads[pad] : pads.md,
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default',
    ...style,
  };

  const onEnter = (e) => { if (!interactive) return; e.currentTarget.style.transform = 'var(--lift-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; };
  const onLeave = (e) => { if (!interactive) return; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; };

  return (
    <div style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  );
}
