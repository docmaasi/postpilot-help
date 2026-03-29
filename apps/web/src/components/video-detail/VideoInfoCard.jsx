import { motion } from 'framer-motion';
import { Heart, Calendar, Tag } from 'lucide-react';

const STATUS_STYLES = {
  active: 'bg-success/10 text-success',
  archived: 'bg-muted text-muted-foreground',
  draft: 'bg-warning/10 text-warning',
};

/**
 * Large video info card showing thumbnail, title, description, tags, and metadata.
 */
export function VideoInfoCard({ video, onToggleFavorite }) {
  const thumb = `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`;
  const status = video.status ?? 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glow-card overflow-hidden rounded-xl border border-border bg-card shadow-subtle"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={thumb}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? STATUS_STYLES.active}`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold leading-tight">{video.title}</h2>
          <button
            onClick={onToggleFavorite}
            className="shrink-0 rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <Heart
              className={`h-5 w-5 ${video.isFavorite ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground'}`}
            />
          </button>
        </div>

        {video.description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {video.description}
          </p>
        )}

        {/* Tags */}
        {video.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Imported {new Date(video._creationTime).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
