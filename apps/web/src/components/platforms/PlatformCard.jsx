import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Clock, TrendingUp } from 'lucide-react';

/**
 * Single platform info card with stats, description, and CTA.
 */
export function PlatformCard({ platform, index }) {
  const stats = [
    { icon: Users, label: 'Monthly Users', value: platform.stats.users },
    { icon: Target, label: 'Best Audience', value: platform.ageRange },
    { icon: Clock, label: 'Peak Time', value: platform.stats.bestPostTime },
    { icon: TrendingUp, label: 'Engagement', value: platform.stats.avgEngagement },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Color accent bar */}
      <div className="h-1.5" style={{ backgroundColor: platform.color }} />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">{platform.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{platform.tagline}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatBox key={stat.label} {...stat} color={platform.color} />
          ))}
        </div>

        {/* Description */}
        <div
          className="prose prose-sm prose-violet max-w-none dark:prose-invert prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: platform.description }}
        />

        {/* CTA */}
        <Link
          to="/posts/new"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: platform.color }}
        >
          Create Content for {platform.name}
        </Link>
      </div>
    </motion.section>
  );
}

function StatBox({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
      <Icon
        className="mx-auto mb-1 h-4 w-4"
        style={{ color }}
      />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
