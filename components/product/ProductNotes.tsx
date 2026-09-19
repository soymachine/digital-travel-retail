import type { CatalogueProduct } from "@/types/catalogue";

const levels = [
  { key: "top", label: "Top" },
  { key: "heart", label: "Heart" },
  { key: "base", label: "Base" },
] as const;

export function ProductNotes({ notes }: { notes: CatalogueProduct["notes"] }) {
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {levels.map((level) => (
        <div key={level.key} className="border-t border-ink/15 pt-4">
          <dt className="signage-sm text-gold-deep">{level.label}</dt>
          <dd className="mt-3 space-y-1">
            {notes[level.key].map((note) => (
              <p key={note} className="font-display text-xl leading-snug text-ink">
                {note}
              </p>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
