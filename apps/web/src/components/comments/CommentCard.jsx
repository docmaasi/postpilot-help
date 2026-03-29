import { motion } from 'framer-motion';
import { Reply } from 'lucide-react';

const SENTIMENT_STYLES = {
  positive: 'bg-success/10 text-success',
  negative: 'bg-destructive/10 text-destructive',
  neutral: 'bg-muted text-muted-foreground',
};

/**
 * A single comment card showing platform, post title, commenter, text, sentiment, and reply button.
 */
export function CommentCard({ comment, index }) {
  const sentimentClass = SENTIMENT_STYLES[comment.sentiment] ?? SENTIMENT_STYLES.neutral;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glow-card rounded-xl border border-border bg-card p-5 shadow-subtle"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: comment.platformColor }}
          >
            {comment.platform.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold">{comment.commenter}</p>
            <p className="text-xs text-muted-foreground">
              on <span className="font-medium">{comment.postTitle}</span>
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${sentimentClass}`}>
          {comment.sentiment}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        {comment.text}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{comment.date}</span>
        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5">
          <Reply className="h-3.5 w-3.5" />
          Reply
        </button>
      </div>
    </motion.div>
  );
}
