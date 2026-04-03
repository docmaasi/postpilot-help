import { motion } from 'framer-motion';
import { Crown, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLAN_ICONS = { free: Zap, creator: Sparkles, pro: Crown };
const PLAN_PRICES = { free: '$0', creator: '$12', pro: '$24' };

export function PlanCard({ planKey, planName, status = 'active' }) {
  const navigate = useNavigate();
  const Icon = PLAN_ICONS[planKey] || Zap;
  const price = PLAN_PRICES[planKey] || '$0';
  const isPaid = planKey !== 'free';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="gradient-border rounded-2xl bg-card p-6 glow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current Plan
            </p>
            <h2 className="text-2xl font-bold gradient-text">{planName}</h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold">
            {price}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>
          <span
            className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${
              status === 'active'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-yellow-500/10 text-yellow-500'
            }`}
          >
            {status === 'active' ? 'Active' : 'Past Due'}
          </span>
        </div>
      </div>

      {!isPaid && (
        <div className="mt-4 rounded-lg bg-primary/5 p-3 text-center">
          <p className="text-sm text-muted-foreground">
            Upgrade to unlock unlimited posts, more AI rewrites, and Circle collaboration.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="mt-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Plans
          </button>
        </div>
      )}
    </motion.div>
  );
}
