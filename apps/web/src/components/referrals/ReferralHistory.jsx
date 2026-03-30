import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const STATUS_STYLES = {
  invited: 'bg-gray-500/10 text-gray-400',
  signed_up: 'bg-blue-500/10 text-blue-500',
  subscribed: 'bg-green-500/10 text-green-500',
  rewarded: 'bg-violet-500/10 text-violet-500',
};

const STATUS_LABELS = {
  invited: 'Invited',
  signed_up: 'Signed Up',
  subscribed: 'Subscribed',
  rewarded: 'Rewarded',
};

const HISTORY = [];

export function ReferralHistory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h2 className="mb-3 text-lg font-bold">Referral History</h2>

      {HISTORY.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <Gift className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-semibold text-foreground">No referrals yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Share your code to start earning rewards. Your referral history will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Friend</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Reward</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row) => (
                <tr key={row.email} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3 font-medium">{row.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[row.status]}`}>
                      {STATUS_LABELS[row.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.section>
  );
}
