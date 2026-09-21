-- Waitlist registrations for the neuralkw marketing site.
-- Apply this in the Supabase SQL editor (or via the CLI) before enabling the form.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company_name text,
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email)
);

alter table public.waitlist enable row level security;

drop policy if exists "Anyone can join waitlist" on public.waitlist;
create policy "Anyone can join waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 254
    and (company_name is null or char_length(company_name) <= 120)
  );

-- No SELECT policy for anon: emails cannot be harvested from the client.
