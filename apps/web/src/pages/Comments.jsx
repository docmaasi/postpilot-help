import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

export default function Comments() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Comment Monitor</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and respond to comments across all your platforms.
        </p>
      </motion.div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="gradient-border rounded-xl p-12 text-center"
      >
        <Link2 className="mx-auto mb-4 h-12 w-12 text-primary/40" />
        <h3 className="mb-2 text-lg font-semibold">
          Connect your platforms to see real comments here
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          Once you connect your social accounts, your comments will appear here
          with AI-powered sentiment analysis so you can reply faster.
        </p>
        <a
          href="/connections"
          className="mt-5 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Connect Platforms
        </a>
      </motion.div>
    </div>
  );
}
