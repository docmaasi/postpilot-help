import { motion } from 'framer-motion';
import { getPlatform } from '@/lib/platforms.js';
import { RENDERERS } from './preview-renderers.jsx';

/**
 * Live mock preview showing how the post will look on the selected platform.
 * Swaps renderer per platform with a fade+slide animation.
 */
export function PlatformPreview({ platform, content, hashtags = [], showWatermark = true }) {
  const p = getPlatform(platform);
  const displayText = buildDisplayText(content, hashtags);
  const Renderer = RENDERERS[platform] || RENDERERS._generic;

  return (
    <motion.div
      key={platform}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Preview —{' '}
        <span style={{ color: p.color }}>{p.name}</span>
      </h3>

      <Renderer content={displayText} platform={p} />

      {showWatermark && (
        <p className="text-center text-[10px] text-muted-foreground/50">
          Created with PostPilot.Help
        </p>
      )}
    </motion.div>
  );
}

/** Combine content + hashtags into a single display string */
function buildDisplayText(content, hashtags) {
  const tags = hashtags.map((t) => `#${t}`).join(' ');
  return tags ? `${content}\n\n${tags}` : content;
}
