import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Display Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Timezone</h2>
          <select className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>America/New_York (Eastern)</option>
            <option>America/Chicago (Central)</option>
            <option>America/Denver (Mountain)</option>
            <option>America/Los_Angeles (Pacific)</option>
          </select>
        </div>

        {/* Save */}
        <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Save Settings
        </button>
      </div>
    </div>
  );
}
