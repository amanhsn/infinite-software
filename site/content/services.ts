import type { ServiceCategory } from "./types";

/**
 * The single source of truth for the services taxonomy.
 * Drives: the services index, category pages, leaf pages, the homepage
 * cards, the footer column, and both generateStaticParams calls.
 *
 * HTML entities are decoded here — React escapes on output, so storing
 * "&amp;" would double-escape.
 */
export const serviceCategories = [
  {
    slug: "product-engineering",
    title: "Product Engineering",
    lede:
      "Software your customers touch. We scope with the engineers who will build it, ship in two-week increments, and stay on the account after launch.",
    leaves: [
      { slug: "product-strategy-discovery", name: "Product strategy & discovery", summary: "Two to four weeks to a scope the build team will stand behind." },
      { slug: "ux-ui-design", name: "UX/UI design", summary: "Interface work done against the real data model, not a happy-path mockup." },
      { slug: "web-application-development", name: "Web application development", summary: "Long-lived web platforms, built to be handed over." },
      { slug: "mobile-application-development", name: "Mobile application development", summary: "iOS and Android, native or cross-platform, with a release train." },
      { slug: "mvp-and-0-1", name: "MVP & 0→1 build", summary: "The smallest thing that proves the business case, built to survive if it works." },
      { slug: "platform-modernisation", name: "Platform modernisation", summary: "Moving off the thing that is holding you back, without a freeze." },
      { slug: "qa-test-automation", name: "QA & test automation", summary: "A suite the team trusts enough to deploy on a Friday." },
    ],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    lede:
      "Applied AI that reaches production. Most of this work is evaluation and plumbing rather than models — which is why it ships.",
    leaves: [
      { slug: "ai-readiness-roadmap", name: "AI readiness & roadmap", summary: "An honest read on what your data and team can support this year." },
      { slug: "llm-application-development", name: "LLM application development", summary: "Products built on language models, with evaluation from day one." },
      { slug: "ai-agents-workflow-automation", name: "AI agents & workflow automation", summary: "Agents scoped to a task with a defined failure mode." },
      { slug: "rag-knowledge-systems", name: "RAG & knowledge systems", summary: "Retrieval over your own corpus, measured on answer quality." },
      { slug: "machine-learning-data-science", name: "Machine learning & data science", summary: "Models where a model is genuinely the right answer." },
      { slug: "mlops-evaluation", name: "MLOps & evaluation", summary: "The harness that tells you a change made things better." },
      { slug: "ai-governance", name: "AI governance", summary: "Policy, audit trail and human review, written for a regulator." },
    ],
  },
  {
    slug: "data-cloud",
    title: "Data & Cloud",
    lede:
      "The layer underneath. Pipelines, platforms and the operational discipline that keeps them running when nobody is watching.",
    leaves: [
      { slug: "data-engineering", name: "Data engineering", summary: "Pipelines that reconcile, with lineage you can show an auditor." },
      { slug: "analytics-bi", name: "Analytics & BI", summary: "Numbers the business agrees on before the meeting starts." },
      { slug: "cloud-architecture", name: "Cloud architecture", summary: "Designed for the bill as well as the load." },
      { slug: "cloud-migration", name: "Cloud migration", summary: "Moved in slices, with a rollback at every step." },
      { slug: "devops-platform-engineering", name: "DevOps & platform engineering", summary: "Paved roads, so product teams stop reinventing deployment." },
      { slug: "reliability-observability", name: "Reliability & observability", summary: "You find out before your customers do." },
      { slug: "finops", name: "FinOps", summary: "Cloud spend attributed to the teams that cause it." },
    ],
  },
  {
    slug: "teams-delivery",
    title: "Teams & Delivery",
    lede:
      "How the people are arranged. Named engineers, a reporting cadence, and continuity measured rather than promised.",
    leaves: [
      { slug: "dedicated-squads", name: "Dedicated squads", summary: "Three to eight people working only on your platform." },
      { slug: "embedded-engineers", name: "Embedded engineers", summary: "Our engineers inside your team, under your technical lead." },
      { slug: "offshore-delivery-centre", name: "Offshore delivery centre", summary: "A standing team in Pakistan, on your process and your tooling." },
      { slug: "technical-advisory", name: "Technical advisory", summary: "A second opinion from people who will have to live with the answer." },
      { slug: "support-maintenance", name: "Support & maintenance", summary: "Named owners, published response times, no ticket roulette." },
      { slug: "security-compliance-engineering", name: "Security & compliance engineering", summary: "The evidence a third-party risk review actually asks for." },
    ],
  },
] as const satisfies readonly ServiceCategory[];

export type CategorySlug = (typeof serviceCategories)[number]["slug"];

export const getCategory = (slug: string) =>
  serviceCategories.find((c) => c.slug === slug);

export const getLeaf = (categorySlug: string, leafSlug: string) => {
  const category = getCategory(categorySlug);
  const leaf = category?.leaves.find((l) => l.slug === leafSlug);
  return category && leaf ? { category, leaf } : undefined;
};
