import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift, Users, CreditCard } from 'lucide-react';

export function ReferralCard({ code, link, stats }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6 glow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg stat-gradient-pink">
          <Gift className="h-5 w-5 text-pink-500" />
        </div>
        <h3 className="text-lg font-bold">Referral Program</h3>
      </div>

      {/* Code + Link */}
      <div className="space-y-3 mb-5">
        <CopyField
          label="Your Code"
          value={code}
          isCopied={copied === 'code'}
          onCopy={() => handleCopy(code, 'code')}
        />
        <CopyField
          label="Referral Link"
          value={link}
          isCopied={copied === 'link'}
          onCopy={() => handleCopy(link, 'link')}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBubble icon={Users} label="Invited" value={stats.invited} />
        <StatBubble icon={CreditCard} label="Subscribed" value={stats.subscribed} />
        <StatBubble icon={Gift} label="Credits Earned" value={stats.credits} />
      </div>
    </motion.div>
  );
}

function CopyField({ label, value, isCopied, onCopy }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
        <code className="flex-1 truncate text-sm font-mono">{value}</code>
        <button
          onClick={onCopy}
          className="shrink-0 rounded-md p-1.5 hover:bg-background transition-colors"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

function StatBubble({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3 text-center">
      <Icon className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}
