export default function Loading() {
  return (
    <div role="status" aria-label="Loading page" className="mx-auto min-h-[70vh] max-w-7xl px-5 py-12 sm:px-6" aria-live="polite">
      <div className="route-loading-progress" />
      <span className="sr-only">Loading page…</span>
      <div className="animate-pulse">
        <div className="h-3 w-28 rounded-full bg-red-100" />
        <div className="mt-4 h-10 w-64 max-w-full rounded-xl bg-slate-200" />
        <div className="mt-3 h-5 w-96 max-w-full rounded-lg bg-slate-100" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="h-40 rounded-3xl border border-slate-100 bg-slate-100" />)}
        </div>
      </div>
    </div>
  );
}
