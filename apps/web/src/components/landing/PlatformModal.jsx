import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};

export function PlatformModal({ platform, onClose }) {
  if (!platform) return null;
  const { Icon, name, color, users, keyMetric, detail } = platform;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      variants={overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-2xl"
        variants={modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1 transition hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-10 w-10" style={{ color }} />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display">{name}</h3>
            <p className="text-sm text-muted-foreground">{users}</p>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-primary/5 px-4 py-2">
          <p className="text-sm font-semibold text-primary">{keyMetric}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground mb-8">
          {detail}
        </p>

        <a
          href="/app/posts/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-white font-bold transition hover:shadow-lg"
        >
          Create Content for {name}
        </a>
      </motion.div>
    </motion.div>
  );
}
