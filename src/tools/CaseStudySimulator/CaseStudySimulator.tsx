import React from 'react';
import { Link } from 'react-router-dom';
import './CaseStudySimulator.css';

export default function CaseStudySimulator() {
  return (
    <main className="case-simulator-page">
      <section className="case-simulator-card" aria-labelledby="case-simulator-title">
        <span>Planned Practice Tool</span>
        <h1 id="case-simulator-title">Case Study Simulator</h1>
        <p>
          Placeholder for future ASCP-style clinical microbiology case practice.
        </p>
        <Link to="/practice">Back to Practice</Link>
      </section>
    </main>
  );
}

