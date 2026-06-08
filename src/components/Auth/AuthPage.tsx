import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faFlaskVial, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { trackEvent } from '../../utils/analytics';
import './AuthPage.css';

type AuthMode = 'sign-in' | 'sign-up' | 'reset-password' | 'update-password' | 'email-sent';

interface EmailSentPanelProps {
  email: string;
  onTryAgain: () => void;
  onGoToSignIn: () => void;
}

const EmailSentPanel: React.FC<EmailSentPanelProps> = ({ email, onTryAgain, onGoToSignIn }) => (
  <div className="auth-page">
    <section className="auth-card auth-card--confirmation" aria-labelledby="auth-title">
      <div className="auth-card-copy">
        <span className="auth-kicker">Learn Microbes Beta</span>
        <h1 id="auth-title">Check your email</h1>
        <p>
          We sent a confirmation link to <strong>{email}</strong>. Open it to activate your
          account, then come back to sign in.
        </p>
      </div>
      <div className="auth-confirmation-steps">
        <ol>
          <li>Open the email from Learn Microbes</li>
          <li>Click <strong>Confirm your email</strong></li>
          <li>Return here and sign in</li>
        </ol>
      </div>
      <p className="auth-confirmation-hint">
        Didn't get it? Check your spam folder, or{' '}
        <button type="button" className="auth-inline-action" onClick={onTryAgain}>
          try again with a different email
        </button>
        .
      </p>
      <button type="button" className="auth-submit-btn" onClick={onGoToSignIn}>
        Go to sign in
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="auth-footer-note">
        <Link to="/">Back to Learn Microbes</Link>
      </div>
    </section>
  </div>
);

const PASSWORD_REQUIREMENT_MESSAGE = 'Use at least 12 characters with uppercase, lowercase, a number, and a special character.';
const GENERIC_SIGN_IN_ERROR = 'Invalid login credentials. Check your email and password, then try again.';
const GENERIC_RESET_MESSAGE = 'If an account exists for that email, we will send a password reset link.';

const getPasswordRequirements = (value: string) => [
  { label: 'At least 12 characters', met: value.length >= 12 },
  { label: 'Uppercase letter', met: /[A-Z]/.test(value) },
  { label: 'Lowercase letter', met: /[a-z]/.test(value) },
  { label: 'Number', met: /\d/.test(value) },
  { label: 'Special character', met: /[^A-Za-z0-9]/.test(value) }
];

const isStrongPassword = (value: string) => (
  getPasswordRequirements(value).every((requirement) => requirement.met)
);

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthReady } = useAuth();
  const [mode, setMode] = useState<AuthMode>(() => (location.pathname === '/register' ? 'sign-up' : 'sign-in'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const passwordRequirements = getPasswordRequirements(password);
  const isCreatingAccount = mode === 'sign-up';
  const authTitle = isCreatingAccount ? 'Create your Learn Microbes account.' : 'Sign in to your study account.';
  const authBody = isCreatingAccount
    ? 'Save progress, bookmarks, quiz history, and profile details as you study clinical microbiology.'
    : 'Access your saved progress, bookmarks, quiz history, and profile details.';

  useEffect(() => {
    if (isAuthReady && user && mode !== 'update-password') {
      navigate('/account', { replace: true });
    }
  }, [isAuthReady, mode, navigate, user]);

  useEffect(() => {
    if (mode !== 'sign-in' && mode !== 'sign-up') {
      return;
    }

    if (location.pathname === '/register' && mode !== 'sign-up') {
      setMode('sign-up');
      setPassword('');
      setErrorMessage('');
      setStatusMessage('');
    }

    if (location.pathname === '/login' && mode !== 'sign-in') {
      setMode('sign-in');
      setPassword('');
      setErrorMessage('');
      setStatusMessage('');
    }
  }, [location.pathname, mode]);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setMode('update-password');
        setPassword('');
        setErrorMessage('');
        setStatusMessage('Enter a new password to finish account recovery.');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) {
      setErrorMessage('Supabase is not configured yet. Add the project URL and anon key to your local environment.');
      return;
    }

    setIsSubmitting(true);

    if (mode === 'reset-password') {
      await handlePasswordReset();
      setIsSubmitting(false);
      return;
    }

    if (mode === 'update-password') {
      setIsSubmitting(true);

      if (!isStrongPassword(password)) {
        setErrorMessage(PASSWORD_REQUIREMENT_MESSAGE);
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });

      setIsSubmitting(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setStatusMessage('Password updated. Redirecting to your account.');
      setPassword('');
      navigate('/account', { replace: true });
      return;
    }

    const credentials = {
      email: email.trim(),
      password
    };

    if (mode === 'sign-up' && !isStrongPassword(password)) {
      setErrorMessage(PASSWORD_REQUIREMENT_MESSAGE);
      setIsSubmitting(false);
      return;
    }

    const { data, error } = mode === 'sign-in'
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp(credentials);

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(mode === 'sign-in' ? GENERIC_SIGN_IN_ERROR : error.message);
      return;
    }

    if (mode === 'sign-up' && !data.session) {
      trackEvent('account_created', {
        method: 'email',
        confirmation_required: true
      });
      setMode('email-sent');
      setPassword('');
      return;
    }

    if (mode === 'sign-up') {
      trackEvent('account_created', {
        method: 'email',
        confirmation_required: false
      });
    }

    // Persist "Remember Me" preference so AuthContext can enforce it on next browser session.
    if (mode === 'sign-in') {
      localStorage.setItem('lm_remember_me', rememberMe ? 'true' : 'false');
      sessionStorage.setItem('lm_session_marker', 'true');
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
    trackEvent('signup_cta_clicked', {
      location: 'auth_google_button',
      destination: 'google_oauth'
    });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/account`
      }
    });

    if (error) {
      setIsGoogleSubmitting(false);
      setErrorMessage('Google sign-in could not be completed. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase) {
      setErrorMessage('Supabase is not configured yet. Add the project URL and anon key to your local environment.');
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage('Enter your email address first, then request a password reset link.');
      return;
    }

    setIsResettingPassword(true);

    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/login`
    });

    setIsResettingPassword(false);

    if (error) {
      setStatusMessage(GENERIC_RESET_MESSAGE);
      setMode('sign-in');
      setPassword('');
      return;
    }

    setStatusMessage(GENERIC_RESET_MESSAGE);
    setMode('sign-in');
    setPassword('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errorMessage === PASSWORD_REQUIREMENT_MESSAGE && isStrongPassword(value)) {
      setErrorMessage('');
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage('');
    setStatusMessage('');
    setShowPassword(false);
    if (nextMode !== 'update-password') {
      setPassword('');
    }
  };

  if (mode === 'email-sent') {
    return (
      <EmailSentPanel
        email={email}
        onTryAgain={() => { setMode('sign-up'); setPassword(''); setStatusMessage(''); }}
        onGoToSignIn={() => { setMode('sign-in'); setPassword(''); navigate('/login', { replace: true }); }}
      />
    );
  }

  return (
    <div className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-card-copy">
          <span className="auth-kicker">Learn Microbes Beta</span>
          <h1 id="auth-title">{authTitle}</h1>
          <p>{authBody}</p>
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

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode !== 'update-password' && (
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
          )}

          {mode !== 'reset-password' && (
            <label>
              <span className="auth-label-row">
                Password
                {mode === 'sign-in' && (
                  <button
                    type="button"
                    className="auth-inline-action"
                    onClick={() => switchMode('reset-password')}
                  >
                    Forgot password?
                  </button>
                )}
              </span>
              <span className="auth-password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                  placeholder={mode === 'sign-in' ? 'Your password' : '12+ characters with symbols'}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </span>
            </label>
          )}

          {mode === 'sign-in' && (
            <label className="auth-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>
          )}

          {mode === 'reset-password' && (
            <p className="auth-helper-note">
              Enter your account email and we will send a reset link.
            </p>
          )}

          {mode === 'update-password' && (
            <div className="auth-password-requirements" aria-live="polite">
              <span>Password must include:</span>
              <ul>
                {passwordRequirements.map((requirement) => (
                  <li className={requirement.met ? 'met' : ''} key={requirement.label}>
                    {requirement.met ? '✓' : '•'} {requirement.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mode === 'sign-up' && (
            <div className="auth-password-requirements" aria-live="polite">
              <span>Password must include:</span>
              <ul>
                {passwordRequirements.map((requirement) => (
                  <li className={requirement.met ? 'met' : ''} key={requirement.label}>
                    {requirement.met ? '✓' : '•'} {requirement.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {errorMessage && <p className="auth-message error" role="alert">{errorMessage}</p>}
          {statusMessage && <p className="auth-message success" role="status">{statusMessage}</p>}

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting || isResettingPassword}>
            {isSubmitting || isResettingPassword
              ? 'Working...'
              : mode === 'sign-in'
                ? 'Sign in'
                : mode === 'sign-up'
                  ? 'Create account'
                  : mode === 'reset-password'
                    ? 'Send reset link'
                    : 'Update password'}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>

          {(mode === 'reset-password' || mode === 'update-password') && (
            <button
              type="button"
              className="auth-secondary-btn"
              onClick={() => {
                switchMode('sign-in');
                navigate('/login', { replace: true });
              }}
            >
              Back to sign in
            </button>
          )}
        </form>

        {(mode === 'sign-in' || mode === 'sign-up') && (
          <>
            <div className="auth-divider" role="separator">
              <span>or continue with</span>
            </div>

            <button
              type="button"
              className="auth-google-btn"
              onClick={handleGoogleSignIn}
              disabled={isGoogleSubmitting || !isSupabaseConfigured}
            >
              <span className="auth-google-mark" aria-hidden="true">G</span>
              {isGoogleSubmitting ? 'Opening Google...' : 'Google'}
            </button>

            <div className="auth-mode-footer">
              <span>{isCreatingAccount ? 'Already have an account?' : 'New to Learn Microbes?'}</span>
              <button
                type="button"
                onClick={() => {
                  const nextMode = isCreatingAccount ? 'sign-in' : 'sign-up';
                  switchMode(nextMode);
                  navigate(isCreatingAccount ? '/login' : '/register', { replace: true });
                }}
              >
                {isCreatingAccount ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </>
        )}

        <div className="auth-footer-note">
          <Link to="/">Back to Learn Microbes</Link>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;