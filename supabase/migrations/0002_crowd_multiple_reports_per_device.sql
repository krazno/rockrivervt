-- Allow multiple anonymous check-ins per device per calendar day (app keys report_date to America/New_York); GET aggregates all rows.

alter table public.crowd_reports
  drop constraint if exists crowd_reports_device_report_date;

comment on table public.crowd_reports is
  'Anonymous crowd check-ins; multiple rows per device per Eastern calendar day. areas = JSON area_key → level.';
