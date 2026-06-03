# StudyQuiz UI Changelog

- Redesigned the quiz page with glass-style panels, calmer controls, larger answer cards, gradient primary actions, and dark-mode-ready states.
- Added student momentum features: set progress bar, persisted streak/best-streak counters, optional timed mode, and CSS confetti for correct answers.
- Improved accessibility with ARIA progress bars, live answer feedback, `aria-pressed` button states, stronger focus rings, and clearer color contrast.
- Added localStorage keys for UI-only progress preferences: `learnmicrobes_study_quiz_streak`, `learnmicrobes_study_quiz_best_streak`, and `learnmicrobes_study_quiz_timed_mode`.
- Added a responsive two-column desktop layout, circular score badge, pill-style category/difficulty toggles, slide-out missed-review drawer, dark-mode toggle, and static freemium leaderboard preview modal.
- Added documented placeholder leaderboard data shape for future `/api/study-quiz/leaderboard` integration once auth, accounts, and subscription logic are ready.
