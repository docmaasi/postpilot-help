import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, PenSquare, CalendarDays, Send, ArrowLeft, X } from 'lucide-react';

const steps = [
  {
    Icon: Youtube,
    label: 'Import',
    desc: 'Paste a YouTube link or connect your channel. PostPilot pulls in the video, transcript, and metadata automatically.',
    detail: `Importing content into PostPilot is as simple as pasting a link. Drop any YouTube URL into the import bar and PostPilot instantly extracts the video title, description, thumbnail, tags, and publish date. No manual data entry, no copying and pasting metadata from YouTube Studio. Your video becomes a reusable content card in your library — ready to be repurposed into posts for every platform. You can tag videos by topic, campaign, or project, and search your entire library instantly. Whether you are importing one video or your entire channel backlog, PostPilot organizes everything so you can focus on creating, not filing. Every imported video becomes the seed for dozens of social media posts across seven platforms.`,
  },
  {
    Icon: PenSquare,
    label: 'Repurpose',
    desc: 'Our AI creates platform-specific posts — captions, hashtags, and formatting tailored for each network.',
    detail: `PostPilot's AI repurposing engine takes your imported video and generates optimized posts for each social platform automatically. Select a video, choose your platforms, and the AI writes captions that match each network's style — short and punchy for X/Twitter, hashtag-rich for Instagram, professional for LinkedIn, conversational for Facebook, trend-aware for TikTok, and community-focused for YouTube and Threads. You can choose from five tones — professional, funny, bold, informative, or urgent — and the AI adapts instantly. Every generated post includes suggested hashtags, call-to-action options, and proper formatting. You always review and edit before anything goes live. The AI assists, you decide. One video becomes seven or more unique posts in seconds instead of hours.`,
  },
  {
    Icon: CalendarDays,
    label: 'Schedule',
    desc: 'Drag and drop posts onto your visual calendar. Pick the perfect time for each platform.',
    detail: `PostPilot's visual content calendar transforms chaotic posting into organized strategy. See your entire month at a glance with color-coded posts for each platform. Drag and drop posts between days to reschedule instantly. Set exact publish times with timezone support so your content hits each audience at peak engagement hours. The calendar highlights gaps in your schedule so you never miss a posting day. Schedule one post to multiple platforms simultaneously, or stagger releases throughout the week. Queue views and list views give you alternative ways to manage your pipeline. Whether you are planning a week ahead or mapping out a full quarter, the calendar keeps your content strategy visible, organized, and on track.`,
  },
  {
    Icon: Send,
    label: 'Publish',
    desc: 'Hit publish and PostPilot sends your content everywhere. Track engagement from one dashboard.',
    detail: `When your posts are scheduled and ready, PostPilot handles the rest. Content publishes automatically at the times you set — no need to be online, no alarms to remember, no manual posting across seven different apps. For platforms with direct API access, PostPilot publishes natively. For others, you get perfectly formatted copy-to-clipboard output ready to paste in seconds. After publishing, track engagement metrics from one unified dashboard — likes, comments, shares, views, and impressions across every platform without logging into separate analytics tools. See which posts performed best, which platforms drive the most engagement, and what content your audience loves. Publishing is not the end of the workflow — it is the beginning of learning what works.`,
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="how-it-works" className="py-24 px-4 section-alt">
      <div className="max-w-5xl mx-auto text-center space-y-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          How <span className="gradient-text">PostPilot</span> Works
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          <div
            className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5"
            style={{ background: 'linear-gradient(90deg, hsl(265 65% 55%), hsl(330 80% 60%))' }}
          />

          {steps.map(({ Icon, label, desc }, i) => (
            <motion.button
              key={label}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="flex flex-col items-center gap-4 relative group cursor-pointer"
              onClick={() => setActiveStep(i)}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary font-bold text-sm flex items-center justify-center shadow">
                  {i + 1}
                </span>
                <Icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl font-display">{label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
              <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Click to learn more
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeStep !== null && (
          <StepModal step={steps[activeStep]} index={activeStep} onClose={() => setActiveStep(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function StepModal({ step, index, onClose }) {
  const { Icon, label, detail } = step;
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-y-auto max-h-[80vh]"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
      >
        <div className="p-6 md:p-8 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="absolute -mt-12 -ml-8 w-7 h-7 rounded-full bg-white text-primary font-bold text-xs flex items-center justify-center shadow">
                  {index + 1}
                </span>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Step {index + 1}</p>
                <h3 className="text-2xl font-bold font-display">{label}</h3>
              </div>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="text-foreground/80 leading-relaxed space-y-4">
            {detail.split('. ').reduce((acc, sentence, i, arr) => {
              const idx = Math.floor(i / 3);
              if (!acc[idx]) acc[idx] = '';
              acc[idx] += sentence + (i < arr.length - 1 ? '. ' : '');
              return acc;
            }, []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href="/"
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
            <a
              href="/login"
              className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              Try It Free
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
