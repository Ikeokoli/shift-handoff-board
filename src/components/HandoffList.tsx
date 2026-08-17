import type { Handoff } from "../domain/handoff";
import { EmptyState } from "./EmptyState";
import { PriorityBadge } from "./PriorityBadge";

interface HandoffListProps {
  handoffs: Handoff[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function HandoffList({
  handoffs,
  selectedId,
  onSelect,
}: HandoffListProps) {
  if (handoffs.length === 0) return <EmptyState />;

  return (
    <ul className="handoff-list" aria-label="Shift handoffs">
      {handoffs.map((handoff) => (
        <li key={handoff.id}>
          <button
            aria-label={`${handoff.id} ${handoff.title}`}
            aria-pressed={handoff.id === selectedId}
            className="handoff-card"
            data-selected={handoff.id === selectedId}
            onClick={() => onSelect(handoff.id)}
            type="button"
          >
            <span className="handoff-card-topline">
              <span>{handoff.id}</span>
              <PriorityBadge priority={handoff.priority} />
            </span>
            <strong>{handoff.title}</strong>
            <span className="handoff-summary">{handoff.summary}</span>
            <span className="handoff-meta">
              <span>{handoff.team}</span>
              <span>{handoff.owner}</span>
              <time dateTime={handoff.updatedAt}>
                {timeFormatter.format(new Date(handoff.updatedAt))}
              </time>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
