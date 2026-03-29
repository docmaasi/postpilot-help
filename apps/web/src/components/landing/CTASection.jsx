import { motion } from 'framer-motion';

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.postpilot.help';

export function CTASection() {
  return (
    <section className="py-24 px-4 social-bg">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to <span className="gradient-text">Launch Your Content?</span>
        </h2>

        <a
          href="/login"
          className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-accent
            text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Start Free Today
        </a>

        <div className="flex flex-col items-center gap-3 pt-4">
          <img src={QR_URL} alt="QR Code" className="w-28 h-28 rounded-lg" />
          <p className="text-xs text-muted-foreground">Share PostPilot.Help</p>
        </div>

        <img src="/logo.png" alt="PostPilot" className="h-10 mx-auto opacity-60" />
      </motion.div>
    </section>
  );
}
