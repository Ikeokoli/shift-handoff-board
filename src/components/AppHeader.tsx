interface AppHeaderProps {
  activeCount: number;
}

export function AppHeader({ activeCount }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">
        R
      </div>
      <div>
        <p className="eyebrow">Operations workspace</p>
        <h1>Shift handoff</h1>
      </div>
      <div className="shift-chip">
        <span className="status-dot" aria-hidden="true" />
        Day shift · {activeCount} active
      </div>
    </header>
  );
}
