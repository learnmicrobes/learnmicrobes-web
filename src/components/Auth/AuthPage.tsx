import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFlaskVial, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

type AuthMode = 'sign-in' | 'sign-up';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthReady } = useAuth();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthReady && user) {
      navigate('/account', { replace: true });
    }
  }, [isAuthReady, navigate, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) {
      setErrorMessage('Supabase is not configured yet. Add the project URL and anon key to your local environment.');
      return;
    }

    setIsSubmitting(true);

    const credentials = {
      email: email.trim(),
      password
    };

    const { data, error } = mode === 'sign-in'
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp(credentials);

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (mode === 'sign-up' && !data.session) {
      setStatusMessage('Account created. Check your email to confirm your address, then sign in.');
      setMode('sign-in');
      setPassword('');
      return;
    }

    setStatusMessage(mode === 'sign-in' ? 'Signed in successfully.' : 'Account created and signed in.');
    navigate('/account', { replace: true });
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) {
      setErrorMessage('Supabase is not configured yet. Add the project URL and anon key to your local environment.');
      return;
    }

    setIsGoogleSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/account`
      }
    });

    if (error) {
      setIsGoogleSubmitting(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card-copy">
          <span className="auth-kicker">Learn Microbes Beta</span>
          <h1 id="auth-title">Sign in to your study account.</h1>
          <p>
            Accounts save your progress, bookmarks, quiz history, and profile so your study workflow can follow you.
            No freemium limits are being added right now.
          </p>
        </div>

        <div className="auth-mode-tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'sign-in' ? 'active' : ''}
            onClick={() => setMode('sign-in')}
            aria-pressed={mode === 'sign-in'}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'sign-up' ? 'active' : ''}
            onClick={() => setMode('sign-up')}
            aria-pressed={mode === 'sign-up'}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            Create account
          </button>
        </div>

        {!isSupabaseConfigured && (
          <div className="auth-setup-note" role="status">
            <FontAwesomeIcon icon={faFlaskVial} />
            <div>
              <strong>Supabase setup needed</strong>
              <p>Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` to `.env`, then restart the dev server.</p>
            </div>
          </div>
        )}

        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={isGoogleSubmitting || !isSupabaseConfigured}
        >
          <span className="auth-google-mark" aria-hidden="true">G</span>
          {isGoogleSubmitting ? 'Opening Google...' : 'Continue with Google'}
        </button>

        <div className="auth-divider" role="separator">
          <span>or use email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
              placeholder={mode === 'sign-in' ? 'Your password' : 'At least 6 characters'}
              minLength={6}
              required
            />
          </label>

          {errorMessage && <p className="auth-message error" role="alert">{errorMessage}</p>}
          {statusMessage && <p className="auth-message success" role="status">{statusMessage}</p>}

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Working...' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <div className="auth-footer-note">
          <Link to="/">Back to Learn Microbes</Link>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
