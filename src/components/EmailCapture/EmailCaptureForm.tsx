import React, { useId, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { trackEvent } from '../../utils/analytics';
import './EmailCaptureForm.css';

export type EmailSignupSource =
  | 'footer'
  | 'quiz_result'
  | 'quiz_gate'
  | 'roadmap_gate'
  | 'workup_gate'
  | 'pro_waitlist';

// Stored with every row so a later change of wording stays honest about what
// each person actually agreed to. Bump the date when the sentence changes.
export const CONSENT_TEXT =
  'Occasional updates about new Atlas content and tools. No spam. Unsubscribe anytime.';
export const CONSENT_TEXT_VERSION = '2026-11-17';

// Matches the CHECK constraint on the table, so the field rejects what the
// database would reject anyway, before a pointless round trip.
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Status = 'idle' | 'sending' | 'done' | 'error';

type EmailCaptureFormProps = {
  source: EmailSignupSource;
  label?: string;
  buttonLabel?: string;
  className?: string;
};

const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  source,
  label = 'Email address',
  buttonLabel = 'Keep me posted',
  className
}) => {
  const fieldId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const address = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(address)) {
      setStatus('error');
      setMessage('That does not look like an email address. Check it and try again.');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setMessage('The list is not reachable right now. Please try again later.');
      return;
    }

    setStatus('sending');
    setMessage('');

    const { error } = await supabase.from('email_signups').insert({
      email: address,
      source,
      consent_text_version: CONSENT_TEXT_VERSION
    });

    // 23505 is the unique violation, meaning this address is already on the
    // list. Saying so would let anyone test whether a given person signed up,
    // so both outcomes look identical from here.
    if (error && error.code !== '23505') {
      setStatus('error');
      setMessage('That did not save. Please try again in a moment.');
      return;
    }

    trackEvent('email_signup_submitted', { source });
    setStatus('done');
    setMessage('You are on the list. Thanks for helping shape what gets built next.');
    setEmail('');
  };

  return (
    <form className={`email-capture ${className ?? ''}`.trim()} onSubmit={handleSubmit} noValidate>
      <label className="email-capture-label" htmlFor={fieldId}>{label}</label>
      <div className="email-capture-row">
        <input
          id={fieldId}
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={status === 'sending'}
          aria-describedby={`${fieldId}-consent`}
        />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : buttonLabel}
        </button>
      </div>
      <p className="email-capture-consent" id={`${fieldId}-consent`}>{CONSENT_TEXT}</p>
      {message && (
        <p
          className={`email-capture-status ${status === 'error' ? 'error' : 'done'}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default EmailCaptureForm;
