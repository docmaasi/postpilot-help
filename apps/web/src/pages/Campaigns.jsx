import { Megaphone, Plus } from 'lucide-react';

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Organize your content into campaigns
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <Megaphone className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">No campaigns yet</h3>
        <p className="text-sm text-muted-foreground">
          Group your posts and content into organized campaigns
        </p>
      </div>
    </div>
  );
}
