# Travel Retail Perfume Sales Passport

A working demo of the **Core Product Catalogue** for a travel retail fragrance
sales force, built as a digital *sales passport* rather than a catalogue website.

Demo scope: three houses, three collections, thirteen fragrances.

| House | Collection | Fragrances |
| --- | --- | --- |
| Rabanne | Million | Million Gold, Million Gold Parfum, Million Red |
| Carolina Herrera | Bad Boy | Bad Boy, Elixir, Cobalt, Cobalt Elixir, Extreme, Cobalt Absolu |
| Jean Paul Gaultier | Le Beau | Le Beau, Paradise Garden, Narcisse, Le Parfum |

There is no CMS, no backend, no database and no authentication in this phase.
Content lives in local TypeScript objects; the advisor's personal state lives in
`localStorage`.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
```

Requires Node 20+. TypeScript is pinned to 5.x — Next 15 does not detect TS 7,
and silently ignores the `@/*` path aliases if it is installed.

## Demo journey

1. **Home** — the passport on the counter → *Open passport*.
2. **`/brand/rabanne`** — the brand and its collections.
3. **`/line/million`** — the collection: search, filters, sort, three cards.
4. Search `ylang` → Million Gold Parfum + Million Red. Search works on names,
   families, notes, descriptors, perfumers and selling copy.
5. **`/product/million-red`** — bottle, stamps, family, notes, descriptor,
   perfumers, then the story, selling arguments and when to recommend it.
6. *+ → New → Save stamps*. Back on the collection the stamp is on the card,
   and it is also a filter.
7. **`/compare`** — pick up to three and read them side by side, with the
   fresh → intense axis underneath.
8. **`/my-picks`** — stamps and favourites, still there after a refresh.
9. **`/sales`** — a placeholder for the next phase, and it says so.

Keyboard: `/` focuses search, `Escape` clears it.

## Design

The interface follows the supplied mockups: warm paper, a tight grotesk, brand
brown for titles and active navigation, and rubber stamps instead of web tags.

The home page is the one screen that breaks the site's max width: the cover
photograph runs the full width of the viewport, whole from the small breakpoint
up and capped so it never runs past the fold, and cropped to a taller band on
phones so the passport stays large.

Navigation has three sections — **Brands**, **Comparisons**, **Sales** — as a
top bar on desktop and a tab bar at the bottom on mobile, where the header
becomes a passport cover (back, title, search).

Three things on screen are **placeholders** waiting for real artwork, and each
is isolated to one file so swapping it changes nothing else:

| What | Where | Replace with |
| --- | --- | --- |
| Stamp artwork (NEW, TOP SELLER, …) | `components/stamps/StampArt.tsx` | the stamp images; `data/stickers.ts` picks shape and ink per stamp |
| Note icons (rose, musk, coconut, …) | `components/notes/NoteIcon.tsx` | commissioned glyphs; notes map to a glyph by keyword, with a fallback |
| Home cover photograph | `public/home/passport-hero.jpg` | the approved shot |

Fonts are system faces (Helvetica Neue / Arial), so there is no webfont
round-trip. Swapping in the brand typeface is a change to `tailwind.config.ts`.

## Deploying to GitHub Pages

The demo is a fully static site, so `npm run build` emits plain HTML into
`/out` and GitHub Pages serves it. `.github/workflows/deploy.yml` builds and
publishes on every push to the default branch, and can also be run by hand from
the Actions tab.

One-time setup, in the repository on GitHub:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push, or run the "Deploy to GitHub Pages" workflow manually.

The site then lives at `https://<user>.github.io/digital-travel-retail/`.

Two things this requires of the code, both already handled:

- Project sites are served from a sub-path, so the workflow passes
  `NEXT_PUBLIC_BASE_PATH` and `next.config.mjs` applies it as `basePath`.
- Static hosting has no image optimiser, so images are unoptimised — and
  `next/image` does not prefix the base path in that mode. `lib/assets.ts`
  resolves `/public` paths, and `lib/catalogue.ts` applies it to every packshot,
  so a new image added to the data layer is handled automatically.

To preview a base-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/digital-travel-retail npm run build
npx serve out   # then browse the site under that sub-path
```

## Architecture

```
/app                     routes (home, brand, line, product, compare, my-picks)
/components
  /layout                header, mobile tab bar, footer
  /stamps                stamp artwork and the <Stamp> wrapper
  /notes                 note icons and the note row
  /catalogue             cards, grid, search, filters, sort, comparison
  /product               hero, family line, selling arguments, recommendations
  /personalisation       stamp rail and picker, favourites, local state
/data                    brands.ts, productLines.ts, products.ts, stickers.ts
/lib                     catalogue.ts (access), search.ts, storage.ts, analytics.ts
/types                   catalogue.ts (the content model)
/public/products         local packshot placeholders
```

Content is deliberately separated from the UI:

- Components never import `/data` directly — they go through `lib/catalogue.ts`.
- `lib/catalogue.ts` is the seam a CMS/API client replaces later; the `Product`
  shape in `types/catalogue.ts` stays the same.
- `lib/analytics.ts` centralises the future event surface (`product_view`,
  `search`, `filter_used`, `favourite_added`, `sticker_added`,
  `comparison_started`, `comparison_completed`). Nothing is sent anywhere.
- `lib/storage.ts` owns the single `localStorage` key (`sales-passport:v1`) and
  tolerates disabled or corrupted storage.

## Replacing demo assets

- **Imagery**: drop approved packshots into `/public/products` and update
  `productImage` in `data/products.ts`. See `public/products/README.md`.
- **Copy**: everything editorial is in `data/products.ts`.

## Where the content comes from

Bad Boy and Le Beau were transcribed from the brand universe sheets, and their
packshots cut out of those same sheets: names, concentrations, launch years,
olfactive family **as written** (capitalisation carries the emphasis, so
"AMBERY Aromatic" and "aromatic WOODY" are both preserved exactly), positioning,
descriptor, notes, the notes each sheet singles out, and each sheet's own
lightness → intensity order.

Nothing was invented to fill the gaps: those two collections carry no story, no
selling arguments and no perfumer credits, because their sheets do not, and the
product page simply omits those sections.

Two things to know about the extracted packshots:

- They were cut from sheets stamped "internal / training purposes only", and the
  diagonal watermark was cleaned off the bottles. They are fine for an internal
  demo; approved packshots should replace them before anything public.
- The brand name on the Bad Boy sheet is not printed — only the Bad Boy logo —
  so **Carolina Herrera is an attribution, not a transcription**.

## Content status

Product names, concentrations, olfactive families, notes, descriptors and
perfumer credits are brand-supplied. The surrounding sales copy — short
descriptions, product stories, selling arguments and the "recommend it when"
cues — was written for the demo from those facts and still needs validation
before any client-facing use. The dataset intentionally contains no pricing,
longevity, sustainability, award or campaign claims.

Notes are held as a flat list rather than a top/heart/base pyramid, because the
brand communicates three notes per fragrance without levels. If approved
pyramid data arrives later, `keyNotes` in `types/catalogue.ts` is the single
place to change.

One field is **not** brand data: `intensity`, which positions each fragrance on
the fresh → intense axis of the comparison. The brand supplied no intensity
scale, so those three numbers are demo estimates, flagged as such in
`types/catalogue.ts`, and should be replaced before client-facing use.

## Not in this phase

CMS, admin area, authentication/SSO, backend, database, product API, the full
multi-brand catalogue, analytics backend, approval workflow, localisation
infrastructure, live pricing or stock, e-commerce, POS integration, AI
assistant, training/LMS, push notifications.
