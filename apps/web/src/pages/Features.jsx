import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { LandingNav } from '../components/landing/LandingNav.jsx';
import { FEATURES } from '../data/features.js';

export default function Features() {
  const [expanded, setExpanded] = useState(null);

  function toggle(index) {
    setExpanded(expanded === index ? null : index);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 text-center social-bg">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Everything You Need to{' '}
          <span className="gradient-text">Own Social Media</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          From video repurposing to AI captions to team collaboration,
          PostPilot has every tool you need to grow your audience.
        </motion.p>
      </section>

      {/* Feature cards grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isExpanded={expanded === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center social-bg border-t border-border">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Ready to <span className="gradient-text">get started?</span>
        </h2>
        <Link
          to="/login"
          className="inline-block rounded-xl bg-gradient-to-r from-primary to-accent px-10 py-4 text-lg font-bold text-white shadow-lg transition-shadow hover:shadow-xl"
        >
          Start Free Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border">
        &copy; {new Date().getFullYear()} PostPilot. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ feature, index, isExpanded, onToggle }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
      className="glass glow-card rounded-2xl border border-border overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      {/* Gradient accent */}
      <div className={`h-1 bg-gradient-to-r ${feature.color}`} />

      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.tagline}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 shrink-0"
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
