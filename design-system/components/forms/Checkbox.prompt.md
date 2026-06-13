Checkbox — the round, teal-filled checkbox used in bench test selectors and option lists.

```jsx
<Checkbox label="Catalase positive" checked={v} onChange={e => setV(e.target.checked)} />
```

Controlled via `checked` / `onChange`. Requires Font Awesome (uses `fa-check`). The circular shape is intentional and brand-specific — keep it for test/option toggles.
