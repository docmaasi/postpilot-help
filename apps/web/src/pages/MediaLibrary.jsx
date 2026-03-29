import { Image, Upload } from 'lucide-react';

export default function MediaLibrary() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            Upload and organize your images, clips, and graphics
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <Image className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">No media yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload images, clips, and graphics to use in your posts
        </p>
      </div>
    </div>
  );
}
