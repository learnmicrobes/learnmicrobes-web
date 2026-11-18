import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_TEXT } from '../EmailCapture/EmailCaptureForm';
import { supabase } from '../../lib/supabaseClient';
import { trackEvent } from '../../utils/analytics';
import './ProPreview.css';

/**
 * A page that sells nothing. It describes what optional extras might exist one
 * day and asks which of them people would actually want, so the answer comes
 * from learners rather than from a guess. No prices, no checkout, no promises
 * about any certification exam.
 */

type Interest = {
  id: string;
  label: string;
  detail: string;
};

const INTERESTS: Interest[] = [
  {
    id: 'adaptive_mock_exam',
    label: 'Timed adaptive mock exam',
    detail: 'A 100-question microbiology practice exam on a real clock, where each question adjusts to how you are doing. Modeled on the adaptive format, not an official exam or a pass predictor.'
  },
  {
    id: 'unlimited_quizzes',
    label: 'Unlimited quizzes',
    detail: 'Practice past the guest limit without the question count running out.'
  },
  {
    id: 'saved_progress',
    label: 'Saved progress and weak-area tracking',
    detail: 'Your history in one place, with the categories you keep missing surfaced.'
  },
  {
    id: 'case_practice',
    label: 'Case study practice',
    detail: 'Worked bench cases that follow a specimen from Gram stain to next step.'
  },
  {
    id: 'study_packs',
    label: 'Printable study packs',
    detail: 'Bench cards and summaries laid out to print and mark up on paper.'
  }
];

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const NOTE_LIMIT = 1000;

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function ProPreview() {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  // Guarded the way StudyQuiz guards quiz_started: StrictMode mounts effects
  // twice in development, and a view counted twice is a view counted wrong.
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (hasTrackedView.current) {
      return;
    }

    hasTrackedView.current = true;
    trackEvent('pro_page_viewed');
  }, []);

  const toggleInterest = (id: string) => {
    setInterests((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ));
  };

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

    const { error } = await supabase.from('pro_waitlist').insert({
      email: address,
      interests,
      note: note.trim() ? note.trim().slice(0, NOTE_LIMIT) : null
    });

    if (error) {
      setStatus('error');
      setMessage('That did not save. Please try again in a moment.');
      return;
    }

    // Counts only, never the address or what anyone typed.
    trackEvent('pro_waitlist_submitted', { interest_count: interests.length, has_note: Boolean(note.trim()) });
    setStatus('done');
    setMessage('Thanks. Your answers go straight into what gets built next.');
    setEmail('');
    setInterests([]);
    setNote('');
  };

  return (
    <div className="pro-page">
      <header className="pro-hero">
        <span className="pro-kicker">Learn Microbes</span>
        <h1>What's next for Learn Microbes</h1>
        <p>
          Learn Microbes is an educational resource for clinical microbiology, and the
          core of it stays free: the Atlas, the Learn topics, the roadmaps, and the
          bench tools. That is not changing.
        </p>
        <p>
          We are exploring a small set of optional extras for people who study here
          often. Nothing below is built or priced yet, and this page is how we find out
          which of them is worth building at all.
        </p>
      </header>

      <section className="pro-options" aria-labelledby="pro-options-title">
        <h2 id="pro-options-title">What we are considering</h2>
        <ul className="pro-option-list">
          {INTERESTS.map((interest) => (
            <li key={interest.id}>
              <strong>{interest.label}</strong>
              <small>{interest.detail}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="pro-form-panel" aria-labelledby="pro-form-title">
        <h2 id="pro-form-title">Tell us what you would want</h2>
        <p className="pro-form-intro">
          Leave your email to hear when any of this is ready, and tick whatever you
          would actually use. Everything here is optional except the email.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="pro-field-label" htmlFor="pro-email">Email address</label>
          <input
            id="pro-email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={status === 'sending'}
            aria-describedby="pro-consent"
          />
          <p className="pro-consent" id="pro-consent">{CONSENT_TEXT}</p>

          <fieldset className="pro-interests">
            <legend>Which of these would you use?</legend>
            {INTERESTS.map((interest) => (
              <label key={interest.id} className="pro-checkbox">
                <input
                  type="checkbox"
                  checked={interests.includes(interest.id)}
                  onChange={() => toggleInterest(interest.id)}
                  disabled={status === 'sending'}
                />
                <span>{interest.label}</span>
              </label>
            ))}
          </fieldset>

          <label className="pro-field-label" htmlFor="pro-note">What would you want most?</label>
          <textarea
            id="pro-note"
            value={note}
            onChange={(event) => setNote(event.target.value.slice(0, NOTE_LIMIT))}
            rows={4}
            maxLength={NOTE_LIMIT}
            placeholder="Optional. Anything that would make studying here easier."
            disabled={status === 'sending'}
          />

          <button type="submit" className="pro-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send my answers'}
          </button>

          {message && (
            <p
              className={`pro-status ${status === 'error' ? 'error' : 'done'}`}
              role={status === 'error' ? 'alert' : 'status'}
            >
              {message}
            </p>
          )}
        </form>
      </section>

      <p className="pro-footnote">
        Learn Microbes is independent study material and is not affiliated with ASCP or
        any certifying body. Clinical decisions belong to licensed professionals
        following their own facility procedures. Questions? <Link to="/about">Read more about the project</Link>.
      </p>
    </div>
  );
}
