import Link from "next/link";
import { PageHeader, type Crumb } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";

/**
 * An honest interim page. Linked from the nav on every route, so a 404 here
 * would be a dead end of our own making — but it does not pretend to have
 * content it does not have.
 */
export function ComingSoon({
  trail, title, lede, elsewhere,
}: {
  trail: Crumb[]; title: string; lede: string;
  elsewhere?: { label: string; href: string }[];
}) {
  return (
    <>
      <PageHeader trail={trail} title={title} lede={lede} />
      <Section>
        <div className="rounded-card border border-rule bg-paper p-[clamp(1.75rem,4vw,3rem)]">
          <p className="text-eyebrow text-ink-40 uppercase">In progress</p>
          <h2 className="measure-base mt-4 text-h2">This page is being written.</h2>
          <p className="mt-4 max-w-measure text-ink-60">
            We would rather leave it visibly unfinished than fill it with copy that says nothing.
            If this is what you came for, ask us directly and you will get the real answer faster.
          </p>
          {elsewhere && elsewhere.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-small font-semibold text-ink">In the meantime</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {elsewhere.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}
                          className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
                      {l.label} <Arrow className="size-[13px]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>
      <ContactBand />
    </>
  );
}
