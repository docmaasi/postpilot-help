import { motion } from 'framer-motion';

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.postpilot.help';

export function CTASection() {
  return (
    <section className="py-24 px-4 hero-gradient">
      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/logo.png"
          alt="PostPilot"
          className="h-20 mx-auto"
        />

        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Ready to <span className="gradient-text">Transform Your Content Strategy?</span>
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Join thousands of creators who save hours every week with PostPilot.
          Start for free — no credit card required.
        </p>

        <a
          href="/login"
          className="inline-block px-12 py-4 rounded-xl bg-gradient-to-r from-primary to-accent
            text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Start Free Today
        </a>

        <div className="flex flex-col items-center gap-3 pt-8">
          <div className="relative">
            <img
              src={QR_URL}
              alt="QR Code — Scan to visit PostPilot.Help"
              className="w-36 h-36 rounded-lg"
            />
            <img
              src="/logo.png"
              alt=""
              className="absolute inset-0 m-auto w-10 h-10 rounded bg-white p-0.5"
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Scan to visit PostPilot.Help
          </p>
        </div>
      </motion.div>
    </section>
  );
}
