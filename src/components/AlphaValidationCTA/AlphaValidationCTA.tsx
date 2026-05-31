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
  title = 'Help shape Alpha 1.1',
  body = 'Tell us what would help most next, including whether saved progress, bookmarks, or study history would be useful.'
}) => {
  const handleJoinAlpha = () => {
    trackEvent('join_alpha_click', {
      location,
      destination: ALPHA_SIGNUP_FORM_URL
    });
    openExternalForm(ALPHA_SIGNUP_FORM_URL);
  };

  const handleFeedback = () => {
    trackEvent('feedback_click', {
      location,
      destination: FEEDBACK_FORM_URL
    });
    openExternalForm(FEEDBACK_FORM_URL);
  };

  return (
    <section className="alpha-validation-cta" aria-label={title}>
      <div>
        <span>Alpha feedback</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="alpha-validation-actions">
        <button type="button" onClick={handleJoinAlpha}>Join Alpha</button>
        <button type="button" onClick={handleFeedback}>Send Feedback</button>
      </div>
    </section>
  );
};

export default AlphaValidationCTA;
