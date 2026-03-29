import { motion } from 'framer-motion';
import { Trash2, Image, Film } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Thumbnail card for a single media asset with type badge and delete action.
 */
export function MediaCard({ asset, onDelete }) {
  const isImage = asset.fileType === 'image';
  const TypeIcon = isImage ? Image : Film;

  const sourceBadge = {
    upload: 'Upload',
    youtube_thumbnail: 'YouTube',
    generated: 'AI Generated',
  }[asset.source] ?? asset.source;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-subtle transition-shadow hover:shadow-md"
    >
      {/* Thumbnail area */}
      <div className="relative flex h-40 items-center justify-center bg-muted/40">
        {asset.fileUrl ? (
          <img
            src={asset.fileUrl}
            alt={asset.fileName}
            className="h-full w-full object-cover"
          />
        ) : (
          <TypeIcon className="h-10 w-10 text-muted-foreground/30" />
        )}

        {/* Delete overlay */}
        <button
          onClick={() => onDelete(asset._id)}
          className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        {/* Type badge */}
        <span className="absolute left-2 top-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
          {asset.fileType}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="truncate text-sm font-medium" title={asset.fileName}>
          {asset.fileName}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            {sourceBadge}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {format(new Date(asset.createdAt), 'MMM d')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
