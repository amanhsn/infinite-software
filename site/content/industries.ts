/**
 * `related` holds "category/leaf" paths into content/services.ts — the same
 * taxonomy, so an industry page cannot link to a service that does not exist.
 */
export const industries = [
  {
    slug: "financial-services",
    name: "Financial services & payments",
    summary: "Card platforms, ledgers, KYC flows and the audit trail underneath them.",
    lede: "Money movement is unforgiving: the ledger has to balance, the audit trail has to survive a regulator, and none of it can go down on a Friday afternoon.",
    challenges: [
      { title: "The ledger is the product", body: "Reconciliation is not a reporting feature. It is the thing that decides whether the business can be audited." },
      { title: "Change is expensive to get wrong", body: "A bad deploy in payments is a chargeback queue, not a rollback. We ship behind flags, in slices, with the path back tested first." },
      { title: "Third-party risk review", body: "Before a bank buys, its risk team asks who can touch the data and from where. That answer has to exist before the pitch." },
    ],
    related: ["data-cloud/data-engineering", "teams-delivery/security-compliance-engineering", "product-engineering/platform-modernisation"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Clinical workflow and patient data, built to survive a privacy review.",
    lede: "Clinical software is used by people who are busy, tired and legally accountable. It has to be fast, obvious, and defensible in a privacy review.",
    challenges: [
      { title: "Workflow beats features", body: "Clinicians route around software that adds clicks. We design against the real pathway, not the demo path." },
      { title: "Privacy is structural", body: "Access control and retention are architecture decisions, not a settings page added late." },
      { title: "Integration is the work", body: "The value is usually in getting two systems that were never meant to meet to agree on a patient identifier." },
    ],
    related: ["product-engineering/ux-ui-design", "data-cloud/data-engineering", "teams-delivery/security-compliance-engineering"],
  },
  {
    slug: "retail-commerce",
    name: "Retail & commerce",
    summary: "Checkout, inventory and the systems that hold up on the busiest day of the year.",
    lede: "Commerce systems are judged on one or two days a year. The rest of the time they should be cheap to run and boring to operate.",
    challenges: [
      { title: "Peak is the spec", body: "Capacity planning starts from the worst hour of the year, not the average one." },
      { title: "Inventory truth", body: "Overselling is a customer-service cost. It is usually a data-consistency problem wearing a commercial disguise." },
      { title: "Checkout is sacred", body: "Every millisecond and every extra field costs conversion. Changes there are measured, not argued about." },
    ],
    related: ["data-cloud/reliability-observability", "product-engineering/web-application-development", "data-cloud/finops"],
  },
  {
    slug: "logistics",
    name: "Logistics & supply chain",
    summary: "Tracking, routing and the integrations between systems that were never meant to meet.",
    lede: "Logistics runs on other people's data arriving late, malformed, or not at all. The software's job is to stay useful anyway.",
    challenges: [
      { title: "Partner data is messy", body: "Every carrier has its own format, cadence and outage pattern. Ingestion has to be defensive by default." },
      { title: "Real time is a spectrum", body: "Some events need seconds, most need minutes. Treating them the same is how the bill gets out of hand." },
      { title: "Exceptions are the job", body: "The happy path is a small share of the volume. The interface should be built around what went wrong." },
    ],
    related: ["data-cloud/data-engineering", "ai-engineering/ai-agents-workflow-automation", "data-cloud/cloud-architecture"],
  },
  {
    slug: "saas-technology",
    name: "SaaS & technology",
    summary: "Product teams that need to ship faster than hiring allows.",
    lede: "You know what to build and the roadmap is longer than the team. The problem is capacity that does not cost six months of recruiting.",
    challenges: [
      { title: "Onboarding cost is the real price", body: "An engineer who takes three months to be useful is not extra capacity. We plan for two weeks." },
      { title: "Your standards, not ours", body: "Embedded work runs on your review process and your definition of done, or it creates debt you inherit." },
      { title: "Handover is designed in", body: "Everything we build is written to be owned by your team, because eventually it will be." },
    ],
    related: ["teams-delivery/embedded-engineers", "teams-delivery/dedicated-squads", "product-engineering/qa-test-automation"],
  },
  {
    slug: "energy-utilities",
    name: "Energy & utilities",
    summary: "Field data, metering and long-lived systems that cannot go down.",
    lede: "These systems outlive the teams that build them. What matters is whether someone can still operate and change them in ten years.",
    challenges: [
      { title: "Long horizons", body: "A decision made now is still in production a decade later. Boring, documented technology wins." },
      { title: "Field conditions", body: "Intermittent connectivity and hostile hardware are the normal case, not the edge case." },
      { title: "Operational safety", body: "Observability is not a nice-to-have when the consequence of a silent failure is physical." },
    ],
    related: ["data-cloud/reliability-observability", "data-cloud/data-engineering", "product-engineering/platform-modernisation"],
  },
] as const;

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
