import { useDraftNote } from "../hooks/useDraftNote";

interface NoteComposerProps {
  onSubmit: (body: string) => Promise<void>;
}

export function NoteComposer({ onSubmit }: NoteComposerProps) {
  const { body, setBody, status, error, submit } = useDraftNote(onSubmit);

  return (
    <form className="note-composer" onSubmit={submit}>
      <label htmlFor="handoff-note">Add handoff note</label>
      <textarea
        id="handoff-note"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Record what the next responder needs to know"
        rows={4}
      />
      <div className="composer-actions">
        <span className="form-error" role="alert">
          {error}
        </span>
        <button disabled={!body.trim() || status === "saving"} type="submit">
          {status === "saving" ? "Saving…" : "Add note"}
        </button>
      </div>
    </form>
  );
}
