import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faBookmark,
  faBullseye,
  faCheckCircle,
  faDatabase,
  faEnvelope,
  faFloppyDisk,
  faImages,
  faIdBadge,
  faKey,
  faRightFromBracket,
  faShieldHalved,
  faTrophy,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useLearnProgress } from '../../hooks/useLearnProgress';
import { useQuizHistory } from '../../hooks/useQuizHistory';
import { trackEvent } from '../../utils/analytics';
import './AccountPage.css';

type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  learning_goal: string | null;
  learner_role: string | null;
  country: string | null;
  hardest_topic: string | null;
  email_update_opt_in: boolean | null;
  last_active_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const defaultLearningGoal = 'Build my clinical microbiology confidence';
const passwordRecoveryStorageKey = 'learnmicrobes_password_recovery';
const passwordRequirementMessage = 'Use at least 12 characters with uppercase, lowercase, a number, and a special character.';

const profileSelectFields = 'id, email, display_name, learning_goal, learner_role, country, hardest_topic, email_update_opt_in, last_active_at, created_at, updated_at';

const learnerRoleOptions = [
  'MedTech / MLS student',
  'ASCP reviewee',
  'Working MedTech / MLS',
  'New micro bench learner',
  'Educator',
  'Other'
];

const hardestTopicOptions = [
  'Gram positive organisms',
  'Gram negative organisms',
  'Biochemical tests',
  'Unknown isolate workup',
  'Mycology',
  'Parasitology',
  'ASCP review',
  'Bench workflow',
  'Other'
];

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

const hasPasswordRecoveryUrl = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.location.hash.includes('type=recovery') || window.location.search.includes('type=recovery');
};

const getFriendlyDate = (value: string | null | undefined) => {
  if (!value) {
    return 'Not recorded yet';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));
};

const getDefaultDisplayName = (email: string | null | undefined) => (
  email?.split('@')[0] || 'Learn Microbes learner'
);

const isMissingProfilesTableError = (message: string) => (
  message.toLowerCase().includes('profiles') && (
    message.toLowerCase().includes('does not exist') ||
    message.toLowerCase().includes('schema cache') ||
    message.toLowerCase().includes('relation')
  )
);

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthReady, user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [learningGoal, setLearningGoal] = useState(defaultLearningGoal);
  const [learnerRole, setLearnerRole] = useState('');
  const [country, setCountry] = useState('');
  const [hardestTopic, setHardestTopic] = useState('');
  const [emailUpdateOptIn, setEmailUpdateOptIn] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSendingPasswordReset, setIsSendingPasswordReset] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isPasswordRecoveryMode, setIsPasswordRecoveryMode] = useState(() => (
    hasPasswordRecoveryUrl() || sessionStorage.getItem(passwordRecoveryStorageKey) === 'active'
  ));
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const accountFeedbackRef = useRef<HTMLDivElement>(null);
  const {
    bookmarks,
    bookmarkError,
    isLoadingBookmarks,
    toggleBookmark
  } = useBookmarks();
  const {
    isLoadingProgress,
    progressError,
    progressRows
  } = useLearnProgress();
  const {
    isLoadingQuizHistory,
    quizAttempts,
    quizHistoryError,
    weakestAreas
  } = useQuizHistory();

  const completedProgress = useMemo(() => (
    progressRows.filter((row) => row.status === 'completed')
  ), [progressRows]);

  const inProgressRows = useMemo(() => (
    progressRows.filter((row) => row.status === 'started')
  ), [progressRows]);

  const averageQuizScore = useMemo(() => {
    if (quizAttempts.length === 0) {
      return 0;
    }

    return Math.round(
      quizAttempts.reduce((total, attempt) => total + attempt.score_percent, 0) / quizAttempts.length
    );
  }, [quizAttempts]);

  const accountInitial = useMemo(() => (
    (displayName || user?.email || 'L').trim().charAt(0).toUpperCase()
  ), [displayName, user?.email]);

  const newPasswordRequirements = useMemo(() => (
    getPasswordRequirements(newPassword)
  ), [newPassword]);

  const scrollToAccountFeedback = () => {
    window.requestAnimationFrame(() => {
      accountFeedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const nextStudyActions = useMemo(() => {
    const resumeProgressRow = inProgressRows[0];
    const firstBookmark = bookmarks[0];

    return [
      {
        icon: faCheckCircle,
        label: resumeProgressRow ? 'Resume Learn page' : 'Start Learn review',
        detail: resumeProgressRow?.topic_title ?? 'Pick a Learn topic and mark it complete when ready.',
        path: resumeProgressRow?.topic_path ?? '/learn'
      },
      {
        icon: firstBookmark?.item_type === 'learn' ? faBookOpen : faBookmark,
        label: firstBookmark ? 'Review saved item' : 'Save a reference',
        detail: firstBookmark?.item_title ?? 'Bookmark a Learn page or Visual Atlas card for fast return.',
        path: firstBookmark?.item_path ?? '/visuals'
      },
      {
        icon: faTrophy,
        label: quizAttempts.length > 0 ? 'Run another quiz set' : 'Take a Study Quiz',
        detail: quizAttempts.length > 0
          ? `${averageQuizScore}% current average across saved sessions.`
          : 'Create your first saved quiz session.',
        path: '/study-quiz'
      }
    ];
  }, [averageQuizScore, bookmarks, inProgressRows, quizAttempts.length]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const loadProfile = async () => {
      setIsLoadingProfile(true);
      setErrorMessage('');
      setStatusMessage('');

      if (!supabase) {
        setErrorMessage('Supabase is not configured yet. Add the project URL and anon key to your local environment.');
        setIsLoadingProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select(profileSelectFields)
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        setErrorMessage(
          isMissingProfilesTableError(error.message)
            ? 'Profile storage is not created yet. Run the profiles SQL in Supabase, then refresh this page.'
            : error.message
        );
        setIsLoadingProfile(false);
        return;
      }

      if (data) {
        setProfile(data as ProfileRow);
        setDisplayName(data.display_name || getDefaultDisplayName(user.email));
        setLearningGoal(data.learning_goal || defaultLearningGoal);
        setLearnerRole(data.learner_role || '');
        setCountry(data.country || '');
        setHardestTopic(data.hardest_topic || '');
        setEmailUpdateOptIn(Boolean(data.email_update_opt_in));
        setIsLoadingProfile(false);
        return;
      }

      const starterProfile = {
        id: user.id,
        email: user.email ?? null,
        display_name: getDefaultDisplayName(user.email),
        learning_goal: defaultLearningGoal,
        last_active_at: new Date().toISOString()
      };

      const { data: createdProfile, error: createError } = await supabase
        .from('profiles')
        .upsert(starterProfile, { onConflict: 'id' })
        .select(profileSelectFields)
        .single();

      if (createError) {
        setErrorMessage(createError.message);
      } else {
        setProfile(createdProfile as ProfileRow);
        setDisplayName(starterProfile.display_name);
        setLearningGoal(starterProfile.learning_goal);
        setLearnerRole('');
        setCountry('');
        setHardestTopic('');
        setEmailUpdateOptIn(false);
      }

      setIsLoadingProfile(false);
    };

    loadProfile();
  }, [isAuthReady, navigate, user]);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        sessionStorage.setItem(passwordRecoveryStorageKey, 'active');
        setIsPasswordRecoveryMode(true);
        setStatusMessage('Choose a new password below to finish account recovery.');
        setErrorMessage('');
        scrollToAccountFeedback();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthReady && user && isPasswordRecoveryMode) {
      setStatusMessage('Choose a new password below to finish account recovery.');
      setErrorMessage('');
      scrollToAccountFeedback();
    }
  }, [isAuthReady, isPasswordRecoveryMode, user]);

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase || !user) {
      setErrorMessage('Sign in again before saving your profile.');
      return;
    }

    setIsSavingProfile(true);

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email ?? null,
        display_name: displayName.trim() || getDefaultDisplayName(user.email),
        learning_goal: learningGoal.trim() || defaultLearningGoal,
        learner_role: learnerRole || null,
        country: country.trim() || null,
        hardest_topic: hardestTopic || null,
        email_update_opt_in: emailUpdateOptIn,
        last_active_at: new Date().toISOString()
      }, { onConflict: 'id' })
      .select(profileSelectFields)
      .single();

    setIsSavingProfile(false);

    if (error) {
      setErrorMessage(error.message);
      scrollToAccountFeedback();
      return;
    }

    setProfile(data as ProfileRow);
    setStatusMessage('Profile saved.');
    scrollToAccountFeedback();
    trackEvent('profile_updated', {
      learner_role: learnerRole || 'not_set',
      hardest_topic: hardestTopic || 'not_set',
      has_country: Boolean(country.trim()),
      email_update_opt_in: emailUpdateOptIn
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handlePasswordResetEmail = async () => {
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase || !user?.email) {
      setErrorMessage('Sign in with an email account before requesting a password reset link.');
      return;
    }

    setIsSendingPasswordReset(true);

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/account`
    });

    setIsSendingPasswordReset(false);

    if (error) {
      setErrorMessage(`Password reset could not be started: ${error.message}`);
      scrollToAccountFeedback();
      return;
    }

    setStatusMessage('Password reset email sent. Open the link from your email to choose a new password.');
    scrollToAccountFeedback();
  };

  const handleUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setStatusMessage('');

    if (!supabase || !user) {
      setErrorMessage('Open the reset link again, then enter your new password.');
      scrollToAccountFeedback();
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setErrorMessage(passwordRequirementMessage);
      scrollToAccountFeedback();
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('The two password fields do not match yet.');
      scrollToAccountFeedback();
      return;
    }

    setIsUpdatingPassword(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setIsUpdatingPassword(false);

    if (error) {
      setErrorMessage(error.message);
      scrollToAccountFeedback();
      return;
    }

    sessionStorage.removeItem(passwordRecoveryStorageKey);
    setIsPasswordRecoveryMode(false);
    setIsPasswordChangeVisible(false);
    setNewPassword('');
    setConfirmPassword('');
    setStatusMessage('Password updated. You can keep using Learn Microbes with this account.');
    window.history.replaceState(null, document.title, window.location.pathname);
    scrollToAccountFeedback();
  };

  const handleRemoveBookmark = async (bookmark: typeof bookmarks[number]) => {
    const result = await toggleBookmark({
      itemType: bookmark.item_type,
      itemSlug: bookmark.item_slug,
      itemTitle: bookmark.item_title,
      itemPath: bookmark.item_path,
      itemSummary: bookmark.item_summary
    });

    if (!result.ok) {
      setErrorMessage(result.message);
      scrollToAccountFeedback();
    }
  };

  if (!isAuthReady || isLoadingProfile) {
    return (
      <div className="account-page">
        <section className="account-card account-loading" aria-live="polite">
          <span className="account-spinner" aria-hidden="true" />
          <p>Loading your study account...</p>
        </section>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <section className="account-hero" aria-labelledby="account-title">
        <div className="account-avatar" aria-hidden="true">{accountInitial}</div>
        <div>
          <span className="account-kicker">Learn Microbes Beta</span>
          <h1 id="account-title">Your study account</h1>
          <p>
            Your profile anchors saved progress, bookmarks, quiz history, and future certification-path personalization.
          </p>
        </div>
      </section>

      <div className="account-feedback" ref={accountFeedbackRef}>
        {errorMessage && (
          <div className="account-message error" role="alert">
            <FontAwesomeIcon icon={faDatabase} />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusMessage && (
          <div className="account-message success" role="status">
            <FontAwesomeIcon icon={faFloppyDisk} />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {(isPasswordRecoveryMode || isPasswordChangeVisible) && (
        <section className="account-card account-password-recovery" aria-labelledby="account-password-recovery-title">
          <div className="account-card-header">
            <span className="account-icon-tile" aria-hidden="true">
              <FontAwesomeIcon icon={faKey} />
            </span>
            <div>
              <h2 id="account-password-recovery-title">Choose a new password</h2>
              <p>Enter and confirm a new password for this Learn Microbes account.</p>
            </div>
          </div>

          <form className="account-password-form" onSubmit={handleUpdatePassword}>
            <label>
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="12+ characters with symbols"
                required
              />
            </label>

            <label>
              Confirm new password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Re-enter the new password"
                required
              />
            </label>

            <div className="account-password-requirements" aria-live="polite">
              <span>Password must include:</span>
              <ul>
                {newPasswordRequirements.map((requirement) => (
                  <li className={requirement.met ? 'met' : ''} key={requirement.label}>
                    <span aria-hidden="true">{requirement.met ? 'Met' : 'Needed'}</span>
                    {requirement.label}
                  </li>
                ))}
              </ul>
            </div>

            <button type="submit" className="account-save-btn" disabled={isUpdatingPassword}>
              <FontAwesomeIcon icon={faKey} />
              {isUpdatingPassword ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </section>
      )}

      <section className="account-grid" aria-label="Account profile details">
        <div className="account-main-column">
          <form className="account-card account-form" onSubmit={handleSaveProfile}>
            <div className="account-card-header">
              <span className="account-icon-tile" aria-hidden="true">
                <FontAwesomeIcon icon={faIdBadge} />
              </span>
              <div>
                <h2>Profile</h2>
                <p>Keep your name and current study goal aligned with how you are using Learn Microbes.</p>
              </div>
            </div>

            <label>
              Display name
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="How should Learn Microbes greet you?"
                maxLength={80}
              />
            </label>

            <label>
              Current learning goal
              <textarea
                value={learningGoal}
                onChange={(event) => setLearningGoal(event.target.value)}
                placeholder="Example: prepare for M(ASCP), learn bench workflows, review unknown ID..."
                maxLength={240}
                rows={4}
              />
            </label>

            <div className="account-profile-grid" aria-label="Beta learner profile">
              <label>
                What best describes you?
                <select value={learnerRole} onChange={(event) => setLearnerRole(event.target.value)}>
                  <option value="">Select a role</option>
                  {learnerRoleOptions.map((option) => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label>
                Hardest microbiology area
                <select value={hardestTopic} onChange={(event) => setHardestTopic(event.target.value)}>
                  <option value="">Select a topic</option>
                  {hardestTopicOptions.map((option) => (
                    <option value={option} key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                placeholder="Optional, helps us understand where learners are using the site"
                maxLength={80}
              />
            </label>

            <label className="account-checkbox-row">
              <input
                type="checkbox"
                checked={emailUpdateOptIn}
                onChange={(event) => setEmailUpdateOptIn(event.target.checked)}
              />
              <span>Email me occasional Learn Microbes beta updates and study-tool news.</span>
            </label>

            <button type="submit" className="account-save-btn" disabled={isSavingProfile}>
              <FontAwesomeIcon icon={faFloppyDisk} />
              {isSavingProfile ? 'Saving...' : 'Save profile'}
            </button>
          </form>

          <section className="account-card account-bookmarks" aria-labelledby="account-bookmarks-title">
            <div className="account-card-header">
              <span className="account-icon-tile" aria-hidden="true">
                <FontAwesomeIcon icon={faBookmark} />
              </span>
              <div>
                <h2 id="account-bookmarks-title">Saved bookmarks</h2>
                <p>Save Learn pages and Visual Atlas cards for fast review.</p>
              </div>
            </div>

            {bookmarkError && (
              <div className="account-inline-message error" role="alert">
                <FontAwesomeIcon icon={faDatabase} />
                <span>{bookmarkError}</span>
              </div>
            )}

            {isLoadingBookmarks ? (
              <p className="account-muted-line">Loading bookmarks...</p>
            ) : bookmarks.length > 0 ? (
              <div className="account-bookmark-list">
                {bookmarks.map((bookmark) => (
                  <div className="account-bookmark-card" key={bookmark.id}>
                    <span className="account-bookmark-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={bookmark.item_type === 'learn' ? faBookOpen : faImages} />
                    </span>
                    <div>
                      <span>{bookmark.item_type === 'learn' ? 'Learn page' : 'Visual atlas'}</span>
                      <Link to={bookmark.item_path}>{bookmark.item_title}</Link>
                      {bookmark.item_summary && <p>{bookmark.item_summary}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBookmark(bookmark)}
                      aria-label={`Remove ${bookmark.item_title} bookmark`}
                      title="Remove bookmark"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="account-empty-bookmarks">
                <strong>No bookmarks yet.</strong>
                <p>Open a Learn page or Visual Atlas card and save it from the page header.</p>
                <div>
                  <Link to="/learn">Browse Learn</Link>
                  <Link to="/visuals">Browse Visuals</Link>
                </div>
              </div>
            )}
          </section>

          <section className="account-card account-progress" aria-labelledby="account-progress-title">
            <div className="account-card-header">
              <span className="account-icon-tile" aria-hidden="true">
                <FontAwesomeIcon icon={faCheckCircle} />
              </span>
              <div>
                <h2 id="account-progress-title">Learn progress</h2>
                <p>Manual completion tracking for Learn pages. Opening a page starts it; pressing Mark Complete finishes it.</p>
              </div>
            </div>

            {progressError && (
              <div className="account-inline-message error" role="alert">
                <FontAwesomeIcon icon={faDatabase} />
                <span>{progressError}</span>
              </div>
            )}

            <div className="account-progress-stats" aria-label="Learn progress summary">
              <div>
                <strong>{completedProgress.length}</strong>
                <span>Completed</span>
              </div>
              <div>
                <strong>{inProgressRows.length}</strong>
                <span>In progress</span>
              </div>
            </div>

            {isLoadingProgress ? (
              <p className="account-muted-line">Loading progress...</p>
            ) : completedProgress.length > 0 ? (
              <div className="account-progress-list">
                {completedProgress.slice(0, 5).map((row) => (
                  <Link to={row.topic_path} key={row.id}>
                    <span>{row.topic_category}</span>
                    <strong>{row.topic_title}</strong>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="account-empty-bookmarks">
                <strong>No completed Learn pages yet.</strong>
                <p>Open a Learn page and use Mark Complete when you are ready to count it.</p>
                <div>
                  <Link to="/learn">Browse Learn</Link>
                </div>
              </div>
            )}
          </section>

          <section className="account-card account-quiz-history" aria-labelledby="account-quiz-history-title">
            <div className="account-card-header">
              <span className="account-icon-tile" aria-hidden="true">
                <FontAwesomeIcon icon={faTrophy} />
              </span>
              <div>
                <h2 id="account-quiz-history-title">Quiz history</h2>
                <p>Saved Study Quiz sessions show recent performance and weak areas to review.</p>
              </div>
            </div>

            {quizHistoryError && (
              <div className="account-inline-message error" role="alert">
                <FontAwesomeIcon icon={faDatabase} />
                <span>{quizHistoryError}</span>
              </div>
            )}

            <div className="account-progress-stats" aria-label="Quiz history summary">
              <div>
                <strong>{quizAttempts.length}</strong>
                <span>Saved sessions</span>
              </div>
              <div>
                <strong>{averageQuizScore}%</strong>
                <span>Average score</span>
              </div>
            </div>

            {weakestAreas.length > 0 && (
              <div className="account-weak-areas" aria-label="Weak areas to review">
                <span>Review next</span>
                <div>
                  {weakestAreas.map((area) => (
                    <small key={area}>{area}</small>
                  ))}
                </div>
              </div>
            )}

            {isLoadingQuizHistory ? (
              <p className="account-muted-line">Loading quiz history...</p>
            ) : quizAttempts.length > 0 ? (
              <div className="account-quiz-list">
                {quizAttempts.slice(0, 5).map((attempt) => (
                  <div className="account-quiz-card" key={attempt.id}>
                    <div>
                      <span>{attempt.category} / {attempt.difficulty}</span>
                      <strong>{attempt.score_percent}%</strong>
                    </div>
                    <p>
                      {attempt.correct_count}/{attempt.question_count} correct
                      {attempt.missed_count > 0 ? ` - ${attempt.missed_count} missed` : ' - no misses'}
                    </p>
                    <small>{getFriendlyDate(attempt.completed_at)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <div className="account-empty-bookmarks">
                <strong>No quiz sessions saved yet.</strong>
                <p>Take a Study Quiz session and use Save session after answering a few questions.</p>
                <div>
                  <Link to="/study-quiz">Open Study Quiz</Link>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="account-card account-summary" aria-label="Account summary">
          <div className="account-card-header">
            <span className="account-icon-tile" aria-hidden="true">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <div>
              <h2>Signed in</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <dl>
            <div>
              <dt>Profile created</dt>
              <dd>{getFriendlyDate(profile?.created_at)}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>{getFriendlyDate(profile?.updated_at)}</dd>
            </div>
            <div>
              <dt>Learner role</dt>
              <dd>{profile?.learner_role || 'Not set yet'}</dd>
            </div>
            <div>
              <dt>Hardest area</dt>
              <dd>{profile?.hardest_topic || 'Not set yet'}</dd>
            </div>
            <div>
              <dt>Email updates</dt>
              <dd>{profile?.email_update_opt_in ? 'Opted in' : 'Not opted in'}</dd>
            </div>
            <div>
              <dt>Account ID</dt>
              <dd>{user.id}</dd>
            </div>
          </dl>

          <div className="account-next-panel">
            <FontAwesomeIcon icon={faBullseye} />
            <div>
              <strong>Study loop active</strong>
              <p>Progress, bookmarks, and quiz history now attach to this same user ID.</p>
            </div>
          </div>

          <div className="account-next-actions" aria-label="Recommended next study actions">
            <h3>Next best actions</h3>
            {nextStudyActions.map((action) => (
              <Link to={action.path} key={action.label}>
                <span aria-hidden="true">
                  <FontAwesomeIcon icon={action.icon} />
                </span>
                <div>
                  <strong>{action.label}</strong>
                  <small>{action.detail}</small>
                </div>
              </Link>
            ))}
          </div>

          <div className="account-security-panel" aria-label="Account security">
            <div className="account-security-heading">
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
              <div>
                <strong>Account security</strong>
                <p>Change your password while signed in, or send a recovery link if you need to reset by email.</p>
              </div>
            </div>
            <button
              type="button"
              className="account-security-btn"
              onClick={() => {
                setIsPasswordChangeVisible((visible) => !visible);
                setStatusMessage('');
                setErrorMessage('');
              }}
              disabled={isUpdatingPassword}
            >
              <FontAwesomeIcon icon={faKey} />
              {isPasswordChangeVisible ? 'Hide password form' : 'Change password'}
            </button>
            <button
              type="button"
              className="account-security-btn account-security-btn-secondary"
              onClick={handlePasswordResetEmail}
              disabled={isSendingPasswordReset}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              {isSendingPasswordReset ? 'Sending link...' : 'Email recovery link'}
            </button>
          </div>

          <button type="button" className="account-signout-btn" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Sign out
          </button>
        </aside>
      </section>
    </div>
  );
};

export default AccountPage;
