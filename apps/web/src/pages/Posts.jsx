import { PenSquare, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Posts() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your social media posts
          </p>
        </div>
        <button
          onClick={() => navigate('/posts/new')}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <PenSquare className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">No posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Create your first post or import a video to repurpose
        </p>
      </div>
    </div>
  );
}
