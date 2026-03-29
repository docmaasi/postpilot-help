import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';
import { HashtagCard } from '../components/trending/HashtagCard.jsx';
import { SAMPLE_HASHTAGS } from '../data/sample-hashtags.js';

const TABS = ['All', 'YouTube', 'Twitter', 'Instagram', 'TikTok', 'LinkedIn'];

export default function Trending() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = SAMPLE_HASHTAGS.filter(
    (h) => activeTab === 'All' || h.platform === activeTab || h.platform === 'All',
  );

  function handleSave(_id) {
    window.alert('Saved! (Bookmarking coming soon)');
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Trending Hashtags</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover what is trending across platforms and boost your reach.
        </p>
      </motion.div>

      {/* Platform tabs */}
      <div className="flex flex-wrap gap-2">
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

      {/* Hashtag list */}
      <div className="space-y-3">
        {filtered.map((h, i) => (
          <HashtagCard key={h.id} hashtag={h} index={i} onSave={handleSave} />
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
          Connect platforms for live trending data
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          The hashtags above are sample data. Connect your accounts to see
          real-time trending topics tailored to your niche.
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
