# PROJECT STATUS

Last refreshed: 2026-06-13

## 1. Project Purpose and Current Website Scope

`Learn Microbes` is a bench-first clinical microbiology learning platform for MedTech/MLS students, ASCP/AMT reviewees, new bench learners, and working medical technologists.

The product is a learning companion and bench reference, not a diagnostic system. Every feature should reinforce the core clinical microbiology reasoning flow:

`specimen/source -> Gram stain -> morphology -> media -> key tests -> safest next step`

The learner-facing questions remain:

- What am I looking at?
- Why does it matter?
- What do I do next?

The site must stay educational and humble: it is not medical advice, not a replacement for laboratory SOPs, and not official ASCP/AMT guidance.

## 2. Tech Stack, Framework, and Important Libraries

- Framework: `React 18`
- Language: `TypeScript`
- App scaffold/build: Create React App / `react-scripts`
- Routing: `react-router-dom` v6
- Icons:
  - `@fortawesome/react-fontawesome`
  - `@fortawesome/free-solid-svg-icons`
  - external Font Awesome stylesheet in `public/index.html`
- Auth/database: Supabase
  - email/password auth
  - Google OAuth
  - Postgres tables for profiles, bookmarks, Learn progress, and quiz attempts
- Sanitization: `dompurify`
  - currently used in the enterics biochemical calculator where generated HTML is rendered
  - must be used for any future user-supplied HTML
- Deployment: GitHub Pages via `.github/workflows/main.yml`
  - push to `main`
  - Node 20
  - `npm install`
  - `npm run build`
  - deploy `./build` through GitHub Pages

Package scripts:

- `npm start`
- `npm run build`
- `npm test`
- `npm run eject`

No `lint` script is currently defined.

## 3. Current Folder/File Structure and Key File Roles

Project root:

- `AGENTS.md`: primary coding-agent instruction file and product philosophy.
- `PROJECT_STATUS.md`: this handoff/status file.
- `package.json`: scripts and dependencies.
- `.github/workflows/main.yml`: GitHub Pages deployment workflow.
- `public/`: static assets, HTML shell, manifest, sitemap, service worker, favicon/logo assets.
- `src/`: application code.
- `supabase/`: SQL migrations and database notes.
- `build/`: generated production build output. Do not edit by hand.
- Root extraction/helper files such as `extract_pdf_*.js`, `extracted-*.txt`, and related scripts are content-work artifacts. Do not delete them without explaining why first.

Important `src/` files:

- `src/index.tsx`
  - app bootstrap
  - wraps routes in `BrowserRouter` and `AuthProvider`
  - registers `public/sw.js`
- `src/Routes.tsx`
  - central route definitions
  - mounts `App` as the shell and nests all feature pages inside it
- `src/App.tsx`
  - primary shell, nav, home dashboard, route-aware SEO metadata, dashboard search, daily riddle, featured bench card, auth menu, dark mode, footer
- `src/App.css`
  - large app-shell stylesheet with homepage/nav/footer styling and many dark-mode rules
- `src/styles.css`
  - global variables and older global styles
  - includes the Lab Notebook primary color foundation
- `src/lib/supabaseClient.ts`
  - reads `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
  - exports nullable Supabase client and configuration flag
- `src/context/AuthContext.tsx`
  - central auth context
  - `const { user } = useAuth()` is the guest/auth split; guest is `!user`
- `src/utils/authRedirect.ts`
  - safe redirect helpers for auth gates
- `src/utils/analytics.ts`
  - thin wrapper around `window.gtag`

Important data/content files:

- `src/data/learnTopics.ts`
  - main Learn article corpus
- `src/data/learnExpansionTopics.ts`
  - additional searchable Learn-style topics; used by global search
- `src/data/questionBank.ts`
  - Study Quiz question bank
- `src/data/glossaryData.ts`
  - glossary content
- `src/data/searchAliases.ts`
  - search synonym/alias support
- `src/tools/BiochemicalTests/biochemicalData.ts`
  - biochemical test reference data
- Roadmap data:
  - `src/tools/GramPositiveRoadmap/data.ts`
  - `src/tools/GramNegativeRoadmap/gnrdata.ts`
  - `src/tools/ObligateAnaerobeRoadmap/anaerobedata.ts`
- `src/components/VisualAtlas/VisualAtlas.tsx`
  - Visual Atlas content data, visual type union, and inline SVG render functions

Important feature folders:

- `src/components/Learn/`
  - Learn hub and Learn article views
- `src/components/VisualAtlas/`
  - Visual Atlas UI and card rendering
- `src/components/Guides/`
  - older guide library with `?guide=` deep links
- `src/components/Search/`
  - global search
- `src/components/Auth/`
  - sign in, create account, password reset/update, Google OAuth
- `src/components/Account/`
  - profile, saved progress, bookmarks, quiz history
- `src/components/Practice/`
  - practice hub
- `src/components/ASCPReview/`
  - ASCP review hub
- `src/tools/RoadmapExperience/`
  - shared roadmap experience, persistence, guest gating, keyboard/detail modes

## 4. Major Routes and Built Areas

Routes are registered in `src/Routes.tsx`.

Core public routes:

- `/`
  - home dashboard with hero search, daily riddle, featured bench card, and start-here paths
- `/learn`
  - Learn hub
- `/learn/:slug`
  - Learn article pages
- `/visuals`
  - Visual Atlas
- `/visuals/:slug`
  - Visual Atlas individual card/deep link
- `/guides`
  - older guide library with query-param deep links
- `/search`
  - global search across Learn, expanded topics, guides, biochemical tests, atlas cards, and roadmap content
- `/about`, `/mission`, `/faq`, `/disclaimer`, `/terms`, `/privacy`
  - informational pages

Tools/reference routes:

- `/biochemical-calculator`
  - enterics biochemical calculator and quiz mode
- `/biochemical-tests`
  - biochemical test reference
- `/gram-positive-roadmap`
- `/gram-negative-roadmap`
- `/obligate-anaerobe-roadmap`
- `/unknown-isolate-workup`
- `/special-pathogens`
- `/do-not-routine-culture`
- `/syndrome-diagnostic-path`

Practice/account routes:

- `/practice`
  - practice hub
- `/study-quiz`
  - Study Quiz with guest limit, persistence, missed review, and leaderboard modal
- `/ascp-microbiology-review`
  - ASCP review hub
- `/certification-study-paths`
  - early/active certification study path page with quiz modal behavior
- `/case-study-simulator`
  - planned/early route
- `/flashcards`
  - planned/early route
- `/auth`, `/login`, `/register`
  - auth entry points
- `/account`
  - signed-in study account
- `/join-alpha`
  - alpha/beta validation route

## 5. Current Feature Set

### Home dashboard

- Hero search powered by a local index in `App.tsx`
- Daily microbe riddle stored by date in localStorage
- Featured bench card
- Start-here paths for new learners, ASCP review, bench workflow, and biochemical help
- Mobile home-screen hint
- Alpha validation CTA

### Learn hub/articles

- Learn hub groups topics by study area.
- Article pages include:
  - breadcrumbs and next/previous study navigation
  - basic workflow, key clues, common traps, student shortcut
  - tables where useful
  - related Visual Atlas cards when matching content exists
  - progress and bookmark actions for signed-in users
- Learn progress uses Supabase `learn_progress` for signed-in users, with local mastered-topic fallback behavior in the UI.

### Visual Atlas

- Large original visual card system in `src/components/VisualAtlas/VisualAtlas.tsx`.
- Includes bacteriology biochemical reaction cards plus parasitology, mycology, and virology-style visual cards.
- Uses inline SVG/CSS visuals and DIVR-style readouts where present.
- Supports individual `/visuals/:slug` routes and signed-in bookmarks.

### Tools

- Shared roadmap experience powers:
  - Gram Positive Roadmap
  - Gram Negative Roadmap
  - Obligate Anaerobe Roadmap
- Unknown Isolate Workup exists as a bench-first workflow builder.
- Biochemical Tests reference exists with a large static data set.
- Enterics Biochemical Calculator exists and uses DOMPurify for rendered HTML output.
- Special Pathogens Hub and Do Not Routine Culture safety content exist.
- Syndrome Diagnostic Path exists as an additional tool route.

### Practice and review

- Study Quiz uses `src/data/questionBank.ts` plus generated roadmap questions.
- Guest Study Quiz limit is 15 answered questions.
- Signed-in quiz attempts save to Supabase `quiz_attempts`.
- Leaderboard modal reads Supabase data when available and falls back gracefully.
- Practice hub links Study Quiz, ASCP Review Hub, and planned/early case/flashcard routes.
- ASCP Review Hub exists and keeps an independent educational-review disclaimer.
- Certification Study Paths has an active route and changelog, but should still be treated carefully as an early feature surface.

### Auth/account

- Supabase auth supports email/password and Google OAuth.
- Account page reads/writes profile data and shows saved study data.
- Signed-in account features include:
  - profiles
  - Learn bookmarks
  - Visual Atlas bookmarks
  - Learn progress
  - quiz history and weak areas

### Guest soft-gating

- Roadmaps: guest modal after 5 endpoints per roadmap.
- Unknown Isolate Workup: guest modal after 3 reviewed paths.
- Study Quiz: guest modal after 15 answered guest questions.
- Guest modal pattern should follow `StudyQuiz.tsx` unless a specific feature already has an established local variant.

## 6. Styling and Design System State

The intended direction is the Lab Notebook palette:

- warm paper-like backgrounds
- deep ink text
- teal/blue-green primary (`--primary-color: #245c69`)
- restrained accent colors
- clean, clinical, student-friendly UI

Current styling reality is mixed:

- `src/styles.css` has shared variables and older global styles.
- `src/App.css` is large and includes both newer dashboard/nav styling and broad dark-mode overrides.
- Component CSS files are scoped by feature, but not all are fully migrated to the Lab Notebook palette.
- Tool-specific CSS still contains legacy colors and should be migrated carefully.
- Primary mobile breakpoint is `max-width: 768px`; secondary is `max-width: 480px`.

## 7. Supabase and Data Persistence

Frontend env vars:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

Do not inspect, edit, or commit `.env`.

Supabase tables documented in `supabase/README.md`:

- `profiles`
- `bookmarks`
- `learn_progress`
- `quiz_attempts`

Security model:

- RLS is enabled.
- Users should only access their own rows.
- Anonymous users should not read/write table rows directly.
- Public leaderboard access is intentionally through the `get_study_quiz_leaderboard(row_limit)` function.

Before expanding backend features, prioritize Supabase security/migration cleanup:

- keep migrations immutable after production use
- verify RLS policies before adding new account data
- avoid service-role keys in frontend code
- review function permissions before adding RPCs
- prefer small forward migrations over editing old SQL

## 8. Important Implementation Conventions

Content/source handling:

- User-facing content must be original writing.
- Textbooks or extracted source material are internal planning inputs only.
- Do not surface "Chapter X" framing in UI/data that renders to users.
- Keep the educational disclaimer posture: no diagnostic authority, no guaranteed exam outcomes, no official ASCP/AMT affiliation.

Routing:

- Add new routes in `src/Routes.tsx`.
- Add/update route metadata in `src/App.tsx` `routeMetadata` or dynamic metadata logic.
- Check Global Search if a new content area should be discoverable.

Search:

- Global Search is manually assembled in `src/components/Search/GlobalSearch.tsx`.
- Dashboard search is separately assembled in `src/App.tsx`.
- When adding/renaming Learn topics, Visual Atlas cards, tools, or guide entries, check both search surfaces if relevant.

Auth:

- Guest state is `!user`.
- Use `buildAuthRedirectPath()` for auth-gated redirects.
- Account features should degrade gracefully if Supabase is not configured.

Local storage:

- New localStorage keys should use the `learnmicrobes_` prefix.
- Existing auth "remember me" keys currently use `lm_remember_me` and `lm_session_marker`; this inconsistency is a known cleanup candidate, not something to casually rename without migration thought.
- Do not store sensitive data in localStorage.

Sanitization:

- DOMPurify is available.
- Any future user-generated HTML or generated HTML rendered with `dangerouslySetInnerHTML` must be sanitized.

Git/deploy:

- Do not commit unless explicitly instructed.
- Do not use `git add .` or `git add -A`; stage specific files.
- Do not commit `.claude/`.
- Do not use GitHub Desktop for agent-authored commits.
- After pushing to `main`, verify the GitHub Pages workflow succeeds before calling deployment done.

## 9. Known Bugs, Rough Edges, and Risks

- Current working tree has pre-existing modified source files:
  - `src/components/VisualAtlas/VisualAtlas.tsx`
  - `src/tools/StudyQuiz/StudyQuiz.tsx`
  Treat these as user/work-in-progress changes and do not overwrite or revert them without explicit permission.
- Styling is split between newer Lab Notebook surfaces and older global/tool styles.
- `src/styles.css` and `src/App.css` still carry broad legacy/global rules.
- localStorage key naming is inconsistent:
  - required/new prefix: `learnmicrobes_`
  - existing auth remember-me keys: `lm_remember_me`, `lm_session_marker`
- Some content/data contains encoding artifacts such as `35Â°C`; these should be cleaned in a focused encoding/content pass.
- Root directory is noisy with extraction/helper/generated files from content work.
- Search can drift because dashboard search and global search are separate manual indexes.
- Some search guide entries may point to older `/guides?guide=` ids or content not mirrored in the newer Learn hub.
- `public/index.html` loads Google Analytics directly; AGENTS.md says not to add analytics/tracking without explicit approval, so any analytics changes should be deliberate and reviewed.
- Supabase security/migration cleanup should remain a priority before backend expansion.
- `@types/react` and `@types/react-dom` are version 19 while runtime React is 18. This may be harmless today but is worth watching if type issues appear.
- No lint script is configured.
- Automated test coverage appears limited to the default CRA test command; feature verification is mostly build/manual review.

## 10. Build, Test, and Verification Status

Required after any code change:

```bash
npm run build
```

Expected successful build output should include `Compiled successfully`.

For any touched CSS file, run the brace-balance check from `AGENTS.md`:

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('<file>','utf8');const o=(s.match(/\{/g)||[]).length;const c=(s.match(/\}/g)||[]).length;console.log('balance:',o-c);"
```

Additional commands:

- `npm start` for local development.
- `npm test` for CRA test runner.

No `npm run lint` command exists.

## 11. Current Best Next Steps

Recommended near-term priorities:

1. Finish documentation review and keep future agents oriented around the current app, not the older guide-only state.
2. Continue Lab Notebook theme migration across tool-specific CSS, especially:
   - `src/tools/BiochemicalTests/*`
   - `src/tools/BioCalculator/*`
   - `src/tools/RoadmapExperience/*`
   - roadmap variant CSS files
3. Do a focused encoding/content cleanup pass for visible artifacts like `35Â°C`.
4. Reconcile localStorage key naming with a migration-safe approach.
5. Review Supabase migrations/RLS/function permissions before adding any new backend-backed features.
6. Improve search consistency between Learn, Guides, Visual Atlas, dashboard search, and global search.
7. Only after the above, expand early routes such as flashcards, case simulator, and certification study paths.

## 12. Files Not To Touch Casually

- `.env` and any secrets.
- `build/` output.
- root extraction/generated content files unless the cleanup is explicitly requested.
- pre-existing modified source files unless the task directly asks for them:
  - `src/components/VisualAtlas/VisualAtlas.tsx`
  - `src/tools/StudyQuiz/StudyQuiz.tsx`
