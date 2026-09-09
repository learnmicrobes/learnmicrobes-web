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

**Type.** A single family — **IBM Plex Sans** — carries the interface, with
**IBM Plex Mono** reserved for measured values (CFU counts, QC results, titres,
question tallies) the way a lab report sets them. Plex was drawn for technical
documentation and holds up at small sizes on low-end Android screens, which is
what most of the audience reads on.

Weights are **400 / 500 / 600 / 700 only** — body, UI labels, headings, display.
Nothing above 700. Heavier weights read as shouting rather than as hierarchy, and
non-standard values (850, 760, 820) are not real cuts; the browser rounds them to
something else anyway.

The scale is **eight steps and nothing between them**, and body never drops below
16px:

| Token | Size | Role |
|---|---|---|
| `--text-xs` | 12px | uppercase labels, counts |
| `--text-sm` | 13px | captions, helper text |
| `--text-base` | 15px | secondary body, card copy |
| `--text-md` | **16px** | primary body — the floor |
| `--text-lg` | 19px | card and section titles |
| `--text-xl` | 24px | panel headings |
| `--text-2xl` | 32px | page titles |
| `--text-3xl` | 42px | hero |

Eyebrows are uppercase and tracked, but **used sparingly** — an eyebrow must encode
something true (a step in a sequence, a status, a specimen label). One on every
panel is texture, not orientation, and it dates a layout faster than almost
anything else. Hierarchy: eyebrow (when earned) → headline → subhead → label →
card body → CTA.

> **Changed 2026-09-08.** This section previously specified Inter with heavy (800)
> headlines. The product UI moved to Plex and the four-weight ladder deliberately;
> see *Product UI decisions* below for the reasoning.

**Backgrounds.** Flat warm fields, not gradients (the only gradients are the brand
tile and the app header bar). Marketing covers are solid deep teal. A faint
**dotted 4×4 grid** sits in a corner as the one decorative motif. Occasional large,
very-low-contrast sage circle bleeding off a corner. Real photography (agar plates,
tube racks, microscopy) appears inside rounded cards, never as a tinted full-bleed
hero behind text — when product screenshots sit on teal they're framed in a phone bezel.

**Imagery vibe.** Warm, true-to-life, well-lit clinical photography (red blood agar,
amber TSI tubes, purple Gram films). Polished but honest — real bench photos, not
stock "science" glamour shots, not illustration. Microscopy keeps its natural color.

**Cards & containment.** White (`--surface`) on warm canvas, **rounded**
(product 5–6px for cards, `--radius-xl 20px` on social), 1px hairline border.
Photos inside cards get a small white inset frame and a teal "Specimen A" tag.

The governing rule in the product UI is **one level of containment**:

- A section that **is** the content — a hero, a CTA panel, a callout — gets a fill
  and a hairline. It is an object.
- A section whose **children already carry the boundary** — a grid of cards, a row
  of tiles — gets space and nothing else. Drawing a box around boxes flattens the
  hierarchy and is the single biggest reason a page reads as "a stack of identical
  rectangles."

Border, fill, radius and shadow each say *"separate object."* Spend them by role.
Panel shadows were removed from the product UI; the hairline does the work.

**Pills & tags.** In the **product UI**, tags and chips are **rounded rectangles**
(see the radius scale below), matching the nav toolbar buttons so the app reads as
one system. Fully-rounded pills remain correct on **social and marketing** surfaces,
where they are a brand element. `999px` survives in the product only where the shape
is doing real work: circular markers, step numbers, check icons, spinners, progress
bars and meters, loading shimmer, scrollbar thumbs. A blanket find-and-replace on
`border-radius: 999px` will turn those circles into squircles — don't.

**Borders & dividers.** 1px, low-opacity teal. Vertical rules separate paired panels.
No thick rules, no colored left-border-accent cards.

**Depth.** Soft outer shadows only; subtle inner tint gradients on a few cards
(`linear-gradient(180deg,#fff,#fbfaf7)`). Transparency/blur is used lightly on the
hero search box (`backdrop-filter: blur(12px)`) over photography — not elsewhere.

**Corner radii.** Tight and clinical in the app, and **scaled to the element** —
a 42px button and an 18px badge should not share a corner:

| Radius | Use |
|---|---|
| **10px** | interactive controls: buttons, toggles, filter chips, segmented controls, 42px icon buttons. Anchored to the nav toolbar buttons. |
| **8px** | medium chips inside a panel; inner segments of a 10px segmented control |
| **5–6px** | static badges, small cards, meta chips |
| **12–14px** | large floating surfaces: dropdown menus, toasts |
| **999px** | circles and meters only (see *Pills & tags*) |

Marketing stays larger and friendlier (20 / 28px).

**Motion.** Calm and short. ~140–260ms eases, gentle `translateY(-2px)` hover lifts,
small fade-up entrances (`slideFadeIn`). No bounce, no spring, no parallax.
Honor `prefers-reduced-motion`.

**Hover / press.** Hover = lift `-2px` + slightly stronger border + a touch more
shadow (and faintly warmer `#fbfaf7` fill on light cards). Primary buttons darken
on hover. Press settles the lift. Focus = 3px soft teal ring. Hit targets ≥ 44px.

**Layout.** Centered max-width container (1100–1200px), modular card grids,
generous gaps. Strong scannability — small chunks, clear labels, lots of air.

On phones the product goes **full bleed**. Below 620px the content shell drops its
side padding and top-level panels span edge to edge, so sections read as stacked
bands the way a native app does; cards nested inside a panel keep their radius,
which is what preserves the hierarchy. This is not cosmetic — a 375px screen was
losing ~40px (11%) to shell padding plus corners, and reading width went from
300px to 340px when it was removed.

---

## Product UI decisions

> Added 2026-09-08. These are the calls made for the **web app** specifically.
> Social and marketing surfaces keep the fuller, friendlier treatment described
> above where they differ.

**Why Plex over Inter.** The audience is overwhelmingly on phones — GA4 shows
Facebook and Threads referrals dominating, with readers in the Philippines and the
OFW corridor. Plex was drawn for technical documentation, stays legible at 13–16px
on inexpensive screens, and its mono companion gives lab values the monospaced
setting they have in a real report. Inter remains a fine face; this is a fit
decision, not a quality one.

**Why the weights collapsed.** The codebase had 330 declarations at weight 750–950
against 47 at 400–600. When body copy, labels, buttons and headings are all
extra-bold, the eye gets no ranking and the page reads as loud rather than
designed. Four weights give a real hierarchy.

**Why body is 16px.** It was 14.4–15.2px. Small *and* heavy is the hardest
combination to read on a phone in daylight, which is the actual reading condition
for most of this audience.

**Semantic tokens, not literals.** Components reference role tokens —
`--surface`, `--ink`, `--rule` — never a hex. Dark mode then redefines the tokens
in one block instead of every component restating its own colours. Two
distinctions are easy to get wrong:

- **Accent text and accent fill are separate tokens.** In dark mode the readable
  accent is a bright mint; as a button fill it is far too loud. Fills stay mid-teal
  (`--accent-fill`), text uses `--accent`.
- **`--surface-card` exists** because a card is white in light mode but *sunken*
  in dark (darker than the panel near it). No single surface token covers that.

**Two logo lockups, not one.** The tiled app-icon mark is `#2c7873 → #1d4a54`,
which sits almost exactly on top of the `#245c69` nav bar and disappears. Use
`brand-mark-knockout.svg` (glyph knocked out in white, no tile, no shadow) on
brand-coloured surfaces; use the tiled mark on light grounds, the favicon, and the
installed app icon. Note that SVG loaded via `<img>` **cannot** load a webfont, so
the mark's letterforms fall back to a system face — outlines are the proper fix if
it ever goes to print or merch.

**Never use unscoped element selectors.** Two were found in `src/styles.css`:
a bare `section { background: white; border-radius: 10px; box-shadow: … }` that
carded every semantic section in the app, and a bare
`header { background: linear-gradient(…) }` that bannered every bare `<header>`.
Both had page CSS fighting them everywhere. They are now scoped to
`.bio-calculator`, where they originated. If something looks unexpectedly carded
or bannered, an unscoped element selector is the first place to look.

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
