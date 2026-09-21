import { Button } from "@/components/primitives/Button";
import { site } from "@/content/site";

export function Field({ id, label, type = "text", autoComplete }: {
  id: string; label: string; type?: string; autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink-60">{label}</label>
      <input id={id} name={id.replace(/^[a-z]+-/, "")} type={type} autoComplete={autoComplete}
        className="w-full rounded-inner border border-glass-light-edge bg-paper/72 px-[15px] py-[13px] text-[15px] text-ink" />
    </div>
  );
}

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
            {/* NEEDS REAL DATA: addresses */}
            <div className="text-[14.5px] leading-[1.9] text-ink-60">
              {site.offices.map((o) => (
                <div key={o.country}>
                  <strong className="font-semibold text-ink">{o.country}</strong> — {o.role.toLowerCase()}
                </div>
              ))}
              <a href={`mailto:${site.email}`} className="mt-3 inline-block font-semibold text-cobalt">{site.email}</a>
            </div>
          </div>
          <form className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="cb-name" label="Name" autoComplete="name" />
              <Field id="cb-email" label="Work email" type="email" autoComplete="email" />
            </div>
            <Field id="cb-company" label="Company" autoComplete="organization" />
            <div className="flex flex-col gap-[7px]">
              <label htmlFor="cb-brief" className="text-[13px] font-semibold text-ink-60">What are you building?</label>
              <textarea id="cb-brief" name="brief" rows={4}
                className="w-full resize-y rounded-inner border border-glass-light-edge bg-paper/72 px-[15px] py-[13px] text-[15px] text-ink" />
            </div>
            {/* TODO: no endpoint — static export has no runtime. */}
            <div><Button>Send it</Button></div>
          </form>
        </div>
      </div>
    </section>
  );
}
