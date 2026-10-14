# Brand assets

The Infinite identity: the brand manual, the exploration that led to it, and the
logo artwork. **None of this is part of the website build** — `.vercelignore`
keeps the folder out of deploys. It lives here so the identity and the site that
implements it stay in one repository.

Open the HTML files in a browser. They are self-contained, with no server and no
build step.

| File | What it is |
| --- | --- |
| `brand-book.html` | **The brand manual.** 25 landscape pages: logo, logo usage, colour, typography, surfaces. This is the document to send anyone who needs to use the brand. |
| `identity-routes.html` | The three identity directions explored before Route C was chosen — A *Field*, B *Meridian*, C *Continuum*. Reference only; A and B are not the brand. |
| `logo-frames.html` | The logomark in its various frames and lockups, as SVG. |
| `marks-v1.png` | An early mark exploration. Superseded. |
| `build-brand-book.py` | The generator that produced `brand-book.html`. |

---

## The rules the website is built on

These are enforced in code, not just written down. `app/globals.css` cites this
book by line number as its source of truth, and deletes Tailwind's stock colour,
radius, breakpoint and font scales so that anything off-brand fails the build
rather than passing review.

**Colour.** Four primaries — paper `#ffffff`, mist `#f4f7fd`, ink `#0a1024`,
cobalt `#2b5cf6`. Ink is a navy-black and is never `#000`. Cobalt is the only
colour that acts, at roughly 4% of any surface. The extended ramp — sky, iris,
orchid, blush — exists for gradient stops and is never a flat ground behind text.
The neutrals are all pulled blue; there is no true grey in the system.

**Light only.** The brand is light-committed by written decision (§14). The site
has no `prefers-color-scheme` block and no `dark:` variant anywhere. That is a
decision, not an omission.

**Type.** Figtree for everything readable; IBM Plex Mono for figures only.

**The mark.** A Möbius band on a Gerono lemniscate. It is generated
parametrically from the constants in `build-brand-book.py` — `lib/logo-geometry.ts`
ports the same equations rather than pasting path data, so the mark in the book
and the mark on the site cannot drift apart. The logo don'ts (§01) rule out
rotating, recolouring and shadowing it, which is why artwork on the site crops
the band off the frame instead of centring a complete figure-eight.

---

## Regenerating the book

`build-brand-book.py` writes `brand-book.html` next to itself. It is kept for
reference on how the pages and geometry were derived.

```bash
python3 brand/build-brand-book.py
```

**It will not run as-is.** The script expects a `fonts.css` produced by a font
fetch step that was part of the original authoring session and is not in this
repository; without it the script exits with `fonts.css missing`. The committed
`brand-book.html` is the deliverable and is complete — regenerating it would
require restoring that step first. Edit the HTML directly, or restore the font
step, depending on the size of the change.
