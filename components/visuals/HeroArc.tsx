/**
 * The radial tick arc in the hero's lower right.
 *
 * Decorative, and the brand is wary of that — the web plan dropped the
 * 22vw ghost headline as "decoration with no information". This earns its
 * place differently: it is a dial, and the ticks are evenly spaced across
 * exactly 90°, so it reads as measurement rather than ornament. It also
 * does the job the mesh alone cannot, which is to give the right half of
 * the panel something to hold while the type stays left.
 *
 * Everything is drawn in white at low alpha, so it strengthens as the mesh
 * ramp darkens toward the bottom and disappears into the near-white top —
 * no hard edge anywhere against the gradient.
 */

const TICKS = 44;
// Measured from the +x axis. The disc hangs off the panel's bottom-right,
// so the only quadrant that faces into the composition is the upper-left —
// that is where the ticks have to sit to be seen at all.
const START = -190;
const SWEEP = 104;

const R_OUTER = 300;
const R_INNER = 252;
const CX = 300;
const CY = 300;

const polar = (r: number, deg: number): [number, number] => {
  const t = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(t), CY + r * Math.sin(t)];
};

export function HeroArc({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: TICKS + 1 }, (_, i) => {
    const deg = START + (SWEEP * i) / TICKS;
    const [x1, y1] = polar(R_INNER, deg);
    const [x2, y2] = polar(R_OUTER, deg);
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden
      className={`pointer-events-none absolute select-none ${className}`}
    >
      {/* the disc the ticks sit against — iris, barely there */}
      <circle cx={CX} cy={CY} r={R_INNER - 14} fill="var(--color-iris)" fillOpacity="0.10" />
      <circle cx={CX} cy={CY} r={R_INNER - 14} fill="none"
              stroke="#fff" strokeOpacity="0.30" strokeWidth="1" />
      {ticks.map((t) => (
        <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </svg>
  );
}
