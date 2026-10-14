/**
 * The four policy pages.
 *
 * These are operative documents: a retention period named here is a
 * commitment, and a certification claimed here is a representation a
 * client's risk team will test. Every value is now stated rather than
 * marked outstanding, on the terms the company supplied — Ontario entity,
 * one public contact address, no certifications held, no analytics.
 *
 * Where no external attestation exists the page says so plainly. That is
 * the point of these documents: a security page that claims an audit it
 * has not had fails the first review it meets.
 *
 * Changing a value here changes a commitment. Counsel should see the diff.
 */

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  lede: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

/** Reviewed and published together, so they carry one date. */
const UPDATED = "9 October 2026";

export const privacy: LegalDoc = {
  title: "Privacy",
  description: "How we handle personal data, and what we do not do with it.",
  updated: UPDATED,
  lede:
    "This describes what we collect, why, and how long we keep it. It is written to be read rather than to be technically survivable.",
  sections: [
    {
      heading: "Who this covers",
      body: [
        "This policy applies to Infinite Software Solutions, operating from Ontario, Canada, and to the websites and services it operates. Client project data handled under a services agreement is governed by that agreement, not by this page.",
        "Questions about anything here go to hello@infinite.dev.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "From the contact form: your name, your email address, your company, your role, the service areas you tick, and whatever you choose to write in the message field. We also record when it arrived and which page it was sent from. Nothing on this site asks for information a first conversation does not need.",
        "From ordinary web serving: request logs containing IP address, user agent and requested path, retained for 30 days and then discarded.",
        "No analytics. This site runs no analytics product, sets no tracking cookies and embeds no third-party pixels, so there is no opt-out to offer and nothing to consent to.",
      ],
    },
    {
      heading: "Why we hold it",
      body: [
        "To answer you, to carry out a contract you are party to, and to meet record-keeping obligations. We do not sell personal data and we do not share it for advertising.",
        "Our lawful basis under Canada's Personal Information Protection and Electronic Documents Act is your consent, given when you send us a message, together with the legitimate requirements of performing a contract you have entered into.",
      ],
    },
    {
      heading: "Where it is held",
      body: [
        "Two sub-processors, named rather than described. This website is hosted by Vercel Inc. Enquiries sent through the contact form are stored in Notion, operated by Notion Labs Inc. Both are United States companies and your enquiry is held on their infrastructure, which means it leaves Canada. If that matters to you, email us instead of using the form and it stays in our mailbox.",
        "Data residency for client project work is a different question with a different answer. It is set per engagement and written into the contract, and we build and hold client infrastructure in the country the client requires — this page governs enquiries to us, not the systems we run for you.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries that do not become engagements are deleted after 24 months. Records attached to a contract are kept for six years from the end of the tax year they relate to, which is what Canada Revenue Agency record-keeping rules require of us.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Write to hello@infinite.dev and you will get a response within 30 days.",
        "If you are not satisfied you can complain to the Office of the Privacy Commissioner of Canada.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms",
  description: "The terms covering use of this website.",
  updated: UPDATED,
  lede:
    "These terms cover this website. They are not the terms of any engagement, which live in a signed services agreement and take precedence over everything here.",
  sections: [
    {
      heading: "This site is not an offer",
      body: [
        "Nothing on this website is a quote, a commitment to a price, or a warranty about a result. Scope, price and service levels exist only in a signed agreement.",
        "Descriptions of method describe how we intend to work. They do not create a contractual obligation on their own.",
      ],
    },
    {
      heading: "Accuracy",
      body: [
        "We try to keep this site correct and current, and we do not guarantee that it is either. Figures, case studies and capability statements are accurate as at the date of publication and may go out of date without the page changing.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The name, the logomark, the written content and the artwork on this site belong to Infinite Software Solutions. Client names and marks, where they appear, belong to those clients and are used with permission.",
        "You may quote and link to this material with attribution. You may not reproduce it wholesale or present it as your own.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "To the extent permitted by the law of Ontario, Canada, we are not liable for loss arising from reliance on this website. Nothing here limits liability that cannot lawfully be limited.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the law of Ontario and the federal laws of Canada applicable in it, and the courts of Ontario have exclusive jurisdiction.",
      ],
    },
  ],
};

export const security: LegalDoc = {
  title: "Security",
  description: "How we handle access, code and incidents, and what we have not certified.",
  updated: UPDATED,
  lede:
    "What a risk review usually asks for, answered plainly. Where we hold a certification we will name it, and where we do not we say so rather than implying one.",
  sections: [
    {
      heading: "Certifications",
      body: [
        "We hold no ISO 27001 certification and no SOC 2 attestation. Neither has been pursued yet, and we would rather state that than describe ourselves as aligned with a standard we have not been audited against.",
        "If a procurement process needs a specific attestation, ask before the pitch so the answer is not a surprise later. We will tell you what we can evidence instead, which is usually the controls below plus whatever your own environment already enforces.",
      ],
    },
    {
      heading: "Access control",
      body: [
        "Access to client systems is granted per engagement, to named individuals, through single sign-on with multi-factor authentication required on every account. No shared logins, and no standing production access for anyone who does not need it that week.",
        "Access is reviewed quarterly and revoked within 24 hours of someone leaving an engagement. We work in your environment under your controls wherever you have them; where you do not, we bring ours and document what they are.",
      ],
    },
    {
      heading: "Code and dependencies",
      body: [
        "Every change is reviewed by someone who did not write it. Dependency and secret scanning run in CI, and builds fail on high and critical findings rather than warning and continuing.",
        "Production access is separated from development access, and deploys are auditable to a person and a commit.",
      ],
    },
    {
      heading: "Incidents",
      body: [
        "If we become aware of a breach affecting your data we will tell you within 72 hours, with what is known at the time rather than after the investigation concludes.",
        "Post-incident reviews are shared with the client, including the parts that reflect badly on us.",
      ],
    },
    {
      heading: "Reporting something",
      body: [
        "If you have found a vulnerability in something we run, write to hello@infinite.dev. We will acknowledge within two business days and we will not pursue anyone who reports in good faith.",
      ],
    },
  ],
};

export const accessibility: LegalDoc = {
  title: "Accessibility",
  description: "Our accessibility commitment, the standard we build to, and where we fall short.",
  updated: UPDATED,
  lede:
    "A statement worth reading is one that names what is not yet fixed. This one names two things, and one of them is that nobody independent has checked.",
  sections: [
    {
      heading: "The standard",
      body: [
        "We build to WCAG 2.2 Level AA. Ontario's Integrated Accessibility Standards Regulation, made under the Accessibility for Ontarians with Disabilities Act, requires WCAG 2.0 Level AA of organisations with 50 or more employees; we are below that threshold, so the obligation does not yet apply to us and we hold ourselves to the later standard anyway.",
        "That standard applies to what we build for clients as well as to this site. Accessibility is part of the definition of done rather than a remediation phase.",
      ],
    },
    {
      heading: "How this site was built",
      body: [
        "Semantic structure, a visible focus state on every interactive element, a skip link, and text that meets contrast minimums against the surface behind it. Motion is limited to a single load sequence and respects a reduced-motion preference.",
        "The colour system was checked at the token level so that body text never lands on a part of the gradient where it drops below the contrast minimum. Decorative artwork is hidden from assistive technology, and nothing it carries is information stated nowhere else.",
      ],
    },
    {
      heading: "Where it falls short",
      body: [
        "Two known issues. No independent audit has been carried out, so the checks behind this page are our own. And the site has not been tested end to end by someone who uses a screen reader daily, which is a different and better test than ours.",
        "Last reviewed internally on 9 October 2026. This section is the reason the page exists: a statement that claims full conformance and lists nothing has usually not been tested.",
      ],
    },
    {
      heading: "Telling us about a barrier",
      body: [
        "If something here stopped you, write to hello@infinite.dev. We will respond within 30 days and tell you whether it is being fixed and when, rather than only thanking you for the feedback.",
      ],
    },
  ],
};
