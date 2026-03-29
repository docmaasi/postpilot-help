import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/videos')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Videos
      </button>

      <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
        <h1 className="text-2xl font-bold">Video Detail</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Video ID: {id}
        </p>
        <p className="mt-4 text-muted-foreground">
          Video details and repurposing tools will appear here.
        </p>
      </div>
    </div>
  );
}
