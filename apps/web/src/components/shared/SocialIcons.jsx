/**
 * Generic social-media-inspired SVG icons.
 * These are abstract representations — NOT official brand logos.
 */

export function PlayIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill={color} />
    </svg>
  );
}

export function HeartIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5.09C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z"
        fill={color}
      />
    </svg>
  );
}

export function CommentBubbleIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H7L2 22V6C2 4.9 2.9 4 4 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8" cy="11" r="1" fill={color} />
      <circle cx="12" cy="11" r="1" fill={color} />
      <circle cx="16" cy="11" r="1" fill={color} />
    </svg>
  );
}

export function ShareArrowIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M14 3L21 10L14 17V12.5C7 12.5 4 16 3 21C3 14 7 9.5 14 9.5V3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function NotificationIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10V15L20 17H4L6 15V10Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20" stroke={color} strokeWidth="1.5" />
      <circle cx="17" cy="6" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

export function VideoFrameIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M10 10L16 13L10 16V10Z" fill={color} opacity="0.5" />
    </svg>
  );
}

export function StoryCircleIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeDasharray="4 2" fill="none" />
      <circle cx="12" cy="12" r="7" fill={color} opacity="0.15" />
      <circle cx="12" cy="12" r="4" fill={color} opacity="0.3" />
    </svg>
  );
}

export function PostCardIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="6" y="13" width="12" height="2" rx="1" fill={color} opacity="0.4" />
      <rect x="6" y="17" width="8" height="1.5" rx="0.75" fill={color} opacity="0.25" />
      <rect x="6" y="5" width="12" height="6" rx="1.5" fill={color} opacity="0.12" />
    </svg>
  );
}
