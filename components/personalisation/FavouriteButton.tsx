"use client";

import { usePassport } from "@/components/personalisation/PassportStateProvider";

export function FavouriteButton({
  productId,
  productName,
  className = "",
}: {
  productId: string;
  productName: string;
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
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200",
        active ? "border-cocoa text-cocoa" : "border-line text-taupe hover:border-cocoa-soft hover:text-cocoa",
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
