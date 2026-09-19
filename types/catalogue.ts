/**
 * Canonical content model for the Sales Passport catalogue.
 *
 * The demo reads this from local TypeScript objects in /data, but the shape is
 * intentionally API-like: a future CMS can serve exactly these documents and the
 * UI layer stays untouched.
 */

export type NoteLevel = "top" | "heart" | "base";

export type FragranceNote = {
  name: string;
  level: NoteLevel;
};

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
  genderPositioning?: string;

  shortDescription: string;

  /** Longer-form product story shown lower on the product page. */
  story: string;

  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };

  sellingArguments: string[];

  /** When to reach for this fragrance during a sales conversation. */
  recommendFor: string[];

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
