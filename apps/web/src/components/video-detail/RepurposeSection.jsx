import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS, PLATFORM_ORDER } from '../../lib/platforms.js';

/**
 * "Repurpose This Video" section with 7 platform buttons.
 * Clicking a platform navigates to the post editor with video context.
 */
export function RepurposeSection({ videoId }) {
  const navigate = useNavigate();

  function handlePlatformClick(platformKey) {
    navigate(`/posts/new?videoId=${videoId}&platform=${platformKey}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle"
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Repurpose This Video</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Create a post for any platform using this video as inspiration.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PLATFORM_ORDER.map((key) => {
          const p = PLATFORMS[key];
          return (
            <button
              key={key}
              onClick={() => handlePlatformClick(key)}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-all hover:shadow-md"
              style={{
                borderColor: p.color + '40',
                background: p.color + '08',
              }}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
