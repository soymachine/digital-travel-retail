"use client";

import { useId } from "react";

import type { SortKey } from "@/lib/search";

const options: { value: SortKey; label: string }[] = [
  { value: "default", label: "Collection order" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "family", label: "Fragrance family" },
];

export function ProductSort({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  const selectId = useId();

  return (
    <div className="sm:w-56">
      <label htmlFor={selectId} className="signage-sm text-ink/50">
        Sort
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="mt-2 w-full border border-ink/20 bg-ivory px-4 py-3 font-mono text-xs uppercase tracking-wide2 text-ink focus:border-gold-deep focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
