import type { Sticker } from "@/types/catalogue";

/**
 * Personal stamps an advisor can apply to any product, stored per browser in
 * localStorage — no account, no backend.
 *
 * `shape` and `tone` pick the placeholder artwork in /components/stamps; they
 * are the hook for the real stamp images when those arrive.
 */
export const stickers: Sticker[] = [
  { id: "new", label: "New", short: "NEW", shape: "rect", tone: "red" },
  { id: "top-seller", label: "Top Seller", short: "TS", shape: "circle", tone: "brown" },
  { id: "easy-to-recommend", label: "Easy to Recommend", short: "ETR", shape: "circle", tone: "brown" },
  { id: "personal-favourite", label: "Personal Favourite", short: "PF", shape: "circle", tone: "brown" },
  { id: "good-gift", label: "Good Gift", short: "GIFT", shape: "rect", tone: "red" },
  { id: "my-pick", label: "My Pick", short: "PICK", shape: "circle", tone: "brown" },
];

export const stickerById = new Map(stickers.map((sticker) => [sticker.id, sticker]));
