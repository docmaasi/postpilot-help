import { motion } from 'framer-motion';
import { Globe, BookOpen, Sparkles, Users } from 'lucide-react';

const stats = [
  { Icon: Globe, value: '7', label: 'Platforms', gradient: 'stat-gradient-violet' },
  { Icon: BookOpen, value: '25+', label: 'Blog Resources', gradient: 'stat-gradient-pink' },
  { Icon: Sparkles, value: 'AI', label: 'Powered', gradient: 'stat-gradient-blue' },
  { Icon: Users, value: 'Team', label: 'Collaboration', gradient: 'stat-gradient-green' },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function StatsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Trusted by <span className="gradient-text">Content Creators</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map(({ Icon, value, label, gradient }) => (
            <motion.div
              key={label}
              variants={item}
              className={`${gradient} rounded-2xl p-6 space-y-3 glow-card`}
            >
              <Icon size={28} className="text-primary mx-auto" />
              <p className="text-3xl font-extrabold">{value}</p>
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
