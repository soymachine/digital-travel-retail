"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { track } from "@/lib/analytics";
import {
  emptyPassportState,
  readPassportState,
  writePassportState,
  type PassportState,
} from "@/lib/storage";

export const MAX_COMPARE = 3;

type PassportContextValue = {
  /** False until localStorage has been read, so the UI can avoid hydration flashes. */
  ready: boolean;
  favourites: string[];
  stickers: Record<string, string[]>;
  compare: string[];
  compareLine: string | null;
  isFavourite: (productId: string) => boolean;
  toggleFavourite: (productId: string) => void;
  stickersFor: (productId: string) => string[];
  toggleSticker: (productId: string, stickerId: string) => void;
  /** Replace a product's stamps wholesale — what the "Save stamps" panel does. */
  setStickers: (productId: string, stickerIds: string[]) => void;
  isComparing: (productId: string) => boolean;
  /** Selecting from another collection starts that collection's comparison. */
  toggleCompare: (productId: string, lineId: string) => void;
  clearCompare: () => void;
  stickerCount: number;
  reset: () => void;
};

const PassportContext = createContext<PassportContextValue | null>(null);

export function PassportStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PassportState>(emptyPassportState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readPassportState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) writePassportState(state);
  }, [ready, state]);

  const toggleFavourite = useCallback((productId: string) => {
    setState((current) => {
      const active = current.favourites.includes(productId);
      track({ name: active ? "favourite_removed" : "favourite_added", productId });
      return {
        ...current,
        favourites: active
          ? current.favourites.filter((id) => id !== productId)
          : [...current.favourites, productId],
      };
    });
  }, []);

  const toggleSticker = useCallback((productId: string, stickerId: string) => {
    setState((current) => {
      const applied = current.stickers[productId] ?? [];
      const active = applied.includes(stickerId);
      track({ name: active ? "sticker_removed" : "sticker_added", productId, stickerId });

      const next = active
        ? applied.filter((id) => id !== stickerId)
        : [...applied, stickerId];

      const stickers = { ...current.stickers };
      if (next.length > 0) {
        stickers[productId] = next;
      } else {
        delete stickers[productId];
      }

      return { ...current, stickers };
    });
  }, []);

  const setStickers = useCallback((productId: string, stickerIds: string[]) => {
    setState((current) => {
      const applied = current.stickers[productId] ?? [];
      applied
        .filter((id) => !stickerIds.includes(id))
        .forEach((stickerId) => track({ name: "sticker_removed", productId, stickerId }));
      stickerIds
        .filter((id) => !applied.includes(id))
        .forEach((stickerId) => track({ name: "sticker_added", productId, stickerId }));

      const stickers = { ...current.stickers };
      if (stickerIds.length > 0) {
        stickers[productId] = stickerIds;
      } else {
        delete stickers[productId];
      }

      return { ...current, stickers };
    });
  }, []);

  const toggleCompare = useCallback((productId: string, lineId: string) => {
    setState((current) => {
      // A comparison holds one collection, so picking from another starts over.
      if (current.compareLine !== lineId) {
        track({ name: "comparison_started", productIds: [productId] });
        return { ...current, compare: [productId], compareLine: lineId };
      }

      const active = current.compare.includes(productId);

      if (!active && current.compare.length >= MAX_COMPARE) {
        // The controls are disabled at the cap; ignore anything that slips past.
        return current;
      }

      const compare = active
        ? current.compare.filter((id) => id !== productId)
        : [...current.compare, productId];

      if (!active) track({ name: "comparison_started", productIds: compare });
      return { ...current, compare, compareLine: compare.length ? lineId : null };
    });
  }, []);

  const clearCompare = useCallback(() => {
    setState((current) => ({ ...current, compare: [], compareLine: null }));
  }, []);

  const reset = useCallback(() => setState(emptyPassportState), []);

  const value = useMemo<PassportContextValue>(() => {
    const stickerCount = Object.values(state.stickers).reduce(
      (total, applied) => total + applied.length,
      0,
    );

    return {
      ready,
      favourites: state.favourites,
      stickers: state.stickers,
      compare: state.compare,
      compareLine: state.compareLine,
      isFavourite: (productId) => state.favourites.includes(productId),
      toggleFavourite,
      stickersFor: (productId) => state.stickers[productId] ?? [],
      toggleSticker,
      setStickers,
      isComparing: (productId) => state.compare.includes(productId),
      toggleCompare,
      clearCompare,
      stickerCount,
      reset,
    };
  }, [clearCompare, ready, reset, setStickers, state, toggleCompare, toggleFavourite, toggleSticker]);

  return <PassportContext.Provider value={value}>{children}</PassportContext.Provider>;
}

export function usePassport(): PassportContextValue {
  const context = useContext(PassportContext);
  if (!context) {
    throw new Error("usePassport must be used inside a PassportStateProvider.");
  }
  return context;
}
