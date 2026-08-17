export const teams = ["Payments", "Platform", "Fulfillment"] as const;
export type Team = (typeof teams)[number];

export const priorities = ["critical", "high", "normal"] as const;
export type Priority = (typeof priorities)[number];

export const handoffStatuses = ["open", "watching", "resolved"] as const;
export type HandoffStatus = (typeof handoffStatuses)[number];

export interface HandoffNote {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface Handoff {
  id: string;
  title: string;
  summary: string;
  team: Team;
  owner: string;
  priority: Priority;
  status: HandoffStatus;
  updatedAt: string;
  notes: HandoffNote[];
}

export interface HandoffFilters {
  query: string;
  team: "all" | Team;
  status: "active" | "all" | HandoffStatus;
}

const priorityOrder: Record<Priority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
};

export function matchesHandoff(handoff: Handoff, filters: HandoffFilters): boolean {
  const query = filters.query.trim().toLocaleLowerCase();
  const matchesQuery =
    query.length === 0 ||
    [handoff.id, handoff.title, handoff.summary, handoff.owner, handoff.team]
      .join(" ")
      .toLocaleLowerCase()
      .includes(query);
  const matchesTeam = filters.team === "all" || handoff.team === filters.team;
  const matchesStatus =
    filters.status === "all" ||
    (filters.status === "active"
      ? handoff.status !== "resolved"
      : handoff.status === filters.status);

  return matchesQuery && matchesTeam && matchesStatus;
}

export function sortHandoffs(handoffs: Handoff[]): Handoff[] {
  return [...handoffs].sort((left, right) => {
    const priorityDifference =
      priorityOrder[left.priority] - priorityOrder[right.priority];
    if (priorityDifference !== 0) return priorityDifference;
    return Date.parse(right.updatedAt) - Date.parse(left.updatedAt);
  });
}

export function filterHandoffs(
  handoffs: Handoff[],
  filters: HandoffFilters,
): Handoff[] {
  return sortHandoffs(handoffs.filter((handoff) => matchesHandoff(handoff, filters)));
}
