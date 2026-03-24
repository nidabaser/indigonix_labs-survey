create extension if not exists pgcrypto;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz not null default now(),
  source text,
  rating integer not null check (rating between 1 and 5),
  key_insight text not null,
  ai_maturity text not null,
  desired_use_case text not null,
  biggest_challenge text not null,
  contact_opt_in boolean not null default false,
  privacy_accepted boolean not null default false,
  name text,
  email text,
  phone text,
  company text
);

comment on table public.survey_responses is 'Event survey responses for labs.indigonix.ai';

alter table public.survey_responses enable row level security;

-- Public direct reads are blocked.
create policy "no_public_select"
on public.survey_responses
for select
using (false);

-- Public direct inserts are blocked because inserts go through the server-side API route.
create policy "no_public_insert"
on public.survey_responses
for insert
with check (false);
