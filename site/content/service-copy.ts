import type { serviceCategories } from "./services";

/**
 * Per-service copy for the 27 leaf pages.
 *
 * The leaf template used to render two paragraphs of instructions to
 * itself ("Two or three paragraphs describing the situation a client is
 * in…") on every one of these pages. This file replaces them.
 *
 * `problem` is the symptom in the reader's words, second person, naming
 * something specific enough that the wrong reader bounces. `method` is
 * what actually happens: week one, the first thing they get, who is in
 * the room. No claims about results — those live on /work/, per client,
 * cleared.
 *
 * Typed against the taxonomy, so adding a leaf without copy fails the
 * build rather than rendering an empty column.
 */
export type LeafSlug =
  (typeof serviceCategories)[number]["leaves"][number]["slug"];

export type LeafCopy = { problem: string; method: string };

export const serviceCopy: Record<LeafSlug, LeafCopy> = {
  // ── Product Engineering ──────────────────────────────────────────────
  "product-strategy-discovery": {
    problem:
      "You have a budget, a rough idea of the thing, and three internal versions of what it is for. Every estimate you have been given so far came from someone who will not be building it, which is why they keep moving. What you need before you commit a year of spend is a scope the people doing the work will stand behind.",
    method:
      "Two to four weeks, run by the engineers who would build it. Week one is interviews and a walk through whatever exists today. You get a written scope, a sequenced plan, the risks we think are real, and an estimate with its assumptions attached — enough to take to a board, and enough to take to a different firm if you would rather.",
  },
  "ux-ui-design": {
    problem:
      "The mockups look right and the build keeps disagreeing with them. Usually that is because they were drawn against a happy path: one customer, one order, no empty state, no error, no record with a forty-character name. The gap shows up as rework in the sprint, not in the review.",
    method:
      "We design against the real data model and the real edge cases, in the same repository as the build. You get screens with their empty, loading, error and over-full states drawn, a component inventory the engineers import rather than re-measure, and a designer in the standups for the duration rather than at the handover.",
  },
  "web-application-development": {
    problem:
      "This is the platform your business runs on, and it has to still be maintainable when the people who wrote it have moved on. Most of the cost is not in getting to launch; it is in the four years afterwards, which is the part most proposals are quietest about.",
    method:
      "Two-week increments, demoed to you, shipped behind flags. You see working software in week three. Every change is reviewed by someone who did not write it, the deploy is auditable to a person and a commit, and the documentation is written for the team who will eventually take it over — which we assume from the first week.",
  },
  "mobile-application-development": {
    problem:
      "Shipping to a store is not like shipping to a server: you cannot patch a bad release in ten minutes, and the review queue does not care about your launch date. Teams used to web cadence usually discover this once, expensively.",
    method:
      "A release train with a date on it, native or cross-platform depending on what the product actually needs rather than what we prefer. Staged rollout, crash reporting from the first build, and a kill switch on anything risky. You get a TestFlight or internal track build in the first increment, not at the end.",
  },
  "mvp-and-0-1": {
    problem:
      "You need to find out whether this works before you spend the rest of the money. The failure mode is building either too much to learn anything quickly, or something so disposable that succeeding leaves you with a rewrite.",
    method:
      "We cut to the one question the market has to answer, build the smallest honest version of it, and put it in front of real users. Architecture choices are made so that a yes does not mean starting again. Typically eight to twelve weeks to something live, with a written list of what we deliberately left out.",
  },
  "platform-modernisation": {
    problem:
      "The system works and nobody wants to touch it. Releases are quarterly because that is how long the regression takes, the one person who understands the billing logic is a flight risk, and a rewrite has been proposed twice and refused twice, correctly.",
    method:
      "No freeze and no big bang. We instrument first so there is a baseline, carve the system along a seam that holds, and move one slice at a time with a rollback at every step. The old path keeps running until the new one has carried production traffic. You get a sequencing plan before anything moves.",
  },
  "qa-test-automation": {
    problem:
      "There is a suite, it is red, and everyone has learned to ignore it. So the real test is a person clicking through the app before a release, which is why releases happen on Tuesdays and never on Fridays.",
    method:
      "We start by deleting or fixing the tests nobody trusts, because a suite with known-failing tests teaches the team to ignore all of them. Then coverage follows the risk: the paths that move money or touch patient data first. The target is a suite green enough that the team deploys on a Friday without a meeting about it.",
  },

  // ── AI Engineering ───────────────────────────────────────────────────
  "ai-readiness-roadmap": {
    problem:
      "There is pressure from the board to be doing something with AI, a list of ideas from a workshop, and no clear read on which of them your data and your team can actually support this year. The expensive mistake is starting the one that needs data you do not have.",
    method:
      "Two to three weeks. We look at the data you actually hold, the systems it would have to reach, and the people who would run the result. You get each idea scored on value and feasibility, a recommended first project with its failure mode written down, and a plain statement of which ideas are not viable yet and what would change that.",
  },
  "llm-application-development": {
    problem:
      "The demo was convincing and the pilot is not. It is right most of the time, nobody can say how often, and being wrong in front of a customer costs more than being slow. That gap between demo and product is evaluation, and it is most of the work.",
    method:
      "Evaluation from day one: a graded set drawn from your real cases before we tune anything, so a change can be shown to have helped. Then the unglamorous parts — retrieval, prompts under version control, fallbacks, cost and latency budgets, and a human path for the cases the model should not own. You get the eval harness as a deliverable, not just the app.",
  },
  "ai-agents-workflow-automation": {
    problem:
      "A process that eats a person's week is a good candidate for automation right up until the agent does something confidently wrong at three in the morning and nobody notices until the reconciliation. The question is not whether it can do the task; it is what happens the day it gets it wrong.",
    method:
      "We scope the agent to a task with a defined blast radius, give it a defined failure mode, and put the approval step where the cost of an error justifies one. Every run is logged with its inputs and its reasoning so a human can audit it afterwards. The first increment is usually the narrowest useful slice, running alongside the manual process rather than replacing it.",
  },
  "rag-knowledge-systems": {
    problem:
      "You have twenty years of documents and a search box nobody uses. The first retrieval prototype answered beautifully on the five questions it was demoed with and fell apart on the long tail, which is where the actual value is.",
    method:
      "Retrieval is an information problem before it is a model problem. We look at how the corpus is actually structured, chunk and index for how people ask rather than how the documents were filed, and measure answer quality against a set your own experts graded. Citations back to the source document are a requirement, not a feature.",
  },
  "machine-learning-data-science": {
    problem:
      "Sometimes the answer really is a model — a forecast, a ranking, a risk score — and sometimes it is a query someone has not written yet. Starting with the model is how teams end up maintaining a pipeline that a case statement would have handled.",
    method:
      "We check the baseline first: what does the simple rule get you, and is the gap worth a model's lifetime cost. If it is, the work runs against a held-out set from the beginning, with the metric agreed with the business before training starts. You get the model, the evaluation, and an honest account of where it is weak.",
  },
  "mlops-evaluation": {
    problem:
      "A model in production that nobody is measuring is a liability with a cron job. Drift is silent, the retraining story is a notebook on someone's laptop, and the only signal that something has broken is a customer complaint.",
    method:
      "Training, evaluation and deployment move into the same pipeline as the rest of your code, with versioned data, reproducible runs and a harness that tells you whether a change made things better. Monitoring covers input drift and output quality, not just uptime. You get a rollback path for models, same as for code.",
  },
  "ai-governance": {
    problem:
      "A regulator, an auditor or a large customer is going to ask who approved this model, what it was trained on, how you know it is fair, and what a person can do about a decision it made. Assembling that after the fact is far more expensive than recording it as you go.",
    method:
      "We write the policy that matches what you are actually doing, then make the system produce the evidence for it: model cards, an audit trail per decision, a documented human review path, and a register of where AI touches a customer outcome. Written for someone outside the team to read, because that is who will read it.",
  },

  // ── Data & Cloud ─────────────────────────────────────────────────────
  "data-engineering": {
    problem:
      "Two systems disagree about the same number and both have a defender in the meeting. The pipeline that produced one of them was written by someone who left, runs on a schedule nobody chose, and fails quietly by writing yesterday's figures again.",
    method:
      "Pipelines that reconcile, with lineage you can put in front of an auditor: where each number came from, what transformed it, and when. Failures are loud and idempotent, so a rerun is safe. We start with the one number the business argues about most and work outward from it.",
  },
  "analytics-bi": {
    problem:
      "Every team brings its own version of revenue to the Monday meeting and the first twenty minutes go on whose spreadsheet is right. The dashboards exist; the agreement does not.",
    method:
      "Definitions first, in writing, agreed by the people who will quote them — then one modelled layer everything reads from, so a metric has one implementation. Dashboards come last and stay few. You get a documented semantic layer, not forty charts.",
  },
  "cloud-architecture": {
    problem:
      "The architecture that fits the load and the architecture that fits the bill are not automatically the same one, and the difference compounds monthly. Most designs are reviewed for the first and discover the second in the second quarter.",
    method:
      "We design for both and show the numbers: the expected bill at current load, at three times it, and at the spike you are afraid of. Boring, documented, widely understood services unless there is a reason that survives a second conversation. You get a diagram, a cost model and the list of what we deliberately did not use.",
  },
  "cloud-migration": {
    problem:
      "The lift-and-shift quote looks cheap and the version where it goes wrong is not in it. Meanwhile the business has told you there is no window in which the system can be unavailable, which is correct and non-negotiable.",
    method:
      "Moved in slices, with a rollback at every step and the old path live until the new one has carried real traffic. We migrate the least-coupled thing first to prove the route, then sequence by risk. Each slice has its own go and no-go criteria written before it starts.",
  },
  "devops-platform-engineering": {
    problem:
      "Every product team has invented its own deployment, so there are four ways to ship, four on-call stories, and a new engineer takes three weeks to make a one-line change safely.",
    method:
      "Paved roads: one documented way to build, test, deploy and observe a service, available as a template a team can adopt in an afternoon. Opinionated where it saves argument, escapable where a team genuinely needs something else. Measured by how long it takes a new service to reach production.",
  },
  "reliability-observability": {
    problem:
      "You find out about outages from customers. The dashboards are green because they measure whether the servers are up, not whether a person can complete a checkout, and the alert that would have caught it was turned off for being noisy.",
    method:
      "We instrument the user journey rather than the host: can the thing people pay for be done right now. Service levels get written down with the business, alerts map to those, and anything that pages a human has to be actionable or it gets deleted. You get runbooks written by the people who were on the incident.",
  },
  finops: {
    problem:
      "The cloud bill grows faster than the traffic and nobody owns it. Finance asks what caused the jump, engineering says it is complicated, and both are right because nothing is tagged.",
    method:
      "Attribution first: spend allocated to the teams and features that cause it, so the conversation stops being about the total. Then the obvious wins — idle capacity, oversized instances, storage nobody reads, egress that could have been avoided by design — with the savings tracked against the bill, not estimated in a deck.",
  },

  // ── Teams & Delivery ─────────────────────────────────────────────────
  "dedicated-squads": {
    problem:
      "You need capacity that behaves like a team rather than a set of contractors. The last arrangement gave you a different engineer each quarter, and every one of them spent their first month learning what the previous one already knew.",
    method:
      "Three to eight people working only on your platform, named in the proposal and still there a year later. Your rituals, your board, your definition of done. Monthly reporting on lead time, release cadence and continuity, whether or not the numbers flatter us. Substitutions are told to you before they happen.",
  },
  "embedded-engineers": {
    problem:
      "You have a team and a technical lead and you do not want a second process arriving with the extra people. What you want is more of your own team, not a parallel one with its own standup and its own opinions about the board.",
    method:
      "Our engineers work inside your team, under your lead, on your tooling. Two-week onboarding, then they are in your standups and your review rotation. You can scale up or down at thirty days. We stay out of your delivery process entirely — the only thing we insist on is that our people are named and not swapped quietly.",
  },
  "offshore-delivery-centre": {
    problem:
      "Offshore has a reputation, and it was earned: a timezone with no overlap, a specification thrown over a wall, and a delivery that is technically what was asked for. The cost saving disappears in the rework.",
    method:
      "A standing team in Islamabad on your process and your tooling, organised around a shared overlap window rather than a handover. Reviews, demos and retros include everyone on the squad. The same engineers stay on the platform, which is the thing that makes the arrangement work at all.",
  },
  "technical-advisory": {
    problem:
      "A decision is in front of you — a rewrite, a vendor, an architecture, an acquisition's codebase — and everyone with an opinion also has a stake in the answer. You want a read from someone who will have to live with being wrong about it.",
    method:
      "A short engagement, usually one to three weeks: we read the code, talk to the people who maintain it, and write down what we actually think, including where we are uncertain. You get a written recommendation with the reasoning, the option we rejected and why, and the cost of being wrong in each direction.",
  },
  "support-maintenance": {
    problem:
      "The build is finished and the arrangement afterwards is a shared inbox and goodwill. Nobody owns the platform, response times are whatever the week allows, and an urgent bug competes with whatever else is on.",
    method:
      "Named owners who already know the system, published response times by severity, and a monthly report of what was raised and what was fixed. Maintenance work is budgeted rather than squeezed in: dependency updates and the small decay that turns into an incident get their own allocation.",
  },
  "security-compliance-engineering": {
    problem:
      "A customer's third-party risk review has arrived as a spreadsheet with two hundred rows, and most of the answers exist only in people's heads. The deal is waiting on it, and the honest answers are worse than they need to be because nothing was recorded as it was built.",
    method:
      "We build the controls and the evidence together: access reviewed and logged, secrets and dependencies scanned in CI with builds failing on high and critical findings, deploys auditable to a person and a commit. Then the questionnaire is answered from artefacts rather than recollection. Where the answer is no, we say no and write the plan.",
  },
};
