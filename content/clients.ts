/**
 * Named clients, the one signed-off case study, and the work write-ups.
 *
 * Everything here is cleared. Weel Systems Inc. is named and its mark is
 * used with permission; the three project write-ups are deliberately
 * generalised — the sector and the outcome, not the client's internals —
 * because that is what was approved for publication.
 *
 * Figures come from the client's own answers and from work that shipped.
 * Nothing in this file is estimated to make a card look fuller.
 */

export type Client = {
  name: string;
  sector: string;
  href: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  note: string;
};

export const clients: readonly Client[] = [
  {
    name: "Weel Systems Inc.",
    sector: "Pharmacy last-mile logistics",
    href: "https://weel.io",
    logo: "/img/clients/weel-logo.png",
    logoWidth: 512,
    logoHeight: 168,
    note: "Eighteen months, still running",
  },
];

/** The signed-off case study on the homepage. */
export const caseStudy = {
  client: "Weel Systems Inc.",
  href: "https://weel.io",
  title: "Eighteen months on one platform, shipping every week.",
  body:
    "Weel runs last-mile delivery for pharmacies: an order raised at the counter, picked up by a " +
    "courier, signed for at the door, reconciled against what was actually collected. We came in on " +
    "the interface layer and stayed — the design system every screen is drawn from, order creation " +
    "and dispatch, proof of delivery, and the reporting pharmacies hand to their own auditors.",
  figures: [
    { value: "18", caption: "months, and still the same engagement" },
    { value: "7d", caption: "between production releases" },
    { value: "21d", caption: "from inception to production" },
    { value: "4", caption: "product areas shipped end to end" },
  ],
} as const;

/**
 * Industry and practice slugs are the taxonomy keys in content/industries.ts
 * and content/services.ts. A page shows the projects tagged for it and an
 * honest line where there are none, rather than repeating the same three
 * cards under a sector we have not worked in.
 */
export type Project = {
  slug: string;
  name: string;
  /** Artwork made for this project, under /img/work, without the extension. */
  image: string;
  imageAlt: string;
  sector: string;
  outcome: string;
  detail: string;
  industries: readonly string[];
  practices: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: "design-system",
    image: "/img/work/design-system",
    imageAlt:
      "Nine identical milled aluminium tiles laid out in a precise grid, each anodised in the same cyan-to-violet gradient.",
    name: "A design system the product is assembled from",
    sector: "Pharmacy last-mile logistics",
    outcome:
      "Two token files now generate every colour, type and spacing value in the product, with 16 " +
      "documented components behind them.",
    detail:
      "Styling had been decided screen by screen. We moved it to a single pipeline: primitives and " +
      "semantics in source control, generating both the CSS variables the app consumes and typed " +
      "tokens the engineers import. Light and dark are one switch rather than two stylesheets, and a " +
      "new screen is assembled from documented parts instead of redrawn.",
    industries: ["healthcare", "logistics"],
    practices: ["product-engineering"],
  },
  {
    slug: "order-dispatch",
    image: "/img/work/order-dispatch",
    imageAlt:
      "A single anodised aluminium ribbon dividing into three parallel routes that curve away across a white surface.",
    name: "Order creation rebuilt around the counter",
    sector: "Pharmacy last-mile logistics",
    outcome:
      "Nine findings from a single client review shipped in one release, including the two that " +
      "pharmacy staff raised first.",
    detail:
      "The customer picker showed a phone number where staff needed the delivery address, the person " +
      "raising the order typed their own name into a free-text field, and opening an order meant " +
      "finding a small icon in a crowded row. We watched the work being done, then shipped the whole " +
      "set together: address on select, submitter filled from the session, the full row clickable.",
    industries: ["healthcare", "logistics"],
    practices: ["product-engineering"],
  },
  {
    slug: "proof-and-reporting",
    image: "/img/work/proof-and-reporting",
    imageAlt:
      "A stack of thin milled aluminium sheets fanned apart like pages, each edge anodised cyan to violet.",
    name: "Proof of delivery, and the report that settles the argument",
    sector: "Pharmacy last-mile logistics",
    outcome:
      "An eleven-column delivery report that resolves a disputed drop-off without an investigation.",
    detail:
      "A patient said a delivery never arrived; it had been left at reception. The record now captures " +
      "who received it and in what capacity, and the report prints the whole chain — status, courier, " +
      "prep time, actual completion, signature, amount requested against amount collected — on one " +
      "A4 page a pharmacy can hand to an auditor.",
    industries: ["healthcare", "logistics"],
    practices: ["data-cloud", "product-engineering"],
  },
];

export const projectsForIndustry = (slug: string) =>
  projects.filter((p) => p.industries.includes(slug));

export const projectsForPractice = (slug: string) =>
  projects.filter((p) => p.practices.includes(slug));
