/**
 * Lead time, 12 months. One series, so no legend — the label names it.
 * Single axis, recessive grid, 2px line, emphasised endpoint with a direct
 * label. No tooltip layer: this sits inside a product mock, depicting the
 * product rather than presenting data for the reader to interrogate.
 */
const DAYS = [31, 29, 26, 24, 19, 17, 14, 12, 10, 8.4, 7.1, 6.2];

const W = 520, H = 132, PAD_T = 14, PAD_B = 20;
const max = Math.max(...DAYS);
const x = (i: number) => (i / (DAYS.length - 1)) * W;
const y = (v: number) => PAD_T + (1 - v / max) * (H - PAD_T - PAD_B);

const line = DAYS.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
const area = `${line} L ${W} ${H - PAD_B} L 0 ${H - PAD_B} Z`;

export function LeadTimeTrend() {
  const lastX = x(DAYS.length - 1);
  const lastY = y(DAYS[DAYS.length - 1]);
  return (
    <figure className="m-0">
      <figcaption className="mb-2 flex items-baseline justify-between">
        <span className="text-[11px] font-semibold text-ink-60">Lead time to production</span>
        <span className="font-figure text-[11px] text-ink-40">12 months</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img"
           aria-label="Lead time to production fell from 31 days to 6.2 days over 12 months">
        <defs>
          <linearGradient id="lt-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2B5CF6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* recessive grid */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={PAD_T + f * (H - PAD_T - PAD_B)} y2={PAD_T + f * (H - PAD_T - PAD_B)}
                stroke="#DFE5F1" strokeWidth="1" />
        ))}
        <line x1="0" x2={W} y1={H - PAD_B} y2={H - PAD_B} stroke="#DFE5F1" strokeWidth="1" />
        <path d={area} fill="url(#lt-fill)" />
        <path d={line} fill="none" stroke="#2B5CF6" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
        {/* emphasised endpoint */}
        <circle cx={lastX} cy={lastY} r="4.5" fill="#2B5CF6" stroke="#FFFFFF" strokeWidth="2" />
        <text x="4" y={H - 6} className="font-figure" fontSize="10" fill="#8B92AC">31d</text>
        <text x={lastX} y={H - 6} textAnchor="end" className="font-figure" fontSize="10" fill="#2B5CF6">6.2d</text>
      </svg>
    </figure>
  );
}
