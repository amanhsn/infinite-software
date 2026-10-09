import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/content/site";

/**
 * The band at the foot of most pages. The form inside it is the shared
 * one, so there is a single implementation and a single endpoint rather
 * than three copies of the markup that went nowhere.
 */
export function ContactBand() {
  return (
    <section className="mx-auto max-w-shell px-gut py-sec">
      <div className="rounded-section bg-mesh px-panel-x py-band-y">
        <div className="grid grid-cols-1 gap-[clamp(1.875rem,5vw,4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-eyebrow text-cobalt uppercase">Start a conversation</p>
            <h2 className="measure-tight mt-4 mb-5 text-h2">Tell us what you are trying to ship.</h2>
            <p className="mb-7 max-w-measure text-ink-60">
              You will get a reply from an engineer, not a form handler. If we are not the right firm
              for it, we will say so and tell you who is.
            </p>
            <div className="text-[14.5px] leading-[1.9] text-ink-60">
              {site.offices.map((o) => (
                <div key={o.country}>
                  <strong className="font-semibold text-ink">{o.role}</strong> —{" "}
                  {o.address ? `${o.address}, ${o.locality}` : o.locality}
                </div>
              ))}
              <a href={`mailto:${site.email}`} className="mt-3 inline-block font-semibold text-cobalt">{site.email}</a>
            </div>
          </div>
          <ContactForm idPrefix="band" />
        </div>
      </div>
    </section>
  );
}
