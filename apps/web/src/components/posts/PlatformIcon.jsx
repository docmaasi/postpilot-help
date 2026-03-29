import { Twitter, Instagram, Linkedin, Facebook, Hash, Music2 } from 'lucide-react';

const ICONS = {
  twitter: { icon: Twitter, color: 'text-sky-400 bg-sky-400/10' },
  instagram: { icon: Instagram, color: 'text-pink-500 bg-pink-500/10' },
  linkedin: { icon: Linkedin, color: 'text-blue-600 bg-blue-600/10' },
  facebook: { icon: Facebook, color: 'text-blue-500 bg-blue-500/10' },
  threads: { icon: Hash, color: 'text-gray-400 bg-gray-400/10' },
  tiktok: { icon: Music2, color: 'text-fuchsia-500 bg-fuchsia-500/10' },
};

export function PlatformIcon({ platform, size = 'md' }) {
  const config = ICONS[platform] || ICONS.twitter;
  const Icon = config.icon;
  const sizeClass = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-lg ${config.color}`}
    >
      <Icon className={iconSize} />
    </div>
  );
}
