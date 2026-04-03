import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Archive, PlusCircle, StickyNote } from 'lucide-react';
import { useVideo, useUpdateVideo } from '@postpilot/lib';
import { VideoInfoCard } from '../components/video-detail/VideoInfoCard.jsx';
import { RepurposeSection } from '../components/video-detail/RepurposeSection.jsx';
import { LinkedPosts } from '../components/video-detail/LinkedPosts.jsx';

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = useVideo(id);
  const updateVideo = useUpdateVideo();
  const [notes, setNotes] = useState('');
  const [notesLoaded, setNotesLoaded] = useState(false);

  // Load notes from video once available (must be before early returns)
  useEffect(() => {
    if (video && !notesLoaded) {
      setNotes(video.notes ?? '');
      setNotesLoaded(true);
    }
  }, [video, notesLoaded]);

  const saveNotes = useCallback(async (value) => {
    if (!video?._id) return;
    setNotes(value);
    await updateVideo({ id: video._id, notes: value });
  }, [updateVideo, video?._id]);

  if (video === undefined) {
    return <LoadingSkeleton />;
  }
  if (video === null) {
    return <NotFound onBack={() => navigate('/app/videos')} />;
  }

  async function toggleFavorite() {
    await updateVideo({ id: video._id, isFavorite: !video.isFavorite });
  }

  async function handleArchive() {
    await updateVideo({ id: video._id, isArchived: true });
    navigate('/app/videos');
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/app/videos')}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Videos
      </button>

      <VideoInfoCard video={video} onToggleFavorite={toggleFavorite} />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <ActionBtn icon={PlusCircle} label="Create Post" onClick={() => navigate(`/app/posts/new?videoId=${id}`)} />
        <ActionBtn icon={Pencil} label="Edit Details" onClick={() => navigate(`/app/videos/${id}/edit`)} />
        <ActionBtn icon={Archive} label="Archive" variant="muted" onClick={handleArchive} />
      </div>

      <RepurposeSection videoId={id} />
      <LinkedPosts youtubeVideoId={video._id} />

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle"
      >
        <div className="mb-3 flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Notes</h3>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={(e) => saveNotes(e.target.value)}
          placeholder="Add notes about this video..."
          rows={4}
          className="input-field resize-none"
        />
      </motion.div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, variant }) {
  const base = variant === 'muted'
    ? 'border-border hover:bg-muted text-muted-foreground'
    : 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10';
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${base}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="h-6 w-32 animate-pulse rounded bg-muted" />
      <div className="aspect-video w-full animate-pulse rounded-xl bg-muted" />
      <div className="h-8 w-64 animate-pulse rounded bg-muted" />
    </div>
  );
}

function NotFound({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="mb-4 text-lg font-semibold">Video not found</p>
      <button onClick={onBack} className="text-sm text-primary hover:underline">
        Back to Videos
      </button>
    </div>
  );
}
