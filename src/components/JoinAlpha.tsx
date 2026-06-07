import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faClipboardList, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from '../config/forms';
import { trackEvent } from '../utils/analytics';
import './JoinAlpha.css';

const betaFormFields = [
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
    trackEvent('alpha_join_clicked', {
      location: 'join_alpha_page',
      destination: ALPHA_SIGNUP_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location: 'join_alpha_page',
      form_name: 'beta_tester_form'
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedback = () => {
    trackEvent('feedback_clicked', {
      location: 'join_alpha_page',
      destination: FEEDBACK_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location: 'join_alpha_page',
      form_name: 'feedback_form'
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  return (
    <section className="join-alpha-page" aria-labelledby="join-alpha-title">
      <span className="join-alpha-badge">Free beta access</span>
      <h1 id="join-alpha-title">Join the Micro Bench Beta.</h1>
      <p className="join-alpha-notice">
        Learn Microbes teaches clinical microbiology the way the bench thinks: specimen clues, Gram stain,
        colony morphology, media, key tests, and safe next steps. Join the beta list to get updates and help shape
        saved progress, bookmarks, quiz history, ASCP review, and future bench workflow tools.
      </p>

      <div className="join-alpha-actions">
        <button type="button" className="join-alpha-primary" onClick={handleJoinAlpha}>
          <FontAwesomeIcon icon={faClipboardList} />
          Join the Micro Bench Beta
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="join-alpha-external-icon" />
        </button>
        <button type="button" className="join-alpha-secondary" onClick={handleFeedback}>
          <FontAwesomeIcon icon={faCommentDots} />
          Send Feedback
        </button>
      </div>

      <div className="join-alpha-form-note">
        <h2>The beta form will collect</h2>
        <ul>
          {betaFormFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JoinAlpha;
