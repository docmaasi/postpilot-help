import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVideos, usePosts, useCurrentUser } from '@postpilot/lib';
import { StatsGrid } from '../components/dashboard/StatsGrid.jsx';
import { RecentVideos } from '../components/dashboard/RecentVideos.jsx';
import { UpcomingPosts } from '../components/dashboard/UpcomingPosts.jsx';
import { DraftPosts } from '../components/dashboard/DraftPosts.jsx';
import { PlatformStatus } from '../components/dashboard/PlatformStatus.jsx';

export default function Dashboard() {
  const user = useCurrentUser();
  const videos = useVideos();
  const posts = usePosts();

  /** Compute stats from real data */
  const stats = useMemo(() => {
    const allPosts = posts ?? [];
    return {
      videos: videos?.length ?? 0,
      posts: allPosts.length,
      scheduled: allPosts.filter((p) => p.status === 'scheduled').length,
      drafts: allPosts.filter((p) => p.status === 'draft').length,
    };
  }, [videos, posts]);

  const greeting = getGreeting();
  const displayName = user?.displayName?.split(' ')[0] || 'Creator';

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome header with gradient */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          {greeting},{' '}
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            {displayName}
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is what is happening with your content today.
        </p>
      </motion.div>

      {/* Stats cards */}
      <StatsGrid stats={stats} />

      {/* Two-column widget grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentVideos videos={videos} />
        <UpcomingPosts posts={posts} />
        <DraftPosts posts={posts} />
        <PlatformStatus />
      </div>
    </div>
  );
}

/** Returns a time-of-day greeting */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
