/**
 * Lightweight GA4 signal layer — fires only when `gtag` is present (layout injects gtag.js).
 * Use for aggregated product signals, not PII. Custom params can be registered as GA4 dimensions later.
 *
 * ## Reading performance in GA4
 *
 * Event name: `rr_interaction`.
 * Register custom dimensions (Admin → Data display → Custom definitions): `rr_category`, `rr_label`,
 * `section_id`, `placement`, `pick_id`, `map_context`, `link_domain`, `itinerary_id` as needed.
 *
 * **Top-of-funnel sections (visibility):** filter `rr_label` = `section_in_view`, break down by `section_id`.
 * Compare counts to see which home bands people actually scroll to. High views + low downstream clicks
 * (e.g. `local_pick` / `partner`) → move the stronger CTA higher or tighten copy.
 *
 * **Engagement depth:** `rr_category` = `map` | `local_pick` | `outbound` | `partner` | `navigation`.
 * Map: `layers_ready`, `home_expand_modal`, `home_full_map_link`. Picks: `pick_id` + `pick_category`.
 *
 * **Low signal:** sections with very few `section_in_view` events may be below the fold for most users—
 * consider promoting a teaser higher, or accept as “detail” content.
 *
 * Explorations: Free form → use `rr_interaction`, dimensions above, metric Event count. Save a recurring report.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type RrInteractionCategory =
  | "map"
  | "conditions"
  | "after_river"
  | "local_pick"
  | "outbound"
  | "navigation"
  | "partner"
  /** Passive: section scrolled into view (home bands, etc.) */
  | "surface";

/** Single custom event name keeps GTM/GA4 setup simple. */
const RR_EVENT = "rr_interaction";

export function trackRrInteraction(
  category: RrInteractionCategory,
  label: string,
  extra?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  gtag("event", RR_EVENT, {
    rr_category: category,
    rr_label: label,
    ...extra,
  });
}
