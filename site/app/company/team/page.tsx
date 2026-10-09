import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: "The engineers you would actually work with, named before you sign.",
  alternates: { canonical: "/company/team/" },
};

const COMMITMENTS = [
  {
    title: "Named on the proposal",
    body: "The people who will do the work are listed by name and level before you sign, not described as a pool of resources with a seniority mix.",
  },
  {
    title: "You meet them first",
    body: "You talk to the squad during scoping. If the fit is wrong, that is much cheaper to find out in week zero than in month four.",
  },
  {
    title: "They do not get swapped",
    body: "Substitutions happen for the reasons people actually leave jobs, and you are told before it happens rather than after. Continuity is the thing being sold, so quietly rotating people would be selling the wrong product.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Company", href: "/company/" }, { label: "Team" }]}
        title="You will know who is doing the work."
        lede="Continuity only means something if the people are specific. This page is where they get named."
      />

      <Section>
        <SectionHead eyebrow="The commitment" title="What naming the team actually obliges us to."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
              <h3 className="mb-[10px] text-h3">{c.title}</h3>
              <p className="m-0 text-ink-60">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        {/* Profiles are off for now, by the company's decision — publishing
            a name and a face needs that person's consent. Inventing people
            on the one page whose purpose is that they are real would undo
            the claim the rest of the site makes. */}
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <p className="text-eyebrow text-ink-40 uppercase">Profiles</p>
          <h2 className="measure-base mt-4 text-h2">The profiles are not up yet.</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            Publishing a name and a face needs that person&rsquo;s consent, so this list goes up once
            everyone on it has agreed to be on it. We would rather this page be empty for another
            month than fill it with stock portraits and invented titles, which is the failure mode
            this page exists to avoid.
          </p>
          <p className="mt-4 max-w-measure text-ink-60">
            If you are evaluating us now, ask for the squad you would get. You will be sent real
            names and the platforms they have been on.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/contact/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              Ask for the squad <Arrow className="size-[13px]" />
            </Link>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              {site.email} <Arrow className="size-[13px]" />
            </a>
          </div>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
