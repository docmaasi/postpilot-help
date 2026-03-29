import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Track your content performance across platforms
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">Analytics coming soon</h3>
        <p className="text-sm text-muted-foreground">
          Connect your platforms to see engagement metrics and content scores
        </p>
      </div>
    </div>
  );
}
