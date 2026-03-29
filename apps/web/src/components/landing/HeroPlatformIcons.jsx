import { motion } from 'framer-motion';
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Music2,
  AtSign,
} from 'lucide-react';

const platforms = [
  { Icon: Youtube, color: '#FF0000', label: 'YouTube' },
  { Icon: Instagram, color: '#E4405F', label: 'Instagram' },
  { Icon: Twitter, color: '#1DA1F2', label: 'X' },
  { Icon: Facebook, color: '#1877F2', label: 'Facebook' },
  { Icon: Linkedin, color: '#0A66C2', label: 'LinkedIn' },
  { Icon: Music2, color: '#00F2EA', label: 'TikTok' },
  { Icon: AtSign, color: '#000000', label: 'Threads' },
];

export function HeroPlatformIcons() {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 pt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {platforms.map(({ Icon, color, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <Icon className="h-8 w-8" style={{ color }} />
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}
