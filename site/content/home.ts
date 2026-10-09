/**
 * The hero's own lede, separate from `site.description`.
 *
 * The hero does not lead on nationality: the first thing a visitor reads
 * should be what we do and how long we stay, not where we are registered.
 * Country still appears where it is the actual subject, which is /company/
 * and /company/locations/, and in the meta description.
 */
export const heroLede =
  "A software house building and running platforms for companies in payments, " +
  "healthcare and logistics. The same squad, month one to month thirty.";

export const differentiators = [
  { title: "We name the engineers.", body: "You meet the squad before you sign, and the names on the proposal are the names in the standups." },
  { title: "We publish the numbers.", body: "Lead time, release cadence and uptime go in the monthly report whether or not they flatter us." },
  { title: "We stay past launch.", body: "Most of our work is month thirteen onward. Launch is the middle of an engagement, not the end." },
  { title: "We tell you what went wrong.", body: "Every retro that reaches you includes the things we got wrong and what changed afterwards." },
  { title: "Your data sits where you need it.", body: "Infrastructure is built and held in the country you choose, and the regions are written into the contract rather than described on a web page." },
] as const;

export const steps = [
  { title: "Design", body: "Two to four weeks. We scope with the engineers who will build it, so the estimate comes from the people held to it." },
  { title: "Develop", body: "Two-week increments, demoed to you, shipped behind flags. You see working software in week three, not a status deck." },
  { title: "Refine", body: "The squad stays. Lead time comes down, the backlog gets shorter, and the same people know why every decision was made." },
] as const;

export const engagementModels = [
  { title: "Dedicated squad", body: "A standing team of three to eight, working only on your platform.",
    points: ["Named engineers, fixed for the engagement", "Your rituals, your board", "Monthly continuity reporting"] },
  { title: "Embedded engineers", body: "Our people inside your existing team, under your technical lead.",
    points: ["Two-week onboarding", "Your process, your tooling", "Scale up or down at 30 days"] },
  { title: "Fixed-scope build", body: "A defined outcome, a defined price, a defined date.",
    points: ["Discovery before the number", "Milestone billing", "Warranty period after handover"] },
] as const;

/**
 * The four figures the firm is willing to be held to. Supplied by the
 * company, not derived: release cadence is the default where a client has
 * not specified one, and continuity is published as the range it actually
 * sits in rather than rounded to a single flattering number.
 */
export const continuityFigures = [
  { value: "18", caption: "months, longest running engagement" },
  { value: "21", caption: "day median lead time to production" },
  { value: "7", caption: "days between production releases" },
  { value: "80–90%", caption: "engineer continuity over 12 months" },
] as const;
