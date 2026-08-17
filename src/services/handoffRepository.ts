import { handoffFixtures } from "../data/handoffs";
import type { Handoff } from "../domain/handoff";

export interface HandoffRepository {
  list(signal?: AbortSignal): Promise<Handoff[]>;
  addNote(id: string, body: string, signal?: AbortSignal): Promise<Handoff>;
}

function cloneHandoff(handoff: Handoff): Handoff {
  return {
    ...handoff,
    notes: handoff.notes.map((note) => ({ ...note })),
  };
}

function abortError(): Error {
  const error = new Error("The operation was aborted");
  error.name = "AbortError";
  return error;
}

function wait(duration: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError());
      return;
    }

    const timeout = window.setTimeout(resolve, duration);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeout);
        reject(abortError());
      },
      { once: true },
    );
  });
}

export function createHandoffRepository(
  seed: Handoff[] = handoffFixtures,
): HandoffRepository {
  let handoffs = seed.map(cloneHandoff);
  let noteSequence = 1;

  return {
    async list(signal) {
      await wait(80, signal);
      return handoffs.map(cloneHandoff);
    },

    async addNote(id, body, signal) {
      await wait(100, signal);
      const handoff = handoffs.find((candidate) => candidate.id === id);

      if (!handoff) throw new Error(`Handoff ${id} was not found`);

      const updated: Handoff = {
        ...handoff,
        updatedAt: new Date().toISOString(),
        notes: [
          ...handoff.notes,
          {
            id: `note-${noteSequence++}`,
            author: "Current responder",
            body: body.trim(),
            createdAt: new Date().toISOString(),
          },
        ],
      };

      handoffs = handoffs.map((candidate) =>
        candidate.id === id ? updated : candidate,
      );
      return cloneHandoff(updated);
    },
  };
}

export const handoffRepository = createHandoffRepository();
