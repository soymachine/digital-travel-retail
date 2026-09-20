"use client";

import { MAX_COMPARE, usePassport } from "@/components/personalisation/PassportStateProvider";

export function CompareToggle({
  productId,
  productName,
  lineId,
}: {
  productId: string;
  productName: string;
  lineId: string;
}) {
  const { isComparing, toggleCompare, compare, compareLine, ready } = usePassport();
  const active = ready && isComparing(productId);
  // The cap only applies inside the collection being compared.
  const full = compareLine === lineId && compare.length >= MAX_COMPARE && !active;

  return (
    <button
      type="button"
      onClick={() => toggleCompare(productId, lineId)}
      disabled={full}
      aria-pressed={active}
      title={full ? `You can compare up to ${MAX_COMPARE} products` : undefined}
      className={[
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-cocoa bg-cocoa/10 font-medium text-cocoa"
          : "border-line text-taupe-deep hover:border-cocoa-soft hover:text-ink",
      ].join(" ")}
    >
      <span aria-hidden>{active ? "✓" : "+"}</span>
      {active ? "In comparison" : "Compare"}
      <span className="sr-only">{productName}</span>
    </button>
  );
}
