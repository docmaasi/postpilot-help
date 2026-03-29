import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays, Sparkles } from 'lucide-react';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import { usePosts } from '@postpilot/lib';
import { CalendarGrid } from '../components/calendar/CalendarGrid.jsx';
import { DayDetail } from '../components/calendar/DayDetail.jsx';
import { PostCardIcon, StoryCircleIcon, VideoFrameIcon } from '../components/shared/SocialIcons.jsx';

export default function Calendar() {
  const posts = usePosts();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const scheduledPosts = useMemo(
    () => (posts ?? []).filter((p) => p.status === 'scheduled' && p.scheduledAt),
    [posts],
  );

  const selectedDayPosts = useMemo(() => {
    if (!selectedDay) return [];
    return scheduledPosts.filter((p) =>
      isSameDay(new Date(p.scheduledAt), selectedDay),
    );
  }, [selectedDay, scheduledPosts]);

  const handlePrev = useCallback(() => setCurrentMonth((m) => subMonths(m, 1)), []);
  const handleNext = useCallback(() => setCurrentMonth((m) => addMonths(m, 1)), []);
  const handleToday = useCallback(() => {
    setCurrentMonth(new Date());
    setSelectedDay(new Date());
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          Content{' '}
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Calendar
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visualize and manage your content schedule
        </p>
      </motion.div>

      {/* Month nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={handlePrev} className="rounded-lg border border-border p-2 hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="min-w-[180px] text-center text-xl font-bold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button onClick={handleNext} className="rounded-lg border border-border p-2 hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleToday}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <CalendarDays className="h-4 w-4" /> Today
        </button>
      </div>

      {/* Grid + detail panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <CalendarGrid
          currentMonth={currentMonth}
          posts={scheduledPosts}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {selectedDay ? (
          <DayDetail
            date={selectedDay}
            posts={selectedDayPosts}
            onClose={() => setSelectedDay(null)}
          />
        ) : (
          <EmptyDetailHint />
        )}
      </div>
    </div>
  );
}

/** Placeholder when no day is selected — shows faded social post pills */
function EmptyDetailHint() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border/50 p-8 text-center">
      {/* Faded social post pill icons */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-[0.05]" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-lg bg-primary/20 px-4 py-2">
          <PostCardIcon size={18} color="hsl(265 65% 55%)" />
          <div className="h-2 w-24 rounded bg-primary/40" />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-accent/20 px-4 py-2">
          <VideoFrameIcon size={18} color="hsl(330 80% 60%)" />
          <div className="h-2 w-20 rounded bg-accent/40" />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary/20 px-4 py-2">
          <StoryCircleIcon size={18} color="hsl(265 65% 55%)" />
          <div className="h-2 w-16 rounded bg-primary/40" />
        </div>
      </div>
      <Sparkles className="mb-3 h-8 w-8 text-primary/30" />
      <p className="text-sm font-medium text-muted-foreground">
        Select a day to see scheduled posts
      </p>
    </div>
  );
}
