#!/usr/bin/env python3
"""
Build infinite-brand-book.html — a paginated landscape brand manual.

Pages are data, not markup: every page is one call to page() or divider().
Geometry comes from the same Gerono lemniscate used for the artwork, so the
book and the logo files can never drift apart.

    python3 infinite-book-build.py
"""
import math, os, json

HERE = os.path.dirname(os.path.abspath(__file__))
SCRATCH = "/private/tmp/claude-501/-Users-amanhsn-infinity/53bdbfc8-034a-49aa-8eed-c90f9c96d587/scratchpad/"

# ── geometry ────────────────────────────────────────────────────────────────
A, BB, CX, CY = 92.0, 104.0, 105.0, 65.0
W0 = 30.0

def _pt(t):  return (CX + A*math.cos(t), CY + (BB/2)*math.sin(2*t))
def _wid(t): return W0 * (0.42 + 0.58*abs(math.cos(t)))

def band(t0, t1, steps=96):
    outer, inner = [], []
    for i in range(steps+1):
        t = t0 + (t1-t0)*i/steps
        x, y = _pt(t)
        h = 1e-4
        x1, y1 = _pt(t-h); x2, y2 = _pt(t+h)
        dx, dy = x2-x1, y2-y1
        L = math.hypot(dx, dy) or 1e-9
        nx, ny = -dy/L, dx/L
        hw = _wid(t)/2
        outer.append((x+nx*hw, y+ny*hw))
        inner.append((x-nx*hw, y-ny*hw))
    pts = outer + inner[::-1]
    return "M " + " L ".join(f"{px:.1f} {py:.1f}" for px, py in pts) + " Z"

RB_BACK  = band(math.pi/2, 3*math.pi/2)
RB_FRONT = band(3*math.pi/2, 5*math.pi/2)

# ── colour maths ────────────────────────────────────────────────────────────
def rgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def cmyk(h):
    r, g, b = [v/255 for v in rgb(h)]
    k = 1 - max(r, g, b)
    if k >= 0.999: return (0, 0, 0, 100)
    c = (1-r-k)/(1-k); m = (1-g-k)/(1-k); y = (1-b-k)/(1-k)
    return tuple(round(v*100) for v in (c, m, y, k))

def lum(h):
    def ch(v):
        v /= 255
        return v/12.92 if v <= 0.03928 else ((v+0.055)/1.055)**2.4
    r, g, b = rgb(h)
    return 0.2126*ch(r) + 0.7152*ch(g) + 0.0722*ch(b)

def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi+0.05)/(lo+0.05), 1)

def mix(h, t, target=(255, 255, 255)):
    r, g, b = rgb(h)
    return "#%02X%02X%02X" % tuple(round(v + (tv-v)*t) for v, tv in zip((r, g, b), target))

# ── palette ─────────────────────────────────────────────────────────────────
INK, PAPER = "#0A1024", "#FFFFFF"
COBALT, SKY, IRIS, ORCHID, BLUSH = "#2B5CF6", "#4FC7F2", "#7A4DF5", "#C07BF0", "#F7AFD2"

# ── svg helpers ─────────────────────────────────────────────────────────────
def mk(style="", cls="", h="", label="Infinite logomark"):
    s = f'height:{h};' if h else ''
    return (f'<svg class="{cls}" viewBox="0 0 210 130" style="{s}{style}" '
            f'role="img" aria-label="{label}"><use href="#mk"/></svg>')

def lockup(cls="", mkh="7cqw", wd="7.6cqw", tag=True, sub="Design. Develop. Refine."):
    t = f'<small>{sub}</small>' if tag else ''
    return (f'<div class="lk {cls}"><svg viewBox="0 0 210 130" style="height:{mkh}" role="img" '
            f'aria-label="Infinite"><use href="#mk"/></svg>'
            f'<span class="wd" style="font-size:{wd}">Infinite{t}</span></div>')

# ── page collection ─────────────────────────────────────────────────────────
PAGES = []

def divider(title, n):
    PAGES.append(f'''<div class="page div">
  <span class="dv-n">{n}</span>
  <h1 class="dv-t">{title}</h1>
</div>''')

def page(sec, title, lede="", body="", cls=""):
    PAGES.append(f'''<div class="page {cls}">
  <div class="p-hd"><span class="p-sec">{sec}</span>{mk(cls="p-gl", h="1.5cqw", label="")}</div>
  <div class="p-bd">
    <div class="p-lead">
      <h2>{title}</h2>
      {f'<p>{lede}</p>' if lede else ''}
    </div>
    <div class="p-zone">{body}</div>
  </div>
</div>''')

def tile(inner, ground="paper", style="", cap=""):
    c = f'<div class="t-cap">{cap}</div>' if cap else ''
    return f'<div class="tile {ground}" style="{style}">{inner}</div>{c}'

print("geometry + palette ready")

# ── stylesheet ──────────────────────────────────────────────────────────────
# Everything inside a page is sized in cqw (1cqw = 1% of page width), so a
# page renders identically on screen at any width and on paper at 297mm.
CSS = """
:root{
  --paper:#FFFFFF;
  --page:#EFF1F6;
  --backdrop:#565C6B;
  --ink:#0A1024;
  --ink-60:#555C77;
  --ink-40:#8B92AC;
  --ink-25:#B4BACB;
  --rule:#DFE5F1;
  --cobalt:#2B5CF6;
  --sky:#4FC7F2;
  --iris:#7A4DF5;
  --orchid:#C07BF0;
  --blush:#F7AFD2;
  --ff:"Figtree","Helvetica Neue",Arial,sans-serif;
  --fm:"IBM Plex Mono",ui-monospace,Menlo,monospace;
  --mesh:
    radial-gradient(58% 68% at 12% 16%, #74D9F7 0%, rgba(116,217,247,0) 62%),
    radial-gradient(54% 62% at 84% 20%, #CBA9F6 0%, rgba(203,169,246,0) 60%),
    radial-gradient(68% 78% at 74% 90%, #F4B2D6 0%, rgba(244,178,214,0) 58%),
    radial-gradient(64% 74% at 26% 84%, #3F7BF7 0%, rgba(63,123,247,0) 62%),
    linear-gradient(135deg,#4FA8F2 0%,#5B7CF6 42%,#8E6BF3 72%,#BC92EF 100%);
  --mesh-light:
    radial-gradient(56% 60% at 14% 90%, #4FC7F2 0%, rgba(79,199,242,0) 60%),
    radial-gradient(54% 58% at 50% 104%, #2B5CF6 0%, rgba(43,92,246,0) 62%),
    radial-gradient(56% 60% at 84% 94%, #C07BF0 0%, rgba(192,123,240,0) 60%),
    linear-gradient(180deg,#FFFFFF 0%,#F7FAFE 34%,#EAF1FD 60%,#D6E3F9 82%,#B6C6F2 100%);
}
*{ box-sizing:border-box; }
html{ -webkit-text-size-adjust:100%; }
body{
  margin:0; background:var(--backdrop); color:var(--ink);
  font-family:var(--ff); -webkit-font-smoothing:antialiased;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
.book{ max-width:1320px; margin-inline:auto; padding:16px; display:flex; flex-direction:column; gap:16px; }

.page{
  container-type:inline-size;
  aspect-ratio:16/9; width:100%;
  background:var(--page); position:relative; overflow:hidden;
  display:flex; flex-direction:column;
}

/* ── colour modes ──
   The page default is declared FIRST so a mode class on the same element wins:
   .page and .on-ink have equal specificity, so source order decides. ── */
.page{ --rb-front:var(--ink); --rb-back:url(#gBandInkBack); }
.on-white{ --rb-front:url(#gBand); --rb-back:url(#gBandBack); }
.on-ink{ --rb-front:#FFFFFF; --rb-back:url(#gBandWhiteBack); color:#FFFFFF; }
.on-grad{ --rb-front:var(--ink); --rb-back:url(#gBandInkBack); color:var(--ink); }
.mono{ --rb-front:var(--ink); --rb-back:var(--ink); }
.mono-w{ --rb-front:#FFFFFF; --rb-back:#FFFFFF; }

/* ── divider ── */
.page.div{ background:var(--mesh); justify-content:flex-end; padding:5.2cqw; }
.dv-n{
  position:absolute; top:5.2cqw; left:5.2cqw;
  font-weight:700; font-size:0.95cqw; letter-spacing:0.22em;
  text-transform:uppercase; color:rgba(255,255,255,0.72);
}
.dv-t{ margin:0; font-weight:700; font-size:11cqw; letter-spacing:-0.045em; line-height:0.84; color:#FFFFFF; }

/* ── content page ── */
.p-hd{
  display:flex; justify-content:space-between; align-items:center;
  padding:4.4cqw 5.2cqw 0;
}
.p-sec{ font-weight:500; font-size:1.05cqw; letter-spacing:-0.01em; color:var(--ink-40); }
.p-gl{ opacity:0.3; width:auto; }
.p-bd{ flex:1; display:flex; gap:3.6cqw; padding:3.2cqw 5.2cqw 5.2cqw; min-height:0; }
.p-lead{ width:21cqw; flex:none; }
.p-lead h2{ margin:0 0 1cqw; font-weight:700; font-size:2.3cqw; letter-spacing:-0.032em; line-height:1.1; }
.p-lead p{ margin:0; font-size:0.92cqw; line-height:1.62; color:var(--ink-60); }
.p-zone{ flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; }
.page.wide .p-bd{ flex-direction:column; gap:2.4cqw; }
.page.wide .p-lead{ width:46cqw; }
.page.wide .p-lead p{ max-width:44cqw; }

/* ── tiles & cards ── */
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:1.5cqw; }
.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:1.5cqw; }
.grid4{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.2cqw; }
.tile{
  border-radius:1.1cqw; display:flex; align-items:center; justify-content:center;
  aspect-ratio:16/9; padding:2cqw; overflow:hidden;
}
.tile.paper{ background:var(--paper); border:0.08cqw solid var(--rule); }
.tile.edge{ background:var(--paper); border:0.08cqw solid var(--cobalt); }
.tile.ink{ background:var(--ink); }
.tile.grad{ background:var(--mesh); }
.tile.gradl{ background:var(--mesh-light); }
.t-cap{ font-size:0.78cqw; color:var(--ink-40); margin-top:0.7cqw; line-height:1.5; }
.cell{ display:flex; flex-direction:column; }

/* ── swatches ── */
.sw{ background:var(--paper); border-radius:1.1cqw; overflow:hidden; display:flex; flex-direction:column; }
.sw-chip{ height:9cqw; display:flex; align-items:flex-end; padding:1cqw; }
.sw-b{ padding:1.2cqw 1.3cqw 1.4cqw; flex:1; }
.sw-n{ font-weight:700; font-size:1.15cqw; letter-spacing:-0.02em; }
.sw-h{ font-family:var(--fm); font-size:0.82cqw; color:var(--ink-60); margin:0.25cqw 0 0.9cqw; }
.sw-g{ display:grid; grid-template-columns:1fr 1fr; gap:0 0.8cqw; font-family:var(--fm); font-size:0.72cqw; color:var(--ink-40); line-height:1.6; }
.sw-r{ display:flex; height:2.2cqw; }
.sw-r i{ flex:1; }
.pill{
  display:inline-flex; align-items:center; gap:0.3cqw; padding:0.25cqw 0.6cqw;
  border-radius:1cqw; font-family:var(--fm); font-size:0.66cqw; font-weight:500;
}

/* ── lockup ── */
.lk{ display:flex; align-items:center; gap:1.5cqw; }
.lk .wd{ font-weight:600; letter-spacing:-0.052em; line-height:0.86; }
.lk .wd small{
  display:block; font-weight:600; font-size:0.155em; letter-spacing:0.3em;
  text-transform:uppercase; margin-top:0.42em; line-height:1; opacity:0.62;
}
.lk.v{ flex-direction:column; text-align:center; gap:1.2cqw; }

/* ── misc ── */
.spec{ display:flex; flex-direction:column; }
.spec div{ display:flex; justify-content:space-between; gap:1.5cqw; padding:0.62cqw 0; border-bottom:0.07cqw solid var(--rule); font-size:0.85cqw; }
.spec div:last-child{ border-bottom:0; }
.spec .k{ color:var(--ink-60); }
.spec .v{ font-family:var(--fm); font-size:0.78cqw; }
.note{ font-size:0.82cqw; color:var(--ink-40); line-height:1.6; margin:1.2cqw 0 0; }
.xm{ color:#CE3F35; font-weight:700; }
.ok{ color:#1F9268; font-weight:700; }
.cover{ background:var(--mesh); padding:5.2cqw; justify-content:space-between; }
.cv-t{ display:flex; justify-content:space-between; align-items:flex-start; }
.cv-l{ font-weight:700; font-size:0.95cqw; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.75); }
.ui{ background:var(--paper); border-radius:0.9cqw; overflow:hidden; font-size:0.72cqw; border:0.07cqw solid var(--rule); }
.ui.d{ background:#12182C; border-color:#232B45; color:#E6EAF6; }
.ui-b{ display:flex; align-items:center; gap:0.6cqw; padding:0.8cqw 1cqw; border-bottom:0.07cqw solid var(--rule); }
.ui.d .ui-b{ border-color:#232B45; }
.ui-r{ padding:0.7cqw 1cqw; border-bottom:0.07cqw solid var(--rule); }
.ui.d .ui-r{ border-color:#232B45; }
.ui-r:last-child{ border-bottom:0; }

@media print{
  @page{ size:297mm 167mm; margin:0; }
  body{ background:#FFFFFF; }
  .book{ max-width:none; padding:0; gap:0; }
  .page{ width:297mm; height:167mm; aspect-ratio:auto; break-after:page; page-break-after:always; }
  .page:last-child{ break-after:auto; }
}
@media (max-width:760px){ .book{ padding:8px; gap:8px; } }
"""
print("css ready")

# ── swatch helpers ──────────────────────────────────────────────────────────
def ramp(h, n=10):
    # near-white ramps toward ink instead, or the strip renders invisible
    target = rgb(INK) if lum(h) > 0.85 else (255, 255, 255)
    return "".join(f'<i style="background:{mix(h,1-(i+1)/n,target)}"></i>' for i in range(n))

def swatch(name, hexv, role, chip_fg=None):
    r, g, b = rgb(hexv); c, m, y, k = cmyk(hexv)
    cw, ci = contrast(hexv, "#FFFFFF"), contrast(hexv, INK)
    fg = chip_fg or ("#FFFFFF" if lum(hexv) < 0.4 else INK)
    pills = (f'<span class="pill" style="background:rgba(255,255,255,0.9);color:{INK}">{cw} on white</span>'
             f'<span class="pill" style="background:rgba(10,16,36,0.82);color:#FFF">{ci} on ink</span>')
    edge = "box-shadow:inset 0 0 0 0.08cqw var(--rule);" if hexv.upper() == "#FFFFFF" else ""
    return f'''<div class="sw">
      <div class="sw-chip" style="background:{hexv};{edge}gap:0.4cqw">{pills}</div>
      <div class="sw-b">
        <div class="sw-n">{name}</div>
        <div class="sw-h">{hexv}</div>
        <div class="sw-g"><span>R {r}</span><span>C {c}</span><span>G {g}</span><span>M {m}</span>
          <span>B {b}</span><span>Y {y}</span><span>&nbsp;</span><span>K {k}</span></div>
      </div>
      <div class="sw-r">{ramp(hexv)}</div>
      <div class="sw-b" style="flex:none;padding-top:0.9cqw"><div class="t-cap" style="margin:0">{role}</div></div>
    </div>'''

# ═══ COVER ═══
PAGES.append(f'''<div class="page cover on-ink">
  <div class="cv-t">
    <span class="cv-l">Brand Guidelines</span>
    <span class="cv-l">v1.0 · September 2026</span>
  </div>
  {lockup(mkh="9cqw", wd="10cqw")}
  <div class="cv-t">
    <span class="cv-l">Infinite</span>
    <span class="cv-l">Route C · Continuum</span>
  </div>
</div>''')

# ═══ CONTENTS ═══
TOC = [("01", "Logo", "Introduction, construction, clear space, the ramp, don'ts"),
       ("02", "Logo Usage", "Sizes, tagline lockups, co-branding, do's and don'ts"),
       ("03", "Colour", "Primary, extended, the gradient system, greys and states"),
       ("04", "Typography", "Typefaces, hierarchy and clear space"),
       ("05", "Surfaces", "Brand surfaces and product surfaces")]
rows = "".join(f'''<div style="display:flex;gap:2.4cqw;padding:1.5cqw 0;border-bottom:0.07cqw solid var(--rule)">
    <span style="font-family:var(--fm);font-size:0.9cqw;color:var(--ink-40);width:3cqw">{n}</span>
    <span style="font-weight:700;font-size:1.5cqw;letter-spacing:-0.025em;width:16cqw">{t}</span>
    <span style="font-size:0.9cqw;color:var(--ink-60);flex:1;align-self:center">{d}</span>
  </div>''' for n, t, d in TOC)
page("Infinite", "Contents",
     "This manual documents one identity. The three-route exploration that "
     "produced it is a separate document.",
     f'<div style="display:flex;flex-direction:column">{rows}</div>')

# ═══ 01 LOGO ═══
divider("Logo", "01")

page("Logo", "Logo introduction",
     "The logo is the mark and the word, drawn to a fixed relationship. Use the "
     "full lockup unless the space genuinely will not take it.",
     f'''<div class="grid2">
       <div class="cell">{tile(lockup("on-white", "3.4cqw", "3.7cqw"), "edge", cap="Full colour on white — the default")}</div>
       <div class="cell">{tile(lockup("on-ink", "3.4cqw", "3.7cqw"), "ink", cap="Reversed on ink")}</div>
       <div class="cell">{tile(lockup("on-grad", "3.4cqw", "3.7cqw"), "grad", cap="Ink on gradient — covers, icons")}</div>
       <div class="cell">{tile(lockup("mono", "3.4cqw", "3.7cqw"), "paper", cap="One tone — print, etching, stitching")}</div>
     </div>''')

page("Logo", "Construction",
     "The centreline is a Gerono lemniscate, defined by two numbers. Anyone can "
     "redraw the mark exactly — there is no tracing and no drift between versions.",
     f'''<div style="display:flex;gap:3cqw;align-items:center">
       <div style="flex:1">{tile(mk(h="11cqw", cls="on-white"), "paper")}</div>
       <div style="width:22cqw">
         <div style="font-family:var(--fm);font-size:1cqw;line-height:2;margin-bottom:1.2cqw">
           x(t) = a · cos t<br>y(t) = (b/2) · sin 2t</div>
         <div class="spec">
           <div><span class="k">Half-width a</span><span class="v">92</span></div>
           <div><span class="k">Height b</span><span class="v">104</span></div>
           <div><span class="k">Band at lobe</span><span class="v">30</span></div>
           <div><span class="k">Band at crossing</span><span class="v">12.6 · 42%</span></div>
           <div><span class="k">Ratio</span><span class="v">1.615 : 1</span></div>
         </div>
       </div>
     </div>''')

page("Logo", "Clear space",
     "Leave room around the logo equal to half the mark's height — 65 units in the "
     "artwork. Nothing enters it: no type, no rule, no photograph edge.",
     f'''{tile(f"""<svg viewBox="-46 -46 302 222" style="width:100%;height:100%" role="img" aria-label="Clear space diagram">
        <rect x="-46" y="-46" width="302" height="222" fill="#F4F7FD"/>
        <rect x="-28" y="-28" width="266" height="186" fill="none" stroke="{COBALT}" stroke-width="1.7" stroke-dasharray="8 7" opacity="0.8"/>
        <g class="on-white"><use href="#mk"/></g>
        <g stroke="{COBALT}" stroke-width="1.5" opacity="0.8">
          <path d="M -28 -36 L 0 -36"/><path d="M -28 -40 L -28 -32"/><path d="M 0 -40 L 0 -32"/>
        </g>
        <text x="-14" y="-46" text-anchor="middle" fill="{COBALT}" style="font:700 13px var(--ff)">x</text>
      </svg>""", "paper", "aspect-ratio:auto;height:26cqw;padding:1.4cqw")}
      <p class="note">x = 65 units = half the mark height. The dashed field is a minimum, not a target.</p>''')

page("Logo", "One ramp, two states",
     "A single left-to-right ramp runs across the whole mark, and both halves sample "
     "it at the same point — so the colour never breaks at the join. The receding "
     "half is that same ramp lifted toward white as the surface turns away.",
     f'''<div style="display:flex;gap:2cqw;align-items:center">
       <div style="flex:1">{tile(mk(h="10cqw", cls="on-white"), "paper")}</div>
       <div style="flex:1">
         <div style="display:flex;height:3.4cqw;border-radius:0.5cqw;overflow:hidden;
              background:linear-gradient(90deg,{SKY},{COBALT} 34%,{IRIS} 67%,{ORCHID})"></div>
         <div class="t-cap" style="margin-bottom:1.4cqw">Front — full strength, sampled across the mark's width</div>
         <div style="display:flex;height:3.4cqw;border-radius:0.5cqw;overflow:hidden;
              background:linear-gradient(90deg,#BCEAFA,#8EB3F9 50%,#7E81F8)"></div>
         <div class="t-cap">Back — the same ramp, lifted 62% toward white at the tip, 26% at the crossing</div>
         <p class="note">The only tonal step left is at the crossing, which is exactly where
           one surface passes in front of another. Remove it and the twist reads flat.</p>
       </div>
     </div>''')

page("Logo", "Logo don'ts", "",
     f'''<div class="grid3">
       <div class="cell">{tile(mk(h="5cqw", cls="on-white", style="transform:rotate(-14deg)"), "paper", cap="<span class='xm'>✕</span> Never rotate")}</div>
       <div class="cell">{tile(mk(h="5cqw", cls="on-white", style="transform:scaleX(1.45)"), "paper", cap="<span class='xm'>✕</span> Never stretch")}</div>
       <div class="cell">{tile(mk(h="5cqw", style="--rb-front:#E0453B;--rb-back:#F5B21E"), "paper", cap="<span class='xm'>✕</span> Never recolour off-palette")}</div>
       <div class="cell">{tile(mk(h="5cqw", style="--rb-front:#98A2BE;--rb-back:#C7D2EC"), "paper", cap="<span class='xm'>✕</span> Never tint the front half")}</div>
       <div class="cell">{tile(mk(h="5cqw", cls="on-white", style="filter:drop-shadow(0 0.4cqw 0.35cqw rgba(10,16,36,0.5))"), "paper", cap="<span class='xm'>✕</span> Never add shadow or glow")}</div>
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:0.2cqw">{mk(h="3.4cqw", cls="on-white")}<span style="font-weight:600;font-size:2.4cqw;letter-spacing:-0.05em">Infinite</span></div>', "paper", cap="<span class='xm'>✕</span> Never crowd the mark")}</div>
     </div>''', cls="wide")
print(f"pages so far: {len(PAGES)}")

# ═══ 02 LOGO USAGE ═══
divider("Logo Usage", "02")

page("Logo Usage", "Sizes and alternates",
     "Below 40 px the second tone stops reading as depth and starts reading as a "
     "printing fault. That is the switch point to the one-tone cut.",
     f'''<div style="display:flex;align-items:flex-end;gap:4cqw;justify-content:center;padding:2cqw 0">
       <div style="text-align:center">{mk(h="7cqw", cls="on-white")}<div class="t-cap">168 px · slide</div></div>
       <div style="text-align:center">{mk(h="4cqw", cls="on-white")}<div class="t-cap">88 px · web header</div></div>
       <div style="text-align:center">{mk(h="2.2cqw", cls="on-white")}<div class="t-cap">44 px · app bar</div></div>
       <div style="text-align:center">{mk(h="1.2cqw", cls="mono")}<div class="t-cap">22 px · one tone</div></div>
     </div>
     <div class="spec" style="margin-top:1cqw">
       <div><span class="k">Minimum full lockup</span><span class="v">88 px wide</span></div>
       <div><span class="k">Minimum mark, two tone</span><span class="v">40 px wide</span></div>
       <div><span class="k">Minimum mark, one tone</span><span class="v">16 px wide</span></div>
     </div>''')

page("Logo Usage", "Tagline lockups",
     "The tagline is a rule of three and carries the whole engagement. It is set in "
     "Figtree 600, uppercase, tracked +0.28 em, at 0.20 × the wordmark cap height.",
     f'''<div class="grid2">
       <div class="cell">{tile(lockup("on-white", "3.2cqw", "3.5cqw"), "paper", cap="Primary · horizontal")}</div>
       <div class="cell">{tile(f'<div class="lk v on-white"><svg viewBox="0 0 210 130" style="height:3.4cqw"><use href="#mk"/></svg><span class="wd" style="font-size:3.1cqw">Infinite<small>Design. Develop. Refine.</small></span></div>', "paper", cap="Stacked · square containers")}</div>
       <div class="cell">{tile(lockup("on-white", "3.2cqw", "3.5cqw", tag=False), "paper", cap="Short form · tight spaces")}</div>
       <div class="cell">{tile(mk(h="4.4cqw", cls="on-white"), "paper", cap="Mark alone · icons, favicons, stitching")}</div>
     </div>''')

page("Logo Usage", "Co-branding",
     "When Infinite appears beside a client or partner mark, both sit on a shared "
     "optical centreline with a hairline rule between them. Infinite never leads "
     "on a client's own material.",
     f'''<div class="grid2">
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:1.6cqw">{mk(h="3cqw", cls="on-white")}<span style="width:0.07cqw;height:3.4cqw;background:var(--rule)"></span><span style="font-weight:600;font-size:1.9cqw;letter-spacing:-0.03em;color:var(--ink-40)">Client</span></div>', "paper", cap="Partner lockup · equal weight")}</div>
       <div class="cell">{tile(f'<div style="text-align:center"><div style="font-weight:700;font-size:0.72cqw;letter-spacing:0.24em;text-transform:uppercase;color:var(--ink-40);margin-bottom:0.8cqw">Delivered by</div>{mk(h="2.8cqw", cls="on-white")}</div>', "paper", cap="Endorsement · Infinite in support")}</div>
     </div>
     <p class="note">Clear space applies to both marks independently. Never scale one to match
       the other's bounding box — match optical weight instead.</p>''')

page("Logo Usage", "Do's and don'ts", "",
     f'''<div class="grid3">
       <div class="cell">{tile(lockup("on-white","2.4cqw","2.6cqw"), "paper", cap="<span class='ok'>✓</span> Full colour on white or mist")}</div>
       <div class="cell">{tile(lockup("on-ink","2.4cqw","2.6cqw"), "ink", cap="<span class='ok'>✓</span> Reversed on ink or photography")}</div>
       <div class="cell">{tile(lockup("on-grad","2.4cqw","2.6cqw"), "grad", cap="<span class='ok'>✓</span> Ink on the brand gradient")}</div>
       <div class="cell">{tile(f'<div class="lk on-white" style="gap:0.3cqw"><svg viewBox="0 0 210 130" style="height:2.4cqw"><use href="#mk"/></svg><span class="wd" style="font-size:2.6cqw">Infinite</span></div>', "paper", cap="<span class='xm'>✕</span> Never close the gap")}</div>
       <div class="cell">{tile(f'<div class="lk" style="--rb-front:{ORCHID};--rb-back:#E3CBF8"><svg viewBox="0 0 210 130" style="height:2.4cqw"><use href="#mk"/></svg><span class="wd" style="font-size:2.6cqw;color:{ORCHID}">Infinite</span></div>', "paper", cap="<span class='xm'>✕</span> Never colour the wordmark")}</div>
       <div class="cell">{tile(lockup("on-white","2.4cqw","2.6cqw"), "gradl", cap="<span class='xm'>✕</span> Never place colour artwork on the gradient")}</div>
     </div>''', cls="wide")

# ═══ 03 COLOUR ═══
divider("Colour", "03")

page("Colour", "Primary colours",
     "Three colours carry the brand. Paper and ink do the work; cobalt does the "
     "pointing. The category is warm — staying cool is the differentiator.",
     f'''<div class="grid3">
       {swatch("Paper", "#FFFFFF", "The default ground. Most of the brand is this colour.")}
       {swatch("Cobalt", COBALT, "Primary accent. Links, focus, the one thing that acts.")}
       {swatch("Ink", INK, "All body text. A navy-black, never #000.")}
     </div>''', cls="wide")

page("Colour", "Extended palette",
     "Four hues that exist to build the ramp. Sky, iris, orchid and blush are "
     "gradient stops — they are never flat fills behind text.",
     f'''<div class="grid4">
       {swatch("Sky", SKY, "Ramp start")}
       {swatch("Iris", IRIS, "Ramp middle")}
       {swatch("Orchid", ORCHID, "Ramp end")}
       {swatch("Blush", BLUSH, "The one warm note")}
     </div>''', cls="wide")

page("Colour", "The gradient system",
     "Two gradients, one palette. The light mesh rises out of white and sits behind "
     "content. The frame mesh is evenly lit and carries the logo alone.",
     f'''<div class="grid2">
       <div class="cell">{tile("", "gradl", cap="Light mesh — hero panels, covers, page grounds")}</div>
       <div class="cell">{tile("", "grad", cap="Frame mesh — logo frames, app icons, social")}</div>
     </div>
     <div class="spec" style="margin-top:1.4cqw">
       <div><span class="k">Paper &amp; mist</span><span class="v">~80% of any surface</span></div>
       <div><span class="k">Ink</span><span class="v">~15%</span></div>
       <div><span class="k">Cobalt</span><span class="v">~4%</span></div>
       <div><span class="k">Gradient</span><span class="v">~1%</span></div>
     </div>
     <p class="note">If the gradient is on more than one surface in a room, it has stopped being special.</p>''')

GREYS = [("Ground", "#FFFFFF", "#0A1024"), ("Raised", "#F4F7FD", "#12182C"),
         ("Rule", "#DFE5F1", "#232B45"), ("Text", "#0A1024", "#E6EAF6"),
         ("Text quiet", "#666E8C", "#8B92AC"), ("Accent", "#2B5CF6", "#7FA0FF")]
grows = "".join(f'''<div style="display:flex;gap:1.4cqw;padding:0.75cqw 0;border-bottom:0.07cqw solid var(--rule);font-size:0.85cqw;align-items:center">
    <span style="width:8cqw;color:var(--ink-60)">{n}</span>
    <span style="display:flex;align-items:center;gap:0.5cqw;width:9cqw;font-family:var(--fm);font-size:0.75cqw">
      <i style="width:0.9cqw;height:0.9cqw;border-radius:0.15cqw;background:{l};box-shadow:inset 0 0 0 0.07cqw var(--rule)"></i>{l}</span>
    <span style="display:flex;align-items:center;gap:0.5cqw;font-family:var(--fm);font-size:0.75cqw">
      <i style="width:0.9cqw;height:0.9cqw;border-radius:0.15cqw;background:{d}"></i>{d}</span>
  </div>''' for n, l, d in GREYS)
page("Colour", "Greys and states",
     "The neutrals are pulled toward the blue — there is no true grey anywhere in "
     "the system. That is what stops documents looking like a template.",
     f'''<div style="display:flex;gap:3cqw">
       <div style="flex:1">
         <div style="display:flex;gap:1.4cqw;padding-bottom:0.6cqw;font-weight:700;font-size:0.72cqw;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-40)">
           <span style="width:8cqw">Token</span><span style="width:9cqw">Light</span><span>Dark</span></div>
         {grows}
       </div>
       <div style="width:20cqw">
         <div class="spec">
           <div><span class="k">Success</span><span class="v">#1F9268</span></div>
           <div><span class="k">Warning</span><span class="v">#B07A00</span></div>
           <div><span class="k">Critical</span><span class="v">#CE3F35</span></div>
         </div>
         <p class="note">Semantic colour is separate from the accent. Cobalt never means
           "good" and green never means "brand".</p>
       </div>
     </div>''')
print(f"pages so far: {len(PAGES)}")

# ═══ 04 TYPOGRAPHY ═══
divider("Typography", "04")

ABC = ("Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm<br>"
       "Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br>0 1 2 3 4 5 6 7 8 9 &amp; ? ! @ ∞")
page("Typography", "Typefaces",
     "Figtree carries everything — display, body and eyebrows. IBM Plex Mono appears "
     "only where a number has to be trusted. Both are open-licensed, so every "
     "proposal, contract and subcontractor gets the real typeface with no seat to buy.",
     f'''<div class="grid2">
       <div class="tile paper" style="aspect-ratio:auto;flex-direction:column;align-items:flex-start;justify-content:flex-start;padding:2cqw;gap:0.8cqw">
         <div style="font-weight:800;font-size:3.4cqw;letter-spacing:-0.04em;line-height:1">Figtree</div>
         <div class="t-cap" style="margin:0">Display, headings, body, eyebrows · 300–900</div>
         <div style="font-size:1.05cqw;line-height:1.75;margin-top:0.6cqw">{ABC}</div>
       </div>
       <div class="tile paper" style="aspect-ratio:auto;flex-direction:column;align-items:flex-start;justify-content:flex-start;padding:2cqw;gap:0.8cqw">
         <div style="font-family:var(--fm);font-weight:500;font-size:2.7cqw;letter-spacing:-0.02em;line-height:1">IBM Plex Mono</div>
         <div class="t-cap" style="margin:0">Figures only · 400, 500 · tabular</div>
         <div style="font-family:var(--fm);font-size:0.95cqw;line-height:1.85;margin-top:0.6cqw">{ABC}</div>
       </div>
     </div>''', cls="wide")

HR = [("Display", "Figtree 700 · −4.2%", "2.9cqw", "700", "-0.042em", "A team that doesn't drop the thread"),
      ("Heading", "Figtree 600 · −2.8%", "1.7cqw", "600", "-0.028em", "Thirty months on the same platform"),
      ("Body", "Figtree 400 · 1.66 · 64ch", "0.95cqw", "400", "-0.004em", "We staff a squad, not a ticket queue. The engineers who scope the work are the engineers who ship it."),
      ("Eyebrow", "Figtree 700 · +20% · upper", "0.78cqw", "700", "0.2em", "ENGAGEMENT MODEL"),
      ("Data", "IBM Plex Mono 500 · tabular", "1cqw", "500", "0", "99.98% uptime · 14 sprints · 6.2 day lead time")]
trows = "".join(f'''<div style="display:flex;gap:2.4cqw;padding:1.15cqw 0;border-bottom:0.07cqw solid var(--rule);align-items:baseline">
    <div style="width:13cqw;flex:none">
      <div style="font-weight:700;font-size:0.85cqw">{n}</div>
      <div style="font-size:0.75cqw;color:var(--ink-40);line-height:1.5">{d}</div></div>
    <div style="flex:1;min-width:0;font-size:{sz};font-weight:{w};letter-spacing:{ls};line-height:1.25;
      {'font-family:var(--fm);' if n=='Data' else ''}{'color:var(--cobalt);' if n=='Eyebrow' else ''}">{s}</div>
  </div>''' for n, d, sz, w, ls, s in HR)
page("Typography", "Hierarchy and clear space",
     "One scale, used consistently. Running text stays near 64 characters; headings "
     "get text-wrap: balance.",
     f'<div style="display:flex;flex-direction:column">{trows}</div>'
     '<p class="note">The mono face is never used for eyebrows, headings or pull quotes. '
     'The moment it becomes decorative, the system reads as a developer\'s portfolio '
     'rather than a firm that ships for banks.</p>', cls="wide")

# ═══ 05 SURFACES ═══
divider("Surfaces", "05")

CARD_G = f'''<div style="background:var(--mesh);border-radius:0.8cqw;padding:1.5cqw;aspect-ratio:1.75/1;
  display:flex;flex-direction:column;justify-content:space-between" class="on-grad">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1cqw">
    {mk(h="1.7cqw")}
    <span style="font-weight:700;font-size:0.6cqw;letter-spacing:0.2em;text-transform:uppercase;color:rgba(10,16,36,0.6);text-align:right">Design.<br>Develop.<br>Refine.</span>
  </div>
  <div>
    <div style="font-weight:700;font-size:0.95cqw;letter-spacing:-0.018em">Nadir Khan</div>
    <div style="font-size:0.8cqw;color:rgba(10,16,36,0.62)">Director Operations</div>
    <div style="font-family:var(--fm);font-size:0.7cqw;color:rgba(10,16,36,0.72);line-height:1.7;margin-top:0.5cqw">
      nadir@infinite.dev<br>+92 42 000 0000</div>
  </div>
</div>'''

SIG = f'''<div style="background:var(--paper);border:0.07cqw solid var(--rule);border-radius:0.8cqw;padding:1.5cqw;
  display:flex;gap:1.3cqw;align-items:flex-start">
  {mk(h="2.4cqw", cls="mono")}
  <div style="border-left:0.07cqw solid var(--rule);padding-left:1.3cqw">
    <div style="font-weight:700;font-size:0.95cqw;letter-spacing:-0.018em">Nadir Khan</div>
    <div style="font-size:0.8cqw;color:var(--ink-60);margin-bottom:0.45cqw">Director Operations · Infinite</div>
    <div style="font-family:var(--fm);font-size:0.7cqw;color:var(--ink-60);line-height:1.75">
      nadir@infinite.dev · +92 42 000 0000 · infinite.dev</div>
  </div>
</div>'''

page("Surfaces", "Brand surfaces",
     "The identity has to survive where it actually lives: an RFP cover, an email "
     "signature, a lanyard, a phone home screen.",
     f'''<div style="display:grid;grid-template-columns:1.05fr 1.35fr;gap:1.8cqw;align-items:start">
       <div class="cell">{CARD_G}<div class="t-cap">Business card · gradient face</div></div>
       <div class="cell">{SIG}<div class="t-cap">Email signature · one tone, 40 px, no image attachments</div>
         <div style="display:flex;gap:1.2cqw;margin-top:1.4cqw">
           <div style="width:5cqw;height:5cqw;border-radius:1.1cqw;background:var(--mesh);display:flex;align-items:center;justify-content:center" class="on-grad">{mk(h="2.3cqw")}</div>
           <div style="width:5cqw;height:5cqw;border-radius:1.1cqw;background:var(--ink);display:flex;align-items:center;justify-content:center" class="on-ink">{mk(h="2.3cqw")}</div>
           <div style="width:5cqw;height:5cqw;border-radius:1.1cqw;background:var(--paper);border:0.07cqw solid var(--rule);display:flex;align-items:center;justify-content:center" class="on-white">{mk(h="2.3cqw")}</div>
           <div style="width:2.7cqw;height:2.7cqw;border-radius:0.6cqw;background:var(--paper);border:0.07cqw solid var(--rule);display:flex;align-items:center;justify-content:center;align-self:flex-end" class="mono">{mk(h="1.15cqw")}</div>
         </div>
         <div class="t-cap">App icons · mark alone, never the wordmark</div>
       </div>
     </div>''')

def ui(dark):
    fg = "#E6EAF6" if dark else INK
    q = "#8B92AC" if dark else "#666E8C"
    acc = "#7FA0FF" if dark else COBALT
    return f'''<div class="ui {'d' if dark else ''}">
      <div class="ui-b"><span class="{'mono-w' if dark else 'mono'}">{mk(h="1.1cqw")}</span>
        <span style="color:{q};margin-left:0.5cqw">Engagements</span>
        <span style="color:{q}">Teams</span>
        <span style="margin-left:auto;width:0.5cqw;height:0.5cqw;border-radius:50%;background:{acc}"></span></div>
      <div class="ui-r"><div style="color:{fg};font-size:0.85cqw">Payments platform · phase two</div>
        <div style="color:{q};font-size:0.68cqw">Four engineers · month 30</div></div>
      <div class="ui-r" style="color:{q}">Lead time · 6.2 days</div>
      <div class="ui-r" style="color:{q}">Release cadence · every 4 days</div>
      <div class="ui-r" style="color:{acc}">Uptime · 99.98%</div>
    </div>'''

page("Surfaces", "Product surfaces",
     "The same system on two grounds. Nothing about the logo or the type changes "
     "between them — what changes is which value each token holds.",
     f'''<div class="grid2">
       <div class="cell">{ui(False)}<div class="t-cap">Light</div></div>
       <div class="cell">{ui(True)}<div class="t-cap">Dark</div></div>
     </div>
     <p class="note">The brand is committed to light ground. A dark product theme is a
       product decision, not a brand one — the tokens above are the whole of it.</p>''')

# ═══ BACK COVER ═══
PAGES.append(f'''<div class="page cover on-ink">
  <div class="cv-t"><span class="cv-l">Infinite</span><span class="cv-l">Brand Guidelines v1.0</span></div>
  <div style="text-align:center">{mk(h="10cqw")}</div>
  <div class="cv-t"><span class="cv-l">Design. Develop. Refine.</span><span class="cv-l">infinite.dev</span></div>
</div>''')
print(f"total pages: {len(PAGES)}")

# ── assemble ────────────────────────────────────────────────────────────────
FONTS = open(SCRATCH + "fonts.css").read() if os.path.exists(SCRATCH + "fonts.css") else ""
if not FONTS:
    raise SystemExit("fonts.css missing — run the font fetch step first")

DEFS = f'''<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="gBand" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
      <stop offset="0" stop-color="{SKY}"/><stop offset="0.34" stop-color="{COBALT}"/>
      <stop offset="0.67" stop-color="{IRIS}"/><stop offset="1" stop-color="{ORCHID}"/>
    </linearGradient>
    <linearGradient id="gBandBack" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
      <stop offset="0" stop-color="#BCEAFA"/><stop offset="0.12" stop-color="#A7D3F9"/>
      <stop offset="0.25" stop-color="#8EB3F9"/><stop offset="0.38" stop-color="#7B93F9"/>
      <stop offset="0.5" stop-color="#7E81F8"/><stop offset="1" stop-color="#7E81F8"/>
    </linearGradient>
    <linearGradient id="gBandWhiteBack" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.30"/>
      <stop offset="0.25" stop-color="#FFFFFF" stop-opacity="0.44"/>
      <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.60"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0.60"/>
    </linearGradient>
    <linearGradient id="gBandInkBack" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
      <stop offset="0" stop-color="{INK}" stop-opacity="0.20"/>
      <stop offset="0.25" stop-color="{INK}" stop-opacity="0.31"/>
      <stop offset="0.5" stop-color="{INK}" stop-opacity="0.44"/>
      <stop offset="1" stop-color="{INK}" stop-opacity="0.44"/>
    </linearGradient>
  </defs>
  <symbol id="mk" viewBox="0 0 210 130">
    <path d="{RB_BACK}" fill="var(--rb-back)"/>
    <path d="{RB_FRONT}" fill="var(--rb-front)"/>
  </symbol>
</svg>'''

HTML = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Infinite Brand Guidelines</title>
<style>{FONTS}</style>
<style>{CSS}</style>
</head>
<body>
{DEFS}
<div class="book">
{chr(10).join(PAGES)}
</div>
</body>
</html>
'''

out = os.path.join(HERE, "infinite-brand-book.html")
open(out, "w", encoding="utf-8").write(HTML)
print(f"wrote {out}  ·  {len(PAGES)} pages  ·  {len(HTML)/1024:.0f} KB")
