import { ConvexReactClient } from 'convex/react';

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  console.warn('Missing VITE_CONVEX_URL environment variable');
}

export const convex = new ConvexReactClient(convexUrl);
