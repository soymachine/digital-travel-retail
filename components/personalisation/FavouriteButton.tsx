"use client";

import { usePassport } from "@/components/personalisation/PassportStateProvider";

export function FavouriteButton({
  productId,
  productName,
  tone = "ink",
  className = "",
}: {
  productId: string;
  productName: string;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  const { isFavourite, toggleFavourite, ready } = usePassport();
  const active = ready && isFavourite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from favourites` : `Add ${productName} to favourites`}
      title={active ? "Remove from favourites" : "Add to favourites"}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200",
        tone === "ink"
          ? "border-ivory/25 hover:border-gold"
          : "border-ink/20 hover:border-gold-deep",
        active ? "border-gold text-gold" : tone === "ink" ? "text-ivory/60" : "text-ink/50",
        className,
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden focusable="false">
        <path
          d="M12 20.3 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{active ? "Favourited" : "Not favourited"}</span>
    </button>
  );
}
