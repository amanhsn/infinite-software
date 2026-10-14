import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { Plate } from "@/components/primitives/Plate";
import { principles } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Company",
  description: "A Canadian software house organised around keeping the same people on the same platform.",
  alternates: { canonical: "/company/" },
};

const ELSEWHERE = [
  { href: "/company/team/", title: "Team", body: "The engineers you would actually work with, named." },
  { href: "/company/locations/", title: "Locations", body: "Where the two offices are and what each one does." },
  { href: "/company/careers/", title: "Careers", body: "How hiring runs here, and what the work is actually like." },
];

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Company" }]}
        title="A firm built around people not leaving."
        lede={site.description}
        banner="/img/company/overview"
      />

      <Section>
        <div className="grid grid-cols-1 items-start gap-[clamp(1.75rem,4.5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead eyebrow="What we optimise for" title="Four things the whole firm is arranged around."
                         measure="measure-base" />
            <div className="grid grid-cols-1 border-t border-rule">
              {principles.map((p) => (
                <div key={p.title} className="border-b border-rule py-6">
                  <h3 className="mb-[10px] text-h3">{p.title}</h3>
                  <p className="max-w-measure text-ink-60">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <Plate src="/img/brand/business-card" ratio="3/2" sizes="(min-width: 1080px) 40vw, 100vw" />
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Company" title="The rest of it." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {ELSEWHERE.map((c) => (
            <Link key={c.href} href={c.href}
                  className="group rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)] no-underline transition-transform duration-300 ease-brand hover:scale-[1.02]">
              <h3 className="mb-[10px] flex items-center gap-2 text-h3 text-ink">
                {c.title} <Arrow className="size-[13px] text-cobalt" />
              </h3>
              <p className="m-0 text-ink-60">{c.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
