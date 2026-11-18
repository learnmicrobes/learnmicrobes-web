-- ================================================================
-- Migration: 20261117000000_email_capture_and_pro_waitlist
-- Project:   Learn Microbes
-- Date:      2026-11-17
--
-- Purpose: demand validation. Two write-only mailboxes the site can
--   drop an address into, with no way for a visitor to read any of it
--   back.
--
--   1. email_signups   - "tell me when there is new Atlas content"
--   2. pro_waitlist    - interest in optional paid extras
--
-- The security shape of both tables is the same and is the point of
-- this file, so it is spelled out rather than left to defaults:
--
--   * RLS on, with exactly ONE policy each, FOR INSERT. No SELECT,
--     UPDATE or DELETE policy exists, so even with the public anon key
--     nobody can list the addresses, change one, or delete one. The
--     owner reads them through the dashboard, which bypasses RLS.
--   * Table privileges are revoked wholesale and INSERT alone is
--     granted back, so the grant layer says the same thing as the
--     policy layer. 20260610000001 and 20260913120000 established that
--     belt-and-braces pattern for the user tables.
--   * No column references auth.users. These rows come from people who
--     are not signed in; that is the whole point.
--
-- Anyone holding the anon key can insert junk here. That is accepted
-- for a validation experiment (the owner declined a captcha). The
-- constraints below keep the data usable rather than keeping attackers
-- out: a unique address, a plausible shape, bounded lengths, and a
-- closed set of sources.
-- ================================================================


-- ----------------------------------------------------------------
-- 1. email_signups
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_signups (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 text NOT NULL,
  source                text NOT NULL,
  consent_text_version  text NOT NULL,
  created_at            timestamptz NOT NULL DEFAULT now(),

  -- Not full RFC validation, which is a famous rabbit hole. This
  -- rejects the obvious rubbish and nothing more.
  CONSTRAINT email_signups_email_shape CHECK (
    email = lower(email)
    AND length(email) BETWEEN 6 AND 254
    AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),

  -- A closed set, so a typo in a call site shows up as a failed insert
  -- instead of a source nobody can group by later. 'footer' is listed
  -- although the footer currently links to /pro rather than carrying a
  -- form; keeping it means adding the form later needs no migration.
  CONSTRAINT email_signups_source_known CHECK (
    source IN ('footer', 'quiz_result', 'quiz_gate', 'roadmap_gate', 'workup_gate', 'pro_waitlist')
  ),

  CONSTRAINT email_signups_consent_version_len CHECK (
    length(consent_text_version) BETWEEN 1 AND 40
  )
);

-- One row per address. The client inserts blind and reads the unique
-- violation as "already subscribed", which is how the form can show the
-- same message either way without being able to look anyone up.
CREATE UNIQUE INDEX IF NOT EXISTS email_signups_email_key
  ON public.email_signups (email);

ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can join the update list" ON public.email_signups;
CREATE POLICY "Anyone can join the update list"
  ON public.email_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

REVOKE ALL ON public.email_signups FROM anon, authenticated;
GRANT INSERT ON public.email_signups TO anon, authenticated;


-- ----------------------------------------------------------------
-- 2. pro_waitlist
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pro_waitlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  interests   text[] NOT NULL DEFAULT '{}',
  note        text,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT pro_waitlist_email_shape CHECK (
    email = lower(email)
    AND length(email) BETWEEN 6 AND 254
    AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),

  -- Deliberately not unique: someone may come back with a different
  -- answer, and the later row is the more interesting one.
  CONSTRAINT pro_waitlist_interests_bounded CHECK (
    array_length(interests, 1) IS NULL OR array_length(interests, 1) <= 8
  ),

  -- A free-text box on an anonymous endpoint, so it is capped.
  CONSTRAINT pro_waitlist_note_len CHECK (
    note IS NULL OR length(note) <= 1000
  )
);

ALTER TABLE public.pro_waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can join the Pro waitlist" ON public.pro_waitlist;
CREATE POLICY "Anyone can join the Pro waitlist"
  ON public.pro_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

REVOKE ALL ON public.pro_waitlist FROM anon, authenticated;
GRANT INSERT ON public.pro_waitlist TO anon, authenticated;
