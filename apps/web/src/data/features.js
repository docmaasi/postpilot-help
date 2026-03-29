import {
  BarChart3,
  Youtube,
  Instagram,
  Facebook,
  CalendarDays,
  Sparkles,
  Users,
  LayoutGrid,
  Globe,
  Copy,
} from 'lucide-react';

export const FEATURES = [
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    tagline: 'Data-driven decisions for your content strategy',
    color: 'from-blue-500 to-cyan-400',
    description:
      'Understanding your audience is the foundation of every successful content strategy. PostPilot Analytics goes beyond vanity metrics to give you actionable insights about what is working and what is not. Track engagement rates, follower growth, and post performance across every connected platform from a single dashboard. See which content formats drive the most engagement, discover your optimal posting times based on real audience behavior, and identify trends before your competitors do. Our heatmap view shows exactly when your audience is most active, so you can schedule posts for maximum visibility. Compare performance week-over-week and month-over-month to measure your growth trajectory. Export reports to share with clients or team members.',
  },
  {
    icon: Youtube,
    title: 'YouTube Repurposing',
    tagline: 'Turn one video into a week of content',
    color: 'from-red-500 to-orange-400',
    description:
      'Creating content from scratch for every platform is exhausting and unsustainable. PostPilot solves this by letting you import any YouTube video and automatically extract the key moments, quotes, and talking points that make great social media posts. Paste a YouTube URL, and our system pulls the title, description, thumbnail, and transcript. From there, you can generate platform-specific posts tailored to Twitter threads, Instagram captions, LinkedIn articles, TikTok scripts, Facebook posts, and Threads updates. Each generated post respects the unique character limits, hashtag conventions, and tone that performs best on each platform. Stop creating content seven times — create it once and let PostPilot adapt it everywhere.',
  },
  {
    icon: Instagram,
    title: 'Instagram Posting',
    tagline: 'Craft scroll-stopping Instagram content',
    color: 'from-pink-500 to-purple-500',
    description:
      'Instagram rewards consistency and quality, but managing a feed alongside Stories and Reels is a full-time job. PostPilot streamlines your Instagram workflow with visual post previews that show exactly how your content will appear in the feed before you publish. Write captions with smart character counting, add up to 30 hashtags from our trending suggestions, and preview your grid layout to maintain a cohesive aesthetic. Our AI caption generator understands Instagram best practices — from hook-first opening lines to engagement-driving calls to action. Schedule carousel posts, single images, and Reels all from one editor. Track which hashtag sets drive the most reach and refine your strategy over time.',
  },
  {
    icon: Facebook,
    title: 'Facebook Strategy',
    tagline: 'Maximize reach on the world\'s largest network',
    color: 'from-blue-600 to-blue-400',
    description:
      'Facebook remains the most-used social platform in the world, but organic reach has become increasingly competitive. PostPilot helps you cut through the noise with content optimized for Facebook\'s algorithm. Preview your posts exactly as they will appear in the News Feed, including link previews and image formatting. Our editor understands Facebook\'s preferences for native video, conversation-starting questions, and community-building content. Schedule posts to your Page or Group at the times when your specific audience is most active. Track engagement metrics including reactions, comments, shares, and click-through rates. Use our AI suggestions to write posts that encourage meaningful interactions — the key signal Facebook uses to boost organic reach.',
  },
  {
    icon: CalendarDays,
    title: 'Content Calendar',
    tagline: 'Visual scheduling that makes planning effortless',
    color: 'from-violet-500 to-indigo-400',
    description:
      'A consistent posting schedule is the single most important factor in growing your social media presence. PostPilot\'s visual content calendar gives you a bird\'s-eye view of your entire content strategy across all platforms. See every scheduled, drafted, and published post on a beautiful monthly or weekly grid. Each post is color-coded by platform so you can instantly spot gaps in your schedule. Click any day to see details or drag posts between dates to reschedule in seconds. The calendar syncs in real-time across your team through PostPilot Circles, so everyone stays aligned. Set up recurring content slots for regular series, and never miss a posting window again. Planning a month of content takes minutes, not hours.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Captions',
    tagline: 'Writer\'s block is officially over',
    color: 'from-amber-500 to-yellow-400',
    description:
      'Writing compelling captions for seven different platforms is one of the biggest bottlenecks for content creators. PostPilot\'s AI caption engine eliminates writer\'s block by generating platform-optimized copy in seconds. Simply describe your topic or paste your video transcript, and our AI creates tailored captions for each platform — punchy tweets, professional LinkedIn posts, engaging Instagram captions, and more. Every suggestion follows platform best practices for length, tone, hashtag usage, and call-to-action placement. You can refine results with one-click tone adjustments (professional, casual, humorous, inspirational) and edit freely before publishing. The AI learns from your style over time, making suggestions that sound authentically you.',
  },
  {
    icon: Users,
    title: 'Collaboration (Circles)',
    tagline: 'Team content management made simple',
    color: 'from-green-500 to-emerald-400',
    description:
      'Content creation is rarely a solo effort. Whether you work with a social media manager, a video editor, or a brand team, PostPilot Circles lets you collaborate seamlessly. Invite team members to your Circle with role-based permissions — Admins manage everything, Editors create and schedule content, and Viewers can review without making changes. Every team member sees the same content calendar, post drafts, and analytics in real-time. Leave comments on draft posts for feedback before they go live. Circles eliminates the back-and-forth of sharing screenshots and copy in chat apps. Your entire content workflow lives in one place, with a clear audit trail of who created, edited, and approved every post.',
  },
  {
    icon: LayoutGrid,
    title: 'Content Calendar Views',
    tagline: 'See your strategy from every angle',
    color: 'from-teal-500 to-cyan-400',
    description:
      'Different perspectives reveal different insights. PostPilot offers multiple calendar views so you can plan your content strategy the way that works best for you. The monthly view gives you a high-level overview of your posting cadence across all platforms. The weekly view lets you fine-tune daily timing and spot opportunities for real-time content. List view shows all scheduled posts in a scannable format, perfect for quick reviews. Each view supports filtering by platform, status, or campaign, so you can focus on exactly what you need. Color-coded platform indicators make it easy to ensure balanced coverage across all your channels. Switch between views instantly without losing your place.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform Publishing',
    tagline: 'One editor, every platform, zero hassle',
    color: 'from-purple-500 to-pink-400',
    description:
      'Managing separate tools for each social platform wastes time and creates inconsistency. PostPilot unifies your publishing workflow across Twitter/X, Instagram, LinkedIn, TikTok, Facebook, YouTube, and Threads — all from a single post editor. Write your core message once, then customize it for each platform with platform-specific tabs that show character limits, hashtag recommendations, and format requirements. Preview exactly how your post will appear on each platform before publishing. Schedule posts individually or batch-publish across multiple platforms simultaneously. Our smart scheduling engine suggests optimal posting times for each platform based on your audience data. Connect your accounts once and publish everywhere.',
  },
  {
    icon: Copy,
    title: 'Template System',
    tagline: 'Save your best formats and reuse them',
    color: 'from-orange-500 to-red-400',
    description:
      'The most successful content creators have repeatable formats that their audience loves. PostPilot Templates let you save your best-performing post structures and reuse them effortlessly. Create templates for recurring content types — weekly tips, product launches, behind-the-scenes updates, promotional posts, and more. Each template can include placeholder text, default hashtag sets, and platform assignments. When inspiration strikes, start from a template instead of a blank page and cut your content creation time in half. Share templates across your Circle so your entire team maintains brand consistency. Our template library also includes professionally designed starting points for common content categories to get you started fast.',
  },
];
