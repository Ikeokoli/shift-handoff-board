import { useEffect, useState } from "react";

import type { Handoff } from "../domain/handoff";

export function useSelectedHandoff(handoffs: Handoff[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId === null && handoffs.length > 0) {
      setSelectedId(handoffs[0].id);
    }
  }, [handoffs, selectedId]);

  const selectedHandoff =
    handoffs.find((handoff) => handoff.id === selectedId) ?? null;

  return { selectedId, setSelectedId, selectedHandoff };
}
