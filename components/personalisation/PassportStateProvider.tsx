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
  isFavourite: (productId: string) => boolean;
  toggleFavourite: (productId: string) => void;
  stickersFor: (productId: string) => string[];
  toggleSticker: (productId: string, stickerId: string) => void;
  isComparing: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
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

  const toggleCompare = useCallback((productId: string) => {
    setState((current) => {
      const active = current.compare.includes(productId);

      if (!active && current.compare.length >= MAX_COMPARE) {
        // The controls are disabled at the cap; ignore anything that slips past.
        return current;
      }

      const compare = active
        ? current.compare.filter((id) => id !== productId)
        : [...current.compare, productId];

      if (!active) track({ name: "comparison_started", productIds: compare });
      return { ...current, compare };
    });
  }, []);

  const clearCompare = useCallback(() => {
    setState((current) => ({ ...current, compare: [] }));
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
      isFavourite: (productId) => state.favourites.includes(productId),
      toggleFavourite,
      stickersFor: (productId) => state.stickers[productId] ?? [],
      toggleSticker,
      isComparing: (productId) => state.compare.includes(productId),
      toggleCompare,
      clearCompare,
      stickerCount,
      reset,
    };
  }, [clearCompare, ready, reset, state, toggleCompare, toggleFavourite, toggleSticker]);

  return <PassportContext.Provider value={value}>{children}</PassportContext.Provider>;
}

export function usePassport(): PassportContextValue {
  const context = useContext(PassportContext);
  if (!context) {
    throw new Error("usePassport must be used inside a PassportStateProvider.");
  }
  return context;
}
