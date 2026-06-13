import React from 'react';

export type KickerTone = 'sage' | 'teal' | 'muted' | 'onDark' | 'onDarkMuted';

export interface KickerProps extends React.HTMLAttributes<HTMLElement> {
  /** Color tone. Use `onDark` / `onDarkMuted` on green surfaces. */
  tone?: KickerTone;
  /** Element tag to render. Default 'div'. */
  as?: keyof JSX.IntrinsicElements;
}

/** Uppercase letter-spaced eyebrow label — the brand's type signature. */
export function Kicker(props: KickerProps): JSX.Element;
