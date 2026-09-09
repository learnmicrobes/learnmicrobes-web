# AGENTS.md — Learn Microbes

This repo carries the **Learn Microbes design system** (by NAVUZAR). When you
build or change any UI, marketing asset, or educational graphic, design it
*with this system* — do not invent new colors, type, or components.

## How to use it (read these first)
1. **`design-system/readme.md`** — the brand guide: content voice, visual
   foundations, iconography, and a manifest of everything available.
2. **`design-system/SKILL.md`** — when to reach for the system + how to work with it.
3. **`design-system/styles.css`** — link this ONE file to get every design token
   and the Inter webfont. All tokens are CSS custom properties (`var(--teal-600)`,
   `var(--font-ui)`, `var(--radius-md)`, …).
4. **`design-system/components/`** — React primitives (Button, Pill, Tag, Kicker,
   Card, Badge, IconButton, Input, SearchField, Checkbox, Callout, ProgressDots)
   and content blocks (BenchCard, QuizOption, SpecimenFrame, StatChip). Each has a
   `.prompt.md` with a usage example and a `.d.ts` props contract — read those
   before using a component.
5. **`design-system/ui_kits/`** — full-screen references: `web_app/` (the product)
   and `social/` (educational & social post templates). Match these layouts.
6. **`design-system/assets/`** — brand marks, logo, monogram, and specimen photos.

## Rules
- **Reuse, don't reinvent.** Compose the existing components; only add a new one
  when nothing fits, and follow the same file pattern (`Name.jsx` + `Name.d.ts` +
  `Name.prompt.md`).
- **Tokens only** for color/space/type/radius/shadow — never hard-coded hex or px
  when a token exists.
- **Brand tone:** practical, calm, clean, modern, bench-aware, trustworthy,
  student-first. Teal-forward, warm off-white grounds, restrained sage accent,
  IBM Plex Sans set at 400–700, cards with a hairline and no shadow.
- **One level of containment.** A section that IS the content gets a fill and a
  hairline; a section whose children already carry the boundary gets space only.
  Never draw a box around boxes.
- **Never write an unscoped element selector** (`section {…}`, `header {…}`,
  `button { background … }`). Two of these existed and carded/bannered the entire
  app; every page's CSS was fighting them. Scope to a component class.
- **Avoid:** neon / oversaturated color, purple or "AI" gradients, emoji as icons,
  cartoon mascots, stock-science clutter, and **coloured left-border accent rails
  on cards** — that last one is a recognisable AI-design tell. If a card needs to
  encode a category, give it a full hairline in that colour. Icons are Font
  Awesome 6 (solid).
- Species names are italicized (*S. pyogenes*); eyebrows/tags are UPPERCASE; almost
  everything else is sentence case.
