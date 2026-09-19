import type { Product } from "@/types/catalogue";

/**
 * Demo seed content.
 *
 * NOTE FOR THE CLIENT DEMO: naming, concentration, fragrance family wording,
 * notes and selling arguments must be validated against Puig / Rabanne approved
 * assets before any client-facing use. No pricing, performance, sustainability
 * or award claims are included by design.
 */
export const products: Product[] = [
  {
    id: "million-gold",
    slug: "million-gold",
    brandId: "rabanne",
    lineId: "million",

    name: "Million Gold",
    concentration: "Eau de Parfum",

    fragranceFamily: ["Amber", "Woody", "Spicy"],
    genderPositioning: "Masculine",

    shortDescription:
      "A warm, sophisticated and sensual interpretation of the Million signature, built around fresh mandarin, spices and rich woods.",

    story:
      "Million Gold keeps the codes of the Million line — the gold ingot bottle, the bold signature — and reads them in a warmer register. The opening is citrus and spice; the dry-down is woody and creamy. In a travel retail conversation it is the natural next step for a customer who already wears Million.",

    notes: {
      top: ["Mandarin", "Cardamom"],
      heart: ["Cinnamon", "Cedarwood"],
      base: ["Sandalwood"],
    },

    sellingArguments: [
      "A more refined evolution of the Million signature.",
      "Fresh citrus and spice create an immediate, energetic opening.",
      "Creamy woods give the fragrance a warm and sensual dry-down.",
    ],

    recommendFor: [
      "A customer who already knows and likes the Million signature.",
      "Someone looking for a warm, spicy scent rather than a fresh one.",
      "An easy first recommendation when the customer is undecided.",
    ],

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

    fragranceFamily: ["Floral", "Woody"],
    genderPositioning: "Feminine",

    shortDescription:
      "A richer and warmer interpretation of Million Gold, combining luminous white florals and solar ylang-ylang with a warm sandalwood base.",

    story:
      "The Parfum concentration turns Million Gold towards white florals. Solar ylang-ylang and jasmine carry the composition, and sandalwood keeps it warm rather than sharp. It is the piece to reach for when the customer asks what pairs with Million Gold, or wants the same world in a feminine signature.",

    notes: {
      top: ["Ylang-Ylang"],
      heart: ["Jasmine"],
      base: ["Sandalwood"],
    },

    sellingArguments: [
      "A richer and more intense expression of Million Gold.",
      "Luminous jasmine and solar ylang-ylang create a powerful floral heart.",
      "Warm sandalwood adds depth and sensuality.",
    ],

    recommendFor: [
      "A customer asking for the feminine counterpart of Million Gold.",
      "Someone who prefers floral fragrances with a warm base.",
      "A pairing suggestion alongside Million Gold Eau de Parfum.",
    ],

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

    fragranceFamily: ["Floral", "Gourmand", "Vanilla"],
    genderPositioning: "Feminine",

    shortDescription:
      "A bold and sensual interpretation of Million, combining creamy coconut, solar ylang-ylang and addictive vanilla.",

    story:
      "Million Red is the most gourmand reading of the line. Creamy coconut sits over solar florals and vanilla, giving a warm, sweet trail that is immediately recognisable on a blotter. It is the newest addition to the collection, and the easiest one to demonstrate at the counter.",

    notes: {
      top: ["Coconut", "Pomelo", "Lavender"],
      heart: ["Ylang-Ylang", "Jasmine"],
      base: ["Vanilla"],
    },

    sellingArguments: [
      "A bold new expression of the Million signature.",
      "Creamy coconut gives the fragrance a distinctive gourmand twist.",
      "Solar florals and vanilla create a sensual, warm trail.",
    ],

    recommendFor: [
      "A customer who gravitates towards sweet, gourmand fragrances.",
      "Someone looking for a statement scent rather than a discreet one.",
      "A strong option when the customer wants something new in the line.",
    ],

    productImage: "/products/million-red.svg",
    productCode: "RBN / MLN / 003",

    stickers: [],
    isNew: true,

    relatedProducts: ["million-gold", "million-gold-parfum"],
  },
];
