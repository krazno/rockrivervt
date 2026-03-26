/**
 * Resolves GTM container id. Empty / whitespace env values are ignored so a blank
 * `NEXT_PUBLIC_GTM_ID` in Vercel does not disable the default container.
 */
export function getGtmContainerId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GTM_ID;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (trimmed.length > 0) return trimmed;
  return "GTM-W8ZST3GB";
}

/** Inline bootstrap exactly as Google Tag Manager provides (best for verification tools). */
export function GoogleTagManagerHeadScript() {
  const gtmId = getGtmContainerId();
  if (!gtmId) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
}

/** GTM fallback for users without JavaScript — immediately after `<body>`. */
export function GoogleTagManagerNoscript() {
  const gtmId = getGtmContainerId();
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
