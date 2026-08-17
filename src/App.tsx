import { useRef } from "react";

import { AppHeader } from "./components/AppHeader";
import { HandoffDetail } from "./components/HandoffDetail";
import { HandoffFilters } from "./components/HandoffFilters";
import { HandoffList } from "./components/HandoffList";
import { LiveStatus } from "./components/LiveStatus";
import { ShiftSummary } from "./components/ShiftSummary";
import { useHandoffBoard } from "./hooks/useHandoffBoard";
import { useHandoffFilters } from "./hooks/useHandoffFilters";
import { useSearchShortcut } from "./hooks/useSearchShortcut";
import { useSelectedHandoff } from "./hooks/useSelectedHandoff";
import { handoffRepository } from "./services/handoffRepository";

export function App() {
  const searchRef = useRef<HTMLInputElement>(null);
  const { handoffs, status, error, addNote } = useHandoffBoard(handoffRepository);
  const { filters, setFilters, visibleHandoffs } = useHandoffFilters(handoffs);
  const { selectedId, setSelectedId, selectedHandoff } =
    useSelectedHandoff(handoffs);

  useSearchShortcut(searchRef);

  const activeCount = handoffs.filter(
    (handoff) => handoff.status !== "resolved",
  ).length;

  return (
    <div className="app-shell">
      <AppHeader activeCount={activeCount} />
      <main>
        <section className="page-intro">
          <div>
            <p className="eyebrow">Monday · 17 August</p>
            <h2>Keep the next shift moving</h2>
            <p>Review ownership, capture context, and surface the work that needs attention.</p>
          </div>
          <LiveStatus
            count={visibleHandoffs.length}
            error={error}
            loading={status === "loading"}
          />
        </section>

        <ShiftSummary handoffs={handoffs} />
        <HandoffFilters
          filters={filters}
          onChange={setFilters}
          searchRef={searchRef}
        />

        <section className="workspace" aria-label="Handoff workspace">
          <div className="queue-panel">
            <div className="section-heading queue-heading">
              <div>
                <h2>Handoff queue</h2>
                <span>Priority first, then most recent</span>
              </div>
              <span>{visibleHandoffs.length}</span>
            </div>
            <HandoffList
              handoffs={visibleHandoffs}
              onSelect={setSelectedId}
              selectedId={selectedId}
            />
          </div>
          <HandoffDetail handoff={selectedHandoff} onAddNote={addNote} />
        </section>
      </main>
    </div>
  );
}
