-- RockRiverVT crowd reporting — matches app/api/crowd/route.ts
-- Tables: crowd_daily_baselines, crowd_reports

create table if not exists public.crowd_daily_baselines (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  area_key text not null,
  level text not null,
  created_at timestamptz not null default now(),
  constraint crowd_baselines_area_check check (
    area_key in (
      'parking',
      'trails',
      'family_beach',
      'third_beach',
      'fifth_beach'
    )
  ),
  constraint crowd_baselines_level_check check (
    level in ('calm', 'light', 'steady', 'active', 'busy')
  ),
  constraint crowd_daily_baselines_report_date_area_key unique (report_date, area_key)
);

create table if not exists public.crowd_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  report_date date not null,
  device_id text not null,
  display_name text,
  areas jsonb not null,
  constraint crowd_reports_device_len check (char_length(device_id) between 8 and 128),
  constraint crowd_reports_device_report_date unique (report_date, device_id)
);

create index if not exists crowd_daily_baselines_report_date_idx
  on public.crowd_daily_baselines (report_date);

create index if not exists crowd_reports_report_date_idx
  on public.crowd_reports (report_date);

comment on table public.crowd_daily_baselines is 'Manual baseline per area per UTC day; optional.';
comment on table public.crowd_reports is 'One row per device per UTC day; areas = JSON object area_key → level.';

alter table public.crowd_daily_baselines enable row level security;
alter table public.crowd_reports enable row level security;
-- No policies: public anon cannot access. Server uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
