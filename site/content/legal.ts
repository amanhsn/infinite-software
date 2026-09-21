/**
 * Drafts for the four policy pages.
 *
 * These are operative documents. A privacy policy that names a retention
 * period is a commitment, and a security page that claims a certification
 * is a representation a client's risk team will test. Nobody has supplied
 * those facts, so every one of them is written as a `[[...]]` token and
 * rendered as a visible unconfirmed marker rather than as prose.
 *
 * The structure is real and reviewable. The facts are deliberately absent.
 * None of this ships until counsel and whoever owns the infrastructure have
 * replaced every marker on the page.
 */

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  lede: string;
  description: string;
  sections: LegalSection[];
};

export const privacy: LegalDoc = {
  title: "Privacy",
  description: "How we handle personal data, and what we do not do with it.",
  lede:
    "This describes what we collect, why, and how long we keep it. It is written to be read rather than to be technically survivable, and the specifics still need confirming.",
  sections: [
    {
      heading: "Who this covers",
      body: [
        "This policy applies to [[LEGAL ENTITY NAME]], registered in [[JURISDICTION]], and to the websites and services it operates. Client project data handled under a services agreement is governed by that agreement, not by this page.",
        "Questions about anything here go to [[PRIVACY CONTACT ADDRESS]].",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "From the contact form: your name, your email address, your company, and whatever you choose to write in the message field. Nothing on this site asks for information a first conversation does not need.",
        "From ordinary web serving: request logs containing IP address, user agent and requested path, retained for [[LOG RETENTION PERIOD]].",
        "Analytics: [[ANALYTICS PROVIDER, OR CONFIRM THERE IS NONE]]. If a provider is named here, the cookie behaviour and the opt-out route belong in this paragraph.",
      ],
    },
    {
      heading: "Why we hold it",
      body: [
        "To answer you, to carry out a contract you are party to, and to meet record-keeping obligations. We do not sell personal data and we do not share it for advertising.",
        "Our lawful basis under [[APPLICABLE PRIVACY LAW]] is [[LAWFUL BASIS]].",
      ],
    },
    {
      heading: "Where it is held",
      body: [
        "Personal data submitted through this site is stored in [[HOSTING REGION]] and processed by the sub-processors listed at [[SUB-PROCESSOR LIST LOCATION]].",
        "Data residency for client project work is set per engagement and written into the contract. It is not governed by this page.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries that do not become engagements are deleted after [[ENQUIRY RETENTION PERIOD]]. Records attached to a contract are kept for [[CONTRACT RECORD RETENTION PERIOD]] to meet [[STATUTORY REQUIREMENT]].",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Write to [[PRIVACY CONTACT ADDRESS]] and you will get a response within [[RESPONSE WINDOW]].",
        "If you are not satisfied you can complain to [[SUPERVISORY AUTHORITY]].",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms",
  description: "The terms covering use of this website.",
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
        "The name, the logomark, the written content and the artwork on this site belong to [[LEGAL ENTITY NAME]]. Client names and marks, where they appear, belong to those clients and are used with permission.",
        "You may quote and link to this material with attribution. You may not reproduce it wholesale or present it as your own.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "To the extent permitted by the law of [[GOVERNING JURISDICTION]], we are not liable for loss arising from reliance on this website. Nothing here limits liability that cannot lawfully be limited.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the law of [[GOVERNING JURISDICTION]], and the courts of [[VENUE]] have exclusive jurisdiction.",
      ],
    },
  ],
};

export const security: LegalDoc = {
  title: "Security",
  description: "How we handle access, code and incidents, and what we have not certified.",
  lede:
    "What a risk review usually asks for, answered plainly. Where we hold a certification we will name it, and where we do not we will say so rather than implying one.",
  sections: [
    {
      heading: "Certifications",
      body: [
        "Current certifications: [[ISO 27001 / SOC 2 STATUS, OR CONFIRM NONE HELD]].",
        "We would rather state no certification than gesture at being aligned with a standard we have not been audited against. If a procurement process needs a specific attestation, ask before the pitch so the answer is not a surprise later.",
      ],
    },
    {
      heading: "Access control",
      body: [
        "Access to client systems is granted per engagement, to named individuals, through [[IDENTITY PROVIDER AND MFA POLICY]]. Access is reviewed [[ACCESS REVIEW CADENCE]] and revoked within [[OFFBOARDING WINDOW]] of someone leaving an engagement.",
        "We work in your environment under your controls wherever you have them. Where you do not, we bring ours and document what they are.",
      ],
    },
    {
      heading: "Code and dependencies",
      body: [
        "Every change is reviewed by someone who did not write it. Dependency and secret scanning run in CI, and builds fail on [[SEVERITY THRESHOLD]].",
        "Production access is separated from development access, and deploys are auditable to a person and a commit.",
      ],
    },
    {
      heading: "Incidents",
      body: [
        "If we become aware of a breach affecting your data we will tell you within [[BREACH NOTIFICATION WINDOW]], with what is known at the time rather than after the investigation concludes.",
        "Post-incident reviews are shared with the client, including the parts that reflect badly on us.",
      ],
    },
    {
      heading: "Reporting something",
      body: [
        "If you have found a vulnerability in something we run, write to [[SECURITY CONTACT ADDRESS]]. We will acknowledge within [[ACKNOWLEDGEMENT WINDOW]] and we will not pursue anyone who reports in good faith.",
      ],
    },
  ],
};

export const accessibility: LegalDoc = {
  title: "Accessibility",
  description: "Our accessibility commitment, the standard we build to, and where we fall short.",
  lede:
    "A statement worth reading is one that names what is not yet fixed. This one is written to do that, once the audit it depends on has been run.",
  sections: [
    {
      heading: "The standard",
      body: [
        "We build to WCAG 2.2 Level AA. Under [[APPLICABLE ACCESSIBILITY LEGISLATION]] we are additionally required to meet [[SPECIFIC OBLIGATION]].",
        "That standard applies to what we build for clients as well as to this site. Accessibility is part of the definition of done rather than a remediation phase.",
      ],
    },
    {
      heading: "How this site was built",
      body: [
        "Semantic structure, a visible focus state on every interactive element, a skip link, and text that meets contrast minimums against the surface behind it. Motion is limited to a single load sequence and respects a reduced-motion preference.",
        "The colour system was checked at the token level so that body text never lands on a part of the gradient where it drops below the contrast minimum.",
      ],
    },
    {
      heading: "Where it falls short",
      body: [
        "Known issues: [[AUDIT FINDINGS TO BE LISTED]]. Last audited: [[AUDIT DATE]] by [[AUDITOR]].",
        "This section is the reason the page exists. A statement that claims full conformance and lists nothing has usually not been tested.",
      ],
    },
    {
      heading: "Telling us about a barrier",
      body: [
        "If something here stopped you, write to [[ACCESSIBILITY CONTACT ADDRESS]]. We will respond within [[RESPONSE WINDOW]] and tell you whether it is being fixed and when, rather than only thanking you for the feedback.",
      ],
    },
  ],
};
