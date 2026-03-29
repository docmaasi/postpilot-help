import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['3 scheduled posts/week', '2 connected platforms', 'Basic analytics'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Creator',
    price: '$12',
    period: '/mo',
    features: [
      'Unlimited scheduled posts',
      '5 connected platforms',
      'AI rewriting',
      'Content calendar',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$24',
    period: '/mo',
    features: [
      'Everything in Creator',
      'All 7 platforms',
      'PostPilot Circles (team)',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
];

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PricingPreview() {
  return (
    <section id="pricing" className="py-24 px-4 social-bg">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Simple, <span className="gradient-text">Creator-Friendly</span> Pricing
        </h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {plans.map(({ name, price, period, features, cta, highlight }) => (
            <motion.div
              key={name}
              variants={card}
              className={`rounded-2xl p-6 space-y-6 text-left ${
                highlight
                  ? 'gradient-border glass ring-2 ring-primary/20 scale-[1.03]'
                  : 'glass'
              }`}
            >
              <div>
                <h3 className="font-bold text-xl">{name}</h3>
                <p className="mt-2">
                  <span className="text-4xl font-extrabold">{price}</span>
                  <span className="text-muted-foreground text-sm"> {period}</span>
                </p>
              </div>

              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={highlight ? '/sign-up' : '/pricing'}
                className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  highlight
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'border border-border hover:bg-muted/50'
                }`}
              >
                {cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <a
          href="/pricing"
          className="inline-block text-sm font-semibold text-primary hover:underline"
        >
          See Full Pricing &rarr;
        </a>
      </div>
    </section>
  );
}
