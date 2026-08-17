import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it } from "vitest";

import type { HandoffFilters as Filters } from "../domain/handoff";
import { HandoffFilters } from "./HandoffFilters";

function Harness() {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    team: "all",
    status: "active",
  });

  return (
    <HandoffFilters
      filters={filters}
      onChange={setFilters}
      searchRef={createRef<HTMLInputElement>()}
    />
  );
}

describe("HandoffFilters", () => {
  it("updates search and select controls", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(screen.getByRole("searchbox", { name: "Search handoffs" }), "queue");
    await user.selectOptions(screen.getByLabelText("Team"), "Platform");

    expect(screen.getByRole("searchbox")).toHaveValue("queue");
    expect(screen.getByLabelText("Team")).toHaveValue("Platform");
  });
});
