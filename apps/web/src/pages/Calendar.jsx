import { CalendarDays } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Schedule and manage your content timeline
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
        <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <h3 className="mb-1 text-lg font-semibold">Calendar coming soon</h3>
        <p className="text-sm text-muted-foreground">
          Drag-and-drop scheduling with month, week, and day views
        </p>
      </div>
    </div>
  );
}
