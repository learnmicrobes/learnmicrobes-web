---
name: learn-microbes-design
description: Use this skill to generate well-branded interfaces and assets for Learn Microbes (a bench-first clinical-microbiology learning platform by NAVUZAR), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, social posts, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key starting points in this system:
- `readme.md` — full brand guide: content fundamentals, visual foundations, iconography, manifest.
- `styles.css` — link this one file to get all tokens + the Inter webfont.
- `tokens/` — colors (teal ramp, sage accents, bench category accents), typography, spacing.
- `components/` — React primitives (Button, Pill, Tag, Kicker, Card, Badge, IconButton, Input, SearchField, Checkbox, Callout, ProgressDots) and content blocks (BenchCard, QuizOption, SpecimenFrame, StatChip).
- `ui_kits/web_app/` — the product (home, tools, learn, practice).
- `ui_kits/social/` — educational & social post templates.
- `assets/` — brand marks, monogram, full logo, bench cover photo.

Tone to hold: practical, calm, clean, modern, bench-aware, trustworthy, student-first. Teal-forward, warm off-white grounds, restrained sage accent, heavy Inter headlines, rounded cards with soft depth. Avoid neon, purple gradients, emoji-as-icons, and stock-science clutter.
