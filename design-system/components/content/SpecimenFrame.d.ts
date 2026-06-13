import React from 'react';

export interface SpecimenFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. If omitted, renders `children` inside the frame. */
  src?: string;
  alt?: string;
  /** Tag in the top-left, e.g. "Specimen A". */
  label?: string;
  /** CSS aspect-ratio. Default "1 / 1". */
  ratio?: string;
}

/** Rounded white frame for educational imagery, with an optional specimen tag. */
export function SpecimenFrame(props: SpecimenFrameProps): JSX.Element;
