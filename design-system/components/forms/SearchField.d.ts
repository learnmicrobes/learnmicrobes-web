import * as React from 'react';

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** @default "Search tests, guides, roadmaps…" */
  placeholder?: string;
  /** Uppercase eyebrow label above the field. */
  label?: React.ReactNode;
  /** Translucent + blurred, for use over photography. @default false */
  glass?: boolean;
}

/**
 * Global / hero search box — leading magnifier, rounded, calm; optional glass over imagery.
 *
 * @startingPoint section="Forms" subtitle="Hero / global search field" viewport="560x110"
 */
export function SearchField(props: SearchFieldProps): JSX.Element;
