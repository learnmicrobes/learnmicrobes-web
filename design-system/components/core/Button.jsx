import React from 'react';

/**
 * Learn Microbes — Button
 * The primary action control. Calm, confident, bench-practical.
 * Rounded by default (clinical UI); set `pill` for marketing surfaces.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,        // Font Awesome class string, e.g. "fa-solid fa-flask"
  iconRight = false,  // place the icon after the label
  pill = false,
  block = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 14px', height: 36, font: '0.82rem' },
    md: { padding: '0 18px', height: 44, font: '0.92rem' },
    lg: { padding: '0 24px', height: 52, font: '1rem' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary:     { background: 'var(--color-brand)', color: 'var(--text-on-brand)', border: '1px solid transparent', shadow: 'var(--shadow-sm)', hoverBg: 'var(--teal-700)' },
    accent:      { background: 'var(--lm-sage-600)', color: '#fff', border: '1px solid transparent', shadow: 'var(--shadow-sm)', hoverBg: 'var(--sage-700)' },
    secondary:   { background: 'var(--surface-card)', color: 'var(--color-brand)', border: '1px solid var(--border-input)', shadow: 'var(--shadow-sm)', hoverBg: 'var(--surface-tint)' },
    ghost:       { background: 'transparent', color: 'var(--color-brand)', border: '1px solid transparent', shadow: 'none', hoverBg: 'var(--surface-tint)' },
    'ghost-dark':{ background: 'rgba(255,255,255,0.1)', color: '#f6fbf8', border: '1px solid var(--border-ondark)', shadow: 'none', hoverBg: 'rgba(255,255,255,0.18)' },
    onDark:      { background: 'var(--surface-card)', color: 'var(--color-brand-strong)', border: '1px solid transparent', shadow: 'var(--shadow-md)', hoverBg: '#fff' },
  };
  const v = variants[variant] || variants.primary;

  const iconEl = icon ? <i className={icon} aria-hidden="true" /> : null;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'var(--hover-lift)';
        e.currentTarget.style.background = v.hoverBg;
        if (v.shadow !== 'none') e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.background = v.background;
        e.currentTarget.style.boxShadow = v.shadow;
      }}
      style={{
        display: block ? 'flex' : 'inline-flex',
        width: block ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.55rem',
        minHeight: s.height,
        height: s.height,
        padding: s.padding,
        fontFamily: 'var(--font-ui)',
        fontSize: s.font,
        fontWeight: 800,
        lineHeight: 1,
        borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        background: v.background,
        color: v.color,
        border: v.border,
        boxShadow: v.shadow,
        transition: 'transform var(--dur) var(--ease), background var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
        ...style,
      }}
      {...rest}
    >
      {!iconRight && iconEl}
      {children}
      {iconRight && iconEl}
    </button>
  );
}
