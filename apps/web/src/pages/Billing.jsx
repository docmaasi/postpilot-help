import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarClock,
  Sparkles,
  Link2,
  Youtube,
  Users,
  Loader2,
} from 'lucide-react';
import { useQuery, useAction } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlanCard } from '../components/billing/PlanCard.jsx';
import { UsageMeter } from '../components/billing/UsageMeter.jsx';
import { ReferralCard } from '../components/billing/ReferralCard.jsx';
import { PackBalances } from '../components/billing/PackBalances.jsx';

const PLAN_LIMITS = {
  free: { name: 'Free', scheduledPosts: 15, aiRewrites: 5, socialAccounts: 3, youtubeImports: 10, circleSlots: 0 },
  creator: { name: 'Creator', scheduledPosts: -1, aiRewrites: 50, socialAccounts: 10, youtubeImports: -1, circleSlots: 5 },
  pro: { name: 'Pro', scheduledPosts: -1, aiRewrites: -1, socialAccounts: 100, youtubeImports: -1, circleSlots: 15 },
};

const USAGE = { scheduledPosts: 0, aiRewrites: 0, socialAccounts: 0, youtubeImports: 0, circleMembers: 0 };
const PACKS = [];
const REFERRAL = {
  code: '',
  link: '',
  stats: { invited: 0, subscribed: 0, credits: 0 },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function Billing() {
  const profile = useQuery(api.userProfiles.getCurrent);
  const subscription = useQuery(api.payments.subscriptions.getCurrent);
  const createPortal = useAction(api.payments.stripe.createCustomerPortalSession);
  const [portalLoading, setPortalLoading] = useState(false);

  const currentPlan = profile?.plan ?? 'free';
  const limits = PLAN_LIMITS[currentPlan] ?? PLAN_LIMITS.free;
  const subStatus = subscription?.status ?? 'active';

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const url = await createPortal({
        returnUrl: window.location.href,
      });
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Portal error:', err);
      setPortalLoading(false);
    }
  }

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
      <PlanCard planKey={currentPlan} planName={limits.name} status={subStatus} />

      {/* Manage Subscription button (paid plans only) */}
      {currentPlan !== 'free' && (
        <button
          onClick={handleManageSubscription}
          disabled={portalLoading}
          className="rounded-lg border border-border bg-secondary px-6 py-2 text-sm font-semibold transition-colors hover:bg-secondary/80 disabled:opacity-50"
        >
          {portalLoading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            'Manage Subscription'
          )}
        </button>
      )}

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
