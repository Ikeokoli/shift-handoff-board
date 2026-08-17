import type { Priority } from "../domain/handoff";

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <span className={`priority-badge priority-${priority}`}>{priority}</span>;
}
