import { User, Mail } from 'lucide-react';

/**
 * Profile section — display name (editable) + email (read-only from Clerk).
 */
export function ProfileSection({ displayName, email, onNameChange }) {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <div className="mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Your name"
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Email
            </span>
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="input-field cursor-not-allowed opacity-60"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Managed by your login provider
          </p>
        </div>
      </div>
    </div>
  );
}
