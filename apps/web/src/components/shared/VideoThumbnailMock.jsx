import { PlayIcon } from './SocialIcons.jsx';

/**
 * Generic video thumbnail card with play overlay, duration badge,
 * title, view count, and date. Not branded to any specific platform.
 *
 * @param {object} props
 * @param {string}  [props.title]       - video title
 * @param {string}  [props.duration]    - e.g. "3:42"
 * @param {string}  [props.views]       - e.g. "12.4K views"
 * @param {string}  [props.date]        - e.g. "Mar 15"
 * @param {string}  [props.gradient]    - tailwind gradient classes
 * @param {string}  [props.className]   - extra CSS classes
 */
export function VideoThumbnailMock({
  title = 'Untitled Video',
  duration = '3:42',
  views = '0 views',
  date = '',
  gradient = 'from-violet-600/80 via-pink-500/60 to-orange-400/50',
  className = '',
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}>
      {/* Thumbnail area — 16:9 */}
      <div className={`relative aspect-video bg-gradient-to-br ${gradient}`}>
        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
            <PlayIcon size={28} color="white" />
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="px-3.5 py-2.5">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {views}
          {date && <> &middot; {date}</>}
        </p>
      </div>
    </div>
  );
}
