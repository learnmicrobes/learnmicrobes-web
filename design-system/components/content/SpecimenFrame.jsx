import React from 'react';

/**
 * Learn Microbes — SpecimenFrame
 * Rounded white frame around real educational imagery (agar plates,
 * microscopy) with an optional teal "Specimen A" tag.
 */
export function SpecimenFrame({ src, alt = '', label, ratio = '1 / 1', style = {}, children, ...rest }) {
  return (
    <div style={{
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 7,
      boxShadow: 'var(--shadow-card)',
      ...style,
    }} {...rest}>
      <div style={{
        position: 'relative',
        aspectRatio: ratio,
        borderRadius: 'calc(var(--radius-lg) - 5px)',
        overflow: 'hidden',
        background: 'var(--surface-sunken)',
      }}>
        {src
          ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : children}
        {label && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: 'var(--lm-teal-800)', color: '#f6fbf8',
            fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 700,
            padding: '5px 12px', borderRadius: 'var(--radius-sm)',
          }}>{label}</span>
        )}
      </div>
    </div>
  );
}
