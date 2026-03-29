import { TrendingUp } from 'lucide-react';

export default function Trending() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trending Hashtags</h1>
        <p className="text-sm text-muted-foreground">
          Discover trending hashtags and topics for your content
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <TrendingUp className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">Trending hashtags coming soon</h3>
        <p className="text-sm text-muted-foreground">
          Browse trending tags by platform and get AI-powered suggestions
        </p>
      </div>
    </div>
  );
}
