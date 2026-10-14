import type { Metadata, Viewport } from "next";
import { figtree, plexMono } from "./fonts";
import { SvgSprite } from "@/components/layout/SvgSprite";
import { SkipLink } from "@/components/layout/SkipLink";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  /**
   * The site is indexable now, so the fallback cannot be localhost: it is
   * what every canonical and og:image URL is resolved against, and a build
   * run without the env var would publish links to a machine nobody else
   * can reach. NEXT_PUBLIC_SITE_URL still overrides it for previews.
   */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://infinitesofteware.com"),
  title: {
    default: "Infinite — The team that scoped it is the team that ships it",
    template: "%s — Infinite",
  },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_CA" },
  twitter: { card: "summary_large_image" },
};

/** viewport-fit=cover: the nav pads itself with env(safe-area-inset-top). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${plexMono.variable}`}>
      <body>
        <SvgSprite />
        <SkipLink />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
