import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** @default "sage" */
  variant?: 'sage' | 'teal' | 'soft' | 'gold' | 'error' | 'onDark';
  /** @default "rounded" */
  shape?: 'rounded' | 'circle';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
}

/** Small letter / count / status token — answer markers (A·B·C·D), step numbers, checks. */
export function Badge(props: BadgeProps): JSX.Element;
