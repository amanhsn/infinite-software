export const differentiators = [
  { title: "We name the engineers.", body: "You meet the squad before you sign, and the names on the proposal are the names in the standups." },
  { title: "We publish the numbers.", body: "Lead time, release cadence and uptime go in the monthly report whether or not they flatter us." },
  { title: "We stay past launch.", body: "Most of our work is month thirteen onward. Launch is the middle of an engagement, not the end." },
  { title: "We tell you what went wrong.", body: "Every retro that reaches you includes the things we got wrong and what changed afterwards." },
  { title: "Your data stays in Canada.", body: "Client data is held in Canadian regions.", status: "claim-unverified" },
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

/** status: 'placeholder' — nothing here ships until it is real. */
export const continuityFigures = [
  { value: "30", caption: "months, longest running engagement", status: "placeholder" },
  { value: "6.2", caption: "day median lead time", status: "placeholder" },
  { value: "4", caption: "days between production releases", status: "placeholder" },
  { value: "92%", caption: "engineer continuity over 12 months", status: "placeholder" },
] as const;
