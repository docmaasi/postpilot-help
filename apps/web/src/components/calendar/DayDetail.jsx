import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getPlatform } from '../../lib/platforms.js';

/**
 * Side panel showing posts for the selected day.
 */
export function DayDetail({ date, posts, onClose }) {
  if (!date) return null;

  const dayLabel = format(date, 'EEEE, MMMM d');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        className="rounded-xl border border-border bg-card p-5 shadow-subtle"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{dayLabel}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <Clock className="mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No posts scheduled for this day</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const platform = getPlatform(post.platform);
              return (
                <Link
                  key={post._id}
                  to={`/app/posts/${post._id}`}
                  className="flex gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: platform.color }}
                  >
                    <span className="text-xs font-bold">{platform.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground">{platform.name}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm">{post.content}</p>
                    {post.scheduledAt && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(post.scheduledAt), 'h:mm a')}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
