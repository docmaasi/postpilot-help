import { Share2 } from 'lucide-react';
import { PLATFORMS, PLATFORM_ORDER } from '../../lib/platforms.js';

/**
 * Checkboxes for selecting default platforms shown in the post editor.
 */
export function PlatformDefaults({ selected, onToggle }) {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <div className="mb-4 flex items-center gap-2">
        <Share2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Default Platforms</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Choose which platforms appear by default in the post editor.
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PLATFORM_ORDER.map((key) => {
          const platform = PLATFORMS[key];
          const isChecked = selected.includes(key);
          return (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(key)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: platform.color }}
              />
              <span className="text-sm font-medium">{platform.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
