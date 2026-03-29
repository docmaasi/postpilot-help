import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, Twitter, Mail, Share2, Shield } from 'lucide-react';
import { ReferralHistory } from '../components/referrals/ReferralHistory.jsx';
import { HowItWorks } from '../components/referrals/HowItWorks.jsx';
import { RewardBreakdown } from '../components/referrals/RewardBreakdown.jsx';

const REFERRAL_CODE = 'PILOT-A3X9';
const REFERRAL_LINK = 'https://postpilot.help/r/PILOT-A3X9';

export default function Referrals() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `I use PostPilot to repurpose my YouTube videos into social posts. Try it free with my link: ${REFERRAL_LINK}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Try PostPilot — free credits for you!');
    const body = encodeURIComponent(
      `Hey! I have been using PostPilot to turn my videos into social posts. Sign up with my link and we both get bonus credits:\n\n${REFERRAL_LINK}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="social-bg rounded-2xl bg-card p-8 text-center"
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl stat-gradient-pink">
          <Gift className="h-7 w-7 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold gradient-text">Earn PostPilot Credits</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Share your referral code with friends. When they join, you both earn bonus credits.
        </p>
      </motion.div>

      {/* Code + Share */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 space-y-4"
      >
        <CodeBlock label="Your Code" value={REFERRAL_CODE} copied={copied === 'code'} onCopy={() => handleCopy(REFERRAL_CODE, 'code')} />
        <CodeBlock label="Referral Link" value={REFERRAL_LINK} copied={copied === 'link'} onCopy={() => handleCopy(REFERRAL_LINK, 'link')} />

        <div className="flex flex-wrap gap-2 pt-2">
          <ShareBtn icon={Twitter} label="Share on X" onClick={shareOnTwitter} />
          <ShareBtn icon={Mail} label="Email" onClick={shareViaEmail} />
          <ShareBtn icon={Share2} label="Copy Link" onClick={() => handleCopy(REFERRAL_LINK, 'link')} />
        </div>
      </motion.div>

      {/* How It Works */}
      <HowItWorks />

      {/* Reward Breakdown */}
      <RewardBreakdown />

      {/* Referral History */}
      <ReferralHistory />

      {/* Anti-abuse */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        <Shield className="h-4 w-4 shrink-0" />
        One referral per email address. Duplicate or fraudulent referrals will not earn credits.
      </div>
    </div>
  );
}

function CodeBlock({ label, value, copied, onCopy }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
        <code className="flex-1 truncate text-sm font-mono font-semibold">{value}</code>
        <button onClick={onCopy} className="shrink-0 rounded-md p-1.5 hover:bg-background transition-colors">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );
}

function ShareBtn({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
