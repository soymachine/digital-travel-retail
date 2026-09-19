"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Sticker } from "@/components/personalisation/Sticker";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { stickers } from "@/data/stickers";

/**
 * "Add sticker +" control. Opens a small panel of the six personal stickers;
 * each one toggles independently and persists to localStorage immediately.
 */
export function StickerPicker({
  productId,
  productName,
  tone = "ink",
}: {
  productId: string;
  productName: string;
  tone?: "ink" | "ivory";
}) {
  const { stickersFor, toggleSticker, ready } = usePassport();
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const applied = ready ? stickersFor(productId) : [];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isInk = tone === "ink";

  return (
    <div ref={containerRef} className={open ? "relative z-40" : "relative"}>
      <div className="flex flex-wrap items-center gap-2">
        {applied.map((stickerId) => (
          <Sticker
            key={stickerId}
            stickerId={stickerId}
            tone={tone}
            animate={stickerId === justAdded}
          />
        ))}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={[
            "signage inline-flex items-center gap-2 border border-dashed px-3 py-2 transition-colors duration-200",
            isInk
              ? "border-ivory/30 text-ivory/70 hover:border-gold hover:text-gold"
              : "border-ink/25 text-ink/60 hover:border-gold-deep hover:text-gold-deep",
          ].join(" ")}
        >
          Add sticker
          <span aria-hidden>+</span>
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={`Personal stickers for ${productName}`}
          className="absolute left-0 z-30 mt-3 w-64 animate-fade-in border border-ivory-line bg-ivory p-3 text-ink shadow-xl on-ivory"
        >
          <p className="signage-sm mb-3 text-ink/50">Add personal sticker</p>
          <ul className="space-y-1">
            {stickers.map((sticker) => {
              const active = applied.includes(sticker.id);
              return (
                <li key={sticker.id}>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSticker(productId, sticker.id);
                      setJustAdded(active ? null : sticker.id);
                    }}
                    aria-pressed={active}
                    className="flex w-full items-center gap-3 px-2 py-2 text-left font-mono text-[11px] uppercase tracking-wide2 transition-colors duration-200 hover:bg-ivory-deep"
                  >
                    <span
                      aria-hidden
                      className={[
                        "flex h-4 w-4 items-center justify-center rounded-full border",
                        active ? "border-gold-deep bg-gold-deep text-ivory" : "border-ink/30",
                      ].join(" ")}
                    >
                      {active ? "✓" : ""}
                    </span>
                    {sticker.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
