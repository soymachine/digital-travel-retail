import type { Product } from "@/types/catalogue";

/**
 * Brand-supplied product content.
 *
 * Product names, concentrations, olfactive families, notes, descriptors and
 * perfumer credits come from Rabanne. The surrounding sales copy
 * (shortDescription, story, sellingArguments, recommendFor) is written for the
 * demo from those facts and still needs validation before client-facing use.
 * `intensity` is a demo estimate too — see the note on the type.
 * No pricing, longevity, sustainability or award claims are included by design.
 */
/**
 * Bad Boy (Carolina Herrera) and Le Beau (Jean Paul Gaultier), transcribed from
 * the brand universe sheets.
 *
 * Only what the sheets state is recorded: names, concentrations, launch years,
 * olfactive family as written, positioning, descriptor, notes and the notes the
 * sheets single out. `intensity` is each sheet's own lightness → intensity
 * order. No story, selling arguments or perfumer credits are invented for
 * these — the sheets do not carry them.
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
    familyLabel: "FLORAL",
    descriptor: "Solar & sensual",
    intensity: 34,

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

    productImage: "/products/million-gold.png",
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
    familyLabel: "woody FLORAL",
    descriptor: "Luminous & woody",
    intensity: 62,

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

    productImage: "/products/million-gold-parfum.png",
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
    familyLabel: "ambery GOURMAND",
    descriptor: "Sensual & gourmand",
    intensity: 84,

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

    productImage: "/products/million-red.png",
    productCode: "RBN / MLN / 003",

    stickers: [],
    isNew: true,

    relatedProducts: ["million-gold", "million-gold-parfum"],
  },
  {
    id: "bad-boy",
    slug: "bad-boy",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy",
    concentration: "Eau de Toilette",
    year: 2019,

    fragranceFamily: ["Ambery", "Aromatic"],
    familyLabel: "AMBERY Aromatic",
    descriptor: "Bold & sensual",
    positioning: "Empowered & sophisticated",
    intensity: 8,

    keyNotes: ["Bergamot", "Pepper", "Sage", "Cedarwood", "Tonka Bean", "Cocoa"],
    signatureNotes: ["Sage", "Tonka Bean"],

    productImage: "/products/bad-boy.png",
    productCode: "CH / BB / 001",

    stickers: [],

    relatedProducts: ["bad-boy-elixir", "bad-boy-cobalt"],
  },
  {
    id: "bad-boy-elixir",
    slug: "bad-boy-elixir",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy Elixir",
    concentration: "Eau de Parfum",
    year: 2025,

    fragranceFamily: ["Aromatic", "Woody"],
    familyLabel: "AROMATIC Woody",
    descriptor: "Magnetic & invigorating",
    positioning: "Charismatic & refined",
    intensity: 25,

    keyNotes: ["Sage", "Lavandin", "Leather Accord", "Iris", "Cedarwood", "Olibanum"],
    signatureNotes: ["Sage", "Leather Accord", "Cedarwood"],

    productImage: "/products/bad-boy-elixir.png",
    productCode: "CH / BB / 002",

    stickers: [],

    relatedProducts: ["bad-boy", "bad-boy-cobalt"],
  },
  {
    id: "bad-boy-cobalt",
    slug: "bad-boy-cobalt",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy Cobalt",
    concentration: "Eau de Parfum",
    year: 2022,

    fragranceFamily: ["Aromatic", "Woody"],
    familyLabel: "AROMATIC Woody",
    descriptor: "Energizing & contrasted",
    positioning: "Edgy & electrifying",
    intensity: 42,

    keyNotes: ["Pink pepper", "Lavender", "Geranium", "Black plum", "Truffle accord", "Vetiver"],
    signatureNotes: ["Geranium", "Truffle accord", "Vetiver"],

    productImage: "/products/bad-boy-cobalt.png",
    productCode: "CH / BB / 003",

    stickers: [],

    relatedProducts: ["bad-boy", "bad-boy-elixir"],
  },
  {
    id: "bad-boy-cobalt-elixir",
    slug: "bad-boy-cobalt-elixir",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy Cobalt Elixir",
    concentration: "Eau de Parfum",
    year: 2024,

    fragranceFamily: ["Woody", "Aromatic"],
    familyLabel: "WOODY Aromatic",
    descriptor: "Extraordinary & deep",
    positioning: "Brave & active",
    intensity: 58,

    keyNotes: ["Sage", "Black Pepper", "Black Truffle", "Resinous Woods", "Vanilla", "Olibanum"],
    signatureNotes: ["Sage", "Black Truffle", "Resinous Woods"],

    productImage: "/products/bad-boy-cobalt-elixir.png",
    productCode: "CH / BB / 004",

    stickers: [],

    relatedProducts: ["bad-boy", "bad-boy-elixir"],
  },
  {
    id: "bad-boy-extreme",
    slug: "bad-boy-extreme",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy Extreme",
    concentration: "Eau de Parfum",
    year: 2023,

    fragranceFamily: ["Ambery", "Aromatic"],
    familyLabel: "AMBERY Aromatic",
    descriptor: "Intense & intoxicating",
    positioning: "Charming & daring",
    intensity: 75,

    keyNotes: ["Ginger", "Sage", "Cocoa", "Vetiver", "Patchouli", "Tonka Bean"],
    signatureNotes: ["Ginger", "Patchouli", "Tonka Bean"],

    productImage: "/products/bad-boy-extreme.png",
    productCode: "CH / BB / 005",

    stickers: [],

    relatedProducts: ["bad-boy", "bad-boy-elixir"],
  },
  {
    id: "bad-boy-cobalt-absolu",
    slug: "bad-boy-cobalt-absolu",
    brandId: "carolina-herrera",
    lineId: "bad-boy",

    name: "Bad Boy Cobalt Absolu",
    concentration: "Eau de Parfum",
    year: 2026,

    fragranceFamily: ["Aromatic", "Woody"],
    familyLabel: "AROMATIC Woody",
    descriptor: "Bold & addictive",
    positioning: "Opulent & sophisticated",
    intensity: 92,

    keyNotes: ["Blue Sage", "Blue Lavender", "Mineral Blue Oud", "Geranium", "White Truffle", "Golden Vanilla", "Smoky Oakwood"],
    signatureNotes: ["Golden Vanilla", "Smoky Oakwood"],

    productImage: "/products/bad-boy-cobalt-absolu.png",
    productCode: "CH / BB / 006",

    stickers: [],

    relatedProducts: ["bad-boy", "bad-boy-elixir"],
  },
  {
    id: "le-beau",
    slug: "le-beau",
    brandId: "jean-paul-gaultier",
    lineId: "le-beau",

    name: "Le Beau",
    concentration: "Eau de Toilette",

    fragranceFamily: ["Aromatic", "Woody"],
    familyLabel: "Aromatic WOODY",
    descriptor: "Fresh & powerful",
    positioning: "For seductive man",
    intensity: 12,

    keyNotes: ["Bergamot", "Coco wood accord", "Tonka bean"],
    signatureNotes: ["Coco wood accord"],

    productImage: "/products/le-beau.png",
    productCode: "JPG / LB / 001",

    stickers: [],

    relatedProducts: ["le-beau-paradise-garden", "le-beau-narcisse"],
  },
  {
    id: "le-beau-paradise-garden",
    slug: "le-beau-paradise-garden",
    brandId: "jean-paul-gaultier",
    lineId: "le-beau",

    name: "Le Beau Paradise Garden",
    concentration: "Eau de Parfum",

    fragranceFamily: ["Aquatic", "Woody"],
    familyLabel: "Aquatic WOODY",
    descriptor: "Exotic & aphrodisiac",
    positioning: "For wild man",
    intensity: 37,

    keyNotes: ["Coconut water", "Green fig", "Sandalwood"],
    signatureNotes: ["Green fig"],

    productImage: "/products/le-beau-paradise-garden.png",
    productCode: "JPG / LB / 002",

    stickers: [],

    relatedProducts: ["le-beau", "le-beau-narcisse"],
  },
  {
    id: "le-beau-narcisse",
    slug: "le-beau-narcisse",
    brandId: "jean-paul-gaultier",
    lineId: "le-beau",

    name: "Le Beau Narcisse",
    concentration: "Eau de Parfum",

    fragranceFamily: ["Musky", "Ambery"],
    familyLabel: "MUSKY AMBERY",
    descriptor: "Captivating & intense",
    positioning: "For sultry man",
    intensity: 62,

    keyNotes: ["Bergamot", "Tonka bean", "Powdery musks"],
    signatureNotes: ["Tonka bean"],

    productImage: "/products/le-beau-narcisse.png",
    productCode: "JPG / LB / 003",

    stickers: [],

    relatedProducts: ["le-beau", "le-beau-paradise-garden"],
  },
  {
    id: "le-beau-le-parfum",
    slug: "le-beau-le-parfum",
    brandId: "jean-paul-gaultier",
    lineId: "le-beau",

    name: "Le Beau Le Parfum",
    concentration: "Eau de Parfum Intense",

    // The sheet prints "Amber WOODY"; the filter groups it with the other
    // ambery fragrances while the label keeps the brand's own wording.
    fragranceFamily: ["Ambery", "Woody"],
    familyLabel: "Amber WOODY",
    descriptor: "Virile & addictive",
    positioning: "For sensual man",
    intensity: 87,

    keyNotes: ["Coco wood accord", "Sandalwood", "Tonka bean"],
    signatureNotes: ["Sandalwood"],

    productImage: "/products/le-beau-le-parfum.png",
    productCode: "JPG / LB / 004",

    stickers: [],

    relatedProducts: ["le-beau", "le-beau-paradise-garden"],
  },
];
