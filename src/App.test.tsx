import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("loads the active handoff queue and initial detail", async () => {
    render(<App />);

    await screen.findByRole("heading", {
      name: "Card authorization latency above target",
    });
    expect(
      screen.getByRole("button", {
        name: /HO-208 Card authorization latency above target/i,
      }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Shift notes" })).toBeVisible();
    expect(screen.getByText("6 handoffs shown")).toBeVisible();
  });

  it("filters the queue without losing the selected detail", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole("heading", {
      name: "Card authorization latency above target",
    });
    await user.selectOptions(screen.getByLabelText("Team"), "Platform");

    expect(
      within(screen.getByRole("list", { name: "Shift handoffs" })).getAllByRole(
        "listitem",
      ),
    ).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Card authorization latency above target" })).toBeVisible();
  });

  it("focuses search when slash is pressed outside a control", async () => {
    render(<App />);
    await screen.findByRole("heading", {
      name: "Card authorization latency above target",
    });

    const search = screen.getByRole("searchbox", { name: "Search handoffs" });
    fireEvent.keyDown(document, { key: "/" });

    expect(search).toHaveFocus();
  });

  it("keeps slash input in the handoff note editor", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", {
      name: "Card authorization latency above target",
    });

    const note = screen.getByLabelText("Add handoff note");
    const search = screen.getByRole("searchbox", { name: "Search handoffs" });
    await user.type(note, "Escalate to Payments/Platform");

    expect(note).toHaveFocus();
    expect(note).toHaveValue("Escalate to Payments/Platform");
    expect(search).toHaveValue("");
  });

  it("adds a note to the selected handoff", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", {
      name: "Card authorization latency above target",
    });

    await user.type(screen.getByLabelText("Add handoff note"), "Check again at noon");
    await user.click(screen.getByRole("button", { name: "Add note" }));

    expect(await screen.findByText("Check again at noon")).toBeVisible();
  });
});
