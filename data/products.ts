import type { Product } from "@/types/catalogue";

/**
 * Brand-supplied product content.
 *
 * Product names, concentrations, olfactive families, notes, descriptors and
 * perfumer credits come from Rabanne. The surrounding sales copy
 * (shortDescription, story, sellingArguments, recommendFor) is written for the
 * demo from those facts and still needs validation before client-facing use.
 * No pricing, longevity, sustainability or award claims are included by design.
 */
export const products: Product[] = [
  {
    id: "million-gold",
    slug: "million-gold",
    brandId: "rabanne",
    lineId: "million",

    name: "Million Gold",
    concentration: "Eau de Parfum",

    fragranceFamily: ["Floral"],
    descriptor: "Solar & sensual",

    shortDescription:
      "A solar and sensual floral built on rose, a bouquet of white flowers and musk.",

    story:
      "Million Gold reads the Million signature as a floral. Rose and a bouquet of white flowers carry the composition, and musk keeps it close to the skin. At the counter it is the piece to open with when a customer wants the Million world in a solar, sensual register.",

    keyNotes: ["Rose", "White flowers bouquet", "Musk"],

    sellingArguments: [
      "A floral reading of the Million signature.",
      "Rose and a bouquet of white flowers give the composition its solar character.",
      "Musk keeps the trail sensual and close to the skin.",
    ],

    recommendFor: [
      "A customer who already knows the Million line and wants a floral.",
      "Someone asking for a solar, sensual scent rather than a fresh one.",
      "An easy first recommendation when the customer is undecided.",
    ],

    perfumers: ["Aliénor Massenet", "Suzy Le Helley", "Nathalie Benareau", "Loc Dong"],

    productImage: "/products/million-gold.svg",
    productCode: "RBN / MLN / 001",

    stickers: [],
    isHero: true,

    relatedProducts: ["million-gold-parfum", "million-red"],
  },
  {
    id: "million-gold-parfum",
    slug: "million-gold-parfum",
    brandId: "rabanne",
    lineId: "million",

    name: "Million Gold Parfum",
    concentration: "Parfum",

    fragranceFamily: ["Woody", "Floral"],
    descriptor: "Luminous & woody",

    shortDescription:
      "A luminous woody floral combining ylang-ylang and jasmine with a sandalwood base.",

    story:
      "The Parfum concentration turns Million Gold towards woods. Solar ylang-ylang and luminous jasmine carry the florals, and sandalwood gives the composition its depth. It is the natural answer when a customer likes Million Gold and asks for something more intense.",

    keyNotes: ["Ylang-ylang", "Jasmine", "Sandalwood"],

    sellingArguments: [
      "A more intense, Parfum-concentration expression of Million Gold.",
      "Luminous jasmine and solar ylang-ylang carry the floral heart.",
      "Sandalwood adds woody depth to the composition.",
    ],

    recommendFor: [
      "A customer who likes Million Gold and wants a richer concentration.",
      "Someone who prefers florals resting on a woody base.",
      "A pairing suggestion alongside Million Gold Eau de Parfum.",
    ],

    perfumers: ["Loc Dong", "Aliénor Massenet", "Nathalie Benareau", "Suzy Le Helley"],

    productImage: "/products/million-gold-parfum.svg",
    productCode: "RBN / MLN / 002",

    stickers: [],

    relatedProducts: ["million-gold", "million-red"],
  },
  {
    id: "million-red",
    slug: "million-red",
    brandId: "rabanne",
    lineId: "million",

    name: "Million Red",
    concentration: "Parfum",

    fragranceFamily: ["Ambery", "Gourmand"],
    descriptor: "Sensual & gourmand",

    shortDescription:
      "A sensual ambery gourmand combining creamy coconut, solar ylang-ylang and vanilla.",

    story:
      "Million Red is the gourmand reading of the line. Creamy coconut sits over solar ylang-ylang and vanilla, giving a warm, sweet trail that is immediately recognisable on a blotter — the easiest of the three to demonstrate at the counter.",

    keyNotes: ["Coconut", "Ylang-ylang", "Vanilla"],

    sellingArguments: [
      "The gourmand expression of the Million signature.",
      "Creamy coconut gives the composition its distinctive twist.",
      "Solar ylang-ylang and vanilla create a sensual, warm trail.",
    ],

    recommendFor: [
      "A customer who gravitates towards sweet, gourmand fragrances.",
      "Someone looking for a statement scent rather than a discreet one.",
      "A strong option when the customer wants something new in the line.",
    ],

    perfumers: ["Loc Dong", "Aliénor Massenet", "Nathalie Benareau", "Suzy Le Helley"],

    productImage: "/products/million-red.svg",
    productCode: "RBN / MLN / 003",

    stickers: [],
    isNew: true,

    relatedProducts: ["million-gold", "million-gold-parfum"],
  },
];
