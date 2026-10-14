import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { phases } from "@/content/how-we-work";

export const metadata: Metadata = {
  title: "How we work",
  description: "Design, develop, refine. Three phases, and what happens inside each of them.",
  alternates: { canonical: "/how-we-work/" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "How we work" }]}
        title="Three phases, because there are only three."
        lede="Most firms publish five to seven. The extra ones exist to fill a diagram. Design, develop, refine is the whole of it, and the tagline is the process rather than a slogan sitting on top of one."
        banner="/img/work/header"
      />

      {phases.map((phase, i) => (
        <Section key={phase.slug} ground={i % 2 === 1 ? "mist" : "paper"}>
          <div className="grid grid-cols-1 gap-[clamp(1.75rem,4.5vw,4rem)] lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              {/* The only numbered sequence on the site, per the build plan:
                  it is the only thing that genuinely happens in order. */}
              <span className="font-figure text-[13px] font-medium tracking-[0.1em] text-cobalt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 mb-4 text-h2">{phase.title}</h2>
              <p className="text-eyebrow text-ink-40 uppercase">{phase.duration}</p>
              <p className="mt-5 max-w-measure text-lead text-ink-60">{phase.lede}</p>
            </div>
            <div className="grid grid-cols-1 gap-0 border-t border-rule">
              {phase.detail.map((d) => (
                <div key={d.title} className="border-b border-rule py-6">
                  <h3 className="mb-[10px] text-h3">{d.title}</h3>
                  <p className="max-w-measure text-ink-60">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section ground="mist">
        <SectionHead eyebrow="Next" title="The parts people ask about first."
                     measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {[
            { href: "/how-we-work/delivery/", title: "Delivery model",
              body: "How a squad is composed, what the cadence is, and what lands in your inbox each month." },
            { href: "/how-we-work/engagement-models/", title: "Engagement models",
              body: "Dedicated squad, embedded engineers, or a fixed-scope build, and which one fits what." },
          ].map((c) => (
            <Link key={c.href} href={c.href}
                  className="group rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)] no-underline transition-transform duration-300 ease-brand hover:scale-[1.02]">
              <h3 className="mb-[10px] flex items-center gap-2 text-h3 text-ink">
                {c.title} <Arrow className="size-[13px] text-cobalt" />
              </h3>
              <p className="m-0 max-w-measure text-ink-60">{c.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
