/**
 * Visitor count (GET) + session bump (POST) — requires Supabase.
 *
 * Production checklist (Vercel → Project → Settings → Environment Variables):
 * - NEXT_PUBLIC_SUPABASE_URL — Project Settings → API → Project URL
 * - SUPABASE_SERVICE_ROLE_KEY — service role secret (server only; never NEXT_PUBLIC_)
 *
 * SQL: run `supabase/migrations/0003_visitors_guestbook.sql` in the Supabase SQL editor
 * so `site_counters` + `increment_site_counter` exist. Redeploy after setting env vars.
 */
import { NextResponse } from "next/server";

import {
  getServerSupabase,
  getSupabaseEnvIssues,
} from "@/lib/supabase/server";
import { geoFromRequest } from "@/lib/visitors-geo";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "lifetime_visits";

const isDev = process.env.NODE_ENV === "development";

export async function GET(request: Request) {
  const geo = geoFromRequest(request);
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        configured: false,
        count: null,
        geo,
        ...(isDev ? { envIssues: getSupabaseEnvIssues() } : {}),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const { data, error } = await supabase
    .from("site_counters")
    .select("value")
    .eq("key", COUNTER_KEY)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        configured: true,
        count: null,
        geo,
        error: "Could not load counter",
        ...(isDev ? { detail: error.message } : {}),
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  const count = typeof data?.value === "number" ? Number(data.value) : 0;

  return NextResponse.json(
    { configured: true, count, geo },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const geo = geoFromRequest(request);
  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: "Counter is not configured.",
        geo,
        ...(isDev ? { envIssues: getSupabaseEnvIssues() } : {}),
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.rpc("increment_site_counter", {
    p_key: COUNTER_KEY,
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not update counter",
        geo,
        ...(isDev ? { detail: error.message } : {}),
      },
      { status: 502 },
    );
  }

  const count = typeof data === "number" ? data : Number(data);

  return NextResponse.json({
    ok: true,
    count: Number.isFinite(count) ? count : null,
    geo,
  });
}
