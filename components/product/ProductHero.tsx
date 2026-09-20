import Image from "next/image";

import { FamilyLine } from "@/components/product/FamilyLine";
import { NoteRow } from "@/components/notes/NoteIcon";
import { ProductActions } from "@/components/product/ProductActions";
import { StampRail } from "@/components/personalisation/StampRail";
import type { CatalogueProduct } from "@/types/catalogue";

/**
 * Everything an advisor needs mid-conversation, in one screen: the bottle, the
 * stamps they have put on it, the family, the notes and the descriptor.
 */
export function ProductHero({ product }: { product: CatalogueProduct }) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-12">
      <div className="relative mx-auto h-72 w-full max-w-sm sm:h-96">
        <Image
          src={product.productImage}
          alt={`${product.brand.name} ${product.name} bottle`}
          fill
          sizes="(max-width: 1024px) 80vw, 32vw"
          priority
          className="object-contain"
        />
      </div>

      <div className="lg:w-44">
        <StampRail productId={product.id} productName={product.name} size="lg" />
      </div>

      <div className="lg:border-l lg:border-line lg:pl-12">
        <FamilyLine label={product.familyLabel} className="text-center text-2xl lg:text-left" />

        <NoteRow
          notes={product.keyNotes}
          signatureNotes={product.signatureNotes}
          className="mt-6 lg:justify-start"
        />

        <p className="mt-8 border-t border-line pt-8 text-center text-3xl font-bold lowercase text-ink lg:text-left">
          {product.descriptor}
        </p>

        {product.positioning && (
          <p className="mt-4 text-center text-[15px] text-taupe lg:text-left">{product.positioning}</p>
        )}

        {product.shortDescription && (
          <p className="mt-6 max-w-md text-center text-[15px] leading-relaxed text-taupe-deep lg:text-left">
            {product.shortDescription}
          </p>
        )}

        {product.perfumers && product.perfumers.length > 0 && (
          <div className="mt-8 border-t border-line pt-6 text-center lg:text-left">
            <p className="eyebrow">Perfumers</p>
            <ul className="mt-3 space-y-1">
              {product.perfumers.map((perfumer) => (
                <li key={perfumer} className="text-[15px] lowercase text-ink">
                  {perfumer}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ProductActions product={product} />
      </div>
    </div>
  );
}
