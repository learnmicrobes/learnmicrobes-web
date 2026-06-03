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
