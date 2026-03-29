import { Clock } from 'lucide-react';

const TIMES = [
  { day: 'Monday', slots: ['9 AM', '12 PM', '7 PM'] },
  { day: 'Tuesday', slots: ['10 AM', '2 PM', '8 PM'] },
  { day: 'Wednesday', slots: ['9 AM', '1 PM', '6 PM'] },
  { day: 'Thursday', slots: ['11 AM', '3 PM', '9 PM'] },
  { day: 'Friday', slots: ['10 AM', '12 PM', '5 PM'] },
  { day: 'Saturday', slots: ['11 AM', '4 PM'] },
  { day: 'Sunday', slots: ['10 AM', '3 PM'] },
];

/**
 * Visual grid of best posting times per day (static placeholder data).
 */
export function BestTimeGrid() {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <div className="mb-5 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Best Times to Post</h3>
      </div>
      <div className="space-y-3">
        {TIMES.map((t) => (
          <div key={t.day} className="flex items-center gap-4">
            <span className="w-24 shrink-0 text-sm font-medium">{t.day}</span>
            <div className="flex flex-wrap gap-2">
              {t.slots.map((slot) => (
                <span
                  key={slot}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
