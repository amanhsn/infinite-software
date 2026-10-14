import { serviceCategories } from "./services";
import { industries } from "./industries";
import type { NavItem } from "./types";

export type MenuLink = { label: string; href: string; summary?: string };

/**
 * Three shapes of nav item:
 *   link  — goes straight there
 *   mega  — the four services columns, 27 leaves
 *   menu  — a short dropdown
 */
export type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string; href: string }
  | { kind: "menu"; label: string; href: string; items: readonly MenuLink[] };

export const primaryNav: readonly NavEntry[] = [
  { kind: "mega", label: "Services", href: "/services/" },
  {
    kind: "menu",
    label: "Industries",
    href: "/industries/",
    items: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}/`,
      summary: i.summary,
    })),
  },
  { kind: "link", label: "Work", href: "/work/" },
  {
    kind: "menu",
    label: "How we work",
    href: "/how-we-work/",
    items: [
      { label: "Our process", href: "/how-we-work/", summary: "Design, develop, refine. Three phases, because there are only three." },
      { label: "Engagement models", href: "/how-we-work/engagement-models/", summary: "Dedicated squad, embedded engineers, or fixed scope." },
      { label: "Delivery", href: "/how-we-work/delivery/", summary: "Cadence, reporting and what lands in your inbox each month." },
    ],
  },
  { kind: "link", label: "Insights", href: "/insights/" },
  {
    kind: "menu",
    label: "Company",
    href: "/company/",
    items: [
      { label: "About", href: "/company/", summary: "Who we are and how we got here." },
      { label: "Team", href: "/company/team/", summary: "The engineers you would actually work with." },
      { label: "Careers", href: "/company/careers/", summary: "Open roles in Canada and Pakistan." },
      { label: "Locations", href: "/company/locations/", summary: "Canadian head office, Pakistan delivery." },
    ],
  },
];

/** The mega-menu reads the services taxonomy directly — one source. */
export const megaColumns = serviceCategories;

export const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company/" },
      { label: "Team", href: "/company/team/" },
      { label: "Careers", href: "/company/careers/" },
      { label: "Locations", href: "/company/locations/" },
      { label: "Insights", href: "/insights/" },
    ],
  },
  {
    heading: "Work & approach",
    links: [
      { label: "Work", href: "/work/" },
      { label: "How we work", href: "/how-we-work/" },
      { label: "Engagement models", href: "/how-we-work/engagement-models/" },
      { label: "Security & data residency", href: "/security/" },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Security", href: "/security/" },
] as const satisfies readonly NavItem[];
