import React from 'react';

/**
 * Learn Microbes — Checkbox
 * The app's signature round checkbox: teal ring that fills teal with a
 * white check. Used in bench test selectors and option lists.
 */
export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const boxId = id || (label ? `cb-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  return (
    <label
      htmlFor={boxId}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        fontFamily: 'var(--font-sans)',
        fontSize: '0.92rem',
        fontWeight: 500,
        color: 'var(--text-body)',
        ...style,
      }}
    >
      <span
        style={{
          position: 'relative',
          width: 22,
          height: 22,
          flexShrink: 0,
          borderRadius: '50%',
          border: `2px solid ${checked ? 'var(--teal-600)' : 'var(--teal-500)'}`,
          background: checked ? 'var(--teal-600)' : 'transparent',
          transition: 'background var(--dur) var(--ease), border-color var(--dur) var(--ease)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '0.6rem' }} aria-hidden="true" />
        )}
        <input
          id={boxId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{ position: 'absolute', inset: 0, opacity: 0, margin: 0, cursor: 'inherit' }}
          {...rest}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
