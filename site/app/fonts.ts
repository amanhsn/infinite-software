import localFont from "next/font/local";

/**
 * Self-hosted rather than next/font/google: the Google loader fetches at
 * build time, which makes the build non-hermetic and fails on an offline
 * or network-restricted CI runner. The woff2 files are committed.
 */

export const figtree = localFont({
  src: [{ path: "../public/fonts/Figtree-Variable.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-figtree",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/** Figures only — see the --font-figure note in globals.css. */
export const plexMono = localFont({
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  preload: true,
});
