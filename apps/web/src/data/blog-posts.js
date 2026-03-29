import { blogPosts1 } from './blog-posts-1.js';
import { blogPosts2 } from './blog-posts-2.js';
import { blogPosts3 } from './blog-posts-3.js';
import { blogPosts4 } from './blog-posts-4.js';
import { blogPosts5 } from './blog-posts-5.js';
import { blogPosts5b } from './blog-posts-5b.js';
import { blogPosts6 } from './blog-posts-6.js';
import { blogPosts6b } from './blog-posts-6b.js';
import { blogPosts7 } from './blog-posts-7.js';
import { blogPosts7b } from './blog-posts-7b.js';
import { blogPosts8 } from './blog-posts-8.js';
import { blogPosts8b } from './blog-posts-8b.js';

/** All 68 blog posts sorted by date (newest first) */
export const blogPosts = [
  ...blogPosts1,
  ...blogPosts2,
  ...blogPosts3,
  ...blogPosts4,
  ...blogPosts5,
  ...blogPosts5b,
  ...blogPosts6,
  ...blogPosts6b,
  ...blogPosts7,
  ...blogPosts7b,
  ...blogPosts8,
  ...blogPosts8b,
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
