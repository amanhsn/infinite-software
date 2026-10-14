import { PageHeader, type Crumb } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import type { LegalDoc } from "@/content/legal";

/**
 * Renders a policy.
 *
 * Every value in content/legal.ts is stated. There is no marker syntax and
 * no draft warning any more: if a fact in one of these documents changes,
 * the fix is to change the sentence, not to highlight it.
 *
 * `banner` is the artwork band, passed per policy so the four pages do not
 * share one plate — unrelated to the draft warning above.
 */
export function LegalPage({ doc, trail, banner }: { doc: LegalDoc; trail: Crumb[]; banner?: string }) {
  return (
    <>
      <PageHeader trail={trail} title={doc.title} lede={doc.lede} banner={banner} />

      <Section>
        <div className="flex flex-col gap-10">
          <p className="font-figure m-0 text-[13px] tracking-[0.04em] text-ink-40">
            Last updated {doc.updated}
          </p>

          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-4 text-h3">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-0 mb-4 max-w-measure text-ink-60 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
