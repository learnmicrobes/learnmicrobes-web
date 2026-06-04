-- Learn Microbes beta security audit helpers.
-- Run in Supabase SQL Editor. These queries do not change data.

-- 1) Confirm all public tables and whether RLS is enabled.
select
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  forcerowsecurity as force_rls_enabled
from pg_tables
where schemaname = 'public'
order by tablename;

-- 2) Review grants to anon/authenticated for public tables.
select
  table_schema,
  table_name,
  grantee,
  privilege_type
from information_schema.table_privileges
where table_schema = 'public'
  and grantee in ('anon', 'authenticated')
order by table_name, grantee, privilege_type;

-- 3) Review RLS policies for public tables.
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_expression,
  with_check as with_check_expression
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- 4) Expected beta user-data tables should all show RLS enabled.
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('profiles', 'bookmarks', 'learn_progress', 'quiz_attempts')
order by c.relname;

