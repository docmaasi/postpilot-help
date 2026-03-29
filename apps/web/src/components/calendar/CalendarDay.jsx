import { motion } from 'framer-motion';
import { getPlatform } from '../../lib/platforms.js';

/**
 * Single day cell in the calendar grid.
 * Shows day number and colored post pills for scheduled posts.
 */
export function CalendarDay({ day, isToday, isCurrentMonth, posts, isSelected, onSelect }) {
  const dayPosts = posts?.slice(0, 3) ?? [];
  const extraCount = (posts?.length ?? 0) - 3;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(day)}
      className={[
        'flex min-h-[80px] flex-col rounded-lg border p-1.5 text-left transition-all md:min-h-[100px] md:p-2',
        isCurrentMonth ? 'bg-card' : 'bg-muted/30',
        isToday ? 'border-primary shadow-md shadow-primary/10' : 'border-border/50',
        isSelected ? 'ring-2 ring-primary/40' : '',
        'hover:border-primary/40',
      ].join(' ')}
    >
      <span
        className={[
          'mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
          isToday ? 'bg-primary text-primary-foreground' : '',
          !isCurrentMonth ? 'text-muted-foreground/40' : '',
        ].join(' ')}
      >
        {day.getDate()}
      </span>

      <div className="flex flex-col gap-0.5">
        {dayPosts.map((post) => {
          const platform = getPlatform(post.platform);
          return (
            <div
              key={post._id}
              className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: platform.color }}
              title={post.content}
            >
              {post.content?.slice(0, 20)}
            </div>
          );
        })}
        {extraCount > 0 && (
          <span className="px-1 text-[10px] text-muted-foreground">+{extraCount} more</span>
        )}
      </div>
    </motion.button>
  );
}
