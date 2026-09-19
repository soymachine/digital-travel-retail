"use client";

import { StickerPicker } from "@/components/personalisation/StickerPicker";

export function ProductTags({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return <StickerPicker productId={productId} productName={productName} tone="ivory" />;
}
