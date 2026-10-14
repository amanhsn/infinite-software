import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/primitives/Section";
import { Plate } from "@/components/primitives/Plate";
import { Logo } from "@/components/primitives/Logo";
import { site } from "@/content/site";
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
                    <span className="glass-card mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-inner text-cobalt">
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

            <div className="glass-card rounded-card p-[clamp(1.5rem,3vw,2.5rem)]">
              <ContactForm full idPrefix="contact" />
            </div>
          </div>
        </div>

        {/* Same artwork band every other page carries under its header. This
            page has no PageHeader — the mesh block is the header — so the
            plate is placed by hand, on the same geometry. */}
        <Plate src="/img/contact/header" ratio="1000/300" radius="section" sizes="100vw" priority
               className="mt-[18px]" />
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
          {site.offices.map((o) => (
            <div key={o.country} className="rounded-card bg-paper p-8">
              <p className="text-eyebrow text-ink-40 uppercase">{o.role}</p>
              <h2 className="mt-3 text-h2">{o.country}</h2>
              <address className="mt-3 text-ink-60 not-italic">
                {o.address && <>{o.address}<br /></>}
                {o.locality}
              </address>
              <p className="mt-4 text-small text-ink-40">
                {o.country === "Canada"
                  ? "Contracting entity. Data residency is set per engagement and written into the contract."
                  : "Delivery team. Access model documented for third-party risk review."}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
