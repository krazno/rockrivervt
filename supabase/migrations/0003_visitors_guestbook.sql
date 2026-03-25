-- Cumulative visit counter + public guestbook (server-only via service role).

create table if not exists public.site_counters (
  key text primary key,
  value bigint not null default 0
);

insert into public.site_counters (key, value)
values ('lifetime_visits', 0)
on conflict (key) do nothing;

-- Atomically bump and return the new total.
create or replace function public.increment_site_counter(p_key text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_val bigint;
begin
  insert into public.site_counters (key, value)
  values (p_key, 1)
  on conflict (key) do update
    set value = site_counters.value + 1
  returning value into new_val;

  return new_val;
end;
$$;

create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text,
  message text not null,
  constraint guestbook_message_len check (
    char_length(trim(message)) between 1 and 2000
  ),
  constraint guestbook_name_len check (
    display_name is null
    or char_length(trim(display_name)) between 1 and 80
  )
);

create index if not exists guestbook_entries_created_at_idx
  on public.guestbook_entries (created_at desc);

alter table public.site_counters enable row level security;
alter table public.guestbook_entries enable row level security;

comment on table public.site_counters is 'Key/value counters; bumped from app API (service role).';
comment on table public.guestbook_entries is 'Visitor “say hi” notes; inserted via app API (service role).';
