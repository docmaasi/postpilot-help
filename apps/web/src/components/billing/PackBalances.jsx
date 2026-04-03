import { motion } from 'framer-motion';
import { Package, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PackBalances({ packs }) {
  const navigate = useNavigate();

  if (!packs || packs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <h2 className="mb-3 text-lg font-semibold">Pack Balances</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {packs.map((pack) => (
          <div
            key={pack.label}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4 glow-card"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg stat-gradient-violet">
                <Package className="h-4 w-4 text-violet-500" />
              </div>
              <div>
                <p className="text-sm font-medium">{pack.label}</p>
                <p className="text-xs text-muted-foreground">
                  {pack.remaining} remaining
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <ShoppingCart className="h-3 w-3" />
              Buy More
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
