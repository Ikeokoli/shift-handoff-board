import type { Handoff } from "../domain/handoff";

interface ShiftSummaryProps {
  handoffs: Handoff[];
}

export function ShiftSummary({ handoffs }: ShiftSummaryProps) {
  const active = handoffs.filter((handoff) => handoff.status !== "resolved").length;
  const critical = handoffs.filter(
    (handoff) => handoff.status !== "resolved" && handoff.priority === "critical",
  ).length;
  const watching = handoffs.filter((handoff) => handoff.status === "watching").length;

  return (
    <section className="summary-grid" aria-label="Shift summary">
      <article>
        <span>Active handoffs</span>
        <strong>{active}</strong>
        <small>Across all teams</small>
      </article>
      <article>
        <span>Critical</span>
        <strong>{critical}</strong>
        <small>Needs direct ownership</small>
      </article>
      <article>
        <span>Watching</span>
        <strong>{watching}</strong>
        <small>Monitor this shift</small>
      </article>
    </section>
  );
}
