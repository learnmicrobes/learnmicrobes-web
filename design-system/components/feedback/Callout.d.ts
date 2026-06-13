import * as React from 'react';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase kicker (e.g. "Don't confuse it with", "Key reminder"). */
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: 'neutral' | 'info' | 'success' | 'caution' | 'gold';
  /** Render for placement on a deep-teal background. @default false */
  onDark?: boolean;
}

/**
 * Tinted inset block — bench reminders, "don't confuse it with" traps, tips.
 *
 * @startingPoint section="Feedback" subtitle="Bench reminder / trap callout" viewport="700x150"
 */
export function Callout(props: CalloutProps): JSX.Element;
