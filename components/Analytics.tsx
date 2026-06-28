import Script from "next/script";

/**
 * Privacy-friendly analytics, OFF by default. Enables only when an env var is
 * set at build time:
 *   - NEXT_PUBLIC_PLAUSIBLE_DOMAIN → loads Plausible (preferred), or
 *   - NEXT_PUBLIC_GA_MEASUREMENT_ID → loads Google Analytics 4.
 * If neither is set, no third-party script is loaded at all.
 */
export default function Analytics() {
  const plausible = (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "").trim();
  const ga = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "").trim();

  if (plausible) {
    return (
      <Script
        defer
        data-domain={plausible}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    );
  }

  if (ga) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga}', { anonymize_ip: true });`}
        </Script>
      </>
    );
  }

  return null;
}
