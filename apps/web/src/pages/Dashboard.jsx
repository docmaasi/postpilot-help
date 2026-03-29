import {
  LayoutDashboard,
  Youtube,
  PenSquare,
  CalendarDays,
  Link2,
  TrendingUp,
} from 'lucide-react';

const STATS = [
  { label: 'Scheduled Posts', value: '0', icon: CalendarDays, color: 'text-primary' },
  { label: 'Draft Posts', value: '0', icon: PenSquare, color: 'text-warning' },
  { label: 'Videos Imported', value: '0', icon: Youtube, color: 'text-destructive' },
  { label: 'Connected Platforms', value: '0', icon: Link2, color: 'text-info' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Your content command center
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow-subtle"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming posts */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Posts</h2>
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-sm">No scheduled posts yet</p>
          </div>
        </div>

        {/* Recent videos */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Recent Videos</h2>
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-sm">No videos imported yet</p>
          </div>
        </div>

        {/* Calendar preview */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Calendar Preview</h2>
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-sm">Your content calendar will appear here</p>
          </div>
        </div>

        {/* Platform status */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
          <h2 className="mb-4 text-lg font-semibold">Platform Status</h2>
          <div className="space-y-3">
            {['YouTube', 'X / Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'Threads'].map(
              (platform) => (
                <div
                  key={platform}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                >
                  <span className="text-sm">{platform}</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Not connected
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
