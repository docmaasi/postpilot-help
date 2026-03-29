import { blogPosts1 } from './blog-posts-1.js';
import { blogPosts2 } from './blog-posts-2.js';
import { blogPosts3 } from './blog-posts-3.js';
import { blogPosts4 } from './blog-posts-4.js';

/** All 35 blog posts sorted by date (newest first) */
export const blogPosts = [
  ...blogPosts1,
  ...blogPosts2,
  ...blogPosts3,
  ...blogPosts4,
].sort((a, b) => new Date(b.date) - new Date(a.date));

/** Unique categories derived from posts */
export const blogCategories = [
  'Strategy',
  'Technology',
  'Platform Updates',
  'AI & Automation',
  'Content Creation',
  'Social Media Trends',
  'Analytics',
  'Growth Hacking',
  'Analytics & Performance',
  'Social Media Strategy',
  'Platform Guides',
  'Content Repurposing',
  'Scheduling & Consistency',
  'Creator Workflow',
  'AI for Content',
];
