import type { Brand } from "@/types/catalogue";

export const brands: Brand[] = [
  {
    id: "rabanne",
    slug: "rabanne",
    name: "Rabanne",
    tagline: ["Luxury fragrance.", "Bold design.", "Unapologetic attitude."],
    origin: "Paris",
    category: "Fragrance",
    code: "RBN",
    lineIds: ["million"],
  },
  {
    id: "carolina-herrera",
    slug: "carolina-herrera",
    name: "Carolina Herrera",
    tagline: ["Bold masculinity.", "Contrast and contradiction."],
    code: "CH",
    lineIds: ["bad-boy"],
  },
  {
    id: "jean-paul-gaultier",
    slug: "jean-paul-gaultier",
    name: "Jean Paul Gaultier",
    tagline: ["Seduction, made mischievous."],
    code: "JPG",
    lineIds: ["le-beau"],
  },
];
