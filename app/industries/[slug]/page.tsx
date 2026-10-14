import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Arrow } from "@/components/primitives/Arrow";
import { industries, getIndustry } from "@/content/industries";
import { getLeaf } from "@/content/services";
import { menuIcons, leafIcons } from "@/components/nav-icons";
import { WorkCards, NoWorkYet } from "@/components/sections/WorkCards";
import { projectsForIndustry } from "@/content/clients";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return { title: ind.name, description: ind.summary, alternates: { canonical: `/industries/${slug}/` } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const relatedWork = projectsForIndustry(ind.slug);
  const Icon = menuIcons[`/industries/${ind.slug}/`];

  const related = ind.related
    .map((path) => {
      const [cat, leafSlug] = path.split("/");
      return getLeaf(cat, leafSlug);
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <PageHeader
        trail={[{ label: "Industries", href: "/industries/" }, { label: ind.name }]}
        title={ind.name}
        lede={ind.lede}
        aside={
          Icon ? (
            <div className="hidden justify-end lg:flex">
              <span className="grid size-[128px] place-items-center rounded-section bg-paper text-cobalt shadow-[0_18px_44px_-24px_rgb(10_16_36/0.2)]">
                <Icon size={52} strokeWidth={1.2} aria-hidden />
              </span>
            </div>
          ) : undefined
        }
        banner={`/img/industries/${ind.slug}`}
      />

      <Section>
        <SectionHead eyebrow="What makes it hard" title="Three things that decide the project."
                     measure="measure-base" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <div key={c.title} className="rounded-card border border-rule bg-paper p-7">
              <span className="font-figure text-[13px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 mb-2 text-h3">{c.title}</h3>
              <p className="text-small text-ink-60">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="What we bring" title="Services that apply here." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
          {related.map(({ category, leaf }) => {
            const LeafIcon = leafIcons[leaf.slug];
            return (
              <Link key={leaf.slug} href={`/services/${category.slug}/${leaf.slug}/`}
                    className="group flex gap-[14px] rounded-card bg-paper p-6 no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px]">
                <span className="mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {LeafIcon && <LeafIcon size={18} strokeWidth={1.6} aria-hidden />}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold tracking-[-0.02em] text-ink">{leaf.name}</span>
                  <span className="mt-1 block text-[13.5px] text-ink-60">{category.title}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Work" title={`What we have shipped in ${ind.name.toLowerCase()}.`}
                     measure="measure-base"
          action={<Link href="/work/" className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
            All work <Arrow className="size-[13px]" /></Link>} />
        {relatedWork.length > 0
          ? <WorkCards projects={relatedWork} columns={2} />
          : <NoWorkYet what={ind.name.toLowerCase()} />}
      </Section>

      <ContactBand />
    </>
  );
}
