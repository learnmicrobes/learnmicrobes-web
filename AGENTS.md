# AGENTS.md — Learn Microbes

Universal instruction file for all coding agents (Claude Code, Codex, and any future tool).
Read this entire file before making any changes to the codebase.

---

## Product identity

Learn Microbes is a bench-first clinical microbiology learning platform for:

- MedTech / MLS students
- ASCP / AMT reviewees (M(ASCP), SM(ASCP), and related microbiology certification review)
- New bench learners
- Working medical technologists

The product teaches how the clinical microbiology bench actually thinks:

**specimen/source → Gram stain → morphology → media → key tests → safest next step**

Every feature should help the learner answer three questions:

1. What am I looking at?
2. Why does it matter?
3. What do I do next?

This is an **educational tool** — not medical advice, not a diagnostic system, and not a replacement for lab SOPs or clinical judgment.

---

## Current tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build | Create React App / react-scripts |
| Routing | react-router-dom v6 |
| Icons | @fortawesome/react-fontawesome + free-solid-svg-icons |
| Auth | Supabase (email/password + Google OAuth) |
| Database | Supabase (Postgres) |
| Sanitization | DOMPurify (available — use when rendering any user-supplied content) |
| Deploy | GitHub Pages via GitHub Actions (auto-triggers on push to `main`) |

Environment variables are stored in `.env` locally and as GitHub Actions secrets for CI:
`REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`

Auth context lives at `src/context/AuthContext.tsx`.
Usage: `const { user } = useAuth()` — guest state is `!user` (null when not signed in).

---

## Current feature set

- **Home dashboard** — hero search, daily riddle, featured bench card, start-here paths
- **Learn** — topic pages for clinical microbiology organisms and concepts (`src/data/learnTopics.ts`)
- **Visual Atlas** — original bench cards across bacteriology, parasitology, mycology, and virology-style study cards with SVG renders, DIVR readouts where present, and comparison panels (`src/components/VisualAtlas/`)
- **Tools**
  - Gram Positive Roadmap
  - Gram Negative Roadmap
  - Obligate Anaerobe Roadmap
  - Unknown Isolate Workup
  - Biochemical Tests reference
  - Enterics Biochemical Calculator
  - Special Pathogens Hub
  - Do Not Routine Culture
- **Practice** — Study Quiz (guest-gated at 15 questions), ASCP review hub
- **Account features** — Supabase-backed profiles, bookmarks, Learn progress, quiz history, and weak-area review
- **Search** — global search across all content
- **Auth** — sign in / create account / Google OAuth via Supabase
- **Guest soft-gating** — roadmaps (5 endpoints per roadmap), Unknown Isolate Workup (3 reviewed paths), Study Quiz (15 questions); gate modals follow the pattern in `StudyQuiz.tsx`
- **Dark mode** — `body.dark-mode` class toggled on `<body>`, persisted in localStorage

---

## Development priorities

When modifying the app, prioritize in this order:

1. **Learner clarity** — does this help a student understand the bench?
2. **Mobile readability** — most users are on phones; test at 375px width
3. **Clinical accuracy** — bench logic must be correct and credible
4. **Clean navigation** — do not bury features or create dead ends
5. **Small, safe changes** — avoid large rewrites unless explicitly requested
6. **Maintainable TypeScript** — clean types, no unnecessary `any`
7. **Professional student-first UI** — clean, trustworthy, practical

---

## Product principles

### Bench-first structure

Always preserve this learning flow in tools and content:

- specimen / source
- Gram stain
- morphology
- media / colony appearance
- biochemical / key tests
- safest next step

### Pattern recognition over memorization

Teach learners to read bench patterns, not just recite facts. Use comparator cards, visual differentials, and lookalike warnings where helpful.

### Content originality

All user-facing content must be **original writing** — not reproduced from textbooks.
Textbooks are internal planning inputs only. Never expose "Chapter X" structure in the UI or in data files that surface to users.

### Educational humility

Never imply official ASCP affiliation, guaranteed exam outcomes, medical advice, or diagnostic authority. Learn Microbes helps learners study — clinical decisions belong to licensed professionals following facility SOPs.

---

## UI and brand direction

### Feel

- Clean, modern, trustworthy
- Clinical and student-friendly
- Practical — not childish, not overly corporate, not generic AI-looking

### Design rules

- Readable cards with clear visual hierarchy
- Strong mobile layout — test all new UI at 375px
- Concise copy — no marketing fluff inside tools or content pages
- Simple, instructional visuals — SVG or CSS diagrams that teach one concept clearly
- **Lab Notebook palette**: warm paper-like background, deep ink text, teal/blue-green primary (`--primary-color: #245c69`)

### Avoid

- Clutter and excessive animations
- Neon colors or cartoon-style bacteria graphics
- Fake science graphics or purely decorative icons
- Repeated onboarding blocks on the same page
- Long walls of text without visual breaks

---

## Coding rules

### Before making changes

- Read the relevant files first — understand existing patterns before writing new ones
- Preserve current routing and app shell unless the task explicitly requires changes
- Never break existing tools, guides, search, auth, theme toggle, or navigation

### When editing

- Make the **smallest safe change** that solves the task
- Keep components readable and focused on one responsibility
- Avoid duplicate data structures
- Keep TypeScript types clean — no unnecessary `any`, no unused imports, no dead code
- Do not modify files unrelated to the task
- Do not introduce new npm dependencies without explicit approval

### CSS conventions

- Scope all styles to component class names. **Never write an unscoped element
  selector** (`section {…}`, `header {…}`). Two of these existed in `src/styles.css`
  and applied a card and a gradient banner to the whole app; every page's CSS was
  silently fighting them. Both are now scoped to `.bio-calculator`.
- Global CSS variables are defined in `src/styles.css`
- Component-scoped variables (e.g., `--c-primary`) are defined on a parent class within the component CSS file
- Dark mode: use `body.dark-mode` selector — do not use `prefers-color-scheme` without approval
- Primary mobile breakpoint: `max-width: 768px`; secondary: `max-width: 480px`.
  Full-bleed phone layout triggers at `max-width: 620px`.

#### Design tokens — use these, never a literal

Defined in `src/styles.css` `:root`, redefined for dark in one `body.dark-mode`
block. A component that reads tokens is correct in both themes on the first try.

| Group | Tokens |
|---|---|
| Type | `--font-ui`, `--font-mono`, `--text-xs` … `--text-3xl` |
| Surfaces | `--ground`, `--surface`, `--surface-card`, `--surface-sunken` |
| Ink | `--ink`, `--ink-muted`, `--ink-subtle` |
| Lines | `--rule`, `--rule-strong` |
| Accent text | `--accent`, `--accent-strong`, `--accent-wash` |
| Accent fills | `--accent-fill`, `--accent-fill-hover`, `--accent-fill-ink` |
| Subject stains | `--stain-bac`, `--stain-par`, `--stain-myc`, `--stain-vir`, `--stain-afb` — apply with `subjectStainClass()` from `src/data/subjectStains.ts`. Stain means *which subject*; teal means *tappable*. Small doses only, never backgrounds or left rails. |

Two traps:

- **Accent text ≠ accent fill.** In dark mode the readable accent is a bright mint;
  as a button fill it is far too loud. Use `--accent-fill` for fills.
- **`--surface-card` is not `--surface`.** A card is white in light mode but
  *sunken* in dark. Panels use `--surface`; objects sitting on a ground or in a
  group use `--surface-card`.

Weights are **400/500/600/700 only**. Body is `--text-md` (16px) and never smaller.

Migration is partial: `PracticePage`, `Flashcards` and `CaseStudySimulator` are
fully tokenised. `Learn.css`, `App.css`, `VisualAtlas.css`, `AccountPage.css` and
`RoadmapExperience.css` still carry hand-written `body.dark-mode` overrides. The
token layer is additive, so those keep working — migrate a file at a time by
pointing its colours at tokens, then deleting the dark rules whose values now
match the dark token.

#### Verifying UI changes

`getComputedStyle` in an embedded preview browser reports **stale values for
transitioned properties** (background, border-color) right after a theme switch —
it will claim a card is white in dark mode while its text colour has already
flipped. Trust screenshots over computed-style probes, and take two: the first
often catches a 180ms transition mid-flight.

### Auth and guest gating

- Guest = `!user` (null when not signed in)
- Guest gate modals follow the pattern established in `StudyQuiz.tsx`:
  - Fixed backdrop with blur + `onClick` to close
  - Inner `<section>` with `onClick={(e) => e.stopPropagation()}`
  - CSS variables scoped on the modal element to match the StudyQuiz purple palette
- localStorage keys must use the prefix `learnmicrobes_`
- Existing auth remember-me storage currently uses legacy `lm_` keys (`lm_remember_me`, `lm_session_marker`); do not rename them casually without a migration-safe plan.
- Do not store sensitive data in localStorage

### Git and deployment

- **Never use GitHub Desktop** to commit files written by a coding agent — it causes LF→CRLF truncation that silently corrupts files mid-content
- Always commit via terminal:
  ```
  git add <specific files by name>
  git commit -m "descriptive message"
  git push origin main
  ```
- Never use `git add .` or `git add -A` — always stage specific files
- Do not commit the `.claude/` directory
- Do not commit or push unless explicitly instructed
- After pushing, verify the GitHub Actions build passes before reporting the task done

### Service worker

`public/sw.js` is registered from `src/index.tsx` **in production only**. In
development the bundler serves unhashed URLs such as `/static/js/bundle.js`, so a
cached copy shadows every code change and makes it look like edits are not taking
effect. The dev branch actively unregisters any leftover worker and clears its
caches, so a stale local state heals itself on the next visit.

Caching strategy, and why each part matters:

- **Navigations** are network-first with the cached shell as offline fallback, so a
  release reaches people immediately.
- **`/static/`** is cache-first — that output is content-hashed, so a new release
  produces new URLs and cannot go stale.
- **Everything else same-origin** is stale-while-revalidate, so it self-heals within
  one visit even though the URL never changes.
- **Cross-origin and non-GET requests are skipped entirely** — Supabase and
  analytics are never intercepted.

`CACHE_VERSION` only needs bumping when the *strategy* changes, not per deploy.

**If a change "isn't appearing," suspect the worker before the code.** Verify what
the server is actually sending (`curl -s localhost:3000/static/js/bundle.js | grep
<your new string>`) before debugging CSS specificity or React state. To clear it:

```js
const r = await navigator.serviceWorker.getRegistrations();
const c = await caches.keys();
await Promise.all(r.map(x => x.unregister()));
await Promise.all(c.map(n => caches.delete(n)));
location.reload();
```

---

## Testing and verification

After any change, run:

```bash
npm run build
```

The build must output `Compiled successfully` with zero errors before any commit.

For any CSS file you touched, verify brace balance before committing:

```js
node -e "const fs=require('fs');const s=fs.readFileSync('<file>','utf8');const o=(s.match(/\{/g)||[]).length;const c=(s.match(/\}/g)||[]).length;console.log('balance:',o-c);"
```

Balance must be `0`. A non-zero balance means the file is truncated or malformed — do not commit.

After pushing to `main`, confirm the GitHub Actions workflow (`Deploy React App to GitHub Pages`) completes with `conclusion: success` via:

```
GET https://api.github.com/repos/learnmicrobes/learnmicrobes-web/actions/runs?per_page=3
```

---

## Content safety and privacy

- Never store passwords, payment data, or PII beyond what Supabase auth handles natively
- Never expose the Supabase service role key in frontend code — only `REACT_APP_SUPABASE_ANON_KEY` (publishable) is safe client-side
- Any user-generated content rendered as HTML must be sanitized with DOMPurify before rendering
- Do not add third-party analytics, tracking scripts, or ad tech without explicit approval
- The user base includes students — avoid collecting unnecessary personal data

---

## Marketing and copy tone inside the app

- Write for a student who is **new to the bench and may be nervous** — be clear, not condescending
- Use plain language — define jargon before using it
- CTAs should be action-oriented: "Build workup path", "Start roadmap", "Open bench card"
- Never use hype language: "revolutionary", "AI-powered", "instant results", "guaranteed"
- ASCP framing: "review" and "prep" are fine — never imply guaranteed pass rates or official affiliation
- Avoid exclamation points in instructional copy — maintain a calm, professional tone throughout

---

## Future expansion guidance

When adding new features, follow these existing patterns:

| Feature type | Pattern to follow |
|---|---|
| New tool | `RoadmapExperience.tsx` or `UnknownIsolateWorkup.tsx` structure |
| New Visual Atlas bench card | `VisualAtlas.tsx` — add to `atlasPages`, extend `visualType` union, add SVG render function |
| New Learn topic | `learnTopics` data structure in `src/data/learnTopics.ts` |
| New guest gate | `StudyQuiz.tsx` modal pattern + localStorage counter with `learnmicrobes_` prefix |
| New route | Register in `src/Routes.tsx`; add SEO metadata entry in `App.tsx` `routeMetadata`; check dashboard search and global search if the route should be discoverable |
| New CSS component | Scope to component class, use existing CSS variables, include dark mode overrides |

**Planned / early feature surfaces — do not expand without explicit instruction:**

- Flashcards
- Case Study Simulator (full implementation)
- Detailed Certification Study Paths beyond the current early route
- Backend API / server-side features
- Push notifications
- Native mobile app
- Payment / premium tier
