import * as React from 'react';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** @default "dark" */
  tone?: 'dark' | 'teal' | 'sage' | 'soft' | 'outline' | 'gold' | 'onDark';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  /** Uppercase + tracked (the brand default for tags). @default true */
  uppercase?: boolean;
}

/**
 * The brand's signature rounded tag — post type, difficulty, status, URL chips.
 *
 * @startingPoint section="Core" subtitle="Pill tags & difficulty badges" viewport="700x140"
 */
export function Pill(props: PillProps): JSX.Element;
