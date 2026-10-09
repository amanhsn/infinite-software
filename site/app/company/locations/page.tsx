import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { locationDetail } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Locations",
  description: "A Canadian head office and a delivery office in Pakistan, working as one squad.",
  alternates: { canonical: "/company/locations/" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Company", href: "/company/" }, { label: "Locations" }]}
        title="Two offices, one squad."
        lede="Canadian clients contract with the Canadian entity. Engineering sits across both offices and runs on a shared timezone window, one backlog and one review process."
      />

      <Section>
        <SectionHead eyebrow="Offices" title="Where the work happens." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {locationDetail.map((loc) => {
            const office = site.offices.find((o) => o.country === loc.country);
            return (
              <div key={loc.country}
                   className="rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)]">
                <p className="text-eyebrow text-cobalt uppercase">{loc.role}</p>
                <h3 className="mt-3 mb-4 text-h2">{loc.country}</h3>
                <p className="mb-6 max-w-measure text-ink-60">{loc.body}</p>
                {/* No telephone number anywhere on the site: a 1-800 line has
                    been requested and does not exist yet. */}
                <address className="font-figure text-[13px] text-ink-40 not-italic">
                  {office?.address && <>{office.address}<br /></>}
                  {office?.locality}
                </address>
              </div>
            );
          })}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Data residency" title="Your data sits in the country you choose."
                     measure="measure-base" />
        <p className="max-w-measure text-lead text-ink-60">
          Delivery happening in two countries does not by itself say anything about where your data
          is held. We build and run infrastructure in the jurisdiction the engagement requires, and
          the regions go into the contract rather than onto this page — which is the document your
          risk team can actually hold us to. If that answer is needed before a pitch, ask and you
          will get the specific regions for the architecture being proposed.
        </p>
      </Section>

      <ContactBand />
    </>
  );
}
