import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, LayoutDashboard, Youtube, PenSquare, CalendarDays, Image,
  Copy, Megaphone, Users, BarChart3, MessageCircle, TrendingUp,
  Link2, CreditCard, Gift, Settings, Sparkles,
} from 'lucide-react';

const FEATURE_GROUPS = [
  {
    label: 'Content',
    items: [
      { icon: LayoutDashboard, name: 'Dashboard' },
      { icon: Youtube, name: 'Video Import' },
      { icon: PenSquare, name: 'Post Editor' },
      { icon: CalendarDays, name: 'Calendar' },
      { icon: Image, name: 'Media Library' },
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
      { icon: Sparkles, name: 'Pricing' },
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
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/logo.png" alt="PostPilot" className="h-14 w-auto" />
        </Link>

        {/* Center nav links — visible on md+ screens, fills the gap */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-1">
          <NavPill href="#features">Features</NavPill>
          <NavPill href="#platforms">Platforms</NavPill>
          <NavPill href="#pricing">Pricing</NavPill>
          <Link to="/blog" className="px-4 py-2 text-sm font-bold text-accent hover:bg-accent/10 rounded-full transition-colors">
            Blog / Resources
          </Link>
          <Link to="/features" className="px-4 py-2 text-sm font-semibold text-foreground/60 hover:text-foreground hover:bg-muted rounded-full transition-colors">
            Learn More
          </Link>
        </div>

        {/* Right side — login + CTA + hamburger */}
        <div className="flex items-center gap-2 ml-auto">
          <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">
            Login
          </Link>
          <Link to="/login" className="hidden sm:block rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
            Get Started
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 hover:bg-muted transition-colors ml-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Full dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 bg-white shadow-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 space-y-5">
              {/* Mobile-only quick links */}
              <div className="flex flex-wrap gap-2 md:hidden">
                <a href="#features" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Features</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Pricing</a>
                <Link to="/blog" onClick={() => setMenuOpen(false)} className="rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent">Blog / Resources</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-full bg-muted px-4 py-2 text-sm font-semibold">Login</Link>
              </div>

              {/* Feature grid — always visible */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                  Everything Inside PostPilot
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FEATURE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-bold text-primary mb-2">{group.label}</p>
                      <div className="space-y-0.5">
                        {group.items.map(({ icon: Icon, name }) => (
                          <div key={name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/70 hover:bg-muted transition-colors cursor-default">
                            <Icon className="h-4 w-4 text-primary/50" />
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-center text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavPill({ href, children }) {
  return (
    <a href={href} className="px-4 py-2 text-sm font-semibold text-foreground/60 hover:text-foreground hover:bg-muted rounded-full transition-colors">
      {children}
    </a>
  );
}
