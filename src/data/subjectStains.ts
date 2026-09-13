/**
 * Subject stains.
 *
 * Each organism group takes the color of the reagent a student actually uses for
 * it at the bench, so the color teaches as well as marks:
 *
 *   bacteriology      crystal violet          (primary stain of the Gram stain)
 *   parasitology      Lugol's iodine          (O&P wet mount)
 *   mycology          lactophenol cotton blue (fungal mount)
 *   virology          fluorescein / FITC      (DFA and IFA antigen detection)
 *   mycobacteriology  carbol fuchsin          (acid-fast stain)
 *
 * The rule that keeps this from turning into decoration: stain color means
 * *which subject*, teal means *you can tap it*. Stains appear only as a drop, a
 * count, a progress fill, a faint tint or a hairline, never as a background,
 * a heading color, or a left rail, and the text label always stays.
 *
 * Subjects that are not an organism group (foundations, methods, safety, bench
 * tests, analytic phases) get no stain on purpose.
 */
export type SubjectStain = 'bac' | 'par' | 'myc' | 'vir' | 'afb';

const stainBySubject: Record<string, SubjectStain> = {
  bacteriology: 'bac',
  parasitology: 'par',
  mycology: 'myc',
  virology: 'vir',
  mycobacteriology: 'afb'
};

// Accepts Learn category names ("Mycology"), quiz category keys ("mycology"),
// case study areas and atlas disciplines alike.
export const getSubjectStain = (subject?: string | null): SubjectStain | undefined => (
  subject ? stainBySubject[subject.trim().toLowerCase()] : undefined
);

export const subjectStainClass = (subject?: string | null): string => {
  const stain = getSubjectStain(subject);
  return stain ? `subject-stain subject-stain--${stain}` : '';
};
