Input — a labeled single-line text field for forms (auth, feedback, profile).

```jsx
<Input label="Email" icon="fa-solid fa-envelope" placeholder="you@lab.org" />
<Input label="Password" type="password" error="Required to continue" />
```

Optional `label`, `hint`, and leading `icon` (Font Awesome class string). Pass `error` to show terracotta error styling and message. Focus shows the soft teal ring. Min height is the 44px tap target.
