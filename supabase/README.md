# Supabase — Rock River VT crowd check-ins

## Required environment variables

Set in `.env.local` (local) and Vercel **Production** / **Preview**:

| Variable | Where |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → `service_role` **secret** |

The crowd API (`/api/crowd`) uses the **service role** key on the server only so it can insert/read with RLS enabled and no anon policies. Never expose the service key to the client (`NEXT_PUBLIC_*`).

## Migrations (run in order)

1. **`0001_crowd_reporting.sql`** — Creates `crowd_daily_baselines` and `crowd_reports` with an initial **unique (report_date, device_id)** constraint.
2. **`0002_crowd_multiple_reports_per_device.sql`** — **Required for current app behavior.** Drops that unique constraint so the same device can submit multiple check-ins per calendar day (merged in the API).

If `0002` is not applied, the **second** check-in from the same browser on the same day returns a database error (502).

## Report date

The app keys rows by **`America/New_York` calendar date** (YYYY-MM-DD), aligned with Vermont visitors’ “today.”

## RLS

Tables have RLS enabled with **no** anon policies; only the service role (API route) accesses them.

## Live verification (operators)

Crowd data is **not** realtime: the widget and homepage snapshot load `/api/crowd` on **page load**, and the widget **refetches after a successful check-in** (no polling or Supabase Realtime).

1. Apply migrations `0001` then `0002` in the Supabase SQL editor (or CLI).
2. In Table Editor, confirm `crowd_daily_baselines` and `crowd_reports` exist. For `0002`, confirm the constraint `crowd_reports_device_report_date` is **absent** (Database → crowd_reports → constraints).
3. Set env vars locally or on Vercel, then `npm run build && npm run start`.
4. From the repo root: `npm run verify:crowd` (reads `.env.local` if present; pass a base URL as the first arg if needed).

The script exits early with a clear message if GET returns `503` / `configured: false` (missing env on the server process).
