import { Link } from 'react-router-dom';
import { PLATFORMS, PLATFORM_ORDER } from '../../lib/platforms.js';

/**
 * Widget showing connection status for all 7 social platforms.
 * Currently all static "Not connected" — will be dynamic once OAuth is wired up.
 */
export function PlatformStatus() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Platform Status</h2>
        <Link to="/app/connections" className="text-xs font-medium text-primary hover:underline">
          Manage
        </Link>
      </div>

      <div className="space-y-2">
        {PLATFORM_ORDER.map((key) => {
          const platform = PLATFORMS[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
                Not connected
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
