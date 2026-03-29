import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';
import { CommentCard } from '../components/comments/CommentCard.jsx';
import { SAMPLE_COMMENTS } from '../data/sample-comments.js';

const TABS = ['All', 'Positive', 'Negative', 'Needs Reply'];

export default function Comments() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = SAMPLE_COMMENTS.filter((c) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Positive') return c.sentiment === 'positive';
    if (activeTab === 'Negative') return c.sentiment === 'negative';
    if (activeTab === 'Needs Reply') return c.sentiment === 'negative' || c.sentiment === 'neutral';
    return true;
  });

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

      {/* Filter tabs */}
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Comment list */}
      <div className="space-y-4">
        {filtered.map((comment, i) => (
          <CommentCard key={comment.id} comment={comment} index={i} />
        ))}
      </div>

      {/* Connect prompt */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="gradient-border rounded-xl p-6 text-center"
      >
        <Link2 className="mx-auto mb-3 h-10 w-10 text-primary/40" />
        <h3 className="mb-1 text-lg font-semibold">
          Connect platforms to see real comments
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          The comments above are sample data. Connect your accounts to monitor
          real comments with AI sentiment analysis.
        </p>
        <a
          href="/connections"
          className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Connect Platforms
        </a>
      </motion.div>
    </div>
  );
}
