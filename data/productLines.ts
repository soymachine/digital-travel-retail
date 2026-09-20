import type { ProductLine } from "@/types/catalogue";

export const productLines: ProductLine[] = [
  {
    id: "million",
    slug: "million",
    brandId: "rabanne",
    name: "Million",
    strapline: "The Collection",
    description:
      "The Million collection expresses the Rabanne signature through warm, bold and instantly recognisable fragrances designed to be worn with confidence.",
    code: "MLN",
  },
  {
    id: "bad-boy",
    slug: "bad-boy",
    brandId: "carolina-herrera",
    name: "Bad Boy",
    strapline: "The Universe",
    description:
      "A powerful and sophisticated scent for unique and irreverent men who dare to embrace all the facets of contemporary manhood.",
    code: "BB",
  },
  {
    id: "le-beau",
    slug: "le-beau",
    brandId: "jean-paul-gaultier",
    name: "Le Beau",
    strapline: "The Universe",
    description:
      "The first man to cause a stir in the Garden of Gaultier. Amid the dense vegetation of Gaultier's Garden. For the seductive and ultra-sexy man.",
    code: "LB",
  },
];
