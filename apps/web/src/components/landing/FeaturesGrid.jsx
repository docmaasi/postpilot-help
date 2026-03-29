import { motion } from 'framer-motion';
import {
  Sparkles,
  CalendarDays,
  Users,
  Eye,
  BarChart3,
  Image,
} from 'lucide-react';

const features = [
  {
    Icon: Sparkles,
    title: 'AI Rewriting',
    desc: 'Turn one video into 7 unique platform posts with AI that matches your voice and style.',
  },
  {
    Icon: CalendarDays,
    title: 'Content Calendar',
    desc: 'Visual drag-and-drop scheduling so you can see your entire content strategy at a glance.',
  },
  {
    Icon: Users,
    title: 'PostPilot Circles',
    desc: 'Invite your team, VA, or clients to collaborate. Draft, review, approve, and publish together.',
  },
  {
    Icon: Eye,
    title: 'Platform Previews',
    desc: 'See exactly how your posts will look on each platform before you hit publish.',
  },
  {
    Icon: BarChart3,
    title: 'Analytics',
    desc: 'Track performance across every platform with clean, actionable dashboards.',
  },
  {
    Icon: Image,
    title: 'Media Library',
    desc: 'Organize all your images, videos, and creative assets in one searchable library.',
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Built for <span className="gradient-text">Creators</span>
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={card}
              className="rounded-2xl border border-border bg-card p-6 text-left space-y-4
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-display">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
