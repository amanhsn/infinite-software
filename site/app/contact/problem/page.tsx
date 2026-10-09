import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";

/**
 * Where the endpoint sends a form posted without JavaScript that it could
 * not accept — a failed validation, or a store it could not write to.
 *
 * With JavaScript the form says so in place and nobody lands here. This
 * page exists so the no-JS path cannot end at a form with no explanation,
 * which is the usual way a failed submission disappears quietly.
 */
export const metadata: Metadata = {
  title: "That did not send",
  description: "Your message did not reach us. Email us instead and it will.",
  alternates: { canonical: "/contact/problem/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <PageHeader
        trail={[{ label: "Contact", href: "/contact/" }, { label: "That did not send" }]}
        title="That did not send."
        lede="Your message did not reach us, so nobody is reading it. That is worth saying plainly rather than showing you a confirmation that is not true."
      />

      <Section>
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <h2 className="measure-base text-h3">Two ways on from here</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            Email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>{" "}
            and it reaches exactly the same people, with none of this in the way. That is the
            reliable option and we would rather you took it.
          </p>
          <p className="mt-4 max-w-measure text-ink-60">
            Or go back to the form and try again. If a field was missing or an address was mistyped,
            it will say which one this time.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/contact/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              Back to the form <Arrow className="size-[13px]" />
            </Link>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
              {site.email} <Arrow className="size-[13px]" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
