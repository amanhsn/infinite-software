import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { hiringStages, workingHere } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "How hiring runs here, and what the work is actually like once you are in.",
  alternates: { canonical: "/company/careers/" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Company", href: "/company/" }, { label: "Careers" }]}
        title="Join a squad, not a bench."
        lede="We hire people to stay on one platform for years rather than to be moved between accounts each quarter. That shapes who this suits and who it does not."
      />

      <Section>
        <SectionHead eyebrow="What it is like" title="Three things worth knowing first."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {workingHere.map((w) => (
            <div key={w.title} className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
              <h3 className="mb-[10px] text-h3">{w.title}</h3>
              <p className="m-0 text-ink-60">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Process" title="Four steps, and no take-home that eats your weekend."
                     measure="measure-base" />
        <ol className="m-0 grid list-none grid-cols-1 border-t border-rule p-0">
          {hiringStages.map((stage, i) => (
            <li key={stage.title}
                className="flex flex-col gap-2 border-b border-rule py-6 sm:flex-row sm:gap-8">
              <span className="font-figure shrink-0 text-[13px] font-medium tracking-[0.1em] text-cobalt sm:w-[64px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-[8px] text-h3">{stage.title}</h3>
                <p className="m-0 max-w-measure text-ink-60">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        {/* NEEDS REAL DATA: open roles. Listing invented vacancies would have
            people apply for jobs that do not exist, so the page routes them
            to a real address instead. */}
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <p className="text-eyebrow text-ink-40 uppercase">Open roles</p>
          <h2 className="measure-base mt-4 text-h2">There is no vacancy list on this page yet.</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            When we are hiring for a named role it will be posted here with the level, the squad and
            the platform written into it. In the meantime, if the way we work sounds like how you
            would want to work, write to{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>{" "}
            and tell us what you have kept running.
          </p>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
