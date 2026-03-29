import { Star, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getYouTubeThumbnail } from '../../lib/youtube.js';

const STATUS_CONFIG = {
  imported: { label: 'Imported', color: 'bg-info/15 text-info', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-warning/15 text-warning', icon: Loader2 },
  repurposed: { label: 'Repurposed', color: 'bg-success/15 text-success', icon: CheckCircle2 },
};

/**
 * Card component for a single imported YouTube video.
 * Shows thumbnail, title, description, status badge, date, and favorite toggle.
 */
export function VideoCard({ video, onToggleFavorite }) {
  const status = STATUS_CONFIG[video.status] ?? STATUS_CONFIG.imported;
  const StatusIcon = status.icon;
  const thumbnailUrl = video.thumbnailUrl || getYouTubeThumbnail(video.videoId);
  const importDate = new Date(video.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl border border-border bg-card shadow-subtle transition-shadow hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="h-40 w-full object-cover transition-transform group-hover:scale-105"
        />
        <button
          onClick={() => onToggleFavorite(video._id, !video.isFavorite)}
          className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <Star
            className={`h-4 w-4 ${
              video.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug">
          {video.title}
        </h3>
        {video.description && (
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {video.description}
          </p>
        )}

        {/* Tags */}
        {video.tags?.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: status + date */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${status.color}`}
          >
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </span>
          <span className="text-[11px] text-muted-foreground">{importDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
