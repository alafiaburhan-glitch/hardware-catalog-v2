export default function Loading() {
  return (
    <div role="status" aria-label="Loading page">
      <div className="route-loading-progress" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
