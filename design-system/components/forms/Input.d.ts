import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input. */
  label?: React.ReactNode;
  /** Helper text below the input. */
  hint?: React.ReactNode;
  /** Error message — sets error styling and replaces the hint. */
  error?: React.ReactNode;
  /** Font Awesome class string for a leading icon. */
  icon?: string;
  /** Force error styling without a message. @default false */
  invalid?: boolean;
}

/** Labeled text field — warm-white, hairline border, teal focus ring, optional leading icon + error. */
export function Input(props: InputProps): JSX.Element;
