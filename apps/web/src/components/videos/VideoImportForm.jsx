import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { parseYouTubeUrl, getYouTubeThumbnail } from '../../lib/youtube.js';

/**
 * Form to import a YouTube video by pasting a URL.
 * Parses the URL client-side, shows a preview, and lets the user confirm.
 */
export function VideoImportForm({ onImport, isImporting }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [videoId, setVideoId] = useState(null);

  function handleUrlChange(e) {
    const value = e.target.value;
    setUrl(value);
    setError('');

    const parsed = parseYouTubeUrl(value);
    setVideoId(parsed);
    if (value && !parsed) {
      setError('Not a valid YouTube URL. Try pasting a full link.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!videoId) {
      setError('Please paste a valid YouTube URL first.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a title for this video.');
      return;
    }

    await onImport({
      url,
      videoId,
      title: title.trim(),
      description: description.trim() || undefined,
      thumbnailUrl: getYouTubeThumbnail(videoId, 'hqdefault'),
    });

    setUrl('');
    setTitle('');
    setDescription('');
    setVideoId(null);
    setError('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-subtle">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Youtube className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Import from YouTube</h2>
            <p className="text-xs text-muted-foreground">
              Paste any YouTube link to get started
            </p>
          </div>
        </div>

        {/* URL input */}
        <div className="mb-3">
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Preview + title fields when URL is valid */}
        <AnimatePresence>
          {videoId && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-3 flex gap-4">
                <img
                  src={getYouTubeThumbnail(videoId)}
                  alt="Video thumbnail"
                  className="h-20 w-36 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video title *"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description (optional)"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {error && (
          <div className="mb-3 flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!videoId || !title.trim() || isImporting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isImporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Import Video
            </>
          )}
        </button>
      </div>
    </form>
  );
}
