import {
  PlayIcon,
  HeartIcon,
  CommentBubbleIcon,
  ShareArrowIcon,
  PostCardIcon,
  NotificationIcon,
  VideoFrameIcon,
  StoryCircleIcon,
} from './SocialIcons.jsx';

const ICONS = [
  PlayIcon, HeartIcon, CommentBubbleIcon, ShareArrowIcon,
  PostCardIcon, NotificationIcon, VideoFrameIcon, StoryCircleIcon,
];

const SPEEDS = ['float-slow', 'float-medium', 'float-fast'];
const SIZES = [20, 28, 36, 44];

/** Seed-based pseudo-random so positions are stable across renders. */
function seeded(i) {
  const x = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
  return x;
}

function buildElements(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    Icon: ICONS[i % ICONS.length],
    size: SIZES[Math.floor(seeded(i + 1) * SIZES.length)],
    top: `${seeded(i + 2) * 90}%`,
    left: `${seeded(i + 3) * 95}%`,
    opacity: 0.03 + seeded(i + 4) * 0.03,
    animation: SPEEDS[i % SPEEDS.length],
    delay: `${seeded(i + 5) * 8}s`,
    duration: `${14 + seeded(i + 6) * 12}s`,
  }));
}

const DENSITY_MAP = { light: 5, medium: 8, heavy: 12 };

/**
 * Floating social media visual elements as a subtle background layer.
 * Uses CSS keyframes for performance (no JS animation runtime).
 */
export function FloatingSocialBg({ density = 'medium' }) {
  const count = DENSITY_MAP[density] ?? 8;
  const elements = buildElements(count);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {elements.map((el) => (
        <div
          key={el.id}
          className={el.animation}
          style={{
            position: 'absolute',
            top: el.top,
            left: el.left,
            opacity: el.opacity,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          <el.Icon size={el.size} color="hsl(265 65% 55%)" />
        </div>
      ))}
    </div>
  );
}
