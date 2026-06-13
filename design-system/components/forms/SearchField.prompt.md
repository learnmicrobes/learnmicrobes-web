SearchField — the hero / global search box with a leading Font Awesome magnifier; the front door to Learn Microbes content.

```jsx
<SearchField label="Search Learn Microbes" value={q} onChange={e => setQ(e.target.value)} />
```

Requires Font Awesome loaded (uses `fa-magnifying-glass`). Set `glass` when it sits over the bench-photo hero so it reads as translucent blurred glass. Optional uppercase `label` eyebrow.
