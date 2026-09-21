import { Fragment } from "react";
import { PageHeader, type Crumb } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import type { LegalDoc } from "@/content/legal";

/**
 * Renders a policy draft.
 *
 * `[[...]]` in the source marks a fact nobody has confirmed: a retention
 * period, a jurisdiction, a certification. It renders as a visible marker
 * rather than as prose, so the page cannot be mistaken for a finished
 * policy by a reader or by whoever is reviewing it.
 *
 * Grep for `[[` in content/legal.ts to find everything still outstanding.
 */
const TOKEN = /(\[\[[^\]]+\]\])/g;

function Unconfirmed({ children }: { children: string }) {
  return (
    <mark className="rounded-[4px] bg-warn/12 px-[6px] py-[2px] text-[0.86em] font-bold tracking-[0.06em] text-warn uppercase">
      {children.slice(2, -2)}
    </mark>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) =>
        part.startsWith("[[") && part.endsWith("]]")
          ? <Unconfirmed key={i}>{part}</Unconfirmed>
          : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export function LegalPage({ doc, trail }: { doc: LegalDoc; trail: Crumb[] }) {
  return (
    <>
      <PageHeader trail={trail} title={doc.title} lede={doc.lede} />

      <Section>
        <div className="rounded-card border border-warn/25 bg-warn/6 p-[clamp(1.25rem,2.6vw,1.75rem)]">
          <p className="text-eyebrow text-warn uppercase">Draft, not in force</p>
          <p className="mt-3 mb-0 max-w-measure text-[15px] text-ink-60">
            The structure of this document is complete and the facts in it are not. Every
            highlighted span is a value that has to be confirmed by counsel or by whoever owns the
            relevant system before this page can be treated as a policy.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-4 text-h3">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-0 mb-4 max-w-measure text-ink-60 last:mb-0">
                  <Prose text={p} />
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
