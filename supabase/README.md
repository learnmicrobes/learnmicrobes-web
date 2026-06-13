# Learn Microbes — Supabase Migrations

This folder contains all database schema changes for the Learn Microbes Supabase project, in chronological order.

## Folder structure

```
supabase/
  migrations/
    20260601000000_initial_schema.sql          ← baseline (tables, RLS, functions, triggers)
    20260610000001_harden_function_permissions.sql  ← security cleanup
  README.md  ← this file
```

## Migration naming convention

```
YYYYMMDDHHMMSS_description_in_snake_case.sql
```

Use a timestamp prefix so migrations run in order. The description should be short and clear.

## How to make a schema change

1. **Write the SQL** — create a new `.sql` file in `supabase/migrations/` with the next timestamp.
2. **Apply it** — paste it into the Supabase Dashboard → SQL Editor, or use the Supabase CLI:
   ```bash
   supabase db push
   ```
3. **Commit the file** — once applied to production, commit the migration file to git.
4. **Never edit old migrations** — treat applied migrations as immutable. If you need to fix something, write a new migration.

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

## Current schema summary (as of 2026-06-10)

### Tables

| Table | Purpose | RLS |
|---|---|---|
| `profiles` | One row per user. Created on signup via trigger. | ✅ own row only |
| `bookmarks` | Saved learn pages and visual atlas cards. | ✅ own rows only |
| `learn_progress` | Topic started/completed tracking. | ✅ own rows only |
| `quiz_attempts` | Per-session quiz scores and weak areas. | ✅ own rows only |

### Functions

| Function | Access | Purpose |
|---|---|---|
| `handle_new_user_profile()` | trigger only | Creates `profiles` row on new signup |
| `set_profiles_updated_at()` | trigger only | Auto-updates `profiles.updated_at` |
| `set_learn_progress_updated_at()` | trigger only | Auto-updates `learn_progress.updated_at` |
| `get_study_quiz_leaderboard(row_limit)` | anon + authenticated | Public Quiz Lab leaderboard |

### Security model

- All four tables have RLS enabled.
- Authenticated users can only read/write their own rows.
- `anon` role has no table access (all data is behind RLS).
- The leaderboard function is intentionally callable by `anon` — it powers the public leaderboard in Quiz Lab.
- Trigger functions are not callable via the PostgREST API (EXECUTE revoked from `anon` and `authenticated`).

## Current frontend use

The React app currently uses these tables/functions for account features:

- `profiles`: account page profile fields and beta learner metadata.
- `bookmarks`: saved Learn pages and Visual Atlas cards.
- `learn_progress`: started/completed Learn topic tracking.
- `quiz_attempts`: Study Quiz history, weak areas, and leaderboard inputs.
- `get_study_quiz_leaderboard(row_limit)`: public all-time leaderboard RPC.

## Backend expansion priority

Before adding new backend-backed features, prioritize a security and migration review:

- Confirm RLS still limits authenticated users to their own rows.
- Confirm `anon` has no direct table access.
- Review every callable function before granting `anon` or `authenticated` EXECUTE.
- Keep production migrations immutable; use new forward migrations for fixes.
- Never place service-role keys or other secrets in frontend code, `.env.example`, or committed docs.
