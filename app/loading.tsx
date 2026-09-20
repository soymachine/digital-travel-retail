export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="h-6 w-32 animate-pulse rounded bg-paper-deep" />
      <div className="mt-5 h-12 w-80 max-w-full animate-pulse rounded bg-paper-deep" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-[30rem] animate-pulse rounded-xl bg-paper-deep" />
        ))}
      </div>
    </div>
  );
}
