# Learn Microbes — Supabase Migrations

This folder contains all database schema changes for the Learn Microbes Supabase project, in chronological order.

## Folder structure

```
supabase/
  migrations/
    20260601000000_initial_schema.sql                  ← baseline (tables, RLS, functions, triggers)
    20260610000001_harden_function_permissions.sql     ← security cleanup
    20260913120000_leaderboard_privacy_and_grants.sql  ← leaderboard privacy, weekly board, grants
  README.md  ← this file
```

Migrations applied through the Supabase MCP get their own timestamp in the database's
migration history, so versions there do not match these filenames exactly. The SQL is
the same.

## Migration naming convention

```
YYYYMMDDHHMMSS_description_in_snake_case.sql
```

Use a timestamp prefix so migrations run in order. The description should be short and clear.

## How to make a schema change

1. **Write the SQL** — create a new `.sql` file in `supabase/migrations/` with the next timestamp.
2. **Rehearse it** — run it inside `begin; ... rollback;` against the project with a few
   checks, so mistakes cost nothing.
3. **Apply it** — paste it into the Supabase Dashboard → SQL Editor, or use the Supabase CLI:
   ```bash
   supabase db push
   ```
4. **Commit the file** — once applied to production, commit the migration file to git.
5. **Never edit old migrations** — treat applied migrations as immutable. If you need to fix something, write a new migration.

## What lives here vs. what does not

| Included | Not included |
|---|---|
| CREATE TABLE | User data (rows) |
| ALTER TABLE | Service role keys |
| CREATE/ALTER FUNCTION | .env secrets |
| CREATE TRIGGER | Supabase project ID (safe, but not needed) |
| RLS policies | |
| GRANT / REVOKE | |
| CREATE INDEX | |

## Current schema summary (as of 2026-09-13)

### Tables

| Table | Purpose | RLS |
|---|---|---|
| `profiles` | One row per user. Created on signup via trigger. | ✅ own row only |
| `bookmarks` | Saved learn pages and visual atlas cards. | ✅ own rows only |
| `learn_progress` | Topic started/completed tracking. | ✅ own rows only |
| `quiz_attempts` | Per-session quiz scores and weak areas. Scores must fit the question count. | ✅ own rows only |

### Functions

| Function | Access | Purpose |
|---|---|---|
| `handle_new_user_profile()` | trigger only | Creates `profiles` row on new signup (display name left empty unless provided) |
| `set_profiles_updated_at()` | trigger only | Auto-updates `profiles.updated_at` |
| `set_learn_progress_updated_at()` | trigger only | Auto-updates `learn_progress.updated_at` |
| `get_study_quiz_leaderboard(row_limit, since)` | authenticated only | Quiz Lab leaderboard, all-time or since a date (weekly) |

### Security model

- All four tables have RLS enabled.
- Authenticated users can only read/write their own rows.
- `anon` has no table privileges on these tables, and RLS would block it anyway.
- The leaderboard function runs as definer so it can rank everyone, but it never returns
  user ids or emails. A display name only appears if the learner chose one; blank names,
  names containing `@`, and names equal to the email prefix show as "Learner N". Only
  signed-in users can call it (the app shows signed-out visitors a sign-in prompt).
- Trigger functions have no EXECUTE grant for `PUBLIC`, `anon`, or `authenticated`.
  Revoking from `anon`/`authenticated` alone is not enough, because Postgres grants
  EXECUTE to `PUBLIC` by default.

### Not part of Learn Microbes

The same database also holds the OMC Micro scheduler's `sched_*` tables and
`is_sched_lead()`. They belong to a separate app that now has its own Supabase project;
the copies here are locked to signed-in leads and kept only until that move is deployed.
Do not build Learn Microbes features on them.

## Current frontend use

The React app currently uses these tables/functions for account features:

- `profiles`: account page profile fields and beta learner metadata.
- `bookmarks`: saved Learn pages and Visual Atlas cards.
- `learn_progress`: started/completed Learn topic tracking.
- `quiz_attempts`: Study Quiz history and weak areas.
- `get_study_quiz_leaderboard(row_limit, since)`: weekly and all-time leaderboard RPC.

## Backend expansion priority

Before adding new backend-backed features, prioritize a security and migration review:

- Confirm RLS still limits authenticated users to their own rows.
- Confirm `anon` has no direct table access.
- Review every callable function before granting `anon` or `authenticated` EXECUTE, and
  remember to revoke from `PUBLIC` as well.
- Keep production migrations immutable; use new forward migrations for fixes.
- Never place service-role keys or other secrets in frontend code, `.env.example`, or committed docs.
