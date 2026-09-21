import type { Metadata } from "next";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/sections/ContactBand";
import { Section } from "@/components/primitives/Section";
import { Logo } from "@/components/primitives/Logo";
import { site } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { Clock, MessageSquareReply, FileSearch, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a conversation",
  description: "Tell us what you are trying to ship. You will get a reply from an engineer, not a form handler.",
  alternates: { canonical: "/contact/" },
};

const PROMISES = [
  { icon: Clock, title: "One business day", body: "That is the reply time, not the target. If we are going to miss it you will hear that instead." },
  { icon: MessageSquareReply, title: "An engineer replies", body: "Not a form handler and not a sales development rep reading a script." },
  { icon: FileSearch, title: "An honest read", body: "If we are not the right firm for this, we will say so and tell you who is." },
  { icon: Users, title: "You meet the squad", body: "Before anything is signed, you meet the people who would actually do the work." },
];

export default function Contact() {
  return (
    <>
      {/* ── the form is the page: mesh, and the only one on it ── */}
      <div className="mx-auto max-w-shell px-gut pt-[18px]">
        {/* pb-safe-b keeps copy in the top ~65% of the mesh: below that the ramp
            darkens to #B6C6F2 and ink-60 body text drops under 4.5:1 */}
        <div className="rounded-section bg-mesh px-panel-x pt-hero-t pb-safe-b">
          <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Logo className="mb-[26px] h-[44px]" />
              <p className="text-eyebrow text-cobalt uppercase">Start a conversation</p>
              <h1 className="measure-tight mt-[18px] mb-5 text-display">
                Tell us what you are trying to ship.
              </h1>
              <p className="max-w-measure text-lead text-ink-60">
                The more concrete you are, the more useful the first reply will be. A rough scope and a
                real constraint beats a polished brief.
              </p>

              <dl className="mt-9 grid gap-5">
                {PROMISES.slice(0, 2).map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-[14px]">
                    <span className="mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-inner bg-paper/72 text-cobalt backdrop-blur-[12px]">
                      <Icon size={18} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span>
                      <dt className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{title}</dt>
                      <dd className="mt-1 m-0 max-w-[40ch] text-small text-ink-60">{body}</dd>
                    </span>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-card border border-glass-light-edge bg-paper/72 p-[clamp(1.5rem,3vw,2.5rem)] backdrop-blur-[12px]">
              <form className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="c-name" label="Name" autoComplete="name" />
                  <Field id="c-email" label="Work email" type="email" autoComplete="email" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="c-company" label="Company" autoComplete="organization" />
                  <Field id="c-role" label="Your role" autoComplete="organization-title" />
                </div>

                <fieldset className="m-0 border-0 p-0">
                  <legend className="mb-[10px] p-0 text-[13px] font-semibold text-ink-60">
                    What is this about?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {serviceCategories.map((c, i) => (
                      <span key={c.slug} className="relative">
                        <input type="checkbox" id={`c-${c.slug}`} name="interest" value={c.slug}
                               defaultChecked={i === 0} className="peer absolute size-0 opacity-0" />
                        <label htmlFor={`c-${c.slug}`}
                               className="inline-flex cursor-pointer items-center rounded-pill border border-glass-light-edge bg-paper/60 px-4 py-[9px] text-[14px] text-ink-60
                                          transition-colors duration-200 ease-brand peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-paper
                                          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt">
                          {c.title}
                        </label>
                      </span>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="c-brief" className="text-[13px] font-semibold text-ink-60">
                    What are you building?
                  </label>
                  <textarea id="c-brief" name="brief" rows={5}
                    placeholder="A payments platform we cannot deploy during business hours…"
                    className="w-full resize-y rounded-inner border border-glass-light-edge bg-paper/72 px-[15px] py-[13px] text-[15px] text-ink placeholder:text-ink-25" />
                </div>

                {/* TODO: no endpoint yet. Static export has no runtime — this needs
                    NEXT_PUBLIC_FORM_ENDPOINT wiring before launch. */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button>Send it</Button>
                  <span className="text-[13px] text-ink-40">
                    Or email <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-card border border-rule bg-paper p-7">
              <span className="mb-5 grid size-[40px] place-items-center rounded-inner bg-mist text-cobalt">
                <Icon size={19} strokeWidth={1.6} aria-hidden />
              </span>
              <h2 className="text-h3">{title}</h2>
              <p className="mt-2 text-small text-ink-60">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {/* NEEDS REAL DATA: street addresses, phone numbers */}
          {site.offices.map((o) => (
            <div key={o.country} className="rounded-card bg-paper p-8">
              <p className="text-eyebrow text-ink-40 uppercase">{o.role}</p>
              <h2 className="mt-3 text-h2">{o.country}</h2>
              <p className="mt-3 text-ink-60">{o.address}</p>
              <p className="mt-4 text-small text-ink-40">
                {o.country === "Canada"
                  ? "Client data is held in Canadian regions. Named regions confirmed on request."
                  : "Delivery team. Access model documented for third-party risk review."}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
