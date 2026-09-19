import type { Sticker } from "@/types/catalogue";

/**
 * Personal stickers an advisor can apply to any product. They are stored per
 * browser in localStorage — no account, no backend.
 */
export const stickers: Sticker[] = [
  { id: "top-seller", label: "Top Seller", short: "TS" },
  { id: "new", label: "New", short: "NEW" },
  { id: "easy-to-recommend", label: "Easy to Recommend", short: "ETR" },
  { id: "personal-favourite", label: "Personal Favourite", short: "PF" },
  { id: "good-gift", label: "Good Gift", short: "GIF" },
  { id: "my-pick", label: "My Pick", short: "PICK" },
];

export const stickerById = new Map(stickers.map((sticker) => [sticker.id, sticker]));
