import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';
import { AnalyticsStats } from '../components/analytics/AnalyticsStats.jsx';
import { PlatformBarChart } from '../components/analytics/PlatformBarChart.jsx';
import { ActivityGrid } from '../components/analytics/ActivityGrid.jsx';
import { BestTimeGrid } from '../components/analytics/BestTimeGrid.jsx';

export default function Analytics() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Content Analytics</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track how your content performs across every platform.
        </p>
      </motion.div>

      <AnalyticsStats />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PlatformBarChart />
        <ActivityGrid />
      </div>

      <BestTimeGrid />

      {/* Upgrade prompt */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-border rounded-xl p-6 text-center"
      >
        <Link2 className="mx-auto mb-3 h-10 w-10 text-primary/40" />
        <h3 className="mb-1 text-lg font-semibold">
          Connect platforms for real analytics
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          The data above is sample data. Connect your social accounts to see real
          engagement metrics, reach, and performance insights.
        </p>
        <a
          href="/connections"
          className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Connect Platforms
        </a>
      </motion.div>
    </div>
  );
}
