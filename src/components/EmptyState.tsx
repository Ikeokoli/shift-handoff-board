export function EmptyState() {
  return (
    <div className="empty-state">
      <span aria-hidden="true">⌁</span>
      <h2>No handoffs match</h2>
      <p>Adjust the search or filters to bring operational work back into view.</p>
    </div>
  );
}
