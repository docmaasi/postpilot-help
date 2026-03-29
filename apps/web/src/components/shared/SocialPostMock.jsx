import { HeartIcon, CommentBubbleIcon, ShareArrowIcon } from './SocialIcons.jsx';

/**
 * Generic social post card — looks like a social media post but is unbranded.
 * Can be used in dashboard widgets, empty states, and previews.
 *
 * @param {object} props
 * @param {string} [props.avatar]         - avatar URL (falls back to initial)
 * @param {string} [props.name]           - author name
 * @param {string} [props.time]           - relative time string
 * @param {string} [props.content]        - post text
 * @param {string} [props.image]          - optional image URL
 * @param {{ likes?: number, comments?: number, shares?: number }} [props.engagement]
 * @param {string} [props.accentColor]    - platform hint color (left border)
 * @param {string} [props.className]      - extra CSS classes
 */
export function SocialPostMock({
  avatar,
  name = 'Creator',
  time = '2h ago',
  content = 'Check out my latest content!',
  image,
  engagement = {},
  accentColor,
  className = '',
}) {
  const initial = name.charAt(0).toUpperCase();
  const { likes = 0, comments = 0, shares = 0 } = engagement;

  return (
    <div
      className={`rounded-xl border border-border bg-card shadow-sm overflow-hidden ${className}`}
      style={accentColor ? { borderLeftWidth: 3, borderLeftColor: accentColor } : undefined}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2">
        {avatar ? (
          <img src={avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-[11px] text-muted-foreground">{time}</p>
        </div>
      </div>

      {/* Content */}
      <p className="px-4 pb-2 text-sm leading-relaxed text-foreground/80 line-clamp-3">
        {content}
      </p>

      {/* Optional image */}
      {image && (
        <img src={image} alt="" className="w-full object-cover max-h-48" />
      )}

      {/* Engagement bar */}
      <div className="flex items-center gap-5 border-t border-border/50 px-4 py-2.5 text-muted-foreground">
        <span className="flex items-center gap-1.5 text-xs">
          <HeartIcon size={14} /> {likes}
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <CommentBubbleIcon size={14} /> {comments}
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <ShareArrowIcon size={14} /> {shares}
        </span>
      </div>
    </div>
  );
}
