import Link from "next/link";
import { Arrow } from "@/components/primitives/Arrow";
import { clients } from "@/content/clients";

/**
 * The named-client strip. Replaces the ten invented companies that stood
 * here while nothing was cleared.
 *
 * One client, so this is not a logo grid. A five-across grid holding a
 * single mark reads as four clients who left; a single row that gives the
 * mark room, says what the work is and links out reads as deliberate. The
 * grid comes back when there is a second name to put in it.
 *
 * `<img>` rather than next/image for the reason given in Plate: the
 * optimiser is off for static export, so the component boundary buys
 * nothing. Dimensions are set so the row reserves its height before the
 * logo loads.
 */
export function ClientStrip() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-[18px] p-0">
      {clients.map((c) => (
        <li key={c.name}>
          <div className="flex flex-col gap-6 rounded-card border border-rule bg-paper p-[clamp(1.375rem,3vw,2rem)]
                          sm:flex-row sm:items-center sm:gap-[clamp(1.5rem,4vw,3rem)]">
            <a href={c.href} target="_blank" rel="noreferrer"
               className="shrink-0 no-underline transition-opacity duration-300 ease-brand hover:opacity-70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={c.name} width={c.logoWidth} height={c.logoHeight}
                   className="block h-[34px] w-auto" />
            </a>

            <div className="sm:border-l sm:border-rule sm:pl-[clamp(1.5rem,4vw,3rem)]">
              <p className="m-0 text-[16px] font-semibold tracking-[-0.022em] text-ink">{c.sector}</p>
              <p className="mt-1 mb-0 text-small text-ink-40">{c.note}</p>
            </div>

            <Link href="/work/"
                  className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline sm:ml-auto">
              Read the case study <Arrow className="size-[13px]" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
