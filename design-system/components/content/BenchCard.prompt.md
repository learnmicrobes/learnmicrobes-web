The signature educational block — encodes the bench workflow (source → findings → safest next step) in one card with an accent top-rule and finding chips.

```jsx
<BenchCard
  kicker="Gram-positive · cocci"
  title="Streptococcus pyogenes"
  source="Pediatric throat swab · sore throat & fever"
  findings={["Sheep blood agar", "β-hemolytic", "GPC in chains", "Catalase-negative"]}
  nextStep="PYR or bacitracin (A-disk) to confirm Group A Strep"
  accent="gramPos"
/>
```

`findings` accept strings or `{label, accent}`. `accent` carries the bench-semantic color.
