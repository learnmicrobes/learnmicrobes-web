import React from 'react';

/**
 * Learn Microbes — ProgressDots
 * Carousel / step indicator. The "01 / 08" counter pattern, or a dot row.
 */
export function ProgressDots({
  total,
  current = 0,
  variant = 'dots',
  onDark = false,
  style = {},
  ...rest
}) {
  const active = onDark ? '#f6fbf8' : 'var(--teal-600)';
  const idle = onDark ? 'rgba(255,255,255,0.32)' : 'var(--teal-200)';
  const muted = onDark ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)';

  if (variant === 'counter') {
    const pad = (n) => String(n).padStart(2, '0');
    return (
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.05rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          color: muted,
          fontVariantNumeric: 'tabular-nums',
          ...style,
        }}
        {...rest}
      >
        <span style={{ color: active }}>{pad(current + 1)}</span> / {pad(total)}
      </span>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }} {...rest}>
      {Array.from({ length: total }).map((_, i) => {
        const on = i === current;
        return (
          <span
            key={i}
            style={{
              width: on ? 22 : 8,
              height: 8,
              borderRadius: 'var(--radius-pill)',
              background: on ? active : idle,
              transition: 'width var(--dur) var(--ease), background var(--dur) var(--ease)',
            }}
          />
        );
      })}
    </div>
  );
}
