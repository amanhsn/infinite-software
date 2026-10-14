import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Plate } from "@/components/primitives/Plate";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";
import { caseStudy, projects } from "@/content/clients";

export const metadata: Metadata = {
  title: "Work",
  description: "Platforms still running, with the numbers published rather than described.",
  alternates: { canonical: "/work/" },
};

const STANDARD = [
  {
    title: "Nothing behind a form",
    body: "Case studies are readable without an email address. Gating a case study tells you the case study is marketing.",
  },
  {
    title: "Numbers, cleared by the client",
    body: "Every figure on a case study page is one the client has seen and agreed to publish. That is slower than writing them ourselves and it is the only way they mean anything.",
  },
  {
    title: "Still in production",
    body: "We write up platforms that are still running, not projects that shipped once and were quietly replaced.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Work" }]}
        title="Platforms still running."
        lede="The work worth showing is the work that survived contact with production for a few years. That is the only kind that gets written up here."
        banner="/img/work/header"
      />

      <Section>
        <SectionHead eyebrow="Our standard" title="What has to be true before something appears here."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {STANDARD.map((s) => (
            <div key={s.title} className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
              <h3 className="mb-[10px] text-h3">{s.title}</h3>
              <p className="m-0 text-ink-60">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Case study" title={caseStudy.title}
                     body={caseStudy.body} measure="measure-base"
          action={<a href={caseStudy.href} target="_blank" rel="noreferrer"
                     className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
            {caseStudy.client} <Arrow className="size-[13px]" /></a>} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {caseStudy.figures.map((f) => (
            <div key={f.caption} className="rounded-card border border-rule bg-paper p-6">
              <span className="block font-figure text-[clamp(26px,3.4vw,36px)] leading-none font-medium tracking-[-0.03em]">{f.value}</span>
              <span className="mt-2 block text-[13.5px] text-ink-60">{f.caption}</span>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col gap-[clamp(1.5rem,3vw,2.25rem)]">
          {projects.map((p) => (
            <article key={p.slug}
                     className="grid grid-cols-1 gap-[clamp(1.25rem,3vw,2.25rem)] rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)] md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <Plate src={p.image} alt={p.imageAlt} sizes="(min-width: 900px) 40vw, 100vw" />
              <div>
                <p className="text-eyebrow text-ink-40 uppercase">{p.sector}</p>
                <h3 className="mt-3 mb-3 text-h2">{p.name}</h3>
                <p className="m-0 max-w-measure font-semibold text-ink">{p.outcome}</p>
                <p className="mt-3 mb-0 max-w-measure text-ink-60">{p.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-measure text-ink-60">
          If you want a reference rather than a write-up, ask. We will put you in touch with a client
          directly, which is a stronger signal than a page we wrote about ourselves.{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>
        </p>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)]">
          <div>
            <h2 className="mb-2 text-h3">Want the version with the numbers in it?</h2>
            <p className="m-0 max-w-measure text-ink-60">
              Tell us the sector and we will send the closest engagement we are cleared to talk about.
            </p>
          </div>
          <Link href="/contact/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
            Start a conversation <Arrow className="size-[13px]" />
          </Link>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
