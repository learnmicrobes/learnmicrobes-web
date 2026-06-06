import React from 'react';
import { Link } from 'react-router-dom';
import './PracticePage.css';

const practiceLinks = [
  {
    label: 'Study Quiz',
    detail: 'Practice exam-style microbiology questions and save quiz history.',
    path: '/study-quiz',
    status: 'Active'
  },
  {
    label: 'ASCP Review Hub',
    detail: 'Start an ASCP microbiology review loop with study paths, quizzes, visuals, and bench references.',
    path: '/ascp-microbiology-review',
    status: 'Active'
  },
  {
    label: 'Case Study Simulator',
    detail: 'ASCP-style clinical microbiology case practice — step through a specimen, observations, and differential.',
    path: '/case-study-simulator',
    status: 'Planned'
  },
  {
    label: 'Flashcards',
    detail: 'Rapid-recall flashcard practice for organism ID, biochemical tests, and bench interpretation patterns.',
    path: '/flashcards',
    status: 'Planned'
  }
];

export default function PracticePage() {
  return (
    <main className="practice-page">
      <section className="practice-hero" aria-labelledby="practice-title">
        <span className="practice-kicker">Practice</span>
        <h1 id="practice-title">Quiz and simulator practice</h1>
        <p>
          Active recall tools for MLS students and ASCP review. Use the quiz and review hub now — case simulator and flashcards are in development.
        </p>
      </section>

      <section className="practice-grid" aria-label="Practice options">
        {practiceLinks.map((item) =>
          item.status === 'Active' ? (
            <Link className="practice-card" to={item.path} key={item.path}>
              <span className="practice-card-badge practice-card-badge--active">{item.status}</span>
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </Link>
          ) : (
            <div className="practice-card practice-card--planned" key={item.path} aria-disabled="true">
              <span className="practice-card-badge practice-card-badge--planned">Coming Soon</span>
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </div>
          )
        )}
      </section>
    </main>
  );
}
