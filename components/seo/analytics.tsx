"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads GA4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (e.g. G-XXXXXXXXXX).
 * Search Console: verify via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in root layout metadata — no script here.
 */
export function AnalyticsScripts() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
