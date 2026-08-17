import { useCallback, useEffect, useState } from "react";

import type { Handoff } from "../domain/handoff";
import type { HandoffRepository } from "../services/handoffRepository";

type LoadStatus = "loading" | "ready" | "error";

export function useHandoffBoard(repository: HandoffRepository) {
  const [handoffs, setHandoffs] = useState<Handoff[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    repository.list(controller.signal).then(
      (items) => {
        setHandoffs(items);
        setStatus("ready");
      },
      (reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to load handoffs");
        setStatus("error");
      },
    );

    return () => controller.abort();
  }, [repository]);

  const addNote = useCallback(
    async (id: string, body: string) => {
      const updated = await repository.addNote(id, body);
      setHandoffs((current) =>
        current.map((handoff) => (handoff.id === updated.id ? updated : handoff)),
      );
    },
    [repository],
  );

  return { handoffs, status, error, addNote };
}
