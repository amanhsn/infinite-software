/**
 * "Infinite" is the wordmark and appears in the lockup and every H1.
 * "Infinite Software Solutions" is the registered company name and belongs
 * in the footer legal strip, the privacy policy, and anywhere the legal
 * entity is named.
 */
export const site = {
  name: "Infinite",
  legalName: "Infinite Software Solutions",
  tagline: "Design. Develop. Refine.",
  description:
    "A Canadian software house building and running platforms for companies in payments, healthcare and logistics. The same squad, month one to month thirty.",
  email: "hello@infinite.dev",
  /** status: 'placeholder' marks content that must not ship unverified. */
  offices: [
    { country: "Canada", role: "Head office", address: "Address to confirm", status: "placeholder" },
    { country: "Pakistan", role: "Delivery office", address: "Address to confirm", status: "placeholder" },
  ],
} as const;
