export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="h-8 w-48 animate-pulse bg-ink-soft" />
      <div className="mt-6 h-64 animate-pulse bg-ink-soft" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-96 animate-pulse bg-ink-soft" />
        ))}
      </div>
    </div>
  );
}
