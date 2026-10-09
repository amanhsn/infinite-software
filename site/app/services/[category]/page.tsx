import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHead } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Button } from "@/components/primitives/Button";
import { Arrow } from "@/components/primitives/Arrow";
import { serviceCategories, getCategory } from "@/content/services";
import { steps, engagementModels } from "@/content/home";
import { categoryIcons, leafIcons } from "@/components/nav-icons";
import { WorkCards, NoWorkYet } from "@/components/sections/WorkCards";
import { projectsForPractice } from "@/content/clients";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> },
): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: cat.title, description: cat.lede, alternates: { canonical: `/services/${cat.slug}/` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const others = serviceCategories.filter((c) => c.slug !== cat.slug);
  const related = projectsForPractice(cat.slug);

  return (
    <>
      <PageHeader
        trail={[{ label: "Services", href: "/services/" }, { label: cat.title }]}
        title={cat.title}
        lede={cat.lede}
        aside={
          <div className="rounded-card border border-rule bg-paper p-6">
            <span className="font-figure text-figure text-ink">{cat.leaves.length}</span>
            <p className="mt-2 text-small text-ink-60">services in this practice</p>
            <div className="mt-5"><Button href="/contact/">Start a conversation</Button></div>
          </div>
        }
      />

      <Section>
        <SectionHead eyebrow="What this covers" title={`${cat.leaves.length} services in this practice.`}
                     measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {cat.leaves.map((leaf) => {
            const Icon = leafIcons[leaf.slug];
            return (
              <Link key={leaf.slug} href={`/services/${cat.slug}/${leaf.slug}/`}
                    className="group flex flex-col rounded-card border border-rule bg-paper p-[26px] no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px] hover:border-ink-25">
                <span className="mb-5 grid size-[40px] place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {Icon && <Icon size={19} strokeWidth={1.6} aria-hidden />}
                </span>
                <h3 className="text-h3">{leaf.name}</h3>
                <p className="mt-2 text-[15px] text-ink-60">{leaf.summary}</p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[14.5px] font-semibold text-cobalt">
                  Detail <Arrow className="size-[13px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="How this runs" title="The same three phases, every time." measure="measure-tight" />
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

      <Section>
        <SectionHead eyebrow="Related work" title="Built in this practice." measure="measure-tight"
          action={<Link href="/work/" className="flex items-center gap-2 text-[14.5px] font-semibold text-cobalt no-underline">
            All work <Arrow className="size-[13px]" /></Link>} />
        {related.length > 0
          ? <WorkCards projects={related} columns={2} />
          : <NoWorkYet what={cat.title.toLowerCase()} />}
      </Section>

      <Section ground="mist">
        <SectionHead eyebrow="Engagement models" title="Three ways to work with us." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {engagementModels.map((m) => (
            <div key={m.title}
                 className="flex flex-col overflow-hidden rounded-card border border-rule bg-paper
                            transition-all duration-300 ease-brand hover:-translate-y-[3px] hover:border-ink-25 hover:shadow-[0_18px_44px_-28px_rgb(10_16_36/0.28)]">
              <div className="bg-mist px-[26px] pt-[26px] pb-[22px]">
                <h3 className="mb-2 text-h3">{m.title}</h3>
                <p className="text-[15px] text-ink-60">{m.body}</p>
              </div>
              <div className="flex flex-1 flex-col gap-[14px] px-[26px] pt-[22px] pb-[26px]">
                <ul className="flex list-none flex-col gap-[7px] p-0">
                  {m.points.map((p) => <li key={p} className="text-small text-ink-60">{p}</li>)}
                </ul>
                <Button href="/contact/" variant="ghost" className="mt-auto justify-center">Talk it through</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Other practices" title="The rest of the bench." measure="measure-tight" />
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
          {others.map((o) => {
            const Icon = categoryIcons[o.slug];
            return (
              <Link key={o.slug} href={`/services/${o.slug}/`}
                    className="group flex gap-[14px] rounded-card border border-rule bg-paper p-6 no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px]">
                <span className="mt-[2px] grid size-[38px] shrink-0 place-items-center rounded-inner bg-mist text-cobalt
                                 transition-colors duration-300 ease-brand group-hover:bg-cobalt group-hover:text-paper">
                  {Icon && <Icon size={18} strokeWidth={1.6} aria-hidden />}
                </span>
                <span>
                  <span className="block text-[17px] font-semibold tracking-[-0.024em] text-ink">{o.title}</span>
                  <span className="mt-1 block text-small text-ink-60">{o.leaves.length} services</span>
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
