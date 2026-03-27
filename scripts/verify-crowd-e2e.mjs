#!/usr/bin/env node
/**
 * End-to-end smoke test for /api/crowd against a running Next server with Supabase env.
 *
 * Usage:
 *   1. Add NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to .env.local
 *   2. npm run build && npm run start   # or npm run dev
 *   3. npm run verify:crowd [-- http://127.0.0.1:3000]
 *
 * Optional: loads .env.local from repo root into process.env (does not print secrets).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");

function loadDotEnvLocal() {
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadDotEnvLocal();

const base =
  process.argv[2] && !process.argv[2].startsWith("-") ?
    process.argv[2].replace(/\/$/, "")
  : "http://127.0.0.1:3000";

const url = `${base}/api/crowd`;

function log(msg) {
  console.log(`[verify:crowd] ${msg}`);
}

function fail(msg) {
  console.error(`[verify:crowd] FAIL: ${msg}`);
  process.exit(1);
}

async function main() {
  log(`Base URL: ${base}`);

  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim());
  const hasKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
  if (!hasUrl || !hasKey) {
    log(
      "No Supabase env in process (add .env.local or export vars). GET is expected to return 503.",
    );
  }

  const get1 = await fetch(url, { cache: "no-store" });
  const get1Json = await get1.json().catch(() => null);

  if (get1.status === 503) {
    if (get1Json?.configured !== false) {
      fail("503 response should include configured: false");
    }
    log("GET → 503 (Supabase not configured in this shell). Stopping before POST DB tests.");
    log("Pass with credentials: re-run with .env.local present and server started.");
    process.exit(0);
  }

  if (get1.status !== 200) {
    fail(`GET expected 200, got ${get1.status}: ${JSON.stringify(get1Json)}`);
  }
  if (get1Json?.configured !== true) {
    fail("GET 200 should include configured: true");
  }
  if (!get1Json?.reportDate || get1Json?.dateScope !== "America/New_York") {
    fail("GET JSON missing reportDate or dateScope");
  }
  if (!Array.isArray(get1Json?.areas)) {
    fail("GET JSON missing areas array");
  }
  if (typeof get1Json?.totalReportsToday !== "number") {
    fail("GET JSON missing totalReportsToday number");
  }

  const before = get1Json.totalReportsToday;
  const deviceId = `verify-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const postBody = {
    deviceId,
    areas: { parking: "light", trails: "steady" },
  };

  const post1 = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postBody),
  });
  const post1Json = await post1.json().catch(() => null);

  if (post1.status !== 200) {
    fail(`POST valid body expected 200, got ${post1.status}: ${JSON.stringify(post1Json)}`);
  }
  if (!post1Json?.ok || post1Json?.configured !== true || !post1Json?.submissionId) {
    fail(`POST success shape wrong: ${JSON.stringify(post1Json)}`);
  }
  if (typeof post1Json.totalReportsToday === "number") {
    if (post1Json.totalReportsToday !== before + 1) {
      fail(
        `POST totalReportsToday ${post1Json.totalReportsToday} !== GET before+1 (${before + 1})`,
      );
    }
  }

  const get2 = await fetch(url, { cache: "no-store" });
  const get2Json = await get2.json().catch(() => null);
  if (get2.status !== 200) {
    fail(`GET after POST expected 200, got ${get2.status}`);
  }
  if (get2Json.totalReportsToday < before + 1) {
    fail(
      `GET totalReportsToday after insert (${get2Json.totalReportsToday}) should be >= ${before + 1}`,
    );
  }

  const post2 = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deviceId,
      areas: { family_beach: "calm" },
    }),
  });
  const post2Json = await post2.json().catch(() => null);
  if (post2.status !== 200) {
    fail(
      `Second POST same device same day expected 200 (migration 0002). Got ${post2.status}: ${JSON.stringify(post2Json)}`,
    );
  }

  const get3 = await fetch(url, { cache: "no-store" });
  const get3Json = await get3.json().catch(() => null);
  if (get3.status !== 200 || get3Json.totalReportsToday < get2Json.totalReportsToday + 1) {
    fail(
      `After second POST, totalReportsToday should increase (got ${get3Json?.totalReportsToday}, prev ${get2Json.totalReportsToday})`,
    );
  }

  const bad = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId: "short", areas: { parking: "light" } }),
  });
  const badJson = await bad.json().catch(() => null);
  if (bad.status !== 400 || badJson?.configured !== true) {
    fail(`Invalid payload should be 400 with configured: true, got ${bad.status}`);
  }

  log("All checks passed (GET, POST insert, second same-device POST, GET totals, invalid 400).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
