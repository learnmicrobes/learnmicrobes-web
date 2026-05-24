# PROJECT STATUS

## 1. Project Purpose and Current Website Scope

`Learn Microbes` is a student-first educational web app for microbiology learners, especially students and new medical technologists. The current site is positioned as a `learning companion + bench reference`, not just a static lookup tool.

Current scope:

- Home page with onboarding-focused hero and tool entry cards
- `Guides` library for core microbiology foundations, bench workflows, and interpretation shortcuts
- Interactive diagnostic tools:
  - Enterics biochemical calculator
  - Gram-positive roadmap
  - Gram-negative roadmap
  - Obligate anaerobe roadmap
- Biochemical test reference pages
- Global search across guides, tests, and roadmap content
- About page
- Branding assets, favicon, responsive nav, and theme toggle

The product direction is currently centered on helping learners understand:

- what they are looking at
- why it matters
- what to do next

ASCP/premium prep is intentionally deferred for later.

## 2. Tech Stack, Framework, and Important Libraries

- Framework: `React 18`
- Language: `TypeScript`
- App scaffold/build: `react-scripts` / Create React App
- Routing: `react-router-dom`
- Icons:
  - `@fortawesome/react-fontawesome`
  - `@fortawesome/free-solid-svg-icons`
  - external Font Awesome stylesheet in `public/index.html`
- Sanitization dependency present: `dompurify`

Package info from `package.json`:

- App/package name: `biochemical-calculator`
- Scripts:
  - `npm start`
  - `npm run build`
  - `npm test`
  - `npm run eject`
- No `lint` script is currently defined

## 3. Current Folder/File Structure and Key File Roles

Project root:

- `package.json`: scripts and dependencies
- `public/`: static assets, favicon/logo, HTML shell, manifest
- `src/`: application code
- `build/`: last production build output
- `PROJECT_STATUS.md`: this handoff file

Important `src/` files:

- `src/index.tsx`
  - app bootstrap
- `src/Routes.tsx`
  - central route definitions
  - mounts `App` as shell and nests tool/guide pages inside it
- `src/App.tsx`
  - primary app shell
  - top nav
  - hamburger menu
  - settings menu
  - dark mode persistence
  - home page hero and tool cards
  - footer and scroll-to-top button
- `src/App.css`
  - main app shell, nav, hero, card, footer, and some legacy styling
- `src/styles.css`
  - global styles and current shared color variables
  - starting point for the newer `Lab Notebook` palette

Important `src/components/` areas:

- `src/components/Guides/MicroBasics.tsx`
  - the current guide library
  - defines guide data, deep-link handling, visuals, and next-step flow
- `src/components/Guides/MicroBasics.css`
  - guide library layout, cards, sidebar, diagrams, next-step styling
- `src/components/Search/GlobalSearch.tsx`
  - manual search index across tests, guides, and roadmap entries
- `src/components/Search/GlobalSearch.css`
  - search UI styling
- `src/components/ToolBox/ToolBox.css`
  - shared toolbox shell for inner pages
- `src/components/About.tsx`
  - about page
- `src/components/NotFound.tsx`
  - fallback route

Important `src/tools/` areas:

- `src/tools/BioCalculator/`
  - Enterics biochemical calculator
- `src/tools/BiochemicalTests/`
  - biochemical test reference system
  - includes `biochemicalData`
- `src/tools/GramPositiveRoadmap/`
  - Gram-positive roadmap logic/data
- `src/tools/GramNegativeRoadmap/`
  - Gram-negative roadmap logic/data
- `src/tools/ObligateAnaerobeRoadmap/`
  - obligate anaerobe roadmap logic/data

Important `public/` files:

- `public/index.html`
  - HTML shell
  - favicon/logo/meta tags
- `public/manifest.json`
  - manifest
- `public/brand-mark.svg`
  - current brand mark
- `public/logo-full.svg`
  - current wordmark logo
- `public/favicon.svg`
  - current favicon

## 4. Features Already Completed

### Navigation and shell

- Responsive top navigation
- Hamburger menu for smaller screens
- Dedicated `Settings` button in nav
- Theme toggle moved into settings dropdown
- Scroll-to-top button
- Footer with social/contact links

### Branding

- Temporary branded SVG logo/brand mark added
- SVG favicon wired into app
- Navbar branding replaced with project-specific assets

### Home page / onboarding

- Homepage reframed around student-first learning
- Dedicated `Start Here: Intro to Microbiology` home card
- Hero quick links added
- Separate overly large learning-path block removed
- Compact `How to start` strip embedded into hero

### Guides system

`Guides` was expanded from a thin starter page into a real guide library with grouped navigation and deep links.

Current guide categories:

- `Core Basics`
- `Bench Workflows`
- `Interpretation`

Current guide modules in `MicroBasics.tsx` include:

- `intro-to-microbiology`
- `microbial-taxonomy`
- `bacterial-cell-structure`
- `host-microorganism-interactions`
- `laboratory-safety-basics`
- `specimens`
- `gram-stain`
- `media`
- `atmosphere`
- `blood-culture`
- `urine-culture`
- `gram-positive-id`
- `enterics`

### Educational visuals

Simple teaching visuals were added directly in the guides using HTML/CSS and inline SVG:

- taxonomy ladder
- Gram-positive vs Gram-negative envelope visual
- microscopy flow visual
- 4-step Gram stain sequence

The Gram envelope visual was iterated multiple times for readability:

- cramped inline labels removed
- legend moved outside the drawing
- Gram-positive / Gram-negative labels moved to the bottom
- Gram-negative flagellum adjusted to avoid overlapping the label

### Search

- Global search page implemented
- Search index includes:
  - biochemical tests
  - guide modules
  - roadmap summaries
  - Gram-positive roadmap node/conclusion content

### Student-first content direction

- Textbook-inspired material is being rewritten as original, student-first teaching content
- User-facing guide copy was explicitly cleaned to avoid `Chapter 1`, `Chapter 2`, etc. phrasing
- Current pattern favors:
  - short summaries
  - highlights
  - concept cards
  - visual summaries
  - next-step links

## 5. Features Currently In Progress

### 1. Theme migration

The app is in a partial transition to a warmer `Lab Notebook` palette.

Already migrated:

- shared variables in `src/styles.css`
- app shell / homepage / nav in `src/App.css`
- guide surfaces in `src/components/Guides/MicroBasics.css`
- toolbox shell in `src/components/ToolBox/ToolBox.css`

Not fully migrated yet:

- tool-specific CSS in calculator/roadmap/test areas
- some legacy colors still hardcoded in older stylesheets

### 2. Foundation content expansion

The guide library is actively expanding chapter-by-chapter from the source material, but translated into original student-first modules.

Current focus has been:

- foundations
- specimen/safety
- microscopy/staining

### 3. Visual system refinement

Simple diagrams are now part of the product direction, but only a few modules currently have dedicated visuals.

## 6. Important Design/UI Decisions Already Made

- The site should feel like a `learning companion`, not just a reference dump.
- Homepage should not stack multiple large onboarding blocks that repeat the same message.
- `Start Here` should be surfaced prominently on the home page, not hidden only inside `Guides`.
- `Guides` remains the library, but the home page is the primary onboarding entry point.
- Use simple, instructional visuals instead of custom artwork-heavy illustrations.
- For compact diagrams, keep labels outside the drawing when readability is at risk.
- The preferred palette direction is `Lab Notebook`:
  - warmer paper-like background
  - deeper ink text
  - teal/blue-green primary
  - restrained accent usage
- Maintain a clean, professional, educational look over flashy UI.

## 7. Important Implementation Decisions, Conventions, and Patterns to Preserve

### Content/source handling

- Textbook chapters are an `internal planning input only`.
- Do `not` expose `Chapter X` language in user-facing copy.
- Keep wording original to avoid plagiarism/copyright risk.
- Credit/source thinking can be acknowledged later, but content should not read like reproduced textbook structure or prose.

### Guide structure

Guides currently follow a repeatable pattern:

- `id`
- `label`
- `category`
- `title`
- `summary`
- `highlights`
- optional `cards`
- `sections`
- optional module-specific visuals
- `What To Do Next` navigation

### Deep linking

- Guide routing uses `/guides?guide=<guide-id>`
- `MicroBasics.tsx` reads the query param and updates state from it

### Search indexing

- Search entries are manually curated in `src/components/Search/GlobalSearch.tsx`
- If a guide is added or renamed, search likely needs a matching manual update

### Visual implementation

- Prefer lightweight HTML/CSS or inline SVG diagrams
- Use visuals to reduce reading burden, not for decoration
- Each visual should teach one concept clearly

### Homepage logic

- One strong hero plus direct entry points is preferred over multiple stacked intro sections
- New learner onboarding should stay compact and visible

## 8. Recently Created or Heavily Modified Files

- `PROJECT_STATUS.md`
  - current project handoff file
- `src/App.tsx`
  - heavily modified for student-first homepage, settings menu, theme toggle, and hamburger nav
- `src/App.css`
  - heavily modified for nav, homepage, mobile behavior, and palette migration
- `src/styles.css`
  - now contains current shared color variables and theme foundation
- `src/components/Guides/MicroBasics.tsx`
  - major center of recent work
  - now acts as the full guide library and contains original teaching content, deep links, and visuals
- `src/components/Guides/MicroBasics.css`
  - extensive guide styling and diagram support
- `src/components/Search/GlobalSearch.tsx`
  - expanded with guide indexing and searchability improvements
- `src/components/ToolBox/ToolBox.css`
  - updated to match the newer palette on shared tool surfaces
- `public/index.html`
  - updated for favicon/logo/meta references
- `public/manifest.json`
  - updated for brand assets
- `public/brand-mark.svg`
  - new temporary brand mark
- `public/logo-full.svg`
  - new temporary logo
- `public/favicon.svg`
  - new temporary favicon

## 9. Known Bugs, Rough Edges, or Unresolved Issues

- The palette migration is incomplete. Some older tool pages likely still use the previous teal-heavy or hardcoded color styling.
- Search entries are partially inconsistent:
  - some guide entries use exact `?guide=` deep links
  - some still use generic `/guides`
- `public/index.html` still contains placeholder/example deployment metadata such as `learnmicrobes.example.com`.
- There are visible encoding artifacts in some file outputs and likely some literal text/icon content:
  - emoji-like strings in `App.tsx`
  - unusual punctuation characters in some metadata/output
  - not necessarily breaking, but worth a cleanup pass later
- `src/styles.css` still contains a large amount of older global and legacy styling mixed with newer variable-driven styles.
- `git` was not available from the shell in this session, so current git status could not be confirmed from tooling.
- There are helper/extraction scripts and extracted text files in the project root from PDF/content work that do not appear to be part of the deployed app. They are not harmful, but the root is noisy.
- Some roadmap/content data files may still contain internal chapter labels/comments or source-mapping traces. Those are fine if never surfaced, but should stay internal.

## 10. Pending TODOs or User Requests Not Yet Completed

- Continue converting source material into student-first guides using the established pattern
- Continue adding simple visuals where they clearly improve comprehension
- Finish broader palette migration across tool-specific pages
- Improve guide/result linking consistency so all guide search results deep-link to the correct module
- Eventually consider:
  - sign-in
  - saved progress/bookmarks
  - freemium/ASCP prep layer
  - backend support

User direction that should still govern future work:

- prioritize students/new learners over ASCP-specific premium prep for now
- keep content original
- keep visuals simple and readable
- avoid clutter and repeated onboarding blocks

## 11. Current Build / Test / Lint Status

### Build

Verified in this session:

- `npm run build`
- Status: `success`

Latest observed output:

- Production build compiled successfully
- Output sizes:
  - `build/static/js/main.cc3d5886.js` at `164.34 kB` gzip
  - `build/static/css/main.1814bb8b.css` at `10.34 kB` gzip

Observed warning:

- Node deprecation warning:
  - `[DEP0176] fs.F_OK is deprecated, use fs.constants.F_OK instead`
- This appears to come from underlying tooling and is currently non-blocking

### Tests

- `npm test` was not run during this status pass
- There is no current evidence of a dedicated automated test suite beyond the default CRA script

### Lint

- No lint script is defined in `package.json`
- Lint status is therefore `not configured via npm script`

## 12. Exact Best Next Step

The single best next task is:

`Continue the Lab Notebook theme migration into the tool-specific CSS files, starting with the biochemical tests, calculator, and roadmap surfaces, so the app stops feeling visually split between the old and new color systems.`

Why this is the best next step:

- the information architecture and guide direction are now much clearer
- the new palette is only partially applied
- a consistent visual system will make the whole site feel more professional before adding more content
- this is lower risk than starting auth/backend and improves the entire product immediately

Suggested starting targets:

- `src/tools/BiochemicalTests/*`
- `src/tools/BioCalculator/*`
- roadmap-related CSS/components under:
  - `src/tools/GramPositiveRoadmap/*`
  - `src/tools/GramNegativeRoadmap/*`
  - `src/tools/ObligateAnaerobeRoadmap/*`
