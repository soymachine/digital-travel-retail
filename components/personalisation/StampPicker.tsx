"use client";

import { useEffect, useState } from "react";

import { Stamp } from "@/components/stamps/Stamp";
import { usePassport } from "@/components/personalisation/PassportStateProvider";
import { stickers } from "@/data/stickers";

/**
 * "My stamps" panel: a bottom sheet on mobile, a side card on desktop.
 *
 * Selection is held locally and only written on Save, so the advisor can change
 * their mind — closing the panel discards the pending choice.
 */
export function StampPicker({
  productId,
  productName,
  onClose,
}: {
  productId: string;
  productName: string;
  onClose: (saved: string[] | null) => void;
}) {
  const { stickersFor } = usePassport();
  const [selected, setSelected] = useState<string[]>(() => stickersFor(productId));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function toggle(stickerId: string) {
    setSelected((current) =>
      current.includes(stickerId)
        ? current.filter((id) => id !== stickerId)
        : [...current, stickerId],
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 animate-fade-in bg-ink/25"
        onClick={() => onClose(null)}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`My stamps for ${productName}`}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] animate-slide-up overflow-y-auto rounded-t-2xl border border-line bg-paper-panel p-5 shadow-2xl sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-24 sm:max-h-[calc(100vh-8rem)] sm:w-[30rem] sm:animate-fade-in sm:rounded-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">My stamps</h2>
            <p className="mt-1 text-sm text-taupe">Select one or more</p>
          </div>
          <button
            type="button"
            onClick={() => onClose(null)}
            aria-label="Close stamps panel"
            className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center text-taupe-deep hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-3">
          {stickers.map((sticker) => {
            const active = selected.includes(sticker.id);
            return (
              <li key={sticker.id}>
                <button
                  type="button"
                  onClick={() => toggle(sticker.id)}
                  aria-pressed={active}
                  className={[
                    "relative flex w-full items-center justify-center rounded-xl border-2 bg-paper px-3 py-5 transition-colors duration-200",
                    active ? "border-cocoa" : "border-line hover:border-cocoa-soft",
                  ].join(" ")}
                >
                  <Stamp stickerId={sticker.id} size="md" />
                  <span
                    aria-hidden
                    className={[
                      "absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                      active ? "border-bark bg-bark text-paper" : "border-line bg-paper text-transparent",
                    ].join(" ")}
                  >
                    ✓
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => onClose(selected)}
          className="mt-5 w-full rounded-xl bg-bark px-6 py-4 text-[15px] font-medium text-paper transition-colors duration-200 hover:bg-ink"
        >
          Save stamps
        </button>
      </div>
    </>
  );
}
