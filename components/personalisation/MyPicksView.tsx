"use client";

import Link from "next/link";

import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { Sticker } from "@/components/personalisation/Sticker";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import type { CatalogueProduct } from "@/types/catalogue";

export function MyPicksView({ products }: { products: CatalogueProduct[] }) {
  const { favourites, stickers, stickerCount, ready, reset } = usePassport();

  if (!ready) {
    return <div className="h-64 animate-pulse border border-ink/10 bg-ivory-deep/50" aria-hidden />;
  }

  const favouriteProducts = products.filter((product) => favourites.includes(product.id));
  const stickeredProducts = products.filter((product) => (stickers[product.id] ?? []).length > 0);
  const empty = favouriteProducts.length === 0 && stickeredProducts.length === 0;

  return (
    <div className="on-ivory space-y-12 text-ink">
      <dl className="grid gap-6 sm:grid-cols-3">
        <div className="border-t border-ink/15 pt-4">
          <dt className="signage-sm text-ink/45">Favourites</dt>
          <dd className="mt-2 font-display text-4xl text-ink">{favourites.length}</dd>
        </div>
        <div className="border-t border-ink/15 pt-4">
          <dt className="signage-sm text-ink/45">Personal stickers</dt>
          <dd className="mt-2 font-display text-4xl text-ink">{stickerCount}</dd>
        </div>
        <div className="border-t border-ink/15 pt-4">
          <dt className="signage-sm text-ink/45">Stored</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink/60">
            In this browser only — no account, kept after a refresh.
          </dd>
        </div>
      </dl>

      {empty ? (
        <div className="animate-fade-in border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="signage text-ink/70">Nothing marked yet</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
            Favourite a fragrance or add a personal sticker and it will appear here.
          </p>
          <Link
            href="/line/million"
            className="signage mt-6 inline-block border border-ink/25 px-4 py-2 text-ink transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            Go to the collection
          </Link>
        </div>
      ) : (
        <>
          {favouriteProducts.length > 0 && (
            <section>
              <h2 className="signage text-ink/60">Favourites</h2>
              <div className="mt-6">
                <ProductGrid products={favouriteProducts} />
              </div>
            </section>
          )}

          {stickeredProducts.length > 0 && (
            <section>
              <h2 className="signage text-ink/60">Stickered products</h2>
              <ul className="mt-6 space-y-4">
                {stickeredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-display text-2xl text-ink hover:text-gold-deep"
                    >
                      {product.name}
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      {(stickers[product.id] ?? []).map((stickerId) => (
                        <Sticker key={stickerId} stickerId={stickerId} tone="ivory" size="sm" />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <button
            type="button"
            onClick={reset}
            className="signage border border-ink/20 px-4 py-2 text-ink/55 transition-colors duration-200 hover:border-gold-deep hover:text-gold-deep"
          >
            Reset my picks
          </button>
        </>
      )}
    </div>
  );
}
