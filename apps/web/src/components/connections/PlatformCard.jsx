import { motion } from 'framer-motion';
import { Check, Link2, AlertCircle, Loader2 } from 'lucide-react';

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
  disconnected: {
    badge: 'Disconnected',
    badgeClass: 'bg-muted text-muted-foreground',
    icon: Link2,
  },
  not_connected: {
    badge: 'Not Connected',
    badgeClass: 'bg-muted text-muted-foreground',
    icon: Link2,
  },
};

/**
 * Single platform connection card with status and connect/disconnect button.
 */
export function PlatformCard({ platform, index, onConnect, onDisconnect, isConnecting }) {
  const status = platform.status ?? 'not_connected';
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.not_connected;
  const StatusIcon = cfg.icon;
  const isConnected = status === 'connected';

  function formatDate(ts) {
    if (!ts) return 'Never';
    return new Date(ts).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

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

        {isConnected && (
          <div className="mt-3 space-y-0.5 text-xs text-muted-foreground">
            {platform.accountName && <p>Account: {platform.accountName}</p>}
            <p>Last synced: {formatDate(platform.lastSyncAt)}</p>
          </div>
        )}

        <button
          onClick={() =>
            isConnected
              ? onDisconnect(platform.connectionId)
              : onConnect(platform.key)
          }
          disabled={isConnecting}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
            isConnected
              ? 'border border-destructive/30 text-destructive hover:bg-destructive/5'
              : 'border border-border hover:bg-muted'
          }`}
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            'Disconnect'
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </motion.div>
  );
}
