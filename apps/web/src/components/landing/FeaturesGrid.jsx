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
    desc: 'Turn one video into 7 platform posts with AI',
  },
  {
    Icon: CalendarDays,
    title: 'Content Calendar',
    desc: 'Visual drag-and-drop scheduling',
  },
  {
    Icon: Users,
    title: 'PostPilot Circles',
    desc: 'Invite your team to collaborate',
  },
  {
    Icon: Eye,
    title: 'Platform Previews',
    desc: 'See exactly how posts will look',
  },
  {
    Icon: BarChart3,
    title: 'Analytics',
    desc: 'Track performance across platforms',
  },
  {
    Icon: Image,
    title: 'Media Library',
    desc: 'Organize all your creative assets',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
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
              className="glass glow-card rounded-2xl p-6 text-left space-y-4
                hover:scale-[1.02] transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
