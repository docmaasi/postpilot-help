import { motion } from 'framer-motion';
import {
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Music2,
  AtSign,
} from 'lucide-react';

const platforms = [
  {
    Icon: Youtube,
    name: 'YouTube',
    color: '#FF0000',
    bg: 'from-red-500/10 to-red-500/5',
    desc: 'Import videos and repurpose them into posts for every other platform automatically.',
  },
  {
    Icon: Instagram,
    name: 'Instagram',
    color: '#E4405F',
    bg: 'from-pink-500/10 to-pink-500/5',
    desc: 'Plan Reels, Stories, and carousels with pixel-perfect previews before publishing.',
  },
  {
    Icon: Twitter,
    name: 'X / Twitter',
    color: '#1DA1F2',
    bg: 'from-sky-500/10 to-sky-500/5',
    desc: 'Schedule tweets with perfect timing and AI-generated thread ideas.',
  },
  {
    Icon: Facebook,
    name: 'Facebook',
    color: '#1877F2',
    bg: 'from-blue-600/10 to-blue-600/5',
    desc: 'Auto-post to Pages and Groups to keep your community engaged daily.',
  },
  {
    Icon: Linkedin,
    name: 'LinkedIn',
    color: '#0A66C2',
    bg: 'from-blue-700/10 to-blue-700/5',
    desc: 'Grow your professional audience with polished, business-ready content.',
  },
  {
    Icon: Music2,
    name: 'TikTok',
    color: '#00F2EA',
    bg: 'from-teal-400/10 to-teal-400/5',
    desc: 'Clip and share short-form video to reach the fastest-growing audience.',
  },
  {
    Icon: AtSign,
    name: 'Threads',
    color: '#000000',
    bg: 'from-gray-500/10 to-gray-500/5',
    desc: 'Cross-post to Threads instantly and join the conversation on Meta\'s newest platform.',
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PlatformShowcase() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Master <span className="gradient-text">Every Platform</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {platforms.map(({ Icon, name, color, bg, desc }) => (
            <motion.div
              key={name}
              variants={card}
              className={`bg-gradient-to-br ${bg} rounded-2xl p-6 text-left space-y-4
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <Icon className="h-12 w-12" style={{ color }} />
              <h3 className="font-bold text-lg font-display">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
