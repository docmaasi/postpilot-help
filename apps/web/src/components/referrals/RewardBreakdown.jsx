import { motion } from 'framer-motion';
import { CalendarClock, Sparkles, Users } from 'lucide-react';

const REWARDS = [
  {
    trigger: 'Friend signs up (free)',
    items: [
      { icon: CalendarClock, text: '+10 scheduled posts' },
      { icon: Sparkles, text: '+5 AI rewrites' },
    ],
  },
  {
    trigger: 'Friend subscribes (paid)',
    items: [
      { icon: CalendarClock, text: '+50 scheduled posts' },
      { icon: Sparkles, text: '+25 AI rewrites' },
      { icon: Users, text: '+2 Circle slots' },
    ],
  },
];

export function RewardBreakdown() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-4 text-lg font-bold">Rewards You Earn</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REWARDS.map((reward) => (
          <div
            key={reward.trigger}
            className="rounded-xl border border-border bg-card p-5 glow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {reward.trigger}
            </p>
            <div className="space-y-2">
              {reward.items.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
