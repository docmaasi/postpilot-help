import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlatform } from '../../lib/platforms.js';
import { HeartIcon, CommentBubbleIcon, ShareArrowIcon } from '../shared/SocialIcons.jsx';
import { SocialPostMock } from '../shared/SocialPostMock.jsx';

/**
 * Widget showing the next 5 scheduled posts with platform and date info.
 */
export function UpcomingPosts({ posts }) {
  // Filter to only scheduled posts and sort by scheduledAt ascending
  const upcoming = (posts ?? [])
    .filter((p) => p.status === 'scheduled' && p.scheduledAt)
    .sort((a, b) => a.scheduledAt - b.scheduledAt)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Posts</h2>
        <Link to="/calendar" className="text-xs font-medium text-primary hover:underline">
          Calendar
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="relative flex h-36 flex-col items-center justify-center text-muted-foreground">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <SocialPostMock name="Your Brand" content="Your next post goes here..." engagement={{ likes: 128, comments: 24, shares: 12 }} />
          </div>
          <CalendarDays className="mb-2 h-8 w-8 opacity-30" />
          <p className="text-sm">No posts scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((post) => {
            const platform = getPlatform(post.platform);
            return (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="flex items-start gap-3 rounded-lg border border-transparent p-2.5 transition-colors hover:border-border/50 hover:bg-muted/50"
                style={{ borderLeftWidth: 3, borderLeftColor: platform.color }}
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: platform.color }}
                >
                  <span className="text-xs font-bold">{platform.name.charAt(0)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{post.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.scheduledAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                    })}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-muted-foreground/60">
                    <span className="flex items-center gap-1 text-[11px]"><HeartIcon size={11} /> 0</span>
                    <span className="flex items-center gap-1 text-[11px]"><CommentBubbleIcon size={11} /> 0</span>
                    <span className="flex items-center gap-1 text-[11px]"><ShareArrowIcon size={11} /> 0</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
