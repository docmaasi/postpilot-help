import { motion } from 'framer-motion';

/**
 * Visual progress bar + text counter for character limits.
 * Colors shift green -> yellow -> red as the user approaches/exceeds the limit.
 */
export function CharacterCounter({ content = '', charLimit = 280 }) {
  const count = content.length;
  const pct = Math.min((count / charLimit) * 100, 100);
  const isOver = count > charLimit;

  const barColor = isOver
    ? 'bg-destructive'
    : pct >= 95
      ? 'bg-destructive/80'
      : pct >= 80
        ? 'bg-warning'
        : 'bg-success';

  const textColor = isOver
    ? 'text-destructive font-semibold'
    : pct >= 80
      ? 'text-warning'
      : 'text-muted-foreground';

  return (
    <div className="space-y-1.5">
      {/* Progress bar track */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Count text */}
      <div className="flex items-center justify-between text-xs">
        <span className={textColor}>
          {count.toLocaleString()} / {charLimit.toLocaleString()}
        </span>
        {isOver && (
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-destructive font-medium"
          >
            {count - charLimit} over limit
          </motion.span>
        )}
      </div>
    </div>
  );
}
