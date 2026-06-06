import React from 'react';
import { Link } from 'react-router-dom';
import { FEEDBACK_FORM_URL } from '../../config/forms';
import './Flashcards.css';

const openFeedbackForm = () => {
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
};

export default function Flashcards() {
  return (
    <main className="flashcards-page">
      <section className="flashcards-card" aria-labelledby="flashcards-title">
        <span>Coming Soon</span>
        <h1 id="flashcards-title">Flashcards</h1>
        <p>
          Rapid-recall flashcard practice for organism identification, biochemical tests, Gram stain patterns, and bench interpretation — built for ASCP review and MLS coursework. Let us know if this would help your study workflow.
        </p>
        <div className="flashcards-actions">
          <button type="button" className="flashcards-notify-btn" onClick={openFeedbackForm}>
            Tell us you want this
          </button>
          <Link to="/practice">Back to Practice</Link>
        </div>
      </section>
    </main>
  );
}
