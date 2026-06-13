import React from 'react';

export interface StatChipProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure, e.g. "145+". */
  value: React.ReactNode;
  /** Caption, e.g. "quiz reps". */
  label: React.ReactNode;
  /** Font Awesome icon class. */
  icon?: string;
  /** Style for deep-green surfaces. */
  onDark?: boolean;
}

/** Compact figure + label for credibility stats. */
export function StatChip(props: StatChipProps): JSX.Element;
