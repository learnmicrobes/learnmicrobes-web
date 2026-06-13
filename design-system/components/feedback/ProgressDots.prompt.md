ProgressDots — a carousel / step indicator, either as a pill-dot row or the "01 / 08" numeral counter from the social slides.

```jsx
<ProgressDots total={8} current={0} variant="counter" onDark />
<ProgressDots total={5} current={2} />
```

`variant="dots"` for in-product steppers, `variant="counter"` for social carousels. Set `onDark` on deep-teal covers.
