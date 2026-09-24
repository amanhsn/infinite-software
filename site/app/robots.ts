import type { MetadataRoute } from "next";

/**
 * Nothing on this deployment may be indexed.
 *
 * The site still carries content the build plan marks as unverified: the
 * four continuity figures, the case-study metrics and quote, the selected
 * work, the office addresses, and a client strip built from five invented
 * companies (components/visuals/ClientLogos). Indexed, those read as claims
 * a bank's risk team could hold the company to.
 *
 * Delete this file and the `robots` block in app/layout.tsx together, in the
 * same commit that replaces the last placeholder — not before.
 */
/* Required by `output: export`, same as the opengraph-image routes: a
   generated robots.txt is a Route Handler and must declare itself static. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
