import { useMemo, useState } from "react";

import {
  filterHandoffs,
  type Handoff,
  type HandoffFilters,
} from "../domain/handoff";

const initialFilters: HandoffFilters = {
  query: "",
  team: "all",
  status: "active",
};

export function useHandoffFilters(handoffs: Handoff[]) {
  const [filters, setFilters] = useState<HandoffFilters>(initialFilters);
  const visibleHandoffs = useMemo(
    () => filterHandoffs(handoffs, filters),
    [filters, handoffs],
  );

  return { filters, setFilters, visibleHandoffs };
}
