import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Plate } from "@/components/primitives/Plate";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";

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
        <SectionHead eyebrow="Selected work" title="Three write-ups, in clearance."
                     body="The artwork is final and the write-ups are not. Each card fills in once the client has approved the metrics and the attribution."
                     measure="measure-base" />
        {/* NEEDS REAL DATA: three real projects, their metrics and client
            sign-off. Cards render the finished plates with the copy left
            explicitly unwritten, rather than inventing a project. */}
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col gap-3">
              <Plate src={`/img/work/plate-0${n}`} sizes="(min-width: 900px) 33vw, 100vw" />
              <p className="text-eyebrow text-ink-40 uppercase">Awaiting clearance</p>
              <p className="m-0 text-[15px] text-ink-60">
                Sector, the problem, and the one number that changed, once the client has signed
                off on publishing it.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-measure text-ink-60">
          If you need references before then, ask. We will put you in touch with a client directly,
          which is a stronger signal than a page we wrote about ourselves.{" "}
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
