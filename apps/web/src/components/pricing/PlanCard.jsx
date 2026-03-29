import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { cn } from '@postpilot/lib';

const PLANS = [
  {
    key: 'free',
    name: 'Free',
    price: 0,
    cta: 'Get Started',
    popular: false,
    features: [
      { text: 'Up to 3 social accounts', included: true },
      { text: '15 scheduled posts/month', included: true },
      { text: '5 AI rewrites/month (2 tones)', included: true },
      { text: '10 YouTube imports/month', included: true },
      { text: 'Basic content library', included: true },
      { text: 'PostPilot branding on exports', included: true },
      { text: 'Copy-paste publishing only', included: true },
      { text: 'No collaboration', included: false },
      { text: 'No analytics', included: false },
      { text: 'No templates', included: false },
    ],
  },
  {
    key: 'creator',
    name: 'Creator',
    price: 12,
    cta: 'Start Creating',
    popular: true,
    features: [
      { text: 'Up to 10 social accounts', included: true },
      { text: 'Unlimited scheduling', included: true },
      { text: '50 AI rewrites/month (2 tones)', included: true },
      { text: 'Unlimited YouTube imports', included: true },
      { text: 'Full content library + templates', included: true },
      { text: 'No branding/watermark', included: true },
      { text: 'Circles: 5 collaborators', included: true },
      { text: 'Guest contributors can draft & edit', included: true },
      { text: 'Copy-paste publishing', included: true },
      { text: 'Basic analytics coming soon', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 24,
    cta: 'Go Pro',
    popular: false,
    sections: [
      {
        label: 'Everything in Creator, plus:',
        features: [
          'Unlimited social accounts',
          'Unlimited AI rewrites — all 5 tones',
        ],
      },
      {
        label: 'Publishing Power',
        features: [
          'Auto-publish to all 7 platforms',
          'Bulk scheduling (50+ posts at once)',
          'Evergreen post recycling',
          'RSS feed auto-import',
          'Priority processing',
        ],
      },
      {
        label: 'AI Superpowers',
        features: [
          'AI video summarizer (transcript → captions)',
          'AI thread generator (idea → full thread)',
          'AI image captioning (alt text)',
          'Content A/B testing',
          'Content performance scoring',
          'Best-time-to-post AI',
        ],
      },
      {
        label: 'Analytics & Growth',
        features: [
          'Full analytics dashboard',
          'Competitor tracking (3 accounts)',
          'Weekly email performance report',
        ],
      },
      {
        label: 'Team & Collaboration',
        features: [
          'Circles: 15 collaborators',
          'Approval workflows (draft → review → publish)',
          'Team activity log',
          'Client workspaces (multi-brand)',
        ],
      },
      {
        label: 'Branding & Export',
        features: [
          'Custom branded exports (your logo)',
          'White-label PDF analytics reports',
          'Priority support',
        ],
      },
    ],
  },
];

export function PlanCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-start px-4">
      {PLANS.map((plan, i) => (
        <PlanCard key={plan.name} plan={plan} index={i} />
      ))}
    </div>
  );
}

function PlanCard({ plan, index }) {
  const { key, name, price, cta, popular, features, sections } = plan;
  const [loading, setLoading] = useState(false);
  const createCheckout = useAction(api.payments.stripe.createCheckoutSession);

  async function handleUpgrade() {
    if (key === 'free') return;
    setLoading(true);
    try {
      const url = await createCheckout({
        plan: key,
        successUrl: `${window.location.origin}/app/billing?success=true`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-6',
        'bg-card shadow-subtle transition-shadow hover:shadow-lg',
        popular ? 'border-primary/50 ring-2 ring-primary/20' : 'border-border',
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-bold text-white shadow-md">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="mb-5 text-center">
        <h3 className="text-lg font-bold font-display">{name}</h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-extrabold gradient-text">${price}</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
      </div>

      {/* Simple feature list (Free + Creator) */}
      {features && (
        <ul className="mb-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f.text} className="flex items-start gap-2 text-sm">
              {f.included ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/30" />
              )}
              <span className={cn(!f.included && 'text-muted-foreground/40')}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Sectioned feature list (Pro) */}
      {sections && (
        <div className="mb-6 flex-1 space-y-4">
          {sections.map((s) => (
            <div key={s.label}>
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5">
                {s.label}
              </p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleUpgrade}
        disabled={loading || key === 'free'}
        className={cn(
          'w-full rounded-xl py-3 text-sm font-bold transition-all',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          popular
            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md hover:opacity-90'
            : key === 'pro'
              ? 'bg-foreground text-background hover:opacity-90'
              : 'border border-border hover:bg-muted/50',
        )}
      >
        {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : cta}
      </button>
    </motion.div>
  );
}
