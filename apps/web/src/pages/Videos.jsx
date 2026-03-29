import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { useVideos, useCreateVideo, useUpdateVideo } from '@postpilot/lib';
import { VideoImportForm } from '../components/videos/VideoImportForm.jsx';
import { VideoCard } from '../components/videos/VideoCard.jsx';
import { VideoToolbar } from '../components/videos/VideoToolbar.jsx';

export default function Videos() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [isImporting, setIsImporting] = useState(false);

  const videos = useVideos({ search: search || undefined });
  const createVideo = useCreateVideo();
  const updateVideo = useUpdateVideo();

  /** Sort videos client-side based on selected option */
  const sortedVideos = useMemo(() => {
    if (!videos) return [];
    const copy = [...videos];
    if (sort === 'title') copy.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'status') copy.sort((a, b) => a.status.localeCompare(b.status));
    // "newest" is already the default from the backend
    return copy;
  }, [videos, sort]);

  async function handleImport(data) {
    setIsImporting(true);
    try {
      await createVideo(data);
    } finally {
      setIsImporting(false);
    }
  }

  function handleToggleFavorite(id, isFavorite) {
    updateVideo({ id, isFavorite });
  }

  const isLoading = videos === undefined;
  const isEmpty = videos !== undefined && videos.length === 0 && !search;
  const noResults = videos !== undefined && videos.length === 0 && search;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Video Library</h1>
        <p className="text-sm text-muted-foreground">
          Import YouTube videos and repurpose them into social media posts
        </p>
      </div>

      {/* Import form */}
      <VideoImportForm onImport={handleImport} isImporting={isImporting} />

      {/* Toolbar (only when there are videos) */}
      {!isEmpty && !isLoading && (
        <VideoToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
      )}

      {/* Loading state */}
      {isLoading && <VideoGridSkeleton />}

      {/* Empty state */}
      {isEmpty && <EmptyState />}

      {/* No search results */}
      {noResults && <NoResults search={search} />}

      {/* Video grid */}
      {sortedVideos.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sortedVideos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
      <Youtube className="mb-4 h-12 w-12 text-muted-foreground/30" />
      <h3 className="mb-1 text-lg font-semibold">No videos yet</h3>
      <p className="text-sm text-muted-foreground">
        Paste a YouTube URL above to import your first video
      </p>
    </div>
  );
}

function NoResults({ search }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12">
      <h3 className="mb-1 text-base font-semibold">No results</h3>
      <p className="text-sm text-muted-foreground">
        Nothing matched &ldquo;{search}&rdquo; &mdash; try a different term
      </p>
    </div>
  );
}

function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-xl border border-border bg-card shadow-subtle">
          <div className="h-40 rounded-t-xl bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
