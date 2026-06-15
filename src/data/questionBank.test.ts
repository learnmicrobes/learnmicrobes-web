import { describe, expect, it } from '@jest/globals';
import { questionBank } from './questionBank';
import type { QuestionBankArea, QuestionBankDifficulty, QuestionBankItem } from './questionBank';

const allowedAreaPrefixes = [
  'preanalytic-',
  'bacteriology-',
  'mycobacteriology-',
  'virology-',
  'parasitology-',
  'mycology-',
  'postanalytic-'
];

const allowedAreas: QuestionBankArea[] = [
  'preanalytic-procedures',
  'analytic-bacteriology',
  'analytic-mycobacteriology',
  'analytic-virology',
  'analytic-parasitology',
  'analytic-mycology',
  'postanalytic-procedures'
];

const allowedDifficulties: QuestionBankDifficulty[] = [
  'beginner',
  'intermediate',
  'advanced'
];

const allowedStatuses: Array<QuestionBankItem['status']> = [
  'draft',
  'reviewed',
  'published'
];

const countBy = <T extends string>(
  items: QuestionBankItem[],
  getKey: (item: QuestionBankItem) => T
) => items.reduce<Record<T, number>>((counts, item) => {
  const key = getKey(item);
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {} as Record<T, number>);

describe('questionBank authored content', () => {
  it('has a stable, valid authored question shape', () => {
    const ids = new Set<string>();
    const prompts = new Set<string>();

    questionBank.forEach((question, index) => {
      const label = `questionBank[${index}]${question.id ? ` (${question.id})` : ''}`;
      const trimmedId = question.id.trim();
      const trimmedPrompt = question.prompt.trim();
      const trimmedChoices = question.choices.map((choice) => choice.trim());
      const uniqueChoices = new Set(trimmedChoices);

      expect(trimmedId).toBeTruthy();
      expect(ids.has(trimmedId)).toBe(false);
      expect(trimmedId).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(allowedAreaPrefixes.some((prefix) => trimmedId.startsWith(prefix))).toBe(true);

      expect(allowedAreas).toContain(question.area);
      expect(allowedDifficulties).toContain(question.difficulty);
      expect(allowedStatuses).toContain(question.status);

      expect(question.topic.trim()).toBeTruthy();
      expect(trimmedPrompt).toBeTruthy();
      expect(question.source.trim()).toBeTruthy();
      expect(question.explanation.trim()).toBeTruthy();

      expect(Array.isArray(question.tags)).toBe(true);
      expect(Array.isArray(question.choices)).toBe(true);
      expect(question.choices).toHaveLength(4);
      expect(trimmedChoices.every(Boolean)).toBe(true);
      expect(uniqueChoices.size).toBe(question.choices.length);

      expect(question.answer.trim()).toBeTruthy();
      expect(question.choices).toContain(question.answer);
      expect(prompts.has(trimmedPrompt)).toBe(false);

      ids.add(trimmedId);
      prompts.add(trimmedPrompt);

      if (question.answer !== question.answer.trim()) {
        throw new Error(`${label} answer has leading or trailing whitespace.`);
      }
    });
  });

  it('reports a non-brittle question bank summary', () => {
    const summary = {
      total: questionBank.length,
      byArea: countBy(questionBank, (question) => question.area),
      byDifficulty: countBy(questionBank, (question) => question.difficulty),
      byStatus: countBy(questionBank, (question) => question.status)
    };

    expect(summary.total).toBeGreaterThan(0);
    expect(Object.values(summary.byArea).reduce((total, count) => total + count, 0)).toBe(summary.total);
    expect(Object.values(summary.byDifficulty).reduce((total, count) => total + count, 0)).toBe(summary.total);
    expect(Object.values(summary.byStatus).reduce((total, count) => total + count, 0)).toBe(summary.total);
  });
});
