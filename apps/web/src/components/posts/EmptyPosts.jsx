import { motion } from 'framer-motion';
import { PenSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MESSAGES = {
  all: { title: 'No posts yet', desc: 'Create your first post or import a video to repurpose.' },
  draft: { title: 'No drafts', desc: 'Start writing a post and save it as a draft.' },
  scheduled: { title: 'Nothing scheduled', desc: 'Schedule posts to publish automatically.' },
  published: { title: 'Nothing published', desc: 'Your published posts will appear here.' },
  failed: { title: 'No failures', desc: 'Great news! All your posts published successfully.' },
};

export function EmptyPosts({ activeTab }) {
  const navigate = useNavigate();
  const msg = MESSAGES[activeTab] || MESSAGES.all;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl stat-gradient-violet">
        {activeTab === 'failed' ? (
          <Sparkles className="h-8 w-8 text-green-500" />
        ) : (
          <PenSquare className="h-8 w-8 text-violet-500" />
        )}
      </div>
      <h3 className="mb-1 text-lg font-bold">{msg.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{msg.desc}</p>
      {activeTab !== 'failed' && (
        <button
          onClick={() => navigate('/posts/new')}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Create Post
        </button>
      )}
    </motion.div>
  );
}
