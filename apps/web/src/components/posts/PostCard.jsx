import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon.jsx';

const STATUS_STYLES = {
  draft: 'bg-gray-500/10 text-gray-400',
  scheduled: 'bg-blue-500/10 text-blue-500',
  published: 'bg-green-500/10 text-green-500',
  failed: 'bg-red-500/10 text-red-500',
};

const BORDER_COLORS = {
  twitter: 'border-l-sky-400',
  instagram: 'border-l-pink-500',
  linkedin: 'border-l-blue-600',
  tiktok: 'border-l-fuchsia-500',
  facebook: 'border-l-blue-500',
  threads: 'border-l-gray-400',
};

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export function PostCard({ post }) {
  const navigate = useNavigate();
  const platform = post.platform ?? 'twitter';
  const borderColor = BORDER_COLORS[platform] || 'border-l-violet-500';

  const scheduledDate = post.scheduledAt
    ? new Date(post.scheduledAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : null;

  return (
    <motion.div
      variants={item}
      layout
      onClick={() => navigate(`/posts/${post._id}`)}
      className={`cursor-pointer rounded-xl border border-border border-l-4 ${borderColor} bg-card p-4 glow-card transition-colors hover:bg-muted/30`}
    >
      <div className="flex items-start gap-3">
        <PlatformIcon platform={platform} />

        <div className="flex-1 min-w-0">
          <p className="text-sm line-clamp-2">
            {post.content || 'Untitled post'}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${STATUS_STYLES[post.status] || STATUS_STYLES.draft}`}
            >
              {post.status}
            </span>

            {scheduledDate && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {scheduledDate}
              </span>
            )}

            {post.campaignName && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Tag className="h-3 w-3" />
                {post.campaignName}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
