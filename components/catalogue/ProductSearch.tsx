"use client";

import { useId } from "react";

export function ProductSearch({
  value,
  onChange,
  placeholder = "Search Million products...",
  resultCount,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount: number;
}) {
  const inputId = useId();

  return (
    <div className="flex-1">
      <label htmlFor={inputId} className="signage-sm text-ink/50">
        Search
      </label>
      <div className="mt-2 flex items-center gap-3 border border-ink/20 bg-ivory px-4 py-3 focus-within:border-gold-deep">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink/40" aria-hidden focusable="false">
          <circle cx="11" cy="11" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent font-mono text-xs uppercase tracking-wide2 text-ink placeholder:text-ink/35 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="signage-sm text-ink/45 hover:text-gold-deep"
          >
            Clear
          </button>
        )}
      </div>
      <p aria-live="polite" className="signage-sm mt-2 text-ink/45">
        {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}
