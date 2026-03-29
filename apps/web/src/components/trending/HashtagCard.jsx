import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Bookmark } from 'lucide-react';

const TREND_ICONS = {
  up: { icon: TrendingUp, class: 'text-success' },
  down: { icon: TrendingDown, class: 'text-destructive' },
  stable: { icon: Minus, class: 'text-muted-foreground' },
};

const PLATFORM_COLORS = {
  All: '#7c3aed',
  YouTube: '#FF0000',
  Twitter: '#1DA1F2',
  Instagram: '#E4405F',
  TikTok: '#010101',
  LinkedIn: '#0A66C2',
};

/**
 * A single trending hashtag card with volume bar, trend arrow, and save button.
 */
export function HashtagCard({ hashtag, index, onSave }) {
  const trend = TREND_ICONS[hashtag.trend] ?? TREND_ICONS.stable;
  const TrendIcon = trend.icon;
  const color = PLATFORM_COLORS[hashtag.platform] ?? '#666';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="glow-card flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-subtle"
    >
      {/* Tag + platform */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{hashtag.tag}</p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {hashtag.platform}
          </span>
          <span className="text-[10px] text-muted-foreground">{hashtag.category}</span>
        </div>
      </div>

      {/* Volume bar */}
      <div className="hidden w-24 sm:block">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${hashtag.volume}%` }}
            transition={{ delay: 0.2 + index * 0.03, duration: 0.4 }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>

      {/* Trend */}
      <TrendIcon className={`h-4 w-4 shrink-0 ${trend.class}`} />

      {/* Save */}
      <button
        onClick={() => onSave(hashtag.id)}
        className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-muted"
        title="Save for later"
      >
        <Bookmark className="h-4 w-4 text-muted-foreground" />
      </button>
    </motion.div>
  );
}
