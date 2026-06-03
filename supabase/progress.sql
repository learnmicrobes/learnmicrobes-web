-- Learn Microbes beta Learn-page progress foundation.
-- Run this in Supabase SQL Editor after profiles.sql.

create table if not exists public.learn_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_slug text not null,
  topic_title text not null,
  topic_category text not null,
  topic_path text not null,
  status text not null default 'started' check (status in ('started', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, topic_slug)
);

grant select, insert, update, delete on public.learn_progress to authenticated;

alter table public.learn_progress enable row level security;

drop policy if exists "Users can view their own learn progress" on public.learn_progress;
drop policy if exists "Users can create their own learn progress" on public.learn_progress;
drop policy if exists "Users can update their own learn progress" on public.learn_progress;
drop policy if exists "Users can delete their own learn progress" on public.learn_progress;

create policy "Users can view their own learn progress"
on public.learn_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own learn progress"
on public.learn_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own learn progress"
on public.learn_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own learn progress"
on public.learn_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.set_learn_progress_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_learn_progress_updated_at on public.learn_progress;

create trigger set_learn_progress_updated_at
before update on public.learn_progress
for each row
execute function public.set_learn_progress_updated_at();
