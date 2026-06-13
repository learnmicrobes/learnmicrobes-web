import React from 'react';

export type QuizOptionState = 'default' | 'selected' | 'correct' | 'incorrect';

export interface QuizOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Option letter, e.g. "A". */
  letter: string;
  /** Answer / selection state. */
  state?: QuizOptionState;
}

/**
 * A/B/C/D answer card for pop-quiz posts and the practice tool.
 * @startingPoint section="Content" subtitle="A/B/C/D quiz answer card" viewport="700x180"
 */
export function QuizOption(props: QuizOptionProps): JSX.Element;
