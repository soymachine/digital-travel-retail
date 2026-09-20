"use client";

import Link from "next/link";

import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { Stamp } from "@/components/stamps/Stamp";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import type { CatalogueProduct } from "@/types/catalogue";

export function MyPicksView({ products }: { products: CatalogueProduct[] }) {
  const { favourites, stickers, stickerCount, ready, reset } = usePassport();

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-xl bg-paper-deep" aria-hidden />;
  }

  const favouriteProducts = products.filter((product) => favourites.includes(product.id));
  const stampedProducts = products.filter((product) => (stickers[product.id] ?? []).length > 0);
  const empty = favouriteProducts.length === 0 && stampedProducts.length === 0;

  return (
    <div className="space-y-12">
      <dl className="grid gap-6 border-y border-line py-6 sm:grid-cols-3">
        <div>
          <dt className="eyebrow-muted">Favourites</dt>
          <dd className="mt-2 text-4xl font-bold text-ink">{favourites.length}</dd>
        </div>
        <div>
          <dt className="eyebrow-muted">Stamps</dt>
          <dd className="mt-2 text-4xl font-bold text-ink">{stickerCount}</dd>
        </div>
        <div>
          <dt className="eyebrow-muted">Stored</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-taupe-deep">
            In this browser only — no account, kept after a refresh.
          </dd>
        </div>
      </dl>

      {empty ? (
        <div className="animate-fade-in rounded-xl border border-dashed border-line px-6 py-20 text-center">
          <p className="text-xl font-bold text-ink">Nothing marked yet</p>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-taupe-deep">
            Stamp a fragrance or mark it as a favourite and it will appear here.
          </p>
          <Link
            href="/line/million"
            className="mt-8 inline-block rounded-full bg-bark px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
          >
            Go to the collection
          </Link>
        </div>
      ) : (
        <>
          {stampedProducts.length > 0 && (
            <section>
              <h2 className="eyebrow">Stamped</h2>
              <ul className="mt-6 space-y-6">
                {stampedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-2xl font-bold tracking-tight text-ink hover:text-cocoa"
                    >
                      {product.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                      {(stickers[product.id] ?? []).map((stickerId) => (
                        <Stamp key={stickerId} stickerId={stickerId} size="sm" />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {favouriteProducts.length > 0 && (
            <section>
              <h2 className="eyebrow">Favourites</h2>
              <div className="mt-6">
                <ProductGrid products={favouriteProducts} />
              </div>
            </section>
          )}

          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-line px-6 py-3 text-sm text-taupe transition-colors duration-200 hover:border-cocoa-soft hover:text-ink"
          >
            Reset my stamps
          </button>
        </>
      )}
    </div>
  );
}
