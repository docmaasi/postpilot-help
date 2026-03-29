import { motion } from 'framer-motion';
import { Youtube, PenSquare, CalendarDays, Send } from 'lucide-react';

const steps = [
  { Icon: Youtube, label: 'Import', desc: 'Import your YouTube videos' },
  { Icon: PenSquare, label: 'Repurpose', desc: 'Create posts for every platform' },
  { Icon: CalendarDays, label: 'Schedule', desc: 'Schedule with precision timing' },
  { Icon: Send, label: 'Publish', desc: 'Publish and track performance' },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function HowItWorks() {
  return (
    <section className="py-24 px-4 social-bg">
      <div className="max-w-5xl mx-auto text-center space-y-16">
        <h2 className="text-3xl sm:text-4xl font-bold">
          How <span className="gradient-text">PostPilot</span> Works
        </h2>

        <motion.div
          className="grid sm:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Connecting line (desktop) */}
          <div
            className="hidden sm:block absolute top-12 left-[12%] right-[12%] h-0.5"
            style={{
              background:
                'linear-gradient(90deg, hsl(265 65% 55%), hsl(330 80% 60%))',
            }}
          />

          {steps.map(({ Icon, label, desc }, i) => (
            <motion.div
              key={label}
              variants={item}
              className="flex flex-col items-center gap-4 relative"
            >
              <div
                className="w-24 h-24 rounded-full glass gradient-border flex items-center
                  justify-center"
              >
                <Icon size={36} className="text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </span>
              <h3 className="font-bold text-lg">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
