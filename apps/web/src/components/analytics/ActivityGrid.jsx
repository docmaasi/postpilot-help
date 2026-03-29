import { motion } from 'framer-motion';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Generate 7 weeks of random activity data */
function generateActivity() {
  const weeks = [];
  for (let w = 0; w < 7; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push(Math.floor(Math.random() * 5));
    }
    weeks.push(week);
  }
  return weeks;
}

const ACTIVITY = generateActivity();
const LEVELS = [
  'bg-muted/40',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
];

/**
 * GitHub-style contribution grid showing posting activity (static).
 */
export function ActivityGrid() {
  return (
    <div className="glow-card rounded-xl border border-border bg-card p-6 shadow-subtle">
      <h3 className="mb-5 text-lg font-semibold">Posting Activity</h3>
      <div className="flex gap-1.5">
        {/* Day labels */}
        <div className="flex flex-col gap-1.5 pr-2 pt-6">
          {DAYS.map((d) => (
            <span key={d} className="h-4 text-[10px] leading-4 text-muted-foreground">
              {d}
            </span>
          ))}
        </div>
        {/* Grid */}
        {ACTIVITY.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            <span className="h-4 text-center text-[10px] text-muted-foreground">
              W{wi + 1}
            </span>
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + (wi * 7 + di) * 0.01 }}
                className={`h-4 w-4 rounded-sm ${LEVELS[level]}`}
                title={`${level} posts`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
