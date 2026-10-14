# Infinite — marketing site

The website for **Infinite Software Solutions**, a Canadian software house.
Live at **[infinitesofteware.com](https://infinitesofteware.com)**.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · deployed on Vercel.

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in NOTION_TOKEN to make /contact work
pnpm dev                     # http://localhost:3000
```

The site runs without `.env.local`. Only the contact form needs it — without a
token the form shows an error and an email fallback rather than pretending to
have sent anything.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server with hot reload |
| `pnpm build` | Production build — run this before pushing |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript, no emit |

`pnpm` is required — the lockfile and `packageManager` field pin it. `npm install`
will produce a different dependency tree.

---

## Where things are

```
.
├── app/            Routes. One folder per URL, App Router conventions.
│   ├── api/contact/    The contact form's endpoint (Notion)
│   ├── services/       4 categories × 27 leaf pages, generated from content/
│   ├── industries/     6 sector pages, generated from content/
│   ├── insights/       3 articles, generated from content/
│   └── …               company, how-we-work, work, contact, legal pages
├── components/     React components
│   ├── layout/         Nav, Footer, PageHeader, SkipLink, SvgSprite
│   ├── primitives/     Button, Section, Plate, Logo, Arrow
│   ├── sections/       ContactForm, ContactBand, WorkCards, LegalPage…
│   └── visuals/        HeroArc, ClientStrip, ProductMock, LeadTimeTrend
├── content/        ★ All site copy. Plain TypeScript, no CMS.
├── lib/            Shared logic — form validation, OG images, logo geometry
├── public/         Static files served at the root: fonts, images, .htaccess
├── brand/          Brand book and identity artwork (not part of the site)
└── docs/           The documents below
```

**Almost every text change you want to make is in `content/`.** You do not need to
open `app/` to change wording, add a service, or publish an article.

---

## Documentation

| Document | Read it when |
| --- | --- |
| **[docs/content-editing.md](docs/content-editing.md)** | You want to change copy, add a service, industry or article |
| **[docs/architecture.md](docs/architecture.md)** | You want to understand how the site is put together |
| **[docs/deployment.md](docs/deployment.md)** | You are deploying, setting env vars, or moving hosts |
| **[brand/README.md](brand/README.md)** | You need the logo, colours or type rules |

---

## Things worth knowing before you change anything

- **URLs all end in a slash.** `/services/ai-engineering/` — set by `trailingSlash`
  in `next.config.ts`. Changing it breaks every existing inbound link.
- **The content layer is typed.** Adding a service to `content/services.ts` without
  adding its copy to `content/service-copy.ts` fails the build instead of shipping
  an empty page. That is deliberate.
- **No phone number is published anywhere.** A 1-800 line was requested and does
  not exist yet; see the note at the top of `content/site.ts`.
- **The site is a static build plus one dynamic route.** Everything prerenders
  except `/api/contact`, which needs a server. That rules out pure static hosting
  unless the handler is rewritten — see `docs/deployment.md`.
