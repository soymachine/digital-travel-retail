/**
 * Local persistence for the advisor's personal state.
 *
 * The demo has no account and no backend: favourites, personal stickers and the
 * comparison selection live in this browser only.
 */

export type PassportState = {
  favourites: string[];
  stickers: Record<string, string[]>;
  compare: string[];
};

export const STORAGE_KEY = "sales-passport:v1";

export const emptyPassportState: PassportState = {
  favourites: [],
  stickers: {},
  compare: [],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/** Accepts anything and returns a state object that is safe to render. */
export function normalisePassportState(value: unknown): PassportState {
  if (!value || typeof value !== "object") return emptyPassportState;

  const raw = value as Partial<Record<keyof PassportState, unknown>>;

  const stickers: Record<string, string[]> = {};
  if (raw.stickers && typeof raw.stickers === "object") {
    Object.entries(raw.stickers as Record<string, unknown>).forEach(([productId, applied]) => {
      if (isStringArray(applied) && applied.length > 0) stickers[productId] = applied;
    });
  }

  return {
    favourites: isStringArray(raw.favourites) ? raw.favourites : [],
    stickers,
    compare: isStringArray(raw.compare) ? raw.compare.slice(0, 3) : [],
  };
}

export function readPassportState(): PassportState {
  if (typeof window === "undefined") return emptyPassportState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalisePassportState(JSON.parse(raw)) : emptyPassportState;
  } catch {
    // Private mode, disabled storage or corrupted payload: start clean.
    return emptyPassportState;
  }
}

export function writePassportState(state: PassportState): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Persistence is a convenience here; never break the session over it.
  }
}
