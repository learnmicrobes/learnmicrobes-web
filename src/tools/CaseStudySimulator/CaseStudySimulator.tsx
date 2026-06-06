import React from 'react';
import { Link } from 'react-router-dom';
import { FEEDBACK_FORM_URL } from '../../config/forms';
import './CaseStudySimulator.css';

const openFeedbackForm = () => {
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
};

export default function CaseStudySimulator() {
  return (
    <main className="case-simulator-page">
      <section className="case-simulator-card" aria-labelledby="case-simulator-title">
        <span>Coming Soon</span>
        <h1 id="case-simulator-title">Case Study Simulator</h1>
        <p>
          Step through a clinical specimen from collection to final identification — reviewing Gram stain morphology, colony observations, biochemical results, and safety flags. Designed for ASCP-style case practice and MLS bench reasoning. Tell us this is useful and it moves up the roadmap.
        </p>
        <div className="case-simulator-actions">
          <button type="button" className="case-simulator-notify-btn" onClick={openFeedbackForm}>
            Tell us you want this
          </button>
          <Link to="/practice">Back to Practice</Link>
        </div>
      </section>
    </main>
  );
}
