/**
 * Platform configuration for all supported social media platforms.
 * Each platform includes its display name, character limit, icon name (Lucide), and brand color.
 */
export const PLATFORMS = {
  twitter: {
    name: 'X / Twitter',
    charLimit: 280,
    icon: 'Twitter',
    color: '#1DA1F2',
  },
  instagram: {
    name: 'Instagram',
    charLimit: 2200,
    icon: 'Instagram',
    color: '#E4405F',
  },
  facebook: {
    name: 'Facebook',
    charLimit: 63206,
    icon: 'Facebook',
    color: '#1877F2',
  },
  linkedin: {
    name: 'LinkedIn',
    charLimit: 3000,
    icon: 'Linkedin',
    color: '#0A66C2',
  },
  tiktok: {
    name: 'TikTok',
    charLimit: 2200,
    icon: 'Music2',
    color: '#000000',
  },
  youtube_community: {
    name: 'YouTube',
    charLimit: 5000,
    icon: 'Youtube',
    color: '#FF0000',
  },
  threads: {
    name: 'Threads',
    charLimit: 500,
    icon: 'AtSign',
    color: '#000000',
  },
};

/** Ordered list of platform keys for consistent display */
export const PLATFORM_ORDER = [
  'youtube_community',
  'twitter',
  'instagram',
  'facebook',
  'linkedin',
  'tiktok',
  'threads',
];

/**
 * Get a platform config by key, with a safe fallback.
 * @param {string} key
 */
export function getPlatform(key) {
  return PLATFORMS[key] ?? { name: key, charLimit: 280, icon: 'Globe', color: '#666' };
}
