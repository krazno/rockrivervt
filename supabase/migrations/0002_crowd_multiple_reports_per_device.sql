-- Allow multiple anonymous check-ins per device per UTC day; GET aggregates all rows.

alter table public.crowd_reports
  drop constraint if exists crowd_reports_device_report_date;

comment on table public.crowd_reports is
  'Anonymous crowd check-ins; multiple rows per device per UTC day. areas = JSON area_key → level.';
