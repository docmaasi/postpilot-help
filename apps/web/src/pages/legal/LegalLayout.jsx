import { Link } from 'react-router-dom';

export function LegalLayout({ title, updated, children }) {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <img src="/logo.png" alt="PostPilot" className="h-8 w-auto" />
      </div>

      <h1 className="mb-2 text-3xl font-bold gradient-text">{title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: {updated}</p>

      {/* Content sections */}
      <div className="space-y-6">{children}</div>

      {/* Back link */}
      <div className="mt-12 border-t border-border pt-6">
        <Link to="/" className="text-sm text-primary hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-3 text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
