import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Check, X } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useVideos, usePosts, useCurrentUser, useUpdateProfile } from '@postpilot/lib';
import { StatsGrid } from '../components/dashboard/StatsGrid.jsx';
import { RecentVideos } from '../components/dashboard/RecentVideos.jsx';
import { UpcomingPosts } from '../components/dashboard/UpcomingPosts.jsx';
import { DraftPosts } from '../components/dashboard/DraftPosts.jsx';
import { PlatformStatus } from '../components/dashboard/PlatformStatus.jsx';
import { FloatingSocialBg } from '../components/shared/FloatingSocialBg.jsx';
import { ShareButton } from '../components/shared/ShareButton.jsx';

export default function Dashboard() {
  const user = useCurrentUser();
  const authDebug = useQuery(api.debug.checkAuth);
  // Temporary: log auth state to console
  if (authDebug) console.log('Auth debug:', authDebug);
  const { user: clerkUser } = useUser();
  const updateProfile = useUpdateProfile();
  const videos = useVideos();
  const posts = usePosts();

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
  const clerkName = clerkUser?.firstName || clerkUser?.fullName?.split(' ')[0] || '';
  const displayName = user?.displayName?.split(' ')[0] || clerkName || 'Creator';

  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');

  function startEditing() {
    setNameInput(displayName === 'Creator' ? '' : displayName);
    setEditing(true);
  }

  async function saveName() {
    const trimmed = nameInput.trim();
    if (trimmed) {
      try {
        await updateProfile({ displayName: trimmed });
      } catch (err) {
        console.error('Failed to save name:', err);
        window.alert('Error: ' + (err?.message || err?.data || JSON.stringify(err)));
      }
    }
    setEditing(false);
  }

  return (
    <div className="relative mx-auto max-w-6xl space-y-6">
      <FloatingSocialBg density="light" />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 flex-wrap">
            <span>{greeting},</span>
            {editing ? (
              <span className="inline-flex items-center gap-1.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                  placeholder="Your name"
                  autoFocus
                  className="border-b-2 border-primary bg-transparent px-1 py-0.5 text-3xl font-bold outline-none w-48"
                  style={{
                    background: 'linear-gradient(to right, #8b5cf6, #ec4899, #f97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                <button
                  onClick={saveName}
                  className="rounded-lg p-1.5 hover:bg-success/10 text-success transition-colors"
                  title="Save"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground transition-colors"
                  title="Cancel"
                >
                  <X className="h-5 w-5" />
                </button>
              </span>
            ) : (
              <span
                className="group inline-flex items-center gap-1.5 cursor-pointer"
                onClick={startEditing}
                title="Click to edit your name"
              >
                <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  {displayName}
                </span>
                <Pencil className="h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {editing
              ? 'Type your name and press Enter or click the checkmark.'
              : 'Here is what is happening with your content today.'}
          </p>
        </div>
        <ShareButton title="My PostPilot Dashboard" />
      </motion.div>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentVideos videos={videos} />
        <UpcomingPosts posts={posts} />
        <DraftPosts posts={posts} />
        <PlatformStatus />
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
