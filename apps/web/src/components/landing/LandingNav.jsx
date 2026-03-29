import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, LayoutDashboard, Youtube, PenSquare, CalendarDays, Image,
  Copy, Megaphone, Users, BarChart3, MessageCircle, TrendingUp,
  Link2, CreditCard, Gift, Settings,
} from 'lucide-react';

const FEATURE_GROUPS = [
  {
    label: 'Content',
    items: [
      { icon: LayoutDashboard, name: 'Dashboard' },
      { icon: Youtube, name: 'Videos' },
      { icon: PenSquare, name: 'Posts' },
      { icon: CalendarDays, name: 'Calendar' },
      { icon: Image, name: 'Media' },
    ],
  },
  {
    label: 'Organize',
    items: [
      { icon: Copy, name: 'Templates' },
      { icon: Megaphone, name: 'Campaigns' },
      { icon: Users, name: 'Circles' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: BarChart3, name: 'Analytics' },
      { icon: MessageCircle, name: 'Comments' },
      { icon: TrendingUp, name: 'Trending' },
    ],
  },
  {
    label: 'Account',
    items: [
      { icon: Link2, name: 'Connections' },
      { icon: CreditCard, name: 'Billing' },
      { icon: Gift, name: 'Referrals' },
      { icon: Settings, name: 'Settings' },
    ],
  },
];

export function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="PostPilot" className="h-14 w-auto" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 lg:flex">
          <a href="#features" className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">Pricing</a>
          <Link to="/blog" className="text-sm font-bold text-accent hover:text-accent/80 transition-colors">Blog / Resources</Link>
          <Link to="/login" className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">Login</Link>
          <Link to="/login" className="rounded-full bg-gradient-to-r from-primary to-accent px-7 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Get Started Free
          </Link>
        </div>

        {/* Hamburger button — visible on ALL screen sizes */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2.5 hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 bg-white shadow-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
              {/* Top links */}
              <div className="flex flex-wrap gap-3">
                <a href="#features" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors">Features</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors">Pricing</a>
                <Link to="/blog" onClick={() => setMenuOpen(false)} className="rounded-full bg-accent/10 px-5 py-2 text-sm font-bold text-accent hover:bg-accent/20 transition-colors">Blog / Resources</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-full bg-muted px-5 py-2 text-sm font-semibold hover:bg-muted/80 transition-colors">Login</Link>
              </div>

              {/* Feature grid */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">App Features</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FEATURE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-bold text-primary mb-2">{group.label}</p>
                      <div className="space-y-1">
                        {group.items.map(({ icon: Icon, name }) => (
                          <div key={name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/70 hover:bg-muted transition-colors">
                            <Icon className="h-4 w-4 text-primary/60" />
                            <span>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/login" onClick={() => setMenuOpen(false)} className="block rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-center text-sm font-bold text-white shadow-lg">
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
