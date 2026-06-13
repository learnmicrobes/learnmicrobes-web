import React from 'react';

/**
 * Learn Microbes — StatChip
 * A compact figure + label, for credibility stats ("145+ quiz reps",
 * "pure growth at 24 h"). Optional Font Awesome icon.
 */
export function StatChip({ value, label, icon, onDark = false, style = {}, ...rest }) {
  const fg = onDark ? '#f6fbf8' : 'var(--text-heading)';
  const muted = onDark ? 'var(--text-onbrand-muted)' : 'var(--text-muted)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'var(--font-ui)',
      background: onDark ? 'rgba(255,255,255,0.08)' : 'var(--surface-card)',
      border: `1px solid ${onDark ? 'var(--border-ondark)' : 'var(--border-card)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '0.8rem 1rem',
      boxShadow: onDark ? 'none' : 'var(--shadow-xs)',
      ...style,
    }} {...rest}>
      {icon && (
        <span style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: onDark ? 'rgba(255,255,255,0.12)' : 'var(--lm-sage-200)',
          color: onDark ? '#9fe3c1' : 'var(--lm-sage-700)',
        }}><i className={icon} aria-hidden="true" /></span>
      )}
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: fg, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: muted, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}
