import { useMemo } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isToday, isSameDay, format,
} from 'date-fns';
import { CalendarDay } from './CalendarDay.jsx';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Month grid — 7 columns for days of week, rows for each week in the month.
 * Groups posts by day and passes them to each CalendarDay cell.
 */
export function CalendarGrid({ currentMonth, posts, selectedDay, onSelectDay }) {
  /** Build array of all visible days (fills first/last weeks) */
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({
      start: startOfWeek(monthStart),
      end: endOfWeek(monthEnd),
    });
  }, [currentMonth]);

  /** Index posts by YYYY-MM-DD key for fast lookup */
  const postsByDate = useMemo(() => {
    const map = {};
    for (const post of posts) {
      if (!post.scheduledAt) continue;
      const key = format(new Date(post.scheduledAt), 'yyyy-MM-dd');
      if (!map[key]) map[key] = [];
      map[key].push(post);
    }
    return map;
  }, [posts]);

  return (
    <div>
      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-semibold uppercase text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          return (
            <CalendarDay
              key={key}
              day={day}
              isToday={isToday(day)}
              isCurrentMonth={isSameMonth(day, currentMonth)}
              posts={postsByDate[key] ?? []}
              isSelected={selectedDay ? isSameDay(day, selectedDay) : false}
              onSelect={onSelectDay}
            />
          );
        })}
      </div>
    </div>
  );
}
