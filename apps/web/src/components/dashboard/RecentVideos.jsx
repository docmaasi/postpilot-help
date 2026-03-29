import { Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail } from '../../lib/youtube.js';
import { VideoThumbnailMock } from '../shared/VideoThumbnailMock.jsx';

/**
 * Widget showing the 5 most recently imported YouTube videos.
 */
export function RecentVideos({ videos }) {
  const recent = videos?.slice(0, 5) ?? [];

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Videos</h2>
        <Link to="/videos" className="text-xs font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="relative flex h-36 flex-col items-center justify-center text-muted-foreground">
          <div className="absolute inset-x-4 top-2 opacity-[0.05]">
            <VideoThumbnailMock title="Your first video" duration="0:00" views="Import to get started" />
          </div>
          <Youtube className="mb-2 h-8 w-8 opacity-30" />
          <p className="text-sm">No videos imported yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((video) => (
            <Link
              key={video._id}
              to={`/videos/${video._id}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <img
                src={video.thumbnailUrl || getYouTubeThumbnail(video.videoId)}
                alt={video.title}
                className="h-10 w-16 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{video.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(video.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
