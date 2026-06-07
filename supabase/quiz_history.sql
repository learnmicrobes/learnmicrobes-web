-- Learn Microbes beta quiz history foundation.
-- Run this in Supabase SQL Editor after profiles.sql.

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_name text not null default 'Study Quiz',
  category text not null,
  difficulty text not null,
  question_count integer not null check (question_count > 0),
  correct_count integer not null check (correct_count >= 0),
  missed_count integer not null check (missed_count >= 0),
  score_percent integer not null check (score_percent >= 0 and score_percent <= 100),
  weak_areas text[] not null default '{}',
  completed_at timestamptz not null default now()
);

grant select, insert, delete on public.quiz_attempts to authenticated;

alter table public.quiz_attempts enable row level security;

drop policy if exists "Users can view their own quiz attempts" on public.quiz_attempts;
drop policy if exists "Users can create their own quiz attempts" on public.quiz_attempts;
drop policy if exists "Users can delete their own quiz attempts" on public.quiz_attempts;

create policy "Users can view their own quiz attempts"
on public.quiz_attempts
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own quiz attempts"
on public.quiz_attempts
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own quiz attempts"
on public.quiz_attempts
for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists quiz_attempts_user_completed_at_idx
on public.quiz_attempts (user_id, completed_at desc);

create or replace function public.get_study_quiz_leaderboard(row_limit integer default 1000)
returns table (
  user_id uuid,
  display_name text,
  total_score bigint,
  attempt_count bigint,
  accuracy_percent integer,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  with totals as (
    select
      quiz_attempts.user_id,
      sum(quiz_attempts.correct_count)::bigint as total_score,
      count(*)::bigint as attempt_count,
      coalesce(round(avg(quiz_attempts.score_percent))::integer, 0) as accuracy_percent
    from public.quiz_attempts
    group by quiz_attempts.user_id
  ),
  ranked as (
    select
      totals.*,
      row_number() over (
        order by totals.total_score desc, totals.accuracy_percent desc, totals.attempt_count desc, totals.user_id
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

grant execute on function public.get_study_quiz_leaderboard(integer) to authenticated;
