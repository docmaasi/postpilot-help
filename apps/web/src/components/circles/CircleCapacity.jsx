import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function CircleCapacity({ used, max }) {
  const percentage = max > 0 ? Math.min((used / max) * 100, 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Circle Capacity</span>
        </div>
        <span className="text-sm font-semibold">
          {used} <span className="text-muted-foreground">/ {max} members</span>
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
