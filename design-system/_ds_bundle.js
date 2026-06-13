/* @ds-bundle: {"format":3,"namespace":"LearnMicrobesDesignSystem_92bf69","components":[{"name":"BenchCard","sourcePath":"components/content/BenchCard.jsx"},{"name":"QuizOption","sourcePath":"components/content/QuizOption.jsx"},{"name":"SpecimenFrame","sourcePath":"components/content/SpecimenFrame.jsx"},{"name":"StatChip","sourcePath":"components/content/StatChip.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"ProgressDots","sourcePath":"components/feedback/ProgressDots.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"}],"sourceHashes":{"components/content/BenchCard.jsx":"5b84e773164c","components/content/QuizOption.jsx":"611df6da7bfc","components/content/SpecimenFrame.jsx":"f82cbff4fdf1","components/content/StatChip.jsx":"dc44fa88a5d5","components/core/Badge.jsx":"18bd364c4ee9","components/core/Button.jsx":"2bfdf690735c","components/core/Card.jsx":"cda224350116","components/core/IconButton.jsx":"934f54f4e5c0","components/core/Kicker.jsx":"b1508cb2355f","components/core/Pill.jsx":"03debb4be47f","components/core/Tag.jsx":"e85c12ce7993","components/feedback/Callout.jsx":"5f2ec278f04b","components/feedback/ProgressDots.jsx":"75303da53ca0","components/forms/Checkbox.jsx":"b11583bad654","components/forms/Input.jsx":"906f6263db44","components/forms/SearchField.jsx":"b5ab380aecea","ui_kits/social/SocialPosts.jsx":"c1805f9f4ca6","ui_kits/web_app/HomeScreen.jsx":"74203b5ffe1f","ui_kits/web_app/LearnScreen.jsx":"ba8fd4c5d880","ui_kits/web_app/NavBar.jsx":"2d00a7cf727f","ui_kits/web_app/PracticeScreen.jsx":"6337c17dc700","ui_kits/web_app/ToolsScreen.jsx":"f24be1734078"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LearnMicrobesDesignSystem_92bf69 = window.LearnMicrobesDesignSystem_92bf69 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/QuizOption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — QuizOption
 * The A/B/C/D answer card. Sage letter badge + label. States:
 * default, selected, correct, incorrect.
 */
function QuizOption({
  letter,
  children,
  state = 'default',
  onClick,
  style = {},
  ...rest
}) {
  const states = {
    default: {
      border: 'var(--border-card)',
      bg: 'var(--surface-card)',
      badgeBg: 'var(--lm-sage-200)',
      badgeColor: 'var(--lm-sage-700)'
    },
    selected: {
      border: 'var(--color-brand)',
      bg: 'var(--surface-card)',
      badgeBg: 'var(--color-brand)',
      badgeColor: '#fff'
    },
    correct: {
      border: 'var(--lm-sage-500)',
      bg: 'var(--lm-sage-100)',
      badgeBg: 'var(--lm-sage-500)',
      badgeColor: '#fff'
    },
    incorrect: {
      border: 'var(--lm-error)',
      bg: '#fbf0ed',
      badgeBg: 'var(--lm-error)',
      badgeColor: '#fff'
    }
  };
  const s = states[state] || states.default;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-start',
      textAlign: 'left',
      width: '100%',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      background: s.bg,
      border: `1.5px solid ${s.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '1rem 1.1rem',
      minHeight: 96,
      boxShadow: hover && state === 'default' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover && state === 'default' ? 'var(--lift-hover)' : 'none',
      transition: 'all var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.05rem',
      width: 30,
      height: 30,
      borderRadius: 8,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: s.badgeBg,
      color: s.badgeColor
    }
  }, letter), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: 'var(--text-heading)',
      lineHeight: 1.35
    }
  }, children));
}
Object.assign(__ds_scope, { QuizOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/QuizOption.jsx", error: String((e && e.message) || e) }); }

// components/content/SpecimenFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — SpecimenFrame
 * Rounded white frame around real educational imagery (agar plates,
 * microscopy) with an optional teal "Specimen A" tag.
 */
function SpecimenFrame({
  src,
  alt = '',
  label,
  ratio = '1 / 1',
  style = {},
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 7,
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: 'calc(var(--radius-lg) - 5px)',
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : children, label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      background: 'var(--lm-teal-800)',
      color: '#f6fbf8',
      fontFamily: 'var(--font-ui)',
      fontSize: '0.8rem',
      fontWeight: 700,
      padding: '5px 12px',
      borderRadius: 'var(--radius-sm)'
    }
  }, label)));
}
Object.assign(__ds_scope, { SpecimenFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SpecimenFrame.jsx", error: String((e && e.message) || e) }); }

// components/content/StatChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — StatChip
 * A compact figure + label, for credibility stats ("145+ quiz reps",
 * "pure growth at 24 h"). Optional Font Awesome icon.
 */
function StatChip({
  value,
  label,
  icon,
  onDark = false,
  style = {},
  ...rest
}) {
  const fg = onDark ? '#f6fbf8' : 'var(--text-heading)';
  const muted = onDark ? 'var(--text-onbrand-muted)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-ui)',
      background: onDark ? 'rgba(255,255,255,0.08)' : 'var(--surface-card)',
      border: `1px solid ${onDark ? 'var(--border-ondark)' : 'var(--border-card)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '0.8rem 1rem',
      boxShadow: onDark ? 'none' : 'var(--shadow-xs)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: onDark ? 'rgba(255,255,255,0.12)' : 'var(--lm-sage-200)',
      color: onDark ? '#9fe3c1' : 'var(--lm-sage-700)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.3rem',
      color: fg,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      fontWeight: 600,
      color: muted,
      marginTop: 3
    }
  }, label)));
}
Object.assign(__ds_scope, { StatChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Badge
 * Small letter/count/status token. The square sage "A/B/C/D" answer
 * marker, the green check, numeric step markers.
 */
function Badge({
  children,
  variant = 'sage',
  shape = 'rounded',
  size = 'md',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 22,
    md: 30,
    lg: 40
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    sage: {
      background: 'var(--sage-400)',
      color: '#14342a'
    },
    teal: {
      background: 'var(--teal-600)',
      color: '#fff'
    },
    soft: {
      background: 'var(--brand-soft)',
      color: 'var(--teal-700)'
    },
    gold: {
      background: 'var(--gold-500)',
      color: '#fff'
    },
    error: {
      background: 'var(--error-600)',
      color: '#fff'
    },
    onDark: {
      background: 'rgba(255,255,255,0.14)',
      color: '#f6fbf8'
    }
  };
  const v = variants[variant] || variants.sage;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: dim,
      height: dim,
      padding: '0 0.4em',
      fontFamily: 'var(--font-sans)',
      fontSize: dim * 0.42,
      fontWeight: 900,
      lineHeight: 1,
      borderRadius: shape === 'circle' ? '50%' : 'var(--radius-sm)',
      boxSizing: 'border-box',
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Button
 * The primary action control. Calm, confident, bench-practical.
 * Rounded by default (clinical UI); set `pill` for marketing surfaces.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  // Font Awesome class string, e.g. "fa-solid fa-flask"
  iconRight = false,
  // place the icon after the label
  pill = false,
  block = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 36,
      font: '0.82rem'
    },
    md: {
      padding: '0 18px',
      height: 44,
      font: '0.92rem'
    },
    lg: {
      padding: '0 24px',
      height: 52,
      font: '1rem'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--color-brand)',
      color: 'var(--text-on-brand)',
      border: '1px solid transparent',
      shadow: 'var(--shadow-sm)',
      hoverBg: 'var(--teal-700)'
    },
    accent: {
      background: 'var(--lm-sage-600)',
      color: '#fff',
      border: '1px solid transparent',
      shadow: 'var(--shadow-sm)',
      hoverBg: 'var(--sage-700)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--color-brand)',
      border: '1px solid var(--border-input)',
      shadow: 'var(--shadow-sm)',
      hoverBg: 'var(--surface-tint)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-brand)',
      border: '1px solid transparent',
      shadow: 'none',
      hoverBg: 'var(--surface-tint)'
    },
    'ghost-dark': {
      background: 'rgba(255,255,255,0.1)',
      color: '#f6fbf8',
      border: '1px solid var(--border-ondark)',
      shadow: 'none',
      hoverBg: 'rgba(255,255,255,0.18)'
    },
    onDark: {
      background: 'var(--surface-card)',
      color: 'var(--color-brand-strong)',
      border: '1px solid transparent',
      shadow: 'var(--shadow-md)',
      hoverBg: '#fff'
    }
  };
  const v = variants[variant] || variants.primary;
  const iconEl = icon ? /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  }) : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: e => {
      if (disabled) return;
      e.currentTarget.style.transform = 'var(--hover-lift)';
      e.currentTarget.style.background = v.hoverBg;
      if (v.shadow !== 'none') e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      if (disabled) return;
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.background = v.background;
      e.currentTarget.style.boxShadow = v.shadow;
    },
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.55rem',
      minHeight: s.height,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 800,
      lineHeight: 1,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      background: v.background,
      color: v.color,
      border: v.border,
      boxShadow: v.shadow,
      transition: 'transform var(--dur) var(--ease), background var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      ...style
    }
  }, rest), !iconRight && iconEl, children, iconRight && iconEl);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Card
 * White rounded surface with a soft, low-spread shadow + teal hairline.
 * `interactive` adds the calm hover rise. `pad` controls inner padding.
 */
function Card({
  children,
  interactive = false,
  pad = 'md',
  radius = 'md',
  style = {},
  ...rest
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const radii = {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)'
  };
  const base = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-card)',
    borderRadius: radii[radius] || radii.md,
    boxShadow: 'var(--shadow-card)',
    padding: pads[pad] != null ? pads[pad] : pads.md,
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    cursor: interactive ? 'pointer' : 'default',
    ...style
  };
  const onEnter = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'var(--lift-hover)';
    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
  };
  const onLeave = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — IconButton
 * Square, soft-cornered control for nav/toolbar icons (FA solid inside).
 */
function IconButton({
  children,
  label,
  variant = 'soft',
  size = 'md',
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 34,
    md: 42,
    lg: 48
  };
  const dim = sizes[size] || sizes.md;
  const variants = {
    soft: {
      background: 'var(--surface-sunken)',
      color: 'var(--teal-600)',
      border: '1px solid var(--line)'
    },
    solid: {
      background: 'var(--teal-600)',
      color: '#fff',
      border: '1px solid transparent'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--teal-600)',
      border: '1px solid transparent'
    },
    onDark: {
      background: 'rgba(255,255,255,0.12)',
      color: '#f6fbf8',
      border: '1px solid var(--line-on-dark)'
    }
  };
  const v = variants[variant] || variants.soft;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    fontSize: dim * 0.42,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur) var(--ease), background var(--dur) var(--ease)',
    ...v,
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Kicker
 * The uppercase, letter-spaced eyebrow label. The brand's type signature.
 */
function Kicker({
  children,
  tone = 'sage',
  as = 'div',
  style = {},
  ...rest
}) {
  const colors = {
    sage: 'var(--lm-sage-600)',
    teal: 'var(--text-brand)',
    muted: 'var(--text-muted)',
    onDark: 'var(--lm-sage-400)',
    onDarkMuted: 'var(--text-onbrand-muted)'
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-label)',
      color: colors[tone] || colors.sage,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Pill / Tag
 * The brand's signature rounded tag. Post types, difficulty, status, URLs.
 */
function Pill({
  children,
  tone = 'dark',
  size = 'md',
  dot = false,
  uppercase = true,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '5px 12px',
      font: '0.68rem'
    },
    md: {
      padding: '7px 16px',
      font: '0.74rem'
    },
    lg: {
      padding: '9px 18px',
      font: '0.82rem'
    }
  };
  const s = sizes[size] || sizes.md;
  const tones = {
    dark: {
      background: 'var(--lm-teal-800)',
      color: '#fff',
      border: '1px solid transparent',
      dotColor: 'var(--lm-sage-400)'
    },
    teal: {
      background: 'var(--color-brand)',
      color: '#fff',
      border: '1px solid transparent',
      dotColor: 'var(--lm-sage-400)'
    },
    sage: {
      background: 'var(--lm-sage-400)',
      color: '#14342a',
      border: '1px solid transparent',
      dotColor: '#14342a'
    },
    soft: {
      background: 'var(--lm-sage-100)',
      color: 'var(--lm-sage-700)',
      border: '1px solid transparent',
      dotColor: 'var(--lm-sage-600)'
    },
    outline: {
      background: 'var(--surface-card)',
      color: 'var(--lm-teal-700)',
      border: '1px solid var(--lm-sage-200)',
      dotColor: 'var(--lm-sage-600)'
    },
    gold: {
      background: 'rgba(200,162,77,0.16)',
      color: '#8a6a1f',
      border: '1px solid rgba(200,162,77,0.4)',
      dotColor: 'var(--gold-500)'
    },
    onDark: {
      background: 'rgba(255,255,255,0.1)',
      color: '#dff0ea',
      border: '1px solid var(--border-ondark)',
      dotColor: 'var(--lm-sage-400)'
    }
  };
  const v = tones[tone] || tones.dark;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      padding: s.padding,
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      fontWeight: 800,
      letterSpacing: uppercase ? '0.08em' : '0',
      textTransform: uppercase ? 'uppercase' : 'none',
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      background: v.background,
      color: v.color,
      border: v.border,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: v.dotColor,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Tag (bench-finding chip)
 * The white chip with a leading dot used for findings:
 * "Sheep blood agar", "β-hemolytic", "GPC in chains", "Catalase-negative".
 * Optional `accent` colors the dot to carry bench meaning.
 */
function Tag({
  children,
  accent = 'sage',
  onDark = false,
  dot = true,
  style = {},
  ...rest
}) {
  const accents = {
    sage: 'var(--lm-sage-500)',
    teal: 'var(--color-brand)',
    gramPos: 'var(--lm-gram-pos)',
    gramNeg: 'var(--lm-gram-neg)',
    anaerobe: 'var(--lm-anaerobe)',
    biochem: 'var(--lm-biochem)',
    caution: 'var(--lm-caution)'
  };
  const surface = onDark ? {
    background: 'rgba(255,255,255,0.1)',
    color: '#f6fbf8',
    border: '1px solid var(--border-ondark)'
  } : {
    background: 'var(--surface-card)',
    color: 'var(--text-heading)',
    border: '1px solid var(--border-card)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-ui)',
      fontSize: '0.86rem',
      fontWeight: 700,
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: onDark ? 'none' : 'var(--shadow-xs)',
      ...surface,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: accents[accent] || accents.sage,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/BenchCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — BenchCard
 * The signature educational block. Teaches the bench workflow:
 * source → findings → safest next step. White card, kicker source line,
 * organism title, finding chips, and an accented "next step" footer.
 */
function BenchCard({
  kicker = 'Bench card',
  title,
  source,
  findings = [],
  nextStep,
  accent = 'sage',
  style = {},
  ...rest
}) {
  const accentColor = {
    sage: 'var(--lm-sage-500)',
    teal: 'var(--color-brand)',
    gramPos: 'var(--lm-gram-pos)',
    gramNeg: 'var(--lm-gram-neg)',
    anaerobe: 'var(--lm-anaerobe)',
    biochem: 'var(--lm-biochem)'
  }[accent] || 'var(--lm-sage-500)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: accentColor
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-label)',
      color: accentColor
    }
  }, kicker), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.4rem',
      color: 'var(--text-heading)',
      margin: '6px 0 0',
      letterSpacing: '-0.01em'
    }
  }, title), source && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, source), findings.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 'var(--space-5)'
    }
  }, findings.map((f, i) => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: i,
    accent: typeof f === 'object' ? f.accent : accent
  }, typeof f === 'object' ? f.label : f))), nextStep && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      marginTop: 'var(--space-5)',
      padding: '0.85rem 1rem',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-sm)',
      borderLeft: `3px solid ${accentColor}`
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-right-long",
    "aria-hidden": "true",
    style: {
      color: accentColor,
      marginTop: 3
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--text-muted)'
    }
  }, "Safest next step"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 600,
      color: 'var(--text-heading)',
      marginTop: 2,
      lineHeight: 1.4
    }
  }, nextStep)))));
}
Object.assign(__ds_scope, { BenchCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/BenchCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Callout
 * The "Don't confuse it with…" / "Key reminder" inset. A calm tinted
 * block with an uppercase eyebrow and body, in the brand tones.
 */
function Callout({
  eyebrow,
  children,
  tone = 'neutral',
  onDark = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      bg: 'var(--surface-sunken)',
      border: 'var(--line)',
      eye: 'var(--text-muted)',
      text: 'var(--text-body)'
    },
    info: {
      bg: 'var(--teal-50)',
      border: 'rgba(36,92,105,0.18)',
      eye: 'var(--teal-600)',
      text: 'var(--text-body)'
    },
    success: {
      bg: 'rgba(79,143,103,0.1)',
      border: 'rgba(79,143,103,0.34)',
      eye: 'var(--sage-700)',
      text: '#14564f'
    },
    caution: {
      bg: 'rgba(201,107,75,0.1)',
      border: 'rgba(201,107,75,0.34)',
      eye: '#a14f38',
      text: '#7f2f1c'
    },
    gold: {
      bg: 'rgba(200,162,77,0.12)',
      border: 'rgba(200,162,77,0.38)',
      eye: '#8a6a1f',
      text: 'var(--text-body)'
    }
  };
  const darkTone = {
    bg: 'rgba(255,255,255,0.08)',
    border: 'var(--line-on-dark)',
    eye: 'var(--sage-400)',
    text: '#eaf4f0'
  };
  const t = onDark ? darkTone : tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '14px 16px',
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)',
      fontWeight: 800,
      color: t.eye,
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.9rem',
      lineHeight: 1.5,
      color: t.text,
      fontWeight: 500
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — ProgressDots
 * Carousel / step indicator. The "01 / 08" counter pattern, or a dot row.
 */
function ProgressDots({
  total,
  current = 0,
  variant = 'dots',
  onDark = false,
  style = {},
  ...rest
}) {
  const active = onDark ? '#f6fbf8' : 'var(--teal-600)';
  const idle = onDark ? 'rgba(255,255,255,0.32)' : 'var(--teal-200)';
  const muted = onDark ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)';
  if (variant === 'counter') {
    const pad = n => String(n).padStart(2, '0');
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: '1.05rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        color: muted,
        fontVariantNumeric: 'tabular-nums',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        color: active
      }
    }, pad(current + 1)), " / ", pad(total));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      ...style
    }
  }, rest), Array.from({
    length: total
  }).map((_, i) => {
    const on = i === current;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: on ? 22 : 8,
        height: 8,
        borderRadius: 'var(--radius-pill)',
        background: on ? active : idle,
        transition: 'width var(--dur) var(--ease), background var(--dur) var(--ease)'
      }
    });
  }));
}
Object.assign(__ds_scope, { ProgressDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressDots.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Checkbox
 * The app's signature round checkbox: teal ring that fills teal with a
 * white check. Used in bench test selectors and option lists.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const boxId = id || (label ? `cb-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: '0.92rem',
      fontWeight: 500,
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 22,
      height: 22,
      flexShrink: 0,
      borderRadius: '50%',
      border: `2px solid ${checked ? 'var(--teal-600)' : 'var(--teal-500)'}`,
      background: checked ? 'var(--teal-600)' : 'transparent',
      transition: 'background var(--dur) var(--ease), border-color var(--dur) var(--ease)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-check",
    style: {
      color: '#fff',
      fontSize: '0.6rem'
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: boxId,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }, rest))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — Input
 * Labeled text field. Warm-white, hairline border, teal focus ring.
 * Optional leading icon and error message.
 */
function Input({
  label,
  hint,
  error,
  icon = null,
  // Font Awesome class string, e.g. "fa-solid fa-envelope"
  id,
  invalid = false,
  style = {},
  ...rest
}) {
  const isInvalid = invalid || !!error;
  const inputId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const message = error || hint;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 700,
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: icon ? 'auto minmax(0,1fr)' : '1fr',
      alignItems: 'center',
      gap: 10,
      minHeight: 44,
      padding: icon ? '0 14px' : 0,
      background: 'var(--paper)',
      border: `1px solid ${isInvalid ? 'var(--error-600)' : 'var(--border-input)'}`,
      borderRadius: 'var(--radius-sm)',
      transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      boxSizing: 'border-box'
    },
    onFocusCapture: e => {
      e.currentTarget.style.borderColor = isInvalid ? 'var(--error-600)' : 'var(--teal-500)';
      e.currentTarget.style.boxShadow = 'var(--ring)';
    },
    onBlurCapture: e => {
      e.currentTarget.style.borderColor = isInvalid ? 'var(--error-600)' : 'var(--border-input)';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true",
    style: {
      color: 'var(--teal-600)',
      fontSize: '0.9rem'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      width: '100%',
      minHeight: 42,
      padding: icon ? '0' : '0 14px',
      fontFamily: 'var(--font-ui)',
      fontSize: '0.95rem',
      fontWeight: 500,
      color: 'var(--text-body)',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, rest))), message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: isInvalid ? 'var(--error-600)' : 'var(--text-muted)'
    }
  }, message));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Learn Microbes — SearchField
 * The hero / global search box: leading magnifier, rounded, calm.
 * Optionally translucent + blurred when it sits over photography.
 */
function SearchField({
  value,
  onChange,
  placeholder = 'Search tests, guides, roadmaps…',
  label,
  glass = false,
  onKeyDown,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-eyebrow)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow)',
      fontWeight: 800,
      color: 'var(--text-eyebrow)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      alignItems: 'center',
      gap: 12,
      minHeight: 50,
      padding: '0 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--line)',
      background: glass ? 'rgba(255,255,255,0.78)' : 'var(--paper)',
      backdropFilter: glass ? 'blur(12px)' : 'none',
      boxShadow: 'var(--shadow-sm)',
      transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
      ...style
    },
    onFocusCapture: e => {
      e.currentTarget.style.borderColor = 'var(--focus-ring)';
      e.currentTarget.style.boxShadow = 'var(--ring), var(--shadow-md)';
    },
    onBlurCapture: e => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-magnifying-glass",
    style: {
      color: 'var(--teal-600)',
      fontSize: '0.95rem'
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    value: value,
    onChange: onChange,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    style: {
      width: '100%',
      border: 0,
      outline: 0,
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.96rem',
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, rest))));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/SocialPosts.jsx
try { (() => {
/* global React */
// Learn Microbes — social & educational post templates.
// Square (1080) and 4:5 (1080×1350) canvases built from the design system.
const LMDS_SOCIAL = window.LearnMicrobesDesignSystem_92bf69;

// --- shared bits -------------------------------------------------------
function DotGrid({
  color = 'var(--lm-teal-400)',
  opacity = 0.45
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 7px)',
      gap: 12
    }
  }, Array.from({
    length: 16
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: color,
      opacity
    }
  })));
}
function BrandRow({
  onDark = false
}) {
  const sub = onDark ? 'rgba(244,239,228,0.7)' : 'var(--text-muted)';
  const name = onDark ? '#f6fbf8' : 'var(--text-heading)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: onDark ? '../../assets/brand-mark-flask.svg' : '../../assets/brand-mark.svg',
    width: "56",
    height: "56",
    alt: "",
    style: {
      borderRadius: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.45rem',
      color: name
    }
  }, "Learn Microbes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.66rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: sub,
      marginTop: 4
    }
  }, "Clinical Bench Reference")));
}

// --- 01 · Cover (deep teal, 4:5) --------------------------------------
function CoverSlide() {
  const {
    Kicker,
    Pill,
    ProgressDots
  } = LMDS_SOCIAL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 432,
      height: 540,
      background: 'var(--lm-teal-700)',
      borderRadius: 14,
      padding: '28px 30px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BrandRow, {
    onDark: true
  }), /*#__PURE__*/React.createElement(ProgressDots, {
    total: 8,
    current: 0,
    variant: "counter",
    onDark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      right: 30,
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onDark",
    style: {
      marginBottom: 14
    }
  }, "One year of building"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      color: '#f6fbf8',
      margin: '0 0 16px'
    }
  }, "It started as one free calculator. Now it's a whole bench."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(244,239,228,0.82)',
      fontSize: '0.98rem',
      lineHeight: 1.5,
      margin: 0,
      maxWidth: 340
    }
  }, "Visual bench cards, branching ID roadmaps, ASCP review, and 145+ quiz reps \u2014 built by a working micro lab tech, free to use.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "onDark",
    dot: true,
    uppercase: false
  }, "LearnMicrobes.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#f6fbf8',
      fontWeight: 800,
      fontSize: '0.92rem'
    }
  }, "Swipe\xA0\u2192")));
}

// --- 02 · Pop-quiz question (cream, square) ---------------------------
function QuizQuestionSlide() {
  const {
    Kicker,
    Pill,
    QuizOption
  } = LMDS_SOCIAL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 480,
      height: 480,
      background: 'var(--cream-150)',
      borderRadius: 14,
      padding: '26px 30px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BrandRow, null), /*#__PURE__*/React.createElement(Pill, {
    tone: "dark"
  }, "Pop quiz")), /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage",
    style: {
      margin: '20px 0 8px'
    }
  }, "Question"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.85rem',
      lineHeight: 1.12,
      letterSpacing: '-0.015em',
      color: 'var(--text-heading)',
      margin: '0 0 18px'
    }
  }, "TSI shows a yellow slant, yellow butt, and cracked agar. What does the crack tell you?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 'auto'
    }
  }, ['H₂S production', 'Gas production', 'Lactose fermentation', 'Contamination'].map((o, i) => /*#__PURE__*/React.createElement(QuizOption, {
    key: i,
    letter: 'ABCD'[i],
    style: {
      minHeight: 78
    }
  }, o))));
}

// --- 03 · Pop-quiz answer (deep teal, square) -------------------------
function QuizAnswerSlide() {
  const {
    Pill,
    Badge,
    Callout
  } = LMDS_SOCIAL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 480,
      height: 480,
      background: 'var(--lm-teal-700)',
      borderRadius: 14,
      padding: '26px 30px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BrandRow, {
    onDark: true
  }), /*#__PURE__*/React.createElement(Pill, {
    tone: "sage"
  }, "Answer")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      margin: '26px 0 16px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "sage",
    size: "lg",
    style: {
      width: 52,
      height: 52,
      fontSize: 24
    }
  }, "B"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.3rem',
      color: '#f6fbf8'
    }
  }, "Gas production")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(244,239,228,0.85)',
      fontSize: '1rem',
      lineHeight: 1.5,
      margin: '0 0 18px'
    }
  }, "Cracks, splits, or bubbles in the agar mean the organism made enough CO\u2082 / H\u2082 to fracture the medium \u2014 classic for ", /*#__PURE__*/React.createElement("em", null, "E. coli"), " and many coliforms."), /*#__PURE__*/React.createElement(Callout, {
    eyebrow: "Don't confuse it with",
    onDark: true,
    style: {
      marginTop: 'auto'
    }
  }, "H\u2082S \u2014 that's the black precipitate along the stab, not a crack."));
}

// --- 04 · Name this isolate (challenge, square) -----------------------
function ChallengeSlide() {
  const {
    Pill,
    Kicker,
    SpecimenFrame
  } = LMDS_SOCIAL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 480,
      height: 480,
      background: 'var(--cream-150)',
      borderRadius: 14,
      padding: '24px 28px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 26,
      right: 28
    }
  }, /*#__PURE__*/React.createElement(DotGrid, null)), /*#__PURE__*/React.createElement(BrandRow, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      margin: '16px 0 10px'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "dark"
  }, "Micro challenge #06"), /*#__PURE__*/React.createElement(Pill, {
    tone: "sage"
  }, "Intermediate")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.1rem',
      letterSpacing: '-0.02em',
      color: 'var(--text-heading)',
      margin: '0 0 4px'
    }
  }, "Name this isolate."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.92rem',
      margin: '0 0 12px'
    }
  }, "Pediatric throat swab \xB7 sore throat & fever, 3 days \xB7 pure growth at 24 h"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12
    }
  }, ['Sheep blood agar', 'β-hemolytic', 'GPC in chains', 'Catalase-negative'].map(c => /*#__PURE__*/React.createElement(LMDS_SOCIAL.Tag, {
    key: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(SpecimenFrame, {
    label: "Specimen A",
    ratio: "16 / 9",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 45% 40%, #8d2424, #3a0f0f 75%)',
      color: '#f0cccc',
      fontSize: 13,
      fontWeight: 600
    }
  }, "blood agar plate"))));
}

// --- 05 · CTA (deep teal, 4:5) ----------------------------------------
function CTASlide() {
  const {
    Kicker,
    Pill,
    Button
  } = LMDS_SOCIAL;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 432,
      height: 540,
      background: 'var(--lm-teal-700)',
      borderRadius: 14,
      padding: '28px 30px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(BrandRow, {
    onDark: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(244,239,228,0.6)',
      fontWeight: 800,
      fontSize: '1rem',
      letterSpacing: '0.04em'
    }
  }, "08 / 08")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onDark",
    style: {
      marginBottom: 12
    }
  }, "Free to start"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.8rem',
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      color: '#f6fbf8',
      margin: '0 0 14px'
    }
  }, "Start free. Learn the patterns."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(244,239,228,0.82)',
      fontSize: '0.98rem',
      lineHeight: 1.5,
      margin: '0 0 20px',
      maxWidth: 340
    }
  }, "New to micro or prepping for the boards, start anywhere. If a tool would help your bench, message me and I'll build it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    pill: true
  }, "Try it"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost-dark",
    pill: true
  }, "Save this post"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost-dark",
    pill: true
  }, "Tag a colleague"))), /*#__PURE__*/React.createElement(Pill, {
    tone: "onDark",
    dot: true,
    uppercase: false
  }, "LearnMicrobes.com"));
}
function SocialKit() {
  const posts = [{
    label: '01 · Cover (4:5)',
    el: /*#__PURE__*/React.createElement(CoverSlide, null)
  }, {
    label: '02 · Pop quiz — question (1:1)',
    el: /*#__PURE__*/React.createElement(QuizQuestionSlide, null)
  }, {
    label: '03 · Pop quiz — answer (1:1)',
    el: /*#__PURE__*/React.createElement(QuizAnswerSlide, null)
  }, {
    label: '04 · Name this isolate (1:1)',
    el: /*#__PURE__*/React.createElement(ChallengeSlide, null)
  }, {
    label: '08 · CTA (4:5)',
    el: /*#__PURE__*/React.createElement(CTASlide, null)
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '28px 24px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-brand)'
    }
  }, "Educational & social"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.9rem',
      color: 'var(--text-heading)',
      margin: '6px 0 0',
      letterSpacing: '-0.015em'
    }
  }, "Post templates"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.95rem',
      margin: '6px 0 0',
      maxWidth: 640
    }
  }, "Carousel covers, pop-quiz question/answer pairs, bench challenges, and CTAs \u2014 the recurring Learn Microbes social formats, built from the same components as the product.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 26,
      alignItems: 'flex-start'
    }
  }, posts.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.label
  }, p.el, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      marginTop: 10
    }
  }, p.label)))));
}
Object.assign(window, {
  SocialKit
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/SocialPosts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/HomeScreen.jsx
try { (() => {
/* global React */
// Learn Microbes — Home dashboard
const LMDS_HOME = window.LearnMicrobesDesignSystem_92bf69;
function HomeScreen({
  onNav
}) {
  const {
    Kicker,
    Button,
    SearchField,
    Pill,
    BenchCard,
    StatChip
  } = LMDS_HOME;
  const actions = [{
    label: 'Learn from scratch',
    detail: 'Start with the beginner microbiology path.',
    icon: 'fa-solid fa-graduation-cap'
  }, {
    label: 'Identify an unknown',
    detail: 'Use Gram stain, colony clues, and branch tests.',
    icon: 'fa-solid fa-microscope'
  }, {
    label: 'Review biochemical tests',
    detail: 'Look up reactions, QC, and interpretation traps.',
    icon: 'fa-solid fa-flask'
  }, {
    label: 'Study for M(ASCP) / SM(ASCP)',
    detail: 'Run an ASCP review loop: paths, quizzes, visuals.',
    icon: 'fa-solid fa-book'
  }, {
    label: 'Look up a visual',
    detail: 'Browse original bench cards and reaction visuals.',
    icon: 'fa-solid fa-images'
  }, {
    label: 'Practice questions',
    detail: 'Check recall with bench and exam-style prompts.',
    icon: 'fa-solid fa-clipboard-list'
  }];
  const startHere = [{
    label: 'I am new to micro',
    detail: 'Taxonomy, Gram stain logic, and the first bench clues.'
  }, {
    label: 'I am reviewing for ASCP',
    detail: 'Quizzes, visuals, and weak-area loops in the M(ASCP) hub.'
  }, {
    label: 'I am learning bench workflow',
    detail: 'Follow an unknown to the safest next step.'
  }, {
    label: 'I need biochemical help',
    detail: 'Reactions, QC organisms, expected results, traps.'
  }];
  const startPath = [{
    step: '01',
    label: 'Read the beginner path'
  }, {
    step: '02',
    label: 'Practice an unknown'
  }, {
    step: '03',
    label: 'Use a bench card'
  }];
  const panel = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-card)',
    padding: 'var(--space-6)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '1.5rem 1.5rem 3rem',
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-card)',
      boxShadow: 'var(--shadow-card)',
      minHeight: 300,
      background: '#fbfaf7'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bench-cover.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 36%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(251,250,247,0.98) 0%, rgba(251,250,247,0.9) 32%, rgba(251,250,247,0.42) 62%, rgba(251,250,247,0.08) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 560,
      padding: '2.2rem'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "teal"
  }, "Clinical microbiology & ASCP review"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(2.2rem,4vw,3.2rem)',
      color: 'var(--text-heading)',
      margin: '0.3rem 0 0.5rem',
      lineHeight: 1.05,
      letterSpacing: '-0.018em'
    }
  }, "Learn Microbes"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.98rem',
      lineHeight: 1.5,
      margin: '0 0 1.1rem',
      maxWidth: 460
    }
  }, "Learn clinical microbiology the way the bench actually thinks: follow Gram stain, colony clues, media, key tests, and the next safest step."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Create free account"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNav('learn')
  }, "Browse the path")), /*#__PURE__*/React.createElement(SearchField, {
    style: {
      maxWidth: 460
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...panel,
      padding: '0.8rem 1rem'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "muted"
  }, "What are you trying to do?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      color: 'var(--text-muted)',
      fontSize: '0.9rem'
    }
  }, "Pick the closest study task and jump straight to the page, bench card, roadmap, or tool that fits.")), /*#__PURE__*/React.createElement("section", {
    style: panel
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage"
  }, "New here?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.4rem',
      color: 'var(--text-heading)',
      margin: '6px 0 16px',
      letterSpacing: '-0.01em'
    }
  }, "Start with the path that matches your goal."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 12
    }
  }, startHere.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.label,
    type: "button",
    onClick: () => onNav('learn'),
    style: {
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-sm)',
      padding: '1rem 1.1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'var(--lift-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: '1rem',
      color: 'var(--text-heading)'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.86rem',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, s.detail))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 12
    }
  }, actions.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.label,
    type: "button",
    onClick: () => onNav(a.label.includes('Practice') ? 'practice' : a.label.includes('biochem') ? 'tools' : 'tools'),
    style: {
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'var(--lift-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--lm-sage-200)',
      color: 'var(--lm-teal-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.05rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: a.icon
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: '1.02rem',
      color: 'var(--text-heading)'
    }
  }, a.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.84rem',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, a.detail))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage"
  }, "Start path"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: '1.15rem',
      color: 'var(--text-heading)',
      margin: '6px 0 14px'
    }
  }, "Your first three steps"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, startPath.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.step,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0.7rem 0.85rem',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--lm-sage-600)',
      fontSize: '1rem',
      width: 28
    }
  }, s.step), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: '0.92rem',
      color: 'var(--text-body)'
    }
  }, s.label), /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right",
    style: {
      marginLeft: 'auto',
      color: 'var(--lm-ink-300)',
      fontSize: '0.8rem'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(StatChip, {
    icon: "fa-solid fa-rotate",
    value: "145+",
    label: "quiz reps"
  }), /*#__PURE__*/React.createElement(StatChip, {
    icon: "fa-solid fa-layer-group",
    value: "60+",
    label: "bench cards"
  }))), /*#__PURE__*/React.createElement(BenchCard, {
    kicker: "Featured bench card \xB7 Gram-positive",
    title: "Streptococcus pyogenes",
    source: "Pediatric throat swab \xB7 sore throat & fever, 3 days \xB7 pure growth at 24 h",
    findings: ['Sheep blood agar', 'β-hemolytic', 'GPC in chains', 'Catalase-negative'],
    nextStep: "PYR or bacitracin (A-disk) to confirm Group A Strep",
    accent: "gramPos"
  })));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/LearnScreen.jsx
try { (() => {
/* global React */
// Learn Microbes — Learn hub / Visual atlas listing
function LearnScreen({
  mode = 'learn',
  onNav
}) {
  const NS = window.LearnMicrobesDesignSystem_92bf69;
  const {
    Kicker,
    Tag,
    SpecimenFrame
  } = NS;
  const topics = [{
    title: 'Intro to Clinical Microbiology',
    meta: 'Beginner path · 8 lessons',
    accent: 'sage'
  }, {
    title: 'Bacterial ID Strategy',
    meta: 'Workflow · Gram → media → tests',
    accent: 'teal'
  }, {
    title: 'Streptococcus & Enterococcus',
    meta: 'Gram-positive cocci',
    accent: 'gramPos'
  }, {
    title: 'Enterobacterales',
    meta: 'Gram-negative rods',
    accent: 'gramNeg'
  }, {
    title: 'Gram Stain',
    meta: 'Foundations · morphology',
    accent: 'teal'
  }, {
    title: 'Anaerobes',
    meta: 'Aerotolerance & disks',
    accent: 'anaerobe'
  }];
  const visuals = [{
    label: 'Blood agar · β-hemolysis',
    grad: 'linear-gradient(135deg,#7a1f1f,#3a0f0f)'
  }, {
    label: 'TSI · A/A with gas',
    grad: 'linear-gradient(135deg,#caa23a,#9c6b1f)'
  }, {
    label: 'MacConkey · LF colonies',
    grad: 'linear-gradient(135deg,#b23a6b,#6b1f3f)'
  }, {
    label: 'Chocolate agar',
    grad: 'linear-gradient(135deg,#5a3a22,#2e1c10)'
  }];
  const isVisual = mode === 'visuals';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '1.8rem 1.5rem 3rem'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage"
  }, isVisual ? 'Visual atlas' : 'Learn hub'), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.1rem',
      color: 'var(--text-heading)',
      margin: '6px 0 6px',
      letterSpacing: '-0.015em'
    }
  }, isVisual ? 'Original bench visuals' : 'Learn it the way the bench thinks'), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.98rem',
      margin: '0 0 22px',
      maxWidth: 620
    }
  }, isVisual ? 'Real plates and reactions, framed and labelled — built from the bench, not stock photography.' : 'Short, sequenced lessons that move from specimen and Gram stain to media, key tests, and the safest next step.'), isVisual ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 14
    }
  }, visuals.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.label,
    style: {
      cursor: 'pointer'
    },
    onClick: () => onNav('visuals')
  }, /*#__PURE__*/React.createElement(SpecimenFrame, {
    ratio: "1 / 1",
    label: "Atlas"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 12,
      boxSizing: 'border-box',
      background: v.grad
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontWeight: 700,
      fontSize: '0.85rem',
      textShadow: '0 1px 4px rgba(0,0,0,0.4)'
    }
  }, v.label)))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 14
    }
  }, topics.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.title,
    type: "button",
    onClick: () => onNav('learn'),
    style: {
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: '1.3rem 1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'var(--lift-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--lm-ink-300)',
      fontSize: '1.1rem'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement(Tag, {
    accent: t.accent,
    dot: true
  }, t.meta)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: '1.1rem',
      color: 'var(--text-heading)'
    }
  }, t.title)))));
}
Object.assign(window, {
  LearnScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/LearnScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/NavBar.jsx
try { (() => {
/* global React */
// Learn Microbes — product top nav (sticky teal bar)
const {
  Pill
} = window.LearnMicrobesDesignSystem_92bf69;
function NavBar({
  active,
  onNav,
  onCreate
}) {
  const links = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'tools',
    label: 'Tools'
  }, {
    id: 'learn',
    label: 'Learn'
  }, {
    id: 'visuals',
    label: 'Visual atlas'
  }, {
    id: 'practice',
    label: 'Practice'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      padding: '0.7rem 1.5rem',
      background: 'var(--color-brand)',
      color: '#f6fbf8',
      boxShadow: '0 2px 14px rgba(20,58,52,0.22)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer'
    },
    onClick: () => onNav('home')
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand-mark.svg",
    alt: "",
    width: "40",
    height: "40",
    style: {
      filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.18))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: '1.12rem',
      letterSpacing: '0.01em'
    }
  }, "Learn Microbes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.62rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.13em',
      color: 'rgba(244,239,228,0.82)',
      marginTop: 2
    }
  }, "Clinical Bench Reference"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      flex: 1,
      justifyContent: 'center'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    type: "button",
    onClick: () => onNav(l.id),
    style: {
      border: 'none',
      cursor: 'pointer',
      background: active === l.id ? 'rgba(255,255,255,0.14)' : 'transparent',
      color: active === l.id ? '#fff' : 'rgba(244,239,228,0.86)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: '0.9rem',
      padding: '0.5rem 0.9rem',
      borderRadius: 'var(--radius-pill)',
      transition: 'background var(--dur-fast), color var(--dur-fast)'
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Toggle theme",
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.14)',
      color: '#fff',
      fontSize: '0.95rem'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-moon"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCreate,
    style: {
      border: 'none',
      cursor: 'pointer',
      background: '#fff',
      color: 'var(--color-brand-strong)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: '0.88rem',
      padding: '0.55rem 1.1rem',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, "Create free account")));
}
Object.assign(window, {
  NavBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/PracticeScreen.jsx
try { (() => {
/* global React */
// Learn Microbes — Practice (interactive pop-quiz)
const LMDS_PRACTICE = window.LearnMicrobesDesignSystem_92bf69;
function PracticeScreen() {
  const {
    Kicker,
    Pill,
    QuizOption,
    Button,
    Tag
  } = LMDS_PRACTICE;
  const questions = [{
    prompt: 'TSI shows a yellow slant, yellow butt, and cracked agar. What does the crack tell you?',
    flag: 'Enterics',
    options: ['H₂S production', 'Gas production', 'Lactose fermentation', 'Contamination'],
    correct: 1,
    explain: 'Cracks, splits, or bubbles mean the organism produced enough CO₂ / H₂ to fracture the medium — classic for E. coli and many coliforms.',
    confuse: 'H₂S — that\u2019s the black precipitate along the stab, not a crack.'
  }, {
    prompt: 'β-hemolytic GPC in chains, catalase-negative, from a pediatric throat swab. Most likely?',
    flag: 'Gram-positive',
    options: ['Staphylococcus aureus', 'Streptococcus pyogenes', 'Enterococcus faecalis', 'Streptococcus agalactiae'],
    correct: 1,
    explain: 'Catalase-negative GPC in chains with β-hemolysis from a throat points to Group A Strep — confirm with PYR or a bacitracin (A) disk.',
    confuse: 'S. agalactiae is Group B (CAMP / hippurate +), usually from a different source.'
  }];
  const [qi, setQi] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const q = questions[qi];
  const answered = pick !== null;
  const stateFor = i => {
    if (!answered) return 'default';
    if (i === q.correct) return 'correct';
    if (i === pick) return 'incorrect';
    return 'default';
  };
  const next = () => {
    setPick(null);
    setQi((qi + 1) % questions.length);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      padding: '1.8rem 1.5rem 3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage"
  }, "Practice \xB7 Question ", qi + 1, " of ", questions.length), /*#__PURE__*/React.createElement(Pill, {
    tone: "dark"
  }, "Pop quiz")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    accent: "biochem",
    dot: true
  }, q.flag)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.9rem',
      color: 'var(--text-heading)',
      margin: '0 0 22px',
      lineHeight: 1.18,
      letterSpacing: '-0.015em'
    }
  }, q.prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 12
    }
  }, q.options.map((o, i) => /*#__PURE__*/React.createElement(QuizOption, {
    key: i,
    letter: 'ABCD'[i],
    state: stateFor(i),
    onClick: () => !answered && setPick(i)
  }, o))), answered && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      padding: '1rem 1.1rem',
      background: 'var(--lm-sage-100)',
      borderRadius: 'var(--radius-sm)',
      borderLeft: '3px solid var(--lm-sage-500)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-circle-check",
    style: {
      color: 'var(--lm-sage-600)',
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--text-heading)',
      fontSize: '0.95rem'
    }
  }, q.options[q.correct]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-body)',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      marginTop: 3
    }
  }, q.explain))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 12,
      padding: '0.85rem 1.1rem',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.66rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--text-muted)'
    }
  }, "Don't confuse it with"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-body)',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      marginTop: 3
    }
  }, q.confuse))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "fa-solid fa-arrow-right",
    iconRight: true,
    onClick: next
  }, "Next question"))), !answered && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }
  }, "Pick an answer to see the reasoning and the classic look-alike trap.")));
}
Object.assign(window, {
  PracticeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/PracticeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/ToolsScreen.jsx
try { (() => {
/* global React */
// Learn Microbes — Tools / ToolBox grid (colored bench tools)
const LMDS_TOOLS = window.LearnMicrobesDesignSystem_92bf69;
function ToolsScreen({
  onNav
}) {
  const {
    Kicker,
    Pill
  } = LMDS_TOOLS;
  const tools = [{
    name: 'Unknown Isolate Workup',
    desc: 'Walk an unknown from first observations to the safest next step.',
    icon: 'fa-solid fa-microscope',
    accent: 'var(--lm-teal-600)',
    tag: 'Identification'
  }, {
    name: 'Gram-Positive Roadmap',
    desc: 'Branch GPC and GPR by catalase, hemolysis, and key tests.',
    icon: 'fa-solid fa-diagram-project',
    accent: 'var(--lm-gram-pos)',
    tag: 'Roadmap'
  }, {
    name: 'Gram-Negative Roadmap',
    desc: 'Lactose, oxidase, and TSI logic for the Enterobacterales and beyond.',
    icon: 'fa-solid fa-diagram-project',
    accent: 'var(--lm-gram-neg)',
    tag: 'Roadmap'
  }, {
    name: 'Anaerobe Roadmap',
    desc: 'Aerotolerance, special-potency disks, and Gram reaction clues.',
    icon: 'fa-solid fa-diagram-project',
    accent: 'var(--lm-anaerobe)',
    tag: 'Roadmap'
  }, {
    name: 'Biochemical Tests',
    desc: 'Reactions, QC organisms, expected results, and interpretation traps.',
    icon: 'fa-solid fa-flask',
    accent: 'var(--lm-biochem)',
    tag: 'Reference'
  }, {
    name: 'Enterics Calculator',
    desc: 'Enter reactions, get the closest Enterobacterales match.',
    icon: 'fa-solid fa-calculator',
    accent: 'var(--lm-sage-600)',
    tag: 'Calculator'
  }, {
    name: 'Special Pathogens Hub',
    desc: 'Sentinel-level organisms and the safest handling notes.',
    icon: 'fa-solid fa-shield-virus',
    accent: 'var(--lm-clay)',
    tag: 'Safety'
  }, {
    name: 'Do Not Routine Culture',
    desc: 'Specimens and organisms that need a different workflow.',
    icon: 'fa-solid fa-ban',
    accent: 'var(--lm-caution)',
    tag: 'Safety'
  }, {
    name: 'Study Quiz',
    desc: 'Bench and exam-style prompts with weak-area tracking.',
    icon: 'fa-solid fa-clipboard-question',
    accent: 'var(--lm-gram-pos)',
    tag: 'Practice'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '1.8rem 1.5rem 3rem'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "sage"
  }, "The bench"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '2.1rem',
      color: 'var(--text-heading)',
      margin: '6px 0 6px',
      letterSpacing: '-0.015em'
    }
  }, "Tools & roadmaps"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.98rem',
      margin: '0 0 22px',
      maxWidth: 600
    }
  }, "Branching ID roadmaps, bench-reference tools, and calculators \u2014 each one follows the workflow, not a wall of facts."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 14
    }
  }, tools.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.name,
    type: "button",
    onClick: () => onNav(t.name === 'Study Quiz' ? 'practice' : 'tools'),
    style: {
      position: 'relative',
      textAlign: 'left',
      cursor: 'pointer',
      overflow: 'hidden',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-card)',
      padding: '1.3rem 1.2rem 1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'var(--lift-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: t.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 11,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      background: t.accent + '1a',
      color: t.accent
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: t.icon
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.62rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: t.accent
    }
  }, t.tag)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: '1.05rem',
      color: 'var(--text-heading)',
      marginTop: 2
    }
  }, t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, t.desc)))));
}
Object.assign(window, {
  ToolsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/ToolsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BenchCard = __ds_scope.BenchCard;

__ds_ns.QuizOption = __ds_scope.QuizOption;

__ds_ns.SpecimenFrame = __ds_scope.SpecimenFrame;

__ds_ns.StatChip = __ds_scope.StatChip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.ProgressDots = __ds_scope.ProgressDots;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchField = __ds_scope.SearchField;

})();
