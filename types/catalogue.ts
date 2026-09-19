/**
 * Canonical content model for the Sales Passport catalogue.
 *
 * The demo reads this from local TypeScript objects in /data, but the shape is
 * intentionally API-like: a future CMS can serve exactly these documents and the
 * UI layer stays untouched.
 */

export type Brand = {
  id: string;
  slug: string;
  name: string;
  tagline: string[];
  origin: string;
  category: string;
  code: string;
  lineIds: string[];
};

export type ProductLine = {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  strapline: string;
  description: string;
  code: string;
};

export type Product = {
  id: string;
  slug: string;
  brandId: string;
  lineId: string;

  name: string;
  subtitle?: string;
  concentration: string;

  fragranceFamily: string[];

  /** Two-word olfactive signature, e.g. "Solar & sensual". */
  descriptor: string;

  shortDescription: string;

  /** Longer-form product story shown lower on the product page. */
  story: string;

  /**
   * The notes communicated for this fragrance. The brand supplies these as a
   * flat list, not as a top/heart/base pyramid, so the model keeps them flat
   * rather than assigning levels that were never given.
   */
  keyNotes: string[];

  sellingArguments: string[];

  /** When to reach for this fragrance during a sales conversation. */
  recommendFor: string[];

  perfumers: string[];

  productImage: string;
  productCode: string;

  /** Editorial stickers seeded with the content (user stickers live in localStorage). */
  stickers: string[];

  isNew?: boolean;
  isHero?: boolean;

  relatedProducts: string[];
};

export type Sticker = {
  id: string;
  label: string;
  /** Short signage abbreviation used inside the stamp device. */
  short: string;
};

/** A product resolved together with its brand and line, ready for the UI. */
export type CatalogueProduct = Product & {
  brand: Brand;
  line: ProductLine;
};
