import { Sun, Moon, Monitor } from 'lucide-react';

const THEMES = [
  { value: 'light', label: 'Light', icon: Sun, preview: 'bg-white border-gray-200' },
  { value: 'dark', label: 'Dark', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
  { value: 'system', label: 'System', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900 border-gray-400' },
];

/**
 * Theme toggle with visual previews for light / dark / system.
 */
export function AppearanceSection({ theme, onThemeChange }) {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <div className="mb-4 flex items-center gap-2">
        <Sun className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Appearance</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {THEMES.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.value;
          return (
            <button
              key={t.value}
              onClick={() => onThemeChange(t.value)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                isActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className={`h-10 w-16 rounded-lg border ${t.preview}`} />
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">{t.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
