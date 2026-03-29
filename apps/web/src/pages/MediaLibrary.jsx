import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Camera, ImageOff } from 'lucide-react';
import { useMediaAssets, useDeleteMediaAsset } from '@postpilot/lib';
import { MediaUploadZone } from '../components/media/MediaUploadZone.jsx';
import { MediaCard } from '../components/media/MediaCard.jsx';

const SOURCE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'upload', label: 'Uploads' },
  { value: 'youtube_thumbnail', label: 'YouTube' },
  { value: 'generated', label: 'AI Generated' },
];

export default function MediaLibrary() {
  const assets = useMediaAssets();
  const deleteAsset = useDeleteMediaAsset();
  const [sourceFilter, setSourceFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = assets ?? [];
    if (sourceFilter !== 'all') {
      list = list.filter((a) => a.source === sourceFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.fileName.toLowerCase().includes(q));
    }
    return list;
  }, [assets, sourceFilter, search]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          Media{' '}
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Library
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and organize your images, clips, and graphics
        </p>
      </motion.div>

      {/* Upload zone */}
      <MediaUploadZone />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {SOURCE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setSourceFilter(f.value)}
              className={[
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                sourceFilter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <EmptyMediaState hasAssets={!!assets?.length} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <MediaCard
              key={asset._id}
              asset={asset}
              onDelete={(id) => deleteAsset({ id })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyMediaState({ hasAssets }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center rounded-xl border border-dashed border-border/50 py-16"
    >
      {hasAssets ? (
        <>
          <ImageOff className="mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm font-medium text-muted-foreground">No results match your filters</p>
        </>
      ) : (
        <>
          <Camera className="mb-3 h-12 w-12 text-primary/20" />
          <h3 className="mb-1 text-lg font-semibold">Your media library is empty</h3>
          <p className="text-sm text-muted-foreground">
            Drop some images or videos above to get started
          </p>
        </>
      )}
    </motion.div>
  );
}
