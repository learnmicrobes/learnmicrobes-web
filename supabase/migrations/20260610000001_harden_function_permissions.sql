-- ================================================================
-- Migration: 20260610000001_harden_function_permissions
-- Project:   Learn Microbes
-- Date:      2026-06-10
-- Applied:   Yes (via Supabase MCP on 2026-06-10)
--
-- Purpose:
--   Revoke unnecessary direct EXECUTE access from anon and
--   authenticated roles on trigger/helper functions.
--   Add stable SET search_path = public to set_profiles_updated_at.
--
-- What is NOT changed:
--   - get_study_quiz_leaderboard: anon + authenticated access is
--     INTENTIONAL (powers the public Quiz Lab leaderboard).
--   - No RLS policies modified.
--   - No tables or user data touched.
-- ================================================================

-- Trigger helpers: revoke direct API access (trigger-only functions)
REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile()       FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_learn_progress_updated_at() FROM anon, authenticated;

-- set_profiles_updated_at: add stable search_path (was missing)
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

REVOKE EXECUTE ON FUNCTION public.set_profiles_updated_at() FROM anon, authenticated;

-- get_study_quiz_leaderboard: no changes, documented for audit trail
-- Access by anon + authenticated is intentional.
