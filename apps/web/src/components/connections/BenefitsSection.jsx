import { motion } from 'framer-motion';
import { Send, BarChart3, MessageCircle } from 'lucide-react';

const BENEFITS = [
  {
    icon: Send,
    title: 'Direct Publishing',
    description: 'Schedule and publish directly from PostPilot to all your platforms.',
    gradient: 'stat-gradient-violet',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track engagement, reach, and performance across all platforms.',
    gradient: 'stat-gradient-pink',
  },
  {
    icon: MessageCircle,
    title: 'Comments',
    description: 'Monitor and respond to comments from a single dashboard.',
    gradient: 'stat-gradient-blue',
  },
];

/**
 * "Why connect your accounts?" section with 3 benefit cards.
 */
export function BenefitsSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Why connect your accounts?</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`rounded-xl border border-border p-5 ${b.gradient}`}
            >
              <Icon className="mb-3 h-8 w-8 text-primary" />
              <h4 className="mb-1 font-semibold">{b.title}</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
