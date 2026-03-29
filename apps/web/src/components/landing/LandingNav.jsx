import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const FEATURE_GROUPS = [
  {
    label: 'Content',
    items: ['Dashboard', 'Videos', 'Posts', 'Calendar', 'Media'],
  },
  {
    label: 'Organize',
    items: ['Templates', 'Campaigns', 'Circles'],
  },
  {
    label: 'Insights',
    items: ['Analytics', 'Comments', 'Trending'],
  },
  {
    label: 'Account',
    items: ['Connections', 'Billing', 'Referrals', 'Settings'],
  },
];

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="PostPilot" className="h-12 w-auto" />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground/70 hover:text-foreground">
            Pricing
          </a>
          <Link to="/blog" className="text-sm font-semibold text-accent hover:text-accent/80">
            Blog / Resources
          </Link>
          <Link to="/login" className="text-sm font-medium text-foreground/70 hover:text-foreground">
            Login
          </Link>
          <Link
            to="/login"
            className="rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Free
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground/70 hover:bg-muted md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-white md:hidden"
          >
            <MobileMenu onClose={() => setMobileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileMenu({ onClose }) {
  return (
    <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col gap-1">
        <a href="#features" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
          Features
        </a>
        <a href="#pricing" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
          Pricing
        </a>
        <Link to="/blog" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-semibold text-accent">
          Blog / Resources
        </Link>
        <Link to="/login" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
          Login
        </Link>
      </div>

      <div className="border-t border-border pt-4">
        <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          App Features
        </p>
        <div className="grid grid-cols-2 gap-3">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-semibold text-primary mb-1">{group.label}</p>
              {group.items.map((item) => (
                <p key={item} className="px-3 py-1 text-sm text-muted-foreground">{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/login"
        onClick={onClose}
        className="block rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-3 text-center text-sm font-semibold text-white"
      >
        Get Started Free
      </Link>
    </div>
  );
}
