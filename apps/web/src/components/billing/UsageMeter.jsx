import { motion } from 'framer-motion';

/**
 * Visual progress bar showing usage vs limit.
 * Turns green/yellow/red based on how close to the limit.
 * If limit is -1, shows "Unlimited".
 */
export function UsageMeter({ label, used, limit, icon: Icon }) {
  const isUnlimited = limit === -1;
  const percentage = isUnlimited ? 0 : Math.min((used / limit) * 100, 100);

  const barColor =
    percentage < 50
      ? 'bg-green-500'
      : percentage < 80
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <div className="rounded-xl border border-border bg-card p-4 glow-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-semibold">
          {isUnlimited ? (
            <span className="text-green-500">Unlimited</span>
          ) : (
            <>
              {used} <span className="text-muted-foreground">/ {limit}</span>
            </>
          )}
        </span>
      </div>

      {!isUnlimited && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      {isUnlimited && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-500/30 to-pink-500/30" />
        </div>
      )}
    </div>
  );
}
