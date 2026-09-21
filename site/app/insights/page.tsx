import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "What we have learned shipping for regulated industries, written by the people who shipped it.",
  alternates: { canonical: "/insights/" },
};

const EDITORIAL = [
  {
    title: "Written by engineers",
    body: "Pieces are written by the people who did the work. A marketing team can produce more articles per month and none of them will tell you anything you could act on.",
  },
  {
    title: "Specific or not published",
    body: "An article has to contain something we would have wanted to know a year earlier. General advice about digital transformation is not a shortage anyone is suffering from.",
  },
  {
    title: "Including the things that went wrong",
    body: "The useful half of any engineering write-up is the part where the first approach failed. That part stays in.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Insights" }]}
        title="What we have learned shipping this."
        lede="Notes from building and running platforms in payments, healthcare and logistics. Written by the engineers on those platforms."
      />

      <Section>
        <SectionHead eyebrow="Editorial standard" title="What gets published."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {EDITORIAL.map((e) => (
            <div key={e.title} className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
              <h3 className="mb-[10px] text-h3">{e.title}</h3>
              <p className="m-0 text-ink-60">{e.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        {/* NEEDS REAL DATA: three real articles. Generating plausible
            article titles would create a list of links that go nowhere and
            imply a body of writing that does not exist. */}
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <p className="text-eyebrow text-ink-40 uppercase">Articles</p>
          <h2 className="measure-base mt-4 text-h2">Nothing published yet.</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            The first pieces are being written by the engineers on the platforms they are about,
            which is slower than commissioning them and is the entire point. There is no archive
            here padded out with posts nobody read.
          </p>
          <p className="mt-4 max-w-measure text-ink-60">
            If there is something specific you want our read on, ask and you will get a direct
            answer rather than a link to an article.{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>
          </p>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
