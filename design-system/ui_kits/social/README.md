# Learn Microbes — Social & Educational UI Kit

Recurring Instagram / LinkedIn post formats for Learn Microbes, built from the
same design-system components as the product so the brand reads consistently
across web app, content visuals, and social.

## Formats
- **Cover (4:5, 1080×1350)** — deep-teal carousel opener: brand row, page
  counter, large heavy headline, supporting line, URL pill, swipe cue.
- **Pop quiz — question (1:1, 1080×1080)** — cream canvas, `POP QUIZ` pill,
  "Question" kicker, bold prompt, four `QuizOption` answer cards.
- **Pop quiz — answer (1:1)** — deep-teal, sage `ANSWER` pill, letter `Badge`
  + answer, explanation, and a "Don't confuse it with" `Callout`.
- **Name this isolate (1:1)** — bench challenge: challenge + difficulty pills,
  clue `Tag`s, and a `SpecimenFrame` for the plate photo.
- **CTA (4:5)** — closing slide: headline, supporting line, pill CTAs.

## Files
- `index.html` — renders all templates (loads the DS bundle + Font Awesome).
- `SocialPosts.jsx` — `CoverSlide`, `QuizQuestionSlide`, `QuizAnswerSlide`,
  `ChallengeSlide`, `CTASlide` + shared `BrandRow` / `DotGrid`.

## Notes
- Canvases are rendered at ~40% of native social size for preview; scale the
  outer dimensions up (×2.5 → 1080-wide) for export.
- Specimen imagery uses a labelled placeholder — drop in the real plate /
  microscopy photo for production posts.
- Backgrounds use only the two brand fields: deep teal (`--lm-teal-700`) and
  warm cream (`--cream-150`). The dotted 4×4 grid is the one decorative motif.
