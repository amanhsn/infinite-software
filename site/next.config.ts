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
   * Hosting is undecided, so static export stays behind a flag rather than
   * being baked in. Flipping it off later unlocks Server Actions, runtime
   * OG image generation and ISR with no refactor.
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
