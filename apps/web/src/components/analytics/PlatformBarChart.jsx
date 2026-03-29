import { motion } from 'framer-motion';

const BARS = [
  { platform: 'Twitter', count: 48, color: '#1DA1F2' },
  { platform: 'Instagram', count: 32, color: '#E4405F' },
  { platform: 'LinkedIn', count: 24, color: '#0A66C2' },
  { platform: 'Facebook', count: 18, color: '#1877F2' },
  { platform: 'TikTok', count: 12, color: '#010101' },
  { platform: 'YouTube', count: 6, color: '#FF0000' },
  { platform: 'Threads', count: 2, color: '#555555' },
];

const MAX = Math.max(...BARS.map((b) => b.count));

/**
 * Simple colored bar chart showing posts-per-platform (static data).
 */
export function PlatformBarChart() {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <h3 className="mb-5 text-lg font-semibold">Posts by Platform</h3>
      <div className="space-y-3">
        {BARS.map((bar, i) => (
          <div key={bar.platform} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-right text-xs font-medium">
              {bar.platform}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-muted/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(bar.count / MAX) * 100}%` }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: bar.color }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground">{bar.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
