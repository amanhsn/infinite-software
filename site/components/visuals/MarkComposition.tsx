import { PATH_BACK, PATH_FRONT } from "@/lib/logo-geometry";

/**
 * Card artwork built from the logomark itself — cropped hard and tinted, so
 * the three cards read as a family without a stock photograph between them.
 * Deterministic per index: same card, same composition, every render.
 */
const VARIANTS = [
  { rotate: -18, scale: 1.9, x: -18, y: -6, ground: "var(--color-mist)", back: "#DCE6FA", front: "#2B5CF6" },
  { rotate: 12, scale: 2.4, x: 22, y: 10, ground: "#EEF2FC", back: "#D8E2F8", front: "#7A4DF5" },
  { rotate: -6, scale: 1.6, x: 4, y: -14, ground: "#F1F0FB", back: "#E2DDF7", front: "#4FC7F2" },
] as const;

export function MarkComposition({ index = 0, className = "" }: { index?: number; className?: string }) {
  const v = VARIANTS[index % VARIANTS.length];
  return (
    <div
      className={`relative w-full overflow-hidden rounded-card ${className}`}
      style={{ aspectRatio: "16/10", background: v.ground }}
      aria-hidden
    >
      <svg viewBox="0 0 210 130" preserveAspectRatio="xMidYMid slice"
           className="absolute inset-0 size-full">
        {/* rotate(deg cx cy) already carries the origin — no transform-origin needed */}
        <g transform={`translate(${v.x} ${v.y}) rotate(${v.rotate} 105 65) scale(${v.scale})`}>
          <path d={PATH_BACK} fill={v.back} />
          <path d={PATH_FRONT} fill={v.front} opacity="0.92" />
        </g>
      </svg>
    </div>
  );
}
