import { Youtube, Plus, Search } from 'lucide-react';

export default function Videos() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Video Library</h1>
          <p className="text-sm text-muted-foreground">
            Import and manage your YouTube videos
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Import Video
        </button>
      </div>

      {/* Import form */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-subtle">
        <label className="mb-2 block text-sm font-medium">
          Paste YouTube URL
        </label>
        <div className="flex gap-3">
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Import
          </button>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <Youtube className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">No videos yet</h3>
        <p className="text-sm text-muted-foreground">
          Import your first YouTube video to get started
        </p>
      </div>
    </div>
  );
}
