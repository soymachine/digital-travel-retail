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
  /** Only where the brand material states it. */
  origin?: string;
  category?: string;
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

  /** Normalised family names, used by the filters. */
  fragranceFamily: string[];

  /**
   * The family as the brand writes it, e.g. "AMBERY Aromatic" or
   * "woody FLORAL". Capitalisation carries the emphasis, so it is preserved
   * exactly and the UI styles each word from its case.
   */
  familyLabel: string;

  /** Two-word olfactive signature, e.g. "Solar & sensual". */
  descriptor: string;

  /** Who the brand positions it for, e.g. "For seductive man". */
  positioning?: string;

  /** Launch year, where the brand material states it. */
  year?: number;

  /**
   * Position on the fresh → intense axis of the comparison view, 0-100.
   *
   * Where the brand publishes a lightness → intensity axis, this is that
   * printed order. Where it does not (the Million collection), the value is a
   * demo estimate pending validation.
   */
  intensity: number;

  shortDescription?: string;

  /** Longer-form product story shown lower on the product page. */
  story?: string;

  /**
   * The notes communicated for this fragrance. The brand supplies these as a
   * flat list, not as a top/heart/base pyramid, so the model keeps them flat
   * rather than assigning levels that were never given.
   */
  keyNotes: string[];

  /** The notes the brand singles out — underlined or capitalised on its sheets. */
  signatureNotes?: string[];

  sellingArguments?: string[];

  /** When to reach for this fragrance during a sales conversation. */
  recommendFor?: string[];

  perfumers?: string[];

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
  /** Short signage abbreviation, used where a full stamp does not fit. */
  short: string;
  /** Which placeholder stamp artwork to draw. */
  shape: "rect" | "circle";
  tone: "red" | "brown";
};

/** A product resolved together with its brand and line, ready for the UI. */
export type CatalogueProduct = Product & {
  brand: Brand;
  line: ProductLine;
};
