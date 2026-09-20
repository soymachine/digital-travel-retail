"use client";

import { MAX_COMPARE, usePassport } from "@/components/personalisation/PassportStateProvider";

export function CompareToggle({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { isComparing, toggleCompare, compare, ready } = usePassport();
  const active = ready && isComparing(productId);
  const full = compare.length >= MAX_COMPARE && !active;

  return (
    <button
      type="button"
      onClick={() => toggleCompare(productId)}
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
