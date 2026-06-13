Button — the primary action control; use for any CTA, form submit, or navigation action across product and marketing surfaces.

```jsx
<Button variant="primary" icon="fa-solid fa-flask">Identify</Button>
<Button variant="accent" icon="fa-solid fa-arrow-right" iconRight>Try it</Button>
<Button variant="secondary">Reset</Button>
<Button variant="ghost-dark" pill>Tag a colleague</Button>
```

Variants: `primary` (solid teal), `accent` (solid sage), `secondary` (white + teal outline), `ghost` (text-only), `ghost-dark` (on deep teal), `onDark` (white on teal). `icon` is a Font Awesome class string; `iconRight` moves it after the label. Use `pill` on marketing/social surfaces; `block` for stacked mobile buttons. Hover lifts -2px.
