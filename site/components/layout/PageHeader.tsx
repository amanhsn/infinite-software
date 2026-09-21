import Link from "next/link";
import type { ReactNode } from "react";
import { Plate } from "@/components/primitives/Plate";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-[9px] text-[13.5px] text-ink-40">
      {trail.map((c, i) => (
        <span key={c.label} className="flex items-center gap-[9px]">
          {c.href ? (
            <Link href={c.href} className="text-ink-60 no-underline hover:text-cobalt">{c.label}</Link>
          ) : (
            <span aria-current="page" className="font-medium text-ink">{c.label}</span>
          )}
          {i < trail.length - 1 && <span aria-hidden>/</span>}
        </span>
      ))}
    </nav>
  );
}

/**
 * Shared header for every interior page.
 *
 * `surface="mesh"` adds pb-safe-b: below ~65% of the mesh the ramp darkens
 * to #B6C6F2 and ink-60 body text drops under 4.5:1, so copy must stay in
 * the upper band.
 */
export function PageHeader({
  trail, eyebrow, title, lede, aside, banner, surface = "mist",
}: {
  trail?: Crumb[]; eyebrow?: string; title: string; lede?: string;
  aside?: ReactNode;
  /**
   * Path under /img, no extension. A 21:9 artwork band under the header
   * block — decorative, so it carries no alt text and no caption.
   */
  banner?: string;
  surface?: "mist" | "mesh";
}) {
  const mesh = surface === "mesh";
  return (
    <div className="mx-auto max-w-shell px-gut pt-[18px]">
      <div className={`rounded-section px-panel-x py-band-y ${mesh ? "bg-mesh pb-safe-b" : "bg-mist"}`}>
        <div className={aside ? "grid grid-cols-1 gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[1.2fr_0.8fr] lg:items-end" : ""}>
          <div>
            {trail && <Breadcrumb trail={trail} />}
            {eyebrow && !trail && <p className="text-eyebrow text-cobalt uppercase">{eyebrow}</p>}
            <h1 className="measure-base mt-[18px] mb-5 text-display">{title}</h1>
            {lede && <p className="max-w-measure text-lead text-ink-60">{lede}</p>}
          </div>
          {aside}
        </div>
      </div>
      {/* The source is 21:9 with clear ground above and below the band, which
          at full width is ~600px mostly empty. Shown shorter and centre-cropped:
          the band sits mid-frame in every one of the six, so centre is the
          only anchor that holds for all of them. */}
      {banner && (
        <Plate src={banner} ratio="1000/300" radius="section" sizes="100vw" priority
               className="mt-[18px]" />
      )}
    </div>
  );
}
