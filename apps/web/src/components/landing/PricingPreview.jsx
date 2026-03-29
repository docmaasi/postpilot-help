import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '3 social accounts',
      '15 scheduled posts/month',
      '5 AI rewrites (2 tones)',
      'Basic content library',
      'Copy-paste publishing',
    ],
    cta: 'Get Started',
    ctaLink: '/login',
    highlight: false,
  },
  {
    name: 'Creator',
    price: '$12',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      '10 social accounts',
      'Unlimited scheduling',
      '50 AI rewrites/month',
      'Templates + no watermark',
      '5 Circle collaborators',
    ],
    cta: 'Start Creating',
    ctaLink: '/login',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$24',
    period: '/mo',
    features: [
      'Unlimited everything',
      'All 5 AI tones + video summarizer',
      'Auto-publish all 7 platforms',
      'Bulk schedule + evergreen recycling',
      'A/B testing + content scoring',
      'Best-time-to-post AI',
      'Competitor tracking (3 accounts)',
      '15 Circle collaborators',
      'Approval workflows + activity log',
      'Client workspaces (multi-brand)',
      'Custom branding + white-label reports',
      'Priority support',
    ],
    cta: 'Go Pro',
    ctaLink: '/login',
    highlight: false,
  },
];

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 px-4 section-alt">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Simple, <span className="gradient-text">Creator-Friendly</span> Pricing
        </h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-6 items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </motion.div>

        <a
          href="/pricing"
          className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          See Full Pricing Details &rarr;
        </a>
      </div>
    </section>
  );
}

function PlanCard({ name, price, period, badge, features, cta, ctaLink, highlight }) {
  return (
    <motion.div
      variants={card}
      className={`rounded-2xl p-6 space-y-5 text-left relative ${
        highlight
          ? 'border-2 border-primary bg-card shadow-xl'
          : name === 'Pro'
            ? 'border-2 border-foreground/20 bg-card shadow-lg'
            : 'border border-border bg-card'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-bold text-white">
          {badge}
        </span>
      )}

      <div>
        <h3 className="font-bold text-xl font-display">{name}</h3>
        <p className="mt-2">
          <span className="text-4xl font-extrabold gradient-text">{price}</span>
          <span className="text-muted-foreground text-sm"> {period}</span>
        </p>
      </div>

      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={ctaLink}
        className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
          highlight
            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl'
            : name === 'Pro'
              ? 'bg-foreground text-background hover:opacity-90'
              : 'border border-border hover:bg-muted/50'
        }`}
      >
        {cta}
      </a>
    </motion.div>
  );
}
