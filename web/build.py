#!/usr/bin/env python3
"""
Infinite — static site generator.

One shell, one nav, one footer, one mark. Every page is data plus a body;
nothing about the chrome is duplicated across files.

    python3 build.py        # writes index.html and the whole /services/ tree
"""
import os, json, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
MK = json.load(open("/private/tmp/claude-501/-Users-amanhsn-infinity/"
                    "53bdbfc8-034a-49aa-8eed-c90f9c96d587/scratchpad/mk.json"))

ARROW = ('<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" '
         'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>')

NAV = [("Services","/services/"),("Industries","/industries/"),("Work","/work/"),
       ("How we work","/how-we-work/"),("Insights","/insights/"),("Company","/company/")]

# ── services taxonomy — one source for nav, index, categories and leaves ──
SERVICES = [
 ("product-engineering","Product Engineering",
  "Software your customers touch. We scope with the engineers who will build it, ship in two-week "
  "increments, and stay on the account after launch.",
  [("product-strategy-discovery","Product strategy &amp; discovery","Two to four weeks to a scope the build team will stand behind."),
   ("ux-ui-design","UX/UI design","Interface work done against the real data model, not a happy-path mockup."),
   ("web-application-development","Web application development","Long-lived web platforms, built to be handed over."),
   ("mobile-application-development","Mobile application development","iOS and Android, native or cross-platform, with a release train."),
   ("mvp-and-0-1","MVP &amp; 0→1 build","The smallest thing that proves the business case, built to survive if it works."),
   ("platform-modernisation","Platform modernisation","Moving off the thing that is holding you back, without a freeze."),
   ("qa-test-automation","QA &amp; test automation","A suite the team trusts enough to deploy on a Friday.")]),
 ("ai-engineering","AI Engineering",
  "Applied AI that reaches production. Most of this work is evaluation and plumbing rather than models — "
  "which is why it ships.",
  [("ai-readiness-roadmap","AI readiness &amp; roadmap","An honest read on what your data and team can support this year."),
   ("llm-application-development","LLM application development","Products built on language models, with evaluation from day one."),
   ("ai-agents-workflow-automation","AI agents &amp; workflow automation","Agents scoped to a task with a defined failure mode."),
   ("rag-knowledge-systems","RAG &amp; knowledge systems","Retrieval over your own corpus, measured on answer quality."),
   ("machine-learning-data-science","Machine learning &amp; data science","Models where a model is genuinely the right answer."),
   ("mlops-evaluation","MLOps &amp; evaluation","The harness that tells you a change made things better."),
   ("ai-governance","AI governance","Policy, audit trail and human review, written for a regulator.")]),
 ("data-cloud","Data &amp; Cloud",
  "The layer underneath. Pipelines, platforms and the operational discipline that keeps them running "
  "when nobody is watching.",
  [("data-engineering","Data engineering","Pipelines that reconcile, with lineage you can show an auditor."),
   ("analytics-bi","Analytics &amp; BI","Numbers the business agrees on before the meeting starts."),
   ("cloud-architecture","Cloud architecture","Designed for the bill as well as the load."),
   ("cloud-migration","Cloud migration","Moved in slices, with a rollback at every step."),
   ("devops-platform-engineering","DevOps &amp; platform engineering","Paved roads, so product teams stop reinventing deployment."),
   ("reliability-observability","Reliability &amp; observability","You find out before your customers do."),
   ("finops","FinOps","Cloud spend attributed to the teams that cause it.")]),
 ("teams-delivery","Teams &amp; Delivery",
  "How the people are arranged. Named engineers, a reporting cadence, and continuity measured "
  "rather than promised.",
  [("dedicated-squads","Dedicated squads","Three to eight people working only on your platform."),
   ("embedded-engineers","Embedded engineers","Our engineers inside your team, under your technical lead."),
   ("offshore-delivery-centre","Offshore delivery centre","A standing team in Pakistan, on your process and your tooling."),
   ("technical-advisory","Technical advisory","A second opinion from people who will have to live with the answer."),
   ("support-maintenance","Support &amp; maintenance","Named owners, published response times, no ticket roulette."),
   ("security-compliance-engineering","Security &amp; compliance engineering","The evidence a third-party risk review actually asks for.")]),
]
CAT = {s: (t, l, leaves) for s, t, l, leaves in SERVICES}

MODELS=[("Dedicated squad","A standing team of three to eight, working only on your platform.",
   ["Named engineers, fixed for the engagement","Your rituals, your board","Monthly continuity reporting"]),
 ("Embedded engineers","Our people inside your existing team, under your technical lead.",
   ["Two-week onboarding","Your process, your tooling","Scale up or down at 30 days"]),
 ("Fixed-scope build","A defined outcome, a defined price, a defined date.",
   ["Discovery before the number","Milestone billing","Warranty period after handover"])]

def mark(cls="mark", style="", onink=False):
    back = 'rgba(255,255,255,.42)' if onink else '#CBD8F5'
    front = '#fff' if onink else 'url(#gBand)'
    return (f'<svg class="{cls}" style="{style}" viewBox="0 0 210 130" role="img" aria-label="Infinite">'
            f'<path d="{MK["back"]}" fill="{back}"/><path d="{MK["front"]}" fill="{front}"/></svg>')

def btn(label, href="#", cls="", icon=True):
    i = f'<span class="btn__icon">{ARROW}</span>' if icon else ''
    return f'<a class="btn {cls}" href="{href}">{label}{i}</a>'

def models_grid():
    return "".join(f"""<div class="card" style="padding:0;overflow:hidden">
      <div style="background:var(--mist);padding:26px 26px 22px">
        <h3 class="h3" style="margin-bottom:8px">{t}</h3>
        <p class="body" style="font-size:15px">{d}</p></div>
      <div style="padding:22px 26px 26px;display:flex;flex-direction:column;gap:14px;flex:1">
        <ul class="card__list">{"".join(f'<li>{x}</li>' for x in xs)}</ul>
        <a class="btn btn--ghost" href="/contact/" style="margin-top:auto;justify-content:center;padding:11px 20px">Talk it through</a>
      </div></div>""" for t, d, xs in MODELS)

def contact_band():
    return f'''
<section class="sec shell">
  <div style="background:var(--mesh-light);border-radius:var(--r-section);
              padding:clamp(40px,6vw,88px) clamp(26px,4.5vw,72px)">
    <div class="split split--form">
      <div>
        <p class="eyebrow">Start a conversation</p>
        <h2 class="h2" style="margin:16px 0 20px;max-width:15ch">Tell us what you are trying to ship.</h2>
        <p class="body" style="margin-bottom:30px">You will get a reply from an engineer, not a form handler.
        If we are not the right firm for it, we will say so and tell you who is.</p>
        <!-- NEEDS REAL DATA: Canadian HQ address, real email and phone -->
        <div style="font-size:14.5px;color:var(--ink-60);line-height:1.9">
          <div><strong style="color:var(--ink)">Canada</strong> — head office address</div>
          <div><strong style="color:var(--ink)">Pakistan</strong> — delivery office address</div>
          <div style="margin-top:12px"><a href="mailto:hello@infinite.dev" style="color:var(--cobalt);font-weight:600">hello@infinite.dev</a></div>
        </div>
      </div>
      <form style="display:grid;gap:16px" onsubmit="return false">
        <div class="form-row">
          <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name"></div>
          <div class="field"><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        </div>
        <div class="field"><label for="f-co">Company</label><input id="f-co" name="company" autocomplete="organization"></div>
        <div class="field"><label for="f-what">What are you building?</label><textarea id="f-what" name="brief"></textarea></div>
        <div>{btn("Send it")}</div>
      </form>
    </div>
  </div>
</section>'''

def shell(title, desc, body, depth=0):
    up = "../" * depth
    links = "".join(f'<a href="{h}">{t}</a>' for t, h in NAV)
    foot_services = "".join(f'<li><a href="/services/{s}/">{t}</a></li>' for s, t, _, _ in SERVICES)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="{up}tokens.css">
<link rel="stylesheet" href="{up}components.css">
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="gBand" gradientUnits="userSpaceOnUse" x1="13" y1="0" x2="197" y2="0">
    <stop offset="0" stop-color="#4FC7F2"/><stop offset="0.34" stop-color="#2B5CF6"/>
    <stop offset="0.67" stop-color="#7A4DF5"/><stop offset="1" stop-color="#C07BF0"/>
  </linearGradient>
</defs></svg>

<a href="#main" class="skip">Skip to content</a>
<div class="nav-wrap">
  <nav class="nav" aria-label="Primary">
    <a class="lockup" href="/">{mark()}<span class="wd">Infinite</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="navlinks" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 7h16M3 15h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="nav-links" id="navlinks">{links}
      <a class="btn" href="/contact/" style="margin-left:10px">Start a conversation<span class="btn__icon">{ARROW}</span></a>
    </div>
  </nav>
</div>
<main id="main">
{body}
</main>
<footer class="foot">
  <div class="shell">
    <div class="foot-grid">
      <div>
        <div class="lockup" style="color:var(--on-ink)">{mark(onink=True)}<span class="wd">Infinite</span></div>
        <p style="margin:16px 0 0;font-size:13px;color:var(--on-ink-55);max-width:26ch">Design. Develop. Refine.</p>
      </div>
      <div><h4>Services</h4><ul>{foot_services}</ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="/company/">About</a></li><li><a href="/company/team/">Team</a></li>
        <li><a href="/company/careers/">Careers</a></li><li><a href="/company/locations/">Locations</a></li>
        <li><a href="/insights/">Insights</a></li></ul></div>
      <div><h4>Work &amp; approach</h4><ul>
        <li><a href="/work/">Work</a></li><li><a href="/how-we-work/">How we work</a></li>
        <li><a href="/how-we-work/engagement-models/">Engagement models</a></li>
        <li><a href="/security/">Security &amp; data residency</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li><a href="mailto:hello@infinite.dev">hello@infinite.dev</a></li>
        <li><a href="/contact/">Start a conversation</a></li>
        <li><a href="https://www.linkedin.com/">LinkedIn</a></li></ul></div>
    </div>
    <div class="foot__legal">
      <!-- NEEDS REAL DATA: Canadian registered trading name -->
      <span>&copy; 2026 Infinite — registered trading name</span>
      <a href="/privacy/">Privacy</a><a href="/terms/">Terms</a>
      <a href="/accessibility/">Accessibility</a><a href="/security/">Security</a>
    </div>
  </div>
</footer>
<script>
  var t=document.querySelector('.nav-toggle'), l=document.getElementById('navlinks');
  t.addEventListener('click',function(){{
    var open=l.classList.toggle('open');
    t.setAttribute('aria-expanded',open?'true':'false');
  }});
</script>
</body>
</html>
'''

def write(path, html):
    full = os.path.join(HERE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(html)
    return path

# ══════════════════════════════════════════════════════════════════════════
# HOME
# ══════════════════════════════════════════════════════════════════════════
DIFF=[("We name the engineers.",
   "You meet the squad before you sign, and the names on the proposal are the names in the standups."),
 ("We publish the numbers.",
   "Lead time, release cadence and uptime go in the monthly report whether or not they flatter us."),
 ("We stay past launch.",
   "Most of our work is month thirteen onward. Launch is the middle of an engagement, not the end."),
 ("We tell you what went wrong.",
   "Every retro that reaches you includes the things we got wrong and what changed afterwards."),
 ("Your data stays in Canada.",
   "Client data is held in Canadian regions. <!--CLAIM — UNVERIFIED-->Named regions go here once confirmed.")]

STEPS=[("Design","Two to four weeks. We scope with the engineers who will build it, so the estimate comes from the people held to it."),
 ("Develop","Two-week increments, demoed to you, shipped behind flags. You see working software in week three, not a status deck."),
 ("Refine","The squad stays. Lead time comes down, the backlog gets shorter, and the same people know why every decision was made.")]

INDUSTRIES=[("Financial services &amp; payments","Card platforms, ledgers, KYC flows and the audit trail underneath them."),
 ("Healthcare","Clinical workflow and patient data, built to survive a privacy review."),
 ("Retail &amp; commerce","Checkout, inventory and the systems that hold up on the busiest day of the year."),
 ("Logistics &amp; supply chain","Tracking, routing and the integrations between systems that were never meant to meet."),
 ("SaaS &amp; technology","Product teams that need to ship faster than hiring allows."),
 ("Energy &amp; utilities","Field data, metering and long-lived systems that cannot go down.")]

def service_cards():
    out=[]
    for slug,title,_,leaves in SERVICES:
        li="".join(f"<li>{n}</li>" for _,n,_ in leaves[:3])
        out.append(f'''<a class="card card--link" href="/services/{slug}/" style="text-decoration:none">
        <h3 class="h3">{title}</h3><ul class="card__list">{li}</ul>
        <span class="tlink" style="margin-top:auto;padding-top:14px">Explore {ARROW}</span></a>''')
    return "".join(out)

HOME = f'''
<!-- ══ 01 HERO — mesh-light, gradient surface 1 of 2 ══ -->
<div class="shell" style="padding-top:18px">
  <div style="background:var(--mesh-light);border-radius:var(--r-section);
              padding:clamp(48px,7vw,104px) clamp(26px,4.5vw,72px) clamp(56px,8vw,112px)">
    <div class="split split--hero">
      <div class="hero-anim">
        <div style="margin-bottom:26px">{mark("mark mark--hero","height:56px")}</div>
        <p class="eyebrow">Design. Develop. Refine.</p>
        <h1 class="display" style="margin:18px 0 22px;max-width:17ch">The team that scoped it is the team that ships it.</h1>
        <div>
          <p class="body body--lead" style="margin-bottom:30px">A Canadian software firm building and running
          platforms for companies in payments, healthcare and logistics. The same squad, month one to month thirty.</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            {btn("Start a conversation","/contact/")}
            {btn("See how we work","/how-we-work/","btn--ghost",icon=False)}
          </div>
        </div>
      </div>
      <!-- NEEDS REAL DATA: both figures -->
      <div class="hero-stats">
        <div class="hero-card"><span class="fig">30</span><span>months on the longest running engagement</span></div>
        <div class="hero-card"><span class="fig">6.2</span><span>day median lead time to production</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ══ 02 CONTINUITY — the one ink band, the only glass on the site ══ -->
<section class="sec shell">
  <div class="ink-band">
    <p class="eyebrow eyebrow--onink">What continuity looks like</p>
    <h2 class="h2" style="margin:14px 0 16px;max-width:19ch">A services firm sells one thing that is hard to photograph.</h2>
    <p class="body" style="color:var(--on-ink-70);margin-bottom:clamp(30px,4vw,48px)">
      Every competitor on your shortlist will tell you how many engineers they have.
      <strong style="color:var(--on-ink)">Here is the number that actually predicts how your project goes.</strong></p>
    <!-- NEEDS REAL DATA: all four figures -->
    <div class="grid grid--4">
      <div class="glass"><span class="fig">30</span><span class="cap">months, longest running engagement</span></div>
      <div class="glass"><span class="fig">6.2</span><span class="cap">day median lead time</span></div>
      <div class="glass"><span class="fig">4</span><span class="cap">days between production releases</span></div>
      <div class="glass"><span class="fig">92%</span><span class="cap">engineer continuity over 12 months</span></div>
    </div>
  </div>
</section>

<!-- ══ 03 CLIENT LOGOS ══ -->
<section class="sec sec--mist"><div class="shell">
  <p class="eyebrow eyebrow--quiet" style="margin-bottom:26px">Who we build for</p>
  <!-- NEEDS REAL DATA: which clients may be named publicly -->
  <div class="logos">{"".join('<div class="logo-slot">Client</div>' for _ in range(5))}</div>
</div></section>

<!-- ══ 04 WHAT WE DO ══ -->
<section class="sec"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">What we do</p>
    <h2 class="h2" style="max-width:16ch">Four practices, one delivery model.</h2>
    <p class="body">Every engagement is staffed from the same bench and reports the same numbers,
    whichever practice it starts in.</p>
  </div>
  <div class="grid grid--4">{service_cards()}</div>
</div></section>

<!-- ══ 05 FEATURED CASE STUDY — ungated ══ -->
<section class="sec sec--mist"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Case study</p></div>
  <!-- NEEDS REAL DATA: client name, sector, metrics, quote, attribution, link -->
  <div class="split split--even">
    <div>
      <h3 class="h2" style="margin-bottom:20px;max-width:18ch">We took their release cycle from six weeks to four days.</h3>
      <p class="body" style="margin-bottom:28px">A payments platform that could not ship during business hours.
      We spent the first month instrumenting the pipeline before changing a line of product code, then moved the
      team to trunk-based delivery behind flags.</p>
      <blockquote style="margin:0 0 28px;padding-left:18px;border-left:2px solid var(--cobalt)">
        <p class="body" style="color:var(--ink);font-size:17px">&ldquo;Quote from the client goes here, once cleared.&rdquo;</p>
        <footer style="margin-top:10px;font-size:14px;color:var(--ink-40)">Name, role — company</footer>
      </blockquote>
      <a class="tlink" href="/work/">Read the case study {ARROW}</a>
    </div>
    <div class="metrics">
      <div class="card"><span class="fig">6wk</span><span style="font-size:14px;color:var(--ink-60)">release cycle before</span></div>
      <div class="card"><span class="fig">4d</span><span style="font-size:14px;color:var(--ink-60)">release cycle after</span></div>
      <div class="card"><span class="fig">99.98%</span><span style="font-size:14px;color:var(--ink-60)">uptime, trailing 12 months</span></div>
      <div class="card"><span class="fig">14</span><span style="font-size:14px;color:var(--ink-60)">sprints, same four engineers</span></div>
    </div>
  </div>
</div></section>

<!-- ══ 06 THE DIFFERENCE ══ -->
<section class="sec"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">The difference</p>
    <h2 class="h2" style="max-width:15ch">Five things most firms will not put in writing.</h2>
  </div>
  <div>{"".join(f'<div class="stmt"><h3 class="h3">{t}</h3><p class="body">{d}</p></div>' for t,d in DIFF)}</div>
</div></section>

<!-- ══ 07 HOW WE WORK — the only genuine sequence on the page ══ -->
<section class="sec sec--mist"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">How we work</p>
    <h2 class="h2" style="max-width:17ch">Three phases, because there are only three.</h2>
    <p class="body">The tagline is the process. Competitors run five to seven phases because it fills a slide.</p>
  </div>
  <div>{"".join(f'<div class="step"><span class="step__n">{i+1:02d}</span><div><h3 class="h3" style="margin-bottom:8px">{t}</h3><p class="body">{d}</p></div></div>' for i,(t,d) in enumerate(STEPS))}</div>
</div></section>

<!-- ══ 08 ENGAGEMENT MODELS — the spec's bento, prices removed ══ -->
<section class="sec"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">Engagement models</p>
    <h2 class="h2" style="max-width:16ch">Three ways to work with us.</h2>
    <p class="body">Pricing depends on the squad and the scope, so we quote after discovery rather than
    publishing a number we would have to walk back.</p>
  </div>
  <div class="grid grid--3">{models_grid()}</div>
</div></section>

<!-- ══ 09 INDUSTRIES ══ -->
<section class="sec sec--mist"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Industries</p>
    <h2 class="h2" style="max-width:14ch">Where we have done this before.</h2></div>
  <div>{"".join(f'<a class="ind" href="/industries/"><span class="ind__n">{t}</span><span class="ind__d">{d}</span></a>' for t,d in INDUSTRIES)}</div>
</div></section>

<!-- ══ 10 SELECTED WORK ══ -->
<section class="sec"><div class="shell">
  <div class="sec-head" style="flex-direction:row;justify-content:space-between;align-items:flex-end;flex-wrap:wrap">
    <div><p class="eyebrow">Selected work</p>
      <h2 class="h2" style="margin-top:14px;max-width:14ch">Platforms still running.</h2></div>
    <a class="tlink" href="/work/">All work {ARROW}</a>
  </div>
  <!-- NEEDS REAL DATA: three real projects -->
  <div class="grid grid--3">
    {"".join(f"""<a class="card card--link" href="/work/" style="text-decoration:none">
      <div style="height:150px;border-radius:var(--r-inner);background:var(--mist);display:grid;place-items:center;
           color:var(--ink-25);font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase">Project</div>
      <h3 class="h3" style="margin-top:6px">Project name</h3>
      <p class="body" style="font-size:15px">One line on the sector and the outcome, with a number in it.</p></a>""" for _ in range(3))}
  </div>
</div></section>

<!-- ══ 11 CREDENTIALS — blocked pending ISO / SOC 2 confirmation. Markup ready.
<section class="sec sec--mist"><div class="shell">
  <p class="eyebrow eyebrow--quiet">Credentials</p><div class="logos">…badges…</div>
</div></section> ══ -->

<!-- ══ 12 INSIGHTS ══ -->
<section class="sec sec--mist"><div class="shell">
  <div class="sec-head" style="flex-direction:row;justify-content:space-between;align-items:flex-end;flex-wrap:wrap">
    <div><p class="eyebrow">Insights</p>
      <h2 class="h2" style="margin-top:14px;max-width:16ch">What we have learned shipping this.</h2></div>
    <a class="tlink" href="/insights/">All insights {ARROW}</a>
  </div>
  <!-- NEEDS REAL DATA: three real articles -->
  <div class="grid grid--3">
    {"".join("""<a class="card card--link" href="/insights/" style="text-decoration:none">
      <span class="eyebrow eyebrow--quiet">Article</span>
      <h3 class="h3">Headline goes here, written as a claim rather than a topic.</h3>
      <p class="body" style="font-size:15px">Two lines of standfirst.</p></a>""" for _ in range(3))}
  </div>
</div></section>
{contact_band()}
'''

# ══════════════════════════════════════════════════════════════════════════
# /services/  — index, categories, leaves
# ══════════════════════════════════════════════════════════════════════════
def services_index():
    blocks = []
    for slug, title, lede, leaves in SERVICES:
        li = "".join(f'<li><a href="/services/{slug}/{ls}/">{ln}</a><span>{ld}</span></li>'
                     for ls, ln, ld in leaves)
        blocks.append(f'''<div class="svc-block">
          <div class="svc-block__head">
            <h2 class="h2">{title}</h2>
            <p class="body">{lede}</p>
            <a class="tlink" href="/services/{slug}/">Category overview {ARROW}</a>
          </div>
          <ul class="svc-leaves">{li}</ul>
        </div>''')
    return f'''
<div class="shell" style="padding-top:18px">
  <!-- bottom padding keeps copy in the top ~65% of the mesh: below that the
       ramp darkens to #B6C6F2 and ink-60 body text drops under 4.5:1 -->
  <div style="background:var(--mesh-light);border-radius:var(--r-section);
              padding:clamp(48px,7vw,96px) clamp(26px,4.5vw,72px) clamp(96px,13vw,180px)">
    <p class="eyebrow">Services</p>
    <h1 class="display" style="margin:18px 0 22px;max-width:16ch">Four practices, one delivery model.</h1>
    <p class="body body--lead">Whichever practice an engagement starts in, it is staffed from the same bench,
    run on the same two-week cadence, and reports the same numbers. Twenty-seven services below — but the
    thing being bought is always continuity.</p>
  </div>
</div>
<section class="sec"><div class="shell">{"".join(blocks)}</div></section>
<section class="sec sec--mist"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">The difference</p>
    <h2 class="h2" style="max-width:15ch">Five things most firms will not put in writing.</h2>
  </div>
  <div>{"".join(f'<div class="stmt"><h3 class="h3">{t}</h3><p class="body">{d}</p></div>' for t,d in DIFF)}</div>
</div></section>
{contact_band()}'''

def category_page(slug, title, lede, leaves):
    cards = "".join(f'''<a class="card card--link" href="/services/{slug}/{ls}/" style="text-decoration:none">
      <h3 class="h3">{ln}</h3><p class="body" style="font-size:15px">{ld}</p>
      <span class="tlink" style="margin-top:auto;padding-top:12px">Detail {ARROW}</span></a>''' for ls, ln, ld in leaves)
    others = "".join(f'<a class="ind" href="/services/{s}/"><span class="ind__n">{t}</span>'
                     f'<span class="ind__d">{l.split(".")[0]}.</span></a>'
                     for s, t, l, _ in SERVICES if s != slug)
    return f'''
<div class="shell" style="padding-top:18px">
  <div style="background:var(--mist);border-radius:var(--r-section);
              padding:clamp(40px,6vw,84px) clamp(26px,4.5vw,64px)">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/services/">Services</a><span>/</span><span>{title}</span></nav>
    <h1 class="display" style="margin:18px 0 20px;max-width:15ch">{title}</h1>
    <p class="body body--lead" style="margin-bottom:30px">{lede}</p>
    {btn("Start a conversation","/contact/")}
  </div>
</div>

<section class="sec"><div class="shell">
  <div class="sec-head">
    <p class="eyebrow">What this covers</p>
    <h2 class="h2" style="max-width:15ch">{len(leaves)} services in this practice.</h2>
  </div>
  <div class="grid grid--3">{cards}</div>
</div></section>

<section class="sec sec--mist"><div class="shell">
  <div class="sec-head"><p class="eyebrow">How this runs</p>
    <h2 class="h2" style="max-width:16ch">The same three phases, every time.</h2></div>
  <div>{"".join(f'<div class="step"><span class="step__n">{i+1:02d}</span><div><h3 class="h3" style="margin-bottom:8px">{t}</h3><p class="body">{d}</p></div></div>' for i,(t,d) in enumerate(STEPS))}</div>
</div></section>

<section class="sec"><div class="shell">
  <div class="sec-head" style="flex-direction:row;justify-content:space-between;align-items:flex-end;flex-wrap:wrap">
    <div><p class="eyebrow">Related work</p><h2 class="h2" style="margin-top:14px;max-width:14ch">Built in this practice.</h2></div>
    <a class="tlink" href="/work/">All work {ARROW}</a>
  </div>
  <!-- NEEDS REAL DATA: two real projects from this practice -->
  <div class="grid grid--2">
    {"".join("""<a class="card card--link" href="/work/" style="text-decoration:none">
      <div style="height:140px;border-radius:var(--r-inner);background:var(--mist);display:grid;place-items:center;
           color:var(--ink-25);font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase">Project</div>
      <h3 class="h3" style="margin-top:6px">Project name</h3>
      <p class="body" style="font-size:15px">One line on the sector and the outcome, with a number in it.</p></a>""" for _ in range(2))}
  </div>
</div></section>

<section class="sec sec--mist"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Engagement models</p>
    <h2 class="h2" style="max-width:16ch">Three ways to work with us.</h2></div>
  <div class="grid grid--3">{models_grid()}</div>
</div></section>

<section class="sec"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Other practices</p></div>
  <div>{others}</div>
</div></section>
{contact_band()}'''

def leaf_page(cat_slug, cat_title, ls, ln, ld, siblings):
    sibs = "".join(f'<a class="ind" href="/services/{cat_slug}/{s}/"><span class="ind__n">{n}</span>'
                   f'<span class="ind__d">{d}</span></a>' for s, n, d in siblings if s != ls)
    return f'''
<div class="shell" style="padding-top:18px">
  <div style="background:var(--mist);border-radius:var(--r-section);
              padding:clamp(40px,6vw,80px) clamp(26px,4.5vw,64px)">
    <nav class="crumb" aria-label="Breadcrumb">
      <a href="/services/">Services</a><span>/</span>
      <a href="/services/{cat_slug}/">{cat_title}</a><span>/</span><span>{ln}</span></nav>
    <h1 class="display" style="margin:18px 0 20px;max-width:16ch;font-size:clamp(32px,5vw,58px)">{ln}</h1>
    <p class="body body--lead" style="margin-bottom:30px">{ld}</p>
    {btn("Start a conversation","/contact/")}
  </div>
</div>

<section class="sec"><div class="shell">
  <div class="split split--even" style="align-items:start">
    <div>
      <p class="eyebrow">The problem</p>
      <h2 class="h2" style="margin:14px 0 18px;max-width:17ch">What usually brings people here.</h2>
      <!-- NEEDS COPY: the specific problem this service solves -->
      <p class="body">Two or three paragraphs describing the situation a client is in when they need this,
      written in the second person and naming a real symptom rather than a category.</p>
    </div>
    <div>
      <p class="eyebrow">What we do</p>
      <h2 class="h2" style="margin:14px 0 18px;max-width:17ch">How the work actually runs.</h2>
      <!-- NEEDS COPY: the concrete method, with a duration and a deliverable -->
      <p class="body">What happens in week one, what you get at the end of the first increment,
      and who is in the room. Named deliverables, not phases.</p>
    </div>
  </div>
</div></section>

<section class="sec sec--mist"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Proof</p>
    <h2 class="h2" style="max-width:15ch">What it looked like last time.</h2></div>
  <!-- NEEDS REAL DATA: one engagement, three figures, ungated link -->
  <div class="metrics" style="grid-template-columns:repeat(3,1fr)">
    <div class="card"><span class="fig">—</span><span style="font-size:14px;color:var(--ink-60)">Metric one</span></div>
    <div class="card"><span class="fig">—</span><span style="font-size:14px;color:var(--ink-60)">Metric two</span></div>
    <div class="card"><span class="fig">—</span><span style="font-size:14px;color:var(--ink-60)">Metric three</span></div>
  </div>
</div></section>

<section class="sec"><div class="shell">
  <div class="sec-head"><p class="eyebrow">Also in {cat_title}</p></div>
  <div>{sibs}</div>
</div></section>
{contact_band()}'''

# ── emit ──────────────────────────────────────────────────────────────────
written = []
written.append(write("index.html", shell(
  "Infinite — The team that scoped it is the team that ships it",
  "A Canadian software firm building and running platforms for companies in payments, "
  "healthcare and logistics. The same squad, month one to month thirty.", HOME, depth=0)))

written.append(write("services/index.html", shell(
  "Services — Infinite",
  "Four practices, one delivery model: product engineering, AI engineering, data and cloud, "
  "teams and delivery.", services_index(), depth=1)))

for slug, title, lede, leaves in SERVICES:
    plain = title.replace("&amp;", "&")
    written.append(write(f"services/{slug}/index.html", shell(
        f"{plain} — Infinite", lede.replace("&amp;", "&"),
        category_page(slug, title, lede, leaves), depth=2)))
    for ls, ln, ld in leaves:
        written.append(write(f"services/{slug}/{ls}/index.html", shell(
            f"{ln.replace('&amp;','&')} — {plain} — Infinite", ld.replace("&amp;", "&"),
            leaf_page(slug, title, ls, ln, ld, leaves), depth=3)))

print(f"{len(written)} pages written")
for p in written[:3]: print("  ", p)
print("   …")
for p in written[-2:]: print("  ", p)
