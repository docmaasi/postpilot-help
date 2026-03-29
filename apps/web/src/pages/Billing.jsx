import { motion } from 'framer-motion';
import {
  CalendarClock,
  Sparkles,
  Link2,
  Youtube,
  Users,
} from 'lucide-react';
import { PlanCard } from '../components/billing/PlanCard.jsx';
import { UsageMeter } from '../components/billing/UsageMeter.jsx';
import { ReferralCard } from '../components/billing/ReferralCard.jsx';
import { PackBalances } from '../components/billing/PackBalances.jsx';

/* Static data — will be replaced with real Convex queries later */
const CURRENT_PLAN = 'free';
const PLAN_LIMITS = {
  free: { name: 'Free', scheduledPosts: 15, aiRewrites: 5, socialAccounts: 3, youtubeImports: 10, circleSlots: 0 },
  creator: { name: 'Creator', scheduledPosts: -1, aiRewrites: 50, socialAccounts: 10, youtubeImports: -1, circleSlots: 5 },
  pro: { name: 'Pro', scheduledPosts: -1, aiRewrites: -1, socialAccounts: 100, youtubeImports: -1, circleSlots: 15 },
};

const USAGE = { scheduledPosts: 8, aiRewrites: 3, socialAccounts: 2, youtubeImports: 4, circleMembers: 0 };
const PACKS = [
  { label: 'AI Rewrites', remaining: 12 },
  { label: 'Scheduled Posts', remaining: 30 },
];
const REFERRAL = {
  code: 'PILOT-A3X9',
  link: 'https://postpilot.help/r/PILOT-A3X9',
  stats: { invited: 3, subscribed: 1, credits: 15 },
};

const limits = PLAN_LIMITS[CURRENT_PLAN];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function Billing() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Billing & Usage</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your plan, usage, packs, and referrals all in one place.
        </p>
      </motion.div>

      {/* Current Plan */}
      <PlanCard planKey={CURRENT_PLAN} planName={limits.name} />

      {/* Usage Meters */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Usage This Month</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {[
            { label: 'Scheduled Posts', used: USAGE.scheduledPosts, limit: limits.scheduledPosts, icon: CalendarClock },
            { label: 'AI Rewrites', used: USAGE.aiRewrites, limit: limits.aiRewrites, icon: Sparkles },
            { label: 'Social Accounts', used: USAGE.socialAccounts, limit: limits.socialAccounts, icon: Link2 },
            { label: 'YouTube Imports', used: USAGE.youtubeImports, limit: limits.youtubeImports, icon: Youtube },
            { label: 'Circle Members', used: USAGE.circleMembers, limit: limits.circleSlots, icon: Users },
          ].map((meter) => (
            <motion.div key={meter.label} variants={item}>
              <UsageMeter {...meter} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pack Balances */}
      <PackBalances packs={PACKS} />

      {/* Referral */}
      <ReferralCard code={REFERRAL.code} link={REFERRAL.link} stats={REFERRAL.stats} />
    </div>
  );
}
