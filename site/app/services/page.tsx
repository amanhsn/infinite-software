import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { serviceCategories } from "@/content/services";
import { differentiators } from "@/content/home";
import { categoryIcons, leafIcons } from "@/components/nav-icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four practices, one delivery model: product engineering, AI engineering, data and cloud, teams and delivery.",
  alternates: { canonical: "/services/" },
};

export default function ServicesIndex() {
  const total = serviceCategories.reduce((n, c) => n + c.leaves.length, 0);
  return (
    <>
      <PageHeader
        surface="mesh"
        eyebrow="Services"
        title="Four practices, one delivery model."
        lede={`Whichever practice an engagement starts in, it is staffed from the same bench, run on the same two-week cadence, and reports the same numbers. ${total} services below — but the thing being bought is always continuity.`}
      />

      <Section>
        {serviceCategories.map((cat) => {
          const Icon = categoryIcons[cat.slug];
          return (
            <div key={cat.slug}
                 className="grid grid-cols-1 gap-[clamp(1.5rem,4vw,4rem)] border-t border-rule py-[clamp(2rem,4.5vw,3.5rem)] first:border-t-0 first:pt-0 last:border-b md:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col items-start gap-[14px] self-start md:sticky md:top-nav-h">
                <span className="grid size-[44px] place-items-center rounded-inner bg-mist text-cobalt">
                  {Icon && <Icon size={21} strokeWidth={1.6} aria-hidden />}
                </span>
                <h2 className="text-h2">{cat.title}</h2>
                <p className="max-w-measure text-ink-60">{cat.lede}</p>
                <Link href={`/services/${cat.slug}/`}
                      className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
                  Category overview <Arrow className="size-[13px]" />
                </Link>
              </div>
              <ul className="m-0 list-none p-0">
                {cat.leaves.map((leaf) => {
                  const LeafIcon = leafIcons[leaf.slug];
                  return (
                    <li key={leaf.slug} className="border-t border-rule-soft first:border-t-0">
                      <Link href={`/services/${cat.slug}/${leaf.slug}/`}
                            className="group flex gap-[14px] py-[14px] no-underline">
                        {LeafIcon && (
                          <LeafIcon size={17} strokeWidth={1.6} aria-hidden
                                    className="mt-[3px] shrink-0 text-ink-25 transition-colors duration-200 ease-brand group-hover:text-cobalt" />
                        )}
                        <span>
                          <span className="block text-[16.5px] font-semibold tracking-[-0.018em] text-ink transition-colors duration-200 ease-brand group-hover:text-cobalt">
                            {leaf.name}
                          </span>
                          <span className="mt-1 block text-[14px] text-ink-60">{leaf.summary}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="The difference" title="Five things most firms will not put in writing."
                     measure="measure-tight" />
        {differentiators.map((d) => (
          <div key={d.title}
               className="grid grid-cols-1 items-baseline gap-2 border-t border-rule py-6 last:border-b md:grid-cols-[1fr_1.25fr] md:gap-[clamp(1.125rem,3vw,3rem)]">
            <h3 className="text-h3">{d.title}</h3>
            <p className="max-w-measure text-ink-60">{d.body}</p>
          </div>
        ))}
      </Section>

      <ContactBand />
    </>
  );
}
