import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Button } from "@/components/primitives/Button";
import { engagementModels } from "@/content/home";

export const metadata: Metadata = {
  title: "Engagement models",
  description: "Dedicated squad, embedded engineers, or a fixed-scope build, and which one fits what.",
  alternates: { canonical: "/how-we-work/engagement-models/" },
};

const FIT = [
  { model: "Dedicated squad", best: "A platform you intend to own for years", less: "A single, tightly bounded deliverable" },
  { model: "Embedded engineers", best: "An existing team that needs depth, not direction", less: "A team with no technical lead to embed under" },
  { model: "Fixed-scope build", best: "A defined outcome with a date attached to it", less: "Work whose shape is still being discovered" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "How we work", href: "/how-we-work/" }, { label: "Engagement models" }]}
        title="Three ways to work with us."
        lede="There is no public rate card, because the number depends on the shape of the team and the length of the commitment. What follows is how each model is structured and what it suits."
      />

      <Section>
        {/* The build plan's pricing bento with the prices removed: geometry
            kept, a CTA per card instead of a figure. */}
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
          {engagementModels.map((m) => (
            <div key={m.title}
                 className="flex flex-col rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)]">
              <h2 className="mb-3 text-h3">{m.title}</h2>
              <p className="mb-6 text-ink-60">{m.body}</p>
              <ul className="m-0 mb-8 flex list-none flex-col gap-3 p-0">
                {m.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] text-ink">
                    <span aria-hidden className="mt-[9px] size-[5px] shrink-0 rounded-full bg-cobalt" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button href="/contact/" variant="ghost">Talk about this</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Choosing" title="Where each one stops making sense."
                     body="The honest version. A model applied to the wrong situation costs more than the difference between the models."
                     measure="measure-base" />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {["Model", "Fits", "Does not fit"].map((h) => (
                  <th key={h} scope="col"
                      className="py-3 pr-6 text-eyebrow text-ink-40 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIT.map((r) => (
                <tr key={r.model} className="border-b border-rule align-top">
                  <th scope="row" className="py-5 pr-6 text-[15px] font-semibold text-ink">{r.model}</th>
                  <td className="py-5 pr-6 text-[15px] text-ink-60">{r.best}</td>
                  <td className="py-5 text-[15px] text-ink-60">{r.less}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
