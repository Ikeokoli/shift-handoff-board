interface LiveStatusProps {
  count: number;
  loading: boolean;
  error: string | null;
}

export function LiveStatus({ count, loading, error }: LiveStatusProps) {
  const message = error
    ? error
    : loading
      ? "Loading handoffs"
      : `${count} ${count === 1 ? "handoff" : "handoffs"} shown`;

  return (
    <p className="live-status" aria-live="polite">
      {message}
    </p>
  );
}
