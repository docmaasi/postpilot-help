import { useParams } from 'react-router-dom';

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isEditing ? 'Edit Post' : 'New Post'}
      </h1>

      <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
        <p className="text-muted-foreground">
          The post editor with platform tabs, character counter, AI assistance,
          and platform preview will be built here.
        </p>
      </div>
    </div>
  );
}
