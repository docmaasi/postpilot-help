import { motion } from 'framer-motion';
import { Share2, UserPlus, Gift } from 'lucide-react';

const STEPS = [
  { icon: Share2, title: 'Share Your Code', desc: 'Send your unique link to friends and fellow creators.' },
  { icon: UserPlus, title: 'Friend Signs Up', desc: 'They create a free PostPilot account using your link.' },
  { icon: Gift, title: 'You Both Earn', desc: 'Bonus credits are added to both accounts instantly.' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export function HowItWorks() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-center">How It Works</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={item}
            className="rounded-xl border border-border bg-card p-5 text-center glow-card"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl stat-gradient-violet">
              <step.icon className="h-6 w-6 text-violet-500" />
            </div>
            <p className="text-xs font-bold text-primary mb-1">Step {i + 1}</p>
            <h3 className="text-sm font-bold mb-1">{step.title}</h3>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
