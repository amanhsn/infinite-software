import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { deliveryPractices, deliveryRituals } from "@/content/how-we-work";

export const metadata: Metadata = {
  title: "Delivery model",
  description: "How a squad is composed, how it runs, and what reaches you each month.",
  alternates: { canonical: "/how-we-work/delivery/" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "How we work", href: "/how-we-work/" }, { label: "Delivery model" }]}
        title="How the work actually runs."
        lede="The process below is the same on every engagement. It is deliberately unremarkable, because the value is in it being the same every month rather than in it being clever."
      />

      <Section>
        <SectionHead eyebrow="Practices" title="Six things that do not vary."
                     body="These are not negotiable per engagement. They are the reason a squad can be handed a platform it did not build and still ship in its third week."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {deliveryPractices.map((p) => (
            <div key={p.title} className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
              <h3 className="mb-[10px] text-h3">{p.title}</h3>
              <p className="m-0 text-ink-60">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Cadence" title="What is in the calendar."
                     measure="measure-tight" />
        <dl className="m-0 grid grid-cols-1 border-t border-rule">
          {deliveryRituals.map((r, i) => (
            <div key={i}
                 className="flex flex-col gap-1 border-b border-rule py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <dt className="font-figure shrink-0 text-[13px] font-medium tracking-[0.08em] text-cobalt uppercase sm:w-[168px]">
                {r.when}
              </dt>
              <dd className="m-0 max-w-measure text-ink-60">{r.what}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactBand />
    </>
  );
}
