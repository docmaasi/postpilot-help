import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X as XIcon, LayoutDashboard, Youtube, PenSquare, CalendarDays, Image,
  Copy, Megaphone, Users, BarChart3, MessageCircle, TrendingUp,
  Link2, CreditCard, Gift, Settings, Sparkles, ArrowLeft,
} from 'lucide-react';
import { NAV_FEATURE_DETAILS } from './nav-feature-details.js';

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
  const [activeFeature, setActiveFeature] = useState(null);

  function handleFeatureClick(name) {
    setActiveFeature(name);
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-2">
          <Link to="/" className="shrink-0">
            <img src="/logo.png" alt="PostPilot" className="h-14 w-auto" />
          </Link>

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
              {menuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/50 bg-white shadow-xl"
            >
              <div className="mx-auto max-w-7xl px-4 py-6 space-y-5">
                <div className="flex flex-wrap gap-2 md:hidden">
                  <a href="#features" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Features</a>
                  <a href="#pricing" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Pricing</a>
                  <Link to="/blog" onClick={() => setMenuOpen(false)} className="rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent">Blog / Resources</Link>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-full bg-muted px-4 py-2 text-sm font-semibold">Login</Link>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                    Everything Inside PostPilot — Click any feature to learn more
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {FEATURE_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="text-xs font-bold text-primary mb-2">{group.label}</p>
                        <div className="space-y-0.5">
                          {group.items.map(({ icon: Icon, name }) => (
                            <button
                              key={name}
                              onClick={() => handleFeatureClick(name)}
                              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <Icon className="h-4 w-4 text-primary/50" />
                              {name}
                            </button>
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

      {/* Feature detail modal */}
      <AnimatePresence>
        {activeFeature && (
          <FeatureDetailModal
            name={activeFeature}
            onClose={() => setActiveFeature(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NavPill({ href, children }) {
  return (
    <a href={href} className="px-4 py-2 text-sm font-semibold text-foreground/60 hover:text-foreground hover:bg-muted rounded-full transition-colors">
      {children}
    </a>
  );
}

function FeatureDetailModal({ name, onClose }) {
  const detail = NAV_FEATURE_DETAILS[name];
  if (!detail) return null;

  const icon = FEATURE_GROUPS
    .flatMap((g) => g.items)
    .find((i) => i.name === name);
  const Icon = icon?.icon || LayoutDashboard;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 top-[10%] z-[60] mx-auto max-w-2xl rounded-2xl bg-white border border-border shadow-2xl overflow-y-auto max-h-[80vh]"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
      >
        <div className="p-6 md:p-8 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display">{detail.title}</h3>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted transition-colors">
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="text-foreground/80 leading-relaxed space-y-4">
            {detail.description.split('. ').reduce((acc, s, i, arr) => {
              const idx = Math.floor(i / 4);
              if (!acc[idx]) acc[idx] = '';
              acc[idx] += s + (i < arr.length - 1 ? '. ' : '');
              return acc;
            }, []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <a
              href="/login"
              className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              Try It Free
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
