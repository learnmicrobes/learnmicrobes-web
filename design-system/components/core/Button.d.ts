import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'ghost-dark' | 'onDark';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Font Awesome class string for a leading icon, e.g. "fa-solid fa-flask". */
  icon?: string;
  /** Render the icon after the label instead of before. @default false */
  iconRight?: boolean;
  /** Fully-rounded pill shape (marketing surfaces). @default false */
  pill?: boolean;
  /** Stretch to fill the container width. @default false */
  block?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action control — calm, confident, bench-practical.
 * `primary` (teal) and `accent` (sage) are the two filled CTAs; `ghost-dark`
 * sits on deep-teal surfaces.
 *
 * @startingPoint section="Core" subtitle="Primary, accent, secondary & ghost actions" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
