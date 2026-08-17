import { describe, expect, it } from "vitest";

import { handoffFixtures } from "../data/handoffs";
import { filterHandoffs, matchesHandoff } from "./handoff";

describe("handoff domain", () => {
  it("matches across identifying fields", () => {
    expect(
      matchesHandoff(handoffFixtures[0], {
        query: "Maya",
        team: "all",
        status: "active",
      }),
    ).toBe(true);
  });

  it("treats active as every unresolved status", () => {
    const result = filterHandoffs(handoffFixtures, {
      query: "",
      team: "all",
      status: "active",
    });

    expect(result).toHaveLength(6);
    expect(result.every((handoff) => handoff.status !== "resolved")).toBe(true);
  });

  it("combines team and query filters", () => {
    const result = filterHandoffs(handoffFixtures, {
      query: "warehouse",
      team: "Fulfillment",
      status: "all",
    });

    expect(result.map((handoff) => handoff.id)).toEqual(["HO-201"]);
  });

  it("sorts critical work before high and normal work", () => {
    const result = filterHandoffs(handoffFixtures, {
      query: "",
      team: "all",
      status: "all",
    });

    expect(result[0].priority).toBe("critical");
    expect(result.at(-1)?.priority).toBe("normal");
  });
});
