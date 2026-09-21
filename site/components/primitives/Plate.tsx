/**
 * A rendered artwork plate: the logomark milled as a physical object,
 * cropped hard so the complete figure-eight never appears.
 *
 * Why cropped: brand book §01's logo don'ts rule out rotating, recolouring
 * and shadowing the mark. A whole centred figure-eight in a new material
 * breaks all three at once and reads as a second, unofficial lockup. Running
 * the band off the frame keeps it artwork — the same dodge `MarkComposition`
 * makes in SVG, which this replaces wherever real artwork now exists.
 *
 * JPEG only, deliberately. `images.unoptimized` is on for static export, so
 * Next emits no alternate formats and a <picture> would have to carry them.
 * AVIF was tried and dropped: macOS `sips` writes a structurally valid file
 * with correct dimensions and a plausible byte count, but no image data —
 * it decodes to flat grey. That failure is invisible in a file listing and
 * only shows up on screen, which is the worst way to find it. Re-add AVIF
 * when there is an encoder in the build that can be verified, and verify it
 * by decoding, not by file size.
 */

const RADIUS = {
  card: "rounded-card",
  section: "rounded-section",
  none: "rounded-none",
} as const;

export function Plate({
  src, alt = "", ratio = "16/10", radius = "card", sizes, priority = false, className = "",
}: {
  /** Path under /img without the extension. */
  src: string;
  /** Empty by default: these are decorative unless a caller says otherwise. */
  alt?: string;
  ratio?: string;
  /** Named so the two brand radii stay the only options a caller can reach. */
  radius?: keyof typeof RADIUS;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    /* next/image's optimiser is off (`images.unoptimized`, required by
       static export), so it would add a component boundary and an
       intrinsic-size prop per asset while doing nothing this element does
       not already do: the ratio is reserved up front so there is no CLS,
       and loading priority is set per caller. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${src}.jpg`}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      style={{ aspectRatio: ratio }}
      className={`block w-full ${RADIUS[radius]} bg-mist object-cover ${className}`}
    />
  );
}
