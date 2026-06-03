import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export type LearnProgressStatus = 'started' | 'completed';

export type LearnProgressRow = {
  id: string;
  user_id: string;
  topic_slug: string;
  topic_title: string;
  topic_category: string;
  topic_path: string;
  status: LearnProgressStatus;
  started_at: string;
  completed_at: string | null;
  updated_at: string;
};

export type LearnProgressInput = {
  topicSlug: string;
  topicTitle: string;
  topicCategory: string;
  topicPath: string;
};

const isMissingProgressTableError = (message: string) => (
  message.toLowerCase().includes('learn_progress') && (
    message.toLowerCase().includes('does not exist') ||
    message.toLowerCase().includes('schema cache') ||
    message.toLowerCase().includes('relation')
  )
);

const getProgressErrorMessage = (message: string) => (
  isMissingProgressTableError(message)
    ? 'Progress storage is not created yet. Run the progress SQL in Supabase, then refresh this page.'
    : message
);

export const useLearnProgress = () => {
  const { user } = useAuth();
  const [progressRows, setProgressRows] = useState<LearnProgressRow[]>([]);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState('');

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgressRows([]);
      setProgressError('');
      return;
    }

    if (!supabase) {
      setProgressError('Supabase is not configured yet.');
      return;
    }

    setIsLoadingProgress(true);
    setProgressError('');

    const { data, error } = await supabase
      .from('learn_progress')
      .select('id, user_id, topic_slug, topic_title, topic_category, topic_path, status, started_at, completed_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    setIsLoadingProgress(false);

    if (error) {
      setProgressError(getProgressErrorMessage(error.message));
      return;
    }

    setProgressRows((data ?? []) as LearnProgressRow[]);
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const completedTopicSlugs = useMemo(() => (
    new Set(
      progressRows
        .filter((row) => row.status === 'completed')
        .map((row) => row.topic_slug)
    )
  ), [progressRows]);

  const startedTopicSlugs = useMemo(() => (
    new Set(progressRows.map((row) => row.topic_slug))
  ), [progressRows]);

  const isTopicStarted = useCallback((topicSlug: string) => (
    startedTopicSlugs.has(topicSlug)
  ), [startedTopicSlugs]);

  const isTopicCompleted = useCallback((topicSlug: string) => (
    completedTopicSlugs.has(topicSlug)
  ), [completedTopicSlugs]);

  const markTopicStarted = useCallback(async (topic: LearnProgressInput) => {
    if (!user || !supabase || isTopicStarted(topic.topicSlug)) {
      return;
    }

    const { data, error } = await supabase
      .from('learn_progress')
      .upsert({
        user_id: user.id,
        topic_slug: topic.topicSlug,
        topic_title: topic.topicTitle,
        topic_category: topic.topicCategory,
        topic_path: topic.topicPath,
        status: 'started'
      }, {
        onConflict: 'user_id,topic_slug',
        ignoreDuplicates: true
      })
      .select('id, user_id, topic_slug, topic_title, topic_category, topic_path, status, started_at, completed_at, updated_at')
      .maybeSingle();

    if (error) {
      setProgressError(getProgressErrorMessage(error.message));
      return;
    }

    if (data) {
      setProgressRows((currentRows) => [
        data as LearnProgressRow,
        ...currentRows.filter((row) => row.topic_slug !== topic.topicSlug)
      ]);
    }
  }, [isTopicStarted, user]);

  const setTopicCompleted = useCallback(async (topic: LearnProgressInput, completed: boolean) => {
    if (!user) {
      return {
        ok: false,
        message: 'Sign in to save progress.'
      };
    }

    if (!supabase) {
      return {
        ok: false,
        message: 'Supabase is not configured yet.'
      };
    }

    setProgressError('');

    const { data, error } = await supabase
      .from('learn_progress')
      .upsert({
        user_id: user.id,
        topic_slug: topic.topicSlug,
        topic_title: topic.topicTitle,
        topic_category: topic.topicCategory,
        topic_path: topic.topicPath,
        status: completed ? 'completed' : 'started',
        completed_at: completed ? new Date().toISOString() : null
      }, {
        onConflict: 'user_id,topic_slug'
      })
      .select('id, user_id, topic_slug, topic_title, topic_category, topic_path, status, started_at, completed_at, updated_at')
      .single();

    if (error) {
      const message = getProgressErrorMessage(error.message);
      setProgressError(message);
      return { ok: false, message };
    }

    setProgressRows((currentRows) => [
      data as LearnProgressRow,
      ...currentRows.filter((row) => row.topic_slug !== topic.topicSlug)
    ]);

    return {
      ok: true,
      message: completed ? 'Learn page marked complete.' : 'Learn page moved back to in progress.'
    };
  }, [user]);

  return {
    completedTopicSlugs,
    isLoadingProgress,
    isTopicCompleted,
    isTopicStarted,
    loadProgress,
    markTopicStarted,
    progressError,
    progressRows,
    setTopicCompleted
  };
};
