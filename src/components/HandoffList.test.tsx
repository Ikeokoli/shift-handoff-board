import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { handoffFixtures } from "../data/handoffs";
import { HandoffList } from "./HandoffList";

describe("HandoffList", () => {
  it("announces and selects a handoff through a semantic button", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <HandoffList
        handoffs={handoffFixtures.slice(0, 2)}
        onSelect={onSelect}
        selectedId="HO-208"
      />,
    );

    const second = screen.getByRole("button", { name: /HO-207 Queue workers/i });
    await user.click(second);

    expect(onSelect).toHaveBeenCalledWith("HO-207");
    expect(screen.getByRole("button", { name: /HO-208 Card authorization/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
