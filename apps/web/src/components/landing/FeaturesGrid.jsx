import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { features } from './feature-data.js';
import { FeatureModal } from './FeatureModal.jsx';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function FeaturesGrid() {
  const [selected, setSelected] = useState(null);

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
          {features.map((feature) => (
            <motion.button
              key={feature.title}
              variants={card}
              onClick={() => setSelected(feature)}
              className="rounded-2xl border border-border bg-card p-6 text-left space-y-4
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-display">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
              <span className="text-xs font-medium text-primary">
                Click to learn more &rarr;
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <FeatureModal
            feature={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
