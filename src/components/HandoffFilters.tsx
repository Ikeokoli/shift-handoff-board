import type { Dispatch, RefObject, SetStateAction } from "react";

import { teams, type HandoffFilters as Filters } from "../domain/handoff";

interface HandoffFiltersProps {
  filters: Filters;
  onChange: Dispatch<SetStateAction<Filters>>;
  searchRef: RefObject<HTMLInputElement | null>;
}

export function HandoffFilters({
  filters,
  onChange,
  searchRef,
}: HandoffFiltersProps) {
  return (
    <section className="filter-bar" aria-label="Filter handoffs">
      <label className="search-field">
        <span>Search handoffs</span>
        <div>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            value={filters.query}
            onChange={(event) =>
              onChange((current) => ({ ...current, query: event.target.value }))
            }
            placeholder="ID, owner, or update"
          />
          <kbd aria-hidden="true">/</kbd>
        </div>
      </label>

      <label>
        <span>Team</span>
        <select
          value={filters.team}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              team: event.target.value as Filters["team"],
            }))
          }
        >
          <option value="all">All teams</option>
          {teams.map((team) => (
            <option key={team}>{team}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Status</span>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange((current) => ({
              ...current,
              status: event.target.value as Filters["status"],
            }))
          }
        >
          <option value="active">Active</option>
          <option value="open">Open</option>
          <option value="watching">Watching</option>
          <option value="resolved">Resolved</option>
          <option value="all">All statuses</option>
        </select>
      </label>
    </section>
  );
}
