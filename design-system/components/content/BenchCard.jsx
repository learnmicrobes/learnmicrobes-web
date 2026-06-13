import React from 'react';
import { Tag } from '../core/Tag.jsx';

/**
 * Learn Microbes — BenchCard
 * The signature educational block. Teaches the bench workflow:
 * source → findings → safest next step. White card, kicker source line,
 * organism title, finding chips, and an accented "next step" footer.
 */
export function BenchCard({
  kicker = 'Bench card',
  title,
  source,
  findings = [],
  nextStep,
  accent = 'sage',
  style = {},
  ...rest
}) {
  const accentColor = {
    sage: 'var(--lm-sage-500)',
    teal: 'var(--color-brand)',
    gramPos: 'var(--lm-gram-pos)',
    gramNeg: 'var(--lm-gram-neg)',
    anaerobe: 'var(--lm-anaerobe)',
    biochem: 'var(--lm-biochem)',
  }[accent] || 'var(--lm-sage-500)';

  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
      ...style,
    }} {...rest}>
      <div style={{ height: 5, background: accentColor }} />
      <div style={{ padding: 'var(--space-6)' }}>
        <div style={{ fontSize: 'var(--fs-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', color: accentColor }}>{kicker}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-heading)', margin: '6px 0 0', letterSpacing: '-0.01em' }}>{title}</h3>
        {source && <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{source}</p>}

        {findings.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'var(--space-5)' }}>
            {findings.map((f, i) => (
              <Tag key={i} accent={typeof f === 'object' ? f.accent : accent}>{typeof f === 'object' ? f.label : f}</Tag>
            ))}
          </div>
        )}

        {nextStep && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 11,
            marginTop: 'var(--space-5)', padding: '0.85rem 1rem',
            background: 'var(--surface-sunken)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: `3px solid ${accentColor}`,
          }}>
            <i className="fa-solid fa-arrow-right-long" aria-hidden="true" style={{ color: accentColor, marginTop: 3 }} />
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Safest next step</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-heading)', marginTop: 2, lineHeight: 1.4 }}>{nextStep}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
