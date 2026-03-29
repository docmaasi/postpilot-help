import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { platformInfo } from '../data/platform-info.js';
import { PlatformCard } from '../components/platforms/PlatformCard.jsx';
import { ShareButton } from '../components/shared/ShareButton.jsx';
import { QRCode } from '../components/shared/QRCode.jsx';
import { LandingNav } from '../components/landing/LandingNav.jsx';

export default function Platforms() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div className="mx-auto max-w-4xl space-y-8 pb-12 pt-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Globe className="h-3.5 w-3.5" />
          Platform Intelligence
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Master Every{' '}
          <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Platform
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Understand the landscape. Learn what works on each platform, who is
          there, and how PostPilot helps you create the right content everywhere.
        </p>
        <div className="mt-4 flex justify-center">
          <ShareButton
            title="Master Every Platform — PostPilot.Help"
            description="Learn what works on YouTube, X, Instagram, LinkedIn, TikTok, Facebook, and Threads."
          />
        </div>
      </motion.div>

      {/* Platform cards */}
      {platformInfo.map((platform, i) => (
        <PlatformCard key={platform.key} platform={platform} index={i} />
      ))}

      {/* QR code footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-3 pt-8"
      >
        <h3 className="text-lg font-bold">Share this page</h3>
        <p className="text-sm text-muted-foreground">
          Scan the QR code to open this page on another device.
        </p>
        <QRCode url="https://postpilothelp.vercel.app/platforms" />
      </motion.div>
      </div>
    </div>
  );
}
