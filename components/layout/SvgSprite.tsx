import { PATH_BACK, PATH_FRONT, VIEW_BOX } from "@/lib/logo-geometry";

/**
 * Rendered exactly once, in the root layout.
 *
 * The mark appears twice per page (nav and footer). Inlining its <defs> at
 * each call site would duplicate the gradient id and ~4.9 KB of path data.
 * A single <symbol> makes the id a singleton by construction, and the two
 * fills are driven by inherited custom properties so the same symbol renders
 * gradient-on-light and white-on-ink.
 */
export function SvgSprite() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute size-0 overflow-hidden">
      <defs>
        <linearGradient id="infinite-band" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
          <stop offset="0" stopColor="#4FC7F2" />
          <stop offset="0.34" stopColor="#2B5CF6" />
          <stop offset="0.67" stopColor="#7A4DF5" />
          <stop offset="1" stopColor="#C07BF0" />
        </linearGradient>
        <symbol id="infinite-mark" viewBox={VIEW_BOX}>
          <path d={PATH_BACK} fill="var(--mark-back, #CBD8F5)" />
          <path d={PATH_FRONT} fill="var(--mark-front, url(#infinite-band))" />
        </symbol>
      </defs>
    </svg>
  );
}
