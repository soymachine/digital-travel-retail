import { assetPath } from "@/lib/assets";
import { brands } from "@/data/brands";
import { productLines } from "@/data/productLines";
import { products } from "@/data/products";
import type { Brand, CatalogueProduct, Product, ProductLine } from "@/types/catalogue";

/**
 * Read-only access layer over the local content.
 *
 * Every function here is the seam a CMS/API client would replace later; nothing
 * in /components or /app imports the raw data modules directly.
 */

export function getBrands(): Brand[] {
  return brands;
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function getLines(brandId?: string): ProductLine[] {
  return brandId ? productLines.filter((line) => line.brandId === brandId) : productLines;
}

export function getLine(slug: string): ProductLine | undefined {
  return productLines.find((line) => line.slug === slug);
}

function hydrate(product: Product): CatalogueProduct {
  const brand = brands.find((item) => item.id === product.brandId);
  const line = productLines.find((item) => item.id === product.lineId);

  if (!brand || !line) {
    throw new Error(`Catalogue data is inconsistent for product "${product.id}".`);
  }

  // The data layer stores plain /public paths; deployments under a base path
  // need them resolved before they reach the UI.
  return { ...product, brand, line, productImage: assetPath(product.productImage) };
}

export function getProducts(filter?: { brandId?: string; lineId?: string }): CatalogueProduct[] {
  return products
    .filter((product) => (filter?.brandId ? product.brandId === filter.brandId : true))
    .filter((product) => (filter?.lineId ? product.lineId === filter.lineId : true))
    .map(hydrate);
}

export function getProduct(slug: string): CatalogueProduct | undefined {
  const product = products.find((item) => item.slug === slug);
  return product ? hydrate(product) : undefined;
}

export function getProductsByIds(ids: string[]): CatalogueProduct[] {
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))
    .map(hydrate);
}

export function countProducts(filter?: { brandId?: string; lineId?: string }): number {
  return getProducts(filter).length;
}

/** Fragrance families actually used by the catalogue, alphabetically sorted. */
export function getFragranceFamilies(lineId?: string): string[] {
  const families = new Set<string>();
  getProducts({ lineId }).forEach((product) => {
    product.fragranceFamily.forEach((family) => families.add(family));
  });
  return [...families].sort((a, b) => a.localeCompare(b));
}

/** Concentrations actually used by the catalogue. */
export function getConcentrations(lineId?: string): string[] {
  const concentrations = new Set<string>();
  getProducts({ lineId }).forEach((product) => concentrations.add(product.concentration));
  return [...concentrations].sort((a, b) => a.localeCompare(b));
}
