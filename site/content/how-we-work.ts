/**
 * Copy for /how-we-work/ and its two children.
 *
 * All of it describes method, which is ours to state. Nothing here asserts
 * a metric, a client, a certification or a headcount. Where a number would
 * normally go, the sentence names a mechanism instead, so the page stays
 * true before a single figure has been verified.
 */

export const phases = [
  {
    slug: "design",
    title: "Design",
    duration: "Two to four weeks",
    lede:
      "Scoping done by the people who will be held to the estimate, so the number that reaches you has an owner.",
    detail: [
      {
        title: "The engineers scope it",
        body:
          "The people who write the estimate are the people who write the code. That removes the handover where a salesperson's number becomes an engineer's problem, and it is the single biggest reason estimates drift.",
      },
      {
        title: "We work against your data",
        body:
          "Interface work happens against the real data model, not a happy path drawn in a design tool. If a screen cannot be populated from what your systems actually return, we would rather find that out in week two than in month four.",
      },
      {
        title: "You get a scope you can refuse",
        body:
          "Design ends with a written scope, a sequence and a shape of team. It is a document you can take to another firm. If the answer is that the project should not happen yet, that is a legitimate output.",
      },
    ],
  },
  {
    slug: "develop",
    title: "Develop",
    duration: "Two-week increments",
    lede:
      "Working software in week three, demoed to you, shipped behind flags. Not a status deck.",
    detail: [
      {
        title: "Increments you can see",
        body:
          "Every two weeks there is something running that you can click. Progress is demonstrated rather than reported, which makes it much harder for a project to be quietly late.",
      },
      {
        title: "Flags before features",
        body:
          "Work ships dark and gets switched on. The path back is tested before the path forward is merged, because in payments and healthcare a bad deploy is a queue of real consequences, not a rollback.",
      },
      {
        title: "Your definition of done",
        body:
          "Embedded work runs on your review process and your standards. If we apply ours instead, we hand you debt you did not choose and cannot maintain.",
      },
    ],
  },
  {
    slug: "refine",
    title: "Refine",
    duration: "Ongoing",
    lede:
      "The squad stays. Most of our work is month thirteen onward, because that is where a platform is actually decided.",
    detail: [
      {
        title: "The same people",
        body:
          "Continuity is the product. An engineer who was in the original scoping conversation still knows why a decision was made two years later, and that knowledge does not survive a staffing change.",
      },
      {
        title: "Numbers in the monthly report",
        body:
          "Lead time, release cadence and uptime go in the report whether or not they flatter us. A metric you only see when it is good is not a metric, it is marketing.",
      },
      {
        title: "Written to be handed over",
        body:
          "Everything is built on the assumption that your team will own it eventually. Documentation and runbooks are part of the work, not a phase at the end that gets cut.",
      },
    ],
  },
] as const;

/** /how-we-work/delivery/ */
export const deliveryPractices = [
  {
    title: "A squad, not a ticket queue",
    body:
      "Three to eight people who work only on your platform. They join your standups, they hold your board, and they are named in the proposal before you sign anything.",
  },
  {
    title: "One backlog",
    body:
      "We work from your backlog in your tool. A parallel tracker kept on our side is how two teams end up disagreeing about what shipped.",
  },
  {
    title: "Trunk-based, behind flags",
    body:
      "Short-lived branches, continuous integration, and a release that is a configuration change rather than an event. Long-lived branches are where integration risk accumulates unseen.",
  },
  {
    title: "Instrument before you change",
    body:
      "On an existing platform the first weeks go into measurement, not features. Changing code you cannot observe is how a six-week release cycle becomes a seven-week one.",
  },
  {
    title: "Retros you receive",
    body:
      "Every retrospective that reaches you includes what went wrong and what changed because of it. A retro that only travels upward when it is flattering has no diagnostic value.",
  },
  {
    title: "Handover is designed in",
    body:
      "Runbooks, architecture decision records and a documented on-call path exist from the start. The test is whether your team could take it tomorrow, not whether we promise they could later.",
  },
] as const;

export const deliveryRituals = [
  { when: "Daily", what: "Standup on your calendar, in your timezone window." },
  { when: "Every two weeks", what: "Demo of working software, then planning against your priorities." },
  { when: "Every two weeks", what: "Retrospective, with the written output sent to you." },
  { when: "Monthly", what: "Continuity report: lead time, release cadence, uptime, and what changed." },
  { when: "Quarterly", what: "Architecture and roadmap review with your technical leadership." },
] as const;
