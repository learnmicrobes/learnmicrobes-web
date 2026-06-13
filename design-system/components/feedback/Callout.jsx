import React from 'react';

/**
 * Learn Microbes — Callout
 * The "Don't confuse it with…" / "Key reminder" inset. A calm tinted
 * block with an uppercase eyebrow and body, in the brand tones.
 */
export function Callout({
  eyebrow,
  children,
  tone = 'neutral',
  onDark = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: { bg: 'var(--surface-sunken)', border: 'var(--line)', eye: 'var(--text-muted)', text: 'var(--text-body)' },
    info: { bg: 'var(--teal-50)', border: 'rgba(36,92,105,0.18)', eye: 'var(--teal-600)', text: 'var(--text-body)' },
    success: { bg: 'rgba(79,143,103,0.1)', border: 'rgba(79,143,103,0.34)', eye: 'var(--sage-700)', text: '#14564f' },
    caution: { bg: 'rgba(201,107,75,0.1)', border: 'rgba(201,107,75,0.34)', eye: '#a14f38', text: '#7f2f1c' },
    gold: { bg: 'rgba(200,162,77,0.12)', border: 'rgba(200,162,77,0.38)', eye: '#8a6a1f', text: 'var(--text-body)' },
  };
  const darkTone = { bg: 'rgba(255,255,255,0.08)', border: 'var(--line-on-dark)', eye: 'var(--sage-400)', text: '#eaf4f0' };
  const t = onDark ? darkTone : (tones[tone] || tones.neutral);

  return (
    <div
      style={{
        padding: '14px 16px',
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <div style={{ fontSize: 'var(--fs-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', fontWeight: 800, color: t.eye, marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <div style={{ fontSize: '0.9rem', lineHeight: 1.5, color: t.text, fontWeight: 500 }}>{children}</div>
    </div>
  );
}
