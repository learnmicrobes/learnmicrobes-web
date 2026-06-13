# Learn Microbes — Design System

A bench-first clinical-microbiology learning brand, by **NAVUZAR**.

Learn Microbes teaches clinical microbiology the way the bench actually thinks:
**specimen / source → Gram stain → morphology → media → key tests → safest next step.**
It serves MedTech / MLS students, ASCP reviewees, new bench learners, and working
medical technologists, across a web app, mobile-friendly content, a visual atlas,
bench-reference cards, interactive ID tools, quizzes, and social learning assets.

This design system carries one coherent brand family across four surfaces:

1. **Website / product UI** — the Learn Microbes web app (home dashboard, Learn hub,
   Visual Atlas bench cards, ID roadmaps, biochemical tools, ASCP review, quizzes).
2. **Educational content visuals** — bench reference cards, atlas entries, workflow diagrams.
3. **Social media graphics** — pop-quiz carousels, "Name this isolate" challenges, promo slides.
4. **Promotional mockups** — phone/tablet/laptop framing of the product.

The tone is **practical, calm, clean, modern, bench-aware, trustworthy, and student-first** —
clear enough for beginners, credible enough for working bench techs. Not childish,
not overly corporate, not "AI-looking."

---

## Sources this system was derived from

> Stored for provenance. Do not assume the reader can open these.

- **Codebase:** `learnmicrobes-web/` — a Create-React-App + TypeScript web app
  (React Router, Supabase auth, FontAwesome icons, Inter via Google Fonts).
  Key files read: `src/styles.css`, `src/App.css`, `src/App.tsx`,
  `src/components/VisualAtlas/VisualAtlas.tsx`, `public/index.html`,
  `public/logo-full.svg`, `src/assets/brand-mark.svg`.
- **Live brand color anchor:** `:root` in `src/styles.css` (`--primary-color: #245c69`),
  app header gradient `#1a5a57 → #2c7873`, theme-color `#2c7873`.
- **Social / educational templates** (uploaded): cover, ASCP-review promo, CTA,
  "Name this isolate" challenge, pop-quiz question + answer slides. These define
  the marketing layer (deep-teal full-bleed covers, cream content canvases,
  pill tags, rounded answer cards, dotted-grid decoration, page counters).
- **Production domain:** learnmicrobes.com

---

## Content fundamentals — how Learn Microbes writes

**Voice.** A working clinical lab scientist talking to a colleague-in-training.
Confident, plain-spoken, never lecture-y. The product literally says it was
*"Built by a working micro lab tech, free to use."*

**Point of view.** Second person, imperative, action-first. The reader is *you*;
the platform is mostly invisible (occasionally "I" when the founder speaks:
*"message me and I'll build it"*). Copy tells you what to **do** next, not what to memorize.

**Casing.** Sentence case for nearly everything — headlines, buttons, card titles.
UPPERCASE only for short eyebrows/kickers and pill tags (`ONE YEAR OF BUILDING`,
`BUILT FOR THE BOARDS`, `MICRO CHALLENGE #06`, `POP QUIZ`, `ANSWER`). Title Case is rare.

**Sentence shape.** Short. Often fragments for rhythm: *"Start free. Learn the patterns."*
*"Practical over flashy."* Lists use the bench arrow chain or bullet pills.

**Bench vocabulary, exact and unembellished.** Real terms, abbreviations, and
organism names: Gram stain, β-hemolytic, GPC in chains, catalase-negative, TSI,
K/A, H2S, optochin, MacConkey, M(ASCP), QC. Italicize species (*E. coli*,
*S. pneumoniae*). Use the lab shorthand learners will actually see.

**Stance on learning.** Anti-memorization, pro-reasoning: *"Stop memorizing isolated
facts. Pick the closest route and study the workflow: clue by clue, test by test,
bench decision by bench decision."* Every screen orients around "what are you trying to do?"

**Reassurance & safety.** Calm, never alarmist. Frames the goal as the *"safest next step,"*
and answer cards include a *"Don't confuse it with…"* trap callout rather than a scold.

**Emoji.** Extremely sparing. A lone 👇 or a small bullet dot for warmth on a social
slide — never in product UI, never as decoration or as icons. Default to none.

**Example phrases that sound on-brand**
- "It started as one free calculator. Now it's a whole bench."
- "Choose the closest study task and jump straight to the page that fits."
- "Name it — then name the disk that confirms it."
- "Follow an unknown from first observations to the safest next step."
- "How many did you get right?"

---

## Visual foundations

**Color.** Deep **teal / blue-green** is the brand anchor (`--teal-600 #245c69`,
strong `--teal-800 #1d4a54`, header `--teal-500 #2c7873`). Full-bleed marketing
covers use a deep forest teal (`--teal-700 #21514c`) with near-white text.
Backgrounds are **warm off-white** — app `#faf7f0`, social canvas `#f0ede4`.
The accent is a **muted sage green** (`--sage-600 #4f8f67` for success/accents,
`--sage-400 #7cb494` for light pills, `--sage-500` for eyebrows on dark).
Secondary structure is soft warm gray (`--ink-500 #5f6b77`). Warm accents
(**gold `#c8a24d`**, **terracotta `#c96b4b`**) appear only when something must be
flagged. No neon, no oversaturation, no corporate-blue, no purple gradients.

**Type.** A single family — **Inter** — does everything. Headlines are heavy
(800) and tight (`-0.02em`), often stacked over 2–4 lines and very large on
social covers. Body is regular/medium, 1.5 line-height, sized for mobile (never
below ~15px on screen). Eyebrows are uppercase, tracked `0.12em`, bold, teal or
sage. Strong, simple hierarchy: eyebrow → headline → subhead → label → card body → CTA.

**Backgrounds.** Flat warm fields, not gradients (the only gradients are the brand
tile and the app header bar). Marketing covers are solid deep teal. A faint
**dotted 4×4 grid** sits in a corner as the one decorative motif. Occasional large,
very-low-contrast sage circle bleeding off a corner. Real photography (agar plates,
tube racks, microscopy) appears inside rounded cards, never as a tinted full-bleed
hero behind text — when product screenshots sit on teal they're framed in a phone bezel.

**Imagery vibe.** Warm, true-to-life, well-lit clinical photography (red blood agar,
amber TSI tubes, purple Gram films). Polished but honest — real bench photos, not
stock "science" glamour shots, not illustration. Microscopy keeps its natural color.

**Cards.** White (`--paper`) on warm canvas, **rounded** (product `--radius-md 10px`;
social `--radius-xl 20px`), 1px hairline border (`rgba(36,92,105,.16)`) plus a
**soft, low shadow** (`--shadow-sm/md`). Never heavy or dramatic. Photos inside cards
get a small white inset frame and a teal "Specimen A" tag.

**Pills & tags.** Fully rounded (`--radius-pill`). Variants: solid deep-teal,
light sage, and hairline-outline chips with a small leading dot. Used for difficulty,
post type ("POP QUIZ"/"ANSWER"), clue lists ("β-hemolytic", "GPC in chains"), and URLs.

**Borders & dividers.** 1px, low-opacity teal. Vertical rules separate paired panels.
No thick rules, no colored left-border-accent cards.

**Depth.** Soft outer shadows only; subtle inner tint gradients on a few cards
(`linear-gradient(180deg,#fff,#fbfaf7)`). Transparency/blur is used lightly on the
hero search box (`backdrop-filter: blur(12px)`) over photography — not elsewhere.

**Corner radii.** Tight and clinical in the app (4 / 6 / 10 / 14px); larger and
friendlier on marketing (20 / 28px); pills everywhere a tag belongs.

**Motion.** Calm and short. ~140–260ms eases, gentle `translateY(-2px)` hover lifts,
small fade-up entrances (`slideFadeIn`). No bounce, no spring, no parallax.
Honor `prefers-reduced-motion`.

**Hover / press.** Hover = lift `-2px` + slightly stronger border + a touch more
shadow (and faintly warmer `#fbfaf7` fill on light cards). Primary buttons darken
on hover. Press settles the lift. Focus = 3px soft teal ring. Hit targets ≥ 44px.

**Layout.** Centered max-width container (1100–1200px), modular card grids,
generous gaps. Mobile-first: single column, full-width stacked buttons, larger
tap targets. Strong scannability — small chunks, clear labels, lots of air.

---

## Iconography

- **Icon set:** **Font Awesome 6.4.0 (free, solid)** — loaded from CDN in the app
  (`cdnjs … font-awesome/6.4.0`). Use the React/`<i class="fa-solid fa-…">` solid
  style. Common glyphs in product: `house`, `book`, `graduation-cap`, `images`,
  `microscope`, `flask`, `clipboard-list`, `magnifying-glass`, `toolbox`, `bookmark`,
  `moon`/`sun`, `bars`, `xmark`, `chevron-down`, `right-to-bracket`. Stroke/weight is
  the FA-solid default — medium-filled, friendly, consistent.
- **Brand marks (in `assets/`):**
  - `brand-mark.svg` — primary tile: teal gradient rounded square with a notebook
    outline + "LM" (the canonical app mark).
  - `brand-mark-flask.svg` — deep-teal rounded tile with a line flask; the variant
    used on most social/educational templates.
  - `monogram-lm.svg` — white tile with teal "LM" (compact / footer / avatar use).
  - `logo-full.svg` — full lockup: tile + "Learn Microbes" wordmark + "CLINICAL
    BENCH REFERENCE" sub-label.
  - `favicon.svg` — favicon (notebook + LM).
- **Emoji as icons:** avoid. Bench dot bullets (`•`) and the FA set cover the need.
- **No hand-drawn one-off SVG icons** beyond the brand marks — reach for Font Awesome.

---

## Index / manifest

**Foundations**
- `styles.css` — entry point (import manifest only).
- `tokens/colors.css` — teal ramp, sage accents, warm neutrals, ink, semantic aliases.
- `tokens/typography.css` — Inter scale, weights, line-heights, tracking.
- `tokens/spacing.css` — spacing rhythm, radii, soft shadows, motion, layout.
- `tokens/fonts.css` — Inter (Google Fonts).

**Brand assets** — `assets/` (marks, monogram, full logo, favicon, bench cover photo).

**Specimen cards** (Design System tab) — `foundations/*.html` (Type, Colors, Spacing, Brand).

**Components** — `components/` (see each directory's card):
- `components/core/` — Button, Pill, Tag, Kicker, Card, Badge, IconButton
- `components/content/` — BenchCard, QuizOption, SpecimenFrame, StatChip
- `components/forms/` — Input, SearchField, Checkbox
- `components/feedback/` — Callout, ProgressDots

**UI kits** — `ui_kits/`:
- `ui_kits/web_app/` — Learn Microbes web app (home dashboard, tools & roadmaps,
  learn / visual atlas, practice quiz, top nav).
- `ui_kits/social/` — educational/social templates (cover, pop-quiz Q + A,
  "Name this isolate" challenge, CTA).

**Skill** — `SKILL.md` (Agent-Skills compatible entry).

---

**Tokens.** `tokens/colors.css` also defines a small set of **bench category
accents** — `--lm-gram-pos` (muted plum), `--lm-gram-neg` (brick), `--lm-anaerobe`
(deep teal-grey), `--lm-biochem` (amber), `--lm-clay`, `--lm-caution` — used only
as thin category accent stripes on ID tools / roadmaps, never as fields. The product
and UI-kit layer references a set of compatibility aliases (`--color-brand`,
`--font-ui`, `--font-display`, `--shadow-card`, `--dur-base`, `--ease-out`,
`--lift-hover`, `--lm-teal-*`, `--lm-sage-*`, …) that map onto the canonical ramp,
so one palette drives both vocabularies.

## Caveats

- **Inter is loaded from Google Fonts** (matching the production app), not bundled as
  local font binaries. If you want offline/self-hosted webfonts, share the `.woff2`
  files and they'll be wired into `tokens/fonts.css`.
- The two brand teals from the codebase (`#245c69` app primary vs `#2c7873` theme/header)
  are both preserved in the ramp; product UI anchors on `--teal-600`, marketing covers
  on `--teal-700`. Confirm which you'd like as the single canonical primary.
