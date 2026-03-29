import { motion } from 'framer-motion';

const HISTORY = [
  { email: 'maya@studio.co', status: 'rewarded', date: '2026-03-15', reward: '+10 posts, +5 rewrites' },
  { email: 'chris@creator.io', status: 'subscribed', date: '2026-03-20', reward: '+50 posts, +25 rewrites' },
  { email: 'pat@example.com', status: 'signed_up', date: '2026-03-25', reward: '+10 posts, +5 rewrites' },
  { email: 'jamie@test.com', status: 'invited', date: '2026-03-28', reward: 'Pending' },
];

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

export function ReferralHistory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h2 className="mb-3 text-lg font-bold">Referral History</h2>
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
    </motion.section>
  );
}
