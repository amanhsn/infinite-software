/**
 * Copy for /company/ and its children.
 *
 * Positioning and method only. Nothing here names a person, a headcount or
 * a founding date: team profiles are deliberately off for now, so the
 * pages that would carry them say so plainly instead. Named clients and
 * the work live in content/clients.ts.
 */

export const principles = [
  {
    title: "Continuity over capacity",
    body:
      "Most firms in this category compete on how many engineers they can put on a problem. We compete on how long the same ones stay. A team in its second year on a platform is worth more than a larger team in its second month, and the difference compounds.",
  },
  {
    title: "The estimate has an owner",
    body:
      "Scoping is done by the engineers who will be held to it. When the person who wrote the number is the person who has to hit it, the number behaves differently.",
  },
  {
    title: "Boring technology, on purpose",
    body:
      "In payments, healthcare and logistics a decision made today is still in production a decade later. We choose the documented, widely understood option unless there is a reason that survives a second conversation.",
  },
  {
    title: "Built to be handed over",
    body:
      "Every engagement assumes your team eventually owns the result. That assumption changes how things get documented, and it is the opposite of how a firm behaves when it wants to be hard to replace.",
  },
] as const;

/** /company/careers/ */
export const hiringStages = [
  {
    title: "A conversation, not a screen",
    body:
      "The first call is with an engineer, not a recruiter. You should be able to ask what the work is actually like and get an answer from someone doing it.",
  },
  {
    title: "One technical session",
    body:
      "A single session on a realistic problem, paired, with the tools you normally use. No take-home that eats a weekend, and no puzzle that has nothing to do with the job.",
  },
  {
    title: "Meet the squad",
    body:
      "You meet the people you would actually work with, because you are joining a team rather than a pool. They get a say and so do you.",
  },
  {
    title: "A written offer with the detail in it",
    body:
      "Scope, level, who you report to and what the first ninety days look like, in writing, before you are asked to decide.",
  },
] as const;

export const workingHere = [
  {
    title: "You stay on the thing you built",
    body:
      "Engineers are not rotated off a platform the month it gets stable. Most of the work here is long running, and the people who scoped a system are usually still the ones improving it two years later.",
  },
  {
    title: "Your name is on the proposal",
    body:
      "Clients are told who is doing the work before they sign. That is a commitment to them and a form of credit for you.",
  },
  {
    title: "Two offices, one team",
    body:
      "Work is organised around a shared timezone window rather than around which office someone sits in. Reviews, demos and retros include everybody on the squad.",
  },
] as const;

/** /company/locations/ */
export const locationDetail = [
  {
    country: "Canada",
    role: "Head office",
    body:
      "Client relationships, engagement leadership and the commercial side of every account. Canadian clients contract with the Canadian entity.",
  },
  {
    country: "Pakistan",
    role: "Delivery office",
    body:
      "The larger share of the engineering bench, in Islamabad. Squads are mixed across both offices and run on one backlog, one review process and one definition of done.",
  },
] as const;
