"use client";

import { MAX_COMPARE, usePassport } from "@/components/personalisation/PassportStateProvider";

export function CompareToggle({
  productId,
  productName,
  tone = "ink",
}: {
  productId: string;
  productName: string;
  tone?: "ink" | "ivory";
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
        "signage inline-flex items-center gap-2 whitespace-nowrap border px-3 py-2 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
        tone === "ink"
          ? "border-ivory/25 text-ivory/70 hover:border-teal hover:text-teal"
          : "border-ink/20 text-ink/60 hover:border-teal-deep hover:text-teal-deep",
        active ? "border-teal text-teal" : "",
      ].join(" ")}
    >
      <span aria-hidden>{active ? "✓" : "+"}</span>
      {active ? "In comparison" : "Compare"}
      <span className="sr-only">{productName}</span>
    </button>
  );
}
