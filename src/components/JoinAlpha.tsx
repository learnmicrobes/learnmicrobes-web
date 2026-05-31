import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faClipboardList, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from '../config/forms';
import { trackEvent } from '../utils/analytics';
import './JoinAlpha.css';

const alphaFormFields = [
  'Email',
  'Role',
  'Country',
  'Exam goal',
  'Hardest microbiology topic',
  'Optional feedback'
];

const openExternalForm = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const JoinAlpha: React.FC = () => {
  const handleJoinAlpha = () => {
    trackEvent('join_alpha_click', {
      location: 'join_alpha_page',
      destination: ALPHA_SIGNUP_FORM_URL
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedback = () => {
    trackEvent('feedback_click', {
      location: 'join_alpha_page',
      destination: FEEDBACK_FORM_URL
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  return (
    <section className="join-alpha-page" aria-labelledby="join-alpha-title">
      <span className="join-alpha-badge">Alpha access</span>
      <h1 id="join-alpha-title">Help shape Learn Microbes.</h1>
      <p className="join-alpha-notice">
        Learn Microbes is currently in alpha. Account sync and user accounts are not active yet. Join the alpha
        tester list to get updates and help shape the product. Tell us in the form whether saved progress or
        bookmarks would help your study workflow.
      </p>

      <div className="join-alpha-actions">
        <button type="button" className="join-alpha-primary" onClick={handleJoinAlpha}>
          <FontAwesomeIcon icon={faClipboardList} />
          Join the Alpha Tester List
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="join-alpha-external-icon" />
        </button>
        <button type="button" className="join-alpha-secondary" onClick={handleFeedback}>
          <FontAwesomeIcon icon={faCommentDots} />
          Send Feedback
        </button>
      </div>

      <div className="join-alpha-form-note">
        <h2>The alpha form will collect</h2>
        <ul>
          {alphaFormFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JoinAlpha;
