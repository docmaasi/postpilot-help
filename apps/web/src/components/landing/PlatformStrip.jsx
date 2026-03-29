import { motion } from 'framer-motion';
import {
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Music2,
  AtSign,
} from 'lucide-react';

const platforms = [
  { Icon: Youtube, name: 'YouTube', color: '#FF0000', tip: 'Import and repurpose videos' },
  { Icon: Twitter, name: 'X / Twitter', color: '#1DA1F2', tip: 'Schedule tweets with perfect timing' },
  { Icon: Instagram, name: 'Instagram', color: '#E4405F', tip: 'Plan Reels, Stories, and carousels' },
  { Icon: Facebook, name: 'Facebook', color: '#1877F2', tip: 'Auto-post to Pages and Groups' },
  { Icon: Linkedin, name: 'LinkedIn', color: '#0A66C2', tip: 'Grow your professional audience' },
  { Icon: Music2, name: 'TikTok', color: '#00F2EA', tip: 'Clip and share short-form video' },
  { Icon: AtSign, name: 'Threads', color: '#000000', tip: 'Cross-post to Threads instantly' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PlatformStrip() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          One Tool. <span className="gradient-text">Every Platform.</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {platforms.map(({ Icon, name, color, tip }) => (
            <motion.div
              key={name}
              variants={card}
              className="glass glow-card rounded-xl p-4 flex flex-col items-center gap-3
                cursor-default hover:scale-105 transition-transform"
            >
              <Icon size={32} style={{ color }} />
              <span className="font-semibold text-sm">{name}</span>
              <span className="text-xs text-muted-foreground text-center leading-snug">
                {tip}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
