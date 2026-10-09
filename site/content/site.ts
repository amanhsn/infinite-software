/**
 * "Infinite" is the wordmark and appears in the lockup and every H1.
 * "Infinite Software Solutions" is the company name and belongs in the
 * footer legal strip, the privacy policy, and anywhere the entity is named.
 *
 * No telephone number is published. A 1-800 line has been requested and
 * does not exist yet, and an invented number on a contact page is the one
 * thing on it a reader is entitled to treat as literal.
 */
export const site = {
  name: "Infinite",
  legalName: "Infinite Software Solutions",
  jurisdiction: "Ontario, Canada",
  tagline: "Design. Develop. Refine.",
  description:
    "A Canadian software house building and running platforms for companies in payments, healthcare and logistics. The same squad, month one to month thirty.",
  email: "hello@infinite.dev",
  offices: [
    {
      country: "Canada",
      role: "Head office",
      address: "3465 Platinum Drive",
      locality: "Mississauga, Ontario",
    },
    {
      country: "Pakistan",
      role: "Delivery office",
      address: null,
      locality: "Islamabad",
    },
  ],
} as const;
