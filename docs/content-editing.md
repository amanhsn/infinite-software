# Editing the site's copy

Every word on the site lives in `content/` as plain TypeScript. There is no CMS
and no admin login. You edit a file, save, and the page updates.

If you are comfortable editing a text file and running two commands, you can
change anything on this site without touching React.

---

## The golden rule

> **Change the text between the quote marks. Leave everything else alone.**

```ts
{ slug: "ai-governance", name: "AI governance", summary: "Policy, audit trail and human review, written for a regulator." },
          ↑ don't touch           ↑ safe to edit     ↑ safe to edit
```

`slug` is the URL. Changing it changes the page's address and breaks any link
pointing at the old one — including Google's. Treat slugs as permanent.

### Special characters

The copy uses real typographic characters, not HTML codes. Type `&` as `&`, not
`&amp;`. React handles escaping on output, so an HTML entity would be shown to
the reader literally.

If your text contains a double quote, either use curly quotes (`"` `"`) or escape
it with a backslash: `"She said \"no\"."`

---

## What is in which file

| File | Controls |
| --- | --- |
| `site.ts` | Company name, tagline, email, office addresses, meta description |
| `home.ts` | Homepage hero, the five differentiators, the three steps, engagement models |
| `services.ts` | The services taxonomy — 4 categories, 27 services. Drives nav, footer, URLs |
| `service-copy.ts` | The two paragraphs on each of the 27 service pages |
| `industries.ts` | The 6 industry pages and their challenges |
| `insights.ts` | Published articles, in full |
| `clients.ts` | Named clients, the case study, the work write-ups |
| `company.ts` | `/company/`, `/company/team/`, `/company/careers/`, `/company/locations/` |
| `how-we-work.ts` | `/how-we-work/` and its two sub-pages |
| `legal.ts` | Privacy, terms, security and accessibility pages |
| `navigation.ts` | The nav and footer menus |
| `types.ts` | Type definitions. Don't edit unless you're changing structure |

---

## Common jobs

### Change a piece of copy

Find the text (search across `content/` for a distinctive phrase), edit it, save.
That is the whole job.

```bash
grep -rn "the same squad" content/
```

### Change the company email or address

`content/site.ts`. It appears in the footer, the contact page, the privacy
policy and the contact form's error message — all from this one place.

### Add a new service

Two files, and the build will tell you if you forget the second one.

1. **`content/services.ts`** — add a leaf to the right category:

   ```ts
   { slug: "platform-security-reviews", name: "Platform security reviews", summary: "One sentence, shown on cards." },
   ```

2. **`content/service-copy.ts`** — add the page copy under the same slug:

   ```ts
   "platform-security-reviews": {
     problem: "The situation the reader is in, in their words, second person.",
     method:  "What actually happens. Week one, the first thing they get, who is in the room.",
   },
   ```

3. **Add artwork** at `public/img/services/<category>/<slug>.jpg`.

The page, its URL, its nav entry, its footer link and its Open Graph card all
appear by themselves. If you skip step 2, `pnpm build` fails with a type error
naming the missing slug — that is the safety net working, not a bug.

### Add an industry

`content/industries.ts`, plus artwork at `public/img/industries/<slug>.jpg`.
The `related` array holds `"category/leaf"` paths into the services taxonomy, so
an industry cannot link to a service that doesn't exist.

### Publish an article

`content/insights.ts`. Copy an existing article object and replace its fields —
`slug`, `title`, `standfirst`, `summary`, `author`, `published`, `readingTime`,
and the `sections` array. Artwork goes at `public/img/insights/<slug>.jpg`.

> Note in the file: articles are currently bylined to the engineering team
> because team profiles are switched off. The `/insights/` page promises a named
> engineer, so swap `author` for a person as soon as there is one.

### Add a client logo

`content/clients.ts`, plus the logo at `public/img/clients/`. Set `logoWidth` and
`logoHeight` to the file's real pixel dimensions — the layout uses them to
reserve space, and wrong numbers cause the page to jump while loading.

Only name a client you have written permission to name.

---

## Images

Drop files in `public/img/<section>/`. They are served at `/img/<section>/<file>`
with no processing — image optimisation is off (`next.config.ts` explains why),
so **export at the size you want served**.

- Photography and artwork: JPEG, roughly 1600px wide, quality 80.
- Logos and marks: PNG with transparency, or SVG.
- Name the file after the slug of the page it belongs to.

---

## Before you commit

```bash
pnpm build
```

If it passes, the change is safe. The build is strict on purpose: a missing
service page, a broken internal link into the taxonomy, or a type error will
stop it rather than reach the live site.

```bash
pnpm dev   # see it at http://localhost:3000 first
```
