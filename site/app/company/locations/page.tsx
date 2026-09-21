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
                {/* NEEDS REAL DATA: street address and phone. Rendered as a
                    visible placeholder rather than an invented address,
                    because an address is the one thing on a locations page
                    a reader is entitled to treat as literal. */}
                <p className="font-figure text-[13px] text-ink-40">
                  {office?.status === "placeholder" ? "Address to confirm" : office?.address}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Data residency" title="Where your data sits is a separate question."
                     measure="measure-base" />
        {/* status: claim-unverified in content/home.ts. Kept deliberately
            vague here rather than naming a region nobody has confirmed. */}
        <p className="max-w-measure text-lead text-ink-60">
          Delivery happening in two countries does not by itself say anything about where your data
          is held. Residency is set per engagement and written into the contract. If a regulator or
          a risk review needs that answer before a pitch, ask us for it directly and you will get
          the specific regions rather than a reassuring sentence.
        </p>
      </Section>

      <ContactBand />
    </>
  );
}
