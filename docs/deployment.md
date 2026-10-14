# Deployment

The site is hosted on **Vercel** at `infinitesofteware.com`, built from this
repository's `main` branch.

---

## ⚠️ One-time action required after the repo restructure

The Next.js app used to live in a `site/` subfolder and now sits at the
repository root. **The Vercel project still points at the old folder.** Until
this is changed, deploys will fail with "No Next.js version detected".

> **Vercel dashboard → the `infinitesoftwaresolutions` project → Settings →
> Build and Deployment → Root Directory → change `site` to empty → Save →
> Redeploy.**

Nothing else about the project needs to change. This has not been done yet
because it is a dashboard setting, not a file in this repository.

---

## Environment variables

Set in **Vercel → Settings → Environment Variables**, not in a committed file.
`.env.example` in the repo root is the template; copy it to `.env.local` for
local development.

| Variable | Required | What it is |
| --- | --- | --- |
| `NOTION_TOKEN` | **Yes** — the contact form breaks without it | Notion internal integration secret, starts `ntn_`. The enquiries database must also be shared *to* that integration in Notion; the token alone is not enough. |
| `NOTION_ENQUIRIES_DB` | No | Which Notion database enquiries go to. Defaults to the one created for this site, in `app/api/contact/route.ts`. Not a secret. |
| `NEXT_PUBLIC_SITE_URL` | No | Overrides the canonical domain for canonical links and OG image URLs. Leave unset in production — the default is `https://infinitesofteware.com`. Useful on preview deployments. |

**Rotating the Notion token:** create a new integration secret in Notion, update
the Vercel variable, redeploy. The old token stops working as soon as it is
revoked in Notion, and the form will show its error-and-email-fallback state in
between — it will not silently drop enquiries.

---

## Deploying

Push to `main`. Vercel builds and promotes automatically.

```bash
pnpm build       # always run this first — the build is strict
git push origin main
```

Pull requests get preview deployments at their own URLs. Previews share the
production environment variables unless you scope them differently in the
dashboard, which means **a preview deploy writes to the live enquiries
database**. Scope `NOTION_TOKEN` to Production only, or point previews at a
separate Notion database via `NOTION_ENQUIRIES_DB`, if that matters to you.

---

## What gets deployed

Every page is prerendered to static HTML at build time, with one exception:

| Route | Runtime |
| --- | --- |
| Everything under `/`, `/services/`, `/industries/`, `/insights/`, `/company/`, `/how-we-work/`, `/work/`, `/contact/`, legal pages | Static HTML |
| `/api/contact` | **Server function** |

`.vercelignore` keeps build output, `brand/` and `docs/` out of the upload. They
are not part of the deployed site.

---

## Moving off Vercel

Possible, but not by flipping a flag. Read this before promising a date.

### The blocker

`/api/contact` needs a runtime. A static export cannot carry one. `next.config.ts`
has a `STATIC_EXPORT=1` path, and **it now fails the build on purpose** — the
export it used to produce contained a contact form that posted nowhere, which is
the exact failure mode the current endpoint exists to prevent.

So a static host requires **rewriting the handler for that host first**. On
Apache/cPanel that means a PHP script that performs the same work as
`app/api/contact/route.ts`: honeypot check, validation mirroring `lib/contact.ts`,
rate limit, Notion write, and the same visible-failure behaviour. Only once that
exists is flipping the flag meaningful.

### What is already in place for Apache

`public/.htaccess` is written and shipped. Vercel ignores it entirely, so it is
safe in both directions. It handles the things Apache gets wrong on its own:

- **MIME types for Open Graph images.** Next emits them with no file extension,
  so Apache serves them as `application/octet-stream` and every social preview
  breaks silently. The `ForceType` block fixes it.
- **HTTPS redirect.** The www/non-www choice is deliberately left alone — set it
  in one place, here, only after the domain is pointed, so it cannot fight a
  redirect configured in the hosting panel.
- **Caching.** HTML must not be cached or a deploy is invisible to anyone who has
  already loaded the site. Everything under `/_next/static/` carries a content
  hash and is cached for a year.
- **Compression**, since shared hosting has no CDN in front of it.
- A 404 document, and a deny rule for the build's own bookkeeping files.

### Other hosts

Anything that runs Node and supports Next.js 16 App Router works with no changes:
Netlify, Cloudflare Pages, AWS Amplify, or a plain `pnpm build && pnpm start`
behind a reverse proxy.

---

## Local production check

```bash
pnpm build && pnpm start   # http://localhost:3000
```

This runs the real production build, including the contact endpoint. Put
`NOTION_TOKEN` in `.env.local` first if you want to test a submission end to end —
and be aware it writes a real row.

---

## Security notes for whoever takes this over

- **`.vercel/` is gitignored and must stay that way.** The Vercel CLI writes a
  copy of the production environment into `.vercel/.env.production.local`,
  including `NOTION_TOKEN`. If you zip this folder to send it anywhere, delete
  `.vercel/` first.
- **`.env.local` is gitignored.** Never commit it.
- No credentials belong in `content/` or anywhere else in the repository. The
  only secret this site has is the Notion token.
