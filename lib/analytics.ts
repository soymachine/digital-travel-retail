/**
 * Analytics seam.
 *
 * The demo intentionally ships no analytics backend, but every meaningful
 * interaction is routed through this function so a provider can be plugged in
 * later without touching the components.
 */

export type PassportEvent =
  | { name: "product_view"; productId: string }
  | { name: "search"; query: string; results: number }
  | { name: "filter_used"; filter: string; value: string }
  | { name: "favourite_added"; productId: string }
  | { name: "favourite_removed"; productId: string }
  | { name: "sticker_added"; productId: string; stickerId: string }
  | { name: "sticker_removed"; productId: string; stickerId: string }
  | { name: "comparison_started"; productIds: string[] }
  | { name: "comparison_completed"; productIds: string[] };

export function track(event: PassportEvent): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[passport]", event.name, event);
  }
}
