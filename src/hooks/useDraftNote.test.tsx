import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDraftNote } from "./useDraftNote";

describe("useDraftNote", () => {
  it("trims and clears a submitted note", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useDraftNote(onSubmit));

    act(() => result.current.setBody("  Watch the retry rate  "));
    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() } as never);
    });

    expect(onSubmit).toHaveBeenCalledWith("Watch the retry rate");
    expect(result.current.body).toBe("");
  });

  it("preserves a draft when saving fails", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Save unavailable"));
    const { result } = renderHook(() => useDraftNote(onSubmit));

    act(() => result.current.setBody("Keep this update"));
    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() } as never);
    });

    expect(result.current.body).toBe("Keep this update");
    expect(result.current.error).toBe("Save unavailable");
  });
});
