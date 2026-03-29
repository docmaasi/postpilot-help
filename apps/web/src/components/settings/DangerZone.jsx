import { useState } from 'react';
import { AlertTriangle, Download, Bell } from 'lucide-react';

/**
 * Notifications toggle, data export, and danger zone (delete account).
 */
export function NotificationsAndDanger({ emailNotifs, onNotifsChange }) {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  return (
    <>
      {/* Notifications */}
      <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <label className="flex cursor-pointer items-center justify-between">
          <span className="text-sm font-medium">Email notifications</span>
          <button
            onClick={() => onNotifsChange(!emailNotifs)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              emailNotifs ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                emailNotifs ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Data Export */}
      <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
        <div className="mb-4 flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Data Export</h2>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          Download a copy of all your posts, videos, and settings.
        </p>
        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
          Export All Data
        </button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        </div>
        {showDeleteWarning ? (
          <div className="space-y-3">
            <p className="text-sm text-destructive">
              This will permanently delete your account and all data. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground">
                Confirm Delete
              </button>
              <button
                onClick={() => setShowDeleteWarning(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteWarning(true)}
            className="rounded-lg border border-destructive/50 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            Delete Account
          </button>
        )}
      </div>
    </>
  );
}
