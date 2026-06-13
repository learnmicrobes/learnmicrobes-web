import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds the calm hover rise + deeper shadow. */
  interactive?: boolean;
  /** Inner padding. */
  pad?: 'none' | 'sm' | 'md' | 'lg';
  /** Corner radius. `md` product · `lg` editorial. */
  radius?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * White rounded surface with soft shadow + teal hairline.
 * @startingPoint section="Core" subtitle="Surface card with optional hover lift" viewport="700x200"
 */
export function Card(props: CardProps): JSX.Element;
