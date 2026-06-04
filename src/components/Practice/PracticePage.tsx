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
    detail: 'Future ASCP-style case practice placeholder.',
    path: '/case-study-simulator',
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
          Use this area for active recall, ASCP review loops, and future case-based microbiology practice.
        </p>
      </section>

      <section className="practice-grid" aria-label="Practice options">
        {practiceLinks.map((item) => (
          <Link className="practice-card" to={item.path} key={item.path}>
            <span>{item.status}</span>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

