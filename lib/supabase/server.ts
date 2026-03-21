import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client for API routes (crowd reporting).
 *
 * Env (Next.js `.env.local` and Vercel project settings — Production + Preview):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Do not use SUPABASE_ANON_KEY here — RLS blocks inserts; the crowd API needs the
 * service role key (same name Supabase shows in Project Settings → API).
 *
 * Use the service role key only on the server. Never prefix the service key with
 * NEXT_PUBLIC_ or import it in client components.
 */
export type SupabaseEnvIssue =
  | "missing_NEXT_PUBLIC_SUPABASE_URL"
  | "missing_SUPABASE_SERVICE_ROLE_KEY"
  | "invalid_NEXT_PUBLIC_SUPABASE_URL";

/** Which env pieces are wrong (names only — safe for logs / dev API responses). */
export function getSupabaseEnvIssues(): SupabaseEnvIssue[] {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const issues: SupabaseEnvIssue[] = [];
  if (!url) issues.push("missing_NEXT_PUBLIC_SUPABASE_URL");
  if (!key) issues.push("missing_SUPABASE_SERVICE_ROLE_KEY");
  if (url && !/^https?:\/\//i.test(url)) {
    issues.push("invalid_NEXT_PUBLIC_SUPABASE_URL");
  }
  return issues;
}

export function getServerSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  if (!/^https?:\/\//i.test(url)) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
