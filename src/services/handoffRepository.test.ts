import { describe, expect, it } from "vitest";

import { handoffFixtures } from "../data/handoffs";
import { createHandoffRepository } from "./handoffRepository";

describe("handoff repository", () => {
  it("returns defensive copies", async () => {
    const repository = createHandoffRepository(handoffFixtures.slice(0, 1));
    const first = await repository.list();
    first[0].title = "Changed outside the repository";

    const second = await repository.list();
    expect(second[0].title).toBe("Card authorization latency above target");
  });

  it("adds a trimmed note", async () => {
    const repository = createHandoffRepository(handoffFixtures.slice(0, 1));
    const updated = await repository.addNote("HO-208", "  Continue monitoring  ");

    expect(updated.notes.at(-1)?.body).toBe("Continue monitoring");
  });

  it("rejects an unknown handoff", async () => {
    const repository = createHandoffRepository([]);
    await expect(repository.addNote("missing", "Update")).rejects.toThrow(
      "Handoff missing was not found",
    );
  });
});
