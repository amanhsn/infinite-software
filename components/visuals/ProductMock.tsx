import { LeadTimeTrend } from "./LeadTimeTrend";
import { Logo } from "@/components/primitives/Logo";

const NAV = ["Engagements", "Teams", "Reports"];
const ROWS: [string, string][] = [
  ["Release cadence", "every 4 days"],
  ["Uptime, trailing 12mo", "99.98%"],
  ["Sprints delivered", "14"],
];

/**
 * The client-facing reporting surface described in the brand book — the
 * thing the "we publish the numbers" claim actually refers to. Drawn rather
 * than photographed: the brand rules out stock imagery, and a real product
 * surface says more than a picture of a laptop.
 */
export function ProductMock() {
  return (
    <div className="overflow-hidden rounded-card border border-rule bg-paper shadow-[0_24px_60px_-28px_rgb(10_16_36/0.22)]">
      <div className="flex items-center gap-2 border-b border-rule-soft bg-mist px-4 py-[10px]">
        <span className="flex gap-[5px]" aria-hidden>
          {["#E3E7F0", "#E3E7F0", "#E3E7F0"].map((c, i) => (
            <span key={i} className="size-[8px] rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="ml-2 flex items-center gap-[7px]">
          <Logo variant="mono" className="h-[13px]" />
          <span className="text-[12px] font-semibold tracking-[-0.02em] text-ink">Infinite</span>
        </span>
        <nav className="ml-4 flex gap-1 text-[11.5px]" aria-hidden>
          {NAV.map((n, i) => (
            <span key={n} className={`rounded-full px-[9px] py-[3px] ${i === 0 ? "bg-paper font-medium text-ink" : "text-ink-40"}`}>
              {n}
            </span>
          ))}
        </nav>
      </div>

      <div className="p-5">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-[14.5px] font-semibold tracking-[-0.02em] text-ink">Payments platform · phase two</span>
          <span className="inline-flex items-center gap-[6px] rounded-full bg-ok/10 px-[9px] py-[3px] text-[11px] font-semibold text-ok">
            <span className="size-[5px] rounded-full bg-ok" aria-hidden /> On track
          </span>
        </div>
        <p className="mb-4 font-figure text-[11.5px] text-ink-40">Four engineers · month 30</p>

        <LeadTimeTrend />

        <dl className="mt-4 grid grid-cols-1 gap-0 border-t border-rule-soft">
          {ROWS.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-rule-soft py-[9px] last:border-b-0">
              <dt className="text-[12.5px] text-ink-60">{k}</dt>
              <dd className="m-0 font-figure text-[12.5px] font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
