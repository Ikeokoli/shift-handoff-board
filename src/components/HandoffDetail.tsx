import type { Handoff } from "../domain/handoff";
import { NoteComposer } from "./NoteComposer";
import { PriorityBadge } from "./PriorityBadge";

interface HandoffDetailProps {
  handoff: Handoff | null;
  onAddNote: (id: string, body: string) => Promise<void>;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function HandoffDetail({ handoff, onAddNote }: HandoffDetailProps) {
  if (!handoff) {
    return (
      <aside className="detail-panel detail-placeholder">
        <p>Select a handoff to review its context and notes.</p>
      </aside>
    );
  }

  return (
    <aside className="detail-panel" aria-labelledby="detail-title">
      <div className="detail-heading">
        <div>
          <span>{handoff.id}</span>
          <h2 id="detail-title">{handoff.title}</h2>
        </div>
        <PriorityBadge priority={handoff.priority} />
      </div>

      <p className="detail-summary">{handoff.summary}</p>

      <dl className="detail-facts">
        <div>
          <dt>Owner</dt>
          <dd>{handoff.owner}</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>{handoff.team}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{handoff.status}</dd>
        </div>
      </dl>

      <section className="notes" aria-labelledby="notes-title">
        <div className="section-heading">
          <h3 id="notes-title">Shift notes</h3>
          <span>{handoff.notes.length}</span>
        </div>
        {handoff.notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add the first update for the next shift.</p>
        ) : (
          <ol>
            {handoff.notes.map((note) => (
              <li key={note.id}>
                <div>
                  <strong>{note.author}</strong>
                  <time dateTime={note.createdAt}>
                    {dateFormatter.format(new Date(note.createdAt))}
                  </time>
                </div>
                <p>{note.body}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      <NoteComposer
        key={handoff.id}
        onSubmit={(body) => onAddNote(handoff.id, body)}
      />
    </aside>
  );
}
