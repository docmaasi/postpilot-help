import { motion } from 'framer-motion';
import { Youtube, PenSquare, CalendarDays, FileText } from 'lucide-react';

const STAT_CONFIG = [
  { key: 'videos', label: 'Total Videos', icon: Youtube, gradient: 'from-violet-500/10 to-violet-600/5' },
  { key: 'posts', label: 'Total Posts', icon: FileText, gradient: 'from-pink-500/10 to-pink-600/5' },
  { key: 'scheduled', label: 'Scheduled', icon: CalendarDays, gradient: 'from-blue-500/10 to-blue-600/5' },
  { key: 'drafts', label: 'Drafts', icon: PenSquare, gradient: 'from-amber-500/10 to-amber-600/5' },
];

/**
 * Stats cards for the Dashboard — shows total videos, posts, scheduled, drafts.
 */
export function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_CONFIG.map((cfg, i) => {
        const Icon = cfg.icon;
        const value = stats?.[cfg.key] ?? 0;

        return (
          <motion.div
            key={cfg.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border border-border bg-gradient-to-br ${cfg.gradient} p-5 shadow-subtle`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{cfg.label}</p>
              <Icon className="h-5 w-5 text-primary/60" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
