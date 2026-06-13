import * as React from 'react';

export interface ProgressDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total steps / slides. */
  total: number;
  /** Zero-based current index. @default 0 */
  current?: number;
  /** "dots" = pill dot row; "counter" = "01 / 08" numerals. @default "dots" */
  variant?: 'dots' | 'counter';
  /** For deep-teal backgrounds. @default false */
  onDark?: boolean;
}

/** Carousel / step indicator — a dot row, or the "01 / 08" counter from social slides. */
export function ProgressDots(props: ProgressDotsProps): JSX.Element;
