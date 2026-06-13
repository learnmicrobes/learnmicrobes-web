import React from 'react';

export type BenchAccent = 'sage' | 'teal' | 'gramPos' | 'gramNeg' | 'anaerobe' | 'biochem';

export interface BenchFinding {
  label: string;
  accent?: BenchAccent;
}

export interface BenchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow label. Default "Bench card". */
  kicker?: string;
  title: string;
  /** Specimen / source line. */
  source?: string;
  /** Finding chips — strings or {label, accent}. */
  findings?: (string | BenchFinding)[];
  /** The "safest next step" footer text. */
  nextStep?: string;
  /** Accent color (top rule + chips + footer). */
  accent?: BenchAccent;
}

/**
 * The signature bench-reference card: source → findings → safest next step.
 * @startingPoint section="Content" subtitle="Bench reference card with next-step" viewport="520x420"
 */
export function BenchCard(props: BenchCardProps): JSX.Element;
