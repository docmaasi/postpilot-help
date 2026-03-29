/**
 * Parse a YouTube URL and extract the video ID.
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, youtube.com/embed/
 * @param {string} url - The YouTube URL to parse
 * @returns {string|null} The video ID, or null if the URL is invalid
 */
export function parseYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return null;

  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Generate a YouTube thumbnail URL from a video ID.
 * @param {string} videoId - The YouTube video ID
 * @param {'default'|'mqdefault'|'hqdefault'|'sddefault'|'maxresdefault'} quality
 * @returns {string} The thumbnail URL
 */
export function getYouTubeThumbnail(videoId, quality = 'mqdefault') {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Check if a string looks like a valid YouTube URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isYouTubeUrl(url) {
  return parseYouTubeUrl(url) !== null;
}
