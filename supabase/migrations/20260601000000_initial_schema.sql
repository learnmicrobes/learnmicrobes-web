-- ================================================================
-- Migration: 20260601000000_initial_schema
-- Project:   Learn Microbes
-- Date:      2026-06-01 (project creation)
--
-- Baseline schema export representing the full production database
-- structure as of 2026-06-10. No user data included.
-- Secrets are never committed to version control.
--
-- To apply to a fresh Supabase project:
--   supabase db push  (if using Supabase CLI)
--   or paste into Supabase Dashboard > SQL Editor
-- ================================================================


-- ================================================================
-- TABLES
-- ================================================================

-- ----------------------------------------------------------------
-- profiles
-- One row per authenticated user. Populated automatically on
-- signup via the on_auth_user_created trigger.
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  uuid        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  email               text,
  display_name        text,
  learning_goal       text        DEFAULT 'Build my clinical microbiology confidence',
  learner_role        text,
  country             text,
  hardest_topic       text,
  email_update_opt_in boolean     NOT NULL DEFAULT false,
  last_active_at      timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- ----------------------------------------------------------------
-- bookmarks
-- User-saved links to learn pages and visual atlas cards.
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id           uuid        NOT NULL DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  item_type    text        NOT NULL CHECK (item_type = ANY (ARRAY['learn'::text, 'visual'::text])),
  item_slug    text        NOT NULL,
  item_title   text        NOT NULL,
  item_path    text        NOT NULL,
  item_summary text,
  created_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT bookmarks_user_id_item_type_item_slug_key
    UNIQUE (user_id, item_type, item_slug)
);

-- ----------------------------------------------------------------
-- learn_progress
-- Tracks which study topics a user has started or completed.
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learn_progress (
  id              uuid        NOT NULL DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  topic_slug      text        NOT NULL,
  topic_title     text        NOT NULL,
  topic_category  text        NOT NULL,
  topic_path      text        NOT NULL,
  status          text        NOT NULL DEFAULT 'started'
                              CHECK (status = ANY (ARRAY['started'::text, 'completed'::text])),
  started_at      timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz,
  updated_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT learn_progress_pkey PRIMARY KEY (id),
  CONSTRAINT learn_progress_user_id_topic_slug_key
    UNIQUE (user_id, topic_slug)
);

-- ----------------------------------------------------------------
-- quiz_attempts
-- Records each completed quiz session with score details.
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id             uuid        NOT NULL DEFAULT gen_random_uuid(),
  user_id        uuid        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  quiz_name      text        NOT NULL DEFAULT 'Study Quiz',
  category       text        NOT NULL,
  difficulty     text        NOT NULL,
  question_count integer     NOT NULL CHECK (question_count > 0),
  correct_count  integer     NOT NULL CHECK (correct_count >= 0),
  missed_count   integer     NOT NULL CHECK (missed_count >= 0),
  score_percent  integer     NOT NULL CHECK (score_percent >= 0 AND score_percent <= 100),
  weak_areas     text[]      NOT NULL DEFAULT '{}',
  completed_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id)
);

-- Performance index: leaderboard aggregation and per-user history
CREATE INDEX IF NOT EXISTS quiz_attempts_user_completed_at_idx
  ON public.quiz_attempts (user_id, completed_at DESC);


-- ================================================================
-- ROW LEVEL SECURITY
-- All tables use RLS. Users can only access their own rows.
-- ================================================================

ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learn_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts  ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarks FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON public.bookmarks FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own bookmarks"
  ON public.bookmarks FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- learn_progress
CREATE POLICY "Users can view their own learn progress"
  ON public.learn_progress FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own learn progress"
  ON public.learn_progress FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own learn progress"
  ON public.learn_progress FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own learn progress"
  ON public.learn_progress FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- quiz_attempts
CREATE POLICY "Users can view their own quiz attempts"
  ON public.quiz_attempts FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can create their own quiz attempts"
  ON public.quiz_attempts FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete their own quiz attempts"
  ON public.quiz_attempts FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);


-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

-- ----------------------------------------------------------------
-- handle_new_user_profile
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
AS $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do update
  set email = excluded.email;

  return new;
end;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

-- ----------------------------------------------------------------
-- set_profiles_updated_at
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_profiles_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = public
AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;

CREATE OR REPLACE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_profiles_updated_at();

-- ----------------------------------------------------------------
-- set_learn_progress_updated_at
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_learn_progress_updated_at()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;

CREATE OR REPLACE TRIGGER set_learn_progress_updated_at
  BEFORE UPDATE ON public.learn_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.set_learn_progress_updated_at();

-- ----------------------------------------------------------------
-- get_study_quiz_leaderboard
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_study_quiz_leaderboard(
  row_limit integer DEFAULT 1000
)
RETURNS TABLE (
  user_id          uuid,
  display_name     text,
  total_score      bigint,
  attempt_count    bigint,
  accuracy_percent integer,
  rank             bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  with totals as (
    select
      quiz_attempts.user_id,
      sum(quiz_attempts.correct_count)::bigint  as total_score,
      count(*)::bigint                          as attempt_count,
      coalesce(round(avg(quiz_attempts.score_percent))::integer, 0) as accuracy_percent
    from public.quiz_attempts
    group by quiz_attempts.user_id
  ),
  ranked as (
    select
      totals.*,
      row_number() over (
        order by totals.total_score desc,
                 totals.accuracy_percent desc,
                 totals.attempt_count desc,
                 totals.user_id
      ) as rank
    from totals
  )
  select
    ranked.user_id,
    coalesce(nullif(trim(profiles.display_name), ''), 'Learner ' || ranked.rank::text) as display_name,
    ranked.total_score,
    ranked.attempt_count,
    ranked.accuracy_percent,
    ranked.rank
  from ranked
  left join public.profiles on profiles.id = ranked.user_id
  order by ranked.rank
  limit least(greatest(row_limit, 1), 1000);
$$;

-- ================================================================
-- FUNCTION GRANTS
-- ================================================================
GRANT  EXECUTE ON FUNCTION public.get_study_quiz_leaderboard(integer) TO anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile()           FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_learn_progress_updated_at()     FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_profiles_updated_at()           FROM anon, authenticated;
