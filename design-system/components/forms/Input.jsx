import React from 'react';

/**
 * Learn Microbes — Input
 * Labeled text field. Warm-white, hairline border, teal focus ring.
 * Optional leading icon and error message.
 */
export function Input({
  label,
  hint,
  error,
  icon = null,   // Font Awesome class string, e.g. "fa-solid fa-envelope"
  id,
  invalid = false,
  style = {},
  ...rest
}) {
  const isInvalid = invalid || !!error;
  const inputId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const message = error || hint;

  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-body)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: icon ? 'auto minmax(0,1fr)' : '1fr',
          alignItems: 'center',
          gap: 10,
          minHeight: 44,
          padding: icon ? '0 14px' : 0,
          background: 'var(--paper)',
          border: `1px solid ${isInvalid ? 'var(--error-600)' : 'var(--border-input)'}`,
          borderRadius: 'var(--radius-sm)',
          transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
          boxSizing: 'border-box',
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = isInvalid ? 'var(--error-600)' : 'var(--teal-500)';
          e.currentTarget.style.boxShadow = 'var(--ring)';
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = isInvalid ? 'var(--error-600)' : 'var(--border-input)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {icon && <i className={icon} aria-hidden="true" style={{ color: 'var(--teal-600)', fontSize: '0.9rem' }} />}
        <input
          id={inputId}
          style={{
            width: '100%',
            minHeight: 42,
            padding: icon ? '0' : '0 14px',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--text-body)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            ...style,
          }}
          {...rest}
        />
      </div>
      {message && (
        <span style={{ fontSize: 'var(--fs-xs)', color: isInvalid ? 'var(--error-600)' : 'var(--text-muted)' }}>{message}</span>
      )}
    </div>
  );
}
