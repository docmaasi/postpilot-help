import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'PostPilot saved me 10+ hours a week. I used to spend an entire day repurposing my YouTube videos for other platforms.',
    name: 'Sarah M.',
    title: 'Content Creator',
    initials: 'SM',
    color: 'bg-violet-500',
  },
  {
    quote:
      'The AI caption generator is insanely good. It matches my tone perfectly and I barely need to edit.',
    name: 'Marcus T.',
    title: 'Marketing Manager',
    initials: 'MT',
    color: 'bg-pink-500',
  },
  {
    quote:
      'PostPilot Circles changed everything. My VA can now create drafts and I just approve and publish.',
    name: 'Alex R.',
    title: 'YouTuber',
    initials: 'AR',
    color: 'bg-blue-500',
  },
  {
    quote:
      'Finally, one tool that actually understands every platform\'s format. No more copy-pasting and reformatting.',
    name: 'Jordan L.',
    title: 'Social Media Manager',
    initials: 'JL',
    color: 'bg-emerald-500',
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-4 section-alt">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          What Creators Are <span className="gradient-text">Saying</span>
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {testimonials.map(({ quote, name, title, initials, color }) => (
            <motion.div
              key={name}
              variants={item}
              className="gradient-border rounded-2xl bg-card p-6 text-left space-y-4"
            >
              <StarRating />
              <p className="text-foreground leading-relaxed italic">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="text-xs text-muted-foreground">{title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-xs text-muted-foreground">
          * Testimonials are representative of typical user experiences.
        </p>
      </div>
    </section>
  );
}
