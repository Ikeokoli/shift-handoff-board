import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NoteComposer } from "./NoteComposer";

describe("NoteComposer", () => {
  it("prevents empty notes and submits responder text", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<NoteComposer onSubmit={onSubmit} />);

    const button = screen.getByRole("button", { name: "Add note" });
    expect(button).toBeDisabled();

    await user.type(screen.getByLabelText("Add handoff note"), "Monitor during peak");
    await user.click(button);

    expect(onSubmit).toHaveBeenCalledWith("Monitor during peak");
    expect(screen.getByLabelText("Add handoff note")).toHaveValue("");
  });
});
