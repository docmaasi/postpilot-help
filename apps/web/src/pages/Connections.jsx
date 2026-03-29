import { Link2 } from 'lucide-react';

const PLATFORMS = [
  { name: 'YouTube', color: '#FF0000', status: 'not_connected' },
  { name: 'X / Twitter', color: '#1DA1F2', status: 'not_connected' },
  { name: 'Instagram', color: '#E4405F', status: 'not_connected' },
  { name: 'Facebook', color: '#1877F2', status: 'not_connected' },
  { name: 'LinkedIn', color: '#0A66C2', status: 'not_connected' },
  { name: 'TikTok', color: '#000000', status: 'not_connected' },
  { name: 'Threads', color: '#000000', status: 'not_connected' },
];

export default function Connections() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Connections</h1>
        <p className="text-sm text-muted-foreground">
          Connect your social media accounts for direct publishing
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="rounded-xl border border-border bg-card p-5 shadow-subtle"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: platform.color + '15' }}
              >
                <Link2
                  className="h-5 w-5"
                  style={{ color: platform.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold">{platform.name}</h3>
                <p className="text-xs text-muted-foreground">Not connected</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
