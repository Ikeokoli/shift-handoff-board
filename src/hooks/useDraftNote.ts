import { useState, type FormEvent } from "react";

export function useDraftNote(onSubmit: (body: string) => Promise<void>) {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (!trimmedBody || status === "saving") return;

    setStatus("saving");
    setError(null);

    try {
      await onSubmit(trimmedBody);
      setBody("");
      setStatus("idle");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save note");
      setStatus("error");
    }
  }

  return { body, setBody, status, error, submit };
}
