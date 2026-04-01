import { motion } from 'framer-motion';
import { Sparkles, CreditCard } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { PlanCards } from '../components/pricing/PlanCard.jsx';
import { PackCards } from '../components/pricing/PackCard.jsx';
import { CirclesExplainer } from '../components/pricing/CirclesExplainer.jsx';
import { ShareButton } from '../components/shared/ShareButton.jsx';
import { LandingNav } from '../components/landing/LandingNav.jsx';

export default function Pricing() {
  const location = useLocation();
  const isInsideApp = location.pathname.startsWith('/app');

  return (
    <div className={isInsideApp ? 'bg-background' : 'min-h-screen bg-background'}>
      {!isInsideApp && <LandingNav />}
      <div className={`space-y-12 pb-12 ${isInsideApp ? 'pt-0' : 'pt-24'}`}>
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Simple, transparent pricing
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Choose your{' '}
          <span className="gradient-text">content engine</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Start free. Upgrade when you&apos;re ready to unlock more power,
          more accounts, and team collaboration.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={isInsideApp ? '/app' : '/login'}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-4 w-4" />
            Try Free
          </Link>
          <Link
            to={isInsideApp ? '/app/billing' : '/login'}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-muted transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Subscriptions
          </Link>
          <ShareButton
            title="PostPilot Pricing — Simple, transparent pricing"
            description="Check out PostPilot's pricing plans. Start free and upgrade when you're ready."
          />
        </div>
      </motion.div>

      {/* Plan cards */}
      <PlanCards />

      {/* Circles explainer */}
      <CirclesExplainer />

      {/* One-time packs */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Power-up{' '}
          <span className="gradient-text">Packs</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          One-time purchases to boost your content game. No subscription needed.
        </p>
      </div>

      <PackCards />
      </div>
    </div>
  );
}
