import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Button } from "@/components/primitives/Button";
import { serviceCategories, getLeaf } from "@/content/services";
import { steps } from "@/content/home";
import { leafIcons } from "@/components/nav-icons";
import { Arrow } from "@/components/primitives/Arrow";
import { serviceCopy, type LeafSlug } from "@/content/service-copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.flatMap((c) =>
    c.leaves.map((l) => ({ category: c.slug, slug: l.slug })),
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> },
): Promise<Metadata> {
  const { category, slug } = await params;
  const hit = getLeaf(category, slug);
  if (!hit) return {};
  return {
    title: `${hit.leaf.name} — ${hit.category.title}`,
    description: hit.leaf.summary,
    alternates: { canonical: `/services/${category}/${slug}/` },
  };
}

export default async function LeafPage(
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  const { category, slug } = await params;
  const hit = getLeaf(category, slug);
  if (!hit) notFound();
  const { category: cat, leaf } = hit;
  const copy = serviceCopy[leaf.slug as LeafSlug];
  const siblings = cat.leaves.filter((l) => l.slug !== leaf.slug);
  const Icon = leafIcons[leaf.slug];

  return (
    <>
      <PageHeader
        trail={[
          { label: "Services", href: "/services/" },
          { label: cat.title, href: `/services/${cat.slug}/` },
          { label: leaf.name },
        ]}
        title={leaf.name}
        lede={leaf.summary}
        banner={`/img/services/${cat.slug}/${leaf.slug}`}
        aside={
          Icon ? (
            <div className="hidden justify-end lg:flex">
              <span className="grid size-[128px] place-items-center rounded-section bg-paper text-cobalt shadow-[0_18px_44px_-24px_rgb(10_16_36/0.2)]">
                <Icon size={52} strokeWidth={1.2} aria-hidden />
              </span>
            </div>
          ) : undefined
        }
      />

      <Section>
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-2">
          <div>
            <p className="text-eyebrow text-cobalt uppercase">The problem</p>
            <h2 className="measure-base mt-[14px] mb-[18px] text-h2">What usually brings people here.</h2>
            <p className="max-w-measure text-ink-60">{copy.problem}</p>
          </div>
          <div>
            <p className="text-eyebrow text-cobalt uppercase">What we do</p>
            <h2 className="measure-base mt-[14px] mb-[18px] text-h2">How the work actually runs.</h2>
            <p className="max-w-measure text-ink-60">{copy.method}</p>
          </div>
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="How this runs" title="Design, develop, refine." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-card bg-paper p-7">
              <span className="font-figure text-[13px] text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 mb-2 text-h3">{s.title}</h3>
              <p className="text-small text-ink-60">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Figures are published per engagement and cleared by that client, so
          there is no per-service metric row. Three tiles reading "—" stood
          here; this points at the write-ups that do exist instead. */}
      <Section>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-paper p-[clamp(1.5rem,3vw,2.25rem)]">
          <div>
            <h2 className="mb-2 text-h3">Proof lives on the work page.</h2>
            <p className="m-0 max-w-measure text-ink-60">
              We publish numbers per engagement, cleared by that client, rather than per service
              line. What is written up there is what we are allowed to show.
            </p>
          </div>
          <Link href="/work/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-cobalt no-underline">
            See the work <Arrow className="size-[13px]" />
          </Link>
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow={`Also in ${cat.title}`} title="Related services." measure="measure-tight"
          action={<Button href={`/services/${cat.slug}/`} variant="ghost">All of {cat.title}</Button>} />
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((s) => {
            const SibIcon = leafIcons[s.slug];
            return (
              <Link key={s.slug} href={`/services/${cat.slug}/${s.slug}/`}
                    className="group flex gap-[14px] rounded-card bg-paper p-6 no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px]">
                <span className="mt-[2px] grid size-[36px] shrink-0 place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {SibIcon && <SibIcon size={17} strokeWidth={1.6} aria-hidden />}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold tracking-[-0.02em] text-ink">{s.name}</span>
                  <span className="mt-1 block text-[13.5px] text-ink-60">{s.summary}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
