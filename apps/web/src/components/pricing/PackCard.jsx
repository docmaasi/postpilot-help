import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, BarChart3, Loader2 } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

const PACKS = [
  {
    key: 'content_blitz',
    name: 'Content Blitz Pack',
    price: 9.99,
    icon: Zap,
    color: 'from-primary/80 to-primary/40',
    items: [
      '25 AI rewrites',
      '50 extra scheduled posts',
      'Never expires',
    ],
  },
  {
    key: 'viral_growth',
    name: 'Viral Growth Pack',
    price: 14.99,
    icon: Users,
    color: 'from-accent/80 to-accent/40',
    items: [
      '+10 Circle collaborator slots',
      'Viral caption templates',
      'Trending hashtag helper',
    ],
  },
  {
    key: 'analytics',
    name: 'Analytics Pack',
    price: 19.99,
    icon: BarChart3,
    color: 'from-info/80 to-info/40',
    items: [
      'Unlock analytics dashboard',
      'Best-time-to-post insights',
      'Engagement scoring',
    ],
  },
];

export function PackCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {PACKS.map((pack, i) => (
        <PackCard key={pack.name} pack={pack} index={i} />
      ))}
    </div>
  );
}

function PackCard({ pack, index }) {
  const { key, name, price, icon: Icon, color, items } = pack;
  const [loading, setLoading] = useState(false);
  const createCheckout = useAction(
    api.payments.stripe.createPackCheckoutSession
  );

  async function handleBuy() {
    setLoading(true);
    try {
      const url = await createCheckout({
        packType: key,
        successUrl: `${window.location.origin}/billing?pack_success=true`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Pack checkout error:', err);
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass relative flex flex-col rounded-2xl p-6"
    >
      <div className={`absolute -top-4 left-6 h-12 w-12 rounded-xl bg-gradient-to-br ${color} p-2.5 shadow-lg`}>
        <Icon className="h-full w-full text-white" />
      </div>

      <div className="mt-6">
        <h3 className="text-base font-bold">{name}</h3>
        <p className="mt-1 text-2xl font-extrabold gradient-text">
          ${price}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            one-time
          </span>
        </p>
      </div>

      <ul className="my-4 flex-1 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>

      <button
        onClick={handleBuy}
        disabled={loading}
        className="w-full rounded-xl border border-primary/30 bg-primary/10 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="mx-auto h-4 w-4 animate-spin" />
        ) : (
          'Buy Pack'
        )}
      </button>
    </motion.div>
  );
}
