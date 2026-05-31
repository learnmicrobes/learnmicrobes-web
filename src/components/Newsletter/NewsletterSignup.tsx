import React from 'react';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from '../../config/forms';
import { trackEvent } from '../../utils/analytics';
import './NewsletterSignup.css';

const openExternalForm = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const NewsletterSignup: React.FC = () => {
  const handleJoinAlpha = () => {
    trackEvent('join_alpha_click', {
      location: 'homepage_lab_list',
      destination: ALPHA_SIGNUP_FORM_URL
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedback = () => {
    trackEvent('feedback_click', {
      location: 'homepage_lab_list',
      destination: FEEDBACK_FORM_URL
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="newsletter-card">
        <div className="newsletter-copy">
          <div className="newsletter-icon-wrap" aria-hidden="true">
            <svg
              className="newsletter-icon"
              viewBox="0 0 96 96"
              role="img"
              focusable="false"
            >
              <rect x="16" y="24" width="48" height="36" rx="10" className="newsletter-envelope" />
              <path d="M22 30 L40 45 L58 30" className="newsletter-envelope-line" />
              <path d="M24 54 L39 42" className="newsletter-envelope-line faint" />
              <path d="M56 54 L41 42" className="newsletter-envelope-line faint" />
              <circle cx="66" cy="58" r="14" className="newsletter-dish" />
              <circle cx="66" cy="58" r="9" className="newsletter-dish-inner" />
              <path d="M69 18 C78 18, 82 24, 82 32 C82 40, 76 46, 68 46" className="newsletter-loop" />
              <path d="M65 44 L62 50" className="newsletter-loop" />
              <circle cx="63" cy="53" r="3.2" className="newsletter-loop-tip" />
              <circle cx="60" cy="56" r="2.1" className="newsletter-colony" />
              <circle cx="70" cy="54" r="2.4" className="newsletter-colony" />
              <circle cx="67" cy="63" r="2" className="newsletter-colony" />
            </svg>
          </div>

          <div className="newsletter-copy-text">
            <span className="newsletter-kicker">Alpha tester list</span>
            <h2 id="newsletter-title">Join the Lab List</h2>
            <p>
              Learn Microbes accounts are not active yet. Join the external alpha list for updates,
              study-tool previews, and a say in what gets built next, including saved progress or bookmarks.
            </p>
          </div>
        </div>

        <div className="newsletter-form-shell">
          <div className="newsletter-form newsletter-alpha-actions" aria-label="Alpha list actions">
            <button type="button" className="newsletter-submit" onClick={handleJoinAlpha}>
              Join Alpha
            </button>
            <button type="button" className="newsletter-feedback-btn" onClick={handleFeedback}>
              Send Feedback
            </button>
            <p id="newsletter-privacy" className="newsletter-privacy">
              Opens an external form. No account or password is required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
