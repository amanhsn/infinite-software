import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { industries } from "@/content/industries";
import { menuIcons } from "@/components/nav-icons";

export const metadata: Metadata = {
  title: "Industries",
  description: "Financial services, healthcare, retail, logistics, SaaS and energy — where we have done this before.",
  alternates: { canonical: "/industries/" },
};

export default function IndustriesIndex() {
  return (
    <>
      <PageHeader
        surface="mesh"
        eyebrow="Industries"
        title="Where we have done this before."
        lede="Six sectors. Financial services comes first because it sets the bar — if the audit trail and the third-party risk review hold up there, they hold up anywhere."
      />
      <Section>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {industries.map((ind) => {
            const Icon = menuIcons[`/industries/${ind.slug}/`];
            return (
              <Link key={ind.slug} href={`/industries/${ind.slug}/`}
                    className="group flex flex-col rounded-card border border-rule bg-paper p-[30px] no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px] hover:border-ink-25">
                <span className="mb-5 grid size-[44px] place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {Icon && <Icon size={21} strokeWidth={1.6} aria-hidden />}
                </span>
                <h2 className="text-h3">{ind.name}</h2>
                <p className="mt-2 max-w-measure text-[15px] text-ink-60">{ind.lede}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[14.5px] font-semibold text-cobalt">
                  What we build here <Arrow className="size-[13px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
      <ContactBand />
    </>
  );
}
