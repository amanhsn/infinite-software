/**
 * The published articles.
 *
 * Each one is drawn from work that actually shipped on the pharmacy
 * last-mile platform, which is the standard the /insights/ page sets for
 * itself: specific, written by the people who did it, and including the
 * part where the first approach was wrong.
 *
 * BYLINE: attributed to the engineering team rather than an individual.
 * Team profiles are off by the company's decision, so there is no name to
 * put here yet. Swap `author` for a person the moment there is one — the
 * editorial standard on the index page promises a named engineer.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  list?: string[];
};

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  /** Shown on cards; the opening line of the piece in one sentence. */
  summary: string;
  author: string;
  published: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  sections: ArticleSection[];
};

export const articles: readonly Article[] = [
  {
    slug: "the-address-not-the-phone-number",
    title: "The address, not the phone number",
    standfirst:
      "We watched people raise orders at a pharmacy counter for a morning. The form we thought was finished had three things wrong with it, and none of them were bugs.",
    summary:
      "A finished form, a morning at the counter, and nine findings that shipped in one release.",
    author: "Infinite engineering",
    published: "2026-10-10",
    readingTime: "5 min read",
    image: "/img/insights/address-not-phone-number",
    imageAlt:
      "A milled aluminium ribbon threading precisely through a single narrow slot cut in a white block.",
    sections: [
      {
        heading: "The form worked",
        paragraphs: [
          "Order creation on the platform did what the specification said. You searched for a customer, picked them from a list, filled in the order, and submitted it. Every field validated. Nothing errored. By any test we had written, it was done.",
          "Then we spent a morning standing behind the counter watching pharmacy staff use it, and it became obvious that the search result was showing the wrong thing.",
        ],
      },
      {
        heading: "Why the phone number was the wrong identifier",
        paragraphs: [
          "The customer picker showed a name and a phone number. That is the natural choice when you are designing against a database, because the phone number is unique, stable and short. It identifies the record unambiguously.",
          "It does not identify the person. Pharmacy staff were not trying to confirm they had the right row; they were trying to confirm they had the right delivery. Two patients share a surname, and what tells them apart is the address the medication is going to. Staff were selecting a customer, opening the order, scrolling to the address, checking it, and going back if it was wrong.",
          "We swapped the phone number for the delivery address at the point of selection, and confirmed it again in the flow. The database did not change. The query did not change. The thing on screen changed, and a four-step check became one.",
        ],
      },
      {
        heading: "The field that filled itself in",
        paragraphs: [
          "The order had a required field called \"Submitted by\". It was free text. Every person using it typed their own name into it, every time, correctly, because they knew who they were.",
          "A required free-text field whose value is already known to the system is not data capture. It is a toll. We filled it from the session user and made it read-only, which removed a field from a form that people complete dozens of times a day.",
          "This is the least interesting change we made and probably the one that saved the most time.",
        ],
      },
      {
        heading: "The target nobody could hit",
        paragraphs: [
          "Opening an order meant finding a small icon button at the end of a crowded table row. Our own audit had flagged icon-only actions as a recall burden months earlier, and we had left it because it was correct: the icon had a label, the label was accurate, the control was keyboard reachable.",
          "Correct is not the same as usable at speed. We made the whole row open the order and kept an explicit control for keyboard and assistive-technology users, because making a row clickable and calling it done would have moved the problem onto the people least able to work around it.",
        ],
      },
      {
        heading: "Nine findings, one release",
        paragraphs: [
          "The review produced nine changes worth making. We shipped them together rather than spreading them across a quarter of sprints, because individually each one is too small to be worth a release note and collectively they are the difference between a form people tolerate and a form they stop noticing.",
          "What we would do differently is go and watch earlier. Everything in that list was findable in one morning at the counter, and none of it was findable from the specification, the ticket, or the test suite. The specification described the order. The counter described the job.",
        ],
      },
    ],
  },
  {
    slug: "a-design-system-is-a-deletion-project",
    title: "A design system is mostly a deletion project",
    standfirst:
      "Two files now generate every colour, type size and spacing value in the product. Building them took a fortnight. Removing what they replaced took considerably longer.",
    summary:
      "Two token files, sixteen documented components, and the unglamorous part nobody budgets for.",
    author: "Infinite engineering",
    published: "2026-10-10",
    readingTime: "6 min read",
    image: "/img/insights/design-system-deletion",
    imageAlt:
      "Scattered aluminium offcuts on the left resolving into one continuous anodised ribbon on the right.",
    sections: [
      {
        heading: "What a year of decisions looks like",
        paragraphs: [
          "Styling on the platform had been decided screen by screen for about a year, by several people, all of them reasonable. The result was the usual: a greenish teal and a slightly different greenish teal, four spacing scales, a card that had been reimplemented five times because finding the existing one was slower than writing a new one.",
          "None of that is a failure of discipline. It is what happens when every screen is shipped under its own deadline and there is nowhere for a shared decision to live.",
        ],
      },
      {
        heading: "Two files, one direction of travel",
        paragraphs: [
          "The source of truth is two JSON files. Primitives hold the raw values — the actual colours, the actual steps on the type scale. Semantics map intent onto those primitives: what a surface is, what a border is, what a danger state is. Nothing else may invent a value.",
          "A build step generates two things from them: the CSS custom properties the application consumes, and typed token objects the engineers import. That second output is what makes the system hold. An invented value is now a type error rather than a code-review conversation, and type errors do not depend on the reviewer being awake.",
          "Light and dark stopped being two stylesheets and became one switch on a data attribute, because the semantic layer is the only thing that differs between them.",
        ],
      },
      {
        heading: "Where we got it wrong first",
        paragraphs: [
          "We seeded the token files with provisional values before the design file had been reconciled, so that the pipeline could be built and tested against something. That was the right call for the pipeline and the wrong one for everybody else, because provisional values that render correctly are indistinguishable from final ones.",
          "For a few weeks the system looked finished and was not, and work got built on top of numbers we intended to change. The fix was procedural rather than technical: mark the provisional values as provisional in a place the build can see, and reconcile against the design file before anything downstream consumes them.",
          "The general version of this lesson: a placeholder that looks like the real thing is worse than no placeholder at all. It removes the one signal that would have told somebody to wait.",
        ],
      },
      {
        heading: "Sixteen components, documented",
        paragraphs: [
          "The component library is deliberately small. Sixteen documented components, each built strictly on the token layer, each with its states rendered in a catalogue an engineer can open rather than guess at.",
          "A small library used everywhere beats a large one used occasionally. Every component we added had to earn its place by replacing at least two existing implementations, which is a rule that keeps a design system from quietly becoming another thing to maintain.",
        ],
      },
      {
        heading: "The part nobody budgets for",
        paragraphs: [
          "Building the pipeline was about a fortnight. Migrating the product onto it, and deleting what it replaced, took considerably longer and was most of the actual value.",
          "A design system that exists alongside the old styling has not reduced anything; it has added a second way to do everything. The work that matters is the removal, and it is the work that is easiest to defer because nothing visibly breaks when you skip it. If you are scoping one of these, scope the deletion. That is the project.",
        ],
      },
    ],
  },
  {
    slug: "proof-of-delivery-is-a-dispute-feature",
    title: "Proof of delivery is a dispute-resolution feature",
    standfirst:
      "A patient said their medication never arrived. It had been left at reception with a colleague. Nothing in the system could settle that, and settling it is the whole point.",
    summary:
      "A signature is not proof. What a delivery record needs to carry to end an argument.",
    author: "Infinite engineering",
    published: "2026-10-10",
    readingTime: "5 min read",
    image: "/img/insights/proof-of-delivery",
    imageAlt:
      "Two interlocking milled aluminium rings clasped together like a seal.",
    sections: [
      {
        heading: "The call that has no good answer",
        paragraphs: [
          "A patient rang the pharmacy to say their delivery had not arrived. The record said delivered, with a signature and a timestamp. Both were true. The medication had been left at a reception desk with somebody who worked in the building, and the patient had never been told.",
          "At that point the pharmacy has no way to resolve the call except to send someone to look. The delivery record proved that a delivery happened. It could not say to whom, which is the only fact that mattered.",
        ],
      },
      {
        heading: "A signature is not proof",
        paragraphs: [
          "We had treated the signature as the end of the chain, the way most delivery systems do. It is not. A signature proves that somebody accepted the parcel. In a residential delivery that somebody is usually the patient; in practice it is frequently a neighbour, a receptionist, a family member or a care worker.",
          "The record now captures who received it and in what capacity — the name, and the relationship to the patient. Two extra fields, captured at the door by the person already standing there with a device in their hand.",
          "The cost of collecting them is a few seconds per delivery. The cost of not collecting them is an unresolvable phone call, a replacement dispensed at the pharmacy's expense, and in the worst case a controlled medication nobody can account for.",
        ],
      },
      {
        heading: "The report is the interface",
        paragraphs: [
          "Most of the value of that data arrives in a format nobody designs with much care: the export. Pharmacies hand these to auditors, to insurers, and to patients' families, and the thing being evaluated is the pharmacy's competence.",
          "So the delivery report prints the whole chain on one page — status, pharmacy, customer, tags, amount requested against amount collected, prep time, actual completion, courier, signature, and the estimated completion it is being measured against. Eleven columns, chosen because each one has been the answer to a question somebody actually asked.",
        ],
        list: [
          "Amount requested against amount collected, side by side, because the gap is the question",
          "Prep time and actual completion, so a slow delivery can be attributed to the right half of the process",
          "Cold-chain handling flagged on the row rather than in a separate system",
          "Who received it, and in what capacity",
        ],
      },
      {
        heading: "Patterns, not just records",
        paragraphs: [
          "Once the data exists per delivery, the useful question becomes which patients this keeps happening to. A patient with repeated missed deliveries or failed contact attempts is not a data point; they are usually someone who is elderly, unwell, or does not answer an unknown number.",
          "The platform now counts those events per customer and raises an alert on the profile when the count crosses a threshold, so staff see it when they open the record rather than discovering it on the third failed attempt. That is a small feature that exists only because somebody wrote down what went wrong the first time instead of resolving the ticket and moving on.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

/** Written out longhand: the published date is a fact, not a relative one. */
export const formatPublished = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
