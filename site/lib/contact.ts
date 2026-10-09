import { serviceCategories } from "@/content/services";

/**
 * The contact form's shape, shared by the client and the route handler.
 *
 * Validation lives here rather than in either of them so that the message
 * a visitor reads next to a field is the same one the server would have
 * produced. The client check is a courtesy; the server check is the one
 * that decides, and it never trusts anything the client sent.
 */

export const FIELD_LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  role: 160,
  brief: 8000,
} as const;

/** The honeypot. Hidden from people, irresistible to naive bots. */
export const HONEYPOT = "website";

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  role: string;
  interests: string[];
  brief: string;
};

export type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

const VALID_INTERESTS: ReadonlySet<string> = new Set<string>(serviceCategories.map((c) => c.slug));

export const interestLabel = (slug: string) =>
  serviceCategories.find((c) => c.slug === slug)?.title ?? slug;

/**
 * Deliberately permissive: one @, something either side, a dot in the
 * domain. Anything stricter rejects addresses that are legal and in use,
 * and the real test of an address is whether the reply arrives.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export function validate(input: Partial<ContactSubmission>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const brief = (input.brief ?? "").trim();

  if (!name) errors.name = "We need a name to reply to.";
  else if (name.length > FIELD_LIMITS.name) errors.name = "That is longer than we can store.";

  if (!email) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(email) || email.length > FIELD_LIMITS.email) {
    errors.email = "That does not look like an address we could reply to.";
  }

  if (!brief) errors.brief = "Tell us what you are building, even roughly.";
  else if (brief.length < 10) errors.brief = "A sentence or two is enough, but we need one.";
  else if (brief.length > FIELD_LIMITS.brief) errors.brief = "That is longer than we can store.";

  if ((input.company ?? "").length > FIELD_LIMITS.company) errors.company = "That is longer than we can store.";
  if ((input.role ?? "").length > FIELD_LIMITS.role) errors.role = "That is longer than we can store.";

  return errors;
}

/** Trims, caps and drops anything not in the services taxonomy. */
export function normalise(input: Record<string, unknown>): ContactSubmission {
  const str = (v: unknown, max: number) =>
    (typeof v === "string" ? v : "").trim().slice(0, max);

  const raw = input.interests;
  const list = Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : [];

  return {
    name: str(input.name, FIELD_LIMITS.name),
    email: str(input.email, FIELD_LIMITS.email),
    company: str(input.company, FIELD_LIMITS.company),
    role: str(input.role, FIELD_LIMITS.role),
    interests: [...new Set(list.filter((i): i is string => typeof i === "string" && VALID_INTERESTS.has(i)))],
    brief: str(input.brief, FIELD_LIMITS.brief),
  };
}
