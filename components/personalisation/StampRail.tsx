"use client";

import { useState } from "react";

import { Stamp } from "@/components/stamps/Stamp";
import { StampPicker } from "@/components/personalisation/StampPicker";
import { usePassport } from "@/components/personalisation/PassportStateProvider";

/**
 * The stamps applied to a product, plus the control that opens the picker.
 * Used on the card, the product page and the comparison columns.
 */
export function StampRail({
  productId,
  productName,
  align = "start",
  size = "md",
  showLabel = true,
}: {
  productId: string;
  productName: string;
  align?: "start" | "center";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) {
  const { stickersFor, setStickers, ready } = usePassport();
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string[]>([]);

  const applied = ready ? stickersFor(productId) : [];

  return (
    <div className={align === "center" ? "text-center" : ""}>
      {showLabel && <p className="eyebrow-muted">My stamps</p>}

      <div
        className={[
          "mt-3 flex flex-wrap items-center gap-3",
          align === "center" ? "justify-center" : "",
        ].join(" ")}
      >
        {applied.map((stickerId) => (
          <Stamp
            key={stickerId}
            stickerId={stickerId}
            size={size}
            animate={justAdded.includes(stickerId)}
          />
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Add a stamp to ${productName}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-cocoa-soft text-xl text-cocoa transition-colors duration-200 hover:border-cocoa hover:bg-paper-deep"
        >
          <span aria-hidden>+</span>
        </button>
      </div>

      {open && (
        <StampPicker
          productId={productId}
          productName={productName}
          onClose={(saved) => {
            if (saved) {
              setJustAdded(saved.filter((id) => !applied.includes(id)));
              setStickers(productId, saved);
            }
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
