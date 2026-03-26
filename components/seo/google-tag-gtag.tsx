/**
 * Google tag (gtag.js) for GA4 — paste-style markup, high in `<head>`.
 * Override with `NEXT_PUBLIC_GA_MEASUREMENT_ID` (empty/whitespace ignored).
 *
 * If this property (`G-KL1KYSZVCS`) is also sent from Google Tag Manager, remove the
 * duplicate GA4 tag in GTM (or drop this component) to avoid double page views.
 */
export function getGoogleTagMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (trimmed.length > 0) return trimmed;
  return "G-KL1KYSZVCS";
}

/** <!-- Google tag (gtag.js) --> — matches Google’s “Install manually” snippet. */
export function GoogleTagGtagHead() {
  const id = getGoogleTagMeasurementId();
  if (!id) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${id}');
`,
        }}
      />
    </>
  );
}
