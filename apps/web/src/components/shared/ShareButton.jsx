import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Link2,
  Mail,
  Check,
  QrCode,
  X,
} from 'lucide-react';
import { QRCode } from './QRCode.jsx';

/**
 * Reusable share button with dropdown.
 * @param {object} props
 * @param {string} props.url - URL to share (defaults to current page)
 * @param {string} props.title - Title text for share intents
 * @param {string} props.description - Description for email body
 */
export function ShareButton({ url, title = 'Check this out!', description = '' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const ref = useRef(null);
  const shareUrl = url || window.location.href;

  useClickOutside(ref, () => { setOpen(false); setShowQR(false); });

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const items = buildShareItems({ shareUrl, title, description, copyLink, copied, setShowQR });

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen((v) => !v); setShowQR(false); }}
        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>

      <AnimatePresence>
        {open && (
          <ShareDropdown items={items} showQR={showQR} shareUrl={shareUrl} onCloseQR={() => setShowQR(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Dropdown ---------- */

function ShareDropdown({ items, showQR, shareUrl, onCloseQR }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg"
    >
      {items.map((item) => (
        <ShareItem key={item.label} {...item} />
      ))}

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="relative mt-2 flex justify-center border-t border-border pt-3">
              <button onClick={onCloseQR} className="absolute right-1 top-3">
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
              <QRCode url={shareUrl} size={160} showBranding={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ShareItem({ icon: Icon, label, onClick, href }) {
  const cls = 'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-muted';
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <Icon className="h-4 w-4 text-muted-foreground" /> {label}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      <Icon className="h-4 w-4 text-muted-foreground" /> {label}
    </button>
  );
}

/* ---------- Helpers ---------- */

function buildShareItems({ shareUrl, title, description, copyLink, copied, setShowQR }) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const emailBody = encodeURIComponent(description || `${title}\n\n${shareUrl}`);

  return [
    { icon: copied ? Check : Link2, label: copied ? 'Copied!' : 'Copy Link', onClick: copyLink },
    { icon: XIcon, label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { icon: LinkedInIcon, label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: FacebookIcon, label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { icon: Mail, label: 'Share via Email', href: `mailto:?subject=${encodedTitle}&body=${emailBody}` },
    { icon: QrCode, label: 'QR Code', onClick: () => setShowQR((v) => !v) },
  ];
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

/* ---------- Social Icons ---------- */

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
