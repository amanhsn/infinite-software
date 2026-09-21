import { Button } from "@/components/primitives/Button";
import { Logo } from "@/components/primitives/Logo";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ── hero — mesh surface 1 of 2 ── */}
      <div className="mx-auto max-w-shell px-gut pt-[18px]">
        <div className="rounded-section bg-mesh px-panel-x pt-hero-t pb-hero-b">
          <div className="grid grid-cols-1 items-end gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-[1.35fr_0.65fr]">
            <div>
              <Logo className="mb-[26px] h-[56px] animate-unfurl" />
              <p className="text-eyebrow text-cobalt uppercase">{site.tagline}</p>
              <h1 className="measure-base mt-[18px] mb-[22px] text-display">
                The team that scoped it is the team that ships it.
              </h1>
              <p className="max-w-measure text-lead text-ink-60">
                A Canadian software house building and running platforms for companies in
                payments, healthcare and logistics. The same squad, month one to month thirty.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3">
                <Button href="/contact/">Start a conversation</Button>
                <Button href="/how-we-work/" variant="ghost">See how we work</Button>
              </div>
            </div>

            {/* NEEDS REAL DATA: both figures */}
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <HeroStat value="30" caption="months on the longest running engagement" />
              <HeroStat value="6.2" caption="day median lead time to production" />
            </div>
          </div>
        </div>
      </div>

      {/* ── continuity — the one ink band, the only dark glass on the site ── */}
      <section className="mx-auto max-w-shell px-gut py-sec">
        <div className="grain relative overflow-hidden rounded-section bg-ink px-band-x py-band-y text-on-ink">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10
                       bg-[linear-gradient(180deg,rgb(43_92_246/0.16)_0%,rgb(10_16_36/0)_58%)]"
          />
          <p className="text-eyebrow text-on-ink-55 uppercase">What continuity looks like</p>
          <h2 className="measure-wide mt-[14px] mb-4 text-h2">
            A services firm sells one thing that is hard to photograph.
          </h2>
          <p className="mb-sec-gap max-w-measure text-on-ink-70">
            Every competitor on your shortlist will tell you how many engineers they have.{" "}
            <strong className="font-semibold text-on-ink">
              Here is the number that actually predicts how your project goes.
            </strong>
          </p>
          {/* NEEDS REAL DATA: all four figures */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <GlassStat value="30" caption="months, longest running engagement" />
            <GlassStat value="6.2" caption="day median lead time" />
            <GlassStat value="4" caption="days between production releases" />
            <GlassStat value="92%" caption="engineer continuity over 12 months" />
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="flex-1 rounded-card border border-glass-light-edge bg-glass-light px-6 py-[22px] backdrop-blur-[12px]">
      <span className="block font-figure text-[clamp(30px,4vw,38px)] leading-none font-medium tracking-[-0.03em]">
        {value}
      </span>
      <span className="mt-2 block text-[14px] text-ink-60">{caption}</span>
    </div>
  );
}

function GlassStat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="rounded-card border border-glass-edge bg-glass-fill px-[26px] py-6 backdrop-blur-[12px]">
      <span className="block font-figure text-figure text-on-ink">{value}</span>
      <span className="mt-[10px] block text-small text-on-ink-55">{caption}</span>
    </div>
  );
}
