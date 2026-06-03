-- Learn Microbes beta bookmarks foundation.
-- Run this in Supabase SQL Editor after profiles.sql.

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('learn', 'visual')),
  item_slug text not null,
  item_title text not null,
  item_path text not null,
  item_summary text,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_slug)
);

grant select, insert, update, delete on public.bookmarks to authenticated;

alter table public.bookmarks enable row level security;

drop policy if exists "Users can view their own bookmarks" on public.bookmarks;
drop policy if exists "Users can create their own bookmarks" on public.bookmarks;
drop policy if exists "Users can update their own bookmarks" on public.bookmarks;
drop policy if exists "Users can delete their own bookmarks" on public.bookmarks;

create policy "Users can view their own bookmarks"
on public.bookmarks
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own bookmarks"
on public.bookmarks
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own bookmarks"
on public.bookmarks
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own bookmarks"
on public.bookmarks
for delete
to authenticated
using ((select auth.uid()) = user_id);
