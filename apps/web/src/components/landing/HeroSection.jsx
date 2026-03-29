import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';

const floatingIcons = [
  { Icon: Play, x: '10%', y: '20%', delay: 0, color: 'text-pink-400' },
  { Icon: Heart, x: '85%', y: '15%', delay: 0.5, color: 'text-red-400' },
  { Icon: MessageCircle, x: '75%', y: '70%', delay: 1, color: 'text-violet-400' },
  { Icon: Share2, x: '15%', y: '75%', delay: 1.5, color: 'text-blue-400' },
  { Icon: Heart, x: '50%', y: '10%', delay: 0.8, color: 'text-pink-300' },
  { Icon: Play, x: '90%', y: '50%', delay: 1.2, color: 'text-violet-300' },
];

function FloatingIcon({ Icon, x, y, delay, color }) {
  return (
    <motion.div
      className={`absolute opacity-20 ${color}`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <Icon size={28} />
    </motion.div>
  );
}

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.postpilot.help';

export function HeroSection() {
  return (
    <section className="social-bg min-h-screen flex items-center justify-center px-4 py-20">
      {floatingIcons.map((icon, i) => (
        <FloatingIcon key={i} {...icon} />
      ))}

      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
        {/* Left: content */}
        <div className="lg:col-span-3 text-center lg:text-left space-y-8">
          <motion.img
            src="/logo.png"
            alt="PostPilot"
            className="h-16 mx-auto lg:mx-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="gradient-text">Turn One Video</span>
            <br />
            <span className="gradient-text">Into Posts Everywhere</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Import YouTube videos. Repurpose for every platform.
            Schedule. Publish. Grow.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <a
              href="/login"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent
                text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Free
            </a>
            <a
              href="/pricing"
              className="px-8 py-3 rounded-xl border-2 border-primary/40 font-semibold
                hover:bg-primary/5 transition-colors"
            >
              See Pricing
            </a>
          </motion.div>
        </div>

        {/* Right: QR widget */}
        <motion.div
          className="lg:col-span-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-6 text-center space-y-3">
            <img src={QR_URL} alt="QR Code" className="w-40 h-40 mx-auto rounded-lg" />
            <p className="text-sm text-muted-foreground">
              Scan to visit PostPilot.Help
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
