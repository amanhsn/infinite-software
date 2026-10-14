# Architecture

How the site is put together, and why it is put together that way.

---

## The shape of it

```
content/  ──▶  app/  ──▶  static HTML
   │             │
   │             └──▶ /api/contact  ──▶  Notion
   │
   └──▶ components/ render it
```

A typed content layer drives a set of route templates. Almost every page is
prerendered at build time. One route — the contact form's endpoint — runs on a
server. That is the entire system.

---

## Content is data, not markup

`content/` holds the copy as typed TypeScript objects. `app/` holds templates
that read them. The two never mix: there is no prose hardcoded into a component,
and no layout decisions inside a content file.

This buys three things:

1. **Copy can be edited without reading React.** See
   [content-editing.md](content-editing.md).
2. **Structure is enforced at build time.** `content/service-copy.ts` is typed as
   `Record<LeafSlug, LeafCopy>`, where `LeafSlug` is derived from
   `content/services.ts`. Add a service without its copy and the build fails
   naming the missing slug — rather than publishing a page with an empty column.
3. **One fact lives in one place.** The services taxonomy is written once and
   drives the mega-menu, the footer column, the homepage cards, the service index,
   27 leaf pages, both `generateStaticParams` calls, the Open Graph images, and
   the contact form's interest checkboxes. There is no second list to keep in sync.

The same pattern holds across the content layer: `content/industries.ts` stores
`related` as `"category/leaf"` paths into the taxonomy, so an industry page
cannot link to a service that does not exist.

---

## Routing

App Router, file-based. The dynamic segments are:

| Route | Generates | From |
| --- | --- | --- |
| `app/services/[category]/` | 4 pages | `content/services.ts` |
| `app/services/[category]/[slug]/` | 27 pages | `content/services.ts` + `service-copy.ts` |
| `app/industries/[slug]/` | 6 pages | `content/industries.ts` |
| `app/insights/[slug]/` | 3 pages | `content/insights.ts` |

All of them use `generateStaticParams`, so they are HTML on disk after a build,
not server-rendered on request.

**Every URL ends in a slash** (`trailingSlash: true`). This matched the original
static prototype the site was ported from, which means links already in the wild
still resolve. Turning it off would require a redirect for every path.

---

## Components

| Folder | Contains | Rule |
| --- | --- | --- |
| `layout/` | Nav, Footer, PageHeader, SkipLink, SvgSprite | Appear on every page |
| `primitives/` | Button, Section, Plate, Logo, Arrow | No business logic, no content |
| `sections/` | ContactForm, ContactBand, WorkCards, LegalPage, ComingSoon | Composed page blocks |
| `visuals/` | HeroArc, ClientStrip, ProductMock, LeadTimeTrend | Decorative / illustrative |

`Plate` is the artwork component. It renders JPEG only, deliberately: image
optimisation is off, so Next emits no alternate formats and a `<picture>` element
would have to carry them by hand. AVIF was tried and dropped — the encoder
available on the build machine wrote structurally valid files containing no image
data, which only shows up on screen. The reasoning is written in full at the top
of `components/primitives/Plate.tsx`.

---

## Design tokens

`app/globals.css` defines the whole visual system as Tailwind v4 `@theme`
tokens — colour, type scale, spacing, radii, breakpoints. Every value traces back
to the brand book (`brand/build-brand-book.py`), which is cited by line number in
the file's header.

The file opens by **deleting Tailwind's stock scales**:

```css
--color-*: initial;
--radius-*: initial;
--breakpoint-*: initial;
--font-*: initial;
```

After that, `bg-slate-500` and `rounded-lg` do not exist. Brand drift becomes a
build error instead of something a reviewer has to catch by eye.

The brand is **light-committed by written decision** (brand book §14). There is
no `prefers-color-scheme` block and no `dark:` variant anywhere, and that is not
an oversight.

---

## Fonts

Figtree (text) and IBM Plex Mono (figures only), self-hosted as woff2 in
`public/fonts/` and loaded through `next/font/local`.

Self-hosted rather than `next/font/google` because the Google loader fetches at
build time, which makes the build non-hermetic and fails outright on an offline
or network-restricted CI runner.

---

## The logomark

`lib/logo-geometry.ts` generates the mark parametrically — a Möbius band on a
Gerono lemniscate — from the same constants the brand book's generator uses. It
is not pasted path data. The mark in the site and the mark in the brand book are
therefore derived from one source and cannot drift apart.

---

## The contact form

The only part of the site that is not static.

```
ContactForm (client)  ──POST──▶  /api/contact  ──▶  Notion API
      │                              │
      └── lib/contact.ts ────────────┘
          shared validation
```

`lib/contact.ts` holds the field shape and the validation rules, imported by both
sides. The client check is a courtesy so the message next to a field matches what
the server would say; the server check is the one that decides, and it trusts
nothing the client sent.

The endpoint (`app/api/contact/route.ts`) also carries:

- **A honeypot field** (`website`), hidden from people. Filled in, it answers
  `200` so the bot records a success and doesn't retry — but stores nothing.
- **A rate limit**, 5 per minute per IP, in process memory. Serverless instances
  don't share memory, so this slows one stuck browser rather than stopping a
  distributed attack. That is what it is for.
- **Both submission shapes** — JSON from `fetch`, and urlencoded from a plain form
  post, so the form works without JavaScript.
- **Loud failure.** If `NOTION_TOKEN` is missing or Notion refuses the write, the
  visitor sees an error and an email fallback. A form that accepts a message and
  drops it is worse than one that is visibly broken, because nobody finds out for
  months.

Submissions land as one row per enquiry in a Notion database, with the brief
duplicated into the page body — a Notion `rich_text` property truncates at 2000
characters without saying so.

---

## Open Graph images

Generated at build time by `lib/og.tsx` using Next's `ImageResponse`. Every
service category and industry page gets its own card. They are emitted without a
file extension, which matters on Apache — see the `ForceType` block in
`public/.htaccess`.

---

## Build strictness

| Check | Setting |
| --- | --- |
| TypeScript errors | Fail the build (`typescript.ignoreBuildErrors: false`) |
| Content completeness | Enforced by the types in `content/` |
| ESLint | Runs separately via `pnpm lint` — Next 16 removed the config key |

Run `pnpm build` before pushing. If it passes, the content layer is coherent.
