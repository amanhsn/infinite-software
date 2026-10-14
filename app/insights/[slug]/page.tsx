import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/primitives/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { Plate } from "@/components/primitives/Plate";
import { Arrow } from "@/components/primitives/Arrow";
import { articles, getArticle, formatPublished } from "@/content/insights";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.standfirst,
    alternates: { canonical: `/insights/${article.slug}/` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.standfirst,
      publishedTime: article.published,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <PageHeader
        trail={[{ label: "Insights", href: "/insights/" }, { label: article.title }]}
        title={article.title}
        lede={article.standfirst}
      />

      <Section className="pt-0">
        {/* The byline carries what a reader uses to weigh the piece: who
            wrote it, when, and how long it takes. */}
        <p className="font-figure m-0 mb-8 flex flex-wrap gap-x-5 gap-y-1 text-[13px] tracking-[0.02em] text-ink-40">
          <span className="font-semibold text-ink-60">{article.author}</span>
          <span>{formatPublished(article.published)}</span>
          <span>{article.readingTime}</span>
        </p>

        <Plate src={article.image} alt={article.imageAlt} ratio="16/9" priority
               sizes="(min-width: 1200px) 1100px, 100vw" />

        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col gap-9">
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-4 text-h3">{s.heading}</h2>
              {s.paragraphs.map((text, i) => (
                <p key={i} className="mt-0 mb-4 max-w-measure text-lead text-ink-60 last:mb-0">{text}</p>
              ))}
              {s.list && (
                <ul className="mt-5 mb-0 flex max-w-measure list-none flex-col gap-3 p-0">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-ink-60">
                      <span aria-hidden className="mt-[0.7em] size-[5px] shrink-0 rounded-pill bg-cobalt" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Section>

      {others.length > 0 && (
        <Section ground="mist">
          <p className="mb-7 text-eyebrow text-ink-40 uppercase">Also in insights</p>
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {others.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}/`}
                    className="group flex flex-col gap-3 rounded-card bg-paper p-7 no-underline
                               transition-all duration-300 ease-brand hover:-translate-y-[3px]
                               hover:shadow-[0_18px_44px_-28px_rgb(10_16_36/0.28)]">
                <span className="font-figure text-[13px] text-ink-40">{a.readingTime}</span>
                <h3 className="text-h3">{a.title}</h3>
                <p className="m-0 text-[15px] text-ink-60">{a.summary}</p>
                <span className="mt-2 flex items-center gap-2 text-[14.5px] font-semibold text-cobalt">
                  Read it <Arrow className="size-[13px]" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <ContactBand />
    </>
  );
}
