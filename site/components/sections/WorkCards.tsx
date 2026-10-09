import Link from "next/link";
import { Plate } from "@/components/primitives/Plate";
import { Arrow } from "@/components/primitives/Arrow";
import { site } from "@/content/site";
import type { Project } from "@/content/clients";

/**
 * The work cards, and the line that goes where there are none.
 *
 * Service and industry pages used to render two cards reading "Project
 * name — one line on the sector and the outcome". Those are gone: a page
 * now shows the projects actually tagged to it, and a sector we have not
 * worked in says so in one sentence and offers the nearest real thing.
 * Repeating the same three cards under every sector would make the tagging
 * meaningless and the claim false.
 */
export function WorkCards({
  projects, columns = 3,
}: {
  projects: readonly Project[];
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-1 gap-[18px] ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {projects.map((p) => (
        <Link key={p.slug} href="/work/" className="group flex flex-col gap-3 no-underline">
          <Plate src={p.image} alt={p.imageAlt}
                 sizes={columns === 2 ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 33vw, 100vw"}
                 className="transition-transform duration-300 ease-brand group-hover:scale-[1.02]" />
          <h3 className="text-h3">{p.name}</h3>
          <p className="m-0 text-[15px] text-ink-60">
            <span className="text-ink-40">{p.sector}.</span> {p.outcome}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function NoWorkYet({ what }: { what: string }) {
  return (
    <div className="rounded-card border border-rule bg-paper p-[clamp(1.375rem,2.6vw,1.875rem)]">
      <p className="m-0 max-w-measure text-ink-60">
        Nothing written up in {what} yet. We publish a project only once the client has cleared the
        numbers, so this stays empty rather than borrowing a case study from somewhere else. Ask for
        the closest engagement we are cleared to talk about and you will get it directly —{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-cobalt">{site.email}</a>
      </p>
      <Link href="/work/"
            className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
        See the work that is published <Arrow className="size-[13px]" />
      </Link>
    </div>
  );
}
