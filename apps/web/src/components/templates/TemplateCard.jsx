import { motion } from 'framer-motion';
import { Pencil, Trash2, Hash } from 'lucide-react';
import { getPlatform } from '../../lib/platforms.js';

/**
 * Visual card for a single template — shows platform badge,
 * content preview, hashtags as pills, and actions.
 */
export function TemplateCard({ template, onEdit, onDelete }) {
  const platform = getPlatform(template.platform);
  const hashtags = template.hashtags ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-4 shadow-subtle transition-shadow hover:shadow-md"
    >
      {/* Top row: platform + category + actions */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className="rounded-lg px-2 py-0.5 text-xs font-bold text-white"
            style={{ backgroundColor: platform.color }}
          >
            {platform.name}
          </span>
          {template.category && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {template.category}
            </span>
          )}
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(template)}
            className="rounded-lg p-1.5 hover:bg-muted"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(template._id)}
            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Template name */}
      <h3 className="mb-1 text-sm font-semibold">{template.name}</h3>

      {/* Content preview */}
      <p className="mb-3 line-clamp-3 flex-1 text-xs text-muted-foreground leading-relaxed">
        {template.content}
      </p>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {hashtags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              <Hash className="h-2.5 w-2.5" /> {tag}
            </span>
          ))}
          {hashtags.length > 5 && (
            <span className="text-[10px] text-muted-foreground">
              +{hashtags.length - 5}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
