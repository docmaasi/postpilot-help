import { motion } from 'framer-motion';
import { Youtube, PenSquare, CalendarDays, Send } from 'lucide-react';

const steps = [
  {
    Icon: Youtube,
    label: 'Import',
    desc: 'Paste a YouTube link or connect your channel. PostPilot pulls in the video, transcript, and metadata automatically.',
  },
  {
    Icon: PenSquare,
    label: 'Repurpose',
    desc: 'Our AI creates platform-specific posts — captions, hashtags, and formatting tailored for each network.',
  },
  {
    Icon: CalendarDays,
    label: 'Schedule',
    desc: 'Drag and drop posts onto your visual calendar. Pick the perfect time for each platform.',
  },
  {
    Icon: Send,
    label: 'Publish',
    desc: 'Hit publish and PostPilot sends your content everywhere. Track engagement from one dashboard.',
  },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 section-alt">
      <div className="max-w-5xl mx-auto text-center space-y-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          How <span className="gradient-text">PostPilot</span> Works
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          <div
            className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5"
            style={{
              background: 'linear-gradient(90deg, hsl(265 65% 55%), hsl(330 80% 60%))',
            }}
          />

          {steps.map(({ Icon, label, desc }, i) => (
            <motion.div
              key={label}
              variants={item}
              className="flex flex-col items-center gap-4 relative"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary font-bold text-sm flex items-center justify-center shadow">
                  {i + 1}
                </span>
                <Icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl font-display">{label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
