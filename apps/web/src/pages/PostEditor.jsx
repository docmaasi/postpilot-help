import { useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, CalendarClock, Loader2, Clock } from 'lucide-react';
import { usePost, useCreatePost, useUpdatePost } from '@postpilot/lib';
import { PLATFORM_ORDER } from '@/lib/platforms.js';
import { PlatformTabs } from '../components/editor/PlatformTabs.jsx';
import { ContentEditor } from '../components/editor/ContentEditor.jsx';
import { PlatformPreview } from '../components/editor/PlatformPreview.jsx';
import { AIPanel } from '../components/editor/AIPanel.jsx';

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
  const [scheduledAt, setScheduledAt] = useState('');
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const dateInputRef = useRef(null);

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
    if (status === 'scheduled' && !scheduledAt) {
      setShowSchedulePicker(true);
      return;
    }
    setSaving(true);
    try {
      const payload = {
        platform,
        content,
        hashtags,
        status,
        ...(status === 'scheduled' && scheduledAt
          ? { scheduledAt: new Date(scheduledAt).getTime() }
          : {}),
      };
      if (isEditing) {
        await updatePost({ id, ...payload });
      } else {
        await createPost(payload);
      }
      navigate('/app/posts');
    } catch {
      /* TODO: toast error */
    } finally {
      setSaving(false);
    }
  }

  function confirmSchedule() {
    if (scheduledAt) {
      handleSave('scheduled');
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Header */}
      <Header
        isEditing={isEditing}
        saving={saving}
        onBack={() => navigate('/app/posts')}
        onSaveDraft={() => handleSave('draft')}
        onSchedule={() => handleSave('scheduled')}
      />

      {/* Schedule date/time picker */}
      {showSchedulePicker && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4"
        >
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Schedule for:</span>
          <input
            ref={dateInputRef}
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={confirmSchedule}
            disabled={!scheduledAt || saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
            Confirm Schedule
          </button>
          <button
            onClick={() => setShowSchedulePicker(false)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </motion.div>
      )}

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
          <div className="mt-4">
            <AIPanel
              platform={platform}
              content={content}
              onInsert={updateContent}
              onInsertHashtags={updateHashtags}
            />
          </div>
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
