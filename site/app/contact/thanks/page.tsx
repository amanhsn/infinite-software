import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";

/**
 * Where the endpoint sends a form posted without JavaScript. With
 * JavaScript the form reports success in place and nobody lands here, so
 * this page exists for the path most sites quietly drop.
 */
export const metadata: Metadata = {
  title: "Message received",
  description: "Your message reached us. You will get a reply from an engineer within one business day.",
  alternates: { canonical: "/contact/thanks/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Contact", href: "/contact/" }, { label: "Message received" }]}
        title="That reached us."
        lede="You will get a reply from an engineer within one business day. Not an autoresponder, and not a sales development rep reading a script."
      />

      <Section>
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <h2 className="measure-base text-h3">What happens next</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            Someone who would actually work on this reads it and replies with a real answer: what we
            think it would take, what we would want to know first, or that we are not the right firm
            and who is.
          </p>
          <p className="mt-4 max-w-measure text-ink-60">
            If it is urgent before then,{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>{" "}
            goes to the same people.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/work/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              Read the case study <Arrow className="size-[13px]" />
            </Link>
            <Link href="/how-we-work/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              How an engagement runs <Arrow className="size-[13px]" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
