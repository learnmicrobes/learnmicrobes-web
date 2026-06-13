import React from 'react';

/**
 * Learn Microbes — QuizOption
 * The A/B/C/D answer card. Sage letter badge + label. States:
 * default, selected, correct, incorrect.
 */
export function QuizOption({ letter, children, state = 'default', onClick, style = {}, ...rest }) {
  const states = {
    default: { border: 'var(--border-card)', bg: 'var(--surface-card)', badgeBg: 'var(--lm-sage-200)', badgeColor: 'var(--lm-sage-700)' },
    selected: { border: 'var(--color-brand)', bg: 'var(--surface-card)', badgeBg: 'var(--color-brand)', badgeColor: '#fff' },
    correct: { border: 'var(--lm-sage-500)', bg: 'var(--lm-sage-100)', badgeBg: 'var(--lm-sage-500)', badgeColor: '#fff' },
    incorrect: { border: 'var(--lm-error)', bg: '#fbf0ed', badgeBg: 'var(--lm-error)', badgeColor: '#fff' },
  };
  const s = states[state] || states.default;
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
        textAlign: 'left', width: '100%', cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.1rem',
        minHeight: 96,
        boxShadow: hover && state === 'default' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover && state === 'default' ? 'var(--lift-hover)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)',
        ...style,
      }} {...rest}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem',
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: s.badgeBg, color: s.badgeColor,
      }}>{letter}</span>
      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.35 }}>{children}</span>
    </button>
  );
}
