import Link from "next/link";

/**
 * ══════════════════════════════════════════════════════════════════════
 *  PLACEHOLDER — THESE ARE NOT CLIENTS. DO NOT SHIP.
 *
 *  Ten invented companies, drawn so the logo grid can be judged with real
 *  marks in it instead of the word "CLIENT" five times. Every name below
 *  is fictional and every mark is original geometry.
 *
 *  The section's own caption says "We do not list logos we cannot
 *  attribute", and the build plan puts client logos under what must not
 *  be invented. So this file has to be deleted and replaced with cleared
 *  client artwork before the site is indexed — a grid of plausible fake
 *  clients is a claim, not a placeholder, once anyone can see it.
 * ══════════════════════════════════════════════════════════════════════
 *
 * Drawn rather than generated: a logo grid reads as a grid only if the
 * marks share an optical weight. Ten separately generated images do not,
 * and the mismatch is the first thing the eye lands on. All ten are one
 * stroke width on one 24-unit grid.
 *
 * The corner tag is Figtree, not Plex Mono. The mono face is figures only
 * — brand book §04 rules it out for eyebrows, and this is an eyebrow in
 * everything but position.
 */

type Placeholder = { name: string; mark: React.ReactNode; tag?: string };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

const PLACEHOLDERS: Placeholder[] = [
  {
    name: "Northbank",
    tag: "Case study",
    mark: <><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" {...S} /><path d="M12 8.5 15.5 15h-7z" {...S} /></>,
  },
  {
    name: "Meridian",
    tag: "Read more",
    mark: <><rect x="3.5" y="3.5" width="17" height="17" rx="4" {...S} /><path d="M12 8v8M8 12h8" {...S} /></>,
  },
  {
    name: "Cargolinq",
    tag: "Case study",
    mark: <><path d="M12 3 20.5 7.5v9L12 21l-8.5-4.5v-9z" {...S} /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" {...S} /></>,
  },
  {
    name: "Vantage",
    mark: <><path d="M4 7h16l-2.5 12h-11z" {...S} /><path d="M8.5 7a3.5 3.5 0 0 1 7 0" {...S} /></>,
  },
  {
    name: "Helio",
    tag: "Case study",
    mark: <><circle cx="12" cy="12" r="4.5" {...S} /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8" {...S} /></>,
  },
  {
    name: "Ledgerline",
    mark: <><rect x="4" y="3.5" width="16" height="17" rx="2.5" {...S} /><path d="M8 8.5h8M8 12h8M8 15.5h4.5" {...S} /></>,
  },
  {
    name: "Arbour",
    mark: <><path d="M12 3.5 17.5 12h-11z" {...S} /><path d="M12 9.5 19 19H5z" {...S} /></>,
  },
  {
    name: "Portway",
    tag: "Read more",
    mark: <><circle cx="12" cy="12" r="8.5" {...S} /><path d="M12 3.5v17M3.5 12h17" {...S} /></>,
  },
  {
    name: "Tessera",
    mark: <><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" {...S} /><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" {...S} /><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" {...S} /></>,
  },
  {
    name: "Grid North",
    mark: <><path d="M12 2.5 4 21l8-5 8 5z" {...S} /></>,
  },
];

/** ↗ — the tag points away from the page, so the arrow does too. */
function TagArrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-[9px] shrink-0" aria-hidden>
      <path d="M3.5 8.5 8.5 3.5M4.6 3.5h3.9v3.9" fill="none" stroke="currentColor"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClientLogos() {
  return (
    // gap-px over a rule-coloured ground draws the hairline grid: one
    // divider between cells, never a doubled border where two cells meet.
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
      {PLACEHOLDERS.map((c) => (
        <div key={c.name}
             className="group relative flex h-[116px] items-center justify-center gap-[11px] bg-paper text-ink-40">
          {c.tag && (
            <Link href="/work/"
                  className="absolute top-0 right-0 flex items-center gap-[5px] rounded-bl-inner bg-mist px-[9px] py-[5px] text-[9.5px] font-bold tracking-[0.14em] text-ink-40 uppercase no-underline transition-colors hover:bg-rule-soft hover:text-cobalt">
              {c.tag} <TagArrow />
            </Link>
          )}
          <svg viewBox="0 0 24 24" className="size-[26px] shrink-0" aria-hidden>{c.mark}</svg>
          <span className="text-[15px] font-semibold tracking-[-0.02em] whitespace-nowrap">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
