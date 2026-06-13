import React from 'react';

export type TagAccent = 'sage' | 'teal' | 'gramPos' | 'gramNeg' | 'anaerobe' | 'biochem' | 'caution';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Dot color — use bench-semantic accents to carry meaning. */
  accent?: TagAccent;
  /** Render on a deep-green surface (translucent white chip). */
  onDark?: boolean;
  /** Show the leading dot. Default true. */
  dot?: boolean;
}

/** White finding chip with a leading dot — the bench-evidence pill. */
export function Tag(props: TagProps): JSX.Element;
