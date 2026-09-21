import Link from "next/link";
import { Button } from "@/components/primitives/Button";
import { Arrow } from "@/components/primitives/Arrow";
import { Logo } from "@/components/primitives/Logo";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ProductMock } from "@/components/visuals/ProductMock";
import { MarkComposition } from "@/components/visuals/MarkComposition";
import { serviceCategories } from "@/content/services";
import { industries } from "@/content/industries";
import { differentiators, steps, engagementModels, continuityFigures } from "@/content/home";
import { categoryIcons, menuIcons } from "@/components/nav-icons";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ═══ 01 hero — mesh surface 1 of 2 ═══ */}
      <div className="mx-auto max-w-shell px-gut pt-[18px]">
        <div className="rounded-section bg-mesh px-panel-x pt-hero-t pb-hero-b">
          <div className="grid grid-cols-1 items-end gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-[1.35fr_0.65fr]">
            <div>
              <Logo className="mb-[26px] h-[56px] animate-unfurl" />
              <p className="text-eyebrow text-cobalt uppercase">{site.tagline}</p>
              <h1 className="measure-base mt-[18px] mb-[22px] text-display">
                The team that scoped it is the team that ships it.
              </h1>
              <p className="max-w-measure text-lead text-ink-60">
                A Canadian software house building and running platforms for companies in
                payments, healthcare and logistics. The same squad, month one to month thirty.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3">
                <Button href="/contact/">Start a conversation</Button>
                <Button href="/how-we-work/" variant="ghost">See how we work</Button>
              </div>
            </div>
            {/* NEEDS REAL DATA */}
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <HeroStat value="30" caption="months on the longest running engagement" />
              <HeroStat value="6.2" caption="day median lead time to production" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 02 continuity — the one ink band, the only dark glass ═══ */}
      <section className="mx-auto max-w-shell px-gut py-sec">
        <div className="grain relative overflow-hidden rounded-section bg-ink px-band-x py-band-y text-on-ink">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(180deg,rgb(43_92_246/0.16)_0%,rgb(10_16_36/0)_58%)]" />
          <p className="text-eyebrow text-on-ink-55 uppercase">What continuity looks like</p>
          <h2 className="measure-wide mt-[14px] mb-4 text-h2">
            A services firm sells one thing that is hard to photograph.
          </h2>
          <p className="mb-sec-gap max-w-measure text-on-ink-70">
            Every competitor on your shortlist will tell you how many engineers they have.{" "}
            <strong className="font-semibold text-on-ink">
              Here is the number that actually predicts how your project goes.
            </strong>
          </p>
          {/* NEEDS REAL DATA: all four figures */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {continuityFigures.map((f) => (
              <div key={f.caption}
                   className="rounded-card border border-glass-edge bg-glass-fill px-[26px] py-6 backdrop-blur-[12px]">
                <span className="block font-figure text-figure text-on-ink">{f.value}</span>
                <span className="mt-[10px] block text-small text-on-ink-55">{f.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 03 logos ═══ */}
      <Section ground="mist">
        <p className="mb-7 text-eyebrow text-ink-40 uppercase">Who we build for</p>
        {/* NEEDS REAL DATA: which clients may be named publicly */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="grid h-[92px] place-items-center bg-paper">
              <span className="text-[11px] font-bold tracking-[0.18em] text-ink-25 uppercase">Client</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-small text-ink-40">
          Named once each client clears it. We do not list logos we cannot attribute.
        </p>
      </Section>

      {/* ═══ 04 what we do ═══ */}
      <Section>
        <SectionHead
          eyebrow="What we do"
          title="Four practices, one delivery model."
          body="Every engagement is staffed from the same bench and reports the same numbers, whichever practice it starts in."
        />
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat) => {
            const Icon = categoryIcons[cat.slug];
            return (
              <Link key={cat.slug} href={`/services/${cat.slug}/`}
                    className="group flex flex-col rounded-card border border-rule bg-paper p-[26px] no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px] hover:border-ink-25">
                <span className="mb-5 grid size-[44px] place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {Icon && <Icon size={21} strokeWidth={1.6} aria-hidden />}
                </span>
                <h3 className="text-h3 text-ink">{cat.title}</h3>
                <ul className="mt-3 flex list-none flex-col gap-[7px] p-0">
                  {cat.leaves.slice(0, 3).map((l) => (
                    <li key={l.slug} className="text-small text-ink-60">{l.name}</li>
                  ))}
                </ul>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[14.5px] font-semibold text-cobalt">
                  {cat.leaves.length} services <Arrow className="size-[13px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══ 05 case study ═══ */}
      <Section ground="mist">
        <SectionHead eyebrow="Case study" title="We took their release cycle from six weeks to four days."
                     measure="measure-wide" />
        {/* NEEDS REAL DATA: client, metrics, quote, attribution */}
        <div className="grid grid-cols-1 items-center gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-2">
          <div>
            <p className="mb-7 max-w-measure text-ink-60">
              A payments platform that could not ship during business hours. We spent the first month
              instrumenting the pipeline before changing a line of product code, then moved the team to
              trunk-based delivery behind flags.
            </p>
            <blockquote className="mb-7 border-l-2 border-cobalt pl-[18px]">
              <p className="text-[17px] text-ink">&ldquo;Quote from the client goes here, once cleared.&rdquo;</p>
              <footer className="mt-[10px] text-[14px] text-ink-40">Name, role — company</footer>
            </blockquote>
            <div className="grid grid-cols-2 gap-4">
              {[["6wk", "release cycle before"], ["4d", "release cycle after"],
                ["99.98%", "uptime, trailing 12 months"], ["14", "sprints, same four engineers"]].map(([v, c]) => (
                <div key={c} className="rounded-card border border-rule bg-paper p-5">
                  <span className="block font-figure text-[clamp(26px,3.4vw,36px)] leading-none font-medium tracking-[-0.03em]">{v}</span>
                  <span className="mt-2 block text-[13.5px] text-ink-60">{c}</span>
                </div>
              ))}
            </div>
            <Link href="/work/" className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
              Read the case study <Arrow className="size-[13px]" />
            </Link>
          </div>
          <ProductMock />
        </div>
      </Section>

      {/* ═══ 06 the difference ═══ */}
      <Section>
        <SectionHead eyebrow="The difference" title="Five things most firms will not put in writing."
                     measure="measure-tight" />
        <div>
          {differentiators.map((d) => (
            <div key={d.title}
                 className="grid grid-cols-1 items-baseline gap-2 border-t border-rule py-6 last:border-b md:grid-cols-[1fr_1.25fr] md:gap-[clamp(1.125rem,3vw,3rem)]">
              <h3 className="text-h3">{d.title}</h3>
              <p className="max-w-measure text-ink-60">
                {d.body}
                {"status" in d && <span className="ml-1 text-ink-25">Named regions go here once confirmed.</span>}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ 07 how we work — the only genuine sequence ═══ */}
      <Section ground="mist">
        <SectionHead eyebrow="How we work" title="Three phases, because there are only three."
                     body="The tagline is the process. Competitors run five to seven phases because it fills a slide." />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-card bg-paper p-7">
              <span className="font-figure text-[13px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 mb-2 text-h3">{s.title}</h3>
              <p className="text-small text-ink-60">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ 08 engagement models ═══ */}
      <Section>
        <SectionHead eyebrow="Engagement models" title="Three ways to work with us."
                     body="Pricing depends on the squad and the scope, so we quote after discovery rather than publishing a number we would have to walk back." />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {engagementModels.map((m) => (
            <div key={m.title} className="flex flex-col overflow-hidden rounded-card border border-rule bg-paper">
              <div className="bg-mist px-[26px] pt-[26px] pb-[22px]">
                <h3 className="mb-2 text-h3">{m.title}</h3>
                <p className="text-[15px] text-ink-60">{m.body}</p>
              </div>
              <div className="flex flex-1 flex-col gap-[14px] px-[26px] pt-[22px] pb-[26px]">
                <ul className="flex list-none flex-col gap-[7px] p-0">
                  {m.points.map((p) => <li key={p} className="text-small text-ink-60">{p}</li>)}
                </ul>
                <Button href="/contact/" variant="ghost" className="mt-auto justify-center">Talk it through</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ 09 industries ═══ */}
      <Section ground="mist">
        <SectionHead eyebrow="Industries" title="Where we have done this before." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const Icon = menuIcons[`/industries/${ind.slug}/`];
            return (
              <Link key={ind.slug} href={`/industries/${ind.slug}/`}
                    className="group flex gap-[14px] rounded-card bg-paper p-6 no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px]">
                <span className="mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {Icon && <Icon size={18} strokeWidth={1.6} aria-hidden />}
                </span>
                <span>
                  <span className="block text-[17px] font-semibold tracking-[-0.024em] text-ink">{ind.name}</span>
                  <span className="mt-1 block text-small text-ink-60">{ind.summary}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══ 10 selected work ═══ */}
      <Section>
        <SectionHead eyebrow="Selected work" title="Platforms still running." measure="measure-tight"
          action={<Link href="/work/" className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
            All work <Arrow className="size-[13px]" /></Link>} />
        {/* NEEDS REAL DATA: three real projects */}
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Link key={i} href="/work/" className="group flex flex-col gap-3 no-underline">
              <MarkComposition index={i}
                         className="transition-transform duration-300 ease-brand group-hover:scale-[1.02]" />
              <h3 className="text-h3">Project name</h3>
              <p className="text-[15px] text-ink-60">One line on the sector and the outcome, with a number in it.</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═══ 12 insights ═══ */}
      <Section ground="mist">
        <SectionHead eyebrow="Insights" title="What we have learned shipping this."
          action={<Link href="/insights/" className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
            All insights <Arrow className="size-[13px]" /></Link>} />
        {/* NEEDS REAL DATA: three real articles */}
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Link key={i} href="/insights/"
                  className="flex flex-col gap-3 rounded-card bg-paper p-7 no-underline
                             transition-all duration-300 ease-brand hover:-translate-y-[3px]">
              <span className="text-eyebrow text-ink-40 uppercase">Article</span>
              <h3 className="text-h3">Headline goes here, written as a claim rather than a topic.</h3>
              <p className="text-[15px] text-ink-60">Two lines of standfirst.</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ═══ 13 contact — mesh surface 2 of 2 ═══ */}
      <section className="mx-auto max-w-shell px-gut py-sec">
        <div className="rounded-section bg-mesh px-panel-x py-band-y">
          <div className="grid grid-cols-1 gap-[clamp(1.875rem,5vw,4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-eyebrow text-cobalt uppercase">Start a conversation</p>
              <h2 className="measure-tight mt-4 mb-5 text-h2">Tell us what you are trying to ship.</h2>
              <p className="mb-7 max-w-measure text-ink-60">
                You will get a reply from an engineer, not a form handler. If we are not the right firm
                for it, we will say so and tell you who is.
              </p>
              {/* NEEDS REAL DATA: addresses */}
              <div className="text-[14.5px] leading-[1.9] text-ink-60">
                {site.offices.map((o) => (
                  <div key={o.country}>
                    <strong className="font-semibold text-ink">{o.country}</strong> — {o.role.toLowerCase()}
                  </div>
                ))}
                <a href={`mailto:${site.email}`} className="mt-3 inline-block font-semibold text-cobalt">{site.email}</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="flex-1 rounded-card border border-glass-light-edge bg-glass-light px-6 py-[22px] backdrop-blur-[12px]">
      <span className="block font-figure text-[clamp(30px,4vw,38px)] leading-none font-medium tracking-[-0.03em]">{value}</span>
      <span className="mt-2 block text-[14px] text-ink-60">{caption}</span>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="f-name" label="Name" autoComplete="name" />
        <Field id="f-email" label="Work email" type="email" autoComplete="email" />
      </div>
      <Field id="f-company" label="Company" autoComplete="organization" />
      <div className="flex flex-col gap-[7px]">
        <label htmlFor="f-brief" className="text-[13px] font-semibold text-ink-60">What are you building?</label>
        <textarea id="f-brief" name="brief" rows={4}
          className="w-full resize-y rounded-inner border border-glass-light-edge bg-paper/72 px-[15px] py-[13px] text-[15px] text-ink" />
      </div>
      {/* TODO: no endpoint yet — static export has no runtime. See plan §F. */}
      <div><Button>Send it</Button></div>
    </form>
  );
}

function Field({ id, label, type = "text", autoComplete }: {
  id: string; label: string; type?: string; autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink-60">{label}</label>
      <input id={id} name={id.replace("f-", "")} type={type} autoComplete={autoComplete}
        className="w-full rounded-inner border border-glass-light-edge bg-paper/72 px-[15px] py-[13px] text-[15px] text-ink" />
    </div>
  );
}
