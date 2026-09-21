#!/usr/bin/env python3
"""
Build echo-brand-book.html — Echo's brand manual.

The logomark is NOT redrawn here. Both paths are lifted verbatim from the
Figma source (node 25:4177) and used dot for dot everywhere in this book.
Routes B and C are exploration only and never stand in for the real mark.

Echo is a voice product: hold a key, speak, and it writes. The identity is
near-monochrome because the product is — the azure is a brand moment, not a
UI colour. That rule is the spine of this book.

    python3 echo-book-build.py
"""
import os, json

HERE = os.path.dirname(os.path.abspath(__file__))
S = "/private/tmp/claude-501/-Users-amanhsn-infinity/53bdbfc8-034a-49aa-8eed-c90f9c96d587/scratchpad/echo/"
G = json.load(open(S + "geo.json"))
FONTS = open(S + "fonts.css").read()

# ── palette — sampled from the Figma source, not from a screenshot ─────────
AZURE      = G["AZURE"]          # #0088FF — the app icon ground
INK        = "#101012"
PAPER      = "#FFFFFF"
SHELL      = "#F7F7F8"
RULE       = "#E8E8EA"
QUIET      = "#6B6B70"
FAINT      = "#9A9AA0"
LILAC      = "#7C5CFC"           # Pro
LILAC_BG   = "#EFEAFE"
LIVE       = "#E5484D"           # recording
CHROME     = "#3D3D3D"           # the app's own window surround — the book's backdrop
ICON_R     = G["ICON_RX"]        # 27.1% squircle

def rgb(h):
    h=h.lstrip("#"); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def cmyk(h):
    r,g,b=[v/255 for v in rgb(h)]; k=1-max(r,g,b)
    if k>=0.999: return (0,0,0,100)
    return tuple(round(v*100) for v in ((1-r-k)/(1-k),(1-g-k)/(1-k),(1-b-k)/(1-k),k))
def lum(h):
    def c(v):
        v/=255; return v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    r,g,b=rgb(h); return .2126*c(r)+.7152*c(g)+.0722*c(b)
def contrast(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb); return round((hi+.05)/(lo+.05),1)
def mix(h,t,target=(255,255,255)):
    return "#%02X%02X%02X"%tuple(round(v+(tv-v)*t) for v,tv in zip(rgb(h),target))

# ── the mark — verbatim Figma paths ────────────────────────────────────────
MARK_PATHS = f'<path d="{G["EXACT_BIG"]}"/><path d="{G["EXACT_SMALL"]}"/>'

def mk(h="2cqw", fill="currentColor", style="", shadow=False):
    f = ' filter="url(#emboss)"' if shadow else ''
    return (f'<svg viewBox="{G["EXACT_VB"]}" style="height:{h};width:auto;display:block;{style}" '
            f'fill="{fill}" role="img" aria-label="Echo"><g{f}>{MARK_PATHS}</g></svg>')

def alt(route, h="2cqw", fill="currentColor", style=""):
    vb, inner = (G["B_VB"], G["B_BARS"]) if route=="B" else (G["C_VB"], G["C_ROWS"])
    return (f'<svg viewBox="{vb}" style="height:{h};width:auto;display:block;{style}" '
            f'fill="{fill}" aria-hidden="true">{inner}</svg>')

def lockup(h="2.6cqw", size="3.3cqw", fill="currentColor", gap="0.75cqw"):
    # the wordmark takes the same colour as the mark, or it inherits the page's
    # ink and disappears on a dark tile
    return (f'<div style="display:flex;align-items:center;gap:{gap};color:{fill}">{mk(h,fill)}'
            f'<span style="font-weight:600;font-size:{size};letter-spacing:-0.035em;'
            f'line-height:1">Echo</span></div>')

def icon(size="6cqw", bg=AZURE, fill="#FFFFFF", mh="3.1cqw", shadow=True):
    return (f'<div style="width:{size};height:{size};border-radius:{ICON_R*100:.1f}%;'
            f'background:{bg};display:flex;align-items:center;justify-content:center;'
            f'flex:none">{mk(mh, fill, shadow=shadow)}</div>')

PAGES=[]
def divider(title, n, bg=AZURE, fg="#FFFFFF"):
    PAGES.append(f'<div class="page div" style="background:{bg};color:{fg}">'
                 f'<span class="dv-n">{n}</span><h1 class="dv-t">{title}</h1></div>')

def page(sec, title, lede="", body="", cls=""):
    PAGES.append(f'''<div class="page {cls}">
  <div class="p-hd"><span class="p-sec">{sec}</span><span class="p-gl">{mk("1.25cqw")}</span></div>
  <div class="p-bd">
    <div class="p-lead"><h2>{title}</h2>{f"<p>{lede}</p>" if lede else ""}</div>
    <div class="p-zone">{body}</div>
  </div></div>''')

def tile(inner, bg=PAPER, cap="", style="", border=True):
    b=f"border:0.07cqw solid {RULE};" if border else ""
    c=f'<div class="t-cap">{cap}</div>' if cap else ""
    return f'<div class="tile" style="background:{bg};{b}{style}">{inner}</div>{c}'

print("echo core ready · azure", AZURE)

# ── stylesheet ─────────────────────────────────────────────────────────────
CSS = f"""
:root{{
  --paper:{PAPER}; --shell:{SHELL}; --ink:{INK}; --rule:{RULE};
  --quiet:{QUIET}; --faint:{FAINT}; --azure:{AZURE};
  --lilac:{LILAC}; --lilac-bg:{LILAC_BG}; --live:{LIVE}; --chrome:{CHROME};
  --ff:"General Sans","Helvetica Neue",Arial,sans-serif;
  --fm:"JetBrains Mono",ui-monospace,Menlo,monospace;
}}
*{{ box-sizing:border-box; }}
html{{ -webkit-text-size-adjust:100%; }}
body{{
  margin:0; background:var(--chrome); color:var(--ink);
  font-family:var(--ff); -webkit-font-smoothing:antialiased;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}}
.book{{ max-width:1320px; margin-inline:auto; padding:16px;
  display:flex; flex-direction:column; gap:16px; }}
.page{{
  container-type:inline-size; aspect-ratio:16/9; width:100%;
  background:var(--shell); position:relative; overflow:hidden;
  display:flex; flex-direction:column;
}}
/* divider */
.page.div{{ justify-content:flex-end; padding:5.2cqw; }}
.dv-n{{ position:absolute; top:5.2cqw; left:5.2cqw; font-weight:600; font-size:0.92cqw;
  letter-spacing:0.2em; text-transform:uppercase; opacity:0.66; }}
.dv-t{{ margin:0; font-weight:600; font-size:9.6cqw; letter-spacing:-0.045em; line-height:0.86; }}
/* content page */
.p-hd{{ display:flex; justify-content:space-between; align-items:center; padding:4.3cqw 5.2cqw 0; }}
.p-sec{{ font-weight:500; font-size:1cqw; color:var(--quiet); }}
.p-gl{{ opacity:0.22; }}
.p-bd{{ flex:1; display:flex; gap:3.4cqw; padding:3cqw 5.2cqw 5.2cqw; min-height:0; }}
.p-lead{{ width:20.5cqw; flex:none; }}
.p-lead h2{{ margin:0 0 0.95cqw; font-weight:600; font-size:2.25cqw;
  letter-spacing:-0.035em; line-height:1.1; }}
.p-lead p{{ margin:0; font-size:0.9cqw; line-height:1.62; color:var(--quiet); }}
.p-zone{{ flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center; }}
.page.wide .p-bd{{ flex-direction:column; gap:2.2cqw; }}
.page.wide .p-lead{{ width:46cqw; }}
.page.wide .p-lead p{{ max-width:44cqw; }}
/* tiles */
.grid2{{ display:grid; grid-template-columns:1fr 1fr; gap:1.4cqw; }}
.grid3{{ display:grid; grid-template-columns:repeat(3,1fr); gap:1.4cqw; }}
.grid4{{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.1cqw; }}
.tile{{ border-radius:1cqw; display:flex; align-items:center; justify-content:center;
  aspect-ratio:16/9; padding:1.8cqw; overflow:hidden; }}
.t-cap{{ font-size:0.76cqw; color:var(--quiet); margin-top:0.62cqw; line-height:1.5; }}
.cell{{ display:flex; flex-direction:column; }}
/* swatches */
.sw{{ background:var(--paper); border-radius:1cqw; overflow:hidden; display:flex; flex-direction:column;
  border:0.07cqw solid var(--rule); }}
.sw-chip{{ height:8.6cqw; display:flex; align-items:flex-end; padding:0.9cqw; gap:0.4cqw; }}
.sw-b{{ padding:1.1cqw 1.2cqw 1.3cqw; }}
.sw-n{{ font-weight:600; font-size:1.1cqw; letter-spacing:-0.02em; }}
.sw-h{{ font-family:var(--fm); font-size:0.78cqw; color:var(--quiet); margin:0.22cqw 0 0.8cqw; }}
.sw-g{{ display:grid; grid-template-columns:1fr 1fr; gap:0 0.8cqw; font-family:var(--fm);
  font-size:0.68cqw; color:var(--faint); line-height:1.6; }}
.sw-r{{ display:flex; height:2cqw; }} .sw-r i{{ flex:1; }}
.pill{{ display:inline-flex; align-items:center; padding:0.22cqw 0.55cqw; border-radius:1cqw;
  font-family:var(--fm); font-size:0.62cqw; }}
/* spec */
.spec{{ display:flex; flex-direction:column; }}
.spec div{{ display:flex; justify-content:space-between; gap:1.4cqw; padding:0.58cqw 0;
  border-bottom:0.07cqw solid var(--rule); font-size:0.82cqw; }}
.spec div:last-child{{ border-bottom:0; }}
.spec .k{{ color:var(--quiet); }}
.spec .v{{ font-family:var(--fm); font-size:0.75cqw; }}
.note{{ font-size:0.8cqw; color:var(--quiet); line-height:1.6; margin:1.1cqw 0 0; }}
.xm{{ color:var(--live); font-weight:600; }} .ok{{ color:#1A8F5F; font-weight:600; }}
.cover{{ padding:5.2cqw; justify-content:space-between; }}
.cv-t{{ display:flex; justify-content:space-between; align-items:flex-start; }}
.cv-l{{ font-weight:600; font-size:0.9cqw; letter-spacing:0.2em; text-transform:uppercase; opacity:0.72; }}
/* the keycap — the product's signature interaction */
.key{{ display:inline-flex; align-items:center; justify-content:center; min-width:2.4cqw;
  padding:0.35cqw 0.6cqw; border:0.14cqw solid var(--ink); border-radius:0.42cqw;
  border-bottom-width:0.34cqw; font-weight:600; font-size:0.78cqw; line-height:1; }}
/* app chrome mock */
.app{{ background:var(--paper); border-radius:0.8cqw; overflow:hidden;
  border:0.07cqw solid var(--rule); display:flex; font-size:0.7cqw; }}
.app-sb{{ width:26%; background:var(--shell); padding:0.9cqw; border-right:0.07cqw solid var(--rule); }}
.app-nav{{ display:flex; align-items:center; gap:0.45cqw; padding:0.42cqw 0.55cqw;
  border-radius:0.4cqw; color:var(--quiet); }}
.app-nav.on{{ background:#ECECEE; color:var(--ink); font-weight:500; }}
.app-main{{ flex:1; padding:1.1cqw; }}
.dot{{ width:0.42cqw; height:0.42cqw; border-radius:50%; flex:none; }}
@media print{{
  @page{{ size:297mm 167mm; margin:0; }}
  body{{ background:#FFF; }}
  .book{{ max-width:none; padding:0; gap:0; }}
  .page{{ width:297mm; height:167mm; aspect-ratio:auto; break-after:page; page-break-after:always; }}
  .page:last-child{{ break-after:auto; }}
}}
@media (max-width:760px){{ .book{{ padding:8px; gap:8px; }} }}
"""
print("echo css ready")

def ramp(h,n=10):
    t = rgb(INK) if lum(h)>0.85 else (255,255,255)
    return "".join(f'<i style="background:{mix(h,1-(i+1)/n,t)}"></i>' for i in range(n))

def swatch(name,hexv,role):
    r,g,b=rgb(hexv); c,m,y,k=cmyk(hexv)
    cw,ci=contrast(hexv,"#FFFFFF"),contrast(hexv,INK)
    edge="box-shadow:inset 0 0 0 0.07cqw var(--rule);" if hexv.upper()=="#FFFFFF" else ""
    return f'''<div class="sw">
      <div class="sw-chip" style="background:{hexv};{edge}">
        <span class="pill" style="background:rgba(255,255,255,.92);color:{INK}">{cw} on white</span>
        <span class="pill" style="background:rgba(16,16,18,.85);color:#FFF">{ci} on ink</span></div>
      <div class="sw-b"><div class="sw-n">{name}</div><div class="sw-h">{hexv}</div>
        <div class="sw-g"><span>R {r}</span><span>C {c}</span><span>G {g}</span><span>M {m}</span>
          <span>B {b}</span><span>Y {y}</span><span>&nbsp;</span><span>K {k}</span></div></div>
      <div class="sw-r">{ramp(hexv)}</div>
      <div class="sw-b" style="padding-top:0.8cqw"><div class="t-cap" style="margin:0">{role}</div></div>
    </div>'''

NAV=[("Dictation",1),("Meetings",0),("Snippets",0),("Glossary",0),("Insights",0)]
def appmock():
    navs="".join(f'<div class="app-nav {"on" if on else ""}"><span class="dot" '
                 f'style="background:{"var(--ink)" if on else "var(--faint)"}"></span>{n}</div>'
                 for n,on in NAV)
    return f'''<div class="app">
      <div class="app-sb">
        <div style="display:flex;align-items:center;gap:0.45cqw;margin-bottom:0.9cqw">
          {mk("0.95cqw",INK)}<span style="font-weight:600;font-size:0.95cqw;letter-spacing:-0.03em">Echo</span></div>
        {navs}
        <div style="margin-top:1.4cqw;display:flex;align-items:center;gap:0.4cqw">
          <span style="font-size:0.66cqw;color:var(--quiet)">Tayyab Abbas</span>
          <span class="pill" style="background:var(--lilac-bg);color:var(--lilac)">Pro</span></div>
      </div>
      <div class="app-main">
        <div style="font-weight:600;font-size:0.95cqw;margin-bottom:0.8cqw">Welcome back, Rafay</div>
        <div style="background:var(--shell);border-radius:0.55cqw;padding:0.9cqw;margin-bottom:1.1cqw">
          <div style="font-weight:600;font-size:0.82cqw;line-height:1.35">Make Echo sound like you,<br>write prompts, messages and more</div>
        </div>
        <div style="text-align:center;color:var(--quiet);padding:0.9cqw 0">
          <div style="font-weight:600;color:var(--ink);font-size:0.8cqw">No dictations yet</div>
          <div style="margin-top:0.7cqw;display:flex;align-items:center;justify-content:center;gap:0.4cqw">
            <span style="font-weight:500;color:var(--ink);font-size:0.72cqw">Hold</span>
            <span class="key">FN</span>
            <span style="font-weight:500;color:var(--ink);font-size:0.72cqw">to start</span></div>
        </div>
      </div></div>'''

# ═══ COVER ═══
PAGES.append(f'''<div class="page cover" style="background:{AZURE};color:#FFF">
  <div class="cv-t"><span class="cv-l">Brand Guidelines</span><span class="cv-l">v1.0 · September 2026</span></div>
  <div style="display:flex;align-items:center;gap:1.2cqw">{mk("9cqw","#FFFFFF")}
    <span style="font-weight:600;font-size:10cqw;letter-spacing:-0.045em;line-height:0.86">Echo</span></div>
  <div class="cv-t"><span class="cv-l">Hold FN to start</span><span class="cv-l">A product by ImagineArt</span></div>
</div>''')

TOC=[("01","Mark","The logomark, exactly as drawn — construction, clear space, lockups"),
     ("02","Colour","Monochrome first, and the one blue that isn't"),
     ("03","Typography","General Sans, and the figures that prove the product works"),
     ("04","Product","Five surfaces, the FN key, and how empty states speak")     ]
rows="".join(f'''<div style="display:flex;gap:2.2cqw;padding:1.4cqw 0;border-bottom:0.07cqw solid var(--rule)">
  <span style="font-family:var(--fm);font-size:0.85cqw;color:var(--faint);width:2.8cqw">{n}</span>
  <span style="font-weight:600;font-size:1.45cqw;letter-spacing:-0.03em;width:13cqw">{t}</span>
  <span style="font-size:0.88cqw;color:var(--quiet);flex:1;align-self:center">{d}</span></div>''' for n,t,d in TOC)
page("Echo","Contents",
     "Echo is ImagineArt's voice product. You hold a key, you speak, and it writes — in any "
     "app, and in meetings you did not have to set up. The full name is <b>Imagine Echo</b>; "
     "in product and on screen it is always <b>Echo</b>.",
     f'<div style="display:flex;flex-direction:column">{rows}</div>')

# ═══ 01 MARK ═══
divider("Mark","01")

page("Mark","The mark",
     "Two halves of one form: the sound, and its quieter return. The small half is the "
     "echo — same shape, same centre, less of it.",
     f'''<div class="grid3">
       <div class="cell">{tile(mk("6cqw",INK),PAPER,cap="Ink on paper — the default")}</div>
       <div class="cell">{tile(mk("6cqw","#FFFFFF"),INK,cap="Reversed on ink",border=False)}</div>
       <div class="cell">{tile(mk("6cqw","#FFFFFF",shadow=True),AZURE,cap="White on azure — app icon only",border=False)}</div>
     </div>
     <p class="note"><b>The artwork is never redrawn.</b> Both paths come from the master file and
       are placed unmodified. Nothing in this book reconstructs them.</p>''')

page("Mark","Construction",
     "The mark is supplied artwork, not a formula. These are the facts you need to place "
     "it correctly — not instructions for rebuilding it.",
     f'''<div style="display:flex;gap:2.6cqw;align-items:center">
       <div style="flex:1">{tile(mk("9cqw",INK),PAPER)}</div>
       <div style="width:21cqw"><div class="spec">
         <div><span class="k">Artwork box</span><span class="v">46 × 56</span></div>
         <div><span class="k">Proportion</span><span class="v">0.821 : 1</span></div>
         <div><span class="k">Paths</span><span class="v">2, both solid</span></div>
         <div><span class="k">App icon corner</span><span class="v">27.1% of width</span></div>
         <div><span class="k">Icon emboss</span><span class="v">inner, dy 4, blur 2, 25%</span></div>
         <div><span class="k">Source node</span><span class="v">25:4177</span></div>
       </div>
       <p class="note">The emboss belongs to the <b>app icon only</b>. Everywhere else the mark
         is flat — no shadow, no bevel.</p></div>
     </div>''')

page("Mark","Clear space & sizes",
     "Clear space is the width of the small half, measured on all four sides. The mark is "
     "solid and holds far down — it is the wordmark that fails first.",
     f'''<div style="display:flex;gap:2.4cqw;align-items:flex-end;justify-content:center;padding:1.4cqw 0">
       <div style="text-align:center">{mk("6cqw",INK)}<div class="t-cap">Brand</div></div>
       <div style="text-align:center">{mk("3cqw",INK)}<div class="t-cap">Sidebar · 28px</div></div>
       <div style="text-align:center">{mk("1.7cqw",INK)}<div class="t-cap">Menu bar · 18px</div></div>
       <div style="text-align:center">{mk("1.1cqw",INK)}<div class="t-cap">Favicon · 16px</div></div>
     </div>
     <div class="spec" style="margin-top:0.8cqw">
       <div><span class="k">Clear space</span><span class="v">= width of the small half</span></div>
       <div><span class="k">Minimum mark</span><span class="v">16 px tall</span></div>
       <div><span class="k">Minimum lockup</span><span class="v">72 px wide</span></div>
     </div>''')

page("Mark","Lockups",
     "The mark sits left of the word, centred on its cap height. In product the lockup is "
     "always ink; azure is reserved for the icon.",
     f'''<div class="grid2">
       <div class="cell">{tile(lockup("2.6cqw","3.2cqw",INK),PAPER,cap="Primary · horizontal")}</div>
       <div class="cell">{tile(lockup("2.6cqw","3.2cqw","#FFFFFF"),INK,cap="Reversed",border=False)}</div>
       <div class="cell">{tile(mk("3.4cqw",INK),PAPER,cap="Mark alone · sidebar, menu bar, favicon")}</div>
       <div class="cell">{tile(icon("6.4cqw"),SHELL,cap="App icon · the only azure lockup")}</div>
     </div>
     <div class="spec" style="margin-top:1.2cqw">
       <div><span class="k">Full name</span><span class="v">Imagine Echo</span></div>
       <div><span class="k">In product, on screen, in the lockup</span><span class="v">Echo</span></div>
       <div><span class="k">Parent</span><span class="v">ImagineArt</span></div>
     </div>''')

page("Mark","Don'ts","",
     f'''<div class="grid3">
       <div class="cell">{tile(mk("4.4cqw",INK,style="transform:rotate(-15deg)"),PAPER,cap="<span class='xm'>✕</span> Never rotate")}</div>
       <div class="cell">{tile(mk("4.4cqw",INK,style="transform:scaleX(1.5)"),PAPER,cap="<span class='xm'>✕</span> Never stretch")}</div>
       <div class="cell">{tile(mk("4.4cqw",LIVE),PAPER,cap="<span class='xm'>✕</span> Never recolour")}</div>
       <div class="cell">{tile(mk("4.4cqw",AZURE),PAPER,cap="<span class='xm'>✕</span> Never azure on light")}</div>
       <div class="cell">{tile(mk("4.4cqw",INK,shadow=True),PAPER,cap="<span class='xm'>✕</span> No emboss outside the icon")}</div>
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:0.1cqw">{mk("2.6cqw",INK)}<span style="font-weight:600;font-size:3cqw;letter-spacing:-0.035em">Echo</span></div>',PAPER,cap="<span class='xm'>✕</span> Never crowd the word")}</div>
     </div>''', cls="wide")

page("Mark","Routes considered",
     "Two alternates were drawn and set aside. They are recorded here so the decision is "
     "not re-litigated — <b>neither is approved artwork</b>.",
     f'''<div class="grid3">
       <div class="cell">{tile(mk("4.6cqw",INK),PAPER,cap="<span class='ok'>✓</span> Return — approved, in use")}</div>
       <div class="cell">{tile(alt("B","4.6cqw",FAINT),PAPER,cap="Decay — a waveform falling away. Legible small, but generic in a category full of waveforms.")}</div>
       <div class="cell">{tile(alt("C","4.6cqw",FAINT),PAPER,cap="Transcript — speech becoming text. Best idea, worst asset: unreadable below 40px.")}</div>
     </div>''', cls="wide")
print("pages:", len(PAGES))

# ═══ 02 COLOUR ═══
divider("Colour","02")

page("Colour","Monochrome first",
     "Open the app and there is no colour in it. That is the decision, not an omission — "
     "a tool you dictate into all day should not compete with what you are writing.",
     f'''<div class="grid4">
       {swatch("Ink",INK,"All type, all icons, the mark in product.")}
       {swatch("Paper",PAPER,"The working surface. Most of the product is this.")}
       {swatch("Shell",SHELL,"Sidebar, cards, empty states. The only other grey.")}
       {swatch("Rule",RULE,"Hairlines and dividers. Never text.")}
     </div>''', cls="wide")

page("Colour","The one blue that isn't",
     "Azure appears in exactly one place: the app icon. It is how Echo is recognised in a "
     "dock of fifty icons, and it earns that job by never showing up anywhere else.",
     f'''<div style="display:flex;gap:2.4cqw;align-items:center">
       <div style="width:22cqw">{swatch("Azure",AZURE,"App icon ground. Not a UI colour, not a button, not a link.")}</div>
       <div style="flex:1">
         <div style="display:flex;gap:1.2cqw;align-items:center;margin-bottom:1.4cqw">
           {icon("5.4cqw")}{icon("5.4cqw",INK)}{icon("5.4cqw",PAPER,INK,shadow=False)}
         </div>
         <div class="spec">
           <div><span class="k">Azure on white</span><span class="v">{contrast(AZURE,"#FFFFFF")} : 1 — fails body text</span></div>
           <div><span class="k">Azure on ink</span><span class="v">{contrast(AZURE,INK)} : 1</span></div>
           <div><span class="k">Permitted use</span><span class="v">icon ground only</span></div>
         </div>
         <p class="note">Azure is <b>{contrast(AZURE,"#FFFFFF")}:1 on white</b> — below the 4.5:1 floor for body
           text. If someone proposes it for links or buttons, this is the number to quote.</p>
       </div>
     </div>''')

page("Colour","States",
     "Two colours exist for states the user must not misread: recording, and Pro. Neither "
     "is decorative and neither may be borrowed for anything else.",
     f'''<div class="grid2">
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:0.7cqw"><span class="dot" style="background:{LIVE};width:0.8cqw;height:0.8cqw"></span><span style="font-weight:500;font-size:1cqw">Recording · 00:14</span></div>',PAPER,cap=f"Live {LIVE} — only while the microphone is open")}</div>
       <div class="cell">{tile(f'<span class="pill" style="background:{LILAC_BG};color:{LILAC};font-size:0.9cqw;padding:0.4cqw 0.9cqw">Pro</span>',PAPER,cap=f"Pro {LILAC} on {LILAC_BG} — entitlement only, never emphasis")}</div>
     </div>
     <div class="spec" style="margin-top:1.2cqw">
       <div><span class="k">Live on paper</span><span class="v">{contrast(LIVE,PAPER)} : 1</span></div>
       <div><span class="k">Pro on its tint</span><span class="v">{contrast(LILAC,LILAC_BG)} : 1</span></div>
       <div><span class="k">Success / warning</span><span class="v">not defined — use type, not colour</span></div>
     </div>''')

# ═══ 03 TYPOGRAPHY ═══
divider("Typography","03")

ABC=("Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm<br>"
     "Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br>0 1 2 3 4 5 6 7 8 9 &amp; ? ! @")
page("Typography","General Sans",
     "One family across the product and the brand. It is the face the app is already set "
     "in, so the marketing site and the product do not disagree.",
     f'''<div class="grid2">
       <div class="tile" style="aspect-ratio:auto;flex-direction:column;align-items:flex-start;
         justify-content:flex-start;padding:1.8cqw;gap:0.7cqw;background:{PAPER};border:0.07cqw solid {RULE}">
         <div style="font-weight:600;font-size:3.2cqw;letter-spacing:-0.04em;line-height:1">General Sans</div>
         <div class="t-cap" style="margin:0">Everything · 400 / 500 / 600 / 700</div>
         <div style="font-size:1cqw;line-height:1.75;margin-top:0.5cqw">{ABC}</div>
       </div>
       <div class="tile" style="aspect-ratio:auto;flex-direction:column;align-items:flex-start;
         justify-content:flex-start;padding:1.8cqw;gap:0.7cqw;background:{PAPER};border:0.07cqw solid {RULE}">
         <div style="font-family:var(--fm);font-weight:500;font-size:2.4cqw;letter-spacing:-0.03em;line-height:1">JetBrains Mono</div>
         <div class="t-cap" style="margin:0">Figures only · never headings, never eyebrows</div>
         <div style="font-family:var(--fm);font-size:0.9cqw;line-height:1.85;margin-top:0.5cqw">{ABC}</div>
       </div>
     </div>''', cls="wide")

HR=[("Display","General Sans 600 · −4%","2.8cqw","600","-0.04em","Speak. It writes."),
    ("Heading","General Sans 600 · −3%","1.6cqw","600","-0.03em","Make Echo sound like you"),
    ("Body","General Sans 400 · 1.62","0.92cqw","400","-0.004em","Speak naturally to write prompts, emails, documents and creative content instantly."),
    ("Eyebrow","General Sans 600 · +20% · upper","0.76cqw","600","0.2em","DICTATION"),
    ("Figures","JetBrains Mono 500 · tabular","1cqw","500","0","50.2k words · 122 wpm · 3 day streak")]
trows="".join(f'''<div style="display:flex;gap:2.2cqw;padding:1.1cqw 0;border-bottom:0.07cqw solid var(--rule);align-items:baseline">
  <div style="width:12.5cqw;flex:none"><div style="font-weight:600;font-size:0.82cqw">{n}</div>
    <div style="font-size:0.72cqw;color:var(--faint);line-height:1.5">{d}</div></div>
  <div style="flex:1;min-width:0;font-size:{sz};font-weight:{w};letter-spacing:{ls};line-height:1.25;
    {'font-family:var(--fm);' if n=='Figures' else ''}{'color:var(--quiet);' if n=='Eyebrow' else ''}">{s}</div></div>'''
  for n,d,sz,w,ls,s in HR)
page("Typography","Hierarchy",
     "Echo counts things — words, speed, streaks. Those numbers are the proof the product "
     "works, so they get the mono and they get tabular figures.",
     f'<div style="display:flex;flex-direction:column">{trows}</div>'
     '<p class="note">Eyebrows are <b>General Sans</b>, never the mono. A monospaced label reads as '
     'a code sample, and Echo is not a developer tool.</p>', cls="wide")

# ═══ 04 PRODUCT ═══
divider("Product","04")

page("Product","Five surfaces",
     "Dictation is the front door. The other four exist so that what you said stays "
     "useful after you have said it.",
     f'''<div style="display:flex;gap:2.4cqw;align-items:center">
       <div style="flex:1.25">{appmock()}</div>
       <div style="width:19cqw"><div class="spec">
         <div><span class="k">Dictation</span><span class="v">hold FN, anywhere</span></div>
         <div><span class="k">Meetings</span><span class="v">detected, not scheduled</span></div>
         <div><span class="k">Snippets</span><span class="v">reusable phrasing</span></div>
         <div><span class="k">Glossary</span><span class="v">names it must not misspell</span></div>
         <div><span class="k">Insights</span><span class="v">words, wpm, streak</span></div>
       </div></div>
     </div>''')

page("Product","The FN key",
     "The whole product is one gesture. Wherever Echo is explained — onboarding, website, "
     "a tooltip — it is shown as a key you hold, drawn as a keycap, never described in prose.",
     f'''<div class="grid2">
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:0.6cqw;font-weight:500;font-size:1.1cqw"><span>Hold</span><span class="key" style="font-size:1cqw;min-width:3.2cqw">FN</span><span>to start</span></div>',PAPER,cap="The canonical instruction. Four words and a key.")}</div>
       <div class="cell">{tile(f'<div style="display:flex;align-items:center;gap:0.7cqw"><span class="dot" style="background:{LIVE};width:0.75cqw;height:0.75cqw"></span><span style="font-family:var(--fm);font-size:1cqw">00:14</span><span style="color:{QUIET};font-size:0.9cqw">listening</span></div>',PAPER,cap="Recording state. Timer in mono, live dot, lowercase verb.")}</div>
     </div>
     <p class="note">Never write "press and hold the function key". <b>Show the key.</b></p>''')

VOICE=[("No dictations yet","You have not dictated anything yet."),
       ("Once you dictate across different apps, your entire dictation history will appear here.",
        "Your dictation history will be populated once you have utilised the product across applications."),
       ("Hold FN to start","Click here to begin your first dictation session."),
       ("Make Echo sound like you","Leverage AI-powered voice technology for enhanced productivity.")]
vrows="".join(f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:2.2cqw;padding:1.05cqw 0;
  border-bottom:0.07cqw solid var(--rule)">
  <div style="font-size:0.92cqw">{y}</div>
  <div style="font-size:0.92cqw;color:var(--faint)"><s style="text-decoration-color:{LIVE}">{n}</s></div></div>'''
  for y,n in VOICE)
page("Product","How it speaks",
     "Short, plain, and about the person — not the technology. Echo never says AI, never "
     "says leverage, and never congratulates itself.",
     f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:2.2cqw;padding-bottom:0.5cqw">
       <div style="font-weight:600;font-size:0.74cqw;letter-spacing:0.2em;text-transform:uppercase;color:var(--quiet)">Say</div>
       <div style="font-weight:600;font-size:0.74cqw;letter-spacing:0.2em;text-transform:uppercase;color:var(--quiet)">Not</div>
     </div>{vrows}''', cls="wide")
print("pages:", len(PAGES))

PAGES.append(f'''<div class="page cover" style="background:{INK};color:#FFF">
  <div class="cv-t"><span class="cv-l">Echo</span><span class="cv-l">Brand Guidelines v1.0</span></div>
  <div style="display:flex;justify-content:center">{mk("8cqw","#FFFFFF")}</div>
  <div class="cv-t"><span class="cv-l">Speak. It writes.</span><span class="cv-l">Hold FN to start</span></div>
</div>''')

# ── assemble ───────────────────────────────────────────────────────────────
DEFS = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <filter id="emboss" x="-10%" y="-10%" width="120%" height="130%" filterUnits="objectBoundingBox"
            color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="bg"/>
      <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="shape"/>
    </filter>
  </defs>
</svg>'''

HTML = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Echo Brand Guidelines</title>
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
out = os.path.join(HERE, "echo-brand-book.html")
open(out,"w",encoding="utf-8").write(HTML)
print(f"wrote {out} · {len(PAGES)} pages · {len(HTML)/1024:.0f} KB")
