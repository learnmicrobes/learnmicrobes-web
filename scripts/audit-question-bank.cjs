#!/usr/bin/env node
/*
 * Audits the Study Quiz bank for answer-length giveaways.
 *
 * A student who always picks the longest choice should score near chance
 * (25% with four choices). This reports how often the correct answer is the
 * longest choice, how often it is close behind, and where it ranks by length.
 *
 * Usage:
 *   node scripts/audit-question-bank.cjs            summary + flagged ids
 *   node scripts/audit-question-bank.cjs --area analytic-bacteriology
 *   node scripts/audit-question-bank.cjs --published
 *   node scripts/audit-question-bank.cjs --ids-only
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const args = process.argv.slice(2);
const argValue = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? null : args[index + 1];
};
const areaFilter = argValue('--area');
const publishedOnly = args.includes('--published');
const idsOnly = args.includes('--ids-only');

const sourcePath = path.join(__dirname, '..', 'src', 'data', 'questionBank.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 }
});
const sandboxModule = { exports: {} };
new Function('module', 'exports', 'require', outputText)(sandboxModule, sandboxModule.exports, require);
const allQuestions = sandboxModule.exports.questionBank;

const questions = allQuestions.filter((q) =>
  (!areaFilter || q.area === areaFilter) && (!publishedOnly || q.status === 'published')
);

const pct = (count, total) => (total ? `${((count / total) * 100).toFixed(1)}%` : '0.0%');

const analyse = (q) => {
  const answerLength = q.answer.length;
  const otherLengths = q.choices.filter((c) => c !== q.answer).map((c) => c.length);
  const longestOther = Math.max(...otherLengths);
  const longestChoice = Math.max(answerLength, longestOther);
  // Rank 1 = longest. Ties go against the answer: a tie for longest still counts as longest.
  const rank = 1 + otherLengths.filter((length) => length > answerLength).length;
  return {
    id: q.id,
    area: q.area,
    status: q.status,
    isLongest: answerLength >= longestOther,
    withinTenPercent: answerLength >= longestChoice * 0.9,
    rank
  };
};

const rows = questions.map(analyse);
const longest = rows.filter((r) => r.isLongest);

if (idsOnly) {
  longest.forEach((r) => console.log(r.id));
  process.exit(0);
}

const scope = [areaFilter && `area=${areaFilter}`, publishedOnly && 'published only']
  .filter(Boolean)
  .join(', ') || 'whole bank';

const total = rows.length;
const within = rows.filter((r) => r.withinTenPercent);
const withinNotLongest = within.filter((r) => !r.isLongest);
const rankCounts = [1, 2, 3, 4].map((rank) => rows.filter((r) => r.rank === rank).length);

console.log(`Question bank answer-length audit (${scope})`);
console.log('');
console.log(`Total questions:                        ${total}`);
console.log(`Correct answer is longest choice:       ${longest.length} (${pct(longest.length, total)})`);
console.log(`Correct answer within 10% of longest:   ${within.length} (${pct(within.length, total)})`);
console.log(`  of which not the longest:             ${withinNotLongest.length}`);
console.log('');
console.log('Correct answer rank by length (1 = longest, 25% each is chance):');
rankCounts.forEach((count, i) => console.log(`  rank ${i + 1}: ${String(count).padStart(4)} (${pct(count, total)})`));

const groupSummary = (label, getKey) => {
  const keys = [...new Set(rows.map(getKey))].sort();
  console.log('');
  console.log(`Longest-correct by ${label}:`);
  keys.forEach((key) => {
    const group = rows.filter((r) => getKey(r) === key);
    const flagged = group.filter((r) => r.isLongest).length;
    console.log(`  ${key.padEnd(28)} ${String(flagged).padStart(4)} / ${String(group.length).padEnd(4)} ${pct(flagged, group.length)}`);
  });
};
if (!areaFilter) groupSummary('area', (r) => r.area);
if (!publishedOnly) groupSummary('status', (r) => r.status);

console.log('');
console.log(`Longest-correct ids (${longest.length}):`);
longest.forEach((r) => console.log(`  ${r.id}${r.status === 'published' ? '' : ` [${r.status}]`}`));
