import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '@postpilot/lib';
import { getPlatform } from '../../lib/platforms.js';

/**
 * Lists all posts created from (linked to) a specific video.
 */
export function LinkedPosts({ youtubeVideoId }) {
  const posts = usePosts({ youtubeVideoId });
  const list = posts ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle"
    >
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Posts from This Video</h3>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No posts created from this video yet. Use the repurpose buttons above to get started.
        </p>
      ) : (
        <div className="space-y-2">
          {list.map((post) => {
            const platform = getPlatform(post.platform);
            return (
              <Link
                key={post._id}
                to={`/app/posts/${post._id}`}
                className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {post.content?.slice(0, 60) || 'Untitled post'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {platform.name} &middot; {post.status}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
