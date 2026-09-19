import type { CatalogueProduct } from "@/types/catalogue";

/**
 * The notes the brand communicates for a fragrance, shown as a flat list:
 * no top/heart/base levels are supplied, so none are implied.
 */
export function ProductNotes({ notes }: { notes: CatalogueProduct["keyNotes"] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {notes.map((note) => (
        <li key={note} className="border-t border-ink/15 pt-4">
          <p className="font-display text-xl leading-snug text-ink">{note}</p>
        </li>
      ))}
    </ul>
  );
}
