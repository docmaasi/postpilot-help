import { motion } from 'framer-motion';
import { PlatformCard } from '../components/connections/PlatformCard.jsx';
import { BenefitsSection } from '../components/connections/BenefitsSection.jsx';

const PLATFORMS = [
  { key: 'youtube_community', name: 'YouTube', color: '#FF0000', status: 'not_connected', description: 'Publish community posts and track video engagement.' },
  { key: 'twitter', name: 'X / Twitter', color: '#1DA1F2', status: 'not_connected', description: 'Share tweets and threads, track replies and mentions.' },
  { key: 'instagram', name: 'Instagram', color: '#E4405F', status: 'not_connected', description: 'Post reels, stories, and carousels with scheduling.' },
  { key: 'facebook', name: 'Facebook', color: '#1877F2', status: 'not_connected', description: 'Publish to pages and groups, monitor comments.' },
  { key: 'linkedin', name: 'LinkedIn', color: '#0A66C2', status: 'not_connected', description: 'Share professional content and articles.' },
  { key: 'tiktok', name: 'TikTok', color: '#010101', status: 'not_connected', description: 'Upload short-form videos and track views.' },
  { key: 'threads', name: 'Threads', color: '#010101', status: 'not_connected', description: 'Post threads and engage with your audience.' },
];

export default function Connections() {
  function handleConnect(key) {
    // Placeholder — platform OAuth not yet wired
    window.alert(`${key} connection coming soon!`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Connect Your Platforms</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Link your social accounts to publish, track analytics, and monitor comments.
        </p>
      </motion.div>

      {/* Platform grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <PlatformCard
            key={p.key}
            platform={p}
            index={i}
            onConnect={handleConnect}
          />
        ))}
      </div>

      <BenefitsSection />
    </div>
  );
}
