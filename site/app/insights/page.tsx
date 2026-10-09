import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Plate } from "@/components/primitives/Plate";
import { Arrow } from "@/components/primitives/Arrow";
import { articles, formatPublished } from "@/content/insights";

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
        <SectionHead eyebrow="Articles" title="Three pieces, from one platform."
                     body="All three come out of the same engagement, which is why they are specific. More follow as the work produces something worth writing down."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}/`}
                  className="group flex flex-col gap-3 no-underline">
              <Plate src={a.image} alt={a.imageAlt} ratio="16/9"
                     sizes="(min-width: 900px) 33vw, 100vw"
                     className="transition-transform duration-300 ease-brand group-hover:scale-[1.02]" />
              <span className="font-figure mt-1 flex gap-4 text-[13px] text-ink-40">
                <span>{formatPublished(a.published)}</span>
                <span>{a.readingTime}</span>
              </span>
              <h3 className="text-h3">{a.title}</h3>
              <p className="m-0 text-[15px] text-ink-60">{a.summary}</p>
              <span className="mt-1 flex items-center gap-2 text-[14.5px] font-semibold text-cobalt">
                Read it <Arrow className="size-[13px]" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
