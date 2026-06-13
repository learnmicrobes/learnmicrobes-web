import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

type AuthContextValue = {
  isAuthReady: boolean;
  session: Session | null;
  user: User | null;
  signOut: () => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) {
      setIsAuthReady(true);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }

      // "Remember Me" enforcement: if user chose not to be remembered and
      // this is a new browser session (sessionStorage cleared on close), sign out.
      if (data.session) {
        const rememberMe = localStorage.getItem('lm_remember_me');
        const sessionMarker = sessionStorage.getItem('lm_session_marker');
        if (rememberMe === 'false' && !sessionMarker) {
          supabase!.auth.signOut();
          localStorage.removeItem('lm_remember_me');
          setIsAuthReady(true);
          return;
        }
      }

      setSession(data.session);
      setIsAuthReady(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'PASSWORD_RECOVERY') {
        sessionStorage.setItem('learnmicrobes_password_recovery', 'active');
      }

      setSession(nextSession);
      setIsAuthReady(true);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    isAuthReady,
    session,
    user: session?.user ?? null,
    signOut: async () => {
      if (!supabase) {
        return { error: null };
      }

      localStorage.removeItem('lm_remember_me');
      sessionStorage.removeItem('lm_session_marker');
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    }
  }), [isAuthReady, session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
};
