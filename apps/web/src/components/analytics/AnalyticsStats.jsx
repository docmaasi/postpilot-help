import { motion } from 'framer-motion';
import { FileText, Eye, TrendingUp, Award } from 'lucide-react';

const STATS = [
  { label: 'Total Posts', value: '142', icon: FileText, gradient: 'stat-gradient-violet' },
  { label: 'Total Reach', value: '28.4K', icon: Eye, gradient: 'stat-gradient-pink' },
  { label: 'Engagement Rate', value: '4.7%', icon: TrendingUp, gradient: 'stat-gradient-blue' },
  { label: 'Best Platform', value: 'Twitter', icon: Award, gradient: 'stat-gradient-green' },
];

/**
 * Top-level stat cards for the analytics page (static placeholder data).
 */
export function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border border-border p-5 ${s.gradient}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <Icon className="h-5 w-5 text-primary/60" />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
