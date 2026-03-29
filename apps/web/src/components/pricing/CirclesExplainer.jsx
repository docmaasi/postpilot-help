import { motion } from 'framer-motion';
import { Users, PenLine, Send, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Users,
    title: 'Invite Your Team',
    description: 'Add collaborators to your Circle and create together.',
  },
  {
    icon: PenLine,
    title: 'Draft Together',
    description: 'Guest contributors can create and edit drafts for review.',
  },
  {
    icon: Send,
    title: 'You Approve & Publish',
    description: 'Only you decide what goes live. Full publishing control.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Set who can view, edit, or publish across your accounts.',
  },
];

export function CirclesExplainer() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-8 shadow-subtle"
    >
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">
          What are{' '}
          <span className="gradient-text">PostPilot Circles</span>?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Circles let you collaborate with editors, VAs, and teammates —
          without sharing your passwords.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
            className="text-center"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{f.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
