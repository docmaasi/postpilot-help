import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PlanCards } from '../components/pricing/PlanCard.jsx';
import { PackCards } from '../components/pricing/PackCard.jsx';
import { CirclesExplainer } from '../components/pricing/CirclesExplainer.jsx';
import { ShareButton } from '../components/shared/ShareButton.jsx';
import { LandingNav } from '../components/landing/LandingNav.jsx';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div className="space-y-12 pb-12 pt-24">
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
        <div className="mt-4 flex justify-center">
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
