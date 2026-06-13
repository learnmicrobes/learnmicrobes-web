import React from 'react';

/**
 * Learn Microbes — IconButton
 * Square, soft-cornered control for nav/toolbar icons (FA solid inside).
 */
export function IconButton({
  children,
  label,
  variant = 'soft',
  size = 'md',
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = { sm: 34, md: 42, lg: 48 };
  const dim = sizes[size] || sizes.md;

  const variants = {
    soft: { background: 'var(--surface-sunken)', color: 'var(--teal-600)', border: '1px solid var(--line)' },
    solid: { background: 'var(--teal-600)', color: '#fff', border: '1px solid transparent' },
    ghost: { background: 'transparent', color: 'var(--teal-600)', border: '1px solid transparent' },
    onDark: { background: 'rgba(255,255,255,0.12)', color: '#f6fbf8', border: '1px solid var(--line-on-dark)' },
  };
  const v = variants[variant] || variants.soft;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    fontSize: dim * 0.42,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur) var(--ease), background var(--dur) var(--ease)',
    ...v,
    ...style,
  };

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      style={base}
      {...rest}
    >
      {children}
    </button>
  );
}
