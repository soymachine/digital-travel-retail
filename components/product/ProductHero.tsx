import Image from "next/image";

import { BoardingPassLabel } from "@/components/passport/BoardingPassLabel";
import { ProductActions } from "@/components/product/ProductActions";
import type { CatalogueProduct } from "@/types/catalogue";

/**
 * First viewport of the product page: everything an advisor needs mid-conversation
 * — bottle, identity, fragrance family and the personalisation controls.
 */
export function ProductHero({ product }: { product: CatalogueProduct }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <div className="relative flex items-center justify-center border border-ivory-line bg-ivory-deep/50 doc-pattern px-6 py-10">
        <Image
          src={product.productImage}
          alt={`${product.brand.name} ${product.name} bottle`}
          width={320}
          height={420}
          priority
          unoptimized
          className="h-72 w-auto sm:h-80"
        />
        <span className="signage-sm absolute bottom-4 left-4 text-ink/35">{product.productCode}</span>
        {product.isNew && (
          <span className="signage-sm absolute right-4 top-4 border border-gold-deep/60 px-2 py-1 text-gold-deep">
            New
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="signage text-ink/45">{product.brand.name} · {product.line.name}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {product.name}
        </h1>
        <p className="signage mt-3 text-ink/60">{product.concentration}</p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75">
          {product.shortDescription}
        </p>

        <div className="mt-8 border-y border-ivory-line py-6">
          <BoardingPassLabel
            tone="ivory"
            fields={[
              { label: "Family", value: product.fragranceFamily.join(" / ") },
              { label: "Signature", value: product.descriptor },
              { label: "Type", value: product.concentration },
            ]}
          />
        </div>

        <ProductActions product={product} />
      </div>
    </div>
  );
}
