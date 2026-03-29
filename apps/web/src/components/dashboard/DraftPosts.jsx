import { PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlatform } from '../../lib/platforms.js';

/**
 * Widget showing the 3 most recent draft posts.
 */
export function DraftPosts({ posts }) {
  const drafts = (posts ?? [])
    .filter((p) => p.status === 'draft')
    .slice(0, 3);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Draft Posts</h2>
        <Link to="/posts" className="text-xs font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      {drafts.length === 0 ? (
        <div className="flex h-28 flex-col items-center justify-center text-muted-foreground">
          <PenSquare className="mb-2 h-8 w-8 opacity-30" />
          <p className="text-sm">No drafts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {drafts.map((post) => {
            const platform = getPlatform(post.platform);
            return (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: platform.color }}
                >
                  <span className="text-xs font-bold">
                    {platform.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {platform.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
