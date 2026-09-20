"use client";

import { useId } from "react";

import type { SortKey } from "@/lib/search";

const options: { value: SortKey; label: string }[] = [
  { value: "default", label: "Collection order" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "family", label: "Olfactive family" },
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
      <label htmlFor={selectId} className="eyebrow-muted">
        Sort
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="mt-2 w-full rounded-full border border-line bg-paper-panel px-5 py-3 text-[15px] text-ink focus:border-cocoa-soft focus:outline-none"
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
