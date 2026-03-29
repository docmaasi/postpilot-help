import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DANGEROUS_PROTOCOL_PATTERN = /^(javascript|data|vbscript):/i;

function getAllowedOrigins() {
  const origins = new Set();

  if (typeof window !== 'undefined') {
    origins.add(window.location.origin);
  }

  const envUrls = [
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB_URL,
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_MARKETING_URL,
  ];

  for (const raw of envUrls) {
    if (!raw) continue;
    try {
      origins.add(new URL(raw).origin);
    } catch {
      // skip malformed env values
    }
  }

  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    origins.add('http://localhost:3000');
    origins.add('http://localhost:3002');
    origins.add('http://localhost:5173');
    origins.add('http://localhost:5174');
  }

  return origins;
}

export function validateRedirectUrl(url, defaultPath = '/') {
  if (!url || typeof url !== 'string') {
    return defaultPath;
  }

  const trimmed = url.trim();

  if (DANGEROUS_PROTOCOL_PATTERN.test(trimmed)) {
    return defaultPath;
  }

  if (trimmed.startsWith('//') || trimmed.includes('/../') || trimmed.includes('/..?') || trimmed.endsWith('/..') || trimmed === '..') {
    return defaultPath;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const allowed = getAllowedOrigins();

    if (allowed.has(parsed.origin)) {
      return trimmed;
    }
  } catch {
    // not a valid absolute URL
  }

  return defaultPath;
}
