import * as React from 'react';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon node (a Font Awesome <i className="fa-solid fa-…" />). */
  children?: React.ReactNode;
  /** Accessible label (required for icon-only controls). */
  label: string;
  /** @default "soft" */
  variant?: 'soft' | 'solid' | 'ghost' | 'onDark';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/** Square, soft-cornered icon control for nav bars, toolbars and card actions. */
export function IconButton(props: IconButtonProps): JSX.Element;
