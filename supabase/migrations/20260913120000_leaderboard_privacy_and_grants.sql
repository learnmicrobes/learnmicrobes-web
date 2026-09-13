-- ================================================================
-- Migration: 20260913120000_leaderboard_privacy_and_grants
-- Project:   Learn Microbes
-- Date:      2026-09-13
--
-- Purpose (from the 2026-09-12 Supabase checkup):
--   1. Leaderboard privacy: stop returning user ids, never show a name
--      derived from someone's email, and only allow signed-in callers.
--   2. Weekly leaderboard: optional `since` filter, so the weekly board
--      ranks everyone. The old client-side query only ever saw the
--      viewer's own rows because of RLS.
--   3. Leaderboard integrity: reject impossible quiz scores.
--   4. New signups no longer get their email prefix as a display name.
--   5. Trigger functions: revoke the default PUBLIC execute grant that
--      20260610000001_harden_function_permissions missed (it revoked
--      anon/authenticated, but PUBLIC still covered both).
--   6. anon loses direct table privileges on user tables. RLS already
--      blocked it; this removes the grant as a second layer.
-- ================================================================


-- ----------------------------------------------------------------
-- 1 + 2. Leaderboard
-- ----------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_study_quiz_leaderboard(integer);

CREATE FUNCTION public.get_study_quiz_leaderboard(
  row_limit integer DEFAULT 10,
  since     timestamptz DEFAULT NULL
)
RETURNS TABLE (
  rank             bigint,
  display_name     text,
  total_score      bigint,
  attempt_count    bigint,
  accuracy_percent integer,
  is_current_user  boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  with totals as (
    select
      qa.user_id,
      sum(qa.correct_count)::bigint as total_score,
      count(*)::bigint as attempt_count,
      coalesce(round(avg(qa.score_percent))::integer, 0) as accuracy_percent
    from public.quiz_attempts qa
    where since is null or qa.completed_at >= since
    group by qa.user_id
  ),
  ranked as (
    select
      totals.*,
      row_number() over (
        order by totals.total_score desc,
                 totals.accuracy_percent desc,
                 totals.attempt_count desc,
                 totals.user_id
      ) as board_rank
    from totals
  )
  select
    ranked.board_rank,
    -- A name only shows if the learner chose one. Blank names, anything
    -- containing "@", and the old email-prefix default all become "Learner N".
    case
      when nullif(trim(p.display_name), '') is null
        or p.display_name like '%@%'
        or lower(trim(p.display_name)) = lower(split_part(coalesce(u.email, p.email, ''), '@', 1))
      then 'Learner ' || ranked.board_rank::text
      else trim(p.display_name)
    end,
    ranked.total_score,
    ranked.attempt_count,
    ranked.accuracy_percent,
    coalesce(ranked.user_id = (select auth.uid()), false)
  from ranked
  left join public.profiles p on p.id = ranked.user_id
  left join auth.users u on u.id = ranked.user_id
  -- Top N, plus the caller's own row when they rank outside it.
  where ranked.board_rank <= least(greatest(row_limit, 1), 100)
     or ranked.user_id = (select auth.uid())
  order by ranked.board_rank;
$$;

REVOKE EXECUTE ON FUNCTION public.get_study_quiz_leaderboard(integer, timestamptz) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.get_study_quiz_leaderboard(integer, timestamptz) TO authenticated;


-- ----------------------------------------------------------------
-- 3. Leaderboard integrity
-- ----------------------------------------------------------------
ALTER TABLE public.quiz_attempts
  ADD CONSTRAINT quiz_attempts_counts_within_question_count
    CHECK (correct_count + missed_count <= question_count),
  ADD CONSTRAINT quiz_attempts_question_count_max
    CHECK (question_count <= 1000);


-- ----------------------------------------------------------------
-- 4. Signup trigger: no email-prefix display name
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
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), '')
  )
  on conflict (id) do update
  set email = excluded.email;

  return new;
end;
$$;


-- ----------------------------------------------------------------
-- 5. Trigger functions are not API-callable
-- ----------------------------------------------------------------
ALTER FUNCTION public.set_learn_progress_updated_at() SECURITY INVOKER;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile()       FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_profiles_updated_at()       FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_learn_progress_updated_at() FROM PUBLIC, anon, authenticated;


-- ----------------------------------------------------------------
-- 6. Signed-out visitors have no direct table access
-- ----------------------------------------------------------------
REVOKE ALL ON public.profiles, public.bookmarks, public.learn_progress, public.quiz_attempts FROM anon;
