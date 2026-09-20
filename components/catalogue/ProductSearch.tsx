"use client";

import { useId } from "react";

export function ProductSearch({
  value,
  onChange,
  placeholder = "Search the collection...",
  resultCount,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount: number;
}) {
  const inputId = useId();

  return (
    <div id="search" className="flex-1 scroll-mt-24">
      <label htmlFor={inputId} className="eyebrow-muted">
        Search
      </label>
      <div className="mt-2 flex items-center gap-3 rounded-full border border-line bg-paper-panel px-5 py-3 focus-within:border-cocoa-soft">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-taupe" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" strokeLinecap="round" />
        </svg>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-[15px] text-ink placeholder:text-taupe focus:outline-none"
        />
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-taupe hover:text-cocoa">
            Clear
          </button>
        )}
      </div>
      <p aria-live="polite" className="mt-2 text-sm text-taupe">
        {resultCount} {resultCount === 1 ? "fragrance" : "fragrances"}
      </p>
    </div>
  );
}
