/**
 * Infinite logomark — a Möbius band on a Gerono lemniscate.
 *
 * Ported from infinite-book-build.py:16-40, which is the brand book's own
 * generator and therefore the source of truth. The mark stays parametric so
 * it remains derivable from the brand constants rather than being a pasted
 * blob of path data that nobody can regenerate.
 *
 *   x(t) = CX + A·cos t
 *   y(t) = CY + (B/2)·sin 2t
 *
 * Band width tapers to 42% at the crossing. Without that taper the two halves
 * go visually heavy where they meet and the mark reads as a blob at small
 * sizes — see brand book §06.
 */

export const VIEW_BOX = "0 0 210 130";

const A = 92.0; // half-width
const B = 104.0; // height
const CX = 105.0;
const CY = 65.0;
const W0 = 30.0; // band width at the lobe

const point = (t: number): [number, number] => [
  CX + A * Math.cos(t),
  CY + (B / 2) * Math.sin(2 * t),
];

const width = (t: number): number => W0 * (0.42 + 0.58 * Math.abs(Math.cos(t)));

/** Offset the centreline by ±half the band width along its normal. */
function band(t0: number, t1: number, steps = 96): string {
  const outer: [number, number][] = [];
  const inner: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const [x, y] = point(t);

    // central difference for the tangent, then rotate 90° for the normal
    const h = 1e-4;
    const [x1, y1] = point(t - h);
    const [x2, y2] = point(t + h);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1e-9;
    const nx = -dy / len;
    const ny = dx / len;

    const hw = width(t) / 2;
    outer.push([x + nx * hw, y + ny * hw]);
    inner.push([x - nx * hw, y - ny * hw]);
  }

  const pts = [...outer, ...inner.reverse()];
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;
}

/** The half that passes behind at the crossing. */
export const PATH_BACK = band(Math.PI / 2, (3 * Math.PI) / 2);

/** The half that passes in front. Drawn second. */
export const PATH_FRONT = band((3 * Math.PI) / 2, (5 * Math.PI) / 2);
