import Script from "next/script";

/** Set in `.env.local` to override (e.g. staging). Defaults to production container. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-W8ZST3GB";

/**
 * Google Tag Manager bootstrap (load as early as possible).
 * Pair with {@link GoogleTagManagerNoscript} as the first child of `<body>`.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="google-tag-manager" strategy="beforeInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** GTM fallback for users without JavaScript — place immediately after `<body>`. */
export function GoogleTagManagerNoscript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
