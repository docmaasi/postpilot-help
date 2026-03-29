import { motion } from 'framer-motion';
import { HeroPlatformIcons } from './HeroPlatformIcons.jsx';

export function HeroSection() {
  return (
    <section className="hero-gradient pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.img
          src="/logo.png"
          alt="PostPilot"
          className="h-24 md:h-32 mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="gradient-text">Your Social Media</span>
          <br />
          <span className="gradient-text">Command Center</span>
        </motion.h1>

        <motion.div
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <WelcomeMessage />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <a
            href="/login"
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-accent
              text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Start Free Today
          </a>
          <a
            href="#how-it-works"
            className="px-10 py-4 rounded-xl border-2 border-primary/40 font-bold text-lg
              hover:bg-primary/5 transition-colors"
          >
            Watch How It Works
          </a>
        </motion.div>

        <HeroPlatformIcons />
      </div>
    </section>
  );
}

function WelcomeMessage() {
  return (
    <>
      <p>
        Welcome to <strong>PostPilot</strong> — the all-in-one platform built
        for creators, marketers, small businesses, and agencies who want to
        dominate social media without the chaos. Whether you are a YouTuber
        looking to repurpose your videos across every platform, a marketing
        manager juggling multiple brand accounts, or a solo entrepreneur
        trying to stay visible online, PostPilot is designed to make your
        life dramatically easier.
      </p>
      <p>
        Import your YouTube videos and let our AI transform them into
        scroll-stopping posts tailored for Instagram, X, Facebook, LinkedIn,
        TikTok, and Threads — all in seconds. Schedule your content on a
        beautiful visual calendar, preview exactly how each post will look
        on every platform, and publish everything from one unified dashboard.
        No more copying and pasting. No more logging into seven different apps.
      </p>
      <p>
        Collaborate with your team through <strong>PostPilot Circles</strong>,
        where your VA or content team can draft posts for your approval.
        Track what is working with built-in analytics. Organize your media
        library, build reusable templates, and run campaigns that actually
        grow your audience. PostPilot is AI-powered, beautifully designed,
        and built to help you save hours every single week. Your content
        deserves to be seen everywhere — let PostPilot make that happen.
      </p>
    </>
  );
}
