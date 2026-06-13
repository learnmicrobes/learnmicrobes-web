import * as React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Controlled checked state. */
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Inline label text. */
  label?: React.ReactNode;
  disabled?: boolean;
}

/** The app's signature round checkbox — teal ring that fills teal with a white check. */
export function Checkbox(props: CheckboxProps): JSX.Element;
