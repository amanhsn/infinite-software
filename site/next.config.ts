import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The prototype's URLs are `/services/ai-engineering/ai-governance/`.
   * Matching them exactly means inbound links survive, and the exported
   * tree becomes path-for-path comparable with web/ — which is what makes
   * the parity diff a one-liner.
   */
  trailingSlash: true,

  /**
   * Hosting is decided: infinitesofteware.com is served by Vercel, which
   * builds with plain `next build`, so this flag is off in production.
   *
   * STATIC_EXPORT=1 no longer produces a complete site and now fails the
   * build on purpose. /api/contact is the contact form's endpoint and
   * needs a runtime; an export cannot carry one, and the previous
   * behaviour — a form that posted nowhere — is what this replaced.
   * Moving to Apache/cPanel means porting that handler to PHP first, not
   * flipping this flag.
   */
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,

  /**
   * Required by static export. The site now ships raster artwork under
   * public/img/, so this is no longer free: those files are served at their
   * authored size with no format negotiation. See components/primitives/Plate
   * for why they are JPEG rather than AVIF.
   */
  images: { unoptimized: true },

  // Next 16 removed the `eslint` key; linting runs via `pnpm lint`.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
