import React, { useEffect, useRef, useState } from 'react';
import './NewsletterSignup.css';

type SubmissionState = 'idle' | 'loading' | 'success';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<SubmissionState>('idle');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
      setError('Please enter a valid email address');
      setStatus('idle');
      return;
    }

    setError('');
    setStatus('loading');

    timeoutRef.current = window.setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1250);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) {
      setError('');
    }
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
            <span className="newsletter-kicker">Weekly Study Drops</span>
            <h2 id="newsletter-title">Join the Lab List</h2>
            <p>
              Get weekly microbiology cheat sheets, high-yield bench exam tips, and early access
              to new interactive calculators. No spam, ever.
            </p>
          </div>
        </div>

        <div className="newsletter-form-shell">
          {status === 'success' ? (
            <div className="newsletter-success-card" role="status" aria-live="polite">
              <span className="newsletter-success-badge">Subscribed</span>
              <h3>Welcome to the bench! 🎉</h3>
              <p>Check your inbox soon for your first micro cheat sheet.</p>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <label className="newsletter-sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <div className="newsletter-form-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className={`newsletter-input ${error ? 'has-error' : ''}`}
                  placeholder="Enter your email..."
                  value={email}
                  onChange={handleChange}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'newsletter-error newsletter-privacy' : 'newsletter-privacy'}
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="newsletter-submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' && <span className="newsletter-spinner" aria-hidden="true"></span>}
                  <span>{status === 'loading' ? 'Securing your spot...' : 'Subscribe'}</span>
                </button>
              </div>

              {error && (
                <p id="newsletter-error" className="newsletter-error" role="alert">
                  {error}
                </p>
              )}

              <p id="newsletter-privacy" className="newsletter-privacy">
                We respect your inbox. Unsubscribe anytime in one click.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
