import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, CalendarClock, Loader2 } from 'lucide-react';
import { usePost, useCreatePost, useUpdatePost } from '@postpilot/lib';
import { PLATFORM_ORDER } from '@/lib/platforms.js';
import { PlatformTabs } from '../components/editor/PlatformTabs.jsx';
import { ContentEditor } from '../components/editor/ContentEditor.jsx';
import { PlatformPreview } from '../components/editor/PlatformPreview.jsx';

export default function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existingPost = usePost(id);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const isEditing = !!id;
  const [platform, setPlatform] = useState(existingPost?.platform ?? PLATFORM_ORDER[0]);
  const [contentMap, setContentMap] = useState({});
  const [hashtagMap, setHashtagMap] = useState({});
  const [saving, setSaving] = useState(false);

  /** Get content for the active platform */
  const content = contentMap[platform] ?? existingPost?.content ?? '';
  const hashtags = hashtagMap[platform] ?? existingPost?.hashtags ?? [];

  const updateContent = useCallback(
    (text) => setContentMap((prev) => ({ ...prev, [platform]: text })),
    [platform],
  );

  const updateHashtags = useCallback(
    (tags) => setHashtagMap((prev) => ({ ...prev, [platform]: tags })),
    [platform],
  );

  /** Save as draft or schedule */
  async function handleSave(status = 'draft') {
    setSaving(true);
    try {
      const payload = {
        platform,
        content,
        hashtags,
        status,
      };
      if (isEditing) {
        await updatePost({ id, ...payload });
      } else {
        await createPost(payload);
      }
      navigate('/posts');
    } catch {
      /* TODO: toast error */
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Header */}
      <Header
        isEditing={isEditing}
        saving={saving}
        onBack={() => navigate('/posts')}
        onSaveDraft={() => handleSave('draft')}
        onSchedule={() => handleSave('scheduled')}
      />

      {/* Platform tabs */}
      <div className="rounded-xl border border-border bg-card/60 px-2 py-1 shadow-subtle glass">
        <PlatformTabs active={platform} onChange={setPlatform} contentMap={contentMap} />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Editor column (60%) */}
        <motion.div
          className="lg:col-span-3 rounded-xl border border-border bg-card p-5 shadow-subtle"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ContentEditor
            platform={platform}
            content={content}
            onContentChange={updateContent}
            hashtags={hashtags}
            onHashtagsChange={updateHashtags}
          />
        </motion.div>

        {/* Preview column (40%) */}
        <motion.div
          className="lg:col-span-2 rounded-xl border border-border bg-muted/30 p-5 shadow-subtle glass"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <PlatformPreview
            platform={platform}
            content={content}
            hashtags={hashtags}
            showWatermark
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Header sub-component ───────────────────────────── */
function Header({ isEditing, saving, onBack, onSaveDraft, onSchedule }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Post' : (
            <span className="gradient-text">Create Post</span>
          )}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSaveDraft}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Draft
        </button>
        <button
          onClick={onSchedule}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <CalendarClock className="h-4 w-4" />
          Schedule
        </button>
      </div>
    </div>
  );
}
