import type { ReactNode } from "react";

/**
 * A marked image slot. Renders a labelled placeholder until real artwork
 * exists, so unfinished imagery is visible in review rather than shipping
 * as an invented photograph.
 *
 * Swap `src` in once artwork is generated; the placeholder disappears.
 */
export function MediaSlot({
  label, ratio = "16/10", className = "", children,
}: { label: string; ratio?: string; className?: string; children?: ReactNode }) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`relative w-full overflow-hidden rounded-card bg-mist ${className}`}
      data-media-slot={label}
    >
      {children ?? (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-[11px] font-bold tracking-[0.2em] text-ink-25 uppercase">{label}</span>
        </div>
      )}
    </div>
  );
}
