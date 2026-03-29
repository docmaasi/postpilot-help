import { motion } from 'framer-motion';
import { HeroPlatformIcons } from './HeroPlatformIcons.jsx';
import { ArrowRight, Play } from 'lucide-react';

/* Free stock photos from Unsplash — people using phones, social media, content creation */
const PHOTOS = [
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop',
];

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-pink-500/5 to-orange-400/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Centered logo — big and prominent */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo.png" alt="PostPilot" className="h-36 md:h-48 lg:h-56 w-auto" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1]">
              Turn One Video Into{' '}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Posts Everywhere
              </span>
            </h1>

            <p className="text-lg text-foreground/70 leading-relaxed max-w-xl">
              Import your YouTube videos and let AI transform them into
              scroll-stopping posts for <strong>Instagram, X, Facebook,
              LinkedIn, TikTok, and Threads</strong> — all in seconds.
              Schedule, preview, and publish from one beautiful dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/login"
                className="group flex items-center gap-2 px-8 py-4 rounded-full
                  bg-gradient-to-r from-primary to-accent text-white font-bold
                  text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start Free Today
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-8 py-4 rounded-full
                  border-2 border-foreground/20 font-bold text-lg
                  hover:border-primary hover:text-primary transition-all"
              >
                <Play className="h-5 w-5" />
                See How It Works
              </a>
            </div>

            <HeroPlatformIcons />
          </motion.div>

          {/* Right: Photo collage */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PhotoCollage />
          </motion.div>
        </div>

        {/* Welcome message below — condensed, not a wall */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <WelcomeCard />
        </motion.div>
      </div>
    </section>
  );
}

function PhotoCollage() {
  return (
    <div className="relative h-[500px]">
      {/* Main photo */}
      <motion.div
        className="absolute top-0 right-0 w-80 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        whileHover={{ scale: 1.03 }}
      >
        <img src={PHOTOS[0]} alt="Content creator" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">YouTube</span>
          <span className="bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Instagram</span>
        </div>
      </motion.div>

      {/* Second photo */}
      <motion.div
        className="absolute top-40 left-0 w-72 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <img src={PHOTOS[1]} alt="Team collaborating" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Team Collab</span>
        </div>
      </motion.div>

      {/* Third photo */}
      <motion.div
        className="absolute bottom-0 right-8 w-64 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <img src={PHOTOS[2]} alt="Social media planning" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-violet-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Schedule</span>
        </div>
      </motion.div>

      {/* Floating stat badges */}
      <motion.div
        className="absolute top-24 left-24 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-border/50"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-2xl font-bold font-display text-primary">7</p>
        <p className="text-xs text-muted-foreground font-medium">Platforms</p>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-48 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-border/50"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <p className="text-2xl font-bold font-display text-accent">AI</p>
        <p className="text-xs text-muted-foreground font-medium">Powered</p>
      </motion.div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-orange-400/5 border border-border/50 p-8 md:p-10">
      <h2 className="text-2xl font-bold font-display mb-4">
        Welcome to <span className="gradient-text">PostPilot</span>
      </h2>
      <div className="text-foreground/70 leading-relaxed space-y-3 text-left md:text-center">
        <p>
          PostPilot is the all-in-one platform for creators, marketers, and businesses
          who want to dominate social media without the chaos. Import your YouTube videos,
          and our AI instantly creates optimized posts for every platform — Instagram,
          X, Facebook, LinkedIn, TikTok, and Threads.
        </p>
        <p>
          Schedule content on a drag-and-drop calendar, collaborate with your team through
          <strong> PostPilot Circles</strong>, and track performance with built-in analytics.
          No more copying and pasting between seven apps. No more missed posting days.
          Just one beautiful dashboard that saves you <strong>10+ hours every week</strong>.
        </p>
      </div>
    </div>
  );
}
