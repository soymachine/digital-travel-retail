"use client";

import { stickers as allStickers } from "@/data/stickers";
import type { CatalogueFilters } from "@/lib/search";

type FilterGroupProps = {
  legend: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
};

function FilterGroup({ legend, options, selected, onToggle }: FilterGroupProps) {
  return (
    <fieldset>
      <legend className="signage-sm text-ink/50">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              aria-pressed={active}
              className={[
                "signage border px-3 py-2 transition-colors duration-200",
                active
                  ? "border-gold-deep bg-gold-deep/10 text-gold-deep"
                  : "border-ink/20 text-ink/60 hover:border-ink/45 hover:text-ink",
              ].join(" ")}
            >
              {active && <span aria-hidden className="mr-2">✓</span>}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ProductFilters({
  families,
  concentrations,
  filters,
  onChange,
}: {
  families: string[];
  concentrations: string[];
  filters: CatalogueFilters;
  onChange: (next: CatalogueFilters) => void;
}) {
  function toggle(key: "families" | "concentrations" | "stickers", value: string) {
    const current = filters[key];
    onChange({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    });
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <FilterGroup
        legend="Fragrance family"
        options={families.map((family) => ({ value: family, label: family }))}
        selected={filters.families}
        onToggle={(value) => toggle("families", value)}
      />
      <FilterGroup
        legend="Product type"
        options={concentrations.map((item) => ({ value: item, label: item }))}
        selected={filters.concentrations}
        onToggle={(value) => toggle("concentrations", value)}
      />
      <FilterGroup
        legend="Personal sticker"
        options={allStickers.map((sticker) => ({ value: sticker.id, label: sticker.label }))}
        selected={filters.stickers}
        onToggle={(value) => toggle("stickers", value)}
      />
    </div>
  );
}
