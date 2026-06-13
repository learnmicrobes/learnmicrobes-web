import React from 'react';

/**
 * Learn Microbes — SearchField
 * The hero / global search box: leading magnifier, rounded, calm.
 * Optionally translucent + blurred when it sits over photography.
 */
export function SearchField({
  value,
  onChange,
  placeholder = 'Search tests, guides, roadmaps…',
  label,
  glass = false,
  onKeyDown,
  style = {},
  ...rest
}) {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%' }}>
      {label && (
        <span style={{ fontSize: 'var(--fs-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', fontWeight: 800, color: 'var(--text-eyebrow)' }}>
          {label}
        </span>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto minmax(0, 1fr)',
          alignItems: 'center',
          gap: 12,
          minHeight: 50,
          padding: '0 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--line)',
          background: glass ? 'rgba(255,255,255,0.78)' : 'var(--paper)',
          backdropFilter: glass ? 'blur(12px)' : 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
          ...style,
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = 'var(--focus-ring)';
          e.currentTarget.style.boxShadow = 'var(--ring), var(--shadow-md)';
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
      >
        <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--teal-600)', fontSize: '0.95rem' }} aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{
            width: '100%',
            border: 0,
            outline: 0,
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.96rem',
            fontWeight: 600,
            color: 'var(--text-body)',
          }}
          {...rest}
        />
      </div>
    </div>
  );
}
