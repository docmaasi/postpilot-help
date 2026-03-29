import { motion } from 'framer-motion';
import { Pencil, CalendarRange } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_STYLES = {
  active: 'bg-emerald-500/10 text-emerald-600',
  completed: 'bg-gray-500/10 text-gray-500',
  archived: 'bg-muted text-muted-foreground',
};

/**
 * Visual campaign card — shows name, color swatch, date range,
 * status badge, and post count.
 */
export function CampaignCard({ campaign, postCount, onEdit }) {
  const statusCls = STATUS_STYLES[campaign.status] ?? STATUS_STYLES.active;
  const color = campaign.color || '#8b5cf6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col rounded-xl border border-border bg-card shadow-subtle transition-shadow hover:shadow-md"
    >
      {/* Color accent bar */}
      <div className="h-1.5 rounded-t-xl" style={{ backgroundColor: color }} />

      <div className="flex flex-1 flex-col p-4">
        {/* Top row */}
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
            <h3 className="text-sm font-semibold">{campaign.name}</h3>
          </div>
          <button
            onClick={() => onEdit(campaign)}
            className="rounded-lg p-1.5 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Description */}
        {campaign.description && (
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {campaign.description}
          </p>
        )}

        {/* Footer: date range + status */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {campaign.startDate && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <CalendarRange className="h-3 w-3" />
              {format(new Date(campaign.startDate), 'MMM d')}
              {campaign.endDate ? ` - ${format(new Date(campaign.endDate), 'MMM d')}` : ''}
            </span>
          )}

          <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${statusCls}`}>
            {campaign.status}
          </span>

          {typeof postCount === 'number' && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {postCount} post{postCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
