import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '@postpilot/lib';
import { PostCard } from '../components/posts/PostCard.jsx';
import { FilterTabs } from '../components/posts/FilterTabs.jsx';
import { EmptyPosts } from '../components/posts/EmptyPosts.jsx';

const TABS = ['all', 'draft', 'scheduled', 'published', 'failed'];

export default function Posts() {
  const navigate = useNavigate();
  const posts = usePosts();
  const [activeTab, setActiveTab] = useState('all');

  const sorted = useMemo(() => {
    const list = posts ?? [];
    const filtered =
      activeTab === 'all'
        ? list
        : list.filter((p) => p.status === activeTab);
    return [...filtered].sort(
      (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
    );
  }, [posts, activeTab]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your social media posts
          </p>
        </div>
        <button
          onClick={() => navigate('/posts/new')}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {/* Post List */}
      {sorted.length === 0 ? (
        <EmptyPosts activeTab={activeTab} />
      ) : (
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          <AnimatePresence>
            {sorted.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
