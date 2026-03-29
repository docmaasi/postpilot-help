import { motion } from 'framer-motion';
import { Check, Link2, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  connected: {
    badge: 'Connected',
    badgeClass: 'bg-success/10 text-success',
    icon: Check,
  },
  error: {
    badge: 'Error',
    badgeClass: 'bg-destructive/10 text-destructive',
    icon: AlertCircle,
  },
  not_connected: {
    badge: 'Not Connected',
    badgeClass: 'bg-muted text-muted-foreground',
    icon: Link2,
  },
};

/**
 * Single platform connection card with status, connect/disconnect, and brand color accent.
 */
export function PlatformCard({ platform, index, onConnect }) {
  const status = platform.status ?? 'not_connected';
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_connected;
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glow-card overflow-hidden rounded-xl border border-border bg-card shadow-subtle"
      style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: platform.color + '12' }}
          >
            <Link2 className="h-5 w-5" style={{ color: platform.color }} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{platform.name}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${cfg.badgeClass}`}>
              <StatusIcon className="h-3 w-3" />
              {cfg.badge}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {platform.description}
        </p>

        {status === 'connected' && (
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Account: {platform.accountName}</p>
            <p>Last synced: {platform.lastSync}</p>
          </div>
        )}

        <button
          onClick={() => onConnect(platform.key)}
          className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            status === 'connected'
              ? 'border border-destructive/30 text-destructive hover:bg-destructive/5'
              : 'border border-border hover:bg-muted'
          }`}
        >
          {status === 'connected' ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </motion.div>
  );
}
