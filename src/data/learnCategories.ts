// Learn category helpers shared by the site nav and the Learn pages. They live here
// rather than in LearnHub.tsx so the nav does not pull the Learn pages and their
// topic data into the main bundle.

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const categoryDisplayNames: Record<string, string> = {
  'Clinical Lab Principles': 'Clinical Lab Basics',
  'Core Methods': 'Core Bench Methods',
  'Molecular and Immunodiagnostics': 'Molecular and Immunodiagnostic Tools',
  'Bench and Exam Integration': 'Bench and Exam Review'
};

export const getCategoryDisplayName = (category: string) => categoryDisplayNames[category] ?? category;
