import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import PreviewBanner from "@/components/PreviewBanner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s · ${site.brandPlain}`,
  },
  description: site.seo.description,
  applicationName: site.brandPlain,
  keywords: [
    "player props",
    "NBA props",
    "NFL props",
    "tennis betting",
    "tracked record",
    "handicapping",
    "sports picks",
  ],
  authors: [{ name: site.brandPlain }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brandPlain,
    title: site.seo.title,
    description: site.seo.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "sports",
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700;800;900&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {site.showPreviewBanner && <PreviewBanner />}
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
        <Analytics />
      </body>
    </html>
  );
}
