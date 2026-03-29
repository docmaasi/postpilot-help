import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { platforms } from './platform-data.js';
import { PlatformModal } from './PlatformModal.jsx';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PlatformShowcase() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Master <span className="gradient-text">Every Platform</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {platforms.map((platform) => (
            <motion.button
              key={platform.name}
              variants={card}
              onClick={() => setSelected(platform)}
              className={`bg-gradient-to-br ${platform.bg} rounded-2xl p-6 text-left space-y-4
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <platform.Icon className="h-12 w-12" style={{ color: platform.color }} />
              <h3 className="font-bold text-lg font-display">{platform.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {platform.desc}
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
          <PlatformModal
            platform={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
