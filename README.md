# Travel Retail Perfume Sales Passport

A working demo of the **Core Product Catalogue** for a travel retail fragrance
sales force, built as a digital *sales passport* rather than a catalogue website.

Demo scope: **Rabanne → Million → 3 fragrances** (Million Gold, Million Gold
Parfum, Million Red).

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

1. **Home** — the concept in one screen → *Explore Rabanne*.
2. **`/brand/rabanne`** — passport identity page → *Million*.
3. **`/line/million`** — the collection: search, filters, sort, 3 product cards.
4. Search `ylang` → Million Gold Parfum + Million Red. Search `red` →
   Million Red. Search works on names, families, notes, descriptors,
   perfumers and selling copy.
5. **`/product/million-gold`** — bottle, family, notes, story, selling
   arguments, when to recommend it, perfumer credits.
6. *Add sticker → Top Seller*. Go back to the collection: the stamp is on the
   card, and it is also a filter.
7. **`/compare`** — up to three fragrances side by side.
8. **`/my-picks`** — favourites and stickers, still there after a refresh.

Keyboard: `/` focuses search, `Escape` clears it.

## Architecture

```
/app                     routes (home, brand, line, product, compare, my-picks)
/components
  /layout                header, passport breadcrumb, footer
  /passport              passport page frame, stamps, boarding-pass labels
  /catalogue             cards, grid, search, filters, sort, comparison
  /product               hero, notes, family, selling arguments, related
  /personalisation       stickers, favourites, local state provider
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

## Not in this phase

CMS, admin area, authentication/SSO, backend, database, product API, the full
multi-brand catalogue, analytics backend, approval workflow, localisation
infrastructure, live pricing or stock, e-commerce, POS integration, AI
assistant, training/LMS, push notifications.
