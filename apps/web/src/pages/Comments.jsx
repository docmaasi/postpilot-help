import { MessageCircle } from 'lucide-react';

export default function Comments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Comment Monitor</h1>
        <p className="text-sm text-muted-foreground">
          Track and respond to comments across all platforms
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">Comment monitoring coming soon</h3>
        <p className="text-sm text-muted-foreground">
          Connect your platforms to see comments with AI sentiment analysis
        </p>
      </div>
    </div>
  );
}
