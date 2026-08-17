import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { handoffFixtures } from "../data/handoffs";
import { useHandoffFilters } from "./useHandoffFilters";

describe("useHandoffFilters", () => {
  it("starts with active handoffs", () => {
    const { result } = renderHook(() => useHandoffFilters(handoffFixtures));
    expect(result.current.visibleHandoffs).toHaveLength(6);
  });

  it("updates the derived list when filters change", () => {
    const { result } = renderHook(() => useHandoffFilters(handoffFixtures));

    act(() => {
      result.current.setFilters((current) => ({ ...current, team: "Payments" }));
    });

    expect(result.current.visibleHandoffs.map((handoff) => handoff.id)).toEqual([
      "HO-208",
      "HO-202",
    ]);
  });
});
