import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket } from 'lucide-react';

const WELCOME_KEY = 'postpilot_welcome_seen';

export function WelcomeModal({ userName }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(WELCOME_KEY)) {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(WELCOME_KEY, 'true');
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500">
              <Rocket className="h-7 w-7 text-white" />
            </div>

            <h2 className="mb-3 text-2xl font-bold">
              Welcome to PostPilot
              {userName && userName !== 'Creator' ? `, ${userName}` : ''}!
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              You just unlocked a smarter way to grow on social media.
              Import your YouTube videos, and PostPilot will help you
              repurpose them into scroll-stopping posts for Instagram,
              TikTok, LinkedIn, X, and more — all from one dashboard.
              Schedule content, track what works, and collaborate with
              your team through PostPilot Circles. No guesswork, no
              burnout — just consistent content that connects. Let's
              get your first post out there!
            </p>

            <button
              onClick={dismiss}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Let's Go!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
