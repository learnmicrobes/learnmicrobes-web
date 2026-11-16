import React from 'react';
import { ALPHA_SIGNUP_FORM_URL, FEEDBACK_FORM_URL } from '../../config/forms';
import { trackEvent } from '../../utils/analytics';
import './AlphaValidationCTA.css';

type AlphaValidationCTAProps = {
  location: string;
  title?: string;
  body?: string;
};

const openExternalForm = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const AlphaValidationCTA: React.FC<AlphaValidationCTAProps> = ({
  location,
  title = 'Help shape Learn Microbes',
  body = 'Create an account to save progress, bookmarks, and quiz history. Use the sign-up form to tell us your role, study goal, hardest topic, and what we should build next.'
}) => {
  const handleJoinAlpha = () => {
    trackEvent('alpha_join_clicked', {
      location,
      destination: ALPHA_SIGNUP_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location,
      form_name: 'beta_tester_form'
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedback = () => {
    trackEvent('feedback_clicked', {
      location,
      destination: FEEDBACK_FORM_URL
    });
    trackEvent('lead_form_viewed', {
      location,
      form_name: 'feedback_form'
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  return (
    <section className="alpha-validation-cta" aria-label={title}>
      <div>
        <span>Feedback</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="alpha-validation-actions">
        <button type="button" onClick={handleJoinAlpha}>Join the Lab List</button>
        <button type="button" onClick={handleFeedback}>Send feedback</button>
      </div>
    </section>
  );
};

export default AlphaValidationCTA;
