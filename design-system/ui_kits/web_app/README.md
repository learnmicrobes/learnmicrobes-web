# Learn Microbes — Web App UI kit

A high-fidelity, click-through recreation of the **Learn Microbes** product
(the `learnmicrobes-web` React app). It composes the design-system primitives —
it does not re-implement them.

## Run
Open `index.html`. It loads the compiled `_ds_bundle.js`, Font Awesome 6.4.0, and
the screen files below, then renders an interactive shell.

## Screens
- **`NavBar.jsx`** — sticky teal top nav (brand lockup, links, theme toggle,
  create-account CTA).
- **`HomeScreen.jsx`** — the home dashboard: cover hero over `assets/bench-cover.png`
  with the paper gradient, search, the "What are you trying to do?" chooser, the
  start-here paths, the 6-up action grid, a start-path panel with stat chips, and a
  featured `BenchCard`.
- **`ToolsScreen.jsx`** — the ToolBox grid: bench tools & branching ID roadmaps,
  each with its semantic accent rule (Gram-positive purple, Gram-negative red,
  anaerobe blue, biochem orange, safety reds).
- **`LearnScreen.jsx`** — Learn hub (sequenced topic cards) and Visual atlas
  (framed specimen tiles), switched by `mode`.
- **`PracticeScreen.jsx`** — interactive pop-quiz using `QuizOption`: pick an
  answer → reveal the reasoning + the "Don't confuse it with" trap → next question.

## Interactions
Nav switches views; action/tool/topic cards route between screens; the quiz is
fully playable; cards show the calm hover rise.

## Fidelity notes
Real product copy and structure were lifted from `learnmicrobes-web/src/App.tsx`
and `App.css` (dashboard actions, start paths, tool accents). Visuals follow the
shipped teal nav, warm-paper surfaces, and soft rounded cards. Atlas plate imagery
uses CSS placeholders where real bench photos would go.
