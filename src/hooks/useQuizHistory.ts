import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export type QuizAttemptRow = {
  id: string;
  user_id: string;
  quiz_name: string;
  category: string;
  difficulty: string;
  question_count: number;
  correct_count: number;
  missed_count: number;
  score_percent: number;
  weak_areas: string[];
  completed_at: string;
};

export type QuizAttemptInput = {
  quizName?: string;
  category: string;
  difficulty: string;
  questionCount: number;
  correctCount: number;
  missedCount: number;
  scorePercent: number;
  weakAreas: string[];
};

const isMissingQuizAttemptsTableError = (message: string) => (
  message.toLowerCase().includes('quiz_attempts') && (
    message.toLowerCase().includes('does not exist') ||
    message.toLowerCase().includes('schema cache') ||
    message.toLowerCase().includes('relation')
  )
);

const getQuizHistoryErrorMessage = (message: string) => (
  isMissingQuizAttemptsTableError(message)
    ? 'Quiz history storage is not created yet. Run the quiz history SQL in Supabase, then refresh this page.'
    : message
);

export const useQuizHistory = () => {
  const { user } = useAuth();
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRow[]>([]);
  const [isLoadingQuizHistory, setIsLoadingQuizHistory] = useState(false);
  const [quizHistoryError, setQuizHistoryError] = useState('');

  const loadQuizHistory = useCallback(async () => {
    if (!user) {
      setQuizAttempts([]);
      setQuizHistoryError('');
      return;
    }

    if (!supabase) {
      setQuizHistoryError('Supabase is not configured yet.');
      return;
    }

    setIsLoadingQuizHistory(true);
    setQuizHistoryError('');

    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('id, user_id, quiz_name, category, difficulty, question_count, correct_count, missed_count, score_percent, weak_areas, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(20);

    setIsLoadingQuizHistory(false);

    if (error) {
      setQuizHistoryError(getQuizHistoryErrorMessage(error.message));
      return;
    }

    setQuizAttempts((data ?? []) as QuizAttemptRow[]);
  }, [user]);

  useEffect(() => {
    loadQuizHistory();
  }, [loadQuizHistory]);

  const saveQuizAttempt = useCallback(async (attempt: QuizAttemptInput) => {
    if (!user) {
      return {
        ok: false,
        message: 'Sign in to save quiz history.'
      };
    }

    if (!supabase) {
      return {
        ok: false,
        message: 'Supabase is not configured yet.'
      };
    }

    setQuizHistoryError('');

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        quiz_name: attempt.quizName ?? 'Study Quiz',
        category: attempt.category,
        difficulty: attempt.difficulty,
        question_count: attempt.questionCount,
        correct_count: attempt.correctCount,
        missed_count: attempt.missedCount,
        score_percent: attempt.scorePercent,
        weak_areas: attempt.weakAreas
      })
      .select('id, user_id, quiz_name, category, difficulty, question_count, correct_count, missed_count, score_percent, weak_areas, completed_at')
      .single();

    if (error) {
      const message = getQuizHistoryErrorMessage(error.message);
      setQuizHistoryError(message);
      return { ok: false, message };
    }

    setQuizAttempts((currentAttempts) => [
      data as QuizAttemptRow,
      ...currentAttempts
    ].slice(0, 20));

    return {
      ok: true,
      message: 'Quiz session saved.'
    };
  }, [user]);

  const weakestAreas = useMemo(() => {
    const areaCounts = new Map<string, number>();

    quizAttempts.forEach((attempt) => {
      attempt.weak_areas.forEach((area) => {
        areaCounts.set(area, (areaCounts.get(area) ?? 0) + 1);
      });
    });

    return Array.from(areaCounts.entries())
      .sort((first, second) => second[1] - first[1])
      .slice(0, 3)
      .map(([area]) => area);
  }, [quizAttempts]);

  return {
    isLoadingQuizHistory,
    loadQuizHistory,
    quizAttempts,
    quizHistoryError,
    saveQuizAttempt,
    weakestAreas
  };
};
