/**
 * ══════════════════════════════════════════════════════════════════════
 *  PLACEHOLDER — THESE ARE NOT CLIENTS. DO NOT SHIP.
 *
 *  Five invented companies, drawn so the logo strip can be judged with
 *  real marks in it instead of the word "CLIENT" five times. Every name
 *  below is fictional and every mark is original geometry.
 *
 *  The section's own caption says "We do not list logos we cannot
 *  attribute", and the build plan puts client logos under what must not
 *  be invented. So this file has to be deleted and replaced with cleared
 *  client artwork before the site goes public — a strip of plausible
 *  fake clients is a claim, not a placeholder, once anyone can see it.
 * ══════════════════════════════════════════════════════════════════════
 *
 * Drawn rather than generated: a logo row reads as a row only if the
 * marks share an optical weight. Five separately generated images do not,
 * and the mismatch is the first thing the eye lands on. All five are one
 * stroke width on one 24-unit grid.
 */

type Placeholder = { name: string; mark: React.ReactNode };

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

const PLACEHOLDERS: Placeholder[] = [
  {
    name: "Northbank",
    mark: <><path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" {...S} /><path d="M12 8.5 15.5 15h-7z" {...S} /></>,
  },
  {
    name: "Meridian",
    mark: <><rect x="3.5" y="3.5" width="17" height="17" rx="4" {...S} /><path d="M12 8v8M8 12h8" {...S} /></>,
  },
  {
    name: "Cargolinq",
    mark: <><path d="M12 3 20.5 7.5v9L12 21l-8.5-4.5v-9z" {...S} /><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" {...S} /></>,
  },
  {
    name: "Vantage",
    mark: <><path d="M4 7h16l-2.5 12h-11z" {...S} /><path d="M8.5 7a3.5 3.5 0 0 1 7 0" {...S} /></>,
  },
  {
    name: "Helio",
    mark: <><circle cx="12" cy="12" r="4.5" {...S} /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8" {...S} /></>,
  },
];

export function ClientLogos() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
      {PLACEHOLDERS.map((c) => (
        <div key={c.name} className="flex h-[92px] items-center justify-center gap-[11px] bg-paper text-ink-40">
          <svg viewBox="0 0 24 24" className="size-[26px] shrink-0" aria-hidden>{c.mark}</svg>
          <span className="text-[15px] font-semibold tracking-[-0.02em] whitespace-nowrap">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
